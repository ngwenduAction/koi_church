import Link from "next/link";
import { footerNavigation } from "../../../content/navigation";
import { site } from "../../../content/site";
import { Container } from "../../../shared/components/Container";
import { KoiLogoMark } from "../../brand/components/KoiLogoMark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__inner">
        <div className="site-footer__identity site-footer__identity--brand-led">
          <Link className="site-footer__brand-mark-link" href="/" aria-label="Kingdom of Israel home">
            <KoiLogoMark className="site-footer__brand-mark" sizes="(max-width: 767px) 112px, 156px" />
          </Link>
          <p>{site.description}</p>
        </div>
        <div className="site-footer__column site-footer__column--sabbath">
          <span className="eyebrow">{site.sabbath.label}</span>
          <p>
            {site.sabbath.time}
            <br />
            {site.sabbath.location}
          </p>
        </div>
        <div className="site-footer__column site-footer__column--contact">
          <span className="eyebrow">Contact</span>
          <p>
            <a className="site-footer__email" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
          </p>
        </div>
        <div className="site-footer__column site-footer__column--library">
          <span className="eyebrow">Library</span>
          <ul>
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-footer__column site-footer__column--social">
          <span className="eyebrow">Social</span>
          <ul>
            {site.socials.map((social) => (
              <li key={social.platform}>
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
