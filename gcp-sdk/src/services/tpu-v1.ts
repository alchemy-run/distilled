// ==========================================================================
// Cloud TPU API (tpu v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "tpu",
  version: "v1",
  rootUrl: "https://tpu.googleapis.com/",
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

export const Location: Schema.Schema<Location> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    locationId: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(Location)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListLocationsResponse",
  }) as any as Schema.Schema<ListLocationsResponse>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

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

export const Operation: Schema.Schema<Operation> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    done: Schema.optional(Schema.Boolean),
    error: Schema.optional(Status),
    response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      operations: Schema.optional(Schema.Array(Operation)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface SchedulingConfig {
  /** Defines whether the node is preemptible. */
  preemptible?: boolean;
  /** Whether the node is created under a reservation. */
  reserved?: boolean;
}

export const SchedulingConfig: Schema.Schema<SchedulingConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      preemptible: Schema.optional(Schema.Boolean),
      reserved: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "SchedulingConfig",
}) as any as Schema.Schema<SchedulingConfig>;

export interface NetworkEndpoint {
  /** The IP address of this network endpoint. */
  ipAddress?: string;
  /** The port of this network endpoint. */
  port?: number;
}

export const NetworkEndpoint: Schema.Schema<NetworkEndpoint> = Schema.suspend(
  () =>
    Schema.Struct({
      ipAddress: Schema.optional(Schema.String),
      port: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "NetworkEndpoint",
}) as any as Schema.Schema<NetworkEndpoint>;

export interface Symptom {
  /** Timestamp when the Symptom is created. */
  createTime?: string;
  /** Type of the Symptom. */
  symptomType?:
    | "SYMPTOM_TYPE_UNSPECIFIED"
    | "LOW_MEMORY"
    | "OUT_OF_MEMORY"
    | "EXECUTE_TIMED_OUT"
    | "MESH_BUILD_FAIL"
    | "HBM_OUT_OF_MEMORY"
    | "PROJECT_ABUSE"
    | (string & {});
  /** Detailed information of the current Symptom. */
  details?: string;
  /** A string used to uniquely distinguish a worker within a TPU node. */
  workerId?: string;
}

export const Symptom: Schema.Schema<Symptom> = Schema.suspend(() =>
  Schema.Struct({
    createTime: Schema.optional(Schema.String),
    symptomType: Schema.optional(Schema.String),
    details: Schema.optional(Schema.String),
    workerId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Symptom" }) as any as Schema.Schema<Symptom>;

export interface Node {
  /** Output only. Immutable. The name of the TPU */
  name?: string;
  /** The user-supplied description of the TPU. Maximum of 512 characters. */
  description?: string;
  /** Required. The type of hardware accelerators associated with this node. */
  acceleratorType?: string;
  /** Output only. DEPRECATED! Use network_endpoints instead. The network address for the TPU Node as visible to Compute Engine instances. */
  ipAddress?: string;
  /** Output only. DEPRECATED! Use network_endpoints instead. The network port for the TPU Node as visible to Compute Engine instances. */
  port?: string;
  /** Output only. The current state for the TPU Node. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "READY"
    | "RESTARTING"
    | "REIMAGING"
    | "DELETING"
    | "REPAIRING"
    | "STOPPED"
    | "STOPPING"
    | "STARTING"
    | "PREEMPTED"
    | "TERMINATED"
    | "HIDING"
    | "HIDDEN"
    | "UNHIDING"
    | "UNKNOWN"
    | (string & {});
  /** Output only. If this field is populated, it contains a description of why the TPU Node is unhealthy. */
  healthDescription?: string;
  /** Required. The version of Tensorflow running in the Node. */
  tensorflowVersion?: string;
  /** The name of a network they wish to peer the TPU node to. It must be a preexisting Compute Engine network inside of the project on which this API has been activated. If none is provided, "default" will be used. */
  network?: string;
  /** The CIDR block that the TPU node will use when selecting an IP address. This CIDR block must be a /29 block; the Compute Engine networks API forbids a smaller block, and using a larger block would be wasteful (a node can only consume one IP address). Errors will occur if the CIDR block has already been used for a currently existing TPU node, the CIDR block conflicts with any subnetworks in the user's provided network, or the provided network is peered with another network that is using that CIDR block. */
  cidrBlock?: string;
  /** Output only. The service account used to run the tensor flow services within the node. To share resources, including Google Cloud Storage data, with the Tensorflow job running in the Node, this account must have permissions to that data. */
  serviceAccount?: string;
  /** Output only. The time when the node was created. */
  createTime?: string;
  /** The scheduling options for this node. */
  schedulingConfig?: SchedulingConfig;
  /** Output only. The network endpoints where TPU workers can be accessed and sent work. It is recommended that Tensorflow clients of the node reach out to the 0th entry in this map first. */
  networkEndpoints?: Array<NetworkEndpoint>;
  /** The health status of the TPU node. */
  health?:
    | "HEALTH_UNSPECIFIED"
    | "HEALTHY"
    | "DEPRECATED_UNHEALTHY"
    | "TIMEOUT"
    | "UNHEALTHY_TENSORFLOW"
    | "UNHEALTHY_MAINTENANCE"
    | (string & {});
  /** Resource labels to represent user-provided metadata. */
  labels?: Record<string, string>;
  /** Whether the VPC peering for the node is set up through Service Networking API. The VPC Peering should be set up before provisioning the node. If this field is set, cidr_block field should not be specified. If the network, that you want to peer the TPU Node to, is Shared VPC networks, the node must be created with this this field enabled. */
  useServiceNetworking?: boolean;
  /** Output only. The API version that created this Node. */
  apiVersion?:
    | "API_VERSION_UNSPECIFIED"
    | "V1_ALPHA1"
    | "V1"
    | "V2_ALPHA1"
    | (string & {});
  /** Output only. The Symptoms that have occurred to the TPU Node. */
  symptoms?: Array<Symptom>;
}

export const Node: Schema.Schema<Node> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    acceleratorType: Schema.optional(Schema.String),
    ipAddress: Schema.optional(Schema.String),
    port: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    healthDescription: Schema.optional(Schema.String),
    tensorflowVersion: Schema.optional(Schema.String),
    network: Schema.optional(Schema.String),
    cidrBlock: Schema.optional(Schema.String),
    serviceAccount: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    schedulingConfig: Schema.optional(SchedulingConfig),
    networkEndpoints: Schema.optional(Schema.Array(NetworkEndpoint)),
    health: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    useServiceNetworking: Schema.optional(Schema.Boolean),
    apiVersion: Schema.optional(Schema.String),
    symptoms: Schema.optional(Schema.Array(Symptom)),
  }),
).annotate({ identifier: "Node" }) as any as Schema.Schema<Node>;

export interface ListNodesResponse {
  /** The listed nodes. */
  nodes?: Array<Node>;
  /** The next page token or empty if none. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListNodesResponse: Schema.Schema<ListNodesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nodes: Schema.optional(Schema.Array(Node)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListNodesResponse",
  }) as any as Schema.Schema<ListNodesResponse>;

export interface ReimageNodeRequest {
  /** The version for reimage to create. */
  tensorflowVersion?: string;
}

export const ReimageNodeRequest: Schema.Schema<ReimageNodeRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      tensorflowVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ReimageNodeRequest",
  }) as any as Schema.Schema<ReimageNodeRequest>;

