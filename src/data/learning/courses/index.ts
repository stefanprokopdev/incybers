import type { LearningCourseDefinition } from "@site/src/data/learning/types";

interface CourseModuleContext {
  keys(): string[];
  (key: string): Record<string, unknown>;
}

// `require.context` poskytuje webpack (Docusaurus), typy @types/webpack-env nejsou nainstalované.
declare const require: {
  context(directory: string, useSubdirectories: boolean, regExp: RegExp): CourseModuleContext;
};

function isCourseDefinition(value: unknown): value is LearningCourseDefinition {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value as Partial<LearningCourseDefinition>;
  return (
    typeof candidate.id === "string" && typeof candidate.accessCode === "string" && Array.isArray(candidate.chapters)
  );
}

function discoverCourses(): LearningCourseDefinition[] {
  const context = require.context("./", true, /^\.\/[^/]+\/index\.tsx?$/);
  return context
    .keys()
    .sort()
    .flatMap((key) => Object.values(context(key)).filter(isCourseDefinition));
}

/**
 * Registr kurzů výukové platformy.
 *
 * Každý kurz má vlastní složku `courses/<id-kurzu>/`:
 *   - `index.ts(x)`   – metadata kurzu (název, popis, obrázek, kód) a seznam kapitol;
 *                       `.tsx` je potřeba, pokud kurz používá `longDescription` (JSX),
 *   - `chapters/*.tsx` – jedna kapitola na soubor (materiály a kvíz).
 *
 * Kurzy se načítají automaticky: stačí vytvořit složku `courses/<id-kurzu>/index.ts(x)`,
 * která exportuje objekt `LearningCourseDefinition`. Žádná ruční registrace není potřeba.
 * Role `full_access` vidí všechny kurzy z tohoto pole (viz `useVisibleCourses`).
 */
export const LEARNING_COURSES: LearningCourseDefinition[] = discoverCourses();

export function getCourseById(courseId: string): LearningCourseDefinition | undefined {
  return LEARNING_COURSES.find((course) => course.id === courseId);
}

export function getCourseByAccessCode(code: string): LearningCourseDefinition | undefined {
  const normalized = code.trim();
  if (!normalized) {
    return undefined;
  }
  const normalizedUpper = normalized.toUpperCase();
  return LEARNING_COURSES.find(
    (course) => course.accessCode === normalized || course.accessCode.toUpperCase() === normalizedUpper,
  );
}

export function getChapterById(
  course: LearningCourseDefinition,
  chapterId: string,
): (typeof course.chapters)[number] | undefined {
  return course.chapters.find((chapter) => chapter.id === chapterId);
}
