// ==========================================================================
// Workload Manager API (workloadmanager v1)
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
  name: "workloadmanager",
  version: "v1",
  rootUrl: "https://workloadmanager.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ResourceStatus {
  /** Historical: Used before 2023-05-22 the new version of rule id if exists */
  rulesNewerVersions?: Array<string>;
  /** State of the resource */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | (string & {});
}

export const ResourceStatus: Schema.Schema<ResourceStatus> = Schema.suspend(() => Schema.Struct({
  rulesNewerVersions: Schema.optional(Schema.Array(Schema.String)),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceStatus" }) as any as Schema.Schema<ResourceStatus>;

export interface IAMPermission {
  /** Output only. The name of the permission. */
  name?: string;
  /** Output only. Whether the permission is granted. */
  granted?: boolean;
}

export const IAMPermission: Schema.Schema<IAMPermission> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  granted: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "IAMPermission" }) as any as Schema.Schema<IAMPermission>;

export interface ServiceStates {
  /** Optional. Output only. The IAM permissions for the service. */
  iamPermissions?: Array<IAMPermission>;
  /** Output only. The overall state of the service. */
  state?: "STATE_UNSPECIFIED" | "CONFIG_FAILURE" | "IAM_FAILURE" | "FUNCTIONALITY_FAILURE" | "ENABLED" | "DISABLED" | (string & {});
}

export const ServiceStates: Schema.Schema<ServiceStates> = Schema.suspend(() => Schema.Struct({
  iamPermissions: Schema.optional(Schema.Array(IAMPermission)),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceStates" }) as any as Schema.Schema<ServiceStates>;

export interface AgentStates {
  /** Optional. HANA monitoring metrics of the agent. */
  hanaMonitoring?: ServiceStates;
  /** Optional. Whether the agent is fully enabled. If false, the agent is has some issues. */
  isFullyEnabled?: boolean;
  /** Optional. The System discovery metrics of the agent. */
  systemDiscovery?: ServiceStates;
  /** Optional. The Process metrics of the agent. */
  processMetrics?: ServiceStates;
  /** Optional. The installed version of the agent on the host. */
  installedVersion?: string;
  /** Optional. The available version of the agent in artifact registry. */
  availableVersion?: string;
}

export const AgentStates: Schema.Schema<AgentStates> = Schema.suspend(() => Schema.Struct({
  hanaMonitoring: Schema.optional(ServiceStates),
  isFullyEnabled: Schema.optional(Schema.Boolean),
  systemDiscovery: Schema.optional(ServiceStates),
  processMetrics: Schema.optional(ServiceStates),
  installedVersion: Schema.optional(Schema.String),
  availableVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "AgentStates" }) as any as Schema.Schema<AgentStates>;

export interface SapInstanceProperties {
  /** Optional. Sap Instance Agent status. */
  agentStates?: AgentStates;
  /** Optional. SAP Instance numbers. They are from '00' to '99'. */
  numbers?: Array<string>;
}

export const SapInstanceProperties: Schema.Schema<SapInstanceProperties> = Schema.suspend(() => Schema.Struct({
  agentStates: Schema.optional(AgentStates),
  numbers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SapInstanceProperties" }) as any as Schema.Schema<SapInstanceProperties>;

export interface UpcomingMaintenanceEvent {
  /** Optional. End time */
  endTime?: string;
  /** Optional. Start time */
  startTime?: string;
  /** Optional. Maintenance status */
  maintenanceStatus?: string;
  /** Optional. Instance maintenance behavior. Could be `MIGRATE` or `TERMINATE`. */
  onHostMaintenance?: string;
  /** Optional. Type */
  type?: string;
}

export const UpcomingMaintenanceEvent: Schema.Schema<UpcomingMaintenanceEvent> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  maintenanceStatus: Schema.optional(Schema.String),
  onHostMaintenance: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "UpcomingMaintenanceEvent" }) as any as Schema.Schema<UpcomingMaintenanceEvent>;

export interface InstanceProperties {
  /** Optional. SAP Instance properties. */
  sapInstanceProperties?: SapInstanceProperties;
  /** Optional. Instance status. */
  status?: string;
  /** Optional. the next maintenance event on VM */
  upcomingMaintenanceEvent?: UpcomingMaintenanceEvent;
  /** Optional. Instance roles. */
  roles?: Array<"INSTANCE_ROLE_UNSPECIFIED" | "INSTANCE_ROLE_ASCS" | "INSTANCE_ROLE_ERS" | "INSTANCE_ROLE_APP_SERVER" | "INSTANCE_ROLE_HANA_PRIMARY" | "INSTANCE_ROLE_HANA_SECONDARY" | (string & {})>;
  /** Optional. Instance number. */
  instanceNumber?: string;
  /** Optional. Instance machine type. */
  machineType?: string;
}

export const InstanceProperties: Schema.Schema<InstanceProperties> = Schema.suspend(() => Schema.Struct({
  sapInstanceProperties: Schema.optional(SapInstanceProperties),
  status: Schema.optional(Schema.String),
  upcomingMaintenanceEvent: Schema.optional(UpcomingMaintenanceEvent),
  roles: Schema.optional(Schema.Array(Schema.String)),
  instanceNumber: Schema.optional(Schema.String),
  machineType: Schema.optional(Schema.String),
})).annotate({ identifier: "InstanceProperties" }) as any as Schema.Schema<InstanceProperties>;

export interface CloudResource {
  /** Output only. resource name Example: compute.googleapis.com/projects/wlm-obs-dev/zones/us-central1-a/instances/sap-pri */
  name?: string;
  /** Output only. */
  kind?: "RESOURCE_KIND_UNSPECIFIED" | "RESOURCE_KIND_INSTANCE" | "RESOURCE_KIND_DISK" | "RESOURCE_KIND_ADDRESS" | "RESOURCE_KIND_FILESTORE" | "RESOURCE_KIND_HEALTH_CHECK" | "RESOURCE_KIND_FORWARDING_RULE" | "RESOURCE_KIND_BACKEND_SERVICE" | "RESOURCE_KIND_SUBNETWORK" | "RESOURCE_KIND_NETWORK" | "RESOURCE_KIND_PUBLIC_ADDRESS" | "RESOURCE_KIND_INSTANCE_GROUP" | (string & {});
  /** Output only. All instance properties. */
  instanceProperties?: InstanceProperties;
}

export const CloudResource: Schema.Schema<CloudResource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  instanceProperties: Schema.optional(InstanceProperties),
})).annotate({ identifier: "CloudResource" }) as any as Schema.Schema<CloudResource>;

export interface HealthCheck {
  /** Output only. The resource the check performs on. */
  resource?: CloudResource;
  /** Output only. The message of the health check. */
  message?: string;
  /** Output only. The health check source metric name. */
  metric?: string;
  /** Output only. The source of the health check. */
  source?: string;
  /** Output only. The state of the health check. */
  state?: "STATE_UNSPECIFIED" | "PASSED" | "FAILED" | "DEGRADED" | "SKIPPED" | "UNSUPPORTED" | (string & {});
}

export const HealthCheck: Schema.Schema<HealthCheck> = Schema.suspend(() => Schema.Struct({
  resource: Schema.optional(CloudResource),
  message: Schema.optional(Schema.String),
  metric: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "HealthCheck" }) as any as Schema.Schema<HealthCheck>;

export interface ComponentHealth {
  /** Output only. The type of the component health. */
  componentHealthType?: "TYPE_UNSPECIFIED" | "TYPE_REQUIRED" | "TYPE_OPTIONAL" | "TYPE_SPECIAL" | (string & {});
  /** Output only. The health state of the component. */
  state?: "HEALTH_STATE_UNSPECIFIED" | "HEALTHY" | "UNHEALTHY" | "CRITICAL" | "UNSUPPORTED" | (string & {});
  /** The component of a workload. */
  component?: string;
  /** Sub component health. */
  subComponentsHealth?: Array<ComponentHealth>;
  /** The detailed health checks of the component. */
  componentHealthChecks?: Array<HealthCheck>;
}

export const ComponentHealth: Schema.Schema<ComponentHealth> = Schema.suspend(() => Schema.Struct({
  componentHealthType: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  component: Schema.optional(Schema.String),
  subComponentsHealth: Schema.optional(Schema.Array(ComponentHealth)),
  componentHealthChecks: Schema.optional(Schema.Array(HealthCheck)),
})).annotate({ identifier: "ComponentHealth" }) as any as Schema.Schema<ComponentHealth>;

export interface WorkloadProfileHealth {
  /** Output only. The health state of the workload. */
  state?: "HEALTH_STATE_UNSPECIFIED" | "HEALTHY" | "UNHEALTHY" | "CRITICAL" | "UNSUPPORTED" | (string & {});
  /** The detailed condition reports of each component. */
  componentsHealth?: Array<ComponentHealth>;
  /** The time when the health check was performed. */
  checkTime?: string;
}

export const WorkloadProfileHealth: Schema.Schema<WorkloadProfileHealth> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  componentsHealth: Schema.optional(Schema.Array(ComponentHealth)),
  checkTime: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkloadProfileHealth" }) as any as Schema.Schema<WorkloadProfileHealth>;

export interface AgentStatusConfigValue {
  /** Output only. The value of the configuration value. */
  value?: string;
  /** Output only. The name of the configuration value. */
  name?: string;
  /** Output only. Whether the configuration value is the default value or overridden. */
  isDefault?: boolean;
}

export const AgentStatusConfigValue: Schema.Schema<AgentStatusConfigValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  isDefault: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AgentStatusConfigValue" }) as any as Schema.Schema<AgentStatusConfigValue>;

export interface ExternalDataSources {
  /** Optional. Name of external data source. The name will be used inside the rego/sql to refer the external data */
  name?: string;
  /** Required. The asset type of the external data source. This can be a supported Cloud Asset Inventory asset type (see https://cloud.google.com/asset-inventory/docs/supported-asset-types) to override the default asset type, or it can be a custom type defined by the user. */
  assetType?: string;
  /** Required. Type of external data source */
  type?: "TYPE_UNSPECIFIED" | "BIG_QUERY_TABLE" | (string & {});
  /** Required. URI of external data source. example of bq table {project_ID}.{dataset_ID}.{table_ID} */
  uri?: string;
}

export const ExternalDataSources: Schema.Schema<ExternalDataSources> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  assetType: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "ExternalDataSources" }) as any as Schema.Schema<ExternalDataSources>;

export interface Summary {
  /** Output only. Number of new failures compared to the previous execution */
  newFailures?: string;
  /** Output only. Number of new fixes compared to the previous execution */
  newFixes?: string;
  /** Output only. Number of failures */
  failures?: string;
}

export const Summary: Schema.Schema<Summary> = Schema.suspend(() => Schema.Struct({
  newFailures: Schema.optional(Schema.String),
  newFixes: Schema.optional(Schema.String),
  failures: Schema.optional(Schema.String),
})).annotate({ identifier: "Summary" }) as any as Schema.Schema<Summary>;

export interface RuleExecutionResult {
  /** Output only. The execution status */
  state?: "STATE_UNSPECIFIED" | "STATE_SUCCESS" | "STATE_FAILURE" | "STATE_SKIPPED" | (string & {});
  /** Number of violations */
  resultCount?: string;
  /** Number of total scanned resources */
  scannedResourceCount?: string;
  /** Execution message, if any */
  message?: string;
  /** rule name */
  rule?: string;
}

export const RuleExecutionResult: Schema.Schema<RuleExecutionResult> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  resultCount: Schema.optional(Schema.String),
  scannedResourceCount: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  rule: Schema.optional(Schema.String),
})).annotate({ identifier: "RuleExecutionResult" }) as any as Schema.Schema<RuleExecutionResult>;

export interface Notice {
  /** Output only. Message of the notice */
  message?: string;
}

export const Notice: Schema.Schema<Notice> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "Notice" }) as any as Schema.Schema<Notice>;

export interface Execution {
  /** type represent whether the execution executed directly by user or scheduled according evaluation.schedule field. */
  runType?: "TYPE_UNSPECIFIED" | "ONE_TIME" | "SCHEDULED" | (string & {});
  /** Output only. [Output only] Evaluation ID */
  evaluationId?: string;
  /** Labels as key value pairs */
  labels?: Record<string, string>;
  /** Optional. External data sources */
  externalDataSources?: Array<ExternalDataSources>;
  /** Output only. [Output only] Result summary for the execution */
  resultSummary?: Summary;
  /** Output only. [Output only] State */
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "SUCCEEDED" | "FAILED" | (string & {});
  /** The name of execution resource. The format is projects/{project}/locations/{location}/evaluations/{evaluation}/executions/{execution} */
  name?: string;
  /** Output only. [Output only] Start time stamp */
  startTime?: string;
  /** Output only. execution result summary per rule */
  ruleResults?: Array<RuleExecutionResult>;
  /** Output only. Additional information generated by the execution */
  notices?: Array<Notice>;
  /** Output only. [Output only] End time stamp */
  endTime?: string;
  /** Output only. [Output only] Inventory time stamp */
  inventoryTime?: string;
  /** Optional. Engine */
  engine?: "ENGINE_UNSPECIFIED" | "ENGINE_SCANNER" | "V2" | (string & {});
}

export const Execution: Schema.Schema<Execution> = Schema.suspend(() => Schema.Struct({
  runType: Schema.optional(Schema.String),
  evaluationId: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  externalDataSources: Schema.optional(Schema.Array(ExternalDataSources)),
  resultSummary: Schema.optional(Summary),
  state: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  ruleResults: Schema.optional(Schema.Array(RuleExecutionResult)),
  notices: Schema.optional(Schema.Array(Notice)),
  endTime: Schema.optional(Schema.String),
  inventoryTime: Schema.optional(Schema.String),
  engine: Schema.optional(Schema.String),
})).annotate({ identifier: "Execution" }) as any as Schema.Schema<Execution>;

