import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import ChapterManualComplete from "@site/src/components/ChapterManualComplete";
import ChapterMaterials from "@site/src/components/ChapterMaterials";
import ChapterQuiz from "@site/src/components/ChapterQuiz";
import LearningShell from "@site/src/components/LearningShell";
import RequireAuth from "@site/src/components/RequireAuth";
import { getChapterById, getCourseById } from "@site/src/data/learning/courses";
import { useAuth } from "@site/src/hooks/useAuth";
import { useCanAccessCourse } from "@site/src/hooks/useCanAccessCourse";
import { useCourseProgress } from "@site/src/hooks/useCourseProgress";
import { useLearningProfile } from "@site/src/hooks/useLearningProfile";
import { chapterHasQuiz, isChapterComplete } from "@site/src/utils/chapterProgress";
import { isChapterUnlocked, isCourseCompleted } from "@site/src/utils/learningLogic";
import {
  chapterPath,
  courseCompletionPath,
  courseDetailPath,
  LEARNING_DASHBOARD_PATH,
  parseChapterIdFromSearch,
  parseCourseIdFromSearch,
} from "@site/src/utils/learningRoutes";
import Layout from "@theme/Layout";
import React, { JSX, useMemo, useState } from "react";
import styles from "./kapitola.module.css";

export default function ChapterPage(): JSX.Element {
  const location = useLocation();
  const courseId = parseCourseIdFromSearch(location.search);
  const chapterId = parseChapterIdFromSearch(location.search);
  const course = courseId ? getCourseById(courseId) : undefined;
  const chapter = course && chapterId ? getChapterById(course, chapterId) : undefined;
  const chapterIndex = course && chapter ? course.chapters.findIndex((item) => item.id === chapter.id) : -1;

  const { user } = useAuth();
  const { profile, loading: profileLoading } = useLearningProfile();
  const canAccessCourse = useCanAccessCourse(courseId, profile);
  const {
    getProgress,
    submitQuizResult,
    resetQuiz,
    markMaterialsComplete,
    loading: progressLoading,
  } = useCourseProgress(user);
  const [actionBusy, setActionBusy] = useState(false);

  const progress = useMemo(
    () => (course ? getProgress(course.id) : { courseId: courseId ?? "", chapters: {} }),
    [course, courseId, getProgress],
  );

  const unlocked = course && chapter && chapterIndex >= 0 ? isChapterUnlocked(course, chapterIndex, progress) : false;

  const nextChapter =
    course && chapterIndex >= 0 && chapterIndex < course.chapters.length - 1
      ? course.chapters[chapterIndex + 1]
      : undefined;
  const currentChapterComplete = chapter && course ? isChapterComplete(chapter, progress.chapters[chapter.id]) : false;
  const nextUnlocked = nextChapter ? currentChapterComplete : false;
  const hasQuiz = chapter ? chapterHasQuiz(chapter) : false;
  const courseCompleted = course ? isCourseCompleted(course, progress) : false;
  const isLastChapter = course && chapter ? chapterIndex === course.chapters.length - 1 : false;

  const title = chapter ? `${chapter.title} – ${course?.title ?? "Kurz"}` : "Kapitola";
  const loading = profileLoading || progressLoading;

  return (
    <Layout title={title} description={chapter?.summary ?? title} noFooter noEventBar noHeader>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <RequireAuth redirectTo="/">
        <LearningShell
          breadcrumbs={course ? [{ label: course.title, to: courseDetailPath(course.id) }] : [{ label: "Kapitola" }]}
          noNavbar
        >
          {!course || !chapter || chapterIndex < 0 ? (
            <div className="alert alert--warning" role="alert">
              Kapitola nebyla nalezena. <Link to={LEARNING_DASHBOARD_PATH}>Moje kurzy</Link>
            </div>
          ) : loading ? (
            <p>Načítám kapitolu…</p>
          ) : !canAccessCourse ? (
            <div className="alert alert--warning" role="alert">
              K tomuto kurzu nemáte přístup.
            </div>
          ) : !unlocked ? (
            <div className="alert alert--warning" role="alert">
              Tato kapitola je uzamčená. Dokončete předchozí kapitolu (kvíz nebo materiály).{" "}
              <Link to={courseDetailPath(course.id)}>Zpět na kurz</Link>
            </div>
          ) : (
            <>
              <header className={styles.header}>
                <p className={styles.eyebrow}>
                  {course.title} · Kapitola {chapterIndex + 1}
                </p>
                <h1 className={styles.title}>{chapter.title}</h1>
                {chapter.summary && <p className={styles.summary}>{chapter.summary}</p>}
              </header>

              {chapter.materials.length > 0 && (
                <section className={styles.panel} aria-label="Výukové materiály">
                  <ChapterMaterials materials={chapter.materials} />
                </section>
              )}

              {hasQuiz && chapter.quiz ? (
                <section className={styles.panel} aria-label="Kvíz kapitoly">
                  <ChapterQuiz
                    quiz={chapter.quiz}
                    chapterProgress={progress.chapters[chapter.id]}
                    submitting={actionBusy}
                    onSubmit={async (scorePercent, passed) => {
                      setActionBusy(true);
                      try {
                        await submitQuizResult(course.id, chapter.id, scorePercent, passed);
                      } finally {
                        setActionBusy(false);
                      }
                    }}
                    onReset={async () => {
                      setActionBusy(true);
                      try {
                        await resetQuiz(course.id, chapter.id);
                      } finally {
                        setActionBusy(false);
                      }
                    }}
                  />
                </section>
              ) : (
                <section className={styles.panel} aria-label="Dokončení kapitoly">
                  <ChapterManualComplete
                    chapterProgress={progress.chapters[chapter.id]}
                    submitting={actionBusy}
                    onConfirm={async () => {
                      setActionBusy(true);
                      try {
                        await markMaterialsComplete(course.id, chapter.id);
                      } finally {
                        setActionBusy(false);
                      }
                    }}
                  />
                </section>
              )}

              {nextChapter && nextUnlocked && (
                <div className={styles.nextChapter}>
                  <Link className="button button--primary" to={chapterPath(course.id, nextChapter.id)}>
                    Další kapitola: {nextChapter.title}
                  </Link>
                </div>
              )}

              {isLastChapter && courseCompleted && (
                <div className={styles.completionCta}>
                  <p className={styles.completionCtaText}>Gratulujeme – kurz máte kompletně hotový.</p>
                  <Link className="button button--primary" to={courseCompletionPath(course.id)}>
                    Závěrečné vyhodnocení a certifikát
                  </Link>
                </div>
              )}
            </>
          )}
        </LearningShell>
      </RequireAuth>
    </Layout>
  );
}
