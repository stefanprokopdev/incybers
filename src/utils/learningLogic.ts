import type {
  CourseEvaluationSummary,
  CourseProgressRecord,
  CourseProgressStatus,
  LearningCourseDefinition,
} from "@site/src/data/learning/types";
import { QUIZ_PASS_THRESHOLD_PERCENT } from "@site/src/data/learning/types";
import { chapterHasQuiz, isChapterComplete } from "@site/src/utils/chapterProgress";

export function calculateQuizScorePercent(correctCount: number, totalQuestions: number): number {
  if (totalQuestions <= 0) {
    return 0;
  }
  return Math.round((correctCount / totalQuestions) * 100);
}

export function isQuizPassed(scorePercent: number): boolean {
  return scorePercent >= QUIZ_PASS_THRESHOLD_PERCENT;
}

export function isChapterUnlocked(
  course: LearningCourseDefinition,
  chapterIndex: number,
  progress: CourseProgressRecord,
): boolean {
  if (chapterIndex <= 0) {
    return true;
  }

  const previousChapter = course.chapters[chapterIndex - 1];
  if (!previousChapter) {
    return true;
  }

  return isChapterComplete(previousChapter, progress.chapters[previousChapter.id]);
}

export function getCourseProgressStatus(
  course: LearningCourseDefinition,
  progress: CourseProgressRecord,
): CourseProgressStatus {
  if (course.chapters.length === 0) {
    return "not_started";
  }

  const allPassed = course.chapters.every((chapter) => isChapterComplete(chapter, progress.chapters[chapter.id]));
  if (allPassed) {
    return "completed";
  }

  const anyActivity = course.chapters.some((chapter) => {
    const record = progress.chapters[chapter.id];
    return (
      isChapterComplete(chapter, record) ||
      record?.materialsCompleted === true ||
      record?.quizPassed === true ||
      (record?.bestScorePercent ?? 0) > 0
    );
  });

  return anyActivity ? "in_progress" : "not_started";
}

export function getCourseCompletionPercent(course: LearningCourseDefinition, progress: CourseProgressRecord): number {
  if (course.chapters.length === 0) {
    return 0;
  }
  const passedCount = course.chapters.filter((chapter) =>
    isChapterComplete(chapter, progress.chapters[chapter.id]),
  ).length;
  return Math.round((passedCount / course.chapters.length) * 100);
}

export function createEmptyCourseProgress(courseId: string): CourseProgressRecord {
  return {
    courseId,
    chapters: {},
  };
}

export function isCourseCompleted(course: LearningCourseDefinition, progress: CourseProgressRecord): boolean {
  return getCourseProgressStatus(course, progress) === "completed";
}

export function getCourseEvaluation(
  course: LearningCourseDefinition,
  progress: CourseProgressRecord,
): CourseEvaluationSummary {
  const chaptersTotal = course.chapters.length;
  const chaptersPassed = course.chapters.filter((chapter) =>
    isChapterComplete(chapter, progress.chapters[chapter.id]),
  ).length;

  const scores = course.chapters
    .filter((chapter) => chapterHasQuiz(chapter))
    .map((chapter) => progress.chapters[chapter.id]?.bestScorePercent ?? 0)
    .filter((score) => score > 0);

  const averageBestScorePercent =
    scores.length > 0 ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0;

  let overallLabel = "Splněno";
  let overallDescription = "Splnili jste všechny kapitoly kurzu včetně kvízů a materiálových modulů.";

  if (averageBestScorePercent >= 95) {
    overallLabel = "Výborné výsledky";
    overallDescription = "Vaše skóre v kvízech je na velmi vysoké úrovni.";
  } else if (averageBestScorePercent >= 85) {
    overallLabel = "Velmi dobré výsledky";
    overallDescription = "Kvízy jste zvládli s jistotou nad požadovaným minimem 80 %.";
  } else if (averageBestScorePercent >= 80) {
    overallLabel = "Úspěšné dokončení";
    overallDescription = "Splnili jste minima u všech kvízů – gratulujeme k dokončení kurzu.";
  }

  return {
    chaptersTotal,
    chaptersPassed,
    averageBestScorePercent,
    overallLabel,
    overallDescription,
  };
}

export function formatCertificateDate(completedAtMs: number | undefined): string {
  const date = completedAtMs ? new Date(completedAtMs) : new Date();
  return date.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Zredukuje opakované mezery a odstraní okrajové mezery. */
export function normalizeFullName(name: string | null | undefined): string {
  return (name ?? "").trim().replace(/\s+/g, " ");
}

/** Celé jméno musí obsahovat alespoň křestní jméno a příjmení (dvě slova). */
export function isFullName(name: string | null | undefined): boolean {
  return normalizeFullName(name).split(" ").filter(Boolean).length >= 2;
}

/** Vrátí jméno pro certifikát, nebo `null`, pokud účet nemá uložené jméno i s příjmením. */
export function getCertificateRecipientName(displayName: string | null | undefined): string | null {
  const normalized = normalizeFullName(displayName);
  return isFullName(normalized) ? normalized : null;
}

/** Počet CPE kreditů v českém formátu (např. `2,5`). */
export function formatCpeCredits(credits: number): string {
  return credits.toLocaleString("cs-CZ");
}

export function buildCertificateReference(userId: string, courseId: string, completedAtMs: number | undefined): string {
  const seed = `${userId}:${courseId}:${completedAtMs ?? "pending"}`;
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(index);
    hash |= 0;
  }
  const code = Math.abs(hash).toString(36).toUpperCase().padStart(8, "0").slice(0, 8);
  return `OC-${code}`;
}
