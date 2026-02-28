// ==========================================================================
// Observability API (observability v1)
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
  name: "observability",
  version: "v1",
  rootUrl: "https://observability.googleapis.com/",
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

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface Scope {
  /** Identifier. Name of the resource. The format is: projects/{project}/locations/{location}/scopes/{scope} The `{location}` field must be set to `global`. The `{scope}` field must be set to `_Default`. */
  name?: string;
  /** Output only. Update timestamp. Note: The Update timestamp for the default scope is initially unset. */
  updateTime?: string;
  /** Required. The full resource name of the `LogScope`. For example: //logging.googleapis.com/projects/myproject/locations/global/logScopes/my-log-scope */
  logScope?: string;
  /** Required. The resource name of the `TraceScope`. For example: projects/myproject/locations/global/traceScopes/my-trace-scope */
  traceScope?: string;
}

export const Scope: Schema.Schema<Scope> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  logScope: Schema.optional(Schema.String),
  traceScope: Schema.optional(Schema.String),
})).annotate({ identifier: "Scope" }) as any as Schema.Schema<Scope>;

export interface CmekSettings {
  /** Optional. The resource name for the configured Cloud KMS key. The format is: projects/[PROJECT_ID]/locations/[LOCATION]/keyRings/[KEYRING]/cryptoKeys/[KEY] For example: projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key */
  kmsKey?: string;
  /** Output only. The CryptoKeyVersion resource name for the configured Cloud KMS key. The format is: projects/[PROJECT_ID]/locations/[LOCATION]/keyRings/[KEYRING]/cryptoKeys/[KEY]/cryptoKeyVersions/[VERSION] For example: projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key/cryptoKeyVersions/1 This read-only field is used to convey the specific configured CryptoKeyVersion of the `kms_key` that has been configured. It is populated when the CMEK settings are bound to a single key version. */
  kmsKeyVersion?: string;
  /** Output only. The service account used to access the key. */
  serviceAccountId?: string;
}

export const CmekSettings: Schema.Schema<CmekSettings> = Schema.suspend(() => Schema.Struct({
  kmsKey: Schema.optional(Schema.String),
  kmsKeyVersion: Schema.optional(Schema.String),
  serviceAccountId: Schema.optional(Schema.String),
})).annotate({ identifier: "CmekSettings" }) as any as Schema.Schema<CmekSettings>;

export interface Bucket {
  /** Identifier. Name of the bucket. The format is: projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID] */
  name?: string;
  /** Optional. User friendly display name. */
  displayName?: string;
  /** Optional. Description of the bucket. */
  description?: string;
  /** Output only. Create timestamp. */
  createTime?: string;
  /** Output only. Update timestamp. */
  updateTime?: string;
  /** Output only. Delete timestamp. */
  deleteTime?: string;
  /** Output only. Timestamp when the bucket in soft-deleted state is purged. */
  purgeTime?: string;
  /** Optional. Settings for configuring CMEK on a bucket. */
  cmekSettings?: CmekSettings;
}

export const Bucket: Schema.Schema<Bucket> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  purgeTime: Schema.optional(Schema.String),
  cmekSettings: Schema.optional(CmekSettings),
})).annotate({ identifier: "Bucket" }) as any as Schema.Schema<Bucket>;

export interface ListBucketsResponse {
  /** Optional. The list of buckets. */
  buckets?: Array<Bucket>;
  /** Optional. A token that can be sent as `page_token` to retrieve the next page. When this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListBucketsResponse: Schema.Schema<ListBucketsResponse> = Schema.suspend(() => Schema.Struct({
  buckets: Schema.optional(Schema.Array(Bucket)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListBucketsResponse" }) as any as Schema.Schema<ListBucketsResponse>;

export interface Dataset {
  /** Identifier. Name of the dataset. The format is: projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID] */
  name?: string;
  /** Optional. User friendly display name. */
  displayName?: string;
  /** Optional. Description of the dataset. */
  description?: string;
  /** Output only. Create timestamp. */
  createTime?: string;
  /** Output only. Delete timestamp. */
  deleteTime?: string;
  /** Output only. Timestamp when the dataset in soft-deleted state is purged. */
  purgeTime?: string;
}

export const Dataset: Schema.Schema<Dataset> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  purgeTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Dataset" }) as any as Schema.Schema<Dataset>;

export interface ListDatasetsResponse {
  /** The list of datasets. */
  datasets?: Array<Dataset>;
  /** A token that can be sent as `page_token` to retrieve the next page. When this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListDatasetsResponse: Schema.Schema<ListDatasetsResponse> = Schema.suspend(() => Schema.Struct({
  datasets: Schema.optional(Schema.Array(Dataset)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDatasetsResponse" }) as any as Schema.Schema<ListDatasetsResponse>;

export interface View {
  /** Identifier. Name of the view. The format is: projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID]/views/[VIEW_ID] */
  name?: string;
  /** Optional. User friendly display name. */
  displayName?: string;
  /** Optional. Description of the view. */
  description?: string;
  /** Output only. Create timestamp. */
  createTime?: string;
  /** Output only. Update timestamp. */
  updateTime?: string;
}

