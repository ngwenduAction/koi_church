import {FeastsSection} from "../../features/feasts/components/FeastsSection";
import {FoundationSection} from "../../features/home/components/FoundationSection";
import {HeroInterface} from "../../features/home/components/HeroInterface";
import {LatestTeachingPreview} from "../../features/home/components/LatestTeachingPreview";
import {LessonsPreview} from "../../features/home/components/LessonsPreview";
import {SabbathRhythm} from "../../features/home/components/SabbathRhythm";
import {Container} from "../../shared/components/Container";

export default function HomePage() {
  return (
    <>
      <HeroInterface
        mediaUrl="/media/koi-hero-sacred-desktop-v3.png"
        mediaTabletUrl="/media/koi-hero-sacred-tablet-v3.png"
        mediaMobileUrl="/media/koi-hero-sacred-mobile-v3.png"
        mediaType="image"
        pageTitleKey="hero.mediaTitle"
        pageCaptionKey="hero.mediaCaption"
        bottomImage="/media/Sabbath study atmosphere in Johannesburg, warm natural light.jpg"
      />
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
