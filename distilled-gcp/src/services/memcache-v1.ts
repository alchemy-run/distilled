// ==========================================================================
// Cloud Memorystore for Memcached API (memcache v1)
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
  name: "memcache",
  version: "v1",
  rootUrl: "https://memcache.googleapis.com/",
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

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface NodeConfig {
  /** Required. Number of cpus per Memcached node. */
  cpuCount?: number;
  /** Required. Memory size in MiB for each Memcached node. */
  memorySizeMb?: number;
}

export const NodeConfig: Schema.Schema<NodeConfig> = Schema.suspend(() => Schema.Struct({
  cpuCount: Schema.optional(Schema.Number),
  memorySizeMb: Schema.optional(Schema.Number),
})).annotate({ identifier: "NodeConfig" }) as any as Schema.Schema<NodeConfig>;

export interface MemcacheParameters {
  /** Output only. The unique ID associated with this set of parameters. Users can use this id to determine if the parameters associated with the instance differ from the parameters associated with the nodes. A discrepancy between parameter ids can inform users that they may need to take action to apply parameters on nodes. */
  id?: string;
  /** User defined set of parameters to use in the memcached process. */
  params?: Record<string, string>;
}

export const MemcacheParameters: Schema.Schema<MemcacheParameters> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  params: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "MemcacheParameters" }) as any as Schema.Schema<MemcacheParameters>;

export interface Node {
  /** Output only. Identifier of the Memcached node. The node id does not include project or location like the Memcached instance name. */
  nodeId?: string;
  /** Output only. Location (GCP Zone) for the Memcached node. */
  zone?: string;
  /** Output only. Current state of the Memcached node. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "DELETING" | "UPDATING" | (string & {});
  /** Output only. Hostname or IP address of the Memcached node used by the clients to connect to the Memcached server on this node. */
  host?: string;
  /** Output only. The port number of the Memcached server on this node. */
  port?: number;
  /** User defined parameters currently applied to the node. */
  parameters?: MemcacheParameters;
  /** Output only. Major version of memcached server running on this node, e.g. MEMCACHE_1_5 */
  memcacheVersion?: "MEMCACHE_VERSION_UNSPECIFIED" | "MEMCACHE_1_5" | "MEMCACHE_1_6_15" | (string & {});
  /** Output only. The full version of memcached server running on this node. e.g. - memcached-1.5.16 */
  memcacheFullVersion?: string;
}

export const Node: Schema.Schema<Node> = Schema.suspend(() => Schema.Struct({
  nodeId: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  host: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  parameters: Schema.optional(MemcacheParameters),
  memcacheVersion: Schema.optional(Schema.String),
  memcacheFullVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "Node" }) as any as Schema.Schema<Node>;

export interface InstanceMessage {
  /** A code that correspond to one type of user-facing message. */
  code?: "CODE_UNSPECIFIED" | "ZONE_DISTRIBUTION_UNBALANCED" | (string & {});
  /** Message on memcached instance which will be exposed to users. */
  message?: string;
}

export const InstanceMessage: Schema.Schema<InstanceMessage> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "InstanceMessage" }) as any as Schema.Schema<InstanceMessage>;

export interface TimeOfDay {
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() => Schema.Struct({
  hours: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface WeeklyMaintenanceWindow {
  /** Required. Allows to define schedule that runs specified day of the week. */
  day?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
  /** Required. Start time of the window in UTC. */
  startTime?: TimeOfDay;
  /** Required. Duration of the time window. */
  duration?: string;
}

export const WeeklyMaintenanceWindow: Schema.Schema<WeeklyMaintenanceWindow> = Schema.suspend(() => Schema.Struct({
  day: Schema.optional(Schema.String),
  startTime: Schema.optional(TimeOfDay),
  duration: Schema.optional(Schema.String),
})).annotate({ identifier: "WeeklyMaintenanceWindow" }) as any as Schema.Schema<WeeklyMaintenanceWindow>;

export interface GoogleCloudMemcacheV1MaintenancePolicy {
  /** Output only. The time when the policy was created. */
  createTime?: string;
  /** Output only. The time when the policy was updated. */
  updateTime?: string;
  /** Description of what this policy is for. Create/Update methods return INVALID_ARGUMENT if the length is greater than 512. */
  description?: string;
  /** Required. Maintenance window that is applied to resources covered by this policy. Minimum 1. For the current version, the maximum number of weekly_maintenance_windows is expected to be one. */
  weeklyMaintenanceWindow?: Array<WeeklyMaintenanceWindow>;
}

export const GoogleCloudMemcacheV1MaintenancePolicy: Schema.Schema<GoogleCloudMemcacheV1MaintenancePolicy> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  weeklyMaintenanceWindow: Schema.optional(Schema.Array(WeeklyMaintenanceWindow)),
})).annotate({ identifier: "GoogleCloudMemcacheV1MaintenancePolicy" }) as any as Schema.Schema<GoogleCloudMemcacheV1MaintenancePolicy>;

export interface MaintenanceSchedule {
  /** Output only. The start time of any upcoming scheduled maintenance for this instance. */
  startTime?: string;
  /** Output only. The end time of any upcoming scheduled maintenance for this instance. */
  endTime?: string;
  /** Output only. The deadline that the maintenance schedule start time can not go beyond, including reschedule. */
  scheduleDeadlineTime?: string;
}

export const MaintenanceSchedule: Schema.Schema<MaintenanceSchedule> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  scheduleDeadlineTime: Schema.optional(Schema.String),
})).annotate({ identifier: "MaintenanceSchedule" }) as any as Schema.Schema<MaintenanceSchedule>;

