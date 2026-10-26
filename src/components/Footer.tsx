import { getDictionary } from "@/i18n/server";
import { socialLinks } from "@/lib/site";

export default async function Footer() {
  const dict = await getDictionary();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label={dict.footer.socialLabel}>
          <ul className="flex gap-6">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p>{dict.footer.builtWith}</p>
      </div>
    </footer>
  );
}
