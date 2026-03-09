// ==========================================================================
// AlloyDB API (alloydb v1alpha)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "alloydb",
  version: "v1alpha",
  rootUrl: "https://alloydb.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface StorageDatabasecenterPartnerapiV1mainMachineConfiguration {
  /** Optional. The number of vCPUs. TODO(b/342344482) add proto validations again after bug fix. */
  vcpuCount?: number;
  /** Memory size in bytes. TODO(b/342344482) add proto validations again after bug fix. */
  memorySizeInBytes?: string;
  /** Optional. Number of shards (if applicable). */
  shardCount?: number;
  /** Optional. Baseline slots for BigQuery Reservations. Baseline slots are in increments of 50. */
  baselineSlots?: string;
  /** The number of CPUs. Deprecated. Use vcpu_count instead. TODO(b/342344482) add proto validations again after bug fix. */
  cpuCount?: number;
  /** Optional. Max slots for BigQuery Reservations. Max slots are in increments of 50. */
  maxReservationSlots?: string;
}

export const StorageDatabasecenterPartnerapiV1mainMachineConfiguration: Schema.Schema<StorageDatabasecenterPartnerapiV1mainMachineConfiguration> =
  Schema.suspend(() =>
    Schema.Struct({
      vcpuCount: Schema.optional(Schema.Number),
      memorySizeInBytes: Schema.optional(Schema.String),
      shardCount: Schema.optional(Schema.Number),
      baselineSlots: Schema.optional(Schema.String),
      cpuCount: Schema.optional(Schema.Number),
      maxReservationSlots: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainMachineConfiguration",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainMachineConfiguration>;

export interface StageInfo {
  /** The stage. */
  stage?:
    | "STAGE_UNSPECIFIED"
    | "ALLOYDB_PRECHECK"
    | "PG_UPGRADE_CHECK"
    | "PREPARE_FOR_UPGRADE"
    | "PRIMARY_INSTANCE_UPGRADE"
    | "READ_POOL_INSTANCES_UPGRADE"
    | "ROLLBACK"
    | "CLEANUP"
    | (string & {});
  /** Status of the stage. */
  status?:
    | "STATUS_UNSPECIFIED"
    | "NOT_STARTED"
    | "IN_PROGRESS"
    | "SUCCESS"
    | "FAILED"
    | "PARTIAL_SUCCESS"
    | "CANCEL_IN_PROGRESS"
    | "CANCELLED"
    | (string & {});
  /** logs_url is the URL for the logs associated with a stage if that stage has logs. Right now, only three stages have logs: ALLOYDB_PRECHECK, PG_UPGRADE_CHECK, PRIMARY_INSTANCE_UPGRADE. */
  logsUrl?: string;
}

export const StageInfo: Schema.Schema<StageInfo> = Schema.suspend(() =>
  Schema.Struct({
    stage: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    logsUrl: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "StageInfo" }) as any as Schema.Schema<StageInfo>;

export interface EncryptionConfig {
  /** The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME] */
  kmsKeyName?: string;
}

export const EncryptionConfig: Schema.Schema<EncryptionConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      kmsKeyName: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "EncryptionConfig",
}) as any as Schema.Schema<EncryptionConfig>;

export interface ContinuousBackupConfig {
  /** Whether ContinuousBackup is enabled. */
  enabled?: boolean;
  /** The number of days that are eligible to restore from using PITR. To support the entire recovery window, backups and logs are retained for one day more than the recovery window. If not set, defaults to 14 days. */
  recoveryWindowDays?: number;
  /** The encryption config can be specified to encrypt the backups with a customer-managed encryption key (CMEK). When this field is not specified, the backup will use the cluster's encryption config. */
  encryptionConfig?: EncryptionConfig;
}

export const ContinuousBackupConfig: Schema.Schema<ContinuousBackupConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
      recoveryWindowDays: Schema.optional(Schema.Number),
      encryptionConfig: Schema.optional(EncryptionConfig),
    }),
  ).annotate({
    identifier: "ContinuousBackupConfig",
  }) as any as Schema.Schema<ContinuousBackupConfig>;

export interface GoogleTypeTimeOfDay {
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
}

export const GoogleTypeTimeOfDay: Schema.Schema<GoogleTypeTimeOfDay> =
  Schema.suspend(() =>
    Schema.Struct({
      seconds: Schema.optional(Schema.Number),
      minutes: Schema.optional(Schema.Number),
      hours: Schema.optional(Schema.Number),
      nanos: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleTypeTimeOfDay",
  }) as any as Schema.Schema<GoogleTypeTimeOfDay>;

export interface GoogleTypeDate {
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
}

export const GoogleTypeDate: Schema.Schema<GoogleTypeDate> = Schema.suspend(
  () =>
    Schema.Struct({
      day: Schema.optional(Schema.Number),
      month: Schema.optional(Schema.Number),
      year: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "GoogleTypeDate",
}) as any as Schema.Schema<GoogleTypeDate>;

export interface DenyMaintenancePeriod {
  /** Time in UTC when the deny period starts on start_date and ends on end_date. This can be: * Full time OR * All zeros for 00:00:00 UTC */
  time?: GoogleTypeTimeOfDay;
  /** Deny period end date. This can be: * A full date, with non-zero year, month and day values OR * A month and day value, with a zero year for recurring */
  endDate?: GoogleTypeDate;
  /** Deny period start date. This can be: * A full date, with non-zero year, month and day values OR * A month and day value, with a zero year for recurring */
  startDate?: GoogleTypeDate;
}

export const DenyMaintenancePeriod: Schema.Schema<DenyMaintenancePeriod> =
  Schema.suspend(() =>
    Schema.Struct({
      time: Schema.optional(GoogleTypeTimeOfDay),
      endDate: Schema.optional(GoogleTypeDate),
      startDate: Schema.optional(GoogleTypeDate),
    }),
  ).annotate({
    identifier: "DenyMaintenancePeriod",
  }) as any as Schema.Schema<DenyMaintenancePeriod>;

export interface MaintenanceWindow {
  /** Preferred day of the week for maintenance, e.g. MONDAY, TUESDAY, etc. */
  day?:
    | "DAY_OF_WEEK_UNSPECIFIED"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
    | (string & {});
  /** Preferred time to start the maintenance operation on the specified day. Maintenance will start within 1 hour of this time. */
  startTime?: GoogleTypeTimeOfDay;
}

export const MaintenanceWindow: Schema.Schema<MaintenanceWindow> =
  Schema.suspend(() =>
    Schema.Struct({
      day: Schema.optional(Schema.String),
      startTime: Schema.optional(GoogleTypeTimeOfDay),
    }),
  ).annotate({
    identifier: "MaintenanceWindow",
  }) as any as Schema.Schema<MaintenanceWindow>;

export interface MaintenanceUpdatePolicy {
  /** Periods to deny maintenance. Currently limited to 1. */
  denyMaintenancePeriods?: Array<DenyMaintenancePeriod>;
  /** Preferred windows to perform maintenance. Currently limited to 1. */
  maintenanceWindows?: Array<MaintenanceWindow>;
}

export const MaintenanceUpdatePolicy: Schema.Schema<MaintenanceUpdatePolicy> =
  Schema.suspend(() =>
    Schema.Struct({
      denyMaintenancePeriods: Schema.optional(
        Schema.Array(DenyMaintenancePeriod),
      ),
      maintenanceWindows: Schema.optional(Schema.Array(MaintenanceWindow)),
    }),
  ).annotate({
    identifier: "MaintenanceUpdatePolicy",
  }) as any as Schema.Schema<MaintenanceUpdatePolicy>;

export interface ConnectionPoolConfig {
  /** Output only. The number of running poolers per instance. */
  poolerCount?: number;
  /** Optional. Connection Pool flags, as a list of "key": "value" pairs. */
  flags?: Record<string, string>;
  /** Optional. Whether to enable Managed Connection Pool (MCP). */
  enabled?: boolean;
}

export const ConnectionPoolConfig: Schema.Schema<ConnectionPoolConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      poolerCount: Schema.optional(Schema.Number),
      flags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ConnectionPoolConfig",
  }) as any as Schema.Schema<ConnectionPoolConfig>;

export interface BackupDrEnabledWindow {
  /** Whether automated backup was previously enabled prior to enabling BackupDR protection for this cluster. */
  automatedBackupPreviouslyEnabled?: boolean;
  /** Whether continuous backup was previously enabled prior to enabling BackupDR protection for this cluster. */
  continuousBackupPreviouslyEnabled?: boolean;
  /** Time when the BackupDR protection for this cluster was disabled. This field will be empty if this BackupDR window is the `current_window`. */
  disabledTime?: string;
  /** The BackupPlanAssociation resource that was used to enable BackupDR protection for this cluster. */
  backupPlanAssociation?: string;
  /** The retention period for logs generated by BackupDR for this cluster. */
  logRetentionPeriod?: string;
  /** The DataSource resource that represents the cluster in BackupDR. */
  dataSource?: string;
  /** The retention set for the continuous backup that was previously enabled prior to enabling BackupDR protection for this cluster. */
  continuousBackupPreviousRecoveryWindowDays?: number;
  /** Time when the BackupDR protection for this cluster was enabled. */
  enabledTime?: string;
  /** The time when continuous backup was previously enabled prior to enabling BackupDR protection for this cluster. */
  continuousBackupPreviouslyEnabledTime?: string;
}

