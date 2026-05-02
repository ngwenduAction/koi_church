import { site } from "./site";

export const homeContent = {
  hero: {
    eyebrow: "Sabbath study house",
    title: "Kingdom of Israel",
    statement: site.description,
    primaryCta: { label: "Explore Lessons", href: "/lessons" },
    secondaryCta: { label: "Plan a Visit", href: "/visit" },
  },
  foundation: {
    eyebrow: "Foundation",
    title: "Built on the testimony of Christ, the prophets, and the apostles.",
    body:
      "KOI teaches according to the God of Israel, Jesus Christ, the prophets, and the apostles. The platform begins with the same discipline: clear doctrine, useful study resources, and trustworthy pathways for those who want to learn.",
    pillars: [
      "The God of Israel",
      "Jesus Christ, the cornerstone",
      "The prophets and apostles",
    ],
  },
  lessons: {
    eyebrow: "Lessons",
    title: "Study materials in English, IsiZulu, and Sesotho.",
    body:
      "The first public product surface is a refined lesson library: clear metadata, language-specific downloads, and a structure ready for weekly growth.",
  },
};
