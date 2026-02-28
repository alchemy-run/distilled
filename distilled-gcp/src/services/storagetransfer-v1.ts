// ==========================================================================
// Storage Transfer API (storagetransfer v1)
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
  name: "storagetransfer",
  version: "v1",
  rootUrl: "https://storagetransfer.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface FederatedIdentityConfig {
  /** Required. The client (application) ID of the application with federated credentials. */
  clientId?: string;
  /** Required. The tenant (directory) ID of the application with federated credentials. */
  tenantId?: string;
}

export const FederatedIdentityConfig: Schema.Schema<FederatedIdentityConfig> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
})).annotate({ identifier: "FederatedIdentityConfig" }) as any as Schema.Schema<FederatedIdentityConfig>;

export interface AzureCredentials {
  /** Required. Azure shared access signature (SAS). For more information about SAS, see [Grant limited access to Azure Storage resources using shared access signatures (SAS)](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview). */
  sasToken?: string;
}

export const AzureCredentials: Schema.Schema<AzureCredentials> = Schema.suspend(() => Schema.Struct({
  sasToken: Schema.optional(Schema.String),
})).annotate({ identifier: "AzureCredentials" }) as any as Schema.Schema<AzureCredentials>;

export interface AzureBlobStorageData {
  /** Service Directory Service to be used as the endpoint for transfers from a custom VPC. Format: `projects/{project_id}/locations/{location}/namespaces/{namespace}/services/{service}` */
  privateNetworkService?: string;
  /** Optional. Federated identity config of a user registered Azure application. If `federated_identity_config` is specified, do not specify azure_credentials or credentials_secret. */
  federatedIdentityConfig?: FederatedIdentityConfig;
  /** Required. Input only. Credentials used to authenticate API requests to Azure. For information on our data retention policy for user credentials, see [User credentials](/storage-transfer/docs/data-retention#user-credentials). */
  azureCredentials?: AzureCredentials;
  /** Optional. The Resource name of a secret in Secret Manager. The Azure SAS token must be stored in Secret Manager in JSON format: { "sas_token" : "SAS_TOKEN" } GoogleServiceAccount must be granted `roles/secretmanager.secretAccessor` for the resource. See [Configure access to a source: Microsoft Azure Blob Storage] (https://cloud.google.com/storage-transfer/docs/source-microsoft-azure#secret_manager) for more information. If `credentials_secret` is specified, do not specify azure_credentials. Format: `projects/{project_number}/secrets/{secret_name}` */
  credentialsSecret?: string;
  /** Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. */
  path?: string;
  /** Required. The container to transfer from the Azure Storage account. */
  container?: string;
  /** Required. The name of the Azure Storage account. */
  storageAccount?: string;
}

export const AzureBlobStorageData: Schema.Schema<AzureBlobStorageData> = Schema.suspend(() => Schema.Struct({
  privateNetworkService: Schema.optional(Schema.String),
  federatedIdentityConfig: Schema.optional(FederatedIdentityConfig),
  azureCredentials: Schema.optional(AzureCredentials),
  credentialsSecret: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  container: Schema.optional(Schema.String),
  storageAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "AzureBlobStorageData" }) as any as Schema.Schema<AzureBlobStorageData>;

export interface TransferManifest {
  /** Specifies the path to the manifest in Cloud Storage. The Google-managed service account for the transfer must have `storage.objects.get` permission for this object. An example path is `gs://bucket_name/path/manifest.csv`. */
  location?: string;
}

export const TransferManifest: Schema.Schema<TransferManifest> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "TransferManifest" }) as any as Schema.Schema<TransferManifest>;

export interface ObjectConditions {
  /** Ensures that objects are not transferred if a specific maximum time has elapsed since the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation`and the "last modification time" of the object is less than the value of max_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred. */
  maxTimeElapsedSinceLastModification?: string;
  /** If you specify `exclude_prefixes`, Storage Transfer Service uses the items in the `exclude_prefixes` array to determine which objects to exclude from a transfer. Objects must not start with one of the matching `exclude_prefixes` for inclusion in a transfer. The following are requirements of `exclude_prefixes`: * Each exclude-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each exclude-prefix must omit the leading slash. For example, to exclude the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the exclude-prefix as `logs/y=2015/requests.gz`. * None of the exclude-prefix values can be empty, if specified. * Each exclude-prefix must exclude a distinct portion of the object namespace. No exclude-prefix may be a prefix of another exclude-prefix. * If include_prefixes is specified, then each exclude-prefix must start with the value of a path explicitly included by `include_prefixes`. The max size of `exclude_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers). */
  excludePrefixes?: Array<string>;
  /** Ensures that objects are not transferred until a specific minimum time has elapsed after the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation` and the "last modification time" of the object is equal to or greater than the value of min_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred. */
  minTimeElapsedSinceLastModification?: string;
  /** Optional. If specified, only objects matching this glob are transferred. */
  matchGlob?: string;
  /** If specified, only objects with a "last modification time" on or after this timestamp and objects that don't have a "last modification time" are transferred. The `last_modified_since` and `last_modified_before` fields can be used together for chunked data processing. For example, consider a script that processes each day's worth of data at a time. For that you'd set each of the fields as follows: * `last_modified_since` to the start of the day * `last_modified_before` to the end of the day */
  lastModifiedSince?: string;
  /** If you specify `include_prefixes`, Storage Transfer Service uses the items in the `include_prefixes` array to determine which objects to include in a transfer. Objects must start with one of the matching `include_prefixes` for inclusion in the transfer. If exclude_prefixes is specified, objects must not start with any of the `exclude_prefixes` specified for inclusion in the transfer. The following are requirements of `include_prefixes`: * Each include-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each include-prefix must omit the leading slash. For example, to include the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the include-prefix as `logs/y=2015/requests.gz`. * None of the include-prefix values can be empty, if specified. * Each include-prefix must include a distinct portion of the object namespace. No include-prefix may be a prefix of another include-prefix. The max size of `include_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers). */
  includePrefixes?: Array<string>;
  /** If specified, only objects with a "last modification time" before this timestamp and objects that don't have a "last modification time" are transferred. */
  lastModifiedBefore?: string;
}

export const ObjectConditions: Schema.Schema<ObjectConditions> = Schema.suspend(() => Schema.Struct({
  maxTimeElapsedSinceLastModification: Schema.optional(Schema.String),
  excludePrefixes: Schema.optional(Schema.Array(Schema.String)),
  minTimeElapsedSinceLastModification: Schema.optional(Schema.String),
  matchGlob: Schema.optional(Schema.String),
  lastModifiedSince: Schema.optional(Schema.String),
  includePrefixes: Schema.optional(Schema.Array(Schema.String)),
  lastModifiedBefore: Schema.optional(Schema.String),
})).annotate({ identifier: "ObjectConditions" }) as any as Schema.Schema<ObjectConditions>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface AwsAccessKey {
  /** Required. AWS secret access key. This field is not returned in RPC responses. */
  secretAccessKey?: string;
  /** Required. AWS access key ID. */
  accessKeyId?: string;
}

export const AwsAccessKey: Schema.Schema<AwsAccessKey> = Schema.suspend(() => Schema.Struct({
  secretAccessKey: Schema.optional(Schema.String),
  accessKeyId: Schema.optional(Schema.String),
})).annotate({ identifier: "AwsAccessKey" }) as any as Schema.Schema<AwsAccessKey>;

export interface S3CompatibleMetadata {
  /** Specifies the network protocol of the agent. When not specified, the default value of NetworkProtocol NETWORK_PROTOCOL_HTTPS is used. */
  protocol?: "NETWORK_PROTOCOL_UNSPECIFIED" | "NETWORK_PROTOCOL_HTTPS" | "NETWORK_PROTOCOL_HTTP" | (string & {});
  /** Specifies the API request model used to call the storage service. When not specified, the default value of RequestModel REQUEST_MODEL_VIRTUAL_HOSTED_STYLE is used. */
  requestModel?: "REQUEST_MODEL_UNSPECIFIED" | "REQUEST_MODEL_VIRTUAL_HOSTED_STYLE" | "REQUEST_MODEL_PATH_STYLE" | (string & {});
  /** Specifies the authentication and authorization method used by the storage service. When not specified, Transfer Service will attempt to determine right auth method to use. */
  authMethod?: "AUTH_METHOD_UNSPECIFIED" | "AUTH_METHOD_AWS_SIGNATURE_V4" | "AUTH_METHOD_AWS_SIGNATURE_V2" | (string & {});
  /** The Listing API to use for discovering objects. When not specified, Transfer Service will attempt to determine the right API to use. */
  listApi?: "LIST_API_UNSPECIFIED" | "LIST_OBJECTS_V2" | "LIST_OBJECTS" | (string & {});
}

