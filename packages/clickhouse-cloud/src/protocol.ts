import type * as API from "@distilled.cloud/core/api";
import type { API_ERRORS, ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
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
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { ClickHouseCloudParseError, UnknownClickHouseCloudError } from "./errors.ts";

/**
 * Error channel shared by every generated ClickHouse Cloud operation: the
 * spec types failures only as a per-operation status list against one shared
 * envelope, so every operation can fail with any of core's status classes.
 * Generated service files annotate operations with `API.OperationMethod<I,
 * O, ClickHouseCloudOpError, ClickHouseCloudOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type ClickHouseCloudOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownClickHouseCloudError
  | ClickHouseCloudParseError
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated ClickHouse Cloud operation. */
export type ClickHouseCloudOpContext = Credentials | HttpClient.HttpClient;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const unwrapResult = (body: unknown): unknown =>
  isObject(body) && "result" in body ? body.result : body;

const makeProtocol = (unwrap: boolean): Layer.Layer<API.Protocol> =>
  makeRestProtocol<Config>({
    // Resolved on the CALLING fiber per request, so a key rotated between
    // calls is picked up without rebuilding the layer.
    credentials: Effect.flatMap(Credentials, (resolve) => resolve),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Basic ${Base64.encode(`${creds.keyId}:${Redacted.value(creds.keySecret)}`)}`,
    }),
    ...(unwrap ? { transformResponse: unwrapResult } : {}),
    unknownError: (info) => new UnknownClickHouseCloudError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new ClickHouseCloudParseError({ body, cause }),
  });

export const ClickHouseCloudProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeProtocol(true);

/** The protocol for cursor-paginated operations: the envelope stays whole. */
export const ClickHouseCloudPaginatedProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeProtocol(false);
