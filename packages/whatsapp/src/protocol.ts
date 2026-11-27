import type { Checked } from "@distilled.cloud/core/config";
import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * WhatsAppProtocol -- hand-written.
 *
 * Plain JSON REST against the Graph API, https://graph.facebook.com. Every
 * request goes to `<apiBaseUrl>/<apiVersion>/<path>` with the access token
 * as `Authorization: Bearer`; the generated operations carry the path after
 * the version (scripts/convert.ts removes the spec's `/{Version}` segment).
 * Failures are the Graph API error object
 *
 *     { "error": { "message": "...", "type": "OAuthException", "code": 100 } }
 *
 * mapped by status; `code` becomes the error's `code` and `message` its
 * `message`.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { UnknownWhatsAppError, WhatsAppParseError, type WhatsAppServiceError } from "./errors.ts";

/**
 * What every generated WhatsApp operation fails with besides its own errors:
 * the errors declared on the service, and the errors declared on the protocol.
 * Nobody lists the protocol's: its type carries what its code fails with (a
 * response that does not match its schema, a failed response nothing declares,
 * core's REST errors, and what resolving the credentials fails with).
 * Generated service files annotate operations with `API.OperationMethod<I, O,
 * WhatsAppOpError, WhatsAppOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type WhatsAppOpError = WhatsAppServiceError | ErrorOf<typeof WhatsAppProtocol>;

/** Context (requirements) shared by every generated WhatsApp operation. */
export type WhatsAppOpContext = Credentials | HttpClient.HttpClient;

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;

/** `{ error: { code, message } }` -> `{ code, message }`. */
const graphError = (body: unknown): { code?: number; message?: string } | undefined => {
  const error = isRecord(body) && isRecord(body.error) ? body.error : undefined;
  if (error === undefined) return undefined;
  const code = typeof error.code === "number" ? error.code : undefined;
  const message =
    typeof error.message === "string" && error.message !== "" ? error.message : undefined;
  return code === undefined && message === undefined ? undefined : { code, message };
};

/**
 * `<apiBaseUrl>/<apiVersion>`. A version that can't be a URL path segment
 * (`""`, `.`, `..`, a lone UTF-16 surrogate) is refused earlier, when the
 * credentials layer is built (`check` in ./credentials.ts).
 */
const baseUrlFor = (creds: Checked<Config>): string =>
  // oxlint-disable-next-line distilled/no-unguarded-throwing-builtin -- `check` (./credentials.ts) refused a version with a lone surrogate when the layer was built
  `${creds.apiBaseUrl}/${encodeURIComponent(creds.apiVersion)}`;

export const WhatsAppProtocol = /*@__PURE__*/ restProtocol({
  // Resolved on the calling fiber per request.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: baseUrlFor,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.accessToken)}`,
    Accept: "application/json",
  }),
  errorEnvelope: graphError,
  // A typed error's declared fields are read inside `error` first.
  errorFieldsAt: "/error",
  unknownError: (info) => new UnknownWhatsAppError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new WhatsAppParseError({ body, cause }),
});
