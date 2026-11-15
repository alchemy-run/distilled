import { defineConfig } from "vitest/config";

// The workerd run (`pnpm test:workerd`): not part of the Bundlers job, the
// nightly Compatibility workflow and the release run it.
export default defineConfig({
  test: {
    include: ["workerd/**/*.test.ts"],
    hookTimeout: 900_000,
    testTimeout: 300_000,
  },
});
