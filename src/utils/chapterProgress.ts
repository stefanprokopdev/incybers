import type { ChapterDefinition, ChapterProgressRecord } from "@site/src/data/learning/types";

export function chapterHasQuiz(chapter: ChapterDefinition): boolean {
  return (chapter.quiz?.questions?.length ?? 0) > 0;
}

export function isChapterComplete(chapter: ChapterDefinition, record: ChapterProgressRecord | undefined): boolean {
  if (!record) {
    return false;
  }
  if (chapterHasQuiz(chapter)) {
    return record.quizPassed === true;
  }
  return record.materialsCompleted === true;
}
