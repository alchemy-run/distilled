import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * BoatProtocol -- hand-written.
 *
 * Boat speaks bearer-authenticated JSON REST. Success bodies keep the
 * `{ ok, type, ... }` envelope the spec documents; failures are
 * `{ ok: false, code, message, error, requestId }` -- `code`/`message` sit
 * at the top level, which the factory's default envelope already reads.
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + base URL
 *             (default https://boat.dev/api/v1) + `X-Boat-Org` when a
 *             default org is set, resolved from the calling fiber on
 *             every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx bodies map to the operation's typed
 *             error classes by status, then the shared HTTP-status
 *             classes, then {@link UnknownBoatError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownBoatError, BoatParseError, type BoatServiceError } from "./errors.ts";

/**
 * The errors declared on Boat's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link BoatParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownBoatError}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type BoatProtocolError = RestProtocolError | BoatParseError | UnknownBoatError;

/**
 * What every generated Boat operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, BoatOpError, BoatOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type BoatOpError = BoatServiceError | BoatProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Boat operation. */
export type BoatOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const BoatProtocol: Protocol<BoatProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
      ...(creds.org ? { "X-Boat-Org": creds.org } : {}),
    }),
    unknownError: (info) => new UnknownBoatError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new BoatParseError({ body, cause }),
  });
