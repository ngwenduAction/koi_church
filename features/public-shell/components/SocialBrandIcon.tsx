type SocialBrandIconProps = {
  platform: string;
  className?: string;
};

export function SocialBrandIcon({ platform, className = "" }: SocialBrandIconProps) {
  const normalized = platform.toLowerCase();
  const iconClassName = className || undefined;

  if (normalized.includes("instagram")) {
    return (
      <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5.6" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="12" cy="12" r="4.15" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="17.35" cy="6.65" r="1.25" fill="currentColor" />
      </svg>
    );
  }

  if (normalized.includes("youtube")) {
    return (
      <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <path
          d="M21.15 8.05a3.15 3.15 0 0 0-2.22-2.22C16.98 5.32 12 5.32 12 5.32s-4.98 0-6.93.51a3.15 3.15 0 0 0-2.22 2.22A32.6 32.6 0 0 0 2.34 12c0 1.37.17 2.7.51 3.95a3.15 3.15 0 0 0 2.22 2.22c1.95.51 6.93.51 6.93.51s4.98 0 6.93-.51a3.15 3.15 0 0 0 2.22-2.22c.34-1.25.51-2.58.51-3.95 0-1.37-.17-2.7-.51-3.95Z"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinejoin="round"
        />
        <path d="m10.25 8.85 5.05 3.15-5.05 3.15v-6.3Z" fill="currentColor" />
      </svg>
    );
  }

  if (normalized.includes("facebook")) {
    return (
      <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M14.06 8.54V6.7c0-.78.53-.96.9-.96h2.29V2.16L14.1 2.14c-3.5 0-4.3 2.62-4.3 4.3v2.1H7.08v3.93h2.72v9.39h4.26v-9.39h2.9l.46-3.93h-3.36Z" />
      </svg>
    );
  }

  if (normalized.includes("tiktok")) {
    return (
      <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M16.3 2.35c.33 2.35 1.68 3.78 4.05 3.93v3.53a7.3 7.3 0 0 1-4.01-1.18v5.85c0 4.73-5.12 6.2-8.24 4.08-2.02-1.38-2.47-3.85-1.58-5.9a5.42 5.42 0 0 1 5.69-3.14v3.49a3.1 3.1 0 0 0-.76-.1c-2.17 0-3.01 2.94-1.05 4.1 1.26.75 2.87.1 2.87-1.85V2.35h3.03Z" />
      </svg>
    );
  }

  if (normalized === "x" || normalized.includes("twitter")) {
    return (
      <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M13.86 10.47 21.17 2h-1.73l-6.35 7.35L8.02 2H2.17l7.67 11.12L2.17 22h1.73l6.71-7.77L15.98 22h5.85l-7.97-11.53Zm-2.38 2.75-.78-1.11L4.53 3.3h2.66l4.99 7.13.78 1.11 6.48 9.25h-2.66l-5.3-7.57Z" />
      </svg>
    );
  }

  return (
    <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}