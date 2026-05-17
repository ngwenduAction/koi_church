"use client";

export default function BlogArticleError({ reset }: { reset: () => void }) {
  return (
    <section className="blog-journal-page">
      <div className="lessons-empty" role="alert">
        <p>The journal article could not be loaded.</p>
        <button className="lesson-filter-chip is-active" type="button" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </section>
  );
}
