import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * ElasticsearchProtocol -- hand-written.
 *
 * Elasticsearch speaks API-key-authenticated JSON REST (no response
 * envelope), so the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: ApiKey <apiKey>` + base URL
 *             (default http://localhost:9200), resolved from the calling
 *             fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ error?: { type, reason }, status? }`
 *             bodies map to the operation's typed error classes by status,
 *             then the shared HTTP-status classes, then
 *             {@link UnknownElasticsearchError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import {
  UnknownElasticsearchError,
  ElasticsearchParseError,
  type ElasticsearchServiceError,
} from "./errors.ts";

/**
 * The errors declared on Elasticsearch's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link ElasticsearchParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownElasticsearchError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type ElasticsearchProtocolError =
  | RestProtocolError
  | ElasticsearchParseError
  | UnknownElasticsearchError;

/**
 * What every generated Elasticsearch operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, ElasticsearchOpError, ElasticsearchOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type ElasticsearchOpError =
  | ElasticsearchServiceError
  | ElasticsearchProtocolError
  | CredentialsError;

/** Context (requirements) shared by every generated Elasticsearch operation. */
export type ElasticsearchOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const ElasticsearchProtocol: Protocol<
  ElasticsearchProtocolError | CredentialsError,
  Credentials
> = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `ApiKey ${Redacted.value(creds.apiKey)}`,
  }),
  // Elasticsearch's error body is `{ error?: { type, reason }, status? }`
  // -- the factory's default lenient envelope covers `message`/`reason`.
  unknownError: (info) => new UnknownElasticsearchError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new ElasticsearchParseError({ body, cause }),
});
