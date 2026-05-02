import type { CSSProperties } from "react";
import type { Feast } from "../../../content/feasts";
import { formatFeastDate } from "../lib/groupBySeason";

type NewMoonMarkerProps = {
  feast: Feast;
  index: number;
};

type RevealStyle = CSSProperties & {
  "--reveal-delay": string;
};

export function NewMoonMarker({ feast, index }: NewMoonMarkerProps) {
  const dateLabel = feast.begins ? formatFeastDate(feast.begins, { includeYear: true }) : "";

  return (
    <article
      className="new-moon-marker"
      data-feast-reveal="true"
      style={{ "--reveal-delay": `${index * 80}ms` } as RevealStyle}
      aria-label={feast.name}
    >
      <p>
        <span>{feast.name}</span>
        {feast.begins ? (
          <time dateTime={feast.begins}>{dateLabel}</time>
        ) : null}
        {feast.note ? <span>{feast.note}</span> : null}
      </p>
    </article>
  );
}