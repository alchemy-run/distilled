import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    exclude: ["vendor/**", "node_modules/**"],
    testTimeout: 60_000, // Agent tests can take a while
  },
});
