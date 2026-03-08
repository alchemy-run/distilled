// ==========================================================================
// Cloud TPU API (tpu v2alpha1)
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
  name: "tpu",
  version: "v2alpha1",
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

export interface NetworkConfig {
  /** The name of the network for the TPU node. It must be a preexisting Google Compute Engine network. If none is provided, "default" will be used. */
  network?: string;
  /** The name of the subnetwork for the TPU node. It must be a preexisting Google Compute Engine subnetwork. If none is provided, "default" will be used. */
  subnetwork?: string;
  /** Indicates that external IP addresses would be associated with the TPU workers. If set to false, the specified subnetwork or network should have Private Google Access enabled. */
  enableExternalIps?: boolean;
  /** Allows the TPU node to send and receive packets with non-matching destination or source IPs. This is required if you plan to use the TPU workers to forward routes. */
  canIpForward?: boolean;
  /** Optional. Specifies networking queue count for TPU VM instance's network interface. */
  queueCount?: number;
}

export const NetworkConfig: Schema.Schema<NetworkConfig> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
  enableExternalIps: Schema.optional(Schema.Boolean),
  canIpForward: Schema.optional(Schema.Boolean),
  queueCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "NetworkConfig" }) as any as Schema.Schema<NetworkConfig>;

export interface ServiceAccount {
  /** Email address of the service account. If empty, default Compute service account will be used. */
  email?: string;
  /** The list of scopes to be made available for this service account. If empty, access to all Cloud APIs will be allowed. */
  scope?: Array<string>;
}

export const ServiceAccount: Schema.Schema<ServiceAccount> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ServiceAccount" }) as any as Schema.Schema<ServiceAccount>;

export interface SchedulingConfig {
  /** Defines whether the node is preemptible. */
  preemptible?: boolean;
  /** Whether the node is created under a reservation. */
  reserved?: boolean;
  /** Optional. Defines whether the node is Spot VM. */
  spot?: boolean;
  /** Optional. Name of the reservation in which the node should be provisioned. */
  reservationName?: string;
  /** Output only. The time at which the node will be terminated. */
  terminationTimestamp?: string;
  /** Optional. Defines the provisioning model for the node. */
  provisioningModel?: "PROVISIONING_MODEL_UNSPECIFIED" | "STANDARD" | "SPOT" | "RESERVATION_BOUND" | (string & {});
}

export const SchedulingConfig: Schema.Schema<SchedulingConfig> = Schema.suspend(() => Schema.Struct({
  preemptible: Schema.optional(Schema.Boolean),
  reserved: Schema.optional(Schema.Boolean),
  spot: Schema.optional(Schema.Boolean),
  reservationName: Schema.optional(Schema.String),
  terminationTimestamp: Schema.optional(Schema.String),
  provisioningModel: Schema.optional(Schema.String),
})).annotate({ identifier: "SchedulingConfig" }) as any as Schema.Schema<SchedulingConfig>;

export interface AccessConfig {
  /** Output only. An external IP address associated with the TPU worker. */
  externalIp?: string;
}

export const AccessConfig: Schema.Schema<AccessConfig> = Schema.suspend(() => Schema.Struct({
  externalIp: Schema.optional(Schema.String),
})).annotate({ identifier: "AccessConfig" }) as any as Schema.Schema<AccessConfig>;

export interface NetworkEndpoint {
  /** The internal IP address of this network endpoint. */
  ipAddress?: string;
  /** The port of this network endpoint. */
  port?: number;
  /** The access config for the TPU worker. */
  accessConfig?: AccessConfig;
}

export const NetworkEndpoint: Schema.Schema<NetworkEndpoint> = Schema.suspend(() => Schema.Struct({
  ipAddress: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  accessConfig: Schema.optional(AccessConfig),
})).annotate({ identifier: "NetworkEndpoint" }) as any as Schema.Schema<NetworkEndpoint>;

export interface AttachedDisk {
  /** Specifies the full path to an existing disk. For example: "projects/my-project/zones/us-central1-c/disks/my-disk". */
  sourceDisk?: string;
  /** The mode in which to attach this disk. If not specified, the default is READ_WRITE mode. Only applicable to data_disks. */
  mode?: "DISK_MODE_UNSPECIFIED" | "READ_WRITE" | "READ_ONLY" | (string & {});
  /** Optional. The list of worker IDs this disk is attached to. */
  workerIds?: Array<string>;
}

export const AttachedDisk: Schema.Schema<AttachedDisk> = Schema.suspend(() => Schema.Struct({
  sourceDisk: Schema.optional(Schema.String),
  mode: Schema.optional(Schema.String),
  workerIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AttachedDisk" }) as any as Schema.Schema<AttachedDisk>;

export interface Symptom {
  /** Timestamp when the Symptom is created. */
  createTime?: string;
  /** Type of the Symptom. */
  symptomType?: "SYMPTOM_TYPE_UNSPECIFIED" | "LOW_MEMORY" | "OUT_OF_MEMORY" | "EXECUTE_TIMED_OUT" | "MESH_BUILD_FAIL" | "HBM_OUT_OF_MEMORY" | "PROJECT_ABUSE" | (string & {});
  /** Detailed information of the current Symptom. */
  details?: string;
  /** A string used to uniquely distinguish a worker within a TPU node. */
  workerId?: string;
}

export const Symptom: Schema.Schema<Symptom> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  symptomType: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
  workerId: Schema.optional(Schema.String),
})).annotate({ identifier: "Symptom" }) as any as Schema.Schema<Symptom>;

export interface AcceleratorConfig {
  /** Required. Type of TPU. */
  type?: "TYPE_UNSPECIFIED" | "V2" | "V3" | "V4" | "V5LITE_POD" | "V5P" | "V6E" | (string & {});
  /** Required. Topology of TPU in chips. */
  topology?: string;
}

export const AcceleratorConfig: Schema.Schema<AcceleratorConfig> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  topology: Schema.optional(Schema.String),
})).annotate({ identifier: "AcceleratorConfig" }) as any as Schema.Schema<AcceleratorConfig>;

export interface ShieldedInstanceConfig {
  /** Defines whether the instance has Secure Boot enabled. */
  enableSecureBoot?: boolean;
}

