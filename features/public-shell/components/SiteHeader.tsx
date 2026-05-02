import { Wordmark } from "../../brand/components/KoiWordmark";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__brand" href="/" aria-label="Kingdom of Israel home">
          <Wordmark />
        </a>
        <MobileNav />
      </div>
    </header>
  );
}