export interface Instance {
  /** Required. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` Note: Memcached instances are managed and addressed at the regional level so `location_id` here refers to a Google Cloud region; however, users may choose which zones Memcached nodes should be provisioned in within an instance. Refer to zones field for more details. */
  name?: string;
  /** User provided name for the instance, which is only used for display purposes. Cannot be more than 80 characters. */
  displayName?: string;
  /** Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources */
  labels?: Record<string, string>;
  /** The full name of the Google Compute Engine [network](/compute/docs/networks-and-firewalls#networks) to which the instance is connected. If left unspecified, the `default` network will be used. */
  authorizedNetwork?: string;
  /** Zones in which Memcached nodes should be provisioned. Memcached nodes will be equally distributed across these zones. If not provided, the service will by default create nodes in all zones in the region for the instance. */
  zones?: Array<string>;
  /** Required. Number of nodes in the Memcached instance. */
  nodeCount?: number;
  /** Required. Configuration for Memcached nodes. */
  nodeConfig?: NodeConfig;
  /** The major version of Memcached software. If not provided, latest supported version will be used. Currently the latest supported major version is `MEMCACHE_1_5`. The minor version will be automatically determined by our system based on the latest supported minor version. */
  memcacheVersion?: "MEMCACHE_VERSION_UNSPECIFIED" | "MEMCACHE_1_5" | "MEMCACHE_1_6_15" | (string & {});
  /** User defined parameters to apply to the memcached process on each node. */
  parameters?: MemcacheParameters;
  /** Output only. List of Memcached nodes. Refer to Node message for more details. */
  memcacheNodes?: Array<Node>;
  /** Output only. The time the instance was created. */
  createTime?: string;
  /** Output only. The time the instance was updated. */
  updateTime?: string;
  /** Output only. The state of this Memcached instance. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "UPDATING" | "DELETING" | "PERFORMING_MAINTENANCE" | "MEMCACHE_VERSION_UPGRADING" | (string & {});
  /** Output only. The full version of memcached server running on this instance. System automatically determines the full memcached version for an instance based on the input MemcacheVersion. The full version format will be "memcached-1.5.16". */
  memcacheFullVersion?: string;
  /** List of messages that describe the current state of the Memcached instance. */
  instanceMessages?: Array<InstanceMessage>;
  /** Output only. Endpoint for the Discovery API. */
  discoveryEndpoint?: string;
  /** The maintenance policy for the instance. If not provided, the maintenance event will be performed based on Memorystore internal rollout schedule. */
  maintenancePolicy?: GoogleCloudMemcacheV1MaintenancePolicy;
  /** Output only. Published maintenance schedule. */
  maintenanceSchedule?: MaintenanceSchedule;
  /** Optional. Contains the id of allocated IP address ranges associated with the private service access connection for example, "test-default" associated with IP range 10.0.0.0/29. */
  reservedIpRangeId?: Array<string>;
  /** Optional. Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Optional. Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Optional. Last self service update maintenance version triggered by the customer. If it is empty, it means that the maintenance version is not set by the user. */
  maintenanceVersion?: string;
  /** Output only. The effective maintenance version of the instance. */
  effectiveMaintenanceVersion?: string;
  /** Output only. The available maintenance versions that can be applied to the instance. */
  availableMaintenanceVersions?: Array<string>;
}

