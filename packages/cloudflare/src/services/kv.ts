/**
 * Cloudflare KV API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service kv
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import { type DefaultErrors } from "../errors";

// =============================================================================
// Errors
// =============================================================================

export class InvalidExpirationTtl extends Schema.TaggedErrorClass<InvalidExpirationTtl>()(
  "InvalidExpirationTtl",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidExpirationTtl, [{ code: 10034 }]);

export class InvalidObjectIdentifier extends Schema.TaggedErrorClass<InvalidObjectIdentifier>()(
  "InvalidObjectIdentifier",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidObjectIdentifier, [{ code: 7003 }]);

export class InvalidRequestBody extends Schema.TaggedErrorClass<InvalidRequestBody>()(
  "InvalidRequestBody",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidRequestBody, [{ code: 10012 }]);

export class KeyNotFound extends Schema.TaggedErrorClass<KeyNotFound>()(
  "KeyNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(KeyNotFound, [{ code: 10009 }]);

export class MethodNotAllowed extends Schema.TaggedErrorClass<MethodNotAllowed>()(
  "MethodNotAllowed",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(MethodNotAllowed, [
  { code: 10405, message: { includes: "not allowed" } },
  { code: 10000, message: { includes: "not allowed" } },
]);

export class MinimumKeysRequired extends Schema.TaggedErrorClass<MinimumKeysRequired>()(
  "MinimumKeysRequired",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(MinimumKeysRequired, [{ code: 10029 }]);

export class NamespaceNotFound extends Schema.TaggedErrorClass<NamespaceNotFound>()(
  "NamespaceNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(NamespaceNotFound, [{ code: 10013 }]);

export class NamespaceTitleAlreadyExists extends Schema.TaggedErrorClass<NamespaceTitleAlreadyExists>()(
  "NamespaceTitleAlreadyExists",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(NamespaceTitleAlreadyExists, [{ code: 10014 }]);

export class TitleRequired extends Schema.TaggedErrorClass<TitleRequired>()(
  "TitleRequired",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(TitleRequired, [{ code: 10019 }]);

// =============================================================================
// Namespace
// =============================================================================

export interface GetNamespaceRequest {
  namespaceId: string;
  /** Identifier. */
  accountId: string;
}

export const GetNamespaceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  namespaceId: Schema.String.pipe(T.HttpPath("namespaceId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}",
  }),
) as unknown as Schema.Schema<GetNamespaceRequest>;

export interface GetNamespaceResponse {
  /** Namespace identifier tag. */
  id: string;
  /** A human-readable string name for a Namespace. */
  title: string;
  /** True if keys written on the URL will be URL-decoded before storing. For example, if set to "true", a key written on the URL as "%3F" will be stored as "?". */
  supportsUrlEncoding?: boolean | null;
}

export const GetNamespaceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  title: Schema.String,
  supportsUrlEncoding: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    title: "title",
    supportsUrlEncoding: "supports_url_encoding",
  }),
) as unknown as Schema.Schema<GetNamespaceResponse>;

export type GetNamespaceError =
  | DefaultErrors
  | NamespaceNotFound
  | InvalidObjectIdentifier;

export const getNamespace: API.OperationMethod<
  GetNamespaceRequest,
  GetNamespaceResponse,
  GetNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetNamespaceRequest,
  output: GetNamespaceResponse,
  errors: [NamespaceNotFound, InvalidObjectIdentifier],
}));

export interface ListNamespacesRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Direction to order namespaces. */
  direction?: "asc" | "desc";
  /** Query param: Field to order results by. */
  order?: "id" | "title";
}

export const ListNamespacesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  order: Schema.optional(Schema.Literals(["id", "title"])).pipe(
    T.HttpQuery("order"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/storage/kv/namespaces",
  }),
) as unknown as Schema.Schema<ListNamespacesRequest>;

export type ListNamespacesResponse = {
  id: string;
  title: string;
  supportsUrlEncoding?: boolean | null;
}[];

export const ListNamespacesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.String,
    title: Schema.String,
    supportsUrlEncoding: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      title: "title",
      supportsUrlEncoding: "supports_url_encoding",
    }),
  ),
) as unknown as Schema.Schema<ListNamespacesResponse>;

