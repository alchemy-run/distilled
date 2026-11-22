export {
  API_ERRORS,
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  DEFAULT_ERRORS,
  Forbidden,
  GatewayTimeout,
  HTTP_STATUS_MAP,
  InternalServerError,
  Locked,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
} from "@distilled.cloud/core/errors";
export type { DefaultErrors } from "@distilled.cloud/core/errors";

import * as Category from "@distilled.cloud/core/category";
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

export class UnknownTailscaleError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownTailscaleError>()(
    "UnknownTailscaleError",
    UnknownErrorFields,
  ) {}

export class TailscaleParseError extends Schema.TaggedError<TailscaleParseError>()(
  "TailscaleParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * The errors declared on the Tailscale service: any operation can return
 * them, and every generated operation lists them as its `serviceErrors`.
 * Each of core's status classes: the protocol builds the one for a failed
 * response's status when the operation's own classes do not match.
 */
export const TailscaleServiceErrors = API_ERRORS;
export type TailscaleServiceError = InstanceType<(typeof TailscaleServiceErrors)[number]>;