export const Instance: Schema.Schema<Instance> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  authorizedNetwork: Schema.optional(Schema.String),
  zones: Schema.optional(Schema.Array(Schema.String)),
  nodeCount: Schema.optional(Schema.Number),
  nodeConfig: Schema.optional(NodeConfig),
  memcacheVersion: Schema.optional(Schema.String),
  parameters: Schema.optional(MemcacheParameters),
  memcacheNodes: Schema.optional(Schema.Array(Node)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  memcacheFullVersion: Schema.optional(Schema.String),
  instanceMessages: Schema.optional(Schema.Array(InstanceMessage)),
  discoveryEndpoint: Schema.optional(Schema.String),
  maintenancePolicy: Schema.optional(GoogleCloudMemcacheV1MaintenancePolicy),
  maintenanceSchedule: Schema.optional(MaintenanceSchedule),
  reservedIpRangeId: Schema.optional(Schema.Array(Schema.String)),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  maintenanceVersion: Schema.optional(Schema.String),
  effectiveMaintenanceVersion: Schema.optional(Schema.String),
  availableMaintenanceVersions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Instance" }) as any as Schema.Schema<Instance>;

export interface ListInstancesResponse {
  /** A list of Memcached instances in the project in the specified location, or across all locations. If the `location_id` in the parent field of the request is "-", all regions available to the project are queried, and the results aggregated. */
  instances?: Array<Instance>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListInstancesResponse: Schema.Schema<ListInstancesResponse> = Schema.suspend(() => Schema.Struct({
  instances: Schema.optional(Schema.Array(Instance)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListInstancesResponse" }) as any as Schema.Schema<ListInstancesResponse>;

export interface UpdateParametersRequest {
  /** Required. Mask of fields to update. */
  updateMask?: string;
  /** The parameters to apply to the instance. */
  parameters?: MemcacheParameters;
}

export const UpdateParametersRequest: Schema.Schema<UpdateParametersRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  parameters: Schema.optional(MemcacheParameters),
})).annotate({ identifier: "UpdateParametersRequest" }) as any as Schema.Schema<UpdateParametersRequest>;

export interface ApplyParametersRequest {
  /** Nodes to which the instance-level parameter group is applied. */
  nodeIds?: Array<string>;
  /** Whether to apply instance-level parameter group to all nodes. If set to true, users are restricted from specifying individual nodes, and `ApplyParameters` updates all nodes within the instance. */
  applyAll?: boolean;
}

export const ApplyParametersRequest: Schema.Schema<ApplyParametersRequest> = Schema.suspend(() => Schema.Struct({
  nodeIds: Schema.optional(Schema.Array(Schema.String)),
  applyAll: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ApplyParametersRequest" }) as any as Schema.Schema<ApplyParametersRequest>;

export interface RescheduleMaintenanceRequest {
  /** Required. If reschedule type is SPECIFIC_TIME, must set up schedule_time as well. */
  rescheduleType?: "RESCHEDULE_TYPE_UNSPECIFIED" | "IMMEDIATE" | "NEXT_AVAILABLE_WINDOW" | "SPECIFIC_TIME" | (string & {});
  /** Timestamp when the maintenance shall be rescheduled to if reschedule_type=SPECIFIC_TIME, in RFC 3339 format, for example `2012-11-15T16:19:00.094Z`. */
  scheduleTime?: string;
}

export const RescheduleMaintenanceRequest: Schema.Schema<RescheduleMaintenanceRequest> = Schema.suspend(() => Schema.Struct({
  rescheduleType: Schema.optional(Schema.String),
  scheduleTime: Schema.optional(Schema.String),
})).annotate({ identifier: "RescheduleMaintenanceRequest" }) as any as Schema.Schema<RescheduleMaintenanceRequest>;

export interface GoogleCloudMemcacheV1UpgradeInstanceRequest {
  /** Required. Specifies the target version of memcached engine to upgrade to. */
  memcacheVersion?: "MEMCACHE_VERSION_UNSPECIFIED" | "MEMCACHE_1_5" | "MEMCACHE_1_6_15" | (string & {});
}

export const GoogleCloudMemcacheV1UpgradeInstanceRequest: Schema.Schema<GoogleCloudMemcacheV1UpgradeInstanceRequest> = Schema.suspend(() => Schema.Struct({
  memcacheVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMemcacheV1UpgradeInstanceRequest" }) as any as Schema.Schema<GoogleCloudMemcacheV1UpgradeInstanceRequest>;

export interface SetTagsRequest {
  /** Required. The full resource name of the service resource. */
  name?: string;
  /** Required. These bindings will override any bindings previously set and will be effective immediately. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" */
  tags?: Record<string, string>;
  /** Optional. A unique identifier for this request. Must be a valid UUID. This request is only idempotent if a `request_id` is provided. */
  requestId?: string;
  /** Optional. A checksum based on the current bindings which can be passed to prevent race conditions. If not passed, etag check would be skipped. */
  etag?: string;
}

export const SetTagsRequest: Schema.Schema<SetTagsRequest> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  requestId: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "SetTagsRequest" }) as any as Schema.Schema<SetTagsRequest>;

export interface SetTagsResponse {
  /** Required. The full resource name of the service resource. */
  name?: string;
  /** Required. Tag keys/values directly bound to this resource. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" */
  tags?: Record<string, string>;
  /** A checksum based on the current bindings. This field is always set in server responses. */
  etag?: string;
}

export const SetTagsResponse: Schema.Schema<SetTagsResponse> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "SetTagsResponse" }) as any as Schema.Schema<SetTagsResponse>;

export interface GetTagsResponse {
  /** Required. The full resource name of the service resource. */
  name?: string;
  /** Required. Tag keys/values directly bound to this resource. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" */
  tags?: Record<string, string>;
  /** A checksum based on the current bindings. This field is always set in server responses. */
  etag?: string;
}

export const GetTagsResponse: Schema.Schema<GetTagsResponse> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GetTagsResponse" }) as any as Schema.Schema<GetTagsResponse>;

export interface GoogleCloudMemcacheV1ZoneMetadata {
}

export const GoogleCloudMemcacheV1ZoneMetadata: Schema.Schema<GoogleCloudMemcacheV1ZoneMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudMemcacheV1ZoneMetadata" }) as any as Schema.Schema<GoogleCloudMemcacheV1ZoneMetadata>;

export interface GoogleCloudMemcacheV1LocationMetadata {
  /** Output only. The set of available zones in the location. The map is keyed by the lowercase ID of each zone, as defined by GCE. These keys can be specified in the `zones` field when creating a Memcached instance. */
  availableZones?: Record<string, GoogleCloudMemcacheV1ZoneMetadata>;
}

export const GoogleCloudMemcacheV1LocationMetadata: Schema.Schema<GoogleCloudMemcacheV1LocationMetadata> = Schema.suspend(() => Schema.Struct({
  availableZones: Schema.optional(Schema.Record(Schema.String, GoogleCloudMemcacheV1ZoneMetadata)),
})).annotate({ identifier: "GoogleCloudMemcacheV1LocationMetadata" }) as any as Schema.Schema<GoogleCloudMemcacheV1LocationMetadata>;

export interface ZoneMetadata {
}

export const ZoneMetadata: Schema.Schema<ZoneMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ZoneMetadata" }) as any as Schema.Schema<ZoneMetadata>;

export interface LocationMetadata {
  /** Output only. The set of available zones in the location. The map is keyed by the lowercase ID of each zone, as defined by GCE. These keys can be specified in the `zones` field when creating a Memcached instance. */
  availableZones?: Record<string, ZoneMetadata>;
}

export const LocationMetadata: Schema.Schema<LocationMetadata> = Schema.suspend(() => Schema.Struct({
  availableZones: Schema.optional(Schema.Record(Schema.String, ZoneMetadata)),
})).annotate({ identifier: "LocationMetadata" }) as any as Schema.Schema<LocationMetadata>;

export interface OperationMetadata {
  /** Output only. Time when the operation was created. */
  createTime?: string;
  /** Output only. Time when the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusDetail?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  cancelRequested?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusDetail: Schema.optional(Schema.String),
  cancelRequested: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface GoogleCloudMemcacheV1OperationMetadata {
  /** Output only. Time when the operation was created. */
  createTime?: string;
  /** Output only. Time when the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusDetail?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  cancelRequested?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudMemcacheV1OperationMetadata: Schema.Schema<GoogleCloudMemcacheV1OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusDetail: Schema.optional(Schema.String),
  cancelRequested: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMemcacheV1OperationMetadata" }) as any as Schema.Schema<GoogleCloudMemcacheV1OperationMetadata>;

export interface GetTagsRequest {
  /** Required. The full resource name of the service resource. */
  name?: string;
}

export const GetTagsRequest: Schema.Schema<GetTagsRequest> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GetTagsRequest" }) as any as Schema.Schema<GetTagsRequest>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource {
  /** Type of the resource. This can be either a GCP resource or a custom one (e.g. another cloud provider's VM). For GCP compute resources use singular form of the names listed in GCP compute API documentation (https://cloud.google.com/compute/docs/reference/rest/v1/), prefixed with 'compute-', for example: 'compute-instance', 'compute-disk', 'compute-autoscaler'. */
  resourceType?: string;
  /** URL identifying the resource, e.g. "https://www.googleapis.com/compute/v1/projects/...)". */
  resourceUrl?: string;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource> = Schema.suspend(() => Schema.Struct({
  resourceType: Schema.optional(Schema.String),
  resourceUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource" }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility {
  /** Whether an instance is eligible or ineligible. */
  eligible?: boolean;
  /** User-defined reason for the current value of instance eligibility. Usually, this can be directly mapped to the internal state. An empty reason is allowed. */
  reason?: string;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility> = Schema.suspend(() => Schema.Struct({
  eligible: Schema.optional(Schema.Boolean),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility" }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility {
  /** An entry in the eligibilities map specifies an eligibility for a particular SLI for the given instance. The SLI key in the name must be a valid SLI name specified in the Eligibility Exporter binary flags otherwise an error will be emitted by Eligibility Exporter and the oncaller will be alerted. If an SLI has been defined in the binary flags but the eligibilities map does not contain it, the corresponding SLI time series will not be emitted by the Eligibility Exporter. This ensures a smooth rollout and compatibility between the data produced by different versions of the Eligibility Exporters. If eligibilities map contains a key for an SLI which has not been declared in the binary flags, there will be an error message emitted in the Eligibility Exporter log and the metric for the SLI in question will not be emitted. */
  eligibilities?: Record<string, GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility>;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility> = Schema.suspend(() => Schema.Struct({
  eligibilities: Schema.optional(Schema.Record(Schema.String, GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility)),
})).annotate({ identifier: "GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility" }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata {
  /** The id of the node. This should be equal to SaasInstanceNode.node_id. */
  nodeId?: string;
  /** The location of the node, if different from instance location. */
  location?: string;
  /** If present, this will override eligibility for the node coming from instance or exclusions for specified SLIs. */
  perSliEligibility?: GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata> = Schema.suspend(() => Schema.Struct({
  nodeId: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  perSliEligibility: Schema.optional(GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility),
})).annotate({ identifier: "GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata" }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata {
  /** Name of the SLO tier the Instance belongs to. This name will be expected to match the tiers specified in the service SLO configuration. Field is mandatory and must not be empty. */
  tier?: string;
  /** Optional. List of nodes. Some producers need to use per-node metadata to calculate SLO. This field allows such producers to publish per-node SLO meta data, which will be consumed by SSA Eligibility Exporter and published in the form of per node metric to Monarch. */
  nodes?: Array<GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata>;
  /** Optional. Multiple per-instance SLI eligibilities which apply for individual SLIs. */
  perSliEligibility?: GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata> = Schema.suspend(() => Schema.Struct({
  tier: Schema.optional(Schema.String),
  nodes: Schema.optional(Schema.Array(GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata)),
  perSliEligibility: Schema.optional(GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility),
})).annotate({ identifier: "GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata" }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule {
  /** The scheduled start time for the maintenance. */
  startTime?: string;
  /** The scheduled end time for the maintenance. */
  endTime?: string;
  /** This field is deprecated, and will be always set to true since reschedule can happen multiple times now. This field should not be removed until all service producers remove this for their customers. */
  canReschedule?: boolean;
  /** The rollout management policy this maintenance schedule is associated with. When doing reschedule update request, the reschedule should be against this given policy. */
  rolloutManagementPolicy?: string;
  /** schedule_deadline_time is the time deadline any schedule start time cannot go beyond, including reschedule. It's normally the initial schedule start time plus maintenance window length (1 day or 1 week). Maintenance cannot be scheduled to start beyond this deadline. */
  scheduleDeadlineTime?: string;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  canReschedule: Schema.optional(Schema.Boolean),
  rolloutManagementPolicy: Schema.optional(Schema.String),
  scheduleDeadlineTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule" }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule>;

export interface DailyCycle {
  /** Time within the day to start the operations. */
  startTime?: TimeOfDay;
  /** Output only. Duration of the time window, set by service producer. */
  duration?: string;
}

export const DailyCycle: Schema.Schema<DailyCycle> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(TimeOfDay),
  duration: Schema.optional(Schema.String),
})).annotate({ identifier: "DailyCycle" }) as any as Schema.Schema<DailyCycle>;

export interface Schedule {
  /** Allows to define schedule that runs specified day of the week. */
  day?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
  /** Time within the window to start the operations. */
  startTime?: TimeOfDay;
  /** Output only. Duration of the time window, set by service producer. */
  duration?: string;
}

export const Schedule: Schema.Schema<Schedule> = Schema.suspend(() => Schema.Struct({
  day: Schema.optional(Schema.String),
  startTime: Schema.optional(TimeOfDay),
  duration: Schema.optional(Schema.String),
})).annotate({ identifier: "Schedule" }) as any as Schema.Schema<Schedule>;

export interface WeeklyCycle {
  /** User can specify multiple windows in a week. Minimum of 1 window. */
  schedule?: Array<Schedule>;
}

export const WeeklyCycle: Schema.Schema<WeeklyCycle> = Schema.suspend(() => Schema.Struct({
  schedule: Schema.optional(Schema.Array(Schedule)),
})).annotate({ identifier: "WeeklyCycle" }) as any as Schema.Schema<WeeklyCycle>;

export interface MaintenanceWindow {
  /** Daily cycle. */
  dailyCycle?: DailyCycle;
  /** Weekly cycle. */
  weeklyCycle?: WeeklyCycle;
}

export const MaintenanceWindow: Schema.Schema<MaintenanceWindow> = Schema.suspend(() => Schema.Struct({
  dailyCycle: Schema.optional(DailyCycle),
  weeklyCycle: Schema.optional(WeeklyCycle),
})).annotate({ identifier: "MaintenanceWindow" }) as any as Schema.Schema<MaintenanceWindow>;

export interface Memcache_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Memcache_Date: Schema.Schema<Memcache_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Memcache_Date" }) as any as Schema.Schema<Memcache_Date>;

export interface DenyMaintenancePeriod {
  /** Deny period start date. This can be: * A full date, with non-zero year, month and day values. * A month and day value, with a zero year. Allows recurring deny periods each year. Date matching this period will have to be the same or after the start. */
  startDate?: Memcache_Date;
  /** Deny period end date. This can be: * A full date, with non-zero year, month and day values. * A month and day value, with a zero year. Allows recurring deny periods each year. Date matching this period will have to be before the end. */
  endDate?: Memcache_Date;
  /** Time in UTC when the Blackout period starts on start_date and ends on end_date. This can be: * Full time. * All zeros for 00:00:00 UTC */
  time?: TimeOfDay;
}

export const DenyMaintenancePeriod: Schema.Schema<DenyMaintenancePeriod> = Schema.suspend(() => Schema.Struct({
  startDate: Schema.optional(Memcache_Date),
  endDate: Schema.optional(Memcache_Date),
  time: Schema.optional(TimeOfDay),
})).annotate({ identifier: "DenyMaintenancePeriod" }) as any as Schema.Schema<DenyMaintenancePeriod>;

export interface UpdatePolicy {
  /** Optional. Maintenance window that is applied to resources covered by this policy. */
  window?: MaintenanceWindow;
  /** Optional. Relative scheduling channel applied to resource. */
  channel?: "UPDATE_CHANNEL_UNSPECIFIED" | "EARLIER" | "LATER" | "WEEK1" | "WEEK2" | "WEEK5" | (string & {});
  /** Deny Maintenance Period that is applied to resource to indicate when maintenance is forbidden. The protocol supports zero-to-many such periods, but the current SLM Rollout implementation only supports zero-to-one. */
  denyMaintenancePeriods?: Array<DenyMaintenancePeriod>;
}

export const UpdatePolicy: Schema.Schema<UpdatePolicy> = Schema.suspend(() => Schema.Struct({
  window: Schema.optional(MaintenanceWindow),
  channel: Schema.optional(Schema.String),
  denyMaintenancePeriods: Schema.optional(Schema.Array(DenyMaintenancePeriod)),
})).annotate({ identifier: "UpdatePolicy" }) as any as Schema.Schema<UpdatePolicy>;

export interface MaintenancePolicy {
  /** Required. MaintenancePolicy name using the form: `projects/{project_id}/locations/{location_id}/maintenancePolicies/{maintenance_policy_id}` where {project_id} refers to a GCP consumer project ID, {location_id} refers to a GCP region/zone, {maintenance_policy_id} must be 1-63 characters long and match the regular expression `[a-z0-9]([-a-z0-9]*[a-z0-9])?`. */
  name?: string;
  /** Output only. The time when the resource was created. */
  createTime?: string;
  /** Output only. The time when the resource was updated. */
  updateTime?: string;
  /** Optional. Description of what this policy is for. Create/Update methods return INVALID_ARGUMENT if the length is greater than 512. */
  description?: string;
  /** Optional. Resource labels to represent user provided metadata. Each label is a key-value pair, where both the key and the value are arbitrary strings provided by the user. */
  labels?: Record<string, string>;
  /** Optional. The state of the policy. */
  state?: "STATE_UNSPECIFIED" | "READY" | "DELETING" | (string & {});
  /** Maintenance policy applicable to instance update. */
  updatePolicy?: UpdatePolicy;
}

export const MaintenancePolicy: Schema.Schema<MaintenancePolicy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
  updatePolicy: Schema.optional(UpdatePolicy),
})).annotate({ identifier: "MaintenancePolicy" }) as any as Schema.Schema<MaintenancePolicy>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings {
  /** Optional. Exclude instance from maintenance. When true, rollout service will not attempt maintenance on the instance. Rollout service will include the instance in reported rollout progress as not attempted. */
  exclude?: boolean;
  /** Optional. The MaintenancePolicies that have been attached to the instance. The key must be of the type name of the oneof policy name defined in MaintenancePolicy, and the embedded policy must define the same policy type. For details, please refer to go/mr-user-guide. Should not be set if maintenance_policy_names is set. If only the name is needed, then only populate MaintenancePolicy.name. */
  maintenancePolicies?: Record<string, MaintenancePolicy>;
  /** Optional. If the update call is triggered from rollback, set the value as true. */
  isRollback?: boolean;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings> = Schema.suspend(() => Schema.Struct({
  exclude: Schema.optional(Schema.Boolean),
  maintenancePolicies: Schema.optional(Schema.Record(Schema.String, MaintenancePolicy)),
  isRollback: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings" }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter {
  /** Optional. Array of string values. e.g. instance's replica information. */
  values?: Array<string>;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter" }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1Instance {
  /** Unique name of the resource. It uses the form: `projects/{project_number}/locations/{location_id}/instances/{instance_id}` Note: This name is passed, stored and logged across the rollout system. So use of consumer project_id or any other consumer PII in the name is strongly discouraged for wipeout (go/wipeout) compliance. See go/elysium/project_ids#storage-guidance for more details. */
  name?: string;
  /** Output only. Timestamp when the resource was created. */
  createTime?: string;
  /** Output only. Timestamp when the resource was last modified. */
  updateTime?: string;
  /** Optional. Resource labels to represent user provided metadata. Each label is a key-value pair, where both the key and the value are arbitrary strings provided by the user. */
  labels?: Record<string, string>;
  /** Output only. Current lifecycle state of the resource (e.g. if it's being created or ready to use). */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "UPDATING" | "REPAIRING" | "DELETING" | "ERROR" | (string & {});
  /** Software versions that are used to deploy this instance. This can be mutated by rollout services. */
  softwareVersions?: Record<string, string>;
  /** Optional. The MaintenancePolicies that have been attached to the instance. The key must be of the type name of the oneof policy name defined in MaintenancePolicy, and the referenced policy must define the same policy type. For details, please refer to go/mr-user-guide. Should not be set if maintenance_settings.maintenance_policies is set. */
  maintenancePolicyNames?: Record<string, string>;
  /** Output only. ID of the associated GCP tenant project. See go/get-instance-metadata. */
  tenantProjectId?: string;
  /** Output only. Custom string attributes used primarily to expose producer-specific information in monitoring dashboards. See go/get-instance-metadata. */
  producerMetadata?: Record<string, string>;
  /** Output only. The list of data plane resources provisioned for this instance, e.g. compute VMs. See go/get-instance-metadata. */
  provisionedResources?: Array<GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource>;
  /** Output only. SLO metadata for instance classification in the Standardized dataplane SLO platform. See go/cloud-ssa-standard-slo for feature description. */
  sloMetadata?: GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata;
  /** The MaintenanceSchedule contains the scheduling information of published maintenance schedule with same key as software_versions. */
  maintenanceSchedules?: Record<string, GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule>;
  /** consumer_defined_name is the name of the instance set by the service consumers. Generally this is different from the `name` field which reperesents the system-assigned id of the instance which the service consumers do not recognize. This is a required field for tenants onboarding to Maintenance Window notifications (go/slm-rollout-maintenance-policies#prerequisites). */
  consumerDefinedName?: string;
  /** Link to the SLM instance template. Only populated when updating SLM instances via SSA's Actuation service adaptor. Service producers with custom control plane (e.g. Cloud SQL) doesn't need to populate this field. Instead they should use software_versions. */
  slmInstanceTemplate?: string;
  /** Optional. The MaintenanceSettings associated with instance. */
  maintenanceSettings?: GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings;
  /** Optional. The instance_type of this instance of format: projects/{project_number}/locations/{location_id}/instanceTypes/{instance_type_id}. Instance Type represents a high-level tier or SKU of the service that this instance belong to. When enabled(eg: Maintenance Rollout), Rollout uses 'instance_type' along with 'software_versions' to determine whether instance needs an update or not. */
  instanceType?: string;
  /** Optional. notification_parameter are information that service producers may like to include that is not relevant to Rollout. This parameter will only be passed to Gamma and Cloud Logging for notification/logging purpose. */
  notificationParameters?: Record<string, GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter>;
  /** Optional. The consumer_project_number associated with this Apigee instance. This field is added specifically to support Apigee integration with SLM Rollout and UMM. It represents the numerical project ID of the GCP project that consumes this Apigee instance. It is used for SLM rollout notifications and UMM integration, enabling proper mapping to customer projects and log delivery for Apigee instances. This field complements consumer_project_id and may be used for specific Apigee scenarios where the numerical ID is required. */
  consumerProjectNumber?: string;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1Instance: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1Instance> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
  softwareVersions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  maintenancePolicyNames: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  tenantProjectId: Schema.optional(Schema.String),
  producerMetadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  provisionedResources: Schema.optional(Schema.Array(GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource)),
  sloMetadata: Schema.optional(GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata),
  maintenanceSchedules: Schema.optional(Schema.Record(Schema.String, GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule)),
  consumerDefinedName: Schema.optional(Schema.String),
  slmInstanceTemplate: Schema.optional(Schema.String),
  maintenanceSettings: Schema.optional(GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings),
  instanceType: Schema.optional(Schema.String),
  notificationParameters: Schema.optional(Schema.Record(Schema.String, GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter)),
  consumerProjectNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSaasacceleratorManagementProvidersV1Instance" }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1Instance>;

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

/** Lists Instances in a given location. */
export interface ListProjectsLocationsInstancesRequest {
  /** Required. The resource name of the instance location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a GCP region */
  parent: string;
  /** The maximum number of items to return. If not specified, a default value of 1000 will be used by the service. Regardless of the `page_size` value, the response may include a partial list and a caller should only rely on response's `next_page_token` to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** The `next_page_token` value returned from a previous List request, if any. */
  pageToken?: string;
  /** List filter. For example, exclude all Memcached instances with name as my-instance by specifying `"name != my-instance"`. */
  filter?: string;
  /** Sort results. Supported values are "name", "name desc" or "" (unsorted). */
  orderBy?: string;
}

export const ListProjectsLocationsInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInstancesRequest>;

export type ListProjectsLocationsInstancesResponse = ListInstancesResponse;
export const ListProjectsLocationsInstancesResponse = ListInstancesResponse;

export type ListProjectsLocationsInstancesError = CommonErrors;

export const listProjectsLocationsInstances = API.makePaginated(() => ({
  input: ListProjectsLocationsInstancesRequest,
  output: ListProjectsLocationsInstancesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single Instance. */
export interface GetProjectsLocationsInstancesRequest {
  /** Required. Memcached instance resource name in the format: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region */
  name: string;
}

export const GetProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInstancesRequest>;

export type GetProjectsLocationsInstancesResponse = Instance;
export const GetProjectsLocationsInstancesResponse = Instance;

export type GetProjectsLocationsInstancesError = CommonErrors;

export const getProjectsLocationsInstances: API.OperationMethod<GetProjectsLocationsInstancesRequest, GetProjectsLocationsInstancesResponse, GetProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInstancesRequest,
  output: GetProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Creates a new Instance in a given location. */
export interface CreateProjectsLocationsInstancesRequest {
  /** Required. The resource name of the instance location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a GCP region */
  parent: string;
  /** Required. The logical name of the Memcached instance in the user project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-40 characters. * Must end with a number or a letter. * Must be unique within the user project / location. If any of the above are not met, the API raises an invalid argument error. */
  instanceId?: string;
  /** Request body */
  body?: Instance;
}

export const CreateProjectsLocationsInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  instanceId: Schema.optional(Schema.String).pipe(T.HttpQuery("instanceId")),
  body: Schema.optional(Instance).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsInstancesRequest>;

export type CreateProjectsLocationsInstancesResponse = Operation;
export const CreateProjectsLocationsInstancesResponse = Operation;

export type CreateProjectsLocationsInstancesError = CommonErrors;

export const createProjectsLocationsInstances: API.OperationMethod<CreateProjectsLocationsInstancesRequest, CreateProjectsLocationsInstancesResponse, CreateProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsInstancesRequest,
  output: CreateProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Updates an existing Instance in a given project and location. */
export interface PatchProjectsLocationsInstancesRequest {
  /** Required. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` Note: Memcached instances are managed and addressed at the regional level so `location_id` here refers to a Google Cloud region; however, users may choose which zones Memcached nodes should be provisioned in within an instance. Refer to zones field for more details. */
  name: string;
  /** Required. Mask of fields to update. * `displayName` */
  updateMask?: string;
  /** Request body */
  body?: Instance;
}

export const PatchProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Instance).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsInstancesRequest>;

export type PatchProjectsLocationsInstancesResponse = Operation;
export const PatchProjectsLocationsInstancesResponse = Operation;

export type PatchProjectsLocationsInstancesError = CommonErrors;

export const patchProjectsLocationsInstances: API.OperationMethod<PatchProjectsLocationsInstancesRequest, PatchProjectsLocationsInstancesResponse, PatchProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsInstancesRequest,
  output: PatchProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Updates the defined Memcached parameters for an existing instance. This method only stages the parameters, it must be followed by `ApplyParameters` to apply the parameters to nodes of the Memcached instance. */
export interface UpdateParametersProjectsLocationsInstancesRequest {
  /** Required. Resource name of the Memcached instance for which the parameters should be updated. */
  name: string;
  /** Request body */
  body?: UpdateParametersRequest;
}

export const UpdateParametersProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateParametersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:updateParameters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateParametersProjectsLocationsInstancesRequest>;

export type UpdateParametersProjectsLocationsInstancesResponse = Operation;
export const UpdateParametersProjectsLocationsInstancesResponse = Operation;

export type UpdateParametersProjectsLocationsInstancesError = CommonErrors;

export const updateParametersProjectsLocationsInstances: API.OperationMethod<UpdateParametersProjectsLocationsInstancesRequest, UpdateParametersProjectsLocationsInstancesResponse, UpdateParametersProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateParametersProjectsLocationsInstancesRequest,
  output: UpdateParametersProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Deletes a single Instance. */
export interface DeleteProjectsLocationsInstancesRequest {
  /** Required. Memcached instance resource name in the format: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region */
  name: string;
}

export const DeleteProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsInstancesRequest>;

export type DeleteProjectsLocationsInstancesResponse = Operation;
export const DeleteProjectsLocationsInstancesResponse = Operation;

export type DeleteProjectsLocationsInstancesError = CommonErrors;

export const deleteProjectsLocationsInstances: API.OperationMethod<DeleteProjectsLocationsInstancesRequest, DeleteProjectsLocationsInstancesResponse, DeleteProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsInstancesRequest,
  output: DeleteProjectsLocationsInstancesResponse,
  errors: [],
}));

/** `ApplyParameters` restarts the set of specified nodes in order to update them to the current set of parameters for the Memcached Instance. */
export interface ApplyParametersProjectsLocationsInstancesRequest {
  /** Required. Resource name of the Memcached instance for which parameter group updates should be applied. */
  name: string;
  /** Request body */
  body?: ApplyParametersRequest;
}

export const ApplyParametersProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApplyParametersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:applyParameters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApplyParametersProjectsLocationsInstancesRequest>;

export type ApplyParametersProjectsLocationsInstancesResponse = Operation;
export const ApplyParametersProjectsLocationsInstancesResponse = Operation;

export type ApplyParametersProjectsLocationsInstancesError = CommonErrors;

export const applyParametersProjectsLocationsInstances: API.OperationMethod<ApplyParametersProjectsLocationsInstancesRequest, ApplyParametersProjectsLocationsInstancesResponse, ApplyParametersProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApplyParametersProjectsLocationsInstancesRequest,
  output: ApplyParametersProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Reschedules upcoming maintenance event. */
export interface RescheduleMaintenanceProjectsLocationsInstancesRequest {
  /** Required. Memcache instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region. */
  instance: string;
  /** Request body */
  body?: RescheduleMaintenanceRequest;
}

export const RescheduleMaintenanceProjectsLocationsInstancesRequest = Schema.Struct({
  instance: Schema.String.pipe(T.HttpPath("instance")),
  body: Schema.optional(RescheduleMaintenanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:rescheduleMaintenance", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RescheduleMaintenanceProjectsLocationsInstancesRequest>;

export type RescheduleMaintenanceProjectsLocationsInstancesResponse = Operation;
export const RescheduleMaintenanceProjectsLocationsInstancesResponse = Operation;

export type RescheduleMaintenanceProjectsLocationsInstancesError = CommonErrors;

export const rescheduleMaintenanceProjectsLocationsInstances: API.OperationMethod<RescheduleMaintenanceProjectsLocationsInstancesRequest, RescheduleMaintenanceProjectsLocationsInstancesResponse, RescheduleMaintenanceProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RescheduleMaintenanceProjectsLocationsInstancesRequest,
  output: RescheduleMaintenanceProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Upgrades the Memcache instance to a newer memcached engine version specified in the request. */
export interface UpgradeProjectsLocationsInstancesRequest {
  /** Required. Memcache instance resource name using the form: `projects/{project}/locations/{location}/instances/{instance}` where `location_id` refers to a GCP region. */
  name: string;
  /** Request body */
  body?: GoogleCloudMemcacheV1UpgradeInstanceRequest;
}

export const UpgradeProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudMemcacheV1UpgradeInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:upgrade", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpgradeProjectsLocationsInstancesRequest>;

export type UpgradeProjectsLocationsInstancesResponse = Operation;
export const UpgradeProjectsLocationsInstancesResponse = Operation;

export type UpgradeProjectsLocationsInstancesError = CommonErrors;

export const upgradeProjectsLocationsInstances: API.OperationMethod<UpgradeProjectsLocationsInstancesRequest, UpgradeProjectsLocationsInstancesResponse, UpgradeProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpgradeProjectsLocationsInstancesRequest,
  output: UpgradeProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Updates tags directly bound to a GCP resource. */
export interface SetTagsProjectsLocationsInstancesRequest {
  /** Required. The full resource name of the service resource. */
  name: string;
  /** Request body */
  body?: SetTagsRequest;
}

export const SetTagsProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetTagsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:setTags", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetTagsProjectsLocationsInstancesRequest>;

export type SetTagsProjectsLocationsInstancesResponse = SetTagsResponse;
export const SetTagsProjectsLocationsInstancesResponse = SetTagsResponse;

export type SetTagsProjectsLocationsInstancesError = CommonErrors;

export const setTagsProjectsLocationsInstances: API.OperationMethod<SetTagsProjectsLocationsInstancesRequest, SetTagsProjectsLocationsInstancesResponse, SetTagsProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetTagsProjectsLocationsInstancesRequest,
  output: SetTagsProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Returns tags directly bound to a GCP resource. */
export interface GetTagsProjectsLocationsInstancesRequest {
  /** Required. The full resource name of the service resource. */
  name: string;
}

export const GetTagsProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:getTags" }),
  svc,
) as unknown as Schema.Schema<GetTagsProjectsLocationsInstancesRequest>;

export type GetTagsProjectsLocationsInstancesResponse = GetTagsResponse;
export const GetTagsProjectsLocationsInstancesResponse = GetTagsResponse;

export type GetTagsProjectsLocationsInstancesError = CommonErrors;

export const getTagsProjectsLocationsInstances: API.OperationMethod<GetTagsProjectsLocationsInstancesRequest, GetTagsProjectsLocationsInstancesResponse, GetTagsProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTagsProjectsLocationsInstancesRequest,
  output: GetTagsProjectsLocationsInstancesResponse,
  errors: [],
}));

