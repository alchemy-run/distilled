// ==========================================================================
// NetApp API (netapp v1)
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
  name: "netapp",
  version: "v1",
  rootUrl: "https://netapp.googleapis.com/",
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

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface StoragePool {
  /** Identifier. Name of the storage pool */
  name?: string;
  /** Required. Service level of the storage pool */
  serviceLevel?: "SERVICE_LEVEL_UNSPECIFIED" | "PREMIUM" | "EXTREME" | "STANDARD" | "FLEX" | (string & {});
  /** Required. Capacity in GIB of the pool */
  capacityGib?: string;
  /** Output only. Allocated size of all volumes in GIB in the storage pool */
  volumeCapacityGib?: string;
  /** Output only. Volume count of the storage pool */
  volumeCount?: number;
  /** Output only. State of the storage pool */
  state?: "STATE_UNSPECIFIED" | "READY" | "CREATING" | "DELETING" | "UPDATING" | "RESTORING" | "DISABLED" | "ERROR" | (string & {});
  /** Output only. State details of the storage pool */
  stateDetails?: string;
  /** Output only. Create time of the storage pool */
  createTime?: string;
  /** Optional. Description of the storage pool */
  description?: string;
  /** Optional. Labels as key value pairs */
  labels?: Record<string, string>;
  /** Required. VPC Network name. Format: projects/{project}/global/networks/{network} */
  network?: string;
  /** Optional. Specifies the Active Directory to be used for creating a SMB volume. */
  activeDirectory?: string;
  /** Optional. Specifies the KMS config to be used for volume encryption. */
  kmsConfig?: string;
  /** Optional. Flag indicating if the pool is NFS LDAP enabled or not. */
  ldapEnabled?: boolean;
  /** Optional. This field is not implemented. The values provided in this field are ignored. */
  psaRange?: string;
  /** Output only. Specifies the current pool encryption key source. */
  encryptionType?: "ENCRYPTION_TYPE_UNSPECIFIED" | "SERVICE_MANAGED" | "CLOUD_KMS" | (string & {});
  /** Deprecated. Used to allow SO pool to access AD or DNS server from other regions. */
  globalAccessAllowed?: boolean;
  /** Optional. True if the storage pool supports Auto Tiering enabled volumes. Default is false. Auto-tiering can be enabled after storage pool creation but it can't be disabled once enabled. */
  allowAutoTiering?: boolean;
  /** Optional. Specifies the replica zone for regional storagePool. */
  replicaZone?: string;
  /** Optional. Specifies the active zone for regional storagePool. */
  zone?: string;
  /** Output only. Reserved for future use */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use */
  satisfiesPzi?: boolean;
  /** Optional. True if using Independent Scaling of capacity and performance (Hyperdisk) By default set to false */
  customPerformanceEnabled?: boolean;
  /** Optional. Custom Performance Total Throughput of the pool (in MiBps) */
  totalThroughputMibps?: string;
  /** Optional. Custom Performance Total IOPS of the pool if not provided, it will be calculated based on the total_throughput_mibps */
  totalIops?: string;
  /** Optional. Total hot tier capacity for the Storage Pool. It is applicable only to Flex service level. It should be less than the minimum storage pool size and cannot be more than the current storage pool size. It cannot be decreased once set. */
  hotTierSizeGib?: string;
  /** Optional. Flag indicating that the hot-tier threshold will be auto-increased by 10% of the hot-tier when it hits 100%. Default is true. The increment will kick in only if the new size after increment is still less than or equal to storage pool size. */
  enableHotTierAutoResize?: boolean;
  /** Optional. QoS (Quality of Service) Type of the storage pool */
  qosType?: "QOS_TYPE_UNSPECIFIED" | "AUTO" | "MANUAL" | (string & {});
  /** Output only. Available throughput of the storage pool (in MiB/s). */
  availableThroughputMibps?: number;
  /** Output only. Total cold tier data rounded down to the nearest GiB used by the storage pool. */
  coldTierSizeUsedGib?: string;
  /** Output only. Total hot tier data rounded down to the nearest GiB used by the storage pool. */
  hotTierSizeUsedGib?: string;
  /** Optional. Type of the storage pool. This field is used to control whether the pool supports `FILE` based volumes only or `UNIFIED` (both `FILE` and `BLOCK`) volumes or `UNIFIED_LARGE_CAPACITY` (both `FILE` and `BLOCK`) volumes with large capacity. If not specified during creation, it defaults to `FILE`. */
  type?: "STORAGE_POOL_TYPE_UNSPECIFIED" | "FILE" | "UNIFIED" | "UNIFIED_LARGE_CAPACITY" | (string & {});
}

export const StoragePool: Schema.Schema<StoragePool> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  serviceLevel: Schema.optional(Schema.String),
  capacityGib: Schema.optional(Schema.String),
  volumeCapacityGib: Schema.optional(Schema.String),
  volumeCount: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.String),
  stateDetails: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  network: Schema.optional(Schema.String),
  activeDirectory: Schema.optional(Schema.String),
  kmsConfig: Schema.optional(Schema.String),
  ldapEnabled: Schema.optional(Schema.Boolean),
  psaRange: Schema.optional(Schema.String),
  encryptionType: Schema.optional(Schema.String),
  globalAccessAllowed: Schema.optional(Schema.Boolean),
  allowAutoTiering: Schema.optional(Schema.Boolean),
  replicaZone: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  customPerformanceEnabled: Schema.optional(Schema.Boolean),
  totalThroughputMibps: Schema.optional(Schema.String),
  totalIops: Schema.optional(Schema.String),
  hotTierSizeGib: Schema.optional(Schema.String),
  enableHotTierAutoResize: Schema.optional(Schema.Boolean),
  qosType: Schema.optional(Schema.String),
  availableThroughputMibps: Schema.optional(Schema.Number),
  coldTierSizeUsedGib: Schema.optional(Schema.String),
  hotTierSizeUsedGib: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "StoragePool" }) as any as Schema.Schema<StoragePool>;

export interface ListStoragePoolsResponse {
  /** The list of StoragePools */
  storagePools?: Array<StoragePool>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListStoragePoolsResponse: Schema.Schema<ListStoragePoolsResponse> = Schema.suspend(() => Schema.Struct({
  storagePools: Schema.optional(Schema.Array(StoragePool)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListStoragePoolsResponse" }) as any as Schema.Schema<ListStoragePoolsResponse>;

export interface ValidateDirectoryServiceRequest {
  /** Type of directory service policy attached to the storage pool. */
  directoryServiceType?: "DIRECTORY_SERVICE_TYPE_UNSPECIFIED" | "ACTIVE_DIRECTORY" | (string & {});
}

export const ValidateDirectoryServiceRequest: Schema.Schema<ValidateDirectoryServiceRequest> = Schema.suspend(() => Schema.Struct({
  directoryServiceType: Schema.optional(Schema.String),
})).annotate({ identifier: "ValidateDirectoryServiceRequest" }) as any as Schema.Schema<ValidateDirectoryServiceRequest>;

export interface SwitchActiveReplicaZoneRequest {
}

export const SwitchActiveReplicaZoneRequest: Schema.Schema<SwitchActiveReplicaZoneRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SwitchActiveReplicaZoneRequest" }) as any as Schema.Schema<SwitchActiveReplicaZoneRequest>;

export interface SimpleExportPolicyRule {
  /** Comma separated list of allowed clients IP addresses */
  allowedClients?: string;
  /** Whether Unix root access will be granted. */
  hasRootAccess?: string;
  /** Access type (ReadWrite, ReadOnly, None) */
  accessType?: "ACCESS_TYPE_UNSPECIFIED" | "READ_ONLY" | "READ_WRITE" | "READ_NONE" | (string & {});
  /** NFS V3 protocol. */
  nfsv3?: boolean;
  /** NFS V4 protocol. */
  nfsv4?: boolean;
  /** If enabled (true) the rule defines a read only access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'authentication' kerberos security mode. */
  kerberos5ReadOnly?: boolean;
  /** If enabled (true) the rule defines read and write access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'authentication' kerberos security mode. The 'kerberos5ReadOnly' value be ignored if this is enabled. */
  kerberos5ReadWrite?: boolean;
  /** If enabled (true) the rule defines a read only access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'integrity' kerberos security mode. */
  kerberos5iReadOnly?: boolean;
  /** If enabled (true) the rule defines read and write access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'integrity' kerberos security mode. The 'kerberos5iReadOnly' value be ignored if this is enabled. */
  kerberos5iReadWrite?: boolean;
  /** If enabled (true) the rule defines a read only access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'privacy' kerberos security mode. */
  kerberos5pReadOnly?: boolean;
  /** If enabled (true) the rule defines read and write access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'privacy' kerberos security mode. The 'kerberos5pReadOnly' value be ignored if this is enabled. */
  kerberos5pReadWrite?: boolean;
  /** Optional. Defines how user identity squashing is applied for this export rule. This field is the preferred way to configure squashing behavior and takes precedence over `has_root_access` if both are provided. */
  squashMode?: "SQUASH_MODE_UNSPECIFIED" | "NO_ROOT_SQUASH" | "ROOT_SQUASH" | "ALL_SQUASH" | (string & {});
  /** Optional. An integer representing the anonymous user ID. Range is 0 to `4294967295`. Required when `squash_mode` is `ROOT_SQUASH` or `ALL_SQUASH`. */
  anonUid?: string;
}

export const SimpleExportPolicyRule: Schema.Schema<SimpleExportPolicyRule> = Schema.suspend(() => Schema.Struct({
  allowedClients: Schema.optional(Schema.String),
  hasRootAccess: Schema.optional(Schema.String),
  accessType: Schema.optional(Schema.String),
  nfsv3: Schema.optional(Schema.Boolean),
  nfsv4: Schema.optional(Schema.Boolean),
  kerberos5ReadOnly: Schema.optional(Schema.Boolean),
  kerberos5ReadWrite: Schema.optional(Schema.Boolean),
  kerberos5iReadOnly: Schema.optional(Schema.Boolean),
  kerberos5iReadWrite: Schema.optional(Schema.Boolean),
  kerberos5pReadOnly: Schema.optional(Schema.Boolean),
  kerberos5pReadWrite: Schema.optional(Schema.Boolean),
  squashMode: Schema.optional(Schema.String),
  anonUid: Schema.optional(Schema.String),
})).annotate({ identifier: "SimpleExportPolicyRule" }) as any as Schema.Schema<SimpleExportPolicyRule>;

export interface ExportPolicy {
  /** Required. List of export policy rules */
  rules?: Array<SimpleExportPolicyRule>;
}

export const ExportPolicy: Schema.Schema<ExportPolicy> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(SimpleExportPolicyRule)),
})).annotate({ identifier: "ExportPolicy" }) as any as Schema.Schema<ExportPolicy>;

export interface MountOption {
  /** Export string */
  export?: string;
  /** Full export string */
  exportFull?: string;
  /** Protocol to mount with. */
  protocol?: "PROTOCOLS_UNSPECIFIED" | "NFSV3" | "NFSV4" | "SMB" | "ISCSI" | (string & {});
  /** Instructions for mounting */
  instructions?: string;
  /** Output only. IP Address. */
  ipAddress?: string;
}

export const MountOption: Schema.Schema<MountOption> = Schema.suspend(() => Schema.Struct({
  export: Schema.optional(Schema.String),
  exportFull: Schema.optional(Schema.String),
  protocol: Schema.optional(Schema.String),
  instructions: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "MountOption" }) as any as Schema.Schema<MountOption>;

export interface HourlySchedule {
  /** The maximum number of Snapshots to keep for the hourly schedule */
  snapshotsToKeep?: number;
  /** Set the minute of the hour to start the snapshot (0-59), defaults to the top of the hour (0). */
  minute?: number;
}

export const HourlySchedule: Schema.Schema<HourlySchedule> = Schema.suspend(() => Schema.Struct({
  snapshotsToKeep: Schema.optional(Schema.Number),
  minute: Schema.optional(Schema.Number),
})).annotate({ identifier: "HourlySchedule" }) as any as Schema.Schema<HourlySchedule>;

export interface DailySchedule {
  /** The maximum number of Snapshots to keep for the hourly schedule */
  snapshotsToKeep?: number;
  /** Set the minute of the hour to start the snapshot (0-59), defaults to the top of the hour (0). */
  minute?: number;
  /** Set the hour to start the snapshot (0-23), defaults to midnight (0). */
  hour?: number;
}

export const DailySchedule: Schema.Schema<DailySchedule> = Schema.suspend(() => Schema.Struct({
  snapshotsToKeep: Schema.optional(Schema.Number),
  minute: Schema.optional(Schema.Number),
  hour: Schema.optional(Schema.Number),
})).annotate({ identifier: "DailySchedule" }) as any as Schema.Schema<DailySchedule>;

export interface WeeklySchedule {
  /** The maximum number of Snapshots to keep for the hourly schedule */
  snapshotsToKeep?: number;
  /** Set the minute of the hour to start the snapshot (0-59), defaults to the top of the hour (0). */
  minute?: number;
  /** Set the hour to start the snapshot (0-23), defaults to midnight (0). */
  hour?: number;
  /** Set the day or days of the week to make a snapshot. Accepts a comma separated days of the week. Defaults to 'Sunday'. */
  day?: string;
}

export const WeeklySchedule: Schema.Schema<WeeklySchedule> = Schema.suspend(() => Schema.Struct({
  snapshotsToKeep: Schema.optional(Schema.Number),
  minute: Schema.optional(Schema.Number),
  hour: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.String),
})).annotate({ identifier: "WeeklySchedule" }) as any as Schema.Schema<WeeklySchedule>;

export interface MonthlySchedule {
  /** The maximum number of Snapshots to keep for the hourly schedule */
  snapshotsToKeep?: number;
  /** Set the minute of the hour to start the snapshot (0-59), defaults to the top of the hour (0). */
  minute?: number;
  /** Set the hour to start the snapshot (0-23), defaults to midnight (0). */
  hour?: number;
  /** Set the day or days of the month to make a snapshot (1-31). Accepts a comma separated number of days. Defaults to '1'. */
  daysOfMonth?: string;
}

export const MonthlySchedule: Schema.Schema<MonthlySchedule> = Schema.suspend(() => Schema.Struct({
  snapshotsToKeep: Schema.optional(Schema.Number),
  minute: Schema.optional(Schema.Number),
  hour: Schema.optional(Schema.Number),
  daysOfMonth: Schema.optional(Schema.String),
})).annotate({ identifier: "MonthlySchedule" }) as any as Schema.Schema<MonthlySchedule>;

export interface SnapshotPolicy {
  /** If enabled, make snapshots automatically according to the schedules. Default is false. */
  enabled?: boolean;
  /** Hourly schedule policy. */
  hourlySchedule?: HourlySchedule;
  /** Daily schedule policy. */
  dailySchedule?: DailySchedule;
  /** Weekly schedule policy. */
  weeklySchedule?: WeeklySchedule;
  /** Monthly schedule policy. */
  monthlySchedule?: MonthlySchedule;
}

export const SnapshotPolicy: Schema.Schema<SnapshotPolicy> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  hourlySchedule: Schema.optional(HourlySchedule),
  dailySchedule: Schema.optional(DailySchedule),
  weeklySchedule: Schema.optional(WeeklySchedule),
  monthlySchedule: Schema.optional(MonthlySchedule),
})).annotate({ identifier: "SnapshotPolicy" }) as any as Schema.Schema<SnapshotPolicy>;

export interface RestoreParameters {
  /** Full name of the snapshot resource. Format: projects/{project}/locations/{location}/volumes/{volume}/snapshots/{snapshot} */
  sourceSnapshot?: string;
  /** Full name of the backup resource. Format: projects/{project}/locations/{location}/backupVaults/{backup_vault_id}/backups/{backup_id} */
  sourceBackup?: string;
}

export const RestoreParameters: Schema.Schema<RestoreParameters> = Schema.suspend(() => Schema.Struct({
  sourceSnapshot: Schema.optional(Schema.String),
  sourceBackup: Schema.optional(Schema.String),
})).annotate({ identifier: "RestoreParameters" }) as any as Schema.Schema<RestoreParameters>;

export interface BackupConfig {
  /** Optional. When specified, schedule backups will be created based on the policy configuration. */
  backupPolicies?: Array<string>;
  /** Optional. Name of backup vault. Format: projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id} */
  backupVault?: string;
  /** Optional. When set to true, scheduled backup is enabled on the volume. This field should be nil when there's no backup policy attached. */
  scheduledBackupEnabled?: boolean;
  /** Output only. Total size of all backups in a chain in bytes = baseline backup size + sum(incremental backup size). */
  backupChainBytes?: string;
}

