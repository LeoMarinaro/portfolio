// Single source of truth for the languages the site supports.
// `as const` makes TypeScript treat these as the exact values "pt" | "en", not any string.
export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

// Value for <html lang>, used by screen readers and search engines
export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};

// Type guard: after `if (hasLocale(x))`, TypeScript knows x is a Locale
export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
