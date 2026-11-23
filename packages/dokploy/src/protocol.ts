import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
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
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { DokployParseError, UnknownDokployError, type DokployServiceError } from "./errors.ts";

/**
 * What every generated Dokploy operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, DokployOpError, DokployOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type DokployOpError = DokployServiceError | ErrorOf<typeof DokployProtocol>;

/** Context (requirements) shared by every generated Dokploy operation. */
export type DokployOpContext = Credentials | HttpClient.HttpClient;

export const DokployProtocol = /*@__PURE__*/ restProtocol({
  // Resolved on the calling fiber per request, so a rotated key is picked up.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => `${creds.url}/api`,
  headers: (creds) => ({
    "x-api-key": Redacted.value(creds.apiKey),
  }),
  unknownError: (info) => new UnknownDokployError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new DokployParseError({ body, cause }),
});
