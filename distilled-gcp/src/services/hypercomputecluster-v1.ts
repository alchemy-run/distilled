// ==========================================================================
// Cluster Director API (hypercomputecluster v1)
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
  name: "hypercomputecluster",
  version: "v1",
  rootUrl: "https://hypercomputecluster.googleapis.com/",
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

export interface NetworkReference {
  /** Output only. Name of the network, in the format `projects/{project}/global/networks/{network}`. */
  network?: string;
  /** Output only. Name of the particular subnetwork being used by the cluster, in the format `projects/{project}/regions/{region}/subnetworks/{subnetwork}`. */
  subnetwork?: string;
}

export const NetworkReference: Schema.Schema<NetworkReference> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkReference" }) as any as Schema.Schema<NetworkReference>;

export interface NewNetworkConfig {
  /** Required. Immutable. Name of the network to create, in the format `projects/{project}/global/networks/{network}`. */
  network?: string;
  /** Optional. Immutable. Description of the network. Maximum of 2048 characters. */
  description?: string;
}

export const NewNetworkConfig: Schema.Schema<NewNetworkConfig> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "NewNetworkConfig" }) as any as Schema.Schema<NewNetworkConfig>;

export interface ExistingNetworkConfig {
  /** Required. Immutable. Name of the network to import, in the format `projects/{project}/global/networks/{network}`. */
  network?: string;
  /** Required. Immutable. Particular subnetwork to use, in the format `projects/{project}/regions/{region}/subnetworks/{subnetwork}`. */
  subnetwork?: string;
}

export const ExistingNetworkConfig: Schema.Schema<ExistingNetworkConfig> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
})).annotate({ identifier: "ExistingNetworkConfig" }) as any as Schema.Schema<ExistingNetworkConfig>;

export interface NetworkResourceConfig {
  /** Optional. Immutable. If set, indicates that a new network should be created. */
  newNetwork?: NewNetworkConfig;
  /** Optional. Immutable. If set, indicates that an existing network should be imported. */
  existingNetwork?: ExistingNetworkConfig;
}

export const NetworkResourceConfig: Schema.Schema<NetworkResourceConfig> = Schema.suspend(() => Schema.Struct({
  newNetwork: Schema.optional(NewNetworkConfig),
  existingNetwork: Schema.optional(ExistingNetworkConfig),
})).annotate({ identifier: "NetworkResourceConfig" }) as any as Schema.Schema<NetworkResourceConfig>;

export interface NetworkResource {
  /** Reference to a network in Google Compute Engine. */
  network?: NetworkReference;
  /** Immutable. Configuration for this network resource, which describes how it should be created or imported. This field only controls how the network resource is initially created or imported. Subsequent changes to the network resource should be made via the resource's API and will not be reflected in the configuration. */
  config?: NetworkResourceConfig;
}

export const NetworkResource: Schema.Schema<NetworkResource> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(NetworkReference),
  config: Schema.optional(NetworkResourceConfig),
})).annotate({ identifier: "NetworkResource" }) as any as Schema.Schema<NetworkResource>;

export interface FilestoreReference {
  /** Output only. Name of the Filestore instance, in the format `projects/{project}/locations/{location}/instances/{instance}` */
  filestore?: string;
}

export const FilestoreReference: Schema.Schema<FilestoreReference> = Schema.suspend(() => Schema.Struct({
  filestore: Schema.optional(Schema.String),
})).annotate({ identifier: "FilestoreReference" }) as any as Schema.Schema<FilestoreReference>;

export interface BucketReference {
  /** Output only. Name of the bucket. */
  bucket?: string;
}

export const BucketReference: Schema.Schema<BucketReference> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
})).annotate({ identifier: "BucketReference" }) as any as Schema.Schema<BucketReference>;

export interface LustreReference {
  /** Output only. Name of the Managed Lustre instance, in the format `projects/{project}/locations/{location}/instances/{instance}` */
  lustre?: string;
}

export const LustreReference: Schema.Schema<LustreReference> = Schema.suspend(() => Schema.Struct({
  lustre: Schema.optional(Schema.String),
})).annotate({ identifier: "LustreReference" }) as any as Schema.Schema<LustreReference>;

export interface FileShareConfig {
  /** Required. Size of the filestore in GB. Must be between 1024 and 102400, and must meet scalability requirements described at https://cloud.google.com/filestore/docs/service-tiers. */
  capacityGb?: string;
  /** Required. Filestore share location */
  fileShare?: string;
}

export const FileShareConfig: Schema.Schema<FileShareConfig> = Schema.suspend(() => Schema.Struct({
  capacityGb: Schema.optional(Schema.String),
  fileShare: Schema.optional(Schema.String),
})).annotate({ identifier: "FileShareConfig" }) as any as Schema.Schema<FileShareConfig>;

export interface NewFilestoreConfig {
  /** Required. Immutable. Name of the Filestore instance to create, in the format `projects/{project}/locations/{location}/instances/{instance}` */
  filestore?: string;
  /** Optional. Immutable. Description of the instance. Maximum of 2048 characters. */
  description?: string;
  /** Required. Immutable. File system shares on the instance. Exactly one file share must be specified. */
  fileShares?: Array<FileShareConfig>;
  /** Required. Immutable. Service tier to use for the instance. */
  tier?: "TIER_UNSPECIFIED" | "ZONAL" | "REGIONAL" | (string & {});
  /** Optional. Immutable. Access protocol to use for all file shares in the instance. Defaults to NFS V3 if not set. */
  protocol?: "PROTOCOL_UNSPECIFIED" | "NFSV3" | "NFSV41" | (string & {});
}

export const NewFilestoreConfig: Schema.Schema<NewFilestoreConfig> = Schema.suspend(() => Schema.Struct({
  filestore: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  fileShares: Schema.optional(Schema.Array(FileShareConfig)),
  tier: Schema.optional(Schema.String),
  protocol: Schema.optional(Schema.String),
})).annotate({ identifier: "NewFilestoreConfig" }) as any as Schema.Schema<NewFilestoreConfig>;

