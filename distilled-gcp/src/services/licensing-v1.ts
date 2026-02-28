// ==========================================================================
// Enterprise License Manager API (licensing v1)
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
  name: "licensing",
  version: "v1",
  rootUrl: "https://licensing.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface LicenseAssignment {
  /** Identifies the resource as a LicenseAssignment, which is `licensing#licenseAssignment`. */
  kind?: string;
  /** ETag of the resource. */
  etags?: string;
  /** A product's unique identifier. For more information about products in this version of the API, see Product and SKU IDs. */
  productId?: string;
  /** The user's current primary email address. If the user's email address changes, use the new email address in your API requests. Since a `userId` is subject to change, do not use a `userId` value as a key for persistent data. This key could break if the current user's email address changes. If the `userId` is suspended, the license status changes. */
  userId?: string;
  /** Link to this page. */
  selfLink?: string;
  /** A product SKU's unique identifier. For more information about available SKUs in this version of the API, see Products and SKUs. */
  skuId?: string;
  /** Display Name of the sku of the product. */
  skuName?: string;
  /** Display Name of the product. */
  productName?: string;
}

export const LicenseAssignment: Schema.Schema<LicenseAssignment> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etags: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  skuId: Schema.optional(Schema.String),
  skuName: Schema.optional(Schema.String),
  productName: Schema.optional(Schema.String),
})).annotate({ identifier: "LicenseAssignment" }) as any as Schema.Schema<LicenseAssignment>;

export interface LicenseAssignmentInsert {
  /** Email id of the user */
  userId?: string;
}

export const LicenseAssignmentInsert: Schema.Schema<LicenseAssignmentInsert> = Schema.suspend(() => Schema.Struct({
  userId: Schema.optional(Schema.String),
})).annotate({ identifier: "LicenseAssignmentInsert" }) as any as Schema.Schema<LicenseAssignmentInsert>;

export interface LicenseAssignmentList {
  /** Identifies the resource as a collection of LicenseAssignments. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** The LicenseAssignments in this page of results. */
  items?: Array<LicenseAssignment>;
  /** The token that you must submit in a subsequent request to retrieve additional license results matching your query parameters. The `maxResults` query string is related to the `nextPageToken` since `maxResults` determines how many entries are returned on each next page. */
  nextPageToken?: string;
}

export const LicenseAssignmentList: Schema.Schema<LicenseAssignmentList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(LicenseAssignment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "LicenseAssignmentList" }) as any as Schema.Schema<LicenseAssignmentList>;

// ==========================================================================
// Operations
// ==========================================================================

/** Revoke a license. */
export interface DeleteLicenseAssignmentsRequest {
  /** A product's unique identifier. For more information about products in this version of the API, see Products and SKUs. */
  productId: string;
  /** A product SKU's unique identifier. For more information about available SKUs in this version of the API, see Products and SKUs. */
  skuId: string;
  /** The user's current primary email address. If the user's email address changes, use the new email address in your API requests. Since a `userId` is subject to change, do not use a `userId` value as a key for persistent data. This key could break if the current user's email address changes. If the `userId` is suspended, the license status changes. */
  userId: string;
}

export const DeleteLicenseAssignmentsRequest = Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  skuId: Schema.String.pipe(T.HttpPath("skuId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "DELETE", path: "apps/licensing/v1/product/{productId}/sku/{skuId}/user/{userId}" }),
  svc,
) as unknown as Schema.Schema<DeleteLicenseAssignmentsRequest>;

export type DeleteLicenseAssignmentsResponse = Empty;
export const DeleteLicenseAssignmentsResponse = Empty;

export type DeleteLicenseAssignmentsError = CommonErrors;

export const deleteLicenseAssignments: API.OperationMethod<DeleteLicenseAssignmentsRequest, DeleteLicenseAssignmentsResponse, DeleteLicenseAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteLicenseAssignmentsRequest,
  output: DeleteLicenseAssignmentsResponse,
  errors: [],
}));

