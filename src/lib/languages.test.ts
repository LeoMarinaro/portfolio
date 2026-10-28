import { describe, expect, test } from "vitest";
import { OTHER_LANGUAGES, summarizeLanguages } from "@/lib/languages";

// Adds up the percentages, to check that a summary always covers the whole repository
function totalPercent(shares: { percent: number }[]) {
  return shares.reduce((sum, s) => sum + s.percent, 0);
}

describe("summarizeLanguages", () => {
  test("returns an empty list when there is no code", () => {
    expect(summarizeLanguages({})).toEqual([]);
    expect(summarizeLanguages({ TypeScript: 0 })).toEqual([]);
  });

  test("converts bytes into percentages", () => {
    const result = summarizeLanguages({ TypeScript: 750, CSS: 250 });

    expect(result).toEqual([
      { name: "TypeScript", percent: 75 },
      { name: "CSS", percent: 25 },
    ]);
  });

  test("sorts languages from largest to smallest", () => {
    const result = summarizeLanguages({ CSS: 10, TypeScript: 70, HTML: 20 });

    expect(result.map((s) => s.name)).toEqual(["TypeScript", "HTML", "CSS"]);
  });

  test("ignores languages with zero bytes", () => {
    const result = summarizeLanguages({ TypeScript: 100, Shell: 0 });

    expect(result).toEqual([{ name: "TypeScript", percent: 100 }]);
  });

  test("keeps a single leftover language under its own name", () => {
    // 5 languages with max 4: folding would hide just one, so nothing is folded
    const result = summarizeLanguages({ A: 50, B: 20, C: 15, D: 10, E: 5 });

    expect(result).toHaveLength(5);
    expect(result.map((s) => s.name)).not.toContain(OTHER_LANGUAGES);
  });

  test("folds the smaller languages into one Other entry", () => {
    const result = summarizeLanguages({ A: 40, B: 25, C: 15, D: 10, E: 6, F: 4 });

    expect(result.map((s) => s.name)).toEqual(["A", "B", "C", "D", OTHER_LANGUAGES]);
    // Other = E + F = 6% + 4%; toBeCloseTo avoids floating-point surprises like 9.999999
    expect(result[4].percent).toBeCloseTo(10);
  });

  test("respects a custom max", () => {
    const result = summarizeLanguages({ A: 50, B: 30, C: 15, D: 5 }, 1);

    expect(result.map((s) => s.name)).toEqual(["A", OTHER_LANGUAGES]);
    expect(result[1].percent).toBeCloseTo(50);
  });

  test("percentages always add up to 100", () => {
    const result = summarizeLanguages({ TypeScript: 48210, CSS: 3350, JavaScript: 977, Shell: 12 });

    expect(totalPercent(result)).toBeCloseTo(100);
  });
});
