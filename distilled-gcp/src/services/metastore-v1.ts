// ==========================================================================
// Dataproc Metastore API (metastore v1)
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
  name: "metastore",
  version: "v1",
  rootUrl: "https://metastore.googleapis.com/",
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
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the name should be a resource name ending with operations/{unique_id}. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is false, it means the operation is still in progress. If true, the operation is completed, and either error or response is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as Delete, the response is google.protobuf.Empty. If the original method is standard Get/Create/Update, the response should be the resource. For other methods, the response should have the type XxxResponse, where Xxx is the original method name. For example, if the original method name is TakeSnapshot(), the inferred response type is TakeSnapshotResponse. */
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
  /** Unordered list. Unreachable resources. Populated when the request sets ListOperationsRequest.return_partial_success and reads across collections. For example, when attempting to list all resources across all supported locations. */
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

export interface BackendMetastore {
  /** The relative resource name of the metastore that is being federated. The formats of the relative resource names for the currently supported metastores are listed below: BigQuery projects/{project_id} Dataproc Metastore projects/{project_id}/locations/{location}/services/{service_id} */
  name?: string;
  /** The type of the backend metastore. */
  metastoreType?: "METASTORE_TYPE_UNSPECIFIED" | "BIGQUERY" | "DATAPROC_METASTORE" | (string & {});
}

export const BackendMetastore: Schema.Schema<BackendMetastore> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metastoreType: Schema.optional(Schema.String),
})).annotate({ identifier: "BackendMetastore" }) as any as Schema.Schema<BackendMetastore>;

export interface Federation {
  /** Immutable. The relative resource name of the federation, of the form: projects/{project_number}/locations/{location_id}/federations/{federation_id}`. */
  name?: string;
  /** Output only. The time when the metastore federation was created. */
  createTime?: string;
  /** Output only. The time when the metastore federation was last updated. */
  updateTime?: string;
  /** User-defined labels for the metastore federation. */
  labels?: Record<string, string>;
  /** Immutable. The Apache Hive metastore version of the federation. All backend metastore versions must be compatible with the federation version. */
  version?: string;
  /** A map from BackendMetastore rank to BackendMetastores from which the federation service serves metadata at query time. The map key represents the order in which BackendMetastores should be evaluated to resolve database names at query time and should be greater than or equal to zero. A BackendMetastore with a lower number will be evaluated before a BackendMetastore with a higher number. */
  backendMetastores?: Record<string, BackendMetastore>;
  /** Output only. The federation endpoint. */
  endpointUri?: string;
  /** Output only. The current state of the federation. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "UPDATING" | "DELETING" | "ERROR" | (string & {});
  /** Output only. Additional information about the current state of the metastore federation, if available. */
  stateMessage?: string;
  /** Output only. The globally unique resource identifier of the metastore federation. */
  uid?: string;
  /** Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" */
  tags?: Record<string, string>;
}

export const Federation: Schema.Schema<Federation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  version: Schema.optional(Schema.String),
  backendMetastores: Schema.optional(Schema.Record(Schema.String, BackendMetastore)),
  endpointUri: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Federation" }) as any as Schema.Schema<Federation>;

export interface ListFederationsResponse {
  /** The services in the specified location. */
  federations?: Array<Federation>;
  /** A token that can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListFederationsResponse: Schema.Schema<ListFederationsResponse> = Schema.suspend(() => Schema.Struct({
  federations: Schema.optional(Schema.Array(Federation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListFederationsResponse" }) as any as Schema.Schema<ListFederationsResponse>;

export interface Secret {
  /** Optional. The relative resource name of a Secret Manager secret version, in the following form:projects/{project_number}/secrets/{secret_id}/versions/{version_id}. */
  cloudSecret?: string;
}

export const Secret: Schema.Schema<Secret> = Schema.suspend(() => Schema.Struct({
  cloudSecret: Schema.optional(Schema.String),
})).annotate({ identifier: "Secret" }) as any as Schema.Schema<Secret>;

export interface KerberosConfig {
  /** Optional. A Kerberos keytab file that can be used to authenticate a service principal with a Kerberos Key Distribution Center (KDC). */
  keytab?: Secret;
  /** Optional. A Kerberos principal that exists in the both the keytab the KDC to authenticate as. A typical principal is of the form primary/instance@REALM, but there is no exact format. */
  principal?: string;
  /** Optional. A Cloud Storage URI that specifies the path to a krb5.conf file. It is of the form gs://{bucket_name}/path/to/krb5.conf, although the file does not need to be named krb5.conf explicitly. */
  krb5ConfigGcsUri?: string;
}

export const KerberosConfig: Schema.Schema<KerberosConfig> = Schema.suspend(() => Schema.Struct({
  keytab: Schema.optional(Secret),
  principal: Schema.optional(Schema.String),
  krb5ConfigGcsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "KerberosConfig" }) as any as Schema.Schema<KerberosConfig>;

export interface Consumer {
  /** Immutable. The subnetwork of the customer project from which an IP address is reserved and used as the Dataproc Metastore service's endpoint. It is accessible to hosts in the subnet and to all hosts in a subnet in the same region and same network. There must be at least one IP address available in the subnet's primary range. The subnet is specified in the following form:projects/{project_number}/regions/{region_id}/subnetworks/{subnetwork_id} */
  subnetwork?: string;
  /** Output only. The URI of the endpoint used to access the metastore service. */
  endpointUri?: string;
  /** Output only. The location of the endpoint URI. Format: projects/{project}/locations/{location}. */
  endpointLocation?: string;
}

export const Consumer: Schema.Schema<Consumer> = Schema.suspend(() => Schema.Struct({
  subnetwork: Schema.optional(Schema.String),
  endpointUri: Schema.optional(Schema.String),
  endpointLocation: Schema.optional(Schema.String),
})).annotate({ identifier: "Consumer" }) as any as Schema.Schema<Consumer>;

export interface NetworkConfig {
  /** Immutable. The consumer-side network configuration for the Dataproc Metastore instance. */
  consumers?: Array<Consumer>;
}

export const NetworkConfig: Schema.Schema<NetworkConfig> = Schema.suspend(() => Schema.Struct({
  consumers: Schema.optional(Schema.Array(Consumer)),
})).annotate({ identifier: "NetworkConfig" }) as any as Schema.Schema<NetworkConfig>;

export interface AuxiliaryVersionConfig {
  /** Optional. The Hive metastore version of the auxiliary service. It must be less than the primary Hive metastore service's version. */
  version?: string;
  /** Optional. A mapping of Hive metastore configuration key-value pairs to apply to the auxiliary Hive metastore (configured in hive-site.xml) in addition to the primary version's overrides. If keys are present in both the auxiliary version's overrides and the primary version's overrides, the value from the auxiliary version's overrides takes precedence. */
  configOverrides?: Record<string, string>;
  /** Output only. The network configuration contains the endpoint URI(s) of the auxiliary Hive metastore service. */
  networkConfig?: NetworkConfig;
}

export const AuxiliaryVersionConfig: Schema.Schema<AuxiliaryVersionConfig> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  configOverrides: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  networkConfig: Schema.optional(NetworkConfig),
})).annotate({ identifier: "AuxiliaryVersionConfig" }) as any as Schema.Schema<AuxiliaryVersionConfig>;

export interface HiveMetastoreConfig {
  /** Immutable. The Hive metastore schema version. */
  version?: string;
  /** Optional. A mapping of Hive metastore configuration key-value pairs to apply to the Hive metastore (configured in hive-site.xml). The mappings override system defaults (some keys cannot be overridden). These overrides are also applied to auxiliary versions and can be further customized in the auxiliary version's AuxiliaryVersionConfig. */
  configOverrides?: Record<string, string>;
  /** Optional. Information used to configure the Hive metastore service as a service principal in a Kerberos realm. To disable Kerberos, use the UpdateService method and specify this field's path (hive_metastore_config.kerberos_config) in the request's update_mask while omitting this field from the request's service. */
  kerberosConfig?: KerberosConfig;
  /** Optional. The protocol to use for the metastore service endpoint. If unspecified, defaults to THRIFT. */
  endpointProtocol?: "ENDPOINT_PROTOCOL_UNSPECIFIED" | "THRIFT" | "GRPC" | (string & {});
  /** Optional. A mapping of Hive metastore version to the auxiliary version configuration. When specified, a secondary Hive metastore service is created along with the primary service. All auxiliary versions must be less than the service's primary version. The key is the auxiliary service name and it must match the regular expression a-z?. This means that the first character must be a lowercase letter, and all the following characters must be hyphens, lowercase letters, or digits, except the last character, which cannot be a hyphen. */
  auxiliaryVersions?: Record<string, AuxiliaryVersionConfig>;
}

export const HiveMetastoreConfig: Schema.Schema<HiveMetastoreConfig> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  configOverrides: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  kerberosConfig: Schema.optional(KerberosConfig),
  endpointProtocol: Schema.optional(Schema.String),
  auxiliaryVersions: Schema.optional(Schema.Record(Schema.String, AuxiliaryVersionConfig)),
})).annotate({ identifier: "HiveMetastoreConfig" }) as any as Schema.Schema<HiveMetastoreConfig>;

export interface DataCatalogConfig {
  /** Optional. Defines whether the metastore metadata should be synced to Data Catalog. The default value is to disable syncing metastore metadata to Data Catalog. */
  enabled?: boolean;
}

export const DataCatalogConfig: Schema.Schema<DataCatalogConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DataCatalogConfig" }) as any as Schema.Schema<DataCatalogConfig>;

export interface MetadataIntegration {
  /** Optional. The integration config for the Data Catalog service. */
  dataCatalogConfig?: DataCatalogConfig;
}

export const MetadataIntegration: Schema.Schema<MetadataIntegration> = Schema.suspend(() => Schema.Struct({
  dataCatalogConfig: Schema.optional(DataCatalogConfig),
})).annotate({ identifier: "MetadataIntegration" }) as any as Schema.Schema<MetadataIntegration>;

export interface MaintenanceWindow {
  /** Optional. The hour of day (0-23) when the window starts. */
  hourOfDay?: number;
  /** Optional. The day of week, when the window starts. */
  dayOfWeek?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
}

export const MaintenanceWindow: Schema.Schema<MaintenanceWindow> = Schema.suspend(() => Schema.Struct({
  hourOfDay: Schema.optional(Schema.Number),
  dayOfWeek: Schema.optional(Schema.String),
})).annotate({ identifier: "MaintenanceWindow" }) as any as Schema.Schema<MaintenanceWindow>;

export interface MetadataExport {
  /** Output only. A Cloud Storage URI of a folder that metadata are exported to, in the form of gs:////, where is automatically generated. */
  destinationGcsUri?: string;
  /** Output only. The time when the export started. */
  startTime?: string;
  /** Output only. The time when the export ended. */
  endTime?: string;
  /** Output only. The current state of the export. */
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | (string & {});
  /** Output only. The type of the database dump. */
  databaseDumpType?: "TYPE_UNSPECIFIED" | "MYSQL" | "AVRO" | (string & {});
}

export const MetadataExport: Schema.Schema<MetadataExport> = Schema.suspend(() => Schema.Struct({
  destinationGcsUri: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  databaseDumpType: Schema.optional(Schema.String),
})).annotate({ identifier: "MetadataExport" }) as any as Schema.Schema<MetadataExport>;

export interface Restore {
  /** Output only. The time when the restore started. */
  startTime?: string;
  /** Output only. The time when the restore ended. */
  endTime?: string;
  /** Output only. The current state of the restore. */
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | (string & {});
  /** Output only. The relative resource name of the metastore service backup to restore from, in the following form:projects/{project_id}/locations/{location_id}/services/{service_id}/backups/{backup_id}. */
  backup?: string;
  /** Output only. The type of restore. */
  type?: "RESTORE_TYPE_UNSPECIFIED" | "FULL" | "METADATA_ONLY" | (string & {});
  /** Output only. The restore details containing the revision of the service to be restored to, in format of JSON. */
  details?: string;
  /** Optional. A Cloud Storage URI specifying where the backup artifacts are stored, in the format gs:///. */
  backupLocation?: string;
}

