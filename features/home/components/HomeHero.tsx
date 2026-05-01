import { homeContent } from "../../../content/home";
import { site } from "../../../content/site";
import { Button } from "../../../shared/components/Button";
import { Container } from "../../../shared/components/Container";

export function HomeHero() {
  const { hero } = homeContent;

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <Container className="home-hero__inner">
        <div className="home-hero__content">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="home-hero-title" className="editorial-title">
            {hero.title}
          </h1>
          <p className="home-hero__statement">{hero.statement}</p>
          <div className="home-hero__actions" aria-label="Primary actions">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
        <aside className="home-hero__sabbath surface-panel" aria-label="Sabbath gathering details">
          <span className="section-kicker">{site.sabbath.label}</span>
          <p>{site.sabbath.time}</p>
          <p>{site.sabbath.location}</p>
        </aside>
      </Container>
    </section>
  );
}
