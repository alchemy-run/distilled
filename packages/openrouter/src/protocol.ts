/**
 * OpenRouterProtocol — the shared bearer-REST protocol instantiated for
 * OpenRouter.
 *
 * OpenRouter speaks plain JSON with no success envelope. Failures carry
 * `{ "error": { "code": <number>, "message": "…", "metadata"?: {…} } }`, where
 * `code` repeats the HTTP status and `metadata` holds the upstream provider's
 * raw error when a routed model failed; both are unwrapped below.
 *
 * There is no API version on the wire beyond the `/api/v1` base path. The
 * document at https://openrouter.ai/openapi.json is the moving target the SDK
 * regenerates against.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import type { ConfigError } from "@distilled.cloud/core/errors";
import { HTTP_STATUS_MAP } from "@distilled.cloud/core/errors";
import {
  makeRestProtocol,
  type RestErrorEnvelope,
} from "@distilled.cloud/core/protocol-rest";
import { Credentials, type Config } from "./credentials.ts";
import {
  PaymentRequired,
  UnknownOpenRouterError,
  type DefaultErrors,
  OpenRouterParseError,
} from "./errors.ts";

/**
 * Error channel shared by every generated OpenRouter operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * OpenRouterOpError, OpenRouterOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type OpenRouterOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated OpenRouter operation. */
export type OpenRouterOpContext = Credentials | HttpClient.HttpClient;

/**
 * OpenRouter error bodies: `{ error: { code, message, metadata? } }`. `code`
 * is numeric (the HTTP status) and passes through as a number: the generated
 * per-operation classes declare `code: number`, and the protocol only hands
 * them a numeric code. Responses without an `error` object (an HTML page from
 * the edge) fall through to the protocol's `HTTP <status>` default.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const err = (body as Record<string, unknown>).error;
  if (typeof err === "string") return { message: err };
  if (err === null || typeof err !== "object") return undefined;
  const e = err as Record<string, unknown>;
  return {
    code:
      typeof e.code === "string" || typeof e.code === "number"
        ? e.code
        : undefined,
    message: typeof e.message === "string" ? e.message : undefined,
  };
};

/** Core's shared map plus OpenRouter's out-of-credit 402. */
const statusMap = { ...HTTP_STATUS_MAP, 402: PaymentRequired };

export const OpenRouterProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // Resolved on the CALLING fiber per request (the layer is memoized per
    // process); the Credentials service holds an effect, so a key rotated
    // between calls is picked up without rebuilding the layer.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    errorEnvelope,
    statusMap,
    unknownError: ({ code, message, body }) =>
      new UnknownOpenRouterError({
        code:
          typeof code === "string"
            ? code
            : code !== undefined
              ? String(code)
              : undefined,
        message,
        body,
      }),
    parseError: ({ body, cause }) => new OpenRouterParseError({ body, cause }),
  });