export const Restore: Schema.Schema<Restore> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  backup: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
  backupLocation: Schema.optional(Schema.String),
})).annotate({ identifier: "Restore" }) as any as Schema.Schema<Restore>;

export interface MetadataManagementActivity {
  /** Output only. The latest metadata exports of the metastore service. */
  metadataExports?: Array<MetadataExport>;
  /** Output only. The latest restores of the metastore service. */
  restores?: Array<Restore>;
}

export const MetadataManagementActivity: Schema.Schema<MetadataManagementActivity> = Schema.suspend(() => Schema.Struct({
  metadataExports: Schema.optional(Schema.Array(MetadataExport)),
  restores: Schema.optional(Schema.Array(Restore)),
})).annotate({ identifier: "MetadataManagementActivity" }) as any as Schema.Schema<MetadataManagementActivity>;

export interface EncryptionConfig {
  /** Optional. The fully qualified customer provided Cloud KMS key name to use for customer data encryption, in the following format:projects/{project_number}/locations/{location_id}/keyRings/{key_ring_id}/cryptoKeys/{crypto_key_id}. */
  kmsKey?: string;
}

export const EncryptionConfig: Schema.Schema<EncryptionConfig> = Schema.suspend(() => Schema.Struct({
  kmsKey: Schema.optional(Schema.String),
})).annotate({ identifier: "EncryptionConfig" }) as any as Schema.Schema<EncryptionConfig>;

export interface TelemetryConfig {
  /** Optional. The output format of the Dataproc Metastore service's logs. */
  logFormat?: "LOG_FORMAT_UNSPECIFIED" | "LEGACY" | "JSON" | (string & {});
}

export const TelemetryConfig: Schema.Schema<TelemetryConfig> = Schema.suspend(() => Schema.Struct({
  logFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "TelemetryConfig" }) as any as Schema.Schema<TelemetryConfig>;

export interface LimitConfig {
  /** Optional. The highest scaling factor that the service should be autoscaled to. */
  maxScalingFactor?: number;
  /** Optional. The lowest scaling factor that the service should be autoscaled to. */
  minScalingFactor?: number;
}

export const LimitConfig: Schema.Schema<LimitConfig> = Schema.suspend(() => Schema.Struct({
  maxScalingFactor: Schema.optional(Schema.Number),
  minScalingFactor: Schema.optional(Schema.Number),
})).annotate({ identifier: "LimitConfig" }) as any as Schema.Schema<LimitConfig>;

export interface AutoscalingConfig {
  /** Output only. The scaling factor of a service with autoscaling enabled. */
  autoscalingFactor?: number;
  /** Optional. Whether or not autoscaling is enabled for this service. */
  autoscalingEnabled?: boolean;
  /** Optional. The LimitConfig of the service. */
  limitConfig?: LimitConfig;
}

export const AutoscalingConfig: Schema.Schema<AutoscalingConfig> = Schema.suspend(() => Schema.Struct({
  autoscalingFactor: Schema.optional(Schema.Number),
  autoscalingEnabled: Schema.optional(Schema.Boolean),
  limitConfig: Schema.optional(LimitConfig),
})).annotate({ identifier: "AutoscalingConfig" }) as any as Schema.Schema<AutoscalingConfig>;

export interface ScalingConfig {
  /** An enum of readable instance sizes, with each instance size mapping to a float value (e.g. InstanceSize.EXTRA_SMALL = scaling_factor(0.1)) */
  instanceSize?: "INSTANCE_SIZE_UNSPECIFIED" | "EXTRA_SMALL" | "SMALL" | "MEDIUM" | "LARGE" | "EXTRA_LARGE" | (string & {});
  /** Scaling factor, increments of 0.1 for values less than 1.0, and increments of 1.0 for values greater than 1.0. */
  scalingFactor?: number;
  /** Optional. The autoscaling configuration. */
  autoscalingConfig?: AutoscalingConfig;
}

export const ScalingConfig: Schema.Schema<ScalingConfig> = Schema.suspend(() => Schema.Struct({
  instanceSize: Schema.optional(Schema.String),
  scalingFactor: Schema.optional(Schema.Number),
  autoscalingConfig: Schema.optional(AutoscalingConfig),
})).annotate({ identifier: "ScalingConfig" }) as any as Schema.Schema<ScalingConfig>;

export interface LatestBackup {
  /** Output only. The ID of an in-progress scheduled backup. Empty if no backup is in progress. */
  backupId?: string;
  /** Output only. The time when the backup was started. */
  startTime?: string;
  /** Output only. The current state of the backup. */
  state?: "STATE_UNSPECIFIED" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | (string & {});
  /** Output only. The duration of the backup completion. */
  duration?: string;
}

export const LatestBackup: Schema.Schema<LatestBackup> = Schema.suspend(() => Schema.Struct({
  backupId: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
})).annotate({ identifier: "LatestBackup" }) as any as Schema.Schema<LatestBackup>;

export interface ScheduledBackup {
  /** Optional. Defines whether the scheduled backup is enabled. The default value is false. */
  enabled?: boolean;
  /** Optional. The scheduled interval in Cron format, see https://en.wikipedia.org/wiki/Cron The default is empty: scheduled backup is not enabled. Must be specified to enable scheduled backups. */
  cronSchedule?: string;
  /** Optional. Specifies the time zone to be used when interpreting cron_schedule. Must be a time zone name from the time zone database (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), e.g. America/Los_Angeles or Africa/Abidjan. If left unspecified, the default is UTC. */
  timeZone?: string;
  /** Output only. The time when the next backups execution is scheduled to start. */
  nextScheduledTime?: string;
  /** Optional. A Cloud Storage URI of a folder, in the format gs:///. A sub-folder containing backup files will be stored below it. */
  backupLocation?: string;
  /** Output only. The details of the latest scheduled backup. */
  latestBackup?: LatestBackup;
}

export const ScheduledBackup: Schema.Schema<ScheduledBackup> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  cronSchedule: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  nextScheduledTime: Schema.optional(Schema.String),
  backupLocation: Schema.optional(Schema.String),
  latestBackup: Schema.optional(LatestBackup),
})).annotate({ identifier: "ScheduledBackup" }) as any as Schema.Schema<ScheduledBackup>;

export interface Service {
  /** Configuration information specific to running Hive metastore software as the metastore service. */
  hiveMetastoreConfig?: HiveMetastoreConfig;
  /** Immutable. Identifier. The relative resource name of the metastore service, in the following format:projects/{project_number}/locations/{location_id}/services/{service_id}. */
  name?: string;
  /** Output only. The time when the metastore service was created. */
  createTime?: string;
  /** Output only. The time when the metastore service was last updated. */
  updateTime?: string;
  /** User-defined labels for the metastore service. */
  labels?: Record<string, string>;
  /** Immutable. The relative resource name of the VPC network on which the instance can be accessed. It is specified in the following form:projects/{project_number}/global/networks/{network_id}. */
  network?: string;
  /** Output only. The URI of the endpoint used to access the metastore service. */
  endpointUri?: string;
  /** Optional. The TCP port at which the metastore service is reached. Default: 9083. */
  port?: number;
  /** Output only. The current state of the metastore service. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "SUSPENDING" | "SUSPENDED" | "UPDATING" | "DELETING" | "ERROR" | "AUTOSCALING" | "MIGRATING" | (string & {});
  /** Output only. Additional information about the current state of the metastore service, if available. */
  stateMessage?: string;
  /** Output only. A Cloud Storage URI (starting with gs://) that specifies where artifacts related to the metastore service are stored. */
  artifactGcsUri?: string;
  /** Optional. The tier of the service. */
  tier?: "TIER_UNSPECIFIED" | "DEVELOPER" | "ENTERPRISE" | (string & {});
  /** Optional. The setting that defines how metastore metadata should be integrated with external services and systems. */
  metadataIntegration?: MetadataIntegration;
  /** Optional. The one hour maintenance window of the metastore service. This specifies when the service can be restarted for maintenance purposes in UTC time. Maintenance window is not needed for services with the SPANNER database type. */
  maintenanceWindow?: MaintenanceWindow;
  /** Output only. The globally unique resource identifier of the metastore service. */
  uid?: string;
  /** Output only. The metadata management activities of the metastore service. */
  metadataManagementActivity?: MetadataManagementActivity;
  /** Immutable. The release channel of the service. If unspecified, defaults to STABLE. */
  releaseChannel?: "RELEASE_CHANNEL_UNSPECIFIED" | "CANARY" | "STABLE" | (string & {});
  /** Immutable. Information used to configure the Dataproc Metastore service to encrypt customer data at rest. Cannot be updated. */
  encryptionConfig?: EncryptionConfig;
  /** Optional. The configuration specifying the network settings for the Dataproc Metastore service. */
  networkConfig?: NetworkConfig;
  /** Immutable. The database type that the Metastore service stores its data. */
  databaseType?: "DATABASE_TYPE_UNSPECIFIED" | "MYSQL" | "SPANNER" | (string & {});
  /** Optional. The configuration specifying telemetry settings for the Dataproc Metastore service. If unspecified defaults to JSON. */
  telemetryConfig?: TelemetryConfig;
  /** Optional. Scaling configuration of the metastore service. */
  scalingConfig?: ScalingConfig;
  /** Optional. The configuration of scheduled backup for the metastore service. */
  scheduledBackup?: ScheduledBackup;
  /** Optional. Indicates if the dataproc metastore should be protected against accidental deletions. */
  deletionProtection?: boolean;
  /** Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" */
  tags?: Record<string, string>;
}

