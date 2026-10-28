// Reads public repository data from the GitHub REST API.
import { cacheLife, cacheTag } from "next/cache";

export const GITHUB_USER = "LeoMarinaro";

// Repositories tagged with this topic on GitHub are listed on the site
export const PORTFOLIO_TOPIC = "portfolio";

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  pushedAt: string; // ISO date of the last push
};

// Shape of the fields we use from GET /users/{user}/repos
type GitHubRepoResponse = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Optional token: raises the rate limit from 60 to 5,000 requests per hour
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

// All public, non-fork, non-archived repositories. Cached for an hour, so the
// API is called at most about once an hour no matter how many people visit.
// Never throws: if GitHub is down or rate-limited, the site renders without
// GitHub data instead of failing (graceful degradation).
export async function getRepos(): Promise<Repo[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("github");

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
      { headers: githubHeaders() },
    );
    if (!response.ok) {
      console.error(`GitHub API responded ${response.status}: ${response.statusText}`);
      return [];
    }

    const repos = (await response.json()) as GitHubRepoResponse[];
    return repos
      .filter((repo) => !repo.fork && !repo.archived)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage || null,
        language: repo.language,
        stars: repo.stargazers_count,
        topics: repo.topics ?? [],
        pushedAt: repo.pushed_at,
      }));
  } catch (error) {
    console.error("Could not reach the GitHub API:", error);
    return [];
  }
}

// Repositories the owner chose to show, by adding the "portfolio" topic on GitHub
export async function getPortfolioRepos(): Promise<Repo[]> {
  const repos = await getRepos();
  return repos.filter((repo) => repo.topics.includes(PORTFOLIO_TOPIC));
}

// Bytes of code per language for one repository, e.g. { TypeScript: 48210, CSS: 3350 }.
// One extra request per repository, so it is only used on project pages.
// Never throws: returns an empty object if GitHub can't be reached.
export async function getRepoLanguages(name: string): Promise<Record<string, number>> {
  "use cache";
  cacheLife("hours");
  cacheTag("github");

  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${encodeURIComponent(name)}/languages`,
      { headers: githubHeaders() },
    );
    if (!response.ok) {
      console.error(`GitHub languages API responded ${response.status} for ${name}`);
      return {};
    }
    return (await response.json()) as Record<string, number>;
  } catch (error) {
    console.error(`Could not load languages for ${name}:`, error);
    return {};
  }
}

// Live data for one repository, used to enrich a project stored in the database
export async function getRepo(name: string): Promise<Repo | null> {
  const repos = await getRepos();
  return repos.find((repo) => repo.name.toLowerCase() === name.toLowerCase()) ?? null;
}
