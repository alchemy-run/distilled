/**
 * Microsoft Graph error types -- hand-written.
 *
 * Re-exports the common HTTP errors from core and adds the Graph error codes
 * callers handle. Every Graph failure carries the OData error envelope:
 *
 * ```json
 * { "error": { "code": "Request_ResourceNotFound", "message": "...",
 *              "details": [{ "code": "NoBackingApplicationObject", ... }] } }
 * ```
 *
 * The spec types failures only as `4XX` / `5XX` ranges against that one
 * envelope, so errors are client-level: the protocol dispatches on a mapped
 * `details[].code` first (the specific cause behind a generic
 * `Request_BadRequest`), then on `error.code` through
 * {@link GRAPH_ERROR_CODE_MAP}, then on the HTTP status.
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

/** Fields every Graph-code error carries (from the OData error envelope). */
const GraphErrorFields = {
  message: /*@__PURE__*/ Schema.optional(Schema.String),
  code: /*@__PURE__*/ Schema.optional(Schema.String),
  target: /*@__PURE__*/ Schema.optional(Schema.String),
};

// ---------------------------------------------------------------------------
// Not found
// ---------------------------------------------------------------------------

/**
 * The addressed object does not exist (or a referenced object in the request
 * does not). Graph codes: `Request_ResourceNotFound` (directory objects:
 * applications, service principals, groups, users), `ResourceNotFound`,
 * `itemNotFound` (drives, sites, mail).
 *
 * Directory writes replicate asynchronously: a read right after a create can
 * briefly return this for an object that does exist.
 */
export class ResourceNotFound
  extends /*@__PURE__*/ Schema.TaggedError<ResourceNotFound>()(
    "ResourceNotFound",
    GraphErrorFields,
  ).pipe(Category.withNotFoundError) {}

/**
 * `removePassword` / `removeKey` named a `keyId` the application or service
 * principal does not have. Right after `addPassword` this is replication
 * lag. Graph returns it as `Request_BadRequest` with the message "No
 * password credential found with keyId"; matched in
 * {@link GRAPH_ERROR_MESSAGE_MATCHERS}.
 */
export class PasswordCredentialNotFound
  extends /*@__PURE__*/ Schema.TaggedError<PasswordCredentialNotFound>()(
    "PasswordCredentialNotFound",
    GraphErrorFields,
  ).pipe(Category.withNotFoundError) {}

/**
 * A reference being removed does not exist: the object is not a member (or
 * owner) of the group. Graph returns it as `Request_BadRequest` with the
 * message "One or more removed object references do not exist"; matched in
 * {@link GRAPH_ERROR_MESSAGE_MATCHERS}.
 */
export class ObjectReferenceNotFound
  extends /*@__PURE__*/ Schema.TaggedError<ObjectReferenceNotFound>()(
    "ObjectReferenceNotFound",
    GraphErrorFields,
  ).pipe(Category.withNotFoundError) {}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

/**
 * The caller lacks the permission (application permission, delegated scope or
 * directory role) the operation needs. Graph codes:
 * `Authorization_RequestDenied`, `accessDenied`.
 */
export class AuthorizationRequestDenied
  extends /*@__PURE__*/ Schema.TaggedError<AuthorizationRequestDenied>()(
    "AuthorizationRequestDenied",
    GraphErrorFields,
  ).pipe(Category.withAuthError) {}

/**
 * The bearer token is missing, expired, malformed, or for another audience.
 * Graph code: `InvalidAuthenticationToken`.
 */
export class InvalidAuthenticationToken
  extends /*@__PURE__*/ Schema.TaggedError<InvalidAuthenticationToken>()(
    "InvalidAuthenticationToken",
    GraphErrorFields,
  ).pipe(Category.withAuthError) {}

/**
 * Entra ID refused to issue a Microsoft Graph access token for the configured
 * client credentials (wrong secret, unknown client, disabled application).
 * `code` is the OAuth error (`invalid_client`), `message` its description
 * (which starts with the `AADSTS` code).
 */
export class TokenAcquisitionFailed
  extends /*@__PURE__*/ Schema.TaggedError<TokenAcquisitionFailed>()("TokenAcquisitionFailed", {
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    code: /*@__PURE__*/ Schema.optional(Schema.String),
    status: /*@__PURE__*/ Schema.optional(Schema.Number),
  }).pipe(Category.withAuthError) {}

// ---------------------------------------------------------------------------
// Bad request
// ---------------------------------------------------------------------------

/**
 * The request body or a parameter is invalid. Graph codes:
 * `Request_BadRequest`, `BadRequest`, `invalidRequest`.
 */
