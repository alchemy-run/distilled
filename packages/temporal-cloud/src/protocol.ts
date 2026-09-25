/**
 * TemporalCloudProtocol — hand-written.
 *
 * The Cloud Ops HTTP API speaks bearer-authenticated JSON REST (gRPC
 * transcoding, no response envelope), so the whole protocol is one
 * `makeRestProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials → `Authorization: Bearer <apiKey>` (+ the
 *             optional `temporal-cloud-api-version` header) and the base
 *             URL (default https://saas-api.tmprl.cloud), resolved from the
 *             calling fiber on every request.
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `google.rpc.Status` bodies
 *             (`{ code, message, details }`) map to the shared HTTP-status
 *             classes, then {@link UnknownTemporalCloudError}.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import type { API_ERRORS, ConfigError } from "@distilled.cloud/core/errors";
import { Credentials, type Config } from "./credentials.ts";
import { UnknownTemporalCloudError } from "./errors.ts";

/**
 * Error channel shared by every generated Temporal Cloud operation.
 * Generated service files annotate operations with
 * `API.OperationMethod<I, O, TemporalCloudOpError, TemporalCloudOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type TemporalCloudOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownTemporalCloudError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Temporal Cloud operation. */
export type TemporalCloudOpContext = Credentials | HttpClient.HttpClient;

export const TemporalCloudProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
      ...(creds.apiVersion
        ? { "temporal-cloud-api-version": creds.apiVersion }
        : {}),
    }),
    // google.rpc.Status is `{ code, message, details }` — the factory's
    // default lenient envelope covers it. `code` is the numeric gRPC code.
    unknownError: ({ code, message, body }) =>
      new UnknownTemporalCloudError({
        code:
          typeof code === "string"
            ? code
            : code !== undefined
              ? String(code)
              : undefined,
        message,
        body,
      }),
  });
