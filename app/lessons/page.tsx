import type { Metadata } from "next";
import { lessonVariants } from "../../content/lessons";
import { LessonLanguageFilters } from "../../features/lessons/components/LessonLanguageFilters";
import {
  isLessonLanguage,
  lessonLanguageLabels,
  lessonLanguageOptions,
  type LessonLanguage,
  type LessonVariant,
} from "../../features/lessons/types";
import { Container } from "../../shared/components/Container";

export const metadata: Metadata = {
  title: "Lessons | Kingdom of Israel",
  description:
    "Multilingual Sabbath lesson documents from Kingdom of Israel, prepared in English, IsiZulu, and Sesotho for study and download.",
};

type LessonsPageProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

type LessonGroup = {
  id: string;
  title: string;
  category: string;
  scriptureReference: string;
  summary: string;
  variants: LessonVariant[];
};

const languageSortOrder = new Map(lessonLanguageOptions.map((language, index) => [language, index]));

function groupLessons(variants: LessonVariant[]): LessonGroup[] {
  const grouped = variants.reduce<Map<string, LessonVariant[]>>((groups, lesson) => {
    const current = groups.get(lesson.lessonGroupId) ?? [];
    current.push(lesson);
    groups.set(lesson.lessonGroupId, current);
    return groups;
  }, new Map());

  return Array.from(grouped.entries()).map(([id, groupVariants]) => {
    const canonical = groupVariants[0];

    return {
      id,
      title: canonical.title,
      category: canonical.category,
      scriptureReference: canonical.scriptureReferences.join(" / "),
      summary: canonical.summary,
      variants: [...groupVariants].sort(
        (left, right) => (languageSortOrder.get(left.language) ?? 0) - (languageSortOrder.get(right.language) ?? 0),
      ),
    };
  });
}

export default async function LessonsPage({ searchParams }: LessonsPageProps) {
  const params = (await searchParams) ?? {};
  const requestedLanguage = params.lang?.toLowerCase();
  const activeLanguage: "all" | LessonLanguage =
    requestedLanguage && isLessonLanguage(requestedLanguage) ? requestedLanguage : "all";

  const groupedLessons = groupLessons(lessonVariants);
  const visibleLessons =
    activeLanguage === "all"
      ? groupedLessons
      : groupedLessons.filter((lesson) => lesson.variants.some((variant) => variant.language === activeLanguage));

  return (
    <section className="lessons-page" aria-labelledby="lessons-title">
      <Container className="lessons-page__intro" size="narrow">
        <p className="eyebrow">Lesson Library</p>
        <h1 id="lessons-title">Study materials for Sabbath learning</h1>
        <p className="editorial-copy">
          A multilingual document library for doctrine, study, and weekly preparation in English, IsiZulu, and Sesotho.
        </p>
      </Container>

      <Container className="lessons-library" size="narrow">
        <LessonLanguageFilters activeLanguage={activeLanguage} />

        {visibleLessons.length === 0 ? (
          <div className="lessons-empty" role="status">
            <p>No lessons in this language yet.</p>
            <a href="/lessons">Show all</a>
          </div>
        ) : (
          <div className="lesson-rows" aria-label="Lesson downloads">
            {visibleLessons.map((lesson) => {
              const visibleVariants =
                activeLanguage === "all"
                  ? lesson.variants
                  : lesson.variants.filter((variant) => variant.language === activeLanguage);

              return (
                <article className="lesson-row" key={lesson.id}>
                  <div className="lesson-row__body">
                    <p className="lesson-row__scripture">{lesson.scriptureReference}</p>
                    <h2>{lesson.title}</h2>
                    {lesson.summary ? <p className="lesson-row__summary">{lesson.summary}</p> : null}
                  </div>
                  <div className="lesson-row__downloads" aria-label={`${lesson.title} downloads`}>
                    {visibleVariants.map((variant) => (
                      <a
                        className="lesson-row__download"
                        href={variant.pdfUrl}
                        key={variant.id}
                        download
                        aria-label={`${lessonLanguageLabels[variant.language]} download for ${lesson.title}`}
                      >
                        <span className="lesson-row__download-code">{variant.language.toUpperCase()}</span>
                        <span className="lesson-row__download-icon" aria-hidden="true">
                          &darr;
                        </span>
                      </a>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
