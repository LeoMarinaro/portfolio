import { describe, expect, test } from "vitest";
import { getPreferredLocale } from "@/i18n/preferred-locale";

describe("getPreferredLocale", () => {
  // Exemplo pronto: se o navegador não mandar nada, usa o idioma padrão
  test("returns the default locale when there is no header", () => {
    expect(getPreferredLocale(null)).toBe("pt");
  });

  test("picks Portuguese for a Brazilian browser", () => {
    expect(getPreferredLocale("pt-BR,pt;q=0.9,en;q=0.8")).toBe("pt");
  });

  test("picks English for an American browser", () => {
    expect(getPreferredLocale("en-US,en;q=0.9")).toBe("en");
  });

  test("falls back to the default when no language is supported", () => {
    expect(getPreferredLocale("fr-FR,fr;q=0.9")).toBe("pt");
  });

  test("uses the q weights, not the order in the text", () => {
    expect(getPreferredLocale("en;q=0.5,pt;q=0.8")).toBe("pt");
  });
});
