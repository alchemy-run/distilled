// ==========================================================================
// Cloud Memorystore for Memcached API (memcache v1beta2)
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
  name: "memcache",
  version: "v1beta2",
  rootUrl: "https://memcache.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface SetTagsResponse {
  /** A checksum based on the current bindings. This field is always set in server responses. */
  etag?: string;
  /** Required. The full resource name of the service resource. */
  name?: string;
  /** Required. Tag keys/values directly bound to this resource. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" */
  tags?: Record<string, string>;
}

export const SetTagsResponse: Schema.Schema<SetTagsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "SetTagsResponse",
  }) as any as Schema.Schema<SetTagsResponse>;

export interface TimeOfDay {
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      minutes: Schema.optional(Schema.Number),
      seconds: Schema.optional(Schema.Number),
      hours: Schema.optional(Schema.Number),
      nanos: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface DailyCycle {
  /** Output only. Duration of the time window, set by service producer. */
  duration?: string;
  /** Time within the day to start the operations. */
  startTime?: TimeOfDay;
}

export const DailyCycle: Schema.Schema<DailyCycle> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      duration: Schema.optional(Schema.String),
      startTime: Schema.optional(TimeOfDay),
    }),
  ).annotate({ identifier: "DailyCycle" }) as any as Schema.Schema<DailyCycle>;

export interface Schedule {
  /** Output only. Duration of the time window, set by service producer. */
  duration?: string;
  /** Time within the window to start the operations. */
  startTime?: TimeOfDay;
  /** Allows to define schedule that runs specified day of the week. */
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
}

export const Schedule: Schema.Schema<Schedule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      duration: Schema.optional(Schema.String),
      startTime: Schema.optional(TimeOfDay),
      day: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Schedule" }) as any as Schema.Schema<Schedule>;

export interface WeeklyCycle {
  /** User can specify multiple windows in a week. Minimum of 1 window. */
  schedule?: Array<Schedule>;
}

export const WeeklyCycle: Schema.Schema<WeeklyCycle> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      schedule: Schema.optional(Schema.Array(Schedule)),
    }),
  ).annotate({
    identifier: "WeeklyCycle",
  }) as any as Schema.Schema<WeeklyCycle>;

export interface MaintenanceWindow {
  /** Daily cycle. */
  dailyCycle?: DailyCycle;
  /** Weekly cycle. */
  weeklyCycle?: WeeklyCycle;
}

export const MaintenanceWindow: Schema.Schema<MaintenanceWindow> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dailyCycle: Schema.optional(DailyCycle),
      weeklyCycle: Schema.optional(WeeklyCycle),
    }),
  ).annotate({
    identifier: "MaintenanceWindow",
  }) as any as Schema.Schema<MaintenanceWindow>;

export interface Memcache_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Memcache_Date: Schema.Schema<Memcache_Date> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      year: Schema.optional(Schema.Number),
      month: Schema.optional(Schema.Number),
      day: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "Memcache_Date",
  }) as any as Schema.Schema<Memcache_Date>;

export interface DenyMaintenancePeriod {
  /** Deny period start date. This can be: * A full date, with non-zero year, month and day values. * A month and day value, with a zero year. Allows recurring deny periods each year. Date matching this period will have to be the same or after the start. */
  startDate?: Memcache_Date;
  /** Deny period end date. This can be: * A full date, with non-zero year, month and day values. * A month and day value, with a zero year. Allows recurring deny periods each year. Date matching this period will have to be before the end. */
  endDate?: Memcache_Date;
  /** Time in UTC when the Blackout period starts on start_date and ends on end_date. This can be: * Full time. * All zeros for 00:00:00 UTC */
  time?: TimeOfDay;
}

export const DenyMaintenancePeriod: Schema.Schema<DenyMaintenancePeriod> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startDate: Schema.optional(Memcache_Date),
      endDate: Schema.optional(Memcache_Date),
      time: Schema.optional(TimeOfDay),
    }),
  ).annotate({
    identifier: "DenyMaintenancePeriod",
  }) as any as Schema.Schema<DenyMaintenancePeriod>;

export interface UpdatePolicy {
  /** Optional. Maintenance window that is applied to resources covered by this policy. */
  window?: MaintenanceWindow;
  /** Deny Maintenance Period that is applied to resource to indicate when maintenance is forbidden. The protocol supports zero-to-many such periods, but the current SLM Rollout implementation only supports zero-to-one. */
  denyMaintenancePeriods?: Array<DenyMaintenancePeriod>;
  /** Optional. Relative scheduling channel applied to resource. */
  channel?:
    | "UPDATE_CHANNEL_UNSPECIFIED"
    | "EARLIER"
    | "LATER"
    | "WEEK1"
    | "WEEK2"
    | "WEEK5"
    | (string & {});
}

export const UpdatePolicy: Schema.Schema<UpdatePolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      window: Schema.optional(MaintenanceWindow),
      denyMaintenancePeriods: Schema.optional(
        Schema.Array(DenyMaintenancePeriod),
      ),
      channel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdatePolicy",
  }) as any as Schema.Schema<UpdatePolicy>;

export interface MaintenanceSchedule {
  /** Output only. The deadline that the maintenance schedule start time can not go beyond, including reschedule. */
  scheduleDeadlineTime?: string;
  /** Output only. The start time of any upcoming scheduled maintenance for this instance. */
  startTime?: string;
  /** Output only. The end time of any upcoming scheduled maintenance for this instance. */
  endTime?: string;
}

export const MaintenanceSchedule: Schema.Schema<MaintenanceSchedule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scheduleDeadlineTime: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MaintenanceSchedule",
  }) as any as Schema.Schema<MaintenanceSchedule>;