export const BackupDrEnabledWindow: Schema.Schema<BackupDrEnabledWindow> =
  Schema.suspend(() =>
    Schema.Struct({
      automatedBackupPreviouslyEnabled: Schema.optional(Schema.Boolean),
      continuousBackupPreviouslyEnabled: Schema.optional(Schema.Boolean),
      disabledTime: Schema.optional(Schema.String),
      backupPlanAssociation: Schema.optional(Schema.String),
      logRetentionPeriod: Schema.optional(Schema.String),
      dataSource: Schema.optional(Schema.String),
      continuousBackupPreviousRecoveryWindowDays: Schema.optional(
        Schema.Number,
      ),
      enabledTime: Schema.optional(Schema.String),
      continuousBackupPreviouslyEnabledTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BackupDrEnabledWindow",
  }) as any as Schema.Schema<BackupDrEnabledWindow>;

export interface BackupDrInfo {
  /** The current BackupDR configuration for this cluster. If BackupDR protection is not enabled for this cluster, this field will be empty. */
  currentWindow?: BackupDrEnabledWindow;
  /** Windows during which BackupDR was enabled for this cluster, along with associated configuration for that window. These are used to determine points-in-time for which restores can be performed. The windows are ordered with the most recent window last. Windows are mutally exclusive. Windows which closed more than 1 year ago will be removed from this list. */
  previousWindows?: Array<BackupDrEnabledWindow>;
}

export const BackupDrInfo: Schema.Schema<BackupDrInfo> = Schema.suspend(() =>
  Schema.Struct({
    currentWindow: Schema.optional(BackupDrEnabledWindow),
    previousWindows: Schema.optional(Schema.Array(BackupDrEnabledWindow)),
  }),
).annotate({
  identifier: "BackupDrInfo",
}) as any as Schema.Schema<BackupDrInfo>;

export interface UserPassword {
  /** The initial password for the user. */
  password?: string;
  /** The database username. */
  user?: string;
}

export const UserPassword: Schema.Schema<UserPassword> = Schema.suspend(() =>
  Schema.Struct({
    password: Schema.optional(Schema.String),
    user: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "UserPassword",
}) as any as Schema.Schema<UserPassword>;

export interface ContinuousBackupSource {
  /** Required. The source cluster from which to restore. This cluster must have continuous backup enabled for this operation to succeed. For the required format, see the comment on the Cluster.name field. */
  cluster?: string;
  /** Required. The point in time to restore to. */
  pointInTime?: string;
}

export const ContinuousBackupSource: Schema.Schema<ContinuousBackupSource> =
  Schema.suspend(() =>
    Schema.Struct({
      cluster: Schema.optional(Schema.String),
      pointInTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContinuousBackupSource",
  }) as any as Schema.Schema<ContinuousBackupSource>;

export interface QuantityBasedExpiry {
  /** Output only. The length of the quantity-based queue, specified by the backup's retention policy. */
  totalRetentionCount?: number;
  /** Output only. The backup's position among its backups with the same source cluster and type, by descending chronological order create time(i.e. newest first). */
  retentionCount?: number;
}

export const QuantityBasedExpiry: Schema.Schema<QuantityBasedExpiry> =
  Schema.suspend(() =>
    Schema.Struct({
      totalRetentionCount: Schema.optional(Schema.Number),
      retentionCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "QuantityBasedExpiry",
  }) as any as Schema.Schema<QuantityBasedExpiry>;

export interface EncryptionInfo {
  /** Output only. Cloud KMS key versions that are being used to protect the database or the backup. */
  kmsKeyVersions?: Array<string>;
  /** Output only. Type of encryption. */
  encryptionType?:
    | "TYPE_UNSPECIFIED"
    | "GOOGLE_DEFAULT_ENCRYPTION"
    | "CUSTOMER_MANAGED_ENCRYPTION"
    | (string & {});
}

export const EncryptionInfo: Schema.Schema<EncryptionInfo> = Schema.suspend(
  () =>
    Schema.Struct({
      kmsKeyVersions: Schema.optional(Schema.Array(Schema.String)),
      encryptionType: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "EncryptionInfo",
}) as any as Schema.Schema<EncryptionInfo>;

export interface Backup {
  /** Output only. Set to true if the cluster corresponding to this backup is deleted. This field is only populated for when using the BACKUP_VIEW_CLUSTER_DELETED view. */
  clusterDeleted?: boolean;
  /** Output only. Reconciling (https://google.aip.dev/128#reconciliation), if true, indicates that the service is actively updating the resource. This can happen due to user-triggered updates or system actions like failover or maintenance. */
  reconciling?: boolean;
  /** Output only. The system-generated UID of the cluster which was used to create this resource. */
  clusterUid?: string;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** For Resource freshness validation (https://google.aip.dev/154) */
  etag?: string;
  /** Output only. The QuantityBasedExpiry of the backup, specified by the backup's retention policy. Once the expiry quantity is over retention, the backup is eligible to be garbage collected. */
  expiryQuantity?: QuantityBasedExpiry;
  /** Output only. The name of the backup resource with the format: * projects/{project}/locations/{region}/backups/{backup_id} where the cluster and backup ID segments should satisfy the regex expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`, e.g. 1-63 characters of lowercase letters, numbers, and dashes, starting with a letter, and ending with a letter or number. For more details see https://google.aip.dev/122. The prefix of the backup resource name is the name of the parent resource: * projects/{project}/locations/{region} */
  name?: string;
  /** User-provided description of the backup. */
  description?: string;
  /** Output only. Create time stamp */
  createTime?: string;
  /** Output only. The system-generated UID of the resource. The UID is assigned when the resource is created, and it is retained until it is deleted. */
  uid?: string;
  /** Output only. The size of the backup in bytes. */
  sizeBytes?: string;
  /** User-settable and human-readable display name for the Backup. */
  displayName?: string;
  /** Output only. The encryption information for the backup. */
  encryptionInfo?: EncryptionInfo;
  /** Required. The full resource name of the backup source cluster (e.g., projects/{project}/locations/{region}/clusters/{cluster_id}). */
  clusterName?: string;
  /** Output only. Delete time stamp */
  deleteTime?: string;
  /** Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: ``` "123/environment": "production", "123/costCenter": "marketing" ``` */
  tags?: Record<string, string>;
  /** Output only. The time at which after the backup is eligible to be garbage collected. It is the duration specified by the backup's retention policy, added to the backup's create_time. */
  expiryTime?: string;
  /** Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128 */
  annotations?: Record<string, string>;
  /** Optional. The encryption config can be specified to encrypt the backup with a customer-managed encryption key (CMEK). When this field is not specified, the backup will then use default encryption scheme to protect the user data. */
  encryptionConfig?: EncryptionConfig;
  /** The backup type, which suggests the trigger for the backup. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "ON_DEMAND"
    | "AUTOMATED"
    | "CONTINUOUS"
    | (string & {});
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Output only. Update time stamp Users should not infer any meaning from this field. Its value is generally unrelated to the timing of the backup creation operation. */
  updateTime?: string;
  /** Labels as key value pairs */
  labels?: Record<string, string>;
  /** Output only. The database engine major version of the cluster this backup was created from. Any restored cluster created from this backup will have the same database version. */
  databaseVersion?:
    | "DATABASE_VERSION_UNSPECIFIED"
    | "POSTGRES_13"
    | "POSTGRES_14"
    | "POSTGRES_15"
    | "POSTGRES_16"
    | "POSTGRES_17"
    | "POSTGRES_18"
    | (string & {});
  /** Output only. The current state of the backup. */
  state?:
    | "STATE_UNSPECIFIED"
    | "READY"
    | "CREATING"
    | "FAILED"
    | "DELETING"
    | (string & {});
  /** Output only. Timestamp when the resource finished being created. */
  createCompletionTime?: string;
}

export const Backup: Schema.Schema<Backup> = Schema.suspend(() =>
  Schema.Struct({
    clusterDeleted: Schema.optional(Schema.Boolean),
    reconciling: Schema.optional(Schema.Boolean),
    clusterUid: Schema.optional(Schema.String),
    satisfiesPzs: Schema.optional(Schema.Boolean),
    etag: Schema.optional(Schema.String),
    expiryQuantity: Schema.optional(QuantityBasedExpiry),
    name: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    uid: Schema.optional(Schema.String),
    sizeBytes: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    encryptionInfo: Schema.optional(EncryptionInfo),
    clusterName: Schema.optional(Schema.String),
    deleteTime: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    expiryTime: Schema.optional(Schema.String),
    annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    encryptionConfig: Schema.optional(EncryptionConfig),
    type: Schema.optional(Schema.String),
    satisfiesPzi: Schema.optional(Schema.Boolean),
    updateTime: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    databaseVersion: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    createCompletionTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Backup" }) as any as Schema.Schema<Backup>;

export interface MachineConfig {
  /** The number of CPU's in the VM instance. */
  cpuCount?: number;
  /** Machine type of the VM instance. E.g. "n2-highmem-4", "n2-highmem-8", "c4a-highmem-4-lssd". cpu_count must match the number of vCPUs in the machine type. */
  machineType?: string;
}

export const MachineConfig: Schema.Schema<MachineConfig> = Schema.suspend(() =>
  Schema.Struct({
    cpuCount: Schema.optional(Schema.Number),
    machineType: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "MachineConfig",
}) as any as Schema.Schema<MachineConfig>;

export interface StorageDatabasecenterPartnerapiV1mainOperationError {
  /** Additional information about the error encountered. REQUIRED */
  message?: string;
  errorType?:
    | "OPERATION_ERROR_TYPE_UNSPECIFIED"
    | "KMS_KEY_ERROR"
    | "DATABASE_ERROR"
    | "STOCKOUT_ERROR"
    | "CANCELLATION_ERROR"
    | "SQLSERVER_ERROR"
    | "INTERNAL_ERROR"
    | (string & {});
  /** Identifies the specific error that occurred. REQUIRED */
  code?: string;
}

export const StorageDatabasecenterPartnerapiV1mainOperationError: Schema.Schema<StorageDatabasecenterPartnerapiV1mainOperationError> =
  Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
      errorType: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainOperationError",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainOperationError>;

export interface StorageDatabasecenterPartnerapiV1mainBackupRun {
  /** Information about why the backup operation failed. This is only present if the run has the FAILED status. OPTIONAL */
  error?: StorageDatabasecenterPartnerapiV1mainOperationError;
  /** The status of this run. REQUIRED */
  status?: "STATUS_UNSPECIFIED" | "SUCCESSFUL" | "FAILED" | (string & {});
  /** The time the backup operation started. REQUIRED */
  startTime?: string;
  /** The time the backup operation completed. REQUIRED */
  endTime?: string;
}

export const StorageDatabasecenterPartnerapiV1mainBackupRun: Schema.Schema<StorageDatabasecenterPartnerapiV1mainBackupRun> =
  Schema.suspend(() =>
    Schema.Struct({
      error: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainOperationError,
      ),
      status: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainBackupRun",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainBackupRun>;

export interface Node {
  /** Output only. The Compute Engine zone of the VM e.g. "us-central1-b". */
  zoneId?: string;
  /** Output only. The identifier of the VM e.g. "test-read-0601-407e52be-ms3l". */
  id?: string;
  /** Output only. The private IP address of the VM e.g. "10.57.0.34". */
  ip?: string;
  /** Output only. Determined by state of the compute VM and postgres-service health. Compute VM state can have values listed in https://cloud.google.com/compute/docs/instances/instance-life-cycle and postgres-service health can have values: HEALTHY and UNHEALTHY. */
  state?: string;
}

export const Node: Schema.Schema<Node> = Schema.suspend(() =>
  Schema.Struct({
    zoneId: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    ip: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Node" }) as any as Schema.Schema<Node>;

export interface SecondaryConfig {
  /** The name of the primary cluster name with the format: * projects/{project}/locations/{region}/clusters/{cluster_id} */
  primaryClusterName?: string;
}

export const SecondaryConfig: Schema.Schema<SecondaryConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      primaryClusterName: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "SecondaryConfig",
}) as any as Schema.Schema<SecondaryConfig>;

export interface CpuUtilization {
  /** Target CPU utilization as a float between 0 and 1. */
  utilizationTarget?: number;
}

export const CpuUtilization: Schema.Schema<CpuUtilization> = Schema.suspend(
  () =>
    Schema.Struct({
      utilizationTarget: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "CpuUtilization",
}) as any as Schema.Schema<CpuUtilization>;

export interface Policy {
  /** The period of time in seconds after a new node is created before the autoscaler will incorporate its resource usage (e.g. CPU utilization) into the autoscaling recommendation algorithm. */
  coolDownPeriodSec?: string;
  /** If true, autoscaling is enabled for the instance. If not set, the default value is false. */
  enabled?: boolean;
  /** Maximum number of nodes for the autoscaler. */
  maxNodeCount?: string;
  /** CPU utilization policy for the autoscaler. */
  cpuUtilization?: CpuUtilization;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() =>
  Schema.Struct({
    coolDownPeriodSec: Schema.optional(Schema.String),
    enabled: Schema.optional(Schema.Boolean),
    maxNodeCount: Schema.optional(Schema.String),
    cpuUtilization: Schema.optional(CpuUtilization),
  }),
).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface Schedule {
  /** If true, the schedule is disabled. */
  disabled?: boolean;
  /** Cron expression for the triggering the schedule. See https://cloud.google.com/compute/docs/autoscaler/scaling-schedules#cron_expressions for the syntax. */
  cronExpression?: string;
  /** The location-based IANA time zone for interpreting the schedule's start time. If no time zone is provided, UTC is used by default. */
  timeZone?: string;
  /** Minimum number of nodes in while the schedule is active. */
  minNodeCount?: string;
  /** Description of the schedule. */
  description?: string;
  /** Duration of the schedule. */
  durationSec?: string;
  /** Name of the schedule. */
  name?: string;
}

export const Schedule: Schema.Schema<Schedule> = Schema.suspend(() =>
  Schema.Struct({
    disabled: Schema.optional(Schema.Boolean),
    cronExpression: Schema.optional(Schema.String),
    timeZone: Schema.optional(Schema.String),
    minNodeCount: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    durationSec: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Schedule" }) as any as Schema.Schema<Schedule>;

export interface AutoScalingConfig {
  /** Policy for the MIG autoscaler. */
  policy?: Policy;
  /** Optional list of schedules for the MIG autoscaler. If not set, no schedules are created. */
  schedules?: Array<Schedule>;
}

export const AutoScalingConfig: Schema.Schema<AutoScalingConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(Policy),
      schedules: Schema.optional(Schema.Array(Schedule)),
    }),
  ).annotate({
    identifier: "AutoScalingConfig",
  }) as any as Schema.Schema<AutoScalingConfig>;

export interface ReadPoolConfig {
  /** Read capacity, i.e. number of nodes in a read pool instance. */
  nodeCount?: number;
  /** Autoscaling configuration for the read pool instance. If not set, the read pool instance will not be autoscaled. */
  autoScalingConfig?: AutoScalingConfig;
}

export const ReadPoolConfig: Schema.Schema<ReadPoolConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      nodeCount: Schema.optional(Schema.Number),
      autoScalingConfig: Schema.optional(AutoScalingConfig),
    }),
).annotate({
  identifier: "ReadPoolConfig",
}) as any as Schema.Schema<ReadPoolConfig>;

export interface GoogleCloudLocationLocation {
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const GoogleCloudLocationLocation: Schema.Schema<GoogleCloudLocationLocation> =
  Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      name: Schema.optional(Schema.String),
      locationId: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleCloudLocationLocation",
  }) as any as Schema.Schema<GoogleCloudLocationLocation>;

export interface PscAutoConnectionConfig {
  /** Output only. The IP address of the PSC service automation endpoint. */
  ipAddress?: string;
  /** Output only. The status of the PSC service automation connection. Possible values: "STATE_UNSPECIFIED" - An invalid state as the default case. "ACTIVE" - The connection has been created successfully. "FAILED" - The connection is not functional since some resources on the connection fail to be created. "CREATING" - The connection is being created. "DELETING" - The connection is being deleted. "CREATE_REPAIRING" - The connection is being repaired to complete creation. "DELETE_REPAIRING" - The connection is being repaired to complete deletion. */
  status?: string;
  /** Output only. The status of the service connection policy. Possible values: "STATE_UNSPECIFIED" - Default state, when Connection Map is created initially. "VALID" - Set when policy and map configuration is valid, and their matching can lead to allowing creation of PSC Connections subject to other constraints like connections limit. "CONNECTION_POLICY_MISSING" - No Service Connection Policy found for this network and Service Class "POLICY_LIMIT_REACHED" - Service Connection Policy limit reached for this network and Service Class "CONSUMER_INSTANCE_PROJECT_NOT_ALLOWLISTED" - The consumer instance project is not in AllowedGoogleProducersResourceHierarchyLevels of the matching ServiceConnectionPolicy. */
  consumerNetworkStatus?: string;
  /** The consumer project to which the PSC service automation endpoint will be created. */
  consumerProject?: string;
  /** The consumer network for the PSC service automation, example: "projects/vpc-host-project/global/networks/default". The consumer network might be hosted a different project than the consumer project. */
  consumerNetwork?: string;
}

export const PscAutoConnectionConfig: Schema.Schema<PscAutoConnectionConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      ipAddress: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      consumerNetworkStatus: Schema.optional(Schema.String),
      consumerProject: Schema.optional(Schema.String),
      consumerNetwork: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PscAutoConnectionConfig",
  }) as any as Schema.Schema<PscAutoConnectionConfig>;

export interface PscInterfaceConfig {
  /** The network attachment resource created in the consumer network to which the PSC interface will be linked. This is of the format: "projects/${CONSUMER_PROJECT}/regions/${REGION}/networkAttachments/${NETWORK_ATTACHMENT_NAME}". The network attachment must be in the same region as the instance. */
  networkAttachmentResource?: string;
}

export const PscInterfaceConfig: Schema.Schema<PscInterfaceConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      networkAttachmentResource: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PscInterfaceConfig",
  }) as any as Schema.Schema<PscInterfaceConfig>;

export interface PscInstanceConfig {
  /** Optional. Configurations for setting up PSC service automation. */
  pscAutoConnections?: Array<PscAutoConnectionConfig>;
  /** Output only. The DNS name of the instance for PSC connectivity. Name convention: ...alloydb-psc.goog */
  pscDnsName?: string;
  /** Output only. The service attachment created when Private Service Connect (PSC) is enabled for the instance. The name of the resource will be in the format of `projects//regions//serviceAttachments/` */
  serviceAttachmentLink?: string;
  /** Optional. Configurations for setting up PSC interfaces attached to the instance which are used for outbound connectivity. Only primary instances can have PSC interface attached. Currently we only support 0 or 1 PSC interface. */
  pscInterfaceConfigs?: Array<PscInterfaceConfig>;
  /** Optional. List of consumer projects that are allowed to create PSC endpoints to service-attachments to this instance. */
  allowedConsumerProjects?: Array<string>;
}

export const PscInstanceConfig: Schema.Schema<PscInstanceConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      pscAutoConnections: Schema.optional(
        Schema.Array(PscAutoConnectionConfig),
      ),
      pscDnsName: Schema.optional(Schema.String),
      serviceAttachmentLink: Schema.optional(Schema.String),
      pscInterfaceConfigs: Schema.optional(Schema.Array(PscInterfaceConfig)),
      allowedConsumerProjects: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "PscInstanceConfig",
  }) as any as Schema.Schema<PscInstanceConfig>;

export interface BackupDrPitrSource {
  /** Required. The point in time to restore to. */
  pointInTime?: string;
  /** Required. The name of the backup resource with the format: * projects/{project}/locations/{location}/backupVaults/{backupvault_id}/dataSources/{datasource_id} */
  dataSource?: string;
}

export const BackupDrPitrSource: Schema.Schema<BackupDrPitrSource> =
  Schema.suspend(() =>
    Schema.Struct({
      pointInTime: Schema.optional(Schema.String),
      dataSource: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BackupDrPitrSource",
  }) as any as Schema.Schema<BackupDrPitrSource>;

export interface TrialMetadata {
  /** grace end time of the cluster. */
  graceEndTime?: string;
  /** Upgrade time of trial cluster to Standard cluster. */
  upgradeTime?: string;
  /** End time of the trial cluster. */
  endTime?: string;
  /** start time of the trial cluster. */
  startTime?: string;
}

export const TrialMetadata: Schema.Schema<TrialMetadata> = Schema.suspend(() =>
  Schema.Struct({
    graceEndTime: Schema.optional(Schema.String),
    upgradeTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "TrialMetadata",
}) as any as Schema.Schema<TrialMetadata>;

export interface Status {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    message: Schema.optional(Schema.String),
    code: Schema.optional(Schema.Number),
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() =>
  Schema.Struct({
    response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    done: Schema.optional(Schema.Boolean),
    error: Schema.optional(Status),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      operations: Schema.optional(Schema.Array(Operation)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface StorageDatabasecenterPartnerapiV1mainUserLabels {
  labels?: Record<string, string>;
}

export const StorageDatabasecenterPartnerapiV1mainUserLabels: Schema.Schema<StorageDatabasecenterPartnerapiV1mainUserLabels> =
  Schema.suspend(() =>
    Schema.Struct({
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainUserLabels",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainUserLabels>;

export interface RestartInstanceRequest {
  /** Optional. Full name of the nodes as obtained from INSTANCE_VIEW_FULL to restart upon. Applicable only to read instances. */
  nodeIds?: Array<string>;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. */
  validateOnly?: boolean;
}

export const RestartInstanceRequest: Schema.Schema<RestartInstanceRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      nodeIds: Schema.optional(Schema.Array(Schema.String)),
      requestId: Schema.optional(Schema.String),
      validateOnly: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "RestartInstanceRequest",
  }) as any as Schema.Schema<RestartInstanceRequest>;

export interface ObservabilityInstanceConfig {
  /** Indicates whether to track active query plans for an instance. If not set, the default value is "off". Can only be enabled if track_active_queries is enabled. */
  trackActiveQueryPlan?: boolean;
  /** Query string length. The default value is 10k. */
  maxQueryStringLength?: number;
  /** Preserve comments in query string for an instance. This flag is turned "off" by default. */
  preserveComments?: boolean;
  /** Whether assistive experiences are enabled for this AlloyDB instance. */
  assistiveExperiencesEnabled?: boolean;
  /** Record application tags for an instance. This flag is turned "off" by default. */
  recordApplicationTags?: boolean;
  /** Output only. Track wait event types during query execution for an instance. This flag is turned "on" by default but tracking is enabled only after observability enabled flag is also turned on. This is read-only flag and only modifiable by internal API. */
  trackWaitEventTypes?: boolean;
  /** Track wait events during query execution for an instance. This flag is turned "on" by default but tracking is enabled only after observability enabled flag is also turned on. */
  trackWaitEvents?: boolean;
  /** Observability feature status for an instance. This flag is turned "off" by default. */
  enabled?: boolean;
  /** Track actively running queries on the instance. If not set, this flag is "off" by default. */
  trackActiveQueries?: boolean;
  /** Number of query execution plans captured by Insights per minute for all queries combined. The default value is 200. Any integer between 0 to 200 is considered valid. */
  queryPlansPerMinute?: number;
  /** Track client address for an instance. If not set, default value is "off". */
  trackClientAddress?: boolean;
}

export const ObservabilityInstanceConfig: Schema.Schema<ObservabilityInstanceConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      trackActiveQueryPlan: Schema.optional(Schema.Boolean),
      maxQueryStringLength: Schema.optional(Schema.Number),
      preserveComments: Schema.optional(Schema.Boolean),
      assistiveExperiencesEnabled: Schema.optional(Schema.Boolean),
      recordApplicationTags: Schema.optional(Schema.Boolean),
      trackWaitEventTypes: Schema.optional(Schema.Boolean),
      trackWaitEvents: Schema.optional(Schema.Boolean),
      enabled: Schema.optional(Schema.Boolean),
      trackActiveQueries: Schema.optional(Schema.Boolean),
      queryPlansPerMinute: Schema.optional(Schema.Number),
      trackClientAddress: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ObservabilityInstanceConfig",
  }) as any as Schema.Schema<ObservabilityInstanceConfig>;

export interface AuthorizedNetwork {
  /** CIDR range for one authorzied network of the instance. */
  cidrRange?: string;
}

export const AuthorizedNetwork: Schema.Schema<AuthorizedNetwork> =
  Schema.suspend(() =>
    Schema.Struct({
      cidrRange: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AuthorizedNetwork",
  }) as any as Schema.Schema<AuthorizedNetwork>;

export interface InstanceNetworkConfig {
  /** Output only. The resource link for the VPC network in which instance resources are created and from which they are accessible via Private IP. This will be the same value as the parent cluster's network. It is specified in the form: // `projects/{project_number}/global/networks/{network_id}`. */
  network?: string;
  /** Optional. A list of external network authorized to access this instance. */
  authorizedExternalNetworks?: Array<AuthorizedNetwork>;
  /** Optional. Name of the allocated IP range for the private IP AlloyDB instance, for example: "google-managed-services-default". If set, the instance IPs will be created from this allocated range and will override the IP range used by the parent cluster. The range name must comply with [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035). Specifically, the name must be 1-63 characters long and match the regular expression [a-z]([-a-z0-9]*[a-z0-9])?. */
  allocatedIpRangeOverride?: string;
  /** Optional. Enabling an outbound public IP address to support a database server sending requests out into the internet. */
  enableOutboundPublicIp?: boolean;
  /** Optional. Enabling public ip for the instance. */
  enablePublicIp?: boolean;
}

export const InstanceNetworkConfig: Schema.Schema<InstanceNetworkConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      network: Schema.optional(Schema.String),
      authorizedExternalNetworks: Schema.optional(
        Schema.Array(AuthorizedNetwork),
      ),
      allocatedIpRangeOverride: Schema.optional(Schema.String),
      enableOutboundPublicIp: Schema.optional(Schema.Boolean),
      enablePublicIp: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "InstanceNetworkConfig",
  }) as any as Schema.Schema<InstanceNetworkConfig>;

export interface QueryInsightsInstanceConfig {
  /** Record application tags for an instance. This flag is turned "on" by default. */
  recordApplicationTags?: boolean;
  /** Number of query execution plans captured by Insights per minute for all queries combined. The default value is 5. Any integer between 0 and 20 is considered valid. */
  queryPlansPerMinute?: number;
  /** Record client address for an instance. Client address is PII information. This flag is turned "on" by default. */
  recordClientAddress?: boolean;
  /** Query string length. The default value is 1024. Any integer between 256 and 4500 is considered valid. */
  queryStringLength?: number;
}

export const QueryInsightsInstanceConfig: Schema.Schema<QueryInsightsInstanceConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      recordApplicationTags: Schema.optional(Schema.Boolean),
      queryPlansPerMinute: Schema.optional(Schema.Number),
      recordClientAddress: Schema.optional(Schema.Boolean),
      queryStringLength: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "QueryInsightsInstanceConfig",
  }) as any as Schema.Schema<QueryInsightsInstanceConfig>;

export interface UpdatePolicy {
  /** Mode for updating the instance. */
  mode?: "MODE_UNSPECIFIED" | "DEFAULT" | "FORCE_APPLY" | (string & {});
}

export const UpdatePolicy: Schema.Schema<UpdatePolicy> = Schema.suspend(() =>
  Schema.Struct({
    mode: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "UpdatePolicy",
}) as any as Schema.Schema<UpdatePolicy>;

export interface GeminiInstanceConfig {
  /** Output only. Deprecated and unused. This field will be removed in the near future. */
  entitled?: boolean;
}

export const GeminiInstanceConfig: Schema.Schema<GeminiInstanceConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      entitled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GeminiInstanceConfig",
  }) as any as Schema.Schema<GeminiInstanceConfig>;

export interface GCAInstanceConfig {
  /** Output only. Represents the GCA entitlement state of the instance. */
  gcaEntitlement?:
    | "GCA_ENTITLEMENT_TYPE_UNSPECIFIED"
    | "GCA_STANDARD"
    | (string & {});
}

export const GCAInstanceConfig: Schema.Schema<GCAInstanceConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      gcaEntitlement: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GCAInstanceConfig",
  }) as any as Schema.Schema<GCAInstanceConfig>;

export interface SslConfig {
  /** Optional. SSL mode. Specifies client-server SSL/TLS connection behavior. */
  sslMode?:
    | "SSL_MODE_UNSPECIFIED"
    | "SSL_MODE_ALLOW"
    | "SSL_MODE_REQUIRE"
    | "SSL_MODE_VERIFY_CA"
    | "ALLOW_UNENCRYPTED_AND_ENCRYPTED"
    | "ENCRYPTED_ONLY"
    | (string & {});
  /** Optional. Certificate Authority (CA) source. Only CA_SOURCE_MANAGED is supported currently, and is the default value. */
  caSource?: "CA_SOURCE_UNSPECIFIED" | "CA_SOURCE_MANAGED" | (string & {});
}

export const SslConfig: Schema.Schema<SslConfig> = Schema.suspend(() =>
  Schema.Struct({
    sslMode: Schema.optional(Schema.String),
    caSource: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "SslConfig" }) as any as Schema.Schema<SslConfig>;

export interface ClientConnectionConfig {
  /** Optional. Configuration to enforce connectors only (ex: AuthProxy) connections to the database. */
  requireConnectors?: boolean;
  /** Optional. SSL configuration option for this instance. */
  sslConfig?: SslConfig;
}

export const ClientConnectionConfig: Schema.Schema<ClientConnectionConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      requireConnectors: Schema.optional(Schema.Boolean),
      sslConfig: Schema.optional(SslConfig),
    }),
  ).annotate({
    identifier: "ClientConnectionConfig",
  }) as any as Schema.Schema<ClientConnectionConfig>;

export interface Instance {
  /** Output only. The current serving state of the instance. */
  state?:
    | "STATE_UNSPECIFIED"
    | "READY"
    | "STOPPED"
    | "CREATING"
    | "DELETING"
    | "MAINTENANCE"
    | "FAILED"
    | "BOOTSTRAPPING"
    | "PROMOTING"
    | "SWITCHOVER"
    | "STOPPING"
    | "STARTING"
    | (string & {});
  /** Output only. The name of the instance resource with the format: * projects/{project}/locations/{region}/clusters/{cluster_id}/instances/{instance_id} where the cluster and instance ID segments should satisfy the regex expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`, e.g. 1-63 characters of lowercase letters, numbers, and dashes, starting with a letter, and ending with a letter or number. For more details see https://google.aip.dev/122. The prefix of the instance resource name is the name of the parent resource: * projects/{project}/locations/{region}/clusters/{cluster_id} */
  name?: string;
  /** Optional. Specifies whether an instance needs to spin up. Once the instance is active, the activation policy can be updated to the `NEVER` to stop the instance. Likewise, the activation policy can be updated to `ALWAYS` to start the instance. There are restrictions around when an instance can/cannot be activated (for example, a read pool instance should be stopped before stopping primary etc.). Please refer to the API documentation for more details. */
  activationPolicy?:
    | "ACTIVATION_POLICY_UNSPECIFIED"
    | "ALWAYS"
    | "NEVER"
    | (string & {});
  /** Configuration for observability. */
  observabilityConfig?: ObservabilityInstanceConfig;
  /** Output only. This is set for the read-write VM of the PRIMARY instance only. */
  writableNode?: Node;
  /** Optional. The configuration for Private Service Connect (PSC) for the instance. */
  pscInstanceConfig?: PscInstanceConfig;
  /** Labels as key value pairs */
  labels?: Record<string, string>;
  /** Output only. The public IP addresses for the Instance. This is available ONLY when enable_public_ip is set. This is the connection endpoint for an end-user application. */
  publicIpAddress?: string;
  /** User-settable and human-readable display name for the Instance. */
  displayName?: string;
  /** Database flags. Set at the instance level. They are copied from the primary instance on secondary instance creation. Flags that have restrictions default to the value at primary instance on read instances during creation. Read instances can set new flags or override existing flags that are relevant for reads, for example, for enabling columnar cache on a read instance. Flags set on read instance might or might not be present on the primary instance. This is a list of "key": "value" pairs. "key": The name of the flag. These flags are passed at instance setup time, so include both server options and system variables for Postgres. Flags are specified with underscores, not hyphens. "value": The value of the flag. Booleans are set to **on** for true and **off** for false. This field must be omitted if the flag doesn't take a value. */
  databaseFlags?: Record<string, string>;
  /** For Resource freshness validation (https://google.aip.dev/154) */
  etag?: string;
  /** Output only. All outbound public IP addresses configured for the instance. */
  outboundPublicIpAddresses?: Array<string>;
  /** Optional. Controls whether the Data API is enabled for this instance. When enabled, this allows authorized users to connect to the instance from the public internet using the `executeSql` API, even for private IP instances. If this is not specified, the data API is enabled by default for Google internal services like AlloyDB Studio. Disable it explicitly to disallow Google internal services as well. */
  dataApiAccess?:
    | "DEFAULT_DATA_API_ENABLED_FOR_GOOGLE_CLOUD_SERVICES"
    | "DISABLED"
    | "ENABLED"
    | (string & {});
  /** Optional. Instance-level network configuration. */
  networkConfig?: InstanceNetworkConfig;
  /** Configuration for query insights. */
  queryInsightsConfig?: QueryInsightsInstanceConfig;
  /** Update policy that will be applied during instance update. This field is not persisted when you update the instance. To use a non-default update policy, you must specify explicitly specify the value in each update request. */
  updatePolicy?: UpdatePolicy;
  /** Output only. Reconciling (https://google.aip.dev/128#reconciliation). Set to true if the current state of Instance does not match the user's intended state, and the service is actively updating the resource to reconcile them. This can happen due to user-triggered updates or system actions like failover or maintenance. */
  reconciling?: boolean;
  /** Output only. Maintenance version of the instance, for example: POSTGRES_15.2025_07_15.04_00. Output only. Update this field via the parent cluster's maintenance_version field(s). */
  maintenanceVersionName?: string;
  /** Read pool instance configuration. This is required if the value of instanceType is READ_POOL. */
  readPoolConfig?: ReadPoolConfig;
  /** Output only. Delete time stamp */
  deleteTime?: string;
  /** Availability type of an Instance. If empty, defaults to REGIONAL for primary instances. For read pools, availability_type is always UNSPECIFIED. Instances in the read pools are evenly distributed across available zones within the region (i.e. read pools with more than one node will have a node in at least two zones). */
  availabilityType?:
    | "AVAILABILITY_TYPE_UNSPECIFIED"
    | "ZONAL"
    | "REGIONAL"
    | (string & {});
  /** Optional. Deprecated and unused. This field will be removed in the near future. */
  geminiConfig?: GeminiInstanceConfig;
  /** Optional. The configuration for Managed Connection Pool (MCP). */
  connectionPoolConfig?: ConnectionPoolConfig;
  /** Output only. The system-generated UID of the resource. The UID is assigned when the resource is created, and it is retained until it is deleted. */
  uid?: string;
  /** Configurations for the machines that host the underlying database engine. */
  machineConfig?: MachineConfig;
  /** Output only. The IP address for the Instance. This is the connection endpoint for an end-user application. */
  ipAddress?: string;
  /** Output only. Configuration parameters related to Gemini Cloud Assist. */
  gcaConfig?: GCAInstanceConfig;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Output only. Create time stamp */
  createTime?: string;
  /** Output only. List of available read-only VMs in this instance, including the standby for a PRIMARY instance. */
  nodes?: Array<Node>;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Required. The type of the instance. Specified at creation time. */
  instanceType?:
    | "INSTANCE_TYPE_UNSPECIFIED"
    | "PRIMARY"
    | "READ_POOL"
    | "SECONDARY"
    | (string & {});
  /** Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128 */
  annotations?: Record<string, string>;
  /** The Compute Engine zone that the instance should serve from, per https://cloud.google.com/compute/docs/regions-zones This can ONLY be specified for ZONAL instances. If present for a REGIONAL instance, an error will be thrown. If this is absent for a ZONAL instance, instance is created in a random zone with available capacity. */
  gceZone?: string;
  /** Optional. Client connection specific configurations */
  clientConnectionConfig?: ClientConnectionConfig;
  /** Output only. Update time stamp */
  updateTime?: string;
}

export const Instance: Schema.Schema<Instance> = Schema.suspend(() =>
  Schema.Struct({
    state: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    activationPolicy: Schema.optional(Schema.String),
    observabilityConfig: Schema.optional(ObservabilityInstanceConfig),
    writableNode: Schema.optional(Node),
    pscInstanceConfig: Schema.optional(PscInstanceConfig),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    publicIpAddress: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    databaseFlags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    outboundPublicIpAddresses: Schema.optional(Schema.Array(Schema.String)),
    dataApiAccess: Schema.optional(Schema.String),
    networkConfig: Schema.optional(InstanceNetworkConfig),
    queryInsightsConfig: Schema.optional(QueryInsightsInstanceConfig),
    updatePolicy: Schema.optional(UpdatePolicy),
    reconciling: Schema.optional(Schema.Boolean),
    maintenanceVersionName: Schema.optional(Schema.String),
    readPoolConfig: Schema.optional(ReadPoolConfig),
    deleteTime: Schema.optional(Schema.String),
    availabilityType: Schema.optional(Schema.String),
    geminiConfig: Schema.optional(GeminiInstanceConfig),
    connectionPoolConfig: Schema.optional(ConnectionPoolConfig),
    uid: Schema.optional(Schema.String),
    machineConfig: Schema.optional(MachineConfig),
    ipAddress: Schema.optional(Schema.String),
    gcaConfig: Schema.optional(GCAInstanceConfig),
    satisfiesPzi: Schema.optional(Schema.Boolean),
    createTime: Schema.optional(Schema.String),
    nodes: Schema.optional(Schema.Array(Node)),
    satisfiesPzs: Schema.optional(Schema.Boolean),
    instanceType: Schema.optional(Schema.String),
    annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    gceZone: Schema.optional(Schema.String),
    clientConnectionConfig: Schema.optional(ClientConnectionConfig),
    updateTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Instance" }) as any as Schema.Schema<Instance>;

export interface ListInstancesResponse {
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** The list of Instance */
  instances?: Array<Instance>;
}

export const ListInstancesResponse: Schema.Schema<ListInstancesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      instances: Schema.optional(Schema.Array(Instance)),
    }),
  ).annotate({
    identifier: "ListInstancesResponse",
  }) as any as Schema.Schema<ListInstancesResponse>;

export interface FailoverInstanceRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. */
  validateOnly?: boolean;
}

export const FailoverInstanceRequest: Schema.Schema<FailoverInstanceRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      requestId: Schema.optional(Schema.String),
      validateOnly: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "FailoverInstanceRequest",
  }) as any as Schema.Schema<FailoverInstanceRequest>;

export interface User {
  /** Optional. List of database roles this user has. The database role strings are subject to the PostgreSQL naming conventions. */
  databaseRoles?: Array<string>;
  /** Optional. Type of this user. */
  userType?:
    | "USER_TYPE_UNSPECIFIED"
    | "ALLOYDB_BUILT_IN"
    | "ALLOYDB_IAM_USER"
    | (string & {});
  /** Output only. Name of the resource in the form of projects/{project}/locations/{location}/cluster/{cluster}/users/{user}. */
  name?: string;
  /** Input only. Password for the user. */
  password?: string;
  /** Input only. If the user already exists and it has additional roles, keep them granted. */
  keepExtraRoles?: boolean;
}

