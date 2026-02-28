// ==========================================================================
// Cloud Filestore API (file v1)
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
  name: "file",
  version: "v1",
  rootUrl: "https://file.googleapis.com/",
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

export interface NfsExportOptions {
  /** List of either an IPv4 addresses in the format `{octet1}.{octet2}.{octet3}.{octet4}` or CIDR ranges in the format `{octet1}.{octet2}.{octet3}.{octet4}/{mask size}` which may mount the file share. Overlapping IP ranges are not allowed, both within and across NfsExportOptions. An error will be returned. The limit is 64 IP ranges/addresses for each FileShareConfig among all NfsExportOptions. */
  ipRanges?: Array<string>;
  /** Optional. The source VPC network for ip_ranges. Required for instances using Private Service Connect, optional otherwise. If provided, must be the same network specified in the `NetworkConfig.network` field. */
  network?: string;
  /** Either READ_ONLY, for allowing only read requests on the exported directory, or READ_WRITE, for allowing both read and write requests. The default is READ_WRITE. */
  accessMode?: "ACCESS_MODE_UNSPECIFIED" | "READ_ONLY" | "READ_WRITE" | (string & {});
  /** Either NO_ROOT_SQUASH, for allowing root access on the exported directory, or ROOT_SQUASH, for not allowing root access. The default is NO_ROOT_SQUASH. */
  squashMode?: "SQUASH_MODE_UNSPECIFIED" | "NO_ROOT_SQUASH" | "ROOT_SQUASH" | (string & {});
  /** An integer representing the anonymous user id with a default value of 65534. Anon_uid may only be set with squash_mode of ROOT_SQUASH. An error will be returned if this field is specified for other squash_mode settings. */
  anonUid?: string;
  /** An integer representing the anonymous group id with a default value of 65534. Anon_gid may only be set with squash_mode of ROOT_SQUASH. An error will be returned if this field is specified for other squash_mode settings. */
  anonGid?: string;
}

export const NfsExportOptions: Schema.Schema<NfsExportOptions> = Schema.suspend(() => Schema.Struct({
  ipRanges: Schema.optional(Schema.Array(Schema.String)),
  network: Schema.optional(Schema.String),
  accessMode: Schema.optional(Schema.String),
  squashMode: Schema.optional(Schema.String),
  anonUid: Schema.optional(Schema.String),
  anonGid: Schema.optional(Schema.String),
})).annotate({ identifier: "NfsExportOptions" }) as any as Schema.Schema<NfsExportOptions>;

export interface FileShareConfig {
  /** Required. The name of the file share. Must use 1-16 characters for the basic service tier and 1-63 characters for all other service tiers. Must use lowercase letters, numbers, or underscores `[a-z0-9_]`. Must start with a letter. Immutable. */
  name?: string;
  /** File share capacity in gigabytes (GB). Filestore defines 1 GB as 1024^3 bytes. */
  capacityGb?: string;
  /** The resource name of the backup, in the format `projects/{project_number}/locations/{location_id}/backups/{backup_id}`, that this file share has been restored from. */
  sourceBackup?: string;
  /** The resource name of the BackupDR backup, in the format `projects/{project_id}/locations/{location_id}/backupVaults/{backupvault_id}/dataSources/{datasource_id}/backups/{backup_id}`, TODO (b/443690479) - Remove visibility restrictions once the feature is ready */
  sourceBackupdrBackup?: string;
  /** Nfs Export Options. There is a limit of 10 export options per file share. */
  nfsExportOptions?: Array<NfsExportOptions>;
}

export const FileShareConfig: Schema.Schema<FileShareConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  capacityGb: Schema.optional(Schema.String),
  sourceBackup: Schema.optional(Schema.String),
  sourceBackupdrBackup: Schema.optional(Schema.String),
  nfsExportOptions: Schema.optional(Schema.Array(NfsExportOptions)),
})).annotate({ identifier: "FileShareConfig" }) as any as Schema.Schema<FileShareConfig>;

export interface PscConfig {
  /** Optional. Consumer service project in which the Private Service Connect endpoint would be set up. This is optional, and only relevant in case the network is a shared VPC. If this is not specified, the endpoint would be setup in the VPC host project. */
  endpointProject?: string;
}

export const PscConfig: Schema.Schema<PscConfig> = Schema.suspend(() => Schema.Struct({
  endpointProject: Schema.optional(Schema.String),
})).annotate({ identifier: "PscConfig" }) as any as Schema.Schema<PscConfig>;

export interface NetworkConfig {
  /** The name of the Google Compute Engine [VPC network](https://cloud.google.com/vpc/docs/vpc) to which the instance is connected. */
  network?: string;
  /** Internet protocol versions for which the instance has IP addresses assigned. */
  modes?: Array<"ADDRESS_MODE_UNSPECIFIED" | "MODE_IPV4" | "MODE_IPV6" | (string & {})>;
  /** Optional, reserved_ip_range can have one of the following two types of values. * CIDR range value when using DIRECT_PEERING connect mode. * [Allocated IP address range](https://cloud.google.com/compute/docs/ip-addresses/reserve-static-internal-ip-address) when using PRIVATE_SERVICE_ACCESS connect mode. When the name of an allocated IP address range is specified, it must be one of the ranges associated with the private service access connection. When specified as a direct CIDR value, it must be a /29 CIDR block for Basic tier, a /24 CIDR block for High Scale tier, or a /26 CIDR block for Enterprise tier in one of the [internal IP address ranges](https://www.arin.net/reference/research/statistics/address_filters/) that identifies the range of IP addresses reserved for this instance. For example, 10.0.0.0/29, 192.168.0.0/24 or 192.168.0.0/26, respectively. The range you specify can't overlap with either existing subnets or assigned IP address ranges for other Filestore instances in the selected VPC network. */
  reservedIpRange?: string;
  /** Output only. IPv4 addresses in the format `{octet1}.{octet2}.{octet3}.{octet4}` or IPv6 addresses in the format `{block1}:{block2}:{block3}:{block4}:{block5}:{block6}:{block7}:{block8}`. */
  ipAddresses?: Array<string>;
  /** The network connect mode of the Filestore instance. If not provided, the connect mode defaults to DIRECT_PEERING. */
  connectMode?: "CONNECT_MODE_UNSPECIFIED" | "DIRECT_PEERING" | "PRIVATE_SERVICE_ACCESS" | "PRIVATE_SERVICE_CONNECT" | (string & {});
  /** Optional. Private Service Connect configuration. Should only be set when connect_mode is PRIVATE_SERVICE_CONNECT. */
  pscConfig?: PscConfig;
}

