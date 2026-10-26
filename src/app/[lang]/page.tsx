import { getDictionary } from "@/i18n/server";

// Temporary home page; the real sections arrive in stage 7
export default async function Home() {
  const dict = await getDictionary();

  return (
    <section className="py-24">
      <h1 className="text-4xl font-semibold tracking-tight">{dict.home.title}</h1>
      <p className="mt-4 text-lg text-muted">{dict.home.subtitle}</p>
    </section>
  );
}