/** Get a specific user's license by product SKU. */
export interface GetLicenseAssignmentsRequest {
  /** A product's unique identifier. For more information about products in this version of the API, see Products and SKUs. */
  productId: string;
  /** A product SKU's unique identifier. For more information about available SKUs in this version of the API, see Products and SKUs. */
  skuId: string;
  /** The user's current primary email address. If the user's email address changes, use the new email address in your API requests. Since a `userId` is subject to change, do not use a `userId` value as a key for persistent data. This key could break if the current user's email address changes. If the `userId` is suspended, the license status changes. */
  userId: string;
}

export const GetLicenseAssignmentsRequest = Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  skuId: Schema.String.pipe(T.HttpPath("skuId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "GET", path: "apps/licensing/v1/product/{productId}/sku/{skuId}/user/{userId}" }),
  svc,
) as unknown as Schema.Schema<GetLicenseAssignmentsRequest>;

export type GetLicenseAssignmentsResponse = LicenseAssignment;
export const GetLicenseAssignmentsResponse = LicenseAssignment;

export type GetLicenseAssignmentsError = CommonErrors;

export const getLicenseAssignments: API.OperationMethod<GetLicenseAssignmentsRequest, GetLicenseAssignmentsResponse, GetLicenseAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLicenseAssignmentsRequest,
  output: GetLicenseAssignmentsResponse,
  errors: [],
}));

/** Assign a license. */
export interface InsertLicenseAssignmentsRequest {
  /** A product's unique identifier. For more information about products in this version of the API, see Products and SKUs. */
  productId: string;
  /** A product SKU's unique identifier. For more information about available SKUs in this version of the API, see Products and SKUs. */
  skuId: string;
  /** Request body */
  body?: LicenseAssignmentInsert;
}

export const InsertLicenseAssignmentsRequest = Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  skuId: Schema.String.pipe(T.HttpPath("skuId")),
  body: Schema.optional(LicenseAssignmentInsert).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "apps/licensing/v1/product/{productId}/sku/{skuId}/user", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertLicenseAssignmentsRequest>;

export type InsertLicenseAssignmentsResponse = LicenseAssignment;
export const InsertLicenseAssignmentsResponse = LicenseAssignment;

export type InsertLicenseAssignmentsError = CommonErrors;

export const insertLicenseAssignments: API.OperationMethod<InsertLicenseAssignmentsRequest, InsertLicenseAssignmentsResponse, InsertLicenseAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertLicenseAssignmentsRequest,
  output: InsertLicenseAssignmentsResponse,
  errors: [],
}));

/** List all users assigned licenses for a specific product SKU. */
export interface ListForProductLicenseAssignmentsRequest {
  /** A product's unique identifier. For more information about products in this version of the API, see Products and SKUs. */
  productId: string;
  /** The customer's unique ID as defined in the Admin console, such as `C00000000`. If the customer is suspended, the server returns an error. */
  customerId: string;
  /** The `maxResults` query string determines how many entries are returned on each page of a large response. This is an optional parameter. The value must be a positive number. */
  maxResults?: number;
  /** Token to fetch the next page of data. The `maxResults` query string is related to the `pageToken` since `maxResults` determines how many entries are returned on each page. This is an optional query string. If not specified, the server returns the first page. */
  pageToken?: string;
}

