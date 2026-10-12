export const LEARNING_DASHBOARD_PATH = "/kurzy/";

export function parseCourseIdFromSearch(search: string): string | null {
  const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
  const course = params.get("course")?.trim();
  return course || null;
}

export function parseChapterIdFromSearch(search: string): string | null {
  const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
  const chapter = params.get("chapter")?.trim();
  return chapter || null;
}

export function courseDetailPath(courseId: string): string {
  return `/kurzy/kurz/?course=${encodeURIComponent(courseId)}`;
}

export function chapterPath(courseId: string, chapterId: string): string {
  return `/kurzy/kapitola/?course=${encodeURIComponent(courseId)}&chapter=${encodeURIComponent(chapterId)}`;
}

export function courseCompletionPath(courseId: string): string {
  return `/kurzy/dokonceni/?course=${encodeURIComponent(courseId)}`;
}