export const S3CompatibleMetadata: Schema.Schema<S3CompatibleMetadata> = Schema.suspend(() => Schema.Struct({
  protocol: Schema.optional(Schema.String),
  requestModel: Schema.optional(Schema.String),
  authMethod: Schema.optional(Schema.String),
  listApi: Schema.optional(Schema.String),
})).annotate({ identifier: "S3CompatibleMetadata" }) as any as Schema.Schema<S3CompatibleMetadata>;

export interface AwsS3CompatibleData {
  /** Required. Specifies the name of the bucket. */
  bucketName?: string;
  /** Required. Specifies the endpoint of the storage service. */
  endpoint?: string;
  /** Specifies the root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. */
  path?: string;
  /** A S3 compatible metadata. */
  s3Metadata?: S3CompatibleMetadata;
  /** Specifies the region to sign requests with. This can be left blank if requests should be signed with an empty region. */
  region?: string;
}

export const AwsS3CompatibleData: Schema.Schema<AwsS3CompatibleData> = Schema.suspend(() => Schema.Struct({
  bucketName: Schema.optional(Schema.String),
  endpoint: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  s3Metadata: Schema.optional(S3CompatibleMetadata),
  region: Schema.optional(Schema.String),
})).annotate({ identifier: "AwsS3CompatibleData" }) as any as Schema.Schema<AwsS3CompatibleData>;

export interface BandwidthLimit {
  /** Bandwidth rate in megabytes per second, distributed across all the agents in the pool. */
  limitMbps?: string;
}

export const BandwidthLimit: Schema.Schema<BandwidthLimit> = Schema.suspend(() => Schema.Struct({
  limitMbps: Schema.optional(Schema.String),
})).annotate({ identifier: "BandwidthLimit" }) as any as Schema.Schema<BandwidthLimit>;

export interface AgentPool {
  /** Specifies the bandwidth limit details. If this field is unspecified, the default value is set as 'No Limit'. */
  bandwidthLimit?: BandwidthLimit;
  /** Specifies the client-specified AgentPool description. */
  displayName?: string;
  /** Required. Specifies a unique string that identifies the agent pool. Format: `projects/{project_id}/agentPools/{agent_pool_id}` */
  name?: string;
  /** Output only. Specifies the state of the AgentPool. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "CREATED" | "DELETING" | (string & {});
}

export const AgentPool: Schema.Schema<AgentPool> = Schema.suspend(() => Schema.Struct({
  bandwidthLimit: Schema.optional(BandwidthLimit),
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "AgentPool" }) as any as Schema.Schema<AgentPool>;

export interface ListAgentPoolsResponse {
  /** A list of agent pools. */
  agentPools?: Array<AgentPool>;
  /** The list next page token. */
  nextPageToken?: string;
}

