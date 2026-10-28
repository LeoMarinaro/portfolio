# Portfolio Programming Project

## Goal
Build a professional programming portfolio that demonstrates the owner's skills to recruiters and serves as a learning project the owner can explain in interviews. The source will be public on GitHub.

## Planned stack
- Next.js App Router with React and API routes
- TypeScript throughout
- Tailwind CSS, responsive design, accessibility, and dark mode
- PostgreSQL with Prisma
- GitHub API integration for repository names, descriptions, languages, and stars, with caching
- Vercel deployment on pushes to GitHub
- English and Portuguese

## Quality goals
- Strong Lighthouse scores
- Linting, focused tests, and GitHub Actions CI
- Complete README
- Keep credentials and connection strings in environment variables; never commit secrets

## Collaboration and learning
- Work in small, sequential stages; explain each stage before doing it.
- After adding code, explain its purpose in plain language.
- Add comments to important code where they aid understanding.
- Explain meaningful alternatives and why one was selected.
- Leave suitable implementation tasks for the owner to write and review together.
- End each stage with 2 or 3 interview questions and help prepare answers.
- Make small, clearly described Git commits when Git is available and changes are ready.

## Next.js version
- Scaffolded with create-next-app 16.4.3 (Next 16, React 19, Tailwind 4, ESLint 9), using `src/` and the `@/*` alias.
- The scaffold enabled `cacheComponents` and `partialPrefetching` in `next.config.ts`. Because of that, the `dynamicParams` segment config is not allowed. Unknown params get `notFound()` instead (see `src/i18n/server.ts`).
- If type checking fails on stale routes in `.next/dev/types`, delete `.next/dev` (it is only a cache).
- Follow `AGENTS.md`: read the matching guide in `node_modules/next/dist/docs/` before writing Next.js code, because APIs may differ from older versions.