export const User: Schema.Schema<User> = Schema.suspend(() =>
  Schema.Struct({
    databaseRoles: Schema.optional(Schema.Array(Schema.String)),
    userType: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    password: Schema.optional(Schema.String),
    keepExtraRoles: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface CsvImportOptions {
  /** Optional. Specifies the quoting character to be used when a data value is quoted. The default is double-quote. The value of this argument has to be a character in Hex ASCII Code. */
  quoteCharacter?: string;
  /** Required. The database table to import CSV file into. */
  table?: string;
  /** Optional. The columns to which CSV data is imported. If not specified, all columns of the database table are loaded with CSV data. */
  columns?: Array<string>;
  /** Optional. Specifies the character that should appear before a data character that needs to be escaped. The default is same as quote character. The value of this argument has to be a character in Hex ASCII Code. */
  escapeCharacter?: string;
  /** Optional. Specifies the character that separates columns within each row (line) of the file. The default is comma. The value of this argument has to be a character in Hex ASCII Code. */
  fieldDelimiter?: string;
}

export const CsvImportOptions: Schema.Schema<CsvImportOptions> = Schema.suspend(
  () =>
    Schema.Struct({
      quoteCharacter: Schema.optional(Schema.String),
      table: Schema.optional(Schema.String),
      columns: Schema.optional(Schema.Array(Schema.String)),
      escapeCharacter: Schema.optional(Schema.String),
      fieldDelimiter: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "CsvImportOptions",
}) as any as Schema.Schema<CsvImportOptions>;

export interface SqlImportOptions {}

export const SqlImportOptions: Schema.Schema<SqlImportOptions> = Schema.suspend(
  () => Schema.Struct({}),
).annotate({
  identifier: "SqlImportOptions",
}) as any as Schema.Schema<SqlImportOptions>;

export interface ImportClusterRequest {
  /** Optional. Name of the database to which the import will be done. For import from SQL file, this is required only if the file does not specify a database. Note - Value provided should be the same as expected from `SELECT current_database();` and NOT as a resource reference. */
  database?: string;
  /** Required. The path to the file in Google Cloud Storage where the source file for import will be stored. The URI is in the form `gs://bucketName/fileName`. */
  gcsUri?: string;
  /** Optional. Database user to be used for importing the data. Note - Value provided should be the same as expected from `SELECT current_user;` and NOT as a resource reference. */
  user?: string;
  /** Options for importing data in CSV format. */
  csvImportOptions?: CsvImportOptions;
  /** Options for importing data in SQL format. */
  sqlImportOptions?: SqlImportOptions;
}

export const ImportClusterRequest: Schema.Schema<ImportClusterRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      database: Schema.optional(Schema.String),
      gcsUri: Schema.optional(Schema.String),
      user: Schema.optional(Schema.String),
      csvImportOptions: Schema.optional(CsvImportOptions),
      sqlImportOptions: Schema.optional(SqlImportOptions),
    }),
  ).annotate({
    identifier: "ImportClusterRequest",
  }) as any as Schema.Schema<ImportClusterRequest>;

export interface StorageDatabasecenterPartnerapiV1mainDatabaseResourceId {
  /** Required. A service-local token that distinguishes this resource from other resources within the same service. */
  uniqueId?: string;
  /** Required. The type of resource this ID is identifying. Ex go/keep-sorted start alloydb.googleapis.com/Cluster, alloydb.googleapis.com/Instance, bigtableadmin.googleapis.com/Cluster, bigtableadmin.googleapis.com/Instance compute.googleapis.com/Instance firestore.googleapis.com/Database, redis.googleapis.com/Instance, redis.googleapis.com/Cluster, oracledatabase.googleapis.com/CloudExadataInfrastructure oracledatabase.googleapis.com/CloudVmCluster oracledatabase.googleapis.com/AutonomousDatabase spanner.googleapis.com/Instance, spanner.googleapis.com/Database, sqladmin.googleapis.com/Instance, go/keep-sorted end REQUIRED Please refer go/condor-common-datamodel */
  resourceType?: string;
  /** Required. Cloud provider name. Ex: GCP/AWS/Azure/OnPrem/SelfManaged */
  provider?:
    | "PROVIDER_UNSPECIFIED"
    | "GCP"
    | "AWS"
    | "AZURE"
    | "ONPREM"
    | "SELFMANAGED"
    | "PROVIDER_OTHER"
    | (string & {});
  /** Optional. Needs to be used only when the provider is PROVIDER_OTHER. */
  providerDescription?: string;
}

export const StorageDatabasecenterPartnerapiV1mainDatabaseResourceId: Schema.Schema<StorageDatabasecenterPartnerapiV1mainDatabaseResourceId> =
  Schema.suspend(() =>
    Schema.Struct({
      uniqueId: Schema.optional(Schema.String),
      resourceType: Schema.optional(Schema.String),
      provider: Schema.optional(Schema.String),
      providerDescription: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainDatabaseResourceId",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainDatabaseResourceId>;

export interface StorageDatabasecenterPartnerapiV1mainConfigBasedSignalData {
  /** Required. Signal type of the signal */
  signalType?:
    | "SIGNAL_TYPE_UNSPECIFIED"
    | "SIGNAL_TYPE_OUTDATED_MINOR_VERSION"
    | "SIGNAL_TYPE_DATABASE_AUDITING_DISABLED"
    | "SIGNAL_TYPE_NO_ROOT_PASSWORD"
    | "SIGNAL_TYPE_EXPOSED_TO_PUBLIC_ACCESS"
    | "SIGNAL_TYPE_UNENCRYPTED_CONNECTIONS"
    | "SIGNAL_TYPE_EXTENDED_SUPPORT"
    | "SIGNAL_TYPE_NO_AUTOMATED_BACKUP_POLICY"
    | "SIGNAL_TYPE_VERSION_NEARING_END_OF_LIFE"
    | "SIGNAL_TYPE_LAST_BACKUP_OLD"
    | "SIGNAL_TYPE_NOT_PROTECTED_BY_AUTOMATIC_FAILOVER"
    | (string & {});
  /** Database resource id. */
  resourceId?: StorageDatabasecenterPartnerapiV1mainDatabaseResourceId;
  /** Required. Full Resource name of the source resource. */
  fullResourceName?: string;
  /** Required. Last time signal was refreshed */
  lastRefreshTime?: string;
  /** Signal data for boolean signals. */
  signalBoolValue?: boolean;
}

export const StorageDatabasecenterPartnerapiV1mainConfigBasedSignalData: Schema.Schema<StorageDatabasecenterPartnerapiV1mainConfigBasedSignalData> =
  Schema.suspend(() =>
    Schema.Struct({
      signalType: Schema.optional(Schema.String),
      resourceId: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainDatabaseResourceId,
      ),
      fullResourceName: Schema.optional(Schema.String),
      lastRefreshTime: Schema.optional(Schema.String),
      signalBoolValue: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainConfigBasedSignalData",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainConfigBasedSignalData>;

export interface PscConfig {
  /** Output only. The project number that needs to be allowlisted on the network attachment to enable outbound connectivity. */
  serviceOwnedProjectNumber?: string;
  /** Optional. Create an instance that allows connections from Private Service Connect endpoints to the instance. */
  pscEnabled?: boolean;
}

export const PscConfig: Schema.Schema<PscConfig> = Schema.suspend(() =>
  Schema.Struct({
    serviceOwnedProjectNumber: Schema.optional(Schema.String),
    pscEnabled: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "PscConfig" }) as any as Schema.Schema<PscConfig>;

export interface StorageDatabasecenterPartnerapiV1mainResourceFlags {
  /** Optional. Value of the resource flag. */
  value?: string;
  /** Optional. Key of the resource flag. */
  key?: string;
}

export const StorageDatabasecenterPartnerapiV1mainResourceFlags: Schema.Schema<StorageDatabasecenterPartnerapiV1mainResourceFlags> =
  Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      key: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainResourceFlags",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainResourceFlags>;

export interface MaintenanceSchedule {
  /** Output only. The scheduled start time for the maintenance. */
  startTime?: string;
}

export const MaintenanceSchedule: Schema.Schema<MaintenanceSchedule> =
  Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MaintenanceSchedule",
  }) as any as Schema.Schema<MaintenanceSchedule>;

export interface StorageDatabasecenterPartnerapiV1mainRetentionSettings {
  /** Timestamp based retention period i.e. 2024-05-01T00:00:00Z */
  timestampBasedRetentionTime?: string;
  timeBasedRetention?: string;
  quantityBasedRetention?: number;
  /** Duration based retention period i.e. 172800 seconds (2 days) */
  durationBasedRetention?: string;
  /** The unit that 'retained_backups' represents. */
  retentionUnit?:
    | "RETENTION_UNIT_UNSPECIFIED"
    | "COUNT"
    | "TIME"
    | "DURATION"
    | "RETENTION_UNIT_OTHER"
    | (string & {});
}

export const StorageDatabasecenterPartnerapiV1mainRetentionSettings: Schema.Schema<StorageDatabasecenterPartnerapiV1mainRetentionSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      timestampBasedRetentionTime: Schema.optional(Schema.String),
      timeBasedRetention: Schema.optional(Schema.String),
      quantityBasedRetention: Schema.optional(Schema.Number),
      durationBasedRetention: Schema.optional(Schema.String),
      retentionUnit: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainRetentionSettings",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainRetentionSettings>;

export interface StorageDatabasecenterPartnerapiV1mainBackupConfiguration {
  /** Whether point-in-time recovery is enabled. This is optional field, if the database service does not have this feature or metadata is not available in control plane, this can be omitted. */
  pointInTimeRecoveryEnabled?: boolean;
  /** Backup retention settings. */
  backupRetentionSettings?: StorageDatabasecenterPartnerapiV1mainRetentionSettings;
  /** Whether customer visible automated backups are enabled on the instance. */
  automatedBackupEnabled?: boolean;
}

export const StorageDatabasecenterPartnerapiV1mainBackupConfiguration: Schema.Schema<StorageDatabasecenterPartnerapiV1mainBackupConfiguration> =
  Schema.suspend(() =>
    Schema.Struct({
      pointInTimeRecoveryEnabled: Schema.optional(Schema.Boolean),
      backupRetentionSettings: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainRetentionSettings,
      ),
      automatedBackupEnabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainBackupConfiguration",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainBackupConfiguration>;

export interface StorageDatabasecenterPartnerapiV1mainBackupDRConfiguration {
  /** Indicates if the resource is managed by BackupDR. */
  backupdrManaged?: boolean;
}

export const StorageDatabasecenterPartnerapiV1mainBackupDRConfiguration: Schema.Schema<StorageDatabasecenterPartnerapiV1mainBackupDRConfiguration> =
  Schema.suspend(() =>
    Schema.Struct({
      backupdrManaged: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainBackupDRConfiguration",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainBackupDRConfiguration>;

export interface StorageDatabasecenterPartnerapiV1mainResourceMaintenanceSchedule {
  /** Optional. Preferred day of the week for maintenance, e.g. MONDAY, TUESDAY, etc. */
  day?:
    | "DAY_OF_WEEK_UNSPECIFIED"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
    | (string & {});
  /** Optional. Phase of the maintenance window. This is to capture order of maintenance. For example, for Cloud SQL resources, this can be used to capture if the maintenance window is in Week1, Week2, Week5, etc. Non production resources are usually part of early phase. For more details, refer to Cloud SQL resources - https://cloud.google.com/sql/docs/mysql/maintenance */
  phase?:
    | "PHASE_UNSPECIFIED"
    | "ANY"
    | "WEEK1"
    | "WEEK2"
    | "WEEK5"
    | (string & {});
  /** Optional. Preferred time to start the maintenance operation on the specified day. */
  time?: GoogleTypeTimeOfDay;
}

export const StorageDatabasecenterPartnerapiV1mainResourceMaintenanceSchedule: Schema.Schema<StorageDatabasecenterPartnerapiV1mainResourceMaintenanceSchedule> =
  Schema.suspend(() =>
    Schema.Struct({
      day: Schema.optional(Schema.String),
      phase: Schema.optional(Schema.String),
      time: Schema.optional(GoogleTypeTimeOfDay),
    }),
  ).annotate({
    identifier:
      "StorageDatabasecenterPartnerapiV1mainResourceMaintenanceSchedule",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainResourceMaintenanceSchedule>;

export interface StringRestrictions {
  /** The list of allowed values, if bounded. This field will be empty if there is a unbounded number of allowed values. */
  allowedValues?: Array<string>;
}

export const StringRestrictions: Schema.Schema<StringRestrictions> =
  Schema.suspend(() =>
    Schema.Struct({
      allowedValues: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "StringRestrictions",
  }) as any as Schema.Schema<StringRestrictions>;

export interface IntegerRestrictions {
  /** The maximum value that can be specified, if applicable. */
  maxValue?: string;
  /** The minimum value that can be specified, if applicable. */
  minValue?: string;
}

export const IntegerRestrictions: Schema.Schema<IntegerRestrictions> =
  Schema.suspend(() =>
    Schema.Struct({
      maxValue: Schema.optional(Schema.String),
      minValue: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "IntegerRestrictions",
  }) as any as Schema.Schema<IntegerRestrictions>;

export interface SupportedDatabaseFlag {
  /** Whether setting or updating this flag on an Instance requires a database restart. If a flag that requires database restart is set, the backend will automatically restart the database (making sure to satisfy any availability SLO's). */
  requiresDbRestart?: boolean;
  valueType?:
    | "VALUE_TYPE_UNSPECIFIED"
    | "STRING"
    | "INTEGER"
    | "FLOAT"
    | "NONE"
    | (string & {});
  /** The scope of the flag. */
  scope?: "SCOPE_UNSPECIFIED" | "DATABASE" | "CONNECTION_POOL" | (string & {});
  /** Major database engine versions for which this flag is supported. */
  supportedDbVersions?: Array<
    | "DATABASE_VERSION_UNSPECIFIED"
    | "POSTGRES_13"
    | "POSTGRES_14"
    | "POSTGRES_15"
    | "POSTGRES_16"
    | "POSTGRES_17"
    | "POSTGRES_18"
    | (string & {})
  >;
  /** The name of the database flag, e.g. "max_allowed_packets". The is a possibly key for the Instance.database_flags map field. */
  flagName?: string;
  /** Restriction on STRING type value. */
  stringRestrictions?: StringRestrictions;
  /** The name of the flag resource, following Google Cloud conventions, e.g.: * projects/{project}/locations/{location}/flags/{flag} This field currently has no semantic meaning. */
  name?: string;
  /** Restriction on INTEGER type value. */
  integerRestrictions?: IntegerRestrictions;
  /** Whether the database flag accepts multiple values. If true, a comma-separated list of stringified values may be specified. */
  acceptsMultipleValues?: boolean;
  /** The recommended value for a STRING flag. */
  recommendedStringValue?: string;
  /** The recommended value for an INTEGER flag. */
  recommendedIntegerValue?: string;
}

export const SupportedDatabaseFlag: Schema.Schema<SupportedDatabaseFlag> =
  Schema.suspend(() =>
    Schema.Struct({
      requiresDbRestart: Schema.optional(Schema.Boolean),
      valueType: Schema.optional(Schema.String),
      scope: Schema.optional(Schema.String),
      supportedDbVersions: Schema.optional(Schema.Array(Schema.String)),
      flagName: Schema.optional(Schema.String),
      stringRestrictions: Schema.optional(StringRestrictions),
      name: Schema.optional(Schema.String),
      integerRestrictions: Schema.optional(IntegerRestrictions),
      acceptsMultipleValues: Schema.optional(Schema.Boolean),
      recommendedStringValue: Schema.optional(Schema.String),
      recommendedIntegerValue: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SupportedDatabaseFlag",
  }) as any as Schema.Schema<SupportedDatabaseFlag>;

export interface ListSupportedDatabaseFlagsResponse {
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** The list of SupportedDatabaseFlags. */
  supportedDatabaseFlags?: Array<SupportedDatabaseFlag>;
}

export const ListSupportedDatabaseFlagsResponse: Schema.Schema<ListSupportedDatabaseFlagsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      supportedDatabaseFlags: Schema.optional(
        Schema.Array(SupportedDatabaseFlag),
      ),
    }),
  ).annotate({
    identifier: "ListSupportedDatabaseFlagsResponse",
  }) as any as Schema.Schema<ListSupportedDatabaseFlagsResponse>;

export interface StorageDatabasecenterProtoCommonProduct {
  /** Type of specific database product. It could be CloudSQL, AlloyDB etc.. */
  type?:
    | "PRODUCT_TYPE_UNSPECIFIED"
    | "PRODUCT_TYPE_CLOUD_SQL"
    | "CLOUD_SQL"
    | "PRODUCT_TYPE_ALLOYDB"
    | "ALLOYDB"
    | "PRODUCT_TYPE_SPANNER"
    | "PRODUCT_TYPE_ON_PREM"
    | "ON_PREM"
    | "PRODUCT_TYPE_MEMORYSTORE"
    | "PRODUCT_TYPE_BIGTABLE"
    | "PRODUCT_TYPE_FIRESTORE"
    | "PRODUCT_TYPE_COMPUTE_ENGINE"
    | "PRODUCT_TYPE_ORACLE_ON_GCP"
    | "PRODUCT_TYPE_BIGQUERY"
    | "PRODUCT_TYPE_OTHER"
    | (string & {});
  /** Version of the underlying database engine. Example values: For MySQL, it could be "8.0", "5.7" etc.. For Postgres, it could be "14", "15" etc.. */
  version?: string;
  /** Minor version of the underlying database engine. Example values: For MySQL, it could be "8.0.32", "5.7.32" etc.. For Postgres, it could be "14.3", "15.3" etc.. */
  minorVersion?: string;
  /** The specific engine that the underlying database is running. */
  engine?:
    | "ENGINE_UNSPECIFIED"
    | "ENGINE_MYSQL"
    | "MYSQL"
    | "ENGINE_POSTGRES"
    | "POSTGRES"
    | "ENGINE_SQL_SERVER"
    | "SQL_SERVER"
    | "ENGINE_NATIVE"
    | "NATIVE"
    | "ENGINE_CLOUD_SPANNER_WITH_POSTGRES_DIALECT"
    | "ENGINE_CLOUD_SPANNER_WITH_GOOGLESQL_DIALECT"
    | "ENGINE_MEMORYSTORE_FOR_REDIS"
    | "ENGINE_MEMORYSTORE_FOR_REDIS_CLUSTER"
    | "ENGINE_OTHER"
    | "ENGINE_FIRESTORE_WITH_NATIVE_MODE"
    | "ENGINE_FIRESTORE_WITH_DATASTORE_MODE"
    | "ENGINE_FIRESTORE_WITH_MONGODB_COMPATIBILITY_MODE"
    | "ENGINE_EXADATA_ORACLE"
    | "ENGINE_ADB_SERVERLESS_ORACLE"
    | (string & {});
}

export const StorageDatabasecenterProtoCommonProduct: Schema.Schema<StorageDatabasecenterProtoCommonProduct> =
  Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      minorVersion: Schema.optional(Schema.String),
      engine: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterProtoCommonProduct",
  }) as any as Schema.Schema<StorageDatabasecenterProtoCommonProduct>;

export interface StorageDatabasecenterPartnerapiV1mainInternalResourceMetadata {
  resourceId?: StorageDatabasecenterPartnerapiV1mainDatabaseResourceId;
  /** Whether deletion protection is enabled for this internal resource. */
  isDeletionProtectionEnabled?: boolean;
  /** Required. internal resource name for spanner this will be database name e.g."spanner.googleapis.com/projects/123/abc/instances/inst1/databases/db1" */
  resourceName?: string;
  /** Information about the last backup attempt for this database */
  backupRun?: StorageDatabasecenterPartnerapiV1mainBackupRun;
  product?: StorageDatabasecenterProtoCommonProduct;
  /** Backup configuration for this database */
  backupConfiguration?: StorageDatabasecenterPartnerapiV1mainBackupConfiguration;
}

export const StorageDatabasecenterPartnerapiV1mainInternalResourceMetadata: Schema.Schema<StorageDatabasecenterPartnerapiV1mainInternalResourceMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      resourceId: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainDatabaseResourceId,
      ),
      isDeletionProtectionEnabled: Schema.optional(Schema.Boolean),
      resourceName: Schema.optional(Schema.String),
      backupRun: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainBackupRun,
      ),
      product: Schema.optional(StorageDatabasecenterProtoCommonProduct),
      backupConfiguration: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainBackupConfiguration,
      ),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainInternalResourceMetadata",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainInternalResourceMetadata>;

export interface MigrationSource {
  /** Output only. Place holder for the external source identifier(e.g DMS job name) that created the cluster. */
  referenceId?: string;
  /** Output only. The host and port of the on-premises instance in host:port format */
  hostPort?: string;
  /** Output only. Type of migration source. */
  sourceType?: "MIGRATION_SOURCE_TYPE_UNSPECIFIED" | "DMS" | (string & {});
}

export const MigrationSource: Schema.Schema<MigrationSource> = Schema.suspend(
  () =>
    Schema.Struct({
      referenceId: Schema.optional(Schema.String),
      hostPort: Schema.optional(Schema.String),
      sourceType: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "MigrationSource",
}) as any as Schema.Schema<MigrationSource>;

export interface GeminiClusterConfig {
  /** Output only. Deprecated and unused. This field will be removed in the near future. */
  entitled?: boolean;
}

export const GeminiClusterConfig: Schema.Schema<GeminiClusterConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      entitled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GeminiClusterConfig",
  }) as any as Schema.Schema<GeminiClusterConfig>;

export interface WeeklySchedule {
  /** The days of the week to perform a backup. If this field is left empty, the default of every day of the week is used. */
  daysOfWeek?: Array<
    | "DAY_OF_WEEK_UNSPECIFIED"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
    | (string & {})
  >;
  /** The times during the day to start a backup. The start times are assumed to be in UTC and to be an exact hour (e.g., 04:00:00). If no start times are provided, a single fixed start time is chosen arbitrarily. */
  startTimes?: Array<GoogleTypeTimeOfDay>;
}

export const WeeklySchedule: Schema.Schema<WeeklySchedule> = Schema.suspend(
  () =>
    Schema.Struct({
      daysOfWeek: Schema.optional(Schema.Array(Schema.String)),
      startTimes: Schema.optional(Schema.Array(GoogleTypeTimeOfDay)),
    }),
).annotate({
  identifier: "WeeklySchedule",
}) as any as Schema.Schema<WeeklySchedule>;

export interface TimeBasedRetention {
  /** The retention period. */
  retentionPeriod?: string;
}

export const TimeBasedRetention: Schema.Schema<TimeBasedRetention> =
  Schema.suspend(() =>
    Schema.Struct({
      retentionPeriod: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TimeBasedRetention",
  }) as any as Schema.Schema<TimeBasedRetention>;

export interface QuantityBasedRetention {
  /** The number of backups to retain. */
  count?: number;
}

export const QuantityBasedRetention: Schema.Schema<QuantityBasedRetention> =
  Schema.suspend(() =>
    Schema.Struct({
      count: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "QuantityBasedRetention",
  }) as any as Schema.Schema<QuantityBasedRetention>;

export interface AutomatedBackupPolicy {
  /** The length of the time window during which a backup can be taken. If a backup does not succeed within this time window, it will be canceled and considered failed. The backup window must be at least 5 minutes long. There is no upper bound on the window. If not set, it defaults to 1 hour. */
  backupWindow?: string;
  /** The location where the backup will be stored. Currently, the only supported option is to store the backup in the same region as the cluster. If empty, defaults to the region of the cluster. */
  location?: string;
  /** Weekly schedule for the Backup. */
  weeklySchedule?: WeeklySchedule;
  /** Whether automated automated backups are enabled. If not set, defaults to true. */
  enabled?: boolean;
  /** Time-based Backup retention policy. */
  timeBasedRetention?: TimeBasedRetention;
  /** Quantity-based Backup retention policy to retain recent backups. */
  quantityBasedRetention?: QuantityBasedRetention;
  /** Optional. The encryption config can be specified to encrypt the backups with a customer-managed encryption key (CMEK). When this field is not specified, the backup will use the cluster's encryption config. */
  encryptionConfig?: EncryptionConfig;
  /** Labels to apply to backups created using this configuration. */
  labels?: Record<string, string>;
}

export const AutomatedBackupPolicy: Schema.Schema<AutomatedBackupPolicy> =
  Schema.suspend(() =>
    Schema.Struct({
      backupWindow: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
      weeklySchedule: Schema.optional(WeeklySchedule),
      enabled: Schema.optional(Schema.Boolean),
      timeBasedRetention: Schema.optional(TimeBasedRetention),
      quantityBasedRetention: Schema.optional(QuantityBasedRetention),
      encryptionConfig: Schema.optional(EncryptionConfig),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "AutomatedBackupPolicy",
  }) as any as Schema.Schema<AutomatedBackupPolicy>;

export interface DataplexConfig {
  /** Dataplex is enabled by default for resources such as clusters and instances. This flag controls the integration of AlloyDB PG resources (like databases, schemas, and tables) with Dataplex." */
  enabled?: boolean;
}

export const DataplexConfig: Schema.Schema<DataplexConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "DataplexConfig",
}) as any as Schema.Schema<DataplexConfig>;

export interface NetworkConfig {
  /** Optional. The resource link for the VPC network in which cluster resources are created and from which they are accessible via Private IP. The network must belong to the same project as the cluster. It is specified in the form: `projects/{project_number}/global/networks/{network_id}`. This is required to create a cluster. */
  network?: string;
  /** Optional. Name of the allocated IP range for the private IP AlloyDB cluster, for example: "google-managed-services-default". If set, the instance IPs for this cluster will be created in the allocated range. The range name must comply with RFC 1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. Field name is intended to be consistent with Cloud SQL. */
  allocatedIpRange?: string;
}

export const NetworkConfig: Schema.Schema<NetworkConfig> = Schema.suspend(() =>
  Schema.Struct({
    network: Schema.optional(Schema.String),
    allocatedIpRange: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "NetworkConfig",
}) as any as Schema.Schema<NetworkConfig>;

export interface PrimaryConfig {
  /** Output only. Names of the clusters that are replicating from this cluster. */
  secondaryClusterNames?: Array<string>;
}

export const PrimaryConfig: Schema.Schema<PrimaryConfig> = Schema.suspend(() =>
  Schema.Struct({
    secondaryClusterNames: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({
  identifier: "PrimaryConfig",
}) as any as Schema.Schema<PrimaryConfig>;

export interface BackupSource {
  /** Required. The name of the backup resource with the format: * projects/{project}/locations/{region}/backups/{backup_id} */
  backupName?: string;
  /** Output only. The system-generated UID of the backup which was used to create this resource. The UID is generated when the backup is created, and it is retained until the backup is deleted. */
  backupUid?: string;
}

export const BackupSource: Schema.Schema<BackupSource> = Schema.suspend(() =>
  Schema.Struct({
    backupName: Schema.optional(Schema.String),
    backupUid: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "BackupSource",
}) as any as Schema.Schema<BackupSource>;

export interface BackupDrBackupSource {
  /** Required. The name of the backup resource with the format: * projects/{project}/locations/{location}/backupVaults/{backupvault_id}/dataSources/{datasource_id}/backups/{backup_id} */
  backup?: string;
}

export const BackupDrBackupSource: Schema.Schema<BackupDrBackupSource> =
  Schema.suspend(() =>
    Schema.Struct({
      backup: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BackupDrBackupSource",
  }) as any as Schema.Schema<BackupDrBackupSource>;

export interface CloudSQLBackupRunSource {
  /** Required. The CloudSQL backup run ID. */
  backupRunId?: string;
  /** The project ID of the source CloudSQL instance. This should be the same as the AlloyDB cluster's project. */
  project?: string;
  /** Required. The CloudSQL instance ID. */
  instanceId?: string;
}

export const CloudSQLBackupRunSource: Schema.Schema<CloudSQLBackupRunSource> =
  Schema.suspend(() =>
    Schema.Struct({
      backupRunId: Schema.optional(Schema.String),
      project: Schema.optional(Schema.String),
      instanceId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CloudSQLBackupRunSource",
  }) as any as Schema.Schema<CloudSQLBackupRunSource>;

export interface ContinuousBackupInfo {
  /** Output only. The encryption information for the WALs and backups required for ContinuousBackup. */
  encryptionInfo?: EncryptionInfo;
  /** Output only. Days of the week on which a continuous backup is taken. */
  schedule?: Array<
    | "DAY_OF_WEEK_UNSPECIFIED"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
    | (string & {})
  >;
  /** Output only. When ContinuousBackup was most recently enabled. Set to null if ContinuousBackup is not enabled. */
  enabledTime?: string;
  /** Output only. The earliest restorable time that can be restored to. If continuous backups and recovery was recently enabled, the earliest restorable time is the creation time of the earliest eligible backup within this cluster's continuous backup recovery window. After a cluster has had continuous backups enabled for the duration of its recovery window, the earliest restorable time becomes "now minus the recovery window". For example, assuming a point in time recovery is attempted at 04/16/2025 3:23:00PM with a 14d recovery window, the earliest restorable time would be 04/02/2025 3:23:00PM. This field is only visible if the CLUSTER_VIEW_CONTINUOUS_BACKUP cluster view is provided. */
  earliestRestorableTime?: string;
}

export const ContinuousBackupInfo: Schema.Schema<ContinuousBackupInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      encryptionInfo: Schema.optional(EncryptionInfo),
      schedule: Schema.optional(Schema.Array(Schema.String)),
      enabledTime: Schema.optional(Schema.String),
      earliestRestorableTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContinuousBackupInfo",
  }) as any as Schema.Schema<ContinuousBackupInfo>;

export interface Cluster {
  /** SSL configuration for this AlloyDB cluster. */
  sslConfig?: SslConfig;
  /** Optional. The configuration for Private Service Connect (PSC) for the cluster. */
  pscConfig?: PscConfig;
  /** Labels as key value pairs */
  labels?: Record<string, string>;
  /** Output only. The current serving state of the cluster. */
  state?:
    | "STATE_UNSPECIFIED"
    | "READY"
    | "STOPPED"
    | "EMPTY"
    | "CREATING"
    | "DELETING"
    | "FAILED"
    | "BOOTSTRAPPING"
    | "MAINTENANCE"
    | "PROMOTING"
    | "SWITCHOVER"
    | (string & {});
  /** The automated backup policy for this cluster. If no policy is provided then the default policy will be used. If backups are supported for the cluster, the default policy takes one backup a day, has a backup window of 1 hour, and retains backups for 14 days. For more information on the defaults, consult the documentation for the message type. */
  automatedBackupPolicy?: AutomatedBackupPolicy;
  /** Optional. Configuration for Dataplex integration. */
  dataplexConfig?: DataplexConfig;
  /** Output only. The encryption information for the cluster. */
  encryptionInfo?: EncryptionInfo;
  /** Output only. Delete time stamp */
  deleteTime?: string;
  /** Optional. The encryption config can be specified to encrypt the data disks and other persistent data resources of a cluster with a customer-managed encryption key (CMEK). When this field is not specified, the cluster will then use default encryption scheme to protect the user data. */
  encryptionConfig?: EncryptionConfig;
  /** Output only. The type of the cluster. This is an output-only field and it's populated at the Cluster creation time or the Cluster promotion time. The cluster type is determined by which RPC was used to create the cluster (i.e. `CreateCluster` vs. `CreateSecondaryCluster` */
  clusterType?:
    | "CLUSTER_TYPE_UNSPECIFIED"
    | "PRIMARY"
    | "SECONDARY"
    | (string & {});
  /** Cross Region replication config specific to SECONDARY cluster. */
  secondaryConfig?: SecondaryConfig;
  /** Output only. The name of the cluster resource with the format: * projects/{project}/locations/{region}/clusters/{cluster_id} where the cluster ID segment should satisfy the regex expression `[a-z0-9-]+`. For more details see https://google.aip.dev/122. The prefix of the cluster resource name is the name of the parent resource: * projects/{project}/locations/{region} */
  name?: string;
  /** Output only. Cluster created via DMS migration. */
  migrationSource?: MigrationSource;
  networkConfig?: NetworkConfig;
  /** Output only. Cross Region replication config specific to PRIMARY cluster. */
  primaryConfig?: PrimaryConfig;
  /** For Resource freshness validation (https://google.aip.dev/154) */
  etag?: string;
  /** Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: ``` "123/environment": "production", "123/costCenter": "marketing" ``` */
  tags?: Record<string, string>;
  /** Input only. Initial user to setup during cluster creation. Required. If used in `RestoreCluster` this is ignored. */
  initialUser?: UserPassword;
  /** Optional. Deprecated and unused. This field will be removed in the near future. */
  geminiConfig?: GeminiClusterConfig;
  /** Output only. AlloyDB per-cluster service account. This service account is created per-cluster per-project, and is different from the per-project service account. The per-cluster service account naming format is subject to change. */
  serviceAccountEmail?: string;
  /** Output only. Cluster created from backup. */
  backupSource?: BackupSource;
  /** Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128 */
  annotations?: Record<string, string>;
  /** Optional. The database engine major version. This is an optional field and it is populated at the Cluster creation time. If a database version is not supplied at cluster creation time, then a default database version will be used. */
  databaseVersion?:
    | "DATABASE_VERSION_UNSPECIFIED"
    | "POSTGRES_13"
    | "POSTGRES_14"
    | "POSTGRES_15"
    | "POSTGRES_16"
    | "POSTGRES_17"
    | "POSTGRES_18"
    | (string & {});
  /** Required. The resource link for the VPC network in which cluster resources are created and from which they are accessible via Private IP. The network must belong to the same project as the cluster. It is specified in the form: `projects/{project}/global/networks/{network_id}`. This is required to create a cluster. Deprecated, use network_config.network instead. */
  network?: string;
  /** Output only. Cluster created from a BackupDR backup. */
  backupdrBackupSource?: BackupDrBackupSource;
  /** Optional. Continuous backup configuration for this cluster. */
  continuousBackupConfig?: ContinuousBackupConfig;
  /** Output only. Output only information about BackupDR protection for this cluster. */
  backupdrInfo?: BackupDrInfo;
  /** Optional. Subscription type of the cluster. */
  subscriptionType?:
    | "SUBSCRIPTION_TYPE_UNSPECIFIED"
    | "STANDARD"
    | "TRIAL"
    | (string & {});
  /** Output only. Metadata for free trial clusters */
  trialMetadata?: TrialMetadata;
  /** User-settable and human-readable display name for the Cluster. */
  displayName?: string;
  /** Output only. Update time stamp */
  updateTime?: string;
  /** Output only. The system-generated UID of the resource. The UID is assigned when the resource is created, and it is retained until it is deleted. */
  uid?: string;
  /** Output only. Reconciling (https://google.aip.dev/128#reconciliation). Set to true if the current state of Cluster does not match the user's intended state, and the service is actively updating the resource to reconcile them. This can happen due to user-triggered updates or system actions like failover or maintenance. */
  reconciling?: boolean;
  /** Optional. The maintenance update policy determines when to allow or deny updates. */
  maintenanceUpdatePolicy?: MaintenanceUpdatePolicy;
  /** Output only. Cluster created from CloudSQL snapshot. */
  cloudsqlBackupRunSource?: CloudSQLBackupRunSource;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Output only. The maintenance schedule for the cluster, generated for a specific rollout if a maintenance window is set. */
  maintenanceSchedule?: MaintenanceSchedule;
  /** Output only. Continuous backup properties for this cluster. */
  continuousBackupInfo?: ContinuousBackupInfo;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Input only. Policy to use to automatically select the maintenance version to which to update the cluster's instances. */
  maintenanceVersionSelectionPolicy?:
    | "MAINTENANCE_VERSION_SELECTION_POLICY_UNSPECIFIED"
    | "MAINTENANCE_VERSION_SELECTION_POLICY_LATEST"
    | "MAINTENANCE_VERSION_SELECTION_POLICY_DEFAULT"
    | (string & {});
  /** Output only. Create time stamp */
  createTime?: string;
}

export const Cluster: Schema.Schema<Cluster> = Schema.suspend(() =>
  Schema.Struct({
    sslConfig: Schema.optional(SslConfig),
    pscConfig: Schema.optional(PscConfig),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    state: Schema.optional(Schema.String),
    automatedBackupPolicy: Schema.optional(AutomatedBackupPolicy),
    dataplexConfig: Schema.optional(DataplexConfig),
    encryptionInfo: Schema.optional(EncryptionInfo),
    deleteTime: Schema.optional(Schema.String),
    encryptionConfig: Schema.optional(EncryptionConfig),
    clusterType: Schema.optional(Schema.String),
    secondaryConfig: Schema.optional(SecondaryConfig),
    name: Schema.optional(Schema.String),
    migrationSource: Schema.optional(MigrationSource),
    networkConfig: Schema.optional(NetworkConfig),
    primaryConfig: Schema.optional(PrimaryConfig),
    etag: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    initialUser: Schema.optional(UserPassword),
    geminiConfig: Schema.optional(GeminiClusterConfig),
    serviceAccountEmail: Schema.optional(Schema.String),
    backupSource: Schema.optional(BackupSource),
    annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    databaseVersion: Schema.optional(Schema.String),
    network: Schema.optional(Schema.String),
    backupdrBackupSource: Schema.optional(BackupDrBackupSource),
    continuousBackupConfig: Schema.optional(ContinuousBackupConfig),
    backupdrInfo: Schema.optional(BackupDrInfo),
    subscriptionType: Schema.optional(Schema.String),
    trialMetadata: Schema.optional(TrialMetadata),
    displayName: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    uid: Schema.optional(Schema.String),
    reconciling: Schema.optional(Schema.Boolean),
    maintenanceUpdatePolicy: Schema.optional(MaintenanceUpdatePolicy),
    cloudsqlBackupRunSource: Schema.optional(CloudSQLBackupRunSource),
    satisfiesPzi: Schema.optional(Schema.Boolean),
    maintenanceSchedule: Schema.optional(MaintenanceSchedule),
    continuousBackupInfo: Schema.optional(ContinuousBackupInfo),
    satisfiesPzs: Schema.optional(Schema.Boolean),
    maintenanceVersionSelectionPolicy: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Cluster" }) as any as Schema.Schema<Cluster>;

export interface ListClustersResponse {
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** The list of Cluster */
  clusters?: Array<Cluster>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListClustersResponse: Schema.Schema<ListClustersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      clusters: Schema.optional(Schema.Array(Cluster)),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListClustersResponse",
  }) as any as Schema.Schema<ListClustersResponse>;

export interface StorageDatabasecenterPartnerapiV1mainSignalMetadata {
  /** Signal data for boolean signals. */
  signalBoolValue?: boolean;
  /** Signal data for backup runs. */
  backupRun?: StorageDatabasecenterPartnerapiV1mainBackupRun;
}

export const StorageDatabasecenterPartnerapiV1mainSignalMetadata: Schema.Schema<StorageDatabasecenterPartnerapiV1mainSignalMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      signalBoolValue: Schema.optional(Schema.Boolean),
      backupRun: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainBackupRun,
      ),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainSignalMetadata",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainSignalMetadata>;

export interface StorageDatabasecenterPartnerapiV1mainDatabaseResourceSignalData {
  /** Required. Signal type of the signal */
  signalType?:
    | "SIGNAL_TYPE_UNSPECIFIED"
    | "SIGNAL_TYPE_OUTDATED_MINOR_VERSION"
    | "SIGNAL_TYPE_DATABASE_AUDITING_DISABLED"
    | "SIGNAL_TYPE_NO_ROOT_PASSWORD"
    | "SIGNAL_TYPE_EXPOSED_TO_PUBLIC_ACCESS"
    | "SIGNAL_TYPE_UNENCRYPTED_CONNECTIONS"
    | "SIGNAL_TYPE_EXTENDED_SUPPORT"
    | "SIGNAL_TYPE_NO_AUTOMATED_BACKUP_POLICY"
    | "SIGNAL_TYPE_VERSION_NEARING_END_OF_LIFE"
    | "SIGNAL_TYPE_LAST_BACKUP_OLD"
    | "SIGNAL_TYPE_NOT_PROTECTED_BY_AUTOMATIC_FAILOVER"
    | (string & {});
  /** Required. Full Resource name of the source resource. */
  fullResourceName?: string;
  /** This will support array of OneOf signal metadata information for a given signal type. */
  signalMetadataList?: Array<StorageDatabasecenterPartnerapiV1mainSignalMetadata>;
  /** Required. Output only. Signal state of the signal */
  signalState?:
    | "SIGNAL_STATE_UNSPECIFIED"
    | "ACTIVE"
    | "INACTIVE"
    | "DISMISSED"
    | (string & {});
  /** Deprecated: Use signal_metadata_list instead. */
  backupRun?: StorageDatabasecenterPartnerapiV1mainBackupRun;
  /** Database resource id. */
  resourceId?: StorageDatabasecenterPartnerapiV1mainDatabaseResourceId;
  /** Required. Last time signal was refreshed */
  lastRefreshTime?: string;
  /** Deprecated: Use signal_metadata_list instead. */
  signalBoolValue?: boolean;
}

export const StorageDatabasecenterPartnerapiV1mainDatabaseResourceSignalData: Schema.Schema<StorageDatabasecenterPartnerapiV1mainDatabaseResourceSignalData> =
  Schema.suspend(() =>
    Schema.Struct({
      signalType: Schema.optional(Schema.String),
      fullResourceName: Schema.optional(Schema.String),
      signalMetadataList: Schema.optional(
        Schema.Array(StorageDatabasecenterPartnerapiV1mainSignalMetadata),
      ),
      signalState: Schema.optional(Schema.String),
      backupRun: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainBackupRun,
      ),
      resourceId: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainDatabaseResourceId,
      ),
      lastRefreshTime: Schema.optional(Schema.String),
      signalBoolValue: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "StorageDatabasecenterPartnerapiV1mainDatabaseResourceSignalData",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainDatabaseResourceSignalData>;

export interface StorageDatabasecenterPartnerapiV1mainEntitlement {
  /** An enum that represents the type of this entitlement. */
  type?:
    | "ENTITLEMENT_TYPE_UNSPECIFIED"
    | "GEMINI"
    | "NATIVE"
    | "GCA_STANDARD"
    | (string & {});
  /** The current state of user's accessibility to a feature/benefit. */
  entitlementState?:
    | "ENTITLEMENT_STATE_UNSPECIFIED"
    | "ENTITLED"
    | "REVOKED"
    | (string & {});
}

export const StorageDatabasecenterPartnerapiV1mainEntitlement: Schema.Schema<StorageDatabasecenterPartnerapiV1mainEntitlement> =
  Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      entitlementState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainEntitlement",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainEntitlement>;

export interface ListUsersResponse {
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** The list of User */
  users?: Array<User>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListUsersResponse: Schema.Schema<ListUsersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      users: Schema.optional(Schema.Array(User)),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListUsersResponse",
  }) as any as Schema.Schema<ListUsersResponse>;

export interface SwitchoverClusterRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. */
  validateOnly?: boolean;
}

export const SwitchoverClusterRequest: Schema.Schema<SwitchoverClusterRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      requestId: Schema.optional(Schema.String),
      validateOnly: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "SwitchoverClusterRequest",
  }) as any as Schema.Schema<SwitchoverClusterRequest>;

export interface UpgradeClusterRequest {
  /** Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. */
  validateOnly?: boolean;
  /** Optional. The current etag of the Cluster. If an etag is provided and does not match the current etag of the Cluster, upgrade will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The version the cluster is going to be upgraded to. */
  version?:
    | "DATABASE_VERSION_UNSPECIFIED"
    | "POSTGRES_13"
    | "POSTGRES_14"
    | "POSTGRES_15"
    | "POSTGRES_16"
    | "POSTGRES_17"
    | "POSTGRES_18"
    | (string & {});
}

export const UpgradeClusterRequest: Schema.Schema<UpgradeClusterRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      validateOnly: Schema.optional(Schema.Boolean),
      etag: Schema.optional(Schema.String),
      requestId: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpgradeClusterRequest",
  }) as any as Schema.Schema<UpgradeClusterRequest>;

export interface StorageDatabasecenterProtoCommonTypedValue {
  /** For integer value */
  int64Value?: string;
  /** For string value */
  stringValue?: string;
  /** For double value */
  doubleValue?: number;
  /** For boolean value */
  boolValue?: boolean;
}

export const StorageDatabasecenterProtoCommonTypedValue: Schema.Schema<StorageDatabasecenterProtoCommonTypedValue> =
  Schema.suspend(() =>
    Schema.Struct({
      int64Value: Schema.optional(Schema.String),
      stringValue: Schema.optional(Schema.String),
      doubleValue: Schema.optional(Schema.Number),
      boolValue: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterProtoCommonTypedValue",
  }) as any as Schema.Schema<StorageDatabasecenterProtoCommonTypedValue>;

export interface StorageDatabasecenterPartnerapiV1mainObservabilityMetricData {
  /** Required. Database resource name associated with the signal. Resource name to follow CAIS resource_name format as noted here go/condor-common-datamodel */
  resourceName?: string;
  /** Required. Value of the metric type. */
  value?: StorageDatabasecenterProtoCommonTypedValue;
  /** Required. Type of metric like CPU, Memory, etc. */
  metricType?:
    | "METRIC_TYPE_UNSPECIFIED"
    | "CPU_UTILIZATION"
    | "MEMORY_UTILIZATION"
    | "NETWORK_CONNECTIONS"
    | "STORAGE_UTILIZATION"
    | "STORAGE_USED_BYTES"
    | "NODE_COUNT"
    | "MEMORY_USED_BYTES"
    | "PROCESSING_UNIT_COUNT"
    | (string & {});
  /** Required. Type of aggregation performed on the metric. */
  aggregationType?:
    | "AGGREGATION_TYPE_UNSPECIFIED"
    | "PEAK"
    | "P99"
    | "P95"
    | "CURRENT"
    | (string & {});
  /** Required. The time the metric value was observed. */
  observationTime?: string;
}

export const StorageDatabasecenterPartnerapiV1mainObservabilityMetricData: Schema.Schema<StorageDatabasecenterPartnerapiV1mainObservabilityMetricData> =
  Schema.suspend(() =>
    Schema.Struct({
      resourceName: Schema.optional(Schema.String),
      value: Schema.optional(StorageDatabasecenterProtoCommonTypedValue),
      metricType: Schema.optional(Schema.String),
      aggregationType: Schema.optional(Schema.String),
      observationTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainObservabilityMetricData",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainObservabilityMetricData>;

export interface StorageDatabasecenterPartnerapiV1mainCustomMetadataData {
  /** Metadata for individual internal resources in an instance. e.g. spanner instance can have multiple databases with unique configuration. */
  internalResourceMetadata?: Array<StorageDatabasecenterPartnerapiV1mainInternalResourceMetadata>;
}

export const StorageDatabasecenterPartnerapiV1mainCustomMetadataData: Schema.Schema<StorageDatabasecenterPartnerapiV1mainCustomMetadataData> =
  Schema.suspend(() =>
    Schema.Struct({
      internalResourceMetadata: Schema.optional(
        Schema.Array(
          StorageDatabasecenterPartnerapiV1mainInternalResourceMetadata,
        ),
      ),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainCustomMetadataData",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainCustomMetadataData>;

export interface StorageDatabasecenterPartnerapiV1mainDatabaseResourceRecommendationSignalData {
  /** Optional. Any other additional metadata specific to recommendation */
  additionalMetadata?: Record<string, unknown>;
  /** Required. Type of signal, for example, `SIGNAL_TYPE_IDLE`, `SIGNAL_TYPE_HIGH_NUMBER_OF_TABLES`, etc. */
  signalType?:
    | "SIGNAL_TYPE_UNSPECIFIED"
    | "SIGNAL_TYPE_NOT_PROTECTED_BY_AUTOMATIC_FAILOVER"
    | "SIGNAL_TYPE_GROUP_NOT_REPLICATING_ACROSS_REGIONS"
    | "SIGNAL_TYPE_NOT_AVAILABLE_IN_MULTIPLE_ZONES"
    | "SIGNAL_TYPE_NOT_AVAILABLE_IN_MULTIPLE_REGIONS"
    | "SIGNAL_TYPE_NO_PROMOTABLE_REPLICA"
    | "SIGNAL_TYPE_NO_AUTOMATED_BACKUP_POLICY"
    | "SIGNAL_TYPE_SHORT_BACKUP_RETENTION"
    | "SIGNAL_TYPE_LAST_BACKUP_FAILED"
    | "SIGNAL_TYPE_LAST_BACKUP_OLD"
    | "SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_2_0"
    | "SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_3"
    | "SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_2"
    | "SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_1"
    | "SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_0"
    | "SIGNAL_TYPE_VIOLATES_CIS_CONTROLS_V8_0"
    | "SIGNAL_TYPE_VIOLATES_NIST_800_53"
    | "SIGNAL_TYPE_VIOLATES_NIST_800_53_R5"
    | "SIGNAL_TYPE_VIOLATES_NIST_CYBERSECURITY_FRAMEWORK_V1_0"
    | "SIGNAL_TYPE_VIOLATES_ISO_27001"
    | "SIGNAL_TYPE_VIOLATES_ISO_27001_V2022"
    | "SIGNAL_TYPE_VIOLATES_PCI_DSS_V3_2_1"
    | "SIGNAL_TYPE_VIOLATES_PCI_DSS_V4_0"
    | "SIGNAL_TYPE_VIOLATES_CLOUD_CONTROLS_MATRIX_V4"
    | "SIGNAL_TYPE_VIOLATES_HIPAA"
    | "SIGNAL_TYPE_VIOLATES_SOC2_V2017"
    | "SIGNAL_TYPE_LOGS_NOT_OPTIMIZED_FOR_TROUBLESHOOTING"
    | "SIGNAL_TYPE_QUERY_DURATIONS_NOT_LOGGED"
    | "SIGNAL_TYPE_VERBOSE_ERROR_LOGGING"
    | "SIGNAL_TYPE_QUERY_LOCK_WAITS_NOT_LOGGED"
    | "SIGNAL_TYPE_LOGGING_MOST_ERRORS"
    | "SIGNAL_TYPE_LOGGING_ONLY_CRITICAL_ERRORS"
    | "SIGNAL_TYPE_MINIMAL_ERROR_LOGGING"
    | "SIGNAL_TYPE_QUERY_STATISTICS_LOGGED"
    | "SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_CLIENT_HOSTNAME"
    | "SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_PARSER_STATISTICS"
    | "SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_PLANNER_STATISTICS"
    | "SIGNAL_TYPE_NOT_LOGGING_ONLY_DDL_STATEMENTS"
    | "SIGNAL_TYPE_LOGGING_QUERY_STATISTICS"
    | "SIGNAL_TYPE_NOT_LOGGING_TEMPORARY_FILES"
    | "SIGNAL_TYPE_CONNECTION_MAX_NOT_CONFIGURED"
    | "SIGNAL_TYPE_USER_OPTIONS_CONFIGURED"
    | "SIGNAL_TYPE_EXPOSED_TO_PUBLIC_ACCESS"
    | "SIGNAL_TYPE_UNENCRYPTED_CONNECTIONS"
    | "SIGNAL_TYPE_NO_ROOT_PASSWORD"
    | "SIGNAL_TYPE_WEAK_ROOT_PASSWORD"
    | "SIGNAL_TYPE_ENCRYPTION_KEY_NOT_CUSTOMER_MANAGED"
    | "SIGNAL_TYPE_SERVER_AUTHENTICATION_NOT_REQUIRED"
    | "SIGNAL_TYPE_EXPOSED_BY_OWNERSHIP_CHAINING"
    | "SIGNAL_TYPE_EXPOSED_TO_EXTERNAL_SCRIPTS"
    | "SIGNAL_TYPE_EXPOSED_TO_LOCAL_DATA_LOADS"
    | "SIGNAL_TYPE_CONNECTION_ATTEMPTS_NOT_LOGGED"
    | "SIGNAL_TYPE_DISCONNECTIONS_NOT_LOGGED"
    | "SIGNAL_TYPE_LOGGING_EXCESSIVE_STATEMENT_INFO"
    | "SIGNAL_TYPE_EXPOSED_TO_REMOTE_ACCESS"
    | "SIGNAL_TYPE_DATABASE_NAMES_EXPOSED"
    | "SIGNAL_TYPE_SENSITIVE_TRACE_INFO_NOT_MASKED"
    | "SIGNAL_TYPE_PUBLIC_IP_ENABLED"
    | "SIGNAL_TYPE_IDLE"
    | "SIGNAL_TYPE_OVERPROVISIONED"
    | "SIGNAL_TYPE_HIGH_NUMBER_OF_OPEN_TABLES"
    | "SIGNAL_TYPE_HIGH_NUMBER_OF_TABLES"
    | "SIGNAL_TYPE_HIGH_TRANSACTION_ID_UTILIZATION"
    | "SIGNAL_TYPE_UNDERPROVISIONED"
    | "SIGNAL_TYPE_OUT_OF_DISK"
    | "SIGNAL_TYPE_SERVER_CERTIFICATE_NEAR_EXPIRY"
    | "SIGNAL_TYPE_DATABASE_AUDITING_DISABLED"
    | "SIGNAL_TYPE_RESTRICT_AUTHORIZED_NETWORKS"
    | "SIGNAL_TYPE_VIOLATE_POLICY_RESTRICT_PUBLIC_IP"
    | "SIGNAL_TYPE_QUOTA_LIMIT"
    | "SIGNAL_TYPE_NO_PASSWORD_POLICY"
    | "SIGNAL_TYPE_CONNECTIONS_PERFORMANCE_IMPACT"
    | "SIGNAL_TYPE_TMP_TABLES_PERFORMANCE_IMPACT"
    | "SIGNAL_TYPE_TRANS_LOGS_PERFORMANCE_IMPACT"
    | "SIGNAL_TYPE_HIGH_JOINS_WITHOUT_INDEXES"
    | "SIGNAL_TYPE_SUPERUSER_WRITING_TO_USER_TABLES"
    | "SIGNAL_TYPE_USER_GRANTED_ALL_PERMISSIONS"
    | "SIGNAL_TYPE_DATA_EXPORT_TO_EXTERNAL_CLOUD_STORAGE_BUCKET"
    | "SIGNAL_TYPE_DATA_EXPORT_TO_PUBLIC_CLOUD_STORAGE_BUCKET"
    | "SIGNAL_TYPE_WEAK_PASSWORD_HASH_ALGORITHM"
    | "SIGNAL_TYPE_NO_USER_PASSWORD_POLICY"
    | "SIGNAL_TYPE_HOT_NODE"
    | "SIGNAL_TYPE_NO_POINT_IN_TIME_RECOVERY"
    | "SIGNAL_TYPE_RESOURCE_SUSPENDED"
    | "SIGNAL_TYPE_EXPENSIVE_COMMANDS"
    | "SIGNAL_TYPE_NO_MAINTENANCE_POLICY_CONFIGURED"
    | "SIGNAL_TYPE_NO_DELETION_PROTECTION"
    | "SIGNAL_TYPE_INEFFICIENT_QUERY"
    | "SIGNAL_TYPE_READ_INTENSIVE_WORKLOAD"
    | "SIGNAL_TYPE_MEMORY_LIMIT"
    | "SIGNAL_TYPE_MAX_SERVER_MEMORY"
    | "SIGNAL_TYPE_LARGE_ROWS"
    | "SIGNAL_TYPE_HIGH_WRITE_PRESSURE"
    | "SIGNAL_TYPE_HIGH_READ_PRESSURE"
    | "SIGNAL_TYPE_ENCRYPTION_ORG_POLICY_NOT_SATISFIED"
    | "SIGNAL_TYPE_LOCATION_ORG_POLICY_NOT_SATISFIED"
    | "SIGNAL_TYPE_OUTDATED_MINOR_VERSION"
    | "SIGNAL_TYPE_SCHEMA_NOT_OPTIMIZED"
    | "SIGNAL_TYPE_MANY_IDLE_CONNECTIONS"
    | "SIGNAL_TYPE_REPLICATION_LAG"
    | "SIGNAL_TYPE_OUTDATED_VERSION"
    | "SIGNAL_TYPE_OUTDATED_CLIENT"
    | "SIGNAL_TYPE_DATABOOST_DISABLED"
    | "SIGNAL_TYPE_RECOMMENDED_MAINTENANCE_POLICIES"
    | "SIGNAL_TYPE_EXTENDED_SUPPORT"
    | "SIGNAL_TYPE_PERFORMANCE_KPI_CHANGE"
    | "SIGNAL_TYPE_VERSION_NEARING_END_OF_LIFE"
    | (string & {});
  /** Required. ID of recommender. Examples: "google.cloudsql.instance.PerformanceRecommender" */
  recommenderId?: string;
  /** Required. Contains an identifier for a subtype of recommendations produced for the same recommender. Subtype is a function of content and impact, meaning a new subtype might be added when significant changes to `content` or `primary_impact.category` are introduced. See the Recommenders section to see a list of subtypes for a given Recommender. Examples: For recommender = "google.cloudsql.instance.PerformanceRecommender", recommender_subtype can be "MYSQL_HIGH_NUMBER_OF_OPEN_TABLES_BEST_PRACTICE"/"POSTGRES_HIGH_TRANSACTION_ID_UTILIZATION_BEST_PRACTICE" */
  recommenderSubtype?: string;
  /** Required. Name of recommendation. Examples: organizations/1234/locations/us-central1/recommenders/google.cloudsql.instance.PerformanceRecommender/recommendations/9876 */
  recommender?: string;
  /** Required. Database resource name associated with the signal. Resource name to follow CAIS resource_name format as noted here go/condor-common-datamodel */
  resourceName?: string;
  /** Required. Recommendation state */
  recommendationState?:
    | "UNSPECIFIED"
    | "ACTIVE"
    | "CLAIMED"
    | "SUCCEEDED"
    | "FAILED"
    | "DISMISSED"
    | (string & {});
  /** Required. last time recommendationw as refreshed */
  lastRefreshTime?: string;
}

export const StorageDatabasecenterPartnerapiV1mainDatabaseResourceRecommendationSignalData: Schema.Schema<StorageDatabasecenterPartnerapiV1mainDatabaseResourceRecommendationSignalData> =
  Schema.suspend(() =>
    Schema.Struct({
      additionalMetadata: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      signalType: Schema.optional(Schema.String),
      recommenderId: Schema.optional(Schema.String),
      recommenderSubtype: Schema.optional(Schema.String),
      recommender: Schema.optional(Schema.String),
      resourceName: Schema.optional(Schema.String),
      recommendationState: Schema.optional(Schema.String),
      lastRefreshTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "StorageDatabasecenterPartnerapiV1mainDatabaseResourceRecommendationSignalData",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainDatabaseResourceRecommendationSignalData>;

export interface CloudControl2SharedOperationsReconciliationOperationMetadata {
  /** Excluisive action returned by the CLH. */
  exclusiveAction?:
    | "UNKNOWN_REPAIR_ACTION"
    | "DELETE"
    | "RETRY"
    | (string & {});
  /** DEPRECATED. Use exclusive_action instead. */
  deleteResource?: boolean;
}

export const CloudControl2SharedOperationsReconciliationOperationMetadata: Schema.Schema<CloudControl2SharedOperationsReconciliationOperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      exclusiveAction: Schema.optional(Schema.String),
      deleteResource: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "CloudControl2SharedOperationsReconciliationOperationMetadata",
  }) as any as Schema.Schema<CloudControl2SharedOperationsReconciliationOperationMetadata>;

export interface GoogleCloudLocationListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<GoogleCloudLocationLocation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const GoogleCloudLocationListLocationsResponse: Schema.Schema<GoogleCloudLocationListLocationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(GoogleCloudLocationLocation)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudLocationListLocationsResponse",
  }) as any as Schema.Schema<GoogleCloudLocationListLocationsResponse>;

export interface StorageDatabasecenterPartnerapiV1mainUpcomingMaintenance {
  /** Optional. The end time of the upcoming maintenance. */
  endTime?: string;
  /** Optional. The start time of the upcoming maintenance. */
  startTime?: string;
}

export const StorageDatabasecenterPartnerapiV1mainUpcomingMaintenance: Schema.Schema<StorageDatabasecenterPartnerapiV1mainUpcomingMaintenance> =
  Schema.suspend(() =>
    Schema.Struct({
      endTime: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainUpcomingMaintenance",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainUpcomingMaintenance>;

export interface StorageDatabasecenterPartnerapiV1mainCompliance {
  /** Industry-wide compliance standards or benchmarks, such as CIS, PCI, and OWASP. */
  standard?: string;
  /** Version of the standard or benchmark, for example, 1.1 */
  version?: string;
}

export const StorageDatabasecenterPartnerapiV1mainCompliance: Schema.Schema<StorageDatabasecenterPartnerapiV1mainCompliance> =
  Schema.suspend(() =>
    Schema.Struct({
      standard: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainCompliance",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainCompliance>;

export interface StorageDatabasecenterPartnerapiV1mainDatabaseResourceHealthSignalData {
  /** Cloud provider name. Ex: GCP/AWS/Azure/OnPrem/SelfManaged */
  provider?:
    | "PROVIDER_UNSPECIFIED"
    | "GCP"
    | "AWS"
    | "AZURE"
    | "ONPREM"
    | "SELFMANAGED"
    | "PROVIDER_OTHER"
    | (string & {});
  /** Any other additional metadata */
  additionalMetadata?: Record<string, unknown>;
  /** Required. The name of the signal, ex: PUBLIC_SQL_INSTANCE, SQL_LOG_ERROR_VERBOSITY etc. */
  name?: string;
  /** Description associated with signal */
  description?: string;
  /** Industry standards associated with this signal; if this signal is an issue, that could be a violation of the associated industry standard(s). For example, AUTO_BACKUP_DISABLED signal is associated with CIS GCP 1.1, CIS GCP 1.2, CIS GCP 1.3, NIST 800-53 and ISO-27001 compliance standards. If a database resource does not have automated backup enable, it will violate these following industry standards. */
  compliance?: Array<StorageDatabasecenterPartnerapiV1mainCompliance>;
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "RESOLVED" | "MUTED" | (string & {});
  /** Required. Database resource name associated with the signal. Resource name to follow CAIS resource_name format as noted here go/condor-common-datamodel */
  resourceName?: string;
  /** Required. Unique identifier for the signal. This is an unique id which would be mainatined by partner to identify a signal. */
  signalId?: string;
  /** Required. The class of the signal, such as if it's a THREAT or VULNERABILITY. */
  signalClass?:
    | "CLASS_UNSPECIFIED"
    | "THREAT"
    | "VULNERABILITY"
    | "MISCONFIGURATION"
    | "OBSERVATION"
    | "ERROR"
    | (string & {});
  /** Required. The last time at which the event described by this signal took place */
  eventTime?: string;
  /** Required. Type of signal, for example, `AVAILABLE_IN_MULTIPLE_ZONES`, `LOGGING_MOST_ERRORS`, etc. */
  signalType?:
    | "SIGNAL_TYPE_UNSPECIFIED"
    | "SIGNAL_TYPE_NOT_PROTECTED_BY_AUTOMATIC_FAILOVER"
    | "SIGNAL_TYPE_GROUP_NOT_REPLICATING_ACROSS_REGIONS"
    | "SIGNAL_TYPE_NOT_AVAILABLE_IN_MULTIPLE_ZONES"
    | "SIGNAL_TYPE_NOT_AVAILABLE_IN_MULTIPLE_REGIONS"
    | "SIGNAL_TYPE_NO_PROMOTABLE_REPLICA"
    | "SIGNAL_TYPE_NO_AUTOMATED_BACKUP_POLICY"
    | "SIGNAL_TYPE_SHORT_BACKUP_RETENTION"
    | "SIGNAL_TYPE_LAST_BACKUP_FAILED"
    | "SIGNAL_TYPE_LAST_BACKUP_OLD"
    | "SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_2_0"
    | "SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_3"
    | "SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_2"
    | "SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_1"
    | "SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_0"
    | "SIGNAL_TYPE_VIOLATES_CIS_CONTROLS_V8_0"
    | "SIGNAL_TYPE_VIOLATES_NIST_800_53"
    | "SIGNAL_TYPE_VIOLATES_NIST_800_53_R5"
    | "SIGNAL_TYPE_VIOLATES_NIST_CYBERSECURITY_FRAMEWORK_V1_0"
    | "SIGNAL_TYPE_VIOLATES_ISO_27001"
    | "SIGNAL_TYPE_VIOLATES_ISO_27001_V2022"
    | "SIGNAL_TYPE_VIOLATES_PCI_DSS_V3_2_1"
    | "SIGNAL_TYPE_VIOLATES_PCI_DSS_V4_0"
    | "SIGNAL_TYPE_VIOLATES_CLOUD_CONTROLS_MATRIX_V4"
    | "SIGNAL_TYPE_VIOLATES_HIPAA"
    | "SIGNAL_TYPE_VIOLATES_SOC2_V2017"
    | "SIGNAL_TYPE_LOGS_NOT_OPTIMIZED_FOR_TROUBLESHOOTING"
    | "SIGNAL_TYPE_QUERY_DURATIONS_NOT_LOGGED"
    | "SIGNAL_TYPE_VERBOSE_ERROR_LOGGING"
    | "SIGNAL_TYPE_QUERY_LOCK_WAITS_NOT_LOGGED"
    | "SIGNAL_TYPE_LOGGING_MOST_ERRORS"
    | "SIGNAL_TYPE_LOGGING_ONLY_CRITICAL_ERRORS"
    | "SIGNAL_TYPE_MINIMAL_ERROR_LOGGING"
    | "SIGNAL_TYPE_QUERY_STATISTICS_LOGGED"
    | "SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_CLIENT_HOSTNAME"
    | "SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_PARSER_STATISTICS"
    | "SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_PLANNER_STATISTICS"
    | "SIGNAL_TYPE_NOT_LOGGING_ONLY_DDL_STATEMENTS"
    | "SIGNAL_TYPE_LOGGING_QUERY_STATISTICS"
    | "SIGNAL_TYPE_NOT_LOGGING_TEMPORARY_FILES"
    | "SIGNAL_TYPE_CONNECTION_MAX_NOT_CONFIGURED"
    | "SIGNAL_TYPE_USER_OPTIONS_CONFIGURED"
    | "SIGNAL_TYPE_EXPOSED_TO_PUBLIC_ACCESS"
    | "SIGNAL_TYPE_UNENCRYPTED_CONNECTIONS"
    | "SIGNAL_TYPE_NO_ROOT_PASSWORD"
    | "SIGNAL_TYPE_WEAK_ROOT_PASSWORD"
    | "SIGNAL_TYPE_ENCRYPTION_KEY_NOT_CUSTOMER_MANAGED"
    | "SIGNAL_TYPE_SERVER_AUTHENTICATION_NOT_REQUIRED"
    | "SIGNAL_TYPE_EXPOSED_BY_OWNERSHIP_CHAINING"
    | "SIGNAL_TYPE_EXPOSED_TO_EXTERNAL_SCRIPTS"
    | "SIGNAL_TYPE_EXPOSED_TO_LOCAL_DATA_LOADS"
    | "SIGNAL_TYPE_CONNECTION_ATTEMPTS_NOT_LOGGED"
    | "SIGNAL_TYPE_DISCONNECTIONS_NOT_LOGGED"
    | "SIGNAL_TYPE_LOGGING_EXCESSIVE_STATEMENT_INFO"
    | "SIGNAL_TYPE_EXPOSED_TO_REMOTE_ACCESS"
    | "SIGNAL_TYPE_DATABASE_NAMES_EXPOSED"
    | "SIGNAL_TYPE_SENSITIVE_TRACE_INFO_NOT_MASKED"
    | "SIGNAL_TYPE_PUBLIC_IP_ENABLED"
    | "SIGNAL_TYPE_IDLE"
    | "SIGNAL_TYPE_OVERPROVISIONED"
    | "SIGNAL_TYPE_HIGH_NUMBER_OF_OPEN_TABLES"
    | "SIGNAL_TYPE_HIGH_NUMBER_OF_TABLES"
    | "SIGNAL_TYPE_HIGH_TRANSACTION_ID_UTILIZATION"
    | "SIGNAL_TYPE_UNDERPROVISIONED"
    | "SIGNAL_TYPE_OUT_OF_DISK"
    | "SIGNAL_TYPE_SERVER_CERTIFICATE_NEAR_EXPIRY"
    | "SIGNAL_TYPE_DATABASE_AUDITING_DISABLED"
    | "SIGNAL_TYPE_RESTRICT_AUTHORIZED_NETWORKS"
    | "SIGNAL_TYPE_VIOLATE_POLICY_RESTRICT_PUBLIC_IP"
    | "SIGNAL_TYPE_QUOTA_LIMIT"
    | "SIGNAL_TYPE_NO_PASSWORD_POLICY"
    | "SIGNAL_TYPE_CONNECTIONS_PERFORMANCE_IMPACT"
    | "SIGNAL_TYPE_TMP_TABLES_PERFORMANCE_IMPACT"
    | "SIGNAL_TYPE_TRANS_LOGS_PERFORMANCE_IMPACT"
    | "SIGNAL_TYPE_HIGH_JOINS_WITHOUT_INDEXES"
    | "SIGNAL_TYPE_SUPERUSER_WRITING_TO_USER_TABLES"
    | "SIGNAL_TYPE_USER_GRANTED_ALL_PERMISSIONS"
    | "SIGNAL_TYPE_DATA_EXPORT_TO_EXTERNAL_CLOUD_STORAGE_BUCKET"
    | "SIGNAL_TYPE_DATA_EXPORT_TO_PUBLIC_CLOUD_STORAGE_BUCKET"
    | "SIGNAL_TYPE_WEAK_PASSWORD_HASH_ALGORITHM"
    | "SIGNAL_TYPE_NO_USER_PASSWORD_POLICY"
    | "SIGNAL_TYPE_HOT_NODE"
    | "SIGNAL_TYPE_NO_POINT_IN_TIME_RECOVERY"
    | "SIGNAL_TYPE_RESOURCE_SUSPENDED"
    | "SIGNAL_TYPE_EXPENSIVE_COMMANDS"
    | "SIGNAL_TYPE_NO_MAINTENANCE_POLICY_CONFIGURED"
    | "SIGNAL_TYPE_NO_DELETION_PROTECTION"
    | "SIGNAL_TYPE_INEFFICIENT_QUERY"
    | "SIGNAL_TYPE_READ_INTENSIVE_WORKLOAD"
    | "SIGNAL_TYPE_MEMORY_LIMIT"
    | "SIGNAL_TYPE_MAX_SERVER_MEMORY"
    | "SIGNAL_TYPE_LARGE_ROWS"
    | "SIGNAL_TYPE_HIGH_WRITE_PRESSURE"
    | "SIGNAL_TYPE_HIGH_READ_PRESSURE"
    | "SIGNAL_TYPE_ENCRYPTION_ORG_POLICY_NOT_SATISFIED"
    | "SIGNAL_TYPE_LOCATION_ORG_POLICY_NOT_SATISFIED"
    | "SIGNAL_TYPE_OUTDATED_MINOR_VERSION"
    | "SIGNAL_TYPE_SCHEMA_NOT_OPTIMIZED"
    | "SIGNAL_TYPE_MANY_IDLE_CONNECTIONS"
    | "SIGNAL_TYPE_REPLICATION_LAG"
    | "SIGNAL_TYPE_OUTDATED_VERSION"
    | "SIGNAL_TYPE_OUTDATED_CLIENT"
    | "SIGNAL_TYPE_DATABOOST_DISABLED"
    | "SIGNAL_TYPE_RECOMMENDED_MAINTENANCE_POLICIES"
    | "SIGNAL_TYPE_EXTENDED_SUPPORT"
    | "SIGNAL_TYPE_PERFORMANCE_KPI_CHANGE"
    | "SIGNAL_TYPE_VERSION_NEARING_END_OF_LIFE"
    | (string & {});
  /** Closest parent container of this resource. In GCP, 'container' refers to a Cloud Resource Manager project. It must be resource name of a Cloud Resource Manager project with the format of "provider//", such as "projects/123". For GCP provided resources, number should be project number. */
  resourceContainer?: string;
  /** The external-uri of the signal, using which more information about this signal can be obtained. In GCP, this will take user to SCC page to get more details about signals. */
  externalUri?: string;
  /** The severity of the signal, such as if it's a HIGH or LOW severity. */
  signalSeverity?:
    | "SIGNAL_SEVERITY_UNSPECIFIED"
    | "CRITICAL"
    | "HIGH"
    | "MEDIUM"
    | "LOW"
    | (string & {});
  /** This is used to identify the location of the resource. Example: "us-central1" */
  location?: string;
}

export const StorageDatabasecenterPartnerapiV1mainDatabaseResourceHealthSignalData: Schema.Schema<StorageDatabasecenterPartnerapiV1mainDatabaseResourceHealthSignalData> =
  Schema.suspend(() =>
    Schema.Struct({
      provider: Schema.optional(Schema.String),
      additionalMetadata: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      compliance: Schema.optional(
        Schema.Array(StorageDatabasecenterPartnerapiV1mainCompliance),
      ),
      state: Schema.optional(Schema.String),
      resourceName: Schema.optional(Schema.String),
      signalId: Schema.optional(Schema.String),
      signalClass: Schema.optional(Schema.String),
      eventTime: Schema.optional(Schema.String),
      signalType: Schema.optional(Schema.String),
      resourceContainer: Schema.optional(Schema.String),
      externalUri: Schema.optional(Schema.String),
      signalSeverity: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "StorageDatabasecenterPartnerapiV1mainDatabaseResourceHealthSignalData",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainDatabaseResourceHealthSignalData>;

export interface Stats {
  /** Number of read pool instances which failed to upgrade. */
  failed?: number;
  /** Number of read pool instances successfully upgraded. */
  success?: number;
  /** Number of read pool instances undergoing upgrade. */
  ongoing?: number;
  /** Number of read pool instances for which upgrade has not started. */
  notStarted?: number;
}

export const Stats: Schema.Schema<Stats> = Schema.suspend(() =>
  Schema.Struct({
    failed: Schema.optional(Schema.Number),
    success: Schema.optional(Schema.Number),
    ongoing: Schema.optional(Schema.Number),
    notStarted: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "Stats" }) as any as Schema.Schema<Stats>;

export interface ReadPoolInstancesUpgradeStageStatus {
  /** Read pool instances upgrade statistics. */
  upgradeStats?: Stats;
}

export const ReadPoolInstancesUpgradeStageStatus: Schema.Schema<ReadPoolInstancesUpgradeStageStatus> =
  Schema.suspend(() =>
    Schema.Struct({
      upgradeStats: Schema.optional(Stats),
    }),
  ).annotate({
    identifier: "ReadPoolInstancesUpgradeStageStatus",
  }) as any as Schema.Schema<ReadPoolInstancesUpgradeStageStatus>;

export interface StageStatus {
  /** Read pool instances upgrade metadata. */
  readPoolInstancesUpgrade?: ReadPoolInstancesUpgradeStageStatus;
  /** Upgrade stage. */
  stage?:
    | "STAGE_UNSPECIFIED"
    | "ALLOYDB_PRECHECK"
    | "PG_UPGRADE_CHECK"
    | "PREPARE_FOR_UPGRADE"
    | "PRIMARY_INSTANCE_UPGRADE"
    | "READ_POOL_INSTANCES_UPGRADE"
    | "ROLLBACK"
    | "CLEANUP"
    | (string & {});
  /** State of this stage. */
  state?:
    | "STATUS_UNSPECIFIED"
    | "NOT_STARTED"
    | "IN_PROGRESS"
    | "SUCCESS"
    | "FAILED"
    | "PARTIAL_SUCCESS"
    | "CANCEL_IN_PROGRESS"
    | "CANCELLED"
    | (string & {});
}

export const StageStatus: Schema.Schema<StageStatus> = Schema.suspend(() =>
  Schema.Struct({
    readPoolInstancesUpgrade: Schema.optional(
      ReadPoolInstancesUpgradeStageStatus,
    ),
    stage: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "StageStatus" }) as any as Schema.Schema<StageStatus>;

export interface UpgradeClusterStatus {
  /** Whether the operation is cancellable. */
  cancellable?: boolean;
  /** Cluster Major Version Upgrade state. */
  state?:
    | "STATUS_UNSPECIFIED"
    | "NOT_STARTED"
    | "IN_PROGRESS"
    | "SUCCESS"
    | "FAILED"
    | "PARTIAL_SUCCESS"
    | "CANCEL_IN_PROGRESS"
    | "CANCELLED"
    | (string & {});
  /** Source database major version. */
  sourceVersion?:
    | "DATABASE_VERSION_UNSPECIFIED"
    | "POSTGRES_13"
    | "POSTGRES_14"
    | "POSTGRES_15"
    | "POSTGRES_16"
    | "POSTGRES_17"
    | "POSTGRES_18"
    | (string & {});
  /** Status of all upgrade stages. */
  stages?: Array<StageStatus>;
  /** Target database major version. */
  targetVersion?:
    | "DATABASE_VERSION_UNSPECIFIED"
    | "POSTGRES_13"
    | "POSTGRES_14"
    | "POSTGRES_15"
    | "POSTGRES_16"
    | "POSTGRES_17"
    | "POSTGRES_18"
    | (string & {});
}

export const UpgradeClusterStatus: Schema.Schema<UpgradeClusterStatus> =
  Schema.suspend(() =>
    Schema.Struct({
      cancellable: Schema.optional(Schema.Boolean),
      state: Schema.optional(Schema.String),
      sourceVersion: Schema.optional(Schema.String),
      stages: Schema.optional(Schema.Array(StageStatus)),
      targetVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpgradeClusterStatus",
  }) as any as Schema.Schema<UpgradeClusterStatus>;

export interface InstanceUpgradeDetails {
  /** Normalized name of the instance. */
  name?: string;
  /** Instance type. */
  instanceType?:
    | "INSTANCE_TYPE_UNSPECIFIED"
    | "PRIMARY"
    | "READ_POOL"
    | "SECONDARY"
    | (string & {});
  /** Upgrade status of the instance. */
  upgradeStatus?:
    | "STATUS_UNSPECIFIED"
    | "NOT_STARTED"
    | "IN_PROGRESS"
    | "SUCCESS"
    | "FAILED"
    | "PARTIAL_SUCCESS"
    | "CANCEL_IN_PROGRESS"
    | "CANCELLED"
    | (string & {});
}

export const InstanceUpgradeDetails: Schema.Schema<InstanceUpgradeDetails> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      instanceType: Schema.optional(Schema.String),
      upgradeStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InstanceUpgradeDetails",
  }) as any as Schema.Schema<InstanceUpgradeDetails>;

export interface ClusterUpgradeDetails {
  /** Upgrade status of the cluster. */
  upgradeStatus?:
    | "STATUS_UNSPECIFIED"
    | "NOT_STARTED"
    | "IN_PROGRESS"
    | "SUCCESS"
    | "FAILED"
    | "PARTIAL_SUCCESS"
    | "CANCEL_IN_PROGRESS"
    | "CANCELLED"
    | (string & {});
  /** Database version of the cluster after the upgrade operation. This will be the target version if the upgrade was successful otherwise it remains the same as that before the upgrade operation. */
  databaseVersion?:
    | "DATABASE_VERSION_UNSPECIFIED"
    | "POSTGRES_13"
    | "POSTGRES_14"
    | "POSTGRES_15"
    | "POSTGRES_16"
    | "POSTGRES_17"
    | "POSTGRES_18"
    | (string & {});
  /** Upgrade details of the instances directly associated with this cluster. */
  instanceUpgradeDetails?: Array<InstanceUpgradeDetails>;
  /** Array containing stage info associated with this cluster. */
  stageInfo?: Array<StageInfo>;
  /** Cluster type which can either be primary or secondary. */
  clusterType?:
    | "CLUSTER_TYPE_UNSPECIFIED"
    | "PRIMARY"
    | "SECONDARY"
    | (string & {});
  /** Normalized name of the cluster */
  name?: string;
}

export const ClusterUpgradeDetails: Schema.Schema<ClusterUpgradeDetails> =
  Schema.suspend(() =>
    Schema.Struct({
      upgradeStatus: Schema.optional(Schema.String),
      databaseVersion: Schema.optional(Schema.String),
      instanceUpgradeDetails: Schema.optional(
        Schema.Array(InstanceUpgradeDetails),
      ),
      stageInfo: Schema.optional(Schema.Array(StageInfo)),
      clusterType: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ClusterUpgradeDetails",
  }) as any as Schema.Schema<ClusterUpgradeDetails>;

export interface UpgradeClusterResponse {
  /** A user friendly message summarising the upgrade operation details and the next steps for the user if there is any. */
  message?: string;
  /** Array of upgrade details for the current cluster and all the secondary clusters associated with this cluster. */
  clusterUpgradeDetails?: Array<ClusterUpgradeDetails>;
  /** Status of upgrade operation. */
  status?:
    | "STATUS_UNSPECIFIED"
    | "NOT_STARTED"
    | "IN_PROGRESS"
    | "SUCCESS"
    | "FAILED"
    | "PARTIAL_SUCCESS"
    | "CANCEL_IN_PROGRESS"
    | "CANCELLED"
    | (string & {});
}

export const UpgradeClusterResponse: Schema.Schema<UpgradeClusterResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
      clusterUpgradeDetails: Schema.optional(
        Schema.Array(ClusterUpgradeDetails),
      ),
      status: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpgradeClusterResponse",
  }) as any as Schema.Schema<UpgradeClusterResponse>;

export interface StorageDatabasecenterPartnerapiV1mainBackupDRMetadata {
  /** Backup configuration for this instance. */
  backupConfiguration?: StorageDatabasecenterPartnerapiV1mainBackupConfiguration;
  /** Latest backup run information for this instance. */
  backupRun?: StorageDatabasecenterPartnerapiV1mainBackupRun;
  /** Required. Last time backup configuration was refreshed. */
  lastRefreshTime?: string;
  /** BackupDR configuration for this instance. */
  backupdrConfiguration?: StorageDatabasecenterPartnerapiV1mainBackupDRConfiguration;
  /** Required. Full resource name of this instance. */
  fullResourceName?: string;
  /** Required. Database resource id. */
  resourceId?: StorageDatabasecenterPartnerapiV1mainDatabaseResourceId;
}

export const StorageDatabasecenterPartnerapiV1mainBackupDRMetadata: Schema.Schema<StorageDatabasecenterPartnerapiV1mainBackupDRMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      backupConfiguration: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainBackupConfiguration,
      ),
      backupRun: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainBackupRun,
      ),
      lastRefreshTime: Schema.optional(Schema.String),
      backupdrConfiguration: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainBackupDRConfiguration,
      ),
      fullResourceName: Schema.optional(Schema.String),
      resourceId: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainDatabaseResourceId,
      ),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainBackupDRMetadata",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainBackupDRMetadata>;

export interface StorageDatabasecenterPartnerapiV1mainTags {
  /** The Tag key/value mappings. */
  tags?: Record<string, string>;
}

export const StorageDatabasecenterPartnerapiV1mainTags: Schema.Schema<StorageDatabasecenterPartnerapiV1mainTags> =
  Schema.suspend(() =>
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainTags",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainTags>;

export interface StorageDatabasecenterPartnerapiV1mainAvailabilityConfiguration {
  /** Availability type. Potential values: * `ZONAL`: The instance serves data from only one zone. Outages in that zone affect data accessibility. * `REGIONAL`: The instance can serve data from more than one zone in a region (it is highly available). */
  availabilityType?:
    | "AVAILABILITY_TYPE_UNSPECIFIED"
    | "ZONAL"
    | "REGIONAL"
    | "MULTI_REGIONAL"
    | "AVAILABILITY_TYPE_OTHER"
    | (string & {});
  promotableReplicaConfigured?: boolean;
  externalReplicaConfigured?: boolean;
  /** Checks for existence of (multi-cluster) routing configuration that allows automatic failover to a different zone/region in case of an outage. Applicable to Bigtable resources. */
  automaticFailoverRoutingConfigured?: boolean;
  /** Checks for resources that are configured to have redundancy, and ongoing replication across regions */
  crossRegionReplicaConfigured?: boolean;
}

export const StorageDatabasecenterPartnerapiV1mainAvailabilityConfiguration: Schema.Schema<StorageDatabasecenterPartnerapiV1mainAvailabilityConfiguration> =
  Schema.suspend(() =>
    Schema.Struct({
      availabilityType: Schema.optional(Schema.String),
      promotableReplicaConfigured: Schema.optional(Schema.Boolean),
      externalReplicaConfigured: Schema.optional(Schema.Boolean),
      automaticFailoverRoutingConfigured: Schema.optional(Schema.Boolean),
      crossRegionReplicaConfigured: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "StorageDatabasecenterPartnerapiV1mainAvailabilityConfiguration",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainAvailabilityConfiguration>;

export interface StorageDatabasecenterPartnerapiV1mainGCBDRConfiguration {
  /** Whether the resource is managed by GCBDR. */
  gcbdrManaged?: boolean;
}

export const StorageDatabasecenterPartnerapiV1mainGCBDRConfiguration: Schema.Schema<StorageDatabasecenterPartnerapiV1mainGCBDRConfiguration> =
  Schema.suspend(() =>
    Schema.Struct({
      gcbdrManaged: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainGCBDRConfiguration",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainGCBDRConfiguration>;

export interface StorageDatabasecenterPartnerapiV1mainResourceMaintenanceDenySchedule {
  /** Optional. Deny period end date. */
  endDate?: GoogleTypeDate;
  /** Optional. Time in UTC when the deny period starts on start_date and ends on end_date. */
  time?: GoogleTypeTimeOfDay;
  /** Optional. The start date of the deny maintenance period. */
  startDate?: GoogleTypeDate;
}

export const StorageDatabasecenterPartnerapiV1mainResourceMaintenanceDenySchedule: Schema.Schema<StorageDatabasecenterPartnerapiV1mainResourceMaintenanceDenySchedule> =
  Schema.suspend(() =>
    Schema.Struct({
      endDate: Schema.optional(GoogleTypeDate),
      time: Schema.optional(GoogleTypeTimeOfDay),
      startDate: Schema.optional(GoogleTypeDate),
    }),
  ).annotate({
    identifier:
      "StorageDatabasecenterPartnerapiV1mainResourceMaintenanceDenySchedule",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainResourceMaintenanceDenySchedule>;

export interface StorageDatabasecenterPartnerapiV1mainResourceMaintenanceInfo {
  /** Optional. Current Maintenance version of the database resource. Example: "MYSQL_8_0_41.R20250531.01_15" */
  maintenanceVersion?: string;
  /** Optional. Upcoming maintenance for the database resource. This field is populated once SLM generates and publishes upcoming maintenance window. */
  upcomingMaintenance?: StorageDatabasecenterPartnerapiV1mainUpcomingMaintenance;
  /** Optional. The date when the current maintenance version was released. */
  currentVersionReleaseDate?: GoogleTypeDate;
  /** Output only. Current state of maintenance on the database resource. */
  maintenanceState?:
    | "MAINTENANCE_STATE_UNSPECIFIED"
    | "CREATING"
    | "READY"
    | "UPDATING"
    | "REPAIRING"
    | "DELETING"
    | "ERROR"
    | (string & {});
  /** Optional. Maintenance window for the database resource. */
  maintenanceSchedule?: StorageDatabasecenterPartnerapiV1mainResourceMaintenanceSchedule;
  /** Optional. Whether the instance is in stopped state. This information is temporarily being captured in maintenanceInfo, till STOPPED state is supported by DB Center. */
  isInstanceStopped?: boolean;
  /** Optional. List of Deny maintenance period for the database resource. */
  denyMaintenanceSchedules?: Array<StorageDatabasecenterPartnerapiV1mainResourceMaintenanceDenySchedule>;
}

export const StorageDatabasecenterPartnerapiV1mainResourceMaintenanceInfo: Schema.Schema<StorageDatabasecenterPartnerapiV1mainResourceMaintenanceInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      maintenanceVersion: Schema.optional(Schema.String),
      upcomingMaintenance: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainUpcomingMaintenance,
      ),
      currentVersionReleaseDate: Schema.optional(GoogleTypeDate),
      maintenanceState: Schema.optional(Schema.String),
      maintenanceSchedule: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainResourceMaintenanceSchedule,
      ),
      isInstanceStopped: Schema.optional(Schema.Boolean),
      denyMaintenanceSchedules: Schema.optional(
        Schema.Array(
          StorageDatabasecenterPartnerapiV1mainResourceMaintenanceDenySchedule,
        ),
      ),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainResourceMaintenanceInfo",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainResourceMaintenanceInfo>;

export interface StorageDatabasecenterPartnerapiV1mainDatabaseResourceMetadata {
  /** The resource location. REQUIRED */
  location?: string;
  /** The creation time of the resource, i.e. the time when resource is created and recorded in partner service. */
  creationTime?: string;
  /** Current state of the instance. */
  currentState?:
    | "STATE_UNSPECIFIED"
    | "HEALTHY"
    | "UNHEALTHY"
    | "SUSPENDED"
    | "DELETED"
    | "STATE_OTHER"
    | "STOPPED"
    | (string & {});
  /** Optional. Edition represents whether the instance is ENTERPRISE or ENTERPRISE_PLUS. This information is core to Cloud SQL only and is used to identify the edition of the instance. */
  edition?:
    | "EDITION_UNSPECIFIED"
    | "EDITION_ENTERPRISE"
    | "EDITION_ENTERPRISE_PLUS"
    | "EDITION_STANDARD"
    | (string & {});
  /** Primary resource location. REQUIRED if the immediate parent exists when first time resource is getting ingested, otherwise optional. */
  primaryResourceLocation?: string;
  /** Optional. Tags associated with this resources. */
  tagsSet?: StorageDatabasecenterPartnerapiV1mainTags;
  /** The resource zone. This is only applicable for zonal resources and will be empty for regional and multi-regional resources. */
  zone?: string;
  /** Machine configuration for this resource. */
  machineConfiguration?: StorageDatabasecenterPartnerapiV1mainMachineConfiguration;
  /** The product this resource represents. */
  product?: StorageDatabasecenterProtoCommonProduct;
  /** Latest backup run information for this instance */
  backupRun?: StorageDatabasecenterPartnerapiV1mainBackupRun;
  /** Optional. Whether deletion protection is enabled for this resource. */
  isDeletionProtectionEnabled?: boolean;
  /** Closest parent Cloud Resource Manager container of this resource. It must be resource name of a Cloud Resource Manager project with the format of "/", such as "projects/123". For GCP provided resources, number should be project number. */
  resourceContainer?: string;
  /** Required. Different from DatabaseResourceId.unique_id, a resource name can be reused over time. That is, after a resource named "ABC" is deleted, the name "ABC" can be used to to create a new resource within the same source. Resource name to follow CAIS resource_name format as noted here go/condor-common-datamodel */
  resourceName?: string;
  /** Optional. List of resource flags for the database resource. */
  resourceFlags?: Array<StorageDatabasecenterPartnerapiV1mainResourceFlags>;
  /** Backup configuration for this instance */
  backupConfiguration?: StorageDatabasecenterPartnerapiV1mainBackupConfiguration;
  /** The state that the instance is expected to be in. For example, an instance state can transition to UNHEALTHY due to wrong patch update, while the expected state will remain at the HEALTHY. */
  expectedState?:
    | "STATE_UNSPECIFIED"
    | "HEALTHY"
    | "UNHEALTHY"
    | "SUSPENDED"
    | "DELETED"
    | "STATE_OTHER"
    | "STOPPED"
    | (string & {});
  /** Optional. BackupDR Configuration for the resource. */
  backupdrConfiguration?: StorageDatabasecenterPartnerapiV1mainBackupDRConfiguration;
  /** The time at which the resource was updated and recorded at partner service. */
  updationTime?: string;
  /** Availability configuration for this instance */
  availabilityConfiguration?: StorageDatabasecenterPartnerapiV1mainAvailabilityConfiguration;
  /** The type of the instance. Specified at creation time. */
  instanceType?:
    | "INSTANCE_TYPE_UNSPECIFIED"
    | "SUB_RESOURCE_TYPE_UNSPECIFIED"
    | "PRIMARY"
    | "SECONDARY"
    | "READ_REPLICA"
    | "OTHER"
    | "SUB_RESOURCE_TYPE_PRIMARY"
    | "SUB_RESOURCE_TYPE_SECONDARY"
    | "SUB_RESOURCE_TYPE_READ_REPLICA"
    | "SUB_RESOURCE_TYPE_EXTERNAL_PRIMARY"
    | "SUB_RESOURCE_TYPE_READ_POOL"
    | "SUB_RESOURCE_TYPE_OTHER"
    | (string & {});
  /** User-provided labels associated with the resource */
  userLabelSet?: StorageDatabasecenterPartnerapiV1mainUserLabels;
  /** Identifier for this resource's immediate parent/primary resource if the current resource is a replica or derived form of another Database resource. Else it would be NULL. REQUIRED if the immediate parent exists when first time resource is getting ingested, otherwise optional. */
  primaryResourceId?: StorageDatabasecenterPartnerapiV1mainDatabaseResourceId;
  /** Required. Unique identifier for a Database resource */
  id?: StorageDatabasecenterPartnerapiV1mainDatabaseResourceId;
  /** Entitlements associated with the resource */
  entitlements?: Array<StorageDatabasecenterPartnerapiV1mainEntitlement>;
  /** Any custom metadata associated with the resource */
  customMetadata?: StorageDatabasecenterPartnerapiV1mainCustomMetadataData;
  /** Optional. Suspension reason for the resource. */
  suspensionReason?:
    | "SUSPENSION_REASON_UNSPECIFIED"
    | "WIPEOUT_HIDE_EVENT"
    | "WIPEOUT_PURGE_EVENT"
    | "BILLING_DISABLED"
    | "ABUSER_DETECTED"
    | "ENCRYPTION_KEY_INACCESSIBLE"
    | "REPLICATED_CLUSTER_ENCRYPTION_KEY_INACCESSIBLE"
    | (string & {});
  /** GCBDR configuration for the resource. */
  gcbdrConfiguration?: StorageDatabasecenterPartnerapiV1mainGCBDRConfiguration;
  /** Optional. Maintenance info for the resource. */
  maintenanceInfo?: StorageDatabasecenterPartnerapiV1mainResourceMaintenanceInfo;
}

export const StorageDatabasecenterPartnerapiV1mainDatabaseResourceMetadata: Schema.Schema<StorageDatabasecenterPartnerapiV1mainDatabaseResourceMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      location: Schema.optional(Schema.String),
      creationTime: Schema.optional(Schema.String),
      currentState: Schema.optional(Schema.String),
      edition: Schema.optional(Schema.String),
      primaryResourceLocation: Schema.optional(Schema.String),
      tagsSet: Schema.optional(StorageDatabasecenterPartnerapiV1mainTags),
      zone: Schema.optional(Schema.String),
      machineConfiguration: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainMachineConfiguration,
      ),
      product: Schema.optional(StorageDatabasecenterProtoCommonProduct),
      backupRun: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainBackupRun,
      ),
      isDeletionProtectionEnabled: Schema.optional(Schema.Boolean),
      resourceContainer: Schema.optional(Schema.String),
      resourceName: Schema.optional(Schema.String),
      resourceFlags: Schema.optional(
        Schema.Array(StorageDatabasecenterPartnerapiV1mainResourceFlags),
      ),
      backupConfiguration: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainBackupConfiguration,
      ),
      expectedState: Schema.optional(Schema.String),
      backupdrConfiguration: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainBackupDRConfiguration,
      ),
      updationTime: Schema.optional(Schema.String),
      availabilityConfiguration: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainAvailabilityConfiguration,
      ),
      instanceType: Schema.optional(Schema.String),
      userLabelSet: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainUserLabels,
      ),
      primaryResourceId: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainDatabaseResourceId,
      ),
      id: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainDatabaseResourceId,
      ),
      entitlements: Schema.optional(
        Schema.Array(StorageDatabasecenterPartnerapiV1mainEntitlement),
      ),
      customMetadata: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainCustomMetadataData,
      ),
      suspensionReason: Schema.optional(Schema.String),
      gcbdrConfiguration: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainGCBDRConfiguration,
      ),
      maintenanceInfo: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainResourceMaintenanceInfo,
      ),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainDatabaseResourceMetadata",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainDatabaseResourceMetadata>;

export interface StorageDatabasecenterPartnerapiV1mainDatabaseResourceFeed {
  recommendationSignalData?: StorageDatabasecenterPartnerapiV1mainDatabaseResourceRecommendationSignalData;
  resourceHealthSignalData?: StorageDatabasecenterPartnerapiV1mainDatabaseResourceHealthSignalData;
  observabilityMetricData?: StorageDatabasecenterPartnerapiV1mainObservabilityMetricData;
  /** Required. Timestamp when feed is generated. */
  feedTimestamp?: string;
  /** Database resource signal data is used to ingest signals from database resource signal feeds. */
  databaseResourceSignalData?: StorageDatabasecenterPartnerapiV1mainDatabaseResourceSignalData;
  /** Optional. If true, the feed won't be ingested by DB Center. This indicates that the feed is intentionally skipped. For example, BackupDR feeds are only needed for resources integrated with DB Center (e.g., CloudSQL, AlloyDB). Feeds for non-integrated resources (e.g., Compute Engine, Persistent Disk) can be skipped. */
  skipIngestion?: boolean;
  /** Config based signal data is used to ingest signals that are generated based on the configuration of the database resource. */
  configBasedSignalData?: StorageDatabasecenterPartnerapiV1mainConfigBasedSignalData;
  /** Primary key associated with the Resource. resource_id is available in individual feed level as well. */
  resourceId?: StorageDatabasecenterPartnerapiV1mainDatabaseResourceId;
  /** BackupDR metadata is used to ingest metadata from BackupDR. */
  backupdrMetadata?: StorageDatabasecenterPartnerapiV1mainBackupDRMetadata;
  resourceMetadata?: StorageDatabasecenterPartnerapiV1mainDatabaseResourceMetadata;
  /** Required. Type feed to be ingested into condor */
  feedType?:
    | "FEEDTYPE_UNSPECIFIED"
    | "RESOURCE_METADATA"
    | "OBSERVABILITY_DATA"
    | "SECURITY_FINDING_DATA"
    | "RECOMMENDATION_SIGNAL_DATA"
    | "CONFIG_BASED_SIGNAL_DATA"
    | "BACKUPDR_METADATA"
    | "DATABASE_RESOURCE_SIGNAL_DATA"
    | (string & {});
}

export const StorageDatabasecenterPartnerapiV1mainDatabaseResourceFeed: Schema.Schema<StorageDatabasecenterPartnerapiV1mainDatabaseResourceFeed> =
  Schema.suspend(() =>
    Schema.Struct({
      recommendationSignalData: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainDatabaseResourceRecommendationSignalData,
      ),
      resourceHealthSignalData: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainDatabaseResourceHealthSignalData,
      ),
      observabilityMetricData: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainObservabilityMetricData,
      ),
      feedTimestamp: Schema.optional(Schema.String),
      databaseResourceSignalData: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainDatabaseResourceSignalData,
      ),
      skipIngestion: Schema.optional(Schema.Boolean),
      configBasedSignalData: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainConfigBasedSignalData,
      ),
      resourceId: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainDatabaseResourceId,
      ),
      backupdrMetadata: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainBackupDRMetadata,
      ),
      resourceMetadata: Schema.optional(
        StorageDatabasecenterPartnerapiV1mainDatabaseResourceMetadata,
      ),
      feedType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StorageDatabasecenterPartnerapiV1mainDatabaseResourceFeed",
  }) as any as Schema.Schema<StorageDatabasecenterPartnerapiV1mainDatabaseResourceFeed>;

export interface GcsDestination {
  /** Required. The path to the file in Google Cloud Storage where the export will be stored. The URI is in the form `gs://bucketName/fileName`. */
  uri?: string;
}

export const GcsDestination: Schema.Schema<GcsDestination> = Schema.suspend(
  () =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "GcsDestination",
}) as any as Schema.Schema<GcsDestination>;

export interface ConnectionInfo {
  /** The name of the ConnectionInfo singleton resource, e.g.: projects/{project}/locations/{location}/clusters/* /instances/* /connectionInfo This field currently has no semantic meaning. */
  name?: string;
  /** Output only. The private network IP address for the Instance. This is the default IP for the instance and is always created (even if enable_public_ip is set). This is the connection endpoint for an end-user application. */
  ipAddress?: string;
  /** Output only. The pem-encoded chain that may be used to verify the X.509 certificate. Expected to be in issuer-to-root order according to RFC 5246. */
  pemCertificateChain?: Array<string>;
  /** Output only. The unique ID of the Instance. */
  instanceUid?: string;
  /** Output only. The public IP addresses for the Instance. This is available ONLY when enable_public_ip is set. This is the connection endpoint for an end-user application. */
  publicIpAddress?: string;
  /** Output only. The DNS name to use with PSC for the Instance. */
  pscDnsName?: string;
}

export const ConnectionInfo: Schema.Schema<ConnectionInfo> = Schema.suspend(
  () =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      ipAddress: Schema.optional(Schema.String),
      pemCertificateChain: Schema.optional(Schema.Array(Schema.String)),
      instanceUid: Schema.optional(Schema.String),
      publicIpAddress: Schema.optional(Schema.String),
      pscDnsName: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ConnectionInfo",
}) as any as Schema.Schema<ConnectionInfo>;

export interface InjectFaultRequest {
  /** Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. */
  validateOnly?: boolean;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The type of fault to be injected in an instance. */
  faultType?: "FAULT_TYPE_UNSPECIFIED" | "STOP_VM" | (string & {});
}

export const InjectFaultRequest: Schema.Schema<InjectFaultRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      validateOnly: Schema.optional(Schema.Boolean),
      requestId: Schema.optional(Schema.String),
      faultType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InjectFaultRequest",
  }) as any as Schema.Schema<InjectFaultRequest>;

export interface CancelOperationRequest {}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelOperationRequest",
  }) as any as Schema.Schema<CancelOperationRequest>;

export interface CsvExportOptions {
  /** Optional. Specifies the quoting character to be used when a data value is quoted. The default is double-quote. The value of this argument has to be a character in Hex ASCII Code. */
  quoteCharacter?: string;
  /** Optional. Specifies the character that should appear before a data character that needs to be escaped. The default is the same as quote character. The value of this argument has to be a character in Hex ASCII Code. */
  escapeCharacter?: string;
  /** Optional. Specifies the character that separates columns within each row (line) of the file. The default is comma. The value of this argument has to be a character in Hex ASCII Code. */
  fieldDelimiter?: string;
  /** Required. The SELECT query used to extract the data. */
  selectQuery?: string;
}

export const CsvExportOptions: Schema.Schema<CsvExportOptions> = Schema.suspend(
  () =>
    Schema.Struct({
      quoteCharacter: Schema.optional(Schema.String),
      escapeCharacter: Schema.optional(Schema.String),
      fieldDelimiter: Schema.optional(Schema.String),
      selectQuery: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "CsvExportOptions",
}) as any as Schema.Schema<CsvExportOptions>;

export interface SqlExportOptions {
  /** Optional. If true, only export the schema. */
  schemaOnly?: boolean;
  /** Optional. Tables to export from. */
  tables?: Array<string>;
  /** Optional. If true, use DROP ... IF EXISTS commands to check for the object's existence before dropping it in clean_target_objects mode. */
  ifExistTargetObjects?: boolean;
  /** Optional. If true, output commands to DROP all the dumped database objects prior to outputting the commands for creating them. */
  cleanTargetObjects?: boolean;
}

export const SqlExportOptions: Schema.Schema<SqlExportOptions> = Schema.suspend(
  () =>
    Schema.Struct({
      schemaOnly: Schema.optional(Schema.Boolean),
      tables: Schema.optional(Schema.Array(Schema.String)),
      ifExistTargetObjects: Schema.optional(Schema.Boolean),
      cleanTargetObjects: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "SqlExportOptions",
}) as any as Schema.Schema<SqlExportOptions>;

export interface ExportClusterRequest {
  /** Options for exporting data in CSV format. Required field to be set for CSV file type. */
  csvExportOptions?: CsvExportOptions;
  /** Options for exporting data in SQL format. Required field to be set for SQL file type. */
  sqlExportOptions?: SqlExportOptions;
  /** Required. Name of the database where the export command will be executed. Note - Value provided should be the same as expected from `SELECT current_database();` and NOT as a resource reference. */
  database?: string;
  /** Required. Option to export data to cloud storage. */
  gcsDestination?: GcsDestination;
}

export const ExportClusterRequest: Schema.Schema<ExportClusterRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      csvExportOptions: Schema.optional(CsvExportOptions),
      sqlExportOptions: Schema.optional(SqlExportOptions),
      database: Schema.optional(Schema.String),
      gcsDestination: Schema.optional(GcsDestination),
    }),
  ).annotate({
    identifier: "ExportClusterRequest",
  }) as any as Schema.Schema<ExportClusterRequest>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface OperationMetadata {
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. UpgradeClusterStatus related metadata. */
  upgradeClusterStatus?: UpgradeClusterStatus;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      apiVersion: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
      statusMessage: Schema.optional(Schema.String),
      upgradeClusterStatus: Schema.optional(UpgradeClusterStatus),
    }),
  ).annotate({
    identifier: "OperationMetadata",
  }) as any as Schema.Schema<OperationMetadata>;

