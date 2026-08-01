"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { primaryNavigation } from "../../../content/navigation";
import { site } from "../../../content/site";
import type { Locale } from "../../../i18n/routing";
import { Link, usePathname } from "../../../i18n/navigation";
import { KoiLogoMark } from "../../brand/components/KoiLogoMark";
import { SocialBrandIcon } from "../../public-shell/components/SocialBrandIcon";

interface HeroInterfaceProps {
  mediaUrl?: string;
  mediaDesktopUrl?: string;
  mediaTabletUrl?: string;
  mediaMobileUrl?: string;
  mediaType?: "video" | "image";
  pageTitle?: string;
  pageCaption?: string;
  pageTitleKey?: string;
  pageCaptionKey?: string;
  bottomImage?: string;
  hideNav?: boolean;
}

const languages: Array<{
  code: Locale;
  labelKey: "english" | "zulu" | "sesotho";
}> = [
  { code: "en", labelKey: "english" },
  { code: "zu", labelKey: "zulu" },
  { code: "st", labelKey: "sesotho" },
];

const navKeyByLabel: Record<string, string> = {
  Home: "home",
  Membership: "membership",
  Lessons: "lessons",
  Visit: "visit",
  Giving: "giving",
  Blog: "blog",
  Contact: "contact",
};

