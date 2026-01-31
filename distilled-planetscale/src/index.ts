/**
 * distilled-planetscale - An Effect-based TypeScript client for the PlanetScale API.
 *
 * @example
 * ```ts
 * import { Effect } from "effect";
 * import { FetchHttpClient } from "@effect/platform";
 * import {
 *   getOrganization,
 *   PlanetScaleCredentials,
 *   CredentialsFromEnv,
 * } from "distilled-planetscale";
 *
 * const program = Effect.gen(function* () {
 *   const { organization } = yield* PlanetScaleCredentials;
 *   const org = yield* getOrganization({ organization });
 *   console.log(org);
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
export * from "./errors";
export * from "./credentials";
export * from "./client";
export * from "./pagination";
export * from "./sensitive";

// Namespace exports
export * as Category from "./category";
export * as Retry from "./retry";
export * as Traits from "./traits";
export * as T from "./traits";

// All operations
export * from "./operations";