export interface ExistingFilestoreConfig {
  /** Required. Immutable. Name of the Filestore instance to import, in the format `projects/{project}/locations/{location}/instances/{instance}` */
  filestore?: string;
}

export const ExistingFilestoreConfig: Schema.Schema<ExistingFilestoreConfig> = Schema.suspend(() => Schema.Struct({
  filestore: Schema.optional(Schema.String),
})).annotate({ identifier: "ExistingFilestoreConfig" }) as any as Schema.Schema<ExistingFilestoreConfig>;

export interface GcsAutoclassConfig {
  /** Required. Enables Auto-class feature. */
  enabled?: boolean;
  /** Optional. Terminal storage class of the autoclass bucket */
  terminalStorageClass?: "TERMINAL_STORAGE_CLASS_UNSPECIFIED" | (string & {});
}

export const GcsAutoclassConfig: Schema.Schema<GcsAutoclassConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  terminalStorageClass: Schema.optional(Schema.String),
})).annotate({ identifier: "GcsAutoclassConfig" }) as any as Schema.Schema<GcsAutoclassConfig>;

export interface GcsHierarchicalNamespaceConfig {
  /** Required. Enables hierarchical namespace setup for the bucket. */
  enabled?: boolean;
}

export const GcsHierarchicalNamespaceConfig: Schema.Schema<GcsHierarchicalNamespaceConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GcsHierarchicalNamespaceConfig" }) as any as Schema.Schema<GcsHierarchicalNamespaceConfig>;

export interface NewBucketConfig {
  /** Optional. Immutable. If set, indicates that the bucket should use [Autoclass](https://cloud.google.com/storage/docs/autoclass). */
  autoclass?: GcsAutoclassConfig;
  /** Optional. Immutable. If set, uses the provided storage class as the bucket's default storage class. */
  storageClass?: "STORAGE_CLASS_UNSPECIFIED" | "STANDARD" | "NEARLINE" | "COLDLINE" | "ARCHIVE" | (string & {});
  /** Required. Immutable. Name of the Cloud Storage bucket to create. */
  bucket?: string;
  /** Optional. Immutable. If set, indicates that the bucket should use [hierarchical namespaces](https://cloud.google.com/storage/docs/hns-overview). */
  hierarchicalNamespace?: GcsHierarchicalNamespaceConfig;
}

export const NewBucketConfig: Schema.Schema<NewBucketConfig> = Schema.suspend(() => Schema.Struct({
  autoclass: Schema.optional(GcsAutoclassConfig),
  storageClass: Schema.optional(Schema.String),
  bucket: Schema.optional(Schema.String),
  hierarchicalNamespace: Schema.optional(GcsHierarchicalNamespaceConfig),
})).annotate({ identifier: "NewBucketConfig" }) as any as Schema.Schema<NewBucketConfig>;

export interface ExistingBucketConfig {
  /** Required. Immutable. Name of the Cloud Storage bucket to import. */
  bucket?: string;
}

export const ExistingBucketConfig: Schema.Schema<ExistingBucketConfig> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
})).annotate({ identifier: "ExistingBucketConfig" }) as any as Schema.Schema<ExistingBucketConfig>;

export interface NewLustreConfig {
  /** Required. Immutable. Name of the Managed Lustre instance to create, in the format `projects/{project}/locations/{location}/instances/{instance}` */
  lustre?: string;
  /** Optional. Immutable. Description of the Managed Lustre instance. Maximum of 2048 characters. */
  description?: string;
  /** Required. Immutable. Filesystem name for this instance. This name is used by client-side tools, including when mounting the instance. Must be 8 characters or less and can only contain letters and numbers. */
  filesystem?: string;
  /** Required. Immutable. Storage capacity of the instance in gibibytes (GiB). Allowed values are between 18000 and 7632000. */
  capacityGb?: string;
}

export const NewLustreConfig: Schema.Schema<NewLustreConfig> = Schema.suspend(() => Schema.Struct({
  lustre: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  filesystem: Schema.optional(Schema.String),
  capacityGb: Schema.optional(Schema.String),
})).annotate({ identifier: "NewLustreConfig" }) as any as Schema.Schema<NewLustreConfig>;

export interface ExistingLustreConfig {
  /** Required. Immutable. Name of the Managed Lustre instance to import, in the format `projects/{project}/locations/{location}/instances/{instance}` */
  lustre?: string;
}

export const ExistingLustreConfig: Schema.Schema<ExistingLustreConfig> = Schema.suspend(() => Schema.Struct({
  lustre: Schema.optional(Schema.String),
})).annotate({ identifier: "ExistingLustreConfig" }) as any as Schema.Schema<ExistingLustreConfig>;

export interface StorageResourceConfig {
  /** Optional. Immutable. If set, indicates that a new Filestore instance should be created. */
  newFilestore?: NewFilestoreConfig;
  /** Optional. Immutable. If set, indicates that an existing Filestore instance should be imported. */
  existingFilestore?: ExistingFilestoreConfig;
  /** Optional. Immutable. If set, indicates that a new Cloud Storage bucket should be created. */
  newBucket?: NewBucketConfig;
  /** Optional. Immutable. If set, indicates that an existing Cloud Storage bucket should be imported. */
  existingBucket?: ExistingBucketConfig;
  /** Optional. Immutable. If set, indicates that a new Managed Lustre instance should be created. */
  newLustre?: NewLustreConfig;
  /** Optional. Immutable. If set, indicates that an existing Managed Lustre instance should be imported. */
  existingLustre?: ExistingLustreConfig;
}

