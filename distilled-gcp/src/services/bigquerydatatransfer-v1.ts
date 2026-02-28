// ==========================================================================
// BigQuery Data Transfer API (bigquerydatatransfer v1)
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
  name: "bigquerydatatransfer",
  version: "v1",
  rootUrl: "https://bigquerydatatransfer.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface UserInfo {
  /** E-mail address of the user. */
  email?: string;
}

export const UserInfo: Schema.Schema<UserInfo> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "UserInfo" }) as any as Schema.Schema<UserInfo>;

export interface DataSourceParameter {
  /** If true, it should not be used in new transfers, and it should not be visible to users. */
  deprecated?: boolean;
  /** Parameter type. */
  type?: "TYPE_UNSPECIFIED" | "STRING" | "INTEGER" | "DOUBLE" | "BOOLEAN" | "RECORD" | "PLUS_PAGE" | "LIST" | (string & {});
  /** For integer and double values specifies maximum allowed value. */
  maxValue?: number;
  /** Cannot be changed after initial creation. */
  immutable?: boolean;
  /** Deprecated. This field has no effect. */
  recurse?: boolean;
  /** Deprecated. This field has no effect. */
  repeated?: boolean;
  /** URL to a help document to further explain the naming requirements. */
  validationHelpUrl?: string;
  /** Regular expression which can be used for parameter validation. */
  validationRegex?: string;
  /** Is parameter required. */
  required?: boolean;
  /** Parameter description. */
  description?: string;
  /** Parameter identifier. */
  paramId?: string;
  /** Description of the requirements for this field, in case the user input does not fulfill the regex pattern or min/max values. */
  validationDescription?: string;
  /** Parameter display name in the user interface. */
  displayName?: string;
  /** For list parameters, the max size of the list. */
  maxListSize?: string;
  /** Deprecated. This field has no effect. */
  fields?: Array<DataSourceParameter>;
  /** All possible values for the parameter. */
  allowedValues?: Array<string>;
  /** For integer and double values specifies minimum allowed value. */
  minValue?: number;
}

export const DataSourceParameter: Schema.Schema<DataSourceParameter> = Schema.suspend(() => Schema.Struct({
  deprecated: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
  maxValue: Schema.optional(Schema.Number),
  immutable: Schema.optional(Schema.Boolean),
  recurse: Schema.optional(Schema.Boolean),
  repeated: Schema.optional(Schema.Boolean),
  validationHelpUrl: Schema.optional(Schema.String),
  validationRegex: Schema.optional(Schema.String),
  required: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
  paramId: Schema.optional(Schema.String),
  validationDescription: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  maxListSize: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Array(DataSourceParameter)),
  allowedValues: Schema.optional(Schema.Array(Schema.String)),
  minValue: Schema.optional(Schema.Number),
})).annotate({ identifier: "DataSourceParameter" }) as any as Schema.Schema<DataSourceParameter>;

export interface DataSource {
  /** Output only. Data source resource name. */
  name?: string;
  /** The minimum interval for scheduler to schedule runs. */
  minimumScheduleInterval?: string;
  /** User friendly data source description string. */
  description?: string;
  /** Data source id. */
  dataSourceId?: string;
  /** Data source client id which should be used to receive refresh token. */
  clientId?: string;
  /** Specifies whether the data source supports automatic data refresh for the past few days, and how it's supported. For some data sources, data might not be complete until a few days later, so it's useful to refresh data automatically. */
  dataRefreshType?: "DATA_REFRESH_TYPE_UNSPECIFIED" | "SLIDING_WINDOW" | "CUSTOM_SLIDING_WINDOW" | (string & {});
  /** Default data transfer schedule. Examples of valid schedules include: `1st,3rd monday of month 15:30`, `every wed,fri of jan,jun 13:15`, and `first sunday of quarter 00:00`. */
  defaultSchedule?: string;
  /** Deprecated. This field has no effect. */
  supportsMultipleTransfers?: boolean;
  /** Disables backfilling and manual run scheduling for the data source. */
  manualRunsDisabled?: boolean;
  /** Url for the help document for this data source. */
  helpUrl?: string;
  /** The number of seconds to wait for an update from the data source before the Data Transfer Service marks the transfer as FAILED. */
  updateDeadlineSeconds?: number;
  /** Specifies whether the data source supports a user defined schedule, or operates on the default schedule. When set to `true`, user can override default schedule. */
  supportsCustomSchedule?: boolean;
  /** User friendly data source name. */
  displayName?: string;
  /** Data source parameters. */
  parameters?: Array<DataSourceParameter>;
  /** Default data refresh window on days. Only meaningful when `data_refresh_type` = `SLIDING_WINDOW`. */
  defaultDataRefreshWindowDays?: number;
  /** Indicates the type of authorization. */
  authorizationType?: "AUTHORIZATION_TYPE_UNSPECIFIED" | "AUTHORIZATION_CODE" | "GOOGLE_PLUS_AUTHORIZATION_CODE" | "FIRST_PARTY_OAUTH" | (string & {});
  /** Api auth scopes for which refresh token needs to be obtained. These are scopes needed by a data source to prepare data and ingest them into BigQuery, e.g., https://www.googleapis.com/auth/bigquery */
  scopes?: Array<string>;
  /** Deprecated. This field has no effect. */
  transferType?: "TRANSFER_TYPE_UNSPECIFIED" | "BATCH" | "STREAMING" | (string & {});
}

export const DataSource: Schema.Schema<DataSource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  minimumScheduleInterval: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  dataSourceId: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  dataRefreshType: Schema.optional(Schema.String),
  defaultSchedule: Schema.optional(Schema.String),
  supportsMultipleTransfers: Schema.optional(Schema.Boolean),
  manualRunsDisabled: Schema.optional(Schema.Boolean),
  helpUrl: Schema.optional(Schema.String),
  updateDeadlineSeconds: Schema.optional(Schema.Number),
  supportsCustomSchedule: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Array(DataSourceParameter)),
  defaultDataRefreshWindowDays: Schema.optional(Schema.Number),
  authorizationType: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
  transferType: Schema.optional(Schema.String),
})).annotate({ identifier: "DataSource" }) as any as Schema.Schema<DataSource>;

export interface TimeRange {
  /** Start time of the range of transfer runs. For example, `"2017-05-25T00:00:00+00:00"`. The start_time must be strictly less than the end_time. Creates transfer runs where run_time is in the range between start_time (inclusive) and end_time (exclusive). */
  startTime?: string;
  /** End time of the range of transfer runs. For example, `"2017-05-30T00:00:00+00:00"`. The end_time must not be in the future. Creates transfer runs where run_time is in the range between start_time (inclusive) and end_time (exclusive). */
  endTime?: string;
}

export const TimeRange: Schema.Schema<TimeRange> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeRange" }) as any as Schema.Schema<TimeRange>;

export interface StartManualTransferRunsRequest {
  /** A run_time timestamp for historical data files or reports that are scheduled to be transferred by the scheduled transfer run. requested_run_time must be a past time and cannot include future time values. */
  requestedRunTime?: string;
  /** A time_range start and end timestamp for historical data files or reports that are scheduled to be transferred by the scheduled transfer run. requested_time_range must be a past time and cannot include future time values. */
  requestedTimeRange?: TimeRange;
}

export const StartManualTransferRunsRequest: Schema.Schema<StartManualTransferRunsRequest> = Schema.suspend(() => Schema.Struct({
  requestedRunTime: Schema.optional(Schema.String),
  requestedTimeRange: Schema.optional(TimeRange),
})).annotate({ identifier: "StartManualTransferRunsRequest" }) as any as Schema.Schema<StartManualTransferRunsRequest>;

export interface TransferMessage {
  /** Time when message was logged. */
  messageTime?: string;
  /** Message text. */
  messageText?: string;
  /** Message severity. */
  severity?: "MESSAGE_SEVERITY_UNSPECIFIED" | "INFO" | "WARNING" | "ERROR" | (string & {});
}

export const TransferMessage: Schema.Schema<TransferMessage> = Schema.suspend(() => Schema.Struct({
  messageTime: Schema.optional(Schema.String),
  messageText: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
})).annotate({ identifier: "TransferMessage" }) as any as Schema.Schema<TransferMessage>;

export interface TimeBasedSchedule {
  /** Specifies time to start scheduling transfer runs. The first run will be scheduled at or after the start time according to a recurrence pattern defined in the schedule string. The start time can be changed at any moment. */
  startTime?: string;
  /** Data transfer schedule. If the data source does not support a custom schedule, this should be empty. If it is empty, the default value for the data source will be used. The specified times are in UTC. Examples of valid format: `1st,3rd monday of month 15:30`, `every wed,fri of jan,jun 13:15`, and `first sunday of quarter 00:00`. See more explanation about the format here: https://cloud.google.com/appengine/docs/flexible/python/scheduling-jobs-with-cron-yaml#the_schedule_format NOTE: The minimum interval time between recurring transfers depends on the data source; refer to the documentation for your data source. */
  schedule?: string;
  /** Defines time to stop scheduling transfer runs. A transfer run cannot be scheduled at or after the end time. The end time can be changed at any moment. */
  endTime?: string;
}

