import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zu", "st"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
