import type { Metadata } from "next";
import { givingDetails } from "../../content/institutional";
import { PageHero } from "../../features/pages/components/PageHero";
import { Container } from "../../shared/components/Container";

export const metadata: Metadata = {
  title: "Giving | Kingdom of Israel",
  description:
    "Banking details for orderly giving to Kingdom of Israel, presented with clarity, seriousness, and restraint.",
};

export default function GivingPage() {
  return (
    <>
      <PageHero
        eyebrow={givingDetails.eyebrow}
        title={givingDetails.title}
        description={givingDetails.description}
      />

      <section className="institution-section" aria-labelledby="giving-details-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="institution-copy-block">
            <p className="section-kicker">Stewardship</p>
            <h2 id="giving-details-title">Giving is handled plainly and without display.</h2>
            <p>
              Support is offered in seriousness before God, not as spectacle. The account details below are shared
              for those who wish to assist the work in an orderly way.
            </p>
          </div>

          <section className="bank-block" aria-label="Bank details">
            <div className="bank-block__row">
              <span>Account holder</span>
              <strong>{givingDetails.accountHolder}</strong>
            </div>
            <div className="bank-block__row">
              <span>Bank</span>
              <strong>{givingDetails.bank}</strong>
            </div>
            <div className="bank-block__row">
              <span>Account number</span>
              <strong>{givingDetails.accountNumber}</strong>
            </div>
            <div className="bank-block__row">
              <span>Branch</span>
              <strong>{givingDetails.branch}</strong>
            </div>
          </section>
        </Container>
      </section>
    </>
  );
}
