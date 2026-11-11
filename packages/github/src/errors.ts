/**
 * GitHub-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the GitHub-specific
 * unknown-error and parse-error wrappers.
 */
export {
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
  InvalidInput,
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
import type {
  BadRequest,
  Conflict,
  DefaultErrors as CoreDefaultErrors,
  Forbidden,
  Locked,
  NotFound,
  UnprocessableEntity,
} from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/**
 * HTTP 410 -- the resource existed and no longer serves: issues disabled on a
 * repository, a migration archive that has been deleted, a gist that was
 * removed. Core's shared status map has no entry for it (410 is rare outside
 * GitHub), so the package adds one.
 */
export class Gone
  extends /*@__PURE__*/ Schema.TaggedError<Gone>()("Gone", {
    message: Schema.String,
  }).pipe(Category.withNotFoundError) {}

/**
 * Unknown GitHub error -- returned when a failed response's HTTP status has no
 * mapped error class: a 4xx outside the status map, such as 405, 406, 413,
 * 415 or 451 (unmapped 5xx decode to `InternalServerError`). Carries the
 * status, the response headers and the raw body.
 *
 * A request GitHub refused this way fails the same way when sent again, so
 * the default retry policy does not retry it.
 */
export class UnknownGithubError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownGithubError>()("UnknownGithubError", {
    status: Schema.Number,
    code: /*@__PURE__*/ Schema.optional(Schema.String),
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    headers: /*@__PURE__*/ Schema.Record(Schema.String, Schema.optional(Schema.String)),
    body: Schema.Unknown,
  }).pipe(Category.withBadRequestError) {}

/** Schema parse error wrapper. */
export class GithubParseError
  extends /*@__PURE__*/ Schema.TaggedError<GithubParseError>()("GithubParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * GitHub App authentication failed: the App's private key could not sign a
 * JWT, or GitHub refused to mint an installation access token (see
 * `@distilled.cloud/github/App`). `cause` is the API error, when there was
 * one.
 */
export class GithubAppAuthError
  extends /*@__PURE__*/ Schema.TaggedError<GithubAppAuthError>()("GithubAppAuthError", {
    message: Schema.String,
    cause: /*@__PURE__*/ Schema.optional(Schema.Unknown),
  }).pipe(Category.withAuthError) {}

/**
 * Status errors any GitHub operation may surface, whatever its spec entry
 * declares. The protocol decodes every failed response through one status
 * map, so each operation's error type lists all of them:
 *
 * - 400 `BadRequest`, 409 `Conflict`, 422 `UnprocessableEntity` and 423
 *   `Locked` reach operations whose spec entry leaves them out
 *   (`git.getCommit` answers a malformed SHA with 422).
 * - 403 `Forbidden` and 404 `NotFound` come back from every endpoint: a token
 *   missing a scope is a 403, and a resource the token cannot see is a 404
 *   (GitHub hides private resources rather than refusing them).
 * - 410 `Gone` covers resources that existed and no longer serve.
 *
 * A rate-limited 403 is `TooManyRequests`, not `Forbidden` (see
 * `GithubProtocol`).
 */
export type StatusErrors =
  | BadRequest
  | Forbidden
  | NotFound
  | Conflict
  | Gone
  | UnprocessableEntity
  | Locked;

/** Errors any GitHub operation may surface besides the status errors. */
export type ClientErrors =
  | UnknownGithubError
  | GithubParseError
  | GithubAppAuthError
  | StatusErrors;

/**
 * Default GitHub operation errors: the shared HTTP status errors from core
 * plus the client-level fallback/decode errors.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;
