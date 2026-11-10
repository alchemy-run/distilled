import type * as API from "@distilled.cloud/core/api";
import type { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * NpmProtocol -- the shared bearer-REST protocol instantiated for the npm
 * registry API.
 *
 * Requests go to the configured registry (https://registry.npmjs.org by
 * default) and carry `Authorization: Bearer <token>` when the credentials
 * hold a token; without one only public operations (search, bulk audit)
 * succeed. Responses are plain JSON with no success envelope; the staged
 * tarball is read as bytes.
 *
 * Failures are `{ error }` or `{ message }` bodies, which core's default
 * envelope reader handles. They map to the operation's typed errors by
 * status, then core's shared HTTP status classes, then
 * {@link UnknownNpmError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { NpmParseError, UnknownNpmError, type DefaultErrors } from "./errors.ts";

/**
 * Error channel shared by every generated npm registry operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * NpmOpError, NpmOpContext>` explicitly so the compiler never infers these
 * back out of the schema generics.
 */
export type NpmOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated npm registry operation. */
export type NpmOpContext = Credentials | HttpClient.HttpClient;

export const NpmProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<Config>({
  // Resolved on the calling fiber per request, so a rotated token is picked
  // up without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  baseUrl: (creds) => creds.registryUrl,
  headers: (creds): Record<string, string> =>
    creds.token === undefined ? {} : { Authorization: `Bearer ${Redacted.value(creds.token)}` },
  unknownError: ({ code, message, body }) =>
    new UnknownNpmError({
      code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
      message,
      body,
    }),
  parseError: ({ body, cause }) => new NpmParseError({ body, cause }),
});
