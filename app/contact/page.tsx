import type { Metadata } from "next";
import {
  contactDetails,
  contactForm,
} from "../../content/institutional";
import { IntakeForm } from "../../features/forms/components/IntakeForm";
import { PageHero } from "../../features/pages/components/PageHero";
import { Container } from "../../shared/components/Container";

export const metadata: Metadata = {
  title: "Contact | Kingdom of Israel",
  description:
    "General contact page for Kingdom of Israel, including direct email contact and a structured inquiry form.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contactDetails.eyebrow}
        title={contactDetails.title}
        description={contactDetails.description}
      >
        <a className="institution-direct-link" href={`mailto:${contactDetails.email}`}>
          {contactDetails.email}
        </a>
      </PageHero>

      <section className="institution-section" aria-labelledby="contact-form-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="institution-copy-block">
            <p className="section-kicker">Inquiry</p>
            <h2 id="contact-form-title">Write with clarity and KOI will be able to respond in order.</h2>
            <p>
              Use the form for introductions, practical questions, or requests for further information about the
              Sabbath class and the work.
            </p>
          </div>
          <IntakeForm config={contactForm} />
        </Container>
      </section>
    </>
  );
}
