// ==========================================================================
// OS Config API (osconfig v1beta)
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
  name: "osconfig",
  version: "v1beta",
  rootUrl: "https://osconfig.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface WeekDayOfMonth {
  /** Required. Week number in a month. 1-4 indicates the 1st to 4th week of the month. -1 indicates the last week of the month. */
  weekOrdinal?: number;
  /** Optional. Represents the number of days before or after the given week day of month that the patch deployment is scheduled for. For example if `week_ordinal` and `day_of_week` values point to the second day of the month and this `day_offset` value is set to `3`, the patch deployment takes place three days after the second Tuesday of the month. If this value is negative, for example -5, the patches are deployed five days before before the second Tuesday of the month. Allowed values are in range [-30, 30]. */
  dayOffset?: number;
  /** Required. A day of the week. */
  dayOfWeek?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
}

export const WeekDayOfMonth: Schema.Schema<WeekDayOfMonth> = Schema.suspend(() => Schema.Struct({
  weekOrdinal: Schema.optional(Schema.Number),
  dayOffset: Schema.optional(Schema.Number),
  dayOfWeek: Schema.optional(Schema.String),
})).annotate({ identifier: "WeekDayOfMonth" }) as any as Schema.Schema<WeekDayOfMonth>;

export interface MonthlySchedule {
  /** Required. Week day in a month. */
  weekDayOfMonth?: WeekDayOfMonth;
  /** Required. One day of the month. 1-31 indicates the 1st to the 31st day. -1 indicates the last day of the month. Months without the target day will be skipped. For example, a schedule to run "every month on the 31st" will not run in February, April, June, etc. */
  monthDay?: number;
}

export const MonthlySchedule: Schema.Schema<MonthlySchedule> = Schema.suspend(() => Schema.Struct({
  weekDayOfMonth: Schema.optional(WeekDayOfMonth),
  monthDay: Schema.optional(Schema.Number),
})).annotate({ identifier: "MonthlySchedule" }) as any as Schema.Schema<MonthlySchedule>;

export interface TimeZone {
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  version?: string;
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  id?: string;
}

export const TimeZone: Schema.Schema<TimeZone> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeZone" }) as any as Schema.Schema<TimeZone>;

export interface WeeklySchedule {
  /** Required. Day of the week. */
  dayOfWeek?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
}

export const WeeklySchedule: Schema.Schema<WeeklySchedule> = Schema.suspend(() => Schema.Struct({
  dayOfWeek: Schema.optional(Schema.String),
})).annotate({ identifier: "WeeklySchedule" }) as any as Schema.Schema<WeeklySchedule>;

export interface TimeOfDay {
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() => Schema.Struct({
  nanos: Schema.optional(Schema.Number),
  hours: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
})).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface RecurringSchedule {
  /** Optional. The end time at which a recurring patch deployment schedule is no longer active. */
  endTime?: string;
  /** Required. The frequency unit of this recurring schedule. */
  frequency?: "FREQUENCY_UNSPECIFIED" | "WEEKLY" | "MONTHLY" | "DAILY" | (string & {});
  /** Required. Schedule with monthly executions. */
  monthly?: MonthlySchedule;
  /** Required. Defines the time zone that `time_of_day` is relative to. The rules for daylight saving time are determined by the chosen time zone. */
  timeZone?: TimeZone;
  /** Required. Schedule with weekly executions. */
  weekly?: WeeklySchedule;
  /** Optional. The time that the recurring schedule becomes effective. Defaults to `create_time` of the patch deployment. */
  startTime?: string;
  /** Required. Time of the day to run a recurring deployment. */
  timeOfDay?: TimeOfDay;
  /** Output only. The time the last patch job ran successfully. */
  lastExecuteTime?: string;
  /** Output only. The time the next patch job is scheduled to run. */
  nextExecuteTime?: string;
}

export const RecurringSchedule: Schema.Schema<RecurringSchedule> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  frequency: Schema.optional(Schema.String),
  monthly: Schema.optional(MonthlySchedule),
  timeZone: Schema.optional(TimeZone),
  weekly: Schema.optional(WeeklySchedule),
  startTime: Schema.optional(Schema.String),
  timeOfDay: Schema.optional(TimeOfDay),
  lastExecuteTime: Schema.optional(Schema.String),
  nextExecuteTime: Schema.optional(Schema.String),
})).annotate({ identifier: "RecurringSchedule" }) as any as Schema.Schema<RecurringSchedule>;

export interface YumRepository {
  /** The display name of the repository. */
  displayName?: string;
  /** Required. The location of the repository directory. */
  baseUrl?: string;
  /** Required. A one word, unique name for this repository. This is the `repo id` in the Yum config file and also the `display_name` if `display_name` is omitted. This id is also used as the unique identifier when checking for guest policy conflicts. */
  id?: string;
  /** URIs of GPG keys. */
  gpgKeys?: Array<string>;
}

export const YumRepository: Schema.Schema<YumRepository> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  baseUrl: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  gpgKeys: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "YumRepository" }) as any as Schema.Schema<YumRepository>;

export interface ZypperSettings {
  /** List of patches to exclude from update. */
  excludes?: Array<string>;
  /** Adds the `--with-update` flag, to `zypper patch`. */
  withUpdate?: boolean;
  /** An exclusive list of patches to be updated. These are the only patches that will be installed using 'zypper patch patch:' command. This field must not be used with any other patch configuration fields. */
  exclusivePatches?: Array<string>;
  /** Install only patches with these severities. Common severities include critical, important, moderate, and low. */
  severities?: Array<string>;
  /** Adds the `--with-optional` flag to `zypper patch`. */
  withOptional?: boolean;
  /** Install only patches with these categories. Common categories include security, recommended, and feature. */
  categories?: Array<string>;
}

export const ZypperSettings: Schema.Schema<ZypperSettings> = Schema.suspend(() => Schema.Struct({
  excludes: Schema.optional(Schema.Array(Schema.String)),
  withUpdate: Schema.optional(Schema.Boolean),
  exclusivePatches: Schema.optional(Schema.Array(Schema.String)),
  severities: Schema.optional(Schema.Array(Schema.String)),
  withOptional: Schema.optional(Schema.Boolean),
  categories: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ZypperSettings" }) as any as Schema.Schema<ZypperSettings>;

export interface AssignmentGroupLabel {
  /** Google Compute Engine instance labels that must be present for an instance to be included in this assignment group. */
  labels?: Record<string, string>;
}

export const AssignmentGroupLabel: Schema.Schema<AssignmentGroupLabel> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "AssignmentGroupLabel" }) as any as Schema.Schema<AssignmentGroupLabel>;

export interface PatchJobInstanceDetailsSummary {
  /** Number of instances that require reboot. */
  succeededRebootRequiredInstanceCount?: string;
  /** Number of instances that do not appear to be running the agent. Check to ensure that the agent is installed, running, and able to communicate with the service. */
  noAgentDetectedInstanceCount?: string;
  /** Number of instances that are applying patches. */
  applyingPatchesInstanceCount?: string;
  /** Number of instances that have started. */
  startedInstanceCount?: string;
  /** Number of instances that are running the post-patch step. */
  postPatchStepInstanceCount?: string;
  /** Number of instances that exceeded the time out while applying the patch. */
  timedOutInstanceCount?: string;
  /** Number of instances rebooting. */
  rebootingInstanceCount?: string;
  /** Number of instances that have completed successfully. */
  succeededInstanceCount?: string;
  /** Number of instances pending patch job. */
  pendingInstanceCount?: string;
  /** Number of instances that were skipped during patching. */
  skippedInstanceCount?: string;
  /** Number of instances that have acked and will start shortly. */
  ackedInstanceCount?: string;
  /** Number of instances that are downloading patches. */
  downloadingPatchesInstanceCount?: string;
  /** Number of instances notified about patch job. */
  notifiedInstanceCount?: string;
  /** Number of instances that are running the pre-patch step. */
  prePatchStepInstanceCount?: string;
  /** Number of instances that failed. */
  failedInstanceCount?: string;
  /** Number of instances that are inactive. */
  inactiveInstanceCount?: string;
}

export const PatchJobInstanceDetailsSummary: Schema.Schema<PatchJobInstanceDetailsSummary> = Schema.suspend(() => Schema.Struct({
  succeededRebootRequiredInstanceCount: Schema.optional(Schema.String),
  noAgentDetectedInstanceCount: Schema.optional(Schema.String),
  applyingPatchesInstanceCount: Schema.optional(Schema.String),
  startedInstanceCount: Schema.optional(Schema.String),
  postPatchStepInstanceCount: Schema.optional(Schema.String),
  timedOutInstanceCount: Schema.optional(Schema.String),
  rebootingInstanceCount: Schema.optional(Schema.String),
  succeededInstanceCount: Schema.optional(Schema.String),
  pendingInstanceCount: Schema.optional(Schema.String),
  skippedInstanceCount: Schema.optional(Schema.String),
  ackedInstanceCount: Schema.optional(Schema.String),
  downloadingPatchesInstanceCount: Schema.optional(Schema.String),
  notifiedInstanceCount: Schema.optional(Schema.String),
  prePatchStepInstanceCount: Schema.optional(Schema.String),
  failedInstanceCount: Schema.optional(Schema.String),
  inactiveInstanceCount: Schema.optional(Schema.String),
})).annotate({ identifier: "PatchJobInstanceDetailsSummary" }) as any as Schema.Schema<PatchJobInstanceDetailsSummary>;

export interface PatchInstanceFilterGroupLabel {
  /** Compute Engine instance labels that must be present for a VM instance to be targeted by this filter. */
  labels?: Record<string, string>;
}

export const PatchInstanceFilterGroupLabel: Schema.Schema<PatchInstanceFilterGroupLabel> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "PatchInstanceFilterGroupLabel" }) as any as Schema.Schema<PatchInstanceFilterGroupLabel>;

