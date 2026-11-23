/**
 * Supabase-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Supabase-specific
 * error classes (ported verbatim from the distilled repo's supabase SDK).
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
import * as Category from "@distilled.cloud/core/category";
import type { DefaultErrors as CoreDefaultErrors } from "@distilled.cloud/core/errors";
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

// Unknown Supabase error - returned when an error code is not recognized
export class UnknownSupabaseError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownSupabaseError>()(
    "UnknownSupabaseError",
    UnknownErrorFields,
  ) {}

// Returned when v1CreateAProject is called against an org whose owner has
// already hit the free-tier active-project ceiling (currently 2). Supabase
// surfaces this as a generic 4xx with the literal message
//   "The following organization members have reached their maximum limits
//    for the number of active free projects within organizations where
//    they are an administrator or owner: <email> (<n> project limit)..."
// We tag it explicitly so tests can detect it, clean up stale projects,
// and retry -- and so callers can distinguish it from a real BadRequest.
export class FreeProjectLimitReached
  extends /*@__PURE__*/ Schema.TaggedError<FreeProjectLimitReached>()("FreeProjectLimitReached", {
    message: Schema.String,
  }).pipe(Category.withQuotaError) {}

// Schema parse error wrapper
export class SupabaseParseError
  extends /*@__PURE__*/ Schema.TaggedError<SupabaseParseError>()("SupabaseParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * Errors that any Supabase operation may surface in addition to the
 * status-matched API errors declared per endpoint.
 */
export type ClientErrors = FreeProjectLimitReached | SupabaseParseError | UnknownSupabaseError;

/**
 * Default Supabase operation errors: the shared HTTP status errors from core
 * plus the client-level fallback/decode errors the Supabase client can emit
 * at runtime.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;

/**
 * The errors declared on the Supabase service: any operation can return
 * them, and every generated operation lists them as its `serviceErrors`.
 * Each of core's status classes (the protocol builds the one for a failed
 * response's status when the operation's own classes do not match), and
 * {@link FreeProjectLimitReached}, which the protocol reads from the
 * message of any failed response.
 */
export const SupabaseServiceErrors = [...API_ERRORS, FreeProjectLimitReached] as const;
export type SupabaseServiceError = InstanceType<(typeof SupabaseServiceErrors)[number]>;
