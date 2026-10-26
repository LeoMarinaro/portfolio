// Helpers shared by the public JSON API under src/app/api.
import type { ProjectKind } from "@/generated/prisma/client";
import { defaultLocale, hasLocale, locales, type Locale } from "@/i18n/config";

// Every error response has the same shape, so API clients handle errors in one place
export function apiError(status: number, code: string, message: string) {
  return Response.json({ error: { code, message } }, { status, headers: apiHeaders });
}

export const apiHeaders = {
  // Public, read-only API: any website may call it from the browser (CORS)
  "Access-Control-Allow-Origin": "*",
  // Vercel's CDN may keep a response for an hour and serve a stale copy for a
  // day while it refreshes in the background, matching the data cache lifetime
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
};

export type ProjectQuery = {
  locale: Locale;
  featured?: boolean;
  kind?: ProjectKind;
};

type ParseResult =
  | { ok: true; query: ProjectQuery }
  | { ok: false; code: string; message: string };

const kinds: Record<string, ProjectKind> = {
  professional: "PROFESSIONAL",
  personal: "PERSONAL",
};

// Validates ?locale=, ?featured= and ?kind= without trusting the input.
// Pure function (no request, no database), so it is easy to unit test.
export function parseProjectQuery(params: URLSearchParams): ParseResult {
  const locale = params.get("locale") ?? defaultLocale;
  if (!hasLocale(locale)) {
    return {
      ok: false,
      code: "INVALID_LOCALE",
      message: `locale must be one of: ${locales.join(", ")}`,
    };
  }

  const query: ProjectQuery = { locale };

  const featured = params.get("featured");
  if (featured !== null) {
    if (featured !== "true" && featured !== "false") {
      return { ok: false, code: "INVALID_FEATURED", message: "featured must be true or false" };
    }
    query.featured = featured === "true";
  }

  const kind = params.get("kind");
  if (kind !== null) {
    const parsed = kinds[kind.toLowerCase()];
    if (!parsed) {
      return {
        ok: false,
        code: "INVALID_KIND",
        message: `kind must be one of: ${Object.keys(kinds).join(", ")}`,
      };
    }
    query.kind = parsed;
  }

  return { ok: true, query };
}
