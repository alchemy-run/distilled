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

import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Console, Effect, FileSystem, Schema } from "effect";
import * as ChildProcess from "effect/unstable/process/ChildProcess";
import * as path from "node:path";
import * as url from "node:url";
import { startVitest } from "vitest/node";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

const SERVICES_PATH = "./src/services";
const TESTS_PATH = "./test";
const PATCHES_PATH = "./patch";

class VitestError extends Schema.TaggedErrorClass<VitestError>()(
  "VitestError",
  {
    cause: Schema.Unknown,
  },
) {}

// Parse CLI args manually (Effect 4 removed @effect/cli)
const parseArgs = (): {
  service: string | undefined;
  showChat: boolean;
  repairOnly: boolean;
} => {
  const args = process.argv.slice(2);
  let service: string | undefined;
  let showChat = false;
  let repairOnly = false;

  for (let i = 0; i < args.length; i++) {
    if ((args[i] === "--service" || args[i] === "-s") && args[i + 1]) {
      service = args[i + 1];
      i++;
    } else if (args[i] === "--show-chat") {
      showChat = true;
    } else if (args[i] === "--repair-only") {
      repairOnly = true;
    }
  }

  return { service, showChat, repairOnly };
};

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

const generateSdk = Effect.fn(function* () {
  yield* ChildProcess.make("bun", ["run", "generate"], {
    cwd: PROJECT_ROOT,
  }).pipe(ChildProcess.string());
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
    DONOTRUNTHENEWLYCREATEDTESTS.
    MAKE SURE TO WRITE HAPPY PATH TESTS FOR EVERY OPERATION.
  `;

  const result = yield* ChildProcess.make(
    "opencode",
    ["run", "--model", "anthropic/claude-opus-4-6", prompt],
    { cwd: PROJECT_ROOT },
  ).pipe(ChildProcess.string());

  if (showChat) {
    yield* Console.log(result);
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

  const result = yield* ChildProcess.make(
    "opencode",
    ["run", "--model", "anthropic/claude-sonnet-4-6", prompt],
    { cwd: PROJECT_ROOT },
  ).pipe(ChildProcess.string());

  if (showChat) {
    yield* Console.log(result);
  }
});

const repairTests = Effect.fn(function* (svc: string, showChat: boolean) {
  const testPath = path.join(PROJECT_ROOT, TESTS_PATH, `${svc}.test.ts`);

  const prompt = `
    Repair the tests for ${svc} service found at ${testPath}.
    Fix any tests that can be fixed by modifying the tests.
    WHEN CHECKING FOR ERRORS ALWAYS CHECK THE \`_tag\` MATCHES A KNOWN ERROR TAG, if not patch it.
    DO NOT MODIFY THE FILES IN THE src DIRECTORY DIRECTLY.
    DO NOT REMOVE HAPPY PATH TESTS
    if the test is broken write patch files and run \`bun generate --service ${svc}\` to regenerate the sdk with new errors.
    `;

  const result = yield* ChildProcess.make(
    "opencode",
    ["run", "--model", "anthropic/claude-opus-4-6", prompt],
    { cwd: PROJECT_ROOT },
  ).pipe(ChildProcess.string());

  if (showChat) {
    yield* Console.log(result);
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

const main = Effect.gen(function* () {
  const { service, showChat, repairOnly } = parseArgs();
  let services = yield* listServices;

  if (service) {
    services = filterServices(services, service);
    if (services.length === 0) {
      yield* Console.error(`No matching services found for: ${service}`);
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
});

main.pipe(Effect.provide(NodeServices.layer), NodeRuntime.runMain);