export interface GetTagsResponse {
  /** A checksum based on the current bindings. This field is always set in server responses. */
  etag?: string;
  /** Required. The full resource name of the service resource. */
  name?: string;
  /** Required. Tag keys/values directly bound to this resource. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" */
  tags?: Record<string, string>;
}

export const GetTagsResponse: Schema.Schema<GetTagsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "GetTagsResponse",
  }) as any as Schema.Schema<GetTagsResponse>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter {
  /** Optional. Array of string values. e.g. instance's replica information. */
  values?: Array<string>;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      values: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier:
      "GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter>;

export interface ZoneMetadata {}

export const ZoneMetadata: Schema.Schema<ZoneMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ZoneMetadata",
  }) as any as Schema.Schema<ZoneMetadata>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule {
  /** This field is deprecated, and will be always set to true since reschedule can happen multiple times now. This field should not be removed until all service producers remove this for their customers. */
  canReschedule?: boolean;
  /** The scheduled start time for the maintenance. */
  startTime?: string;
  /** schedule_deadline_time is the time deadline any schedule start time cannot go beyond, including reschedule. It's normally the initial schedule start time plus maintenance window length (1 day or 1 week). Maintenance cannot be scheduled to start beyond this deadline. */
  scheduleDeadlineTime?: string;
  /** The scheduled end time for the maintenance. */
  endTime?: string;
  /** The rollout management policy this maintenance schedule is associated with. When doing reschedule update request, the reschedule should be against this given policy. */
  rolloutManagementPolicy?: string;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      canReschedule: Schema.optional(Schema.Boolean),
      startTime: Schema.optional(Schema.String),
      scheduleDeadlineTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      rolloutManagementPolicy: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule>;

export interface MemcacheParameters {
  /** Output only. The unique ID associated with this set of parameters. Users can use this id to determine if the parameters associated with the instance differ from the parameters associated with the nodes. A discrepancy between parameter ids can inform users that they may need to take action to apply parameters on nodes. */
  id?: string;
  /** User defined set of parameters to use in the memcached process. */
  params?: Record<string, string>;
}

export const MemcacheParameters: Schema.Schema<MemcacheParameters> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      params: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "MemcacheParameters",
  }) as any as Schema.Schema<MemcacheParameters>;

export interface CancelOperationRequest {}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelOperationRequest",
  }) as any as Schema.Schema<CancelOperationRequest>;

export interface NodeConfig {
  /** Required. Memory size in MiB for each Memcached node. */
  memorySizeMb?: number;
  /** Required. Number of cpus per Memcached node. */
  cpuCount?: number;
}

export const NodeConfig: Schema.Schema<NodeConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      memorySizeMb: Schema.optional(Schema.Number),
      cpuCount: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "NodeConfig" }) as any as Schema.Schema<NodeConfig>;

export interface Status {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      code: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface RescheduleMaintenanceRequest {
  /** Required. If reschedule type is SPECIFIC_TIME, must set up schedule_time as well. */
  rescheduleType?:
    | "RESCHEDULE_TYPE_UNSPECIFIED"
    | "IMMEDIATE"
    | "NEXT_AVAILABLE_WINDOW"
    | "SPECIFIC_TIME"
    | (string & {});
  /** Timestamp when the maintenance shall be rescheduled to if reschedule_type=SPECIFIC_TIME, in RFC 3339 format, for example `2012-11-15T16:19:00.094Z`. */
  scheduleTime?: string;
}

export const RescheduleMaintenanceRequest: Schema.Schema<RescheduleMaintenanceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rescheduleType: Schema.optional(Schema.String),
      scheduleTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RescheduleMaintenanceRequest",
  }) as any as Schema.Schema<RescheduleMaintenanceRequest>;

export interface GetTagsRequest {
  /** Required. The full resource name of the service resource. */
  name?: string;
}

export const GetTagsRequest: Schema.Schema<GetTagsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GetTagsRequest",
  }) as any as Schema.Schema<GetTagsRequest>;

export interface Location {
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
}

export const Location: Schema.Schema<Location> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      locationId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface UpdateParametersRequest {
  /** The parameters to apply to the instance. */
  parameters?: MemcacheParameters;
  /** Required. Mask of fields to update. */
  updateMask?: string;
}

export const UpdateParametersRequest: Schema.Schema<UpdateParametersRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parameters: Schema.optional(MemcacheParameters),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateParametersRequest",
  }) as any as Schema.Schema<UpdateParametersRequest>;

export interface InstanceMessage {
  /** A code that correspond to one type of user-facing message. */
  code?: "CODE_UNSPECIFIED" | "ZONE_DISTRIBUTION_UNBALANCED" | (string & {});
  /** Message on memcached instance which will be exposed to users. */
  message?: string;
}

export const InstanceMessage: Schema.Schema<InstanceMessage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InstanceMessage",
  }) as any as Schema.Schema<InstanceMessage>;

export interface ApplySoftwareUpdateRequest {
  /** Nodes to which we should apply the update to. Note all the selected nodes are updated in parallel. */
  nodeIds?: Array<string>;
  /** Whether to apply the update to all nodes. If set to true, will explicitly restrict users from specifying any nodes, and apply software update to all nodes (where applicable) within the instance. */
  applyAll?: boolean;
}

export const ApplySoftwareUpdateRequest: Schema.Schema<ApplySoftwareUpdateRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nodeIds: Schema.optional(Schema.Array(Schema.String)),
      applyAll: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ApplySoftwareUpdateRequest",
  }) as any as Schema.Schema<ApplySoftwareUpdateRequest>;