export const ShieldedInstanceConfig: Schema.Schema<ShieldedInstanceConfig> = Schema.suspend(() => Schema.Struct({
  enableSecureBoot: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ShieldedInstanceConfig" }) as any as Schema.Schema<ShieldedInstanceConfig>;

export interface CustomerEncryptionKey {
  /** The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/KMS_PROJECT_ID/locations/REGION/keyRings/KEY_REGION/cryptoKeys/KEY The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/KMS_PROJECT_ID/locations/REGION/keyRings/KEY_REGION/cryptoKeys/KEY/cryptoKeyVersions/1 */
  kmsKeyName?: string;
}

export const CustomerEncryptionKey: Schema.Schema<CustomerEncryptionKey> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomerEncryptionKey" }) as any as Schema.Schema<CustomerEncryptionKey>;

export interface BootDiskConfig {
  /** Optional. Customer encryption key for boot disk. */
  customerEncryptionKey?: CustomerEncryptionKey;
  /** Optional. Whether the boot disk will be created with confidential compute mode. */
  enableConfidentialCompute?: boolean;
  /** Optional. Image from which boot disk is to be created. If not specified, the default image for the runtime version will be used. Example: `projects/$PROJECT_ID/global/images/$IMAGE_NAME`. */
  sourceImage?: string;
  /** Optional. Size of the boot disk in GB. It must be larger than or equal to the size of the image. */
  diskSizeGb?: string;
  /** Optional. Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. To learn more about IOPS, see [Provisioning persistent disk performance](https://cloud.google.com/compute/docs/disks/performance#provisioned-iops). */
  provisionedIops?: string;
  /** Optional. Indicates how much throughput to provision for the disk. This sets the number of throughput MB per second that the disk can handle. */
  provisionedThroughput?: string;
  /** Optional. The storage pool in which the boot disk is created. You can provide this as a partial or full URL to the resource. */
  storagePool?: string;
}

export const BootDiskConfig: Schema.Schema<BootDiskConfig> = Schema.suspend(() => Schema.Struct({
  customerEncryptionKey: Schema.optional(CustomerEncryptionKey),
  enableConfidentialCompute: Schema.optional(Schema.Boolean),
  sourceImage: Schema.optional(Schema.String),
  diskSizeGb: Schema.optional(Schema.String),
  provisionedIops: Schema.optional(Schema.String),
  provisionedThroughput: Schema.optional(Schema.String),
  storagePool: Schema.optional(Schema.String),
})).annotate({ identifier: "BootDiskConfig" }) as any as Schema.Schema<BootDiskConfig>;

export interface UpcomingMaintenance {
  /** Defines the type of maintenance. */
  type?: "UNKNOWN_TYPE" | "SCHEDULED" | "UNSCHEDULED" | (string & {});
  /** Indicates if the maintenance can be customer triggered. */
  canReschedule?: boolean;
  /** The current start time of the maintenance window. This timestamp value is in RFC3339 text format. */
  windowStartTime?: string;
  /** The time by which the maintenance disruption will be completed. This timestamp value is in RFC3339 text format. */
  windowEndTime?: string;
  /** The latest time for the planned maintenance window to start. This timestamp value is in RFC3339 text format. */
  latestWindowStartTime?: string;
  /** The status of the maintenance. */
  maintenanceStatus?: "UNKNOWN" | "PENDING" | "ONGOING" | (string & {});
}

export const UpcomingMaintenance: Schema.Schema<UpcomingMaintenance> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  canReschedule: Schema.optional(Schema.Boolean),
  windowStartTime: Schema.optional(Schema.String),
  windowEndTime: Schema.optional(Schema.String),
  latestWindowStartTime: Schema.optional(Schema.String),
  maintenanceStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "UpcomingMaintenance" }) as any as Schema.Schema<UpcomingMaintenance>;

export interface Node {
  /** Output only. Immutable. The name of the TPU. */
  name?: string;
  /** The user-supplied description of the TPU. Maximum of 512 characters. */
  description?: string;
  /** The type of hardware accelerators associated with this node. */
  acceleratorType?: string;
  /** Output only. The current state for the TPU Node. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "RESTARTING" | "REIMAGING" | "DELETING" | "REPAIRING" | "STOPPED" | "STOPPING" | "STARTING" | "PREEMPTED" | "TERMINATED" | "HIDING" | "HIDDEN" | "UNHIDING" | "UNKNOWN" | (string & {});
  /** Output only. If this field is populated, it contains a description of why the TPU Node is unhealthy. */
  healthDescription?: string;
  /** Required. The runtime version running in the Node. */
  runtimeVersion?: string;
  /** Network configurations for the TPU node. network_config and network_configs are mutually exclusive, you can only specify one of them. If both are specified, an error will be returned. */
  networkConfig?: NetworkConfig;
  /** Optional. Repeated network configurations for the TPU node. This field is used to specify multiple networks configs for the TPU node. network_config and network_configs are mutually exclusive, you can only specify one of them. If both are specified, an error will be returned. */
  networkConfigs?: Array<NetworkConfig>;
  /** The CIDR block that the TPU node will use when selecting an IP address. This CIDR block must be a /29 block; the Compute Engine networks API forbids a smaller block, and using a larger block would be wasteful (a node can only consume one IP address). Errors will occur if the CIDR block has already been used for a currently existing TPU node, the CIDR block conflicts with any subnetworks in the user's provided network, or the provided network is peered with another network that is using that CIDR block. */
  cidrBlock?: string;
  /** The Google Cloud Platform Service Account to be used by the TPU node VMs. If None is specified, the default compute service account will be used. */
  serviceAccount?: ServiceAccount;
  /** Output only. The time when the node was created. */
  createTime?: string;
  /** The scheduling options for this node. */
  schedulingConfig?: SchedulingConfig;
  /** Output only. The network endpoints where TPU workers can be accessed and sent work. It is recommended that runtime clients of the node reach out to the 0th entry in this map first. */
  networkEndpoints?: Array<NetworkEndpoint>;
  /** The health status of the TPU node. */
  health?: "HEALTH_UNSPECIFIED" | "HEALTHY" | "TIMEOUT" | "UNHEALTHY_TENSORFLOW" | "UNHEALTHY_MAINTENANCE" | (string & {});
  /** Resource labels to represent user-provided metadata. */
  labels?: Record<string, string>;
  /** Custom metadata to apply to the TPU Node. Can set startup-script and shutdown-script */
  metadata?: Record<string, string>;
  /** Tags to apply to the TPU Node. Tags are used to identify valid sources or targets for network firewalls. */
  tags?: Array<string>;
  /** Output only. The unique identifier for the TPU Node. */
  id?: string;
  /** The additional data disks for the Node. */
  dataDisks?: Array<AttachedDisk>;
  /** Output only. The API version that created this Node. */
  apiVersion?: "API_VERSION_UNSPECIFIED" | "V1_ALPHA1" | "V1" | "V2_ALPHA1" | (string & {});
  /** Output only. The Symptoms that have occurred to the TPU Node. */
  symptoms?: Array<Symptom>;
  /** Output only. The qualified name of the QueuedResource that requested this Node. */
  queuedResource?: string;
  /** The AccleratorConfig for the TPU Node. */
  acceleratorConfig?: AcceleratorConfig;
  /** Shielded Instance options. */
  shieldedInstanceConfig?: ShieldedInstanceConfig;
  /** Output only. Whether the Node belongs to a Multislice group. */
  multisliceNode?: boolean;
  /** Optional. Whether Autocheckpoint is enabled. */
  autocheckpointEnabled?: boolean;
  /** Optional. Boot disk configuration. */
  bootDiskConfig?: BootDiskConfig;
  /** Output only. Upcoming maintenance on this TPU node. */
  upcomingMaintenance?: UpcomingMaintenance;
}

export const Node: Schema.Schema<Node> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  acceleratorType: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  healthDescription: Schema.optional(Schema.String),
  runtimeVersion: Schema.optional(Schema.String),
  networkConfig: Schema.optional(NetworkConfig),
  networkConfigs: Schema.optional(Schema.Array(NetworkConfig)),
  cidrBlock: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(ServiceAccount),
  createTime: Schema.optional(Schema.String),
  schedulingConfig: Schema.optional(SchedulingConfig),
  networkEndpoints: Schema.optional(Schema.Array(NetworkEndpoint)),
  health: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  tags: Schema.optional(Schema.Array(Schema.String)),
  id: Schema.optional(Schema.String),
  dataDisks: Schema.optional(Schema.Array(AttachedDisk)),
  apiVersion: Schema.optional(Schema.String),
  symptoms: Schema.optional(Schema.Array(Symptom)),
  queuedResource: Schema.optional(Schema.String),
  acceleratorConfig: Schema.optional(AcceleratorConfig),
  shieldedInstanceConfig: Schema.optional(ShieldedInstanceConfig),
  multisliceNode: Schema.optional(Schema.Boolean),
  autocheckpointEnabled: Schema.optional(Schema.Boolean),
  bootDiskConfig: Schema.optional(BootDiskConfig),
  upcomingMaintenance: Schema.optional(UpcomingMaintenance),
})).annotate({ identifier: "Node" }) as any as Schema.Schema<Node>;

