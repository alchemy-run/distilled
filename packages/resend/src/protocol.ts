import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * ResendProtocol -- hand-written.
 *
 * Resend speaks plain bearer-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + base URL
 *             (default https://api.resend.com), resolved from the
 *             calling fiber on every request, plus a `User-Agent`:
 *             Resend's edge rejects requests without one (403, Cloudflare
 *             error 1010), and not every runtime's fetch adds it
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ name?, message, statusCode? }` bodies
 *             map to the operation's typed error classes by status, then the
 *             shared HTTP-status classes, then {@link UnknownResendError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownResendError, ResendParseError, type ResendServiceError } from "./errors.ts";

/** Sent on every request; Resend's edge returns 403 (error 1010) without one. */
export const USER_AGENT = "distilled.cloud-resend";

/**
 * What every generated Resend operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, ResendOpError, ResendOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type ResendOpError = ResendServiceError | ErrorOf<typeof ResendProtocol>;

/** Context (requirements) shared by every generated Resend operation. */
export type ResendOpContext = Credentials | HttpClient.HttpClient;

export const ResendProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    "User-Agent": USER_AGENT,
  }),
  // Resend's error body is `{ name?: string, message: string, statusCode?: number }`.
  // The factory's default lenient envelope covers `{ code, message }`; `name`
  // is the machine-readable code Resend actually sends.
  errorEnvelope: (body) => {
    if (body === null || typeof body !== "object") return undefined;
    const rec = body as Record<string, unknown>;
    const code =
      typeof rec.name === "string" ? rec.name : typeof rec.code === "string" ? rec.code : undefined;
    const message = typeof rec.message === "string" ? rec.message : undefined;
    if (code === undefined && message === undefined) return undefined;
    return { code, message };
  },
  unknownError: (info) => new UnknownResendError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new ResendParseError({ body, cause }),
});
