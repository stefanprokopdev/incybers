import CourseInfoBadges from "@site/src/components/CourseInfoBadges";
import CourseLongDescription from "@site/src/components/CourseLongDescription";
import { QUIZ_PASS_THRESHOLD_PERCENT, type LearningCourseDefinition } from "@site/src/data/learning/types";
import { chapterHasQuiz } from "@site/src/utils/chapterProgress";
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

      <h3 className={styles.heading}>Osnova kurzu</h3>
      <ol className={styles.chapters}>
        {course.chapters.map((chapter) => (
          <li key={chapter.id} className={styles.chapter}>
            <strong>{chapter.title}</strong>
            <span className={styles.chapterType}>
              {chapterHasQuiz(chapter) ? " – materiály a kvíz" : " – pouze materiály"}
            </span>
            {chapter.summary && <p className={styles.chapterSummary}>{chapter.summary}</p>}
          </li>
        ))}
      </ol>

      <h3 className={styles.heading}>Podmínky absolvování</h3>
      <p className={styles.description}>
        Kapitoly se procházejí popořadě. U kapitol s kvízem je pro splnění potřeba alespoň {QUIZ_PASS_THRESHOLD_PERCENT}
        &nbsp;% správných odpovědí, kapitoly bez kvízu se potvrzují po prostudování materiálů. Kurz je absolvován po
        splnění všech kapitol.
      </p>
    </section>
  );
}