export const StorageResourceConfig: Schema.Schema<StorageResourceConfig> = Schema.suspend(() => Schema.Struct({
  newFilestore: Schema.optional(NewFilestoreConfig),
  existingFilestore: Schema.optional(ExistingFilestoreConfig),
  newBucket: Schema.optional(NewBucketConfig),
  existingBucket: Schema.optional(ExistingBucketConfig),
  newLustre: Schema.optional(NewLustreConfig),
  existingLustre: Schema.optional(ExistingLustreConfig),
})).annotate({ identifier: "StorageResourceConfig" }) as any as Schema.Schema<StorageResourceConfig>;

export interface StorageResource {
  /** Reference to a Filestore instance. Populated if and only if the storage resource was configured to use Filestore. */
  filestore?: FilestoreReference;
  /** Reference to a Google Cloud Storage bucket. Populated if and only if the storage resource was configured to use Google Cloud Storage. */
  bucket?: BucketReference;
  /** Reference to a Managed Lustre instance. Populated if and only if the storage resource was configured to use Managed Lustre. */
  lustre?: LustreReference;
  /** Required. Immutable. Configuration for this storage resource, which describes how it should be created or imported. This field only controls how the storage resource is initially created or imported. Subsequent changes to the storage resource should be made via the resource's API and will not be reflected in the configuration. */
  config?: StorageResourceConfig;
}

export const StorageResource: Schema.Schema<StorageResource> = Schema.suspend(() => Schema.Struct({
  filestore: Schema.optional(FilestoreReference),
  bucket: Schema.optional(BucketReference),
  lustre: Schema.optional(LustreReference),
  config: Schema.optional(StorageResourceConfig),
})).annotate({ identifier: "StorageResource" }) as any as Schema.Schema<StorageResource>;

export interface NewOnDemandInstancesConfig {
  /** Required. Immutable. Name of the zone in which VM instances should run, e.g., `us-central1-a`. Must be in the same region as the cluster, and must match the zone of any other resources specified in the cluster. */
  zone?: string;
  /** Required. Immutable. Name of the Compute Engine [machine type](https://cloud.google.com/compute/docs/machine-resource) to use, e.g. `n2-standard-2`. */
  machineType?: string;
}

export const NewOnDemandInstancesConfig: Schema.Schema<NewOnDemandInstancesConfig> = Schema.suspend(() => Schema.Struct({
  zone: Schema.optional(Schema.String),
  machineType: Schema.optional(Schema.String),
})).annotate({ identifier: "NewOnDemandInstancesConfig" }) as any as Schema.Schema<NewOnDemandInstancesConfig>;

export interface NewSpotInstancesConfig {
  /** Required. Immutable. Name of the zone in which VM instances should run, e.g., `us-central1-a`. Must be in the same region as the cluster, and must match the zone of any other resources specified in the cluster. */
  zone?: string;
  /** Required. Immutable. Name of the Compute Engine [machine type](https://cloud.google.com/compute/docs/machine-resource) to use, e.g. `n2-standard-2`. */
  machineType?: string;
  /** Optional. Termination action for the instance. If not specified, Compute Engine sets the termination action to DELETE. */
  terminationAction?: "TERMINATION_ACTION_UNSPECIFIED" | "STOP" | "DELETE" | (string & {});
}

export const NewSpotInstancesConfig: Schema.Schema<NewSpotInstancesConfig> = Schema.suspend(() => Schema.Struct({
  zone: Schema.optional(Schema.String),
  machineType: Schema.optional(Schema.String),
  terminationAction: Schema.optional(Schema.String),
})).annotate({ identifier: "NewSpotInstancesConfig" }) as any as Schema.Schema<NewSpotInstancesConfig>;

export interface NewReservedInstancesConfig {
  /** Optional. Immutable. Name of the reservation from which VM instances should be created, in the format `projects/{project}/zones/{zone}/reservations/{reservation}`. */
  reservation?: string;
}

export const NewReservedInstancesConfig: Schema.Schema<NewReservedInstancesConfig> = Schema.suspend(() => Schema.Struct({
  reservation: Schema.optional(Schema.String),
})).annotate({ identifier: "NewReservedInstancesConfig" }) as any as Schema.Schema<NewReservedInstancesConfig>;

export interface NewFlexStartInstancesConfig {
  /** Required. Immutable. Name of the zone in which VM instances should run, e.g., `us-central1-a`. Must be in the same region as the cluster, and must match the zone of any other resources specified in the cluster. */
  zone?: string;
  /** Required. Immutable. Name of the Compute Engine [machine type](https://cloud.google.com/compute/docs/machine-resource) to use, e.g. `n2-standard-2`. */
  machineType?: string;
  /** Required. Immutable. Specifies the time limit for created instances. Instances will be terminated at the end of this duration. */
  maxDuration?: string;
}

export const NewFlexStartInstancesConfig: Schema.Schema<NewFlexStartInstancesConfig> = Schema.suspend(() => Schema.Struct({
  zone: Schema.optional(Schema.String),
  machineType: Schema.optional(Schema.String),
  maxDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "NewFlexStartInstancesConfig" }) as any as Schema.Schema<NewFlexStartInstancesConfig>;

export interface ComputeResourceConfig {
  /** Optional. Immutable. If set, indicates that this resource should use on-demand VMs. */
  newOnDemandInstances?: NewOnDemandInstancesConfig;
  /** Optional. Immutable. If set, indicates that this resource should use spot VMs. */
  newSpotInstances?: NewSpotInstancesConfig;
  /** Optional. Immutable. If set, indicates that this resource should use reserved VMs. */
  newReservedInstances?: NewReservedInstancesConfig;
  /** Optional. Immutable. If set, indicates that this resource should use flex-start VMs. */
  newFlexStartInstances?: NewFlexStartInstancesConfig;
}

export const ComputeResourceConfig: Schema.Schema<ComputeResourceConfig> = Schema.suspend(() => Schema.Struct({
  newOnDemandInstances: Schema.optional(NewOnDemandInstancesConfig),
  newSpotInstances: Schema.optional(NewSpotInstancesConfig),
  newReservedInstances: Schema.optional(NewReservedInstancesConfig),
  newFlexStartInstances: Schema.optional(NewFlexStartInstancesConfig),
})).annotate({ identifier: "ComputeResourceConfig" }) as any as Schema.Schema<ComputeResourceConfig>;

export interface ComputeResource {
  /** Required. Immutable. Configuration for this compute resource, which describes how it should be created at runtime. */
  config?: ComputeResourceConfig;
}

export const ComputeResource: Schema.Schema<ComputeResource> = Schema.suspend(() => Schema.Struct({
  config: Schema.optional(ComputeResourceConfig),
})).annotate({ identifier: "ComputeResource" }) as any as Schema.Schema<ComputeResource>;

export interface StorageConfig {
  /** Required. ID of the storage resource to mount, which must match a key in the cluster's storage_resources. */
  id?: string;
  /** Required. A directory inside the VM instance's file system where the storage resource should be mounted (e.g., `/mnt/share`). */
  localMount?: string;
}

export const StorageConfig: Schema.Schema<StorageConfig> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  localMount: Schema.optional(Schema.String),
})).annotate({ identifier: "StorageConfig" }) as any as Schema.Schema<StorageConfig>;

