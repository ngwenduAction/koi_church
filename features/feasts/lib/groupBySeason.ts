import type { Feast } from "../../../content/feasts";

export type FeastSeason = "spring" | "fall";

export type GroupedFeasts<T extends Feast = Feast> = Record<FeastSeason, T[]>;

export function groupBySeason<T extends Feast>(feasts: T[]): GroupedFeasts<T> {
  return feasts.reduce<GroupedFeasts<T>>(
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
