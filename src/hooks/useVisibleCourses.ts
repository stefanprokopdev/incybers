import { LEARNING_COURSES } from "@site/src/data/learning/courses";
import type { LearningCourseDefinition } from "@site/src/data/learning/types";
import type { LearningUserProfile } from "@site/src/utils/learningFirestore";
import { hasFullAccessRole } from "@site/src/utils/learningFirestore";
import { useMemo } from "react";

export function useVisibleCourses(profile: LearningUserProfile | null): LearningCourseDefinition[] {
  const enrolledCourseIds = profile?.enrolledCourseIds ?? [];
  const roles = profile?.roles ?? [];

  return useMemo(() => {
    const profileSnapshot: LearningUserProfile = { roles, enrolledCourseIds };
    if (hasFullAccessRole(profileSnapshot)) {
      return LEARNING_COURSES;
    }
    const enrolled = new Set(enrolledCourseIds);
    return LEARNING_COURSES.filter((course) => enrolled.has(course.id));
  }, [enrolledCourseIds, roles]);
}
