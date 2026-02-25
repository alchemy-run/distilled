/**
 * Cloudflare SECRETS-STORE API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service secrets-store
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
// Quota
// =============================================================================

export interface GetQuotaRequest {
  /** Account Identifier */
  accountId: string;
}

export const GetQuotaRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/secrets_store/quota" }),
) as unknown as Schema.Schema<GetQuotaRequest>;

export interface GetQuotaResponse {
  secrets: { quota: number; usage: number };
}

export const GetQuotaResponse = Schema.Struct({
  secrets: Schema.Struct({
    quota: Schema.Number,
    usage: Schema.Number,
  }),
}) as unknown as Schema.Schema<GetQuotaResponse>;

export const getQuota: (
  input: GetQuotaRequest,
) => Effect.Effect<
  GetQuotaResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetQuotaRequest,
  output: GetQuotaResponse,
  errors: [],
}));

// =============================================================================
// Store
// =============================================================================

export interface ListStoresRequest {
  /** Path param: Account Identifier */
  accountId: string;
  /** Query param: Direction to sort objects */
  direction?: "asc" | "desc";
  /** Query param: Order secrets by values in the given field */
  order?: "name" | "comment" | "created" | "modified" | "status";
}

export const ListStoresRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  order: Schema.optional(
    Schema.Literals(["name", "comment", "created", "modified", "status"]),
  ).pipe(T.HttpQuery("order")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/secrets_store/stores",
  }),
) as unknown as Schema.Schema<ListStoresRequest>;

export type ListStoresResponse = {
  id: string;
  created: string;
  modified: string;
  name: string;
}[];

export const ListStoresResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    created: Schema.String,
    modified: Schema.String,
    name: Schema.String,
  }),
) as unknown as Schema.Schema<ListStoresResponse>;

export const listStores: (
  input: ListStoresRequest,
) => Effect.Effect<
  ListStoresResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListStoresRequest,
  output: ListStoresResponse,
  errors: [],
}));

export interface CreateStoreRequest {
  /** Path param: Account Identifier */
  accountId: string;
  /** Body param: */
  body: { name: string }[];
}

export const CreateStoreRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Array(
    Schema.Struct({
      name: Schema.String,
    }),
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/secrets_store/stores",
  }),
) as unknown as Schema.Schema<CreateStoreRequest>;

export type CreateStoreResponse = {
  id: string;
  created: string;
  modified: string;
  name: string;
}[];

export const CreateStoreResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    created: Schema.String,
    modified: Schema.String,
    name: Schema.String,
  }),
) as unknown as Schema.Schema<CreateStoreResponse>;

export const createStore: (
  input: CreateStoreRequest,
) => Effect.Effect<
  CreateStoreResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateStoreRequest,
  output: CreateStoreResponse,
  errors: [],
}));

export interface DeleteStoreRequest {
  storeId: string;
  /** Account Identifier */
  accountId: string;
}

export const DeleteStoreRequest = Schema.Struct({
  storeId: Schema.String.pipe(T.HttpPath("storeId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/secrets_store/stores/{storeId}",
  }),
) as unknown as Schema.Schema<DeleteStoreRequest>;

export interface DeleteStoreResponse {
  /** Store Identifier */
  id: string;
  /** Whenthe secret was created. */
  created: string;
  /** When the secret was modified. */
  modified: string;
  /** The name of the store */
  name: string;
}

export const DeleteStoreResponse = Schema.Struct({
  id: Schema.String,
  created: Schema.String,
  modified: Schema.String,
  name: Schema.String,
}) as unknown as Schema.Schema<DeleteStoreResponse>;

export const deleteStore: (
  input: DeleteStoreRequest,
) => Effect.Effect<
  DeleteStoreResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteStoreRequest,
  output: DeleteStoreResponse,
  errors: [],
}));

// =============================================================================
// StoreSecret
// =============================================================================

export interface GetStoreSecretRequest {
  storeId: string;
  secretId: string;
  /** Account Identifier */
  accountId: string;
}

export const GetStoreSecretRequest = Schema.Struct({
  storeId: Schema.String.pipe(T.HttpPath("storeId")),
  secretId: Schema.String.pipe(T.HttpPath("secretId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/secrets_store/stores/{storeId}/secrets/{secretId}",
  }),
) as unknown as Schema.Schema<GetStoreSecretRequest>;

export interface GetStoreSecretResponse {
  /** Secret identifier tag. */
  id: string;
  /** Whenthe secret was created. */
  created: string;
  /** When the secret was modified. */
  modified: string;
  /** The name of the secret */
  name: string;
  status: "pending" | "active" | "deleted";
  /** Store Identifier */
  storeId: string;
  /** Freeform text describing the secret */
  comment?: string;
}

export const GetStoreSecretResponse = Schema.Struct({
  id: Schema.String,
  created: Schema.String,
  modified: Schema.String,
  name: Schema.String,
  status: Schema.Literals(["pending", "active", "deleted"]),
  storeId: Schema.String,
  comment: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ storeId: "store_id" }),
) as unknown as Schema.Schema<GetStoreSecretResponse>;