export interface StopNodeRequest {}

export const StopNodeRequest: Schema.Schema<StopNodeRequest> = Schema.suspend(
  () => Schema.Struct({}),
).annotate({
  identifier: "StopNodeRequest",
}) as any as Schema.Schema<StopNodeRequest>;

export interface StartNodeRequest {}

export const StartNodeRequest: Schema.Schema<StartNodeRequest> = Schema.suspend(
  () => Schema.Struct({}),
).annotate({
  identifier: "StartNodeRequest",
}) as any as Schema.Schema<StartNodeRequest>;

export interface TensorFlowVersion {
  /** The resource name. */
  name?: string;
  /** the tensorflow version. */
  version?: string;
}

export const TensorFlowVersion: Schema.Schema<TensorFlowVersion> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TensorFlowVersion",
  }) as any as Schema.Schema<TensorFlowVersion>;

export interface ListTensorFlowVersionsResponse {
  /** The listed nodes. */
  tensorflowVersions?: Array<TensorFlowVersion>;
  /** The next page token or empty if none. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListTensorFlowVersionsResponse: Schema.Schema<ListTensorFlowVersionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      tensorflowVersions: Schema.optional(Schema.Array(TensorFlowVersion)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListTensorFlowVersionsResponse",
  }) as any as Schema.Schema<ListTensorFlowVersionsResponse>;

export interface AcceleratorType {
  /** The resource name. */
  name?: string;
  /** the accelerator type. */
  type?: string;
}

