import type * as API from "@distilled.cloud/core/api";
import type { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { HTTP_STATUS_MAP } from "@distilled.cloud/core/errors";
import { makeRestProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * TinybirdProtocol -- the shared bearer-REST protocol instantiated for
 * Tinybird.
 *
 * Tinybird speaks plain JSON with no success envelope; a failure is
 * `{ "error": "<message>" }`, which the factory's default extractor reads.
 * The API version is part of each route (`/v0/...`), and the host is the
 * workspace region's (see credentials.ts).
 *
 * Non-JSON bodies follow the operation's model: the data endpoints
 * (`queryPipe`, `querySql`, ...) answer in the format the caller picks and
 * return the raw bytes, and a JSON body the reference does not type comes
 * back as read.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { TinybirdParseError, UnknownTinybirdError, type DefaultErrors } from "./errors.ts";

/**
 * Error channel shared by every generated Tinybird operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * TinybirdOpError, TinybirdOpContext>` explicitly.
 */
export type TinybirdOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated Tinybird operation. */
export type TinybirdOpContext = Credentials | HttpClient.HttpClient;

export const TinybirdProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<Config>({
  // Resolved on the calling fiber per request, so a rotated token is
  // picked up without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  baseUrl: (creds) => creds.apiBaseUrl.replace(/\/+$/, ""),
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.token)}`,
  }),
  statusMap: HTTP_STATUS_MAP,
  unknownError: (info) => new UnknownTinybirdError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new TinybirdParseError({ body, cause }),
});
