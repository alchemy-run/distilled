import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * ClickHouseCloudProtocol -- the shared REST protocol instantiated for the
 * ClickHouse Cloud API.
 *
 * request:  `Authorization: Basic base64(keyId:keySecret)` against the API
 *           origin (`https://api.clickhouse.cloud`), resolved from the
 *           calling fiber on every request. Operation paths carry `/v1`.
 *
 * response: every JSON success body is the `{ status, requestId, result }`
 *           envelope; {@link ClickHouseCloudProtocol} returns its `result`,
 *           the payload the generated output shapes model. A body with no
 *           `result` (a delete, which has no payload) and a bare array come
 *           back as read. A cursor page keeps its envelope, because the
 *           pagination strategy reads `nextCursor` beside `result`: the
 *           paginated operations use {@link ClickHouseCloudPaginatedProtocol}.
 *           The Prometheus endpoints answer `text/plain` and the Postgres CA
 *           certificate endpoint `application/x-pem-file`; the body comes
 *           back as that text.
 *
 *           Failures are `{ status, error, requestId }`; core's default
 *           envelope reader takes `error` as the message, and the status
 *           picks the class (core's `HTTP_STATUS_MAP`, then
 *           {@link UnknownClickHouseCloudError}).
 */
import * as Effect from "effect/Effect";
import * as Base64 from "effect/encoding/Base64";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import {
  ClickHouseCloudParseError,
  UnknownClickHouseCloudError,
  type ClickHouseCloudServiceError,
} from "./errors.ts";

/**
 * The errors declared on ClickHouse Cloud's protocol: what the code that
 * builds requests and reads responses fails with. A response that does not
 * match its schema ({@link ClickHouseCloudParseError}), a failed response that
 * neither the operation nor the service declares ({@link
 * UnknownClickHouseCloudError}), and core's REST errors (a bad path label, a
 * request that can't be built, the transport).
 */
export type ClickHouseCloudProtocolError =
  | RestProtocolError
  | ClickHouseCloudParseError
  | UnknownClickHouseCloudError;

/**
 * What every generated ClickHouse Cloud operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, ClickHouseCloudOpError,
 * ClickHouseCloudOpContext>` explicitly so the compiler never infers these
 * back out of the schema generics.
 */
export type ClickHouseCloudOpError =
  | ClickHouseCloudServiceError
  | ClickHouseCloudProtocolError
  | CredentialsError;

/** Context (requirements) shared by every generated ClickHouse Cloud operation. */
export type ClickHouseCloudOpContext = Credentials | HttpClient.HttpClient;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const unwrapResult = (body: unknown): unknown =>
  isObject(body) && "result" in body ? body.result : body;

// The annotation is the check: everything a protocol fails with, besides the
// errors an operation and the service declare, must be listed here.
const makeProtocol = (
  unwrap: boolean,
): Protocol<ClickHouseCloudProtocolError | CredentialsError, Credentials> =>
  restProtocol({
    // Resolved on the CALLING fiber per request, so a key rotated between
    // calls is picked up.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Basic ${Base64.encode(`${creds.keyId}:${Redacted.value(creds.keySecret)}`)}`,
    }),
    ...(unwrap ? { transformResponse: unwrapResult } : {}),
    unknownError: (info) => new UnknownClickHouseCloudError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new ClickHouseCloudParseError({ body, cause }),
  });

export const ClickHouseCloudProtocol: Protocol<
  ClickHouseCloudProtocolError | CredentialsError,
  Credentials
> = /*@__PURE__*/ makeProtocol(true);

/** The protocol for cursor-paginated operations: the envelope stays whole. */
export const ClickHouseCloudPaginatedProtocol: Protocol<
  ClickHouseCloudProtocolError | CredentialsError,
  Credentials
> = /*@__PURE__*/ makeProtocol(false);
