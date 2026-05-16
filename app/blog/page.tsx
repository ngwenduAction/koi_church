import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "../../shared/components/Container";

export const metadata: Metadata = {
  title: "Blog | Kingdom of Israel",
  description: "Weekly KOI editorial writings, announcements, and study reflections.",
};

export default function BlogPage() {
  return (
    <article className="teaching-article" aria-labelledby="blog-title">
      <header className="teaching-masthead">
        <Container className="teaching-masthead__inner" size="narrow">
          <p className="teaching-masthead__eyebrow">Journal / May 2026</p>
          <h1 id="blog-title">Why the Sabbath remains a day of study, remembrance, and holy order.</h1>
          <p className="teaching-masthead__author">By The Teaching Elder</p>
        </Container>

        <Container className="teaching-masthead__media" size="narrow">
          <figure className="media-block media-block--16-9">
            <div className="media-block__frame media-block__frame--image" role="img" aria-label="Editorial study atmosphere">
              <Image
                alt=""
                className="teaching-masthead__image"
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 960px"
                src="/media/cinematic-manuscript.jpg"
              />
              <span className="media-block__label">Editorial still</span>
            </div>
            <figcaption>Manuscript study atmosphere from the KOI media archive.</figcaption>
          </figure>
        </Container>
      </header>

      <Container className="teaching-article__body reading-prose" size="narrow">
        <section className="teaching-article__section">
          <h2>The Sabbath as appointed time</h2>
          <p>
            The Sabbath is not received as an empty pause at the end of a working week. It is appointed time,
            sanctified by God and ordered for remembrance, study, and obedience. KOI keeps the seventh day not as a
            private lifestyle marker, but as a holy convocation in which the word is opened carefully and heard in order.
          </p>
          <p>
            This rhythm preserves more than a schedule. It preserves attention. The class gathers to read doctrine through
            the law, the prophets, Christ, and the apostles so that worship is not severed from understanding.
          </p>
        </section>

        <section className="teaching-article__section">
          <h2>Study instead of spectacle</h2>
          <p>
            In a noisy age, serious study is itself a witness. KOI treats the Sabbath as a day for disciplined hearing,
            scriptural examination, and mutual edification rather than religious performance. Pens, notebooks, questions,
            and careful listening belong here.
          </p>
          <p>
            That posture shapes the public face of the institution as well. The site, the lesson library, and the article
            surfaces all follow the same conviction: clarity before ornament, substance before noise, and reverence before display.
          </p>
        </section>

        <section className="teaching-article__section">
          <h2>Remembering the covenant in practice</h2>
          <p>
            To keep the Sabbath is to remember that sacred time must be ordered by the word of God. The gathering of the assembly,
            the teaching of the elder, the reading of the scriptures, and the fellowship after class all become part of a visible
            covenant life.
          </p>
          <p>
            This is why the Sabbath remains central to KOI. It is the weekly return to doctrine, correction, remembrance, and peace.
            It trains the house to live under the commandments of God with patience, seriousness, and hope.
          </p>
        </section>
      </Container>
    </article>
  );
}
