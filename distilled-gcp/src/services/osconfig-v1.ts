// ==========================================================================
// OS Config API (osconfig v1)
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
  version: "v1",
  rootUrl: "https://osconfig.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GcsObject {
  /** Required. Bucket of the Cloud Storage object. */
  bucket?: string;
  /** Required. Name of the Cloud Storage object. */
  object?: string;
  /** Required. Generation number of the Cloud Storage object. This is used to ensure that the ExecStep specified by this PatchJob does not change. */
  generationNumber?: string;
}

export const GcsObject: Schema.Schema<GcsObject> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
  object: Schema.optional(Schema.String),
  generationNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GcsObject" }) as any as Schema.Schema<GcsObject>;

export interface ExecStepConfig {
  /** A Cloud Storage object containing the executable. */
  gcsObject?: GcsObject;
  /** An absolute path to the executable on the VM. */
  localPath?: string;
  /** Defaults to [0]. A list of possible return values that the execution can return to indicate a success. */
  allowedSuccessCodes?: Array<number>;
  /** The script interpreter to use to run the script. If no interpreter is specified the script will be executed directly, which will likely only succeed for scripts with [shebang lines] (https://en.wikipedia.org/wiki/Shebang_\(Unix\)). */
  interpreter?: "INTERPRETER_UNSPECIFIED" | "NONE" | "SHELL" | "POWERSHELL" | (string & {});
}

