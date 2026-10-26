import { htmlLang, type Locale } from "@/i18n/config";
import { OTHER_LANGUAGES, type LanguageShare } from "@/lib/languages";

type Props = {
  languages: LanguageShare[];
  locale: Locale;
  labels: { heading: string; other: string };
};

// Fixed color order from the validated palette; anything past slot 4 is the neutral gray
function colorFor(index: number) {
  return index < 4 ? `var(--series-${index + 1})` : "var(--series-other)";
}

export default function LanguageBar({ languages, locale, labels }: Props) {
  if (languages.length === 0) return null;

  const format = new Intl.NumberFormat(htmlLang[locale], { maximumFractionDigits: 1 });
  const items = languages.map((language, index) => ({
    label: language.name === OTHER_LANGUAGES ? labels.other : language.name,
    percent: language.percent,
    // Tiny shares would round to "0%", which reads as "none"
    text: language.percent < 0.1 ? `<${format.format(0.1)}%` : `${format.format(language.percent)}%`,
    color: colorFor(index),
  }));
  // Screen readers get the whole chart as one sentence, e.g. "TypeScript 92.1%, CSS 6.4%"
  const summary = items.map((item) => `${item.label} ${item.text}`).join(", ");

  return (
    <section aria-labelledby="languages-heading" className="mt-10">
      <h2 id="languages-heading" className="text-xl font-semibold tracking-tight">
        {labels.heading}
      </h2>

      {/* Thin stacked bar: segments grow in proportion to their share, with a
          2px gap (the page background) between them and rounded ends */}
      <div role="img" aria-label={summary} className="mt-4 flex h-2 gap-0.5 overflow-hidden rounded">
        {items.map((item) => (
          <span
            key={item.label}
            title={`${item.label} ${item.text}`}
            className="min-w-0.5"
            style={{ flexGrow: item.percent, flexBasis: 0, backgroundColor: item.color }}
          />
        ))}
      </div>

      {/* Legend is always visible, so a language is never identified by color alone */}
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm" aria-hidden="true">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.label}</span>
            <span className="text-muted">{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
