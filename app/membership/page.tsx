import type { Metadata } from "next";
import { DetailGrid } from "../../features/pages/components/DetailGrid";
import { PageHero } from "../../features/pages/components/PageHero";
import { ScriptureBlock } from "../../features/pages/components/ScriptureBlock";
import { MembershipForm } from "../../features/forms/components/MembershipForm";
import { Container } from "../../shared/components/Container";

export const metadata: Metadata = {
  title: "Membership | Kingdom of Israel",
  description:
    "Membership at Kingdom of Israel is a covenant request grounded in doctrine, observance, and dedication to the God of Israel.",
};

const observancePillars = [
  { label: "The Sabbath", value: "7th Day" },
  { label: "The Feasts of the Lord", value: "Leviticus 23" },
  { label: "The Dietary Law", value: "Leviticus 11" },
  { label: "The Royal Commandments", value: "Moral Law" },
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="The Foundation of the Prophets"
        description="Membership at KOI is received as a covenant matter. It joins doctrine, order, and fellowship under the word taught by the prophets, the apostles, and Christ the chief cornerstone."
        imageUrl="/media/linen-texture-bg.jpg"
        mediaLabel="Foundational archive still"
      />

      <section className="institution-section institution-section--ruled" aria-labelledby="membership-covenant-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="institution-copy-block">
            <p className="section-kicker">The Covenant</p>
            <h2 id="membership-covenant-title">Those received are no longer strangers, but fellow citizens in the household.</h2>
            <p>
              Membership is not casual subscription. It is an ordered request to walk in fellowship, repentance,
              and obedience within the household that confesses the God of Israel.
            </p>
          </div>
          <ScriptureBlock reference="Ephesians 2:19">
            Now therefore ye are no more strangers and foreigners, but fellowcitizens with the saints, and of the
            household of God.
          </ScriptureBlock>
        </Container>
      </section>

      <section className="institution-section" aria-labelledby="membership-observances-title">
        <Container className="institution-layout institution-layout--stack">
          <div className="institution-section__heading">
            <p className="section-kicker">Institutional Observances</p>
            <h2 id="membership-observances-title">Membership is kept within a visible order of doctrine and practice.</h2>
            <p className="reading-prose">
              These pillars mark the life of the assembly and form the expected frame of covenant continuity at KOI.
            </p>
          </div>
          <DetailGrid items={observancePillars} />
        </Container>
      </section>

      <section className="institution-section institution-section--ruled" aria-labelledby="membership-preparation-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="institution-copy-block reading-prose">
            <p className="section-kicker">Preparation</p>
            <h2 id="membership-preparation-title">This is a serious act of repentance and dedication to the God of Israel.</h2>
            <p>
              A membership request should be made soberly. It is a declaration that a person desires to be received
              under the doctrine, judgments, statutes, and fellowship observed in this assembly.
            </p>
            <p>
              KOI does not treat membership as a casual subscription. It is approached with truthfulness, prayer,
              and a willingness to be examined in the light of the word.
            </p>
          </div>
          <MembershipForm />
        </Container>
      </section>
    </>
  );
}