export interface ListNodesResponse {
  /** The listed nodes. */
  nodes?: Array<Node>;
  /** The next page token or empty if none. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListNodesResponse: Schema.Schema<ListNodesResponse> = Schema.suspend(() => Schema.Struct({
  nodes: Schema.optional(Schema.Array(Node)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListNodesResponse" }) as any as Schema.Schema<ListNodesResponse>;

export interface StopNodeRequest {
}

export const StopNodeRequest: Schema.Schema<StopNodeRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StopNodeRequest" }) as any as Schema.Schema<StopNodeRequest>;

export interface StartNodeRequest {
}

export const StartNodeRequest: Schema.Schema<StartNodeRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StartNodeRequest" }) as any as Schema.Schema<StartNodeRequest>;

export interface PerformMaintenanceRequest {
}

export const PerformMaintenanceRequest: Schema.Schema<PerformMaintenanceRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PerformMaintenanceRequest" }) as any as Schema.Schema<PerformMaintenanceRequest>;

export interface MultiNodeParams {
  /** Required. Number of nodes with this spec. The system will attempt to provison "node_count" nodes as part of the request. This needs to be > 1. */
  nodeCount?: number;
  /** Prefix of node_ids in case of multi-node request Should follow the `^[A-Za-z0-9_.~+%-]+$` regex format. If node_count = 3 and node_id_prefix = "np", node ids of nodes created will be "np-0", "np-1", "np-2". If this field is not provided we use queued_resource_id as the node_id_prefix. */
  nodeIdPrefix?: string;
  /** Optional. The workload type for the multi-node request. */
  workloadType?: "WORKLOAD_TYPE_UNSPECIFIED" | "THROUGHPUT_OPTIMIZED" | "AVAILABILITY_OPTIMIZED" | (string & {});
}

export const MultiNodeParams: Schema.Schema<MultiNodeParams> = Schema.suspend(() => Schema.Struct({
  nodeCount: Schema.optional(Schema.Number),
  nodeIdPrefix: Schema.optional(Schema.String),
  workloadType: Schema.optional(Schema.String),
})).annotate({ identifier: "MultiNodeParams" }) as any as Schema.Schema<MultiNodeParams>;

export interface NodeSpec {
  /** Required. The parent resource name. */
  parent?: string;
  /** The unqualified resource name. Should follow the `^[A-Za-z0-9_.~+%-]+$` regex format. This is only specified when requesting a single node. In case of multi-node requests, multi_node_params must be populated instead. It's an error to specify both node_id and multi_node_params. */
  nodeId?: string;
  /** Optional. Fields to specify in case of multi-node request. */
  multiNodeParams?: MultiNodeParams;
  /** Required. The node. */
  node?: Node;
}

export const NodeSpec: Schema.Schema<NodeSpec> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  nodeId: Schema.optional(Schema.String),
  multiNodeParams: Schema.optional(MultiNodeParams),
  node: Schema.optional(Node),
})).annotate({ identifier: "NodeSpec" }) as any as Schema.Schema<NodeSpec>;

export interface Tpu {
  /** The TPU node(s) being requested. */
  nodeSpec?: Array<NodeSpec>;
}

export const Tpu: Schema.Schema<Tpu> = Schema.suspend(() => Schema.Struct({
  nodeSpec: Schema.optional(Schema.Array(NodeSpec)),
})).annotate({ identifier: "Tpu" }) as any as Schema.Schema<Tpu>;

export interface BestEffort {
}

export const BestEffort: Schema.Schema<BestEffort> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "BestEffort" }) as any as Schema.Schema<BestEffort>;

export interface Guaranteed {
  /** Optional. Defines the minimum duration of the guarantee. If specified, the requested resources will only be provisioned if they can be allocated for at least the given duration. */
  minDuration?: string;
  /** Optional. Specifies the request should be scheduled on reserved capacity. */
  reserved?: boolean;
}

export const Guaranteed: Schema.Schema<Guaranteed> = Schema.suspend(() => Schema.Struct({
  minDuration: Schema.optional(Schema.String),
  reserved: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Guaranteed" }) as any as Schema.Schema<Guaranteed>;

export interface Spot {
}

export const Spot: Schema.Schema<Spot> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Spot" }) as any as Schema.Schema<Spot>;

export interface Interval {
  /** Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. */
  startTime?: string;
  /** Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. */
  endTime?: string;
}

export const Interval: Schema.Schema<Interval> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Interval" }) as any as Schema.Schema<Interval>;

export interface QueueingPolicy {
  /** A relative time after which resources should not be created. If the request cannot be fulfilled by this time the request will be failed. */
  validUntilDuration?: string;
  /** An absolute time after which resources should not be created. If the request cannot be fulfilled by this time the request will be failed. */
  validUntilTime?: string;
  /** A relative time after which resources may be created. */
  validAfterDuration?: string;
  /** An absolute time at which resources may be created. */
  validAfterTime?: string;
  /** An absolute time interval within which resources may be created. */
  validInterval?: Interval;
}

export const QueueingPolicy: Schema.Schema<QueueingPolicy> = Schema.suspend(() => Schema.Struct({
  validUntilDuration: Schema.optional(Schema.String),
  validUntilTime: Schema.optional(Schema.String),
  validAfterDuration: Schema.optional(Schema.String),
  validAfterTime: Schema.optional(Schema.String),
  validInterval: Schema.optional(Interval),
})).annotate({ identifier: "QueueingPolicy" }) as any as Schema.Schema<QueueingPolicy>;

export interface CreatingData {
}

export const CreatingData: Schema.Schema<CreatingData> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CreatingData" }) as any as Schema.Schema<CreatingData>;

export interface AcceptedData {
}

export const AcceptedData: Schema.Schema<AcceptedData> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AcceptedData" }) as any as Schema.Schema<AcceptedData>;

export interface ProvisioningData {
}

export const ProvisioningData: Schema.Schema<ProvisioningData> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ProvisioningData" }) as any as Schema.Schema<ProvisioningData>;

export interface FailedData {
  /** The error that caused the queued resource to enter the FAILED state. */
  error?: Status;
}

export const FailedData: Schema.Schema<FailedData> = Schema.suspend(() => Schema.Struct({
  error: Schema.optional(Status),
})).annotate({ identifier: "FailedData" }) as any as Schema.Schema<FailedData>;

export interface DeletingData {
}

export const DeletingData: Schema.Schema<DeletingData> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeletingData" }) as any as Schema.Schema<DeletingData>;

export interface ActiveData {
}

export const ActiveData: Schema.Schema<ActiveData> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ActiveData" }) as any as Schema.Schema<ActiveData>;

export interface SuspendingData {
}

export const SuspendingData: Schema.Schema<SuspendingData> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SuspendingData" }) as any as Schema.Schema<SuspendingData>;

export interface SuspendedData {
}

export const SuspendedData: Schema.Schema<SuspendedData> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SuspendedData" }) as any as Schema.Schema<SuspendedData>;

export interface QueuedResourceState {
  /** State of the QueuedResource request. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACCEPTED" | "PROVISIONING" | "FAILED" | "DELETING" | "ACTIVE" | "SUSPENDING" | "SUSPENDED" | "WAITING_FOR_RESOURCES" | (string & {});
  /** Further data for the creating state. */
  creatingData?: CreatingData;
  /** Further data for the accepted state. */
  acceptedData?: AcceptedData;
  /** Further data for the provisioning state. */
  provisioningData?: ProvisioningData;
  /** Further data for the failed state. */
  failedData?: FailedData;
  /** Further data for the deleting state. */
  deletingData?: DeletingData;
  /** Further data for the active state. */
  activeData?: ActiveData;
  /** Further data for the suspending state. */
  suspendingData?: SuspendingData;
  /** Further data for the suspended state. */
  suspendedData?: SuspendedData;
  /** Output only. The initiator of the QueuedResources's current state. Used to indicate whether the SUSPENDING/SUSPENDED state was initiated by the user or the service. */
  stateInitiator?: "STATE_INITIATOR_UNSPECIFIED" | "USER" | "SERVICE" | (string & {});
}

export const QueuedResourceState: Schema.Schema<QueuedResourceState> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  creatingData: Schema.optional(CreatingData),
  acceptedData: Schema.optional(AcceptedData),
  provisioningData: Schema.optional(ProvisioningData),
  failedData: Schema.optional(FailedData),
  deletingData: Schema.optional(DeletingData),
  activeData: Schema.optional(ActiveData),
  suspendingData: Schema.optional(SuspendingData),
  suspendedData: Schema.optional(SuspendedData),
  stateInitiator: Schema.optional(Schema.String),
})).annotate({ identifier: "QueuedResourceState" }) as any as Schema.Schema<QueuedResourceState>;

