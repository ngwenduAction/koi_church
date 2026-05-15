import type { Metadata } from "next";
import { lawAndTestimonyArticle, teachings } from "../../../content/teachings";
import { TeachingLanguageReader } from "../../../features/teachings/components/TeachingLanguageReader";
import { Container } from "../../../shared/components/Container";

const teaching = teachings.find((entry) => entry.slug === "the-law-and-the-testimony");

export const metadata: Metadata = {
  title: "The Law and the Testimony | Kingdom of Israel",
  description:
    "A flagship KOI teaching presented as a trilingual study journal with English reading prose and source lesson PDFs in English, IsiZulu, and Sesotho.",
};

export default function TheLawAndTheTestimonyPage() {
  if (!teaching) {
    return null;
  }

  return (
    <article className="teaching-article">
      <header className="teaching-masthead">
        <Container className="teaching-masthead__inner" size="narrow">
          <p className="teaching-masthead__eyebrow">{lawAndTestimonyArticle.eyebrow}</p>
          <h1>{teaching.title}</h1>
          <p className="teaching-masthead__author">{lawAndTestimonyArticle.author}</p>
        </Container>

        <Container className="teaching-masthead__media" size="narrow">
          <figure className="media-block media-block--16-9">
            <div className="media-block__frame media-block__frame--image" role="img" aria-label={lawAndTestimonyArticle.imageLabel}>
              <img src={lawAndTestimonyArticle.imageUrl} alt="" className="teaching-masthead__image" />
              <span className="media-block__label">Journal still</span>
            </div>
            <figcaption>{lawAndTestimonyArticle.imageLabel}</figcaption>
          </figure>
        </Container>
      </header>

      <Container className="teaching-article__body reading-prose" size="narrow">
        <TeachingLanguageReader languages={lawAndTestimonyArticle.languages} />

        <footer className="teaching-article__anchor">
          <div className="teaching-article__share" aria-label="Share this teaching">
            <span>Share this teaching</span>
            <a href="#copy-link">Copy Link</a>
            <a href="mailto:?subject=The Law and the Testimony">Email</a>
          </div>
          <a className="teaching-article__return" href="/lessons">
            Return to Library
          </a>
        </footer>
      </Container>
    </article>
  );
}
