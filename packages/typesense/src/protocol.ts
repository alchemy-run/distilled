import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * TypesenseProtocol -- the shared bearer/header-auth REST factory from core,
 * instantiated with Typesense's specifics:
 *
 *   request:  base URL from the caller's credentials (Typesense has no fixed
 *             default -- self-hosted servers and per-cluster Cloud URLs), auth
 *             via the `X-TYPESENSE-API-KEY` header
 *
 *   response: plain JSON, no envelope. Non-2xx bodies decode against
 *             Typesense's ApiResponse (`{ message }`) via the factory's
 *             default envelope reader; per-op typed errors match first, then
 *             the shared HTTP status map, then UnknownTypesenseError.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import { Credentials, formatHeaders, type CredentialsError } from "./credentials.ts";
import {
  UnknownTypesenseError,
  TypesenseParseError,
  type TypesenseServiceError,
} from "./errors.ts";

/**
 * The errors declared on Typesense's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link TypesenseParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownTypesenseError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type TypesenseProtocolError =
  | RestProtocolError
  | TypesenseParseError
  | UnknownTypesenseError;

/**
 * What every generated Typesense operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, TypesenseOpError, TypesenseOpContext>` explicitly
 * so the compiler never infers these back out of the schema generics.
 */
export type TypesenseOpError = TypesenseServiceError | TypesenseProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Typesense operation. */
export type TypesenseOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const TypesenseProtocol: Protocol<TypesenseProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // Resolved on the calling fiber, per request -- the Credentials service
    // holds an effect, so lazily-resolved keys Just Work.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: formatHeaders,
    // Typesense's ApiResponse error body is `{ message }` -- covered by the
    // factory's default envelope reader.
    unknownError: (info) => new UnknownTypesenseError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new TypesenseParseError({ body, cause }),
  });