export const TimeBasedSchedule: Schema.Schema<TimeBasedSchedule> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  schedule: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeBasedSchedule" }) as any as Schema.Schema<TimeBasedSchedule>;

export interface CheckValidCredsResponse {
  /** If set to `true`, the credentials exist and are valid. */
  hasValidCreds?: boolean;
}

export const CheckValidCredsResponse: Schema.Schema<CheckValidCredsResponse> = Schema.suspend(() => Schema.Struct({
  hasValidCreds: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CheckValidCredsResponse" }) as any as Schema.Schema<CheckValidCredsResponse>;

export interface ScheduleTransferRunsRequest {
  /** Required. Start time of the range of transfer runs. For example, `"2017-05-25T00:00:00+00:00"`. */
  startTime?: string;
  /** Required. End time of the range of transfer runs. For example, `"2017-05-30T00:00:00+00:00"`. */
  endTime?: string;
}

export const ScheduleTransferRunsRequest: Schema.Schema<ScheduleTransferRunsRequest> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ScheduleTransferRunsRequest" }) as any as Schema.Schema<ScheduleTransferRunsRequest>;

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  message: Schema.optional(Schema.String),
  code: Schema.optional(Schema.Number),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface EmailPreferences {
  /** If true, email notifications will be sent on transfer run failures. */
  enableFailureEmail?: boolean;
}

export const EmailPreferences: Schema.Schema<EmailPreferences> = Schema.suspend(() => Schema.Struct({
  enableFailureEmail: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EmailPreferences" }) as any as Schema.Schema<EmailPreferences>;

export interface TransferRun {
  /** Output only. Time when transfer run ended. Parameter ignored by server for input requests. */
  endTime?: string;
  /** Output only. Describes the schedule of this transfer run if it was created as part of a regular schedule. For batch transfer runs that are scheduled manually, this is empty. NOTE: the system might choose to delay the schedule depending on the current load, so `schedule_time` doesn't always match this. */
  schedule?: string;
  /** Output only. Pub/Sub topic where a notification will be sent after this transfer run finishes. The format for specifying a pubsub topic is: `projects/{project_id}/topics/{topic_id}` */
  notificationPubsubTopic?: string;
  /** Status of the transfer run. */
  errorStatus?: Status;
  /** Output only. Time when transfer run was started. Parameter ignored by server for input requests. */
  startTime?: string;
  /** Output only. Email notifications will be sent according to these preferences to the email address of the user who owns the transfer config this run was derived from. */
  emailPreferences?: EmailPreferences;
  /** Output only. Last time the data transfer run state was updated. */
  updateTime?: string;
  /** Output only. Parameters specific to each data source. For more information see the bq tab in the 'Setting up a data transfer' section for each data source. For example the parameters for Cloud Storage transfers are listed here: https://cloud.google.com/bigquery-transfer/docs/cloud-storage-transfer#bq */
  params?: Record<string, unknown>;
  /** Output only. Data source id. */
  dataSourceId?: string;
  /** Output only. The BigQuery target dataset id. */
  destinationDatasetId?: string;
  /** For batch transfer runs, specifies the date and time of the data should be ingested. */
  runTime?: string;
  /** Deprecated. Unique ID of the user on whose behalf transfer is done. */
  userId?: string;
  /** Minimum time after which a transfer run can be started. */
  scheduleTime?: string;
  /** Identifier. The resource name of the transfer run. Transfer run names have the form `projects/{project_id}/locations/{location}/transferConfigs/{config_id}/runs/{run_id}`. The name is ignored when creating a transfer run. */
  name?: string;
  /** Data transfer run state. Ignored for input requests. */
  state?: "TRANSFER_STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | (string & {});
}

export const TransferRun: Schema.Schema<TransferRun> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  schedule: Schema.optional(Schema.String),
  notificationPubsubTopic: Schema.optional(Schema.String),
  errorStatus: Schema.optional(Status),
  startTime: Schema.optional(Schema.String),
  emailPreferences: Schema.optional(EmailPreferences),
  updateTime: Schema.optional(Schema.String),
  params: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  dataSourceId: Schema.optional(Schema.String),
  destinationDatasetId: Schema.optional(Schema.String),
  runTime: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  scheduleTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "TransferRun" }) as any as Schema.Schema<TransferRun>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CheckValidCredsRequest {
}

export const CheckValidCredsRequest: Schema.Schema<CheckValidCredsRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CheckValidCredsRequest" }) as any as Schema.Schema<CheckValidCredsRequest>;

export interface ManualSchedule {
}

export const ManualSchedule: Schema.Schema<ManualSchedule> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ManualSchedule" }) as any as Schema.Schema<ManualSchedule>;

export interface EventDrivenSchedule {
  /** Pub/Sub subscription name used to receive events. Only Google Cloud Storage data source support this option. Format: projects/{project}/subscriptions/{subscription} */
  pubsubSubscription?: string;
}

export const EventDrivenSchedule: Schema.Schema<EventDrivenSchedule> = Schema.suspend(() => Schema.Struct({
  pubsubSubscription: Schema.optional(Schema.String),
})).annotate({ identifier: "EventDrivenSchedule" }) as any as Schema.Schema<EventDrivenSchedule>;

export interface ScheduleOptionsV2 {
  /** Manual transfer schedule. If set, the transfer run will not be auto-scheduled by the system, unless the client invokes StartManualTransferRuns. This is equivalent to disable_auto_scheduling = true. */
  manualSchedule?: ManualSchedule;
  /** Event driven transfer schedule options. If set, the transfer will be scheduled upon events arrial. */
  eventDrivenSchedule?: EventDrivenSchedule;
  /** Time based transfer schedule options. This is the default schedule option. */
  timeBasedSchedule?: TimeBasedSchedule;
}

export const ScheduleOptionsV2: Schema.Schema<ScheduleOptionsV2> = Schema.suspend(() => Schema.Struct({
  manualSchedule: Schema.optional(ManualSchedule),
  eventDrivenSchedule: Schema.optional(EventDrivenSchedule),
  timeBasedSchedule: Schema.optional(TimeBasedSchedule),
})).annotate({ identifier: "ScheduleOptionsV2" }) as any as Schema.Schema<ScheduleOptionsV2>;

export interface ScheduleOptions {
  /** If true, automatic scheduling of data transfer runs for this configuration will be disabled. The runs can be started on ad-hoc basis using StartManualTransferRuns API. When automatic scheduling is disabled, the TransferConfig.schedule field will be ignored. */
  disableAutoScheduling?: boolean;
  /** Specifies time to start scheduling transfer runs. The first run will be scheduled at or after the start time according to a recurrence pattern defined in the schedule string. The start time can be changed at any moment. The time when a data transfer can be triggered manually is not limited by this option. */
  startTime?: string;
  /** Defines time to stop scheduling transfer runs. A transfer run cannot be scheduled at or after the end time. The end time can be changed at any moment. The time when a data transfer can be triggered manually is not limited by this option. */
  endTime?: string;
}

export const ScheduleOptions: Schema.Schema<ScheduleOptions> = Schema.suspend(() => Schema.Struct({
  disableAutoScheduling: Schema.optional(Schema.Boolean),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ScheduleOptions" }) as any as Schema.Schema<ScheduleOptions>;

export interface EncryptionConfiguration {
  /** The name of the KMS key used for encrypting BigQuery data. */
  kmsKeyName?: string;
}

export const EncryptionConfiguration: Schema.Schema<EncryptionConfiguration> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "EncryptionConfiguration" }) as any as Schema.Schema<EncryptionConfiguration>;

export interface TransferConfig {
  /** Options customizing different types of data transfer schedule. This field replaces "schedule" and "schedule_options" fields. ScheduleOptionsV2 cannot be used together with ScheduleOptions/Schedule. */
  scheduleOptionsV2?: ScheduleOptionsV2;
  /** Output only. Information about the user whose credentials are used to transfer data. Populated only for `transferConfigs.get` requests. In case the user information is not available, this field will not be populated. */
  ownerInfo?: UserInfo;
  /** Is this config disabled. When set to true, no runs will be scheduled for this transfer config. */
  disabled?: boolean;
  /** Options customizing the data transfer schedule. */
  scheduleOptions?: ScheduleOptions;
  /** The classification of the destination table. */
  managedTableType?: "MANAGED_TABLE_TYPE_UNSPECIFIED" | "NATIVE" | "BIGLAKE" | (string & {});
  /** Deprecated. Unique ID of the user on whose behalf transfer is done. */
  userId?: string;
  /** Output only. Region in which BigQuery dataset is located. */
  datasetRegion?: string;
  /** Output only. Error code with detailed information about reason of the latest config failure. */
  error?: Status;
  /** User specified display name for the data transfer. */
  displayName?: string;
  /** Email notifications will be sent according to these preferences to the email address of the user who owns this transfer config. */
  emailPreferences?: EmailPreferences;
  /** Parameters specific to each data source. For more information see the bq tab in the 'Setting up a data transfer' section for each data source. For example the parameters for Cloud Storage transfers are listed here: https://cloud.google.com/bigquery-transfer/docs/cloud-storage-transfer#bq */
  params?: Record<string, unknown>;
  /** The BigQuery target dataset id. */
  destinationDatasetId?: string;
  /** The number of days to look back to automatically refresh the data. For example, if `data_refresh_window_days = 10`, then every day BigQuery reingests data for [today-10, today-1], rather than ingesting data for just [today-1]. Only valid if the data source supports the feature. Set the value to 0 to use the default value. */
  dataRefreshWindowDays?: number;
  /** Pub/Sub topic where notifications will be sent after transfer runs associated with this transfer config finish. The format for specifying a pubsub topic is: `projects/{project_id}/topics/{topic_id}` */
  notificationPubsubTopic?: string;
  /** The encryption configuration part. Currently, it is only used for the optional KMS key name. The BigQuery service account of your project must be granted permissions to use the key. Read methods will return the key name applied in effect. Write methods will apply the key if it is present, or otherwise try to apply project default keys if it is absent. */
  encryptionConfiguration?: EncryptionConfiguration;
  /** Identifier. The resource name of the transfer config. Transfer config names have the form either `projects/{project_id}/locations/{region}/transferConfigs/{config_id}` or `projects/{project_id}/transferConfigs/{config_id}`, where `config_id` is usually a UUID, even though it is not guaranteed or required. The name is ignored when creating a transfer config. */
  name?: string;
  /** Output only. Data transfer modification time. Ignored by server on input. */
  updateTime?: string;
  /** Output only. Next time when data transfer will run. */
  nextRunTime?: string;
  /** Data source ID. This cannot be changed once data transfer is created. The full list of available data source IDs can be returned through an API call: https://cloud.google.com/bigquery-transfer/docs/reference/datatransfer/rest/v1/projects.locations.dataSources/list */
  dataSourceId?: string;
  /** Output only. State of the most recently updated transfer run. */
  state?: "TRANSFER_STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | (string & {});
  /** Data transfer schedule. If the data source does not support a custom schedule, this should be empty. If it is empty, the default value for the data source will be used. The specified times are in UTC. Examples of valid format: `1st,3rd monday of month 15:30`, `every wed,fri of jan,jun 13:15`, and `first sunday of quarter 00:00`. See more explanation about the format here: https://cloud.google.com/appengine/docs/flexible/python/scheduling-jobs-with-cron-yaml#the_schedule_format NOTE: The minimum interval time between recurring transfers depends on the data source; refer to the documentation for your data source. */
  schedule?: string;
}

export const TransferConfig: Schema.Schema<TransferConfig> = Schema.suspend(() => Schema.Struct({
  scheduleOptionsV2: Schema.optional(ScheduleOptionsV2),
  ownerInfo: Schema.optional(UserInfo),
  disabled: Schema.optional(Schema.Boolean),
  scheduleOptions: Schema.optional(ScheduleOptions),
  managedTableType: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  datasetRegion: Schema.optional(Schema.String),
  error: Schema.optional(Status),
  displayName: Schema.optional(Schema.String),
  emailPreferences: Schema.optional(EmailPreferences),
  params: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  destinationDatasetId: Schema.optional(Schema.String),
  dataRefreshWindowDays: Schema.optional(Schema.Number),
  notificationPubsubTopic: Schema.optional(Schema.String),
  encryptionConfiguration: Schema.optional(EncryptionConfiguration),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  nextRunTime: Schema.optional(Schema.String),
  dataSourceId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  schedule: Schema.optional(Schema.String),
})).annotate({ identifier: "TransferConfig" }) as any as Schema.Schema<TransferConfig>;

export interface ListTransferRunsResponse {
  /** Output only. The stored pipeline transfer runs. */
  transferRuns?: Array<TransferRun>;
  /** Output only. The next-pagination token. For multiple-page list results, this token can be used as the `ListTransferRunsRequest.page_token` to request the next page of list results. */
  nextPageToken?: string;
}

export const ListTransferRunsResponse: Schema.Schema<ListTransferRunsResponse> = Schema.suspend(() => Schema.Struct({
  transferRuns: Schema.optional(Schema.Array(TransferRun)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTransferRunsResponse" }) as any as Schema.Schema<ListTransferRunsResponse>;

export interface ListDataSourcesResponse {
  /** List of supported data sources and their transfer settings. */
  dataSources?: Array<DataSource>;
  /** Output only. The next-pagination token. For multiple-page list results, this token can be used as the `ListDataSourcesRequest.page_token` to request the next page of list results. */
  nextPageToken?: string;
}

export const ListDataSourcesResponse: Schema.Schema<ListDataSourcesResponse> = Schema.suspend(() => Schema.Struct({
  dataSources: Schema.optional(Schema.Array(DataSource)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDataSourcesResponse" }) as any as Schema.Schema<ListDataSourcesResponse>;

export interface ListTransferConfigsResponse {
  /** Output only. The stored pipeline transfer configurations. */
  transferConfigs?: Array<TransferConfig>;
  /** Output only. The next-pagination token. For multiple-page list results, this token can be used as the `ListTransferConfigsRequest.page_token` to request the next page of list results. */
  nextPageToken?: string;
}

export const ListTransferConfigsResponse: Schema.Schema<ListTransferConfigsResponse> = Schema.suspend(() => Schema.Struct({
  transferConfigs: Schema.optional(Schema.Array(TransferConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTransferConfigsResponse" }) as any as Schema.Schema<ListTransferConfigsResponse>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  locationId: Schema.optional(Schema.String),
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

export interface ScheduleTransferRunsResponse {
  /** The transfer runs that were scheduled. */
  runs?: Array<TransferRun>;
}

export const ScheduleTransferRunsResponse: Schema.Schema<ScheduleTransferRunsResponse> = Schema.suspend(() => Schema.Struct({
  runs: Schema.optional(Schema.Array(TransferRun)),
})).annotate({ identifier: "ScheduleTransferRunsResponse" }) as any as Schema.Schema<ScheduleTransferRunsResponse>;

export interface EnrollDataSourcesRequest {
  /** Data sources that are enrolled. It is required to provide at least one data source id. */
  dataSourceIds?: Array<string>;
}

export const EnrollDataSourcesRequest: Schema.Schema<EnrollDataSourcesRequest> = Schema.suspend(() => Schema.Struct({
  dataSourceIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EnrollDataSourcesRequest" }) as any as Schema.Schema<EnrollDataSourcesRequest>;

export interface StartManualTransferRunsResponse {
  /** The transfer runs that were created. */
  runs?: Array<TransferRun>;
}

export const StartManualTransferRunsResponse: Schema.Schema<StartManualTransferRunsResponse> = Schema.suspend(() => Schema.Struct({
  runs: Schema.optional(Schema.Array(TransferRun)),
})).annotate({ identifier: "StartManualTransferRunsResponse" }) as any as Schema.Schema<StartManualTransferRunsResponse>;

export interface UnenrollDataSourcesRequest {
  /** Data sources that are unenrolled. It is required to provide at least one data source id. */
  dataSourceIds?: Array<string>;
}

export const UnenrollDataSourcesRequest: Schema.Schema<UnenrollDataSourcesRequest> = Schema.suspend(() => Schema.Struct({
  dataSourceIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "UnenrollDataSourcesRequest" }) as any as Schema.Schema<UnenrollDataSourcesRequest>;

export interface ListTransferLogsResponse {
  /** Output only. The stored pipeline transfer messages. */
  transferMessages?: Array<TransferMessage>;
  /** Output only. The next-pagination token. For multiple-page list results, this token can be used as the `GetTransferRunLogRequest.page_token` to request the next page of list results. */
  nextPageToken?: string;
}

export const ListTransferLogsResponse: Schema.Schema<ListTransferLogsResponse> = Schema.suspend(() => Schema.Struct({
  transferMessages: Schema.optional(Schema.Array(TransferMessage)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTransferLogsResponse" }) as any as Schema.Schema<ListTransferLogsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Enroll data sources in a user project. This allows users to create transfer configurations for these data sources. They will also appear in the ListDataSources RPC and as such, will appear in the [BigQuery UI](https://console.cloud.google.com/bigquery), and the documents can be found in the public guide for [BigQuery Web UI](https://cloud.google.com/bigquery/bigquery-web-ui) and [Data Transfer Service](https://cloud.google.com/bigquery/docs/working-with-transfers). */
export interface EnrollDataSourcesProjectsRequest {
  /** Required. The name of the project resource in the form: `projects/{project_id}` */
  name: string;
  /** Request body */
  body?: EnrollDataSourcesRequest;
}

export const EnrollDataSourcesProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EnrollDataSourcesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}:enrollDataSources", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EnrollDataSourcesProjectsRequest>;

export type EnrollDataSourcesProjectsResponse = Empty;
export const EnrollDataSourcesProjectsResponse = Empty;

export type EnrollDataSourcesProjectsError = CommonErrors;

export const enrollDataSourcesProjects: API.OperationMethod<EnrollDataSourcesProjectsRequest, EnrollDataSourcesProjectsResponse, EnrollDataSourcesProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EnrollDataSourcesProjectsRequest,
  output: EnrollDataSourcesProjectsResponse,
  errors: [],
}));

/** Unenroll data sources in a user project. This allows users to remove transfer configurations for these data sources. They will no longer appear in the ListDataSources RPC and will also no longer appear in the [BigQuery UI](https://console.cloud.google.com/bigquery). Data transfers configurations of unenrolled data sources will not be scheduled. */
export interface UnenrollDataSourcesProjectsLocationsRequest {
  /** Required. The name of the project resource in the form: `projects/{project_id}` */
  name: string;
  /** Request body */
  body?: UnenrollDataSourcesRequest;
}

export const UnenrollDataSourcesProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UnenrollDataSourcesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}:unenrollDataSources", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnenrollDataSourcesProjectsLocationsRequest>;

export type UnenrollDataSourcesProjectsLocationsResponse = Empty;
export const UnenrollDataSourcesProjectsLocationsResponse = Empty;

export type UnenrollDataSourcesProjectsLocationsError = CommonErrors;

export const unenrollDataSourcesProjectsLocations: API.OperationMethod<UnenrollDataSourcesProjectsLocationsRequest, UnenrollDataSourcesProjectsLocationsResponse, UnenrollDataSourcesProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnenrollDataSourcesProjectsLocationsRequest,
  output: UnenrollDataSourcesProjectsLocationsResponse,
  errors: [],
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
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

/** Enroll data sources in a user project. This allows users to create transfer configurations for these data sources. They will also appear in the ListDataSources RPC and as such, will appear in the [BigQuery UI](https://console.cloud.google.com/bigquery), and the documents can be found in the public guide for [BigQuery Web UI](https://cloud.google.com/bigquery/bigquery-web-ui) and [Data Transfer Service](https://cloud.google.com/bigquery/docs/working-with-transfers). */
export interface EnrollDataSourcesProjectsLocationsRequest {
  /** Required. The name of the project resource in the form: `projects/{project_id}` */
  name: string;
  /** Request body */
  body?: EnrollDataSourcesRequest;
}

export const EnrollDataSourcesProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EnrollDataSourcesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}:enrollDataSources", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EnrollDataSourcesProjectsLocationsRequest>;

export type EnrollDataSourcesProjectsLocationsResponse = Empty;
export const EnrollDataSourcesProjectsLocationsResponse = Empty;

export type EnrollDataSourcesProjectsLocationsError = CommonErrors;

export const enrollDataSourcesProjectsLocations: API.OperationMethod<EnrollDataSourcesProjectsLocationsRequest, EnrollDataSourcesProjectsLocationsResponse, EnrollDataSourcesProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EnrollDataSourcesProjectsLocationsRequest,
  output: EnrollDataSourcesProjectsLocationsResponse,
  errors: [],
}));

/** Lists supported data sources and returns their settings. */
export interface ListProjectsLocationsDataSourcesRequest {
  /** Pagination token, which can be used to request a specific page of `ListDataSourcesRequest` list results. For multiple-page results, `ListDataSourcesResponse` outputs a `next_page` token, which can be used as the `page_token` value to request the next page of list results. */
  pageToken?: string;
  /** Page size. The default page size is the maximum value of 1000 results. */
  pageSize?: number;
  /** Required. The BigQuery project id for which data sources should be returned. Must be in the form: `projects/{project_id}` or `projects/{project_id}/locations/{location_id}` */
  parent: string;
}

export const ListProjectsLocationsDataSourcesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataSources" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDataSourcesRequest>;

export type ListProjectsLocationsDataSourcesResponse = ListDataSourcesResponse;
export const ListProjectsLocationsDataSourcesResponse = ListDataSourcesResponse;

export type ListProjectsLocationsDataSourcesError = CommonErrors;

export const listProjectsLocationsDataSources = API.makePaginated(() => ({
  input: ListProjectsLocationsDataSourcesRequest,
  output: ListProjectsLocationsDataSourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a supported data source and returns its settings. */
export interface GetProjectsLocationsDataSourcesRequest {
  /** Required. The name of the resource requested. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/dataSources/{data_source_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/dataSources/{data_source_id}` */
  name: string;
}

export const GetProjectsLocationsDataSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataSources/{dataSourcesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDataSourcesRequest>;

export type GetProjectsLocationsDataSourcesResponse = DataSource;
export const GetProjectsLocationsDataSourcesResponse = DataSource;

export type GetProjectsLocationsDataSourcesError = CommonErrors;

export const getProjectsLocationsDataSources: API.OperationMethod<GetProjectsLocationsDataSourcesRequest, GetProjectsLocationsDataSourcesResponse, GetProjectsLocationsDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDataSourcesRequest,
  output: GetProjectsLocationsDataSourcesResponse,
  errors: [],
}));

/** Returns true if valid credentials exist for the given data source and requesting user. */
export interface CheckValidCredsProjectsLocationsDataSourcesRequest {
  /** Required. The name of the data source. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/dataSources/{data_source_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/dataSources/{data_source_id}` */
  name: string;
  /** Request body */
  body?: CheckValidCredsRequest;
}

export const CheckValidCredsProjectsLocationsDataSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CheckValidCredsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataSources/{dataSourcesId}:checkValidCreds", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CheckValidCredsProjectsLocationsDataSourcesRequest>;

export type CheckValidCredsProjectsLocationsDataSourcesResponse = CheckValidCredsResponse;
export const CheckValidCredsProjectsLocationsDataSourcesResponse = CheckValidCredsResponse;

export type CheckValidCredsProjectsLocationsDataSourcesError = CommonErrors;

export const checkValidCredsProjectsLocationsDataSources: API.OperationMethod<CheckValidCredsProjectsLocationsDataSourcesRequest, CheckValidCredsProjectsLocationsDataSourcesResponse, CheckValidCredsProjectsLocationsDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckValidCredsProjectsLocationsDataSourcesRequest,
  output: CheckValidCredsProjectsLocationsDataSourcesResponse,
  errors: [],
}));

/** Creates a new data transfer configuration. */
export interface CreateProjectsLocationsTransferConfigsRequest {
  /** Optional version info. This parameter replaces `authorization_code` which is no longer used in any data sources. This is required only if `transferConfig.dataSourceId` is 'youtube_channel' *or* new credentials are needed, as indicated by `CheckValidCreds`. In order to obtain version info, make a request to the following URL: https://bigquery.cloud.google.com/datatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=version_info&client_id=client_id&scope=data_source_scopes * The client_id is the OAuth client_id of the data source as returned by ListDataSources method. * data_source_scopes are the scopes returned by ListDataSources method. Note that this should not be set when `service_account_name` is used to create the transfer config. */
  versionInfo?: string;
  /** Deprecated: Authorization code was required when `transferConfig.dataSourceId` is 'youtube_channel' but it is no longer used in any data sources. Use `version_info` instead. Optional OAuth2 authorization code to use with this transfer configuration. This is required only if `transferConfig.dataSourceId` is 'youtube_channel' and new credentials are needed, as indicated by `CheckValidCreds`. In order to obtain authorization_code, make a request to the following URL: https://bigquery.cloud.google.com/datatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=authorization_code&client_id=client_id&scope=data_source_scopes * The client_id is the OAuth client_id of the data source as returned by ListDataSources method. * data_source_scopes are the scopes returned by ListDataSources method. Note that this should not be set when `service_account_name` is used to create the transfer config. */
  authorizationCode?: string;
  /** Required. The BigQuery project id where the transfer configuration should be created. Must be in the format projects/{project_id}/locations/{location_id} or projects/{project_id}. If specified location and location of the destination bigquery dataset do not match - the request will fail. */
  parent: string;
  /** Optional service account email. If this field is set, the transfer config will be created with this service account's credentials. It requires that the requesting user calling this API has permissions to act as this service account. Note that not all data sources support service account credentials when creating a transfer config. For the latest list of data sources, read about [using service accounts](https://cloud.google.com/bigquery-transfer/docs/use-service-accounts). */
  serviceAccountName?: string;
  /** Request body */
  body?: TransferConfig;
}

export const CreateProjectsLocationsTransferConfigsRequest = Schema.Struct({
  versionInfo: Schema.optional(Schema.String).pipe(T.HttpQuery("versionInfo")),
  authorizationCode: Schema.optional(Schema.String).pipe(T.HttpQuery("authorizationCode")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  serviceAccountName: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceAccountName")),
  body: Schema.optional(TransferConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/transferConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsTransferConfigsRequest>;

export type CreateProjectsLocationsTransferConfigsResponse = TransferConfig;
export const CreateProjectsLocationsTransferConfigsResponse = TransferConfig;

export type CreateProjectsLocationsTransferConfigsError = CommonErrors;

export const createProjectsLocationsTransferConfigs: API.OperationMethod<CreateProjectsLocationsTransferConfigsRequest, CreateProjectsLocationsTransferConfigsResponse, CreateProjectsLocationsTransferConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsTransferConfigsRequest,
  output: CreateProjectsLocationsTransferConfigsResponse,
  errors: [],
}));

/** Returns information about a data transfer config. */
export interface GetProjectsLocationsTransferConfigsRequest {
  /** Required. The name of the resource requested. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` */
  name: string;
}

export const GetProjectsLocationsTransferConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsTransferConfigsRequest>;

export type GetProjectsLocationsTransferConfigsResponse = TransferConfig;
export const GetProjectsLocationsTransferConfigsResponse = TransferConfig;

export type GetProjectsLocationsTransferConfigsError = CommonErrors;

export const getProjectsLocationsTransferConfigs: API.OperationMethod<GetProjectsLocationsTransferConfigsRequest, GetProjectsLocationsTransferConfigsResponse, GetProjectsLocationsTransferConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsTransferConfigsRequest,
  output: GetProjectsLocationsTransferConfigsResponse,
  errors: [],
}));

/** Manually initiates transfer runs. You can schedule these runs in two ways: 1. For a specific point in time using the 'requested_run_time' parameter. 2. For a period between 'start_time' (inclusive) and 'end_time' (exclusive). If scheduling a single run, it is set to execute immediately (schedule_time equals the current time). When scheduling multiple runs within a time range, the first run starts now, and subsequent runs are delayed by 15 seconds each. */
export interface StartManualRunsProjectsLocationsTransferConfigsRequest {
  /** Required. Transfer configuration name. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` */
  parent: string;
  /** Request body */
  body?: StartManualTransferRunsRequest;
}

export const StartManualRunsProjectsLocationsTransferConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(StartManualTransferRunsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}:startManualRuns", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartManualRunsProjectsLocationsTransferConfigsRequest>;

export type StartManualRunsProjectsLocationsTransferConfigsResponse = StartManualTransferRunsResponse;
export const StartManualRunsProjectsLocationsTransferConfigsResponse = StartManualTransferRunsResponse;

export type StartManualRunsProjectsLocationsTransferConfigsError = CommonErrors;

export const startManualRunsProjectsLocationsTransferConfigs: API.OperationMethod<StartManualRunsProjectsLocationsTransferConfigsRequest, StartManualRunsProjectsLocationsTransferConfigsResponse, StartManualRunsProjectsLocationsTransferConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartManualRunsProjectsLocationsTransferConfigsRequest,
  output: StartManualRunsProjectsLocationsTransferConfigsResponse,
  errors: [],
}));

/** Deletes a data transfer configuration, including any associated transfer runs and logs. */
export interface DeleteProjectsLocationsTransferConfigsRequest {
  /** Required. The name of the resource to delete. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` */
  name: string;
}

export const DeleteProjectsLocationsTransferConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsTransferConfigsRequest>;

export type DeleteProjectsLocationsTransferConfigsResponse = Empty;
export const DeleteProjectsLocationsTransferConfigsResponse = Empty;

export type DeleteProjectsLocationsTransferConfigsError = CommonErrors;

export const deleteProjectsLocationsTransferConfigs: API.OperationMethod<DeleteProjectsLocationsTransferConfigsRequest, DeleteProjectsLocationsTransferConfigsResponse, DeleteProjectsLocationsTransferConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsTransferConfigsRequest,
  output: DeleteProjectsLocationsTransferConfigsResponse,
  errors: [],
}));

/** Updates a data transfer configuration. All fields must be set, even if they are not updated. */
export interface PatchProjectsLocationsTransferConfigsRequest {
  /** Optional version info. This parameter replaces `authorization_code` which is no longer used in any data sources. This is required only if `transferConfig.dataSourceId` is 'youtube_channel' *or* new credentials are needed, as indicated by `CheckValidCreds`. In order to obtain version info, make a request to the following URL: https://bigquery.cloud.google.com/datatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=version_info&client_id=client_id&scope=data_source_scopes * The client_id is the OAuth client_id of the data source as returned by ListDataSources method. * data_source_scopes are the scopes returned by ListDataSources method. Note that this should not be set when `service_account_name` is used to update the transfer config. */
  versionInfo?: string;
  /** Deprecated: Authorization code was required when `transferConfig.dataSourceId` is 'youtube_channel' but it is no longer used in any data sources. Use `version_info` instead. Optional OAuth2 authorization code to use with this transfer configuration. This is required only if `transferConfig.dataSourceId` is 'youtube_channel' and new credentials are needed, as indicated by `CheckValidCreds`. In order to obtain authorization_code, make a request to the following URL: https://bigquery.cloud.google.com/datatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=authorization_code&client_id=client_id&scope=data_source_scopes * The client_id is the OAuth client_id of the data source as returned by ListDataSources method. * data_source_scopes are the scopes returned by ListDataSources method. Note that this should not be set when `service_account_name` is used to update the transfer config. */
  authorizationCode?: string;
  /** Identifier. The resource name of the transfer config. Transfer config names have the form either `projects/{project_id}/locations/{region}/transferConfigs/{config_id}` or `projects/{project_id}/transferConfigs/{config_id}`, where `config_id` is usually a UUID, even though it is not guaranteed or required. The name is ignored when creating a transfer config. */
  name: string;
  /** Optional service account email. If this field is set, the transfer config will be created with this service account's credentials. It requires that the requesting user calling this API has permissions to act as this service account. Note that not all data sources support service account credentials when creating a transfer config. For the latest list of data sources, read about [using service accounts](https://cloud.google.com/bigquery-transfer/docs/use-service-accounts). */
  serviceAccountName?: string;
  /** Required. Required list of fields to be updated in this request. */
  updateMask?: string;
  /** Request body */
  body?: TransferConfig;
}

export const PatchProjectsLocationsTransferConfigsRequest = Schema.Struct({
  versionInfo: Schema.optional(Schema.String).pipe(T.HttpQuery("versionInfo")),
  authorizationCode: Schema.optional(Schema.String).pipe(T.HttpQuery("authorizationCode")),
  name: Schema.String.pipe(T.HttpPath("name")),
  serviceAccountName: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceAccountName")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(TransferConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsTransferConfigsRequest>;

export type PatchProjectsLocationsTransferConfigsResponse = TransferConfig;
export const PatchProjectsLocationsTransferConfigsResponse = TransferConfig;

export type PatchProjectsLocationsTransferConfigsError = CommonErrors;

export const patchProjectsLocationsTransferConfigs: API.OperationMethod<PatchProjectsLocationsTransferConfigsRequest, PatchProjectsLocationsTransferConfigsResponse, PatchProjectsLocationsTransferConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsTransferConfigsRequest,
  output: PatchProjectsLocationsTransferConfigsResponse,
  errors: [],
}));

/** Returns information about all transfer configs owned by a project in the specified location. */
export interface ListProjectsLocationsTransferConfigsRequest {
  /** Page size. The default page size is the maximum value of 1000 results. */
  pageSize?: number;
  /** Pagination token, which can be used to request a specific page of `ListTransfersRequest` list results. For multiple-page results, `ListTransfersResponse` outputs a `next_page` token, which can be used as the `page_token` value to request the next page of list results. */
  pageToken?: string;
  /** When specified, only configurations of requested data sources are returned. */
  dataSourceIds?: string[];
  /** Required. The BigQuery project id for which transfer configs should be returned. If you are using the regionless method, the location must be `US` and `parent` should be in the following form: * `projects/{project_id} If you are using the regionalized method, `parent` should be in the following form: * `projects/{project_id}/locations/{location_id}` */
  parent: string;
}

export const ListProjectsLocationsTransferConfigsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  dataSourceIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("dataSourceIds")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/transferConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsTransferConfigsRequest>;

export type ListProjectsLocationsTransferConfigsResponse = ListTransferConfigsResponse;
export const ListProjectsLocationsTransferConfigsResponse = ListTransferConfigsResponse;

export type ListProjectsLocationsTransferConfigsError = CommonErrors;

export const listProjectsLocationsTransferConfigs = API.makePaginated(() => ({
  input: ListProjectsLocationsTransferConfigsRequest,
  output: ListProjectsLocationsTransferConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates transfer runs for a time range [start_time, end_time]. For each date - or whatever granularity the data source supports - in the range, one transfer run is created. Note that runs are created per UTC time in the time range. DEPRECATED: use StartManualTransferRuns instead. */
export interface ScheduleRunsProjectsLocationsTransferConfigsRequest {
  /** Required. Transfer configuration name. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` */
  parent: string;
  /** Request body */
  body?: ScheduleTransferRunsRequest;
}

export const ScheduleRunsProjectsLocationsTransferConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ScheduleTransferRunsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}:scheduleRuns", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ScheduleRunsProjectsLocationsTransferConfigsRequest>;

export type ScheduleRunsProjectsLocationsTransferConfigsResponse = ScheduleTransferRunsResponse;
export const ScheduleRunsProjectsLocationsTransferConfigsResponse = ScheduleTransferRunsResponse;

export type ScheduleRunsProjectsLocationsTransferConfigsError = CommonErrors;

export const scheduleRunsProjectsLocationsTransferConfigs: API.OperationMethod<ScheduleRunsProjectsLocationsTransferConfigsRequest, ScheduleRunsProjectsLocationsTransferConfigsResponse, ScheduleRunsProjectsLocationsTransferConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ScheduleRunsProjectsLocationsTransferConfigsRequest,
  output: ScheduleRunsProjectsLocationsTransferConfigsResponse,
  errors: [],
}));

/** Returns information about running and completed transfer runs. */
export interface ListProjectsLocationsTransferConfigsRunsRequest {
  /** Pagination token, which can be used to request a specific page of `ListTransferRunsRequest` list results. For multiple-page results, `ListTransferRunsResponse` outputs a `next_page` token, which can be used as the `page_token` value to request the next page of list results. */
  pageToken?: string;
  /** When specified, only transfer runs with requested states are returned. */
  states?: "TRANSFER_STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | (string & {})[];
  /** Indicates how run attempts are to be pulled. */
  runAttempt?: "RUN_ATTEMPT_UNSPECIFIED" | "LATEST" | (string & {});
  /** Required. Name of transfer configuration for which transfer runs should be retrieved. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` */
  parent: string;
  /** Page size. The default page size is the maximum value of 1000 results. */
  pageSize?: number;
}

export const ListProjectsLocationsTransferConfigsRunsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  states: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("states")),
  runAttempt: Schema.optional(Schema.String).pipe(T.HttpQuery("runAttempt")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsTransferConfigsRunsRequest>;

export type ListProjectsLocationsTransferConfigsRunsResponse = ListTransferRunsResponse;
export const ListProjectsLocationsTransferConfigsRunsResponse = ListTransferRunsResponse;

export type ListProjectsLocationsTransferConfigsRunsError = CommonErrors;

export const listProjectsLocationsTransferConfigsRuns = API.makePaginated(() => ({
  input: ListProjectsLocationsTransferConfigsRunsRequest,
  output: ListProjectsLocationsTransferConfigsRunsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns information about the particular transfer run. */
export interface GetProjectsLocationsTransferConfigsRunsRequest {
  /** Required. The name of the resource requested. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}` */
  name: string;
}

export const GetProjectsLocationsTransferConfigsRunsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsTransferConfigsRunsRequest>;

export type GetProjectsLocationsTransferConfigsRunsResponse = TransferRun;
export const GetProjectsLocationsTransferConfigsRunsResponse = TransferRun;

export type GetProjectsLocationsTransferConfigsRunsError = CommonErrors;

export const getProjectsLocationsTransferConfigsRuns: API.OperationMethod<GetProjectsLocationsTransferConfigsRunsRequest, GetProjectsLocationsTransferConfigsRunsResponse, GetProjectsLocationsTransferConfigsRunsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsTransferConfigsRunsRequest,
  output: GetProjectsLocationsTransferConfigsRunsResponse,
  errors: [],
}));

/** Deletes the specified transfer run. */
export interface DeleteProjectsLocationsTransferConfigsRunsRequest {
  /** Required. The name of the resource requested. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}` */
  name: string;
}

export const DeleteProjectsLocationsTransferConfigsRunsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsTransferConfigsRunsRequest>;

export type DeleteProjectsLocationsTransferConfigsRunsResponse = Empty;
export const DeleteProjectsLocationsTransferConfigsRunsResponse = Empty;

export type DeleteProjectsLocationsTransferConfigsRunsError = CommonErrors;

export const deleteProjectsLocationsTransferConfigsRuns: API.OperationMethod<DeleteProjectsLocationsTransferConfigsRunsRequest, DeleteProjectsLocationsTransferConfigsRunsResponse, DeleteProjectsLocationsTransferConfigsRunsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsTransferConfigsRunsRequest,
  output: DeleteProjectsLocationsTransferConfigsRunsResponse,
  errors: [],
}));

/** Returns log messages for the transfer run. */
export interface ListProjectsLocationsTransferConfigsRunsTransferLogsRequest {
  /** Page size. The default page size is the maximum value of 1000 results. */
  pageSize?: number;
  /** Message types to return. If not populated - INFO, WARNING and ERROR messages are returned. */
  messageTypes?: "MESSAGE_SEVERITY_UNSPECIFIED" | "INFO" | "WARNING" | "ERROR" | (string & {})[];
  /** Required. Transfer run name. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}` */
  parent: string;
  /** Pagination token, which can be used to request a specific page of `ListTransferLogsRequest` list results. For multiple-page results, `ListTransferLogsResponse` outputs a `next_page` token, which can be used as the `page_token` value to request the next page of list results. */
  pageToken?: string;
}

export const ListProjectsLocationsTransferConfigsRunsTransferLogsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  messageTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("messageTypes")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}/transferLogs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsTransferConfigsRunsTransferLogsRequest>;

export type ListProjectsLocationsTransferConfigsRunsTransferLogsResponse = ListTransferLogsResponse;
export const ListProjectsLocationsTransferConfigsRunsTransferLogsResponse = ListTransferLogsResponse;

export type ListProjectsLocationsTransferConfigsRunsTransferLogsError = CommonErrors;

export const listProjectsLocationsTransferConfigsRunsTransferLogs = API.makePaginated(() => ({
  input: ListProjectsLocationsTransferConfigsRunsTransferLogsRequest,
  output: ListProjectsLocationsTransferConfigsRunsTransferLogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a data transfer configuration, including any associated transfer runs and logs. */
export interface DeleteProjectsTransferConfigsRequest {
  /** Required. The name of the resource to delete. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` */
  name: string;
}

export const DeleteProjectsTransferConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/transferConfigs/{transferConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsTransferConfigsRequest>;

export type DeleteProjectsTransferConfigsResponse = Empty;
export const DeleteProjectsTransferConfigsResponse = Empty;

export type DeleteProjectsTransferConfigsError = CommonErrors;

export const deleteProjectsTransferConfigs: API.OperationMethod<DeleteProjectsTransferConfigsRequest, DeleteProjectsTransferConfigsResponse, DeleteProjectsTransferConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsTransferConfigsRequest,
  output: DeleteProjectsTransferConfigsResponse,
  errors: [],
}));

/** Manually initiates transfer runs. You can schedule these runs in two ways: 1. For a specific point in time using the 'requested_run_time' parameter. 2. For a period between 'start_time' (inclusive) and 'end_time' (exclusive). If scheduling a single run, it is set to execute immediately (schedule_time equals the current time). When scheduling multiple runs within a time range, the first run starts now, and subsequent runs are delayed by 15 seconds each. */
export interface StartManualRunsProjectsTransferConfigsRequest {
  /** Required. Transfer configuration name. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` */
  parent: string;
  /** Request body */
  body?: StartManualTransferRunsRequest;
}

export const StartManualRunsProjectsTransferConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(StartManualTransferRunsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/transferConfigs/{transferConfigsId}:startManualRuns", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartManualRunsProjectsTransferConfigsRequest>;

export type StartManualRunsProjectsTransferConfigsResponse = StartManualTransferRunsResponse;
export const StartManualRunsProjectsTransferConfigsResponse = StartManualTransferRunsResponse;

export type StartManualRunsProjectsTransferConfigsError = CommonErrors;

export const startManualRunsProjectsTransferConfigs: API.OperationMethod<StartManualRunsProjectsTransferConfigsRequest, StartManualRunsProjectsTransferConfigsResponse, StartManualRunsProjectsTransferConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartManualRunsProjectsTransferConfigsRequest,
  output: StartManualRunsProjectsTransferConfigsResponse,
  errors: [],
}));

