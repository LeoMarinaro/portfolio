import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, getLocale } from "@/i18n/server";
import { getProject, getProjectSlugs } from "@/lib/projects";

// Builds one static page per project found in the database at build time
export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(await getLocale(), slug);
  if (!project) return {};
  return {
    title: `${project.title} — Leonardo Marinaro`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = await getDictionary();
  const project = await getProject(locale, slug);

  // Unknown slug (or no text in this language): show the 404 page
  if (!project) notFound();

  const labels = dict.projects;

  return (
    <article className="py-16">
      <Link
        href={`/${locale}/projects`}
        className="text-sm text-muted transition-colors hover:text-accent"
      >
        ← {labels.back}
      </Link>

      <p className="mt-8 font-mono text-sm text-accent">
        {labels.kind[project.kind]}
        {project.client && ` · ${labels.clientLabel}: ${project.client}`}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{project.summary}</p>

      {(project.githubRepo || project.liveUrl) && (
        <ul className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
          {project.githubRepo && (
            <li>
              <a
                href={`https://github.com/LeoMarinaro/${project.githubRepo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center rounded-full border border-border px-4 transition-colors hover:border-accent hover:text-accent"
              >
                {labels.viewCode}
              </a>
            </li>
          )}
          {project.liveUrl && (
            <li>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center rounded-full border border-border px-4 transition-colors hover:border-accent hover:text-accent"
              >
                {labels.viewLive}
              </a>
            </li>
          )}
        </ul>
      )}

      <p className="mt-10 leading-relaxed">{project.description}</p>

      {project.learned && (
        <section aria-labelledby="learned-heading" className="mt-10">
          <h2 id="learned-heading" className="text-xl font-semibold tracking-tight">
            {labels.learnedHeading}
          </h2>
          <p className="mt-3 leading-relaxed">{project.learned}</p>
        </section>
      )}

      <section aria-labelledby="stack-heading" className="mt-10">
        <h2 id="stack-heading" className="text-xl font-semibold tracking-tight">
          {labels.stackLabel}
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-md border border-border px-2.5 py-1 font-mono text-sm">
              {tech}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
