import type * as API from "@distilled.cloud/core/api";
import type { API_ERRORS, ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import {
  makeRestProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * BrowserbaseProtocol -- the shared REST protocol instantiated for the
 * Browserbase API.
 *
 *   request:  credentials -> `X-BB-API-Key: <key>` + base URL (default
 *             https://api.browserbase.com), resolved from the calling fiber
 *             on every request
 *
 *   response: 2xx JSON is the payload; non-2xx `{ statusCode, error,
 *             message }` bodies map to the operation's typed error classes,
 *             then the shared HTTP-status classes, then
 *             {@link UnknownBrowserbaseError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { BrowserbaseParseError, UnknownBrowserbaseError } from "./errors.ts";

/**
 * Error channel shared by every generated Browserbase operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * BrowserbaseOpError, BrowserbaseOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type BrowserbaseOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownBrowserbaseError
  | ConfigError
  | HttpClientError.HttpClientError
  | BrowserbaseParseError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated Browserbase operation. */
export type BrowserbaseOpContext = Credentials | HttpClient.HttpClient;

const str = (value: unknown): string | undefined => (typeof value === "string" ? value : undefined);

/**
 * `{ statusCode, error: "<reason phrase>", message }`, with an optional
 * machine-readable `code`. The reason phrase stands in for a missing message.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const rec = body as Record<string, unknown>;
  const code = str(rec.code);
  const message = str(rec.message) ?? str(rec.error);
  if (code === undefined && message === undefined) return undefined;
  return { code, message };
};

export const BrowserbaseProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<Config>({
    // Resolved on the calling fiber per request, so a rotated key is picked
    // up without rebuilding the layer.
    credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
    baseUrl: (creds) => creds.baseUrl,
    headers: (creds) => ({
      "X-BB-API-Key": Redacted.value(creds.apiKey),
    }),
    errorEnvelope,
    unknownError: (info) => new UnknownBrowserbaseError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new BrowserbaseParseError({ body, cause }),
  });
