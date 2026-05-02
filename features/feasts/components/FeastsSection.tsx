"use client";

import { useEffect, useRef } from "react";
import { feasts2026 } from "../../../content/feasts";
import { Container } from "../../../shared/components/Container";
import { groupBySeason } from "../lib/groupBySeason";
import { annotateFeasts, getNextObservance } from "../lib/observanceStatus";
import { FeastRow } from "./FeastRow";
import { NewMoonMarker } from "./NewMoonMarker";
import { NextObservance } from "./NextObservance";
import { SeasonDivider } from "./SeasonDivider";

type FeastsSectionProps = {
  nowISO: string;
};

export function FeastsSection({ nowISO }: FeastsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const now = new Date(nowISO);
  const annotatedFeasts = annotateFeasts(feasts2026, now);
  const groupedFeasts = groupBySeason(annotatedFeasts);
  const nextObservance = getNextObservance(feasts2026, now);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const revealItems = Array.from(section.querySelectorAll<HTMLElement>("[data-feast-reveal]"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.classList.add("is-reveal-ready");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.16 },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="feasts-section" aria-labelledby="feasts-title" ref={sectionRef}>
      <Container>
        <NextObservance observance={nextObservance} />

        <div className="feasts-section__intro">
          <p className="section-kicker">The Feasts of the Lord</p>
          <h2 id="feasts-title">Sacred time, appointed in scripture.</h2>
          <p>Observances appointed in Leviticus 23, marked on the calendar of 2026.</p>
        </div>

        <div className="feast-season" aria-label="Spring feasts, March to May">
          <SeasonDivider title="Spring Feasts" range="March to May" />
          {groupedFeasts.spring.map((feast) =>
            feast.kind === "new-moon" ? (
              <NewMoonMarker feast={feast} key={feast.id} />
            ) : (
              <FeastRow feast={feast} key={feast.id} />
            ),
          )}
        </div>

        <div className="feast-season feast-season--fall" aria-label="Fall feasts, September to October">
          <SeasonDivider title="Fall Feasts" range="September to October" />
          {groupedFeasts.fall.map((feast) =>
            feast.kind === "new-moon" ? (
              <NewMoonMarker feast={feast} key={feast.id} />
            ) : (
              <FeastRow feast={feast} key={feast.id} />
            ),
          )}
        </div>

        <p className="feasts-section__note">
          Observances follow scripture and traditional reckoning. Service times are listed in Central and Eastern time.
        </p>
      </Container>
    </section>
  );
}
