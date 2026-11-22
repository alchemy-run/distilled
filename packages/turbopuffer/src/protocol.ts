import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * TurbopufferProtocol -- hand-written.
 *
 * turbopuffer speaks plain bearer-authenticated JSON REST (no response
 * envelope), so the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + base URL
 *             (default https://gcp-us-central1.turbopuffer.com), resolved
 *             from the calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ status: "error", error }` bodies map
 *             to the operation's typed error classes by status, then the
 *             shared HTTP-status classes, then {@link UnknownTurbopufferError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import {
  UnknownTurbopufferError,
  TurbopufferParseError,
  type TurbopufferServiceError,
} from "./errors.ts";

/**
 * What every generated turbopuffer operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, TurbopufferOpError, TurbopufferOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type TurbopufferOpError = TurbopufferServiceError | ErrorOf<typeof TurbopufferProtocol>;

/** Context (requirements) shared by every generated turbopuffer operation. */
export type TurbopufferOpContext = Credentials | HttpClient.HttpClient;

export const TurbopufferProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  // turbopuffer's error body is `{ status: "error", error: string }` -- the
  // factory's default lenient envelope maps `error` -> `message`.
  unknownError: (info) => new UnknownTurbopufferError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new TurbopufferParseError({ body, cause }),
});
