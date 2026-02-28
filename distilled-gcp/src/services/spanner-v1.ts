// ==========================================================================
// Cloud Spanner API (spanner v1)
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
  name: "spanner",
  version: "v1",
  rootUrl: "https://spanner.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface FreeInstanceMetadata {
  /** Output only. If present, the timestamp at which the free instance was upgraded to a provisioned instance. */
  upgradeTime?: string;
  /** Specifies the expiration behavior of a free instance. The default of ExpireBehavior is `REMOVE_AFTER_GRACE_PERIOD`. This can be modified during or after creation, and before expiration. */
  expireBehavior?: "EXPIRE_BEHAVIOR_UNSPECIFIED" | "FREE_TO_PROVISIONED" | "REMOVE_AFTER_GRACE_PERIOD" | (string & {});
  /** Output only. Timestamp after which the instance will either be upgraded or scheduled for deletion after a grace period. ExpireBehavior is used to choose between upgrading or scheduling the free instance for deletion. This timestamp is set during the creation of a free instance. */
  expireTime?: string;
}

export const FreeInstanceMetadata: Schema.Schema<FreeInstanceMetadata> = Schema.suspend(() => Schema.Struct({
  upgradeTime: Schema.optional(Schema.String),
  expireBehavior: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "FreeInstanceMetadata" }) as any as Schema.Schema<FreeInstanceMetadata>;

export interface AutoscalingTargets {
  /** Optional. The target high priority cpu utilization percentage that the autoscaler should be trying to achieve for the instance. This number is on a scale from 0 (no utilization) to 100 (full utilization). The valid range is [10, 90] inclusive. If not specified or set to 0, the autoscaler skips scaling based on high priority CPU utilization. */
  highPriorityCpuUtilizationPercent?: number;
  /** Optional. The target total CPU utilization percentage that the autoscaler should be trying to achieve for the instance. This number is on a scale from 0 (no utilization) to 100 (full utilization). The valid range is [10, 90] inclusive. If not specified or set to 0, the autoscaler skips scaling based on total CPU utilization. If both `high_priority_cpu_utilization_percent` and `total_cpu_utilization_percent` are specified, the autoscaler provisions the larger of the two required compute capacities to satisfy both targets. */
  totalCpuUtilizationPercent?: number;
  /** Required. The target storage utilization percentage that the autoscaler should be trying to achieve for the instance. This number is on a scale from 0 (no utilization) to 100 (full utilization). The valid range is [10, 99] inclusive. */
  storageUtilizationPercent?: number;
}

export const AutoscalingTargets: Schema.Schema<AutoscalingTargets> = Schema.suspend(() => Schema.Struct({
  highPriorityCpuUtilizationPercent: Schema.optional(Schema.Number),
  totalCpuUtilizationPercent: Schema.optional(Schema.Number),
  storageUtilizationPercent: Schema.optional(Schema.Number),
})).annotate({ identifier: "AutoscalingTargets" }) as any as Schema.Schema<AutoscalingTargets>;

export interface AutoscalingLimits {
  /** Maximum number of processing units allocated to the instance. If set, this number should be multiples of 1000 and be greater than or equal to min_processing_units. */
  maxProcessingUnits?: number;
  /** Maximum number of nodes allocated to the instance. If set, this number should be greater than or equal to min_nodes. */
  maxNodes?: number;
  /** Minimum number of processing units allocated to the instance. If set, this number should be multiples of 1000. */
  minProcessingUnits?: number;
  /** Minimum number of nodes allocated to the instance. If set, this number should be greater than or equal to 1. */
  minNodes?: number;
}

export const AutoscalingLimits: Schema.Schema<AutoscalingLimits> = Schema.suspend(() => Schema.Struct({
  maxProcessingUnits: Schema.optional(Schema.Number),
  maxNodes: Schema.optional(Schema.Number),
  minProcessingUnits: Schema.optional(Schema.Number),
  minNodes: Schema.optional(Schema.Number),
})).annotate({ identifier: "AutoscalingLimits" }) as any as Schema.Schema<AutoscalingLimits>;

export interface AutoscalingConfigOverrides {
  /** Optional. If specified, overrides the min/max limit in the top-level autoscaling configuration for the selected replicas. */
  autoscalingLimits?: AutoscalingLimits;
  /** Optional. If specified, overrides the autoscaling target high_priority_cpu_utilization_percent in the top-level autoscaling configuration for the selected replicas. */
  autoscalingTargetHighPriorityCpuUtilizationPercent?: number;
  /** Optional. If true, disables high priority CPU autoscaling for the selected replicas and ignores high_priority_cpu_utilization_percent in the top-level autoscaling configuration. When setting this field to true, setting autoscaling_target_high_priority_cpu_utilization_percent field to a non-zero value for the same replica is not supported. If false, the autoscaling_target_high_priority_cpu_utilization_percent field in the replica will be used if set to a non-zero value. Otherwise, the high_priority_cpu_utilization_percent field in the top-level autoscaling configuration will be used. Setting both disable_high_priority_cpu_autoscaling and disable_total_cpu_autoscaling to true for the same replica is not supported. */
  disableHighPriorityCpuAutoscaling?: boolean;
  /** Optional. If true, disables total CPU autoscaling for the selected replicas and ignores total_cpu_utilization_percent in the top-level autoscaling configuration. When setting this field to true, setting autoscaling_target_total_cpu_utilization_percent field to a non-zero value for the same replica is not supported. If false, the autoscaling_target_total_cpu_utilization_percent field in the replica will be used if set to a non-zero value. Otherwise, the total_cpu_utilization_percent field in the top-level autoscaling configuration will be used. Setting both disable_high_priority_cpu_autoscaling and disable_total_cpu_autoscaling to true for the same replica is not supported. */
  disableTotalCpuAutoscaling?: boolean;
  /** Optional. If specified, overrides the autoscaling target `total_cpu_utilization_percent` in the top-level autoscaling configuration for the selected replicas. */
  autoscalingTargetTotalCpuUtilizationPercent?: number;
}

export const AutoscalingConfigOverrides: Schema.Schema<AutoscalingConfigOverrides> = Schema.suspend(() => Schema.Struct({
  autoscalingLimits: Schema.optional(AutoscalingLimits),
  autoscalingTargetHighPriorityCpuUtilizationPercent: Schema.optional(Schema.Number),
  disableHighPriorityCpuAutoscaling: Schema.optional(Schema.Boolean),
  disableTotalCpuAutoscaling: Schema.optional(Schema.Boolean),
  autoscalingTargetTotalCpuUtilizationPercent: Schema.optional(Schema.Number),
})).annotate({ identifier: "AutoscalingConfigOverrides" }) as any as Schema.Schema<AutoscalingConfigOverrides>;

export interface InstanceReplicaSelection {
  /** Required. Name of the location of the replicas (for example, "us-central1"). */
  location?: string;
}

export const InstanceReplicaSelection: Schema.Schema<InstanceReplicaSelection> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "InstanceReplicaSelection" }) as any as Schema.Schema<InstanceReplicaSelection>;

export interface AsymmetricAutoscalingOption {
  /** Optional. Overrides applied to the top-level autoscaling configuration for the selected replicas. */
  overrides?: AutoscalingConfigOverrides;
  /** Required. Selects the replicas to which this AsymmetricAutoscalingOption applies. Only read-only replicas are supported. */
  replicaSelection?: InstanceReplicaSelection;
}

export const AsymmetricAutoscalingOption: Schema.Schema<AsymmetricAutoscalingOption> = Schema.suspend(() => Schema.Struct({
  overrides: Schema.optional(AutoscalingConfigOverrides),
  replicaSelection: Schema.optional(InstanceReplicaSelection),
})).annotate({ identifier: "AsymmetricAutoscalingOption" }) as any as Schema.Schema<AsymmetricAutoscalingOption>;

export interface AutoscalingConfig {
  /** Required. The autoscaling targets for an instance. */
  autoscalingTargets?: AutoscalingTargets;
  /** Optional. Optional asymmetric autoscaling options. Replicas matching the replica selection criteria will be autoscaled independently from other replicas. The autoscaler will scale the replicas based on the utilization of replicas identified by the replica selection. Replica selections should not overlap with each other. Other replicas (those do not match any replica selection) will be autoscaled together and will have the same compute capacity allocated to them. */
  asymmetricAutoscalingOptions?: Array<AsymmetricAutoscalingOption>;
  /** Required. Autoscaling limits for an instance. */
  autoscalingLimits?: AutoscalingLimits;
}

export const AutoscalingConfig: Schema.Schema<AutoscalingConfig> = Schema.suspend(() => Schema.Struct({
  autoscalingTargets: Schema.optional(AutoscalingTargets),
  asymmetricAutoscalingOptions: Schema.optional(Schema.Array(AsymmetricAutoscalingOption)),
  autoscalingLimits: Schema.optional(AutoscalingLimits),
})).annotate({ identifier: "AutoscalingConfig" }) as any as Schema.Schema<AutoscalingConfig>;

export interface ReplicaComputeCapacity {
  /** The number of processing units allocated to each replica. This may be zero in API responses for instances that are not yet in state `READY`. */
  processingUnits?: number;
  /** Required. Identifies replicas by specified properties. All replicas in the selection have the same amount of compute capacity. */
  replicaSelection?: InstanceReplicaSelection;
  /** The number of nodes allocated to each replica. This may be zero in API responses for instances that are not yet in state `READY`. */
  nodeCount?: number;
}

export const ReplicaComputeCapacity: Schema.Schema<ReplicaComputeCapacity> = Schema.suspend(() => Schema.Struct({
  processingUnits: Schema.optional(Schema.Number),
  replicaSelection: Schema.optional(InstanceReplicaSelection),
  nodeCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "ReplicaComputeCapacity" }) as any as Schema.Schema<ReplicaComputeCapacity>;

export interface Instance {
  /** Output only. The time at which the instance was created. */
  createTime?: string;
  /** Output only. The current instance state. For CreateInstance, the state must be either omitted or set to `CREATING`. For UpdateInstance, the state must be either omitted or set to `READY`. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | (string & {});
  /** Cloud Labels are a flexible and lightweight mechanism for organizing cloud resources into groups that reflect a customer's organizational needs and deployment strategies. Cloud Labels can be used to filter collections of resources. They can be used to control how resource metrics are aggregated. And they can be used as arguments to policy management rules (e.g. route, firewall, load balancing, etc.). * Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `a-z{0,62}`. * Label values must be between 0 and 63 characters long and must conform to the regular expression `[a-z0-9_-]{0,63}`. * No more than 64 labels can be associated with a given resource. See https://goo.gl/xmQnxf for more information on and examples of labels. If you plan to use labels in your own code, please note that additional characters may be allowed in the future. And so you are advised to use an internal label representation, such as JSON, which doesn't rely upon specific characters being disallowed. For example, representing labels as the string: name + "_" + value would prove problematic if we were to allow "_" in a future release. */
  labels?: Record<string, string>;
  /** Required. A unique identifier for the instance, which cannot be changed after the instance is created. Values are of the form `projects//instances/a-z*[a-z0-9]`. The final segment of the name must be between 2 and 64 characters in length. */
  name?: string;
  /** Free instance metadata. Only populated for free instances. */
  freeInstanceMetadata?: FreeInstanceMetadata;
  /** Optional. The autoscaling configuration. Autoscaling is enabled if this field is set. When autoscaling is enabled, node_count and processing_units are treated as OUTPUT_ONLY fields and reflect the current compute capacity allocated to the instance. */
  autoscalingConfig?: AutoscalingConfig;
  /** Output only. The time at which the instance was most recently updated. */
  updateTime?: string;
  /** Required. The descriptive name for this instance as it appears in UIs. Must be unique per project and between 4 and 30 characters in length. */
  displayName?: string;
  /** Required. The name of the instance's configuration. Values are of the form `projects//instanceConfigs/`. See also InstanceConfig and ListInstanceConfigs. */
  config?: string;
  /** Output only. Lists the compute capacity per ReplicaSelection. A replica selection identifies a set of replicas with common properties. Replicas identified by a ReplicaSelection are scaled with the same compute capacity. */
  replicaComputeCapacity?: Array<ReplicaComputeCapacity>;
  /** The number of processing units allocated to this instance. At most, one of either `processing_units` or `node_count` should be present in the message. Users can set the `processing_units` field to specify the target number of processing units allocated to the instance. If autoscaling is enabled, `processing_units` is treated as an `OUTPUT_ONLY` field and reflects the current number of processing units allocated to the instance. This might be zero in API responses for instances that are not yet in the `READY` state. If the instance has varying processing units per replica (achieved by setting `asymmetric_autoscaling_options` in the autoscaling configuration), the `processing_units` set here is the maximum processing units across all replicas. For more information, see [Compute capacity, nodes and processing units](https://cloud.google.com/spanner/docs/compute-capacity). */
  processingUnits?: number;
  /** Deprecated. This field is not populated. */
  endpointUris?: Array<string>;
  /** Optional. The `Edition` of the current instance. */
  edition?: "EDITION_UNSPECIFIED" | "STANDARD" | "ENTERPRISE" | "ENTERPRISE_PLUS" | (string & {});
  /** The number of nodes allocated to this instance. At most, one of either `node_count` or `processing_units` should be present in the message. Users can set the `node_count` field to specify the target number of nodes allocated to the instance. If autoscaling is enabled, `node_count` is treated as an `OUTPUT_ONLY` field and reflects the current number of nodes allocated to the instance. This might be zero in API responses for instances that are not yet in the `READY` state. If the instance has varying node count across replicas (achieved by setting `asymmetric_autoscaling_options` in the autoscaling configuration), the `node_count` set here is the maximum node count across all replicas. For more information, see [Compute capacity, nodes, and processing units](https://cloud.google.com/spanner/docs/compute-capacity). */
  nodeCount?: number;
  /** The `InstanceType` of the current instance. */
  instanceType?: "INSTANCE_TYPE_UNSPECIFIED" | "PROVISIONED" | "FREE_INSTANCE" | (string & {});
  /** Optional. Controls the default backup schedule behavior for new databases within the instance. By default, a backup schedule is created automatically when a new database is created in a new instance. Note that the `AUTOMATIC` value isn't permitted for free instances, as backups and backup schedules aren't supported for free instances. In the `GetInstance` or `ListInstances` response, if the value of `default_backup_schedule_type` isn't set, or set to `NONE`, Spanner doesn't create a default backup schedule for new databases in the instance. */
  defaultBackupScheduleType?: "DEFAULT_BACKUP_SCHEDULE_TYPE_UNSPECIFIED" | "NONE" | "AUTOMATIC" | (string & {});
}

export const Instance: Schema.Schema<Instance> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.optional(Schema.String),
  freeInstanceMetadata: Schema.optional(FreeInstanceMetadata),
  autoscalingConfig: Schema.optional(AutoscalingConfig),
  updateTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  config: Schema.optional(Schema.String),
  replicaComputeCapacity: Schema.optional(Schema.Array(ReplicaComputeCapacity)),
  processingUnits: Schema.optional(Schema.Number),
  endpointUris: Schema.optional(Schema.Array(Schema.String)),
  edition: Schema.optional(Schema.String),
  nodeCount: Schema.optional(Schema.Number),
  instanceType: Schema.optional(Schema.String),
  defaultBackupScheduleType: Schema.optional(Schema.String),
})).annotate({ identifier: "Instance" }) as any as Schema.Schema<Instance>;

export interface CreateInstanceMetadata {
  /** The expected fulfillment period of this create operation. */
  expectedFulfillmentPeriod?: "FULFILLMENT_PERIOD_UNSPECIFIED" | "FULFILLMENT_PERIOD_NORMAL" | "FULFILLMENT_PERIOD_EXTENDED" | (string & {});
  /** The instance being created. */
  instance?: Instance;
  /** The time at which this operation was cancelled. If set, this operation is in the process of undoing itself (which is guaranteed to succeed) and cannot be cancelled again. */
  cancelTime?: string;
  /** The time at which the CreateInstance request was received. */
  startTime?: string;
  /** The time at which this operation failed or was completed successfully. */
  endTime?: string;
}

export const CreateInstanceMetadata: Schema.Schema<CreateInstanceMetadata> = Schema.suspend(() => Schema.Struct({
  expectedFulfillmentPeriod: Schema.optional(Schema.String),
  instance: Schema.optional(Instance),
  cancelTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateInstanceMetadata" }) as any as Schema.Schema<CreateInstanceMetadata>;

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> = Schema.suspend(() => Schema.Struct({
  requestedPolicyVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GetPolicyOptions" }) as any as Schema.Schema<GetPolicyOptions>;

export interface BackupInstancePartition {
  /** A unique identifier for the instance partition. Values are of the form `projects//instances//instancePartitions/` */
  instancePartition?: string;
}

export const BackupInstancePartition: Schema.Schema<BackupInstancePartition> = Schema.suspend(() => Schema.Struct({
  instancePartition: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupInstancePartition" }) as any as Schema.Schema<BackupInstancePartition>;

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface EncryptionInfo {
  /** Output only. A Cloud KMS key version that is being used to protect the database or backup. */
  kmsKeyVersion?: string;
  /** Output only. The type of encryption. */
  encryptionType?: "TYPE_UNSPECIFIED" | "GOOGLE_DEFAULT_ENCRYPTION" | "CUSTOMER_MANAGED_ENCRYPTION" | (string & {});
  /** Output only. If present, the status of a recent encrypt/decrypt call on underlying data for this database or backup. Regardless of status, data is always encrypted at rest. */
  encryptionStatus?: Status;
}

export const EncryptionInfo: Schema.Schema<EncryptionInfo> = Schema.suspend(() => Schema.Struct({
  kmsKeyVersion: Schema.optional(Schema.String),
  encryptionType: Schema.optional(Schema.String),
  encryptionStatus: Schema.optional(Status),
})).annotate({ identifier: "EncryptionInfo" }) as any as Schema.Schema<EncryptionInfo>;

export interface Backup {
  /** Output only. The instance partition storing the backup. This is the same as the list of the instance partitions that the database recorded at the backup's `version_time`. */
  instancePartitions?: Array<BackupInstancePartition>;
  /** Output only. Size of the backup in bytes. For a backup in an incremental backup chain, this is the sum of the `exclusive_size_bytes` of itself and all older backups in the chain. */
  sizeBytes?: string;
  /** The backup will contain an externally consistent copy of the database at the timestamp specified by `version_time`. If `version_time` is not specified, the system will set `version_time` to the `create_time` of the backup. */
  versionTime?: string;
  /** Output only. The encryption information for the backup. */
  encryptionInfo?: EncryptionInfo;
  /** Output only. The encryption information for the backup, whether it is protected by one or more KMS keys. The information includes all Cloud KMS key versions used to encrypt the backup. The `encryption_status` field inside of each `EncryptionInfo` is not populated. At least one of the key versions must be available for the backup to be restored. If a key version is revoked in the middle of a restore, the restore behavior is undefined. */
  encryptionInformation?: Array<EncryptionInfo>;
  /** Required for the CreateBackup operation. The expiration time of the backup, with microseconds granularity that must be at least 6 hours and at most 366 days from the time the CreateBackup request is processed. Once the `expire_time` has passed, the backup is eligible to be automatically deleted by Cloud Spanner to free the resources used by the backup. */
  expireTime?: string;
  /** Required for the CreateBackup operation. Name of the database from which this backup was created. This needs to be in the same instance as the backup. Values are of the form `projects//instances//databases/`. */
  database?: string;
  /** Output only. Data deleted at a time older than this is guaranteed not to be retained in order to support this backup. For a backup in an incremental backup chain, this is the version time of the oldest backup that exists or ever existed in the chain. For all other backups, this is the version time of the backup. This field can be used to understand what data is being retained by the backup system. */
  oldestVersionTime?: string;
  /** Output only. The names of the restored databases that reference the backup. The database names are of the form `projects//instances//databases/`. Referencing databases may exist in different instances. The existence of any referencing database prevents the backup from being deleted. When a restored database from the backup enters the `READY` state, the reference to the backup is removed. */
  referencingDatabases?: Array<string>;
  /** Output only. The current state of the backup. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | (string & {});
  /** Output only. Populated only for backups in an incremental backup chain. Backups share the same chain id if and only if they belong to the same incremental backup chain. Use this field to determine which backups are part of the same incremental backup chain. The ordering of backups in the chain can be determined by ordering the backup `version_time`. */
  incrementalBackupChainId?: string;
  /** Output only. The number of bytes that will be freed by deleting this backup. This value will be zero if, for example, this backup is part of an incremental backup chain and younger backups in the chain require that we keep its data. For backups not in an incremental backup chain, this is always the size of the backup. This value may change if backups on the same chain get created, deleted or expired. */
  freeableSizeBytes?: string;
  /** Output only for the CreateBackup operation. Required for the UpdateBackup operation. A globally unique identifier for the backup which cannot be changed. Values are of the form `projects//instances//backups/a-z*[a-z0-9]` The final segment of the name must be between 2 and 60 characters in length. The backup is stored in the location(s) specified in the instance configuration of the instance containing the backup, identified by the prefix of the backup name of the form `projects//instances/`. */
  name?: string;
  /** Output only. The time the CreateBackup request is received. If the request does not specify `version_time`, the `version_time` of the backup will be equivalent to the `create_time`. */
  createTime?: string;
  /** Output only. The database dialect information for the backup. */
  databaseDialect?: "DATABASE_DIALECT_UNSPECIFIED" | "GOOGLE_STANDARD_SQL" | "POSTGRESQL" | (string & {});
  /** Output only. The minimum edition required to successfully restore the backup. Populated only if the edition is Enterprise or Enterprise Plus. */
  minimumRestorableEdition?: "EDITION_UNSPECIFIED" | "STANDARD" | "ENTERPRISE" | "ENTERPRISE_PLUS" | (string & {});
  /** Output only. For a backup in an incremental backup chain, this is the storage space needed to keep the data that has changed since the previous backup. For all other backups, this is always the size of the backup. This value may change if backups on the same chain get deleted or expired. This field can be used to calculate the total storage space used by a set of backups. For example, the total space used by all backups of a database can be computed by summing up this field. */
  exclusiveSizeBytes?: string;
  /** Output only. List of backup schedule URIs that are associated with creating this backup. This is only applicable for scheduled backups, and is empty for on-demand backups. To optimize for storage, whenever possible, multiple schedules are collapsed together to create one backup. In such cases, this field captures the list of all backup schedule URIs that are associated with creating this backup. If collapsing is not done, then this field captures the single backup schedule URI associated with creating this backup. */
  backupSchedules?: Array<string>;
  /** Output only. The names of the destination backups being created by copying this source backup. The backup names are of the form `projects//instances//backups/`. Referencing backups may exist in different instances. The existence of any referencing backup prevents the backup from being deleted. When the copy operation is done (either successfully completed or cancelled or the destination backup is deleted), the reference to the backup is removed. */
  referencingBackups?: Array<string>;
  /** Output only. The max allowed expiration time of the backup, with microseconds granularity. A backup's expiration time can be configured in multiple APIs: CreateBackup, UpdateBackup, CopyBackup. When updating or copying an existing backup, the expiration time specified must be less than `Backup.max_expire_time`. */
  maxExpireTime?: string;
}

export const Backup: Schema.Schema<Backup> = Schema.suspend(() => Schema.Struct({
  instancePartitions: Schema.optional(Schema.Array(BackupInstancePartition)),
  sizeBytes: Schema.optional(Schema.String),
  versionTime: Schema.optional(Schema.String),
  encryptionInfo: Schema.optional(EncryptionInfo),
  encryptionInformation: Schema.optional(Schema.Array(EncryptionInfo)),
  expireTime: Schema.optional(Schema.String),
  database: Schema.optional(Schema.String),
  oldestVersionTime: Schema.optional(Schema.String),
  referencingDatabases: Schema.optional(Schema.Array(Schema.String)),
  state: Schema.optional(Schema.String),
  incrementalBackupChainId: Schema.optional(Schema.String),
  freeableSizeBytes: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  databaseDialect: Schema.optional(Schema.String),
  minimumRestorableEdition: Schema.optional(Schema.String),
  exclusiveSizeBytes: Schema.optional(Schema.String),
  backupSchedules: Schema.optional(Schema.Array(Schema.String)),
  referencingBackups: Schema.optional(Schema.Array(Schema.String)),
  maxExpireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Backup" }) as any as Schema.Schema<Backup>;

export interface TestIamPermissionsRequest {
  /** REQUIRED: The set of permissions to check for 'resource'. Permissions with wildcards (such as '*', 'spanner.*', 'spanner.instances.*') are not allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface MultiplexedSessionPrecommitToken {
  /** Opaque precommit token. */
  precommitToken?: string;
  /** An incrementing seq number is generated on every precommit token that is returned. Clients should remember the precommit token with the highest sequence number from the current transaction attempt. */
  seqNum?: number;
}

export const MultiplexedSessionPrecommitToken: Schema.Schema<MultiplexedSessionPrecommitToken> = Schema.suspend(() => Schema.Struct({
  precommitToken: Schema.optional(Schema.String),
  seqNum: Schema.optional(Schema.Number),
})).annotate({ identifier: "MultiplexedSessionPrecommitToken" }) as any as Schema.Schema<MultiplexedSessionPrecommitToken>;

export interface CommitStats {
  /** The total number of mutations for the transaction. Knowing the `mutation_count` value can help you maximize the number of mutations in a transaction and minimize the number of API round trips. You can also monitor this value to prevent transactions from exceeding the system [limit](https://cloud.google.com/spanner/quotas#limits_for_creating_reading_updating_and_deleting_data). If the number of mutations exceeds the limit, the server returns [INVALID_ARGUMENT](https://cloud.google.com/spanner/docs/reference/rest/v1/Code#ENUM_VALUES.INVALID_ARGUMENT). */
  mutationCount?: string;
}

export const CommitStats: Schema.Schema<CommitStats> = Schema.suspend(() => Schema.Struct({
  mutationCount: Schema.optional(Schema.String),
})).annotate({ identifier: "CommitStats" }) as any as Schema.Schema<CommitStats>;

export interface CommitResponse {
  /** If specified, transaction has not committed yet. You must retry the commit with the new precommit token. */
  precommitToken?: MultiplexedSessionPrecommitToken;
  /** The statistics about this `Commit`. Not returned by default. For more information, see CommitRequest.return_commit_stats. */
  commitStats?: CommitStats;
  /** If `TransactionOptions.isolation_level` is set to `IsolationLevel.REPEATABLE_READ`, then the snapshot timestamp is the timestamp at which all reads in the transaction ran. This timestamp is never returned. */
  snapshotTimestamp?: string;
  /** The Cloud Spanner timestamp at which the transaction committed. */
  commitTimestamp?: string;
}

export const CommitResponse: Schema.Schema<CommitResponse> = Schema.suspend(() => Schema.Struct({
  precommitToken: Schema.optional(MultiplexedSessionPrecommitToken),
  commitStats: Schema.optional(CommitStats),
  snapshotTimestamp: Schema.optional(Schema.String),
  commitTimestamp: Schema.optional(Schema.String),
})).annotate({ identifier: "CommitResponse" }) as any as Schema.Schema<CommitResponse>;

export interface UpdateInstanceMetadata {
  /** The time at which this operation was cancelled. If set, this operation is in the process of undoing itself (which is guaranteed to succeed) and cannot be cancelled again. */
  cancelTime?: string;
  /** The time at which this operation failed or was completed successfully. */
  endTime?: string;
  /** The time at which UpdateInstance request was received. */
  startTime?: string;
  /** The expected fulfillment period of this update operation. */
  expectedFulfillmentPeriod?: "FULFILLMENT_PERIOD_UNSPECIFIED" | "FULFILLMENT_PERIOD_NORMAL" | "FULFILLMENT_PERIOD_EXTENDED" | (string & {});
  /** The desired end state of the update. */
  instance?: Instance;
}

export const UpdateInstanceMetadata: Schema.Schema<UpdateInstanceMetadata> = Schema.suspend(() => Schema.Struct({
  cancelTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  expectedFulfillmentPeriod: Schema.optional(Schema.String),
  instance: Schema.optional(Instance),
})).annotate({ identifier: "UpdateInstanceMetadata" }) as any as Schema.Schema<UpdateInstanceMetadata>;

export interface ModValue {
  /** The value of the column. */
  value?: unknown;
  /** Index within the repeated column_metadata field, to obtain the column metadata for the column that was modified. */
  columnMetadataIndex?: number;
}

export const ModValue: Schema.Schema<ModValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Unknown),
  columnMetadataIndex: Schema.optional(Schema.Number),
})).annotate({ identifier: "ModValue" }) as any as Schema.Schema<ModValue>;

export interface Mod {
  /** Returns the new values after the change for the modified columns. Always empty for DELETE. */
  newValues?: Array<ModValue>;
  /** Returns the old values before the change for the modified columns. Always empty for INSERT, or if old values are not being captured specified by value_capture_type. */
  oldValues?: Array<ModValue>;
  /** Returns the value of the primary key of the modified row. */
  keys?: Array<ModValue>;
}

export const Mod: Schema.Schema<Mod> = Schema.suspend(() => Schema.Struct({
  newValues: Schema.optional(Schema.Array(ModValue)),
  oldValues: Schema.optional(Schema.Array(ModValue)),
  keys: Schema.optional(Schema.Array(ModValue)),
})).annotate({ identifier: "Mod" }) as any as Schema.Schema<Mod>;

export interface PartitionEndRecord {
  /** End timestamp at which the change stream partition is terminated. All changes generated by this partition will have timestamps <= end_timestamp. DataChangeRecord.commit_timestamps, PartitionStartRecord.start_timestamps, PartitionEventRecord.commit_timestamps, and PartitionEndRecord.end_timestamps can have the same value in the same partition. PartitionEndRecord is the last record returned for a partition. */
  endTimestamp?: string;
  /** Record sequence numbers are unique and monotonically increasing (but not necessarily contiguous) for a specific timestamp across record types in the same partition. To guarantee ordered processing, the reader should process records (of potentially different types) in record_sequence order for a specific timestamp in the same partition. */
  recordSequence?: string;
  /** Unique partition identifier describing the terminated change stream partition. partition_token is equal to the partition token of the change stream partition currently queried to return this PartitionEndRecord. */
  partitionToken?: string;
}

export const PartitionEndRecord: Schema.Schema<PartitionEndRecord> = Schema.suspend(() => Schema.Struct({
  endTimestamp: Schema.optional(Schema.String),
  recordSequence: Schema.optional(Schema.String),
  partitionToken: Schema.optional(Schema.String),
})).annotate({ identifier: "PartitionEndRecord" }) as any as Schema.Schema<PartitionEndRecord>;

export interface Session {
  /** The database role which created this session. */
  creatorRole?: string;
  /** Output only. The name of the session. This is always system-assigned. */
  name?: string;
  /** Output only. The approximate timestamp when the session is last used. It's typically earlier than the actual last use time. */
  approximateLastUseTime?: string;
  /** Output only. The timestamp when the session is created. */
  createTime?: string;
  /** Optional. If `true`, specifies a multiplexed session. Use a multiplexed session for multiple, concurrent operations including any combination of read-only and read-write transactions. Use `sessions.create` to create multiplexed sessions. Don't use BatchCreateSessions to create a multiplexed session. You can't delete or list multiplexed sessions. */
  multiplexed?: boolean;
  /** The labels for the session. * Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. * Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. * No more than 64 labels can be associated with a given session. See https://goo.gl/xmQnxf for more information on and examples of labels. */
  labels?: Record<string, string>;
}

export const Session: Schema.Schema<Session> = Schema.suspend(() => Schema.Struct({
  creatorRole: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  approximateLastUseTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  multiplexed: Schema.optional(Schema.Boolean),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Session" }) as any as Schema.Schema<Session>;

export interface BatchCreateSessionsRequest {
  /** Required. The number of sessions to be created in this batch call. At least one session is created. The API can return fewer than the requested number of sessions. If a specific number of sessions are desired, the client can make additional calls to `BatchCreateSessions` (adjusting session_count as necessary). */
  sessionCount?: number;
  /** Parameters to apply to each created session. */
  sessionTemplate?: Session;
}

export const BatchCreateSessionsRequest: Schema.Schema<BatchCreateSessionsRequest> = Schema.suspend(() => Schema.Struct({
  sessionCount: Schema.optional(Schema.Number),
  sessionTemplate: Schema.optional(Session),
})).annotate({ identifier: "BatchCreateSessionsRequest" }) as any as Schema.Schema<BatchCreateSessionsRequest>;

export interface OperationProgress {
  /** If set, the time at which this operation failed or was completed successfully. */
  endTime?: string;
  /** Time the request was received. */
  startTime?: string;
  /** Percent completion of the operation. Values are between 0 and 100 inclusive. */
  progressPercent?: number;
}

export const OperationProgress: Schema.Schema<OperationProgress> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  progressPercent: Schema.optional(Schema.Number),
})).annotate({ identifier: "OperationProgress" }) as any as Schema.Schema<OperationProgress>;

export interface OptimizeRestoredDatabaseMetadata {
  /** Name of the restored database being optimized. */
  name?: string;
  /** The progress of the post-restore optimizations. */
  progress?: OperationProgress;
}

export const OptimizeRestoredDatabaseMetadata: Schema.Schema<OptimizeRestoredDatabaseMetadata> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  progress: Schema.optional(OperationProgress),
})).annotate({ identifier: "OptimizeRestoredDatabaseMetadata" }) as any as Schema.Schema<OptimizeRestoredDatabaseMetadata>;

export interface PartitionedDml {
}

export const PartitionedDml: Schema.Schema<PartitionedDml> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PartitionedDml" }) as any as Schema.Schema<PartitionedDml>;

export interface ReadOnly {
  /** Read data at a timestamp >= `NOW - max_staleness` seconds. Guarantees that all writes that have committed more than the specified number of seconds ago are visible. Because Cloud Spanner chooses the exact timestamp, this mode works even if the client's local clock is substantially skewed from Cloud Spanner commit timestamps. Useful for reading the freshest data available at a nearby replica, while bounding the possible staleness if the local replica has fallen behind. Note that this option can only be used in single-use transactions. */
  maxStaleness?: string;
  /** If true, the Cloud Spanner-selected read timestamp is included in the Transaction message that describes the transaction. */
  returnReadTimestamp?: boolean;
  /** Executes all reads at the given timestamp. Unlike other modes, reads at a specific timestamp are repeatable; the same read at the same timestamp always returns the same data. If the timestamp is in the future, the read is blocked until the specified timestamp, modulo the read's deadline. Useful for large scale consistent reads such as mapreduces, or for coordinating many reads against a consistent snapshot of the data. A timestamp in RFC3339 UTC \"Zulu\" format, accurate to nanoseconds. Example: `"2014-10-02T15:01:23.045123456Z"`. */
  readTimestamp?: string;
  /** Executes all reads at a timestamp that is `exact_staleness` old. The timestamp is chosen soon after the read is started. Guarantees that all writes that have committed more than the specified number of seconds ago are visible. Because Cloud Spanner chooses the exact timestamp, this mode works even if the client's local clock is substantially skewed from Cloud Spanner commit timestamps. Useful for reading at nearby replicas without the distributed timestamp negotiation overhead of `max_staleness`. */
  exactStaleness?: string;
  /** Read at a timestamp where all previously committed transactions are visible. */
  strong?: boolean;
  /** Executes all reads at a timestamp >= `min_read_timestamp`. This is useful for requesting fresher data than some previous read, or data that is fresh enough to observe the effects of some previously committed transaction whose timestamp is known. Note that this option can only be used in single-use transactions. A timestamp in RFC3339 UTC \"Zulu\" format, accurate to nanoseconds. Example: `"2014-10-02T15:01:23.045123456Z"`. */
  minReadTimestamp?: string;
}

export const ReadOnly: Schema.Schema<ReadOnly> = Schema.suspend(() => Schema.Struct({
  maxStaleness: Schema.optional(Schema.String),
  returnReadTimestamp: Schema.optional(Schema.Boolean),
  readTimestamp: Schema.optional(Schema.String),
  exactStaleness: Schema.optional(Schema.String),
  strong: Schema.optional(Schema.Boolean),
  minReadTimestamp: Schema.optional(Schema.String),
})).annotate({ identifier: "ReadOnly" }) as any as Schema.Schema<ReadOnly>;

export interface ReadWrite {
  /** Read lock mode for the transaction. */
  readLockMode?: "READ_LOCK_MODE_UNSPECIFIED" | "PESSIMISTIC" | "OPTIMISTIC" | (string & {});
  /** Optional. Clients should pass the transaction ID of the previous transaction attempt that was aborted if this transaction is being executed on a multiplexed session. */
  multiplexedSessionPreviousTransactionId?: string;
}

export const ReadWrite: Schema.Schema<ReadWrite> = Schema.suspend(() => Schema.Struct({
  readLockMode: Schema.optional(Schema.String),
  multiplexedSessionPreviousTransactionId: Schema.optional(Schema.String),
})).annotate({ identifier: "ReadWrite" }) as any as Schema.Schema<ReadWrite>;

export interface TransactionOptions {
  /** Partitioned DML transaction. Authorization to begin a Partitioned DML transaction requires `spanner.databases.beginPartitionedDmlTransaction` permission on the `session` resource. */
  partitionedDml?: PartitionedDml;
  /** Transaction does not write. Authorization to begin a read-only transaction requires `spanner.databases.beginReadOnlyTransaction` permission on the `session` resource. */
  readOnly?: ReadOnly;
  /** Transaction may write. Authorization to begin a read-write transaction requires `spanner.databases.beginOrRollbackReadWriteTransaction` permission on the `session` resource. */
  readWrite?: ReadWrite;
  /** When `exclude_txn_from_change_streams` is set to `true`, it prevents read or write transactions from being tracked in change streams. * If the DDL option `allow_txn_exclusion` is set to `true`, then the updates made within this transaction aren't recorded in the change stream. * If you don't set the DDL option `allow_txn_exclusion` or if it's set to `false`, then the updates made within this transaction are recorded in the change stream. When `exclude_txn_from_change_streams` is set to `false` or not set, modifications from this transaction are recorded in all change streams that are tracking columns modified by these transactions. The `exclude_txn_from_change_streams` option can only be specified for read-write or partitioned DML transactions, otherwise the API returns an `INVALID_ARGUMENT` error. */
  excludeTxnFromChangeStreams?: boolean;
  /** Isolation level for the transaction. */
  isolationLevel?: "ISOLATION_LEVEL_UNSPECIFIED" | "SERIALIZABLE" | "REPEATABLE_READ" | (string & {});
}

export const TransactionOptions: Schema.Schema<TransactionOptions> = Schema.suspend(() => Schema.Struct({
  partitionedDml: Schema.optional(PartitionedDml),
  readOnly: Schema.optional(ReadOnly),
  readWrite: Schema.optional(ReadWrite),
  excludeTxnFromChangeStreams: Schema.optional(Schema.Boolean),
  isolationLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "TransactionOptions" }) as any as Schema.Schema<TransactionOptions>;

export interface TransactionSelector {
  /** Execute the read or SQL query in a temporary transaction. This is the most efficient way to execute a transaction that consists of a single SQL query. */
  singleUse?: TransactionOptions;
  /** Execute the read or SQL query in a previously-started transaction. */
  id?: string;
  /** Begin a new transaction and execute this read or SQL query in it. The transaction ID of the new transaction is returned in ResultSetMetadata.transaction, which is a Transaction. */
  begin?: TransactionOptions;
}

export const TransactionSelector: Schema.Schema<TransactionSelector> = Schema.suspend(() => Schema.Struct({
  singleUse: Schema.optional(TransactionOptions),
  id: Schema.optional(Schema.String),
  begin: Schema.optional(TransactionOptions),
})).annotate({ identifier: "TransactionSelector" }) as any as Schema.Schema<TransactionSelector>;

export interface ClientContext {
  /** Optional. Map of parameter name to value for this request. These values will be returned by any SECURE_CONTEXT() calls invoked by this request (e.g., by queries against Parameterized Secure Views). */
  secureContext?: Record<string, unknown>;
}

export const ClientContext: Schema.Schema<ClientContext> = Schema.suspend(() => Schema.Struct({
  secureContext: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "ClientContext" }) as any as Schema.Schema<ClientContext>;

export interface RequestOptions {
  /** Optional. Optional context that may be needed for some requests. */
  clientContext?: ClientContext;
  /** A tag used for statistics collection about this transaction. Both `request_tag` and `transaction_tag` can be specified for a read or query that belongs to a transaction. To enable tagging on a transaction, `transaction_tag` must be set to the same value for all requests belonging to the same transaction, including BeginTransaction. If this request doesn't belong to any transaction, `transaction_tag` is ignored. Legal characters for `transaction_tag` values are all printable characters (ASCII 32 - 126) and the length of a `transaction_tag` is limited to 50 characters. Values that exceed this limit are truncated. Any leading underscore (_) characters are removed from the string. */
  transactionTag?: string;
  /** Priority for the request. */
  priority?: "PRIORITY_UNSPECIFIED" | "PRIORITY_LOW" | "PRIORITY_MEDIUM" | "PRIORITY_HIGH" | (string & {});
  /** A per-request tag which can be applied to queries or reads, used for statistics collection. Both `request_tag` and `transaction_tag` can be specified for a read or query that belongs to a transaction. This field is ignored for requests where it's not applicable (for example, `CommitRequest`). Legal characters for `request_tag` values are all printable characters (ASCII 32 - 126) and the length of a request_tag is limited to 50 characters. Values that exceed this limit are truncated. Any leading underscore (_) characters are removed from the string. */
  requestTag?: string;
}

export const RequestOptions: Schema.Schema<RequestOptions> = Schema.suspend(() => Schema.Struct({
  clientContext: Schema.optional(ClientContext),
  transactionTag: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.String),
  requestTag: Schema.optional(Schema.String),
})).annotate({ identifier: "RequestOptions" }) as any as Schema.Schema<RequestOptions>;

export interface Field {
  /** The name of the field. For reads, this is the column name. For SQL queries, it is the column alias (e.g., `"Word"` in the query `"SELECT 'hello' AS Word"`), or the column name (e.g., `"ColName"` in the query `"SELECT ColName FROM Table"`). Some columns might have an empty name (e.g., `"SELECT UPPER(ColName)"`). Note that a query result can contain multiple fields with the same name. */
  name?: string;
  /** The type of the field. */
  type?: Type;
}

export const Field: Schema.Schema<Field> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Type),
})).annotate({ identifier: "Field" }) as any as Schema.Schema<Field>;

export interface StructType {
  /** The list of fields that make up this struct. Order is significant, because values of this struct type are represented as lists, where the order of field values matches the order of fields in the StructType. In turn, the order of fields matches the order of columns in a read request, or the order of fields in the `SELECT` clause of a query. */
  fields?: Array<Field>;
}

export const StructType: Schema.Schema<StructType> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Array(Field)),
})).annotate({ identifier: "StructType" }) as any as Schema.Schema<StructType>;

