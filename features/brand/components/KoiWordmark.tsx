type WordmarkProps = {
  withSuffix?: boolean;
};

export function Wordmark({ withSuffix = true }: WordmarkProps) {
  return (
    <span className="koi-wordmark" aria-label="Israel of God">
      <span className="koi-wordmark__name">Israel of God</span>
      {withSuffix && <span className="koi-wordmark__suffix">IOG</span>}
    </span>
  );
}

export function Monogram() {
  return (
    <span className="koi-monogram" aria-label="IOG">
      IOG
    </span>
  );
}
