"use client";

import { useMemo, useState } from "react";

type ArticleLanguage = {
  code: "en" | "zu" | "st";
  label: string;
  nativeTitle: string;
  pdfHref: string;
  intro: string;
  sections: readonly {
    heading: string;
    paragraphs: readonly string[];
  }[];
};

type TeachingLanguageReaderProps = {
  languages: readonly ArticleLanguage[];
};

export function TeachingLanguageReader({ languages }: TeachingLanguageReaderProps) {
  const [activeLanguage, setActiveLanguage] = useState<ArticleLanguage["code"]>(languages[0]?.code ?? "en");

  const activeVariant = useMemo(
    () => languages.find((language) => language.code === activeLanguage) ?? languages[0],
    [activeLanguage, languages],
  );

  if (!activeVariant) {
    return null;
  }

  return (
    <div className="teaching-language-reader">
      <div className="teaching-language-reader__header">
        <p className="section-kicker">Reading Language</p>
        <div className="teaching-language-reader__tabs" role="tablist" aria-label="Teaching languages">
          {languages.map((language) => {
            const selected = language.code === activeVariant.code;

            return (
              <button
                key={language.code}
                className="teaching-language-reader__tab"
                role="tab"
                type="button"
                aria-selected={selected}
                onClick={() => setActiveLanguage(language.code)}
              >
                {language.label}
              </button>
            );
          })}
        </div>
      </div>

      <section className="teaching-language-reader__panel" role="tabpanel" aria-label={activeVariant.label}>
        <div className="teaching-language-reader__intro">
          <p className="section-kicker">{activeVariant.label}</p>
          <h2>{activeVariant.nativeTitle}</h2>
          <p>{activeVariant.intro}</p>
        </div>

        {activeVariant.code === "en" ? (
          <blockquote className="scripture-block">
            <p className="scripture-block__eyebrow">Isaiah 8:20</p>
            <p className="scripture-block__text">
              To the law and to the testimony: if they speak not according to this word, it is because there is no
              light in them.
            </p>
          </blockquote>
        ) : null}

        <div className="teaching-language-reader__sections">
          {activeVariant.sections.map((section) => (
            <section key={section.heading} className="teaching-article__section">
              <h3>{section.heading}</h3>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <section className="teaching-pdf-panel" aria-labelledby={`pdf-${activeVariant.code}`}>
          <div className="teaching-pdf-panel__header">
            <p className="section-kicker">Lesson PDF</p>
            <h3 id={`pdf-${activeVariant.code}`}>Full document preview</h3>
            <a href={activeVariant.pdfHref} target="_blank" rel="noopener noreferrer">
              Download PDF
            </a>
          </div>

          <div className="teaching-pdf-panel__frame">
            <object data={activeVariant.pdfHref} type="application/pdf" aria-label={`${activeVariant.nativeTitle} PDF preview`}>
              <div className="teaching-pdf-panel__fallback">
                <p>The in-browser PDF preview is unavailable on this device.</p>
                <a href={activeVariant.pdfHref} target="_blank" rel="noopener noreferrer">
                  Open the lesson PDF
                </a>
              </div>
            </object>
          </div>
        </section>
      </section>
    </div>
  );
}
