import Link from "next/link";
import { KoiLogoMark } from "../../brand/components/KoiLogoMark";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner site-header__inner--brand-led">
        <Link className="site-header__brand site-header__brand--dominant" href="/" aria-label="Kingdom of Israel home">
          <KoiLogoMark className="site-header__brand-mark" priority sizes="(max-width: 767px) 176px, 240px" />
        </Link>
        <MobileNav />
      </div>
    </header>
  );
}
