import {useTranslations} from "next-intl";
import {lessonVariants} from "../../../content/lessons";
import {Button} from "../../../shared/components/Button";

export function LessonsPreview() {
  const t = useTranslations("home.lessonsPreview");
  const featuredLessons = lessonVariants.filter((lesson) => lesson.featured);

  return (
    <article className="surface-panel preview-card">
      <p className="section-kicker">{t("eyebrow")}</p>
      <h2>{t("title")}</h2>
      <p>{t("body")}</p>
      <div className="language-row">
        {featuredLessons.map((lesson) => (
          <span key={lesson.id} className="metadata-pill">
            {lesson.language.toUpperCase()}
          </span>
        ))}
      </div>
      <Button href="/lessons" variant="quiet">
        {t("link")}
      </Button>
    </article>
  );
}
