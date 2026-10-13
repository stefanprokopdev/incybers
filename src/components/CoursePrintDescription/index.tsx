import CourseInfoBadges from "@site/src/components/CourseInfoBadges";
import CourseLongDescription from "@site/src/components/CourseLongDescription";
import type { LearningCourseDefinition } from "@site/src/data/learning/types";
import clsx from "clsx";
import React, { JSX } from "react";
import styles from "./index.module.css";

interface CoursePrintDescriptionProps {
  course: LearningCourseDefinition;
  className?: string;
}

/**
 * Úplný popis kurzu určený pro tisk / PDF (např. pro auditory).
 * Na obrazovce je skrytý, zobrazí se až v tiskovém náhledu.
 */
export default function CoursePrintDescription({ course, className }: CoursePrintDescriptionProps): JSX.Element {
  return (
    <section className={clsx(styles.section, className)} aria-label="Popis kurzu">
      <p className={styles.eyebrow}>Outcybers · Výuková platforma</p>
      <h2 className={styles.title}>{course.title}</h2>
      <CourseInfoBadges course={course} className={styles.badges} />
      <p className={styles.description}>{course.description}</p>
      {course.longDescription && (
        <CourseLongDescription className={styles.longDescription}>{course.longDescription}</CourseLongDescription>
      )}
    </section>
  );
}
