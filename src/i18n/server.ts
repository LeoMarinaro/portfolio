import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, type Locale } from "./config";
import type pt from "./dictionaries/pt.json";

// pt.json defines the shape. If en.json is missing a key, the typed
// loader below fails to compile, so a translation can't be forgotten.
export type Dictionary = typeof pt;

// Each dictionary is imported only when requested, and only on the server,
// so translations never add weight to the JavaScript sent to the browser.
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  pt: () => import("./dictionaries/pt.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

// Reads the [lang] segment of the current URL from any Server Component
export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return locale;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}
