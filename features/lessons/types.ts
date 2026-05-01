export type LessonLanguage = "en" | "zu" | "st";

export type LessonVariant = {
  id: string;
  lessonGroupId: string;
  language: LessonLanguage;
  title: string;
  summary: string;
  pdfUrl: string;
  date: string;
  category: string;
  scriptureReferences: string[];
  relatedTeachingSlug?: string;
  featured?: boolean;
};
