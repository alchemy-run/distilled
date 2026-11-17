import type * as API from "@distilled.cloud/core/api";
import type { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { HTTP_STATUS_MAP, ServiceUnavailable } from "@distilled.cloud/core/errors";
import { makeRestProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * AnthropicProtocol -- the shared REST protocol instantiated for the Claude
 * Platform (Anthropic) API.
 *
 * Requests carry `x-api-key: <key>` and the required `anthropic-version`
 * header; an operation's `anthropic-version`, `anthropic-beta` or
 * `anthropic-workspace-id` member is sent as that header for one call.
 * Responses are plain JSON with no success envelope.
 *
 * Failures are `{ type: "error", error: { type, message }, request_id }`.
 * The status picks the class from core's shared map; 529
 * (`overloaded_error`) maps to the shared, retryable `ServiceUnavailable`,
 * and anything unmapped reports `error.type` as the code of an
 * `UnknownAnthropicError`.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { AnthropicParseError, UnknownAnthropicError, type DefaultErrors } from "./errors.ts";

/**
 * Error channel shared by every generated Anthropic operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * AnthropicOpError, AnthropicOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type AnthropicOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated Anthropic operation. */
export type AnthropicOpContext = Credentials | HttpClient.HttpClient;

/** `{ error: { type, message } }` -> `{ code: type, message }`. */
const errorEnvelope = (body: unknown) => {
  if (typeof body !== "object" || body === null) return undefined;
  const error = (body as Record<string, unknown>).error;
  if (typeof error !== "object" || error === null) return undefined;
  const { type, message } = error as Record<string, unknown>;
  return {
    code: typeof type === "string" ? type : undefined,
    message: typeof message === "string" ? message : undefined,
  };
};

export const AnthropicProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<Config>({
  // Resolved on the calling fiber per request, so a rotated key is picked
  // up without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    "x-api-key": Redacted.value(creds.apiKey),
    "anthropic-version": creds.version,
  }),
  statusMap: {
    ...HTTP_STATUS_MAP,
    529: ServiceUnavailable,
  },
  errorEnvelope,
  unknownError: (info) => new UnknownAnthropicError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new AnthropicParseError({ body, cause }),
});