export const NetworkConfig: Schema.Schema<NetworkConfig> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  modes: Schema.optional(Schema.Array(Schema.String)),
  reservedIpRange: Schema.optional(Schema.String),
  ipAddresses: Schema.optional(Schema.Array(Schema.String)),
  connectMode: Schema.optional(Schema.String),
  pscConfig: Schema.optional(PscConfig),
})).annotate({ identifier: "NetworkConfig" }) as any as Schema.Schema<NetworkConfig>;

export interface ReplicaConfig {
  /** Output only. The replica state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "REMOVING" | "FAILED" | "PROMOTING" | "PAUSING" | "PAUSED" | "RESUMING" | (string & {});
  /** Output only. The time when the replica state was updated. */
  stateUpdateTime?: string;
  /** Output only. Additional information about the replication state, if available. */
  stateReasons?: Array<"STATE_REASON_UNSPECIFIED" | "PEER_INSTANCE_UNREACHABLE" | "REMOVE_FAILED" | "PAUSE_FAILED" | "RESUME_FAILED" | (string & {})>;
  /** Optional. The name of the source instance for the replica, in the format `projects/{project}/locations/{location}/instances/{instance}`. This field is required when creating a replica. */
  peerInstance?: string;
  /** Output only. The timestamp of the latest replication snapshot taken on the active instance and is already replicated safely. */
  lastActiveSyncTime?: string;
}

export const ReplicaConfig: Schema.Schema<ReplicaConfig> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  stateUpdateTime: Schema.optional(Schema.String),
  stateReasons: Schema.optional(Schema.Array(Schema.String)),
  peerInstance: Schema.optional(Schema.String),
  lastActiveSyncTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ReplicaConfig" }) as any as Schema.Schema<ReplicaConfig>;

export interface Replication {
  /** Optional. The replication role. When creating a new replica, this field must be set to `STANDBY`. */
  role?: "ROLE_UNSPECIFIED" | "ACTIVE" | "STANDBY" | (string & {});
  /** Optional. Replication configuration for the replica instance associated with this instance. Only a single replica is supported. */
  replicas?: Array<ReplicaConfig>;
}

export const Replication: Schema.Schema<Replication> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  replicas: Schema.optional(Schema.Array(ReplicaConfig)),
})).annotate({ identifier: "Replication" }) as any as Schema.Schema<Replication>;

export interface LdapConfig {
  /** Required. The LDAP domain name in the format of `my-domain.com`. */
  domain?: string;
  /** Required. The servers names are used for specifying the LDAP servers names. The LDAP servers names can come with two formats: 1. DNS name, for example: `ldap.example1.com`, `ldap.example2.com`. 2. IP address, for example: `10.0.0.1`, `10.0.0.2`, `10.0.0.3`. All servers names must be in the same format: either all DNS names or all IP addresses. */
  servers?: Array<string>;
  /** Optional. The users Organizational Unit (OU) is optional. This parameter is a hint to allow faster lookup in the LDAP namespace. In case that this parameter is not provided, Filestore instance will query the whole LDAP namespace. */
  usersOu?: string;
  /** Optional. The groups Organizational Unit (OU) is optional. This parameter is a hint to allow faster lookup in the LDAP namespace. In case that this parameter is not provided, Filestore instance will query the whole LDAP namespace. */
  groupsOu?: string;
}

export const LdapConfig: Schema.Schema<LdapConfig> = Schema.suspend(() => Schema.Struct({
  domain: Schema.optional(Schema.String),
  servers: Schema.optional(Schema.Array(Schema.String)),
  usersOu: Schema.optional(Schema.String),
  groupsOu: Schema.optional(Schema.String),
})).annotate({ identifier: "LdapConfig" }) as any as Schema.Schema<LdapConfig>;

export interface DirectoryServicesConfig {
  /** Configuration for LDAP servers. */
  ldap?: LdapConfig;
}

export const DirectoryServicesConfig: Schema.Schema<DirectoryServicesConfig> = Schema.suspend(() => Schema.Struct({
  ldap: Schema.optional(LdapConfig),
})).annotate({ identifier: "DirectoryServicesConfig" }) as any as Schema.Schema<DirectoryServicesConfig>;

export interface IOPSPerTB {
  /** Required. Maximum IOPS per TiB. */
  maxIopsPerTb?: string;
}

export const IOPSPerTB: Schema.Schema<IOPSPerTB> = Schema.suspend(() => Schema.Struct({
  maxIopsPerTb: Schema.optional(Schema.String),
})).annotate({ identifier: "IOPSPerTB" }) as any as Schema.Schema<IOPSPerTB>;

export interface FixedIOPS {
  /** Required. Maximum IOPS. */
  maxIops?: string;
}