export interface ComputeInstance {
  /** Output only. Name of the VM instance, in the format `projects/{project}/zones/{zone}/instances/{instance}`. */
  instance?: string;
}

export const ComputeInstance: Schema.Schema<ComputeInstance> = Schema.suspend(() => Schema.Struct({
  instance: Schema.optional(Schema.String),
})).annotate({ identifier: "ComputeInstance" }) as any as Schema.Schema<ComputeInstance>;

export interface BootDisk {
  /** Required. Immutable. [Persistent disk type](https://cloud.google.com/compute/docs/disks#disk-types), in the format `projects/{project}/zones/{zone}/diskTypes/{disk_type}`. */
  type?: string;
  /** Required. Immutable. Size of the disk in gigabytes. Must be at least 10GB. */
  sizeGb?: string;
}

export const BootDisk: Schema.Schema<BootDisk> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  sizeGb: Schema.optional(Schema.String),
})).annotate({ identifier: "BootDisk" }) as any as Schema.Schema<BootDisk>;

export interface SlurmLoginNodes {
  /** Required. Number of login node instances to create. */
  count?: string;
  /** Required. Name of the zone in which login nodes should run, e.g., `us-central1-a`. Must be in the same region as the cluster, and must match the zone of any other resources specified in the cluster. */
  zone?: string;
  /** Required. Name of the Compute Engine [machine type](https://cloud.google.com/compute/docs/machine-resource) to use for login nodes, e.g. `n2-standard-2`. */
  machineType?: string;
  /** Optional. [Startup script](https://cloud.google.com/compute/docs/instances/startup-scripts/linux) to be run on each login node instance. Max 256KB. The script must complete within the system-defined default timeout of 5 minutes. For tasks that require more time, consider running them in the background using methods such as `&` or `nohup`. */
  startupScript?: string;
  /** Optional. Whether [OS Login](https://cloud.google.com/compute/docs/oslogin) should be enabled on login node instances. */
  enableOsLogin?: boolean;
  /** Optional. Whether login node instances should be assigned [external IP addresses](https://cloud.google.com/compute/docs/ip-addresses#externaladdresses). */
  enablePublicIps?: boolean;
  /** Optional. [Labels](https://cloud.google.com/compute/docs/labeling-resources) that should be applied to each login node instance. */
  labels?: Record<string, string>;
  /** Optional. How storage resources should be mounted on each login node. */
  storageConfigs?: Array<StorageConfig>;
  /** Output only. Information about the login node instances that were created in Compute Engine. */
  instances?: Array<ComputeInstance>;
  /** Optional. Boot disk for the login node. */
  bootDisk?: BootDisk;
}

export const SlurmLoginNodes: Schema.Schema<SlurmLoginNodes> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  machineType: Schema.optional(Schema.String),
  startupScript: Schema.optional(Schema.String),
  enableOsLogin: Schema.optional(Schema.Boolean),
  enablePublicIps: Schema.optional(Schema.Boolean),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  storageConfigs: Schema.optional(Schema.Array(StorageConfig)),
  instances: Schema.optional(Schema.Array(ComputeInstance)),
  bootDisk: Schema.optional(BootDisk),
})).annotate({ identifier: "SlurmLoginNodes" }) as any as Schema.Schema<SlurmLoginNodes>;

export interface ComputeInstanceSlurmNodeSet {
  /** Optional. [Startup script](https://cloud.google.com/compute/docs/instances/startup-scripts/linux) to be run on each VM instance in the nodeset. Max 256KB. */
  startupScript?: string;
  /** Optional. [Labels](https://cloud.google.com/compute/docs/labeling-resources) that should be applied to each VM instance in the nodeset. */
  labels?: Record<string, string>;
  /** Optional. Boot disk for the compute instance */
  bootDisk?: BootDisk;
}

export const ComputeInstanceSlurmNodeSet: Schema.Schema<ComputeInstanceSlurmNodeSet> = Schema.suspend(() => Schema.Struct({
  startupScript: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  bootDisk: Schema.optional(BootDisk),
})).annotate({ identifier: "ComputeInstanceSlurmNodeSet" }) as any as Schema.Schema<ComputeInstanceSlurmNodeSet>;

export interface SlurmNodeSet {
  /** Optional. If set, indicates that the nodeset should be backed by Compute Engine instances. */
  computeInstance?: ComputeInstanceSlurmNodeSet;
  /** Required. Identifier for the nodeset, which allows it to be referenced by partitions. Must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters). */
  id?: string;
  /** Optional. ID of the compute resource on which this nodeset will run. Must match a key in the cluster's compute_resources. */
  computeId?: string;
  /** Optional. How storage resources should be mounted on each compute node. */
  storageConfigs?: Array<StorageConfig>;
  /** Optional. Number of nodes to be statically created for this nodeset. The cluster will attempt to ensure that at least this many nodes exist at all times. */
  staticNodeCount?: string;
  /** Optional. Controls how many additional nodes a cluster can bring online to handle workloads. Set this value to enable dynamic node creation and limit the number of additional nodes the cluster can bring online. Leave empty if you do not want the cluster to create nodes dynamically, and instead rely only on static nodes. */
  maxDynamicNodeCount?: string;
}

