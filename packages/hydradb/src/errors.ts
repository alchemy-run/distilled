/**
 * HydraDB error types.
 *
 * Re-exports the common HTTP errors from core and adds the unknown-error and
 * parse-error classes.
 *
 * Every HydraDB failure carries the same envelope -- `{ "success": false,
 * "data": null, "error": { "code": string, "message": string }, "detail":
 * { "error_code": string, ... }, "meta": { "request_id": string } }` --
 * where `error.code` is machine-readable (`INVALID_INPUT`,
 * `DATABASE_NOT_FOUND`, ...). The SDK dispatches on the status (the classes
 * here) with `error.message` as the message, and keeps the body (with its
 * `meta.request_id`, which HydraDB support asks for) on
 * {@link UnknownHydraDBError} for the statuses nothing else maps. The codes a
 * caller acts on are typed per operation by `patches/`
 * (`DatabaseNotFound`, `DatabaseAlreadyExists`, `TenantInfraNotReady`); the
 * `413` and `415` that `ingestContext` documents are `ContentTooLarge` and
 * `UnsupportedMediaType` in the generated module.
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
 * Unknown HydraDB error -- returned when a failed response's HTTP status has
 * no mapped error class. `status` is that HTTP status, `code` and `message`
 * are the envelope's `error.code` and `error.message`, and `body` is the
 * whole response body.
 */
export class UnknownHydraDBError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownHydraDBError>()(
    "UnknownHydraDBError",
    UnknownErrorFields,
  ) {}

/** A 2xx response that does not match the operation's output schema. */
export class HydraDBParseError
  extends /*@__PURE__*/ Schema.TaggedError<HydraDBParseError>()("HydraDBParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}