export const FixedIOPS: Schema.Schema<FixedIOPS> = Schema.suspend(() => Schema.Struct({
  maxIops: Schema.optional(Schema.String),
})).annotate({ identifier: "FixedIOPS" }) as any as Schema.Schema<FixedIOPS>;

export interface PerformanceConfig {
  /** Provision IOPS dynamically based on the capacity of the instance. Provisioned IOPS will be calculated by multiplying the capacity of the instance in TiB by the `iops_per_tb` value. For example, for a 2 TiB instance with an `iops_per_tb` value of 17000 the provisioned IOPS will be 34000. If the calculated value is outside the supported range for the instance's capacity during instance creation, instance creation will fail with an `InvalidArgument` error. Similarly, if an instance capacity update would result in a value outside the supported range, the update will fail with an `InvalidArgument` error. */
  iopsPerTb?: IOPSPerTB;
  /** Choose a fixed provisioned IOPS value for the instance, which will remain constant regardless of instance capacity. Value must be a multiple of 1000. If the chosen value is outside the supported range for the instance's capacity during instance creation, instance creation will fail with an `InvalidArgument` error. Similarly, if an instance capacity update would result in a value outside the supported range, the update will fail with an `InvalidArgument` error. */
  fixedIops?: FixedIOPS;
}

export const PerformanceConfig: Schema.Schema<PerformanceConfig> = Schema.suspend(() => Schema.Struct({
  iopsPerTb: Schema.optional(IOPSPerTB),
  fixedIops: Schema.optional(FixedIOPS),
})).annotate({ identifier: "PerformanceConfig" }) as any as Schema.Schema<PerformanceConfig>;

export interface PerformanceLimits {
  /** Output only. The maximum IOPS. */
  maxIops?: string;
  /** Output only. The maximum read IOPS. */
  maxReadIops?: string;
  /** Output only. The maximum write IOPS. */
  maxWriteIops?: string;
  /** Output only. The maximum read throughput in bytes per second. */
  maxReadThroughputBps?: string;
  /** Output only. The maximum write throughput in bytes per second. */
  maxWriteThroughputBps?: string;
}

export const PerformanceLimits: Schema.Schema<PerformanceLimits> = Schema.suspend(() => Schema.Struct({
  maxIops: Schema.optional(Schema.String),
  maxReadIops: Schema.optional(Schema.String),
  maxWriteIops: Schema.optional(Schema.String),
  maxReadThroughputBps: Schema.optional(Schema.String),
  maxWriteThroughputBps: Schema.optional(Schema.String),
})).annotate({ identifier: "PerformanceLimits" }) as any as Schema.Schema<PerformanceLimits>;

export interface Instance {
  /** Output only. The resource name of the instance, in the format `projects/{project}/locations/{location}/instances/{instance}`. */
  name?: string;
  /** The description of the instance (2048 characters or less). */
  description?: string;
  /** Output only. The instance state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "REPAIRING" | "DELETING" | "ERROR" | "RESTORING" | "SUSPENDED" | "SUSPENDING" | "RESUMING" | "REVERTING" | "PROMOTING" | (string & {});
  /** Output only. Additional information about the instance state, if available. */
  statusMessage?: string;
  /** Output only. The time when the instance was created. */
  createTime?: string;
  /** The service tier of the instance. */
  tier?: "TIER_UNSPECIFIED" | "STANDARD" | "PREMIUM" | "BASIC_HDD" | "BASIC_SSD" | "HIGH_SCALE_SSD" | "ENTERPRISE" | "ZONAL" | "REGIONAL" | (string & {});
  /** Resource labels to represent user provided metadata. */
  labels?: Record<string, string>;
  /** File system shares on the instance. For this version, only a single file share is supported. */
  fileShares?: Array<FileShareConfig>;
  /** VPC networks to which the instance is connected. For this version, only a single network is supported. */
  networks?: Array<NetworkConfig>;
  /** Server-specified ETag for the instance resource to prevent simultaneous updates from overwriting each other. */
  etag?: string;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** KMS key name used for data encryption. */
  kmsKeyName?: string;
  /** Output only. Field indicates all the reasons the instance is in "SUSPENDED" state. */
  suspensionReasons?: Array<"SUSPENSION_REASON_UNSPECIFIED" | "KMS_KEY_ISSUE" | (string & {})>;
  /** Optional. Replication configuration. */
  replication?: Replication;
  /** Optional. Input only. Immutable. Tag key-value pairs bound to this resource. Each key must be a namespaced name and each value a short name. Example: "123456789012/environment" : "production", "123456789013/costCenter" : "marketing" See the documentation for more information: - Namespaced name: https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing#retrieving_tag_key - Short name: https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing#retrieving_tag_value */
  tags?: Record<string, string>;
  /** Immutable. The protocol indicates the access protocol for all shares in the instance. This field is immutable and it cannot be changed after the instance has been created. Default value: `NFS_V3`. */
  protocol?: "FILE_PROTOCOL_UNSPECIFIED" | "NFS_V3" | "NFS_V4_1" | (string & {});
  /** Optional. Directory Services configuration for Kerberos-based authentication. Should only be set if protocol is "NFS_V4_1". */
  directoryServices?: DirectoryServicesConfig;
  /** Output only. Indicates whether this instance supports configuring its performance. If true, the user can configure the instance's performance by using the 'performance_config' field. */
  customPerformanceSupported?: boolean;
  /** Optional. Used to configure performance. */
  performanceConfig?: PerformanceConfig;
  /** Output only. Used for getting performance limits. */
  performanceLimits?: PerformanceLimits;
  /** Optional. Indicates whether the instance is protected against deletion. */
  deletionProtectionEnabled?: boolean;
  /** Optional. The reason for enabling deletion protection. */
  deletionProtectionReason?: string;
  /** Output only. The minimum capacity of the instance in GB. */
  minCapacityGb?: string;
  /** Output only. The maximum capacity of the instance in GB. */
  maxCapacityGb?: string;
  /** Output only. The incremental increase or decrease in capacity, designated in some number of GB. */
  capacityStepSizeGb?: string;
}