export interface MaintenancePolicy {
  /** Optional. Description of what this policy is for. Create/Update methods return INVALID_ARGUMENT if the length is greater than 512. */
  description?: string;
  /** Maintenance policy applicable to instance update. */
  updatePolicy?: UpdatePolicy;
  /** Required. MaintenancePolicy name using the form: `projects/{project_id}/locations/{location_id}/maintenancePolicies/{maintenance_policy_id}` where {project_id} refers to a GCP consumer project ID, {location_id} refers to a GCP region/zone, {maintenance_policy_id} must be 1-63 characters long and match the regular expression `[a-z0-9]([-a-z0-9]*[a-z0-9])?`. */
  name?: string;
  /** Optional. The state of the policy. */
  state?: "STATE_UNSPECIFIED" | "READY" | "DELETING" | (string & {});
  /** Output only. The time when the resource was updated. */
  updateTime?: string;
  /** Output only. The time when the resource was created. */
  createTime?: string;
  /** Optional. Resource labels to represent user provided metadata. Each label is a key-value pair, where both the key and the value are arbitrary strings provided by the user. */
  labels?: Record<string, string>;
}

export const MaintenancePolicy: Schema.Schema<MaintenancePolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      updatePolicy: Schema.optional(UpdatePolicy),
      name: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "MaintenancePolicy",
  }) as any as Schema.Schema<MaintenancePolicy>;

export interface GoogleCloudMemcacheV1beta2OperationMetadata {
  /** Output only. Time when the operation was created. */
  createTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  cancelRequested?: boolean;
  /** Output only. Human-readable status of the operation, if any. */
  statusDetail?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Time when the operation finished running. */
  endTime?: string;
}

export const GoogleCloudMemcacheV1beta2OperationMetadata: Schema.Schema<GoogleCloudMemcacheV1beta2OperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      cancelRequested: Schema.optional(Schema.Boolean),
      statusDetail: Schema.optional(Schema.String),
      apiVersion: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudMemcacheV1beta2OperationMetadata",
  }) as any as Schema.Schema<GoogleCloudMemcacheV1beta2OperationMetadata>;

export interface SetTagsRequest {
  /** Required. These bindings will override any bindings previously set and will be effective immediately. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" */
  tags?: Record<string, string>;
  /** Required. The full resource name of the service resource. */
  name?: string;
  /** Optional. A unique identifier for this request. Must be a valid UUID. This request is only idempotent if a `request_id` is provided. */
  requestId?: string;
  /** Optional. A checksum based on the current bindings which can be passed to prevent race conditions. If not passed, etag check would be skipped. */
  etag?: string;
}

export const SetTagsRequest: Schema.Schema<SetTagsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      name: Schema.optional(Schema.String),
      requestId: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SetTagsRequest",
  }) as any as Schema.Schema<SetTagsRequest>;

export interface Node {
  /** User defined parameters currently applied to the node. */
  parameters?: MemcacheParameters;
  /** Output only. Major version of memcached server running on this node, e.g. MEMCACHE_1_5 */
  memcacheVersion?:
    | "MEMCACHE_VERSION_UNSPECIFIED"
    | "MEMCACHE_1_5"
    | "MEMCACHE_1_6_15"
    | (string & {});
  /** Output only. Location (GCP Zone) for the Memcached node. */
  zone?: string;
  /** Output only. Identifier of the Memcached node. The node id does not include project or location like the Memcached instance name. */
  nodeId?: string;
  /** Output only. Current state of the Memcached node. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "READY"
    | "DELETING"
    | "UPDATING"
    | (string & {});
  /** Output only. Returns true if there is an update waiting to be applied */
  updateAvailable?: boolean;
  /** Output only. The port number of the Memcached server on this node. */
  port?: number;
  /** Output only. The full version of memcached server running on this node. e.g. - memcached-1.5.16 */
  memcacheFullVersion?: string;
  /** Output only. Hostname or IP address of the Memcached node used by the clients to connect to the Memcached server on this node. */
  host?: string;
}

export const Node: Schema.Schema<Node> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parameters: Schema.optional(MemcacheParameters),
      memcacheVersion: Schema.optional(Schema.String),
      zone: Schema.optional(Schema.String),
      nodeId: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      updateAvailable: Schema.optional(Schema.Boolean),
      port: Schema.optional(Schema.Number),
      memcacheFullVersion: Schema.optional(Schema.String),
      host: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Node" }) as any as Schema.Schema<Node>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface WeeklyMaintenanceWindow {
  /** Required. Start time of the window in UTC. */
  startTime?: TimeOfDay;
  /** Required. Duration of the time window. */
  duration?: string;
  /** Required. Allows to define schedule that runs specified day of the week. */
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
}

export const WeeklyMaintenanceWindow: Schema.Schema<WeeklyMaintenanceWindow> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(TimeOfDay),
      duration: Schema.optional(Schema.String),
      day: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WeeklyMaintenanceWindow",
  }) as any as Schema.Schema<WeeklyMaintenanceWindow>;

export interface GoogleCloudMemcacheV1beta2MaintenancePolicy {
  /** Description of what this policy is for. Create/Update methods return INVALID_ARGUMENT if the length is greater than 512. */
  description?: string;
  /** Output only. The time when the policy was created. */
  createTime?: string;
  /** Output only. The time when the policy was updated. */
  updateTime?: string;
  /** Required. Maintenance window that is applied to resources covered by this policy. Minimum 1. For the current version, the maximum number of weekly_maintenance_windows is expected to be one. */
  weeklyMaintenanceWindow?: Array<WeeklyMaintenanceWindow>;
}

