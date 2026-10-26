export type LanguageShare = {
  name: string;
  percent: number; // 0-100
};

// The "Other" bucket has no name of its own; the UI translates it
export const OTHER_LANGUAGES = "__other__";

// Turns GitHub's bytes-per-language into percentages, largest first.
// Keeps the top `max` languages and folds the rest into one "Other" entry, so
// the chart never needs more colors than the validated palette has.
// Pure function: same input, same output, no network, which makes it easy to test.
export function summarizeLanguages(
  bytesByLanguage: Record<string, number>,
  max = 4,
): LanguageShare[] {
  const entries = Object.entries(bytesByLanguage).filter(([, bytes]) => bytes > 0);
  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (total === 0) return [];

  const shares = entries
    .map(([name, bytes]) => ({ name, percent: (bytes / total) * 100 }))
    .sort((a, b) => b.percent - a.percent);

  // Only fold when it removes at least two languages; a single leftover keeps its own name
  if (shares.length <= max + 1) return shares;

  const top = shares.slice(0, max);
  const otherPercent = shares.slice(max).reduce((sum, s) => sum + s.percent, 0);
  return [...top, { name: OTHER_LANGUAGES, percent: otherPercent }];
}