export const ListAgentPoolsResponse: Schema.Schema<ListAgentPoolsResponse> = Schema.suspend(() => Schema.Struct({
  agentPools: Schema.optional(Schema.Array(AgentPool)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAgentPoolsResponse" }) as any as Schema.Schema<ListAgentPoolsResponse>;

export interface NotificationConfig {
  /** Required. The desired format of the notification message payloads. */
  payloadFormat?: "PAYLOAD_FORMAT_UNSPECIFIED" | "NONE" | "JSON" | (string & {});
  /** Event types for which a notification is desired. If empty, send notifications for all event types. */
  eventTypes?: Array<"EVENT_TYPE_UNSPECIFIED" | "TRANSFER_OPERATION_SUCCESS" | "TRANSFER_OPERATION_FAILED" | "TRANSFER_OPERATION_ABORTED" | (string & {})>;
  /** Required. The `Topic.name` of the Pub/Sub topic to which to publish notifications. Must be of the format: `projects/{project}/topics/{topic}`. Not matching this format results in an INVALID_ARGUMENT error. */
  pubsubTopic?: string;
}

export const NotificationConfig: Schema.Schema<NotificationConfig> = Schema.suspend(() => Schema.Struct({
  payloadFormat: Schema.optional(Schema.String),
  eventTypes: Schema.optional(Schema.Array(Schema.String)),
  pubsubTopic: Schema.optional(Schema.String),
})).annotate({ identifier: "NotificationConfig" }) as any as Schema.Schema<NotificationConfig>;

export interface TimeOfDay {
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() => Schema.Struct({
  nanos: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
  hours: Schema.optional(Schema.Number),
})).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface Storagetransfer_Date {
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
}

export const Storagetransfer_Date: Schema.Schema<Storagetransfer_Date> = Schema.suspend(() => Schema.Struct({
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
  year: Schema.optional(Schema.Number),
})).annotate({ identifier: "Storagetransfer_Date" }) as any as Schema.Schema<Storagetransfer_Date>;

export interface Schedule {
  /** The time in UTC that a transfer job is scheduled to run. Transfers may start later than this time. If `start_time_of_day` is not specified: * One-time transfers run immediately. * Recurring transfers run immediately, and each day at midnight UTC, through schedule_end_date. If `start_time_of_day` is specified: * One-time transfers run at the specified time. * Recurring transfers run at the specified time each day, through `schedule_end_date`. */
  startTimeOfDay?: TimeOfDay;
  /** Interval between the start of each scheduled TransferOperation. If unspecified, the default value is 24 hours. This value may not be less than 1 hour. */
  repeatInterval?: string;
  /** Required. The start date of a transfer. Date boundaries are determined relative to UTC time. If `schedule_start_date` and start_time_of_day are in the past relative to the job's creation time, the transfer starts the day after you schedule the transfer request. **Note:** When starting jobs at or near midnight UTC it is possible that a job starts later than expected. For example, if you send an outbound request on June 1 one millisecond prior to midnight UTC and the Storage Transfer Service server receives the request on June 2, then it creates a TransferJob with `schedule_start_date` set to June 2 and a `start_time_of_day` set to midnight UTC. The first scheduled TransferOperation takes place on June 3 at midnight UTC. */
  scheduleStartDate?: Storagetransfer_Date;
  /** The last day a transfer runs. Date boundaries are determined relative to UTC time. A job runs once per 24 hours within the following guidelines: * If `schedule_end_date` and schedule_start_date are the same and in the future relative to UTC, the transfer is executed only one time. * If `schedule_end_date` is later than `schedule_start_date` and `schedule_end_date` is in the future relative to UTC, the job runs each day at start_time_of_day through `schedule_end_date`. */
  scheduleEndDate?: Storagetransfer_Date;
  /** The time in UTC that no further transfer operations are scheduled. Combined with schedule_end_date, `end_time_of_day` specifies the end date and time for starting new transfer operations. This field must be greater than or equal to the timestamp corresponding to the combination of schedule_start_date and start_time_of_day, and is subject to the following: * If `end_time_of_day` is not set and `schedule_end_date` is set, then a default value of `23:59:59` is used for `end_time_of_day`. * If `end_time_of_day` is set and `schedule_end_date` is not set, then INVALID_ARGUMENT is returned. */
  endTimeOfDay?: TimeOfDay;
}

export const Schedule: Schema.Schema<Schedule> = Schema.suspend(() => Schema.Struct({
  startTimeOfDay: Schema.optional(TimeOfDay),
  repeatInterval: Schema.optional(Schema.String),
  scheduleStartDate: Schema.optional(Storagetransfer_Date),
  scheduleEndDate: Schema.optional(Storagetransfer_Date),
  endTimeOfDay: Schema.optional(TimeOfDay),
})).annotate({ identifier: "Schedule" }) as any as Schema.Schema<Schedule>;

export interface GcsData {
  /** Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements). */
  bucketName?: string;
  /** Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders). */
  managedFolderTransferEnabled?: boolean;
  /** Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames). */
  path?: string;
}

export const GcsData: Schema.Schema<GcsData> = Schema.suspend(() => Schema.Struct({
  bucketName: Schema.optional(Schema.String),
  managedFolderTransferEnabled: Schema.optional(Schema.Boolean),
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "GcsData" }) as any as Schema.Schema<GcsData>;

export interface MetadataOptions {
  /** Specifies how each file's POSIX group ID (GID) attribute should be handled by the transfer. By default, GID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers. */
  gid?: "GID_UNSPECIFIED" | "GID_SKIP" | "GID_NUMBER" | (string & {});
  /** Specifies how each object's Cloud KMS customer-managed encryption key (CMEK) is preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as KMS_KEY_DESTINATION_BUCKET_DEFAULT. */
  kmsKey?: "KMS_KEY_UNSPECIFIED" | "KMS_KEY_DESTINATION_BUCKET_DEFAULT" | "KMS_KEY_PRESERVE" | (string & {});
  /** Specifies the storage class to set on objects being transferred to Google Cloud Storage buckets. If unspecified, the default behavior is the same as STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT. */
  storageClass?: "STORAGE_CLASS_UNSPECIFIED" | "STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT" | "STORAGE_CLASS_PRESERVE" | "STORAGE_CLASS_STANDARD" | "STORAGE_CLASS_NEARLINE" | "STORAGE_CLASS_COLDLINE" | "STORAGE_CLASS_ARCHIVE" | (string & {});
  /** Specifies how each object's ACLs should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as ACL_DESTINATION_BUCKET_DEFAULT. */
  acl?: "ACL_UNSPECIFIED" | "ACL_DESTINATION_BUCKET_DEFAULT" | "ACL_PRESERVE" | (string & {});
  /** Specifies how each object's `timeCreated` metadata is preserved for transfers. If unspecified, the default behavior is the same as TIME_CREATED_SKIP. This behavior is supported for transfers to Cloud Storage buckets from Cloud Storage, Amazon S3, S3-compatible storage, and Azure sources. */
  timeCreated?: "TIME_CREATED_UNSPECIFIED" | "TIME_CREATED_SKIP" | "TIME_CREATED_PRESERVE_AS_CUSTOM_TIME" | (string & {});
  /** Specifies how each object's temporary hold status should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as TEMPORARY_HOLD_PRESERVE. */
  temporaryHold?: "TEMPORARY_HOLD_UNSPECIFIED" | "TEMPORARY_HOLD_SKIP" | "TEMPORARY_HOLD_PRESERVE" | (string & {});
  /** Specifies how symlinks should be handled by the transfer. By default, symlinks are not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers. */
  symlink?: "SYMLINK_UNSPECIFIED" | "SYMLINK_SKIP" | "SYMLINK_PRESERVE" | (string & {});
  /** Specifies how each file's mode attribute should be handled by the transfer. By default, mode is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers. */
  mode?: "MODE_UNSPECIFIED" | "MODE_SKIP" | "MODE_PRESERVE" | (string & {});
  /** Specifies how each file's POSIX user ID (UID) attribute should be handled by the transfer. By default, UID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers. */
  uid?: "UID_UNSPECIFIED" | "UID_SKIP" | "UID_NUMBER" | (string & {});
}

export const MetadataOptions: Schema.Schema<MetadataOptions> = Schema.suspend(() => Schema.Struct({
  gid: Schema.optional(Schema.String),
  kmsKey: Schema.optional(Schema.String),
  storageClass: Schema.optional(Schema.String),
  acl: Schema.optional(Schema.String),
  timeCreated: Schema.optional(Schema.String),
  temporaryHold: Schema.optional(Schema.String),
  symlink: Schema.optional(Schema.String),
  mode: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
})).annotate({ identifier: "MetadataOptions" }) as any as Schema.Schema<MetadataOptions>;

export interface TransferOptions {
  /** Whether objects that exist only in the sink should be deleted. **Note:** This option and delete_objects_from_source_after_transfer are mutually exclusive. */
  deleteObjectsUniqueInSink?: boolean;
  /** When to overwrite objects that already exist in the sink. The default is that only objects that are different from the source are overwritten. If true, all objects in the sink whose name matches an object in the source are overwritten with the source object. */
  overwriteObjectsAlreadyExistingInSink?: boolean;
  /** Whether objects should be deleted from the source after they are transferred to the sink. **Note:** This option and delete_objects_unique_in_sink are mutually exclusive. */
  deleteObjectsFromSourceAfterTransfer?: boolean;
  /** Represents the selected metadata options for a transfer job. */
  metadataOptions?: MetadataOptions;
  /** When to overwrite objects that already exist in the sink. If not set, overwrite behavior is determined by overwrite_objects_already_existing_in_sink. */
  overwriteWhen?: "OVERWRITE_WHEN_UNSPECIFIED" | "DIFFERENT" | "NEVER" | "ALWAYS" | (string & {});
}

export const TransferOptions: Schema.Schema<TransferOptions> = Schema.suspend(() => Schema.Struct({
  deleteObjectsUniqueInSink: Schema.optional(Schema.Boolean),
  overwriteObjectsAlreadyExistingInSink: Schema.optional(Schema.Boolean),
  deleteObjectsFromSourceAfterTransfer: Schema.optional(Schema.Boolean),
  metadataOptions: Schema.optional(MetadataOptions),
  overwriteWhen: Schema.optional(Schema.String),
})).annotate({ identifier: "TransferOptions" }) as any as Schema.Schema<TransferOptions>;

export interface ReplicationSpec {
  /** The Cloud Storage bucket to which to replicate objects. */
  gcsDataSink?: GcsData;
  /** Object conditions that determine which objects are transferred. For replication jobs, only `include_prefixes` and `exclude_prefixes` are supported. */
  objectConditions?: ObjectConditions;
  /** The Cloud Storage bucket from which to replicate objects. */
  gcsDataSource?: GcsData;
  /** Specifies the metadata options to be applied during replication. Delete options are not supported. If a delete option is specified, the request fails with an INVALID_ARGUMENT error. */
  transferOptions?: TransferOptions;
}

export const ReplicationSpec: Schema.Schema<ReplicationSpec> = Schema.suspend(() => Schema.Struct({
  gcsDataSink: Schema.optional(GcsData),
  objectConditions: Schema.optional(ObjectConditions),
  gcsDataSource: Schema.optional(GcsData),
  transferOptions: Schema.optional(TransferOptions),
})).annotate({ identifier: "ReplicationSpec" }) as any as Schema.Schema<ReplicationSpec>;

export interface LoggingConfig {
  /** States in which `log_actions` are logged. If empty, no logs are generated. */
  logActionStates?: Array<"LOGGABLE_ACTION_STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | "SKIPPED" | (string & {})>;
  /** For PosixFilesystem transfers, enables [file system transfer logs](https://cloud.google.com/storage-transfer/docs/on-prem-transfer-log-format) instead of, or in addition to, Cloud Logging. This option ignores [LoggableAction] and [LoggableActionState]. If these are set, Cloud Logging will also be enabled for this transfer. */
  enableOnpremGcsTransferLogs?: boolean;
  /** Specifies the actions to be logged. If empty, no logs are generated. */
  logActions?: Array<"LOGGABLE_ACTION_UNSPECIFIED" | "FIND" | "DELETE" | "COPY" | (string & {})>;
}

export const LoggingConfig: Schema.Schema<LoggingConfig> = Schema.suspend(() => Schema.Struct({
  logActionStates: Schema.optional(Schema.Array(Schema.String)),
  enableOnpremGcsTransferLogs: Schema.optional(Schema.Boolean),
  logActions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "LoggingConfig" }) as any as Schema.Schema<LoggingConfig>;

export interface PosixFilesystem {
  /** Root directory path to the filesystem. */
  rootDirectory?: string;
}

export const PosixFilesystem: Schema.Schema<PosixFilesystem> = Schema.suspend(() => Schema.Struct({
  rootDirectory: Schema.optional(Schema.String),
})).annotate({ identifier: "PosixFilesystem" }) as any as Schema.Schema<PosixFilesystem>;

export interface HdfsData {
  /** Root path to transfer files. */
  path?: string;
}

export const HdfsData: Schema.Schema<HdfsData> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "HdfsData" }) as any as Schema.Schema<HdfsData>;

export interface AwsS3Data {
  /** Egress bytes over a Google-managed private network. This network is shared between other users of Storage Transfer Service. */
  managedPrivateNetwork?: boolean;
  /** Input only. AWS access key used to sign the API requests to the AWS S3 bucket. Permissions on the bucket must be granted to the access ID of the AWS access key. For information on our data retention policy for user credentials, see [User credentials](/storage-transfer/docs/data-retention#user-credentials). */
  awsAccessKey?: AwsAccessKey;
  /** Optional. The CloudFront distribution domain name pointing to this bucket, to use when fetching. See [Transfer from S3 via CloudFront](https://cloud.google.com/storage-transfer/docs/s3-cloudfront) for more information. Format: `https://{id}.cloudfront.net` or any valid custom domain. Must begin with `https://`. */
  cloudfrontDomain?: string;
  /** Service Directory Service to be used as the endpoint for transfers from a custom VPC. Format: `projects/{project_id}/locations/{location}/namespaces/{namespace}/services/{service}` */
  privateNetworkService?: string;
  /** Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. */
  path?: string;
  /** The Amazon Resource Name (ARN) of the role to support temporary credentials via `AssumeRoleWithWebIdentity`. For more information about ARNs, see [IAM ARNs](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html#identifiers-arns). When a role ARN is provided, Transfer Service fetches temporary credentials for the session using a `AssumeRoleWithWebIdentity` call for the provided role using the GoogleServiceAccount for this project. */
  roleArn?: string;
  /** Required. S3 Bucket name (see [Creating a bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/create-bucket-get-location-example.html)). */
  bucketName?: string;
  /** Optional. The Resource name of a secret in Secret Manager. AWS credentials must be stored in Secret Manager in JSON format: { "access_key_id": "ACCESS_KEY_ID", "secret_access_key": "SECRET_ACCESS_KEY" } GoogleServiceAccount must be granted `roles/secretmanager.secretAccessor` for the resource. See [Configure access to a source: Amazon S3] (https://cloud.google.com/storage-transfer/docs/source-amazon-s3#secret_manager) for more information. If `credentials_secret` is specified, do not specify role_arn or aws_access_key. Format: `projects/{project_number}/secrets/{secret_name}` */
  credentialsSecret?: string;
}

export const AwsS3Data: Schema.Schema<AwsS3Data> = Schema.suspend(() => Schema.Struct({
  managedPrivateNetwork: Schema.optional(Schema.Boolean),
  awsAccessKey: Schema.optional(AwsAccessKey),
  cloudfrontDomain: Schema.optional(Schema.String),
  privateNetworkService: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  roleArn: Schema.optional(Schema.String),
  bucketName: Schema.optional(Schema.String),
  credentialsSecret: Schema.optional(Schema.String),
})).annotate({ identifier: "AwsS3Data" }) as any as Schema.Schema<AwsS3Data>;

export interface HttpData {
  /** Required. The URL that points to the file that stores the object list entries. This file must allow public access. The URL is either an HTTP/HTTPS address (e.g. `https://example.com/urllist.tsv`) or a Cloud Storage path (e.g. `gs://my-bucket/urllist.tsv`). */
  listUrl?: string;
}

export const HttpData: Schema.Schema<HttpData> = Schema.suspend(() => Schema.Struct({
  listUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "HttpData" }) as any as Schema.Schema<HttpData>;

export interface TransferSpec {
  /** A manifest file provides a list of objects to be transferred from the data source. This field points to the location of the manifest file. Otherwise, the entire source bucket is used. ObjectConditions still apply. */
  transferManifest?: TransferManifest;
  /** If the option delete_objects_unique_in_sink is `true` and time-based object conditions such as 'last modification time' are specified, the request fails with an INVALID_ARGUMENT error. */
  transferOptions?: TransferOptions;
  /** Optional. An Azure Blob Storage data source. */
  azureBlobStorageDataSource?: AzureBlobStorageData;
  /** Optional. A POSIX Filesystem data sink. */
  posixDataSink?: PosixFilesystem;
  /** Optional. An AWS S3 compatible data source. */
  awsS3CompatibleDataSource?: AwsS3CompatibleData;
  /** Optional. A POSIX Filesystem data source. */
  posixDataSource?: PosixFilesystem;
  /** Optional. An HDFS cluster data source. */
  hdfsDataSource?: HdfsData;
  /** Only objects that satisfy these object conditions are included in the set of data source and data sink objects. Object conditions based on objects' "last modification time" do not exclude objects in a data sink. */
  objectConditions?: ObjectConditions;
  /** Specifies the agent pool name associated with the posix data source. When unspecified, the default name is used. */
  sourceAgentPoolName?: string;
  /** Optional. An AWS S3 data source. */
  awsS3DataSource?: AwsS3Data;
  /** Optional. A Cloud Storage data source. */
  gcsDataSource?: GcsData;
  /** For transfers between file systems, specifies a Cloud Storage bucket to be used as an intermediate location through which to transfer data. See [Transfer data between file systems](https://cloud.google.com/storage-transfer/docs/file-to-file) for more information. */
  gcsIntermediateDataLocation?: GcsData;
  /** Optional. An HTTP URL data source. */
  httpDataSource?: HttpData;
  /** Specifies the agent pool name associated with the posix data sink. When unspecified, the default name is used. */
  sinkAgentPoolName?: string;
  /** Optional. A Cloud Storage data sink. */
  gcsDataSink?: GcsData;
}

export const TransferSpec: Schema.Schema<TransferSpec> = Schema.suspend(() => Schema.Struct({
  transferManifest: Schema.optional(TransferManifest),
  transferOptions: Schema.optional(TransferOptions),
  azureBlobStorageDataSource: Schema.optional(AzureBlobStorageData),
  posixDataSink: Schema.optional(PosixFilesystem),
  awsS3CompatibleDataSource: Schema.optional(AwsS3CompatibleData),
  posixDataSource: Schema.optional(PosixFilesystem),
  hdfsDataSource: Schema.optional(HdfsData),
  objectConditions: Schema.optional(ObjectConditions),
  sourceAgentPoolName: Schema.optional(Schema.String),
  awsS3DataSource: Schema.optional(AwsS3Data),
  gcsDataSource: Schema.optional(GcsData),
  gcsIntermediateDataLocation: Schema.optional(GcsData),
  httpDataSource: Schema.optional(HttpData),
  sinkAgentPoolName: Schema.optional(Schema.String),
  gcsDataSink: Schema.optional(GcsData),
})).annotate({ identifier: "TransferSpec" }) as any as Schema.Schema<TransferSpec>;

export interface EventStream {
  /** Specifies the date and time that Storage Transfer Service starts listening for events from this stream. If no start time is specified or start time is in the past, Storage Transfer Service starts listening immediately. */
  eventStreamStartTime?: string;
  /** Specifies the data and time at which Storage Transfer Service stops listening for events from this stream. After this time, any transfers in progress will complete, but no new transfers are initiated. */
  eventStreamExpirationTime?: string;
  /** Required. Specifies a unique name of the resource such as AWS SQS ARN in the form 'arn:aws:sqs:region:account_id:queue_name', or Pub/Sub subscription resource name in the form 'projects/{project}/subscriptions/{sub}'. */
  name?: string;
}

export const EventStream: Schema.Schema<EventStream> = Schema.suspend(() => Schema.Struct({
  eventStreamStartTime: Schema.optional(Schema.String),
  eventStreamExpirationTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "EventStream" }) as any as Schema.Schema<EventStream>;

export interface TransferJob {
  /** Notification configuration. */
  notificationConfig?: NotificationConfig;
  /** The name of the most recently started TransferOperation of this JobConfig. Present if a TransferOperation has been created for this JobConfig. */
  latestOperationName?: string;
  /** Output only. The time that the transfer job was created. */
  creationTime?: string;
  /** The ID of the Google Cloud project that owns the job. */
  projectId?: string;
  /** Specifies schedule for the transfer job. This is an optional field. When the field is not set, the job never executes a transfer, unless you invoke RunTransferJob or update the job to have a non-empty schedule. */
  schedule?: Schedule;
  /** A description provided by the user for the job. Its max length is 1024 bytes when Unicode-encoded. */
  description?: string;
  /** Replication specification. */
  replicationSpec?: ReplicationSpec;
  /** Status of the job. This value MUST be specified for `CreateTransferJobRequests`. **Note:** The effect of the new job status takes place during a subsequent job run. For example, if you change the job status from ENABLED to DISABLED, and an operation spawned by the transfer is running, the status change would not affect the current operation. */
  status?: "STATUS_UNSPECIFIED" | "ENABLED" | "DISABLED" | "DELETED" | (string & {});
  /** A unique name (within the transfer project) assigned when the job is created. If this field is empty in a CreateTransferJobRequest, Storage Transfer Service assigns a unique name. Otherwise, the specified name is used as the unique name for this job. If the specified name is in use by a job, the creation request fails with an ALREADY_EXISTS error. This name must start with `"transferJobs/"` prefix and end with a letter or a number, and should be no more than 128 characters. For transfers involving PosixFilesystem, this name must start with `transferJobs/OPI` specifically. For all other transfer types, this name must not start with `transferJobs/OPI`. Non-PosixFilesystem example: `"transferJobs/^(?!OPI)[A-Za-z0-9-._~]*[A-Za-z0-9]$"` PosixFilesystem example: `"transferJobs/OPI^[A-Za-z0-9-._~]*[A-Za-z0-9]$"` Applications must not rely on the enforcement of naming requirements involving OPI. Invalid job names fail with an INVALID_ARGUMENT error. */
  name?: string;
  /** Logging configuration. */
  loggingConfig?: LoggingConfig;
  /** Transfer specification. */
  transferSpec?: TransferSpec;
  /** Specifies the event stream for the transfer job for event-driven transfers. When EventStream is specified, the Schedule fields are ignored. */
  eventStream?: EventStream;
  /** Optional. The user-managed service account to which to delegate service agent permissions. You can grant Cloud Storage bucket permissions to this service account instead of to the Transfer Service service agent. Either the service account email (`SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`) or the unique ID (`123456789012345678901`) are accepted. See https://docs.cloud.google.com/storage-transfer/docs/delegate-service-agent-permissions for required permissions. */
  serviceAccount?: string;
  /** Output only. The time that the transfer job was last modified. */
  lastModificationTime?: string;
  /** Output only. The time that the transfer job was deleted. */
  deletionTime?: string;
}

export const TransferJob: Schema.Schema<TransferJob> = Schema.suspend(() => Schema.Struct({
  notificationConfig: Schema.optional(NotificationConfig),
  latestOperationName: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  schedule: Schema.optional(Schedule),
  description: Schema.optional(Schema.String),
  replicationSpec: Schema.optional(ReplicationSpec),
  status: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  loggingConfig: Schema.optional(LoggingConfig),
  transferSpec: Schema.optional(TransferSpec),
  eventStream: Schema.optional(EventStream),
  serviceAccount: Schema.optional(Schema.String),
  lastModificationTime: Schema.optional(Schema.String),
  deletionTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TransferJob" }) as any as Schema.Schema<TransferJob>;

export interface ErrorLogEntry {
  /** Optional. A list of messages that carry the error details. */
  errorDetails?: Array<string>;
  /** Output only. A URL that refers to the target (a data source, a data sink, or an object) with which the error is associated. */
  url?: string;
}

export const ErrorLogEntry: Schema.Schema<ErrorLogEntry> = Schema.suspend(() => Schema.Struct({
  errorDetails: Schema.optional(Schema.Array(Schema.String)),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "ErrorLogEntry" }) as any as Schema.Schema<ErrorLogEntry>;

export interface ErrorSummary {
  /** Required. */
  errorCode?: "OK" | "CANCELLED" | "UNKNOWN" | "INVALID_ARGUMENT" | "DEADLINE_EXCEEDED" | "NOT_FOUND" | "ALREADY_EXISTS" | "PERMISSION_DENIED" | "UNAUTHENTICATED" | "RESOURCE_EXHAUSTED" | "FAILED_PRECONDITION" | "ABORTED" | "OUT_OF_RANGE" | "UNIMPLEMENTED" | "INTERNAL" | "UNAVAILABLE" | "DATA_LOSS" | (string & {});
  /** Required. Count of this type of error. */
  errorCount?: string;
  /** Error samples. At most 5 error log entries are recorded for a given error code for a single transfer operation. */
  errorLogEntries?: Array<ErrorLogEntry>;
}

export const ErrorSummary: Schema.Schema<ErrorSummary> = Schema.suspend(() => Schema.Struct({
  errorCode: Schema.optional(Schema.String),
  errorCount: Schema.optional(Schema.String),
  errorLogEntries: Schema.optional(Schema.Array(ErrorLogEntry)),
})).annotate({ identifier: "ErrorSummary" }) as any as Schema.Schema<ErrorSummary>;

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

export interface Operation {
  /** The server-assigned unique name. The format of `name` is `transferOperations/some/unique/name`. */
  name?: string;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** Represents the transfer operation object. To request a TransferOperation object, use transferOperations.get. */
  metadata?: Record<string, unknown>;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  done: Schema.optional(Schema.Boolean),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  error: Schema.optional(Status),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface TransferCounters {
  /** Bytes that failed to be deleted from the data sink. */
  bytesFailedToDeleteFromSink?: string;
  /** Objects found in the data source that are scheduled to be transferred, excluding any that are filtered based on object conditions or skipped due to sync. */
  objectsFoundFromSource?: string;
  /** Number of intermediate objects failed cleaned up. */
  intermediateObjectsFailedCleanedUp?: string;
  /** Bytes that are deleted from the data sink. */
  bytesDeletedFromSink?: string;
  /** For transfers involving PosixFilesystem only. Number of successful listings for each directory found at the source. */
  directoriesSuccessfullyListedFromSource?: string;
  /** Objects in the data source that are not transferred because they already exist in the data sink. */
  objectsFromSourceSkippedBySync?: string;
  /** Bytes found only in the data sink that are scheduled to be deleted. */
  bytesFoundOnlyFromSink?: string;
  /** For transfers involving PosixFilesystem only. Number of directories found while listing. For example, if the root directory of the transfer is `base/` and there are two other directories, `a/` and `b/` under this directory, the count after listing `base/`, `base/a/` and `base/b/` is 3. */
  directoriesFoundFromSource?: string;
  /** Number of glacier objects skipped, glacier objects are unsupported by default regardless of the restore status. Allowlist the project to copy glacier objects if needed. */
  unsupportedS3GlacierObjectsSkippedCount?: string;
  /** Objects that are copied to the data sink. */
  objectsCopiedToSink?: string;
  /** Objects found only in the data sink that are scheduled to be deleted. */
  objectsFoundOnlyFromSink?: string;
  /** Objects that are deleted from the data source. */
  objectsDeletedFromSource?: string;
  /** Bytes that are copied to the data sink. */
  bytesCopiedToSink?: string;
  /** Bytes in the data source that failed to be transferred or that failed to be deleted after being transferred. */
  bytesFromSourceFailed?: string;
  /** For transfers involving PosixFilesystem only. Number of listing failures for each directory found at the source. Potential failures when listing a directory include permission failure or block failure. If listing a directory fails, no files in the directory are transferred. */
  directoriesFailedToListFromSource?: string;
  /** Objects that failed to be deleted from the data sink. */
  objectsFailedToDeleteFromSink?: string;
  /** Number of unrestored deep archive objects skipped. */
  unrestoredDeepArchiveObjectsSkippedCount?: string;
  /** Bytes found in the data source that are scheduled to be transferred, excluding any that are filtered based on object conditions or skipped due to sync. */
  bytesFoundFromSource?: string;
  /** Bytes that are deleted from the data source. */
  bytesDeletedFromSource?: string;
  /** Number of successfully cleaned up intermediate objects. */
  intermediateObjectsCleanedUp?: string;
  /** Objects in the data source that failed to be transferred or that failed to be deleted after being transferred. */
  objectsFromSourceFailed?: string;
  /** Objects that are deleted from the data sink. */
  objectsDeletedFromSink?: string;
  /** Bytes in the data source that are not transferred because they already exist in the data sink. */
  bytesFromSourceSkippedBySync?: string;
}

export const TransferCounters: Schema.Schema<TransferCounters> = Schema.suspend(() => Schema.Struct({
  bytesFailedToDeleteFromSink: Schema.optional(Schema.String),
  objectsFoundFromSource: Schema.optional(Schema.String),
  intermediateObjectsFailedCleanedUp: Schema.optional(Schema.String),
  bytesDeletedFromSink: Schema.optional(Schema.String),
  directoriesSuccessfullyListedFromSource: Schema.optional(Schema.String),
  objectsFromSourceSkippedBySync: Schema.optional(Schema.String),
  bytesFoundOnlyFromSink: Schema.optional(Schema.String),
  directoriesFoundFromSource: Schema.optional(Schema.String),
  unsupportedS3GlacierObjectsSkippedCount: Schema.optional(Schema.String),
  objectsCopiedToSink: Schema.optional(Schema.String),
  objectsFoundOnlyFromSink: Schema.optional(Schema.String),
  objectsDeletedFromSource: Schema.optional(Schema.String),
  bytesCopiedToSink: Schema.optional(Schema.String),
  bytesFromSourceFailed: Schema.optional(Schema.String),
  directoriesFailedToListFromSource: Schema.optional(Schema.String),
  objectsFailedToDeleteFromSink: Schema.optional(Schema.String),
  unrestoredDeepArchiveObjectsSkippedCount: Schema.optional(Schema.String),
  bytesFoundFromSource: Schema.optional(Schema.String),
  bytesDeletedFromSource: Schema.optional(Schema.String),
  intermediateObjectsCleanedUp: Schema.optional(Schema.String),
  objectsFromSourceFailed: Schema.optional(Schema.String),
  objectsDeletedFromSink: Schema.optional(Schema.String),
  bytesFromSourceSkippedBySync: Schema.optional(Schema.String),
})).annotate({ identifier: "TransferCounters" }) as any as Schema.Schema<TransferCounters>;

export interface TransferOperation {
  /** A globally unique ID assigned by the system. */
  name?: string;
  /** The name of the transfer job that triggers this transfer operation. */
  transferJobName?: string;
  /** The ID of the Google Cloud project that owns the operation. */
  projectId?: string;
  /** Notification configuration. */
  notificationConfig?: NotificationConfig;
  /** Start time of this transfer execution. */
  startTime?: string;
  /** Summarizes errors encountered with sample error log entries. */
  errorBreakdowns?: Array<ErrorSummary>;
  /** Information about the progress of the transfer operation. */
  counters?: TransferCounters;
  /** Status of the transfer operation. */
  status?: "STATUS_UNSPECIFIED" | "IN_PROGRESS" | "PAUSED" | "SUCCESS" | "FAILED" | "ABORTED" | "QUEUED" | "SUSPENDING" | (string & {});
  /** Cloud Logging configuration. */
  loggingConfig?: LoggingConfig;
  /** Transfer specification. */
  transferSpec?: TransferSpec;
  /** End time of this transfer execution. */
  endTime?: string;
}

export const TransferOperation: Schema.Schema<TransferOperation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  transferJobName: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  notificationConfig: Schema.optional(NotificationConfig),
  startTime: Schema.optional(Schema.String),
  errorBreakdowns: Schema.optional(Schema.Array(ErrorSummary)),
  counters: Schema.optional(TransferCounters),
  status: Schema.optional(Schema.String),
  loggingConfig: Schema.optional(LoggingConfig),
  transferSpec: Schema.optional(TransferSpec),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TransferOperation" }) as any as Schema.Schema<TransferOperation>;

export interface GoogleServiceAccount {
  /** Email address of the service account. */
  accountEmail?: string;
  /** Unique identifier for the service account. */
  subjectId?: string;
}

export const GoogleServiceAccount: Schema.Schema<GoogleServiceAccount> = Schema.suspend(() => Schema.Struct({
  accountEmail: Schema.optional(Schema.String),
  subjectId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleServiceAccount" }) as any as Schema.Schema<GoogleServiceAccount>;

export interface PauseTransferOperationRequest {
}

export const PauseTransferOperationRequest: Schema.Schema<PauseTransferOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PauseTransferOperationRequest" }) as any as Schema.Schema<PauseTransferOperationRequest>;

export interface ListTransferJobsResponse {
  /** A list of transfer jobs. */
  transferJobs?: Array<TransferJob>;
  /** The list next page token. */
  nextPageToken?: string;
}

export const ListTransferJobsResponse: Schema.Schema<ListTransferJobsResponse> = Schema.suspend(() => Schema.Struct({
  transferJobs: Schema.optional(Schema.Array(TransferJob)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTransferJobsResponse" }) as any as Schema.Schema<ListTransferJobsResponse>;

export interface ResumeTransferOperationRequest {
}

export const ResumeTransferOperationRequest: Schema.Schema<ResumeTransferOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResumeTransferOperationRequest" }) as any as Schema.Schema<ResumeTransferOperationRequest>;

export interface RunTransferJobRequest {
  /** Required. The ID of the Google Cloud project that owns the transfer job. */
  projectId?: string;
}

export const RunTransferJobRequest: Schema.Schema<RunTransferJobRequest> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "RunTransferJobRequest" }) as any as Schema.Schema<RunTransferJobRequest>;

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

export interface UpdateTransferJobRequest {
  /** The field mask of the fields in `transferJob` that are to be updated in this request. Fields in `transferJob` that can be updated are: description, transfer_spec, notification_config, logging_config, and status. To update the `transfer_spec` of the job, a complete transfer specification must be provided. An incomplete specification missing any required fields is rejected with the error INVALID_ARGUMENT. */
  updateTransferJobFieldMask?: string;
  /** Required. The ID of the Google Cloud project that owns the job. */
  projectId?: string;
  /** Required. The job to update. `transferJob` is expected to specify one or more of five fields: description, transfer_spec, notification_config, logging_config, and status. An `UpdateTransferJobRequest` that specifies other fields are rejected with the error INVALID_ARGUMENT. Updating a job status to DELETED requires `storagetransfer.jobs.delete` permission. */
  transferJob?: TransferJob;
}

export const UpdateTransferJobRequest: Schema.Schema<UpdateTransferJobRequest> = Schema.suspend(() => Schema.Struct({
  updateTransferJobFieldMask: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  transferJob: Schema.optional(TransferJob),
})).annotate({ identifier: "UpdateTransferJobRequest" }) as any as Schema.Schema<UpdateTransferJobRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates an agent pool resource. */
export interface CreateProjectsAgentPoolsRequest {
  /** Required. The ID of the agent pool to create. The `agent_pool_id` must meet the following requirements: * Length of 128 characters or less. * Not start with the string `goog`. * Start with a lowercase ASCII character, followed by: * Zero or more: lowercase Latin alphabet characters, numerals, hyphens (`-`), periods (`.`), underscores (`_`), or tildes (`~`). * One or more numerals or lowercase ASCII characters. As expressed by the regular expression: `^(?!goog)[a-z]([a-z0-9-._~]*[a-z0-9])?$`. */
  agentPoolId?: string;
  /** Required. The ID of the Google Cloud project that owns the agent pool. */
  projectId: string;
  /** Request body */
  body?: AgentPool;
}

export const CreateProjectsAgentPoolsRequest = Schema.Struct({
  agentPoolId: Schema.optional(Schema.String).pipe(T.HttpQuery("agentPoolId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(AgentPool).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/agentPools", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAgentPoolsRequest>;

export type CreateProjectsAgentPoolsResponse = AgentPool;
export const CreateProjectsAgentPoolsResponse = AgentPool;

export type CreateProjectsAgentPoolsError = CommonErrors;

export const createProjectsAgentPools: API.OperationMethod<CreateProjectsAgentPoolsRequest, CreateProjectsAgentPoolsResponse, CreateProjectsAgentPoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAgentPoolsRequest,
  output: CreateProjectsAgentPoolsResponse,
  errors: [],
}));

/** Deletes an agent pool. */
export interface DeleteProjectsAgentPoolsRequest {
  /** Required. The name of the agent pool to delete. */
  name: string;
}

export const DeleteProjectsAgentPoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/agentPools/{agentPoolsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAgentPoolsRequest>;

export type DeleteProjectsAgentPoolsResponse = Empty;
export const DeleteProjectsAgentPoolsResponse = Empty;

export type DeleteProjectsAgentPoolsError = CommonErrors;

export const deleteProjectsAgentPools: API.OperationMethod<DeleteProjectsAgentPoolsRequest, DeleteProjectsAgentPoolsResponse, DeleteProjectsAgentPoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAgentPoolsRequest,
  output: DeleteProjectsAgentPoolsResponse,
  errors: [],
}));

/** Updates an existing agent pool resource. */
export interface PatchProjectsAgentPoolsRequest {
  /** The [field mask] (https://developers.google.com/protocol-buffers/docs/reference/google.protobuf) of the fields in `agentPool` to update in this request. The following `agentPool` fields can be updated: * display_name * bandwidth_limit */
  updateMask?: string;
  /** Required. Specifies a unique string that identifies the agent pool. Format: `projects/{project_id}/agentPools/{agent_pool_id}` */
  name: string;
  /** Request body */
  body?: AgentPool;
}

export const PatchProjectsAgentPoolsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AgentPool).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/agentPools/{agentPoolsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAgentPoolsRequest>;

export type PatchProjectsAgentPoolsResponse = AgentPool;
export const PatchProjectsAgentPoolsResponse = AgentPool;

export type PatchProjectsAgentPoolsError = CommonErrors;

export const patchProjectsAgentPools: API.OperationMethod<PatchProjectsAgentPoolsRequest, PatchProjectsAgentPoolsResponse, PatchProjectsAgentPoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAgentPoolsRequest,
  output: PatchProjectsAgentPoolsResponse,
  errors: [],
}));

/** Lists agent pools. */
export interface ListProjectsAgentPoolsRequest {
  /** The list page size. The max allowed value is `256`. */
  pageSize?: number;
  /** Required. The ID of the Google Cloud project that owns the job. */
  projectId: string;
  /** An optional list of query parameters specified as JSON text in the form of: `{"agentPoolNames":["agentpool1","agentpool2",...]}` Since `agentPoolNames` support multiple values, its values must be specified with array notation. When the filter is either empty or not provided, the list returns all agent pools for the project. */
  filter?: string;
  /** The list page token. */
  pageToken?: string;
}

export const ListProjectsAgentPoolsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/agentPools" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAgentPoolsRequest>;

export type ListProjectsAgentPoolsResponse = ListAgentPoolsResponse;
export const ListProjectsAgentPoolsResponse = ListAgentPoolsResponse;

export type ListProjectsAgentPoolsError = CommonErrors;

export const listProjectsAgentPools = API.makePaginated(() => ({
  input: ListProjectsAgentPoolsRequest,
  output: ListProjectsAgentPoolsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets an agent pool. */
export interface GetProjectsAgentPoolsRequest {
  /** Required. The name of the agent pool to get. */
  name: string;
}

export const GetProjectsAgentPoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/agentPools/{agentPoolsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAgentPoolsRequest>;

export type GetProjectsAgentPoolsResponse = AgentPool;
export const GetProjectsAgentPoolsResponse = AgentPool;

export type GetProjectsAgentPoolsError = CommonErrors;

export const getProjectsAgentPools: API.OperationMethod<GetProjectsAgentPoolsRequest, GetProjectsAgentPoolsResponse, GetProjectsAgentPoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAgentPoolsRequest,
  output: GetProjectsAgentPoolsResponse,
  errors: [],
}));

/** Creates a transfer job that runs periodically. */
export interface CreateTransferJobsRequest {
  /** Request body */
  body?: TransferJob;
}

export const CreateTransferJobsRequest = Schema.Struct({
  body: Schema.optional(TransferJob).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/transferJobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateTransferJobsRequest>;

export type CreateTransferJobsResponse = TransferJob;
export const CreateTransferJobsResponse = TransferJob;

export type CreateTransferJobsError = CommonErrors;

export const createTransferJobs: API.OperationMethod<CreateTransferJobsRequest, CreateTransferJobsResponse, CreateTransferJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateTransferJobsRequest,
  output: CreateTransferJobsResponse,
  errors: [],
}));

/** Lists transfer jobs. */
export interface ListTransferJobsRequest {
  /** Required. A list of query parameters specified as JSON text in the form of: ``` { "projectId":"my_project_id", "jobNames":["jobid1","jobid2",...], "jobStatuses":["status1","status2",...], "dataBackend":"QUERY_REPLICATION_CONFIGS", "sourceBucket":"source-bucket-name", "sinkBucket":"sink-bucket-name", } ``` The JSON formatting in the example is for display only; provide the query parameters without spaces or line breaks. * `projectId` is required. * Since `jobNames` and `jobStatuses` support multiple values, their values must be specified with array notation. `jobNames` and `jobStatuses` are optional. Valid values are case-insensitive: * ENABLED * DISABLED * DELETED * Specify `"dataBackend":"QUERY_REPLICATION_CONFIGS"` to return a list of cross-bucket replication jobs. * Limit the results to jobs from a particular bucket with `sourceBucket` and/or to a particular bucket with `sinkBucket`. */
  filter: string;
  /** The list page size. The max allowed value is 256. */
  pageSize?: number;
  /** The list page token. */
  pageToken?: string;
}

export const ListTransferJobsRequest = Schema.Struct({
  filter: Schema.String.pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/transferJobs" }),
  svc,
) as unknown as Schema.Schema<ListTransferJobsRequest>;

export type ListTransferJobsResponse_Op = ListTransferJobsResponse;
export const ListTransferJobsResponse_Op = ListTransferJobsResponse;

export type ListTransferJobsError = CommonErrors;

export const listTransferJobs = API.makePaginated(() => ({
  input: ListTransferJobsRequest,
  output: ListTransferJobsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a transfer job. Deleting a transfer job sets its status to DELETED. */
export interface DeleteTransferJobsRequest {
  /** Required. The ID of the Google Cloud project that owns the job. */
  projectId: string;
  /** Required. The job to delete. */
  jobName: string;
}

export const DeleteTransferJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpQuery("projectId")),
  jobName: Schema.String.pipe(T.HttpPath("jobName")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/transferJobs/{transferJobsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteTransferJobsRequest>;

export type DeleteTransferJobsResponse = Empty;
export const DeleteTransferJobsResponse = Empty;

export type DeleteTransferJobsError = CommonErrors;

export const deleteTransferJobs: API.OperationMethod<DeleteTransferJobsRequest, DeleteTransferJobsResponse, DeleteTransferJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteTransferJobsRequest,
  output: DeleteTransferJobsResponse,
  errors: [],
}));

/** Updates a transfer job. Updating a job's transfer spec does not affect transfer operations that are running already. **Note:** The job's status field can be modified using this RPC (for example, to set a job's status to DELETED, DISABLED, or ENABLED). */
export interface PatchTransferJobsRequest {
  /** Required. The name of job to update. */
  jobName: string;
  /** Request body */
  body?: UpdateTransferJobRequest;
}

export const PatchTransferJobsRequest = Schema.Struct({
  jobName: Schema.String.pipe(T.HttpPath("jobName")),
  body: Schema.optional(UpdateTransferJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/transferJobs/{transferJobsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchTransferJobsRequest>;

export type PatchTransferJobsResponse = TransferJob;
export const PatchTransferJobsResponse = TransferJob;

export type PatchTransferJobsError = CommonErrors;

export const patchTransferJobs: API.OperationMethod<PatchTransferJobsRequest, PatchTransferJobsResponse, PatchTransferJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchTransferJobsRequest,
  output: PatchTransferJobsResponse,
  errors: [],
}));

/** Gets a transfer job. */
export interface GetTransferJobsRequest {
  /** Required. The ID of the Google Cloud project that owns the job. */
  projectId: string;
  /** Required. The job to get. */
  jobName: string;
}

export const GetTransferJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpQuery("projectId")),
  jobName: Schema.String.pipe(T.HttpPath("jobName")),
}).pipe(
  T.Http({ method: "GET", path: "v1/transferJobs/{transferJobsId}" }),
  svc,
) as unknown as Schema.Schema<GetTransferJobsRequest>;

export type GetTransferJobsResponse = TransferJob;
export const GetTransferJobsResponse = TransferJob;

export type GetTransferJobsError = CommonErrors;

export const getTransferJobs: API.OperationMethod<GetTransferJobsRequest, GetTransferJobsResponse, GetTransferJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTransferJobsRequest,
  output: GetTransferJobsResponse,
  errors: [],
}));

/** Starts a new operation for the specified transfer job. A `TransferJob` has a maximum of one active `TransferOperation`. If this method is called while a `TransferOperation` is active, an error is returned. */
export interface RunTransferJobsRequest {
  /** Required. The name of the transfer job. */
  jobName: string;
  /** Request body */
  body?: RunTransferJobRequest;
}

export const RunTransferJobsRequest = Schema.Struct({
  jobName: Schema.String.pipe(T.HttpPath("jobName")),
  body: Schema.optional(RunTransferJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/transferJobs/{transferJobsId}:run", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunTransferJobsRequest>;

export type RunTransferJobsResponse = Operation;
export const RunTransferJobsResponse = Operation;

export type RunTransferJobsError = CommonErrors;

export const runTransferJobs: API.OperationMethod<RunTransferJobsRequest, RunTransferJobsResponse, RunTransferJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunTransferJobsRequest,
  output: RunTransferJobsResponse,
  errors: [],
}));

/** Returns the Google service account that is used by Storage Transfer Service to access buckets in the project where transfers run or in other projects. Each Google service account is associated with one Google Cloud project. Users should add this service account to the Google Cloud Storage bucket ACLs to grant access to Storage Transfer Service. This service account is created and owned by Storage Transfer Service and can only be used by Storage Transfer Service. */
export interface GetGoogleServiceAccountsRequest {
  /** Required. The ID of the Google Cloud project that the Google service account is associated with. */
  projectId: string;
}

export const GetGoogleServiceAccountsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/googleServiceAccounts/{projectId}" }),
  svc,
) as unknown as Schema.Schema<GetGoogleServiceAccountsRequest>;

export type GetGoogleServiceAccountsResponse = GoogleServiceAccount;
export const GetGoogleServiceAccountsResponse = GoogleServiceAccount;

export type GetGoogleServiceAccountsError = CommonErrors;

export const getGoogleServiceAccounts: API.OperationMethod<GetGoogleServiceAccountsRequest, GetGoogleServiceAccountsResponse, GetGoogleServiceAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetGoogleServiceAccountsRequest,
  output: GetGoogleServiceAccountsResponse,
  errors: [],
}));

/** Pauses a transfer operation. */
export interface PauseTransferOperationsRequest {
  /** Required. The name of the transfer operation. */
  name: string;
  /** Request body */
  body?: PauseTransferOperationRequest;
}

export const PauseTransferOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PauseTransferOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/transferOperations/{transferOperationsId}:pause", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PauseTransferOperationsRequest>;

export type PauseTransferOperationsResponse = Empty;
export const PauseTransferOperationsResponse = Empty;

export type PauseTransferOperationsError = CommonErrors;

export const pauseTransferOperations: API.OperationMethod<PauseTransferOperationsRequest, PauseTransferOperationsResponse, PauseTransferOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PauseTransferOperationsRequest,
  output: PauseTransferOperationsResponse,
  errors: [],
}));

/** Cancels a transfer. Use the transferOperations.get method to check if the cancellation succeeded or if the operation completed despite the `cancel` request. When you cancel an operation, the currently running transfer is interrupted. For recurring transfer jobs, the next instance of the transfer job will still run. For example, if your job is configured to run every day at 1pm and you cancel Monday's operation at 1:05pm, Monday's transfer will stop. However, a transfer job will still be attempted on Tuesday. This applies only to currently running operations. If an operation is not currently running, `cancel` does nothing. *Caution:* Canceling a transfer job can leave your data in an unknown state. We recommend that you restore the state at both the destination and the source after the `cancel` request completes so that your data is in a consistent state. When you cancel a job, the next job computes a delta of files and may repair any inconsistent state. For instance, if you run a job every day, and today's job found 10 new files and transferred five files before you canceled the job, tomorrow's transfer operation will compute a new delta with the five files that were not copied today plus any new files discovered tomorrow. */
export interface CancelTransferOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelTransferOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/transferOperations/{transferOperationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelTransferOperationsRequest>;

export type CancelTransferOperationsResponse = Empty;
export const CancelTransferOperationsResponse = Empty;

export type CancelTransferOperationsError = CommonErrors;

export const cancelTransferOperations: API.OperationMethod<CancelTransferOperationsRequest, CancelTransferOperationsResponse, CancelTransferOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelTransferOperationsRequest,
  output: CancelTransferOperationsResponse,
  errors: [],
}));