export const View: Schema.Schema<View> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "View" }) as any as Schema.Schema<View>;

export interface ListViewsResponse {
  /** The list of views. */
  views?: Array<View>;
  /** Optional. A token that can be sent as `page_token` to retrieve the next page. When this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListViewsResponse: Schema.Schema<ListViewsResponse> = Schema.suspend(() => Schema.Struct({
  views: Schema.optional(Schema.Array(View)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListViewsResponse" }) as any as Schema.Schema<ListViewsResponse>;

export interface Link {
  /** Identifier. Name of the link. The format is: projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID]/links/[LINK_ID] */
  name?: string;
  /** Optional. A user friendly display name. */
  displayName?: string;
  /** Optional. Description of the link. */
  description?: string;
  /** Output only. Create timestamp. */
  createTime?: string;
}

export const Link: Schema.Schema<Link> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Link" }) as any as Schema.Schema<Link>;

export interface ListLinksResponse {
  /** The list of links. */
  links?: Array<Link>;
  /** Optional. A token that can be sent as `page_token` to retrieve the next page. When this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListLinksResponse: Schema.Schema<ListLinksResponse> = Schema.suspend(() => Schema.Struct({
  links: Schema.optional(Schema.Array(Link)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLinksResponse" }) as any as Schema.Schema<ListLinksResponse>;

export interface TraceScope {
  /** Identifier. The resource name of the trace scope. For example: projects/my-project/locations/global/traceScopes/my-trace-scope */
  name?: string;
  /** Required. Names of the projects that are included in this trace scope. * `projects/[PROJECT_ID]` A trace scope can include a maximum of 20 projects. */
  resourceNames?: Array<string>;
  /** Optional. Describes this trace scope. The maximum length of the description is 8000 characters. */
  description?: string;
  /** Output only. The creation timestamp of the trace scope. */
  createTime?: string;
  /** Output only. The last update timestamp of the trace scope. */
  updateTime?: string;
}

export const TraceScope: Schema.Schema<TraceScope> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  resourceNames: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TraceScope" }) as any as Schema.Schema<TraceScope>;

export interface ListTraceScopesResponse {
  /** Optional. A list of trace scopes. */
  traceScopes?: Array<TraceScope>;
  /** Optional. If there might be more results than appear in this response, then `next_page_token` is included. To get the next set of results, call the same method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
}

export const ListTraceScopesResponse: Schema.Schema<ListTraceScopesResponse> = Schema.suspend(() => Schema.Struct({
  traceScopes: Schema.optional(Schema.Array(TraceScope)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTraceScopesResponse" }) as any as Schema.Schema<ListTraceScopesResponse>;

export interface Settings {
  /** Identifier. The resource name of the settings. */
  name?: string;
  /** Optional. The location which should be used when any regional resources are provisioned by Google Cloud. */
  defaultStorageLocation?: string;
  /** Output only. The service account for the given resource container, such as project or folder. This will be used by Cloud Observability to perform actions in the container's project like access KMS keys or create Links. Always the same service account per resource container regardless of region. */
  serviceAccountId?: string;
  /** Optional. The resource name for the configured Cloud KMS key. KMS key name format: "projects/[PROJECT_ID]/locations/[LOCATION]/keyRings/[KEYRING]/cryptoKeys/[KEY]" For example: `"projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key"` */
  kmsKeyName?: string;
}

export const Settings: Schema.Schema<Settings> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  defaultStorageLocation: Schema.optional(Schema.String),
  serviceAccountId: Schema.optional(Schema.String),
  kmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "Settings" }) as any as Schema.Schema<Settings>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Location)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Get Settings */
export interface GetSettingsProjectsLocationsRequest {
  /** Required. Name of the settings to retrieve. Name format: "projects/[PROJECT_ID]/locations/[LOCATION]/settings" "folders/[FOLDER_ID]/locations/[LOCATION]/settings" "organizations/[ORGANIZATION_ID]/locations/[LOCATION]/settings" */
  name: string;
}

export const GetSettingsProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/settings" }),
  svc,
) as unknown as Schema.Schema<GetSettingsProjectsLocationsRequest>;

export type GetSettingsProjectsLocationsResponse = Settings;
export const GetSettingsProjectsLocationsResponse = Settings;

export type GetSettingsProjectsLocationsError = CommonErrors;

export const getSettingsProjectsLocations: API.OperationMethod<GetSettingsProjectsLocationsRequest, GetSettingsProjectsLocationsResponse, GetSettingsProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSettingsProjectsLocationsRequest,
  output: GetSettingsProjectsLocationsResponse,
  errors: [],
}));