export interface RunEvaluationRequest {
  /** Required. Id of the requesting object If auto-generating Id server-side, remove this field and execution_id from the method_signature of Create RPC */
  executionId?: string;
  /** Required. The resource being created */
  execution?: Execution;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const RunEvaluationRequest: Schema.Schema<RunEvaluationRequest> = Schema.suspend(() => Schema.Struct({
  executionId: Schema.optional(Schema.String),
  execution: Schema.optional(Execution),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "RunEvaluationRequest" }) as any as Schema.Schema<RunEvaluationRequest>;

export interface DatabaseDetails {
  /** Optional. primary db vm name */
  primaryDbVm?: string;
  /** Required. disk_type */
  diskType?: string;
  /** Database service account - let custoemrs bring their own SA for database */
  databaseServiceAccount?: string;
  /** Required. The SID is a three-digit server-specific unique identification code. */
  sid?: string;
  /** Optional. secondary db vm name */
  secondaryDbVm?: string;
  /** Required. image for database server */
  image?: string;
  /** Required. machine type */
  machineType?: string;
  /** Required. secret_manager_secret */
  secretManagerSecret?: string;
  /** Optional. instance id */
  instanceId?: string;
}

export const DatabaseDetails: Schema.Schema<DatabaseDetails> = Schema.suspend(() => Schema.Struct({
  primaryDbVm: Schema.optional(Schema.String),
  diskType: Schema.optional(Schema.String),
  databaseServiceAccount: Schema.optional(Schema.String),
  sid: Schema.optional(Schema.String),
  secondaryDbVm: Schema.optional(Schema.String),
  image: Schema.optional(Schema.String),
  machineType: Schema.optional(Schema.String),
  secretManagerSecret: Schema.optional(Schema.String),
  instanceId: Schema.optional(Schema.String),
})).annotate({ identifier: "DatabaseDetails" }) as any as Schema.Schema<DatabaseDetails>;

export interface ActuationOutput {
  /** Output only. error message return from terraform. */
  terraformError?: string;
  /** Cloud Build instance UUID associated with this revision, without any suffix or prefix */
  cloudbuildId?: string;
  /** Output only. Code describing any errors that may have occurred. If not specified, there is no error in actuation. */
  errorCode?: "ERROR_CODE_UNSPECIFIED" | "TERRAFORM_FAILED" | "PERMISSION_DENIED_IN_TERRAFORM" | "QUOTA_EXCEED_IN_TERRAFORM" | "ANSIBLE_FAILED" | "CONSTRAINT_VIOLATION_IN_TERRAFORM" | "RESOURCE_ALREADY_EXISTS_IN_TERRAFORM" | "RESOURCE_UNAVAILABLE_IN_TERRAFORM" | "PERMISSION_DENIED_IN_ANSIBLE" | "INVALID_SECRET_IN_ANSIBLE" | "TERRAFORM_DELETION_FAILED" | "RESOURCE_IN_USE_IN_TERRAFORM_DELETION" | "ANSIBLE_START_FAILED" | (string & {});
  /** A link to gcs file that store build logs */
  actuateLogs?: string;
  /** reference to terraform template used */
  terraformTemplate?: string;
  /** reference to Blueprint Controller deployment and revision resource */
  blueprintId?: string;
  /** Output only. whether the error message is user facing. If true, the error message will be shown in the UI. */
  hasUserFacingErrorMsg?: boolean;
  /** Output only. failed task name return from ansible. */
  ansibleFailedTask?: Array<string>;
  /** A link to actuation cloud build log. */
  errorLogs?: string;
  /** Output only. error message return from ansible. */
  ansibleError?: string;
}

export const ActuationOutput: Schema.Schema<ActuationOutput> = Schema.suspend(() => Schema.Struct({
  terraformError: Schema.optional(Schema.String),
  cloudbuildId: Schema.optional(Schema.String),
  errorCode: Schema.optional(Schema.String),
  actuateLogs: Schema.optional(Schema.String),
  terraformTemplate: Schema.optional(Schema.String),
  blueprintId: Schema.optional(Schema.String),
  hasUserFacingErrorMsg: Schema.optional(Schema.Boolean),
  ansibleFailedTask: Schema.optional(Schema.Array(Schema.String)),
  errorLogs: Schema.optional(Schema.String),
  ansibleError: Schema.optional(Schema.String),
})).annotate({ identifier: "ActuationOutput" }) as any as Schema.Schema<ActuationOutput>;

export interface DeploymentOutput {
  /** type of the resource */
  type?: string;
  /** name of the resource */
  name?: string;
}

export const DeploymentOutput: Schema.Schema<DeploymentOutput> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "DeploymentOutput" }) as any as Schema.Schema<DeploymentOutput>;

export interface Actuation {
  /** Output only. [Output only] End time stamp */
  endTime?: string;
  /** Output only. [Output only] Actuation state */
  state?: "STATE_UNSPECIFIED" | "INFRA_CREATING" | "SUCCEEDED" | "FAILED" | "POST_INFRA_CONFIGURING" | "INFRA_DESTROYING" | "TIMEOUT" | (string & {});
  /** The name of actuation resource. The format is projects/{project}/locations/{location}/deployments/{deployment}/actuations/{actuation} */
  name?: string;
  /** Output only. [Output only] Actuation output */
  actuationOutput?: ActuationOutput;
  /** Output only. [Output only] Deployment output */
  deploymentOutput?: Array<DeploymentOutput>;
  /** Output only. [Output only] Start time stamp */
  startTime?: string;
}

export const Actuation: Schema.Schema<Actuation> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  actuationOutput: Schema.optional(ActuationOutput),
  deploymentOutput: Schema.optional(Schema.Array(DeploymentOutput)),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Actuation" }) as any as Schema.Schema<Actuation>;

export interface Product {
  /** Optional. Name of the product. */
  name?: string;
  /** Optional. Version of the product. */
  version?: string;
}

export const Product: Schema.Schema<Product> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "Product" }) as any as Schema.Schema<Product>;

export interface BackupProperties {
  /** The time when the latest backup was performed. */
  latestBackupTime?: string;
  /** Output only. The state of the latest backup. */
  latestBackupStatus?: "BACKUP_STATE_UNSPECIFIED" | "BACKUP_STATE_SUCCESS" | "BACKUP_STATE_FAILURE" | (string & {});
}

