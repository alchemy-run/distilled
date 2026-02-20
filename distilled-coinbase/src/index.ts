/**
 * distilled-coinbase - An Effect-based TypeScript client for the Coinbase Developer Platform APIs.
 *
 * @example
 * ```ts
 * import { Effect } from "effect";
 * import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
 * import {
 *   listEvmAccounts,
 *   Credentials,
 *   CredentialsFromEnv,
 * } from "distilled-coinbase";
 *
 * const program = Effect.gen(function* () {
 *   const accounts = yield* listEvmAccounts({});
 *   console.log(accounts);
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
