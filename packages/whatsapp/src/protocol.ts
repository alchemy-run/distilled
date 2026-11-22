import type * as API from "@distilled.cloud/core/api";
import { type API_ERRORS, ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { encodeLabel } from "@distilled.cloud/core/protocol-http";
import { makeRestProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * WhatsAppProtocol -- hand-written.
 *
 * Plain JSON REST against the Graph API, https://graph.facebook.com. Every
 * request goes to `<apiBaseUrl>/<apiVersion>/<path>` with the access token
 * as `Authorization: Bearer`; the generated operations carry the path after
 * the version (scripts/convert.ts removes the spec's `/{Version}` segment).
 * Failures are the Graph API error object
 *
 *     { "error": { "message": "...", "type": "OAuthException", "code": 100 } }
 *
 * mapped by status; `code` becomes the error's `code` and `message` its
 * `message`.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { UnknownWhatsAppError, WhatsAppParseError } from "./errors.ts";

/**
 * Error channel shared by every generated WhatsApp operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * WhatsAppOpError, WhatsAppOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type WhatsAppOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownWhatsAppError
  | WhatsAppParseError
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated WhatsApp operation. */
export type WhatsAppOpContext = Credentials | HttpClient.HttpClient;

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;

/** `{ error: { code, message } }` -> `{ code, message }`. */
const graphError = (body: unknown): { code?: number; message?: string } | undefined => {
  const error = isRecord(body) && isRecord(body.error) ? body.error : undefined;
  if (error === undefined) return undefined;
  const code = typeof error.code === "number" ? error.code : undefined;
  const message =
    typeof error.message === "string" && error.message !== "" ? error.message : undefined;
  return code === undefined && message === undefined ? undefined : { code, message };
};

/**
 * `<apiBaseUrl>/<apiVersion>`. Throws {@link ConfigError} for a version that
 * can't be a URL path segment (`""`, `.`, `..`, a lone UTF-16 surrogate);
 * the protocol fails the call with it.
 */
const baseUrlFor = (creds: Config): string => {
  const version = encodeLabel("apiVersion", creds.apiVersion);
  if (version instanceof InvalidInput) {
    throw new ConfigError({
      message: `The configured WhatsApp API version ${JSON.stringify(creds.apiVersion)} cannot be a URL path segment`,
    });
  }
  return `${creds.apiBaseUrl}/${version}`;
};

export const WhatsAppProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<Config>({
  // Resolved on the calling fiber per request.
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  baseUrl: baseUrlFor,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.accessToken)}`,
    Accept: "application/json",
  }),
  errorEnvelope: graphError,
  // A typed error's declared fields are read inside `error` first.
  errorFieldsAt: "/error",
  unknownError: (info) => new UnknownWhatsAppError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new WhatsAppParseError({ body, cause }),
});
