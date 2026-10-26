"use client";

// Client Component: it needs the current URL, which only the browser knows
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

type Props = {
  current: Locale;
  label: string;
};

export default function LanguageSwitcher({ current, label }: Props) {
  const pathname = usePathname();

  // Swaps only the locale segment, so the visitor stays on the same page:
  // "/pt/projects" -> "/en/projects"
  function hrefFor(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  }

  return (
    <nav aria-label={label} className="flex gap-1 font-mono text-sm">
      {locales.map((locale) => {
        const isCurrent = locale === current;
        return (
          <Link
            key={locale}
            href={hrefFor(locale)}
            hrefLang={locale}
            lang={locale}
            aria-current={isCurrent ? "true" : undefined}
            className={`rounded px-2 py-1 transition-colors ${
              isCurrent
                ? "text-foreground"
                : "text-muted hover:text-accent"
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