export const BackupProperties: Schema.Schema<BackupProperties> = Schema.suspend(() => Schema.Struct({
  latestBackupTime: Schema.optional(Schema.String),
  latestBackupStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupProperties" }) as any as Schema.Schema<BackupProperties>;

export interface DatabaseProperties {
  /** Output only. Type of the database. `HANA`, `DB2`, etc. */
  databaseType?: "DATABASE_TYPE_UNSPECIFIED" | "HANA" | "MAX_DB" | "DB2" | "ORACLE" | "SQLSERVER" | "ASE" | (string & {});
  /** Output only. Backup properties. */
  backupProperties?: BackupProperties;
}

export const DatabaseProperties: Schema.Schema<DatabaseProperties> = Schema.suspend(() => Schema.Struct({
  databaseType: Schema.optional(Schema.String),
  backupProperties: Schema.optional(BackupProperties),
})).annotate({ identifier: "DatabaseProperties" }) as any as Schema.Schema<DatabaseProperties>;

export interface SapComponent {
  /** The detected topology of the component. */
  topologyType?: "TOPOLOGY_TYPE_UNSPECIFIED" | "TOPOLOGY_SCALE_UP" | "TOPOLOGY_SCALE_OUT" | (string & {});
  /** Output only. sid is the sap component identificator */
  sid?: string;
  /** List of host URIs that are part of the HA configuration if present. An empty list indicates the component is not configured for HA. */
  haHosts?: Array<string>;
  /** Output only. resources in the component */
  resources?: Array<CloudResource>;
  /** Output only. All instance properties. */
  databaseProperties?: DatabaseProperties;
}

export const SapComponent: Schema.Schema<SapComponent> = Schema.suspend(() => Schema.Struct({
  topologyType: Schema.optional(Schema.String),
  sid: Schema.optional(Schema.String),
  haHosts: Schema.optional(Schema.Array(Schema.String)),
  resources: Schema.optional(Schema.Array(CloudResource)),
  databaseProperties: Schema.optional(DatabaseProperties),
})).annotate({ identifier: "SapComponent" }) as any as Schema.Schema<SapComponent>;

export interface SapWorkload {
  /** Output only. The products on this workload. */
  products?: Array<Product>;
  /** Output only. database component */
  database?: SapComponent;
  /** Output only. The architecture. */
  architecture?: "ARCHITECTURE_UNSPECIFIED" | "INVALID" | "CENTRALIZED" | "DISTRIBUTED" | "DISTRIBUTED_HA" | "STANDALONE_DATABASE" | "STANDALONE_DATABASE_HA" | (string & {});
  /** Output only. application component */
  application?: SapComponent;
  /** Output only. The metadata for SAP workload. */
  metadata?: Record<string, string>;
}

export const SapWorkload: Schema.Schema<SapWorkload> = Schema.suspend(() => Schema.Struct({
  products: Schema.optional(Schema.Array(Product)),
  database: Schema.optional(SapComponent),
  architecture: Schema.optional(Schema.String),
  application: Schema.optional(SapComponent),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "SapWorkload" }) as any as Schema.Schema<SapWorkload>;

export interface WorkloadProfile {
  /** Identifier. name of resource names have the form 'projects/{project_id}/locations/{location}/workloadProfiles/{workload_id}' */
  name?: string;
  /** The sap workload content */
  sapWorkload?: SapWorkload;
  /** Required. The type of the workload */
  workloadType?: "WORKLOAD_TYPE_UNSPECIFIED" | "S4_HANA" | (string & {});
  /** Required. time when the workload data was refreshed */
  refreshedTime?: string;
  /** Optional. such as name, description, version. More example can be found in deployment */
  labels?: Record<string, string>;
}

export const WorkloadProfile: Schema.Schema<WorkloadProfile> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  sapWorkload: Schema.optional(SapWorkload),
  workloadType: Schema.optional(Schema.String),
  refreshedTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "WorkloadProfile" }) as any as Schema.Schema<WorkloadProfile>;

export interface ListDiscoveredProfilesResponse {
  /** Output only. The list of workload profiles */
  workloadProfiles?: Array<WorkloadProfile>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** Output only. A token identifying a page of results the server should return */
  nextPageToken?: string;
}

export const ListDiscoveredProfilesResponse: Schema.Schema<ListDiscoveredProfilesResponse> = Schema.suspend(() => Schema.Struct({
  workloadProfiles: Schema.optional(Schema.Array(WorkloadProfile)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDiscoveredProfilesResponse" }) as any as Schema.Schema<ListDiscoveredProfilesResponse>;

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

export interface SapDiscoveryResourceInstancePropertiesKernelVersionVersion {
  /** Optional. A catch-all for any unparsed version components. This is in case the number of points in the version string exceeds the expected count of 4. */
  remainder?: string;
  /** Optional. The patch version number. */
  patch?: number;
  /** Optional. The major version number. */
  major?: number;
  /** Optional. The minor version number. */
  minor?: number;
  /** Optional. The build version number. */
  build?: number;
}

export const SapDiscoveryResourceInstancePropertiesKernelVersionVersion: Schema.Schema<SapDiscoveryResourceInstancePropertiesKernelVersionVersion> = Schema.suspend(() => Schema.Struct({
  remainder: Schema.optional(Schema.String),
  patch: Schema.optional(Schema.Number),
  major: Schema.optional(Schema.Number),
  minor: Schema.optional(Schema.Number),
  build: Schema.optional(Schema.Number),
})).annotate({ identifier: "SapDiscoveryResourceInstancePropertiesKernelVersionVersion" }) as any as Schema.Schema<SapDiscoveryResourceInstancePropertiesKernelVersionVersion>;

export interface SapDiscoveryResourceInstancePropertiesKernelVersion {
  /** Optional. Raw string of the kernel version. */
  rawString?: string;
  /** Optional. Captures the distro-specific kernel version, the portion of the string following the first dash. */
  distroKernel?: SapDiscoveryResourceInstancePropertiesKernelVersionVersion;
  /** Optional. Captures the OS-specific kernel version, the portion of the string up to the first dash. */
  osKernel?: SapDiscoveryResourceInstancePropertiesKernelVersionVersion;
}

export const SapDiscoveryResourceInstancePropertiesKernelVersion: Schema.Schema<SapDiscoveryResourceInstancePropertiesKernelVersion> = Schema.suspend(() => Schema.Struct({
  rawString: Schema.optional(Schema.String),
  distroKernel: Schema.optional(SapDiscoveryResourceInstancePropertiesKernelVersionVersion),
  osKernel: Schema.optional(SapDiscoveryResourceInstancePropertiesKernelVersionVersion),
})).annotate({ identifier: "SapDiscoveryResourceInstancePropertiesKernelVersion" }) as any as Schema.Schema<SapDiscoveryResourceInstancePropertiesKernelVersion>;

export interface SapDiscoveryResourceInstancePropertiesDiskMount {
  /** Optional. Filesystem mount point. */
  mountPoint?: string;
  /** Optional. Name of the disk. */
  name?: string;
  /** Optional. Names of the disks providing this mount point. */
  diskNames?: Array<string>;
}

export const SapDiscoveryResourceInstancePropertiesDiskMount: Schema.Schema<SapDiscoveryResourceInstancePropertiesDiskMount> = Schema.suspend(() => Schema.Struct({
  mountPoint: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  diskNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SapDiscoveryResourceInstancePropertiesDiskMount" }) as any as Schema.Schema<SapDiscoveryResourceInstancePropertiesDiskMount>;

export interface SapDiscoveryResourceInstancePropertiesAppInstance {
  /** Optional. Instance number of the SAP application instance. */
  number?: string;
  /** Optional. Instance name of the SAP application instance. */
  name?: string;
}

export const SapDiscoveryResourceInstancePropertiesAppInstance: Schema.Schema<SapDiscoveryResourceInstancePropertiesAppInstance> = Schema.suspend(() => Schema.Struct({
  number: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "SapDiscoveryResourceInstancePropertiesAppInstance" }) as any as Schema.Schema<SapDiscoveryResourceInstancePropertiesAppInstance>;

export interface SapDiscoveryResourceInstanceProperties {
  /** Optional. The kernel version of the instance. */
  osKernelVersion?: SapDiscoveryResourceInstancePropertiesKernelVersion;
  /** Optional. Disk mounts on the instance. */
  diskMounts?: Array<SapDiscoveryResourceInstancePropertiesDiskMount>;
  /** Optional. A virtual hostname of the instance if it has one. */
  virtualHostname?: string;
  /** Optional. The VM's instance number. */
  instanceNumber?: string;
  /** Optional. Instance is part of a DR site. */
  isDrSite?: boolean;
  /** Optional. A list of instance URIs that are part of a cluster with this one. */
  clusterInstances?: Array<string>;
  /** Optional. App server instances on the host */
  appInstances?: Array<SapDiscoveryResourceInstancePropertiesAppInstance>;
  /** Optional. Bitmask of instance role, a resource may have multiple roles at once. */
  instanceRole?: "INSTANCE_ROLE_UNSPECIFIED" | "INSTANCE_ROLE_ASCS" | "INSTANCE_ROLE_ERS" | "INSTANCE_ROLE_APP_SERVER" | "INSTANCE_ROLE_DATABASE" | "INSTANCE_ROLE_ASCS_ERS" | "INSTANCE_ROLE_ASCS_APP_SERVER" | "INSTANCE_ROLE_ASCS_DATABASE" | "INSTANCE_ROLE_ERS_APP_SERVER" | "INSTANCE_ROLE_ERS_DATABASE" | "INSTANCE_ROLE_APP_SERVER_DATABASE" | "INSTANCE_ROLE_ASCS_ERS_APP_SERVER" | "INSTANCE_ROLE_ASCS_ERS_DATABASE" | "INSTANCE_ROLE_ASCS_APP_SERVER_DATABASE" | "INSTANCE_ROLE_ERS_APP_SERVER_DATABASE" | "INSTANCE_ROLE_ASCS_ERS_APP_SERVER_DATABASE" | (string & {});
}

export const SapDiscoveryResourceInstanceProperties: Schema.Schema<SapDiscoveryResourceInstanceProperties> = Schema.suspend(() => Schema.Struct({
  osKernelVersion: Schema.optional(SapDiscoveryResourceInstancePropertiesKernelVersion),
  diskMounts: Schema.optional(Schema.Array(SapDiscoveryResourceInstancePropertiesDiskMount)),
  virtualHostname: Schema.optional(Schema.String),
  instanceNumber: Schema.optional(Schema.String),
  isDrSite: Schema.optional(Schema.Boolean),
  clusterInstances: Schema.optional(Schema.Array(Schema.String)),
  appInstances: Schema.optional(Schema.Array(SapDiscoveryResourceInstancePropertiesAppInstance)),
  instanceRole: Schema.optional(Schema.String),
})).annotate({ identifier: "SapDiscoveryResourceInstanceProperties" }) as any as Schema.Schema<SapDiscoveryResourceInstanceProperties>;

export interface Location {
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  locationId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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

export interface SapDiscoveryWorkloadPropertiesProductVersion {
  /** Optional. Name of the product. */
  name?: string;
  /** Optional. Version of the product. */
  version?: string;
}

export const SapDiscoveryWorkloadPropertiesProductVersion: Schema.Schema<SapDiscoveryWorkloadPropertiesProductVersion> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "SapDiscoveryWorkloadPropertiesProductVersion" }) as any as Schema.Schema<SapDiscoveryWorkloadPropertiesProductVersion>;

export interface SapDiscoveryWorkloadPropertiesSoftwareComponentProperties {
  /** Optional. The component's major version. */
  version?: string;
  /** Optional. Name of the component. */
  name?: string;
  /** Optional. The component's minor version. */
  extVersion?: string;
  /** Optional. The component's type. */
  type?: string;
}

export const SapDiscoveryWorkloadPropertiesSoftwareComponentProperties: Schema.Schema<SapDiscoveryWorkloadPropertiesSoftwareComponentProperties> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  extVersion: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "SapDiscoveryWorkloadPropertiesSoftwareComponentProperties" }) as any as Schema.Schema<SapDiscoveryWorkloadPropertiesSoftwareComponentProperties>;

export interface SapDiscoveryWorkloadProperties {
  /** Optional. List of SAP Products and their versions running on the system. */
  productVersions?: Array<SapDiscoveryWorkloadPropertiesProductVersion>;
  /** Optional. A list of SAP software components and their versions running on the system. */
  softwareComponentVersions?: Array<SapDiscoveryWorkloadPropertiesSoftwareComponentProperties>;
}

export const SapDiscoveryWorkloadProperties: Schema.Schema<SapDiscoveryWorkloadProperties> = Schema.suspend(() => Schema.Struct({
  productVersions: Schema.optional(Schema.Array(SapDiscoveryWorkloadPropertiesProductVersion)),
  softwareComponentVersions: Schema.optional(Schema.Array(SapDiscoveryWorkloadPropertiesSoftwareComponentProperties)),
})).annotate({ identifier: "SapDiscoveryWorkloadProperties" }) as any as Schema.Schema<SapDiscoveryWorkloadProperties>;

export interface InvalidRule {
  /** cloud storage destination of the invalid rule */
  gcsUri?: string;
  /** display name of the invalid rule */
  displayName?: string;
  /** The error message of valdating rule formats. */
  valiadtionError?: string;
  /** name of the invalid rule */
  name?: string;
}

export const InvalidRule: Schema.Schema<InvalidRule> = Schema.suspend(() => Schema.Struct({
  gcsUri: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  valiadtionError: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "InvalidRule" }) as any as Schema.Schema<InvalidRule>;

export interface AppDetails {
  /** Optional. Customized vm names */
  appVmNames?: Array<string>;
  /** Required. The SAP SID is a three-digit server-specific unique identification code. */
  sid?: string;
  /** Optional. Storage location */
  sharedStorage?: string;
  /** Application service account - let custoemrs bring their own SA for application */
  appServiceAccount?: string;
  /** Optional. ASCS vm name */
  ascsVm?: string;
  /** Required. image for app server and ascs server */
  image?: string;
  /** Optional. ERS vm name */
  ersVm?: string;
  /** Required. machine type */
  machineType?: string;
  /** ASCS service account - let custoemrs bring their own SA for ASCS */
  ascsServiceAccount?: string;
  /** Required. ascs_machine_type */
  ascsMachineType?: string;
  /** Optional. instance id for ascs */
  ascsInstanceId?: string;
  /** Required. secret_manager_secret */
  secretManagerSecret?: string;
  /** Optional. instance id for app */
  appInstanceId?: string;
  /** Optional. instance id for ers */
  ersInstanceId?: string;
  /** Required. vms_multiplier */
  vmsMultiplier?: number;
  /** Required. image for ascs server */
  ascsImage?: string;
}

export const AppDetails: Schema.Schema<AppDetails> = Schema.suspend(() => Schema.Struct({
  appVmNames: Schema.optional(Schema.Array(Schema.String)),
  sid: Schema.optional(Schema.String),
  sharedStorage: Schema.optional(Schema.String),
  appServiceAccount: Schema.optional(Schema.String),
  ascsVm: Schema.optional(Schema.String),
  image: Schema.optional(Schema.String),
  ersVm: Schema.optional(Schema.String),
  machineType: Schema.optional(Schema.String),
  ascsServiceAccount: Schema.optional(Schema.String),
  ascsMachineType: Schema.optional(Schema.String),
  ascsInstanceId: Schema.optional(Schema.String),
  secretManagerSecret: Schema.optional(Schema.String),
  appInstanceId: Schema.optional(Schema.String),
  ersInstanceId: Schema.optional(Schema.String),
  vmsMultiplier: Schema.optional(Schema.Number),
  ascsImage: Schema.optional(Schema.String),
})).annotate({ identifier: "AppDetails" }) as any as Schema.Schema<AppDetails>;

export interface OpenShiftValidation {
  /** Required. The validation details of the OpenShift cluster in JSON format. */
  validationDetails?: Record<string, unknown>;
  /** Required. The OpenShift cluster ID (e.g. 8371bb05-7cac-4d38-82c0-0f58c4f6f936). */
  clusterId?: string;
}

export const OpenShiftValidation: Schema.Schema<OpenShiftValidation> = Schema.suspend(() => Schema.Struct({
  validationDetails: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  clusterId: Schema.optional(Schema.String),
})).annotate({ identifier: "OpenShiftValidation" }) as any as Schema.Schema<OpenShiftValidation>;

export interface AgentStatusIAMPermission {
  /** Output only. Whether the permission is granted. */
  granted?: "UNSPECIFIED_STATE" | "SUCCESS_STATE" | "FAILURE_STATE" | "ERROR_STATE" | (string & {});
  /** Output only. The name of the permission. */
  name?: string;
}

export const AgentStatusIAMPermission: Schema.Schema<AgentStatusIAMPermission> = Schema.suspend(() => Schema.Struct({
  granted: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "AgentStatusIAMPermission" }) as any as Schema.Schema<AgentStatusIAMPermission>;

export interface SqlserverValidationDetails {
  /** Required. Collected data is in format. */
  fields?: Record<string, string>;
}

export const SqlserverValidationDetails: Schema.Schema<SqlserverValidationDetails> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "SqlserverValidationDetails" }) as any as Schema.Schema<SqlserverValidationDetails>;

export interface SqlserverValidationValidationDetail {
  /** Optional. The Sqlserver system that the validation data is from. */
  type?: "SQLSERVER_VALIDATION_TYPE_UNSPECIFIED" | "OS" | "DB_LOG_DISK_SEPARATION" | "DB_MAX_PARALLELISM" | "DB_CXPACKET_WAITS" | "DB_TRANSACTION_LOG_HANDLING" | "DB_VIRTUAL_LOG_FILE_COUNT" | "DB_BUFFER_POOL_EXTENSION" | "DB_MAX_SERVER_MEMORY" | "INSTANCE_METRICS" | "DB_INDEX_FRAGMENTATION" | "DB_TABLE_INDEX_COMPRESSION" | "DB_BACKUP_POLICY" | (string & {});
  /** Required. Details wraps map that represents collected data names and values. */
  details?: Array<SqlserverValidationDetails>;
}

export const SqlserverValidationValidationDetail: Schema.Schema<SqlserverValidationValidationDetail> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(SqlserverValidationDetails)),
})).annotate({ identifier: "SqlserverValidationValidationDetail" }) as any as Schema.Schema<SqlserverValidationValidationDetail>;

export interface SqlserverValidation {
  /** Optional. A list of SqlServer validation metrics data. */
  validationDetails?: Array<SqlserverValidationValidationDetail>;
  /** Optional. The agent version collected this data point */
  agentVersion?: string;
  /** Required. The project_id of the cloud project that the Insight data comes from. */
  projectId?: string;
  /** Required. The instance_name of the instance that the Insight data comes from. According to https://linter.aip.dev/122/name-suffix: field names should not use the _name suffix unless the field would be ambiguous without it. */
  instance?: string;
}

export const SqlserverValidation: Schema.Schema<SqlserverValidation> = Schema.suspend(() => Schema.Struct({
  validationDetails: Schema.optional(Schema.Array(SqlserverValidationValidationDetail)),
  agentVersion: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  instance: Schema.optional(Schema.String),
})).annotate({ identifier: "SqlserverValidation" }) as any as Schema.Schema<SqlserverValidation>;

export interface AgentStatusServiceStatus {
  /** Output only. Whether the service is fully functional (all checks passed). */
  fullyFunctional?: "UNSPECIFIED_STATE" | "SUCCESS_STATE" | "FAILURE_STATE" | "ERROR_STATE" | (string & {});
  /** Output only. The state of the service (enabled or disabled in the configuration). */
  state?: "UNSPECIFIED_STATE" | "SUCCESS_STATE" | "FAILURE_STATE" | "ERROR_STATE" | (string & {});
  /** Output only. The error message for the service if it is not fully functional. */
  errorMessage?: string;
  /** Output only. The permissions required for the service. */
  iamPermissions?: Array<AgentStatusIAMPermission>;
  /** Output only. The message to display when the service state is unspecified. */
  unspecifiedStateMessage?: string;
  /** Output only. The name of the service. */
  name?: string;
  /** Output only. The configuration values for the service. */
  configValues?: Array<AgentStatusConfigValue>;
}

export const AgentStatusServiceStatus: Schema.Schema<AgentStatusServiceStatus> = Schema.suspend(() => Schema.Struct({
  fullyFunctional: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  iamPermissions: Schema.optional(Schema.Array(AgentStatusIAMPermission)),
  unspecifiedStateMessage: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  configValues: Schema.optional(Schema.Array(AgentStatusConfigValue)),
})).annotate({ identifier: "AgentStatusServiceStatus" }) as any as Schema.Schema<AgentStatusServiceStatus>;

export interface AgentStatusReference {
  /** Output only. The name of the reference. */
  name?: string;
  /** Output only. The URL of the reference. */
  url?: string;
}

export const AgentStatusReference: Schema.Schema<AgentStatusReference> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "AgentStatusReference" }) as any as Schema.Schema<AgentStatusReference>;

export interface AgentStatus {
  /** Output only. The installed version of the agent on the host. */
  installedVersion?: string;
  /** Output only. The available version of the agent in artifact registry. */
  availableVersion?: string;
  /** Output only. The services (process metrics, host metrics, etc.). */
  services?: Array<AgentStatusServiceStatus>;
  /** Output only. Optional references to public documentation. */
  references?: Array<AgentStatusReference>;
  /** Output only. The kernel version of the system. */
  kernelVersion?: SapDiscoveryResourceInstancePropertiesKernelVersion;
  /** Output only. The error message for the agent configuration if invalid. */
  configurationErrorMessage?: string;
  /** Output only. The name of the agent. */
  agentName?: string;
  /** Output only. Whether the agent has full access to Cloud APIs. */
  cloudApiAccessFullScopesGranted?: "UNSPECIFIED_STATE" | "SUCCESS_STATE" | "FAILURE_STATE" | "ERROR_STATE" | (string & {});
  /** Output only. Whether the agent service is enabled in systemd. */
  systemdServiceEnabled?: "UNSPECIFIED_STATE" | "SUCCESS_STATE" | "FAILURE_STATE" | "ERROR_STATE" | (string & {});
  /** Output only. The URI of the instance. Format: projects//zones//instances/ */
  instanceUri?: string;
  /** Output only. Whether the agent service is running in systemd. */
  systemdServiceRunning?: "UNSPECIFIED_STATE" | "SUCCESS_STATE" | "FAILURE_STATE" | "ERROR_STATE" | (string & {});
  /** Output only. The path to the agent configuration file. */
  configurationFilePath?: string;
  /** Output only. Whether the agent configuration is valid. */
  configurationValid?: "UNSPECIFIED_STATE" | "SUCCESS_STATE" | "FAILURE_STATE" | "ERROR_STATE" | (string & {});
}

export const AgentStatus: Schema.Schema<AgentStatus> = Schema.suspend(() => Schema.Struct({
  installedVersion: Schema.optional(Schema.String),
  availableVersion: Schema.optional(Schema.String),
  services: Schema.optional(Schema.Array(AgentStatusServiceStatus)),
  references: Schema.optional(Schema.Array(AgentStatusReference)),
  kernelVersion: Schema.optional(SapDiscoveryResourceInstancePropertiesKernelVersion),
  configurationErrorMessage: Schema.optional(Schema.String),
  agentName: Schema.optional(Schema.String),
  cloudApiAccessFullScopesGranted: Schema.optional(Schema.String),
  systemdServiceEnabled: Schema.optional(Schema.String),
  instanceUri: Schema.optional(Schema.String),
  systemdServiceRunning: Schema.optional(Schema.String),
  configurationFilePath: Schema.optional(Schema.String),
  configurationValid: Schema.optional(Schema.String),
})).annotate({ identifier: "AgentStatus" }) as any as Schema.Schema<AgentStatus>;

export interface SapValidationValidationDetail {
  /** Optional. The pairs of metrics data: field name & field value. */
  details?: Record<string, string>;
  /** Optional. The SAP system that the validation data is from. */
  sapValidationType?: "SAP_VALIDATION_TYPE_UNSPECIFIED" | "SYSTEM" | "COROSYNC" | "PACEMAKER" | "HANA" | "NETWEAVER" | "HANA_SECURITY" | "CUSTOM" | (string & {});
  /** Optional. Was there a SAP system detected for this validation type. */
  isPresent?: boolean;
}

export const SapValidationValidationDetail: Schema.Schema<SapValidationValidationDetail> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  sapValidationType: Schema.optional(Schema.String),
  isPresent: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SapValidationValidationDetail" }) as any as Schema.Schema<SapValidationValidationDetail>;

export interface SapValidation {
  /** Optional. A list of SAP validation metrics data. */
  validationDetails?: Array<SapValidationValidationDetail>;
  /** Optional. The zone of the instance that the Insight data comes from. */
  zone?: string;
  /** Required. The project_id of the cloud project that the Insight data comes from. */
  projectId?: string;
}

export const SapValidation: Schema.Schema<SapValidation> = Schema.suspend(() => Schema.Struct({
  validationDetails: Schema.optional(Schema.Array(SapValidationValidationDetail)),
  zone: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "SapValidation" }) as any as Schema.Schema<SapValidation>;

export interface TorsoValidation {
  /** Required. workload_type specifies the type of torso workload. */
  workloadType?: "WORKLOAD_TYPE_UNSPECIFIED" | "MYSQL" | "ORACLE" | "REDIS" | (string & {});
  /** Required. project_id lists the human readable cloud project that the data comes from. */
  projectId?: string;
  /** Optional. instance_name lists the human readable name of the instance that the data comes from. */
  instanceName?: string;
  /** Required. validation_details contains the pairs of validation data: field name & field value. */
  validationDetails?: Record<string, string>;
  /** Required. agent_version lists the version of the agent that collected this data. */
  agentVersion?: string;
}

export const TorsoValidation: Schema.Schema<TorsoValidation> = Schema.suspend(() => Schema.Struct({
  workloadType: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  instanceName: Schema.optional(Schema.String),
  validationDetails: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  agentVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "TorsoValidation" }) as any as Schema.Schema<TorsoValidation>;

export interface SapDiscoveryComponentApplicationProperties {
  /** Optional. Resource URI of the recognized ASCS host of the application. */
  ascsUri?: string;
  /** Optional. Instance number of the ASCS instance. */
  ascsInstanceNumber?: string;
  /** Optional. Instance number of the ERS instance. */
  ersInstanceNumber?: string;
  /** Required. Type of the application. Netweaver, etc. */
  applicationType?: "APPLICATION_TYPE_UNSPECIFIED" | "NETWEAVER" | "NETWEAVER_ABAP" | "NETWEAVER_JAVA" | (string & {});
  /** Optional. Resource URI of the recognized shared NFS of the application. May be empty if the application server has only a single node. */
  nfsUri?: string;
  /** Optional. Instance number of the SAP application instance. */
  appInstanceNumber?: string;
  /** Optional. Deprecated: ApplicationType now tells you whether this is ABAP or Java. */
  abap?: boolean;
  /** Optional. Kernel version for Netweaver running in the system. */
  kernelVersion?: string;
}

export const SapDiscoveryComponentApplicationProperties: Schema.Schema<SapDiscoveryComponentApplicationProperties> = Schema.suspend(() => Schema.Struct({
  ascsUri: Schema.optional(Schema.String),
  ascsInstanceNumber: Schema.optional(Schema.String),
  ersInstanceNumber: Schema.optional(Schema.String),
  applicationType: Schema.optional(Schema.String),
  nfsUri: Schema.optional(Schema.String),
  appInstanceNumber: Schema.optional(Schema.String),
  abap: Schema.optional(Schema.Boolean),
  kernelVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "SapDiscoveryComponentApplicationProperties" }) as any as Schema.Schema<SapDiscoveryComponentApplicationProperties>;

export interface SapDiscoveryComponentDatabaseProperties {
  /** Optional. URI of the recognized shared NFS of the database. May be empty if the database has only a single node. */
  sharedNfsUri?: string;
  /** Optional. The version of the database software running in the system. */
  databaseVersion?: string;
  /** Required. URI of the recognized primary instance of the database. */
  primaryInstanceUri?: string;
  /** Required. Type of the database. HANA, DB2, etc. */
  databaseType?: "DATABASE_TYPE_UNSPECIFIED" | "HANA" | "MAX_DB" | "DB2" | "ORACLE" | "SQLSERVER" | "ASE" | (string & {});
  /** Optional. SID of the system database. */
  databaseSid?: string;
  /** Optional. Instance number of the SAP instance. */
  instanceNumber?: string;
  /** Optional. Landscape ID from the HANA nameserver. */
  landscapeId?: string;
}

export const SapDiscoveryComponentDatabaseProperties: Schema.Schema<SapDiscoveryComponentDatabaseProperties> = Schema.suspend(() => Schema.Struct({
  sharedNfsUri: Schema.optional(Schema.String),
  databaseVersion: Schema.optional(Schema.String),
  primaryInstanceUri: Schema.optional(Schema.String),
  databaseType: Schema.optional(Schema.String),
  databaseSid: Schema.optional(Schema.String),
  instanceNumber: Schema.optional(Schema.String),
  landscapeId: Schema.optional(Schema.String),
})).annotate({ identifier: "SapDiscoveryComponentDatabaseProperties" }) as any as Schema.Schema<SapDiscoveryComponentDatabaseProperties>;

export interface SapDiscoveryResource {
  /** Required. Unix timestamp of when this resource last had its discovery data updated. */
  updateTime?: string;
  /** Required. ComputeInstance, ComputeDisk, VPC, Bare Metal server, etc. */
  resourceKind?: "RESOURCE_KIND_UNSPECIFIED" | "RESOURCE_KIND_INSTANCE" | "RESOURCE_KIND_DISK" | "RESOURCE_KIND_ADDRESS" | "RESOURCE_KIND_FILESTORE" | "RESOURCE_KIND_HEALTH_CHECK" | "RESOURCE_KIND_FORWARDING_RULE" | "RESOURCE_KIND_BACKEND_SERVICE" | "RESOURCE_KIND_SUBNETWORK" | "RESOURCE_KIND_NETWORK" | "RESOURCE_KIND_PUBLIC_ADDRESS" | "RESOURCE_KIND_INSTANCE_GROUP" | (string & {});
  /** Optional. A set of properties only applying to instance type resources. */
  instanceProperties?: SapDiscoveryResourceInstanceProperties;
  /** Required. URI of the resource, includes project, location, and name. */
  resourceUri?: string;
  /** Optional. A list of resource URIs related to this resource. */
  relatedResources?: Array<string>;
  /** Required. The type of this resource. */
  resourceType?: "RESOURCE_TYPE_UNSPECIFIED" | "RESOURCE_TYPE_COMPUTE" | "RESOURCE_TYPE_STORAGE" | "RESOURCE_TYPE_NETWORK" | (string & {});
}

export const SapDiscoveryResource: Schema.Schema<SapDiscoveryResource> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  resourceKind: Schema.optional(Schema.String),
  instanceProperties: Schema.optional(SapDiscoveryResourceInstanceProperties),
  resourceUri: Schema.optional(Schema.String),
  relatedResources: Schema.optional(Schema.Array(Schema.String)),
  resourceType: Schema.optional(Schema.String),
})).annotate({ identifier: "SapDiscoveryResource" }) as any as Schema.Schema<SapDiscoveryResource>;

export interface SapDiscoveryComponentReplicationSite {
  /** Optional. The name of the source site from which this one replicates. */
  sourceSite?: string;
  /** Optional. The system component for the site. */
  component?: SapDiscoveryComponent;
}

export const SapDiscoveryComponentReplicationSite: Schema.Schema<SapDiscoveryComponentReplicationSite> = Schema.suspend(() => Schema.Struct({
  sourceSite: Schema.optional(Schema.String),
  component: Schema.optional(SapDiscoveryComponent),
})).annotate({ identifier: "SapDiscoveryComponentReplicationSite" }) as any as Schema.Schema<SapDiscoveryComponentReplicationSite>;

export interface SapDiscoveryComponent {
  /** Optional. The component is a SAP application. */
  applicationProperties?: SapDiscoveryComponentApplicationProperties;
  /** Optional. The SAP identifier, used by the SAP software and helps differentiate systems for customers. */
  sid?: string;
  /** Optional. The component is a SAP database. */
  databaseProperties?: SapDiscoveryComponentDatabaseProperties;
  /** Optional. A list of host URIs that are part of the HA configuration if present. An empty list indicates the component is not configured for HA. */
  haHosts?: Array<string>;
  /** Optional. The region this component's resources are primarily located in. */
  region?: string;
  /** Required. Pantheon Project in which the resources reside. */
  hostProject?: string;
  /** Optional. The resources in a component. */
  resources?: Array<SapDiscoveryResource>;
  /** Optional. A list of replication sites used in Disaster Recovery (DR) configurations. */
  replicationSites?: Array<SapDiscoveryComponentReplicationSite>;
  /** Optional. The detected topology of the component. */
  topologyType?: "TOPOLOGY_TYPE_UNSPECIFIED" | "TOPOLOGY_SCALE_UP" | "TOPOLOGY_SCALE_OUT" | (string & {});
}

export const SapDiscoveryComponent: Schema.Schema<SapDiscoveryComponent> = Schema.suspend(() => Schema.Struct({
  applicationProperties: Schema.optional(SapDiscoveryComponentApplicationProperties),
  sid: Schema.optional(Schema.String),
  databaseProperties: Schema.optional(SapDiscoveryComponentDatabaseProperties),
  haHosts: Schema.optional(Schema.Array(Schema.String)),
  region: Schema.optional(Schema.String),
  hostProject: Schema.optional(Schema.String),
  resources: Schema.optional(Schema.Array(SapDiscoveryResource)),
  replicationSites: Schema.optional(Schema.Array(SapDiscoveryComponentReplicationSite)),
  topologyType: Schema.optional(Schema.String),
})).annotate({ identifier: "SapDiscoveryComponent" }) as any as Schema.Schema<SapDiscoveryComponent>;

export interface SapDiscoveryMetadata {
  /** Optional. This SAP product name */
  sapProduct?: string;
  /** Optional. Should be "prod", "QA", "dev", "staging", etc. */
  environmentType?: string;
  /** Optional. Customer defined, something like "E-commerce pre prod" */
  definedSystem?: string;
  /** Optional. Customer region string for customer's use. Does not represent GCP region. */
  customerRegion?: string;
}

export const SapDiscoveryMetadata: Schema.Schema<SapDiscoveryMetadata> = Schema.suspend(() => Schema.Struct({
  sapProduct: Schema.optional(Schema.String),
  environmentType: Schema.optional(Schema.String),
  definedSystem: Schema.optional(Schema.String),
  customerRegion: Schema.optional(Schema.String),
})).annotate({ identifier: "SapDiscoveryMetadata" }) as any as Schema.Schema<SapDiscoveryMetadata>;

export interface SapDiscovery {
  /** Optional. An SAP system may run without an application layer. */
  applicationLayer?: SapDiscoveryComponent;
  /** Optional. The properties of the workload. */
  workloadProperties?: SapDiscoveryWorkloadProperties;
  /** Required. Unix timestamp this system has been updated last. */
  updateTime?: string;
  /** Optional. The GCP project number that this SapSystem belongs to. */
  projectNumber?: string;
  /** Required. An SAP System must have a database. */
  databaseLayer?: SapDiscoveryComponent;
  /** Output only. A combination of database SID, database instance URI and tenant DB name to make a unique identifier per-system. */
  systemId?: string;
  /** Optional. The metadata for SAP system discovery data. */
  metadata?: SapDiscoveryMetadata;
  /** Optional. Whether to use DR reconciliation or not. */
  useDrReconciliation?: boolean;
}

export const SapDiscovery: Schema.Schema<SapDiscovery> = Schema.suspend(() => Schema.Struct({
  applicationLayer: Schema.optional(SapDiscoveryComponent),
  workloadProperties: Schema.optional(SapDiscoveryWorkloadProperties),
  updateTime: Schema.optional(Schema.String),
  projectNumber: Schema.optional(Schema.String),
  databaseLayer: Schema.optional(SapDiscoveryComponent),
  systemId: Schema.optional(Schema.String),
  metadata: Schema.optional(SapDiscoveryMetadata),
  useDrReconciliation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SapDiscovery" }) as any as Schema.Schema<SapDiscovery>;

export interface Insight {
  /** The insights data for the sqlserver workload validation. */
  sqlserverValidation?: SqlserverValidation;
  /** The insights data for the agent status. */
  agentStatus?: AgentStatus;
  /** The insights data for the SAP workload validation. */
  sapValidation?: SapValidation;
  /** The insights data for workload validation of torso workloads. */
  torsoValidation?: TorsoValidation;
  /** The insights data for the OpenShift workload validation. */
  openShiftValidation?: OpenShiftValidation;
  /** Optional. The instance id where the insight is generated from */
  instanceId?: string;
  /** The insights data for SAP system discovery. This is a copy of SAP System proto and should get updated whenever that one changes. */
  sapDiscovery?: SapDiscovery;
  /** Output only. [Output only] Create time stamp */
  sentTime?: string;
}

export const Insight: Schema.Schema<Insight> = Schema.suspend(() => Schema.Struct({
  sqlserverValidation: Schema.optional(SqlserverValidation),
  agentStatus: Schema.optional(AgentStatus),
  sapValidation: Schema.optional(SapValidation),
  torsoValidation: Schema.optional(TorsoValidation),
  openShiftValidation: Schema.optional(OpenShiftValidation),
  instanceId: Schema.optional(Schema.String),
  sapDiscovery: Schema.optional(SapDiscovery),
  sentTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Insight" }) as any as Schema.Schema<Insight>;

export interface WriteInsightRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. The agent version collected this data point. */
  agentVersion?: string;
  /** Required. The metrics data details. */
  insight?: Insight;
}

export const WriteInsightRequest: Schema.Schema<WriteInsightRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  agentVersion: Schema.optional(Schema.String),
  insight: Schema.optional(Insight),
})).annotate({ identifier: "WriteInsightRequest" }) as any as Schema.Schema<WriteInsightRequest>;

export interface Pacemaker {
  /** Required. sql pacemaker secret name */
  sqlPacemakerSecret?: string;
  /** Required. pacemaker cluster username */
  pacemakerClusterUsername?: string;
  /** Required. pacemaker cluster name */
  pacemakerCluster?: string;
  /** Required. sql pacemaker username */
  sqlPacemakerUsername?: string;
  /** Required. pacemaker cluster secret name */
  pacemakerClusterSecret?: string;
  /** Required. bucket location for node certificates */
  bucketNameNodeCertificates?: string;
}

export const Pacemaker: Schema.Schema<Pacemaker> = Schema.suspend(() => Schema.Struct({
  sqlPacemakerSecret: Schema.optional(Schema.String),
  pacemakerClusterUsername: Schema.optional(Schema.String),
  pacemakerCluster: Schema.optional(Schema.String),
  sqlPacemakerUsername: Schema.optional(Schema.String),
  pacemakerClusterSecret: Schema.optional(Schema.String),
  bucketNameNodeCertificates: Schema.optional(Schema.String),
})).annotate({ identifier: "Pacemaker" }) as any as Schema.Schema<Pacemaker>;

export interface Database {
  /** Optional. the type of a primary sole-tenant node/node group e.g. compute.googleapis.com/node-name */
  soleTenantNodeType?: string;
  /** Required. whether to have TempDB on local SSD */
  tempdbOnSsd?: boolean;
  /** Required. whether simultaneous multithreading is enabled or not */
  smt?: boolean;
  /** Optional. the type of a secondary-sole-tenant node/node group e.g. compute.googleapis.com/node-name */
  secondarySoleTenantNodeType?: string;
  /** Optional. only useful for Linux High Availability setup */
  floatingIpAddress?: string;
  /** Required. disk_type */
  diskType?: string;
  /** Optional. the name of a primary sole-tenant node/node group */
  soleTenantNode?: string;
  /** Required. secret_manager_secret */
  secretManagerSecret?: string;
  /** Required. SHARED or SOLE_TENANT */
  tenancyModel?: "TENANCY_MODEL_UNSPECIFIED" | "SHARED" | "SOLE_TENANT" | (string & {});
  /** Required. machine type */
  machineType?: string;
  /** Optional. the name of a secondary-sole-tenant node/node group */
  secondarySoleTenantNode?: string;
}

export const Database: Schema.Schema<Database> = Schema.suspend(() => Schema.Struct({
  soleTenantNodeType: Schema.optional(Schema.String),
  tempdbOnSsd: Schema.optional(Schema.Boolean),
  smt: Schema.optional(Schema.Boolean),
  secondarySoleTenantNodeType: Schema.optional(Schema.String),
  floatingIpAddress: Schema.optional(Schema.String),
  diskType: Schema.optional(Schema.String),
  soleTenantNode: Schema.optional(Schema.String),
  secretManagerSecret: Schema.optional(Schema.String),
  tenancyModel: Schema.optional(Schema.String),
  machineType: Schema.optional(Schema.String),
  secondarySoleTenantNode: Schema.optional(Schema.String),
})).annotate({ identifier: "Database" }) as any as Schema.Schema<Database>;

export interface ActiveDirectory {
  /** Required. active directory type */
  type?: "ACTIVE_DIRECTORY_TYPE_UNSPECIFIED" | "GCP_MANAGED" | "SELF_MANAGED" | (string & {});
  /** Optional. human readable form of a domain such as “google.com”. */
  domain?: string;
  /** Optional. domain username */
  domainUsername?: string;
  /** Optional. DNS IP address */
  dnsAddress?: string;
  /** Required. secret_manager_secret */
  secretManagerSecret?: string;
}

export const ActiveDirectory: Schema.Schema<ActiveDirectory> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
  domainUsername: Schema.optional(Schema.String),
  dnsAddress: Schema.optional(Schema.String),
  secretManagerSecret: Schema.optional(Schema.String),
})).annotate({ identifier: "ActiveDirectory" }) as any as Schema.Schema<ActiveDirectory>;

