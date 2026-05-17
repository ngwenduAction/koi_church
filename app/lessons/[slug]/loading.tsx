import { Container } from "../../../shared/components/Container";

export default function LoadingLessonReader() {
  return (
    <section className="lesson-reader-page" aria-busy="true">
      <Container className="lesson-reader-page__intro" size="narrow">
        <p className="eyebrow">Lesson Engine</p>
        <h1>Loading lesson surface...</h1>
        <p className="editorial-copy">Preparing the multilingual reading document and media surface.</p>
      </Container>
    </section>
  );
}
