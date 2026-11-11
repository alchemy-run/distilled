import type * as API from "@distilled.cloud/core/api";
import type { API_ERRORS, ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol, type RestErrorEnvelope } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * DigitalOceanProtocol -- hand-written.
 *
 * DigitalOcean speaks plain bearer-authenticated JSON REST (no success
 * envelope), so the whole protocol is one `makeRestProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + base URL
 *             (default https://api.digitalocean.com), resolved from the
 *             calling fiber on every request. Generated operations carry
 *             `/v2/...` routes.
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ id, message, request_id? }` bodies
 *             map to the operation's typed error classes by status, then
 *             the shared HTTP-status classes, then
 *             {@link UnknownDigitalOceanError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import {
  Credentials,
  FunctionsCredentials,
  type Config,
  type FunctionsConfig,
} from "./credentials.ts";
import { UnknownDigitalOceanError, DigitalOceanParseError } from "./errors.ts";

/**
 * Error channel shared by every generated DigitalOcean operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * DigitalOceanOpError, DigitalOceanOpContext>` explicitly so the compiler
 * never infers these back out of the schema generics.
 */
export type DigitalOceanOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownDigitalOceanError
  | ConfigError
  | HttpClientError.HttpClientError
  | DigitalOceanParseError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated DigitalOcean operation. */
export type DigitalOceanOpContext = Credentials | HttpClient.HttpClient;

/**
 * DigitalOcean error bodies are `{ id, message, request_id? }` -- `id` is the
 * machine-readable half (`not_found`, `forbidden`, ...). A response that
 * arrives without that envelope falls through to the protocol's `HTTP
 * <status>` default.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const code = typeof b.id === "string" ? b.id : typeof b.code === "string" ? b.code : undefined;
  const message = typeof b.message === "string" ? b.message : undefined;
  if (code === undefined && message === undefined) return undefined;
  return { code, message };
};

export const DigitalOceanProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<Config>({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
    // Data-plane operations (Serverless Inference, the Action Gateway)
    // carry their own host from the spec's operation `servers`.
    baseUrl: (creds, target) => target.baseUrl ?? creds.apiBaseUrl,
    // DigitalOcean expects JSON on every request; DELETE /v2/projects/{id}
    // answers 415 without the header even though it carries no body.
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
      "Content-Type": "application/json",
    }),
    errorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownDigitalOceanError({
        code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
        message,
        body,
      }),
    parseError: ({ body, cause }) => new DigitalOceanParseError({ body, cause }),
  });

/** Context (requirements) of the generated Functions (OpenWhisk) operations. */
export type FunctionsOpContext = FunctionsCredentials | HttpClient.HttpClient;

// OpenWhisk error bodies are `{ error, code }`; `code` is a request id.
const functionsErrorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  return typeof b.error === "string" ? { message: b.error } : undefined;
};

/**
 * The OpenWhisk REST API a Functions namespace serves at its `api_host`,
 * signed with HTTP basic auth: a namespace access key (`<id>:<secret>`) or
 * the namespace's own `<uuid>:<key>`.
 */
export const FunctionsProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<FunctionsConfig>({
    credentials: /*@__PURE__*/ Effect.flatMap(FunctionsCredentials, (resolve) => resolve),
    baseUrl: (creds) => creds.apiHost,
    headers: (creds) => ({
      Authorization: `Basic ${btoa(`${creds.user}:${Redacted.value(creds.secret)}`)}`,
      "Content-Type": "application/json",
    }),
    errorEnvelope: functionsErrorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownDigitalOceanError({
        code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
        message,
        body,
      }),
    parseError: ({ body, cause }) => new DigitalOceanParseError({ body, cause }),
  });
