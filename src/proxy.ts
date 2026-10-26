import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales, type Locale } from "@/i18n/config";

// Picks the best supported locale from a header like "pt-BR,pt;q=0.9,en;q=0.8".
// Each entry is a language with an optional weight q (0 to 1, default 1).
function getPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const preferences = acceptLanguage
    .split(",")
    .map((entry) => {
      const [tag, ...params] = entry.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const quality = q ? Number(q.trim().slice(2)) : 1;
      return {
        language: tag.split("-")[0].toLowerCase(), // "pt-BR" -> "pt"
        quality: Number.isNaN(quality) ? 0 : quality,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  const match = preferences.find((p) => hasLocale(p.language));
  return match ? (match.language as Locale) : defaultLocale;
}

// Runs before every matched request: adds the locale prefix when it is missing
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocalePrefix) return;

  const locale = getPreferredLocale(request.headers.get("accept-language"));
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip API routes, Next.js internals, and files with an extension (favicon.ico, images)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