export const Service: Schema.Schema<Service> = Schema.suspend(() => Schema.Struct({
  hiveMetastoreConfig: Schema.optional(HiveMetastoreConfig),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  network: Schema.optional(Schema.String),
  endpointUri: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
  artifactGcsUri: Schema.optional(Schema.String),
  tier: Schema.optional(Schema.String),
  metadataIntegration: Schema.optional(MetadataIntegration),
  maintenanceWindow: Schema.optional(MaintenanceWindow),
  uid: Schema.optional(Schema.String),
  metadataManagementActivity: Schema.optional(MetadataManagementActivity),
  releaseChannel: Schema.optional(Schema.String),
  encryptionConfig: Schema.optional(EncryptionConfig),
  networkConfig: Schema.optional(NetworkConfig),
  databaseType: Schema.optional(Schema.String),
  telemetryConfig: Schema.optional(TelemetryConfig),
  scalingConfig: Schema.optional(ScalingConfig),
  scheduledBackup: Schema.optional(ScheduledBackup),
  deletionProtection: Schema.optional(Schema.Boolean),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Service" }) as any as Schema.Schema<Service>;

export interface ListServicesResponse {
  /** The services in the specified location. */
  services?: Array<Service>;
  /** A token that can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListServicesResponse: Schema.Schema<ListServicesResponse> = Schema.suspend(() => Schema.Struct({
  services: Schema.optional(Schema.Array(Service)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListServicesResponse" }) as any as Schema.Schema<ListServicesResponse>;

export interface DatabaseDump {
  /** The type of the database. */
  databaseType?: "DATABASE_TYPE_UNSPECIFIED" | "MYSQL" | (string & {});
  /** Optional. A Cloud Storage object or folder URI that specifies the source from which to import metadata. It must begin with gs://. */
  gcsUri?: string;
  /** Optional. The name of the source database. */
  sourceDatabase?: string;
  /** Optional. The type of the database dump. If unspecified, defaults to MYSQL. */
  type?: "TYPE_UNSPECIFIED" | "MYSQL" | "AVRO" | (string & {});
}

export const DatabaseDump: Schema.Schema<DatabaseDump> = Schema.suspend(() => Schema.Struct({
  databaseType: Schema.optional(Schema.String),
  gcsUri: Schema.optional(Schema.String),
  sourceDatabase: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "DatabaseDump" }) as any as Schema.Schema<DatabaseDump>;

export interface MetadataImport {
  /** Immutable. A database dump from a pre-existing metastore's database. */
  databaseDump?: DatabaseDump;
  /** Immutable. Identifier. The relative resource name of the metadata import, of the form:projects/{project_number}/locations/{location_id}/services/{service_id}/metadataImports/{metadata_import_id}. */
  name?: string;
  /** Optional. The description of the metadata import. */
  description?: string;
  /** Output only. The time when the metadata import was started. */
  createTime?: string;
  /** Output only. The time when the metadata import was last updated. */
  updateTime?: string;
  /** Output only. The time when the metadata import finished. */
  endTime?: string;
  /** Output only. The current state of the metadata import. */
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "SUCCEEDED" | "UPDATING" | "FAILED" | (string & {});
}

export const MetadataImport: Schema.Schema<MetadataImport> = Schema.suspend(() => Schema.Struct({
  databaseDump: Schema.optional(DatabaseDump),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "MetadataImport" }) as any as Schema.Schema<MetadataImport>;

export interface ListMetadataImportsResponse {
  /** The imports in the specified service. */
  metadataImports?: Array<MetadataImport>;
  /** A token that can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListMetadataImportsResponse: Schema.Schema<ListMetadataImportsResponse> = Schema.suspend(() => Schema.Struct({
  metadataImports: Schema.optional(Schema.Array(MetadataImport)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListMetadataImportsResponse" }) as any as Schema.Schema<ListMetadataImportsResponse>;

export interface ExportMetadataRequest {
  /** A Cloud Storage URI of a folder, in the format gs:///. A sub-folder containing exported files will be created below it. */
  destinationGcsFolder?: string;
  /** Optional. A request ID. Specify a unique request ID to allow the server to ignore the request if it has completed. The server will ignore subsequent requests that provide a duplicate request ID for at least 60 minutes after the first request.For example, if an initial request times out, followed by another request with the same request ID, the server ignores the second request to prevent the creation of duplicate commitments.The request ID must be a valid UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format). A zero UUID (00000000-0000-0000-0000-000000000000) is not supported. */
  requestId?: string;
  /** Optional. The type of the database dump. If unspecified, defaults to MYSQL. */
  databaseDumpType?: "TYPE_UNSPECIFIED" | "MYSQL" | "AVRO" | (string & {});
}

export const ExportMetadataRequest: Schema.Schema<ExportMetadataRequest> = Schema.suspend(() => Schema.Struct({
  destinationGcsFolder: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
  databaseDumpType: Schema.optional(Schema.String),
})).annotate({ identifier: "ExportMetadataRequest" }) as any as Schema.Schema<ExportMetadataRequest>;

export interface RestoreServiceRequest {
  /** Optional. The relative resource name of the metastore service backup to restore from, in the following form:projects/{project_id}/locations/{location_id}/services/{service_id}/backups/{backup_id}. Mutually exclusive with backup_location, and exactly one of the two must be set. */
  backup?: string;
  /** Optional. A Cloud Storage URI specifying the location of the backup artifacts, namely - backup avro files under "avro/", backup_metastore.json and service.json, in the following form:gs://. Mutually exclusive with backup, and exactly one of the two must be set. */
  backupLocation?: string;
  /** Optional. The type of restore. If unspecified, defaults to METADATA_ONLY. */
  restoreType?: "RESTORE_TYPE_UNSPECIFIED" | "FULL" | "METADATA_ONLY" | (string & {});
  /** Optional. A request ID. Specify a unique request ID to allow the server to ignore the request if it has completed. The server will ignore subsequent requests that provide a duplicate request ID for at least 60 minutes after the first request.For example, if an initial request times out, followed by another request with the same request ID, the server ignores the second request to prevent the creation of duplicate commitments.The request ID must be a valid UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format). A zero UUID (00000000-0000-0000-0000-000000000000) is not supported. */
  requestId?: string;
}

export const RestoreServiceRequest: Schema.Schema<RestoreServiceRequest> = Schema.suspend(() => Schema.Struct({
  backup: Schema.optional(Schema.String),
  backupLocation: Schema.optional(Schema.String),
  restoreType: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "RestoreServiceRequest" }) as any as Schema.Schema<RestoreServiceRequest>;

export interface Backup {
  /** Immutable. Identifier. The relative resource name of the backup, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}/backups/{backup_id} */
  name?: string;
  /** Output only. The time when the backup was started. */
  createTime?: string;
  /** Output only. The time when the backup finished creating. */
  endTime?: string;
  /** Output only. The current state of the backup. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "DELETING" | "ACTIVE" | "FAILED" | "RESTORING" | (string & {});
  /** Output only. The revision of the service at the time of backup. */
  serviceRevision?: Service;
  /** Optional. The description of the backup. */
  description?: string;
  /** Output only. Services that are restoring from the backup. */
  restoringServices?: Array<string>;
}

export const Backup: Schema.Schema<Backup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  serviceRevision: Schema.optional(Service),
  description: Schema.optional(Schema.String),
  restoringServices: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Backup" }) as any as Schema.Schema<Backup>;

export interface ListBackupsResponse {
  /** The backups of the specified service. */
  backups?: Array<Backup>;
  /** A token that can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackupsResponse: Schema.Schema<ListBackupsResponse> = Schema.suspend(() => Schema.Struct({
  backups: Schema.optional(Schema.Array(Backup)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBackupsResponse" }) as any as Schema.Schema<ListBackupsResponse>;

export interface QueryMetadataRequest {
  /** Required. A read-only SQL query to execute against the metadata database. The query cannot change or mutate the data. */
  query?: string;
}

export const QueryMetadataRequest: Schema.Schema<QueryMetadataRequest> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryMetadataRequest" }) as any as Schema.Schema<QueryMetadataRequest>;

export interface MoveTableToDatabaseRequest {
  /** Required. The name of the table to be moved. */
  tableName?: string;
  /** Required. The name of the database where the table resides. */
  dbName?: string;
  /** Required. The name of the database where the table should be moved. */
  destinationDbName?: string;
}

export const MoveTableToDatabaseRequest: Schema.Schema<MoveTableToDatabaseRequest> = Schema.suspend(() => Schema.Struct({
  tableName: Schema.optional(Schema.String),
  dbName: Schema.optional(Schema.String),
  destinationDbName: Schema.optional(Schema.String),
})).annotate({ identifier: "MoveTableToDatabaseRequest" }) as any as Schema.Schema<MoveTableToDatabaseRequest>;

export interface AlterMetadataResourceLocationRequest {
  /** Required. The relative metadata resource name in the following format.databases/{database_id} or databases/{database_id}/tables/{table_id} or databases/{database_id}/tables/{table_id}/partitions/{partition_id} */
  resourceName?: string;
  /** Required. The new location URI for the metadata resource. */
  locationUri?: string;
}

export const AlterMetadataResourceLocationRequest: Schema.Schema<AlterMetadataResourceLocationRequest> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
  locationUri: Schema.optional(Schema.String),
})).annotate({ identifier: "AlterMetadataResourceLocationRequest" }) as any as Schema.Schema<AlterMetadataResourceLocationRequest>;

export interface AlterTablePropertiesRequest {
  /** Required. The name of the table containing the properties you're altering in the following format.databases/{database_id}/tables/{table_id} */
  tableName?: string;
  /** A field mask that specifies the metadata table properties that are overwritten by the update. Fields specified in the update_mask are relative to the resource (not to the full request). A field is overwritten if it is in the mask.For example, given the target properties: properties { a: 1 b: 2 } And an update properties: properties { a: 2 b: 3 c: 4 } then if the field mask is:paths: "properties.b", "properties.c"then the result will be: properties { a: 1 b: 3 c: 4 } */
  updateMask?: string;
  /** A map that describes the desired values to mutate. If update_mask is empty, the properties will not update. Otherwise, the properties only alters the value whose associated paths exist in the update mask */
  properties?: Record<string, string>;
}

export const AlterTablePropertiesRequest: Schema.Schema<AlterTablePropertiesRequest> = Schema.suspend(() => Schema.Struct({
  tableName: Schema.optional(Schema.String),
  updateMask: Schema.optional(Schema.String),
  properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "AlterTablePropertiesRequest" }) as any as Schema.Schema<AlterTablePropertiesRequest>;

export interface CdcConfig {
  /** Required. Fully qualified name of the Cloud SQL instance's VPC network or the shared VPC network that Datastream will peer to, in the following format: projects/{project_id}/locations/global/networks/{network_id}. More context in https://cloud.google.com/datastream/docs/network-connectivity-options#privateconnectivity */
  vpcNetwork?: string;
  /** Required. A /29 CIDR IP range for peering with datastream. */
  subnetIpRange?: string;
  /** Required. The username that the Datastream service should use for the MySQL connection. */
  username?: string;
  /** Required. Input only. The password for the user that Datastream service should use for the MySQL connection. This field is not returned on request. */
  password?: string;
  /** Required. The URL of the subnetwork resource to create the VM instance hosting the reverse proxy in. More context in https://cloud.google.com/datastream/docs/private-connectivity#reverse-csql-proxy The subnetwork should reside in the network provided in the request that Datastream will peer to and should be in the same region as Datastream, in the following format. projects/{project_id}/regions/{region_id}/subnetworks/{subnetwork_id} */
  reverseProxySubnet?: string;
  /** Optional. The bucket to write the intermediate stream event data in. The bucket name must be without any prefix like "gs://". See the bucket naming requirements (https://cloud.google.com/storage/docs/buckets#naming). This field is optional. If not set, the Artifacts Cloud Storage bucket will be used. */
  bucket?: string;
  /** Optional. The root path inside the Cloud Storage bucket. The stream event data will be written to this path. The default value is /migration. */
  rootPath?: string;
}

export const CdcConfig: Schema.Schema<CdcConfig> = Schema.suspend(() => Schema.Struct({
  vpcNetwork: Schema.optional(Schema.String),
  subnetIpRange: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  reverseProxySubnet: Schema.optional(Schema.String),
  bucket: Schema.optional(Schema.String),
  rootPath: Schema.optional(Schema.String),
})).annotate({ identifier: "CdcConfig" }) as any as Schema.Schema<CdcConfig>;

export interface CloudSQLConnectionConfig {
  /** Required. Cloud SQL database connection name (project_id:region:instance_name) */
  instanceConnectionName?: string;
  /** Required. The private IP address of the Cloud SQL instance. */
  ipAddress?: string;
  /** Required. The network port of the database. */
  port?: number;
  /** Required. The hive database name. */
  hiveDatabaseName?: string;
  /** Required. The username that Dataproc Metastore service will use to connect to the database. */
  username?: string;
  /** Required. Input only. The password for the user that Dataproc Metastore service will be using to connect to the database. This field is not returned on request. */
  password?: string;
  /** Required. The relative resource name of the subnetwork to deploy the SOCKS5 proxy service in. The subnetwork should reside in a network through which the Cloud SQL instance is accessible. The resource name should be in the format, projects/{project_id}/regions/{region_id}/subnetworks/{subnetwork_id} */
  proxySubnet?: string;
  /** Required. The relative resource name of the subnetwork to be used for Private Service Connect. Note that this cannot be a regular subnet and is used only for NAT. (https://cloud.google.com/vpc/docs/about-vpc-hosted-services#psc-subnets) This subnet is used to publish the SOCKS5 proxy service. The subnet size must be at least /29 and it should reside in a network through which the Cloud SQL instance is accessible. The resource name should be in the format, projects/{project_id}/regions/{region_id}/subnetworks/{subnetwork_id} */
  natSubnet?: string;
}

export const CloudSQLConnectionConfig: Schema.Schema<CloudSQLConnectionConfig> = Schema.suspend(() => Schema.Struct({
  instanceConnectionName: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  hiveDatabaseName: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  proxySubnet: Schema.optional(Schema.String),
  natSubnet: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudSQLConnectionConfig" }) as any as Schema.Schema<CloudSQLConnectionConfig>;

export interface CloudSQLMigrationConfig {
  /** Required. Configuration information to start the Change Data Capture (CDC) streams from customer database to backend database of Dataproc Metastore. Dataproc Metastore switches to using its backend database after the cutover phase of migration. */
  cdcConfig?: CdcConfig;
  /** Required. Configuration information to establish customer database connection before the cutover phase of migration */
  cloudSqlConnectionConfig?: CloudSQLConnectionConfig;
}

export const CloudSQLMigrationConfig: Schema.Schema<CloudSQLMigrationConfig> = Schema.suspend(() => Schema.Struct({
  cdcConfig: Schema.optional(CdcConfig),
  cloudSqlConnectionConfig: Schema.optional(CloudSQLConnectionConfig),
})).annotate({ identifier: "CloudSQLMigrationConfig" }) as any as Schema.Schema<CloudSQLMigrationConfig>;

export interface MigrationExecution {
  /** Configuration information specific to migrating from self-managed hive metastore on Google Cloud using Cloud SQL as the backend database to Dataproc Metastore. */
  cloudSqlMigrationConfig?: CloudSQLMigrationConfig;
  /** Output only. The relative resource name of the migration execution, in the following form: projects/{project_number}/locations/{location_id}/services/{service_id}/migrationExecutions/{migration_execution_id} */
  name?: string;
  /** Output only. The time when the migration execution was started. */
  createTime?: string;
  /** Output only. The time when the migration execution finished. */
  endTime?: string;
  /** Output only. The current state of the migration execution. */
  state?: "STATE_UNSPECIFIED" | "STARTING" | "RUNNING" | "CANCELLING" | "AWAITING_USER_ACTION" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "DELETING" | (string & {});
  /** Output only. The current phase of the migration execution. */
  phase?: "PHASE_UNSPECIFIED" | "REPLICATION" | "CUTOVER" | (string & {});
  /** Output only. Additional information about the current state of the migration execution. */
  stateMessage?: string;
}

export const MigrationExecution: Schema.Schema<MigrationExecution> = Schema.suspend(() => Schema.Struct({
  cloudSqlMigrationConfig: Schema.optional(CloudSQLMigrationConfig),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  phase: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "MigrationExecution" }) as any as Schema.Schema<MigrationExecution>;

export interface StartMigrationRequest {
  /** Required. The configuration details for the migration. */
  migrationExecution?: MigrationExecution;
  /** Optional. A request ID. Specify a unique request ID to allow the server to ignore the request if it has completed. The server will ignore subsequent requests that provide a duplicate request ID for at least 60 minutes after the first request.For example, if an initial request times out, followed by another request with the same request ID, the server ignores the second request to prevent the creation of duplicate commitments.The request ID must be a valid UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero UUID (00000000-0000-0000-0000-000000000000) is not supported. */
  requestId?: string;
}

export const StartMigrationRequest: Schema.Schema<StartMigrationRequest> = Schema.suspend(() => Schema.Struct({
  migrationExecution: Schema.optional(MigrationExecution),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "StartMigrationRequest" }) as any as Schema.Schema<StartMigrationRequest>;

export interface CompleteMigrationRequest {
}

export const CompleteMigrationRequest: Schema.Schema<CompleteMigrationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CompleteMigrationRequest" }) as any as Schema.Schema<CompleteMigrationRequest>;

export interface CancelMigrationRequest {
}

export const CancelMigrationRequest: Schema.Schema<CancelMigrationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelMigrationRequest" }) as any as Schema.Schema<CancelMigrationRequest>;

export interface ListMigrationExecutionsResponse {
  /** The migration executions on the specified service. */
  migrationExecutions?: Array<MigrationExecution>;
  /** A token that can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListMigrationExecutionsResponse: Schema.Schema<ListMigrationExecutionsResponse> = Schema.suspend(() => Schema.Struct({
  migrationExecutions: Schema.optional(Schema.Array(MigrationExecution)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListMigrationExecutionsResponse" }) as any as Schema.Schema<ListMigrationExecutionsResponse>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: "projects/example-project/locations/us-east1" */
  name?: string;
  /** The canonical id for this location. For example: "us-east1". */
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
  /** Role that is assigned to the list of members, or principals. For example, roles/viewer, roles/editor, or roles/owner.For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. members can have the following values: allUsers: A special identifier that represents anyone who is on the internet; with or without a Google account. allAuthenticatedUsers: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. user:{emailid}: An email address that represents a specific Google account. For example, alice@example.com . serviceAccount:{emailid}: An email address that represents a Google service account. For example, my-other-app@appspot.gserviceaccount.com. serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, my-project.svc.id.goog[my-namespace/my-kubernetes-sa]. group:{emailid}: An email address that represents a Google group. For example, admins@example.com. domain:{domain}: The G Suite domain (primary) that represents all the users of that domain. For example, google.com or example.com. principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}: A single identity in a workforce identity pool. principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}: All workforce identities in a group. principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}: All workforce identities with a specific attribute value. principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*: All identities in a workforce identity pool. principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}: A single identity in a workload identity pool. principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}: A workload identity pool group. principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}: All identities in a workload identity pool with a certain attribute. principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*: All identities in a workload identity pool. deleted:user:{emailid}?uid={uniqueid}: An email address (plus unique identifier) representing a user that has been recently deleted. For example, alice@example.com?uid=123456789012345678901. If the user is recovered, this value reverts to user:{emailid} and the recovered user retains the role in the binding. deleted:serviceAccount:{emailid}?uid={uniqueid}: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901. If the service account is undeleted, this value reverts to serviceAccount:{emailid} and the undeleted service account retains the role in the binding. deleted:group:{emailid}?uid={uniqueid}: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, admins@example.com?uid=123456789012345678901. If the group is recovered, this value reverts to group:{emailid} and the recovered group retains the role in the binding. deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}: Deleted single identity in a workforce identity pool. For example, deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value. */
  members?: Array<string>;
  /** The condition that is associated with this binding.If the condition evaluates to true, then this binding applies to the current request.If the condition evaluates to false, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
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
  /** Specifies a service that will be enabled for audit logging. For example, storage.googleapis.com, cloudsql.googleapis.com. allServices is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Policy {
  /** Specifies the format of the policy.Valid values are 0, 1, and 3. Requests that specify an invalid value are rejected.Any operation that affects conditional role bindings must specify version 3. This requirement applies to the following operations: Getting a policy that includes a conditional role binding Adding a conditional role binding to a policy Changing a conditional role binding in a policy Removing any role binding, with or without a condition, from a policy that includes conditionsImportant: If you use IAM Conditions, you must include the etag field whenever you call setIamPolicy. If you omit this field, then IAM allows you to overwrite a version 3 policy with a version 1 policy, and all of the conditions in the version 3 policy are lost.If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of members, or principals, with a role. Optionally, may specify a condition that determines how and when the bindings are applied. Each of the bindings must contain at least one principal.The bindings in a Policy can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the bindings grant 50 different roles to user:alice@example.com, and not to any other principal, then you can add another 1,450 principals to the bindings in the Policy. */
  bindings?: Array<Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** etag is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the etag in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An etag is returned in the response to getIamPolicy, and systems are expected to put that etag in the request to setIamPolicy to ensure that their change will be applied to the same version of the policy.Important: If you use IAM Conditions, you must include the etag field whenever you call setIamPolicy. If you omit this field, then IAM allows you to overwrite a version 3 policy with a version 1 policy, and all of the conditions in the version 3 policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the resource. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used:paths: "bindings, etag" */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the resource. Permissions with wildcards (such as * or storage.*) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of TestPermissionsRequest.permissions that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface HiveMetastoreVersion {
  /** The semantic version of the Hive Metastore software. */
  version?: string;
  /** Whether version will be chosen by the server if a metastore service is created with a HiveMetastoreConfig that omits the version. */
  isDefault?: boolean;
}

export const HiveMetastoreVersion: Schema.Schema<HiveMetastoreVersion> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  isDefault: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "HiveMetastoreVersion" }) as any as Schema.Schema<HiveMetastoreVersion>;

export interface MultiRegionMetadata {
  /** The regions constituting the multi-region. */
  constituentRegions?: Array<string>;
  /** The Spanner witness region for this multi-region. */
  witnessRegion?: string;
  /** The continent for this multi-region. */
  continent?: string;
}

export const MultiRegionMetadata: Schema.Schema<MultiRegionMetadata> = Schema.suspend(() => Schema.Struct({
  constituentRegions: Schema.optional(Schema.Array(Schema.String)),
  witnessRegion: Schema.optional(Schema.String),
  continent: Schema.optional(Schema.String),
})).annotate({ identifier: "MultiRegionMetadata" }) as any as Schema.Schema<MultiRegionMetadata>;

export interface CustomRegionMetadata {
  /** The read-write regions for this custom region. */
  requiredReadWriteRegions?: Array<string>;
  /** The read-only regions for this custom region. */
  optionalReadOnlyRegions?: Array<string>;
  /** The Spanner witness region for this custom region. */
  witnessRegion?: string;
}

export const CustomRegionMetadata: Schema.Schema<CustomRegionMetadata> = Schema.suspend(() => Schema.Struct({
  requiredReadWriteRegions: Schema.optional(Schema.Array(Schema.String)),
  optionalReadOnlyRegions: Schema.optional(Schema.Array(Schema.String)),
  witnessRegion: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomRegionMetadata" }) as any as Schema.Schema<CustomRegionMetadata>;

export interface LocationMetadata {
  /** The versions of Hive Metastore that can be used when creating a new metastore service in this location. The server guarantees that exactly one HiveMetastoreVersion in the list will set is_default. */
  supportedHiveMetastoreVersions?: Array<HiveMetastoreVersion>;
  /** Deprecated: Use a single region service instead. The multi-region metadata if the current region is a multi-region. */
  multiRegionMetadata?: MultiRegionMetadata;
  /** Deprecated: Use a single region service instead. Possible configurations supported if the current region is a custom region. */
  customRegionMetadata?: Array<CustomRegionMetadata>;
}

export const LocationMetadata: Schema.Schema<LocationMetadata> = Schema.suspend(() => Schema.Struct({
  supportedHiveMetastoreVersions: Schema.optional(Schema.Array(HiveMetastoreVersion)),
  multiRegionMetadata: Schema.optional(MultiRegionMetadata),
  customRegionMetadata: Schema.optional(Schema.Array(CustomRegionMetadata)),
})).annotate({ identifier: "LocationMetadata" }) as any as Schema.Schema<LocationMetadata>;

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
  /** Output only. Identifies whether the caller has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED. */
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

export interface QueryMetadataResponse {
  /** The manifest URI is link to a JSON instance in Cloud Storage. This instance manifests immediately along with QueryMetadataResponse. The content of the URI is not retriable until the long-running operation query against the metadata finishes. */
  resultManifestUri?: string;
}

export const QueryMetadataResponse: Schema.Schema<QueryMetadataResponse> = Schema.suspend(() => Schema.Struct({
  resultManifestUri: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryMetadataResponse" }) as any as Schema.Schema<QueryMetadataResponse>;

export interface MoveTableToDatabaseResponse {
}

export const MoveTableToDatabaseResponse: Schema.Schema<MoveTableToDatabaseResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MoveTableToDatabaseResponse" }) as any as Schema.Schema<MoveTableToDatabaseResponse>;

export interface AlterMetadataResourceLocationResponse {
}

export const AlterMetadataResourceLocationResponse: Schema.Schema<AlterMetadataResourceLocationResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AlterMetadataResourceLocationResponse" }) as any as Schema.Schema<AlterMetadataResourceLocationResponse>;

export interface ErrorDetails {
  /** Additional structured details about this error.Keys define the failure items. Value describes the exception or details of the item. */
  details?: Record<string, string>;
}

export const ErrorDetails: Schema.Schema<ErrorDetails> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "ErrorDetails" }) as any as Schema.Schema<ErrorDetails>;

export interface MessageSet {
}

export const MessageSet: Schema.Schema<MessageSet> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MessageSet" }) as any as Schema.Schema<MessageSet>;

export interface StatusProto {
  /** Numeric code drawn from the space specified below. Often, this is the canonical error space, and code is drawn from google3/util/task/codes.proto copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional int32 code = 1; */
  code?: number;
  /** copybara:strip_begin(b/383363683) Space to which this status belongs copybara:strip_end_and_replace optional string space = 2; // Space to which this status belongs */
  space?: string;
  /** Detail message copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional string message = 3; */
  message?: string;
  /** copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional int32 canonical_code = 6; */
  canonicalCode?: number;
  /** message_set associates an arbitrary proto message with the status. copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional proto2.bridge.MessageSet message_set = 5; */
  messageSet?: MessageSet;
}

export const StatusProto: Schema.Schema<StatusProto> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  space: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  canonicalCode: Schema.optional(Schema.Number),
  messageSet: Schema.optional(MessageSet),
})).annotate({ identifier: "StatusProto" }) as any as Schema.Schema<StatusProto>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. This method can be called in two ways: List all public locations: Use the path GET /v1/locations. List project-visible locations: Use the path GET /v1/projects/{project_id}/locations. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like "displayName=tokyo", and is documented in more detail in AIP-160 (https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the next_page_token field in the response. Send that page token to receive the subsequent page. */
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

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED. */
export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. */
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

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. */
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

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED. */
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

/** Lists federations in a project and location. */
export interface ListProjectsLocationsFederationsRequest {
  /** Required. The relative resource name of the location of metastore federations to list, in the following form: projects/{project_number}/locations/{location_id}. */
  parent: string;
  /** Optional. The maximum number of federations to return. The response may contain less than the maximum number. If unspecified, no more than 500 services are returned. The maximum value is 1000; values above 1000 are changed to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous ListFederationServices call. Provide this token to retrieve the subsequent page.To retrieve the first page, supply an empty page token.When paginating, other parameters provided to ListFederationServices must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The filter to apply to list results. */
  filter?: string;
  /** Optional. Specify the ordering of results as described in Sorting Order (https://cloud.google.com/apis/design/design_patterns#sorting_order). If not specified, the results will be sorted in the default order. */
  orderBy?: string;
}

export const ListProjectsLocationsFederationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/federations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsFederationsRequest>;

export type ListProjectsLocationsFederationsResponse = ListFederationsResponse;
export const ListProjectsLocationsFederationsResponse = ListFederationsResponse;

export type ListProjectsLocationsFederationsError = CommonErrors;

export const listProjectsLocationsFederations = API.makePaginated(() => ({
  input: ListProjectsLocationsFederationsRequest,
  output: ListProjectsLocationsFederationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the details of a single federation. */
export interface GetProjectsLocationsFederationsRequest {
  /** Required. The relative resource name of the metastore federation to retrieve, in the following form:projects/{project_number}/locations/{location_id}/federations/{federation_id}. */
  name: string;
}

export const GetProjectsLocationsFederationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/federations/{federationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsFederationsRequest>;

export type GetProjectsLocationsFederationsResponse = Federation;
export const GetProjectsLocationsFederationsResponse = Federation;

export type GetProjectsLocationsFederationsError = CommonErrors;

export const getProjectsLocationsFederations: API.OperationMethod<GetProjectsLocationsFederationsRequest, GetProjectsLocationsFederationsResponse, GetProjectsLocationsFederationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsFederationsRequest,
  output: GetProjectsLocationsFederationsResponse,
  errors: [],
}));

/** Creates a metastore federation in a project and location. */
export interface CreateProjectsLocationsFederationsRequest {
  /** Required. The relative resource name of the location in which to create a federation service, in the following form:projects/{project_number}/locations/{location_id}. */
  parent: string;
  /** Required. The ID of the metastore federation, which is used as the final component of the metastore federation's name.This value must be between 2 and 63 characters long inclusive, begin with a letter, end with a letter or number, and consist of alpha-numeric ASCII characters or hyphens. */
  federationId?: string;
  /** Optional. A request ID. Specify a unique request ID to allow the server to ignore the request if it has completed. The server will ignore subsequent requests that provide a duplicate request ID for at least 60 minutes after the first request.For example, if an initial request times out, followed by another request with the same request ID, the server ignores the second request to prevent the creation of duplicate commitments.The request ID must be a valid UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero UUID (00000000-0000-0000-0000-000000000000) is not supported. */
  requestId?: string;
  /** Request body */
  body?: Federation;
}

export const CreateProjectsLocationsFederationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  federationId: Schema.optional(Schema.String).pipe(T.HttpQuery("federationId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Federation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/federations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsFederationsRequest>;

export type CreateProjectsLocationsFederationsResponse = Operation;
export const CreateProjectsLocationsFederationsResponse = Operation;

export type CreateProjectsLocationsFederationsError = CommonErrors;

export const createProjectsLocationsFederations: API.OperationMethod<CreateProjectsLocationsFederationsRequest, CreateProjectsLocationsFederationsResponse, CreateProjectsLocationsFederationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsFederationsRequest,
  output: CreateProjectsLocationsFederationsResponse,
  errors: [],
}));

/** Updates the fields of a federation. */
export interface PatchProjectsLocationsFederationsRequest {
  /** Immutable. The relative resource name of the federation, of the form: projects/{project_number}/locations/{location_id}/federations/{federation_id}`. */
  name: string;
  /** Required. A field mask used to specify the fields to be overwritten in the metastore federation resource by the update. Fields specified in the update_mask are relative to the resource (not to the full request). A field is overwritten if it is in the mask. */
  updateMask?: string;
  /** Optional. A request ID. Specify a unique request ID to allow the server to ignore the request if it has completed. The server will ignore subsequent requests that provide a duplicate request ID for at least 60 minutes after the first request.For example, if an initial request times out, followed by another request with the same request ID, the server ignores the second request to prevent the creation of duplicate commitments.The request ID must be a valid UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero UUID (00000000-0000-0000-0000-000000000000) is not supported. */
  requestId?: string;
  /** Request body */
  body?: Federation;
}

export const PatchProjectsLocationsFederationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Federation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/federations/{federationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsFederationsRequest>;

export type PatchProjectsLocationsFederationsResponse = Operation;
export const PatchProjectsLocationsFederationsResponse = Operation;

export type PatchProjectsLocationsFederationsError = CommonErrors;

export const patchProjectsLocationsFederations: API.OperationMethod<PatchProjectsLocationsFederationsRequest, PatchProjectsLocationsFederationsResponse, PatchProjectsLocationsFederationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsFederationsRequest,
  output: PatchProjectsLocationsFederationsResponse,
  errors: [],
}));

/** Deletes a single federation. */
export interface DeleteProjectsLocationsFederationsRequest {
  /** Required. The relative resource name of the metastore federation to delete, in the following form:projects/{project_number}/locations/{location_id}/federations/{federation_id}. */
  name: string;
  /** Optional. A request ID. Specify a unique request ID to allow the server to ignore the request if it has completed. The server will ignore subsequent requests that provide a duplicate request ID for at least 60 minutes after the first request.For example, if an initial request times out, followed by another request with the same request ID, the server ignores the second request to prevent the creation of duplicate commitments.The request ID must be a valid UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero UUID (00000000-0000-0000-0000-000000000000) is not supported. */
  requestId?: string;
}

export const DeleteProjectsLocationsFederationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/federations/{federationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsFederationsRequest>;

export type DeleteProjectsLocationsFederationsResponse = Operation;
export const DeleteProjectsLocationsFederationsResponse = Operation;

export type DeleteProjectsLocationsFederationsError = CommonErrors;

export const deleteProjectsLocationsFederations: API.OperationMethod<DeleteProjectsLocationsFederationsRequest, DeleteProjectsLocationsFederationsResponse, DeleteProjectsLocationsFederationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsFederationsRequest,
  output: DeleteProjectsLocationsFederationsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsFederationsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsFederationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/federations/{federationsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsFederationsRequest>;

export type SetIamPolicyProjectsLocationsFederationsResponse = Policy;
export const SetIamPolicyProjectsLocationsFederationsResponse = Policy;

export type SetIamPolicyProjectsLocationsFederationsError = CommonErrors;

export const setIamPolicyProjectsLocationsFederations: API.OperationMethod<SetIamPolicyProjectsLocationsFederationsRequest, SetIamPolicyProjectsLocationsFederationsResponse, SetIamPolicyProjectsLocationsFederationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsFederationsRequest,
  output: SetIamPolicyProjectsLocationsFederationsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsFederationsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsFederationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/federations/{federationsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsFederationsRequest>;

export type GetIamPolicyProjectsLocationsFederationsResponse = Policy;
export const GetIamPolicyProjectsLocationsFederationsResponse = Policy;

export type GetIamPolicyProjectsLocationsFederationsError = CommonErrors;

export const getIamPolicyProjectsLocationsFederations: API.OperationMethod<GetIamPolicyProjectsLocationsFederationsRequest, GetIamPolicyProjectsLocationsFederationsResponse, GetIamPolicyProjectsLocationsFederationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsFederationsRequest,
  output: GetIamPolicyProjectsLocationsFederationsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsFederationsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsFederationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/federations/{federationsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsFederationsRequest>;

export type TestIamPermissionsProjectsLocationsFederationsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsFederationsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsFederationsError = CommonErrors;

export const testIamPermissionsProjectsLocationsFederations: API.OperationMethod<TestIamPermissionsProjectsLocationsFederationsRequest, TestIamPermissionsProjectsLocationsFederationsResponse, TestIamPermissionsProjectsLocationsFederationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsFederationsRequest,
  output: TestIamPermissionsProjectsLocationsFederationsResponse,
  errors: [],
}));

/** Lists services in a project and location. */
export interface ListProjectsLocationsServicesRequest {
  /** Required. The relative resource name of the location of metastore services to list, in the following form:projects/{project_number}/locations/{location_id}. */
  parent: string;
  /** Optional. The maximum number of services to return. The response may contain less than the maximum number. If unspecified, no more than 500 services are returned. The maximum value is 1000; values above 1000 are changed to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous DataprocMetastore.ListServices call. Provide this token to retrieve the subsequent page.To retrieve the first page, supply an empty page token.When paginating, other parameters provided to DataprocMetastore.ListServices must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The filter to apply to list results. */
  filter?: string;
  /** Optional. Specify the ordering of results as described in Sorting Order (https://cloud.google.com/apis/design/design_patterns#sorting_order). If not specified, the results will be sorted in the default order. */
  orderBy?: string;
}

export const ListProjectsLocationsServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsServicesRequest>;

export type ListProjectsLocationsServicesResponse = ListServicesResponse;
export const ListProjectsLocationsServicesResponse = ListServicesResponse;

export type ListProjectsLocationsServicesError = CommonErrors;

export const listProjectsLocationsServices = API.makePaginated(() => ({
  input: ListProjectsLocationsServicesRequest,
  output: ListProjectsLocationsServicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the details of a single service. */
export interface GetProjectsLocationsServicesRequest {
  /** Required. The relative resource name of the metastore service to retrieve, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}. */
  name: string;
}

export const GetProjectsLocationsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsServicesRequest>;

export type GetProjectsLocationsServicesResponse = Service;
export const GetProjectsLocationsServicesResponse = Service;

export type GetProjectsLocationsServicesError = CommonErrors;

export const getProjectsLocationsServices: API.OperationMethod<GetProjectsLocationsServicesRequest, GetProjectsLocationsServicesResponse, GetProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsServicesRequest,
  output: GetProjectsLocationsServicesResponse,
  errors: [],
}));

/** Creates a metastore service in a project and location. */
export interface CreateProjectsLocationsServicesRequest {
  /** Required. The relative resource name of the location in which to create a metastore service, in the following form:projects/{project_number}/locations/{location_id}. */
  parent: string;
  /** Required. The ID of the metastore service, which is used as the final component of the metastore service's name.This value must be between 2 and 63 characters long inclusive, begin with a letter, end with a letter or number, and consist of alpha-numeric ASCII characters or hyphens. */
  serviceId?: string;
  /** Optional. A request ID. Specify a unique request ID to allow the server to ignore the request if it has completed. The server will ignore subsequent requests that provide a duplicate request ID for at least 60 minutes after the first request.For example, if an initial request times out, followed by another request with the same request ID, the server ignores the second request to prevent the creation of duplicate commitments.The request ID must be a valid UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero UUID (00000000-0000-0000-0000-000000000000) is not supported. */
  requestId?: string;
  /** Request body */
  body?: Service;
}

export const CreateProjectsLocationsServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  serviceId: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsServicesRequest>;

export type CreateProjectsLocationsServicesResponse = Operation;
export const CreateProjectsLocationsServicesResponse = Operation;

export type CreateProjectsLocationsServicesError = CommonErrors;

export const createProjectsLocationsServices: API.OperationMethod<CreateProjectsLocationsServicesRequest, CreateProjectsLocationsServicesResponse, CreateProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsServicesRequest,
  output: CreateProjectsLocationsServicesResponse,
  errors: [],
}));

/** Updates the parameters of a single service. */
export interface PatchProjectsLocationsServicesRequest {
  /** Immutable. Identifier. The relative resource name of the metastore service, in the following format:projects/{project_number}/locations/{location_id}/services/{service_id}. */
  name: string;
  /** Required. A field mask used to specify the fields to be overwritten in the metastore service resource by the update. Fields specified in the update_mask are relative to the resource (not to the full request). A field is overwritten if it is in the mask. */
  updateMask?: string;
  /** Optional. A request ID. Specify a unique request ID to allow the server to ignore the request if it has completed. The server will ignore subsequent requests that provide a duplicate request ID for at least 60 minutes after the first request.For example, if an initial request times out, followed by another request with the same request ID, the server ignores the second request to prevent the creation of duplicate commitments.The request ID must be a valid UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero UUID (00000000-0000-0000-0000-000000000000) is not supported. */
  requestId?: string;
  /** Request body */
  body?: Service;
}

export const PatchProjectsLocationsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsServicesRequest>;

export type PatchProjectsLocationsServicesResponse = Operation;
export const PatchProjectsLocationsServicesResponse = Operation;

export type PatchProjectsLocationsServicesError = CommonErrors;

export const patchProjectsLocationsServices: API.OperationMethod<PatchProjectsLocationsServicesRequest, PatchProjectsLocationsServicesResponse, PatchProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsServicesRequest,
  output: PatchProjectsLocationsServicesResponse,
  errors: [],
}));

/** Deletes a single service. */
export interface DeleteProjectsLocationsServicesRequest {
  /** Required. The relative resource name of the metastore service to delete, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}. */
  name: string;
  /** Optional. A request ID. Specify a unique request ID to allow the server to ignore the request if it has completed. The server will ignore subsequent requests that provide a duplicate request ID for at least 60 minutes after the first request.For example, if an initial request times out, followed by another request with the same request ID, the server ignores the second request to prevent the creation of duplicate commitments.The request ID must be a valid UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero UUID (00000000-0000-0000-0000-000000000000) is not supported. */
  requestId?: string;
}

export const DeleteProjectsLocationsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsServicesRequest>;

export type DeleteProjectsLocationsServicesResponse = Operation;
export const DeleteProjectsLocationsServicesResponse = Operation;

export type DeleteProjectsLocationsServicesError = CommonErrors;

export const deleteProjectsLocationsServices: API.OperationMethod<DeleteProjectsLocationsServicesRequest, DeleteProjectsLocationsServicesResponse, DeleteProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsServicesRequest,
  output: DeleteProjectsLocationsServicesResponse,
  errors: [],
}));

