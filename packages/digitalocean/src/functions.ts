/**
 * DigitalOcean Functions (OpenWhisk) -- the API each Functions namespace
 * serves at its own `api_host`, generated from
 * `manual-specs/functions.openapi.json`.
 *
 * Provide `fromFunctionsKey({ apiHost, user, secret })` with a namespace
 * access key (`createFunctionsAccessKey`) or the namespace's `uuid` + `key`.
 *
 * @example
 * ```ts
 * import * as Functions from "@distilled.cloud/digitalocean/Functions";
 *
 * const result = yield* Functions.invokeAction({
 *   namespace: "fn-…",
 *   action_name: "hello",
 *   blocking: true,
 *   result: true,
 * }).pipe(Effect.provide(Functions.fromFunctionsKey({ apiHost, user, secret })));
 * ```
 */
export { FunctionsCredentials, fromFunctionsKey, type FunctionsConfig } from "./credentials.ts";
export { FunctionsProtocol, type FunctionsOpContext } from "./protocol.ts";
export * from "./services/functions.ts";
