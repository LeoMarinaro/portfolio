import Link from "next/link";
import { getDictionary, getLocale } from "@/i18n/server";

// Shown by notFound() anywhere under /[lang], inside the normal layout.
// Receives no props, but reads the language through root params like any Server Component.
export default async function NotFound() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <section className="py-24">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{dict.notFound.heading}</h1>
      <p className="mt-4 text-muted">{dict.notFound.text}</p>
      <Link href={`/${locale}`} className="mt-8 inline-block text-accent hover:underline">
        ← {dict.notFound.home}
      </Link>
    </section>
  );
}
