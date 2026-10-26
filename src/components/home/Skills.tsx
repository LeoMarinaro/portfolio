import { getDictionary } from "@/i18n/server";

export default async function Skills() {
  const dict = await getDictionary();

  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-t border-border py-16">
      <h2 id="skills-heading" className="text-2xl font-semibold tracking-tight">
        {dict.skills.heading}
      </h2>
      {/* Description list: each group title (dt) is described by its list of items (dd) */}
      <dl className="mt-8 grid gap-8 sm:grid-cols-2">
        {dict.skills.groups.map((group) => (
          <div key={group.title}>
            <dt className="text-sm font-medium text-muted">{group.title}</dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border px-2.5 py-1 font-mono text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