export class InvalidRequest
  extends /*@__PURE__*/ Schema.TaggedError<InvalidRequest>()(
    "InvalidRequest",
    GraphErrorFields,
  ).pipe(Category.withBadRequestError) {}

/**
 * A query option (`$filter`, `$orderby`, `$search`, `$count`) or a key is
 * not supported for this resource. Graph code: `Request_UnsupportedQuery`.
 * Graph also returns it for a malformed object id
 * (`roleManagement/directory/roleAssignments/{id}`).
 */
export class UnsupportedQuery
  extends /*@__PURE__*/ Schema.TaggedError<UnsupportedQuery>()(
    "UnsupportedQuery",
    GraphErrorFields,
  ).pipe(Category.withBadRequestError) {}

/**
 * Creating a service principal for an `appId` with no application object
 * behind it. Right after `createApplication` this is replication lag, not a
 * wrong id: the application becomes visible within seconds. Graph detail
 * code `NoBackingApplicationObject` under `Request_BadRequest`.
 */
export class NoBackingApplicationObject
  extends /*@__PURE__*/ Schema.TaggedError<NoBackingApplicationObject>()(
    "NoBackingApplicationObject",
    GraphErrorFields,
  ).pipe(Category.withBadRequestError) {}

// ---------------------------------------------------------------------------
// Conflict
// ---------------------------------------------------------------------------

/**
 * Another object already uses a value that must be unique in the tenant
 * (an `identifierUris` entry, a federated identity credential `name`, a
 * group `mailNickname`). Graph code: `Request_MultipleObjectsWithSameKeyValue`.
 */
export class MultipleObjectsWithSameKeyValue
  extends /*@__PURE__*/ Schema.TaggedError<MultipleObjectsWithSameKeyValue>()(
    "MultipleObjectsWithSameKeyValue",
    GraphErrorFields,
  ).pipe(Category.withConflictError, Category.withAlreadyExistsError) {}

/**
 * A reference being added already exists: the object is already a member
 * (or owner) of the group, or the role is already assigned. Graph returns it
 * as `Request_BadRequest` with the message "One or more added object
 * references already exist"; matched in {@link GRAPH_ERROR_MESSAGE_MATCHERS}.
 */
export class ObjectReferenceAlreadyExists
  extends /*@__PURE__*/ Schema.TaggedError<ObjectReferenceAlreadyExists>()(
    "ObjectReferenceAlreadyExists",
    GraphErrorFields,
  ).pipe(Category.withConflictError, Category.withAlreadyExistsError) {}

/**
 * A collection property got two entries with the same key: a second
 * federated identity credential with an existing `name` on the same
 * application. Graph returns it as `Request_BadRequest` with the message
 * "Request contains a property with duplicate values"; matched in
 * {@link GRAPH_ERROR_MESSAGE_MATCHERS}.
 */
export class DuplicatePropertyValue
  extends /*@__PURE__*/ Schema.TaggedError<DuplicatePropertyValue>()(
    "DuplicatePropertyValue",
    GraphErrorFields,
  ).pipe(Category.withConflictError, Category.withAlreadyExistsError) {}

/**
 * Another federated identity credential on the application already has
 * this issuer and subject. Right after that credential is deleted (a
 * rename) this is replication lag. Graph returns it as HTTP 400 with the
 * message "The combination of issuer and subject must be unique for the
 * application"; matched in {@link GRAPH_ERROR_MESSAGE_MATCHERS}.
 */
export class FederatedIdentityCredentialSubjectInUse
  extends /*@__PURE__*/ Schema.TaggedError<FederatedIdentityCredentialSubjectInUse>()(
    "FederatedIdentityCredentialSubjectInUse",
    GraphErrorFields,
  ).pipe(Category.withConflictError, Category.withAlreadyExistsError) {}

/**
 * Concurrent writes to the same directory object collided ("Error due to
 * concurrent requests being made to the tenant. Please wait briefly and
 * retry."). Retryable: the default retry policy retries it. Graph code:
 * `Directory_ConcurrencyViolation` (HTTP 409).
 */
export class DirectoryConcurrencyViolation
  extends /*@__PURE__*/ Schema.TaggedError<DirectoryConcurrencyViolation>()(
    "DirectoryConcurrencyViolation",
    GraphErrorFields,
  ).pipe(Category.withConflictError, Category.withRetryableError) {}

