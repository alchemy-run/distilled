/**
 * Cloudflare KV API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service kv
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { ApiToken } from "../auth.ts";
import {
  type CommonErrors,
  UnknownCloudflareError,
  CloudflareNetworkError,
  CloudflareHttpError,
} from "../errors.ts";

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

export const GetNamespaceRequest = Schema.Struct({
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
  supportsUrlEncoding?: boolean;
}

export const GetNamespaceResponse = Schema.Struct({
  id: Schema.String,
  title: Schema.String,
  supportsUrlEncoding: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({ supportsUrlEncoding: "supports_url_encoding" }),
) as unknown as Schema.Schema<GetNamespaceResponse>;

export const getNamespace: (
  input: GetNamespaceRequest,
) => Effect.Effect<
  GetNamespaceResponse,
  CommonErrors | NamespaceNotFound | InvalidObjectIdentifier,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListNamespacesRequest = Schema.Struct({
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
  supportsUrlEncoding?: boolean;
}[];

export const ListNamespacesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    title: Schema.String,
    supportsUrlEncoding: Schema.optional(Schema.Boolean),
  }).pipe(Schema.encodeKeys({ supportsUrlEncoding: "supports_url_encoding" })),
) as unknown as Schema.Schema<ListNamespacesResponse>;

export const listNamespaces: (
  input: ListNamespacesRequest,
) => Effect.Effect<
  ListNamespacesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const CreateNamespaceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  title: Schema.String,
}).pipe(
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
  supportsUrlEncoding?: boolean;
}

export const CreateNamespaceResponse = Schema.Struct({
  id: Schema.String,
  title: Schema.String,
  supportsUrlEncoding: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({ supportsUrlEncoding: "supports_url_encoding" }),
) as unknown as Schema.Schema<CreateNamespaceResponse>;

export const createNamespace: (
  input: CreateNamespaceRequest,
) => Effect.Effect<
  CreateNamespaceResponse,
  | CommonErrors
  | TitleRequired
  | InvalidObjectIdentifier
  | NamespaceTitleAlreadyExists,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const UpdateNamespaceRequest = Schema.Struct({
  namespaceId: Schema.String.pipe(T.HttpPath("namespaceId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  title: Schema.String,
}).pipe(
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
  supportsUrlEncoding?: boolean;
}

export const UpdateNamespaceResponse = Schema.Struct({
  id: Schema.String,
  title: Schema.String,
  supportsUrlEncoding: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({ supportsUrlEncoding: "supports_url_encoding" }),
) as unknown as Schema.Schema<UpdateNamespaceResponse>;

export const updateNamespace: (
  input: UpdateNamespaceRequest,
) => Effect.Effect<
  UpdateNamespaceResponse,
  | CommonErrors
  | NamespaceNotFound
  | TitleRequired
  | InvalidObjectIdentifier
  | NamespaceTitleAlreadyExists,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const DeleteNamespaceRequest = Schema.Struct({
  namespaceId: Schema.String.pipe(T.HttpPath("namespaceId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}",
  }),
) as unknown as Schema.Schema<DeleteNamespaceRequest>;

export interface DeleteNamespaceResponse {}

export const DeleteNamespaceResponse = Schema.Struct(
  {},
) as unknown as Schema.Schema<DeleteNamespaceResponse>;

export const deleteNamespace: (
  input: DeleteNamespaceRequest,
) => Effect.Effect<
  DeleteNamespaceResponse,
  CommonErrors | MethodNotAllowed | NamespaceNotFound | InvalidObjectIdentifier,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const BulkGetNamespacesRequest = Schema.Struct({
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

export type BulkGetNamespacesResponse = { values?: Record<string, unknown> };

export const BulkGetNamespacesResponse = Schema.Struct({
  values: Schema.optional(Schema.Struct({})),
}) as unknown as Schema.Schema<BulkGetNamespacesResponse>;

export const bulkGetNamespaces: (
  input: BulkGetNamespacesRequest,
) => Effect.Effect<
  BulkGetNamespacesResponse,
  | CommonErrors
  | InvalidRequestBody
  | MinimumKeysRequired
  | NamespaceNotFound
  | InvalidObjectIdentifier,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const BulkDeleteNamespacesRequest = Schema.Struct({
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
  successfulKeyCount?: number;
  /** Name of the keys that failed to be fully updated. They should be retried. */
  unsuccessfulKeys?: string[];
}

