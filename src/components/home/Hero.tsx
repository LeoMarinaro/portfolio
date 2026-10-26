import { getDictionary } from "@/i18n/server";
import { socialLinks } from "@/lib/site";

export default async function Hero() {
  const dict = await getDictionary();

  return (
    <section className="py-20 sm:py-28">
      <p className="font-mono text-sm text-accent">{dict.hero.greeting}</p>
      {/* The only <h1> on the page: screen readers and search engines use it as the page's main title */}
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        Leonardo Marinaro
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        {dict.hero.tagline}
      </p>
      <ul className="mt-8 flex flex-wrap gap-3">
        {socialLinks.map((link, index) => (
          <li key={link.name}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              // First link is the primary (filled) button, the rest are outlined
              className={`inline-flex h-11 items-center rounded-full px-5 text-sm font-medium transition-colors ${
                index === 0
                  ? "bg-accent text-background hover:opacity-90"
                  : "border border-border hover:border-accent hover:text-accent"
              }`}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
