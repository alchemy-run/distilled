// ==========================================================================
// Reader Revenue Subscription Linking API (readerrevenuesubscriptionlinking v1)
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
  name: "readerrevenuesubscriptionlinking",
  version: "v1",
  rootUrl: "https://readerrevenuesubscriptionlinking.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Reader {
  /** Output only. The resource name of the reader. The last part of ppid in the resource name is the publisher provided id. */
  name?: string;
  /** Output only. Time the publication reader was created and associated with a Google user. */
  createTime?: string;
  /** Output only. The SwG publication id that the reader has linked their subscription to. */
  publicationId?: string;
  /** Output only. The publisher provided id of the reader. */
  ppid?: string;
  /** Output only. The SwG publication id that the reader's subscription linking was originating from. */
  originatingPublicationId?: string;
}

export const Reader: Schema.Schema<Reader> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  publicationId: Schema.optional(Schema.String),
  ppid: Schema.optional(Schema.String),
  originatingPublicationId: Schema.optional(Schema.String),
})).annotate({ identifier: "Reader" }) as any as Schema.Schema<Reader>;

export interface DeleteReaderResponse {
}

export const DeleteReaderResponse: Schema.Schema<DeleteReaderResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteReaderResponse" }) as any as Schema.Schema<DeleteReaderResponse>;

export interface Entitlement {
  /** Required. The publication's product ID that the user has access to. This is the same product ID as can be found in Schema.org markup (http://schema.org/productID). E.g. "dailybugle.com:basic" */
  productId?: string;
  /** A source-specific subscription token. This is an opaque string that the publisher provides to Google. This token is opaque and has no meaning to Google. */
  subscriptionToken?: string;
  /** The detail field can carry a description of the SKU that corresponds to what the user has been granted access to. This description, which is opaque to Google, can be displayed in the Google user subscription console for users who linked the subscription to a Google Account. Max 80 character limit. */
  detail?: string;
  /** Required. Expiration time of the entitlement. Entitlements that have expired over 30 days will be purged. The max expire_time is 398 days from now(). */
  expireTime?: string;
}

export const Entitlement: Schema.Schema<Entitlement> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  subscriptionToken: Schema.optional(Schema.String),
  detail: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Entitlement" }) as any as Schema.Schema<Entitlement>;

export interface ReaderEntitlements {
  /** Output only. The resource name of the singleton. */
  name?: string;
  /** All of the entitlements for a publication reader. */
  entitlements?: Array<Entitlement>;
}

export const ReaderEntitlements: Schema.Schema<ReaderEntitlements> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  entitlements: Schema.optional(Schema.Array(Entitlement)),
})).annotate({ identifier: "ReaderEntitlements" }) as any as Schema.Schema<ReaderEntitlements>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets a reader of a publication. Returns NOT_FOUND if the reader does not exist. */
export interface GetPublicationsReadersRequest {
  /** Required. The resource name of the reader. Format: publications/{publication_id}/readers/{ppid} */
  name: string;
}

export const GetPublicationsReadersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/publications/{publicationsId}/readers/{readersId}" }),
  svc,
) as unknown as Schema.Schema<GetPublicationsReadersRequest>;

export type GetPublicationsReadersResponse = Reader;
export const GetPublicationsReadersResponse = Reader;

export type GetPublicationsReadersError = CommonErrors;

export const getPublicationsReaders: API.OperationMethod<GetPublicationsReadersRequest, GetPublicationsReadersResponse, GetPublicationsReadersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPublicationsReadersRequest,
  output: GetPublicationsReadersResponse,
  errors: [],
}));

/** Removes a publication reader, effectively severing the association with a Google user. If `force` is set to true, any entitlements for this reader will also be deleted. (Otherwise, the request will only work if the reader has no entitlements.) - If the reader does not exist, return NOT_FOUND. - Return FAILED_PRECONDITION if the force field is false (or unset) and entitlements are present. */
export interface DeletePublicationsReadersRequest {
  /** Required. The resource name of the reader. Format: publications/{publication_id}/readers/{ppid} */
  name: string;
  /** If set to true, any entitlements under the reader will also be purged. */
  force?: boolean;
}

export const DeletePublicationsReadersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/publications/{publicationsId}/readers/{readersId}" }),
  svc,
) as unknown as Schema.Schema<DeletePublicationsReadersRequest>;

export type DeletePublicationsReadersResponse = DeleteReaderResponse;
export const DeletePublicationsReadersResponse = DeleteReaderResponse;

export type DeletePublicationsReadersError = CommonErrors;

export const deletePublicationsReaders: API.OperationMethod<DeletePublicationsReadersRequest, DeletePublicationsReadersResponse, DeletePublicationsReadersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePublicationsReadersRequest,
  output: DeletePublicationsReadersResponse,
  errors: [],
}));

/** Gets the reader entitlements for a publication reader. - Returns PERMISSION_DENIED if the caller does not have access. - Returns NOT_FOUND if the reader does not exist. */
export interface GetEntitlementsPublicationsReadersRequest {
  /** Required. The name of the reader entitlements to retrieve. Format: publications/{publication_id}/readers/{reader_id}/entitlements */
  name: string;
}

export const GetEntitlementsPublicationsReadersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/publications/{publicationsId}/readers/{readersId}/entitlements" }),
  svc,
) as unknown as Schema.Schema<GetEntitlementsPublicationsReadersRequest>;

export type GetEntitlementsPublicationsReadersResponse = ReaderEntitlements;
export const GetEntitlementsPublicationsReadersResponse = ReaderEntitlements;

export type GetEntitlementsPublicationsReadersError = CommonErrors;

export const getEntitlementsPublicationsReaders: API.OperationMethod<GetEntitlementsPublicationsReadersRequest, GetEntitlementsPublicationsReadersResponse, GetEntitlementsPublicationsReadersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEntitlementsPublicationsReadersRequest,
  output: GetEntitlementsPublicationsReadersResponse,
  errors: [],
}));

/** Updates the reader entitlements for a publication reader. The entire reader entitlements will be overwritten by the new reader entitlements in the payload, like a PUT. - Returns PERMISSION_DENIED if the caller does not have access. - Returns NOT_FOUND if the reader does not exist. */
export interface UpdateEntitlementsPublicationsReadersRequest {
  /** Output only. The resource name of the singleton. */
  name: string;
  /** Optional. The list of fields to update. Defaults to all fields. */
  updateMask?: string;
  /** Request body */
  body?: ReaderEntitlements;
}

export const UpdateEntitlementsPublicationsReadersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ReaderEntitlements).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/publications/{publicationsId}/readers/{readersId}/entitlements", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateEntitlementsPublicationsReadersRequest>;

export type UpdateEntitlementsPublicationsReadersResponse = ReaderEntitlements;
export const UpdateEntitlementsPublicationsReadersResponse = ReaderEntitlements;

export type UpdateEntitlementsPublicationsReadersError = CommonErrors;

export const updateEntitlementsPublicationsReaders: API.OperationMethod<UpdateEntitlementsPublicationsReadersRequest, UpdateEntitlementsPublicationsReadersResponse, UpdateEntitlementsPublicationsReadersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateEntitlementsPublicationsReadersRequest,
  output: UpdateEntitlementsPublicationsReadersResponse,
  errors: [],
}));

