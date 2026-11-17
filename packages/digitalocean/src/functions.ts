/**
 * DigitalOcean Functions (OpenWhisk) -- the API each Functions namespace
 * serves at its own `api_host`, generated from Apache OpenWhisk's
 * `apiv1swagger.json` (`specs/openwhisk.json` in the DigitalOcean mirror).
 *
 * Provide `fromFunctionsKey({ apiHost, user, secret })` with a namespace
 * access key (`createFunctionsAccessKey`) or the namespace's `uuid` + `key`.
 *
 * @example
 * ```ts
 * import * as Functions from "@distilled.cloud/digitalocean/Functions";
 *
 * const result = yield* Functions.invokeAction({
 *   namespace: "fn-...",
 *   actionName: "hello",
 *   blocking: true,
 *   params: { name: "World" },
 * }).pipe(Effect.provide(Functions.fromFunctionsKey({ apiHost, user, secret })));
 * ```
 */
export { FunctionsCredentials, fromFunctionsKey, type FunctionsConfig } from "./credentials.ts";
export { FunctionsProtocol, type FunctionsOpContext } from "./protocol.ts";
export * from "./services/functions.ts";
