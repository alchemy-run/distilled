import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * TemporalProtocol -- hand-written.
 *
 * Temporal's frontend HTTP API speaks bearer-authenticated JSON REST (gRPC
 * transcoding, no response envelope), so the whole protocol is one
 * `restProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + base URL
 *             (default http://localhost:7243), resolved from the
 *             calling fiber on every request. Spec paths already include
 *             `/api/v1`.
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ code?, message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownTemporalError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownTemporalError, TemporalParseError, type TemporalServiceError } from "./errors.ts";

/**
 * The errors declared on Temporal's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link TemporalParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownTemporalError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type TemporalProtocolError = RestProtocolError | TemporalParseError | UnknownTemporalError;

/**
 * What every generated Temporal operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, TemporalOpError, TemporalOpContext>` explicitly
 * so the compiler never infers these back out of the schema generics.
 */
export type TemporalOpError = TemporalServiceError | TemporalProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Temporal operation. */
export type TemporalOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const TemporalProtocol: Protocol<TemporalProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    // Temporal's google.rpc.Status error body is `{ code?, message, details? }`
    // -- the factory's default lenient envelope covers it.
    unknownError: (info) => new UnknownTemporalError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new TemporalParseError({ body, cause }),
  });
