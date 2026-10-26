import Link from "next/link";
import { getDictionary, getLocale } from "@/i18n/server";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

// Server Component: reads the locale itself, so the layout doesn't pass it down
export default async function Header() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href={`/${locale}`}
          className="font-semibold tracking-tight transition-colors hover:text-accent"
        >
          Leonardo Marinaro
        </Link>
        <div className="flex items-center gap-6">
          {/* Hidden on small screens to keep the header uncluttered; the sections are on the same page */}
          <nav aria-label={dict.header.navLabel} className="hidden sm:block">
            <ul className="flex gap-6 text-sm text-muted">
              <li>
                <Link href={`/${locale}#about`} className="transition-colors hover:text-accent">
                  {dict.header.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#skills`} className="transition-colors hover:text-accent">
                  {dict.header.nav.skills}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher current={locale} label={dict.header.languageLabel} />
            <ThemeToggle label={dict.header.themeToggle} />
          </div>
        </div>
      </div>
    </header>
  );
}
