import type { ErrorOf } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
/**
 * PrismaProtocol -- hand-written.
 *
 * The Prisma Management API (api.prisma.io) is a plain bearer-auth
 * JSON REST API with no response envelope, so this is a thin
 * `restProtocol` instantiation (see `@distilled.cloud/core/protocol-rest`
 * for the shared request/response machinery). What is Prisma's own:
 *
 *   request:  `Authorization: Bearer <apiToken>` when a token is set, +
 *             base URL from the `Credentials` service (resolved on the
 *             calling fiber per request)
 *
 *   response: non-2xx errors arrive as `{ error: { code, message, hint? } }`
 *             -- matched per-op typed errors first, then the core HTTP status
 *             map (message only, mirroring distilled v0: the envelope's
 *             string `code` is swallowed for status-mapped classes), with
 *             {@link UnknownPrismaError} carrying code/message/hint/
 *             body as the fallback.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownPrismaError, PrismaParseError, type PrismaServiceError } from "./errors.ts";

/**
 * What every generated Prisma operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, PrismaOpError, PrismaOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type PrismaOpError = PrismaServiceError | ErrorOf<typeof PrismaProtocol>;

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

export const PrismaProtocol = /*@__PURE__*/ restProtocol({
  // Resolved per request on the calling fiber -- the Credentials service
  // holds an effect, so rotated tokens are picked up. Its ConfigError
  // channel is erased at this boundary (Protocol effects carry none) and
  // reintroduced for callers by `PrismaOpError`.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => {
    const headers: Record<string, string> = {};
    if (creds.apiToken !== undefined) {
      headers.Authorization = `Bearer ${Redacted.value(creds.apiToken)}`;
    }
    return headers;
  },
  errorEnvelope,
  unknownError: (info) => {
    const env = envelopeOf(info.body);
    return new UnknownPrismaError({
      ...unknownErrorProps(info),
      code: env?.code,
      message: env?.message ?? info.message,
      hint: env?.hint,
    });
  },
  parseError: ({ body, cause }) => new PrismaParseError({ body, cause }),
});
