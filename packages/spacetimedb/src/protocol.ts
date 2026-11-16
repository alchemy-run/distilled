import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * SpacetimeDBProtocol -- hand-written.
 *
 * SpacetimeDB speaks bearer-authenticated JSON REST (no response envelope),
 * with optional anonymous access when no token is configured:
 *
 *   request:  credentials -> `Authorization: Bearer <token>` when the token
 *             is non-empty + base URL (default
 *             https://maincloud.spacetimedb.com), resolved from the calling
 *             fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-JSON 2xx (logs, PEM, identity hex) is the
 *             raw text; non-2xx bodies map to the operation's typed error
 *             classes by status, then the shared HTTP-status classes, then
 *             {@link UnknownSpacetimeDBError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import {
  UnknownSpacetimeDBError,
  SpacetimeDBParseError,
  type SpacetimeDBServiceError,
} from "./errors.ts";

/**
 * The errors declared on SpacetimeDB's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link SpacetimeDBParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownSpacetimeDBError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type SpacetimeDBProtocolError =
  | RestProtocolError
  | SpacetimeDBParseError
  | UnknownSpacetimeDBError;

/**
 * What every generated SpacetimeDB operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, SpacetimeDBOpError, SpacetimeDBOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type SpacetimeDBOpError =
  | SpacetimeDBServiceError
  | SpacetimeDBProtocolError
  | CredentialsError;

/** Context (requirements) shared by every generated SpacetimeDB operation. */
export type SpacetimeDBOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const SpacetimeDBProtocol: Protocol<
  SpacetimeDBProtocolError | CredentialsError,
  Credentials
> = /*@__PURE__*/ restProtocol({
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds): Record<string, string> => {
    const headers: Record<string, string> = {};
    const token = Redacted.value(creds.apiKey);
    if (token !== "") {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  },
  unknownError: (info) => new UnknownSpacetimeDBError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new SpacetimeDBParseError({ body, cause }),
});
