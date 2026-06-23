"use client";

import {useLocale, useTranslations} from "next-intl";
import {type CSSProperties, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {primaryNavigation} from "../../../content/navigation";
import {site} from "../../../content/site";
import type {Locale} from "../../../i18n/routing";
import {Link, usePathname} from "../../../i18n/navigation";
import {SocialBrandIcon} from "./SocialBrandIcon";

type MobileNavProps = {
  isVisible?: boolean;
};

const koiBlack = "var(--color-Black-Chocolate, #211c13)";
const koiGoldDeep = "var(--color-bronze-deep, #6f542b)";

const navKeyByLabel: Record<string, string> = {
  Home: "home",
  Lessons: "lessons",
  Visit: "visit",
  Giving: "giving",
  Blog: "blog",
  Contact: "contact",
};

const languages: Array<{code: Locale; labelKey: "english" | "zulu" | "sesotho"}> = [
  {code: "en", labelKey: "english"},
  {code: "zu", labelKey: "zulu"},
  {code: "st", labelKey: "sesotho"},
];

const triggerWrapStyle: CSSProperties = {
  position: "relative",
  display: "block",
};

const triggerButtonStyle: CSSProperties = {
  display: "flex",
  width: "3.55rem",
  height: "3.55rem",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgba(255,255,255,0.24)",
  borderRadius: "999px",
  background: koiBlack,
  color: "#ffffff",
  boxShadow: "0 22px 48px rgba(0,0,0,0.3)",
  cursor: "pointer",
  outline: "none",
  padding: 0,
  transition: "background 220ms ease, box-shadow 220ms ease",
};

const iconStyle: CSSProperties = {
  display: "flex",
  width: "1.55rem",
  height: "1.05rem",
  flexDirection: "column",
  justifyContent: "space-between",
};

const iconLineStyle: CSSProperties = {
  display: "block",
  width: "100%",
  height: "2px",
  background: "currentColor",
};

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  background: "rgba(0, 0, 0, 0.64)",
  backdropFilter: "blur(1px)",
};

const backdropButtonStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  border: 0,
  background: "transparent",
  cursor: "default",
};

const panelStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 1001,
  display: "flex",
  width: "min(324px, 100vw)",
  flexDirection: "column",
  background: koiBlack,
  color: "#ffffff",
  padding: "4rem 2rem 2.45rem",
  boxShadow: "-32px 0 90px rgba(0,0,0,0.36)",
};

const closeButtonStyle: CSSProperties = {
  position: "absolute",
  top: "1.05rem",
  right: "1.05rem",
  display: "flex",
  width: "2.6rem",
  height: "2.6rem",
  alignItems: "center",
  justifyContent: "center",
  border: 0,
  background: "transparent",
  color: "#ffffff",
  cursor: "pointer",
  padding: 0,
};

const closeLineBase: CSSProperties = {
  position: "absolute",
  display: "block",
  width: "2.05rem",
  height: "2px",
  background: "currentColor",
};

const navStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.1rem",
  paddingTop: "0.5rem",
};

const linkStyle: CSSProperties = {
  color: "#ffffff",
  fontFamily: "var(--font-body)",
  fontSize: "1.32rem",
  fontWeight: 500,
  lineHeight: 1.1,
  textDecoration: "none",
  transition: "color 180ms ease, transform 180ms ease",
};

const activeLinkStyle: CSSProperties = {
  color: koiGoldDeep,
};

const footerStyle: CSSProperties = {
  marginTop: "auto",
};

const socialsStyle: CSSProperties = {
  display: "flex",
  gap: "0.75rem",
  marginBottom: "2.1rem",
};

const socialLinkStyle: CSSProperties = {
  display: "flex",
  width: "2.15rem",
  height: "2.15rem",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  background: "#ffffff",
  color: "#111111",
  textDecoration: "none",
};

const socialIconStyle: CSSProperties = {
  width: "1rem",
  height: "1rem",
};

const languageStyle: CSSProperties = {
  display: "flex",
  gap: "0.65rem",
  color: "#ffffff",
  fontFamily: "var(--font-body)",
  fontSize: "0.92rem",
  lineHeight: 1,
};

export function MobileNav({isVisible = true}: MobileNavProps) {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setIsOpen(false);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const drawer =
    mounted && isOpen
      ? createPortal(
          <div ref={drawerRef} id="side-navigation" role="dialog" aria-modal="true" style={overlayStyle}>
            <button
              type="button"
              aria-label={t("common.closeNavigation")}
              style={backdropButtonStyle}
              onClick={() => setIsOpen(false)}
              tabIndex={-1}
            />

            <aside style={panelStyle}>
              <button ref={closeButtonRef} type="button" style={closeButtonStyle} onClick={() => setIsOpen(false)} aria-label={t("common.closeNavigation")}>
                <span style={{...closeLineBase, transform: "rotate(45deg)"}} />
                <span style={{...closeLineBase, transform: "rotate(-45deg)"}} />
              </button>

              <nav style={navStyle} aria-label={t("common.sideNavigation")}>
                {primaryNavigation.map((item) => {
                  const active = pathname === item.href;
                  const key = navKeyByLabel[item.label] ?? item.label.toLowerCase();

                  return item.active ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      style={{...linkStyle, ...(active ? activeLinkStyle : null)}}
                      onMouseEnter={(event) => {
                        event.currentTarget.style.color = koiGoldDeep;
                        event.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(event) => {
                        event.currentTarget.style.color = active ? koiBlack : "#ffffff";
                        event.currentTarget.style.transform = "translateX(0)";
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {t(`navigation.${key}`)}
                    </Link>
                  ) : (
                    <span key={item.href} aria-disabled="true" style={{...linkStyle, color: "rgba(255,255,255,0.32)"}}>
                      {t(`navigation.${key}`)}
                    </span>
                  );
                })}
              </nav>

              <footer style={footerStyle}>
                <div style={socialsStyle}>
                  {site.socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      style={socialLinkStyle}
                    >
                      <SocialBrandIcon platform={social.platform} className="koi-menu-social-icon" />
                    </a>
                  ))}
                </div>
                <div style={languageStyle} aria-label={t("common.languageOptions")}>
                  {languages.map((language) => (
                    <Link key={language.code} href={pathname} locale={language.code} style={{color: locale === language.code ? koiGoldDeep : "#ffffff", textDecoration: "none"}}>
                      {t(`common.${language.labelKey}`)}
                    </Link>
                  ))}
                </div>
              </footer>
            </aside>
            <style>{`.koi-menu-social-icon { width: ${socialIconStyle.width}; height: ${socialIconStyle.height}; }`}</style>
          </div>,
          document.body,
        )
      : null;

  return (
    <div style={triggerWrapStyle}>
      <button
        style={triggerButtonStyle}
        type="button"
        aria-expanded={isOpen}
        aria-controls="side-navigation"
        aria-label={t("common.openNavigation")}
        onClick={() => setIsOpen(true)}
        onMouseEnter={(event) => {
          event.currentTarget.style.background = koiGoldDeep;
          event.currentTarget.style.color = "#ffffff";
          event.currentTarget.style.boxShadow = "0 26px 54px rgba(0,0,0,0.34)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.background = koiBlack;
          event.currentTarget.style.color = "#ffffff";
          event.currentTarget.style.boxShadow = "0 22px 48px rgba(0,0,0,0.3)";
        }}
      >
        <span aria-hidden="true" style={iconStyle}>
          <span style={iconLineStyle} />
          <span style={iconLineStyle} />
          <span style={iconLineStyle} />
        </span>
      </button>
      {drawer}
    </div>
  );
}
