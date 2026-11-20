import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * ChronosphereProtocol -- hand-written.
 *
 * Chronosphere speaks token-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `API-Token` + `Authorization: Bearer <apiKey>`
 *             + optional `Chronosphere-Actor`, resolved from the calling
 *             fiber on every request. The instance origin is tenant-specific
 *             (`https://<instance>.chronosphere.io`).
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ code?, message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownChronosphereError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import {
  UnknownChronosphereError,
  ChronosphereParseError,
  type ChronosphereServiceError,
} from "./errors.ts";

/**
 * The errors declared on Chronosphere's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link ChronosphereParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownChronosphereError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type ChronosphereProtocolError =
  | RestProtocolError
  | ChronosphereParseError
  | UnknownChronosphereError;

/**
 * What every generated Chronosphere operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, ChronosphereOpError, ChronosphereOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type ChronosphereOpError =
  | ChronosphereServiceError
  | ChronosphereProtocolError
  | CredentialsError;

/** Context (requirements) shared by every generated Chronosphere operation. */
export type ChronosphereOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const ChronosphereProtocol: Protocol<
  ChronosphereProtocolError | CredentialsError,
  Credentials
> = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => {
    const token = Redacted.value(creds.apiKey);
    const headers: Record<string, string> = {
      "API-Token": token,
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
    if (creds.actor) headers["Chronosphere-Actor"] = creds.actor;
    return headers;
  },
  unknownError: (info) => new UnknownChronosphereError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new ChronosphereParseError({ body, cause }),
});
