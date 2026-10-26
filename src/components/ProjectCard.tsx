import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/server";
import type { ProjectView } from "@/lib/projects";

type Props = {
  project: ProjectView;
  locale: Locale;
  labels: Dictionary["projects"];
  // h2 on the projects page, h3 on the home page (under the "Featured" h2)
  headingLevel?: "h2" | "h3";
};

export default function ProjectCard({ project, locale, labels, headingLevel = "h3" }: Props) {
  const Heading = headingLevel;

  return (
    <article className="relative flex flex-col rounded-lg border border-border p-5 transition-colors hover:border-accent">
      <p className="font-mono text-xs text-muted">
        {labels.kind[project.kind]}
        {project.client && ` · ${project.client}`}
      </p>
      <Heading className="mt-2 text-lg font-semibold tracking-tight">
        {/* Stretched link: the ::after layer covers the whole card, so it is all
            clickable while screen readers announce only the title */}
        <Link
          href={`/${locale}/projects/${project.slug}`}
          className="after:absolute after:inset-0 focus-visible:outline-none after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-accent"
        >
          {project.title}
        </Link>
      </Heading>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={labels.stackLabel}>
        {project.stack.map((tech) => (
          <li key={tech} className="rounded border border-border px-2 py-0.5 font-mono text-xs">
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}