export const Instance: Schema.Schema<Instance> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  tier: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  fileShares: Schema.optional(Schema.Array(FileShareConfig)),
  networks: Schema.optional(Schema.Array(NetworkConfig)),
  etag: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  kmsKeyName: Schema.optional(Schema.String),
  suspensionReasons: Schema.optional(Schema.Array(Schema.String)),
  replication: Schema.optional(Replication),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  protocol: Schema.optional(Schema.String),
  directoryServices: Schema.optional(DirectoryServicesConfig),
  customPerformanceSupported: Schema.optional(Schema.Boolean),
  performanceConfig: Schema.optional(PerformanceConfig),
  performanceLimits: Schema.optional(PerformanceLimits),
  deletionProtectionEnabled: Schema.optional(Schema.Boolean),
  deletionProtectionReason: Schema.optional(Schema.String),
  minCapacityGb: Schema.optional(Schema.String),
  maxCapacityGb: Schema.optional(Schema.String),
  capacityStepSizeGb: Schema.optional(Schema.String),
})).annotate({ identifier: "Instance" }) as any as Schema.Schema<Instance>;

export interface ListInstancesResponse {
  /** A list of instances in the project for the specified location. If the `{location}` value in the request is "-", the response contains a list of instances from all locations. If any location is unreachable, the response will only return instances in reachable locations and the "unreachable" field will be populated with a list of unreachable locations. */
  instances?: Array<Instance>;
  /** The token you can use to retrieve the next page of results. Not returned if there are no more results in the list. */
  nextPageToken?: string;
  /** Unordered list. Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListInstancesResponse: Schema.Schema<ListInstancesResponse> = Schema.suspend(() => Schema.Struct({
  instances: Schema.optional(Schema.Array(Instance)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListInstancesResponse" }) as any as Schema.Schema<ListInstancesResponse>;

export interface RestoreInstanceRequest {
  /** Required. Name of the file share in the Filestore instance that the backup is being restored to. */
  fileShare?: string;
  /** The resource name of the backup, in the format `projects/{project_number}/locations/{location_id}/backups/{backup_id}`. */
  sourceBackup?: string;
}

export const RestoreInstanceRequest: Schema.Schema<RestoreInstanceRequest> = Schema.suspend(() => Schema.Struct({
  fileShare: Schema.optional(Schema.String),
  sourceBackup: Schema.optional(Schema.String),
})).annotate({ identifier: "RestoreInstanceRequest" }) as any as Schema.Schema<RestoreInstanceRequest>;

export interface RevertInstanceRequest {
  /** Required. The snapshot resource ID, in the format 'my-snapshot', where the specified ID is the {snapshot_id} of the fully qualified name like `projects/{project_id}/locations/{location_id}/instances/{instance_id}/snapshots/{snapshot_id}` */
  targetSnapshotId?: string;
}

export const RevertInstanceRequest: Schema.Schema<RevertInstanceRequest> = Schema.suspend(() => Schema.Struct({
  targetSnapshotId: Schema.optional(Schema.String),
})).annotate({ identifier: "RevertInstanceRequest" }) as any as Schema.Schema<RevertInstanceRequest>;

export interface Snapshot {
  /** Output only. The resource name of the snapshot, in the format `projects/{project_id}/locations/{location_id}/instances/{instance_id}/snapshots/{snapshot_id}`. */
  name?: string;
  /** A description of the snapshot with 2048 characters or less. Requests with longer descriptions will be rejected. */
  description?: string;
  /** Output only. The snapshot state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "DELETING" | (string & {});
  /** Output only. The time when the snapshot was created. */
  createTime?: string;
  /** Resource labels to represent user provided metadata. */
  labels?: Record<string, string>;
  /** Output only. The amount of bytes needed to allocate a full copy of the snapshot content */
  filesystemUsedBytes?: string;
  /** Optional. Input only. Immutable. Tag key-value pairs bound to this resource. Each key must be a namespaced name and each value a short name. Example: "123456789012/environment" : "production", "123456789013/costCenter" : "marketing" See the documentation for more information: - Namespaced name: https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing#retrieving_tag_key - Short name: https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing#retrieving_tag_value */
  tags?: Record<string, string>;
}

export const Snapshot: Schema.Schema<Snapshot> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  filesystemUsedBytes: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Snapshot" }) as any as Schema.Schema<Snapshot>;

