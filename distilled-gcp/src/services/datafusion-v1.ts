// ==========================================================================
// Cloud Data Fusion API (datafusion v1)
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
  name: "datafusion",
  version: "v1",
  rootUrl: "https://datafusion.googleapis.com/",
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
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
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

export interface Version {
  /** The version number of the Data Fusion instance, such as '6.0.1.0'. */
  versionNumber?: string;
  /** Whether this is currently the default version for Cloud Data Fusion */
  defaultVersion?: boolean;
  /** Represents a list of available feature names for a given version. */
  availableFeatures?: Array<string>;
  /** Type represents the release availability of the version */
  type?: "TYPE_UNSPECIFIED" | "TYPE_PREVIEW" | "TYPE_GENERAL_AVAILABILITY" | "TYPE_DEPRECATED" | (string & {});
}

export const Version: Schema.Schema<Version> = Schema.suspend(() => Schema.Struct({
  versionNumber: Schema.optional(Schema.String),
  defaultVersion: Schema.optional(Schema.Boolean),
  availableFeatures: Schema.optional(Schema.Array(Schema.String)),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Version" }) as any as Schema.Schema<Version>;

export interface ListAvailableVersionsResponse {
  /** Represents a list of versions that are supported. Deprecated: Use versions field instead. */
  availableVersions?: Array<Version>;
  /** Token to retrieve the next page of results or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** Represents a list of all versions. */
  versions?: Array<Version>;
}

export const ListAvailableVersionsResponse: Schema.Schema<ListAvailableVersionsResponse> = Schema.suspend(() => Schema.Struct({
  availableVersions: Schema.optional(Schema.Array(Version)),
  nextPageToken: Schema.optional(Schema.String),
  versions: Schema.optional(Schema.Array(Version)),
})).annotate({ identifier: "ListAvailableVersionsResponse" }) as any as Schema.Schema<ListAvailableVersionsResponse>;

export interface PrivateServiceConnectConfig {
  /** Required. The reference to the network attachment used to establish private connectivity. It will be of the form projects/{project-id}/regions/{region}/networkAttachments/{network-attachment-id}. */
  networkAttachment?: string;
  /** Optional. Input only. The CIDR block to which the CDF instance can't route traffic to in the consumer project VPC. The size of this block should be at least /25. This range should not overlap with the primary address range of any subnetwork used by the network attachment. This range can be used for other purposes in the consumer VPC as long as there is no requirement for CDF to reach destinations using these addresses. If this value is not provided, the server chooses a non RFC 1918 address range. The format of this field is governed by RFC 4632. Example: 192.168.0.0/25 */
  unreachableCidrBlock?: string;
  /** Output only. The CIDR block to which the CDF instance can't route traffic to in the consumer project VPC. The size of this block is /25. The format of this field is governed by RFC 4632. Example: 240.0.0.0/25 */
  effectiveUnreachableCidrBlock?: string;
}

export const PrivateServiceConnectConfig: Schema.Schema<PrivateServiceConnectConfig> = Schema.suspend(() => Schema.Struct({
  networkAttachment: Schema.optional(Schema.String),
  unreachableCidrBlock: Schema.optional(Schema.String),
  effectiveUnreachableCidrBlock: Schema.optional(Schema.String),
})).annotate({ identifier: "PrivateServiceConnectConfig" }) as any as Schema.Schema<PrivateServiceConnectConfig>;

export interface NetworkConfig {
  /** Optional. Name of the network in the customer project with which the Tenant Project will be peered for executing pipelines. In case of shared VPC where the network resides in another host project the network should specified in the form of projects/{host-project-id}/global/networks/{network}. This is only required for connectivity type VPC_PEERING. */
  network?: string;
  /** Optional. The IP range in CIDR notation to use for the managed Data Fusion instance nodes. This range must not overlap with any other ranges used in the Data Fusion instance network. This is required only when using connection type VPC_PEERING. Format: a.b.c.d/22 Example: 192.168.0.0/22 */
  ipAllocation?: string;
  /** Optional. Type of connection for establishing private IP connectivity between the Data Fusion customer project VPC and the corresponding tenant project from a predefined list of available connection modes. If this field is unspecified for a private instance, VPC peering is used. */
  connectionType?: "CONNECTION_TYPE_UNSPECIFIED" | "VPC_PEERING" | "PRIVATE_SERVICE_CONNECT_INTERFACES" | (string & {});
  /** Optional. Configuration for Private Service Connect. This is required only when using connection type PRIVATE_SERVICE_CONNECT_INTERFACES. */
  privateServiceConnectConfig?: PrivateServiceConnectConfig;
}

export const NetworkConfig: Schema.Schema<NetworkConfig> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  ipAllocation: Schema.optional(Schema.String),
  connectionType: Schema.optional(Schema.String),
  privateServiceConnectConfig: Schema.optional(PrivateServiceConnectConfig),
})).annotate({ identifier: "NetworkConfig" }) as any as Schema.Schema<NetworkConfig>;

