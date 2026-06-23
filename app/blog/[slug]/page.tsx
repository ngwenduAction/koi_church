import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getLocale} from "next-intl/server";
import {blogArticles} from "../../../content/blog";
import {BlogJournalClient} from "../../../features/blog/components/BlogJournalClient";
import {isLessonLanguage, type LessonLanguage} from "../../../features/lessons/types";
import {Container} from "../../../shared/components/Container";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogArticles.map((article) => ({slug: article.slug}));
}

export async function generateMetadata({params}: BlogArticlePageProps): Promise<Metadata> {
  const {slug} = await params;
  const locale = await getLocale();
  const activeLanguage: LessonLanguage = isLessonLanguage(locale) ? locale : "en";
  const article = blogArticles.find((item) => item.slug === slug);

  if (!article) {
    return {title: "Teaching | Kingdom of Israel"};
  }

  const translation = article.translations[activeLanguage] ?? article.translations.en;

  return {
    title: `${translation.title} | Kingdom of Israel`,
    description: translation.intro,
  };
}

export default async function BlogArticlePage({params}: BlogArticlePageProps) {
  const {slug} = await params;
  const locale = await getLocale();
  const activeLanguage: LessonLanguage = isLessonLanguage(locale) ? locale : "en";
  const article = blogArticles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="blog-article-page">
      <Container size="narrow">
        <BlogJournalClient articles={[article]} initialArticleSlug={article.slug} initialLanguage={activeLanguage} />
      </Container>
    </main>
  );
}