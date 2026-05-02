import { site } from "./site";

export const homeContent = {
  hero: {
    eyebrow: "Sabbath study house",
    title: "Kingdom of Israel",
    statement: site.description,
    primaryCta: { label: "Explore Lessons", href: "/lessons" },
    secondaryCta: { label: "Plan a Visit", href: "/visit" },
  },
  sabbathRhythm: {
    eyebrow: "Weekly Sabbath",
    title: "We gather on the seventh day to study the scriptures.",
    body:
      "KOI meets each Sabbath for ordered bible study, reading doctrine through the law, the prophets, Christ, and the apostles.",
    link: { label: "Plan your visit", href: "/visit" },
  },
  foundation: {
    eyebrow: "Foundation",
    title: "Built on the testimony of Christ, the prophets, and the apostles.",
    body:
      "KOI is a Sabbath bible study community teaching the uncut word of God according to the prophets and the apostles. We observe the Lord's Sabbath, the feast days of Leviticus 23, the dietary law of Leviticus 11, and the royal law of the Ten Commandments.",
    pillars: [
      "The God of Israel",
      "Jesus Christ, the cornerstone",
      "The prophets and apostles",
    ],
  },
  lessons: {
    eyebrow: "Lessons",
    title: "Study materials in English, IsiZulu, and Sesotho.",
    body: "Doctrinal study materials prepared in English, IsiZulu, and Sesotho.",
  },
};