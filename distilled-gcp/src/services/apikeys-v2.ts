// ==========================================================================
// API Keys API (apikeys v2)
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
  name: "apikeys",
  version: "v2",
  rootUrl: "https://apikeys.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface V2BrowserKeyRestrictions {
  /** A list of regular expressions for the referrer URLs that are allowed to make API calls with this key. */
  allowedReferrers?: Array<string>;
}

export const V2BrowserKeyRestrictions: Schema.Schema<V2BrowserKeyRestrictions> = Schema.suspend(() => Schema.Struct({
  allowedReferrers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "V2BrowserKeyRestrictions" }) as any as Schema.Schema<V2BrowserKeyRestrictions>;

export interface V2ServerKeyRestrictions {
  /** A list of the caller IP addresses that are allowed to make API calls with this key. */
  allowedIps?: Array<string>;
}

export const V2ServerKeyRestrictions: Schema.Schema<V2ServerKeyRestrictions> = Schema.suspend(() => Schema.Struct({
  allowedIps: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "V2ServerKeyRestrictions" }) as any as Schema.Schema<V2ServerKeyRestrictions>;

export interface V2AndroidApplication {
  /** The SHA1 fingerprint of the application. For example, both sha1 formats are acceptable : DA:39:A3:EE:5E:6B:4B:0D:32:55:BF:EF:95:60:18:90:AF:D8:07:09 or DA39A3EE5E6B4B0D3255BFEF95601890AFD80709. Output format is the latter. */
  sha1Fingerprint?: string;
  /** The package name of the application. */
  packageName?: string;
}

export const V2AndroidApplication: Schema.Schema<V2AndroidApplication> = Schema.suspend(() => Schema.Struct({
  sha1Fingerprint: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
})).annotate({ identifier: "V2AndroidApplication" }) as any as Schema.Schema<V2AndroidApplication>;

export interface V2AndroidKeyRestrictions {
  /** A list of Android applications that are allowed to make API calls with this key. */
  allowedApplications?: Array<V2AndroidApplication>;
}

export const V2AndroidKeyRestrictions: Schema.Schema<V2AndroidKeyRestrictions> = Schema.suspend(() => Schema.Struct({
  allowedApplications: Schema.optional(Schema.Array(V2AndroidApplication)),
})).annotate({ identifier: "V2AndroidKeyRestrictions" }) as any as Schema.Schema<V2AndroidKeyRestrictions>;

export interface V2IosKeyRestrictions {
  /** A list of bundle IDs that are allowed when making API calls with this key. */
  allowedBundleIds?: Array<string>;
}

export const V2IosKeyRestrictions: Schema.Schema<V2IosKeyRestrictions> = Schema.suspend(() => Schema.Struct({
  allowedBundleIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "V2IosKeyRestrictions" }) as any as Schema.Schema<V2IosKeyRestrictions>;

export interface V2ApiTarget {
  /** The service for this restriction. It should be the canonical service name, for example: `translate.googleapis.com`. You can use [`gcloud services list`](https://cloud.google.com/sdk/gcloud/reference/services/list) to get a list of services that are enabled in the project. */
  service?: string;
  /** Optional. List of one or more methods that can be called. If empty, all methods for the service are allowed. A wildcard (*) can be used as the last symbol. Valid examples: `google.cloud.translate.v2.TranslateService.GetSupportedLanguage` `TranslateText` `Get*` `translate.googleapis.com.Get*` */
  methods?: Array<string>;
}

export const V2ApiTarget: Schema.Schema<V2ApiTarget> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  methods: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "V2ApiTarget" }) as any as Schema.Schema<V2ApiTarget>;

export interface V2Restrictions {
  /** The HTTP referrers (websites) that are allowed to use the key. */
  browserKeyRestrictions?: V2BrowserKeyRestrictions;
  /** The IP addresses of callers that are allowed to use the key. */
  serverKeyRestrictions?: V2ServerKeyRestrictions;
  /** The Android apps that are allowed to use the key. */
  androidKeyRestrictions?: V2AndroidKeyRestrictions;
  /** The iOS apps that are allowed to use the key. */
  iosKeyRestrictions?: V2IosKeyRestrictions;
  /** A restriction for a specific service and optionally one or more specific methods. Requests are allowed if they match any of these restrictions. If no restrictions are specified, all targets are allowed. */
  apiTargets?: Array<V2ApiTarget>;
}

export const V2Restrictions: Schema.Schema<V2Restrictions> = Schema.suspend(() => Schema.Struct({
  browserKeyRestrictions: Schema.optional(V2BrowserKeyRestrictions),
  serverKeyRestrictions: Schema.optional(V2ServerKeyRestrictions),
  androidKeyRestrictions: Schema.optional(V2AndroidKeyRestrictions),
  iosKeyRestrictions: Schema.optional(V2IosKeyRestrictions),
  apiTargets: Schema.optional(Schema.Array(V2ApiTarget)),
})).annotate({ identifier: "V2Restrictions" }) as any as Schema.Schema<V2Restrictions>;

export interface V2Key {
  /** Output only. The resource name of the key. The `name` has the form: `projects//locations/global/keys/`. For example: `projects/123456867718/locations/global/keys/b7ff1f9f-8275-410a-94dd-3855ee9b5dd2` NOTE: Key is a global resource; hence the only supported value for location is `global`. */
  name?: string;
  /** Output only. Unique id in UUID4 format. */
  uid?: string;
  /** Human-readable display name of this key that you can modify. The maximum length is 63 characters. */
  displayName?: string;
  /** Output only. An encrypted and signed value held by this key. This field can be accessed only through the `GetKeyString` method. */
  keyString?: string;
  /** Output only. A timestamp identifying the time this key was originally created. */
  createTime?: string;
  /** Output only. A timestamp identifying the time this key was last updated. */
  updateTime?: string;
  /** Output only. A timestamp when this key was deleted. If the resource is not deleted, this must be empty. */
  deleteTime?: string;
  /** Annotations is an unstructured key-value map stored with a policy that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. */
  annotations?: Record<string, string>;
  /** Key restrictions. */
  restrictions?: V2Restrictions;
  /** A checksum computed by the server based on the current value of the Key resource. This may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. See https://google.aip.dev/154. */
  etag?: string;
  /** Optional. The email address of [the service account](https://cloud.google.com/iam/docs/service-accounts) the key is bound to. */
  serviceAccountEmail?: string;
}

export const V2Key: Schema.Schema<V2Key> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  keyString: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  restrictions: Schema.optional(V2Restrictions),
  etag: Schema.optional(Schema.String),
  serviceAccountEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "V2Key" }) as any as Schema.Schema<V2Key>;

