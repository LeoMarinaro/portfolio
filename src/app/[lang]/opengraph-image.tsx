import { ImageResponse } from "next/og";
import { defaultLocale, hasLocale, locales } from "@/i18n/config";
import en from "@/i18n/dictionaries/en.json";
import pt from "@/i18n/dictionaries/pt.json";
import { siteUrl } from "@/lib/site";

// Link preview image (Open Graph), generated from code at build time: one PNG
// per language. Next.js adds the <meta property="og:image"> tags by itself, and
// pages under /[lang] inherit it unless they define their own.
export const alt = "Leonardo Marinaro";
export const size = { width: 1200, height: 630 }; // the size social networks expect
export const contentType = "image/png";

// Read directly (not through getDictionary) because this is a route that
// returns an image, not a page; the language comes from its params instead.
const dictionaries = { pt, en };

// Builds both images ahead of time instead of drawing them on every request
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = dictionaries[hasLocale(lang) ? lang : defaultLocale];

  // ImageResponse draws JSX into a PNG. It supports a subset of CSS (flexbox,
  // no Tailwind classes), so styles are inline. Colors match the dark theme.
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: "-0.03em" }}>
          Leonardo Marinaro
        </div>
        <div style={{ marginTop: 24, fontSize: 40, color: "#a1a1aa" }}>
          {dict.metadata.ogRole}
        </div>
        <div style={{ marginTop: 64, fontSize: 28, color: "#60a5fa" }}>
          {siteUrl.replace("https://", "")}
        </div>
      </div>
    ),
    size,
  );
}
