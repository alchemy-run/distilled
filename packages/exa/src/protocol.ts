import type * as API from "@distilled.cloud/core/api";
import type { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import {
  makeRestProtocol,
  type RestErrorEnvelope,
  type RestProtocolOptions,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
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
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { ExaParseError, UnknownExaError, type DefaultErrors } from "./errors.ts";

/**
 * Error channel shared by every generated Exa operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, ExaOpError,
 * ExaOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type ExaOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

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
  // Resolved on the calling fiber per request, so a rotated key is picked up
  // without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  errorEnvelope,
  unknownError: (info) => new UnknownExaError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new ExaParseError({ body, cause }),
} satisfies Omit<RestProtocolOptions<Config>, "baseUrl" | "headers">;

/** The public API: search, contents, answer, monitors, agent runs, batches, Websets. */
export const ExaProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<Config>({
  ...shared,
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({ "x-api-key": Redacted.value(creds.apiKey) }),
});

/** The Team Management API: API keys and credits, with the service API key. */
export const ExaTeamManagementProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<Config>({
    ...shared,
    baseUrl: (creds) => creds.teamManagementBaseUrl,
    headers: (creds) => ({
      "x-api-key": Redacted.value(creds.serviceApiKey ?? creds.apiKey),
    }),
  });
