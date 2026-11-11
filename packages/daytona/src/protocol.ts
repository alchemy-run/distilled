import type * as API from "@distilled.cloud/core/api";
import { ConfigError, type InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * DaytonaProtocol -- the shared bearer-REST protocol instantiated for Daytona.
 *
 * Daytona speaks plain JSON with no success envelope. FAILURES carry a
 * `{ message }` body (toolbox `ErrorResponse`) or an untyped NestJS
 * `{ message, statusCode, error }` page (platform). The factory's default
 * envelope already reads `message`.
 *
 * Daytona serves THREE endpoints, and the route picks between them:
 *
 *   * `/organization/...` -> analytics (`analyticsBaseUrl`)
 *   * toolbox roots (`/files`, `/process`, `/git`, `/computeruse`, ...) ->
 *     `toolboxBaseUrl` with `{sandboxId}` substituted
 *   * everything else -> platform (`apiBaseUrl`)
 *
 * A toolbox call without a configured sandbox (when the toolbox URL still
 * contains `{sandboxId}`) fails with `ConfigError`.
 *
 * SUCCESS bodies drop explicit `null` properties before decoding
 * ({@link stripNulls}): Daytona's TypeORM entities serialize every unset
 * column as `null` (`domainAllowList`, `entrypoint`, ...), which the spec
 * declares as optional.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { ANALYTICS_PREFIX, TOOLBOX_ROOTS } from "./endpoints.ts";
import { UnknownDaytonaError, type DefaultErrors, DaytonaParseError } from "./errors.ts";

/**
 * Error channel shared by every generated Daytona operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * DaytonaOpError, DaytonaOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type DaytonaOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated Daytona operation. */
export type DaytonaOpContext = Credentials | HttpClient.HttpClient;

const TOOLBOX_ROOT_SET: ReadonlySet<string> = /*@__PURE__*/ new Set(TOOLBOX_ROOTS);

const firstSegment = (uri: string): string => uri.split("/").filter(Boolean)[0] ?? "";

const isAnalytics = (uri: string): boolean =>
  uri === "/organization" || uri.startsWith(ANALYTICS_PREFIX);

const isToolbox = (uri: string): boolean => TOOLBOX_ROOT_SET.has(firstSegment(uri));

/**
 * The toolbox root for the configured sandbox, or the `ConfigError` a
 * toolbox call fails with when no sandbox is configured.
 */
export const toolboxBaseUrl = (creds: Config): string | ConfigError => {
  if (!creds.toolboxBaseUrl.includes("{sandboxId}")) {
    return creds.toolboxBaseUrl;
  }
  if (creds.sandboxId === undefined || creds.sandboxId === "") {
    return new ConfigError({
      message:
        `Daytona toolbox calls are sandbox-scoped (${creds.toolboxBaseUrl}) \u2014 ` +
        `configure a sandbox (DAYTONA_SANDBOX_ID or credentials({ sandboxId })) to call them`,
    });
  }
  return creds.toolboxBaseUrl.replaceAll("{sandboxId}", creds.sandboxId);
};

const baseUrlFor = (creds: Config, uri: string): string => {
  if (isAnalytics(uri)) return creds.analyticsBaseUrl;
  if (!isToolbox(uri)) return creds.apiBaseUrl;
  const base = toolboxBaseUrl(creds);
  if (typeof base !== "string") throw base;
  return base;
};

/**
 * The SDK version Daytona sees. The daemon shapes some replies by it:
 * from 0.167.0 session logs come back as JSON with separate `stdout` and
 * `stderr`, and followed logs carry stdout/stderr markers. This is the
 * Daytona Cloud version the SDK was generated and tested against.
 */
export const SDK_VERSION = "0.229.2";

/** The headers every Daytona request carries: auth, organization, SDK version. */
export const requestHeaders = (creds: Config): Record<string, string> => {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    "X-Daytona-SDK-Version": SDK_VERSION,
    "X-Daytona-Source": "distilled",
  };
  if (creds.organizationId !== undefined && creds.organizationId !== "") {
    headers["X-Daytona-Organization-ID"] = creds.organizationId;
  }
  return headers;
};

/** Recursively drop `null` properties so unset optional fields decode as absent. */
export const stripNulls = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(stripNulls);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === null) continue;
      out[k] = stripNulls(v);
    }
    return out;
  }
  return value;
};

export const DaytonaProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<Config>({
  // Resolved on the CALLING fiber per request (the layer is memoized per
  // process); the Credentials service holds an effect, so a key rotated
  // between calls is picked up without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  baseUrl: (creds, target) => baseUrlFor(creds, target.uri),
  headers: requestHeaders,
  transformResponse: stripNulls,
  unknownError: ({ code, message, body }) =>
    new UnknownDaytonaError({
      code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
      message,
      body,
    }),
  parseError: ({ body, cause }) => new DaytonaParseError({ body, cause }),
});