export const GoogleCloudMemcacheV1beta2MaintenancePolicy: Schema.Schema<GoogleCloudMemcacheV1beta2MaintenancePolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      weeklyMaintenanceWindow: Schema.optional(
        Schema.Array(WeeklyMaintenanceWindow),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudMemcacheV1beta2MaintenancePolicy",
  }) as any as Schema.Schema<GoogleCloudMemcacheV1beta2MaintenancePolicy>;

export interface Instance {
  /** Zones in which Memcached nodes should be provisioned. Memcached nodes will be equally distributed across these zones. If not provided, the service will by default create nodes in all zones in the region for the instance. */
  zones?: Array<string>;
  /** Output only. The state of this Memcached instance. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "READY"
    | "UPDATING"
    | "DELETING"
    | "PERFORMING_MAINTENANCE"
    | "MEMCACHE_VERSION_UPGRADING"
    | (string & {});
  /** Output only. Published maintenance schedule. */
  maintenanceSchedule?: MaintenanceSchedule;
  /** User defined parameters to apply to the memcached process on each node. */
  parameters?: MemcacheParameters;
  /** Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources */
  labels?: Record<string, string>;
  /** User provided name for the instance, which is only used for display purposes. Cannot be more than 80 characters. */
  displayName?: string;
  /** Optional. Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. The effective maintenance version of the instance. */
  effectiveMaintenanceVersion?: string;
  /** Optional. Contains the id of allocated IP address ranges associated with the private service access connection for example, "test-default" associated with IP range 10.0.0.0/29. */
  reservedIpRangeId?: Array<string>;
  /** The full name of the Google Compute Engine [network](https://cloud.google.com/vpc/docs/vpc) to which the instance is connected. If left unspecified, the `default` network will be used. */
  authorizedNetwork?: string;
  /** The maintenance policy for the instance. If not provided, the maintenance event will be performed based on Memorystore internal rollout schedule. */
  maintenancePolicy?: GoogleCloudMemcacheV1beta2MaintenancePolicy;
  /** List of messages that describe the current state of the Memcached instance. */
  instanceMessages?: Array<InstanceMessage>;
  /** Required. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` Note: Memcached instances are managed and addressed at the regional level so `location_id` here refers to a Google Cloud region; however, users may choose which zones Memcached nodes should be provisioned in within an instance. Refer to zones field for more details. */
  name?: string;
  /** Output only. The time the instance was updated. */
  updateTime?: string;
  /** The major version of Memcached software. If not provided, latest supported version will be used. Currently the latest supported major version is `MEMCACHE_1_5`. The minor version will be automatically determined by our system based on the latest supported minor version. */
  memcacheVersion?:
    | "MEMCACHE_VERSION_UNSPECIFIED"
    | "MEMCACHE_1_5"
    | "MEMCACHE_1_6_15"
    | (string & {});
  /** Output only. The available maintenance versions that can be applied to the instance. */
  availableMaintenanceVersions?: Array<string>;
  /** Required. Number of nodes in the Memcached instance. */
  nodeCount?: number;
  /** Optional. Last self service update maintenance version triggered by the customer. If it is empty, it means that the maintenance version is not set by the user. */
  maintenanceVersion?: string;
  /** Output only. Returns true if there is an update waiting to be applied */
  updateAvailable?: boolean;
  /** Output only. Endpoint for the Discovery API. */
  discoveryEndpoint?: string;
  /** Required. Configuration for Memcached nodes. */
  nodeConfig?: NodeConfig;
  /** Output only. List of Memcached nodes. Refer to Node message for more details. */
  memcacheNodes?: Array<Node>;
  /** Output only. The full version of memcached server running on this instance. System automatically determines the full memcached version for an instance based on the input MemcacheVersion. The full version format will be "memcached-1.5.16". */
  memcacheFullVersion?: string;
  /** Output only. The time the instance was created. */
  createTime?: string;
  /** Optional. Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
}

export const Instance: Schema.Schema<Instance> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      zones: Schema.optional(Schema.Array(Schema.String)),
      state: Schema.optional(Schema.String),
      maintenanceSchedule: Schema.optional(MaintenanceSchedule),
      parameters: Schema.optional(MemcacheParameters),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      displayName: Schema.optional(Schema.String),
      satisfiesPzs: Schema.optional(Schema.Boolean),
      effectiveMaintenanceVersion: Schema.optional(Schema.String),
      reservedIpRangeId: Schema.optional(Schema.Array(Schema.String)),
      authorizedNetwork: Schema.optional(Schema.String),
      maintenancePolicy: Schema.optional(
        GoogleCloudMemcacheV1beta2MaintenancePolicy,
      ),
      instanceMessages: Schema.optional(Schema.Array(InstanceMessage)),
      name: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      memcacheVersion: Schema.optional(Schema.String),
      availableMaintenanceVersions: Schema.optional(
        Schema.Array(Schema.String),
      ),
      nodeCount: Schema.optional(Schema.Number),
      maintenanceVersion: Schema.optional(Schema.String),
      updateAvailable: Schema.optional(Schema.Boolean),
      discoveryEndpoint: Schema.optional(Schema.String),
      nodeConfig: Schema.optional(NodeConfig),
      memcacheNodes: Schema.optional(Schema.Array(Node)),
      memcacheFullVersion: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      satisfiesPzi: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "Instance" }) as any as Schema.Schema<Instance>;

export interface ListInstancesResponse {
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** A list of Memcached instances in the project in the specified location, or across all locations. If the `location_id` in the parent field of the request is "-", all regions available to the project are queried, and the results aggregated. */
  resources?: Array<Instance>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListInstancesResponse: Schema.Schema<ListInstancesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      resources: Schema.optional(Schema.Array(Instance)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListInstancesResponse",
  }) as any as Schema.Schema<ListInstancesResponse>;

