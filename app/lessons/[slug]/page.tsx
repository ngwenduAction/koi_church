import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lessonVariants } from "../../../content/lessons";
import { LessonReaderClient } from "../../../features/lessons/components/LessonReaderClient";
import { getLessonGroupBySlug, groupLessonVariants } from "../../../features/lessons/lib/library";
import { Container } from "../../../shared/components/Container";

type LessonReaderPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return groupLessonVariants(lessonVariants).map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: LessonReaderPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLessonGroupBySlug(lessonVariants, slug);

  if (!lesson) {
    return {
      title: "Lesson Not Found | Kingdom of Israel",
    };
  }

  return {
    title: `${lesson.title} | Kingdom of Israel`,
    description: lesson.summary || `${lesson.title} in the KOI multilingual lesson reader.`,
  };
}

export default async function LessonReaderPage({ params }: LessonReaderPageProps) {
  const { slug } = await params;
  const lesson = getLessonGroupBySlug(lessonVariants, slug);

  if (!lesson) {
    notFound();
  }

  return (
    <section className="lesson-reader-page" aria-labelledby="lesson-reader-title">
      <Container className="lesson-reader-page__intro" size="narrow">
        <p className="eyebrow">Lesson Engine</p>
        <h1 id="lesson-reader-title">{lesson.title}</h1>
        <p className="editorial-copy">
          A protected Sabbath reading surface for lesson documents, verified media, and multilingual study access.
        </p>
      </Container>

      <Container className="lesson-reader-page__body" size="narrow">
        <LessonReaderClient lesson={lesson} />
      </Container>
    </section>
  );
}
