type KoiWordmarkProps = {
  compact?: boolean;
};

export function KoiWordmark({ compact = false }: KoiWordmarkProps) {
  return (
    <span className="koi-wordmark" aria-label="Kingdom of Israel">
      <span className="koi-wordmark__monogram">KOI</span>
      {!compact && (
        <span className="koi-wordmark__name">
          <span>Kingdom</span>
          <span>of Israel</span>
        </span>
      )}
    </span>
  );
}