export const BackupConfig: Schema.Schema<BackupConfig> = Schema.suspend(() => Schema.Struct({
  backupPolicies: Schema.optional(Schema.Array(Schema.String)),
  backupVault: Schema.optional(Schema.String),
  scheduledBackupEnabled: Schema.optional(Schema.Boolean),
  backupChainBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupConfig" }) as any as Schema.Schema<BackupConfig>;

export interface TieringPolicy {
  /** Optional. Flag indicating if the volume has tiering policy enable/pause. Default is PAUSED. */
  tierAction?: "TIER_ACTION_UNSPECIFIED" | "ENABLED" | "PAUSED" | (string & {});
  /** Optional. Time in days to mark the volume's data block as cold and make it eligible for tiering, can be range from 2-183. Default is 31. */
  coolingThresholdDays?: number;
  /** Optional. Flag indicating that the hot tier bypass mode is enabled. Default is false. This is only applicable to Flex service level. */
  hotTierBypassModeEnabled?: boolean;
}

export const TieringPolicy: Schema.Schema<TieringPolicy> = Schema.suspend(() => Schema.Struct({
  tierAction: Schema.optional(Schema.String),
  coolingThresholdDays: Schema.optional(Schema.Number),
  hotTierBypassModeEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "TieringPolicy" }) as any as Schema.Schema<TieringPolicy>;

export interface HybridReplicationParameters {
  /** Required. Desired name for the replication of this volume. */
  replication?: string;
  /** Required. Name of the user's local source volume to be peered with the destination volume. */
  peerVolumeName?: string;
  /** Required. Name of the user's local source cluster to be peered with the destination cluster. */
  peerClusterName?: string;
  /** Required. Name of the user's local source vserver svm to be peered with the destination vserver svm. */
  peerSvmName?: string;
  /** Required. List of node ip addresses to be peered with. */
  peerIpAddresses?: Array<string>;
  /** Optional. Name of source cluster location associated with the Hybrid replication. This is a free-form field for the display purpose only. */
  clusterLocation?: string;
  /** Optional. Description of the replication. */
  description?: string;
  /** Optional. Labels to be added to the replication as the key value pairs. */
  labels?: Record<string, string>;
  /** Optional. Replication Schedule for the replication created. */
  replicationSchedule?: "HYBRID_REPLICATION_SCHEDULE_UNSPECIFIED" | "EVERY_10_MINUTES" | "HOURLY" | "DAILY" | (string & {});
  /** Optional. Type of the hybrid replication. */
  hybridReplicationType?: "VOLUME_HYBRID_REPLICATION_TYPE_UNSPECIFIED" | "MIGRATION" | "CONTINUOUS_REPLICATION" | "ONPREM_REPLICATION" | "REVERSE_ONPREM_REPLICATION" | (string & {});
  /** Optional. Constituent volume count for large volume. */
  largeVolumeConstituentCount?: number;
}

export const HybridReplicationParameters: Schema.Schema<HybridReplicationParameters> = Schema.suspend(() => Schema.Struct({
  replication: Schema.optional(Schema.String),
  peerVolumeName: Schema.optional(Schema.String),
  peerClusterName: Schema.optional(Schema.String),
  peerSvmName: Schema.optional(Schema.String),
  peerIpAddresses: Schema.optional(Schema.Array(Schema.String)),
  clusterLocation: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  replicationSchedule: Schema.optional(Schema.String),
  hybridReplicationType: Schema.optional(Schema.String),
  largeVolumeConstituentCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "HybridReplicationParameters" }) as any as Schema.Schema<HybridReplicationParameters>;

export interface CachePrePopulate {
  /** Optional. List of directory-paths to be pre-populated for the FlexCache volume. */
  pathList?: Array<string>;
  /** Optional. List of directory-paths to be excluded for pre-population for the FlexCache volume. */
  excludePathList?: Array<string>;
  /** Optional. Flag indicating whether the directories listed with the `path_list` need to be recursively pre-populated. */
  recursion?: boolean;
}

export const CachePrePopulate: Schema.Schema<CachePrePopulate> = Schema.suspend(() => Schema.Struct({
  pathList: Schema.optional(Schema.Array(Schema.String)),
  excludePathList: Schema.optional(Schema.Array(Schema.String)),
  recursion: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CachePrePopulate" }) as any as Schema.Schema<CachePrePopulate>;

export interface CacheConfig {
  /** Optional. Pre-populate cache volume with data from the origin volume. */
  cachePrePopulate?: CachePrePopulate;
  /** Optional. Flag indicating whether writeback is enabled for the FlexCache volume. */
  writebackEnabled?: boolean;
  /** Optional. Flag indicating whether a CIFS change notification is enabled for the FlexCache volume. */
  cifsChangeNotifyEnabled?: boolean;
  /** Output only. State of the prepopulation job indicating how the prepopulation is progressing. */
  cachePrePopulateState?: "CACHE_PRE_POPULATE_STATE_UNSPECIFIED" | "NOT_NEEDED" | "IN_PROGRESS" | "COMPLETE" | "ERROR" | (string & {});
}

export const CacheConfig: Schema.Schema<CacheConfig> = Schema.suspend(() => Schema.Struct({
  cachePrePopulate: Schema.optional(CachePrePopulate),
  writebackEnabled: Schema.optional(Schema.Boolean),
  cifsChangeNotifyEnabled: Schema.optional(Schema.Boolean),
  cachePrePopulateState: Schema.optional(Schema.String),
})).annotate({ identifier: "CacheConfig" }) as any as Schema.Schema<CacheConfig>;

export interface CacheParameters {
  /** Required. Name of the origin volume for the cache volume. */
  peerVolumeName?: string;
  /** Required. Name of the origin volume's ONTAP cluster. */
  peerClusterName?: string;
  /** Required. Name of the origin volume's SVM. */
  peerSvmName?: string;
  /** Required. List of IC LIF addresses of the origin volume's ONTAP cluster. */
  peerIpAddresses?: Array<string>;
  /** Optional. Indicates whether the cache volume has global file lock enabled. */
  enableGlobalFileLock?: boolean;
  /** Optional. Configuration of the cache volume. */
  cacheConfig?: CacheConfig;
  /** Output only. State of the cache volume indicating the peering status. */
  cacheState?: "CACHE_STATE_UNSPECIFIED" | "PENDING_CLUSTER_PEERING" | "PENDING_SVM_PEERING" | "PEERED" | "ERROR" | (string & {});
  /** Output only. Copy-paste-able commands to be used on user's ONTAP to accept peering requests. */
  command?: string;
  /** Optional. Expiration time for the peering command to be executed on user's ONTAP. */
  peeringCommandExpiryTime?: string;
  /** Output only. Temporary passphrase generated to accept cluster peering command. */
  passphrase?: string;
  /** Output only. Detailed description of the current cache state. */
  stateDetails?: string;
}

export const CacheParameters: Schema.Schema<CacheParameters> = Schema.suspend(() => Schema.Struct({
  peerVolumeName: Schema.optional(Schema.String),
  peerClusterName: Schema.optional(Schema.String),
  peerSvmName: Schema.optional(Schema.String),
  peerIpAddresses: Schema.optional(Schema.Array(Schema.String)),
  enableGlobalFileLock: Schema.optional(Schema.Boolean),
  cacheConfig: Schema.optional(CacheConfig),
  cacheState: Schema.optional(Schema.String),
  command: Schema.optional(Schema.String),
  peeringCommandExpiryTime: Schema.optional(Schema.String),
  passphrase: Schema.optional(Schema.String),
  stateDetails: Schema.optional(Schema.String),
})).annotate({ identifier: "CacheParameters" }) as any as Schema.Schema<CacheParameters>;

export interface BlockDevice {
  /** Optional. User-defined name for the block device, unique within the volume. In case no user input is provided, name will be auto-generated in the backend. The name must meet the following requirements: * Be between 1 and 255 characters long. * Contain only uppercase or lowercase letters (A-Z, a-z), numbers (0-9), and the following special characters: "-", "_", "}", "{", ".". * Spaces are not allowed. */
  name?: string;
  /** Optional. A list of host groups that identify hosts that can mount the block volume. Format: `projects/{project_id}/locations/{location}/hostGroups/{host_group_id}` This field can be updated after the block device is created. */
  hostGroups?: Array<string>;
  /** Output only. Device identifier of the block volume. This represents `lun_serial_number` for iSCSI volumes. */
  identifier?: string;
  /** Optional. The size of the block device in GiB. Any value provided for the `size_gib` field during volume creation is ignored. The block device's size is system-managed and will be set to match the parent Volume's `capacity_gib`. */
  sizeGib?: string;
  /** Required. Immutable. The OS type of the volume. This field can't be changed after the block device is created. */
  osType?: "OS_TYPE_UNSPECIFIED" | "LINUX" | "WINDOWS" | "ESXI" | (string & {});
}

export const BlockDevice: Schema.Schema<BlockDevice> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  hostGroups: Schema.optional(Schema.Array(Schema.String)),
  identifier: Schema.optional(Schema.String),
  sizeGib: Schema.optional(Schema.String),
  osType: Schema.optional(Schema.String),
})).annotate({ identifier: "BlockDevice" }) as any as Schema.Schema<BlockDevice>;

export interface CloneDetails {
  /** Output only. Specifies the full resource name of the source snapshot from which this volume was cloned. Format: projects/{project}/locations/{location}/volumes/{volume}/snapshots/{snapshot} */
  sourceSnapshot?: string;
  /** Output only. Full name of the source volume resource. Format: projects/{project}/locations/{location}/volumes/{volume} */
  sourceVolume?: string;
  /** Output only. Shared space in GiB. Determined at volume creation time based on size of source snapshot. */
  sharedSpaceGib?: string;
}

export const CloneDetails: Schema.Schema<CloneDetails> = Schema.suspend(() => Schema.Struct({
  sourceSnapshot: Schema.optional(Schema.String),
  sourceVolume: Schema.optional(Schema.String),
  sharedSpaceGib: Schema.optional(Schema.String),
})).annotate({ identifier: "CloneDetails" }) as any as Schema.Schema<CloneDetails>;

export interface Volume {
  /** Identifier. Name of the volume */
  name?: string;
  /** Output only. State of the volume */
  state?: "STATE_UNSPECIFIED" | "READY" | "CREATING" | "DELETING" | "UPDATING" | "RESTORING" | "DISABLED" | "ERROR" | "PREPARING" | "READ_ONLY" | (string & {});
  /** Output only. State details of the volume */
  stateDetails?: string;
  /** Output only. Create time of the volume */
  createTime?: string;
  /** Required. Share name of the volume */
  shareName?: string;
  /** Output only. This field is not implemented. The values provided in this field are ignored. */
  psaRange?: string;
  /** Required. StoragePool name of the volume */
  storagePool?: string;
  /** Output only. VPC Network name. Format: projects/{project}/global/networks/{network} */
  network?: string;
  /** Output only. Service level of the volume */
  serviceLevel?: "SERVICE_LEVEL_UNSPECIFIED" | "PREMIUM" | "EXTREME" | "STANDARD" | "FLEX" | (string & {});
  /** Required. Capacity in GIB of the volume */
  capacityGib?: string;
  /** Optional. Export policy of the volume */
  exportPolicy?: ExportPolicy;
  /** Required. Protocols required for the volume */
  protocols?: Array<"PROTOCOLS_UNSPECIFIED" | "NFSV3" | "NFSV4" | "SMB" | "ISCSI" | (string & {})>;
  /** Optional. SMB share settings for the volume. */
  smbSettings?: Array<"SMB_SETTINGS_UNSPECIFIED" | "ENCRYPT_DATA" | "BROWSABLE" | "CHANGE_NOTIFY" | "NON_BROWSABLE" | "OPLOCKS" | "SHOW_SNAPSHOT" | "SHOW_PREVIOUS_VERSIONS" | "ACCESS_BASED_ENUMERATION" | "CONTINUOUSLY_AVAILABLE" | (string & {})>;
  /** Output only. Mount options of this volume */
  mountOptions?: Array<MountOption>;
  /** Optional. Default unix style permission (e.g. 777) the mount point will be created with. Applicable for NFS protocol types only. */
  unixPermissions?: string;
  /** Optional. Labels as key value pairs */
  labels?: Record<string, string>;
  /** Optional. Description of the volume */
  description?: string;
  /** Optional. SnapshotPolicy for a volume. */
  snapshotPolicy?: SnapshotPolicy;
  /** Optional. Snap_reserve specifies percentage of volume storage reserved for snapshot storage. Default is 0 percent. */
  snapReserve?: number;
  /** Optional. Snapshot_directory if enabled (true) the volume will contain a read-only .snapshot directory which provides access to each of the volume's snapshots. */
  snapshotDirectory?: boolean;
  /** Output only. Used capacity in GIB of the volume. This is computed periodically and it does not represent the realtime usage. */
  usedGib?: string;
  /** Optional. Security Style of the Volume */
  securityStyle?: "SECURITY_STYLE_UNSPECIFIED" | "NTFS" | "UNIX" | (string & {});
  /** Optional. Flag indicating if the volume is a kerberos volume or not, export policy rules control kerberos security modes (krb5, krb5i, krb5p). */
  kerberosEnabled?: boolean;
  /** Output only. Flag indicating if the volume is NFS LDAP enabled or not. */
  ldapEnabled?: boolean;
  /** Output only. Specifies the ActiveDirectory name of a SMB volume. */
  activeDirectory?: string;
  /** Optional. Specifies the source of the volume to be created from. */
  restoreParameters?: RestoreParameters;
  /** Output only. Specifies the KMS config to be used for volume encryption. */
  kmsConfig?: string;
  /** Output only. Specified the current volume encryption key source. */
  encryptionType?: "ENCRYPTION_TYPE_UNSPECIFIED" | "SERVICE_MANAGED" | "CLOUD_KMS" | (string & {});
  /** Output only. Indicates whether the volume is part of a replication relationship. */
  hasReplication?: boolean;
  /** BackupConfig of the volume. */
  backupConfig?: BackupConfig;
  /** Optional. List of actions that are restricted on this volume. */
  restrictedActions?: Array<"RESTRICTED_ACTION_UNSPECIFIED" | "DELETE" | (string & {})>;
  /** Optional. Flag indicating if the volume will be a large capacity volume or a regular volume. */
  largeCapacity?: boolean;
  /** Optional. Flag indicating if the volume will have an IP address per node for volumes supporting multiple IP endpoints. Only the volume with large_capacity will be allowed to have multiple endpoints. */
  multipleEndpoints?: boolean;
  /** Tiering policy for the volume. */
  tieringPolicy?: TieringPolicy;
  /** Output only. Specifies the replica zone for regional volume. */
  replicaZone?: string;
  /** Output only. Specifies the active zone for regional volume. */
  zone?: string;
  /** Output only. Size of the volume cold tier data rounded down to the nearest GiB. */
  coldTierSizeGib?: string;
  /** Optional. The Hybrid Replication parameters for the volume. */
  hybridReplicationParameters?: HybridReplicationParameters;
  /** Optional. Throughput of the volume (in MiB/s) */
  throughputMibps?: number;
  /** Optional. Cache parameters for the volume. */
  cacheParameters?: CacheParameters;
  /** Output only. Total hot tier data rounded down to the nearest GiB used by the Volume. This field is only used for flex Service Level */
  hotTierSizeUsedGib?: string;
  /** Optional. Block devices for the volume. Currently, only one block device is permitted per Volume. */
  blockDevices?: Array<BlockDevice>;
  /** Output only. If this volume is a clone, this field contains details about the clone. */
  cloneDetails?: CloneDetails;
}

export const Volume: Schema.Schema<Volume> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  stateDetails: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  shareName: Schema.optional(Schema.String),
  psaRange: Schema.optional(Schema.String),
  storagePool: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  serviceLevel: Schema.optional(Schema.String),
  capacityGib: Schema.optional(Schema.String),
  exportPolicy: Schema.optional(ExportPolicy),
  protocols: Schema.optional(Schema.Array(Schema.String)),
  smbSettings: Schema.optional(Schema.Array(Schema.String)),
  mountOptions: Schema.optional(Schema.Array(MountOption)),
  unixPermissions: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  snapshotPolicy: Schema.optional(SnapshotPolicy),
  snapReserve: Schema.optional(Schema.Number),
  snapshotDirectory: Schema.optional(Schema.Boolean),
  usedGib: Schema.optional(Schema.String),
  securityStyle: Schema.optional(Schema.String),
  kerberosEnabled: Schema.optional(Schema.Boolean),
  ldapEnabled: Schema.optional(Schema.Boolean),
  activeDirectory: Schema.optional(Schema.String),
  restoreParameters: Schema.optional(RestoreParameters),
  kmsConfig: Schema.optional(Schema.String),
  encryptionType: Schema.optional(Schema.String),
  hasReplication: Schema.optional(Schema.Boolean),
  backupConfig: Schema.optional(BackupConfig),
  restrictedActions: Schema.optional(Schema.Array(Schema.String)),
  largeCapacity: Schema.optional(Schema.Boolean),
  multipleEndpoints: Schema.optional(Schema.Boolean),
  tieringPolicy: Schema.optional(TieringPolicy),
  replicaZone: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  coldTierSizeGib: Schema.optional(Schema.String),
  hybridReplicationParameters: Schema.optional(HybridReplicationParameters),
  throughputMibps: Schema.optional(Schema.Number),
  cacheParameters: Schema.optional(CacheParameters),
  hotTierSizeUsedGib: Schema.optional(Schema.String),
  blockDevices: Schema.optional(Schema.Array(BlockDevice)),
  cloneDetails: Schema.optional(CloneDetails),
})).annotate({ identifier: "Volume" }) as any as Schema.Schema<Volume>;

export interface ListVolumesResponse {
  /** The list of Volume */
  volumes?: Array<Volume>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListVolumesResponse: Schema.Schema<ListVolumesResponse> = Schema.suspend(() => Schema.Struct({
  volumes: Schema.optional(Schema.Array(Volume)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListVolumesResponse" }) as any as Schema.Schema<ListVolumesResponse>;

export interface RevertVolumeRequest {
  /** Required. The snapshot resource ID, in the format 'my-snapshot', where the specified ID is the {snapshot_id} of the fully qualified name like projects/{project_id}/locations/{location_id}/volumes/{volume_id}/snapshots/{snapshot_id} */
  snapshotId?: string;
}

export const RevertVolumeRequest: Schema.Schema<RevertVolumeRequest> = Schema.suspend(() => Schema.Struct({
  snapshotId: Schema.optional(Schema.String),
})).annotate({ identifier: "RevertVolumeRequest" }) as any as Schema.Schema<RevertVolumeRequest>;

export interface EstablishVolumePeeringRequest {
  /** Required. Name of the user's local source cluster to be peered with the destination cluster. */
  peerClusterName?: string;
  /** Required. Name of the user's local source vserver svm to be peered with the destination vserver svm. */
  peerSvmName?: string;
  /** Optional. List of IPv4 ip addresses to be used for peering. */
  peerIpAddresses?: Array<string>;
  /** Required. Name of the user's local source volume to be peered with the destination volume. */
  peerVolumeName?: string;
}

export const EstablishVolumePeeringRequest: Schema.Schema<EstablishVolumePeeringRequest> = Schema.suspend(() => Schema.Struct({
  peerClusterName: Schema.optional(Schema.String),
  peerSvmName: Schema.optional(Schema.String),
  peerIpAddresses: Schema.optional(Schema.Array(Schema.String)),
  peerVolumeName: Schema.optional(Schema.String),
})).annotate({ identifier: "EstablishVolumePeeringRequest" }) as any as Schema.Schema<EstablishVolumePeeringRequest>;

export interface Snapshot {
  /** Identifier. The resource name of the snapshot. Format: `projects/{project_id}/locations/{location}/volumes/{volume_id}/snapshots/{snapshot_id}`. */
  name?: string;
  /** Output only. The snapshot state. */
  state?: "STATE_UNSPECIFIED" | "READY" | "CREATING" | "DELETING" | "UPDATING" | "DISABLED" | "ERROR" | (string & {});
  /** Output only. State details of the storage pool */
  stateDetails?: string;
  /** A description of the snapshot with 2048 characters or less. Requests with longer descriptions will be rejected. */
  description?: string;
  /** Output only. Current storage usage for the snapshot in bytes. */
  usedBytes?: number;
  /** Output only. The time when the snapshot was created. */
  createTime?: string;
  /** Resource labels to represent user provided metadata. */
  labels?: Record<string, string>;
}

export const Snapshot: Schema.Schema<Snapshot> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  stateDetails: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  usedBytes: Schema.optional(Schema.Number),
  createTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Snapshot" }) as any as Schema.Schema<Snapshot>;

export interface ListSnapshotsResponse {
  /** A list of snapshots in the project for the specified volume. */
  snapshots?: Array<Snapshot>;
  /** The token you can use to retrieve the next page of results. Not returned if there are no more results in the list. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListSnapshotsResponse: Schema.Schema<ListSnapshotsResponse> = Schema.suspend(() => Schema.Struct({
  snapshots: Schema.optional(Schema.Array(Snapshot)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListSnapshotsResponse" }) as any as Schema.Schema<ListSnapshotsResponse>;

export interface ActiveDirectory {
  /** Identifier. The resource name of the active directory. Format: `projects/{project_number}/locations/{location_id}/activeDirectories/{active_directory_id}`. */
  name?: string;
  /** Output only. Create time of the active directory. */
  createTime?: string;
  /** Output only. The state of the AD. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "UPDATING" | "IN_USE" | "DELETING" | "ERROR" | "DIAGNOSING" | (string & {});
  /** Required. Name of the Active Directory domain */
  domain?: string;
  /** The Active Directory site the service will limit Domain Controller discovery too. */
  site?: string;
  /** Required. Comma separated list of DNS server IP addresses for the Active Directory domain. */
  dns?: string;
  /** Required. NetBIOSPrefix is used as a prefix for SMB server name. */
  netBiosPrefix?: string;
  /** The Organizational Unit (OU) within the Windows Active Directory the user belongs to. */
  organizationalUnit?: string;
  /** If enabled, AES encryption will be enabled for SMB communication. */
  aesEncryption?: boolean;
  /** Required. Username of the Active Directory domain administrator. */
  username?: string;
  /** Required. Password of the Active Directory domain administrator. */
  password?: string;
  /** Optional. Users to be added to the Built-in Backup Operator active directory group. */
  backupOperators?: Array<string>;
  /** Optional. Users to be added to the Built-in Admininstrators group. */
  administrators?: Array<string>;
  /** Optional. Domain users to be given the SeSecurityPrivilege. */
  securityOperators?: Array<string>;
  /** Name of the active directory machine. This optional parameter is used only while creating kerberos volume */
  kdcHostname?: string;
  /** KDC server IP address for the active directory machine. */
  kdcIp?: string;
  /** If enabled, will allow access to local users and LDAP users. If access is needed for only LDAP users, it has to be disabled. */
  nfsUsersWithLdap?: boolean;
  /** Description of the active directory. */
  description?: string;
  /** Specifies whether or not the LDAP traffic needs to be signed. */
  ldapSigning?: boolean;
  /** If enabled, traffic between the SMB server to Domain Controller (DC) will be encrypted. */
  encryptDcConnections?: boolean;
  /** Labels for the active directory. */
  labels?: Record<string, string>;
  /** Output only. The state details of the Active Directory. */
  stateDetails?: string;
}

export const ActiveDirectory: Schema.Schema<ActiveDirectory> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
  site: Schema.optional(Schema.String),
  dns: Schema.optional(Schema.String),
  netBiosPrefix: Schema.optional(Schema.String),
  organizationalUnit: Schema.optional(Schema.String),
  aesEncryption: Schema.optional(Schema.Boolean),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  backupOperators: Schema.optional(Schema.Array(Schema.String)),
  administrators: Schema.optional(Schema.Array(Schema.String)),
  securityOperators: Schema.optional(Schema.Array(Schema.String)),
  kdcHostname: Schema.optional(Schema.String),
  kdcIp: Schema.optional(Schema.String),
  nfsUsersWithLdap: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
  ldapSigning: Schema.optional(Schema.Boolean),
  encryptDcConnections: Schema.optional(Schema.Boolean),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  stateDetails: Schema.optional(Schema.String),
})).annotate({ identifier: "ActiveDirectory" }) as any as Schema.Schema<ActiveDirectory>;

export interface ListActiveDirectoriesResponse {
  /** The list of active directories. */
  activeDirectories?: Array<ActiveDirectory>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListActiveDirectoriesResponse: Schema.Schema<ListActiveDirectoriesResponse> = Schema.suspend(() => Schema.Struct({
  activeDirectories: Schema.optional(Schema.Array(ActiveDirectory)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListActiveDirectoriesResponse" }) as any as Schema.Schema<ListActiveDirectoriesResponse>;

export interface KmsConfig {
  /** Identifier. Name of the KmsConfig. Format: `projects/{project}/locations/{location}/kmsConfigs/{kms_config}` */
  name?: string;
  /** Required. Customer-managed crypto key resource full name. Format: `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}` */
  cryptoKeyName?: string;
  /** Output only. State of the KmsConfig. */
  state?: "STATE_UNSPECIFIED" | "READY" | "CREATING" | "DELETING" | "UPDATING" | "IN_USE" | "ERROR" | "KEY_CHECK_PENDING" | "KEY_NOT_REACHABLE" | "DISABLING" | "DISABLED" | "MIGRATING" | (string & {});
  /** Output only. State details of the KmsConfig. */
  stateDetails?: string;
  /** Output only. Create time of the KmsConfig. */
  createTime?: string;
  /** Description of the KmsConfig. */
  description?: string;
  /** Labels as key value pairs */
  labels?: Record<string, string>;
  /** Output only. Instructions to provide the access to the customer provided encryption key. */
  instructions?: string;
  /** Output only. The Service account which will have access to the customer provided encryption key. */
  serviceAccount?: string;
}

export const KmsConfig: Schema.Schema<KmsConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  cryptoKeyName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  stateDetails: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  instructions: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "KmsConfig" }) as any as Schema.Schema<KmsConfig>;

export interface ListKmsConfigsResponse {
  /** The list of KmsConfigs */
  kmsConfigs?: Array<KmsConfig>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListKmsConfigsResponse: Schema.Schema<ListKmsConfigsResponse> = Schema.suspend(() => Schema.Struct({
  kmsConfigs: Schema.optional(Schema.Array(KmsConfig)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListKmsConfigsResponse" }) as any as Schema.Schema<ListKmsConfigsResponse>;

export interface EncryptVolumesRequest {
}

export const EncryptVolumesRequest: Schema.Schema<EncryptVolumesRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "EncryptVolumesRequest" }) as any as Schema.Schema<EncryptVolumesRequest>;

export interface VerifyKmsConfigRequest {
}

export const VerifyKmsConfigRequest: Schema.Schema<VerifyKmsConfigRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "VerifyKmsConfigRequest" }) as any as Schema.Schema<VerifyKmsConfigRequest>;

export interface VerifyKmsConfigResponse {
  /** Output only. If the customer key configured correctly to the encrypt volume. */
  healthy?: boolean;
  /** Output only. Error message if config is not healthy. */
  healthError?: string;
  /** Output only. Instructions for the customers to provide the access to the encryption key. */
  instructions?: string;
}

export const VerifyKmsConfigResponse: Schema.Schema<VerifyKmsConfigResponse> = Schema.suspend(() => Schema.Struct({
  healthy: Schema.optional(Schema.Boolean),
  healthError: Schema.optional(Schema.String),
  instructions: Schema.optional(Schema.String),
})).annotate({ identifier: "VerifyKmsConfigResponse" }) as any as Schema.Schema<VerifyKmsConfigResponse>;

export interface TransferStats {
  /** Cumulative bytes transferred so far for the replication relationship. */
  transferBytes?: string;
  /** Cumulative time taken across all transfers for the replication relationship. */
  totalTransferDuration?: string;
  /** Last transfer size in bytes. */
  lastTransferBytes?: string;
  /** Time taken during last transfer. */
  lastTransferDuration?: string;
  /** Lag duration indicates the duration by which Destination region volume content lags behind the primary region volume content. */
  lagDuration?: string;
  /** Time when progress was updated last. */
  updateTime?: string;
  /** Time when last transfer completed. */
  lastTransferEndTime?: string;
  /** A message describing the cause of the last transfer failure. */
  lastTransferError?: string;
}

export const TransferStats: Schema.Schema<TransferStats> = Schema.suspend(() => Schema.Struct({
  transferBytes: Schema.optional(Schema.String),
  totalTransferDuration: Schema.optional(Schema.String),
  lastTransferBytes: Schema.optional(Schema.String),
  lastTransferDuration: Schema.optional(Schema.String),
  lagDuration: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  lastTransferEndTime: Schema.optional(Schema.String),
  lastTransferError: Schema.optional(Schema.String),
})).annotate({ identifier: "TransferStats" }) as any as Schema.Schema<TransferStats>;

export interface DestinationVolumeParameters {
  /** Required. Existing destination StoragePool name. */
  storagePool?: string;
  /** Desired destination volume resource id. If not specified, source volume's resource id will be used. This value must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a hyphen. */
  volumeId?: string;
  /** Destination volume's share name. If not specified, source volume's share name will be used. */
  shareName?: string;
  /** Description for the destination volume. */
  description?: string;
  /** Optional. Tiering policy for the volume. */
  tieringPolicy?: TieringPolicy;
}

export const DestinationVolumeParameters: Schema.Schema<DestinationVolumeParameters> = Schema.suspend(() => Schema.Struct({
  storagePool: Schema.optional(Schema.String),
  volumeId: Schema.optional(Schema.String),
  shareName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  tieringPolicy: Schema.optional(TieringPolicy),
})).annotate({ identifier: "DestinationVolumeParameters" }) as any as Schema.Schema<DestinationVolumeParameters>;

export interface HybridPeeringDetails {
  /** Output only. IP address of the subnet. */
  subnetIp?: string;
  /** Output only. Copy-paste-able commands to be used on user's ONTAP to accept peering requests. */
  command?: string;
  /** Output only. Expiration time for the peering command to be executed on user's ONTAP. */
  commandExpiryTime?: string;
  /** Output only. Temporary passphrase generated to accept cluster peering command. */
  passphrase?: string;
  /** Output only. Name of the user's local source volume to be peered with the destination volume. */
  peerVolumeName?: string;
  /** Output only. Name of the user's local source cluster to be peered with the destination cluster. */
  peerClusterName?: string;
  /** Output only. Name of the user's local source vserver svm to be peered with the destination vserver svm. */
  peerSvmName?: string;
}

export const HybridPeeringDetails: Schema.Schema<HybridPeeringDetails> = Schema.suspend(() => Schema.Struct({
  subnetIp: Schema.optional(Schema.String),
  command: Schema.optional(Schema.String),
  commandExpiryTime: Schema.optional(Schema.String),
  passphrase: Schema.optional(Schema.String),
  peerVolumeName: Schema.optional(Schema.String),
  peerClusterName: Schema.optional(Schema.String),
  peerSvmName: Schema.optional(Schema.String),
})).annotate({ identifier: "HybridPeeringDetails" }) as any as Schema.Schema<HybridPeeringDetails>;

export interface UserCommands {
  /** Output only. List of commands to be executed by the customer. */
  commands?: Array<string>;
}

export const UserCommands: Schema.Schema<UserCommands> = Schema.suspend(() => Schema.Struct({
  commands: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "UserCommands" }) as any as Schema.Schema<UserCommands>;

export interface Replication {
  /** Identifier. The resource name of the Replication. Format: `projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}`. */
  name?: string;
  /** Output only. State of the replication. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "UPDATING" | "DELETING" | "ERROR" | "PENDING_CLUSTER_PEERING" | "PENDING_SVM_PEERING" | "PENDING_REMOTE_RESYNC" | "EXTERNALLY_MANAGED_REPLICATION" | (string & {});
  /** Output only. State details of the replication. */
  stateDetails?: string;
  /** Output only. Indicates whether this points to source or destination. */
  role?: "REPLICATION_ROLE_UNSPECIFIED" | "SOURCE" | "DESTINATION" | (string & {});
  /** Required. Indicates the schedule for replication. */
  replicationSchedule?: "REPLICATION_SCHEDULE_UNSPECIFIED" | "EVERY_10_MINUTES" | "HOURLY" | "DAILY" | (string & {});
  /** Output only. Indicates the state of mirroring. */
  mirrorState?: "MIRROR_STATE_UNSPECIFIED" | "PREPARING" | "MIRRORED" | "STOPPED" | "TRANSFERRING" | "BASELINE_TRANSFERRING" | "ABORTED" | "EXTERNALLY_MANAGED" | "PENDING_PEERING" | (string & {});
  /** Output only. Condition of the relationship. Can be one of the following: - true: The replication relationship is healthy. It has not missed the most recent scheduled transfer. - false: The replication relationship is not healthy. It has missed the most recent scheduled transfer. */
  healthy?: boolean;
  /** Output only. Replication create time. */
  createTime?: string;
  /** Output only. Full name of destination volume resource. Example : "projects/{project}/locations/{location}/volumes/{volume_id}" */
  destinationVolume?: string;
  /** Output only. Replication transfer statistics. */
  transferStats?: TransferStats;
  /** Resource labels to represent user provided metadata. */
  labels?: Record<string, string>;
  /** A description about this replication relationship. */
  description?: string;
  /** Required. Input only. Destination volume parameters */
  destinationVolumeParameters?: DestinationVolumeParameters;
  /** Output only. Full name of source volume resource. Example : "projects/{project}/locations/{location}/volumes/{volume_id}" */
  sourceVolume?: string;
  /** Output only. Hybrid peering details. */
  hybridPeeringDetails?: HybridPeeringDetails;
  /** Optional. Location of the user cluster. */
  clusterLocation?: string;
  /** Output only. Type of the hybrid replication. */
  hybridReplicationType?: "HYBRID_REPLICATION_TYPE_UNSPECIFIED" | "MIGRATION" | "CONTINUOUS_REPLICATION" | "ONPREM_REPLICATION" | "REVERSE_ONPREM_REPLICATION" | (string & {});
  /** Output only. Copy pastable snapmirror commands to be executed on onprem cluster by the customer. */
  hybridReplicationUserCommands?: UserCommands;
}

export const Replication: Schema.Schema<Replication> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  stateDetails: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  replicationSchedule: Schema.optional(Schema.String),
  mirrorState: Schema.optional(Schema.String),
  healthy: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  destinationVolume: Schema.optional(Schema.String),
  transferStats: Schema.optional(TransferStats),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  destinationVolumeParameters: Schema.optional(DestinationVolumeParameters),
  sourceVolume: Schema.optional(Schema.String),
  hybridPeeringDetails: Schema.optional(HybridPeeringDetails),
  clusterLocation: Schema.optional(Schema.String),
  hybridReplicationType: Schema.optional(Schema.String),
  hybridReplicationUserCommands: Schema.optional(UserCommands),
})).annotate({ identifier: "Replication" }) as any as Schema.Schema<Replication>;

export interface ListReplicationsResponse {
  /** A list of replications in the project for the specified volume. */
  replications?: Array<Replication>;
  /** The token you can use to retrieve the next page of results. Not returned if there are no more results in the list. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListReplicationsResponse: Schema.Schema<ListReplicationsResponse> = Schema.suspend(() => Schema.Struct({
  replications: Schema.optional(Schema.Array(Replication)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListReplicationsResponse" }) as any as Schema.Schema<ListReplicationsResponse>;

export interface StopReplicationRequest {
  /** Indicates whether to stop replication forcefully while data transfer is in progress. Warning! if force is true, this will abort any current transfers and can lead to data loss due to partial transfer. If force is false, stop replication will fail while data transfer is in progress and you will need to retry later. */
  force?: boolean;
}

export const StopReplicationRequest: Schema.Schema<StopReplicationRequest> = Schema.suspend(() => Schema.Struct({
  force: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "StopReplicationRequest" }) as any as Schema.Schema<StopReplicationRequest>;

export interface ResumeReplicationRequest {
}

export const ResumeReplicationRequest: Schema.Schema<ResumeReplicationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResumeReplicationRequest" }) as any as Schema.Schema<ResumeReplicationRequest>;

export interface ReverseReplicationDirectionRequest {
}

export const ReverseReplicationDirectionRequest: Schema.Schema<ReverseReplicationDirectionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ReverseReplicationDirectionRequest" }) as any as Schema.Schema<ReverseReplicationDirectionRequest>;

export interface EstablishPeeringRequest {
  /** Required. Name of the user's local source cluster to be peered with the destination cluster. */
  peerClusterName?: string;
  /** Required. Name of the user's local source vserver svm to be peered with the destination vserver svm. */
  peerSvmName?: string;
  /** Optional. List of IPv4 ip addresses to be used for peering. */
  peerIpAddresses?: Array<string>;
  /** Required. Name of the user's local source volume to be peered with the destination volume. */
  peerVolumeName?: string;
}

export const EstablishPeeringRequest: Schema.Schema<EstablishPeeringRequest> = Schema.suspend(() => Schema.Struct({
  peerClusterName: Schema.optional(Schema.String),
  peerSvmName: Schema.optional(Schema.String),
  peerIpAddresses: Schema.optional(Schema.Array(Schema.String)),
  peerVolumeName: Schema.optional(Schema.String),
})).annotate({ identifier: "EstablishPeeringRequest" }) as any as Schema.Schema<EstablishPeeringRequest>;

export interface SyncReplicationRequest {
}

export const SyncReplicationRequest: Schema.Schema<SyncReplicationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SyncReplicationRequest" }) as any as Schema.Schema<SyncReplicationRequest>;

export interface BackupRetentionPolicy {
  /** Required. Minimum retention duration in days for backups in the backup vault. */
  backupMinimumEnforcedRetentionDays?: number;
  /** Optional. Indicates if the daily backups are immutable. At least one of daily_backup_immutable, weekly_backup_immutable, monthly_backup_immutable and manual_backup_immutable must be true. */
  dailyBackupImmutable?: boolean;
  /** Optional. Indicates if the weekly backups are immutable. At least one of daily_backup_immutable, weekly_backup_immutable, monthly_backup_immutable and manual_backup_immutable must be true. */
  weeklyBackupImmutable?: boolean;
  /** Optional. Indicates if the monthly backups are immutable. At least one of daily_backup_immutable, weekly_backup_immutable, monthly_backup_immutable and manual_backup_immutable must be true. */
  monthlyBackupImmutable?: boolean;
  /** Optional. Indicates if the manual backups are immutable. At least one of daily_backup_immutable, weekly_backup_immutable, monthly_backup_immutable and manual_backup_immutable must be true. */
  manualBackupImmutable?: boolean;
}

export const BackupRetentionPolicy: Schema.Schema<BackupRetentionPolicy> = Schema.suspend(() => Schema.Struct({
  backupMinimumEnforcedRetentionDays: Schema.optional(Schema.Number),
  dailyBackupImmutable: Schema.optional(Schema.Boolean),
  weeklyBackupImmutable: Schema.optional(Schema.Boolean),
  monthlyBackupImmutable: Schema.optional(Schema.Boolean),
  manualBackupImmutable: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "BackupRetentionPolicy" }) as any as Schema.Schema<BackupRetentionPolicy>;

export interface BackupVault {
  /** Identifier. The resource name of the backup vault. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}`. */
  name?: string;
  /** Output only. The backup vault state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "DELETING" | "ERROR" | "UPDATING" | (string & {});
  /** Output only. Create time of the backup vault. */
  createTime?: string;
  /** Description of the backup vault. */
  description?: string;
  /** Resource labels to represent user provided metadata. */
  labels?: Record<string, string>;
  /** Optional. Type of backup vault to be created. Default is IN_REGION. */
  backupVaultType?: "BACKUP_VAULT_TYPE_UNSPECIFIED" | "IN_REGION" | "CROSS_REGION" | (string & {});
  /** Output only. Region in which the backup vault is created. Format: `projects/{project_id}/locations/{location}` */
  sourceRegion?: string;
  /** Optional. Region where the backups are stored. Format: `projects/{project_id}/locations/{location}` */
  backupRegion?: string;
  /** Output only. Name of the Backup vault created in source region. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}` */
  sourceBackupVault?: string;
  /** Output only. Name of the Backup vault created in backup region. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}` */
  destinationBackupVault?: string;
  /** Optional. Backup retention policy defining the retention of backups. */
  backupRetentionPolicy?: BackupRetentionPolicy;
  /** Optional. Specifies the Key Management System (KMS) configuration to be used for backup encryption. Format: `projects/{project}/locations/{location}/kmsConfigs/{kms_config}` */
  kmsConfig?: string;
  /** Output only. Field indicating encryption state of CMEK backups. */
  encryptionState?: "ENCRYPTION_STATE_UNSPECIFIED" | "ENCRYPTION_STATE_PENDING" | "ENCRYPTION_STATE_COMPLETED" | "ENCRYPTION_STATE_IN_PROGRESS" | "ENCRYPTION_STATE_FAILED" | (string & {});
  /** Output only. The crypto key version used to encrypt the backup vault. Format: `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}/cryptoKeyVersions/{crypto_key_version}` */
  backupsCryptoKeyVersion?: string;
}

export const BackupVault: Schema.Schema<BackupVault> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  backupVaultType: Schema.optional(Schema.String),
  sourceRegion: Schema.optional(Schema.String),
  backupRegion: Schema.optional(Schema.String),
  sourceBackupVault: Schema.optional(Schema.String),
  destinationBackupVault: Schema.optional(Schema.String),
  backupRetentionPolicy: Schema.optional(BackupRetentionPolicy),
  kmsConfig: Schema.optional(Schema.String),
  encryptionState: Schema.optional(Schema.String),
  backupsCryptoKeyVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupVault" }) as any as Schema.Schema<BackupVault>;

export interface ListBackupVaultsResponse {
  /** A list of backupVaults in the project for the specified location. */
  backupVaults?: Array<BackupVault>;
  /** The token you can use to retrieve the next page of results. Not returned if there are no more results in the list. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackupVaultsResponse: Schema.Schema<ListBackupVaultsResponse> = Schema.suspend(() => Schema.Struct({
  backupVaults: Schema.optional(Schema.Array(BackupVault)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBackupVaultsResponse" }) as any as Schema.Schema<ListBackupVaultsResponse>;

export interface Backup {
  /** Identifier. The resource name of the backup. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}/backups/{backup_id}`. */
  name?: string;
  /** Output only. The backup state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "UPLOADING" | "READY" | "DELETING" | "ERROR" | "UPDATING" | (string & {});
  /** A description of the backup with 2048 characters or less. Requests with longer descriptions will be rejected. */
  description?: string;
  /** Output only. Size of the file system when the backup was created. When creating a new volume from the backup, the volume capacity will have to be at least as big. */
  volumeUsageBytes?: string;
  /** Output only. Type of backup, manually created or created by a backup policy. */
  backupType?: "TYPE_UNSPECIFIED" | "MANUAL" | "SCHEDULED" | (string & {});
  /** Volume full name of this backup belongs to. Format: `projects/{projects_id}/locations/{location}/volumes/{volume_id}` */
  sourceVolume?: string;
  /** If specified, backup will be created from the given snapshot. If not specified, there will be a new snapshot taken to initiate the backup creation. Format: `projects/{project_id}/locations/{location}/volumes/{volume_id}/snapshots/{snapshot_id}` */
  sourceSnapshot?: string;
  /** Output only. The time when the backup was created. */
  createTime?: string;
  /** Resource labels to represent user provided metadata. */
  labels?: Record<string, string>;
  /** Output only. Total size of all backups in a chain in bytes = baseline backup size + sum(incremental backup size) */
  chainStorageBytes?: string;
  /** Output only. Reserved for future use */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use */
  satisfiesPzi?: boolean;
  /** Output only. Region of the volume from which the backup was created. Format: `projects/{project_id}/locations/{location}` */
  volumeRegion?: string;
  /** Output only. Region in which backup is stored. Format: `projects/{project_id}/locations/{location}` */
  backupRegion?: string;
  /** Output only. The time until which the backup is not deletable. */
  enforcedRetentionEndTime?: string;
}

export const Backup: Schema.Schema<Backup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  volumeUsageBytes: Schema.optional(Schema.String),
  backupType: Schema.optional(Schema.String),
  sourceVolume: Schema.optional(Schema.String),
  sourceSnapshot: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  chainStorageBytes: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  volumeRegion: Schema.optional(Schema.String),
  backupRegion: Schema.optional(Schema.String),
  enforcedRetentionEndTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Backup" }) as any as Schema.Schema<Backup>;

export interface ListBackupsResponse {
  /** A list of backups in the project. */
  backups?: Array<Backup>;
  /** The token you can use to retrieve the next page of results. Not returned if there are no more results in the list. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackupsResponse: Schema.Schema<ListBackupsResponse> = Schema.suspend(() => Schema.Struct({
  backups: Schema.optional(Schema.Array(Backup)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBackupsResponse" }) as any as Schema.Schema<ListBackupsResponse>;

export interface BackupPolicy {
  /** Identifier. The resource name of the backup policy. Format: `projects/{project_id}/locations/{location}/backupPolicies/{backup_policy_id}`. */
  name?: string;
  /** Number of daily backups to keep. Note that the minimum daily backup limit is 2. */
  dailyBackupLimit?: number;
  /** Number of weekly backups to keep. Note that the sum of daily, weekly and monthly backups should be greater than 1. */
  weeklyBackupLimit?: number;
  /** Number of monthly backups to keep. Note that the sum of daily, weekly and monthly backups should be greater than 1. */
  monthlyBackupLimit?: number;
  /** Description of the backup policy. */
  description?: string;
  /** If enabled, make backups automatically according to the schedules. This will be applied to all volumes that have this policy attached and enforced on volume level. If not specified, default is true. */
  enabled?: boolean;
  /** Output only. The total number of volumes assigned by this backup policy. */
  assignedVolumeCount?: number;
  /** Output only. The time when the backup policy was created. */
  createTime?: string;
  /** Resource labels to represent user provided metadata. */
  labels?: Record<string, string>;
  /** Output only. The backup policy state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "DELETING" | "ERROR" | "UPDATING" | (string & {});
}

export const BackupPolicy: Schema.Schema<BackupPolicy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  dailyBackupLimit: Schema.optional(Schema.Number),
  weeklyBackupLimit: Schema.optional(Schema.Number),
  monthlyBackupLimit: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  assignedVolumeCount: Schema.optional(Schema.Number),
  createTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupPolicy" }) as any as Schema.Schema<BackupPolicy>;

export interface ListBackupPoliciesResponse {
  /** The list of backup policies. */
  backupPolicies?: Array<BackupPolicy>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackupPoliciesResponse: Schema.Schema<ListBackupPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  backupPolicies: Schema.optional(Schema.Array(BackupPolicy)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBackupPoliciesResponse" }) as any as Schema.Schema<ListBackupPoliciesResponse>;

export interface QuotaRule {
  /** Identifier. The resource name of the quota rule. Format: `projects/{project_number}/locations/{location_id}/volumes/volumes/{volume_id}/quotaRules/{quota_rule_id}`. */
  name?: string;
  /** Optional. The quota rule applies to the specified user or group, identified by a Unix UID/GID, Windows SID, or null for default. */
  target?: string;
  /** Required. The type of quota rule. */
  type?: "TYPE_UNSPECIFIED" | "INDIVIDUAL_USER_QUOTA" | "INDIVIDUAL_GROUP_QUOTA" | "DEFAULT_USER_QUOTA" | "DEFAULT_GROUP_QUOTA" | (string & {});
  /** Required. The maximum allowed disk space in MiB. */
  diskLimitMib?: number;
  /** Output only. State of the quota rule */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "UPDATING" | "DELETING" | "READY" | "ERROR" | (string & {});
  /** Output only. State details of the quota rule */
  stateDetails?: string;
  /** Output only. Create time of the quota rule */
  createTime?: string;
  /** Optional. Description of the quota rule */
  description?: string;
  /** Optional. Labels of the quota rule */
  labels?: Record<string, string>;
}

export const QuotaRule: Schema.Schema<QuotaRule> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  diskLimitMib: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.String),
  stateDetails: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "QuotaRule" }) as any as Schema.Schema<QuotaRule>;

export interface ListQuotaRulesResponse {
  /** List of quota rules */
  quotaRules?: Array<QuotaRule>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListQuotaRulesResponse: Schema.Schema<ListQuotaRulesResponse> = Schema.suspend(() => Schema.Struct({
  quotaRules: Schema.optional(Schema.Array(QuotaRule)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListQuotaRulesResponse" }) as any as Schema.Schema<ListQuotaRulesResponse>;

export interface RestoreBackupFilesRequest {
  /** Required. The backup resource name, in the format `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}/backups/{backup_id}` */
  backup?: string;
  /** Required. List of files to be restored, specified by their absolute path in the source volume. */
  fileList?: Array<string>;
  /** Optional. Absolute directory path in the destination volume. This is required if the `file_list` is provided. */
  restoreDestinationPath?: string;
}

export const RestoreBackupFilesRequest: Schema.Schema<RestoreBackupFilesRequest> = Schema.suspend(() => Schema.Struct({
  backup: Schema.optional(Schema.String),
  fileList: Schema.optional(Schema.Array(Schema.String)),
  restoreDestinationPath: Schema.optional(Schema.String),
})).annotate({ identifier: "RestoreBackupFilesRequest" }) as any as Schema.Schema<RestoreBackupFilesRequest>;

export interface HostGroup {
  /** Identifier. The resource name of the host group. Format: `projects/{project_number}/locations/{location_id}/hostGroups/{host_group_id}`. */
  name?: string;
  /** Required. Type of the host group. */
  type?: "TYPE_UNSPECIFIED" | "ISCSI_INITIATOR" | (string & {});
  /** Output only. State of the host group. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "UPDATING" | "DELETING" | "DISABLED" | (string & {});
  /** Output only. Create time of the host group. */
  createTime?: string;
  /** Required. The list of hosts associated with the host group. */
  hosts?: Array<string>;
  /** Required. The OS type of the host group. It indicates the type of operating system used by all of the hosts in the HostGroup. All hosts in a HostGroup must be of the same OS type. This can be set only when creating a HostGroup. */
  osType?: "OS_TYPE_UNSPECIFIED" | "LINUX" | "WINDOWS" | "ESXI" | (string & {});
  /** Optional. Description of the host group. */
  description?: string;
  /** Optional. Labels of the host group. */
  labels?: Record<string, string>;
}

export const HostGroup: Schema.Schema<HostGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  hosts: Schema.optional(Schema.Array(Schema.String)),
  osType: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "HostGroup" }) as any as Schema.Schema<HostGroup>;

export interface ListHostGroupsResponse {
  /** The list of host groups. */
  hostGroups?: Array<HostGroup>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListHostGroupsResponse: Schema.Schema<ListHostGroupsResponse> = Schema.suspend(() => Schema.Struct({
  hostGroups: Schema.optional(Schema.Array(HostGroup)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListHostGroupsResponse" }) as any as Schema.Schema<ListHostGroupsResponse>;

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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been canceled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
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

export interface LocationMetadata {
  /** Output only. Supported service levels in a location. */
  supportedServiceLevels?: Array<"SERVICE_LEVEL_UNSPECIFIED" | "PREMIUM" | "EXTREME" | "STANDARD" | "FLEX" | (string & {})>;
  /** Output only. Supported flex performance in a location. */
  supportedFlexPerformance?: Array<"FLEX_PERFORMANCE_UNSPECIFIED" | "FLEX_PERFORMANCE_DEFAULT" | "FLEX_PERFORMANCE_CUSTOM" | (string & {})>;
  /** Output only. Indicates if the location has VCP support. */
  hasVcp?: boolean;
  /** Output only. Indicates if the location has ONTAP Proxy support. */
  hasOntapProxy?: boolean;
}

export const LocationMetadata: Schema.Schema<LocationMetadata> = Schema.suspend(() => Schema.Struct({
  supportedServiceLevels: Schema.optional(Schema.Array(Schema.String)),
  supportedFlexPerformance: Schema.optional(Schema.Array(Schema.String)),
  hasVcp: Schema.optional(Schema.Boolean),
  hasOntapProxy: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "LocationMetadata" }) as any as Schema.Schema<LocationMetadata>;

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

/** Returns descriptions of all storage pools owned by the caller. */
export interface ListProjectsLocationsStoragePoolsRequest {
  /** Required. Parent value */
  parent: string;
  /** Optional. The maximum number of items to return. */
  pageSize?: number;
  /** Optional. The next_page_token value to use if there are additional results to retrieve for this list request. */
  pageToken?: string;
  /** Optional. Sort results. Supported values are "name", "name desc" or "" (unsorted). */
  orderBy?: string;
  /** Optional. List filter. */
  filter?: string;
}

export const ListProjectsLocationsStoragePoolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/storagePools" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsStoragePoolsRequest>;

export type ListProjectsLocationsStoragePoolsResponse = ListStoragePoolsResponse;
export const ListProjectsLocationsStoragePoolsResponse = ListStoragePoolsResponse;

export type ListProjectsLocationsStoragePoolsError = CommonErrors;

export const listProjectsLocationsStoragePools = API.makePaginated(() => ({
  input: ListProjectsLocationsStoragePoolsRequest,
  output: ListProjectsLocationsStoragePoolsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new storage pool. */
export interface CreateProjectsLocationsStoragePoolsRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. Id of the requesting storage pool. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. */
  storagePoolId?: string;
  /** Request body */
  body?: StoragePool;
}

export const CreateProjectsLocationsStoragePoolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  storagePoolId: Schema.optional(Schema.String).pipe(T.HttpQuery("storagePoolId")),
  body: Schema.optional(StoragePool).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/storagePools", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsStoragePoolsRequest>;

export type CreateProjectsLocationsStoragePoolsResponse = Operation;
export const CreateProjectsLocationsStoragePoolsResponse = Operation;

export type CreateProjectsLocationsStoragePoolsError = CommonErrors;

export const createProjectsLocationsStoragePools: API.OperationMethod<CreateProjectsLocationsStoragePoolsRequest, CreateProjectsLocationsStoragePoolsResponse, CreateProjectsLocationsStoragePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsStoragePoolsRequest,
  output: CreateProjectsLocationsStoragePoolsResponse,
  errors: [],
}));

/** Returns the description of the specified storage pool by poolId. */
export interface GetProjectsLocationsStoragePoolsRequest {
  /** Required. Name of the storage pool */
  name: string;
}

export const GetProjectsLocationsStoragePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/storagePools/{storagePoolsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsStoragePoolsRequest>;

export type GetProjectsLocationsStoragePoolsResponse = StoragePool;
export const GetProjectsLocationsStoragePoolsResponse = StoragePool;

export type GetProjectsLocationsStoragePoolsError = CommonErrors;

export const getProjectsLocationsStoragePools: API.OperationMethod<GetProjectsLocationsStoragePoolsRequest, GetProjectsLocationsStoragePoolsResponse, GetProjectsLocationsStoragePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsStoragePoolsRequest,
  output: GetProjectsLocationsStoragePoolsResponse,
  errors: [],
}));

/** Updates the storage pool properties with the full spec */
export interface PatchProjectsLocationsStoragePoolsRequest {
  /** Identifier. Name of the storage pool */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the StoragePool resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: StoragePool;
}

export const PatchProjectsLocationsStoragePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(StoragePool).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/storagePools/{storagePoolsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsStoragePoolsRequest>;

export type PatchProjectsLocationsStoragePoolsResponse = Operation;
export const PatchProjectsLocationsStoragePoolsResponse = Operation;

export type PatchProjectsLocationsStoragePoolsError = CommonErrors;

export const patchProjectsLocationsStoragePools: API.OperationMethod<PatchProjectsLocationsStoragePoolsRequest, PatchProjectsLocationsStoragePoolsResponse, PatchProjectsLocationsStoragePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsStoragePoolsRequest,
  output: PatchProjectsLocationsStoragePoolsResponse,
  errors: [],
}));

/** Warning! This operation will permanently delete the storage pool. */
export interface DeleteProjectsLocationsStoragePoolsRequest {
  /** Required. Name of the storage pool */
  name: string;
}

export const DeleteProjectsLocationsStoragePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/storagePools/{storagePoolsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsStoragePoolsRequest>;

export type DeleteProjectsLocationsStoragePoolsResponse = Operation;
export const DeleteProjectsLocationsStoragePoolsResponse = Operation;

export type DeleteProjectsLocationsStoragePoolsError = CommonErrors;

export const deleteProjectsLocationsStoragePools: API.OperationMethod<DeleteProjectsLocationsStoragePoolsRequest, DeleteProjectsLocationsStoragePoolsResponse, DeleteProjectsLocationsStoragePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsStoragePoolsRequest,
  output: DeleteProjectsLocationsStoragePoolsResponse,
  errors: [],
}));

/** ValidateDirectoryService does a connectivity check for a directory service policy attached to the storage pool. */
export interface ValidateDirectoryServiceProjectsLocationsStoragePoolsRequest {
  /** Required. Name of the storage pool */
  name: string;
  /** Request body */
  body?: ValidateDirectoryServiceRequest;
}

export const ValidateDirectoryServiceProjectsLocationsStoragePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ValidateDirectoryServiceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/storagePools/{storagePoolsId}:validateDirectoryService", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateDirectoryServiceProjectsLocationsStoragePoolsRequest>;

export type ValidateDirectoryServiceProjectsLocationsStoragePoolsResponse = Operation;
export const ValidateDirectoryServiceProjectsLocationsStoragePoolsResponse = Operation;

export type ValidateDirectoryServiceProjectsLocationsStoragePoolsError = CommonErrors;

export const validateDirectoryServiceProjectsLocationsStoragePools: API.OperationMethod<ValidateDirectoryServiceProjectsLocationsStoragePoolsRequest, ValidateDirectoryServiceProjectsLocationsStoragePoolsResponse, ValidateDirectoryServiceProjectsLocationsStoragePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateDirectoryServiceProjectsLocationsStoragePoolsRequest,
  output: ValidateDirectoryServiceProjectsLocationsStoragePoolsResponse,
  errors: [],
}));

/** This operation will switch the active/replica zone for a regional storagePool. */
export interface SwitchProjectsLocationsStoragePoolsRequest {
  /** Required. Name of the storage pool */
  name: string;
  /** Request body */
  body?: SwitchActiveReplicaZoneRequest;
}

export const SwitchProjectsLocationsStoragePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SwitchActiveReplicaZoneRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/storagePools/{storagePoolsId}:switch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SwitchProjectsLocationsStoragePoolsRequest>;

export type SwitchProjectsLocationsStoragePoolsResponse = Operation;
export const SwitchProjectsLocationsStoragePoolsResponse = Operation;

export type SwitchProjectsLocationsStoragePoolsError = CommonErrors;

export const switchProjectsLocationsStoragePools: API.OperationMethod<SwitchProjectsLocationsStoragePoolsRequest, SwitchProjectsLocationsStoragePoolsResponse, SwitchProjectsLocationsStoragePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SwitchProjectsLocationsStoragePoolsRequest,
  output: SwitchProjectsLocationsStoragePoolsResponse,
  errors: [],
}));

/** Lists Volumes in a given project. */
export interface ListProjectsLocationsVolumesRequest {
  /** Required. Parent value for ListVolumesRequest */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Filtering results */
  filter?: string;
  /** Hint for how to order the results */
  orderBy?: string;
}

export const ListProjectsLocationsVolumesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsVolumesRequest>;

export type ListProjectsLocationsVolumesResponse = ListVolumesResponse;
export const ListProjectsLocationsVolumesResponse = ListVolumesResponse;

export type ListProjectsLocationsVolumesError = CommonErrors;

export const listProjectsLocationsVolumes = API.makePaginated(() => ({
  input: ListProjectsLocationsVolumesRequest,
  output: ListProjectsLocationsVolumesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single Volume. */
export interface GetProjectsLocationsVolumesRequest {
  /** Required. Name of the volume */
  name: string;
}

export const GetProjectsLocationsVolumesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsVolumesRequest>;

export type GetProjectsLocationsVolumesResponse = Volume;
export const GetProjectsLocationsVolumesResponse = Volume;

export type GetProjectsLocationsVolumesError = CommonErrors;

export const getProjectsLocationsVolumes: API.OperationMethod<GetProjectsLocationsVolumesRequest, GetProjectsLocationsVolumesResponse, GetProjectsLocationsVolumesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsVolumesRequest,
  output: GetProjectsLocationsVolumesResponse,
  errors: [],
}));

/** Creates a new Volume in a given project and location. */
export interface CreateProjectsLocationsVolumesRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. Id of the requesting volume. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. */
  volumeId?: string;
  /** Request body */
  body?: Volume;
}

export const CreateProjectsLocationsVolumesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  volumeId: Schema.optional(Schema.String).pipe(T.HttpQuery("volumeId")),
  body: Schema.optional(Volume).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsVolumesRequest>;

export type CreateProjectsLocationsVolumesResponse = Operation;
export const CreateProjectsLocationsVolumesResponse = Operation;

export type CreateProjectsLocationsVolumesError = CommonErrors;

export const createProjectsLocationsVolumes: API.OperationMethod<CreateProjectsLocationsVolumesRequest, CreateProjectsLocationsVolumesResponse, CreateProjectsLocationsVolumesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsVolumesRequest,
  output: CreateProjectsLocationsVolumesResponse,
  errors: [],
}));

