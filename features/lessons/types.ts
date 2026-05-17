export type LessonLanguage = "en" | "zu" | "st";

export type LessonContentSection = {
  heading: string;
  paragraphs: string[];
};

export type LessonRhythmMedia = {
  src: string;
  label: string;
  description: string;
  aspectRatio?: "16:9" | "3:2" | "4:5";
};

export type LessonVariant = {
  id: string;
  lessonGroupId: string;
  language: LessonLanguage;
  title: string;
  summary: string;
  readerIntro: string;
  readerSections: LessonContentSection[];
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
