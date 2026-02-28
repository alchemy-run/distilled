// ==========================================================================
// Backup for GKE API (gkebackup v1)
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
  name: "gkebackup",
  version: "v1",
  rootUrl: "https://gkebackup.googleapis.com/",
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

export interface RetentionPolicy {
  /** Optional. Minimum age for Backups created via this BackupPlan (in days). This field MUST be an integer value between 0-90 (inclusive). A Backup created under this BackupPlan will NOT be deletable until it reaches Backup's (create_time + backup_delete_lock_days). Updating this field of a BackupPlan does NOT affect existing Backups under it. Backups created AFTER a successful update will inherit the new value. Default: 0 (no delete blocking) */
  backupDeleteLockDays?: number;
  /** Optional. The default maximum age of a Backup created via this BackupPlan. This field MUST be an integer value >= 0 and <= 365. If specified, a Backup created under this BackupPlan will be automatically deleted after its age reaches (create_time + backup_retain_days). If not specified, Backups created under this BackupPlan will NOT be subject to automatic deletion. Updating this field does NOT affect existing Backups under it. Backups created AFTER a successful update will automatically pick up the new value. NOTE: backup_retain_days must be >= backup_delete_lock_days. If cron_schedule is defined, then this must be <= 360 * the creation interval. If rpo_config is defined, then this must be <= 360 * target_rpo_minutes / (1440minutes/day). Default: 0 (no automatic deletion) */
  backupRetainDays?: number;
  /** Optional. This flag denotes whether the retention policy of this BackupPlan is locked. If set to True, no further update is allowed on this policy, including the `locked` field itself. Default: False */
  locked?: boolean;
}