/** Updates a data transfer configuration. All fields must be set, even if they are not updated. */
export interface PatchProjectsTransferConfigsRequest {
  /** Optional service account email. If this field is set, the transfer config will be created with this service account's credentials. It requires that the requesting user calling this API has permissions to act as this service account. Note that not all data sources support service account credentials when creating a transfer config. For the latest list of data sources, read about [using service accounts](https://cloud.google.com/bigquery-transfer/docs/use-service-accounts). */
  serviceAccountName?: string;
  /** Deprecated: Authorization code was required when `transferConfig.dataSourceId` is 'youtube_channel' but it is no longer used in any data sources. Use `version_info` instead. Optional OAuth2 authorization code to use with this transfer configuration. This is required only if `transferConfig.dataSourceId` is 'youtube_channel' and new credentials are needed, as indicated by `CheckValidCreds`. In order to obtain authorization_code, make a request to the following URL: https://bigquery.cloud.google.com/datatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=authorization_code&client_id=client_id&scope=data_source_scopes * The client_id is the OAuth client_id of the data source as returned by ListDataSources method. * data_source_scopes are the scopes returned by ListDataSources method. Note that this should not be set when `service_account_name` is used to update the transfer config. */
  authorizationCode?: string;
  /** Optional version info. This parameter replaces `authorization_code` which is no longer used in any data sources. This is required only if `transferConfig.dataSourceId` is 'youtube_channel' *or* new credentials are needed, as indicated by `CheckValidCreds`. In order to obtain version info, make a request to the following URL: https://bigquery.cloud.google.com/datatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=version_info&client_id=client_id&scope=data_source_scopes * The client_id is the OAuth client_id of the data source as returned by ListDataSources method. * data_source_scopes are the scopes returned by ListDataSources method. Note that this should not be set when `service_account_name` is used to update the transfer config. */
  versionInfo?: string;
  /** Required. Required list of fields to be updated in this request. */
  updateMask?: string;
  /** Identifier. The resource name of the transfer config. Transfer config names have the form either `projects/{project_id}/locations/{region}/transferConfigs/{config_id}` or `projects/{project_id}/transferConfigs/{config_id}`, where `config_id` is usually a UUID, even though it is not guaranteed or required. The name is ignored when creating a transfer config. */
  name: string;
  /** Request body */
  body?: TransferConfig;
}

