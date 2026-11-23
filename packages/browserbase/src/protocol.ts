import type { ErrorOf } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
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
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import {
  BrowserbaseParseError,
  UnknownBrowserbaseError,
  type BrowserbaseServiceError,
} from "./errors.ts";

/**
 * What every generated Browserbase operation fails with besides its own
 * errors: the errors declared on the service, and the errors declared on the
 * protocol. Nobody lists the protocol's: its type carries what its code fails
 * with (a response that does not match its schema, a failed response nothing
 * declares, core's REST errors, and what resolving the credentials fails
 * with). Generated service files annotate operations with
 * `API.OperationMethod<I, O, BrowserbaseOpError, BrowserbaseOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type BrowserbaseOpError = BrowserbaseServiceError | ErrorOf<typeof BrowserbaseProtocol>;

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

export const BrowserbaseProtocol = /*@__PURE__*/ restProtocol({
  // Resolved on the calling fiber per request, so a rotated key is picked
  // up without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.baseUrl,
  headers: (creds) => ({
    "X-BB-API-Key": Redacted.value(creds.apiKey),
  }),
  errorEnvelope,
  unknownError: (info) => new UnknownBrowserbaseError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new BrowserbaseParseError({ body, cause }),
});
