import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * Questrade protocol -- the shared REST protocol with Questrade's auth.
 *
 * Every call goes to the API server the access token was issued for
 * (`api_server` from the token redemption, see credentials.ts) with
 * `Authorization: Bearer <access token>`; the operation routes carry their
 * `/v1` prefix.
 *
 * Responses are plain JSON with no success envelope. Failures are
 * `{ code, message }` with a numeric code; core's default error envelope
 * reads both, and the factory maps the status to core's shared classes, then
 * {@link UnknownQuestradeError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import {
  QuestradeParseError,
  UnknownQuestradeError,
  type QuestradeServiceError,
} from "./errors.ts";

/**
 * The errors declared on Questrade's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link QuestradeParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownQuestradeError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type QuestradeProtocolError =
  | RestProtocolError
  | QuestradeParseError
  | UnknownQuestradeError;

/**
 * What every generated Questrade operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, QuestradeOpError, QuestradeOpContext>` explicitly
 * so the compiler never infers these back out of the schema generics.
 */
export type QuestradeOpError = QuestradeServiceError | QuestradeProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Questrade operation. */
export type QuestradeOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const QuestradeProtocol: Protocol<QuestradeProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // Resolved on the calling fiber per request, so a refreshed token is picked
    // up.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiServer,
    headers: (creds) => ({ authorization: `Bearer ${Redacted.value(creds.accessToken)}` }),
    unknownError: (info) => new UnknownQuestradeError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new QuestradeParseError({ body, cause }),
  });
