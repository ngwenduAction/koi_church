import type { Metadata } from "next";
import { prayerDetails } from "../../content/institutional";
import { PrayerForm } from "../../features/forms/components/PrayerForm";
import { PageHero } from "../../features/pages/components/PageHero";
import { ScriptureBlock } from "../../features/pages/components/ScriptureBlock";
import { Container } from "../../shared/components/Container";

export const metadata: Metadata = {
  title: "Prayer | Kingdom of Israel",
  description:
    "A private intercession page for Kingdom of Israel, where prayer requests may be submitted carefully for the elder and the assembly.",
};

export default function PrayerPage() {
  return (
    <>
      <PageHero
        eyebrow="Intercession"
        title="The Prayer of the Righteous"
        description="Requests brought here are handled with sobriety, compassion, and care. Intercession is approached as a serious labor before God, not as public display."
        imageUrl="/media/cinematic-intercession.jpg"
        mediaLabel="Still placeholder"
      />

      <section className="institution-section institution-section--ruled" aria-labelledby="prayer-mandate-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="institution-copy-block">
            <p className="section-kicker">The Mandate</p>
            <h2 id="prayer-mandate-title">Prayer is shared so the body may bear, confess, and seek healing together.</h2>
            <p>
              KOI receives prayer requests as matters of intercession, repentance, and mutual care. What is brought
              before the Lord should be brought truthfully, with reverence and with faith.
            </p>
          </div>
          <ScriptureBlock reference="James 5:16">
            Confess your faults one to another, and pray one for another, that ye may be healed. The effectual
            fervent prayer of a righteous man availeth much.
          </ScriptureBlock>
        </Container>
      </section>

      <section className="institution-section" aria-labelledby="prayer-burden-title">
        <Container className="institution-layout institution-layout--stack">
          <div className="institution-copy-block reading-prose prayer-narrative">
            <p className="section-kicker">Bear One Another&apos;s Burdens</p>
            <h2 id="prayer-burden-title">The elder and the assembly intercede so burdens need not be carried alone.</h2>
            <p>
              The teaching elder receives prayer requests with discretion, and the assembly joins where appropriate
              in collective intercession. This work is meant to comfort the afflicted, strengthen the weary, and
              bring matters before the Lord in an ordered spirit.
            </p>
            <p>{prayerDetails.note}</p>
          </div>
        </Container>
      </section>

      <section className="institution-section institution-section--ruled" aria-labelledby="prayer-form-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="institution-copy-block">
            <p className="section-kicker">Intercession Form</p>
            <h2 id="prayer-form-title">Submit your request carefully and it will be received in confidence.</h2>
            <p>
              Leave your name only if you wish. If a response is needed, provide an email address so the elder may
              reply in order.
            </p>
          </div>
          <PrayerForm />
        </Container>
      </section>
    </>
  );
}
