import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogArticles } from "../../../content/blog";
import { BlogJournalClient } from "../../../features/blog/components/BlogJournalClient";
import { Container } from "../../../shared/components/Container";

type BlogArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((entry) => entry.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found | Kingdom of Israel",
    };
  }

  return {
    title: `${article.translations.en.title} | Kingdom of Israel`,
    description: article.translations.en.intro,
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = blogArticles.find((entry) => entry.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <section className="blog-journal-page">
      <Container size="narrow">
        <BlogJournalClient articles={[article]} initialArticleSlug={article.slug} showArticleSwitcher={false} />
      </Container>
    </section>
  );
}
