import type * as API from "@distilled.cloud/core/api";
import type { API_ERRORS, ConfigError } from "@distilled.cloud/core/errors";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
/**
 * BoatProtocol — hand-written.
 *
 * Boat speaks bearer-authenticated JSON REST. Success bodies keep the
 * `{ ok, type, … }` envelope the spec documents; failures are
 * `{ ok: false, code, message, error, requestId }` — `code`/`message` sit
 * at the top level, which the factory's default envelope already reads.
 *
 *   request:  credentials → `Authorization: Bearer <apiKey>` + base URL
 *             (default https://boat.dev/api/v1), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx bodies map to the operation's typed
 *             error classes by status, then the shared HTTP-status
 *             classes, then {@link UnknownBoatError}.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import { Credentials, type Config } from "./credentials.ts";
import { UnknownBoatError } from "./errors.ts";

/**
 * Error channel shared by every generated Boat operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, BoatOpError,
 * BoatOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type BoatOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownBoatError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Boat operation. */
export type BoatOpContext = Credentials | HttpClient.HttpClient;

export const BoatProtocol: Layer.Layer<API.Protocol> = makeRestProtocol<Config>({
  // The Credentials service holds an effect — resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: Effect.gen(function* () {
    const resolve = yield* Credentials;
    return yield* resolve;
  }),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  unknownError: ({ code, message, body }) =>
    new UnknownBoatError({
      code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
      message,
      body,
    }),
});
