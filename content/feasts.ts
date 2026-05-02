export type Feast = {
  id: string;
  name: string;
  season: "spring" | "fall";
  kind: "feast" | "new-moon" | "service-only";
  begins?: string;
  ends?: string;
  service?: { dateISO: string; timeCT: string; timeET: string };
  note?: string;
};

export const feasts2026: Feast[] = [
  {
    id: "first-month-new-moon",
    name: "1st Month New Moon",
    season: "spring",
    kind: "new-moon",
    begins: "2026-03-19",
    note: "3:25 AM Jerusalem time",
  },
  {
    id: "passover",
    name: "The Passover",
    season: "spring",
    kind: "feast",
    begins: "2026-04-01",
    ends: "2026-04-02",
    service: { dateISO: "2026-04-01", timeCT: "7 PM CT", timeET: "8 PM ET" },
  },
  {
    id: "first-night-unleavened-bread",
    name: "The First Night of the Feast of Unleavened Bread",
    season: "spring",
    kind: "feast",
    begins: "2026-04-02",
    ends: "2026-04-03",
    service: { dateISO: "2026-04-03", timeCT: "12 PM CT", timeET: "1 PM ET" },
  },
  {
    id: "last-night-unleavened-bread",
    name: "The Last Night of the Feast of Unleavened Bread",
    season: "spring",
    kind: "feast",
    begins: "2026-04-08",
    ends: "2026-04-09",
    service: { dateISO: "2026-04-09", timeCT: "12 PM CT", timeET: "1 PM ET" },
  },
  {
    id: "second-passover",
    name: "The Second Passover",
    season: "spring",
    kind: "feast",
    begins: "2026-04-30",
  },
  {
    id: "pentecost",
    name: "The Day of Pentecost",
    season: "spring",
    kind: "feast",
    begins: "2026-05-30",
    ends: "2026-05-31",
    service: { dateISO: "2026-05-31", timeCT: "12 PM CT", timeET: "1 PM ET" },
  },
  {
    id: "seventh-month-new-moon",
    name: "7th Month New Moon",
    season: "fall",
    kind: "new-moon",
    begins: "2026-09-11",
    note: "6:28 AM Jerusalem time",
  },
  {
    id: "trumpets",
    name: "The Memorial of the Blowing of Trumpets",
    season: "fall",
    kind: "feast",
    begins: "2026-09-11",
    ends: "2026-09-12",
    service: { dateISO: "2026-09-12", timeCT: "12 PM CT", timeET: "1 PM ET" },
  },
  {
    id: "atonement",
    name: "The Day of Atonement",
    season: "fall",
    kind: "feast",
    begins: "2026-09-20",
    ends: "2026-09-21",
    service: { dateISO: "2026-09-21", timeCT: "12 PM CT", timeET: "1 PM ET" },
  },
  {
    id: "first-night-tabernacles",
    name: "The First Night of the Feast of Tabernacles",
    season: "fall",
    kind: "feast",
    begins: "2026-09-25",
    ends: "2026-09-26",
    service: { dateISO: "2026-09-26", timeCT: "12 PM CT", timeET: "1 PM ET" },
  },
  {
    id: "eighth-day-feast",
    name: "The Eighth Day Feast",
    season: "fall",
    kind: "feast",
    begins: "2026-10-02",
    ends: "2026-10-03",
    service: { dateISO: "2026-10-03", timeCT: "12 PM CT", timeET: "1 PM ET" },
  },
];