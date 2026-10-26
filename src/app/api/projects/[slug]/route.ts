import type { NextRequest } from "next/server";
import { apiError, apiHeaders, parseProjectQuery } from "@/lib/api";
import { getProject } from "@/lib/projects";

// GET /api/projects/mes-cvale?locale=en
export async function GET(request: NextRequest, ctx: RouteContext<"/api/projects/[slug]">) {
  const { slug } = await ctx.params;
  const parsed = parseProjectQuery(request.nextUrl.searchParams);
  if (!parsed.ok) {
    return apiError(400, parsed.code, parsed.message);
  }

  const project = await getProject(parsed.query.locale, slug);
  if (!project) {
    // 404 Not Found: the request was valid, but this project doesn't exist
    return apiError(404, "NOT_FOUND", `No project with slug "${slug}"`);
  }

  return Response.json({ data: project }, { headers: apiHeaders });
}
