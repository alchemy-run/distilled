import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * XataProtocol -- hand-written.
 *
 * Xata's control plane speaks plain bearer-authenticated JSON REST (no
 * response envelope), so the whole protocol is one `restProtocol` call
 * from `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + base URL
 *             (default https://api.xata.tech), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ code?, message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownXataError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownXataError, XataParseError, type XataServiceError } from "./errors.ts";

/**
 * What every generated Xata operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, XataOpError, XataOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type XataOpError = XataServiceError | ErrorOf<typeof XataProtocol>;

/** Context (requirements) shared by every generated Xata operation. */
export type XataOpContext = Credentials | HttpClient.HttpClient;

export const XataProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  // Xata's error body is `{ message: string, ... }` -- the factory's
  // default lenient envelope covers it.
  unknownError: (info) => new UnknownXataError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new XataParseError({ body, cause }),
});