export interface ListSnapshotsResponse {
  /** A list of snapshots in the project for the specified instance. */
  snapshots?: Array<Snapshot>;
  /** The token you can use to retrieve the next page of results. Not returned if there are no more results in the list. */
  nextPageToken?: string;
  /** Unordered list. Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListSnapshotsResponse: Schema.Schema<ListSnapshotsResponse> = Schema.suspend(() => Schema.Struct({
  snapshots: Schema.optional(Schema.Array(Snapshot)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListSnapshotsResponse" }) as any as Schema.Schema<ListSnapshotsResponse>;

export interface Backup {
  /** Output only. The resource name of the backup, in the format `projects/{project_number}/locations/{location_id}/backups/{backup_id}`. */
  name?: string;
  /** A description of the backup with 2048 characters or less. Requests with longer descriptions will be rejected. */
  description?: string;
  /** Output only. The backup state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "FINALIZING" | "READY" | "DELETING" | "INVALID" | (string & {});
  /** Output only. The time when the backup was created. */
  createTime?: string;
  /** Resource labels to represent user provided metadata. */
  labels?: Record<string, string>;
  /** Output only. Capacity of the source file share when the backup was created. */
  capacityGb?: string;
  /** Output only. The size of the storage used by the backup. As backups share storage, this number is expected to change with backup creation/deletion. */
  storageBytes?: string;
  /** The resource name of the source Filestore instance, in the format `projects/{project_number}/locations/{location_id}/instances/{instance_id}`, used to create this backup. */
  sourceInstance?: string;
  /** Name of the file share in the source Filestore instance that the backup is created from. */
  sourceFileShare?: string;
  /** Output only. The service tier of the source Filestore instance that this backup is created from. */
  sourceInstanceTier?: "TIER_UNSPECIFIED" | "STANDARD" | "PREMIUM" | "BASIC_HDD" | "BASIC_SSD" | "HIGH_SCALE_SSD" | "ENTERPRISE" | "ZONAL" | "REGIONAL" | (string & {});
  /** Output only. Amount of bytes that will be downloaded if the backup is restored. This may be different than storage bytes, since sequential backups of the same disk will share storage. */
  downloadBytes?: string;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Immutable. KMS key name used for data encryption. */
  kmsKey?: string;
  /** Optional. Input only. Immutable. Tag key-value pairs bound to this resource. Each key must be a namespaced name and each value a short name. Example: "123456789012/environment" : "production", "123456789013/costCenter" : "marketing" See the documentation for more information: - Namespaced name: https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing#retrieving_tag_key - Short name: https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing#retrieving_tag_value */
  tags?: Record<string, string>;
  /** Output only. The file system protocol of the source Filestore instance that this backup is created from. */
  fileSystemProtocol?: "FILE_PROTOCOL_UNSPECIFIED" | "NFS_V3" | "NFS_V4_1" | (string & {});
}

export const Backup: Schema.Schema<Backup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  capacityGb: Schema.optional(Schema.String),
  storageBytes: Schema.optional(Schema.String),
  sourceInstance: Schema.optional(Schema.String),
  sourceFileShare: Schema.optional(Schema.String),
  sourceInstanceTier: Schema.optional(Schema.String),
  downloadBytes: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  kmsKey: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  fileSystemProtocol: Schema.optional(Schema.String),
})).annotate({ identifier: "Backup" }) as any as Schema.Schema<Backup>;

export interface ListBackupsResponse {
  /** A list of backups in the project for the specified location. If the `{location}` value in the request is "-", the response contains a list of backups from all locations. If any location is unreachable, the response will only return backups in reachable locations and the "unreachable" field will be populated with a list of unreachable locations. */
  backups?: Array<Backup>;
  /** The token you can use to retrieve the next page of results. Not returned if there are no more results in the list. */
  nextPageToken?: string;
  /** Unordered list. Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackupsResponse: Schema.Schema<ListBackupsResponse> = Schema.suspend(() => Schema.Struct({
  backups: Schema.optional(Schema.Array(Backup)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBackupsResponse" }) as any as Schema.Schema<ListBackupsResponse>;

export interface PromoteReplicaRequest {
  /** Optional. The resource name of the peer instance to promote, in the format `projects/{project_id}/locations/{location_id}/instances/{instance_id}`. The peer instance is required if the operation is called on an active instance. */
  peerInstance?: string;
}

export const PromoteReplicaRequest: Schema.Schema<PromoteReplicaRequest> = Schema.suspend(() => Schema.Struct({
  peerInstance: Schema.optional(Schema.String),
})).annotate({ identifier: "PromoteReplicaRequest" }) as any as Schema.Schema<PromoteReplicaRequest>;

export interface PauseReplicaRequest {
}

export const PauseReplicaRequest: Schema.Schema<PauseReplicaRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PauseReplicaRequest" }) as any as Schema.Schema<PauseReplicaRequest>;

export interface ResumeReplicaRequest {
}

export const ResumeReplicaRequest: Schema.Schema<ResumeReplicaRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResumeReplicaRequest" }) as any as Schema.Schema<ResumeReplicaRequest>;

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
  statusDetail?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
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

export interface File_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const File_Date: Schema.Schema<File_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "File_Date" }) as any as Schema.Schema<File_Date>;

export interface DenyMaintenancePeriod {
  /** Deny period start date. This can be: * A full date, with non-zero year, month and day values. * A month and day value, with a zero year. Allows recurring deny periods each year. Date matching this period will have to be the same or after the start. */
  startDate?: File_Date;
  /** Deny period end date. This can be: * A full date, with non-zero year, month and day values. * A month and day value, with a zero year. Allows recurring deny periods each year. Date matching this period will have to be before the end. */
  endDate?: File_Date;
  /** Time in UTC when the Blackout period starts on start_date and ends on end_date. This can be: * Full time. * All zeros for 00:00:00 UTC */
  time?: TimeOfDay;
}

