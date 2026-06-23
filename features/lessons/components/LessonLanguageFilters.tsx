"use client";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { lessonLanguageOptions, type LessonLanguage } from "../types";

type LessonLanguageFiltersProps = {
  activeLanguage: "all" | LessonLanguage;
};

export function LessonLanguageFilters({ activeLanguage }: LessonLanguageFiltersProps) {
  const t = useTranslations("lessons");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateLanguage(language: "all" | LessonLanguage) {
    const params = new URLSearchParams(searchParams.toString());

    if (language === "all") {
      params.delete("lang");
    } else {
      params.set("lang", language);
    }

    const query = params.toString();

    startTransition(() => {
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  }

  return (
    <div className="lesson-filter-bar" aria-label={t("filtersLabel")}>
      <div className="lesson-filter-list" role="toolbar" aria-label={t("filtersLabel")}>
        <button
          className={`lesson-filter-chip${activeLanguage === "all" ? " is-active" : ""}`}
          type="button"
          aria-pressed={activeLanguage === "all"}
          onClick={() => updateLanguage("all")}
        >
          {t("all")}
        </button>
        {lessonLanguageOptions.map((language) => (
          <button
            className={`lesson-filter-chip${activeLanguage === language ? " is-active" : ""}`}
            type="button"
            key={language}
            aria-pressed={activeLanguage === language}
            onClick={() => updateLanguage(language)}
          >
            {t(`languageNames.${language}`)}
          </button>
        ))}
      </div>
    </div>
  );
}


