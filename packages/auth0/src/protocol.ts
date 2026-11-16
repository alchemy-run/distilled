import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * Auth0Protocol -- hand-written.
 *
 * Auth0's Management API speaks plain bearer-authenticated JSON REST (no
 * response envelope), so the whole protocol is one `restProtocol` call
 * from `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <token>` + base URL
 *             (`https://{domain}/api/v2`), resolved from the calling fiber
 *             on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ statusCode?, error?, errorCode?,
 *             message }` bodies map to the operation's typed error classes
 *             by status, then the shared HTTP-status classes, then
 *             {@link UnknownAuth0Error}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownAuth0Error, Auth0ParseError, type Auth0ServiceError } from "./errors.ts";

/**
 * The errors declared on Auth0's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link Auth0ParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownAuth0Error}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type Auth0ProtocolError = RestProtocolError | Auth0ParseError | UnknownAuth0Error;

/**
 * What every generated Auth0 operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, Auth0OpError, Auth0OpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type Auth0OpError = Auth0ServiceError | Auth0ProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Auth0 operation. */
export type Auth0OpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const Auth0Protocol: Protocol<Auth0ProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.token)}`,
    }),
    // Auth0's error body is `{ statusCode?, error?, errorCode?, message }` --
    // the factory's default lenient envelope covers it.
    unknownError: (info) => new UnknownAuth0Error(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new Auth0ParseError({ body, cause }),
  });
