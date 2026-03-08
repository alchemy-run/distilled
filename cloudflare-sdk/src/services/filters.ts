/**
 * Cloudflare FILTERS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service filters
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import { API } from "../client";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import { type DefaultErrors } from "../errors";

// =============================================================================
// Filter
// =============================================================================

export interface GetFilterRequest {
  filterId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const GetFilterRequest = Schema.Struct({
  filterId: Schema.String.pipe(T.HttpPath("filterId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/filters/{filterId}" }),
) as unknown as Schema.Schema<GetFilterRequest>;

export interface GetFilterResponse {
  /** The unique identifier of the filter. */
  id?: string;
  /** An informative summary of the filter. */
  description?: string;
  /** The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/). */
  expression?: string;
  /** When true, indicates that the filter is currently paused. */
  paused?: boolean;
  /** A short reference tag. Allows you to select related filters. */
  ref?: string;
}

export const GetFilterResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
  ref: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<GetFilterResponse>;

export type GetFilterError = DefaultErrors;

export const getFilter: API.OperationMethod<
  GetFilterRequest,
  GetFilterResponse,
  GetFilterError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetFilterRequest,
  output: GetFilterResponse,
  errors: [],
}));

export interface ListFiltersRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Query param: The unique identifier of the filter. */
  id?: string;
  /** Query param: A case-insensitive string to find in the description. */
  description?: string;
  /** Query param: A case-insensitive string to find in the expression. */
  expression?: string;
  /** Query param: When true, indicates that the filter is currently paused. */
  paused?: boolean;
  /** Query param: The filter ref (a short reference tag) to search for. Must be an exact match. */
  ref?: string;
}

export const ListFiltersRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
  description: Schema.optional(Schema.String).pipe(T.HttpQuery("description")),
  expression: Schema.optional(Schema.String).pipe(T.HttpQuery("expression")),
  paused: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("paused")),
  ref: Schema.optional(Schema.String).pipe(T.HttpQuery("ref")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/filters" }),
) as unknown as Schema.Schema<ListFiltersRequest>;

export type ListFiltersResponse = {
  id?: string;
  description?: string;
  expression?: string;
  paused?: boolean;
  ref?: string;
}[];

export const ListFiltersResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    expression: Schema.optional(Schema.String),
    paused: Schema.optional(Schema.Boolean),
    ref: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<ListFiltersResponse>;

export type ListFiltersError = DefaultErrors;

export const listFilters: API.OperationMethod<
  ListFiltersRequest,
  ListFiltersResponse,
  ListFiltersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListFiltersRequest,
  output: ListFiltersResponse,
  errors: [],
}));

export interface CreateFilterRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: */
  body: {
    description?: string;
    expression?: string;
    paused?: boolean;
    ref?: string;
  }[];
}

export const CreateFilterRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Array(
    Schema.Struct({
      description: Schema.optional(Schema.String),
      expression: Schema.optional(Schema.String),
      paused: Schema.optional(Schema.Boolean),
      ref: Schema.optional(Schema.String),
    }),
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/filters" }),
) as unknown as Schema.Schema<CreateFilterRequest>;

export type CreateFilterResponse = {
  id?: string;
  description?: string;
  expression?: string;
  paused?: boolean;
  ref?: string;
}[];

export const CreateFilterResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    expression: Schema.optional(Schema.String),
    paused: Schema.optional(Schema.Boolean),
    ref: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<CreateFilterResponse>;

export type CreateFilterError = DefaultErrors;

export const createFilter: API.OperationMethod<
  CreateFilterRequest,
  CreateFilterResponse,
  CreateFilterError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateFilterRequest,
  output: CreateFilterResponse,
  errors: [],
}));

export interface UpdateFilterRequest {
  filterId: string;
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: An informative summary of the filter. */
  description?: string;
  /** Body param: The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/). */
  expression?: string;
  /** Body param: When true, indicates that the filter is currently paused. */
  paused?: boolean;
  /** Body param: A short reference tag. Allows you to select related filters. */
  ref?: string;
}

