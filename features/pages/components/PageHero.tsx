import { type ReactNode } from "react";
import { Container } from "../../../shared/components/Container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  videoUrl?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, videoUrl, children }: PageHeroProps) {
  return (
    <section className={`institution-hero${videoUrl ? " institution-hero--with-media" : ""}`}>
      <Container className="institution-hero__inner" size="narrow">
        <p className="section-kicker">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="editorial-copy">{description}</p>
        {children}
        {videoUrl ? (
          <div className="institution-hero__media-shell" aria-hidden="true">
            <div className="institution-hero__media-fallback">
              <span className="institution-hero__media-label">Cinematic placeholder</span>
              <p>{videoUrl.replace(/^.*\//, "")}</p>
            </div>
            <video autoPlay className="institution-hero__video" loop muted playsInline preload="metadata">
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