/**
 * A directory replica could not read the tenant while it served the
 * request ("Unable to read the company information from the directory.",
 * HTTP 404). Seen on `removePassword` seconds after the application's
 * service principal was deleted; the same request succeeds a second later.
 * Retryable: the default retry policy retries it. Graph code:
 * `Directory_ObjectNotFound`.
 */
export class DirectoryObjectNotFound
  extends /*@__PURE__*/ Schema.TaggedError<DirectoryObjectNotFound>()(
    "DirectoryObjectNotFound",
    GraphErrorFields,
  ).pipe(Category.withServerError, Category.withRetryableError) {}

// ---------------------------------------------------------------------------
// Code tables
// ---------------------------------------------------------------------------

/** Graph `error.code` / `error.details[].code` -> typed error class. */
export const GRAPH_ERROR_CODE_MAP: Record<string, new (props: any) => unknown> = {
  // Not found
  Request_ResourceNotFound: ResourceNotFound,
  ResourceNotFound: ResourceNotFound,
  itemNotFound: ResourceNotFound,
  // Auth
  Authorization_RequestDenied: AuthorizationRequestDenied,
  accessDenied: AuthorizationRequestDenied,
  InvalidAuthenticationToken: InvalidAuthenticationToken,
  // Bad request
  Request_BadRequest: InvalidRequest,
  BadRequest: InvalidRequest,
  invalidRequest: InvalidRequest,
  Request_UnsupportedQuery: UnsupportedQuery,
  NoBackingApplicationObject: NoBackingApplicationObject,
  // Conflict
  Request_MultipleObjectsWithSameKeyValue: MultipleObjectsWithSameKeyValue,
  Directory_ConcurrencyViolation: DirectoryConcurrencyViolation,
  Directory_ObjectNotFound: DirectoryObjectNotFound,
};

/**
 * Errors whose Graph `code` is too generic to type on its own. Checked
 * before {@link GRAPH_ERROR_CODE_MAP}; the first matcher whose code (if set)
 * and message substring match wins.
 */
export const GRAPH_ERROR_MESSAGE_MATCHERS: ReadonlyArray<{
  readonly code?: string;
  readonly includes: string;
  readonly error: new (props: any) => unknown;
}> = [
  {
    code: "Request_BadRequest",
    includes: "One or more added object references already exist",
    error: ObjectReferenceAlreadyExists,
  },
  {
    code: "Request_BadRequest",
    includes: "Request contains a property with duplicate values",
    error: DuplicatePropertyValue,
  },
  {
    code: "Request_BadRequest",
    includes: "One or more removed object references do not exist",
    error: ObjectReferenceNotFound,
  },
  {
    code: "Request_BadRequest",
    includes: "No password credential found with keyId",
    error: PasswordCredentialNotFound,
  },
  {
    // The code is not one of Graph's usual ones, so match any code.
    includes: "The combination of issuer and subject must be unique",
    error: FederatedIdentityCredentialSubjectInUse,
  },
];

export const matchGraphErrorMessage = (error: {
  readonly code?: string;
  readonly message?: string;
}) =>
  GRAPH_ERROR_MESSAGE_MATCHERS.find(
    (matcher) =>
      (matcher.code === undefined || matcher.code === error.code) &&
      error.message?.includes(matcher.includes) === true,
  )?.error;

// ---------------------------------------------------------------------------
// Catch-all error classes
// ---------------------------------------------------------------------------

/** Unknown Microsoft Graph error -- an error code nothing above maps. */
export class UnknownMicrosoftGraphError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownMicrosoftGraphError>()(
    "UnknownMicrosoftGraphError",
    {
      ...UnknownErrorFields,
      target: /*@__PURE__*/ Schema.optional(Schema.String),
    },
  ) {}

/** Schema parse error wrapper for Microsoft Graph responses. */
export class MicrosoftGraphParseError
  extends /*@__PURE__*/ Schema.TaggedError<MicrosoftGraphParseError>()("MicrosoftGraphParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/** Union of every Graph-code-mapped typed error class. */
export type MicrosoftGraphApiError =
  | ResourceNotFound
  | PasswordCredentialNotFound
  | ObjectReferenceNotFound
  | AuthorizationRequestDenied
  | InvalidAuthenticationToken
  | TokenAcquisitionFailed
  | InvalidRequest
  | UnsupportedQuery
  | NoBackingApplicationObject
  | MultipleObjectsWithSameKeyValue
  | ObjectReferenceAlreadyExists
  | DuplicatePropertyValue
  | DirectoryConcurrencyViolation
  | DirectoryObjectNotFound
  | FederatedIdentityCredentialSubjectInUse;
