import Image from "next/image";
import type {Metadata} from "next";
import {getLocale, getTranslations} from "next-intl/server";
import {blogArticles, getArticleReadingMinutes} from "../../content/blog";
import {HeroInterface} from "../../features/home/components/HeroInterface";
import {PageHero} from "../../features/pages/components/PageHero";
import {isLessonLanguage, type LessonLanguage} from "../../features/lessons/types";
import {Link} from "../../i18n/navigation";
import {Container} from "../../shared/components/Container";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.blog");

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  };
}

export default async function BlogPage() {
  const locale = await getLocale();
  const activeLanguage: LessonLanguage = isLessonLanguage(locale) ? locale : "en";
  const t = await getTranslations("pages.blog");
  const blogT = await getTranslations("blog");
  const [featuredArticle, ...archiveArticles] = blogArticles;
  const featuredTranslation = featuredArticle.translations[activeLanguage] ?? featuredArticle.translations.en;
  const featuredCategory = blogT(`categories.${featuredArticle.category}`);
  const featuredReadingMinutes = getArticleReadingMinutes(featuredArticle, activeLanguage);
  const articleCount = blogArticles.length;
  const topicEntries = Array.from(new Set(blogArticles.flatMap((article) => article.topics)));

  return (
    <main className="blog-page-shell blog-page-shell--premium">
      <HeroInterface
        mediaUrl="/media/blog-hero.jpg"
        mediaTabletUrl="/media/blog-hero-tablet.jpg"
        mediaMobileUrl="/media/blog-hero-mobile.jpg"
        pageTitleKey="hero.blogTitle"
        pageCaptionKey="hero.blogCaption"
        bottomImage="/media/transparent-bottom (1).png"
      />

      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("body")}
      />

      <Container className="blog-archive-layout blog-archive-layout--shared-hero">
        <aside className="blog-archive-rail" aria-label={t("archiveTitle")}>
          <p className="section-kicker">{t("archiveLabel")}</p>
          <h2>{t("archiveTitle")}</h2>
          <p>{t("archiveBody")}</p>
          <dl className="blog-archive-stats">
            <div>
              <dt>{t("articleCountLabel")}</dt>
              <dd>{articleCount}</dd>
            </div>
            <div>
              <dt>{t("topicCountLabel")}</dt>
              <dd>{topicEntries.length}</dd>
            </div>
          </dl>
          <div className="blog-topic-stack" aria-label={blogT("topicsLabel")}>
            {topicEntries.map((topic) => (
              <span key={topic}>{blogT(`topics.${topic}`)}</span>
            ))}
          </div>
        </aside>

        <section className="blog-archive-feed" aria-label={t("linksLabel")}>
          <Link href={`/blog/${featuredArticle.slug}`} className="blog-featured-entry blog-featured-entry--inline" aria-label={featuredTranslation.title}>
            <div className="blog-featured-entry__media">
              <Image
                src={featuredArticle.heroImage}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                priority
              />
            </div>
            <div className="blog-featured-entry__content">
              <div className="blog-featured-entry__meta">
                <span>{featuredCategory}</span>
                <span>{blogT("readingTime", {count: featuredReadingMinutes})}</span>
              </div>
              <h2>{featuredTranslation.title}</h2>
              <p>{featuredTranslation.intro}</p>
              <span>{t("readArticle")}</span>
            </div>
          </Link>

          {archiveArticles.map((article, index) => {
            const translation = article.translations[activeLanguage] ?? article.translations.en;
            const readingMinutes = getArticleReadingMinutes(article, activeLanguage);
            const category = blogT(`categories.${article.category}`);
            const topics = article.topics.map((topic) => blogT(`topics.${topic}`));

            return (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="blog-archive-entry">
                <div className="blog-archive-entry__index">{String(index + 2).padStart(2, "0")}</div>
                <div className="blog-archive-entry__body">
                  <div className="blog-archive-entry__meta">
                    <span>{category}</span>
                    <span>{blogT("readingTime", {count: readingMinutes})}</span>
                  </div>
                  <h3>{translation.title}</h3>
                  <p>{translation.intro}</p>
                  <div className="blog-archive-entry__taxonomy">
                    {article.scriptureReferences.map((reference) => (
                      <span key={reference}>{reference}</span>
                    ))}
                    {topics.map((topic) => (
                      <span key={topic}>{topic}</span>
                    ))}
                  </div>
                </div>
                <div className="blog-archive-entry__media" aria-hidden="true">
                  <Image src={article.heroImage} alt="" fill sizes="220px" />
                </div>
              </Link>
            );
          })}
        </section>
      </Container>
    </main>
  );
}
