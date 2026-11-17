/**
 * ClickHouse Cloud error types.
 *
 * Re-exports the common HTTP errors from core and adds the unknown-error and
 * parse-error classes.
 *
 * Every ClickHouse Cloud failure carries the same envelope -- `{ "status":
 * number, "error": string, "requestId": string }` -- where `error` is a
 * human-readable description and there is no machine-readable code. The spec
 * lists `400` and `500` on every operation and a few more statuses on some,
 * all against that one envelope, so the SDK dispatches on the status (the
 * classes here) and keeps the body on {@link UnknownClickHouseCloudError}
 * for the statuses nothing else maps (the documented `410` and `424`
 * included). Where an answer means something a caller acts on, a patch under
 * `patches/` types it per operation by status and `error` text:
 * `DeletionProtectionEnabled`, `ServiceNotTerminable` and `InstanceLimitReached`
 * (409), `FeatureUnavailable` (a 403 for a feature the plan or organization
 * lacks, such as ClickStack not set up or a BYOC-only operation),
 * `ServiceNotIdle` and `DeletionProtectionNotEnabled` (400). Everything else
 * stays the status's class, with the envelope's `error` as its message.
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

/**
 * Unknown ClickHouse Cloud error -- returned when a failed response's HTTP
 * status has no mapped error class. `status` is that HTTP status, `message`
 * is the envelope's `error` text, and `body` is the whole response body
 * (with its `requestId`, which ClickHouse Cloud support asks for).
 */
export class UnknownClickHouseCloudError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownClickHouseCloudError>()(
    "UnknownClickHouseCloudError",
    UnknownErrorFields,
  ) {}

/** A 2xx response that does not match the operation's output schema. */
export class ClickHouseCloudParseError
  extends /*@__PURE__*/ Schema.TaggedError<ClickHouseCloudParseError>()(
    "ClickHouseCloudParseError",
    {
      body: Schema.Unknown,
      cause: Schema.Unknown,
    },
  ).pipe(Category.withParseError) {}
