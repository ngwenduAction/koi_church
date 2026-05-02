import type { CSSProperties } from "react";
import type { Feast } from "../../../content/feasts";
import { formatFeastDate } from "../lib/groupBySeason";

type FeastRowProps = {
  feast: Feast;
  ordinal: string;
  index: number;
};

type RevealStyle = CSSProperties & {
  "--reveal-delay": string;
};

type MetadataItem = {
  label: string;
  dateTime: string;
  primary: string;
  secondary: string;
};

function getMetadata(feast: Feast): MetadataItem[] {
  const items: MetadataItem[] = [];

  if (feast.begins) {
    items.push({
      label: "Begins",
      dateTime: feast.begins,
      primary: formatFeastDate(feast.begins),
      secondary: "at sundown",
    });
  }

  if (feast.ends) {
    items.push({
      label: "Ends",
      dateTime: feast.ends,
      primary: formatFeastDate(feast.ends),
      secondary: "at sundown",
    });
  }

  if (feast.service) {
    items.push({
      label: "Service",
      dateTime: feast.service.dateISO,
      primary: formatFeastDate(feast.service.dateISO),
      secondary: `${feast.service.timeCT} / ${feast.service.timeET}`,
    });
  }

  return items;
}

export function FeastRow({ feast, ordinal, index }: FeastRowProps) {
  const metadata = getMetadata(feast);

  return (
    <article
      className="feast-row"
      data-feast-reveal="true"
      style={{ "--reveal-delay": `${index * 80}ms` } as RevealStyle}
      aria-labelledby={`${feast.id}-title`}
    >
      <div className="feast-row__title-block">
        <p className="feast-row__ordinal">{ordinal}</p>
        <h3 id={`${feast.id}-title`}>{feast.name}</h3>
      </div>
      <div className="feast-row__metadata">
        {metadata.map((item) => (
          <div className="feast-meta" key={`${feast.id}-${item.label}`}>
            <p>{item.label}</p>
            <time dateTime={item.dateTime}>
              <span>{item.primary}</span>
              <span>{item.secondary}</span>
            </time>
          </div>
        ))}
      </div>
    </article>
  );
}