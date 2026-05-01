import { site } from "../../../content/site";
import { Container } from "../../../shared/components/Container";
import { KoiWordmark } from "../../brand/components/KoiWordmark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__inner">
        <div className="site-footer__identity">
          <KoiWordmark />
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
