import { getCourseById } from "@site/src/data/learning/courses";
import type { LearningUserProfile } from "@site/src/utils/learningFirestore";
import { hasFullAccessRole } from "@site/src/utils/learningFirestore";
import { useMemo } from "react";

export function useCanAccessCourse(courseId: string | null, profile: LearningUserProfile | null): boolean {
  return useMemo(() => {
    if (!courseId) {
      return false;
    }
    const course = getCourseById(courseId);
    if (!course) {
      return false;
    }
    if (hasFullAccessRole(profile)) {
      return true;
    }
    return Boolean(profile?.enrolledCourseIds.includes(courseId));
  }, [courseId, profile]);
}