/** Updates the parameters of a single Volume. */
export interface PatchProjectsLocationsVolumesRequest {
  /** Identifier. Name of the volume */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the Volume resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: Volume;
}

export const PatchProjectsLocationsVolumesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Volume).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsVolumesRequest>;

export type PatchProjectsLocationsVolumesResponse = Operation;
export const PatchProjectsLocationsVolumesResponse = Operation;

export type PatchProjectsLocationsVolumesError = CommonErrors;

export const patchProjectsLocationsVolumes: API.OperationMethod<PatchProjectsLocationsVolumesRequest, PatchProjectsLocationsVolumesResponse, PatchProjectsLocationsVolumesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsVolumesRequest,
  output: PatchProjectsLocationsVolumesResponse,
  errors: [],
}));

/** Deletes a single Volume. */
export interface DeleteProjectsLocationsVolumesRequest {
  /** Required. Name of the volume */
  name: string;
  /** If this field is set as true, CCFE will not block the volume resource deletion even if it has any snapshots resource. (Otherwise, the request will only work if the volume has no snapshots.) */
  force?: boolean;
}

export const DeleteProjectsLocationsVolumesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsVolumesRequest>;

export type DeleteProjectsLocationsVolumesResponse = Operation;
export const DeleteProjectsLocationsVolumesResponse = Operation;