export const SlurmNodeSet: Schema.Schema<SlurmNodeSet> = Schema.suspend(() => Schema.Struct({
  computeInstance: Schema.optional(ComputeInstanceSlurmNodeSet),
  id: Schema.optional(Schema.String),
  computeId: Schema.optional(Schema.String),
  storageConfigs: Schema.optional(Schema.Array(StorageConfig)),
  staticNodeCount: Schema.optional(Schema.String),
  maxDynamicNodeCount: Schema.optional(Schema.String),
})).annotate({ identifier: "SlurmNodeSet" }) as any as Schema.Schema<SlurmNodeSet>;

export interface SlurmPartition {
  /** Required. ID of the partition, which is how users will identify it. Must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters). */
  id?: string;
  /** Required. IDs of the nodesets that make up this partition. Values must match SlurmNodeSet.id. */
  nodeSetIds?: Array<string>;
}

export const SlurmPartition: Schema.Schema<SlurmPartition> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  nodeSetIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SlurmPartition" }) as any as Schema.Schema<SlurmPartition>;

export interface SlurmOrchestrator {
  /** Required. Configuration for login nodes, which allow users to access the cluster over SSH. */
  loginNodes?: SlurmLoginNodes;
  /** Optional. Compute resource configuration for the Slurm nodesets in your cluster. If not specified, the cluster won't create any nodes. */
  nodeSets?: Array<SlurmNodeSet>;
  /** Optional. Configuration for the Slurm partitions in your cluster. Each partition can contain one or more nodesets, and you can submit separate jobs on each partition. If you don't specify at least one partition in your cluster, you can't submit jobs to the cluster. */
  partitions?: Array<SlurmPartition>;
  /** Optional. Default partition to use for submitted jobs that do not explicitly specify a partition. Required if and only if there is more than one partition, in which case it must match the id of one of the partitions. */
  defaultPartition?: string;
  /** Optional. Slurm [prolog scripts](https://slurm.schedmd.com/prolog_epilog.html), which will be executed by compute nodes before a node begins running a new job. Values must not be empty. */
  prologBashScripts?: Array<string>;
  /** Optional. Slurm [epilog scripts](https://slurm.schedmd.com/prolog_epilog.html), which will be executed by compute nodes whenever a node finishes running a job. Values must not be empty. */
  epilogBashScripts?: Array<string>;
}

export const SlurmOrchestrator: Schema.Schema<SlurmOrchestrator> = Schema.suspend(() => Schema.Struct({
  loginNodes: Schema.optional(SlurmLoginNodes),
  nodeSets: Schema.optional(Schema.Array(SlurmNodeSet)),
  partitions: Schema.optional(Schema.Array(SlurmPartition)),
  defaultPartition: Schema.optional(Schema.String),
  prologBashScripts: Schema.optional(Schema.Array(Schema.String)),
  epilogBashScripts: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SlurmOrchestrator" }) as any as Schema.Schema<SlurmOrchestrator>;

export interface Orchestrator {
  /** Optional. If set, indicates that the cluster should use Slurm as the orchestrator. */
  slurm?: SlurmOrchestrator;
}

export const Orchestrator: Schema.Schema<Orchestrator> = Schema.suspend(() => Schema.Struct({
  slurm: Schema.optional(SlurmOrchestrator),
})).annotate({ identifier: "Orchestrator" }) as any as Schema.Schema<Orchestrator>;

export interface Cluster {
  /** Identifier. [Relative resource name](https://google.aip.dev/122) of the cluster, in the format `projects/{project}/locations/{location}/clusters/{cluster}`. */
  name?: string;
  /** Optional. User-provided description of the cluster. */
  description?: string;
  /** Optional. [Labels](https://cloud.google.com/compute/docs/labeling-resources) applied to the cluster. Labels can be used to organize clusters and to filter them in queries. */
  labels?: Record<string, string>;
  /** Output only. Time that the cluster was originally created. */
  createTime?: string;
  /** Output only. Time that the cluster was most recently updated. */
  updateTime?: string;
  /** Output only. Indicates whether changes to the cluster are currently in flight. If this is `true`, then the current state might not match the cluster's intended state. */
  reconciling?: boolean;
  /** Optional. Network resources available to the cluster. Must contain at most one value. Keys specify the ID of the network resource by which it can be referenced elsewhere, and must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters). */
  networkResources?: Record<string, NetworkResource>;
  /** Optional. Storage resources available to the cluster. Keys specify the ID of the storage resource by which it can be referenced elsewhere, and must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters). */
  storageResources?: Record<string, StorageResource>;
  /** Optional. Compute resources available to the cluster. Keys specify the ID of the compute resource by which it can be referenced elsewhere, and must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters). */
  computeResources?: Record<string, ComputeResource>;
  /** Optional. Orchestrator that is responsible for scheduling and running jobs on the cluster. */
  orchestrator?: Orchestrator;
}

export const Cluster: Schema.Schema<Cluster> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  reconciling: Schema.optional(Schema.Boolean),
  networkResources: Schema.optional(Schema.Record(Schema.String, NetworkResource)),
  storageResources: Schema.optional(Schema.Record(Schema.String, StorageResource)),
  computeResources: Schema.optional(Schema.Record(Schema.String, ComputeResource)),
  orchestrator: Schema.optional(Orchestrator),
})).annotate({ identifier: "Cluster" }) as any as Schema.Schema<Cluster>;

