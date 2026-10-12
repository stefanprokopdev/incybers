import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import CourseCompletionBadge from "@site/src/components/CourseCompletionBadge";
import CourseThumbnail from "@site/src/components/CourseThumbnail";
import LearningShell from "@site/src/components/LearningShell";
import RequireAuth from "@site/src/components/RequireAuth";
import { getCourseById } from "@site/src/data/learning/courses";
import { useAuth } from "@site/src/hooks/useAuth";
import { useCanAccessCourse } from "@site/src/hooks/useCanAccessCourse";
import { useCourseProgress } from "@site/src/hooks/useCourseProgress";
import { useLearningProfile } from "@site/src/hooks/useLearningProfile";
import { chapterHasQuiz, isChapterComplete } from "@site/src/utils/chapterProgress";
import { isChapterUnlocked, isCourseCompleted } from "@site/src/utils/learningLogic";
import {
  chapterPath,
  courseCompletionPath,
  LEARNING_DASHBOARD_PATH,
  parseCourseIdFromSearch,
} from "@site/src/utils/learningRoutes";
import Layout from "@theme/Layout";
import clsx from "clsx";
import React, { JSX, useMemo } from "react";
import styles from "./kurz.module.css";

export default function CourseDetailPage(): JSX.Element {
  const location = useLocation();
  const courseId = parseCourseIdFromSearch(location.search);
  const course = courseId ? getCourseById(courseId) : undefined;

  const { user } = useAuth();
  const { profile, loading: profileLoading } = useLearningProfile();
  const canAccess = useCanAccessCourse(courseId, profile);
  const { getProgress, loading: progressLoading } = useCourseProgress(user);

  const progress = useMemo(
    () => (course ? getProgress(course.id) : { courseId: courseId ?? "", chapters: {} }),
    [course, courseId, getProgress],
  );

  const title = course ? course.title : "Kurz";
  const loading = profileLoading || progressLoading;
  const courseCompleted = course ? isCourseCompleted(course, progress) : false;

  return (
    <Layout title={title} description={course?.description ?? title} noFooter noEventBar noHeader>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <RequireAuth redirectTo="/">
        <LearningShell backTo={LEARNING_DASHBOARD_PATH} backLabel="Moje kurzy" noNavbar>
          {!courseId || !course ? (
            <div className="alert alert--warning" role="alert">
              Kurz nebyl nalezen. <Link to={LEARNING_DASHBOARD_PATH}>Vraťte se na seznam kurzů</Link>.
            </div>
          ) : loading ? (
            <p>Načítám kurz…</p>
          ) : !canAccess ? (
            <div className="alert alert--warning" role="alert">
              K tomuto kurzu nemáte přístup. Zadejte kód kurzu v levém panelu nebo požádejte administrátora o plný
              přístup.
            </div>
          ) : (
            <>
              <header className={styles.header}>
                <CourseThumbnail course={course} variant="banner" className={styles.headerImage} />
                <div className={styles.headerBody}>
                  <h1 className={styles.title}>{course.title}</h1>
                  <p className={styles.description}>{course.description}</p>
                  {course.instructions && course.instructions.length > 0 && (
                    <section aria-labelledby="course-instructions-title" className={styles.instructions}>
                      <h2 id="course-instructions-title" className={styles.instructionsTitle}>
                        Pokyny ke studiu
                      </h2>
                      <ol className={styles.instructionsList}>
                        {course.instructions.map((instruction) => (
                          <li key={instruction}>{instruction}</li>
                        ))}
                      </ol>
                    </section>
                  )}
                </div>
              </header>

              {courseCompleted && (
                <section className={styles.completionBanner}>
                  <CourseCompletionBadge large />
                  <p className={styles.completionText}>
                    Máte splněné všechny kvízy. Zobrazte si závěrečné vyhodnocení.
                  </p>
                  <Link className="button button--primary button--sm" to={courseCompletionPath(course.id)}>
                    Vyhodnocení a certifikát
                  </Link>
                </section>
              )}

              <ol className={styles.chapterList}>
                {course.chapters.map((chapter, index) => {
                  const unlocked = isChapterUnlocked(course, index, progress);
                  const passed = isChapterComplete(chapter, progress.chapters[chapter.id]);
                  const href = chapterPath(course.id, chapter.id);
                  const withQuiz = chapterHasQuiz(chapter);

                  return (
                    <li
                      key={chapter.id}
                      className={clsx(
                        styles.chapterItem,
                        !unlocked && styles.chapterLocked,
                        passed && styles.chapterDone,
                      )}
                    >
                      <div className={styles.chapterMeta}>
                        <span className={styles.chapterIndex}>Kapitola {index + 1}</span>
                        {passed && <span className={styles.chapterBadge}>{withQuiz ? "Kvíz splněn" : "Splněno"}</span>}
                        {!withQuiz && unlocked && !passed && (
                          <span className={styles.chapterBadgeInfo}>Jen materiály</span>
                        )}
                        {!unlocked && <span className={styles.chapterBadgeMuted}>Uzamčeno</span>}
                      </div>
                      <h2 className={styles.chapterTitle}>{chapter.title}</h2>
                      {chapter.summary && <p className={styles.chapterSummary}>{chapter.summary}</p>}
                      {unlocked ? (
                        <Link className="button button--primary button--sm" to={href}>
                          Otevřít kapitolu
                        </Link>
                      ) : (
                        <p className={styles.lockHint}>Nejdřív dokončete předchozí kapitolu.</p>
                      )}
                    </li>
                  );
                })}
              </ol>
            </>
          )}
        </LearningShell>
      </RequireAuth>
    </Layout>
  );
}
