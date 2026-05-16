import Image from "next/image";

type KoiLogoMarkProps = {
  priority?: boolean;
  className?: string;
  size?: number;
};

export function KoiLogoMark({ priority = false, className = "", size = 72 }: KoiLogoMarkProps) {
  return (
    <Image
      src="/KOI_logo/koi_logo_b_trans.png"
      alt="Kingdom of Israel"
      className={className}
      width={size}
      height={size}
      priority={priority}
    />
  );
}
