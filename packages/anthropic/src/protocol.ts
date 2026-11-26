import { ServiceUnavailable } from "@distilled.cloud/core/errors";
import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { responseErrorFields } from "@distilled.cloud/core/protocol-http";
import {
  restProtocol,
  unknownErrorProps,
  type RestErrorInfo,
} from "@distilled.cloud/core/protocol-rest";
/**
 * AnthropicProtocol -- the shared REST protocol instantiated for the Claude
 * Platform (Anthropic) API.
 *
 * Requests carry `x-api-key: <key>` and the required `anthropic-version`
 * header; an operation's `anthropic-version`, `anthropic-beta` or
 * `anthropic-workspace-id` member is sent as that header for one call.
 * Responses are plain JSON with no success envelope.
 *
 * Failures are `{ type: "error", error: { type, message }, request_id }`.
 * The status picks the class from core's shared map; 529
 * (`overloaded_error`) maps to the shared, retryable `ServiceUnavailable`,
 * and anything unmapped reports `error.type` as the code of an
 * `UnknownAnthropicError`.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import {
  AnthropicParseError,
  UnknownAnthropicError,
  type AnthropicServiceError,
} from "./errors.ts";

/**
 * What every generated Anthropic operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, AnthropicOpError, AnthropicOpContext>` explicitly
 * so the compiler never infers these back out of the schema generics.
 */
export type AnthropicOpError = AnthropicServiceError | ErrorOf<typeof AnthropicProtocol>;

/** Context (requirements) shared by every generated Anthropic operation. */
export type AnthropicOpContext = Credentials | HttpClient.HttpClient;

/** `{ error: { type, message } }` -> `{ code: type, message }`. */
const errorEnvelope = (body: unknown) => {
  if (typeof body !== "object" || body === null) return undefined;
  const error = (body as Record<string, unknown>).error;
  if (typeof error !== "object" || error === null) return undefined;
  const { type, message } = error as Record<string, unknown>;
  return {
    code: typeof type === "string" ? type : undefined,
    message: typeof message === "string" ? message : undefined,
  };
};

/**
 * 529 (`overloaded_error`) is core's retryable `ServiceUnavailable`. The
 * service's list gives a status the class core has for it, and core has none
 * for 529, so the protocol builds this one. It carries no `retryAfter`: core
 * reads that hint only for the statuses it has a class for.
 */
const overloaded = (info: RestErrorInfo): ServiceUnavailable | undefined =>
  info.status === 529
    ? new ServiceUnavailable({
        message: info.message,
        ...responseErrorFields(undefined, { body: info.body, headers: info.headers }),
      })
    : undefined;

export const AnthropicProtocol = /*@__PURE__*/ restProtocol({
  // Resolved on the calling fiber per request, so a rotated key is picked up.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    "x-api-key": Redacted.value(creds.apiKey),
    "anthropic-version": creds.version,
  }),
  classifyError: overloaded,
  errorEnvelope,
  unknownError: (info) => new UnknownAnthropicError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new AnthropicParseError({ body, cause }),
});