export const AcceleratorType: Schema.Schema<AcceleratorType> = Schema.suspend(
  () =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "AcceleratorType",
}) as any as Schema.Schema<AcceleratorType>;

export interface ListAcceleratorTypesResponse {
  /** The listed nodes. */
  acceleratorTypes?: Array<AcceleratorType>;
  /** The next page token or empty if none. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListAcceleratorTypesResponse: Schema.Schema<ListAcceleratorTypesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      acceleratorTypes: Schema.optional(Schema.Array(AcceleratorType)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListAcceleratorTypesResponse",
  }) as any as Schema.Schema<ListAcceleratorTypesResponse>;

export interface OperationMetadata {
  /** The time the operation was created. */
  createTime?: string;
  /** The time the operation finished running. */
  endTime?: string;
  /** Target of the operation - for example projects/project-1/connectivityTests/test-1 */
  target?: string;
  /** Name of the verb executed by the operation. */
  verb?: string;
  /** Human-readable status of the operation, if any. */
  statusDetail?: string;
  /** Specifies if cancellation was requested for the operation. */
  cancelRequested?: boolean;
  /** API version. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      statusDetail: Schema.optional(Schema.String),
      cancelRequested: Schema.optional(Schema.Boolean),
      apiVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OperationMetadata",
  }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

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
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("extraLocationTypes"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<
  ListProjectsLocationsRequest,
  ListProjectsLocationsResponse,
  ListProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<
  GetProjectsLocationsRequest,
  GetProjectsLocationsResponse,
  GetProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

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
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("returnPartialSuccess"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsOperationsRequest,
  ListProjectsLocationsOperationsResponse,
  ListProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<
  GetProjectsLocationsOperationsRequest,
  GetProjectsLocationsOperationsResponse,
  GetProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<
  DeleteProjectsLocationsOperationsRequest,
  DeleteProjectsLocationsOperationsResponse,
  DeleteProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<
  CancelProjectsLocationsOperationsRequest,
  CancelProjectsLocationsOperationsResponse,
  CancelProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsNodesRequest {
  /** Required. The parent resource name. */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsNodesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/nodes",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsNodesRequest>;

export type ListProjectsLocationsNodesResponse = ListNodesResponse;
export const ListProjectsLocationsNodesResponse = ListNodesResponse;

export type ListProjectsLocationsNodesError = DefaultErrors;

/** Lists nodes. */
export const listProjectsLocationsNodes: API.PaginatedOperationMethod<
  ListProjectsLocationsNodesRequest,
  ListProjectsLocationsNodesResponse,
  ListProjectsLocationsNodesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsNodesRequest,
  output: ListProjectsLocationsNodesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsNodesRequest {
  /** Required. The resource name. */
  name: string;
}

export const GetProjectsLocationsNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/nodes/{nodesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsNodesRequest>;

export type GetProjectsLocationsNodesResponse = Node;
export const GetProjectsLocationsNodesResponse = Node;

export type GetProjectsLocationsNodesError = DefaultErrors;

/** Gets the details of a node. */
export const getProjectsLocationsNodes: API.OperationMethod<
  GetProjectsLocationsNodesRequest,
  GetProjectsLocationsNodesResponse,
  GetProjectsLocationsNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsNodesRequest,
  output: GetProjectsLocationsNodesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsNodesRequest {
  /** Required. The parent resource name. */
  parent: string;
  /** The unqualified resource name. */
  nodeId?: string;
  /** Request body */
  body?: Node;
}

export const CreateProjectsLocationsNodesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  nodeId: Schema.optional(Schema.String).pipe(T.HttpQuery("nodeId")),
  body: Schema.optional(Node).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/nodes",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsNodesRequest>;

export type CreateProjectsLocationsNodesResponse = Operation;
export const CreateProjectsLocationsNodesResponse = Operation;

export type CreateProjectsLocationsNodesError = DefaultErrors;

/** Creates a node. */
export const createProjectsLocationsNodes: API.OperationMethod<
  CreateProjectsLocationsNodesRequest,
  CreateProjectsLocationsNodesResponse,
  CreateProjectsLocationsNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsNodesRequest,
  output: CreateProjectsLocationsNodesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsNodesRequest {
  /** Required. The resource name. */
  name: string;
}

export const DeleteProjectsLocationsNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/nodes/{nodesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsNodesRequest>;

export type DeleteProjectsLocationsNodesResponse = Operation;
export const DeleteProjectsLocationsNodesResponse = Operation;

export type DeleteProjectsLocationsNodesError = DefaultErrors;

/** Deletes a node. */
export const deleteProjectsLocationsNodes: API.OperationMethod<
  DeleteProjectsLocationsNodesRequest,
  DeleteProjectsLocationsNodesResponse,
  DeleteProjectsLocationsNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsNodesRequest,
  output: DeleteProjectsLocationsNodesResponse,
  errors: [],
}));

