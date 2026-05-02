import type { Feast } from "../../../content/feasts";

const romanNumerals = ["I.", "II.", "III.", "IV.", "V.", "VI.", "VII.", "VIII.", "IX.", "X."];

export type ObservanceStatus = "past" | "current" | "next" | "upcoming";

export type AnnotatedFeast = Feast & {
  status: ObservanceStatus;
  revealIndex: number;
  ordinal: string | null;
};

function getStartDate(dateISO: string) {
  return new Date(`${dateISO}T18:00:00`);
}

function getEndDate(feast: Feast) {
  if (feast.ends) {
    return new Date(`${feast.ends}T18:00:00`);
  }

  if (feast.begins) {
    const end = getStartDate(feast.begins);
    end.setDate(end.getDate() + 1);
    return end;
  }

  return null;
}

function getHumanLabel(daysUntil: number, status: "current" | "next") {
  if (status === "current" || daysUntil === 0) {
    return "Today";
  }

  if (daysUntil === 1) {
    return "In 1 day";
  }

  return `In ${daysUntil} days`;
}

export function getFeastStatus(feast: Feast, now: Date): ObservanceStatus {
  if (!feast.begins) {
    return "upcoming";
  }

  const start = getStartDate(feast.begins);
  const end = getEndDate(feast);

  if (now < start) {
    return "upcoming";
  }

  if (end && now >= start && now < end) {
    return "current";
  }

  return "past";
}

export function getNextObservance(feasts: Feast[], now: Date) {
  const current = feasts.find((feast) => getFeastStatus(feast, now) === "current");

  if (current?.begins) {
    return {
      feast: current,
      status: "current" as const,
      daysUntil: 0,
      humanLabel: getHumanLabel(0, "current"),
    };
  }

  const next = feasts
    .filter((feast) => feast.begins)
    .filter((feast) => getFeastStatus(feast, now) === "upcoming")
    .sort((left, right) => getStartDate(left.begins!).getTime() - getStartDate(right.begins!).getTime())[0];

  if (!next?.begins) {
    return null;
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysUntil = Math.max(0, Math.ceil((getStartDate(next.begins).getTime() - now.getTime()) / millisecondsPerDay));

  return {
    feast: next,
    status: "next" as const,
    daysUntil,
    humanLabel: getHumanLabel(daysUntil, "next"),
  };
}

export function annotateFeasts(feasts: Feast[], now: Date): AnnotatedFeast[] {
  const nextObservance = getNextObservance(feasts, now);

  return feasts.reduce<{
    items: AnnotatedFeast[];
    feastOrdinal: number;
  }>(
    (accumulator, feast, index) => {
      const baseStatus = getFeastStatus(feast, now);
      const status = nextObservance && nextObservance.feast.id === feast.id ? nextObservance.status : baseStatus;
      const revealIndex = index + 1;

      if (feast.kind === "new-moon") {
        accumulator.items.push({
          ...feast,
          status,
          revealIndex,
          ordinal: null,
        });

        return accumulator;
      }

      const feastOrdinal = accumulator.feastOrdinal + 1;

      accumulator.items.push({
        ...feast,
        status,
        revealIndex,
        ordinal: romanNumerals[feastOrdinal - 1] ?? `${feastOrdinal}.`,
      });

      return {
        items: accumulator.items,
        feastOrdinal,
      };
    },
    { items: [], feastOrdinal: 0 },
  ).items;
}