export interface Type {
  /** The TypeAnnotationCode that disambiguates SQL type that Spanner will use to represent values of this type during query processing. This is necessary for some type codes because a single TypeCode can be mapped to different SQL types depending on the SQL dialect. type_annotation typically is not needed to process the content of a value (it doesn't affect serialization) and clients can ignore it on the read path. */
  typeAnnotation?: "TYPE_ANNOTATION_CODE_UNSPECIFIED" | "PG_NUMERIC" | "PG_JSONB" | "PG_OID" | (string & {});
  /** Required. The TypeCode for this type. */
  code?: "TYPE_CODE_UNSPECIFIED" | "BOOL" | "INT64" | "FLOAT64" | "FLOAT32" | "TIMESTAMP" | "DATE" | "STRING" | "BYTES" | "ARRAY" | "STRUCT" | "NUMERIC" | "JSON" | "PROTO" | "ENUM" | "INTERVAL" | "UUID" | (string & {});
  /** If code == STRUCT, then `struct_type` provides type information for the struct's fields. */
  structType?: StructType;
  /** If code == PROTO or code == ENUM, then `proto_type_fqn` is the fully qualified name of the proto type representing the proto/enum definition. */
  protoTypeFqn?: string;
  /** If code == ARRAY, then `array_element_type` is the type of the array elements. */
  arrayElementType?: Type;
}

export const Type: Schema.Schema<Type> = Schema.suspend(() => Schema.Struct({
  typeAnnotation: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  structType: Schema.optional(StructType),
  protoTypeFqn: Schema.optional(Schema.String),
  arrayElementType: Schema.optional(Type),
})).annotate({ identifier: "Type" }) as any as Schema.Schema<Type>;

export interface Statement {
  /** It isn't always possible for Cloud Spanner to infer the right SQL type from a JSON value. For example, values of type `BYTES` and values of type `STRING` both appear in params as JSON strings. In these cases, `param_types` can be used to specify the exact SQL type for some or all of the SQL statement parameters. See the definition of Type for more information about SQL types. */
  paramTypes?: Record<string, Type>;
  /** Parameter names and values that bind to placeholders in the DML string. A parameter placeholder consists of the `@` character followed by the parameter name (for example, `@firstName`). Parameter names can contain letters, numbers, and underscores. Parameters can appear anywhere that a literal value is expected. The same parameter name can be used more than once, for example: `"WHERE id > @msg_id AND id < @msg_id + 100"` It's an error to execute a SQL statement with unbound parameters. */
  params?: Record<string, unknown>;
  /** Required. The DML string. */
  sql?: string;
}

export const Statement: Schema.Schema<Statement> = Schema.suspend(() => Schema.Struct({
  paramTypes: Schema.optional(Schema.Record(Schema.String, Type)),
  params: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  sql: Schema.optional(Schema.String),
})).annotate({ identifier: "Statement" }) as any as Schema.Schema<Statement>;

export interface ExecuteBatchDmlRequest {
  /** Required. A per-transaction sequence number used to identify this request. This field makes each request idempotent such that if the request is received multiple times, at most one succeeds. The sequence number must be monotonically increasing within the transaction. If a request arrives for the first time with an out-of-order sequence number, the transaction might be aborted. Replays of previously handled requests yield the same response as the first execution. */
  seqno?: string;
  /** Required. The transaction to use. Must be a read-write transaction. To protect against replays, single-use transactions are not supported. The caller must either supply an existing transaction ID or begin a new transaction. */
  transaction?: TransactionSelector;
  /** Common options for this request. */
  requestOptions?: RequestOptions;
  /** Optional. If set to `true`, this request marks the end of the transaction. After these statements execute, you must commit or abort the transaction. Attempts to execute any other requests against this transaction (including reads and queries) are rejected. Setting this option might cause some error reporting to be deferred until commit time (for example, validation of unique constraints). Given this, successful execution of statements shouldn't be assumed until a subsequent `Commit` call completes successfully. */
  lastStatements?: boolean;
  /** Required. The list of statements to execute in this batch. Statements are executed serially, such that the effects of statement `i` are visible to statement `i+1`. Each statement must be a DML statement. Execution stops at the first failed statement; the remaining statements are not executed. Callers must provide at least one statement. */
  statements?: Array<Statement>;
}

export const ExecuteBatchDmlRequest: Schema.Schema<ExecuteBatchDmlRequest> = Schema.suspend(() => Schema.Struct({
  seqno: Schema.optional(Schema.String),
  transaction: Schema.optional(TransactionSelector),
  requestOptions: Schema.optional(RequestOptions),
  lastStatements: Schema.optional(Schema.Boolean),
  statements: Schema.optional(Schema.Array(Statement)),
})).annotate({ identifier: "ExecuteBatchDmlRequest" }) as any as Schema.Schema<ExecuteBatchDmlRequest>;

export interface CreateBackupMetadata {
  /** The name of the database the backup is created from. */
  database?: string;
  /** The name of the backup being created. */
  name?: string;
  /** The time at which cancellation of this operation was received. Operations.CancelOperation starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  cancelTime?: string;
  /** The progress of the CreateBackup operation. */
  progress?: OperationProgress;
}

export const CreateBackupMetadata: Schema.Schema<CreateBackupMetadata> = Schema.suspend(() => Schema.Struct({
  database: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  cancelTime: Schema.optional(Schema.String),
  progress: Schema.optional(OperationProgress),
})).annotate({ identifier: "CreateBackupMetadata" }) as any as Schema.Schema<CreateBackupMetadata>;

export interface KeyRange {
  /** If the start is closed, then the range includes all rows whose first `len(start_closed)` key columns exactly match `start_closed`. */
  startClosed?: Array<unknown>;
  /** If the end is open, then the range excludes rows whose first `len(end_open)` key columns exactly match `end_open`. */
  endOpen?: Array<unknown>;
  /** If the end is closed, then the range includes all rows whose first `len(end_closed)` key columns exactly match `end_closed`. */
  endClosed?: Array<unknown>;
  /** If the start is open, then the range excludes rows whose first `len(start_open)` key columns exactly match `start_open`. */
  startOpen?: Array<unknown>;
}

export const KeyRange: Schema.Schema<KeyRange> = Schema.suspend(() => Schema.Struct({
  startClosed: Schema.optional(Schema.Array(Schema.Unknown)),
  endOpen: Schema.optional(Schema.Array(Schema.Unknown)),
  endClosed: Schema.optional(Schema.Array(Schema.Unknown)),
  startOpen: Schema.optional(Schema.Array(Schema.Unknown)),
})).annotate({ identifier: "KeyRange" }) as any as Schema.Schema<KeyRange>;

export interface KeySet {
  /** A list of specific keys. Entries in `keys` should have exactly as many elements as there are columns in the primary or index key with which this `KeySet` is used. Individual key values are encoded as described here. */
  keys?: Array<Array<unknown>>;
  /** A list of key ranges. See KeyRange for more information about key range specifications. */
  ranges?: Array<KeyRange>;
  /** For convenience `all` can be set to `true` to indicate that this `KeySet` matches all keys in the table or index. Note that any keys specified in `keys` or `ranges` are only yielded once. */
  all?: boolean;
}

export const KeySet: Schema.Schema<KeySet> = Schema.suspend(() => Schema.Struct({
  keys: Schema.optional(Schema.Array(Schema.Array(Schema.Unknown))),
  ranges: Schema.optional(Schema.Array(KeyRange)),
  all: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "KeySet" }) as any as Schema.Schema<KeySet>;

export interface Delete {
  /** Required. The table whose rows will be deleted. */
  table?: string;
  /** Required. The primary keys of the rows within table to delete. The primary keys must be specified in the order in which they appear in the `PRIMARY KEY()` clause of the table's equivalent DDL statement (the DDL statement used to create the table). Delete is idempotent. The transaction will succeed even if some or all rows do not exist. */
  keySet?: KeySet;
}

export const Delete: Schema.Schema<Delete> = Schema.suspend(() => Schema.Struct({
  table: Schema.optional(Schema.String),
  keySet: Schema.optional(KeySet),
})).annotate({ identifier: "Delete" }) as any as Schema.Schema<Delete>;

export interface Write {
  /** The names of the columns in table to be written. The list of columns must contain enough columns to allow Cloud Spanner to derive values for all primary key columns in the row(s) to be modified. */
  columns?: Array<string>;
  /** The values to be written. `values` can contain more than one list of values. If it does, then multiple rows are written, one for each entry in `values`. Each list in `values` must have exactly as many entries as there are entries in columns above. Sending multiple lists is equivalent to sending multiple `Mutation`s, each containing one `values` entry and repeating table and columns. Individual values in each list are encoded as described here. */
  values?: Array<Array<unknown>>;
  /** Required. The table whose rows will be written. */
  table?: string;
}

export const Write: Schema.Schema<Write> = Schema.suspend(() => Schema.Struct({
  columns: Schema.optional(Schema.Array(Schema.String)),
  values: Schema.optional(Schema.Array(Schema.Array(Schema.Unknown))),
  table: Schema.optional(Schema.String),
})).annotate({ identifier: "Write" }) as any as Schema.Schema<Write>;

export interface Ack {
  /** By default, an attempt to ack a message that does not exist will fail with a `NOT_FOUND` error. With `ignore_not_found` set to true, the ack will succeed even if the message does not exist. This is useful for unconditionally acking a message, even if it is missing or has already been acked. */
  ignoreNotFound?: boolean;
  /** Required. The queue where the message to be acked is stored. */
  queue?: string;
  /** Required. The primary key of the message to be acked. */
  key?: Array<unknown>;
}

export const Ack: Schema.Schema<Ack> = Schema.suspend(() => Schema.Struct({
  ignoreNotFound: Schema.optional(Schema.Boolean),
  queue: Schema.optional(Schema.String),
  key: Schema.optional(Schema.Array(Schema.Unknown)),
})).annotate({ identifier: "Ack" }) as any as Schema.Schema<Ack>;

export interface Send {
  /** The time at which Spanner will begin attempting to deliver the message. If `deliver_time` is not set, Spanner will deliver the message immediately. If `deliver_time` is in the past, Spanner will replace it with a value closer to the current time. */
  deliverTime?: string;
  /** Required. The primary key of the message to be sent. */
  key?: Array<unknown>;
  /** Required. The queue to which the message will be sent. */
  queue?: string;
  /** The payload of the message. */
  payload?: unknown;
}

export const Send: Schema.Schema<Send> = Schema.suspend(() => Schema.Struct({
  deliverTime: Schema.optional(Schema.String),
  key: Schema.optional(Schema.Array(Schema.Unknown)),
  queue: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "Send" }) as any as Schema.Schema<Send>;

export interface Mutation {
  /** Delete rows from a table. Succeeds whether or not the named rows were present. */
  delete?: Delete;
  /** Like insert, except that if the row already exists, then its column values are overwritten with the ones provided. Any column values not explicitly written are preserved. When using insert_or_update, just as when using insert, all `NOT NULL` columns in the table must be given a value. This holds true even when the row already exists and will therefore actually be updated. */
  insertOrUpdate?: Write;
  /** Ack a message from a queue. */
  ack?: Ack;
  /** Update existing rows in a table. If any of the rows does not already exist, the transaction fails with error `NOT_FOUND`. */
  update?: Write;
  /** Insert new rows in a table. If any of the rows already exist, the write or transaction fails with error `ALREADY_EXISTS`. */
  insert?: Write;
  /** Like insert, except that if the row already exists, it is deleted, and the column values provided are inserted instead. Unlike insert_or_update, this means any values not explicitly written become `NULL`. In an interleaved table, if you create the child table with the `ON DELETE CASCADE` annotation, then replacing a parent row also deletes the child rows. Otherwise, you must delete the child rows before you replace the parent row. */
  replace?: Write;
  /** Send a message to a queue. */
  send?: Send;
}

export const Mutation: Schema.Schema<Mutation> = Schema.suspend(() => Schema.Struct({
  delete: Schema.optional(Delete),
  insertOrUpdate: Schema.optional(Write),
  ack: Schema.optional(Ack),
  update: Schema.optional(Write),
  insert: Schema.optional(Write),
  replace: Schema.optional(Write),
  send: Schema.optional(Send),
})).annotate({ identifier: "Mutation" }) as any as Schema.Schema<Mutation>;

export interface PrefixNode {
  /** Whether this corresponds to a data_source name. */
  dataSourceNode?: boolean;
  /** The string represented by the prefix node. */
  word?: string;
  /** The depth in the prefix hierarchy. */
  depth?: number;
  /** The index of the start key bucket of the range that this node spans. */
  startIndex?: number;
  /** The index of the end key bucket of the range that this node spans. */
  endIndex?: number;
}

export const PrefixNode: Schema.Schema<PrefixNode> = Schema.suspend(() => Schema.Struct({
  dataSourceNode: Schema.optional(Schema.Boolean),
  word: Schema.optional(Schema.String),
  depth: Schema.optional(Schema.Number),
  startIndex: Schema.optional(Schema.Number),
  endIndex: Schema.optional(Schema.Number),
})).annotate({ identifier: "PrefixNode" }) as any as Schema.Schema<PrefixNode>;

export interface LocalizedString {
  /** The canonical English version of this message. If no token is provided or the front-end has no message associated with the token, this text will be displayed as-is. */
  message?: string;
  /** The token identifying the message, e.g. 'METRIC_READ_CPU'. This should be unique within the service. */
  token?: string;
  /** A map of arguments used when creating the localized message. Keys represent parameter names which may be used by the localized version when substituting dynamic values. */
  args?: Record<string, string>;
}

export const LocalizedString: Schema.Schema<LocalizedString> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
  args: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "LocalizedString" }) as any as Schema.Schema<LocalizedString>;

export interface ContextValue {
  /** The label for the context value. e.g. "latency". */
  label?: LocalizedString;
  /** The severity of this context. */
  severity?: "SEVERITY_UNSPECIFIED" | "INFO" | "WARNING" | "ERROR" | "FATAL" | (string & {});
  /** The value for the context. */
  value?: number;
  /** The unit of the context value. */
  unit?: string;
}

export const ContextValue: Schema.Schema<ContextValue> = Schema.suspend(() => Schema.Struct({
  label: Schema.optional(LocalizedString),
  severity: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Number),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "ContextValue" }) as any as Schema.Schema<ContextValue>;

export interface KeyRangeInfo {
  /** The value of the metric. */
  value?: number;
  /** Information about this key range, for all metrics. */
  info?: LocalizedString;
  /** The unit of the metric. This is an unstructured field and will be mapped as is to the user. */
  unit?: LocalizedString;
  /** The index of the end key in indexed_keys. */
  endKeyIndex?: number;
  /** The name of the metric. e.g. "latency". */
  metric?: LocalizedString;
  /** The list of context values for this key range. */
  contextValues?: Array<ContextValue>;
  /** The time offset. This is the time since the start of the time interval. */
  timeOffset?: string;
  /** The index of the start key in indexed_keys. */
  startKeyIndex?: number;
  /** The number of keys this range covers. */
  keysCount?: string;
}

export const KeyRangeInfo: Schema.Schema<KeyRangeInfo> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Number),
  info: Schema.optional(LocalizedString),
  unit: Schema.optional(LocalizedString),
  endKeyIndex: Schema.optional(Schema.Number),
  metric: Schema.optional(LocalizedString),
  contextValues: Schema.optional(Schema.Array(ContextValue)),
  timeOffset: Schema.optional(Schema.String),
  startKeyIndex: Schema.optional(Schema.Number),
  keysCount: Schema.optional(Schema.String),
})).annotate({ identifier: "KeyRangeInfo" }) as any as Schema.Schema<KeyRangeInfo>;

export interface KeyRangeInfos {
  /** The total size of the list of all KeyRangeInfos. This may be larger than the number of repeated messages above. If that is the case, this number may be used to determine how many are not being shown. */
  totalSize?: number;
  /** The list individual KeyRangeInfos. */
  infos?: Array<KeyRangeInfo>;
}

export const KeyRangeInfos: Schema.Schema<KeyRangeInfos> = Schema.suspend(() => Schema.Struct({
  totalSize: Schema.optional(Schema.Number),
  infos: Schema.optional(Schema.Array(KeyRangeInfo)),
})).annotate({ identifier: "KeyRangeInfos" }) as any as Schema.Schema<KeyRangeInfos>;

export interface IndexedKeyRangeInfos {
  /** A (sparse) mapping from key bucket index to the KeyRangeInfos for that key bucket. */
  keyRangeInfos?: Record<string, KeyRangeInfos>;
}

export const IndexedKeyRangeInfos: Schema.Schema<IndexedKeyRangeInfos> = Schema.suspend(() => Schema.Struct({
  keyRangeInfos: Schema.optional(Schema.Record(Schema.String, KeyRangeInfos)),
})).annotate({ identifier: "IndexedKeyRangeInfos" }) as any as Schema.Schema<IndexedKeyRangeInfos>;

export interface DerivedMetric {
  /** The name of the denominator metric. e.g. "rows". */
  denominator?: LocalizedString;
  /** The name of the numerator metric. e.g. "latency". */
  numerator?: LocalizedString;
}

export const DerivedMetric: Schema.Schema<DerivedMetric> = Schema.suspend(() => Schema.Struct({
  denominator: Schema.optional(LocalizedString),
  numerator: Schema.optional(LocalizedString),
})).annotate({ identifier: "DerivedMetric" }) as any as Schema.Schema<DerivedMetric>;

export interface IndexedHotKey {
  /** A (sparse) mapping from key bucket index to the index of the specific hot row key for that key bucket. The index of the hot row key can be translated to the actual row key via the ScanData.VisualizationData.indexed_keys repeated field. */
  sparseHotKeys?: Record<string, number>;
}

export const IndexedHotKey: Schema.Schema<IndexedHotKey> = Schema.suspend(() => Schema.Struct({
  sparseHotKeys: Schema.optional(Schema.Record(Schema.String, Schema.Number)),
})).annotate({ identifier: "IndexedHotKey" }) as any as Schema.Schema<IndexedHotKey>;

export interface MetricMatrixRow {
  /** The columns of the row. */
  cols?: Array<number>;
}