/** Update Settings */
export interface UpdateSettingsProjectsLocationsRequest {
  /** Identifier. The resource name of the settings. */
  name: string;
  /** Optional. The field mask specifying which fields of the settings are to be updated. */
  updateMask?: string;
  /** Request body */
  body?: Settings;
}

export const UpdateSettingsProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Settings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/settings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSettingsProjectsLocationsRequest>;

export type UpdateSettingsProjectsLocationsResponse = Operation;
export const UpdateSettingsProjectsLocationsResponse = Operation;

export type UpdateSettingsProjectsLocationsError = CommonErrors;

export const updateSettingsProjectsLocations: API.OperationMethod<UpdateSettingsProjectsLocationsRequest, UpdateSettingsProjectsLocationsResponse, UpdateSettingsProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSettingsProjectsLocationsRequest,
  output: UpdateSettingsProjectsLocationsResponse,
  errors: [],
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

export const listProjectsLocations = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

export const listProjectsLocationsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = CommonErrors;

export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Gets details of a single Scope. */
export interface GetProjectsLocationsScopesRequest {
  /** Required. Name of the resource. The format is: projects/{project}/locations/{location}/scopes/{scope} The `{location}` field must be set to `global`. The `{scope}` field must be set to `_Default`. */
  name: string;
}

export const GetProjectsLocationsScopesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsScopesRequest>;

export type GetProjectsLocationsScopesResponse = Scope;
export const GetProjectsLocationsScopesResponse = Scope;

export type GetProjectsLocationsScopesError = CommonErrors;

export const getProjectsLocationsScopes: API.OperationMethod<GetProjectsLocationsScopesRequest, GetProjectsLocationsScopesResponse, GetProjectsLocationsScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsScopesRequest,
  output: GetProjectsLocationsScopesResponse,
  errors: [],
}));

/** Updates the parameters of a single Scope. */
export interface PatchProjectsLocationsScopesRequest {
  /** Identifier. Name of the resource. The format is: projects/{project}/locations/{location}/scopes/{scope} The `{location}` field must be set to `global`. The `{scope}` field must be set to `_Default`. */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the Scope resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field is overwritten when it is in the mask. If the user does not provide a mask, then all fields present in the request are overwritten. */
  updateMask?: string;
  /** Request body */
  body?: Scope;
}

export const PatchProjectsLocationsScopesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Scope).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsScopesRequest>;

export type PatchProjectsLocationsScopesResponse = Scope;
export const PatchProjectsLocationsScopesResponse = Scope;

export type PatchProjectsLocationsScopesError = CommonErrors;

export const patchProjectsLocationsScopes: API.OperationMethod<PatchProjectsLocationsScopesRequest, PatchProjectsLocationsScopesResponse, PatchProjectsLocationsScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsScopesRequest,
  output: PatchProjectsLocationsScopesResponse,
  errors: [],
}));

/** Get bucket resource. */
export interface GetProjectsLocationsBucketsRequest {
  /** Required. Name of the bucket to retrieve. The format is: projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID] */
  name: string;
}

export const GetProjectsLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBucketsRequest>;

export type GetProjectsLocationsBucketsResponse = Bucket;
export const GetProjectsLocationsBucketsResponse = Bucket;

export type GetProjectsLocationsBucketsError = CommonErrors;

export const getProjectsLocationsBuckets: API.OperationMethod<GetProjectsLocationsBucketsRequest, GetProjectsLocationsBucketsResponse, GetProjectsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBucketsRequest,
  output: GetProjectsLocationsBucketsResponse,
  errors: [],
}));

/** List buckets of a project in a particular location. */
export interface ListProjectsLocationsBucketsRequest {
  /** Required. The parent, which owns this collection of buckets. The format is: projects/[PROJECT_ID]/locations/[LOCATION] */
  parent: string;
  /** Optional. The maximum number of buckets to return. If unspecified, then at most 100 buckets are returned. The maximum value is 1000; values above 1000 are coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListBuckets` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. If true, then the response will include deleted buckets. */
  showDeleted?: boolean;
}

export const ListProjectsLocationsBucketsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/buckets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBucketsRequest>;

export type ListProjectsLocationsBucketsResponse = ListBucketsResponse;
export const ListProjectsLocationsBucketsResponse = ListBucketsResponse;

export type ListProjectsLocationsBucketsError = CommonErrors;