export const ExecStepConfig: Schema.Schema<ExecStepConfig> = Schema.suspend(() => Schema.Struct({
  gcsObject: Schema.optional(GcsObject),
  localPath: Schema.optional(Schema.String),
  allowedSuccessCodes: Schema.optional(Schema.Array(Schema.Number)),
  interpreter: Schema.optional(Schema.String),
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

export interface AptSettings {
  /** List of packages to exclude from update. These packages will be excluded */
  excludes?: Array<string>;
  /** An exclusive list of packages to be updated. These are the only packages that will be updated. If these packages are not installed, they will be ignored. This field cannot be specified with any other patch configuration fields. */
  exclusivePackages?: Array<string>;
  /** By changing the type to DIST, the patching is performed using `apt-get dist-upgrade` instead. */
  type?: "TYPE_UNSPECIFIED" | "DIST" | "UPGRADE" | (string & {});
}

export const AptSettings: Schema.Schema<AptSettings> = Schema.suspend(() => Schema.Struct({
  excludes: Schema.optional(Schema.Array(Schema.String)),
  exclusivePackages: Schema.optional(Schema.Array(Schema.String)),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "AptSettings" }) as any as Schema.Schema<AptSettings>;

export interface WindowsUpdateSettings {
  /** List of KBs to exclude from update. */
  excludes?: Array<string>;
  /** Only apply updates of these windows update classifications. If empty, all updates are applied. */
  classifications?: Array<"CLASSIFICATION_UNSPECIFIED" | "CRITICAL" | "SECURITY" | "DEFINITION" | "DRIVER" | "FEATURE_PACK" | "SERVICE_PACK" | "TOOL" | "UPDATE_ROLLUP" | "UPDATE" | (string & {})>;
  /** An exclusive list of kbs to be updated. These are the only patches that will be updated. This field must not be used with other patch configurations. */
  exclusivePatches?: Array<string>;
}

export const WindowsUpdateSettings: Schema.Schema<WindowsUpdateSettings> = Schema.suspend(() => Schema.Struct({
  excludes: Schema.optional(Schema.Array(Schema.String)),
  classifications: Schema.optional(Schema.Array(Schema.String)),
  exclusivePatches: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "WindowsUpdateSettings" }) as any as Schema.Schema<WindowsUpdateSettings>;

export interface ZypperSettings {
  /** Adds the `--with-update` flag, to `zypper patch`. */
  withUpdate?: boolean;
  /** List of patches to exclude from update. */
  excludes?: Array<string>;
  /** Install only patches with these categories. Common categories include security, recommended, and feature. */
  categories?: Array<string>;
  /** Adds the `--with-optional` flag to `zypper patch`. */
  withOptional?: boolean;
  /** Install only patches with these severities. Common severities include critical, important, moderate, and low. */
  severities?: Array<string>;
  /** An exclusive list of patches to be updated. These are the only patches that will be installed using 'zypper patch patch:' command. This field must not be used with any other patch configuration fields. */
  exclusivePatches?: Array<string>;
}

export const ZypperSettings: Schema.Schema<ZypperSettings> = Schema.suspend(() => Schema.Struct({
  withUpdate: Schema.optional(Schema.Boolean),
  excludes: Schema.optional(Schema.Array(Schema.String)),
  categories: Schema.optional(Schema.Array(Schema.String)),
  withOptional: Schema.optional(Schema.Boolean),
  severities: Schema.optional(Schema.Array(Schema.String)),
  exclusivePatches: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ZypperSettings" }) as any as Schema.Schema<ZypperSettings>;

export interface YumSettings {
  /** Adds the `--security` flag to `yum update`. Not supported on all platforms. */
  security?: boolean;
  /** Will cause patch to run `yum update-minimal` instead. */
  minimal?: boolean;
  /** List of packages to exclude from update. These packages are excluded by using the yum `--exclude` flag. */
  excludes?: Array<string>;
  /** An exclusive list of packages to be updated. These are the only packages that will be updated. If these packages are not installed, they will be ignored. This field must not be specified with any other patch configuration fields. */
  exclusivePackages?: Array<string>;
}

export const YumSettings: Schema.Schema<YumSettings> = Schema.suspend(() => Schema.Struct({
  security: Schema.optional(Schema.Boolean),
  minimal: Schema.optional(Schema.Boolean),
  excludes: Schema.optional(Schema.Array(Schema.String)),
  exclusivePackages: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "YumSettings" }) as any as Schema.Schema<YumSettings>;

export interface GooSettings {
}

export const GooSettings: Schema.Schema<GooSettings> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooSettings" }) as any as Schema.Schema<GooSettings>;

export interface PatchConfig {
  /** Post-patch reboot settings. */
  rebootConfig?: "REBOOT_CONFIG_UNSPECIFIED" | "DEFAULT" | "ALWAYS" | "NEVER" | (string & {});
  /** The `ExecStep` to run before the patch update. */
  preStep?: ExecStep;
  /** Optional. Enables enhanced reporting for the patch job: 1. The patch job skips instances that cannot be patched and reports them as `SKIPPED`. An instance cannot be patched for two reasons: 1. The instance runs Container-Optimized OS (COS), which cannot be patched. 2. The instance is part of a managed instance group (MIG), and patching MIG instances is disabled in the patch job's configuration (PatchConfig.migInstancesAllowed is `false`). 2. The patch job is reported as `SUCCEEDED` if it completes without errors, even if some instances are `SKIPPED`. 3. The patch job is reported as `COMPLETED_WITH_INACTIVE_VMS` if it completes without errors, but does not patch instances that are `INACTIVE`. */
  skipUnpatchableVms?: boolean;
  /** Allows the patch job to run on Managed instance groups (MIGs). */
  migInstancesAllowed?: boolean;
  /** The `ExecStep` to run after the patch update. */
  postStep?: ExecStep;
  /** Apt update settings. Use this setting to override the default `apt` patch rules. */
  apt?: AptSettings;
  /** Windows update settings. Use this override the default windows patch rules. */
  windowsUpdate?: WindowsUpdateSettings;
  /** Zypper update settings. Use this setting to override the default `zypper` patch rules. */
  zypper?: ZypperSettings;
  /** Yum update settings. Use this setting to override the default `yum` patch rules. */
  yum?: YumSettings;
  /** Goo update settings. Use this setting to override the default `goo` patch rules. */
  goo?: GooSettings;
}

export const PatchConfig: Schema.Schema<PatchConfig> = Schema.suspend(() => Schema.Struct({
  rebootConfig: Schema.optional(Schema.String),
  preStep: Schema.optional(ExecStep),
  skipUnpatchableVms: Schema.optional(Schema.Boolean),
  migInstancesAllowed: Schema.optional(Schema.Boolean),
  postStep: Schema.optional(ExecStep),
  apt: Schema.optional(AptSettings),
  windowsUpdate: Schema.optional(WindowsUpdateSettings),
  zypper: Schema.optional(ZypperSettings),
  yum: Schema.optional(YumSettings),
  goo: Schema.optional(GooSettings),
})).annotate({ identifier: "PatchConfig" }) as any as Schema.Schema<PatchConfig>;

export interface WeeklySchedule {
  /** Required. Day of the week. */
  dayOfWeek?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
}

export const WeeklySchedule: Schema.Schema<WeeklySchedule> = Schema.suspend(() => Schema.Struct({
  dayOfWeek: Schema.optional(Schema.String),
})).annotate({ identifier: "WeeklySchedule" }) as any as Schema.Schema<WeeklySchedule>;

export interface WeekDayOfMonth {
  /** Required. A day of the week. */
  dayOfWeek?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
  /** Optional. Represents the number of days before or after the given week day of month that the patch deployment is scheduled for. For example if `week_ordinal` and `day_of_week` values point to the second Tuesday of the month and the `day_offset` value is set to `3`, patch deployment takes place three days after the second Tuesday of the month. If this value is negative, for example -5, patches are deployed five days before the second Tuesday of the month. Allowed values are in range [-30, 30]. */
  dayOffset?: number;
  /** Required. Week number in a month. 1-4 indicates the 1st to 4th week of the month. -1 indicates the last week of the month. */
  weekOrdinal?: number;
}

export const WeekDayOfMonth: Schema.Schema<WeekDayOfMonth> = Schema.suspend(() => Schema.Struct({
  dayOfWeek: Schema.optional(Schema.String),
  dayOffset: Schema.optional(Schema.Number),
  weekOrdinal: Schema.optional(Schema.Number),
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
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  id?: string;
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  version?: string;
}

export const TimeZone: Schema.Schema<TimeZone> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeZone" }) as any as Schema.Schema<TimeZone>;

export interface TimeOfDay {
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() => Schema.Struct({
  seconds: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  hours: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface RecurringSchedule {
  /** Optional. The time that the recurring schedule becomes effective. Defaults to `create_time` of the patch deployment. */
  startTime?: string;
  /** Required. The frequency unit of this recurring schedule. */
  frequency?: "FREQUENCY_UNSPECIFIED" | "WEEKLY" | "MONTHLY" | "DAILY" | (string & {});
  /** Output only. The time the next patch job is scheduled to run. */
  nextExecuteTime?: string;
  /** Optional. The end time at which a recurring patch deployment schedule is no longer active. */
  endTime?: string;
  /** Output only. The time the last patch job ran successfully. */
  lastExecuteTime?: string;
  /** Required. Schedule with weekly executions. */
  weekly?: WeeklySchedule;
  /** Required. Schedule with monthly executions. */
  monthly?: MonthlySchedule;
  /** Required. Defines the time zone that `time_of_day` is relative to. The rules for daylight saving time are determined by the chosen time zone. */
  timeZone?: TimeZone;
  /** Required. Time of the day to run a recurring deployment. */
  timeOfDay?: TimeOfDay;
}

export const RecurringSchedule: Schema.Schema<RecurringSchedule> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  frequency: Schema.optional(Schema.String),
  nextExecuteTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  lastExecuteTime: Schema.optional(Schema.String),
  weekly: Schema.optional(WeeklySchedule),
  monthly: Schema.optional(MonthlySchedule),
  timeZone: Schema.optional(TimeZone),
  timeOfDay: Schema.optional(TimeOfDay),
})).annotate({ identifier: "RecurringSchedule" }) as any as Schema.Schema<RecurringSchedule>;

export interface OneTimeSchedule {
  /** Required. The desired patch job execution time. */
  executeTime?: string;
}

export const OneTimeSchedule: Schema.Schema<OneTimeSchedule> = Schema.suspend(() => Schema.Struct({
  executeTime: Schema.optional(Schema.String),
})).annotate({ identifier: "OneTimeSchedule" }) as any as Schema.Schema<OneTimeSchedule>;

export interface FixedOrPercent {
  /** Specifies the relative value defined as a percentage, which will be multiplied by a reference value. */
  percent?: number;
  /** Specifies a fixed value. */
  fixed?: number;
}

export const FixedOrPercent: Schema.Schema<FixedOrPercent> = Schema.suspend(() => Schema.Struct({
  percent: Schema.optional(Schema.Number),
  fixed: Schema.optional(Schema.Number),
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

export interface PatchInstanceFilterGroupLabel {
  /** Compute Engine instance labels that must be present for a VM instance to be targeted by this filter. */
  labels?: Record<string, string>;
}

export const PatchInstanceFilterGroupLabel: Schema.Schema<PatchInstanceFilterGroupLabel> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "PatchInstanceFilterGroupLabel" }) as any as Schema.Schema<PatchInstanceFilterGroupLabel>;

export interface PatchInstanceFilter {
  /** Targets any of the VM instances specified. Instances are specified by their URI in the form `zones/[ZONE]/instances/[INSTANCE_NAME]`, `projects/[PROJECT_ID]/zones/[ZONE]/instances/[INSTANCE_NAME]`, or `https://www.googleapis.com/compute/v1/projects/[PROJECT_ID]/zones/[ZONE]/instances/[INSTANCE_NAME]` */
  instances?: Array<string>;
  /** Targets VM instances in ANY of these zones. Leave empty to target VM instances in any zone. */
  zones?: Array<string>;
  /** Targets VM instances matching ANY of these GroupLabels. This allows targeting of disparate groups of VM instances. */
  groupLabels?: Array<PatchInstanceFilterGroupLabel>;
  /** Target all VM instances in the project. If true, no other criteria is permitted. */
  all?: boolean;
  /** Targets VMs whose name starts with one of these prefixes. Similar to labels, this is another way to group VMs when targeting configs, for example prefix="prod-". */
  instanceNamePrefixes?: Array<string>;
}

export const PatchInstanceFilter: Schema.Schema<PatchInstanceFilter> = Schema.suspend(() => Schema.Struct({
  instances: Schema.optional(Schema.Array(Schema.String)),
  zones: Schema.optional(Schema.Array(Schema.String)),
  groupLabels: Schema.optional(Schema.Array(PatchInstanceFilterGroupLabel)),
  all: Schema.optional(Schema.Boolean),
  instanceNamePrefixes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PatchInstanceFilter" }) as any as Schema.Schema<PatchInstanceFilter>;

export interface PatchDeployment {
  /** Optional. Patch configuration that is applied. */
  patchConfig?: PatchConfig;
  /** Optional. Duration of the patch. After the duration ends, the patch times out. */
  duration?: string;
  /** Required. Schedule recurring executions. */
  recurringSchedule?: RecurringSchedule;
  /** Output only. The last time a patch job was started by this deployment. Timestamp is in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format. */
  lastExecuteTime?: string;
  /** Output only. Current state of the patch deployment. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "PAUSED" | (string & {});
  /** Required. Schedule a one-time execution. */
  oneTimeSchedule?: OneTimeSchedule;
  /** Optional. Rollout strategy of the patch job. */
  rollout?: PatchRollout;
  /** Required. VM instances to patch. */
  instanceFilter?: PatchInstanceFilter;
  /** Output only. Time the patch deployment was created. Timestamp is in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format. */
  createTime?: string;
  /** Output only. Time the patch deployment was last updated. Timestamp is in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format. */
  updateTime?: string;
  /** Unique name for the patch deployment resource in a project. The patch deployment name is in the form: `projects/{project_id}/patchDeployments/{patch_deployment_id}`. This field is ignored when you create a new patch deployment. */
  name?: string;
  /** Optional. Description of the patch deployment. Length of the description is limited to 1024 characters. */
  description?: string;
}

export const PatchDeployment: Schema.Schema<PatchDeployment> = Schema.suspend(() => Schema.Struct({
  patchConfig: Schema.optional(PatchConfig),
  duration: Schema.optional(Schema.String),
  recurringSchedule: Schema.optional(RecurringSchedule),
  lastExecuteTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  oneTimeSchedule: Schema.optional(OneTimeSchedule),
  rollout: Schema.optional(PatchRollout),
  instanceFilter: Schema.optional(PatchInstanceFilter),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "PatchDeployment" }) as any as Schema.Schema<PatchDeployment>;

export interface OSPolicyAssignmentRollout {
  /** Required. The maximum number (or percentage) of VMs per zone to disrupt at any given moment. */
  disruptionBudget?: FixedOrPercent;
  /** Required. This determines the minimum duration of time to wait after the configuration changes are applied through the current rollout. A VM continues to count towards the `disruption_budget` at least until this duration of time has passed after configuration changes are applied. */
  minWaitDuration?: string;
}

export const OSPolicyAssignmentRollout: Schema.Schema<OSPolicyAssignmentRollout> = Schema.suspend(() => Schema.Struct({
  disruptionBudget: Schema.optional(FixedOrPercent),
  minWaitDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyAssignmentRollout" }) as any as Schema.Schema<OSPolicyAssignmentRollout>;

export interface OSPolicyResourcePackageResourceZypper {
  /** Required. Package name. */
  name?: string;
}

export const OSPolicyResourcePackageResourceZypper: Schema.Schema<OSPolicyResourcePackageResourceZypper> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourcePackageResourceZypper" }) as any as Schema.Schema<OSPolicyResourcePackageResourceZypper>;

export interface OSPolicyResourceRepositoryResourceZypperRepository {
  /** Required. The location of the repository directory. */
  baseUrl?: string;
  /** Required. A one word, unique name for this repository. This is the `repo id` in the zypper config file and also the `display_name` if `display_name` is omitted. This id is also used as the unique identifier when checking for GuestPolicy conflicts. */
  id?: string;
  /** The display name of the repository. */
  displayName?: string;
  /** URIs of GPG keys. */
  gpgKeys?: Array<string>;
}

export const OSPolicyResourceRepositoryResourceZypperRepository: Schema.Schema<OSPolicyResourceRepositoryResourceZypperRepository> = Schema.suspend(() => Schema.Struct({
  baseUrl: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  gpgKeys: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "OSPolicyResourceRepositoryResourceZypperRepository" }) as any as Schema.Schema<OSPolicyResourceRepositoryResourceZypperRepository>;

export interface OSPolicyResourceRepositoryResourceAptRepository {
  /** Required. Distribution of this repository. */
  distribution?: string;
  /** Required. List of components for this repository. Must contain at least one item. */
  components?: Array<string>;
  /** URI of the key file for this repository. The agent maintains a keyring at `/etc/apt/trusted.gpg.d/osconfig_agent_managed.gpg`. */
  gpgKey?: string;
  /** Required. Type of archive files in this repository. */
  archiveType?: "ARCHIVE_TYPE_UNSPECIFIED" | "DEB" | "DEB_SRC" | (string & {});
  /** Required. URI for this repository. */
  uri?: string;
}

export const OSPolicyResourceRepositoryResourceAptRepository: Schema.Schema<OSPolicyResourceRepositoryResourceAptRepository> = Schema.suspend(() => Schema.Struct({
  distribution: Schema.optional(Schema.String),
  components: Schema.optional(Schema.Array(Schema.String)),
  gpgKey: Schema.optional(Schema.String),
  archiveType: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourceRepositoryResourceAptRepository" }) as any as Schema.Schema<OSPolicyResourceRepositoryResourceAptRepository>;

export interface OSPolicyResourceRepositoryResourceYumRepository {
  /** Required. The location of the repository directory. */
  baseUrl?: string;
  /** Required. A one word, unique name for this repository. This is the `repo id` in the yum config file and also the `display_name` if `display_name` is omitted. This id is also used as the unique identifier when checking for resource conflicts. */
  id?: string;
  /** The display name of the repository. */
  displayName?: string;
  /** URIs of GPG keys. */
  gpgKeys?: Array<string>;
}

export const OSPolicyResourceRepositoryResourceYumRepository: Schema.Schema<OSPolicyResourceRepositoryResourceYumRepository> = Schema.suspend(() => Schema.Struct({
  baseUrl: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  gpgKeys: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "OSPolicyResourceRepositoryResourceYumRepository" }) as any as Schema.Schema<OSPolicyResourceRepositoryResourceYumRepository>;

export interface OSPolicyResourceRepositoryResourceGooRepository {
  /** Required. The url of the repository. */
  url?: string;
  /** Required. The name of the repository. */
  name?: string;
}

export const OSPolicyResourceRepositoryResourceGooRepository: Schema.Schema<OSPolicyResourceRepositoryResourceGooRepository> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourceRepositoryResourceGooRepository" }) as any as Schema.Schema<OSPolicyResourceRepositoryResourceGooRepository>;

export interface OSPolicyResourceRepositoryResource {
  /** A Zypper Repository. */
  zypper?: OSPolicyResourceRepositoryResourceZypperRepository;
  /** An Apt Repository. */
  apt?: OSPolicyResourceRepositoryResourceAptRepository;
  /** A Yum Repository. */
  yum?: OSPolicyResourceRepositoryResourceYumRepository;
  /** A Goo Repository. */
  goo?: OSPolicyResourceRepositoryResourceGooRepository;
}

export const OSPolicyResourceRepositoryResource: Schema.Schema<OSPolicyResourceRepositoryResource> = Schema.suspend(() => Schema.Struct({
  zypper: Schema.optional(OSPolicyResourceRepositoryResourceZypperRepository),
  apt: Schema.optional(OSPolicyResourceRepositoryResourceAptRepository),
  yum: Schema.optional(OSPolicyResourceRepositoryResourceYumRepository),
  goo: Schema.optional(OSPolicyResourceRepositoryResourceGooRepository),
})).annotate({ identifier: "OSPolicyResourceRepositoryResource" }) as any as Schema.Schema<OSPolicyResourceRepositoryResource>;

export interface OSPolicyAssignmentInstanceFilterInventory {
  /** Required. The OS short name */
  osShortName?: string;
  /** The OS version Prefix matches are supported if asterisk(*) is provided as the last character. For example, to match all versions with a major version of `7`, specify the following value for this field `7.*` An empty string matches all OS versions. */
  osVersion?: string;
}

export const OSPolicyAssignmentInstanceFilterInventory: Schema.Schema<OSPolicyAssignmentInstanceFilterInventory> = Schema.suspend(() => Schema.Struct({
  osShortName: Schema.optional(Schema.String),
  osVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyAssignmentInstanceFilterInventory" }) as any as Schema.Schema<OSPolicyAssignmentInstanceFilterInventory>;

export interface OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep {
  /** Configuration step type. */
  type?: "TYPE_UNSPECIFIED" | "VALIDATION" | "DESIRED_STATE_CHECK" | "DESIRED_STATE_ENFORCEMENT" | "DESIRED_STATE_CHECK_POST_ENFORCEMENT" | (string & {});
  /** An error message recorded during the execution of this step. Only populated if errors were encountered during this step execution. */
  errorMessage?: string;
}

export const OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep: Schema.Schema<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep" }) as any as Schema.Schema<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep>;

export interface OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput {
  /** Output from enforcement phase output file (if run). Output size is limited to 100K bytes. */
  enforcementOutput?: string;
}

export const OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput: Schema.Schema<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput> = Schema.suspend(() => Schema.Struct({
  enforcementOutput: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput" }) as any as Schema.Schema<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput>;

export interface OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance {
  /** Ordered list of configuration completed by the agent for the OS policy resource. */
  configSteps?: Array<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep>;
  /** The compliance state of the resource. */
  complianceState?: "UNKNOWN" | "COMPLIANT" | "NON_COMPLIANT" | (string & {});
  /** A reason for the resource to be in the given compliance state. This field is always populated when `compliance_state` is `UNKNOWN`. The following values are supported when `compliance_state == UNKNOWN` * `execution-errors`: Errors were encountered by the agent while executing the resource and the compliance state couldn't be determined. * `execution-skipped-by-agent`: Resource execution was skipped by the agent because errors were encountered while executing prior resources in the OS policy. * `os-policy-execution-attempt-failed`: The execution of the OS policy containing this resource failed and the compliance state couldn't be determined. * `os-policy-execution-pending`: OS policy that owns this resource was assigned to the given VM, but was not executed yet. */
  complianceStateReason?: string;
  /** The ID of the OS policy resource. */
  osPolicyResourceId?: string;
  /** ExecResource specific output. */
  execResourceOutput?: OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput;
}

export const OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance: Schema.Schema<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance> = Schema.suspend(() => Schema.Struct({
  configSteps: Schema.optional(Schema.Array(OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep)),
  complianceState: Schema.optional(Schema.String),
  complianceStateReason: Schema.optional(Schema.String),
  osPolicyResourceId: Schema.optional(Schema.String),
  execResourceOutput: Schema.optional(OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput),
})).annotate({ identifier: "OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance" }) as any as Schema.Schema<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance>;

export interface OSPolicyAssignmentReportOSPolicyCompliance {
  /** The reason for the OS policy to be in an unknown compliance state. This field is always populated when `compliance_state` is `UNKNOWN`. If populated, the field can contain one of the following values: * `vm-not-running`: The VM was not running. * `os-policies-not-supported-by-agent`: The version of the OS Config agent running on the VM does not support running OS policies. * `no-agent-detected`: The OS Config agent is not detected for the VM. * `resource-execution-errors`: The OS Config agent encountered errors while executing one or more resources in the policy. See `os_policy_resource_compliances` for details. * `task-timeout`: The task sent to the agent to apply the policy timed out. * `unexpected-agent-state`: The OS Config agent did not report the final status of the task that attempted to apply the policy. Instead, the agent unexpectedly started working on a different task. This mostly happens when the agent or VM unexpectedly restarts while applying OS policies. * `internal-service-errors`: Internal service errors were encountered while attempting to apply the policy. * `os-policy-execution-pending`: OS policy was assigned to the given VM, but was not executed yet. Typically this is a transient condition that will go away after the next policy execution cycle. */
  complianceStateReason?: string;
  /** Compliance data for each resource within the policy that is applied to the VM. */
  osPolicyResourceCompliances?: Array<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance>;
  /** The compliance state of the OS policy. */
  complianceState?: "UNKNOWN" | "COMPLIANT" | "NON_COMPLIANT" | (string & {});
  /** The OS policy id */
  osPolicyId?: string;
}

export const OSPolicyAssignmentReportOSPolicyCompliance: Schema.Schema<OSPolicyAssignmentReportOSPolicyCompliance> = Schema.suspend(() => Schema.Struct({
  complianceStateReason: Schema.optional(Schema.String),
  osPolicyResourceCompliances: Schema.optional(Schema.Array(OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance)),
  complianceState: Schema.optional(Schema.String),
  osPolicyId: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyAssignmentReportOSPolicyCompliance" }) as any as Schema.Schema<OSPolicyAssignmentReportOSPolicyCompliance>;

export interface OSPolicyAssignmentReport {
  /** Reference to the `OSPolicyAssignment` API resource that the `OSPolicy` belongs to. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}` */
  osPolicyAssignment?: string;
  /** The Compute Engine VM instance name. */
  instance?: string;
  /** Unique identifier of the last attempted run to apply the OS policies associated with this assignment on the VM. This ID is logged by the OS Config agent while applying the OS policies associated with this assignment on the VM. NOTE: If the service is unable to successfully connect to the agent for this run, then this id will not be available in the agent logs. */
  lastRunId?: string;
  /** Timestamp for when the report was last generated. */
  updateTime?: string;
  /** The `OSPolicyAssignmentReport` API resource name. Format: `projects/{project_number}/locations/{location}/instances/{instance_id}/osPolicyAssignments/{os_policy_assignment_id}/report` */
  name?: string;
  /** Compliance data for each `OSPolicy` that is applied to the VM. */
  osPolicyCompliances?: Array<OSPolicyAssignmentReportOSPolicyCompliance>;
}

export const OSPolicyAssignmentReport: Schema.Schema<OSPolicyAssignmentReport> = Schema.suspend(() => Schema.Struct({
  osPolicyAssignment: Schema.optional(Schema.String),
  instance: Schema.optional(Schema.String),
  lastRunId: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  osPolicyCompliances: Schema.optional(Schema.Array(OSPolicyAssignmentReportOSPolicyCompliance)),
})).annotate({ identifier: "OSPolicyAssignmentReport" }) as any as Schema.Schema<OSPolicyAssignmentReport>;

export interface ListOSPolicyAssignmentReportsResponse {
  /** List of OS policy assignment reports. */
  osPolicyAssignmentReports?: Array<OSPolicyAssignmentReport>;
  /** The pagination token to retrieve the next page of OS policy assignment report objects. */
  nextPageToken?: string;
}

export const ListOSPolicyAssignmentReportsResponse: Schema.Schema<ListOSPolicyAssignmentReportsResponse> = Schema.suspend(() => Schema.Struct({
  osPolicyAssignmentReports: Schema.optional(Schema.Array(OSPolicyAssignmentReport)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOSPolicyAssignmentReportsResponse" }) as any as Schema.Schema<ListOSPolicyAssignmentReportsResponse>;

export interface GoogleCloudOsconfigCommonV1main__OperationMetadata {
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudOsconfigCommonV1main__OperationMetadata: Schema.Schema<GoogleCloudOsconfigCommonV1main__OperationMetadata> = Schema.suspend(() => Schema.Struct({
  verb: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  statusMessage: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsconfigCommonV1main__OperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigCommonV1main__OperationMetadata>;

export interface OSPolicyResourceFileRemote {
  /** SHA256 checksum of the remote file. */
  sha256Checksum?: string;
  /** Required. URI from which to fetch the object. It should contain both the protocol and path following the format `{protocol}://{location}`. */
  uri?: string;
}

export const OSPolicyResourceFileRemote: Schema.Schema<OSPolicyResourceFileRemote> = Schema.suspend(() => Schema.Struct({
  sha256Checksum: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourceFileRemote" }) as any as Schema.Schema<OSPolicyResourceFileRemote>;

export interface OSPolicyInventoryFilter {
  /** Required. The OS short name */
  osShortName?: string;
  /** The OS version Prefix matches are supported if asterisk(*) is provided as the last character. For example, to match all versions with a major version of `7`, specify the following value for this field `7.*` An empty string matches all OS versions. */
  osVersion?: string;
}

export const OSPolicyInventoryFilter: Schema.Schema<OSPolicyInventoryFilter> = Schema.suspend(() => Schema.Struct({
  osShortName: Schema.optional(Schema.String),
  osVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyInventoryFilter" }) as any as Schema.Schema<OSPolicyInventoryFilter>;

export interface OSPolicyResourceFileGcs {
  /** Required. Bucket of the Cloud Storage object. */
  bucket?: string;
  /** Required. Name of the Cloud Storage object. */
  object?: string;
  /** Generation number of the Cloud Storage object. */
  generation?: string;
}

export const OSPolicyResourceFileGcs: Schema.Schema<OSPolicyResourceFileGcs> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
  object: Schema.optional(Schema.String),
  generation: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourceFileGcs" }) as any as Schema.Schema<OSPolicyResourceFileGcs>;

export interface OSPolicyResourceFile {
  /** A Cloud Storage object. */
  gcs?: OSPolicyResourceFileGcs;
  /** A local path within the VM to use. */
  localPath?: string;
  /** Defaults to false. When false, files are subject to validations based on the file type: Remote: A checksum must be specified. Cloud Storage: An object generation number must be specified. */
  allowInsecure?: boolean;
  /** A generic remote file. */
  remote?: OSPolicyResourceFileRemote;
}

export const OSPolicyResourceFile: Schema.Schema<OSPolicyResourceFile> = Schema.suspend(() => Schema.Struct({
  gcs: Schema.optional(OSPolicyResourceFileGcs),
  localPath: Schema.optional(Schema.String),
  allowInsecure: Schema.optional(Schema.Boolean),
  remote: Schema.optional(OSPolicyResourceFileRemote),
})).annotate({ identifier: "OSPolicyResourceFile" }) as any as Schema.Schema<OSPolicyResourceFile>;

export interface OSPolicyResourceExecResourceExec {
  /** A remote or local file. */
  file?: OSPolicyResourceFile;
  /** Only recorded for enforce Exec. Path to an output file (that is created by this Exec) whose content will be recorded in OSPolicyResourceCompliance after a successful run. Absence or failure to read this file will result in this ExecResource being non-compliant. Output file size is limited to 500K bytes. */
  outputFilePath?: string;
  /** An inline script. The size of the script is limited to 32KiB. */
  script?: string;
  /** Optional arguments to pass to the source during execution. */
  args?: Array<string>;
  /** Required. The script interpreter to use. */
  interpreter?: "INTERPRETER_UNSPECIFIED" | "NONE" | "SHELL" | "POWERSHELL" | (string & {});
}

export const OSPolicyResourceExecResourceExec: Schema.Schema<OSPolicyResourceExecResourceExec> = Schema.suspend(() => Schema.Struct({
  file: Schema.optional(OSPolicyResourceFile),
  outputFilePath: Schema.optional(Schema.String),
  script: Schema.optional(Schema.String),
  args: Schema.optional(Schema.Array(Schema.String)),
  interpreter: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourceExecResourceExec" }) as any as Schema.Schema<OSPolicyResourceExecResourceExec>;

export interface OSPolicyResourceExecResource {
  /** Required. What to run to validate this resource is in the desired state. An exit code of 100 indicates "in desired state", and exit code of 101 indicates "not in desired state". Any other exit code indicates a failure running validate. */
  validate?: OSPolicyResourceExecResourceExec;
  /** What to run to bring this resource into the desired state. An exit code of 100 indicates "success", any other exit code indicates a failure running enforce. */
  enforce?: OSPolicyResourceExecResourceExec;
}

export const OSPolicyResourceExecResource: Schema.Schema<OSPolicyResourceExecResource> = Schema.suspend(() => Schema.Struct({
  validate: Schema.optional(OSPolicyResourceExecResourceExec),
  enforce: Schema.optional(OSPolicyResourceExecResourceExec),
})).annotate({ identifier: "OSPolicyResourceExecResource" }) as any as Schema.Schema<OSPolicyResourceExecResource>;

export interface OSPolicyResourceFileResource {
  /** A remote or local source. */
  file?: OSPolicyResourceFile;
  /** Required. The absolute path of the file within the VM. */
  path?: string;
  /** A a file with this content. The size of the content is limited to 32KiB. */
  content?: string;
  /** Required. Desired state of the file. */
  state?: "DESIRED_STATE_UNSPECIFIED" | "PRESENT" | "ABSENT" | "CONTENTS_MATCH" | (string & {});
  /** Consists of three octal digits which represent, in order, the permissions of the owner, group, and other users for the file (similarly to the numeric mode used in the linux chmod utility). Each digit represents a three bit number with the 4 bit corresponding to the read permissions, the 2 bit corresponds to the write bit, and the one bit corresponds to the execute permission. Default behavior is 755. Below are some examples of permissions and their associated values: read, write, and execute: 7 read and execute: 5 read and write: 6 read only: 4 */
  permissions?: string;
}

export const OSPolicyResourceFileResource: Schema.Schema<OSPolicyResourceFileResource> = Schema.suspend(() => Schema.Struct({
  file: Schema.optional(OSPolicyResourceFile),
  path: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourceFileResource" }) as any as Schema.Schema<OSPolicyResourceFileResource>;

export interface OSPolicyResourcePackageResourceAPT {
  /** Required. Package name. */
  name?: string;
}

export const OSPolicyResourcePackageResourceAPT: Schema.Schema<OSPolicyResourcePackageResourceAPT> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourcePackageResourceAPT" }) as any as Schema.Schema<OSPolicyResourcePackageResourceAPT>;

export interface OSPolicyResourcePackageResourceDeb {
  /** Required. A deb package. */
  source?: OSPolicyResourceFile;
  /** Whether dependencies should also be installed. - install when false: `dpkg -i package` - install when true: `apt-get update && apt-get -y install package.deb` */
  pullDeps?: boolean;
}

export const OSPolicyResourcePackageResourceDeb: Schema.Schema<OSPolicyResourcePackageResourceDeb> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(OSPolicyResourceFile),
  pullDeps: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "OSPolicyResourcePackageResourceDeb" }) as any as Schema.Schema<OSPolicyResourcePackageResourceDeb>;

export interface OSPolicyResourcePackageResourceGooGet {
  /** Required. Package name. */
  name?: string;
}

export const OSPolicyResourcePackageResourceGooGet: Schema.Schema<OSPolicyResourcePackageResourceGooGet> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourcePackageResourceGooGet" }) as any as Schema.Schema<OSPolicyResourcePackageResourceGooGet>;

export interface OSPolicyResourcePackageResourceRPM {
  /** Required. An rpm package. */
  source?: OSPolicyResourceFile;
  /** Whether dependencies should also be installed. - install when false: `rpm --upgrade --replacepkgs package.rpm` - install when true: `yum -y install package.rpm` or `zypper -y install package.rpm` */
  pullDeps?: boolean;
}

export const OSPolicyResourcePackageResourceRPM: Schema.Schema<OSPolicyResourcePackageResourceRPM> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(OSPolicyResourceFile),
  pullDeps: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "OSPolicyResourcePackageResourceRPM" }) as any as Schema.Schema<OSPolicyResourcePackageResourceRPM>;

export interface OSPolicyResourcePackageResourceMSI {
  /** Required. The MSI package. */
  source?: OSPolicyResourceFile;
  /** Additional properties to use during installation. This should be in the format of Property=Setting. Appended to the defaults of `ACTION=INSTALL REBOOT=ReallySuppress`. */
  properties?: Array<string>;
}

export const OSPolicyResourcePackageResourceMSI: Schema.Schema<OSPolicyResourcePackageResourceMSI> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(OSPolicyResourceFile),
  properties: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "OSPolicyResourcePackageResourceMSI" }) as any as Schema.Schema<OSPolicyResourcePackageResourceMSI>;

export interface OSPolicyResourcePackageResourceYUM {
  /** Required. Package name. */
  name?: string;
}

export const OSPolicyResourcePackageResourceYUM: Schema.Schema<OSPolicyResourcePackageResourceYUM> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourcePackageResourceYUM" }) as any as Schema.Schema<OSPolicyResourcePackageResourceYUM>;

export interface OSPolicyResourcePackageResource {
  /** A package managed by Apt. */
  apt?: OSPolicyResourcePackageResourceAPT;
  /** A deb package file. */
  deb?: OSPolicyResourcePackageResourceDeb;
  /** A package managed by GooGet. */
  googet?: OSPolicyResourcePackageResourceGooGet;
  /** An rpm package file. */
  rpm?: OSPolicyResourcePackageResourceRPM;
  /** An MSI package. */
  msi?: OSPolicyResourcePackageResourceMSI;
  /** A package managed by YUM. */
  yum?: OSPolicyResourcePackageResourceYUM;
  /** Required. The desired state the agent should maintain for this package. */
  desiredState?: "DESIRED_STATE_UNSPECIFIED" | "INSTALLED" | "REMOVED" | (string & {});
  /** A package managed by Zypper. */
  zypper?: OSPolicyResourcePackageResourceZypper;
}

export const OSPolicyResourcePackageResource: Schema.Schema<OSPolicyResourcePackageResource> = Schema.suspend(() => Schema.Struct({
  apt: Schema.optional(OSPolicyResourcePackageResourceAPT),
  deb: Schema.optional(OSPolicyResourcePackageResourceDeb),
  googet: Schema.optional(OSPolicyResourcePackageResourceGooGet),
  rpm: Schema.optional(OSPolicyResourcePackageResourceRPM),
  msi: Schema.optional(OSPolicyResourcePackageResourceMSI),
  yum: Schema.optional(OSPolicyResourcePackageResourceYUM),
  desiredState: Schema.optional(Schema.String),
  zypper: Schema.optional(OSPolicyResourcePackageResourceZypper),
})).annotate({ identifier: "OSPolicyResourcePackageResource" }) as any as Schema.Schema<OSPolicyResourcePackageResource>;

export interface OSPolicyResource {
  /** Required. The id of the resource with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the OS policy. */
  id?: string;
  /** Package repository resource */
  repository?: OSPolicyResourceRepositoryResource;
  /** Exec resource */
  exec?: OSPolicyResourceExecResource;
  /** File resource */
  file?: OSPolicyResourceFileResource;
  /** Package resource */
  pkg?: OSPolicyResourcePackageResource;
}

export const OSPolicyResource: Schema.Schema<OSPolicyResource> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  repository: Schema.optional(OSPolicyResourceRepositoryResource),
  exec: Schema.optional(OSPolicyResourceExecResource),
  file: Schema.optional(OSPolicyResourceFileResource),
  pkg: Schema.optional(OSPolicyResourcePackageResource),
})).annotate({ identifier: "OSPolicyResource" }) as any as Schema.Schema<OSPolicyResource>;

export interface OSPolicyResourceGroup {
  /** List of inventory filters for the resource group. The resources in this resource group are applied to the target VM if it satisfies at least one of the following inventory filters. For example, to apply this resource group to VMs running either `RHEL` or `CentOS` operating systems, specify 2 items for the list with following values: inventory_filters[0].os_short_name='rhel' and inventory_filters[1].os_short_name='centos' If the list is empty, this resource group will be applied to the target VM unconditionally. */
  inventoryFilters?: Array<OSPolicyInventoryFilter>;
  /** Required. List of resources configured for this resource group. The resources are executed in the exact order specified here. */
  resources?: Array<OSPolicyResource>;
}

export const OSPolicyResourceGroup: Schema.Schema<OSPolicyResourceGroup> = Schema.suspend(() => Schema.Struct({
  inventoryFilters: Schema.optional(Schema.Array(OSPolicyInventoryFilter)),
  resources: Schema.optional(Schema.Array(OSPolicyResource)),
})).annotate({ identifier: "OSPolicyResourceGroup" }) as any as Schema.Schema<OSPolicyResourceGroup>;

export interface OSPolicy {
  /** Policy description. Length of the description is limited to 1024 characters. */
  description?: string;
  /** Required. List of resource groups for the policy. For a particular VM, resource groups are evaluated in the order specified and the first resource group that is applicable is selected and the rest are ignored. If none of the resource groups are applicable for a VM, the VM is considered to be non-compliant w.r.t this policy. This behavior can be toggled by the flag `allow_no_resource_group_match` */
  resourceGroups?: Array<OSPolicyResourceGroup>;
  /** This flag determines the OS policy compliance status when none of the resource groups within the policy are applicable for a VM. Set this value to `true` if the policy needs to be reported as compliant even if the policy has nothing to validate or enforce. */
  allowNoResourceGroupMatch?: boolean;
  /** Required. Policy mode */
  mode?: "MODE_UNSPECIFIED" | "VALIDATION" | "ENFORCEMENT" | (string & {});
  /** Required. The id of the OS policy with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the assignment. */
  id?: string;
}

export const OSPolicy: Schema.Schema<OSPolicy> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  resourceGroups: Schema.optional(Schema.Array(OSPolicyResourceGroup)),
  allowNoResourceGroupMatch: Schema.optional(Schema.Boolean),
  mode: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicy" }) as any as Schema.Schema<OSPolicy>;

export interface OSPolicyAssignmentLabelSet {
  /** Labels are identified by key/value pairs in this map. A VM should contain all the key/value pairs specified in this map to be selected. */
  labels?: Record<string, string>;
}

export const OSPolicyAssignmentLabelSet: Schema.Schema<OSPolicyAssignmentLabelSet> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "OSPolicyAssignmentLabelSet" }) as any as Schema.Schema<OSPolicyAssignmentLabelSet>;

export interface OSPolicyAssignmentInstanceFilter {
  /** List of label sets used for VM exclusion. If the list has more than one label set, the VM is excluded if any of the label sets are applicable for the VM. */
  exclusionLabels?: Array<OSPolicyAssignmentLabelSet>;
  /** List of inventories to select VMs. A VM is selected if its inventory data matches at least one of the following inventories. */
  inventories?: Array<OSPolicyAssignmentInstanceFilterInventory>;
  /** Target all VMs in the project. If true, no other criteria is permitted. */
  all?: boolean;
  /** List of label sets used for VM inclusion. If the list has more than one `LabelSet`, the VM is included if any of the label sets are applicable for the VM. */
  inclusionLabels?: Array<OSPolicyAssignmentLabelSet>;
}

export const OSPolicyAssignmentInstanceFilter: Schema.Schema<OSPolicyAssignmentInstanceFilter> = Schema.suspend(() => Schema.Struct({
  exclusionLabels: Schema.optional(Schema.Array(OSPolicyAssignmentLabelSet)),
  inventories: Schema.optional(Schema.Array(OSPolicyAssignmentInstanceFilterInventory)),
  all: Schema.optional(Schema.Boolean),
  inclusionLabels: Schema.optional(Schema.Array(OSPolicyAssignmentLabelSet)),
})).annotate({ identifier: "OSPolicyAssignmentInstanceFilter" }) as any as Schema.Schema<OSPolicyAssignmentInstanceFilter>;

export interface OSPolicyAssignment {
  /** Resource name. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id}` This field is ignored when you create an OS policy assignment. */
  name?: string;
  /** OS policy assignment description. Length of the description is limited to 1024 characters. */
  description?: string;
  /** Required. List of OS policies to be applied to the VMs. */
  osPolicies?: Array<OSPolicy>;
  /** The etag for this OS policy assignment. If this is provided on update, it must match the server's etag. */
  etag?: string;
  /** Output only. The assignment revision ID A new revision is committed whenever a rollout is triggered for a OS policy assignment */
  revisionId?: string;
  /** Output only. The timestamp that the revision was created. */
  revisionCreateTime?: string;
  /** Output only. Indicates that reconciliation is in progress for the revision. This value is `true` when the `rollout_state` is one of: * IN_PROGRESS * CANCELLING */
  reconciling?: boolean;
  /** Output only. OS policy assignment rollout state */
  rolloutState?: "ROLLOUT_STATE_UNSPECIFIED" | "IN_PROGRESS" | "CANCELLING" | "CANCELLED" | "SUCCEEDED" | (string & {});
  /** Output only. Indicates that this revision deletes the OS policy assignment. */
  deleted?: boolean;
  /** Output only. Server generated unique id for the OS policy assignment resource. */
  uid?: string;
  /** Required. Filter to select VMs. */
  instanceFilter?: OSPolicyAssignmentInstanceFilter;
  /** Required. Rollout to deploy the OS policy assignment. A rollout is triggered in the following situations: 1) OSPolicyAssignment is created. 2) OSPolicyAssignment is updated and the update contains changes to one of the following fields: - instance_filter - os_policies 3) OSPolicyAssignment is deleted. */
  rollout?: OSPolicyAssignmentRollout;
  /** Output only. Indicates that this revision has been successfully rolled out in this zone and new VMs will be assigned OS policies from this revision. For a given OS policy assignment, there is only one revision with a value of `true` for this field. */
  baseline?: boolean;
}

export const OSPolicyAssignment: Schema.Schema<OSPolicyAssignment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  osPolicies: Schema.optional(Schema.Array(OSPolicy)),
  etag: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  revisionCreateTime: Schema.optional(Schema.String),
  reconciling: Schema.optional(Schema.Boolean),
  rolloutState: Schema.optional(Schema.String),
  deleted: Schema.optional(Schema.Boolean),
  uid: Schema.optional(Schema.String),
  instanceFilter: Schema.optional(OSPolicyAssignmentInstanceFilter),
  rollout: Schema.optional(OSPolicyAssignmentRollout),
  baseline: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "OSPolicyAssignment" }) as any as Schema.Schema<OSPolicyAssignment>;

export interface ListOSPolicyAssignmentRevisionsResponse {
  /** The pagination token to retrieve the next page of OS policy assignment revisions. */
  nextPageToken?: string;
  /** The OS policy assignment revisions */
  osPolicyAssignments?: Array<OSPolicyAssignment>;
}

export const ListOSPolicyAssignmentRevisionsResponse: Schema.Schema<ListOSPolicyAssignmentRevisionsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  osPolicyAssignments: Schema.optional(Schema.Array(OSPolicyAssignment)),
})).annotate({ identifier: "ListOSPolicyAssignmentRevisionsResponse" }) as any as Schema.Schema<ListOSPolicyAssignmentRevisionsResponse>;

export interface CVSSv3 {
  /** This metric reflects the context by which vulnerability exploitation is possible. */
  attackVector?: "ATTACK_VECTOR_UNSPECIFIED" | "ATTACK_VECTOR_NETWORK" | "ATTACK_VECTOR_ADJACENT" | "ATTACK_VECTOR_LOCAL" | "ATTACK_VECTOR_PHYSICAL" | (string & {});
  /** This metric measures the impact to integrity of a successfully exploited vulnerability. */
  integrityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | (string & {});
  /** This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited vulnerability. */
  confidentialityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | (string & {});
  /** The Impact sub-score equation is derived from the Base Impact metrics. */
  impactScore?: number;
  /** This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability. */
  availabilityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | (string & {});
  /** The Scope metric captures whether a vulnerability in one vulnerable component impacts resources in components beyond its security scope. */
  scope?: "SCOPE_UNSPECIFIED" | "SCOPE_UNCHANGED" | "SCOPE_CHANGED" | (string & {});
  /** The Exploitability sub-score equation is derived from the Base Exploitability metrics. https://www.first.org/cvss/specification-document#2-1-Exploitability-Metrics */
  exploitabilityScore?: number;
  /** The base score is a function of the base metric scores. https://www.first.org/cvss/specification-document#Base-Metrics */
  baseScore?: number;
  /** This metric describes the conditions beyond the attacker's control that must exist in order to exploit the vulnerability. */
  attackComplexity?: "ATTACK_COMPLEXITY_UNSPECIFIED" | "ATTACK_COMPLEXITY_LOW" | "ATTACK_COMPLEXITY_HIGH" | (string & {});
  /** This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability. */
  privilegesRequired?: "PRIVILEGES_REQUIRED_UNSPECIFIED" | "PRIVILEGES_REQUIRED_NONE" | "PRIVILEGES_REQUIRED_LOW" | "PRIVILEGES_REQUIRED_HIGH" | (string & {});
  /** This metric captures the requirement for a human user, other than the attacker, to participate in the successful compromise of the vulnerable component. */
  userInteraction?: "USER_INTERACTION_UNSPECIFIED" | "USER_INTERACTION_NONE" | "USER_INTERACTION_REQUIRED" | (string & {});
}

export const CVSSv3: Schema.Schema<CVSSv3> = Schema.suspend(() => Schema.Struct({
  attackVector: Schema.optional(Schema.String),
  integrityImpact: Schema.optional(Schema.String),
  confidentialityImpact: Schema.optional(Schema.String),
  impactScore: Schema.optional(Schema.Number),
  availabilityImpact: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  exploitabilityScore: Schema.optional(Schema.Number),
  baseScore: Schema.optional(Schema.Number),
  attackComplexity: Schema.optional(Schema.String),
  privilegesRequired: Schema.optional(Schema.String),
  userInteraction: Schema.optional(Schema.String),
})).annotate({ identifier: "CVSSv3" }) as any as Schema.Schema<CVSSv3>;

export interface VulnerabilityReportVulnerabilityDetailsReference {
  /** The url of the reference. */
  url?: string;
  /** The source of the reference e.g. NVD. */
  source?: string;
}

export const VulnerabilityReportVulnerabilityDetailsReference: Schema.Schema<VulnerabilityReportVulnerabilityDetailsReference> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
})).annotate({ identifier: "VulnerabilityReportVulnerabilityDetailsReference" }) as any as Schema.Schema<VulnerabilityReportVulnerabilityDetailsReference>;

export interface VulnerabilityReportVulnerabilityDetails {
  /** The CVE of the vulnerability. CVE cannot be empty and the combination of should be unique across vulnerabilities for a VM. */
  cve?: string;
  /** The full description of the CVSSv3 for this vulnerability from NVD. */
  cvssV3?: CVSSv3;
  /** Assigned severity/impact ranking from the distro. */
  severity?: string;
  /** Corresponds to the references attached to the `VulnerabilityDetails`. */
  references?: Array<VulnerabilityReportVulnerabilityDetailsReference>;
  /** The CVSS V2 score of this vulnerability. CVSS V2 score is on a scale of 0 - 10 where 0 indicates low severity and 10 indicates high severity. */
  cvssV2Score?: number;
  /** The note or description describing the vulnerability from the distro. */
  description?: string;
}

export const VulnerabilityReportVulnerabilityDetails: Schema.Schema<VulnerabilityReportVulnerabilityDetails> = Schema.suspend(() => Schema.Struct({
  cve: Schema.optional(Schema.String),
  cvssV3: Schema.optional(CVSSv3),
  severity: Schema.optional(Schema.String),
  references: Schema.optional(Schema.Array(VulnerabilityReportVulnerabilityDetailsReference)),
  cvssV2Score: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "VulnerabilityReportVulnerabilityDetails" }) as any as Schema.Schema<VulnerabilityReportVulnerabilityDetails>;

export interface VulnerabilityReportVulnerabilityItem {
  /** The upstream OS patch, packages or KB that fixes the vulnerability. */
  upstreamFix?: string;
  /** Corresponds to the `AVAILABLE_PACKAGE` inventory item on the VM. If the vulnerability report was not updated after the VM inventory update, these values might not display in VM inventory. If there is no available fix, the field is empty. The `inventory_item` value specifies the latest `SoftwarePackage` available to the VM that fixes the vulnerability. */
  availableInventoryItemId?: string;
  /** Corresponds to the `INSTALLED_PACKAGE` inventory item on the VM. This field displays the inventory items affected by this vulnerability. If the vulnerability report was not updated after the VM inventory update, these values might not display in VM inventory. For some operating systems, this field might be empty. */
  installedInventoryItemId?: string;
  /** The recommended [CPE URI](https://cpe.mitre.org/specification/) update that contains a fix for this vulnerability. */
  fixedCpeUri?: string;
}

export const VulnerabilityReportVulnerabilityItem: Schema.Schema<VulnerabilityReportVulnerabilityItem> = Schema.suspend(() => Schema.Struct({
  upstreamFix: Schema.optional(Schema.String),
  availableInventoryItemId: Schema.optional(Schema.String),
  installedInventoryItemId: Schema.optional(Schema.String),
  fixedCpeUri: Schema.optional(Schema.String),
})).annotate({ identifier: "VulnerabilityReportVulnerabilityItem" }) as any as Schema.Schema<VulnerabilityReportVulnerabilityItem>;

export interface VulnerabilityReportVulnerability {
  /** Contains metadata as per the upstream feed of the operating system and NVD. */
  details?: VulnerabilityReportVulnerabilityDetails;
  /** Corresponds to the `AVAILABLE_PACKAGE` inventory item on the VM. If the vulnerability report was not updated after the VM inventory update, these values might not display in VM inventory. If there is no available fix, the field is empty. The `inventory_item` value specifies the latest `SoftwarePackage` available to the VM that fixes the vulnerability. */
  availableInventoryItemIds?: Array<string>;
  /** List of items affected by the vulnerability. */
  items?: Array<VulnerabilityReportVulnerabilityItem>;
  /** Corresponds to the `INSTALLED_PACKAGE` inventory item on the VM. This field displays the inventory items affected by this vulnerability. If the vulnerability report was not updated after the VM inventory update, these values might not display in VM inventory. For some distros, this field may be empty. */
  installedInventoryItemIds?: Array<string>;
  /** The timestamp for when the vulnerability was first detected. */
  createTime?: string;
  /** The timestamp for when the vulnerability was last modified. */
  updateTime?: string;
}

export const VulnerabilityReportVulnerability: Schema.Schema<VulnerabilityReportVulnerability> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(VulnerabilityReportVulnerabilityDetails),
  availableInventoryItemIds: Schema.optional(Schema.Array(Schema.String)),
  items: Schema.optional(Schema.Array(VulnerabilityReportVulnerabilityItem)),
  installedInventoryItemIds: Schema.optional(Schema.Array(Schema.String)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "VulnerabilityReportVulnerability" }) as any as Schema.Schema<VulnerabilityReportVulnerability>;

export interface VulnerabilityReport {
  /** Output only. The `vulnerabilityReport` API resource name. Format: `projects/{project_number}/locations/{location}/instances/{instance_id}/vulnerabilityReport` */
  name?: string;
  /** Output only. List of vulnerabilities affecting the VM. */
  vulnerabilities?: Array<VulnerabilityReportVulnerability>;
  /** Output only. The timestamp for when the last vulnerability report was generated for the VM. */
  updateTime?: string;
  /** Output only. Highest level of severity among all the upgradable vulnerabilities with CVEs attached. */
  highestUpgradableCveSeverity?: "VULNERABILITY_SEVERITY_LEVEL_UNSPECIFIED" | "NONE" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
}

export const VulnerabilityReport: Schema.Schema<VulnerabilityReport> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  vulnerabilities: Schema.optional(Schema.Array(VulnerabilityReportVulnerability)),
  updateTime: Schema.optional(Schema.String),
  highestUpgradableCveSeverity: Schema.optional(Schema.String),
})).annotate({ identifier: "VulnerabilityReport" }) as any as Schema.Schema<VulnerabilityReport>;

export interface ListVulnerabilityReportsResponse {
  /** The pagination token to retrieve the next page of vulnerabilityReports object. */
  nextPageToken?: string;
  /** List of vulnerabilityReport objects. */
  vulnerabilityReports?: Array<VulnerabilityReport>;
}

export const ListVulnerabilityReportsResponse: Schema.Schema<ListVulnerabilityReportsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  vulnerabilityReports: Schema.optional(Schema.Array(VulnerabilityReport)),
})).annotate({ identifier: "ListVulnerabilityReportsResponse" }) as any as Schema.Schema<ListVulnerabilityReportsResponse>;

export interface PausePatchDeploymentRequest {
}

export const PausePatchDeploymentRequest: Schema.Schema<PausePatchDeploymentRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PausePatchDeploymentRequest" }) as any as Schema.Schema<PausePatchDeploymentRequest>;

export interface GoogleCloudOsconfigCommonV1__OperationMetadata {
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
}

export const GoogleCloudOsconfigCommonV1__OperationMetadata: Schema.Schema<GoogleCloudOsconfigCommonV1__OperationMetadata> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudOsconfigCommonV1__OperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigCommonV1__OperationMetadata>;

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
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface GoogleCloudOsconfigCommonV1alpha__OperationMetadata {
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudOsconfigCommonV1alpha__OperationMetadata: Schema.Schema<GoogleCloudOsconfigCommonV1alpha__OperationMetadata> = Schema.suspend(() => Schema.Struct({
  verb: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  statusMessage: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsconfigCommonV1alpha__OperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigCommonV1alpha__OperationMetadata>;

export interface InventoryOsInfo {
  /** The operating system long name. For example 'Debian GNU/Linux 9' or 'Microsoft Window Server 2019 Datacenter'. */
  longName?: string;
  /** The operating system short name. For example, 'windows' or 'debian'. */
  shortName?: string;
  /** The kernel release of the operating system. */
  kernelRelease?: string;
  /** The version of the operating system. */
  version?: string;
  /** The VM hostname. */
  hostname?: string;
  /** The current version of the OS Config agent running on the VM. */
  osconfigAgentVersion?: string;
  /** The kernel version of the operating system. */
  kernelVersion?: string;
  /** The system architecture of the operating system. */
  architecture?: string;
}

export const InventoryOsInfo: Schema.Schema<InventoryOsInfo> = Schema.suspend(() => Schema.Struct({
  longName: Schema.optional(Schema.String),
  shortName: Schema.optional(Schema.String),
  kernelRelease: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  hostname: Schema.optional(Schema.String),
  osconfigAgentVersion: Schema.optional(Schema.String),
  kernelVersion: Schema.optional(Schema.String),
  architecture: Schema.optional(Schema.String),
})).annotate({ identifier: "InventoryOsInfo" }) as any as Schema.Schema<InventoryOsInfo>;

export interface InventoryVersionedPackage {
  /** The system architecture this package is intended for. */
  architecture?: string;
  /** The name of the package. */
  packageName?: string;
  /** The version of the package. */
  version?: string;
}

export const InventoryVersionedPackage: Schema.Schema<InventoryVersionedPackage> = Schema.suspend(() => Schema.Struct({
  architecture: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "InventoryVersionedPackage" }) as any as Schema.Schema<InventoryVersionedPackage>;

export interface InventoryWindowsUpdatePackageWindowsUpdateCategory {
  /** The identifier of the windows update category. */
  id?: string;
  /** The name of the windows update category. */
  name?: string;
}

export const InventoryWindowsUpdatePackageWindowsUpdateCategory: Schema.Schema<InventoryWindowsUpdatePackageWindowsUpdateCategory> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "InventoryWindowsUpdatePackageWindowsUpdateCategory" }) as any as Schema.Schema<InventoryWindowsUpdatePackageWindowsUpdateCategory>;

export interface InventoryWindowsUpdatePackage {
  /** The categories that are associated with this update package. */
  categories?: Array<InventoryWindowsUpdatePackageWindowsUpdateCategory>;
  /** The last published date of the update, in (UTC) date and time. */
  lastDeploymentChangeTime?: string;
  /** The localized title of the update package. */
  title?: string;
  /** A hyperlink to the language-specific support information for the update. */
  supportUrl?: string;
  /** Gets the identifier of an update package. Stays the same across revisions. */
  updateId?: string;
  /** A collection of URLs that provide more information about the update package. */
  moreInfoUrls?: Array<string>;
  /** The revision number of this update package. */
  revisionNumber?: number;
  /** The localized description of the update package. */
  description?: string;
  /** A collection of Microsoft Knowledge Base article IDs that are associated with the update package. */
  kbArticleIds?: Array<string>;
}

export const InventoryWindowsUpdatePackage: Schema.Schema<InventoryWindowsUpdatePackage> = Schema.suspend(() => Schema.Struct({
  categories: Schema.optional(Schema.Array(InventoryWindowsUpdatePackageWindowsUpdateCategory)),
  lastDeploymentChangeTime: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  supportUrl: Schema.optional(Schema.String),
  updateId: Schema.optional(Schema.String),
  moreInfoUrls: Schema.optional(Schema.Array(Schema.String)),
  revisionNumber: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
  kbArticleIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "InventoryWindowsUpdatePackage" }) as any as Schema.Schema<InventoryWindowsUpdatePackage>;

export interface InventoryZypperPatch {
  /** Any summary information provided about this patch. */
  summary?: string;
  /** The category of the patch. */
  category?: string;
  /** The name of the patch. */
  patchName?: string;
  /** The severity specified for this patch */
  severity?: string;
}

export const InventoryZypperPatch: Schema.Schema<InventoryZypperPatch> = Schema.suspend(() => Schema.Struct({
  summary: Schema.optional(Schema.String),
  category: Schema.optional(Schema.String),
  patchName: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
})).annotate({ identifier: "InventoryZypperPatch" }) as any as Schema.Schema<InventoryZypperPatch>;

export interface Osconfig_Date {
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Osconfig_Date: Schema.Schema<Osconfig_Date> = Schema.suspend(() => Schema.Struct({
  month: Schema.optional(Schema.Number),
  year: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Osconfig_Date" }) as any as Schema.Schema<Osconfig_Date>;

export interface InventoryWindowsApplication {
  /** The internet address for technical support. */
  helpLink?: string;
  /** The version of the product or application in string format. */
  displayVersion?: string;
  /** The name of the manufacturer for the product or application. */
  publisher?: string;
  /** The name of the application or product. */
  displayName?: string;
  /** The last time this product received service. The value of this property is replaced each time a patch is applied or removed from the product or the command-line option is used to repair the product. */
  installDate?: Osconfig_Date;
}

export const InventoryWindowsApplication: Schema.Schema<InventoryWindowsApplication> = Schema.suspend(() => Schema.Struct({
  helpLink: Schema.optional(Schema.String),
  displayVersion: Schema.optional(Schema.String),
  publisher: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  installDate: Schema.optional(Osconfig_Date),
})).annotate({ identifier: "InventoryWindowsApplication" }) as any as Schema.Schema<InventoryWindowsApplication>;

export interface InventoryWindowsQuickFixEngineeringPackage {
  /** Unique identifier associated with a particular QFE update. */
  hotFixId?: string;
  /** A short textual description of the QFE update. */
  caption?: string;
  /** A textual description of the QFE update. */
  description?: string;
  /** Date that the QFE update was installed. Mapped from installed_on field. */
  installTime?: string;
}

export const InventoryWindowsQuickFixEngineeringPackage: Schema.Schema<InventoryWindowsQuickFixEngineeringPackage> = Schema.suspend(() => Schema.Struct({
  hotFixId: Schema.optional(Schema.String),
  caption: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  installTime: Schema.optional(Schema.String),
})).annotate({ identifier: "InventoryWindowsQuickFixEngineeringPackage" }) as any as Schema.Schema<InventoryWindowsQuickFixEngineeringPackage>;

export interface InventorySoftwarePackage {
  /** Details of a Googet package. For details about the googet package manager, see https://github.com/google/googet. */
  googetPackage?: InventoryVersionedPackage;
  /** Details of a Windows Update package. See https://docs.microsoft.com/en-us/windows/win32/api/_wua/ for information about Windows Update. */
  wuaPackage?: InventoryWindowsUpdatePackage;
  /** Details of a Zypper patch. For details about the Zypper package manager, see https://en.opensuse.org/SDB:Zypper_manual. */
  zypperPatch?: InventoryZypperPatch;
  /** Yum package info. For details about the yum package manager, see https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/deployment_guide/ch-yum. */
  yumPackage?: InventoryVersionedPackage;
  /** Details of an APT package. For details about the apt package manager, see https://wiki.debian.org/Apt. */
  aptPackage?: InventoryVersionedPackage;
  /** Details of a Zypper package. For details about the Zypper package manager, see https://en.opensuse.org/SDB:Zypper_manual. */
  zypperPackage?: InventoryVersionedPackage;
  /** Details of Windows Application. */
  windowsApplication?: InventoryWindowsApplication;
  /** Details of a Windows Quick Fix engineering package. See https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering for info in Windows Quick Fix Engineering. */
  qfePackage?: InventoryWindowsQuickFixEngineeringPackage;
  /** Details of a COS package. */
  cosPackage?: InventoryVersionedPackage;
}

export const InventorySoftwarePackage: Schema.Schema<InventorySoftwarePackage> = Schema.suspend(() => Schema.Struct({
  googetPackage: Schema.optional(InventoryVersionedPackage),
  wuaPackage: Schema.optional(InventoryWindowsUpdatePackage),
  zypperPatch: Schema.optional(InventoryZypperPatch),
  yumPackage: Schema.optional(InventoryVersionedPackage),
  aptPackage: Schema.optional(InventoryVersionedPackage),
  zypperPackage: Schema.optional(InventoryVersionedPackage),
  windowsApplication: Schema.optional(InventoryWindowsApplication),
  qfePackage: Schema.optional(InventoryWindowsQuickFixEngineeringPackage),
  cosPackage: Schema.optional(InventoryVersionedPackage),
})).annotate({ identifier: "InventorySoftwarePackage" }) as any as Schema.Schema<InventorySoftwarePackage>;

export interface InventoryItem {
  /** The origin of this inventory item. */
  originType?: "ORIGIN_TYPE_UNSPECIFIED" | "INVENTORY_REPORT" | (string & {});
  /** When this inventory item was last modified. */
  updateTime?: string;
  /** Software package present on the VM instance. */
  installedPackage?: InventorySoftwarePackage;
  /** Software package available to be installed on the VM instance. */
  availablePackage?: InventorySoftwarePackage;
  /** When this inventory item was first detected. */
  createTime?: string;
  /** The specific type of inventory, correlating to its specific details. */
  type?: "TYPE_UNSPECIFIED" | "INSTALLED_PACKAGE" | "AVAILABLE_PACKAGE" | (string & {});
  /** Identifier for this item, unique across items for this VM. */
  id?: string;
}

export const InventoryItem: Schema.Schema<InventoryItem> = Schema.suspend(() => Schema.Struct({
  originType: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  installedPackage: Schema.optional(InventorySoftwarePackage),
  availablePackage: Schema.optional(InventorySoftwarePackage),
  createTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "InventoryItem" }) as any as Schema.Schema<InventoryItem>;

export interface Inventory {
  /** Output only. Timestamp of the last reported inventory for the VM. */
  updateTime?: string;
  /** Base level operating system information for the VM. */
  osInfo?: InventoryOsInfo;
  /** Inventory items related to the VM keyed by an opaque unique identifier for each inventory item. The identifier is unique to each distinct and addressable inventory item and will change, when there is a new package version. */
  items?: Record<string, InventoryItem>;
  /** Output only. The `Inventory` API resource name. Format: `projects/{project_number}/locations/{location}/instances/{instance_id}/inventory` */
  name?: string;
}

export const Inventory: Schema.Schema<Inventory> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  osInfo: Schema.optional(InventoryOsInfo),
  items: Schema.optional(Schema.Record(Schema.String, InventoryItem)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Inventory" }) as any as Schema.Schema<Inventory>;

export interface ResumePatchDeploymentRequest {
}

export const ResumePatchDeploymentRequest: Schema.Schema<ResumePatchDeploymentRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResumePatchDeploymentRequest" }) as any as Schema.Schema<ResumePatchDeploymentRequest>;

export interface ListInventoriesResponse {
  /** The pagination token to retrieve the next page of inventory objects. */
  nextPageToken?: string;
  /** List of inventory objects. */
  inventories?: Array<Inventory>;
}

export const ListInventoriesResponse: Schema.Schema<ListInventoriesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  inventories: Schema.optional(Schema.Array(Inventory)),
})).annotate({ identifier: "ListInventoriesResponse" }) as any as Schema.Schema<ListInventoriesResponse>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface PatchJobInstanceDetailsSummary {
  /** Number of instances that have started. */
  startedInstanceCount?: string;
  /** Number of instances that have acked and will start shortly. */
  ackedInstanceCount?: string;
  /** Number of instances that are running the pre-patch step. */
  prePatchStepInstanceCount?: string;
  /** Number of instances that are inactive. */
  inactiveInstanceCount?: string;
  /** Number of instances that require reboot. */
  succeededRebootRequiredInstanceCount?: string;
  /** Number of instances pending patch job. */
  pendingInstanceCount?: string;
  /** Number of instances that are running the post-patch step. */
  postPatchStepInstanceCount?: string;
  /** Number of instances that are applying patches. */
  applyingPatchesInstanceCount?: string;
  /** Number of instances that failed. */
  failedInstanceCount?: string;
  /** Number of instances that were skipped during patching. */
  skippedInstanceCount?: string;
  /** Number of instances rebooting. */
  rebootingInstanceCount?: string;
  /** Number of instances that have completed successfully. */
  succeededInstanceCount?: string;
  /** Number of instances notified about patch job. */
  notifiedInstanceCount?: string;
  /** Number of instances that are downloading patches. */
  downloadingPatchesInstanceCount?: string;
  /** Number of instances that exceeded the time out while applying the patch. */
  timedOutInstanceCount?: string;
  /** Number of instances that do not appear to be running the agent. Check to ensure that the agent is installed, running, and able to communicate with the service. */
  noAgentDetectedInstanceCount?: string;
}

export const PatchJobInstanceDetailsSummary: Schema.Schema<PatchJobInstanceDetailsSummary> = Schema.suspend(() => Schema.Struct({
  startedInstanceCount: Schema.optional(Schema.String),
  ackedInstanceCount: Schema.optional(Schema.String),
  prePatchStepInstanceCount: Schema.optional(Schema.String),
  inactiveInstanceCount: Schema.optional(Schema.String),
  succeededRebootRequiredInstanceCount: Schema.optional(Schema.String),
  pendingInstanceCount: Schema.optional(Schema.String),
  postPatchStepInstanceCount: Schema.optional(Schema.String),
  applyingPatchesInstanceCount: Schema.optional(Schema.String),
  failedInstanceCount: Schema.optional(Schema.String),
  skippedInstanceCount: Schema.optional(Schema.String),
  rebootingInstanceCount: Schema.optional(Schema.String),
  succeededInstanceCount: Schema.optional(Schema.String),
  notifiedInstanceCount: Schema.optional(Schema.String),
  downloadingPatchesInstanceCount: Schema.optional(Schema.String),
  timedOutInstanceCount: Schema.optional(Schema.String),
  noAgentDetectedInstanceCount: Schema.optional(Schema.String),
})).annotate({ identifier: "PatchJobInstanceDetailsSummary" }) as any as Schema.Schema<PatchJobInstanceDetailsSummary>;

export interface CancelPatchJobRequest {
}

export const CancelPatchJobRequest: Schema.Schema<CancelPatchJobRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelPatchJobRequest" }) as any as Schema.Schema<CancelPatchJobRequest>;

export interface PatchJobInstanceDetails {
  /** The number of times the agent that the agent attempts to apply the patch. */
  attemptCount?: string;
  /** If the patch fails, this field provides the reason. */
  failureReason?: string;
  /** The unique identifier for the instance. This identifier is defined by the server. */
  instanceSystemId?: string;
  /** Current state of instance patch. */
  state?: "PATCH_STATE_UNSPECIFIED" | "PENDING" | "INACTIVE" | "NOTIFIED" | "STARTED" | "DOWNLOADING_PATCHES" | "APPLYING_PATCHES" | "REBOOTING" | "SUCCEEDED" | "SUCCEEDED_REBOOT_REQUIRED" | "FAILED" | "ACKED" | "TIMED_OUT" | "RUNNING_PRE_PATCH_STEP" | "RUNNING_POST_PATCH_STEP" | "NO_AGENT_DETECTED" | "SKIPPED" | (string & {});
  /** The instance name in the form `projects/* /zones/* /instances/*` */
  name?: string;
}

export const PatchJobInstanceDetails: Schema.Schema<PatchJobInstanceDetails> = Schema.suspend(() => Schema.Struct({
  attemptCount: Schema.optional(Schema.String),
  failureReason: Schema.optional(Schema.String),
  instanceSystemId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "PatchJobInstanceDetails" }) as any as Schema.Schema<PatchJobInstanceDetails>;

export interface PatchJob {
  /** Instances to patch. */
  instanceFilter?: PatchInstanceFilter;
  /** Time this patch job was created. */
  createTime?: string;
  /** Last time this patch job was updated. */
  updateTime?: string;
  /** Display name for this patch job. This is not a unique identifier. */
  displayName?: string;
  /** Reflects the overall progress of the patch job in the range of 0.0 being no progress to 100.0 being complete. */
  percentComplete?: number;
  /** Duration of the patch job. After the duration ends, the patch job times out. */
  duration?: string;
  /** Summary of instance details. */
  instanceDetailsSummary?: PatchJobInstanceDetailsSummary;
  /** Rollout strategy being applied. */
  rollout?: PatchRollout;
  /** Unique identifier for this patch job in the form `projects/* /patchJobs/*` */
  name?: string;
  /** Description of the patch job. Length of the description is limited to 1024 characters. */
  description?: string;
  /** If this patch job is a dry run, the agent reports that it has finished without running any updates on the VM instance. */
  dryRun?: boolean;
  /** Patch configuration being applied. */
  patchConfig?: PatchConfig;
  /** If this patch job failed, this message provides information about the failure. */
  errorMessage?: string;
  /** Output only. Name of the patch deployment that created this patch job. */
  patchDeployment?: string;
  /** The current state of the PatchJob. */
  state?: "STATE_UNSPECIFIED" | "STARTED" | "INSTANCE_LOOKUP" | "PATCHING" | "SUCCEEDED" | "COMPLETED_WITH_INACTIVE_VMS" | "COMPLETED_WITH_ERRORS" | "CANCELED" | "TIMED_OUT" | (string & {});
}

export const PatchJob: Schema.Schema<PatchJob> = Schema.suspend(() => Schema.Struct({
  instanceFilter: Schema.optional(PatchInstanceFilter),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  percentComplete: Schema.optional(Schema.Number),
  duration: Schema.optional(Schema.String),
  instanceDetailsSummary: Schema.optional(PatchJobInstanceDetailsSummary),
  rollout: Schema.optional(PatchRollout),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  dryRun: Schema.optional(Schema.Boolean),
  patchConfig: Schema.optional(PatchConfig),
  errorMessage: Schema.optional(Schema.String),
  patchDeployment: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "PatchJob" }) as any as Schema.Schema<PatchJob>;

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

export interface MessageSet {
}

export const MessageSet: Schema.Schema<MessageSet> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MessageSet" }) as any as Schema.Schema<MessageSet>;

export interface StatusProto {
  /** message_set associates an arbitrary proto message with the status. copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional proto2.bridge.MessageSet message_set = 5; */
  messageSet?: MessageSet;
  /** copybara:strip_begin(b/383363683) Space to which this status belongs copybara:strip_end_and_replace optional string space = 2; // Space to which this status belongs */
  space?: string;
  /** Numeric code drawn from the space specified below. Often, this is the canonical error space, and code is drawn from google3/util/task/codes.proto copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional int32 code = 1; */
  code?: number;
  /** Detail message copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional string message = 3; */
  message?: string;
  /** copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional int32 canonical_code = 6; */
  canonicalCode?: number;
}

export const StatusProto: Schema.Schema<StatusProto> = Schema.suspend(() => Schema.Struct({
  messageSet: Schema.optional(MessageSet),
  space: Schema.optional(Schema.String),
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  canonicalCode: Schema.optional(Schema.Number),
})).annotate({ identifier: "StatusProto" }) as any as Schema.Schema<StatusProto>;

export interface ListPatchJobInstanceDetailsResponse {
  /** A pagination token that can be used to get the next page of results. */
  nextPageToken?: string;
  /** A list of instance status. */
  patchJobInstanceDetails?: Array<PatchJobInstanceDetails>;
}

export const ListPatchJobInstanceDetailsResponse: Schema.Schema<ListPatchJobInstanceDetailsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  patchJobInstanceDetails: Schema.optional(Schema.Array(PatchJobInstanceDetails)),
})).annotate({ identifier: "ListPatchJobInstanceDetailsResponse" }) as any as Schema.Schema<ListPatchJobInstanceDetailsResponse>;

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

export interface GoogleCloudOsconfigV2beta__OperationMetadata {
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
}

export const GoogleCloudOsconfigV2beta__OperationMetadata: Schema.Schema<GoogleCloudOsconfigV2beta__OperationMetadata> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsconfigV2beta__OperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigV2beta__OperationMetadata>;

export interface GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata {
  /** Reference to the `OSPolicyAssignment` API resource. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}` */
  osPolicyAssignment?: string;
  /** The OS policy assignment API method. */
  apiMethod?: "API_METHOD_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | (string & {});
  /** State of the rollout */
  rolloutState?: "ROLLOUT_STATE_UNSPECIFIED" | "IN_PROGRESS" | "CANCELLING" | "CANCELLED" | "SUCCEEDED" | (string & {});
  /** Rollout start time */
  rolloutStartTime?: string;
  /** Rollout update time */
  rolloutUpdateTime?: string;
}

export const GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata: Schema.Schema<GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata> = Schema.suspend(() => Schema.Struct({
  osPolicyAssignment: Schema.optional(Schema.String),
  apiMethod: Schema.optional(Schema.String),
  rolloutState: Schema.optional(Schema.String),
  rolloutStartTime: Schema.optional(Schema.String),
  rolloutUpdateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata>;

export interface GoogleCloudOsconfigV2__OperationMetadata {
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
}

export const GoogleCloudOsconfigV2__OperationMetadata: Schema.Schema<GoogleCloudOsconfigV2__OperationMetadata> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudOsconfigV2__OperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigV2__OperationMetadata>;

export interface ProjectFeatureSettings {
  /** Required. Immutable. Name specifies the URL for the ProjectFeatureSettings resource: projects/project_id/locations/global/projectFeatureSettings. */
  name?: string;
  /** Set PatchAndConfigFeatureSet for the project. */
  patchAndConfigFeatureSet?: "PATCH_AND_CONFIG_FEATURE_SET_UNSPECIFIED" | "OSCONFIG_B" | "OSCONFIG_C" | (string & {});
}

export const ProjectFeatureSettings: Schema.Schema<ProjectFeatureSettings> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  patchAndConfigFeatureSet: Schema.optional(Schema.String),
})).annotate({ identifier: "ProjectFeatureSettings" }) as any as Schema.Schema<ProjectFeatureSettings>;

export interface OSPolicyAssignmentOperationMetadata {
  /** Rollout update time */
  rolloutUpdateTime?: string;
  /** The OS policy assignment API method. */
  apiMethod?: "API_METHOD_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | (string & {});
  /** State of the rollout */
  rolloutState?: "ROLLOUT_STATE_UNSPECIFIED" | "IN_PROGRESS" | "CANCELLING" | "CANCELLED" | "SUCCEEDED" | (string & {});
  /** Rollout start time */
  rolloutStartTime?: string;
  /** Reference to the `OSPolicyAssignment` API resource. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}` */
  osPolicyAssignment?: string;
}

export const OSPolicyAssignmentOperationMetadata: Schema.Schema<OSPolicyAssignmentOperationMetadata> = Schema.suspend(() => Schema.Struct({
  rolloutUpdateTime: Schema.optional(Schema.String),
  apiMethod: Schema.optional(Schema.String),
  rolloutState: Schema.optional(Schema.String),
  rolloutStartTime: Schema.optional(Schema.String),
  osPolicyAssignment: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyAssignmentOperationMetadata" }) as any as Schema.Schema<OSPolicyAssignmentOperationMetadata>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface ListOSPolicyAssignmentsResponse {
  /** The list of assignments */
  osPolicyAssignments?: Array<OSPolicyAssignment>;
  /** The pagination token to retrieve the next page of OS policy assignments. */
  nextPageToken?: string;
}

export const ListOSPolicyAssignmentsResponse: Schema.Schema<ListOSPolicyAssignmentsResponse> = Schema.suspend(() => Schema.Struct({
  osPolicyAssignments: Schema.optional(Schema.Array(OSPolicyAssignment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOSPolicyAssignmentsResponse" }) as any as Schema.Schema<ListOSPolicyAssignmentsResponse>;

export interface ExecutePatchJobRequest {
  /** Required. Instances to patch, either explicitly or filtered by some criteria such as zone or labels. */
  instanceFilter?: PatchInstanceFilter;
  /** Patch configuration being applied. If omitted, instances are patched using the default configurations. */
  patchConfig?: PatchConfig;
  /** Duration of the patch job. After the duration ends, the patch job times out. */
  duration?: string;
  /** Display name for this patch job. This does not have to be unique. */
  displayName?: string;
  /** Description of the patch job. Length of the description is limited to 1024 characters. */
  description?: string;
  /** If this patch is a dry-run only, instances are contacted but will do nothing. */
  dryRun?: boolean;
  /** Rollout strategy of the patch job. */
  rollout?: PatchRollout;
}

export const ExecutePatchJobRequest: Schema.Schema<ExecutePatchJobRequest> = Schema.suspend(() => Schema.Struct({
  instanceFilter: Schema.optional(PatchInstanceFilter),
  patchConfig: Schema.optional(PatchConfig),
  duration: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  dryRun: Schema.optional(Schema.Boolean),
  rollout: Schema.optional(PatchRollout),
})).annotate({ identifier: "ExecutePatchJobRequest" }) as any as Schema.Schema<ExecutePatchJobRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

// ==========================================================================
// Operations
// ==========================================================================

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

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
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

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsOperationsRequest {
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list filter. */
  filter?: string;
  /** The name of the operation's parent resource. */
  name: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<ListProjectsLocationsOperationsRequest, ListProjectsLocationsOperationsResponse, ListProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface UpdateProjectFeatureSettingsProjectsLocationsGlobalRequest {
  /** Optional. Field mask that controls which fields of the ProjectFeatureSettings should be updated. */
  updateMask?: string;
  /** Required. Immutable. Name specifies the URL for the ProjectFeatureSettings resource: projects/project_id/locations/global/projectFeatureSettings. */
  name: string;
  /** Request body */
  body?: ProjectFeatureSettings;
}

export const UpdateProjectFeatureSettingsProjectsLocationsGlobalRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ProjectFeatureSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/global/projectFeatureSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectFeatureSettingsProjectsLocationsGlobalRequest>;

export type UpdateProjectFeatureSettingsProjectsLocationsGlobalResponse = ProjectFeatureSettings;
export const UpdateProjectFeatureSettingsProjectsLocationsGlobalResponse = ProjectFeatureSettings;

export type UpdateProjectFeatureSettingsProjectsLocationsGlobalError = CommonErrors;

/** UpdateProjectFeatureSettings sets the VM Manager features for a project. */
export const updateProjectFeatureSettingsProjectsLocationsGlobal: API.OperationMethod<UpdateProjectFeatureSettingsProjectsLocationsGlobalRequest, UpdateProjectFeatureSettingsProjectsLocationsGlobalResponse, UpdateProjectFeatureSettingsProjectsLocationsGlobalError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectFeatureSettingsProjectsLocationsGlobalRequest,
  output: UpdateProjectFeatureSettingsProjectsLocationsGlobalResponse,
  errors: [],
}));

export interface GetProjectFeatureSettingsProjectsLocationsGlobalRequest {
  /** Required. Name specifies the URL for the ProjectFeatureSettings resource: projects/project_id/locations/global/projectFeatureSettings. */
  name: string;
}

export const GetProjectFeatureSettingsProjectsLocationsGlobalRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/projectFeatureSettings" }),
  svc,
) as unknown as Schema.Schema<GetProjectFeatureSettingsProjectsLocationsGlobalRequest>;

export type GetProjectFeatureSettingsProjectsLocationsGlobalResponse = ProjectFeatureSettings;
export const GetProjectFeatureSettingsProjectsLocationsGlobalResponse = ProjectFeatureSettings;

export type GetProjectFeatureSettingsProjectsLocationsGlobalError = CommonErrors;

/** GetProjectFeatureSettings returns the VM Manager feature settings for a project. */
export const getProjectFeatureSettingsProjectsLocationsGlobal: API.OperationMethod<GetProjectFeatureSettingsProjectsLocationsGlobalRequest, GetProjectFeatureSettingsProjectsLocationsGlobalResponse, GetProjectFeatureSettingsProjectsLocationsGlobalError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectFeatureSettingsProjectsLocationsGlobalRequest,
  output: GetProjectFeatureSettingsProjectsLocationsGlobalResponse,
  errors: [],
}));

export interface ListProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest {
  /** Required. The parent resource name. Format: `projects/{project}/locations/{location}/instances/{instance}/osPolicyAssignments/{assignment}/reports` For `{project}`, either `project-number` or `project-id` can be provided. For `{instance}`, either `instance-name`, `instance-id`, or `-` can be provided. If '-' is provided, the response will include OSPolicyAssignmentReports for all instances in the project/location. For `{assignment}`, either `assignment-id` or `-` can be provided. If '-' is provided, the response will include OSPolicyAssignmentReports for all OSPolicyAssignments in the project/location. Either {instance} or {assignment} must be `-`. For example: `projects/{project}/locations/{location}/instances/{instance}/osPolicyAssignments/-/reports` returns all reports for the instance `projects/{project}/locations/{location}/instances/-/osPolicyAssignments/{assignment-id}/reports` returns all the reports for the given assignment across all instances. `projects/{project}/locations/{location}/instances/-/osPolicyAssignments/-/reports` returns all the reports for all assignments across all instances. */
  parent: string;
  /** If provided, this field specifies the criteria that must be met by the `OSPolicyAssignmentReport` API resource that is included in the response. */
  filter?: string;
  /** A pagination token returned from a previous call to the `ListOSPolicyAssignmentReports` method that indicates where this listing should continue from. */
  pageToken?: string;
  /** The maximum number of results to return. */
  pageSize?: number;
}

export const ListProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/osPolicyAssignments/{osPolicyAssignmentsId}/reports" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest>;

export type ListProjectsLocationsInstancesOsPolicyAssignmentsReportsResponse = ListOSPolicyAssignmentReportsResponse;
export const ListProjectsLocationsInstancesOsPolicyAssignmentsReportsResponse = ListOSPolicyAssignmentReportsResponse;

export type ListProjectsLocationsInstancesOsPolicyAssignmentsReportsError = CommonErrors;

/** List OS policy assignment reports for all Compute Engine VM instances in the specified zone. */
export const listProjectsLocationsInstancesOsPolicyAssignmentsReports: API.PaginatedOperationMethod<ListProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest, ListProjectsLocationsInstancesOsPolicyAssignmentsReportsResponse, ListProjectsLocationsInstancesOsPolicyAssignmentsReportsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest,
  output: ListProjectsLocationsInstancesOsPolicyAssignmentsReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest {
  /** Required. API resource name for OS policy assignment report. Format: `/projects/{project}/locations/{location}/instances/{instance}/osPolicyAssignments/{assignment}/report` For `{project}`, either `project-number` or `project-id` can be provided. For `{instance_id}`, either Compute Engine `instance-id` or `instance-name` can be provided. For `{assignment_id}`, the OSPolicyAssignment id must be provided. */
  name: string;
}

export const GetProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/osPolicyAssignments/{osPolicyAssignmentsId}/report" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest>;

export type GetProjectsLocationsInstancesOsPolicyAssignmentsReportsResponse = OSPolicyAssignmentReport;
export const GetProjectsLocationsInstancesOsPolicyAssignmentsReportsResponse = OSPolicyAssignmentReport;

export type GetProjectsLocationsInstancesOsPolicyAssignmentsReportsError = CommonErrors;

/** Get the OS policy assignment report for the specified Compute Engine VM instance. */
export const getProjectsLocationsInstancesOsPolicyAssignmentsReports: API.OperationMethod<GetProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest, GetProjectsLocationsInstancesOsPolicyAssignmentsReportsResponse, GetProjectsLocationsInstancesOsPolicyAssignmentsReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest,
  output: GetProjectsLocationsInstancesOsPolicyAssignmentsReportsResponse,
  errors: [],
}));

export interface GetProjectsLocationsInstancesVulnerabilityReportsRequest {
  /** Required. API resource name for vulnerability resource. Format: `projects/{project}/locations/{location}/instances/{instance}/vulnerabilityReport` For `{project}`, either `project-number` or `project-id` can be provided. For `{instance}`, either Compute Engine `instance-id` or `instance-name` can be provided. */
  name: string;
}

export const GetProjectsLocationsInstancesVulnerabilityReportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/vulnerabilityReport" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInstancesVulnerabilityReportsRequest>;

export type GetProjectsLocationsInstancesVulnerabilityReportsResponse = VulnerabilityReport;
export const GetProjectsLocationsInstancesVulnerabilityReportsResponse = VulnerabilityReport;

export type GetProjectsLocationsInstancesVulnerabilityReportsError = CommonErrors;

/** Gets the vulnerability report for the specified VM instance. Only VMs with inventory data have vulnerability reports associated with them. */
export const getProjectsLocationsInstancesVulnerabilityReports: API.OperationMethod<GetProjectsLocationsInstancesVulnerabilityReportsRequest, GetProjectsLocationsInstancesVulnerabilityReportsResponse, GetProjectsLocationsInstancesVulnerabilityReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInstancesVulnerabilityReportsRequest,
  output: GetProjectsLocationsInstancesVulnerabilityReportsResponse,
  errors: [],
}));

export interface ListProjectsLocationsInstancesVulnerabilityReportsRequest {
  /** Required. The parent resource name. Format: `projects/{project}/locations/{location}/instances/-` For `{project}`, either `project-number` or `project-id` can be provided. */
  parent: string;
  /** This field supports filtering by the severity level for the vulnerability. For a list of severity levels, see [Severity levels for vulnerabilities](https://cloud.google.com/container-analysis/docs/container-scanning-overview#severity_levels_for_vulnerabilities). The filter field follows the rules described in the [AIP-160](https://google.aip.dev/160) guidelines as follows: + **Filter for a specific severity type**: you can list reports that contain vulnerabilities that are classified as medium by specifying `vulnerabilities.details.severity:MEDIUM`. + **Filter for a range of severities** : you can list reports that have vulnerabilities that are classified as critical or high by specifying `vulnerabilities.details.severity:HIGH OR vulnerabilities.details.severity:CRITICAL` */
  filter?: string;
  /** A pagination token returned from a previous call to `ListVulnerabilityReports` that indicates where this listing should continue from. */
  pageToken?: string;
  /** The maximum number of results to return. */
  pageSize?: number;
}

export const ListProjectsLocationsInstancesVulnerabilityReportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/vulnerabilityReports" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInstancesVulnerabilityReportsRequest>;

export type ListProjectsLocationsInstancesVulnerabilityReportsResponse = ListVulnerabilityReportsResponse;
export const ListProjectsLocationsInstancesVulnerabilityReportsResponse = ListVulnerabilityReportsResponse;

export type ListProjectsLocationsInstancesVulnerabilityReportsError = CommonErrors;

/** List vulnerability reports for all VM instances in the specified zone. */
export const listProjectsLocationsInstancesVulnerabilityReports: API.PaginatedOperationMethod<ListProjectsLocationsInstancesVulnerabilityReportsRequest, ListProjectsLocationsInstancesVulnerabilityReportsResponse, ListProjectsLocationsInstancesVulnerabilityReportsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsInstancesVulnerabilityReportsRequest,
  output: ListProjectsLocationsInstancesVulnerabilityReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsInstancesInventoriesRequest {
  /** The maximum number of results to return. */
  pageSize?: number;
  /** A pagination token returned from a previous call to `ListInventories` that indicates where this listing should continue from. */
  pageToken?: string;
  /** If provided, this field specifies the criteria that must be met by a `Inventory` API resource to be included in the response. */
  filter?: string;
  /** Required. The parent resource name. Format: `projects/{project}/locations/{location}/instances/-` For `{project}`, either `project-number` or `project-id` can be provided. */
  parent: string;
  /** Inventory view indicating what information should be included in the inventory resource. If unspecified, the default view is BASIC. */
  view?: "INVENTORY_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const ListProjectsLocationsInstancesInventoriesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/inventories" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInstancesInventoriesRequest>;

export type ListProjectsLocationsInstancesInventoriesResponse = ListInventoriesResponse;
export const ListProjectsLocationsInstancesInventoriesResponse = ListInventoriesResponse;

export type ListProjectsLocationsInstancesInventoriesError = CommonErrors;

/** List inventory data for all VM instances in the specified zone. */
export const listProjectsLocationsInstancesInventories: API.PaginatedOperationMethod<ListProjectsLocationsInstancesInventoriesRequest, ListProjectsLocationsInstancesInventoriesResponse, ListProjectsLocationsInstancesInventoriesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsInstancesInventoriesRequest,
  output: ListProjectsLocationsInstancesInventoriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsInstancesInventoriesRequest {
  /** Required. API resource name for inventory resource. Format: `projects/{project}/locations/{location}/instances/{instance}/inventory` For `{project}`, either `project-number` or `project-id` can be provided. For `{instance}`, either Compute Engine `instance-id` or `instance-name` can be provided. */
  name: string;
  /** Inventory view indicating what information should be included in the inventory resource. If unspecified, the default view is BASIC. */
  view?: "INVENTORY_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetProjectsLocationsInstancesInventoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/inventory" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInstancesInventoriesRequest>;

export type GetProjectsLocationsInstancesInventoriesResponse = Inventory;
export const GetProjectsLocationsInstancesInventoriesResponse = Inventory;

export type GetProjectsLocationsInstancesInventoriesError = CommonErrors;

/** Get inventory data for the specified VM instance. If the VM has no associated inventory, the message `NOT_FOUND` is returned. */
export const getProjectsLocationsInstancesInventories: API.OperationMethod<GetProjectsLocationsInstancesInventoriesRequest, GetProjectsLocationsInstancesInventoriesResponse, GetProjectsLocationsInstancesInventoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInstancesInventoriesRequest,
  output: GetProjectsLocationsInstancesInventoriesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsOsPolicyAssignmentsRequest {
  /** Optional. If set to true, and the OS policy assignment is not found, a new OS policy assignment will be created. In this situation, `update_mask` is ignored. */
  allowMissing?: boolean;
  /** Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is only idempotent if a `request_id` is provided. */
  requestId?: string;
  /** Resource name. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id}` This field is ignored when you create an OS policy assignment. */
  name: string;
  /** Optional. Field mask that controls which fields of the assignment should be updated. */
  updateMask?: string;
  /** Request body */
  body?: OSPolicyAssignment;
}

export const PatchProjectsLocationsOsPolicyAssignmentsRequest = Schema.Struct({
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(OSPolicyAssignment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/osPolicyAssignments/{osPolicyAssignmentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsOsPolicyAssignmentsRequest>;

export type PatchProjectsLocationsOsPolicyAssignmentsResponse = Operation;
export const PatchProjectsLocationsOsPolicyAssignmentsResponse = Operation;

export type PatchProjectsLocationsOsPolicyAssignmentsError = CommonErrors;

/** Update an existing OS policy assignment. This method creates a new revision of the OS policy assignment. This method returns a long running operation (LRO) that contains the rollout details. The rollout can be cancelled by cancelling the LRO. For more information, see [Method: projects.locations.osPolicyAssignments.operations.cancel](https://cloud.google.com/compute/docs/osconfig/rest/v1/projects.locations.osPolicyAssignments.operations/cancel). */
export const patchProjectsLocationsOsPolicyAssignments: API.OperationMethod<PatchProjectsLocationsOsPolicyAssignmentsRequest, PatchProjectsLocationsOsPolicyAssignmentsResponse, PatchProjectsLocationsOsPolicyAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsOsPolicyAssignmentsRequest,
  output: PatchProjectsLocationsOsPolicyAssignmentsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsOsPolicyAssignmentsRequest {
  /** Required. The name of the OS policy assignment to be deleted */
  name: string;
  /** Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is only idempotent if a `request_id` is provided. */
  requestId?: string;
}

export const DeleteProjectsLocationsOsPolicyAssignmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/osPolicyAssignments/{osPolicyAssignmentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOsPolicyAssignmentsRequest>;

export type DeleteProjectsLocationsOsPolicyAssignmentsResponse = Operation;
export const DeleteProjectsLocationsOsPolicyAssignmentsResponse = Operation;

export type DeleteProjectsLocationsOsPolicyAssignmentsError = CommonErrors;

/** Delete the OS policy assignment. This method creates a new revision of the OS policy assignment. This method returns a long running operation (LRO) that contains the rollout details. The rollout can be cancelled by cancelling the LRO. If the LRO completes and is not cancelled, all revisions associated with the OS policy assignment are deleted. For more information, see [Method: projects.locations.osPolicyAssignments.operations.cancel](https://cloud.google.com/compute/docs/osconfig/rest/v1/projects.locations.osPolicyAssignments.operations/cancel). */
export const deleteProjectsLocationsOsPolicyAssignments: API.OperationMethod<DeleteProjectsLocationsOsPolicyAssignmentsRequest, DeleteProjectsLocationsOsPolicyAssignmentsResponse, DeleteProjectsLocationsOsPolicyAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOsPolicyAssignmentsRequest,
  output: DeleteProjectsLocationsOsPolicyAssignmentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsOsPolicyAssignmentsRequest {
  /** Required. The logical name of the OS policy assignment in the project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the project. */
  osPolicyAssignmentId?: string;
  /** Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is only idempotent if a `request_id` is provided. */
  requestId?: string;
  /** Required. The parent resource name in the form: projects/{project}/locations/{location}. Note: Specify the zone of your VMs as the location. */
  parent: string;
  /** Request body */
  body?: OSPolicyAssignment;
}

export const CreateProjectsLocationsOsPolicyAssignmentsRequest = Schema.Struct({
  osPolicyAssignmentId: Schema.optional(Schema.String).pipe(T.HttpQuery("osPolicyAssignmentId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(OSPolicyAssignment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/osPolicyAssignments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsOsPolicyAssignmentsRequest>;

export type CreateProjectsLocationsOsPolicyAssignmentsResponse = Operation;
export const CreateProjectsLocationsOsPolicyAssignmentsResponse = Operation;

export type CreateProjectsLocationsOsPolicyAssignmentsError = CommonErrors;

/** Create an OS policy assignment. This method also creates the first revision of the OS policy assignment. This method returns a long running operation (LRO) that contains the rollout details. The rollout can be cancelled by cancelling the LRO. For more information, see [Method: projects.locations.osPolicyAssignments.operations.cancel](https://cloud.google.com/compute/docs/osconfig/rest/v1/projects.locations.osPolicyAssignments.operations/cancel). */
export const createProjectsLocationsOsPolicyAssignments: API.OperationMethod<CreateProjectsLocationsOsPolicyAssignmentsRequest, CreateProjectsLocationsOsPolicyAssignmentsResponse, CreateProjectsLocationsOsPolicyAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsOsPolicyAssignmentsRequest,
  output: CreateProjectsLocationsOsPolicyAssignmentsResponse,
  errors: [],
}));

export interface ListProjectsLocationsOsPolicyAssignmentsRequest {
  /** The maximum number of assignments to return. */
  pageSize?: number;
  /** A pagination token returned from a previous call to `ListOSPolicyAssignments` that indicates where this listing should continue from. */
  pageToken?: string;
  /** Required. The parent resource name. */
  parent: string;
}

export const ListProjectsLocationsOsPolicyAssignmentsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/osPolicyAssignments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOsPolicyAssignmentsRequest>;

export type ListProjectsLocationsOsPolicyAssignmentsResponse = ListOSPolicyAssignmentsResponse;
export const ListProjectsLocationsOsPolicyAssignmentsResponse = ListOSPolicyAssignmentsResponse;

export type ListProjectsLocationsOsPolicyAssignmentsError = CommonErrors;

/** List the OS policy assignments under the parent resource. For each OS policy assignment, the latest revision is returned. */
export const listProjectsLocationsOsPolicyAssignments: API.PaginatedOperationMethod<ListProjectsLocationsOsPolicyAssignmentsRequest, ListProjectsLocationsOsPolicyAssignmentsResponse, ListProjectsLocationsOsPolicyAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsOsPolicyAssignmentsRequest,
  output: ListProjectsLocationsOsPolicyAssignmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsOsPolicyAssignmentsRequest {
  /** Required. The resource name of OS policy assignment. Format: `projects/{project}/locations/{location}/osPolicyAssignments/{os_policy_assignment}@{revisionId}` */
  name: string;
}

export const GetProjectsLocationsOsPolicyAssignmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/osPolicyAssignments/{osPolicyAssignmentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOsPolicyAssignmentsRequest>;

export type GetProjectsLocationsOsPolicyAssignmentsResponse = OSPolicyAssignment;
export const GetProjectsLocationsOsPolicyAssignmentsResponse = OSPolicyAssignment;

export type GetProjectsLocationsOsPolicyAssignmentsError = CommonErrors;

/** Retrieve an existing OS policy assignment. This method always returns the latest revision. In order to retrieve a previous revision of the assignment, also provide the revision ID in the `name` parameter. */
export const getProjectsLocationsOsPolicyAssignments: API.OperationMethod<GetProjectsLocationsOsPolicyAssignmentsRequest, GetProjectsLocationsOsPolicyAssignmentsResponse, GetProjectsLocationsOsPolicyAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOsPolicyAssignmentsRequest,
  output: GetProjectsLocationsOsPolicyAssignmentsResponse,
  errors: [],
}));

export interface ListRevisionsProjectsLocationsOsPolicyAssignmentsRequest {
  /** Required. The name of the OS policy assignment to list revisions for. */
  name: string;
  /** A pagination token returned from a previous call to `ListOSPolicyAssignmentRevisions` that indicates where this listing should continue from. */
  pageToken?: string;
  /** The maximum number of revisions to return. */
  pageSize?: number;
}

export const ListRevisionsProjectsLocationsOsPolicyAssignmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/osPolicyAssignments/{osPolicyAssignmentsId}:listRevisions" }),
  svc,
) as unknown as Schema.Schema<ListRevisionsProjectsLocationsOsPolicyAssignmentsRequest>;

export type ListRevisionsProjectsLocationsOsPolicyAssignmentsResponse = ListOSPolicyAssignmentRevisionsResponse;
export const ListRevisionsProjectsLocationsOsPolicyAssignmentsResponse = ListOSPolicyAssignmentRevisionsResponse;

export type ListRevisionsProjectsLocationsOsPolicyAssignmentsError = CommonErrors;

/** List the OS policy assignment revisions for a given OS policy assignment. */
export const listRevisionsProjectsLocationsOsPolicyAssignments: API.PaginatedOperationMethod<ListRevisionsProjectsLocationsOsPolicyAssignmentsRequest, ListRevisionsProjectsLocationsOsPolicyAssignmentsResponse, ListRevisionsProjectsLocationsOsPolicyAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListRevisionsProjectsLocationsOsPolicyAssignmentsRequest,
  output: ListRevisionsProjectsLocationsOsPolicyAssignmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsOsPolicyAssignmentsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOsPolicyAssignmentsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/osPolicyAssignments/{osPolicyAssignmentsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOsPolicyAssignmentsOperationsRequest>;

export type GetProjectsLocationsOsPolicyAssignmentsOperationsResponse = Operation;
export const GetProjectsLocationsOsPolicyAssignmentsOperationsResponse = Operation;

export type GetProjectsLocationsOsPolicyAssignmentsOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOsPolicyAssignmentsOperations: API.OperationMethod<GetProjectsLocationsOsPolicyAssignmentsOperationsRequest, GetProjectsLocationsOsPolicyAssignmentsOperationsResponse, GetProjectsLocationsOsPolicyAssignmentsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOsPolicyAssignmentsOperationsRequest,
  output: GetProjectsLocationsOsPolicyAssignmentsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsOsPolicyAssignmentsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOsPolicyAssignmentsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/osPolicyAssignments/{osPolicyAssignmentsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOsPolicyAssignmentsOperationsRequest>;

export type CancelProjectsLocationsOsPolicyAssignmentsOperationsResponse = Empty;
export const CancelProjectsLocationsOsPolicyAssignmentsOperationsResponse = Empty;

export type CancelProjectsLocationsOsPolicyAssignmentsOperationsError = CommonErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOsPolicyAssignmentsOperations: API.OperationMethod<CancelProjectsLocationsOsPolicyAssignmentsOperationsRequest, CancelProjectsLocationsOsPolicyAssignmentsOperationsResponse, CancelProjectsLocationsOsPolicyAssignmentsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOsPolicyAssignmentsOperationsRequest,
  output: CancelProjectsLocationsOsPolicyAssignmentsOperationsResponse,
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
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/patchDeployments/{patchDeploymentsId}", hasBody: true }),
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/patchDeployments/{patchDeploymentsId}:resume", hasBody: true }),
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

export interface DeleteProjectsPatchDeploymentsRequest {
  /** Required. The resource name of the patch deployment in the form `projects/* /patchDeployments/*`. */
  name: string;
}

export const DeleteProjectsPatchDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/patchDeployments/{patchDeploymentsId}" }),
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

export interface GetProjectsPatchDeploymentsRequest {
  /** Required. The resource name of the patch deployment in the form `projects/* /patchDeployments/*`. */
  name: string;
}

export const GetProjectsPatchDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/patchDeployments/{patchDeploymentsId}" }),
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/patchDeployments/{patchDeploymentsId}:pause", hasBody: true }),
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/patchDeployments", hasBody: true }),
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

export interface ListProjectsPatchDeploymentsRequest {
  /** Required. The resource name of the parent in the form `projects/*`. */
  parent: string;
  /** Optional. The maximum number of patch deployments to return. Default is 100. */
  pageSize?: number;
  /** Optional. A pagination token returned from a previous call to ListPatchDeployments that indicates where this listing should continue from. */
  pageToken?: string;
}

export const ListProjectsPatchDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/patchDeployments" }),
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/patchJobs:execute", hasBody: true }),
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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/patchJobs/{patchJobsId}" }),
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/patchJobs/{patchJobsId}:cancel", hasBody: true }),
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
  /** The maximum number of instance status to return. */
  pageSize?: number;
  /** A pagination token returned from a previous call that indicates where this listing should continue from. */
  pageToken?: string;
  /** If provided, this field specifies the criteria that must be met by patch jobs to be included in the response. Currently, filtering is only available on the patch_deployment field. */
  filter?: string;
  /** Required. In the form of `projects/*` */
  parent: string;
}

export const ListProjectsPatchJobsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/patchJobs" }),
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
  /** A pagination token returned from a previous call that indicates where this listing should continue from. */
  pageToken?: string;
  /** The maximum number of instance details records to return. Default is 100. */
  pageSize?: number;
  /** Required. The parent for the instances are in the form of `projects/* /patchJobs/*`. */
  parent: string;
  /** A filter expression that filters results listed in the response. This field supports filtering results by instance zone, name, state, or `failure_reason`. */
  filter?: string;
}

export const ListProjectsPatchJobsInstanceDetailsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/patchJobs/{patchJobsId}/instanceDetails" }),
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

