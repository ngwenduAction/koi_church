import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-header__brand" href="/" aria-label="Kingdom of Israel home">
          <Image
            src="/KOI_logo/koi_logo_b_trans.png"
            alt="Kingdom of Israel"
            className="site-header__brand-mark"
            width={60}
            height={60}
            priority
          />
        </Link>
        <MobileNav />
      </div>
    </header>
  );
}
