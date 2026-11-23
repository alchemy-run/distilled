import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * RenderProtocol -- hand-written.
 *
 * Render speaks plain bearer-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + base URL
 *             (default https://api.render.com/v1), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownRenderError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownRenderError, RenderParseError, type RenderServiceError } from "./errors.ts";

/**
 * What every generated Render operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, RenderOpError, RenderOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type RenderOpError = RenderServiceError | ErrorOf<typeof RenderProtocol>;

/** Context (requirements) shared by every generated Render operation. */
export type RenderOpContext = Credentials | HttpClient.HttpClient;

export const RenderProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    Accept: "application/json",
  }),
  // Render's error body is `{ message: string }` -- the factory's default
  // lenient envelope covers it.
  unknownError: (info) => new UnknownRenderError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new RenderParseError({ body, cause }),
});