export function HeroInterface({
  mediaUrl = "/media/koi-hero-sacred-desktop-v3.png",
  mediaDesktopUrl,
  mediaTabletUrl,
  mediaMobileUrl,
  mediaType = "image",
  pageTitle = "Law, testimony, living water.",
  pageCaption = "Bible Study Class",
  pageTitleKey = "hero.mediaTitle",
  pageCaptionKey = "hero.mediaCaption",
  bottomImage = "/media/default-bottom.jpg",
  hideNav = false,
}: HeroInterfaceProps) {
  const rootRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const desktopMedia = mediaDesktopUrl ?? mediaUrl;
  const tabletMedia = mediaTabletUrl ?? desktopMedia;
  const mobileMedia = mediaMobileUrl ?? tabletMedia;
  const localizedPageTitle = pageTitleKey ? t(pageTitleKey) : pageTitle;
  const localizedPageCaption = pageCaptionKey ? t(pageCaptionKey) : pageCaption;
  const switchHref = pathname;

  const resolvedNavigation = primaryNavigation
    .filter((item) => item.active)
    .map((item) => {
      if (item.label.toLowerCase() === "home") {
        return { ...item, label: "Membership", href: "/membership" };
      }
      return item;
    });

  useEffect(() => {
    if (!rootRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      gsap.set("[data-hero-layer]", { autoAlpha: 1, y: 0 });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(['[data-hero-layer="identity"]', '[data-hero-layer="nav"]'], {
        autoAlpha: 0,
        y: 20,
      });
      gsap.set('[data-hero-layer="utility"]', { autoAlpha: 0, y: 40 });
      gsap.set('[data-hero-layer="media"]', { autoAlpha: 0, y: -250 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(['[data-hero-layer="identity"]', '[data-hero-layer="nav"]'], {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.05,
      })
        .addLabel("sync")
        .to(
          '[data-hero-layer="utility"]',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
          },
          "sync",
        )
        .to(
          '[data-hero-layer="media"]',
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
          },
          "sync",
        );
    }, rootRef);

    return () => context.revert();
  }, [pathname]);

  return (
    <section ref={rootRef} className="koi-hero-interface">
      {mediaType === "video" ? (
        <video className="koi-hero-bg" autoPlay loop muted playsInline>
          <source src={desktopMedia} type="video/mp4" />
        </video>
      ) : (
        <picture className="koi-hero-picture" aria-hidden="true">
          <source media="(max-width: 539px)" srcSet={mobileMedia} />
          <source media="(max-width: 1023px)" srcSet={tabletMedia} />
          <img
            src={desktopMedia}
            alt=""
            className="koi-hero-bg"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      )}
      <div className="koi-hero-shade" />

      <div className="koi-hero-stack">
        <Link
          href="/"
          className="koi-identity-card"
          data-hero-layer="identity"
          aria-label={t("common.brandHome")}
        >
          <KoiLogoMark priority className="koi-identity-logo" sizes="200px" />
          <div className="koi-identity-text">
            <h1 className="koi-identity-title">{t("hero.title")}</h1>
            <p className="koi-identity-meta">{t("hero.meta")}</p>
          </div>
        </Link>

        {!hideNav && (
          <nav className="koi-hero-nav" data-hero-layer="nav">
            {resolvedNavigation.map((item) => {
              const isActive = pathname === item.href;
              const key = navKeyByLabel[item.label] ?? item.label.toLowerCase();
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`koi-nav-pill ${isActive ? "koi-nav-pill--active" : ""}`}
                >
                  {t(`navigation.${key}`)}
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      <figure className="koi-media-card" data-hero-layer="media">
        <img
          src={bottomImage}
          alt={localizedPageTitle ?? ""}
          className="koi-media-image"
          loading="eager"
          decoding="async"
        />
        <div className="koi-media-overlay" />
        <figcaption className="koi-media-caption">
          <span className="koi-media-subtitle">{localizedPageCaption}</span>
          <h2 className="koi-media-title">{localizedPageTitle}</h2>
        </figcaption>
      </figure>

      <aside className="koi-utilities-cluster" data-hero-layer="utility">
        <div className="koi-utilities-pill">
          <div
            className="koi-lang-group"
            aria-label={t("common.languageOptions")}
          >
            {languages.map((lang) => (
              <Link
                key={lang.code}
                className={`koi-lang-btn ${locale === lang.code ? "koi-lang-btn--active" : ""}`}
                href={switchHref}
                locale={lang.code}
                aria-label={t(`common.${lang.labelKey}`)}
              >
                {lang.code.toUpperCase()}
              </Link>
            ))}
          </div>

          <div className="koi-divider" />

          <div className="koi-social-group">
            {site.socials.map((social) => (
              <Link
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="koi-social-btn"
                aria-label={social.label}
              >
                <SocialBrandIcon
                  platform={social.platform}
                  className="koi-hero-social-icon"
                />
              </Link>
            ))}
          </div>
        </div>
      </aside>

      <style>{`
        .koi-hero-interface {
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          overflow: hidden;
          background: #050403;
          isolation: isolate;
        }

        .koi-hero-picture {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: block;
          overflow: hidden;
        }

        .koi-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
        }

        .koi-hero-shade {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(circle at 24% 18%, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.52) 100%);
          pointer-events: none;
        }

        .koi-hero-stack {
          position: absolute;
          left: clamp(2rem, 12vw, 11.5rem);
          top: 1.1rem;
          z-index: 20;
          display: flex;
          width: 400px;
          flex-direction: column;
        }

        .koi-identity-card {
          position: relative;
          z-index: 20;
          display: flex;
          width: 388px;
          height: 358px;
          flex-direction: column;
          gap: 1.2rem;
          padding: 1.75rem;
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.92);
          color: #111;
          text-decoration: none;
          box-shadow: 0 24px 48px rgba(0,0,0,0.15);
          backdrop-filter: blur(16px);
          transition: transform 0.3s ease;
        }

        .koi-identity-card:active {
          transform: scale(0.98);
        }

        .koi-identity-logo {
          display: inline-flex;
          width: min(12.5rem, 100%);
          height: auto;
          block-size: auto;
          flex: 0 0 auto;
          overflow: visible;
        }

        .koi-identity-logo .koi-logo-mark__image {
          display: block;
          width: 100% !important;
          height: auto !important;
          max-width: 100%;
          object-fit: contain;
          object-position: left center;
        }

        .koi-identity-text {
          position: absolute;
          top: 120px;
          left: 25px;
          right: 25px;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .koi-identity-title {
          margin: 0;
          color: #111;
          font-family: var(--font-display);
          font-size: clamp(3.25rem, 4.2vw, 4rem);
          font-weight: 600;
          letter-spacing: -0.035em;
          line-height: 0.98;
          overflow-wrap: anywhere;
          text-wrap: balance;
        }

        .koi-identity-meta {
          margin: 4.35rem 0 0;
          color: #524e4e;
          font-family: var(--font-label);
          font-size: 0.52rem;
          font-weight: 760;
          letter-spacing: 0.095em;
          line-height: 1.45;
          max-width: 19rem;
          text-transform: uppercase;
          text-wrap: balance;
        }

        [data-koi-locale="zu"] .koi-identity-title,
        [data-koi-locale="st"] .koi-identity-title {
          max-width: 20.75rem;
          letter-spacing: -0.052em;
          line-height: 0.9;
        }

        [data-koi-locale="zu"] .koi-identity-title {
          font-size: clamp(2.4rem, 8.2vw, 2.82rem);
        }

        [data-koi-locale="st"] .koi-identity-title {
          font-size: clamp(2.58rem, 3.35vw, 3rem);
        }

        [data-koi-locale="zu"] .koi-identity-meta,
        [data-koi-locale="st"] .koi-identity-meta {
          max-width: 20.75rem;
          margin-top: 6.95rem;
          font-size: 0.57rem;
          letter-spacing: 0.052em;
          line-height: 1.36;
        }

        .koi-hero-nav {
          position: relative;
          z-index: 20;
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
          width: 388px;
          margin-top: 0.3rem;
        }

        .koi-nav-pill {
          width: auto;
          padding: 0.3rem 1.25rem;
          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.85);
          color: #111;
          font-family: var(--font-label);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-decoration: none;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
          transition: all 300ms ease-out;
        }

        .koi-nav-pill:hover {
          border-color: #111;
          background: #111;
          color: #fff;
        }

        .koi-nav-pill:active {
          transform: scale(0.94);
        }

        .koi-nav-pill--active {
          border-color: #fff;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .koi-media-card {
          position: absolute;
          left: clamp(2rem, 12vw, 11.5rem);
          top: 445px;
          z-index: 40;
          width: 390px;
          height: 220px;
          margin: 0;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }

        .koi-media-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
        }

        .koi-media-overlay {
          position: absolute;
          inset: 0;
          background: transparent;
        }

        .koi-media-caption {
          position: absolute;
          right: 1.25rem;
          bottom: 1.25rem;
          left: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .koi-media-subtitle {
          color: rgba(255,255,255,0.7);
          font-family: var(--font-label);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .koi-media-title {
          margin: 0;
          color: #fff;
          font-family: var(--font-display);
          font-size: 1.35rem;
          letter-spacing: -0.01em;
          line-height: 1.1;
          text-wrap: balance;
        }

        .koi-utilities-cluster {
          position: absolute;
          left: clamp(2rem, 12vw, 11.5rem);
          bottom: 0;
          z-index: 20;
        }

        .koi-utilities-pill {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.1rem 0.6rem;
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 12px 36px rgba(0,0,0,0.15);
          backdrop-filter: blur(12px);
        }

        .koi-lang-group,
        .koi-social-group {
          display: flex;
          align-items: center;
          gap: 0.15rem;
        }

        .koi-divider {
          width: 1px;
          height: 1.25rem;
          background: rgba(0,0,0,0.15);
        }

        .koi-lang-btn,
        .koi-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 9999px;
          background: transparent;
          color: #333;
          cursor: pointer;
          text-decoration: none;
          transition: all 250ms ease;
        }

        .koi-lang-btn {
          padding: 0.25rem 0.5rem;
          font-family: var(--font-label);
          font-size: 0.55rem;
          font-weight: 700;
        }

        .koi-social-btn {
          width: 1.75rem;
          height: 1.75rem;
        }

        .koi-hero-social-icon,
        .koi-social-btn svg {
          width: 14px;
          height: 14px;
        }

        .koi-lang-btn:hover,
        .koi-social-btn:hover {
          background: rgba(0,0,0,0.05);
          color: #000;
        }

        .koi-lang-btn:active,
        .koi-social-btn:active {
          transform: scale(0.9);
        }

        .koi-lang-btn--active,
        .koi-lang-btn--active:hover {
          background: #111;
          color: #fff;
        }

        @media (max-width: 1023px) {
          .koi-hero-interface {
            min-height: 100svh;
          }

          .koi-hero-shade {
            background: linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.06) 34%, rgba(0,0,0,0.14) 61%, rgba(0,0,0,0.44) 100%);
          }

          .koi-hero-stack {
            left: clamp(0.875rem, 4vw, 2rem);
            top: clamp(0.875rem, 2.4svh, 1.4rem);
            width: min(300px, calc(100vw - 28px));
            transform: none;
          }

          .koi-identity-card {
            width: min(300px, calc(100vw - 28px));
            height: auto;
            min-height: 0;
            gap: 0.5rem;
            padding: 0.8rem 0.85rem 0.75rem;
            border-radius: 14px;
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 14px 34px rgba(0,0,0,0.16);
            backdrop-filter: blur(10px);
          }

          .koi-identity-logo {
            width: min(9.5rem, calc(100vw - 6.5rem));
            max-width: 100%;
          }

          .koi-identity-text {
            position: static;
            gap: 0.35rem;
            width: auto;
          }

          .koi-identity-title {
            max-width: 14rem;
            font-size: clamp(2rem, 11vw, 2.75rem);
            letter-spacing: -0.04em;
            line-height: 0.92;
          }

          .koi-identity-meta {
            max-width: 15rem;
            margin-top: 0.55rem;
            font-size: 0.46rem;
            letter-spacing: 0.12em;
            line-height: 1.45;
          }

          [data-koi-locale="zu"] .koi-identity-title,
          [data-koi-locale="st"] .koi-identity-title {
            max-width: 14.4rem;
            letter-spacing: -0.047em;
            line-height: 0.95;
          }

          [data-koi-locale="zu"] .koi-identity-title {
            font-size: clamp(1.5rem, 7.6vw, 1.96rem);
          }

          [data-koi-locale="st"] .koi-identity-title {
            font-size: clamp(1.6rem, 8vw, 2.06rem);
          }

          [data-koi-locale="zu"] .koi-identity-meta,
          [data-koi-locale="st"] .koi-identity-meta {
            max-width: 14.35rem;
            margin-top: 0.44rem;
            font-size: 0.37rem;
            letter-spacing: 0.062em;
            line-height: 1.34;
          }

          .koi-hero-nav {
            width: min(300px, calc(100vw - 28px));
            gap: 0.22rem;
            margin-top: 0.42rem;
          }

          .koi-nav-pill {
            padding: 0.22rem 0.55rem;
            border-radius: 7px;
            font-size: 0.48rem;
            letter-spacing: 0.11em;
          }

          .koi-media-card {
            left: clamp(0.875rem, 4vw, 2rem);
            right: auto;
            top: auto;
            bottom: calc(4.75rem + env(safe-area-inset-bottom));
            width: min(300px, calc(100vw - 28px));
            height: clamp(108px, 17svh, 138px);
            border-radius: 14px;
            box-shadow: 0 18px 42px rgba(0,0,0,0.34);
          }

          .koi-media-image {
            object-position: center 52%;
          }

          .koi-media-caption {
            right: 0.8rem;
            bottom: 0.75rem;
            left: 0.8rem;
            gap: 0.08rem;
          }

          .koi-media-subtitle {
            font-size: 0.47rem;
            letter-spacing: 0.14em;
          }

          .koi-media-title {
            font-size: clamp(1rem, 5.2vw, 1.24rem);
            line-height: 1;
          }

          .koi-utilities-cluster {
            left: clamp(0.875rem, 4vw, 2rem);
            bottom: calc(0.75rem + env(safe-area-inset-bottom));
            transform: none;
          }

          .koi-utilities-pill {
            gap: 0.45rem;
            padding: 0.28rem 0.38rem;
            border-radius: 11px;
            background: rgba(255,255,255,0.9);
          }

          .koi-lang-group,
          .koi-social-group {
            gap: 0.08rem;
          }

          .koi-lang-btn {
            padding: 0.2rem 0.36rem;
            font-size: 0.48rem;
          }

          .koi-social-btn {
            width: 1.42rem;
            height: 1.42rem;
          }

          .koi-hero-social-icon,
          .koi-social-btn svg {
            width: 12px;
            height: 12px;
          }
        }


        @media (max-width: 380px) {
          .koi-identity-card {
            padding-inline: 0.78rem;
          }

          .koi-identity-logo {
            width: min(9rem, calc(100vw - 6rem));
          }
        }

        @media (max-width: 340px) {
          .koi-identity-logo {
            width: min(8.5rem, calc(100vw - 5.7rem));
          }
        }
        @media (min-width: 540px) and (max-width: 1023px) {
          .koi-hero-stack,
          .koi-identity-card,
          .koi-hero-nav,
          .koi-media-card {
            width: min(340px, calc(100vw - 48px));
          }

          .koi-identity-card {
            padding: 1rem;
          }

          .koi-identity-logo {
            width: min(10.5rem, 48vw);
          }

          .koi-identity-title {
            font-size: clamp(2.45rem, 7vw, 3.2rem);
          }

          [data-koi-locale="zu"] .koi-identity-title,
          [data-koi-locale="st"] .koi-identity-title {
            max-width: 17rem;
            line-height: 0.96;
          }

          [data-koi-locale="zu"] .koi-identity-title {
            font-size: clamp(2rem, 5vw, 2.42rem);
          }

          [data-koi-locale="st"] .koi-identity-title {
            font-size: clamp(2.08rem, 5.2vw, 2.56rem);
          }

          [data-koi-locale="zu"] .koi-identity-meta,
          [data-koi-locale="st"] .koi-identity-meta {
            max-width: 16.7rem;
            margin-top: 0.52rem;
            font-size: 0.4rem;
            letter-spacing: 0.072em;
            line-height: 1.34;
          }

          .koi-nav-pill {
            padding: 0.28rem 0.72rem;
            font-size: 0.52rem;
          }

          .koi-media-card {
            height: clamp(128px, 19svh, 164px);
            bottom: calc(5.2rem + env(safe-area-inset-bottom));
          }
        }

        @media (max-width: 360px) {
          .koi-hero-stack,
          .koi-identity-card,
          .koi-hero-nav,
          .koi-media-card {
            width: calc(100vw - 24px);
          }

          .koi-hero-stack,
          .koi-media-card,
          .koi-utilities-cluster {
            left: 0.75rem;
          }

          .koi-identity-card {
            padding: 0.72rem;
          }

          .koi-identity-logo {
            width: 8.75rem;
          }

          .koi-identity-title {
            font-size: clamp(1.82rem, 10vw, 2.2rem);
          }

          [data-koi-locale="zu"] .koi-identity-title,
          [data-koi-locale="st"] .koi-identity-title {
            max-width: 13rem;
            line-height: 0.95;
          }

          [data-koi-locale="zu"] .koi-identity-title {
            font-size: clamp(1.42rem, 7.8vw, 1.72rem);
          }

          [data-koi-locale="st"] .koi-identity-title {
            font-size: clamp(1.5rem, 8.2vw, 1.82rem);
          }

          [data-koi-locale="zu"] .koi-identity-meta,
          [data-koi-locale="st"] .koi-identity-meta {
            max-width: 13.2rem;
            margin-top: 0.34rem;
            font-size: 0.34rem;
            letter-spacing: 0.055em;
            line-height: 1.28;
          }

          .koi-nav-pill {
            padding: 0.2rem 0.45rem;
            font-size: 0.45rem;
          }

          .koi-media-card {
            height: 104px;
          }

          .koi-media-image {
            object-position: center 48%;
          }
        }
      `}</style>
    </section>
  );
}
