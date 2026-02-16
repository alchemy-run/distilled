/**
 * Cloudflare VECTORIZE API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service vectorize
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type { HttpClient } from "@effect/platform";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { ApiToken } from "../auth.ts";
import {
  type CommonErrors,
  UnknownCloudflareError,
  CloudflareNetworkError,
  CloudflareHttpError,
} from "../errors.ts";
import { UploadableSchema } from "../schemas.ts";

// =============================================================================
// ByIdsIndex
// =============================================================================

export interface GetByIdsIndexRequest {
  indexName: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: A list of vector identifiers to retrieve from the index indicated by the path. */
  ids?: string[];
}

export const GetByIdsIndexRequest = Schema.Struct({
  indexName: Schema.String.pipe(T.HttpPath("indexName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  ids: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/vectorize/v2/indexes/{indexName}/get_by_ids",
  }),
) as unknown as Schema.Schema<GetByIdsIndexRequest>;

export type GetByIdsIndexResponse = unknown;

export const GetByIdsIndexResponse =
  Schema.Unknown as unknown as Schema.Schema<GetByIdsIndexResponse>;

export const getByIdsIndex: (
  input: GetByIdsIndexRequest,
) => Effect.Effect<
  GetByIdsIndexResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetByIdsIndexRequest,
  output: GetByIdsIndexResponse,
  errors: [],
}));

export interface DeleteByIdsIndexRequest {
  indexName: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: A list of vector identifiers to delete from the index indicated by the path. */
  ids?: string[];
}

export const DeleteByIdsIndexRequest = Schema.Struct({
  indexName: Schema.String.pipe(T.HttpPath("indexName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  ids: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/vectorize/v2/indexes/{indexName}/delete_by_ids",
  }),
) as unknown as Schema.Schema<DeleteByIdsIndexRequest>;

export interface DeleteByIdsIndexResponse {
  /** The unique identifier for the async mutation operation containing the changeset. */
  mutationId?: string;
}

export const DeleteByIdsIndexResponse = Schema.Struct({
  mutationId: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<DeleteByIdsIndexResponse>;

export const deleteByIdsIndex: (
  input: DeleteByIdsIndexRequest,
) => Effect.Effect<
  DeleteByIdsIndexResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteByIdsIndexRequest,
  output: DeleteByIdsIndexResponse,
  errors: [],
}));

// =============================================================================
// Index
// =============================================================================

export interface GetIndexRequest {
  indexName: string;
  /** Identifier */
  accountId: string;
}

export const GetIndexRequest = Schema.Struct({
  indexName: Schema.String.pipe(T.HttpPath("indexName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/vectorize/v2/indexes/{indexName}",
  }),
) as unknown as Schema.Schema<GetIndexRequest>;

export interface GetIndexResponse {
  config?: {
    dimensions: number;
    metric: "cosine" | "euclidean" | "dot-product";
  };
  /** Specifies the timestamp the resource was created as an ISO8601 string. */
  createdOn?: string;
  /** Specifies the description of the index. */
  description?: string;
  /** Specifies the timestamp the resource was modified as an ISO8601 string. */
  modifiedOn?: string;
  name?: string;
}

export const GetIndexResponse = Schema.Struct({
  config: Schema.optional(
    Schema.Struct({
      dimensions: Schema.Number,
      metric: Schema.Literal("cosine", "euclidean", "dot-product"),
    }),
  ),
  createdOn: Schema.optional(Schema.String).pipe(T.JsonName("created_on")),
  description: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String).pipe(T.JsonName("modified_on")),
  name: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<GetIndexResponse>;

export const getIndex: (
  input: GetIndexRequest,
) => Effect.Effect<
  GetIndexResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIndexRequest,
  output: GetIndexResponse,
  errors: [],
}));

export interface CreateIndexRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Body param: Specifies the type of configuration to use for the index. */
  config:
    | { dimensions: number; metric: "cosine" | "euclidean" | "dot-product" }
    | {
        preset:
          | "@cf/baai/bge-small-en-v1.5"
          | "@cf/baai/bge-base-en-v1.5"
          | "@cf/baai/bge-large-en-v1.5"
          | "openai/text-embedding-ada-002"
          | "cohere/embed-multilingual-v2.0";
      };
  /** Body param: */
  name: string;
  /** Body param: Specifies the description of the index. */
  description?: string;
}