export interface V2ListKeysResponse {
  /** A list of API keys. */
  keys?: Array<V2Key>;
  /** The pagination token for the next page of results. */
  nextPageToken?: string;
}

export const V2ListKeysResponse: Schema.Schema<V2ListKeysResponse> = Schema.suspend(() => Schema.Struct({
  keys: Schema.optional(Schema.Array(V2Key)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "V2ListKeysResponse" }) as any as Schema.Schema<V2ListKeysResponse>;

export interface V2GetKeyStringResponse {
  /** An encrypted and signed value of the key. */
  keyString?: string;
}

export const V2GetKeyStringResponse: Schema.Schema<V2GetKeyStringResponse> = Schema.suspend(() => Schema.Struct({
  keyString: Schema.optional(Schema.String),
})).annotate({ identifier: "V2GetKeyStringResponse" }) as any as Schema.Schema<V2GetKeyStringResponse>;

export interface V2UndeleteKeyRequest {
}

export const V2UndeleteKeyRequest: Schema.Schema<V2UndeleteKeyRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "V2UndeleteKeyRequest" }) as any as Schema.Schema<V2UndeleteKeyRequest>;

export interface V2LookupKeyResponse {
  /** The project that owns the key with the value specified in the request. */
  parent?: string;
  /** The resource name of the API key. If the API key has been purged, resource name is empty. */
  name?: string;
}

export const V2LookupKeyResponse: Schema.Schema<V2LookupKeyResponse> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "V2LookupKeyResponse" }) as any as Schema.Schema<V2LookupKeyResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = Operation;

export type GetOperationsError = CommonErrors;

export const getOperations: API.OperationMethod<GetOperationsRequest, GetOperationsResponse, GetOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

