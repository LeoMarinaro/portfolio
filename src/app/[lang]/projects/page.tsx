import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import RepoCard from "@/components/RepoCard";
import { getDictionary, getLocale } from "@/i18n/server";
import { getPortfolioRepos } from "@/lib/github";
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
  // Both requests start together instead of one waiting for the other
  const [projects, repos] = await Promise.all([getProjects(locale), getPortfolioRepos()]);

  // Repositories already shown as a database project are not listed twice
  const linkedRepos = new Set(projects.map((p) => p.githubRepo?.toLowerCase()));
  const otherRepos = repos.filter((repo) => !linkedRepos.has(repo.name.toLowerCase()));

  return (
    <>
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

      {/* Hidden when no repository has the topic yet, or when GitHub is unreachable */}
      {otherRepos.length > 0 && (
        <section aria-labelledby="github-heading" className="border-t border-border py-16">
          <h2 id="github-heading" className="text-2xl font-semibold tracking-tight">
            {dict.github.heading}
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">{dict.github.intro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {otherRepos.map((repo) => (
              <RepoCard key={repo.name} repo={repo} locale={locale} labels={dict.github} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