export const CreateIndexRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  config: Schema.Union(
    Schema.Struct({
      dimensions: Schema.Number,
      metric: Schema.Literal("cosine", "euclidean", "dot-product"),
    }),
    Schema.Struct({
      preset: Schema.Literal(
        "@cf/baai/bge-small-en-v1.5",
        "@cf/baai/bge-base-en-v1.5",
        "@cf/baai/bge-large-en-v1.5",
        "openai/text-embedding-ada-002",
        "cohere/embed-multilingual-v2.0",
      ),
    }),
  ),
  name: Schema.String,
  description: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/vectorize/v2/indexes",
  }),
) as unknown as Schema.Schema<CreateIndexRequest>;

export interface CreateIndexResponse {
  config?: {
    dimensions: number;
    metric: "cosine" | "euclidean" | "dot-product";
  };
  /** Specifies the timestamp the resource was created as an ISO8601 string. */
  createdOn?: string;
  /** Specifies the description of the index. */
  description?: string;
  /** Specifies the timestamp the resource was modified as an ISO8601 string. */
  modifiedOn?: string;
  name?: string;
}

export const CreateIndexResponse = Schema.Struct({
  config: Schema.optional(
    Schema.Struct({
      dimensions: Schema.Number,
      metric: Schema.Literal("cosine", "euclidean", "dot-product"),
    }),
  ),
  createdOn: Schema.optional(Schema.String).pipe(T.JsonName("created_on")),
  description: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String).pipe(T.JsonName("modified_on")),
  name: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<CreateIndexResponse>;

export const createIndex: (
  input: CreateIndexRequest,
) => Effect.Effect<
  CreateIndexResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateIndexRequest,
  output: CreateIndexResponse,
  errors: [],
}));

export interface DeleteIndexRequest {
  indexName: string;
  /** Identifier */
  accountId: string;
}

export const DeleteIndexRequest = Schema.Struct({
  indexName: Schema.String.pipe(T.HttpPath("indexName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/vectorize/v2/indexes/{indexName}",
  }),
) as unknown as Schema.Schema<DeleteIndexRequest>;

export type DeleteIndexResponse = string;

export const DeleteIndexResponse =
  Schema.String as unknown as Schema.Schema<DeleteIndexResponse>;

export const deleteIndex: (
  input: DeleteIndexRequest,
) => Effect.Effect<
  DeleteIndexResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteIndexRequest,
  output: DeleteIndexResponse,
  errors: [],
}));

export interface InfoIndexRequest {
  indexName: string;
  /** Identifier */
  accountId: string;
}

export const InfoIndexRequest = Schema.Struct({
  indexName: Schema.String.pipe(T.HttpPath("indexName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/vectorize/v2/indexes/{indexName}/info",
  }),
) as unknown as Schema.Schema<InfoIndexRequest>;

export interface InfoIndexResponse {
  /** Specifies the number of dimensions for the index */
  dimensions?: number;
  /** Specifies the timestamp the last mutation batch was processed as an ISO8601 string. */
  processedUpToDatetime?: string | null;
  /** The unique identifier for the async mutation operation containing the changeset. */
  processedUpToMutation?: string;
  /** Specifies the number of vectors present in the index */
  vectorCount?: number;
}

export const InfoIndexResponse = Schema.Struct({
  dimensions: Schema.optional(Schema.Number),
  processedUpToDatetime: Schema.optional(
    Schema.Union(Schema.String, Schema.Null),
  ),
  processedUpToMutation: Schema.optional(Schema.String),
  vectorCount: Schema.optional(Schema.Number),
}) as unknown as Schema.Schema<InfoIndexResponse>;

export const infoIndex: (
  input: InfoIndexRequest,
) => Effect.Effect<
  InfoIndexResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: InfoIndexRequest,
  output: InfoIndexResponse,
  errors: [],
}));

export interface InsertIndexRequest {
  indexName: string;
  /** Path param: Identifier */
  accountId: string;
  /** Query param: Behavior for ndjson parse failures. */
  unparsableBehavior?: "error" | "discard";
  /** Body param: ndjson file containing vectors to insert. */
  body: File | Blob;
}

export const InsertIndexRequest = Schema.Struct({
  indexName: Schema.String.pipe(T.HttpPath("indexName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  unparsableBehavior: Schema.optional(Schema.Literal("error", "discard")).pipe(
    T.HttpQuery("'unparsable-behavior'"),
  ),
  body: UploadableSchema.pipe(T.HttpFormDataFile()).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/vectorize/v2/indexes/{indexName}/insert",
    contentType: "multipart",
  }),
) as unknown as Schema.Schema<InsertIndexRequest>;

export interface InsertIndexResponse {
  /** The unique identifier for the async mutation operation containing the changeset. */
  mutationId?: string;
}