export interface Accelerator {
  /** Optional. The type of an accelator for a Cloud Data Fusion instance. */
  acceleratorType?: "ACCELERATOR_TYPE_UNSPECIFIED" | "CDC" | "HEALTHCARE" | "CCAI_INSIGHTS" | "CLOUDSEARCH" | (string & {});
  /** Output only. The state of the accelerator. */
  state?: "STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | "UNKNOWN" | (string & {});
}

export const Accelerator: Schema.Schema<Accelerator> = Schema.suspend(() => Schema.Struct({
  acceleratorType: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "Accelerator" }) as any as Schema.Schema<Accelerator>;

export interface CryptoKeyConfig {
  /** Optional. The name of the key which is used to encrypt/decrypt customer data. For key in Cloud KMS, the key should be in the format of `projects/* /locations/* /keyRings/* /cryptoKeys/*`. */
  keyReference?: string;
}

export const CryptoKeyConfig: Schema.Schema<CryptoKeyConfig> = Schema.suspend(() => Schema.Struct({
  keyReference: Schema.optional(Schema.String),
})).annotate({ identifier: "CryptoKeyConfig" }) as any as Schema.Schema<CryptoKeyConfig>;

export interface EventPublishConfig {
  /** Required. Option to enable Event Publishing. */
  enabled?: boolean;
  /** Required. The resource name of the Pub/Sub topic. Format: projects/{project_id}/topics/{topic_id} */
  topic?: string;
}

export const EventPublishConfig: Schema.Schema<EventPublishConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  topic: Schema.optional(Schema.String),
})).annotate({ identifier: "EventPublishConfig" }) as any as Schema.Schema<EventPublishConfig>;

export interface TimeWindow {
  /** Required. The start time of the time window provided in [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. Example: "2024-01-01T12:04:06-04:00" */
  startTime?: string;
  /** Required. The end time of the time window provided in [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. The end time should take place after the start time. Example: "2024-01-02T12:04:06-06:00" */
  endTime?: string;
}

export const TimeWindow: Schema.Schema<TimeWindow> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeWindow" }) as any as Schema.Schema<TimeWindow>;

export interface RecurringTimeWindow {
  /** Required. The window representing the start and end time of recurrences. This field ignores the date components of the provided timestamps. Only the time of day and duration between start and end time are relevant. */
  window?: TimeWindow;
  /** Required. An RRULE with format [RFC-5545](https://tools.ietf.org/html/rfc5545#section-3.8.5.3) for how this window reccurs. They go on for the span of time between the start and end time. The only supported FREQ value is "WEEKLY". To have something repeat every weekday, use: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR". This specifies how frequently the window starts. To have a 9 am - 5 pm UTC-4 window every weekday, use something like: ``` start time = 2019-01-01T09:00:00-0400 end time = 2019-01-01T17:00:00-0400 recurrence = FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR ``` */
  recurrence?: string;
}

export const RecurringTimeWindow: Schema.Schema<RecurringTimeWindow> = Schema.suspend(() => Schema.Struct({
  window: Schema.optional(TimeWindow),
  recurrence: Schema.optional(Schema.String),
})).annotate({ identifier: "RecurringTimeWindow" }) as any as Schema.Schema<RecurringTimeWindow>;

