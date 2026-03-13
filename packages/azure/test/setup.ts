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
 * Run an Effect with the shared TestLayer (Azure credentials + HTTP client).
 */
export const runEffect = <A, E>(
  effect: Effect.Effect<A, E, never>,
): Promise<A> =>
  Effect.runPromise(Effect.provide(effect, TestLayer) as Effect.Effect<A>);
