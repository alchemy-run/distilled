import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * CoolifyProtocol -- hand-written.
 *
 * Coolify speaks plain bearer-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + base URL
 *             (default https://app.coolify.io/api/v1), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownCoolifyError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownCoolifyError, CoolifyParseError, type CoolifyServiceError } from "./errors.ts";

/**
 * What every generated Coolify operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, CoolifyOpError, CoolifyOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type CoolifyOpError = CoolifyServiceError | ErrorOf<typeof CoolifyProtocol>;

/** Context (requirements) shared by every generated Coolify operation. */
export type CoolifyOpContext = Credentials | HttpClient.HttpClient;

export const CoolifyProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  // Coolify's error body is `{ message: string }` -- the factory's default
  // lenient envelope covers it.
  unknownError: (info) => new UnknownCoolifyError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new CoolifyParseError({ body, cause }),
});
