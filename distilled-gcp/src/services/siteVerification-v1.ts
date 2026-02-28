// ==========================================================================
// Google Site Verification API (siteVerification v1)
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
  name: "siteVerification",
  version: "v1",
  rootUrl: "https://www.googleapis.com/",
  servicePath: "siteVerification/v1/",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface SiteVerificationWebResourceGettokenRequest {
  /** The site for which a verification token will be generated. */
  site?: { identifier?: string; type?: string };
  /** The verification method that will be used to verify this site. For sites, 'FILE' or 'META' methods may be used. For domains, only 'DNS' may be used. */
  verificationMethod?: string;
}

export const SiteVerificationWebResourceGettokenRequest: Schema.Schema<SiteVerificationWebResourceGettokenRequest> = Schema.suspend(() => Schema.Struct({
  site: Schema.optional(Schema.Struct({ identifier: Schema.optional(Schema.String), type: Schema.optional(Schema.String) })),
  verificationMethod: Schema.optional(Schema.String),
})).annotate({ identifier: "SiteVerificationWebResourceGettokenRequest" }) as any as Schema.Schema<SiteVerificationWebResourceGettokenRequest>;

export interface SiteVerificationWebResourceGettokenResponse {
  /** The verification method to use in conjunction with this token. For FILE, the token should be placed in the top-level directory of the site, stored inside a file of the same name. For META, the token should be placed in the HEAD tag of the default page that is loaded for the site. For DNS, the token should be placed in a TXT record of the domain. */
  method?: string;
  /** The verification token. The token must be placed appropriately in order for verification to succeed. */
  token?: string;
}

export const SiteVerificationWebResourceGettokenResponse: Schema.Schema<SiteVerificationWebResourceGettokenResponse> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
})).annotate({ identifier: "SiteVerificationWebResourceGettokenResponse" }) as any as Schema.Schema<SiteVerificationWebResourceGettokenResponse>;

export interface SiteVerificationWebResourceResource {
  /** The string used to identify this site. This value should be used in the "id" portion of the REST URL for the Get, Update, and Delete operations. */
  id?: string;
  /** The email addresses of all verified owners. */
  owners?: Array<string>;
  /** The address and type of a site that is verified or will be verified. */
  site?: { identifier?: string; type?: string };
}

export const SiteVerificationWebResourceResource: Schema.Schema<SiteVerificationWebResourceResource> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  owners: Schema.optional(Schema.Array(Schema.String)),
  site: Schema.optional(Schema.Struct({ identifier: Schema.optional(Schema.String), type: Schema.optional(Schema.String) })),
})).annotate({ identifier: "SiteVerificationWebResourceResource" }) as any as Schema.Schema<SiteVerificationWebResourceResource>;

export interface SiteVerificationWebResourceListResponse {
  /** The list of sites that are owned by the authenticated user. */
  items?: Array<SiteVerificationWebResourceResource>;
}

export const SiteVerificationWebResourceListResponse: Schema.Schema<SiteVerificationWebResourceListResponse> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(SiteVerificationWebResourceResource)),
})).annotate({ identifier: "SiteVerificationWebResourceListResponse" }) as any as Schema.Schema<SiteVerificationWebResourceListResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Relinquish ownership of a website or domain. */
export interface DeleteWebResourceRequest {
  /** The id of a verified site or domain. */
  id: string;
}

export const DeleteWebResourceRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "webResource/{id}" }),
  svc,
) as unknown as Schema.Schema<DeleteWebResourceRequest>;

export interface DeleteWebResourceResponse {}
export const DeleteWebResourceResponse: Schema.Schema<DeleteWebResourceResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteWebResourceResponse>;

export type DeleteWebResourceError = CommonErrors;

export const deleteWebResource: API.OperationMethod<DeleteWebResourceRequest, DeleteWebResourceResponse, DeleteWebResourceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteWebResourceRequest,
  output: DeleteWebResourceResponse,
  errors: [],
}));

/** Get the most current data for a website or domain. */
export interface GetWebResourceRequest {
  /** The id of a verified site or domain. */
  id: string;
}

export const GetWebResourceRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "webResource/{id}" }),
  svc,
) as unknown as Schema.Schema<GetWebResourceRequest>;

export type GetWebResourceResponse = SiteVerificationWebResourceResource;
export const GetWebResourceResponse = SiteVerificationWebResourceResource;