export const RetentionPolicy: Schema.Schema<RetentionPolicy> = Schema.suspend(() => Schema.Struct({
  backupDeleteLockDays: Schema.optional(Schema.Number),
  backupRetainDays: Schema.optional(Schema.Number),
  locked: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RetentionPolicy" }) as any as Schema.Schema<RetentionPolicy>;

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

export interface Gkebackup_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Gkebackup_Date: Schema.Schema<Gkebackup_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Gkebackup_Date" }) as any as Schema.Schema<Gkebackup_Date>;

export interface DayOfWeekList {
  /** Optional. A list of days of week. */
  daysOfWeek?: Array<"DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {})>;
}

export const DayOfWeekList: Schema.Schema<DayOfWeekList> = Schema.suspend(() => Schema.Struct({
  daysOfWeek: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DayOfWeekList" }) as any as Schema.Schema<DayOfWeekList>;

export interface ExclusionWindow {
  /** Optional. Specifies the start time of the window using time of the day in UTC. */
  startTime?: TimeOfDay;
  /** Required. Specifies duration of the window. Duration must be >= 5 minutes and < (target RPO - 20 minutes). Additional restrictions based on the recurrence type to allow some time for backup to happen: - single_occurrence_date: no restriction, but UI may warn about this when duration >= target RPO - daily window: duration < 24 hours - weekly window: - days of week includes all seven days of a week: duration < 24 hours - all other weekly window: duration < 168 hours (i.e., 24 * 7 hours) */
  duration?: string;
  /** No recurrence. The exclusion window occurs only once and on this date in UTC. */
  singleOccurrenceDate?: Gkebackup_Date;
  /** The exclusion window occurs every day if set to "True". Specifying this field to "False" is an error. */
  daily?: boolean;
  /** The exclusion window occurs on these days of each week in UTC. */
  daysOfWeek?: DayOfWeekList;
}

export const ExclusionWindow: Schema.Schema<ExclusionWindow> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(TimeOfDay),
  duration: Schema.optional(Schema.String),
  singleOccurrenceDate: Schema.optional(Gkebackup_Date),
  daily: Schema.optional(Schema.Boolean),
  daysOfWeek: Schema.optional(DayOfWeekList),
})).annotate({ identifier: "ExclusionWindow" }) as any as Schema.Schema<ExclusionWindow>;

export interface RpoConfig {
  /** Required. Defines the target RPO for the BackupPlan in minutes, which means the target maximum data loss in time that is acceptable for this BackupPlan. This must be at least 60, i.e., 1 hour, and at most 86400, i.e., 60 days. */
  targetRpoMinutes?: number;
  /** Optional. User specified time windows during which backup can NOT happen for this BackupPlan - backups should start and finish outside of any given exclusion window. Note: backup jobs will be scheduled to start and finish outside the duration of the window as much as possible, but running jobs will not get canceled when it runs into the window. All the time and date values in exclusion_windows entry in the API are in UTC. We only allow <=1 recurrence (daily or weekly) exclusion window for a BackupPlan while no restriction on number of single occurrence windows. */
  exclusionWindows?: Array<ExclusionWindow>;
}

export const RpoConfig: Schema.Schema<RpoConfig> = Schema.suspend(() => Schema.Struct({
  targetRpoMinutes: Schema.optional(Schema.Number),
  exclusionWindows: Schema.optional(Schema.Array(ExclusionWindow)),
})).annotate({ identifier: "RpoConfig" }) as any as Schema.Schema<RpoConfig>;

export interface Schedule {
  /** Optional. A standard [cron](https://wikipedia.com/wiki/cron) string that defines a repeating schedule for creating Backups via this BackupPlan. This is mutually exclusive with the rpo_config field since at most one schedule can be defined for a BackupPlan. If this is defined, then backup_retain_days must also be defined. Default (empty): no automatic backup creation will occur. */
  cronSchedule?: string;
  /** Optional. This flag denotes whether automatic Backup creation is paused for this BackupPlan. Default: False */
  paused?: boolean;
  /** Optional. Defines the RPO schedule configuration for this BackupPlan. This is mutually exclusive with the cron_schedule field since at most one schedule can be defined for a BackupPLan. If this is defined, then backup_retain_days must also be defined. Default (empty): no automatic backup creation will occur. */
  rpoConfig?: RpoConfig;
  /** Output only. Start time of next scheduled backup under this BackupPlan by either cron_schedule or rpo config. */
  nextScheduledBackupTime?: string;
}

export const Schedule: Schema.Schema<Schedule> = Schema.suspend(() => Schema.Struct({
  cronSchedule: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
  rpoConfig: Schema.optional(RpoConfig),
  nextScheduledBackupTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Schedule" }) as any as Schema.Schema<Schedule>;

export interface Namespaces {
  /** Optional. A list of Kubernetes Namespaces. */
  namespaces?: Array<string>;
}

export const Namespaces: Schema.Schema<Namespaces> = Schema.suspend(() => Schema.Struct({
  namespaces: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Namespaces" }) as any as Schema.Schema<Namespaces>;

export interface NamespacedName {
  /** Optional. The Namespace of the Kubernetes resource. */
  namespace?: string;
  /** Optional. The name of the Kubernetes resource. */
  name?: string;
}

export const NamespacedName: Schema.Schema<NamespacedName> = Schema.suspend(() => Schema.Struct({
  namespace: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "NamespacedName" }) as any as Schema.Schema<NamespacedName>;

export interface NamespacedNames {
  /** Optional. A list of namespaced Kubernetes resources. */
  namespacedNames?: Array<NamespacedName>;
}

export const NamespacedNames: Schema.Schema<NamespacedNames> = Schema.suspend(() => Schema.Struct({
  namespacedNames: Schema.optional(Schema.Array(NamespacedName)),
})).annotate({ identifier: "NamespacedNames" }) as any as Schema.Schema<NamespacedNames>;

export interface Label {
  /** Optional. The key/name of the label. */
  key?: string;
  /** Optional. The value of the label. */
  value?: string;
}

export const Label: Schema.Schema<Label> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "Label" }) as any as Schema.Schema<Label>;

export interface ResourceLabels {
  /** Optional. A list of Kubernetes label-value pairs. */
  resourceLabels?: Array<Label>;
}

export const ResourceLabels: Schema.Schema<ResourceLabels> = Schema.suspend(() => Schema.Struct({
  resourceLabels: Schema.optional(Schema.Array(Label)),
})).annotate({ identifier: "ResourceLabels" }) as any as Schema.Schema<ResourceLabels>;

export interface EncryptionKey {
  /** Optional. Google Cloud KMS encryption key. Format: `projects/* /locations/* /keyRings/* /cryptoKeys/*` */
  gcpKmsEncryptionKey?: string;
}

export const EncryptionKey: Schema.Schema<EncryptionKey> = Schema.suspend(() => Schema.Struct({
  gcpKmsEncryptionKey: Schema.optional(Schema.String),
})).annotate({ identifier: "EncryptionKey" }) as any as Schema.Schema<EncryptionKey>;

export interface BackupConfig {
  /** If True, include all namespaced resources */
  allNamespaces?: boolean;
  /** If set, include just the resources in the listed namespaces. */
  selectedNamespaces?: Namespaces;
  /** If set, include just the resources referenced by the listed ProtectedApplications. */
  selectedApplications?: NamespacedNames;
  /** If set, the list of labels whose constituent namespaces were included in the Backup. */
  selectedNamespaceLabels?: ResourceLabels;
  /** Optional. This flag specifies whether volume data should be backed up when PVCs are included in the scope of a Backup. Default: False */
  includeVolumeData?: boolean;
  /** Optional. This flag specifies whether Kubernetes Secret resources should be included when they fall into the scope of Backups. Default: False */
  includeSecrets?: boolean;
  /** Optional. This defines a customer managed encryption key that will be used to encrypt the "config" portion (the Kubernetes resources) of Backups created via this plan. Default (empty): Config backup artifacts will not be encrypted. */
  encryptionKey?: EncryptionKey;
  /** Optional. If false, Backups will fail when Backup for GKE detects Kubernetes configuration that is non-standard or requires additional setup to restore. Default: False */
  permissiveMode?: boolean;
}

export const BackupConfig: Schema.Schema<BackupConfig> = Schema.suspend(() => Schema.Struct({
  allNamespaces: Schema.optional(Schema.Boolean),
  selectedNamespaces: Schema.optional(Namespaces),
  selectedApplications: Schema.optional(NamespacedNames),
  selectedNamespaceLabels: Schema.optional(ResourceLabels),
  includeVolumeData: Schema.optional(Schema.Boolean),
  includeSecrets: Schema.optional(Schema.Boolean),
  encryptionKey: Schema.optional(EncryptionKey),
  permissiveMode: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "BackupConfig" }) as any as Schema.Schema<BackupConfig>;

export interface BackupPlan {
  /** Output only. Identifier. The full name of the BackupPlan resource. Format: `projects/* /locations/* /backupPlans/*` */
  name?: string;
  /** Output only. Server generated global unique identifier of [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) format. */
  uid?: string;
  /** Output only. The timestamp when this BackupPlan resource was created. */
  createTime?: string;
  /** Output only. The timestamp when this BackupPlan resource was last updated. */
  updateTime?: string;
  /** Optional. User specified descriptive string for this BackupPlan. */
  description?: string;
  /** Required. Immutable. The source cluster from which Backups will be created via this BackupPlan. Valid formats: - `projects/* /locations/* /clusters/*` - `projects/* /zones/* /clusters/*` */
  cluster?: string;
  /** Optional. RetentionPolicy governs lifecycle of Backups created under this plan. */
  retentionPolicy?: RetentionPolicy;
  /** Optional. A set of custom labels supplied by user. */
  labels?: Record<string, string>;
  /** Optional. Defines a schedule for automatic Backup creation via this BackupPlan. */
  backupSchedule?: Schedule;
  /** Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a backup plan from overwriting each other. It is strongly suggested that systems make use of the 'etag' in the read-modify-write cycle to perform BackupPlan updates in order to avoid race conditions: An `etag` is returned in the response to `GetBackupPlan`, and systems are expected to put that etag in the request to `UpdateBackupPlan` or `DeleteBackupPlan` to ensure that their change will be applied to the same version of the resource. */
  etag?: string;
  /** Optional. This flag indicates whether this BackupPlan has been deactivated. Setting this field to True locks the BackupPlan such that no further updates will be allowed (except deletes), including the deactivated field itself. It also prevents any new Backups from being created via this BackupPlan (including scheduled Backups). Default: False */
  deactivated?: boolean;
  /** Optional. Defines the configuration of Backups created via this BackupPlan. */
  backupConfig?: BackupConfig;
  /** Output only. The number of Kubernetes Pods backed up in the last successful Backup created via this BackupPlan. */
  protectedPodCount?: number;
  /** Output only. The number of user managed namespaces backed up in the last successful Backup created via this BackupPlan. */
  protectedNamespaceCount?: number;
  /** Output only. State of the BackupPlan. This State field reflects the various stages a BackupPlan can be in during the Create operation. It will be set to "DEACTIVATED" if the BackupPlan is deactivated on an Update */
  state?: "STATE_UNSPECIFIED" | "CLUSTER_PENDING" | "PROVISIONING" | "READY" | "FAILED" | "DEACTIVATED" | "DELETING" | (string & {});
  /** Output only. Human-readable description of why BackupPlan is in the current `state`. This field is only meant for human readability and should not be used programmatically as this field is not guaranteed to be consistent. */
  stateReason?: string;
  /** Output only. A number that represents the current risk level of this BackupPlan from RPO perspective with 1 being no risk and 5 being highest risk. */
  rpoRiskLevel?: number;
  /** Output only. Human-readable description of why the BackupPlan is in the current rpo_risk_level and action items if any. */
  rpoRiskReason?: string;
  /** Output only. The fully qualified name of the BackupChannel to be used to create a backup. This field is set only if the cluster being backed up is in a different project. `projects/* /locations/* /backupChannels/*` */
  backupChannel?: string;
  /** Output only. Completion time of the last successful Backup. This is sourced from a successful Backup's complete_time field. This field is added to maintain consistency with BackupPlanBinding to display last successful backup time. */
  lastSuccessfulBackupTime?: string;
}

export const BackupPlan: Schema.Schema<BackupPlan> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  cluster: Schema.optional(Schema.String),
  retentionPolicy: Schema.optional(RetentionPolicy),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  backupSchedule: Schema.optional(Schedule),
  etag: Schema.optional(Schema.String),
  deactivated: Schema.optional(Schema.Boolean),
  backupConfig: Schema.optional(BackupConfig),
  protectedPodCount: Schema.optional(Schema.Number),
  protectedNamespaceCount: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.String),
  stateReason: Schema.optional(Schema.String),
  rpoRiskLevel: Schema.optional(Schema.Number),
  rpoRiskReason: Schema.optional(Schema.String),
  backupChannel: Schema.optional(Schema.String),
  lastSuccessfulBackupTime: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupPlan" }) as any as Schema.Schema<BackupPlan>;

export interface ListBackupPlansResponse {
  /** The list of BackupPlans matching the given criteria. */
  backupPlans?: Array<BackupPlan>;
  /** A token which may be sent as page_token in a subsequent `ListBackupPlans` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackupPlansResponse: Schema.Schema<ListBackupPlansResponse> = Schema.suspend(() => Schema.Struct({
  backupPlans: Schema.optional(Schema.Array(BackupPlan)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBackupPlansResponse" }) as any as Schema.Schema<ListBackupPlansResponse>;

export interface BackupChannel {
  /** Identifier. The fully qualified name of the BackupChannel. `projects/* /locations/* /backupChannels/*` */
  name?: string;
  /** Required. Immutable. The project where Backups are allowed to be stored. The format is `projects/{projectId}` or `projects/{projectNumber}`. */
  destinationProject?: string;
  /** Output only. Server generated global unique identifier of [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) format. */
  uid?: string;
  /** Output only. The timestamp when this BackupChannel resource was created. */
  createTime?: string;
  /** Output only. The timestamp when this BackupChannel resource was last updated. */
  updateTime?: string;
  /** Optional. A set of custom labels supplied by user. */
  labels?: Record<string, string>;
  /** Optional. User specified descriptive string for this BackupChannel. */
  description?: string;
  /** Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a BackupChannel from overwriting each other. It is strongly suggested that systems make use of the 'etag' in the read-modify-write cycle to perform BackupChannel updates in order to avoid race conditions: An `etag` is returned in the response to `GetBackupChannel`, and systems are expected to put that etag in the request to `UpdateBackupChannel` or `DeleteBackupChannel` to ensure that their change will be applied to the same version of the resource. */
  etag?: string;
  /** Output only. The project_id where Backups are allowed to be stored. Example Project ID: "my-project-id". This will be an OUTPUT_ONLY field to return the project_id of the destination project. */
  destinationProjectId?: string;
}

export const BackupChannel: Schema.Schema<BackupChannel> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  destinationProject: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  destinationProjectId: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupChannel" }) as any as Schema.Schema<BackupChannel>;

export interface ListBackupChannelsResponse {
  /** The list of BackupChannels matching the given criteria. */
  backupChannels?: Array<BackupChannel>;
  /** A token which may be sent as page_token in a subsequent `ListBackupChannels` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackupChannelsResponse: Schema.Schema<ListBackupChannelsResponse> = Schema.suspend(() => Schema.Struct({
  backupChannels: Schema.optional(Schema.Array(BackupChannel)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBackupChannelsResponse" }) as any as Schema.Schema<ListBackupChannelsResponse>;

export interface BackupConfigDetails {
  /** Output only. If True, include all namespaced resources */
  allNamespaces?: boolean;
  /** Output only. If set, include just the resources in the listed namespaces. */
  selectedNamespaces?: Namespaces;
  /** Output only. If set, include just the resources referenced by the listed ProtectedApplications. */
  selectedApplications?: NamespacedNames;
  /** Output only. This flag specifies whether volume data should be backed up when PVCs are included in the scope of a Backup. Default: False */
  includeVolumeData?: boolean;
  /** Output only. This flag specifies whether Kubernetes Secret resources should be included when they fall into the scope of Backups. Default: False */
  includeSecrets?: boolean;
  /** Output only. This defines a customer managed encryption key that will be used to encrypt the "config" portion (the Kubernetes resources) of Backups created via this plan. Default (empty): Config backup artifacts will not be encrypted. */
  encryptionKey?: EncryptionKey;
}

export const BackupConfigDetails: Schema.Schema<BackupConfigDetails> = Schema.suspend(() => Schema.Struct({
  allNamespaces: Schema.optional(Schema.Boolean),
  selectedNamespaces: Schema.optional(Namespaces),
  selectedApplications: Schema.optional(NamespacedNames),
  includeVolumeData: Schema.optional(Schema.Boolean),
  includeSecrets: Schema.optional(Schema.Boolean),
  encryptionKey: Schema.optional(EncryptionKey),
})).annotate({ identifier: "BackupConfigDetails" }) as any as Schema.Schema<BackupConfigDetails>;

export interface RetentionPolicyDetails {
  /** Optional. Minimum age for Backups created via this BackupPlan (in days). This field MUST be an integer value between 0-90 (inclusive). A Backup created under this BackupPlan will NOT be deletable until it reaches Backup's (create_time + backup_delete_lock_days). Updating this field of a BackupPlan does NOT affect existing Backups under it. Backups created AFTER a successful update will inherit the new value. Default: 0 (no delete blocking) */
  backupDeleteLockDays?: number;
  /** Optional. The default maximum age of a Backup created via this BackupPlan. This field MUST be an integer value >= 0 and <= 365. If specified, a Backup created under this BackupPlan will be automatically deleted after its age reaches (create_time + backup_retain_days). If not specified, Backups created under this BackupPlan will NOT be subject to automatic deletion. Default: 0 (no automatic deletion) */
  backupRetainDays?: number;
}

export const RetentionPolicyDetails: Schema.Schema<RetentionPolicyDetails> = Schema.suspend(() => Schema.Struct({
  backupDeleteLockDays: Schema.optional(Schema.Number),
  backupRetainDays: Schema.optional(Schema.Number),
})).annotate({ identifier: "RetentionPolicyDetails" }) as any as Schema.Schema<RetentionPolicyDetails>;

export interface BackupPlanDetails {
  /** Output only. The number of Kubernetes Pods backed up in the last successful Backup created via this BackupPlan. */
  protectedPodCount?: number;
  /** Output only. State of the BackupPlan. */
  state?: "STATE_UNSPECIFIED" | "CLUSTER_PENDING" | "PROVISIONING" | "READY" | "FAILED" | "DEACTIVATED" | "DELETING" | (string & {});
  /** Output only. Completion time of the last successful Backup. This is sourced from a successful Backup's complete_time field. */
  lastSuccessfulBackupTime?: string;
  /** Output only. Start time of next scheduled backup under this BackupPlan by either cron_schedule or rpo config. This is sourced from BackupPlan. */
  nextScheduledBackupTime?: string;
  /** Output only. A number that represents the current risk level of this BackupPlan from RPO perspective with 1 being no risk and 5 being highest risk. */
  rpoRiskLevel?: number;
  /** Output only. The fully qualified name of the last successful Backup created under this BackupPlan. `projects/* /locations/* /backupPlans/* /backups/*` */
  lastSuccessfulBackup?: string;
  /** Output only. Contains details about the BackupConfig of Backups created via this BackupPlan. */
  backupConfigDetails?: BackupConfigDetails;
  /** Output only. Contains details about the RetentionPolicy of Backups created via this BackupPlan. */
  retentionPolicyDetails?: RetentionPolicyDetails;
}

export const BackupPlanDetails: Schema.Schema<BackupPlanDetails> = Schema.suspend(() => Schema.Struct({
  protectedPodCount: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.String),
  lastSuccessfulBackupTime: Schema.optional(Schema.String),
  nextScheduledBackupTime: Schema.optional(Schema.String),
  rpoRiskLevel: Schema.optional(Schema.Number),
  lastSuccessfulBackup: Schema.optional(Schema.String),
  backupConfigDetails: Schema.optional(BackupConfigDetails),
  retentionPolicyDetails: Schema.optional(RetentionPolicyDetails),
})).annotate({ identifier: "BackupPlanDetails" }) as any as Schema.Schema<BackupPlanDetails>;

export interface BackupPlanBinding {
  /** Identifier. The fully qualified name of the BackupPlanBinding. `projects/* /locations/* /backupChannels/* /backupPlanBindings/*` */
  name?: string;
  /** Output only. Server generated global unique identifier of [UUID4](https://en.wikipedia.org/wiki/Universally_unique_identifier) */
  uid?: string;
  /** Output only. The timestamp when this binding was created. */
  createTime?: string;
  /** Output only. The timestamp when this binding was created. */
  updateTime?: string;
  /** Output only. Immutable. The fully qualified name of the BackupPlan bound with the parent BackupChannel. `projects/* /locations/* /backupPlans/{backup_plan}` */
  backupPlan?: string;
  /** Output only. Immutable. The fully qualified name of the cluster that is being backed up Valid formats: - `projects/* /locations/* /clusters/*` - `projects/* /zones/* /clusters/*` */
  cluster?: string;
  /** Output only. Contains details about the backup plan/backup. */
  backupPlanDetails?: BackupPlanDetails;
  /** Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a BackupPlanBinding from overwriting each other. It is strongly suggested that systems make use of the 'etag' in the read-modify-write cycle to perform BackupPlanBinding updates in order to avoid race conditions: An `etag` is returned in the response to `GetBackupPlanBinding`, and systems are expected to put that etag in the request to `UpdateBackupPlanBinding` or `DeleteBackupPlanBinding` to ensure that their change will be applied to the same version of the resource. */
  etag?: string;
}

export const BackupPlanBinding: Schema.Schema<BackupPlanBinding> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  backupPlan: Schema.optional(Schema.String),
  cluster: Schema.optional(Schema.String),
  backupPlanDetails: Schema.optional(BackupPlanDetails),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupPlanBinding" }) as any as Schema.Schema<BackupPlanBinding>;

export interface ListBackupPlanBindingsResponse {
  /** The list of BackupPlanBindings matching the given criteria. */
  backupPlanBindings?: Array<BackupPlanBinding>;
  /** A token which may be sent as page_token in a subsequent `ListBackupPlanBindingss` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackupPlanBindingsResponse: Schema.Schema<ListBackupPlanBindingsResponse> = Schema.suspend(() => Schema.Struct({
  backupPlanBindings: Schema.optional(Schema.Array(BackupPlanBinding)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBackupPlanBindingsResponse" }) as any as Schema.Schema<ListBackupPlanBindingsResponse>;

export interface ClusterMetadata {
  /** Output only. The source cluster from which this Backup was created. Valid formats: - `projects/* /locations/* /clusters/*` - `projects/* /zones/* /clusters/*` This is inherited from the parent BackupPlan's cluster field. */
  cluster?: string;
  /** Output only. The Kubernetes server version of the source cluster. */
  k8sVersion?: string;
  /** Output only. A list of the Backup for GKE CRD versions found in the cluster. */
  backupCrdVersions?: Record<string, string>;
  /** Output only. GKE version */
  gkeVersion?: string;
  /** Output only. Anthos version */
  anthosVersion?: string;
}

export const ClusterMetadata: Schema.Schema<ClusterMetadata> = Schema.suspend(() => Schema.Struct({
  cluster: Schema.optional(Schema.String),
  k8sVersion: Schema.optional(Schema.String),
  backupCrdVersions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  gkeVersion: Schema.optional(Schema.String),
  anthosVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "ClusterMetadata" }) as any as Schema.Schema<ClusterMetadata>;

export interface TroubleshootingInfo {
  /** Output only. Unique code for each backup/restore operation failure message which helps user identify the failure. */
  stateReasonCode?: string;
  /** Output only. URL for the troubleshooting doc which will help the user fix the failing backup/restore operation. */
  stateReasonUri?: string;
}

export const TroubleshootingInfo: Schema.Schema<TroubleshootingInfo> = Schema.suspend(() => Schema.Struct({
  stateReasonCode: Schema.optional(Schema.String),
  stateReasonUri: Schema.optional(Schema.String),
})).annotate({ identifier: "TroubleshootingInfo" }) as any as Schema.Schema<TroubleshootingInfo>;

export interface Backup {
  /** Output only. Identifier. The fully qualified name of the Backup. `projects/* /locations/* /backupPlans/* /backups/*` */
  name?: string;
  /** Output only. Server generated global unique identifier of [UUID4](https://en.wikipedia.org/wiki/Universally_unique_identifier) */
  uid?: string;
  /** Output only. The timestamp when this Backup resource was created. */
  createTime?: string;
  /** Output only. The timestamp when this Backup resource was last updated. */
  updateTime?: string;
  /** Output only. This flag indicates whether this Backup resource was created manually by a user or via a schedule in the BackupPlan. A value of True means that the Backup was created manually. */
  manual?: boolean;
  /** Optional. A set of custom labels supplied by user. */
  labels?: Record<string, string>;
  /** Optional. Minimum age for this Backup (in days). If this field is set to a non-zero value, the Backup will be "locked" against deletion (either manual or automatic deletion) for the number of days provided (measured from the creation time of the Backup). MUST be an integer value between 0-90 (inclusive). Defaults to parent BackupPlan's backup_delete_lock_days setting and may only be increased (either at creation time or in a subsequent update). */
  deleteLockDays?: number;
  /** Output only. The time at which an existing delete lock will expire for this backup (calculated from create_time + delete_lock_days). */
  deleteLockExpireTime?: string;
  /** Optional. The age (in days) after which this Backup will be automatically deleted. Must be an integer value >= 0: - If 0, no automatic deletion will occur for this Backup. - If not 0, this must be >= delete_lock_days and <= 365. Once a Backup is created, this value may only be increased. Defaults to the parent BackupPlan's backup_retain_days value. */
  retainDays?: number;
  /** Output only. The time at which this Backup will be automatically deleted (calculated from create_time + retain_days). */
  retainExpireTime?: string;
  /** Output only. The customer managed encryption key that was used to encrypt the Backup's artifacts. Inherited from the parent BackupPlan's encryption_key value. */
  encryptionKey?: EncryptionKey;
  /** Output only. If True, all namespaces were included in the Backup. */
  allNamespaces?: boolean;
  /** Output only. If set, the list of namespaces that were included in the Backup. */
  selectedNamespaces?: Namespaces;
  /** Output only. If set, the list of ProtectedApplications whose resources were included in the Backup. */
  selectedApplications?: NamespacedNames;
  /** Output only. If set, the list of labels whose constituent namespaces were included in the Backup. */
  selectedNamespaceLabels?: ResourceLabels;
  /** Output only. Whether or not the Backup contains volume data. Controlled by the parent BackupPlan's include_volume_data value. */
  containsVolumeData?: boolean;
  /** Output only. Whether or not the Backup contains Kubernetes Secrets. Controlled by the parent BackupPlan's include_secrets value. */
  containsSecrets?: boolean;
  /** Output only. Information about the GKE cluster from which this Backup was created. */
  clusterMetadata?: ClusterMetadata;
  /** Output only. Current state of the Backup */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | "DELETING" | (string & {});
  /** Output only. Human-readable description of why the backup is in the current `state`. This field is only meant for human readability and should not be used programmatically as this field is not guaranteed to be consistent. */
  stateReason?: string;
  /** Output only. Information about the troubleshooting steps which will provide debugging information to the end users. */
  troubleshootingInfo?: TroubleshootingInfo;
  /** Output only. Completion time of the Backup */
  completeTime?: string;
  /** Output only. The total number of Kubernetes resources included in the Backup. */
  resourceCount?: number;
  /** Output only. The total number of volume backups contained in the Backup. */
  volumeCount?: number;
  /** Output only. The total size of the Backup in bytes = config backup size + sum(volume backup sizes) */
  sizeBytes?: string;
  /** Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a backup from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform backup updates in order to avoid race conditions: An `etag` is returned in the response to `GetBackup`, and systems are expected to put that etag in the request to `UpdateBackup` or `DeleteBackup` to ensure that their change will be applied to the same version of the resource. */
  etag?: string;
  /** Optional. User specified descriptive string for this Backup. */
  description?: string;
  /** Output only. The total number of Kubernetes Pods contained in the Backup. */
  podCount?: number;
  /** Output only. The total number of user managed namespaces contained in the Backup. */
  namespaceCount?: number;
  /** Output only. The size of the config backup in bytes. */
  configBackupSizeBytes?: string;
  /** Output only. If false, Backup will fail when Backup for GKE detects Kubernetes configuration that is non-standard or requires additional setup to restore. Inherited from the parent BackupPlan's permissive_mode value. */
  permissiveMode?: boolean;
  /** Output only. [Output Only] Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. [Output Only] Reserved for future use. */
  satisfiesPzi?: boolean;
}

export const Backup: Schema.Schema<Backup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  manual: Schema.optional(Schema.Boolean),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  deleteLockDays: Schema.optional(Schema.Number),
  deleteLockExpireTime: Schema.optional(Schema.String),
  retainDays: Schema.optional(Schema.Number),
  retainExpireTime: Schema.optional(Schema.String),
  encryptionKey: Schema.optional(EncryptionKey),
  allNamespaces: Schema.optional(Schema.Boolean),
  selectedNamespaces: Schema.optional(Namespaces),
  selectedApplications: Schema.optional(NamespacedNames),
  selectedNamespaceLabels: Schema.optional(ResourceLabels),
  containsVolumeData: Schema.optional(Schema.Boolean),
  containsSecrets: Schema.optional(Schema.Boolean),
  clusterMetadata: Schema.optional(ClusterMetadata),
  state: Schema.optional(Schema.String),
  stateReason: Schema.optional(Schema.String),
  troubleshootingInfo: Schema.optional(TroubleshootingInfo),
  completeTime: Schema.optional(Schema.String),
  resourceCount: Schema.optional(Schema.Number),
  volumeCount: Schema.optional(Schema.Number),
  sizeBytes: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  podCount: Schema.optional(Schema.Number),
  namespaceCount: Schema.optional(Schema.Number),
  configBackupSizeBytes: Schema.optional(Schema.String),
  permissiveMode: Schema.optional(Schema.Boolean),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Backup" }) as any as Schema.Schema<Backup>;

export interface ListBackupsResponse {
  /** The list of Backups matching the given criteria. */
  backups?: Array<Backup>;
  /** A token which may be sent as page_token in a subsequent `ListBackups` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackupsResponse: Schema.Schema<ListBackupsResponse> = Schema.suspend(() => Schema.Struct({
  backups: Schema.optional(Schema.Array(Backup)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBackupsResponse" }) as any as Schema.Schema<ListBackupsResponse>;

export interface VolumeBackup {
  /** Output only. The full name of the VolumeBackup resource. Format: `projects/* /locations/* /backupPlans/* /backups/* /volumeBackups/*`. */
  name?: string;
  /** Output only. Server generated global unique identifier of [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) format. */
  uid?: string;
  /** Output only. The timestamp when this VolumeBackup resource was created. */
  createTime?: string;
  /** Output only. The timestamp when this VolumeBackup resource was last updated. */
  updateTime?: string;
  /** Output only. A reference to the source Kubernetes PVC from which this VolumeBackup was created. */
  sourcePvc?: NamespacedName;
  /** Output only. A storage system-specific opaque handle to the underlying volume backup. */
  volumeBackupHandle?: string;
  /** Output only. The format used for the volume backup. */
  format?: "VOLUME_BACKUP_FORMAT_UNSPECIFIED" | "GCE_PERSISTENT_DISK" | (string & {});
  /** Output only. The aggregate size of the underlying artifacts associated with this VolumeBackup in the backup storage. This may change over time when multiple backups of the same volume share the same backup storage location. In particular, this is likely to increase in size when the immediately preceding backup of the same volume is deleted. */
  storageBytes?: string;
  /** Output only. The minimum size of the disk to which this VolumeBackup can be restored. */
  diskSizeBytes?: string;
  /** Output only. The timestamp when the associated underlying volume backup operation completed. */
  completeTime?: string;
  /** Output only. The current state of this VolumeBackup. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "SNAPSHOTTING" | "UPLOADING" | "SUCCEEDED" | "FAILED" | "DELETING" | "CLEANED_UP" | (string & {});
  /** Output only. A human readable message explaining why the VolumeBackup is in its current state. This field is only meant for human consumption and should not be used programmatically as this field is not guaranteed to be consistent. */
  stateMessage?: string;
  /** Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a volume backup from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform volume backup updates in order to avoid race conditions. */
  etag?: string;
  /** Output only. [Output Only] Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. [Output Only] Reserved for future use. */
  satisfiesPzi?: boolean;
}

export const VolumeBackup: Schema.Schema<VolumeBackup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  sourcePvc: Schema.optional(NamespacedName),
  volumeBackupHandle: Schema.optional(Schema.String),
  format: Schema.optional(Schema.String),
  storageBytes: Schema.optional(Schema.String),
  diskSizeBytes: Schema.optional(Schema.String),
  completeTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "VolumeBackup" }) as any as Schema.Schema<VolumeBackup>;

export interface ListVolumeBackupsResponse {
  /** The list of VolumeBackups matching the given criteria. */
  volumeBackups?: Array<VolumeBackup>;
  /** A token which may be sent as page_token in a subsequent `ListVolumeBackups` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. */
  nextPageToken?: string;
}

export const ListVolumeBackupsResponse: Schema.Schema<ListVolumeBackupsResponse> = Schema.suspend(() => Schema.Struct({
  volumeBackups: Schema.optional(Schema.Array(VolumeBackup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListVolumeBackupsResponse" }) as any as Schema.Schema<ListVolumeBackupsResponse>;

export interface GroupKind {
  /** Optional. API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io", "storage.k8s.io", etc. Note: use empty string for core API group. */
  resourceGroup?: string;
  /** Optional. Kind of a Kubernetes resource, must be in UpperCamelCase (PascalCase) and singular form. E.g. "CustomResourceDefinition", "StorageClass", etc. */
  resourceKind?: string;
}

export const GroupKind: Schema.Schema<GroupKind> = Schema.suspend(() => Schema.Struct({
  resourceGroup: Schema.optional(Schema.String),
  resourceKind: Schema.optional(Schema.String),
})).annotate({ identifier: "GroupKind" }) as any as Schema.Schema<GroupKind>;

export interface ClusterResourceRestoreScope {
  /** Optional. A list of cluster-scoped resource group kinds to restore from the backup. If specified, only the selected resources will be restored. Mutually exclusive to any other field in the message. */
  selectedGroupKinds?: Array<GroupKind>;
  /** Optional. A list of cluster-scoped resource group kinds to NOT restore from the backup. If specified, all valid cluster-scoped resources will be restored except for those specified in the list. Mutually exclusive to any other field in the message. */
  excludedGroupKinds?: Array<GroupKind>;
  /** Optional. If True, all valid cluster-scoped resources will be restored. Mutually exclusive to any other field in the message. */
  allGroupKinds?: boolean;
  /** Optional. If True, no cluster-scoped resources will be restored. This has the same restore scope as if the message is not defined. Mutually exclusive to any other field in the message. */
  noGroupKinds?: boolean;
}

export const ClusterResourceRestoreScope: Schema.Schema<ClusterResourceRestoreScope> = Schema.suspend(() => Schema.Struct({
  selectedGroupKinds: Schema.optional(Schema.Array(GroupKind)),
  excludedGroupKinds: Schema.optional(Schema.Array(GroupKind)),
  allGroupKinds: Schema.optional(Schema.Boolean),
  noGroupKinds: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ClusterResourceRestoreScope" }) as any as Schema.Schema<ClusterResourceRestoreScope>;

export interface SubstitutionRule {
  /** Optional. (Filtering parameter) Any resource subject to substitution must be contained within one of the listed Kubernetes Namespace in the Backup. If this field is not provided, no namespace filtering will be performed (all resources in all Namespaces, including all cluster-scoped resources, will be candidates for substitution). To mix cluster-scoped and namespaced resources in the same rule, use an empty string ("") as one of the target namespaces. */
  targetNamespaces?: Array<string>;
  /** Optional. (Filtering parameter) Any resource subject to substitution must belong to one of the listed "types". If this field is not provided, no type filtering will be performed (all resources of all types matching previous filtering parameters will be candidates for substitution). */
  targetGroupKinds?: Array<GroupKind>;
  /** Required. This is a [JSONPath] (https://kubernetes.io/docs/reference/kubectl/jsonpath/) expression that matches specific fields of candidate resources and it operates as both a filtering parameter (resources that are not matched with this expression will not be candidates for substitution) as well as a field identifier (identifies exactly which fields out of the candidate resources will be modified). */
  targetJsonPath?: string;
  /** Optional. (Filtering parameter) This is a [regular expression] (https://en.wikipedia.org/wiki/Regular_expression) that is compared against the fields matched by the target_json_path expression (and must also have passed the previous filters). Substitution will not be performed against fields whose value does not match this expression. If this field is NOT specified, then ALL fields matched by the target_json_path expression will undergo substitution. Note that an empty (e.g., "", rather than unspecified) value for this field will only match empty fields. */
  originalValuePattern?: string;
  /** Optional. This is the new value to set for any fields that pass the filtering and selection criteria. To remove a value from a Kubernetes resource, either leave this field unspecified, or set it to the empty string (""). */
  newValue?: string;
}

export const SubstitutionRule: Schema.Schema<SubstitutionRule> = Schema.suspend(() => Schema.Struct({
  targetNamespaces: Schema.optional(Schema.Array(Schema.String)),
  targetGroupKinds: Schema.optional(Schema.Array(GroupKind)),
  targetJsonPath: Schema.optional(Schema.String),
  originalValuePattern: Schema.optional(Schema.String),
  newValue: Schema.optional(Schema.String),
})).annotate({ identifier: "SubstitutionRule" }) as any as Schema.Schema<SubstitutionRule>;

export interface TransformationRuleAction {
  /** Required. op specifies the operation to perform. */
  op?: "OP_UNSPECIFIED" | "REMOVE" | "MOVE" | "COPY" | "ADD" | "TEST" | "REPLACE" | (string & {});
  /** Optional. A string containing a JSON Pointer value that references the location in the target document to move the value from. */
  fromPath?: string;
  /** Optional. A string containing a JSON-Pointer value that references a location within the target document where the operation is performed. */
  path?: string;
  /** Optional. A string that specifies the desired value in string format to use for transformation. */
  value?: string;
}

export const TransformationRuleAction: Schema.Schema<TransformationRuleAction> = Schema.suspend(() => Schema.Struct({
  op: Schema.optional(Schema.String),
  fromPath: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "TransformationRuleAction" }) as any as Schema.Schema<TransformationRuleAction>;

export interface ResourceFilter {
  /** Optional. (Filtering parameter) Any resource subject to transformation must be contained within one of the listed Kubernetes Namespace in the Backup. If this field is not provided, no namespace filtering will be performed (all resources in all Namespaces, including all cluster-scoped resources, will be candidates for transformation). */
  namespaces?: Array<string>;
  /** Optional. (Filtering parameter) Any resource subject to transformation must belong to one of the listed "types". If this field is not provided, no type filtering will be performed (all resources of all types matching previous filtering parameters will be candidates for transformation). */
  groupKinds?: Array<GroupKind>;
  /** Optional. This is a [JSONPath] (https://github.com/json-path/JsonPath/blob/master/README.md) expression that matches specific fields of candidate resources and it operates as a filtering parameter (resources that are not matched with this expression will not be candidates for transformation). */
  jsonPath?: string;
}

export const ResourceFilter: Schema.Schema<ResourceFilter> = Schema.suspend(() => Schema.Struct({
  namespaces: Schema.optional(Schema.Array(Schema.String)),
  groupKinds: Schema.optional(Schema.Array(GroupKind)),
  jsonPath: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceFilter" }) as any as Schema.Schema<ResourceFilter>;

export interface TransformationRule {
  /** Required. A list of transformation rule actions to take against candidate resources. Actions are executed in order defined - this order matters, as they could potentially interfere with each other and the first operation could affect the outcome of the second operation. */
  fieldActions?: Array<TransformationRuleAction>;
  /** Optional. This field is used to specify a set of fields that should be used to determine which resources in backup should be acted upon by the supplied transformation rule actions, and this will ensure that only specific resources are affected by transformation rule actions. */
  resourceFilter?: ResourceFilter;
  /** Optional. The description is a user specified string description of the transformation rule. */
  description?: string;
}

export const TransformationRule: Schema.Schema<TransformationRule> = Schema.suspend(() => Schema.Struct({
  fieldActions: Schema.optional(Schema.Array(TransformationRuleAction)),
  resourceFilter: Schema.optional(ResourceFilter),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "TransformationRule" }) as any as Schema.Schema<TransformationRule>;

export interface VolumeDataRestorePolicyBinding {
  /** Required. The VolumeDataRestorePolicy to apply when restoring volumes in scope. */
  policy?: "VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED" | "RESTORE_VOLUME_DATA_FROM_BACKUP" | "REUSE_VOLUME_HANDLE_FROM_BACKUP" | "NO_VOLUME_DATA_RESTORATION" | (string & {});
  /** The volume type, as determined by the PVC's bound PV, to apply the policy to. */
  volumeType?: "VOLUME_TYPE_UNSPECIFIED" | "GCE_PERSISTENT_DISK" | (string & {});
}

export const VolumeDataRestorePolicyBinding: Schema.Schema<VolumeDataRestorePolicyBinding> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Schema.String),
  volumeType: Schema.optional(Schema.String),
})).annotate({ identifier: "VolumeDataRestorePolicyBinding" }) as any as Schema.Schema<VolumeDataRestorePolicyBinding>;

export interface GroupKindDependency {
  /** Required. The satisfying group kind must be restored first in order to satisfy the dependency. */
  satisfying?: GroupKind;
  /** Required. The requiring group kind requires that the other group kind be restored first. */
  requiring?: GroupKind;
}

export const GroupKindDependency: Schema.Schema<GroupKindDependency> = Schema.suspend(() => Schema.Struct({
  satisfying: Schema.optional(GroupKind),
  requiring: Schema.optional(GroupKind),
})).annotate({ identifier: "GroupKindDependency" }) as any as Schema.Schema<GroupKindDependency>;

export interface RestoreOrder {
  /** Optional. Contains a list of group kind dependency pairs provided by the customer, that is used by Backup for GKE to generate a group kind restore order. */
  groupKindDependencies?: Array<GroupKindDependency>;
}

export const RestoreOrder: Schema.Schema<RestoreOrder> = Schema.suspend(() => Schema.Struct({
  groupKindDependencies: Schema.optional(Schema.Array(GroupKindDependency)),
})).annotate({ identifier: "RestoreOrder" }) as any as Schema.Schema<RestoreOrder>;

export interface RestoreConfig {
  /** Optional. Specifies the mechanism to be used to restore volume data. Default: VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED (will be treated as NO_VOLUME_DATA_RESTORATION). */
  volumeDataRestorePolicy?: "VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED" | "RESTORE_VOLUME_DATA_FROM_BACKUP" | "REUSE_VOLUME_HANDLE_FROM_BACKUP" | "NO_VOLUME_DATA_RESTORATION" | (string & {});
  /** Optional. Defines the behavior for handling the situation where cluster-scoped resources being restored already exist in the target cluster. This MUST be set to a value other than CLUSTER_RESOURCE_CONFLICT_POLICY_UNSPECIFIED if cluster_resource_restore_scope is not empty. */
  clusterResourceConflictPolicy?: "CLUSTER_RESOURCE_CONFLICT_POLICY_UNSPECIFIED" | "USE_EXISTING_VERSION" | "USE_BACKUP_VERSION" | (string & {});
  /** Optional. Defines the behavior for handling the situation where sets of namespaced resources being restored already exist in the target cluster. This MUST be set to a value other than NAMESPACED_RESOURCE_RESTORE_MODE_UNSPECIFIED. */
  namespacedResourceRestoreMode?: "NAMESPACED_RESOURCE_RESTORE_MODE_UNSPECIFIED" | "DELETE_AND_RESTORE" | "FAIL_ON_CONFLICT" | "MERGE_SKIP_ON_CONFLICT" | "MERGE_REPLACE_VOLUME_ON_CONFLICT" | "MERGE_REPLACE_ON_CONFLICT" | (string & {});
  /** Optional. Identifies the cluster-scoped resources to restore from the Backup. Not specifying it means NO cluster resource will be restored. */
  clusterResourceRestoreScope?: ClusterResourceRestoreScope;
  /** Restore all namespaced resources in the Backup if set to "True". Specifying this field to "False" is an error. */
  allNamespaces?: boolean;
  /** A list of selected Namespaces to restore from the Backup. The listed Namespaces and all resources contained in them will be restored. */
  selectedNamespaces?: Namespaces;
  /** A list of selected ProtectedApplications to restore. The listed ProtectedApplications and all the resources to which they refer will be restored. */
  selectedApplications?: NamespacedNames;
  /** Do not restore any namespaced resources if set to "True". Specifying this field to "False" is not allowed. */
  noNamespaces?: boolean;
  /** A list of selected namespaces excluded from restoration. All namespaces except those in this list will be restored. */
  excludedNamespaces?: Namespaces;
  /** Optional. A list of transformation rules to be applied against Kubernetes resources as they are selected for restoration from a Backup. Rules are executed in order defined - this order matters, as changes made by a rule may impact the filtering logic of subsequent rules. An empty list means no substitution will occur. */
  substitutionRules?: Array<SubstitutionRule>;
  /** Optional. A list of transformation rules to be applied against Kubernetes resources as they are selected for restoration from a Backup. Rules are executed in order defined - this order matters, as changes made by a rule may impact the filtering logic of subsequent rules. An empty list means no transformation will occur. */
  transformationRules?: Array<TransformationRule>;
  /** Optional. A table that binds volumes by their scope to a restore policy. Bindings must have a unique scope. Any volumes not scoped in the bindings are subject to the policy defined in volume_data_restore_policy. */
  volumeDataRestorePolicyBindings?: Array<VolumeDataRestorePolicyBinding>;
  /** Optional. RestoreOrder contains custom ordering to use on a Restore. */
  restoreOrder?: RestoreOrder;
}

export const RestoreConfig: Schema.Schema<RestoreConfig> = Schema.suspend(() => Schema.Struct({
  volumeDataRestorePolicy: Schema.optional(Schema.String),
  clusterResourceConflictPolicy: Schema.optional(Schema.String),
  namespacedResourceRestoreMode: Schema.optional(Schema.String),
  clusterResourceRestoreScope: Schema.optional(ClusterResourceRestoreScope),
  allNamespaces: Schema.optional(Schema.Boolean),
  selectedNamespaces: Schema.optional(Namespaces),
  selectedApplications: Schema.optional(NamespacedNames),
  noNamespaces: Schema.optional(Schema.Boolean),
  excludedNamespaces: Schema.optional(Namespaces),
  substitutionRules: Schema.optional(Schema.Array(SubstitutionRule)),
  transformationRules: Schema.optional(Schema.Array(TransformationRule)),
  volumeDataRestorePolicyBindings: Schema.optional(Schema.Array(VolumeDataRestorePolicyBinding)),
  restoreOrder: Schema.optional(RestoreOrder),
})).annotate({ identifier: "RestoreConfig" }) as any as Schema.Schema<RestoreConfig>;

export interface RestorePlan {
  /** Output only. Identifier. The full name of the RestorePlan resource. Format: `projects/* /locations/* /restorePlans/*`. */
  name?: string;
  /** Output only. Server generated global unique identifier of [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) format. */
  uid?: string;
  /** Output only. The timestamp when this RestorePlan resource was created. */
  createTime?: string;
  /** Output only. The timestamp when this RestorePlan resource was last updated. */
  updateTime?: string;
  /** Optional. User specified descriptive string for this RestorePlan. */
  description?: string;
  /** Required. Immutable. A reference to the BackupPlan from which Backups may be used as the source for Restores created via this RestorePlan. Format: `projects/* /locations/* /backupPlans/*`. */
  backupPlan?: string;
  /** Required. Immutable. The target cluster into which Restores created via this RestorePlan will restore data. NOTE: the cluster's region must be the same as the RestorePlan. Valid formats: - `projects/* /locations/* /clusters/*` - `projects/* /zones/* /clusters/*` */
  cluster?: string;
  /** Required. Configuration of Restores created via this RestorePlan. */
  restoreConfig?: RestoreConfig;
  /** Optional. A set of custom labels supplied by user. */
  labels?: Record<string, string>;
  /** Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a restore from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform restore updates in order to avoid race conditions: An `etag` is returned in the response to `GetRestorePlan`, and systems are expected to put that etag in the request to `UpdateRestorePlan` or `DeleteRestorePlan` to ensure that their change will be applied to the same version of the resource. */
  etag?: string;
  /** Output only. State of the RestorePlan. This State field reflects the various stages a RestorePlan can be in during the Create operation. */
  state?: "STATE_UNSPECIFIED" | "CLUSTER_PENDING" | "READY" | "FAILED" | "DELETING" | (string & {});
  /** Output only. Human-readable description of why RestorePlan is in the current `state`. This field is only meant for human readability and should not be used programmatically as this field is not guaranteed to be consistent. */
  stateReason?: string;
  /** Output only. The fully qualified name of the RestoreChannel to be used to create a RestorePlan. This field is set only if the `backup_plan` is in a different project than the RestorePlan. Format: `projects/* /locations/* /restoreChannels/*` */
  restoreChannel?: string;
}

export const RestorePlan: Schema.Schema<RestorePlan> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  backupPlan: Schema.optional(Schema.String),
  cluster: Schema.optional(Schema.String),
  restoreConfig: Schema.optional(RestoreConfig),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  stateReason: Schema.optional(Schema.String),
  restoreChannel: Schema.optional(Schema.String),
})).annotate({ identifier: "RestorePlan" }) as any as Schema.Schema<RestorePlan>;

export interface ListRestorePlansResponse {
  /** The list of RestorePlans matching the given criteria. */
  restorePlans?: Array<RestorePlan>;
  /** A token which may be sent as page_token in a subsequent `ListRestorePlans` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListRestorePlansResponse: Schema.Schema<ListRestorePlansResponse> = Schema.suspend(() => Schema.Struct({
  restorePlans: Schema.optional(Schema.Array(RestorePlan)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListRestorePlansResponse" }) as any as Schema.Schema<ListRestorePlansResponse>;

export interface RestoreChannel {
  /** Identifier. The fully qualified name of the RestoreChannel. `projects/* /locations/* /restoreChannels/*` */
  name?: string;
  /** Required. Immutable. The project into which the backups will be restored. The format is `projects/{projectId}` or `projects/{projectNumber}`. */
  destinationProject?: string;
  /** Output only. Server generated global unique identifier of [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) format. */
  uid?: string;
  /** Output only. The timestamp when this RestoreChannel was created. */
  createTime?: string;
  /** Output only. The timestamp when this RestoreChannel was last updated. */
  updateTime?: string;
  /** Optional. A set of custom labels supplied by user. */
  labels?: Record<string, string>;
  /** Optional. User specified descriptive string for this RestoreChannel. */
  description?: string;
  /** Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a RestoreChannel from overwriting each other. It is strongly suggested that systems make use of the 'etag' in the read-modify-write cycle to perform RestoreChannel updates in order to avoid race conditions: An `etag` is returned in the response to `GetRestoreChannel`, and systems are expected to put that etag in the request to `UpdateRestoreChannel` or `DeleteRestoreChannel` to ensure that their change will be applied to the same version of the resource. */
  etag?: string;
  /** Output only. The project_id where backups will be restored. Example Project ID: "my-project-id". This will be an OUTPUT_ONLY field to return the project_id of the destination project. */
  destinationProjectId?: string;
}

export const RestoreChannel: Schema.Schema<RestoreChannel> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  destinationProject: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  destinationProjectId: Schema.optional(Schema.String),
})).annotate({ identifier: "RestoreChannel" }) as any as Schema.Schema<RestoreChannel>;

export interface ListRestoreChannelsResponse {
  /** The list of RestoreChannels matching the given criteria. */
  restoreChannels?: Array<RestoreChannel>;
  /** A token which may be sent as page_token in a subsequent `ListRestoreChannels` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListRestoreChannelsResponse: Schema.Schema<ListRestoreChannelsResponse> = Schema.suspend(() => Schema.Struct({
  restoreChannels: Schema.optional(Schema.Array(RestoreChannel)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListRestoreChannelsResponse" }) as any as Schema.Schema<ListRestoreChannelsResponse>;

export interface RestorePlanBinding {
  /** Identifier. The fully qualified name of the RestorePlanBinding. `projects/* /locations/* /restoreChannels/* /restorePlanBindings/*` */
  name?: string;
  /** Output only. Server generated global unique identifier of [UUID4](https://en.wikipedia.org/wiki/Universally_unique_identifier) */
  uid?: string;
  /** Output only. The timestamp when this binding was created. */
  createTime?: string;
  /** Output only. The timestamp when this binding was created. */
  updateTime?: string;
  /** Output only. The fully qualified name of the RestorePlan bound to this RestoreChannel. `projects/* /locations/* /restorePlans/{restore_plan}` */
  restorePlan?: string;
  /** Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a RestorePlanBinding from overwriting each other. It is strongly suggested that systems make use of the 'etag' in the read-modify-write cycle to perform RestorePlanBinding updates in order to avoid race conditions: An `etag` is returned in the response to `GetRestorePlanBinding`, and systems are expected to put that etag in the request to `UpdateRestorePlanBinding` or `DeleteRestorePlanBinding` to ensure that their change will be applied to the same version of the resource. */
  etag?: string;
  /** Output only. The fully qualified name of the BackupPlan bound to the specified RestorePlan. `projects/* /locations/* /backukpPlans/{backup_plan}` */
  backupPlan?: string;
}

export const RestorePlanBinding: Schema.Schema<RestorePlanBinding> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  restorePlan: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  backupPlan: Schema.optional(Schema.String),
})).annotate({ identifier: "RestorePlanBinding" }) as any as Schema.Schema<RestorePlanBinding>;

export interface ListRestorePlanBindingsResponse {
  /** The list of RestorePlanBindings matching the given criteria. */
  restorePlanBindings?: Array<RestorePlanBinding>;
  /** A token which may be sent as page_token in a subsequent `ListRestorePlanBindings` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. */
  nextPageToken?: string;
  /** Unordered list. Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListRestorePlanBindingsResponse: Schema.Schema<ListRestorePlanBindingsResponse> = Schema.suspend(() => Schema.Struct({
  restorePlanBindings: Schema.optional(Schema.Array(RestorePlanBinding)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListRestorePlanBindingsResponse" }) as any as Schema.Schema<ListRestorePlanBindingsResponse>;

export interface ResourceSelector {
  /** Optional. Selects resources using their Kubernetes GroupKinds. If specified, only resources of provided GroupKind will be selected. */
  groupKind?: GroupKind;
  /** Optional. Selects resources using their resource names. If specified, only resources with the provided name will be selected. */
  name?: string;
  /** Optional. Selects resources using their namespaces. This only applies to namespace scoped resources and cannot be used for selecting cluster scoped resources. If specified, only resources in the provided namespace will be selected. If not specified, the filter will apply to both cluster scoped and namespace scoped resources (e.g. name or label). The [Namespace](https://pkg.go.dev/k8s.io/api/core/v1#Namespace) resource itself will be restored if and only if any resources within the namespace are restored. */
  namespace?: string;
  /** Optional. Selects resources using Kubernetes [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/). If specified, a resource will be selected if and only if the resource has all of the provided labels and all the label values match. */
  labels?: Record<string, string>;
}

export const ResourceSelector: Schema.Schema<ResourceSelector> = Schema.suspend(() => Schema.Struct({
  groupKind: Schema.optional(GroupKind),
  name: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "ResourceSelector" }) as any as Schema.Schema<ResourceSelector>;

export interface Filter {
  /** Optional. Selects resources for restoration. If specified, only resources which match `inclusion_filters` will be selected for restoration. A resource will be selected if it matches any `ResourceSelector` of the `inclusion_filters`. */
  inclusionFilters?: Array<ResourceSelector>;
  /** Optional. Excludes resources from restoration. If specified, a resource will not be restored if it matches any `ResourceSelector` of the `exclusion_filters`. */
  exclusionFilters?: Array<ResourceSelector>;
}

export const Filter: Schema.Schema<Filter> = Schema.suspend(() => Schema.Struct({
  inclusionFilters: Schema.optional(Schema.Array(ResourceSelector)),
  exclusionFilters: Schema.optional(Schema.Array(ResourceSelector)),
})).annotate({ identifier: "Filter" }) as any as Schema.Schema<Filter>;

export interface VolumeDataRestorePolicyOverride {
  /** Required. The VolumeDataRestorePolicy to apply when restoring volumes in scope. */
  policy?: "VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED" | "RESTORE_VOLUME_DATA_FROM_BACKUP" | "REUSE_VOLUME_HANDLE_FROM_BACKUP" | "NO_VOLUME_DATA_RESTORATION" | (string & {});
  /** A list of PVCs to apply the policy override to. */
  selectedPvcs?: NamespacedNames;
}

export const VolumeDataRestorePolicyOverride: Schema.Schema<VolumeDataRestorePolicyOverride> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Schema.String),
  selectedPvcs: Schema.optional(NamespacedNames),
})).annotate({ identifier: "VolumeDataRestorePolicyOverride" }) as any as Schema.Schema<VolumeDataRestorePolicyOverride>;

export interface Restore {
  /** Output only. Identifier. The full name of the Restore resource. Format: `projects/* /locations/* /restorePlans/* /restores/*` */
  name?: string;
  /** Output only. Server generated global unique identifier of [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) format. */
  uid?: string;
  /** Output only. The timestamp when this Restore resource was created. */
  createTime?: string;
  /** Output only. The timestamp when this Restore resource was last updated. */
  updateTime?: string;
  /** Optional. User specified descriptive string for this Restore. */
  description?: string;
  /** Required. Immutable. A reference to the Backup used as the source from which this Restore will restore. Note that this Backup must be a sub-resource of the RestorePlan's backup_plan. Format: `projects/* /locations/* /backupPlans/* /backups/*`. */
  backup?: string;
  /** Output only. The target cluster into which this Restore will restore data. Valid formats: - `projects/* /locations/* /clusters/*` - `projects/* /zones/* /clusters/*` Inherited from parent RestorePlan's cluster value. */
  cluster?: string;
  /** Output only. Configuration of the Restore. Inherited from parent RestorePlan's restore_config. */
  restoreConfig?: RestoreConfig;
  /** A set of custom labels supplied by user. */
  labels?: Record<string, string>;
  /** Output only. The current state of the Restore. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | "DELETING" | "VALIDATING" | (string & {});
  /** Output only. Human-readable description of why the Restore is in its current state. This field is only meant for human readability and should not be used programmatically as this field is not guaranteed to be consistent. */
  stateReason?: string;
  /** Output only. Information about the troubleshooting steps which will provide debugging information to the end users. */
  troubleshootingInfo?: TroubleshootingInfo;
  /** Output only. Timestamp of when the restore operation completed. */
  completeTime?: string;
  /** Output only. Number of resources restored during the restore execution. */
  resourcesRestoredCount?: number;
  /** Output only. Number of resources excluded during the restore execution. */
  resourcesExcludedCount?: number;
  /** Output only. Number of resources that failed to be restored during the restore execution. */
  resourcesFailedCount?: number;
  /** Output only. Number of volumes restored during the restore execution. */
  volumesRestoredCount?: number;
  /** Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a restore from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform restore updates in order to avoid race conditions: An `etag` is returned in the response to `GetRestore`, and systems are expected to put that etag in the request to `UpdateRestore` or `DeleteRestore` to ensure that their change will be applied to the same version of the resource. */
  etag?: string;
  /** Optional. Immutable. Filters resources for `Restore`. If not specified, the scope of the restore will remain the same as defined in the `RestorePlan`. If this is specified and no resources are matched by the `inclusion_filters` or everything is excluded by the `exclusion_filters`, nothing will be restored. This filter can only be specified if the value of namespaced_resource_restore_mode is set to `MERGE_SKIP_ON_CONFLICT`, `MERGE_REPLACE_VOLUME_ON_CONFLICT` or `MERGE_REPLACE_ON_CONFLICT`. */
  filter?: Filter;
  /** Optional. Immutable. Overrides the volume data restore policies selected in the Restore Config for override-scoped resources. */
  volumeDataRestorePolicyOverrides?: Array<VolumeDataRestorePolicyOverride>;
}

export const Restore: Schema.Schema<Restore> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  backup: Schema.optional(Schema.String),
  cluster: Schema.optional(Schema.String),
  restoreConfig: Schema.optional(RestoreConfig),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
  stateReason: Schema.optional(Schema.String),
  troubleshootingInfo: Schema.optional(TroubleshootingInfo),
  completeTime: Schema.optional(Schema.String),
  resourcesRestoredCount: Schema.optional(Schema.Number),
  resourcesExcludedCount: Schema.optional(Schema.Number),
  resourcesFailedCount: Schema.optional(Schema.Number),
  volumesRestoredCount: Schema.optional(Schema.Number),
  etag: Schema.optional(Schema.String),
  filter: Schema.optional(Filter),
  volumeDataRestorePolicyOverrides: Schema.optional(Schema.Array(VolumeDataRestorePolicyOverride)),
})).annotate({ identifier: "Restore" }) as any as Schema.Schema<Restore>;