export const PatchProjectsTransferConfigsRequest = Schema.Struct({
  serviceAccountName: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceAccountName")),
  authorizationCode: Schema.optional(Schema.String).pipe(T.HttpQuery("authorizationCode")),
  versionInfo: Schema.optional(Schema.String).pipe(T.HttpQuery("versionInfo")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(TransferConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/transferConfigs/{transferConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsTransferConfigsRequest>;

export type PatchProjectsTransferConfigsResponse = TransferConfig;
export const PatchProjectsTransferConfigsResponse = TransferConfig;

export type PatchProjectsTransferConfigsError = CommonErrors;

export const patchProjectsTransferConfigs: API.OperationMethod<PatchProjectsTransferConfigsRequest, PatchProjectsTransferConfigsResponse, PatchProjectsTransferConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsTransferConfigsRequest,
  output: PatchProjectsTransferConfigsResponse,
  errors: [],
}));

/** Returns information about a data transfer config. */
export interface GetProjectsTransferConfigsRequest {
  /** Required. The name of the resource requested. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` */
  name: string;
}

export const GetProjectsTransferConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/transferConfigs/{transferConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsTransferConfigsRequest>;

export type GetProjectsTransferConfigsResponse = TransferConfig;
export const GetProjectsTransferConfigsResponse = TransferConfig;

export type GetProjectsTransferConfigsError = CommonErrors;

export const getProjectsTransferConfigs: API.OperationMethod<GetProjectsTransferConfigsRequest, GetProjectsTransferConfigsResponse, GetProjectsTransferConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsTransferConfigsRequest,
  output: GetProjectsTransferConfigsResponse,
  errors: [],
}));