export interface SqlLocationDetails {
  /** Required. subnetwork name */
  subnetwork?: string;
  /** Optional. secondary zone can't be same as primary_zone and is only for High Availability deployment mode */
  secondaryZone?: string;
  /** Required. primary zone */
  primaryZone?: string;
  /** Required. region name */
  region?: string;
  /** Required. Internet Access */
  internetAccess?: "INTERNET_ACCESS_UNSPECIFIED" | "ALLOW_EXTERNAL_IP" | "CONFIGURE_NAT" | (string & {});
  /** Optional. teriary zone can't be same as primary_zone and secondary zone, and it is only for High Availability deployment mode */
  tertiaryZone?: string;
  /** Required. the project that infrastructure deployed, currently only supports the same project where the deployment resource exists. */
  gcpProjectId?: string;
  /** Required. network name */
  network?: string;
  /** Optional. create a new DNS Zone when the field is empty, Only show for `Using an existing DNS` List of existing DNS Zones tf variable name: existing_dns_zone_name */
  dnsZone?: string;
}

export const SqlLocationDetails: Schema.Schema<SqlLocationDetails> = Schema.suspend(() => Schema.Struct({
  subnetwork: Schema.optional(Schema.String),
  secondaryZone: Schema.optional(Schema.String),
  primaryZone: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  internetAccess: Schema.optional(Schema.String),
  tertiaryZone: Schema.optional(Schema.String),
  gcpProjectId: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  dnsZone: Schema.optional(Schema.String),
})).annotate({ identifier: "SqlLocationDetails" }) as any as Schema.Schema<SqlLocationDetails>;

