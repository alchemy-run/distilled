import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * RedisCloudProtocol -- hand-written.
 *
 * Redis Cloud speaks plain JSON REST (no response envelope), authenticated
 * with account + user API key headers, so the whole protocol is one
 * `restProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials -> `x-api-key` + `x-api-secret-key` (+ optional
 *             `x-auth-token`) + base URL (default https://api.redislabs.com),
 *             resolved from the calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ error?, message? }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownRedisCloudError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import { Credentials, formatHeaders, type CredentialsError } from "./credentials.ts";
import {
  UnknownRedisCloudError,
  RedisCloudParseError,
  type RedisCloudServiceError,
} from "./errors.ts";

/**
 * The errors declared on Redis Cloud's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link RedisCloudParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownRedisCloudError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type RedisCloudProtocolError =
  | RestProtocolError
  | RedisCloudParseError
  | UnknownRedisCloudError;

/**
 * What every generated Redis Cloud operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, RedisCloudOpError, RedisCloudOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type RedisCloudOpError = RedisCloudServiceError | RedisCloudProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Redis Cloud operation. */
export type RedisCloudOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const RedisCloudProtocol: Protocol<RedisCloudProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => formatHeaders(creds),
    unknownError: (info) => new UnknownRedisCloudError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new RedisCloudParseError({ body, cause }),
  });
