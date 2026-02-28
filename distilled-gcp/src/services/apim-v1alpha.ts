// ==========================================================================
// API Management API (apim v1alpha)
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
  name: "apim",
  version: "v1alpha",
  rootUrl: "https://apim.googleapis.com/",
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

export interface GclbObservationSourcePscNetworkConfig {
  /** Required. The VPC network. Format: `projects/{project_id}/global/networks/{network}` */
  network?: string;
  /** Required. The subnetwork in the source region that will be used to connect to the Cloud Load Balancers via PSC NEGs. Must belong to `network`. Format: projects/{project_id}/regions/{region}/subnetworks/{subnet} */
  subnetwork?: string;
}

export const GclbObservationSourcePscNetworkConfig: Schema.Schema<GclbObservationSourcePscNetworkConfig> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
})).annotate({ identifier: "GclbObservationSourcePscNetworkConfig" }) as any as Schema.Schema<GclbObservationSourcePscNetworkConfig>;

export interface GclbObservationSource {
  /** Required. The VPC networks where traffic will be observed. All load balancers within this network will be observed. Currently, this is limited to only one network. */
  pscNetworkConfigs?: Array<GclbObservationSourcePscNetworkConfig>;
}

export const GclbObservationSource: Schema.Schema<GclbObservationSource> = Schema.suspend(() => Schema.Struct({
  pscNetworkConfigs: Schema.optional(Schema.Array(GclbObservationSourcePscNetworkConfig)),
})).annotate({ identifier: "GclbObservationSource" }) as any as Schema.Schema<GclbObservationSource>;

export interface ObservationSource {
  /** The GCLB observation source */
  gclbObservationSource?: GclbObservationSource;
  /** Identifier. name of resource For MVP, each region can only have 1 source. */
  name?: string;
  /** Output only. The observation source state */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "CREATED" | "DELETING" | "ERROR" | (string & {});
  /** Output only. [Output only] Create time stamp */
  createTime?: string;
  /** Output only. [Output only] Update time stamp */
  updateTime?: string;
}

