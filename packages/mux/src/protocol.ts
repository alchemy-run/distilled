import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
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
import { authorizationHeader, Credentials } from "./credentials.ts";
import { MuxParseError, UnknownMuxError, type MuxServiceError } from "./errors.ts";

/**
 * What every generated Mux operation fails with besides its own errors: the
 * errors declared on the service, and the errors declared on the protocol.
 * Nobody lists the protocol's: its type carries what its code fails with (a
 * response that does not match its schema, a failed response nothing declares,
 * core's REST errors, and what resolving the credentials fails with).
 * Generated service files annotate operations with `API.OperationMethod<I, O,
 * MuxOpError, MuxOpContext>` explicitly so the compiler never infers these
 * back out of the schema generics.
 */
export type MuxOpError = MuxServiceError | ErrorOf<typeof MuxProtocol>;

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

export const MuxProtocol = /*@__PURE__*/ restProtocol({
  // Resolved on the calling fiber per request.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: authorizationHeader(creds.auth),
    Accept: "application/json",
  }),
  errorEnvelope: muxError,
  unknownError: (info) => new UnknownMuxError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new MuxParseError({ body, cause }),
});