export type ListNamespacesError = DefaultErrors;

export const listNamespaces: API.OperationMethod<
  ListNamespacesRequest,
  ListNamespacesResponse,
  ListNamespacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListNamespacesRequest,
  output: ListNamespacesResponse,
  errors: [],
}));

export interface CreateNamespaceRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: A human-readable string name for a Namespace. */
  title: string;
}

export const CreateNamespaceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    title: Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/storage/kv/namespaces",
  }),
) as unknown as Schema.Schema<CreateNamespaceRequest>;

export interface CreateNamespaceResponse {
  /** Namespace identifier tag. */
  id: string;
  /** A human-readable string name for a Namespace. */
  title: string;
  /** True if keys written on the URL will be URL-decoded before storing. For example, if set to "true", a key written on the URL as "%3F" will be stored as "?". */
  supportsUrlEncoding?: boolean | null;
}

export const CreateNamespaceResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    title: Schema.String,
    supportsUrlEncoding: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      title: "title",
      supportsUrlEncoding: "supports_url_encoding",
    }),
  ) as unknown as Schema.Schema<CreateNamespaceResponse>;

export type CreateNamespaceError =
  | DefaultErrors
  | TitleRequired
  | InvalidObjectIdentifier
  | NamespaceTitleAlreadyExists;

export const createNamespace: API.OperationMethod<
  CreateNamespaceRequest,
  CreateNamespaceResponse,
  CreateNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateNamespaceRequest,
  output: CreateNamespaceResponse,
  errors: [TitleRequired, InvalidObjectIdentifier, NamespaceTitleAlreadyExists],
}));

export interface UpdateNamespaceRequest {
  namespaceId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: A human-readable string name for a Namespace. */
  title: string;
}

export const UpdateNamespaceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    namespaceId: Schema.String.pipe(T.HttpPath("namespaceId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    title: Schema.String,
  },
).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}",
  }),
) as unknown as Schema.Schema<UpdateNamespaceRequest>;

export interface UpdateNamespaceResponse {
  /** Namespace identifier tag. */
  id: string;
  /** A human-readable string name for a Namespace. */
  title: string;
  /** True if keys written on the URL will be URL-decoded before storing. For example, if set to "true", a key written on the URL as "%3F" will be stored as "?". */
  supportsUrlEncoding?: boolean | null;
}

export const UpdateNamespaceResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    title: Schema.String,
    supportsUrlEncoding: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      title: "title",
      supportsUrlEncoding: "supports_url_encoding",
    }),
  ) as unknown as Schema.Schema<UpdateNamespaceResponse>;

export type UpdateNamespaceError =
  | DefaultErrors
  | NamespaceNotFound
  | TitleRequired
  | InvalidObjectIdentifier
  | NamespaceTitleAlreadyExists;

export const updateNamespace: API.OperationMethod<
  UpdateNamespaceRequest,
  UpdateNamespaceResponse,
  UpdateNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateNamespaceRequest,
  output: UpdateNamespaceResponse,
  errors: [
    NamespaceNotFound,
    TitleRequired,
    InvalidObjectIdentifier,
    NamespaceTitleAlreadyExists,
  ],
}));

export interface DeleteNamespaceRequest {
  namespaceId: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteNamespaceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    namespaceId: Schema.String.pipe(T.HttpPath("namespaceId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}",
  }),
) as unknown as Schema.Schema<DeleteNamespaceRequest>;

export interface DeleteNamespaceResponse {}

export const DeleteNamespaceResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as unknown as Schema.Schema<DeleteNamespaceResponse>;

export type DeleteNamespaceError =
  | DefaultErrors
  | MethodNotAllowed
  | NamespaceNotFound
  | InvalidObjectIdentifier;

export const deleteNamespace: API.OperationMethod<
  DeleteNamespaceRequest,
  DeleteNamespaceResponse,
  DeleteNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteNamespaceRequest,
  output: DeleteNamespaceResponse,
  errors: [MethodNotAllowed, NamespaceNotFound, InvalidObjectIdentifier],
}));

