import { primaryNavigation } from "../../../content/navigation";
import { KoiWordmark } from "../../brand/components/KoiWordmark";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="site-header__brand" href="/" aria-label="Kingdom of Israel home">
        <KoiWordmark />
      </a>
      <nav className="site-header__nav" aria-label="Primary navigation">
        {primaryNavigation.map((item) =>
          item.active ? (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ) : (
            <span key={item.href} aria-disabled="true">
              {item.label}
            </span>
          ),
        )}
      </nav>
    </header>
  );
}