/** Creates a new API key. NOTE: Key is a global resource; hence the only supported value for location is `global`. */
export interface CreateProjectsLocationsKeysRequest {
  /** Required. The project in which the API key is created. */
  parent: string;
  /** User specified key id (optional). If specified, it will become the final component of the key resource name. The id must be unique within the project, must conform with RFC-1034, is restricted to lower-cased letters, and has a maximum length of 63 characters. In another word, the id must match the regular expression: `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`. The id must NOT be a UUID-like string. */
  keyId?: string;
  /** Request body */
  body?: V2Key;
}

export const CreateProjectsLocationsKeysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  keyId: Schema.optional(Schema.String).pipe(T.HttpQuery("keyId")),
  body: Schema.optional(V2Key).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/keys", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsKeysRequest>;

export type CreateProjectsLocationsKeysResponse = Operation;
export const CreateProjectsLocationsKeysResponse = Operation;

export type CreateProjectsLocationsKeysError = CommonErrors;

export const createProjectsLocationsKeys: API.OperationMethod<CreateProjectsLocationsKeysRequest, CreateProjectsLocationsKeysResponse, CreateProjectsLocationsKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsKeysRequest,
  output: CreateProjectsLocationsKeysResponse,
  errors: [],
}));

/** Lists the API keys owned by a project. The key string of the API key isn't included in the response. NOTE: Key is a global resource; hence the only supported value for location is `global`. */
export interface ListProjectsLocationsKeysRequest {
  /** Required. Lists all API keys associated with this project. */
  parent: string;
  /** Optional. Specifies the maximum number of results to be returned at a time. */
  pageSize?: number;
  /** Optional. Requests a specific page of results. */
  pageToken?: string;
  /** Optional. Indicate that keys deleted in the past 30 days should also be returned. */
  showDeleted?: boolean;
}

export const ListProjectsLocationsKeysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/keys" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsKeysRequest>;

export type ListProjectsLocationsKeysResponse = V2ListKeysResponse;
export const ListProjectsLocationsKeysResponse = V2ListKeysResponse;

export type ListProjectsLocationsKeysError = CommonErrors;

export const listProjectsLocationsKeys = API.makePaginated(() => ({
  input: ListProjectsLocationsKeysRequest,
  output: ListProjectsLocationsKeysResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the metadata for an API key. The key string of the API key isn't included in the response. NOTE: Key is a global resource; hence the only supported value for location is `global`. */
export interface GetProjectsLocationsKeysRequest {
  /** Required. The resource name of the API key to get. */
  name: string;
}

export const GetProjectsLocationsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/keys/{keysId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsKeysRequest>;

export type GetProjectsLocationsKeysResponse = V2Key;
export const GetProjectsLocationsKeysResponse = V2Key;

export type GetProjectsLocationsKeysError = CommonErrors;

export const getProjectsLocationsKeys: API.OperationMethod<GetProjectsLocationsKeysRequest, GetProjectsLocationsKeysResponse, GetProjectsLocationsKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsKeysRequest,
  output: GetProjectsLocationsKeysResponse,
  errors: [],
}));

/** Get the key string for an API key. NOTE: Key is a global resource; hence the only supported value for location is `global`. */
export interface GetKeyStringProjectsLocationsKeysRequest {
  /** Required. The resource name of the API key to be retrieved. */
  name: string;
}

export const GetKeyStringProjectsLocationsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/keys/{keysId}/keyString" }),
  svc,
) as unknown as Schema.Schema<GetKeyStringProjectsLocationsKeysRequest>;

export type GetKeyStringProjectsLocationsKeysResponse = V2GetKeyStringResponse;
export const GetKeyStringProjectsLocationsKeysResponse = V2GetKeyStringResponse;

export type GetKeyStringProjectsLocationsKeysError = CommonErrors;

export const getKeyStringProjectsLocationsKeys: API.OperationMethod<GetKeyStringProjectsLocationsKeysRequest, GetKeyStringProjectsLocationsKeysResponse, GetKeyStringProjectsLocationsKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetKeyStringProjectsLocationsKeysRequest,
  output: GetKeyStringProjectsLocationsKeysResponse,
  errors: [],
}));