export interface MaintenanceWindow {
  /** Required. The recurring time window of the maintenance window. */
  recurringTimeWindow?: RecurringTimeWindow;
}

export const MaintenanceWindow: Schema.Schema<MaintenanceWindow> = Schema.suspend(() => Schema.Struct({
  recurringTimeWindow: Schema.optional(RecurringTimeWindow),
})).annotate({ identifier: "MaintenanceWindow" }) as any as Schema.Schema<MaintenanceWindow>;

export interface MaintenancePolicy {
  /** Optional. The maintenance window of the instance. */
  maintenanceWindow?: MaintenanceWindow;
  /** Optional. The maintenance exclusion window of the instance. */
  maintenanceExclusionWindow?: TimeWindow;
}

export const MaintenancePolicy: Schema.Schema<MaintenancePolicy> = Schema.suspend(() => Schema.Struct({
  maintenanceWindow: Schema.optional(MaintenanceWindow),
  maintenanceExclusionWindow: Schema.optional(TimeWindow),
})).annotate({ identifier: "MaintenancePolicy" }) as any as Schema.Schema<MaintenancePolicy>;

export interface MaintenanceEvent {
  /** Output only. The start time of the maintenance event provided in [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. Example: "2024-01-01T12:04:06-04:00" */
  startTime?: string;
  /** Output only. The end time of the maintenance event provided in [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. Example: "2024-01-02T12:04:06-06:00" This field will be empty if the maintenance event is not yet complete. */
  endTime?: string;
  /** Output only. The state of the maintenance event. */
  state?: "STATE_UNSPECIFIED" | "SCHEDULED" | "STARTED" | "COMPLETED" | (string & {});
}

export const MaintenanceEvent: Schema.Schema<MaintenanceEvent> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "MaintenanceEvent" }) as any as Schema.Schema<MaintenanceEvent>;

export interface LoggingConfig {
  /** Optional. Option to determine whether instance logs should be written to Cloud Logging. By default, instance logs are written to Cloud Logging. */
  instanceCloudLoggingDisabled?: boolean;
  /** Optional. Option to enable the InstanceV2 logging for this instance. This field is supported only in CDF patch revision versions 6.11.1.1 and above. */
  enableInstanceV2Logs?: boolean;
}

