import type { Metadata } from "next";
import {
  membershipDetails,
  membershipForm,
} from "../../content/institutional";
import { IntakeForm } from "../../features/forms/components/IntakeForm";
import { InfoList } from "../../features/pages/components/InfoList";
import { PageHero } from "../../features/pages/components/PageHero";
import { Container } from "../../shared/components/Container";

export const metadata: Metadata = {
  title: "New Member Sign Up | Kingdom of Israel",
  description:
    "Membership information and sign-up form for Kingdom of Israel, including the doctrinal and practical commitments of the assembly.",
};

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow={membershipDetails.eyebrow}
        title={membershipDetails.title}
        description={membershipDetails.description}
      />

      <section className="institution-section" aria-labelledby="membership-meaning-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="institution-copy-block">
            <p className="section-kicker">Commitment</p>
            <h2 id="membership-meaning-title">Membership joins doctrine, conduct, and fellowship.</h2>
            <p>
              It is not a waiting-room category. Membership identifies a person with the order of the assembly and
              the doctrine it confesses and keeps.
            </p>
            <p className="institution-note">{membershipDetails.clarification}</p>
          </div>
          <InfoList title="Membership includes" items={membershipDetails.commitments} />
        </Container>
      </section>

      <section className="institution-section institution-section--ruled" aria-labelledby="membership-form-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="institution-copy-block">
            <p className="section-kicker">Sign Up</p>
            <h2 id="membership-form-title">Submit your membership request plainly and truthfully.</h2>
            <p>
              This form prepares the intake structure for KOI&apos;s membership workflow and will be connected to the
              next backend phase.
            </p>
          </div>
          <IntakeForm config={membershipForm} />
        </Container>
      </section>
    </>
  );
}
