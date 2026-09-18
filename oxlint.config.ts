import { defineConfig, type OxlintConfig } from "oxlint";

export default defineConfig({
  overrides: [
    {
      files: ["packages/*/src/services/**", "packages/*/src/unstable-services/**"],
      // Vendor schemas can have a data property named `then`; these are not promises.
      rules: { "unicorn/no-thenable": "off" },
    },
  ],
  rules: {
    "no-irregular-whitespace": "off",
    "typescript/no-misused-new": "off",
    "require-yield": "off",
    "typescript/no-non-null-asserted-optional-chain": "off",
  },
} satisfies OxlintConfig);
