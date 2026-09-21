import type * as API from "@distilled.cloud/core/api";
import type { ConfigError } from "@distilled.cloud/core/errors";
import { makeRestProtocol, type RestErrorEnvelope } from "@distilled.cloud/core/protocol-rest";
/**
 * PrismaProtocol — hand-written.
 *
 * The Prisma Management API (api.prisma.io) is a plain bearer-auth
 * JSON REST API with no response envelope, so this is a thin
 * `makeRestProtocol` instantiation (see `@distilled.cloud/core/protocol-rest`
 * for the shared request/response machinery). What is Prisma's own:
 *
 *   request:  `Authorization: Bearer <apiToken>` + base URL from the
 *             `Credentials` service (resolved on the calling fiber per
 *             request)
 *
 *   response: non-2xx errors arrive as `{ error: { code, message, hint? } }`
 *             — matched per-op typed errors first, then the core HTTP status
 *             map (message only, mirroring distilled v0: the envelope's
 *             string `code` is swallowed for status-mapped classes), with
 *             {@link UnknownPrismaError} carrying code/message/hint/
 *             body as the fallback.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import { Credentials, type Config } from "./credentials.ts";
import { type DefaultErrors, UnknownPrismaError } from "./errors.ts";

/**
 * Error channel shared by every generated Prisma operation.
 * Generated service files annotate operations with `API.OperationMethod<I, O,
 * PrismaOpError, PrismaOpContext>` explicitly so the compiler
 * never infers these back out of the schema generics.
 */
export type PrismaOpError = DefaultErrors | ConfigError | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Prisma operation. */
export type PrismaOpContext = Credentials | HttpClient.HttpClient;

/** The `{ error: { code, message, hint? } }` envelope, read leniently. */
const envelopeOf = (
  body: unknown,
): { code?: string; message?: string; hint?: string } | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const err = (body as Record<string, unknown>).error;
  if (err === null || typeof err !== "object") return undefined;
  const e = err as Record<string, unknown>;
  return {
    code: typeof e.code === "string" ? e.code : undefined,
    message: typeof e.message === "string" ? e.message : undefined,
    hint: typeof e.hint === "string" ? e.hint : undefined,
  };
};

const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  const env = envelopeOf(body);
  return env && { code: env.code, message: env.message };
};

export const PrismaProtocol: Layer.Layer<API.Protocol> = makeRestProtocol<Config>({
  // Resolved per request on the calling fiber — the Credentials service
  // holds an effect, so rotated tokens are picked up. Its ConfigError
  // channel is erased at this boundary (Protocol effects carry none) and
  // reintroduced for callers by `PrismaOpError`.
  credentials: Effect.gen(function* () {
    const resolve = yield* Credentials;
    return yield* resolve;
  }),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiToken)}`,
  }),
  errorEnvelope,
  unknownError: (info) => {
    const env = envelopeOf(info.body);
    return new UnknownPrismaError({
      code: env?.code,
      message: env?.message ?? info.message,
      hint: env?.hint,
      body: info.body,
    });
  },
});
