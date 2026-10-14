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
  description?: string;
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
  /**
   * Další dlouhý popis kurzu jako React obsah (odstavce, seznamy, odkazy, nadpisy…).
   * Zobrazí se na detailu kurzu pod krátkým popisem. Soubor kurzu musí mít příponu `.tsx`.
   */
  longDescription?: ReactNode;
  /** Čas potřebný ke splnění kurzu zobrazený v badge (např. `"3 hodiny"` nebo `"2 h 30 min"`) */
  estimatedTime?: string;
  /** Počet CPE kreditů zobrazený v badge (lze i desetinné číslo, např. `2.5`) */
  cpeCredits?: number;
  /** Náhledový obrázek zobrazený v seznamu kurzů a na úvodu detailu kurzu */
  image?: CourseImage;
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
