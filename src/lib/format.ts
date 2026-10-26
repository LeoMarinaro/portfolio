import { htmlLang, type Locale } from "@/i18n/config";

// "2026-10-26T16:08:30Z" -> "out. de 2026" (pt) / "Oct 2026" (en).
// Runs on the server; month precision avoids time-zone surprises.
export function formatMonthYear(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(htmlLang[locale], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}
