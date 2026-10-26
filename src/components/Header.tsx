import Link from "next/link";
import { getDictionary, getLocale } from "@/i18n/server";
import LanguageSwitcher from "./LanguageSwitcher";

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
        <LanguageSwitcher current={locale} label={dict.header.languageLabel} />
      </div>
    </header>
  );
}