/** Creates a new data transfer configuration. */
export interface CreateProjectsTransferConfigsRequest {
  /** Optional version info. This parameter replaces `authorization_code` which is no longer used in any data sources. This is required only if `transferConfig.dataSourceId` is 'youtube_channel' *or* new credentials are needed, as indicated by `CheckValidCreds`. In order to obtain version info, make a request to the following URL: https://bigquery.cloud.google.com/datatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=version_info&client_id=client_id&scope=data_source_scopes * The client_id is the OAuth client_id of the data source as returned by ListDataSources method. * data_source_scopes are the scopes returned by ListDataSources method. Note that this should not be set when `service_account_name` is used to create the transfer config. */
  versionInfo?: string;
  /** Deprecated: Authorization code was required when `transferConfig.dataSourceId` is 'youtube_channel' but it is no longer used in any data sources. Use `version_info` instead. Optional OAuth2 authorization code to use with this transfer configuration. This is required only if `transferConfig.dataSourceId` is 'youtube_channel' and new credentials are needed, as indicated by `CheckValidCreds`. In order to obtain authorization_code, make a request to the following URL: https://bigquery.cloud.google.com/datatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=authorization_code&client_id=client_id&scope=data_source_scopes * The client_id is the OAuth client_id of the data source as returned by ListDataSources method. * data_source_scopes are the scopes returned by ListDataSources method. Note that this should not be set when `service_account_name` is used to create the transfer config. */
  authorizationCode?: string;
  /** Required. The BigQuery project id where the transfer configuration should be created. Must be in the format projects/{project_id}/locations/{location_id} or projects/{project_id}. If specified location and location of the destination bigquery dataset do not match - the request will fail. */
  parent: string;
  /** Optional service account email. If this field is set, the transfer config will be created with this service account's credentials. It requires that the requesting user calling this API has permissions to act as this service account. Note that not all data sources support service account credentials when creating a transfer config. For the latest list of data sources, read about [using service accounts](https://cloud.google.com/bigquery-transfer/docs/use-service-accounts). */
  serviceAccountName?: string;
  /** Request body */
  body?: TransferConfig;
}

