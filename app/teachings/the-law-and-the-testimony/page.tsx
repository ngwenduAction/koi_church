import type { Metadata } from "next";
import { teachings } from "../../../content/teachings";
import { ScriptureBlock } from "../../../features/pages/components/ScriptureBlock";
import { Container } from "../../../shared/components/Container";

const teaching = teachings.find((entry) => entry.slug === "the-law-and-the-testimony");

export const metadata: Metadata = {
  title: "The Law and the Testimony | Kingdom of Israel",
  description:
    "A flagship KOI teaching on the law, the testimony of Christ, and the rule of truth by which doctrine is judged.",
};

export default function TheLawAndTheTestimonyPage() {
  if (!teaching) {
    return null;
  }

  return (
    <article className="teaching-article">
      <header className="teaching-masthead">
        <Container className="teaching-masthead__inner" size="narrow">
          <p className="teaching-masthead__eyebrow">Teaching / May 2026</p>
          <h1>{teaching.title}</h1>
          <p className="teaching-masthead__author">By The Teaching Elder</p>
        </Container>

        <Container className="teaching-masthead__media" size="narrow">
          <figure className="media-block media-block--16-9">
            <div aria-label="Cinematic teaching atmosphere placeholder" className="media-block__frame" role="img">
              <div className="media-block__placeholder" />
              <span className="media-block__label">Still placeholder</span>
            </div>
            <figcaption>cinematic-law-and-testimony.jpg</figcaption>
          </figure>
        </Container>
      </header>

      <Container className="teaching-article__body reading-prose" size="narrow">
        <section className="teaching-article__section" aria-labelledby="rule-of-truth-title">
          <h2 id="rule-of-truth-title">The Rule of Truth</h2>
          <ScriptureBlock reference="Isaiah 8:20">
            To the law and to the testimony: if they speak not according to this word, it is because there is no
            light in them.
          </ScriptureBlock>
          <p>
            The law and the testimony form the rule by which doctrine is weighed. At Sinai the commandments were
            given in fullness, and from that giving proceed the judgments, statutes, ordinances, and the six hundred
            and thirteen commandments that ordered the covenant life of Israel before God.
          </p>
          <p>
            Those commandments are not treated as scattered pieces of ancient legislation. They are received as the
            revealed instruction of the Most High, holy in source and serious in obligation, declaring what the
            people of God must love, refuse, keep, discern, and remember.
          </p>
        </section>

        <section className="teaching-article__section" aria-labelledby="testimony-title">
          <h2 id="testimony-title">The Testimony of Christ</h2>
          <p>
            The testimony is not a rival witness to the law. It is the prophetic and apostolic witness that declares
            Christ, confirms the word already spoken, and brings the hearer to understanding. Moses and the prophets
            speak forward; Christ and the apostles speak in fulfillment and light, yet always according to the same
            truth.
          </p>
          <p>
            For this reason KOI does not separate Jesus Christ from the law given by God of old, nor the apostles
            from the prophets that came before them. The testimony of Christ reveals the life, judgment, mercy, and
            purpose that stand in continuity with the word already established.
          </p>
        </section>

        <section className="teaching-article__section" aria-labelledby="neither-alone-title">
          <h2 id="neither-alone-title">Neither Witness Stands Alone</h2>
          <p>
            The law without the testimony is handled without light, because men may recite commandments and still not
            understand the witness they bear. The testimony without the law is equally unstable, because men may speak
            of Christ while casting away the measure by which every spirit and doctrine must be tried.
          </p>
          <p>
            The faithful teacher therefore returns to both: to the commandments given by God, and to the witness that
            interprets, confirms, and magnifies them in truth. This is the discipline of doctrine. What does not speak
            according to this word is rejected, however persuasive, modern, or inherited it may appear.
          </p>
        </section>

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
