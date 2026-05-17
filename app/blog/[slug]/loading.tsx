import { Container } from "../../../shared/components/Container";

export default function LoadingBlogArticle() {
  return (
    <section className="blog-journal-page" aria-busy="true">
      <Container size="narrow">
        <div className="teaching-masthead__inner blog-journal__masthead">
          <p className="teaching-masthead__eyebrow">Journal</p>
          <h1>Loading article...</h1>
          <p className="teaching-masthead__author">Preparing the editorial reading surface.</p>
        </div>
      </Container>
    </section>
  );
}
