import { config } from "dotenv";
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { CredentialsFromEnv } from "../src/credentials";

// Load environment variables from .env file
config();

// Main layer providing credentials and HTTP client for all tests
export const TestLayer = Layer.merge(CredentialsFromEnv, FetchHttpClient.layer);

/**
 * Short random hex string generated once per test run.
 * Append this to resource names so parallel test runs don't collide.
 */
export const testRunId: string = crypto
  .randomUUID()
  .replace(/-/g, "")
  .slice(0, 8);

/**
 * Kubernetes namespace prefix for test resources.
 * Use `namespaceName(suffix)` to generate unique names.
 */
const TEST_PREFIX = "distilled-k8s";

/**
 * Generate a unique resource name for test resources.
 *
 * @example
 * ```ts
 * const ns = resourceName("pods"); // "distilled-k8s-pods-a1b2c3d4"
 * ```
 */
export const resourceName = (suffix: string): string =>
  `${TEST_PREFIX}-${suffix}-${testRunId}`;

/**
 * Helper to create a prefixed logger for test output.
 */
export const log = (prefix: string, message: string) => {
  process.stderr.write(`[${prefix}] ${message}\n`);
};

/**
 * Run an Effect with the TestLayer provided.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const runEffect = <A, E>(effect: Effect.Effect<A, E, any>): Promise<A> =>
  Effect.runPromise(
    effect.pipe(Effect.provide(TestLayer)) as Effect.Effect<A, E, never>,
  );
