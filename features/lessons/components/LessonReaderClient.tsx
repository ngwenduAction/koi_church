"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { lessonLanguageLabels, type LessonLanguage } from "../types";
import type { LessonGroup } from "../lib/library";

type LessonReaderClientProps = {
  lesson: LessonGroup;
};

type ReaderMode = "read" | "audio";

export function LessonReaderClient({ lesson }: LessonReaderClientProps) {
  const [activeLanguage, setActiveLanguage] = useState<LessonLanguage>(lesson.languages[0] ?? "en");
  const [activeMode, setActiveMode] = useState<ReaderMode>("read");

  const activeVariant = useMemo(
    () => lesson.variants.find((variant) => variant.language === activeLanguage) ?? lesson.variants[0],
    [activeLanguage, lesson.variants],
  );

  useEffect(() => {
    document.body.classList.add("lesson-reader-locked");

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "p") {
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

  return (
    <div className="lesson-reader" onContextMenu={(event) => event.preventDefault()}>
      <header className="lesson-reader__header">
        <div className="lesson-reader__header-top">
          <p className="lesson-row__scripture">{lesson.scriptureReference}</p>
          <ul className="lesson-row__languages" aria-label="Available languages">
            {lesson.languages.map((language) => (
              <li className="lesson-row__language" key={language}>
                {language.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
        <h1>{lesson.title}</h1>
        {lesson.summary ? <p className="editorial-copy">{lesson.summary}</p> : null}
      </header>

      <div className="lesson-reader__controls">
        <div className="lesson-reader__matrix" role="toolbar" aria-label="Lesson media options">
          <button
            className={`lesson-reader__matrix-item${activeMode === "read" ? " is-active" : ""}`}
            type="button"
            onClick={() => setActiveMode("read")}
          >
            Read
          </button>
          {hasVideo ? (
            <a
              className="lesson-reader__matrix-item"
              href={lesson.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Video
            </a>
          ) : null}
          {hasAudio ? (
            <button
              className={`lesson-reader__matrix-item${activeMode === "audio" ? " is-active" : ""}`}
              type="button"
              onClick={() => setActiveMode("audio")}
            >
              Listen Audio
            </button>
          ) : null}
        </div>

        <div className="lesson-reader__downloads" aria-label="Lesson downloads">
          {lesson.variants.map((variant) => (
            <button
              className={`lesson-reader__language-pill${variant.language === activeLanguage ? " is-active" : ""}`}
              key={variant.id}
              type="button"
              onClick={() => {
                setActiveLanguage(variant.language);
                setActiveMode("read");
              }}
            >
              {lessonLanguageLabels[variant.language]}
            </button>
          ))}
        </div>
      </div>

      <section className="lesson-reader__content select-none" aria-label="Lesson reading surface">
        {activeMode === "audio" && audioSource ? (
          <div className="lesson-reader__audio surface-panel">
            <div className="lesson-reader__panel-head">
              <p className="section-kicker">Audio Lesson</p>
              <h2>{lessonLanguageLabels[activeVariant.language]}</h2>
            </div>
            <audio controls preload="none" src={audioSource}>
              Your browser does not support inline audio playback.
            </audio>
          </div>
        ) : (
          <div className="lesson-reader__document surface-panel">
            <div className="lesson-reader__panel-head">
              <div>
                <p className="section-kicker">Reading Document</p>
                <h2>{lessonLanguageLabels[activeVariant.language]}</h2>
              </div>
              <a href={activeVariant.pdfUrl} target="_blank" rel="noopener noreferrer">
                Download PDF
              </a>
            </div>

            {lesson.relatedTeachingSlug ? (
              <p className="lesson-reader__related">
                <Link href={`/teachings/${lesson.relatedTeachingSlug}`}>Open the flagship teaching journal</Link>
              </p>
            ) : null}

            <div className="lesson-reader__frame">
              <object
                data={activeVariant.pdfUrl}
                type="application/pdf"
                aria-label={`${lesson.title} PDF preview in ${lessonLanguageLabels[activeVariant.language]}`}
              >
                <div className="lesson-reader__fallback">
                  <p>The in-browser lesson preview is unavailable on this device.</p>
                  <a href={activeVariant.pdfUrl} target="_blank" rel="noopener noreferrer">
                    Open the lesson PDF
                  </a>
                </div>
              </object>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
