import type { CSSProperties } from "react";
import type { AnnotatedFeast } from "../lib/observanceStatus";
import { formatFeastDate } from "../lib/groupBySeason";

type FeastRowProps = {
  feast: AnnotatedFeast;
};

type RevealStyle = CSSProperties & {
  "--reveal-delay": string;
};

type MetadataItem = {
  label: string;
  dateTime: string;
  primary: string;
  secondary: string;
  separator: "dash" | "dot";
};

function getMetadata(feast: AnnotatedFeast): MetadataItem[] {
  const items: MetadataItem[] = [];

  if (feast.begins) {
    items.push({
      label: "Begins",
      dateTime: feast.begins,
      primary: formatFeastDate(feast.begins),
      secondary: "at sundown",
      separator: "dash",
    });
  }

  if (feast.ends) {
    items.push({
      label: "Ends",
      dateTime: feast.ends,
      primary: formatFeastDate(feast.ends),
      secondary: "at sundown",
      separator: "dash",
    });
  }

  if (feast.service) {
    items.push({
      label: "Service",
      dateTime: feast.service.dateISO,
      primary: formatFeastDate(feast.service.dateISO),
      secondary: `${feast.service.timeCT} / ${feast.service.timeET}`,
      separator: "dot",
    });
  }

  return items;
}

export function FeastRow({ feast }: FeastRowProps) {
  const metadata = getMetadata(feast);
  const rowClassName = ["feast-row", `feast-row--${feast.status}`].join(" ");

  return (
    <article
      className={rowClassName}
      data-feast-reveal="true"
      style={{ "--reveal-delay": `${feast.revealIndex * 80}ms` } as RevealStyle}
      aria-labelledby={`${feast.id}-title`}
    >
      <div className="feast-row__title-block">
        <p className="feast-row__ordinal">{feast.ordinal}</p>
        <div className="feast-row__heading">
          <h3 id={`${feast.id}-title`}>{feast.name}</h3>
          {feast.status === "current" ? <span className="feast-row__status-pill">Observing now</span> : null}
          {feast.status === "next" ? <span className="feast-row__status-label">Next</span> : null}
        </div>
      </div>
      <div className="feast-row__metadata">
        {metadata.map((item) => (
          <div className="feast-meta" key={`${feast.id}-${item.label}`}>
            <p>{item.label}</p>
            <time className="feast-meta__value" dateTime={item.dateTime}>
              <span>{item.primary}</span>
              <span className="feast-meta__separator" aria-hidden="true">
                {item.separator === "dot" ? "\u00b7" : "\u2014"}
              </span>
              <span>{item.secondary}</span>
            </time>
          </div>
        ))}
      </div>
    </article>
  );
}
