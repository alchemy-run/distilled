// ==========================================================================
// Developer Knowledge API (developerknowledge v1alpha)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "developerknowledge",
  version: "v1alpha",
  rootUrl: "https://developerknowledge.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Document {
  /** Output only. The URI of the content, such as `docs.cloud.google.com/storage/docs/creating-buckets`. */
  uri?: string;
  /** Output only. The full content of the document in Markdown format. */
  content?: string;
  /** Output only. A description of the document. */
  description?: string;
  /** Identifier. The resource name of the document. Format: `documents/{uri_without_scheme}` Example: `documents/docs.cloud.google.com/storage/docs/creating-buckets` */
  name?: string;
}

export const Document: Schema.Schema<Document> = Schema.suspend(() =>
  Schema.Struct({
    uri: Schema.optional(Schema.String),
    content: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Document" }) as any as Schema.Schema<Document>;

export interface DocumentChunk {
  /** Output only. The resource name of the document this chunk is from. Format: `documents/{uri_without_scheme}` Example: `documents/docs.cloud.google.com/storage/docs/creating-buckets` */
  parent?: string;
  /** Output only. The content of the document chunk. */
  content?: string;
  /** Output only. The ID of this chunk within the document. The chunk ID is unique within a document, but not globally unique across documents. The chunk ID is not stable and may change over time. */
  id?: string;
}

export const DocumentChunk: Schema.Schema<DocumentChunk> = Schema.suspend(() =>
  Schema.Struct({
    parent: Schema.optional(Schema.String),
    content: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "DocumentChunk",
}) as any as Schema.Schema<DocumentChunk>;

export interface SearchDocumentChunksResponse {
  /** The search results for the given query. Each DocumentChunk in this list contains a snippet of content relevant to the search query. Use the DocumentChunk.parent field of each result with DeveloperKnowledge.GetDocument or DeveloperKnowledge.BatchGetDocuments to retrieve the full document content. */
  results?: Array<DocumentChunk>;
  /** Optional. A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const SearchDocumentChunksResponse: Schema.Schema<SearchDocumentChunksResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      results: Schema.optional(Schema.Array(DocumentChunk)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchDocumentChunksResponse",
  }) as any as Schema.Schema<SearchDocumentChunksResponse>;

export interface BatchGetDocumentsResponse {
  /** Documents requested. */
  documents?: Array<Document>;
}

export const BatchGetDocumentsResponse: Schema.Schema<BatchGetDocumentsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      documents: Schema.optional(Schema.Array(Document)),
    }),
  ).annotate({
    identifier: "BatchGetDocumentsResponse",
  }) as any as Schema.Schema<BatchGetDocumentsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface BatchGetDocumentsRequest {
  /** Required. The names of the documents to retrieve. A maximum of 20 documents can be retrieved in a batch. The documents are returned in the same order as the `names` in the request. Format: `documents/{uri_without_scheme}` Example: `documents/docs.cloud.google.com/storage/docs/creating-buckets` */
  names?: string[];
}

export const BatchGetDocumentsRequest = Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("names"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/documents:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetDocumentsRequest>;

export type BatchGetDocumentsResponse_Op = BatchGetDocumentsResponse;
export const BatchGetDocumentsResponse_Op = BatchGetDocumentsResponse;

export type BatchGetDocumentsError = DefaultErrors;

/** Retrieves multiple documents, each with its full Markdown content. */
export const batchGetDocuments: API.OperationMethod<
  BatchGetDocumentsRequest,
  BatchGetDocumentsResponse_Op,
  BatchGetDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchGetDocumentsRequest,
  output: BatchGetDocumentsResponse_Op,
  errors: [],
}));

export interface GetDocumentsRequest {
  /** Required. The name of the document to retrieve. Format: `documents/{uri_without_scheme}` Example: `documents/docs.cloud.google.com/storage/docs/creating-buckets` */
  name: string;
}

export const GetDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/documents/{documentsId}" }),
  svc,
) as unknown as Schema.Schema<GetDocumentsRequest>;

export type GetDocumentsResponse = Document;
export const GetDocumentsResponse = Document;

export type GetDocumentsError = DefaultErrors;

/** Retrieves a single document with its full Markdown content. */
export const getDocuments: API.OperationMethod<
  GetDocumentsRequest,
  GetDocumentsResponse,
  GetDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDocumentsRequest,
  output: GetDocumentsResponse,
  errors: [],
}));

export interface SearchDocumentChunksDocumentsRequest {
  /** Required. The raw query string provided by the user, such as "How to create a Cloud Storage bucket?". */
  query?: string;
  /** Optional. The maximum number of results to return. The service may return fewer than this value. If unspecified, at most 5 results will be returned. The maximum value is 20; values above 20 will result in an INVALID_ARGUMENT error. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `SearchDocumentChunks` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
}

export const SearchDocumentChunksDocumentsRequest = Schema.Struct({
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/documents:searchDocumentChunks" }),
  svc,
) as unknown as Schema.Schema<SearchDocumentChunksDocumentsRequest>;

export type SearchDocumentChunksDocumentsResponse =
  SearchDocumentChunksResponse;
export const SearchDocumentChunksDocumentsResponse =
  SearchDocumentChunksResponse;

export type SearchDocumentChunksDocumentsError = DefaultErrors;

/** Searches for developer knowledge across Google's developer documentation. This method returns document chunks based on the user's query. There can be many chunks of the same Document. To retrieve full documents, use DeveloperKnowledge.GetDocument or DeveloperKnowledge.BatchGetDocuments with the DocumentChunk.parent returned in the SearchDocumentChunksResponse.results. */
export const searchDocumentChunksDocuments: API.PaginatedOperationMethod<
  SearchDocumentChunksDocumentsRequest,
  SearchDocumentChunksDocumentsResponse,
  SearchDocumentChunksDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: SearchDocumentChunksDocumentsRequest,
  output: SearchDocumentChunksDocumentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
