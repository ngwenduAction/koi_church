import { formatFeastDate } from "../lib/groupBySeason";
import type { getNextObservance } from "../lib/observanceStatus";

type NextObservanceProps = {
  observance: ReturnType<typeof getNextObservance>;
};

export function NextObservance({ observance }: NextObservanceProps) {
  if (!observance?.feast.begins) {
    return null;
  }

  const label = observance.status === "current" ? "Observing now" : "Next observance";

  return (
    <div className="next-observance" aria-label={label}>
      {observance.status === "current" ? (
        <span className="next-observance__pill">Observing now</span>
      ) : (
        <p className="section-kicker">Next observance</p>
      )}
      <h3>{observance.feast.name}</h3>
      <p className="next-observance__meta">
        <span>{observance.humanLabel}</span>
        <span aria-hidden="true">&middot;</span>
        <time dateTime={observance.feast.begins}>{formatFeastDate(observance.feast.begins)} at sundown</time>
      </p>
      <div className="next-observance__rule" aria-hidden="true" />
    </div>
  );
}
