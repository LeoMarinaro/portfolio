import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { getDictionary, getLocale } from "@/i18n/server";
import { getFeaturedProjects } from "@/lib/projects";

export default async function FeaturedProjects() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const projects = await getFeaturedProjects(locale);

  return (
    <section aria-labelledby="featured-heading" className="border-t border-border py-16">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="featured-heading" className="text-2xl font-semibold tracking-tight">
          {dict.featured.heading}
        </h2>
        <Link
          href={`/${locale}/projects`}
          className="text-sm text-accent hover:underline"
        >
          {dict.featured.viewAll} →
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} labels={dict.projects} />
        ))}
      </div>
    </section>
  );
}
