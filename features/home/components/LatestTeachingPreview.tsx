import { teachings } from "../../../content/teachings";

export function LatestTeachingPreview() {
  const latestTeaching = teachings.find((teaching) => teaching.featured) ?? teachings[0];

  return (
    <article className="surface-panel preview-card latest-teaching-card">
      <p className="section-kicker">Latest Teaching</p>
      <p className="preview-card__meta">{latestTeaching.metadata}</p>
      <h2>{latestTeaching.title}</h2>
      <p>{latestTeaching.summary}</p>
    </article>
  );
}