export const DenyMaintenancePeriod: Schema.Schema<DenyMaintenancePeriod> = Schema.suspend(() => Schema.Struct({
  startDate: Schema.optional(File_Date),
  endDate: Schema.optional(File_Date),
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

/** Lists all instances in a project for either a specified location or for all locations. */
export interface ListProjectsLocationsInstancesRequest {
  /** Required. The project and location for which to retrieve instance information, in the format `projects/{project_id}/locations/{location}`. In Cloud Filestore, locations map to Google Cloud zones, for example **us-west1-b**. To retrieve instance information for all locations, use "-" for the `{location}` value. */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value to use if there are additional results to retrieve for this list request. */
  pageToken?: string;
  /** Sort results. Supported values are "name", "name desc" or "" (unsorted). */
  orderBy?: string;
  /** List filter. */
  filter?: string;
}

export const ListProjectsLocationsInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
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

/** Gets the details of a specific instance. */
export interface GetProjectsLocationsInstancesRequest {
  /** Required. The instance resource name, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}`. */
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

/** Creates an instance. When creating from a backup, the capacity of the new instance needs to be equal to or larger than the capacity of the backup (and also equal to or larger than the minimum capacity of the tier). */
export interface CreateProjectsLocationsInstancesRequest {
  /** Required. The instance's project and location, in the format `projects/{project_id}/locations/{location}`. In Filestore, locations map to Google Cloud zones, for example **us-west1-b**. */
  parent: string;
  /** Required. The name of the instance to create. The name must be unique for the specified project and location. */
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

/** Updates the settings of a specific instance. */
export interface PatchProjectsLocationsInstancesRequest {
  /** Output only. The resource name of the instance, in the format `projects/{project}/locations/{location}/instances/{instance}`. */
  name: string;
  /** Mask of fields to update. At least one path must be supplied in this field. The elements of the repeated paths field may only include these fields: * "description" * "file_shares" * "labels" * "performance_config" * "deletion_protection_enabled" * "deletion_protection_reason" */
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

/** Restores an existing instance's file share from a backup. The capacity of the instance needs to be equal to or larger than the capacity of the backup (and also equal to or larger than the minimum capacity of the tier). */
export interface RestoreProjectsLocationsInstancesRequest {
  /** Required. The resource name of the instance, in the format `projects/{project_number}/locations/{location_id}/instances/{instance_id}`. */
  name: string;
  /** Request body */
  body?: RestoreInstanceRequest;
}

export const RestoreProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RestoreInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsLocationsInstancesRequest>;

export type RestoreProjectsLocationsInstancesResponse = Operation;
export const RestoreProjectsLocationsInstancesResponse = Operation;

export type RestoreProjectsLocationsInstancesError = CommonErrors;

export const restoreProjectsLocationsInstances: API.OperationMethod<RestoreProjectsLocationsInstancesRequest, RestoreProjectsLocationsInstancesResponse, RestoreProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreProjectsLocationsInstancesRequest,
  output: RestoreProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Revert an existing instance's file system to a specified snapshot. */
export interface RevertProjectsLocationsInstancesRequest {
  /** Required. The resource name of the instance, in the format `projects/{project_id}/locations/{location_id}/instances/{instance_id}`. */
  name: string;
  /** Request body */
  body?: RevertInstanceRequest;
}

export const RevertProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RevertInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:revert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevertProjectsLocationsInstancesRequest>;

export type RevertProjectsLocationsInstancesResponse = Operation;
export const RevertProjectsLocationsInstancesResponse = Operation;

export type RevertProjectsLocationsInstancesError = CommonErrors;

export const revertProjectsLocationsInstances: API.OperationMethod<RevertProjectsLocationsInstancesRequest, RevertProjectsLocationsInstancesResponse, RevertProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevertProjectsLocationsInstancesRequest,
  output: RevertProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Deletes an instance. */
export interface DeleteProjectsLocationsInstancesRequest {
  /** Required. The instance resource name, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  name: string;
  /** If set to true, all snapshots of the instance will also be deleted. (Otherwise, the request will only work if the instance has no snapshots.) */
  force?: boolean;
}

export const DeleteProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
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

/** Promote the standby instance (replica). */
export interface PromoteReplicaProjectsLocationsInstancesRequest {
  /** Required. The resource name of the instance, in the format `projects/{project_id}/locations/{location_id}/instances/{instance_id}`. */
  name: string;
  /** Request body */
  body?: PromoteReplicaRequest;
}

export const PromoteReplicaProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PromoteReplicaRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:promoteReplica", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PromoteReplicaProjectsLocationsInstancesRequest>;

export type PromoteReplicaProjectsLocationsInstancesResponse = Operation;
export const PromoteReplicaProjectsLocationsInstancesResponse = Operation;

export type PromoteReplicaProjectsLocationsInstancesError = CommonErrors;

export const promoteReplicaProjectsLocationsInstances: API.OperationMethod<PromoteReplicaProjectsLocationsInstancesRequest, PromoteReplicaProjectsLocationsInstancesResponse, PromoteReplicaProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PromoteReplicaProjectsLocationsInstancesRequest,
  output: PromoteReplicaProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Pause the standby instance (replica). WARNING: This operation makes the standby instance's NFS filesystem writable. Any data written to the standby instance while paused will be lost when the replica is resumed or promoted. */
export interface PauseReplicaProjectsLocationsInstancesRequest {
  /** Required. The resource name of the instance, in the format `projects/{project_id}/locations/{location_id}/instances/{instance_id}`. */
  name: string;
  /** Request body */
  body?: PauseReplicaRequest;
}

export const PauseReplicaProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PauseReplicaRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:pauseReplica", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PauseReplicaProjectsLocationsInstancesRequest>;

export type PauseReplicaProjectsLocationsInstancesResponse = Operation;
export const PauseReplicaProjectsLocationsInstancesResponse = Operation;

export type PauseReplicaProjectsLocationsInstancesError = CommonErrors;

export const pauseReplicaProjectsLocationsInstances: API.OperationMethod<PauseReplicaProjectsLocationsInstancesRequest, PauseReplicaProjectsLocationsInstancesResponse, PauseReplicaProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PauseReplicaProjectsLocationsInstancesRequest,
  output: PauseReplicaProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Resume the standby instance (replica). WARNING: Any data written to the standby instance while paused will be lost when the replica is resumed. */
export interface ResumeReplicaProjectsLocationsInstancesRequest {
  /** Required. The resource name of the instance, in the format `projects/{project_id}/locations/{location_id}/instances/{instance_id}`. */
  name: string;
  /** Request body */
  body?: ResumeReplicaRequest;
}

export const ResumeReplicaProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResumeReplicaRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:resumeReplica", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResumeReplicaProjectsLocationsInstancesRequest>;

export type ResumeReplicaProjectsLocationsInstancesResponse = Operation;
export const ResumeReplicaProjectsLocationsInstancesResponse = Operation;

export type ResumeReplicaProjectsLocationsInstancesError = CommonErrors;

export const resumeReplicaProjectsLocationsInstances: API.OperationMethod<ResumeReplicaProjectsLocationsInstancesRequest, ResumeReplicaProjectsLocationsInstancesResponse, ResumeReplicaProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResumeReplicaProjectsLocationsInstancesRequest,
  output: ResumeReplicaProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Lists all snapshots in a project for either a specified location or for all locations. */
export interface ListProjectsLocationsInstancesSnapshotsRequest {
  /** Required. The instance for which to retrieve snapshot information, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}`. */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value to use if there are additional results to retrieve for this list request. */
  pageToken?: string;
  /** Sort results. Supported values are "name", "name desc" or "" (unsorted). */
  orderBy?: string;
  /** List filter. */
  filter?: string;
  /** Optional. If true, allow partial responses for multi-regional Aggregated List requests. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsInstancesSnapshotsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/snapshots" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInstancesSnapshotsRequest>;

export type ListProjectsLocationsInstancesSnapshotsResponse = ListSnapshotsResponse;
export const ListProjectsLocationsInstancesSnapshotsResponse = ListSnapshotsResponse;

export type ListProjectsLocationsInstancesSnapshotsError = CommonErrors;

export const listProjectsLocationsInstancesSnapshots = API.makePaginated(() => ({
  input: ListProjectsLocationsInstancesSnapshotsRequest,
  output: ListProjectsLocationsInstancesSnapshotsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the details of a specific snapshot. */
export interface GetProjectsLocationsInstancesSnapshotsRequest {
  /** Required. The snapshot resource name, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}/snapshots/{snapshot_id}` */
  name: string;
}

export const GetProjectsLocationsInstancesSnapshotsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/snapshots/{snapshotsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInstancesSnapshotsRequest>;

export type GetProjectsLocationsInstancesSnapshotsResponse = Snapshot;
export const GetProjectsLocationsInstancesSnapshotsResponse = Snapshot;

export type GetProjectsLocationsInstancesSnapshotsError = CommonErrors;

export const getProjectsLocationsInstancesSnapshots: API.OperationMethod<GetProjectsLocationsInstancesSnapshotsRequest, GetProjectsLocationsInstancesSnapshotsResponse, GetProjectsLocationsInstancesSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInstancesSnapshotsRequest,
  output: GetProjectsLocationsInstancesSnapshotsResponse,
  errors: [],
}));

/** Creates a snapshot. */
export interface CreateProjectsLocationsInstancesSnapshotsRequest {
  /** Required. The Filestore Instance to create the snapshots of, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  parent: string;
  /** Required. The ID to use for the snapshot. The ID must be unique within the specified instance. This value must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a hyphen. */
  snapshotId?: string;
  /** Request body */
  body?: Snapshot;
}

export const CreateProjectsLocationsInstancesSnapshotsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  snapshotId: Schema.optional(Schema.String).pipe(T.HttpQuery("snapshotId")),
  body: Schema.optional(Snapshot).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/snapshots", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsInstancesSnapshotsRequest>;

export type CreateProjectsLocationsInstancesSnapshotsResponse = Operation;
export const CreateProjectsLocationsInstancesSnapshotsResponse = Operation;

export type CreateProjectsLocationsInstancesSnapshotsError = CommonErrors;

export const createProjectsLocationsInstancesSnapshots: API.OperationMethod<CreateProjectsLocationsInstancesSnapshotsRequest, CreateProjectsLocationsInstancesSnapshotsResponse, CreateProjectsLocationsInstancesSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsInstancesSnapshotsRequest,
  output: CreateProjectsLocationsInstancesSnapshotsResponse,
  errors: [],
}));

/** Deletes a snapshot. */
export interface DeleteProjectsLocationsInstancesSnapshotsRequest {
  /** Required. The snapshot resource name, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}/snapshots/{snapshot_id}` */
  name: string;
}

export const DeleteProjectsLocationsInstancesSnapshotsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/snapshots/{snapshotsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsInstancesSnapshotsRequest>;

export type DeleteProjectsLocationsInstancesSnapshotsResponse = Operation;
export const DeleteProjectsLocationsInstancesSnapshotsResponse = Operation;

export type DeleteProjectsLocationsInstancesSnapshotsError = CommonErrors;

export const deleteProjectsLocationsInstancesSnapshots: API.OperationMethod<DeleteProjectsLocationsInstancesSnapshotsRequest, DeleteProjectsLocationsInstancesSnapshotsResponse, DeleteProjectsLocationsInstancesSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsInstancesSnapshotsRequest,
  output: DeleteProjectsLocationsInstancesSnapshotsResponse,
  errors: [],
}));

