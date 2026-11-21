/**
 * UniFi Network-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the UniFi Network
 * fallback errors. The published OpenAPI document declares only success
 * responses, so failures map by status in `protocol.ts`: the shared core
 * classes first, then {@link UnknownUniFiNetworkError}.
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
import { UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/** Unknown UniFi Network error -- returned when nothing else matches the failure. */
export class UnknownUniFiNetworkError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownUniFiNetworkError>()(
    "UnknownUniFiNetworkError",
    UnknownErrorFields,
  ) {}

/** Schema parse error wrapper. */
export class UniFiNetworkParseError
  extends /*@__PURE__*/ Schema.TaggedError<UniFiNetworkParseError>()("UniFiNetworkParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}