/** Exports metadata from a service. */
export interface ExportMetadataProjectsLocationsServicesRequest {
  /** Required. The relative resource name of the metastore service to run export, in the following form:projects/{project_id}/locations/{location_id}/services/{service_id}. */
  service: string;
  /** Request body */
  body?: ExportMetadataRequest;
}

export const ExportMetadataProjectsLocationsServicesRequest = Schema.Struct({
  service: Schema.String.pipe(T.HttpPath("service")),
  body: Schema.optional(ExportMetadataRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:exportMetadata", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportMetadataProjectsLocationsServicesRequest>;

export type ExportMetadataProjectsLocationsServicesResponse = Operation;
export const ExportMetadataProjectsLocationsServicesResponse = Operation;

export type ExportMetadataProjectsLocationsServicesError = CommonErrors;

export const exportMetadataProjectsLocationsServices: API.OperationMethod<ExportMetadataProjectsLocationsServicesRequest, ExportMetadataProjectsLocationsServicesResponse, ExportMetadataProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportMetadataProjectsLocationsServicesRequest,
  output: ExportMetadataProjectsLocationsServicesResponse,
  errors: [],
}));

/** Restores a service from a backup. */
export interface RestoreProjectsLocationsServicesRequest {
  /** Required. The relative resource name of the metastore service to run restore, in the following form:projects/{project_id}/locations/{location_id}/services/{service_id}. */
  service: string;
  /** Request body */
  body?: RestoreServiceRequest;
}

