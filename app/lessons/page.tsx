import { lessonVariants } from "../../content/lessons";
import { Container } from "../../shared/components/Container";

const languageNames = {
  en: "English",
  zu: "IsiZulu",
  st: "Sesotho",
} as const;

export default function LessonsPage() {
  const groupedLessons = lessonVariants.reduce<Record<string, typeof lessonVariants>>((groups, lesson) => {
    groups[lesson.lessonGroupId] = groups[lesson.lessonGroupId] ?? [];
    groups[lesson.lessonGroupId].push(lesson);
    return groups;
  }, {});

  return (
    <section className="lessons-page" aria-labelledby="lessons-title">
      <Container className="lessons-page__intro" size="narrow">
        <p className="eyebrow">Lesson Library</p>
        <h1 id="lessons-title" className="editorial-title">
          Study resources prepared for Sabbath learning.
        </h1>
        <p className="editorial-copy">
          A multilingual document library for KOI lessons in English, IsiZulu, and Sesotho.
          This first version keeps the experience focused: clear titles, language-specific
          files, and direct PDF access.
        </p>
      </Container>

      <Container className="lesson-groups">
        {Object.entries(groupedLessons).map(([groupId, variants]) => {
          const canonical = variants[0];

          return (
            <article className="lesson-group surface-panel" key={groupId}>
              <div className="lesson-group__body">
                <p className="section-kicker">{canonical.category}</p>
                <h2>{canonical.title}</h2>
                <p>{canonical.summary}</p>
              </div>
              <div className="lesson-group__downloads" aria-label={`${canonical.title} downloads`}>
                {variants.map((variant) => (
                  <a className="download-row" href={variant.pdfUrl} key={variant.id}>
                    <span>
                      <strong>{languageNames[variant.language]}</strong>
                    </span>
                    <span aria-hidden="true">Download</span>
                  </a>
                ))}
              </div>
            </article>
          );
        })}
      </Container>
    </section>
  );
}