export const LoggingConfig: Schema.Schema<LoggingConfig> = Schema.suspend(() => Schema.Struct({
  instanceCloudLoggingDisabled: Schema.optional(Schema.Boolean),
  enableInstanceV2Logs: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "LoggingConfig" }) as any as Schema.Schema<LoggingConfig>;

export interface MonitoringConfig {
  /** Optional. Option to enable the instance v2 metrics for this instance. This field is supported only in CDF versions 6.11.1.1 and above. */
  enableInstanceV2Metrics?: boolean;
}

export const MonitoringConfig: Schema.Schema<MonitoringConfig> = Schema.suspend(() => Schema.Struct({
  enableInstanceV2Metrics: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "MonitoringConfig" }) as any as Schema.Schema<MonitoringConfig>;

export interface Instance {
  /** Output only. The name of this instance is in the form of projects/{project}/locations/{location}/instances/{instance}. */
  name?: string;
  /** Optional. A description of this instance. */
  description?: string;
  /** Required. Instance type. */
  type?: "TYPE_UNSPECIFIED" | "BASIC" | "ENTERPRISE" | "DEVELOPER" | (string & {});
  /** Optional. Option to enable Dataproc Stackdriver Logging. */
  enableStackdriverLogging?: boolean;
  /** Optional. Option to enable Stackdriver Monitoring. */
  enableStackdriverMonitoring?: boolean;
  /** Optional. Specifies whether the Data Fusion instance should be private. If set to true, all Data Fusion nodes will have private IP addresses and will not be able to access the public internet. */
  privateInstance?: boolean;
  /** Optional. Network configuration options. These are required when a private Data Fusion instance is to be created. */
  networkConfig?: NetworkConfig;
  /** The resource labels for instance to use to annotate any related underlying resources such as Compute Engine VMs. The character '=' is not allowed to be used within the labels. */
  labels?: Record<string, string>;
  /** Optional. Map of additional options used to configure the behavior of Data Fusion instance. */
  options?: Record<string, string>;
  /** Output only. The time the instance was created. */
  createTime?: string;
  /** Output only. The time the instance was last updated. */
  updateTime?: string;
  /** Output only. The current state of this Data Fusion instance. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "FAILED" | "DELETING" | "UPGRADING" | "RESTARTING" | "UPDATING" | "AUTO_UPDATING" | "AUTO_UPGRADING" | "DISABLED" | "ENABLING" | (string & {});
  /** Output only. Additional information about the current state of this Data Fusion instance if available. */
  stateMessage?: string;
  /** Output only. Endpoint on which the Data Fusion UI is accessible. */
  serviceEndpoint?: string;
  /** Optional. Name of the zone in which the Data Fusion instance will be created. Only DEVELOPER instances use this field. */
  zone?: string;
  /** Optional. Current version of the Data Fusion. Only specifiable in Update. */
  version?: string;
  /** Output only. Deprecated. Use tenant_project_id instead to extract the tenant project ID. */
  serviceAccount?: string;
  /** Optional. Display name for an instance. */
  displayName?: string;
  /** Output only. Available versions that the instance can be upgraded to using UpdateInstanceRequest. */
  availableVersion?: Array<Version>;
  /** Output only. Endpoint on which the REST APIs is accessible. */
  apiEndpoint?: string;
  /** Output only. Cloud Storage bucket generated by Data Fusion in the customer project. */
  gcsBucket?: string;
  /** Output only. List of accelerators enabled for this CDF instance. */
  accelerators?: Array<Accelerator>;
  /** Output only. Service agent for the customer project. */
  p4ServiceAccount?: string;
  /** Output only. The name of the tenant project. */
  tenantProjectId?: string;
  /** Optional. User-managed service account to set on Dataproc when Cloud Data Fusion creates Dataproc to run data processing pipelines. This allows users to have fine-grained access control on Dataproc's accesses to cloud resources. */
  dataprocServiceAccount?: string;
  /** Optional. Option to enable granular role-based access control. */
  enableRbac?: boolean;
  /** Optional. The crypto key configuration. This field is used by the Customer-Managed Encryption Keys (CMEK) feature. */
  cryptoKeyConfig?: CryptoKeyConfig;
  /** Output only. If the instance state is DISABLED, the reason for disabling the instance. */
  disabledReason?: Array<"DISABLED_REASON_UNSPECIFIED" | "KMS_KEY_ISSUE" | "PROJECT_STATE_OFF" | (string & {})>;
  /** Optional. Option to enable and pass metadata for event publishing. */
  eventPublishConfig?: EventPublishConfig;
  /** Output only. Option to enable granular zone separation. */
  enableZoneSeparation?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Endpoint on which the Data Fusion UI is accessible to third-party users */
  workforceIdentityServiceEndpoint?: string;
  /** Optional. Current patch revision of the Data Fusion. */
  patchRevision?: string;
  /** Optional. Option to enable the Dataplex Lineage Integration feature. */
  dataplexDataLineageIntegrationEnabled?: boolean;
  /** Optional. Configure the maintenance policy for this instance. */
  maintenancePolicy?: MaintenancePolicy;
  /** Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" */
  tags?: Record<string, string>;
  /** Output only. The maintenance events for this instance. */
  maintenanceEvents?: Array<MaintenanceEvent>;
  /** Optional. The logging configuration for this instance. This field is supported only in CDF versions 6.11.0 and above. */
  loggingConfig?: LoggingConfig;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Optional. The monitoring configuration for this instance. */
  monitoringConfig?: MonitoringConfig;
}

export const Instance: Schema.Schema<Instance> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  enableStackdriverLogging: Schema.optional(Schema.Boolean),
  enableStackdriverMonitoring: Schema.optional(Schema.Boolean),
  privateInstance: Schema.optional(Schema.Boolean),
  networkConfig: Schema.optional(NetworkConfig),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  options: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
  serviceEndpoint: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  availableVersion: Schema.optional(Schema.Array(Version)),
  apiEndpoint: Schema.optional(Schema.String),
  gcsBucket: Schema.optional(Schema.String),
  accelerators: Schema.optional(Schema.Array(Accelerator)),
  p4ServiceAccount: Schema.optional(Schema.String),
  tenantProjectId: Schema.optional(Schema.String),
  dataprocServiceAccount: Schema.optional(Schema.String),
  enableRbac: Schema.optional(Schema.Boolean),
  cryptoKeyConfig: Schema.optional(CryptoKeyConfig),
  disabledReason: Schema.optional(Schema.Array(Schema.String)),
  eventPublishConfig: Schema.optional(EventPublishConfig),
  enableZoneSeparation: Schema.optional(Schema.Boolean),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  workforceIdentityServiceEndpoint: Schema.optional(Schema.String),
  patchRevision: Schema.optional(Schema.String),
  dataplexDataLineageIntegrationEnabled: Schema.optional(Schema.Boolean),
  maintenancePolicy: Schema.optional(MaintenancePolicy),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  maintenanceEvents: Schema.optional(Schema.Array(MaintenanceEvent)),
  loggingConfig: Schema.optional(LoggingConfig),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  monitoringConfig: Schema.optional(MonitoringConfig),
})).annotate({ identifier: "Instance" }) as any as Schema.Schema<Instance>;

