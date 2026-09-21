import type * as API from "@distilled.cloud/core/api";
import { ConfigError } from "@distilled.cloud/core/errors";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
/**
 * DaytonaProtocol — the shared bearer-REST protocol instantiated for Daytona.
 *
 * Daytona speaks plain JSON with no success envelope. FAILURES carry a
 * `{ message }` body (toolbox `ErrorResponse`) or an untyped NestJS
 * `{ message, statusCode, error }` page (platform). The factory's default
 * envelope already reads `message`.
 *
 * Daytona serves THREE endpoints, and the route picks between them:
 *
 *   • `/organization/…` → analytics (`analyticsBaseUrl`)
 *   • toolbox roots (`/files`, `/process`, `/git`, `/computeruse`, …) →
 *     `toolboxBaseUrl` with `{sandboxId}` substituted
 *   • everything else → platform (`apiBaseUrl`)
 *
 * A toolbox call without a configured sandbox (when the toolbox URL still
 * contains `{sandboxId}`) fails with `ConfigError`.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import { Credentials, type Config } from "./credentials.ts";
import { ANALYTICS_PREFIX, TOOLBOX_ROOTS } from "./endpoints.ts";
import { UnknownDaytonaError, type DefaultErrors } from "./errors.ts";

/**
 * Error channel shared by every generated Daytona operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * DaytonaOpError, DaytonaOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type DaytonaOpError = DefaultErrors | ConfigError | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Daytona operation. */
export type DaytonaOpContext = Credentials | HttpClient.HttpClient;

const TOOLBOX_ROOT_SET: ReadonlySet<string> = new Set(TOOLBOX_ROOTS);

const firstSegment = (uri: string): string => uri.split("/").filter(Boolean)[0] ?? "";

const isAnalytics = (uri: string): boolean =>
  uri === "/organization" || uri.startsWith(ANALYTICS_PREFIX);

const isToolbox = (uri: string): boolean => TOOLBOX_ROOT_SET.has(firstSegment(uri));

const baseUrlFor = (creds: Config, uri: string): string => {
  if (isAnalytics(uri)) return creds.analyticsBaseUrl;
  if (!isToolbox(uri)) return creds.apiBaseUrl;

  if (!creds.toolboxBaseUrl.includes("{sandboxId}")) {
    return creds.toolboxBaseUrl;
  }
  if (creds.sandboxId === undefined || creds.sandboxId === "") {
    throw new ConfigError({
      message:
        `Daytona operation on ${uri} is toolbox-scoped (${creds.toolboxBaseUrl}) — ` +
        `configure a sandbox (DAYTONA_SANDBOX_ID or credentials({ sandboxId })) to call it`,
    });
  }
  return creds.toolboxBaseUrl.replaceAll("{sandboxId}", creds.sandboxId);
};

export const DaytonaProtocol: Layer.Layer<API.Protocol> = makeRestProtocol<Config>({
  // Resolved on the CALLING fiber per request (the layer is memoized per
  // process); the Credentials service holds an effect, so a key rotated
  // between calls is picked up without rebuilding the layer.
  credentials: Effect.gen(function* () {
    const resolve = yield* Credentials;
    return yield* resolve;
  }),
  baseUrl: (creds, target) => baseUrlFor(creds, target.uri),
  headers: (creds) => {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    };
    if (creds.organizationId !== undefined && creds.organizationId !== "") {
      headers["X-Daytona-Organization-ID"] = creds.organizationId;
    }
    return headers;
  },
  unknownError: ({ code, message, body }) =>
    new UnknownDaytonaError({
      code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
      message,
      body,
    }),
});