export const MetricMatrixRow: Schema.Schema<MetricMatrixRow> = Schema.suspend(() => Schema.Struct({
  cols: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "MetricMatrixRow" }) as any as Schema.Schema<MetricMatrixRow>;

export interface MetricMatrix {
  /** The rows of the matrix. */
  rows?: Array<MetricMatrixRow>;
}

export const MetricMatrix: Schema.Schema<MetricMatrix> = Schema.suspend(() => Schema.Struct({
  rows: Schema.optional(Schema.Array(MetricMatrixRow)),
})).annotate({ identifier: "MetricMatrix" }) as any as Schema.Schema<MetricMatrix>;

export interface Metric {
  /** Whether the metric is visible to the end user. */
  visible?: boolean;
  /** The displayed label of the metric. */
  displayLabel?: LocalizedString;
  /** The (sparse) mapping from time interval index to an IndexedKeyRangeInfos message, representing those time intervals for which there are informational messages concerning key ranges. */
  indexedKeyRangeInfos?: Record<string, IndexedKeyRangeInfos>;
  /** The category of the metric, e.g. "Activity", "Alerts", "Reads", etc. */
  category?: LocalizedString;
  /** The aggregation function used to aggregate each key bucket */
  aggregation?: "AGGREGATION_UNSPECIFIED" | "MAX" | "SUM" | (string & {});
  /** Information about the metric. */
  info?: LocalizedString;
  /** The unit of the metric. */
  unit?: LocalizedString;
  /** The value that is considered hot for the metric. On a per metric basis hotness signals high utilization and something that might potentially be a cause for concern by the end user. hot_value is used to calibrate and scale visual color scales. */
  hotValue?: number;
  /** Whether the metric has any non-zero data. */
  hasNonzeroData?: boolean;
  /** The references to numerator and denominator metrics for a derived metric. */
  derived?: DerivedMetric;
  /** The (sparse) mapping from time index to an IndexedHotKey message, representing those time intervals for which there are hot keys. */
  indexedHotKeys?: Record<string, IndexedHotKey>;
  /** The data for the metric as a matrix. */
  matrix?: MetricMatrix;
}

export const Metric: Schema.Schema<Metric> = Schema.suspend(() => Schema.Struct({
  visible: Schema.optional(Schema.Boolean),
  displayLabel: Schema.optional(LocalizedString),
  indexedKeyRangeInfos: Schema.optional(Schema.Record(Schema.String, IndexedKeyRangeInfos)),
  category: Schema.optional(LocalizedString),
  aggregation: Schema.optional(Schema.String),
  info: Schema.optional(LocalizedString),
  unit: Schema.optional(LocalizedString),
  hotValue: Schema.optional(Schema.Number),
  hasNonzeroData: Schema.optional(Schema.Boolean),
  derived: Schema.optional(DerivedMetric),
  indexedHotKeys: Schema.optional(Schema.Record(Schema.String, IndexedHotKey)),
  matrix: Schema.optional(MetricMatrix),
})).annotate({ identifier: "Metric" }) as any as Schema.Schema<Metric>;

export interface DiagnosticMessage {
  /** Whether this message is specific only for the current metric. By default Diagnostics are shown for all metrics, regardless which metric is the currently selected metric in the UI. However occasionally a metric will generate so many messages that the resulting visual clutter becomes overwhelming. In this case setting this to true, will show the diagnostic messages for that metric only if it is the currently selected metric. */
  metricSpecific?: boolean;
  /** The short message. */
  shortMessage?: LocalizedString;
  /** Information about this diagnostic information. */
  info?: LocalizedString;
  /** The severity of the diagnostic message. */
  severity?: "SEVERITY_UNSPECIFIED" | "INFO" | "WARNING" | "ERROR" | "FATAL" | (string & {});
  /** The metric. */
  metric?: LocalizedString;
}

export const DiagnosticMessage: Schema.Schema<DiagnosticMessage> = Schema.suspend(() => Schema.Struct({
  metricSpecific: Schema.optional(Schema.Boolean),
  shortMessage: Schema.optional(LocalizedString),
  info: Schema.optional(LocalizedString),
  severity: Schema.optional(Schema.String),
  metric: Schema.optional(LocalizedString),
})).annotate({ identifier: "DiagnosticMessage" }) as any as Schema.Schema<DiagnosticMessage>;

export interface VisualizationData {
  /** We discretize the entire keyspace into buckets. Assuming each bucket has an inclusive keyrange and covers keys from k(i) ... k(n). In this case k(n) would be an end key for a given range. end_key_string is the collection of all such end keys */
  endKeyStrings?: Array<string>;
  /** The token delimiting the key prefixes. */
  keySeparator?: string;
  /** The token signifying the end of a data_source. */
  dataSourceEndToken?: string;
  /** The list of extracted key prefix nodes used in the key prefix hierarchy. */
  prefixNodes?: Array<PrefixNode>;
  /** The list of data objects for each metric. */
  metrics?: Array<Metric>;
  /** The list of messages (info, alerts, ...) */
  diagnosticMessages?: Array<DiagnosticMessage>;
  /** The unit for the key: e.g. 'key' or 'chunk'. */
  keyUnit?: "KEY_UNIT_UNSPECIFIED" | "KEY" | "CHUNK" | (string & {});
  /** The token delimiting a datasource name from the rest of a key in a data_source. */
  dataSourceSeparatorToken?: string;
  /** Keys of key ranges that contribute significantly to a given metric Can be thought of as heavy hitters. */
  indexedKeys?: Array<string>;
  /** Whether this scan contains PII. */
  hasPii?: boolean;
}

export const VisualizationData: Schema.Schema<VisualizationData> = Schema.suspend(() => Schema.Struct({
  endKeyStrings: Schema.optional(Schema.Array(Schema.String)),
  keySeparator: Schema.optional(Schema.String),
  dataSourceEndToken: Schema.optional(Schema.String),
  prefixNodes: Schema.optional(Schema.Array(PrefixNode)),
  metrics: Schema.optional(Schema.Array(Metric)),
  diagnosticMessages: Schema.optional(Schema.Array(DiagnosticMessage)),
  keyUnit: Schema.optional(Schema.String),
  dataSourceSeparatorToken: Schema.optional(Schema.String),
  indexedKeys: Schema.optional(Schema.Array(Schema.String)),
  hasPii: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "VisualizationData" }) as any as Schema.Schema<VisualizationData>;

export interface ScanData {
  /** A range of time (inclusive) for when the contained data is defined. The lower bound for when the contained data is defined. */
  startTime?: string;
  /** Cloud Key Visualizer scan data. The range of time this information covers is captured via the above time range fields. Note, this field is not available to the ListScans method. */
  data?: VisualizationData;
  /** The upper bound for when the contained data is defined. */
  endTime?: string;
}

export const ScanData: Schema.Schema<ScanData> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  data: Schema.optional(VisualizationData),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ScanData" }) as any as Schema.Schema<ScanData>;

export interface Scan {
  /** A range of time (inclusive) for when the scan is defined. The lower bound for when the scan is defined. */
  startTime?: string;
  /** The upper bound for when the scan is defined. */
  endTime?: string;
  /** The unique name of the scan, specific to the Database service implementing this interface. */
  name?: string;
  /** Output only. Cloud Key Visualizer scan data. Note, this field is not available to the ListScans method. */
  scanData?: ScanData;
  /** Additional information provided by the implementer. */
  details?: Record<string, unknown>;
}

export const Scan: Schema.Schema<Scan> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  scanData: Schema.optional(ScanData),
  details: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Scan" }) as any as Schema.Schema<Scan>;

export interface ListScansResponse {
  /** Available scans based on the list query parameters. */
  scans?: Array<Scan>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListScansResponse: Schema.Schema<ListScansResponse> = Schema.suspend(() => Schema.Struct({
  scans: Schema.optional(Schema.Array(Scan)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListScansResponse" }) as any as Schema.Schema<ListScansResponse>;

export interface QueryOptions {
  /** An option to control the selection of optimizer statistics package. This parameter allows individual queries to use a different query optimizer statistics package. Specifying `latest` as a value instructs Cloud Spanner to use the latest generated statistics package. If not specified, Cloud Spanner uses the statistics package set at the database level options, or the latest package if the database option isn't set. The statistics package requested by the query has to be exempt from garbage collection. This can be achieved with the following DDL statement: ```sql ALTER STATISTICS SET OPTIONS (allow_gc=false) ``` The list of available statistics packages can be queried from `INFORMATION_SCHEMA.SPANNER_STATISTICS`. Executing a SQL statement with an invalid optimizer statistics package or with a statistics package that allows garbage collection fails with an `INVALID_ARGUMENT` error. */
  optimizerStatisticsPackage?: string;
  /** An option to control the selection of optimizer version. This parameter allows individual queries to pick different query optimizer versions. Specifying `latest` as a value instructs Cloud Spanner to use the latest supported query optimizer version. If not specified, Cloud Spanner uses the optimizer version set at the database level options. Any other positive integer (from the list of supported optimizer versions) overrides the default optimizer version for query execution. The list of supported optimizer versions can be queried from `SPANNER_SYS.SUPPORTED_OPTIMIZER_VERSIONS`. Executing a SQL statement with an invalid optimizer version fails with an `INVALID_ARGUMENT` error. See https://cloud.google.com/spanner/docs/query-optimizer/manage-query-optimizer for more information on managing the query optimizer. The `optimizer_version` statement hint has precedence over this setting. */
  optimizerVersion?: string;
}

export const QueryOptions: Schema.Schema<QueryOptions> = Schema.suspend(() => Schema.Struct({
  optimizerStatisticsPackage: Schema.optional(Schema.String),
  optimizerVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryOptions" }) as any as Schema.Schema<QueryOptions>;

export interface InstancePartition {
  /** Output only. The names of the databases that reference this instance partition. Referencing databases should share the parent instance. The existence of any referencing database prevents the instance partition from being deleted. */
  referencingDatabases?: Array<string>;
  /** The number of nodes allocated to this instance partition. Users can set the `node_count` field to specify the target number of nodes allocated to the instance partition. This may be zero in API responses for instance partitions that are not yet in state `READY`. */
  nodeCount?: number;
  /** Used for optimistic concurrency control as a way to help prevent simultaneous updates of a instance partition from overwriting each other. It is strongly suggested that systems make use of the etag in the read-modify-write cycle to perform instance partition updates in order to avoid race conditions: An etag is returned in the response which contains instance partitions, and systems are expected to put that etag in the request to update instance partitions to ensure that their change will be applied to the same version of the instance partition. If no etag is provided in the call to update instance partition, then the existing instance partition is overwritten blindly. */
  etag?: string;
  /** Required. A unique identifier for the instance partition. Values are of the form `projects//instances//instancePartitions/a-z*[a-z0-9]`. The final segment of the name must be between 2 and 64 characters in length. An instance partition's name cannot be changed after the instance partition is created. */
  name?: string;
  /** Output only. The time at which the instance partition was created. */
  createTime?: string;
  /** Required. The name of the instance partition's configuration. Values are of the form `projects//instanceConfigs/`. See also InstanceConfig and ListInstanceConfigs. */
  config?: string;
  /** The number of processing units allocated to this instance partition. Users can set the `processing_units` field to specify the target number of processing units allocated to the instance partition. This might be zero in API responses for instance partitions that are not yet in the `READY` state. */
  processingUnits?: number;
  /** Optional. The autoscaling configuration. Autoscaling is enabled if this field is set. When autoscaling is enabled, fields in compute_capacity are treated as OUTPUT_ONLY fields and reflect the current compute capacity allocated to the instance partition. */
  autoscalingConfig?: AutoscalingConfig;
  /** Output only. The current instance partition state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | (string & {});
  /** Output only. The time at which the instance partition was most recently updated. */
  updateTime?: string;
  /** Output only. Deprecated: This field is not populated. Output only. The names of the backups that reference this instance partition. Referencing backups should share the parent instance. The existence of any referencing backup prevents the instance partition from being deleted. */
  referencingBackups?: Array<string>;
  /** Required. The descriptive name for this instance partition as it appears in UIs. Must be unique per project and between 4 and 30 characters in length. */
  displayName?: string;
}

export const InstancePartition: Schema.Schema<InstancePartition> = Schema.suspend(() => Schema.Struct({
  referencingDatabases: Schema.optional(Schema.Array(Schema.String)),
  nodeCount: Schema.optional(Schema.Number),
  etag: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  config: Schema.optional(Schema.String),
  processingUnits: Schema.optional(Schema.Number),
  autoscalingConfig: Schema.optional(AutoscalingConfig),
  state: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  referencingBackups: Schema.optional(Schema.Array(Schema.String)),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "InstancePartition" }) as any as Schema.Schema<InstancePartition>;

export interface ListInstancePartitionsResponse {
  /** The list of unreachable instances or instance partitions. It includes the names of instances or instance partitions whose metadata could not be retrieved within instance_partition_deadline. */
  unreachable?: Array<string>;
  /** The list of requested instancePartitions. */
  instancePartitions?: Array<InstancePartition>;
  /** `next_page_token` can be sent in a subsequent ListInstancePartitions call to fetch more of the matching instance partitions. */
  nextPageToken?: string;
}

export const ListInstancePartitionsResponse: Schema.Schema<ListInstancePartitionsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  instancePartitions: Schema.optional(Schema.Array(InstancePartition)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListInstancePartitionsResponse" }) as any as Schema.Schema<ListInstancePartitionsResponse>;

export interface PartitionStartRecord {
  /** Record sequence numbers are unique and monotonically increasing (but not necessarily contiguous) for a specific timestamp across record types in the same partition. To guarantee ordered processing, the reader should process records (of potentially different types) in record_sequence order for a specific timestamp in the same partition. */
  recordSequence?: string;
  /** Unique partition identifiers to be used in queries. */
  partitionTokens?: Array<string>;
  /** Start timestamp at which the partitions should be queried to return change stream records with timestamps >= start_timestamp. DataChangeRecord.commit_timestamps, PartitionStartRecord.start_timestamps, PartitionEventRecord.commit_timestamps, and PartitionEndRecord.end_timestamps can have the same value in the same partition. */
  startTimestamp?: string;
}

export const PartitionStartRecord: Schema.Schema<PartitionStartRecord> = Schema.suspend(() => Schema.Struct({
  recordSequence: Schema.optional(Schema.String),
  partitionTokens: Schema.optional(Schema.Array(Schema.String)),
  startTimestamp: Schema.optional(Schema.String),
})).annotate({ identifier: "PartitionStartRecord" }) as any as Schema.Schema<PartitionStartRecord>;

export interface ColumnMetadata {
  /** Ordinal position of the column based on the original table definition in the schema starting with a value of 1. */
  ordinalPosition?: string;
  /** Indicates whether the column is a primary key column. */
  isPrimaryKey?: boolean;
  /** Type of the column. */
  type?: Type;
  /** Name of the column. */
  name?: string;
}

export const ColumnMetadata: Schema.Schema<ColumnMetadata> = Schema.suspend(() => Schema.Struct({
  ordinalPosition: Schema.optional(Schema.String),
  isPrimaryKey: Schema.optional(Schema.Boolean),
  type: Schema.optional(Type),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ColumnMetadata" }) as any as Schema.Schema<ColumnMetadata>;

export interface DataChangeRecord {
  /** Indicates the number of partitions that return data change records for this transaction. This value can be helpful in assembling all records associated with a particular transaction. */
  numberOfPartitionsInTransaction?: number;
  /** Indicates the number of data change records that are part of this transaction across all change stream partitions. This value can be used to assemble all the records associated with a particular transaction. */
  numberOfRecordsInTransaction?: number;
  /** Indicates whether the transaction is a system transaction. System transactions include those issued by time-to-live (TTL), column backfill, etc. */
  isSystemTransaction?: boolean;
  /** Indicates the transaction tag associated with this transaction. */
  transactionTag?: string;
  /** Describes the type of change. */
  modType?: "MOD_TYPE_UNSPECIFIED" | "INSERT" | "UPDATE" | "DELETE" | (string & {});
  /** Record sequence numbers are unique and monotonically increasing (but not necessarily contiguous) for a specific timestamp across record types in the same partition. To guarantee ordered processing, the reader should process records (of potentially different types) in record_sequence order for a specific timestamp in the same partition. The record sequence number ordering across partitions is only meaningful in the context of a specific transaction. Record sequence numbers are unique across partitions for a specific transaction. Sort the DataChangeRecords for the same server_transaction_id by record_sequence to reconstruct the ordering of the changes within the transaction. */
  recordSequence?: string;
  /** Indicates whether this is the last record for a transaction in the current partition. Clients can use this field to determine when all records for a transaction in the current partition have been received. */
  isLastRecordInTransactionInPartition?: boolean;
  /** Name of the table affected by the change. */
  table?: string;
  /** Indicates the timestamp in which the change was committed. DataChangeRecord.commit_timestamps, PartitionStartRecord.start_timestamps, PartitionEventRecord.commit_timestamps, and PartitionEndRecord.end_timestamps can have the same value in the same partition. */
  commitTimestamp?: string;
  /** Provides metadata describing the columns associated with the mods listed below. */
  columnMetadata?: Array<ColumnMetadata>;
  /** Describes the changes that were made. */
  mods?: Array<Mod>;
  /** Describes the value capture type that was specified in the change stream configuration when this change was captured. */
  valueCaptureType?: "VALUE_CAPTURE_TYPE_UNSPECIFIED" | "OLD_AND_NEW_VALUES" | "NEW_VALUES" | "NEW_ROW" | "NEW_ROW_AND_OLD_VALUES" | (string & {});
  /** Provides a globally unique string that represents the transaction in which the change was committed. Multiple transactions can have the same commit timestamp, but each transaction has a unique server_transaction_id. */
  serverTransactionId?: string;
}

export const DataChangeRecord: Schema.Schema<DataChangeRecord> = Schema.suspend(() => Schema.Struct({
  numberOfPartitionsInTransaction: Schema.optional(Schema.Number),
  numberOfRecordsInTransaction: Schema.optional(Schema.Number),
  isSystemTransaction: Schema.optional(Schema.Boolean),
  transactionTag: Schema.optional(Schema.String),
  modType: Schema.optional(Schema.String),
  recordSequence: Schema.optional(Schema.String),
  isLastRecordInTransactionInPartition: Schema.optional(Schema.Boolean),
  table: Schema.optional(Schema.String),
  commitTimestamp: Schema.optional(Schema.String),
  columnMetadata: Schema.optional(Schema.Array(ColumnMetadata)),
  mods: Schema.optional(Schema.Array(Mod)),
  valueCaptureType: Schema.optional(Schema.String),
  serverTransactionId: Schema.optional(Schema.String),
})).annotate({ identifier: "DataChangeRecord" }) as any as Schema.Schema<DataChangeRecord>;

export interface MoveOutEvent {
  /** An unique partition identifier describing the destination change stream partition that will record changes for the key range that is moving out of this partition. */
  destinationPartitionToken?: string;
}

export const MoveOutEvent: Schema.Schema<MoveOutEvent> = Schema.suspend(() => Schema.Struct({
  destinationPartitionToken: Schema.optional(Schema.String),
})).annotate({ identifier: "MoveOutEvent" }) as any as Schema.Schema<MoveOutEvent>;

export interface MoveInEvent {
  /** An unique partition identifier describing the source change stream partition that recorded changes for the key range that is moving into this partition. */
  sourcePartitionToken?: string;
}

export const MoveInEvent: Schema.Schema<MoveInEvent> = Schema.suspend(() => Schema.Struct({
  sourcePartitionToken: Schema.optional(Schema.String),
})).annotate({ identifier: "MoveInEvent" }) as any as Schema.Schema<MoveInEvent>;

export interface PartitionEventRecord {
  /** Unique partition identifier describing the partition this event occurred on. partition_token is equal to the partition token of the change stream partition currently queried to return this PartitionEventRecord. */
  partitionToken?: string;
  /** Indicates the commit timestamp at which the key range change occurred. DataChangeRecord.commit_timestamps, PartitionStartRecord.start_timestamps, PartitionEventRecord.commit_timestamps, and PartitionEndRecord.end_timestamps can have the same value in the same partition. */
  commitTimestamp?: string;
  /** Set when one or more key ranges are moved out of the change stream partition identified by partition_token. Example: Two key ranges are moved out of partition (P1) to partition (P2) and partition (P3) in a single transaction at timestamp T. The PartitionEventRecord returned in P1 will reflect the move as: PartitionEventRecord { commit_timestamp: T partition_token: "P1" move_out_events { destination_partition_token: "P2" } move_out_events { destination_partition_token: "P3" } } The PartitionEventRecord returned in P2 will reflect the move as: PartitionEventRecord { commit_timestamp: T partition_token: "P2" move_in_events { source_partition_token: "P1" } } The PartitionEventRecord returned in P3 will reflect the move as: PartitionEventRecord { commit_timestamp: T partition_token: "P3" move_in_events { source_partition_token: "P1" } } */
  moveOutEvents?: Array<MoveOutEvent>;
  /** Set when one or more key ranges are moved into the change stream partition identified by partition_token. Example: Two key ranges are moved into partition (P1) from partition (P2) and partition (P3) in a single transaction at timestamp T. The PartitionEventRecord returned in P1 will reflect the move as: PartitionEventRecord { commit_timestamp: T partition_token: "P1" move_in_events { source_partition_token: "P2" } move_in_events { source_partition_token: "P3" } } The PartitionEventRecord returned in P2 will reflect the move as: PartitionEventRecord { commit_timestamp: T partition_token: "P2" move_out_events { destination_partition_token: "P1" } } The PartitionEventRecord returned in P3 will reflect the move as: PartitionEventRecord { commit_timestamp: T partition_token: "P3" move_out_events { destination_partition_token: "P1" } } */
  moveInEvents?: Array<MoveInEvent>;
  /** Record sequence numbers are unique and monotonically increasing (but not necessarily contiguous) for a specific timestamp across record types in the same partition. To guarantee ordered processing, the reader should process records (of potentially different types) in record_sequence order for a specific timestamp in the same partition. */
  recordSequence?: string;
}

export const PartitionEventRecord: Schema.Schema<PartitionEventRecord> = Schema.suspend(() => Schema.Struct({
  partitionToken: Schema.optional(Schema.String),
  commitTimestamp: Schema.optional(Schema.String),
  moveOutEvents: Schema.optional(Schema.Array(MoveOutEvent)),
  moveInEvents: Schema.optional(Schema.Array(MoveInEvent)),
  recordSequence: Schema.optional(Schema.String),
})).annotate({ identifier: "PartitionEventRecord" }) as any as Schema.Schema<PartitionEventRecord>;

export interface HeartbeatRecord {
  /** Indicates the timestamp at which the query has returned all the records in the change stream partition with timestamp <= heartbeat timestamp. The heartbeat timestamp will not be the same as the timestamps of other record types in the same partition. */
  timestamp?: string;
}

export const HeartbeatRecord: Schema.Schema<HeartbeatRecord> = Schema.suspend(() => Schema.Struct({
  timestamp: Schema.optional(Schema.String),
})).annotate({ identifier: "HeartbeatRecord" }) as any as Schema.Schema<HeartbeatRecord>;

export interface ChangeStreamRecord {
  /** Partition end record describing a terminated change stream partition. */
  partitionEndRecord?: PartitionEndRecord;
  /** Partition start record describing a new change stream partition. */
  partitionStartRecord?: PartitionStartRecord;
  /** Data change record describing a data change for a change stream partition. */
  dataChangeRecord?: DataChangeRecord;
  /** Partition event record describing key range changes for a change stream partition. */
  partitionEventRecord?: PartitionEventRecord;
  /** Heartbeat record describing a heartbeat for a change stream partition. */
  heartbeatRecord?: HeartbeatRecord;
}

export const ChangeStreamRecord: Schema.Schema<ChangeStreamRecord> = Schema.suspend(() => Schema.Struct({
  partitionEndRecord: Schema.optional(PartitionEndRecord),
  partitionStartRecord: Schema.optional(PartitionStartRecord),
  dataChangeRecord: Schema.optional(DataChangeRecord),
  partitionEventRecord: Schema.optional(PartitionEventRecord),
  heartbeatRecord: Schema.optional(HeartbeatRecord),
})).annotate({ identifier: "ChangeStreamRecord" }) as any as Schema.Schema<ChangeStreamRecord>;

export interface BackupInfo {
  /** The backup contains an externally consistent copy of `source_database` at the timestamp specified by `version_time`. If the CreateBackup request did not specify `version_time`, the `version_time` of the backup is equivalent to the `create_time`. */
  versionTime?: string;
  /** Name of the backup. */
  backup?: string;
  /** Name of the database the backup was created from. */
  sourceDatabase?: string;
  /** The time the CreateBackup request was received. */
  createTime?: string;
}

export const BackupInfo: Schema.Schema<BackupInfo> = Schema.suspend(() => Schema.Struct({
  versionTime: Schema.optional(Schema.String),
  backup: Schema.optional(Schema.String),
  sourceDatabase: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupInfo" }) as any as Schema.Schema<BackupInfo>;

export interface RestoreInfo {
  /** Information about the backup used to restore the database. The backup may no longer exist. */
  backupInfo?: BackupInfo;
  /** The type of the restore source. */
  sourceType?: "TYPE_UNSPECIFIED" | "BACKUP" | (string & {});
}

export const RestoreInfo: Schema.Schema<RestoreInfo> = Schema.suspend(() => Schema.Struct({
  backupInfo: Schema.optional(BackupInfo),
  sourceType: Schema.optional(Schema.String),
})).annotate({ identifier: "RestoreInfo" }) as any as Schema.Schema<RestoreInfo>;

export interface DualRegionQuorum {
}

export const DualRegionQuorum: Schema.Schema<DualRegionQuorum> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DualRegionQuorum" }) as any as Schema.Schema<DualRegionQuorum>;

export interface SingleRegionQuorum {
  /** Required. The location of the serving region, for example, "us-central1". The location must be one of the regions within the dual-region instance configuration of your database. The list of valid locations is available using the GetInstanceConfig API. This should only be used if you plan to change quorum to the single-region quorum type. */
  servingLocation?: string;
}

export const SingleRegionQuorum: Schema.Schema<SingleRegionQuorum> = Schema.suspend(() => Schema.Struct({
  servingLocation: Schema.optional(Schema.String),
})).annotate({ identifier: "SingleRegionQuorum" }) as any as Schema.Schema<SingleRegionQuorum>;

export interface QuorumType {
  /** Dual-region quorum type. */
  dualRegion?: DualRegionQuorum;
  /** Single-region quorum type. */
  singleRegion?: SingleRegionQuorum;
}

export const QuorumType: Schema.Schema<QuorumType> = Schema.suspend(() => Schema.Struct({
  dualRegion: Schema.optional(DualRegionQuorum),
  singleRegion: Schema.optional(SingleRegionQuorum),
})).annotate({ identifier: "QuorumType" }) as any as Schema.Schema<QuorumType>;

export interface QuorumInfo {
  /** Output only. The timestamp when the request was triggered. */
  startTime?: string;
  /** Output only. The type of this quorum. See QuorumType for more information about quorum type specifications. */
  quorumType?: QuorumType;
  /** Output only. Whether this `ChangeQuorum` is Google or User initiated. */
  initiator?: "INITIATOR_UNSPECIFIED" | "GOOGLE" | "USER" | (string & {});
  /** Output only. The etag is used for optimistic concurrency control as a way to help prevent simultaneous `ChangeQuorum` requests that might create a race condition. */
  etag?: string;
}

export const QuorumInfo: Schema.Schema<QuorumInfo> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  quorumType: Schema.optional(QuorumType),
  initiator: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "QuorumInfo" }) as any as Schema.Schema<QuorumInfo>;

export interface EncryptionConfig {
  /** Specifies the KMS configuration for one or more keys used to encrypt the database. Values are of the form `projects//locations//keyRings//cryptoKeys/`. The keys referenced by `kms_key_names` must fully cover all regions of the database's instance configuration. Some examples: * For regional (single-region) instance configurations, specify a regional location KMS key. * For multi-region instance configurations of type `GOOGLE_MANAGED`, either specify a multi-region location KMS key or multiple regional location KMS keys that cover all regions in the instance configuration. * For an instance configuration of type `USER_MANAGED`, specify only regional location KMS keys to cover each region in the instance configuration. Multi-region location KMS keys aren't supported for `USER_MANAGED` type instance configurations. */
  kmsKeyNames?: Array<string>;
  /** The Cloud KMS key to be used for encrypting and decrypting the database. Values are of the form `projects//locations//keyRings//cryptoKeys/`. */
  kmsKeyName?: string;
}

export const EncryptionConfig: Schema.Schema<EncryptionConfig> = Schema.suspend(() => Schema.Struct({
  kmsKeyNames: Schema.optional(Schema.Array(Schema.String)),
  kmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "EncryptionConfig" }) as any as Schema.Schema<EncryptionConfig>;

export interface Database {
  /** Output only. Applicable only for restored databases. Contains information about the restore source. */
  restoreInfo?: RestoreInfo;
  /** Required. The name of the database. Values are of the form `projects//instances//databases/`, where `` is as specified in the `CREATE DATABASE` statement. This name can be passed to other API methods to identify the database. */
  name?: string;
  /** Output only. Earliest timestamp at which older versions of the data can be read. This value is continuously updated by Cloud Spanner and becomes stale the moment it is queried. If you are using this value to recover data, make sure to account for the time from the moment when the value is queried to the moment when you initiate the recovery. */
  earliestVersionTime?: string;
  /** Output only. If exists, the time at which the database creation started. */
  createTime?: string;
  /** Output only. For databases that are using customer managed encryption, this field contains the encryption information for the database, such as all Cloud KMS key versions that are in use. The `encryption_status` field inside of each `EncryptionInfo` is not populated. For databases that are using Google default or other types of encryption, this field is empty. This field is propagated lazily from the backend. There might be a delay from when a key version is being used and when it appears in this field. */
  encryptionInfo?: Array<EncryptionInfo>;
  /** Optional. Whether drop protection is enabled for this database. Defaults to false, if not set. For more details, please see how to [prevent accidental database deletion](https://cloud.google.com/spanner/docs/prevent-database-deletion). */
  enableDropProtection?: boolean;
  /** Output only. The current database state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "READY_OPTIMIZING" | (string & {});
  /** Output only. The read-write region which contains the database's leader replicas. This is the same as the value of default_leader database option set using DatabaseAdmin.CreateDatabase or DatabaseAdmin.UpdateDatabaseDdl. If not explicitly set, this is empty. */
  defaultLeader?: string;
  /** Output only. Applicable only for databases that use dual-region instance configurations. Contains information about the quorum. */
  quorumInfo?: QuorumInfo;
  /** Output only. The dialect of the Cloud Spanner Database. */
  databaseDialect?: "DATABASE_DIALECT_UNSPECIFIED" | "GOOGLE_STANDARD_SQL" | "POSTGRESQL" | (string & {});
  /** Output only. For databases that are using customer managed encryption, this field contains the encryption configuration for the database. For databases that are using Google default or other types of encryption, this field is empty. */
  encryptionConfig?: EncryptionConfig;
  /** Output only. If true, the database is being updated. If false, there are no ongoing update operations for the database. */
  reconciling?: boolean;
  /** Output only. The period in which Cloud Spanner retains all versions of data for the database. This is the same as the value of version_retention_period database option set using UpdateDatabaseDdl. Defaults to 1 hour, if not set. */
  versionRetentionPeriod?: string;
}

export const Database: Schema.Schema<Database> = Schema.suspend(() => Schema.Struct({
  restoreInfo: Schema.optional(RestoreInfo),
  name: Schema.optional(Schema.String),
  earliestVersionTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  encryptionInfo: Schema.optional(Schema.Array(EncryptionInfo)),
  enableDropProtection: Schema.optional(Schema.Boolean),
  state: Schema.optional(Schema.String),
  defaultLeader: Schema.optional(Schema.String),
  quorumInfo: Schema.optional(QuorumInfo),
  databaseDialect: Schema.optional(Schema.String),
  encryptionConfig: Schema.optional(EncryptionConfig),
  reconciling: Schema.optional(Schema.Boolean),
  versionRetentionPeriod: Schema.optional(Schema.String),
})).annotate({ identifier: "Database" }) as any as Schema.Schema<Database>;

export interface UpdateDatabaseRequest {
  /** Required. The list of fields to update. Currently, only `enable_drop_protection` field can be updated. */
  updateMask?: string;
  /** Required. The database to update. The `name` field of the database is of the form `projects//instances//databases/`. */
  database?: Database;
}

export const UpdateDatabaseRequest: Schema.Schema<UpdateDatabaseRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  database: Schema.optional(Database),
})).annotate({ identifier: "UpdateDatabaseRequest" }) as any as Schema.Schema<UpdateDatabaseRequest>;

export interface UpdateDatabaseMetadata {
  /** The time at which this operation was cancelled. If set, this operation is in the process of undoing itself (which is best-effort). */
  cancelTime?: string;
  /** The request for UpdateDatabase. */
  request?: UpdateDatabaseRequest;
  /** The progress of the UpdateDatabase operation. */
  progress?: OperationProgress;
}

export const UpdateDatabaseMetadata: Schema.Schema<UpdateDatabaseMetadata> = Schema.suspend(() => Schema.Struct({
  cancelTime: Schema.optional(Schema.String),
  request: Schema.optional(UpdateDatabaseRequest),
  progress: Schema.optional(OperationProgress),
})).annotate({ identifier: "UpdateDatabaseMetadata" }) as any as Schema.Schema<UpdateDatabaseMetadata>;

export interface Expr {
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface FullBackupSpec {
}

export const FullBackupSpec: Schema.Schema<FullBackupSpec> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "FullBackupSpec" }) as any as Schema.Schema<FullBackupSpec>;

export interface ReplicaSelection {
  /** The location or region of the serving requests, for example, "us-east1". */
  location?: string;
  /** The type of replica. */
  type?: "TYPE_UNSPECIFIED" | "READ_WRITE" | "READ_ONLY" | (string & {});
}

export const ReplicaSelection: Schema.Schema<ReplicaSelection> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ReplicaSelection" }) as any as Schema.Schema<ReplicaSelection>;

export interface IncludeReplicas {
  /** If `true`, Spanner doesn't route requests to a replica outside the <`include_replicas` list when all of the specified replicas are unavailable or unhealthy. Default value is `false`. */
  autoFailoverDisabled?: boolean;
  /** The directed read replica selector. */
  replicaSelections?: Array<ReplicaSelection>;
}

export const IncludeReplicas: Schema.Schema<IncludeReplicas> = Schema.suspend(() => Schema.Struct({
  autoFailoverDisabled: Schema.optional(Schema.Boolean),
  replicaSelections: Schema.optional(Schema.Array(ReplicaSelection)),
})).annotate({ identifier: "IncludeReplicas" }) as any as Schema.Schema<IncludeReplicas>;

export interface ExcludeReplicas {
  /** The directed read replica selector. */
  replicaSelections?: Array<ReplicaSelection>;
}

export const ExcludeReplicas: Schema.Schema<ExcludeReplicas> = Schema.suspend(() => Schema.Struct({
  replicaSelections: Schema.optional(Schema.Array(ReplicaSelection)),
})).annotate({ identifier: "ExcludeReplicas" }) as any as Schema.Schema<ExcludeReplicas>;

export interface DirectedReadOptions {
  /** `Include_replicas` indicates the order of replicas (as they appear in this list) to process the request. If `auto_failover_disabled` is set to `true` and all replicas are exhausted without finding a healthy replica, Spanner waits for a replica in the list to become available, requests might fail due to `DEADLINE_EXCEEDED` errors. */
  includeReplicas?: IncludeReplicas;
  /** `Exclude_replicas` indicates that specified replicas should be excluded from serving requests. Spanner doesn't route requests to the replicas in this list. */
  excludeReplicas?: ExcludeReplicas;
}

export const DirectedReadOptions: Schema.Schema<DirectedReadOptions> = Schema.suspend(() => Schema.Struct({
  includeReplicas: Schema.optional(IncludeReplicas),
  excludeReplicas: Schema.optional(ExcludeReplicas),
})).annotate({ identifier: "DirectedReadOptions" }) as any as Schema.Schema<DirectedReadOptions>;

export interface ExecuteSqlRequest {
  /** It isn't always possible for Cloud Spanner to infer the right SQL type from a JSON value. For example, values of type `BYTES` and values of type `STRING` both appear in params as JSON strings. In these cases, you can use `param_types` to specify the exact SQL type for some or all of the SQL statement parameters. See the definition of Type for more information about SQL types. */
  paramTypes?: Record<string, Type>;
  /** Query optimizer configuration to use for the given query. */
  queryOptions?: QueryOptions;
  /** A per-transaction sequence number used to identify this request. This field makes each request idempotent such that if the request is received multiple times, at most one succeeds. The sequence number must be monotonically increasing within the transaction. If a request arrives for the first time with an out-of-order sequence number, the transaction can be aborted. Replays of previously handled requests yield the same response as the first execution. Required for DML statements. Ignored for queries. */
  seqno?: string;
  /** Common options for this request. */
  requestOptions?: RequestOptions;
  /** Parameter names and values that bind to placeholders in the SQL string. A parameter placeholder consists of the `@` character followed by the parameter name (for example, `@firstName`). Parameter names must conform to the naming requirements of identifiers as specified at https://cloud.google.com/spanner/docs/lexical#identifiers. Parameters can appear anywhere that a literal value is expected. The same parameter name can be used more than once, for example: `"WHERE id > @msg_id AND id < @msg_id + 100"` It's an error to execute a SQL statement with unbound parameters. */
  params?: Record<string, unknown>;
  /** Directed read options for this request. */
  directedReadOptions?: DirectedReadOptions;
  /** If this request is resuming a previously interrupted SQL statement execution, `resume_token` should be copied from the last PartialResultSet yielded before the interruption. Doing this enables the new SQL statement execution to resume where the last one left off. The rest of the request parameters must exactly match the request that yielded this token. */
  resumeToken?: string;
  /** Used to control the amount of debugging information returned in ResultSetStats. If partition_token is set, query_mode can only be set to QueryMode.NORMAL. */
  queryMode?: "NORMAL" | "PLAN" | "PROFILE" | "WITH_STATS" | "WITH_PLAN_AND_STATS" | (string & {});
  /** If present, results are restricted to the specified partition previously created using `PartitionQuery`. There must be an exact match for the values of fields common to this message and the `PartitionQueryRequest` message used to create this `partition_token`. */
  partitionToken?: string;
  /** Optional. If set to `true`, this statement marks the end of the transaction. After this statement executes, you must commit or abort the transaction. Attempts to execute any other requests against this transaction (including reads and queries) are rejected. For DML statements, setting this option might cause some error reporting to be deferred until commit time (for example, validation of unique constraints). Given this, successful execution of a DML statement shouldn't be assumed until a subsequent `Commit` call completes successfully. */
  lastStatement?: boolean;
  /** Required. The SQL string. */
  sql?: string;
  /** If this is for a partitioned query and this field is set to `true`, the request is executed with Spanner Data Boost independent compute resources. If the field is set to `true` but the request doesn't set `partition_token`, the API returns an `INVALID_ARGUMENT` error. */
  dataBoostEnabled?: boolean;
  /** The transaction to use. For queries, if none is provided, the default is a temporary read-only transaction with strong concurrency. Standard DML statements require a read-write transaction. To protect against replays, single-use transactions are not supported. The caller must either supply an existing transaction ID or begin a new transaction. Partitioned DML requires an existing Partitioned DML transaction ID. */
  transaction?: TransactionSelector;
}

export const ExecuteSqlRequest: Schema.Schema<ExecuteSqlRequest> = Schema.suspend(() => Schema.Struct({
  paramTypes: Schema.optional(Schema.Record(Schema.String, Type)),
  queryOptions: Schema.optional(QueryOptions),
  seqno: Schema.optional(Schema.String),
  requestOptions: Schema.optional(RequestOptions),
  params: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  directedReadOptions: Schema.optional(DirectedReadOptions),
  resumeToken: Schema.optional(Schema.String),
  queryMode: Schema.optional(Schema.String),
  partitionToken: Schema.optional(Schema.String),
  lastStatement: Schema.optional(Schema.Boolean),
  sql: Schema.optional(Schema.String),
  dataBoostEnabled: Schema.optional(Schema.Boolean),
  transaction: Schema.optional(TransactionSelector),
})).annotate({ identifier: "ExecuteSqlRequest" }) as any as Schema.Schema<ExecuteSqlRequest>;

export interface ReplicaInfo {
  /** The type of replica. */
  type?: "TYPE_UNSPECIFIED" | "READ_WRITE" | "READ_ONLY" | "WITNESS" | (string & {});
  /** The location of the serving resources, e.g., "us-central1". */
  location?: string;
  /** If true, this location is designated as the default leader location where leader replicas are placed. See the [region types documentation](https://cloud.google.com/spanner/docs/instances#region_types) for more details. */
  defaultLeaderLocation?: boolean;
}

export const ReplicaInfo: Schema.Schema<ReplicaInfo> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  defaultLeaderLocation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ReplicaInfo" }) as any as Schema.Schema<ReplicaInfo>;

export interface InstanceConfig {
  /** Allowed values of the "default_leader" schema option for databases in instances that use this instance configuration. */
  leaderOptions?: Array<string>;
  /** A unique identifier for the instance configuration. Values are of the form `projects//instanceConfigs/a-z*`. User instance configuration must start with `custom-`. */
  name?: string;
  /** The geographic placement of nodes in this instance configuration and their replication properties. To create user-managed configurations, input `replicas` must include all replicas in `replicas` of the `base_config` and include one or more replicas in the `optional_replicas` of the `base_config`. */
  replicas?: Array<ReplicaInfo>;
  /** Base configuration name, e.g. projects//instanceConfigs/nam3, based on which this configuration is created. Only set for user-managed configurations. `base_config` must refer to a configuration of type `GOOGLE_MANAGED` in the same project as this configuration. */
  baseConfig?: string;
  /** Output only. Whether this instance configuration is a Google-managed or user-managed configuration. */
  configType?: "TYPE_UNSPECIFIED" | "GOOGLE_MANAGED" | "USER_MANAGED" | (string & {});
  /** Output only. The storage limit in bytes per processing unit. */
  storageLimitPerProcessingUnit?: string;
  /** Output only. Describes whether free instances are available to be created in this instance configuration. */
  freeInstanceAvailability?: "FREE_INSTANCE_AVAILABILITY_UNSPECIFIED" | "AVAILABLE" | "UNSUPPORTED" | "DISABLED" | "QUOTA_EXCEEDED" | (string & {});
  /** Output only. The current instance configuration state. Applicable only for `USER_MANAGED` configurations. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | (string & {});
  /** Cloud Labels are a flexible and lightweight mechanism for organizing cloud resources into groups that reflect a customer's organizational needs and deployment strategies. Cloud Labels can be used to filter collections of resources. They can be used to control how resource metrics are aggregated. And they can be used as arguments to policy management rules (e.g. route, firewall, load balancing, etc.). * Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `a-z{0,62}`. * Label values must be between 0 and 63 characters long and must conform to the regular expression `[a-z0-9_-]{0,63}`. * No more than 64 labels can be associated with a given resource. See https://goo.gl/xmQnxf for more information on and examples of labels. If you plan to use labels in your own code, please note that additional characters may be allowed in the future. Therefore, you are advised to use an internal label representation, such as JSON, which doesn't rely upon specific characters being disallowed. For example, representing labels as the string: name + "_" + value would prove problematic if we were to allow "_" in a future release. */
  labels?: Record<string, string>;
  /** Output only. If true, the instance configuration is being created or updated. If false, there are no ongoing operations for the instance configuration. */
  reconciling?: boolean;
  /** etag is used for optimistic concurrency control as a way to help prevent simultaneous updates of a instance configuration from overwriting each other. It is strongly suggested that systems make use of the etag in the read-modify-write cycle to perform instance configuration updates in order to avoid race conditions: An etag is returned in the response which contains instance configurations, and systems are expected to put that etag in the request to update instance configuration to ensure that their change is applied to the same version of the instance configuration. If no etag is provided in the call to update the instance configuration, then the existing instance configuration is overwritten blindly. */
  etag?: string;
  /** The name of this instance configuration as it appears in UIs. */
  displayName?: string;
  /** Output only. The `QuorumType` of the instance configuration. */
  quorumType?: "QUORUM_TYPE_UNSPECIFIED" | "REGION" | "DUAL_REGION" | "MULTI_REGION" | (string & {});
  /** Output only. The available optional replicas to choose from for user-managed configurations. Populated for Google-managed configurations. */
  optionalReplicas?: Array<ReplicaInfo>;
}

export const InstanceConfig: Schema.Schema<InstanceConfig> = Schema.suspend(() => Schema.Struct({
  leaderOptions: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  replicas: Schema.optional(Schema.Array(ReplicaInfo)),
  baseConfig: Schema.optional(Schema.String),
  configType: Schema.optional(Schema.String),
  storageLimitPerProcessingUnit: Schema.optional(Schema.String),
  freeInstanceAvailability: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  reconciling: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  quorumType: Schema.optional(Schema.String),
  optionalReplicas: Schema.optional(Schema.Array(ReplicaInfo)),
})).annotate({ identifier: "InstanceConfig" }) as any as Schema.Schema<InstanceConfig>;

export interface UpdateInstanceConfigRequest {
  /** Required. The user instance configuration to update, which must always include the instance configuration name. Otherwise, only fields mentioned in update_mask need be included. To prevent conflicts of concurrent updates, etag can be used. */
  instanceConfig?: InstanceConfig;
  /** Required. A mask specifying which fields in InstanceConfig should be updated. The field mask must always be specified; this prevents any future fields in InstanceConfig from being erased accidentally by clients that do not know about them. Only display_name and labels can be updated. */
  updateMask?: string;
  /** An option to validate, but not actually execute, a request, and provide the same response. */
  validateOnly?: boolean;
}

export const UpdateInstanceConfigRequest: Schema.Schema<UpdateInstanceConfigRequest> = Schema.suspend(() => Schema.Struct({
  instanceConfig: Schema.optional(InstanceConfig),
  updateMask: Schema.optional(Schema.String),
  validateOnly: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "UpdateInstanceConfigRequest" }) as any as Schema.Schema<UpdateInstanceConfigRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface Policy {
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  bindings: Schema.optional(Schema.Array(Binding)),
  version: Schema.optional(Schema.Number),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface Key {
  /** Required. The column values making up the split key. */
  keyParts?: Array<unknown>;
}

export const Key: Schema.Schema<Key> = Schema.suspend(() => Schema.Struct({
  keyParts: Schema.optional(Schema.Array(Schema.Unknown)),
})).annotate({ identifier: "Key" }) as any as Schema.Schema<Key>;

export interface GetDatabaseDdlResponse {
  /** Proto descriptors stored in the database. Contains a protobuf-serialized [google.protobuf.FileDescriptorSet](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto). For more details, see protobuffer [self description](https://developers.google.com/protocol-buffers/docs/techniques#self-description). */
  protoDescriptors?: string;
  /** A list of formatted DDL statements defining the schema of the database specified in the request. */
  statements?: Array<string>;
}

export const GetDatabaseDdlResponse: Schema.Schema<GetDatabaseDdlResponse> = Schema.suspend(() => Schema.Struct({
  protoDescriptors: Schema.optional(Schema.String),
  statements: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GetDatabaseDdlResponse" }) as any as Schema.Schema<GetDatabaseDdlResponse>;

export interface AdaptMessageResponse {
  /** Optional. Indicates whether this is the last AdaptMessageResponse in the stream. This field may be optionally set by the server. Clients should not rely on this field being set in all cases. */
  last?: boolean;
  /** Optional. Opaque state updates to be applied by the client. */
  stateUpdates?: Record<string, string>;
  /** Optional. Uninterpreted bytes from the underlying wire protocol. */
  payload?: string;
}

export const AdaptMessageResponse: Schema.Schema<AdaptMessageResponse> = Schema.suspend(() => Schema.Struct({
  last: Schema.optional(Schema.Boolean),
  stateUpdates: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  payload: Schema.optional(Schema.String),
})).annotate({ identifier: "AdaptMessageResponse" }) as any as Schema.Schema<AdaptMessageResponse>;

export interface UpdateInstancePartitionRequest {
  /** Required. The instance partition to update, which must always include the instance partition name. Otherwise, only fields mentioned in field_mask need be included. */
  instancePartition?: InstancePartition;
  /** Required. A mask specifying which fields in InstancePartition should be updated. The field mask must always be specified; this prevents any future fields in InstancePartition from being erased accidentally by clients that do not know about them. */
  fieldMask?: string;
}

export const UpdateInstancePartitionRequest: Schema.Schema<UpdateInstancePartitionRequest> = Schema.suspend(() => Schema.Struct({
  instancePartition: Schema.optional(InstancePartition),
  fieldMask: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateInstancePartitionRequest" }) as any as Schema.Schema<UpdateInstancePartitionRequest>;

export interface ShortRepresentation {
  /** A mapping of (subquery variable name) -> (subquery node id) for cases where the `description` string of this node references a `SCALAR` subquery contained in the expression subtree rooted at this node. The referenced `SCALAR` subquery may not necessarily be a direct child of this node. */
  subqueries?: Record<string, number>;
  /** A string representation of the expression subtree rooted at this node. */
  description?: string;
}

export const ShortRepresentation: Schema.Schema<ShortRepresentation> = Schema.suspend(() => Schema.Struct({
  subqueries: Schema.optional(Schema.Record(Schema.String, Schema.Number)),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "ShortRepresentation" }) as any as Schema.Schema<ShortRepresentation>;

export interface ChildLink {
  /** The node to which the link points. */
  childIndex?: number;
  /** Only present if the child node is SCALAR and corresponds to an output variable of the parent node. The field carries the name of the output variable. For example, a `TableScan` operator that reads rows from a table will have child links to the `SCALAR` nodes representing the output variables created for each column that is read by the operator. The corresponding `variable` fields will be set to the variable names assigned to the columns. */
  variable?: string;
  /** The type of the link. For example, in Hash Joins this could be used to distinguish between the build child and the probe child, or in the case of the child being an output variable, to represent the tag associated with the output variable. */
  type?: string;
}

export const ChildLink: Schema.Schema<ChildLink> = Schema.suspend(() => Schema.Struct({
  childIndex: Schema.optional(Schema.Number),
  variable: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ChildLink" }) as any as Schema.Schema<ChildLink>;

export interface PlanNode {
  /** Condensed representation for SCALAR nodes. */
  shortRepresentation?: ShortRepresentation;
  /** List of child node `index`es and their relationship to this parent. */
  childLinks?: Array<ChildLink>;
  /** Used to determine the type of node. May be needed for visualizing different kinds of nodes differently. For example, If the node is a SCALAR node, it will have a condensed representation which can be used to directly embed a description of the node in its parent. */
  kind?: "KIND_UNSPECIFIED" | "RELATIONAL" | "SCALAR" | (string & {});
  /** The execution statistics associated with the node, contained in a group of key-value pairs. Only present if the plan was returned as a result of a profile query. For example, number of executions, number of rows/time per execution etc. */
  executionStats?: Record<string, unknown>;
  /** The `PlanNode`'s index in node list. */
  index?: number;
  /** The display name for the node. */
  displayName?: string;
  /** Attributes relevant to the node contained in a group of key-value pairs. For example, a Parameter Reference node could have the following information in its metadata: { "parameter_reference": "param1", "parameter_type": "array" } */
  metadata?: Record<string, unknown>;
}

export const PlanNode: Schema.Schema<PlanNode> = Schema.suspend(() => Schema.Struct({
  shortRepresentation: Schema.optional(ShortRepresentation),
  childLinks: Schema.optional(Schema.Array(ChildLink)),
  kind: Schema.optional(Schema.String),
  executionStats: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  index: Schema.optional(Schema.Number),
  displayName: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "PlanNode" }) as any as Schema.Schema<PlanNode>;

export interface CreateBackupEncryptionConfig {
  /** Required. The encryption type of the backup. */
  encryptionType?: "ENCRYPTION_TYPE_UNSPECIFIED" | "USE_DATABASE_ENCRYPTION" | "GOOGLE_DEFAULT_ENCRYPTION" | "CUSTOMER_MANAGED_ENCRYPTION" | (string & {});
  /** Optional. Specifies the KMS configuration for the one or more keys used to protect the backup. Values are of the form `projects//locations//keyRings//cryptoKeys/`. The keys referenced by `kms_key_names` must fully cover all regions of the backup's instance configuration. Some examples: * For regional (single-region) instance configurations, specify a regional location KMS key. * For multi-region instance configurations of type `GOOGLE_MANAGED`, either specify a multi-region location KMS key or multiple regional location KMS keys that cover all regions in the instance configuration. * For an instance configuration of type `USER_MANAGED`, specify only regional location KMS keys to cover each region in the instance configuration. Multi-region location KMS keys aren't supported for `USER_MANAGED` type instance configurations. */
  kmsKeyNames?: Array<string>;
  /** Optional. This field is maintained for backwards compatibility. For new callers, we recommend using `kms_key_names` to specify the KMS key. Only use `kms_key_name` if the location of the KMS key matches the database instance's configuration (location) exactly. For example, if the KMS location is in `us-central1` or `nam3`, then the database instance must also be in `us-central1` or `nam3`. The Cloud KMS key that is used to encrypt and decrypt the restored database. Set this field only when encryption_type is `CUSTOMER_MANAGED_ENCRYPTION`. Values are of the form `projects//locations//keyRings//cryptoKeys/`. */
  kmsKeyName?: string;
}

export const CreateBackupEncryptionConfig: Schema.Schema<CreateBackupEncryptionConfig> = Schema.suspend(() => Schema.Struct({
  encryptionType: Schema.optional(Schema.String),
  kmsKeyNames: Schema.optional(Schema.Array(Schema.String)),
  kmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateBackupEncryptionConfig" }) as any as Schema.Schema<CreateBackupEncryptionConfig>;

export interface CreateDatabaseRequest {
  /** Optional. The encryption configuration for the database. If this field is not specified, Cloud Spanner will encrypt/decrypt all data at rest using Google default encryption. */
  encryptionConfig?: EncryptionConfig;
  /** Optional. A list of DDL statements to run inside the newly created database. Statements can create tables, indexes, etc. These statements execute atomically with the creation of the database: if there is an error in any statement, the database is not created. */
  extraStatements?: Array<string>;
  /** Required. A `CREATE DATABASE` statement, which specifies the ID of the new database. The database ID must conform to the regular expression `a-z*[a-z0-9]` and be between 2 and 30 characters in length. If the database ID is a reserved word or if it contains a hyphen, the database ID must be enclosed in backticks (`` ` ``). */
  createStatement?: string;
  /** Optional. Proto descriptors used by `CREATE/ALTER PROTO BUNDLE` statements in 'extra_statements'. Contains a protobuf-serialized [`google.protobuf.FileDescriptorSet`](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto) descriptor set. To generate it, [install](https://grpc.io/docs/protoc-installation/) and run `protoc` with --include_imports and --descriptor_set_out. For example, to generate for moon/shot/app.proto, run ``` $protoc --proto_path=/app_path --proto_path=/lib_path \ --include_imports \ --descriptor_set_out=descriptors.data \ moon/shot/app.proto ``` For more details, see protobuffer [self description](https://developers.google.com/protocol-buffers/docs/techniques#self-description). */
  protoDescriptors?: string;
  /** Optional. The dialect of the Cloud Spanner Database. */
  databaseDialect?: "DATABASE_DIALECT_UNSPECIFIED" | "GOOGLE_STANDARD_SQL" | "POSTGRESQL" | (string & {});
}

export const CreateDatabaseRequest: Schema.Schema<CreateDatabaseRequest> = Schema.suspend(() => Schema.Struct({
  encryptionConfig: Schema.optional(EncryptionConfig),
  extraStatements: Schema.optional(Schema.Array(Schema.String)),
  createStatement: Schema.optional(Schema.String),
  protoDescriptors: Schema.optional(Schema.String),
  databaseDialect: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateDatabaseRequest" }) as any as Schema.Schema<CreateDatabaseRequest>;

export interface DatabaseRole {
  /** Required. The name of the database role. Values are of the form `projects//instances//databases//databaseRoles/` where `` is as specified in the `CREATE ROLE` DDL statement. */
  name?: string;
}

export const DatabaseRole: Schema.Schema<DatabaseRole> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "DatabaseRole" }) as any as Schema.Schema<DatabaseRole>;

export interface ListDatabaseRolesResponse {
  /** Database roles that matched the request. */
  databaseRoles?: Array<DatabaseRole>;
  /** `next_page_token` can be sent in a subsequent ListDatabaseRoles call to fetch more of the matching roles. */
  nextPageToken?: string;
}

export const ListDatabaseRolesResponse: Schema.Schema<ListDatabaseRolesResponse> = Schema.suspend(() => Schema.Struct({
  databaseRoles: Schema.optional(Schema.Array(DatabaseRole)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDatabaseRolesResponse" }) as any as Schema.Schema<ListDatabaseRolesResponse>;

export interface InstanceOperationProgress {
  /** Percent completion of the operation. Values are between 0 and 100 inclusive. */
  progressPercent?: number;
  /** Time the request was received. */
  startTime?: string;
  /** If set, the time at which this operation failed or was completed successfully. */
  endTime?: string;
}

export const InstanceOperationProgress: Schema.Schema<InstanceOperationProgress> = Schema.suspend(() => Schema.Struct({
  progressPercent: Schema.optional(Schema.Number),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "InstanceOperationProgress" }) as any as Schema.Schema<InstanceOperationProgress>;

export interface UpdateInstanceConfigMetadata {
  /** The progress of the UpdateInstanceConfig operation. */
  progress?: InstanceOperationProgress;
  /** The desired instance configuration after updating. */
  instanceConfig?: InstanceConfig;
  /** The time at which this operation was cancelled. */
  cancelTime?: string;
}

export const UpdateInstanceConfigMetadata: Schema.Schema<UpdateInstanceConfigMetadata> = Schema.suspend(() => Schema.Struct({
  progress: Schema.optional(InstanceOperationProgress),
  instanceConfig: Schema.optional(InstanceConfig),
  cancelTime: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateInstanceConfigMetadata" }) as any as Schema.Schema<UpdateInstanceConfigMetadata>;

export interface CopyBackupEncryptionConfig {
  /** Required. The encryption type of the backup. */
  encryptionType?: "ENCRYPTION_TYPE_UNSPECIFIED" | "USE_CONFIG_DEFAULT_OR_BACKUP_ENCRYPTION" | "GOOGLE_DEFAULT_ENCRYPTION" | "CUSTOMER_MANAGED_ENCRYPTION" | (string & {});
  /** Optional. This field is maintained for backwards compatibility. For new callers, we recommend using `kms_key_names` to specify the KMS key. Only use `kms_key_name` if the location of the KMS key matches the database instance's configuration (location) exactly. For example, if the KMS location is in `us-central1` or `nam3`, then the database instance must also be in `us-central1` or `nam3`. The Cloud KMS key that is used to encrypt and decrypt the restored database. Set this field only when encryption_type is `CUSTOMER_MANAGED_ENCRYPTION`. Values are of the form `projects//locations//keyRings//cryptoKeys/`. */
  kmsKeyName?: string;
  /** Optional. Specifies the KMS configuration for the one or more keys used to protect the backup. Values are of the form `projects//locations//keyRings//cryptoKeys/`. KMS keys specified can be in any order. The keys referenced by `kms_key_names` must fully cover all regions of the backup's instance configuration. Some examples: * For regional (single-region) instance configurations, specify a regional location KMS key. * For multi-region instance configurations of type `GOOGLE_MANAGED`, either specify a multi-region location KMS key or multiple regional location KMS keys that cover all regions in the instance configuration. * For an instance configuration of type `USER_MANAGED`, specify only regional location KMS keys to cover each region in the instance configuration. Multi-region location KMS keys aren't supported for `USER_MANAGED` type instance configurations. */
  kmsKeyNames?: Array<string>;
}

export const CopyBackupEncryptionConfig: Schema.Schema<CopyBackupEncryptionConfig> = Schema.suspend(() => Schema.Struct({
  encryptionType: Schema.optional(Schema.String),
  kmsKeyName: Schema.optional(Schema.String),
  kmsKeyNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CopyBackupEncryptionConfig" }) as any as Schema.Schema<CopyBackupEncryptionConfig>;

export interface CopyBackupRequest {
  /** Required. The id of the backup copy. The `backup_id` appended to `parent` forms the full backup_uri of the form `projects//instances//backups/`. */
  backupId?: string;
  /** Required. The expiration time of the backup in microsecond granularity. The expiration time must be at least 6 hours and at most 366 days from the `create_time` of the source backup. Once the `expire_time` has passed, the backup is eligible to be automatically deleted by Cloud Spanner to free the resources used by the backup. */
  expireTime?: string;
  /** Required. The source backup to be copied. The source backup needs to be in READY state for it to be copied. Once CopyBackup is in progress, the source backup cannot be deleted or cleaned up on expiration until CopyBackup is finished. Values are of the form: `projects//instances//backups/`. */
  sourceBackup?: string;
  /** Optional. The encryption configuration used to encrypt the backup. If this field is not specified, the backup will use the same encryption configuration as the source backup by default, namely encryption_type = `USE_CONFIG_DEFAULT_OR_BACKUP_ENCRYPTION`. */
  encryptionConfig?: CopyBackupEncryptionConfig;
}

export const CopyBackupRequest: Schema.Schema<CopyBackupRequest> = Schema.suspend(() => Schema.Struct({
  backupId: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  sourceBackup: Schema.optional(Schema.String),
  encryptionConfig: Schema.optional(CopyBackupEncryptionConfig),
})).annotate({ identifier: "CopyBackupRequest" }) as any as Schema.Schema<CopyBackupRequest>;

export interface CreateInstancePartitionRequest {
  /** Required. The ID of the instance partition to create. Valid identifiers are of the form `a-z*[a-z0-9]` and must be between 2 and 64 characters in length. */
  instancePartitionId?: string;
  /** Required. The instance partition to create. The instance_partition.name may be omitted, but if specified must be `/instancePartitions/`. */
  instancePartition?: InstancePartition;
}

export const CreateInstancePartitionRequest: Schema.Schema<CreateInstancePartitionRequest> = Schema.suspend(() => Schema.Struct({
  instancePartitionId: Schema.optional(Schema.String),
  instancePartition: Schema.optional(InstancePartition),
})).annotate({ identifier: "CreateInstancePartitionRequest" }) as any as Schema.Schema<CreateInstancePartitionRequest>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  done: Schema.optional(Schema.Boolean),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListInstancePartitionOperationsResponse {
  /** `next_page_token` can be sent in a subsequent ListInstancePartitionOperations call to fetch more of the matching metadata. */
  nextPageToken?: string;
  /** The list of matching instance partition long-running operations. Each operation's name will be prefixed by the instance partition's name. The operation's metadata field type `metadata.type_url` describes the type of the metadata. */
  operations?: Array<Operation>;
  /** The list of unreachable instance partitions. It includes the names of instance partitions whose operation metadata could not be retrieved within instance_partition_deadline. */
  unreachableInstancePartitions?: Array<string>;
}

export const ListInstancePartitionOperationsResponse: Schema.Schema<ListInstancePartitionOperationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  operations: Schema.optional(Schema.Array(Operation)),
  unreachableInstancePartitions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListInstancePartitionOperationsResponse" }) as any as Schema.Schema<ListInstancePartitionOperationsResponse>;

export interface AdaptMessageRequest {
  /** Required. Identifier for the underlying wire protocol. */
  protocol?: string;
  /** Optional. Opaque request state passed by the client to the server. */
  attachments?: Record<string, string>;
  /** Optional. Uninterpreted bytes from the underlying wire protocol. */
  payload?: string;
}

export const AdaptMessageRequest: Schema.Schema<AdaptMessageRequest> = Schema.suspend(() => Schema.Struct({
  protocol: Schema.optional(Schema.String),
  attachments: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  payload: Schema.optional(Schema.String),
})).annotate({ identifier: "AdaptMessageRequest" }) as any as Schema.Schema<AdaptMessageRequest>;

export interface CreateInstanceConfigMetadata {
  /** The time at which this operation was cancelled. */
  cancelTime?: string;
  /** The progress of the CreateInstanceConfig operation. */
  progress?: InstanceOperationProgress;
  /** The target instance configuration end state. */
  instanceConfig?: InstanceConfig;
}

export const CreateInstanceConfigMetadata: Schema.Schema<CreateInstanceConfigMetadata> = Schema.suspend(() => Schema.Struct({
  cancelTime: Schema.optional(Schema.String),
  progress: Schema.optional(InstanceOperationProgress),
  instanceConfig: Schema.optional(InstanceConfig),
})).annotate({ identifier: "CreateInstanceConfigMetadata" }) as any as Schema.Schema<CreateInstanceConfigMetadata>;

export interface Partition {
  /** This token can be passed to `Read`, `StreamingRead`, `ExecuteSql`, or `ExecuteStreamingSql` requests to restrict the results to those identified by this partition token. */
  partitionToken?: string;
}

export const Partition: Schema.Schema<Partition> = Schema.suspend(() => Schema.Struct({
  partitionToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Partition" }) as any as Schema.Schema<Partition>;

export interface PartitionOptions {
  /** **Note:** This hint is currently ignored by `PartitionQuery` and `PartitionRead` requests. The desired data size for each partition generated. The default for this option is currently 1 GiB. This is only a hint. The actual size of each partition can be smaller or larger than this size request. */
  partitionSizeBytes?: string;
  /** **Note:** This hint is currently ignored by `PartitionQuery` and `PartitionRead` requests. The desired maximum number of partitions to return. For example, this might be set to the number of workers available. The default for this option is currently 10,000. The maximum value is currently 200,000. This is only a hint. The actual number of partitions returned can be smaller or larger than this maximum count request. */
  maxPartitions?: string;
}

export const PartitionOptions: Schema.Schema<PartitionOptions> = Schema.suspend(() => Schema.Struct({
  partitionSizeBytes: Schema.optional(Schema.String),
  maxPartitions: Schema.optional(Schema.String),
})).annotate({ identifier: "PartitionOptions" }) as any as Schema.Schema<PartitionOptions>;

export interface PartitionQueryRequest {
  /** Optional. It isn't always possible for Cloud Spanner to infer the right SQL type from a JSON value. For example, values of type `BYTES` and values of type `STRING` both appear in params as JSON strings. In these cases, `param_types` can be used to specify the exact SQL type for some or all of the SQL query parameters. See the definition of Type for more information about SQL types. */
  paramTypes?: Record<string, Type>;
  /** Required. The query request to generate partitions for. The request fails if the query isn't root partitionable. For a query to be root partitionable, it needs to satisfy a few conditions. For example, if the query execution plan contains a distributed union operator, then it must be the first operator in the plan. For more information about other conditions, see [Read data in parallel](https://cloud.google.com/spanner/docs/reads#read_data_in_parallel). The query request must not contain DML commands, such as `INSERT`, `UPDATE`, or `DELETE`. Use `ExecuteStreamingSql` with a `PartitionedDml` transaction for large, partition-friendly DML operations. */
  sql?: string;
  /** Optional. Parameter names and values that bind to placeholders in the SQL string. A parameter placeholder consists of the `@` character followed by the parameter name (for example, `@firstName`). Parameter names can contain letters, numbers, and underscores. Parameters can appear anywhere that a literal value is expected. The same parameter name can be used more than once, for example: `"WHERE id > @msg_id AND id < @msg_id + 100"` It's an error to execute a SQL statement with unbound parameters. */
  params?: Record<string, unknown>;
  /** Read-only snapshot transactions are supported, read and write and single-use transactions are not. */
  transaction?: TransactionSelector;
  /** Additional options that affect how many partitions are created. */
  partitionOptions?: PartitionOptions;
}

export const PartitionQueryRequest: Schema.Schema<PartitionQueryRequest> = Schema.suspend(() => Schema.Struct({
  paramTypes: Schema.optional(Schema.Record(Schema.String, Type)),
  sql: Schema.optional(Schema.String),
  params: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  transaction: Schema.optional(TransactionSelector),
  partitionOptions: Schema.optional(PartitionOptions),
})).annotate({ identifier: "PartitionQueryRequest" }) as any as Schema.Schema<PartitionQueryRequest>;

export interface ListSessionsResponse {
  /** `next_page_token` can be sent in a subsequent ListSessions call to fetch more of the matching sessions. */
  nextPageToken?: string;
  /** The list of requested sessions. */
  sessions?: Array<Session>;
}

export const ListSessionsResponse: Schema.Schema<ListSessionsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  sessions: Schema.optional(Schema.Array(Session)),
})).annotate({ identifier: "ListSessionsResponse" }) as any as Schema.Schema<ListSessionsResponse>;

export interface CrontabSpec {
  /** Output only. Scheduled backups contain an externally consistent copy of the database at the version time specified in `schedule_spec.cron_spec`. However, Spanner might not initiate the creation of the scheduled backups at that version time. Spanner initiates the creation of scheduled backups within the time window bounded by the version_time specified in `schedule_spec.cron_spec` and version_time + `creation_window`. */
  creationWindow?: string;
  /** Required. Textual representation of the crontab. User can customize the backup frequency and the backup version time using the cron expression. The version time must be in UTC timezone. The backup will contain an externally consistent copy of the database at the version time. Full backups must be scheduled a minimum of 12 hours apart and incremental backups must be scheduled a minimum of 4 hours apart. Examples of valid cron specifications: * `0 2/12 * * *` : every 12 hours at (2, 14) hours past midnight in UTC. * `0 2,14 * * *` : every 12 hours at (2, 14) hours past midnight in UTC. * `0 * /4 * * *` : (incremental backups only) every 4 hours at (0, 4, 8, 12, 16, 20) hours past midnight in UTC. * `0 2 * * *` : once a day at 2 past midnight in UTC. * `0 2 * * 0` : once a week every Sunday at 2 past midnight in UTC. * `0 2 8 * *` : once a month on 8th day at 2 past midnight in UTC. */
  text?: string;
  /** Output only. The time zone of the times in `CrontabSpec.text`. Currently, only UTC is supported. */
  timeZone?: string;
}

export const CrontabSpec: Schema.Schema<CrontabSpec> = Schema.suspend(() => Schema.Struct({
  creationWindow: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
})).annotate({ identifier: "CrontabSpec" }) as any as Schema.Schema<CrontabSpec>;

export interface BackupScheduleSpec {
  /** Cron style schedule specification. */
  cronSpec?: CrontabSpec;
}

export const BackupScheduleSpec: Schema.Schema<BackupScheduleSpec> = Schema.suspend(() => Schema.Struct({
  cronSpec: Schema.optional(CrontabSpec),
})).annotate({ identifier: "BackupScheduleSpec" }) as any as Schema.Schema<BackupScheduleSpec>;

export interface UpdateInstancePartitionMetadata {
  /** The desired end state of the update. */
  instancePartition?: InstancePartition;
  /** The time at which this operation failed or was completed successfully. */
  endTime?: string;
  /** The time at which UpdateInstancePartition request was received. */
  startTime?: string;
  /** The time at which this operation was cancelled. If set, this operation is in the process of undoing itself (which is guaranteed to succeed) and cannot be cancelled again. */
  cancelTime?: string;
}

export const UpdateInstancePartitionMetadata: Schema.Schema<UpdateInstancePartitionMetadata> = Schema.suspend(() => Schema.Struct({
  instancePartition: Schema.optional(InstancePartition),
  endTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  cancelTime: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateInstancePartitionMetadata" }) as any as Schema.Schema<UpdateInstancePartitionMetadata>;

export interface RestoreDatabaseEncryptionConfig {
  /** Optional. This field is maintained for backwards compatibility. For new callers, we recommend using `kms_key_names` to specify the KMS key. Only use `kms_key_name` if the location of the KMS key matches the database instance's configuration (location) exactly. For example, if the KMS location is in `us-central1` or `nam3`, then the database instance must also be in `us-central1` or `nam3`. The Cloud KMS key that is used to encrypt and decrypt the restored database. Set this field only when encryption_type is `CUSTOMER_MANAGED_ENCRYPTION`. Values are of the form `projects//locations//keyRings//cryptoKeys/`. */
  kmsKeyName?: string;
  /** Optional. Specifies the KMS configuration for one or more keys used to encrypt the database. Values have the form `projects//locations//keyRings//cryptoKeys/`. The keys referenced by `kms_key_names` must fully cover all regions of the database's instance configuration. Some examples: * For regional (single-region) instance configurations, specify a regional location KMS key. * For multi-region instance configurations of type `GOOGLE_MANAGED`, either specify a multi-region location KMS key or multiple regional location KMS keys that cover all regions in the instance configuration. * For an instance configuration of type `USER_MANAGED`, specify only regional location KMS keys to cover each region in the instance configuration. Multi-region location KMS keys aren't supported for `USER_MANAGED` type instance configurations. */
  kmsKeyNames?: Array<string>;
  /** Required. The encryption type of the restored database. */
  encryptionType?: "ENCRYPTION_TYPE_UNSPECIFIED" | "USE_CONFIG_DEFAULT_OR_BACKUP_ENCRYPTION" | "GOOGLE_DEFAULT_ENCRYPTION" | "CUSTOMER_MANAGED_ENCRYPTION" | (string & {});
}

export const RestoreDatabaseEncryptionConfig: Schema.Schema<RestoreDatabaseEncryptionConfig> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
  kmsKeyNames: Schema.optional(Schema.Array(Schema.String)),
  encryptionType: Schema.optional(Schema.String),
})).annotate({ identifier: "RestoreDatabaseEncryptionConfig" }) as any as Schema.Schema<RestoreDatabaseEncryptionConfig>;

export interface UpdateInstanceRequest {
  /** Required. The instance to update, which must always include the instance name. Otherwise, only fields mentioned in field_mask need be included. */
  instance?: Instance;
  /** Required. A mask specifying which fields in Instance should be updated. The field mask must always be specified; this prevents any future fields in Instance from being erased accidentally by clients that do not know about them. */
  fieldMask?: string;
}

export const UpdateInstanceRequest: Schema.Schema<UpdateInstanceRequest> = Schema.suspend(() => Schema.Struct({
  instance: Schema.optional(Instance),
  fieldMask: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateInstanceRequest" }) as any as Schema.Schema<UpdateInstanceRequest>;

export interface CreateInstancePartitionMetadata {
  /** The instance partition being created. */
  instancePartition?: InstancePartition;
  /** The time at which this operation was cancelled. If set, this operation is in the process of undoing itself (which is guaranteed to succeed) and cannot be cancelled again. */
  cancelTime?: string;
  /** The time at which the CreateInstancePartition request was received. */
  startTime?: string;
  /** The time at which this operation failed or was completed successfully. */
  endTime?: string;
}

export const CreateInstancePartitionMetadata: Schema.Schema<CreateInstancePartitionMetadata> = Schema.suspend(() => Schema.Struct({
  instancePartition: Schema.optional(InstancePartition),
  cancelTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateInstancePartitionMetadata" }) as any as Schema.Schema<CreateInstancePartitionMetadata>;

export interface IndexAdvice {
  /** Optional. Estimated latency improvement factor. For example if the query currently takes 500 ms to run and the estimated latency with new indexes is 100 ms this field will be 5. */
  improvementFactor?: number;
  /** Optional. DDL statements to add new indexes that will improve the query. */
  ddl?: Array<string>;
}

export const IndexAdvice: Schema.Schema<IndexAdvice> = Schema.suspend(() => Schema.Struct({
  improvementFactor: Schema.optional(Schema.Number),
  ddl: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "IndexAdvice" }) as any as Schema.Schema<IndexAdvice>;

export interface QueryAdvisorResult {
  /** Optional. Index Recommendation for a query. This is an optional field and the recommendation will only be available when the recommendation guarantees significant improvement in query performance. */
  indexAdvice?: Array<IndexAdvice>;
}

export const QueryAdvisorResult: Schema.Schema<QueryAdvisorResult> = Schema.suspend(() => Schema.Struct({
  indexAdvice: Schema.optional(Schema.Array(IndexAdvice)),
})).annotate({ identifier: "QueryAdvisorResult" }) as any as Schema.Schema<QueryAdvisorResult>;

export interface QueryPlan {
  /** Optional. The advise/recommendations for a query. Currently this field will be serving index recommendations for a query. */
  queryAdvice?: QueryAdvisorResult;
  /** The nodes in the query plan. Plan nodes are returned in pre-order starting with the plan root. Each PlanNode's `id` corresponds to its index in `plan_nodes`. */
  planNodes?: Array<PlanNode>;
}

export const QueryPlan: Schema.Schema<QueryPlan> = Schema.suspend(() => Schema.Struct({
  queryAdvice: Schema.optional(QueryAdvisorResult),
  planNodes: Schema.optional(Schema.Array(PlanNode)),
})).annotate({ identifier: "QueryPlan" }) as any as Schema.Schema<QueryPlan>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CommitRequest {
  /** The mutations to be executed when this transaction commits. All mutations are applied atomically, in the order they appear in this list. */
  mutations?: Array<Mutation>;
  /** Common options for this request. */
  requestOptions?: RequestOptions;
  /** If `true`, then statistics related to the transaction is included in the CommitResponse. Default value is `false`. */
  returnCommitStats?: boolean;
  /** Optional. If the read-write transaction was executed on a multiplexed session, then you must include the precommit token with the highest sequence number received in this transaction attempt. Failing to do so results in a `FailedPrecondition` error. */
  precommitToken?: MultiplexedSessionPrecommitToken;
  /** Execute mutations in a temporary transaction. Note that unlike commit of a previously-started transaction, commit with a temporary transaction is non-idempotent. That is, if the `CommitRequest` is sent to Cloud Spanner more than once (for instance, due to retries in the application, or in the transport library), it's possible that the mutations are executed more than once. If this is undesirable, use BeginTransaction and Commit instead. */
  singleUseTransaction?: TransactionOptions;
  /** Commit a previously-started transaction. */
  transactionId?: string;
  /** Optional. The amount of latency this request is configured to incur in order to improve throughput. If this field isn't set, Spanner assumes requests are relatively latency sensitive and automatically determines an appropriate delay time. You can specify a commit delay value between 0 and 500 ms. */
  maxCommitDelay?: string;
}

export const CommitRequest: Schema.Schema<CommitRequest> = Schema.suspend(() => Schema.Struct({
  mutations: Schema.optional(Schema.Array(Mutation)),
  requestOptions: Schema.optional(RequestOptions),
  returnCommitStats: Schema.optional(Schema.Boolean),
  precommitToken: Schema.optional(MultiplexedSessionPrecommitToken),
  singleUseTransaction: Schema.optional(TransactionOptions),
  transactionId: Schema.optional(Schema.String),
  maxCommitDelay: Schema.optional(Schema.String),
})).annotate({ identifier: "CommitRequest" }) as any as Schema.Schema<CommitRequest>;

export interface ListBackupsResponse {
  /** The list of matching backups. Backups returned are ordered by `create_time` in descending order, starting from the most recent `create_time`. */
  backups?: Array<Backup>;
  /** `next_page_token` can be sent in a subsequent ListBackups call to fetch more of the matching backups. */
  nextPageToken?: string;
}

export const ListBackupsResponse: Schema.Schema<ListBackupsResponse> = Schema.suspend(() => Schema.Struct({
  backups: Schema.optional(Schema.Array(Backup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListBackupsResponse" }) as any as Schema.Schema<ListBackupsResponse>;

export interface DdlStatementActionInfo {
  /** The entity type for the DDL statement, for example, TABLE, INDEX, VIEW, etc. This field can be empty string for some DDL statement, for example, for statement "ANALYZE", `entity_type` = "". */
  entityType?: string;
  /** The action for the DDL statement, for example, CREATE, ALTER, DROP, GRANT, etc. This field is a non-empty string. */
  action?: string;
  /** The entity names being operated on the DDL statement. For example, 1. For statement "CREATE TABLE t1(...)", `entity_names` = ["t1"]. 2. For statement "GRANT ROLE r1, r2 ...", `entity_names` = ["r1", "r2"]. 3. For statement "ANALYZE", `entity_names` = []. */
  entityNames?: Array<string>;
}

export const DdlStatementActionInfo: Schema.Schema<DdlStatementActionInfo> = Schema.suspend(() => Schema.Struct({
  entityType: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  entityNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DdlStatementActionInfo" }) as any as Schema.Schema<DdlStatementActionInfo>;

export interface UpdateDatabaseDdlMetadata {
  /** For an update this list contains all the statements. For an individual statement, this list contains only that statement. */
  statements?: Array<string>;
  /** The progress of the UpdateDatabaseDdl operations. All DDL statements will have continuously updating progress, and `progress[i]` is the operation progress for `statements[i]`. Also, `progress[i]` will have start time and end time populated with commit timestamp of operation, as well as a progress of 100% once the operation has completed. */
  progress?: Array<OperationProgress>;
  /** The database being modified. */
  database?: string;
  /** Output only. When true, indicates that the operation is throttled, for example, due to resource constraints. When resources become available the operation will resume and this field will be false again. */
  throttled?: boolean;
  /** The brief action info for the DDL statements. `actions[i]` is the brief info for `statements[i]`. */
  actions?: Array<DdlStatementActionInfo>;
  /** Reports the commit timestamps of all statements that have succeeded so far, where `commit_timestamps[i]` is the commit timestamp for the statement `statements[i]`. */
  commitTimestamps?: Array<string>;
}

export const UpdateDatabaseDdlMetadata: Schema.Schema<UpdateDatabaseDdlMetadata> = Schema.suspend(() => Schema.Struct({
  statements: Schema.optional(Schema.Array(Schema.String)),
  progress: Schema.optional(Schema.Array(OperationProgress)),
  database: Schema.optional(Schema.String),
  throttled: Schema.optional(Schema.Boolean),
  actions: Schema.optional(Schema.Array(DdlStatementActionInfo)),
  commitTimestamps: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "UpdateDatabaseDdlMetadata" }) as any as Schema.Schema<UpdateDatabaseDdlMetadata>;

export interface ReadRequest {
  /** If this is for a partitioned read and this field is set to `true`, the request is executed with Spanner Data Boost independent compute resources. If the field is set to `true` but the request doesn't set `partition_token`, the API returns an `INVALID_ARGUMENT` error. */
  dataBoostEnabled?: boolean;
  /** Optional. Order for the returned rows. By default, Spanner returns result rows in primary key order except for PartitionRead requests. For applications that don't require rows to be returned in primary key (`ORDER_BY_PRIMARY_KEY`) order, setting `ORDER_BY_NO_ORDER` option allows Spanner to optimize row retrieval, resulting in lower latencies in certain cases (for example, bulk point lookups). */
  orderBy?: "ORDER_BY_UNSPECIFIED" | "ORDER_BY_PRIMARY_KEY" | "ORDER_BY_NO_ORDER" | (string & {});
  /** If this request is resuming a previously interrupted read, `resume_token` should be copied from the last PartialResultSet yielded before the interruption. Doing this enables the new read to resume where the last read left off. The rest of the request parameters must exactly match the request that yielded this token. */
  resumeToken?: string;
  /** If present, results are restricted to the specified partition previously created using `PartitionRead`. There must be an exact match for the values of fields common to this message and the PartitionReadRequest message used to create this partition_token. */
  partitionToken?: string;
  /** Required. The name of the table in the database to be read. */
  table?: string;
  /** Required. `key_set` identifies the rows to be yielded. `key_set` names the primary keys of the rows in table to be yielded, unless index is present. If index is present, then key_set instead names index keys in index. If the partition_token field is empty, rows are yielded in table primary key order (if index is empty) or index key order (if index is non-empty). If the partition_token field isn't empty, rows are yielded in an unspecified order. It isn't an error for the `key_set` to name rows that don't exist in the database. Read yields nothing for nonexistent rows. */
  keySet?: KeySet;
  /** If greater than zero, only the first `limit` rows are yielded. If `limit` is zero, the default is no limit. A limit can't be specified if `partition_token` is set. */
  limit?: string;
  /** The transaction to use. If none is provided, the default is a temporary read-only transaction with strong concurrency. */
  transaction?: TransactionSelector;
  /** Directed read options for this request. */
  directedReadOptions?: DirectedReadOptions;
  /** If non-empty, the name of an index on table. This index is used instead of the table primary key when interpreting key_set and sorting result rows. See key_set for further information. */
  index?: string;
  /** Optional. Lock Hint for the request, it can only be used with read-write transactions. */
  lockHint?: "LOCK_HINT_UNSPECIFIED" | "LOCK_HINT_SHARED" | "LOCK_HINT_EXCLUSIVE" | (string & {});
  /** Common options for this request. */
  requestOptions?: RequestOptions;
  /** Required. The columns of table to be returned for each row matching this request. */
  columns?: Array<string>;
}

export const ReadRequest: Schema.Schema<ReadRequest> = Schema.suspend(() => Schema.Struct({
  dataBoostEnabled: Schema.optional(Schema.Boolean),
  orderBy: Schema.optional(Schema.String),
  resumeToken: Schema.optional(Schema.String),
  partitionToken: Schema.optional(Schema.String),
  table: Schema.optional(Schema.String),
  keySet: Schema.optional(KeySet),
  limit: Schema.optional(Schema.String),
  transaction: Schema.optional(TransactionSelector),
  directedReadOptions: Schema.optional(DirectedReadOptions),
  index: Schema.optional(Schema.String),
  lockHint: Schema.optional(Schema.String),
  requestOptions: Schema.optional(RequestOptions),
  columns: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ReadRequest" }) as any as Schema.Schema<ReadRequest>;

export interface Transaction {
  /** For snapshot read-only transactions, the read timestamp chosen for the transaction. Not returned by default: see TransactionOptions.ReadOnly.return_read_timestamp. A timestamp in RFC3339 UTC \"Zulu\" format, accurate to nanoseconds. Example: `"2014-10-02T15:01:23.045123456Z"`. */
  readTimestamp?: string;
  /** `id` may be used to identify the transaction in subsequent Read, ExecuteSql, Commit, or Rollback calls. Single-use read-only transactions do not have IDs, because single-use transactions do not support multiple requests. */
  id?: string;
  /** A precommit token is included in the response of a BeginTransaction request if the read-write transaction is on a multiplexed session and a mutation_key was specified in the BeginTransaction. The precommit token with the highest sequence number from this transaction attempt should be passed to the Commit request for this transaction. */
  precommitToken?: MultiplexedSessionPrecommitToken;
}

export const Transaction: Schema.Schema<Transaction> = Schema.suspend(() => Schema.Struct({
  readTimestamp: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  precommitToken: Schema.optional(MultiplexedSessionPrecommitToken),
})).annotate({ identifier: "Transaction" }) as any as Schema.Schema<Transaction>;

export interface ResultSetMetadata {
  /** A SQL query can be parameterized. In PLAN mode, these parameters can be undeclared. This indicates the field names and types for those undeclared parameters in the SQL query. For example, a SQL query like `"SELECT * FROM Users where UserId = @userId and UserName = @userName "` could return a `undeclared_parameters` value like: "fields": [ { "name": "UserId", "type": { "code": "INT64" } }, { "name": "UserName", "type": { "code": "STRING" } }, ] */
  undeclaredParameters?: StructType;
  /** Indicates the field names and types for the rows in the result set. For example, a SQL query like `"SELECT UserId, UserName FROM Users"` could return a `row_type` value like: "fields": [ { "name": "UserId", "type": { "code": "INT64" } }, { "name": "UserName", "type": { "code": "STRING" } }, ] */
  rowType?: StructType;
  /** If the read or SQL query began a transaction as a side-effect, the information about the new transaction is yielded here. */
  transaction?: Transaction;
}

export const ResultSetMetadata: Schema.Schema<ResultSetMetadata> = Schema.suspend(() => Schema.Struct({
  undeclaredParameters: Schema.optional(StructType),
  rowType: Schema.optional(StructType),
  transaction: Schema.optional(Transaction),
})).annotate({ identifier: "ResultSetMetadata" }) as any as Schema.Schema<ResultSetMetadata>;

export interface MutationGroup {
  /** Required. The mutations in this group. */
  mutations?: Array<Mutation>;
}

export const MutationGroup: Schema.Schema<MutationGroup> = Schema.suspend(() => Schema.Struct({
  mutations: Schema.optional(Schema.Array(Mutation)),
})).annotate({ identifier: "MutationGroup" }) as any as Schema.Schema<MutationGroup>;

export interface BatchCreateSessionsResponse {
  /** The freshly created sessions. */
  session?: Array<Session>;
}

export const BatchCreateSessionsResponse: Schema.Schema<BatchCreateSessionsResponse> = Schema.suspend(() => Schema.Struct({
  session: Schema.optional(Schema.Array(Session)),
})).annotate({ identifier: "BatchCreateSessionsResponse" }) as any as Schema.Schema<BatchCreateSessionsResponse>;

export interface CreateDatabaseMetadata {
  /** The database being created. */
  database?: string;
}

export const CreateDatabaseMetadata: Schema.Schema<CreateDatabaseMetadata> = Schema.suspend(() => Schema.Struct({
  database: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateDatabaseMetadata" }) as any as Schema.Schema<CreateDatabaseMetadata>;

export interface PartitionReadRequest {
  /** Required. The name of the table in the database to be read. */
  table?: string;
  /** Additional options that affect how many partitions are created. */
  partitionOptions?: PartitionOptions;
  /** Read only snapshot transactions are supported, read/write and single use transactions are not. */
  transaction?: TransactionSelector;
  /** The columns of table to be returned for each row matching this request. */
  columns?: Array<string>;
  /** If non-empty, the name of an index on table. This index is used instead of the table primary key when interpreting key_set and sorting result rows. See key_set for further information. */
  index?: string;
  /** Required. `key_set` identifies the rows to be yielded. `key_set` names the primary keys of the rows in table to be yielded, unless index is present. If index is present, then key_set instead names index keys in index. It isn't an error for the `key_set` to name rows that don't exist in the database. Read yields nothing for nonexistent rows. */
  keySet?: KeySet;
}

export const PartitionReadRequest: Schema.Schema<PartitionReadRequest> = Schema.suspend(() => Schema.Struct({
  table: Schema.optional(Schema.String),
  partitionOptions: Schema.optional(PartitionOptions),
  transaction: Schema.optional(TransactionSelector),
  columns: Schema.optional(Schema.Array(Schema.String)),
  index: Schema.optional(Schema.String),
  keySet: Schema.optional(KeySet),
})).annotate({ identifier: "PartitionReadRequest" }) as any as Schema.Schema<PartitionReadRequest>;

export interface BatchWriteRequest {
  /** Common options for this request. */
  requestOptions?: RequestOptions;
  /** Optional. If you don't set the `exclude_txn_from_change_streams` option or if it's set to `false`, then any change streams monitoring columns modified by transactions will capture the updates made within that transaction. */
  excludeTxnFromChangeStreams?: boolean;
  /** Required. The groups of mutations to be applied. */
  mutationGroups?: Array<MutationGroup>;
}

export const BatchWriteRequest: Schema.Schema<BatchWriteRequest> = Schema.suspend(() => Schema.Struct({
  requestOptions: Schema.optional(RequestOptions),
  excludeTxnFromChangeStreams: Schema.optional(Schema.Boolean),
  mutationGroups: Schema.optional(Schema.Array(MutationGroup)),
})).annotate({ identifier: "BatchWriteRequest" }) as any as Schema.Schema<BatchWriteRequest>;

export interface CreateSessionRequest {
  /** Required. The session to create. */
  session?: Session;
}

export const CreateSessionRequest: Schema.Schema<CreateSessionRequest> = Schema.suspend(() => Schema.Struct({
  session: Schema.optional(Session),
})).annotate({ identifier: "CreateSessionRequest" }) as any as Schema.Schema<CreateSessionRequest>;

export interface CopyBackupMetadata {
  /** The name of the backup being created through the copy operation. Values are of the form `projects//instances//backups/`. */
  name?: string;
  /** The progress of the CopyBackup operation. */
  progress?: OperationProgress;
  /** The name of the source backup that is being copied. Values are of the form `projects//instances//backups/`. */
  sourceBackup?: string;
  /** The time at which cancellation of CopyBackup operation was received. Operations.CancelOperation starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  cancelTime?: string;
}

export const CopyBackupMetadata: Schema.Schema<CopyBackupMetadata> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  progress: Schema.optional(OperationProgress),
  sourceBackup: Schema.optional(Schema.String),
  cancelTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CopyBackupMetadata" }) as any as Schema.Schema<CopyBackupMetadata>;

export interface ListBackupOperationsResponse {
  /** The list of matching backup long-running operations. Each operation's name will be prefixed by the backup's name. The operation's metadata field type `metadata.type_url` describes the type of the metadata. Operations returned include those that are pending or have completed/failed/canceled within the last 7 days. Operations returned are ordered by `operation.metadata.value.progress.start_time` in descending order starting from the most recently started operation. */
  operations?: Array<Operation>;
  /** `next_page_token` can be sent in a subsequent ListBackupOperations call to fetch more of the matching metadata. */
  nextPageToken?: string;
}

export const ListBackupOperationsResponse: Schema.Schema<ListBackupOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListBackupOperationsResponse" }) as any as Schema.Schema<ListBackupOperationsResponse>;

export interface SplitPoints {
  /** Required. The list of split keys. In essence, the split boundaries. */
  keys?: Array<Key>;
  /** Optional. The expiration timestamp of the split points. A timestamp in the past means immediate expiration. The maximum value can be 30 days in the future. Defaults to 10 days in the future if not specified. */
  expireTime?: string;
  /** The table to split. */
  table?: string;
  /** The index to split. If specified, the `table` field must refer to the index's base table. */
  index?: string;
}

export const SplitPoints: Schema.Schema<SplitPoints> = Schema.suspend(() => Schema.Struct({
  keys: Schema.optional(Schema.Array(Key)),
  expireTime: Schema.optional(Schema.String),
  table: Schema.optional(Schema.String),
  index: Schema.optional(Schema.String),
})).annotate({ identifier: "SplitPoints" }) as any as Schema.Schema<SplitPoints>;

export interface AddSplitPointsRequest {
  /** Required. The split points to add. */
  splitPoints?: Array<SplitPoints>;
  /** Optional. A user-supplied tag associated with the split points. For example, "initial_data_load", "special_event_1". Defaults to "CloudAddSplitPointsAPI" if not specified. The length of the tag must not exceed 50 characters, or else it is trimmed. Only valid UTF8 characters are allowed. */
  initiator?: string;
}

export const AddSplitPointsRequest: Schema.Schema<AddSplitPointsRequest> = Schema.suspend(() => Schema.Struct({
  splitPoints: Schema.optional(Schema.Array(SplitPoints)),
  initiator: Schema.optional(Schema.String),
})).annotate({ identifier: "AddSplitPointsRequest" }) as any as Schema.Schema<AddSplitPointsRequest>;

export interface ChangeQuorumRequest {
  /** Required. Name of the database in which to apply `ChangeQuorum`. Values are of the form `projects//instances//databases/`. */
  name?: string;
  /** Optional. The etag is the hash of the `QuorumInfo`. The `ChangeQuorum` operation is only performed if the etag matches that of the `QuorumInfo` in the current database resource. Otherwise the API returns an `ABORTED` error. The etag is used for optimistic concurrency control as a way to help prevent simultaneous change quorum requests that could create a race condition. */
  etag?: string;
  /** Required. The type of this quorum. */
  quorumType?: QuorumType;
}

export const ChangeQuorumRequest: Schema.Schema<ChangeQuorumRequest> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  quorumType: Schema.optional(QuorumType),
})).annotate({ identifier: "ChangeQuorumRequest" }) as any as Schema.Schema<ChangeQuorumRequest>;

export interface ChangeQuorumMetadata {
  /** The request for ChangeQuorum. */
  request?: ChangeQuorumRequest;
  /** Time the request was received. */
  startTime?: string;
  /** If set, the time at which this operation failed or was completed successfully. */
  endTime?: string;
}

export const ChangeQuorumMetadata: Schema.Schema<ChangeQuorumMetadata> = Schema.suspend(() => Schema.Struct({
  request: Schema.optional(ChangeQuorumRequest),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ChangeQuorumMetadata" }) as any as Schema.Schema<ChangeQuorumMetadata>;

export interface RollbackRequest {
  /** Required. The transaction to roll back. */
  transactionId?: string;
}

export const RollbackRequest: Schema.Schema<RollbackRequest> = Schema.suspend(() => Schema.Struct({
  transactionId: Schema.optional(Schema.String),
})).annotate({ identifier: "RollbackRequest" }) as any as Schema.Schema<RollbackRequest>;

export interface RestoreDatabaseRequest {
  /** Required. The id of the database to create and restore to. This database must not already exist. The `database_id` appended to `parent` forms the full database name of the form `projects//instances//databases/`. */
  databaseId?: string;
  /** Optional. An encryption configuration describing the encryption type and key resources in Cloud KMS used to encrypt/decrypt the database to restore to. If this field is not specified, the restored database will use the same encryption configuration as the backup by default, namely encryption_type = `USE_CONFIG_DEFAULT_OR_BACKUP_ENCRYPTION`. */
  encryptionConfig?: RestoreDatabaseEncryptionConfig;
  /** Name of the backup from which to restore. Values are of the form `projects//instances//backups/`. */
  backup?: string;
}

export const RestoreDatabaseRequest: Schema.Schema<RestoreDatabaseRequest> = Schema.suspend(() => Schema.Struct({
  databaseId: Schema.optional(Schema.String),
  encryptionConfig: Schema.optional(RestoreDatabaseEncryptionConfig),
  backup: Schema.optional(Schema.String),
})).annotate({ identifier: "RestoreDatabaseRequest" }) as any as Schema.Schema<RestoreDatabaseRequest>;

export interface RestoreDatabaseMetadata {
  /** If exists, the name of the long-running operation that will be used to track the post-restore optimization process to optimize the performance of the restored database, and remove the dependency on the restore source. The name is of the form `projects//instances//databases//operations/` where the is the name of database being created and restored to. The metadata type of the long-running operation is OptimizeRestoredDatabaseMetadata. This long-running operation will be automatically created by the system after the RestoreDatabase long-running operation completes successfully. This operation will not be created if the restore was not successful. */
  optimizeDatabaseOperationName?: string;
  /** The type of the restore source. */
  sourceType?: "TYPE_UNSPECIFIED" | "BACKUP" | (string & {});
  /** Information about the backup used to restore the database. */
  backupInfo?: BackupInfo;
  /** The progress of the RestoreDatabase operation. */
  progress?: OperationProgress;
  /** Name of the database being created and restored to. */
  name?: string;
  /** The time at which cancellation of this operation was received. Operations.CancelOperation starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  cancelTime?: string;
}

export const RestoreDatabaseMetadata: Schema.Schema<RestoreDatabaseMetadata> = Schema.suspend(() => Schema.Struct({
  optimizeDatabaseOperationName: Schema.optional(Schema.String),
  sourceType: Schema.optional(Schema.String),
  backupInfo: Schema.optional(BackupInfo),
  progress: Schema.optional(OperationProgress),
  name: Schema.optional(Schema.String),
  cancelTime: Schema.optional(Schema.String),
})).annotate({ identifier: "RestoreDatabaseMetadata" }) as any as Schema.Schema<RestoreDatabaseMetadata>;

export interface ResultSetStats {
  /** Partitioned DML doesn't offer exactly-once semantics, so it returns a lower bound of the rows modified. */
  rowCountLowerBound?: string;
  /** QueryPlan for the query associated with this result. */
  queryPlan?: QueryPlan;
  /** Standard DML returns an exact count of rows that were modified. */
  rowCountExact?: string;
  /** Aggregated statistics from the execution of the query. Only present when the query is profiled. For example, a query could return the statistics as follows: { "rows_returned": "3", "elapsed_time": "1.22 secs", "cpu_time": "1.19 secs" } */
  queryStats?: Record<string, unknown>;
}

export const ResultSetStats: Schema.Schema<ResultSetStats> = Schema.suspend(() => Schema.Struct({
  rowCountLowerBound: Schema.optional(Schema.String),
  queryPlan: Schema.optional(QueryPlan),
  rowCountExact: Schema.optional(Schema.String),
  queryStats: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "ResultSetStats" }) as any as Schema.Schema<ResultSetStats>;

export interface ResultSet {
  /** Query plan and execution statistics for the SQL statement that produced this result set. These can be requested by setting ExecuteSqlRequest.query_mode. DML statements always produce stats containing the number of rows modified, unless executed using the ExecuteSqlRequest.QueryMode.PLAN ExecuteSqlRequest.query_mode. Other fields might or might not be populated, based on the ExecuteSqlRequest.query_mode. */
  stats?: ResultSetStats;
  /** Optional. A precommit token is included if the read-write transaction is on a multiplexed session. Pass the precommit token with the highest sequence number from this transaction attempt to the Commit request for this transaction. */
  precommitToken?: MultiplexedSessionPrecommitToken;
  /** Metadata about the result set, such as row type information. */
  metadata?: ResultSetMetadata;
  /** Each element in `rows` is a row whose format is defined by metadata.row_type. The ith element in each row matches the ith field in metadata.row_type. Elements are encoded based on type as described here. */
  rows?: Array<Array<unknown>>;
}

export const ResultSet: Schema.Schema<ResultSet> = Schema.suspend(() => Schema.Struct({
  stats: Schema.optional(ResultSetStats),
  precommitToken: Schema.optional(MultiplexedSessionPrecommitToken),
  metadata: Schema.optional(ResultSetMetadata),
  rows: Schema.optional(Schema.Array(Schema.Array(Schema.Unknown))),
})).annotate({ identifier: "ResultSet" }) as any as Schema.Schema<ResultSet>;

export interface ExecuteBatchDmlResponse {
  /** Optional. A precommit token is included if the read-write transaction is on a multiplexed session. Pass the precommit token with the highest sequence number from this transaction attempt should be passed to the Commit request for this transaction. */
  precommitToken?: MultiplexedSessionPrecommitToken;
  /** One ResultSet for each statement in the request that ran successfully, in the same order as the statements in the request. Each ResultSet does not contain any rows. The ResultSetStats in each ResultSet contain the number of rows modified by the statement. Only the first ResultSet in the response contains valid ResultSetMetadata. */
  resultSets?: Array<ResultSet>;
  /** If all DML statements are executed successfully, the status is `OK`. Otherwise, the error status of the first failed statement. */
  status?: Status;
}

export const ExecuteBatchDmlResponse: Schema.Schema<ExecuteBatchDmlResponse> = Schema.suspend(() => Schema.Struct({
  precommitToken: Schema.optional(MultiplexedSessionPrecommitToken),
  resultSets: Schema.optional(Schema.Array(ResultSet)),
  status: Schema.optional(Status),
})).annotate({ identifier: "ExecuteBatchDmlResponse" }) as any as Schema.Schema<ExecuteBatchDmlResponse>;

export interface CompactDatabaseMetadata {
  /** Output only. The time at which cancellation of this operation was received. Operations.CancelOperation starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  cancelTime?: string;
  /** Output only. The database being compacted. */
  database?: string;
  /** Output only. The progress of the compaction operation. */
  progress?: OperationProgress;
}

export const CompactDatabaseMetadata: Schema.Schema<CompactDatabaseMetadata> = Schema.suspend(() => Schema.Struct({
  cancelTime: Schema.optional(Schema.String),
  database: Schema.optional(Schema.String),
  progress: Schema.optional(OperationProgress),
})).annotate({ identifier: "CompactDatabaseMetadata" }) as any as Schema.Schema<CompactDatabaseMetadata>;

export interface IncrementalBackupSpec {
}

export const IncrementalBackupSpec: Schema.Schema<IncrementalBackupSpec> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "IncrementalBackupSpec" }) as any as Schema.Schema<IncrementalBackupSpec>;

export interface CreateInstanceRequest {
  /** Required. The instance to create. The name may be omitted, but if specified must be `/instances/`. */
  instance?: Instance;
  /** Required. The ID of the instance to create. Valid identifiers are of the form `a-z*[a-z0-9]` and must be between 2 and 64 characters in length. */
  instanceId?: string;
}

export const CreateInstanceRequest: Schema.Schema<CreateInstanceRequest> = Schema.suspend(() => Schema.Struct({
  instance: Schema.optional(Instance),
  instanceId: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateInstanceRequest" }) as any as Schema.Schema<CreateInstanceRequest>;

export interface InstanceEncryptionConfig {
  /** Optional. This field is maintained for backwards compatibility. For new callers, we recommend using `kms_key_names` to specify the KMS key. Only use `kms_key_name` if the location of the KMS key matches the database instance's configuration (location) exactly. For example, if the KMS location is in `us-central1` or `nam3`, then the database instance must also be in `us-central1` or `nam3`. The Cloud KMS key that is used to encrypt and decrypt the restored database. Values are of the form `projects//locations//keyRings//cryptoKeys/`. */
  kmsKeyName?: string;
  /** Optional. Specifies the KMS configuration for one or more keys used to encrypt the database. Values are of the form `projects//locations//keyRings//cryptoKeys/`. The keys referenced by `kms_key_names` must fully cover all regions of the database's instance configuration. Some examples: * For regional (single-region) instance configurations, specify a regional location KMS key. * For multi-region instance configurations of type `GOOGLE_MANAGED`, either specify a multi-region location KMS key or multiple regional location KMS keys that cover all regions in the instance configuration. * For an instance configuration of type `USER_MANAGED`, specify only regional location KMS keys to cover each region in the instance configuration. Multi-region location KMS keys aren't supported for `USER_MANAGED` type instance configurations. */
  kmsKeyNames?: Array<string>;
}

export const InstanceEncryptionConfig: Schema.Schema<InstanceEncryptionConfig> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
  kmsKeyNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "InstanceEncryptionConfig" }) as any as Schema.Schema<InstanceEncryptionConfig>;

export interface DatabaseMoveConfig {
  /** Required. The unique identifier of the database resource in the Instance. For example, if the database uri is `projects/foo/instances/bar/databases/baz`, then the id to supply here is baz. */
  databaseId?: string;
  /** Optional. Encryption configuration to be used for the database in the target configuration. The encryption configuration must be specified for every database which currently uses CMEK encryption. If a database currently uses Google-managed encryption and a target encryption configuration is not specified, then the database defaults to Google-managed encryption. If a database currently uses Google-managed encryption and a target CMEK encryption is specified, the request is rejected. If a database currently uses CMEK encryption, then a target encryption configuration must be specified. You can't move a CMEK database to a Google-managed encryption database using the MoveInstance API. */
  encryptionConfig?: InstanceEncryptionConfig;
}

export const DatabaseMoveConfig: Schema.Schema<DatabaseMoveConfig> = Schema.suspend(() => Schema.Struct({
  databaseId: Schema.optional(Schema.String),
  encryptionConfig: Schema.optional(InstanceEncryptionConfig),
})).annotate({ identifier: "DatabaseMoveConfig" }) as any as Schema.Schema<DatabaseMoveConfig>;

export interface ListDatabasesResponse {
  /** `next_page_token` can be sent in a subsequent ListDatabases call to fetch more of the matching databases. */
  nextPageToken?: string;
  /** Databases that matched the request. */
  databases?: Array<Database>;
}

export const ListDatabasesResponse: Schema.Schema<ListDatabasesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  databases: Schema.optional(Schema.Array(Database)),
})).annotate({ identifier: "ListDatabasesResponse" }) as any as Schema.Schema<ListDatabasesResponse>;

export interface BatchWriteResponse {
  /** The mutation groups applied in this batch. The values index into the `mutation_groups` field in the corresponding `BatchWriteRequest`. */
  indexes?: Array<number>;
  /** An `OK` status indicates success. Any other status indicates a failure. */
  status?: Status;
  /** The commit timestamp of the transaction that applied this batch. Present if status is OK and the mutation groups were applied, absent otherwise. For mutation groups with conditions, a status=OK and missing commit_timestamp means that the mutation groups were not applied due to the condition not being satisfied after evaluation. */
  commitTimestamp?: string;
}

export const BatchWriteResponse: Schema.Schema<BatchWriteResponse> = Schema.suspend(() => Schema.Struct({
  indexes: Schema.optional(Schema.Array(Schema.Number)),
  status: Schema.optional(Status),
  commitTimestamp: Schema.optional(Schema.String),
})).annotate({ identifier: "BatchWriteResponse" }) as any as Schema.Schema<BatchWriteResponse>;

export interface BackupSchedule {
  /** The schedule creates incremental backup chains. */
  incrementalBackupSpec?: IncrementalBackupSpec;
  /** The schedule creates only full backups. */
  fullBackupSpec?: FullBackupSpec;
  /** Optional. The encryption configuration that is used to encrypt the backup. If this field is not specified, the backup uses the same encryption configuration as the database. */
  encryptionConfig?: CreateBackupEncryptionConfig;
  /** Identifier. Output only for the CreateBackupSchedule operation. Required for the UpdateBackupSchedule operation. A globally unique identifier for the backup schedule which cannot be changed. Values are of the form `projects//instances//databases//backupSchedules/a-z*[a-z0-9]` The final segment of the name must be between 2 and 60 characters in length. */
  name?: string;
  /** Optional. The retention duration of a backup that must be at least 6 hours and at most 366 days. The backup is eligible to be automatically deleted once the retention period has elapsed. */
  retentionDuration?: string;
  /** Output only. The timestamp at which the schedule was last updated. If the schedule has never been updated, this field contains the timestamp when the schedule was first created. */
  updateTime?: string;
  /** Optional. The schedule specification based on which the backup creations are triggered. */
  spec?: BackupScheduleSpec;
}

export const BackupSchedule: Schema.Schema<BackupSchedule> = Schema.suspend(() => Schema.Struct({
  incrementalBackupSpec: Schema.optional(IncrementalBackupSpec),
  fullBackupSpec: Schema.optional(FullBackupSpec),
  encryptionConfig: Schema.optional(CreateBackupEncryptionConfig),
  name: Schema.optional(Schema.String),
  retentionDuration: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  spec: Schema.optional(BackupScheduleSpec),
})).annotate({ identifier: "BackupSchedule" }) as any as Schema.Schema<BackupSchedule>;

export interface ListBackupSchedulesResponse {
  /** The list of backup schedules for a database. */
  backupSchedules?: Array<BackupSchedule>;
  /** `next_page_token` can be sent in a subsequent ListBackupSchedules call to fetch more of the schedules. */
  nextPageToken?: string;
}

export const ListBackupSchedulesResponse: Schema.Schema<ListBackupSchedulesResponse> = Schema.suspend(() => Schema.Struct({
  backupSchedules: Schema.optional(Schema.Array(BackupSchedule)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListBackupSchedulesResponse" }) as any as Schema.Schema<ListBackupSchedulesResponse>;

export interface ListOperationsResponse {
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface CreateInstanceConfigRequest {
  /** Required. The `InstanceConfig` proto of the configuration to create. `instance_config.name` must be `/instanceConfigs/`. `instance_config.base_config` must be a Google-managed configuration name, e.g. /instanceConfigs/us-east1, /instanceConfigs/nam3. */
  instanceConfig?: InstanceConfig;
  /** An option to validate, but not actually execute, a request, and provide the same response. */
  validateOnly?: boolean;
  /** Required. The ID of the instance configuration to create. Valid identifiers are of the form `custom-[-a-z0-9]*[a-z0-9]` and must be between 2 and 64 characters in length. The `custom-` prefix is required to avoid name conflicts with Google-managed configurations. */
  instanceConfigId?: string;
}

export const CreateInstanceConfigRequest: Schema.Schema<CreateInstanceConfigRequest> = Schema.suspend(() => Schema.Struct({
  instanceConfig: Schema.optional(InstanceConfig),
  validateOnly: Schema.optional(Schema.Boolean),
  instanceConfigId: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateInstanceConfigRequest" }) as any as Schema.Schema<CreateInstanceConfigRequest>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(GetPolicyOptions),
})).annotate({ identifier: "GetIamPolicyRequest" }) as any as Schema.Schema<GetIamPolicyRequest>;

export interface PartialResultSet {
  /** Metadata about the result set, such as row type information. Only present in the first response. */
  metadata?: ResultSetMetadata;
  /** Optional. A precommit token is included if the read-write transaction has multiplexed sessions enabled. Pass the precommit token with the highest sequence number from this transaction attempt to the Commit request for this transaction. */
  precommitToken?: MultiplexedSessionPrecommitToken;
  /** Optional. Indicates whether this is the last `PartialResultSet` in the stream. The server might optionally set this field. Clients shouldn't rely on this field being set in all cases. */
  last?: boolean;
  /** If true, then the final value in values is chunked, and must be combined with more values from subsequent `PartialResultSet`s to obtain a complete field value. */
  chunkedValue?: boolean;
  /** Streaming calls might be interrupted for a variety of reasons, such as TCP connection loss. If this occurs, the stream of results can be resumed by re-sending the original request and including `resume_token`. Note that executing any other transaction in the same session invalidates the token. */
  resumeToken?: string;
  /** Query plan and execution statistics for the statement that produced this streaming result set. These can be requested by setting ExecuteSqlRequest.query_mode and are sent only once with the last response in the stream. This field is also present in the last response for DML statements. */
  stats?: ResultSetStats;
  /** A streamed result set consists of a stream of values, which might be split into many `PartialResultSet` messages to accommodate large rows and/or large values. Every N complete values defines a row, where N is equal to the number of entries in metadata.row_type.fields. Most values are encoded based on type as described here. It's possible that the last value in values is "chunked", meaning that the rest of the value is sent in subsequent `PartialResultSet`(s). This is denoted by the chunked_value field. Two or more chunked values can be merged to form a complete value as follows: * `bool/number/null`: can't be chunked * `string`: concatenate the strings * `list`: concatenate the lists. If the last element in a list is a `string`, `list`, or `object`, merge it with the first element in the next list by applying these rules recursively. * `object`: concatenate the (field name, field value) pairs. If a field name is duplicated, then apply these rules recursively to merge the field values. Some examples of merging: Strings are concatenated. "foo", "bar" => "foobar" Lists of non-strings are concatenated. [2, 3], [4] => [2, 3, 4] Lists are concatenated, but the last and first elements are merged because they are strings. ["a", "b"], ["c", "d"] => ["a", "bc", "d"] Lists are concatenated, but the last and first elements are merged because they are lists. Recursively, the last and first elements of the inner lists are merged because they are strings. ["a", ["b", "c"]], [["d"], "e"] => ["a", ["b", "cd"], "e"] Non-overlapping object fields are combined. {"a": "1"}, {"b": "2"} => {"a": "1", "b": 2"} Overlapping object fields are merged. {"a": "1"}, {"a": "2"} => {"a": "12"} Examples of merging objects containing lists of strings. {"a": ["1"]}, {"a": ["2"]} => {"a": ["12"]} For a more complete example, suppose a streaming SQL query is yielding a result set whose rows contain a single string field. The following `PartialResultSet`s might be yielded: { "metadata": { ... } "values": ["Hello", "W"] "chunked_value": true "resume_token": "Af65..." } { "values": ["orl"] "chunked_value": true } { "values": ["d"] "resume_token": "Zx1B..." } This sequence of `PartialResultSet`s encodes two rows, one containing the field value `"Hello"`, and a second containing the field value `"World" = "W" + "orl" + "d"`. Not all `PartialResultSet`s contain a `resume_token`. Execution can only be resumed from a previously yielded `resume_token`. For the above sequence of `PartialResultSet`s, resuming the query with `"resume_token": "Af65..."` yields results from the `PartialResultSet` with value "orl". */
  values?: Array<unknown>;
}

export const PartialResultSet: Schema.Schema<PartialResultSet> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(ResultSetMetadata),
  precommitToken: Schema.optional(MultiplexedSessionPrecommitToken),
  last: Schema.optional(Schema.Boolean),
  chunkedValue: Schema.optional(Schema.Boolean),
  resumeToken: Schema.optional(Schema.String),
  stats: Schema.optional(ResultSetStats),
  values: Schema.optional(Schema.Array(Schema.Unknown)),
})).annotate({ identifier: "PartialResultSet" }) as any as Schema.Schema<PartialResultSet>;

export interface ListInstanceConfigOperationsResponse {
  /** `next_page_token` can be sent in a subsequent ListInstanceConfigOperations call to fetch more of the matching metadata. */
  nextPageToken?: string;
  /** The list of matching instance configuration long-running operations. Each operation's name will be prefixed by the name of the instance configuration. The operation's metadata field type `metadata.type_url` describes the type of the metadata. */
  operations?: Array<Operation>;
}

export const ListInstanceConfigOperationsResponse: Schema.Schema<ListInstanceConfigOperationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  operations: Schema.optional(Schema.Array(Operation)),
})).annotate({ identifier: "ListInstanceConfigOperationsResponse" }) as any as Schema.Schema<ListInstanceConfigOperationsResponse>;

export interface MoveInstanceRequest {
  /** Optional. The configuration for each database in the target instance configuration. */
  targetDatabaseMoveConfigs?: Array<DatabaseMoveConfig>;
  /** Required. The target instance configuration where to move the instance. Values are of the form `projects//instanceConfigs/`. */
  targetConfig?: string;
}

export const MoveInstanceRequest: Schema.Schema<MoveInstanceRequest> = Schema.suspend(() => Schema.Struct({
  targetDatabaseMoveConfigs: Schema.optional(Schema.Array(DatabaseMoveConfig)),
  targetConfig: Schema.optional(Schema.String),
})).annotate({ identifier: "MoveInstanceRequest" }) as any as Schema.Schema<MoveInstanceRequest>;

export interface ListDatabaseOperationsResponse {
  /** The list of matching database long-running operations. Each operation's name will be prefixed by the database's name. The operation's metadata field type `metadata.type_url` describes the type of the metadata. */
  operations?: Array<Operation>;
  /** `next_page_token` can be sent in a subsequent ListDatabaseOperations call to fetch more of the matching metadata. */
  nextPageToken?: string;
}

export const ListDatabaseOperationsResponse: Schema.Schema<ListDatabaseOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDatabaseOperationsResponse" }) as any as Schema.Schema<ListDatabaseOperationsResponse>;

export interface UpdateDatabaseDdlRequest {
  /** Optional. Proto descriptors used by CREATE/ALTER PROTO BUNDLE statements. Contains a protobuf-serialized [google.protobuf.FileDescriptorSet](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto). To generate it, [install](https://grpc.io/docs/protoc-installation/) and run `protoc` with --include_imports and --descriptor_set_out. For example, to generate for moon/shot/app.proto, run ``` $protoc --proto_path=/app_path --proto_path=/lib_path \ --include_imports \ --descriptor_set_out=descriptors.data \ moon/shot/app.proto ``` For more details, see protobuffer [self description](https://developers.google.com/protocol-buffers/docs/techniques#self-description). */
  protoDescriptors?: string;
  /** If empty, the new update request is assigned an automatically-generated operation ID. Otherwise, `operation_id` is used to construct the name of the resulting Operation. Specifying an explicit operation ID simplifies determining whether the statements were executed in the event that the UpdateDatabaseDdl call is replayed, or the return value is otherwise lost: the database and `operation_id` fields can be combined to form the `name` of the resulting longrunning.Operation: `/operations/`. `operation_id` should be unique within the database, and must be a valid identifier: `a-z*`. Note that automatically-generated operation IDs always begin with an underscore. If the named operation already exists, UpdateDatabaseDdl returns `ALREADY_EXISTS`. */
  operationId?: string;
  /** Required. DDL statements to be applied to the database. */
  statements?: Array<string>;
}

export const UpdateDatabaseDdlRequest: Schema.Schema<UpdateDatabaseDdlRequest> = Schema.suspend(() => Schema.Struct({
  protoDescriptors: Schema.optional(Schema.String),
  operationId: Schema.optional(Schema.String),
  statements: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "UpdateDatabaseDdlRequest" }) as any as Schema.Schema<UpdateDatabaseDdlRequest>;

export interface ListInstancesResponse {
  /** The list of requested instances. */
  instances?: Array<Instance>;
  /** `next_page_token` can be sent in a subsequent ListInstances call to fetch more of the matching instances. */
  nextPageToken?: string;
  /** The list of unreachable instances. It includes the names of instances whose metadata could not be retrieved within instance_deadline. */
  unreachable?: Array<string>;
}

export const ListInstancesResponse: Schema.Schema<ListInstancesResponse> = Schema.suspend(() => Schema.Struct({
  instances: Schema.optional(Schema.Array(Instance)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListInstancesResponse" }) as any as Schema.Schema<ListInstancesResponse>;

export interface ListInstanceConfigsResponse {
  /** The list of requested instance configurations. */
  instanceConfigs?: Array<InstanceConfig>;
  /** `next_page_token` can be sent in a subsequent ListInstanceConfigs call to fetch more of the matching instance configurations. */
  nextPageToken?: string;
}

export const ListInstanceConfigsResponse: Schema.Schema<ListInstanceConfigsResponse> = Schema.suspend(() => Schema.Struct({
  instanceConfigs: Schema.optional(Schema.Array(InstanceConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListInstanceConfigsResponse" }) as any as Schema.Schema<ListInstanceConfigsResponse>;

export interface AddSplitPointsResponse {
}

export const AddSplitPointsResponse: Schema.Schema<AddSplitPointsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AddSplitPointsResponse" }) as any as Schema.Schema<AddSplitPointsResponse>;

export interface BeginTransactionRequest {
  /** Optional. Required for read-write transactions on a multiplexed session that commit mutations but don't perform any reads or queries. You must randomly select one of the mutations from the mutation set and send it as a part of this request. */
  mutationKey?: Mutation;
  /** Required. Options for the new transaction. */
  options?: TransactionOptions;
  /** Common options for this request. Priority is ignored for this request. Setting the priority in this `request_options` struct doesn't do anything. To set the priority for a transaction, set it on the reads and writes that are part of this transaction instead. */
  requestOptions?: RequestOptions;
}

export const BeginTransactionRequest: Schema.Schema<BeginTransactionRequest> = Schema.suspend(() => Schema.Struct({
  mutationKey: Schema.optional(Mutation),
  options: Schema.optional(TransactionOptions),
  requestOptions: Schema.optional(RequestOptions),
})).annotate({ identifier: "BeginTransactionRequest" }) as any as Schema.Schema<BeginTransactionRequest>;

export interface PartitionResponse {
  /** Partitions created by this request. */
  partitions?: Array<Partition>;
  /** Transaction created by this request. */
  transaction?: Transaction;
}

export const PartitionResponse: Schema.Schema<PartitionResponse> = Schema.suspend(() => Schema.Struct({
  partitions: Schema.optional(Schema.Array(Partition)),
  transaction: Schema.optional(Transaction),
})).annotate({ identifier: "PartitionResponse" }) as any as Schema.Schema<PartitionResponse>;

export interface AdapterSession {
  /** Identifier. The name of the session. This is always system-assigned. */
  name?: string;
}

export const AdapterSession: Schema.Schema<AdapterSession> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "AdapterSession" }) as any as Schema.Schema<AdapterSession>;

// ==========================================================================
// Operations
// ==========================================================================

/** Return available scans given a Database-specific resource name. */
export interface ListScansRequest {
  /** Specifies which parts of the Scan should be returned in the response. Note, only the SUMMARY view (the default) is currently supported for ListScans. */
  view?: "VIEW_UNSPECIFIED" | "SUMMARY" | "FULL" | (string & {});
  /** A filter expression to restrict the results based on information present in the available Scan collection. The filter applies to all fields within the Scan message except for `data`. */
  filter?: string;
  /** Required. The unique name of the parent resource, specific to the Database service implementing this interface. */
  parent: string;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** The maximum number of items to return. */
  pageSize?: number;
}

export const ListScansRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/scans" }),
  svc,
) as unknown as Schema.Schema<ListScansRequest>;

export type ListScansResponse_Op = ListScansResponse;
export const ListScansResponse_Op = ListScansResponse;

export type ListScansError = CommonErrors;

export const listScans = API.makePaginated(() => ({
  input: ListScansRequest,
  output: ListScansResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the user-managed instance configuration long-running operations in the given project. An instance configuration operation has a name of the form `projects//instanceConfigs//operations/`. The long-running operation metadata field type `metadata.type_url` describes the type of the metadata. Operations returned include those that have completed/failed/canceled within the last 7 days, and pending operations. Operations returned are ordered by `operation.metadata.value.start_time` in descending order starting from the most recently started operation. */
export interface ListProjectsInstanceConfigOperationsRequest {
  /** Number of operations to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size. */
  pageSize?: number;
  /** An expression that filters the list of returned operations. A filter expression consists of a field name, a comparison operator, and a value for filtering. The value must be a string, a number, or a boolean. The comparison operator must be one of: `<`, `>`, `<=`, `>=`, `!=`, `=`, or `:`. Colon `:` is the contains operator. Filter rules are not case sensitive. The following fields in the Operation are eligible for filtering: * `name` - The name of the long-running operation * `done` - False if the operation is in progress, else true. * `metadata.@type` - the type of metadata. For example, the type string for CreateInstanceConfigMetadata is `type.googleapis.com/google.spanner.admin.instance.v1.CreateInstanceConfigMetadata`. * `metadata.` - any field in metadata.value. `metadata.@type` must be specified first, if filtering on metadata fields. * `error` - Error associated with the long-running operation. * `response.@type` - the type of response. * `response.` - any field in response.value. You can combine multiple expressions by enclosing each expression in parentheses. By default, expressions are combined with AND logic. However, you can specify AND, OR, and NOT logic explicitly. Here are a few examples: * `done:true` - The operation is complete. * `(metadata.@type=` \ `type.googleapis.com/google.spanner.admin.instance.v1.CreateInstanceConfigMetadata) AND` \ `(metadata.instance_config.name:custom-config) AND` \ `(metadata.progress.start_time < \"2021-03-28T14:50:00Z\") AND` \ `(error:*)` - Return operations where: * The operation's metadata type is CreateInstanceConfigMetadata. * The instance configuration name contains "custom-config". * The operation started before 2021-03-28T14:50:00Z. * The operation resulted in an error. */
  filter?: string;
  /** If non-empty, `page_token` should contain a next_page_token from a previous ListInstanceConfigOperationsResponse to the same `parent` and with the same `filter`. */
  pageToken?: string;
  /** Required. The project of the instance configuration operations. Values are of the form `projects/`. */
  parent: string;
}

export const ListProjectsInstanceConfigOperationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instanceConfigOperations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstanceConfigOperationsRequest>;

export type ListProjectsInstanceConfigOperationsResponse = ListInstanceConfigOperationsResponse;
export const ListProjectsInstanceConfigOperationsResponse = ListInstanceConfigOperationsResponse;

export type ListProjectsInstanceConfigOperationsError = CommonErrors;

export const listProjectsInstanceConfigOperations = API.makePaginated(() => ({
  input: ListProjectsInstanceConfigOperationsRequest,
  output: ListProjectsInstanceConfigOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an instance configuration. The returned long-running operation can be used to track the progress of updating the instance. If the named instance configuration does not exist, returns `NOT_FOUND`. Only user-managed configurations can be updated. Immediately after the request returns: * The instance configuration's reconciling field is set to true. While the operation is pending: * Cancelling the operation sets its metadata's cancel_time. The operation is guaranteed to succeed at undoing all changes, after which point it terminates with a `CANCELLED` status. * All other attempts to modify the instance configuration are rejected. * Reading the instance configuration via the API continues to give the pre-request values. Upon completion of the returned operation: * Creating instances using the instance configuration uses the new values. * The new values of the instance configuration are readable via the API. * The instance configuration's reconciling field becomes false. The returned long-running operation will have a name of the format `/operations/` and can be used to track the instance configuration modification. The metadata field type is UpdateInstanceConfigMetadata. The response field type is InstanceConfig, if successful. Authorization requires `spanner.instanceConfigs.update` permission on the resource name. */
export interface PatchProjectsInstanceConfigsRequest {
  /** A unique identifier for the instance configuration. Values are of the form `projects//instanceConfigs/a-z*`. User instance configuration must start with `custom-`. */
  name: string;
  /** Request body */
  body?: UpdateInstanceConfigRequest;
}

export const PatchProjectsInstanceConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateInstanceConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/instanceConfigs/{instanceConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsInstanceConfigsRequest>;

export type PatchProjectsInstanceConfigsResponse = Operation;
export const PatchProjectsInstanceConfigsResponse = Operation;

export type PatchProjectsInstanceConfigsError = CommonErrors;

export const patchProjectsInstanceConfigs: API.OperationMethod<PatchProjectsInstanceConfigsRequest, PatchProjectsInstanceConfigsResponse, PatchProjectsInstanceConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsInstanceConfigsRequest,
  output: PatchProjectsInstanceConfigsResponse,
  errors: [],
}));

/** Deletes the instance configuration. Deletion is only allowed when no instances are using the configuration. If any instances are using the configuration, returns `FAILED_PRECONDITION`. Only user-managed configurations can be deleted. Authorization requires `spanner.instanceConfigs.delete` permission on the resource name. */
export interface DeleteProjectsInstanceConfigsRequest {
  /** An option to validate, but not actually execute, a request, and provide the same response. */
  validateOnly?: boolean;
  /** Used for optimistic concurrency control as a way to help prevent simultaneous deletes of an instance configuration from overwriting each other. If not empty, the API only deletes the instance configuration when the etag provided matches the current status of the requested instance configuration. Otherwise, deletes the instance configuration without checking the current status of the requested instance configuration. */
  etag?: string;
  /** Required. The name of the instance configuration to be deleted. Values are of the form `projects//instanceConfigs/` */
  name: string;
}

export const DeleteProjectsInstanceConfigsRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/instanceConfigs/{instanceConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstanceConfigsRequest>;

export type DeleteProjectsInstanceConfigsResponse = Empty;
export const DeleteProjectsInstanceConfigsResponse = Empty;

export type DeleteProjectsInstanceConfigsError = CommonErrors;

export const deleteProjectsInstanceConfigs: API.OperationMethod<DeleteProjectsInstanceConfigsRequest, DeleteProjectsInstanceConfigsResponse, DeleteProjectsInstanceConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstanceConfigsRequest,
  output: DeleteProjectsInstanceConfigsResponse,
  errors: [],
}));

/** Gets information about a particular instance configuration. */
export interface GetProjectsInstanceConfigsRequest {
  /** Required. The name of the requested instance configuration. Values are of the form `projects//instanceConfigs/`. */
  name: string;
}

export const GetProjectsInstanceConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instanceConfigs/{instanceConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstanceConfigsRequest>;

export type GetProjectsInstanceConfigsResponse = InstanceConfig;
export const GetProjectsInstanceConfigsResponse = InstanceConfig;

export type GetProjectsInstanceConfigsError = CommonErrors;

export const getProjectsInstanceConfigs: API.OperationMethod<GetProjectsInstanceConfigsRequest, GetProjectsInstanceConfigsResponse, GetProjectsInstanceConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstanceConfigsRequest,
  output: GetProjectsInstanceConfigsResponse,
  errors: [],
}));

/** Creates an instance configuration and begins preparing it to be used. The returned long-running operation can be used to track the progress of preparing the new instance configuration. The instance configuration name is assigned by the caller. If the named instance configuration already exists, `CreateInstanceConfig` returns `ALREADY_EXISTS`. Immediately after the request returns: * The instance configuration is readable via the API, with all requested attributes. The instance configuration's reconciling field is set to true. Its state is `CREATING`. While the operation is pending: * Cancelling the operation renders the instance configuration immediately unreadable via the API. * Except for deleting the creating resource, all other attempts to modify the instance configuration are rejected. Upon completion of the returned operation: * Instances can be created using the instance configuration. * The instance configuration's reconciling field becomes false. Its state becomes `READY`. The returned long-running operation will have a name of the format `/operations/` and can be used to track creation of the instance configuration. The metadata field type is CreateInstanceConfigMetadata. The response field type is InstanceConfig, if successful. Authorization requires `spanner.instanceConfigs.create` permission on the resource parent. */
export interface CreateProjectsInstanceConfigsRequest {
  /** Required. The name of the project in which to create the instance configuration. Values are of the form `projects/`. */
  parent: string;
  /** Request body */
  body?: CreateInstanceConfigRequest;
}

export const CreateProjectsInstanceConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateInstanceConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instanceConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInstanceConfigsRequest>;

export type CreateProjectsInstanceConfigsResponse = Operation;
export const CreateProjectsInstanceConfigsResponse = Operation;

export type CreateProjectsInstanceConfigsError = CommonErrors;

export const createProjectsInstanceConfigs: API.OperationMethod<CreateProjectsInstanceConfigsRequest, CreateProjectsInstanceConfigsResponse, CreateProjectsInstanceConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInstanceConfigsRequest,
  output: CreateProjectsInstanceConfigsResponse,
  errors: [],
}));

/** Lists the supported instance configurations for a given project. Returns both Google-managed configurations and user-managed configurations. */
export interface ListProjectsInstanceConfigsRequest {
  /** Number of instance configurations to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size. */
  pageSize?: number;
  /** Required. The name of the project for which a list of supported instance configurations is requested. Values are of the form `projects/`. */
  parent: string;
  /** If non-empty, `page_token` should contain a next_page_token from a previous ListInstanceConfigsResponse. */
  pageToken?: string;
}

export const ListProjectsInstanceConfigsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instanceConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstanceConfigsRequest>;

export type ListProjectsInstanceConfigsResponse = ListInstanceConfigsResponse;
export const ListProjectsInstanceConfigsResponse = ListInstanceConfigsResponse;

export type ListProjectsInstanceConfigsError = CommonErrors;

export const listProjectsInstanceConfigs = API.makePaginated(() => ({
  input: ListProjectsInstanceConfigsRequest,
  output: ListProjectsInstanceConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsInstanceConfigsSsdCachesOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
}

export const CancelProjectsInstanceConfigsSsdCachesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instanceConfigs/{instanceConfigsId}/ssdCaches/{ssdCachesId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsInstanceConfigsSsdCachesOperationsRequest>;

export type CancelProjectsInstanceConfigsSsdCachesOperationsResponse = Empty;
export const CancelProjectsInstanceConfigsSsdCachesOperationsResponse = Empty;

export type CancelProjectsInstanceConfigsSsdCachesOperationsError = CommonErrors;

export const cancelProjectsInstanceConfigsSsdCachesOperations: API.OperationMethod<CancelProjectsInstanceConfigsSsdCachesOperationsRequest, CancelProjectsInstanceConfigsSsdCachesOperationsResponse, CancelProjectsInstanceConfigsSsdCachesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsInstanceConfigsSsdCachesOperationsRequest,
  output: CancelProjectsInstanceConfigsSsdCachesOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsInstanceConfigsSsdCachesOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list page size. */
  pageSize?: number;
}

export const ListProjectsInstanceConfigsSsdCachesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instanceConfigs/{instanceConfigsId}/ssdCaches/{ssdCachesId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstanceConfigsSsdCachesOperationsRequest>;

export type ListProjectsInstanceConfigsSsdCachesOperationsResponse = ListOperationsResponse;
export const ListProjectsInstanceConfigsSsdCachesOperationsResponse = ListOperationsResponse;

export type ListProjectsInstanceConfigsSsdCachesOperationsError = CommonErrors;

export const listProjectsInstanceConfigsSsdCachesOperations = API.makePaginated(() => ({
  input: ListProjectsInstanceConfigsSsdCachesOperationsRequest,
  output: ListProjectsInstanceConfigsSsdCachesOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsInstanceConfigsSsdCachesOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsInstanceConfigsSsdCachesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/instanceConfigs/{instanceConfigsId}/ssdCaches/{ssdCachesId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstanceConfigsSsdCachesOperationsRequest>;

export type DeleteProjectsInstanceConfigsSsdCachesOperationsResponse = Empty;
export const DeleteProjectsInstanceConfigsSsdCachesOperationsResponse = Empty;

export type DeleteProjectsInstanceConfigsSsdCachesOperationsError = CommonErrors;

export const deleteProjectsInstanceConfigsSsdCachesOperations: API.OperationMethod<DeleteProjectsInstanceConfigsSsdCachesOperationsRequest, DeleteProjectsInstanceConfigsSsdCachesOperationsResponse, DeleteProjectsInstanceConfigsSsdCachesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstanceConfigsSsdCachesOperationsRequest,
  output: DeleteProjectsInstanceConfigsSsdCachesOperationsResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsInstanceConfigsSsdCachesOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsInstanceConfigsSsdCachesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instanceConfigs/{instanceConfigsId}/ssdCaches/{ssdCachesId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstanceConfigsSsdCachesOperationsRequest>;

export type GetProjectsInstanceConfigsSsdCachesOperationsResponse = Operation;
export const GetProjectsInstanceConfigsSsdCachesOperationsResponse = Operation;

export type GetProjectsInstanceConfigsSsdCachesOperationsError = CommonErrors;

export const getProjectsInstanceConfigsSsdCachesOperations: API.OperationMethod<GetProjectsInstanceConfigsSsdCachesOperationsRequest, GetProjectsInstanceConfigsSsdCachesOperationsResponse, GetProjectsInstanceConfigsSsdCachesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstanceConfigsSsdCachesOperationsRequest,
  output: GetProjectsInstanceConfigsSsdCachesOperationsResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsInstanceConfigsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsInstanceConfigsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instanceConfigs/{instanceConfigsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstanceConfigsOperationsRequest>;

export type GetProjectsInstanceConfigsOperationsResponse = Operation;
export const GetProjectsInstanceConfigsOperationsResponse = Operation;

export type GetProjectsInstanceConfigsOperationsError = CommonErrors;

export const getProjectsInstanceConfigsOperations: API.OperationMethod<GetProjectsInstanceConfigsOperationsRequest, GetProjectsInstanceConfigsOperationsResponse, GetProjectsInstanceConfigsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstanceConfigsOperationsRequest,
  output: GetProjectsInstanceConfigsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsInstanceConfigsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsInstanceConfigsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/instanceConfigs/{instanceConfigsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstanceConfigsOperationsRequest>;

export type DeleteProjectsInstanceConfigsOperationsResponse = Empty;
export const DeleteProjectsInstanceConfigsOperationsResponse = Empty;

export type DeleteProjectsInstanceConfigsOperationsError = CommonErrors;

export const deleteProjectsInstanceConfigsOperations: API.OperationMethod<DeleteProjectsInstanceConfigsOperationsRequest, DeleteProjectsInstanceConfigsOperationsResponse, DeleteProjectsInstanceConfigsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstanceConfigsOperationsRequest,
  output: DeleteProjectsInstanceConfigsOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsInstanceConfigsOperationsRequest {
  /** The standard list page size. */
  pageSize?: number;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page token. */
  pageToken?: string;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
}

export const ListProjectsInstanceConfigsOperationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instanceConfigs/{instanceConfigsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstanceConfigsOperationsRequest>;

export type ListProjectsInstanceConfigsOperationsResponse = ListOperationsResponse;
export const ListProjectsInstanceConfigsOperationsResponse = ListOperationsResponse;

export type ListProjectsInstanceConfigsOperationsError = CommonErrors;

export const listProjectsInstanceConfigsOperations = API.makePaginated(() => ({
  input: ListProjectsInstanceConfigsOperationsRequest,
  output: ListProjectsInstanceConfigsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsInstanceConfigsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
}

export const CancelProjectsInstanceConfigsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instanceConfigs/{instanceConfigsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsInstanceConfigsOperationsRequest>;

export type CancelProjectsInstanceConfigsOperationsResponse = Empty;
export const CancelProjectsInstanceConfigsOperationsResponse = Empty;

export type CancelProjectsInstanceConfigsOperationsError = CommonErrors;

export const cancelProjectsInstanceConfigsOperations: API.OperationMethod<CancelProjectsInstanceConfigsOperationsRequest, CancelProjectsInstanceConfigsOperationsResponse, CancelProjectsInstanceConfigsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsInstanceConfigsOperationsRequest,
  output: CancelProjectsInstanceConfigsOperationsResponse,
  errors: [],
}));

/** Deletes an instance. Immediately upon completion of the request: * Billing ceases for all of the instance's reserved resources. Soon afterward: * The instance and *all of its databases* immediately and irrevocably disappear from the API. All data in the databases is permanently deleted. */
export interface DeleteProjectsInstancesRequest {
  /** Required. The name of the instance to be deleted. Values are of the form `projects//instances/` */
  name: string;
}

export const DeleteProjectsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesRequest>;

export type DeleteProjectsInstancesResponse = Empty;
export const DeleteProjectsInstancesResponse = Empty;

export type DeleteProjectsInstancesError = CommonErrors;

export const deleteProjectsInstances: API.OperationMethod<DeleteProjectsInstancesRequest, DeleteProjectsInstancesResponse, DeleteProjectsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesRequest,
  output: DeleteProjectsInstancesResponse,
  errors: [],
}));

/** Gets information about a particular instance. */
export interface GetProjectsInstancesRequest {
  /** If field_mask is present, specifies the subset of Instance fields that should be returned. If absent, all Instance fields are returned. */
  fieldMask?: string;
  /** Required. The name of the requested instance. Values are of the form `projects//instances/`. */
  name: string;
}

export const GetProjectsInstancesRequest = Schema.Struct({
  fieldMask: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesRequest>;

export type GetProjectsInstancesResponse = Instance;
export const GetProjectsInstancesResponse = Instance;

export type GetProjectsInstancesError = CommonErrors;

export const getProjectsInstances: API.OperationMethod<GetProjectsInstancesRequest, GetProjectsInstancesResponse, GetProjectsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesRequest,
  output: GetProjectsInstancesResponse,
  errors: [],
}));

/** Returns permissions that the caller has on the specified instance resource. Attempting this RPC on a non-existent Cloud Spanner instance resource will result in a NOT_FOUND error if the user has `spanner.instances.list` permission on the containing Google Cloud Project. Otherwise returns an empty set of permissions. */
export interface TestIamPermissionsProjectsInstancesRequest {
  /** REQUIRED: The Cloud Spanner resource for which permissions are being tested. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for database resources. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsInstancesRequest>;

export type TestIamPermissionsProjectsInstancesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsInstancesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsInstancesError = CommonErrors;

export const testIamPermissionsProjectsInstances: API.OperationMethod<TestIamPermissionsProjectsInstancesRequest, TestIamPermissionsProjectsInstancesResponse, TestIamPermissionsProjectsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsInstancesRequest,
  output: TestIamPermissionsProjectsInstancesResponse,
  errors: [],
}));

/** Updates an instance, and begins allocating or releasing resources as requested. The returned long-running operation can be used to track the progress of updating the instance. If the named instance does not exist, returns `NOT_FOUND`. Immediately upon completion of this request: * For resource types for which a decrease in the instance's allocation has been requested, billing is based on the newly-requested level. Until completion of the returned operation: * Cancelling the operation sets its metadata's cancel_time, and begins restoring resources to their pre-request values. The operation is guaranteed to succeed at undoing all resource changes, after which point it terminates with a `CANCELLED` status. * All other attempts to modify the instance are rejected. * Reading the instance via the API continues to give the pre-request resource levels. Upon completion of the returned operation: * Billing begins for all successfully-allocated resources (some types may have lower than the requested levels). * All newly-reserved resources are available for serving the instance's tables. * The instance's new resource levels are readable via the API. The returned long-running operation will have a name of the format `/operations/` and can be used to track the instance modification. The metadata field type is UpdateInstanceMetadata. The response field type is Instance, if successful. Authorization requires `spanner.instances.update` permission on the resource name. */
export interface PatchProjectsInstancesRequest {
  /** Required. A unique identifier for the instance, which cannot be changed after the instance is created. Values are of the form `projects//instances/a-z*[a-z0-9]`. The final segment of the name must be between 2 and 64 characters in length. */
  name: string;
  /** Request body */
  body?: UpdateInstanceRequest;
}

export const PatchProjectsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/instances/{instancesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsInstancesRequest>;

export type PatchProjectsInstancesResponse = Operation;
export const PatchProjectsInstancesResponse = Operation;

export type PatchProjectsInstancesError = CommonErrors;

export const patchProjectsInstances: API.OperationMethod<PatchProjectsInstancesRequest, PatchProjectsInstancesResponse, PatchProjectsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsInstancesRequest,
  output: PatchProjectsInstancesResponse,
  errors: [],
}));

/** Moves an instance to the target instance configuration. You can use the returned long-running operation to track the progress of moving the instance. `MoveInstance` returns `FAILED_PRECONDITION` if the instance meets any of the following criteria: * Is undergoing a move to a different instance configuration * Has backups * Has an ongoing update * Contains any CMEK-enabled databases * Is a free trial instance While the operation is pending: * All other attempts to modify the instance, including changes to its compute capacity, are rejected. * The following database and backup admin operations are rejected: * `DatabaseAdmin.CreateDatabase` * `DatabaseAdmin.UpdateDatabaseDdl` (disabled if default_leader is specified in the request.) * `DatabaseAdmin.RestoreDatabase` * `DatabaseAdmin.CreateBackup` * `DatabaseAdmin.CopyBackup` * Both the source and target instance configurations are subject to hourly compute and storage charges. * The instance might experience higher read-write latencies and a higher transaction abort rate. However, moving an instance doesn't cause any downtime. The returned long-running operation has a name of the format `/operations/` and can be used to track the move instance operation. The metadata field type is MoveInstanceMetadata. The response field type is Instance, if successful. Cancelling the operation sets its metadata's cancel_time. Cancellation is not immediate because it involves moving any data previously moved to the target instance configuration back to the original instance configuration. You can use this operation to track the progress of the cancellation. Upon successful completion of the cancellation, the operation terminates with `CANCELLED` status. If not cancelled, upon completion of the returned operation: * The instance successfully moves to the target instance configuration. * You are billed for compute and storage in target instance configuration. Authorization requires the `spanner.instances.update` permission on the resource instance. For more details, see [Move an instance](https://cloud.google.com/spanner/docs/move-instance). */
export interface MoveProjectsInstancesRequest {
  /** Required. The instance to move. Values are of the form `projects//instances/`. */
  name: string;
  /** Request body */
  body?: MoveInstanceRequest;
}

export const MoveProjectsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MoveInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}:move", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveProjectsInstancesRequest>;

export type MoveProjectsInstancesResponse = Operation;
export const MoveProjectsInstancesResponse = Operation;

export type MoveProjectsInstancesError = CommonErrors;

export const moveProjectsInstances: API.OperationMethod<MoveProjectsInstancesRequest, MoveProjectsInstancesResponse, MoveProjectsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveProjectsInstancesRequest,
  output: MoveProjectsInstancesResponse,
  errors: [],
}));

/** Lists all instances in the given project. */
export interface ListProjectsInstancesRequest {
  /** Number of instances to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size. */
  pageSize?: number;
  /** If non-empty, `page_token` should contain a next_page_token from a previous ListInstancesResponse. */
  pageToken?: string;
  /** Deadline used while retrieving metadata for instances. Instances whose metadata cannot be retrieved within this deadline will be added to unreachable in ListInstancesResponse. */
  instanceDeadline?: string;
  /** Required. The name of the project for which a list of instances is requested. Values are of the form `projects/`. */
  parent: string;
  /** An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: * `name` * `display_name` * `labels.key` where key is the name of a label Some examples of using filters are: * `name:*` --> The instance has a name. * `name:Howl` --> The instance's name contains the string "howl". * `name:HOWL` --> Equivalent to above. * `NAME:howl` --> Equivalent to above. * `labels.env:*` --> The instance has the label "env". * `labels.env:dev` --> The instance has the label "env" and the value of the label contains the string "dev". * `name:howl labels.env:dev` --> The instance's name contains "howl" and it has the label "env" with its value containing "dev". */
  filter?: string;
}

export const ListProjectsInstancesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  instanceDeadline: Schema.optional(Schema.String).pipe(T.HttpQuery("instanceDeadline")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesRequest>;

export type ListProjectsInstancesResponse = ListInstancesResponse;
export const ListProjectsInstancesResponse = ListInstancesResponse;

export type ListProjectsInstancesError = CommonErrors;

export const listProjectsInstances = API.makePaginated(() => ({
  input: ListProjectsInstancesRequest,
  output: ListProjectsInstancesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the access control policy for an instance resource. Returns an empty policy if an instance exists but does not have a policy set. Authorization requires `spanner.instances.getIamPolicy` on resource. */
export interface GetIamPolicyProjectsInstancesRequest {
  /** REQUIRED: The Cloud Spanner resource for which the policy is being retrieved. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for database resources. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsInstancesRequest>;

export type GetIamPolicyProjectsInstancesResponse = Policy;
export const GetIamPolicyProjectsInstancesResponse = Policy;

export type GetIamPolicyProjectsInstancesError = CommonErrors;

export const getIamPolicyProjectsInstances: API.OperationMethod<GetIamPolicyProjectsInstancesRequest, GetIamPolicyProjectsInstancesResponse, GetIamPolicyProjectsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsInstancesRequest,
  output: GetIamPolicyProjectsInstancesResponse,
  errors: [],
}));

/** Creates an instance and begins preparing it to begin serving. The returned long-running operation can be used to track the progress of preparing the new instance. The instance name is assigned by the caller. If the named instance already exists, `CreateInstance` returns `ALREADY_EXISTS`. Immediately upon completion of this request: * The instance is readable via the API, with all requested attributes but no allocated resources. Its state is `CREATING`. Until completion of the returned operation: * Cancelling the operation renders the instance immediately unreadable via the API. * The instance can be deleted. * All other attempts to modify the instance are rejected. Upon completion of the returned operation: * Billing for all successfully-allocated resources begins (some types may have lower than the requested levels). * Databases can be created in the instance. * The instance's allocated resource levels are readable via the API. * The instance's state becomes `READY`. The returned long-running operation will have a name of the format `/operations/` and can be used to track creation of the instance. The metadata field type is CreateInstanceMetadata. The response field type is Instance, if successful. */
export interface CreateProjectsInstancesRequest {
  /** Required. The name of the project in which to create the instance. Values are of the form `projects/`. */
  parent: string;
  /** Request body */
  body?: CreateInstanceRequest;
}

export const CreateProjectsInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInstancesRequest>;

export type CreateProjectsInstancesResponse = Operation;
export const CreateProjectsInstancesResponse = Operation;

export type CreateProjectsInstancesError = CommonErrors;

export const createProjectsInstances: API.OperationMethod<CreateProjectsInstancesRequest, CreateProjectsInstancesResponse, CreateProjectsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInstancesRequest,
  output: CreateProjectsInstancesResponse,
  errors: [],
}));

/** Sets the access control policy on an instance resource. Replaces any existing policy. Authorization requires `spanner.instances.setIamPolicy` on resource. */
export interface SetIamPolicyProjectsInstancesRequest {
  /** REQUIRED: The Cloud Spanner resource for which the policy is being set. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for databases resources. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsInstancesRequest>;

export type SetIamPolicyProjectsInstancesResponse = Policy;
export const SetIamPolicyProjectsInstancesResponse = Policy;

export type SetIamPolicyProjectsInstancesError = CommonErrors;

export const setIamPolicyProjectsInstances: API.OperationMethod<SetIamPolicyProjectsInstancesRequest, SetIamPolicyProjectsInstancesResponse, SetIamPolicyProjectsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsInstancesRequest,
  output: SetIamPolicyProjectsInstancesResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsInstancesOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
}

export const CancelProjectsInstancesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsInstancesOperationsRequest>;

export type CancelProjectsInstancesOperationsResponse = Empty;
export const CancelProjectsInstancesOperationsResponse = Empty;

export type CancelProjectsInstancesOperationsError = CommonErrors;

export const cancelProjectsInstancesOperations: API.OperationMethod<CancelProjectsInstancesOperationsRequest, CancelProjectsInstancesOperationsResponse, CancelProjectsInstancesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsInstancesOperationsRequest,
  output: CancelProjectsInstancesOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsInstancesOperationsRequest {
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page size. */
  pageSize?: number;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list filter. */
  filter?: string;
}

export const ListProjectsInstancesOperationsRequest = Schema.Struct({
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesOperationsRequest>;

export type ListProjectsInstancesOperationsResponse = ListOperationsResponse;
export const ListProjectsInstancesOperationsResponse = ListOperationsResponse;

export type ListProjectsInstancesOperationsError = CommonErrors;

export const listProjectsInstancesOperations = API.makePaginated(() => ({
  input: ListProjectsInstancesOperationsRequest,
  output: ListProjectsInstancesOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsInstancesOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsInstancesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/instances/{instancesId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesOperationsRequest>;

export type DeleteProjectsInstancesOperationsResponse = Empty;
export const DeleteProjectsInstancesOperationsResponse = Empty;

export type DeleteProjectsInstancesOperationsError = CommonErrors;

export const deleteProjectsInstancesOperations: API.OperationMethod<DeleteProjectsInstancesOperationsRequest, DeleteProjectsInstancesOperationsResponse, DeleteProjectsInstancesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesOperationsRequest,
  output: DeleteProjectsInstancesOperationsResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsInstancesOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsInstancesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesOperationsRequest>;

export type GetProjectsInstancesOperationsResponse = Operation;
export const GetProjectsInstancesOperationsResponse = Operation;

export type GetProjectsInstancesOperationsError = CommonErrors;

export const getProjectsInstancesOperations: API.OperationMethod<GetProjectsInstancesOperationsRequest, GetProjectsInstancesOperationsResponse, GetProjectsInstancesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesOperationsRequest,
  output: GetProjectsInstancesOperationsResponse,
  errors: [],
}));

/** Lists instance partition long-running operations in the given instance. An instance partition operation has a name of the form `projects//instances//instancePartitions//operations/`. The long-running operation metadata field type `metadata.type_url` describes the type of the metadata. Operations returned include those that have completed/failed/canceled within the last 7 days, and pending operations. Operations returned are ordered by `operation.metadata.value.start_time` in descending order starting from the most recently started operation. Authorization requires `spanner.instancePartitionOperations.list` permission on the resource parent. */
export interface ListProjectsInstancesInstancePartitionOperationsRequest {
  /** Optional. If non-empty, `page_token` should contain a next_page_token from a previous ListInstancePartitionOperationsResponse to the same `parent` and with the same `filter`. */
  pageToken?: string;
  /** Required. The parent instance of the instance partition operations. Values are of the form `projects//instances/`. */
  parent: string;
  /** Optional. Deadline used while retrieving metadata for instance partition operations. Instance partitions whose operation metadata cannot be retrieved within this deadline will be added to unreachable_instance_partitions in ListInstancePartitionOperationsResponse. */
  instancePartitionDeadline?: string;
  /** Optional. An expression that filters the list of returned operations. A filter expression consists of a field name, a comparison operator, and a value for filtering. The value must be a string, a number, or a boolean. The comparison operator must be one of: `<`, `>`, `<=`, `>=`, `!=`, `=`, or `:`. Colon `:` is the contains operator. Filter rules are not case sensitive. The following fields in the Operation are eligible for filtering: * `name` - The name of the long-running operation * `done` - False if the operation is in progress, else true. * `metadata.@type` - the type of metadata. For example, the type string for CreateInstancePartitionMetadata is `type.googleapis.com/google.spanner.admin.instance.v1.CreateInstancePartitionMetadata`. * `metadata.` - any field in metadata.value. `metadata.@type` must be specified first, if filtering on metadata fields. * `error` - Error associated with the long-running operation. * `response.@type` - the type of response. * `response.` - any field in response.value. You can combine multiple expressions by enclosing each expression in parentheses. By default, expressions are combined with AND logic. However, you can specify AND, OR, and NOT logic explicitly. Here are a few examples: * `done:true` - The operation is complete. * `(metadata.@type=` \ `type.googleapis.com/google.spanner.admin.instance.v1.CreateInstancePartitionMetadata) AND` \ `(metadata.instance_partition.name:custom-instance-partition) AND` \ `(metadata.start_time < \"2021-03-28T14:50:00Z\") AND` \ `(error:*)` - Return operations where: * The operation's metadata type is CreateInstancePartitionMetadata. * The instance partition name contains "custom-instance-partition". * The operation started before 2021-03-28T14:50:00Z. * The operation resulted in an error. */
  filter?: string;
  /** Optional. Number of operations to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size. */
  pageSize?: number;
}

export const ListProjectsInstancesInstancePartitionOperationsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  instancePartitionDeadline: Schema.optional(Schema.String).pipe(T.HttpQuery("instancePartitionDeadline")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/instancePartitionOperations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesInstancePartitionOperationsRequest>;

export type ListProjectsInstancesInstancePartitionOperationsResponse = ListInstancePartitionOperationsResponse;
export const ListProjectsInstancesInstancePartitionOperationsResponse = ListInstancePartitionOperationsResponse;

export type ListProjectsInstancesInstancePartitionOperationsError = CommonErrors;

export const listProjectsInstancesInstancePartitionOperations = API.makePaginated(() => ({
  input: ListProjectsInstancesInstancePartitionOperationsRequest,
  output: ListProjectsInstancesInstancePartitionOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists database longrunning-operations. A database operation has a name of the form `projects//instances//databases//operations/`. The long-running operation metadata field type `metadata.type_url` describes the type of the metadata. Operations returned include those that have completed/failed/canceled within the last 7 days, and pending operations. */
export interface ListProjectsInstancesDatabaseOperationsRequest {
  /** An expression that filters the list of returned operations. A filter expression consists of a field name, a comparison operator, and a value for filtering. The value must be a string, a number, or a boolean. The comparison operator must be one of: `<`, `>`, `<=`, `>=`, `!=`, `=`, or `:`. Colon `:` is the contains operator. Filter rules are not case sensitive. The following fields in the operation are eligible for filtering: * `name` - The name of the long-running operation * `done` - False if the operation is in progress, else true. * `metadata.@type` - the type of metadata. For example, the type string for RestoreDatabaseMetadata is `type.googleapis.com/google.spanner.admin.database.v1.RestoreDatabaseMetadata`. * `metadata.` - any field in metadata.value. `metadata.@type` must be specified first, if filtering on metadata fields. * `error` - Error associated with the long-running operation. * `response.@type` - the type of response. * `response.` - any field in response.value. You can combine multiple expressions by enclosing each expression in parentheses. By default, expressions are combined with AND logic. However, you can specify AND, OR, and NOT logic explicitly. Here are a few examples: * `done:true` - The operation is complete. * `(metadata.@type=type.googleapis.com/google.spanner.admin.database.v1.RestoreDatabaseMetadata) AND` \ `(metadata.source_type:BACKUP) AND` \ `(metadata.backup_info.backup:backup_howl) AND` \ `(metadata.name:restored_howl) AND` \ `(metadata.progress.start_time < \"2018-03-28T14:50:00Z\") AND` \ `(error:*)` - Return operations where: * The operation's metadata type is RestoreDatabaseMetadata. * The database is restored from a backup. * The backup name contains "backup_howl". * The restored database's name contains "restored_howl". * The operation started before 2018-03-28T14:50:00Z. * The operation resulted in an error. */
  filter?: string;
  /** Required. The instance of the database operations. Values are of the form `projects//instances/`. */
  parent: string;
  /** Number of operations to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size. */
  pageSize?: number;
  /** If non-empty, `page_token` should contain a next_page_token from a previous ListDatabaseOperationsResponse to the same `parent` and with the same `filter`. */
  pageToken?: string;
}

export const ListProjectsInstancesDatabaseOperationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/databaseOperations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesDatabaseOperationsRequest>;

export type ListProjectsInstancesDatabaseOperationsResponse = ListDatabaseOperationsResponse;
export const ListProjectsInstancesDatabaseOperationsResponse = ListDatabaseOperationsResponse;

export type ListProjectsInstancesDatabaseOperationsError = CommonErrors;

export const listProjectsInstancesDatabaseOperations = API.makePaginated(() => ({
  input: ListProjectsInstancesDatabaseOperationsRequest,
  output: ListProjectsInstancesDatabaseOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Create a new database by restoring from a completed backup. The new database must be in the same project and in an instance with the same instance configuration as the instance containing the backup. The returned database long-running operation has a name of the format `projects//instances//databases//operations/`, and can be used to track the progress of the operation, and to cancel it. The metadata field type is RestoreDatabaseMetadata. The response type is Database, if successful. Cancelling the returned operation will stop the restore and delete the database. There can be only one database being restored into an instance at a time. Once the restore operation completes, a new restore operation can be initiated, without waiting for the optimize operation associated with the first restore to complete. */
export interface RestoreProjectsInstancesDatabasesRequest {
  /** Required. The name of the instance in which to create the restored database. This instance must be in the same project and have the same instance configuration as the instance containing the source backup. Values are of the form `projects//instances/`. */
  parent: string;
  /** Request body */
  body?: RestoreDatabaseRequest;
}

export const RestoreProjectsInstancesDatabasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RestoreDatabaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases:restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsInstancesDatabasesRequest>;

export type RestoreProjectsInstancesDatabasesResponse = Operation;
export const RestoreProjectsInstancesDatabasesResponse = Operation;

export type RestoreProjectsInstancesDatabasesError = CommonErrors;

export const restoreProjectsInstancesDatabases: API.OperationMethod<RestoreProjectsInstancesDatabasesRequest, RestoreProjectsInstancesDatabasesResponse, RestoreProjectsInstancesDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreProjectsInstancesDatabasesRequest,
  output: RestoreProjectsInstancesDatabasesResponse,
  errors: [],
}));

/** Returns permissions that the caller has on the specified database or backup resource. Attempting this RPC on a non-existent Cloud Spanner database will result in a NOT_FOUND error if the user has `spanner.databases.list` permission on the containing Cloud Spanner instance. Otherwise returns an empty set of permissions. Calling this method on a backup that does not exist will result in a NOT_FOUND error if the user has `spanner.backups.list` permission on the containing instance. Calling this method on a backup schedule that does not exist will result in a NOT_FOUND error if the user has `spanner.backupSchedules.list` permission on the containing database. */
export interface TestIamPermissionsProjectsInstancesDatabasesRequest {
  /** REQUIRED: The Cloud Spanner resource for which permissions are being tested. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for database resources. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsInstancesDatabasesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsInstancesDatabasesRequest>;

export type TestIamPermissionsProjectsInstancesDatabasesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsInstancesDatabasesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsInstancesDatabasesError = CommonErrors;

export const testIamPermissionsProjectsInstancesDatabases: API.OperationMethod<TestIamPermissionsProjectsInstancesDatabasesRequest, TestIamPermissionsProjectsInstancesDatabasesResponse, TestIamPermissionsProjectsInstancesDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsInstancesDatabasesRequest,
  output: TestIamPermissionsProjectsInstancesDatabasesResponse,
  errors: [],
}));

/** Adds split points to specified tables and indexes of a database. */
export interface AddSplitPointsProjectsInstancesDatabasesRequest {
  /** Required. The database on whose tables or indexes the split points are to be added. Values are of the form `projects//instances//databases/`. */
  database: string;
  /** Request body */
  body?: AddSplitPointsRequest;
}

export const AddSplitPointsProjectsInstancesDatabasesRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(AddSplitPointsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}:addSplitPoints", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddSplitPointsProjectsInstancesDatabasesRequest>;

export type AddSplitPointsProjectsInstancesDatabasesResponse = AddSplitPointsResponse;
export const AddSplitPointsProjectsInstancesDatabasesResponse = AddSplitPointsResponse;

export type AddSplitPointsProjectsInstancesDatabasesError = CommonErrors;

export const addSplitPointsProjectsInstancesDatabases: API.OperationMethod<AddSplitPointsProjectsInstancesDatabasesRequest, AddSplitPointsProjectsInstancesDatabasesResponse, AddSplitPointsProjectsInstancesDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddSplitPointsProjectsInstancesDatabasesRequest,
  output: AddSplitPointsProjectsInstancesDatabasesResponse,
  errors: [],
}));

/** Returns the schema of a Cloud Spanner database as a list of formatted DDL statements. This method does not show pending schema updates, those may be queried using the Operations API. */
export interface GetDdlProjectsInstancesDatabasesRequest {
  /** Required. The database whose schema we wish to get. Values are of the form `projects//instances//databases/` */
  database: string;
}

export const GetDdlProjectsInstancesDatabasesRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/ddl" }),
  svc,
) as unknown as Schema.Schema<GetDdlProjectsInstancesDatabasesRequest>;

export type GetDdlProjectsInstancesDatabasesResponse = GetDatabaseDdlResponse;
export const GetDdlProjectsInstancesDatabasesResponse = GetDatabaseDdlResponse;

export type GetDdlProjectsInstancesDatabasesError = CommonErrors;

export const getDdlProjectsInstancesDatabases: API.OperationMethod<GetDdlProjectsInstancesDatabasesRequest, GetDdlProjectsInstancesDatabasesResponse, GetDdlProjectsInstancesDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDdlProjectsInstancesDatabasesRequest,
  output: GetDdlProjectsInstancesDatabasesResponse,
  errors: [],
}));

/** Request a specific scan with Database-specific data for Cloud Key Visualizer. */
export interface GetScansProjectsInstancesDatabasesRequest {
  /** The upper bound for the time range to retrieve Scan data for. */
  endTime?: string;
  /** These fields restrict the Database-specific information returned in the `Scan.data` field. If a `View` is provided that does not include the `Scan.data` field, these are ignored. This range of time must be entirely contained within the defined time range of the targeted scan. The lower bound for the time range to retrieve Scan data for. */
  startTime?: string;
  /** Specifies which parts of the Scan should be returned in the response. Note, if left unspecified, the FULL view is assumed. */
  view?: "VIEW_UNSPECIFIED" | "SUMMARY" | "FULL" | (string & {});
  /** Required. The unique name of the scan containing the requested information, specific to the Database service implementing this interface. */
  name: string;
}

export const GetScansProjectsInstancesDatabasesRequest = Schema.Struct({
  endTime: Schema.optional(Schema.String).pipe(T.HttpQuery("endTime")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/scans" }),
  svc,
) as unknown as Schema.Schema<GetScansProjectsInstancesDatabasesRequest>;

export type GetScansProjectsInstancesDatabasesResponse = Scan;
export const GetScansProjectsInstancesDatabasesResponse = Scan;

export type GetScansProjectsInstancesDatabasesError = CommonErrors;

export const getScansProjectsInstancesDatabases: API.OperationMethod<GetScansProjectsInstancesDatabasesRequest, GetScansProjectsInstancesDatabasesResponse, GetScansProjectsInstancesDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetScansProjectsInstancesDatabasesRequest,
  output: GetScansProjectsInstancesDatabasesResponse,
  errors: [],
}));

/** Updates a Cloud Spanner database. The returned long-running operation can be used to track the progress of updating the database. If the named database does not exist, returns `NOT_FOUND`. While the operation is pending: * The database's reconciling field is set to true. * Cancelling the operation is best-effort. If the cancellation succeeds, the operation metadata's cancel_time is set, the updates are reverted, and the operation terminates with a `CANCELLED` status. * New UpdateDatabase requests will return a `FAILED_PRECONDITION` error until the pending operation is done (returns successfully or with error). * Reading the database via the API continues to give the pre-request values. Upon completion of the returned operation: * The new values are in effect and readable via the API. * The database's reconciling field becomes false. The returned long-running operation will have a name of the format `projects//instances//databases//operations/` and can be used to track the database modification. The metadata field type is UpdateDatabaseMetadata. The response field type is Database, if successful. */
export interface PatchProjectsInstancesDatabasesRequest {
  /** Required. The name of the database. Values are of the form `projects//instances//databases/`, where `` is as specified in the `CREATE DATABASE` statement. This name can be passed to other API methods to identify the database. */
  name: string;
  /** Required. The list of fields to update. Currently, only `enable_drop_protection` field can be updated. */
  updateMask?: string;
  /** Request body */
  body?: Database;
}

export const PatchProjectsInstancesDatabasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Database).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsInstancesDatabasesRequest>;

export type PatchProjectsInstancesDatabasesResponse = Operation;
export const PatchProjectsInstancesDatabasesResponse = Operation;

export type PatchProjectsInstancesDatabasesError = CommonErrors;

export const patchProjectsInstancesDatabases: API.OperationMethod<PatchProjectsInstancesDatabasesRequest, PatchProjectsInstancesDatabasesResponse, PatchProjectsInstancesDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsInstancesDatabasesRequest,
  output: PatchProjectsInstancesDatabasesResponse,
  errors: [],
}));

/** Sets the access control policy on a database or backup resource. Replaces any existing policy. Authorization requires `spanner.databases.setIamPolicy` permission on resource. For backups, authorization requires `spanner.backups.setIamPolicy` permission on resource. For backup schedules, authorization requires `spanner.backupSchedules.setIamPolicy` permission on resource. */
export interface SetIamPolicyProjectsInstancesDatabasesRequest {
  /** REQUIRED: The Cloud Spanner resource for which the policy is being set. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for databases resources. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsInstancesDatabasesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsInstancesDatabasesRequest>;

export type SetIamPolicyProjectsInstancesDatabasesResponse = Policy;
export const SetIamPolicyProjectsInstancesDatabasesResponse = Policy;

export type SetIamPolicyProjectsInstancesDatabasesError = CommonErrors;

export const setIamPolicyProjectsInstancesDatabases: API.OperationMethod<SetIamPolicyProjectsInstancesDatabasesRequest, SetIamPolicyProjectsInstancesDatabasesResponse, SetIamPolicyProjectsInstancesDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsInstancesDatabasesRequest,
  output: SetIamPolicyProjectsInstancesDatabasesResponse,
  errors: [],
}));

/** Lists Cloud Spanner databases. */
export interface ListProjectsInstancesDatabasesRequest {
  /** Number of databases to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size. */
  pageSize?: number;
  /** If non-empty, `page_token` should contain a next_page_token from a previous ListDatabasesResponse. */
  pageToken?: string;
  /** Required. The instance whose databases should be listed. Values are of the form `projects//instances/`. */
  parent: string;
}

export const ListProjectsInstancesDatabasesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/databases" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesDatabasesRequest>;

export type ListProjectsInstancesDatabasesResponse = ListDatabasesResponse;
export const ListProjectsInstancesDatabasesResponse = ListDatabasesResponse;

export type ListProjectsInstancesDatabasesError = CommonErrors;

export const listProjectsInstancesDatabases = API.makePaginated(() => ({
  input: ListProjectsInstancesDatabasesRequest,
  output: ListProjectsInstancesDatabasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** `ChangeQuorum` is strictly restricted to databases that use dual-region instance configurations. Initiates a background operation to change the quorum of a database from dual-region mode to single-region mode or vice versa. The returned long-running operation has a name of the format `projects//instances//databases//operations/` and can be used to track execution of the `ChangeQuorum`. The metadata field type is ChangeQuorumMetadata. Authorization requires `spanner.databases.changequorum` permission on the resource database. */
export interface ChangequorumProjectsInstancesDatabasesRequest {
  /** Required. Name of the database in which to apply `ChangeQuorum`. Values are of the form `projects//instances//databases/`. */
  name: string;
  /** Request body */
  body?: ChangeQuorumRequest;
}

export const ChangequorumProjectsInstancesDatabasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ChangeQuorumRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}:changequorum", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ChangequorumProjectsInstancesDatabasesRequest>;

export type ChangequorumProjectsInstancesDatabasesResponse = Operation;
export const ChangequorumProjectsInstancesDatabasesResponse = Operation;

export type ChangequorumProjectsInstancesDatabasesError = CommonErrors;

export const changequorumProjectsInstancesDatabases: API.OperationMethod<ChangequorumProjectsInstancesDatabasesRequest, ChangequorumProjectsInstancesDatabasesResponse, ChangequorumProjectsInstancesDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ChangequorumProjectsInstancesDatabasesRequest,
  output: ChangequorumProjectsInstancesDatabasesResponse,
  errors: [],
}));

/** Updates the schema of a Cloud Spanner database by creating/altering/dropping tables, columns, indexes, etc. The returned long-running operation will have a name of the format `/operations/` and can be used to track execution of the schema changes. The metadata field type is UpdateDatabaseDdlMetadata. The operation has no response. */
export interface UpdateDdlProjectsInstancesDatabasesRequest {
  /** Required. The database to update. */
  database: string;
  /** Request body */
  body?: UpdateDatabaseDdlRequest;
}

export const UpdateDdlProjectsInstancesDatabasesRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(UpdateDatabaseDdlRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/ddl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateDdlProjectsInstancesDatabasesRequest>;

export type UpdateDdlProjectsInstancesDatabasesResponse = Operation;
export const UpdateDdlProjectsInstancesDatabasesResponse = Operation;

export type UpdateDdlProjectsInstancesDatabasesError = CommonErrors;

export const updateDdlProjectsInstancesDatabases: API.OperationMethod<UpdateDdlProjectsInstancesDatabasesRequest, UpdateDdlProjectsInstancesDatabasesResponse, UpdateDdlProjectsInstancesDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateDdlProjectsInstancesDatabasesRequest,
  output: UpdateDdlProjectsInstancesDatabasesResponse,
  errors: [],
}));

/** Gets the access control policy for a database or backup resource. Returns an empty policy if a database or backup exists but does not have a policy set. Authorization requires `spanner.databases.getIamPolicy` permission on resource. For backups, authorization requires `spanner.backups.getIamPolicy` permission on resource. For backup schedules, authorization requires `spanner.backupSchedules.getIamPolicy` permission on resource. */
export interface GetIamPolicyProjectsInstancesDatabasesRequest {
  /** REQUIRED: The Cloud Spanner resource for which the policy is being retrieved. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for database resources. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsInstancesDatabasesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsInstancesDatabasesRequest>;

export type GetIamPolicyProjectsInstancesDatabasesResponse = Policy;
export const GetIamPolicyProjectsInstancesDatabasesResponse = Policy;

export type GetIamPolicyProjectsInstancesDatabasesError = CommonErrors;

export const getIamPolicyProjectsInstancesDatabases: API.OperationMethod<GetIamPolicyProjectsInstancesDatabasesRequest, GetIamPolicyProjectsInstancesDatabasesResponse, GetIamPolicyProjectsInstancesDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsInstancesDatabasesRequest,
  output: GetIamPolicyProjectsInstancesDatabasesResponse,
  errors: [],
}));

/** Creates a new Spanner database and starts to prepare it for serving. The returned long-running operation will have a name of the format `/operations/` and can be used to track preparation of the database. The metadata field type is CreateDatabaseMetadata. The response field type is Database, if successful. */
export interface CreateProjectsInstancesDatabasesRequest {
  /** Required. The name of the instance that will serve the new database. Values are of the form `projects//instances/`. */
  parent: string;
  /** Request body */
  body?: CreateDatabaseRequest;
}

export const CreateProjectsInstancesDatabasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateDatabaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInstancesDatabasesRequest>;

export type CreateProjectsInstancesDatabasesResponse = Operation;
export const CreateProjectsInstancesDatabasesResponse = Operation;

export type CreateProjectsInstancesDatabasesError = CommonErrors;

export const createProjectsInstancesDatabases: API.OperationMethod<CreateProjectsInstancesDatabasesRequest, CreateProjectsInstancesDatabasesResponse, CreateProjectsInstancesDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInstancesDatabasesRequest,
  output: CreateProjectsInstancesDatabasesResponse,
  errors: [],
}));

/** Gets the state of a Cloud Spanner database. */
export interface GetProjectsInstancesDatabasesRequest {
  /** Required. The name of the requested database. Values are of the form `projects//instances//databases/`. */
  name: string;
}

export const GetProjectsInstancesDatabasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesDatabasesRequest>;

export type GetProjectsInstancesDatabasesResponse = Database;
export const GetProjectsInstancesDatabasesResponse = Database;

export type GetProjectsInstancesDatabasesError = CommonErrors;

export const getProjectsInstancesDatabases: API.OperationMethod<GetProjectsInstancesDatabasesRequest, GetProjectsInstancesDatabasesResponse, GetProjectsInstancesDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesDatabasesRequest,
  output: GetProjectsInstancesDatabasesResponse,
  errors: [],
}));

/** Drops (aka deletes) a Cloud Spanner database. Completed backups for the database will be retained according to their `expire_time`. Note: Cloud Spanner might continue to accept requests for a few seconds after the database has been deleted. */
export interface DropDatabaseProjectsInstancesDatabasesRequest {
  /** Required. The database to be dropped. */
  database: string;
}

export const DropDatabaseProjectsInstancesDatabasesRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}" }),
  svc,
) as unknown as Schema.Schema<DropDatabaseProjectsInstancesDatabasesRequest>;

export type DropDatabaseProjectsInstancesDatabasesResponse = Empty;
export const DropDatabaseProjectsInstancesDatabasesResponse = Empty;

export type DropDatabaseProjectsInstancesDatabasesError = CommonErrors;

export const dropDatabaseProjectsInstancesDatabases: API.OperationMethod<DropDatabaseProjectsInstancesDatabasesRequest, DropDatabaseProjectsInstancesDatabasesResponse, DropDatabaseProjectsInstancesDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DropDatabaseProjectsInstancesDatabasesRequest,
  output: DropDatabaseProjectsInstancesDatabasesResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsInstancesDatabasesOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsInstancesDatabasesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesDatabasesOperationsRequest>;

export type GetProjectsInstancesDatabasesOperationsResponse = Operation;
export const GetProjectsInstancesDatabasesOperationsResponse = Operation;

export type GetProjectsInstancesDatabasesOperationsError = CommonErrors;

export const getProjectsInstancesDatabasesOperations: API.OperationMethod<GetProjectsInstancesDatabasesOperationsRequest, GetProjectsInstancesDatabasesOperationsResponse, GetProjectsInstancesDatabasesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesDatabasesOperationsRequest,
  output: GetProjectsInstancesDatabasesOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsInstancesDatabasesOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsInstancesDatabasesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesDatabasesOperationsRequest>;

export type DeleteProjectsInstancesDatabasesOperationsResponse = Empty;
export const DeleteProjectsInstancesDatabasesOperationsResponse = Empty;

export type DeleteProjectsInstancesDatabasesOperationsError = CommonErrors;

export const deleteProjectsInstancesDatabasesOperations: API.OperationMethod<DeleteProjectsInstancesDatabasesOperationsRequest, DeleteProjectsInstancesDatabasesOperationsResponse, DeleteProjectsInstancesDatabasesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesDatabasesOperationsRequest,
  output: DeleteProjectsInstancesDatabasesOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsInstancesDatabasesOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
}

export const CancelProjectsInstancesDatabasesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsInstancesDatabasesOperationsRequest>;

export type CancelProjectsInstancesDatabasesOperationsResponse = Empty;
export const CancelProjectsInstancesDatabasesOperationsResponse = Empty;

export type CancelProjectsInstancesDatabasesOperationsError = CommonErrors;

export const cancelProjectsInstancesDatabasesOperations: API.OperationMethod<CancelProjectsInstancesDatabasesOperationsRequest, CancelProjectsInstancesDatabasesOperationsResponse, CancelProjectsInstancesDatabasesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsInstancesDatabasesOperationsRequest,
  output: CancelProjectsInstancesDatabasesOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsInstancesDatabasesOperationsRequest {
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list filter. */
  filter?: string;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page token. */
  pageToken?: string;
}

export const ListProjectsInstancesDatabasesOperationsRequest = Schema.Struct({
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesDatabasesOperationsRequest>;

export type ListProjectsInstancesDatabasesOperationsResponse = ListOperationsResponse;
export const ListProjectsInstancesDatabasesOperationsResponse = ListOperationsResponse;

export type ListProjectsInstancesDatabasesOperationsError = CommonErrors;

export const listProjectsInstancesDatabasesOperations = API.makePaginated(() => ({
  input: ListProjectsInstancesDatabasesOperationsRequest,
  output: ListProjectsInstancesDatabasesOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Like Read, except returns the result set as a stream. Unlike Read, there is no limit on the size of the returned result set. However, no individual row in the result set can exceed 100 MiB, and no column value can exceed 10 MiB. */
export interface StreamingReadProjectsInstancesDatabasesSessionsRequest {
  /** Required. The session in which the read should be performed. */
  session: string;
  /** Request body */
  body?: ReadRequest;
}

export const StreamingReadProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(ReadRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions/{sessionsId}:streamingRead", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StreamingReadProjectsInstancesDatabasesSessionsRequest>;

export type StreamingReadProjectsInstancesDatabasesSessionsResponse = PartialResultSet;
export const StreamingReadProjectsInstancesDatabasesSessionsResponse = PartialResultSet;

export type StreamingReadProjectsInstancesDatabasesSessionsError = CommonErrors;

export const streamingReadProjectsInstancesDatabasesSessions: API.OperationMethod<StreamingReadProjectsInstancesDatabasesSessionsRequest, StreamingReadProjectsInstancesDatabasesSessionsResponse, StreamingReadProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StreamingReadProjectsInstancesDatabasesSessionsRequest,
  output: StreamingReadProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Executes an SQL statement, returning all results in a single reply. This method can't be used to return a result set larger than 10 MiB; if the query yields more data than that, the query fails with a `FAILED_PRECONDITION` error. Operations inside read-write transactions might return `ABORTED`. If this occurs, the application should restart the transaction from the beginning. See Transaction for more details. Larger result sets can be fetched in streaming fashion by calling ExecuteStreamingSql instead. The query string can be SQL or [Graph Query Language (GQL)](https://cloud.google.com/spanner/docs/reference/standard-sql/graph-intro). */
export interface ExecuteSqlProjectsInstancesDatabasesSessionsRequest {
  /** Required. The session in which the SQL query should be performed. */
  session: string;
  /** Request body */
  body?: ExecuteSqlRequest;
}

export const ExecuteSqlProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(ExecuteSqlRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions/{sessionsId}:executeSql", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteSqlProjectsInstancesDatabasesSessionsRequest>;

export type ExecuteSqlProjectsInstancesDatabasesSessionsResponse = ResultSet;
export const ExecuteSqlProjectsInstancesDatabasesSessionsResponse = ResultSet;

export type ExecuteSqlProjectsInstancesDatabasesSessionsError = CommonErrors;

export const executeSqlProjectsInstancesDatabasesSessions: API.OperationMethod<ExecuteSqlProjectsInstancesDatabasesSessionsRequest, ExecuteSqlProjectsInstancesDatabasesSessionsResponse, ExecuteSqlProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteSqlProjectsInstancesDatabasesSessionsRequest,
  output: ExecuteSqlProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Creates a set of partition tokens that can be used to execute a read operation in parallel. Each of the returned partition tokens can be used by StreamingRead to specify a subset of the read result to read. The same session and read-only transaction must be used by the `PartitionReadRequest` used to create the partition tokens and the `ReadRequests` that use the partition tokens. There are no ordering guarantees on rows returned among the returned partition tokens, or even within each individual `StreamingRead` call issued with a `partition_token`. Partition tokens become invalid when the session used to create them is deleted, is idle for too long, begins a new transaction, or becomes too old. When any of these happen, it isn't possible to resume the read, and the whole operation must be restarted from the beginning. */
export interface PartitionReadProjectsInstancesDatabasesSessionsRequest {
  /** Required. The session used to create the partitions. */
  session: string;
  /** Request body */
  body?: PartitionReadRequest;
}

export const PartitionReadProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(PartitionReadRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions/{sessionsId}:partitionRead", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PartitionReadProjectsInstancesDatabasesSessionsRequest>;

export type PartitionReadProjectsInstancesDatabasesSessionsResponse = PartitionResponse;
export const PartitionReadProjectsInstancesDatabasesSessionsResponse = PartitionResponse;

export type PartitionReadProjectsInstancesDatabasesSessionsError = CommonErrors;

export const partitionReadProjectsInstancesDatabasesSessions: API.OperationMethod<PartitionReadProjectsInstancesDatabasesSessionsRequest, PartitionReadProjectsInstancesDatabasesSessionsResponse, PartitionReadProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PartitionReadProjectsInstancesDatabasesSessionsRequest,
  output: PartitionReadProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Creates a new session to be used for requests made by the adapter. A session identifies a specific incarnation of a database resource and is meant to be reused across many `AdaptMessage` calls. */
export interface AdapterProjectsInstancesDatabasesSessionsRequest {
  /** Required. The database in which the new session is created. */
  parent: string;
  /** Request body */
  body?: AdapterSession;
}

export const AdapterProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AdapterSession).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions:adapter", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AdapterProjectsInstancesDatabasesSessionsRequest>;

export type AdapterProjectsInstancesDatabasesSessionsResponse = AdapterSession;
export const AdapterProjectsInstancesDatabasesSessionsResponse = AdapterSession;

export type AdapterProjectsInstancesDatabasesSessionsError = CommonErrors;

export const adapterProjectsInstancesDatabasesSessions: API.OperationMethod<AdapterProjectsInstancesDatabasesSessionsRequest, AdapterProjectsInstancesDatabasesSessionsResponse, AdapterProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AdapterProjectsInstancesDatabasesSessionsRequest,
  output: AdapterProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Executes a batch of SQL DML statements. This method allows many statements to be run with lower latency than submitting them sequentially with ExecuteSql. Statements are executed in sequential order. A request can succeed even if a statement fails. The ExecuteBatchDmlResponse.status field in the response provides information about the statement that failed. Clients must inspect this field to determine whether an error occurred. Execution stops after the first failed statement; the remaining statements are not executed. */
export interface ExecuteBatchDmlProjectsInstancesDatabasesSessionsRequest {
  /** Required. The session in which the DML statements should be performed. */
  session: string;
  /** Request body */
  body?: ExecuteBatchDmlRequest;
}

export const ExecuteBatchDmlProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(ExecuteBatchDmlRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions/{sessionsId}:executeBatchDml", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteBatchDmlProjectsInstancesDatabasesSessionsRequest>;

export type ExecuteBatchDmlProjectsInstancesDatabasesSessionsResponse = ExecuteBatchDmlResponse;
export const ExecuteBatchDmlProjectsInstancesDatabasesSessionsResponse = ExecuteBatchDmlResponse;

export type ExecuteBatchDmlProjectsInstancesDatabasesSessionsError = CommonErrors;

export const executeBatchDmlProjectsInstancesDatabasesSessions: API.OperationMethod<ExecuteBatchDmlProjectsInstancesDatabasesSessionsRequest, ExecuteBatchDmlProjectsInstancesDatabasesSessionsResponse, ExecuteBatchDmlProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteBatchDmlProjectsInstancesDatabasesSessionsRequest,
  output: ExecuteBatchDmlProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Begins a new transaction. This step can often be skipped: Read, ExecuteSql and Commit can begin a new transaction as a side-effect. */
export interface BeginTransactionProjectsInstancesDatabasesSessionsRequest {
  /** Required. The session in which the transaction runs. */
  session: string;
  /** Request body */
  body?: BeginTransactionRequest;
}

export const BeginTransactionProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(BeginTransactionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions/{sessionsId}:beginTransaction", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BeginTransactionProjectsInstancesDatabasesSessionsRequest>;

export type BeginTransactionProjectsInstancesDatabasesSessionsResponse = Transaction;
export const BeginTransactionProjectsInstancesDatabasesSessionsResponse = Transaction;

export type BeginTransactionProjectsInstancesDatabasesSessionsError = CommonErrors;

export const beginTransactionProjectsInstancesDatabasesSessions: API.OperationMethod<BeginTransactionProjectsInstancesDatabasesSessionsRequest, BeginTransactionProjectsInstancesDatabasesSessionsResponse, BeginTransactionProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BeginTransactionProjectsInstancesDatabasesSessionsRequest,
  output: BeginTransactionProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Reads rows from the database using key lookups and scans, as a simple key/value style alternative to ExecuteSql. This method can't be used to return a result set larger than 10 MiB; if the read matches more data than that, the read fails with a `FAILED_PRECONDITION` error. Reads inside read-write transactions might return `ABORTED`. If this occurs, the application should restart the transaction from the beginning. See Transaction for more details. Larger result sets can be yielded in streaming fashion by calling StreamingRead instead. */
export interface ReadProjectsInstancesDatabasesSessionsRequest {
  /** Required. The session in which the read should be performed. */
  session: string;
  /** Request body */
  body?: ReadRequest;
}

export const ReadProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(ReadRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions/{sessionsId}:read", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReadProjectsInstancesDatabasesSessionsRequest>;

export type ReadProjectsInstancesDatabasesSessionsResponse = ResultSet;
export const ReadProjectsInstancesDatabasesSessionsResponse = ResultSet;

export type ReadProjectsInstancesDatabasesSessionsError = CommonErrors;

export const readProjectsInstancesDatabasesSessions: API.OperationMethod<ReadProjectsInstancesDatabasesSessionsRequest, ReadProjectsInstancesDatabasesSessionsResponse, ReadProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReadProjectsInstancesDatabasesSessionsRequest,
  output: ReadProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Creates a new session. A session can be used to perform transactions that read and/or modify data in a Cloud Spanner database. Sessions are meant to be reused for many consecutive transactions. Sessions can only execute one transaction at a time. To execute multiple concurrent read-write/write-only transactions, create multiple sessions. Note that standalone reads and queries use a transaction internally, and count toward the one transaction limit. Active sessions use additional server resources, so it's a good idea to delete idle and unneeded sessions. Aside from explicit deletes, Cloud Spanner can delete sessions when no operations are sent for more than an hour. If a session is deleted, requests to it return `NOT_FOUND`. Idle sessions can be kept alive by sending a trivial SQL query periodically, for example, `"SELECT 1"`. */
export interface CreateProjectsInstancesDatabasesSessionsRequest {
  /** Required. The database in which the new session is created. */
  database: string;
  /** Request body */
  body?: CreateSessionRequest;
}

export const CreateProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(CreateSessionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInstancesDatabasesSessionsRequest>;

export type CreateProjectsInstancesDatabasesSessionsResponse = Session;
export const CreateProjectsInstancesDatabasesSessionsResponse = Session;

export type CreateProjectsInstancesDatabasesSessionsError = CommonErrors;

export const createProjectsInstancesDatabasesSessions: API.OperationMethod<CreateProjectsInstancesDatabasesSessionsRequest, CreateProjectsInstancesDatabasesSessionsResponse, CreateProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInstancesDatabasesSessionsRequest,
  output: CreateProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Rolls back a transaction, releasing any locks it holds. It's a good idea to call this for any transaction that includes one or more Read or ExecuteSql requests and ultimately decides not to commit. `Rollback` returns `OK` if it successfully aborts the transaction, the transaction was already aborted, or the transaction isn't found. `Rollback` never returns `ABORTED`. */
export interface RollbackProjectsInstancesDatabasesSessionsRequest {
  /** Required. The session in which the transaction to roll back is running. */
  session: string;
  /** Request body */
  body?: RollbackRequest;
}

export const RollbackProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(RollbackRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions/{sessionsId}:rollback", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RollbackProjectsInstancesDatabasesSessionsRequest>;

export type RollbackProjectsInstancesDatabasesSessionsResponse = Empty;
export const RollbackProjectsInstancesDatabasesSessionsResponse = Empty;

export type RollbackProjectsInstancesDatabasesSessionsError = CommonErrors;

export const rollbackProjectsInstancesDatabasesSessions: API.OperationMethod<RollbackProjectsInstancesDatabasesSessionsRequest, RollbackProjectsInstancesDatabasesSessionsResponse, RollbackProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RollbackProjectsInstancesDatabasesSessionsRequest,
  output: RollbackProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Lists all sessions in a given database. */
export interface ListProjectsInstancesDatabasesSessionsRequest {
  /** Number of sessions to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size. */
  pageSize?: number;
  /** Required. The database in which to list sessions. */
  database: string;
  /** An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: * `labels.key` where key is the name of a label Some examples of using filters are: * `labels.env:*` --> The session has the label "env". * `labels.env:dev` --> The session has the label "env" and the value of the label contains the string "dev". */
  filter?: string;
  /** If non-empty, `page_token` should contain a next_page_token from a previous ListSessionsResponse. */
  pageToken?: string;
}

export const ListProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  database: Schema.String.pipe(T.HttpPath("database")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesDatabasesSessionsRequest>;

export type ListProjectsInstancesDatabasesSessionsResponse = ListSessionsResponse;
export const ListProjectsInstancesDatabasesSessionsResponse = ListSessionsResponse;

export type ListProjectsInstancesDatabasesSessionsError = CommonErrors;

export const listProjectsInstancesDatabasesSessions = API.makePaginated(() => ({
  input: ListProjectsInstancesDatabasesSessionsRequest,
  output: ListProjectsInstancesDatabasesSessionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Handles a single message from the client and returns the result as a stream. The server will interpret the message frame and respond with message frames to the client. */
export interface AdaptMessageProjectsInstancesDatabasesSessionsRequest {
  /** Required. The database session in which the adapter request is processed. */
  name: string;
  /** Request body */
  body?: AdaptMessageRequest;
}

export const AdaptMessageProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AdaptMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions/{sessionsId}:adaptMessage", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AdaptMessageProjectsInstancesDatabasesSessionsRequest>;

export type AdaptMessageProjectsInstancesDatabasesSessionsResponse = AdaptMessageResponse;
export const AdaptMessageProjectsInstancesDatabasesSessionsResponse = AdaptMessageResponse;

export type AdaptMessageProjectsInstancesDatabasesSessionsError = CommonErrors;

export const adaptMessageProjectsInstancesDatabasesSessions: API.OperationMethod<AdaptMessageProjectsInstancesDatabasesSessionsRequest, AdaptMessageProjectsInstancesDatabasesSessionsResponse, AdaptMessageProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AdaptMessageProjectsInstancesDatabasesSessionsRequest,
  output: AdaptMessageProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Creates multiple new sessions. This API can be used to initialize a session cache on the clients. See https://goo.gl/TgSFN2 for best practices on session cache management. */
export interface BatchCreateProjectsInstancesDatabasesSessionsRequest {
  /** Required. The database in which the new sessions are created. */
  database: string;
  /** Request body */
  body?: BatchCreateSessionsRequest;
}

export const BatchCreateProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(BatchCreateSessionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions:batchCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreateProjectsInstancesDatabasesSessionsRequest>;

export type BatchCreateProjectsInstancesDatabasesSessionsResponse = BatchCreateSessionsResponse;
export const BatchCreateProjectsInstancesDatabasesSessionsResponse = BatchCreateSessionsResponse;

export type BatchCreateProjectsInstancesDatabasesSessionsError = CommonErrors;

export const batchCreateProjectsInstancesDatabasesSessions: API.OperationMethod<BatchCreateProjectsInstancesDatabasesSessionsRequest, BatchCreateProjectsInstancesDatabasesSessionsResponse, BatchCreateProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreateProjectsInstancesDatabasesSessionsRequest,
  output: BatchCreateProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Batches the supplied mutation groups in a collection of efficient transactions. All mutations in a group are committed atomically. However, mutations across groups can be committed non-atomically in an unspecified order and thus, they must be independent of each other. Partial failure is possible, that is, some groups might have been committed successfully, while some might have failed. The results of individual batches are streamed into the response as the batches are applied. `BatchWrite` requests are not replay protected, meaning that each mutation group can be applied more than once. Replays of non-idempotent mutations can have undesirable effects. For example, replays of an insert mutation can produce an already exists error or if you use generated or commit timestamp-based keys, it can result in additional rows being added to the mutation's table. We recommend structuring your mutation groups to be idempotent to avoid this issue. */
export interface BatchWriteProjectsInstancesDatabasesSessionsRequest {
  /** Required. The session in which the batch request is to be run. */
  session: string;
  /** Request body */
  body?: BatchWriteRequest;
}

export const BatchWriteProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(BatchWriteRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions/{sessionsId}:batchWrite", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchWriteProjectsInstancesDatabasesSessionsRequest>;

export type BatchWriteProjectsInstancesDatabasesSessionsResponse = BatchWriteResponse;
export const BatchWriteProjectsInstancesDatabasesSessionsResponse = BatchWriteResponse;

export type BatchWriteProjectsInstancesDatabasesSessionsError = CommonErrors;

export const batchWriteProjectsInstancesDatabasesSessions: API.OperationMethod<BatchWriteProjectsInstancesDatabasesSessionsRequest, BatchWriteProjectsInstancesDatabasesSessionsResponse, BatchWriteProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchWriteProjectsInstancesDatabasesSessionsRequest,
  output: BatchWriteProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Commits a transaction. The request includes the mutations to be applied to rows in the database. `Commit` might return an `ABORTED` error. This can occur at any time; commonly, the cause is conflicts with concurrent transactions. However, it can also happen for a variety of other reasons. If `Commit` returns `ABORTED`, the caller should retry the transaction from the beginning, reusing the same session. On very rare occasions, `Commit` might return `UNKNOWN`. This can happen, for example, if the client job experiences a 1+ hour networking failure. At that point, Cloud Spanner has lost track of the transaction outcome and we recommend that you perform another read from the database to see the state of things as they are now. */
export interface CommitProjectsInstancesDatabasesSessionsRequest {
  /** Required. The session in which the transaction to be committed is running. */
  session: string;
  /** Request body */
  body?: CommitRequest;
}

export const CommitProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(CommitRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions/{sessionsId}:commit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CommitProjectsInstancesDatabasesSessionsRequest>;

export type CommitProjectsInstancesDatabasesSessionsResponse = CommitResponse;
export const CommitProjectsInstancesDatabasesSessionsResponse = CommitResponse;

export type CommitProjectsInstancesDatabasesSessionsError = CommonErrors;

export const commitProjectsInstancesDatabasesSessions: API.OperationMethod<CommitProjectsInstancesDatabasesSessionsRequest, CommitProjectsInstancesDatabasesSessionsResponse, CommitProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CommitProjectsInstancesDatabasesSessionsRequest,
  output: CommitProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Creates a set of partition tokens that can be used to execute a query operation in parallel. Each of the returned partition tokens can be used by ExecuteStreamingSql to specify a subset of the query result to read. The same session and read-only transaction must be used by the `PartitionQueryRequest` used to create the partition tokens and the `ExecuteSqlRequests` that use the partition tokens. Partition tokens become invalid when the session used to create them is deleted, is idle for too long, begins a new transaction, or becomes too old. When any of these happen, it isn't possible to resume the query, and the whole operation must be restarted from the beginning. */
export interface PartitionQueryProjectsInstancesDatabasesSessionsRequest {
  /** Required. The session used to create the partitions. */
  session: string;
  /** Request body */
  body?: PartitionQueryRequest;
}

export const PartitionQueryProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(PartitionQueryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions/{sessionsId}:partitionQuery", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PartitionQueryProjectsInstancesDatabasesSessionsRequest>;

export type PartitionQueryProjectsInstancesDatabasesSessionsResponse = PartitionResponse;
export const PartitionQueryProjectsInstancesDatabasesSessionsResponse = PartitionResponse;

export type PartitionQueryProjectsInstancesDatabasesSessionsError = CommonErrors;

export const partitionQueryProjectsInstancesDatabasesSessions: API.OperationMethod<PartitionQueryProjectsInstancesDatabasesSessionsRequest, PartitionQueryProjectsInstancesDatabasesSessionsResponse, PartitionQueryProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PartitionQueryProjectsInstancesDatabasesSessionsRequest,
  output: PartitionQueryProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Like ExecuteSql, except returns the result set as a stream. Unlike ExecuteSql, there is no limit on the size of the returned result set. However, no individual row in the result set can exceed 100 MiB, and no column value can exceed 10 MiB. The query string can be SQL or [Graph Query Language (GQL)](https://cloud.google.com/spanner/docs/reference/standard-sql/graph-intro). */
export interface ExecuteStreamingSqlProjectsInstancesDatabasesSessionsRequest {
  /** Required. The session in which the SQL query should be performed. */
  session: string;
  /** Request body */
  body?: ExecuteSqlRequest;
}

export const ExecuteStreamingSqlProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(ExecuteSqlRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions/{sessionsId}:executeStreamingSql", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteStreamingSqlProjectsInstancesDatabasesSessionsRequest>;

export type ExecuteStreamingSqlProjectsInstancesDatabasesSessionsResponse = PartialResultSet;
export const ExecuteStreamingSqlProjectsInstancesDatabasesSessionsResponse = PartialResultSet;

export type ExecuteStreamingSqlProjectsInstancesDatabasesSessionsError = CommonErrors;

export const executeStreamingSqlProjectsInstancesDatabasesSessions: API.OperationMethod<ExecuteStreamingSqlProjectsInstancesDatabasesSessionsRequest, ExecuteStreamingSqlProjectsInstancesDatabasesSessionsResponse, ExecuteStreamingSqlProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteStreamingSqlProjectsInstancesDatabasesSessionsRequest,
  output: ExecuteStreamingSqlProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Ends a session, releasing server resources associated with it. This asynchronously triggers the cancellation of any operations that are running with this session. */
export interface DeleteProjectsInstancesDatabasesSessionsRequest {
  /** Required. The name of the session to delete. */
  name: string;
}

export const DeleteProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions/{sessionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesDatabasesSessionsRequest>;

export type DeleteProjectsInstancesDatabasesSessionsResponse = Empty;
export const DeleteProjectsInstancesDatabasesSessionsResponse = Empty;

export type DeleteProjectsInstancesDatabasesSessionsError = CommonErrors;

export const deleteProjectsInstancesDatabasesSessions: API.OperationMethod<DeleteProjectsInstancesDatabasesSessionsRequest, DeleteProjectsInstancesDatabasesSessionsResponse, DeleteProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesDatabasesSessionsRequest,
  output: DeleteProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Gets a session. Returns `NOT_FOUND` if the session doesn't exist. This is mainly useful for determining whether a session is still alive. */
export interface GetProjectsInstancesDatabasesSessionsRequest {
  /** Required. The name of the session to retrieve. */
  name: string;
}

export const GetProjectsInstancesDatabasesSessionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/sessions/{sessionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesDatabasesSessionsRequest>;

export type GetProjectsInstancesDatabasesSessionsResponse = Session;
export const GetProjectsInstancesDatabasesSessionsResponse = Session;

export type GetProjectsInstancesDatabasesSessionsError = CommonErrors;

export const getProjectsInstancesDatabasesSessions: API.OperationMethod<GetProjectsInstancesDatabasesSessionsRequest, GetProjectsInstancesDatabasesSessionsResponse, GetProjectsInstancesDatabasesSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesDatabasesSessionsRequest,
  output: GetProjectsInstancesDatabasesSessionsResponse,
  errors: [],
}));

/** Gets the access control policy for a database or backup resource. Returns an empty policy if a database or backup exists but does not have a policy set. Authorization requires `spanner.databases.getIamPolicy` permission on resource. For backups, authorization requires `spanner.backups.getIamPolicy` permission on resource. For backup schedules, authorization requires `spanner.backupSchedules.getIamPolicy` permission on resource. */
export interface GetIamPolicyProjectsInstancesDatabasesBackupSchedulesRequest {
  /** REQUIRED: The Cloud Spanner resource for which the policy is being retrieved. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for database resources. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsInstancesDatabasesBackupSchedulesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/backupSchedules/{backupSchedulesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsInstancesDatabasesBackupSchedulesRequest>;

export type GetIamPolicyProjectsInstancesDatabasesBackupSchedulesResponse = Policy;
export const GetIamPolicyProjectsInstancesDatabasesBackupSchedulesResponse = Policy;

export type GetIamPolicyProjectsInstancesDatabasesBackupSchedulesError = CommonErrors;

export const getIamPolicyProjectsInstancesDatabasesBackupSchedules: API.OperationMethod<GetIamPolicyProjectsInstancesDatabasesBackupSchedulesRequest, GetIamPolicyProjectsInstancesDatabasesBackupSchedulesResponse, GetIamPolicyProjectsInstancesDatabasesBackupSchedulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsInstancesDatabasesBackupSchedulesRequest,
  output: GetIamPolicyProjectsInstancesDatabasesBackupSchedulesResponse,
  errors: [],
}));

/** Deletes a backup schedule. */
export interface DeleteProjectsInstancesDatabasesBackupSchedulesRequest {
  /** Required. The name of the schedule to delete. Values are of the form `projects//instances//databases//backupSchedules/`. */
  name: string;
}

export const DeleteProjectsInstancesDatabasesBackupSchedulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/backupSchedules/{backupSchedulesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesDatabasesBackupSchedulesRequest>;

export type DeleteProjectsInstancesDatabasesBackupSchedulesResponse = Empty;
export const DeleteProjectsInstancesDatabasesBackupSchedulesResponse = Empty;

export type DeleteProjectsInstancesDatabasesBackupSchedulesError = CommonErrors;

export const deleteProjectsInstancesDatabasesBackupSchedules: API.OperationMethod<DeleteProjectsInstancesDatabasesBackupSchedulesRequest, DeleteProjectsInstancesDatabasesBackupSchedulesResponse, DeleteProjectsInstancesDatabasesBackupSchedulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesDatabasesBackupSchedulesRequest,
  output: DeleteProjectsInstancesDatabasesBackupSchedulesResponse,
  errors: [],
}));

/** Gets backup schedule for the input schedule name. */
export interface GetProjectsInstancesDatabasesBackupSchedulesRequest {
  /** Required. The name of the schedule to retrieve. Values are of the form `projects//instances//databases//backupSchedules/`. */
  name: string;
}

export const GetProjectsInstancesDatabasesBackupSchedulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/backupSchedules/{backupSchedulesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesDatabasesBackupSchedulesRequest>;

export type GetProjectsInstancesDatabasesBackupSchedulesResponse = BackupSchedule;
export const GetProjectsInstancesDatabasesBackupSchedulesResponse = BackupSchedule;

export type GetProjectsInstancesDatabasesBackupSchedulesError = CommonErrors;

export const getProjectsInstancesDatabasesBackupSchedules: API.OperationMethod<GetProjectsInstancesDatabasesBackupSchedulesRequest, GetProjectsInstancesDatabasesBackupSchedulesResponse, GetProjectsInstancesDatabasesBackupSchedulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesDatabasesBackupSchedulesRequest,
  output: GetProjectsInstancesDatabasesBackupSchedulesResponse,
  errors: [],
}));

/** Lists all the backup schedules for the database. */
export interface ListProjectsInstancesDatabasesBackupSchedulesRequest {
  /** Optional. If non-empty, `page_token` should contain a next_page_token from a previous ListBackupSchedulesResponse to the same `parent`. */
  pageToken?: string;
  /** Required. Database is the parent resource whose backup schedules should be listed. Values are of the form projects//instances//databases/ */
  parent: string;
  /** Optional. Number of backup schedules to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size. */
  pageSize?: number;
}

export const ListProjectsInstancesDatabasesBackupSchedulesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/backupSchedules" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesDatabasesBackupSchedulesRequest>;

export type ListProjectsInstancesDatabasesBackupSchedulesResponse = ListBackupSchedulesResponse;
export const ListProjectsInstancesDatabasesBackupSchedulesResponse = ListBackupSchedulesResponse;

export type ListProjectsInstancesDatabasesBackupSchedulesError = CommonErrors;

export const listProjectsInstancesDatabasesBackupSchedules = API.makePaginated(() => ({
  input: ListProjectsInstancesDatabasesBackupSchedulesRequest,
  output: ListProjectsInstancesDatabasesBackupSchedulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a backup schedule. */
export interface PatchProjectsInstancesDatabasesBackupSchedulesRequest {
  /** Identifier. Output only for the CreateBackupSchedule operation. Required for the UpdateBackupSchedule operation. A globally unique identifier for the backup schedule which cannot be changed. Values are of the form `projects//instances//databases//backupSchedules/a-z*[a-z0-9]` The final segment of the name must be between 2 and 60 characters in length. */
  name: string;
  /** Required. A mask specifying which fields in the BackupSchedule resource should be updated. This mask is relative to the BackupSchedule resource, not to the request message. The field mask must always be specified; this prevents any future fields from being erased accidentally. */
  updateMask?: string;
  /** Request body */
  body?: BackupSchedule;
}

export const PatchProjectsInstancesDatabasesBackupSchedulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(BackupSchedule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/backupSchedules/{backupSchedulesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsInstancesDatabasesBackupSchedulesRequest>;

export type PatchProjectsInstancesDatabasesBackupSchedulesResponse = BackupSchedule;
export const PatchProjectsInstancesDatabasesBackupSchedulesResponse = BackupSchedule;

export type PatchProjectsInstancesDatabasesBackupSchedulesError = CommonErrors;

export const patchProjectsInstancesDatabasesBackupSchedules: API.OperationMethod<PatchProjectsInstancesDatabasesBackupSchedulesRequest, PatchProjectsInstancesDatabasesBackupSchedulesResponse, PatchProjectsInstancesDatabasesBackupSchedulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsInstancesDatabasesBackupSchedulesRequest,
  output: PatchProjectsInstancesDatabasesBackupSchedulesResponse,
  errors: [],
}));

/** Returns permissions that the caller has on the specified database or backup resource. Attempting this RPC on a non-existent Cloud Spanner database will result in a NOT_FOUND error if the user has `spanner.databases.list` permission on the containing Cloud Spanner instance. Otherwise returns an empty set of permissions. Calling this method on a backup that does not exist will result in a NOT_FOUND error if the user has `spanner.backups.list` permission on the containing instance. Calling this method on a backup schedule that does not exist will result in a NOT_FOUND error if the user has `spanner.backupSchedules.list` permission on the containing database. */
export interface TestIamPermissionsProjectsInstancesDatabasesBackupSchedulesRequest {
  /** REQUIRED: The Cloud Spanner resource for which permissions are being tested. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for database resources. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsInstancesDatabasesBackupSchedulesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/backupSchedules/{backupSchedulesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsInstancesDatabasesBackupSchedulesRequest>;

export type TestIamPermissionsProjectsInstancesDatabasesBackupSchedulesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsInstancesDatabasesBackupSchedulesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsInstancesDatabasesBackupSchedulesError = CommonErrors;

export const testIamPermissionsProjectsInstancesDatabasesBackupSchedules: API.OperationMethod<TestIamPermissionsProjectsInstancesDatabasesBackupSchedulesRequest, TestIamPermissionsProjectsInstancesDatabasesBackupSchedulesResponse, TestIamPermissionsProjectsInstancesDatabasesBackupSchedulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsInstancesDatabasesBackupSchedulesRequest,
  output: TestIamPermissionsProjectsInstancesDatabasesBackupSchedulesResponse,
  errors: [],
}));

/** Creates a new backup schedule. */
export interface CreateProjectsInstancesDatabasesBackupSchedulesRequest {
  /** Required. The name of the database that this backup schedule applies to. */
  parent: string;
  /** Required. The Id to use for the backup schedule. The `backup_schedule_id` appended to `parent` forms the full backup schedule name of the form `projects//instances//databases//backupSchedules/`. */
  backupScheduleId?: string;
  /** Request body */
  body?: BackupSchedule;
}

export const CreateProjectsInstancesDatabasesBackupSchedulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  backupScheduleId: Schema.optional(Schema.String).pipe(T.HttpQuery("backupScheduleId")),
  body: Schema.optional(BackupSchedule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/backupSchedules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInstancesDatabasesBackupSchedulesRequest>;

export type CreateProjectsInstancesDatabasesBackupSchedulesResponse = BackupSchedule;
export const CreateProjectsInstancesDatabasesBackupSchedulesResponse = BackupSchedule;

export type CreateProjectsInstancesDatabasesBackupSchedulesError = CommonErrors;

export const createProjectsInstancesDatabasesBackupSchedules: API.OperationMethod<CreateProjectsInstancesDatabasesBackupSchedulesRequest, CreateProjectsInstancesDatabasesBackupSchedulesResponse, CreateProjectsInstancesDatabasesBackupSchedulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInstancesDatabasesBackupSchedulesRequest,
  output: CreateProjectsInstancesDatabasesBackupSchedulesResponse,
  errors: [],
}));

/** Sets the access control policy on a database or backup resource. Replaces any existing policy. Authorization requires `spanner.databases.setIamPolicy` permission on resource. For backups, authorization requires `spanner.backups.setIamPolicy` permission on resource. For backup schedules, authorization requires `spanner.backupSchedules.setIamPolicy` permission on resource. */
export interface SetIamPolicyProjectsInstancesDatabasesBackupSchedulesRequest {
  /** REQUIRED: The Cloud Spanner resource for which the policy is being set. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for databases resources. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsInstancesDatabasesBackupSchedulesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/backupSchedules/{backupSchedulesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsInstancesDatabasesBackupSchedulesRequest>;

export type SetIamPolicyProjectsInstancesDatabasesBackupSchedulesResponse = Policy;
export const SetIamPolicyProjectsInstancesDatabasesBackupSchedulesResponse = Policy;

export type SetIamPolicyProjectsInstancesDatabasesBackupSchedulesError = CommonErrors;

export const setIamPolicyProjectsInstancesDatabasesBackupSchedules: API.OperationMethod<SetIamPolicyProjectsInstancesDatabasesBackupSchedulesRequest, SetIamPolicyProjectsInstancesDatabasesBackupSchedulesResponse, SetIamPolicyProjectsInstancesDatabasesBackupSchedulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsInstancesDatabasesBackupSchedulesRequest,
  output: SetIamPolicyProjectsInstancesDatabasesBackupSchedulesResponse,
  errors: [],
}));

/** Lists Cloud Spanner database roles. */
export interface ListProjectsInstancesDatabasesDatabaseRolesRequest {
  /** Number of database roles to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size. */
  pageSize?: number;
  /** If non-empty, `page_token` should contain a next_page_token from a previous ListDatabaseRolesResponse. */
  pageToken?: string;
  /** Required. The database whose roles should be listed. Values are of the form `projects//instances//databases/`. */
  parent: string;
}

export const ListProjectsInstancesDatabasesDatabaseRolesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/databaseRoles" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesDatabasesDatabaseRolesRequest>;

export type ListProjectsInstancesDatabasesDatabaseRolesResponse = ListDatabaseRolesResponse;
export const ListProjectsInstancesDatabasesDatabaseRolesResponse = ListDatabaseRolesResponse;

export type ListProjectsInstancesDatabasesDatabaseRolesError = CommonErrors;

export const listProjectsInstancesDatabasesDatabaseRoles = API.makePaginated(() => ({
  input: ListProjectsInstancesDatabasesDatabaseRolesRequest,
  output: ListProjectsInstancesDatabasesDatabaseRolesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns permissions that the caller has on the specified database or backup resource. Attempting this RPC on a non-existent Cloud Spanner database will result in a NOT_FOUND error if the user has `spanner.databases.list` permission on the containing Cloud Spanner instance. Otherwise returns an empty set of permissions. Calling this method on a backup that does not exist will result in a NOT_FOUND error if the user has `spanner.backups.list` permission on the containing instance. Calling this method on a backup schedule that does not exist will result in a NOT_FOUND error if the user has `spanner.backupSchedules.list` permission on the containing database. */
export interface TestIamPermissionsProjectsInstancesDatabasesDatabaseRolesRequest {
  /** REQUIRED: The Cloud Spanner resource for which permissions are being tested. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for database resources. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsInstancesDatabasesDatabaseRolesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/databases/{databasesId}/databaseRoles/{databaseRolesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsInstancesDatabasesDatabaseRolesRequest>;

export type TestIamPermissionsProjectsInstancesDatabasesDatabaseRolesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsInstancesDatabasesDatabaseRolesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsInstancesDatabasesDatabaseRolesError = CommonErrors;

export const testIamPermissionsProjectsInstancesDatabasesDatabaseRoles: API.OperationMethod<TestIamPermissionsProjectsInstancesDatabasesDatabaseRolesRequest, TestIamPermissionsProjectsInstancesDatabasesDatabaseRolesResponse, TestIamPermissionsProjectsInstancesDatabasesDatabaseRolesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsInstancesDatabasesDatabaseRolesRequest,
  output: TestIamPermissionsProjectsInstancesDatabasesDatabaseRolesResponse,
  errors: [],
}));

/** Lists the backup long-running operations in the given instance. A backup operation has a name of the form `projects//instances//backups//operations/`. The long-running operation metadata field type `metadata.type_url` describes the type of the metadata. Operations returned include those that have completed/failed/canceled within the last 7 days, and pending operations. Operations returned are ordered by `operation.metadata.value.progress.start_time` in descending order starting from the most recently started operation. */
export interface ListProjectsInstancesBackupOperationsRequest {
  /** Required. The instance of the backup operations. Values are of the form `projects//instances/`. */
  parent: string;
  /** An expression that filters the list of returned backup operations. A filter expression consists of a field name, a comparison operator, and a value for filtering. The value must be a string, a number, or a boolean. The comparison operator must be one of: `<`, `>`, `<=`, `>=`, `!=`, `=`, or `:`. Colon `:` is the contains operator. Filter rules are not case sensitive. The following fields in the operation are eligible for filtering: * `name` - The name of the long-running operation * `done` - False if the operation is in progress, else true. * `metadata.@type` - the type of metadata. For example, the type string for CreateBackupMetadata is `type.googleapis.com/google.spanner.admin.database.v1.CreateBackupMetadata`. * `metadata.` - any field in metadata.value. `metadata.@type` must be specified first if filtering on metadata fields. * `error` - Error associated with the long-running operation. * `response.@type` - the type of response. * `response.` - any field in response.value. You can combine multiple expressions by enclosing each expression in parentheses. By default, expressions are combined with AND logic, but you can specify AND, OR, and NOT logic explicitly. Here are a few examples: * `done:true` - The operation is complete. * `(metadata.@type=type.googleapis.com/google.spanner.admin.database.v1.CreateBackupMetadata) AND` \ `metadata.database:prod` - Returns operations where: * The operation's metadata type is CreateBackupMetadata. * The source database name of backup contains the string "prod". * `(metadata.@type=type.googleapis.com/google.spanner.admin.database.v1.CreateBackupMetadata) AND` \ `(metadata.name:howl) AND` \ `(metadata.progress.start_time < \"2018-03-28T14:50:00Z\") AND` \ `(error:*)` - Returns operations where: * The operation's metadata type is CreateBackupMetadata. * The backup name contains the string "howl". * The operation started before 2018-03-28T14:50:00Z. * The operation resulted in an error. * `(metadata.@type=type.googleapis.com/google.spanner.admin.database.v1.CopyBackupMetadata) AND` \ `(metadata.source_backup:test) AND` \ `(metadata.progress.start_time < \"2022-01-18T14:50:00Z\") AND` \ `(error:*)` - Returns operations where: * The operation's metadata type is CopyBackupMetadata. * The source backup name contains the string "test". * The operation started before 2022-01-18T14:50:00Z. * The operation resulted in an error. * `((metadata.@type=type.googleapis.com/google.spanner.admin.database.v1.CreateBackupMetadata) AND` \ `(metadata.database:test_db)) OR` \ `((metadata.@type=type.googleapis.com/google.spanner.admin.database.v1.CopyBackupMetadata) AND` \ `(metadata.source_backup:test_bkp)) AND` \ `(error:*)` - Returns operations where: * The operation's metadata matches either of criteria: * The operation's metadata type is CreateBackupMetadata AND the source database name of the backup contains the string "test_db" * The operation's metadata type is CopyBackupMetadata AND the source backup name contains the string "test_bkp" * The operation resulted in an error. */
  filter?: string;
  /** If non-empty, `page_token` should contain a next_page_token from a previous ListBackupOperationsResponse to the same `parent` and with the same `filter`. */
  pageToken?: string;
  /** Number of operations to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size. */
  pageSize?: number;
}

export const ListProjectsInstancesBackupOperationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/backupOperations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesBackupOperationsRequest>;

export type ListProjectsInstancesBackupOperationsResponse = ListBackupOperationsResponse;
export const ListProjectsInstancesBackupOperationsResponse = ListBackupOperationsResponse;

export type ListProjectsInstancesBackupOperationsError = CommonErrors;

export const listProjectsInstancesBackupOperations = API.makePaginated(() => ({
  input: ListProjectsInstancesBackupOperationsRequest,
  output: ListProjectsInstancesBackupOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes an existing instance partition. Requires that the instance partition is not used by any database or backup and is not the default instance partition of an instance. Authorization requires `spanner.instancePartitions.delete` permission on the resource name. */
export interface DeleteProjectsInstancesInstancePartitionsRequest {
  /** Optional. If not empty, the API only deletes the instance partition when the etag provided matches the current status of the requested instance partition. Otherwise, deletes the instance partition without checking the current status of the requested instance partition. */
  etag?: string;
  /** Required. The name of the instance partition to be deleted. Values are of the form `projects/{project}/instances/{instance}/instancePartitions/{instance_partition}` */
  name: string;
}

export const DeleteProjectsInstancesInstancePartitionsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/instances/{instancesId}/instancePartitions/{instancePartitionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesInstancePartitionsRequest>;

export type DeleteProjectsInstancesInstancePartitionsResponse = Empty;
export const DeleteProjectsInstancesInstancePartitionsResponse = Empty;

export type DeleteProjectsInstancesInstancePartitionsError = CommonErrors;

export const deleteProjectsInstancesInstancePartitions: API.OperationMethod<DeleteProjectsInstancesInstancePartitionsRequest, DeleteProjectsInstancesInstancePartitionsResponse, DeleteProjectsInstancesInstancePartitionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesInstancePartitionsRequest,
  output: DeleteProjectsInstancesInstancePartitionsResponse,
  errors: [],
}));

/** Updates an instance partition, and begins allocating or releasing resources as requested. The returned long-running operation can be used to track the progress of updating the instance partition. If the named instance partition does not exist, returns `NOT_FOUND`. Immediately upon completion of this request: * For resource types for which a decrease in the instance partition's allocation has been requested, billing is based on the newly-requested level. Until completion of the returned operation: * Cancelling the operation sets its metadata's cancel_time, and begins restoring resources to their pre-request values. The operation is guaranteed to succeed at undoing all resource changes, after which point it terminates with a `CANCELLED` status. * All other attempts to modify the instance partition are rejected. * Reading the instance partition via the API continues to give the pre-request resource levels. Upon completion of the returned operation: * Billing begins for all successfully-allocated resources (some types may have lower than the requested levels). * All newly-reserved resources are available for serving the instance partition's tables. * The instance partition's new resource levels are readable via the API. The returned long-running operation will have a name of the format `/operations/` and can be used to track the instance partition modification. The metadata field type is UpdateInstancePartitionMetadata. The response field type is InstancePartition, if successful. Authorization requires `spanner.instancePartitions.update` permission on the resource name. */
export interface PatchProjectsInstancesInstancePartitionsRequest {
  /** Required. A unique identifier for the instance partition. Values are of the form `projects//instances//instancePartitions/a-z*[a-z0-9]`. The final segment of the name must be between 2 and 64 characters in length. An instance partition's name cannot be changed after the instance partition is created. */
  name: string;
  /** Request body */
  body?: UpdateInstancePartitionRequest;
}

export const PatchProjectsInstancesInstancePartitionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateInstancePartitionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/instances/{instancesId}/instancePartitions/{instancePartitionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsInstancesInstancePartitionsRequest>;

export type PatchProjectsInstancesInstancePartitionsResponse = Operation;
export const PatchProjectsInstancesInstancePartitionsResponse = Operation;

export type PatchProjectsInstancesInstancePartitionsError = CommonErrors;

export const patchProjectsInstancesInstancePartitions: API.OperationMethod<PatchProjectsInstancesInstancePartitionsRequest, PatchProjectsInstancesInstancePartitionsResponse, PatchProjectsInstancesInstancePartitionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsInstancesInstancePartitionsRequest,
  output: PatchProjectsInstancesInstancePartitionsResponse,
  errors: [],
}));

/** Lists all instance partitions for the given instance. */
export interface ListProjectsInstancesInstancePartitionsRequest {
  /** Required. The instance whose instance partitions should be listed. Values are of the form `projects//instances/`. Use `{instance} = '-'` to list instance partitions for all Instances in a project, e.g., `projects/myproject/instances/-`. */
  parent: string;
  /** Number of instance partitions to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size. */
  pageSize?: number;
  /** If non-empty, `page_token` should contain a next_page_token from a previous ListInstancePartitionsResponse. */
  pageToken?: string;
  /** Optional. Deadline used while retrieving metadata for instance partitions. Instance partitions whose metadata cannot be retrieved within this deadline will be added to unreachable in ListInstancePartitionsResponse. */
  instancePartitionDeadline?: string;
}

export const ListProjectsInstancesInstancePartitionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  instancePartitionDeadline: Schema.optional(Schema.String).pipe(T.HttpQuery("instancePartitionDeadline")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/instancePartitions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesInstancePartitionsRequest>;

export type ListProjectsInstancesInstancePartitionsResponse = ListInstancePartitionsResponse;
export const ListProjectsInstancesInstancePartitionsResponse = ListInstancePartitionsResponse;

export type ListProjectsInstancesInstancePartitionsError = CommonErrors;

export const listProjectsInstancesInstancePartitions = API.makePaginated(() => ({
  input: ListProjectsInstancesInstancePartitionsRequest,
  output: ListProjectsInstancesInstancePartitionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates an instance partition and begins preparing it to be used. The returned long-running operation can be used to track the progress of preparing the new instance partition. The instance partition name is assigned by the caller. If the named instance partition already exists, `CreateInstancePartition` returns `ALREADY_EXISTS`. Immediately upon completion of this request: * The instance partition is readable via the API, with all requested attributes but no allocated resources. Its state is `CREATING`. Until completion of the returned operation: * Cancelling the operation renders the instance partition immediately unreadable via the API. * The instance partition can be deleted. * All other attempts to modify the instance partition are rejected. Upon completion of the returned operation: * Billing for all successfully-allocated resources begins (some types may have lower than the requested levels). * Databases can start using this instance partition. * The instance partition's allocated resource levels are readable via the API. * The instance partition's state becomes `READY`. The returned long-running operation will have a name of the format `/operations/` and can be used to track creation of the instance partition. The metadata field type is CreateInstancePartitionMetadata. The response field type is InstancePartition, if successful. */
export interface CreateProjectsInstancesInstancePartitionsRequest {
  /** Required. The name of the instance in which to create the instance partition. Values are of the form `projects//instances/`. */
  parent: string;
  /** Request body */
  body?: CreateInstancePartitionRequest;
}

export const CreateProjectsInstancesInstancePartitionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateInstancePartitionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/instancePartitions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInstancesInstancePartitionsRequest>;

export type CreateProjectsInstancesInstancePartitionsResponse = Operation;
export const CreateProjectsInstancesInstancePartitionsResponse = Operation;

export type CreateProjectsInstancesInstancePartitionsError = CommonErrors;

export const createProjectsInstancesInstancePartitions: API.OperationMethod<CreateProjectsInstancesInstancePartitionsRequest, CreateProjectsInstancesInstancePartitionsResponse, CreateProjectsInstancesInstancePartitionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInstancesInstancePartitionsRequest,
  output: CreateProjectsInstancesInstancePartitionsResponse,
  errors: [],
}));

/** Gets information about a particular instance partition. */
export interface GetProjectsInstancesInstancePartitionsRequest {
  /** Required. The name of the requested instance partition. Values are of the form `projects/{project}/instances/{instance}/instancePartitions/{instance_partition}`. */
  name: string;
}

export const GetProjectsInstancesInstancePartitionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/instancePartitions/{instancePartitionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesInstancePartitionsRequest>;

export type GetProjectsInstancesInstancePartitionsResponse = InstancePartition;
export const GetProjectsInstancesInstancePartitionsResponse = InstancePartition;

export type GetProjectsInstancesInstancePartitionsError = CommonErrors;

export const getProjectsInstancesInstancePartitions: API.OperationMethod<GetProjectsInstancesInstancePartitionsRequest, GetProjectsInstancesInstancePartitionsResponse, GetProjectsInstancesInstancePartitionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesInstancePartitionsRequest,
  output: GetProjectsInstancesInstancePartitionsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsInstancesInstancePartitionsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsInstancesInstancePartitionsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/instances/{instancesId}/instancePartitions/{instancePartitionsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesInstancePartitionsOperationsRequest>;

export type DeleteProjectsInstancesInstancePartitionsOperationsResponse = Empty;
export const DeleteProjectsInstancesInstancePartitionsOperationsResponse = Empty;

export type DeleteProjectsInstancesInstancePartitionsOperationsError = CommonErrors;

export const deleteProjectsInstancesInstancePartitionsOperations: API.OperationMethod<DeleteProjectsInstancesInstancePartitionsOperationsRequest, DeleteProjectsInstancesInstancePartitionsOperationsResponse, DeleteProjectsInstancesInstancePartitionsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesInstancePartitionsOperationsRequest,
  output: DeleteProjectsInstancesInstancePartitionsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsInstancesInstancePartitionsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
}

export const CancelProjectsInstancesInstancePartitionsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/instancePartitions/{instancePartitionsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsInstancesInstancePartitionsOperationsRequest>;

export type CancelProjectsInstancesInstancePartitionsOperationsResponse = Empty;
export const CancelProjectsInstancesInstancePartitionsOperationsResponse = Empty;

export type CancelProjectsInstancesInstancePartitionsOperationsError = CommonErrors;

export const cancelProjectsInstancesInstancePartitionsOperations: API.OperationMethod<CancelProjectsInstancesInstancePartitionsOperationsRequest, CancelProjectsInstancesInstancePartitionsOperationsResponse, CancelProjectsInstancesInstancePartitionsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsInstancesInstancePartitionsOperationsRequest,
  output: CancelProjectsInstancesInstancePartitionsOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsInstancesInstancePartitionsOperationsRequest {
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsInstancesInstancePartitionsOperationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/instancePartitions/{instancePartitionsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesInstancePartitionsOperationsRequest>;

export type ListProjectsInstancesInstancePartitionsOperationsResponse = ListOperationsResponse;
export const ListProjectsInstancesInstancePartitionsOperationsResponse = ListOperationsResponse;

export type ListProjectsInstancesInstancePartitionsOperationsError = CommonErrors;

export const listProjectsInstancesInstancePartitionsOperations = API.makePaginated(() => ({
  input: ListProjectsInstancesInstancePartitionsOperationsRequest,
  output: ListProjectsInstancesInstancePartitionsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsInstancesInstancePartitionsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsInstancesInstancePartitionsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/instancePartitions/{instancePartitionsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesInstancePartitionsOperationsRequest>;

export type GetProjectsInstancesInstancePartitionsOperationsResponse = Operation;
export const GetProjectsInstancesInstancePartitionsOperationsResponse = Operation;

export type GetProjectsInstancesInstancePartitionsOperationsError = CommonErrors;

export const getProjectsInstancesInstancePartitionsOperations: API.OperationMethod<GetProjectsInstancesInstancePartitionsOperationsRequest, GetProjectsInstancesInstancePartitionsOperationsResponse, GetProjectsInstancesInstancePartitionsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesInstancePartitionsOperationsRequest,
  output: GetProjectsInstancesInstancePartitionsOperationsResponse,
  errors: [],
}));

/** Lists completed and pending backups. Backups returned are ordered by `create_time` in descending order, starting from the most recent `create_time`. */
export interface ListProjectsInstancesBackupsRequest {
  /** An expression that filters the list of returned backups. A filter expression consists of a field name, a comparison operator, and a value for filtering. The value must be a string, a number, or a boolean. The comparison operator must be one of: `<`, `>`, `<=`, `>=`, `!=`, `=`, or `:`. Colon `:` is the contains operator. Filter rules are not case sensitive. The following fields in the Backup are eligible for filtering: * `name` * `database` * `state` * `create_time` (and values are of the format YYYY-MM-DDTHH:MM:SSZ) * `expire_time` (and values are of the format YYYY-MM-DDTHH:MM:SSZ) * `version_time` (and values are of the format YYYY-MM-DDTHH:MM:SSZ) * `size_bytes` * `backup_schedules` You can combine multiple expressions by enclosing each expression in parentheses. By default, expressions are combined with AND logic, but you can specify AND, OR, and NOT logic explicitly. Here are a few examples: * `name:Howl` - The backup's name contains the string "howl". * `database:prod` - The database's name contains the string "prod". * `state:CREATING` - The backup is pending creation. * `state:READY` - The backup is fully created and ready for use. * `(name:howl) AND (create_time < \"2018-03-28T14:50:00Z\")` - The backup name contains the string "howl" and `create_time` of the backup is before 2018-03-28T14:50:00Z. * `expire_time < \"2018-03-28T14:50:00Z\"` - The backup `expire_time` is before 2018-03-28T14:50:00Z. * `size_bytes > 10000000000` - The backup's size is greater than 10GB * `backup_schedules:daily` - The backup is created from a schedule with "daily" in its name. */
  filter?: string;
  /** If non-empty, `page_token` should contain a next_page_token from a previous ListBackupsResponse to the same `parent` and with the same `filter`. */
  pageToken?: string;
  /** Required. The instance to list backups from. Values are of the form `projects//instances/`. */
  parent: string;
  /** Number of backups to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size. */
  pageSize?: number;
}

export const ListProjectsInstancesBackupsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/backups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesBackupsRequest>;

export type ListProjectsInstancesBackupsResponse = ListBackupsResponse;
export const ListProjectsInstancesBackupsResponse = ListBackupsResponse;

export type ListProjectsInstancesBackupsError = CommonErrors;

export const listProjectsInstancesBackups = API.makePaginated(() => ({
  input: ListProjectsInstancesBackupsRequest,
  output: ListProjectsInstancesBackupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets metadata on a pending or completed Backup. */
export interface GetProjectsInstancesBackupsRequest {
  /** Required. Name of the backup. Values are of the form `projects//instances//backups/`. */
  name: string;
}

export const GetProjectsInstancesBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesBackupsRequest>;

export type GetProjectsInstancesBackupsResponse = Backup;
export const GetProjectsInstancesBackupsResponse = Backup;

export type GetProjectsInstancesBackupsError = CommonErrors;

export const getProjectsInstancesBackups: API.OperationMethod<GetProjectsInstancesBackupsRequest, GetProjectsInstancesBackupsResponse, GetProjectsInstancesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesBackupsRequest,
  output: GetProjectsInstancesBackupsResponse,
  errors: [],
}));

/** Starts creating a new Cloud Spanner Backup. The returned backup long-running operation will have a name of the format `projects//instances//backups//operations/` and can be used to track creation of the backup. The metadata field type is CreateBackupMetadata. The response field type is Backup, if successful. Cancelling the returned operation will stop the creation and delete the backup. There can be only one pending backup creation per database. Backup creation of different databases can run concurrently. */
export interface CreateProjectsInstancesBackupsRequest {
  /** Required. The id of the backup to be created. The `backup_id` appended to `parent` forms the full backup name of the form `projects//instances//backups/`. */
  backupId?: string;
  /** Required. The name of the instance in which the backup is created. This must be the same instance that contains the database the backup is created from. The backup will be stored in the locations specified in the instance configuration of this instance. Values are of the form `projects//instances/`. */
  parent: string;
  /** Required. The encryption type of the backup. */
  "encryptionConfig.encryptionType"?: "ENCRYPTION_TYPE_UNSPECIFIED" | "USE_DATABASE_ENCRYPTION" | "GOOGLE_DEFAULT_ENCRYPTION" | "CUSTOMER_MANAGED_ENCRYPTION" | (string & {});
  /** Optional. Specifies the KMS configuration for the one or more keys used to protect the backup. Values are of the form `projects//locations//keyRings//cryptoKeys/`. The keys referenced by `kms_key_names` must fully cover all regions of the backup's instance configuration. Some examples: * For regional (single-region) instance configurations, specify a regional location KMS key. * For multi-region instance configurations of type `GOOGLE_MANAGED`, either specify a multi-region location KMS key or multiple regional location KMS keys that cover all regions in the instance configuration. * For an instance configuration of type `USER_MANAGED`, specify only regional location KMS keys to cover each region in the instance configuration. Multi-region location KMS keys aren't supported for `USER_MANAGED` type instance configurations. */
  "encryptionConfig.kmsKeyNames"?: string[];
  /** Optional. This field is maintained for backwards compatibility. For new callers, we recommend using `kms_key_names` to specify the KMS key. Only use `kms_key_name` if the location of the KMS key matches the database instance's configuration (location) exactly. For example, if the KMS location is in `us-central1` or `nam3`, then the database instance must also be in `us-central1` or `nam3`. The Cloud KMS key that is used to encrypt and decrypt the restored database. Set this field only when encryption_type is `CUSTOMER_MANAGED_ENCRYPTION`. Values are of the form `projects//locations//keyRings//cryptoKeys/`. */
  "encryptionConfig.kmsKeyName"?: string;
  /** Request body */
  body?: Backup;
}

export const CreateProjectsInstancesBackupsRequest = Schema.Struct({
  backupId: Schema.optional(Schema.String).pipe(T.HttpQuery("backupId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  "encryptionConfig.encryptionType": Schema.optional(Schema.String).pipe(T.HttpQuery("encryptionConfig.encryptionType")),
  "encryptionConfig.kmsKeyNames": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("encryptionConfig.kmsKeyNames")),
  "encryptionConfig.kmsKeyName": Schema.optional(Schema.String).pipe(T.HttpQuery("encryptionConfig.kmsKeyName")),
  body: Schema.optional(Backup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/backups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInstancesBackupsRequest>;

export type CreateProjectsInstancesBackupsResponse = Operation;
export const CreateProjectsInstancesBackupsResponse = Operation;

export type CreateProjectsInstancesBackupsError = CommonErrors;

export const createProjectsInstancesBackups: API.OperationMethod<CreateProjectsInstancesBackupsRequest, CreateProjectsInstancesBackupsResponse, CreateProjectsInstancesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInstancesBackupsRequest,
  output: CreateProjectsInstancesBackupsResponse,
  errors: [],
}));

/** Starts copying a Cloud Spanner Backup. The returned backup long-running operation will have a name of the format `projects//instances//backups//operations/` and can be used to track copying of the backup. The operation is associated with the destination backup. The metadata field type is CopyBackupMetadata. The response field type is Backup, if successful. Cancelling the returned operation will stop the copying and delete the destination backup. Concurrent CopyBackup requests can run on the same source backup. */
export interface CopyProjectsInstancesBackupsRequest {
  /** Required. The name of the destination instance that will contain the backup copy. Values are of the form: `projects//instances/`. */
  parent: string;
  /** Request body */
  body?: CopyBackupRequest;
}

export const CopyProjectsInstancesBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CopyBackupRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/backups:copy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CopyProjectsInstancesBackupsRequest>;

export type CopyProjectsInstancesBackupsResponse = Operation;
export const CopyProjectsInstancesBackupsResponse = Operation;

export type CopyProjectsInstancesBackupsError = CommonErrors;

export const copyProjectsInstancesBackups: API.OperationMethod<CopyProjectsInstancesBackupsRequest, CopyProjectsInstancesBackupsResponse, CopyProjectsInstancesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CopyProjectsInstancesBackupsRequest,
  output: CopyProjectsInstancesBackupsResponse,
  errors: [],
}));

/** Deletes a pending or completed Backup. */
export interface DeleteProjectsInstancesBackupsRequest {
  /** Required. Name of the backup to delete. Values are of the form `projects//instances//backups/`. */
  name: string;
}

export const DeleteProjectsInstancesBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/instances/{instancesId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesBackupsRequest>;

export type DeleteProjectsInstancesBackupsResponse = Empty;
export const DeleteProjectsInstancesBackupsResponse = Empty;

export type DeleteProjectsInstancesBackupsError = CommonErrors;

export const deleteProjectsInstancesBackups: API.OperationMethod<DeleteProjectsInstancesBackupsRequest, DeleteProjectsInstancesBackupsResponse, DeleteProjectsInstancesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesBackupsRequest,
  output: DeleteProjectsInstancesBackupsResponse,
  errors: [],
}));

/** Gets the access control policy for a database or backup resource. Returns an empty policy if a database or backup exists but does not have a policy set. Authorization requires `spanner.databases.getIamPolicy` permission on resource. For backups, authorization requires `spanner.backups.getIamPolicy` permission on resource. For backup schedules, authorization requires `spanner.backupSchedules.getIamPolicy` permission on resource. */
export interface GetIamPolicyProjectsInstancesBackupsRequest {
  /** REQUIRED: The Cloud Spanner resource for which the policy is being retrieved. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for database resources. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsInstancesBackupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/backups/{backupsId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsInstancesBackupsRequest>;

export type GetIamPolicyProjectsInstancesBackupsResponse = Policy;
export const GetIamPolicyProjectsInstancesBackupsResponse = Policy;

export type GetIamPolicyProjectsInstancesBackupsError = CommonErrors;

export const getIamPolicyProjectsInstancesBackups: API.OperationMethod<GetIamPolicyProjectsInstancesBackupsRequest, GetIamPolicyProjectsInstancesBackupsResponse, GetIamPolicyProjectsInstancesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsInstancesBackupsRequest,
  output: GetIamPolicyProjectsInstancesBackupsResponse,
  errors: [],
}));

/** Returns permissions that the caller has on the specified database or backup resource. Attempting this RPC on a non-existent Cloud Spanner database will result in a NOT_FOUND error if the user has `spanner.databases.list` permission on the containing Cloud Spanner instance. Otherwise returns an empty set of permissions. Calling this method on a backup that does not exist will result in a NOT_FOUND error if the user has `spanner.backups.list` permission on the containing instance. Calling this method on a backup schedule that does not exist will result in a NOT_FOUND error if the user has `spanner.backupSchedules.list` permission on the containing database. */
export interface TestIamPermissionsProjectsInstancesBackupsRequest {
  /** REQUIRED: The Cloud Spanner resource for which permissions are being tested. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for database resources. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsInstancesBackupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/backups/{backupsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsInstancesBackupsRequest>;

export type TestIamPermissionsProjectsInstancesBackupsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsInstancesBackupsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsInstancesBackupsError = CommonErrors;

export const testIamPermissionsProjectsInstancesBackups: API.OperationMethod<TestIamPermissionsProjectsInstancesBackupsRequest, TestIamPermissionsProjectsInstancesBackupsResponse, TestIamPermissionsProjectsInstancesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsInstancesBackupsRequest,
  output: TestIamPermissionsProjectsInstancesBackupsResponse,
  errors: [],
}));

/** Updates a pending or completed Backup. */
export interface PatchProjectsInstancesBackupsRequest {
  /** Output only for the CreateBackup operation. Required for the UpdateBackup operation. A globally unique identifier for the backup which cannot be changed. Values are of the form `projects//instances//backups/a-z*[a-z0-9]` The final segment of the name must be between 2 and 60 characters in length. The backup is stored in the location(s) specified in the instance configuration of the instance containing the backup, identified by the prefix of the backup name of the form `projects//instances/`. */
  name: string;
  /** Required. A mask specifying which fields (for example, `expire_time`) in the backup resource should be updated. This mask is relative to the backup resource, not to the request message. The field mask must always be specified; this prevents any future fields from being erased accidentally by clients that do not know about them. */
  updateMask?: string;
  /** Request body */
  body?: Backup;
}

export const PatchProjectsInstancesBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Backup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/instances/{instancesId}/backups/{backupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsInstancesBackupsRequest>;

export type PatchProjectsInstancesBackupsResponse = Backup;
export const PatchProjectsInstancesBackupsResponse = Backup;

export type PatchProjectsInstancesBackupsError = CommonErrors;

export const patchProjectsInstancesBackups: API.OperationMethod<PatchProjectsInstancesBackupsRequest, PatchProjectsInstancesBackupsResponse, PatchProjectsInstancesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsInstancesBackupsRequest,
  output: PatchProjectsInstancesBackupsResponse,
  errors: [],
}));

/** Sets the access control policy on a database or backup resource. Replaces any existing policy. Authorization requires `spanner.databases.setIamPolicy` permission on resource. For backups, authorization requires `spanner.backups.setIamPolicy` permission on resource. For backup schedules, authorization requires `spanner.backupSchedules.setIamPolicy` permission on resource. */
export interface SetIamPolicyProjectsInstancesBackupsRequest {
  /** REQUIRED: The Cloud Spanner resource for which the policy is being set. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for databases resources. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsInstancesBackupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/backups/{backupsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsInstancesBackupsRequest>;

export type SetIamPolicyProjectsInstancesBackupsResponse = Policy;
export const SetIamPolicyProjectsInstancesBackupsResponse = Policy;

export type SetIamPolicyProjectsInstancesBackupsError = CommonErrors;

export const setIamPolicyProjectsInstancesBackups: API.OperationMethod<SetIamPolicyProjectsInstancesBackupsRequest, SetIamPolicyProjectsInstancesBackupsResponse, SetIamPolicyProjectsInstancesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsInstancesBackupsRequest,
  output: SetIamPolicyProjectsInstancesBackupsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsInstancesBackupsOperationsRequest {
  /** The standard list page size. */
  pageSize?: number;
  /** The name of the operation's parent resource. */
  name: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list filter. */
  filter?: string;
}

export const ListProjectsInstancesBackupsOperationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/backups/{backupsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesBackupsOperationsRequest>;

export type ListProjectsInstancesBackupsOperationsResponse = ListOperationsResponse;
export const ListProjectsInstancesBackupsOperationsResponse = ListOperationsResponse;

export type ListProjectsInstancesBackupsOperationsError = CommonErrors;

export const listProjectsInstancesBackupsOperations = API.makePaginated(() => ({
  input: ListProjectsInstancesBackupsOperationsRequest,
  output: ListProjectsInstancesBackupsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsInstancesBackupsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
}

export const CancelProjectsInstancesBackupsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/instances/{instancesId}/backups/{backupsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsInstancesBackupsOperationsRequest>;

export type CancelProjectsInstancesBackupsOperationsResponse = Empty;
export const CancelProjectsInstancesBackupsOperationsResponse = Empty;

export type CancelProjectsInstancesBackupsOperationsError = CommonErrors;

export const cancelProjectsInstancesBackupsOperations: API.OperationMethod<CancelProjectsInstancesBackupsOperationsRequest, CancelProjectsInstancesBackupsOperationsResponse, CancelProjectsInstancesBackupsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsInstancesBackupsOperationsRequest,
  output: CancelProjectsInstancesBackupsOperationsResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsInstancesBackupsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsInstancesBackupsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/instances/{instancesId}/backups/{backupsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesBackupsOperationsRequest>;

export type GetProjectsInstancesBackupsOperationsResponse = Operation;
export const GetProjectsInstancesBackupsOperationsResponse = Operation;

export type GetProjectsInstancesBackupsOperationsError = CommonErrors;

export const getProjectsInstancesBackupsOperations: API.OperationMethod<GetProjectsInstancesBackupsOperationsRequest, GetProjectsInstancesBackupsOperationsResponse, GetProjectsInstancesBackupsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesBackupsOperationsRequest,
  output: GetProjectsInstancesBackupsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsInstancesBackupsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsInstancesBackupsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/instances/{instancesId}/backups/{backupsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesBackupsOperationsRequest>;

export type DeleteProjectsInstancesBackupsOperationsResponse = Empty;
export const DeleteProjectsInstancesBackupsOperationsResponse = Empty;

export type DeleteProjectsInstancesBackupsOperationsError = CommonErrors;

export const deleteProjectsInstancesBackupsOperations: API.OperationMethod<DeleteProjectsInstancesBackupsOperationsRequest, DeleteProjectsInstancesBackupsOperationsResponse, DeleteProjectsInstancesBackupsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesBackupsOperationsRequest,
  output: DeleteProjectsInstancesBackupsOperationsResponse,
  errors: [],
}));

