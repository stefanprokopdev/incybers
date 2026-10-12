import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { CourseProgressRecord } from "@site/src/data/learning/types";
import type { CustomSiteFields } from "@site/src/types/docusaurus-config";
import { type FirebaseWebConfig, getFirebaseFirestore } from "@site/src/utils/firebase";
import {
  loadAllCourseProgress,
  loadCourseProgress,
  resetChapterQuiz,
  saveChapterMaterialsComplete,
  saveChapterQuizResult,
} from "@site/src/utils/learningFirestore";
import { createEmptyCourseProgress } from "@site/src/utils/learningLogic";
import type { User } from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface CourseProgressState {
  progressByCourse: Record<string, CourseProgressRecord>;
  loading: boolean;
  error: string | null;
  getProgress: (courseId: string) => CourseProgressRecord;
  submitQuizResult: (courseId: string, chapterId: string, scorePercent: number, passed: boolean) => Promise<void>;
  resetQuiz: (courseId: string, chapterId: string) => Promise<void>;
  markMaterialsComplete: (courseId: string, chapterId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useCourseProgress(user: User | null): CourseProgressState {
  const { siteConfig } = useDocusaurusContext();
  const firebaseConfig = (siteConfig.customFields as CustomSiteFields).firebase as FirebaseWebConfig | undefined;
  const db = useMemo(() => getFirebaseFirestore(firebaseConfig), [firebaseConfig]);

  const [progressByCourse, setProgressByCourse] = useState<Record<string, CourseProgressRecord>>({});
  const [loading, setLoading] = useState(Boolean(user));
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user || !db) {
      setProgressByCourse({});
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const allProgress = await loadAllCourseProgress(db, user.uid);
      setProgressByCourse(allProgress);
    } catch {
      setError("Nepodařilo se načíst průběh kurzů.");
      setProgressByCourse({});
    } finally {
      setLoading(false);
    }
  }, [user, db]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const getProgress = useCallback(
    (courseId: string) => progressByCourse[courseId] ?? createEmptyCourseProgress(courseId),
    [progressByCourse],
  );

  const submitQuizResult = useCallback(
    async (courseId: string, chapterId: string, scorePercent: number, passed: boolean) => {
      if (!user || !db) {
        setError("Firestore není dostupný. Výsledek kvízu se neuložil.");
        return;
      }
      const updated = await saveChapterQuizResult(db, user.uid, courseId, chapterId, scorePercent, passed);
      setProgressByCourse((current) => ({ ...current, [courseId]: updated }));
    },
    [user, db],
  );

  const resetQuiz = useCallback(
    async (courseId: string, chapterId: string) => {
      if (!user || !db) {
        setError("Firestore není dostupný. Kvíz se nepodařilo resetovat.");
        return;
      }
      const updated = await resetChapterQuiz(db, user.uid, courseId, chapterId);
      setProgressByCourse((current) => ({ ...current, [courseId]: updated }));
    },
    [user, db],
  );

  const markMaterialsComplete = useCallback(
    async (courseId: string, chapterId: string) => {
      if (!user || !db) {
        setError("Firestore není dostupný. Stav kapitoly se neuložil.");
        return;
      }
      const updated = await saveChapterMaterialsComplete(db, user.uid, courseId, chapterId);
      setProgressByCourse((current) => ({ ...current, [courseId]: updated }));
    },
    [user, db],
  );

  return {
    progressByCourse,
    loading,
    error,
    getProgress,
    submitQuizResult,
    resetQuiz,
    markMaterialsComplete,
    refresh,
  };
}

export async function fetchSingleCourseProgress(
  db: NonNullable<ReturnType<typeof getFirebaseFirestore>>,
  userId: string,
  courseId: string,
): Promise<CourseProgressRecord> {
  return loadCourseProgress(db, userId, courseId);
}