export type GetWebResourceError = CommonErrors;

export const getWebResource: API.OperationMethod<GetWebResourceRequest, GetWebResourceResponse, GetWebResourceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetWebResourceRequest,
  output: GetWebResourceResponse,
  errors: [],
}));

/** Get a verification token for placing on a website or domain. */
export interface GetTokenWebResourceRequest {
  /** Request body */
  body?: SiteVerificationWebResourceGettokenRequest;
}

export const GetTokenWebResourceRequest = Schema.Struct({
  body: Schema.optional(SiteVerificationWebResourceGettokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "token", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetTokenWebResourceRequest>;

export type GetTokenWebResourceResponse = SiteVerificationWebResourceGettokenResponse;
export const GetTokenWebResourceResponse = SiteVerificationWebResourceGettokenResponse;

export type GetTokenWebResourceError = CommonErrors;

export const getTokenWebResource: API.OperationMethod<GetTokenWebResourceRequest, GetTokenWebResourceResponse, GetTokenWebResourceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTokenWebResourceRequest,
  output: GetTokenWebResourceResponse,
  errors: [],
}));

/** Attempt verification of a website or domain. */
export interface InsertWebResourceRequest {
  /** The method to use for verifying a site or domain. */
  verificationMethod: string;
  /** Request body */
  body?: SiteVerificationWebResourceResource;
}

export const InsertWebResourceRequest = Schema.Struct({
  verificationMethod: Schema.String.pipe(T.HttpQuery("verificationMethod")),
  body: Schema.optional(SiteVerificationWebResourceResource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "webResource", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertWebResourceRequest>;

export type InsertWebResourceResponse = SiteVerificationWebResourceResource;
export const InsertWebResourceResponse = SiteVerificationWebResourceResource;

export type InsertWebResourceError = CommonErrors;

export const insertWebResource: API.OperationMethod<InsertWebResourceRequest, InsertWebResourceResponse, InsertWebResourceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertWebResourceRequest,
  output: InsertWebResourceResponse,
  errors: [],
}));

/** Get the list of your verified websites and domains. */
export interface ListWebResourceRequest {
}

export const ListWebResourceRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "webResource" }),
  svc,
) as unknown as Schema.Schema<ListWebResourceRequest>;

export type ListWebResourceResponse = SiteVerificationWebResourceListResponse;
export const ListWebResourceResponse = SiteVerificationWebResourceListResponse;

export type ListWebResourceError = CommonErrors;

export const listWebResource: API.OperationMethod<ListWebResourceRequest, ListWebResourceResponse, ListWebResourceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListWebResourceRequest,
  output: ListWebResourceResponse,
  errors: [],
}));

/** Modify the list of owners for your website or domain. This method supports patch semantics. */
export interface PatchWebResourceRequest {
  /** The id of a verified site or domain. */
  id: string;
  /** Request body */
  body?: SiteVerificationWebResourceResource;
}

export const PatchWebResourceRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  body: Schema.optional(SiteVerificationWebResourceResource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "webResource/{id}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchWebResourceRequest>;

export type PatchWebResourceResponse = SiteVerificationWebResourceResource;
export const PatchWebResourceResponse = SiteVerificationWebResourceResource;

export type PatchWebResourceError = CommonErrors;

export const patchWebResource: API.OperationMethod<PatchWebResourceRequest, PatchWebResourceResponse, PatchWebResourceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchWebResourceRequest,
  output: PatchWebResourceResponse,
  errors: [],
}));

/** Modify the list of owners for your website or domain. */
export interface UpdateWebResourceRequest {
  /** The id of a verified site or domain. */
  id: string;
  /** Request body */
  body?: SiteVerificationWebResourceResource;
}

export const UpdateWebResourceRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  body: Schema.optional(SiteVerificationWebResourceResource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "webResource/{id}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateWebResourceRequest>;

export type UpdateWebResourceResponse = SiteVerificationWebResourceResource;
export const UpdateWebResourceResponse = SiteVerificationWebResourceResource;

export type UpdateWebResourceError = CommonErrors;

export const updateWebResource: API.OperationMethod<UpdateWebResourceRequest, UpdateWebResourceResponse, UpdateWebResourceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateWebResourceRequest,
  output: UpdateWebResourceResponse,
  errors: [],
}));

