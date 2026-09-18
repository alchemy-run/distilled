import { defineConfig, type OxlintConfig } from "oxlint";

export default defineConfig({
  rules: {
    "typescript/no-misused-new": "off",
    "require-yield": "off",
    "typescript/no-non-null-asserted-optional-chain": "off",
  },
} satisfies OxlintConfig);