export interface ListRestoresResponse {
  /** The list of Restores matching the given criteria. */
  restores?: Array<Restore>;
  /** A token which may be sent as page_token in a subsequent `ListRestores` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListRestoresResponse: Schema.Schema<ListRestoresResponse> = Schema.suspend(() => Schema.Struct({
  restores: Schema.optional(Schema.Array(Restore)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListRestoresResponse" }) as any as Schema.Schema<ListRestoresResponse>;

export interface VolumeRestore {
  /** Output only. Full name of the VolumeRestore resource. Format: `projects/* /locations/* /restorePlans/* /restores/* /volumeRestores/*` */
  name?: string;
  /** Output only. Server generated global unique identifier of [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) format. */
  uid?: string;
  /** Output only. The timestamp when this VolumeRestore resource was created. */
  createTime?: string;
  /** Output only. The timestamp when this VolumeRestore resource was last updated. */
  updateTime?: string;
  /** Output only. The full name of the VolumeBackup from which the volume will be restored. Format: `projects/* /locations/* /backupPlans/* /backups/* /volumeBackups/*`. */
  volumeBackup?: string;
  /** Output only. The reference to the target Kubernetes PVC to be restored. */
  targetPvc?: NamespacedName;
  /** Output only. A storage system-specific opaque handler to the underlying volume created for the target PVC from the volume backup. */
  volumeHandle?: string;
  /** Output only. The type of volume provisioned */
  volumeType?: "VOLUME_TYPE_UNSPECIFIED" | "GCE_PERSISTENT_DISK" | (string & {});
  /** Output only. The timestamp when the associated underlying volume restoration completed. */
  completeTime?: string;
  /** Output only. The current state of this VolumeRestore. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "RESTORING" | "SUCCEEDED" | "FAILED" | "DELETING" | (string & {});
  /** Output only. A human readable message explaining why the VolumeRestore is in its current state. */
  stateMessage?: string;
  /** Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a volume restore from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform volume restore updates in order to avoid race conditions. */
  etag?: string;
}

