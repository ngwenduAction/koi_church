import { homeContent } from "../content/home";
import { lessonVariants } from "../content/lessons";
import { teachings } from "../content/teachings";
import { HomeHero } from "../features/home/components/HomeHero";
import { Button } from "../shared/components/Button";
import { Container } from "../shared/components/Container";

export default function HomePage() {
  const latestTeaching = teachings.find((teaching) => teaching.featured) ?? teachings[0];
  const featuredLessons = lessonVariants.filter((lesson) => lesson.featured);

  return (
    <>
      <HomeHero />
      <section className="home-section">
        <Container className="home-section__grid">
          <div>
            <p className="section-kicker">{homeContent.foundation.eyebrow}</p>
            <h2>{homeContent.foundation.title}</h2>
          </div>
          <div>
            <p className="editorial-copy">{homeContent.foundation.body}</p>
            <ul className="foundation-list">
              {homeContent.foundation.pillars.map((pillar) => (
                <li key={pillar}>{pillar}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="home-section home-section--quiet">
        <Container className="preview-grid">
          <article className="surface-panel preview-card">
            <p className="section-kicker">Latest Teaching</p>
            <h2>{latestTeaching.title}</h2>
            <p>{latestTeaching.summary}</p>
            <span className="metadata-pill">{latestTeaching.type}</span>
          </article>
          <article className="surface-panel preview-card">
            <p className="section-kicker">{homeContent.lessons.eyebrow}</p>
            <h2>{homeContent.lessons.title}</h2>
            <p>{homeContent.lessons.body}</p>
            <div className="language-row">
              {featuredLessons.map((lesson) => (
                <span key={lesson.id} className="metadata-pill">
                  {lesson.language.toUpperCase()}
                </span>
              ))}
            </div>
            <Button href="/lessons" variant="quiet">
              Open Lesson Library
            </Button>
          </article>
        </Container>
      </section>
    </>
  );
}