export interface ListInstancesResponse {
  /** Represents a list of Data Fusion instances. */
  instances?: Array<Instance>;
  /** Token to retrieve the next page of results or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListInstancesResponse: Schema.Schema<ListInstancesResponse> = Schema.suspend(() => Schema.Struct({
  instances: Schema.optional(Schema.Array(Instance)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListInstancesResponse" }) as any as Schema.Schema<ListInstancesResponse>;

export interface RestartInstanceRequest {
}

export const RestartInstanceRequest: Schema.Schema<RestartInstanceRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RestartInstanceRequest" }) as any as Schema.Schema<RestartInstanceRequest>;

export interface DnsPeering {
  /** Identifier. The resource name of the dns peering zone. Format: projects/{project}/locations/{location}/instances/{instance}/dnsPeerings/{dns_peering} */
  name?: string;
  /** Required. The dns name suffix of the zone. */
  domain?: string;
  /** Optional. Optional description of the dns zone. */
  description?: string;
  /** Optional. Optional target project to which dns peering should happen. */
  targetProject?: string;
  /** Optional. Optional target network to which dns peering should happen. */
  targetNetwork?: string;
}

export const DnsPeering: Schema.Schema<DnsPeering> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  targetProject: Schema.optional(Schema.String),
  targetNetwork: Schema.optional(Schema.String),
})).annotate({ identifier: "DnsPeering" }) as any as Schema.Schema<DnsPeering>;