export const ObservationSource: Schema.Schema<ObservationSource> = Schema.suspend(() => Schema.Struct({
  gclbObservationSource: Schema.optional(GclbObservationSource),
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ObservationSource" }) as any as Schema.Schema<ObservationSource>;

export interface ListObservationSourcesResponse {
  /** The ObservationSource from the specified project and location. */
  observationSources?: Array<ObservationSource>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListObservationSourcesResponse: Schema.Schema<ListObservationSourcesResponse> = Schema.suspend(() => Schema.Struct({
  observationSources: Schema.optional(Schema.Array(ObservationSource)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListObservationSourcesResponse" }) as any as Schema.Schema<ListObservationSourcesResponse>;

export interface ObservationJob {
  /** Identifier. name of resource Format: projects/{project}/locations/{location}/observationJobs/{observation_job} */
  name?: string;
  /** Output only. The observation job state */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ENABLING" | "ENABLED" | "DISABLING" | "DISABLED" | "DELETING" | "ERROR" | (string & {});
  /** Optional. These should be of the same kind of source. */
  sources?: Array<string>;
  /** Output only. [Output only] Create time stamp */
  createTime?: string;
  /** Output only. [Output only] Update time stamp */
  updateTime?: string;
}

export const ObservationJob: Schema.Schema<ObservationJob> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  sources: Schema.optional(Schema.Array(Schema.String)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ObservationJob" }) as any as Schema.Schema<ObservationJob>;

export interface ListObservationJobsResponse {
  /** The ObservationJob from the specified project and location. */
  observationJobs?: Array<ObservationJob>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListObservationJobsResponse: Schema.Schema<ListObservationJobsResponse> = Schema.suspend(() => Schema.Struct({
  observationJobs: Schema.optional(Schema.Array(ObservationJob)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListObservationJobsResponse" }) as any as Schema.Schema<ListObservationJobsResponse>;

export interface EnableObservationJobRequest {
}

export const EnableObservationJobRequest: Schema.Schema<EnableObservationJobRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "EnableObservationJobRequest" }) as any as Schema.Schema<EnableObservationJobRequest>;

export interface DisableObservationJobRequest {
}

export const DisableObservationJobRequest: Schema.Schema<DisableObservationJobRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DisableObservationJobRequest" }) as any as Schema.Schema<DisableObservationJobRequest>;

export interface ApiObservation {
  /** Identifier. Name of resource */
  name?: string;
  /** Style of ApiObservation */
  style?: "STYLE_UNSPECIFIED" | "REST" | "GRPC" | "GRAPHQL" | (string & {});
  /** The IP address (IPv4 or IPv6) of the origin server that the request was sent to. This field can include port information. Examples: `"192.168.1.1"`, `"10.0.0.1:80"`, `"FE80::0202:B3FF:FE1E:8329"`. */
  serverIps?: Array<string>;
  /** The hostname of requests processed for this Observation. */
  hostname?: string;
  /** Location of the Observation Source, for example "us-central1" or "europe-west1." */
  sourceLocations?: Array<string>;
  /** User-defined tags to organize and sort */
  tags?: Array<string>;
  /** The number of observed API Operations. */
  apiOperationCount?: string;
  /** Create time stamp */
  createTime?: string;
  /** Update time stamp */
  updateTime?: string;
  /** Last event detected time stamp */
  lastEventDetectedTime?: string;
}

export const ApiObservation: Schema.Schema<ApiObservation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  style: Schema.optional(Schema.String),
  serverIps: Schema.optional(Schema.Array(Schema.String)),
  hostname: Schema.optional(Schema.String),
  sourceLocations: Schema.optional(Schema.Array(Schema.String)),
  tags: Schema.optional(Schema.Array(Schema.String)),
  apiOperationCount: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  lastEventDetectedTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ApiObservation" }) as any as Schema.Schema<ApiObservation>;

export interface ListApiObservationsResponse {
  /** The ApiObservation from the specified project and location and ObservationJobs. */
  apiObservations?: Array<ApiObservation>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListApiObservationsResponse: Schema.Schema<ListApiObservationsResponse> = Schema.suspend(() => Schema.Struct({
  apiObservations: Schema.optional(Schema.Array(ApiObservation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListApiObservationsResponse" }) as any as Schema.Schema<ListApiObservationsResponse>;

export interface HttpOperationPathParam {
  /** Segment location in the path, 1-indexed */
  position?: number;
  /** Data type of path param */
  dataType?: "DATA_TYPE_UNSPECIFIED" | "BOOL" | "INTEGER" | "FLOAT" | "STRING" | "UUID" | (string & {});
}

export const HttpOperationPathParam: Schema.Schema<HttpOperationPathParam> = Schema.suspend(() => Schema.Struct({
  position: Schema.optional(Schema.Number),
  dataType: Schema.optional(Schema.String),
})).annotate({ identifier: "HttpOperationPathParam" }) as any as Schema.Schema<HttpOperationPathParam>;

export interface HttpOperationQueryParam {
  /** Name of query param */
  name?: string;
  /** The number of occurrences of this query parameter across transactions. */
  count?: string;
  /** Data type of path param */
  dataType?: "DATA_TYPE_UNSPECIFIED" | "BOOL" | "INTEGER" | "FLOAT" | "STRING" | "UUID" | (string & {});
}

export const HttpOperationQueryParam: Schema.Schema<HttpOperationQueryParam> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
  dataType: Schema.optional(Schema.String),
})).annotate({ identifier: "HttpOperationQueryParam" }) as any as Schema.Schema<HttpOperationQueryParam>;

export interface HttpOperationHeader {
  /** Header name. */
  name?: string;
  /** The number of occurrences of this Header across transactions. */
  count?: string;
  /** Data type of header */
  dataType?: "DATA_TYPE_UNSPECIFIED" | "BOOL" | "INTEGER" | "FLOAT" | "STRING" | "UUID" | (string & {});
}

export const HttpOperationHeader: Schema.Schema<HttpOperationHeader> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
  dataType: Schema.optional(Schema.String),
})).annotate({ identifier: "HttpOperationHeader" }) as any as Schema.Schema<HttpOperationHeader>;

export interface HttpOperationHttpRequest {
  /** Unordered map from header name to header metadata */
  headers?: Record<string, HttpOperationHeader>;
}

export const HttpOperationHttpRequest: Schema.Schema<HttpOperationHttpRequest> = Schema.suspend(() => Schema.Struct({
  headers: Schema.optional(Schema.Record(Schema.String, HttpOperationHeader)),
})).annotate({ identifier: "HttpOperationHttpRequest" }) as any as Schema.Schema<HttpOperationHttpRequest>;

export interface HttpOperationHttpResponse {
  /** Unordered map from header name to header metadata */
  headers?: Record<string, HttpOperationHeader>;
  /** Map of status code to observed count */
  responseCodes?: Record<string, string>;
}

export const HttpOperationHttpResponse: Schema.Schema<HttpOperationHttpResponse> = Schema.suspend(() => Schema.Struct({
  headers: Schema.optional(Schema.Record(Schema.String, HttpOperationHeader)),
  responseCodes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "HttpOperationHttpResponse" }) as any as Schema.Schema<HttpOperationHttpResponse>;

export interface HttpOperation {
  /** Path of the HTTP request. */
  path?: string;
  /** Path params of HttpOperation */
  pathParams?: Array<HttpOperationPathParam>;
  /** Query params of HttpOperation */
  queryParams?: Record<string, HttpOperationQueryParam>;
  /** HTTP Method. */
  method?: "HTTP_METHOD_UNSPECIFIED" | "GET" | "HEAD" | "POST" | "PUT" | "PATCH" | "DELETE" | "TRACE" | "OPTIONS" | "CONNECT" | (string & {});
  /** Request metadata. */
  request?: HttpOperationHttpRequest;
  /** Response metadata. */
  response?: HttpOperationHttpResponse;
}

export const HttpOperation: Schema.Schema<HttpOperation> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  pathParams: Schema.optional(Schema.Array(HttpOperationPathParam)),
  queryParams: Schema.optional(Schema.Record(Schema.String, HttpOperationQueryParam)),
  method: Schema.optional(Schema.String),
  request: Schema.optional(HttpOperationHttpRequest),
  response: Schema.optional(HttpOperationHttpResponse),
})).annotate({ identifier: "HttpOperation" }) as any as Schema.Schema<HttpOperation>;

export interface ApiOperation {
  /** An HTTP Operation. */
  httpOperation?: HttpOperation;
  /** Identifier. Name of resource */
  name?: string;
  /** First seen time stamp */
  firstSeenTime?: string;
  /** Last seen time stamp */
  lastSeenTime?: string;
  /** The number of occurrences of this API Operation. */
  count?: string;
}

export const ApiOperation: Schema.Schema<ApiOperation> = Schema.suspend(() => Schema.Struct({
  httpOperation: Schema.optional(HttpOperation),
  name: Schema.optional(Schema.String),
  firstSeenTime: Schema.optional(Schema.String),
  lastSeenTime: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "ApiOperation" }) as any as Schema.Schema<ApiOperation>;

export interface ListApiOperationsResponse {
  /** The ApiOperations from the specified project and location and ObservationJob and ApiObservation. */
  apiOperations?: Array<ApiOperation>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListApiOperationsResponse: Schema.Schema<ListApiOperationsResponse> = Schema.suspend(() => Schema.Struct({
  apiOperations: Schema.optional(Schema.Array(ApiOperation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListApiOperationsResponse" }) as any as Schema.Schema<ListApiOperationsResponse>;

export interface TagAction {
  /** Required. Tag to be added or removed */
  tag?: string;
  /** Required. Action to be applied */
  action?: "ACTION_UNSPECIFIED" | "ADD" | "REMOVE" | (string & {});
}

export const TagAction: Schema.Schema<TagAction> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
})).annotate({ identifier: "TagAction" }) as any as Schema.Schema<TagAction>;

export interface EditTagsApiObservationsRequest {
  /** Required. Identifier of ApiObservation need to be edit tags Format example: "apigee.googleapis.com|us-west1|443" */
  apiObservationId?: string;
  /** Required. Tag actions to be applied */
  tagActions?: Array<TagAction>;
}

export const EditTagsApiObservationsRequest: Schema.Schema<EditTagsApiObservationsRequest> = Schema.suspend(() => Schema.Struct({
  apiObservationId: Schema.optional(Schema.String),
  tagActions: Schema.optional(Schema.Array(TagAction)),
})).annotate({ identifier: "EditTagsApiObservationsRequest" }) as any as Schema.Schema<EditTagsApiObservationsRequest>;

export interface BatchEditTagsApiObservationsRequest {
  /** Required. The request message specifying the resources to update. A maximum of 1000 apiObservations can be modified in a batch. */
  requests?: Array<EditTagsApiObservationsRequest>;
}

export const BatchEditTagsApiObservationsRequest: Schema.Schema<BatchEditTagsApiObservationsRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(EditTagsApiObservationsRequest)),
})).annotate({ identifier: "BatchEditTagsApiObservationsRequest" }) as any as Schema.Schema<BatchEditTagsApiObservationsRequest>;

export interface BatchEditTagsApiObservationsResponse {
  /** ApiObservations that were changed */
  apiObservations?: Array<ApiObservation>;
}

export const BatchEditTagsApiObservationsResponse: Schema.Schema<BatchEditTagsApiObservationsResponse> = Schema.suspend(() => Schema.Struct({
  apiObservations: Schema.optional(Schema.Array(ApiObservation)),
})).annotate({ identifier: "BatchEditTagsApiObservationsResponse" }) as any as Schema.Schema<BatchEditTagsApiObservationsResponse>;

export interface ListApiObservationTagsResponse {
  /** The tags from the specified project */
  apiObservationTags?: Array<string>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListApiObservationTagsResponse: Schema.Schema<ListApiObservationTagsResponse> = Schema.suspend(() => Schema.Struct({
  apiObservationTags: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListApiObservationTagsResponse" }) as any as Schema.Schema<ListApiObservationTagsResponse>;

export interface Entitlement {
  /** Identifier. The entitlement resource name `projects/{project}/locations/{location}/entitlement` */
  name?: string;
  /** Project number of associated billing project that has Apigee and Advanced API Security entitled. */
  billingProjectNumber?: string;
  /** Whether API Observation is entitled. */
  apiObservationEntitled?: boolean;
  /** Output only. The time of the entitlement creation. */
  createTime?: string;
  /** Output only. The time of the entitlement update. */
  updateTime?: string;
}

export const Entitlement: Schema.Schema<Entitlement> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  billingProjectNumber: Schema.optional(Schema.String),
  apiObservationEntitled: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Entitlement" }) as any as Schema.Schema<Entitlement>;

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

/** ListApiObservationTags lists all extant tags on any observation in the given project. */
export interface ListApiObservationTagsProjectsLocationsRequest {
  /** Required. The parent, which owns this collection of tags. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Optional. The maximum number of tags to return. The service may return fewer than this value. If unspecified, at most 10 tags will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListApiObservationTags` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListApiObservationTags` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListApiObservationTagsProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}:listApiObservationTags" }),
  svc,
) as unknown as Schema.Schema<ListApiObservationTagsProjectsLocationsRequest>;

export type ListApiObservationTagsProjectsLocationsResponse = ListApiObservationTagsResponse;
export const ListApiObservationTagsProjectsLocationsResponse = ListApiObservationTagsResponse;

export type ListApiObservationTagsProjectsLocationsError = CommonErrors;

export const listApiObservationTagsProjectsLocations = API.makePaginated(() => ({
  input: ListApiObservationTagsProjectsLocationsRequest,
  output: ListApiObservationTagsProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** GetEntitlement returns the entitlement for the provided project. */
export interface GetEntitlementProjectsLocationsRequest {
  /** Required. The entitlement resource name Format: projects/{project}/locations/{location}/entitlement */
  name: string;
}

export const GetEntitlementProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/entitlement" }),
  svc,
) as unknown as Schema.Schema<GetEntitlementProjectsLocationsRequest>;

export type GetEntitlementProjectsLocationsResponse = Entitlement;
export const GetEntitlementProjectsLocationsResponse = Entitlement;

export type GetEntitlementProjectsLocationsError = CommonErrors;

export const getEntitlementProjectsLocations: API.OperationMethod<GetEntitlementProjectsLocationsRequest, GetEntitlementProjectsLocationsResponse, GetEntitlementProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEntitlementProjectsLocationsRequest,
  output: GetEntitlementProjectsLocationsResponse,
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
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations" }),
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
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}" }),
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
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/operations" }),
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
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
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
  T.Http({ method: "DELETE", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
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
  T.Http({ method: "POST", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
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

/** CreateObservationSource creates a new ObservationSource but does not affect any deployed infrastructure. It is a configuration that can be used in an Observation Job to collect data about APIs running in user's dataplane. */
export interface CreateProjectsLocationsObservationSourcesRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. The ID to use for the Observation Source. This value should be 4-63 characters, and valid characters are /a-z-/. */
  observationSourceId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ObservationSource;
}

export const CreateProjectsLocationsObservationSourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  observationSourceId: Schema.optional(Schema.String).pipe(T.HttpQuery("observationSourceId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ObservationSource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/observationSources", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsObservationSourcesRequest>;

export type CreateProjectsLocationsObservationSourcesResponse = Operation;
export const CreateProjectsLocationsObservationSourcesResponse = Operation;

export type CreateProjectsLocationsObservationSourcesError = CommonErrors;

export const createProjectsLocationsObservationSources: API.OperationMethod<CreateProjectsLocationsObservationSourcesRequest, CreateProjectsLocationsObservationSourcesResponse, CreateProjectsLocationsObservationSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsObservationSourcesRequest,
  output: CreateProjectsLocationsObservationSourcesResponse,
  errors: [],
}));

/** GetObservationSource retrieves a single ObservationSource by name. */
export interface GetProjectsLocationsObservationSourcesRequest {
  /** Required. The name of the ObservationSource to retrieve. Format: projects/{project}/locations/{location}/observationSources/{source} */
  name: string;
}

export const GetProjectsLocationsObservationSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/observationSources/{observationSourcesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsObservationSourcesRequest>;

export type GetProjectsLocationsObservationSourcesResponse = ObservationSource;
export const GetProjectsLocationsObservationSourcesResponse = ObservationSource;

export type GetProjectsLocationsObservationSourcesError = CommonErrors;

export const getProjectsLocationsObservationSources: API.OperationMethod<GetProjectsLocationsObservationSourcesRequest, GetProjectsLocationsObservationSourcesResponse, GetProjectsLocationsObservationSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsObservationSourcesRequest,
  output: GetProjectsLocationsObservationSourcesResponse,
  errors: [],
}));

/** ListObservationSources gets all ObservationSources for a given project and location. */
export interface ListProjectsLocationsObservationSourcesRequest {
  /** Required. The parent, which owns this collection of ObservationSources. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Optional. The maximum number of ObservationSources to return. The service may return fewer than this value. If unspecified, at most 10 ObservationSources will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListObservationSources` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListObservationSources` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsObservationSourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/observationSources" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsObservationSourcesRequest>;

export type ListProjectsLocationsObservationSourcesResponse = ListObservationSourcesResponse;
export const ListProjectsLocationsObservationSourcesResponse = ListObservationSourcesResponse;

export type ListProjectsLocationsObservationSourcesError = CommonErrors;

export const listProjectsLocationsObservationSources = API.makePaginated(() => ({
  input: ListProjectsLocationsObservationSourcesRequest,
  output: ListProjectsLocationsObservationSourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** DeleteObservationSource deletes an observation source. This method will fail if the observation source is currently being used by any ObservationJob, even if not enabled. */
export interface DeleteProjectsLocationsObservationSourcesRequest {
  /** Required. Name of the resource Format: projects/{project}/locations/{location}/observationSources/{source} */
  name: string;
}

export const DeleteProjectsLocationsObservationSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/observationSources/{observationSourcesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsObservationSourcesRequest>;

export type DeleteProjectsLocationsObservationSourcesResponse = Operation;
export const DeleteProjectsLocationsObservationSourcesResponse = Operation;

export type DeleteProjectsLocationsObservationSourcesError = CommonErrors;

export const deleteProjectsLocationsObservationSources: API.OperationMethod<DeleteProjectsLocationsObservationSourcesRequest, DeleteProjectsLocationsObservationSourcesResponse, DeleteProjectsLocationsObservationSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsObservationSourcesRequest,
  output: DeleteProjectsLocationsObservationSourcesResponse,
  errors: [],
}));

/** CreateObservationJob creates a new ObservationJob but does not have any effecton its own. It is a configuration that can be used in an Observation Job to collect data about existing APIs. */
export interface CreateProjectsLocationsObservationJobsRequest {
  /** Required. The parent resource where this ObservationJob will be created. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Required. The ID to use for the Observation Job. This value should be 4-63 characters, and valid characters are /a-z-/. */
  observationJobId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ObservationJob;
}

export const CreateProjectsLocationsObservationJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  observationJobId: Schema.optional(Schema.String).pipe(T.HttpQuery("observationJobId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ObservationJob).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/observationJobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsObservationJobsRequest>;

export type CreateProjectsLocationsObservationJobsResponse = Operation;
export const CreateProjectsLocationsObservationJobsResponse = Operation;

export type CreateProjectsLocationsObservationJobsError = CommonErrors;

export const createProjectsLocationsObservationJobs: API.OperationMethod<CreateProjectsLocationsObservationJobsRequest, CreateProjectsLocationsObservationJobsResponse, CreateProjectsLocationsObservationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsObservationJobsRequest,
  output: CreateProjectsLocationsObservationJobsResponse,
  errors: [],
}));

/** GetObservationJob retrieves a single ObservationJob by name. */
export interface GetProjectsLocationsObservationJobsRequest {
  /** Required. The name of the ObservationJob to retrieve. Format: projects/{project}/locations/{location}/observationJobs/{job} */
  name: string;
}

export const GetProjectsLocationsObservationJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/observationJobs/{observationJobsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsObservationJobsRequest>;

export type GetProjectsLocationsObservationJobsResponse = ObservationJob;
export const GetProjectsLocationsObservationJobsResponse = ObservationJob;

export type GetProjectsLocationsObservationJobsError = CommonErrors;

export const getProjectsLocationsObservationJobs: API.OperationMethod<GetProjectsLocationsObservationJobsRequest, GetProjectsLocationsObservationJobsResponse, GetProjectsLocationsObservationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsObservationJobsRequest,
  output: GetProjectsLocationsObservationJobsResponse,
  errors: [],
}));

/** ListObservationJobs gets all ObservationJobs for a given project and location. */
export interface ListProjectsLocationsObservationJobsRequest {
  /** Required. The parent, which owns this collection of ObservationJobs. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Optional. The maximum number of ObservationJobs to return. The service may return fewer than this value. If unspecified, at most 10 ObservationJobs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListObservationJobs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListObservationJobs` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsObservationJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/observationJobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsObservationJobsRequest>;

export type ListProjectsLocationsObservationJobsResponse = ListObservationJobsResponse;
export const ListProjectsLocationsObservationJobsResponse = ListObservationJobsResponse;

export type ListProjectsLocationsObservationJobsError = CommonErrors;

export const listProjectsLocationsObservationJobs = API.makePaginated(() => ({
  input: ListProjectsLocationsObservationJobsRequest,
  output: ListProjectsLocationsObservationJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** DeleteObservationJob deletes an ObservationJob. This method will fail if the observation job is currently being used by any ObservationSource, even if not enabled. */
export interface DeleteProjectsLocationsObservationJobsRequest {
  /** Required. Name of the resource Format: projects/{project}/locations/{location}/observationJobs/{observation_job} */
  name: string;
}

export const DeleteProjectsLocationsObservationJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/observationJobs/{observationJobsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsObservationJobsRequest>;

export type DeleteProjectsLocationsObservationJobsResponse = Operation;
export const DeleteProjectsLocationsObservationJobsResponse = Operation;

export type DeleteProjectsLocationsObservationJobsError = CommonErrors;

export const deleteProjectsLocationsObservationJobs: API.OperationMethod<DeleteProjectsLocationsObservationJobsRequest, DeleteProjectsLocationsObservationJobsResponse, DeleteProjectsLocationsObservationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsObservationJobsRequest,
  output: DeleteProjectsLocationsObservationJobsResponse,
  errors: [],
}));

/** Enables the given ObservationJob. */
export interface EnableProjectsLocationsObservationJobsRequest {
  /** Required. The name of the ObservationJob to enable. Format: projects/{project}/locations/{location}/observationJobs/{job} */
  name: string;
  /** Request body */
  body?: EnableObservationJobRequest;
}

export const EnableProjectsLocationsObservationJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EnableObservationJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/observationJobs/{observationJobsId}:enable", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EnableProjectsLocationsObservationJobsRequest>;

export type EnableProjectsLocationsObservationJobsResponse = Operation;
export const EnableProjectsLocationsObservationJobsResponse = Operation;

export type EnableProjectsLocationsObservationJobsError = CommonErrors;

export const enableProjectsLocationsObservationJobs: API.OperationMethod<EnableProjectsLocationsObservationJobsRequest, EnableProjectsLocationsObservationJobsResponse, EnableProjectsLocationsObservationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EnableProjectsLocationsObservationJobsRequest,
  output: EnableProjectsLocationsObservationJobsResponse,
  errors: [],
}));

/** Disables the given ObservationJob. */
export interface DisableProjectsLocationsObservationJobsRequest {
  /** Required. The name of the ObservationJob to disable. Format: projects/{project}/locations/{location}/observationJobs/{job} */
  name: string;
  /** Request body */
  body?: DisableObservationJobRequest;
}

export const DisableProjectsLocationsObservationJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DisableObservationJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/observationJobs/{observationJobsId}:disable", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DisableProjectsLocationsObservationJobsRequest>;

export type DisableProjectsLocationsObservationJobsResponse = Operation;
export const DisableProjectsLocationsObservationJobsResponse = Operation;

export type DisableProjectsLocationsObservationJobsError = CommonErrors;

export const disableProjectsLocationsObservationJobs: API.OperationMethod<DisableProjectsLocationsObservationJobsRequest, DisableProjectsLocationsObservationJobsResponse, DisableProjectsLocationsObservationJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DisableProjectsLocationsObservationJobsRequest,
  output: DisableProjectsLocationsObservationJobsResponse,
  errors: [],
}));

/** GetApiObservation retrieves a single ApiObservation by name. */
export interface GetProjectsLocationsObservationJobsApiObservationsRequest {
  /** Required. The name of the ApiObservation to retrieve. Format: projects/{project}/locations/{location}/observationJobs/{observation_job}/apiObservations/{api_observation} */
  name: string;
}

export const GetProjectsLocationsObservationJobsApiObservationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/observationJobs/{observationJobsId}/apiObservations/{apiObservationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsObservationJobsApiObservationsRequest>;

export type GetProjectsLocationsObservationJobsApiObservationsResponse = ApiObservation;
export const GetProjectsLocationsObservationJobsApiObservationsResponse = ApiObservation;

export type GetProjectsLocationsObservationJobsApiObservationsError = CommonErrors;

export const getProjectsLocationsObservationJobsApiObservations: API.OperationMethod<GetProjectsLocationsObservationJobsApiObservationsRequest, GetProjectsLocationsObservationJobsApiObservationsResponse, GetProjectsLocationsObservationJobsApiObservationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsObservationJobsApiObservationsRequest,
  output: GetProjectsLocationsObservationJobsApiObservationsResponse,
  errors: [],
}));

