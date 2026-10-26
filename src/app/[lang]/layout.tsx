import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { htmlLang, locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";
import { themeScript } from "@/lib/theme";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Pre-renders /pt and /en at build time.
// Unknown locales like /xx get a 404 from getLocale(), which calls notFound().
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  };
}

// Root layout: wraps every page with <html>, fonts, header, and footer
export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <html
      lang={htmlLang[locale]}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // The theme script adds data-theme before React loads; this tells React
      // that difference on <html> is expected (it does not affect child elements)
      suppressHydrationWarning
    >
      <head>
        {/* Runs before the first paint so the page never flashes the wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        {/* Hidden until focused with Tab, lets keyboard users jump past the header */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
        >
          {dict.layout.skipToContent}
        </a>
        <Header />
        <main id="content" className="mx-auto w-full max-w-3xl flex-1 px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
