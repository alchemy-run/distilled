/**
 * Coolify-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Coolify fallback
 * errors. Note the generated service module additionally defines its own
 * per-status matcher classes (BadRequest/NotFound/...) for the statuses each
 * operation declares -- those share `_tag`s with the core classes here, so
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

import * as Category from "@distilled.cloud/core/category";
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";
import { applyErrorMatchers } from "@distilled.cloud/core/trait";

/** Unknown Coolify error -- returned when nothing else matches the failure. */
export class UnknownCoolifyError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownCoolifyError>()(
    "UnknownCoolifyError",
    UnknownErrorFields,
  ) {}

/** Schema parse error wrapper. */
export class CoolifyParseError
  extends /*@__PURE__*/ Schema.TaggedError<CoolifyParseError>()("CoolifyParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * HTTP 403 from a team-wide endpoint (`GET /servers`, `GET /tags`,
 * `GET /teams/current`) called with a token whose access is limited to
 * selected projects, environments or resources. Observed against Coolify
 * v4.7.6: `{"message":"This API token is limited to selected projects,
 * environments, or resources, so it cannot use this endpoint."}`.
 */
export class TokenScopeForbidden
  extends /*@__PURE__*/ applyErrorMatchers(
    /*@__PURE__*/ Schema.TaggedError<TokenScopeForbidden>()("TokenScopeForbidden", {
      message: Schema.String,
    }).pipe(Category.withAuthError),
    [{ status: 403, message: { includes: "limited to selected projects" } }],
  ) {}

/**
 * HTTP 403 from Coolify's policy check: the token may not perform this
 * action, e.g. `POST /projects` with a token limited to selected projects.
 * Observed against Coolify v4.7.6: `{"message":"You are not authorized to
 * perform this action."}`.
 */
export class ActionNotAuthorized
  extends /*@__PURE__*/ applyErrorMatchers(
    /*@__PURE__*/ Schema.TaggedError<ActionNotAuthorized>()("ActionNotAuthorized", {
      message: Schema.String,
    }).pipe(Category.withAuthError),
    [{ status: 403, message: { includes: "not authorized to perform this action" } }],
  ) {}

/**
 * HTTP 403 when a non-admin token places an application, database or
 * service on the server that runs Coolify itself. Observed against Coolify
 * v4.7.6 on `POST /databases/postgresql`: `{"message":"Only an admin can
 * place resources on the server that runs Coolify."}`.
 */
export class CoolifyHostRequiresAdmin
  extends /*@__PURE__*/ applyErrorMatchers(
    /*@__PURE__*/ Schema.TaggedError<CoolifyHostRequiresAdmin>()("CoolifyHostRequiresAdmin", {
      message: Schema.String,
    }).pipe(Category.withAuthError),
    [
      {
        status: 403,
        message: { includes: "Only an admin can place resources on the server that runs Coolify" },
      },
    ],
  ) {}

/**
 * The errors declared on the Coolify service: any operation can return them,
 * and every generated operation lists them as its `serviceErrors`. The 403s
 * above, matched by message, then each of core's status classes (401, 403,
 * 404, 429, the 5xx ...).
 */
export const CoolifyServiceErrors = [
  TokenScopeForbidden,
  ActionNotAuthorized,
  CoolifyHostRequiresAdmin,
  ...API_ERRORS,
] as const;
export type CoolifyServiceError = InstanceType<(typeof CoolifyServiceErrors)[number]>;
