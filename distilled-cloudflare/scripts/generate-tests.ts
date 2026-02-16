#!/usr/bin/env bun
/**
 * Generate test skeletons for Cloudflare service operations.
 *
 * Usage:
 *   bun scripts/generate-tests.ts                        # Process all services
 *   bun scripts/generate-tests.ts --service r2            # Single service
 *   bun scripts/generate-tests.ts -s r2,workers,queues    # Multiple services
 *   bun scripts/generate-tests.ts --repair-only           # Only run post-generation steps (repairTests)
 *   bun scripts/generate-tests.ts -s r2 --repair-only     # Repair only for specific service(s)
 */

import { Command as CliCommand, Options } from "@effect/cli";
import { Command, FileSystem } from "@effect/platform";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Console, Effect, Logger, LogLevel, Schema } from "effect";
import * as path from "node:path";
import * as url from "node:url";
import { startVitest } from "vitest/node";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

const SERVICES_PATH = "./src/services";
const TESTS_PATH = "./test";
const PATCHES_PATH = "./patch";

class VitestError extends Schema.TaggedError<VitestError>()("VitestError", {
  cause: Schema.Unknown,
}) {}

/**
 * List all service files in the services directory.
 * Returns just the service name (without extension).
 */
const listServices = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const entries = yield* fs.readDirectory(SERVICES_PATH);
  return entries
    .filter((f) => f.endsWith(".ts"))
    .map((f) => f.replace(/\.ts$/, ""))
    .sort();
});

/**
 * Filter services by a comma-separated list of names.
 */
const filterServices = (services: string[], filter: string): string[] => {
  const allowed = new Set(filter.split(",").map((s) => s.trim().toLowerCase()));
  return services.filter((s) => allowed.has(s.toLowerCase()));
};

// CLI Options
const serviceOption = Options.text("service").pipe(
  Options.withAlias("s"),
  Options.withDescription(
    "Comma-separated list of services to process (e.g., r2,workers,queues)",
  ),
  Options.optional,
);

const showChatOption = Options.boolean("show-chat").pipe(
  Options.withDescription("Stream opencode output directly to the terminal"),
  Options.withDefault(false),
);

const repairOnlyOption = Options.boolean("repair-only").pipe(
  Options.withDescription(
    "Skip generation and testing, only run post-generation steps (e.g. repairTests)",
  ),
  Options.withDefault(false),
);

const command = CliCommand.make(
  "generate-tests",
  {
    service: serviceOption,
    showChat: showChatOption,
    repairOnly: repairOnlyOption,
  },
  ({ service, showChat, repairOnly }) =>
    Effect.gen(function* () {
      let services = yield* listServices;

      if (service._tag === "Some") {
        services = filterServices(services, service.value);
        if (services.length === 0) {
          yield* Console.error(
            `No matching services found for: ${service.value}`,
          );
          return;
        }
        yield* Console.log(
          `Filtering to ${services.length} service(s): ${services.join(", ")}`,
        );
      } else {
        yield* Console.log(`Found ${services.length} services`);
      }

      if (!repairOnly) {
        const fs = yield* FileSystem.FileSystem;

        yield* Effect.forEach(
          services,
          Effect.fn(function* (svc) {
            yield* Console.log(`[${svc}] Generating tests`);
            yield* generateTests(svc, showChat);
            yield* Console.log(`[${svc}] Running tests`);
            const testResults = yield* runVitest(svc);
            const outPath = path.join(
              PROJECT_ROOT,
              TESTS_PATH,
              `${svc}-test-errors.temp.json`,
            );
            yield* fs.writeFileString(
              outPath,
              JSON.stringify(testResults, null, 2) + "\n",
            );
            yield* Console.log(`[${svc}] Wrote test results to ${outPath}`);
            yield* Console.log(`[${svc}] Updating errors`);
            yield* updateErrors(svc, showChat);
            yield* Console.log(`[${svc}] Removing temp test results`);
            yield* fs.remove(outPath);
          }),
          {
            concurrency: "unbounded",
          },
        );

        yield* generateSdk();
      } else {
        yield* Console.log("Skipping generation and testing (--repair-only)");
      }

      yield* Effect.forEach(
        services,
        Effect.fn(function* (svc) {
          yield* repairTests(svc, showChat);
        }),
        {
          concurrency: "unbounded",
        },
      );
    }),
);

