// ==========================================================================
// Essential Contacts API (essentialcontacts v1)
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
  name: "essentialcontacts",
  version: "v1",
  rootUrl: "https://essentialcontacts.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudEssentialcontactsV1Contact {
  /** Output only. The identifier for the contact. Format: {resource_type}/{resource_id}/contacts/{contact_id} */
  name?: string;
  /** Required. The email address to send notifications to. The email address does not need to be a Google Account. */
  email?: string;
  /** Required. The categories of notifications that the contact will receive communications for. */
  notificationCategorySubscriptions?: Array<"NOTIFICATION_CATEGORY_UNSPECIFIED" | "ALL" | "SUSPENSION" | "SECURITY" | "TECHNICAL" | "BILLING" | "LEGAL" | "PRODUCT_UPDATES" | "TECHNICAL_INCIDENTS" | (string & {})>;
  /** Required. The preferred language for notifications, as a ISO 639-1 language code. See [Supported languages](https://cloud.google.com/resource-manager/docs/managing-notification-contacts#supported-languages) for a list of supported languages. */
  languageTag?: string;
  /** Output only. The validity of the contact. A contact is considered valid if it is the correct recipient for notifications for a particular resource. */
  validationState?: "VALIDATION_STATE_UNSPECIFIED" | "VALID" | "INVALID" | (string & {});
  /** Output only. The last time the validation_state was updated, either manually or automatically. A contact is considered stale if its validation state was updated more than 1 year ago. */
  validateTime?: string;
}

export const GoogleCloudEssentialcontactsV1Contact: Schema.Schema<GoogleCloudEssentialcontactsV1Contact> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  notificationCategorySubscriptions: Schema.optional(Schema.Array(Schema.String)),
  languageTag: Schema.optional(Schema.String),
  validationState: Schema.optional(Schema.String),
  validateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudEssentialcontactsV1Contact" }) as any as Schema.Schema<GoogleCloudEssentialcontactsV1Contact>;

export interface GoogleCloudEssentialcontactsV1ListContactsResponse {
  /** The contacts for the specified resource. */
  contacts?: Array<GoogleCloudEssentialcontactsV1Contact>;
  /** If there are more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token` and the rest of the parameters the same as the original request. */
  nextPageToken?: string;
}