export interface RunDuration {
  /** The maximum duration of the requested resource. */
  maxRunDuration?: string;
  /** The time at which the requested resource will be terminated. */
  terminationTime?: string;
}

export const RunDuration: Schema.Schema<RunDuration> = Schema.suspend(() => Schema.Struct({
  maxRunDuration: Schema.optional(Schema.String),
  terminationTime: Schema.optional(Schema.String),
})).annotate({ identifier: "RunDuration" }) as any as Schema.Schema<RunDuration>;

export interface QueuedResource {
  /** Output only. Immutable. The name of the QueuedResource. */
  name?: string;
  /** Output only. The time when the QueuedResource was created. */
  createTime?: string;
  /** Defines a TPU resource. */
  tpu?: Tpu;
  /** The BestEffort tier. */
  bestEffort?: BestEffort;
  /** The Guaranteed tier. */
  guaranteed?: Guaranteed;
  /** Optional. The Spot tier. */
  spot?: Spot;
  /** The queueing policy of the QueuedRequest. */
  queueingPolicy?: QueueingPolicy;
  /** Output only. State of the QueuedResource request. */
  state?: QueuedResourceState;
  /** Name of the reservation in which the resource should be provisioned. Format: projects/{project}/locations/{zone}/reservations/{reservation} */
  reservationName?: string;
  /** Optional. The provisioning model for the resource. */
  provisioningModel?: "PROVISIONING_MODEL_UNSPECIFIED" | "STANDARD" | "SPOT" | "RESERVATION_BOUND" | "FLEX_START" | (string & {});
  /** Optional. The duration of the requested resource. */
  runDuration?: RunDuration;
}

export const QueuedResource: Schema.Schema<QueuedResource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  tpu: Schema.optional(Tpu),
  bestEffort: Schema.optional(BestEffort),
  guaranteed: Schema.optional(Guaranteed),
  spot: Schema.optional(Spot),
  queueingPolicy: Schema.optional(QueueingPolicy),
  state: Schema.optional(QueuedResourceState),
  reservationName: Schema.optional(Schema.String),
  provisioningModel: Schema.optional(Schema.String),
  runDuration: Schema.optional(RunDuration),
})).annotate({ identifier: "QueuedResource" }) as any as Schema.Schema<QueuedResource>;

export interface ListQueuedResourcesResponse {
  /** The listed queued resources. */
  queuedResources?: Array<QueuedResource>;
  /** The next page token or empty if none. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListQueuedResourcesResponse: Schema.Schema<ListQueuedResourcesResponse> = Schema.suspend(() => Schema.Struct({
  queuedResources: Schema.optional(Schema.Array(QueuedResource)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListQueuedResourcesResponse" }) as any as Schema.Schema<ListQueuedResourcesResponse>;

export interface ResetQueuedResourceRequest {
}

export const ResetQueuedResourceRequest: Schema.Schema<ResetQueuedResourceRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResetQueuedResourceRequest" }) as any as Schema.Schema<ResetQueuedResourceRequest>;

export interface PerformMaintenanceQueuedResourceRequest {
  /** The names of the nodes to perform maintenance on. */
  nodeNames?: Array<string>;
}

export const PerformMaintenanceQueuedResourceRequest: Schema.Schema<PerformMaintenanceQueuedResourceRequest> = Schema.suspend(() => Schema.Struct({
  nodeNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PerformMaintenanceQueuedResourceRequest" }) as any as Schema.Schema<PerformMaintenanceQueuedResourceRequest>;

export interface GenerateServiceIdentityRequest {
}

export const GenerateServiceIdentityRequest: Schema.Schema<GenerateServiceIdentityRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GenerateServiceIdentityRequest" }) as any as Schema.Schema<GenerateServiceIdentityRequest>;

export interface ServiceIdentity {
  /** The email address of the service identity. */
  email?: string;
}

export const ServiceIdentity: Schema.Schema<ServiceIdentity> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceIdentity" }) as any as Schema.Schema<ServiceIdentity>;

export interface GenerateServiceIdentityResponse {
  /** ServiceIdentity that was created or retrieved. */
  identity?: ServiceIdentity;
}

export const GenerateServiceIdentityResponse: Schema.Schema<GenerateServiceIdentityResponse> = Schema.suspend(() => Schema.Struct({
  identity: Schema.optional(ServiceIdentity),
})).annotate({ identifier: "GenerateServiceIdentityResponse" }) as any as Schema.Schema<GenerateServiceIdentityResponse>;

export interface AcceleratorType {
  /** The resource name. */
  name?: string;
  /** The accelerator type. */
  type?: string;
  /** The accelerator config. */
  acceleratorConfigs?: Array<AcceleratorConfig>;
}

export const AcceleratorType: Schema.Schema<AcceleratorType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  acceleratorConfigs: Schema.optional(Schema.Array(AcceleratorConfig)),
})).annotate({ identifier: "AcceleratorType" }) as any as Schema.Schema<AcceleratorType>;

