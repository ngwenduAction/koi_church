import { FeastsSection } from "../features/feasts/components/FeastsSection";
import { FoundationSection } from "../features/home/components/FoundationSection";
import { HomeHero } from "../features/home/components/HomeHero";
import { LatestTeachingPreview } from "../features/home/components/LatestTeachingPreview";
import { LessonsPreview } from "../features/home/components/LessonsPreview";
import { SabbathRhythm } from "../features/home/components/SabbathRhythm";
import { Container } from "../shared/components/Container";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <SabbathRhythm />
      <FoundationSection />
      <FeastsSection />
      <section className="home-section home-section--quiet">
        <Container className="preview-grid">
          <LatestTeachingPreview />
          <LessonsPreview />
        </Container>
      </section>
    </>
  );
}