const generateSdk = Effect.fn(function* () {
  const cmd = Command.make("bun", "run", "generate").pipe(
    Command.stdin("inherit"),
    Command.workingDirectory(PROJECT_ROOT),
  );

  yield* cmd.pipe(
    Command.stdout("inherit"),
    Command.stderr("inherit"),
    Command.exitCode,
  );
});

const generateTests = Effect.fn(function* (svc: string, showChat: boolean) {
  const filePath = path.join(SERVICES_PATH, `${svc}.ts`);
  const testPath = path.join(TESTS_PATH, `${svc}.test.ts`);

  const prompt = `
    Generate tests for the ${filePath} service at ${testPath}.

    First, list every public operation in the service.

    For each operation, write happy path tests that call the operation with valid input and use expect() assertions to verify the response shape, status, and returned data.

    Then, for each operation, list every way it could fail — use the categories below as a minimum, but include any additional failure modes specific to that operation:
    - Invalid/missing required parameters
    - Malformed input types (wrong type, empty string, null, undefined)
    - Not found (404) responses
    - Conflict/duplicate resource errors
    - Validation errors from the API
    - Unexpected response shapes / malformed responses
    - Edge cases (empty arrays, max length strings, special characters)

    Each error category should have its own separate test case.
    Error tests should call the operation with bad input and let the resulting error propagate uncaught (no try/catch, no .catch(), no expect().toThrow(), no Effect.flip()).

    Make sure all tests clean up after themselves even if they fail. This means deleting any resources that were created.

    Before writing any tests, read the existing test file at ${testPath} (if it exists).
    Identify which operations are missing:
    - At least one happy path test with expect() assertions
    - Test coverage for each applicable error category
    Only add tests for gaps found above.
    If all operations have both happy path and error coverage, make no changes.

    DO NOT MODIFY EXISTING TESTS, but more tests can be added to test files.
    DO NOT RUN THE NEWLY CREATED TESTS.
  `;
  const cmd = Command.make(
    "opencode",
    "run",
    "--model",
    "anthropic/claude-opus-4-6",
    prompt,
  ).pipe(Command.stdin("inherit"), Command.workingDirectory(PROJECT_ROOT));

  if (showChat) {
    yield* cmd.pipe(
      Command.stdout("inherit"),
      Command.stderr("inherit"),
      Command.exitCode,
    );
  } else {
    const output = yield* cmd.pipe(Command.string);
    yield* Console.log(output);
  }
});

const updateErrors = Effect.fn(function* (svc: string, showChat: boolean) {
  const testResultPath = path.join(
    PROJECT_ROOT,
    TESTS_PATH,
    `${svc}-test-errors.temp.json`,
  );
  const patchPath = path.join(PROJECT_ROOT, PATCHES_PATH, svc);

  const prompt = `
    Use \`bun -e\` to read and parse ${testResultPath}. Extract only the failed tests along with their fullName and errors array — do not read the raw JSON file into context.

    For each failed test:
    1. Identify which operation it belongs to from the test's implementation or fullName (the second segment, e.g. "KV > updateNamespace > ..." means the operation is "updateNamespace")
    2. Derive a PascalCase error name from the test name and error details (e.g. "error - non-existent namespace ID" with code 10013 → "NamespaceNotFound")

    Then, group all errors by operation and write a patch file for each operation at ${patchPath}/{operationName}.json in this format:

    {
      "errors": {
        "ErrorName": [{ "code": <number> }],
        "AnotherError": [{ "code": <number> }]
      }
    }

    Rules for deriving error names:
    - Use PascalCase (e.g. NamespaceNotFound, InvalidInput, DuplicateResource)
    - Names should describe the error condition, not the test setup
    - Prefer concise, API-style names (like AWS SDK error names)
    - If multiple tests for the same operation produce the same error code, deduplicate them

    Update the tests to expect the newly created errors.
    If there are error tests that actually pass before the changes just update the test as a happy path test.

    Only create patch files for operations that had at least one failed test.
    DO NOT MODIFY ANY EXISTING FILES IN src.`;
  const cmd = Command.make(
    "opencode",
    "run",
    "--model",
    "opencode/minimax-m2.5",
    prompt,
  ).pipe(Command.stdin("inherit"), Command.workingDirectory(PROJECT_ROOT));

  if (showChat) {
    yield* cmd.pipe(
      Command.stdout("inherit"),
      Command.stderr("inherit"),
      Command.exitCode,
    );
  } else {
    const output = yield* cmd.pipe(Command.string);
    yield* Console.log(output);
  }
});