export interface SqlServerWorkload {
  /** Optional. pacemaker configuration, only applicable for Linux HA deployments */
  pacemaker?: Pacemaker;
  /** Required. database details */
  database?: Database;
  /** Compute engine service account - let customers bring their own SA for Compute engine */
  computeEngineServiceAccount?: string;
  /** Optional. 2017 or 2019 or 2022 */
  sqlServerVersion?: "SQL_SERVER_VERSION_TYPE_UNSPECIFIED" | "SQL_SERVER_VERSION_TYPE_2017" | "SQL_SERVER_VERSION_TYPE_2019" | "SQL_SERVER_VERSION_TYPE_2022" | (string & {});
  /** Required. should be unique in the project */
  vmPrefix?: string;
  /** Required. name of the media storing SQL server installation files */
  mediaBucket?: string;
  /** Optional. SQL Server Edition type, only applicable when Operating System is Linux */
  sqlServerEdition?: "SQL_SERVER_EDITION_TYPE_UNSPECIFIED" | "SQL_SERVER_EDITION_TYPE_DEVELOPER" | "SQL_SERVER_EDITION_TYPE_ENTERPRISE" | "SQL_SERVER_EDITION_TYPE_STANDARD" | "SQL_SERVER_EDITION_TYPE_WEB" | (string & {});
  /** Required. active directory details */
  activeDirectory?: ActiveDirectory;
  /** Required. deployment environment */
  environmentType?: "ENVIRONMENT_TYPE_UNSPECIFIED" | "NON_PRODUCTION" | "PRODUCTION" | (string & {});
  /** Required. the image of the operating system */
  osImage?: string;
  /** Required. type of the operating system the SQL server is going to run on top of */
  operatingSystemType?: "OPERATING_SYSTEM_TYPE_UNSPECIFIED" | "WINDOWS" | "UBUNTU" | "RED_HAT_ENTERPRISE_LINUX" | "SUSE" | (string & {});
  /** Required. HIGH_AVAILABILITY or SINGLE_INSTANCE */
  deploymentModel?: "DEPLOYMENT_MODEL_UNSPECIFIED" | "HIGH_AVAILABILITY" | "SINGLE_INSTANCE" | (string & {});
  /** Required. SQL licensing type */
  isSqlPayg?: boolean;
  /** Optional. SHARED_DISK or S2D */
  fciType?: "FCI_TYPE_UNSPECIFIED" | "SHARED_DISK" | "S2D" | (string & {});
  /** Optional. AOAG or FCI, it is only needed for High Availability deployment mode */
  haType?: "HA_TYPE_UNSPECIFIED" | "AOAG" | "FCI" | (string & {});
  /** Required. location details */
  location?: SqlLocationDetails;
  /** Optional. OS image type, it's used to create boot disks for VM instances When either Windows licensing type or SQL licensing type is BYOL, this option is disabled and default to custom image */
  osImageType?: "OS_IMAGE_TYPE_UNSPECIFIED" | "PUBLIC_IMAGE" | "CUSTOM_IMAGE" | (string & {});
}

export const SqlServerWorkload: Schema.Schema<SqlServerWorkload> = Schema.suspend(() => Schema.Struct({
  pacemaker: Schema.optional(Pacemaker),
  database: Schema.optional(Database),
  computeEngineServiceAccount: Schema.optional(Schema.String),
  sqlServerVersion: Schema.optional(Schema.String),
  vmPrefix: Schema.optional(Schema.String),
  mediaBucket: Schema.optional(Schema.String),
  sqlServerEdition: Schema.optional(Schema.String),
  activeDirectory: Schema.optional(ActiveDirectory),
  environmentType: Schema.optional(Schema.String),
  osImage: Schema.optional(Schema.String),
  operatingSystemType: Schema.optional(Schema.String),
  deploymentModel: Schema.optional(Schema.String),
  isSqlPayg: Schema.optional(Schema.Boolean),
  fciType: Schema.optional(Schema.String),
  haType: Schema.optional(Schema.String),
  location: Schema.optional(SqlLocationDetails),
  osImageType: Schema.optional(Schema.String),
})).annotate({ identifier: "SqlServerWorkload" }) as any as Schema.Schema<SqlServerWorkload>;

export interface BigQueryDestination {
  /** Optional. determine if results will be saved in a new table */
  createNewResultsTable?: boolean;
  /** Optional. destination dataset to save evaluation results */
  destinationDataset?: string;
}

export const BigQueryDestination: Schema.Schema<BigQueryDestination> = Schema.suspend(() => Schema.Struct({
  createNewResultsTable: Schema.optional(Schema.Boolean),
  destinationDataset: Schema.optional(Schema.String),
})).annotate({ identifier: "BigQueryDestination" }) as any as Schema.Schema<BigQueryDestination>;

export interface GceInstanceFilter {
  /** Service account of compute engine */
  serviceAccounts?: Array<string>;
}

