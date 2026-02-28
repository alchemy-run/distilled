// ==========================================================================
// Knowledge Graph Search API (kgsearch v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "kgsearch",
  version: "v1",
  rootUrl: "https://kgsearch.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface SearchResponse {
  /** The local context applicable for the response. See more details at http://www.w3.org/TR/json-ld/#context-definitions. */
  "@context"?: unknown;
  /** The schema type of top-level JSON-LD object, e.g. ItemList. */
  "@type"?: unknown;
  /** The item list of search results. */
  itemListElement?: Array<unknown>;
}

export const SearchResponse: Schema.Schema<SearchResponse> = Schema.suspend(() => Schema.Struct({
  "@context": Schema.optional(Schema.Unknown),
  "@type": Schema.optional(Schema.Unknown),
  itemListElement: Schema.optional(Schema.Array(Schema.Unknown)),
})).annotate({ identifier: "SearchResponse" }) as any as Schema.Schema<SearchResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Searches Knowledge Graph for entities that match the constraints. A list of matched entities will be returned in response, which will be in JSON-LD format and compatible with http://schema.org */
export interface SearchEntitiesRequest {
  /** The literal query string for search. */
  query?: string;
  /** The list of entity id to be used for search instead of query string. To specify multiple ids in the HTTP request, repeat the parameter in the URL as in ...?ids=A&ids=B */
  ids?: string[];
  /** The list of language codes (defined in ISO 693) to run the query with, e.g. 'en'. */
  languages?: string[];
  /** Restricts returned entities with these types, e.g. Person (as defined in http://schema.org/Person). If multiple types are specified, returned entities will contain one or more of these types. */
  types?: string[];
  /** Enables indenting of json results. */
  indent?: boolean;
  /** Enables prefix match against names and aliases of entities */
  prefix?: boolean;
  /** Limits the number of entities to be returned. */
  limit?: number;
}

export const SearchEntitiesRequest = Schema.Struct({
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  languages: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("languages")),
  types: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("types")),
  indent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("indent")),
  prefix: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("prefix")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
}).pipe(
  T.Http({ method: "GET", path: "v1/entities:search" }),
  svc,
) as unknown as Schema.Schema<SearchEntitiesRequest>;

export type SearchEntitiesResponse = SearchResponse;
export const SearchEntitiesResponse = SearchResponse;

export type SearchEntitiesError = CommonErrors;

export const searchEntities: API.OperationMethod<SearchEntitiesRequest, SearchEntitiesResponse, SearchEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchEntitiesRequest,
  output: SearchEntitiesResponse,
  errors: [],
}));

