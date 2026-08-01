import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PrayerForm } from "../../features/forms/components/PrayerForm";
import { PageHero } from "../../features/pages/components/PageHero";
import { ScriptureBlock } from "../../features/pages/components/ScriptureBlock";
import { Container } from "../../shared/components/Container";

export const metadata: Metadata = {
  title: "Prayer | Israel of God",
  description:
    "A private intercession page for Israel of God, where prayer requests may be submitted carefully for the elder and the assembly.",
};

export default async function PrayerPage() {
  const t = await getTranslations("pages.prayer");
  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        imageUrl="/media/cinematic-intercession.jpg"
        mediaLabel="Intercession chamber still"
      />

      <section className="institution-section institution-section--ruled" aria-labelledby="prayer-mandate-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="institution-copy-block">
            <p className="section-kicker">{t("mandate")}</p>
            <h2 id="prayer-mandate-title">{t("mandateTitle")}</h2>
            <p>{t("mandateBody")}</p>
          </div>
          <ScriptureBlock scriptureKey="james5_16" />
        </Container>
      </section>

      <section className="institution-section" aria-labelledby="prayer-burden-title">
        <Container className="institution-layout institution-layout--stack">
          <div className="institution-copy-block reading-prose prayer-narrative">
            <p className="section-kicker">{t("burdens")}</p>
            <h2 id="prayer-burden-title">{t("burdensTitle")}</h2>
            <p>{t("burdensBody")}</p>
            <p>{t("note")}</p>
          </div>
        </Container>
      </section>

      <section className="institution-section institution-section--ruled" aria-labelledby="prayer-form-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="institution-copy-block">
            <p className="section-kicker">{t("form")}</p>
            <h2 id="prayer-form-title">{t("formTitle")}</h2>
            <p>{t("formBody")}</p>
          </div>
          <PrayerForm />
        </Container>
      </section>
    </>
  );
}