export const GceInstanceFilter: Schema.Schema<GceInstanceFilter> = Schema.suspend(() => Schema.Struct({
  serviceAccounts: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GceInstanceFilter" }) as any as Schema.Schema<GceInstanceFilter>;

export interface ResourceFilter {
  /** Filter compute engine resource */
  gceInstanceFilter?: GceInstanceFilter;
  /** The id pattern for filter resource */
  resourceIdPatterns?: Array<string>;
  /** The label used for filter resource */
  inclusionLabels?: Record<string, string>;
  /** The scopes of evaluation resource */
  scopes?: Array<string>;
}

export const ResourceFilter: Schema.Schema<ResourceFilter> = Schema.suspend(() => Schema.Struct({
  gceInstanceFilter: Schema.optional(GceInstanceFilter),
  resourceIdPatterns: Schema.optional(Schema.Array(Schema.String)),
  inclusionLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  scopes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ResourceFilter" }) as any as Schema.Schema<ResourceFilter>;

export interface Evaluation {
  /** Optional. BigQuery destination */
  bigQueryDestination?: BigQueryDestination;
  /** crontab format schedule for scheduled evaluation, currently only support the following schedule: "0 * /1 * * *", "0 * /6 * * *", "0 * /12 * * *", "0 0 * /1 * *", "0 0 * /7 * *", */
  schedule?: string;
  /** the name of the rule */
  ruleNames?: Array<string>;
  /** Labels as key value pairs */
  labels?: Record<string, string>;
  /** Output only. [Output only] Update time stamp */
  updateTime?: string;
  /** The Cloud Storage bucket name for custom rules. */
  customRulesBucket?: string;
  /** Output only. [Output only] The updated rule ids if exist. */
  resourceStatus?: ResourceStatus;
  /** Description of the Evaluation */
  description?: string;
  /** Evaluation type */
  evaluationType?: "EVALUATION_TYPE_UNSPECIFIED" | "SAP" | "SQL_SERVER" | "OTHER" | "SCC_IAC" | (string & {});
  /** Output only. [Output only] Create time stamp */
  createTime?: string;
  /** Optional. Immutable. Customer-managed encryption key name, in the format projects/* /locations/* /keyRings/* /cryptoKeys/*. */
  kmsKey?: string;
  /** name of resource names have the form 'projects/{project_id}/locations/{location_id}/evaluations/{evaluation_id}' */
  name?: string;
  /** annotations as key value pairs */
  resourceFilter?: ResourceFilter;
  /** Output only. [Output only] The updated rule ids if exist. */
  ruleVersions?: Array<string>;
}

export const Evaluation: Schema.Schema<Evaluation> = Schema.suspend(() => Schema.Struct({
  bigQueryDestination: Schema.optional(BigQueryDestination),
  schedule: Schema.optional(Schema.String),
  ruleNames: Schema.optional(Schema.Array(Schema.String)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  updateTime: Schema.optional(Schema.String),
  customRulesBucket: Schema.optional(Schema.String),
  resourceStatus: Schema.optional(ResourceStatus),
  description: Schema.optional(Schema.String),
  evaluationType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  kmsKey: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  resourceFilter: Schema.optional(ResourceFilter),
  ruleVersions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Evaluation" }) as any as Schema.Schema<Evaluation>;

export interface ListEvaluationsResponse {
  /** The list of Evaluation */
  evaluations?: Array<Evaluation>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const ListEvaluationsResponse: Schema.Schema<ListEvaluationsResponse> = Schema.suspend(() => Schema.Struct({
  evaluations: Schema.optional(Schema.Array(Evaluation)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListEvaluationsResponse" }) as any as Schema.Schema<ListEvaluationsResponse>;

export interface LocationDetails {
  /** Optional. dns_zone_name_suffix */
  dnsZoneNameSuffix?: string;
  /** Optional. network project */
  networkProject?: string;
  /** Required. zone1_name */
  zone1Name?: string;
  /** Required. vpc_name */
  vpcName?: string;
  /** Required. region_name */
  regionName?: string;
  /** Optional. zone2_name */
  zone2Name?: string;
  /** Optional. network tags */
  customTags?: Array<string>;
  /** Optional. when user skip DNS configuration from UI, deployment_dns_enabled=false otherwise deployment_dns_enabled=true */
  deploymentDnsEnabled?: boolean;
  /** Optional. create firewall, if true, create firewall for the deployment. This field provides an option to not always create firewall for the deployment. */
  createCommsFirewall?: boolean;
  /** Optional. dns zone name */
  dnsZone?: string;
  /** Required. subnet_name */
  subnetName?: string;
  internetAccess?: "INTERNETACCESS_UNSPECIFIED" | "ALLOW_EXTERNAL_IP" | "CONFIGURE_NAT" | (string & {});
}

export const LocationDetails: Schema.Schema<LocationDetails> = Schema.suspend(() => Schema.Struct({
  dnsZoneNameSuffix: Schema.optional(Schema.String),
  networkProject: Schema.optional(Schema.String),
  zone1Name: Schema.optional(Schema.String),
  vpcName: Schema.optional(Schema.String),
  regionName: Schema.optional(Schema.String),
  zone2Name: Schema.optional(Schema.String),
  customTags: Schema.optional(Schema.Array(Schema.String)),
  deploymentDnsEnabled: Schema.optional(Schema.Boolean),
  createCommsFirewall: Schema.optional(Schema.Boolean),
  dnsZone: Schema.optional(Schema.String),
  subnetName: Schema.optional(Schema.String),
  internetAccess: Schema.optional(Schema.String),
})).annotate({ identifier: "LocationDetails" }) as any as Schema.Schema<LocationDetails>;

export interface SapSystemS4Config {
  allowStoppingForUpdate?: boolean;
  /** Required. media_bucket_name */
  mediaBucketName?: string;
  /** Required. deployment environment */
  environmentType?: "ENVIRONMENT_TYPE_UNSPECIFIED" | "NON_PRODUCTION" | "PRODUCTION" | (string & {});
  /** Ansible runner service account - let custoemrs bring their own SA for Ansible runner */
  ansibleRunnerServiceAccount?: string;
  /** Required. sap hana version */
  version?: "VERSION_UNSPECIFIED" | "S4_HANA_2021" | "S4_HANA_2022" | "S4_HANA_2023" | (string & {});
  /** Required. two model non-HA and HA supported */
  deploymentModel?: "DEPLOYMENT_MODEL_UNSPECIFIED" | "DISTRIBUTED" | "DISTRIBUTED_HA" | (string & {});
  /** database details */
  location?: LocationDetails;
  /** vm_prefix */
  vmPrefix?: string;
  /** database details */
  database?: DatabaseDetails;
  /** instance details */
  app?: AppDetails;
  /** the project that infrastructure deployed, current only support the same project where the deployment resource exist. */
  gcpProjectId?: string;
  /** Optional. sap_boot_disk_image */
  sapBootDiskImage?: string;
  /** Required. support scale up and scale out */
  scalingMethod?: "SCALE_METHOD_UNSPECIFIED" | "SCALE_UP" | "SCALE_OUT" | (string & {});
}

export const SapSystemS4Config: Schema.Schema<SapSystemS4Config> = Schema.suspend(() => Schema.Struct({
  allowStoppingForUpdate: Schema.optional(Schema.Boolean),
  mediaBucketName: Schema.optional(Schema.String),
  environmentType: Schema.optional(Schema.String),
  ansibleRunnerServiceAccount: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  deploymentModel: Schema.optional(Schema.String),
  location: Schema.optional(LocationDetails),
  vmPrefix: Schema.optional(Schema.String),
  database: Schema.optional(DatabaseDetails),
  app: Schema.optional(AppDetails),
  gcpProjectId: Schema.optional(Schema.String),
  sapBootDiskImage: Schema.optional(Schema.String),
  scalingMethod: Schema.optional(Schema.String),
})).annotate({ identifier: "SapSystemS4Config" }) as any as Schema.Schema<SapSystemS4Config>;

export interface OperationMetadata {
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  verb: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  endTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface ListExecutionsResponse {
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** The list of Execution */
  executions?: Array<Execution>;
}

export const ListExecutionsResponse: Schema.Schema<ListExecutionsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  executions: Schema.optional(Schema.Array(Execution)),
})).annotate({ identifier: "ListExecutionsResponse" }) as any as Schema.Schema<ListExecutionsResponse>;

export interface InvalidRulesWrapper {
  /** The invalid rules that failed to be validated. */
  invalidRules?: Array<InvalidRule>;
}

export const InvalidRulesWrapper: Schema.Schema<InvalidRulesWrapper> = Schema.suspend(() => Schema.Struct({
  invalidRules: Schema.optional(Schema.Array(InvalidRule)),
})).annotate({ identifier: "InvalidRulesWrapper" }) as any as Schema.Schema<InvalidRulesWrapper>;

export interface TerraformVariable {
  /** Optional. Input variable value. */
  inputValue?: unknown;
}

export const TerraformVariable: Schema.Schema<TerraformVariable> = Schema.suspend(() => Schema.Struct({
  inputValue: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "TerraformVariable" }) as any as Schema.Schema<TerraformVariable>;

export interface Deployment {
  /** Output only. [Output only] Update time stamp */
  updateTime?: string;
  /** Output only. [Output only] Create time stamp */
  createTime?: string;
  /** Optional. Workload type of the deployment */
  workloadType?: "WORKLOAD_TYPE_UNSPECIFIED" | "SAP_S4" | "SQL_SERVER" | "ORACLE" | (string & {});
  /** Optional. The user-specified Cloud Build worker pool resource in which the Cloud Build job will execute. Format: `projects/{project}/locations/{location}/workerPools/{workerPoolId}`. If this field is unspecified, the default Cloud Build worker pool will be used. */
  workerPool?: string;
  /** The name of deployment resource. The format will be 'projects/{project_id}/locations/{location_id}/deployments/{deployment_id}' */
  name?: string;
  /** Description of the Deployment */
  description?: string;
  /** Output only. Current state of the deployment. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "UPDATING" | "DELETING" | "FAILED" | (string & {});
  /** MS SQL workload input */
  sqlServerWorkload?: SqlServerWorkload;
  /** Optional. terraform_variables represents all the Terraform variables for the deployment workload. The key is the name of the Terraform variable, and the value is the TerraformVariable. For example: { "project_id": { "input_value": { "string_value": "my-project-id" } }, "zone": { "input_value": { "string_value": "us-central1-a" } } } */
  terraformVariables?: Record<string, TerraformVariable>;
  /** SAP system workload input */
  sapSystemS4Config?: SapSystemS4Config;
  /** User-specified Service Account (SA) credentials to be used for cloud build Format: `projects/{projectID}/serviceAccounts/{serviceAccount}` The default Cloud Build SA will be used initially if this field is not set during deployment creation */
  serviceAccount?: string;
}

export const Deployment: Schema.Schema<Deployment> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  workloadType: Schema.optional(Schema.String),
  workerPool: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  sqlServerWorkload: Schema.optional(SqlServerWorkload),
  terraformVariables: Schema.optional(Schema.Record(Schema.String, TerraformVariable)),
  sapSystemS4Config: Schema.optional(SapSystemS4Config),
  serviceAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "Deployment" }) as any as Schema.Schema<Deployment>;

export interface AgentCommand {
  /** parameters is a map of key/value pairs that can be used to specify additional one-time executable settings. */
  parameters?: Record<string, string>;
  /** command is the name of the agent one-time executable that will be invoked. */
  command?: string;
}

export const AgentCommand: Schema.Schema<AgentCommand> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  command: Schema.optional(Schema.String),
})).annotate({ identifier: "AgentCommand" }) as any as Schema.Schema<AgentCommand>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface Operation {
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  done: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  error: Schema.optional(Status),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface RuleOutput {
  /** Output only. Violation details generated by rule. */
  details?: Record<string, string>;
  /** Output only. The message generated by rule. */
  message?: string;
}

export const RuleOutput: Schema.Schema<RuleOutput> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "RuleOutput" }) as any as Schema.Schema<RuleOutput>;

export interface ShellCommand {
  /** args is a string of arguments to be passed to the command. */
  args?: string;
  /** Optional. If not specified, the default timeout is 60 seconds. */
  timeoutSeconds?: number;
  /** command is the name of the command to be executed. */
  command?: string;
}

export const ShellCommand: Schema.Schema<ShellCommand> = Schema.suspend(() => Schema.Struct({
  args: Schema.optional(Schema.String),
  timeoutSeconds: Schema.optional(Schema.Number),
  command: Schema.optional(Schema.String),
})).annotate({ identifier: "ShellCommand" }) as any as Schema.Schema<ShellCommand>;

export interface Command {
  /** ShellCommand is invoked via the agent's command line executor. */
  shellCommand?: ShellCommand;
  /** AgentCommand specifies a one-time executable program for the agent to run. */
  agentCommand?: AgentCommand;
}

export const Command: Schema.Schema<Command> = Schema.suspend(() => Schema.Struct({
  shellCommand: Schema.optional(ShellCommand),
  agentCommand: Schema.optional(AgentCommand),
})).annotate({ identifier: "Command" }) as any as Schema.Schema<Command>;

export interface Rule {
  /** descrite rule in plain language */
  description?: string;
  /** the secondary category */
  secondaryCategory?: string;
  /** the primary category */
  primaryCategory?: string;
  /** List of user-defined tags */
  tags?: Array<string>;
  /** the name display in UI */
  displayName?: string;
  /** the message template for rule */
  errorMessage?: string;
  /** The type of the rule. */
  ruleType?: "RULE_TYPE_UNSPECIFIED" | "BASELINE" | "CUSTOM" | (string & {});
  /** the docuement url for the rule */
  uri?: string;
  /** the remediation for the rule */
  remediation?: string;
  /** the severity of the rule */
  severity?: string;
  /** Output only. the version of the rule */
  revisionId?: string;
  /** The CAI asset type of the rule is evaluating, for joined asset types, it will be the corresponding primary asset types. */
  assetType?: string;
  /** rule name */
  name?: string;
}

export const Rule: Schema.Schema<Rule> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  secondaryCategory: Schema.optional(Schema.String),
  primaryCategory: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
  displayName: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  ruleType: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  remediation: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  assetType: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Rule" }) as any as Schema.Schema<Rule>;

export interface ViolationDetails {
  /** The service account associated with the resource. */
  serviceAccount?: string;
  /** Output only. The rule output of the violation. */
  ruleOutput?: Array<RuleOutput>;
  /** The name of the asset. */
  asset?: string;
  /** Details of the violation. */
  observed?: Record<string, string>;
}

export const ViolationDetails: Schema.Schema<ViolationDetails> = Schema.suspend(() => Schema.Struct({
  serviceAccount: Schema.optional(Schema.String),
  ruleOutput: Schema.optional(Schema.Array(RuleOutput)),
  asset: Schema.optional(Schema.String),
  observed: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "ViolationDetails" }) as any as Schema.Schema<ViolationDetails>;

export interface Resource {
  /** The name of the resource. */
  name?: string;
  /** The type of resource. */
  type?: string;
  /** The service account associated with the resource. */
  serviceAccount?: string;
}

export const Resource: Schema.Schema<Resource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "Resource" }) as any as Schema.Schema<Resource>;

export interface ExecutionResult {
  /** Execution result type of the scanned resource */
  type?: "TYPE_UNSPECIFIED" | "TYPE_PASSED" | "TYPE_VIOLATED" | (string & {});
  /** The details of violation in an evaluation result. */
  violationDetails?: ViolationDetails;
  /** The severity of violation. */
  severity?: string;
  /** The resource that violates the rule. */
  resource?: Resource;
  /** The URL for the documentation of the rule. */
  documentationUrl?: string;
  /** The rule that is violated in an evaluation. */
  rule?: string;
  /** The violation message of an execution. */
  violationMessage?: string;
  /** The commands to remediate the violation. */
  commands?: Array<Command>;
}

export const ExecutionResult: Schema.Schema<ExecutionResult> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  violationDetails: Schema.optional(ViolationDetails),
  severity: Schema.optional(Schema.String),
  resource: Schema.optional(Resource),
  documentationUrl: Schema.optional(Schema.String),
  rule: Schema.optional(Schema.String),
  violationMessage: Schema.optional(Schema.String),
  commands: Schema.optional(Schema.Array(Command)),
})).annotate({ identifier: "ExecutionResult" }) as any as Schema.Schema<ExecutionResult>;

export interface ListExecutionResultsResponse {
  /** The versions from the specified publisher. */
  executionResults?: Array<ExecutionResult>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListExecutionResultsResponse: Schema.Schema<ListExecutionResultsResponse> = Schema.suspend(() => Schema.Struct({
  executionResults: Schema.optional(Schema.Array(ExecutionResult)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListExecutionResultsResponse" }) as any as Schema.Schema<ListExecutionResultsResponse>;

export interface ListDeploymentsResponse {
  /** Unordered list. Locations that could not be reached. */
  unreachable?: Array<string>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** The list of Deployment */
  deployments?: Array<Deployment>;
}

export const ListDeploymentsResponse: Schema.Schema<ListDeploymentsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  deployments: Schema.optional(Schema.Array(Deployment)),
})).annotate({ identifier: "ListDeploymentsResponse" }) as any as Schema.Schema<ListDeploymentsResponse>;

export interface ScannedResource {
  /** resource type */
  type?: string;
  /** resource name */
  resource?: string;
}

export const ScannedResource: Schema.Schema<ScannedResource> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
})).annotate({ identifier: "ScannedResource" }) as any as Schema.Schema<ScannedResource>;

export interface ListScannedResourcesResponse {
  /** All scanned resources in response */
  scannedResources?: Array<ScannedResource>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListScannedResourcesResponse: Schema.Schema<ListScannedResourcesResponse> = Schema.suspend(() => Schema.Struct({
  scannedResources: Schema.optional(Schema.Array(ScannedResource)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListScannedResourcesResponse" }) as any as Schema.Schema<ListScannedResourcesResponse>;

export interface ListActuationsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Unordered list. Locations that could not be reached. */
  unreachable?: Array<string>;
  /** The list of Actuation */
  actuations?: Array<Actuation>;
}

export const ListActuationsResponse: Schema.Schema<ListActuationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  actuations: Schema.optional(Schema.Array(Actuation)),
})).annotate({ identifier: "ListActuationsResponse" }) as any as Schema.Schema<ListActuationsResponse>;

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

export interface ListRulesResponse {
  /** A wrapper of the invalid rules that failed to be validated. */
  invalidRulesWrapper?: InvalidRulesWrapper;
  /** all rules in response */
  rules?: Array<Rule>;
}

export const ListRulesResponse: Schema.Schema<ListRulesResponse> = Schema.suspend(() => Schema.Struct({
  invalidRulesWrapper: Schema.optional(InvalidRulesWrapper),
  rules: Schema.optional(Schema.Array(Rule)),
})).annotate({ identifier: "ListRulesResponse" }) as any as Schema.Schema<ListRulesResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface WriteInsightResponse {
}

export const WriteInsightResponse: Schema.Schema<WriteInsightResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "WriteInsightResponse" }) as any as Schema.Schema<WriteInsightResponse>;

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
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list page size. */
  pageSize?: number;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
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

/** Updates the parameters of a single Evaluation. */
export interface PatchProjectsLocationsEvaluationsRequest {
  /** name of resource names have the form 'projects/{project_id}/locations/{location_id}/evaluations/{evaluation_id}' */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the Evaluation resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Evaluation;
}

export const PatchProjectsLocationsEvaluationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Evaluation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/evaluations/{evaluationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsEvaluationsRequest>;

export type PatchProjectsLocationsEvaluationsResponse = Operation;
export const PatchProjectsLocationsEvaluationsResponse = Operation;

export type PatchProjectsLocationsEvaluationsError = CommonErrors;

export const patchProjectsLocationsEvaluations: API.OperationMethod<PatchProjectsLocationsEvaluationsRequest, PatchProjectsLocationsEvaluationsResponse, PatchProjectsLocationsEvaluationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsEvaluationsRequest,
  output: PatchProjectsLocationsEvaluationsResponse,
  errors: [],
}));

