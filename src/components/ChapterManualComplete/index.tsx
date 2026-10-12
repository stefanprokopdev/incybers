import Button from "@site/src/components/Button";
import type { ChapterProgressRecord } from "@site/src/data/learning/types";
import React, { JSX } from "react";
import styles from "./index.module.css";

interface ChapterManualCompleteProps {
  chapterProgress: ChapterProgressRecord | undefined;
  submitting: boolean;
  onConfirm: () => Promise<void>;
}

export default function ChapterManualComplete({
  chapterProgress,
  submitting,
  onConfirm,
}: ChapterManualCompleteProps): JSX.Element {
  const completed = chapterProgress?.materialsCompleted === true;

  return (
    <section className={styles.wrapper} aria-labelledby="manual-complete-heading">
      <h2 id="manual-complete-heading" className={styles.title}>
        Dokončení kapitoly
      </h2>
      <p className={styles.hint}>
        Tato kapitola nemá kvíz. Až si projdete materiály, označte kapitolu jako splněnou – tím se odemkne další
        kapitola.
      </p>

      {completed ? (
        <p className={styles.done} role="status">
          Kapitolu máte označenou jako splněnou. Můžete pokračovat na další kapitolu.
        </p>
      ) : (
        <Button type="button" disabled={submitting} onClick={() => void onConfirm()}>
          {submitting ? "Ukládám…" : "Označit kapitolu jako splněnou"}
        </Button>
      )}
    </section>
  );
}
