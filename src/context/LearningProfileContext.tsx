import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useAuth } from "@site/src/hooks/useAuth";
import type { CustomSiteFields } from "@site/src/types/docusaurus-config";
import { getFirebaseFirestore, type FirebaseWebConfig } from "@site/src/utils/firebase";
import {
  enrollUserInCourse,
  hasFullAccessRole,
  loadLearningUserProfile,
  mapFirestoreError,
  type LearningUserProfile,
} from "@site/src/utils/learningFirestore";
import React, { createContext, JSX, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface LearningProfileContextValue {
  profile: LearningUserProfile | null;
  loading: boolean;
  error: string | null;
  hasFullAccess: boolean;
  refresh: () => Promise<void>;
  enrollInCourse: (courseId: string) => Promise<void>;
  enrollError: string | null;
  clearEnrollError: () => void;
}

const LearningProfileContext = createContext<LearningProfileContextValue | null>(null);

export function LearningProfileProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const { user } = useAuth();
  const { siteConfig } = useDocusaurusContext();
  const firebaseConfig = (siteConfig.customFields as CustomSiteFields).firebase as FirebaseWebConfig | undefined;
  const db = useMemo(() => getFirebaseFirestore(firebaseConfig), [firebaseConfig]);

  const [profile, setProfile] = useState<LearningUserProfile | null>(null);
  const [loading, setLoading] = useState(Boolean(user));
  const [error, setError] = useState<string | null>(null);
  const [enrollError, setEnrollError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user || !db) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const nextProfile = await loadLearningUserProfile(db, user.uid);
      setProfile(nextProfile);
    } catch (loadError) {
      console.error("Failed to load learning profile:", loadError);
      setError("Nepodařilo se načíst profil výukové platformy.");
      setProfile({ roles: [], enrolledCourseIds: [] });
    } finally {
      setLoading(false);
    }
  }, [user, db]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const enrollInCourse = useCallback(
    async (courseId: string) => {
      setEnrollError(null);
      if (!user || !db) {
        const message = "Firestore není nakonfigurován nebo není dostupný.";
        setEnrollError(message);
        throw new Error(message);
      }
      try {
        await enrollUserInCourse(db, user.uid, courseId);
        await refresh();
      } catch (err) {
        const message = mapFirestoreError(err);
        setEnrollError(message);
        console.error("Course enrollment failed:", err);
        throw new Error(message);
      }
    },
    [user, db, refresh],
  );

  const clearEnrollError = useCallback(() => setEnrollError(null), []);

  const value = useMemo(
    (): LearningProfileContextValue => ({
      profile,
      loading,
      error,
      hasFullAccess: hasFullAccessRole(profile),
      refresh,
      enrollInCourse,
      enrollError,
      clearEnrollError,
    }),
    [profile, loading, error, refresh, enrollInCourse, enrollError, clearEnrollError],
  );

  return <LearningProfileContext.Provider value={value}>{children}</LearningProfileContext.Provider>;
}

export function useLearningProfile(): LearningProfileContextValue {
  const context = useContext(LearningProfileContext);
  if (!context) {
    throw new Error("useLearningProfile must be used within LearningProfileProvider");
  }
  return context;
}
