/**
 * Cloudflare DURABLE-OBJECTS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service durable-objects
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
// Namespace
// =============================================================================

export interface ListNamespacesRequest {
  /** Path param: Identifier. */
  accountId: string;
}

export const ListNamespacesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/durable_objects/namespaces",
  }),
) as unknown as Schema.Schema<ListNamespacesRequest>;

export type ListNamespacesResponse = {
  id?: string;
  class?: string;
  name?: string;
  script?: string;
  useSqlite?: boolean;
}[];

export const ListNamespacesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    class: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    script: Schema.optional(Schema.String),
    useSqlite: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      class: "class",
      name: "name",
      script: "script",
      useSqlite: "use_sqlite",
    }),
  ),
) as unknown as Schema.Schema<ListNamespacesResponse>;

export const listNamespaces: API.OperationMethod<
  ListNamespacesRequest,
  ListNamespacesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListNamespacesRequest,
  output: ListNamespacesResponse,
  errors: [],
}));

// =============================================================================
// NamespaceObject
// =============================================================================

export interface ListNamespaceObjectsRequest {
  id: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: The number of objects to return. The cursor attribute may be used to iterate over the next batch of objects if there are more than the limit. */
  limit?: number;
}

export const ListNamespaceObjectsRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/durable_objects/namespaces/{id}/objects",
  }),
) as unknown as Schema.Schema<ListNamespaceObjectsRequest>;

export type ListNamespaceObjectsResponse = {
  id?: string;
  hasStoredData?: boolean;
}[];

export const ListNamespaceObjectsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    hasStoredData: Schema.optional(Schema.Boolean),
  }),
) as unknown as Schema.Schema<ListNamespaceObjectsResponse>;

export const listNamespaceObjects: API.OperationMethod<
  ListNamespaceObjectsRequest,
  ListNamespaceObjectsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListNamespaceObjectsRequest,
  output: ListNamespaceObjectsResponse,
  errors: [],
}));
