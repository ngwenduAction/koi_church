"use client";

import { useEffect, useRef } from "react";
import { feasts2026 } from "../../../content/feasts";
import { Container } from "../../../shared/components/Container";
import { groupBySeason } from "../lib/groupBySeason";
import { FeastRow } from "./FeastRow";
import { NewMoonMarker } from "./NewMoonMarker";
import { SeasonDivider } from "./SeasonDivider";

const romanNumerals = ["I.", "II.", "III.", "IV.", "V.", "VI.", "VII.", "VIII.", "IX.", "X."];

export function FeastsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const groupedFeasts = groupBySeason(feasts2026);

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

  let revealIndex = 0;
  let feastOrdinal = 0;

  return (
    <section className="feasts-section" aria-labelledby="feasts-title" ref={sectionRef}>
      <Container>
        <div className="feasts-section__intro">
          <p className="section-kicker">The Feasts of the Lord</p>
          <h2 id="feasts-title">Sacred time, appointed in scripture.</h2>
          <p>Observances appointed in Leviticus 23, marked on the calendar of 2026.</p>
        </div>

        <div className="feast-season" aria-label="Spring feasts, March to May">
          <SeasonDivider title="Spring Feasts" range="March to May" />
          {groupedFeasts.spring.map((feast) => {
            revealIndex += 1;

            if (feast.kind === "new-moon") {
              return <NewMoonMarker feast={feast} index={revealIndex} key={feast.id} />;
            }

            feastOrdinal += 1;
            return (
              <FeastRow
                feast={feast}
                ordinal={romanNumerals[feastOrdinal - 1] ?? `${feastOrdinal}.`}
                index={revealIndex}
                key={feast.id}
              />
            );
          })}
        </div>

        <div className="feast-season feast-season--fall" aria-label="Fall feasts, September to October">
          <SeasonDivider title="Fall Feasts" range="September to October" />
          {groupedFeasts.fall.map((feast) => {
            revealIndex += 1;

            if (feast.kind === "new-moon") {
              return <NewMoonMarker feast={feast} index={revealIndex} key={feast.id} />;
            }

            feastOrdinal += 1;
            return (
              <FeastRow
                feast={feast}
                ordinal={romanNumerals[feastOrdinal - 1] ?? `${feastOrdinal}.`}
                index={revealIndex}
                key={feast.id}
              />
            );
          })}
        </div>

        <p className="feasts-section__note">
          Observances follow scripture and traditional reckoning. Service times are listed in Central and Eastern time.
        </p>
      </Container>
    </section>
  );
}