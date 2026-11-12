import type * as API from "@distilled.cloud/core/api";
import type { API_ERRORS, ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import {
  makeRestProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * SteelProtocol -- the shared REST protocol instantiated for the Steel API.
 *
 *   request:  credentials -> `steel-api-key: <key>` + base URL (default
 *             https://api.steel.dev), resolved from the calling fiber on
 *             every request
 *
 *   response: 2xx JSON is the payload, downloads are bytes; non-2xx
 *             `{ error, message, code }` (or the commands endpoints'
 *             `{ error: { code, message } }`) bodies map to the operation's
 *             typed error classes, then the shared HTTP-status classes, then
 *             {@link UnknownSteelError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { SteelParseError, UnknownSteelError } from "./errors.ts";

/**
 * Error channel shared by every generated Steel operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, SteelOpError,
 * SteelOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type SteelOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownSteelError
  | ConfigError
  | HttpClientError.HttpClientError
  | SteelParseError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated Steel operation. */
export type SteelOpContext = Credentials | HttpClient.HttpClient;

const str = (value: unknown): string | undefined => (typeof value === "string" ? value : undefined);

const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const rec = body as Record<string, unknown>;
  // `{ error: { code, message } }` (session commands) or the flat
  // `{ error: "<title>", message, code }` every other endpoint returns.
  const nested =
    rec.error !== null && typeof rec.error === "object"
      ? (rec.error as Record<string, unknown>)
      : rec;
  const code = str(nested.code);
  const message = str(nested.message) ?? str(rec.error);
  if (code === undefined && message === undefined) return undefined;
  return { code, message };
};

export const SteelProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<Config>({
  // Resolved on the calling fiber per request, so a rotated key is picked up
  // without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  baseUrl: (creds) => creds.baseUrl,
  headers: (creds) => ({
    "steel-api-key": Redacted.value(creds.apiKey),
  }),
  errorEnvelope,
  unknownError: (info) => new UnknownSteelError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new SteelParseError({ body, cause }),
});
