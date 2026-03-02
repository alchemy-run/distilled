import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    sequence: { concurrent: true },
    pool: "threads",
    testTimeout: 120_000,
  },
});
