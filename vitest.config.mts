import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Same "@/..." import alias as tsconfig.json, so tests import code the way the app does
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    // Only pure functions are tested for now, so plain Node is enough (no browser DOM).
    // Async Server Components aren't supported by Vitest; those would need E2E tests.
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