export const listProjectsLocationsBuckets = API.makePaginated(() => ({
  input: ListProjectsLocationsBucketsRequest,
  output: ListProjectsLocationsBucketsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get a dataset. */
export interface GetProjectsLocationsBucketsDatasetsRequest {
  /** Required. Name of the dataset to retrieve. The format is: projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID] */
  name: string;
}

export const GetProjectsLocationsBucketsDatasetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/datasets/{datasetsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBucketsDatasetsRequest>;

export type GetProjectsLocationsBucketsDatasetsResponse = Dataset;
export const GetProjectsLocationsBucketsDatasetsResponse = Dataset;

export type GetProjectsLocationsBucketsDatasetsError = CommonErrors;

export const getProjectsLocationsBucketsDatasets: API.OperationMethod<GetProjectsLocationsBucketsDatasetsRequest, GetProjectsLocationsBucketsDatasetsResponse, GetProjectsLocationsBucketsDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBucketsDatasetsRequest,
  output: GetProjectsLocationsBucketsDatasetsResponse,
  errors: [],
}));

/** List datasets of a bucket. */
export interface ListProjectsLocationsBucketsDatasetsRequest {
  /** Required. The parent bucket that owns this collection of datasets. The format is: projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID] */
  parent: string;
  /** Optional. The maximum number of datasets to return. If unspecified, then at most 100 datasets are returned. The maximum value is 1000; values above 1000 are coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListDatasets` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. If true, then the response will include deleted datasets. */
  showDeleted?: boolean;
}

export const ListProjectsLocationsBucketsDatasetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/datasets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBucketsDatasetsRequest>;

export type ListProjectsLocationsBucketsDatasetsResponse = ListDatasetsResponse;
export const ListProjectsLocationsBucketsDatasetsResponse = ListDatasetsResponse;

export type ListProjectsLocationsBucketsDatasetsError = CommonErrors;

export const listProjectsLocationsBucketsDatasets = API.makePaginated(() => ({
  input: ListProjectsLocationsBucketsDatasetsRequest,
  output: ListProjectsLocationsBucketsDatasetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get a view. */
export interface GetProjectsLocationsBucketsDatasetsViewsRequest {
  /** Required. Name of the view to retrieve. The format is: projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID]/views/[VIEW_ID] */
  name: string;
}

export const GetProjectsLocationsBucketsDatasetsViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/datasets/{datasetsId}/views/{viewsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBucketsDatasetsViewsRequest>;

export type GetProjectsLocationsBucketsDatasetsViewsResponse = View;
export const GetProjectsLocationsBucketsDatasetsViewsResponse = View;

export type GetProjectsLocationsBucketsDatasetsViewsError = CommonErrors;

export const getProjectsLocationsBucketsDatasetsViews: API.OperationMethod<GetProjectsLocationsBucketsDatasetsViewsRequest, GetProjectsLocationsBucketsDatasetsViewsResponse, GetProjectsLocationsBucketsDatasetsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBucketsDatasetsViewsRequest,
  output: GetProjectsLocationsBucketsDatasetsViewsResponse,
  errors: [],
}));

/** List views of a dataset. */
export interface ListProjectsLocationsBucketsDatasetsViewsRequest {
  /** Required. Dataset whose views are to be listed. The format is: projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID] */
  parent: string;
  /** Optional. The maximum number of views to return. If unspecified, then at most 100 views are returned. The maximum value is 1000; values above 1000 are coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListViews` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
}

export const ListProjectsLocationsBucketsDatasetsViewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/datasets/{datasetsId}/views" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBucketsDatasetsViewsRequest>;

export type ListProjectsLocationsBucketsDatasetsViewsResponse = ListViewsResponse;
export const ListProjectsLocationsBucketsDatasetsViewsResponse = ListViewsResponse;

export type ListProjectsLocationsBucketsDatasetsViewsError = CommonErrors;

export const listProjectsLocationsBucketsDatasetsViews = API.makePaginated(() => ({
  input: ListProjectsLocationsBucketsDatasetsViewsRequest,
  output: ListProjectsLocationsBucketsDatasetsViewsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get a link. */
export interface GetProjectsLocationsBucketsDatasetsLinksRequest {
  /** Required. Name of the link to retrieve. The format is: projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID]/links/[LINK_ID] */
  name: string;
}

export const GetProjectsLocationsBucketsDatasetsLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/datasets/{datasetsId}/links/{linksId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBucketsDatasetsLinksRequest>;

export type GetProjectsLocationsBucketsDatasetsLinksResponse = Link;
export const GetProjectsLocationsBucketsDatasetsLinksResponse = Link;

export type GetProjectsLocationsBucketsDatasetsLinksError = CommonErrors;

export const getProjectsLocationsBucketsDatasetsLinks: API.OperationMethod<GetProjectsLocationsBucketsDatasetsLinksRequest, GetProjectsLocationsBucketsDatasetsLinksResponse, GetProjectsLocationsBucketsDatasetsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBucketsDatasetsLinksRequest,
  output: GetProjectsLocationsBucketsDatasetsLinksResponse,
  errors: [],
}));

/** List links of a dataset. */
export interface ListProjectsLocationsBucketsDatasetsLinksRequest {
  /** Required. The parent dataset that owns this collection of links. The format is: projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID] */
  parent: string;
  /** Optional. The maximum number of links to return. If unspecified, then at most 100 links are returned. The maximum value is 1000; values above 1000 are coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListLinks` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
}

export const ListProjectsLocationsBucketsDatasetsLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/datasets/{datasetsId}/links" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBucketsDatasetsLinksRequest>;

export type ListProjectsLocationsBucketsDatasetsLinksResponse = ListLinksResponse;
export const ListProjectsLocationsBucketsDatasetsLinksResponse = ListLinksResponse;

export type ListProjectsLocationsBucketsDatasetsLinksError = CommonErrors;

export const listProjectsLocationsBucketsDatasetsLinks = API.makePaginated(() => ({
  input: ListProjectsLocationsBucketsDatasetsLinksRequest,
  output: ListProjectsLocationsBucketsDatasetsLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Create a new link. */
export interface CreateProjectsLocationsBucketsDatasetsLinksRequest {
  /** Required. Name of the containing dataset for this link. The format is: projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID] */
  parent: string;
  /** Required. Id of the link to create. */
  linkId?: string;
  /** Request body */
  body?: Link;
}

export const CreateProjectsLocationsBucketsDatasetsLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  linkId: Schema.optional(Schema.String).pipe(T.HttpQuery("linkId")),
  body: Schema.optional(Link).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/datasets/{datasetsId}/links", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBucketsDatasetsLinksRequest>;

export type CreateProjectsLocationsBucketsDatasetsLinksResponse = Operation;
export const CreateProjectsLocationsBucketsDatasetsLinksResponse = Operation;

export type CreateProjectsLocationsBucketsDatasetsLinksError = CommonErrors;

export const createProjectsLocationsBucketsDatasetsLinks: API.OperationMethod<CreateProjectsLocationsBucketsDatasetsLinksRequest, CreateProjectsLocationsBucketsDatasetsLinksResponse, CreateProjectsLocationsBucketsDatasetsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBucketsDatasetsLinksRequest,
  output: CreateProjectsLocationsBucketsDatasetsLinksResponse,
  errors: [],
}));

