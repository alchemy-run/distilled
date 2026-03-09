import { config } from "dotenv";
import { Effect, Layer, Schedule } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { CredentialsFromEnv } from "../src/credentials";
import { createProject } from "../src/operations/createProject";
import { deleteProject } from "../src/operations/deleteProject";
import { listProjectOperations } from "../src/operations/listProjectOperations";

// Load environment variables from .env file
config();

// Main layer providing credentials and HTTP client for all tests
export const TestLayer = Layer.merge(CredentialsFromEnv, FetchHttpClient.layer);

const TEST_PROJECT_PREFIX = "distilled-test";

/**
 * Test project configuration
 */
export interface TestProjectConfig {
  readonly id: string;
  readonly name: string;
  readonly defaultBranchId: string;
  readonly defaultEndpointId?: string;
}

// Shared state for test projects, keyed by suffix
const testProjects: Map<string, TestProjectConfig> = new Map();

/**
 * Get the project name with optional suffix
 */
const getProjectName = (suffix?: string): string =>
  suffix ? `${TEST_PROJECT_PREFIX}-${suffix}` : TEST_PROJECT_PREFIX;

/**
 * Get the test project config. Throws if not initialized.
 * @param suffix - Optional suffix to identify the project (e.g., "branches")
 */
export const getTestProject = (suffix?: string): TestProjectConfig => {
  const key = suffix ?? "";
  const project = testProjects.get(key);
  if (!project) {
    const projectName = getProjectName(suffix);
    throw new Error(
      `Test project "${projectName}" not initialized. Call setupTestProject(${suffix ? `"${suffix}"` : ""}) in beforeAll.`,
    );
  }
  return project;
};

/**
 * Helper to create a prefixed logger for test output
 */
const log = (prefix: string, message: string) => {
  process.stderr.write(`[${prefix}] ${message}\n`);
};

/**
 * Wait for all pending operations on a project to complete
 */
const waitForOperations = (projectId: string, prefix: string) =>
  Effect.gen(function* () {
    log(prefix, "waiting for operations to complete...");

    yield* Effect.retry(
      listProjectOperations({ project_id: projectId, limit: 10 }).pipe(
        Effect.flatMap((result) => {
          const pendingOps = result.operations.filter(
            (op) => op.status === "running" || op.status === "scheduling",
          );
          if (pendingOps.length > 0) {
            log(prefix, `${pendingOps.length} operations still pending...`);
            return Effect.fail({ _tag: "OperationsPending" as const });
          }
          return Effect.succeed(result);
        }),
      ),
      {
        schedule: Schedule.both(
          Schedule.recurs(60),
          Schedule.spaced("5 seconds"),
        ),
        while: (e) =>
          typeof e === "object" &&
          e !== null &&
          "_tag" in e &&
          e._tag === "OperationsPending",
      },
    );

    log(prefix, "all operations complete!");
  });

/**
 * Setup the test project. Call this in beforeAll.
 * Creates the project if it doesn't exist and waits for it to be ready.
 * @param suffix - Optional suffix to identify the project (e.g., "branches" -> "distilled-test-branches")
 */
export const setupTestProject = (suffix?: string) =>
  Effect.gen(function* () {
    const projectName = getProjectName(suffix);
    const prefix = suffix ?? "default";

    log(prefix, "creating project...");

    const created = yield* createProject({
      project: {
        name: projectName,
      },
    });

    log(prefix, `created project: id=${created.project.id}`);

    // Wait for operations to complete
    yield* waitForOperations(created.project.id, prefix);

    // Get the default branch
    const defaultBranch = created.branch;
    const defaultEndpoint = created.endpoints?.[0];

    log(
      prefix,
      `project ready! branch=${defaultBranch.id}, endpoint=${defaultEndpoint?.id ?? "none"}`,
    );

    const projectConfig: TestProjectConfig = {
      id: created.project.id,
      name: projectName,
      defaultBranchId: defaultBranch.id,
      defaultEndpointId: defaultEndpoint?.id,
    };
    testProjects.set(suffix ?? "", projectConfig);
    return projectConfig;
  }).pipe(Effect.provide(TestLayer));

/**
 * Teardown the test project. Call this in afterAll.
 * @param suffix - Optional suffix to identify the project (e.g., "branches")
 */
export const teardownTestProject = (suffix?: string) =>
  Effect.gen(function* () {
    const key = suffix ?? "";
    const project = testProjects.get(key);
    if (!project) return;

    const prefix = suffix ?? "default";
    log(prefix, "deleting project...");
    yield* deleteProject({
      project_id: project.id,
    }).pipe(Effect.ignore);
    log(prefix, "done");

    testProjects.delete(key);
  }).pipe(Effect.provide(TestLayer));

/**
 * Run an Effect with the TestLayer provided.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const runEffect = <A, E>(effect: Effect.Effect<A, E, any>): Promise<A> =>
  Effect.runPromise(
    effect.pipe(Effect.provide(TestLayer)) as Effect.Effect<A, E, never>,
  );
