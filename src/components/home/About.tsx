import { getDictionary } from "@/i18n/server";

export default async function About() {
  const dict = await getDictionary();

  return (
    // id is the anchor the header menu scrolls to; aria-labelledby names the section after its heading
    <section id="about" aria-labelledby="about-heading" className="border-t border-border py-16">
      <h2 id="about-heading" className="text-2xl font-semibold tracking-tight">
        {dict.about.heading}
      </h2>
      <div className="mt-6 space-y-4 leading-relaxed">
        {dict.about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