export const UpdateFilterRequest = Schema.Struct({
  filterId: Schema.String.pipe(T.HttpPath("filterId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  description: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
  ref: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "PUT", path: "/zones/{zone_id}/filters/{filterId}" }),
) as unknown as Schema.Schema<UpdateFilterRequest>;

export interface UpdateFilterResponse {
  /** The unique identifier of the filter. */
  id?: string;
  /** An informative summary of the filter. */
  description?: string;
  /** The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/). */
  expression?: string;
  /** When true, indicates that the filter is currently paused. */
  paused?: boolean;
  /** A short reference tag. Allows you to select related filters. */
  ref?: string;
}

export const UpdateFilterResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
  ref: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<UpdateFilterResponse>;

export type UpdateFilterError = DefaultErrors;

export const updateFilter: API.OperationMethod<
  UpdateFilterRequest,
  UpdateFilterResponse,
  UpdateFilterError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateFilterRequest,
  output: UpdateFilterResponse,
  errors: [],
}));

export interface DeleteFilterRequest {
  filterId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const DeleteFilterRequest = Schema.Struct({
  filterId: Schema.String.pipe(T.HttpPath("filterId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/filters/{filterId}" }),
) as unknown as Schema.Schema<DeleteFilterRequest>;

export interface DeleteFilterResponse {
  /** The unique identifier of the filter. */
  id: string;
}

export const DeleteFilterResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteFilterResponse>;

export type DeleteFilterError = DefaultErrors;

export const deleteFilter: API.OperationMethod<
  DeleteFilterRequest,
  DeleteFilterResponse,
  DeleteFilterError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteFilterRequest,
  output: DeleteFilterResponse,
  errors: [],
}));

export interface BulkDeleteFiltersRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Query param: */
  id: string[];
}

export const BulkDeleteFiltersRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  id: Schema.Array(Schema.String).pipe(T.HttpQuery("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/filters" }),
) as unknown as Schema.Schema<BulkDeleteFiltersRequest>;

export type BulkDeleteFiltersResponse = { id?: string }[];

export const BulkDeleteFiltersResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<BulkDeleteFiltersResponse>;

export type BulkDeleteFiltersError = DefaultErrors;

export const bulkDeleteFilters: API.OperationMethod<
  BulkDeleteFiltersRequest,
  BulkDeleteFiltersResponse,
  BulkDeleteFiltersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BulkDeleteFiltersRequest,
  output: BulkDeleteFiltersResponse,
  errors: [],
}));

// =============================================================================
// PutFilter
// =============================================================================

export interface BulkPutFiltersRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: */
  body: {
    description?: string;
    expression?: string;
    paused?: boolean;
    ref?: string;
  }[];
}

export const BulkPutFiltersRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Array(
    Schema.Struct({
      description: Schema.optional(Schema.String),
      expression: Schema.optional(Schema.String),
      paused: Schema.optional(Schema.Boolean),
      ref: Schema.optional(Schema.String),
    }),
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "/zones/{zone_id}/filters" }),
) as unknown as Schema.Schema<BulkPutFiltersRequest>;

export type BulkPutFiltersResponse = {
  id?: string;
  description?: string;
  expression?: string;
  paused?: boolean;
  ref?: string;
}[];

export const BulkPutFiltersResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    expression: Schema.optional(Schema.String),
    paused: Schema.optional(Schema.Boolean),
    ref: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<BulkPutFiltersResponse>;

export type BulkPutFiltersError = DefaultErrors;

export const bulkPutFilters: API.OperationMethod<
  BulkPutFiltersRequest,
  BulkPutFiltersResponse,
  BulkPutFiltersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BulkPutFiltersRequest,
  output: BulkPutFiltersResponse,
  errors: [],
}));