/** Gets details of a single Evaluation. */
export interface GetProjectsLocationsEvaluationsRequest {
  /** Required. Name of the resource */
  name: string;
}

export const GetProjectsLocationsEvaluationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/evaluations/{evaluationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsEvaluationsRequest>;

export type GetProjectsLocationsEvaluationsResponse = Evaluation;
export const GetProjectsLocationsEvaluationsResponse = Evaluation;

export type GetProjectsLocationsEvaluationsError = CommonErrors;

export const getProjectsLocationsEvaluations: API.OperationMethod<GetProjectsLocationsEvaluationsRequest, GetProjectsLocationsEvaluationsResponse, GetProjectsLocationsEvaluationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsEvaluationsRequest,
  output: GetProjectsLocationsEvaluationsResponse,
  errors: [],
}));

/** Lists Evaluations in a given project and location. */
export interface ListProjectsLocationsEvaluationsRequest {
  /** Required. Parent value for ListEvaluationsRequest */
  parent: string;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Filter to be applied when listing the evaluation results. */
  filter?: string;
  /** Hint for how to order the results */
  orderBy?: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
}

export const ListProjectsLocationsEvaluationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/evaluations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsEvaluationsRequest>;

export type ListProjectsLocationsEvaluationsResponse = ListEvaluationsResponse;
export const ListProjectsLocationsEvaluationsResponse = ListEvaluationsResponse;

export type ListProjectsLocationsEvaluationsError = CommonErrors;

export const listProjectsLocationsEvaluations = API.makePaginated(() => ({
  input: ListProjectsLocationsEvaluationsRequest,
  output: ListProjectsLocationsEvaluationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a single Evaluation. */
export interface DeleteProjectsLocationsEvaluationsRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Name of the resource */
  name: string;
  /** Optional. Followed the best practice from https://aip.dev/135#cascading-delete */
  force?: boolean;
}

export const DeleteProjectsLocationsEvaluationsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/evaluations/{evaluationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsEvaluationsRequest>;

export type DeleteProjectsLocationsEvaluationsResponse = Operation;
export const DeleteProjectsLocationsEvaluationsResponse = Operation;

export type DeleteProjectsLocationsEvaluationsError = CommonErrors;

export const deleteProjectsLocationsEvaluations: API.OperationMethod<DeleteProjectsLocationsEvaluationsRequest, DeleteProjectsLocationsEvaluationsResponse, DeleteProjectsLocationsEvaluationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsEvaluationsRequest,
  output: DeleteProjectsLocationsEvaluationsResponse,
  errors: [],
}));

/** Creates a new Evaluation in a given project and location. */
export interface CreateProjectsLocationsEvaluationsRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Id of the requesting object */
  evaluationId?: string;
  /** Required. The resource prefix of the evaluation location using the form: `projects/{project_id}/locations/{location_id}` */
  parent: string;
  /** Request body */
  body?: Evaluation;
}

export const CreateProjectsLocationsEvaluationsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  evaluationId: Schema.optional(Schema.String).pipe(T.HttpQuery("evaluationId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Evaluation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/evaluations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsEvaluationsRequest>;

export type CreateProjectsLocationsEvaluationsResponse = Operation;
export const CreateProjectsLocationsEvaluationsResponse = Operation;

export type CreateProjectsLocationsEvaluationsError = CommonErrors;

export const createProjectsLocationsEvaluations: API.OperationMethod<CreateProjectsLocationsEvaluationsRequest, CreateProjectsLocationsEvaluationsResponse, CreateProjectsLocationsEvaluationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsEvaluationsRequest,
  output: CreateProjectsLocationsEvaluationsResponse,
  errors: [],
}));

/** Deletes a single Execution. */
export interface DeleteProjectsLocationsEvaluationsExecutionsRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Name of the resource */
  name: string;
}

export const DeleteProjectsLocationsEvaluationsExecutionsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/evaluations/{evaluationsId}/executions/{executionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsEvaluationsExecutionsRequest>;

export type DeleteProjectsLocationsEvaluationsExecutionsResponse = Operation;
export const DeleteProjectsLocationsEvaluationsExecutionsResponse = Operation;

export type DeleteProjectsLocationsEvaluationsExecutionsError = CommonErrors;

export const deleteProjectsLocationsEvaluationsExecutions: API.OperationMethod<DeleteProjectsLocationsEvaluationsExecutionsRequest, DeleteProjectsLocationsEvaluationsExecutionsResponse, DeleteProjectsLocationsEvaluationsExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsEvaluationsExecutionsRequest,
  output: DeleteProjectsLocationsEvaluationsExecutionsResponse,
  errors: [],
}));

/** Lists Executions in a given project and location. */
export interface ListProjectsLocationsEvaluationsExecutionsRequest {
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Filtering results */
  filter?: string;
  /** Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Required. The resource prefix of the Execution using the form: 'projects/{project}/locations/{location}/evaluations/{evaluation}' */
  parent: string;
}

export const ListProjectsLocationsEvaluationsExecutionsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/evaluations/{evaluationsId}/executions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsEvaluationsExecutionsRequest>;

export type ListProjectsLocationsEvaluationsExecutionsResponse = ListExecutionsResponse;
export const ListProjectsLocationsEvaluationsExecutionsResponse = ListExecutionsResponse;

export type ListProjectsLocationsEvaluationsExecutionsError = CommonErrors;

export const listProjectsLocationsEvaluationsExecutions = API.makePaginated(() => ({
  input: ListProjectsLocationsEvaluationsExecutionsRequest,
  output: ListProjectsLocationsEvaluationsExecutionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new Execution in a given project and location. */
export interface RunProjectsLocationsEvaluationsExecutionsRequest {
  /** Required. The resource name of the Execution using the form: 'projects/{project}/locations/{location}/evaluations/{evaluation}/executions/{execution}' */
  name: string;
  /** Request body */
  body?: RunEvaluationRequest;
}

export const RunProjectsLocationsEvaluationsExecutionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RunEvaluationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/evaluations/{evaluationsId}/executions:run", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunProjectsLocationsEvaluationsExecutionsRequest>;

export type RunProjectsLocationsEvaluationsExecutionsResponse = Operation;
export const RunProjectsLocationsEvaluationsExecutionsResponse = Operation;

export type RunProjectsLocationsEvaluationsExecutionsError = CommonErrors;

export const runProjectsLocationsEvaluationsExecutions: API.OperationMethod<RunProjectsLocationsEvaluationsExecutionsRequest, RunProjectsLocationsEvaluationsExecutionsResponse, RunProjectsLocationsEvaluationsExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunProjectsLocationsEvaluationsExecutionsRequest,
  output: RunProjectsLocationsEvaluationsExecutionsResponse,
  errors: [],
}));

/** Gets details of a single Execution. */
export interface GetProjectsLocationsEvaluationsExecutionsRequest {
  /** Required. Name of the resource */
  name: string;
}

export const GetProjectsLocationsEvaluationsExecutionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/evaluations/{evaluationsId}/executions/{executionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsEvaluationsExecutionsRequest>;

export type GetProjectsLocationsEvaluationsExecutionsResponse = Execution;
export const GetProjectsLocationsEvaluationsExecutionsResponse = Execution;

export type GetProjectsLocationsEvaluationsExecutionsError = CommonErrors;

export const getProjectsLocationsEvaluationsExecutions: API.OperationMethod<GetProjectsLocationsEvaluationsExecutionsRequest, GetProjectsLocationsEvaluationsExecutionsResponse, GetProjectsLocationsEvaluationsExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsEvaluationsExecutionsRequest,
  output: GetProjectsLocationsEvaluationsExecutionsResponse,
  errors: [],
}));

/** Lists the result of a single evaluation. */
export interface ListProjectsLocationsEvaluationsExecutionsResultsRequest {
  /** Required. The execution results. Format: {parent}/evaluations/* /executions/* /results */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Filtering results */
  filter?: string;
}

export const ListProjectsLocationsEvaluationsExecutionsResultsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/evaluations/{evaluationsId}/executions/{executionsId}/results" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsEvaluationsExecutionsResultsRequest>;

export type ListProjectsLocationsEvaluationsExecutionsResultsResponse = ListExecutionResultsResponse;
export const ListProjectsLocationsEvaluationsExecutionsResultsResponse = ListExecutionResultsResponse;

export type ListProjectsLocationsEvaluationsExecutionsResultsError = CommonErrors;