/** Update a link. */
export interface PatchProjectsLocationsBucketsDatasetsLinksRequest {
  /** Identifier. Name of the link. The format is: projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID]/links/[LINK_ID] */
  name: string;
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: Link;
}

export const PatchProjectsLocationsBucketsDatasetsLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Link).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/datasets/{datasetsId}/links/{linksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBucketsDatasetsLinksRequest>;

export type PatchProjectsLocationsBucketsDatasetsLinksResponse = Operation;
export const PatchProjectsLocationsBucketsDatasetsLinksResponse = Operation;

export type PatchProjectsLocationsBucketsDatasetsLinksError = CommonErrors;

export const patchProjectsLocationsBucketsDatasetsLinks: API.OperationMethod<PatchProjectsLocationsBucketsDatasetsLinksRequest, PatchProjectsLocationsBucketsDatasetsLinksResponse, PatchProjectsLocationsBucketsDatasetsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBucketsDatasetsLinksRequest,
  output: PatchProjectsLocationsBucketsDatasetsLinksResponse,
  errors: [],
}));

/** Delete a link. */
export interface DeleteProjectsLocationsBucketsDatasetsLinksRequest {
  /** Required. Name of the link to delete. The format is: projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID]/links/[LINK_ID] */
  name: string;
}

export const DeleteProjectsLocationsBucketsDatasetsLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/datasets/{datasetsId}/links/{linksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBucketsDatasetsLinksRequest>;

export type DeleteProjectsLocationsBucketsDatasetsLinksResponse = Operation;
export const DeleteProjectsLocationsBucketsDatasetsLinksResponse = Operation;

export type DeleteProjectsLocationsBucketsDatasetsLinksError = CommonErrors;

export const deleteProjectsLocationsBucketsDatasetsLinks: API.OperationMethod<DeleteProjectsLocationsBucketsDatasetsLinksRequest, DeleteProjectsLocationsBucketsDatasetsLinksResponse, DeleteProjectsLocationsBucketsDatasetsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBucketsDatasetsLinksRequest,
  output: DeleteProjectsLocationsBucketsDatasetsLinksResponse,
  errors: [],
}));

/** Get TraceScope resource. */
export interface GetProjectsLocationsTraceScopesRequest {
  /** Required. The resource name of the trace scope: projects/[PROJECT_ID]/locations/[LOCATION_ID]/traceScopes/[TRACE_SCOPE_ID] For example: projects/my-project/locations/global/traceScopes/my-trace-scope */
  name: string;
}

export const GetProjectsLocationsTraceScopesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/traceScopes/{traceScopesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsTraceScopesRequest>;

export type GetProjectsLocationsTraceScopesResponse = TraceScope;
export const GetProjectsLocationsTraceScopesResponse = TraceScope;

export type GetProjectsLocationsTraceScopesError = CommonErrors;

export const getProjectsLocationsTraceScopes: API.OperationMethod<GetProjectsLocationsTraceScopesRequest, GetProjectsLocationsTraceScopesResponse, GetProjectsLocationsTraceScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsTraceScopesRequest,
  output: GetProjectsLocationsTraceScopesResponse,
  errors: [],
}));

/** List TraceScopes of a project in a particular location. */
export interface ListProjectsLocationsTraceScopesRequest {
  /** Required. The full resource name of the location to look for trace scopes: projects/[PROJECT_ID]/locations/[LOCATION_ID] For example: projects/my-project/locations/global */
  parent: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of `next_page_token` in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ListProjectsLocationsTraceScopesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/traceScopes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsTraceScopesRequest>;

export type ListProjectsLocationsTraceScopesResponse = ListTraceScopesResponse;
export const ListProjectsLocationsTraceScopesResponse = ListTraceScopesResponse;

export type ListProjectsLocationsTraceScopesError = CommonErrors;

export const listProjectsLocationsTraceScopes = API.makePaginated(() => ({
  input: ListProjectsLocationsTraceScopesRequest,
  output: ListProjectsLocationsTraceScopesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Create a new TraceScope. */
export interface CreateProjectsLocationsTraceScopesRequest {
  /** Required. The full resource name of the location where the trace scope should be created projects/[PROJECT_ID]/locations/[LOCATION_ID] For example: projects/my-project/locations/global */
  parent: string;
  /** Required. A client-assigned identifier for the trace scope. */
  traceScopeId?: string;
  /** Request body */
  body?: TraceScope;
}

export const CreateProjectsLocationsTraceScopesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  traceScopeId: Schema.optional(Schema.String).pipe(T.HttpQuery("traceScopeId")),
  body: Schema.optional(TraceScope).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/traceScopes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsTraceScopesRequest>;

export type CreateProjectsLocationsTraceScopesResponse = TraceScope;
export const CreateProjectsLocationsTraceScopesResponse = TraceScope;

export type CreateProjectsLocationsTraceScopesError = CommonErrors;

export const createProjectsLocationsTraceScopes: API.OperationMethod<CreateProjectsLocationsTraceScopesRequest, CreateProjectsLocationsTraceScopesResponse, CreateProjectsLocationsTraceScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsTraceScopesRequest,
  output: CreateProjectsLocationsTraceScopesResponse,
  errors: [],
}));

/** Update a TraceScope. */
export interface PatchProjectsLocationsTraceScopesRequest {
  /** Identifier. The resource name of the trace scope. For example: projects/my-project/locations/global/traceScopes/my-trace-scope */
  name: string;
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: TraceScope;
}

export const PatchProjectsLocationsTraceScopesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(TraceScope).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/traceScopes/{traceScopesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsTraceScopesRequest>;

export type PatchProjectsLocationsTraceScopesResponse = TraceScope;
export const PatchProjectsLocationsTraceScopesResponse = TraceScope;

export type PatchProjectsLocationsTraceScopesError = CommonErrors;

export const patchProjectsLocationsTraceScopes: API.OperationMethod<PatchProjectsLocationsTraceScopesRequest, PatchProjectsLocationsTraceScopesResponse, PatchProjectsLocationsTraceScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsTraceScopesRequest,
  output: PatchProjectsLocationsTraceScopesResponse,
  errors: [],
}));

/** Delete a TraceScope. */
export interface DeleteProjectsLocationsTraceScopesRequest {
  /** Required. The full resource name of the trace scope to delete: projects/[PROJECT_ID]/locations/[LOCATION_ID]/traceScopes/[TRACE_SCOPE_ID] For example: projects/my-project/locations/global/traceScopes/my-trace-scope */
  name: string;
}

export const DeleteProjectsLocationsTraceScopesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/traceScopes/{traceScopesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsTraceScopesRequest>;

export type DeleteProjectsLocationsTraceScopesResponse = Empty;
export const DeleteProjectsLocationsTraceScopesResponse = Empty;

export type DeleteProjectsLocationsTraceScopesError = CommonErrors;

export const deleteProjectsLocationsTraceScopes: API.OperationMethod<DeleteProjectsLocationsTraceScopesRequest, DeleteProjectsLocationsTraceScopesResponse, DeleteProjectsLocationsTraceScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsTraceScopesRequest,
  output: DeleteProjectsLocationsTraceScopesResponse,
  errors: [],
}));

