/**
 * distilled-prisma-postgres - An Effect-based TypeScript client for the Prisma Postgres Management API.
 *
 * @example
 * ```ts
 * import { Effect } from "effect";
 * import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
 * import {
 *   getV1Projects,
 *   Credentials,
 *   CredentialsFromEnv,
 * } from "distilled-prisma-postgres";
 *
 * const program = Effect.gen(function* () {
 *   const projects = yield* getV1Projects({});
 *   console.log(projects);
 * }).pipe(
 *   Effect.provide(CredentialsFromEnv),
 *   Effect.provide(FetchHttpClient.layer),
 * );
 *
 * Effect.runPromise(program);
 * ```
 *
 * @module
 */

// Core modules
export * from "./client";
export * from "./credentials";
export * from "./errors";
export * from "./pagination";
export * from "./sensitive";

// Namespace exports
export * as Category from "./category";
export * as Retry from "./retry";
export * as Traits from "./traits";

// All operations
export * from "./operations";