export type DeleteProjectsLocationsVolumesError = CommonErrors;

export const deleteProjectsLocationsVolumes: API.OperationMethod<DeleteProjectsLocationsVolumesRequest, DeleteProjectsLocationsVolumesResponse, DeleteProjectsLocationsVolumesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsVolumesRequest,
  output: DeleteProjectsLocationsVolumesResponse,
  errors: [],
}));

/** Revert an existing volume to a specified snapshot. Warning! This operation will permanently revert all changes made after the snapshot was created. */
export interface RevertProjectsLocationsVolumesRequest {
  /** Required. The resource name of the volume, in the format of projects/{project_id}/locations/{location}/volumes/{volume_id}. */
  name: string;
  /** Request body */
  body?: RevertVolumeRequest;
}

export const RevertProjectsLocationsVolumesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RevertVolumeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}:revert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevertProjectsLocationsVolumesRequest>;

export type RevertProjectsLocationsVolumesResponse = Operation;
export const RevertProjectsLocationsVolumesResponse = Operation;

export type RevertProjectsLocationsVolumesError = CommonErrors;

export const revertProjectsLocationsVolumes: API.OperationMethod<RevertProjectsLocationsVolumesRequest, RevertProjectsLocationsVolumesResponse, RevertProjectsLocationsVolumesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevertProjectsLocationsVolumesRequest,
  output: RevertProjectsLocationsVolumesResponse,
  errors: [],
}));

