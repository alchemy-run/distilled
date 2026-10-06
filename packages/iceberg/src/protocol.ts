import type * as API from "@distilled.cloud/core/api";
import type { ConfigError } from "@distilled.cloud/core/errors";
import { HTTP_STATUS_MAP } from "@distilled.cloud/core/errors";
import { makeRestProtocol, type RestErrorEnvelope } from "@distilled.cloud/core/protocol-rest";
/**
 * IcebergProtocol — the shared bearer-REST protocol instantiated for the
 * Apache Iceberg REST Catalog API.
 *
 * request:  `<uri>/v1/<prefix><route>`. The generated routes carry neither
 *           the `/v1` version nor the per-warehouse `{prefix}` (see
 *           scripts/convert.ts); both come from the credentials. `/config`
 *           is the one route without a prefix — it is how a client learns
 *           the prefix. Auth is an optional `Authorization: Bearer` token.
 *
 * response: plain JSON, no success envelope. Failures are
 *           `{ error: { message, type, code } }`. Per-operation exceptions
 *           match first, on status AND `error.type`; then the shared status
 *           map (core's, plus 419 AuthenticationTimeout); then
 *           UnknownIcebergError.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import {
  AuthenticationTimeout,
  IcebergParseError,
  UnknownIcebergError,
  type DefaultErrors,
} from "./errors.ts";

/**
 * Error channel shared by every generated Iceberg operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * IcebergOpError, IcebergOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type IcebergOpError = DefaultErrors | ConfigError | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Iceberg operation. */
export type IcebergOpContext = Credentials | HttpClient.HttpClient;

/** Routes that are not scoped to a warehouse prefix. */
const UNPREFIXED_ROUTES = new Set(["/config"]);

/** `<uri>/v1` or `<uri>/v1/<prefix>` for a route. Exported for tests. */
export const baseUrlFor = (creds: Config, uri: string): string => {
  const root = `${creds.uri.replace(/\/+$/, "")}/v1`;
  const prefix = creds.prefix?.replace(/^\/+|\/+$/g, "");
  return UNPREFIXED_ROUTES.has(uri) || !prefix ? root : `${root}/${prefix}`;
};

/**
 * Iceberg nests the failure under `error`: `{ error: { message, type, code
 * } }`. A body without it (a proxy 502, an HTML error page) falls through to
 * the protocol's `HTTP <status>` default.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const error = (body as Record<string, unknown>).error;
  if (error === null || typeof error !== "object") return undefined;
  const e = error as Record<string, unknown>;
  return {
    code: typeof e.code === "number" || typeof e.code === "string" ? e.code : undefined,
    message: typeof e.message === "string" ? e.message : undefined,
  };
};

export const IcebergProtocol: Layer.Layer<API.Protocol> = makeRestProtocol<Config>({
  // Resolved on the CALLING fiber per request; the Credentials service holds
  // an effect, so a token rotated between calls is picked up.
  credentials: Effect.gen(function* () {
    const resolve = yield* Credentials;
    return yield* resolve;
  }),
  baseUrl: (creds, target) => baseUrlFor(creds, target.uri),
  headers: (creds): Record<string, string> =>
    creds.token ? { Authorization: `Bearer ${Redacted.value(creds.token)}` } : {},
  errorEnvelope,
  statusMap: {
    ...HTTP_STATUS_MAP,
    419: AuthenticationTimeout,
  },
  unknownError: ({ code, message, body }) =>
    new UnknownIcebergError({
      code: code !== undefined ? String(code) : undefined,
      message,
      body,
    }),
  parseError: ({ body, cause }) => new IcebergParseError({ body, cause }),
});
