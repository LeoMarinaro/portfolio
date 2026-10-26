import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { getDictionary, getLocale } from "@/i18n/server";
import { getProjects } from "@/lib/projects";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.projects.metaTitle,
    description: dict.projects.metaDescription,
  };
}

export default async function ProjectsPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const projects = await getProjects(locale);

  return (
    <section className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{dict.projects.heading}</h1>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">{dict.projects.intro}</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            locale={locale}
            labels={dict.projects}
            headingLevel="h2"
          />
        ))}
      </div>
    </section>
  );
}