export interface PromoteClusterRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. */
  validateOnly?: boolean;
  /** Optional. The current etag of the Cluster. If an etag is provided and does not match the current etag of the Cluster, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const PromoteClusterRequest: Schema.Schema<PromoteClusterRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      requestId: Schema.optional(Schema.String),
      validateOnly: Schema.optional(Schema.Boolean),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PromoteClusterRequest",
  }) as any as Schema.Schema<PromoteClusterRequest>;

export interface RestoreFromCloudSQLRequest {
  /** Cluster created from CloudSQL backup run. */
  cloudsqlBackupRunSource?: CloudSQLBackupRunSource;
  /** Required. ID of the requesting object. */
  clusterId?: string;
  /** Required. The resource being created */
  cluster?: Cluster;
}

export const RestoreFromCloudSQLRequest: Schema.Schema<RestoreFromCloudSQLRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      cloudsqlBackupRunSource: Schema.optional(CloudSQLBackupRunSource),
      clusterId: Schema.optional(Schema.String),
      cluster: Schema.optional(Cluster),
    }),
  ).annotate({
    identifier: "RestoreFromCloudSQLRequest",
  }) as any as Schema.Schema<RestoreFromCloudSQLRequest>;

export interface ListBackupsResponse {
  /** The list of Backup */
  backups?: Array<Backup>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackupsResponse: Schema.Schema<ListBackupsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      backups: Schema.optional(Schema.Array(Backup)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListBackupsResponse",
  }) as any as Schema.Schema<ListBackupsResponse>;