export const VolumeRestore: Schema.Schema<VolumeRestore> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  volumeBackup: Schema.optional(Schema.String),
  targetPvc: Schema.optional(NamespacedName),
  volumeHandle: Schema.optional(Schema.String),
  volumeType: Schema.optional(Schema.String),
  completeTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "VolumeRestore" }) as any as Schema.Schema<VolumeRestore>;

export interface ListVolumeRestoresResponse {
  /** The list of VolumeRestores matching the given criteria. */
  volumeRestores?: Array<VolumeRestore>;
  /** A token which may be sent as page_token in a subsequent `ListVolumeRestores` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. */
  nextPageToken?: string;
}

export const ListVolumeRestoresResponse: Schema.Schema<ListVolumeRestoresResponse> = Schema.suspend(() => Schema.Struct({
  volumeRestores: Schema.optional(Schema.Array(VolumeRestore)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListVolumeRestoresResponse" }) as any as Schema.Schema<ListVolumeRestoresResponse>;

export interface GetBackupIndexDownloadUrlResponse {
  /** Required. The signed URL for downloading the backup index. */
  signedUrl?: string;
}

export const GetBackupIndexDownloadUrlResponse: Schema.Schema<GetBackupIndexDownloadUrlResponse> = Schema.suspend(() => Schema.Struct({
  signedUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "GetBackupIndexDownloadUrlResponse" }) as any as Schema.Schema<GetBackupIndexDownloadUrlResponse>;

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

export interface Expr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
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

export interface AuditLogConfig {
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AuditLogConfig" }) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
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

export interface GetTagsRequest {
  /** Required. The full resource name of the service resource. */
  name?: string;
}

export const GetTagsRequest: Schema.Schema<GetTagsRequest> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GetTagsRequest" }) as any as Schema.Schema<GetTagsRequest>;

export interface BDRBackupRestoreJobLog {
  /** The job_id field displays the identifier of the job being logged. */
  jobId?: string;
  /** The category field displays the category of the job. */
  jobCategory?: string;
  /** The status field displays the status of the job. */
  jobStatus?: string;
  /** Full resource name of the protected resource. */
  sourceResourceName?: string;
  /** The source resource ID. */
  sourceResourceId?: string;
  /** Full resource name of the restore resource. Only populated in restore jobs. */
  restoreResourceName?: string;
  /** Full resource name of the backup created in backup jobs and used in restore jobs. */
  backupName?: string;
  /** The resource_type field displays the type of the protected resource. */
  resourceType?: string;
  /** Start time of the job. */
  startTime?: string;
  /** End time of the job. */
  endTime?: string;
  /** Full resource name for Backup Plan of the job. Only populated for Scheduled Backup and Adhoc Backup. */
  backupPlanName?: string;
  /** Name of the backup rule. Only populated for Scheduled Backup and Adhoc Backup. */
  backupRule?: string;
  /** Backup retention in days. */
  backupRetentionDays?: number;
  /** Full resource name backup vault name */
  backupVaultName?: string;
  /** The amount of incremental backup data copied. */
  incrementalBackupSizeGib?: number;
  /** The error code. Only populated in error scenarios. */
  errorCode?: number;
  /** The name of the error type eg. PERMISSION_DENIED. Only populated in error scenarios. */
  errorType?: string;
  /** The user readable error message. Only populated in error scenarios. */
  errorMessage?: string;
  /** Backup consistency time. */
  backupConsistencyTime?: string;
  /** Source resource location. */
  sourceResourceLocation?: string;
  /** Restore resource location. */
  restoreResourceLocation?: string;
  /** Recovery point time. */
  recoveryPointTime?: string;
}

export const BDRBackupRestoreJobLog: Schema.Schema<BDRBackupRestoreJobLog> = Schema.suspend(() => Schema.Struct({
  jobId: Schema.optional(Schema.String),
  jobCategory: Schema.optional(Schema.String),
  jobStatus: Schema.optional(Schema.String),
  sourceResourceName: Schema.optional(Schema.String),
  sourceResourceId: Schema.optional(Schema.String),
  restoreResourceName: Schema.optional(Schema.String),
  backupName: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  backupPlanName: Schema.optional(Schema.String),
  backupRule: Schema.optional(Schema.String),
  backupRetentionDays: Schema.optional(Schema.Number),
  backupVaultName: Schema.optional(Schema.String),
  incrementalBackupSizeGib: Schema.optional(Schema.Number),
  errorCode: Schema.optional(Schema.Number),
  errorType: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  backupConsistencyTime: Schema.optional(Schema.String),
  sourceResourceLocation: Schema.optional(Schema.String),
  restoreResourceLocation: Schema.optional(Schema.String),
  recoveryPointTime: Schema.optional(Schema.String),
})).annotate({ identifier: "BDRBackupRestoreJobLog" }) as any as Schema.Schema<BDRBackupRestoreJobLog>;

export interface BackupRuleDetail {
  /** Backup Rule Name. */
  ruleName?: string;
  /** Backup Retention in Days. */
  retentionDays?: number;
  /** Recurrence Type. For Eg. “Weekly”,” Monthly” or “Daily”. */
  recurrence?: string;
  /** Recurrence Repeat Schedule. For Eg. “1st and 25th day of the month.” */
  recurrenceSchedule?: string;
  /** Backup Window For Eg. “00:00 to 06:00” */
  backupWindow?: string;
  /** Backup Window Timezone in IANA format. For Eg. “America/Los_Angeles” */
  backupWindowTimezone?: string;
}

export const BackupRuleDetail: Schema.Schema<BackupRuleDetail> = Schema.suspend(() => Schema.Struct({
  ruleName: Schema.optional(Schema.String),
  retentionDays: Schema.optional(Schema.Number),
  recurrence: Schema.optional(Schema.String),
  recurrenceSchedule: Schema.optional(Schema.String),
  backupWindow: Schema.optional(Schema.String),
  backupWindowTimezone: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupRuleDetail" }) as any as Schema.Schema<BackupRuleDetail>;

export interface BDRBackupPlanJobLog {
  /** The job_id field displays the identifier of the job being reported. */
  jobId?: string;
  /** The category field displays the category of the job. Can be one of [UPDATE_BACKUP_PLAN]. */
  jobCategory?: string;
  /** The status field displays the status of the job. Can be one of [RUNNING,SUCCESSFUL, FAILED]. */
  jobStatus?: string;
  /** The resource_type field displays the type of the protected resource. */
  resourceType?: string;
  /** Canonical resource name for Backup Plan Plan of the job. */
  backupPlanName?: string;
  /** User friendly revision id e.g. v0, v1 etc. */
  previousBackupPlanRevisionId?: string;
  /** Full resource name for previous backup plan revision */
  previousBackupPlanRevisionName?: string;
  /** User friendly revision id e.g. v0, v1 etc. */
  newBackupPlanRevisionId?: string;
  /** Full resource name for new backup plan revision */
  newBackupPlanRevisionName?: string;
  /** Start time of the job. */
  startTime?: string;
  /** End time of the job. */
  endTime?: string;
  /** The total number of workloads affected by the job. */
  workloadsAffectedCount?: number;
  /** Previous Backup Plan rules. */
  previousBackupRules?: Array<BackupRuleDetail>;
  /** Revised Backup Plan rules. */
  revisedBackupRules?: Array<BackupRuleDetail>;
  /** The error code. Only populated in error scenarios. */
  errorCode?: number;
  /** The name of the error type eg. PERMISSION_DENIED. Only populated in error scenarios. */
  errorType?: string;
  /** The user readable error message. Only populated in error scenarios. */
  errorMessage?: string;
}

export const BDRBackupPlanJobLog: Schema.Schema<BDRBackupPlanJobLog> = Schema.suspend(() => Schema.Struct({
  jobId: Schema.optional(Schema.String),
  jobCategory: Schema.optional(Schema.String),
  jobStatus: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  backupPlanName: Schema.optional(Schema.String),
  previousBackupPlanRevisionId: Schema.optional(Schema.String),
  previousBackupPlanRevisionName: Schema.optional(Schema.String),
  newBackupPlanRevisionId: Schema.optional(Schema.String),
  newBackupPlanRevisionName: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  workloadsAffectedCount: Schema.optional(Schema.Number),
  previousBackupRules: Schema.optional(Schema.Array(BackupRuleDetail)),
  revisedBackupRules: Schema.optional(Schema.Array(BackupRuleDetail)),
  errorCode: Schema.optional(Schema.Number),
  errorType: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "BDRBackupPlanJobLog" }) as any as Schema.Schema<BDRBackupPlanJobLog>;

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

export type ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;

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

export type GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;

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

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Creates a new BackupPlan in a given location. */
export interface CreateProjectsLocationsBackupPlansRequest {
  /** Required. The location within which to create the BackupPlan. Format: `projects/* /locations/*` */
  parent: string;
  /** Required. The client-provided short name for the BackupPlan resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of BackupPlans in this location */
  backupPlanId?: string;
  /** Request body */
  body?: BackupPlan;
}

export const CreateProjectsLocationsBackupPlansRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  backupPlanId: Schema.optional(Schema.String).pipe(T.HttpQuery("backupPlanId")),
  body: Schema.optional(BackupPlan).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBackupPlansRequest>;

export type CreateProjectsLocationsBackupPlansResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsBackupPlansResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsBackupPlansError = CommonErrors;

export const createProjectsLocationsBackupPlans: API.OperationMethod<CreateProjectsLocationsBackupPlansRequest, CreateProjectsLocationsBackupPlansResponse, CreateProjectsLocationsBackupPlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBackupPlansRequest,
  output: CreateProjectsLocationsBackupPlansResponse,
  errors: [],
}));

/** Lists BackupPlans in a given location. */
export interface ListProjectsLocationsBackupPlansRequest {
  /** Required. The location that contains the BackupPlans to list. Format: `projects/* /locations/*` */
  parent: string;
  /** Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The value of next_page_token received from a previous `ListBackupPlans` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListBackupPlans` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Field match expression used to filter the results. */
  filter?: string;
  /** Optional. Field by which to sort the results. */
  orderBy?: string;
}

export const ListProjectsLocationsBackupPlansRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackupPlansRequest>;

export type ListProjectsLocationsBackupPlansResponse = ListBackupPlansResponse;
export const ListProjectsLocationsBackupPlansResponse = ListBackupPlansResponse;

export type ListProjectsLocationsBackupPlansError = CommonErrors;

export const listProjectsLocationsBackupPlans = API.makePaginated(() => ({
  input: ListProjectsLocationsBackupPlansRequest,
  output: ListProjectsLocationsBackupPlansResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieve the details of a single BackupPlan. */
export interface GetProjectsLocationsBackupPlansRequest {
  /** Required. Fully qualified BackupPlan name. Format: `projects/* /locations/* /backupPlans/*` */
  name: string;
}

export const GetProjectsLocationsBackupPlansRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackupPlansRequest>;

export type GetProjectsLocationsBackupPlansResponse = BackupPlan;
export const GetProjectsLocationsBackupPlansResponse = BackupPlan;

export type GetProjectsLocationsBackupPlansError = CommonErrors;

export const getProjectsLocationsBackupPlans: API.OperationMethod<GetProjectsLocationsBackupPlansRequest, GetProjectsLocationsBackupPlansResponse, GetProjectsLocationsBackupPlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackupPlansRequest,
  output: GetProjectsLocationsBackupPlansResponse,
  errors: [],
}));

/** Update a BackupPlan. */
export interface PatchProjectsLocationsBackupPlansRequest {
  /** Output only. Identifier. The full name of the BackupPlan resource. Format: `projects/* /locations/* /backupPlans/*` */
  name: string;
  /** Optional. This is used to specify the fields to be overwritten in the BackupPlan targeted for update. The values for each of these updated fields will be taken from the `backup_plan` provided with this request. Field names are relative to the root of the resource (e.g., `description`, `backup_config.include_volume_data`, etc.) If no `update_mask` is provided, all fields in `backup_plan` will be written to the target BackupPlan resource. Note that OUTPUT_ONLY and IMMUTABLE fields in `backup_plan` are ignored and are not used to update the target BackupPlan. */
  updateMask?: string;
  /** Request body */
  body?: BackupPlan;
}

export const PatchProjectsLocationsBackupPlansRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(BackupPlan).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackupPlansRequest>;

export type PatchProjectsLocationsBackupPlansResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsBackupPlansResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsBackupPlansError = CommonErrors;

export const patchProjectsLocationsBackupPlans: API.OperationMethod<PatchProjectsLocationsBackupPlansRequest, PatchProjectsLocationsBackupPlansResponse, PatchProjectsLocationsBackupPlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBackupPlansRequest,
  output: PatchProjectsLocationsBackupPlansResponse,
  errors: [],
}));

/** Deletes an existing BackupPlan. */
export interface DeleteProjectsLocationsBackupPlansRequest {
  /** Required. Fully qualified BackupPlan name. Format: `projects/* /locations/* /backupPlans/*` */
  name: string;
  /** Optional. If provided, this value must match the current value of the target BackupPlan's etag field or the request is rejected. */
  etag?: string;
}

export const DeleteProjectsLocationsBackupPlansRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackupPlansRequest>;

export type DeleteProjectsLocationsBackupPlansResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsBackupPlansResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsBackupPlansError = CommonErrors;

export const deleteProjectsLocationsBackupPlans: API.OperationMethod<DeleteProjectsLocationsBackupPlansRequest, DeleteProjectsLocationsBackupPlansResponse, DeleteProjectsLocationsBackupPlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBackupPlansRequest,
  output: DeleteProjectsLocationsBackupPlansResponse,
  errors: [],
}));

/** Updates tags directly bound to a GCP resource. */
export interface SetTagsProjectsLocationsBackupPlansRequest {
  /** Required. The full resource name of the service resource. */
  name: string;
  /** Request body */
  body?: SetTagsRequest;
}

export const SetTagsProjectsLocationsBackupPlansRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetTagsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}:setTags", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetTagsProjectsLocationsBackupPlansRequest>;

