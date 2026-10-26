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
- Follow `AGENTS.md`: read the matching guide in `node_modules/next/dist/docs/` before writing Next.js code, because APIs may differ from older versions.

## Current state
- Project folder: `Portifolio` under `Projetos`.
- Node.js v24.22.1 and npm 11.19.1 are installed (verified 2026-10-26).
- Git 2.56.0 is installed (verified 2026-10-26).
- Git repository on `main`, pushed to https://github.com/LeoMarinaro/portfolio (public, remote `origin`).
- Deployed on Vercel at https://leonardomarinaro.vercel.app. Every push to `main` redeploys it automatically.
- Running `npm` in PowerShell needed `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, which the user has done.
- Never commit `Curriculo.pdf` or other personal documents (phone number, personal data). Make sure they are git-ignored.

## Site structure (agreed 2026-10-26)
- `/` home: hero (name, one-line pitch, links), About me, Skills, 2-3 featured projects.
- `/projetos` (projects): all projects with name, description, languages, and stars.
- `/projetos/[slug]`: project detail (what it does, stack, what was learned, code/live links).
- Footer on every page: GitHub and LinkedIn links. No contact section.
- Projects come from two sources, merged: GitHub API repositories, and records in PostgreSQL. The database holds bilingual write-ups, the featured flag, and professional projects that have no public code.
- Positioning: open to any role, with focus on back-end and game development.
- Visual layout is still undecided. Do not design it until planned together.
