import {useTranslations} from "next-intl";
import {Button} from "../../../shared/components/Button";
import {Container} from "../../../shared/components/Container";

export function SabbathRhythm() {
  const t = useTranslations("home.sabbath");
  const sabbathMetadata = [
    {label: t("dayLabel"), value: t("dayValue")},
    {label: t("timeLabel"), value: t("timeValue")},
    {label: t("placeLabel"), value: t("placeValue")},
  ];

  return (
    <section className="sabbath-rhythm" aria-labelledby="sabbath-rhythm-title">
      <Container className="sabbath-rhythm__inner">
        <div className="sabbath-rhythm__content">
          <p className="section-kicker">{t("eyebrow")}</p>
          <h2 id="sabbath-rhythm-title">{t("title")}</h2>
          <p>{t("body")}</p>
          <Button href="/visit" variant="quiet">
            {t("link")} <span aria-hidden="true">&rarr;</span>
          </Button>
        </div>
        <dl className="sabbath-rhythm__metadata" aria-label={t("metadataLabel")}>
          {sabbathMetadata.map((item) => (
            <div className="sabbath-rhythm__meta" key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
