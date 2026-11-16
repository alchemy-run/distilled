import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * ClerkProtocol -- hand-written.
 *
 * Clerk speaks bearer-authenticated JSON REST (no response envelope), so the
 * protocol is one `restProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <secret>` +
 *             `Clerk-API-Version` + base URL (default
 *             https://api.clerk.com/v1), resolved from the calling fiber on
 *             every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ errors: [{ code, message }] }` bodies
 *             map to the operation's typed error classes by status, then the
 *             shared HTTP-status classes, then {@link UnknownClerkError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import {
  Credentials,
  PlatformCredentials,
  type CredentialsError,
  type PlatformCredentialsError,
} from "./credentials.ts";
import { UnknownClerkError, ClerkParseError, type ClerkServiceError } from "./errors.ts";

/**
 * The errors declared on Clerk's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link ClerkParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownClerkError}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type ClerkProtocolError = RestProtocolError | ClerkParseError | UnknownClerkError;

/**
 * What every generated Clerk operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, ClerkOpError, ClerkOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type ClerkOpError =
  | ClerkServiceError
  | ClerkProtocolError
  | CredentialsError
  | PlatformCredentialsError;

/** Context (requirements) shared by every generated Clerk operation. */
export type ClerkOpContext = Credentials | HttpClient.HttpClient;

/**
 * Context required by Platform operations; Backend credentials cannot satisfy it.
 */
export type ClerkPlatformOpContext = PlatformCredentials | HttpClient.HttpClient;

/**
 * Clerk's error body is `{ errors: [{ message, long_message?, code }],
 * clerk_trace_id? }`. Take the first error's message/code when present.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const errors = Array.isArray(b.errors) ? b.errors : undefined;
  const first =
    errors !== undefined && errors.length > 0 && typeof errors[0] === "object"
      ? (errors[0] as Record<string, unknown>)
      : undefined;
  const message =
    typeof first?.message === "string"
      ? first.message
      : typeof first?.long_message === "string"
        ? first.long_message
        : typeof b.message === "string"
          ? b.message
          : undefined;
  const code =
    typeof first?.code === "string" || typeof first?.code === "number"
      ? first.code
      : typeof b.code === "string" || typeof b.code === "number"
        ? b.code
        : undefined;
  return { code, message };
};

// The annotations are the check: everything a protocol fails with, besides
// the errors an operation and the service declare, must be listed there.
export const ClerkProtocol: Protocol<ClerkProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
      "Clerk-API-Version": creds.apiVersion,
    }),
    errorEnvelope,
    unknownError: (info) => new UnknownClerkError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new ClerkParseError({ body, cause }),
  });

/**
 * Platform JSON REST protocol using a supplied bearer access token.
 * Accepts a host or /v1 base URL and does not send the Backend API version header.
 */
export const ClerkPlatformProtocol: Protocol<
  ClerkProtocolError | PlatformCredentialsError,
  PlatformCredentials
> = /*@__PURE__*/ restProtocol({
  credentials: /*@__PURE__*/ Effect.flatten(PlatformCredentials),
  baseUrl: (creds) => {
    const baseUrl = creds.apiBaseUrl.replace(/\/+$/, "");
    return baseUrl.endsWith("/v1") ? baseUrl : `${baseUrl}/v1`;
  },
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  errorEnvelope,
  unknownError: (info) => new UnknownClerkError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new ClerkParseError({ body, cause }),
});