/** Establish volume peering. This is used to establish cluster and svm peerings between the GCNV and OnPrem clusters. */
export interface EstablishPeeringProjectsLocationsVolumesRequest {
  /** Required. The volume resource name, in the format `projects/{project_id}/locations/{location}/volumes/{volume_id}` */
  name: string;
  /** Request body */
  body?: EstablishVolumePeeringRequest;
}

export const EstablishPeeringProjectsLocationsVolumesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EstablishVolumePeeringRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}:establishPeering", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EstablishPeeringProjectsLocationsVolumesRequest>;

export type EstablishPeeringProjectsLocationsVolumesResponse = Operation;
export const EstablishPeeringProjectsLocationsVolumesResponse = Operation;

export type EstablishPeeringProjectsLocationsVolumesError = CommonErrors;

export const establishPeeringProjectsLocationsVolumes: API.OperationMethod<EstablishPeeringProjectsLocationsVolumesRequest, EstablishPeeringProjectsLocationsVolumesResponse, EstablishPeeringProjectsLocationsVolumesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EstablishPeeringProjectsLocationsVolumesRequest,
  output: EstablishPeeringProjectsLocationsVolumesResponse,
  errors: [],
}));

/** Restore files from a backup to a volume. */
export interface RestoreProjectsLocationsVolumesRequest {
  /** Required. The volume resource name, in the format `projects/{project_id}/locations/{location}/volumes/{volume_id}` */
  name: string;
  /** Request body */
  body?: RestoreBackupFilesRequest;
}

export const RestoreProjectsLocationsVolumesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RestoreBackupFilesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}:restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsLocationsVolumesRequest>;

export type RestoreProjectsLocationsVolumesResponse = Operation;
export const RestoreProjectsLocationsVolumesResponse = Operation;

export type RestoreProjectsLocationsVolumesError = CommonErrors;

export const restoreProjectsLocationsVolumes: API.OperationMethod<RestoreProjectsLocationsVolumesRequest, RestoreProjectsLocationsVolumesResponse, RestoreProjectsLocationsVolumesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreProjectsLocationsVolumesRequest,
  output: RestoreProjectsLocationsVolumesResponse,
  errors: [],
}));

