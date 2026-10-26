// Initial project data. Run with `npx prisma db seed`.
// Idempotent: projects are matched by slug and updated if they exist, so it is
// safe to run again after editing the texts below.
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Locale, PrismaClient, ProjectKind } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

type Translation = {
  title: string;
  summary: string;
  description: string;
  learned?: string;
};

type SeedProject = {
  slug: string;
  kind: ProjectKind;
  client?: string;
  stack: string[];
  githubRepo?: string;
  liveUrl?: string;
  featured?: boolean;
  sortOrder: number;
  translations: Record<Locale, Translation>;
};

const projects: SeedProject[] = [
  {
    slug: "portfolio",
    kind: ProjectKind.PERSONAL,
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    githubRepo: "portfolio",
    liveUrl: "https://leonardomarinaro.vercel.app",
    featured: true,
    sortOrder: 0,
    translations: {
      pt: {
        title: "Este portfólio",
        summary:
          "Site pessoal bilíngue com Next.js, TypeScript e PostgreSQL, com deploy contínuo na Vercel.",
        description:
          "Portfólio construído do zero com Next.js (App Router) e TypeScript. Tem rotas por idioma (português e inglês) com um proxy que detecta o idioma do navegador, tema claro/escuro sem flash no carregamento e foco em acessibilidade. Os projetos ficam num banco PostgreSQL modelado com Prisma, com uma tabela de traduções, e são combinados com dados da API do GitHub. Cada push no GitHub publica o site automaticamente na Vercel.",
        learned:
          "Server e Client Components do React, internacionalização sem bibliotecas, modelagem relacional com migrations e deploy contínuo.",
      },
      en: {
        title: "This portfolio",
        summary:
          "Bilingual personal site built with Next.js, TypeScript, and PostgreSQL, continuously deployed on Vercel.",
        description:
          "Portfolio built from scratch with Next.js (App Router) and TypeScript. It has per-language routes (Portuguese and English) with a proxy that detects the browser's language, a light/dark theme with no flash on load, and a focus on accessibility. Projects live in a PostgreSQL database modeled with Prisma, with a translations table, and are merged with data from the GitHub API. Every push to GitHub deploys the site automatically on Vercel.",
        learned:
          "React Server and Client Components, internationalization without libraries, relational modeling with migrations, and continuous deployment.",
      },
    },
  },
  {
    slug: "mes-cvale",
    kind: ProjectKind.PROFESSIONAL,
    client: "CVale",
    stack: ["DELMIA Apriso", "C#", "SQL Server", "JavaScript", "HTML", "CSS"],
    featured: true,
    sortOrder: 1,
    translations: {
      pt: {
        title: "Telas MES para a CVale",
        summary:
          "Telas de um sistema MES para monitorar e controlar diferentes áreas da produção da CVale.",
        description:
          "Desenvolvimento e implementação de telas para o sistema MES (Manufacturing Execution System) da CVale, cobrindo várias áreas do processo industrial no chão de fábrica. Construí o front-end em HTML, CSS e JavaScript e a lógica de back-end em C# com SQL Server, sobre a plataforma DELMIA Apriso. O objetivo era dar mais eficiência e visibilidade às operações da fábrica.",
        learned:
          "Como sistemas de fábrica funcionam na prática e como transformar regras de negócio de um cliente industrial em telas e consultas no banco.",
      },
      en: {
        title: "MES screens for CVale",
        summary:
          "MES screens to monitor and control different areas of CVale's production.",
        description:
          "Development and rollout of screens for CVale's MES (Manufacturing Execution System), covering several areas of the industrial process on the shop floor. I built the front-end in HTML, CSS, and JavaScript and the back-end logic in C# with SQL Server, on the DELMIA Apriso platform. The goal was to make the plant's operations more efficient and visible.",
        learned:
          "How factory systems work in practice and how to turn an industrial client's business rules into screens and database queries.",
      },
    },
  },
  {
    slug: "mes-cummins-cylinder-heads",
    kind: ProjectKind.PROFESSIONAL,
    client: "Cummins",
    stack: ["DELMIA Apriso", "C#", "Oracle", "JavaScript", "HTML", "CSS"],
    featured: true,
    sortOrder: 2,
    translations: {
      pt: {
        title: "Linha de cabeçotes V2 da Cummins",
        summary:
          "Telas MES que garantem a rastreabilidade de cada cabeçote produzido, organizado em caixas virtuais.",
        description:
          "Desenvolvimento de telas para a linha de cabeçotes V2 da Cummins com foco em rastreabilidade: cada cabeçote produzido é registrado e organizado em caixas virtuais, de modo que seja possível saber onde cada peça está e por onde passou. Isso melhorou a gestão e a eficiência da linha. O front-end foi feito em HTML, CSS e JavaScript e o back-end em C# com banco Oracle, na plataforma DELMIA Apriso.",
        learned:
          "Rastreabilidade de peças em produção e cuidado com a consistência dos dados quando um erro de registro afeta a linha física. E alto contato com os operadores",
      },
      en: {
        title: "Cummins V2 cylinder head line",
        summary:
          "MES screens that make every produced cylinder head traceable, organized into virtual boxes.",
        description:
          "Development of screens for Cummins' V2 cylinder head line focused on traceability: each produced cylinder head is registered and organized into virtual boxes, so it is possible to know where each part is and where it has been. This improved line management and efficiency. The front-end was built in HTML, CSS, and JavaScript and the back-end in C# with an Oracle database, on the DELMIA Apriso platform.",
        learned:
          "Part traceability in production and care for data consistency when a registration error affects the physical line.",
      },
    },
  },
  {
    slug: "cni-consulting-site",
    kind: ProjectKind.PROFESSIONAL,
    client: "CNI",
    stack: ["Node.js", "SQL Server", "JavaScript", "HTML", "CSS"],
    sortOrder: 3,
    translations: {
      pt: {
        title: "Site de consultoria com a CNI",
        summary:
          "Site full-stack em parceria com a CNI para oferecer serviços de consultoria a outras empresas.",
        description:
          "Desenvolvimento, em parceria com a CNI, de um site de consultoria voltado a outras empresas. Fiz o front-end em HTML, CSS e JavaScript e o back-end em Node.js com banco SQL Server, além de escrever toda a documentação do site.",
        learned:
          "Construir uma aplicação web de ponta a ponta e documentar para que outras pessoas consigam manter.",
      },
      en: {
        title: "Consulting website with CNI",
        summary:
          "Full-stack website built in partnership with CNI to offer consulting services to other companies.",
        description:
          "Development, in partnership with CNI, of a consulting website aimed at other companies. I built the front-end in HTML, CSS, and JavaScript and the back-end in Node.js with a SQL Server database, and wrote the site's complete documentation.",
        learned:
          "Building a web application end to end and documenting it so others can maintain it.",
      },
    },
  },
  {
    slug: "whatsapp-ticket-notifications",
    kind: ProjectKind.PROFESSIONAL,
    stack: ["UiPath", "RPA"],
    sortOrder: 4,
    translations: {
      pt: {
        title: "Notificações automáticas via WhatsApp",
        summary:
          "Automação RPA interna que detecta novos chamados num site e avisa a equipe pelo WhatsApp.",
        description:
          "Solução de RPA (Automação Robótica de Processos) em UiPath, criada para uso interno da SPI. O robô monitora um site, detecta novos chamados numa tabela e envia uma notificação automática pelo WhatsApp para os funcionários responsáveis, sem que ninguém precise ficar conferindo a página.",
        learned:
          "Automatizar uma tarefa repetitiva de ponta a ponta e lidar com sistemas que não oferecem uma API.",
      },
      en: {
        title: "Automatic WhatsApp notifications",
        summary:
          "Internal RPA automation that detects new support tickets on a website and alerts the team on WhatsApp.",
        description:
          "RPA (Robotic Process Automation) solution in UiPath, built for internal use at SPI. The bot monitors a website, detects new tickets in a table, and sends an automatic WhatsApp notification to the responsible employees, so nobody has to keep checking the page.",
        learned:
          "Automating a repetitive task end to end and working with systems that don't offer an API.",
      },
    },
  },
];

async function main() {
  for (const { translations, ...project } of projects) {
    const data = {
      kind: project.kind,
      client: project.client ?? null,
      stack: project.stack,
      githubRepo: project.githubRepo ?? null,
      liveUrl: project.liveUrl ?? null,
      featured: project.featured ?? false,
      sortOrder: project.sortOrder,
    };

    // upsert = update if a row with this slug exists, otherwise insert
    const saved = await prisma.project.upsert({
      where: { slug: project.slug },
      update: data,
      create: { slug: project.slug, ...data },
    });

    for (const locale of Object.values(Locale)) {
      const text = translations[locale];
      const fields = { ...text, learned: text.learned ?? null };
      await prisma.projectTranslation.upsert({
        // The @@unique([projectId, locale]) in the schema makes this lookup possible
        where: { projectId_locale: { projectId: saved.id, locale } },
        update: fields,
        create: { projectId: saved.id, locale, ...fields },
      });
    }

    console.log(`✔ ${project.slug}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
