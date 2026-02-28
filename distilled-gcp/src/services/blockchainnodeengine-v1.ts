// ==========================================================================
// Blockchain Node Engine API (blockchainnodeengine v1)
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
  name: "blockchainnodeengine",
  version: "v1",
  rootUrl: "https://blockchainnodeengine.googleapis.com/",
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
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface GethDetails {
  /** Immutable. Blockchain garbage collection mode. */
  garbageCollectionMode?: "GARBAGE_COLLECTION_MODE_UNSPECIFIED" | "FULL" | "ARCHIVE" | (string & {});
}

export const GethDetails: Schema.Schema<GethDetails> = Schema.suspend(() => Schema.Struct({
  garbageCollectionMode: Schema.optional(Schema.String),
})).annotate({ identifier: "GethDetails" }) as any as Schema.Schema<GethDetails>;

export interface EthereumEndpoints {
  /** Output only. The assigned URL for the node's Beacon API endpoint. */
  beaconApiEndpoint?: string;
  /** Output only. The assigned URL for the node's Beacon Prometheus metrics endpoint. See [Prometheus Metrics](https://lighthouse-book.sigmaprime.io/advanced_metrics.html) for more details. */
  beaconPrometheusMetricsApiEndpoint?: string;
  /** Output only. The assigned URL for the node's execution client's Prometheus metrics endpoint. */
  executionClientPrometheusMetricsApiEndpoint?: string;
}

export const EthereumEndpoints: Schema.Schema<EthereumEndpoints> = Schema.suspend(() => Schema.Struct({
  beaconApiEndpoint: Schema.optional(Schema.String),
  beaconPrometheusMetricsApiEndpoint: Schema.optional(Schema.String),
  executionClientPrometheusMetricsApiEndpoint: Schema.optional(Schema.String),
})).annotate({ identifier: "EthereumEndpoints" }) as any as Schema.Schema<EthereumEndpoints>;

export interface ValidatorConfig {
  /** URLs for MEV-relay services to use for block building. When set, a GCP-managed MEV-boost service is configured on the beacon client. */
  mevRelayUrls?: Array<string>;
  /** Immutable. When true, deploys a GCP-managed validator client alongside the beacon client. */
  managedValidatorClient?: boolean;
  /** An Ethereum address which the beacon client will send fee rewards to if no recipient is configured in the validator client. See https://lighthouse-book.sigmaprime.io/suggested-fee-recipient.html or https://docs.prylabs.network/docs/execution-node/fee-recipient for examples of how this is used. Note that while this is often described as "suggested", as we run the execution node we can trust the execution node, and therefore this is considered enforced. */
  beaconFeeRecipient?: string;
}

export const ValidatorConfig: Schema.Schema<ValidatorConfig> = Schema.suspend(() => Schema.Struct({
  mevRelayUrls: Schema.optional(Schema.Array(Schema.String)),
  managedValidatorClient: Schema.optional(Schema.Boolean),
  beaconFeeRecipient: Schema.optional(Schema.String),
})).annotate({ identifier: "ValidatorConfig" }) as any as Schema.Schema<ValidatorConfig>;

export interface EthereumDetails {
  /** Details for the Geth execution client. */
  gethDetails?: GethDetails;
  /** Immutable. The Ethereum environment being accessed. */
  network?: "NETWORK_UNSPECIFIED" | "MAINNET" | "TESTNET_GOERLI_PRATER" | "TESTNET_SEPOLIA" | "TESTNET_HOLESKY" | (string & {});
  /** Immutable. The type of Ethereum node. */
  nodeType?: "NODE_TYPE_UNSPECIFIED" | "LIGHT" | "FULL" | "ARCHIVE" | (string & {});
  /** Immutable. The execution client */
  executionClient?: "EXECUTION_CLIENT_UNSPECIFIED" | "GETH" | "ERIGON" | (string & {});
  /** Immutable. The consensus client. */
  consensusClient?: "CONSENSUS_CLIENT_UNSPECIFIED" | "LIGHTHOUSE" | "ERIGON_EMBEDDED_CONSENSUS_LAYER" | (string & {});
  /** Immutable. Enables JSON-RPC access to functions in the `admin` namespace. Defaults to `false`. */
  apiEnableAdmin?: boolean;
  /** Immutable. Enables JSON-RPC access to functions in the `debug` namespace. Defaults to `false`. */
  apiEnableDebug?: boolean;
  /** Output only. Ethereum-specific endpoint information. */
  additionalEndpoints?: EthereumEndpoints;
  /** Configuration for validator-related parameters on the beacon client, and for any GCP-managed validator client. */
  validatorConfig?: ValidatorConfig;
}