export interface RestoreClusterRequest {
  /** Required. ID of the requesting object. */
  clusterId?: string;
  /** Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. */
  validateOnly?: boolean;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** BackupDR backup source. */
  backupdrBackupSource?: BackupDrBackupSource;
  /** Required. The resource being created */
  cluster?: Cluster;
  /** ContinuousBackup source. Continuous backup needs to be enabled in the source cluster for this operation to succeed. */
  continuousBackupSource?: ContinuousBackupSource;
  /** Backup source. */
  backupSource?: BackupSource;
  /** BackupDR source used for point in time recovery. */
  backupdrPitrSource?: BackupDrPitrSource;
}

export const RestoreClusterRequest: Schema.Schema<RestoreClusterRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      clusterId: Schema.optional(Schema.String),
      validateOnly: Schema.optional(Schema.Boolean),
      requestId: Schema.optional(Schema.String),
      backupdrBackupSource: Schema.optional(BackupDrBackupSource),
      cluster: Schema.optional(Cluster),
      continuousBackupSource: Schema.optional(ContinuousBackupSource),
      backupSource: Schema.optional(BackupSource),
      backupdrPitrSource: Schema.optional(BackupDrPitrSource),
    }),
  ).annotate({
    identifier: "RestoreClusterRequest",
  }) as any as Schema.Schema<RestoreClusterRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = GoogleCloudLocationLocation;
