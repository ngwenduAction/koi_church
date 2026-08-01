import Image from "next/image";

type KoiLogoMarkProps = {
  priority?: boolean;
  className?: string;
  sizes?: string;
  tone?: "dark" | "light";
};

export function KoiLogoMark({
  priority = false,
  className = "",
  sizes = "(max-width: 767px) 176px, 240px",
  tone = "dark",
}: KoiLogoMarkProps) {
  const isLight = tone === "light";

  return (
    <span className={`koi-logo-mark ${className}`.trim()}>
      <Image
        src={isLight ? "/KOI_logo/cropped-IOG-LOGO-WHITE-T.png" : "/KOI_logo/iog_logo_b_trans.png"}
        alt="Israel of God"
        width={isLight ? 512 : 800}
        height={isLight ? 512 : 150}
        priority={priority}
        sizes={sizes}
        className="koi-logo-mark__image"
      />
    </span>
  );
}