const repairTests = Effect.fn(function* (svc: string, showChat: boolean) {
  const testPath = path.join(PROJECT_ROOT, TESTS_PATH, `${svc}.test.ts`);

  const prompt = `
    Repair the tests for ${svc} service found at ${testPath}.
    Fix any tests that can be fixed by modifying the tests.
    DO NOT FIX TESTS THAT ARE BROKEN BECAUSE THE SDK ITSELF IS BROKEN; just let those fail don't skip them.
    WHEN CHECKING FOR ERRORS ALWAYS CHECK THE \`_tag\`.
    DO NOT MODIFY THE FILES IN THE src DIRECTORY DIRECTLY.
    you are allowed to write patch files and run \`bun generate --service ${svc}\` to regenerate the sdk with new errors.
    `;
  const cmd = Command.make(
    "opencode",
    "run",
    "--model",
    "opencode/kimi-k2.5",
    // "--model",
    // "anthropic/claude-haiku-4-5",
    prompt,
  ).pipe(Command.stdin("inherit"), Command.workingDirectory(PROJECT_ROOT));

  if (showChat) {
    yield* cmd.pipe(
      Command.stdout("inherit"),
      Command.stderr("inherit"),
      Command.exitCode,
    );
  } else {
    const output = yield* cmd.pipe(Command.string);
    yield* Console.log(output);
  }
});

const runVitest = Effect.fn(function* (svc: string) {
  const vitest = yield* Effect.tryPromise({
    try: () =>
      startVitest(
        "test",
        [path.join(PROJECT_ROOT, TESTS_PATH, `${svc}.test.ts`)],
        { watch: false },
      ),
    catch: (e) => new VitestError({ cause: e }),
  });

  if (!vitest) {
    yield* Console.error(`Vitest failed to start for ${svc}`);
    return [];
  }

  // In Vitest 4.x, use state.getTestModules() and iterate test cases
  const testModules = vitest.state.getTestModules();

  interface ErrorInfo {
    _tag?: string;
    code?: number;
    message: string;
    status?: number;
  }

  interface TestResult {
    name: string;
    fullName: string;
    state: string;
    errors?: Array<ErrorInfo>;
  }

  /**
   * Extract the inner error from a serialized TestError.
   *
   * Effect.runPromise wraps failures in FiberFailure, so the serialized
   * structure from toJSON() is:
   *   { _id: "FiberFailure", cause: { _tag: "Fail", failure: { _tag, code, message, ... } } }
   *
   * We dig through that to pull out the actual error info.
   */
  const extractError = (e: Record<string, unknown>): ErrorInfo => {
    // Try to reach the Effect failure inside FiberFailure → Cause → failure
    const cause = e["cause"] as Record<string, unknown> | undefined;
    const failure = cause?.["failure"] as Record<string, unknown> | undefined;

    if (failure && typeof failure["_tag"] === "string") {
      return {
        _tag: failure["_tag"] as string,
        code: failure["code"] as number | undefined,
        message: (failure["message"] as string) ?? e["message"] ?? "",
        status: failure["status"] as number | undefined,
      };
    }

    // Fallback: not an Effect FiberFailure, use top-level fields
    return {
      _tag: e["_tag"] as string | undefined,
      code: e["code"] as number | undefined,
      message: (e["message"] as string) ?? "",
      status: e["status"] as number | undefined,
    };
  };

  const results: Array<TestResult> = [];

  for (const mod of testModules) {
    for (const testCase of mod.children.allTests()) {
      const result = testCase.result();
      results.push({
        name: testCase.name,
        fullName: testCase.fullName,
        state: result.state,
        errors: result.errors?.map(extractError),
      });
    }
  }

  return results;
});

// Run the command
const cli = CliCommand.run(command, {
  name: "generate-tests",
  version: "1.0.0",
});

Effect.suspend(() => cli(process.argv)).pipe(
  Effect.provide(NodeContext.layer),
  Logger.withMinimumLogLevel(LogLevel.Info),
  NodeRuntime.runMain,
);
