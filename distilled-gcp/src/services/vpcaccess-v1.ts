// ==========================================================================
// Serverless VPC Access API (vpcaccess v1)
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
  name: "vpcaccess",
  version: "v1",
  rootUrl: "https://vpcaccess.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

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

export interface Subnet {
  /** Optional. Subnet name (relative, not fully qualified). E.g. if the full subnet selfLink is https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/subnetworks/{subnetName} the correct input for this field would be {subnetName} */
  name?: string;
  /** Optional. Project in which the subnet exists. If not set, this project is assumed to be the project for which the connector create request was issued. */
  projectId?: string;
}

export const Subnet: Schema.Schema<Subnet> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "Subnet" }) as any as Schema.Schema<Subnet>;

export interface Connector {
  /** The resource name in the format `projects/* /locations/* /connectors/*`. */
  name?: string;
  /** Optional. Name of a VPC network. */
  network?: string;
  /** Optional. The range of internal addresses that follows RFC 4632 notation. Example: `10.132.0.0/28`. */
  ipCidrRange?: string;
  /** Output only. State of the VPC access connector. */
  state?: "STATE_UNSPECIFIED" | "READY" | "CREATING" | "DELETING" | "ERROR" | "UPDATING" | (string & {});
  /** Minimum throughput of the connector in Mbps. Refers to the expected throughput when using an `e2-micro` machine type. Value must be a multiple of 100 from 200 through 900. Must be lower than the value specified by --max-throughput. If both min-throughput and min-instances are provided, min-instances takes precedence over min-throughput. The use of `min-throughput` is discouraged in favor of `min-instances`. */
  minThroughput?: number;
  /** Maximum throughput of the connector in Mbps. Refers to the expected throughput when using an `e2-micro` machine type. Value must be a multiple of 100 from 300 through 1000. Must be higher than the value specified by --min-throughput. If both max-throughput and max-instances are provided, max-instances takes precedence over max-throughput. The use of `max-throughput` is discouraged in favor of `max-instances`. */
  maxThroughput?: number;
  /** Output only. List of projects using the connector. */
  connectedProjects?: Array<string>;
  /** Optional. The subnet in which to house the VPC Access Connector. */
  subnet?: Subnet;
  /** Machine type of VM Instance underlying connector. Default is e2-micro */
  machineType?: string;
  /** Minimum value of instances in autoscaling group underlying the connector. */
  minInstances?: number;
  /** Maximum value of instances in autoscaling group underlying the connector. */
  maxInstances?: number;
}

export const Connector: Schema.Schema<Connector> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  ipCidrRange: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  minThroughput: Schema.optional(Schema.Number),
  maxThroughput: Schema.optional(Schema.Number),
  connectedProjects: Schema.optional(Schema.Array(Schema.String)),
  subnet: Schema.optional(Subnet),
  machineType: Schema.optional(Schema.String),
  minInstances: Schema.optional(Schema.Number),
  maxInstances: Schema.optional(Schema.Number),
})).annotate({ identifier: "Connector" }) as any as Schema.Schema<Connector>;

export interface ListConnectorsResponse {
  /** List of Serverless VPC Access connectors. */
  connectors?: Array<Connector>;
  /** Continuation token. */
  nextPageToken?: string;
}

