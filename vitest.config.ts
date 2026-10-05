import { defineConfig } from "vitest/config";

// Workspace packages export their TypeScript source under the `bun` condition
// (see each package.json `exports`); `import` points at the tsc-built `lib/`.
// Resolving `bun` first lets tests run against src without a build.
const conditions = ["bun", "import", "module", "node", "default"];

export default defineConfig({
  resolve: { conditions },
  ssr: { resolve: { conditions, externalConditions: conditions } },
  test: {
    include: [
      "packages/*/{src,test,scripts}/**/*.test.ts",
      "scripts/**/*.test.ts",
      "stacks/*/*.test.ts",
    ],
    exclude: ["**/node_modules/**", "**/specs/**", "**/lib/**"],
  },
});