export interface BulkGetNamespacesRequest {
  namespaceId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Array of keys to retrieve (maximum of 100). */
  keys: string[];
  /** Body param: Whether to parse JSON values in the response. */
  type?: "text" | "json";
  /** Body param: Whether to include metadata in the response. */
  withMetadata?: boolean;
}

export const BulkGetNamespacesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    namespaceId: Schema.String.pipe(T.HttpPath("namespaceId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    keys: Schema.Array(Schema.String),
    type: Schema.optional(Schema.Literals(["text", "json"])),
    withMetadata: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}/bulk/get",
    }),
  ) as unknown as Schema.Schema<BulkGetNamespacesRequest>;

export type BulkGetNamespacesResponse = {
  values?: Record<string, unknown> | null;
};

export const BulkGetNamespacesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    values: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
  }) as unknown as Schema.Schema<BulkGetNamespacesResponse>;

export type BulkGetNamespacesError =
  | DefaultErrors
  | InvalidRequestBody
  | MinimumKeysRequired
  | NamespaceNotFound
  | InvalidObjectIdentifier;

export const bulkGetNamespaces: API.OperationMethod<
  BulkGetNamespacesRequest,
  BulkGetNamespacesResponse,
  BulkGetNamespacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkGetNamespacesRequest,
  output: BulkGetNamespacesResponse,
  errors: [
    InvalidRequestBody,
    MinimumKeysRequired,
    NamespaceNotFound,
    InvalidObjectIdentifier,
  ],
}));

export interface BulkDeleteNamespacesRequest {
  namespaceId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: */
  body: string[];
}

export const BulkDeleteNamespacesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    namespaceId: Schema.String.pipe(T.HttpPath("namespaceId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    body: Schema.Array(Schema.String).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}/bulk/delete",
    }),
  ) as unknown as Schema.Schema<BulkDeleteNamespacesRequest>;

export interface BulkDeleteNamespacesResponse {
  /** Number of keys successfully updated. */
  successfulKeyCount?: number | null;
  /** Name of the keys that failed to be fully updated. They should be retried. */
  unsuccessfulKeys?: string[] | null;
}

export const BulkDeleteNamespacesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    successfulKeyCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    unsuccessfulKeys: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      successfulKeyCount: "successful_key_count",
      unsuccessfulKeys: "unsuccessful_keys",
    }),
  ) as unknown as Schema.Schema<BulkDeleteNamespacesResponse>;

export type BulkDeleteNamespacesError =
  | DefaultErrors
  | NamespaceNotFound
  | InvalidRequestBody
  | InvalidObjectIdentifier;

export const bulkDeleteNamespaces: API.OperationMethod<
  BulkDeleteNamespacesRequest,
  BulkDeleteNamespacesResponse,
  BulkDeleteNamespacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkDeleteNamespacesRequest,
  output: BulkDeleteNamespacesResponse,
  errors: [NamespaceNotFound, InvalidRequestBody, InvalidObjectIdentifier],
}));

// =============================================================================
// NamespaceKey
// =============================================================================

export interface ListNamespaceKeysRequest {
  namespaceId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Limits the number of keys returned in the response. The cursor attribute may be used to iterate over the next batch of keys if there are more than the limit. */
  limit?: number;
  /** Query param: Filters returned keys by a name prefix. Exact matches and any key names that begin with the prefix will be returned. */
  prefix?: string;
}

export const ListNamespaceKeysRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    namespaceId: Schema.String.pipe(T.HttpPath("namespaceId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
    prefix: Schema.optional(Schema.String).pipe(T.HttpQuery("prefix")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}/keys",
    }),
  ) as unknown as Schema.Schema<ListNamespaceKeysRequest>;

export type ListNamespaceKeysResponse = {
  name: string;
  expiration?: number | null;
  metadata?: unknown | null;
}[];

export const ListNamespaceKeysResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      name: Schema.String,
      expiration: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      metadata: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    }),
  ) as unknown as Schema.Schema<ListNamespaceKeysResponse>;

export type ListNamespaceKeysError = DefaultErrors;

export const listNamespaceKeys: API.OperationMethod<
  ListNamespaceKeysRequest,
  ListNamespaceKeysResponse,
  ListNamespaceKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListNamespaceKeysRequest,
  output: ListNamespaceKeysResponse,
  errors: [],
}));