/** ListApiObservations gets all ApiObservations for a given project and location and ObservationJob. */
export interface ListProjectsLocationsObservationJobsApiObservationsRequest {
  /** Required. The parent, which owns this collection of ApiObservations. Format: projects/{project}/locations/{location}/observationJobs/{observation_job} */
  parent: string;
  /** Optional. The maximum number of ApiObservations to return. The service may return fewer than this value. If unspecified, at most 10 ApiObservations will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListApiObservations` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListApiObservations` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsObservationJobsApiObservationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/observationJobs/{observationJobsId}/apiObservations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsObservationJobsApiObservationsRequest>;

export type ListProjectsLocationsObservationJobsApiObservationsResponse = ListApiObservationsResponse;
export const ListProjectsLocationsObservationJobsApiObservationsResponse = ListApiObservationsResponse;

export type ListProjectsLocationsObservationJobsApiObservationsError = CommonErrors;

export const listProjectsLocationsObservationJobsApiObservations = API.makePaginated(() => ({
  input: ListProjectsLocationsObservationJobsApiObservationsRequest,
  output: ListProjectsLocationsObservationJobsApiObservationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** BatchEditTagsApiObservations adds or removes Tags for ApiObservations. */
export interface BatchEditTagsProjectsLocationsObservationJobsApiObservationsRequest {
  /** Required. The parent resource shared by all ApiObservations being edited. Format: projects/{project}/locations/{location}/observationJobs/{observation_job} */
  parent: string;
  /** Request body */
  body?: BatchEditTagsApiObservationsRequest;
}

export const BatchEditTagsProjectsLocationsObservationJobsApiObservationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchEditTagsApiObservationsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/observationJobs/{observationJobsId}/apiObservations:batchEditTags", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchEditTagsProjectsLocationsObservationJobsApiObservationsRequest>;

export type BatchEditTagsProjectsLocationsObservationJobsApiObservationsResponse = BatchEditTagsApiObservationsResponse;
export const BatchEditTagsProjectsLocationsObservationJobsApiObservationsResponse = BatchEditTagsApiObservationsResponse;

export type BatchEditTagsProjectsLocationsObservationJobsApiObservationsError = CommonErrors;

export const batchEditTagsProjectsLocationsObservationJobsApiObservations: API.OperationMethod<BatchEditTagsProjectsLocationsObservationJobsApiObservationsRequest, BatchEditTagsProjectsLocationsObservationJobsApiObservationsResponse, BatchEditTagsProjectsLocationsObservationJobsApiObservationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchEditTagsProjectsLocationsObservationJobsApiObservationsRequest,
  output: BatchEditTagsProjectsLocationsObservationJobsApiObservationsResponse,
  errors: [],
}));

