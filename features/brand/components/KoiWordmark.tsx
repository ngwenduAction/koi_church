type WordmarkProps = {
  withSuffix?: boolean;
};

export function Wordmark({ withSuffix = true }: WordmarkProps) {
  return (
    <span className="koi-wordmark" aria-label="Kingdom of Israel">
      <span className="koi-wordmark__name">Kingdom of Israel</span>
      {withSuffix && <span className="koi-wordmark__suffix">KOI</span>}
    </span>
  );
}

export function Monogram() {
  return (
    <span className="koi-monogram" aria-label="KOI">
      KOI
    </span>
  );
}
