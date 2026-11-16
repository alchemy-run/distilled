import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * HetznerProtocol -- the shared bearer-REST protocol instantiated for Hetzner
 * Cloud.
 *
 * Hetzner speaks plain JSON with no success envelope: a single-resource read
 * returns `{ "server": {...} }`, a list returns
 * `{ "servers": [...], "meta": { "pagination": {...} } }` -- the generated
 * response shapes model those keys directly. FAILURES are enveloped, and
 * uniformly so: `{ "error": { "code": "invalid_input", "message": "...",
 * "details": {...} } }`, where `code` is the machine-readable half and
 * `details`' schema depends on it.
 *
 * The API version is part of the base URL's PATH (`/v1`), not a header, so
 * the generated operations carry version-less routes.
 *
 * Rate limits (429 `rate_limit_exceeded`) come back with `RateLimit-Limit`,
 * `RateLimit-Remaining` and `RateLimit-Reset` -- the pre-IETF spelling, which
 * core's `RateLimit`-dictionary parser does not read, so `TooManyRequests`
 * carries no `retryAfter` and the default policy's backoff applies. That is
 * the right answer here rather than a gap to plug: `RateLimit-Reset` is the
 * timestamp at which the FULL hourly quota is restored -- up to an hour out --
 * while Hetzner refills the budget gradually (one request per second at the
 * default 3600/hour), so a caller that slept until the reset would wait
 * orders of magnitude longer than it needs to.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownHetznerError, HetznerParseError, type HetznerServiceError } from "./errors.ts";

/**
 * The errors declared on Hetzner's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link HetznerParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownHetznerError}), and core's
 * REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type HetznerProtocolError = RestProtocolError | HetznerParseError | UnknownHetznerError;

/**
 * What every generated Hetzner operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, HetznerOpError, HetznerOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type HetznerOpError = HetznerServiceError | HetznerProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Hetzner operation. */
export type HetznerOpContext = Credentials | HttpClient.HttpClient;

/**
 * Hetzner error bodies nest under `error`: `{ error: { code, message,
 * details } }`. A response that arrives without that envelope (a proxy 502,
 * an HTML error page) falls through to the protocol's `HTTP <status>`
 * default.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const err = (body as Record<string, unknown>).error;
  if (err === null || typeof err !== "object") return undefined;
  const e = err as Record<string, unknown>;
  return {
    code: typeof e.code === "string" ? e.code : undefined,
    message: typeof e.message === "string" ? e.message : undefined,
  };
};

/** The code-dependent `error.details` object, when the envelope carries one. */
const errorDetails = (body: unknown): unknown => {
  if (body === null || typeof body !== "object") return undefined;
  const err = (body as Record<string, unknown>).error;
  if (err === null || typeof err !== "object") return undefined;
  return (err as Record<string, unknown>).details ?? undefined;
};

// A failed status becomes the class the service declares for it
// (`HetznerServiceErrors`: core's status classes plus the three statuses in
// Hetzner's documented error table that core has no class for: 405, 410 and
// 412. Leaving them out would funnel a sold-out Server type (412) into the
// same UnknownHetznerError as a genuinely unrecognized failure).
//
// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const HetznerProtocol: Protocol<HetznerProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // Resolved on the CALLING fiber per request; the Credentials service holds
    // an effect, so a token rotated between calls is picked up.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.token)}`,
    }),
    errorEnvelope,
    unknownError: (info) =>
      new UnknownHetznerError({ ...unknownErrorProps(info), details: errorDetails(info.body) }),
    parseError: ({ body, cause }) => new HetznerParseError({ body, cause }),
  });