export const RestoreProjectsLocationsServicesRequest = Schema.Struct({
  service: Schema.String.pipe(T.HttpPath("service")),
  body: Schema.optional(RestoreServiceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsLocationsServicesRequest>;

export type RestoreProjectsLocationsServicesResponse = Operation;
export const RestoreProjectsLocationsServicesResponse = Operation;

export type RestoreProjectsLocationsServicesError = CommonErrors;

export const restoreProjectsLocationsServices: API.OperationMethod<RestoreProjectsLocationsServicesRequest, RestoreProjectsLocationsServicesResponse, RestoreProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreProjectsLocationsServicesRequest,
  output: RestoreProjectsLocationsServicesResponse,
  errors: [],
}));

/** Query Dataproc Metastore metadata. */
export interface QueryMetadataProjectsLocationsServicesRequest {
  /** Required. The relative resource name of the metastore service to query metadata, in the following format:projects/{project_id}/locations/{location_id}/services/{service_id}. */
  service: string;
  /** Request body */
  body?: QueryMetadataRequest;
}

export const QueryMetadataProjectsLocationsServicesRequest = Schema.Struct({
  service: Schema.String.pipe(T.HttpPath("service")),
  body: Schema.optional(QueryMetadataRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:queryMetadata", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryMetadataProjectsLocationsServicesRequest>;

export type QueryMetadataProjectsLocationsServicesResponse = Operation;
export const QueryMetadataProjectsLocationsServicesResponse = Operation;

export type QueryMetadataProjectsLocationsServicesError = CommonErrors;

export const queryMetadataProjectsLocationsServices: API.OperationMethod<QueryMetadataProjectsLocationsServicesRequest, QueryMetadataProjectsLocationsServicesResponse, QueryMetadataProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryMetadataProjectsLocationsServicesRequest,
  output: QueryMetadataProjectsLocationsServicesResponse,
  errors: [],
}));

