import { site } from "../../../content/site";
import { Container } from "../../../shared/components/Container";
import { Wordmark } from "../../brand/components/KoiWordmark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__inner">
        <div className="site-footer__identity">
          <Wordmark />
          <p>{site.description}</p>
        </div>
        <div className="site-footer__meta">
          <div>
            <span className="eyebrow">{site.sabbath.label}</span>
            <p>
              {site.sabbath.time}
              <br />
              {site.sabbath.location}
            </p>
          </div>
          <div>
            <span className="eyebrow">Contact</span>
            <p>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </p>
          </div>
          <div>
            <span className="eyebrow">Social</span>
            <ul>
              {site.socials.map((social) => (
                <li key={social.platform}>
                  <a href={social.url}>{social.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