export interface ListAcceleratorTypesResponse {
  /** The listed nodes. */
  acceleratorTypes?: Array<AcceleratorType>;
  /** The next page token or empty if none. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListAcceleratorTypesResponse: Schema.Schema<ListAcceleratorTypesResponse> = Schema.suspend(() => Schema.Struct({
  acceleratorTypes: Schema.optional(Schema.Array(AcceleratorType)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListAcceleratorTypesResponse" }) as any as Schema.Schema<ListAcceleratorTypesResponse>;

export interface RuntimeVersion {
  /** The resource name. */
  name?: string;
  /** The runtime version. */
  version?: string;
}

export const RuntimeVersion: Schema.Schema<RuntimeVersion> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "RuntimeVersion" }) as any as Schema.Schema<RuntimeVersion>;

export interface ListRuntimeVersionsResponse {
  /** The listed nodes. */
  runtimeVersions?: Array<RuntimeVersion>;
  /** The next page token or empty if none. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListRuntimeVersionsResponse: Schema.Schema<ListRuntimeVersionsResponse> = Schema.suspend(() => Schema.Struct({
  runtimeVersions: Schema.optional(Schema.Array(RuntimeVersion)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListRuntimeVersionsResponse" }) as any as Schema.Schema<ListRuntimeVersionsResponse>;

export interface GetGuestAttributesRequest {
  /** The guest attributes path to be queried. */
  queryPath?: string;
  /** The 0-based worker ID. If it is empty, all workers' GuestAttributes will be returned. */
  workerIds?: Array<string>;
}

export const GetGuestAttributesRequest: Schema.Schema<GetGuestAttributesRequest> = Schema.suspend(() => Schema.Struct({
  queryPath: Schema.optional(Schema.String),
  workerIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GetGuestAttributesRequest" }) as any as Schema.Schema<GetGuestAttributesRequest>;

export interface GuestAttributesEntry {
  /** Namespace for the guest attribute entry. */
  namespace?: string;
  /** Key for the guest attribute entry. */
  key?: string;
  /** Value for the guest attribute entry. */
  value?: string;
}

export const GuestAttributesEntry: Schema.Schema<GuestAttributesEntry> = Schema.suspend(() => Schema.Struct({
  namespace: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GuestAttributesEntry" }) as any as Schema.Schema<GuestAttributesEntry>;

export interface GuestAttributesValue {
  /** The list of guest attributes entries. */
  items?: Array<GuestAttributesEntry>;
}

export const GuestAttributesValue: Schema.Schema<GuestAttributesValue> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(GuestAttributesEntry)),
})).annotate({ identifier: "GuestAttributesValue" }) as any as Schema.Schema<GuestAttributesValue>;

export interface GuestAttributes {
  /** The path to be queried. This can be the default namespace ('/') or a nested namespace ('/\/') or a specified key ('/\/\') */
  queryPath?: string;
  /** The value of the requested queried path. */
  queryValue?: GuestAttributesValue;
}

export const GuestAttributes: Schema.Schema<GuestAttributes> = Schema.suspend(() => Schema.Struct({
  queryPath: Schema.optional(Schema.String),
  queryValue: Schema.optional(GuestAttributesValue),
})).annotate({ identifier: "GuestAttributes" }) as any as Schema.Schema<GuestAttributes>;

export interface GetGuestAttributesResponse {
  /** The guest attributes for the TPU workers. */
  guestAttributes?: Array<GuestAttributes>;
}

export const GetGuestAttributesResponse: Schema.Schema<GetGuestAttributesResponse> = Schema.suspend(() => Schema.Struct({
  guestAttributes: Schema.optional(Schema.Array(GuestAttributes)),
})).annotate({ identifier: "GetGuestAttributesResponse" }) as any as Schema.Schema<GetGuestAttributesResponse>;

export interface Usage {
  /** The real-time value of usage within the reservation, with the unit specified in field capacity_units. */
  total?: string;
}

export const Usage: Schema.Schema<Usage> = Schema.suspend(() => Schema.Struct({
  total: Schema.optional(Schema.String),
})).annotate({ identifier: "Usage" }) as any as Schema.Schema<Usage>;

export interface Standard {
  /** The size of the reservation, in the units specified in the 'capacity_units' field. */
  size?: number;
  /** Capacity units this reservation is measured in. */
  capacityUnits?: "CAPACITY_UNITS_UNSPECIFIED" | "CORES" | "CHIPS" | (string & {});
  /** The resource type of the reservation. */
  resourceType?: string;
  /** The start and end time of the reservation. */
  interval?: Interval;
  /** The current usage of the reservation. */
  usage?: Usage;
}

export const Standard: Schema.Schema<Standard> = Schema.suspend(() => Schema.Struct({
  size: Schema.optional(Schema.Number),
  capacityUnits: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  interval: Schema.optional(Interval),
  usage: Schema.optional(Usage),
})).annotate({ identifier: "Standard" }) as any as Schema.Schema<Standard>;

export interface Reservation {
  /** The reservation name with the format: projects/{projectID}/locations/{location}/reservations/{reservationID} */
  name?: string;
  /** A standard reservation. */
  standard?: Standard;
  /** Output only. The state of the Reservation. */
  state?: "STATE_UNSPECIFIED" | "APPROVED" | "PROVISIONING" | "ACTIVE" | "DEPROVISIONING" | "EXPIRED" | "FAILED" | (string & {});
}

export const Reservation: Schema.Schema<Reservation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  standard: Schema.optional(Standard),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "Reservation" }) as any as Schema.Schema<Reservation>;

export interface ListReservationsResponse {
  /** The listed reservations. */
  reservations?: Array<Reservation>;
  /** The next page token or empty if none. */
  nextPageToken?: string;
}

