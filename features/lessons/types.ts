export type LessonLanguage = "en" | "zu" | "st";

export type LessonVariant = {
  id: string;
  lessonGroupId: string;
  language: LessonLanguage;
  title: string;
  summary: string;
  pdfUrl: string;
  videoUrl?: string;
  audioUrl?: string;
  date: string;
  category: string;
  scriptureReferences: string[];
  relatedTeachingSlug?: string;
  featured?: boolean;
};

export const lessonLanguageLabels: Record<LessonLanguage, string> = {
  en: "English",
  zu: "IsiZulu",
  st: "Sesotho",
};

export const lessonLanguageOptions: LessonLanguage[] = ["en", "zu", "st"];

export function isLessonLanguage(value: string): value is LessonLanguage {
  return value === "en" || value === "zu" || value === "st";
}