/** Updates the settings of a specific snapshot. */
export interface PatchProjectsLocationsInstancesSnapshotsRequest {
  /** Output only. The resource name of the snapshot, in the format `projects/{project_id}/locations/{location_id}/instances/{instance_id}/snapshots/{snapshot_id}`. */
  name: string;
  /** Required. Mask of fields to update. At least one path must be supplied in this field. */
  updateMask?: string;
  /** Request body */
  body?: Snapshot;
}

export const PatchProjectsLocationsInstancesSnapshotsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Snapshot).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/snapshots/{snapshotsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsInstancesSnapshotsRequest>;

export type PatchProjectsLocationsInstancesSnapshotsResponse = Operation;
export const PatchProjectsLocationsInstancesSnapshotsResponse = Operation;

export type PatchProjectsLocationsInstancesSnapshotsError = CommonErrors;

export const patchProjectsLocationsInstancesSnapshots: API.OperationMethod<PatchProjectsLocationsInstancesSnapshotsRequest, PatchProjectsLocationsInstancesSnapshotsResponse, PatchProjectsLocationsInstancesSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsInstancesSnapshotsRequest,
  output: PatchProjectsLocationsInstancesSnapshotsResponse,
  errors: [],
}));

/** Lists all backups in a project for either a specified location or for all locations. */
export interface ListProjectsLocationsBackupsRequest {
  /** Required. The project and location for which to retrieve backup information, in the format `projects/{project_number}/locations/{location}`. In Filestore, backup locations map to Google Cloud regions, for example **us-west1**. To retrieve backup information for all locations, use "-" for the `{location}` value. */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value to use if there are additional results to retrieve for this list request. */
  pageToken?: string;
  /** Sort results. Supported values are "name", "name desc" or "" (unsorted). */
  orderBy?: string;
  /** List filter. */
  filter?: string;
}