export const GetProjectsLocationsResponse = GoogleCloudLocationLocation;

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

export interface ListProjectsLocationsRequest {
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("extraLocationTypes"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse =
  GoogleCloudLocationListLocationsResponse;
export const ListProjectsLocationsResponse =
  GoogleCloudLocationListLocationsResponse;

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

export interface DeleteProjectsLocationsBackupsRequest {
  /** Optional. The current etag of the Backup. If an etag is provided and does not match the current etag of the Backup, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Optional. If set, the backend validates the request, but doesn't actually execute it. */
  validateOnly?: boolean;
  /** Required. Name of the resource. For the required format, see the comment on the Backup.name field. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsBackupsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/backups/{backupsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackupsRequest>;

export type DeleteProjectsLocationsBackupsResponse = Operation;
export const DeleteProjectsLocationsBackupsResponse = Operation;

export type DeleteProjectsLocationsBackupsError = DefaultErrors;

/** Deletes a single Backup. */
export const deleteProjectsLocationsBackups: API.OperationMethod<
  DeleteProjectsLocationsBackupsRequest,
  DeleteProjectsLocationsBackupsResponse,
  DeleteProjectsLocationsBackupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsBackupsRequest,
  output: DeleteProjectsLocationsBackupsResponse,
  errors: [],
}));

