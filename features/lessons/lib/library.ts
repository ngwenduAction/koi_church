import { lessonLanguageOptions, type LessonLanguage, type LessonVariant } from "../types";

export type LessonGroup = {
  id: string;
  slug: string;
  title: string;
  category: string;
  scriptureReference: string;
  summary: string;
  variants: LessonVariant[];
  languages: LessonLanguage[];
  relatedTeachingSlug?: string;
  videoUrl?: string;
  audioUrl?: string;
};

const languageSortOrder = new Map(lessonLanguageOptions.map((language, index) => [language, index]));

export function groupLessonVariants(variants: LessonVariant[]): LessonGroup[] {
  const grouped = variants.reduce<Map<string, LessonVariant[]>>((groups, lesson) => {
    const current = groups.get(lesson.lessonGroupId) ?? [];
    current.push(lesson);
    groups.set(lesson.lessonGroupId, current);
    return groups;
  }, new Map());

  return Array.from(grouped.entries()).map(([id, groupVariants]) => {
    const sortedVariants = [...groupVariants].sort(
      (left, right) => (languageSortOrder.get(left.language) ?? 0) - (languageSortOrder.get(right.language) ?? 0),
    );
    const canonical = sortedVariants.find((variant) => variant.language === "en") ?? sortedVariants[0];
    const languages = Array.from(new Set(sortedVariants.map((variant) => variant.language))) as LessonLanguage[];

    return {
      id,
      slug: id,
      title: canonical.title,
      category: canonical.category,
      scriptureReference: canonical.scriptureReferences.join(" / "),
      summary: canonical.summary,
      variants: sortedVariants,
      languages,
      relatedTeachingSlug: canonical.relatedTeachingSlug,
      videoUrl: canonical.videoUrl,
      audioUrl: canonical.audioUrl,
    };
  });
}

export function getLessonGroupBySlug(variants: LessonVariant[], slug: string): LessonGroup | null {
  return groupLessonVariants(variants).find((lesson) => lesson.slug === slug) ?? null;
}
