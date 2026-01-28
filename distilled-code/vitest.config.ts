import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    // TUI tests use bun:test + @opentui/solid, run with: bun run test:tui
    exclude: ["vendor/**", "node_modules/**", "test/tui/**"],
    testTimeout: 60_000, // Agent tests can take a while
  },
});
