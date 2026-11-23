/**
 * WhatsApp error types.
 *
 * Failures arrive as the Graph API error object
 *
 *     { "error": { "message": "...", "type": "OAuthException", "code": 190,
 *                  "error_subcode": 463, "fbtrace_id": "..." } }
 *
 * and map by status onto the core classes re-exported here: `BadRequest`,
 * `Unauthorized`, `Forbidden`, `NotFound`, `TooManyRequests` and the 5xx
 * family, the last two retryable. Operations that declare a status get a
 * generated class with the same `_tag`, so `catchTag` works against either.
 */
export {
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
  Locked,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
  HTTP_STATUS_MAP,
  DEFAULT_ERRORS,
  API_ERRORS,
} from "@distilled.cloud/core/errors";
export type { DefaultErrors } from "@distilled.cloud/core/errors";

import * as Category from "@distilled.cloud/core/category";
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/**
 * A non-2xx, non-5xx status that neither the operation nor the core map
 * covers. `code` is the Graph API's numeric `error.code` when the body
 * carries one.
 */
export class UnknownWhatsAppError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownWhatsAppError>()(
    "UnknownWhatsAppError",
    UnknownErrorFields,
  ) {}

/** A 2xx response that does not match the operation's output schema. */
export class WhatsAppParseError
  extends /*@__PURE__*/ Schema.TaggedError<WhatsAppParseError>()("WhatsAppParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * The errors declared on the WhatsApp service: any operation can return them,
 * and every generated operation lists them as its `serviceErrors`. Today that
 * is each of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const WhatsAppServiceErrors = API_ERRORS;
export type WhatsAppServiceError = InstanceType<(typeof WhatsAppServiceErrors)[number]>;