export interface BulkGetNamespaceKeysRequest {
  namespaceId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Array of keys to retrieve (maximum of 100). */
  keys: string[];
  /** Body param: Whether to parse JSON values in the response. */
  type?: "text" | "json";
  /** Body param: Whether to include metadata in the response. */
  withMetadata?: boolean;
}

export const BulkGetNamespaceKeysRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    namespaceId: Schema.String.pipe(T.HttpPath("namespaceId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    keys: Schema.Array(Schema.String),
    type: Schema.optional(Schema.Literals(["text", "json"])),
    withMetadata: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}/bulk/get",
    }),
  ) as unknown as Schema.Schema<BulkGetNamespaceKeysRequest>;

export type BulkGetNamespaceKeysResponse = {
  values?: Record<string, unknown> | null;
};

export const BulkGetNamespaceKeysResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    values: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
  }) as unknown as Schema.Schema<BulkGetNamespaceKeysResponse>;

export type BulkGetNamespaceKeysError =
  | DefaultErrors
  | InvalidRequestBody
  | NamespaceNotFound
  | InvalidObjectIdentifier;

export const bulkGetNamespaceKeys: API.OperationMethod<
  BulkGetNamespaceKeysRequest,
  BulkGetNamespaceKeysResponse,
  BulkGetNamespaceKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkGetNamespaceKeysRequest,
  output: BulkGetNamespaceKeysResponse,
  errors: [InvalidRequestBody, NamespaceNotFound, InvalidObjectIdentifier],
}));

export interface BulkDeleteNamespaceKeysRequest {
  namespaceId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: */
  body: string[];
}

export const BulkDeleteNamespaceKeysRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    namespaceId: Schema.String.pipe(T.HttpPath("namespaceId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    body: Schema.Array(Schema.String).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}/bulk/delete",
    }),
  ) as unknown as Schema.Schema<BulkDeleteNamespaceKeysRequest>;

export interface BulkDeleteNamespaceKeysResponse {
  /** Number of keys successfully updated. */
  successfulKeyCount?: number | null;
  /** Name of the keys that failed to be fully updated. They should be retried. */
  unsuccessfulKeys?: string[] | null;
}

export const BulkDeleteNamespaceKeysResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    successfulKeyCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    unsuccessfulKeys: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      successfulKeyCount: "successful_key_count",
      unsuccessfulKeys: "unsuccessful_keys",
    }),
  ) as unknown as Schema.Schema<BulkDeleteNamespaceKeysResponse>;

export type BulkDeleteNamespaceKeysError =
  | DefaultErrors
  | NamespaceNotFound
  | InvalidRequestBody
  | InvalidObjectIdentifier;

export const bulkDeleteNamespaceKeys: API.OperationMethod<
  BulkDeleteNamespaceKeysRequest,
  BulkDeleteNamespaceKeysResponse,
  BulkDeleteNamespaceKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkDeleteNamespaceKeysRequest,
  output: BulkDeleteNamespaceKeysResponse,
  errors: [NamespaceNotFound, InvalidRequestBody, InvalidObjectIdentifier],
}));

// =============================================================================
// NamespaceMetadata
// =============================================================================

export interface GetNamespaceMetadataRequest {
  namespaceId: string;
  keyName: string;
  /** Identifier. */
  accountId: string;
}

export const GetNamespaceMetadataRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    namespaceId: Schema.String.pipe(T.HttpPath("namespaceId")),
    keyName: Schema.String.pipe(T.HttpPath("keyName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}/metadata/{keyName}",
    }),
  ) as unknown as Schema.Schema<GetNamespaceMetadataRequest>;

export type GetNamespaceMetadataResponse = unknown;

export const GetNamespaceMetadataResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetNamespaceMetadataResponse>;

export type GetNamespaceMetadataError =
  | DefaultErrors
  | KeyNotFound
  | NamespaceNotFound
  | InvalidObjectIdentifier;

export const getNamespaceMetadata: API.OperationMethod<
  GetNamespaceMetadataRequest,
  GetNamespaceMetadataResponse,
  GetNamespaceMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetNamespaceMetadataRequest,
  output: GetNamespaceMetadataResponse,
  errors: [KeyNotFound, NamespaceNotFound, InvalidObjectIdentifier],
}));