export interface ListClustersResponse {
  /** Clusters in the specified location. */
  clusters?: Array<Cluster>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is absent, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListClustersResponse: Schema.Schema<ListClustersResponse> = Schema.suspend(() => Schema.Struct({
  clusters: Schema.optional(Schema.Array(Cluster)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListClustersResponse" }) as any as Schema.Schema<ListClustersResponse>;

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

export interface CreateNetwork {
  /** Output only. Name of the network to create, in the format `projects/{project}/global/networks/{network}`. */
  network?: string;
}

export const CreateNetwork: Schema.Schema<CreateNetwork> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateNetwork" }) as any as Schema.Schema<CreateNetwork>;

export interface CreatePrivateServiceAccess {
}

export const CreatePrivateServiceAccess: Schema.Schema<CreatePrivateServiceAccess> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CreatePrivateServiceAccess" }) as any as Schema.Schema<CreatePrivateServiceAccess>;

export interface CreateFilestoreInstance {
  /** Output only. Name of the Filestore instance, in the format `projects/{project}/locations/{location}/instances/{instance}` */
  filestore?: string;
}

export const CreateFilestoreInstance: Schema.Schema<CreateFilestoreInstance> = Schema.suspend(() => Schema.Struct({
  filestore: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateFilestoreInstance" }) as any as Schema.Schema<CreateFilestoreInstance>;

export interface CreateStorageBucket {
  /** Output only. Name of the bucket. */
  bucket?: string;
}

export const CreateStorageBucket: Schema.Schema<CreateStorageBucket> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateStorageBucket" }) as any as Schema.Schema<CreateStorageBucket>;

export interface CreateLustreInstance {
  /** Output only. Name of the Managed Lustre instance, in the format `projects/{project}/locations/{location}/instances/{instance}` */
  lustre?: string;
}

export const CreateLustreInstance: Schema.Schema<CreateLustreInstance> = Schema.suspend(() => Schema.Struct({
  lustre: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateLustreInstance" }) as any as Schema.Schema<CreateLustreInstance>;

export interface CreateOrchestrator {
}

export const CreateOrchestrator: Schema.Schema<CreateOrchestrator> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CreateOrchestrator" }) as any as Schema.Schema<CreateOrchestrator>;

export interface CreateNodeset {
  /** Output only. Name of the nodeset to create */
  nodesets?: Array<string>;
}

export const CreateNodeset: Schema.Schema<CreateNodeset> = Schema.suspend(() => Schema.Struct({
  nodesets: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CreateNodeset" }) as any as Schema.Schema<CreateNodeset>;

export interface CreatePartition {
  /** Output only. Name of the partition to create */
  partitions?: Array<string>;
}

export const CreatePartition: Schema.Schema<CreatePartition> = Schema.suspend(() => Schema.Struct({
  partitions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CreatePartition" }) as any as Schema.Schema<CreatePartition>;

export interface CreateLoginNode {
}

export const CreateLoginNode: Schema.Schema<CreateLoginNode> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CreateLoginNode" }) as any as Schema.Schema<CreateLoginNode>;

export interface CheckClusterHealth {
}

export const CheckClusterHealth: Schema.Schema<CheckClusterHealth> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CheckClusterHealth" }) as any as Schema.Schema<CheckClusterHealth>;

export interface UpdateOrchestrator {
}

export const UpdateOrchestrator: Schema.Schema<UpdateOrchestrator> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UpdateOrchestrator" }) as any as Schema.Schema<UpdateOrchestrator>;

export interface UpdateNodeset {
  /** Output only. Name of the nodeset to update */
  nodesets?: Array<string>;
}

export const UpdateNodeset: Schema.Schema<UpdateNodeset> = Schema.suspend(() => Schema.Struct({
  nodesets: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "UpdateNodeset" }) as any as Schema.Schema<UpdateNodeset>;

export interface UpdatePartition {
  /** Output only. Name of the partition to update */
  partitions?: Array<string>;
}

export const UpdatePartition: Schema.Schema<UpdatePartition> = Schema.suspend(() => Schema.Struct({
  partitions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "UpdatePartition" }) as any as Schema.Schema<UpdatePartition>;

export interface UpdateLoginNode {
}

export const UpdateLoginNode: Schema.Schema<UpdateLoginNode> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UpdateLoginNode" }) as any as Schema.Schema<UpdateLoginNode>;

export interface DeleteOrchestrator {
}

export const DeleteOrchestrator: Schema.Schema<DeleteOrchestrator> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteOrchestrator" }) as any as Schema.Schema<DeleteOrchestrator>;

export interface DeleteNodeset {
  /** Output only. Name of the nodeset to delete */
  nodesets?: Array<string>;
}

export const DeleteNodeset: Schema.Schema<DeleteNodeset> = Schema.suspend(() => Schema.Struct({
  nodesets: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DeleteNodeset" }) as any as Schema.Schema<DeleteNodeset>;

export interface DeletePartition {
  /** Output only. Name of the partition to delete */
  partitions?: Array<string>;
}

export const DeletePartition: Schema.Schema<DeletePartition> = Schema.suspend(() => Schema.Struct({
  partitions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DeletePartition" }) as any as Schema.Schema<DeletePartition>;

export interface DeleteLoginNode {
}

export const DeleteLoginNode: Schema.Schema<DeleteLoginNode> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteLoginNode" }) as any as Schema.Schema<DeleteLoginNode>;

export interface DeleteFilestoreInstance {
  /** Output only. Name of the Filestore instance, in the format `projects/{project}/locations/{location}/instances/{instance}` */
  filestore?: string;
}

export const DeleteFilestoreInstance: Schema.Schema<DeleteFilestoreInstance> = Schema.suspend(() => Schema.Struct({
  filestore: Schema.optional(Schema.String),
})).annotate({ identifier: "DeleteFilestoreInstance" }) as any as Schema.Schema<DeleteFilestoreInstance>;

export interface DeleteStorageBucket {
  /** Output only. Name of the bucket. */
  bucket?: string;
}

export const DeleteStorageBucket: Schema.Schema<DeleteStorageBucket> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
})).annotate({ identifier: "DeleteStorageBucket" }) as any as Schema.Schema<DeleteStorageBucket>;

export interface DeleteLustreInstance {
  /** Output only. Name of the Managed Lustre instance, in the format `projects/{project}/locations/{location}/instances/{instance}` */
  lustre?: string;
}

export const DeleteLustreInstance: Schema.Schema<DeleteLustreInstance> = Schema.suspend(() => Schema.Struct({
  lustre: Schema.optional(Schema.String),
})).annotate({ identifier: "DeleteLustreInstance" }) as any as Schema.Schema<DeleteLustreInstance>;

export interface DeletePrivateServiceAccess {
}

export const DeletePrivateServiceAccess: Schema.Schema<DeletePrivateServiceAccess> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeletePrivateServiceAccess" }) as any as Schema.Schema<DeletePrivateServiceAccess>;

export interface DeleteNetwork {
  /** Output only. Name of the network to delete, in the format `projects/{project}/global/networks/{network}`. */
  network?: string;
}

export const DeleteNetwork: Schema.Schema<DeleteNetwork> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
})).annotate({ identifier: "DeleteNetwork" }) as any as Schema.Schema<DeleteNetwork>;

export interface OperationStep {
  /** Output only. If set, indicates that new network creation is part of the operation. */
  createNetwork?: CreateNetwork;
  /** Output only. If set, indicates that new private service access creation is part of the operation. */
  createPrivateServiceAccess?: CreatePrivateServiceAccess;
  /** Output only. If set, indicates that new Filestore instance creation is part of the operation. */
  createFilestoreInstance?: CreateFilestoreInstance;
  /** Output only. If set, indicates that new Cloud Storage bucket creation is part of the operation. */
  createStorageBucket?: CreateStorageBucket;
  /** Output only. If set, indicates that new Lustre instance creation is part of the operation. */
  createLustreInstance?: CreateLustreInstance;
  /** Output only. If set, indicates that orchestrator creation is part of the operation. */
  createOrchestrator?: CreateOrchestrator;
  /** Output only. If set, indicates that new nodeset creation is part of the operation. */
  createNodeset?: CreateNodeset;
  /** Output only. If set, indicates that new partition creation is part of the operation. */
  createPartition?: CreatePartition;
  /** Output only. If set, indicates that new login node creation is part of the operation. */
  createLoginNode?: CreateLoginNode;
  /** Output only. If set, indicates that cluster health check is part of the operation. */
  checkClusterHealth?: CheckClusterHealth;
  /** Output only. If set, indicates that an orchestrator update is part of the operation. */
  updateOrchestrator?: UpdateOrchestrator;
  /** Output only. If set, indicates that nodeset update is part of the operation. */
  updateNodeset?: UpdateNodeset;
  /** Output only. If set, indicates that partition update is part of the operation. */
  updatePartition?: UpdatePartition;
  /** Output only. If set, indicates that login node update is part of the operation. */
  updateLoginNode?: UpdateLoginNode;
  /** Output only. If set, indicates that orchestrator deletion is part of the operation. */
  deleteOrchestrator?: DeleteOrchestrator;
  /** Output only. If set, indicates that nodeset deletion is part of the operation. */
  deleteNodeset?: DeleteNodeset;
  /** Output only. If set, indicates that partition deletion is part of the operation. */
  deletePartition?: DeletePartition;
  /** Output only. If set, indicates that login node deletion is part of the operation. */
  deleteLoginNode?: DeleteLoginNode;
  /** Output only. If set, indicates that Filestore instance deletion is part of the operation. */
  deleteFilestoreInstance?: DeleteFilestoreInstance;
  /** Output only. If set, indicates that Cloud Storage bucket deletion is part of the operation. */
  deleteStorageBucket?: DeleteStorageBucket;
  /** Output only. If set, indicates that Lustre instance deletion is part of the operation. */
  deleteLustreInstance?: DeleteLustreInstance;
  /** Output only. If set, indicates that private service access deletion is part of the operation. */
  deletePrivateServiceAccess?: DeletePrivateServiceAccess;
  /** Output only. If set, indicates that network deletion is part of the operation. */
  deleteNetwork?: DeleteNetwork;
  /** Output only. State of the operation step. */
  state?: "STATE_UNSPECIFIED" | "WAITING" | "IN_PROGRESS" | "DONE" | (string & {});
}

export const OperationStep: Schema.Schema<OperationStep> = Schema.suspend(() => Schema.Struct({
  createNetwork: Schema.optional(CreateNetwork),
  createPrivateServiceAccess: Schema.optional(CreatePrivateServiceAccess),
  createFilestoreInstance: Schema.optional(CreateFilestoreInstance),
  createStorageBucket: Schema.optional(CreateStorageBucket),
  createLustreInstance: Schema.optional(CreateLustreInstance),
  createOrchestrator: Schema.optional(CreateOrchestrator),
  createNodeset: Schema.optional(CreateNodeset),
  createPartition: Schema.optional(CreatePartition),
  createLoginNode: Schema.optional(CreateLoginNode),
  checkClusterHealth: Schema.optional(CheckClusterHealth),
  updateOrchestrator: Schema.optional(UpdateOrchestrator),
  updateNodeset: Schema.optional(UpdateNodeset),
  updatePartition: Schema.optional(UpdatePartition),
  updateLoginNode: Schema.optional(UpdateLoginNode),
  deleteOrchestrator: Schema.optional(DeleteOrchestrator),
  deleteNodeset: Schema.optional(DeleteNodeset),
  deletePartition: Schema.optional(DeletePartition),
  deleteLoginNode: Schema.optional(DeleteLoginNode),
  deleteFilestoreInstance: Schema.optional(DeleteFilestoreInstance),
  deleteStorageBucket: Schema.optional(DeleteStorageBucket),
  deleteLustreInstance: Schema.optional(DeleteLustreInstance),
  deletePrivateServiceAccess: Schema.optional(DeletePrivateServiceAccess),
  deleteNetwork: Schema.optional(DeleteNetwork),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationStep" }) as any as Schema.Schema<OperationStep>;

export interface OperationProgress {
  /** Output only. Steps and status of the operation. */
  steps?: Array<OperationStep>;
}

export const OperationProgress: Schema.Schema<OperationProgress> = Schema.suspend(() => Schema.Struct({
  steps: Schema.optional(Schema.Array(OperationStep)),
})).annotate({ identifier: "OperationProgress" }) as any as Schema.Schema<OperationProgress>;

export interface OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Progress of the operation. */
  progress?: OperationProgress;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
  progress: Schema.optional(OperationProgress),
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

/** Lists Clusters in a given project and location. */
export interface ListProjectsLocationsClustersRequest {
  /** Required. Parent location of the clusters to list, in the format `projects/{project}/locations/{location}`. */
  parent: string;
  /** Optional. Maximum number of clusters to return. The service may return fewer than this value. */
  pageSize?: number;
  /** Optional. A page token received from a previous `ListClusters` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListClusters` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. [Filter](https://google.aip.dev/160) to apply to the returned results. */
  filter?: string;
  /** Optional. How to order the resulting clusters. Must be one of the following strings: * `name` * `name desc` * `create_time` * `create_time desc` If not specified, clusters will be returned in an arbitrary order. */
  orderBy?: string;
}

export const ListProjectsLocationsClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsClustersRequest>;

export type ListProjectsLocationsClustersResponse = ListClustersResponse;
export const ListProjectsLocationsClustersResponse = ListClustersResponse;

export type ListProjectsLocationsClustersError = CommonErrors;

export const listProjectsLocationsClusters = API.makePaginated(() => ({
  input: ListProjectsLocationsClustersRequest,
  output: ListProjectsLocationsClustersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single Cluster. */
export interface GetProjectsLocationsClustersRequest {
  /** Required. Name of the cluster to retrieve, in the format `projects/{project}/locations/{location}/clusters/{cluster}`. */
  name: string;
}

export const GetProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsClustersRequest>;

export type GetProjectsLocationsClustersResponse = Cluster;
export const GetProjectsLocationsClustersResponse = Cluster;

export type GetProjectsLocationsClustersError = CommonErrors;

export const getProjectsLocationsClusters: API.OperationMethod<GetProjectsLocationsClustersRequest, GetProjectsLocationsClustersResponse, GetProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsClustersRequest,
  output: GetProjectsLocationsClustersResponse,
  errors: [],
}));

/** Creates a new Cluster in a given project and location. */
export interface CreateProjectsLocationsClustersRequest {
  /** Required. Parent location in which the cluster should be created, in the format `projects/{project}/locations/{location}`. */
  parent: string;
  /** Required. ID of the cluster to create. Must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters). */
  clusterId?: string;
  /** Optional. A unique identifier for this request. A random UUID is recommended. This request is idempotent if and only if `request_id` is provided. */
  requestId?: string;
  /** Request body */
  body?: Cluster;
}

export const CreateProjectsLocationsClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  clusterId: Schema.optional(Schema.String).pipe(T.HttpQuery("clusterId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Cluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsClustersRequest>;

export type CreateProjectsLocationsClustersResponse = Operation;
export const CreateProjectsLocationsClustersResponse = Operation;

export type CreateProjectsLocationsClustersError = CommonErrors;

export const createProjectsLocationsClusters: API.OperationMethod<CreateProjectsLocationsClustersRequest, CreateProjectsLocationsClustersResponse, CreateProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsClustersRequest,
  output: CreateProjectsLocationsClustersResponse,
  errors: [],
}));

/** Updates the parameters of a single Cluster. */
export interface PatchProjectsLocationsClustersRequest {
  /** Identifier. [Relative resource name](https://google.aip.dev/122) of the cluster, in the format `projects/{project}/locations/{location}/clusters/{cluster}`. */
  name: string;
  /** Optional. Mask specifying which fields in the cluster to update. All paths must be specified explicitly - wildcards are not supported. At least one path must be provided. */
  updateMask?: string;
  /** Optional. A unique identifier for this request. A random UUID is recommended. This request is idempotent if and only if `request_id` is provided. */
  requestId?: string;
  /** Request body */
  body?: Cluster;
}

export const PatchProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Cluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsClustersRequest>;

export type PatchProjectsLocationsClustersResponse = Operation;
export const PatchProjectsLocationsClustersResponse = Operation;

export type PatchProjectsLocationsClustersError = CommonErrors;

export const patchProjectsLocationsClusters: API.OperationMethod<PatchProjectsLocationsClustersRequest, PatchProjectsLocationsClustersResponse, PatchProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsClustersRequest,
  output: PatchProjectsLocationsClustersResponse,
  errors: [],
}));

/** Deletes a single Cluster. */
export interface DeleteProjectsLocationsClustersRequest {
  /** Required. Name of the cluster to delete, in the format `projects/{project}/locations/{location}/clusters/{cluster}`. */
  name: string;
  /** Optional. A unique identifier for this request. A random UUID is recommended. This request is idempotent if and only if `request_id` is provided. */
  requestId?: string;
}

export const DeleteProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsClustersRequest>;

export type DeleteProjectsLocationsClustersResponse = Operation;
export const DeleteProjectsLocationsClustersResponse = Operation;

export type DeleteProjectsLocationsClustersError = CommonErrors;

export const deleteProjectsLocationsClusters: API.OperationMethod<DeleteProjectsLocationsClustersRequest, DeleteProjectsLocationsClustersResponse, DeleteProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsClustersRequest,
  output: DeleteProjectsLocationsClustersResponse,
  errors: [],
}));

