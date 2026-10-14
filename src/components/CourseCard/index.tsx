import Button from "@site/src/components/Button";
import CourseCompletionBadge from "@site/src/components/CourseCompletionBadge";
import CourseInfoBadges from "@site/src/components/CourseInfoBadges";
import CourseThumbnail from "@site/src/components/CourseThumbnail";
import type {
  CourseProgressRecord,
  CourseProgressStatus,
  LearningCourseDefinition,
} from "@site/src/data/learning/types";
import { getCourseCompletionPercent, getCourseProgressStatus } from "@site/src/utils/learningLogic";
import { courseCompletionPath, courseDetailPath } from "@site/src/utils/learningRoutes";
import clsx from "clsx";
import React, { JSX } from "react";
import styles from "./index.module.css";

interface CourseCardProps {
  course: LearningCourseDefinition;
  progress: CourseProgressRecord;
}

function statusLabel(status: CourseProgressStatus): string {
  switch (status) {
    case "completed":
      return "Dokončený";
    case "in_progress":
      return "Rozpracovaný";
    default:
      return "Nový";
  }
}

function statusClass(status: CourseProgressStatus): string {
  switch (status) {
    case "completed":
      return styles.badgeCompleted;
    case "in_progress":
      return styles.badgeInProgress;
    default:
      return styles.badgeNotStarted;
  }
}

export default function CourseCard({ course, progress }: CourseCardProps): JSX.Element {
  const status = getCourseProgressStatus(course, progress);
  const completionPercent = getCourseCompletionPercent(course, progress);
  const courseUrl = courseDetailPath(course.id);
  const isCompleted = status === "completed";

  return (
    <article className={clsx(styles.card, isCompleted && styles.cardCompleted)}>
      <CourseThumbnail course={course} />
      <div className={styles.body}>
        <h2 className={styles.title}>{course.title}</h2>
        <p className={styles.description}>{course.description}</p>
        <div className={styles.meta}>
          {isCompleted ? (
            <CourseCompletionBadge />
          ) : (
            <span className={clsx(styles.badge, statusClass(status))}>{statusLabel(status)}</span>
          )}
          <CourseInfoBadges course={course} />
        </div>
        <div className={styles.progressBar} aria-hidden>
          <div className={styles.progressFill} style={{ width: `${completionPercent}%` }} />
        </div>
        <p className={styles.progressLabel}>Splněno {completionPercent}&nbsp;% kurzu</p>
      </div>
      <div className={styles.footer}>
        {isCompleted ? (
          <>
            <Button to={courseCompletionPath(course.id)} className="button--block margin-bottom--sm">
              Vyhodnocení a certifikát
            </Button>
            <Button to={courseUrl} variant="subtle" className="button--block">
              Znovu otevřít kurz
            </Button>
          </>
        ) : (
          <Button to={courseUrl} className="button--block">
            Přejít do kurzu
          </Button>
        )}
      </div>
    </article>
  );
}