export const CreateProjectsTransferConfigsRequest = Schema.Struct({
  versionInfo: Schema.optional(Schema.String).pipe(T.HttpQuery("versionInfo")),
  authorizationCode: Schema.optional(Schema.String).pipe(T.HttpQuery("authorizationCode")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  serviceAccountName: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceAccountName")),
  body: Schema.optional(TransferConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/transferConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsTransferConfigsRequest>;

export type CreateProjectsTransferConfigsResponse = TransferConfig;
export const CreateProjectsTransferConfigsResponse = TransferConfig;

export type CreateProjectsTransferConfigsError = CommonErrors;

export const createProjectsTransferConfigs: API.OperationMethod<CreateProjectsTransferConfigsRequest, CreateProjectsTransferConfigsResponse, CreateProjectsTransferConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsTransferConfigsRequest,
  output: CreateProjectsTransferConfigsResponse,
  errors: [],
}));

/** Returns information about all transfer configs owned by a project in the specified location. */
export interface ListProjectsTransferConfigsRequest {
  /** Pagination token, which can be used to request a specific page of `ListTransfersRequest` list results. For multiple-page results, `ListTransfersResponse` outputs a `next_page` token, which can be used as the `page_token` value to request the next page of list results. */
  pageToken?: string;
  /** Page size. The default page size is the maximum value of 1000 results. */
  pageSize?: number;
  /** When specified, only configurations of requested data sources are returned. */
  dataSourceIds?: string[];
  /** Required. The BigQuery project id for which transfer configs should be returned. If you are using the regionless method, the location must be `US` and `parent` should be in the following form: * `projects/{project_id} If you are using the regionalized method, `parent` should be in the following form: * `projects/{project_id}/locations/{location_id}` */
  parent: string;
}

export const ListProjectsTransferConfigsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  dataSourceIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("dataSourceIds")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/transferConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsTransferConfigsRequest>;

export type ListProjectsTransferConfigsResponse = ListTransferConfigsResponse;
export const ListProjectsTransferConfigsResponse = ListTransferConfigsResponse;

export type ListProjectsTransferConfigsError = CommonErrors;

export const listProjectsTransferConfigs = API.makePaginated(() => ({
  input: ListProjectsTransferConfigsRequest,
  output: ListProjectsTransferConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates transfer runs for a time range [start_time, end_time]. For each date - or whatever granularity the data source supports - in the range, one transfer run is created. Note that runs are created per UTC time in the time range. DEPRECATED: use StartManualTransferRuns instead. */
export interface ScheduleRunsProjectsTransferConfigsRequest {
  /** Required. Transfer configuration name. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` */
  parent: string;
  /** Request body */
  body?: ScheduleTransferRunsRequest;
}

export const ScheduleRunsProjectsTransferConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ScheduleTransferRunsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/transferConfigs/{transferConfigsId}:scheduleRuns", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ScheduleRunsProjectsTransferConfigsRequest>;

export type ScheduleRunsProjectsTransferConfigsResponse = ScheduleTransferRunsResponse;
export const ScheduleRunsProjectsTransferConfigsResponse = ScheduleTransferRunsResponse;

export type ScheduleRunsProjectsTransferConfigsError = CommonErrors;

export const scheduleRunsProjectsTransferConfigs: API.OperationMethod<ScheduleRunsProjectsTransferConfigsRequest, ScheduleRunsProjectsTransferConfigsResponse, ScheduleRunsProjectsTransferConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ScheduleRunsProjectsTransferConfigsRequest,
  output: ScheduleRunsProjectsTransferConfigsResponse,
  errors: [],
}));

/** Returns information about the particular transfer run. */
export interface GetProjectsTransferConfigsRunsRequest {
  /** Required. The name of the resource requested. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}` */
  name: string;
}

export const GetProjectsTransferConfigsRunsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsTransferConfigsRunsRequest>;

export type GetProjectsTransferConfigsRunsResponse = TransferRun;
export const GetProjectsTransferConfigsRunsResponse = TransferRun;

export type GetProjectsTransferConfigsRunsError = CommonErrors;

export const getProjectsTransferConfigsRuns: API.OperationMethod<GetProjectsTransferConfigsRunsRequest, GetProjectsTransferConfigsRunsResponse, GetProjectsTransferConfigsRunsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsTransferConfigsRunsRequest,
  output: GetProjectsTransferConfigsRunsResponse,
  errors: [],
}));

