import Link from "next/link";
import type { Metadata } from "next";
import { lessonVariants } from "../../content/lessons";
import { LessonLanguageFilters } from "../../features/lessons/components/LessonLanguageFilters";
import { groupLessonVariants } from "../../features/lessons/lib/library";
import { isLessonLanguage, lessonLanguageLabels, type LessonLanguage } from "../../features/lessons/types";
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

export default async function LessonsPage({ searchParams }: LessonsPageProps) {
  const params = (await searchParams) ?? {};
  const requestedLanguage = params.lang?.toLowerCase();
  const activeLanguage: "all" | LessonLanguage =
    requestedLanguage && isLessonLanguage(requestedLanguage) ? requestedLanguage : "all";

  const groupedLessons = groupLessonVariants(lessonVariants);
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
            <Link href="/lessons">Show all</Link>
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
                    <div className="lesson-row__meta-row">
                      <p className="lesson-row__scripture">{lesson.scriptureReference}</p>
                      <ul className="lesson-row__languages" aria-label={`Languages available for ${lesson.title}`}>
                        {Array.from(new Set(lesson.languages)).map((language) => (
                          <li className="lesson-row__language" key={language}>
                            {language.toUpperCase()}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <h2>
                      <Link href={`/lessons/${lesson.slug}`}>{lesson.title}</Link>
                    </h2>
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
