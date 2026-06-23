import {useTranslations} from "next-intl";
import {teachings} from "../../../content/teachings";

export function LatestTeachingPreview() {
  const t = useTranslations("home.teaching");
  const latestTeaching = teachings.find((teaching) => teaching.featured) ?? teachings[0];

  return (
    <article className="surface-panel preview-card latest-teaching-card">
      <p className="section-kicker">{t("eyebrow")}</p>
      <p className="preview-card__meta">{t("meta")}</p>
      <h2>{latestTeaching.title}</h2>
      <p>{latestTeaching.summary}</p>
    </article>
  );
}
