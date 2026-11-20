import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * DiscordProtocol -- the shared bearer-REST protocol instantiated for Discord.
 *
 * Discord speaks plain JSON with no response envelope: successful responses
 * are the resource (or a bare array) verbatim. Failures carry
 * `{ code, message, errors? }` where `code` is Discord's own numeric JSON
 * error code -- the shared HTTP status map turns the status into the error
 * class, and anything unmapped becomes {@link UnknownDiscordError} with the
 * code and per-field `errors` detail preserved.
 *
 * Rate limits (429) arrive as `TooManyRequests` with `retryAfter` read from
 * the `Retry-After` header, so the default retry policy honors Discord's
 * bucket hints without extra configuration.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownDiscordError, DiscordParseError, type DiscordServiceError } from "./errors.ts";

/**
 * The errors declared on Discord's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link DiscordParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownDiscordError}), and core's
 * REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type DiscordProtocolError = RestProtocolError | DiscordParseError | UnknownDiscordError;

/**
 * What every generated Discord operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, DiscordOpError, DiscordOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type DiscordOpError = DiscordServiceError | DiscordProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Discord operation. */
export type DiscordOpContext = Credentials | HttpClient.HttpClient;

/**
 * Discord's error body is `{ code: <numeric JSON error code>, message }`.
 * The OAuth2 token endpoints answer in the OAuth style instead
 * (`{ error, error_description }`), so both spellings are read here.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message =
    typeof b.message === "string"
      ? b.message
      : typeof b.error_description === "string"
        ? b.error_description
        : typeof b.error === "string"
          ? b.error
          : undefined;
  const code = typeof b.code === "number" || typeof b.code === "string" ? b.code : undefined;
  return { code, message };
};

/** Discord's `errors` object: per-field validation detail on 400s. */
const errorDetails = (body: unknown): unknown => {
  if (body === null || typeof body !== "object") return undefined;
  return (body as Record<string, unknown>).errors;
};

/**
 * Discord's JSON error code as a number. The OAuth2 endpoints answer with a
 * string `error` slug instead of a numeric `code` -- those carry no numeric
 * code at all, so anything unparseable is dropped rather than surfaced as
 * NaN.
 */
const numericCode = (code: string | number | undefined): number | undefined => {
  if (typeof code === "number") return Number.isFinite(code) ? code : undefined;
  if (typeof code !== "string" || code.trim() === "") return undefined;
  const n = Number(code);
  return Number.isFinite(n) ? n : undefined;
};

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const DiscordProtocol: Protocol<DiscordProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // Resolved on the CALLING fiber per request; the Credentials service holds
    // an effect so rotating tokens Just Work.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `${creds.tokenType} ${Redacted.value(creds.token)}`,
    }),
    errorEnvelope,
    unknownError: (info) =>
      new UnknownDiscordError({
        ...unknownErrorProps(info),
        code: numericCode(info.code),
        errors: errorDetails(info.body),
      }),
    parseError: ({ body, cause }) => new DiscordParseError({ body, cause }),
  });
