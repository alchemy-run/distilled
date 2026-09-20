/**
 * FreestyleProtocol — hand-written.
 *
 * Freestyle speaks bearer-authenticated JSON REST with no success envelope.
 * Failures are `{ code, message }` (`PublicErrorBody`) — `code`/`message`
 * sit at the top level, which the factory's default envelope already reads.
 *
 *   request:  credentials → `Authorization: Bearer <apiKey>` (and, when
 *             set, `x-freestyle-identity-access-token`) + base URL
 *             (default https://api.freestyle.sh), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx bodies map to the operation's typed
 *             error classes by status, then the shared HTTP-status
 *             classes, then {@link UnknownFreestyleError}.
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
import { UnknownFreestyleError } from "./errors.ts";

/**
 * Error channel shared by every generated Freestyle operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * FreestyleOpError, FreestyleOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type FreestyleOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownFreestyleError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Freestyle operation. */
export type FreestyleOpContext = Credentials | HttpClient.HttpClient;

export const FreestyleProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => {
      const headers: Record<string, string> = {
        Accept: "application/json",
      };
      if (creds.apiKey !== undefined) {
        headers.Authorization = `Bearer ${Redacted.value(creds.apiKey)}`;
      }
      if (creds.identityAccessToken !== undefined) {
        headers["x-freestyle-identity-access-token"] = Redacted.value(
          creds.identityAccessToken,
        );
      }
      return headers;
    },
    unknownError: ({ code, message, body }) =>
      new UnknownFreestyleError({
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