export interface ListProjectsLocationsBackupsRequest {
  /** Required. Parent value for ListBackupsRequest */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. The view of the backup to return. */
  view?:
    | "BACKUP_VIEW_UNSPECIFIED"
    | "BACKUP_VIEW_BASIC"
    | "BACKUP_VIEW_CLUSTER_DELETED"
    | (string & {});
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Hint for how to order the results */
  orderBy?: string;
  /** Filtering results */
  filter?: string;
}

export const ListProjectsLocationsBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/backups",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackupsRequest>;

export type ListProjectsLocationsBackupsResponse = ListBackupsResponse;
export const ListProjectsLocationsBackupsResponse = ListBackupsResponse;

export type ListProjectsLocationsBackupsError = DefaultErrors;

/** Lists Backups in a given project and location. */
export const listProjectsLocationsBackups: API.PaginatedOperationMethod<
  ListProjectsLocationsBackupsRequest,
  ListProjectsLocationsBackupsResponse,
  ListProjectsLocationsBackupsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsBackupsRequest,
  output: ListProjectsLocationsBackupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsBackupsRequest {
  /** Optional. The view of the backup to return. */
  view?:
    | "BACKUP_VIEW_UNSPECIFIED"
    | "BACKUP_VIEW_BASIC"
    | "BACKUP_VIEW_CLUSTER_DELETED"
    | (string & {});
  /** Required. Name of the resource */
  name: string;
}

export const GetProjectsLocationsBackupsRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/backups/{backupsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackupsRequest>;

export type GetProjectsLocationsBackupsResponse = Backup;
export const GetProjectsLocationsBackupsResponse = Backup;

export type GetProjectsLocationsBackupsError = DefaultErrors;

/** Gets details of a single Backup. */
export const getProjectsLocationsBackups: API.OperationMethod<
  GetProjectsLocationsBackupsRequest,
  GetProjectsLocationsBackupsResponse,
  GetProjectsLocationsBackupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsBackupsRequest,
  output: GetProjectsLocationsBackupsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsBackupsRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Value for parent. */
  parent: string;
  /** Required. ID of the requesting object. */
  backupId?: string;
  /** Optional. If set, the backend validates the request, but doesn't actually execute it. */
  validateOnly?: boolean;
  /** Request body */
  body?: Backup;
}

export const CreateProjectsLocationsBackupsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  backupId: Schema.optional(Schema.String).pipe(T.HttpQuery("backupId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  body: Schema.optional(Backup).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/backups",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBackupsRequest>;

export type CreateProjectsLocationsBackupsResponse = Operation;
export const CreateProjectsLocationsBackupsResponse = Operation;

export type CreateProjectsLocationsBackupsError = DefaultErrors;

/** Creates a new Backup in a given project and location. */
export const createProjectsLocationsBackups: API.OperationMethod<
  CreateProjectsLocationsBackupsRequest,
  CreateProjectsLocationsBackupsResponse,
  CreateProjectsLocationsBackupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsBackupsRequest,
  output: CreateProjectsLocationsBackupsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsBackupsRequest {
  /** Optional. If set, the backend validates the request, but doesn't actually execute it. */
  validateOnly?: boolean;
  /** Optional. If set to true, update succeeds even if instance is not found. In that case, a new backup is created and `update_mask` is ignored. */
  allowMissing?: boolean;
  /** Output only. The name of the backup resource with the format: * projects/{project}/locations/{region}/backups/{backup_id} where the cluster and backup ID segments should satisfy the regex expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`, e.g. 1-63 characters of lowercase letters, numbers, and dashes, starting with a letter, and ending with a letter or number. For more details see https://google.aip.dev/122. The prefix of the backup resource name is the name of the parent resource: * projects/{project}/locations/{region} */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the Backup resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: Backup;
}

export const PatchProjectsLocationsBackupsRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Backup).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/backups/{backupsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackupsRequest>;

export type PatchProjectsLocationsBackupsResponse = Operation;
export const PatchProjectsLocationsBackupsResponse = Operation;

export type PatchProjectsLocationsBackupsError = DefaultErrors;

/** Updates the parameters of a single Backup. */
export const patchProjectsLocationsBackups: API.OperationMethod<
  PatchProjectsLocationsBackupsRequest,
  PatchProjectsLocationsBackupsResponse,
  PatchProjectsLocationsBackupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsBackupsRequest,
  output: PatchProjectsLocationsBackupsResponse,
  errors: [],
}));

export interface ListProjectsLocationsOperationsRequest {
  /** The standard list page token. */
  pageToken?: string;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page size. */
  pageSize?: number;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("returnPartialSuccess"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/operations",
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
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
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
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel",
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

export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
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

export interface GetProjectsLocationsClustersRequest {
  /** Required. The name of the resource. For the required format, see the comment on the Cluster.name field. */
  name: string;
  /** Optional. The view of the cluster to return. Returns all default fields if not set. */
  view?:
    | "CLUSTER_VIEW_UNSPECIFIED"
    | "CLUSTER_VIEW_BASIC"
    | "CLUSTER_VIEW_CONTINUOUS_BACKUP"
    | (string & {});
}

export const GetProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsClustersRequest>;

export type GetProjectsLocationsClustersResponse = Cluster;
export const GetProjectsLocationsClustersResponse = Cluster;

export type GetProjectsLocationsClustersError = DefaultErrors;

/** Gets details of a single Cluster. */
export const getProjectsLocationsClusters: API.OperationMethod<
  GetProjectsLocationsClustersRequest,
  GetProjectsLocationsClustersResponse,
  GetProjectsLocationsClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsClustersRequest,
  output: GetProjectsLocationsClustersResponse,
  errors: [],
}));

export interface CreateProjectsLocationsClustersRequest {
  /** Required. The location of the new cluster. For the required format, see the comment on the Cluster.name field. */
  parent: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. ID of the requesting object. */
  clusterId?: string;
  /** Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. */
  validateOnly?: boolean;
  /** Request body */
  body?: Cluster;
}

export const CreateProjectsLocationsClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  clusterId: Schema.optional(Schema.String).pipe(T.HttpQuery("clusterId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  body: Schema.optional(Cluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsClustersRequest>;

export type CreateProjectsLocationsClustersResponse = Operation;
export const CreateProjectsLocationsClustersResponse = Operation;

export type CreateProjectsLocationsClustersError = DefaultErrors;

/** Creates a new Cluster in a given project and location. */
export const createProjectsLocationsClusters: API.OperationMethod<
  CreateProjectsLocationsClustersRequest,
  CreateProjectsLocationsClustersResponse,
  CreateProjectsLocationsClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsClustersRequest,
  output: CreateProjectsLocationsClustersResponse,
  errors: [],
}));

export interface RestoreProjectsLocationsClustersRequest {
  /** Required. The name of the parent resource. For the required format, see the comment on the Cluster.name field. */
  parent: string;
  /** Request body */
  body?: RestoreClusterRequest;
}

export const RestoreProjectsLocationsClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RestoreClusterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters:restore",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsLocationsClustersRequest>;

export type RestoreProjectsLocationsClustersResponse = Operation;
export const RestoreProjectsLocationsClustersResponse = Operation;

export type RestoreProjectsLocationsClustersError = DefaultErrors;

/** Creates a new Cluster in a given project and location, with a volume restored from the provided source, either a backup ID or a point-in-time and a source cluster. */
export const restoreProjectsLocationsClusters: API.OperationMethod<
  RestoreProjectsLocationsClustersRequest,
  RestoreProjectsLocationsClustersResponse,
  RestoreProjectsLocationsClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RestoreProjectsLocationsClustersRequest,
  output: RestoreProjectsLocationsClustersResponse,
  errors: [],
}));

export interface PromoteProjectsLocationsClustersRequest {
  /** Required. The name of the resource. For the required format, see the comment on the Cluster.name field */
  name: string;
  /** Request body */
  body?: PromoteClusterRequest;
}

export const PromoteProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PromoteClusterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:promote",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PromoteProjectsLocationsClustersRequest>;

export type PromoteProjectsLocationsClustersResponse = Operation;
export const PromoteProjectsLocationsClustersResponse = Operation;

export type PromoteProjectsLocationsClustersError = DefaultErrors;

/** Promotes a SECONDARY cluster. This turns down replication from the PRIMARY cluster and promotes a secondary cluster into its own standalone cluster. Imperative only. */
export const promoteProjectsLocationsClusters: API.OperationMethod<
  PromoteProjectsLocationsClustersRequest,
  PromoteProjectsLocationsClustersResponse,
  PromoteProjectsLocationsClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PromoteProjectsLocationsClustersRequest,
  output: PromoteProjectsLocationsClustersResponse,
  errors: [],
}));

export interface ListProjectsLocationsClustersRequest {
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Filtering results */
  filter?: string;
  /** Required. The name of the parent resource. For the required format, see the comment on the Cluster.name field. Additionally, you can perform an aggregated list operation by specifying a value with the following format: * projects/{project}/locations/- */
  parent: string;
  /** Optional. Hint for how to order the results */
  orderBy?: string;
}

export const ListProjectsLocationsClustersRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsClustersRequest>;

export type ListProjectsLocationsClustersResponse = ListClustersResponse;
export const ListProjectsLocationsClustersResponse = ListClustersResponse;

export type ListProjectsLocationsClustersError = DefaultErrors;

/** Lists Clusters in a given project and location. */
export const listProjectsLocationsClusters: API.PaginatedOperationMethod<
  ListProjectsLocationsClustersRequest,
  ListProjectsLocationsClustersResponse,
  ListProjectsLocationsClustersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsClustersRequest,
  output: ListProjectsLocationsClustersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ExportProjectsLocationsClustersRequest {
  /** Required. The resource name of the cluster. */
  name: string;
  /** Request body */
  body?: ExportClusterRequest;
}

export const ExportProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ExportClusterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:export",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ExportProjectsLocationsClustersRequest>;

export type ExportProjectsLocationsClustersResponse = Operation;
export const ExportProjectsLocationsClustersResponse = Operation;

export type ExportProjectsLocationsClustersError = DefaultErrors;

/** Exports data from the cluster. Imperative only. */
export const exportProjectsLocationsClusters: API.OperationMethod<
  ExportProjectsLocationsClustersRequest,
  ExportProjectsLocationsClustersResponse,
  ExportProjectsLocationsClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ExportProjectsLocationsClustersRequest,
  output: ExportProjectsLocationsClustersResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsClustersRequest {
  /** Optional. The current etag of the Cluster. If an etag is provided and does not match the current etag of the Cluster, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Optional. Whether to cascade delete child instances for given cluster. */
  force?: boolean;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The name of the resource. For the required format, see the comment on the Cluster.name field. */
  name: string;
  /** Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. */
  validateOnly?: boolean;
}

export const DeleteProjectsLocationsClustersRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsClustersRequest>;

export type DeleteProjectsLocationsClustersResponse = Operation;
export const DeleteProjectsLocationsClustersResponse = Operation;

export type DeleteProjectsLocationsClustersError = DefaultErrors;

/** Deletes a single Cluster. */
export const deleteProjectsLocationsClusters: API.OperationMethod<
  DeleteProjectsLocationsClustersRequest,
  DeleteProjectsLocationsClustersResponse,
  DeleteProjectsLocationsClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsClustersRequest,
  output: DeleteProjectsLocationsClustersResponse,
  errors: [],
}));

export interface ImportProjectsLocationsClustersRequest {
  /** Required. The resource name of the cluster. */
  name: string;
  /** Request body */
  body?: ImportClusterRequest;
}

export const ImportProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ImportClusterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:import",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsClustersRequest>;

export type ImportProjectsLocationsClustersResponse = Operation;
export const ImportProjectsLocationsClustersResponse = Operation;

export type ImportProjectsLocationsClustersError = DefaultErrors;

