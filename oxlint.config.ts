import { defineConfig, type OxlintConfig } from "oxlint";

/** Effect APIs that crash the fiber (a defect) instead of failing with a typed error. */
const DEFECTS = ["die", "dieMessage", "dieSync", "orDie", "orDieWith"];
const DEFECT_MODULES = [
  "Effect",
  "Stream",
  "Layer",
  "Channel",
  "Sink",
  "STM",
  "Micro",
  "Exit",
  "Cause",
];

/** Effect APIs that start a fiber detached from the caller's (context, interruption, tracing). */
const RUNNERS = [
  "runPromise",
  "runPromiseWith",
  "runPromiseExit",
  "runPromiseExitWith",
  "runSync",
  "runSyncWith",
  "runSyncExit",
  "runSyncExitWith",
  "runFork",
  "runForkWith",
  "runCallback",
  "runCallbackWith",
];

/** The global `fetch` skips the caller's HttpClient: its proxy, test client and tracing. */
const GLOBAL_FETCH =
  "The global fetch skips the caller's HttpClient (its proxy, test client and tracing). Send the request with HttpClient.HttpClient.";
const GLOBAL_OBJECTS = ["globalThis", "window", "self"];

export default defineConfig({
  // Upstream conformance suites, submoduled (see packages/core/conformance).
  ignorePatterns: ["packages/core/conformance/connect/**", "packages/core/conformance/protobuf/**"],
  jsPlugins: ["./scripts/oxlint-plugin.ts"],
  overrides: [
    {
      files: ["packages/*/src/services/**", "packages/*/src/unstable-services/**"],
      // Vendor schemas can have a data property named `then`; these are not promises.
      rules: { "unicorn/no-thenable": "off" },
    },
    {
      // Shipped SDK code (packages/<pkg>/src) fails every call with a typed
      // error; it never dies (CLAUDE.md rule 4).
      files: ["packages/*/src/**"],
      rules: {
        "no-restricted-properties": [
          "error",
          ...DEFECT_MODULES.flatMap((object) =>
            DEFECTS.map((property) => ({
              object,
              property,
              message:
                "A die is a defect. Fail with a typed error (core SdkError, InvalidInput, ...).",
            })),
          ),
          {
            object: "Effect",
            property: "promise",
            message:
              "A rejected Effect.promise is a defect. Use Effect.tryPromise({ try, catch }) with a typed error.",
          },
          ...RUNNERS.map((property) => ({
            object: "Effect",
            property,
            message:
              "Effect.run* starts a fiber outside the caller's: it loses its context, interruption and tracing, and its failure is no typed error. Return the Effect instead.",
          })),
          ...GLOBAL_OBJECTS.map((object) => ({
            object,
            property: "fetch",
            message: GLOBAL_FETCH,
          })),
        ],
        "no-restricted-globals": ["error", { name: "fetch", message: GLOBAL_FETCH }],
        "no-empty": ["error", { allowEmptyCatch: false }],
        "distilled/no-swallowed-catch": "error",
        "distilled/explain-ignored-failure": "error",
        "no-eval": "error",
        "typescript/no-implied-eval": "error",
        "distilled/no-function-constructor": "error",
        "distilled/no-throw-in-effect": "error",
      },
    },
    {
      // The generator and test helpers: never imported by an SDK at runtime.
      files: ["packages/dev/src/**"],
      rules: {
        "no-restricted-properties": "off",
        "no-restricted-globals": "off",
        "no-empty": "off",
        "distilled/no-swallowed-catch": "off",
        "distilled/explain-ignored-failure": "off",
        "distilled/no-function-constructor": "off",
        "distilled/no-throw-in-effect": "off",
      },
    },
  ],
  rules: {
    "no-irregular-whitespace": "off",
    "typescript/no-misused-new": "off",
    "require-yield": "off",
    "typescript/no-non-null-asserted-optional-chain": "off",
  },
} satisfies OxlintConfig);
