import { homeContent } from "../../../content/home";
import { site } from "../../../content/site";
import { Button } from "../../../shared/components/Button";
import { Container } from "../../../shared/components/Container";

const sabbathMetadata = [
  { label: "Day", value: "Saturday" },
  { label: "Time", value: "12:00 noon" },
  { label: "Place", value: site.sabbath.location },
];

export function SabbathRhythm() {
  return (
    <section className="sabbath-rhythm" aria-labelledby="sabbath-rhythm-title">
      <Container className="sabbath-rhythm__inner">
        <div className="sabbath-rhythm__content">
          <p className="section-kicker">{homeContent.sabbathRhythm.eyebrow}</p>
          <h2 id="sabbath-rhythm-title">{homeContent.sabbathRhythm.title}</h2>
          <p>{homeContent.sabbathRhythm.body}</p>
          <Button href={homeContent.sabbathRhythm.link.href} variant="quiet">
            {homeContent.sabbathRhythm.link.label} <span aria-hidden="true">&rarr;</span>
          </Button>
        </div>
        <dl className="sabbath-rhythm__metadata" aria-label="Weekly Sabbath details">
          {sabbathMetadata.map((item) => (
            <div className="sabbath-rhythm__meta" key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}