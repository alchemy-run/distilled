import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * UniFi protocols -- hand-written.
 *
 * Every UniFi API speaks API-key-authenticated JSON REST (no response
 * envelope), so each protocol is one `restProtocol` call from
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
import * as Redacted from "effect/Redacted";
import {
  ApiKey,
  Console,
  DEFAULT_CLOUD_BASE_URL,
  consoleBaseUrl,
  type ConsoleApp,
} from "./credentials.ts";
import { UnknownUniFiError, UniFiParseError, type UniFiServiceError } from "./errors.ts";

/**
 * What every generated UniFi operation fails with besides its own errors: the
 * errors declared on the service, and the errors declared on the protocols.
 * Nobody lists the protocols': their types carry what their code fails with
 * (a response that does not match its schema, a failed response nothing
 * declares, core's REST errors, and what resolving the key and the console
 * fails with). Generated service files annotate operations with
 * `API.OperationMethod<I, O, UniFiOpError, <context>>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type UniFiOpError =
  | UniFiServiceError
  | ErrorOf<
      | typeof UniFiNetworkProtocol
      | typeof UniFiProtectProtocol
      | typeof UniFiInnerSpaceProtocol
      | typeof UniFiCloudProtocol
    >;

/** Context of every Network, Protect and InnerSpace operation. */
export type UniFiConsoleOpContext = ApiKey | Console | HttpClient.HttpClient;

/** Context of every Site Manager, Mobility and Carrier Fabric operation. */
export type UniFiCloudOpContext = ApiKey | HttpClient.HttpClient;

const consoleProtocol = (app: ConsoleApp) =>
  restProtocol({
    // Each service holds an effect -- resolving them here (per request, on the
    // calling fiber) picks up context-provided layers.
    credentials: Effect.gen(function* () {
      const apiKey = yield* yield* ApiKey;
      const location = yield* yield* Console;
      return { apiKey, location };
    }),
    // A console ID that can't be a path segment is refused earlier, when the
    // `Console` layer is built (`check` in ./credentials.ts).
    baseUrl: (creds) => consoleBaseUrl(creds.location, app),
    headers: (creds) => ({ "X-API-KEY": Redacted.value(creds.apiKey), Accept: "application/json" }),
    unknownError: (info) => new UnknownUniFiError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new UniFiParseError({ body, cause }),
  });

export const UniFiNetworkProtocol = /*@__PURE__*/ consoleProtocol("network");

export const UniFiProtectProtocol = /*@__PURE__*/ consoleProtocol("protect");

export const UniFiInnerSpaceProtocol = /*@__PURE__*/ consoleProtocol("innerspace");

// A const of its own: written inside the options, its callback would leave
// the credentials typed `unknown`.
const cloudCredentials = /*@__PURE__*/ Effect.map(
  /*@__PURE__*/ Effect.flatten(ApiKey),
  (apiKey) => ({ apiKey }),
);

export const UniFiCloudProtocol = /*@__PURE__*/ restProtocol({
  credentials: cloudCredentials,
  baseUrl: () => DEFAULT_CLOUD_BASE_URL,
  headers: (creds) => ({ "X-API-KEY": Redacted.value(creds.apiKey), Accept: "application/json" }),
  unknownError: (info) => new UnknownUniFiError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new UniFiParseError({ body, cause }),
});
