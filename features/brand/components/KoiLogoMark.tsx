import Image from "next/image";

type KoiLogoMarkProps = {
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function KoiLogoMark({
  priority = false,
  className = "",
  sizes = "(max-width: 767px) 72px, 96px",
}: KoiLogoMarkProps) {
  return (
    <span className={`koi-logo-mark ${className}`.trim()}>
      <Image
        src="/KOI_logo/koi_logo_b_trans.png"
        alt="Kingdom of Israel"
        fill
        priority={priority}
        sizes={sizes}
        className="koi-logo-mark__image"
      />
    </span>
  );
}
