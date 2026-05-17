import Link from "next/link";
import { homeContent } from "../../../content/home";
import { site } from "../../../content/site";
import { Button } from "../../../shared/components/Button";
import { Container } from "../../../shared/components/Container";

export function HomeHero() {
  const { hero } = homeContent;

  return (
    <section className="home-hero home-hero--cinematic" aria-labelledby="home-hero-title">
      <div className="home-hero__media" aria-hidden="true">
        <video autoPlay className="home-hero__video" loop muted playsInline preload="metadata">
          <source src="/media/Divine%20authority%20visual.mp4" type="video/mp4" />
        </video>
        <div className="home-hero__overlay" />
      </div>

      <Container className="home-hero__inner">
        <div className="home-hero__content">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="home-hero-title" className="editorial-title">
            {hero.title}
          </h1>
          <p className="home-hero__meta">
            {site.sabbath.time} / {site.sabbath.location}
          </p>
          <p className="home-hero__statement">{hero.statement}</p>
          <div className="home-hero__actions" aria-label="Primary actions">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <div className="home-hero__entry-links" aria-label="Operational entry points">
            <Link href="/membership">Request Membership</Link>
            <Link href="/prayer">Submit Prayer Request</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
