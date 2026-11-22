import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * ApacheSupersetProtocol -- hand-written.
 *
 * Apache Superset speaks plain bearer-authenticated JSON REST (no response
 * envelope), so the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + instance origin
 *             (default http://localhost:8088), resolved from the calling
 *             fiber on every request. Spec paths already include `/api/v1`.
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ message?, message_text? }` bodies map
 *             to the operation's typed error classes by status, then the
 *             shared HTTP-status classes, then
 *             {@link UnknownApacheSupersetError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import {
  UnknownApacheSupersetError,
  ApacheSupersetParseError,
  type ApacheSupersetServiceError,
} from "./errors.ts";

/**
 * What every generated Apache Superset operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, ApacheSupersetOpError, ApacheSupersetOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type ApacheSupersetOpError =
  | ApacheSupersetServiceError
  | ErrorOf<typeof ApacheSupersetProtocol>;

/** Context (requirements) shared by every generated Apache Superset operation. */
export type ApacheSupersetOpContext = Credentials | HttpClient.HttpClient;

export const ApacheSupersetProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  unknownError: (info) => new UnknownApacheSupersetError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new ApacheSupersetParseError({ body, cause }),
});
