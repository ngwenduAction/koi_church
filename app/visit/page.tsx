import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { visitRequestForm } from "../../content/institutional";
import { IntakeForm } from "../../features/forms/components/IntakeForm";
import { DetailGrid } from "../../features/pages/components/DetailGrid";
import { InfoList } from "../../features/pages/components/InfoList";
import { MediaBlock } from "../../features/pages/components/MediaBlock";
import { PageHero } from "../../features/pages/components/PageHero";
import { Container } from "../../shared/components/Container";
import { HeroInterface } from "../../features/home/components/HeroInterface";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.visit");

  return {
    title: `${t("eyebrow")} | Kingdom of Israel`,
    description: t("description"),
  };
}

export default async function VisitPage() {
  const t = await getTranslations("pages.visit");

  const essentials = [
    { label: t("essentials.day"), value: t("essentials.dayValue") },
    { label: t("essentials.time"), value: t("essentials.timeValue") },
    { label: t("essentials.city"), value: t("essentials.cityValue") },
    { label: t("essentials.teacher"), value: t("essentials.teacherValue") },
    { label: t("essentials.reader"), value: t("essentials.readerValue") },
  ];

  const practicalNotes = [
    { label: t("practical.parking"), value: t("practical.yes") },
    { label: t("practical.accessibility"), value: t("practical.yes") },
    { label: t("practical.children"), value: t("practical.yes") },
  ];

  return (
    <main>
      <HeroInterface
        mediaUrl="/media/visit-hero.jpg"
        mediaTabletUrl="/media/visit-hero-tablet.jpg"
        mediaMobileUrl="/media/visit-hero-mobile.jpg"
        pageTitleKey="hero.visitTitle"
        pageCaptionKey="hero.visitCaption"
        bottomImage="/media/transparent-bottom (1).png"
      />

      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        videoUrl="/media/Homepage%20hero%20atmosphere.mp4"
        mediaLabel={t("media.arrivalLabel")}
      />

      <section className="institution-section" aria-labelledby="visit-essentials-title">
        <Container className="institution-layout institution-layout--stack">
          <div className="institution-section__heading">
            <p className="section-kicker">{t("guide")}</p>
            <h2 id="visit-essentials-title">{t("expectTitle")}</h2>
            <p>{t("expectBody")}</p>
          </div>
          <DetailGrid items={essentials} />
        </Container>
      </section>

      <section className="institution-section institution-section--ruled" aria-labelledby="visit-preparation-title">
        <Container className="institution-layout institution-layout--split">
          <InfoList title={t("whatToExpect")} items={t.raw("whatToExpectItems") as string[]} />
          <InfoList title={t("whatToBring")} items={t.raw("whatToBringItems") as string[]} />
        </Container>
      </section>

      <section className="institution-section institution-section--media" aria-label={t("media.studyLabel")}>
        <Container size="narrow">
          <MediaBlock
            aspectRatio="3:2"
            description={t("media.studyDescription")}
            imageUrl="/media/Sabbath%20study%20atmosphere%20in%20Johannesburg,%20warm%20natural%20light.jpg"
            label={t("media.studyLabel")}
          />
        </Container>
      </section>

      <section className="institution-section" aria-labelledby="visit-order-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="info-list">
            <h2 id="visit-order-title">{t("practicalOrder")}</h2>
            <DetailGrid items={practicalNotes} />
            <p className="institution-note">{t("fellowshipNote")}</p>
          </div>
          <div className="institution-copy-block">
            <p className="section-kicker">{t("conduct")}</p>
            <h2>{t("conductTitle")}</h2>
            <p>{t("conductBody")}</p>
          </div>
        </Container>
      </section>

      <section className="institution-section institution-section--ruled" aria-labelledby="dress-code-title">
        <Container className="institution-layout institution-layout--dress-code institution-layout--top">
          <MediaBlock
            aspectRatio="4:5"
            className="visit-dress-code__media"
            description={t("media.dressDescription")}
            imageUrl="/media/Close-up%20of%20modest%20textures,%20linen,%20and%20respectful%20attire.jpg"
            label={t("media.dressLabel")}
          />
          <div className="visit-dress-code__content">
            <div className="institution-copy-block">
              <p className="section-kicker">{t("dressCode")}</p>
              <h2 id="dress-code-title">{t("dressTitle")}</h2>
              <p>{t("dressBody")}</p>
            </div>
            <div className="institution-split-list institution-split-list--columns">
              <InfoList title={t("men")} items={t.raw("dressCodeMen") as string[]} />
              <InfoList title={t("women")} items={t.raw("dressCodeWomen") as string[]} />
            </div>
          </div>
        </Container>
      </section>

      <section className="institution-section" aria-labelledby="visit-form-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="institution-copy-block">
            <p className="section-kicker">{t("request")}</p>
            <h2 id="visit-form-title">{t("requestTitle")}</h2>
            <p>{t("requestBody")}</p>
          </div>
          <IntakeForm config={visitRequestForm} tone="study" translationNamespace="visit" />
        </Container>
      </section>
    </main>
  );
}
