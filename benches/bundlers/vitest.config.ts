import { defineConfig } from "vitest/config";

// Not part of the root `pnpm vitest run`: it builds and packs the SDKs first
// (about a minute), so CI runs it in its own job.
export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    hookTimeout: 900_000,
    testTimeout: 300_000,
  },
});
