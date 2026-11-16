import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
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
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownRenderError, RenderParseError, type RenderServiceError } from "./errors.ts";

/**
 * The errors declared on Render's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link RenderParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownRenderError}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type RenderProtocolError = RestProtocolError | RenderParseError | UnknownRenderError;

/**
 * What every generated Render operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, RenderOpError, RenderOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type RenderOpError = RenderServiceError | RenderProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Render operation. */
export type RenderOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const RenderProtocol: Protocol<RenderProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
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
