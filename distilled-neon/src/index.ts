/**
 * distilled-neon - An Effect-based TypeScript client for the Neon API.
 *
 * @example
 * ```ts
 * import { Effect } from "effect";
 * import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
 * import {
 *   getProject,
 *   Credentials,
 *   CredentialsFromEnv,
 * } from "distilled-neon";
 *
 * const program = Effect.gen(function* () {
 *   const project = yield* getProject({ project_id: "my-project-id" });
 *   console.log(project);
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
