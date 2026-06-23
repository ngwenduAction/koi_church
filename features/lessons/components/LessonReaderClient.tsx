"use client";

import { useEffect, useMemo, useState, type SyntheticEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/navigation";
import { MediaBlock } from "../../pages/components/MediaBlock";
import { lessonLanguageOptions, type LessonLanguage } from "../types";
import type { LessonGroup } from "../lib/library";

type LessonReaderClientProps = {
  lesson: LessonGroup;
  initialLanguage?: LessonLanguage;
};

type ReaderMode = "read" | "audio";

function deterCopy(event: SyntheticEvent) {
  event.preventDefault();
}

export function LessonReaderClient({ lesson, initialLanguage }: LessonReaderClientProps) {
  const t = useTranslations("reader");
  const lessonT = useTranslations("lessons");
  const [activeLanguage, setActiveLanguage] = useState<LessonLanguage>(
    initialLanguage ?? lesson.languages[0] ?? "en",
  );
  const [activeMode, setActiveMode] = useState<ReaderMode>("read");

  const activeVariant = useMemo(
    () => lesson.variants.find((variant) => variant.language === activeLanguage) ?? lesson.variants[0],
    [activeLanguage, lesson.variants],
  );

  useEffect(() => {
    document.body.classList.add("lesson-reader-locked");

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && (key === "p" || key === "s" || key === "c")) {
        event.preventDefault();
      }
    };

    const handleBeforePrint = (event: Event) => {
      event.preventDefault?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("beforeprint", handleBeforePrint);

    return () => {
      document.body.classList.remove("lesson-reader-locked");
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("beforeprint", handleBeforePrint);
    };
  }, []);

  if (!activeVariant) {
    return null;
  }

  const hasAudio = Boolean(activeVariant.audioUrl ?? lesson.audioUrl);
  const hasVideo = Boolean(lesson.videoUrl);
  const audioSource = activeVariant.audioUrl ?? lesson.audioUrl;
  const pdfPreviewUrl = `${activeVariant.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`;
  const languageName = lessonT(`languageNames.${activeVariant.language}`);

  return (
    <div className="lesson-reader">
      <header className="lesson-reader__header">
        <div className="lesson-reader__header-top">
          <p className="lesson-row__scripture">{lesson.scriptureReference}</p>
          <ul className="lesson-row__languages" aria-label={t("availableLanguages")}>
            {Array.from(new Set(lesson.languages)).map((language) => (
              <li className="lesson-row__language" key={language}>
                {language.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
        <h1>{activeVariant.title}</h1>
        {activeVariant.summary ? <p className="editorial-copy">{activeVariant.summary}</p> : null}
      </header>

      <div className="lesson-reader__controls">
        <div className="lesson-reader__matrix" role="toolbar" aria-label={t("mediaOptions")}>
          <button
            className={`lesson-reader__matrix-item${activeMode === "read" ? " is-active" : ""}`}
            type="button"
            onClick={() => setActiveMode("read")}
          >
            {t("read")}
          </button>
          {hasVideo ? (
            <a
              className="lesson-reader__matrix-item"
              href={lesson.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("watchVideo")}
            </a>
          ) : null}
          {hasAudio ? (
            <button
              className={`lesson-reader__matrix-item${activeMode === "audio" ? " is-active" : ""}`}
              type="button"
              onClick={() => setActiveMode("audio")}
            >
              {t("listenAudio")}
            </button>
          ) : null}
        </div>

        <div className="lesson-reader__downloads lesson-reader__downloads--toggle" aria-label={t("languageSelection")}>
          {lessonLanguageOptions
            .filter((language) => lesson.languages.includes(language))
            .map((language) => (
              <button
                className={`lesson-reader__language-pill${language === activeLanguage ? " is-active" : ""}`}
                key={language}
                type="button"
                onClick={() => {
                  setActiveLanguage(language);
                  setActiveMode("read");
                }}
              >
                {language.toUpperCase()}
              </button>
            ))}
        </div>
      </div>

      <section
        className="lesson-reader__content select-none"
        aria-label={t("readingSurface")}
        onContextMenu={deterCopy}
        onCopy={deterCopy}
        onCut={deterCopy}
        onDragStart={deterCopy}
      >
        {activeMode === "audio" && audioSource ? (
          <div className="lesson-reader__audio surface-panel">
            <div className="lesson-reader__panel-head">
              <p className="section-kicker">{t("audioLesson")}</p>
              <h2>{languageName}</h2>
            </div>
            <audio controls preload="none" src={audioSource}>
              {t("browserAudio")}
            </audio>
          </div>
        ) : (
          <div className="lesson-reader__document surface-panel">
            <div className="lesson-reader__panel-head">
              <div>
                <p className="section-kicker">{t("readingDocument")}</p>
                <h2>{activeVariant.title}</h2>
              </div>
              <p className="lesson-reader__protection-note">{t("protectedView")}</p>
            </div>

            <section className="lesson-reader__intro reading-prose">
              <p className="section-kicker">{languageName}</p>
              <p>{activeVariant.readerIntro}</p>
            </section>

            <div className="lesson-reader__movements reading-prose">
              {activeVariant.readerSections.map((section, index) => (
                <div className="lesson-reader__movement" key={`${activeVariant.id}-${section.heading}`}>
                  <section className="teaching-article__section lesson-reader__section">
                    <h3>{section.heading}</h3>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>

                  {lesson.rhythmMedia[index] ? (
                    <MediaBlock
                      aspectRatio={lesson.rhythmMedia[index].aspectRatio ?? "16:9"}
                      description={lesson.rhythmMedia[index].description}
                      imageUrl={lesson.rhythmMedia[index].src}
                      label={lesson.rhythmMedia[index].label}
                    />
                  ) : null}
                </div>
              ))}
            </div>

            {lesson.relatedTeachingSlug ? (
              <p className="lesson-reader__related">
                <Link href={`/teachings/${lesson.relatedTeachingSlug}`}>{t("flagship")}</Link>
              </p>
            ) : null}

            <div className="lesson-reader__frame">
              <object data={pdfPreviewUrl} type="application/pdf" aria-label={`${activeVariant.title} ${t("pdfPreview")}`}>
                <div className="lesson-reader__fallback">
                  <p>{t("pdfUnavailable")}</p>
                </div>
              </object>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

