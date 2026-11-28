import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
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
import { Credentials, formatHeaders } from "./credentials.ts";
import {
  UnknownRedisCloudError,
  RedisCloudParseError,
  type RedisCloudServiceError,
} from "./errors.ts";

/**
 * What every generated Redis Cloud operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, RedisCloudOpError, RedisCloudOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type RedisCloudOpError = RedisCloudServiceError | ErrorOf<typeof RedisCloudProtocol>;

/** Context (requirements) shared by every generated Redis Cloud operation. */
export type RedisCloudOpContext = Credentials | HttpClient.HttpClient;

export const RedisCloudProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => formatHeaders(creds),
  unknownError: (info) => new UnknownRedisCloudError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new RedisCloudParseError({ body, cause }),
});