export const InsertIndexResponse = Schema.Struct({
  mutationId: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<InsertIndexResponse>;

export const insertIndex: (
  input: InsertIndexRequest,
) => Effect.Effect<
  InsertIndexResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertIndexRequest,
  output: InsertIndexResponse,
  errors: [],
}));

export interface QueryIndexRequest {
  indexName: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: The search vector that will be used to find the nearest neighbors. */
  vector: number[];
  /** Body param: A metadata filter expression used to limit nearest neighbor results. */
  filter?: unknown;
  /** Body param: Whether to return no metadata, indexed metadata or all metadata associated with the closest vectors. */
  returnMetadata?: "none" | "indexed" | "all";
  /** Body param: Whether to return the values associated with the closest vectors. */
  returnValues?: boolean;
  /** Body param: The number of nearest neighbors to find. */
  topK?: number;
}

export const QueryIndexRequest = Schema.Struct({
  indexName: Schema.String.pipe(T.HttpPath("indexName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  vector: Schema.Array(Schema.Number),
  filter: Schema.optional(Schema.Unknown),
  returnMetadata: Schema.optional(Schema.Literal("none", "indexed", "all")),
  returnValues: Schema.optional(Schema.Boolean),
  topK: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/vectorize/v2/indexes/{indexName}/query",
  }),
) as unknown as Schema.Schema<QueryIndexRequest>;

export interface QueryIndexResponse {
  /** Specifies the count of vectors returned by the search */
  count?: number;
  /** Array of vectors matched by the search */
  matches?: {
    id?: string;
    metadata?: null;
    namespace?: string | null;
    score?: number;
    values?: number[] | null;
  }[];
}

export const QueryIndexResponse = Schema.Struct({
  count: Schema.optional(Schema.Number),
  matches: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        metadata: Schema.optional(Schema.Null),
        namespace: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
        score: Schema.optional(Schema.Number),
        values: Schema.optional(
          Schema.Union(Schema.Array(Schema.Number), Schema.Null),
        ),
      }),
    ),
  ),
}) as unknown as Schema.Schema<QueryIndexResponse>;

export const queryIndex: (
  input: QueryIndexRequest,
) => Effect.Effect<
  QueryIndexResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: QueryIndexRequest,
  output: QueryIndexResponse,
  errors: [],
}));

export interface UpsertIndexRequest {
  indexName: string;
  /** Path param: Identifier */
  accountId: string;
  /** Query param: Behavior for ndjson parse failures. */
  unparsableBehavior?: "error" | "discard";
  /** Body param: ndjson file containing vectors to upsert. */
  body: File | Blob;
}

export const UpsertIndexRequest = Schema.Struct({
  indexName: Schema.String.pipe(T.HttpPath("indexName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  unparsableBehavior: Schema.optional(Schema.Literal("error", "discard")).pipe(
    T.HttpQuery("'unparsable-behavior'"),
  ),
  body: UploadableSchema.pipe(T.HttpFormDataFile()).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/vectorize/v2/indexes/{indexName}/upsert",
    contentType: "multipart",
  }),
) as unknown as Schema.Schema<UpsertIndexRequest>;

export interface UpsertIndexResponse {
  /** The unique identifier for the async mutation operation containing the changeset. */
  mutationId?: string;
}

export const UpsertIndexResponse = Schema.Struct({
  mutationId: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<UpsertIndexResponse>;

export const upsertIndex: (
  input: UpsertIndexRequest,
) => Effect.Effect<
  UpsertIndexResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpsertIndexRequest,
  output: UpsertIndexResponse,
  errors: [],
}));

// =============================================================================
// IndexMetadataIndex
// =============================================================================

export interface ListIndexMetadataIndexesRequest {
  indexName: string;
  /** Identifier */
  accountId: string;
}

export const ListIndexMetadataIndexesRequest = Schema.Struct({
  indexName: Schema.String.pipe(T.HttpPath("indexName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/vectorize/v2/indexes/{indexName}/metadata_index/list",
  }),
) as unknown as Schema.Schema<ListIndexMetadataIndexesRequest>;

export interface ListIndexMetadataIndexesResponse {
  /** Array of indexed metadata properties. */
  metadataIndexes?: {
    indexType?: "string" | "number" | "boolean";
    propertyName?: string;
  }[];
}

export const ListIndexMetadataIndexesResponse = Schema.Struct({
  metadataIndexes: Schema.optional(
    Schema.Array(
      Schema.Struct({
        indexType: Schema.optional(
          Schema.Literal("string", "number", "boolean"),
        ),
        propertyName: Schema.optional(Schema.String),
      }),
    ),
  ),
}) as unknown as Schema.Schema<ListIndexMetadataIndexesResponse>;

export const listIndexMetadataIndexes: (
  input: ListIndexMetadataIndexesRequest,
) => Effect.Effect<
  ListIndexMetadataIndexesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListIndexMetadataIndexesRequest,
  output: ListIndexMetadataIndexesResponse,
  errors: [],
}));

