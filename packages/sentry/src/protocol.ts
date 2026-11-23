import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * SentryProtocol -- hand-written.
 *
 * Sentry speaks plain bearer-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + base URL
 *             (default https://sentry.io), resolved from the
 *             calling fiber on every request. Paths already include `/api/0`.
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ detail?, code?, message }` bodies map to
 *             the operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownSentryError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownSentryError, SentryParseError, type SentryServiceError } from "./errors.ts";

/**
 * What every generated Sentry operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, SentryOpError, SentryOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type SentryOpError = SentryServiceError | ErrorOf<typeof SentryProtocol>;

/** Context (requirements) shared by every generated Sentry operation. */
export type SentryOpContext = Credentials | HttpClient.HttpClient;

export const SentryProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  // Sentry's error body is typically `{ detail?: string }` -- the
  // factory's default lenient envelope covers it.
  unknownError: (info) => new UnknownSentryError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new SentryParseError({ body, cause }),
});
