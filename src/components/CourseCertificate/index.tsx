import Button from "@site/src/components/Button";
import type { CourseEvaluationSummary } from "@site/src/data/learning/types";
import { buildCertificateReference, formatCertificateDate } from "@site/src/utils/learningLogic";
import React, { JSX, useCallback, useRef } from "react";
import styles from "./index.module.css";

interface CourseCertificateProps {
  courseTitle: string;
  recipientName: string;
  userId: string;
  courseId: string;
  completedAtMs: number | undefined;
  evaluation: CourseEvaluationSummary;
}

export default function CourseCertificate({
  courseTitle,
  recipientName,
  userId,
  courseId,
  completedAtMs,
  evaluation,
}: CourseCertificateProps): JSX.Element {
  const certificateRef = useRef<HTMLDivElement>(null);
  const reference = buildCertificateReference(userId, courseId, completedAtMs);
  const completionDate = formatCertificateDate(completedAtMs);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className={styles.wrapper}>
      <p className={styles.hint}>
        Certifikát si uložíte tiskem do PDF (v dialogu tisku zvolte „Uložit jako PDF“) nebo vytisknete na papír.
      </p>
      <div className={styles.actions}>
        <Button type="button" onClick={handlePrint}>
          Stáhnout / vytisknout certifikát
        </Button>
      </div>

      <div ref={certificateRef} className={styles.certificate} id="course-certificate">
        <p className={styles.brand}>Outcybers · Výuková platforma</p>
        <h2 className={styles.title}>Certifikát o absolvování</h2>
        <p className={styles.subtitle}>Tímto potvrzujeme, že</p>
        <p className={styles.recipient}>{recipientName}</p>
        <p className={styles.subtitle}>úspěšně dokončil(a) kurz</p>
        <p className={styles.courseName}>{courseTitle}</p>
        <div className={styles.meta}>
          <span>
            Datum dokončení: <strong>{completionDate}</strong>
          </span>
          <span>
            Průměrné skóre kvízů: <strong>{evaluation.averageBestScorePercent}&nbsp;%</strong>
          </span>
          <span>
            Kapitol splněno:{" "}
            <strong>
              {evaluation.chaptersPassed}/{evaluation.chaptersTotal}
            </strong>
          </span>
        </div>
        <p className={styles.reference}>Evidenční číslo: {reference}</p>
      </div>
    </div>
  );
}