export interface PatchInstanceFilter {
  /** Targets VM instances matching at least one of these label sets. This allows targeting of disparate groups, for example "env=prod or env=staging". */
  groupLabels?: Array<PatchInstanceFilterGroupLabel>;
  /** Targets VM instances in ANY of these zones. Leave empty to target VM instances in any zone. */
  zones?: Array<string>;
  /** Target all VM instances in the project. If true, no other criteria is permitted. */
  all?: boolean;
  /** Targets any of the VM instances specified. Instances are specified by their URI in the form `zones/[ZONE]/instances/[INSTANCE_NAME]`, `projects/[PROJECT_ID]/zones/[ZONE]/instances/[INSTANCE_NAME]`, or `https://www.googleapis.com/compute/v1/projects/[PROJECT_ID]/zones/[ZONE]/instances/[INSTANCE_NAME]` */
  instances?: Array<string>;
  /** Targets VMs whose name starts with one of these prefixes. Similar to labels, this is another way to group VMs when targeting configs, for example prefix="prod-". */
  instanceNamePrefixes?: Array<string>;
}

export const PatchInstanceFilter: Schema.Schema<PatchInstanceFilter> = Schema.suspend(() => Schema.Struct({
  groupLabels: Schema.optional(Schema.Array(PatchInstanceFilterGroupLabel)),
  zones: Schema.optional(Schema.Array(Schema.String)),
  all: Schema.optional(Schema.Boolean),
  instances: Schema.optional(Schema.Array(Schema.String)),
  instanceNamePrefixes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PatchInstanceFilter" }) as any as Schema.Schema<PatchInstanceFilter>;

export interface AptSettings {
  /** By changing the type to DIST, the patching is performed using `apt-get dist-upgrade` instead. */
  type?: "TYPE_UNSPECIFIED" | "DIST" | "UPGRADE" | (string & {});
  /** An exclusive list of packages to be updated. These are the only packages that will be updated. If these packages are not installed, they will be ignored. This field cannot be specified with any other patch configuration fields. */
  exclusivePackages?: Array<string>;
  /** List of packages to exclude from update. These packages will be excluded */
  excludes?: Array<string>;
}

export const AptSettings: Schema.Schema<AptSettings> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  exclusivePackages: Schema.optional(Schema.Array(Schema.String)),
  excludes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AptSettings" }) as any as Schema.Schema<AptSettings>;

export interface WindowsUpdateSettings {
  /** Only apply updates of these windows update classifications. If empty, all updates are applied. */
  classifications?: Array<"CLASSIFICATION_UNSPECIFIED" | "CRITICAL" | "SECURITY" | "DEFINITION" | "DRIVER" | "FEATURE_PACK" | "SERVICE_PACK" | "TOOL" | "UPDATE_ROLLUP" | "UPDATE" | (string & {})>;
  /** An exclusive list of kbs to be updated. These are the only patches that will be updated. This field must not be used with other patch configurations. */
  exclusivePatches?: Array<string>;
  /** List of KBs to exclude from update. */
  excludes?: Array<string>;
}

export const WindowsUpdateSettings: Schema.Schema<WindowsUpdateSettings> = Schema.suspend(() => Schema.Struct({
  classifications: Schema.optional(Schema.Array(Schema.String)),
  exclusivePatches: Schema.optional(Schema.Array(Schema.String)),
  excludes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "WindowsUpdateSettings" }) as any as Schema.Schema<WindowsUpdateSettings>;

export interface GcsObject {
  /** Required. Bucket of the Google Cloud Storage object. */
  bucket?: string;
  /** Required. Name of the Google Cloud Storage object. */
  object?: string;
  /** Required. Generation number of the Google Cloud Storage object. This is used to ensure that the ExecStep specified by this PatchJob does not change. */
  generationNumber?: string;
}

export const GcsObject: Schema.Schema<GcsObject> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
  object: Schema.optional(Schema.String),
  generationNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GcsObject" }) as any as Schema.Schema<GcsObject>;

export interface ExecStepConfig {
  /** Defaults to [0]. A list of possible return values that the execution can return to indicate a success. */
  allowedSuccessCodes?: Array<number>;
  /** An absolute path to the executable on the VM. */
  localPath?: string;
  /** The script interpreter to use to run the script. If no interpreter is specified the script will be executed directly, which will likely only succeed for scripts with [shebang lines] (https://en.wikipedia.org/wiki/Shebang_\(Unix\)). */
  interpreter?: "INTERPRETER_UNSPECIFIED" | "NONE" | "SHELL" | "POWERSHELL" | (string & {});
  /** A Google Cloud Storage object containing the executable. */
  gcsObject?: GcsObject;
}

export const ExecStepConfig: Schema.Schema<ExecStepConfig> = Schema.suspend(() => Schema.Struct({
  allowedSuccessCodes: Schema.optional(Schema.Array(Schema.Number)),
  localPath: Schema.optional(Schema.String),
  interpreter: Schema.optional(Schema.String),
  gcsObject: Schema.optional(GcsObject),
})).annotate({ identifier: "ExecStepConfig" }) as any as Schema.Schema<ExecStepConfig>;

export interface ExecStep {
  /** The ExecStepConfig for all Windows VMs targeted by the PatchJob. */
  windowsExecStepConfig?: ExecStepConfig;
  /** The ExecStepConfig for all Linux VMs targeted by the PatchJob. */
  linuxExecStepConfig?: ExecStepConfig;
}

export const ExecStep: Schema.Schema<ExecStep> = Schema.suspend(() => Schema.Struct({
  windowsExecStepConfig: Schema.optional(ExecStepConfig),
  linuxExecStepConfig: Schema.optional(ExecStepConfig),
})).annotate({ identifier: "ExecStep" }) as any as Schema.Schema<ExecStep>;

export interface YumSettings {
  /** List of packages to exclude from update. These packages are excluded by using the yum `--exclude` flag. */
  excludes?: Array<string>;
  /** Adds the `--security` flag to `yum update`. Not supported on all platforms. */
  security?: boolean;
  /** An exclusive list of packages to be updated. These are the only packages that will be updated. If these packages are not installed, they will be ignored. This field must not be specified with any other patch configuration fields. */
  exclusivePackages?: Array<string>;
  /** Will cause patch to run `yum update-minimal` instead. */
  minimal?: boolean;
}

export const YumSettings: Schema.Schema<YumSettings> = Schema.suspend(() => Schema.Struct({
  excludes: Schema.optional(Schema.Array(Schema.String)),
  security: Schema.optional(Schema.Boolean),
  exclusivePackages: Schema.optional(Schema.Array(Schema.String)),
  minimal: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "YumSettings" }) as any as Schema.Schema<YumSettings>;

export interface GooSettings {
}

export const GooSettings: Schema.Schema<GooSettings> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooSettings" }) as any as Schema.Schema<GooSettings>;

export interface PatchConfig {
  /** Post-patch reboot settings. */
  rebootConfig?: "REBOOT_CONFIG_UNSPECIFIED" | "DEFAULT" | "ALWAYS" | "NEVER" | (string & {});
  /** Apt update settings. Use this setting to override the default `apt` patch rules. */
  apt?: AptSettings;
  /** Windows update settings. Use this override the default windows patch rules. */
  windowsUpdate?: WindowsUpdateSettings;
  /** Zypper update settings. Use this setting to override the default `zypper` patch rules. */
  zypper?: ZypperSettings;
  /** Optional. Enables enhanced reporting for the patch job: 1. The patch job skips instances that cannot be patched and reports them as `SKIPPED`. An instance cannot be patched for two reasons: 1. The instance runs Container-Optimized OS (COS), which cannot be patched. 2. The instance is part of a managed instance group (MIG), and patching MIG instances is disabled in the patch job's configuration (PatchConfig.migInstancesAllowed is `false`). 2. The patch job is reported as `SUCCEEDED` if it completes without errors, even if some instances are `SKIPPED`. 3. The patch job is reported as `COMPLETED_WITH_INACTIVE_VMS` if it completes without errors, but does not patch instances that are `INACTIVE`. */
  skipUnpatchableVms?: boolean;
  /** The `ExecStep` to run after the patch update. */
  postStep?: ExecStep;
  /** Yum update settings. Use this setting to override the default `yum` patch rules. */
  yum?: YumSettings;
  /** Goo update settings. Use this setting to override the default `goo` patch rules. */
  goo?: GooSettings;
  /** The `ExecStep` to run before the patch update. */
  preStep?: ExecStep;
  /** Allows the patch job to run on Managed instance groups (MIGs). */
  migInstancesAllowed?: boolean;
}

export const PatchConfig: Schema.Schema<PatchConfig> = Schema.suspend(() => Schema.Struct({
  rebootConfig: Schema.optional(Schema.String),
  apt: Schema.optional(AptSettings),
  windowsUpdate: Schema.optional(WindowsUpdateSettings),
  zypper: Schema.optional(ZypperSettings),
  skipUnpatchableVms: Schema.optional(Schema.Boolean),
  postStep: Schema.optional(ExecStep),
  yum: Schema.optional(YumSettings),
  goo: Schema.optional(GooSettings),
  preStep: Schema.optional(ExecStep),
  migInstancesAllowed: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PatchConfig" }) as any as Schema.Schema<PatchConfig>;

export interface FixedOrPercent {
  /** Specifies a fixed value. */
  fixed?: number;
  /** Specifies the relative value defined as a percentage, which will be multiplied by a reference value. */
  percent?: number;
}

export const FixedOrPercent: Schema.Schema<FixedOrPercent> = Schema.suspend(() => Schema.Struct({
  fixed: Schema.optional(Schema.Number),
  percent: Schema.optional(Schema.Number),
})).annotate({ identifier: "FixedOrPercent" }) as any as Schema.Schema<FixedOrPercent>;

export interface PatchRollout {
  /** Mode of the patch rollout. */
  mode?: "MODE_UNSPECIFIED" | "ZONE_BY_ZONE" | "CONCURRENT_ZONES" | (string & {});
  /** The maximum number (or percentage) of VMs per zone to disrupt at any given moment. The number of VMs calculated from multiplying the percentage by the total number of VMs in a zone is rounded up. During patching, a VM is considered disrupted from the time the agent is notified to begin until patching has completed. This disruption time includes the time to complete reboot and any post-patch steps. A VM contributes to the disruption budget if its patching operation fails either when applying the patches, running pre or post patch steps, or if it fails to respond with a success notification before timing out. VMs that are not running or do not have an active agent do not count toward this disruption budget. For zone-by-zone rollouts, if the disruption budget in a zone is exceeded, the patch job stops, because continuing to the next zone requires completion of the patch process in the previous zone. For example, if the disruption budget has a fixed value of `10`, and 8 VMs fail to patch in the current zone, the patch job continues to patch 2 VMs at a time until the zone is completed. When that zone is completed successfully, patching begins with 10 VMs at a time in the next zone. If 10 VMs in the next zone fail to patch, the patch job stops. */
  disruptionBudget?: FixedOrPercent;
}

export const PatchRollout: Schema.Schema<PatchRollout> = Schema.suspend(() => Schema.Struct({
  mode: Schema.optional(Schema.String),
  disruptionBudget: Schema.optional(FixedOrPercent),
})).annotate({ identifier: "PatchRollout" }) as any as Schema.Schema<PatchRollout>;

export interface PatchJob {
  /** Last time this patch job was updated. */
  updateTime?: string;
  /** Duration of the patch job. After the duration ends, the patch job times out. */
  duration?: string;
  /** If this patch job failed, this message provides information about the failure. */
  errorMessage?: string;
  /** Summary of instance details. */
  instanceDetailsSummary?: PatchJobInstanceDetailsSummary;
  /** Display name for this patch job. This is not a unique identifier. */
  displayName?: string;
  /** If this patch job is a dry run, the agent reports that it has finished without running any updates on the VM instance. */
  dryRun?: boolean;
  /** Unique identifier for this patch job in the form `projects/* /patchJobs/*` */
  name?: string;
  /** Instances to patch. */
  instanceFilter?: PatchInstanceFilter;
  /** Output only. Name of the patch deployment that created this patch job. */
  patchDeployment?: string;
  /** Time this patch job was created. */
  createTime?: string;
  /** Patch configuration being applied. */
  patchConfig?: PatchConfig;
  /** Reflects the overall progress of the patch job in the range of 0.0 being no progress to 100.0 being complete. */
  percentComplete?: number;
  /** The current state of the PatchJob. */
  state?: "STATE_UNSPECIFIED" | "STARTED" | "INSTANCE_LOOKUP" | "PATCHING" | "SUCCEEDED" | "COMPLETED_WITH_INACTIVE_VMS" | "COMPLETED_WITH_ERRORS" | "CANCELED" | "TIMED_OUT" | (string & {});
  /** Description of the patch job. Length of the description is limited to 1024 characters. */
  description?: string;
  /** Rollout strategy being applied. */
  rollout?: PatchRollout;
}

export const PatchJob: Schema.Schema<PatchJob> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  instanceDetailsSummary: Schema.optional(PatchJobInstanceDetailsSummary),
  displayName: Schema.optional(Schema.String),
  dryRun: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  instanceFilter: Schema.optional(PatchInstanceFilter),
  patchDeployment: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  patchConfig: Schema.optional(PatchConfig),
  percentComplete: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  rollout: Schema.optional(PatchRollout),
})).annotate({ identifier: "PatchJob" }) as any as Schema.Schema<PatchJob>;

export interface PatchJobInstanceDetails {
  /** The number of times the agent that the agent attempts to apply the patch. */
  attemptCount?: string;
  /** Current state of instance patch. */
  state?: "PATCH_STATE_UNSPECIFIED" | "PENDING" | "INACTIVE" | "NOTIFIED" | "STARTED" | "DOWNLOADING_PATCHES" | "APPLYING_PATCHES" | "REBOOTING" | "SUCCEEDED" | "SUCCEEDED_REBOOT_REQUIRED" | "FAILED" | "ACKED" | "TIMED_OUT" | "RUNNING_PRE_PATCH_STEP" | "RUNNING_POST_PATCH_STEP" | "NO_AGENT_DETECTED" | "SKIPPED" | (string & {});
  /** The instance name in the form `projects/* /zones/* /instances/*` */
  name?: string;
  /** The unique identifier for the instance. This identifier is defined by the server. */
  instanceSystemId?: string;
  /** If the patch fails, this field provides the reason. */
  failureReason?: string;
}

export const PatchJobInstanceDetails: Schema.Schema<PatchJobInstanceDetails> = Schema.suspend(() => Schema.Struct({
  attemptCount: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  instanceSystemId: Schema.optional(Schema.String),
  failureReason: Schema.optional(Schema.String),
})).annotate({ identifier: "PatchJobInstanceDetails" }) as any as Schema.Schema<PatchJobInstanceDetails>;

export interface SoftwareRecipeArtifactGcs {
  /** Bucket of the Google Cloud Storage object. Given an example URL: `https://storage.googleapis.com/my-bucket/foo/bar#1234567` this value would be `my-bucket`. */
  bucket?: string;
  /** Must be provided if allow_insecure is false. Generation number of the Google Cloud Storage object. `https://storage.googleapis.com/my-bucket/foo/bar#1234567` this value would be `1234567`. */
  generation?: string;
  /** Name of the Google Cloud Storage object. As specified [here] (https://cloud.google.com/storage/docs/naming#objectnames) Given an example URL: `https://storage.googleapis.com/my-bucket/foo/bar#1234567` this value would be `foo/bar`. */
  object?: string;
}

export const SoftwareRecipeArtifactGcs: Schema.Schema<SoftwareRecipeArtifactGcs> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
  generation: Schema.optional(Schema.String),
  object: Schema.optional(Schema.String),
})).annotate({ identifier: "SoftwareRecipeArtifactGcs" }) as any as Schema.Schema<SoftwareRecipeArtifactGcs>;

export interface SoftwareRecipeArtifactRemote {
  /** URI from which to fetch the object. It should contain both the protocol and path following the format {protocol}://{location}. */
  uri?: string;
  /** Must be provided if `allow_insecure` is `false`. SHA256 checksum in hex format, to compare to the checksum of the artifact. If the checksum is not empty and it doesn't match the artifact then the recipe installation fails before running any of the steps. */
  checksum?: string;
}

export const SoftwareRecipeArtifactRemote: Schema.Schema<SoftwareRecipeArtifactRemote> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  checksum: Schema.optional(Schema.String),
})).annotate({ identifier: "SoftwareRecipeArtifactRemote" }) as any as Schema.Schema<SoftwareRecipeArtifactRemote>;

