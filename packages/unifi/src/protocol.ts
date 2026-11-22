import type * as API from "@distilled.cloud/core/api";
import type { API_ERRORS, ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * UniFi protocols -- hand-written.
 *
 * Every UniFi API speaks API-key-authenticated JSON REST (no response
 * envelope), so each protocol is one `makeRestProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  the key -> `X-API-KEY: <apiKey>`, and for the console-hosted apps
 *             the console -> base URL, both resolved from the calling fiber
 *             on every request. Paths in the specs start at `/v1`; the base
 *             URL carries everything before it.
 *
 *   response: 2xx JSON is the payload; non-2xx `{ message? }` bodies map to
 *             the shared HTTP-status classes, then {@link UnknownUniFiError}.
 *             A console answers `{ code, message, statusCode, statusName,
 *             requestId, requestPath, timestamp }`; `api.ui.com` answers
 *             `{ code, message, httpStatusCode, traceId }`. Both carry
 *             `message`, which the default envelope reads.
 *
 * The console-hosted apps (Network, Protect, InnerSpace) share a protocol
 * shape that differs only in the `/proxy/<app>/integration` segment of the
 * base URL; the cloud-only APIs share {@link UniFiCloudProtocol}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import {
  ApiKey,
  Console,
  DEFAULT_CLOUD_BASE_URL,
  consoleBaseUrl,
  type CloudConfig,
  type ConsoleApp,
  type ConsoleConfig,
} from "./credentials.ts";
import { UnknownUniFiError, UniFiParseError } from "./errors.ts";

/**
 * Error channel shared by every generated UniFi operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, UniFiOpError,
 * <context>>` explicitly so the compiler never infers these back out of the
 * schema generics.
 */
export type UniFiOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownUniFiError
  | ConfigError
  | HttpClientError.HttpClientError
  | UniFiParseError
  | InvalidInput
  | SdkError;

/** Context of every Network, Protect and InnerSpace operation. */
export type UniFiConsoleOpContext = ApiKey | Console | HttpClient.HttpClient;

/** Context of every Site Manager, Mobility and Carrier Fabric operation. */
export type UniFiCloudOpContext = ApiKey | HttpClient.HttpClient;

const consoleProtocol = (app: ConsoleApp): Layer.Layer<API.Protocol> =>
  makeRestProtocol<ConsoleConfig>({
    // Each service holds an effect -- resolving them here (per request, on the
    // calling fiber) picks up context-provided layers.
    credentials: Effect.gen(function* () {
      const apiKey = yield* yield* ApiKey;
      const location = yield* yield* Console;
      return { apiKey, location };
    }),
    baseUrl: (creds) => consoleBaseUrl(creds.location, app),
    headers: (creds) => ({ "X-API-KEY": Redacted.value(creds.apiKey), Accept: "application/json" }),
    unknownError: (info) => new UnknownUniFiError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new UniFiParseError({ body, cause }),
  });

export const UniFiNetworkProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ consoleProtocol("network");

export const UniFiProtectProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ consoleProtocol("protect");

export const UniFiInnerSpaceProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ consoleProtocol("innerspace");

export const UniFiCloudProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<CloudConfig>({
    credentials: /*@__PURE__*/ Effect.map(
      Effect.flatMap(ApiKey, (resolve) => resolve),
      (apiKey) => ({ apiKey }),
    ),
    baseUrl: () => DEFAULT_CLOUD_BASE_URL,
    headers: (creds) => ({ "X-API-KEY": Redacted.value(creds.apiKey), Accept: "application/json" }),
    unknownError: (info) => new UnknownUniFiError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new UniFiParseError({ body, cause }),
  });
