"use client";

import { startTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { lessonLanguageLabels, lessonLanguageOptions, type LessonLanguage } from "../types";

type LessonLanguageFiltersProps = {
  activeLanguage: "all" | LessonLanguage;
};

export function LessonLanguageFilters({ activeLanguage }: LessonLanguageFiltersProps) {
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
    <div className="lesson-filter-bar" aria-label="Lesson language filters">
      <div className="lesson-filter-list" role="toolbar" aria-label="Language filters">
        <button
          className={`lesson-filter-chip${activeLanguage === "all" ? " is-active" : ""}`}
          type="button"
          aria-pressed={activeLanguage === "all"}
          onClick={() => updateLanguage("all")}
        >
          All
        </button>
        {lessonLanguageOptions.map((language) => (
          <button
            className={`lesson-filter-chip${activeLanguage === language ? " is-active" : ""}`}
            type="button"
            key={language}
            aria-pressed={activeLanguage === language}
            onClick={() => updateLanguage(language)}
          >
            {lessonLanguageLabels[language]}
          </button>
        ))}
      </div>
    </div>
  );
}