export interface SoftwareRecipeArtifact {
  /** Required. Id of the artifact, which the installation and update steps of this recipe can reference. Artifacts in a recipe cannot have the same id. */
  id?: string;
  /** A Google Cloud Storage artifact. */
  gcs?: SoftwareRecipeArtifactGcs;
  /** A generic remote artifact. */
  remote?: SoftwareRecipeArtifactRemote;
  /** Defaults to false. When false, recipes are subject to validations based on the artifact type: Remote: A checksum must be specified, and only protocols with transport-layer security are permitted. GCS: An object generation number must be specified. */
  allowInsecure?: boolean;
}

export const SoftwareRecipeArtifact: Schema.Schema<SoftwareRecipeArtifact> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  gcs: Schema.optional(SoftwareRecipeArtifactGcs),
  remote: Schema.optional(SoftwareRecipeArtifactRemote),
  allowInsecure: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SoftwareRecipeArtifact" }) as any as Schema.Schema<SoftwareRecipeArtifact>;

export interface GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata {
  /** Reference to the `OSPolicyAssignment` API resource. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}` */
  osPolicyAssignment?: string;
  /** The OS policy assignment API method. */
  apiMethod?: "API_METHOD_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | (string & {});
  /** State of the rollout */
  rolloutState?: "ROLLOUT_STATE_UNSPECIFIED" | "IN_PROGRESS" | "CANCELLING" | "CANCELLED" | "SUCCEEDED" | (string & {});
  /** Rollout update time */
  rolloutUpdateTime?: string;
  /** Rollout start time */
  rolloutStartTime?: string;
}

