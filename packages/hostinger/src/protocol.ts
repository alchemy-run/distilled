import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * HostingerProtocol -- hand-written.
 *
 * Hostinger speaks plain bearer-authenticated JSON REST (no response
 * envelope), so the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + base URL
 *             (default https://developers.hostinger.com), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ message, correlation_id? }` bodies map
 *             to the operation's typed error classes by status, then the
 *             shared HTTP-status classes, then {@link UnknownHostingerError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import {
  UnknownHostingerError,
  HostingerParseError,
  type HostingerServiceError,
} from "./errors.ts";

/**
 * The errors declared on Hostinger's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link HostingerParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownHostingerError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type HostingerProtocolError =
  | RestProtocolError
  | HostingerParseError
  | UnknownHostingerError;

/**
 * What every generated Hostinger operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, HostingerOpError, HostingerOpContext>` explicitly
 * so the compiler never infers these back out of the schema generics.
 */
export type HostingerOpError = HostingerServiceError | HostingerProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Hostinger operation. */
export type HostingerOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const HostingerProtocol: Protocol<HostingerProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    // Hostinger's error body is `{ message: string, correlation_id?: string }`
    // -- the factory's default lenient envelope covers `message`.
    unknownError: (info) => new UnknownHostingerError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new HostingerParseError({ body, cause }),
  });