export const BulkDeleteNamespacesResponse = Schema.Struct({
  successfulKeyCount: Schema.optional(Schema.Number),
  unsuccessfulKeys: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({
    successfulKeyCount: "successful_key_count",
    unsuccessfulKeys: "unsuccessful_keys",
  }),
) as unknown as Schema.Schema<BulkDeleteNamespacesResponse>;

export const bulkDeleteNamespaces: (
  input: BulkDeleteNamespacesRequest,
) => Effect.Effect<
  BulkDeleteNamespacesResponse,
  | CommonErrors
  | NamespaceNotFound
  | InvalidRequestBody
  | InvalidObjectIdentifier,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListNamespaceKeysRequest = Schema.Struct({
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
  expiration?: number;
  metadata?: unknown;
}[];

export const ListNamespaceKeysResponse = Schema.Array(
  Schema.Struct({
    name: Schema.String,
    expiration: Schema.optional(Schema.Number),
    metadata: Schema.optional(Schema.Unknown),
  }),
) as unknown as Schema.Schema<ListNamespaceKeysResponse>;

export const listNamespaceKeys: (
  input: ListNamespaceKeysRequest,
) => Effect.Effect<
  ListNamespaceKeysResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const BulkGetNamespaceKeysRequest = Schema.Struct({
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

export type BulkGetNamespaceKeysResponse = { values?: Record<string, unknown> };

export const BulkGetNamespaceKeysResponse = Schema.Struct({
  values: Schema.optional(Schema.Struct({})),
}) as unknown as Schema.Schema<BulkGetNamespaceKeysResponse>;

export const bulkGetNamespaceKeys: (
  input: BulkGetNamespaceKeysRequest,
) => Effect.Effect<
  BulkGetNamespaceKeysResponse,
  | CommonErrors
  | InvalidRequestBody
  | NamespaceNotFound
  | InvalidObjectIdentifier,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const BulkDeleteNamespaceKeysRequest = Schema.Struct({
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
  successfulKeyCount?: number;
  /** Name of the keys that failed to be fully updated. They should be retried. */
  unsuccessfulKeys?: string[];
}

export const BulkDeleteNamespaceKeysResponse = Schema.Struct({
  successfulKeyCount: Schema.optional(Schema.Number),
  unsuccessfulKeys: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({
    successfulKeyCount: "successful_key_count",
    unsuccessfulKeys: "unsuccessful_keys",
  }),
) as unknown as Schema.Schema<BulkDeleteNamespaceKeysResponse>;

export const bulkDeleteNamespaceKeys: (
  input: BulkDeleteNamespaceKeysRequest,
) => Effect.Effect<
  BulkDeleteNamespaceKeysResponse,
  | CommonErrors
  | NamespaceNotFound
  | InvalidRequestBody
  | InvalidObjectIdentifier,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetNamespaceMetadataRequest = Schema.Struct({
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
  Schema.Unknown as unknown as Schema.Schema<GetNamespaceMetadataResponse>;

export const getNamespaceMetadata: (
  input: GetNamespaceMetadataRequest,
) => Effect.Effect<
  GetNamespaceMetadataResponse,
  CommonErrors | KeyNotFound | NamespaceNotFound | InvalidObjectIdentifier,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetNamespaceValueRequest = Schema.Struct({
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
  Schema.Unknown as unknown as Schema.Schema<GetNamespaceValueResponse>;

export const getNamespaceValue: (
  input: GetNamespaceValueRequest,
) => Effect.Effect<
  GetNamespaceValueResponse,
  CommonErrors | KeyNotFound | NamespaceNotFound | InvalidObjectIdentifier,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const PutNamespaceValueRequest = Schema.Struct({
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
  }),
) as unknown as Schema.Schema<PutNamespaceValueRequest>;

export interface PutNamespaceValueResponse {}

export const PutNamespaceValueResponse = Schema.Struct(
  {},
) as unknown as Schema.Schema<PutNamespaceValueResponse>;

export const putNamespaceValue: (
  input: PutNamespaceValueRequest,
) => Effect.Effect<
  PutNamespaceValueResponse,
  | CommonErrors
  | NamespaceNotFound
  | InvalidObjectIdentifier
  | InvalidExpirationTtl,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const DeleteNamespaceValueRequest = Schema.Struct({
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

export const DeleteNamespaceValueResponse = Schema.Struct(
  {},
) as unknown as Schema.Schema<DeleteNamespaceValueResponse>;

export const deleteNamespaceValue: (
  input: DeleteNamespaceValueRequest,
) => Effect.Effect<
  DeleteNamespaceValueResponse,
  CommonErrors | NamespaceNotFound | InvalidObjectIdentifier,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const BulkPutNamespacesRequest = Schema.Struct({
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
    }).pipe(Schema.encodeKeys({ expirationTtl: "expiration_ttl" })),
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}/bulk",
  }),
) as unknown as Schema.Schema<BulkPutNamespacesRequest>;

export interface BulkPutNamespacesResponse {
  /** Number of keys successfully updated. */
  successfulKeyCount?: number;
  /** Name of the keys that failed to be fully updated. They should be retried. */
  unsuccessfulKeys?: string[];
}

export const BulkPutNamespacesResponse = Schema.Struct({
  successfulKeyCount: Schema.optional(Schema.Number),
  unsuccessfulKeys: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({
    successfulKeyCount: "successful_key_count",
    unsuccessfulKeys: "unsuccessful_keys",
  }),
) as unknown as Schema.Schema<BulkPutNamespacesResponse>;

export const bulkPutNamespaces: (
  input: BulkPutNamespacesRequest,
) => Effect.Effect<
  BulkPutNamespacesResponse,
  | CommonErrors
  | InvalidRequestBody
  | NamespaceNotFound
  | InvalidObjectIdentifier,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const BulkPutNamespaceKeysRequest = Schema.Struct({
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
    }).pipe(Schema.encodeKeys({ expirationTtl: "expiration_ttl" })),
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/storage/kv/namespaces/{namespaceId}/bulk",
  }),
) as unknown as Schema.Schema<BulkPutNamespaceKeysRequest>;

export interface BulkPutNamespaceKeysResponse {
  /** Number of keys successfully updated. */
  successfulKeyCount?: number;
  /** Name of the keys that failed to be fully updated. They should be retried. */
  unsuccessfulKeys?: string[];
}

export const BulkPutNamespaceKeysResponse = Schema.Struct({
  successfulKeyCount: Schema.optional(Schema.Number),
  unsuccessfulKeys: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({
    successfulKeyCount: "successful_key_count",
    unsuccessfulKeys: "unsuccessful_keys",
  }),
) as unknown as Schema.Schema<BulkPutNamespaceKeysResponse>;

export const bulkPutNamespaceKeys: (
  input: BulkPutNamespaceKeysRequest,
) => Effect.Effect<
  BulkPutNamespaceKeysResponse,
  | CommonErrors
  | InvalidRequestBody
  | NamespaceNotFound
  | InvalidObjectIdentifier,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: BulkPutNamespaceKeysRequest,
  output: BulkPutNamespaceKeysResponse,
  errors: [InvalidRequestBody, NamespaceNotFound, InvalidObjectIdentifier],
}));
