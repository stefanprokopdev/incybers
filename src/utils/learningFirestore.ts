import { getCourseById } from "@site/src/data/learning/courses";
import {
  LEARNING_FULL_ACCESS_ROLE,
  type ChapterProgressRecord,
  type CourseProgressRecord,
} from "@site/src/data/learning/types";
import { isCourseCompleted } from "@site/src/utils/learningLogic";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  type Firestore,
  type Timestamp,
} from "firebase/firestore";

export interface LearningUserProfile {
  roles: string[];
  enrolledCourseIds: string[];
}

function userRootRef(db: Firestore, userId: string) {
  return doc(db, "learningUsers", userId);
}

function enrollmentsCollection(db: Firestore, userId: string) {
  return collection(db, "learningUsers", userId, "enrollments");
}

function progressCollection(db: Firestore, userId: string) {
  return collection(db, "learningUsers", userId, "progress");
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function hasFullAccessRole(profile: LearningUserProfile | null): boolean {
  return Boolean(profile?.roles.includes(LEARNING_FULL_ACCESS_ROLE));
}

export async function loadLearningUserProfile(db: Firestore, userId: string): Promise<LearningUserProfile> {
  const snapshot = await getDoc(userRootRef(db, userId));

  let roles: string[] = [];
  let enrolledFromDoc: string[] = [];

  if (snapshot.exists()) {
    const data = snapshot.data();
    roles = isStringArray(data.roles) ? data.roles : [];
    enrolledFromDoc = isStringArray(data.enrolledCourseIds) ? data.enrolledCourseIds : [];
  }

  const enrollmentSnapshot = await getDocs(enrollmentsCollection(db, userId));
  const enrolledFromSub = enrollmentSnapshot.docs.map((document) => {
    const data = document.data();
    return typeof data.courseId === "string" ? data.courseId : document.id;
  });
  const enrolledCourseIds = Array.from(new Set([...enrolledFromDoc, ...enrolledFromSub]));

  return { roles, enrolledCourseIds };
}

export function mapFirestoreError(error: unknown): string {
  const code =
    typeof error === "object" && error !== null && "code" in error ? String((error as { code: string }).code) : "";

  switch (code) {
    case "permission-denied":
      return "Chybí oprávnění k uložení v databázi. Zkontrolujte nasazení souboru firestore.rules ve Firebase projektu.";
    case "unavailable":
      return "Databáze není dostupná. Zkuste to za chvíli znovu.";
    default:
      return "Nepodařilo se přidat kurz. Zkuste to znovu.";
  }
}

/** Přiřazení kurzu – ukládá se pouze do podkolekce enrollments (profil se načítá odtud). */
export async function enrollUserInCourse(db: Firestore, userId: string, courseId: string): Promise<void> {
  const enrollmentRef = doc(enrollmentsCollection(db, userId), courseId);
  await setDoc(
    enrollmentRef,
    {
      courseId,
      enrolledAt: serverTimestamp(),
    },
    { merge: true },
  );
}

function parseCompletedAtMs(data: Record<string, unknown>): number | undefined {
  const completedAt = data.completedAt;
  if (completedAt && typeof completedAt === "object" && "toMillis" in completedAt) {
    return (completedAt as Timestamp).toMillis();
  }
  if (typeof data.completedAtMs === "number") {
    return data.completedAtMs;
  }
  return undefined;
}

function parseProgressDocument(courseId: string, data: Record<string, unknown>): CourseProgressRecord {
  const chaptersRaw = data.chapters;
  const chapters: Record<string, ChapterProgressRecord> = {};

  if (chaptersRaw && typeof chaptersRaw === "object") {
    Object.entries(chaptersRaw as Record<string, unknown>).forEach(([chapterId, value]) => {
      const parsed = parseChapterProgress(value);
      if (parsed) {
        chapters[chapterId] = parsed;
      }
    });
  }

  return {
    courseId,
    chapters,
    completedAtMs: parseCompletedAtMs(data),
  };
}

function parseChapterProgress(value: unknown): ChapterProgressRecord | null {
  if (!value || typeof value !== "object") {
    return null;
  }
  const record = value as Record<string, unknown>;
  const quizPassed = record.quizPassed === true;
  const bestScorePercent = typeof record.bestScorePercent === "number" ? record.bestScorePercent : 0;
  const lastScorePercent = typeof record.lastScorePercent === "number" ? record.lastScorePercent : undefined;

  const materialsCompleted = record.materialsCompleted === true;

  return {
    quizPassed,
    bestScorePercent,
    lastScorePercent,
    materialsCompleted,
  };
}

/** Firestore neumí uložit `undefined` – serializujeme jen definovaná pole. */
function serializeChapterForFirestore(record: ChapterProgressRecord): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    quizPassed: record.quizPassed,
    bestScorePercent: record.bestScorePercent,
  };

  if (typeof record.lastScorePercent === "number") {
    payload.lastScorePercent = record.lastScorePercent;
  }

  if (record.materialsCompleted === true) {
    payload.materialsCompleted = true;
  }

  return payload;
}

