import type * as API from "@distilled.cloud/core/api";
import type { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * Questrade protocol -- the shared REST protocol with Questrade's auth.
 *
 * Every call goes to the API server the access token was issued for
 * (`api_server` from the token redemption, see credentials.ts) with
 * `Authorization: Bearer <access token>`; the operation routes carry their
 * `/v1` prefix.
 *
 * Responses are plain JSON with no success envelope. Failures are
 * `{ code, message }` with a numeric code; core's default error envelope
 * reads both, and the factory maps the status to core's shared classes, then
 * {@link UnknownQuestradeError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { QuestradeParseError, UnknownQuestradeError, type DefaultErrors } from "./errors.ts";

/**
 * Error channel shared by every generated Questrade operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * QuestradeOpError, QuestradeOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type QuestradeOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated Questrade operation. */
export type QuestradeOpContext = Credentials | HttpClient.HttpClient;

export const QuestradeProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<Config>({
  // Resolved on the calling fiber per request, so a refreshed token is
  // picked up without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  baseUrl: (creds) => creds.apiServer,
  headers: (creds) => ({ authorization: `Bearer ${Redacted.value(creds.accessToken)}` }),
  unknownError: ({ code, message, body }) =>
    new UnknownQuestradeError({
      code: code !== undefined ? String(code) : undefined,
      message,
      body,
    }),
  parseError: ({ body, cause }) => new QuestradeParseError({ body, cause }),
});
