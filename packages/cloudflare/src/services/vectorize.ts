/**
 * Cloudflare VECTORIZE API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service vectorize
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import { type DefaultErrors } from "../errors";
import { UploadableSchema } from "../schemas";

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

export const GetByIdsIndexRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetByIdsIndexResponse>;

export type GetByIdsIndexError = DefaultErrors;

export const getByIdsIndex: API.OperationMethod<
  GetByIdsIndexRequest,
  GetByIdsIndexResponse,
  GetByIdsIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const DeleteByIdsIndexRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  mutationId?: string | null;
}

export const DeleteByIdsIndexResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    mutationId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<DeleteByIdsIndexResponse>;

export type DeleteByIdsIndexError = DefaultErrors;

export const deleteByIdsIndex: API.OperationMethod<
  DeleteByIdsIndexRequest,
  DeleteByIdsIndexResponse,
  DeleteByIdsIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetIndexRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  } | null;
  /** Specifies the timestamp the resource was created as an ISO8601 string. */
  createdOn?: string | null;
  /** Specifies the description of the index. */
  description?: string | null;
  /** Specifies the timestamp the resource was modified as an ISO8601 string. */
  modifiedOn?: string | null;
  name?: string | null;
}

export const GetIndexResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  config: Schema.optional(
    Schema.Union([
      Schema.Struct({
        dimensions: Schema.Number,
        metric: Schema.Literals(["cosine", "euclidean", "dot-product"]),
      }),
      Schema.Null,
    ]),
  ),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    config: "config",
    createdOn: "created_on",
    description: "description",
    modifiedOn: "modified_on",
    name: "name",
  }),
) as unknown as Schema.Schema<GetIndexResponse>;

export type GetIndexError = DefaultErrors;

export const getIndex: API.OperationMethod<
  GetIndexRequest,
  GetIndexResponse,
  GetIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIndexRequest,
  output: GetIndexResponse,
  errors: [],
}));

export interface ListIndexesRequest {
  /** Identifier */
  accountId: string;
}

export const ListIndexesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/vectorize/v2/indexes",
  }),
) as unknown as Schema.Schema<ListIndexesRequest>;

export type ListIndexesResponse = {
  config?: {
    dimensions: number;
    metric: "cosine" | "euclidean" | "dot-product";
  } | null;
  createdOn?: string | null;
  description?: string | null;
  modifiedOn?: string | null;
  name?: string | null;
}[];

export const ListIndexesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    config: Schema.optional(
      Schema.Union([
        Schema.Struct({
          dimensions: Schema.Number,
          metric: Schema.Literals(["cosine", "euclidean", "dot-product"]),
        }),
        Schema.Null,
      ]),
    ),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      config: "config",
      createdOn: "created_on",
      description: "description",
      modifiedOn: "modified_on",
      name: "name",
    }),
  ),
) as unknown as Schema.Schema<ListIndexesResponse>;

export type ListIndexesError = DefaultErrors;

export const listIndexes: API.OperationMethod<
  ListIndexesRequest,
  ListIndexesResponse,
  ListIndexesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListIndexesRequest,
  output: ListIndexesResponse,
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

export const CreateIndexRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  config: Schema.Union([
    Schema.Struct({
      dimensions: Schema.Number,
      metric: Schema.Literals(["cosine", "euclidean", "dot-product"]),
    }),
    Schema.Struct({
      preset: Schema.Literals([
        "@cf/baai/bge-small-en-v1.5",
        "@cf/baai/bge-base-en-v1.5",
        "@cf/baai/bge-large-en-v1.5",
        "openai/text-embedding-ada-002",
        "cohere/embed-multilingual-v2.0",
      ]),
    }),
  ]),
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
  } | null;
  /** Specifies the timestamp the resource was created as an ISO8601 string. */
  createdOn?: string | null;
  /** Specifies the description of the index. */
  description?: string | null;
  /** Specifies the timestamp the resource was modified as an ISO8601 string. */
  modifiedOn?: string | null;
  name?: string | null;
}

export const CreateIndexResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  config: Schema.optional(
    Schema.Union([
      Schema.Struct({
        dimensions: Schema.Number,
        metric: Schema.Literals(["cosine", "euclidean", "dot-product"]),
      }),
      Schema.Null,
    ]),
  ),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    config: "config",
    createdOn: "created_on",
    description: "description",
    modifiedOn: "modified_on",
    name: "name",
  }),
) as unknown as Schema.Schema<CreateIndexResponse>;

export type CreateIndexError = DefaultErrors;

export const createIndex: API.OperationMethod<
  CreateIndexRequest,
  CreateIndexResponse,
  CreateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateIndexRequest,
  output: CreateIndexResponse,
  errors: [],
}));

export interface DeleteIndexRequest {
  indexName: string;
  /** Identifier */
  accountId: string;
}

export const DeleteIndexRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  /*@__PURE__*/ /*#__PURE__*/ Schema.String as unknown as Schema.Schema<DeleteIndexResponse>;

export type DeleteIndexError = DefaultErrors;

export const deleteIndex: API.OperationMethod<
  DeleteIndexRequest,
  DeleteIndexResponse,
  DeleteIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteIndexRequest,
  output: DeleteIndexResponse,
  errors: [],
}));

export interface InfoIndexRequest {
  indexName: string;
  /** Identifier */
  accountId: string;
}