export interface ReimageProjectsLocationsNodesRequest {
  /** The resource name. */
  name: string;
  /** Request body */
  body?: ReimageNodeRequest;
}

export const ReimageProjectsLocationsNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ReimageNodeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/nodes/{nodesId}:reimage",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ReimageProjectsLocationsNodesRequest>;

export type ReimageProjectsLocationsNodesResponse = Operation;
export const ReimageProjectsLocationsNodesResponse = Operation;

export type ReimageProjectsLocationsNodesError = DefaultErrors;

/** Reimages a node's OS. */
export const reimageProjectsLocationsNodes: API.OperationMethod<
  ReimageProjectsLocationsNodesRequest,
  ReimageProjectsLocationsNodesResponse,
  ReimageProjectsLocationsNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ReimageProjectsLocationsNodesRequest,
  output: ReimageProjectsLocationsNodesResponse,
  errors: [],
}));

export interface StopProjectsLocationsNodesRequest {
  /** The resource name. */
  name: string;
  /** Request body */
  body?: StopNodeRequest;
}

export const StopProjectsLocationsNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StopNodeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/nodes/{nodesId}:stop",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<StopProjectsLocationsNodesRequest>;

export type StopProjectsLocationsNodesResponse = Operation;
export const StopProjectsLocationsNodesResponse = Operation;

export type StopProjectsLocationsNodesError = DefaultErrors;

/** Stops a node, this operation is only available with single TPU nodes. */
export const stopProjectsLocationsNodes: API.OperationMethod<
  StopProjectsLocationsNodesRequest,
  StopProjectsLocationsNodesResponse,
  StopProjectsLocationsNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: StopProjectsLocationsNodesRequest,
  output: StopProjectsLocationsNodesResponse,
  errors: [],
}));

export interface StartProjectsLocationsNodesRequest {
  /** The resource name. */
  name: string;
  /** Request body */
  body?: StartNodeRequest;
}

export const StartProjectsLocationsNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StartNodeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/nodes/{nodesId}:start",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<StartProjectsLocationsNodesRequest>;

export type StartProjectsLocationsNodesResponse = Operation;
export const StartProjectsLocationsNodesResponse = Operation;

export type StartProjectsLocationsNodesError = DefaultErrors;

