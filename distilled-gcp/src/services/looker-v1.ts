// ==========================================================================
// Looker (Google Cloud core) API (looker v1)
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
  name: "looker",
  version: "v1",
  rootUrl: "https://looker.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface OAuthConfig {
  /** Input only. Client secret from an external OAuth application. This is an input-only field, and thus will not be set in any responses. */
  clientSecret?: string;
  /** Input only. Client ID from an external OAuth application. This is an input-only field, and thus will not be set in any responses. */
  clientId?: string;
  /** Optional. Whether to use the shared OAuth client. Instances specifying this field do not need to provide client_id and client_secret. */
  sharedOauthClientEnabled?: boolean;
}

export const OAuthConfig: Schema.Schema<OAuthConfig> = Schema.suspend(() => Schema.Struct({
  clientSecret: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  sharedOauthClientEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "OAuthConfig" }) as any as Schema.Schema<OAuthConfig>;

export interface AdminSettings {
  /** Email domain allowlist for the instance. */
  allowedEmailDomains?: Array<string>;
}

export const AdminSettings: Schema.Schema<AdminSettings> = Schema.suspend(() => Schema.Struct({
  allowedEmailDomains: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AdminSettings" }) as any as Schema.Schema<AdminSettings>;

export interface ExportEncryptionConfig {
  /** Required. Name of the CMEK key in KMS. */
  kmsKeyName?: string;
}

export const ExportEncryptionConfig: Schema.Schema<ExportEncryptionConfig> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "ExportEncryptionConfig" }) as any as Schema.Schema<ExportEncryptionConfig>;

export interface ExportInstanceRequest {
  /** The path to the folder in Google Cloud Storage where the export will be stored. The URI is in the form `gs://bucketName/folderName`. */
  gcsUri?: string;
  /** Required. Encryption configuration (CMEK). For CMEK enabled instances it should be same as looker CMEK. */
  encryptionConfig?: ExportEncryptionConfig;
}

export const ExportInstanceRequest: Schema.Schema<ExportInstanceRequest> = Schema.suspend(() => Schema.Struct({
  gcsUri: Schema.optional(Schema.String),
  encryptionConfig: Schema.optional(ExportEncryptionConfig),
})).annotate({ identifier: "ExportInstanceRequest" }) as any as Schema.Schema<ExportInstanceRequest>;

export interface EncryptionConfig {
  /** Output only. Full name and version of the CMEK key currently in use to encrypt Looker data. Format: `projects/{project}/locations/{location}/keyRings/{ring}/cryptoKeys/{key}/cryptoKeyVersions/{version}`. Empty if CMEK is not configured in this instance. */
  kmsKeyNameVersion?: string;
  /** Name of the CMEK key in KMS (input parameter). */
  kmsKeyName?: string;
  /** Output only. Status of the CMEK key. */
  kmsKeyState?: "KMS_KEY_STATE_UNSPECIFIED" | "VALID" | "REVOKED" | (string & {});
}

export const EncryptionConfig: Schema.Schema<EncryptionConfig> = Schema.suspend(() => Schema.Struct({
  kmsKeyNameVersion: Schema.optional(Schema.String),
  kmsKeyName: Schema.optional(Schema.String),
  kmsKeyState: Schema.optional(Schema.String),
})).annotate({ identifier: "EncryptionConfig" }) as any as Schema.Schema<EncryptionConfig>;

export interface UserMetadata {
  /** Optional. The number of additional standard users the instance owner has purchased. */
  additionalStandardUserCount?: number;
  /** Optional. The number of additional developer users the instance owner has purchased. */
  additionalDeveloperUserCount?: number;
  /** Optional. The number of additional viewer users the instance owner has purchased. */
  additionalViewerUserCount?: number;
}

export const UserMetadata: Schema.Schema<UserMetadata> = Schema.suspend(() => Schema.Struct({
  additionalStandardUserCount: Schema.optional(Schema.Number),
  additionalDeveloperUserCount: Schema.optional(Schema.Number),
  additionalViewerUserCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "UserMetadata" }) as any as Schema.Schema<UserMetadata>;

export interface Status {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  code: Schema.optional(Schema.Number),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CustomDomain {
  /** Domain state. */
  state?: "CUSTOM_DOMAIN_STATE_UNSPECIFIED" | "UNVERIFIED" | "VERIFIED" | "MODIFYING" | "AVAILABLE" | "UNAVAILABLE" | "UNKNOWN" | (string & {});
  /** Domain name. */
  domain?: string;
}

export const CustomDomain: Schema.Schema<CustomDomain> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomDomain" }) as any as Schema.Schema<CustomDomain>;

export interface Looker_Date {
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
}

export const Looker_Date: Schema.Schema<Looker_Date> = Schema.suspend(() => Schema.Struct({
  day: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  year: Schema.optional(Schema.Number),
})).annotate({ identifier: "Looker_Date" }) as any as Schema.Schema<Looker_Date>;

export interface TimeOfDay {
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() => Schema.Struct({
  seconds: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
  hours: Schema.optional(Schema.Number),
})).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface DenyMaintenancePeriod {
  /** Required. End date of the deny maintenance period. */
  endDate?: Looker_Date;
  /** Required. Time in UTC when the period starts and ends. */
  time?: TimeOfDay;
  /** Required. Start date of the deny maintenance period. */
  startDate?: Looker_Date;
}

export const DenyMaintenancePeriod: Schema.Schema<DenyMaintenancePeriod> = Schema.suspend(() => Schema.Struct({
  endDate: Schema.optional(Looker_Date),
  time: Schema.optional(TimeOfDay),
  startDate: Schema.optional(Looker_Date),
})).annotate({ identifier: "DenyMaintenancePeriod" }) as any as Schema.Schema<DenyMaintenancePeriod>;

export interface MaintenanceSchedule {
  /** The scheduled start time for the maintenance. */
  startTime?: string;
  /** The scheduled end time for the maintenance. */
  endTime?: string;
}

export const MaintenanceSchedule: Schema.Schema<MaintenanceSchedule> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "MaintenanceSchedule" }) as any as Schema.Schema<MaintenanceSchedule>;

export interface ServiceAttachment {
  /** Required. URI of the service attachment to connect to. Format: projects/{project}/regions/{region}/serviceAttachments/{service_attachment} */
  targetServiceAttachmentUri?: string;
  /** Optional. Fully qualified domain name that will be used in the private DNS record created for the service attachment. */
  localFqdn?: string;
  /** Output only. Reason the service attachment creation failed. This value will only be populated if the service attachment encounters an issue during provisioning. */
  failureReason?: string;
  /** Optional. List of fully qualified domain names that will be used in the private DNS record created for the service attachment. */
  localFqdns?: Array<string>;
  /** Output only. Connection status. */
  connectionStatus?: "UNKNOWN" | "ACCEPTED" | "PENDING" | "REJECTED" | "NEEDS_ATTENTION" | "CLOSED" | (string & {});
}

export const ServiceAttachment: Schema.Schema<ServiceAttachment> = Schema.suspend(() => Schema.Struct({
  targetServiceAttachmentUri: Schema.optional(Schema.String),
  localFqdn: Schema.optional(Schema.String),
  failureReason: Schema.optional(Schema.String),
  localFqdns: Schema.optional(Schema.Array(Schema.String)),
  connectionStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceAttachment" }) as any as Schema.Schema<ServiceAttachment>;

export interface PscConfig {
  /** Optional. List of VPCs that are allowed ingress into looker. Format: projects/{project}/global/networks/{network} */
  allowedVpcs?: Array<string>;
  /** Optional. List of egress service attachment configurations. */
  serviceAttachments?: Array<ServiceAttachment>;
  /** Output only. URI of the Looker service attachment. */
  lookerServiceAttachmentUri?: string;
}

export const PscConfig: Schema.Schema<PscConfig> = Schema.suspend(() => Schema.Struct({
  allowedVpcs: Schema.optional(Schema.Array(Schema.String)),
  serviceAttachments: Schema.optional(Schema.Array(ServiceAttachment)),
  lookerServiceAttachmentUri: Schema.optional(Schema.String),
})).annotate({ identifier: "PscConfig" }) as any as Schema.Schema<PscConfig>;

export interface PeriodicExportConfig {
  /** Required. Time in UTC to start the periodic export job. */
  startTime?: TimeOfDay;
  /** Required. Name of the CMEK key in KMS. Format: projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key} */
  kmsKey?: string;
  /** Required. Cloud Storage bucket URI for periodic export. Format: gs://{bucket_name} */
  gcsUri?: string;
}

export const PeriodicExportConfig: Schema.Schema<PeriodicExportConfig> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(TimeOfDay),
  kmsKey: Schema.optional(Schema.String),
  gcsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "PeriodicExportConfig" }) as any as Schema.Schema<PeriodicExportConfig>;

export interface ControlledEgressConfig {
  /** Optional. Whether marketplace is enabled. */
  marketplaceEnabled?: boolean;
  /** Output only. The list of IP addresses used by Secure Web Proxy for outbound traffic. */
  webProxyIps?: Array<string>;
  /** Optional. List of fully qualified domain names to be added to the allowlist for outbound traffic. */
  egressFqdns?: Array<string>;
}

export const ControlledEgressConfig: Schema.Schema<ControlledEgressConfig> = Schema.suspend(() => Schema.Struct({
  marketplaceEnabled: Schema.optional(Schema.Boolean),
  webProxyIps: Schema.optional(Schema.Array(Schema.String)),
  egressFqdns: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ControlledEgressConfig" }) as any as Schema.Schema<ControlledEgressConfig>;

export interface MaintenanceWindow {
  /** Required. Day of the week for this MaintenanceWindow (in UTC). */
  dayOfWeek?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
  /** Required. Time in UTC when the period starts. Maintenance will be scheduled within 60 minutes. */
  startTime?: TimeOfDay;
}

export const MaintenanceWindow: Schema.Schema<MaintenanceWindow> = Schema.suspend(() => Schema.Struct({
  dayOfWeek: Schema.optional(Schema.String),
  startTime: Schema.optional(TimeOfDay),
})).annotate({ identifier: "MaintenanceWindow" }) as any as Schema.Schema<MaintenanceWindow>;

export interface Instance {
  /** Custom domain configuration for the instance. */
  customDomain?: CustomDomain;
  /** Output only. Private Ingress IP (IPv4). */
  ingressPrivateIp?: string;
  /** Output only. Format: `projects/{project}/locations/{location}/instances/{instance}`. */
  name?: string;
  /** Looker Instance Admin settings. */
  adminSettings?: AdminSettings;
  /** Whether private IP is enabled on the Looker instance. */
  privateIpEnabled?: boolean;
  /** Output only. The time when the Looker instance was last updated. */
  updateTime?: string;
  /** Output only. Last computed maintenance denial period for this instance. */
  lastDenyMaintenancePeriod?: DenyMaintenancePeriod;
  /** Network name in the consumer project. Format: `projects/{project}/global/networks/{network}`. Note that the consumer network may be in a different GCP project than the consumer project that is hosting the Looker Instance. */
  consumerNetwork?: string;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Whether public IP is enabled on the Looker instance. */
  publicIpEnabled?: boolean;
  /** Optional. Whether Gemini feature is enabled on the Looker instance or not. */
  geminiEnabled?: boolean;
  /** Output only. Looker instance URI which can be used to access the Looker Instance UI. */
  lookerUri?: string;
  /** Maintenance schedule for this instance. */
  maintenanceSchedule?: MaintenanceSchedule;
  /** Output only. Public Ingress IP (IPv4). */
  ingressPublicIp?: string;
  /** Maintenance denial period for this instance. */
  denyMaintenancePeriod?: DenyMaintenancePeriod;
  /** Optional. Whether to use Private Service Connect (PSC) for private IP connectivity. If true, neither `public_ip_enabled` nor `private_ip_enabled` can be true. */
  pscEnabled?: boolean;
  /** Optional. User metadata. */
  userMetadata?: UserMetadata;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Optional. PSC configuration. Used when `psc_enabled` is true. */
  pscConfig?: PscConfig;
  /** Optional. Whether FIPS is enabled on the Looker instance. */
  fipsEnabled?: boolean;
  /** Optional. Linked Google Cloud Project Number for Looker Studio Pro. */
  linkedLspProjectNumber?: string;
  /** Output only. The state of the instance. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "FAILED" | "SUSPENDED" | "UPDATING" | "DELETING" | "EXPORTING" | "IMPORTING" | (string & {});
  /** Name of a reserved IP address range within the Instance.consumer_network, to be used for private services access connection. May or may not be specified in a create request. */
  reservedRange?: string;
  /** Optional. Configuration for periodic export. */
  periodicExportConfig?: PeriodicExportConfig;
  /** Platform edition. */
  platformEdition?: "PLATFORM_EDITION_UNSPECIFIED" | "LOOKER_CORE_TRIAL" | "LOOKER_CORE_STANDARD" | "LOOKER_CORE_STANDARD_ANNUAL" | "LOOKER_CORE_ENTERPRISE_ANNUAL" | "LOOKER_CORE_EMBED_ANNUAL" | "LOOKER_CORE_NONPROD_STANDARD_ANNUAL" | "LOOKER_CORE_NONPROD_ENTERPRISE_ANNUAL" | "LOOKER_CORE_NONPROD_EMBED_ANNUAL" | "LOOKER_CORE_TRIAL_STANDARD" | "LOOKER_CORE_TRIAL_ENTERPRISE" | "LOOKER_CORE_TRIAL_EMBED" | (string & {});
  /** Output only. The Looker version that the instance is using. */
  lookerVersion?: string;
  /** Optional. Storage class of the instance. */
  classType?: "CLASS_TYPE_UNSPECIFIED" | "R1" | "P1" | (string & {});
  /** Encryption configuration (CMEK). Only set if CMEK has been enabled on the instance. */
  encryptionConfig?: EncryptionConfig;
  /** Output only. The time when the Looker instance provisioning was first requested. */
  createTime?: string;
  /** Looker instance OAuth login settings. */
  oauthConfig?: OAuthConfig;
  /** Optional. Controlled egress configuration. */
  controlledEgressConfig?: ControlledEgressConfig;
  /** Output only. Public Egress IP (IPv4). */
  egressPublicIp?: string;
  /** Optional. Whether controlled egress is enabled on the Looker instance. */
  controlledEgressEnabled?: boolean;
  /** Maintenance window for this instance. */
  maintenanceWindow?: MaintenanceWindow;
}

export const Instance: Schema.Schema<Instance> = Schema.suspend(() => Schema.Struct({
  customDomain: Schema.optional(CustomDomain),
  ingressPrivateIp: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  adminSettings: Schema.optional(AdminSettings),
  privateIpEnabled: Schema.optional(Schema.Boolean),
  updateTime: Schema.optional(Schema.String),
  lastDenyMaintenancePeriod: Schema.optional(DenyMaintenancePeriod),
  consumerNetwork: Schema.optional(Schema.String),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  publicIpEnabled: Schema.optional(Schema.Boolean),
  geminiEnabled: Schema.optional(Schema.Boolean),
  lookerUri: Schema.optional(Schema.String),
  maintenanceSchedule: Schema.optional(MaintenanceSchedule),
  ingressPublicIp: Schema.optional(Schema.String),
  denyMaintenancePeriod: Schema.optional(DenyMaintenancePeriod),
  pscEnabled: Schema.optional(Schema.Boolean),
  userMetadata: Schema.optional(UserMetadata),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  pscConfig: Schema.optional(PscConfig),
  fipsEnabled: Schema.optional(Schema.Boolean),
  linkedLspProjectNumber: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  reservedRange: Schema.optional(Schema.String),
  periodicExportConfig: Schema.optional(PeriodicExportConfig),
  platformEdition: Schema.optional(Schema.String),
  lookerVersion: Schema.optional(Schema.String),
  classType: Schema.optional(Schema.String),
  encryptionConfig: Schema.optional(EncryptionConfig),
  createTime: Schema.optional(Schema.String),
  oauthConfig: Schema.optional(OAuthConfig),
  controlledEgressConfig: Schema.optional(ControlledEgressConfig),
  egressPublicIp: Schema.optional(Schema.String),
  controlledEgressEnabled: Schema.optional(Schema.Boolean),
  maintenanceWindow: Schema.optional(MaintenanceWindow),
})).annotate({ identifier: "Instance" }) as any as Schema.Schema<Instance>;

export interface ListInstancesResponse {
  /** The list of instances matching the request filters, up to the requested ListInstancesRequest.pageSize. */
  instances?: Array<Instance>;
  /** If provided, a page token that can look up the next ListInstancesRequest.pageSize results. If empty, the results list is exhausted. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListInstancesResponse: Schema.Schema<ListInstancesResponse> = Schema.suspend(() => Schema.Struct({
  instances: Schema.optional(Schema.Array(Instance)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListInstancesResponse" }) as any as Schema.Schema<ListInstancesResponse>;

export interface ExportMetadataEncryptionKey {
  /** Name of the CMEK. */
  cmek?: string;
  /** Version of the CMEK. */
  version?: string;
}

export const ExportMetadataEncryptionKey: Schema.Schema<ExportMetadataEncryptionKey> = Schema.suspend(() => Schema.Struct({
  cmek: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "ExportMetadataEncryptionKey" }) as any as Schema.Schema<ExportMetadataEncryptionKey>;

export interface Operation {
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  error: Schema.optional(Status),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface RestoreInstanceRequest {
  /** Required. Backup being used to restore the instance Format: projects/{project}/locations/{location}/instances/{instance}/backups/{backup} */
  backup?: string;
}

export const RestoreInstanceRequest: Schema.Schema<RestoreInstanceRequest> = Schema.suspend(() => Schema.Struct({
  backup: Schema.optional(Schema.String),
})).annotate({ identifier: "RestoreInstanceRequest" }) as any as Schema.Schema<RestoreInstanceRequest>;

export interface Location {
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  locationId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListOperationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  operations: Schema.optional(Schema.Array(Operation)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface InstanceBackup {
  /** Output only. The time when the backup was started. */
  createTime?: string;
  /** Output only. The current state of the backup. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "DELETING" | "ACTIVE" | "FAILED" | (string & {});
  /** Output only. The time when the backup will be deleted. */
  expireTime?: string;
  /** Immutable. The relative resource name of the backup, in the following form: `projects/{project_number}/locations/{location_id}/instances/{instance_id}/backups/{backup}` */
  name?: string;
  /** Output only. Current status of the CMEK encryption */
  encryptionConfig?: EncryptionConfig;
}

export const InstanceBackup: Schema.Schema<InstanceBackup> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  encryptionConfig: Schema.optional(EncryptionConfig),
})).annotate({ identifier: "InstanceBackup" }) as any as Schema.Schema<InstanceBackup>;

export interface ImportInstanceRequest {
  /** Path to the import folder in Google Cloud Storage, in the form `gs://bucketName/folderName`. */
  gcsUri?: string;
}

export const ImportInstanceRequest: Schema.Schema<ImportInstanceRequest> = Schema.suspend(() => Schema.Struct({
  gcsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "ImportInstanceRequest" }) as any as Schema.Schema<ImportInstanceRequest>;

export interface OperationMetadata {
  /** The time the operation was created. */
  createTime?: string;
  /** Name of the verb executed by the operation. */
  verb?: string;
  /** API version used to start the operation. */
  apiVersion?: string;
  /** Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** The time the operation finished running. */
  endTime?: string;
  /** Server-defined resource path for the target of the operation. */
  target?: string;
  /** Human-readable status of the operation, if any. */
  statusMessage?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface ExportMetadata {
  /** Looker encryption key, encrypted with the provided export encryption key. This value will only be populated if the looker instance uses Looker managed encryption instead of CMEK. */
  lookerEncryptionKey?: string;
  /** Version of instance when the export was created. */
  lookerVersion?: string;
  /** Name of the exported instance. Format: projects/{project}/locations/{location}/instances/{instance} */
  lookerInstance?: string;
  /** Platform edition of the exported instance. */
  lookerPlatformEdition?: string;
  /** Encryption key that was used to encrypt the export artifacts. */
  exportEncryptionKey?: ExportMetadataEncryptionKey;
  /** List of files created as part of export artifact (excluding the metadata). The paths are relative to the folder containing the metadata. */
  filePaths?: Array<string>;
  /** The source type of the migration. */
  source?: "SOURCE_UNSPECIFIED" | "LOOKER_CORE" | "LOOKER_ORIGINAL" | (string & {});
}

export const ExportMetadata: Schema.Schema<ExportMetadata> = Schema.suspend(() => Schema.Struct({
  lookerEncryptionKey: Schema.optional(Schema.String),
  lookerVersion: Schema.optional(Schema.String),
  lookerInstance: Schema.optional(Schema.String),
  lookerPlatformEdition: Schema.optional(Schema.String),
  exportEncryptionKey: Schema.optional(ExportMetadataEncryptionKey),
  filePaths: Schema.optional(Schema.Array(Schema.String)),
  source: Schema.optional(Schema.String),
})).annotate({ identifier: "ExportMetadata" }) as any as Schema.Schema<ExportMetadata>;

export interface ListInstanceBackupsResponse {
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** The list of instances matching the request filters, up to the requested `page_size`. */
  instanceBackups?: Array<InstanceBackup>;
  /** If provided, a page token that can look up the next `page_size` results. If empty, the results list is exhausted. */
  nextPageToken?: string;
}

export const ListInstanceBackupsResponse: Schema.Schema<ListInstanceBackupsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  instanceBackups: Schema.optional(Schema.Array(InstanceBackup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListInstanceBackupsResponse" }) as any as Schema.Schema<ListInstanceBackupsResponse>;

export interface RestartInstanceRequest {
}

export const RestartInstanceRequest: Schema.Schema<RestartInstanceRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RestartInstanceRequest" }) as any as Schema.Schema<RestartInstanceRequest>;

export interface ListLocationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(Location)),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
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

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page token. */
  pageToken?: string;
  /** The name of the operation's parent resource. */
  name: string;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
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

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Restart instance. */
export interface RestartProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project}/locations/{location}/instances/{instance}`. */
  name: string;
  /** Request body */
  body?: RestartInstanceRequest;
}

export const RestartProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RestartInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:restart", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestartProjectsLocationsInstancesRequest>;

export type RestartProjectsLocationsInstancesResponse = Operation;
export const RestartProjectsLocationsInstancesResponse = Operation;

export type RestartProjectsLocationsInstancesError = CommonErrors;

export const restartProjectsLocationsInstances: API.OperationMethod<RestartProjectsLocationsInstancesRequest, RestartProjectsLocationsInstancesResponse, RestartProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestartProjectsLocationsInstancesRequest,
  output: RestartProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Creates a new Instance in a given project and location. */
export interface CreateProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project}/locations/{location}`. */
  parent: string;
  /** Required. The unique instance identifier. Must contain only lowercase letters, numbers, or hyphens, with the first character a letter and the last a letter or a number. 63 characters maximum. */
  instanceId?: string;
  /** Request body */
  body?: Instance;
}

export const CreateProjectsLocationsInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  instanceId: Schema.optional(Schema.String).pipe(T.HttpQuery("instanceId")),
  body: Schema.optional(Instance).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsInstancesRequest>;

export type CreateProjectsLocationsInstancesResponse = Operation;
export const CreateProjectsLocationsInstancesResponse = Operation;

export type CreateProjectsLocationsInstancesError = CommonErrors;

export const createProjectsLocationsInstances: API.OperationMethod<CreateProjectsLocationsInstancesRequest, CreateProjectsLocationsInstancesResponse, CreateProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsInstancesRequest,
  output: CreateProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Export instance. */
export interface ExportProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project}/locations/{location}/instances/{instance}`. */
  name: string;
  /** Request body */
  body?: ExportInstanceRequest;
}

export const ExportProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ExportInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:export", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportProjectsLocationsInstancesRequest>;

export type ExportProjectsLocationsInstancesResponse = Operation;
export const ExportProjectsLocationsInstancesResponse = Operation;

export type ExportProjectsLocationsInstancesError = CommonErrors;

export const exportProjectsLocationsInstances: API.OperationMethod<ExportProjectsLocationsInstancesRequest, ExportProjectsLocationsInstancesResponse, ExportProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportProjectsLocationsInstancesRequest,
  output: ExportProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Update Instance. */
export interface PatchProjectsLocationsInstancesRequest {
  /** Required. Field mask used to specify the fields to be overwritten in the Instance resource by the update. The fields specified in the mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. */
  updateMask?: string;
  /** Output only. Format: `projects/{project}/locations/{location}/instances/{instance}`. */
  name: string;
  /** Request body */
  body?: Instance;
}

export const PatchProjectsLocationsInstancesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Instance).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsInstancesRequest>;

export type PatchProjectsLocationsInstancesResponse = Operation;
export const PatchProjectsLocationsInstancesResponse = Operation;

export type PatchProjectsLocationsInstancesError = CommonErrors;

export const patchProjectsLocationsInstances: API.OperationMethod<PatchProjectsLocationsInstancesRequest, PatchProjectsLocationsInstancesResponse, PatchProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsInstancesRequest,
  output: PatchProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Delete instance. */
export interface DeleteProjectsLocationsInstancesRequest {
  /** Whether to force cascading delete. */
  force?: boolean;
  /** Required. Format: `projects/{project}/locations/{location}/instances/{instance}`. */
  name: string;
}

export const DeleteProjectsLocationsInstancesRequest = Schema.Struct({
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsInstancesRequest>;

export type DeleteProjectsLocationsInstancesResponse = Operation;
export const DeleteProjectsLocationsInstancesResponse = Operation;

export type DeleteProjectsLocationsInstancesError = CommonErrors;

export const deleteProjectsLocationsInstances: API.OperationMethod<DeleteProjectsLocationsInstancesRequest, DeleteProjectsLocationsInstancesResponse, DeleteProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsInstancesRequest,
  output: DeleteProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Restore Looker instance. */
export interface RestoreProjectsLocationsInstancesRequest {
  /** Required. Instance being restored Format: projects/{project}/locations/{location}/instances/{instance} */
  name: string;
  /** Request body */
  body?: RestoreInstanceRequest;
}

export const RestoreProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RestoreInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsLocationsInstancesRequest>;

export type RestoreProjectsLocationsInstancesResponse = Operation;
export const RestoreProjectsLocationsInstancesResponse = Operation;

export type RestoreProjectsLocationsInstancesError = CommonErrors;

export const restoreProjectsLocationsInstances: API.OperationMethod<RestoreProjectsLocationsInstancesRequest, RestoreProjectsLocationsInstancesResponse, RestoreProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreProjectsLocationsInstancesRequest,
  output: RestoreProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Lists Instances in a given project and location. */
export interface ListProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project}/locations/{location}`. */
  parent: string;
  /** A page token received from a previous ListInstancesRequest. */
  pageToken?: string;
  /** The maximum number of instances to return. If unspecified at most 256 will be returned. The maximum possible value is 2048. */
  pageSize?: number;
}

export const ListProjectsLocationsInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInstancesRequest>;

export type ListProjectsLocationsInstancesResponse = ListInstancesResponse;
export const ListProjectsLocationsInstancesResponse = ListInstancesResponse;

export type ListProjectsLocationsInstancesError = CommonErrors;

export const listProjectsLocationsInstances = API.makePaginated(() => ({
  input: ListProjectsLocationsInstancesRequest,
  output: ListProjectsLocationsInstancesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single Instance. */
export interface GetProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project}/locations/{location}/instances/{instance}`. */
  name: string;
}

export const GetProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInstancesRequest>;

export type GetProjectsLocationsInstancesResponse = Instance;
export const GetProjectsLocationsInstancesResponse = Instance;

export type GetProjectsLocationsInstancesError = CommonErrors;

export const getProjectsLocationsInstances: API.OperationMethod<GetProjectsLocationsInstancesRequest, GetProjectsLocationsInstancesResponse, GetProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInstancesRequest,
  output: GetProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Import instance. */
export interface ImportProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project}/locations/{location}/instances/{instance}`. */
  name: string;
  /** Request body */
  body?: ImportInstanceRequest;
}

export const ImportProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ImportInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsInstancesRequest>;

export type ImportProjectsLocationsInstancesResponse = Operation;
export const ImportProjectsLocationsInstancesResponse = Operation;

export type ImportProjectsLocationsInstancesError = CommonErrors;

export const importProjectsLocationsInstances: API.OperationMethod<ImportProjectsLocationsInstancesRequest, ImportProjectsLocationsInstancesResponse, ImportProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsInstancesRequest,
  output: ImportProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Delete backup. */
export interface DeleteProjectsLocationsInstancesBackupsRequest {
  /** Required. Format: projects/{project}/locations/{location}/instances/{instance}/backups/{backup} */
  name: string;
}

export const DeleteProjectsLocationsInstancesBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsInstancesBackupsRequest>;

export type DeleteProjectsLocationsInstancesBackupsResponse = Operation;
export const DeleteProjectsLocationsInstancesBackupsResponse = Operation;

export type DeleteProjectsLocationsInstancesBackupsError = CommonErrors;

export const deleteProjectsLocationsInstancesBackups: API.OperationMethod<DeleteProjectsLocationsInstancesBackupsRequest, DeleteProjectsLocationsInstancesBackupsResponse, DeleteProjectsLocationsInstancesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsInstancesBackupsRequest,
  output: DeleteProjectsLocationsInstancesBackupsResponse,
  errors: [],
}));

export interface GetProjectsLocationsInstancesBackupsRequest {
  /** Required. Format: `projects/{project}/locations/{location}/instances/{instance}/backups/{backup}`. */
  name: string;
}

export const GetProjectsLocationsInstancesBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInstancesBackupsRequest>;

export type GetProjectsLocationsInstancesBackupsResponse = InstanceBackup;
export const GetProjectsLocationsInstancesBackupsResponse = InstanceBackup;

export type GetProjectsLocationsInstancesBackupsError = CommonErrors;

export const getProjectsLocationsInstancesBackups: API.OperationMethod<GetProjectsLocationsInstancesBackupsRequest, GetProjectsLocationsInstancesBackupsResponse, GetProjectsLocationsInstancesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInstancesBackupsRequest,
  output: GetProjectsLocationsInstancesBackupsResponse,
  errors: [],
}));

/** Backup Looker instance. */
export interface CreateProjectsLocationsInstancesBackupsRequest {
  /** Required. Format: projects/{project}/locations/{location}/instances/{instance} */
  parent: string;
  /** Request body */
  body?: InstanceBackup;
}

export const CreateProjectsLocationsInstancesBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(InstanceBackup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/backups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsInstancesBackupsRequest>;

export type CreateProjectsLocationsInstancesBackupsResponse = Operation;
export const CreateProjectsLocationsInstancesBackupsResponse = Operation;

export type CreateProjectsLocationsInstancesBackupsError = CommonErrors;

export const createProjectsLocationsInstancesBackups: API.OperationMethod<CreateProjectsLocationsInstancesBackupsRequest, CreateProjectsLocationsInstancesBackupsResponse, CreateProjectsLocationsInstancesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsInstancesBackupsRequest,
  output: CreateProjectsLocationsInstancesBackupsResponse,
  errors: [],
}));

/** List backups of Looker instance. */
export interface ListProjectsLocationsInstancesBackupsRequest {
  /** The maximum number of instances to return. */
  pageSize?: number;
  /** A page token received from a previous ListInstances request. */
  pageToken?: string;
  /** Required. Format: projects/{project}/locations/{location}/instances/{instance}. */
  parent: string;
  /** Sort results. Default order is "create_time desc". Other supported fields are "state" and "expire_time". https://google.aip.dev/132#ordering */
  orderBy?: string;
}

export const ListProjectsLocationsInstancesBackupsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/backups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInstancesBackupsRequest>;

export type ListProjectsLocationsInstancesBackupsResponse = ListInstanceBackupsResponse;
export const ListProjectsLocationsInstancesBackupsResponse = ListInstanceBackupsResponse;

export type ListProjectsLocationsInstancesBackupsError = CommonErrors;

export const listProjectsLocationsInstancesBackups = API.makePaginated(() => ({
  input: ListProjectsLocationsInstancesBackupsRequest,
  output: ListProjectsLocationsInstancesBackupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