export const GoogleCloudEssentialcontactsV1ListContactsResponse: Schema.Schema<GoogleCloudEssentialcontactsV1ListContactsResponse> = Schema.suspend(() => Schema.Struct({
  contacts: Schema.optional(Schema.Array(GoogleCloudEssentialcontactsV1Contact)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudEssentialcontactsV1ListContactsResponse" }) as any as Schema.Schema<GoogleCloudEssentialcontactsV1ListContactsResponse>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleCloudEssentialcontactsV1ComputeContactsResponse {
  /** All contacts for the resource that are subscribed to the specified notification categories, including contacts inherited from any parent resources. */
  contacts?: Array<GoogleCloudEssentialcontactsV1Contact>;
  /** If there are more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token` and the rest of the parameters the same as the original request. */
  nextPageToken?: string;
}

export const GoogleCloudEssentialcontactsV1ComputeContactsResponse: Schema.Schema<GoogleCloudEssentialcontactsV1ComputeContactsResponse> = Schema.suspend(() => Schema.Struct({
  contacts: Schema.optional(Schema.Array(GoogleCloudEssentialcontactsV1Contact)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudEssentialcontactsV1ComputeContactsResponse" }) as any as Schema.Schema<GoogleCloudEssentialcontactsV1ComputeContactsResponse>;

export interface GoogleCloudEssentialcontactsV1SendTestMessageRequest {
  /** Required. The list of names of the contacts to send a test message to. Format: organizations/{organization_id}/contacts/{contact_id}, folders/{folder_id}/contacts/{contact_id} or projects/{project_id}/contacts/{contact_id} */
  contacts?: Array<string>;
  /** Required. The notification category to send the test message for. All contacts must be subscribed to this category. */
  notificationCategory?: "NOTIFICATION_CATEGORY_UNSPECIFIED" | "ALL" | "SUSPENSION" | "SECURITY" | "TECHNICAL" | "BILLING" | "LEGAL" | "PRODUCT_UPDATES" | "TECHNICAL_INCIDENTS" | (string & {});
}

export const GoogleCloudEssentialcontactsV1SendTestMessageRequest: Schema.Schema<GoogleCloudEssentialcontactsV1SendTestMessageRequest> = Schema.suspend(() => Schema.Struct({
  contacts: Schema.optional(Schema.Array(Schema.String)),
  notificationCategory: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudEssentialcontactsV1SendTestMessageRequest" }) as any as Schema.Schema<GoogleCloudEssentialcontactsV1SendTestMessageRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Adds a new contact for a resource. */
export interface CreateProjectsContactsRequest {
  /** Required. The resource to save this contact for. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudEssentialcontactsV1Contact;
}

export const CreateProjectsContactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudEssentialcontactsV1Contact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/contacts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsContactsRequest>;

export type CreateProjectsContactsResponse = GoogleCloudEssentialcontactsV1Contact;
export const CreateProjectsContactsResponse = GoogleCloudEssentialcontactsV1Contact;

export type CreateProjectsContactsError = CommonErrors;

export const createProjectsContacts: API.OperationMethod<CreateProjectsContactsRequest, CreateProjectsContactsResponse, CreateProjectsContactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsContactsRequest,
  output: CreateProjectsContactsResponse,
  errors: [],
}));

/** Updates a contact. Note: A contact's email address cannot be changed. */
export interface PatchProjectsContactsRequest {
  /** Output only. The identifier for the contact. Format: {resource_type}/{resource_id}/contacts/{contact_id} */
  name: string;
  /** Optional. The update mask applied to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudEssentialcontactsV1Contact;
}

export const PatchProjectsContactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudEssentialcontactsV1Contact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/contacts/{contactsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsContactsRequest>;

export type PatchProjectsContactsResponse = GoogleCloudEssentialcontactsV1Contact;
export const PatchProjectsContactsResponse = GoogleCloudEssentialcontactsV1Contact;

export type PatchProjectsContactsError = CommonErrors;

export const patchProjectsContacts: API.OperationMethod<PatchProjectsContactsRequest, PatchProjectsContactsResponse, PatchProjectsContactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsContactsRequest,
  output: PatchProjectsContactsResponse,
  errors: [],
}));

/** Lists the contacts that have been set on a resource. */
export interface ListProjectsContactsRequest {
  /** Required. The parent resource name. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id} */
  parent: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of `next_page_token` in the response indicates that more results might be available. If not specified, the default page_size is 100. */
  pageSize?: number;
  /** Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ListProjectsContactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/contacts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsContactsRequest>;

export type ListProjectsContactsResponse = GoogleCloudEssentialcontactsV1ListContactsResponse;
export const ListProjectsContactsResponse = GoogleCloudEssentialcontactsV1ListContactsResponse;

export type ListProjectsContactsError = CommonErrors;

export const listProjectsContacts = API.makePaginated(() => ({
  input: ListProjectsContactsRequest,
  output: ListProjectsContactsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a single contact. */
export interface GetProjectsContactsRequest {
  /** Required. The name of the contact to retrieve. Format: organizations/{organization_id}/contacts/{contact_id}, folders/{folder_id}/contacts/{contact_id} or projects/{project_id}/contacts/{contact_id} */
  name: string;
}

export const GetProjectsContactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/contacts/{contactsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsContactsRequest>;

export type GetProjectsContactsResponse = GoogleCloudEssentialcontactsV1Contact;
export const GetProjectsContactsResponse = GoogleCloudEssentialcontactsV1Contact;

export type GetProjectsContactsError = CommonErrors;

export const getProjectsContacts: API.OperationMethod<GetProjectsContactsRequest, GetProjectsContactsResponse, GetProjectsContactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsContactsRequest,
  output: GetProjectsContactsResponse,
  errors: [],
}));

/** Deletes a contact. */
export interface DeleteProjectsContactsRequest {
  /** Required. The name of the contact to delete. Format: organizations/{organization_id}/contacts/{contact_id}, folders/{folder_id}/contacts/{contact_id} or projects/{project_id}/contacts/{contact_id} */
  name: string;
}

export const DeleteProjectsContactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/contacts/{contactsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsContactsRequest>;

export type DeleteProjectsContactsResponse = GoogleProtobufEmpty;
export const DeleteProjectsContactsResponse = GoogleProtobufEmpty;

export type DeleteProjectsContactsError = CommonErrors;

export const deleteProjectsContacts: API.OperationMethod<DeleteProjectsContactsRequest, DeleteProjectsContactsResponse, DeleteProjectsContactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsContactsRequest,
  output: DeleteProjectsContactsResponse,
  errors: [],
}));

/** Lists all contacts for the resource that are subscribed to the specified notification categories, including contacts inherited from any parent resources. */
export interface ComputeProjectsContactsRequest {
  /** Required. The name of the resource to compute contacts for. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id} */
  parent: string;
  /** The categories of notifications to compute contacts for. If ALL is included in this list, contacts subscribed to any notification category will be returned. */
  notificationCategories?: "NOTIFICATION_CATEGORY_UNSPECIFIED" | "ALL" | "SUSPENSION" | "SECURITY" | "TECHNICAL" | "BILLING" | "LEGAL" | "PRODUCT_UPDATES" | "TECHNICAL_INCIDENTS" | (string & {})[];
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of `next_page_token` in the response indicates that more results might be available. If not specified, the default page_size is 100. */
  pageSize?: number;
  /** Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ComputeProjectsContactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  notificationCategories: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("notificationCategories")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/contacts:compute" }),
  svc,
) as unknown as Schema.Schema<ComputeProjectsContactsRequest>;

export type ComputeProjectsContactsResponse = GoogleCloudEssentialcontactsV1ComputeContactsResponse;
export const ComputeProjectsContactsResponse = GoogleCloudEssentialcontactsV1ComputeContactsResponse;

export type ComputeProjectsContactsError = CommonErrors;

export const computeProjectsContacts = API.makePaginated(() => ({
  input: ComputeProjectsContactsRequest,
  output: ComputeProjectsContactsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Allows a contact admin to send a test message to contact to verify that it has been configured correctly. */
export interface SendTestMessageProjectsContactsRequest {
  /** Required. The name of the resource to send the test message for. All contacts must either be set directly on this resource or inherited from another resource that is an ancestor of this one. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id} */
  resource: string;
  /** Request body */
  body?: GoogleCloudEssentialcontactsV1SendTestMessageRequest;
}

export const SendTestMessageProjectsContactsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleCloudEssentialcontactsV1SendTestMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/contacts:sendTestMessage", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendTestMessageProjectsContactsRequest>;

export type SendTestMessageProjectsContactsResponse = GoogleProtobufEmpty;
export const SendTestMessageProjectsContactsResponse = GoogleProtobufEmpty;

export type SendTestMessageProjectsContactsError = CommonErrors;

export const sendTestMessageProjectsContacts: API.OperationMethod<SendTestMessageProjectsContactsRequest, SendTestMessageProjectsContactsResponse, SendTestMessageProjectsContactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SendTestMessageProjectsContactsRequest,
  output: SendTestMessageProjectsContactsResponse,
  errors: [],
}));

/** Adds a new contact for a resource. */
export interface CreateFoldersContactsRequest {
  /** Required. The resource to save this contact for. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudEssentialcontactsV1Contact;
}

export const CreateFoldersContactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudEssentialcontactsV1Contact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/contacts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersContactsRequest>;

export type CreateFoldersContactsResponse = GoogleCloudEssentialcontactsV1Contact;
export const CreateFoldersContactsResponse = GoogleCloudEssentialcontactsV1Contact;

export type CreateFoldersContactsError = CommonErrors;

export const createFoldersContacts: API.OperationMethod<CreateFoldersContactsRequest, CreateFoldersContactsResponse, CreateFoldersContactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersContactsRequest,
  output: CreateFoldersContactsResponse,
  errors: [],
}));

/** Updates a contact. Note: A contact's email address cannot be changed. */
export interface PatchFoldersContactsRequest {
  /** Output only. The identifier for the contact. Format: {resource_type}/{resource_id}/contacts/{contact_id} */
  name: string;
  /** Optional. The update mask applied to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudEssentialcontactsV1Contact;
}

export const PatchFoldersContactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudEssentialcontactsV1Contact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/folders/{foldersId}/contacts/{contactsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersContactsRequest>;

export type PatchFoldersContactsResponse = GoogleCloudEssentialcontactsV1Contact;
export const PatchFoldersContactsResponse = GoogleCloudEssentialcontactsV1Contact;

export type PatchFoldersContactsError = CommonErrors;

export const patchFoldersContacts: API.OperationMethod<PatchFoldersContactsRequest, PatchFoldersContactsResponse, PatchFoldersContactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersContactsRequest,
  output: PatchFoldersContactsResponse,
  errors: [],
}));

/** Lists the contacts that have been set on a resource. */
export interface ListFoldersContactsRequest {
  /** Required. The parent resource name. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id} */
  parent: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of `next_page_token` in the response indicates that more results might be available. If not specified, the default page_size is 100. */
  pageSize?: number;
  /** Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ListFoldersContactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/contacts" }),
  svc,
) as unknown as Schema.Schema<ListFoldersContactsRequest>;

export type ListFoldersContactsResponse = GoogleCloudEssentialcontactsV1ListContactsResponse;
export const ListFoldersContactsResponse = GoogleCloudEssentialcontactsV1ListContactsResponse;

export type ListFoldersContactsError = CommonErrors;

export const listFoldersContacts = API.makePaginated(() => ({
  input: ListFoldersContactsRequest,
  output: ListFoldersContactsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a single contact. */
export interface GetFoldersContactsRequest {
  /** Required. The name of the contact to retrieve. Format: organizations/{organization_id}/contacts/{contact_id}, folders/{folder_id}/contacts/{contact_id} or projects/{project_id}/contacts/{contact_id} */
  name: string;
}

export const GetFoldersContactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/contacts/{contactsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersContactsRequest>;

export type GetFoldersContactsResponse = GoogleCloudEssentialcontactsV1Contact;
export const GetFoldersContactsResponse = GoogleCloudEssentialcontactsV1Contact;

export type GetFoldersContactsError = CommonErrors;

export const getFoldersContacts: API.OperationMethod<GetFoldersContactsRequest, GetFoldersContactsResponse, GetFoldersContactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersContactsRequest,
  output: GetFoldersContactsResponse,
  errors: [],
}));

/** Deletes a contact. */
export interface DeleteFoldersContactsRequest {
  /** Required. The name of the contact to delete. Format: organizations/{organization_id}/contacts/{contact_id}, folders/{folder_id}/contacts/{contact_id} or projects/{project_id}/contacts/{contact_id} */
  name: string;
}

export const DeleteFoldersContactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/folders/{foldersId}/contacts/{contactsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersContactsRequest>;

export type DeleteFoldersContactsResponse = GoogleProtobufEmpty;
export const DeleteFoldersContactsResponse = GoogleProtobufEmpty;

export type DeleteFoldersContactsError = CommonErrors;

export const deleteFoldersContacts: API.OperationMethod<DeleteFoldersContactsRequest, DeleteFoldersContactsResponse, DeleteFoldersContactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersContactsRequest,
  output: DeleteFoldersContactsResponse,
  errors: [],
}));

/** Lists all contacts for the resource that are subscribed to the specified notification categories, including contacts inherited from any parent resources. */
export interface ComputeFoldersContactsRequest {
  /** Required. The name of the resource to compute contacts for. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id} */
  parent: string;
  /** The categories of notifications to compute contacts for. If ALL is included in this list, contacts subscribed to any notification category will be returned. */
  notificationCategories?: "NOTIFICATION_CATEGORY_UNSPECIFIED" | "ALL" | "SUSPENSION" | "SECURITY" | "TECHNICAL" | "BILLING" | "LEGAL" | "PRODUCT_UPDATES" | "TECHNICAL_INCIDENTS" | (string & {})[];
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of `next_page_token` in the response indicates that more results might be available. If not specified, the default page_size is 100. */
  pageSize?: number;
  /** Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ComputeFoldersContactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  notificationCategories: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("notificationCategories")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/contacts:compute" }),
  svc,
) as unknown as Schema.Schema<ComputeFoldersContactsRequest>;

export type ComputeFoldersContactsResponse = GoogleCloudEssentialcontactsV1ComputeContactsResponse;
export const ComputeFoldersContactsResponse = GoogleCloudEssentialcontactsV1ComputeContactsResponse;

export type ComputeFoldersContactsError = CommonErrors;

export const computeFoldersContacts = API.makePaginated(() => ({
  input: ComputeFoldersContactsRequest,
  output: ComputeFoldersContactsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Allows a contact admin to send a test message to contact to verify that it has been configured correctly. */
export interface SendTestMessageFoldersContactsRequest {
  /** Required. The name of the resource to send the test message for. All contacts must either be set directly on this resource or inherited from another resource that is an ancestor of this one. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id} */
  resource: string;
  /** Request body */
  body?: GoogleCloudEssentialcontactsV1SendTestMessageRequest;
}

export const SendTestMessageFoldersContactsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleCloudEssentialcontactsV1SendTestMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/contacts:sendTestMessage", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendTestMessageFoldersContactsRequest>;

export type SendTestMessageFoldersContactsResponse = GoogleProtobufEmpty;
export const SendTestMessageFoldersContactsResponse = GoogleProtobufEmpty;

export type SendTestMessageFoldersContactsError = CommonErrors;

export const sendTestMessageFoldersContacts: API.OperationMethod<SendTestMessageFoldersContactsRequest, SendTestMessageFoldersContactsResponse, SendTestMessageFoldersContactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SendTestMessageFoldersContactsRequest,
  output: SendTestMessageFoldersContactsResponse,
  errors: [],
}));

/** Adds a new contact for a resource. */
export interface CreateOrganizationsContactsRequest {
  /** Required. The resource to save this contact for. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudEssentialcontactsV1Contact;
}

export const CreateOrganizationsContactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudEssentialcontactsV1Contact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/contacts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsContactsRequest>;

export type CreateOrganizationsContactsResponse = GoogleCloudEssentialcontactsV1Contact;
export const CreateOrganizationsContactsResponse = GoogleCloudEssentialcontactsV1Contact;

export type CreateOrganizationsContactsError = CommonErrors;

export const createOrganizationsContacts: API.OperationMethod<CreateOrganizationsContactsRequest, CreateOrganizationsContactsResponse, CreateOrganizationsContactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsContactsRequest,
  output: CreateOrganizationsContactsResponse,
  errors: [],
}));

/** Updates a contact. Note: A contact's email address cannot be changed. */
export interface PatchOrganizationsContactsRequest {
  /** Output only. The identifier for the contact. Format: {resource_type}/{resource_id}/contacts/{contact_id} */
  name: string;
  /** Optional. The update mask applied to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudEssentialcontactsV1Contact;
}

export const PatchOrganizationsContactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudEssentialcontactsV1Contact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/contacts/{contactsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsContactsRequest>;

export type PatchOrganizationsContactsResponse = GoogleCloudEssentialcontactsV1Contact;
export const PatchOrganizationsContactsResponse = GoogleCloudEssentialcontactsV1Contact;

export type PatchOrganizationsContactsError = CommonErrors;

export const patchOrganizationsContacts: API.OperationMethod<PatchOrganizationsContactsRequest, PatchOrganizationsContactsResponse, PatchOrganizationsContactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsContactsRequest,
  output: PatchOrganizationsContactsResponse,
  errors: [],
}));

/** Lists the contacts that have been set on a resource. */
export interface ListOrganizationsContactsRequest {
  /** Required. The parent resource name. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id} */
  parent: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of `next_page_token` in the response indicates that more results might be available. If not specified, the default page_size is 100. */
  pageSize?: number;
  /** Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ListOrganizationsContactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/contacts" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsContactsRequest>;

export type ListOrganizationsContactsResponse = GoogleCloudEssentialcontactsV1ListContactsResponse;
export const ListOrganizationsContactsResponse = GoogleCloudEssentialcontactsV1ListContactsResponse;

export type ListOrganizationsContactsError = CommonErrors;

export const listOrganizationsContacts = API.makePaginated(() => ({
  input: ListOrganizationsContactsRequest,
  output: ListOrganizationsContactsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a single contact. */
export interface GetOrganizationsContactsRequest {
  /** Required. The name of the contact to retrieve. Format: organizations/{organization_id}/contacts/{contact_id}, folders/{folder_id}/contacts/{contact_id} or projects/{project_id}/contacts/{contact_id} */
  name: string;
}

export const GetOrganizationsContactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/contacts/{contactsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsContactsRequest>;

export type GetOrganizationsContactsResponse = GoogleCloudEssentialcontactsV1Contact;
export const GetOrganizationsContactsResponse = GoogleCloudEssentialcontactsV1Contact;

export type GetOrganizationsContactsError = CommonErrors;

export const getOrganizationsContacts: API.OperationMethod<GetOrganizationsContactsRequest, GetOrganizationsContactsResponse, GetOrganizationsContactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsContactsRequest,
  output: GetOrganizationsContactsResponse,
  errors: [],
}));

/** Deletes a contact. */
export interface DeleteOrganizationsContactsRequest {
  /** Required. The name of the contact to delete. Format: organizations/{organization_id}/contacts/{contact_id}, folders/{folder_id}/contacts/{contact_id} or projects/{project_id}/contacts/{contact_id} */
  name: string;
}

export const DeleteOrganizationsContactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/contacts/{contactsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsContactsRequest>;

export type DeleteOrganizationsContactsResponse = GoogleProtobufEmpty;
export const DeleteOrganizationsContactsResponse = GoogleProtobufEmpty;

export type DeleteOrganizationsContactsError = CommonErrors;

export const deleteOrganizationsContacts: API.OperationMethod<DeleteOrganizationsContactsRequest, DeleteOrganizationsContactsResponse, DeleteOrganizationsContactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsContactsRequest,
  output: DeleteOrganizationsContactsResponse,
  errors: [],
}));

/** Lists all contacts for the resource that are subscribed to the specified notification categories, including contacts inherited from any parent resources. */
export interface ComputeOrganizationsContactsRequest {
  /** Required. The name of the resource to compute contacts for. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id} */
  parent: string;
  /** The categories of notifications to compute contacts for. If ALL is included in this list, contacts subscribed to any notification category will be returned. */
  notificationCategories?: "NOTIFICATION_CATEGORY_UNSPECIFIED" | "ALL" | "SUSPENSION" | "SECURITY" | "TECHNICAL" | "BILLING" | "LEGAL" | "PRODUCT_UPDATES" | "TECHNICAL_INCIDENTS" | (string & {})[];
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of `next_page_token` in the response indicates that more results might be available. If not specified, the default page_size is 100. */
  pageSize?: number;
  /** Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ComputeOrganizationsContactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  notificationCategories: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("notificationCategories")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/contacts:compute" }),
  svc,
) as unknown as Schema.Schema<ComputeOrganizationsContactsRequest>;

export type ComputeOrganizationsContactsResponse = GoogleCloudEssentialcontactsV1ComputeContactsResponse;
export const ComputeOrganizationsContactsResponse = GoogleCloudEssentialcontactsV1ComputeContactsResponse;

export type ComputeOrganizationsContactsError = CommonErrors;

export const computeOrganizationsContacts = API.makePaginated(() => ({
  input: ComputeOrganizationsContactsRequest,
  output: ComputeOrganizationsContactsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Allows a contact admin to send a test message to contact to verify that it has been configured correctly. */
export interface SendTestMessageOrganizationsContactsRequest {
  /** Required. The name of the resource to send the test message for. All contacts must either be set directly on this resource or inherited from another resource that is an ancestor of this one. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id} */
  resource: string;
  /** Request body */
  body?: GoogleCloudEssentialcontactsV1SendTestMessageRequest;
}

export const SendTestMessageOrganizationsContactsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleCloudEssentialcontactsV1SendTestMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/contacts:sendTestMessage", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendTestMessageOrganizationsContactsRequest>;

export type SendTestMessageOrganizationsContactsResponse = GoogleProtobufEmpty;
export const SendTestMessageOrganizationsContactsResponse = GoogleProtobufEmpty;

export type SendTestMessageOrganizationsContactsError = CommonErrors;

export const sendTestMessageOrganizationsContacts: API.OperationMethod<SendTestMessageOrganizationsContactsRequest, SendTestMessageOrganizationsContactsResponse, SendTestMessageOrganizationsContactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SendTestMessageOrganizationsContactsRequest,
  output: SendTestMessageOrganizationsContactsResponse,
  errors: [],
}));

