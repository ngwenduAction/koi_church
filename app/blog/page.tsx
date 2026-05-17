import { blogArticles } from "../../content/blog";
import { BlogJournalClient } from "../../features/blog/components/BlogJournalClient";
import { Container } from "../../shared/components/Container";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Kingdom of Israel",
  description: "Multilingual KOI editorial writings, study reflections, and doctrinal journal articles.",
};

export default function BlogPage() {
  return (
    <section className="blog-journal-page">
      <Container size="narrow">
        <BlogJournalClient />

        <nav className="blog-index-links" aria-label="Journal article links">
          {blogArticles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`}>
              {article.translations.en.title}
            </Link>
          ))}
        </nav>
      </Container>
    </section>
  );
}