/** Patches the modifiable fields of an API key. The key string of the API key isn't included in the response. NOTE: Key is a global resource; hence the only supported value for location is `global`. */
export interface PatchProjectsLocationsKeysRequest {
  /** Output only. The resource name of the key. The `name` has the form: `projects//locations/global/keys/`. For example: `projects/123456867718/locations/global/keys/b7ff1f9f-8275-410a-94dd-3855ee9b5dd2` NOTE: Key is a global resource; hence the only supported value for location is `global`. */
  name: string;
  /** The field mask specifies which fields to be updated as part of this request. All other fields are ignored. Mutable fields are: `display_name`, `restrictions`, and `annotations`. If an update mask is not provided, the service treats it as an implied mask equivalent to all allowed fields that are set on the wire. If the field mask has a special value "*", the service treats it equivalent to replace all allowed mutable fields. */
  updateMask?: string;
  /** Request body */
  body?: V2Key;
}

export const PatchProjectsLocationsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(V2Key).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/keys/{keysId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsKeysRequest>;

export type PatchProjectsLocationsKeysResponse = Operation;
export const PatchProjectsLocationsKeysResponse = Operation;

export type PatchProjectsLocationsKeysError = CommonErrors;

export const patchProjectsLocationsKeys: API.OperationMethod<PatchProjectsLocationsKeysRequest, PatchProjectsLocationsKeysResponse, PatchProjectsLocationsKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsKeysRequest,
  output: PatchProjectsLocationsKeysResponse,
  errors: [],
}));

/** Deletes an API key. Deleted key can be retrieved within 30 days of deletion. Afterward, key will be purged from the project. NOTE: Key is a global resource; hence the only supported value for location is `global`. */
export interface DeleteProjectsLocationsKeysRequest {
  /** Required. The resource name of the API key to be deleted. */
  name: string;
  /** Optional. The etag known to the client for the expected state of the key. This is to be used for optimistic concurrency. */
  etag?: string;
}

export const DeleteProjectsLocationsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/keys/{keysId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsKeysRequest>;

export type DeleteProjectsLocationsKeysResponse = Operation;
export const DeleteProjectsLocationsKeysResponse = Operation;

export type DeleteProjectsLocationsKeysError = CommonErrors;

export const deleteProjectsLocationsKeys: API.OperationMethod<DeleteProjectsLocationsKeysRequest, DeleteProjectsLocationsKeysResponse, DeleteProjectsLocationsKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsKeysRequest,
  output: DeleteProjectsLocationsKeysResponse,
  errors: [],
}));

/** Undeletes an API key which was deleted within 30 days. NOTE: Key is a global resource; hence the only supported value for location is `global`. */
export interface UndeleteProjectsLocationsKeysRequest {
  /** Required. The resource name of the API key to be undeleted. */
  name: string;
  /** Request body */
  body?: V2UndeleteKeyRequest;
}

export const UndeleteProjectsLocationsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(V2UndeleteKeyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/keys/{keysId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectsLocationsKeysRequest>;

export type UndeleteProjectsLocationsKeysResponse = Operation;
export const UndeleteProjectsLocationsKeysResponse = Operation;

export type UndeleteProjectsLocationsKeysError = CommonErrors;

export const undeleteProjectsLocationsKeys: API.OperationMethod<UndeleteProjectsLocationsKeysRequest, UndeleteProjectsLocationsKeysResponse, UndeleteProjectsLocationsKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteProjectsLocationsKeysRequest,
  output: UndeleteProjectsLocationsKeysResponse,
  errors: [],
}));

/** Find the parent project and resource name of the API key that matches the key string in the request. If the API key has been purged, resource name will not be set. The service account must have the `apikeys.keys.lookup` permission on the parent project. */
export interface LookupKeyKeysRequest {
  /** Required. Finds the project that owns the key string value. */
  keyString?: string;
}

export const LookupKeyKeysRequest = Schema.Struct({
  keyString: Schema.optional(Schema.String).pipe(T.HttpQuery("keyString")),
}).pipe(
  T.Http({ method: "GET", path: "v2/keys:lookupKey" }),
  svc,
) as unknown as Schema.Schema<LookupKeyKeysRequest>;

export type LookupKeyKeysResponse = V2LookupKeyResponse;
export const LookupKeyKeysResponse = V2LookupKeyResponse;

export type LookupKeyKeysError = CommonErrors;

export const lookupKeyKeys: API.OperationMethod<LookupKeyKeysRequest, LookupKeyKeysResponse, LookupKeyKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupKeyKeysRequest,
  output: LookupKeyKeysResponse,
  errors: [],
}));

