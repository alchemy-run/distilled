import type * as API from "@distilled.cloud/core/api";
import type { API_ERRORS, ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * MuxProtocol -- hand-written.
 *
 * Plain JSON REST against https://api.mux.com. Responses are returned as the
 * wire sends them -- Mux wraps resources as `{ "data": ... }` and the SDK
 * keeps that shape, so `getAsset` answers `{ data: Asset }`. Failures are
 *
 *     { "error": { "type": "not_found", "messages": ["Asset not found"] } }
 *
 * mapped by status;
 * `type` becomes the error's `code` and the messages its `message`.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import { authorizationHeader, Credentials, type Config } from "./credentials.ts";
import { MuxParseError, UnknownMuxError } from "./errors.ts";

/**
 * Error channel shared by every generated Mux operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, MuxOpError,
 * MuxOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type MuxOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownMuxError
  | MuxParseError
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated Mux operation. */
export type MuxOpContext = Credentials | HttpClient.HttpClient;

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;

const str = (v: unknown): string | undefined => (typeof v === "string" && v !== "" ? v : undefined);

/** `{ error: { type, messages, message? } }` -> `{ code, message }`. */
const muxError = (body: unknown): { code?: string; message?: string } | undefined => {
  const error = isRecord(body) && isRecord(body.error) ? body.error : undefined;
  if (error === undefined) return undefined;
  const messages = Array.isArray(error.messages)
    ? error.messages.filter((m): m is string => typeof m === "string" && m !== "")
    : [];
  const message = messages.length > 0 ? messages.join("; ") : str(error.message);
  const code = str(error.type);
  return code === undefined && message === undefined ? undefined : { code, message };
};

export const MuxProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<Config>({
  // Resolved on the calling fiber per request.
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: authorizationHeader(creds.auth),
    Accept: "application/json",
  }),
  errorEnvelope: muxError,
  unknownError: (info) => new UnknownMuxError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new MuxParseError({ body, cause }),
});
