import type { Metadata } from "next";
import {
  visitDetails,
  visitRequestForm,
} from "../../content/institutional";
import { IntakeForm } from "../../features/forms/components/IntakeForm";
import { DetailGrid } from "../../features/pages/components/DetailGrid";
import { InfoList } from "../../features/pages/components/InfoList";
import { MediaBlock } from "../../features/pages/components/MediaBlock";
import { PageHero } from "../../features/pages/components/PageHero";
import { Container } from "../../shared/components/Container";

export const metadata: Metadata = {
  title: "Visit | Kingdom of Israel",
  description:
    "Visitor information for the weekly Sabbath class at Kingdom of Israel, including what to expect, what to bring, dress order, and visit planning.",
};

export default function VisitPage() {
  return (
    <>
      <PageHero
        eyebrow={visitDetails.eyebrow}
        title={visitDetails.title}
        description={visitDetails.description}
        videoUrl="/media/Homepage%20hero%20atmosphere.mp4"
        mediaLabel="Sabbath arrival atmosphere"
      />

      <section className="institution-section" aria-labelledby="visit-essentials-title">
        <Container className="institution-layout institution-layout--stack">
          <div className="institution-section__heading">
            <p className="section-kicker">Visitor Guide</p>
            <h2 id="visit-essentials-title">What to expect on the Sabbath</h2>
            <p>
              The weekly class is orderly, scriptural, and practical. Visitors are received for study,
              listening, and fellowship with the assembly.
            </p>
          </div>
          <DetailGrid items={visitDetails.essentials} />
        </Container>
      </section>

      <section className="institution-section institution-section--ruled" aria-labelledby="visit-preparation-title">
        <Container className="institution-layout institution-layout--split">
          <InfoList title="What to expect" items={visitDetails.whatToExpect} />
          <InfoList title="What to bring" items={visitDetails.whatToBring} />
        </Container>
      </section>

      <section className="institution-section institution-section--media" aria-label="Sabbath study atmosphere">
        <Container size="narrow">
          <MediaBlock
            aspectRatio="3:2"
            description="Sabbath study atmosphere in Johannesburg, warm natural light."
            imageUrl="/media/Sabbath%20study%20atmosphere%20in%20Johannesburg,%20warm%20natural%20light.jpg"
            label="Johannesburg Sabbath study"
          />
        </Container>
      </section>

      <section className="institution-section" aria-labelledby="visit-order-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="info-list">
            <h2 id="visit-order-title">Practical order</h2>
            <DetailGrid items={visitDetails.practicalNotes} />
            <p className="institution-note">{visitDetails.fellowshipNote}</p>
          </div>
          <div className="institution-copy-block">
            <p className="section-kicker">Conduct</p>
            <h2>Approach the class in modesty and order.</h2>
            <p>
              Dress and conduct should reflect reverence in the assembly. The following guidance is observed in
              the building during class.
            </p>
          </div>
        </Container>
      </section>

      <section className="institution-section institution-section--ruled" aria-labelledby="dress-code-title">
        <Container className="institution-layout institution-layout--dress-code institution-layout--top">
          <MediaBlock
            aspectRatio="4:5"
            className="visit-dress-code__media"
            description="Close-up of modest textures, linen, and respectful attire."
            imageUrl="/media/Close-up%20of%20modest%20textures,%20linen,%20and%20respectful%20attire.jpg"
            label="Modest textures"
          />
          <div className="visit-dress-code__content">
            <div className="institution-copy-block">
              <p className="section-kicker">Dress Code</p>
              <h2 id="dress-code-title">Modest apparel is required for men and women.</h2>
              <p>
                These requirements are shared plainly so visitors can arrive prepared and without uncertainty.
              </p>
            </div>
            <div className="institution-split-list institution-split-list--columns">
              <InfoList title="Men" items={visitDetails.dressCodeMen} />
              <InfoList title="Women" items={visitDetails.dressCodeWomen} />
            </div>
          </div>
        </Container>
      </section>

      <section className="institution-section" aria-labelledby="visit-form-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="institution-copy-block">
            <p className="section-kicker">Visit Request</p>
            <h2 id="visit-form-title">Tell KOI you are planning to attend.</h2>
            <p>
              This helps the class receive visitors with clarity, especially if you have questions about timing,
              accessibility, or family attendance.
            </p>
          </div>
          <IntakeForm config={visitRequestForm} tone="study" />
        </Container>
      </section>
    </>
  );
}
