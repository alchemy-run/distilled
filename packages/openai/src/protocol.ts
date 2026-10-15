import * as API from "@distilled.cloud/core/api";
import type { API_ERRORS, ConfigError } from "@distilled.cloud/core/errors";
import { getAnn } from "@distilled.cloud/core/protocol-http";
import { makeRestProtocol, type RestErrorEnvelope } from "@distilled.cloud/core/protocol-rest";
/**
 * OpenAIProtocol — hand-written.
 *
 * OpenAI speaks plain JSON REST (no success envelope), so the wire work is
 * one `makeRestProtocol` call from `core/protocol-rest`, wrapped to add what
 * is OpenAI-specific:
 *
 *   request:  `Authorization: Bearer <key>` where the key is chosen per
 *             operation — the admin key for Admin-API operations (inputs
 *             marked `T.AdminAuth()`), the API key otherwise — failing with
 *             {@link MissingCredentials} before anything is sent when that
 *             key isn't configured; optional `OpenAI-Organization` /
 *             `OpenAI-Project` headers; base URL from the credentials.
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`; event-stream operations decode each SSE `data`
 *             the same way). Non-2xx bodies are OpenAI's
 *             `{ "error": { message, type, param, code } }` envelope (or
 *             `{ "error": "<message>" }` from some Admin-API routes) and map
 *             to the operation's typed errors, then the account-wide
 *             {@link COMMON_ERRORS} (matched on the body), then the shared
 *             HTTP-status classes, then {@link UnknownOpenAIError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Layer from "effect/Layer";
import { bearer, Credentials, type Config } from "./credentials.ts";
import {
  COMMON_ERRORS,
  type CommonErrors,
  MissingCredentials,
  OpenAIParseError,
  UnknownOpenAIError,
} from "./errors.ts";
import { adminAuthSymbol } from "./traits.ts";

/**
 * Error channel shared by every generated OpenAI operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * OpenAIOpError, OpenAIOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type OpenAIOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | CommonErrors
  | UnknownOpenAIError
  | ConfigError
  | HttpClientError.HttpClientError
  | OpenAIParseError;

/** Context (requirements) shared by every generated OpenAI operation. */
export type OpenAIOpContext = Credentials | HttpClient.HttpClient;

const resolveCredentials: Effect.Effect<Config> = Effect.gen(function* () {
  const resolve = yield* Credentials;
  return yield* resolve;
}) as Effect.Effect<Config>;

/**
 * `{ "error": { message, type, param, code } }` → `{ code, message }`. The
 * string `code` (e.g. `invalid_api_key`) falls back to the `type`; some
 * Admin-API routes send `{ "error": "<message>" }` instead.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const error = (body as { error?: unknown }).error;
  if (typeof error === "string") return { message: error };
  if (error === null || typeof error !== "object") {
    const b = body as { message?: unknown };
    return typeof b.message === "string" ? { message: b.message } : undefined;
  }
  const e = error as { message?: unknown; code?: unknown; type?: unknown };
  const code =
    typeof e.code === "string" || typeof e.code === "number"
      ? e.code
      : typeof e.type === "string"
        ? e.type
        : undefined;
  return { code, message: typeof e.message === "string" ? e.message : undefined };
};

/** The plain REST protocol: base URL, scoping headers, error decoding. */
const RestProtocol = makeRestProtocol<Config>({
  credentials: resolveCredentials,
  baseUrl: (creds) => creds.apiBaseUrl,
  // Authorization is per operation — added by OpenAIProtocol below.
  headers: (creds): Record<string, string> => ({
    ...(creds.organization ? { "OpenAI-Organization": creds.organization } : {}),
    ...(creds.project ? { "OpenAI-Project": creds.project } : {}),
  }),
  errorEnvelope,
  unknownError: ({ code, message, body }) =>
    new UnknownOpenAIError({
      code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
      message,
      body,
    }),
  parseError: ({ body, cause }) => new OpenAIParseError({ body, cause }),
});

export const OpenAIProtocol: Layer.Layer<API.Protocol> = Layer.effect(
  API.Protocol,
  Effect.gen(function* () {
    const rest = yield* API.Protocol;
    return API.Protocol.of({
      ...rest,
      encode: (args) =>
        Effect.gen(function* () {
          const creds = yield* resolveCredentials;
          const admin = getAnn(args.inputAst, adminAuthSymbol) === true;
          const key = admin ? creds.adminKey : creds.apiKey;
          if (key === undefined) {
            return yield* Effect.fail(
              admin
                ? new MissingCredentials({
                    credential: "OPENAI_ADMIN_KEY",
                    message:
                      "This is an OpenAI Admin API operation and needs an admin key (sk-admin-…): set OPENAI_ADMIN_KEY or pass credentials({ adminKey })",
                  })
                : new MissingCredentials({
                    credential: "OPENAI_API_KEY",
                    message:
                      "This OpenAI operation needs an API key: set OPENAI_API_KEY or pass credentials({ apiKey })",
                  }),
            );
          }
          const request = yield* rest.encode(args);
          return HttpClientRequest.setHeader(request, "authorization", bearer(key));
          // Protocol.encode has no error channel; the failure is typed for
          // callers by OpenAIOpError (as core's REST protocol does).
        }) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
      // Account-wide failures (bad key, quota, rate limit, unknown model)
      // can come back from any operation.
      decode: (args) => rest.decode({ ...args, errors: [...args.errors, ...COMMON_ERRORS] }),
    });
  }),
).pipe(Layer.provide(RestProtocol));
