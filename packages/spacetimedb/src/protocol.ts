import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
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
import { Credentials } from "./credentials.ts";
import {
  UnknownSpacetimeDBError,
  SpacetimeDBParseError,
  type SpacetimeDBServiceError,
} from "./errors.ts";

/**
 * What every generated SpacetimeDB operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, SpacetimeDBOpError, SpacetimeDBOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type SpacetimeDBOpError = SpacetimeDBServiceError | ErrorOf<typeof SpacetimeDBProtocol>;

/** Context (requirements) shared by every generated SpacetimeDB operation. */
export type SpacetimeDBOpContext = Credentials | HttpClient.HttpClient;

export const SpacetimeDBProtocol = /*@__PURE__*/ restProtocol({
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
