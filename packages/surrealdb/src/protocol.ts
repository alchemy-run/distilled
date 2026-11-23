import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * SurrealdbProtocol -- hand-written.
 *
 * SurrealDB speaks bearer-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` +
 *             `Accept: application/json` + base URL (default
 *             http://127.0.0.1:8000), resolved from the calling fiber on
 *             every request. Namespace/database selection is per-call via
 *             the `NS` / `DB` headers on the generated operations.
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ code?, message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownSurrealdbError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import {
  UnknownSurrealdbError,
  SurrealdbParseError,
  type SurrealdbServiceError,
} from "./errors.ts";

/**
 * What every generated SurrealDB operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, SurrealdbOpError, SurrealdbOpContext>` explicitly
 * so the compiler never infers these back out of the schema generics.
 */
export type SurrealdbOpError = SurrealdbServiceError | ErrorOf<typeof SurrealdbProtocol>;

/** Context (requirements) shared by every generated SurrealDB operation. */
export type SurrealdbOpContext = Credentials | HttpClient.HttpClient;

export const SurrealdbProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Accept: "application/json",
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  // SurrealDB's error body is `{ code?: string, details?: string,
  // description?: string, information?: string }` -- the factory's default
  // lenient envelope covers `message`/`error`/`details`.
  unknownError: (info) => new UnknownSurrealdbError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new SurrealdbParseError({ body, cause }),
});
