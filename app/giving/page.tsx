import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { givingDetails } from "../../content/institutional";
import { BankDetailCard } from "../../features/giving/components/BankDetailCard";
import { PaystackButton } from "../../features/giving/components/PaystackButton";
import { PageHero } from "../../features/pages/components/PageHero";
import { ScriptureBlock } from "../../features/pages/components/ScriptureBlock";
import { Container } from "../../shared/components/Container";
import { HeroInterface } from "../../features/home/components/HeroInterface";


export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.giving");

  return {
    title: `${t("eyebrow")} | Israel of God`,
    description: t("description"),
  };
}

export default async function GivingPage() {
  const t = await getTranslations("pages.giving");
  return (
    <main>
      <HeroInterface 
        mediaUrl="/media/Give-Hero.jpg" 
        mediaTabletUrl="/media/giving-hero-tablet.jpg"
        mediaMobileUrl="/media/giving-hero-mobile.jpg"
        pageTitleKey="hero.givingTitle"
        pageCaptionKey="hero.givingCaption"
        bottomImage="/media/transparent-bottom (1).png"
      />
      
      <>

      <PageHero

        eyebrow={t("eyebrow")}

        title={t("title")}

        description={t("description")}

        imageUrl="/media/cinematic-first-fruits.jpg"

        mediaLabel="First-fruits ledger still"

      />



      <section className="institution-section institution-section--ruled" aria-labelledby="giving-mandate-title">

        <Container className="institution-layout institution-layout--split institution-layout--top">

          <div className="institution-copy-block">

            <p className="section-kicker">{t("mandate")}</p>

            <h2 id="giving-mandate-title">{t("mandateTitle")}</h2>

            <p>{t("mandateBody")}</p>

          </div>

          <ScriptureBlock scriptureKey="malachi3_10" />

        </Container>

      </section>



      <section className="institution-section" aria-labelledby="giving-work-title">

        <Container className="institution-layout institution-layout--split institution-layout--top">

          <div>

            <BankDetailCard

              accountHolder={givingDetails.accountHolder}

              bank={t("bankName")}

              accountNumber={givingDetails.accountNumber}

              branchCode={givingDetails.branch}

            />

            <PaystackButton />

          </div>



          <div className="institution-copy-block giving-work">

            <p className="section-kicker">{t("work")}</p>

            <h2 id="giving-work-title">{t("workTitle")}</h2>

            <p>{t("workBody1")}</p>

            <p>{t("workBody2")}</p>

          </div>

        </Container>

      </section>

    </>
    </main>
  );
}





