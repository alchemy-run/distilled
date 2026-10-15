/**
 * OpenRouterProtocol — hand-written.
 *
 * OpenRouter speaks plain JSON REST, so the protocol is core's
 * `makeRestProtocol` plus two OpenRouter specifics:
 *
 *   request:  credentials resolved from the calling fiber on every request;
 *             base URL (default https://openrouter.ai/api/v1); optional
 *             `HTTP-Referer` / `X-Title` attribution headers; and
 *             `Authorization: Bearer <key>` where the KEY IS CHOSEN PER
 *             OPERATION — the management key for the account-administration
 *             routes in {@link MANAGEMENT_ROUTE_PREFIXES}, the API key for
 *             everything else, each falling back to the other when only one
 *             is configured (no header when neither is: public routes).
 *
 *   response: 2xx JSON is the payload; non-2xx bodies carry the envelope
 *             `{ error: { code, message, metadata? } }` and map to the
 *             operation's typed classes (per-op matchers), then
 *             {@link STATUS_MAP}, then `InternalServerError` for any other
 *             5xx, then {@link UnknownOpenRouterError}. Event-stream
 *             operations (`*Stream`) decode each SSE `data` frame the same
 *             way and end at `data: [DONE]`.
 */
import * as API from "@distilled.cloud/core/api";
import type { API_ERRORS } from "@distilled.cloud/core/errors";
import { getAnn } from "@distilled.cloud/core/protocol-http";
import { makeRestProtocol, type RestErrorEnvelope } from "@distilled.cloud/core/protocol-rest";
import { httpSymbol, type HttpTrait } from "@distilled.cloud/core/trait";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import {
  OpenRouterParseError,
  STATUS_MAP,
  UnknownOpenRouterError,
  type StatusErrors,
} from "./errors.ts";

/**
 * Error channel shared by every generated OpenRouter operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * OpenRouterOpError, OpenRouterOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type OpenRouterOpError =
  | StatusErrors
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownOpenRouterError
  | HttpClientError.HttpClientError
  | OpenRouterParseError;

/** Context (requirements) shared by every generated OpenRouter operation. */
export type OpenRouterOpContext = Credentials | HttpClient.HttpClient;

/**
 * Routes that require a management (provisioning) key — every operation
 * whose spec description says "Management key required", plus the API-key
 * administration endpoints under `/keys`. `/key` (singular: inspect the
 * calling key) and `/auth/keys` (OAuth PKCE exchange) are NOT management
 * routes.
 */
export const MANAGEMENT_ROUTE_PREFIXES: ReadonlyArray<string> = [
  "/activity",
  "/analytics",
  "/byok",
  "/credits",
  "/end-users",
  "/generation/feedback",
  "/guardrails",
  "/keys",
  "/observability",
  "/organization",
  "/private-endpoints",
  "/scim",
  "/workspaces",
];

/** Whether an operation route (`/keys/{hash}`) is a management route. */
export const isManagementRoute = (uri: string): boolean =>
  MANAGEMENT_ROUTE_PREFIXES.some(
    (prefix) => uri === prefix || uri.startsWith(`${prefix}/`) || uri.startsWith(`${prefix}?`),
  );

/** The key to authenticate an operation with: preferred kind first, then the other. */
export const selectKey = (creds: Config, uri: string): Redacted.Redacted<string> | undefined =>
  isManagementRoute(uri)
    ? (creds.managementKey ?? creds.apiKey)
    : (creds.apiKey ?? creds.managementKey);

// The Credentials service holds an effect — resolving it here (per request,
// on the calling fiber) picks up context-provided credentials.
const resolveCredentials = Effect.gen(function* () {
  const resolve = yield* Credentials;
  return yield* resolve;
});

/** `{ error: { code, message } }` → `{ code, message }`, tolerating flat bodies. */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const inner =
    b.error !== null && typeof b.error === "object" ? (b.error as Record<string, unknown>) : b;
  const code =
    typeof inner.code === "number" || typeof inner.code === "string" ? inner.code : undefined;
  const message =
    typeof inner.message === "string"
      ? inner.message
      : typeof b.error === "string"
        ? b.error
        : typeof b.message === "string"
          ? b.message
          : undefined;
  return { code, message };
};

const RestProtocol = makeRestProtocol<Config>({
  credentials: resolveCredentials,
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds): Record<string, string> => {
    const headers: Record<string, string> = {};
    if (creds.referer !== undefined) headers["HTTP-Referer"] = creds.referer;
    if (creds.title !== undefined) headers["X-Title"] = creds.title;
    return headers;
  },
  errorEnvelope,
  statusMap: STATUS_MAP,
  unknownError: ({ code, message, body }) =>
    new UnknownOpenRouterError({
      code:
        typeof code === "number"
          ? code
          : typeof code === "string" && /^\d+$/.test(code)
            ? Number(code)
            : undefined,
      message,
      body,
    }),
  parseError: ({ body, cause }) => new OpenRouterParseError({ body, cause }),
});

/**
 * The OpenRouter protocol layer: the REST protocol above, with the
 * `Authorization` header chosen per operation route (see {@link selectKey}).
 */
export const OpenRouterProtocol: Layer.Layer<API.Protocol> = Layer.effect(
  API.Protocol,
  Effect.gen(function* () {
    const rest = yield* API.Protocol;
    return API.Protocol.of({
      ...rest,
      encode: (args) =>
        Effect.gen(function* () {
          const request = yield* rest.encode(args);
          const creds = yield* resolveCredentials;
          const http = getAnn(args.inputAst, httpSymbol) as HttpTrait | undefined;
          const key = selectKey(creds, http?.uri ?? "");
          return key === undefined
            ? request
            : HttpClientRequest.setHeader(
                request,
                "Authorization",
                `Bearer ${Redacted.value(key)}`,
              );
          // Credentials are resolved on the calling fiber; the requirement is
          // reintroduced for callers by `OpenRouterOpContext`.
        }) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    });
  }),
).pipe(Layer.provide(RestProtocol));
