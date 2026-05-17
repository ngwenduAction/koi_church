import type { Metadata } from "next";
import { BlogJournalClient } from "../../features/blog/components/BlogJournalClient";
import { Container } from "../../shared/components/Container";

export const metadata: Metadata = {
  title: "Blog | Kingdom of Israel",
  description: "Multilingual KOI editorial writings, study reflections, and doctrinal journal articles.",
};

export default function BlogPage() {
  return (
    <section className="blog-journal-page">
      <Container size="narrow">
        <BlogJournalClient />
      </Container>
    </section>
  );
}
