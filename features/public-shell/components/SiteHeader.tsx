import Image from "next/image";
import { Wordmark } from "../../brand/components/KoiWordmark";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__brand" href="/" aria-label="Kingdom of Israel home">
          <Image
            src="/KOI_logo/koi_logo_b_trans.png"
            alt=""
            aria-hidden="true"
            className="site-header__brand-mark"
            width={60}
            height={60}
            priority
          />
          <Wordmark />
        </a>
        <MobileNav />
      </div>
    </header>
  );
}