export const ListConnectorsResponse: Schema.Schema<ListConnectorsResponse> = Schema.suspend(() => Schema.Struct({
  connectors: Schema.optional(Schema.Array(Connector)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListConnectorsResponse" }) as any as Schema.Schema<ListConnectorsResponse>;

export interface OperationMetadataV1Alpha1 {
  /** Output only. Method that initiated the operation e.g. google.cloud.vpcaccess.v1alpha1.Connectors.CreateConnector. */
  method?: string;
  /** Output only. Time when the operation was created. */
  insertTime?: string;
  /** Output only. Time when the operation completed. */
  endTime?: string;
  /** Output only. Name of the resource that this operation is acting on e.g. projects/my-project/locations/us-central1/connectors/v1. */
  target?: string;
}

export const OperationMetadataV1Alpha1: Schema.Schema<OperationMetadataV1Alpha1> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.String),
  insertTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadataV1Alpha1" }) as any as Schema.Schema<OperationMetadataV1Alpha1>;

export interface OperationMetadataV1Beta1 {
  /** Output only. Method that initiated the operation e.g. google.cloud.vpcaccess.v1beta1.Connectors.CreateConnector. */
  method?: string;
  /** Output only. Time when the operation was created. */
  createTime?: string;
  /** Output only. Time when the operation completed. */
  endTime?: string;
  /** Output only. Name of the resource that this operation is acting on e.g. projects/my-project/locations/us-central1/connectors/v1. */
  target?: string;
}

export const OperationMetadataV1Beta1: Schema.Schema<OperationMetadataV1Beta1> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadataV1Beta1" }) as any as Schema.Schema<OperationMetadataV1Beta1>;

export interface OperationMetadata {
  /** Output only. Method that initiated the operation e.g. google.cloud.vpcaccess.v1.Connectors.CreateConnector. */
  method?: string;
  /** Output only. Time when the operation was created. */
  createTime?: string;
  /** Output only. Time when the operation completed. */
  endTime?: string;
  /** Output only. Name of the resource that this operation is acting on e.g. projects/my-project/locations/us-central1/connectors/v1. */
  target?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

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

/** Creates a Serverless VPC Access connector, returns an operation. */
export interface CreateProjectsLocationsConnectorsRequest {
  /** Required. The project ID and location in which the configuration should be created, specified in the format `projects/* /locations/*`. */
  parent: string;
  /** Required. The ID to use for this connector. */
  connectorId?: string;
  /** Request body */
  body?: Connector;
}

export const CreateProjectsLocationsConnectorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  connectorId: Schema.optional(Schema.String).pipe(T.HttpQuery("connectorId")),
  body: Schema.optional(Connector).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connectors", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsConnectorsRequest>;

export type CreateProjectsLocationsConnectorsResponse = Operation;
export const CreateProjectsLocationsConnectorsResponse = Operation;

export type CreateProjectsLocationsConnectorsError = CommonErrors;

export const createProjectsLocationsConnectors: API.OperationMethod<CreateProjectsLocationsConnectorsRequest, CreateProjectsLocationsConnectorsResponse, CreateProjectsLocationsConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsConnectorsRequest,
  output: CreateProjectsLocationsConnectorsResponse,
  errors: [],
}));

/** Updates a Serverless VPC Access connector, returns an operation. */
export interface PatchProjectsLocationsConnectorsRequest {
  /** The resource name in the format `projects/* /locations/* /connectors/*`. */
  name: string;
  /** The fields to update on the entry group. If absent or empty, all modifiable fields are updated. */
  updateMask?: string;
  /** Request body */
  body?: Connector;
}

export const PatchProjectsLocationsConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Connector).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/connectors/{connectorsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsConnectorsRequest>;

export type PatchProjectsLocationsConnectorsResponse = Operation;
export const PatchProjectsLocationsConnectorsResponse = Operation;

export type PatchProjectsLocationsConnectorsError = CommonErrors;

export const patchProjectsLocationsConnectors: API.OperationMethod<PatchProjectsLocationsConnectorsRequest, PatchProjectsLocationsConnectorsResponse, PatchProjectsLocationsConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsConnectorsRequest,
  output: PatchProjectsLocationsConnectorsResponse,
  errors: [],
}));

/** Gets a Serverless VPC Access connector. Returns NOT_FOUND if the resource does not exist. */
export interface GetProjectsLocationsConnectorsRequest {
  /** Required. Name of a Serverless VPC Access connector to get. */
  name: string;
}

export const GetProjectsLocationsConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connectors/{connectorsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConnectorsRequest>;

export type GetProjectsLocationsConnectorsResponse = Connector;
export const GetProjectsLocationsConnectorsResponse = Connector;

export type GetProjectsLocationsConnectorsError = CommonErrors;

export const getProjectsLocationsConnectors: API.OperationMethod<GetProjectsLocationsConnectorsRequest, GetProjectsLocationsConnectorsResponse, GetProjectsLocationsConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConnectorsRequest,
  output: GetProjectsLocationsConnectorsResponse,
  errors: [],
}));

/** Lists Serverless VPC Access connectors. */
export interface ListProjectsLocationsConnectorsRequest {
  /** Required. The project and location from which the routes should be listed. */
  parent: string;
  /** Maximum number of functions to return per call. */
  pageSize?: number;
  /** Continuation token. */
  pageToken?: string;
}

export const ListProjectsLocationsConnectorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connectors" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectorsRequest>;

export type ListProjectsLocationsConnectorsResponse = ListConnectorsResponse;
export const ListProjectsLocationsConnectorsResponse = ListConnectorsResponse;

export type ListProjectsLocationsConnectorsError = CommonErrors;

export const listProjectsLocationsConnectors = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectorsRequest,
  output: ListProjectsLocationsConnectorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a Serverless VPC Access connector. Returns NOT_FOUND if the resource does not exist. */
export interface DeleteProjectsLocationsConnectorsRequest {
  /** Required. Name of a Serverless VPC Access connector to delete. */
  name: string;
}

export const DeleteProjectsLocationsConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/connectors/{connectorsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsConnectorsRequest>;

export type DeleteProjectsLocationsConnectorsResponse = Operation;
export const DeleteProjectsLocationsConnectorsResponse = Operation;

export type DeleteProjectsLocationsConnectorsError = CommonErrors;

export const deleteProjectsLocationsConnectors: API.OperationMethod<DeleteProjectsLocationsConnectorsRequest, DeleteProjectsLocationsConnectorsResponse, DeleteProjectsLocationsConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsConnectorsRequest,
  output: DeleteProjectsLocationsConnectorsResponse,
  errors: [],
}));

