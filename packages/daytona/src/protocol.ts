import { ConfigError } from "@distilled.cloud/core/errors";
import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
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
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { ANALYTICS_PREFIX, TOOLBOX_ROOTS } from "./endpoints.ts";
import { UnknownDaytonaError, DaytonaParseError, type DaytonaServiceError } from "./errors.ts";

/**
 * What every generated Daytona operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, DaytonaOpError, DaytonaOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type DaytonaOpError = DaytonaServiceError | ErrorOf<typeof DaytonaProtocol>;

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

const baseUrlFor = (creds: Config, uri: string): string | Effect.Effect<never, ConfigError> => {
  if (isAnalytics(uri)) return creds.analyticsBaseUrl;
  if (!isToolbox(uri)) return creds.apiBaseUrl;
  const base = toolboxBaseUrl(creds);
  // Refuses the route: the call fails with this error.
  return typeof base === "string" ? base : Effect.fail(base);
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
    // fromEntries keeps a `__proto__` key an entry instead of the prototype.
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, v]) => v !== null)
        .map(([k, v]) => [k, stripNulls(v)]),
    );
  }
  return value;
};

export const DaytonaProtocol = /*@__PURE__*/ restProtocol({
  // Resolved on the CALLING fiber per request; the Credentials service holds
  // an effect, so a key rotated between calls is picked up.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds, target) => baseUrlFor(creds, target.uri),
  headers: requestHeaders,
  transformResponse: stripNulls,
  unknownError: (info) => new UnknownDaytonaError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new DaytonaParseError({ body, cause }),
});
