import type { NextRequest } from "next/server";
import { apiError, apiHeaders, parseProjectQuery } from "@/lib/api";
import { getProjects } from "@/lib/projects";

// GET /api/projects?locale=en&featured=true&kind=professional
export async function GET(request: NextRequest) {
  const parsed = parseProjectQuery(request.nextUrl.searchParams);
  if (!parsed.ok) {
    // 400 Bad Request: the caller sent something invalid
    return apiError(400, parsed.code, parsed.message);
  }
  const { locale, featured, kind } = parsed.query;

  // getProjects is cached, so this does not query the database on every call.
  // Filtering in memory is fine for a handful of projects; with thousands,
  // the filters would move into the database query (a WHERE clause).
  const projects = (await getProjects(locale)).filter(
    (p) =>
      (featured === undefined || p.featured === featured) &&
      (kind === undefined || p.kind === kind),
  );

  return Response.json(
    { data: projects, meta: { count: projects.length, locale } },
    { headers: apiHeaders },
  );
}