export type SetTagsProjectsLocationsBackupPlansResponse = SetTagsResponse;
export const SetTagsProjectsLocationsBackupPlansResponse = SetTagsResponse;

export type SetTagsProjectsLocationsBackupPlansError = CommonErrors;

export const setTagsProjectsLocationsBackupPlans: API.OperationMethod<SetTagsProjectsLocationsBackupPlansRequest, SetTagsProjectsLocationsBackupPlansResponse, SetTagsProjectsLocationsBackupPlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetTagsProjectsLocationsBackupPlansRequest,
  output: SetTagsProjectsLocationsBackupPlansResponse,
  errors: [],
}));

/** Returns tags directly bound to a GCP resource. */
export interface GetTagsProjectsLocationsBackupPlansRequest {
  /** Required. The full resource name of the service resource. */
  name: string;
}

export const GetTagsProjectsLocationsBackupPlansRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}:getTags" }),
  svc,
) as unknown as Schema.Schema<GetTagsProjectsLocationsBackupPlansRequest>;

export type GetTagsProjectsLocationsBackupPlansResponse = GetTagsResponse;
export const GetTagsProjectsLocationsBackupPlansResponse = GetTagsResponse;

export type GetTagsProjectsLocationsBackupPlansError = CommonErrors;

export const getTagsProjectsLocationsBackupPlans: API.OperationMethod<GetTagsProjectsLocationsBackupPlansRequest, GetTagsProjectsLocationsBackupPlansResponse, GetTagsProjectsLocationsBackupPlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTagsProjectsLocationsBackupPlansRequest,
  output: GetTagsProjectsLocationsBackupPlansResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsBackupPlansRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsBackupPlansRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsBackupPlansRequest>;

export type SetIamPolicyProjectsLocationsBackupPlansResponse = Policy;
export const SetIamPolicyProjectsLocationsBackupPlansResponse = Policy;

export type SetIamPolicyProjectsLocationsBackupPlansError = CommonErrors;

export const setIamPolicyProjectsLocationsBackupPlans: API.OperationMethod<SetIamPolicyProjectsLocationsBackupPlansRequest, SetIamPolicyProjectsLocationsBackupPlansResponse, SetIamPolicyProjectsLocationsBackupPlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsBackupPlansRequest,
  output: SetIamPolicyProjectsLocationsBackupPlansResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsBackupPlansRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsBackupPlansRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsBackupPlansRequest>;

export type GetIamPolicyProjectsLocationsBackupPlansResponse = Policy;
export const GetIamPolicyProjectsLocationsBackupPlansResponse = Policy;

export type GetIamPolicyProjectsLocationsBackupPlansError = CommonErrors;

export const getIamPolicyProjectsLocationsBackupPlans: API.OperationMethod<GetIamPolicyProjectsLocationsBackupPlansRequest, GetIamPolicyProjectsLocationsBackupPlansResponse, GetIamPolicyProjectsLocationsBackupPlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsBackupPlansRequest,
  output: GetIamPolicyProjectsLocationsBackupPlansResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsBackupPlansRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsBackupPlansRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsBackupPlansRequest>;

export type TestIamPermissionsProjectsLocationsBackupPlansResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsBackupPlansResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsBackupPlansError = CommonErrors;

export const testIamPermissionsProjectsLocationsBackupPlans: API.OperationMethod<TestIamPermissionsProjectsLocationsBackupPlansRequest, TestIamPermissionsProjectsLocationsBackupPlansResponse, TestIamPermissionsProjectsLocationsBackupPlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsBackupPlansRequest,
  output: TestIamPermissionsProjectsLocationsBackupPlansResponse,
  errors: [],
}));

/** Creates a Backup for the given BackupPlan. */
export interface CreateProjectsLocationsBackupPlansBackupsRequest {
  /** Required. The BackupPlan within which to create the Backup. Format: `projects/* /locations/* /backupPlans/*` */
  parent: string;
  /** Optional. The client-provided short name for the Backup resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of Backups in this BackupPlan */
  backupId?: string;
  /** Request body */
  body?: Backup;
}

export const CreateProjectsLocationsBackupPlansBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  backupId: Schema.optional(Schema.String).pipe(T.HttpQuery("backupId")),
  body: Schema.optional(Backup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}/backups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBackupPlansBackupsRequest>;

export type CreateProjectsLocationsBackupPlansBackupsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsBackupPlansBackupsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsBackupPlansBackupsError = CommonErrors;

export const createProjectsLocationsBackupPlansBackups: API.OperationMethod<CreateProjectsLocationsBackupPlansBackupsRequest, CreateProjectsLocationsBackupPlansBackupsResponse, CreateProjectsLocationsBackupPlansBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBackupPlansBackupsRequest,
  output: CreateProjectsLocationsBackupPlansBackupsResponse,
  errors: [],
}));

