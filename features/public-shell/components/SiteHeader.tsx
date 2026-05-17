import Link from "next/link";
import { KoiLogoMark } from "../../brand/components/KoiLogoMark";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-header__brand" href="/" aria-label="Kingdom of Israel home">
          <KoiLogoMark className="site-header__brand-mark" priority sizes="(max-width: 767px) 76px, 112px" />
        </Link>
        <MobileNav />
      </div>
    </header>
  );
}
