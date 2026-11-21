/**
 * OpenSearch error types.
 *
 * Re-exports the common HTTP errors from core and adds the OpenSearch
 * fallback errors. OpenSearch failures carry `{ error: { type, reason },
 * status }` bodies; the protocol reads `type` as the error's `code` and
 * `reason` as its `message`. The generated service module also defines its
 * own per-status classes (BadRequest/NotFound/...) for the statuses each
 * operation declares; those share `_tag`s with the core classes here, so
 * `catchTag` works against either.
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
export {
  CryptoError,
  InvalidSigningHeaders,
  InvalidSigningUrl,
  type SigningError,
} from "@distilled.cloud/aws4signer";
export { UnsignableBody } from "@distilled.cloud/aws4signer/AwsClient";

import * as Category from "@distilled.cloud/core/category";
import { UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/** Unknown OpenSearch error -- returned when nothing else matches the failure. */
export class UnknownOpenSearchError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownOpenSearchError>()(
    "UnknownOpenSearchError",
    UnknownErrorFields,
  ) {}

/** Schema parse error wrapper. */
export class OpenSearchParseError
  extends /*@__PURE__*/ Schema.TaggedError<OpenSearchParseError>()("OpenSearchParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}