/** Lists the Backups for a given BackupPlan. */
export interface ListProjectsLocationsBackupPlansBackupsRequest {
  /** Required. The BackupPlan that contains the Backups to list. Format: `projects/* /locations/* /backupPlans/*` */
  parent: string;
  /** Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The value of next_page_token received from a previous `ListBackups` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListBackups` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Field match expression used to filter the results. */
  filter?: string;
  /** Optional. Field by which to sort the results. */
  orderBy?: string;
  /** Optional. If set to true, the response will return partial results when some regions are unreachable and the unreachable field will be populated. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsBackupPlansBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}/backups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackupPlansBackupsRequest>;

export type ListProjectsLocationsBackupPlansBackupsResponse = ListBackupsResponse;
export const ListProjectsLocationsBackupPlansBackupsResponse = ListBackupsResponse;

export type ListProjectsLocationsBackupPlansBackupsError = CommonErrors;

export const listProjectsLocationsBackupPlansBackups = API.makePaginated(() => ({
  input: ListProjectsLocationsBackupPlansBackupsRequest,
  output: ListProjectsLocationsBackupPlansBackupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieve the details of a single Backup. */
export interface GetProjectsLocationsBackupPlansBackupsRequest {
  /** Required. Full name of the Backup resource. Format: `projects/* /locations/* /backupPlans/* /backups/*` */
  name: string;
}

export const GetProjectsLocationsBackupPlansBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackupPlansBackupsRequest>;

export type GetProjectsLocationsBackupPlansBackupsResponse = Backup;
export const GetProjectsLocationsBackupPlansBackupsResponse = Backup;

export type GetProjectsLocationsBackupPlansBackupsError = CommonErrors;

export const getProjectsLocationsBackupPlansBackups: API.OperationMethod<GetProjectsLocationsBackupPlansBackupsRequest, GetProjectsLocationsBackupPlansBackupsResponse, GetProjectsLocationsBackupPlansBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackupPlansBackupsRequest,
  output: GetProjectsLocationsBackupPlansBackupsResponse,
  errors: [],
}));

/** Update a Backup. */
export interface PatchProjectsLocationsBackupPlansBackupsRequest {
  /** Output only. Identifier. The fully qualified name of the Backup. `projects/* /locations/* /backupPlans/* /backups/*` */
  name: string;
  /** Optional. This is used to specify the fields to be overwritten in the Backup targeted for update. The values for each of these updated fields will be taken from the `backup_plan` provided with this request. Field names are relative to the root of the resource. If no `update_mask` is provided, all fields in `backup` will be written to the target Backup resource. Note that OUTPUT_ONLY and IMMUTABLE fields in `backup` are ignored and are not used to update the target Backup. */
  updateMask?: string;
  /** Request body */
  body?: Backup;
}

export const PatchProjectsLocationsBackupPlansBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Backup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}/backups/{backupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackupPlansBackupsRequest>;

export type PatchProjectsLocationsBackupPlansBackupsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsBackupPlansBackupsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsBackupPlansBackupsError = CommonErrors;

export const patchProjectsLocationsBackupPlansBackups: API.OperationMethod<PatchProjectsLocationsBackupPlansBackupsRequest, PatchProjectsLocationsBackupPlansBackupsResponse, PatchProjectsLocationsBackupPlansBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBackupPlansBackupsRequest,
  output: PatchProjectsLocationsBackupPlansBackupsResponse,
  errors: [],
}));

/** Deletes an existing Backup. */
export interface DeleteProjectsLocationsBackupPlansBackupsRequest {
  /** Required. Name of the Backup resource. Format: `projects/* /locations/* /backupPlans/* /backups/*` */
  name: string;
  /** Optional. If provided, this value must match the current value of the target Backup's etag field or the request is rejected. */
  etag?: string;
  /** Optional. If set to true, any VolumeBackups below this Backup will also be deleted. Otherwise, the request will only succeed if the Backup has no VolumeBackups. */
  force?: boolean;
}

export const DeleteProjectsLocationsBackupPlansBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackupPlansBackupsRequest>;

export type DeleteProjectsLocationsBackupPlansBackupsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsBackupPlansBackupsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsBackupPlansBackupsError = CommonErrors;

export const deleteProjectsLocationsBackupPlansBackups: API.OperationMethod<DeleteProjectsLocationsBackupPlansBackupsRequest, DeleteProjectsLocationsBackupPlansBackupsResponse, DeleteProjectsLocationsBackupPlansBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBackupPlansBackupsRequest,
  output: DeleteProjectsLocationsBackupPlansBackupsResponse,
  errors: [],
}));

/** Retrieve the link to the backupIndex. */
export interface GetBackupIndexDownloadUrlProjectsLocationsBackupPlansBackupsRequest {
  /** Required. Full name of Backup resource. Format: projects/{project}/locations/{location}/backupPlans/{backup_plan}/backups/{backup} */
  backup: string;
}

export const GetBackupIndexDownloadUrlProjectsLocationsBackupPlansBackupsRequest = Schema.Struct({
  backup: Schema.String.pipe(T.HttpPath("backup")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}/backups/{backupsId}:getBackupIndexDownloadUrl" }),
  svc,
) as unknown as Schema.Schema<GetBackupIndexDownloadUrlProjectsLocationsBackupPlansBackupsRequest>;

export type GetBackupIndexDownloadUrlProjectsLocationsBackupPlansBackupsResponse = GetBackupIndexDownloadUrlResponse;
export const GetBackupIndexDownloadUrlProjectsLocationsBackupPlansBackupsResponse = GetBackupIndexDownloadUrlResponse;

export type GetBackupIndexDownloadUrlProjectsLocationsBackupPlansBackupsError = CommonErrors;

export const getBackupIndexDownloadUrlProjectsLocationsBackupPlansBackups: API.OperationMethod<GetBackupIndexDownloadUrlProjectsLocationsBackupPlansBackupsRequest, GetBackupIndexDownloadUrlProjectsLocationsBackupPlansBackupsResponse, GetBackupIndexDownloadUrlProjectsLocationsBackupPlansBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBackupIndexDownloadUrlProjectsLocationsBackupPlansBackupsRequest,
  output: GetBackupIndexDownloadUrlProjectsLocationsBackupPlansBackupsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsBackupPlansBackupsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsBackupPlansBackupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}/backups/{backupsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsBackupPlansBackupsRequest>;

export type SetIamPolicyProjectsLocationsBackupPlansBackupsResponse = Policy;
export const SetIamPolicyProjectsLocationsBackupPlansBackupsResponse = Policy;

export type SetIamPolicyProjectsLocationsBackupPlansBackupsError = CommonErrors;

export const setIamPolicyProjectsLocationsBackupPlansBackups: API.OperationMethod<SetIamPolicyProjectsLocationsBackupPlansBackupsRequest, SetIamPolicyProjectsLocationsBackupPlansBackupsResponse, SetIamPolicyProjectsLocationsBackupPlansBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsBackupPlansBackupsRequest,
  output: SetIamPolicyProjectsLocationsBackupPlansBackupsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsBackupPlansBackupsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsBackupPlansBackupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}/backups/{backupsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsBackupPlansBackupsRequest>;

export type GetIamPolicyProjectsLocationsBackupPlansBackupsResponse = Policy;
export const GetIamPolicyProjectsLocationsBackupPlansBackupsResponse = Policy;

export type GetIamPolicyProjectsLocationsBackupPlansBackupsError = CommonErrors;

export const getIamPolicyProjectsLocationsBackupPlansBackups: API.OperationMethod<GetIamPolicyProjectsLocationsBackupPlansBackupsRequest, GetIamPolicyProjectsLocationsBackupPlansBackupsResponse, GetIamPolicyProjectsLocationsBackupPlansBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsBackupPlansBackupsRequest,
  output: GetIamPolicyProjectsLocationsBackupPlansBackupsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsBackupPlansBackupsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsBackupPlansBackupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}/backups/{backupsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsBackupPlansBackupsRequest>;

export type TestIamPermissionsProjectsLocationsBackupPlansBackupsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsBackupPlansBackupsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsBackupPlansBackupsError = CommonErrors;

export const testIamPermissionsProjectsLocationsBackupPlansBackups: API.OperationMethod<TestIamPermissionsProjectsLocationsBackupPlansBackupsRequest, TestIamPermissionsProjectsLocationsBackupPlansBackupsResponse, TestIamPermissionsProjectsLocationsBackupPlansBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsBackupPlansBackupsRequest,
  output: TestIamPermissionsProjectsLocationsBackupPlansBackupsResponse,
  errors: [],
}));

/** Lists the VolumeBackups for a given Backup. */
export interface ListProjectsLocationsBackupPlansBackupsVolumeBackupsRequest {
  /** Required. The Backup that contains the VolumeBackups to list. Format: `projects/* /locations/* /backupPlans/* /backups/*` */
  parent: string;
  /** Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The value of next_page_token received from a previous `ListVolumeBackups` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListVolumeBackups` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Field match expression used to filter the results. */
  filter?: string;
  /** Optional. Field by which to sort the results. */
  orderBy?: string;
}

export const ListProjectsLocationsBackupPlansBackupsVolumeBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}/backups/{backupsId}/volumeBackups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackupPlansBackupsVolumeBackupsRequest>;

export type ListProjectsLocationsBackupPlansBackupsVolumeBackupsResponse = ListVolumeBackupsResponse;
export const ListProjectsLocationsBackupPlansBackupsVolumeBackupsResponse = ListVolumeBackupsResponse;

export type ListProjectsLocationsBackupPlansBackupsVolumeBackupsError = CommonErrors;

export const listProjectsLocationsBackupPlansBackupsVolumeBackups = API.makePaginated(() => ({
  input: ListProjectsLocationsBackupPlansBackupsVolumeBackupsRequest,
  output: ListProjectsLocationsBackupPlansBackupsVolumeBackupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieve the details of a single VolumeBackup. */
export interface GetProjectsLocationsBackupPlansBackupsVolumeBackupsRequest {
  /** Required. Full name of the VolumeBackup resource. Format: `projects/* /locations/* /backupPlans/* /backups/* /volumeBackups/*` */
  name: string;
}

export const GetProjectsLocationsBackupPlansBackupsVolumeBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}/backups/{backupsId}/volumeBackups/{volumeBackupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackupPlansBackupsVolumeBackupsRequest>;

export type GetProjectsLocationsBackupPlansBackupsVolumeBackupsResponse = VolumeBackup;
export const GetProjectsLocationsBackupPlansBackupsVolumeBackupsResponse = VolumeBackup;

export type GetProjectsLocationsBackupPlansBackupsVolumeBackupsError = CommonErrors;

export const getProjectsLocationsBackupPlansBackupsVolumeBackups: API.OperationMethod<GetProjectsLocationsBackupPlansBackupsVolumeBackupsRequest, GetProjectsLocationsBackupPlansBackupsVolumeBackupsResponse, GetProjectsLocationsBackupPlansBackupsVolumeBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackupPlansBackupsVolumeBackupsRequest,
  output: GetProjectsLocationsBackupPlansBackupsVolumeBackupsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}/backups/{backupsId}/volumeBackups/{volumeBackupsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsRequest>;

export type SetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsResponse = Policy;
export const SetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsResponse = Policy;

export type SetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsError = CommonErrors;

export const setIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackups: API.OperationMethod<SetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsRequest, SetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsResponse, SetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsRequest,
  output: SetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}/backups/{backupsId}/volumeBackups/{volumeBackupsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsRequest>;

export type GetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsResponse = Policy;
export const GetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsResponse = Policy;

export type GetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsError = CommonErrors;

export const getIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackups: API.OperationMethod<GetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsRequest, GetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsResponse, GetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsRequest,
  output: GetIamPolicyProjectsLocationsBackupPlansBackupsVolumeBackupsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsBackupPlansBackupsVolumeBackupsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsBackupPlansBackupsVolumeBackupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}/backups/{backupsId}/volumeBackups/{volumeBackupsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsBackupPlansBackupsVolumeBackupsRequest>;

export type TestIamPermissionsProjectsLocationsBackupPlansBackupsVolumeBackupsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsBackupPlansBackupsVolumeBackupsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsBackupPlansBackupsVolumeBackupsError = CommonErrors;

export const testIamPermissionsProjectsLocationsBackupPlansBackupsVolumeBackups: API.OperationMethod<TestIamPermissionsProjectsLocationsBackupPlansBackupsVolumeBackupsRequest, TestIamPermissionsProjectsLocationsBackupPlansBackupsVolumeBackupsResponse, TestIamPermissionsProjectsLocationsBackupPlansBackupsVolumeBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsBackupPlansBackupsVolumeBackupsRequest,
  output: TestIamPermissionsProjectsLocationsBackupPlansBackupsVolumeBackupsResponse,
  errors: [],
}));

/** Creates a new BackupChannel in a given location. */
export interface CreateProjectsLocationsBackupChannelsRequest {
  /** Required. The location within which to create the BackupChannel. Format: `projects/* /locations/*` */
  parent: string;
  /** Optional. The client-provided short name for the BackupChannel resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of BackupChannels in this location If the user does not provide a name, a uuid will be used as the name. */
  backupChannelId?: string;
  /** Request body */
  body?: BackupChannel;
}

export const CreateProjectsLocationsBackupChannelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  backupChannelId: Schema.optional(Schema.String).pipe(T.HttpQuery("backupChannelId")),
  body: Schema.optional(BackupChannel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupChannels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBackupChannelsRequest>;

export type CreateProjectsLocationsBackupChannelsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsBackupChannelsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsBackupChannelsError = CommonErrors;

export const createProjectsLocationsBackupChannels: API.OperationMethod<CreateProjectsLocationsBackupChannelsRequest, CreateProjectsLocationsBackupChannelsResponse, CreateProjectsLocationsBackupChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBackupChannelsRequest,
  output: CreateProjectsLocationsBackupChannelsResponse,
  errors: [],
}));

/** Lists BackupChannels in a given location. */
export interface ListProjectsLocationsBackupChannelsRequest {
  /** Required. The location that contains the BackupChannels to list. Format: `projects/* /locations/*` */
  parent: string;
  /** Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The value of next_page_token received from a previous `ListBackupChannels` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListBackupChannels` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Field match expression used to filter the results. */
  filter?: string;
  /** Optional. Field by which to sort the results. */
  orderBy?: string;
}

export const ListProjectsLocationsBackupChannelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupChannels" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackupChannelsRequest>;

export type ListProjectsLocationsBackupChannelsResponse = ListBackupChannelsResponse;
export const ListProjectsLocationsBackupChannelsResponse = ListBackupChannelsResponse;

export type ListProjectsLocationsBackupChannelsError = CommonErrors;

export const listProjectsLocationsBackupChannels = API.makePaginated(() => ({
  input: ListProjectsLocationsBackupChannelsRequest,
  output: ListProjectsLocationsBackupChannelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieve the details of a single BackupChannel. */
export interface GetProjectsLocationsBackupChannelsRequest {
  /** Required. Fully qualified BackupChannel name. Format: `projects/* /locations/* /backupChannels/*` */
  name: string;
}

export const GetProjectsLocationsBackupChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupChannels/{backupChannelsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackupChannelsRequest>;

export type GetProjectsLocationsBackupChannelsResponse = BackupChannel;
export const GetProjectsLocationsBackupChannelsResponse = BackupChannel;

export type GetProjectsLocationsBackupChannelsError = CommonErrors;

export const getProjectsLocationsBackupChannels: API.OperationMethod<GetProjectsLocationsBackupChannelsRequest, GetProjectsLocationsBackupChannelsResponse, GetProjectsLocationsBackupChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackupChannelsRequest,
  output: GetProjectsLocationsBackupChannelsResponse,
  errors: [],
}));

/** Update a BackupChannel. */
export interface PatchProjectsLocationsBackupChannelsRequest {
  /** Identifier. The fully qualified name of the BackupChannel. `projects/* /locations/* /backupChannels/*` */
  name: string;
  /** Optional. This is used to specify the fields to be overwritten in the BackupChannel targeted for update. The values for each of these updated fields will be taken from the `backup_channel` provided with this request. Field names are relative to the root of the resource (e.g., `description`, `labels`, etc.) If no `update_mask` is provided, all fields in `backup_channel` will be written to the target BackupChannel resource. Note that OUTPUT_ONLY and IMMUTABLE fields in `backup_channel` are ignored and are not used to update the target BackupChannel. */
  updateMask?: string;
  /** Request body */
  body?: BackupChannel;
}

export const PatchProjectsLocationsBackupChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(BackupChannel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/backupChannels/{backupChannelsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackupChannelsRequest>;

export type PatchProjectsLocationsBackupChannelsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsBackupChannelsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsBackupChannelsError = CommonErrors;

export const patchProjectsLocationsBackupChannels: API.OperationMethod<PatchProjectsLocationsBackupChannelsRequest, PatchProjectsLocationsBackupChannelsResponse, PatchProjectsLocationsBackupChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBackupChannelsRequest,
  output: PatchProjectsLocationsBackupChannelsResponse,
  errors: [],
}));

