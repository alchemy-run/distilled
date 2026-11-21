import type * as API from "@distilled.cloud/core/api";
import type { API_ERRORS, ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * UniFiNetworkProtocol -- hand-written.
 *
 * The UniFi Network Integration API speaks API-key-authenticated JSON REST
 * (no response envelope), so the whole protocol is one `makeRestProtocol`
 * call from `core/protocol-rest`:
 *
 *   request:  credentials -> `X-API-KEY: <apiKey>` + base URL, resolved from
 *             the calling fiber on every request. Paths in the spec start at
 *             `/v1`; the base URL carries everything before it
 *             (`.../proxy/network/integration`).
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ message? }` bodies map to the shared
 *             HTTP-status classes, then {@link UnknownUniFiNetworkError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { UnknownUniFiNetworkError, UniFiNetworkParseError } from "./errors.ts";

/**
 * Error channel shared by every generated UniFi Network operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * UniFiNetworkOpError, UniFiNetworkOpContext>` explicitly so the compiler
 * never infers these back out of the schema generics.
 */
export type UniFiNetworkOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownUniFiNetworkError
  | ConfigError
  | HttpClientError.HttpClientError
  | UniFiNetworkParseError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated UniFi Network operation. */
export type UniFiNetworkOpContext = Credentials | HttpClient.HttpClient;

export const UniFiNetworkProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<Config>({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      "X-API-KEY": Redacted.value(creds.apiKey),
    }),
    // UniFi's error body is `{ statusCode, statusName, code, message, ... }` --
    // the factory's default lenient envelope reads `message`.
    unknownError: (info) => new UnknownUniFiNetworkError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new UniFiNetworkParseError({ body, cause }),
  });
