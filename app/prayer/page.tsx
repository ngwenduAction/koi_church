import type { Metadata } from "next";
import {
  prayerDetails,
  prayerForm,
} from "../../content/institutional";
import { IntakeForm } from "../../features/forms/components/IntakeForm";
import { PageHero } from "../../features/pages/components/PageHero";
import { Container } from "../../shared/components/Container";

export const metadata: Metadata = {
  title: "Prayer | Kingdom of Israel",
  description:
    "Private prayer request page for Kingdom of Israel, with a respectful intake form prepared for future care workflows.",
};

export default function PrayerPage() {
  return (
    <>
      <PageHero
        eyebrow={prayerDetails.eyebrow}
        title={prayerDetails.title}
        description={prayerDetails.description}
      />

      <section className="institution-section" aria-labelledby="prayer-form-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="institution-copy-block">
            <p className="section-kicker">Confidential Care</p>
            <h2 id="prayer-form-title">Share your request carefully and it will be handled with respect.</h2>
            <p>{prayerDetails.note}</p>
          </div>
          <IntakeForm config={prayerForm} />
        </Container>
      </section>
    </>
  );
}