/** Lists transfer operations. Operations are ordered by their creation time in reverse chronological order. */
export interface ListTransferOperationsRequest {
  /** The list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** Required. The name of the type being listed; must be `transferOperations`. */
  name: string;
  /** The list page size. The max allowed value is 256. */
  pageSize?: number;
  /** Required. A list of query parameters specified as JSON text in the form of: `{"projectId":"my_project_id", "jobNames":["jobid1","jobid2",...], "jobNamePattern": "job_name_pattern", "operationNames":["opid1","opid2",...], "operationNamePattern": "operation_name_pattern", "minCreationTime": "min_creation_time", "maxCreationTime": "max_creation_time", "transferStatuses":["status1","status2",...]}` Since `jobNames`, `operationNames`, and `transferStatuses` support multiple values, they must be specified with array notation. `projectId` is the only argument that is required. If specified, `jobNamePattern` and `operationNamePattern` must match the full job or operation name respectively. '*' is a wildcard matching 0 or more characters. `minCreationTime` and `maxCreationTime` should be timestamps encoded as a string in the [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. The valid values for `transferStatuses` are case-insensitive: IN_PROGRESS, PAUSED, SUCCESS, FAILED, and ABORTED. */
  filter: string;
}

export const ListTransferOperationsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.String.pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/transferOperations" }),
  svc,
) as unknown as Schema.Schema<ListTransferOperationsRequest>;