/** Deletes an existing BackupChannel. */
export interface DeleteProjectsLocationsBackupChannelsRequest {
  /** Required. Fully qualified BackupChannel name. Format: `projects/* /locations/* /backupChannels/*` */
  name: string;
  /** Optional. If provided, this value must match the current value of the target BackupChannel's etag field or the request is rejected. */
  etag?: string;
  /** Optional. If set to true, any BackupPlanAssociations below this BackupChannel will also be deleted. Otherwise, the request will only succeed if the BackupChannel has no BackupPlanAssociations. */
  force?: boolean;
}

export const DeleteProjectsLocationsBackupChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/backupChannels/{backupChannelsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackupChannelsRequest>;

export type DeleteProjectsLocationsBackupChannelsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsBackupChannelsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsBackupChannelsError = CommonErrors;

export const deleteProjectsLocationsBackupChannels: API.OperationMethod<DeleteProjectsLocationsBackupChannelsRequest, DeleteProjectsLocationsBackupChannelsResponse, DeleteProjectsLocationsBackupChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBackupChannelsRequest,
  output: DeleteProjectsLocationsBackupChannelsResponse,
  errors: [],
}));

/** Lists BackupPlanBindings in a given location. */
export interface ListProjectsLocationsBackupChannelsBackupPlanBindingsRequest {
  /** Required. The BackupChannel that contains the BackupPlanBindings to list. Format: `projects/* /locations/* /backupChannels/*` */
  parent: string;
  /** Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The value of next_page_token received from a previous `ListBackupPlanBindings` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListBackupPlanBindings` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Field match expression used to filter the results. */
  filter?: string;
  /** Optional. Field by which to sort the results. */
  orderBy?: string;
}

export const ListProjectsLocationsBackupChannelsBackupPlanBindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupChannels/{backupChannelsId}/backupPlanBindings" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackupChannelsBackupPlanBindingsRequest>;

export type ListProjectsLocationsBackupChannelsBackupPlanBindingsResponse = ListBackupPlanBindingsResponse;
export const ListProjectsLocationsBackupChannelsBackupPlanBindingsResponse = ListBackupPlanBindingsResponse;

export type ListProjectsLocationsBackupChannelsBackupPlanBindingsError = CommonErrors;

export const listProjectsLocationsBackupChannelsBackupPlanBindings = API.makePaginated(() => ({
  input: ListProjectsLocationsBackupChannelsBackupPlanBindingsRequest,
  output: ListProjectsLocationsBackupChannelsBackupPlanBindingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieve the details of a single BackupPlanBinding. */
export interface GetProjectsLocationsBackupChannelsBackupPlanBindingsRequest {
  /** Required. Fully qualified BackupPlanBinding name. Format: `projects/* /locations/* /backupChannels/* /backupPlanBindings/*` */
  name: string;
}

export const GetProjectsLocationsBackupChannelsBackupPlanBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupChannels/{backupChannelsId}/backupPlanBindings/{backupPlanBindingsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackupChannelsBackupPlanBindingsRequest>;

export type GetProjectsLocationsBackupChannelsBackupPlanBindingsResponse = BackupPlanBinding;
export const GetProjectsLocationsBackupChannelsBackupPlanBindingsResponse = BackupPlanBinding;

export type GetProjectsLocationsBackupChannelsBackupPlanBindingsError = CommonErrors;

export const getProjectsLocationsBackupChannelsBackupPlanBindings: API.OperationMethod<GetProjectsLocationsBackupChannelsBackupPlanBindingsRequest, GetProjectsLocationsBackupChannelsBackupPlanBindingsResponse, GetProjectsLocationsBackupChannelsBackupPlanBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackupChannelsBackupPlanBindingsRequest,
  output: GetProjectsLocationsBackupChannelsBackupPlanBindingsResponse,
  errors: [],
}));

/** Creates a new RestorePlan in a given location. */
export interface CreateProjectsLocationsRestorePlansRequest {
  /** Required. The location within which to create the RestorePlan. Format: `projects/* /locations/*` */
  parent: string;
  /** Required. The client-provided short name for the RestorePlan resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of RestorePlans in this location */
  restorePlanId?: string;
  /** Request body */
  body?: RestorePlan;
}

export const CreateProjectsLocationsRestorePlansRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  restorePlanId: Schema.optional(Schema.String).pipe(T.HttpQuery("restorePlanId")),
  body: Schema.optional(RestorePlan).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRestorePlansRequest>;

export type CreateProjectsLocationsRestorePlansResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsRestorePlansResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsRestorePlansError = CommonErrors;

export const createProjectsLocationsRestorePlans: API.OperationMethod<CreateProjectsLocationsRestorePlansRequest, CreateProjectsLocationsRestorePlansResponse, CreateProjectsLocationsRestorePlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRestorePlansRequest,
  output: CreateProjectsLocationsRestorePlansResponse,
  errors: [],
}));

/** Lists RestorePlans in a given location. */
export interface ListProjectsLocationsRestorePlansRequest {
  /** Required. The location that contains the RestorePlans to list. Format: `projects/* /locations/*` */
  parent: string;
  /** Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The value of next_page_token received from a previous `ListRestorePlans` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListRestorePlans` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Field match expression used to filter the results. */
  filter?: string;
  /** Optional. Field by which to sort the results. */
  orderBy?: string;
}

export const ListProjectsLocationsRestorePlansRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRestorePlansRequest>;

export type ListProjectsLocationsRestorePlansResponse = ListRestorePlansResponse;
export const ListProjectsLocationsRestorePlansResponse = ListRestorePlansResponse;

export type ListProjectsLocationsRestorePlansError = CommonErrors;

export const listProjectsLocationsRestorePlans = API.makePaginated(() => ({
  input: ListProjectsLocationsRestorePlansRequest,
  output: ListProjectsLocationsRestorePlansResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieve the details of a single RestorePlan. */
export interface GetProjectsLocationsRestorePlansRequest {
  /** Required. Fully qualified RestorePlan name. Format: `projects/* /locations/* /restorePlans/*` */
  name: string;
}

export const GetProjectsLocationsRestorePlansRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRestorePlansRequest>;

export type GetProjectsLocationsRestorePlansResponse = RestorePlan;
export const GetProjectsLocationsRestorePlansResponse = RestorePlan;

export type GetProjectsLocationsRestorePlansError = CommonErrors;

export const getProjectsLocationsRestorePlans: API.OperationMethod<GetProjectsLocationsRestorePlansRequest, GetProjectsLocationsRestorePlansResponse, GetProjectsLocationsRestorePlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRestorePlansRequest,
  output: GetProjectsLocationsRestorePlansResponse,
  errors: [],
}));

/** Update a RestorePlan. */
export interface PatchProjectsLocationsRestorePlansRequest {
  /** Output only. Identifier. The full name of the RestorePlan resource. Format: `projects/* /locations/* /restorePlans/*`. */
  name: string;
  /** Optional. This is used to specify the fields to be overwritten in the RestorePlan targeted for update. The values for each of these updated fields will be taken from the `restore_plan` provided with this request. Field names are relative to the root of the resource. If no `update_mask` is provided, all fields in `restore_plan` will be written to the target RestorePlan resource. Note that OUTPUT_ONLY and IMMUTABLE fields in `restore_plan` are ignored and are not used to update the target RestorePlan. */
  updateMask?: string;
  /** Request body */
  body?: RestorePlan;
}

export const PatchProjectsLocationsRestorePlansRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(RestorePlan).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRestorePlansRequest>;

export type PatchProjectsLocationsRestorePlansResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsRestorePlansResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsRestorePlansError = CommonErrors;

export const patchProjectsLocationsRestorePlans: API.OperationMethod<PatchProjectsLocationsRestorePlansRequest, PatchProjectsLocationsRestorePlansResponse, PatchProjectsLocationsRestorePlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRestorePlansRequest,
  output: PatchProjectsLocationsRestorePlansResponse,
  errors: [],
}));

/** Deletes an existing RestorePlan. */
export interface DeleteProjectsLocationsRestorePlansRequest {
  /** Required. Fully qualified RestorePlan name. Format: `projects/* /locations/* /restorePlans/*` */
  name: string;
  /** Optional. If provided, this value must match the current value of the target RestorePlan's etag field or the request is rejected. */
  etag?: string;
  /** Optional. If set to true, any Restores below this RestorePlan will also be deleted. Otherwise, the request will only succeed if the RestorePlan has no Restores. */
  force?: boolean;
}

export const DeleteProjectsLocationsRestorePlansRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRestorePlansRequest>;

export type DeleteProjectsLocationsRestorePlansResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsRestorePlansResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsRestorePlansError = CommonErrors;

export const deleteProjectsLocationsRestorePlans: API.OperationMethod<DeleteProjectsLocationsRestorePlansRequest, DeleteProjectsLocationsRestorePlansResponse, DeleteProjectsLocationsRestorePlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRestorePlansRequest,
  output: DeleteProjectsLocationsRestorePlansResponse,
  errors: [],
}));

/** Updates tags directly bound to a GCP resource. */
export interface SetTagsProjectsLocationsRestorePlansRequest {
  /** Required. The full resource name of the service resource. */
  name: string;
  /** Request body */
  body?: SetTagsRequest;
}

export const SetTagsProjectsLocationsRestorePlansRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetTagsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}:setTags", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetTagsProjectsLocationsRestorePlansRequest>;

export type SetTagsProjectsLocationsRestorePlansResponse = SetTagsResponse;
export const SetTagsProjectsLocationsRestorePlansResponse = SetTagsResponse;

export type SetTagsProjectsLocationsRestorePlansError = CommonErrors;

export const setTagsProjectsLocationsRestorePlans: API.OperationMethod<SetTagsProjectsLocationsRestorePlansRequest, SetTagsProjectsLocationsRestorePlansResponse, SetTagsProjectsLocationsRestorePlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetTagsProjectsLocationsRestorePlansRequest,
  output: SetTagsProjectsLocationsRestorePlansResponse,
  errors: [],
}));

/** Returns tags directly bound to a GCP resource. */
export interface GetTagsProjectsLocationsRestorePlansRequest {
  /** Required. The full resource name of the service resource. */
  name: string;
}

export const GetTagsProjectsLocationsRestorePlansRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}:getTags" }),
  svc,
) as unknown as Schema.Schema<GetTagsProjectsLocationsRestorePlansRequest>;

export type GetTagsProjectsLocationsRestorePlansResponse = GetTagsResponse;
export const GetTagsProjectsLocationsRestorePlansResponse = GetTagsResponse;

export type GetTagsProjectsLocationsRestorePlansError = CommonErrors;

export const getTagsProjectsLocationsRestorePlans: API.OperationMethod<GetTagsProjectsLocationsRestorePlansRequest, GetTagsProjectsLocationsRestorePlansResponse, GetTagsProjectsLocationsRestorePlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTagsProjectsLocationsRestorePlansRequest,
  output: GetTagsProjectsLocationsRestorePlansResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsRestorePlansRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsRestorePlansRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsRestorePlansRequest>;

export type SetIamPolicyProjectsLocationsRestorePlansResponse = Policy;
export const SetIamPolicyProjectsLocationsRestorePlansResponse = Policy;

export type SetIamPolicyProjectsLocationsRestorePlansError = CommonErrors;

export const setIamPolicyProjectsLocationsRestorePlans: API.OperationMethod<SetIamPolicyProjectsLocationsRestorePlansRequest, SetIamPolicyProjectsLocationsRestorePlansResponse, SetIamPolicyProjectsLocationsRestorePlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsRestorePlansRequest,
  output: SetIamPolicyProjectsLocationsRestorePlansResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsRestorePlansRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsRestorePlansRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsRestorePlansRequest>;

export type GetIamPolicyProjectsLocationsRestorePlansResponse = Policy;
export const GetIamPolicyProjectsLocationsRestorePlansResponse = Policy;

export type GetIamPolicyProjectsLocationsRestorePlansError = CommonErrors;

export const getIamPolicyProjectsLocationsRestorePlans: API.OperationMethod<GetIamPolicyProjectsLocationsRestorePlansRequest, GetIamPolicyProjectsLocationsRestorePlansResponse, GetIamPolicyProjectsLocationsRestorePlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsRestorePlansRequest,
  output: GetIamPolicyProjectsLocationsRestorePlansResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsRestorePlansRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsRestorePlansRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsRestorePlansRequest>;

export type TestIamPermissionsProjectsLocationsRestorePlansResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsRestorePlansResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsRestorePlansError = CommonErrors;

export const testIamPermissionsProjectsLocationsRestorePlans: API.OperationMethod<TestIamPermissionsProjectsLocationsRestorePlansRequest, TestIamPermissionsProjectsLocationsRestorePlansResponse, TestIamPermissionsProjectsLocationsRestorePlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsRestorePlansRequest,
  output: TestIamPermissionsProjectsLocationsRestorePlansResponse,
  errors: [],
}));

/** Creates a new Restore for the given RestorePlan. */
export interface CreateProjectsLocationsRestorePlansRestoresRequest {
  /** Required. The RestorePlan within which to create the Restore. Format: `projects/* /locations/* /restorePlans/*` */
  parent: string;
  /** Required. The client-provided short name for the Restore resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of Restores in this RestorePlan. */
  restoreId?: string;
  /** Request body */
  body?: Restore;
}

export const CreateProjectsLocationsRestorePlansRestoresRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  restoreId: Schema.optional(Schema.String).pipe(T.HttpQuery("restoreId")),
  body: Schema.optional(Restore).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}/restores", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRestorePlansRestoresRequest>;

export type CreateProjectsLocationsRestorePlansRestoresResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsRestorePlansRestoresResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsRestorePlansRestoresError = CommonErrors;

export const createProjectsLocationsRestorePlansRestores: API.OperationMethod<CreateProjectsLocationsRestorePlansRestoresRequest, CreateProjectsLocationsRestorePlansRestoresResponse, CreateProjectsLocationsRestorePlansRestoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRestorePlansRestoresRequest,
  output: CreateProjectsLocationsRestorePlansRestoresResponse,
  errors: [],
}));

/** Lists the Restores for a given RestorePlan. */
export interface ListProjectsLocationsRestorePlansRestoresRequest {
  /** Required. The RestorePlan that contains the Restores to list. Format: `projects/* /locations/* /restorePlans/*` */
  parent: string;
  /** Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The value of next_page_token received from a previous `ListRestores` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListRestores` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Field match expression used to filter the results. */
  filter?: string;
  /** Optional. Field by which to sort the results. */
  orderBy?: string;
}

export const ListProjectsLocationsRestorePlansRestoresRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}/restores" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRestorePlansRestoresRequest>;

export type ListProjectsLocationsRestorePlansRestoresResponse = ListRestoresResponse;
export const ListProjectsLocationsRestorePlansRestoresResponse = ListRestoresResponse;

export type ListProjectsLocationsRestorePlansRestoresError = CommonErrors;

export const listProjectsLocationsRestorePlansRestores = API.makePaginated(() => ({
  input: ListProjectsLocationsRestorePlansRestoresRequest,
  output: ListProjectsLocationsRestorePlansRestoresResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves the details of a single Restore. */
export interface GetProjectsLocationsRestorePlansRestoresRequest {
  /** Required. Name of the restore resource. Format: `projects/* /locations/* /restorePlans/* /restores/*` */
  name: string;
}

export const GetProjectsLocationsRestorePlansRestoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}/restores/{restoresId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRestorePlansRestoresRequest>;

export type GetProjectsLocationsRestorePlansRestoresResponse = Restore;
export const GetProjectsLocationsRestorePlansRestoresResponse = Restore;

export type GetProjectsLocationsRestorePlansRestoresError = CommonErrors;

export const getProjectsLocationsRestorePlansRestores: API.OperationMethod<GetProjectsLocationsRestorePlansRestoresRequest, GetProjectsLocationsRestorePlansRestoresResponse, GetProjectsLocationsRestorePlansRestoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRestorePlansRestoresRequest,
  output: GetProjectsLocationsRestorePlansRestoresResponse,
  errors: [],
}));

/** Update a Restore. */
export interface PatchProjectsLocationsRestorePlansRestoresRequest {
  /** Output only. Identifier. The full name of the Restore resource. Format: `projects/* /locations/* /restorePlans/* /restores/*` */
  name: string;
  /** Optional. This is used to specify the fields to be overwritten in the Restore targeted for update. The values for each of these updated fields will be taken from the `restore` provided with this request. Field names are relative to the root of the resource. If no `update_mask` is provided, all fields in `restore` will be written to the target Restore resource. Note that OUTPUT_ONLY and IMMUTABLE fields in `restore` are ignored and are not used to update the target Restore. */
  updateMask?: string;
  /** Request body */
  body?: Restore;
}

