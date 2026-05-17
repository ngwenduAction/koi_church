"use client";

export default function LessonReaderError({ reset }: { reset: () => void }) {
  return (
    <section className="lesson-reader-page">
      <div className="lessons-empty" role="alert">
        <p>The lesson reader could not be prepared.</p>
        <button className="lesson-filter-chip is-active" type="button" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </section>
  );
}
