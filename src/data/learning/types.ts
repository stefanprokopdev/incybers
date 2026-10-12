import type { ReactNode } from "react";

export const LEARNING_FULL_ACCESS_ROLE = "full_access" as const;
export const QUIZ_PASS_THRESHOLD_PERCENT = 80;

export type LearningUserRole = typeof LEARNING_FULL_ACCESS_ROLE;

export interface QuizAnswerDefinition {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestionDefinition {
  id: string;
  prompt: string;
  answers: QuizAnswerDefinition[];
}

export interface QuizDefinition {
  questions: QuizQuestionDefinition[];
}

export interface TextMaterialBlock {
  id: string;
  kind: "text";
  title: string;
  content: ReactNode;
}

export interface VideoMaterialBlock {
  id: string;
  kind: "video";
  title: string;
  /** Embed URL (YouTube, Vimeo, …) */
  embedUrl: string;
  description?: string;
}

export type ChapterMaterialBlock = TextMaterialBlock | VideoMaterialBlock;

export interface ChapterDefinition {
  id: string;
  title: string;
  summary?: string;
  materials: ChapterMaterialBlock[];
  /** Když chybí nebo je prázdný, kapitolu lze ručně označit jako splněnou. */
  quiz?: QuizDefinition;
}

export interface CourseImage {
  /** Cesta k obrázku ve složce `static/` (např. `/img/kurzy/nazev.svg`) */
  src: string;
  alt: string;
}

export interface LearningCourseDefinition {
  id: string;
  title: string;
  description: string;
  /** Náhledový obrázek zobrazený v seznamu kurzů a na úvodu detailu kurzu */
  image?: CourseImage;
  /** Pokyny ke studiu zobrazené na úvodu detailu kurzu */
  instructions?: string[];
  /** Kód pro přihlášení ke kurzu (heslo) */
  accessCode: string;
  chapters: ChapterDefinition[];
}

export interface ChapterProgressRecord {
  quizPassed: boolean;
  bestScorePercent: number;
  lastScorePercent?: number;
  /** Ruční potvrzení u kapitol bez kvízu */
  materialsCompleted?: boolean;
}

export interface CourseProgressRecord {
  courseId: string;
  chapters: Record<string, ChapterProgressRecord>;
  /** Unix ms – první úplné dokončení všech kvízů v kurzu */
  completedAtMs?: number;
}

export interface CourseEvaluationSummary {
  chaptersTotal: number;
  chaptersPassed: number;
  averageBestScorePercent: number;
  overallLabel: string;
  overallDescription: string;
}

export type CourseProgressStatus = "not_started" | "in_progress" | "completed";