/** Imports data to the cluster. Imperative only. */
export const importProjectsLocationsClusters: API.OperationMethod<
  ImportProjectsLocationsClustersRequest,
  ImportProjectsLocationsClustersResponse,
  ImportProjectsLocationsClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ImportProjectsLocationsClustersRequest,
  output: ImportProjectsLocationsClustersResponse,
  errors: [],
}));

export interface PatchProjectsLocationsClustersRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. */
  validateOnly?: boolean;
  /** Optional. Field mask is used to specify the fields to be overwritten in the Cluster resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Output only. The name of the cluster resource with the format: * projects/{project}/locations/{region}/clusters/{cluster_id} where the cluster ID segment should satisfy the regex expression `[a-z0-9-]+`. For more details see https://google.aip.dev/122. The prefix of the cluster resource name is the name of the parent resource: * projects/{project}/locations/{region} */
  name: string;
  /** Optional. If set to true, update succeeds even if cluster is not found. In that case, a new cluster is created and `update_mask` is ignored. */
  allowMissing?: boolean;
  /** Request body */
  body?: Cluster;
}

export const PatchProjectsLocationsClustersRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
  body: Schema.optional(Cluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsClustersRequest>;

export type PatchProjectsLocationsClustersResponse = Operation;
export const PatchProjectsLocationsClustersResponse = Operation;

export type PatchProjectsLocationsClustersError = DefaultErrors;

/** Updates the parameters of a single Cluster. */
export const patchProjectsLocationsClusters: API.OperationMethod<
  PatchProjectsLocationsClustersRequest,
  PatchProjectsLocationsClustersResponse,
  PatchProjectsLocationsClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsClustersRequest,
  output: PatchProjectsLocationsClustersResponse,
  errors: [],
}));

export interface SwitchoverProjectsLocationsClustersRequest {
  /** Required. The name of the resource. For the required format, see the comment on the Cluster.name field */
  name: string;
  /** Request body */
  body?: SwitchoverClusterRequest;
}

export const SwitchoverProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SwitchoverClusterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:switchover",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SwitchoverProjectsLocationsClustersRequest>;

export type SwitchoverProjectsLocationsClustersResponse = Operation;
export const SwitchoverProjectsLocationsClustersResponse = Operation;

export type SwitchoverProjectsLocationsClustersError = DefaultErrors;

/** Switches the roles of PRIMARY and SECONDARY clusters without any data loss. This promotes the SECONDARY cluster to PRIMARY and sets up the original PRIMARY cluster to replicate from this newly promoted cluster. */
export const switchoverProjectsLocationsClusters: API.OperationMethod<
  SwitchoverProjectsLocationsClustersRequest,
  SwitchoverProjectsLocationsClustersResponse,
  SwitchoverProjectsLocationsClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SwitchoverProjectsLocationsClustersRequest,
  output: SwitchoverProjectsLocationsClustersResponse,
  errors: [],
}));

export interface UpgradeProjectsLocationsClustersRequest {
  /** Required. The resource name of the cluster. */
  name: string;
  /** Request body */
  body?: UpgradeClusterRequest;
}

export const UpgradeProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpgradeClusterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:upgrade",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpgradeProjectsLocationsClustersRequest>;

export type UpgradeProjectsLocationsClustersResponse = Operation;
export const UpgradeProjectsLocationsClustersResponse = Operation;

export type UpgradeProjectsLocationsClustersError = DefaultErrors;

/** Upgrades a single Cluster. Imperative only. */
export const upgradeProjectsLocationsClusters: API.OperationMethod<
  UpgradeProjectsLocationsClustersRequest,
  UpgradeProjectsLocationsClustersResponse,
  UpgradeProjectsLocationsClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpgradeProjectsLocationsClustersRequest,
  output: UpgradeProjectsLocationsClustersResponse,
  errors: [],
}));

export interface CreatesecondaryProjectsLocationsClustersRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The location of the new cluster. For the required format, see the comment on the Cluster.name field. */
  parent: string;
  /** Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. */
  validateOnly?: boolean;
  /** Required. ID of the requesting object (the secondary cluster). */
  clusterId?: string;
  /** Request body */
  body?: Cluster;
}

export const CreatesecondaryProjectsLocationsClustersRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  clusterId: Schema.optional(Schema.String).pipe(T.HttpQuery("clusterId")),
  body: Schema.optional(Cluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters:createsecondary",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatesecondaryProjectsLocationsClustersRequest>;

export type CreatesecondaryProjectsLocationsClustersResponse = Operation;
export const CreatesecondaryProjectsLocationsClustersResponse = Operation;

export type CreatesecondaryProjectsLocationsClustersError = DefaultErrors;

/** Creates a cluster of type SECONDARY in the given location using the primary cluster as the source. */
export const createsecondaryProjectsLocationsClusters: API.OperationMethod<
  CreatesecondaryProjectsLocationsClustersRequest,
  CreatesecondaryProjectsLocationsClustersResponse,
  CreatesecondaryProjectsLocationsClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatesecondaryProjectsLocationsClustersRequest,
  output: CreatesecondaryProjectsLocationsClustersResponse,
  errors: [],
}));

export interface RestoreFromCloudSQLProjectsLocationsClustersRequest {
  /** Required. The location of the new cluster. For the required format, see the comment on Cluster.name field. */
  parent: string;
  /** Request body */
  body?: RestoreFromCloudSQLRequest;
}

export const RestoreFromCloudSQLProjectsLocationsClustersRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(RestoreFromCloudSQLRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters:restoreFromCloudSQL",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RestoreFromCloudSQLProjectsLocationsClustersRequest>;

export type RestoreFromCloudSQLProjectsLocationsClustersResponse = Operation;
export const RestoreFromCloudSQLProjectsLocationsClustersResponse = Operation;

export type RestoreFromCloudSQLProjectsLocationsClustersError = DefaultErrors;

/** Restores an AlloyDB cluster from a CloudSQL resource. */
export const restoreFromCloudSQLProjectsLocationsClusters: API.OperationMethod<
  RestoreFromCloudSQLProjectsLocationsClustersRequest,
  RestoreFromCloudSQLProjectsLocationsClustersResponse,
  RestoreFromCloudSQLProjectsLocationsClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RestoreFromCloudSQLProjectsLocationsClustersRequest,
  output: RestoreFromCloudSQLProjectsLocationsClustersResponse,
  errors: [],
}));

export interface PatchProjectsLocationsClustersUsersRequest {
  /** Output only. Name of the resource in the form of projects/{project}/locations/{location}/cluster/{cluster}/users/{user}. */
  name: string;
  /** Optional. Allow missing fields in the update mask. */
  allowMissing?: boolean;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the User resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. If set, the backend validates the request, but doesn't actually execute it. */
  validateOnly?: boolean;
  /** Request body */
  body?: User;
}

export const PatchProjectsLocationsClustersUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  body: Schema.optional(User).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/users/{usersId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsClustersUsersRequest>;

export type PatchProjectsLocationsClustersUsersResponse = User;
export const PatchProjectsLocationsClustersUsersResponse = User;

export type PatchProjectsLocationsClustersUsersError = DefaultErrors;

/** Updates the parameters of a single User. */
export const patchProjectsLocationsClustersUsers: API.OperationMethod<
  PatchProjectsLocationsClustersUsersRequest,
  PatchProjectsLocationsClustersUsersResponse,
  PatchProjectsLocationsClustersUsersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsClustersUsersRequest,
  output: PatchProjectsLocationsClustersUsersResponse,
  errors: [],
}));

export interface GetProjectsLocationsClustersUsersRequest {
  /** Required. The name of the resource. For the required format, see the comment on the User.name field. */
  name: string;
}

export const GetProjectsLocationsClustersUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/users/{usersId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsClustersUsersRequest>;

export type GetProjectsLocationsClustersUsersResponse = User;
export const GetProjectsLocationsClustersUsersResponse = User;

export type GetProjectsLocationsClustersUsersError = DefaultErrors;

/** Gets details of a single User. */
export const getProjectsLocationsClustersUsers: API.OperationMethod<
  GetProjectsLocationsClustersUsersRequest,
  GetProjectsLocationsClustersUsersResponse,
  GetProjectsLocationsClustersUsersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsClustersUsersRequest,
  output: GetProjectsLocationsClustersUsersResponse,
  errors: [],
}));

export interface CreateProjectsLocationsClustersUsersRequest {
  /** Required. ID of the requesting object. */
  userId?: string;
  /** Required. Value for parent. */
  parent: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, the backend validates the request, but doesn't actually execute it. */
  validateOnly?: boolean;
  /** Request body */
  body?: User;
}

export const CreateProjectsLocationsClustersUsersRequest = Schema.Struct({
  userId: Schema.optional(Schema.String).pipe(T.HttpQuery("userId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  body: Schema.optional(User).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/users",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsClustersUsersRequest>;

export type CreateProjectsLocationsClustersUsersResponse = User;
export const CreateProjectsLocationsClustersUsersResponse = User;

export type CreateProjectsLocationsClustersUsersError = DefaultErrors;

/** Creates a new User in a given project, location, and cluster. */
export const createProjectsLocationsClustersUsers: API.OperationMethod<
  CreateProjectsLocationsClustersUsersRequest,
  CreateProjectsLocationsClustersUsersResponse,
  CreateProjectsLocationsClustersUsersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsClustersUsersRequest,
  output: CreateProjectsLocationsClustersUsersResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsClustersUsersRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, the backend validates the request, but doesn't actually execute it. */
  validateOnly?: boolean;
  /** Required. The name of the resource. For the required format, see the comment on the User.name field. */
  name: string;
}

export const DeleteProjectsLocationsClustersUsersRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/users/{usersId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsClustersUsersRequest>;

export type DeleteProjectsLocationsClustersUsersResponse = Empty;
export const DeleteProjectsLocationsClustersUsersResponse = Empty;

export type DeleteProjectsLocationsClustersUsersError = DefaultErrors;

/** Deletes a single User. */
export const deleteProjectsLocationsClustersUsers: API.OperationMethod<
  DeleteProjectsLocationsClustersUsersRequest,
  DeleteProjectsLocationsClustersUsersResponse,
  DeleteProjectsLocationsClustersUsersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsClustersUsersRequest,
  output: DeleteProjectsLocationsClustersUsersResponse,
  errors: [],
}));

export interface ListProjectsLocationsClustersUsersRequest {
  /** Optional. Hint for how to order the results */
  orderBy?: string;
  /** Required. Parent value for ListUsersRequest */
  parent: string;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
}

export const ListProjectsLocationsClustersUsersRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/users",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsClustersUsersRequest>;

export type ListProjectsLocationsClustersUsersResponse = ListUsersResponse;
export const ListProjectsLocationsClustersUsersResponse = ListUsersResponse;

export type ListProjectsLocationsClustersUsersError = DefaultErrors;

/** Lists Users in a given project and location. */
export const listProjectsLocationsClustersUsers: API.PaginatedOperationMethod<
  ListProjectsLocationsClustersUsersRequest,
  ListProjectsLocationsClustersUsersResponse,
  ListProjectsLocationsClustersUsersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsClustersUsersRequest,
  output: ListProjectsLocationsClustersUsersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsClustersInstancesRequest {
  /** Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. */
  validateOnly?: boolean;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The name of the resource. For the required format, see the comment on the Instance.name field. */
  name: string;
  /** Optional. The current etag of the Instance. If an etag is provided and does not match the current etag of the Instance, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const DeleteProjectsLocationsClustersInstancesRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/instances/{instancesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsClustersInstancesRequest>;

export type DeleteProjectsLocationsClustersInstancesResponse = Operation;
export const DeleteProjectsLocationsClustersInstancesResponse = Operation;

export type DeleteProjectsLocationsClustersInstancesError = DefaultErrors;

/** Deletes a single Instance. */
export const deleteProjectsLocationsClustersInstances: API.OperationMethod<
  DeleteProjectsLocationsClustersInstancesRequest,
  DeleteProjectsLocationsClustersInstancesResponse,
  DeleteProjectsLocationsClustersInstancesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsClustersInstancesRequest,
  output: DeleteProjectsLocationsClustersInstancesResponse,
  errors: [],
}));

export interface CreatesecondaryProjectsLocationsClustersInstancesRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. ID of the requesting object. */
  instanceId?: string;
  /** Required. The name of the parent resource. For the required format, see the comment on the Instance.name field. */
  parent: string;
  /** Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. */
  validateOnly?: boolean;
  /** Request body */
  body?: Instance;
}

export const CreatesecondaryProjectsLocationsClustersInstancesRequest =
  Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    instanceId: Schema.optional(Schema.String).pipe(T.HttpQuery("instanceId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    body: Schema.optional(Instance).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/instances:createsecondary",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreatesecondaryProjectsLocationsClustersInstancesRequest>;

export type CreatesecondaryProjectsLocationsClustersInstancesResponse =
  Operation;
export const CreatesecondaryProjectsLocationsClustersInstancesResponse =
  Operation;

export type CreatesecondaryProjectsLocationsClustersInstancesError =
  DefaultErrors;

/** Creates a new SECONDARY Instance in a given project and location. */
export const createsecondaryProjectsLocationsClustersInstances: API.OperationMethod<
  CreatesecondaryProjectsLocationsClustersInstancesRequest,
  CreatesecondaryProjectsLocationsClustersInstancesResponse,
  CreatesecondaryProjectsLocationsClustersInstancesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatesecondaryProjectsLocationsClustersInstancesRequest,
  output: CreatesecondaryProjectsLocationsClustersInstancesResponse,
  errors: [],
}));

export interface RestartProjectsLocationsClustersInstancesRequest {
  /** Required. The name of the resource. For the required format, see the comment on the Instance.name field. */
  name: string;
  /** Request body */
  body?: RestartInstanceRequest;
}

export const RestartProjectsLocationsClustersInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RestartInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/instances/{instancesId}:restart",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RestartProjectsLocationsClustersInstancesRequest>;

export type RestartProjectsLocationsClustersInstancesResponse = Operation;
export const RestartProjectsLocationsClustersInstancesResponse = Operation;

export type RestartProjectsLocationsClustersInstancesError = DefaultErrors;

/** Restart an Instance in a cluster. Imperative only. */
export const restartProjectsLocationsClustersInstances: API.OperationMethod<
  RestartProjectsLocationsClustersInstancesRequest,
  RestartProjectsLocationsClustersInstancesResponse,
  RestartProjectsLocationsClustersInstancesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RestartProjectsLocationsClustersInstancesRequest,
  output: RestartProjectsLocationsClustersInstancesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsClustersInstancesRequest {
  /** Output only. The name of the instance resource with the format: * projects/{project}/locations/{region}/clusters/{cluster_id}/instances/{instance_id} where the cluster and instance ID segments should satisfy the regex expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`, e.g. 1-63 characters of lowercase letters, numbers, and dashes, starting with a letter, and ending with a letter or number. For more details see https://google.aip.dev/122. The prefix of the instance resource name is the name of the parent resource: * projects/{project}/locations/{region}/clusters/{cluster_id} */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. */
  validateOnly?: boolean;
  /** Optional. Field mask is used to specify the fields to be overwritten in the Instance resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. If set to true, update succeeds even if instance is not found. In that case, a new instance is created and `update_mask` is ignored. */
  allowMissing?: boolean;
  /** Request body */
  body?: Instance;
}

export const PatchProjectsLocationsClustersInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
  body: Schema.optional(Instance).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/instances/{instancesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsClustersInstancesRequest>;

export type PatchProjectsLocationsClustersInstancesResponse = Operation;
export const PatchProjectsLocationsClustersInstancesResponse = Operation;

export type PatchProjectsLocationsClustersInstancesError = DefaultErrors;

/** Updates the parameters of a single Instance. */
export const patchProjectsLocationsClustersInstances: API.OperationMethod<
  PatchProjectsLocationsClustersInstancesRequest,
  PatchProjectsLocationsClustersInstancesResponse,
  PatchProjectsLocationsClustersInstancesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsClustersInstancesRequest,
  output: PatchProjectsLocationsClustersInstancesResponse,
  errors: [],
}));

export interface InjectFaultProjectsLocationsClustersInstancesRequest {
  /** Required. The name of the resource. For the required format, see the comment on the Instance.name field. */
  name: string;
  /** Request body */
  body?: InjectFaultRequest;
}

export const InjectFaultProjectsLocationsClustersInstancesRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(InjectFaultRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/instances/{instancesId}:injectFault",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InjectFaultProjectsLocationsClustersInstancesRequest>;

export type InjectFaultProjectsLocationsClustersInstancesResponse = Operation;
export const InjectFaultProjectsLocationsClustersInstancesResponse = Operation;

export type InjectFaultProjectsLocationsClustersInstancesError = DefaultErrors;

/** Injects fault in an instance. Imperative only. */
export const injectFaultProjectsLocationsClustersInstances: API.OperationMethod<
  InjectFaultProjectsLocationsClustersInstancesRequest,
  InjectFaultProjectsLocationsClustersInstancesResponse,
  InjectFaultProjectsLocationsClustersInstancesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InjectFaultProjectsLocationsClustersInstancesRequest,
  output: InjectFaultProjectsLocationsClustersInstancesResponse,
  errors: [],
}));

export interface GetConnectionInfoProjectsLocationsClustersInstancesRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The name of the parent resource. The required format is: projects/{project}/locations/{location}/clusters/{cluster}/instances/{instance} */
  parent: string;
}

export const GetConnectionInfoProjectsLocationsClustersInstancesRequest =
  Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/instances/{instancesId}/connectionInfo",
    }),
    svc,
  ) as unknown as Schema.Schema<GetConnectionInfoProjectsLocationsClustersInstancesRequest>;

export type GetConnectionInfoProjectsLocationsClustersInstancesResponse =
  ConnectionInfo;
export const GetConnectionInfoProjectsLocationsClustersInstancesResponse =
  ConnectionInfo;

export type GetConnectionInfoProjectsLocationsClustersInstancesError =
  DefaultErrors;

/** Get instance metadata used for a connection. */
export const getConnectionInfoProjectsLocationsClustersInstances: API.OperationMethod<
  GetConnectionInfoProjectsLocationsClustersInstancesRequest,
  GetConnectionInfoProjectsLocationsClustersInstancesResponse,
  GetConnectionInfoProjectsLocationsClustersInstancesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetConnectionInfoProjectsLocationsClustersInstancesRequest,
  output: GetConnectionInfoProjectsLocationsClustersInstancesResponse,
  errors: [],
}));

export interface ListProjectsLocationsClustersInstancesRequest {
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Hint for how to order the results */
  orderBy?: string;
  /** Required. The name of the parent resource. For the required format, see the comment on the Instance.name field. Additionally, you can perform an aggregated list operation by specifying a value with one of the following formats: * projects/{project}/locations/-/clusters/- * projects/{project}/locations/{region}/clusters/- */
  parent: string;
  /** Optional. Filtering results */
  filter?: string;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
}

export const ListProjectsLocationsClustersInstancesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/instances",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsClustersInstancesRequest>;

export type ListProjectsLocationsClustersInstancesResponse =
  ListInstancesResponse;
export const ListProjectsLocationsClustersInstancesResponse =
  ListInstancesResponse;

export type ListProjectsLocationsClustersInstancesError = DefaultErrors;

/** Lists Instances in a given project and location. */
export const listProjectsLocationsClustersInstances: API.PaginatedOperationMethod<
  ListProjectsLocationsClustersInstancesRequest,
  ListProjectsLocationsClustersInstancesResponse,
  ListProjectsLocationsClustersInstancesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsClustersInstancesRequest,
  output: ListProjectsLocationsClustersInstancesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsClustersInstancesRequest {
  /** The view of the instance to return. */
  view?:
    | "INSTANCE_VIEW_UNSPECIFIED"
    | "INSTANCE_VIEW_BASIC"
    | "INSTANCE_VIEW_FULL"
    | (string & {});
  /** Required. The name of the resource. For the required format, see the comment on the Instance.name field. */
  name: string;
}

export const GetProjectsLocationsClustersInstancesRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/instances/{instancesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsClustersInstancesRequest>;

export type GetProjectsLocationsClustersInstancesResponse = Instance;
export const GetProjectsLocationsClustersInstancesResponse = Instance;

export type GetProjectsLocationsClustersInstancesError = DefaultErrors;

/** Gets details of a single Instance. */
export const getProjectsLocationsClustersInstances: API.OperationMethod<
  GetProjectsLocationsClustersInstancesRequest,
  GetProjectsLocationsClustersInstancesResponse,
  GetProjectsLocationsClustersInstancesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsClustersInstancesRequest,
  output: GetProjectsLocationsClustersInstancesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsClustersInstancesRequest {
  /** Required. ID of the requesting object. */
  instanceId?: string;
  /** Required. The name of the parent resource. For the required format, see the comment on the Instance.name field. */
  parent: string;
  /** Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. */
  validateOnly?: boolean;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Instance;
}

export const CreateProjectsLocationsClustersInstancesRequest = Schema.Struct({
  instanceId: Schema.optional(Schema.String).pipe(T.HttpQuery("instanceId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Instance).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/instances",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsClustersInstancesRequest>;

export type CreateProjectsLocationsClustersInstancesResponse = Operation;
export const CreateProjectsLocationsClustersInstancesResponse = Operation;

export type CreateProjectsLocationsClustersInstancesError = DefaultErrors;

/** Creates a new Instance in a given project and location. */
export const createProjectsLocationsClustersInstances: API.OperationMethod<
  CreateProjectsLocationsClustersInstancesRequest,
  CreateProjectsLocationsClustersInstancesResponse,
  CreateProjectsLocationsClustersInstancesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsClustersInstancesRequest,
  output: CreateProjectsLocationsClustersInstancesResponse,
  errors: [],
}));

export interface FailoverProjectsLocationsClustersInstancesRequest {
  /** Required. The name of the resource. For the required format, see the comment on the Instance.name field. */
  name: string;
  /** Request body */
  body?: FailoverInstanceRequest;
}

export const FailoverProjectsLocationsClustersInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(FailoverInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/instances/{instancesId}:failover",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<FailoverProjectsLocationsClustersInstancesRequest>;

export type FailoverProjectsLocationsClustersInstancesResponse = Operation;
export const FailoverProjectsLocationsClustersInstancesResponse = Operation;

export type FailoverProjectsLocationsClustersInstancesError = DefaultErrors;

/** Forces a Failover for a highly available instance. Failover promotes the HA standby instance as the new primary. Imperative only. */
export const failoverProjectsLocationsClustersInstances: API.OperationMethod<
  FailoverProjectsLocationsClustersInstancesRequest,
  FailoverProjectsLocationsClustersInstancesResponse,
  FailoverProjectsLocationsClustersInstancesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: FailoverProjectsLocationsClustersInstancesRequest,
  output: FailoverProjectsLocationsClustersInstancesResponse,
  errors: [],
}));

export interface ListProjectsLocationsSupportedDatabaseFlagsRequest {
  /** Required. The name of the parent resource. The required format is: * projects/{project}/locations/{location} Regardless of the parent specified here, as long it is contains a valid project and location, the service will return a static list of supported flags resources. Note that we do not yet support region-specific flags. */
  parent: string;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. The scope for which supported flags are requested. If not specified, default is DATABASE. */
  scope?: "SCOPE_UNSPECIFIED" | "DATABASE" | "CONNECTION_POOL" | (string & {});
  /** Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
}

export const ListProjectsLocationsSupportedDatabaseFlagsRequest = Schema.Struct(
  {
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    scope: Schema.optional(Schema.String).pipe(T.HttpQuery("scope")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/locations/{locationsId}/supportedDatabaseFlags",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSupportedDatabaseFlagsRequest>;

export type ListProjectsLocationsSupportedDatabaseFlagsResponse =
  ListSupportedDatabaseFlagsResponse;
export const ListProjectsLocationsSupportedDatabaseFlagsResponse =
  ListSupportedDatabaseFlagsResponse;

export type ListProjectsLocationsSupportedDatabaseFlagsError = DefaultErrors;

/** Lists SupportedDatabaseFlags for a given project and location. */
export const listProjectsLocationsSupportedDatabaseFlags: API.PaginatedOperationMethod<
  ListProjectsLocationsSupportedDatabaseFlagsRequest,
  ListProjectsLocationsSupportedDatabaseFlagsResponse,
  ListProjectsLocationsSupportedDatabaseFlagsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsSupportedDatabaseFlagsRequest,
  output: ListProjectsLocationsSupportedDatabaseFlagsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
