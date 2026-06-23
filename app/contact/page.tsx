import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { contactDetails, contactForm } from "../../content/institutional";
import { IntakeForm } from "../../features/forms/components/IntakeForm";
import { PageHero } from "../../features/pages/components/PageHero";
import { Container } from "../../shared/components/Container";
import { HeroInterface } from "../../features/home/components/HeroInterface";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.contact");

  return {
    title: `${t("inquiry")} | Kingdom of Israel`,
    description: t("body"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("pages.contact");

  return (
    <main>
      <HeroInterface
        mediaUrl="/media/contact-hero.jpg"
        mediaTabletUrl="/media/contact-hero-tablet.jpg"
        mediaMobileUrl="/media/contact-hero-mobile.jpg"
        pageTitleKey="hero.contactTitle"
        pageCaptionKey="hero.contactCaption"
        bottomImage="/media/transparent-bottom (1).png"
      />

      <PageHero eyebrow={t("inquiry")} title={t("heroTitle")} description={t("heroDescription")}>
        <a className="institution-direct-link" href={`mailto:${contactDetails.email}`}>
          {contactDetails.email}
        </a>
      </PageHero>

      <section className="institution-section" aria-labelledby="contact-form-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="institution-copy-block">
            <p className="section-kicker">{t("inquiry")}</p>
            <h2 id="contact-form-title">{t("title")}</h2>
            <p>{t("body")}</p>
          </div>
          <IntakeForm config={contactForm} translationNamespace="contact" />
        </Container>
      </section>
    </main>
  );
}