export const ListProjectsLocationsBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackupsRequest>;

export type ListProjectsLocationsBackupsResponse = ListBackupsResponse;
export const ListProjectsLocationsBackupsResponse = ListBackupsResponse;

export type ListProjectsLocationsBackupsError = CommonErrors;

export const listProjectsLocationsBackups = API.makePaginated(() => ({
  input: ListProjectsLocationsBackupsRequest,
  output: ListProjectsLocationsBackupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the details of a specific backup. */
export interface GetProjectsLocationsBackupsRequest {
  /** Required. The backup resource name, in the format `projects/{project_number}/locations/{location}/backups/{backup_id}`. */
  name: string;
}

export const GetProjectsLocationsBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackupsRequest>;

export type GetProjectsLocationsBackupsResponse = Backup;
export const GetProjectsLocationsBackupsResponse = Backup;

export type GetProjectsLocationsBackupsError = CommonErrors;

export const getProjectsLocationsBackups: API.OperationMethod<GetProjectsLocationsBackupsRequest, GetProjectsLocationsBackupsResponse, GetProjectsLocationsBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackupsRequest,
  output: GetProjectsLocationsBackupsResponse,
  errors: [],
}));

/** Creates a backup. */
export interface CreateProjectsLocationsBackupsRequest {
  /** Required. The backup's project and location, in the format `projects/{project_number}/locations/{location}`. In Filestore, backup locations map to Google Cloud regions, for example **us-west1**. */
  parent: string;
  /** Required. The ID to use for the backup. The ID must be unique within the specified project and location. This value must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a hyphen. Values that do not match this pattern will trigger an INVALID_ARGUMENT error. */
  backupId?: string;
  /** Request body */
  body?: Backup;
}

export const CreateProjectsLocationsBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  backupId: Schema.optional(Schema.String).pipe(T.HttpQuery("backupId")),
  body: Schema.optional(Backup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBackupsRequest>;

export type CreateProjectsLocationsBackupsResponse = Operation;
export const CreateProjectsLocationsBackupsResponse = Operation;

export type CreateProjectsLocationsBackupsError = CommonErrors;

export const createProjectsLocationsBackups: API.OperationMethod<CreateProjectsLocationsBackupsRequest, CreateProjectsLocationsBackupsResponse, CreateProjectsLocationsBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBackupsRequest,
  output: CreateProjectsLocationsBackupsResponse,
  errors: [],
}));

/** Deletes a backup. */
export interface DeleteProjectsLocationsBackupsRequest {
  /** Required. The backup resource name, in the format `projects/{project_number}/locations/{location}/backups/{backup_id}` */
  name: string;
}

export const DeleteProjectsLocationsBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackupsRequest>;

export type DeleteProjectsLocationsBackupsResponse = Operation;
export const DeleteProjectsLocationsBackupsResponse = Operation;

export type DeleteProjectsLocationsBackupsError = CommonErrors;

export const deleteProjectsLocationsBackups: API.OperationMethod<DeleteProjectsLocationsBackupsRequest, DeleteProjectsLocationsBackupsResponse, DeleteProjectsLocationsBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBackupsRequest,
  output: DeleteProjectsLocationsBackupsResponse,
  errors: [],
}));

/** Updates the settings of a specific backup. */
export interface PatchProjectsLocationsBackupsRequest {
  /** Output only. The resource name of the backup, in the format `projects/{project_number}/locations/{location_id}/backups/{backup_id}`. */
  name: string;
  /** Required. Mask of fields to update. At least one path must be supplied in this field. */
  updateMask?: string;
  /** Request body */
  body?: Backup;
}

export const PatchProjectsLocationsBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Backup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/backups/{backupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackupsRequest>;

export type PatchProjectsLocationsBackupsResponse = Operation;
export const PatchProjectsLocationsBackupsResponse = Operation;

export type PatchProjectsLocationsBackupsError = CommonErrors;

export const patchProjectsLocationsBackups: API.OperationMethod<PatchProjectsLocationsBackupsRequest, PatchProjectsLocationsBackupsResponse, PatchProjectsLocationsBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBackupsRequest,
  output: PatchProjectsLocationsBackupsResponse,
  errors: [],
}));