## Current state
- Project folder: `Portifolio` under `Projetos`.
- Node.js v24.22.1 and npm 11.19.1 are installed (verified 2026-10-26).
- Git 2.56.0 is installed (verified 2026-10-26).
- Git repository on `main`, pushed to https://github.com/LeoMarinaro/portfolio (public, remote `origin`).
- Deployed on Vercel at https://leonardomarinaro.vercel.app. Every push to `main` redeploys it automatically.
- Running `npm` in PowerShell needed `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, which the user has done.
- Never commit `Curriculo.pdf` or other personal documents (phone number, personal data). Make sure they are git-ignored.

## Remaining work (as of 2026-10-28)
1. Tests: done. Vitest 4.1.12 (pinned; 5.x is out but 4.1 was the agreed line), `npm test`, test files are `src/**/*.test.ts` next to the code. Claude wrote `summarizeLanguages` tests; the user wrote `getPreferredLocale` tests (now in `src/i18n/preferred-locale.ts`). Optional user exercise: `hasLocale` tests. Async Server Components are not supported by Vitest, so E2E (Playwright) is optional later.
2. CI: done. `.github/workflows/ci.yml` runs lint, tests, and build on pushes and PRs to `main` (Node 24, actions v7). The build reads the database, so `DATABASE_URL` is a GitHub repository secret; `GITHUB_TOKEN` is the one Actions provides. Add the CI badge to the README.
3. SEO & Lighthouse: partly done (2026-10-28). Open Graph image (`src/app/[lang]/opengraph-image.tsx`, one static PNG per locale, text from `metadata.ogRole`) and Open Graph/Twitter metadata in the layout, with `metadataBase` from `siteUrl` in `src/lib/site.ts`. Lighthouse 13.6 (mobile, local production build): 100 in every category on `/pt`, `/pt/projects`, and `/en/projects/portfolio`. The user chose to skip sitemap.xml, robots.txt, and `hreflang` for now (optional later). Project pages still inherit the home page's `og:title`.
4. README: done (2026-10-28), in English, with CI badge, Mermaid architecture and data-model diagrams, and local setup. `.env.example` (names only, no secrets) is committed via a `!.env.example` exception in `.gitignore`. Keep the README in sync when the stack or setup changes.
- Small items: switch `sslmode=require` to `sslmode=verify-full` in `.env` and Vercel. Optional user exercises: wrap the seed in `prisma.$transaction`, and remember the chosen locale in a cookie read by the proxy. Optional: separate Neon branch for dev, and add descriptions plus the `portfolio` topic to other GitHub repos.

## Site structure (agreed 2026-10-26)
- `/[lang]` home: hero (name, one-line pitch, links), About me, Skills, 2-3 featured projects.
- `/[lang]/projects`: all projects with name, description, languages, and stars.
- `/[lang]/projects/[slug]`: project detail (what it does, stack, what was learned, code/live links).
- i18n follows the official Next 16 guide, with no library. Locales are `pt` (default) and `en`, with every route under `src/app/[lang]/`. Strings live in JSON dictionaries. A `proxy.ts` (Next 16's name for middleware) redirects `/` using `Accept-Language`. Route segment names stay in English for both locales.
- Footer on every page: GitHub and LinkedIn links. No contact section.
- Projects come from two sources, merged: GitHub API repositories, and records in PostgreSQL. The database holds bilingual write-ups, the featured flag, and professional projects that have no public code.
- Positioning: open to any role, with focus on back-end and game development.

## Database (agreed 2026-10-26)
- PostgreSQL on Neon, created through the Vercel Marketplace (Storage tab). Docker is not installed, so there is no local Postgres.
- Prisma 7.10.1, the latest stable release, pinned. On 2026-10-26 the npm `latest` tag pointed to 8.0.0-rc, a release candidate, so do not install it.
- Bilingual project data: `Project` holds shared fields, and `ProjectTranslation` holds one row per locale (1-N, unique on `[projectId, locale]`).
- The connection strings live in `.env` (git-ignored) locally and in Vercel environment variables in production.
- Local dev and production share the same Neon database for now.
- Pages read projects only through `src/lib/projects.ts`. Those functions use `"use cache"` + `cacheLife("hours")` + `cacheTag("projects")`, so content edits can take up to an hour to show in production until on-demand revalidation exists.
- Project content is edited in `prisma/seed.ts` and applied with `npx prisma db seed` (idempotent upserts). The user writes `pt` only; Claude writes `en`.
- 404s: an unknown project slug renders `[lang]/not-found.tsx` with status 200 + `noindex`, because the partial-prerender shell is already streaming. This is the documented behavior; a true 404 would need a DB lookup in the proxy. Unknown paths hit `[lang]/[...missing]` and return a real 404.

## GitHub integration (agreed 2026-10-26)
- `src/lib/github.ts` fetches `LeoMarinaro`'s public repos, cached for 1h with tag `github`. It uses `GITHUB_TOKEN` (fine-grained, public read-only) when set, and never throws: on failure the site renders without GitHub data.
- Repos with the `portfolio` topic on GitHub are listed in the "On GitHub" section of `/projects`, except those already linked from a DB project via `githubRepo`.

## Public API (decided 2026-10-26)
- A read-only `GET /api/projects` was built and then removed at the user's request, because the site doesn't need it for now. Pages read data directly through `src/lib/projects.ts`. The implementation is in git history (commit `bb54e6d`, reverted) if it is wanted later.

## Visual design (agreed 2026-10-26)
- Clean minimalist style: generous whitespace, strong typography, and the content is the focus.
- Fonts: Geist for text and Geist Mono for tech tags. Remove the scaffold's `font-family: Arial` override in `globals.css`.
- Neutrals are Tailwind zinc. The blue accent is `blue-600` in light mode and `blue-400` in dark mode, to keep WCAG contrast.
- Light background `#ffffff`, dark background `#0a0a0a`. Borders and cards are zinc-200 in light mode and zinc-800 in dark mode.
- Theme follows the system by default, and a toggle can override it. Implemented with `<html data-theme>`. An inline `<head>` script (`src/lib/theme.ts`) sets it before first paint from `localStorage` or the OS setting. Tailwind's `dark:` variant is remapped to `[data-theme="dark"]` in `globals.css`. Do not render theme-dependent markup from React state, because it causes a hydration mismatch. Use CSS (`dark:`) instead.
- Content is centered with a max width of about 768px, with a single column on mobile.
