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
// Errors
// =============================================================================

export class InvalidIdentifier extends Schema.TaggedErrorClass<InvalidIdentifier>()(
  "InvalidIdentifier",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidIdentifier, [{ code: 7003 }]);

export class MalformedParameter extends Schema.TaggedErrorClass<MalformedParameter>()(
  "MalformedParameter",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(MalformedParameter, [{ code: 10077 }]);

export class NamespaceNotFound extends Schema.TaggedErrorClass<NamespaceNotFound>()(
  "NamespaceNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(NamespaceNotFound, [{ code: 10066 }]);

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
  id?: string | null;
  class?: string | null;
  name?: string | null;
  script?: string | null;
  useSqlite?: boolean | null;
}[];

export const ListNamespacesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    class: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    script: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    useSqlite: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
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

export type ListNamespacesError = CommonErrors | InvalidIdentifier;

export const listNamespaces: API.OperationMethod<
  ListNamespacesRequest,
  ListNamespacesResponse,
  ListNamespacesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListNamespacesRequest,
  output: ListNamespacesResponse,
  errors: [InvalidIdentifier],
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
  id?: string | null;
  hasStoredData?: boolean | null;
}[];

export const ListNamespaceObjectsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    hasStoredData: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  }),
) as unknown as Schema.Schema<ListNamespaceObjectsResponse>;

export type ListNamespaceObjectsError =
  | CommonErrors
  | NamespaceNotFound
  | InvalidIdentifier
  | MalformedParameter;

export const listNamespaceObjects: API.OperationMethod<
  ListNamespaceObjectsRequest,
  ListNamespaceObjectsResponse,
  ListNamespaceObjectsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListNamespaceObjectsRequest,
  output: ListNamespaceObjectsResponse,
  errors: [NamespaceNotFound, InvalidIdentifier, MalformedParameter],
}));
