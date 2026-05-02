import { Container } from "../shared/components/Container";
import { Button } from "../shared/components/Button";

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <Container size="narrow">
        <p className="eyebrow">Page Not Found</p>
        <h1 id="not-found-title" className="editorial-title">
          This page is not yet part of the KOI library.
        </h1>
        <p className="editorial-copy">
          Return to the public foundation or continue with the available lesson library.
        </p>
        <Button href="/" variant="quiet">
          Return Home
        </Button>
      </Container>
    </section>
  );
}