/** Deletes the specified transfer run. */
export interface DeleteProjectsTransferConfigsRunsRequest {
  /** Required. The name of the resource requested. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}` */
  name: string;
}

export const DeleteProjectsTransferConfigsRunsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsTransferConfigsRunsRequest>;

export type DeleteProjectsTransferConfigsRunsResponse = Empty;
export const DeleteProjectsTransferConfigsRunsResponse = Empty;

export type DeleteProjectsTransferConfigsRunsError = CommonErrors;

export const deleteProjectsTransferConfigsRuns: API.OperationMethod<DeleteProjectsTransferConfigsRunsRequest, DeleteProjectsTransferConfigsRunsResponse, DeleteProjectsTransferConfigsRunsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsTransferConfigsRunsRequest,
  output: DeleteProjectsTransferConfigsRunsResponse,
  errors: [],
}));

/** Returns information about running and completed transfer runs. */
export interface ListProjectsTransferConfigsRunsRequest {
  /** Indicates how run attempts are to be pulled. */
  runAttempt?: "RUN_ATTEMPT_UNSPECIFIED" | "LATEST" | (string & {});
  /** Required. Name of transfer configuration for which transfer runs should be retrieved. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` */
  parent: string;
  /** Page size. The default page size is the maximum value of 1000 results. */
  pageSize?: number;
  /** Pagination token, which can be used to request a specific page of `ListTransferRunsRequest` list results. For multiple-page results, `ListTransferRunsResponse` outputs a `next_page` token, which can be used as the `page_token` value to request the next page of list results. */
  pageToken?: string;
  /** When specified, only transfer runs with requested states are returned. */
  states?: "TRANSFER_STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | (string & {})[];
}

