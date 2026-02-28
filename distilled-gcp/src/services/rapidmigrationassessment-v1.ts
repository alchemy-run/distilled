// ==========================================================================
// Rapid Migration Assessment API (rapidmigrationassessment v1)
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
  name: "rapidmigrationassessment",
  version: "v1",
  rootUrl: "https://rapidmigrationassessment.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Location {
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  locationId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(Location)),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface Status {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  code: Schema.optional(Schema.Number),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  statusMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface VSphereScan {
  /** reference to the corresponding VSphere Scan in MC Source. */
  coreSource?: string;
}

export const VSphereScan: Schema.Schema<VSphereScan> = Schema.suspend(() => Schema.Struct({
  coreSource: Schema.optional(Schema.String),
})).annotate({ identifier: "VSphereScan" }) as any as Schema.Schema<VSphereScan>;

export interface GuestOsScan {
  /** reference to the corresponding Guest OS Scan in MC Source. */
  coreSource?: string;
}

export const GuestOsScan: Schema.Schema<GuestOsScan> = Schema.suspend(() => Schema.Struct({
  coreSource: Schema.optional(Schema.String),
})).annotate({ identifier: "GuestOsScan" }) as any as Schema.Schema<GuestOsScan>;

export interface Collector {
  /** User specified expected asset count. */
  expectedAssetCount?: string;
  /** Output only. Create time stamp. */
  createTime?: string;
  /** Output only. Update time stamp. */
  updateTime?: string;
  /** Uri for EULA (End User License Agreement) from customer. */
  eulaUri?: string;
  /** Output only. Store cloud storage bucket name (which is a guid) created with this Collector. */
  bucket?: string;
  /** Output only. State of the Collector. */
  state?: "STATE_UNSPECIFIED" | "STATE_INITIALIZING" | "STATE_READY_TO_USE" | "STATE_REGISTERED" | "STATE_ACTIVE" | "STATE_PAUSED" | "STATE_DELETING" | "STATE_DECOMMISSIONED" | "STATE_ERROR" | (string & {});
  /** Output only. Reference to MC Source vsphere_scan. */
  vsphereScan?: VSphereScan;
  /** name of resource. */
  name?: string;
  /** Service Account email used to ingest data to this Collector. */
  serviceAccount?: string;
  /** User specified name of the Collector. */
  displayName?: string;
  /** User specified description of the Collector. */
  description?: string;
  /** Output only. Client version. */
  clientVersion?: string;
  /** Labels as key value pairs. */
  labels?: Record<string, string>;
  /** Output only. Reference to MC Source Guest Os Scan. */
  guestOsScan?: GuestOsScan;
  /** How many days to collect data. */
  collectionDays?: number;
}

export const Collector: Schema.Schema<Collector> = Schema.suspend(() => Schema.Struct({
  expectedAssetCount: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  eulaUri: Schema.optional(Schema.String),
  bucket: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  vsphereScan: Schema.optional(VSphereScan),
  name: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  clientVersion: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  guestOsScan: Schema.optional(GuestOsScan),
  collectionDays: Schema.optional(Schema.Number),
})).annotate({ identifier: "Collector" }) as any as Schema.Schema<Collector>;

export interface ListCollectorsResponse {
  /** The list of Collectors. */
  collectors?: Array<Collector>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const ListCollectorsResponse: Schema.Schema<ListCollectorsResponse> = Schema.suspend(() => Schema.Struct({
  collectors: Schema.optional(Schema.Array(Collector)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCollectorsResponse" }) as any as Schema.Schema<ListCollectorsResponse>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface RegisterCollectorRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const RegisterCollectorRequest: Schema.Schema<RegisterCollectorRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "RegisterCollectorRequest" }) as any as Schema.Schema<RegisterCollectorRequest>;

export interface Annotation {
  /** Output only. Update time stamp. */
  updateTime?: string;
  /** Output only. Create time stamp. */
  createTime?: string;
  /** Type of an annotation. */
  type?: "TYPE_UNSPECIFIED" | "TYPE_LEGACY_EXPORT_CONSENT" | "TYPE_QWIKLAB" | (string & {});
  /** Labels as key value pairs. */
  labels?: Record<string, string>;
  /** name of resource. */
  name?: string;
}

export const Annotation: Schema.Schema<Annotation> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Annotation" }) as any as Schema.Schema<Annotation>;

export interface ResumeCollectorRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const ResumeCollectorRequest: Schema.Schema<ResumeCollectorRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "ResumeCollectorRequest" }) as any as Schema.Schema<ResumeCollectorRequest>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface PauseCollectorRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const PauseCollectorRequest: Schema.Schema<PauseCollectorRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "PauseCollectorRequest" }) as any as Schema.Schema<PauseCollectorRequest>;

// ==========================================================================
// Operations
// ==========================================================================

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

/** Lists information about the supported locations for this service. */
export interface ListProjectsLocationsRequest {
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. A list of extra location types that should be used as conditions for controlling the visibility of the locations. */
  extraLocationTypes?: string[];
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** The resource that owns the locations collection, if applicable. */
  name: string;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
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

/** Creates an Annotation */
export interface CreateProjectsLocationsAnnotationsRequest {
  /** Required. Name of the parent (project+location). */
  parent: string;
  /** Optional. An optional request ID to identify requests. */
  requestId?: string;
  /** Request body */
  body?: Annotation;
}

export const CreateProjectsLocationsAnnotationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Annotation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/annotations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAnnotationsRequest>;

export type CreateProjectsLocationsAnnotationsResponse = Operation;
export const CreateProjectsLocationsAnnotationsResponse = Operation;

export type CreateProjectsLocationsAnnotationsError = CommonErrors;

export const createProjectsLocationsAnnotations: API.OperationMethod<CreateProjectsLocationsAnnotationsRequest, CreateProjectsLocationsAnnotationsResponse, CreateProjectsLocationsAnnotationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAnnotationsRequest,
  output: CreateProjectsLocationsAnnotationsResponse,
  errors: [],
}));

