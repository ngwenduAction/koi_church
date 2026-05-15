import type { Metadata } from "next";
import { givingDetails } from "../../content/institutional";
import { BankDetailCard } from "../../features/giving/components/BankDetailCard";
import { PaystackButton } from "../../features/giving/components/PaystackButton";
import { PageHero } from "../../features/pages/components/PageHero";
import { ScriptureBlock } from "../../features/pages/components/ScriptureBlock";
import { Container } from "../../shared/components/Container";

export const metadata: Metadata = {
  title: "Giving | Kingdom of Israel",
  description:
    "Stewardship information for Kingdom of Israel, including the scriptural mandate, bank details, and the orderly purpose of support.",
};

export default function GivingPage() {
  return (
    <>
      <PageHero
        eyebrow="Stewardship"
        title="Honour the Lord with thy Substance"
        description="Giving at KOI is handled in seriousness, gratitude, and order. The support of the work is received without spectacle and with plainness before God."
        imageUrl="/media/cinematic-first-fruits.jpg"
        mediaLabel="Still placeholder"
      />

      <section className="institution-section institution-section--ruled" aria-labelledby="giving-mandate-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div className="institution-copy-block">
            <p className="section-kicker">The Mandate</p>
            <h2 id="giving-mandate-title">The storehouse is supplied in obedience, not performance.</h2>
            <p>
              Giving is not treated as display, pressure, or spectacle. It is approached as an act of order before
              God, according to the word and for the sake of the house.
            </p>
          </div>
          <ScriptureBlock reference="Malachi 3:10">
            Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now
            herewith, saith the Lord of hosts, if I will not open you the windows of heaven, and pour you out a
            blessing, that there shall not be room enough to receive it.
          </ScriptureBlock>
        </Container>
      </section>

      <section className="institution-section" aria-labelledby="giving-work-title">
        <Container className="institution-layout institution-layout--split institution-layout--top">
          <div>
            <BankDetailCard
              accountHolder={givingDetails.accountHolder}
              bank="First National Bank (FNB)"
              accountNumber={givingDetails.accountNumber}
              branchCode={givingDetails.branch}
            />
            <PaystackButton />
          </div>

          <div className="institution-copy-block giving-work">
            <p className="section-kicker">The Work</p>
            <h2 id="giving-work-title">Support is directed toward the poor and the maintenance of the house.</h2>
            <p>
              What is given is meant to strengthen the practical life of the assembly: the keeping of the place,
              the continuance of the work, and the relief of need where need is present.
            </p>
            <p>
              KOI keeps this matter plain. Stewardship is handled with seriousness so that the work may remain in
              order and the house may not lack what is necessary.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
