import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * DopplerProtocol -- hand-written.
 *
 * Doppler speaks plain bearer-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <token>` + base URL
 *             (default https://api.doppler.com), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ messages?: string[], message? }`
 *             bodies map to the operation's typed error classes by status,
 *             then the shared HTTP-status classes, then
 *             {@link UnknownDopplerError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownDopplerError, DopplerParseError, type DopplerServiceError } from "./errors.ts";

/**
 * What every generated Doppler operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, DopplerOpError, DopplerOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type DopplerOpError =
  | DopplerServiceError
  | ErrorOf<typeof DopplerProtocol | typeof DopplerPublicProtocol>;

/** Context (requirements) shared by every generated Doppler operation. */
export type DopplerOpContext = Credentials | HttpClient.HttpClient;

export const DopplerProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    // Download negotiates its default format from Accept; without it the
    // API returns 415 unless the caller explicitly supplies format=json.
    Accept: "application/json",
  }),
  // Doppler's error body is `{ messages?: string[], message?: string,
  // success?: boolean }`. The factory's default envelope covers `message`;
  // `messages[0]` is the form most endpoints actually send.
  errorEnvelope: (body) => {
    if (body === null || typeof body !== "object") return undefined;
    const rec = body as Record<string, unknown>;
    const code =
      typeof rec.code === "string"
        ? rec.code
        : typeof rec.error === "string"
          ? rec.error
          : undefined;
    const fromMessages = Array.isArray(rec.messages)
      ? rec.messages.find((m) => typeof m === "string")
      : undefined;
    const message =
      typeof rec.message === "string"
        ? rec.message
        : typeof fromMessages === "string"
          ? fromMessages
          : undefined;
    if (code === undefined && message === undefined) return undefined;
    return { code, message };
  },
  unknownError: (info) => new UnknownDopplerError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new DopplerParseError({ body, cause }),
});

/** Unauthenticated browser-login operations never resolve or send credentials. */
export type DopplerPublicOpContext = HttpClient.HttpClient;
export const DopplerPublicProtocol = /*@__PURE__*/ restProtocol({
  credentials: /*@__PURE__*/ Effect.succeed(undefined),
  baseUrl: () => "https://api.doppler.com",
  headers: () => ({ Accept: "application/json" }),
  unknownError: (info) => new UnknownDopplerError({ ...unknownErrorProps(info), body: undefined }),
  parseError: ({ body, cause }) => new DopplerParseError({ body, cause }),
});
