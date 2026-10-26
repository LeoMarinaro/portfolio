// Data access for projects: the only place pages read projects from the database.
import { cacheLife, cacheTag } from "next/cache";
import type { Prisma, ProjectKind } from "@/generated/prisma/client";
import type { Locale } from "@/i18n/config";
import { prisma } from "@/lib/prisma";

// What the UI needs: shared fields plus the text in one language, flattened
export type ProjectView = {
  slug: string;
  kind: ProjectKind;
  client: string | null;
  stack: string[];
  githubRepo: string | null;
  liveUrl: string | null;
  title: string;
  summary: string;
  description: string;
  learned: string | null;
};

type ProjectWithTranslations = Prisma.ProjectGetPayload<{
  include: { translations: true };
}>;

// Loads only the translation row for the requested language (a JOIN under the hood)
function includeTranslation(locale: Locale) {
  return { translations: { where: { locale } } };
}

// Returns null when the project has no text in this language, so it is skipped
function toView(project: ProjectWithTranslations): ProjectView | null {
  const [text] = project.translations;
  if (!text) return null;
  return {
    slug: project.slug,
    kind: project.kind,
    client: project.client,
    stack: project.stack,
    githubRepo: project.githubRepo,
    liveUrl: project.liveUrl,
    title: text.title,
    summary: text.summary,
    description: text.description,
    learned: text.learned,
  };
}

// "use cache" stores the result so pages stay static instead of querying the
// database on every visit. It is refreshed in the background after an hour,
// and the "projects" tag allows clearing it on demand later.
export async function getProjects(locale: Locale): Promise<ProjectView[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("projects");

  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
    include: includeTranslation(locale),
  });
  return projects.map(toView).filter((p) => p !== null);
}

export async function getFeaturedProjects(locale: Locale): Promise<ProjectView[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("projects");

  const projects = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { sortOrder: "asc" },
    include: includeTranslation(locale),
  });
  return projects.map(toView).filter((p) => p !== null);
}

export async function getProject(locale: Locale, slug: string): Promise<ProjectView | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("projects");

  const project = await prisma.project.findUnique({
    where: { slug },
    include: includeTranslation(locale),
  });
  return project ? toView(project) : null;
}

// Used to pre-render one detail page per project at build time
export async function getProjectSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("projects");

  const projects = await prisma.project.findMany({ select: { slug: true } });
  return projects.map((p) => p.slug);
}
