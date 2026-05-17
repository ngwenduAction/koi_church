import Image from "next/image";

type KoiLogoMarkProps = {
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function KoiLogoMark({
  priority = false,
  className = "",
  sizes = "(max-width: 767px) 176px, 240px",
}: KoiLogoMarkProps) {
  return (
    <span className={`koi-logo-mark ${className}`.trim()}>
      <Image
        src="/KOI_logo/koi_logo_b_trans.png"
        alt="Kingdom of Israel"
        width={800}
        height={150}
        priority={priority}
        sizes={sizes}
        className="koi-logo-mark__image"
      />
    </span>
  );
}
