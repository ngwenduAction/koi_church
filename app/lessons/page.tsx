import { Suspense } from "react";
import { Link } from "../../i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { lessonVariants } from "../../content/lessons";
import { LessonLanguageFilters } from "../../features/lessons/components/LessonLanguageFilters";
import { groupLessonVariants } from "../../features/lessons/lib/library";
import { isLessonLanguage, type LessonLanguage } from "../../features/lessons/types";
import { Container } from "../../shared/components/Container";
import { HeroInterface } from "../../features/home/components/HeroInterface";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("lessons");

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  };
}

type LessonsPageProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export default async function LessonsPage({ searchParams }: LessonsPageProps) {
  const t = await getTranslations("lessons");
  const params = (await searchParams) ?? {};
  const requestedLanguage = params.lang?.toLowerCase();
  const activeLanguage: "all" | LessonLanguage =
    requestedLanguage && isLessonLanguage(requestedLanguage) ? requestedLanguage : "all";

  const groupedLessons = groupLessonVariants(lessonVariants);
  const availableLanguages = new Set(groupedLessons.flatMap((lesson) => lesson.languages));
  const visibleLessons =
    activeLanguage === "all"
      ? groupedLessons
      : groupedLessons.filter((lesson) => lesson.variants.some((variant) => variant.language === activeLanguage));

  return (
    <main>
      <HeroInterface
        mediaUrl="/media/lessons-hero.jpg"
        mediaTabletUrl="/media/lessons-hero-tablet.jpg"
        mediaMobileUrl="/media/lessons-hero-mobile.jpg"
        pageTitleKey="hero.lessonsTitle"
        pageCaptionKey="hero.lessonsCaption"
        bottomImage="/media/transparent-bottom (1).png"
      />

      <section className="lessons-page" aria-labelledby="lessons-title">
        <Container className="lessons-page__intro" size="narrow">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 id="lessons-title">{t("title")}</h1>
          <p className="editorial-copy">{t("body")}</p>
        </Container>

        <Container className="lessons-archive">
          <aside className="lessons-archive__brief" aria-labelledby="lessons-archive-title">
            <p className="section-kicker">{t("archiveEyebrow")}</p>
            <h2 id="lessons-archive-title">{t("archiveTitle")}</h2>
            <p>{t("archiveBody")}</p>
            <dl className="lessons-archive__stats">
              <div>
                <dt>{t("archiveCountLabel")}</dt>
                <dd>{groupedLessons.length}</dd>
              </div>
              <div>
                <dt>{t("languageCountLabel")}</dt>
                <dd>{availableLanguages.size}</dd>
              </div>
              <div>
                <dt>{t("readerFirstLabel")}</dt>
                <dd>{t("openReader")}</dd>
              </div>
            </dl>
            <p className="lessons-archive__note">{t("noDownloadNote")}</p>
          </aside>

          <div className="lessons-library">
            <Suspense fallback={null}>
              <LessonLanguageFilters activeLanguage={activeLanguage} />
            </Suspense>

            {visibleLessons.length === 0 ? (
              <div className="lessons-empty" role="status">
                <p>{t("empty")}</p>
                <Link href="/lessons">{t("showAll")}</Link>
              </div>
            ) : (
              <div className="lesson-rows" aria-label={t("readerFirstLabel")}>
                {visibleLessons.map((lesson) => {
                  const visibleVariants =
                    activeLanguage === "all"
                      ? lesson.variants
                      : lesson.variants.filter((variant) => variant.language === activeLanguage);

                  return (
                    <article className="lesson-row" key={lesson.id}>
                      <div className="lesson-row__body">
                        <div className="lesson-row__meta-row">
                          <p className="lesson-row__scripture">
                            <span>{t("scriptureAnchorLabel")}</span>
                            {lesson.scriptureReference}
                          </p>
                          <ul className="lesson-row__languages" aria-label={t("availableLanguages")}>
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

                      <div className="lesson-row__actions" aria-label={t("studyActions")}>
                        {visibleVariants.map((variant) => (
                          <Link
                            className="lesson-row__reader-link"
                            href={`/lessons/${lesson.slug}?lang=${variant.language}`}
                            key={variant.id}
                            aria-label={t("readIn", { language: t(`languageNames.${variant.language}`) })}
                          >
                            <span className="lesson-row__reader-code">{variant.language.toUpperCase()}</span>
                            <span>{t("openReader")}</span>
                          </Link>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}