/** GetApiOperation retrieves a single ApiOperation by name. */
export interface GetProjectsLocationsObservationJobsApiObservationsApiOperationsRequest {
  /** Required. The name of the ApiOperation to retrieve. Format: projects/{project}/locations/{location}/observationJobs/{observation_job}/apiObservations/{api_observation}/apiOperation/{api_operation} */
  name: string;
}

export const GetProjectsLocationsObservationJobsApiObservationsApiOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/observationJobs/{observationJobsId}/apiObservations/{apiObservationsId}/apiOperations/{apiOperationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsObservationJobsApiObservationsApiOperationsRequest>;

export type GetProjectsLocationsObservationJobsApiObservationsApiOperationsResponse = ApiOperation;
export const GetProjectsLocationsObservationJobsApiObservationsApiOperationsResponse = ApiOperation;

export type GetProjectsLocationsObservationJobsApiObservationsApiOperationsError = CommonErrors;

export const getProjectsLocationsObservationJobsApiObservationsApiOperations: API.OperationMethod<GetProjectsLocationsObservationJobsApiObservationsApiOperationsRequest, GetProjectsLocationsObservationJobsApiObservationsApiOperationsResponse, GetProjectsLocationsObservationJobsApiObservationsApiOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsObservationJobsApiObservationsApiOperationsRequest,
  output: GetProjectsLocationsObservationJobsApiObservationsApiOperationsResponse,
  errors: [],
}));

