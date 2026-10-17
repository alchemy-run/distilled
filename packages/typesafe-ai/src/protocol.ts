/**
 * TypesafeAiProtocol — hand-written.
 *
 * TypeSafe speaks bearer-authenticated JSON REST (no success envelope).
 *
 *   request:  credentials → `Authorization: Bearer <apiKey>` + base URL
 *             (default https://api.typesafe.ai), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload; non-2xx FastAPI `{ detail }` bodies
 *             map to the operation's typed error classes by status, then the
 *             shared HTTP-status classes (plus 529 {@link Overloaded}), then
 *             {@link UnknownTypesafeAiError}.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import {
  makeRestProtocol,
  type RestErrorEnvelope,
} from "@distilled.cloud/core/protocol-rest";
import {
  HTTP_STATUS_MAP,
  type API_ERRORS,
  type ConfigError,
} from "@distilled.cloud/core/errors";
import { Credentials, type Config } from "./credentials.ts";
import { Overloaded, UnknownTypesafeAiError } from "./errors.ts";

/**
 * Error channel shared by every generated TypeSafe AI operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * TypesafeAiOpError, TypesafeAiOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type TypesafeAiOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | Overloaded
  | UnknownTypesafeAiError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated TypeSafe AI operation. */
export type TypesafeAiOpContext = Credentials | HttpClient.HttpClient;

/**
 * TypeSafe (FastAPI) failures are `{ detail: string | ValidationError[] }`.
 * 422 bodies list per-field errors; 401/429 often send a string.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const rec = body as Record<string, unknown>;
  const detail = rec.detail;
  if (typeof detail === "string") return { message: detail };
  if (Array.isArray(detail)) {
    const parts: string[] = [];
    for (const item of detail) {
      if (item === null || typeof item !== "object") continue;
      const d = item as Record<string, unknown>;
      const msg = typeof d.msg === "string" ? d.msg : undefined;
      if (!msg) continue;
      const loc = Array.isArray(d.loc) ? d.loc.join(".") : undefined;
      parts.push(loc ? `${loc}: ${msg}` : msg);
    }
    if (parts.length > 0) return { message: parts.join("; ") };
  }
  if (typeof rec.message === "string") return { message: rec.message };
  return undefined;
};

export const TypesafeAiProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    errorEnvelope,
    statusMap: {
      ...HTTP_STATUS_MAP,
      529: Overloaded,
    },
    unknownError: ({ code, message, body }) =>
      new UnknownTypesafeAiError({
        code:
          typeof code === "string"
            ? code
            : code !== undefined
              ? String(code)
              : undefined,
        message,
        body,
      }),
  });