/** Returns descriptions of all snapshots for a volume. */
export interface ListProjectsLocationsVolumesSnapshotsRequest {
  /** Required. The volume for which to retrieve snapshot information, in the format `projects/{project_id}/locations/{location}/volumes/{volume_id}`. */
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

export const ListProjectsLocationsVolumesSnapshotsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/snapshots" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsVolumesSnapshotsRequest>;

export type ListProjectsLocationsVolumesSnapshotsResponse = ListSnapshotsResponse;
export const ListProjectsLocationsVolumesSnapshotsResponse = ListSnapshotsResponse;

export type ListProjectsLocationsVolumesSnapshotsError = CommonErrors;

export const listProjectsLocationsVolumesSnapshots = API.makePaginated(() => ({
  input: ListProjectsLocationsVolumesSnapshotsRequest,
  output: ListProjectsLocationsVolumesSnapshotsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Describe a snapshot for a volume. */
export interface GetProjectsLocationsVolumesSnapshotsRequest {
  /** Required. The snapshot resource name, in the format `projects/{project_id}/locations/{location}/volumes/{volume_id}/snapshots/{snapshot_id}` */
  name: string;
}

export const GetProjectsLocationsVolumesSnapshotsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/snapshots/{snapshotsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsVolumesSnapshotsRequest>;

export type GetProjectsLocationsVolumesSnapshotsResponse = Snapshot;
export const GetProjectsLocationsVolumesSnapshotsResponse = Snapshot;

export type GetProjectsLocationsVolumesSnapshotsError = CommonErrors;

export const getProjectsLocationsVolumesSnapshots: API.OperationMethod<GetProjectsLocationsVolumesSnapshotsRequest, GetProjectsLocationsVolumesSnapshotsResponse, GetProjectsLocationsVolumesSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsVolumesSnapshotsRequest,
  output: GetProjectsLocationsVolumesSnapshotsResponse,
  errors: [],
}));

/** Create a new snapshot for a volume. */
export interface CreateProjectsLocationsVolumesSnapshotsRequest {
  /** Required. The NetApp volume to create the snapshots of, in the format `projects/{project_id}/locations/{location}/volumes/{volume_id}` */
  parent: string;
  /** Required. ID of the snapshot to create. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. */
  snapshotId?: string;
  /** Request body */
  body?: Snapshot;
}

export const CreateProjectsLocationsVolumesSnapshotsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  snapshotId: Schema.optional(Schema.String).pipe(T.HttpQuery("snapshotId")),
  body: Schema.optional(Snapshot).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/snapshots", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsVolumesSnapshotsRequest>;

export type CreateProjectsLocationsVolumesSnapshotsResponse = Operation;
export const CreateProjectsLocationsVolumesSnapshotsResponse = Operation;

export type CreateProjectsLocationsVolumesSnapshotsError = CommonErrors;

export const createProjectsLocationsVolumesSnapshots: API.OperationMethod<CreateProjectsLocationsVolumesSnapshotsRequest, CreateProjectsLocationsVolumesSnapshotsResponse, CreateProjectsLocationsVolumesSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsVolumesSnapshotsRequest,
  output: CreateProjectsLocationsVolumesSnapshotsResponse,
  errors: [],
}));

/** Deletes a snapshot. */
export interface DeleteProjectsLocationsVolumesSnapshotsRequest {
  /** Required. The snapshot resource name, in the format `projects/* /locations/* /volumes/* /snapshots/{snapshot_id}` */
  name: string;
}

export const DeleteProjectsLocationsVolumesSnapshotsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/snapshots/{snapshotsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsVolumesSnapshotsRequest>;

export type DeleteProjectsLocationsVolumesSnapshotsResponse = Operation;
export const DeleteProjectsLocationsVolumesSnapshotsResponse = Operation;

export type DeleteProjectsLocationsVolumesSnapshotsError = CommonErrors;

export const deleteProjectsLocationsVolumesSnapshots: API.OperationMethod<DeleteProjectsLocationsVolumesSnapshotsRequest, DeleteProjectsLocationsVolumesSnapshotsResponse, DeleteProjectsLocationsVolumesSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsVolumesSnapshotsRequest,
  output: DeleteProjectsLocationsVolumesSnapshotsResponse,
  errors: [],
}));

/** Updates the settings of a specific snapshot. */
export interface PatchProjectsLocationsVolumesSnapshotsRequest {
  /** Identifier. The resource name of the snapshot. Format: `projects/{project_id}/locations/{location}/volumes/{volume_id}/snapshots/{snapshot_id}`. */
  name: string;
  /** Required. Mask of fields to update. At least one path must be supplied in this field. */
  updateMask?: string;
  /** Request body */
  body?: Snapshot;
}

export const PatchProjectsLocationsVolumesSnapshotsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Snapshot).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/snapshots/{snapshotsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsVolumesSnapshotsRequest>;

export type PatchProjectsLocationsVolumesSnapshotsResponse = Operation;
export const PatchProjectsLocationsVolumesSnapshotsResponse = Operation;

export type PatchProjectsLocationsVolumesSnapshotsError = CommonErrors;

export const patchProjectsLocationsVolumesSnapshots: API.OperationMethod<PatchProjectsLocationsVolumesSnapshotsRequest, PatchProjectsLocationsVolumesSnapshotsResponse, PatchProjectsLocationsVolumesSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsVolumesSnapshotsRequest,
  output: PatchProjectsLocationsVolumesSnapshotsResponse,
  errors: [],
}));

/** Returns descriptions of all replications for a volume. */
export interface ListProjectsLocationsVolumesReplicationsRequest {
  /** Required. The volume for which to retrieve replication information, in the format `projects/{project_id}/locations/{location}/volumes/{volume_id}`. */
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

export const ListProjectsLocationsVolumesReplicationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/replications" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsVolumesReplicationsRequest>;

export type ListProjectsLocationsVolumesReplicationsResponse = ListReplicationsResponse;
export const ListProjectsLocationsVolumesReplicationsResponse = ListReplicationsResponse;

export type ListProjectsLocationsVolumesReplicationsError = CommonErrors;

export const listProjectsLocationsVolumesReplications = API.makePaginated(() => ({
  input: ListProjectsLocationsVolumesReplicationsRequest,
  output: ListProjectsLocationsVolumesReplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Describe a replication for a volume. */
export interface GetProjectsLocationsVolumesReplicationsRequest {
  /** Required. The replication resource name, in the format `projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}` */
  name: string;
}

export const GetProjectsLocationsVolumesReplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/replications/{replicationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsVolumesReplicationsRequest>;

export type GetProjectsLocationsVolumesReplicationsResponse = Replication;
export const GetProjectsLocationsVolumesReplicationsResponse = Replication;

export type GetProjectsLocationsVolumesReplicationsError = CommonErrors;

export const getProjectsLocationsVolumesReplications: API.OperationMethod<GetProjectsLocationsVolumesReplicationsRequest, GetProjectsLocationsVolumesReplicationsResponse, GetProjectsLocationsVolumesReplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsVolumesReplicationsRequest,
  output: GetProjectsLocationsVolumesReplicationsResponse,
  errors: [],
}));

/** Create a new replication for a volume. */
export interface CreateProjectsLocationsVolumesReplicationsRequest {
  /** Required. The NetApp volume to create the replications of, in the format `projects/{project_id}/locations/{location}/volumes/{volume_id}` */
  parent: string;
  /** Required. ID of the replication to create. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. */
  replicationId?: string;
  /** Request body */
  body?: Replication;
}

export const CreateProjectsLocationsVolumesReplicationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  replicationId: Schema.optional(Schema.String).pipe(T.HttpQuery("replicationId")),
  body: Schema.optional(Replication).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/replications", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsVolumesReplicationsRequest>;

export type CreateProjectsLocationsVolumesReplicationsResponse = Operation;
export const CreateProjectsLocationsVolumesReplicationsResponse = Operation;

export type CreateProjectsLocationsVolumesReplicationsError = CommonErrors;

export const createProjectsLocationsVolumesReplications: API.OperationMethod<CreateProjectsLocationsVolumesReplicationsRequest, CreateProjectsLocationsVolumesReplicationsResponse, CreateProjectsLocationsVolumesReplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsVolumesReplicationsRequest,
  output: CreateProjectsLocationsVolumesReplicationsResponse,
  errors: [],
}));

/** Deletes a replication. */
export interface DeleteProjectsLocationsVolumesReplicationsRequest {
  /** Required. The replication resource name, in the format `projects/* /locations/* /volumes/* /replications/{replication_id}` */
  name: string;
}

export const DeleteProjectsLocationsVolumesReplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/replications/{replicationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsVolumesReplicationsRequest>;

export type DeleteProjectsLocationsVolumesReplicationsResponse = Operation;
export const DeleteProjectsLocationsVolumesReplicationsResponse = Operation;

export type DeleteProjectsLocationsVolumesReplicationsError = CommonErrors;

export const deleteProjectsLocationsVolumesReplications: API.OperationMethod<DeleteProjectsLocationsVolumesReplicationsRequest, DeleteProjectsLocationsVolumesReplicationsResponse, DeleteProjectsLocationsVolumesReplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsVolumesReplicationsRequest,
  output: DeleteProjectsLocationsVolumesReplicationsResponse,
  errors: [],
}));

/** Updates the settings of a specific replication. */
export interface PatchProjectsLocationsVolumesReplicationsRequest {
  /** Identifier. The resource name of the Replication. Format: `projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}`. */
  name: string;
  /** Required. Mask of fields to update. At least one path must be supplied in this field. */
  updateMask?: string;
  /** Request body */
  body?: Replication;
}

export const PatchProjectsLocationsVolumesReplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Replication).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/replications/{replicationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsVolumesReplicationsRequest>;

export type PatchProjectsLocationsVolumesReplicationsResponse = Operation;
export const PatchProjectsLocationsVolumesReplicationsResponse = Operation;

export type PatchProjectsLocationsVolumesReplicationsError = CommonErrors;

export const patchProjectsLocationsVolumesReplications: API.OperationMethod<PatchProjectsLocationsVolumesReplicationsRequest, PatchProjectsLocationsVolumesReplicationsResponse, PatchProjectsLocationsVolumesReplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsVolumesReplicationsRequest,
  output: PatchProjectsLocationsVolumesReplicationsResponse,
  errors: [],
}));

/** Stop Cross Region Replication. */
export interface StopProjectsLocationsVolumesReplicationsRequest {
  /** Required. The resource name of the replication, in the format of projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}. */
  name: string;
  /** Request body */
  body?: StopReplicationRequest;
}

export const StopProjectsLocationsVolumesReplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StopReplicationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/replications/{replicationsId}:stop", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopProjectsLocationsVolumesReplicationsRequest>;

export type StopProjectsLocationsVolumesReplicationsResponse = Operation;
export const StopProjectsLocationsVolumesReplicationsResponse = Operation;

export type StopProjectsLocationsVolumesReplicationsError = CommonErrors;

export const stopProjectsLocationsVolumesReplications: API.OperationMethod<StopProjectsLocationsVolumesReplicationsRequest, StopProjectsLocationsVolumesReplicationsResponse, StopProjectsLocationsVolumesReplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StopProjectsLocationsVolumesReplicationsRequest,
  output: StopProjectsLocationsVolumesReplicationsResponse,
  errors: [],
}));

/** Resume Cross Region Replication. */
export interface ResumeProjectsLocationsVolumesReplicationsRequest {
  /** Required. The resource name of the replication, in the format of projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}. */
  name: string;
  /** Request body */
  body?: ResumeReplicationRequest;
}

export const ResumeProjectsLocationsVolumesReplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResumeReplicationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/replications/{replicationsId}:resume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResumeProjectsLocationsVolumesReplicationsRequest>;

export type ResumeProjectsLocationsVolumesReplicationsResponse = Operation;
export const ResumeProjectsLocationsVolumesReplicationsResponse = Operation;

export type ResumeProjectsLocationsVolumesReplicationsError = CommonErrors;

export const resumeProjectsLocationsVolumesReplications: API.OperationMethod<ResumeProjectsLocationsVolumesReplicationsRequest, ResumeProjectsLocationsVolumesReplicationsResponse, ResumeProjectsLocationsVolumesReplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResumeProjectsLocationsVolumesReplicationsRequest,
  output: ResumeProjectsLocationsVolumesReplicationsResponse,
  errors: [],
}));

/** Reverses direction of replication. Source becomes destination and destination becomes source. */
export interface ReverseDirectionProjectsLocationsVolumesReplicationsRequest {
  /** Required. The resource name of the replication, in the format of projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}. */
  name: string;
  /** Request body */
  body?: ReverseReplicationDirectionRequest;
}

export const ReverseDirectionProjectsLocationsVolumesReplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ReverseReplicationDirectionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/replications/{replicationsId}:reverseDirection", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReverseDirectionProjectsLocationsVolumesReplicationsRequest>;

export type ReverseDirectionProjectsLocationsVolumesReplicationsResponse = Operation;
export const ReverseDirectionProjectsLocationsVolumesReplicationsResponse = Operation;

export type ReverseDirectionProjectsLocationsVolumesReplicationsError = CommonErrors;

export const reverseDirectionProjectsLocationsVolumesReplications: API.OperationMethod<ReverseDirectionProjectsLocationsVolumesReplicationsRequest, ReverseDirectionProjectsLocationsVolumesReplicationsResponse, ReverseDirectionProjectsLocationsVolumesReplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReverseDirectionProjectsLocationsVolumesReplicationsRequest,
  output: ReverseDirectionProjectsLocationsVolumesReplicationsResponse,
  errors: [],
}));

/** Establish replication peering. */
export interface EstablishPeeringProjectsLocationsVolumesReplicationsRequest {
  /** Required. The resource name of the replication, in the format of projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}. */
  name: string;
  /** Request body */
  body?: EstablishPeeringRequest;
}

export const EstablishPeeringProjectsLocationsVolumesReplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EstablishPeeringRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/replications/{replicationsId}:establishPeering", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EstablishPeeringProjectsLocationsVolumesReplicationsRequest>;

export type EstablishPeeringProjectsLocationsVolumesReplicationsResponse = Operation;
export const EstablishPeeringProjectsLocationsVolumesReplicationsResponse = Operation;

export type EstablishPeeringProjectsLocationsVolumesReplicationsError = CommonErrors;

export const establishPeeringProjectsLocationsVolumesReplications: API.OperationMethod<EstablishPeeringProjectsLocationsVolumesReplicationsRequest, EstablishPeeringProjectsLocationsVolumesReplicationsResponse, EstablishPeeringProjectsLocationsVolumesReplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EstablishPeeringProjectsLocationsVolumesReplicationsRequest,
  output: EstablishPeeringProjectsLocationsVolumesReplicationsResponse,
  errors: [],
}));

/** Syncs the replication. This will invoke one time volume data transfer from source to destination. */
export interface SyncProjectsLocationsVolumesReplicationsRequest {
  /** Required. The resource name of the replication, in the format of projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}. */
  name: string;
  /** Request body */
  body?: SyncReplicationRequest;
}

export const SyncProjectsLocationsVolumesReplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SyncReplicationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/replications/{replicationsId}:sync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SyncProjectsLocationsVolumesReplicationsRequest>;

export type SyncProjectsLocationsVolumesReplicationsResponse = Operation;
export const SyncProjectsLocationsVolumesReplicationsResponse = Operation;

export type SyncProjectsLocationsVolumesReplicationsError = CommonErrors;

export const syncProjectsLocationsVolumesReplications: API.OperationMethod<SyncProjectsLocationsVolumesReplicationsRequest, SyncProjectsLocationsVolumesReplicationsResponse, SyncProjectsLocationsVolumesReplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SyncProjectsLocationsVolumesReplicationsRequest,
  output: SyncProjectsLocationsVolumesReplicationsResponse,
  errors: [],
}));

/** Returns list of all quota rules in a location. */
export interface ListProjectsLocationsVolumesQuotaRulesRequest {
  /** Required. Parent value for ListQuotaRulesRequest */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Optional. Hint for how to order the results */
  orderBy?: string;
}

export const ListProjectsLocationsVolumesQuotaRulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/quotaRules" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsVolumesQuotaRulesRequest>;

export type ListProjectsLocationsVolumesQuotaRulesResponse = ListQuotaRulesResponse;
export const ListProjectsLocationsVolumesQuotaRulesResponse = ListQuotaRulesResponse;

export type ListProjectsLocationsVolumesQuotaRulesError = CommonErrors;

export const listProjectsLocationsVolumesQuotaRules = API.makePaginated(() => ({
  input: ListProjectsLocationsVolumesQuotaRulesRequest,
  output: ListProjectsLocationsVolumesQuotaRulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns details of the specified quota rule. */
export interface GetProjectsLocationsVolumesQuotaRulesRequest {
  /** Required. Name of the quota rule */
  name: string;
}

export const GetProjectsLocationsVolumesQuotaRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/quotaRules/{quotaRulesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsVolumesQuotaRulesRequest>;

export type GetProjectsLocationsVolumesQuotaRulesResponse = QuotaRule;
export const GetProjectsLocationsVolumesQuotaRulesResponse = QuotaRule;

export type GetProjectsLocationsVolumesQuotaRulesError = CommonErrors;

export const getProjectsLocationsVolumesQuotaRules: API.OperationMethod<GetProjectsLocationsVolumesQuotaRulesRequest, GetProjectsLocationsVolumesQuotaRulesResponse, GetProjectsLocationsVolumesQuotaRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsVolumesQuotaRulesRequest,
  output: GetProjectsLocationsVolumesQuotaRulesResponse,
  errors: [],
}));

/** Creates a new quota rule. */
export interface CreateProjectsLocationsVolumesQuotaRulesRequest {
  /** Required. Parent value for CreateQuotaRuleRequest */
  parent: string;
  /** Required. ID of the quota rule to create. Must be unique within the parent resource. Must contain only letters, numbers, underscore and hyphen, with the first character a letter or underscore, the last a letter or underscore or a number, and a 63 character maximum. */
  quotaRuleId?: string;
  /** Request body */
  body?: QuotaRule;
}

export const CreateProjectsLocationsVolumesQuotaRulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  quotaRuleId: Schema.optional(Schema.String).pipe(T.HttpQuery("quotaRuleId")),
  body: Schema.optional(QuotaRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/quotaRules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsVolumesQuotaRulesRequest>;

export type CreateProjectsLocationsVolumesQuotaRulesResponse = Operation;
export const CreateProjectsLocationsVolumesQuotaRulesResponse = Operation;

export type CreateProjectsLocationsVolumesQuotaRulesError = CommonErrors;

export const createProjectsLocationsVolumesQuotaRules: API.OperationMethod<CreateProjectsLocationsVolumesQuotaRulesRequest, CreateProjectsLocationsVolumesQuotaRulesResponse, CreateProjectsLocationsVolumesQuotaRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsVolumesQuotaRulesRequest,
  output: CreateProjectsLocationsVolumesQuotaRulesResponse,
  errors: [],
}));