export const getStoreSecret: (
  input: GetStoreSecretRequest,
) => Effect.Effect<
  GetStoreSecretResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetStoreSecretRequest,
  output: GetStoreSecretResponse,
  errors: [],
}));

export interface ListStoreSecretsRequest {
  storeId: string;
  /** Path param: Account Identifier */
  accountId: string;
  /** Query param: Direction to sort objects */
  direction?: "asc" | "desc";
  /** Query param: Order secrets by values in the given field */
  order?: "name" | "comment" | "created" | "modified" | "status";
  /** Query param: Only secrets with the given scopes will be returned */
  scopes?: string[][];
  /** Query param: Search secrets using a filter string, filtering across name and comment */
  search?: string;
}

export const ListStoreSecretsRequest = Schema.Struct({
  storeId: Schema.String.pipe(T.HttpPath("storeId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  order: Schema.optional(
    Schema.Literals(["name", "comment", "created", "modified", "status"]),
  ).pipe(T.HttpQuery("order")),
  scopes: Schema.optional(Schema.Array(Schema.Array(Schema.String))).pipe(
    T.HttpQuery("scopes"),
  ),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/secrets_store/stores/{storeId}/secrets",
  }),
) as unknown as Schema.Schema<ListStoreSecretsRequest>;

export type ListStoreSecretsResponse = {
  id: string;
  created: string;
  modified: string;
  name: string;
  status: "pending" | "active" | "deleted";
  storeId: string;
  comment?: string;
}[];

export const ListStoreSecretsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    created: Schema.String,
    modified: Schema.String,
    name: Schema.String,
    status: Schema.Literals(["pending", "active", "deleted"]),
    storeId: Schema.String,
    comment: Schema.optional(Schema.String),
  }).pipe(Schema.encodeKeys({ storeId: "store_id" })),
) as unknown as Schema.Schema<ListStoreSecretsResponse>;

export const listStoreSecrets: (
  input: ListStoreSecretsRequest,
) => Effect.Effect<
  ListStoreSecretsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListStoreSecretsRequest,
  output: ListStoreSecretsResponse,
  errors: [],
}));

export interface CreateStoreSecretRequest {
  storeId: string;
  /** Path param: Account Identifier */
  accountId: string;
  /** Body param: */
  body: { name: string; scopes: string[]; value: string; comment?: string }[];
}

export const CreateStoreSecretRequest = Schema.Struct({
  storeId: Schema.String.pipe(T.HttpPath("storeId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Array(
    Schema.Struct({
      name: Schema.String,
      scopes: Schema.Array(Schema.String),
      value: Schema.String,
      comment: Schema.optional(Schema.String),
    }),
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/secrets_store/stores/{storeId}/secrets",
  }),
) as unknown as Schema.Schema<CreateStoreSecretRequest>;

export type CreateStoreSecretResponse = {
  id: string;
  created: string;
  modified: string;
  name: string;
  status: "pending" | "active" | "deleted";
  storeId: string;
  comment?: string;
}[];

export const CreateStoreSecretResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    created: Schema.String,
    modified: Schema.String,
    name: Schema.String,
    status: Schema.Literals(["pending", "active", "deleted"]),
    storeId: Schema.String,
    comment: Schema.optional(Schema.String),
  }).pipe(Schema.encodeKeys({ storeId: "store_id" })),
) as unknown as Schema.Schema<CreateStoreSecretResponse>;

export const createStoreSecret: (
  input: CreateStoreSecretRequest,
) => Effect.Effect<
  CreateStoreSecretResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateStoreSecretRequest,
  output: CreateStoreSecretResponse,
  errors: [],
}));

export interface PatchStoreSecretRequest {
  storeId: string;
  secretId: string;
  /** Path param: Account Identifier */
  accountId: string;
  /** Body param: Freeform text describing the secret */
  comment?: string;
  /** Body param: The list of services that can use this secret. */
  scopes?: string[];
}

export const PatchStoreSecretRequest = Schema.Struct({
  storeId: Schema.String.pipe(T.HttpPath("storeId")),
  secretId: Schema.String.pipe(T.HttpPath("secretId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  comment: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/secrets_store/stores/{storeId}/secrets/{secretId}",
  }),
) as unknown as Schema.Schema<PatchStoreSecretRequest>;

export interface PatchStoreSecretResponse {
  /** Secret identifier tag. */
  id: string;
  /** Whenthe secret was created. */
  created: string;
  /** When the secret was modified. */
  modified: string;
  /** The name of the secret */
  name: string;
  status: "pending" | "active" | "deleted";
  /** Store Identifier */
  storeId: string;
  /** Freeform text describing the secret */
  comment?: string;
}

export const PatchStoreSecretResponse = Schema.Struct({
  id: Schema.String,
  created: Schema.String,
  modified: Schema.String,
  name: Schema.String,
  status: Schema.Literals(["pending", "active", "deleted"]),
  storeId: Schema.String,
  comment: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ storeId: "store_id" }),
) as unknown as Schema.Schema<PatchStoreSecretResponse>;

