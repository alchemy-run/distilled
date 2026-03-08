// ==========================================================================
// BeyondCorp API (beyondcorp v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "beyondcorp",
  version: "v1",
  rootUrl: "https://beyondcorp.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleRpcStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleLongrunningOperation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(GoogleRpcStatus),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleLongrunningOperation" }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleLongrunningListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunningOperation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleLongrunningListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface GoogleLongrunningCancelOperationRequest {
}

export const GoogleLongrunningCancelOperationRequest: Schema.Schema<GoogleLongrunningCancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleLongrunningCancelOperationRequest" }) as any as Schema.Schema<GoogleLongrunningCancelOperationRequest>;

export interface GoogleCloudBeyondcorpAppconnectionsV1AppConnectionApplicationEndpoint {
  /** Required. Hostname or IP address of the remote application endpoint. */
  host?: string;
  /** Required. Port of the remote application endpoint. */
  port?: number;
}

export const GoogleCloudBeyondcorpAppconnectionsV1AppConnectionApplicationEndpoint: Schema.Schema<GoogleCloudBeyondcorpAppconnectionsV1AppConnectionApplicationEndpoint> = Schema.suspend(() => Schema.Struct({
  host: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectionsV1AppConnectionApplicationEndpoint" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectionsV1AppConnectionApplicationEndpoint>;

export interface GoogleCloudBeyondcorpAppconnectionsV1AppConnectionGateway {
  /** Required. The type of hosting used by the gateway. */
  type?: "TYPE_UNSPECIFIED" | "GCP_REGIONAL_MIG" | (string & {});
  /** Output only. Server-defined URI for this resource. */
  uri?: string;
  /** Output only. Ingress port reserved on the gateways for this AppConnection, if not specified or zero, the default port is 19443. */
  ingressPort?: number;
  /** Required. AppGateway name in following format: `projects/{project_id}/locations/{location_id}/appgateways/{gateway_id}` */
  appGateway?: string;
  /** Output only. L7 private service connection for this resource. */
  l7psc?: string;
}

export const GoogleCloudBeyondcorpAppconnectionsV1AppConnectionGateway: Schema.Schema<GoogleCloudBeyondcorpAppconnectionsV1AppConnectionGateway> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  ingressPort: Schema.optional(Schema.Number),
  appGateway: Schema.optional(Schema.String),
  l7psc: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectionsV1AppConnectionGateway" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectionsV1AppConnectionGateway>;

export interface GoogleCloudBeyondcorpAppconnectionsV1AppConnection {
  /** Required. Unique resource name of the AppConnection. The name is ignored when creating a AppConnection. */
  name?: string;
  /** Output only. Timestamp when the resource was created. */
  createTime?: string;
  /** Output only. Timestamp when the resource was last modified. */
  updateTime?: string;
  /** Optional. Resource labels to represent user provided metadata. */
  labels?: Record<string, string>;
  /** Optional. An arbitrary user-provided name for the AppConnection. Cannot exceed 64 characters. */
  displayName?: string;
  /** Output only. A unique identifier for the instance generated by the system. */
  uid?: string;
  /** Required. The type of network connectivity used by the AppConnection. */
  type?: "TYPE_UNSPECIFIED" | "TCP_PROXY" | (string & {});
  /** Required. Address of the remote application endpoint for the BeyondCorp AppConnection. */
  applicationEndpoint?: GoogleCloudBeyondcorpAppconnectionsV1AppConnectionApplicationEndpoint;
  /** Optional. List of [google.cloud.beyondcorp.v1main.Connector.name] that are authorised to be associated with this AppConnection. */
  connectors?: Array<string>;
  /** Output only. The current state of the AppConnection. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "CREATED" | "UPDATING" | "DELETING" | "DOWN" | (string & {});
  /** Optional. Gateway used by the AppConnection. */
  gateway?: GoogleCloudBeyondcorpAppconnectionsV1AppConnectionGateway;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
}

export const GoogleCloudBeyondcorpAppconnectionsV1AppConnection: Schema.Schema<GoogleCloudBeyondcorpAppconnectionsV1AppConnection> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  applicationEndpoint: Schema.optional(GoogleCloudBeyondcorpAppconnectionsV1AppConnectionApplicationEndpoint),
  connectors: Schema.optional(Schema.Array(Schema.String)),
  state: Schema.optional(Schema.String),
  gateway: Schema.optional(GoogleCloudBeyondcorpAppconnectionsV1AppConnectionGateway),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectionsV1AppConnection" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectionsV1AppConnection>;

export interface GoogleCloudBeyondcorpAppconnectionsV1ListAppConnectionsResponse {
  /** A list of BeyondCorp AppConnections in the project. */
  appConnections?: Array<GoogleCloudBeyondcorpAppconnectionsV1AppConnection>;
  /** A token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** A list of locations that could not be reached. */
  unreachable?: Array<string>;
}

export const GoogleCloudBeyondcorpAppconnectionsV1ListAppConnectionsResponse: Schema.Schema<GoogleCloudBeyondcorpAppconnectionsV1ListAppConnectionsResponse> = Schema.suspend(() => Schema.Struct({
  appConnections: Schema.optional(Schema.Array(GoogleCloudBeyondcorpAppconnectionsV1AppConnection)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectionsV1ListAppConnectionsResponse" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectionsV1ListAppConnectionsResponse>;

export interface GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponseAppConnectionDetails {
  /** A BeyondCorp AppConnection in the project. */
  appConnection?: GoogleCloudBeyondcorpAppconnectionsV1AppConnection;
  /** If type=GCP_REGIONAL_MIG, contains most recent VM instances, like `https://www.googleapis.com/compute/v1/projects/{project_id}/zones/{zone_id}/instances/{instance_id}`. */
  recentMigVms?: Array<string>;
}

export const GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponseAppConnectionDetails: Schema.Schema<GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponseAppConnectionDetails> = Schema.suspend(() => Schema.Struct({
  appConnection: Schema.optional(GoogleCloudBeyondcorpAppconnectionsV1AppConnection),
  recentMigVms: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponseAppConnectionDetails" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponseAppConnectionDetails>;

export interface GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponse {
  /** A list of BeyondCorp AppConnections with details in the project. */
  appConnectionDetails?: Array<GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponseAppConnectionDetails>;
  /** A token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** A list of locations that could not be reached. */
  unreachable?: Array<string>;
}

export const GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponse: Schema.Schema<GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponse> = Schema.suspend(() => Schema.Struct({
  appConnectionDetails: Schema.optional(Schema.Array(GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponseAppConnectionDetails)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponse" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponse>;

export interface GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfoServiceAccount {
  /** Email address of the service account. */
  email?: string;
}

export const GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfoServiceAccount: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfoServiceAccount> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfoServiceAccount" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfoServiceAccount>;

export interface GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfo {
  /** A GCP service account. */
  serviceAccount?: GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfoServiceAccount;
}

export const GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfo: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfo> = Schema.suspend(() => Schema.Struct({
  serviceAccount: Schema.optional(GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfoServiceAccount),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfo" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfo>;

export interface GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo {
  /** Required. Unique Id for the resource. */
  id?: string;
  /** Overall health status. Overall status is derived based on the status of each sub level resources. */
  status?: "HEALTH_STATUS_UNSPECIFIED" | "HEALTHY" | "UNHEALTHY" | "UNRESPONSIVE" | "DEGRADED" | (string & {});
  /** Specific details for the resource. This is for internal use only. */
  resource?: Record<string, unknown>;
  /** The timestamp to collect the info. It is suggested to be set by the topmost level resource only. */
  time?: string;
  /** List of Info for the sub level resources. */
  sub?: Array<GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo>;
}

export const GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  time: Schema.optional(Schema.String),
  sub: Schema.optional(Schema.Array(GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo)),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo>;

export interface GoogleCloudBeyondcorpAppconnectorsV1AppConnector {
  /** Required. Unique resource name of the AppConnector. The name is ignored when creating a AppConnector. */
  name?: string;
  /** Output only. Timestamp when the resource was created. */
  createTime?: string;
  /** Output only. Timestamp when the resource was last modified. */
  updateTime?: string;
  /** Optional. Resource labels to represent user provided metadata. */
  labels?: Record<string, string>;
  /** Optional. An arbitrary user-provided name for the AppConnector. Cannot exceed 64 characters. */
  displayName?: string;
  /** Output only. A unique identifier for the instance generated by the system. */
  uid?: string;
  /** Output only. The current state of the AppConnector. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "CREATED" | "UPDATING" | "DELETING" | "DOWN" | (string & {});
  /** Required. Principal information about the Identity of the AppConnector. */
  principalInfo?: GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfo;
  /** Optional. Resource info of the connector. */
  resourceInfo?: GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo;
}

export const GoogleCloudBeyondcorpAppconnectorsV1AppConnector: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1AppConnector> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  principalInfo: Schema.optional(GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfo),
  resourceInfo: Schema.optional(GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1AppConnector" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1AppConnector>;

export interface GoogleCloudBeyondcorpAppconnectorsV1ListAppConnectorsResponse {
  /** A list of BeyondCorp AppConnectors in the project. */
  appConnectors?: Array<GoogleCloudBeyondcorpAppconnectorsV1AppConnector>;
  /** A token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** A list of locations that could not be reached. */
  unreachable?: Array<string>;
}

export const GoogleCloudBeyondcorpAppconnectorsV1ListAppConnectorsResponse: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1ListAppConnectorsResponse> = Schema.suspend(() => Schema.Struct({
  appConnectors: Schema.optional(Schema.Array(GoogleCloudBeyondcorpAppconnectorsV1AppConnector)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1ListAppConnectorsResponse" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1ListAppConnectorsResponse>;

export interface GoogleCloudBeyondcorpAppconnectorsV1NotificationConfigCloudPubSubNotificationConfig {
  /** The Pub/Sub subscription the AppConnector uses to receive notifications. */
  pubsubSubscription?: string;
}

export const GoogleCloudBeyondcorpAppconnectorsV1NotificationConfigCloudPubSubNotificationConfig: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1NotificationConfigCloudPubSubNotificationConfig> = Schema.suspend(() => Schema.Struct({
  pubsubSubscription: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1NotificationConfigCloudPubSubNotificationConfig" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1NotificationConfigCloudPubSubNotificationConfig>;

export interface GoogleCloudBeyondcorpAppconnectorsV1NotificationConfig {
  /** Cloud Pub/Sub Configuration to receive notifications. */
  pubsubNotification?: GoogleCloudBeyondcorpAppconnectorsV1NotificationConfigCloudPubSubNotificationConfig;
}

export const GoogleCloudBeyondcorpAppconnectorsV1NotificationConfig: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1NotificationConfig> = Schema.suspend(() => Schema.Struct({
  pubsubNotification: Schema.optional(GoogleCloudBeyondcorpAppconnectorsV1NotificationConfigCloudPubSubNotificationConfig),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1NotificationConfig" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1NotificationConfig>;

export interface GoogleCloudBeyondcorpAppconnectorsV1ImageConfig {
  /** The initial image the remote agent will attempt to run for the control plane. Format would be a gcr image path, e.g.: gcr.io/PROJECT-ID/my-image:tag1 */
  targetImage?: string;
  /** The stable image that the remote agent will fallback to if the target image fails. Format would be a gcr image path, e.g.: gcr.io/PROJECT-ID/my-image:tag1 */
  stableImage?: string;
}

export const GoogleCloudBeyondcorpAppconnectorsV1ImageConfig: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1ImageConfig> = Schema.suspend(() => Schema.Struct({
  targetImage: Schema.optional(Schema.String),
  stableImage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1ImageConfig" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1ImageConfig>;

export interface GoogleCloudBeyondcorpAppconnectorsV1AppConnectorInstanceConfig {
  /** Required. A monotonically increasing number generated and maintained by the API provider. Every time a config changes in the backend, the sequenceNumber should be bumped up to reflect the change. */
  sequenceNumber?: string;
  /** The SLM instance agent configuration. */
  instanceConfig?: Record<string, unknown>;
  /** NotificationConfig defines the notification mechanism that the remote instance should subscribe to in order to receive notification. */
  notificationConfig?: GoogleCloudBeyondcorpAppconnectorsV1NotificationConfig;
  /** ImageConfig defines the GCR images to run for the remote agent's control plane. */
  imageConfig?: GoogleCloudBeyondcorpAppconnectorsV1ImageConfig;
}

export const GoogleCloudBeyondcorpAppconnectorsV1AppConnectorInstanceConfig: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1AppConnectorInstanceConfig> = Schema.suspend(() => Schema.Struct({
  sequenceNumber: Schema.optional(Schema.String),
  instanceConfig: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  notificationConfig: Schema.optional(GoogleCloudBeyondcorpAppconnectorsV1NotificationConfig),
  imageConfig: Schema.optional(GoogleCloudBeyondcorpAppconnectorsV1ImageConfig),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1AppConnectorInstanceConfig" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1AppConnectorInstanceConfig>;

export interface GoogleCloudBeyondcorpAppconnectorsV1ResolveInstanceConfigResponse {
  /** AppConnectorInstanceConfig. */
  instanceConfig?: GoogleCloudBeyondcorpAppconnectorsV1AppConnectorInstanceConfig;
}

export const GoogleCloudBeyondcorpAppconnectorsV1ResolveInstanceConfigResponse: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1ResolveInstanceConfigResponse> = Schema.suspend(() => Schema.Struct({
  instanceConfig: Schema.optional(GoogleCloudBeyondcorpAppconnectorsV1AppConnectorInstanceConfig),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1ResolveInstanceConfigResponse" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1ResolveInstanceConfigResponse>;

export interface GoogleCloudBeyondcorpAppconnectorsV1ReportStatusRequest {
  /** Required. Resource info of the connector. */
  resourceInfo?: GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. */
  validateOnly?: boolean;
}

export const GoogleCloudBeyondcorpAppconnectorsV1ReportStatusRequest: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1ReportStatusRequest> = Schema.suspend(() => Schema.Struct({
  resourceInfo: Schema.optional(GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo),
  requestId: Schema.optional(Schema.String),
  validateOnly: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1ReportStatusRequest" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1ReportStatusRequest>;

export interface AllocatedConnection {
  /** Required. The PSC uri of an allocated connection */
  pscUri?: string;
  /** Required. The ingress port of an allocated connection */
  ingressPort?: number;
}

export const AllocatedConnection: Schema.Schema<AllocatedConnection> = Schema.suspend(() => Schema.Struct({
  pscUri: Schema.optional(Schema.String),
  ingressPort: Schema.optional(Schema.Number),
})).annotate({ identifier: "AllocatedConnection" }) as any as Schema.Schema<AllocatedConnection>;

export interface AppGateway {
  /** Required. Unique resource name of the AppGateway. The name is ignored when creating an AppGateway. */
  name?: string;
  /** Output only. Timestamp when the resource was created. */
  createTime?: string;
  /** Output only. Timestamp when the resource was last modified. */
  updateTime?: string;
  /** Optional. Resource labels to represent user provided metadata. */
  labels?: Record<string, string>;
  /** Optional. An arbitrary user-provided name for the AppGateway. Cannot exceed 64 characters. */
  displayName?: string;
  /** Output only. A unique identifier for the instance generated by the system. */
  uid?: string;
  /** Required. The type of network connectivity used by the AppGateway. */
  type?: "TYPE_UNSPECIFIED" | "TCP_PROXY" | (string & {});
  /** Output only. The current state of the AppGateway. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "CREATED" | "UPDATING" | "DELETING" | "DOWN" | (string & {});
  /** Output only. Server-defined URI for this resource. */
  uri?: string;
  /** Output only. A list of connections allocated for the Gateway */
  allocatedConnections?: Array<AllocatedConnection>;
  /** Required. The type of hosting used by the AppGateway. */
  hostType?: "HOST_TYPE_UNSPECIFIED" | "GCP_REGIONAL_MIG" | (string & {});
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
}

export const AppGateway: Schema.Schema<AppGateway> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  allocatedConnections: Schema.optional(Schema.Array(AllocatedConnection)),
  hostType: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AppGateway" }) as any as Schema.Schema<AppGateway>;

export interface ListAppGatewaysResponse {
  /** A list of BeyondCorp AppGateways in the project. */
  appGateways?: Array<AppGateway>;
  /** A token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** A list of locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListAppGatewaysResponse: Schema.Schema<ListAppGatewaysResponse> = Schema.suspend(() => Schema.Struct({
  appGateways: Schema.optional(Schema.Array(AppGateway)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListAppGatewaysResponse" }) as any as Schema.Schema<ListAppGatewaysResponse>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1InternetGateway {
  /** Output only. List of IP addresses assigned to the Cloud NAT. */
  assignedIps?: Array<string>;
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1InternetGateway: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1InternetGateway> = Schema.suspend(() => Schema.Struct({
  assignedIps: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1InternetGateway" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1InternetGateway>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1Hub {
  /** Optional. Internet Gateway configuration. */
  internetGateway?: GoogleCloudBeyondcorpSecuritygatewaysV1InternetGateway;
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1Hub: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1Hub> = Schema.suspend(() => Schema.Struct({
  internetGateway: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1InternetGateway),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1Hub" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1Hub>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedUserInfo {
  /** Optional. The delegated user's information. */
  outputType?: "OUTPUT_TYPE_UNSPECIFIED" | "PROTOBUF" | "JSON" | "NONE" | (string & {});
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedUserInfo: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedUserInfo> = Schema.suspend(() => Schema.Struct({
  outputType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedUserInfo" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedUserInfo>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedGroupInfo {
  /** Optional. The output type of the delegated group information. */
  outputType?: "OUTPUT_TYPE_UNSPECIFIED" | "PROTOBUF" | "JSON" | "NONE" | (string & {});
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedGroupInfo: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedGroupInfo> = Schema.suspend(() => Schema.Struct({
  outputType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedGroupInfo" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedGroupInfo>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedDeviceInfo {
  /** Optional. The output type details for the delegated device. */
  outputType?: "OUTPUT_TYPE_UNSPECIFIED" | "PROTOBUF" | "JSON" | "NONE" | (string & {});
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedDeviceInfo: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedDeviceInfo> = Schema.suspend(() => Schema.Struct({
  outputType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedDeviceInfo" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedDeviceInfo>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeaders {
  /** Optional. User details. */
  userInfo?: GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedUserInfo;
  /** Optional. Group details. */
  groupInfo?: GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedGroupInfo;
  /** Optional. The device information configuration. */
  deviceInfo?: GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedDeviceInfo;
  /** Optional. Default output type for all enabled headers. */
  outputType?: "OUTPUT_TYPE_UNSPECIFIED" | "PROTOBUF" | "JSON" | "NONE" | (string & {});
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeaders: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeaders> = Schema.suspend(() => Schema.Struct({
  userInfo: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedUserInfo),
  groupInfo: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedGroupInfo),
  deviceInfo: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeadersDelegatedDeviceInfo),
  outputType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeaders" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeaders>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1ProxyProtocolConfig {
  /** Optional. List of the allowed client header names. */
  allowedClientHeaders?: Array<string>;
  /** Optional. Configuration for the contextual headers. */
  contextualHeaders?: GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeaders;
  /** Optional. Custom resource specific headers along with the values. The names should conform to RFC 9110: >Field names can contain alphanumeric characters, hyphens, and periods, can contain only ASCII-printable characters and tabs, and must start with a letter. */
  metadataHeaders?: Record<string, string>;
  /** Optional. The security gateway identity configuration. */
  gatewayIdentity?: "GATEWAY_IDENTITY_UNSPECIFIED" | "RESOURCE_NAME" | (string & {});
  /** Optional. Client IP configuration. The client IP address is included if true. */
  clientIp?: boolean;
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1ProxyProtocolConfig: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ProxyProtocolConfig> = Schema.suspend(() => Schema.Struct({
  allowedClientHeaders: Schema.optional(Schema.Array(Schema.String)),
  contextualHeaders: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1ContextualHeaders),
  metadataHeaders: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  gatewayIdentity: Schema.optional(Schema.String),
  clientIp: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1ProxyProtocolConfig" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ProxyProtocolConfig>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscoveryApiGatewayOperationDescriptor {
  /** Required. Contains the URI path fragment where HTTP request is sent. */
  path?: string;
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscoveryApiGatewayOperationDescriptor: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscoveryApiGatewayOperationDescriptor> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscoveryApiGatewayOperationDescriptor" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscoveryApiGatewayOperationDescriptor>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscoveryApiGateway {
  /** Required. Enables fetching resource model updates to alter service behavior per Chrome profile. */
  resourceOverride?: GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscoveryApiGatewayOperationDescriptor;
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscoveryApiGateway: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscoveryApiGateway> = Schema.suspend(() => Schema.Struct({
  resourceOverride: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscoveryApiGatewayOperationDescriptor),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscoveryApiGateway" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscoveryApiGateway>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscovery {
  /** Required. External API configuration. */
  apiGateway?: GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscoveryApiGateway;
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscovery: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscovery> = Schema.suspend(() => Schema.Struct({
  apiGateway: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscoveryApiGateway),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscovery" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscovery>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1LoggingConfig {
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1LoggingConfig: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1LoggingConfig> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1LoggingConfig" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1LoggingConfig>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway {
  /** Identifier. Name of the resource. */
  name?: string;
  /** Output only. Timestamp when the resource was created. */
  createTime?: string;
  /** Output only. Timestamp when the resource was last modified. */
  updateTime?: string;
  /** Optional. An arbitrary user-provided name for the SecurityGateway. Cannot exceed 64 characters. */
  displayName?: string;
  /** Output only. IP addresses that will be used for establishing connection to the endpoints. */
  externalIps?: Array<string>;
  /** Output only. The operational state of the SecurityGateway. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "UPDATING" | "DELETING" | "RUNNING" | "DOWN" | "ERROR" | (string & {});
  /** Optional. Map of Hubs that represents regional data path deployment with GCP region as a key. */
  hubs?: Record<string, GoogleCloudBeyondcorpSecuritygatewaysV1Hub>;
  /** Output only. Service account used for operations that involve resources in consumer projects. */
  delegatingServiceAccount?: string;
  /** Optional. Shared proxy configuration for all apps. */
  proxyProtocolConfig?: GoogleCloudBeyondcorpSecuritygatewaysV1ProxyProtocolConfig;
  /** Optional. Settings related to the Service Discovery. */
  serviceDiscovery?: GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscovery;
  /** Optional. Configuration for Cloud Logging. If this field is present, the logging will be enabled. */
  logging?: GoogleCloudBeyondcorpSecuritygatewaysV1LoggingConfig;
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  externalIps: Schema.optional(Schema.Array(Schema.String)),
  state: Schema.optional(Schema.String),
  hubs: Schema.optional(Schema.Record(Schema.String, GoogleCloudBeyondcorpSecuritygatewaysV1Hub)),
  delegatingServiceAccount: Schema.optional(Schema.String),
  proxyProtocolConfig: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1ProxyProtocolConfig),
  serviceDiscovery: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1ServiceDiscovery),
  logging: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1LoggingConfig),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1ListSecurityGatewaysResponse {
  /** A list of BeyondCorp SecurityGateway in the project. */
  securityGateways?: Array<GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway>;
  /** A token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** A list of locations that could not be reached. */
  unreachable?: Array<string>;
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1ListSecurityGatewaysResponse: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ListSecurityGatewaysResponse> = Schema.suspend(() => Schema.Struct({
  securityGateways: Schema.optional(Schema.Array(GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1ListSecurityGatewaysResponse" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ListSecurityGatewaysResponse>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1EndpointMatcher {
  /** Required. Hostname of the application. */
  hostname?: string;
  /** Required. The ports of the application. */
  ports?: Array<number>;
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1EndpointMatcher: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1EndpointMatcher> = Schema.suspend(() => Schema.Struct({
  hostname: Schema.optional(Schema.String),
  ports: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1EndpointMatcher" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1EndpointMatcher>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstreamNetwork {
  /** Required. Network name is of the format: `projects/{project}/global/networks/{network} */
  name?: string;
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstreamNetwork: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstreamNetwork> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstreamNetwork" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstreamNetwork>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1Endpoint {
  /** Required. Hostname of the endpoint. */
  hostname?: string;
  /** Required. Port of the endpoint. */
  port?: number;
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1Endpoint: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1Endpoint> = Schema.suspend(() => Schema.Struct({
  hostname: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1Endpoint" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1Endpoint>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstreamExternal {
  /** Required. List of the endpoints to forward traffic to. */
  endpoints?: Array<GoogleCloudBeyondcorpSecuritygatewaysV1Endpoint>;
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstreamExternal: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstreamExternal> = Schema.suspend(() => Schema.Struct({
  endpoints: Schema.optional(Schema.Array(GoogleCloudBeyondcorpSecuritygatewaysV1Endpoint)),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstreamExternal" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstreamExternal>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1EgressPolicy {
  /** Required. List of the regions where the application sends traffic. */
  regions?: Array<string>;
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1EgressPolicy: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1EgressPolicy> = Schema.suspend(() => Schema.Struct({
  regions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1EgressPolicy" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1EgressPolicy>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstream {
  /** Network to forward traffic to. */
  network?: GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstreamNetwork;
  /** List of the external endpoints to forward traffic to. */
  external?: GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstreamExternal;
  /** Optional. Enables proxy protocol configuration for the upstream. */
  proxyProtocol?: GoogleCloudBeyondcorpSecuritygatewaysV1ProxyProtocolConfig;
  /** Optional. Routing policy information. */
  egressPolicy?: GoogleCloudBeyondcorpSecuritygatewaysV1EgressPolicy;
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstream: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstream> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstreamNetwork),
  external: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstreamExternal),
  proxyProtocol: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1ProxyProtocolConfig),
  egressPolicy: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1EgressPolicy),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstream" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstream>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1Application {
  /** Identifier. Name of the resource. */
  name?: string;
  /** Optional. An array of conditions to match the application's network endpoint. Each element in the array is an EndpointMatcher object, which defines a specific combination of a hostname pattern and one or more ports. The application is considered matched if at least one of the EndpointMatcher conditions in this array is met (the conditions are combined using OR logic). Each EndpointMatcher must contain a hostname pattern, such as "example.com", and one or more port numbers specified as a string, such as "443". Hostname and port number examples: "*.example.com", "443" "example.com" and "22" "example.com" and "22,33" */
  endpointMatchers?: Array<GoogleCloudBeyondcorpSecuritygatewaysV1EndpointMatcher>;
  /** Output only. Timestamp when the resource was created. */
  createTime?: string;
  /** Output only. Timestamp when the resource was last modified. */
  updateTime?: string;
  /** Optional. An arbitrary user-provided name for the application resource. Cannot exceed 64 characters. */
  displayName?: string;
  /** Optional. Which upstream resources to forward traffic to. */
  upstreams?: Array<GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstream>;
  /** Optional. Type of the external application. */
  schema?: "SCHEMA_UNSPECIFIED" | "PROXY_GATEWAY" | "API_GATEWAY" | (string & {});
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1Application: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1Application> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  endpointMatchers: Schema.optional(Schema.Array(GoogleCloudBeyondcorpSecuritygatewaysV1EndpointMatcher)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  upstreams: Schema.optional(Schema.Array(GoogleCloudBeyondcorpSecuritygatewaysV1ApplicationUpstream)),
  schema: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1Application" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1Application>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1ListApplicationsResponse {
  /** A list of BeyondCorp Application in the project. */
  applications?: Array<GoogleCloudBeyondcorpSecuritygatewaysV1Application>;
  /** A token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** A list of locations that could not be reached. */
  unreachable?: Array<string>;
}

export const GoogleCloudBeyondcorpSecuritygatewaysV1ListApplicationsResponse: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ListApplicationsResponse> = Schema.suspend(() => Schema.Struct({
  applications: Schema.optional(Schema.Array(GoogleCloudBeyondcorpSecuritygatewaysV1Application)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1ListApplicationsResponse" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1ListApplicationsResponse>;

export interface GoogleCloudLocationLocation {
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

export const GoogleCloudLocationLocation: Schema.Schema<GoogleCloudLocationLocation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudLocationLocation" }) as any as Schema.Schema<GoogleCloudLocationLocation>;

export interface GoogleCloudLocationListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<GoogleCloudLocationLocation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const GoogleCloudLocationListLocationsResponse: Schema.Schema<GoogleCloudLocationListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(GoogleCloudLocationLocation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudLocationListLocationsResponse" }) as any as Schema.Schema<GoogleCloudLocationListLocationsResponse>;

export interface GoogleTypeExpr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const GoogleTypeExpr: Schema.Schema<GoogleTypeExpr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypeExpr" }) as any as Schema.Schema<GoogleTypeExpr>;

export interface GoogleIamV1Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: GoogleTypeExpr;
}

export const GoogleIamV1Binding: Schema.Schema<GoogleIamV1Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(GoogleTypeExpr),
})).annotate({ identifier: "GoogleIamV1Binding" }) as any as Schema.Schema<GoogleIamV1Binding>;

export interface GoogleIamV1AuditLogConfig {
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const GoogleIamV1AuditLogConfig: Schema.Schema<GoogleIamV1AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIamV1AuditLogConfig" }) as any as Schema.Schema<GoogleIamV1AuditLogConfig>;

export interface GoogleIamV1AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<GoogleIamV1AuditLogConfig>;
}

export const GoogleIamV1AuditConfig: Schema.Schema<GoogleIamV1AuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditLogConfig)),
})).annotate({ identifier: "GoogleIamV1AuditConfig" }) as any as Schema.Schema<GoogleIamV1AuditConfig>;

export interface GoogleIamV1Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<GoogleIamV1Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<GoogleIamV1AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const GoogleIamV1Policy: Schema.Schema<GoogleIamV1Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(GoogleIamV1Binding)),
  auditConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditConfig)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV1Policy" }) as any as Schema.Schema<GoogleIamV1Policy>;

export interface GoogleIamV1SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: GoogleIamV1Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const GoogleIamV1SetIamPolicyRequest: Schema.Schema<GoogleIamV1SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(GoogleIamV1Policy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV1SetIamPolicyRequest" }) as any as Schema.Schema<GoogleIamV1SetIamPolicyRequest>;

export interface GoogleIamV1TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const GoogleIamV1TestIamPermissionsRequest: Schema.Schema<GoogleIamV1TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIamV1TestIamPermissionsRequest" }) as any as Schema.Schema<GoogleIamV1TestIamPermissionsRequest>;

export interface GoogleIamV1TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const GoogleIamV1TestIamPermissionsResponse: Schema.Schema<GoogleIamV1TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIamV1TestIamPermissionsResponse" }) as any as Schema.Schema<GoogleIamV1TestIamPermissionsResponse>;

export interface Tunnelv1ProtoTunnelerError {
  /** retryable isn't used for now, but we may want to reuse it in the future. */
  retryable?: boolean;
  /** Original raw error */
  err?: string;
}

export const Tunnelv1ProtoTunnelerError: Schema.Schema<Tunnelv1ProtoTunnelerError> = Schema.suspend(() => Schema.Struct({
  retryable: Schema.optional(Schema.Boolean),
  err: Schema.optional(Schema.String),
})).annotate({ identifier: "Tunnelv1ProtoTunnelerError" }) as any as Schema.Schema<Tunnelv1ProtoTunnelerError>;

export interface Tunnelv1ProtoTunnelerInfo {
  /** total_retry_count stores the total number of times the tunneler has been retried by tunManager. */
  totalRetryCount?: number;
  /** backoff_retry_count stores the number of times the tunneler has been retried by tunManager for current backoff sequence. Gets reset to 0 if time difference between 2 consecutive retries exceeds backoffRetryResetTime. */
  backoffRetryCount?: number;
  /** latest_err stores the Error for the latest tunneler failure. Gets reset everytime the tunneler is retried by tunManager. */
  latestErr?: Tunnelv1ProtoTunnelerError;
  /** latest_retry_time stores the time when the tunneler was last restarted. */
  latestRetryTime?: string;
  /** id is the unique id of a tunneler. */
  id?: string;
}

export const Tunnelv1ProtoTunnelerInfo: Schema.Schema<Tunnelv1ProtoTunnelerInfo> = Schema.suspend(() => Schema.Struct({
  totalRetryCount: Schema.optional(Schema.Number),
  backoffRetryCount: Schema.optional(Schema.Number),
  latestErr: Schema.optional(Tunnelv1ProtoTunnelerError),
  latestRetryTime: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "Tunnelv1ProtoTunnelerInfo" }) as any as Schema.Schema<Tunnelv1ProtoTunnelerInfo>;

export interface CloudSecurityZerotrustApplinkLogagentProtoLogAgentDetails {
}

export const CloudSecurityZerotrustApplinkLogagentProtoLogAgentDetails: Schema.Schema<CloudSecurityZerotrustApplinkLogagentProtoLogAgentDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CloudSecurityZerotrustApplinkLogagentProtoLogAgentDetails" }) as any as Schema.Schema<CloudSecurityZerotrustApplinkLogagentProtoLogAgentDetails>;

export interface GoogleCloudBeyondcorpAppconnectionsV1alphaAppConnectionOperationMetadata {
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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudBeyondcorpAppconnectionsV1alphaAppConnectionOperationMetadata: Schema.Schema<GoogleCloudBeyondcorpAppconnectionsV1alphaAppConnectionOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectionsV1alphaAppConnectionOperationMetadata" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectionsV1alphaAppConnectionOperationMetadata>;

export interface GoogleCloudBeyondcorpAppconnectionsV1AppConnectionOperationMetadata {
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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudBeyondcorpAppconnectionsV1AppConnectionOperationMetadata: Schema.Schema<GoogleCloudBeyondcorpAppconnectionsV1AppConnectionOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectionsV1AppConnectionOperationMetadata" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectionsV1AppConnectionOperationMetadata>;

export interface GoogleCloudBeyondcorpAppconnectorsV1alphaAppConnectorOperationMetadata {
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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudBeyondcorpAppconnectorsV1alphaAppConnectorOperationMetadata: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1alphaAppConnectorOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1alphaAppConnectorOperationMetadata" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1alphaAppConnectorOperationMetadata>;

export interface GoogleCloudBeyondcorpAppconnectorsV1AppConnectorOperationMetadata {
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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudBeyondcorpAppconnectorsV1AppConnectorOperationMetadata: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1AppConnectorOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1AppConnectorOperationMetadata" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1AppConnectorOperationMetadata>;

export interface GoogleCloudBeyondcorpAppconnectorsV1alphaRemoteAgentDetails {
}

export const GoogleCloudBeyondcorpAppconnectorsV1alphaRemoteAgentDetails: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1alphaRemoteAgentDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1alphaRemoteAgentDetails" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1alphaRemoteAgentDetails>;

export interface GoogleCloudBeyondcorpAppconnectorsV1RemoteAgentDetails {
}

export const GoogleCloudBeyondcorpAppconnectorsV1RemoteAgentDetails: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1RemoteAgentDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1RemoteAgentDetails" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1RemoteAgentDetails>;

export interface GoogleCloudBeyondcorpAppconnectorsV1alphaContainerHealthDetails {
  /** The version of the expected config. */
  expectedConfigVersion?: string;
  /** The version of the current config. */
  currentConfigVersion?: string;
  /** The extended status. Such as ExitCode, StartedAt, FinishedAt, etc. */
  extendedStatus?: Record<string, string>;
  /** The latest error message. */
  errorMsg?: string;
}

export const GoogleCloudBeyondcorpAppconnectorsV1alphaContainerHealthDetails: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1alphaContainerHealthDetails> = Schema.suspend(() => Schema.Struct({
  expectedConfigVersion: Schema.optional(Schema.String),
  currentConfigVersion: Schema.optional(Schema.String),
  extendedStatus: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  errorMsg: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1alphaContainerHealthDetails" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1alphaContainerHealthDetails>;

export interface GoogleCloudBeyondcorpAppconnectorsV1ContainerHealthDetails {
  /** The version of the expected config. */
  expectedConfigVersion?: string;
  /** The version of the current config. */
  currentConfigVersion?: string;
  /** The extended status. Such as ExitCode, StartedAt, FinishedAt, etc. */
  extendedStatus?: Record<string, string>;
  /** The latest error message. */
  errorMsg?: string;
}

export const GoogleCloudBeyondcorpAppconnectorsV1ContainerHealthDetails: Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1ContainerHealthDetails> = Schema.suspend(() => Schema.Struct({
  expectedConfigVersion: Schema.optional(Schema.String),
  currentConfigVersion: Schema.optional(Schema.String),
  extendedStatus: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  errorMsg: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppconnectorsV1ContainerHealthDetails" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppconnectorsV1ContainerHealthDetails>;

export interface CloudSecurityZerotrustApplinkAppConnectorProtoConnectorDetails {
}

export const CloudSecurityZerotrustApplinkAppConnectorProtoConnectorDetails: Schema.Schema<CloudSecurityZerotrustApplinkAppConnectorProtoConnectorDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CloudSecurityZerotrustApplinkAppConnectorProtoConnectorDetails" }) as any as Schema.Schema<CloudSecurityZerotrustApplinkAppConnectorProtoConnectorDetails>;

export interface CloudSecurityZerotrustApplinkAppConnectorProtoGateway {
  /** self_link is the gateway URL in the form https://www.googleapis.com/compute/${version}/projects/${project}/zones/${zone}/instances/${instance} */
  selfLink?: string;
  /** project is the tenant project the gateway belongs to. Different from the project in the connection, it is a BeyondCorpAPI internally created project to manage all the gateways. It is sharing the same network with the consumer project user owned. It is derived from the gateway URL. For example, project=${project} assuming a gateway URL. https://www.googleapis.com/compute/${version}/projects/${project}/zones/${zone}/instances/${instance} */
  project?: string;
  /** zone represents the zone the instance belongs. It is derived from the gateway URL. For example, zone=${zone} assuming a gateway URL. https://www.googleapis.com/compute/${version}/projects/${project}/zones/${zone}/instances/${instance} */
  zone?: string;
  /** name is the name of an instance running a gateway. It is the unique ID for a gateway. All gateways under the same connection have the same prefix. It is derived from the gateway URL. For example, name=${instance} assuming a gateway URL. https://www.googleapis.com/compute/${version}/projects/${project}/zones/${zone}/instances/${instance} */
  name?: string;
  /** interface specifies the network interface of the gateway to connect to. */
  interface?: string;
  /** port specifies the port of the gateway for tunnel connections from the connectors. */
  port?: number;
}

export const CloudSecurityZerotrustApplinkAppConnectorProtoGateway: Schema.Schema<CloudSecurityZerotrustApplinkAppConnectorProtoGateway> = Schema.suspend(() => Schema.Struct({
  selfLink: Schema.optional(Schema.String),
  project: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  interface: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
})).annotate({ identifier: "CloudSecurityZerotrustApplinkAppConnectorProtoGateway" }) as any as Schema.Schema<CloudSecurityZerotrustApplinkAppConnectorProtoGateway>;

export interface CloudSecurityZerotrustApplinkAppConnectorProtoConnectionConfig {
  /** name is the unique ID for each connection. TODO(b/190732451) returns connection name from user-specified name in config. Now, name = ${application_name}:${application_endpoint} */
  name?: string;
  /** project represents the consumer project the connection belongs to. */
  project?: string;
  /** application_name represents the given name of the application the connection is connecting with. */
  applicationName?: string;
  /** application_endpoint is the endpoint of the application the form of host:port. For example, "localhost:80". */
  applicationEndpoint?: string;
  /** gateway lists all instances running a gateway in GCP. They all connect to a connector on the host. */
  gateway?: Array<CloudSecurityZerotrustApplinkAppConnectorProtoGateway>;
  /** tunnels_per_gateway reflects the number of tunnels between a connector and a gateway. */
  tunnelsPerGateway?: number;
  /** user_port specifies the reserved port on gateways for user connections. */
  userPort?: number;
}

export const CloudSecurityZerotrustApplinkAppConnectorProtoConnectionConfig: Schema.Schema<CloudSecurityZerotrustApplinkAppConnectorProtoConnectionConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  project: Schema.optional(Schema.String),
  applicationName: Schema.optional(Schema.String),
  applicationEndpoint: Schema.optional(Schema.String),
  gateway: Schema.optional(Schema.Array(CloudSecurityZerotrustApplinkAppConnectorProtoGateway)),
  tunnelsPerGateway: Schema.optional(Schema.Number),
  userPort: Schema.optional(Schema.Number),
})).annotate({ identifier: "CloudSecurityZerotrustApplinkAppConnectorProtoConnectionConfig" }) as any as Schema.Schema<CloudSecurityZerotrustApplinkAppConnectorProtoConnectionConfig>;

export interface GoogleCloudBeyondcorpAppgatewaysV1alphaAppGatewayOperationMetadata {
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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudBeyondcorpAppgatewaysV1alphaAppGatewayOperationMetadata: Schema.Schema<GoogleCloudBeyondcorpAppgatewaysV1alphaAppGatewayOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpAppgatewaysV1alphaAppGatewayOperationMetadata" }) as any as Schema.Schema<GoogleCloudBeyondcorpAppgatewaysV1alphaAppGatewayOperationMetadata>;

export interface AppGatewayOperationMetadata {
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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const AppGatewayOperationMetadata: Schema.Schema<AppGatewayOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "AppGatewayOperationMetadata" }) as any as Schema.Schema<AppGatewayOperationMetadata>;

export interface GoogleCloudBeyondcorpConnectionsV1alphaConnectionOperationMetadata {
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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudBeyondcorpConnectionsV1alphaConnectionOperationMetadata: Schema.Schema<GoogleCloudBeyondcorpConnectionsV1alphaConnectionOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpConnectionsV1alphaConnectionOperationMetadata" }) as any as Schema.Schema<GoogleCloudBeyondcorpConnectionsV1alphaConnectionOperationMetadata>;

export interface GoogleCloudBeyondcorpConnectorsV1alphaConnectorOperationMetadata {
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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudBeyondcorpConnectorsV1alphaConnectorOperationMetadata: Schema.Schema<GoogleCloudBeyondcorpConnectorsV1alphaConnectorOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpConnectorsV1alphaConnectorOperationMetadata" }) as any as Schema.Schema<GoogleCloudBeyondcorpConnectorsV1alphaConnectorOperationMetadata>;

export interface GoogleCloudBeyondcorpConnectorsV1alphaRemoteAgentDetails {
}

export const GoogleCloudBeyondcorpConnectorsV1alphaRemoteAgentDetails: Schema.Schema<GoogleCloudBeyondcorpConnectorsV1alphaRemoteAgentDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudBeyondcorpConnectorsV1alphaRemoteAgentDetails" }) as any as Schema.Schema<GoogleCloudBeyondcorpConnectorsV1alphaRemoteAgentDetails>;

export interface GoogleCloudBeyondcorpConnectorsV1alphaContainerHealthDetails {
  /** The version of the expected config. */
  expectedConfigVersion?: string;
  /** The version of the current config. */
  currentConfigVersion?: string;
  /** The extended status. Such as ExitCode, StartedAt, FinishedAt, etc. */
  extendedStatus?: Record<string, string>;
  /** The latest error message. */
  errorMsg?: string;
}

export const GoogleCloudBeyondcorpConnectorsV1alphaContainerHealthDetails: Schema.Schema<GoogleCloudBeyondcorpConnectorsV1alphaContainerHealthDetails> = Schema.suspend(() => Schema.Struct({
  expectedConfigVersion: Schema.optional(Schema.String),
  currentConfigVersion: Schema.optional(Schema.String),
  extendedStatus: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  errorMsg: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpConnectorsV1alphaContainerHealthDetails" }) as any as Schema.Schema<GoogleCloudBeyondcorpConnectorsV1alphaContainerHealthDetails>;

export interface GoogleCloudBeyondcorpPartnerservicesV1mainPartnerServiceOperationMetadata {
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
  /** Output only. Identifies whether the caller has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudBeyondcorpPartnerservicesV1mainPartnerServiceOperationMetadata: Schema.Schema<GoogleCloudBeyondcorpPartnerservicesV1mainPartnerServiceOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpPartnerservicesV1mainPartnerServiceOperationMetadata" }) as any as Schema.Schema<GoogleCloudBeyondcorpPartnerservicesV1mainPartnerServiceOperationMetadata>;

export interface GoogleCloudBeyondcorpPartnerservicesV1alphaPartnerServiceOperationMetadata {
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
  /** Output only. Identifies whether the caller has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudBeyondcorpPartnerservicesV1alphaPartnerServiceOperationMetadata: Schema.Schema<GoogleCloudBeyondcorpPartnerservicesV1alphaPartnerServiceOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpPartnerservicesV1alphaPartnerServiceOperationMetadata" }) as any as Schema.Schema<GoogleCloudBeyondcorpPartnerservicesV1alphaPartnerServiceOperationMetadata>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1alphaSecurityGatewayOperationMetadata {
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

export const GoogleCloudBeyondcorpSecuritygatewaysV1alphaSecurityGatewayOperationMetadata: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1alphaSecurityGatewayOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1alphaSecurityGatewayOperationMetadata" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1alphaSecurityGatewayOperationMetadata>;

export interface GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGatewayOperationMetadata {
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

export const GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGatewayOperationMetadata: Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGatewayOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGatewayOperationMetadata" }) as any as Schema.Schema<GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGatewayOperationMetadata>;

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
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = GoogleCloudLocationListLocationsResponse;
export const ListProjectsLocationsResponse = GoogleCloudLocationListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<ListProjectsLocationsRequest, ListProjectsLocationsResponse, ListProjectsLocationsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = GoogleCloudLocationLocation;
export const GetProjectsLocationsResponse = GoogleCloudLocationLocation;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
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
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<ListProjectsLocationsOperationsRequest, ListProjectsLocationsOperationsResponse, ListProjectsLocationsOperationsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
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
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: GoogleLongrunningCancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleLongrunningCancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppConnectionsRequest {
  /** Required. The resource name of the AppConnection location using the form: `projects/{project_id}/locations/{location_id}` */
  parent: string;
  /** Optional. The maximum number of items to return. If not specified, a default value of 50 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous ListAppConnectionsRequest, if any. */
  pageToken?: string;
  /** Optional. A filter specifying constraints of a list operation. */
  filter?: string;
  /** Optional. Specifies the ordering of results. See [Sorting order](https://cloud.google.com/apis/design/design_patterns#sorting_order) for more information. */
  orderBy?: string;
}

export const ListProjectsLocationsAppConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnections" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppConnectionsRequest>;

export type ListProjectsLocationsAppConnectionsResponse = GoogleCloudBeyondcorpAppconnectionsV1ListAppConnectionsResponse;
export const ListProjectsLocationsAppConnectionsResponse = GoogleCloudBeyondcorpAppconnectionsV1ListAppConnectionsResponse;

export type ListProjectsLocationsAppConnectionsError = DefaultErrors;

/** Lists AppConnections in a given project and location. */
export const listProjectsLocationsAppConnections: API.PaginatedOperationMethod<ListProjectsLocationsAppConnectionsRequest, ListProjectsLocationsAppConnectionsResponse, ListProjectsLocationsAppConnectionsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppConnectionsRequest,
  output: ListProjectsLocationsAppConnectionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAppConnectionsRequest {
  /** Required. BeyondCorp AppConnection name using the form: `projects/{project_id}/locations/{location_id}/appConnections/{app_connection_id}` */
  name: string;
}

export const GetProjectsLocationsAppConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnections/{appConnectionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppConnectionsRequest>;

export type GetProjectsLocationsAppConnectionsResponse = GoogleCloudBeyondcorpAppconnectionsV1AppConnection;
export const GetProjectsLocationsAppConnectionsResponse = GoogleCloudBeyondcorpAppconnectionsV1AppConnection;

export type GetProjectsLocationsAppConnectionsError = DefaultErrors;

/** Gets details of a single AppConnection. */
export const getProjectsLocationsAppConnections: API.OperationMethod<GetProjectsLocationsAppConnectionsRequest, GetProjectsLocationsAppConnectionsResponse, GetProjectsLocationsAppConnectionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAppConnectionsRequest,
  output: GetProjectsLocationsAppConnectionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAppConnectionsRequest {
  /** Required. The resource project name of the AppConnection location using the form: `projects/{project_id}/locations/{location_id}` */
  parent: string;
  /** Optional. User-settable AppConnection resource ID. * Must start with a letter. * Must contain between 4-63 characters from `/a-z-/`. * Must end with a number or a letter. */
  appConnectionId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudBeyondcorpAppconnectionsV1AppConnection;
}

export const CreateProjectsLocationsAppConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  appConnectionId: Schema.optional(Schema.String).pipe(T.HttpQuery("appConnectionId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudBeyondcorpAppconnectionsV1AppConnection).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnections", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppConnectionsRequest>;

export type CreateProjectsLocationsAppConnectionsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsAppConnectionsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsAppConnectionsError = DefaultErrors;

/** Creates a new AppConnection in a given project and location. */
export const createProjectsLocationsAppConnections: API.OperationMethod<CreateProjectsLocationsAppConnectionsRequest, CreateProjectsLocationsAppConnectionsResponse, CreateProjectsLocationsAppConnectionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAppConnectionsRequest,
  output: CreateProjectsLocationsAppConnectionsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppConnectionsRequest {
  /** Required. Unique resource name of the AppConnection. The name is ignored when creating a AppConnection. */
  name: string;
  /** Required. Mask of fields to update. At least one path must be supplied in this field. The elements of the repeated paths field may only include these fields from [BeyondCorp.AppConnection]: * `labels` * `display_name` * `application_endpoint` * `connectors` */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. */
  validateOnly?: boolean;
  /** Optional. If set as true, will create the resource if it is not found. */
  allowMissing?: boolean;
  /** Request body */
  body?: GoogleCloudBeyondcorpAppconnectionsV1AppConnection;
}

export const PatchProjectsLocationsAppConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  body: Schema.optional(GoogleCloudBeyondcorpAppconnectionsV1AppConnection).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnections/{appConnectionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppConnectionsRequest>;

export type PatchProjectsLocationsAppConnectionsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsAppConnectionsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsAppConnectionsError = DefaultErrors;

/** Updates the parameters of a single AppConnection. */
export const patchProjectsLocationsAppConnections: API.OperationMethod<PatchProjectsLocationsAppConnectionsRequest, PatchProjectsLocationsAppConnectionsResponse, PatchProjectsLocationsAppConnectionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAppConnectionsRequest,
  output: PatchProjectsLocationsAppConnectionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppConnectionsRequest {
  /** Required. BeyondCorp Connector name using the form: `projects/{project_id}/locations/{location_id}/appConnections/{app_connection_id}` */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. */
  validateOnly?: boolean;
}

export const DeleteProjectsLocationsAppConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnections/{appConnectionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppConnectionsRequest>;

export type DeleteProjectsLocationsAppConnectionsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsAppConnectionsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsAppConnectionsError = DefaultErrors;

/** Deletes a single AppConnection. */
export const deleteProjectsLocationsAppConnections: API.OperationMethod<DeleteProjectsLocationsAppConnectionsRequest, DeleteProjectsLocationsAppConnectionsResponse, DeleteProjectsLocationsAppConnectionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAppConnectionsRequest,
  output: DeleteProjectsLocationsAppConnectionsResponse,
  errors: [],
}));

export interface ResolveProjectsLocationsAppConnectionsRequest {
  /** Required. The resource name of the AppConnection location using the form: `projects/{project_id}/locations/{location_id}` */
  parent: string;
  /** Required. BeyondCorp Connector name of the connector associated with those AppConnections using the form: `projects/{project_id}/locations/{location_id}/appConnectors/{app_connector_id}` */
  appConnectorId?: string;
  /** Optional. The maximum number of items to return. If not specified, a default value of 50 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous ResolveAppConnectionsResponse, if any. */
  pageToken?: string;
}

export const ResolveProjectsLocationsAppConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  appConnectorId: Schema.optional(Schema.String).pipe(T.HttpQuery("appConnectorId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnections:resolve" }),
  svc,
) as unknown as Schema.Schema<ResolveProjectsLocationsAppConnectionsRequest>;

export type ResolveProjectsLocationsAppConnectionsResponse = GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponse;
export const ResolveProjectsLocationsAppConnectionsResponse = GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponse;

export type ResolveProjectsLocationsAppConnectionsError = DefaultErrors;

/** Resolves AppConnections details for a given AppConnector. An internal method called by a connector to find AppConnections to connect to. */
export const resolveProjectsLocationsAppConnections: API.PaginatedOperationMethod<ResolveProjectsLocationsAppConnectionsRequest, ResolveProjectsLocationsAppConnectionsResponse, ResolveProjectsLocationsAppConnectionsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ResolveProjectsLocationsAppConnectionsRequest,
  output: ResolveProjectsLocationsAppConnectionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SetIamPolicyProjectsLocationsAppConnectionsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsAppConnectionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnections/{appConnectionsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsAppConnectionsRequest>;

export type SetIamPolicyProjectsLocationsAppConnectionsResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsAppConnectionsResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsAppConnectionsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsAppConnections: API.OperationMethod<SetIamPolicyProjectsLocationsAppConnectionsRequest, SetIamPolicyProjectsLocationsAppConnectionsResponse, SetIamPolicyProjectsLocationsAppConnectionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsAppConnectionsRequest,
  output: SetIamPolicyProjectsLocationsAppConnectionsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsAppConnectionsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsAppConnectionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnections/{appConnectionsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsAppConnectionsRequest>;

export type GetIamPolicyProjectsLocationsAppConnectionsResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsAppConnectionsResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsAppConnectionsError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsAppConnections: API.OperationMethod<GetIamPolicyProjectsLocationsAppConnectionsRequest, GetIamPolicyProjectsLocationsAppConnectionsResponse, GetIamPolicyProjectsLocationsAppConnectionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsAppConnectionsRequest,
  output: GetIamPolicyProjectsLocationsAppConnectionsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsAppConnectionsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsAppConnectionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnections/{appConnectionsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsAppConnectionsRequest>;

export type TestIamPermissionsProjectsLocationsAppConnectionsResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsAppConnectionsResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsAppConnectionsError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsAppConnections: API.OperationMethod<TestIamPermissionsProjectsLocationsAppConnectionsRequest, TestIamPermissionsProjectsLocationsAppConnectionsResponse, TestIamPermissionsProjectsLocationsAppConnectionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsAppConnectionsRequest,
  output: TestIamPermissionsProjectsLocationsAppConnectionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppConnectorsRequest {
  /** Required. The resource name of the AppConnector location using the form: `projects/{project_id}/locations/{location_id}` */
  parent: string;
  /** Optional. The maximum number of items to return. If not specified, a default value of 50 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous ListAppConnectorsRequest, if any. */
  pageToken?: string;
  /** Optional. A filter specifying constraints of a list operation. */
  filter?: string;
  /** Optional. Specifies the ordering of results. See [Sorting order](https://cloud.google.com/apis/design/design_patterns#sorting_order) for more information. */
  orderBy?: string;
}

export const ListProjectsLocationsAppConnectorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnectors" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppConnectorsRequest>;

export type ListProjectsLocationsAppConnectorsResponse = GoogleCloudBeyondcorpAppconnectorsV1ListAppConnectorsResponse;
export const ListProjectsLocationsAppConnectorsResponse = GoogleCloudBeyondcorpAppconnectorsV1ListAppConnectorsResponse;

export type ListProjectsLocationsAppConnectorsError = DefaultErrors;

/** Lists AppConnectors in a given project and location. */
export const listProjectsLocationsAppConnectors: API.PaginatedOperationMethod<ListProjectsLocationsAppConnectorsRequest, ListProjectsLocationsAppConnectorsResponse, ListProjectsLocationsAppConnectorsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppConnectorsRequest,
  output: ListProjectsLocationsAppConnectorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAppConnectorsRequest {
  /** Required. BeyondCorp AppConnector name using the form: `projects/{project_id}/locations/{location_id}/appConnectors/{app_connector_id}` */
  name: string;
}

export const GetProjectsLocationsAppConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnectors/{appConnectorsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppConnectorsRequest>;

export type GetProjectsLocationsAppConnectorsResponse = GoogleCloudBeyondcorpAppconnectorsV1AppConnector;
export const GetProjectsLocationsAppConnectorsResponse = GoogleCloudBeyondcorpAppconnectorsV1AppConnector;

export type GetProjectsLocationsAppConnectorsError = DefaultErrors;

/** Gets details of a single AppConnector. */
export const getProjectsLocationsAppConnectors: API.OperationMethod<GetProjectsLocationsAppConnectorsRequest, GetProjectsLocationsAppConnectorsResponse, GetProjectsLocationsAppConnectorsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAppConnectorsRequest,
  output: GetProjectsLocationsAppConnectorsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAppConnectorsRequest {
  /** Required. The resource project name of the AppConnector location using the form: `projects/{project_id}/locations/{location_id}` */
  parent: string;
  /** Optional. User-settable AppConnector resource ID. * Must start with a letter. * Must contain between 4-63 characters from `/a-z-/`. * Must end with a number or a letter. */
  appConnectorId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudBeyondcorpAppconnectorsV1AppConnector;
}

export const CreateProjectsLocationsAppConnectorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  appConnectorId: Schema.optional(Schema.String).pipe(T.HttpQuery("appConnectorId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudBeyondcorpAppconnectorsV1AppConnector).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnectors", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppConnectorsRequest>;

export type CreateProjectsLocationsAppConnectorsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsAppConnectorsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsAppConnectorsError = DefaultErrors;

/** Creates a new AppConnector in a given project and location. */
export const createProjectsLocationsAppConnectors: API.OperationMethod<CreateProjectsLocationsAppConnectorsRequest, CreateProjectsLocationsAppConnectorsResponse, CreateProjectsLocationsAppConnectorsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAppConnectorsRequest,
  output: CreateProjectsLocationsAppConnectorsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppConnectorsRequest {
  /** Required. Unique resource name of the AppConnector. The name is ignored when creating a AppConnector. */
  name: string;
  /** Required. Mask of fields to update. At least one path must be supplied in this field. The elements of the repeated paths field may only include these fields from [BeyondCorp.AppConnector]: * `labels` * `display_name` */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudBeyondcorpAppconnectorsV1AppConnector;
}

export const PatchProjectsLocationsAppConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudBeyondcorpAppconnectorsV1AppConnector).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnectors/{appConnectorsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppConnectorsRequest>;

export type PatchProjectsLocationsAppConnectorsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsAppConnectorsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsAppConnectorsError = DefaultErrors;

/** Updates the parameters of a single AppConnector. */
export const patchProjectsLocationsAppConnectors: API.OperationMethod<PatchProjectsLocationsAppConnectorsRequest, PatchProjectsLocationsAppConnectorsResponse, PatchProjectsLocationsAppConnectorsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAppConnectorsRequest,
  output: PatchProjectsLocationsAppConnectorsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppConnectorsRequest {
  /** Required. BeyondCorp AppConnector name using the form: `projects/{project_id}/locations/{location_id}/appConnectors/{app_connector_id}` */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. */
  validateOnly?: boolean;
}

export const DeleteProjectsLocationsAppConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnectors/{appConnectorsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppConnectorsRequest>;

export type DeleteProjectsLocationsAppConnectorsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsAppConnectorsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsAppConnectorsError = DefaultErrors;

/** Deletes a single AppConnector. */
export const deleteProjectsLocationsAppConnectors: API.OperationMethod<DeleteProjectsLocationsAppConnectorsRequest, DeleteProjectsLocationsAppConnectorsResponse, DeleteProjectsLocationsAppConnectorsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAppConnectorsRequest,
  output: DeleteProjectsLocationsAppConnectorsResponse,
  errors: [],
}));

export interface ResolveInstanceConfigProjectsLocationsAppConnectorsRequest {
  /** Required. BeyondCorp AppConnector name using the form: `projects/{project_id}/locations/{location_id}/appConnectors/{app_connector}` */
  appConnector: string;
}

export const ResolveInstanceConfigProjectsLocationsAppConnectorsRequest = Schema.Struct({
  appConnector: Schema.String.pipe(T.HttpPath("appConnector")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnectors/{appConnectorsId}:resolveInstanceConfig" }),
  svc,
) as unknown as Schema.Schema<ResolveInstanceConfigProjectsLocationsAppConnectorsRequest>;

export type ResolveInstanceConfigProjectsLocationsAppConnectorsResponse = GoogleCloudBeyondcorpAppconnectorsV1ResolveInstanceConfigResponse;
export const ResolveInstanceConfigProjectsLocationsAppConnectorsResponse = GoogleCloudBeyondcorpAppconnectorsV1ResolveInstanceConfigResponse;

export type ResolveInstanceConfigProjectsLocationsAppConnectorsError = DefaultErrors;

/** Gets instance configuration for a given AppConnector. An internal method called by a AppConnector to get its container config. */
export const resolveInstanceConfigProjectsLocationsAppConnectors: API.OperationMethod<ResolveInstanceConfigProjectsLocationsAppConnectorsRequest, ResolveInstanceConfigProjectsLocationsAppConnectorsResponse, ResolveInstanceConfigProjectsLocationsAppConnectorsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ResolveInstanceConfigProjectsLocationsAppConnectorsRequest,
  output: ResolveInstanceConfigProjectsLocationsAppConnectorsResponse,
  errors: [],
}));

export interface ReportStatusProjectsLocationsAppConnectorsRequest {
  /** Required. BeyondCorp Connector name using the form: `projects/{project_id}/locations/{location_id}/connectors/{connector}` */
  appConnector: string;
  /** Request body */
  body?: GoogleCloudBeyondcorpAppconnectorsV1ReportStatusRequest;
}

export const ReportStatusProjectsLocationsAppConnectorsRequest = Schema.Struct({
  appConnector: Schema.String.pipe(T.HttpPath("appConnector")),
  body: Schema.optional(GoogleCloudBeyondcorpAppconnectorsV1ReportStatusRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnectors/{appConnectorsId}:reportStatus", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReportStatusProjectsLocationsAppConnectorsRequest>;

export type ReportStatusProjectsLocationsAppConnectorsResponse = GoogleLongrunningOperation;
export const ReportStatusProjectsLocationsAppConnectorsResponse = GoogleLongrunningOperation;

export type ReportStatusProjectsLocationsAppConnectorsError = DefaultErrors;

/** Report status for a given connector. */
export const reportStatusProjectsLocationsAppConnectors: API.OperationMethod<ReportStatusProjectsLocationsAppConnectorsRequest, ReportStatusProjectsLocationsAppConnectorsResponse, ReportStatusProjectsLocationsAppConnectorsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ReportStatusProjectsLocationsAppConnectorsRequest,
  output: ReportStatusProjectsLocationsAppConnectorsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsAppConnectorsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsAppConnectorsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnectors/{appConnectorsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsAppConnectorsRequest>;

export type SetIamPolicyProjectsLocationsAppConnectorsResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsAppConnectorsResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsAppConnectorsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsAppConnectors: API.OperationMethod<SetIamPolicyProjectsLocationsAppConnectorsRequest, SetIamPolicyProjectsLocationsAppConnectorsResponse, SetIamPolicyProjectsLocationsAppConnectorsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsAppConnectorsRequest,
  output: SetIamPolicyProjectsLocationsAppConnectorsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsAppConnectorsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsAppConnectorsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnectors/{appConnectorsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsAppConnectorsRequest>;

export type GetIamPolicyProjectsLocationsAppConnectorsResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsAppConnectorsResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsAppConnectorsError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsAppConnectors: API.OperationMethod<GetIamPolicyProjectsLocationsAppConnectorsRequest, GetIamPolicyProjectsLocationsAppConnectorsResponse, GetIamPolicyProjectsLocationsAppConnectorsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsAppConnectorsRequest,
  output: GetIamPolicyProjectsLocationsAppConnectorsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsAppConnectorsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsAppConnectorsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/appConnectors/{appConnectorsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsAppConnectorsRequest>;

export type TestIamPermissionsProjectsLocationsAppConnectorsResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsAppConnectorsResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsAppConnectorsError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsAppConnectors: API.OperationMethod<TestIamPermissionsProjectsLocationsAppConnectorsRequest, TestIamPermissionsProjectsLocationsAppConnectorsResponse, TestIamPermissionsProjectsLocationsAppConnectorsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsAppConnectorsRequest,
  output: TestIamPermissionsProjectsLocationsAppConnectorsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppGatewaysRequest {
  /** Required. The resource name of the AppGateway location using the form: `projects/{project_id}/locations/{location_id}` */
  parent: string;
  /** Optional. The maximum number of items to return. If not specified, a default value of 50 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous ListAppGatewaysRequest, if any. */
  pageToken?: string;
  /** Optional. A filter specifying constraints of a list operation. */
  filter?: string;
  /** Optional. Specifies the ordering of results. See [Sorting order](https://cloud.google.com/apis/design/design_patterns#sorting_order) for more information. */
  orderBy?: string;
}

export const ListProjectsLocationsAppGatewaysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/appGateways" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppGatewaysRequest>;

export type ListProjectsLocationsAppGatewaysResponse = ListAppGatewaysResponse;
export const ListProjectsLocationsAppGatewaysResponse = ListAppGatewaysResponse;

export type ListProjectsLocationsAppGatewaysError = DefaultErrors;

/** Lists AppGateways in a given project and location. */
export const listProjectsLocationsAppGateways: API.PaginatedOperationMethod<ListProjectsLocationsAppGatewaysRequest, ListProjectsLocationsAppGatewaysResponse, ListProjectsLocationsAppGatewaysError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppGatewaysRequest,
  output: ListProjectsLocationsAppGatewaysResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAppGatewaysRequest {
  /** Required. BeyondCorp AppGateway name using the form: `projects/{project_id}/locations/{location_id}/appGateways/{app_gateway_id}` */
  name: string;
}

export const GetProjectsLocationsAppGatewaysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/appGateways/{appGatewaysId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppGatewaysRequest>;

export type GetProjectsLocationsAppGatewaysResponse = AppGateway;
export const GetProjectsLocationsAppGatewaysResponse = AppGateway;

export type GetProjectsLocationsAppGatewaysError = DefaultErrors;

/** Gets details of a single AppGateway. */
export const getProjectsLocationsAppGateways: API.OperationMethod<GetProjectsLocationsAppGatewaysRequest, GetProjectsLocationsAppGatewaysResponse, GetProjectsLocationsAppGatewaysError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAppGatewaysRequest,
  output: GetProjectsLocationsAppGatewaysResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAppGatewaysRequest {
  /** Required. The resource project name of the AppGateway location using the form: `projects/{project_id}/locations/{location_id}` */
  parent: string;
  /** Optional. User-settable AppGateway resource ID. * Must start with a letter. * Must contain between 4-63 characters from `/a-z-/`. * Must end with a number or a letter. */
  appGatewayId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. */
  validateOnly?: boolean;
  /** Request body */
  body?: AppGateway;
}

export const CreateProjectsLocationsAppGatewaysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  appGatewayId: Schema.optional(Schema.String).pipe(T.HttpQuery("appGatewayId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(AppGateway).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/appGateways", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppGatewaysRequest>;

export type CreateProjectsLocationsAppGatewaysResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsAppGatewaysResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsAppGatewaysError = DefaultErrors;

/** Creates a new AppGateway in a given project and location. */
export const createProjectsLocationsAppGateways: API.OperationMethod<CreateProjectsLocationsAppGatewaysRequest, CreateProjectsLocationsAppGatewaysResponse, CreateProjectsLocationsAppGatewaysError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAppGatewaysRequest,
  output: CreateProjectsLocationsAppGatewaysResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppGatewaysRequest {
  /** Required. BeyondCorp AppGateway name using the form: `projects/{project_id}/locations/{location_id}/appGateways/{app_gateway_id}` */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. */
  validateOnly?: boolean;
}

export const DeleteProjectsLocationsAppGatewaysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/appGateways/{appGatewaysId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppGatewaysRequest>;

export type DeleteProjectsLocationsAppGatewaysResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsAppGatewaysResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsAppGatewaysError = DefaultErrors;

/** Deletes a single AppGateway. */
export const deleteProjectsLocationsAppGateways: API.OperationMethod<DeleteProjectsLocationsAppGatewaysRequest, DeleteProjectsLocationsAppGatewaysResponse, DeleteProjectsLocationsAppGatewaysError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAppGatewaysRequest,
  output: DeleteProjectsLocationsAppGatewaysResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsAppGatewaysRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsAppGatewaysRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/appGateways/{appGatewaysId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsAppGatewaysRequest>;

export type SetIamPolicyProjectsLocationsAppGatewaysResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsAppGatewaysResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsAppGatewaysError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsAppGateways: API.OperationMethod<SetIamPolicyProjectsLocationsAppGatewaysRequest, SetIamPolicyProjectsLocationsAppGatewaysResponse, SetIamPolicyProjectsLocationsAppGatewaysError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsAppGatewaysRequest,
  output: SetIamPolicyProjectsLocationsAppGatewaysResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsAppGatewaysRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsAppGatewaysRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/appGateways/{appGatewaysId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsAppGatewaysRequest>;

export type GetIamPolicyProjectsLocationsAppGatewaysResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsAppGatewaysResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsAppGatewaysError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsAppGateways: API.OperationMethod<GetIamPolicyProjectsLocationsAppGatewaysRequest, GetIamPolicyProjectsLocationsAppGatewaysResponse, GetIamPolicyProjectsLocationsAppGatewaysError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsAppGatewaysRequest,
  output: GetIamPolicyProjectsLocationsAppGatewaysResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsAppGatewaysRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsAppGatewaysRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/appGateways/{appGatewaysId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsAppGatewaysRequest>;

export type TestIamPermissionsProjectsLocationsAppGatewaysResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsAppGatewaysResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsAppGatewaysError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsAppGateways: API.OperationMethod<TestIamPermissionsProjectsLocationsAppGatewaysRequest, TestIamPermissionsProjectsLocationsAppGatewaysResponse, TestIamPermissionsProjectsLocationsAppGatewaysError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsAppGatewaysRequest,
  output: TestIamPermissionsProjectsLocationsAppGatewaysResponse,
  errors: [],
}));

export interface ListProjectsLocationsSecurityGatewaysRequest {
  /** Required. The parent location to which the resources belong. `projects/{project_id}/locations/{location_id}/` */
  parent: string;
  /** Optional. The maximum number of items to return. If not specified, a default value of 50 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous ListSecurityGatewayRequest, if any. */
  pageToken?: string;
  /** Optional. A filter specifying constraints of a list operation. All fields in the SecurityGateway message are supported. For example, the following query will return the SecurityGateway with displayName "test-security-gateway" For more information, please refer to https://google.aip.dev/160. */
  filter?: string;
  /** Optional. Specifies the ordering of results. See [Sorting order](https://cloud.google.com/apis/design/design_patterns#sorting_order) for more information. */
  orderBy?: string;
}

export const ListProjectsLocationsSecurityGatewaysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/securityGateways" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSecurityGatewaysRequest>;

export type ListProjectsLocationsSecurityGatewaysResponse = GoogleCloudBeyondcorpSecuritygatewaysV1ListSecurityGatewaysResponse;
export const ListProjectsLocationsSecurityGatewaysResponse = GoogleCloudBeyondcorpSecuritygatewaysV1ListSecurityGatewaysResponse;

export type ListProjectsLocationsSecurityGatewaysError = DefaultErrors;

/** Lists SecurityGateways in a given project and location. */
export const listProjectsLocationsSecurityGateways: API.PaginatedOperationMethod<ListProjectsLocationsSecurityGatewaysRequest, ListProjectsLocationsSecurityGatewaysResponse, ListProjectsLocationsSecurityGatewaysError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsSecurityGatewaysRequest,
  output: ListProjectsLocationsSecurityGatewaysResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsSecurityGatewaysRequest {
  /** Required. The resource name of the PartnerTenant using the form: `projects/{project_id}/locations/{location_id}/securityGateway/{security_gateway_id}` */
  name: string;
}

export const GetProjectsLocationsSecurityGatewaysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/securityGateways/{securityGatewaysId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSecurityGatewaysRequest>;

export type GetProjectsLocationsSecurityGatewaysResponse = GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway;
export const GetProjectsLocationsSecurityGatewaysResponse = GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway;

export type GetProjectsLocationsSecurityGatewaysError = DefaultErrors;

/** Gets details of a single SecurityGateway. */
export const getProjectsLocationsSecurityGateways: API.OperationMethod<GetProjectsLocationsSecurityGatewaysRequest, GetProjectsLocationsSecurityGatewaysResponse, GetProjectsLocationsSecurityGatewaysError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSecurityGatewaysRequest,
  output: GetProjectsLocationsSecurityGatewaysResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSecurityGatewaysRequest {
  /** Required. The resource project name of the SecurityGateway location using the form: `projects/{project_id}/locations/{location_id}` */
  parent: string;
  /** Optional. User-settable SecurityGateway resource ID. * Must start with a letter. * Must contain between 4-63 characters from `/a-z-/`. * Must end with a number or letter. */
  securityGatewayId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. */
  requestId?: string;
  /** Request body */
  body?: GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway;
}

export const CreateProjectsLocationsSecurityGatewaysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  securityGatewayId: Schema.optional(Schema.String).pipe(T.HttpQuery("securityGatewayId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/securityGateways", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSecurityGatewaysRequest>;

export type CreateProjectsLocationsSecurityGatewaysResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsSecurityGatewaysResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsSecurityGatewaysError = DefaultErrors;

/** Creates a new Security Gateway in a given project and location. */
export const createProjectsLocationsSecurityGateways: API.OperationMethod<CreateProjectsLocationsSecurityGatewaysRequest, CreateProjectsLocationsSecurityGatewaysResponse, CreateProjectsLocationsSecurityGatewaysError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSecurityGatewaysRequest,
  output: CreateProjectsLocationsSecurityGatewaysResponse,
  errors: [],
}));

export interface PatchProjectsLocationsSecurityGatewaysRequest {
  /** Identifier. Name of the resource. */
  name: string;
  /** Optional. Mutable fields include: display_name, hubs. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request timed out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway;
}

export const PatchProjectsLocationsSecurityGatewaysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/securityGateways/{securityGatewaysId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsSecurityGatewaysRequest>;

export type PatchProjectsLocationsSecurityGatewaysResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsSecurityGatewaysResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsSecurityGatewaysError = DefaultErrors;

/** Updates the parameters of a single SecurityGateway. */
export const patchProjectsLocationsSecurityGateways: API.OperationMethod<PatchProjectsLocationsSecurityGatewaysRequest, PatchProjectsLocationsSecurityGatewaysResponse, PatchProjectsLocationsSecurityGatewaysError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsSecurityGatewaysRequest,
  output: PatchProjectsLocationsSecurityGatewaysResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsSecurityGatewaysRequest {
  /** Required. BeyondCorp SecurityGateway name using the form: `projects/{project_id}/locations/{location_id}/securityGateways/{security_gateway_id}` */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. */
  validateOnly?: boolean;
}

export const DeleteProjectsLocationsSecurityGatewaysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/securityGateways/{securityGatewaysId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSecurityGatewaysRequest>;

export type DeleteProjectsLocationsSecurityGatewaysResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsSecurityGatewaysResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsSecurityGatewaysError = DefaultErrors;

/** Deletes a single SecurityGateway. */
export const deleteProjectsLocationsSecurityGateways: API.OperationMethod<DeleteProjectsLocationsSecurityGatewaysRequest, DeleteProjectsLocationsSecurityGatewaysResponse, DeleteProjectsLocationsSecurityGatewaysError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSecurityGatewaysRequest,
  output: DeleteProjectsLocationsSecurityGatewaysResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsSecurityGatewaysRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsSecurityGatewaysRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/securityGateways/{securityGatewaysId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsSecurityGatewaysRequest>;

export type SetIamPolicyProjectsLocationsSecurityGatewaysResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsSecurityGatewaysResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsSecurityGatewaysError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsSecurityGateways: API.OperationMethod<SetIamPolicyProjectsLocationsSecurityGatewaysRequest, SetIamPolicyProjectsLocationsSecurityGatewaysResponse, SetIamPolicyProjectsLocationsSecurityGatewaysError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsSecurityGatewaysRequest,
  output: SetIamPolicyProjectsLocationsSecurityGatewaysResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsSecurityGatewaysRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsSecurityGatewaysRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/securityGateways/{securityGatewaysId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsSecurityGatewaysRequest>;

export type GetIamPolicyProjectsLocationsSecurityGatewaysResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsSecurityGatewaysResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsSecurityGatewaysError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsSecurityGateways: API.OperationMethod<GetIamPolicyProjectsLocationsSecurityGatewaysRequest, GetIamPolicyProjectsLocationsSecurityGatewaysResponse, GetIamPolicyProjectsLocationsSecurityGatewaysError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsSecurityGatewaysRequest,
  output: GetIamPolicyProjectsLocationsSecurityGatewaysResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsSecurityGatewaysRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsSecurityGatewaysRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/securityGateways/{securityGatewaysId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsSecurityGatewaysRequest>;

export type TestIamPermissionsProjectsLocationsSecurityGatewaysResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsSecurityGatewaysResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsSecurityGatewaysError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsSecurityGateways: API.OperationMethod<TestIamPermissionsProjectsLocationsSecurityGatewaysRequest, TestIamPermissionsProjectsLocationsSecurityGatewaysResponse, TestIamPermissionsProjectsLocationsSecurityGatewaysError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsSecurityGatewaysRequest,
  output: TestIamPermissionsProjectsLocationsSecurityGatewaysResponse,
  errors: [],
}));

export interface ListProjectsLocationsSecurityGatewaysApplicationsRequest {
  /** Required. The parent location to which the resources belong. `projects/{project_id}/locations/global/securityGateways/{security_gateway_id}` */
  parent: string;
  /** Optional. The maximum number of items to return. If not specified, a default value of 50 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous ListApplicationsRequest, if any. */
  pageToken?: string;
  /** Optional. A filter specifying constraints of a list operation. All fields in the Application message are supported. For example, the following query will return the Application with displayName "test-application" For more information, please refer to https://google.aip.dev/160. */
  filter?: string;
  /** Optional. Specifies the ordering of results. See [Sorting order](https://cloud.google.com/apis/design/design_patterns#sorting_order) for more information. */
  orderBy?: string;
}

export const ListProjectsLocationsSecurityGatewaysApplicationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/securityGateways/{securityGatewaysId}/applications" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSecurityGatewaysApplicationsRequest>;

export type ListProjectsLocationsSecurityGatewaysApplicationsResponse = GoogleCloudBeyondcorpSecuritygatewaysV1ListApplicationsResponse;
export const ListProjectsLocationsSecurityGatewaysApplicationsResponse = GoogleCloudBeyondcorpSecuritygatewaysV1ListApplicationsResponse;

export type ListProjectsLocationsSecurityGatewaysApplicationsError = DefaultErrors;

/** Lists Applications in a given project and location. */
export const listProjectsLocationsSecurityGatewaysApplications: API.PaginatedOperationMethod<ListProjectsLocationsSecurityGatewaysApplicationsRequest, ListProjectsLocationsSecurityGatewaysApplicationsResponse, ListProjectsLocationsSecurityGatewaysApplicationsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsSecurityGatewaysApplicationsRequest,
  output: ListProjectsLocationsSecurityGatewaysApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsSecurityGatewaysApplicationsRequest {
  /** Required. The resource name of the Application using the form: `projects/{project_id}/locations/global/securityGateway/{security_gateway_id}/applications/{application_id}` */
  name: string;
}

export const GetProjectsLocationsSecurityGatewaysApplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/securityGateways/{securityGatewaysId}/applications/{applicationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSecurityGatewaysApplicationsRequest>;

export type GetProjectsLocationsSecurityGatewaysApplicationsResponse = GoogleCloudBeyondcorpSecuritygatewaysV1Application;
export const GetProjectsLocationsSecurityGatewaysApplicationsResponse = GoogleCloudBeyondcorpSecuritygatewaysV1Application;

export type GetProjectsLocationsSecurityGatewaysApplicationsError = DefaultErrors;

/** Gets details of a single Application. */
export const getProjectsLocationsSecurityGatewaysApplications: API.OperationMethod<GetProjectsLocationsSecurityGatewaysApplicationsRequest, GetProjectsLocationsSecurityGatewaysApplicationsResponse, GetProjectsLocationsSecurityGatewaysApplicationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSecurityGatewaysApplicationsRequest,
  output: GetProjectsLocationsSecurityGatewaysApplicationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSecurityGatewaysApplicationsRequest {
  /** Required. The resource name of the parent SecurityGateway using the form: `projects/{project_id}/locations/global/securityGateways/{security_gateway_id}` */
  parent: string;
  /** Optional. User-settable Application resource ID. * Must start with a letter. * Must contain between 4-63 characters from `/a-z-/`. * Must end with a number or letter. */
  applicationId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. */
  requestId?: string;
  /** Request body */
  body?: GoogleCloudBeyondcorpSecuritygatewaysV1Application;
}

export const CreateProjectsLocationsSecurityGatewaysApplicationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  applicationId: Schema.optional(Schema.String).pipe(T.HttpQuery("applicationId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1Application).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/securityGateways/{securityGatewaysId}/applications", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSecurityGatewaysApplicationsRequest>;

export type CreateProjectsLocationsSecurityGatewaysApplicationsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsSecurityGatewaysApplicationsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsSecurityGatewaysApplicationsError = DefaultErrors;

/** Creates a new Application in a given project and location. */
export const createProjectsLocationsSecurityGatewaysApplications: API.OperationMethod<CreateProjectsLocationsSecurityGatewaysApplicationsRequest, CreateProjectsLocationsSecurityGatewaysApplicationsResponse, CreateProjectsLocationsSecurityGatewaysApplicationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSecurityGatewaysApplicationsRequest,
  output: CreateProjectsLocationsSecurityGatewaysApplicationsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsSecurityGatewaysApplicationsRequest {
  /** Identifier. Name of the resource. */
  name: string;
  /** Optional. Mutable fields include: display_name. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request timed out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: GoogleCloudBeyondcorpSecuritygatewaysV1Application;
}

export const PatchProjectsLocationsSecurityGatewaysApplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(GoogleCloudBeyondcorpSecuritygatewaysV1Application).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/securityGateways/{securityGatewaysId}/applications/{applicationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsSecurityGatewaysApplicationsRequest>;

export type PatchProjectsLocationsSecurityGatewaysApplicationsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsSecurityGatewaysApplicationsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsSecurityGatewaysApplicationsError = DefaultErrors;

/** Updates the parameters of a single Application. */
export const patchProjectsLocationsSecurityGatewaysApplications: API.OperationMethod<PatchProjectsLocationsSecurityGatewaysApplicationsRequest, PatchProjectsLocationsSecurityGatewaysApplicationsResponse, PatchProjectsLocationsSecurityGatewaysApplicationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsSecurityGatewaysApplicationsRequest,
  output: PatchProjectsLocationsSecurityGatewaysApplicationsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsSecurityGatewaysApplicationsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. */
  validateOnly?: boolean;
}

export const DeleteProjectsLocationsSecurityGatewaysApplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/securityGateways/{securityGatewaysId}/applications/{applicationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSecurityGatewaysApplicationsRequest>;

export type DeleteProjectsLocationsSecurityGatewaysApplicationsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsSecurityGatewaysApplicationsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsSecurityGatewaysApplicationsError = DefaultErrors;

/** Deletes a single application. */
export const deleteProjectsLocationsSecurityGatewaysApplications: API.OperationMethod<DeleteProjectsLocationsSecurityGatewaysApplicationsRequest, DeleteProjectsLocationsSecurityGatewaysApplicationsResponse, DeleteProjectsLocationsSecurityGatewaysApplicationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSecurityGatewaysApplicationsRequest,
  output: DeleteProjectsLocationsSecurityGatewaysApplicationsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsSecurityGatewaysApplicationsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsSecurityGatewaysApplicationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/securityGateways/{securityGatewaysId}/applications/{applicationsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsSecurityGatewaysApplicationsRequest>;

export type SetIamPolicyProjectsLocationsSecurityGatewaysApplicationsResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsSecurityGatewaysApplicationsResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsSecurityGatewaysApplicationsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsSecurityGatewaysApplications: API.OperationMethod<SetIamPolicyProjectsLocationsSecurityGatewaysApplicationsRequest, SetIamPolicyProjectsLocationsSecurityGatewaysApplicationsResponse, SetIamPolicyProjectsLocationsSecurityGatewaysApplicationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsSecurityGatewaysApplicationsRequest,
  output: SetIamPolicyProjectsLocationsSecurityGatewaysApplicationsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsSecurityGatewaysApplicationsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsSecurityGatewaysApplicationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/securityGateways/{securityGatewaysId}/applications/{applicationsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsSecurityGatewaysApplicationsRequest>;

export type GetIamPolicyProjectsLocationsSecurityGatewaysApplicationsResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsSecurityGatewaysApplicationsResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsSecurityGatewaysApplicationsError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsSecurityGatewaysApplications: API.OperationMethod<GetIamPolicyProjectsLocationsSecurityGatewaysApplicationsRequest, GetIamPolicyProjectsLocationsSecurityGatewaysApplicationsResponse, GetIamPolicyProjectsLocationsSecurityGatewaysApplicationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsSecurityGatewaysApplicationsRequest,
  output: GetIamPolicyProjectsLocationsSecurityGatewaysApplicationsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsSecurityGatewaysApplicationsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsSecurityGatewaysApplicationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/securityGateways/{securityGatewaysId}/applications/{applicationsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsSecurityGatewaysApplicationsRequest>;

export type TestIamPermissionsProjectsLocationsSecurityGatewaysApplicationsResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsSecurityGatewaysApplicationsResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsSecurityGatewaysApplicationsError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsSecurityGatewaysApplications: API.OperationMethod<TestIamPermissionsProjectsLocationsSecurityGatewaysApplicationsRequest, TestIamPermissionsProjectsLocationsSecurityGatewaysApplicationsResponse, TestIamPermissionsProjectsLocationsSecurityGatewaysApplicationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsSecurityGatewaysApplicationsRequest,
  output: TestIamPermissionsProjectsLocationsSecurityGatewaysApplicationsResponse,
  errors: [],
}));

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

export type ListOrganizationsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListOrganizationsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListOrganizationsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listOrganizationsLocationsOperations: API.PaginatedOperationMethod<ListOrganizationsLocationsOperationsRequest, ListOrganizationsLocationsOperationsResponse, ListOrganizationsLocationsOperationsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListOrganizationsLocationsOperationsRequest,
  output: ListOrganizationsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

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

export type GetOrganizationsLocationsOperationsResponse = GoogleLongrunningOperation;
export const GetOrganizationsLocationsOperationsResponse = GoogleLongrunningOperation;

export type GetOrganizationsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getOrganizationsLocationsOperations: API.OperationMethod<GetOrganizationsLocationsOperationsRequest, GetOrganizationsLocationsOperationsResponse, GetOrganizationsLocationsOperationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsOperationsRequest,
  output: GetOrganizationsLocationsOperationsResponse,
  errors: [],
}));

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

export type DeleteOrganizationsLocationsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteOrganizationsLocationsOperations: API.OperationMethod<DeleteOrganizationsLocationsOperationsRequest, DeleteOrganizationsLocationsOperationsResponse, DeleteOrganizationsLocationsOperationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsOperationsRequest,
  output: DeleteOrganizationsLocationsOperationsResponse,
  errors: [],
}));

export interface CancelOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: GoogleLongrunningCancelOperationRequest;
}

export const CancelOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleLongrunningCancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOrganizationsLocationsOperationsRequest>;

export type CancelOrganizationsLocationsOperationsResponse = Empty;
export const CancelOrganizationsLocationsOperationsResponse = Empty;

export type CancelOrganizationsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelOrganizationsLocationsOperations: API.OperationMethod<CancelOrganizationsLocationsOperationsRequest, CancelOrganizationsLocationsOperationsResponse, CancelOrganizationsLocationsOperationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOrganizationsLocationsOperationsRequest,
  output: CancelOrganizationsLocationsOperationsResponse,
  errors: [],
}));