// =============================================================================
// NamespaceValue
// =============================================================================

export interface GetNamespaceValueRequest {
  namespaceId: string;
  keyName: string;
  /** Identifier. */
  accountId: string;
}

export const GetNamespaceValueRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    namespaceId: Schema.String.pipe(T.HttpPath("namespaceId")),
    keyName: Schema.String.pipe(T.HttpPath("keyName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}/values/{keyName}",
    }),
  ) as unknown as Schema.Schema<GetNamespaceValueRequest>;

export type GetNamespaceValueResponse = unknown;

export const GetNamespaceValueResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetNamespaceValueResponse>;

export type GetNamespaceValueError =
  | DefaultErrors
  | KeyNotFound
  | NamespaceNotFound
  | InvalidObjectIdentifier;

export const getNamespaceValue: API.OperationMethod<
  GetNamespaceValueRequest,
  GetNamespaceValueResponse,
  GetNamespaceValueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetNamespaceValueRequest,
  output: GetNamespaceValueResponse,
  errors: [KeyNotFound, NamespaceNotFound, InvalidObjectIdentifier],
}));

export interface PutNamespaceValueRequest {
  namespaceId: string;
  keyName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Expires the key at a certain time, measured in number of seconds since the UNIX epoch. */
  expiration?: number;
  /** Query param: Expires the key after a number of seconds. Must be at least 60. */
  expirationTtl?: number;
  /** Body param: A byte sequence to be stored, up to 25 MiB in length. */
  value: string;
  /** Body param: Associates arbitrary JSON data with a key/value pair. */
  metadata?: unknown;
}

export const PutNamespaceValueRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    namespaceId: Schema.String.pipe(T.HttpPath("namespaceId")),
    keyName: Schema.String.pipe(T.HttpPath("keyName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    expiration: Schema.optional(Schema.Number).pipe(T.HttpQuery("expiration")),
    expirationTtl: Schema.optional(Schema.Number).pipe(
      T.HttpQuery("expiration_ttl"),
    ),
    value: Schema.String,
    metadata: Schema.optional(Schema.Unknown),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}/values/{keyName}",
      contentType: "multipart",
    }),
  ) as unknown as Schema.Schema<PutNamespaceValueRequest>;

export interface PutNamespaceValueResponse {}

export const PutNamespaceValueResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as unknown as Schema.Schema<PutNamespaceValueResponse>;

export type PutNamespaceValueError =
  | DefaultErrors
  | NamespaceNotFound
  | InvalidObjectIdentifier
  | InvalidExpirationTtl;

export const putNamespaceValue: API.OperationMethod<
  PutNamespaceValueRequest,
  PutNamespaceValueResponse,
  PutNamespaceValueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutNamespaceValueRequest,
  output: PutNamespaceValueResponse,
  errors: [NamespaceNotFound, InvalidObjectIdentifier, InvalidExpirationTtl],
}));

export interface DeleteNamespaceValueRequest {
  namespaceId: string;
  keyName: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteNamespaceValueRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    namespaceId: Schema.String.pipe(T.HttpPath("namespaceId")),
    keyName: Schema.String.pipe(T.HttpPath("keyName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}/values/{keyName}",
    }),
  ) as unknown as Schema.Schema<DeleteNamespaceValueRequest>;

export interface DeleteNamespaceValueResponse {}

export const DeleteNamespaceValueResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as unknown as Schema.Schema<DeleteNamespaceValueResponse>;

export type DeleteNamespaceValueError =
  | DefaultErrors
  | NamespaceNotFound
  | InvalidObjectIdentifier;

export const deleteNamespaceValue: API.OperationMethod<
  DeleteNamespaceValueRequest,
  DeleteNamespaceValueResponse,
  DeleteNamespaceValueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteNamespaceValueRequest,
  output: DeleteNamespaceValueResponse,
  errors: [NamespaceNotFound, InvalidObjectIdentifier],
}));

// =============================================================================
// PutNamespace
// =============================================================================