export const PatchProjectsLocationsRestorePlansRestoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Restore).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}/restores/{restoresId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRestorePlansRestoresRequest>;

export type PatchProjectsLocationsRestorePlansRestoresResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsRestorePlansRestoresResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsRestorePlansRestoresError = CommonErrors;

export const patchProjectsLocationsRestorePlansRestores: API.OperationMethod<PatchProjectsLocationsRestorePlansRestoresRequest, PatchProjectsLocationsRestorePlansRestoresResponse, PatchProjectsLocationsRestorePlansRestoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRestorePlansRestoresRequest,
  output: PatchProjectsLocationsRestorePlansRestoresResponse,
  errors: [],
}));

/** Deletes an existing Restore. */
export interface DeleteProjectsLocationsRestorePlansRestoresRequest {
  /** Required. Full name of the Restore Format: `projects/* /locations/* /restorePlans/* /restores/*` */
  name: string;
  /** Optional. If provided, this value must match the current value of the target Restore's etag field or the request is rejected. */
  etag?: string;
  /** Optional. If set to true, any VolumeRestores below this restore will also be deleted. Otherwise, the request will only succeed if the restore has no VolumeRestores. */
  force?: boolean;
}

export const DeleteProjectsLocationsRestorePlansRestoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}/restores/{restoresId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRestorePlansRestoresRequest>;

export type DeleteProjectsLocationsRestorePlansRestoresResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsRestorePlansRestoresResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsRestorePlansRestoresError = CommonErrors;

export const deleteProjectsLocationsRestorePlansRestores: API.OperationMethod<DeleteProjectsLocationsRestorePlansRestoresRequest, DeleteProjectsLocationsRestorePlansRestoresResponse, DeleteProjectsLocationsRestorePlansRestoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRestorePlansRestoresRequest,
  output: DeleteProjectsLocationsRestorePlansRestoresResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsRestorePlansRestoresRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsRestorePlansRestoresRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}/restores/{restoresId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsRestorePlansRestoresRequest>;

export type SetIamPolicyProjectsLocationsRestorePlansRestoresResponse = Policy;
export const SetIamPolicyProjectsLocationsRestorePlansRestoresResponse = Policy;

export type SetIamPolicyProjectsLocationsRestorePlansRestoresError = CommonErrors;

export const setIamPolicyProjectsLocationsRestorePlansRestores: API.OperationMethod<SetIamPolicyProjectsLocationsRestorePlansRestoresRequest, SetIamPolicyProjectsLocationsRestorePlansRestoresResponse, SetIamPolicyProjectsLocationsRestorePlansRestoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsRestorePlansRestoresRequest,
  output: SetIamPolicyProjectsLocationsRestorePlansRestoresResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsRestorePlansRestoresRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsRestorePlansRestoresRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}/restores/{restoresId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsRestorePlansRestoresRequest>;

export type GetIamPolicyProjectsLocationsRestorePlansRestoresResponse = Policy;
export const GetIamPolicyProjectsLocationsRestorePlansRestoresResponse = Policy;

export type GetIamPolicyProjectsLocationsRestorePlansRestoresError = CommonErrors;

export const getIamPolicyProjectsLocationsRestorePlansRestores: API.OperationMethod<GetIamPolicyProjectsLocationsRestorePlansRestoresRequest, GetIamPolicyProjectsLocationsRestorePlansRestoresResponse, GetIamPolicyProjectsLocationsRestorePlansRestoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsRestorePlansRestoresRequest,
  output: GetIamPolicyProjectsLocationsRestorePlansRestoresResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsRestorePlansRestoresRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsRestorePlansRestoresRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}/restores/{restoresId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsRestorePlansRestoresRequest>;

export type TestIamPermissionsProjectsLocationsRestorePlansRestoresResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsRestorePlansRestoresResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsRestorePlansRestoresError = CommonErrors;

export const testIamPermissionsProjectsLocationsRestorePlansRestores: API.OperationMethod<TestIamPermissionsProjectsLocationsRestorePlansRestoresRequest, TestIamPermissionsProjectsLocationsRestorePlansRestoresResponse, TestIamPermissionsProjectsLocationsRestorePlansRestoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsRestorePlansRestoresRequest,
  output: TestIamPermissionsProjectsLocationsRestorePlansRestoresResponse,
  errors: [],
}));

/** Lists the VolumeRestores for a given Restore. */
export interface ListProjectsLocationsRestorePlansRestoresVolumeRestoresRequest {
  /** Required. The Restore that contains the VolumeRestores to list. Format: `projects/* /locations/* /restorePlans/* /restores/*` */
  parent: string;
  /** Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The value of next_page_token received from a previous `ListVolumeRestores` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListVolumeRestores` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Field match expression used to filter the results. */
  filter?: string;
  /** Optional. Field by which to sort the results. */
  orderBy?: string;
}

export const ListProjectsLocationsRestorePlansRestoresVolumeRestoresRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}/restores/{restoresId}/volumeRestores" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRestorePlansRestoresVolumeRestoresRequest>;

export type ListProjectsLocationsRestorePlansRestoresVolumeRestoresResponse = ListVolumeRestoresResponse;
export const ListProjectsLocationsRestorePlansRestoresVolumeRestoresResponse = ListVolumeRestoresResponse;

export type ListProjectsLocationsRestorePlansRestoresVolumeRestoresError = CommonErrors;

export const listProjectsLocationsRestorePlansRestoresVolumeRestores = API.makePaginated(() => ({
  input: ListProjectsLocationsRestorePlansRestoresVolumeRestoresRequest,
  output: ListProjectsLocationsRestorePlansRestoresVolumeRestoresResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieve the details of a single VolumeRestore. */
export interface GetProjectsLocationsRestorePlansRestoresVolumeRestoresRequest {
  /** Required. Full name of the VolumeRestore resource. Format: `projects/* /locations/* /restorePlans/* /restores/* /volumeRestores/*` */
  name: string;
}

export const GetProjectsLocationsRestorePlansRestoresVolumeRestoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}/restores/{restoresId}/volumeRestores/{volumeRestoresId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRestorePlansRestoresVolumeRestoresRequest>;

export type GetProjectsLocationsRestorePlansRestoresVolumeRestoresResponse = VolumeRestore;
export const GetProjectsLocationsRestorePlansRestoresVolumeRestoresResponse = VolumeRestore;

export type GetProjectsLocationsRestorePlansRestoresVolumeRestoresError = CommonErrors;

export const getProjectsLocationsRestorePlansRestoresVolumeRestores: API.OperationMethod<GetProjectsLocationsRestorePlansRestoresVolumeRestoresRequest, GetProjectsLocationsRestorePlansRestoresVolumeRestoresResponse, GetProjectsLocationsRestorePlansRestoresVolumeRestoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRestorePlansRestoresVolumeRestoresRequest,
  output: GetProjectsLocationsRestorePlansRestoresVolumeRestoresResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}/restores/{restoresId}/volumeRestores/{volumeRestoresId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresRequest>;

export type SetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresResponse = Policy;
export const SetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresResponse = Policy;

export type SetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresError = CommonErrors;

export const setIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestores: API.OperationMethod<SetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresRequest, SetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresResponse, SetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresRequest,
  output: SetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}/restores/{restoresId}/volumeRestores/{volumeRestoresId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresRequest>;

export type GetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresResponse = Policy;
export const GetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresResponse = Policy;

export type GetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresError = CommonErrors;

export const getIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestores: API.OperationMethod<GetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresRequest, GetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresResponse, GetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresRequest,
  output: GetIamPolicyProjectsLocationsRestorePlansRestoresVolumeRestoresResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsRestorePlansRestoresVolumeRestoresRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsRestorePlansRestoresVolumeRestoresRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/restorePlans/{restorePlansId}/restores/{restoresId}/volumeRestores/{volumeRestoresId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsRestorePlansRestoresVolumeRestoresRequest>;

export type TestIamPermissionsProjectsLocationsRestorePlansRestoresVolumeRestoresResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsRestorePlansRestoresVolumeRestoresResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsRestorePlansRestoresVolumeRestoresError = CommonErrors;

export const testIamPermissionsProjectsLocationsRestorePlansRestoresVolumeRestores: API.OperationMethod<TestIamPermissionsProjectsLocationsRestorePlansRestoresVolumeRestoresRequest, TestIamPermissionsProjectsLocationsRestorePlansRestoresVolumeRestoresResponse, TestIamPermissionsProjectsLocationsRestorePlansRestoresVolumeRestoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsRestorePlansRestoresVolumeRestoresRequest,
  output: TestIamPermissionsProjectsLocationsRestorePlansRestoresVolumeRestoresResponse,
  errors: [],
}));

/** Creates a new RestoreChannel in a given location. */
export interface CreateProjectsLocationsRestoreChannelsRequest {
  /** Required. The location within which to create the RestoreChannel. Format: `projects/* /locations/*` */
  parent: string;
  /** Optional. The client-provided short name for the RestoreChannel resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of RestoreChannels in this location If the user does not provide a name, a uuid will be used as the name. */
  restoreChannelId?: string;
  /** Request body */
  body?: RestoreChannel;
}

export const CreateProjectsLocationsRestoreChannelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  restoreChannelId: Schema.optional(Schema.String).pipe(T.HttpQuery("restoreChannelId")),
  body: Schema.optional(RestoreChannel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/restoreChannels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRestoreChannelsRequest>;

export type CreateProjectsLocationsRestoreChannelsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsRestoreChannelsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsRestoreChannelsError = CommonErrors;

export const createProjectsLocationsRestoreChannels: API.OperationMethod<CreateProjectsLocationsRestoreChannelsRequest, CreateProjectsLocationsRestoreChannelsResponse, CreateProjectsLocationsRestoreChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRestoreChannelsRequest,
  output: CreateProjectsLocationsRestoreChannelsResponse,
  errors: [],
}));

/** Lists RestoreChannels in a given location. */
export interface ListProjectsLocationsRestoreChannelsRequest {
  /** Required. The location that contains the RestoreChannels to list. Format: `projects/* /locations/*` */
  parent: string;
  /** Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The value of next_page_token received from a previous `ListRestoreChannels` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListRestoreChannels` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Field match expression used to filter the results. */
  filter?: string;
  /** Optional. Field by which to sort the results. */
  orderBy?: string;
}

export const ListProjectsLocationsRestoreChannelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/restoreChannels" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRestoreChannelsRequest>;

export type ListProjectsLocationsRestoreChannelsResponse = ListRestoreChannelsResponse;
export const ListProjectsLocationsRestoreChannelsResponse = ListRestoreChannelsResponse;

export type ListProjectsLocationsRestoreChannelsError = CommonErrors;

export const listProjectsLocationsRestoreChannels = API.makePaginated(() => ({
  input: ListProjectsLocationsRestoreChannelsRequest,
  output: ListProjectsLocationsRestoreChannelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieve the details of a single RestoreChannel. */
export interface GetProjectsLocationsRestoreChannelsRequest {
  /** Required. Fully qualified RestoreChannel name. Format: `projects/* /locations/* /restoreChannels/*` */
  name: string;
}

export const GetProjectsLocationsRestoreChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/restoreChannels/{restoreChannelsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRestoreChannelsRequest>;

export type GetProjectsLocationsRestoreChannelsResponse = RestoreChannel;
export const GetProjectsLocationsRestoreChannelsResponse = RestoreChannel;

export type GetProjectsLocationsRestoreChannelsError = CommonErrors;

export const getProjectsLocationsRestoreChannels: API.OperationMethod<GetProjectsLocationsRestoreChannelsRequest, GetProjectsLocationsRestoreChannelsResponse, GetProjectsLocationsRestoreChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRestoreChannelsRequest,
  output: GetProjectsLocationsRestoreChannelsResponse,
  errors: [],
}));

/** Update a RestoreChannel. */
export interface PatchProjectsLocationsRestoreChannelsRequest {
  /** Identifier. The fully qualified name of the RestoreChannel. `projects/* /locations/* /restoreChannels/*` */
  name: string;
  /** Optional. This is used to specify the fields to be overwritten in the RestoreChannel targeted for update. The values for each of these updated fields will be taken from the `restore_channel` provided with this request. Field names are relative to the root of the resource (e.g., `description`, `destination_project_id`, etc.) If no `update_mask` is provided, all fields in `restore_channel` will be written to the target RestoreChannel resource. Note that OUTPUT_ONLY and IMMUTABLE fields in `restore_channel` are ignored and are not used to update the target RestoreChannel. */
  updateMask?: string;
  /** Request body */
  body?: RestoreChannel;
}

export const PatchProjectsLocationsRestoreChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(RestoreChannel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/restoreChannels/{restoreChannelsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRestoreChannelsRequest>;

export type PatchProjectsLocationsRestoreChannelsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsRestoreChannelsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsRestoreChannelsError = CommonErrors;

export const patchProjectsLocationsRestoreChannels: API.OperationMethod<PatchProjectsLocationsRestoreChannelsRequest, PatchProjectsLocationsRestoreChannelsResponse, PatchProjectsLocationsRestoreChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRestoreChannelsRequest,
  output: PatchProjectsLocationsRestoreChannelsResponse,
  errors: [],
}));

/** Deletes an existing RestoreChannel. */
export interface DeleteProjectsLocationsRestoreChannelsRequest {
  /** Required. Fully qualified RestoreChannel name. Format: `projects/* /locations/* /restoreChannels/*` */
  name: string;
  /** Optional. If provided, this value must match the current value of the target RestoreChannel's etag field or the request is rejected. */
  etag?: string;
}

export const DeleteProjectsLocationsRestoreChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/restoreChannels/{restoreChannelsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRestoreChannelsRequest>;

export type DeleteProjectsLocationsRestoreChannelsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsRestoreChannelsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsRestoreChannelsError = CommonErrors;

export const deleteProjectsLocationsRestoreChannels: API.OperationMethod<DeleteProjectsLocationsRestoreChannelsRequest, DeleteProjectsLocationsRestoreChannelsResponse, DeleteProjectsLocationsRestoreChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRestoreChannelsRequest,
  output: DeleteProjectsLocationsRestoreChannelsResponse,
  errors: [],
}));

/** Lists RestorePlanBindings in a given location. */
export interface ListProjectsLocationsRestoreChannelsRestorePlanBindingsRequest {
  /** Required. The RestoreChannel that contains the ListRestorePlanBindings to list. Format: `projects/* /locations/* /restoreChannels/*` */
  parent: string;
  /** Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The value of next_page_token received from a previous `ListRestorePlanBindings` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListRestorePlanBindings` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Field match expression used to filter the results. */
  filter?: string;
  /** Optional. Field by which to sort the results. */
  orderBy?: string;
}

export const ListProjectsLocationsRestoreChannelsRestorePlanBindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/restoreChannels/{restoreChannelsId}/restorePlanBindings" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRestoreChannelsRestorePlanBindingsRequest>;

export type ListProjectsLocationsRestoreChannelsRestorePlanBindingsResponse = ListRestorePlanBindingsResponse;
export const ListProjectsLocationsRestoreChannelsRestorePlanBindingsResponse = ListRestorePlanBindingsResponse;

export type ListProjectsLocationsRestoreChannelsRestorePlanBindingsError = CommonErrors;

export const listProjectsLocationsRestoreChannelsRestorePlanBindings = API.makePaginated(() => ({
  input: ListProjectsLocationsRestoreChannelsRestorePlanBindingsRequest,
  output: ListProjectsLocationsRestoreChannelsRestorePlanBindingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieve the details of a single RestorePlanBinding. */
export interface GetProjectsLocationsRestoreChannelsRestorePlanBindingsRequest {
  /** Required. Fully qualified RestorePlanBinding name. Format: `projects/* /locations/* /restoreChannels/* /restorePlanBindings/*` */
  name: string;
}

export const GetProjectsLocationsRestoreChannelsRestorePlanBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/restoreChannels/{restoreChannelsId}/restorePlanBindings/{restorePlanBindingsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRestoreChannelsRestorePlanBindingsRequest>;

export type GetProjectsLocationsRestoreChannelsRestorePlanBindingsResponse = RestorePlanBinding;
export const GetProjectsLocationsRestoreChannelsRestorePlanBindingsResponse = RestorePlanBinding;

export type GetProjectsLocationsRestoreChannelsRestorePlanBindingsError = CommonErrors;

export const getProjectsLocationsRestoreChannelsRestorePlanBindings: API.OperationMethod<GetProjectsLocationsRestoreChannelsRestorePlanBindingsRequest, GetProjectsLocationsRestoreChannelsRestorePlanBindingsResponse, GetProjectsLocationsRestoreChannelsRestorePlanBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRestoreChannelsRestorePlanBindingsRequest,
  output: GetProjectsLocationsRestoreChannelsRestorePlanBindingsResponse,
  errors: [],
}));