export type ListTransferOperationsResponse = ListOperationsResponse;
export const ListTransferOperationsResponse = ListOperationsResponse;

export type ListTransferOperationsError = CommonErrors;

export const listTransferOperations = API.makePaginated(() => ({
  input: ListTransferOperationsRequest,
  output: ListTransferOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetTransferOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetTransferOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/transferOperations/{transferOperationsId}" }),
  svc,
) as unknown as Schema.Schema<GetTransferOperationsRequest>;

export type GetTransferOperationsResponse = Operation;
export const GetTransferOperationsResponse = Operation;

export type GetTransferOperationsError = CommonErrors;

export const getTransferOperations: API.OperationMethod<GetTransferOperationsRequest, GetTransferOperationsResponse, GetTransferOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTransferOperationsRequest,
  output: GetTransferOperationsResponse,
  errors: [],
}));

/** Resumes a transfer operation that is paused. */
export interface ResumeTransferOperationsRequest {
  /** Required. The name of the transfer operation. */
  name: string;
  /** Request body */
  body?: ResumeTransferOperationRequest;
}

export const ResumeTransferOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResumeTransferOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/transferOperations/{transferOperationsId}:resume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResumeTransferOperationsRequest>;

export type ResumeTransferOperationsResponse = Empty;
export const ResumeTransferOperationsResponse = Empty;

export type ResumeTransferOperationsError = CommonErrors;

export const resumeTransferOperations: API.OperationMethod<ResumeTransferOperationsRequest, ResumeTransferOperationsResponse, ResumeTransferOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResumeTransferOperationsRequest,
  output: ResumeTransferOperationsResponse,
  errors: [],
}));