export const listProjectsLocationsEvaluationsExecutionsResults = API.makePaginated(() => ({
  input: ListProjectsLocationsEvaluationsExecutionsResultsRequest,
  output: ListProjectsLocationsEvaluationsExecutionsResultsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all scanned resources for a single Execution. */
export interface ListProjectsLocationsEvaluationsExecutionsScannedResourcesRequest {
  /** Filtering results */
  filter?: string;
  /** Required. parent for ListScannedResourcesRequest */
  parent: string;
  /** rule name */
  rule?: string;
  /** Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
}

export const ListProjectsLocationsEvaluationsExecutionsScannedResourcesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  rule: Schema.optional(Schema.String).pipe(T.HttpQuery("rule")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/evaluations/{evaluationsId}/executions/{executionsId}/scannedResources" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsEvaluationsExecutionsScannedResourcesRequest>;

export type ListProjectsLocationsEvaluationsExecutionsScannedResourcesResponse = ListScannedResourcesResponse;
export const ListProjectsLocationsEvaluationsExecutionsScannedResourcesResponse = ListScannedResourcesResponse;

export type ListProjectsLocationsEvaluationsExecutionsScannedResourcesError = CommonErrors;

export const listProjectsLocationsEvaluationsExecutionsScannedResources = API.makePaginated(() => ({
  input: ListProjectsLocationsEvaluationsExecutionsScannedResourcesRequest,
  output: ListProjectsLocationsEvaluationsExecutionsScannedResourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a discovered workload profile. */
export interface GetProjectsLocationsDiscoveredprofilesRequest {
  /** Required. Name of the resource */
  name: string;
}

export const GetProjectsLocationsDiscoveredprofilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/discoveredprofiles/{discoveredprofilesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDiscoveredprofilesRequest>;

export type GetProjectsLocationsDiscoveredprofilesResponse = WorkloadProfile;
export const GetProjectsLocationsDiscoveredprofilesResponse = WorkloadProfile;

export type GetProjectsLocationsDiscoveredprofilesError = CommonErrors;

export const getProjectsLocationsDiscoveredprofiles: API.OperationMethod<GetProjectsLocationsDiscoveredprofilesRequest, GetProjectsLocationsDiscoveredprofilesResponse, GetProjectsLocationsDiscoveredprofilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDiscoveredprofilesRequest,
  output: GetProjectsLocationsDiscoveredprofilesResponse,
  errors: [],
}));

/** List discovered workload profiles */
export interface ListProjectsLocationsDiscoveredprofilesRequest {
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Required. Parent value for ListDiscoveredProfilesRequest */
  parent: string;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
}

export const ListProjectsLocationsDiscoveredprofilesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/discoveredprofiles" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDiscoveredprofilesRequest>;

export type ListProjectsLocationsDiscoveredprofilesResponse = ListDiscoveredProfilesResponse;
export const ListProjectsLocationsDiscoveredprofilesResponse = ListDiscoveredProfilesResponse;

export type ListProjectsLocationsDiscoveredprofilesError = CommonErrors;

export const listProjectsLocationsDiscoveredprofiles = API.makePaginated(() => ({
  input: ListProjectsLocationsDiscoveredprofilesRequest,
  output: ListProjectsLocationsDiscoveredprofilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get the health of a discovered workload profile. */
export interface GetProjectsLocationsDiscoveredprofilesHealthRequest {
  /** Required. The resource name */
  name: string;
}

export const GetProjectsLocationsDiscoveredprofilesHealthRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/discoveredprofiles/{discoveredprofilesId}/health/{healthId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDiscoveredprofilesHealthRequest>;

export type GetProjectsLocationsDiscoveredprofilesHealthResponse = WorkloadProfileHealth;
export const GetProjectsLocationsDiscoveredprofilesHealthResponse = WorkloadProfileHealth;

export type GetProjectsLocationsDiscoveredprofilesHealthError = CommonErrors;

export const getProjectsLocationsDiscoveredprofilesHealth: API.OperationMethod<GetProjectsLocationsDiscoveredprofilesHealthRequest, GetProjectsLocationsDiscoveredprofilesHealthResponse, GetProjectsLocationsDiscoveredprofilesHealthError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDiscoveredprofilesHealthRequest,
  output: GetProjectsLocationsDiscoveredprofilesHealthResponse,
  errors: [],
}));

/** Creates a new Deployment in a given project and location. */
export interface CreateProjectsLocationsDeploymentsRequest {
  /** Required. Id of the deployment */
  deploymentId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The resource prefix of the Deployment using the form: `projects/{project_id}/locations/{location_id}` */
  parent: string;
  /** Request body */
  body?: Deployment;
}

export const CreateProjectsLocationsDeploymentsRequest = Schema.Struct({
  deploymentId: Schema.optional(Schema.String).pipe(T.HttpQuery("deploymentId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Deployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDeploymentsRequest>;

export type CreateProjectsLocationsDeploymentsResponse = Operation;
export const CreateProjectsLocationsDeploymentsResponse = Operation;

export type CreateProjectsLocationsDeploymentsError = CommonErrors;

export const createProjectsLocationsDeployments: API.OperationMethod<CreateProjectsLocationsDeploymentsRequest, CreateProjectsLocationsDeploymentsResponse, CreateProjectsLocationsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDeploymentsRequest,
  output: CreateProjectsLocationsDeploymentsResponse,
  errors: [],
}));

/** Lists Deployments in a given project and location. */
export interface ListProjectsLocationsDeploymentsRequest {
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Filter resource follow https://google.aip.dev/160 */
  filter?: string;
  /** Required. The resource prefix of the Deployment using the form: `projects/{project_id}/locations/{location_id}` */
  parent: string;
  /** Optional. Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
}

export const ListProjectsLocationsDeploymentsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDeploymentsRequest>;

export type ListProjectsLocationsDeploymentsResponse = ListDeploymentsResponse;
export const ListProjectsLocationsDeploymentsResponse = ListDeploymentsResponse;

export type ListProjectsLocationsDeploymentsError = CommonErrors;

export const listProjectsLocationsDeployments = API.makePaginated(() => ({
  input: ListProjectsLocationsDeploymentsRequest,
  output: ListProjectsLocationsDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a single Deployment. */
export interface DeleteProjectsLocationsDeploymentsRequest {
  /** Required. Name of the resource */
  name: string;
  /** Optional. If set to true, any actuation will also be deleted. Followed the best practice from https://aip.dev/135#cascading-delete */
  force?: boolean;
}

export const DeleteProjectsLocationsDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDeploymentsRequest>;

export type DeleteProjectsLocationsDeploymentsResponse = Operation;
export const DeleteProjectsLocationsDeploymentsResponse = Operation;

export type DeleteProjectsLocationsDeploymentsError = CommonErrors;

export const deleteProjectsLocationsDeployments: API.OperationMethod<DeleteProjectsLocationsDeploymentsRequest, DeleteProjectsLocationsDeploymentsResponse, DeleteProjectsLocationsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDeploymentsRequest,
  output: DeleteProjectsLocationsDeploymentsResponse,
  errors: [],
}));

/** Gets details of a single Deployment. */
export interface GetProjectsLocationsDeploymentsRequest {
  /** Required. Name of the resource. The format will be 'projects/{project_id}/locations/{location_id}/deployments/{deployment_id}' */
  name: string;
}

export const GetProjectsLocationsDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDeploymentsRequest>;

export type GetProjectsLocationsDeploymentsResponse = Deployment;
export const GetProjectsLocationsDeploymentsResponse = Deployment;

export type GetProjectsLocationsDeploymentsError = CommonErrors;

export const getProjectsLocationsDeployments: API.OperationMethod<GetProjectsLocationsDeploymentsRequest, GetProjectsLocationsDeploymentsResponse, GetProjectsLocationsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDeploymentsRequest,
  output: GetProjectsLocationsDeploymentsResponse,
  errors: [],
}));

/** Deletes a single Actuation */
export interface DeleteProjectsLocationsDeploymentsActuationsRequest {
  /** Required. The name of the book to delete. project/{project_id}/locations/{location_id}/deployments/{deployment_id}/actuations/{actuation_id} */
  name: string;
}

export const DeleteProjectsLocationsDeploymentsActuationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}/actuations/{actuationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDeploymentsActuationsRequest>;

export type DeleteProjectsLocationsDeploymentsActuationsResponse = Operation;
export const DeleteProjectsLocationsDeploymentsActuationsResponse = Operation;

export type DeleteProjectsLocationsDeploymentsActuationsError = CommonErrors;

export const deleteProjectsLocationsDeploymentsActuations: API.OperationMethod<DeleteProjectsLocationsDeploymentsActuationsRequest, DeleteProjectsLocationsDeploymentsActuationsResponse, DeleteProjectsLocationsDeploymentsActuationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDeploymentsActuationsRequest,
  output: DeleteProjectsLocationsDeploymentsActuationsResponse,
  errors: [],
}));

/** Gets details of a single Actuation. */
export interface GetProjectsLocationsDeploymentsActuationsRequest {
  /** Required. Name of the resource */
  name: string;
}

export const GetProjectsLocationsDeploymentsActuationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}/actuations/{actuationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDeploymentsActuationsRequest>;

export type GetProjectsLocationsDeploymentsActuationsResponse = Actuation;
export const GetProjectsLocationsDeploymentsActuationsResponse = Actuation;

export type GetProjectsLocationsDeploymentsActuationsError = CommonErrors;

export const getProjectsLocationsDeploymentsActuations: API.OperationMethod<GetProjectsLocationsDeploymentsActuationsRequest, GetProjectsLocationsDeploymentsActuationsResponse, GetProjectsLocationsDeploymentsActuationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDeploymentsActuationsRequest,
  output: GetProjectsLocationsDeploymentsActuationsResponse,
  errors: [],
}));

/** Lists Actuations in a given project, location and deployment. */
export interface ListProjectsLocationsDeploymentsActuationsRequest {
  /** Optional. Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Required. The resource prefix of the Actuation using the form: 'projects/{project_id}/locations/{location}/deployments/{deployment}' */
  parent: string;
}

export const ListProjectsLocationsDeploymentsActuationsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}/actuations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDeploymentsActuationsRequest>;

export type ListProjectsLocationsDeploymentsActuationsResponse = ListActuationsResponse;
export const ListProjectsLocationsDeploymentsActuationsResponse = ListActuationsResponse;

export type ListProjectsLocationsDeploymentsActuationsError = CommonErrors;

export const listProjectsLocationsDeploymentsActuations = API.makePaginated(() => ({
  input: ListProjectsLocationsDeploymentsActuationsRequest,
  output: ListProjectsLocationsDeploymentsActuationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new actuation for an existing Deployment. */
export interface CreateProjectsLocationsDeploymentsActuationsRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The resource name of the Actuation location using the form: 'projects/{project_id}/locations/{location}/deployments/{deployment}' */
  parent: string;
  /** Request body */
  body?: Actuation;
}

export const CreateProjectsLocationsDeploymentsActuationsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Actuation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}/actuations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDeploymentsActuationsRequest>;

export type CreateProjectsLocationsDeploymentsActuationsResponse = Operation;
export const CreateProjectsLocationsDeploymentsActuationsResponse = Operation;

export type CreateProjectsLocationsDeploymentsActuationsError = CommonErrors;

export const createProjectsLocationsDeploymentsActuations: API.OperationMethod<CreateProjectsLocationsDeploymentsActuationsRequest, CreateProjectsLocationsDeploymentsActuationsResponse, CreateProjectsLocationsDeploymentsActuationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDeploymentsActuationsRequest,
  output: CreateProjectsLocationsDeploymentsActuationsResponse,
  errors: [],
}));

/** Lists rules in a given project. */
export interface ListProjectsLocationsRulesRequest {
  /** Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. The evaluation type of the rules will be applied to. The Cloud Storage bucket name for custom rules. */
  evaluationType?: "EVALUATION_TYPE_UNSPECIFIED" | "SAP" | "SQL_SERVER" | "OTHER" | "SCC_IAC" | (string & {});
  /** Required. The [project] on which to execute the request. The format is: projects/{project_id}/locations/{location} Currently, the pre-defined rules are global available to all projects and all regions */
  parent: string;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** The Cloud Storage bucket name for custom rules. */
  customRulesBucket?: string;
  /** Filter based on primary_category, secondary_category */
  filter?: string;
}

export const ListProjectsLocationsRulesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  evaluationType: Schema.optional(Schema.String).pipe(T.HttpQuery("evaluationType")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  customRulesBucket: Schema.optional(Schema.String).pipe(T.HttpQuery("customRulesBucket")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/rules" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRulesRequest>;

export type ListProjectsLocationsRulesResponse = ListRulesResponse;
export const ListProjectsLocationsRulesResponse = ListRulesResponse;

export type ListProjectsLocationsRulesError = CommonErrors;

export const listProjectsLocationsRules: API.OperationMethod<ListProjectsLocationsRulesRequest, ListProjectsLocationsRulesResponse, ListProjectsLocationsRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsRulesRequest,
  output: ListProjectsLocationsRulesResponse,
  errors: [],
}));

/** Delete the data insights from workload manager data warehouse. */
export interface DeleteProjectsLocationsInsightsRequest {
  /** Required. The system id of the SAP system resource to delete. Formatted as projects/{project}/locations/{location}/sapSystems/{sap_system_id} */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsInsightsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/insights/{insightsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsInsightsRequest>;

export type DeleteProjectsLocationsInsightsResponse = Empty;
export const DeleteProjectsLocationsInsightsResponse = Empty;

export type DeleteProjectsLocationsInsightsError = CommonErrors;

export const deleteProjectsLocationsInsights: API.OperationMethod<DeleteProjectsLocationsInsightsRequest, DeleteProjectsLocationsInsightsResponse, DeleteProjectsLocationsInsightsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsInsightsRequest,
  output: DeleteProjectsLocationsInsightsResponse,
  errors: [],
}));

/** Write the data insights to workload manager data warehouse. */
export interface WriteInsightProjectsLocationsInsightsRequest {
  /** Required. The GCP location. The format is: projects/{project}/locations/{location}. */
  location: string;
  /** Request body */
  body?: WriteInsightRequest;
}

export const WriteInsightProjectsLocationsInsightsRequest = Schema.Struct({
  location: Schema.String.pipe(T.HttpPath("location")),
  body: Schema.optional(WriteInsightRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/insights:writeInsight", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WriteInsightProjectsLocationsInsightsRequest>;

export type WriteInsightProjectsLocationsInsightsResponse = WriteInsightResponse;
export const WriteInsightProjectsLocationsInsightsResponse = WriteInsightResponse;

export type WriteInsightProjectsLocationsInsightsError = CommonErrors;

export const writeInsightProjectsLocationsInsights: API.OperationMethod<WriteInsightProjectsLocationsInsightsRequest, WriteInsightProjectsLocationsInsightsResponse, WriteInsightProjectsLocationsInsightsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WriteInsightProjectsLocationsInsightsRequest,
  output: WriteInsightProjectsLocationsInsightsResponse,
  errors: [],
}));