/** Updates a quota rule. */
export interface PatchProjectsLocationsVolumesQuotaRulesRequest {
  /** Identifier. The resource name of the quota rule. Format: `projects/{project_number}/locations/{location_id}/volumes/volumes/{volume_id}/quotaRules/{quota_rule_id}`. */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the Quota Rule resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: QuotaRule;
}

export const PatchProjectsLocationsVolumesQuotaRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(QuotaRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/quotaRules/{quotaRulesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsVolumesQuotaRulesRequest>;

export type PatchProjectsLocationsVolumesQuotaRulesResponse = Operation;
export const PatchProjectsLocationsVolumesQuotaRulesResponse = Operation;

export type PatchProjectsLocationsVolumesQuotaRulesError = CommonErrors;

export const patchProjectsLocationsVolumesQuotaRules: API.OperationMethod<PatchProjectsLocationsVolumesQuotaRulesRequest, PatchProjectsLocationsVolumesQuotaRulesResponse, PatchProjectsLocationsVolumesQuotaRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsVolumesQuotaRulesRequest,
  output: PatchProjectsLocationsVolumesQuotaRulesResponse,
  errors: [],
}));

/** Deletes a quota rule. */
export interface DeleteProjectsLocationsVolumesQuotaRulesRequest {
  /** Required. Name of the quota rule. */
  name: string;
}

export const DeleteProjectsLocationsVolumesQuotaRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/quotaRules/{quotaRulesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsVolumesQuotaRulesRequest>;

export type DeleteProjectsLocationsVolumesQuotaRulesResponse = Operation;
export const DeleteProjectsLocationsVolumesQuotaRulesResponse = Operation;

export type DeleteProjectsLocationsVolumesQuotaRulesError = CommonErrors;

export const deleteProjectsLocationsVolumesQuotaRules: API.OperationMethod<DeleteProjectsLocationsVolumesQuotaRulesRequest, DeleteProjectsLocationsVolumesQuotaRulesResponse, DeleteProjectsLocationsVolumesQuotaRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsVolumesQuotaRulesRequest,
  output: DeleteProjectsLocationsVolumesQuotaRulesResponse,
  errors: [],
}));

/** Lists active directories. */
export interface ListProjectsLocationsActiveDirectoriesRequest {
  /** Required. Parent value for ListActiveDirectoriesRequest */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Filtering results */
  filter?: string;
  /** Hint for how to order the results */
  orderBy?: string;
}

export const ListProjectsLocationsActiveDirectoriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/activeDirectories" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsActiveDirectoriesRequest>;

export type ListProjectsLocationsActiveDirectoriesResponse = ListActiveDirectoriesResponse;
export const ListProjectsLocationsActiveDirectoriesResponse = ListActiveDirectoriesResponse;

export type ListProjectsLocationsActiveDirectoriesError = CommonErrors;

export const listProjectsLocationsActiveDirectories = API.makePaginated(() => ({
  input: ListProjectsLocationsActiveDirectoriesRequest,
  output: ListProjectsLocationsActiveDirectoriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Describes a specified active directory. */
export interface GetProjectsLocationsActiveDirectoriesRequest {
  /** Required. Name of the active directory. */
  name: string;
}

export const GetProjectsLocationsActiveDirectoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/activeDirectories/{activeDirectoriesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsActiveDirectoriesRequest>;

export type GetProjectsLocationsActiveDirectoriesResponse = ActiveDirectory;
export const GetProjectsLocationsActiveDirectoriesResponse = ActiveDirectory;

export type GetProjectsLocationsActiveDirectoriesError = CommonErrors;

export const getProjectsLocationsActiveDirectories: API.OperationMethod<GetProjectsLocationsActiveDirectoriesRequest, GetProjectsLocationsActiveDirectoriesResponse, GetProjectsLocationsActiveDirectoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsActiveDirectoriesRequest,
  output: GetProjectsLocationsActiveDirectoriesResponse,
  errors: [],
}));

/** CreateActiveDirectory Creates the active directory specified in the request. */
export interface CreateProjectsLocationsActiveDirectoriesRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. ID of the active directory to create. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter , the last a letter or a number, and a 63 character maximum. */
  activeDirectoryId?: string;
  /** Request body */
  body?: ActiveDirectory;
}

export const CreateProjectsLocationsActiveDirectoriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  activeDirectoryId: Schema.optional(Schema.String).pipe(T.HttpQuery("activeDirectoryId")),
  body: Schema.optional(ActiveDirectory).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/activeDirectories", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsActiveDirectoriesRequest>;

export type CreateProjectsLocationsActiveDirectoriesResponse = Operation;
export const CreateProjectsLocationsActiveDirectoriesResponse = Operation;

export type CreateProjectsLocationsActiveDirectoriesError = CommonErrors;

export const createProjectsLocationsActiveDirectories: API.OperationMethod<CreateProjectsLocationsActiveDirectoriesRequest, CreateProjectsLocationsActiveDirectoriesResponse, CreateProjectsLocationsActiveDirectoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsActiveDirectoriesRequest,
  output: CreateProjectsLocationsActiveDirectoriesResponse,
  errors: [],
}));

/** Update the parameters of an active directories. */
export interface PatchProjectsLocationsActiveDirectoriesRequest {
  /** Identifier. The resource name of the active directory. Format: `projects/{project_number}/locations/{location_id}/activeDirectories/{active_directory_id}`. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the Active Directory resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: ActiveDirectory;
}

export const PatchProjectsLocationsActiveDirectoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ActiveDirectory).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/activeDirectories/{activeDirectoriesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsActiveDirectoriesRequest>;

export type PatchProjectsLocationsActiveDirectoriesResponse = Operation;
export const PatchProjectsLocationsActiveDirectoriesResponse = Operation;

export type PatchProjectsLocationsActiveDirectoriesError = CommonErrors;

export const patchProjectsLocationsActiveDirectories: API.OperationMethod<PatchProjectsLocationsActiveDirectoriesRequest, PatchProjectsLocationsActiveDirectoriesResponse, PatchProjectsLocationsActiveDirectoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsActiveDirectoriesRequest,
  output: PatchProjectsLocationsActiveDirectoriesResponse,
  errors: [],
}));

/** Delete the active directory specified in the request. */
export interface DeleteProjectsLocationsActiveDirectoriesRequest {
  /** Required. Name of the active directory. */
  name: string;
}

export const DeleteProjectsLocationsActiveDirectoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/activeDirectories/{activeDirectoriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsActiveDirectoriesRequest>;

export type DeleteProjectsLocationsActiveDirectoriesResponse = Operation;
export const DeleteProjectsLocationsActiveDirectoriesResponse = Operation;

export type DeleteProjectsLocationsActiveDirectoriesError = CommonErrors;

export const deleteProjectsLocationsActiveDirectories: API.OperationMethod<DeleteProjectsLocationsActiveDirectoriesRequest, DeleteProjectsLocationsActiveDirectoriesResponse, DeleteProjectsLocationsActiveDirectoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsActiveDirectoriesRequest,
  output: DeleteProjectsLocationsActiveDirectoriesResponse,
  errors: [],
}));

/** Returns descriptions of all KMS configs owned by the caller. */
export interface ListProjectsLocationsKmsConfigsRequest {
  /** Required. Parent value */
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

export const ListProjectsLocationsKmsConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/kmsConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsKmsConfigsRequest>;

export type ListProjectsLocationsKmsConfigsResponse = ListKmsConfigsResponse;
export const ListProjectsLocationsKmsConfigsResponse = ListKmsConfigsResponse;

export type ListProjectsLocationsKmsConfigsError = CommonErrors;

export const listProjectsLocationsKmsConfigs = API.makePaginated(() => ({
  input: ListProjectsLocationsKmsConfigsRequest,
  output: ListProjectsLocationsKmsConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new KMS config. */
export interface CreateProjectsLocationsKmsConfigsRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. Id of the requesting KmsConfig. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. */
  kmsConfigId?: string;
  /** Request body */
  body?: KmsConfig;
}

export const CreateProjectsLocationsKmsConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  kmsConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("kmsConfigId")),
  body: Schema.optional(KmsConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/kmsConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsKmsConfigsRequest>;

export type CreateProjectsLocationsKmsConfigsResponse = Operation;
export const CreateProjectsLocationsKmsConfigsResponse = Operation;

export type CreateProjectsLocationsKmsConfigsError = CommonErrors;

export const createProjectsLocationsKmsConfigs: API.OperationMethod<CreateProjectsLocationsKmsConfigsRequest, CreateProjectsLocationsKmsConfigsResponse, CreateProjectsLocationsKmsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsKmsConfigsRequest,
  output: CreateProjectsLocationsKmsConfigsResponse,
  errors: [],
}));

/** Returns the description of the specified KMS config by kms_config_id. */
export interface GetProjectsLocationsKmsConfigsRequest {
  /** Required. Name of the KmsConfig */
  name: string;
}

export const GetProjectsLocationsKmsConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/kmsConfigs/{kmsConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsKmsConfigsRequest>;

export type GetProjectsLocationsKmsConfigsResponse = KmsConfig;
export const GetProjectsLocationsKmsConfigsResponse = KmsConfig;

export type GetProjectsLocationsKmsConfigsError = CommonErrors;

export const getProjectsLocationsKmsConfigs: API.OperationMethod<GetProjectsLocationsKmsConfigsRequest, GetProjectsLocationsKmsConfigsResponse, GetProjectsLocationsKmsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsKmsConfigsRequest,
  output: GetProjectsLocationsKmsConfigsResponse,
  errors: [],
}));

/** Updates the Kms config properties with the full spec */
export interface PatchProjectsLocationsKmsConfigsRequest {
  /** Identifier. Name of the KmsConfig. Format: `projects/{project}/locations/{location}/kmsConfigs/{kms_config}` */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the KmsConfig resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: KmsConfig;
}

export const PatchProjectsLocationsKmsConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(KmsConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/kmsConfigs/{kmsConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsKmsConfigsRequest>;

export type PatchProjectsLocationsKmsConfigsResponse = Operation;
export const PatchProjectsLocationsKmsConfigsResponse = Operation;

export type PatchProjectsLocationsKmsConfigsError = CommonErrors;

export const patchProjectsLocationsKmsConfigs: API.OperationMethod<PatchProjectsLocationsKmsConfigsRequest, PatchProjectsLocationsKmsConfigsResponse, PatchProjectsLocationsKmsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsKmsConfigsRequest,
  output: PatchProjectsLocationsKmsConfigsResponse,
  errors: [],
}));

/** Encrypt the existing volumes without CMEK encryption with the desired the KMS config for the whole region. */
export interface EncryptProjectsLocationsKmsConfigsRequest {
  /** Required. Name of the KmsConfig. */
  name: string;
  /** Request body */
  body?: EncryptVolumesRequest;
}

export const EncryptProjectsLocationsKmsConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EncryptVolumesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/kmsConfigs/{kmsConfigsId}:encrypt", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EncryptProjectsLocationsKmsConfigsRequest>;

export type EncryptProjectsLocationsKmsConfigsResponse = Operation;
export const EncryptProjectsLocationsKmsConfigsResponse = Operation;

export type EncryptProjectsLocationsKmsConfigsError = CommonErrors;

export const encryptProjectsLocationsKmsConfigs: API.OperationMethod<EncryptProjectsLocationsKmsConfigsRequest, EncryptProjectsLocationsKmsConfigsResponse, EncryptProjectsLocationsKmsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EncryptProjectsLocationsKmsConfigsRequest,
  output: EncryptProjectsLocationsKmsConfigsResponse,
  errors: [],
}));

/** Verifies KMS config reachability. */
export interface VerifyProjectsLocationsKmsConfigsRequest {
  /** Required. Name of the KMS Config to be verified. */
  name: string;
  /** Request body */
  body?: VerifyKmsConfigRequest;
}

export const VerifyProjectsLocationsKmsConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(VerifyKmsConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/kmsConfigs/{kmsConfigsId}:verify", hasBody: true }),
  svc,
) as unknown as Schema.Schema<VerifyProjectsLocationsKmsConfigsRequest>;

export type VerifyProjectsLocationsKmsConfigsResponse = VerifyKmsConfigResponse;
export const VerifyProjectsLocationsKmsConfigsResponse = VerifyKmsConfigResponse;

export type VerifyProjectsLocationsKmsConfigsError = CommonErrors;

export const verifyProjectsLocationsKmsConfigs: API.OperationMethod<VerifyProjectsLocationsKmsConfigsRequest, VerifyProjectsLocationsKmsConfigsResponse, VerifyProjectsLocationsKmsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: VerifyProjectsLocationsKmsConfigsRequest,
  output: VerifyProjectsLocationsKmsConfigsResponse,
  errors: [],
}));

/** Warning! This operation will permanently delete the Kms config. */
export interface DeleteProjectsLocationsKmsConfigsRequest {
  /** Required. Name of the KmsConfig. */
  name: string;
}

export const DeleteProjectsLocationsKmsConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/kmsConfigs/{kmsConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsKmsConfigsRequest>;

export type DeleteProjectsLocationsKmsConfigsResponse = Operation;
export const DeleteProjectsLocationsKmsConfigsResponse = Operation;

export type DeleteProjectsLocationsKmsConfigsError = CommonErrors;

export const deleteProjectsLocationsKmsConfigs: API.OperationMethod<DeleteProjectsLocationsKmsConfigsRequest, DeleteProjectsLocationsKmsConfigsResponse, DeleteProjectsLocationsKmsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsKmsConfigsRequest,
  output: DeleteProjectsLocationsKmsConfigsResponse,
  errors: [],
}));

/** Creates new backup vault */
export interface CreateProjectsLocationsBackupVaultsRequest {
  /** Required. The location to create the backup vaults, in the format `projects/{project_id}/locations/{location}` */
  parent: string;
  /** Required. The ID to use for the backupVault. The ID must be unique within the specified location. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. */
  backupVaultId?: string;
  /** Request body */
  body?: BackupVault;
}

export const CreateProjectsLocationsBackupVaultsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  backupVaultId: Schema.optional(Schema.String).pipe(T.HttpQuery("backupVaultId")),
  body: Schema.optional(BackupVault).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBackupVaultsRequest>;

export type CreateProjectsLocationsBackupVaultsResponse = Operation;
export const CreateProjectsLocationsBackupVaultsResponse = Operation;

export type CreateProjectsLocationsBackupVaultsError = CommonErrors;

export const createProjectsLocationsBackupVaults: API.OperationMethod<CreateProjectsLocationsBackupVaultsRequest, CreateProjectsLocationsBackupVaultsResponse, CreateProjectsLocationsBackupVaultsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBackupVaultsRequest,
  output: CreateProjectsLocationsBackupVaultsResponse,
  errors: [],
}));

/** Returns the description of the specified backup vault */
export interface GetProjectsLocationsBackupVaultsRequest {
  /** Required. The backupVault resource name, in the format `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}` */
  name: string;
}

export const GetProjectsLocationsBackupVaultsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackupVaultsRequest>;

export type GetProjectsLocationsBackupVaultsResponse = BackupVault;
export const GetProjectsLocationsBackupVaultsResponse = BackupVault;

export type GetProjectsLocationsBackupVaultsError = CommonErrors;

export const getProjectsLocationsBackupVaults: API.OperationMethod<GetProjectsLocationsBackupVaultsRequest, GetProjectsLocationsBackupVaultsResponse, GetProjectsLocationsBackupVaultsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackupVaultsRequest,
  output: GetProjectsLocationsBackupVaultsResponse,
  errors: [],
}));

