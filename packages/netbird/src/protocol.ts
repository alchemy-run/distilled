import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * NetBirdProtocol -- hand-written.
 *
 * NetBird speaks token-authenticated JSON REST (no response envelope), so the
 * whole protocol is one `restProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Token <apiToken>` + base URL
 *             (default https://api.netbird.io), resolved from the calling
 *             fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ message, code }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownNetBirdError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownNetBirdError, NetBirdParseError, type NetBirdServiceError } from "./errors.ts";

/**
 * What every generated NetBird operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, NetBirdOpError, NetBirdOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type NetBirdOpError = NetBirdServiceError | ErrorOf<typeof NetBirdProtocol>;

/** Context (requirements) shared by every generated NetBird operation. */
export type NetBirdOpContext = Credentials | HttpClient.HttpClient;

export const NetBirdProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Token ${Redacted.value(creds.apiToken)}`,
  }),
  // NetBird's error body is `{ message, code }` -- the factory's default
  // lenient envelope covers it.
  unknownError: (info) => new UnknownNetBirdError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new NetBirdParseError({ body, cause }),
});
