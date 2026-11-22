import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * TursoProtocol -- hand-written.
 *
 * Turso's platform API is plain bearer-REST JSON (`Authorization: Bearer
 * <apiKey>`, no response envelope), so the protocol is a direct
 * `restProtocol` instantiation from `core/protocol-rest`:
 *
 *   request:  credentials resolved per request from the Credentials service,
 *             bearer auth header, base URL from `creds.apiBaseUrl`
 *
 *   response: non-2xx -> typed error matched like the distilled turso client:
 *             per-op matcher classes first, then the shared HTTP status map
 *             (`{ error: string, code?: string }` bodies parsed leniently,
 *             `retryAfter` hints stamped on retryable statuses), unmapped
 *             failures fall back to `UnknownTursoError`.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownTursoError, TursoParseError, type TursoServiceError } from "./errors.ts";

/**
 * What every generated Turso operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, TursoOpError, TursoOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type TursoOpError = TursoServiceError | ErrorOf<typeof TursoProtocol>;

/** Context (requirements) shared by every generated Turso operation. */
export type TursoOpContext = Credentials | HttpClient.HttpClient;

export const TursoProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request) picks up rotations. Its error channel is erased at the protocol
  // boundary; TursoOpError reintroduces it for callers.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  // Turso error bodies are `{ error: string, code?: string }` -- covered by
  // the default lenient envelope (message ?? error, string codes kept).
  unknownError: (info) => new UnknownTursoError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new TursoParseError({ body, cause }),
});