export const ListReservationsResponse: Schema.Schema<ListReservationsResponse> = Schema.suspend(() => Schema.Struct({
  reservations: Schema.optional(Schema.Array(Reservation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListReservationsResponse" }) as any as Schema.Schema<ListReservationsResponse>;

export interface SimulateMaintenanceEventRequest {
  /** The 0-based worker ID. If it is empty, worker ID 0 will be selected for maintenance event simulation. A maintenance event will only be fired on the first specified worker ID. Future implementations may support firing on multiple workers. */
  workerIds?: Array<string>;
}

export const SimulateMaintenanceEventRequest: Schema.Schema<SimulateMaintenanceEventRequest> = Schema.suspend(() => Schema.Struct({
  workerIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SimulateMaintenanceEventRequest" }) as any as Schema.Schema<SimulateMaintenanceEventRequest>;

export interface NodeUpcomingMaintenanceInfo {
  /** Unqualified node name. */
  nodeName?: string;
  /** UID of this node. */
  nodeUid?: string;
  /** Upcoming maintenance info for this node. */
  upcomingMaintenance?: UpcomingMaintenance;
}

export const NodeUpcomingMaintenanceInfo: Schema.Schema<NodeUpcomingMaintenanceInfo> = Schema.suspend(() => Schema.Struct({
  nodeName: Schema.optional(Schema.String),
  nodeUid: Schema.optional(Schema.String),
  upcomingMaintenance: Schema.optional(UpcomingMaintenance),
})).annotate({ identifier: "NodeUpcomingMaintenanceInfo" }) as any as Schema.Schema<NodeUpcomingMaintenanceInfo>;

export interface GetMaintenanceInfoResponse {
  /** The list of upcoming maintenance entries. */
  nodeUpcomingMaintenances?: Array<NodeUpcomingMaintenanceInfo>;
}

export const GetMaintenanceInfoResponse: Schema.Schema<GetMaintenanceInfoResponse> = Schema.suspend(() => Schema.Struct({
  nodeUpcomingMaintenances: Schema.optional(Schema.Array(NodeUpcomingMaintenanceInfo)),
})).annotate({ identifier: "GetMaintenanceInfoResponse" }) as any as Schema.Schema<GetMaintenanceInfoResponse>;

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

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusDetail: Schema.optional(Schema.String),
  cancelRequested: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

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
  T.Http({ method: "GET", path: "v2alpha1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

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
  T.Http({ method: "GET", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

export interface GenerateServiceIdentityProjectsLocationsRequest {
  /** Required. The parent resource name. */
  parent: string;
  /** Request body */
  body?: GenerateServiceIdentityRequest;
}

export const GenerateServiceIdentityProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GenerateServiceIdentityRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}:generateServiceIdentity", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateServiceIdentityProjectsLocationsRequest>;

export type GenerateServiceIdentityProjectsLocationsResponse = GenerateServiceIdentityResponse;
export const GenerateServiceIdentityProjectsLocationsResponse = GenerateServiceIdentityResponse;

export type GenerateServiceIdentityProjectsLocationsError = DefaultErrors;

/** Generates the Cloud TPU service identity for the project. */
export const generateServiceIdentityProjectsLocations: API.OperationMethod<GenerateServiceIdentityProjectsLocationsRequest, GenerateServiceIdentityProjectsLocationsResponse, GenerateServiceIdentityProjectsLocationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateServiceIdentityProjectsLocationsRequest,
  output: GenerateServiceIdentityProjectsLocationsResponse,
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
  T.Http({ method: "GET", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

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
  T.Http({ method: "GET", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

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
  T.Http({ method: "DELETE", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
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
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
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
  T.Http({ method: "GET", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/nodes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsNodesRequest>;

export type ListProjectsLocationsNodesResponse = ListNodesResponse;
export const ListProjectsLocationsNodesResponse = ListNodesResponse;

export type ListProjectsLocationsNodesError = DefaultErrors;

/** Lists nodes. */
export const listProjectsLocationsNodes: API.PaginatedOperationMethod<ListProjectsLocationsNodesRequest, ListProjectsLocationsNodesResponse, ListProjectsLocationsNodesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
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
  T.Http({ method: "GET", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/nodes/{nodesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsNodesRequest>;

export type GetProjectsLocationsNodesResponse = Node;
export const GetProjectsLocationsNodesResponse = Node;

export type GetProjectsLocationsNodesError = DefaultErrors;

/** Gets the details of a node. */
export const getProjectsLocationsNodes: API.OperationMethod<GetProjectsLocationsNodesRequest, GetProjectsLocationsNodesResponse, GetProjectsLocationsNodesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsNodesRequest,
  output: GetProjectsLocationsNodesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsNodesRequest {
  /** Required. The parent resource name. */
  parent: string;
  /** The unqualified resource name. */
  nodeId?: string;
  /** Idempotent request UUID. */
  requestId?: string;
  /** Request body */
  body?: Node;
}

export const CreateProjectsLocationsNodesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  nodeId: Schema.optional(Schema.String).pipe(T.HttpQuery("nodeId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Node).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/nodes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsNodesRequest>;

export type CreateProjectsLocationsNodesResponse = Operation;
export const CreateProjectsLocationsNodesResponse = Operation;

export type CreateProjectsLocationsNodesError = DefaultErrors;

/** Creates a node. */
export const createProjectsLocationsNodes: API.OperationMethod<CreateProjectsLocationsNodesRequest, CreateProjectsLocationsNodesResponse, CreateProjectsLocationsNodesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsNodesRequest,
  output: CreateProjectsLocationsNodesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsNodesRequest {
  /** Required. The resource name. */
  name: string;
  /** Idempotent request UUID. */
  requestId?: string;
}

export const DeleteProjectsLocationsNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/nodes/{nodesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsNodesRequest>;

export type DeleteProjectsLocationsNodesResponse = Operation;
export const DeleteProjectsLocationsNodesResponse = Operation;

export type DeleteProjectsLocationsNodesError = DefaultErrors;

/** Deletes a node. */
export const deleteProjectsLocationsNodes: API.OperationMethod<DeleteProjectsLocationsNodesRequest, DeleteProjectsLocationsNodesResponse, DeleteProjectsLocationsNodesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsNodesRequest,
  output: DeleteProjectsLocationsNodesResponse,
  errors: [],
}));

export interface StopProjectsLocationsNodesRequest {
  /** Required. The resource name. */
  name: string;
  /** Request body */
  body?: StopNodeRequest;
}

export const StopProjectsLocationsNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StopNodeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/nodes/{nodesId}:stop", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopProjectsLocationsNodesRequest>;

export type StopProjectsLocationsNodesResponse = Operation;
export const StopProjectsLocationsNodesResponse = Operation;

export type StopProjectsLocationsNodesError = DefaultErrors;

/** Stops a node. This operation is only available with single TPU nodes. */
export const stopProjectsLocationsNodes: API.OperationMethod<StopProjectsLocationsNodesRequest, StopProjectsLocationsNodesResponse, StopProjectsLocationsNodesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: StopProjectsLocationsNodesRequest,
  output: StopProjectsLocationsNodesResponse,
  errors: [],
}));

export interface StartProjectsLocationsNodesRequest {
  /** Required. The resource name. */
  name: string;
  /** Request body */
  body?: StartNodeRequest;
}

export const StartProjectsLocationsNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StartNodeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/nodes/{nodesId}:start", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartProjectsLocationsNodesRequest>;

export type StartProjectsLocationsNodesResponse = Operation;
export const StartProjectsLocationsNodesResponse = Operation;

export type StartProjectsLocationsNodesError = DefaultErrors;

/** Starts a node. */
export const startProjectsLocationsNodes: API.OperationMethod<StartProjectsLocationsNodesRequest, StartProjectsLocationsNodesResponse, StartProjectsLocationsNodesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: StartProjectsLocationsNodesRequest,
  output: StartProjectsLocationsNodesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsNodesRequest {
  /** Output only. Immutable. The name of the TPU. */
  name: string;
  /** Required. Mask of fields from Node to update. Supported fields: [description, tags, labels, metadata, network_config.enable_external_ips]. */
  updateMask?: string;
  /** Request body */
  body?: Node;
}

export const PatchProjectsLocationsNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Node).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/nodes/{nodesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsNodesRequest>;

export type PatchProjectsLocationsNodesResponse = Operation;
export const PatchProjectsLocationsNodesResponse = Operation;

export type PatchProjectsLocationsNodesError = DefaultErrors;

/** Updates the configurations of a node. */
export const patchProjectsLocationsNodes: API.OperationMethod<PatchProjectsLocationsNodesRequest, PatchProjectsLocationsNodesResponse, PatchProjectsLocationsNodesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsNodesRequest,
  output: PatchProjectsLocationsNodesResponse,
  errors: [],
}));

export interface PerformMaintenanceProjectsLocationsNodesRequest {
  /** Required. The resource name. */
  name: string;
  /** Request body */
  body?: PerformMaintenanceRequest;
}

export const PerformMaintenanceProjectsLocationsNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PerformMaintenanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/nodes/{nodesId}:performMaintenance", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PerformMaintenanceProjectsLocationsNodesRequest>;

export type PerformMaintenanceProjectsLocationsNodesResponse = Operation;
export const PerformMaintenanceProjectsLocationsNodesResponse = Operation;

export type PerformMaintenanceProjectsLocationsNodesError = DefaultErrors;

/** Perform manual maintenance on a node. */
export const performMaintenanceProjectsLocationsNodes: API.OperationMethod<PerformMaintenanceProjectsLocationsNodesRequest, PerformMaintenanceProjectsLocationsNodesResponse, PerformMaintenanceProjectsLocationsNodesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PerformMaintenanceProjectsLocationsNodesRequest,
  output: PerformMaintenanceProjectsLocationsNodesResponse,
  errors: [],
}));

export interface GetGuestAttributesProjectsLocationsNodesRequest {
  /** Required. The resource name. */
  name: string;
  /** Request body */
  body?: GetGuestAttributesRequest;
}

export const GetGuestAttributesProjectsLocationsNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GetGuestAttributesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/nodes/{nodesId}:getGuestAttributes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetGuestAttributesProjectsLocationsNodesRequest>;

export type GetGuestAttributesProjectsLocationsNodesResponse = GetGuestAttributesResponse;
export const GetGuestAttributesProjectsLocationsNodesResponse = GetGuestAttributesResponse;

export type GetGuestAttributesProjectsLocationsNodesError = DefaultErrors;

/** Retrieves the guest attributes for the node. */
export const getGuestAttributesProjectsLocationsNodes: API.OperationMethod<GetGuestAttributesProjectsLocationsNodesRequest, GetGuestAttributesProjectsLocationsNodesResponse, GetGuestAttributesProjectsLocationsNodesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetGuestAttributesProjectsLocationsNodesRequest,
  output: GetGuestAttributesProjectsLocationsNodesResponse,
  errors: [],
}));

export interface SimulateMaintenanceEventProjectsLocationsNodesRequest {
  /** Required. The resource name. */
  name: string;
  /** Request body */
  body?: SimulateMaintenanceEventRequest;
}

export const SimulateMaintenanceEventProjectsLocationsNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SimulateMaintenanceEventRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/nodes/{nodesId}:simulateMaintenanceEvent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SimulateMaintenanceEventProjectsLocationsNodesRequest>;

export type SimulateMaintenanceEventProjectsLocationsNodesResponse = Operation;
export const SimulateMaintenanceEventProjectsLocationsNodesResponse = Operation;

export type SimulateMaintenanceEventProjectsLocationsNodesError = DefaultErrors;

/** Simulates a maintenance event. */
export const simulateMaintenanceEventProjectsLocationsNodes: API.OperationMethod<SimulateMaintenanceEventProjectsLocationsNodesRequest, SimulateMaintenanceEventProjectsLocationsNodesResponse, SimulateMaintenanceEventProjectsLocationsNodesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: SimulateMaintenanceEventProjectsLocationsNodesRequest,
  output: SimulateMaintenanceEventProjectsLocationsNodesResponse,
  errors: [],
}));

export interface ListProjectsLocationsQueuedResourcesRequest {
  /** Required. The parent resource name. */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsQueuedResourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/queuedResources" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsQueuedResourcesRequest>;

export type ListProjectsLocationsQueuedResourcesResponse = ListQueuedResourcesResponse;
export const ListProjectsLocationsQueuedResourcesResponse = ListQueuedResourcesResponse;

export type ListProjectsLocationsQueuedResourcesError = DefaultErrors;

/** Lists queued resources. */
export const listProjectsLocationsQueuedResources: API.PaginatedOperationMethod<ListProjectsLocationsQueuedResourcesRequest, ListProjectsLocationsQueuedResourcesResponse, ListProjectsLocationsQueuedResourcesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsQueuedResourcesRequest,
  output: ListProjectsLocationsQueuedResourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsQueuedResourcesRequest {
  /** Required. The resource name. */
  name: string;
}

export const GetProjectsLocationsQueuedResourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/queuedResources/{queuedResourcesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsQueuedResourcesRequest>;

export type GetProjectsLocationsQueuedResourcesResponse = QueuedResource;
export const GetProjectsLocationsQueuedResourcesResponse = QueuedResource;

export type GetProjectsLocationsQueuedResourcesError = DefaultErrors;

/** Gets details of a queued resource. */
export const getProjectsLocationsQueuedResources: API.OperationMethod<GetProjectsLocationsQueuedResourcesRequest, GetProjectsLocationsQueuedResourcesResponse, GetProjectsLocationsQueuedResourcesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsQueuedResourcesRequest,
  output: GetProjectsLocationsQueuedResourcesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsQueuedResourcesRequest {
  /** Required. The parent resource name. */
  parent: string;
  /** The unqualified resource name. Should follow the `^[A-Za-z0-9_.~+%-]+$` regex format. */
  queuedResourceId?: string;
  /** Idempotent request UUID. */
  requestId?: string;
  /** Request body */
  body?: QueuedResource;
}

export const CreateProjectsLocationsQueuedResourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  queuedResourceId: Schema.optional(Schema.String).pipe(T.HttpQuery("queuedResourceId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(QueuedResource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/queuedResources", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsQueuedResourcesRequest>;

export type CreateProjectsLocationsQueuedResourcesResponse = Operation;
export const CreateProjectsLocationsQueuedResourcesResponse = Operation;

export type CreateProjectsLocationsQueuedResourcesError = DefaultErrors;

/** Creates a QueuedResource TPU instance. */
export const createProjectsLocationsQueuedResources: API.OperationMethod<CreateProjectsLocationsQueuedResourcesRequest, CreateProjectsLocationsQueuedResourcesResponse, CreateProjectsLocationsQueuedResourcesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsQueuedResourcesRequest,
  output: CreateProjectsLocationsQueuedResourcesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsQueuedResourcesRequest {
  /** Required. The resource name. */
  name: string;
  /** Idempotent request UUID. */
  requestId?: string;
  /** If set to true, all running nodes belonging to this queued resource will be deleted first and then the queued resource will be deleted. Otherwise (i.e. force=false), the queued resource will only be deleted if its nodes have already been deleted or the queued resource is in the ACCEPTED, FAILED, or SUSPENDED state. */
  force?: boolean;
}

export const DeleteProjectsLocationsQueuedResourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/queuedResources/{queuedResourcesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsQueuedResourcesRequest>;

export type DeleteProjectsLocationsQueuedResourcesResponse = Operation;
export const DeleteProjectsLocationsQueuedResourcesResponse = Operation;

export type DeleteProjectsLocationsQueuedResourcesError = DefaultErrors;

/** Deletes a QueuedResource TPU instance. */
export const deleteProjectsLocationsQueuedResources: API.OperationMethod<DeleteProjectsLocationsQueuedResourcesRequest, DeleteProjectsLocationsQueuedResourcesResponse, DeleteProjectsLocationsQueuedResourcesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsQueuedResourcesRequest,
  output: DeleteProjectsLocationsQueuedResourcesResponse,
  errors: [],
}));

export interface ResetProjectsLocationsQueuedResourcesRequest {
  /** Required. The name of the queued resource. */
  name: string;
  /** Request body */
  body?: ResetQueuedResourceRequest;
}

export const ResetProjectsLocationsQueuedResourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResetQueuedResourceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/queuedResources/{queuedResourcesId}:reset", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetProjectsLocationsQueuedResourcesRequest>;

export type ResetProjectsLocationsQueuedResourcesResponse = Operation;
export const ResetProjectsLocationsQueuedResourcesResponse = Operation;

export type ResetProjectsLocationsQueuedResourcesError = DefaultErrors;

/** Resets a QueuedResource TPU instance */
export const resetProjectsLocationsQueuedResources: API.OperationMethod<ResetProjectsLocationsQueuedResourcesRequest, ResetProjectsLocationsQueuedResourcesResponse, ResetProjectsLocationsQueuedResourcesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ResetProjectsLocationsQueuedResourcesRequest,
  output: ResetProjectsLocationsQueuedResourcesResponse,
  errors: [],
}));

export interface PerformMaintenanceQueuedResourceProjectsLocationsQueuedResourcesRequest {
  /** Required. The name of the QueuedResource which holds the nodes to perform maintenance on. */
  name: string;
  /** Request body */
  body?: PerformMaintenanceQueuedResourceRequest;
}

export const PerformMaintenanceQueuedResourceProjectsLocationsQueuedResourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PerformMaintenanceQueuedResourceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/queuedResources/{queuedResourcesId}:performMaintenanceQueuedResource", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PerformMaintenanceQueuedResourceProjectsLocationsQueuedResourcesRequest>;

export type PerformMaintenanceQueuedResourceProjectsLocationsQueuedResourcesResponse = Operation;
export const PerformMaintenanceQueuedResourceProjectsLocationsQueuedResourcesResponse = Operation;

export type PerformMaintenanceQueuedResourceProjectsLocationsQueuedResourcesError = DefaultErrors;

/** Perform manual maintenance on specific nodes of a QueuedResource. */
export const performMaintenanceQueuedResourceProjectsLocationsQueuedResources: API.OperationMethod<PerformMaintenanceQueuedResourceProjectsLocationsQueuedResourcesRequest, PerformMaintenanceQueuedResourceProjectsLocationsQueuedResourcesResponse, PerformMaintenanceQueuedResourceProjectsLocationsQueuedResourcesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PerformMaintenanceQueuedResourceProjectsLocationsQueuedResourcesRequest,
  output: PerformMaintenanceQueuedResourceProjectsLocationsQueuedResourcesResponse,
  errors: [],
}));

export interface GetMaintenanceInfoProjectsLocationsQueuedResourcesRequest {
  /** Required. The QueuedResource name. */
  name: string;
}

export const GetMaintenanceInfoProjectsLocationsQueuedResourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/queuedResources/{queuedResourcesId}:getMaintenanceInfo" }),
  svc,
) as unknown as Schema.Schema<GetMaintenanceInfoProjectsLocationsQueuedResourcesRequest>;

export type GetMaintenanceInfoProjectsLocationsQueuedResourcesResponse = GetMaintenanceInfoResponse;
export const GetMaintenanceInfoProjectsLocationsQueuedResourcesResponse = GetMaintenanceInfoResponse;

export type GetMaintenanceInfoProjectsLocationsQueuedResourcesError = DefaultErrors;

/** Gets the maintenance info for a queued resource. */
export const getMaintenanceInfoProjectsLocationsQueuedResources: API.OperationMethod<GetMaintenanceInfoProjectsLocationsQueuedResourcesRequest, GetMaintenanceInfoProjectsLocationsQueuedResourcesResponse, GetMaintenanceInfoProjectsLocationsQueuedResourcesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetMaintenanceInfoProjectsLocationsQueuedResourcesRequest,
  output: GetMaintenanceInfoProjectsLocationsQueuedResourcesResponse,
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
  T.Http({ method: "GET", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/acceleratorTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAcceleratorTypesRequest>;

export type ListProjectsLocationsAcceleratorTypesResponse = ListAcceleratorTypesResponse;
export const ListProjectsLocationsAcceleratorTypesResponse = ListAcceleratorTypesResponse;

export type ListProjectsLocationsAcceleratorTypesError = DefaultErrors;

/** Lists accelerator types supported by this API. */
export const listProjectsLocationsAcceleratorTypes: API.PaginatedOperationMethod<ListProjectsLocationsAcceleratorTypesRequest, ListProjectsLocationsAcceleratorTypesResponse, ListProjectsLocationsAcceleratorTypesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
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
  T.Http({ method: "GET", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/acceleratorTypes/{acceleratorTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAcceleratorTypesRequest>;

export type GetProjectsLocationsAcceleratorTypesResponse = AcceleratorType;
export const GetProjectsLocationsAcceleratorTypesResponse = AcceleratorType;

export type GetProjectsLocationsAcceleratorTypesError = DefaultErrors;

/** Gets AcceleratorType. */
export const getProjectsLocationsAcceleratorTypes: API.OperationMethod<GetProjectsLocationsAcceleratorTypesRequest, GetProjectsLocationsAcceleratorTypesResponse, GetProjectsLocationsAcceleratorTypesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAcceleratorTypesRequest,
  output: GetProjectsLocationsAcceleratorTypesResponse,
  errors: [],
}));

export interface ListProjectsLocationsRuntimeVersionsRequest {
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

export const ListProjectsLocationsRuntimeVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/runtimeVersions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRuntimeVersionsRequest>;

export type ListProjectsLocationsRuntimeVersionsResponse = ListRuntimeVersionsResponse;
export const ListProjectsLocationsRuntimeVersionsResponse = ListRuntimeVersionsResponse;

export type ListProjectsLocationsRuntimeVersionsError = DefaultErrors;

/** Lists runtime versions supported by this API. */
export const listProjectsLocationsRuntimeVersions: API.PaginatedOperationMethod<ListProjectsLocationsRuntimeVersionsRequest, ListProjectsLocationsRuntimeVersionsResponse, ListProjectsLocationsRuntimeVersionsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsRuntimeVersionsRequest,
  output: ListProjectsLocationsRuntimeVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRuntimeVersionsRequest {
  /** Required. The resource name. */
  name: string;
}

export const GetProjectsLocationsRuntimeVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/runtimeVersions/{runtimeVersionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRuntimeVersionsRequest>;

export type GetProjectsLocationsRuntimeVersionsResponse = RuntimeVersion;
export const GetProjectsLocationsRuntimeVersionsResponse = RuntimeVersion;

export type GetProjectsLocationsRuntimeVersionsError = DefaultErrors;

/** Gets a runtime version. */
export const getProjectsLocationsRuntimeVersions: API.OperationMethod<GetProjectsLocationsRuntimeVersionsRequest, GetProjectsLocationsRuntimeVersionsResponse, GetProjectsLocationsRuntimeVersionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRuntimeVersionsRequest,
  output: GetProjectsLocationsRuntimeVersionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsReservationsRequest {
  /** Required. The parent for reservations. */
  parent: string;
  /** The maximum number of items to return. Defaults to 0 if not specified, which means no limit. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsReservationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2alpha1/projects/{projectsId}/locations/{locationsId}/reservations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsReservationsRequest>;

export type ListProjectsLocationsReservationsResponse = ListReservationsResponse;
export const ListProjectsLocationsReservationsResponse = ListReservationsResponse;

export type ListProjectsLocationsReservationsError = DefaultErrors;

/** Retrieves the reservations for the given project in the given location. */
export const listProjectsLocationsReservations: API.PaginatedOperationMethod<ListProjectsLocationsReservationsRequest, ListProjectsLocationsReservationsResponse, ListProjectsLocationsReservationsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsReservationsRequest,
  output: ListProjectsLocationsReservationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

