import Button from "@site/src/components/Button";
import type { ChapterProgressRecord, QuizDefinition } from "@site/src/data/learning/types";
import { QUIZ_PASS_THRESHOLD_PERCENT } from "@site/src/data/learning/types";
import { calculateQuizScorePercent, isQuizPassed } from "@site/src/utils/learningLogic";
import clsx from "clsx";
import React, { FormEvent, JSX, useEffect, useMemo, useState } from "react";
import styles from "./index.module.css";

type AnswerVerdict = "correct" | "wrong";

const VERDICT_LABELS: Record<AnswerVerdict, string> = {
  correct: "✓ Správně",
  wrong: "✗ Špatně",
};

/**
 * Stav se určuje jen u odpovědí, které uživatel vybral. Správnou odpověď, kterou nevybral, záměrně
 * neprozrazujeme – při chybě tak uživatel nezjistí, co mělo být správně.
 */
function getAnswerVerdict(reviewed: boolean, selected: boolean, isCorrect: boolean): AnswerVerdict | null {
  if (!reviewed || !selected) {
    return null;
  }
  return isCorrect ? "correct" : "wrong";
}

interface ChapterQuizProps {
  quiz: QuizDefinition;
  chapterProgress: ChapterProgressRecord | undefined;
  onSubmit: (scorePercent: number, passed: boolean) => Promise<void>;
  onReset: () => Promise<void>;
  submitting: boolean;
}

export default function ChapterQuiz({
  quiz,
  chapterProgress,
  onSubmit,
  onReset,
  submitting,
}: ChapterQuizProps): JSX.Element {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [lastResult, setLastResult] = useState<{ scorePercent: number; passed: boolean } | null>(null);

  const alreadyPassed = chapterProgress?.quizPassed === true;

  /**
   * Neúspěšný pokus zamkne odpovědi, dokud uživatel kvíz neresetuje. Stav se bere i z uloženého postupu
   * (`lastScorePercent` bez `quizPassed`), takže zámek přežije obnovení stránky; reset `lastScorePercent` maže.
   */
  const failedScorePercent = alreadyPassed
    ? undefined
    : lastResult !== null
      ? lastResult.passed
        ? undefined
        : lastResult.scorePercent
      : chapterProgress?.lastScorePercent;
  const locked = failedScorePercent !== undefined;

  /**
   * Po vyhodnocení v aktuální relaci zvýrazníme stav odpovědí, které uživatel vybral (správně / špatně).
   * Vybrané odpovědi se neukládají, takže po obnovení stránky už zvýrazněné nejsou.
   */
  const reviewed = lastResult !== null;

  useEffect(() => {
    setAnswers({});
    setLastResult(null);
  }, [quiz]);

  const questionCount = quiz.questions.length;

  const handleChange = (questionId: string, answerId: string) => {
    setAnswers((current) => ({ ...current, [questionId]: answerId }));
  };

  const allAnswered = useMemo(
    () => quiz.questions.every((question) => Boolean(answers[question.id])),
    [quiz.questions, answers],
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!allAnswered || locked || alreadyPassed) {
      return;
    }

    let correct = 0;
    quiz.questions.forEach((question) => {
      const selectedId = answers[question.id];
      const correctAnswer = question.answers.find((answer) => answer.isCorrect);
      if (correctAnswer && selectedId === correctAnswer.id) {
        correct += 1;
      }
    });

    const scorePercent = calculateQuizScorePercent(correct, questionCount);
    const passed = isQuizPassed(scorePercent);
    setLastResult({ scorePercent, passed });
    await onSubmit(scorePercent, passed);
  };

  const handleReset = async () => {
    setAnswers({});
    setLastResult(null);
    await onReset();
  };

  return (
    <section className={styles.wrapper} aria-labelledby="chapter-quiz-heading">
      <h2 id="chapter-quiz-heading" className={styles.title}>
        Kvíz kapitoly
        {alreadyPassed && <span className={styles.passedBadge}>Splněno</span>}
      </h2>
      <p className={styles.hint}>
        Kvíz nelze přeskočit. Pro splnění potřebujete alespoň {QUIZ_PASS_THRESHOLD_PERCENT}&nbsp;%. Po neúspěchu je
        potřeba kvíz nejdřív resetovat, teprve potom můžete odpovědi vyplnit znovu.
      </p>

      <form onSubmit={(event) => void handleSubmit(event)} noValidate>
        {quiz.questions.map((question, index) => (
          <fieldset key={question.id} className={clsx(styles.question, locked && !reviewed && styles.questionLocked)}
            disabled={locked}
          >
            <legend className={styles.prompt}>
              {index + 1}. {question.prompt}
            </legend>
            <div className={styles.answers}>
              {question.answers.map((answer) => {
                const selected = answers[question.id] === answer.id;
                const verdict = getAnswerVerdict(reviewed, selected, answer.isCorrect);

                return (
                  <label
                    key={answer.id}
                    className={clsx(
                      styles.answerLabel,
                      verdict === "correct" && styles.answerCorrect,
                      verdict === "wrong" && styles.answerWrong,
                    )}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={answer.id}
                      checked={selected}
                      onChange={() => handleChange(question.id, answer.id)}
                      disabled={submitting || alreadyPassed || locked}
                      required
                    />
                    <span className={styles.answerText}>{answer.text}</span>
                    {verdict && <span className={styles.answerVerdict}>{VERDICT_LABELS[verdict]}</span>}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div className={styles.actions}>
          {!alreadyPassed && !locked && (
            <Button type="submit" disabled={!allAnswered || submitting}>
              {submitting ? "Odesílám…" : "Vyhodnotit kvíz"}
            </Button>
          )}
          {(alreadyPassed || locked || lastResult !== null || (chapterProgress?.bestScorePercent ?? 0) > 0) && (
            <Button type="button" variant="outline" onClick={() => void handleReset()} disabled={submitting}>
              Resetovat kvíz
            </Button>
          )}
        </div>

        {lastResult?.passed && (
          <p className={`${styles.result} ${styles.resultSuccess}`} role="status">
            Gratulujeme, kvíz jste splnili ({lastResult.scorePercent}&nbsp;%).
          </p>
        )}

        {locked && failedScorePercent !== undefined && (
          <p className={`${styles.result} ${styles.resultFail}`} role="status">
            Kvíz nebyl splněn ({failedScorePercent}&nbsp;%, minimum je {QUIZ_PASS_THRESHOLD_PERCENT}&nbsp;%). Pro nový
            pokus nejdřív klikněte na „Resetovat kvíz“.
          </p>
        )}

        {alreadyPassed && lastResult === null && chapterProgress?.lastScorePercent !== undefined && (
          <p className={`${styles.result} ${styles.resultSuccess}`} role="status">
            Kvíz máte splněný (poslední skóre {chapterProgress.lastScorePercent} %).
          </p>
        )}
      </form>
    </section>
  );
}
