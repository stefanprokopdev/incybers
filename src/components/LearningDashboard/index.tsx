import CourseCard from "@site/src/components/CourseCard";
import type { CourseProgressRecord, LearningCourseDefinition } from "@site/src/data/learning/types";
import React, { JSX } from "react";
import styles from "./index.module.css";

interface LearningDashboardProps {
  courses: LearningCourseDefinition[];
  getProgress: (courseId: string) => CourseProgressRecord;
  hasFullAccess: boolean;
  loading: boolean;
}

export default function LearningDashboard({
  courses,
  getProgress,
  hasFullAccess,
  loading,
}: LearningDashboardProps): JSX.Element {
  return (
    <div>
      <header className={styles.hero}>
        <h1 className={styles.title}>Moje kurzy</h1>
        <p className={styles.subtitle}>
          {hasFullAccess
            ? "Máte přístup ke všem kurzům na platformě. Vyberte kurz a pokračujte v kapitolách, materiálech a kvízech."
            : "Zde jsou kurzy, ke kterým jste přihlášeni. Nový kurz přidáte zadáním kódu v levém panelu."}
        </p>
      </header>

      {loading && <p className={styles.loading}>Načítám kurzy a váš postup…</p>}

      {!loading && courses.length === 0 && (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Zatím nemáte žádný kurz</p>
          <p className={styles.emptyHint}>
            Po přihlášení použijte pole „Kód kurzu“ v levém panelu. Pro testovací kurz zadejte kód{" "}
            <strong>TEST2026</strong>.
          </p>
        </div>
      )}

      {!loading && courses.length > 0 && (
        <div className={styles.grid}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} progress={getProgress(course.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