export interface ApplyParametersRequest {
  /** Nodes to which the instance-level parameter group is applied. */
  nodeIds?: Array<string>;
  /** Whether to apply instance-level parameter group to all nodes. If set to true, users are restricted from specifying individual nodes, and `ApplyParameters` updates all nodes within the instance. */
  applyAll?: boolean;
}

export const ApplyParametersRequest: Schema.Schema<ApplyParametersRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nodeIds: Schema.optional(Schema.Array(Schema.String)),
      applyAll: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ApplyParametersRequest",
  }) as any as Schema.Schema<ApplyParametersRequest>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility {
  /** User-defined reason for the current value of instance eligibility. Usually, this can be directly mapped to the internal state. An empty reason is allowed. */
  reason?: string;
  /** Whether an instance is eligible or ineligible. */
  eligible?: boolean;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reason: Schema.optional(Schema.String),
      eligible: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility {
  /** An entry in the eligibilities map specifies an eligibility for a particular SLI for the given instance. The SLI key in the name must be a valid SLI name specified in the Eligibility Exporter binary flags otherwise an error will be emitted by Eligibility Exporter and the oncaller will be alerted. If an SLI has been defined in the binary flags but the eligibilities map does not contain it, the corresponding SLI time series will not be emitted by the Eligibility Exporter. This ensures a smooth rollout and compatibility between the data produced by different versions of the Eligibility Exporters. If eligibilities map contains a key for an SLI which has not been declared in the binary flags, there will be an error message emitted in the Eligibility Exporter log and the metric for the SLI in question will not be emitted. */
  eligibilities?: Record<
    string,
    GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility
  >;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      eligibilities: Schema.optional(
        Schema.Record(
          Schema.String,
          GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata {
  /** The id of the node. This should be equal to SaasInstanceNode.node_id. */
  nodeId?: string;
  /** The location of the node, if different from instance location. */
  location?: string;
  /** If present, this will override eligibility for the node coming from instance or exclusions for specified SLIs. */
  perSliEligibility?: GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nodeId: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
      perSliEligibility: Schema.optional(
        GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata {
  /** Name of the SLO tier the Instance belongs to. This name will be expected to match the tiers specified in the service SLO configuration. Field is mandatory and must not be empty. */
  tier?: string;
  /** Optional. Multiple per-instance SLI eligibilities which apply for individual SLIs. */
  perSliEligibility?: GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility;
  /** Optional. List of nodes. Some producers need to use per-node metadata to calculate SLO. This field allows such producers to publish per-node SLO meta data, which will be consumed by SSA Eligibility Exporter and published in the form of per node metric to Monarch. */
  nodes?: Array<GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata>;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tier: Schema.optional(Schema.String),
      perSliEligibility: Schema.optional(
        GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility,
      ),
      nodes: Schema.optional(
        Schema.Array(
          GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata>;

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

export const Operation: Schema.Schema<Operation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      done: Schema.optional(Schema.Boolean),
      error: Schema.optional(Status),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
      operations: Schema.optional(Schema.Array(Operation)),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface LocationMetadata {
  /** Output only. The set of available zones in the location. The map is keyed by the lowercase ID of each zone, as defined by GCE. These keys can be specified in the `zones` field when creating a Memcached instance. */
  availableZones?: Record<string, ZoneMetadata>;
}

export const LocationMetadata: Schema.Schema<LocationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      availableZones: Schema.optional(
        Schema.Record(Schema.String, ZoneMetadata),
      ),
    }),
  ).annotate({
    identifier: "LocationMetadata",
  }) as any as Schema.Schema<LocationMetadata>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource {
  /** Type of the resource. This can be either a GCP resource or a custom one (e.g. another cloud provider's VM). For GCP compute resources use singular form of the names listed in GCP compute API documentation (https://cloud.google.com/compute/docs/reference/rest/v1/), prefixed with 'compute-', for example: 'compute-instance', 'compute-disk', 'compute-autoscaler'. */
  resourceType?: string;
  /** URL identifying the resource, e.g. "https://www.googleapis.com/compute/v1/projects/...)". */
  resourceUrl?: string;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceType: Schema.optional(Schema.String),
      resourceUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings {
  /** Optional. The MaintenancePolicies that have been attached to the instance. The key must be of the type name of the oneof policy name defined in MaintenancePolicy, and the embedded policy must define the same policy type. For details, please refer to go/mr-user-guide. Should not be set if maintenance_policy_names is set. If only the name is needed, then only populate MaintenancePolicy.name. */
  maintenancePolicies?: Record<string, MaintenancePolicy>;
  /** Optional. Exclude instance from maintenance. When true, rollout service will not attempt maintenance on the instance. Rollout service will include the instance in reported rollout progress as not attempted. */
  exclude?: boolean;
  /** Optional. If the update call is triggered from rollback, set the value as true. */
  isRollback?: boolean;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maintenancePolicies: Schema.optional(
        Schema.Record(Schema.String, MaintenancePolicy),
      ),
      exclude: Schema.optional(Schema.Boolean),
      isRollback: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1Instance {
  /** Optional. Resource labels to represent user provided metadata. Each label is a key-value pair, where both the key and the value are arbitrary strings provided by the user. */
  labels?: Record<string, string>;
  /** Link to the SLM instance template. Only populated when updating SLM instances via SSA's Actuation service adaptor. Service producers with custom control plane (e.g. Cloud SQL) doesn't need to populate this field. Instead they should use software_versions. */
  slmInstanceTemplate?: string;
  /** Optional. notification_parameter are information that service producers may like to include that is not relevant to Rollout. This parameter will only be passed to Gamma and Cloud Logging for notification/logging purpose. */
  notificationParameters?: Record<
    string,
    GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter
  >;
  /** Output only. Timestamp when the resource was last modified. */
  updateTime?: string;
  /** Output only. ID of the associated GCP tenant project. See go/get-instance-metadata. */
  tenantProjectId?: string;
  /** Optional. The consumer_project_number associated with this Apigee instance. This field is added specifically to support Apigee integration with SLM Rollout and UMM. It represents the numerical project ID of the GCP project that consumes this Apigee instance. It is used for SLM rollout notifications and UMM integration, enabling proper mapping to customer projects and log delivery for Apigee instances. This field complements consumer_project_id and may be used for specific Apigee scenarios where the numerical ID is required. */
  consumerProjectNumber?: string;
  /** Unique name of the resource. It uses the form: `projects/{project_number}/locations/{location_id}/instances/{instance_id}` Note: This name is passed, stored and logged across the rollout system. So use of consumer project_id or any other consumer PII in the name is strongly discouraged for wipeout (go/wipeout) compliance. See go/elysium/project_ids#storage-guidance for more details. */
  name?: string;
  /** Output only. Current lifecycle state of the resource (e.g. if it's being created or ready to use). */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "READY"
    | "UPDATING"
    | "REPAIRING"
    | "DELETING"
    | "ERROR"
    | (string & {});
  /** Optional. The MaintenancePolicies that have been attached to the instance. The key must be of the type name of the oneof policy name defined in MaintenancePolicy, and the referenced policy must define the same policy type. For details, please refer to go/mr-user-guide. Should not be set if maintenance_settings.maintenance_policies is set. */
  maintenancePolicyNames?: Record<string, string>;
  /** consumer_defined_name is the name of the instance set by the service consumers. Generally this is different from the `name` field which reperesents the system-assigned id of the instance which the service consumers do not recognize. This is a required field for tenants onboarding to Maintenance Window notifications (go/slm-rollout-maintenance-policies#prerequisites). */
  consumerDefinedName?: string;
  /** Output only. The list of data plane resources provisioned for this instance, e.g. compute VMs. See go/get-instance-metadata. */
  provisionedResources?: Array<GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource>;
  /** The MaintenanceSchedule contains the scheduling information of published maintenance schedule with same key as software_versions. */
  maintenanceSchedules?: Record<
    string,
    GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule
  >;
  /** Optional. The MaintenanceSettings associated with instance. */
  maintenanceSettings?: GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings;
  /** Software versions that are used to deploy this instance. This can be mutated by rollout services. */
  softwareVersions?: Record<string, string>;
  /** Optional. The instance_type of this instance of format: projects/{project_number}/locations/{location_id}/instanceTypes/{instance_type_id}. Instance Type represents a high-level tier or SKU of the service that this instance belong to. When enabled(eg: Maintenance Rollout), Rollout uses 'instance_type' along with 'software_versions' to determine whether instance needs an update or not. */
  instanceType?: string;
  /** Output only. Timestamp when the resource was created. */
  createTime?: string;
  /** Output only. SLO metadata for instance classification in the Standardized dataplane SLO platform. See go/cloud-ssa-standard-slo for feature description. */
  sloMetadata?: GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata;
  /** Output only. Custom string attributes used primarily to expose producer-specific information in monitoring dashboards. See go/get-instance-metadata. */
  producerMetadata?: Record<string, string>;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1Instance: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1Instance> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      slmInstanceTemplate: Schema.optional(Schema.String),
      notificationParameters: Schema.optional(
        Schema.Record(
          Schema.String,
          GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter,
        ),
      ),
      updateTime: Schema.optional(Schema.String),
      tenantProjectId: Schema.optional(Schema.String),
      consumerProjectNumber: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      maintenancePolicyNames: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      consumerDefinedName: Schema.optional(Schema.String),
      provisionedResources: Schema.optional(
        Schema.Array(
          GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource,
        ),
      ),
      maintenanceSchedules: Schema.optional(
        Schema.Record(
          Schema.String,
          GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule,
        ),
      ),
      maintenanceSettings: Schema.optional(
        GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings,
      ),
      softwareVersions: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      instanceType: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      sloMetadata: Schema.optional(
        GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata,
      ),
      producerMetadata: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudSaasacceleratorManagementProvidersV1Instance",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1Instance>;

export interface OperationMetadata {
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Time when the operation finished running. */
  endTime?: string;
  /** Output only. Time when the operation was created. */
  createTime?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusDetail?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  cancelRequested?: boolean;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      verb: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      statusDetail: Schema.optional(Schema.String),
      apiVersion: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      cancelRequested: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "OperationMetadata",
  }) as any as Schema.Schema<OperationMetadata>;

export interface GoogleCloudMemcacheV1beta2ZoneMetadata {}

export const GoogleCloudMemcacheV1beta2ZoneMetadata: Schema.Schema<GoogleCloudMemcacheV1beta2ZoneMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudMemcacheV1beta2ZoneMetadata",
  }) as any as Schema.Schema<GoogleCloudMemcacheV1beta2ZoneMetadata>;

export interface GoogleCloudMemcacheV1beta2LocationMetadata {
  /** Output only. The set of available zones in the location. The map is keyed by the lowercase ID of each zone, as defined by GCE. These keys can be specified in the `zones` field when creating a Memcached instance. */
  availableZones?: Record<string, GoogleCloudMemcacheV1beta2ZoneMetadata>;
}

export const GoogleCloudMemcacheV1beta2LocationMetadata: Schema.Schema<GoogleCloudMemcacheV1beta2LocationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      availableZones: Schema.optional(
        Schema.Record(Schema.String, GoogleCloudMemcacheV1beta2ZoneMetadata),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudMemcacheV1beta2LocationMetadata",
  }) as any as Schema.Schema<GoogleCloudMemcacheV1beta2LocationMetadata>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(Location)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListLocationsResponse",
  }) as any as Schema.Schema<ListLocationsResponse>;

export interface GoogleCloudMemcacheV1beta2UpgradeInstanceRequest {
  /** Required. Specifies the target version of memcached engine to upgrade to. */
  memcacheVersion?:
    | "MEMCACHE_VERSION_UNSPECIFIED"
    | "MEMCACHE_1_5"
    | "MEMCACHE_1_6_15"
    | (string & {});
}

export const GoogleCloudMemcacheV1beta2UpgradeInstanceRequest: Schema.Schema<GoogleCloudMemcacheV1beta2UpgradeInstanceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      memcacheVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudMemcacheV1beta2UpgradeInstanceRequest",
  }) as any as Schema.Schema<GoogleCloudMemcacheV1beta2UpgradeInstanceRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListProjectsLocationsRequest {
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** The resource that owns the locations collection, if applicable. */
  name: string;
}

export const ListProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("extraLocationTypes"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<
  ListProjectsLocationsRequest,
  ListProjectsLocationsResponse,
  ListProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Location;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<
  GetProjectsLocationsRequest,
  GetProjectsLocationsResponse,
  GetProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsInstancesRequest {
  /** Required. Memcached instance resource name in the format: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region */
  name: string;
}

export const GetProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsInstancesRequest>;

export type GetProjectsLocationsInstancesResponse = Instance;
export const GetProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Instance;

export type GetProjectsLocationsInstancesError = DefaultErrors;

/** Gets details of a single Instance. */
export const getProjectsLocationsInstances: API.OperationMethod<
  GetProjectsLocationsInstancesRequest,
  GetProjectsLocationsInstancesResponse,
  GetProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsInstancesRequest,
  output: GetProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface UpdateParametersProjectsLocationsInstancesRequest {
  /** Required. Resource name of the Memcached instance for which the parameters should be updated. */
  name: string;
  /** Request body */
  body?: UpdateParametersRequest;
}

export const UpdateParametersProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(UpdateParametersRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:updateParameters",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateParametersProjectsLocationsInstancesRequest>;

export type UpdateParametersProjectsLocationsInstancesResponse = Operation;
export const UpdateParametersProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type UpdateParametersProjectsLocationsInstancesError = DefaultErrors;

/** Updates the defined Memcached parameters for an existing instance. This method only stages the parameters, it must be followed by `ApplyParameters` to apply the parameters to nodes of the Memcached instance. */
export const updateParametersProjectsLocationsInstances: API.OperationMethod<
  UpdateParametersProjectsLocationsInstancesRequest,
  UpdateParametersProjectsLocationsInstancesResponse,
  UpdateParametersProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateParametersProjectsLocationsInstancesRequest,
  output: UpdateParametersProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface ListProjectsLocationsInstancesRequest {
  /** The maximum number of items to return. If not specified, a default value of 1000 will be used by the service. Regardless of the `page_size` value, the response may include a partial list and a caller should only rely on response's `next_page_token` to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Required. The resource name of the instance location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a GCP region */
  parent: string;
  /** List filter. For example, exclude all Memcached instances with name as my-instance by specifying `"name != my-instance"`. */
  filter?: string;
  /** The `next_page_token` value returned from a previous List request, if any. */
  pageToken?: string;
  /** Sort results. Supported values are "name", "name desc" or "" (unsorted). */
  orderBy?: string;
}

export const ListProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/instances",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsInstancesRequest>;

export type ListProjectsLocationsInstancesResponse = ListInstancesResponse;
export const ListProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListInstancesResponse;

export type ListProjectsLocationsInstancesError = DefaultErrors;

/** Lists Instances in a given location. */
export const listProjectsLocationsInstances: API.PaginatedOperationMethod<
  ListProjectsLocationsInstancesRequest,
  ListProjectsLocationsInstancesResponse,
  ListProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsInstancesRequest,
  output: ListProjectsLocationsInstancesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsInstancesRequest {
  /** Required. The resource name of the instance location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a GCP region */
  parent: string;
  /** Required. The logical name of the Memcached instance in the user project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-40 characters. * Must end with a number or a letter. * Must be unique within the user project / location. If any of the above are not met, the API raises an invalid argument error. */
  instanceId?: string;
  /** Request body */
  body?: Instance;
}

export const CreateProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    instanceId: Schema.optional(Schema.String).pipe(T.HttpQuery("instanceId")),
    body: Schema.optional(Instance).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/instances",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsInstancesRequest>;

export type CreateProjectsLocationsInstancesResponse = Operation;
export const CreateProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsInstancesError = DefaultErrors;

/** Creates a new Instance in a given location. */
export const createProjectsLocationsInstances: API.OperationMethod<
  CreateProjectsLocationsInstancesRequest,
  CreateProjectsLocationsInstancesResponse,
  CreateProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsInstancesRequest,
  output: CreateProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface RescheduleMaintenanceProjectsLocationsInstancesRequest {
  /** Required. Memcache instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region. */
  instance: string;
  /** Request body */
  body?: RescheduleMaintenanceRequest;
}

export const RescheduleMaintenanceProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    instance: Schema.String.pipe(T.HttpPath("instance")),
    body: Schema.optional(RescheduleMaintenanceRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:rescheduleMaintenance",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RescheduleMaintenanceProjectsLocationsInstancesRequest>;

export type RescheduleMaintenanceProjectsLocationsInstancesResponse = Operation;
export const RescheduleMaintenanceProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type RescheduleMaintenanceProjectsLocationsInstancesError =
  DefaultErrors;

/** Performs the apply phase of the RescheduleMaintenance verb. */
export const rescheduleMaintenanceProjectsLocationsInstances: API.OperationMethod<
  RescheduleMaintenanceProjectsLocationsInstancesRequest,
  RescheduleMaintenanceProjectsLocationsInstancesResponse,
  RescheduleMaintenanceProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RescheduleMaintenanceProjectsLocationsInstancesRequest,
  output: RescheduleMaintenanceProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsInstancesRequest {
  /** Required. Memcached instance resource name in the format: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region */
  name: string;
}

export const DeleteProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsInstancesRequest>;

export type DeleteProjectsLocationsInstancesResponse = Operation;
export const DeleteProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsInstancesError = DefaultErrors;

/** Deletes a single Instance. */
export const deleteProjectsLocationsInstances: API.OperationMethod<
  DeleteProjectsLocationsInstancesRequest,
  DeleteProjectsLocationsInstancesResponse,
  DeleteProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsInstancesRequest,
  output: DeleteProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface ApplySoftwareUpdateProjectsLocationsInstancesRequest {
  /** Required. Resource name of the Memcached instance for which software update should be applied. */
  instance: string;
  /** Request body */
  body?: ApplySoftwareUpdateRequest;
}

export const ApplySoftwareUpdateProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    instance: Schema.String.pipe(T.HttpPath("instance")),
    body: Schema.optional(ApplySoftwareUpdateRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:applySoftwareUpdate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ApplySoftwareUpdateProjectsLocationsInstancesRequest>;

export type ApplySoftwareUpdateProjectsLocationsInstancesResponse = Operation;
export const ApplySoftwareUpdateProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type ApplySoftwareUpdateProjectsLocationsInstancesError = DefaultErrors;

/** Updates software on the selected nodes of the Instance. */
export const applySoftwareUpdateProjectsLocationsInstances: API.OperationMethod<
  ApplySoftwareUpdateProjectsLocationsInstancesRequest,
  ApplySoftwareUpdateProjectsLocationsInstancesResponse,
  ApplySoftwareUpdateProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ApplySoftwareUpdateProjectsLocationsInstancesRequest,
  output: ApplySoftwareUpdateProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsInstancesRequest {
  /** Required. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` Note: Memcached instances are managed and addressed at the regional level so `location_id` here refers to a Google Cloud region; however, users may choose which zones Memcached nodes should be provisioned in within an instance. Refer to zones field for more details. */
  name: string;
  /** Required. Mask of fields to update. * `displayName` */
  updateMask?: string;
  /** Request body */
  body?: Instance;
}

export const PatchProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Instance).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsInstancesRequest>;

export type PatchProjectsLocationsInstancesResponse = Operation;
export const PatchProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsInstancesError = DefaultErrors;

/** Updates an existing Instance in a given project and location. */
export const patchProjectsLocationsInstances: API.OperationMethod<
  PatchProjectsLocationsInstancesRequest,
  PatchProjectsLocationsInstancesResponse,
  PatchProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsInstancesRequest,
  output: PatchProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface UpgradeProjectsLocationsInstancesRequest {
  /** Required. Memcache instance resource name using the form: `projects/{project}/locations/{location}/instances/{instance}` where `location_id` refers to a GCP region. */
  name: string;
  /** Request body */
  body?: GoogleCloudMemcacheV1beta2UpgradeInstanceRequest;
}

export const UpgradeProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      GoogleCloudMemcacheV1beta2UpgradeInstanceRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:upgrade",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpgradeProjectsLocationsInstancesRequest>;

export type UpgradeProjectsLocationsInstancesResponse = Operation;
export const UpgradeProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type UpgradeProjectsLocationsInstancesError = DefaultErrors;

/** Upgrades the Memcache instance to a newer memcached engine version specified in the request. */
export const upgradeProjectsLocationsInstances: API.OperationMethod<
  UpgradeProjectsLocationsInstancesRequest,
  UpgradeProjectsLocationsInstancesResponse,
  UpgradeProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpgradeProjectsLocationsInstancesRequest,
  output: UpgradeProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface ApplyParametersProjectsLocationsInstancesRequest {
  /** Required. Resource name of the Memcached instance for which parameter group updates should be applied. */
  name: string;
  /** Request body */
  body?: ApplyParametersRequest;
}

export const ApplyParametersProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ApplyParametersRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:applyParameters",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ApplyParametersProjectsLocationsInstancesRequest>;

export type ApplyParametersProjectsLocationsInstancesResponse = Operation;
export const ApplyParametersProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type ApplyParametersProjectsLocationsInstancesError = DefaultErrors;

/** `ApplyParameters` restarts the set of specified nodes in order to update them to the current set of parameters for the Memcached Instance. */
export const applyParametersProjectsLocationsInstances: API.OperationMethod<
  ApplyParametersProjectsLocationsInstancesRequest,
  ApplyParametersProjectsLocationsInstancesResponse,
  ApplyParametersProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ApplyParametersProjectsLocationsInstancesRequest,
  output: ApplyParametersProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list filter. */
  filter?: string;
}

export const ListProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListOperationsResponse;

export type ListProjectsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsOperationsRequest,
  ListProjectsLocationsOperationsResponse,
  ListProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<
  DeleteProjectsLocationsOperationsRequest,
  DeleteProjectsLocationsOperationsResponse,
  DeleteProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<
  GetProjectsLocationsOperationsRequest,
  GetProjectsLocationsOperationsResponse,
  GetProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CancelProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type CancelProjectsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<
  CancelProjectsLocationsOperationsRequest,
  CancelProjectsLocationsOperationsResponse,
  CancelProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));
