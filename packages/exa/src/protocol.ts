import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  type RestProtocolOptions,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * Exa protocols -- the shared REST protocol instantiated once per Exa API.
 *
 *   * {@link ExaProtocol} -- the public API (`api` module): `x-api-key:
 *     <apiKey>` to `apiBaseUrl` (default https://api.exa.ai). Websets routes
 *     carry their `/websets` prefix (convert folds the spec's path-level
 *     server into them), so one base URL serves every operation.
 *   * {@link ExaTeamManagementProtocol} -- the Team Management API
 *     (`teamManagement` module): `x-api-key: <serviceApiKey ?? apiKey>` to
 *     `teamManagementBaseUrl` (default
 *     https://admin-api.exa.ai/team-management).
 *
 * Responses are plain JSON with no success envelope. Failures are
 * `{ requestId, error, tag }` (Team Management: `{ error }`); the factory maps
 * them to the operation's typed errors by status, then core's shared status
 * classes, then {@link UnknownExaError} with `tag` as its code.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config, type CredentialsError } from "./credentials.ts";
import { ExaParseError, UnknownExaError, type ExaServiceError } from "./errors.ts";

/**
 * The errors declared on Exa's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link ExaParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownExaError}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type ExaProtocolError = RestProtocolError | ExaParseError | UnknownExaError;

/**
 * What every generated Exa operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, ExaOpError, ExaOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type ExaOpError = ExaServiceError | ExaProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Exa operation. */
export type ExaOpContext = Credentials | HttpClient.HttpClient;

/** `{ requestId, error, tag }` -> `{ code: tag, message: error }`. */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (typeof body !== "object" || body === null) return undefined;
  const { tag, error, message } = body as Record<string, unknown>;
  return {
    code: typeof tag === "string" ? tag : undefined,
    message: typeof error === "string" ? error : typeof message === "string" ? message : undefined,
  };
};

const shared = {
  // Resolved on the calling fiber per request, so a rotated key is picked up.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  errorEnvelope,
  unknownError: (info) => new UnknownExaError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new ExaParseError({ body, cause }),
} satisfies Omit<RestProtocolOptions<Config>, "baseUrl" | "headers">;

// The annotations are the check: everything a protocol fails with, besides
// the errors an operation and the service declare, must be listed there.

/** The public API: search, contents, answer, monitors, agent runs, batches, Websets. */
export const ExaProtocol: Protocol<ExaProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    ...shared,
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({ "x-api-key": Redacted.value(creds.apiKey) }),
  });

/** The Team Management API: API keys and credits, with the service API key. */
export const ExaTeamManagementProtocol: Protocol<ExaProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    ...shared,
    baseUrl: (creds) => creds.teamManagementBaseUrl,
    headers: (creds) => ({
      "x-api-key": Redacted.value(creds.serviceApiKey ?? creds.apiKey),
    }),
  });
