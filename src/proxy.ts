import { NextResponse, type NextRequest } from "next/server";
import { locales } from "@/i18n/config";
import { getPreferredLocale } from "@/i18n/preferred-locale";

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
