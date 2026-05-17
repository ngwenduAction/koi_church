import {
  lessonLanguageOptions,
  type LessonLanguage,
  type LessonRhythmMedia,
  type LessonVariant,
} from "../types";

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
  rhythmMedia: LessonRhythmMedia[];
};

const languageSortOrder = new Map(lessonLanguageOptions.map((language, index) => [language, index]));

function rhythmMediaForLesson(slug: string): LessonRhythmMedia[] {
  switch (slug) {
    case "the-law-and-the-testimony":
      return [
        {
          src: "/media/cinematic-manuscript.jpg",
          label: "Reading still",
          description: "A manuscript atmosphere between the opening and closing doctrinal sections.",
          aspectRatio: "16:9",
        },
        {
          src: "/media/cinematic-first-fruits.jpg",
          label: "Witness still",
          description: "A quiet first-fruits still that punctuates the final section of the lesson.",
          aspectRatio: "3:2",
        },
      ];
    case "the-sabbath-and-the-ten-commandments":
      return [
        {
          src: "/media/linen-texture-bg.jpg",
          label: "Sabbath still",
          description: "A restrained linen surface between the doctrinal headings.",
          aspectRatio: "16:9",
        },
      ];
    case "the-feasts-of-the-lord":
      return [
        {
          src: "/media/cinematic-first-fruits.jpg",
          label: "Appointed times still",
          description: "A first-fruits still introducing the cycle of sacred time.",
          aspectRatio: "16:9",
        },
      ];
    case "clean-and-unclean-leviticus-11":
      return [
        {
          src: "/media/linen-texture-bg.jpg",
          label: "Dietary order still",
          description: "A quiet still between the two dietary study sections.",
          aspectRatio: "3:2",
        },
      ];
    default:
      return [];
  }
}

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
      rhythmMedia: rhythmMediaForLesson(id),
    };
  });
}

export function getLessonGroupBySlug(variants: LessonVariant[], slug: string): LessonGroup | null {
  return groupLessonVariants(variants).find((lesson) => lesson.slug === slug) ?? null;
}