export const EthereumDetails: Schema.Schema<EthereumDetails> = Schema.suspend(() => Schema.Struct({
  gethDetails: Schema.optional(GethDetails),
  network: Schema.optional(Schema.String),
  nodeType: Schema.optional(Schema.String),
  executionClient: Schema.optional(Schema.String),
  consensusClient: Schema.optional(Schema.String),
  apiEnableAdmin: Schema.optional(Schema.Boolean),
  apiEnableDebug: Schema.optional(Schema.Boolean),
  additionalEndpoints: Schema.optional(EthereumEndpoints),
  validatorConfig: Schema.optional(ValidatorConfig),
})).annotate({ identifier: "EthereumDetails" }) as any as Schema.Schema<EthereumDetails>;

export interface EndpointInfo {
  /** Output only. The assigned URL for the node JSON-RPC API endpoint. */
  jsonRpcApiEndpoint?: string;
  /** Output only. The assigned URL for the node WebSockets API endpoint. */
  websocketsApiEndpoint?: string;
}

export const EndpointInfo: Schema.Schema<EndpointInfo> = Schema.suspend(() => Schema.Struct({
  jsonRpcApiEndpoint: Schema.optional(Schema.String),
  websocketsApiEndpoint: Schema.optional(Schema.String),
})).annotate({ identifier: "EndpointInfo" }) as any as Schema.Schema<EndpointInfo>;

export interface ConnectionInfo {
  /** Output only. The endpoint information through which to interact with a blockchain node. */
  endpointInfo?: EndpointInfo;
  /** Output only. A service attachment that exposes a node, and has the following format: projects/{project}/regions/{region}/serviceAttachments/{service_attachment_name} */
  serviceAttachment?: string;
}

export const ConnectionInfo: Schema.Schema<ConnectionInfo> = Schema.suspend(() => Schema.Struct({
  endpointInfo: Schema.optional(EndpointInfo),
  serviceAttachment: Schema.optional(Schema.String),
})).annotate({ identifier: "ConnectionInfo" }) as any as Schema.Schema<ConnectionInfo>;

export interface BlockchainNode {
  /** Ethereum-specific blockchain node details. */
  ethereumDetails?: EthereumDetails;
  /** Output only. The fully qualified name of the blockchain node. e.g. `projects/my-project/locations/us-central1/blockchainNodes/my-node`. */
  name?: string;
  /** Output only. The timestamp at which the blockchain node was first created. */
  createTime?: string;
  /** Output only. The timestamp at which the blockchain node was last updated. */
  updateTime?: string;
  /** User-provided key-value pairs. */
  labels?: Record<string, string>;
  /** Immutable. The blockchain type of the node. */
  blockchainType?: "BLOCKCHAIN_TYPE_UNSPECIFIED" | "ETHEREUM" | (string & {});
  /** Output only. The connection information used to interact with a blockchain node. */
  connectionInfo?: ConnectionInfo;
  /** Output only. A status representing the state of the node. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "DELETING" | "RUNNING" | "ERROR" | "UPDATING" | "REPAIRING" | "RECONCILING" | "SYNCING" | (string & {});
  /** Optional. When true, the node is only accessible via Private Service Connect; no public endpoints are exposed. Otherwise, the node is only accessible via public endpoints. Warning: These nodes are deprecated, please use public endpoints instead. */
  privateServiceConnectEnabled?: boolean;
}

