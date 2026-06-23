"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

const getNavigationShellBase = (isMobileViewport: boolean): CSSProperties => ({
  position: "fixed",
  right: isMobileViewport ? "0.9rem" : "1.5rem",
  top: isMobileViewport ? "0.9rem" : "1.5rem",
  zIndex: 120,
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 300ms ease, right 300ms ease, top 300ms ease",
});

const getNavigationShellVisible = (isMobileViewport: boolean): CSSProperties => ({
  right: isMobileViewport ? "0.9rem" : "1.5rem",
  top: isMobileViewport ? "0.9rem" : "1.5rem",
  opacity: 1,
  pointerEvents: "auto",
});

export function Navigation() {
  const [showMenuTrigger, setShowMenuTrigger] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateMenuState = () => {
      window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        setIsMobileViewport(window.innerWidth < 1024);

        const heroNavigation = document.querySelector<HTMLElement>('[data-hero-layer="nav"]');

        if (!heroNavigation) {
          setShowMenuTrigger(true);
          return;
        }

        const rect = heroNavigation.getBoundingClientRect();
        const heroNavigationVisible =
          rect.bottom > 0 &&
          rect.top < window.innerHeight &&
          rect.width > 0 &&
          rect.height > 0;

        setShowMenuTrigger(!heroNavigationVisible);
      });
    };

    updateMenuState();
    window.addEventListener("scroll", updateMenuState, { passive: true });
    window.addEventListener("resize", updateMenuState);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateMenuState);
      window.removeEventListener("resize", updateMenuState);
    };
  }, []);

  return (
    <header
      style={{
        ...getNavigationShellBase(isMobileViewport),
        ...(showMenuTrigger ? getNavigationShellVisible(isMobileViewport) : null),
      }}
      aria-hidden={!showMenuTrigger}
    >
      <MobileNav isVisible={showMenuTrigger} />
    </header>
  );
}