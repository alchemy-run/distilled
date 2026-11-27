import { toBase64 } from "@distilled.cloud/core/base64";
import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
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
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import {
  ClickHouseCloudParseError,
  UnknownClickHouseCloudError,
  type ClickHouseCloudServiceError,
} from "./errors.ts";

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
  | ErrorOf<typeof ClickHouseCloudProtocol | typeof ClickHouseCloudPaginatedProtocol>;

/** Context (requirements) shared by every generated ClickHouse Cloud operation. */
export type ClickHouseCloudOpContext = Credentials | HttpClient.HttpClient;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const unwrapResult = (body: unknown): unknown =>
  isObject(body) && "result" in body ? body.result : body;

const makeProtocol = (unwrap: boolean) =>
  restProtocol({
    // Resolved on the CALLING fiber per request, so a key rotated between
    // calls is picked up.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Basic ${toBase64(`${creds.keyId}:${Redacted.value(creds.keySecret)}`)}`,
    }),
    ...(unwrap ? { transformResponse: unwrapResult } : {}),
    unknownError: (info) => new UnknownClickHouseCloudError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new ClickHouseCloudParseError({ body, cause }),
  });

export const ClickHouseCloudProtocol = /*@__PURE__*/ makeProtocol(true);

/** The protocol for cursor-paginated operations: the envelope stays whole. */
export const ClickHouseCloudPaginatedProtocol = /*@__PURE__*/ makeProtocol(false);