/** Starts a node. */
export const startProjectsLocationsNodes: API.OperationMethod<
  StartProjectsLocationsNodesRequest,
  StartProjectsLocationsNodesResponse,
  StartProjectsLocationsNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: StartProjectsLocationsNodesRequest,
  output: StartProjectsLocationsNodesResponse,
  errors: [],
}));

export interface ListProjectsLocationsTensorflowVersionsRequest {
  /** Required. The parent resource name. */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** List filter. */
  filter?: string;
  /** Sort results. */
  orderBy?: string;
}

export const ListProjectsLocationsTensorflowVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/tensorflowVersions",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsTensorflowVersionsRequest>;

export type ListProjectsLocationsTensorflowVersionsResponse =
  ListTensorFlowVersionsResponse;
export const ListProjectsLocationsTensorflowVersionsResponse =
  ListTensorFlowVersionsResponse;

export type ListProjectsLocationsTensorflowVersionsError = DefaultErrors;

/** List TensorFlow versions supported by this API. */
export const listProjectsLocationsTensorflowVersions: API.PaginatedOperationMethod<
  ListProjectsLocationsTensorflowVersionsRequest,
  ListProjectsLocationsTensorflowVersionsResponse,
  ListProjectsLocationsTensorflowVersionsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsTensorflowVersionsRequest,
  output: ListProjectsLocationsTensorflowVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsTensorflowVersionsRequest {
  /** Required. The resource name. */
  name: string;
}

export const GetProjectsLocationsTensorflowVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/tensorflowVersions/{tensorflowVersionsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsTensorflowVersionsRequest>;

export type GetProjectsLocationsTensorflowVersionsResponse = TensorFlowVersion;
export const GetProjectsLocationsTensorflowVersionsResponse = TensorFlowVersion;

export type GetProjectsLocationsTensorflowVersionsError = DefaultErrors;

/** Gets TensorFlow Version. */
export const getProjectsLocationsTensorflowVersions: API.OperationMethod<
  GetProjectsLocationsTensorflowVersionsRequest,
  GetProjectsLocationsTensorflowVersionsResponse,
  GetProjectsLocationsTensorflowVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsTensorflowVersionsRequest,
  output: GetProjectsLocationsTensorflowVersionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAcceleratorTypesRequest {
  /** Required. The parent resource name. */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** List filter. */
  filter?: string;
  /** Sort results. */
  orderBy?: string;
}

export const ListProjectsLocationsAcceleratorTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/acceleratorTypes",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAcceleratorTypesRequest>;

export type ListProjectsLocationsAcceleratorTypesResponse =
  ListAcceleratorTypesResponse;
export const ListProjectsLocationsAcceleratorTypesResponse =
  ListAcceleratorTypesResponse;

export type ListProjectsLocationsAcceleratorTypesError = DefaultErrors;

/** Lists accelerator types supported by this API. */
export const listProjectsLocationsAcceleratorTypes: API.PaginatedOperationMethod<
  ListProjectsLocationsAcceleratorTypesRequest,
  ListProjectsLocationsAcceleratorTypesResponse,
  ListProjectsLocationsAcceleratorTypesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAcceleratorTypesRequest,
  output: ListProjectsLocationsAcceleratorTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAcceleratorTypesRequest {
  /** Required. The resource name. */
  name: string;
}

export const GetProjectsLocationsAcceleratorTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/acceleratorTypes/{acceleratorTypesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAcceleratorTypesRequest>;

export type GetProjectsLocationsAcceleratorTypesResponse = AcceleratorType;
export const GetProjectsLocationsAcceleratorTypesResponse = AcceleratorType;

export type GetProjectsLocationsAcceleratorTypesError = DefaultErrors;

/** Gets AcceleratorType. */
export const getProjectsLocationsAcceleratorTypes: API.OperationMethod<
  GetProjectsLocationsAcceleratorTypesRequest,
  GetProjectsLocationsAcceleratorTypesResponse,
  GetProjectsLocationsAcceleratorTypesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAcceleratorTypesRequest,
  output: GetProjectsLocationsAcceleratorTypesResponse,
  errors: [],
}));