export const BlockchainNode: Schema.Schema<BlockchainNode> = Schema.suspend(() => Schema.Struct({
  ethereumDetails: Schema.optional(EthereumDetails),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  blockchainType: Schema.optional(Schema.String),
  connectionInfo: Schema.optional(ConnectionInfo),
  state: Schema.optional(Schema.String),
  privateServiceConnectEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "BlockchainNode" }) as any as Schema.Schema<BlockchainNode>;

export interface ListBlockchainNodesResponse {
  /** The list of nodes */
  blockchainNodes?: Array<BlockchainNode>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBlockchainNodesResponse: Schema.Schema<ListBlockchainNodesResponse> = Schema.suspend(() => Schema.Struct({
  blockchainNodes: Schema.optional(Schema.Array(BlockchainNode)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBlockchainNodesResponse" }) as any as Schema.Schema<ListBlockchainNodesResponse>;

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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have `Operation.error` value with a `google.rpc.Status.code` of `1`, corresponding to `Code.CANCELLED`. */
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

/** Lists information about the supported locations for this service. */
export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. A list of extra location types that should be used as conditions for controlling the visibility of the locations. */
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
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
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

export type DeleteProjectsLocationsOperationsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsOperationsResponse = GoogleProtobufEmpty;

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

export type CancelProjectsLocationsOperationsResponse = GoogleProtobufEmpty;
export const CancelProjectsLocationsOperationsResponse = GoogleProtobufEmpty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Lists blockchain nodes in a given project and location. */
export interface ListProjectsLocationsBlockchainNodesRequest {
  /** Required. Parent value for `ListNodesRequest`. */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Filtering results. */
  filter?: string;
  /** Hint for how to order the results. */
  orderBy?: string;
}

export const ListProjectsLocationsBlockchainNodesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/blockchainNodes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBlockchainNodesRequest>;

export type ListProjectsLocationsBlockchainNodesResponse = ListBlockchainNodesResponse;
export const ListProjectsLocationsBlockchainNodesResponse = ListBlockchainNodesResponse;

export type ListProjectsLocationsBlockchainNodesError = CommonErrors;

export const listProjectsLocationsBlockchainNodes = API.makePaginated(() => ({
  input: ListProjectsLocationsBlockchainNodesRequest,
  output: ListProjectsLocationsBlockchainNodesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single blockchain node. */
export interface GetProjectsLocationsBlockchainNodesRequest {
  /** Required. The fully qualified name of the blockchain node to fetch. e.g. `projects/my-project/locations/us-central1/blockchainNodes/my-node`. */
  name: string;
}

export const GetProjectsLocationsBlockchainNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/blockchainNodes/{blockchainNodesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBlockchainNodesRequest>;

export type GetProjectsLocationsBlockchainNodesResponse = BlockchainNode;
export const GetProjectsLocationsBlockchainNodesResponse = BlockchainNode;

export type GetProjectsLocationsBlockchainNodesError = CommonErrors;

export const getProjectsLocationsBlockchainNodes: API.OperationMethod<GetProjectsLocationsBlockchainNodesRequest, GetProjectsLocationsBlockchainNodesResponse, GetProjectsLocationsBlockchainNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBlockchainNodesRequest,
  output: GetProjectsLocationsBlockchainNodesResponse,
  errors: [],
}));

/** Creates a new blockchain node in a given project and location. */
export interface CreateProjectsLocationsBlockchainNodesRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. ID of the requesting object. */
  blockchainNodeId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: BlockchainNode;
}

export const CreateProjectsLocationsBlockchainNodesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  blockchainNodeId: Schema.optional(Schema.String).pipe(T.HttpQuery("blockchainNodeId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(BlockchainNode).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/blockchainNodes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBlockchainNodesRequest>;

export type CreateProjectsLocationsBlockchainNodesResponse = Operation;
export const CreateProjectsLocationsBlockchainNodesResponse = Operation;

export type CreateProjectsLocationsBlockchainNodesError = CommonErrors;

export const createProjectsLocationsBlockchainNodes: API.OperationMethod<CreateProjectsLocationsBlockchainNodesRequest, CreateProjectsLocationsBlockchainNodesResponse, CreateProjectsLocationsBlockchainNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBlockchainNodesRequest,
  output: CreateProjectsLocationsBlockchainNodesResponse,
  errors: [],
}));

/** Updates the parameters of a single blockchain node. */
export interface PatchProjectsLocationsBlockchainNodesRequest {
  /** Output only. The fully qualified name of the blockchain node. e.g. `projects/my-project/locations/us-central1/blockchainNodes/my-node`. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the Blockchain node resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: BlockchainNode;
}

export const PatchProjectsLocationsBlockchainNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(BlockchainNode).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/blockchainNodes/{blockchainNodesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBlockchainNodesRequest>;

export type PatchProjectsLocationsBlockchainNodesResponse = Operation;
export const PatchProjectsLocationsBlockchainNodesResponse = Operation;

export type PatchProjectsLocationsBlockchainNodesError = CommonErrors;

export const patchProjectsLocationsBlockchainNodes: API.OperationMethod<PatchProjectsLocationsBlockchainNodesRequest, PatchProjectsLocationsBlockchainNodesResponse, PatchProjectsLocationsBlockchainNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBlockchainNodesRequest,
  output: PatchProjectsLocationsBlockchainNodesResponse,
  errors: [],
}));

/** Deletes a single blockchain node. */
export interface DeleteProjectsLocationsBlockchainNodesRequest {
  /** Required. The fully qualified name of the blockchain node to delete. e.g. `projects/my-project/locations/us-central1/blockchainNodes/my-node`. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsBlockchainNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/blockchainNodes/{blockchainNodesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBlockchainNodesRequest>;

export type DeleteProjectsLocationsBlockchainNodesResponse = Operation;
export const DeleteProjectsLocationsBlockchainNodesResponse = Operation;

export type DeleteProjectsLocationsBlockchainNodesError = CommonErrors;

export const deleteProjectsLocationsBlockchainNodes: API.OperationMethod<DeleteProjectsLocationsBlockchainNodesRequest, DeleteProjectsLocationsBlockchainNodesResponse, DeleteProjectsLocationsBlockchainNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBlockchainNodesRequest,
  output: DeleteProjectsLocationsBlockchainNodesResponse,
  errors: [],
}));