export const InfoIndexRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  dimensions?: number | null;
  /** Specifies the timestamp the last mutation batch was processed as an ISO8601 string. */
  processedUpToDatetime?: string | null;
  /** The unique identifier for the async mutation operation containing the changeset. */
  processedUpToMutation?: string | null;
  /** Specifies the number of vectors present in the index */
  vectorCount?: number | null;
}

export const InfoIndexResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  dimensions: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  processedUpToDatetime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  processedUpToMutation: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  vectorCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}) as unknown as Schema.Schema<InfoIndexResponse>;

export type InfoIndexError = DefaultErrors;

export const infoIndex: API.OperationMethod<
  InfoIndexRequest,
  InfoIndexResponse,
  InfoIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const InsertIndexRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  indexName: Schema.String.pipe(T.HttpPath("indexName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  unparsableBehavior: Schema.optional(
    Schema.Literals(["error", "discard"]),
  ).pipe(T.HttpQuery("unparsable-behavior")),
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
  mutationId?: string | null;
}

export const InsertIndexResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  mutationId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}) as unknown as Schema.Schema<InsertIndexResponse>;

export type InsertIndexError = DefaultErrors;

export const insertIndex: API.OperationMethod<
  InsertIndexRequest,
  InsertIndexResponse,
  InsertIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const QueryIndexRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  indexName: Schema.String.pipe(T.HttpPath("indexName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  vector: Schema.Array(Schema.Number),
  filter: Schema.optional(Schema.Unknown),
  returnMetadata: Schema.optional(Schema.Literals(["none", "indexed", "all"])),
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
  count?: number | null;
  /** Array of vectors matched by the search */
  matches?:
    | {
        id?: string | null;
        metadata?: null;
        namespace?: string | null;
        score?: number | null;
        values?: number[] | null;
      }[]
    | null;
}

export const QueryIndexResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  matches: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          metadata: Schema.optional(Schema.Null),
          namespace: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          score: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          values: Schema.optional(
            Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
          ),
        }),
      ),
      Schema.Null,
    ]),
  ),
}) as unknown as Schema.Schema<QueryIndexResponse>;

export type QueryIndexError = DefaultErrors;

export const queryIndex: API.OperationMethod<
  QueryIndexRequest,
  QueryIndexResponse,
  QueryIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const UpsertIndexRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  indexName: Schema.String.pipe(T.HttpPath("indexName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  unparsableBehavior: Schema.optional(
    Schema.Literals(["error", "discard"]),
  ).pipe(T.HttpQuery("unparsable-behavior")),
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
  mutationId?: string | null;
}

export const UpsertIndexResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  mutationId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}) as unknown as Schema.Schema<UpsertIndexResponse>;

export type UpsertIndexError = DefaultErrors;

export const upsertIndex: API.OperationMethod<
  UpsertIndexRequest,
  UpsertIndexResponse,
  UpsertIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListIndexMetadataIndexesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  metadataIndexes?:
    | {
        indexType?: "string" | "number" | "boolean" | null;
        propertyName?: string | null;
      }[]
    | null;
}

export const ListIndexMetadataIndexesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    metadataIndexes: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            indexType: Schema.optional(
              Schema.Union([
                Schema.Literals(["string", "number", "boolean"]),
                Schema.Null,
              ]),
            ),
            propertyName: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }),
        ),
        Schema.Null,
      ]),
    ),
  }) as unknown as Schema.Schema<ListIndexMetadataIndexesResponse>;

export type ListIndexMetadataIndexesError = DefaultErrors;

export const listIndexMetadataIndexes: API.OperationMethod<
  ListIndexMetadataIndexesRequest,
  ListIndexMetadataIndexesResponse,
  ListIndexMetadataIndexesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreateIndexMetadataIndexRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    indexName: Schema.String.pipe(T.HttpPath("indexName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    indexType: Schema.Literals(["string", "number", "boolean"]),
    propertyName: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/vectorize/v2/indexes/{indexName}/metadata_index/create",
    }),
  ) as unknown as Schema.Schema<CreateIndexMetadataIndexRequest>;

export interface CreateIndexMetadataIndexResponse {
  /** The unique identifier for the async mutation operation containing the changeset. */
  mutationId?: string | null;
}

export const CreateIndexMetadataIndexResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    mutationId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<CreateIndexMetadataIndexResponse>;

export type CreateIndexMetadataIndexError = DefaultErrors;

export const createIndexMetadataIndex: API.OperationMethod<
  CreateIndexMetadataIndexRequest,
  CreateIndexMetadataIndexResponse,
  CreateIndexMetadataIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const DeleteIndexMetadataIndexRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  mutationId?: string | null;
}

export const DeleteIndexMetadataIndexResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    mutationId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<DeleteIndexMetadataIndexResponse>;

export type DeleteIndexMetadataIndexError = DefaultErrors;

export const deleteIndexMetadataIndex: API.OperationMethod<
  DeleteIndexMetadataIndexRequest,
  DeleteIndexMetadataIndexResponse,
  DeleteIndexMetadataIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListVectorsIndexRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const ListVectorsIndexResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    count: Schema.Number,
    isTruncated: Schema.Boolean,
    totalCount: Schema.Number,
    vectors: Schema.Array(
      Schema.Struct({
        id: Schema.String,
      }),
    ),
    cursorExpirationTimestamp: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    nextCursor: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<ListVectorsIndexResponse>;

export type ListVectorsIndexError = DefaultErrors;

export const listVectorsIndex: API.OperationMethod<
  ListVectorsIndexRequest,
  ListVectorsIndexResponse,
  ListVectorsIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListVectorsIndexRequest,
  output: ListVectorsIndexResponse,
  errors: [],
}));