export const GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata: Schema.Schema<GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata> = Schema.suspend(() => Schema.Struct({
  osPolicyAssignment: Schema.optional(Schema.String),
  apiMethod: Schema.optional(Schema.String),
  rolloutState: Schema.optional(Schema.String),
  rolloutUpdateTime: Schema.optional(Schema.String),
  rolloutStartTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata>;

export interface SoftwareRecipeStepInstallMsi {
  /** The flags to use when installing the MSI defaults to ["/i"] (i.e. the install flag). */
  flags?: Array<string>;
  /** Required. The id of the relevant artifact in the recipe. */
  artifactId?: string;
  /** Return codes that indicate that the software installed or updated successfully. Behaviour defaults to [0] */
  allowedExitCodes?: Array<number>;
}

export const SoftwareRecipeStepInstallMsi: Schema.Schema<SoftwareRecipeStepInstallMsi> = Schema.suspend(() => Schema.Struct({
  flags: Schema.optional(Schema.Array(Schema.String)),
  artifactId: Schema.optional(Schema.String),
  allowedExitCodes: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "SoftwareRecipeStepInstallMsi" }) as any as Schema.Schema<SoftwareRecipeStepInstallMsi>;

export interface GoogleCloudOsconfigV2beta__OperationMetadata {
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
}

export const GoogleCloudOsconfigV2beta__OperationMetadata: Schema.Schema<GoogleCloudOsconfigV2beta__OperationMetadata> = Schema.suspend(() => Schema.Struct({
  target: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudOsconfigV2beta__OperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigV2beta__OperationMetadata>;

export interface ListPatchJobInstanceDetailsResponse {
  /** A list of instance status. */
  patchJobInstanceDetails?: Array<PatchJobInstanceDetails>;
  /** A pagination token that can be used to get the next page of results. */
  nextPageToken?: string;
}

export const ListPatchJobInstanceDetailsResponse: Schema.Schema<ListPatchJobInstanceDetailsResponse> = Schema.suspend(() => Schema.Struct({
  patchJobInstanceDetails: Schema.optional(Schema.Array(PatchJobInstanceDetails)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPatchJobInstanceDetailsResponse" }) as any as Schema.Schema<ListPatchJobInstanceDetailsResponse>;

export interface SoftwareRecipeStepCopyFile {
  /** Whether to allow this step to overwrite existing files. If this is false and the file already exists the file is not overwritten and the step is considered a success. Defaults to false. */
  overwrite?: boolean;
  /** Required. The id of the relevant artifact in the recipe. */
  artifactId?: string;
  /** Consists of three octal digits which represent, in order, the permissions of the owner, group, and other users for the file (similarly to the numeric mode used in the linux chmod utility). Each digit represents a three bit number with the 4 bit corresponding to the read permissions, the 2 bit corresponds to the write bit, and the one bit corresponds to the execute permission. Default behavior is 755. Below are some examples of permissions and their associated values: read, write, and execute: 7 read and execute: 5 read and write: 6 read only: 4 */
  permissions?: string;
  /** Required. The absolute path on the instance to put the file. */
  destination?: string;
}

export const SoftwareRecipeStepCopyFile: Schema.Schema<SoftwareRecipeStepCopyFile> = Schema.suspend(() => Schema.Struct({
  overwrite: Schema.optional(Schema.Boolean),
  artifactId: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
})).annotate({ identifier: "SoftwareRecipeStepCopyFile" }) as any as Schema.Schema<SoftwareRecipeStepCopyFile>;

export interface GooRepository {
  /** Required. The name of the repository. */
  name?: string;
  /** Required. The url of the repository. */
  url?: string;
}

export const GooRepository: Schema.Schema<GooRepository> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "GooRepository" }) as any as Schema.Schema<GooRepository>;

export interface SoftwareRecipeStepRunScript {
  /** Required. The shell script to be executed. */
  script?: string;
  /** The script interpreter to use to run the script. If no interpreter is specified the script is executed directly, which likely only succeed for scripts with [shebang lines](https://en.wikipedia.org/wiki/Shebang_\(Unix\)). */
  interpreter?: "INTERPRETER_UNSPECIFIED" | "SHELL" | "POWERSHELL" | (string & {});
  /** Return codes that indicate that the software installed or updated successfully. Behaviour defaults to [0] */
  allowedExitCodes?: Array<number>;
}

export const SoftwareRecipeStepRunScript: Schema.Schema<SoftwareRecipeStepRunScript> = Schema.suspend(() => Schema.Struct({
  script: Schema.optional(Schema.String),
  interpreter: Schema.optional(Schema.String),
  allowedExitCodes: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "SoftwareRecipeStepRunScript" }) as any as Schema.Schema<SoftwareRecipeStepRunScript>;

export interface SoftwareRecipeStepExecFile {
  /** Defaults to [0]. A list of possible return values that the program can return to indicate a success. */
  allowedExitCodes?: Array<number>;
  /** The id of the relevant artifact in the recipe. */
  artifactId?: string;
  /** Arguments to be passed to the provided executable. */
  args?: Array<string>;
  /** The absolute path of the file on the local filesystem. */
  localPath?: string;
}

export const SoftwareRecipeStepExecFile: Schema.Schema<SoftwareRecipeStepExecFile> = Schema.suspend(() => Schema.Struct({
  allowedExitCodes: Schema.optional(Schema.Array(Schema.Number)),
  artifactId: Schema.optional(Schema.String),
  args: Schema.optional(Schema.Array(Schema.String)),
  localPath: Schema.optional(Schema.String),
})).annotate({ identifier: "SoftwareRecipeStepExecFile" }) as any as Schema.Schema<SoftwareRecipeStepExecFile>;

export interface OSPolicyAssignmentOperationMetadata {
  /** Rollout update time */
  rolloutUpdateTime?: string;
  /** State of the rollout */
  rolloutState?: "ROLLOUT_STATE_UNSPECIFIED" | "IN_PROGRESS" | "CANCELLING" | "CANCELLED" | "SUCCEEDED" | (string & {});
  /** Rollout start time */
  rolloutStartTime?: string;
  /** Reference to the `OSPolicyAssignment` API resource. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}` */
  osPolicyAssignment?: string;
  /** The OS policy assignment API method. */
  apiMethod?: "API_METHOD_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | (string & {});
}

export const OSPolicyAssignmentOperationMetadata: Schema.Schema<OSPolicyAssignmentOperationMetadata> = Schema.suspend(() => Schema.Struct({
  rolloutUpdateTime: Schema.optional(Schema.String),
  rolloutState: Schema.optional(Schema.String),
  rolloutStartTime: Schema.optional(Schema.String),
  osPolicyAssignment: Schema.optional(Schema.String),
  apiMethod: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyAssignmentOperationMetadata" }) as any as Schema.Schema<OSPolicyAssignmentOperationMetadata>;

export interface GoogleCloudOsconfigCommonV1alpha__OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
}

export const GoogleCloudOsconfigCommonV1alpha__OperationMetadata: Schema.Schema<GoogleCloudOsconfigCommonV1alpha__OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  endTime: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsconfigCommonV1alpha__OperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigCommonV1alpha__OperationMetadata>;

export interface GoogleCloudOsconfigCommonV1main__OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
}

export const GoogleCloudOsconfigCommonV1main__OperationMetadata: Schema.Schema<GoogleCloudOsconfigCommonV1main__OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  endTime: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsconfigCommonV1main__OperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigCommonV1main__OperationMetadata>;

export interface SoftwareRecipeStepInstallDpkg {
  /** Required. The id of the relevant artifact in the recipe. */
  artifactId?: string;
}

export const SoftwareRecipeStepInstallDpkg: Schema.Schema<SoftwareRecipeStepInstallDpkg> = Schema.suspend(() => Schema.Struct({
  artifactId: Schema.optional(Schema.String),
})).annotate({ identifier: "SoftwareRecipeStepInstallDpkg" }) as any as Schema.Schema<SoftwareRecipeStepInstallDpkg>;

export interface SoftwareRecipeStepExtractArchive {
  /** Required. The id of the relevant artifact in the recipe. */
  artifactId?: string;
  /** Required. The type of the archive to extract. */
  type?: "ARCHIVE_TYPE_UNSPECIFIED" | "TAR" | "TAR_GZIP" | "TAR_BZIP" | "TAR_LZMA" | "TAR_XZ" | "ZIP" | (string & {});
  /** Directory to extract archive to. Defaults to `/` on Linux or `C:\` on Windows. */
  destination?: string;
}

export const SoftwareRecipeStepExtractArchive: Schema.Schema<SoftwareRecipeStepExtractArchive> = Schema.suspend(() => Schema.Struct({
  artifactId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
})).annotate({ identifier: "SoftwareRecipeStepExtractArchive" }) as any as Schema.Schema<SoftwareRecipeStepExtractArchive>;

export interface SoftwareRecipeStepInstallRpm {
  /** Required. The id of the relevant artifact in the recipe. */
  artifactId?: string;
}

export const SoftwareRecipeStepInstallRpm: Schema.Schema<SoftwareRecipeStepInstallRpm> = Schema.suspend(() => Schema.Struct({
  artifactId: Schema.optional(Schema.String),
})).annotate({ identifier: "SoftwareRecipeStepInstallRpm" }) as any as Schema.Schema<SoftwareRecipeStepInstallRpm>;

export interface SoftwareRecipeStep {
  /** Installs a deb file via dpkg. */
  dpkgInstallation?: SoftwareRecipeStepInstallDpkg;
  /** Executes an artifact or local file. */
  fileExec?: SoftwareRecipeStepExecFile;
  /** Extracts an archive into the specified directory. */
  archiveExtraction?: SoftwareRecipeStepExtractArchive;
  /** Installs an MSI file. */
  msiInstallation?: SoftwareRecipeStepInstallMsi;
  /** Runs commands in a shell. */
  scriptRun?: SoftwareRecipeStepRunScript;
  /** Copies a file onto the instance. */
  fileCopy?: SoftwareRecipeStepCopyFile;
  /** Installs an rpm file via the rpm utility. */
  rpmInstallation?: SoftwareRecipeStepInstallRpm;
}

export const SoftwareRecipeStep: Schema.Schema<SoftwareRecipeStep> = Schema.suspend(() => Schema.Struct({
  dpkgInstallation: Schema.optional(SoftwareRecipeStepInstallDpkg),
  fileExec: Schema.optional(SoftwareRecipeStepExecFile),
  archiveExtraction: Schema.optional(SoftwareRecipeStepExtractArchive),
  msiInstallation: Schema.optional(SoftwareRecipeStepInstallMsi),
  scriptRun: Schema.optional(SoftwareRecipeStepRunScript),
  fileCopy: Schema.optional(SoftwareRecipeStepCopyFile),
  rpmInstallation: Schema.optional(SoftwareRecipeStepInstallRpm),
})).annotate({ identifier: "SoftwareRecipeStep" }) as any as Schema.Schema<SoftwareRecipeStep>;

export interface SoftwareRecipe {
  /** Actions to be taken for installing this recipe. On failure it stops executing steps and does not attempt another installation. Any steps taken (including partially completed steps) are not rolled back. */
  installSteps?: Array<SoftwareRecipeStep>;
  /** Actions to be taken for updating this recipe. On failure it stops executing steps and does not attempt another update for this recipe. Any steps taken (including partially completed steps) are not rolled back. */
  updateSteps?: Array<SoftwareRecipeStep>;
  /** Required. Unique identifier for the recipe. Only one recipe with a given name is installed on an instance. Names are also used to identify resources which helps to determine whether guest policies have conflicts. This means that requests to create multiple recipes with the same name and version are rejected since they could potentially have conflicting assignments. */
  name?: string;
  /** Resources available to be used in the steps in the recipe. */
  artifacts?: Array<SoftwareRecipeArtifact>;
  /** Default is INSTALLED. The desired state the agent should maintain for this recipe. INSTALLED: The software recipe is installed on the instance but won't be updated to new versions. UPDATED: The software recipe is installed on the instance. The recipe is updated to a higher version, if a higher version of the recipe is assigned to this instance. REMOVE: Remove is unsupported for software recipes and attempts to create or update a recipe to the REMOVE state is rejected. */
  desiredState?: "DESIRED_STATE_UNSPECIFIED" | "INSTALLED" | "UPDATED" | "REMOVED" | (string & {});
  /** The version of this software recipe. Version can be up to 4 period separated numbers (e.g. 12.34.56.78). */
  version?: string;
}

export const SoftwareRecipe: Schema.Schema<SoftwareRecipe> = Schema.suspend(() => Schema.Struct({
  installSteps: Schema.optional(Schema.Array(SoftwareRecipeStep)),
  updateSteps: Schema.optional(Schema.Array(SoftwareRecipeStep)),
  name: Schema.optional(Schema.String),
  artifacts: Schema.optional(Schema.Array(SoftwareRecipeArtifact)),
  desiredState: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "SoftwareRecipe" }) as any as Schema.Schema<SoftwareRecipe>;

export interface ZypperRepository {
  /** Required. A one word, unique name for this repository. This is the `repo id` in the zypper config file and also the `display_name` if `display_name` is omitted. This id is also used as the unique identifier when checking for guest policy conflicts. */
  id?: string;
  /** URIs of GPG keys. */
  gpgKeys?: Array<string>;
  /** The display name of the repository. */
  displayName?: string;
  /** Required. The location of the repository directory. */
  baseUrl?: string;
}

export const ZypperRepository: Schema.Schema<ZypperRepository> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  gpgKeys: Schema.optional(Schema.Array(Schema.String)),
  displayName: Schema.optional(Schema.String),
  baseUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "ZypperRepository" }) as any as Schema.Schema<ZypperRepository>;

export interface AptRepository {
  /** Required. URI for this repository. */
  uri?: string;
  /** Required. Distribution of this repository. */
  distribution?: string;
  /** URI of the key file for this repository. The agent maintains a keyring at `/etc/apt/trusted.gpg.d/osconfig_agent_managed.gpg` containing all the keys in any applied guest policy. */
  gpgKey?: string;
  /** Type of archive files in this repository. The default behavior is DEB. */
  archiveType?: "ARCHIVE_TYPE_UNSPECIFIED" | "DEB" | "DEB_SRC" | (string & {});
  /** Required. List of components for this repository. Must contain at least one item. */
  components?: Array<string>;
}

export const AptRepository: Schema.Schema<AptRepository> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  distribution: Schema.optional(Schema.String),
  gpgKey: Schema.optional(Schema.String),
  archiveType: Schema.optional(Schema.String),
  components: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AptRepository" }) as any as Schema.Schema<AptRepository>;

export interface PackageRepository {
  /** A Yum Repository. */
  yum?: YumRepository;
  /** A Zypper Repository. */
  zypper?: ZypperRepository;
  /** A Goo Repository. */
  goo?: GooRepository;
  /** An Apt Repository. */
  apt?: AptRepository;
}

export const PackageRepository: Schema.Schema<PackageRepository> = Schema.suspend(() => Schema.Struct({
  yum: Schema.optional(YumRepository),
  zypper: Schema.optional(ZypperRepository),
  goo: Schema.optional(GooRepository),
  apt: Schema.optional(AptRepository),
})).annotate({ identifier: "PackageRepository" }) as any as Schema.Schema<PackageRepository>;

export interface Package {
  /** The desired_state the agent should maintain for this package. The default is to ensure the package is installed. */
  desiredState?: "DESIRED_STATE_UNSPECIFIED" | "INSTALLED" | "UPDATED" | "REMOVED" | (string & {});
  /** Type of package manager that can be used to install this package. If a system does not have the package manager, the package is not installed or removed no error message is returned. By default, or if you specify `ANY`, the agent attempts to install and remove this package using the default package manager. This is useful when creating a policy that applies to different types of systems. The default behavior is ANY. */
  manager?: "MANAGER_UNSPECIFIED" | "ANY" | "APT" | "YUM" | "ZYPPER" | "GOO" | (string & {});
  /** Required. The name of the package. A package is uniquely identified for conflict validation by checking the package name and the manager(s) that the package targets. */
  name?: string;
}

export const Package: Schema.Schema<Package> = Schema.suspend(() => Schema.Struct({
  desiredState: Schema.optional(Schema.String),
  manager: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Package" }) as any as Schema.Schema<Package>;

export interface AssignmentOsType {
  /** Targets VM instances with OS Inventory enabled and having the following OS architecture. */
  osArchitecture?: string;
  /** Targets VM instances with OS Inventory enabled and having the following following OS version. */
  osVersion?: string;
  /** Targets VM instances with OS Inventory enabled and having the following OS short name, for example "debian" or "windows". */
  osShortName?: string;
}

export const AssignmentOsType: Schema.Schema<AssignmentOsType> = Schema.suspend(() => Schema.Struct({
  osArchitecture: Schema.optional(Schema.String),
  osVersion: Schema.optional(Schema.String),
  osShortName: Schema.optional(Schema.String),
})).annotate({ identifier: "AssignmentOsType" }) as any as Schema.Schema<AssignmentOsType>;

export interface Assignment {
  /** Targets instances matching at least one of these label sets. This allows an assignment to target disparate groups, for example "env=prod or env=staging". */
  groupLabels?: Array<AssignmentGroupLabel>;
  /** Targets instances in any of these zones. Leave empty to target instances in any zone. Zonal targeting is uncommon and is supported to facilitate the management of changes by zone. */
  zones?: Array<string>;
  /** Targets any of the instances specified. Instances are specified by their URI in the form `zones/[ZONE]/instances/[INSTANCE_NAME]`. Instance targeting is uncommon and is supported to facilitate the management of changes by the instance or to target specific VM instances for development and testing. Only supported for project-level policies and must reference instances within this project. */
  instances?: Array<string>;
  /** Targets VM instances matching at least one of the following OS types. VM instances must match all supplied criteria for a given OsType to be included. */
  osTypes?: Array<AssignmentOsType>;
  /** Targets VM instances whose name starts with one of these prefixes. Like labels, this is another way to group VM instances when targeting configs, for example prefix="prod-". Only supported for project-level policies. */
  instanceNamePrefixes?: Array<string>;
}

export const Assignment: Schema.Schema<Assignment> = Schema.suspend(() => Schema.Struct({
  groupLabels: Schema.optional(Schema.Array(AssignmentGroupLabel)),
  zones: Schema.optional(Schema.Array(Schema.String)),
  instances: Schema.optional(Schema.Array(Schema.String)),
  osTypes: Schema.optional(Schema.Array(AssignmentOsType)),
  instanceNamePrefixes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Assignment" }) as any as Schema.Schema<Assignment>;

export interface GuestPolicy {
  /** A list of Recipes to install on the VM instance. */
  recipes?: Array<SoftwareRecipe>;
  /** A list of package repositories to configure on the VM instance. This is done before any other configs are applied so they can use these repos. Package repositories are only configured if the corresponding package manager(s) are available. */
  packageRepositories?: Array<PackageRepository>;
  /** Description of the guest policy. Length of the description is limited to 1024 characters. */
  description?: string;
  /** The software packages to be managed by this policy. */
  packages?: Array<Package>;
  /** Output only. Last time this guest policy was updated. */
  updateTime?: string;
  /** Required. Specifies the VM instances that are assigned to this policy. This allows you to target sets or groups of VM instances by different parameters such as labels, names, OS, or zones. If left empty, all VM instances underneath this policy are targeted. At the same level in the resource hierarchy (that is within a project), the service prevents the creation of multiple policies that conflict with each other. For more information, see how the service [handles assignment conflicts](/compute/docs/os-config-management/create-guest-policy#handle-conflicts). */
  assignment?: Assignment;
  /** The etag for this guest policy. If this is provided on update, it must match the server's etag. */
  etag?: string;
  /** Required. Unique name of the resource in this project using one of the following forms: `projects/{project_number}/guestPolicies/{guest_policy_id}`. */
  name?: string;
  /** Output only. Time this guest policy was created. */
  createTime?: string;
}

export const GuestPolicy: Schema.Schema<GuestPolicy> = Schema.suspend(() => Schema.Struct({
  recipes: Schema.optional(Schema.Array(SoftwareRecipe)),
  packageRepositories: Schema.optional(Schema.Array(PackageRepository)),
  description: Schema.optional(Schema.String),
  packages: Schema.optional(Schema.Array(Package)),
  updateTime: Schema.optional(Schema.String),
  assignment: Schema.optional(Assignment),
  etag: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GuestPolicy" }) as any as Schema.Schema<GuestPolicy>;

export interface EffectiveGuestPolicySourcedSoftwareRecipe {
  /** A software recipe to configure on the VM instance. */
  softwareRecipe?: SoftwareRecipe;
  /** Name of the guest policy providing this config. */
  source?: string;
}

export const EffectiveGuestPolicySourcedSoftwareRecipe: Schema.Schema<EffectiveGuestPolicySourcedSoftwareRecipe> = Schema.suspend(() => Schema.Struct({
  softwareRecipe: Schema.optional(SoftwareRecipe),
  source: Schema.optional(Schema.String),
})).annotate({ identifier: "EffectiveGuestPolicySourcedSoftwareRecipe" }) as any as Schema.Schema<EffectiveGuestPolicySourcedSoftwareRecipe>;

export interface ListGuestPoliciesResponse {
  /** The list of GuestPolicies. */
  guestPolicies?: Array<GuestPolicy>;
  /** A pagination token that can be used to get the next page of guest policies. */
  nextPageToken?: string;
}

export const ListGuestPoliciesResponse: Schema.Schema<ListGuestPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  guestPolicies: Schema.optional(Schema.Array(GuestPolicy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListGuestPoliciesResponse" }) as any as Schema.Schema<ListGuestPoliciesResponse>;

export interface OneTimeSchedule {
  /** Required. The desired patch job execution time. */
  executeTime?: string;
}

export const OneTimeSchedule: Schema.Schema<OneTimeSchedule> = Schema.suspend(() => Schema.Struct({
  executeTime: Schema.optional(Schema.String),
})).annotate({ identifier: "OneTimeSchedule" }) as any as Schema.Schema<OneTimeSchedule>;

export interface PatchDeployment {
  /** Required. Schedule a one-time execution. */
  oneTimeSchedule?: OneTimeSchedule;
  /** Output only. Current state of the patch deployment. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "PAUSED" | (string & {});
  /** Optional. Rollout strategy of the patch job. */
  rollout?: PatchRollout;
  /** Optional. Description of the patch deployment. Length of the description is limited to 1024 characters. */
  description?: string;
  /** Required. VM instances to patch. */
  instanceFilter?: PatchInstanceFilter;
  /** Optional. Duration of the patch. After the duration ends, the patch times out. */
  duration?: string;
  /** Output only. Time the patch deployment was last updated. Timestamp is in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format. */
  updateTime?: string;
  /** Output only. The last time a patch job was started by this deployment. Timestamp is in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format. */
  lastExecuteTime?: string;
  /** Unique name for the patch deployment resource in a project. The patch deployment name is in the form: `projects/{project_id}/patchDeployments/{patch_deployment_id}`. This field is ignored when you create a new patch deployment. */
  name?: string;
  /** Required. Schedule recurring executions. */
  recurringSchedule?: RecurringSchedule;
  /** Optional. Patch configuration that is applied. */
  patchConfig?: PatchConfig;
  /** Output only. Time the patch deployment was created. Timestamp is in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format. */
  createTime?: string;
}

export const PatchDeployment: Schema.Schema<PatchDeployment> = Schema.suspend(() => Schema.Struct({
  oneTimeSchedule: Schema.optional(OneTimeSchedule),
  state: Schema.optional(Schema.String),
  rollout: Schema.optional(PatchRollout),
  description: Schema.optional(Schema.String),
  instanceFilter: Schema.optional(PatchInstanceFilter),
  duration: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  lastExecuteTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  recurringSchedule: Schema.optional(RecurringSchedule),
  patchConfig: Schema.optional(PatchConfig),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "PatchDeployment" }) as any as Schema.Schema<PatchDeployment>;

export interface GoogleCloudOsconfigV2__OperationMetadata {
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
}

export const GoogleCloudOsconfigV2__OperationMetadata: Schema.Schema<GoogleCloudOsconfigV2__OperationMetadata> = Schema.suspend(() => Schema.Struct({
  verb: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  endTime: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsconfigV2__OperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigV2__OperationMetadata>;

export interface EffectiveGuestPolicySourcedPackage {
  /** Name of the guest policy providing this config. */
  source?: string;
  /** A software package to configure on the VM instance. */
  package?: Package;
}

export const EffectiveGuestPolicySourcedPackage: Schema.Schema<EffectiveGuestPolicySourcedPackage> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Schema.String),
  package: Schema.optional(Package),
})).annotate({ identifier: "EffectiveGuestPolicySourcedPackage" }) as any as Schema.Schema<EffectiveGuestPolicySourcedPackage>;

export interface EffectiveGuestPolicySourcedPackageRepository {
  /** Name of the guest policy providing this config. */
  source?: string;
  /** A software package repository to configure on the VM instance. */
  packageRepository?: PackageRepository;
}

export const EffectiveGuestPolicySourcedPackageRepository: Schema.Schema<EffectiveGuestPolicySourcedPackageRepository> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Schema.String),
  packageRepository: Schema.optional(PackageRepository),
})).annotate({ identifier: "EffectiveGuestPolicySourcedPackageRepository" }) as any as Schema.Schema<EffectiveGuestPolicySourcedPackageRepository>;

export interface CancelPatchJobRequest {
}

export const CancelPatchJobRequest: Schema.Schema<CancelPatchJobRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelPatchJobRequest" }) as any as Schema.Schema<CancelPatchJobRequest>;

export interface MessageSet {
}

export const MessageSet: Schema.Schema<MessageSet> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MessageSet" }) as any as Schema.Schema<MessageSet>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ListPatchDeploymentsResponse {
  /** The list of patch deployments. */
  patchDeployments?: Array<PatchDeployment>;
  /** A pagination token that can be used to get the next page of patch deployments. */
  nextPageToken?: string;
}

export const ListPatchDeploymentsResponse: Schema.Schema<ListPatchDeploymentsResponse> = Schema.suspend(() => Schema.Struct({
  patchDeployments: Schema.optional(Schema.Array(PatchDeployment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPatchDeploymentsResponse" }) as any as Schema.Schema<ListPatchDeploymentsResponse>;

export interface PausePatchDeploymentRequest {
}

export const PausePatchDeploymentRequest: Schema.Schema<PausePatchDeploymentRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PausePatchDeploymentRequest" }) as any as Schema.Schema<PausePatchDeploymentRequest>;

export interface EffectiveGuestPolicy {
  /** List of package repository configurations assigned to the VM instance. */
  packageRepositories?: Array<EffectiveGuestPolicySourcedPackageRepository>;
  /** List of recipes assigned to the VM instance. */
  softwareRecipes?: Array<EffectiveGuestPolicySourcedSoftwareRecipe>;
  /** List of package configurations assigned to the VM instance. */
  packages?: Array<EffectiveGuestPolicySourcedPackage>;
}

export const EffectiveGuestPolicy: Schema.Schema<EffectiveGuestPolicy> = Schema.suspend(() => Schema.Struct({
  packageRepositories: Schema.optional(Schema.Array(EffectiveGuestPolicySourcedPackageRepository)),
  softwareRecipes: Schema.optional(Schema.Array(EffectiveGuestPolicySourcedSoftwareRecipe)),
  packages: Schema.optional(Schema.Array(EffectiveGuestPolicySourcedPackage)),
})).annotate({ identifier: "EffectiveGuestPolicy" }) as any as Schema.Schema<EffectiveGuestPolicy>;

export interface ResumePatchDeploymentRequest {
}

export const ResumePatchDeploymentRequest: Schema.Schema<ResumePatchDeploymentRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResumePatchDeploymentRequest" }) as any as Schema.Schema<ResumePatchDeploymentRequest>;

export interface StatusProto {
  /** copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional int32 canonical_code = 6; */
  canonicalCode?: number;
  /** copybara:strip_begin(b/383363683) Space to which this status belongs copybara:strip_end_and_replace optional string space = 2; // Space to which this status belongs */
  space?: string;
  /** Numeric code drawn from the space specified below. Often, this is the canonical error space, and code is drawn from google3/util/task/codes.proto copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional int32 code = 1; */
  code?: number;
  /** message_set associates an arbitrary proto message with the status. copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional proto2.bridge.MessageSet message_set = 5; */
  messageSet?: MessageSet;
  /** Detail message copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional string message = 3; */
  message?: string;
}

export const StatusProto: Schema.Schema<StatusProto> = Schema.suspend(() => Schema.Struct({
  canonicalCode: Schema.optional(Schema.Number),
  space: Schema.optional(Schema.String),
  code: Schema.optional(Schema.Number),
  messageSet: Schema.optional(MessageSet),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "StatusProto" }) as any as Schema.Schema<StatusProto>;

export interface ExecutePatchJobRequest {
  /** If this patch is a dry-run only, instances are contacted but will do nothing. */
  dryRun?: boolean;
  /** Required. Instances to patch, either explicitly or filtered by some criteria such as zone or labels. */
  instanceFilter?: PatchInstanceFilter;
  /** Duration of the patch job. After the duration ends, the patch job times out. */
  duration?: string;
  /** Description of the patch job. Length of the description is limited to 1024 characters. */
  description?: string;
  /** Display name for this patch job. This does not have to be unique. */
  displayName?: string;
  /** Patch configuration being applied. If omitted, instances are patched using the default configurations. */
  patchConfig?: PatchConfig;
  /** Rollout strategy of the patch job. */
  rollout?: PatchRollout;
}

export const ExecutePatchJobRequest: Schema.Schema<ExecutePatchJobRequest> = Schema.suspend(() => Schema.Struct({
  dryRun: Schema.optional(Schema.Boolean),
  instanceFilter: Schema.optional(PatchInstanceFilter),
  duration: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  patchConfig: Schema.optional(PatchConfig),
  rollout: Schema.optional(PatchRollout),
})).annotate({ identifier: "ExecutePatchJobRequest" }) as any as Schema.Schema<ExecutePatchJobRequest>;

export interface ListPatchJobsResponse {
  /** The list of patch jobs. */
  patchJobs?: Array<PatchJob>;
  /** A pagination token that can be used to get the next page of results. */
  nextPageToken?: string;
}

export const ListPatchJobsResponse: Schema.Schema<ListPatchJobsResponse> = Schema.suspend(() => Schema.Struct({
  patchJobs: Schema.optional(Schema.Array(PatchJob)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPatchJobsResponse" }) as any as Schema.Schema<ListPatchJobsResponse>;

export interface LookupEffectiveGuestPolicyRequest {
  /** Architecture of OS running on the instance. The OS Config agent only provides this field for targeting if OS Inventory is enabled for that instance. */
  osArchitecture?: string;
  /** Version of the OS running on the instance. The OS Config agent only provides this field for targeting if OS Inventory is enabled for that VM instance. */
  osVersion?: string;
  /** Short name of the OS running on the instance. The OS Config agent only provides this field for targeting if OS Inventory is enabled for that instance. */
  osShortName?: string;
}

export const LookupEffectiveGuestPolicyRequest: Schema.Schema<LookupEffectiveGuestPolicyRequest> = Schema.suspend(() => Schema.Struct({
  osArchitecture: Schema.optional(Schema.String),
  osVersion: Schema.optional(Schema.String),
  osShortName: Schema.optional(Schema.String),
})).annotate({ identifier: "LookupEffectiveGuestPolicyRequest" }) as any as Schema.Schema<LookupEffectiveGuestPolicyRequest>;

export interface GoogleCloudOsconfigCommonV1__OperationMetadata {
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
}

export const GoogleCloudOsconfigCommonV1__OperationMetadata: Schema.Schema<GoogleCloudOsconfigCommonV1__OperationMetadata> = Schema.suspend(() => Schema.Struct({
  verb: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  target: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsconfigCommonV1__OperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigCommonV1__OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetProjectsPatchDeploymentsRequest {
  /** Required. The resource name of the patch deployment in the form `projects/* /patchDeployments/*`. */
  name: string;
}

export const GetProjectsPatchDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/patchDeployments/{patchDeploymentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsPatchDeploymentsRequest>;

export type GetProjectsPatchDeploymentsResponse = PatchDeployment;
export const GetProjectsPatchDeploymentsResponse = PatchDeployment;

export type GetProjectsPatchDeploymentsError = CommonErrors;

/** Get an OS Config patch deployment. */
export const getProjectsPatchDeployments: API.OperationMethod<GetProjectsPatchDeploymentsRequest, GetProjectsPatchDeploymentsResponse, GetProjectsPatchDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsPatchDeploymentsRequest,
  output: GetProjectsPatchDeploymentsResponse,
  errors: [],
}));

export interface DeleteProjectsPatchDeploymentsRequest {
  /** Required. The resource name of the patch deployment in the form `projects/* /patchDeployments/*`. */
  name: string;
}

export const DeleteProjectsPatchDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta/projects/{projectsId}/patchDeployments/{patchDeploymentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsPatchDeploymentsRequest>;

export type DeleteProjectsPatchDeploymentsResponse = Empty;
export const DeleteProjectsPatchDeploymentsResponse = Empty;

export type DeleteProjectsPatchDeploymentsError = CommonErrors;

/** Delete an OS Config patch deployment. */
export const deleteProjectsPatchDeployments: API.OperationMethod<DeleteProjectsPatchDeploymentsRequest, DeleteProjectsPatchDeploymentsResponse, DeleteProjectsPatchDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsPatchDeploymentsRequest,
  output: DeleteProjectsPatchDeploymentsResponse,
  errors: [],
}));

export interface ListProjectsPatchDeploymentsRequest {
  /** Optional. The maximum number of patch deployments to return. Default is 100. */
  pageSize?: number;
  /** Optional. A pagination token returned from a previous call to ListPatchDeployments that indicates where this listing should continue from. */
  pageToken?: string;
  /** Required. The resource name of the parent in the form `projects/*`. */
  parent: string;
}

export const ListProjectsPatchDeploymentsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/patchDeployments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsPatchDeploymentsRequest>;

export type ListProjectsPatchDeploymentsResponse = ListPatchDeploymentsResponse;
export const ListProjectsPatchDeploymentsResponse = ListPatchDeploymentsResponse;

export type ListProjectsPatchDeploymentsError = CommonErrors;

/** Get a page of OS Config patch deployments. */
export const listProjectsPatchDeployments: API.PaginatedOperationMethod<ListProjectsPatchDeploymentsRequest, ListProjectsPatchDeploymentsResponse, ListProjectsPatchDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsPatchDeploymentsRequest,
  output: ListProjectsPatchDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ResumeProjectsPatchDeploymentsRequest {
  /** Required. The resource name of the patch deployment in the form `projects/* /patchDeployments/*`. */
  name: string;
  /** Request body */
  body?: ResumePatchDeploymentRequest;
}

export const ResumeProjectsPatchDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResumePatchDeploymentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/patchDeployments/{patchDeploymentsId}:resume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResumeProjectsPatchDeploymentsRequest>;

export type ResumeProjectsPatchDeploymentsResponse = PatchDeployment;
export const ResumeProjectsPatchDeploymentsResponse = PatchDeployment;

export type ResumeProjectsPatchDeploymentsError = CommonErrors;

/** Change state of patch deployment back to "ACTIVE". Patch deployment in active state continues to generate patch jobs. */
export const resumeProjectsPatchDeployments: API.OperationMethod<ResumeProjectsPatchDeploymentsRequest, ResumeProjectsPatchDeploymentsResponse, ResumeProjectsPatchDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResumeProjectsPatchDeploymentsRequest,
  output: ResumeProjectsPatchDeploymentsResponse,
  errors: [],
}));

export interface PauseProjectsPatchDeploymentsRequest {
  /** Required. The resource name of the patch deployment in the form `projects/* /patchDeployments/*`. */
  name: string;
  /** Request body */
  body?: PausePatchDeploymentRequest;
}

export const PauseProjectsPatchDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PausePatchDeploymentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/patchDeployments/{patchDeploymentsId}:pause", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PauseProjectsPatchDeploymentsRequest>;

export type PauseProjectsPatchDeploymentsResponse = PatchDeployment;
export const PauseProjectsPatchDeploymentsResponse = PatchDeployment;

export type PauseProjectsPatchDeploymentsError = CommonErrors;

/** Change state of patch deployment to "PAUSED". Patch deployment in paused state doesn't generate patch jobs. */
export const pauseProjectsPatchDeployments: API.OperationMethod<PauseProjectsPatchDeploymentsRequest, PauseProjectsPatchDeploymentsResponse, PauseProjectsPatchDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PauseProjectsPatchDeploymentsRequest,
  output: PauseProjectsPatchDeploymentsResponse,
  errors: [],
}));

export interface CreateProjectsPatchDeploymentsRequest {
  /** Required. A name for the patch deployment in the project. When creating a name the following rules apply: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the project. */
  patchDeploymentId?: string;
  /** Required. The project to apply this patch deployment to in the form `projects/*`. */
  parent: string;
  /** Request body */
  body?: PatchDeployment;
}

export const CreateProjectsPatchDeploymentsRequest = Schema.Struct({
  patchDeploymentId: Schema.optional(Schema.String).pipe(T.HttpQuery("patchDeploymentId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(PatchDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/patchDeployments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsPatchDeploymentsRequest>;

export type CreateProjectsPatchDeploymentsResponse = PatchDeployment;
export const CreateProjectsPatchDeploymentsResponse = PatchDeployment;

export type CreateProjectsPatchDeploymentsError = CommonErrors;

/** Create an OS Config patch deployment. */
export const createProjectsPatchDeployments: API.OperationMethod<CreateProjectsPatchDeploymentsRequest, CreateProjectsPatchDeploymentsResponse, CreateProjectsPatchDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsPatchDeploymentsRequest,
  output: CreateProjectsPatchDeploymentsResponse,
  errors: [],
}));

export interface PatchProjectsPatchDeploymentsRequest {
  /** Unique name for the patch deployment resource in a project. The patch deployment name is in the form: `projects/{project_id}/patchDeployments/{patch_deployment_id}`. This field is ignored when you create a new patch deployment. */
  name: string;
  /** Optional. Field mask that controls which fields of the patch deployment should be updated. */
  updateMask?: string;
  /** Request body */
  body?: PatchDeployment;
}

export const PatchProjectsPatchDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(PatchDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta/projects/{projectsId}/patchDeployments/{patchDeploymentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsPatchDeploymentsRequest>;

export type PatchProjectsPatchDeploymentsResponse = PatchDeployment;
export const PatchProjectsPatchDeploymentsResponse = PatchDeployment;

export type PatchProjectsPatchDeploymentsError = CommonErrors;

/** Update an OS Config patch deployment. */
export const patchProjectsPatchDeployments: API.OperationMethod<PatchProjectsPatchDeploymentsRequest, PatchProjectsPatchDeploymentsResponse, PatchProjectsPatchDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsPatchDeploymentsRequest,
  output: PatchProjectsPatchDeploymentsResponse,
  errors: [],
}));

export interface ListProjectsGuestPoliciesRequest {
  /** Required. The resource name of the parent using one of the following forms: `projects/{project_number}`. */
  parent: string;
  /** The maximum number of guest policies to return. */
  pageSize?: number;
  /** A pagination token returned from a previous call to `ListGuestPolicies` that indicates where this listing should continue from. */
  pageToken?: string;
}

export const ListProjectsGuestPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/guestPolicies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsGuestPoliciesRequest>;

export type ListProjectsGuestPoliciesResponse = ListGuestPoliciesResponse;
export const ListProjectsGuestPoliciesResponse = ListGuestPoliciesResponse;

export type ListProjectsGuestPoliciesError = CommonErrors;

/** Get a page of OS Config guest policies. */
export const listProjectsGuestPolicies: API.PaginatedOperationMethod<ListProjectsGuestPoliciesRequest, ListProjectsGuestPoliciesResponse, ListProjectsGuestPoliciesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsGuestPoliciesRequest,
  output: ListProjectsGuestPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsGuestPoliciesRequest {
  /** Required. The resource name of the guest policy using one of the following forms: `projects/{project_number}/guestPolicies/{guest_policy_id}`. */
  name: string;
}

export const GetProjectsGuestPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/guestPolicies/{guestPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsGuestPoliciesRequest>;

export type GetProjectsGuestPoliciesResponse = GuestPolicy;
export const GetProjectsGuestPoliciesResponse = GuestPolicy;

export type GetProjectsGuestPoliciesError = CommonErrors;

/** Get an OS Config guest policy. */
export const getProjectsGuestPolicies: API.OperationMethod<GetProjectsGuestPoliciesRequest, GetProjectsGuestPoliciesResponse, GetProjectsGuestPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsGuestPoliciesRequest,
  output: GetProjectsGuestPoliciesResponse,
  errors: [],
}));

export interface DeleteProjectsGuestPoliciesRequest {
  /** Required. The resource name of the guest policy using one of the following forms: `projects/{project_number}/guestPolicies/{guest_policy_id}`. */
  name: string;
}

export const DeleteProjectsGuestPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta/projects/{projectsId}/guestPolicies/{guestPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsGuestPoliciesRequest>;

export type DeleteProjectsGuestPoliciesResponse = Empty;
export const DeleteProjectsGuestPoliciesResponse = Empty;

export type DeleteProjectsGuestPoliciesError = CommonErrors;

/** Delete an OS Config guest policy. */
export const deleteProjectsGuestPolicies: API.OperationMethod<DeleteProjectsGuestPoliciesRequest, DeleteProjectsGuestPoliciesResponse, DeleteProjectsGuestPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsGuestPoliciesRequest,
  output: DeleteProjectsGuestPoliciesResponse,
  errors: [],
}));

export interface PatchProjectsGuestPoliciesRequest {
  /** Required. Unique name of the resource in this project using one of the following forms: `projects/{project_number}/guestPolicies/{guest_policy_id}`. */
  name: string;
  /** Field mask that controls which fields of the guest policy should be updated. */
  updateMask?: string;
  /** Request body */
  body?: GuestPolicy;
}

export const PatchProjectsGuestPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GuestPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta/projects/{projectsId}/guestPolicies/{guestPoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsGuestPoliciesRequest>;

export type PatchProjectsGuestPoliciesResponse = GuestPolicy;
export const PatchProjectsGuestPoliciesResponse = GuestPolicy;

export type PatchProjectsGuestPoliciesError = CommonErrors;

/** Update an OS Config guest policy. */
export const patchProjectsGuestPolicies: API.OperationMethod<PatchProjectsGuestPoliciesRequest, PatchProjectsGuestPoliciesResponse, PatchProjectsGuestPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsGuestPoliciesRequest,
  output: PatchProjectsGuestPoliciesResponse,
  errors: [],
}));

export interface CreateProjectsGuestPoliciesRequest {
  /** Required. The resource name of the parent using one of the following forms: `projects/{project_number}`. */
  parent: string;
  /** Required. The logical name of the guest policy in the project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the project. */
  guestPolicyId?: string;
  /** Request body */
  body?: GuestPolicy;
}

export const CreateProjectsGuestPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  guestPolicyId: Schema.optional(Schema.String).pipe(T.HttpQuery("guestPolicyId")),
  body: Schema.optional(GuestPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/guestPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsGuestPoliciesRequest>;

export type CreateProjectsGuestPoliciesResponse = GuestPolicy;
export const CreateProjectsGuestPoliciesResponse = GuestPolicy;

export type CreateProjectsGuestPoliciesError = CommonErrors;

/** Create an OS Config guest policy. */
export const createProjectsGuestPolicies: API.OperationMethod<CreateProjectsGuestPoliciesRequest, CreateProjectsGuestPoliciesResponse, CreateProjectsGuestPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsGuestPoliciesRequest,
  output: CreateProjectsGuestPoliciesResponse,
  errors: [],
}));

export interface LookupEffectiveGuestPolicyProjectsZonesInstancesRequest {
  /** Required. The VM instance whose policies are being looked up. */
  instance: string;
  /** Request body */
  body?: LookupEffectiveGuestPolicyRequest;
}

export const LookupEffectiveGuestPolicyProjectsZonesInstancesRequest = Schema.Struct({
  instance: Schema.String.pipe(T.HttpPath("instance")),
  body: Schema.optional(LookupEffectiveGuestPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/zones/{zonesId}/instances/{instancesId}:lookupEffectiveGuestPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LookupEffectiveGuestPolicyProjectsZonesInstancesRequest>;

export type LookupEffectiveGuestPolicyProjectsZonesInstancesResponse = EffectiveGuestPolicy;
export const LookupEffectiveGuestPolicyProjectsZonesInstancesResponse = EffectiveGuestPolicy;

export type LookupEffectiveGuestPolicyProjectsZonesInstancesError = CommonErrors;

/** Lookup the effective guest policy that applies to a VM instance. This lookup merges all policies that are assigned to the instance ancestry. */
export const lookupEffectiveGuestPolicyProjectsZonesInstances: API.OperationMethod<LookupEffectiveGuestPolicyProjectsZonesInstancesRequest, LookupEffectiveGuestPolicyProjectsZonesInstancesResponse, LookupEffectiveGuestPolicyProjectsZonesInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupEffectiveGuestPolicyProjectsZonesInstancesRequest,
  output: LookupEffectiveGuestPolicyProjectsZonesInstancesResponse,
  errors: [],
}));

export interface ExecuteProjectsPatchJobsRequest {
  /** Required. The project in which to run this patch in the form `projects/*` */
  parent: string;
  /** Request body */
  body?: ExecutePatchJobRequest;
}

export const ExecuteProjectsPatchJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ExecutePatchJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/patchJobs:execute", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteProjectsPatchJobsRequest>;

export type ExecuteProjectsPatchJobsResponse = PatchJob;
export const ExecuteProjectsPatchJobsResponse = PatchJob;

export type ExecuteProjectsPatchJobsError = CommonErrors;

/** Patch VM instances by creating and running a patch job. */
export const executeProjectsPatchJobs: API.OperationMethod<ExecuteProjectsPatchJobsRequest, ExecuteProjectsPatchJobsResponse, ExecuteProjectsPatchJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteProjectsPatchJobsRequest,
  output: ExecuteProjectsPatchJobsResponse,
  errors: [],
}));

export interface GetProjectsPatchJobsRequest {
  /** Required. Name of the patch in the form `projects/* /patchJobs/*` */
  name: string;
}

export const GetProjectsPatchJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/patchJobs/{patchJobsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsPatchJobsRequest>;

export type GetProjectsPatchJobsResponse = PatchJob;
export const GetProjectsPatchJobsResponse = PatchJob;

export type GetProjectsPatchJobsError = CommonErrors;

/** Get the patch job. This can be used to track the progress of an ongoing patch job or review the details of completed jobs. */
export const getProjectsPatchJobs: API.OperationMethod<GetProjectsPatchJobsRequest, GetProjectsPatchJobsResponse, GetProjectsPatchJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsPatchJobsRequest,
  output: GetProjectsPatchJobsResponse,
  errors: [],
}));

export interface CancelProjectsPatchJobsRequest {
  /** Required. Name of the patch in the form `projects/* /patchJobs/*` */
  name: string;
  /** Request body */
  body?: CancelPatchJobRequest;
}

export const CancelProjectsPatchJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelPatchJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/patchJobs/{patchJobsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsPatchJobsRequest>;

export type CancelProjectsPatchJobsResponse = PatchJob;
export const CancelProjectsPatchJobsResponse = PatchJob;

export type CancelProjectsPatchJobsError = CommonErrors;

/** Cancel a patch job. The patch job must be active. Canceled patch jobs cannot be restarted. */
export const cancelProjectsPatchJobs: API.OperationMethod<CancelProjectsPatchJobsRequest, CancelProjectsPatchJobsResponse, CancelProjectsPatchJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsPatchJobsRequest,
  output: CancelProjectsPatchJobsResponse,
  errors: [],
}));

export interface ListProjectsPatchJobsRequest {
  /** A pagination token returned from a previous call that indicates where this listing should continue from. */
  pageToken?: string;
  /** If provided, this field specifies the criteria that must be met by patch jobs to be included in the response. Currently, filtering is only available on the patch_deployment field. */
  filter?: string;
  /** The maximum number of instance status to return. */
  pageSize?: number;
  /** Required. In the form of `projects/*` */
  parent: string;
}

export const ListProjectsPatchJobsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/patchJobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsPatchJobsRequest>;

export type ListProjectsPatchJobsResponse = ListPatchJobsResponse;
export const ListProjectsPatchJobsResponse = ListPatchJobsResponse;

export type ListProjectsPatchJobsError = CommonErrors;

/** Get a list of patch jobs. */
export const listProjectsPatchJobs: API.PaginatedOperationMethod<ListProjectsPatchJobsRequest, ListProjectsPatchJobsResponse, ListProjectsPatchJobsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsPatchJobsRequest,
  output: ListProjectsPatchJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsPatchJobsInstanceDetailsRequest {
  /** Required. The parent for the instances are in the form of `projects/* /patchJobs/*`. */
  parent: string;
  /** A pagination token returned from a previous call that indicates where this listing should continue from. */
  pageToken?: string;
  /** A filter expression that filters results listed in the response. This field supports filtering results by instance zone, name, state, or `failure_reason`. */
  filter?: string;
  /** The maximum number of instance details records to return. Default is 100. */
  pageSize?: number;
}

export const ListProjectsPatchJobsInstanceDetailsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/patchJobs/{patchJobsId}/instanceDetails" }),
  svc,
) as unknown as Schema.Schema<ListProjectsPatchJobsInstanceDetailsRequest>;

export type ListProjectsPatchJobsInstanceDetailsResponse = ListPatchJobInstanceDetailsResponse;
export const ListProjectsPatchJobsInstanceDetailsResponse = ListPatchJobInstanceDetailsResponse;

export type ListProjectsPatchJobsInstanceDetailsError = CommonErrors;

/** Get a list of instance details for a given patch job. */
export const listProjectsPatchJobsInstanceDetails: API.PaginatedOperationMethod<ListProjectsPatchJobsInstanceDetailsRequest, ListProjectsPatchJobsInstanceDetailsResponse, ListProjectsPatchJobsInstanceDetailsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsPatchJobsInstanceDetailsRequest,
  output: ListProjectsPatchJobsInstanceDetailsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

