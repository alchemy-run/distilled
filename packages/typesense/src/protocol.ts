import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
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
import { Credentials, formatHeaders } from "./credentials.ts";
import {
  UnknownTypesenseError,
  TypesenseParseError,
  type TypesenseServiceError,
} from "./errors.ts";

/**
 * What every generated Typesense operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, TypesenseOpError, TypesenseOpContext>` explicitly
 * so the compiler never infers these back out of the schema generics.
 */
export type TypesenseOpError = TypesenseServiceError | ErrorOf<typeof TypesenseProtocol>;

/** Context (requirements) shared by every generated Typesense operation. */
export type TypesenseOpContext = Credentials | HttpClient.HttpClient;

export const TypesenseProtocol = /*@__PURE__*/ restProtocol({
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
