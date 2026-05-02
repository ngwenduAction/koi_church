import { homeContent } from "../../../content/home";
import { Container } from "../../../shared/components/Container";

export function FoundationSection() {
  return (
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
  );
}