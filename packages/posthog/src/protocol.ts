import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
import * as Effect from "effect/Effect";
/**
 * PosthogProtocol -- hand-written.
 *
 * PostHog speaks plain bearer-auth JSON REST, so this is a thin
 * `restProtocol` instantiation (see `@distilled.cloud/core/protocol-rest`
 * for the generic machinery). What is PostHog's own:
 *
 *   request:  `Authorization: Bearer <personal API key>` from the
 *             Credentials service (resolved per request), base URL from
 *             `POSTHOG_HOST` / the US-cloud default -- operation paths
 *             already carry the `/api/...` prefix.
 *
 *   response: non-2xx bodies are Django REST Framework style
 *             `{ type, code, detail, attr }` envelopes (some endpoints use
 *             `{ error }` or `{ message }` instead -- all three accepted,
 *             mirroring distilled v0's matchError). Failures map to the
 *             per-operation typed errors (status matchers), then the shared
 *             HTTP-status classes (with retryAfter on retryable statuses),
 *             falling back to `UnknownPosthogError`.
 */
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownPosthogError, PosthogParseError, type PosthogServiceError } from "./errors.ts";

/**
 * The errors declared on PostHog's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link PosthogParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownPosthogError}), and core's
 * REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type PosthogProtocolError = RestProtocolError | PosthogParseError | UnknownPosthogError;

/**
 * What every generated PostHog operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, PosthogOpError, PosthogOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type PosthogOpError = PosthogServiceError | PosthogProtocolError | CredentialsError;

/** Context (requirements) shared by every generated PostHog operation. */
export type PosthogOpContext = Credentials | HttpClient.HttpClient;

/**
 * PostHog returns Django REST Framework style errors:
 *   { "type": "authentication_error",
 *     "code": "not_authenticated",
 *     "detail": "Authentication credentials were not provided.",
 *     "attr": null }
 *
 * The OpenAPI spec also documents a simpler `{ error: string }` shape used
 * by some endpoints, and server errors may return `{ message: string }`.
 * Accept any of these (v0 parity).
 */
const drfErrorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const code =
    typeof b.code === "string" ? b.code : typeof b.type === "string" ? b.type : undefined;
  const message =
    typeof b.detail === "string"
      ? b.detail
      : typeof b.message === "string"
        ? b.message
        : typeof b.error === "string"
          ? b.error
          : undefined;
  return { code, message };
};

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const PosthogProtocol: Protocol<PosthogProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request) picks up rotations. Its ConfigError channel is erased at the
    // protocol boundary; PosthogOpError reintroduces it for callers.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    errorEnvelope: drfErrorEnvelope,
    unknownError: (info) => new UnknownPosthogError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new PosthogParseError({ body, cause }),
  });