function serializeChaptersForFirestore(chapters: Record<string, ChapterProgressRecord>): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  Object.entries(chapters).forEach(([chapterId, record]) => {
    payload[chapterId] = serializeChapterForFirestore(record);
  });
  return payload;
}

async function persistCourseProgress(
  db: Firestore,
  userId: string,
  nextProgress: CourseProgressRecord,
): Promise<CourseProgressRecord> {
  const course = getCourseById(nextProgress.courseId);
  if (course && isCourseCompleted(course, nextProgress) && !nextProgress.completedAtMs) {
    nextProgress.completedAtMs = Date.now();
  }
  if (course && !isCourseCompleted(course, nextProgress)) {
    nextProgress.completedAtMs = undefined;
  }

  const progressRef = doc(progressCollection(db, userId), nextProgress.courseId);
  await setDoc(
    progressRef,
    {
      courseId: nextProgress.courseId,
      chapters: serializeChaptersForFirestore(nextProgress.chapters),
      completedAt: nextProgress.completedAtMs ? new Date(nextProgress.completedAtMs) : null,
      completedAtMs: nextProgress.completedAtMs ?? null,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );

  return nextProgress;
}

export async function loadCourseProgress(
  db: Firestore,
  userId: string,
  courseId: string,
): Promise<CourseProgressRecord> {
  const progressRef = doc(progressCollection(db, userId), courseId);
  const snapshot = await getDoc(progressRef);

  if (!snapshot.exists()) {
    return { courseId, chapters: {} };
  }

  return parseProgressDocument(courseId, snapshot.data());
}

export async function loadAllCourseProgress(
  db: Firestore,
  userId: string,
): Promise<Record<string, CourseProgressRecord>> {
  const snapshot = await getDocs(progressCollection(db, userId));
  const result: Record<string, CourseProgressRecord> = {};

  snapshot.forEach((document) => {
    const data = document.data();
    const courseId = typeof data.courseId === "string" ? data.courseId : document.id;
    result[courseId] = parseProgressDocument(courseId, data);
  });

  return result;
}

export async function saveChapterQuizResult(
  db: Firestore,
  userId: string,
  courseId: string,
  chapterId: string,
  scorePercent: number,
  passed: boolean,
): Promise<CourseProgressRecord> {
  const existing = await loadCourseProgress(db, userId, courseId);
  const previous = existing.chapters[chapterId];
  const bestScorePercent = Math.max(previous?.bestScorePercent ?? 0, scorePercent);

  const nextChapter: ChapterProgressRecord = {
    quizPassed: passed || previous?.quizPassed === true,
    bestScorePercent,
    lastScorePercent: scorePercent,
  };
  if (previous?.materialsCompleted === true) {
    nextChapter.materialsCompleted = true;
  }

  const nextProgress: CourseProgressRecord = {
    courseId,
    chapters: {
      ...existing.chapters,
      [chapterId]: nextChapter,
    },
    completedAtMs: existing.completedAtMs,
  };

  return persistCourseProgress(db, userId, nextProgress);
}

export async function saveChapterMaterialsComplete(
  db: Firestore,
  userId: string,
  courseId: string,
  chapterId: string,
): Promise<CourseProgressRecord> {
  const existing = await loadCourseProgress(db, userId, courseId);
  const previous = existing.chapters[chapterId];

  const nextChapter: ChapterProgressRecord = {
    quizPassed: previous?.quizPassed ?? false,
    bestScorePercent: previous?.bestScorePercent ?? 0,
    materialsCompleted: true,
  };
  if (typeof previous?.lastScorePercent === "number") {
    nextChapter.lastScorePercent = previous.lastScorePercent;
  }

  const nextProgress: CourseProgressRecord = {
    courseId,
    chapters: {
      ...existing.chapters,
      [chapterId]: nextChapter,
    },
    completedAtMs: existing.completedAtMs,
  };

  return persistCourseProgress(db, userId, nextProgress);
}

export async function resetChapterQuiz(
  db: Firestore,
  userId: string,
  courseId: string,
  chapterId: string,
): Promise<CourseProgressRecord> {
  const existing = await loadCourseProgress(db, userId, courseId);
  const previous = existing.chapters[chapterId];

  const chapters = { ...existing.chapters };
  if (previous) {
    chapters[chapterId] = {
      quizPassed: false,
      bestScorePercent: previous.bestScorePercent,
    };
    if (previous.materialsCompleted === true) {
      chapters[chapterId].materialsCompleted = true;
    }
  } else {
    chapters[chapterId] = {
      quizPassed: false,
      bestScorePercent: 0,
    };
  }

  const nextProgress: CourseProgressRecord = { courseId, chapters, completedAtMs: existing.completedAtMs };

  return persistCourseProgress(db, userId, nextProgress);
}