/** Move a table to another database. */
export interface MoveTableToDatabaseProjectsLocationsServicesRequest {
  /** Required. The relative resource name of the metastore service to mutate metadata, in the following format:projects/{project_id}/locations/{location_id}/services/{service_id}. */
  service: string;
  /** Request body */
  body?: MoveTableToDatabaseRequest;
}

export const MoveTableToDatabaseProjectsLocationsServicesRequest = Schema.Struct({
  service: Schema.String.pipe(T.HttpPath("service")),
  body: Schema.optional(MoveTableToDatabaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:moveTableToDatabase", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveTableToDatabaseProjectsLocationsServicesRequest>;

export type MoveTableToDatabaseProjectsLocationsServicesResponse = Operation;
export const MoveTableToDatabaseProjectsLocationsServicesResponse = Operation;

export type MoveTableToDatabaseProjectsLocationsServicesError = CommonErrors;

export const moveTableToDatabaseProjectsLocationsServices: API.OperationMethod<MoveTableToDatabaseProjectsLocationsServicesRequest, MoveTableToDatabaseProjectsLocationsServicesResponse, MoveTableToDatabaseProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveTableToDatabaseProjectsLocationsServicesRequest,
  output: MoveTableToDatabaseProjectsLocationsServicesResponse,
  errors: [],
}));

/** Alter metadata resource location. The metadata resource can be a database, table, or partition. This functionality only updates the parent directory for the respective metadata resource and does not transfer any existing data to the new location. */
export interface AlterLocationProjectsLocationsServicesRequest {
  /** Required. The relative resource name of the metastore service to mutate metadata, in the following format:projects/{project_id}/locations/{location_id}/services/{service_id}. */
  service: string;
  /** Request body */
  body?: AlterMetadataResourceLocationRequest;
}

export const AlterLocationProjectsLocationsServicesRequest = Schema.Struct({
  service: Schema.String.pipe(T.HttpPath("service")),
  body: Schema.optional(AlterMetadataResourceLocationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:alterLocation", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AlterLocationProjectsLocationsServicesRequest>;

export type AlterLocationProjectsLocationsServicesResponse = Operation;
export const AlterLocationProjectsLocationsServicesResponse = Operation;

export type AlterLocationProjectsLocationsServicesError = CommonErrors;

export const alterLocationProjectsLocationsServices: API.OperationMethod<AlterLocationProjectsLocationsServicesRequest, AlterLocationProjectsLocationsServicesResponse, AlterLocationProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AlterLocationProjectsLocationsServicesRequest,
  output: AlterLocationProjectsLocationsServicesResponse,
  errors: [],
}));

/** Alter metadata table properties. */
export interface AlterTablePropertiesProjectsLocationsServicesRequest {
  /** Required. The relative resource name of the Dataproc Metastore service that's being used to mutate metadata table properties, in the following format:projects/{project_id}/locations/{location_id}/services/{service_id}. */
  service: string;
  /** Request body */
  body?: AlterTablePropertiesRequest;
}

export const AlterTablePropertiesProjectsLocationsServicesRequest = Schema.Struct({
  service: Schema.String.pipe(T.HttpPath("service")),
  body: Schema.optional(AlterTablePropertiesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:alterTableProperties", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AlterTablePropertiesProjectsLocationsServicesRequest>;

export type AlterTablePropertiesProjectsLocationsServicesResponse = Operation;
export const AlterTablePropertiesProjectsLocationsServicesResponse = Operation;

export type AlterTablePropertiesProjectsLocationsServicesError = CommonErrors;

export const alterTablePropertiesProjectsLocationsServices: API.OperationMethod<AlterTablePropertiesProjectsLocationsServicesRequest, AlterTablePropertiesProjectsLocationsServicesResponse, AlterTablePropertiesProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AlterTablePropertiesProjectsLocationsServicesRequest,
  output: AlterTablePropertiesProjectsLocationsServicesResponse,
  errors: [],
}));

/** Starts the Managed Migration process. */
export interface StartMigrationProjectsLocationsServicesRequest {
  /** Required. The relative resource name of the metastore service to start migrating to, in the following format:projects/{project_id}/locations/{location_id}/services/{service_id}. */
  service: string;
  /** Request body */
  body?: StartMigrationRequest;
}

export const StartMigrationProjectsLocationsServicesRequest = Schema.Struct({
  service: Schema.String.pipe(T.HttpPath("service")),
  body: Schema.optional(StartMigrationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:startMigration", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartMigrationProjectsLocationsServicesRequest>;

export type StartMigrationProjectsLocationsServicesResponse = Operation;
export const StartMigrationProjectsLocationsServicesResponse = Operation;

export type StartMigrationProjectsLocationsServicesError = CommonErrors;

export const startMigrationProjectsLocationsServices: API.OperationMethod<StartMigrationProjectsLocationsServicesRequest, StartMigrationProjectsLocationsServicesResponse, StartMigrationProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartMigrationProjectsLocationsServicesRequest,
  output: StartMigrationProjectsLocationsServicesResponse,
  errors: [],
}));

