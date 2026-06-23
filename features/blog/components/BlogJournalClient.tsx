"use client";

import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";
import {useEffect, useMemo, useState} from "react";
import {
  blogArticles,
  getArticleReadingMinutes,
  type MultilingualArticle,
} from "../../../content/blog";
import {
  isLessonLanguage,
  lessonLanguageOptions,
  type LessonLanguage,
} from "../../../features/lessons/types";
import {MediaBlock} from "../../../features/pages/components/MediaBlock";
import {Link} from "../../../i18n/navigation";

type BlogJournalClientProps = {
  articles?: MultilingualArticle[];
  initialArticleSlug?: string;
  initialLanguage?: LessonLanguage;
};

export function BlogJournalClient({
  articles = blogArticles,
  initialArticleSlug,
  initialLanguage,
}: BlogJournalClientProps) {
  const locale = useLocale();
  const t = useTranslations("blog");
  const lessonsT = useTranslations("lessons");
  const localeLanguage = isLessonLanguage(locale) ? locale : "en";
  const [activeLanguage, setActiveLanguage] = useState<LessonLanguage>(initialLanguage ?? localeLanguage);
  const [activeArticleSlug, setActiveArticleSlug] = useState(initialArticleSlug ?? articles[0]?.slug ?? "");

  useEffect(() => {
    setActiveLanguage(initialLanguage ?? localeLanguage);
  }, [initialLanguage, localeLanguage]);

  useEffect(() => {
    if (!articles.some((article) => article.slug === activeArticleSlug)) {
      setActiveArticleSlug(articles[0]?.slug ?? "");
    }
  }, [activeArticleSlug, articles]);

  const activeArticle = useMemo(
    () => articles.find((article) => article.slug === activeArticleSlug) ?? articles[0],
    [activeArticleSlug, articles],
  );

  if (!activeArticle) {
    return null;
  }

  const translation = activeArticle.translations[activeLanguage] ?? activeArticle.translations.en;
  const readingMinutes = getArticleReadingMinutes(activeArticle, activeLanguage);
  const category = t(`categories.${activeArticle.category}`);
  const topics = activeArticle.topics.map((topic) => t(`topics.${topic}`));

  return (
    <article className="blog-journal blog-journal--premium" aria-labelledby="blog-journal-title">
      <header className="blog-journal__masthead">
        <p className="section-kicker">{category}</p>
        <h1 id="blog-journal-title">{translation.title}</h1>
        <div className="blog-journal__byline">
          <span>{t("author")}</span>
          <span>{t("readingTime", {count: readingMinutes})}</span>
          <span>{lessonsT(`languages.${activeLanguage}`)}</span>
        </div>
      </header>

      {articles.length > 1 ? (
        <nav className="blog-journal__article-nav" aria-label={t("journalArticles")}>
          {articles.map((article) => {
            const articleTranslation = article.translations[activeLanguage] ?? article.translations.en;
            return (
              <button
                key={article.slug}
                type="button"
                className={article.slug === activeArticle.slug ? "is-active" : ""}
                onClick={() => setActiveArticleSlug(article.slug)}
              >
                {articleTranslation.title}
              </button>
            );
          })}
        </nav>
      ) : null}

      <div className="blog-language-toggle" aria-label={t("editorialLanguage")}>
        {lessonLanguageOptions.map((language) => (
          <button
            key={language}
            type="button"
            className={language === activeLanguage ? "is-active" : ""}
            onClick={() => setActiveLanguage(language)}
          >
            {lessonsT(`languages.${language}`)}
          </button>
        ))}
      </div>

      <figure className="blog-journal__hero">
        <Image src={activeArticle.heroImage} alt="" width={1440} height={960} sizes="(max-width: 900px) 100vw, 960px" priority />
        <figcaption>{t("mediaLabel")}</figcaption>
      </figure>

      <section className="blog-journal__lead" aria-label={t("summaryLabel")}>
        <p>{translation.intro}</p>
        <dl>
          <div>
            <dt>{t("scripture")}</dt>
            <dd>{activeArticle.scriptureReferences.join(" / ")}</dd>
          </div>
          <div>
            <dt>{t("topicsLabel")}</dt>
            <dd>
              {topics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      <div className="blog-journal__body reading-prose">
        {translation.sections.map((section, sectionIndex) => (
          <section key={section.heading} className="blog-journal__section">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {activeArticle.rhythmMedia[sectionIndex] ? (
              <MediaBlock
                imageUrl={activeArticle.rhythmMedia[sectionIndex].src}
                aspectRatio={activeArticle.rhythmMedia[sectionIndex].aspectRatio}
                label={t("rhythmMediaLabel", {number: sectionIndex + 1})}
                description={t("rhythmMediaDescription")}
                className="blog-journal__media-break"
              />
            ) : null}
          </section>
        ))}
      </div>

      <footer className="blog-journal__footer">
        <div className="blog-journal__share" aria-label={t("shareTeaching")}>
          <span>{t("shareTeaching")}</span>
          <button type="button">{t("copyLink")}</button>
          <button type="button">{t("email")}</button>
        </div>
        <Link href="/blog" className="blog-journal__return">
          {t("returnToLibrary")}
        </Link>
      </footer>
    </article>
  );
}
