import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DetailGrid } from "../../features/pages/components/DetailGrid";
import { PageHero } from "../../features/pages/components/PageHero";
import { ScriptureBlock } from "../../features/pages/components/ScriptureBlock";
import { MembershipForm } from "../../features/forms/components/MembershipForm";
import { Container } from "../../shared/components/Container";
import { HeroInterface } from "../../features/home/components/HeroInterface";

export const metadata: Metadata = {
  title: "Membership | Kingdom of Israel",
  description:
    "Membership at Kingdom of Israel is a covenant request grounded in doctrine, observance, and dedication to the God of Israel.",
};

export default async function MembershipPage() {
  const t = await getTranslations("pages.membership");
  const observancePillars = [
    { label: t("pillars.sabbath.label"), value: t("pillars.sabbath.value") },
    { label: t("pillars.feasts.label"), value: t("pillars.feasts.value") },
    { label: t("pillars.dietary.label"), value: t("pillars.dietary.value") },
    { label: t("pillars.royal.label"), value: t("pillars.royal.value") },
  ];
  return (
    <main>
      <HeroInterface 
        mediaUrl="/media/membership-hero.jpg" 
        mediaTabletUrl="/media/membership-hero-tablet.jpg"
        mediaMobileUrl="/media/membership-hero-mobile.jpg"
        pageTitleKey="hero.membershipTitle"
        pageCaptionKey="hero.membershipCaption"
        bottomImage="/media/transparent-bottom (1).png"
      />
      
      <>

      <PageHero

        eyebrow={t("eyebrow")}

        title={t("title")}

        description={t("description")}

        imageUrl="/media/linen-texture-bg.jpg"

        mediaLabel="Foundational archive still"

      />



      <section className="institution-section institution-section--ruled" aria-labelledby="membership-covenant-title">

        <Container className="institution-layout institution-layout--split institution-layout--top">

          <div className="institution-copy-block">

            <p className="section-kicker">{t("covenant")}</p>

            <h2 id="membership-covenant-title">{t("covenantTitle")}</h2>

            <p>{t("covenantBody")}</p>

          </div>

          <ScriptureBlock scriptureKey="ephesians2_19" />

        </Container>

      </section>



      <section className="institution-section" aria-labelledby="membership-observances-title">

        <Container className="institution-layout institution-layout--stack">

          <div className="institution-section__heading">

            <p className="section-kicker">{t("observances")}</p>

            <h2 id="membership-observances-title">{t("observancesTitle")}</h2>

            <p className="reading-prose">

              {t("observancesBody")}

            </p>

          </div>

          <DetailGrid items={observancePillars} />

        </Container>

      </section>



      <section className="institution-section institution-section--ruled" aria-labelledby="membership-preparation-title">

        <Container className="institution-layout institution-layout--split institution-layout--top">

          <div className="institution-copy-block reading-prose">

            <p className="section-kicker">{t("preparation")}</p>

            <h2 id="membership-preparation-title">{t("preparationTitle")}</h2>

            <p>{t("preparationBody1")}</p>

            <p>{t("preparationBody2")}</p>

          </div>

          <MembershipForm />

        </Container>

      </section>

    </>
    </main>
  );
}





