import type { CSSProperties } from "react";
import { formatFeastDate } from "../lib/groupBySeason";
import type { AnnotatedFeast } from "../lib/observanceStatus";

type NewMoonMarkerProps = {
  feast: AnnotatedFeast;
};

type RevealStyle = CSSProperties & {
  "--reveal-delay": string;
};

export function NewMoonMarker({ feast }: NewMoonMarkerProps) {
  const dateLabel = feast.begins ? formatFeastDate(feast.begins, { includeYear: true }) : "";

  return (
    <article
      className="new-moon-marker"
      data-feast-reveal="true"
      style={{ "--reveal-delay": `${feast.revealIndex * 80}ms` } as RevealStyle}
      aria-label={feast.name}
    >
      <p>
        <span>{feast.name}</span>
        {feast.begins ? <time dateTime={feast.begins}>{dateLabel}</time> : null}
        {feast.note ? <span>{feast.note}</span> : null}
      </p>
    </article>
  );
}
