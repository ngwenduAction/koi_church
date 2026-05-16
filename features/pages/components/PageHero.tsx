import Image from "next/image";
import { type ReactNode } from "react";
import { Container } from "../../../shared/components/Container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  mediaLabel?: string;
  children?: ReactNode;
};

function assetFilename(assetUrl: string) {
  return decodeURIComponent(assetUrl.replace(/^.*\//, ""));
}

export function PageHero({ eyebrow, title, description, videoUrl, imageUrl, mediaLabel, children }: PageHeroProps) {
  const mediaAsset = videoUrl ?? imageUrl;

  return (
    <section className={`institution-hero${mediaAsset ? " institution-hero--with-media" : ""}`}>
      <Container className="institution-hero__inner" size="narrow">
        <p className="section-kicker">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="editorial-copy reading-prose">{description}</p>
        {children}
        {videoUrl ? (
          <div className="institution-hero__media-shell" aria-hidden="true">
            <div className="institution-hero__media-fallback">
              <span className="institution-hero__media-label">{mediaLabel ?? "Cinematic placeholder"}</span>
              <p>{assetFilename(videoUrl)}</p>
            </div>
            <video autoPlay className="institution-hero__video" loop muted playsInline preload="metadata">
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        ) : null}
        {imageUrl ? (
          <div className="institution-hero__media-shell institution-hero__media-shell--image" aria-hidden="true">
            <Image alt="" className="institution-hero__image" fill priority={false} sizes="(max-width: 1024px) 100vw, 960px" src={imageUrl} />
            <div className="institution-hero__image-surface" />
            <div className="institution-hero__media-fallback">
              <span className="institution-hero__media-label">{mediaLabel ?? "Still placeholder"}</span>
              <p>{assetFilename(imageUrl)}</p>
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
