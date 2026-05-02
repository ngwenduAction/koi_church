"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { primaryNavigation } from "../../../content/navigation";

export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  return (
    <div className="site-navigation">
      <nav className="site-header__nav" aria-label="Primary navigation">
        {primaryNavigation.map((item) => {
          const active = pathname === item.href;

          return item.active ? (
            <a key={item.href} href={item.href} aria-current={active ? "page" : undefined}>
              {item.label}
            </a>
          ) : (
            <span key={item.href} aria-disabled="true">
              {item.label}
            </span>
          );
        })}
      </nav>

      <button
        className="mobile-nav-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label="Open navigation"
        onClick={() => setIsOpen(true)}
      >
        <span className="mobile-nav-toggle__label">Menu</span>
        <span aria-hidden="true" className="mobile-nav-toggle__icon" />
      </button>

      {isOpen && (
        <div className="mobile-nav" id="mobile-navigation" role="dialog" aria-modal="true" ref={drawerRef}>
          <div className="mobile-nav__bar">
            <span className="mobile-nav__title">Kingdom of Israel</span>
            <button ref={closeButtonRef} type="button" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
          <nav className="mobile-nav__links" aria-label="Mobile navigation">
            {primaryNavigation.map((item) => {
              const active = pathname === item.href;

              return item.active ? (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <span key={item.href} aria-disabled="true">
                  {item.label}
                </span>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
