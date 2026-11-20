import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * PolarProtocol -- hand-written.
 *
 * Polar speaks plain bearer-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + base URL
 *             (default https://api.polar.sh), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ code?, message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownPolarError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownPolarError, PolarParseError, type PolarServiceError } from "./errors.ts";

/**
 * The errors declared on Polar's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link PolarParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownPolarError}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type PolarProtocolError = RestProtocolError | PolarParseError | UnknownPolarError;

/**
 * What every generated Polar operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, PolarOpError, PolarOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type PolarOpError = PolarServiceError | PolarProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Polar operation. */
export type PolarOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const PolarProtocol: Protocol<PolarProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    // Polar's error body is typically `{ detail?: ..., error?: string }` --
    // the factory's default lenient envelope covers `{ code, message }`.
    unknownError: (info) => new UnknownPolarError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new PolarParseError({ body, cause }),
  });
