import type { Feast } from "../../../content/feasts";

export type FeastSeason = "spring" | "fall";

export type GroupedFeasts = Record<FeastSeason, Feast[]>;

export function groupBySeason(feasts: Feast[]): GroupedFeasts {
  return feasts.reduce<GroupedFeasts>(
    (groups, feast) => {
      groups[feast.season].push(feast);
      return groups;
    },
    { spring: [], fall: [] },
  );
}

type FormatOptions = {
  includeYear?: boolean;
};

export function formatFeastDate(dateISO: string, options: FormatOptions = {}) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: options.includeYear ? "numeric" : undefined,
    timeZone: "UTC",
  }).format(new Date(`${dateISO}T00:00:00Z`));
}