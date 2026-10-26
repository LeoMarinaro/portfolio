import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/server";
import { formatMonthYear } from "@/lib/format";
import type { Repo } from "@/lib/github";

type Props = {
  repo: Repo;
  locale: Locale;
  labels: Dictionary["github"];
};

// Card for a repository that only exists on GitHub (not in the database), so it
// links straight to GitHub instead of to a project page on this site
export default function RepoCard({ repo, locale, labels }: Props) {
  return (
    <article className="relative flex flex-col rounded-lg border border-border p-5 transition-colors hover:border-accent">
      <h3 className="font-mono text-base font-semibold">
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${repo.name} — ${labels.viewRepo}`}
          className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent"
        >
          {repo.name}
        </a>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {repo.description ?? labels.noDescription}
      </p>
      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
        {repo.language && <span>{repo.language}</span>}
        <span>★ {repo.stars}</span>
        <time dateTime={repo.pushedAt}>{formatMonthYear(repo.pushedAt, locale)}</time>
      </p>
    </article>
  );
}
