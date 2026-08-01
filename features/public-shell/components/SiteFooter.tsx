import {useTranslations} from "next-intl";
import {footerNavigation} from "../../../content/navigation";
import {site} from "../../../content/site";
import {Link} from "../../../i18n/navigation";
import {Container} from "../../../shared/components/Container";
import {KoiLogoMark} from "../../brand/components/KoiLogoMark";
import {SocialBrandIcon} from "./SocialBrandIcon";

const footerNavKeyByLabel: Record<string, string> = {
  "Lesson Library": "lessonLibrary",
  "Flagship Teaching": "flagshipTeaching",
  Giving: "giving",
  Blog: "blog",
};

export function SiteFooter() {
  const t = useTranslations();

  return (
    <footer className="koi-footer">
      <Container className="koi-footer__inner">
        <div className="koi-footer__brand-panel">
          <Link className="koi-footer__logo-link" href="/" aria-label={t("common.brandHome")}>
            <KoiLogoMark className="koi-footer__logo" sizes="(max-width: 680px) 104px, 128px" tone="light" />
          </Link>
          <p className="koi-footer__thesis">{t("home.foundation.body")}</p>
        </div>

        <div className="koi-footer__rhythm-panel" aria-label={t("home.sabbath.metadataLabel")}>
          <span className="koi-footer__eyebrow">{t("footer.weekly")}</span>
          <p className="koi-footer__time">{t("home.sabbath.timeValue")}</p>
          <p className="koi-footer__place">{t("home.sabbath.placeValue")}</p>
        </div>

        <nav className="koi-footer__nav" aria-label={t("common.sideNavigation")}>
          <span className="koi-footer__eyebrow">{t("footer.library")}</span>
          <ul>
            {footerNavigation.map((item) => {
              const key = footerNavKeyByLabel[item.label] ?? item.label.toLowerCase();
              return (
                <li key={item.href}>
                  <Link href={item.href}>{t(`navigation.${key}`)}</Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="koi-footer__social" aria-label={t("footer.channels")}>
          <span className="koi-footer__eyebrow">{t("footer.channels")}</span>
          <div className="koi-footer__social-grid">
            {site.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <SocialBrandIcon platform={social.platform} className="koi-footer__social-icon" />
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </Container>

      <Container className="koi-footer__lower">
        <p>{t("footer.lowerBrand")}</p>
        <p>{t("footer.lowerText")}</p>
      </Container>

      <style>{`
        .koi-footer {
          position: relative;
          overflow: hidden;
          margin-top: var(--space-9);
          border-top: 1px solid color-mix(in srgb, var(--color-bronze) 34%, transparent);
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--color-ink) 96%, var(--color-bronze) 4%) 0%, var(--color-ink) 100%);
          color: var(--color-linen);
        }

        .koi-footer::before {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, color-mix(in srgb, var(--color-bronze) 13%, transparent), transparent 36%),
            radial-gradient(circle at 82% 18%, color-mix(in srgb, var(--color-bronze) 18%, transparent), transparent 32%);
          content: "";
          opacity: 0.62;
        }

        .koi-footer__inner,
        .koi-footer__lower {
          position: relative;
          z-index: 1;
        }

        .koi-footer__inner {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(220px, 0.82fr) minmax(180px, 0.65fr) minmax(260px, 0.86fr);
          gap: clamp(2rem, 4vw, 4.5rem);
          align-items: start;
          padding-block: clamp(4rem, 8vw, 7rem) clamp(3.5rem, 6vw, 5.5rem);
        }

        .koi-footer__brand-panel {
          max-width: 34rem;
        }

        .koi-footer__logo-link {
          display: inline-flex;
          width: 15rem;
          height: 15rem;
          align-items: center;
          padding: 0.62rem 0.85rem;
          border: 1px solid transparent;
          border-radius: 0.8rem;
          background: transparent;
          box-shadow: none;
          color: var(--color-ink);
        }

        .koi-footer__logo {
          display: block;
          width: 100%;
          height: 100%;
          filter: contrast(1.08) saturate(1.02);
        }

        .koi-footer__thesis {
          max-width: 31rem;
          margin: clamp(1.8rem, 3vw, 2.6rem) 0 0;
          color: color-mix(in srgb, var(--color-linen) 76%, transparent);
          font-size: clamp(1rem, 1.45vw, 1.18rem);
          line-height: 1.7;
          text-wrap: pretty;
        }

        .koi-footer__eyebrow {
          display: block;
          margin-bottom: 1.1rem;
          color: color-mix(in srgb, var(--color-bronze) 76%, var(--color-linen) 24%);
          font-family: var(--font-label);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .koi-footer__time {
          margin: 0;
          color: var(--color-linen);
          font-family: var(--font-display);
          font-size: clamp(2.1rem, 4vw, 3.6rem);
          line-height: 0.96;
          letter-spacing: -0.035em;
        }

        .koi-footer__place {
          max-width: 15rem;
          margin: 1rem 0 0;
          color: color-mix(in srgb, var(--color-linen) 70%, transparent);
          line-height: 1.5;
        }

        .koi-footer__nav ul {
          display: grid;
          gap: 0.7rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .koi-footer__nav a {
          color: var(--color-linen);
          font-family: var(--font-label);
          font-size: 0.82rem;
          font-weight: 750;
          letter-spacing: 0.13em;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 180ms ease;
        }

        .koi-footer__nav a:hover,
        .koi-footer__social a:hover {
          color: color-mix(in srgb, var(--color-bronze) 72%, var(--color-linen) 28%);
        }

        .koi-footer__social-grid {
          display: grid;
          gap: 0.7rem;
        }

        .koi-footer__social a {
          display: inline-flex;
          width: fit-content;
          align-items: center;
          gap: 0.7rem;
          color: var(--color-linen);
          font-family: var(--font-label);
          font-size: 0.78rem;
          font-weight: 750;
          letter-spacing: 0.13em;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 180ms ease, transform 180ms ease;
        }

        .koi-footer__social a:hover {
          transform: translateX(0.2rem);
        }

        .koi-footer__social-icon {
          width: 1rem;
          height: 1rem;
          color: color-mix(in srgb, var(--color-bronze) 72%, var(--color-linen) 28%);
        }

        .koi-footer__lower {
          display: flex;
          justify-content: space-between;
          gap: 1.5rem;
          border-top: 1px solid color-mix(in srgb, var(--color-linen) 12%, transparent);
          padding-block: 1.15rem 1.35rem;
          color: color-mix(in srgb, var(--color-linen) 54%, transparent);
          font-family: var(--font-label);
          font-size: 0.68rem;
          font-weight: 750;
          letter-spacing: 0.18em;
          line-height: 1.5;
          text-transform: uppercase;
        }

        .koi-footer__lower p {
          margin: 0;
        }

        @media (max-width: 1080px) {
          .koi-footer__inner {
            grid-template-columns: minmax(0, 1.2fr) minmax(220px, 0.8fr);
          }
        }

        @media (max-width: 680px) {
          .koi-footer__inner {
            grid-template-columns: 1fr;
            gap: 2.4rem;
            padding-block: 3.6rem 3rem;
          }

          .koi-footer__logo-link {
            width: 6.5rem;
            height: 6.5rem;
          }

          .koi-footer__lower {
            flex-direction: column;
            gap: 0.45rem;
            font-size: 0.6rem;
          }
        }
      `}</style>
    </footer>
  );
}

