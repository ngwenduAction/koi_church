import { homeContent } from "../../../content/home";
import { lessonVariants } from "../../../content/lessons";
import { Button } from "../../../shared/components/Button";

export function LessonsPreview() {
  const featuredLessons = lessonVariants.filter((lesson) => lesson.featured);

  return (
    <article className="surface-panel preview-card">
      <p className="section-kicker">{homeContent.lessons.eyebrow}</p>
      <h2>{homeContent.lessons.title}</h2>
      <p>{homeContent.lessons.body}</p>
      <div className="language-row">
        {featuredLessons.map((lesson) => (
          <span key={lesson.id} className="metadata-pill">
            {lesson.language.toUpperCase()}
          </span>
        ))}
      </div>
      <Button href="/lessons" variant="quiet">
        Open Lesson Library
      </Button>
    </article>
  );
}