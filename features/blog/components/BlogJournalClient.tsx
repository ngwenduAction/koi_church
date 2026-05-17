"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { blogArticles, type MultilingualArticle } from "../../../content/blog";
import { MediaBlock } from "../../pages/components/MediaBlock";
import { lessonLanguageLabels, lessonLanguageOptions, type LessonLanguage } from "../../lessons/types";

type BlogJournalClientProps = {
  articles?: MultilingualArticle[];
};

export function BlogJournalClient({ articles = blogArticles }: BlogJournalClientProps) {
  const [activeArticleSlug, setActiveArticleSlug] = useState(articles[0]?.slug ?? "");
  const [activeLanguage, setActiveLanguage] = useState<LessonLanguage>("en");

  const activeArticle = useMemo(
    () => articles.find((article) => article.slug === activeArticleSlug) ?? articles[0],
    [activeArticleSlug, articles],
  );

  if (!activeArticle) {
    return null;
  }

  const translation = activeArticle.translations[activeLanguage];

  return (
    <article className="blog-journal" aria-labelledby="blog-journal-title">
      <header className="teaching-masthead">
        <div className="teaching-masthead__inner blog-journal__masthead">
          <p className="teaching-masthead__eyebrow">{activeArticle.eyebrow}</p>

          <div className="blog-journal__article-switcher" role="tablist" aria-label="Journal articles">
            {articles.map((article) => {
              const selected = article.slug === activeArticle.slug;

              return (
                <button
                  key={article.slug}
                  className={`blog-journal__switcher-tab${selected ? " is-active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveArticleSlug(article.slug)}
                >
                  {article.translations.en.title}
                </button>
              );
            })}
          </div>

          <div className="blog-journal__language-toggle" role="tablist" aria-label="Editorial language">
            {lessonLanguageOptions.map((language) => {
              const selected = activeLanguage === language;
              return (
                <button
                  key={language}
                  className={`blog-journal__language-chip${selected ? " is-active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveLanguage(language)}
                >
                  {language.toUpperCase()}
                </button>
              );
            })}
          </div>

          <h1 id="blog-journal-title">{translation.title}</h1>
          <p className="teaching-masthead__author">{activeArticle.author}</p>
        </div>

        <div className="teaching-masthead__media blog-journal__media">
          <figure className="media-block media-block--16-9">
            <div className="media-block__frame media-block__frame--image" role="img" aria-label={activeArticle.heroLabel}>
              <Image
                alt=""
                className="teaching-masthead__image"
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 960px"
                src={activeArticle.heroImage}
              />
              <span className="media-block__label">{activeArticle.heroLabel}</span>
            </div>
            <figcaption>{activeArticle.heroLabel}</figcaption>
          </figure>
        </div>
      </header>

      <div className="teaching-article__body reading-prose blog-journal__body">
        <section className="teaching-article__section blog-journal__intro">
          <p className="section-kicker">{lessonLanguageLabels[activeLanguage]}</p>
          <p>{translation.intro}</p>
        </section>

        {translation.sections.map((section, index) => (
          <div className="blog-journal__movement" key={`${activeArticle.slug}-${activeLanguage}-${section.heading}`}>
            <section className="teaching-article__section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            {activeArticle.rhythmMedia[index] ? (
              <MediaBlock
                aspectRatio={activeArticle.rhythmMedia[index].aspectRatio ?? "16:9"}
                description={activeArticle.rhythmMedia[index].description}
                imageUrl={activeArticle.rhythmMedia[index].src}
                label={activeArticle.rhythmMedia[index].label}
              />
            ) : null}
          </div>
        ))}
      </div>
    </article>
  );
}
