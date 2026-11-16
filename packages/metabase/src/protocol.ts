import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * MetabaseProtocol -- hand-written.
 *
 * Metabase speaks API-key-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `X-API-Key: <apiKey>` + base URL
 *             (default http://localhost:3000), resolved from the calling
 *             fiber on every request. Paths in the spec already include
 *             `/api`, so the instance origin is used as-is.
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ message? }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownMetabaseError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownMetabaseError, MetabaseParseError, type MetabaseServiceError } from "./errors.ts";

/**
 * The errors declared on Metabase's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link MetabaseParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownMetabaseError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type MetabaseProtocolError = RestProtocolError | MetabaseParseError | UnknownMetabaseError;

/**
 * What every generated Metabase operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, MetabaseOpError, MetabaseOpContext>` explicitly
 * so the compiler never infers these back out of the schema generics.
 */
export type MetabaseOpError = MetabaseServiceError | MetabaseProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Metabase operation. */
export type MetabaseOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const MetabaseProtocol: Protocol<MetabaseProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      "X-API-Key": Redacted.value(creds.apiKey),
    }),
    // Metabase's error body is typically `{ message?: string }` -- the
    // factory's default lenient envelope covers it.
    unknownError: (info) => new UnknownMetabaseError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new MetabaseParseError({ body, cause }),
  });