/** ListApiOperations gets all ApiOperations for a given project and location and ObservationJob and ApiObservation. */
export interface ListProjectsLocationsObservationJobsApiObservationsApiOperationsRequest {
  /** Required. The parent, which owns this collection of ApiOperations. Format: projects/{project}/locations/{location}/observationJobs/{observation_job}/apiObservations/{api_observation} */
  parent: string;
  /** Optional. The maximum number of ApiOperations to return. The service may return fewer than this value. If unspecified, at most 10 ApiOperations will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListApiApiOperations` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListApiApiOperations` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsObservationJobsApiObservationsApiOperationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/observationJobs/{observationJobsId}/apiObservations/{apiObservationsId}/apiOperations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsObservationJobsApiObservationsApiOperationsRequest>;

export type ListProjectsLocationsObservationJobsApiObservationsApiOperationsResponse = ListApiOperationsResponse;
export const ListProjectsLocationsObservationJobsApiObservationsApiOperationsResponse = ListApiOperationsResponse;

export type ListProjectsLocationsObservationJobsApiObservationsApiOperationsError = CommonErrors;

export const listProjectsLocationsObservationJobsApiObservationsApiOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsObservationJobsApiObservationsApiOperationsRequest,
  output: ListProjectsLocationsObservationJobsApiObservationsApiOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

