import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * RemoteProtocol -- hand-written.
 *
 * Remote speaks plain bearer-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <token>` + base URL
 *             (default https://gateway.remote.com), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ code?, message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownRemoteError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownRemoteError, RemoteParseError, type RemoteServiceError } from "./errors.ts";

/**
 * What every generated Remote operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, RemoteOpError, RemoteOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type RemoteOpError = RemoteServiceError | ErrorOf<typeof RemoteProtocol>;

/** Context (requirements) shared by every generated Remote operation. */
export type RemoteOpContext = Credentials | HttpClient.HttpClient;

export const RemoteProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  // Remote's error body is `{ code?: string, message: string }` (or
  // `{ errors }` / `{ message }` depending on status) -- the factory's
  // default lenient envelope covers it.
  unknownError: (info) => new UnknownRemoteError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new RemoteParseError({ body, cause }),
});
