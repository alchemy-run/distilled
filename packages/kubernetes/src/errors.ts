/**
 * Kubernetes-specific error types.
 *
 * Re-exports common HTTP errors from sdk-core and adds Kubernetes-specific
 * error matching and API error types.
 *
 * Kubernetes API errors include a `reason` field (e.g. "NotFound",
 * "AlreadyExists", "Forbidden") that maps to HTTP status codes. The
 * standard HTTP error classes from core handle the common status codes;
 * `UnknownKubernetesError` catches anything else.
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

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

/**
 * Returned when the Kubernetes API returns an error that does not
 * map to a known HTTP status class. The `reason` field mirrors the
 * `reason` from the Kubernetes `v1.Status` object.
 */
export class UnknownKubernetesError extends Schema.TaggedErrorClass<UnknownKubernetesError>()(
  "UnknownKubernetesError",
  {
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/**
 * Returned when a Kubernetes API response cannot be decoded
 * against the expected schema.
 */
export class KubernetesParseError extends Schema.TaggedErrorClass<KubernetesParseError>()(
  "KubernetesParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}
