import type * as API from "@distilled.cloud/core/api";
import type { ConfigError } from "@distilled.cloud/core/errors";
import { HTTP_STATUS_MAP, ServiceUnavailable } from "@distilled.cloud/core/errors";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
/**
 * NotionProtocol — the shared bearer-REST protocol instantiated for Notion.
 *
 * Notion speaks plain JSON with no success envelope. Every request carries
 * `Authorization: Bearer <token>` and the required `Notion-Version` header.
 * Failures carry `{ object: "error", status, code, message }`, which the
 * factory's default envelope extractor already reads. 529
 * (`service_overload`) maps to the shared, retryable `ServiceUnavailable`.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { NotionParseError, UnknownNotionError, type DefaultErrors } from "./errors.ts";

/**
 * Error channel shared by every generated Notion operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * NotionOpError, NotionOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type NotionOpError = DefaultErrors | ConfigError | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Notion operation. */
export type NotionOpContext = Credentials | HttpClient.HttpClient;

export const NotionProtocol: Layer.Layer<API.Protocol> = makeRestProtocol<Config>({
  // Resolved on the CALLING fiber per request (the layer is memoized per
  // process); the Credentials service holds an effect, so a token rotated
  // between calls is picked up without rebuilding the layer.
  credentials: Effect.gen(function* () {
    const resolve = yield* Credentials;
    return yield* resolve;
  }),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.token)}`,
    "Notion-Version": creds.notionVersion,
  }),
  statusMap: {
    ...HTTP_STATUS_MAP,
    529: ServiceUnavailable,
  },
  unknownError: ({ code, message, body }) =>
    new UnknownNotionError({
      code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
      message,
      body,
    }),
  parseError: ({ body, cause }) => new NotionParseError({ body, cause }),
});
