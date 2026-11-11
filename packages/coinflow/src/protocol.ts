import type * as API from "@distilled.cloud/core/api";
import type { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * CoinflowProtocol -- the shared REST protocol instantiated for the Coinflow
 * API.
 *
 * Requests carry the merchant API key as the raw `Authorization` header
 * value and go to the configured environment (sandbox by default). End-user
 * headers (`x-coinflow-auth-*`) are operation input members. Responses are
 * plain JSON with no success envelope.
 *
 * Failures are `{ msg }`, `{ message }`, or a richer body (a 451's
 * `verificationLink`). Each status an operation declares maps to its typed
 * error class, which keeps the parsed body; status classes from core's
 * shared map cover the rest.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { CoinflowParseError, UnknownCoinflowError, type DefaultErrors } from "./errors.ts";

/**
 * Error channel shared by every generated Coinflow operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * CoinflowOpError, CoinflowOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type CoinflowOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated Coinflow operation. */
export type CoinflowOpContext = Credentials | HttpClient.HttpClient;

const errorEnvelope = (body: unknown) => {
  if (typeof body !== "object" || body === null) return undefined;
  const { msg, message, error } = body as Record<string, unknown>;
  return {
    message:
      typeof msg === "string"
        ? msg
        : typeof message === "string"
          ? message
          : typeof error === "string"
            ? error
            : undefined,
  };
};

export const CoinflowProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<Config>({
  // Resolved on the calling fiber per request, so a rotated key is picked
  // up without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: Redacted.value(creds.apiKey),
  }),
  errorEnvelope,
  unknownError: ({ status, message, body }) => new UnknownCoinflowError({ status, message, body }),
  parseError: ({ body, cause }) => new CoinflowParseError({ body, cause }),
});
