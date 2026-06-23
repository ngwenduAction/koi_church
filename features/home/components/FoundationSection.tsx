import {useTranslations} from "next-intl";
import {Container} from "../../../shared/components/Container";

export function FoundationSection() {
  const t = useTranslations("home.foundation");
  const pillars = t.raw("pillars") as string[];

  return (
    <section className="home-section">
      <Container className="home-section__grid">
        <div>
          <p className="section-kicker">{t("eyebrow")}</p>
          <h2>{t("title")}</h2>
        </div>
        <div>
          <p className="editorial-copy">{t("body")}</p>
          <ul className="foundation-list">
            {pillars.map((pillar) => (
              <li key={pillar}>{pillar}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