/** Completes the managed migration process. The Dataproc Metastore service will switch to using its own backend database after successful migration. */
export interface CompleteMigrationProjectsLocationsServicesRequest {
  /** Required. The relative resource name of the metastore service to complete the migration to, in the following format:projects/{project_id}/locations/{location_id}/services/{service_id}. */
  service: string;
  /** Request body */
  body?: CompleteMigrationRequest;
}

export const CompleteMigrationProjectsLocationsServicesRequest = Schema.Struct({
  service: Schema.String.pipe(T.HttpPath("service")),
  body: Schema.optional(CompleteMigrationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:completeMigration", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CompleteMigrationProjectsLocationsServicesRequest>;

export type CompleteMigrationProjectsLocationsServicesResponse = Operation;
export const CompleteMigrationProjectsLocationsServicesResponse = Operation;

export type CompleteMigrationProjectsLocationsServicesError = CommonErrors;

export const completeMigrationProjectsLocationsServices: API.OperationMethod<CompleteMigrationProjectsLocationsServicesRequest, CompleteMigrationProjectsLocationsServicesResponse, CompleteMigrationProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CompleteMigrationProjectsLocationsServicesRequest,
  output: CompleteMigrationProjectsLocationsServicesResponse,
  errors: [],
}));

/** Cancels the ongoing Managed Migration process. */
export interface CancelMigrationProjectsLocationsServicesRequest {
  /** Required. The relative resource name of the metastore service to cancel the ongoing migration to, in the following format:projects/{project_id}/locations/{location_id}/services/{service_id}. */
  service: string;
  /** Request body */
  body?: CancelMigrationRequest;
}

export const CancelMigrationProjectsLocationsServicesRequest = Schema.Struct({
  service: Schema.String.pipe(T.HttpPath("service")),
  body: Schema.optional(CancelMigrationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:cancelMigration", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelMigrationProjectsLocationsServicesRequest>;

export type CancelMigrationProjectsLocationsServicesResponse = Operation;
export const CancelMigrationProjectsLocationsServicesResponse = Operation;

export type CancelMigrationProjectsLocationsServicesError = CommonErrors;

export const cancelMigrationProjectsLocationsServices: API.OperationMethod<CancelMigrationProjectsLocationsServicesRequest, CancelMigrationProjectsLocationsServicesResponse, CancelMigrationProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelMigrationProjectsLocationsServicesRequest,
  output: CancelMigrationProjectsLocationsServicesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsServicesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsServicesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsServicesRequest>;

export type SetIamPolicyProjectsLocationsServicesResponse = Policy;
export const SetIamPolicyProjectsLocationsServicesResponse = Policy;

export type SetIamPolicyProjectsLocationsServicesError = CommonErrors;

export const setIamPolicyProjectsLocationsServices: API.OperationMethod<SetIamPolicyProjectsLocationsServicesRequest, SetIamPolicyProjectsLocationsServicesResponse, SetIamPolicyProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsServicesRequest,
  output: SetIamPolicyProjectsLocationsServicesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsServicesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsServicesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsServicesRequest>;

export type GetIamPolicyProjectsLocationsServicesResponse = Policy;
export const GetIamPolicyProjectsLocationsServicesResponse = Policy;

export type GetIamPolicyProjectsLocationsServicesError = CommonErrors;

export const getIamPolicyProjectsLocationsServices: API.OperationMethod<GetIamPolicyProjectsLocationsServicesRequest, GetIamPolicyProjectsLocationsServicesResponse, GetIamPolicyProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsServicesRequest,
  output: GetIamPolicyProjectsLocationsServicesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsServicesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsServicesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsServicesRequest>;

export type TestIamPermissionsProjectsLocationsServicesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsServicesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsServicesError = CommonErrors;

export const testIamPermissionsProjectsLocationsServices: API.OperationMethod<TestIamPermissionsProjectsLocationsServicesRequest, TestIamPermissionsProjectsLocationsServicesResponse, TestIamPermissionsProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsServicesRequest,
  output: TestIamPermissionsProjectsLocationsServicesResponse,
  errors: [],
}));

/** Lists imports in a service. */
export interface ListProjectsLocationsServicesMetadataImportsRequest {
  /** Required. The relative resource name of the service whose metadata imports to list, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}/metadataImports. */
  parent: string;
  /** Optional. The maximum number of imports to return. The response may contain less than the maximum number. If unspecified, no more than 500 imports are returned. The maximum value is 1000; values above 1000 are changed to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous DataprocMetastore.ListServices call. Provide this token to retrieve the subsequent page.To retrieve the first page, supply an empty page token.When paginating, other parameters provided to DataprocMetastore.ListServices must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The filter to apply to list results. */
  filter?: string;
  /** Optional. Specify the ordering of results as described in Sorting Order (https://cloud.google.com/apis/design/design_patterns#sorting_order). If not specified, the results will be sorted in the default order. */
  orderBy?: string;
}

export const ListProjectsLocationsServicesMetadataImportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/metadataImports" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsServicesMetadataImportsRequest>;

export type ListProjectsLocationsServicesMetadataImportsResponse = ListMetadataImportsResponse;
export const ListProjectsLocationsServicesMetadataImportsResponse = ListMetadataImportsResponse;

export type ListProjectsLocationsServicesMetadataImportsError = CommonErrors;

export const listProjectsLocationsServicesMetadataImports = API.makePaginated(() => ({
  input: ListProjectsLocationsServicesMetadataImportsRequest,
  output: ListProjectsLocationsServicesMetadataImportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single import. */
export interface GetProjectsLocationsServicesMetadataImportsRequest {
  /** Required. The relative resource name of the metadata import to retrieve, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}/metadataImports/{import_id}. */
  name: string;
}

export const GetProjectsLocationsServicesMetadataImportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/metadataImports/{metadataImportsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsServicesMetadataImportsRequest>;

export type GetProjectsLocationsServicesMetadataImportsResponse = MetadataImport;
export const GetProjectsLocationsServicesMetadataImportsResponse = MetadataImport;

export type GetProjectsLocationsServicesMetadataImportsError = CommonErrors;

export const getProjectsLocationsServicesMetadataImports: API.OperationMethod<GetProjectsLocationsServicesMetadataImportsRequest, GetProjectsLocationsServicesMetadataImportsResponse, GetProjectsLocationsServicesMetadataImportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsServicesMetadataImportsRequest,
  output: GetProjectsLocationsServicesMetadataImportsResponse,
  errors: [],
}));

/** Creates a new MetadataImport in a given project and location. */
export interface CreateProjectsLocationsServicesMetadataImportsRequest {
  /** Required. The relative resource name of the service in which to create a metastore import, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}. */
  parent: string;
  /** Required. The ID of the metadata import, which is used as the final component of the metadata import's name.This value must be between 1 and 64 characters long, begin with a letter, end with a letter or number, and consist of alpha-numeric ASCII characters or hyphens. */
  metadataImportId?: string;
  /** Optional. A request ID. Specify a unique request ID to allow the server to ignore the request if it has completed. The server will ignore subsequent requests that provide a duplicate request ID for at least 60 minutes after the first request.For example, if an initial request times out, followed by another request with the same request ID, the server ignores the second request to prevent the creation of duplicate commitments.The request ID must be a valid UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero UUID (00000000-0000-0000-0000-000000000000) is not supported. */
  requestId?: string;
  /** Request body */
  body?: MetadataImport;
}

export const CreateProjectsLocationsServicesMetadataImportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  metadataImportId: Schema.optional(Schema.String).pipe(T.HttpQuery("metadataImportId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(MetadataImport).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/metadataImports", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsServicesMetadataImportsRequest>;

export type CreateProjectsLocationsServicesMetadataImportsResponse = Operation;
export const CreateProjectsLocationsServicesMetadataImportsResponse = Operation;

export type CreateProjectsLocationsServicesMetadataImportsError = CommonErrors;

export const createProjectsLocationsServicesMetadataImports: API.OperationMethod<CreateProjectsLocationsServicesMetadataImportsRequest, CreateProjectsLocationsServicesMetadataImportsResponse, CreateProjectsLocationsServicesMetadataImportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsServicesMetadataImportsRequest,
  output: CreateProjectsLocationsServicesMetadataImportsResponse,
  errors: [],
}));

/** Updates a single import. Only the description field of MetadataImport is supported to be updated. */
export interface PatchProjectsLocationsServicesMetadataImportsRequest {
  /** Immutable. Identifier. The relative resource name of the metadata import, of the form:projects/{project_number}/locations/{location_id}/services/{service_id}/metadataImports/{metadata_import_id}. */
  name: string;
  /** Required. A field mask used to specify the fields to be overwritten in the metadata import resource by the update. Fields specified in the update_mask are relative to the resource (not to the full request). A field is overwritten if it is in the mask. */
  updateMask?: string;
  /** Optional. A request ID. Specify a unique request ID to allow the server to ignore the request if it has completed. The server will ignore subsequent requests that provide a duplicate request ID for at least 60 minutes after the first request.For example, if an initial request times out, followed by another request with the same request ID, the server ignores the second request to prevent the creation of duplicate commitments.The request ID must be a valid UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero UUID (00000000-0000-0000-0000-000000000000) is not supported. */
  requestId?: string;
  /** Request body */
  body?: MetadataImport;
}

export const PatchProjectsLocationsServicesMetadataImportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(MetadataImport).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/metadataImports/{metadataImportsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsServicesMetadataImportsRequest>;

export type PatchProjectsLocationsServicesMetadataImportsResponse = Operation;
export const PatchProjectsLocationsServicesMetadataImportsResponse = Operation;

export type PatchProjectsLocationsServicesMetadataImportsError = CommonErrors;

export const patchProjectsLocationsServicesMetadataImports: API.OperationMethod<PatchProjectsLocationsServicesMetadataImportsRequest, PatchProjectsLocationsServicesMetadataImportsResponse, PatchProjectsLocationsServicesMetadataImportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsServicesMetadataImportsRequest,
  output: PatchProjectsLocationsServicesMetadataImportsResponse,
  errors: [],
}));

/** Lists backups in a service. */
export interface ListProjectsLocationsServicesBackupsRequest {
  /** Required. The relative resource name of the service whose backups to list, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}/backups. */
  parent: string;
  /** Optional. The maximum number of backups to return. The response may contain less than the maximum number. If unspecified, no more than 500 backups are returned. The maximum value is 1000; values above 1000 are changed to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous DataprocMetastore.ListBackups call. Provide this token to retrieve the subsequent page.To retrieve the first page, supply an empty page token.When paginating, other parameters provided to DataprocMetastore.ListBackups must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The filter to apply to list results. */
  filter?: string;
  /** Optional. Specify the ordering of results as described in Sorting Order (https://cloud.google.com/apis/design/design_patterns#sorting_order). If not specified, the results will be sorted in the default order. */
  orderBy?: string;
}

export const ListProjectsLocationsServicesBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/backups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsServicesBackupsRequest>;

export type ListProjectsLocationsServicesBackupsResponse = ListBackupsResponse;
export const ListProjectsLocationsServicesBackupsResponse = ListBackupsResponse;

export type ListProjectsLocationsServicesBackupsError = CommonErrors;

export const listProjectsLocationsServicesBackups = API.makePaginated(() => ({
  input: ListProjectsLocationsServicesBackupsRequest,
  output: ListProjectsLocationsServicesBackupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single backup. */
export interface GetProjectsLocationsServicesBackupsRequest {
  /** Required. The relative resource name of the backup to retrieve, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}/backups/{backup_id}. */
  name: string;
}

export const GetProjectsLocationsServicesBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsServicesBackupsRequest>;

export type GetProjectsLocationsServicesBackupsResponse = Backup;
export const GetProjectsLocationsServicesBackupsResponse = Backup;

export type GetProjectsLocationsServicesBackupsError = CommonErrors;

export const getProjectsLocationsServicesBackups: API.OperationMethod<GetProjectsLocationsServicesBackupsRequest, GetProjectsLocationsServicesBackupsResponse, GetProjectsLocationsServicesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsServicesBackupsRequest,
  output: GetProjectsLocationsServicesBackupsResponse,
  errors: [],
}));

