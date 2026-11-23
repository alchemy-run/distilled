import type { ErrorOf } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
/**
 * SproutboatProtocol -- the shared REST protocol instantiated for the
 * Sproutboat Cloud API.
 *
 *   request:  credentials -> `Authorization: Bearer <key>` + base URL
 *             (default https://dash.sproutboat.com), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload; non-2xx `{ error, reason?, path?,
 *             need?, retry_after_s? }` bodies map to the operation's typed
 *             error classes (matched on `reason`), then the service's
 *             HTTP-status classes, then {@link UnknownSproutboatError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import {
  SproutboatParseError,
  UnknownSproutboatError,
  type SproutboatServiceError,
} from "./errors.ts";

/**
 * What every generated Sproutboat operation fails with besides its own
 * errors: the errors declared on the service, and the errors declared on
 * the protocol. Nobody lists the protocol's: its type carries what its code
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, SproutboatOpError, SproutboatOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type SproutboatOpError = SproutboatServiceError | ErrorOf<typeof SproutboatProtocol>;

/** Context (requirements) shared by every generated Sproutboat operation. */
export type SproutboatOpContext = Credentials | HttpClient.HttpClient;

const str = (value: unknown): string | undefined => (typeof value === "string" ? value : undefined);

/**
 * `{ error: "<message for people>", reason?: "<stable cause>" }`. `reason`
 * is the machine-readable code; some errors (a missing app, a wrong method)
 * have none. One 403 puts its code in `error` and the text in `message`
 * (`{"error": "module-upload-disabled", "message": "..."}`), so `message`
 * wins when both are present.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const rec = body as Record<string, unknown>;
  const message = str(rec.message) ?? str(rec.error);
  const code = str(rec.reason);
  return message === undefined && code === undefined ? undefined : { code, message };
};

export const SproutboatProtocol = /*@__PURE__*/ restProtocol({
  // Resolved on the calling fiber per request, so a rotated key is picked
  // up without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.baseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  errorEnvelope,
  unknownError: (info) => new UnknownSproutboatError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new SproutboatParseError({ body, cause }),
});