export const ListForProductLicenseAssignmentsRequest = Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  customerId: Schema.String.pipe(T.HttpQuery("customerId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "apps/licensing/v1/product/{productId}/users" }),
  svc,
) as unknown as Schema.Schema<ListForProductLicenseAssignmentsRequest>;

export type ListForProductLicenseAssignmentsResponse = LicenseAssignmentList;
export const ListForProductLicenseAssignmentsResponse = LicenseAssignmentList;

export type ListForProductLicenseAssignmentsError = CommonErrors;

export const listForProductLicenseAssignments = API.makePaginated(() => ({
  input: ListForProductLicenseAssignmentsRequest,
  output: ListForProductLicenseAssignmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** List all users assigned licenses for a specific product SKU. */
export interface ListForProductAndSkuLicenseAssignmentsRequest {
  /** A product's unique identifier. For more information about products in this version of the API, see Products and SKUs. */
  productId: string;
  /** A product SKU's unique identifier. For more information about available SKUs in this version of the API, see Products and SKUs. */
  skuId: string;
  /** The customer's unique ID as defined in the Admin console, such as `C00000000`. If the customer is suspended, the server returns an error. */
  customerId: string;
  /** The `maxResults` query string determines how many entries are returned on each page of a large response. This is an optional parameter. The value must be a positive number. */
  maxResults?: number;
  /** Token to fetch the next page of data. The `maxResults` query string is related to the `pageToken` since `maxResults` determines how many entries are returned on each page. This is an optional query string. If not specified, the server returns the first page. */
  pageToken?: string;
}

export const ListForProductAndSkuLicenseAssignmentsRequest = Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  skuId: Schema.String.pipe(T.HttpPath("skuId")),
  customerId: Schema.String.pipe(T.HttpQuery("customerId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "apps/licensing/v1/product/{productId}/sku/{skuId}/users" }),
  svc,
) as unknown as Schema.Schema<ListForProductAndSkuLicenseAssignmentsRequest>;

export type ListForProductAndSkuLicenseAssignmentsResponse = LicenseAssignmentList;
export const ListForProductAndSkuLicenseAssignmentsResponse = LicenseAssignmentList;

export type ListForProductAndSkuLicenseAssignmentsError = CommonErrors;

export const listForProductAndSkuLicenseAssignments = API.makePaginated(() => ({
  input: ListForProductAndSkuLicenseAssignmentsRequest,
  output: ListForProductAndSkuLicenseAssignmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Reassign a user's product SKU with a different SKU in the same product. */
export interface UpdateLicenseAssignmentsRequest {
  /** A product's unique identifier. For more information about products in this version of the API, see Products and SKUs. */
  productId: string;
  /** A product SKU's unique identifier. For more information about available SKUs in this version of the API, see Products and SKUs. */
  skuId: string;
  /** The user's current primary email address. If the user's email address changes, use the new email address in your API requests. Since a `userId` is subject to change, do not use a `userId` value as a key for persistent data. This key could break if the current user's email address changes. If the `userId` is suspended, the license status changes. */
  userId: string;
  /** Request body */
  body?: LicenseAssignment;
}

export const UpdateLicenseAssignmentsRequest = Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  skuId: Schema.String.pipe(T.HttpPath("skuId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  body: Schema.optional(LicenseAssignment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "apps/licensing/v1/product/{productId}/sku/{skuId}/user/{userId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateLicenseAssignmentsRequest>;

export type UpdateLicenseAssignmentsResponse = LicenseAssignment;
export const UpdateLicenseAssignmentsResponse = LicenseAssignment;

export type UpdateLicenseAssignmentsError = CommonErrors;

export const updateLicenseAssignments: API.OperationMethod<UpdateLicenseAssignmentsRequest, UpdateLicenseAssignmentsResponse, UpdateLicenseAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateLicenseAssignmentsRequest,
  output: UpdateLicenseAssignmentsResponse,
  errors: [],
}));

/** Reassign a user's product SKU with a different SKU in the same product. This method supports patch semantics. */
export interface PatchLicenseAssignmentsRequest {
  /** A product's unique identifier. For more information about products in this version of the API, see Products and SKUs. */
  productId: string;
  /** A product SKU's unique identifier. For more information about available SKUs in this version of the API, see Products and SKUs. */
  skuId: string;
  /** The user's current primary email address. If the user's email address changes, use the new email address in your API requests. Since a `userId` is subject to change, do not use a `userId` value as a key for persistent data. This key could break if the current user's email address changes. If the `userId` is suspended, the license status changes. */
  userId: string;
  /** Request body */
  body?: LicenseAssignment;
}

export const PatchLicenseAssignmentsRequest = Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  skuId: Schema.String.pipe(T.HttpPath("skuId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  body: Schema.optional(LicenseAssignment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "apps/licensing/v1/product/{productId}/sku/{skuId}/user/{userId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchLicenseAssignmentsRequest>;

export type PatchLicenseAssignmentsResponse = LicenseAssignment;
export const PatchLicenseAssignmentsResponse = LicenseAssignment;

export type PatchLicenseAssignmentsError = CommonErrors;

export const patchLicenseAssignments: API.OperationMethod<PatchLicenseAssignmentsRequest, PatchLicenseAssignmentsResponse, PatchLicenseAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchLicenseAssignmentsRequest,
  output: PatchLicenseAssignmentsResponse,
  errors: [],
}));

