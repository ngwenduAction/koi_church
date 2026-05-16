import type { Metadata } from "next";
import { Container } from "../../shared/components/Container";

export const metadata: Metadata = {
  title: "Blog | Kingdom of Israel",
  description: "Weekly KOI editorial writings, announcements, and study reflections.",
};

export default function BlogPage() {
  return (
    <section className="institution-hero" aria-labelledby="blog-title">
      <Container className="institution-hero__inner" size="narrow">
        <p className="section-kicker">Weekly Blog</p>
        <h1 id="blog-title">Editorial notes and weekly reflections are being prepared.</h1>
        <p className="editorial-copy">
          This route is now live in the KOI navigation so the publishing surface can mature without leaving dead links in the public shell.
        </p>
      </Container>
    </section>
  );
}
