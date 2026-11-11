import type * as API from "@distilled.cloud/core/api";
import type { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * DokployProtocol -- the shared REST protocol instantiated for the Dokploy
 * API.
 *
 * Requests carry the API key as `x-api-key` and go to `<url>/api`, where
 * `url` is the self-hosted instance from the credentials. Each procedure is
 * one path (`GET /api/project.all`, `POST /api/application.deploy`); queries
 * take their input as query parameters, mutations as a JSON body. Responses
 * are plain JSON with no success envelope.
 *
 * Failures are tRPC error bodies, `{ message, code, issues? }`. The default
 * envelope reads `message` and `code` (`NOT_FOUND`, `BAD_REQUEST`, ...);
 * per-operation classes match by status, then core's shared status map, then
 * {@link UnknownDokployError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { DokployParseError, UnknownDokployError, type DefaultErrors } from "./errors.ts";

/**
 * Error channel shared by every generated Dokploy operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * DokployOpError, DokployOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type DokployOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated Dokploy operation. */
export type DokployOpContext = Credentials | HttpClient.HttpClient;

export const DokployProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<Config>({
  // Resolved on the calling fiber per request, so a rotated key is picked up
  // without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  baseUrl: (creds) => `${creds.url}/api`,
  headers: (creds) => ({
    "x-api-key": Redacted.value(creds.apiKey),
  }),
  unknownError: ({ code, message, body }) =>
    new UnknownDokployError({
      code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
      message,
      body,
    }),
  parseError: ({ body, cause }) => new DokployParseError({ body, cause }),
});
