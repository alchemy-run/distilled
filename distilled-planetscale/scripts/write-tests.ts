import { Effect } from "effect";
import { spawn } from "child_process";
import { parseArgs } from "util";

const TODO_FILE_PATH = "todo-tests.md";

/**
 * Reads todo-tests.md and returns an array of unchecked operation names
 */
export const getUncheckedOperations = Effect.gen(function* () {
  const file = Bun.file(TODO_FILE_PATH);
  const content = yield* Effect.tryPromise(() => file.text());

  const lines = content.split("\n");
  const uncheckedOperations: string[] = [];

  for (const line of lines) {
    // Match unchecked items (- [ ] operationName)
    const uncheckedMatch = line.match(/^-\s+\[\s\]\s+(\w+)$/);
    if (uncheckedMatch) {
      const operation = uncheckedMatch[1];
      if (operation) {
        uncheckedOperations.push(operation);
      }
    }
  }

  return uncheckedOperations;
});

/**
 * Marks an operation as complete in todo-tests.md
 */
export const markOperationComplete = (operationName: string) =>
  Effect.gen(function* () {
    const file = Bun.file(TODO_FILE_PATH);
    const content = yield* Effect.tryPromise(() => file.text());

    // Replace "- [ ] operationName" with "- [x] operationName"
    const updated = content.replace(
      new RegExp(`^(- \\[) (\\] ${operationName})$`, "m"),
      "$1x$2",
    );

    yield* Effect.tryPromise(() => Bun.write(TODO_FILE_PATH, updated));
  });

/**
 * Commits all changes with a message for the given operation
 */
export const commitOperation = (operationName: string) =>
  Effect.async<void, Error>((resume) => {
    const child = spawn("git", ["add", "-A"], {
      stdio: ["inherit", "inherit", "inherit"],
    });

    child.on("error", (err) => resume(Effect.fail(err)));
    child.on("close", (code) => {
      if (code !== 0) {
        resume(Effect.fail(new Error(`git add exited with code ${code}`)));
        return;
      }

      const commitChild = spawn(
        "git",
        ["commit", "-m", `chore(tests): test for ${operationName}`],
        { stdio: ["inherit", "inherit", "inherit"] },
      );

      commitChild.on("error", (err) => resume(Effect.fail(err)));
      commitChild.on("close", (commitCode) => {
        if (commitCode === 0) {
          resume(Effect.succeed(undefined));
        } else {
          resume(
            Effect.fail(new Error(`git commit exited with code ${commitCode}`)),
          );
        }
      });
    });
  });

/**
 * Spawns an opencode instance to write a test for the given operation.
 * Output is streamed to the console.
 */
export const writeTestForOperation = (operationName: string) =>
  Effect.async<void, Error>((resume) => {
    const prompt = `Write a test for the "${operationName}" operation.

IMPORTANT:
- Follow the test patterns in AGENTS.md
- This project uses GLOBAL error classes (NotFound, Forbidden, Unauthorized, etc.) from src/errors.ts
- Do NOT import per-operation error classes - they don't exist
- Import global errors like: import { NotFound, Forbidden } from "../src/errors";
- Make sure to clean up any resources created during the test using Effect.ensuring
- Use unique names with timestamps for any resources created
- Test both success cases and error handling
- After writing the test, run it to verify it works
- DO NOT run the test
- DO NOT run the test
- DO NOT run the test
- DO NOT run the test
- BE SURE TO CLEAN UP ALL RESOURCES CREATED DURING THE TEST

ERROR HANDLING PATTERN:
\`\`\`typescript
import { NotFound, Forbidden } from "../src/errors";

// For error tests, check for global error types:
const isExpectedError = result instanceof NotFound || result instanceof Forbidden;
expect(isExpectedError).toBe(true);
if (result instanceof NotFound) {
  expect(result._tag).toBe("NotFound");
  expect(result.message).toBeDefined();
}
\`\`\`

TEST DATABASE HELPERS:
If the operation requires a database (e.g., branches, passwords, deploy requests), use the test database helpers from tests/helpers.ts:

\`\`\`typescript
import { layer } from "@effect/vitest";
import { Effect } from "effect";
import { expect } from "vitest";
import { MySqlTestDatabaseLive, MySqlTestDatabase } from "./helpers";

layer(MySqlTestDatabaseLive)("operationName", (it) => {
  it.effect("should work with test database", () =>
    Effect.gen(function* () {
      const db = yield* MySqlTestDatabase;
      const result = yield* someOperation({
        organization: db.organization,
        database: db.name,
      });
      expect(result).toBeDefined();
    })
  );
});
\`\`\`

Available helpers:
- MySqlTestDatabaseLive / MySqlTestDatabase - for MySQL database operations
- PostgresTestDatabaseLive / PostgresTestDatabase - for PostgreSQL database operations

Use withMainLayer (from ./setup) for simple operations that don't need a database.
Use layer(MySqlTestDatabaseLive) or layer(PostgresTestDatabaseLive) for operations that require a database.

Look at existing tests in the tests/ directory for examples (especially getOrganization.test.ts and listDatabases.test.ts).`;

    const child = spawn(
      "opencode",
      ["run", "-m", "anthropic/claude-opus-4-5", prompt],
      {
        stdio: ["inherit", "inherit", "inherit"],
        shell: true,
      },
    );

    child.on("error", (err) => {
      resume(Effect.fail(err));
    });

    child.on("close", (code) => {
      if (code === 0) {
        resume(Effect.succeed(undefined));
      } else {
        resume(Effect.fail(new Error(`opencode exited with code ${code}`)));
      }
    });
  });

// Main entry point
async function main() {
  const { values } = parseArgs({
    args: Bun.argv.slice(2),
    options: {
      limit: {
        type: "string",
        short: "l",
      },
    },
  });

  const limit = values.limit ? parseInt(values.limit, 10) : undefined;

  const program = Effect.gen(function* () {
    const allOperations = yield* getUncheckedOperations;
    const operations = limit ? allOperations.slice(0, limit) : allOperations;
    const total = allOperations.length;

    console.log(`Found ${total} unchecked operations`);
    if (limit) {
      console.log(`Limiting to ${limit} operation(s)`);
    }

    for (let i = 0; i < operations.length; i++) {
      const operation = operations[i]!;
      console.log("\n" + "=".repeat(60));
      console.log(`OPERATION ${i + 1}/${operations.length}: ${operation}`);
      console.log("=".repeat(60) + "\n");

      yield* writeTestForOperation(operation);
      yield* markOperationComplete(operation);
      console.log(`Marked ${operation} as complete in ${TODO_FILE_PATH}`);
      yield* commitOperation(operation);
      console.log(`Committed changes for ${operation}`);
    }

    console.log("\n" + "=".repeat(60));
    console.log("ALL OPERATIONS COMPLETE");
    console.log("=".repeat(60) + "\n");
  });

  await Effect.runPromise(program);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