export interface BulkPutNamespacesRequest {
  namespaceId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: */
  body: {
    key: string;
    value: string;
    base64?: boolean;
    expiration?: number;
    expirationTtl?: number;
    metadata?: unknown;
  }[];
}

export const BulkPutNamespacesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    namespaceId: Schema.String.pipe(T.HttpPath("namespaceId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    body: Schema.Array(
      Schema.Struct({
        key: Schema.String,
        value: Schema.String,
        base64: Schema.optional(Schema.Boolean),
        expiration: Schema.optional(Schema.Number),
        expirationTtl: Schema.optional(Schema.Number),
        metadata: Schema.optional(Schema.Unknown),
      }).pipe(
        Schema.encodeKeys({
          key: "key",
          value: "value",
          base64: "base64",
          expiration: "expiration",
          expirationTtl: "expiration_ttl",
          metadata: "metadata",
        }),
      ),
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}/bulk",
    }),
  ) as unknown as Schema.Schema<BulkPutNamespacesRequest>;

export interface BulkPutNamespacesResponse {
  /** Number of keys successfully updated. */
  successfulKeyCount?: number | null;
  /** Name of the keys that failed to be fully updated. They should be retried. */
  unsuccessfulKeys?: string[] | null;
}

export const BulkPutNamespacesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    successfulKeyCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    unsuccessfulKeys: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      successfulKeyCount: "successful_key_count",
      unsuccessfulKeys: "unsuccessful_keys",
    }),
  ) as unknown as Schema.Schema<BulkPutNamespacesResponse>;

export type BulkPutNamespacesError =
  | DefaultErrors
  | InvalidRequestBody
  | NamespaceNotFound
  | InvalidObjectIdentifier;

export const bulkPutNamespaces: API.OperationMethod<
  BulkPutNamespacesRequest,
  BulkPutNamespacesResponse,
  BulkPutNamespacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkPutNamespacesRequest,
  output: BulkPutNamespacesResponse,
  errors: [InvalidRequestBody, NamespaceNotFound, InvalidObjectIdentifier],
}));

// =============================================================================
// PutNamespaceKey
// =============================================================================

export interface BulkPutNamespaceKeysRequest {
  namespaceId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: */
  body: {
    key: string;
    value: string;
    base64?: boolean;
    expiration?: number;
    expirationTtl?: number;
    metadata?: unknown;
  }[];
}

export const BulkPutNamespaceKeysRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    namespaceId: Schema.String.pipe(T.HttpPath("namespaceId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    body: Schema.Array(
      Schema.Struct({
        key: Schema.String,
        value: Schema.String,
        base64: Schema.optional(Schema.Boolean),
        expiration: Schema.optional(Schema.Number),
        expirationTtl: Schema.optional(Schema.Number),
        metadata: Schema.optional(Schema.Unknown),
      }).pipe(
        Schema.encodeKeys({
          key: "key",
          value: "value",
          base64: "base64",
          expiration: "expiration",
          expirationTtl: "expiration_ttl",
          metadata: "metadata",
        }),
      ),
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}/bulk",
    }),
  ) as unknown as Schema.Schema<BulkPutNamespaceKeysRequest>;

export interface BulkPutNamespaceKeysResponse {
  /** Number of keys successfully updated. */
  successfulKeyCount?: number | null;
  /** Name of the keys that failed to be fully updated. They should be retried. */
  unsuccessfulKeys?: string[] | null;
}

export const BulkPutNamespaceKeysResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    successfulKeyCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    unsuccessfulKeys: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      successfulKeyCount: "successful_key_count",
      unsuccessfulKeys: "unsuccessful_keys",
    }),
  ) as unknown as Schema.Schema<BulkPutNamespaceKeysResponse>;

export type BulkPutNamespaceKeysError =
  | DefaultErrors
  | InvalidRequestBody
  | NamespaceNotFound
  | InvalidObjectIdentifier;

export const bulkPutNamespaceKeys: API.OperationMethod<
  BulkPutNamespaceKeysRequest,
  BulkPutNamespaceKeysResponse,
  BulkPutNamespaceKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkPutNamespaceKeysRequest,
  output: BulkPutNamespaceKeysResponse,
  errors: [InvalidRequestBody, NamespaceNotFound, InvalidObjectIdentifier],
}));