/** Creates a new backup in a given project and location. */
export interface CreateProjectsLocationsServicesBackupsRequest {
  /** Required. The relative resource name of the service in which to create a backup of the following form:projects/{project_number}/locations/{location_id}/services/{service_id}. */
  parent: string;
  /** Required. The ID of the backup, which is used as the final component of the backup's name.This value must be between 1 and 64 characters long, begin with a letter, end with a letter or number, and consist of alpha-numeric ASCII characters or hyphens. */
  backupId?: string;
  /** Optional. A request ID. Specify a unique request ID to allow the server to ignore the request if it has completed. The server will ignore subsequent requests that provide a duplicate request ID for at least 60 minutes after the first request.For example, if an initial request times out, followed by another request with the same request ID, the server ignores the second request to prevent the creation of duplicate commitments.The request ID must be a valid UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero UUID (00000000-0000-0000-0000-000000000000) is not supported. */
  requestId?: string;
  /** Request body */
  body?: Backup;
}

export const CreateProjectsLocationsServicesBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  backupId: Schema.optional(Schema.String).pipe(T.HttpQuery("backupId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Backup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/backups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsServicesBackupsRequest>;

export type CreateProjectsLocationsServicesBackupsResponse = Operation;
export const CreateProjectsLocationsServicesBackupsResponse = Operation;

export type CreateProjectsLocationsServicesBackupsError = CommonErrors;

export const createProjectsLocationsServicesBackups: API.OperationMethod<CreateProjectsLocationsServicesBackupsRequest, CreateProjectsLocationsServicesBackupsResponse, CreateProjectsLocationsServicesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsServicesBackupsRequest,
  output: CreateProjectsLocationsServicesBackupsResponse,
  errors: [],
}));

/** Deletes a single backup. */
export interface DeleteProjectsLocationsServicesBackupsRequest {
  /** Required. The relative resource name of the backup to delete, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}/backups/{backup_id}. */
  name: string;
  /** Optional. A request ID. Specify a unique request ID to allow the server to ignore the request if it has completed. The server will ignore subsequent requests that provide a duplicate request ID for at least 60 minutes after the first request.For example, if an initial request times out, followed by another request with the same request ID, the server ignores the second request to prevent the creation of duplicate commitments.The request ID must be a valid UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero UUID (00000000-0000-0000-0000-000000000000) is not supported. */
  requestId?: string;
}

export const DeleteProjectsLocationsServicesBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsServicesBackupsRequest>;

export type DeleteProjectsLocationsServicesBackupsResponse = Operation;
export const DeleteProjectsLocationsServicesBackupsResponse = Operation;

export type DeleteProjectsLocationsServicesBackupsError = CommonErrors;

export const deleteProjectsLocationsServicesBackups: API.OperationMethod<DeleteProjectsLocationsServicesBackupsRequest, DeleteProjectsLocationsServicesBackupsResponse, DeleteProjectsLocationsServicesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsServicesBackupsRequest,
  output: DeleteProjectsLocationsServicesBackupsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsServicesBackupsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsServicesBackupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/backups/{backupsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsServicesBackupsRequest>;

export type SetIamPolicyProjectsLocationsServicesBackupsResponse = Policy;
export const SetIamPolicyProjectsLocationsServicesBackupsResponse = Policy;

export type SetIamPolicyProjectsLocationsServicesBackupsError = CommonErrors;

export const setIamPolicyProjectsLocationsServicesBackups: API.OperationMethod<SetIamPolicyProjectsLocationsServicesBackupsRequest, SetIamPolicyProjectsLocationsServicesBackupsResponse, SetIamPolicyProjectsLocationsServicesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsServicesBackupsRequest,
  output: SetIamPolicyProjectsLocationsServicesBackupsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsServicesBackupsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsServicesBackupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/backups/{backupsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsServicesBackupsRequest>;

export type GetIamPolicyProjectsLocationsServicesBackupsResponse = Policy;
export const GetIamPolicyProjectsLocationsServicesBackupsResponse = Policy;

export type GetIamPolicyProjectsLocationsServicesBackupsError = CommonErrors;

export const getIamPolicyProjectsLocationsServicesBackups: API.OperationMethod<GetIamPolicyProjectsLocationsServicesBackupsRequest, GetIamPolicyProjectsLocationsServicesBackupsResponse, GetIamPolicyProjectsLocationsServicesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsServicesBackupsRequest,
  output: GetIamPolicyProjectsLocationsServicesBackupsResponse,
  errors: [],
}));

/** Gets details of a single migration execution. */
export interface GetProjectsLocationsServicesMigrationExecutionsRequest {
  /** Required. The relative resource name of the migration execution to retrieve, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}/migrationExecutions/{migration_execution_id}. */
  name: string;
}

export const GetProjectsLocationsServicesMigrationExecutionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/migrationExecutions/{migrationExecutionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsServicesMigrationExecutionsRequest>;

export type GetProjectsLocationsServicesMigrationExecutionsResponse = MigrationExecution;
export const GetProjectsLocationsServicesMigrationExecutionsResponse = MigrationExecution;

export type GetProjectsLocationsServicesMigrationExecutionsError = CommonErrors;

export const getProjectsLocationsServicesMigrationExecutions: API.OperationMethod<GetProjectsLocationsServicesMigrationExecutionsRequest, GetProjectsLocationsServicesMigrationExecutionsResponse, GetProjectsLocationsServicesMigrationExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsServicesMigrationExecutionsRequest,
  output: GetProjectsLocationsServicesMigrationExecutionsResponse,
  errors: [],
}));

/** Lists migration executions on a service. */
export interface ListProjectsLocationsServicesMigrationExecutionsRequest {
  /** Required. The relative resource name of the service whose migration executions to list, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}/migrationExecutions. */
  parent: string;
  /** Optional. The maximum number of migration executions to return. The response may contain less than the maximum number. If unspecified, no more than 500 migration executions are returned. The maximum value is 1000; values above 1000 are changed to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous DataprocMetastore.ListMigrationExecutions call. Provide this token to retrieve the subsequent page.To retrieve the first page, supply an empty page token.When paginating, other parameters provided to DataprocMetastore.ListMigrationExecutions must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The filter to apply to list results. */
  filter?: string;
  /** Optional. Specify the ordering of results as described in Sorting Order (https://cloud.google.com/apis/design/design_patterns#sorting_order). If not specified, the results will be sorted in the default order. */
  orderBy?: string;
}

export const ListProjectsLocationsServicesMigrationExecutionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/migrationExecutions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsServicesMigrationExecutionsRequest>;

export type ListProjectsLocationsServicesMigrationExecutionsResponse = ListMigrationExecutionsResponse;
export const ListProjectsLocationsServicesMigrationExecutionsResponse = ListMigrationExecutionsResponse;

export type ListProjectsLocationsServicesMigrationExecutionsError = CommonErrors;

export const listProjectsLocationsServicesMigrationExecutions = API.makePaginated(() => ({
  input: ListProjectsLocationsServicesMigrationExecutionsRequest,
  output: ListProjectsLocationsServicesMigrationExecutionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a single migration execution. */
export interface DeleteProjectsLocationsServicesMigrationExecutionsRequest {
  /** Required. The relative resource name of the migrationExecution to delete, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}/migrationExecutions/{migration_execution_id}. */
  name: string;
  /** Optional. A request ID. Specify a unique request ID to allow the server to ignore the request if it has completed. The server will ignore subsequent requests that provide a duplicate request ID for at least 60 minutes after the first request.For example, if an initial request times out, followed by another request with the same request ID, the server ignores the second request to prevent the creation of duplicate commitments.The request ID must be a valid UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero UUID (00000000-0000-0000-0000-000000000000) is not supported. */
  requestId?: string;
}

export const DeleteProjectsLocationsServicesMigrationExecutionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/migrationExecutions/{migrationExecutionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsServicesMigrationExecutionsRequest>;

export type DeleteProjectsLocationsServicesMigrationExecutionsResponse = Operation;
export const DeleteProjectsLocationsServicesMigrationExecutionsResponse = Operation;

export type DeleteProjectsLocationsServicesMigrationExecutionsError = CommonErrors;

export const deleteProjectsLocationsServicesMigrationExecutions: API.OperationMethod<DeleteProjectsLocationsServicesMigrationExecutionsRequest, DeleteProjectsLocationsServicesMigrationExecutionsResponse, DeleteProjectsLocationsServicesMigrationExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsServicesMigrationExecutionsRequest,
  output: DeleteProjectsLocationsServicesMigrationExecutionsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsServicesDatabasesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsServicesDatabasesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/databases/{databasesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsServicesDatabasesRequest>;

export type SetIamPolicyProjectsLocationsServicesDatabasesResponse = Policy;
export const SetIamPolicyProjectsLocationsServicesDatabasesResponse = Policy;

export type SetIamPolicyProjectsLocationsServicesDatabasesError = CommonErrors;

export const setIamPolicyProjectsLocationsServicesDatabases: API.OperationMethod<SetIamPolicyProjectsLocationsServicesDatabasesRequest, SetIamPolicyProjectsLocationsServicesDatabasesResponse, SetIamPolicyProjectsLocationsServicesDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsServicesDatabasesRequest,
  output: SetIamPolicyProjectsLocationsServicesDatabasesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsServicesDatabasesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsServicesDatabasesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/databases/{databasesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsServicesDatabasesRequest>;

export type GetIamPolicyProjectsLocationsServicesDatabasesResponse = Policy;
export const GetIamPolicyProjectsLocationsServicesDatabasesResponse = Policy;

export type GetIamPolicyProjectsLocationsServicesDatabasesError = CommonErrors;

export const getIamPolicyProjectsLocationsServicesDatabases: API.OperationMethod<GetIamPolicyProjectsLocationsServicesDatabasesRequest, GetIamPolicyProjectsLocationsServicesDatabasesResponse, GetIamPolicyProjectsLocationsServicesDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsServicesDatabasesRequest,
  output: GetIamPolicyProjectsLocationsServicesDatabasesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsServicesDatabasesTablesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsServicesDatabasesTablesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/databases/{databasesId}/tables/{tablesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsServicesDatabasesTablesRequest>;

export type SetIamPolicyProjectsLocationsServicesDatabasesTablesResponse = Policy;
export const SetIamPolicyProjectsLocationsServicesDatabasesTablesResponse = Policy;

export type SetIamPolicyProjectsLocationsServicesDatabasesTablesError = CommonErrors;

export const setIamPolicyProjectsLocationsServicesDatabasesTables: API.OperationMethod<SetIamPolicyProjectsLocationsServicesDatabasesTablesRequest, SetIamPolicyProjectsLocationsServicesDatabasesTablesResponse, SetIamPolicyProjectsLocationsServicesDatabasesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsServicesDatabasesTablesRequest,
  output: SetIamPolicyProjectsLocationsServicesDatabasesTablesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsServicesDatabasesTablesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsServicesDatabasesTablesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/databases/{databasesId}/tables/{tablesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsServicesDatabasesTablesRequest>;

export type GetIamPolicyProjectsLocationsServicesDatabasesTablesResponse = Policy;
export const GetIamPolicyProjectsLocationsServicesDatabasesTablesResponse = Policy;

export type GetIamPolicyProjectsLocationsServicesDatabasesTablesError = CommonErrors;

export const getIamPolicyProjectsLocationsServicesDatabasesTables: API.OperationMethod<GetIamPolicyProjectsLocationsServicesDatabasesTablesRequest, GetIamPolicyProjectsLocationsServicesDatabasesTablesResponse, GetIamPolicyProjectsLocationsServicesDatabasesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsServicesDatabasesTablesRequest,
  output: GetIamPolicyProjectsLocationsServicesDatabasesTablesResponse,
  errors: [],
}));