export const ListProjectsTransferConfigsRunsRequest = Schema.Struct({
  runAttempt: Schema.optional(Schema.String).pipe(T.HttpQuery("runAttempt")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  states: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("states")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/transferConfigs/{transferConfigsId}/runs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsTransferConfigsRunsRequest>;

export type ListProjectsTransferConfigsRunsResponse = ListTransferRunsResponse;
export const ListProjectsTransferConfigsRunsResponse = ListTransferRunsResponse;

export type ListProjectsTransferConfigsRunsError = CommonErrors;

export const listProjectsTransferConfigsRuns = API.makePaginated(() => ({
  input: ListProjectsTransferConfigsRunsRequest,
  output: ListProjectsTransferConfigsRunsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns log messages for the transfer run. */
export interface ListProjectsTransferConfigsRunsTransferLogsRequest {
  /** Page size. The default page size is the maximum value of 1000 results. */
  pageSize?: number;
  /** Required. Transfer run name. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}` */
  parent: string;
  /** Message types to return. If not populated - INFO, WARNING and ERROR messages are returned. */
  messageTypes?: "MESSAGE_SEVERITY_UNSPECIFIED" | "INFO" | "WARNING" | "ERROR" | (string & {})[];
  /** Pagination token, which can be used to request a specific page of `ListTransferLogsRequest` list results. For multiple-page results, `ListTransferLogsResponse` outputs a `next_page` token, which can be used as the `page_token` value to request the next page of list results. */
  pageToken?: string;
}

export const ListProjectsTransferConfigsRunsTransferLogsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  messageTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("messageTypes")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}/transferLogs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsTransferConfigsRunsTransferLogsRequest>;

export type ListProjectsTransferConfigsRunsTransferLogsResponse = ListTransferLogsResponse;
export const ListProjectsTransferConfigsRunsTransferLogsResponse = ListTransferLogsResponse;

export type ListProjectsTransferConfigsRunsTransferLogsError = CommonErrors;

export const listProjectsTransferConfigsRunsTransferLogs = API.makePaginated(() => ({
  input: ListProjectsTransferConfigsRunsTransferLogsRequest,
  output: ListProjectsTransferConfigsRunsTransferLogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a supported data source and returns its settings. */
export interface GetProjectsDataSourcesRequest {
  /** Required. The name of the resource requested. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/dataSources/{data_source_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/dataSources/{data_source_id}` */
  name: string;
}

export const GetProjectsDataSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/dataSources/{dataSourcesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsDataSourcesRequest>;

export type GetProjectsDataSourcesResponse = DataSource;
export const GetProjectsDataSourcesResponse = DataSource;

export type GetProjectsDataSourcesError = CommonErrors;

export const getProjectsDataSources: API.OperationMethod<GetProjectsDataSourcesRequest, GetProjectsDataSourcesResponse, GetProjectsDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsDataSourcesRequest,
  output: GetProjectsDataSourcesResponse,
  errors: [],
}));

/** Lists supported data sources and returns their settings. */
export interface ListProjectsDataSourcesRequest {
  /** Page size. The default page size is the maximum value of 1000 results. */
  pageSize?: number;
  /** Pagination token, which can be used to request a specific page of `ListDataSourcesRequest` list results. For multiple-page results, `ListDataSourcesResponse` outputs a `next_page` token, which can be used as the `page_token` value to request the next page of list results. */
  pageToken?: string;
  /** Required. The BigQuery project id for which data sources should be returned. Must be in the form: `projects/{project_id}` or `projects/{project_id}/locations/{location_id}` */
  parent: string;
}

export const ListProjectsDataSourcesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/dataSources" }),
  svc,
) as unknown as Schema.Schema<ListProjectsDataSourcesRequest>;

export type ListProjectsDataSourcesResponse = ListDataSourcesResponse;
export const ListProjectsDataSourcesResponse = ListDataSourcesResponse;

export type ListProjectsDataSourcesError = CommonErrors;

export const listProjectsDataSources = API.makePaginated(() => ({
  input: ListProjectsDataSourcesRequest,
  output: ListProjectsDataSourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns true if valid credentials exist for the given data source and requesting user. */
export interface CheckValidCredsProjectsDataSourcesRequest {
  /** Required. The name of the data source. If you are using the regionless method, the location must be `US` and the name should be in the following form: * `projects/{project_id}/dataSources/{data_source_id}` If you are using the regionalized method, the name should be in the following form: * `projects/{project_id}/locations/{location_id}/dataSources/{data_source_id}` */
  name: string;
  /** Request body */
  body?: CheckValidCredsRequest;
}

export const CheckValidCredsProjectsDataSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CheckValidCredsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/dataSources/{dataSourcesId}:checkValidCreds", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CheckValidCredsProjectsDataSourcesRequest>;

export type CheckValidCredsProjectsDataSourcesResponse = CheckValidCredsResponse;
export const CheckValidCredsProjectsDataSourcesResponse = CheckValidCredsResponse;

export type CheckValidCredsProjectsDataSourcesError = CommonErrors;

export const checkValidCredsProjectsDataSources: API.OperationMethod<CheckValidCredsProjectsDataSourcesRequest, CheckValidCredsProjectsDataSourcesResponse, CheckValidCredsProjectsDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckValidCredsProjectsDataSourcesRequest,
  output: CheckValidCredsProjectsDataSourcesResponse,
  errors: [],
}));