/** Get Settings */
export interface GetSettingsFoldersLocationsRequest {
  /** Required. Name of the settings to retrieve. Name format: "projects/[PROJECT_ID]/locations/[LOCATION]/settings" "folders/[FOLDER_ID]/locations/[LOCATION]/settings" "organizations/[ORGANIZATION_ID]/locations/[LOCATION]/settings" */
  name: string;
}

export const GetSettingsFoldersLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations/{locationsId}/settings" }),
  svc,
) as unknown as Schema.Schema<GetSettingsFoldersLocationsRequest>;

export type GetSettingsFoldersLocationsResponse = Settings;
export const GetSettingsFoldersLocationsResponse = Settings;

export type GetSettingsFoldersLocationsError = CommonErrors;

export const getSettingsFoldersLocations: API.OperationMethod<GetSettingsFoldersLocationsRequest, GetSettingsFoldersLocationsResponse, GetSettingsFoldersLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSettingsFoldersLocationsRequest,
  output: GetSettingsFoldersLocationsResponse,
  errors: [],
}));

/** Update Settings */
export interface UpdateSettingsFoldersLocationsRequest {
  /** Identifier. The resource name of the settings. */
  name: string;
  /** Optional. The field mask specifying which fields of the settings are to be updated. */
  updateMask?: string;
  /** Request body */
  body?: Settings;
}

export const UpdateSettingsFoldersLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Settings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/folders/{foldersId}/locations/{locationsId}/settings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSettingsFoldersLocationsRequest>;

export type UpdateSettingsFoldersLocationsResponse = Operation;
export const UpdateSettingsFoldersLocationsResponse = Operation;

export type UpdateSettingsFoldersLocationsError = CommonErrors;

export const updateSettingsFoldersLocations: API.OperationMethod<UpdateSettingsFoldersLocationsRequest, UpdateSettingsFoldersLocationsResponse, UpdateSettingsFoldersLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSettingsFoldersLocationsRequest,
  output: UpdateSettingsFoldersLocationsResponse,
  errors: [],
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListFoldersLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListFoldersLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsRequest>;

export type ListFoldersLocationsResponse = ListLocationsResponse;
export const ListFoldersLocationsResponse = ListLocationsResponse;

export type ListFoldersLocationsError = CommonErrors;

export const listFoldersLocations = API.makePaginated(() => ({
  input: ListFoldersLocationsRequest,
  output: ListFoldersLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetFoldersLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetFoldersLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsRequest>;

export type GetFoldersLocationsResponse = Location;
export const GetFoldersLocationsResponse = Location;

export type GetFoldersLocationsError = CommonErrors;

export const getFoldersLocations: API.OperationMethod<GetFoldersLocationsRequest, GetFoldersLocationsResponse, GetFoldersLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsRequest,
  output: GetFoldersLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListFoldersLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListFoldersLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsOperationsRequest>;

export type ListFoldersLocationsOperationsResponse = ListOperationsResponse;
export const ListFoldersLocationsOperationsResponse = ListOperationsResponse;

export type ListFoldersLocationsOperationsError = CommonErrors;

export const listFoldersLocationsOperations = API.makePaginated(() => ({
  input: ListFoldersLocationsOperationsRequest,
  output: ListFoldersLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetFoldersLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetFoldersLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsOperationsRequest>;

export type GetFoldersLocationsOperationsResponse = Operation;
export const GetFoldersLocationsOperationsResponse = Operation;

export type GetFoldersLocationsOperationsError = CommonErrors;

export const getFoldersLocationsOperations: API.OperationMethod<GetFoldersLocationsOperationsRequest, GetFoldersLocationsOperationsResponse, GetFoldersLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsOperationsRequest,
  output: GetFoldersLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteFoldersLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteFoldersLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/folders/{foldersId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersLocationsOperationsRequest>;

export type DeleteFoldersLocationsOperationsResponse = Empty;
export const DeleteFoldersLocationsOperationsResponse = Empty;

export type DeleteFoldersLocationsOperationsError = CommonErrors;

export const deleteFoldersLocationsOperations: API.OperationMethod<DeleteFoldersLocationsOperationsRequest, DeleteFoldersLocationsOperationsResponse, DeleteFoldersLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersLocationsOperationsRequest,
  output: DeleteFoldersLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelFoldersLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelFoldersLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelFoldersLocationsOperationsRequest>;

export type CancelFoldersLocationsOperationsResponse = Empty;
export const CancelFoldersLocationsOperationsResponse = Empty;

export type CancelFoldersLocationsOperationsError = CommonErrors;

export const cancelFoldersLocationsOperations: API.OperationMethod<CancelFoldersLocationsOperationsRequest, CancelFoldersLocationsOperationsResponse, CancelFoldersLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelFoldersLocationsOperationsRequest,
  output: CancelFoldersLocationsOperationsResponse,
  errors: [],
}));

/** Get Settings */
export interface GetSettingsOrganizationsLocationsRequest {
  /** Required. Name of the settings to retrieve. Name format: "projects/[PROJECT_ID]/locations/[LOCATION]/settings" "folders/[FOLDER_ID]/locations/[LOCATION]/settings" "organizations/[ORGANIZATION_ID]/locations/[LOCATION]/settings" */
  name: string;
}

export const GetSettingsOrganizationsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/settings" }),
  svc,
) as unknown as Schema.Schema<GetSettingsOrganizationsLocationsRequest>;

export type GetSettingsOrganizationsLocationsResponse = Settings;
export const GetSettingsOrganizationsLocationsResponse = Settings;

export type GetSettingsOrganizationsLocationsError = CommonErrors;

export const getSettingsOrganizationsLocations: API.OperationMethod<GetSettingsOrganizationsLocationsRequest, GetSettingsOrganizationsLocationsResponse, GetSettingsOrganizationsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSettingsOrganizationsLocationsRequest,
  output: GetSettingsOrganizationsLocationsResponse,
  errors: [],
}));