export const patchStoreSecret: (
  input: PatchStoreSecretRequest,
) => Effect.Effect<
  PatchStoreSecretResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchStoreSecretRequest,
  output: PatchStoreSecretResponse,
  errors: [],
}));

export interface DeleteStoreSecretRequest {
  storeId: string;
  secretId: string;
  /** Account Identifier */
  accountId: string;
}

export const DeleteStoreSecretRequest = Schema.Struct({
  storeId: Schema.String.pipe(T.HttpPath("storeId")),
  secretId: Schema.String.pipe(T.HttpPath("secretId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/secrets_store/stores/{storeId}/secrets/{secretId}",
  }),
) as unknown as Schema.Schema<DeleteStoreSecretRequest>;

export interface DeleteStoreSecretResponse {
  /** Secret identifier tag. */
  id: string;
  /** Whenthe secret was created. */
  created: string;
  /** When the secret was modified. */
  modified: string;
  /** The name of the secret */
  name: string;
  status: "pending" | "active" | "deleted";
  /** Store Identifier */
  storeId: string;
  /** Freeform text describing the secret */
  comment?: string;
}

export const DeleteStoreSecretResponse = Schema.Struct({
  id: Schema.String,
  created: Schema.String,
  modified: Schema.String,
  name: Schema.String,
  status: Schema.Literals(["pending", "active", "deleted"]),
  storeId: Schema.String,
  comment: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ storeId: "store_id" }),
) as unknown as Schema.Schema<DeleteStoreSecretResponse>;

export const deleteStoreSecret: (
  input: DeleteStoreSecretRequest,
) => Effect.Effect<
  DeleteStoreSecretResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteStoreSecretRequest,
  output: DeleteStoreSecretResponse,
  errors: [],
}));

export interface BulkDeleteStoreSecretsRequest {
  storeId: string;
  /** Account Identifier */
  accountId: string;
}

export const BulkDeleteStoreSecretsRequest = Schema.Struct({
  storeId: Schema.String.pipe(T.HttpPath("storeId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/secrets_store/stores/{storeId}/secrets",
  }),
) as unknown as Schema.Schema<BulkDeleteStoreSecretsRequest>;

export type BulkDeleteStoreSecretsResponse = {
  id: string;
  created: string;
  modified: string;
  name: string;
  status: "pending" | "active" | "deleted";
  storeId: string;
  comment?: string;
}[];

export const BulkDeleteStoreSecretsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    created: Schema.String,
    modified: Schema.String,
    name: Schema.String,
    status: Schema.Literals(["pending", "active", "deleted"]),
    storeId: Schema.String,
    comment: Schema.optional(Schema.String),
  }).pipe(Schema.encodeKeys({ storeId: "store_id" })),
) as unknown as Schema.Schema<BulkDeleteStoreSecretsResponse>;

export const bulkDeleteStoreSecrets: (
  input: BulkDeleteStoreSecretsRequest,
) => Effect.Effect<
  BulkDeleteStoreSecretsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: BulkDeleteStoreSecretsRequest,
  output: BulkDeleteStoreSecretsResponse,
  errors: [],
}));

export interface DuplicateStoreSecretRequest {
  storeId: string;
  secretId: string;
  /** Path param: Account Identifier */
  accountId: string;
  /** Body param: The name of the secret */
  name: string;
  /** Body param: The list of services that can use this secret. */
  scopes: string[];
  /** Body param: Freeform text describing the secret */
  comment?: string;
}

export const DuplicateStoreSecretRequest = Schema.Struct({
  storeId: Schema.String.pipe(T.HttpPath("storeId")),
  secretId: Schema.String.pipe(T.HttpPath("secretId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  scopes: Schema.Array(Schema.String),
  comment: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/secrets_store/stores/{storeId}/secrets/{secretId}/duplicate",
  }),
) as unknown as Schema.Schema<DuplicateStoreSecretRequest>;

export interface DuplicateStoreSecretResponse {
  /** Secret identifier tag. */
  id: string;
  /** Whenthe secret was created. */
  created: string;
  /** When the secret was modified. */
  modified: string;
  /** The name of the secret */
  name: string;
  status: "pending" | "active" | "deleted";
  /** Store Identifier */
  storeId: string;
  /** Freeform text describing the secret */
  comment?: string;
}

export const DuplicateStoreSecretResponse = Schema.Struct({
  id: Schema.String,
  created: Schema.String,
  modified: Schema.String,
  name: Schema.String,
  status: Schema.Literals(["pending", "active", "deleted"]),
  storeId: Schema.String,
  comment: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ storeId: "store_id" }),
) as unknown as Schema.Schema<DuplicateStoreSecretResponse>;

export const duplicateStoreSecret: (
  input: DuplicateStoreSecretRequest,
) => Effect.Effect<
  DuplicateStoreSecretResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DuplicateStoreSecretRequest,
  output: DuplicateStoreSecretResponse,
  errors: [],
}));