export interface CreateIndexMetadataIndexRequest {
  indexName: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: Specifies the type of metadata property to index. */
  indexType: "string" | "number" | "boolean";
  /** Body param: Specifies the metadata property to index. */
  propertyName: string;
}

export const CreateIndexMetadataIndexRequest = Schema.Struct({
  indexName: Schema.String.pipe(T.HttpPath("indexName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  indexType: Schema.Literal("string", "number", "boolean"),
  propertyName: Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/vectorize/v2/indexes/{indexName}/metadata_index/create",
  }),
) as unknown as Schema.Schema<CreateIndexMetadataIndexRequest>;

export interface CreateIndexMetadataIndexResponse {
  /** The unique identifier for the async mutation operation containing the changeset. */
  mutationId?: string;
}

export const CreateIndexMetadataIndexResponse = Schema.Struct({
  mutationId: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<CreateIndexMetadataIndexResponse>;

export const createIndexMetadataIndex: (
  input: CreateIndexMetadataIndexRequest,
) => Effect.Effect<
  CreateIndexMetadataIndexResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateIndexMetadataIndexRequest,
  output: CreateIndexMetadataIndexResponse,
  errors: [],
}));

export interface DeleteIndexMetadataIndexRequest {
  indexName: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: Specifies the metadata property for which the index must be deleted. */
  propertyName: string;
}

export const DeleteIndexMetadataIndexRequest = Schema.Struct({
  indexName: Schema.String.pipe(T.HttpPath("indexName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  propertyName: Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/vectorize/v2/indexes/{indexName}/metadata_index/delete",
  }),
) as unknown as Schema.Schema<DeleteIndexMetadataIndexRequest>;

export interface DeleteIndexMetadataIndexResponse {
  /** The unique identifier for the async mutation operation containing the changeset. */
  mutationId?: string;
}

export const DeleteIndexMetadataIndexResponse = Schema.Struct({
  mutationId: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<DeleteIndexMetadataIndexResponse>;

export const deleteIndexMetadataIndex: (
  input: DeleteIndexMetadataIndexRequest,
) => Effect.Effect<
  DeleteIndexMetadataIndexResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteIndexMetadataIndexRequest,
  output: DeleteIndexMetadataIndexResponse,
  errors: [],
}));

// =============================================================================
// VectorsIndex
// =============================================================================

export interface ListVectorsIndexRequest {
  indexName: string;
  /** Path param: Identifier */
  accountId: string;
  /** Query param: Maximum number of vectors to return */
  count?: number;
  /** Query param: Cursor for pagination to get the next page of results */
  cursor?: string;
}

export const ListVectorsIndexRequest = Schema.Struct({
  indexName: Schema.String.pipe(T.HttpPath("indexName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  count: Schema.optional(Schema.Number).pipe(T.HttpQuery("count")),
  cursor: Schema.optional(Schema.String).pipe(T.HttpQuery("cursor")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/vectorize/v2/indexes/{indexName}/list",
  }),
) as unknown as Schema.Schema<ListVectorsIndexRequest>;

export interface ListVectorsIndexResponse {
  /** Number of vectors returned in this response */
  count: number;
  /** Whether there are more vectors available beyond this response */
  isTruncated: boolean;
  /** Total number of vectors in the index */
  totalCount: number;
  /** Array of vector items */
  vectors: { id: string }[];
  /** When the cursor expires as an ISO8601 string */
  cursorExpirationTimestamp?: string | null;
  /** Cursor for the next page of results */
  nextCursor?: string | null;
}

export const ListVectorsIndexResponse = Schema.Struct({
  count: Schema.Number,
  isTruncated: Schema.Boolean,
  totalCount: Schema.Number,
  vectors: Schema.Array(
    Schema.Struct({
      id: Schema.String,
    }),
  ),
  cursorExpirationTimestamp: Schema.optional(
    Schema.Union(Schema.String, Schema.Null),
  ),
  nextCursor: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
}) as unknown as Schema.Schema<ListVectorsIndexResponse>;

export const listVectorsIndex: (
  input: ListVectorsIndexRequest,
) => Effect.Effect<
  ListVectorsIndexResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListVectorsIndexRequest,
  output: ListVectorsIndexResponse,
  errors: [],
}));