/** Returns list of all available backup vaults. */
export interface ListProjectsLocationsBackupVaultsRequest {
  /** Required. The location for which to retrieve backupVault information, in the format `projects/{project_id}/locations/{location}`. */
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

export const ListProjectsLocationsBackupVaultsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackupVaultsRequest>;

export type ListProjectsLocationsBackupVaultsResponse = ListBackupVaultsResponse;
export const ListProjectsLocationsBackupVaultsResponse = ListBackupVaultsResponse;

export type ListProjectsLocationsBackupVaultsError = CommonErrors;

export const listProjectsLocationsBackupVaults = API.makePaginated(() => ({
  input: ListProjectsLocationsBackupVaultsRequest,
  output: ListProjectsLocationsBackupVaultsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the settings of a specific backup vault. */
export interface PatchProjectsLocationsBackupVaultsRequest {
  /** Identifier. The resource name of the backup vault. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}`. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the Backup resource to be updated. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: BackupVault;
}

export const PatchProjectsLocationsBackupVaultsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(BackupVault).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackupVaultsRequest>;

export type PatchProjectsLocationsBackupVaultsResponse = Operation;
export const PatchProjectsLocationsBackupVaultsResponse = Operation;

export type PatchProjectsLocationsBackupVaultsError = CommonErrors;

export const patchProjectsLocationsBackupVaults: API.OperationMethod<PatchProjectsLocationsBackupVaultsRequest, PatchProjectsLocationsBackupVaultsResponse, PatchProjectsLocationsBackupVaultsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBackupVaultsRequest,
  output: PatchProjectsLocationsBackupVaultsResponse,
  errors: [],
}));

/** Warning! This operation will permanently delete the backup vault. */
export interface DeleteProjectsLocationsBackupVaultsRequest {
  /** Required. The backupVault resource name, in the format `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}` */
  name: string;
}

export const DeleteProjectsLocationsBackupVaultsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackupVaultsRequest>;

export type DeleteProjectsLocationsBackupVaultsResponse = Operation;
export const DeleteProjectsLocationsBackupVaultsResponse = Operation;

export type DeleteProjectsLocationsBackupVaultsError = CommonErrors;

export const deleteProjectsLocationsBackupVaults: API.OperationMethod<DeleteProjectsLocationsBackupVaultsRequest, DeleteProjectsLocationsBackupVaultsResponse, DeleteProjectsLocationsBackupVaultsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBackupVaultsRequest,
  output: DeleteProjectsLocationsBackupVaultsResponse,
  errors: [],
}));

/** Creates a backup from the volume specified in the request The backup can be created from the given snapshot if specified in the request. If no snapshot specified, there'll be a new snapshot taken to initiate the backup creation. */
export interface CreateProjectsLocationsBackupVaultsBackupsRequest {
  /** Required. The NetApp backupVault to create the backups of, in the format `projects/* /locations/* /backupVaults/{backup_vault_id}` */
  parent: string;
  /** Required. The ID to use for the backup. The ID must be unique within the specified backupVault. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. */
  backupId?: string;
  /** Request body */
  body?: Backup;
}

export const CreateProjectsLocationsBackupVaultsBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  backupId: Schema.optional(Schema.String).pipe(T.HttpQuery("backupId")),
  body: Schema.optional(Backup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/backups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBackupVaultsBackupsRequest>;

export type CreateProjectsLocationsBackupVaultsBackupsResponse = Operation;
export const CreateProjectsLocationsBackupVaultsBackupsResponse = Operation;

export type CreateProjectsLocationsBackupVaultsBackupsError = CommonErrors;

export const createProjectsLocationsBackupVaultsBackups: API.OperationMethod<CreateProjectsLocationsBackupVaultsBackupsRequest, CreateProjectsLocationsBackupVaultsBackupsResponse, CreateProjectsLocationsBackupVaultsBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBackupVaultsBackupsRequest,
  output: CreateProjectsLocationsBackupVaultsBackupsResponse,
  errors: [],
}));

/** Returns the description of the specified backup */
export interface GetProjectsLocationsBackupVaultsBackupsRequest {
  /** Required. The backup resource name, in the format `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}/backups/{backup_id}` */
  name: string;
}

export const GetProjectsLocationsBackupVaultsBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackupVaultsBackupsRequest>;

export type GetProjectsLocationsBackupVaultsBackupsResponse = Backup;
export const GetProjectsLocationsBackupVaultsBackupsResponse = Backup;

export type GetProjectsLocationsBackupVaultsBackupsError = CommonErrors;

export const getProjectsLocationsBackupVaultsBackups: API.OperationMethod<GetProjectsLocationsBackupVaultsBackupsRequest, GetProjectsLocationsBackupVaultsBackupsResponse, GetProjectsLocationsBackupVaultsBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackupVaultsBackupsRequest,
  output: GetProjectsLocationsBackupVaultsBackupsResponse,
  errors: [],
}));

/** Returns descriptions of all backups for a backupVault. */
export interface ListProjectsLocationsBackupVaultsBackupsRequest {
  /** Required. The backupVault for which to retrieve backup information, in the format `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}`. To retrieve backup information for all locations, use "-" for the `{location}` value. To retrieve backup information for all backupVaults, use "-" for the `{backup_vault_id}` value. To retrieve backup information for a volume, use "-" for the `{backup_vault_id}` value and specify volume full name with the filter. */
  parent: string;
  /** The maximum number of items to return. The service may return fewer than this value. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** The next_page_token value to use if there are additional results to retrieve for this list request. */
  pageToken?: string;
  /** Sort results. Supported values are "name", "name desc" or "" (unsorted). */
  orderBy?: string;
  /** The standard list filter. If specified, backups will be returned based on the attribute name that matches the filter expression. If empty, then no backups are filtered out. See https://google.aip.dev/160 */
  filter?: string;
}

export const ListProjectsLocationsBackupVaultsBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/backups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackupVaultsBackupsRequest>;

export type ListProjectsLocationsBackupVaultsBackupsResponse = ListBackupsResponse;
export const ListProjectsLocationsBackupVaultsBackupsResponse = ListBackupsResponse;

export type ListProjectsLocationsBackupVaultsBackupsError = CommonErrors;

export const listProjectsLocationsBackupVaultsBackups = API.makePaginated(() => ({
  input: ListProjectsLocationsBackupVaultsBackupsRequest,
  output: ListProjectsLocationsBackupVaultsBackupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Warning! This operation will permanently delete the backup. */
export interface DeleteProjectsLocationsBackupVaultsBackupsRequest {
  /** Required. The backup resource name, in the format `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}/backups/{backup_id}` */
  name: string;
}

export const DeleteProjectsLocationsBackupVaultsBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackupVaultsBackupsRequest>;

export type DeleteProjectsLocationsBackupVaultsBackupsResponse = Operation;
export const DeleteProjectsLocationsBackupVaultsBackupsResponse = Operation;

export type DeleteProjectsLocationsBackupVaultsBackupsError = CommonErrors;

export const deleteProjectsLocationsBackupVaultsBackups: API.OperationMethod<DeleteProjectsLocationsBackupVaultsBackupsRequest, DeleteProjectsLocationsBackupVaultsBackupsResponse, DeleteProjectsLocationsBackupVaultsBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBackupVaultsBackupsRequest,
  output: DeleteProjectsLocationsBackupVaultsBackupsResponse,
  errors: [],
}));

/** Update backup with full spec. */
export interface PatchProjectsLocationsBackupVaultsBackupsRequest {
  /** Identifier. The resource name of the backup. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}/backups/{backup_id}`. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the Backup resource to be updated. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: Backup;
}

export const PatchProjectsLocationsBackupVaultsBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Backup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/backups/{backupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackupVaultsBackupsRequest>;

export type PatchProjectsLocationsBackupVaultsBackupsResponse = Operation;
export const PatchProjectsLocationsBackupVaultsBackupsResponse = Operation;

export type PatchProjectsLocationsBackupVaultsBackupsError = CommonErrors;

export const patchProjectsLocationsBackupVaultsBackups: API.OperationMethod<PatchProjectsLocationsBackupVaultsBackupsRequest, PatchProjectsLocationsBackupVaultsBackupsResponse, PatchProjectsLocationsBackupVaultsBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBackupVaultsBackupsRequest,
  output: PatchProjectsLocationsBackupVaultsBackupsResponse,
  errors: [],
}));

/** Creates new backup policy */
export interface CreateProjectsLocationsBackupPoliciesRequest {
  /** Required. The location to create the backup policies of, in the format `projects/{project_id}/locations/{location}` */
  parent: string;
  /** Required. The ID to use for the backup policy. The ID must be unique within the specified location. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. */
  backupPolicyId?: string;
  /** Request body */
  body?: BackupPolicy;
}

export const CreateProjectsLocationsBackupPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  backupPolicyId: Schema.optional(Schema.String).pipe(T.HttpQuery("backupPolicyId")),
  body: Schema.optional(BackupPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBackupPoliciesRequest>;

export type CreateProjectsLocationsBackupPoliciesResponse = Operation;
export const CreateProjectsLocationsBackupPoliciesResponse = Operation;

export type CreateProjectsLocationsBackupPoliciesError = CommonErrors;

export const createProjectsLocationsBackupPolicies: API.OperationMethod<CreateProjectsLocationsBackupPoliciesRequest, CreateProjectsLocationsBackupPoliciesResponse, CreateProjectsLocationsBackupPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBackupPoliciesRequest,
  output: CreateProjectsLocationsBackupPoliciesResponse,
  errors: [],
}));

/** Returns the description of the specified backup policy by backup_policy_id. */
export interface GetProjectsLocationsBackupPoliciesRequest {
  /** Required. The backupPolicy resource name, in the format `projects/{project_id}/locations/{location}/backupPolicies/{backup_policy_id}` */
  name: string;
}

export const GetProjectsLocationsBackupPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPolicies/{backupPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackupPoliciesRequest>;

export type GetProjectsLocationsBackupPoliciesResponse = BackupPolicy;
export const GetProjectsLocationsBackupPoliciesResponse = BackupPolicy;

export type GetProjectsLocationsBackupPoliciesError = CommonErrors;

export const getProjectsLocationsBackupPolicies: API.OperationMethod<GetProjectsLocationsBackupPoliciesRequest, GetProjectsLocationsBackupPoliciesResponse, GetProjectsLocationsBackupPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackupPoliciesRequest,
  output: GetProjectsLocationsBackupPoliciesResponse,
  errors: [],
}));

/** Returns list of all available backup policies. */
export interface ListProjectsLocationsBackupPoliciesRequest {
  /** Required. Parent value for ListBackupPoliciesRequest */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Filtering results */
  filter?: string;
  /** Hint for how to order the results */
  orderBy?: string;
}

export const ListProjectsLocationsBackupPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPolicies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackupPoliciesRequest>;

export type ListProjectsLocationsBackupPoliciesResponse = ListBackupPoliciesResponse;
export const ListProjectsLocationsBackupPoliciesResponse = ListBackupPoliciesResponse;

export type ListProjectsLocationsBackupPoliciesError = CommonErrors;

export const listProjectsLocationsBackupPolicies = API.makePaginated(() => ({
  input: ListProjectsLocationsBackupPoliciesRequest,
  output: ListProjectsLocationsBackupPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates settings of a specific backup policy. */
export interface PatchProjectsLocationsBackupPoliciesRequest {
  /** Identifier. The resource name of the backup policy. Format: `projects/{project_id}/locations/{location}/backupPolicies/{backup_policy_id}`. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the Backup Policy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: BackupPolicy;
}

export const PatchProjectsLocationsBackupPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(BackupPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPolicies/{backupPoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackupPoliciesRequest>;

export type PatchProjectsLocationsBackupPoliciesResponse = Operation;
export const PatchProjectsLocationsBackupPoliciesResponse = Operation;

export type PatchProjectsLocationsBackupPoliciesError = CommonErrors;

export const patchProjectsLocationsBackupPolicies: API.OperationMethod<PatchProjectsLocationsBackupPoliciesRequest, PatchProjectsLocationsBackupPoliciesResponse, PatchProjectsLocationsBackupPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBackupPoliciesRequest,
  output: PatchProjectsLocationsBackupPoliciesResponse,
  errors: [],
}));

/** Warning! This operation will permanently delete the backup policy. */
export interface DeleteProjectsLocationsBackupPoliciesRequest {
  /** Required. The backup policy resource name, in the format `projects/{project_id}/locations/{location}/backupPolicies/{backup_policy_id}` */
  name: string;
}

export const DeleteProjectsLocationsBackupPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPolicies/{backupPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackupPoliciesRequest>;

export type DeleteProjectsLocationsBackupPoliciesResponse = Operation;
export const DeleteProjectsLocationsBackupPoliciesResponse = Operation;

export type DeleteProjectsLocationsBackupPoliciesError = CommonErrors;

export const deleteProjectsLocationsBackupPolicies: API.OperationMethod<DeleteProjectsLocationsBackupPoliciesRequest, DeleteProjectsLocationsBackupPoliciesResponse, DeleteProjectsLocationsBackupPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBackupPoliciesRequest,
  output: DeleteProjectsLocationsBackupPoliciesResponse,
  errors: [],
}));

/** Returns a list of host groups in a `location`. Use `-` as location to list host groups across all locations. */
export interface ListProjectsLocationsHostGroupsRequest {
  /** Required. Parent value for ListHostGroupsRequest */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filter to apply to the request. */
  filter?: string;
  /** Optional. Hint for how to order the results */
  orderBy?: string;
}

export const ListProjectsLocationsHostGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/hostGroups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsHostGroupsRequest>;

export type ListProjectsLocationsHostGroupsResponse = ListHostGroupsResponse;
export const ListProjectsLocationsHostGroupsResponse = ListHostGroupsResponse;

export type ListProjectsLocationsHostGroupsError = CommonErrors;

export const listProjectsLocationsHostGroups = API.makePaginated(() => ({
  input: ListProjectsLocationsHostGroupsRequest,
  output: ListProjectsLocationsHostGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns details of the specified host group. */
export interface GetProjectsLocationsHostGroupsRequest {
  /** Required. The resource name of the host group. Format: `projects/{project_number}/locations/{location_id}/hostGroups/{host_group_id}`. */
  name: string;
}

export const GetProjectsLocationsHostGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/hostGroups/{hostGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsHostGroupsRequest>;

export type GetProjectsLocationsHostGroupsResponse = HostGroup;
export const GetProjectsLocationsHostGroupsResponse = HostGroup;

export type GetProjectsLocationsHostGroupsError = CommonErrors;

export const getProjectsLocationsHostGroups: API.OperationMethod<GetProjectsLocationsHostGroupsRequest, GetProjectsLocationsHostGroupsResponse, GetProjectsLocationsHostGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsHostGroupsRequest,
  output: GetProjectsLocationsHostGroupsResponse,
  errors: [],
}));

/** Creates a new host group. */
export interface CreateProjectsLocationsHostGroupsRequest {
  /** Required. Parent value for CreateHostGroupRequest */
  parent: string;
  /** Required. ID of the host group to create. Must be unique within the parent resource. Must contain only letters, numbers, and hyphen, with the first character a letter or underscore, the last a letter or underscore or a number, and a 63 character maximum. */
  hostGroupId?: string;
  /** Request body */
  body?: HostGroup;
}

export const CreateProjectsLocationsHostGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  hostGroupId: Schema.optional(Schema.String).pipe(T.HttpQuery("hostGroupId")),
  body: Schema.optional(HostGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/hostGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsHostGroupsRequest>;

export type CreateProjectsLocationsHostGroupsResponse = Operation;
export const CreateProjectsLocationsHostGroupsResponse = Operation;

export type CreateProjectsLocationsHostGroupsError = CommonErrors;

export const createProjectsLocationsHostGroups: API.OperationMethod<CreateProjectsLocationsHostGroupsRequest, CreateProjectsLocationsHostGroupsResponse, CreateProjectsLocationsHostGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsHostGroupsRequest,
  output: CreateProjectsLocationsHostGroupsResponse,
  errors: [],
}));

/** Updates an existing host group. */
export interface PatchProjectsLocationsHostGroupsRequest {
  /** Identifier. The resource name of the host group. Format: `projects/{project_number}/locations/{location_id}/hostGroups/{host_group_id}`. */
  name: string;
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: HostGroup;
}

export const PatchProjectsLocationsHostGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(HostGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/hostGroups/{hostGroupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsHostGroupsRequest>;

export type PatchProjectsLocationsHostGroupsResponse = Operation;
export const PatchProjectsLocationsHostGroupsResponse = Operation;

export type PatchProjectsLocationsHostGroupsError = CommonErrors;

export const patchProjectsLocationsHostGroups: API.OperationMethod<PatchProjectsLocationsHostGroupsRequest, PatchProjectsLocationsHostGroupsResponse, PatchProjectsLocationsHostGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsHostGroupsRequest,
  output: PatchProjectsLocationsHostGroupsResponse,
  errors: [],
}));

/** Deletes a host group. */
export interface DeleteProjectsLocationsHostGroupsRequest {
  /** Required. The resource name of the host group. Format: `projects/{project_number}/locations/{location_id}/hostGroups/{host_group_id}`. */
  name: string;
}

export const DeleteProjectsLocationsHostGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/hostGroups/{hostGroupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsHostGroupsRequest>;

export type DeleteProjectsLocationsHostGroupsResponse = Operation;
export const DeleteProjectsLocationsHostGroupsResponse = Operation;

export type DeleteProjectsLocationsHostGroupsError = CommonErrors;

export const deleteProjectsLocationsHostGroups: API.OperationMethod<DeleteProjectsLocationsHostGroupsRequest, DeleteProjectsLocationsHostGroupsResponse, DeleteProjectsLocationsHostGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsHostGroupsRequest,
  output: DeleteProjectsLocationsHostGroupsResponse,
  errors: [],
}));

