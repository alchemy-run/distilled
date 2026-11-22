import type * as API from "@distilled.cloud/core/api";
import type { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { HTTP_STATUS_MAP } from "@distilled.cloud/core/errors";
import { makeRestProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * TwitchProtocol -- the shared bearer-REST protocol instantiated for Helix.
 *
 * Helix speaks plain JSON with no success envelope. Every call carries the
 * access token as `Authorization: Bearer` and the app's `Client-Id`. A failure
 * is `{ "error": "Bad Request", "status": 400, "message": "<why>" }`, which the
 * factory's default extractor reads (`message` first).
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { TwitchParseError, UnknownTwitchError, type DefaultErrors } from "./errors.ts";

/**
 * Error channel shared by every generated Twitch operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, TwitchOpError,
 * TwitchOpContext>` explicitly.
 */
export type TwitchOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated Twitch operation. */
export type TwitchOpContext = Credentials | HttpClient.HttpClient;

export const TwitchProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<Config>({
  // Resolved on the calling fiber per request, so a refreshed token is
  // picked up without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  baseUrl: (creds) => creds.apiBaseUrl.replace(/\/+$/, ""),
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.accessToken)}`,
    "Client-Id": creds.clientId,
  }),
  statusMap: HTTP_STATUS_MAP,
  unknownError: (info) => new UnknownTwitchError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new TwitchParseError({ body, cause }),
});
