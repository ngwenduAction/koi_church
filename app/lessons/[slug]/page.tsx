import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { lessonVariants } from "../../../content/lessons";
import { LessonReaderClient } from "../../../features/lessons/components/LessonReaderClient";
import { getLessonGroupBySlug, groupLessonVariants } from "../../../features/lessons/lib/library";
import { isLessonLanguage, type LessonLanguage } from "../../../features/lessons/types";
import { Container } from "../../../shared/components/Container";

type LessonReaderPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    lang?: string;
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

export default async function LessonReaderPage({ params, searchParams }: LessonReaderPageProps) {
  const { slug } = await params;
  const query = (await searchParams) ?? {};
  const requestedLanguage = query.lang?.toLowerCase();
  const t = await getTranslations("reader");
  const lesson = getLessonGroupBySlug(lessonVariants, slug);

  if (!lesson) {
    notFound();
  }

  const initialLanguage: LessonLanguage | undefined =
    requestedLanguage && isLessonLanguage(requestedLanguage) && lesson.languages.includes(requestedLanguage)
      ? requestedLanguage
      : undefined;

  return (
    <section className="lesson-reader-page" aria-labelledby="lesson-reader-title">
      <Container className="lesson-reader-page__intro" size="narrow">
        <p className="eyebrow">{t("metadataEyebrow")}</p>
        <h1 id="lesson-reader-title">{lesson.title}</h1>
        <p className="editorial-copy">{t("metadataBody")}</p>
      </Container>

      <Container className="lesson-reader-page__body" size="narrow">
        <LessonReaderClient lesson={lesson} initialLanguage={initialLanguage} />
      </Container>
    </section>
  );
}
