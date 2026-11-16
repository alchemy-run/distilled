import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * NeonProtocol -- hand-written.
 *
 * Neon speaks plain bearer-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `makeRestProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + base URL
 *             (default https://console.neon.tech/api/v2), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ code?, message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownNeonError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownNeonError, NeonParseError, type NeonServiceError } from "./errors.ts";

/**
 * The errors declared on Neon's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link NeonParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownNeonError}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type NeonProtocolError = RestProtocolError | NeonParseError | UnknownNeonError;

/**
 * What every generated Neon operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, NeonOpError, NeonOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type NeonOpError = NeonServiceError | NeonProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Neon operation. */
export type NeonOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const NeonProtocol: Protocol<NeonProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    // Neon's error body is `{ code?: string, message: string }` -- the
    // factory's default lenient envelope covers it.
    unknownError: (info) => new UnknownNeonError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new NeonParseError({ body, cause }),
  });
