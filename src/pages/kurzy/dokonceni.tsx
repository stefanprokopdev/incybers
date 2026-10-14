import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import CertificateNameForm from "@site/src/components/CertificateNameForm";
import CourseCertificate from "@site/src/components/CourseCertificate";
import CourseCompletionBadge from "@site/src/components/CourseCompletionBadge";
import CoursePrintDescription from "@site/src/components/CoursePrintDescription";
import LearningShell from "@site/src/components/LearningShell";
import RequireAuth from "@site/src/components/RequireAuth";
import { getCourseById } from "@site/src/data/learning/courses";
import { useAuth } from "@site/src/hooks/useAuth";
import { useCanAccessCourse } from "@site/src/hooks/useCanAccessCourse";
import { useCourseProgress } from "@site/src/hooks/useCourseProgress";
import { useLearningProfile } from "@site/src/hooks/useLearningProfile";
import { chapterHasQuiz, isChapterComplete } from "@site/src/utils/chapterProgress";
import { getCertificateRecipientName, getCourseEvaluation, isCourseCompleted } from "@site/src/utils/learningLogic";
import { courseDetailPath, LEARNING_DASHBOARD_PATH, parseCourseIdFromSearch } from "@site/src/utils/learningRoutes";
import Layout from "@theme/Layout";
import React, { JSX, useMemo, useState } from "react";
import styles from "./dokonceni.module.css";

export default function CourseCompletionPage(): JSX.Element {
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

  const [savedName, setSavedName] = useState<string | null>(null);
  const recipientName = getCertificateRecipientName(savedName ?? user?.displayName);

  const completed = course ? isCourseCompleted(course, progress) : false;
  const evaluation = course ? getCourseEvaluation(course, progress) : null;
  const loading = profileLoading || progressLoading;
  const title = course ? `Dokončení – ${course.title}` : "Dokončení kurzu";

  return (
    <Layout title={title} description={title} noFooter noEventBar noHeader>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <RequireAuth redirectTo="/">
        <LearningShell
          breadcrumbs={
            course ? [{ label: course.title, to: courseDetailPath(course.id) }] : [{ label: "Dokončení kurzu" }]
          }
          noNavbar
        >
          {!courseId || !course ? (
            <div className="alert alert--warning" role="alert">
              Kurz nebyl nalezen. <Link to={LEARNING_DASHBOARD_PATH}>Moje kurzy</Link>
            </div>
          ) : loading ? (
            <p>Načítám vyhodnocení…</p>
          ) : !canAccess ? (
            <div className="alert alert--warning" role="alert">
              K tomuto kurzu nemáte přístup.
            </div>
          ) : !completed || !evaluation ? (
            <div className="alert alert--warning" role="alert">
              Kurz ještě není kompletně dokončený. Splňte kvízy ve všech kapitolách.{" "}
              <Link to={courseDetailPath(course.id)}>Zpět na kurz</Link>
            </div>
          ) : (
            <div className={styles.printLayout}>
              <CoursePrintDescription course={course} className={styles.printDescription} />

              <header className={styles.header}>
                <CourseCompletionBadge large />
                <h1 className={styles.title}>Gratulujeme k dokončení kurzu</h1>
                <p className={styles.lead}>
                  Úspěšně jste splnili všechny povinné kvízy v kurzu <strong>{course.title}</strong>. Souhrnné
                  vyhodnocení i certifikát najdete na této stránce.
                </p>
              </header>

              <div className={styles.summaryGrid}>
                <div className={styles.statCard}>
                  <p className={styles.statValue}>{evaluation.averageBestScorePercent}&nbsp;%</p>
                  <p className={styles.statLabel}>Průměrné nejlepší skóre</p>
                </div>
                <div className={styles.statCard}>
                  <p className={styles.statValue}>
                    {evaluation.chaptersPassed}/{evaluation.chaptersTotal}
                  </p>
                  <p className={styles.statLabel}>Splněné kapitoly</p>
                </div>
              </div>

              <section className={styles.evaluation} aria-labelledby="evaluation-heading">
                <h2 id="evaluation-heading" className={styles.evaluationTitle}>
                  {evaluation.overallLabel}
                </h2>
                <p className={styles.evaluationText}>{evaluation.overallDescription}</p>
              </section>

              <section className={styles.chapterScores} aria-labelledby="chapter-scores-heading">
                <h2 id="chapter-scores-heading" className={styles.chapterScoresTitle}>
                  Skóre podle kapitol
                </h2>
                <ul className={styles.scoreList}>
                  {course.chapters.map((chapter, index) => {
                    const chapterProgress = progress.chapters[chapter.id];
                    const score = chapterProgress?.bestScorePercent ?? 0;
                    const complete = isChapterComplete(chapter, chapterProgress);
                    const scoreLabel = !complete ? "—" : chapterHasQuiz(chapter) ? `${score} %` : "Splněno (materiály)";
                    return (
                      <li key={chapter.id} className={styles.scoreItem}>
                        <span>
                          {index + 1}. {chapter.title}
                        </span>
                        <span>{scoreLabel}</span>
                      </li>
                    );
                  })}
                </ul>
              </section>

              {user &&
                (recipientName ? (
                  <div className={styles.printCertificate}>
                    <CourseCertificate
                      courseTitle={course.title}
                      recipientName={recipientName}
                      userId={user.uid}
                      courseId={course.id}
                      completedAtMs={progress.completedAtMs}
                      evaluation={evaluation}
                      estimatedTime={course.estimatedTime}
                      cpeCredits={course.cpeCredits}
                    />
                  </div>
                ) : (
                  <CertificateNameForm user={user} onSaved={setSavedName} />
                ))}
            </div>
          )}
        </LearningShell>
      </RequireAuth>
    </Layout>
  );
}