/** Update Settings */
export interface UpdateSettingsOrganizationsLocationsRequest {
  /** Identifier. The resource name of the settings. */
  name: string;
  /** Optional. The field mask specifying which fields of the settings are to be updated. */
  updateMask?: string;
  /** Request body */
  body?: Settings;
}

export const UpdateSettingsOrganizationsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Settings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/locations/{locationsId}/settings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSettingsOrganizationsLocationsRequest>;

export type UpdateSettingsOrganizationsLocationsResponse = Operation;
export const UpdateSettingsOrganizationsLocationsResponse = Operation;

export type UpdateSettingsOrganizationsLocationsError = CommonErrors;

export const updateSettingsOrganizationsLocations: API.OperationMethod<UpdateSettingsOrganizationsLocationsRequest, UpdateSettingsOrganizationsLocationsResponse, UpdateSettingsOrganizationsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSettingsOrganizationsLocationsRequest,
  output: UpdateSettingsOrganizationsLocationsResponse,
  errors: [],
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListOrganizationsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListOrganizationsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsRequest>;

export type ListOrganizationsLocationsResponse = ListLocationsResponse;
export const ListOrganizationsLocationsResponse = ListLocationsResponse;

export type ListOrganizationsLocationsError = CommonErrors;

export const listOrganizationsLocations = API.makePaginated(() => ({
  input: ListOrganizationsLocationsRequest,
  output: ListOrganizationsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetOrganizationsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetOrganizationsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsRequest>;

export type GetOrganizationsLocationsResponse = Location;
export const GetOrganizationsLocationsResponse = Location;

export type GetOrganizationsLocationsError = CommonErrors;

export const getOrganizationsLocations: API.OperationMethod<GetOrganizationsLocationsRequest, GetOrganizationsLocationsResponse, GetOrganizationsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsRequest,
  output: GetOrganizationsLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOrganizationsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsOperationsRequest>;

export type ListOrganizationsLocationsOperationsResponse = ListOperationsResponse;
export const ListOrganizationsLocationsOperationsResponse = ListOperationsResponse;

export type ListOrganizationsLocationsOperationsError = CommonErrors;

export const listOrganizationsLocationsOperations = API.makePaginated(() => ({
  input: ListOrganizationsLocationsOperationsRequest,
  output: ListOrganizationsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsOperationsRequest>;

export type GetOrganizationsLocationsOperationsResponse = Operation;
export const GetOrganizationsLocationsOperationsResponse = Operation;

export type GetOrganizationsLocationsOperationsError = CommonErrors;

export const getOrganizationsLocationsOperations: API.OperationMethod<GetOrganizationsLocationsOperationsRequest, GetOrganizationsLocationsOperationsResponse, GetOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsOperationsRequest,
  output: GetOrganizationsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsOperationsRequest>;

export type DeleteOrganizationsLocationsOperationsResponse = Empty;
export const DeleteOrganizationsLocationsOperationsResponse = Empty;

export type DeleteOrganizationsLocationsOperationsError = CommonErrors;

export const deleteOrganizationsLocationsOperations: API.OperationMethod<DeleteOrganizationsLocationsOperationsRequest, DeleteOrganizationsLocationsOperationsResponse, DeleteOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsOperationsRequest,
  output: DeleteOrganizationsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOrganizationsLocationsOperationsRequest>;

export type CancelOrganizationsLocationsOperationsResponse = Empty;
export const CancelOrganizationsLocationsOperationsResponse = Empty;

export type CancelOrganizationsLocationsOperationsError = CommonErrors;

export const cancelOrganizationsLocationsOperations: API.OperationMethod<CancelOrganizationsLocationsOperationsRequest, CancelOrganizationsLocationsOperationsResponse, CancelOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOrganizationsLocationsOperationsRequest,
  output: CancelOrganizationsLocationsOperationsResponse,
  errors: [],
}));