/** Gets details of a single Annotation. */
export interface GetProjectsLocationsAnnotationsRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsAnnotationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/annotations/{annotationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAnnotationsRequest>;

export type GetProjectsLocationsAnnotationsResponse = Annotation;
export const GetProjectsLocationsAnnotationsResponse = Annotation;

export type GetProjectsLocationsAnnotationsError = CommonErrors;

export const getProjectsLocationsAnnotations: API.OperationMethod<GetProjectsLocationsAnnotationsRequest, GetProjectsLocationsAnnotationsResponse, GetProjectsLocationsAnnotationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAnnotationsRequest,
  output: GetProjectsLocationsAnnotationsResponse,
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

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The standard list filter. */
  filter?: string;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list page size. */
  pageSize?: number;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
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

/** Lists Collectors in a given project and location. */
export interface ListProjectsLocationsCollectorsRequest {
  /** Hint for how to order the results. */
  orderBy?: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Required. Parent value for ListCollectorsRequest. */
  parent: string;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Filtering results. */
  filter?: string;
}

export const ListProjectsLocationsCollectorsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/collectors" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCollectorsRequest>;

export type ListProjectsLocationsCollectorsResponse = ListCollectorsResponse;
export const ListProjectsLocationsCollectorsResponse = ListCollectorsResponse;

export type ListProjectsLocationsCollectorsError = CommonErrors;

export const listProjectsLocationsCollectors = API.makePaginated(() => ({
  input: ListProjectsLocationsCollectorsRequest,
  output: ListProjectsLocationsCollectorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Registers the given collector. */
export interface RegisterProjectsLocationsCollectorsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Request body */
  body?: RegisterCollectorRequest;
}

export const RegisterProjectsLocationsCollectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RegisterCollectorRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/collectors/{collectorsId}:register", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RegisterProjectsLocationsCollectorsRequest>;

export type RegisterProjectsLocationsCollectorsResponse = Operation;
export const RegisterProjectsLocationsCollectorsResponse = Operation;

export type RegisterProjectsLocationsCollectorsError = CommonErrors;

export const registerProjectsLocationsCollectors: API.OperationMethod<RegisterProjectsLocationsCollectorsRequest, RegisterProjectsLocationsCollectorsResponse, RegisterProjectsLocationsCollectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RegisterProjectsLocationsCollectorsRequest,
  output: RegisterProjectsLocationsCollectorsResponse,
  errors: [],
}));

/** Create a Collector to manage the on-prem appliance which collects information about Customer assets. */
export interface CreateProjectsLocationsCollectorsRequest {
  /** Required. Name of the parent (project+location). */
  parent: string;
  /** Required. Id of the requesting object. */
  collectorId?: string;
  /** Optional. An optional request ID to identify requests. */
  requestId?: string;
  /** Request body */
  body?: Collector;
}

export const CreateProjectsLocationsCollectorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  collectorId: Schema.optional(Schema.String).pipe(T.HttpQuery("collectorId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Collector).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/collectors", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCollectorsRequest>;

export type CreateProjectsLocationsCollectorsResponse = Operation;
export const CreateProjectsLocationsCollectorsResponse = Operation;

export type CreateProjectsLocationsCollectorsError = CommonErrors;

export const createProjectsLocationsCollectors: API.OperationMethod<CreateProjectsLocationsCollectorsRequest, CreateProjectsLocationsCollectorsResponse, CreateProjectsLocationsCollectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCollectorsRequest,
  output: CreateProjectsLocationsCollectorsResponse,
  errors: [],
}));

/** Pauses the given collector. */
export interface PauseProjectsLocationsCollectorsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Request body */
  body?: PauseCollectorRequest;
}

export const PauseProjectsLocationsCollectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PauseCollectorRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/collectors/{collectorsId}:pause", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PauseProjectsLocationsCollectorsRequest>;

export type PauseProjectsLocationsCollectorsResponse = Operation;
export const PauseProjectsLocationsCollectorsResponse = Operation;

export type PauseProjectsLocationsCollectorsError = CommonErrors;

export const pauseProjectsLocationsCollectors: API.OperationMethod<PauseProjectsLocationsCollectorsRequest, PauseProjectsLocationsCollectorsResponse, PauseProjectsLocationsCollectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PauseProjectsLocationsCollectorsRequest,
  output: PauseProjectsLocationsCollectorsResponse,
  errors: [],
}));

/** Gets details of a single Collector. */
export interface GetProjectsLocationsCollectorsRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsCollectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/collectors/{collectorsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCollectorsRequest>;

export type GetProjectsLocationsCollectorsResponse = Collector;
export const GetProjectsLocationsCollectorsResponse = Collector;

export type GetProjectsLocationsCollectorsError = CommonErrors;

export const getProjectsLocationsCollectors: API.OperationMethod<GetProjectsLocationsCollectorsRequest, GetProjectsLocationsCollectorsResponse, GetProjectsLocationsCollectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCollectorsRequest,
  output: GetProjectsLocationsCollectorsResponse,
  errors: [],
}));

/** Resumes the given collector. */
export interface ResumeProjectsLocationsCollectorsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Request body */
  body?: ResumeCollectorRequest;
}

export const ResumeProjectsLocationsCollectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResumeCollectorRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/collectors/{collectorsId}:resume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResumeProjectsLocationsCollectorsRequest>;

export type ResumeProjectsLocationsCollectorsResponse = Operation;
export const ResumeProjectsLocationsCollectorsResponse = Operation;

export type ResumeProjectsLocationsCollectorsError = CommonErrors;

export const resumeProjectsLocationsCollectors: API.OperationMethod<ResumeProjectsLocationsCollectorsRequest, ResumeProjectsLocationsCollectorsResponse, ResumeProjectsLocationsCollectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResumeProjectsLocationsCollectorsRequest,
  output: ResumeProjectsLocationsCollectorsResponse,
  errors: [],
}));

/** Deletes a single Collector - changes state of collector to "Deleting". Background jobs does final deletion through producer API. */
export interface DeleteProjectsLocationsCollectorsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsCollectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/collectors/{collectorsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCollectorsRequest>;

export type DeleteProjectsLocationsCollectorsResponse = Operation;
export const DeleteProjectsLocationsCollectorsResponse = Operation;

export type DeleteProjectsLocationsCollectorsError = CommonErrors;

export const deleteProjectsLocationsCollectors: API.OperationMethod<DeleteProjectsLocationsCollectorsRequest, DeleteProjectsLocationsCollectorsResponse, DeleteProjectsLocationsCollectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCollectorsRequest,
  output: DeleteProjectsLocationsCollectorsResponse,
  errors: [],
}));

/** Updates the parameters of a single Collector. */
export interface PatchProjectsLocationsCollectorsRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the Collector resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** name of resource. */
  name: string;
  /** Request body */
  body?: Collector;
}

export const PatchProjectsLocationsCollectorsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Collector).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/collectors/{collectorsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCollectorsRequest>;

export type PatchProjectsLocationsCollectorsResponse = Operation;
export const PatchProjectsLocationsCollectorsResponse = Operation;

export type PatchProjectsLocationsCollectorsError = CommonErrors;

export const patchProjectsLocationsCollectors: API.OperationMethod<PatchProjectsLocationsCollectorsRequest, PatchProjectsLocationsCollectorsResponse, PatchProjectsLocationsCollectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCollectorsRequest,
  output: PatchProjectsLocationsCollectorsResponse,
  errors: [],
}));