export interface ListDnsPeeringsResponse {
  /** List of dns peering. */
  dnsPeerings?: Array<DnsPeering>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListDnsPeeringsResponse: Schema.Schema<ListDnsPeeringsResponse> = Schema.suspend(() => Schema.Struct({
  dnsPeerings: Schema.optional(Schema.Array(DnsPeering)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDnsPeeringsResponse" }) as any as Schema.Schema<ListDnsPeeringsResponse>;

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
  /** The time the operation was created. */
  createTime?: string;
  /** The time the operation finished running. */
  endTime?: string;
  /** Server-defined resource path for the target of the operation. */
  target?: string;
  /** Name of the verb executed by the operation. */
  verb?: string;
  /** Human-readable status of the operation if any. */
  statusDetail?: string;
  /** Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** API version used to start the operation. */
  apiVersion?: string;
  /** Map to hold any additional status info for the operation If there is an accelerator being enabled/disabled/deleted, this will be populated with accelerator name as key and status as ENABLING, DISABLING or DELETING */
  additionalStatus?: Record<string, string>;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusDetail: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
  additionalStatus: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. */
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

/** Lists possible versions for Data Fusion instances in the specified project and location. */
export interface ListProjectsLocationsVersionsRequest {
  /** Required. The project and location for which to retrieve instance information in the format projects/{project}/locations/{location}. */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value to use if there are additional results to retrieve for this list request. */
  pageToken?: string;
  /** Whether or not to return the latest patch of every available minor version. If true, only the latest patch will be returned. Ex. if allowed versions is [6.1.1, 6.1.2, 6.2.0] then response will be [6.1.2, 6.2.0] */
  latestPatchOnly?: boolean;
}

export const ListProjectsLocationsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  latestPatchOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("latestPatchOnly")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsVersionsRequest>;

export type ListProjectsLocationsVersionsResponse = ListAvailableVersionsResponse;
export const ListProjectsLocationsVersionsResponse = ListAvailableVersionsResponse;

export type ListProjectsLocationsVersionsError = CommonErrors;

export const listProjectsLocationsVersions = API.makePaginated(() => ({
  input: ListProjectsLocationsVersionsRequest,
  output: ListProjectsLocationsVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists Data Fusion instances in the specified project and location. */
export interface ListProjectsLocationsInstancesRequest {
  /** Required. The project and location for which to retrieve instance information in the format projects/{project}/locations/{location}. If the location is specified as '-' (wildcard), then all regions available to the project are queried, and the results are aggregated. */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value to use if there are additional results to retrieve for this list request. */
  pageToken?: string;
  /** List filter. */
  filter?: string;
  /** Sort results. Supported values are "name", "name desc", or "" (unsorted). */
  orderBy?: string;
}

export const ListProjectsLocationsInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
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

/** Gets details of a single Data Fusion instance. */
export interface GetProjectsLocationsInstancesRequest {
  /** Required. The instance resource name in the format projects/{project}/locations/{location}/instances/{instance}. */
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

/** Creates a new Data Fusion instance in the specified project and location. */
export interface CreateProjectsLocationsInstancesRequest {
  /** Required. The instance's project and location in the format projects/{project}/locations/{location}. */
  parent: string;
  /** Required. The name of the instance to create. Instance name can only contain lowercase alphanumeric characters and hyphens. It must start with a letter and must not end with a hyphen. It can have a maximum of 30 characters. */
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

/** Deletes a single Date Fusion instance. */
export interface DeleteProjectsLocationsInstancesRequest {
  /** Required. The instance resource name in the format projects/{project}/locations/{location}/instances/{instance} */
  name: string;
  /** Optional. If set to true, any nested resources from this instance will also be deleted. */
  force?: boolean;
}

export const DeleteProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
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

/** Updates a single Data Fusion instance. */
export interface PatchProjectsLocationsInstancesRequest {
  /** Output only. The name of this instance is in the form of projects/{project}/locations/{location}/instances/{instance}. */
  name: string;
  /** Field mask is used to specify the fields that the update will overwrite in an instance resource. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask, the label field will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: Instance;
}

export const PatchProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
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

/** Restart a single Data Fusion instance. At the end of an operation instance is fully restarted. */
export interface RestartProjectsLocationsInstancesRequest {
  /** Required. Name of the Data Fusion instance which need to be restarted in the form of projects/{project}/locations/{location}/instances/{instance} */
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

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsInstancesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsInstancesRequest>;

export type SetIamPolicyProjectsLocationsInstancesResponse = Policy;
export const SetIamPolicyProjectsLocationsInstancesResponse = Policy;

export type SetIamPolicyProjectsLocationsInstancesError = CommonErrors;

export const setIamPolicyProjectsLocationsInstances: API.OperationMethod<SetIamPolicyProjectsLocationsInstancesRequest, SetIamPolicyProjectsLocationsInstancesResponse, SetIamPolicyProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsInstancesRequest,
  output: SetIamPolicyProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsInstancesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsInstancesRequest>;

export type GetIamPolicyProjectsLocationsInstancesResponse = Policy;
export const GetIamPolicyProjectsLocationsInstancesResponse = Policy;

export type GetIamPolicyProjectsLocationsInstancesError = CommonErrors;

export const getIamPolicyProjectsLocationsInstances: API.OperationMethod<GetIamPolicyProjectsLocationsInstancesRequest, GetIamPolicyProjectsLocationsInstancesResponse, GetIamPolicyProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsInstancesRequest,
  output: GetIamPolicyProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsInstancesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsInstancesRequest>;

export type TestIamPermissionsProjectsLocationsInstancesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsInstancesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsInstancesError = CommonErrors;

export const testIamPermissionsProjectsLocationsInstances: API.OperationMethod<TestIamPermissionsProjectsLocationsInstancesRequest, TestIamPermissionsProjectsLocationsInstancesResponse, TestIamPermissionsProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsInstancesRequest,
  output: TestIamPermissionsProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Creates DNS peering on the given resource. */
export interface CreateProjectsLocationsInstancesDnsPeeringsRequest {
  /** Required. The resource on which DNS peering will be created. */
  parent: string;
  /** Required. The name of the peering to create. */
  dnsPeeringId?: string;
  /** Request body */
  body?: DnsPeering;
}

export const CreateProjectsLocationsInstancesDnsPeeringsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dnsPeeringId: Schema.optional(Schema.String).pipe(T.HttpQuery("dnsPeeringId")),
  body: Schema.optional(DnsPeering).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/dnsPeerings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsInstancesDnsPeeringsRequest>;

export type CreateProjectsLocationsInstancesDnsPeeringsResponse = DnsPeering;
export const CreateProjectsLocationsInstancesDnsPeeringsResponse = DnsPeering;

export type CreateProjectsLocationsInstancesDnsPeeringsError = CommonErrors;

export const createProjectsLocationsInstancesDnsPeerings: API.OperationMethod<CreateProjectsLocationsInstancesDnsPeeringsRequest, CreateProjectsLocationsInstancesDnsPeeringsResponse, CreateProjectsLocationsInstancesDnsPeeringsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsInstancesDnsPeeringsRequest,
  output: CreateProjectsLocationsInstancesDnsPeeringsResponse,
  errors: [],
}));

/** Deletes DNS peering on the given resource. */
export interface DeleteProjectsLocationsInstancesDnsPeeringsRequest {
  /** Required. The name of the DNS peering zone to delete. Format: projects/{project}/locations/{location}/instances/{instance}/dnsPeerings/{dns_peering} */
  name: string;
}

export const DeleteProjectsLocationsInstancesDnsPeeringsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/dnsPeerings/{dnsPeeringsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsInstancesDnsPeeringsRequest>;

export type DeleteProjectsLocationsInstancesDnsPeeringsResponse = Empty;
export const DeleteProjectsLocationsInstancesDnsPeeringsResponse = Empty;

export type DeleteProjectsLocationsInstancesDnsPeeringsError = CommonErrors;

export const deleteProjectsLocationsInstancesDnsPeerings: API.OperationMethod<DeleteProjectsLocationsInstancesDnsPeeringsRequest, DeleteProjectsLocationsInstancesDnsPeeringsResponse, DeleteProjectsLocationsInstancesDnsPeeringsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsInstancesDnsPeeringsRequest,
  output: DeleteProjectsLocationsInstancesDnsPeeringsResponse,
  errors: [],
}));

/** Lists DNS peerings for a given resource. */
export interface ListProjectsLocationsInstancesDnsPeeringsRequest {
  /** Required. The parent, which owns this collection of dns peerings. Format: projects/{project}/locations/{location}/instances/{instance} */
  parent: string;
  /** The maximum number of dns peerings to return. The service may return fewer than this value. If unspecified, at most 50 dns peerings will be returned. The maximum value is 200; values above 200 will be coerced to 200. */
  pageSize?: number;
  /** A page token, received from a previous `ListDnsPeerings` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDnsPeerings` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsInstancesDnsPeeringsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/dnsPeerings" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInstancesDnsPeeringsRequest>;

export type ListProjectsLocationsInstancesDnsPeeringsResponse = ListDnsPeeringsResponse;
export const ListProjectsLocationsInstancesDnsPeeringsResponse = ListDnsPeeringsResponse;

export type ListProjectsLocationsInstancesDnsPeeringsError = CommonErrors;

export const listProjectsLocationsInstancesDnsPeerings = API.makePaginated(() => ({
  input: ListProjectsLocationsInstancesDnsPeeringsRequest,
  output: ListProjectsLocationsInstancesDnsPeeringsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

