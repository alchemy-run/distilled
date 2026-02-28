// ==========================================================================
// Backup and DR Service API (backupdr v1)
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
  name: "backupdr",
  version: "v1",
  rootUrl: "https://backupdr.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

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

export interface SubscribeTrialRequest {
}

export const SubscribeTrialRequest: Schema.Schema<SubscribeTrialRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SubscribeTrialRequest" }) as any as Schema.Schema<SubscribeTrialRequest>;

export interface Trial {
  /** Identifier. The resource name of the trial. Format: projects/{project}/locations/{location}/trial */
  name?: string;
  /** Output only. The state of the trial. */
  state?: "STATE_UNSPECIFIED" | "SUBSCRIBED" | "UNSUBSCRIBED" | "EXPIRED" | "ELIGIBLE" | "NOT_ELIGIBLE" | (string & {});
  /** Output only. The time when the trial was subscribed. */
  startTime?: string;
  /** Output only. The time when the trial will expire. */
  endTime?: string;
  /** Output only. The reason for ending the trial. */
  endReason?: "END_REASON_UNSPECIFIED" | "MOVE_TO_PAID" | "DISCONTINUED" | (string & {});
}

export const Trial: Schema.Schema<Trial> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  endReason: Schema.optional(Schema.String),
})).annotate({ identifier: "Trial" }) as any as Schema.Schema<Trial>;

export interface EndTrialRequest {
  /** Required. The reason for ending the trial. */
  endReason?: "END_REASON_UNSPECIFIED" | "MOVE_TO_PAID" | "DISCONTINUED" | (string & {});
}

export const EndTrialRequest: Schema.Schema<EndTrialRequest> = Schema.suspend(() => Schema.Struct({
  endReason: Schema.optional(Schema.String),
})).annotate({ identifier: "EndTrialRequest" }) as any as Schema.Schema<EndTrialRequest>;

export interface ManagementURI {
  /** Output only. The ManagementServer AGM/RD WebUI URL. */
  webUi?: string;
  /** Output only. The ManagementServer AGM/RD API URL. */
  api?: string;
}

export const ManagementURI: Schema.Schema<ManagementURI> = Schema.suspend(() => Schema.Struct({
  webUi: Schema.optional(Schema.String),
  api: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagementURI" }) as any as Schema.Schema<ManagementURI>;

export interface WorkforceIdentityBasedManagementURI {
  /** Output only. First party Management URI for Google Identities. */
  firstPartyManagementUri?: string;
  /** Output only. Third party Management URI for External Identity Providers. */
  thirdPartyManagementUri?: string;
}

export const WorkforceIdentityBasedManagementURI: Schema.Schema<WorkforceIdentityBasedManagementURI> = Schema.suspend(() => Schema.Struct({
  firstPartyManagementUri: Schema.optional(Schema.String),
  thirdPartyManagementUri: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkforceIdentityBasedManagementURI" }) as any as Schema.Schema<WorkforceIdentityBasedManagementURI>;

export interface NetworkConfig {
  /** Optional. The resource name of the Google Compute Engine VPC network to which the ManagementServer instance is connected. */
  network?: string;
  /** Optional. The network connect mode of the ManagementServer instance. For this version, only PRIVATE_SERVICE_ACCESS is supported. */
  peeringMode?: "PEERING_MODE_UNSPECIFIED" | "PRIVATE_SERVICE_ACCESS" | (string & {});
}

export const NetworkConfig: Schema.Schema<NetworkConfig> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  peeringMode: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkConfig" }) as any as Schema.Schema<NetworkConfig>;

export interface WorkforceIdentityBasedOAuth2ClientID {
  /** Output only. First party OAuth Client ID for Google Identities. */
  firstPartyOauth2ClientId?: string;
  /** Output only. Third party OAuth Client ID for External Identity Providers. */
  thirdPartyOauth2ClientId?: string;
}

export const WorkforceIdentityBasedOAuth2ClientID: Schema.Schema<WorkforceIdentityBasedOAuth2ClientID> = Schema.suspend(() => Schema.Struct({
  firstPartyOauth2ClientId: Schema.optional(Schema.String),
  thirdPartyOauth2ClientId: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkforceIdentityBasedOAuth2ClientID" }) as any as Schema.Schema<WorkforceIdentityBasedOAuth2ClientID>;

export interface ManagementServer {
  /** Output only. Identifier. The resource name. */
  name?: string;
  /** Optional. The description of the ManagementServer instance (2048 characters or less). */
  description?: string;
  /** Optional. Resource labels to represent user provided metadata. Labels currently defined: 1. migrate_from_go= If set to true, the MS is created in migration ready mode. */
  labels?: Record<string, string>;
  /** Output only. The time when the instance was created. */
  createTime?: string;
  /** Output only. The time when the instance was updated. */
  updateTime?: string;
  /** Optional. The type of the ManagementServer resource. */
  type?: "INSTANCE_TYPE_UNSPECIFIED" | "BACKUP_RESTORE" | (string & {});
  /** Output only. The hostname or ip address of the exposed AGM endpoints, used by clients to connect to AGM/RD graphical user interface and APIs. */
  managementUri?: ManagementURI;
  /** Output only. The hostnames of the exposed AGM endpoints for both types of user i.e. 1p and 3p, used to connect AGM/RM UI. */
  workforceIdentityBasedManagementUri?: WorkforceIdentityBasedManagementURI;
  /** Output only. The ManagementServer state. */
  state?: "INSTANCE_STATE_UNSPECIFIED" | "CREATING" | "READY" | "UPDATING" | "DELETING" | "REPAIRING" | "MAINTENANCE" | "ERROR" | (string & {});
  /** Optional. VPC networks to which the ManagementServer instance is connected. For this version, only a single network is supported. This field is optional if MS is created without PSA */
  networks?: Array<NetworkConfig>;
  /** Optional. Server specified ETag for the ManagementServer resource to prevent simultaneous updates from overwiting each other. */
  etag?: string;
  /** Output only. The OAuth 2.0 client id is required to make API calls to the Backup and DR instance API of this ManagementServer. This is the value that should be provided in the 'aud' field of the OIDC ID Token (see openid specification https://openid.net/specs/openid-connect-core-1_0.html#IDToken). */
  oauth2ClientId?: string;
  /** Output only. The OAuth client IDs for both types of user i.e. 1p and 3p. */
  workforceIdentityBasedOauth2ClientId?: WorkforceIdentityBasedOAuth2ClientID;
  /** Output only. The hostname or ip address of the exposed AGM endpoints, used by BAs to connect to BA proxy. */
  baProxyUri?: Array<string>;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
}

export const ManagementServer: Schema.Schema<ManagementServer> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  managementUri: Schema.optional(ManagementURI),
  workforceIdentityBasedManagementUri: Schema.optional(WorkforceIdentityBasedManagementURI),
  state: Schema.optional(Schema.String),
  networks: Schema.optional(Schema.Array(NetworkConfig)),
  etag: Schema.optional(Schema.String),
  oauth2ClientId: Schema.optional(Schema.String),
  workforceIdentityBasedOauth2ClientId: Schema.optional(WorkforceIdentityBasedOAuth2ClientID),
  baProxyUri: Schema.optional(Schema.Array(Schema.String)),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ManagementServer" }) as any as Schema.Schema<ManagementServer>;

export interface ListManagementServersResponse {
  /** The list of ManagementServer instances in the project for the specified location. If the '{location}' value in the request is "-", the response contains a list of instances from all locations. In case any location is unreachable, the response will only return management servers in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. */
  managementServers?: Array<ManagementServer>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListManagementServersResponse: Schema.Schema<ListManagementServersResponse> = Schema.suspend(() => Schema.Struct({
  managementServers: Schema.optional(Schema.Array(ManagementServer)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListManagementServersResponse" }) as any as Schema.Schema<ListManagementServersResponse>;

export interface FetchMsComplianceMetadataRequest {
  /** Required. The project id of the target project */
  projectId?: string;
}

export const FetchMsComplianceMetadataRequest: Schema.Schema<FetchMsComplianceMetadataRequest> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchMsComplianceMetadataRequest" }) as any as Schema.Schema<FetchMsComplianceMetadataRequest>;

export interface FetchMsComplianceMetadataResponse {
  /** The ms compliance metadata of the target project, if the project is an Assured Workloads project, values will be true, otherwise false. */
  isAssuredWorkload?: boolean;
}

export const FetchMsComplianceMetadataResponse: Schema.Schema<FetchMsComplianceMetadataResponse> = Schema.suspend(() => Schema.Struct({
  isAssuredWorkload: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "FetchMsComplianceMetadataResponse" }) as any as Schema.Schema<FetchMsComplianceMetadataResponse>;

export interface EncryptionConfig {
  /** Optional. The Cloud KMS key name to encrypt backups in this backup vault. Must be in the same region as the vault. Some workload backups like compute disk backups may use their inherited source key instead. Format: projects/{project}/locations/{location}/keyRings/{ring}/cryptoKeys/{key} */
  kmsKeyName?: string;
}

export const EncryptionConfig: Schema.Schema<EncryptionConfig> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "EncryptionConfig" }) as any as Schema.Schema<EncryptionConfig>;

export interface BackupVault {
  /** Output only. Identifier. Name of the backup vault to create. It must have the format`"projects/{project}/locations/{location}/backupVaults/{backupvault}"`. `{backupvault}` cannot be changed after creation. It must be between 3-63 characters long and must be unique within the project and location. */
  name?: string;
  /** Optional. The description of the BackupVault instance (2048 characters or less). */
  description?: string;
  /** Optional. Resource labels to represent user provided metadata. No labels currently defined: */
  labels?: Record<string, string>;
  /** Output only. The time when the instance was created. */
  createTime?: string;
  /** Output only. The time when the instance was updated. */
  updateTime?: string;
  /** Required. The default and minimum enforced retention for each backup within the backup vault. The enforced retention for each backup can be extended. Note: Longer minimum enforced retention period impacts potential storage costs post introductory trial. We recommend starting with a short duration of 3 days or less. */
  backupMinimumEnforcedRetentionDuration?: string;
  /** Optional. Setting for how a backup's enforced retention end time is inherited. */
  backupRetentionInheritance?: "BACKUP_RETENTION_INHERITANCE_UNSPECIFIED" | "INHERIT_VAULT_RETENTION" | "MATCH_BACKUP_EXPIRE_TIME" | (string & {});
  /** Output only. Set to true when there are no backups nested under this resource. */
  deletable?: boolean;
  /** Optional. Server specified ETag for the backup vault resource to prevent simultaneous updates from overwiting each other. */
  etag?: string;
  /** Output only. The BackupVault resource instance state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "ERROR" | "UPDATING" | (string & {});
  /** Optional. Time after which the BackupVault resource is locked. */
  effectiveTime?: string;
  /** Output only. The number of backups in this backup vault. */
  backupCount?: string;
  /** Output only. Service account used by the BackupVault Service for this BackupVault. The user should grant this account permissions in their workload project to enable the service to run backups and restores there. */
  serviceAccount?: string;
  /** Output only. Total size of the storage used by all backup resources. */
  totalStoredBytes?: string;
  /** Output only. Immutable after resource creation until resource deletion. */
  uid?: string;
  /** Optional. User annotations. See https://google.aip.dev/128#annotations Stores small amounts of arbitrary data. */
  annotations?: Record<string, string>;
  /** Optional. Note: This field is added for future use case and will not be supported in the current release. Access restriction for the backup vault. Default value is WITHIN_ORGANIZATION if not provided during creation. */
  accessRestriction?: "ACCESS_RESTRICTION_UNSPECIFIED" | "WITHIN_PROJECT" | "WITHIN_ORGANIZATION" | "UNRESTRICTED" | "WITHIN_ORG_BUT_UNRESTRICTED_FOR_BA" | (string & {});
  /** Optional. The encryption config of the backup vault. */
  encryptionConfig?: EncryptionConfig;
}

export const BackupVault: Schema.Schema<BackupVault> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  backupMinimumEnforcedRetentionDuration: Schema.optional(Schema.String),
  backupRetentionInheritance: Schema.optional(Schema.String),
  deletable: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  effectiveTime: Schema.optional(Schema.String),
  backupCount: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  totalStoredBytes: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  accessRestriction: Schema.optional(Schema.String),
  encryptionConfig: Schema.optional(EncryptionConfig),
})).annotate({ identifier: "BackupVault" }) as any as Schema.Schema<BackupVault>;

export interface ListBackupVaultsResponse {
  /** The list of BackupVault instances in the project for the specified location. If the '{location}' value in the request is "-", the response contains a list of instances from all locations. In case any location is unreachable, the response will only return backup vaults in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. */
  backupVaults?: Array<BackupVault>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackupVaultsResponse: Schema.Schema<ListBackupVaultsResponse> = Schema.suspend(() => Schema.Struct({
  backupVaults: Schema.optional(Schema.Array(BackupVault)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBackupVaultsResponse" }) as any as Schema.Schema<ListBackupVaultsResponse>;

export interface FetchUsableBackupVaultsResponse {
  /** The list of BackupVault instances in the project for the specified location. If the '{location}' value in the request is "-", the response contains a list of instances from all locations. In case any location is unreachable, the response will only return backup vaults in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. */
  backupVaults?: Array<BackupVault>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const FetchUsableBackupVaultsResponse: Schema.Schema<FetchUsableBackupVaultsResponse> = Schema.suspend(() => Schema.Struct({
  backupVaults: Schema.optional(Schema.Array(BackupVault)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "FetchUsableBackupVaultsResponse" }) as any as Schema.Schema<FetchUsableBackupVaultsResponse>;

export interface GcpBackupConfig {
  /** The name of the backup plan. */
  backupPlan?: string;
  /** The description of the backup plan. */
  backupPlanDescription?: string;
  /** The name of the backup plan association. */
  backupPlanAssociation?: string;
  /** The names of the backup plan rules which point to this backupvault */
  backupPlanRules?: Array<string>;
  /** The name of the backup plan revision. */
  backupPlanRevisionName?: string;
  /** The user friendly id of the backup plan revision. E.g. v0, v1 etc. */
  backupPlanRevisionId?: string;
}

export const GcpBackupConfig: Schema.Schema<GcpBackupConfig> = Schema.suspend(() => Schema.Struct({
  backupPlan: Schema.optional(Schema.String),
  backupPlanDescription: Schema.optional(Schema.String),
  backupPlanAssociation: Schema.optional(Schema.String),
  backupPlanRules: Schema.optional(Schema.Array(Schema.String)),
  backupPlanRevisionName: Schema.optional(Schema.String),
  backupPlanRevisionId: Schema.optional(Schema.String),
})).annotate({ identifier: "GcpBackupConfig" }) as any as Schema.Schema<GcpBackupConfig>;

export interface BackupApplianceBackupConfig {
  /** The name of the backup appliance. */
  backupApplianceName?: string;
  /** The ID of the backup appliance. */
  backupApplianceId?: string;
  /** The ID of the SLA of this application. */
  slaId?: string;
  /** The name of the application. */
  applicationName?: string;
  /** The name of the host where the application is running. */
  hostName?: string;
  /** The name of the SLT associated with the application. */
  sltName?: string;
  /** The name of the SLP associated with the application. */
  slpName?: string;
}

export const BackupApplianceBackupConfig: Schema.Schema<BackupApplianceBackupConfig> = Schema.suspend(() => Schema.Struct({
  backupApplianceName: Schema.optional(Schema.String),
  backupApplianceId: Schema.optional(Schema.String),
  slaId: Schema.optional(Schema.String),
  applicationName: Schema.optional(Schema.String),
  hostName: Schema.optional(Schema.String),
  sltName: Schema.optional(Schema.String),
  slpName: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupApplianceBackupConfig" }) as any as Schema.Schema<BackupApplianceBackupConfig>;

export interface BackupConfigInfo {
  /** Output only. The status of the last backup to this BackupVault */
  lastBackupState?: "LAST_BACKUP_STATE_UNSPECIFIED" | "FIRST_BACKUP_PENDING" | "SUCCEEDED" | "FAILED" | "PERMISSION_DENIED" | (string & {});
  /** Output only. If the last backup were successful, this field has the consistency date. */
  lastSuccessfulBackupConsistencyTime?: string;
  /** Output only. If the last backup failed, this field has the error message. */
  lastBackupError?: Status;
  /** Configuration for a Google Cloud resource. */
  gcpBackupConfig?: GcpBackupConfig;
  /** Configuration for an application backed up by a Backup Appliance. */
  backupApplianceBackupConfig?: BackupApplianceBackupConfig;
}

export const BackupConfigInfo: Schema.Schema<BackupConfigInfo> = Schema.suspend(() => Schema.Struct({
  lastBackupState: Schema.optional(Schema.String),
  lastSuccessfulBackupConsistencyTime: Schema.optional(Schema.String),
  lastBackupError: Schema.optional(Status),
  gcpBackupConfig: Schema.optional(GcpBackupConfig),
  backupApplianceBackupConfig: Schema.optional(BackupApplianceBackupConfig),
})).annotate({ identifier: "BackupConfigInfo" }) as any as Schema.Schema<BackupConfigInfo>;

export interface ComputeInstanceDataSourceProperties {
  /** Name of the compute instance backed up by the datasource. */
  name?: string;
  /** The description of the Compute Engine instance. */
  description?: string;
  /** The machine type of the instance. */
  machineType?: string;
  /** The total number of disks attached to the Instance. */
  totalDiskCount?: string;
  /** The sum of all the disk sizes. */
  totalDiskSizeGb?: string;
}

export const ComputeInstanceDataSourceProperties: Schema.Schema<ComputeInstanceDataSourceProperties> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  machineType: Schema.optional(Schema.String),
  totalDiskCount: Schema.optional(Schema.String),
  totalDiskSizeGb: Schema.optional(Schema.String),
})).annotate({ identifier: "ComputeInstanceDataSourceProperties" }) as any as Schema.Schema<ComputeInstanceDataSourceProperties>;

export interface CloudSqlInstanceDataSourceProperties {
  /** Output only. Name of the Cloud SQL instance backed up by the datasource. Format: projects/{project}/instances/{instance} */
  name?: string;
  /** Output only. The installed database version of the Cloud SQL instance. */
  databaseInstalledVersion?: string;
  /** Output only. The instance creation timestamp. */
  instanceCreateTime?: string;
  /** Output only. The tier (or machine type) for this instance. Example: `db-custom-1-3840` */
  instanceTier?: string;
}

export const CloudSqlInstanceDataSourceProperties: Schema.Schema<CloudSqlInstanceDataSourceProperties> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  databaseInstalledVersion: Schema.optional(Schema.String),
  instanceCreateTime: Schema.optional(Schema.String),
  instanceTier: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudSqlInstanceDataSourceProperties" }) as any as Schema.Schema<CloudSqlInstanceDataSourceProperties>;

export interface AlloyDbPitrWindow {
  /** Output only. The start time of the PITR window. */
  startTime?: string;
  /** Output only. The end time of the PITR window. It is not set if the corresponding Backup Plan Association is active. */
  endTime?: string;
  /** Output only. Log retention days for the PITR window. */
  logRetentionDays?: string;
}

export const AlloyDbPitrWindow: Schema.Schema<AlloyDbPitrWindow> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  logRetentionDays: Schema.optional(Schema.String),
})).annotate({ identifier: "AlloyDbPitrWindow" }) as any as Schema.Schema<AlloyDbPitrWindow>;

export interface AlloyDBClusterDataSourceProperties {
  /** Output only. Name of the AlloyDB cluster backed up by the datasource. */
  name?: string;
  /** Output only. Point in time recovery windows. The order is guaranteed to be ascending by start time. */
  pitrWindows?: Array<AlloyDbPitrWindow>;
  /** Output only. The cluster UID of the AlloyDB cluster backed up by the datasource. */
  clusterUid?: string;
}

export const AlloyDBClusterDataSourceProperties: Schema.Schema<AlloyDBClusterDataSourceProperties> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  pitrWindows: Schema.optional(Schema.Array(AlloyDbPitrWindow)),
  clusterUid: Schema.optional(Schema.String),
})).annotate({ identifier: "AlloyDBClusterDataSourceProperties" }) as any as Schema.Schema<AlloyDBClusterDataSourceProperties>;

export interface DiskDataSourceProperties {
  /** Name of the disk backed up by the datasource. */
  name?: string;
  /** The description of the disk. */
  description?: string;
  /** The type of the disk. */
  type?: string;
  /** The size of the disk in GB. */
  sizeGb?: string;
}

export const DiskDataSourceProperties: Schema.Schema<DiskDataSourceProperties> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  sizeGb: Schema.optional(Schema.String),
})).annotate({ identifier: "DiskDataSourceProperties" }) as any as Schema.Schema<DiskDataSourceProperties>;

export interface DataSourceGcpResource {
  /** Output only. Full resource pathname URL of the source Google Cloud resource. */
  gcpResourcename?: string;
  /** Location of the resource: //"global"/"unspecified". */
  location?: string;
  /** The type of the Google Cloud resource. Use the Unified Resource Type, eg. compute.googleapis.com/Instance. */
  type?: string;
  /** ComputeInstanceDataSourceProperties has a subset of Compute Instance properties that are useful at the Datasource level. */
  computeInstanceDatasourceProperties?: ComputeInstanceDataSourceProperties;
  /** Output only. CloudSqlInstanceDataSourceProperties has a subset of Cloud SQL Instance properties that are useful at the Datasource level. */
  cloudSqlInstanceDatasourceProperties?: CloudSqlInstanceDataSourceProperties;
  /** Output only. AlloyDBClusterDataSourceProperties has a subset of AlloyDB cluster properties that are useful at the Datasource level. Currently none of its child properties are auditable. If new auditable properties are added, the AUDIT annotation should be added. */
  alloyDbClusterDatasourceProperties?: AlloyDBClusterDataSourceProperties;
  /** DiskDataSourceProperties has a subset of Disk properties that are useful at the Datasource level. */
  diskDatasourceProperties?: DiskDataSourceProperties;
}

export const DataSourceGcpResource: Schema.Schema<DataSourceGcpResource> = Schema.suspend(() => Schema.Struct({
  gcpResourcename: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  computeInstanceDatasourceProperties: Schema.optional(ComputeInstanceDataSourceProperties),
  cloudSqlInstanceDatasourceProperties: Schema.optional(CloudSqlInstanceDataSourceProperties),
  alloyDbClusterDatasourceProperties: Schema.optional(AlloyDBClusterDataSourceProperties),
  diskDatasourceProperties: Schema.optional(DiskDataSourceProperties),
})).annotate({ identifier: "DataSourceGcpResource" }) as any as Schema.Schema<DataSourceGcpResource>;

export interface DataSourceBackupApplianceApplication {
  /** The name of the Application as known to the Backup Appliance. */
  applicationName?: string;
  /** Appliance name. */
  backupAppliance?: string;
  /** Appliance Id of the Backup Appliance. */
  applianceId?: string;
  /** The type of the application. e.g. VMBackup */
  type?: string;
  /** The appid field of the application within the Backup Appliance. */
  applicationId?: string;
  /** Hostname of the host where the application is running. */
  hostname?: string;
  /** Hostid of the application host. */
  hostId?: string;
}

export const DataSourceBackupApplianceApplication: Schema.Schema<DataSourceBackupApplianceApplication> = Schema.suspend(() => Schema.Struct({
  applicationName: Schema.optional(Schema.String),
  backupAppliance: Schema.optional(Schema.String),
  applianceId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  applicationId: Schema.optional(Schema.String),
  hostname: Schema.optional(Schema.String),
  hostId: Schema.optional(Schema.String),
})).annotate({ identifier: "DataSourceBackupApplianceApplication" }) as any as Schema.Schema<DataSourceBackupApplianceApplication>;

export interface DataSource {
  /** Output only. Identifier. Name of the datasource to create. It must have the format`"projects/{project}/locations/{location}/backupVaults/{backupvault}/dataSources/{datasource}"`. `{datasource}` cannot be changed after creation. It must be between 3-63 characters long and must be unique within the backup vault. */
  name?: string;
  /** Output only. The DataSource resource instance state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "ERROR" | (string & {});
  /** Optional. Resource labels to represent user provided metadata. No labels currently defined: */
  labels?: Record<string, string>;
  /** Output only. The time when the instance was created. */
  createTime?: string;
  /** Output only. The time when the instance was updated. */
  updateTime?: string;
  /** Number of backups in the data source. */
  backupCount?: string;
  /** Server specified ETag for the ManagementServer resource to prevent simultaneous updates from overwiting each other. */
  etag?: string;
  /** The number of bytes (metadata and data) stored in this datasource. */
  totalStoredBytes?: string;
  /** Output only. The backup configuration state. */
  configState?: "BACKUP_CONFIG_STATE_UNSPECIFIED" | "ACTIVE" | "PASSIVE" | (string & {});
  /** Output only. Details of how the resource is configured for backup. */
  backupConfigInfo?: BackupConfigInfo;
  /** The backed up resource is a Google Cloud resource. The word 'DataSource' was included in the names to indicate that this is the representation of the Google Cloud resource used within the DataSource object. */
  dataSourceGcpResource?: DataSourceGcpResource;
  /** The backed up resource is a backup appliance application. */
  dataSourceBackupApplianceApplication?: DataSourceBackupApplianceApplication;
  /** Output only. This field is set to true if the backup is blocked by vault access restriction. */
  backupBlockedByVaultAccessRestriction?: boolean;
}

export const DataSource: Schema.Schema<DataSource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  backupCount: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  totalStoredBytes: Schema.optional(Schema.String),
  configState: Schema.optional(Schema.String),
  backupConfigInfo: Schema.optional(BackupConfigInfo),
  dataSourceGcpResource: Schema.optional(DataSourceGcpResource),
  dataSourceBackupApplianceApplication: Schema.optional(DataSourceBackupApplianceApplication),
  backupBlockedByVaultAccessRestriction: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DataSource" }) as any as Schema.Schema<DataSource>;

export interface ListDataSourcesResponse {
  /** The list of DataSource instances in the project for the specified location. If the '{location}' value in the request is "-", the response contains a list of instances from all locations. In case any location is unreachable, the response will only return data sources in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. */
  dataSources?: Array<DataSource>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListDataSourcesResponse: Schema.Schema<ListDataSourcesResponse> = Schema.suspend(() => Schema.Struct({
  dataSources: Schema.optional(Schema.Array(DataSource)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListDataSourcesResponse" }) as any as Schema.Schema<ListDataSourcesResponse>;

export interface RemoveDataSourceRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const RemoveDataSourceRequest: Schema.Schema<RemoveDataSourceRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "RemoveDataSourceRequest" }) as any as Schema.Schema<RemoveDataSourceRequest>;

export interface SetInternalStatusRequest {
  /** Required. The value required for this method to work. This field must be the 32-byte SHA256 hash of the DataSourceID. The DataSourceID used here is only the final piece of the fully qualified resource path for this DataSource (i.e. the part after '.../dataSources/'). This field exists to make this method difficult to call since it is intended for use only by Backup Appliances. */
  value?: string;
  /** Required. Output only. The new BackupConfigState to set for the DataSource. */
  backupConfigState?: "BACKUP_CONFIG_STATE_UNSPECIFIED" | "ACTIVE" | "PASSIVE" | (string & {});
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const SetInternalStatusRequest: Schema.Schema<SetInternalStatusRequest> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  backupConfigState: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "SetInternalStatusRequest" }) as any as Schema.Schema<SetInternalStatusRequest>;

export interface InitiateBackupRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Resource ID of the Backup resource. */
  backupId?: string;
}

export const InitiateBackupRequest: Schema.Schema<InitiateBackupRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  backupId: Schema.optional(Schema.String),
})).annotate({ identifier: "InitiateBackupRequest" }) as any as Schema.Schema<InitiateBackupRequest>;

export interface InitiateBackupResponse {
  /** The name of the backup that was created. */
  backup?: string;
  /** The generation id of the new backup. */
  newBackupGenerationId?: number;
  /** The generation id of the base backup. It is needed for the incremental backups. */
  baseBackupGenerationId?: number;
}

export const InitiateBackupResponse: Schema.Schema<InitiateBackupResponse> = Schema.suspend(() => Schema.Struct({
  backup: Schema.optional(Schema.String),
  newBackupGenerationId: Schema.optional(Schema.Number),
  baseBackupGenerationId: Schema.optional(Schema.Number),
})).annotate({ identifier: "InitiateBackupResponse" }) as any as Schema.Schema<InitiateBackupResponse>;

export interface AbandonBackupRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const AbandonBackupRequest: Schema.Schema<AbandonBackupRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "AbandonBackupRequest" }) as any as Schema.Schema<AbandonBackupRequest>;

export interface FinalizeBackupRequest {
  /** This will be assigned to the description field of the newly created Backup. */
  description?: string;
  /** The point in time when this backup was captured from the source. This will be assigned to the consistency_time field of the newly created Backup. */
  consistencyTime?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Resource ID of the Backup resource to be finalized. This must be the same backup_id that was used in the InitiateBackupRequest. */
  backupId?: string;
  /** The earliest timestamp of data available in this Backup. This will set on the newly created Backup. */
  recoveryRangeStartTime?: string;
  /** The latest timestamp of data available in this Backup. This will be set on the newly created Backup. */
  recoveryRangeEndTime?: string;
  /** The ExpireTime on the backup will be set to FinalizeTime plus this duration. If the resulting ExpireTime is less than EnforcedRetentionEndTime, then ExpireTime is set to EnforcedRetentionEndTime. */
  retentionDuration?: string;
}

export const FinalizeBackupRequest: Schema.Schema<FinalizeBackupRequest> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  consistencyTime: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
  backupId: Schema.optional(Schema.String),
  recoveryRangeStartTime: Schema.optional(Schema.String),
  recoveryRangeEndTime: Schema.optional(Schema.String),
  retentionDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "FinalizeBackupRequest" }) as any as Schema.Schema<FinalizeBackupRequest>;

export interface FetchAccessTokenRequest {
  /** Required. The generation of the backup to update. */
  generationId?: number;
}

export const FetchAccessTokenRequest: Schema.Schema<FetchAccessTokenRequest> = Schema.suspend(() => Schema.Struct({
  generationId: Schema.optional(Schema.Number),
})).annotate({ identifier: "FetchAccessTokenRequest" }) as any as Schema.Schema<FetchAccessTokenRequest>;

export interface FetchAccessTokenResponse {
  /** The location in bucket that can be used for reading. */
  readLocation?: string;
  /** The location in bucket that can be used for writing. */
  writeLocation?: string;
  /** The downscoped token that was created. */
  token?: string;
  /** The token is valid until this time. */
  expireTime?: string;
}

export const FetchAccessTokenResponse: Schema.Schema<FetchAccessTokenResponse> = Schema.suspend(() => Schema.Struct({
  readLocation: Schema.optional(Schema.String),
  writeLocation: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchAccessTokenResponse" }) as any as Schema.Schema<FetchAccessTokenResponse>;

export interface BackupApplianceLockInfo {
  /** Required. The ID of the backup/recovery appliance that created this lock. */
  backupApplianceId?: string;
  /** Required. The name of the backup/recovery appliance that created this lock. */
  backupApplianceName?: string;
  /** Required. The reason for the lock: e.g. MOUNT/RESTORE/BACKUP/etc. The value of this string is only meaningful to the client and it is not interpreted by the BackupVault service. */
  lockReason?: string;
  /** The job name on the backup/recovery appliance that created this lock. */
  jobName?: string;
  /** The image name that depends on this Backup. */
  backupImage?: string;
  /** The SLA on the backup/recovery appliance that owns the lock. */
  slaId?: string;
}

export const BackupApplianceLockInfo: Schema.Schema<BackupApplianceLockInfo> = Schema.suspend(() => Schema.Struct({
  backupApplianceId: Schema.optional(Schema.String),
  backupApplianceName: Schema.optional(Schema.String),
  lockReason: Schema.optional(Schema.String),
  jobName: Schema.optional(Schema.String),
  backupImage: Schema.optional(Schema.String),
  slaId: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupApplianceLockInfo" }) as any as Schema.Schema<BackupApplianceLockInfo>;

export interface ServiceLockInfo {
  /** Output only. The name of the operation that created this lock. The lock will automatically be released when the operation completes. */
  operation?: string;
}

export const ServiceLockInfo: Schema.Schema<ServiceLockInfo> = Schema.suspend(() => Schema.Struct({
  operation: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceLockInfo" }) as any as Schema.Schema<ServiceLockInfo>;

export interface BackupLock {
  /** Required. The time after which this lock is not considered valid and will no longer protect the Backup from deletion. */
  lockUntilTime?: string;
  /** If the client is a backup and recovery appliance, this contains metadata about why the lock exists. */
  backupApplianceLockInfo?: BackupApplianceLockInfo;
  /** Output only. Contains metadata about the lock exist for Google Cloud native backups. */
  serviceLockInfo?: ServiceLockInfo;
}

export const BackupLock: Schema.Schema<BackupLock> = Schema.suspend(() => Schema.Struct({
  lockUntilTime: Schema.optional(Schema.String),
  backupApplianceLockInfo: Schema.optional(BackupApplianceLockInfo),
  serviceLockInfo: Schema.optional(ServiceLockInfo),
})).annotate({ identifier: "BackupLock" }) as any as Schema.Schema<BackupLock>;

export interface Tags {
  /** Optional. An array of tags. Each tag must be 1-63 characters long, and comply with RFC1035. */
  items?: Array<string>;
}

export const Tags: Schema.Schema<Tags> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Tags" }) as any as Schema.Schema<Tags>;

export interface AccessConfig {
  /** Optional. In accessConfigs (IPv4), the default and only option is ONE_TO_ONE_NAT. In ipv6AccessConfigs, the default and only option is DIRECT_IPV6. */
  type?: "ACCESS_TYPE_UNSPECIFIED" | "ONE_TO_ONE_NAT" | "DIRECT_IPV6" | (string & {});
  /** Optional. The name of this access configuration. */
  name?: string;
  /** Optional. The external IP address of this access configuration. */
  natIP?: string;
  /** Optional. The external IPv6 address of this access configuration. */
  externalIpv6?: string;
  /** Optional. The prefix length of the external IPv6 range. */
  externalIpv6PrefixLength?: number;
  /** Optional. Specifies whether a public DNS 'PTR' record should be created to map the external IP address of the instance to a DNS domain name. */
  setPublicPtr?: boolean;
  /** Optional. The DNS domain name for the public PTR record. */
  publicPtrDomainName?: string;
  /** Optional. This signifies the networking tier used for configuring this access */
  networkTier?: "NETWORK_TIER_UNSPECIFIED" | "PREMIUM" | "STANDARD" | (string & {});
}

export const AccessConfig: Schema.Schema<AccessConfig> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  natIP: Schema.optional(Schema.String),
  externalIpv6: Schema.optional(Schema.String),
  externalIpv6PrefixLength: Schema.optional(Schema.Number),
  setPublicPtr: Schema.optional(Schema.Boolean),
  publicPtrDomainName: Schema.optional(Schema.String),
  networkTier: Schema.optional(Schema.String),
})).annotate({ identifier: "AccessConfig" }) as any as Schema.Schema<AccessConfig>;

export interface AliasIpRange {
  /** Optional. The IP alias ranges to allocate for this interface. */
  ipCidrRange?: string;
  /** Optional. The name of a subnetwork secondary IP range from which to allocate an IP alias range. If not specified, the primary range of the subnetwork is used. */
  subnetworkRangeName?: string;
}

export const AliasIpRange: Schema.Schema<AliasIpRange> = Schema.suspend(() => Schema.Struct({
  ipCidrRange: Schema.optional(Schema.String),
  subnetworkRangeName: Schema.optional(Schema.String),
})).annotate({ identifier: "AliasIpRange" }) as any as Schema.Schema<AliasIpRange>;

export interface NetworkInterface {
  /** Optional. URL of the VPC network resource for this instance. */
  network?: string;
  /** Optional. The URL of the Subnetwork resource for this instance. */
  subnetwork?: string;
  /** Optional. An IPv4 internal IP address to assign to the instance for this network interface. If not specified by the user, an unused internal IP is assigned by the system. */
  networkIP?: string;
  /** Optional. An IPv6 internal network address for this network interface. To use a static internal IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an internal IPv6 address from the instance's subnetwork. */
  ipv6Address?: string;
  /** Optional. The prefix length of the primary internal IPv6 range. */
  internalIpv6PrefixLength?: number;
  /** Output only. [Output Only] The name of the network interface, which is generated by the server. */
  name?: string;
  /** Optional. An array of configurations for this interface. Currently, only one access config,ONE_TO_ONE_NAT is supported. If there are no accessConfigs specified, then this instance will have no external internet access. */
  accessConfigs?: Array<AccessConfig>;
  /** Optional. An array of IPv6 access configurations for this interface. Currently, only one IPv6 access config, DIRECT_IPV6, is supported. If there is no ipv6AccessConfig specified, then this instance will have no external IPv6 Internet access. */
  ipv6AccessConfigs?: Array<AccessConfig>;
  /** Optional. An array of alias IP ranges for this network interface. You can only specify this field for network interfaces in VPC networks. */
  aliasIpRanges?: Array<AliasIpRange>;
  /** The stack type for this network interface. */
  stackType?: "STACK_TYPE_UNSPECIFIED" | "IPV4_ONLY" | "IPV4_IPV6" | (string & {});
  /** Optional. [Output Only] One of EXTERNAL, INTERNAL to indicate whether the IP can be accessed from the Internet. This field is always inherited from its subnetwork. */
  ipv6AccessType?: "UNSPECIFIED_IPV6_ACCESS_TYPE" | "INTERNAL" | "EXTERNAL" | (string & {});
  /** Optional. The networking queue count that's specified by users for the network interface. Both Rx and Tx queues will be set to this number. It'll be empty if not specified by the users. */
  queueCount?: number;
  /** Optional. The type of vNIC to be used on this interface. This may be gVNIC or VirtioNet. */
  nicType?: "NIC_TYPE_UNSPECIFIED" | "VIRTIO_NET" | "GVNIC" | (string & {});
  /** Optional. The URL of the network attachment that this interface should connect to in the following format: projects/{project_number}/regions/{region_name}/networkAttachments/{network_attachment_name}. */
  networkAttachment?: string;
}

export const NetworkInterface: Schema.Schema<NetworkInterface> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
  networkIP: Schema.optional(Schema.String),
  ipv6Address: Schema.optional(Schema.String),
  internalIpv6PrefixLength: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  accessConfigs: Schema.optional(Schema.Array(AccessConfig)),
  ipv6AccessConfigs: Schema.optional(Schema.Array(AccessConfig)),
  aliasIpRanges: Schema.optional(Schema.Array(AliasIpRange)),
  stackType: Schema.optional(Schema.String),
  ipv6AccessType: Schema.optional(Schema.String),
  queueCount: Schema.optional(Schema.Number),
  nicType: Schema.optional(Schema.String),
  networkAttachment: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkInterface" }) as any as Schema.Schema<NetworkInterface>;

export interface InitializeParams {
  /** Optional. Specifies the disk name. If not specified, the default is to use the name of the instance. */
  diskName?: string;
  /** Optional. URL of the zone where the disk should be created. Required for each regional disk associated with the instance. */
  replicaZones?: Array<string>;
}

export const InitializeParams: Schema.Schema<InitializeParams> = Schema.suspend(() => Schema.Struct({
  diskName: Schema.optional(Schema.String),
  replicaZones: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "InitializeParams" }) as any as Schema.Schema<InitializeParams>;

export interface GuestOsFeature {
  /** The ID of a supported feature. */
  type?: "FEATURE_TYPE_UNSPECIFIED" | "VIRTIO_SCSI_MULTIQUEUE" | "WINDOWS" | "MULTI_IP_SUBNET" | "UEFI_COMPATIBLE" | "SECURE_BOOT" | "GVNIC" | "SEV_CAPABLE" | "BARE_METAL_LINUX_COMPATIBLE" | "SUSPEND_RESUME_COMPATIBLE" | "SEV_LIVE_MIGRATABLE" | "SEV_SNP_CAPABLE" | "TDX_CAPABLE" | "IDPF" | "SEV_LIVE_MIGRATABLE_V2" | (string & {});
}

export const GuestOsFeature: Schema.Schema<GuestOsFeature> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GuestOsFeature" }) as any as Schema.Schema<GuestOsFeature>;

export interface CustomerEncryptionKey {
  /** Optional. Specifies a 256-bit customer-supplied encryption key. */
  rawKey?: string;
  /** Optional. RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. */
  rsaEncryptedKey?: string;
  /** Optional. The name of the encryption key that is stored in Google Cloud KMS. */
  kmsKeyName?: string;
  /** Optional. The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. */
  kmsKeyServiceAccount?: string;
}

export const CustomerEncryptionKey: Schema.Schema<CustomerEncryptionKey> = Schema.suspend(() => Schema.Struct({
  rawKey: Schema.optional(Schema.String),
  rsaEncryptedKey: Schema.optional(Schema.String),
  kmsKeyName: Schema.optional(Schema.String),
  kmsKeyServiceAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomerEncryptionKey" }) as any as Schema.Schema<CustomerEncryptionKey>;

export interface AttachedDisk {
  /** Optional. Specifies the parameters to initialize this disk. */
  initializeParams?: InitializeParams;
  /** Optional. This is used as an identifier for the disks. This is the unique name has to provided to modify disk parameters like disk_name and replica_zones (in case of RePDs) */
  deviceName?: string;
  /** Optional. Type of the resource. */
  kind?: string;
  /** Specifies the type of the disk. */
  diskTypeDeprecated?: "DISK_TYPE_UNSPECIFIED" | "SCRATCH" | "PERSISTENT" | (string & {});
  /** Optional. The mode in which to attach this disk. */
  mode?: "DISK_MODE_UNSPECIFIED" | "READ_WRITE" | "READ_ONLY" | "LOCKED" | (string & {});
  /** Optional. Specifies a valid partial or full URL to an existing Persistent Disk resource. */
  source?: string;
  /** Optional. A zero-based index to this disk, where 0 is reserved for the boot disk. */
  index?: string;
  /** Optional. Indicates that this is a boot disk. The virtual machine will use the first partition of the disk for its root filesystem. */
  boot?: boolean;
  /** Optional. Specifies whether the disk will be auto-deleted when the instance is deleted (but not when the disk is detached from the instance). */
  autoDelete?: boolean;
  /** Optional. Any valid publicly visible licenses. */
  license?: Array<string>;
  /** Optional. Specifies the disk interface to use for attaching this disk. */
  diskInterface?: "DISK_INTERFACE_UNSPECIFIED" | "SCSI" | "NVME" | "NVDIMM" | "ISCSI" | (string & {});
  /** Optional. A list of features to enable on the guest operating system. Applicable only for bootable images. */
  guestOsFeature?: Array<GuestOsFeature>;
  /** Optional. Encrypts or decrypts a disk using a customer-supplied encryption key. */
  diskEncryptionKey?: CustomerEncryptionKey;
  /** Optional. The size of the disk in GB. */
  diskSizeGb?: string;
  /** Optional. Output only. The state of the disk. */
  savedState?: "DISK_SAVED_STATE_UNSPECIFIED" | "PRESERVED" | (string & {});
  /** Optional. Output only. The URI of the disk type resource. For example: projects/project/zones/zone/diskTypes/pd-standard or pd-ssd */
  diskType?: string;
  /** Optional. Specifies the type of the disk. */
  type?: "DISK_TYPE_UNSPECIFIED" | "SCRATCH" | "PERSISTENT" | (string & {});
}

export const AttachedDisk: Schema.Schema<AttachedDisk> = Schema.suspend(() => Schema.Struct({
  initializeParams: Schema.optional(InitializeParams),
  deviceName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  diskTypeDeprecated: Schema.optional(Schema.String),
  mode: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  index: Schema.optional(Schema.String),
  boot: Schema.optional(Schema.Boolean),
  autoDelete: Schema.optional(Schema.Boolean),
  license: Schema.optional(Schema.Array(Schema.String)),
  diskInterface: Schema.optional(Schema.String),
  guestOsFeature: Schema.optional(Schema.Array(GuestOsFeature)),
  diskEncryptionKey: Schema.optional(CustomerEncryptionKey),
  diskSizeGb: Schema.optional(Schema.String),
  savedState: Schema.optional(Schema.String),
  diskType: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "AttachedDisk" }) as any as Schema.Schema<AttachedDisk>;

export interface Entry {
  /** Optional. Key for the metadata entry. */
  key?: string;
  /** Optional. Value for the metadata entry. These are free-form strings, and only have meaning as interpreted by the image running in the instance. The only restriction placed on values is that their size must be less than or equal to 262144 bytes (256 KiB). */
  value?: string;
}

export const Entry: Schema.Schema<Entry> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "Entry" }) as any as Schema.Schema<Entry>;

export interface Metadata {
  /** Optional. Array of key/value pairs. The total size of all keys and values must be less than 512 KB. */
  items?: Array<Entry>;
}

export const Metadata: Schema.Schema<Metadata> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Entry)),
})).annotate({ identifier: "Metadata" }) as any as Schema.Schema<Metadata>;

export interface ServiceAccount {
  /** Optional. Email address of the service account. */
  email?: string;
  /** Optional. The list of scopes to be made available for this service account. */
  scopes?: Array<string>;
}

export const ServiceAccount: Schema.Schema<ServiceAccount> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ServiceAccount" }) as any as Schema.Schema<ServiceAccount>;

export interface NodeAffinity {
  /** Optional. Corresponds to the label key of Node resource. */
  key?: string;
  /** Optional. Defines the operation of node selection. */
  operator?: "OPERATOR_UNSPECIFIED" | "IN" | "NOT_IN" | (string & {});
  /** Optional. Corresponds to the label values of Node resource. */
  values?: Array<string>;
}

export const NodeAffinity: Schema.Schema<NodeAffinity> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  operator: Schema.optional(Schema.String),
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "NodeAffinity" }) as any as Schema.Schema<NodeAffinity>;

export interface SchedulingDuration {
  /** Optional. Span of time at a resolution of a second. */
  seconds?: string;
  /** Optional. Span of time that's a fraction of a second at nanosecond resolution. */
  nanos?: number;
}

export const SchedulingDuration: Schema.Schema<SchedulingDuration> = Schema.suspend(() => Schema.Struct({
  seconds: Schema.optional(Schema.String),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "SchedulingDuration" }) as any as Schema.Schema<SchedulingDuration>;

export interface Scheduling {
  /** Optional. Defines the maintenance behavior for this instance. */
  onHostMaintenance?: "ON_HOST_MAINTENANCE_UNSPECIFIED" | "TERMINATE" | "MIGRATE" | (string & {});
  /** Optional. Specifies whether the instance should be automatically restarted if it is terminated by Compute Engine (not terminated by a user). */
  automaticRestart?: boolean;
  /** Optional. Defines whether the instance is preemptible. */
  preemptible?: boolean;
  /** Optional. A set of node affinity and anti-affinity configurations. Overrides reservationAffinity. */
  nodeAffinities?: Array<NodeAffinity>;
  /** Optional. The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node. */
  minNodeCpus?: number;
  /** Optional. Specifies the provisioning model of the instance. */
  provisioningModel?: "PROVISIONING_MODEL_UNSPECIFIED" | "STANDARD" | "SPOT" | (string & {});
  /** Optional. Specifies the termination action for the instance. */
  instanceTerminationAction?: "INSTANCE_TERMINATION_ACTION_UNSPECIFIED" | "DELETE" | "STOP" | (string & {});
  /** Optional. Specifies the maximum amount of time a Local Ssd Vm should wait while recovery of the Local Ssd state is attempted. Its value should be in between 0 and 168 hours with hour granularity and the default value being 1 hour. */
  localSsdRecoveryTimeout?: SchedulingDuration;
}

export const Scheduling: Schema.Schema<Scheduling> = Schema.suspend(() => Schema.Struct({
  onHostMaintenance: Schema.optional(Schema.String),
  automaticRestart: Schema.optional(Schema.Boolean),
  preemptible: Schema.optional(Schema.Boolean),
  nodeAffinities: Schema.optional(Schema.Array(NodeAffinity)),
  minNodeCpus: Schema.optional(Schema.Number),
  provisioningModel: Schema.optional(Schema.String),
  instanceTerminationAction: Schema.optional(Schema.String),
  localSsdRecoveryTimeout: Schema.optional(SchedulingDuration),
})).annotate({ identifier: "Scheduling" }) as any as Schema.Schema<Scheduling>;

export interface AcceleratorConfig {
  /** Optional. Full or partial URL of the accelerator type resource to attach to this instance. */
  acceleratorType?: string;
  /** Optional. The number of the guest accelerator cards exposed to this instance. */
  acceleratorCount?: number;
}

export const AcceleratorConfig: Schema.Schema<AcceleratorConfig> = Schema.suspend(() => Schema.Struct({
  acceleratorType: Schema.optional(Schema.String),
  acceleratorCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "AcceleratorConfig" }) as any as Schema.Schema<AcceleratorConfig>;

export interface ComputeInstanceBackupProperties {
  /** An optional text description for the instances that are created from these properties. */
  description?: string;
  /** A list of tags to apply to the instances that are created from these properties. The tags identify valid sources or targets for network firewalls. The setTags method can modify this list of tags. Each tag within the list must comply with RFC1035 (https://www.ietf.org/rfc/rfc1035.txt). */
  tags?: Tags;
  /** The machine type to use for instances that are created from these properties. */
  machineType?: string;
  /** Enables instances created based on these properties to send packets with source IP addresses other than their own and receive packets with destination IP addresses other than their own. If these instances will be used as an IP gateway or it will be set as the next-hop in a Route resource, specify `true`. If unsure, leave this set to `false`. See the https://cloud.google.com/vpc/docs/using-routes#canipforward documentation for more information. */
  canIpForward?: boolean;
  /** An array of network access configurations for this interface. */
  networkInterface?: Array<NetworkInterface>;
  /** An array of disks that are associated with the instances that are created from these properties. */
  disk?: Array<AttachedDisk>;
  /** The metadata key/value pairs to assign to instances that are created from these properties. These pairs can consist of custom metadata or predefined keys. See https://cloud.google.com/compute/docs/metadata/overview for more information. */
  metadata?: Metadata;
  /** A list of service accounts with specified scopes. Access tokens for these service accounts are available to the instances that are created from these properties. Use metadata queries to obtain the access tokens for these instances. */
  serviceAccount?: Array<ServiceAccount>;
  /** Specifies the scheduling options for the instances that are created from these properties. */
  scheduling?: Scheduling;
  /** A list of guest accelerator cards' type and count to use for instances created from these properties. */
  guestAccelerator?: Array<AcceleratorConfig>;
  /** Minimum cpu/platform to be used by instances. The instance may be scheduled on the specified or newer cpu/platform. Applicable values are the friendly names of CPU platforms, such as `minCpuPlatform: Intel Haswell` or `minCpuPlatform: Intel Sandy Bridge`. For more information, read https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform. */
  minCpuPlatform?: string;
  /** KeyRevocationActionType of the instance. Supported options are "STOP" and "NONE". The default value is "NONE" if it is not specified. */
  keyRevocationActionType?: "KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED" | "NONE" | "STOP" | (string & {});
  /** The source instance used to create this backup. This can be a partial or full URL to the resource. For example, the following are valid values: -https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/instance -projects/project/zones/zone/instances/instance */
  sourceInstance?: string;
  /** Labels to apply to instances that are created from these properties. */
  labels?: Record<string, string>;
}

export const ComputeInstanceBackupProperties: Schema.Schema<ComputeInstanceBackupProperties> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  tags: Schema.optional(Tags),
  machineType: Schema.optional(Schema.String),
  canIpForward: Schema.optional(Schema.Boolean),
  networkInterface: Schema.optional(Schema.Array(NetworkInterface)),
  disk: Schema.optional(Schema.Array(AttachedDisk)),
  metadata: Schema.optional(Metadata),
  serviceAccount: Schema.optional(Schema.Array(ServiceAccount)),
  scheduling: Schema.optional(Scheduling),
  guestAccelerator: Schema.optional(Schema.Array(AcceleratorConfig)),
  minCpuPlatform: Schema.optional(Schema.String),
  keyRevocationActionType: Schema.optional(Schema.String),
  sourceInstance: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "ComputeInstanceBackupProperties" }) as any as Schema.Schema<ComputeInstanceBackupProperties>;

export interface CloudSqlInstanceBackupProperties {
  /** Output only. The installed database version of the Cloud SQL instance when the backup was taken. */
  databaseInstalledVersion?: string;
  /** Output only. Whether the backup is a final backup. */
  finalBackup?: boolean;
  /** Output only. The source instance of the backup. Format: projects/{project}/instances/{instance} */
  sourceInstance?: string;
  /** Output only. The instance creation timestamp. */
  instanceCreateTime?: string;
  /** Output only. The tier (or machine type) for this instance. Example: `db-custom-1-3840` */
  instanceTier?: string;
  /** Output only. The instance delete timestamp. */
  instanceDeleteTime?: string;
}

export const CloudSqlInstanceBackupProperties: Schema.Schema<CloudSqlInstanceBackupProperties> = Schema.suspend(() => Schema.Struct({
  databaseInstalledVersion: Schema.optional(Schema.String),
  finalBackup: Schema.optional(Schema.Boolean),
  sourceInstance: Schema.optional(Schema.String),
  instanceCreateTime: Schema.optional(Schema.String),
  instanceTier: Schema.optional(Schema.String),
  instanceDeleteTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudSqlInstanceBackupProperties" }) as any as Schema.Schema<CloudSqlInstanceBackupProperties>;

export interface BackupApplianceBackupProperties {
  /** Output only. The numeric generation ID of the backup (monotonically increasing). */
  generationId?: number;
  /** Output only. The time when this backup object was finalized (if none, backup is not finalized). */
  finalizeTime?: string;
  /** Optional. The earliest timestamp of data available in this Backup. */
  recoveryRangeStartTime?: string;
  /** Optional. The latest timestamp of data available in this Backup. */
  recoveryRangeEndTime?: string;
}

export const BackupApplianceBackupProperties: Schema.Schema<BackupApplianceBackupProperties> = Schema.suspend(() => Schema.Struct({
  generationId: Schema.optional(Schema.Number),
  finalizeTime: Schema.optional(Schema.String),
  recoveryRangeStartTime: Schema.optional(Schema.String),
  recoveryRangeEndTime: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupApplianceBackupProperties" }) as any as Schema.Schema<BackupApplianceBackupProperties>;

export interface AlloyDbClusterBackupProperties {
  /** An optional text description for the backup. */
  description?: string;
  /** Output only. Storage usage of this particular backup */
  storedBytes?: string;
  /** Output only. The chain id of this backup. Backups belonging to the same chain are sharing the same chain id. This property is calculated and maintained by BackupDR. */
  chainId?: string;
  /** Output only. The PostgreSQL major version of the AlloyDB cluster when the backup was taken. */
  databaseVersion?: string;
}

export const AlloyDbClusterBackupProperties: Schema.Schema<AlloyDbClusterBackupProperties> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  storedBytes: Schema.optional(Schema.String),
  chainId: Schema.optional(Schema.String),
  databaseVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "AlloyDbClusterBackupProperties" }) as any as Schema.Schema<AlloyDbClusterBackupProperties>;

export interface DiskBackupProperties {
  /** A description of the source disk. */
  description?: string;
  /** A list of publicly available licenses that are applicable to this backup. This is applicable if the original image had licenses attached, e.g. Windows image. */
  licenses?: Array<string>;
  /** A list of guest OS features that are applicable to this backup. */
  guestOsFeature?: Array<GuestOsFeature>;
  /** The architecture of the source disk. Valid values are ARM64 or X86_64. */
  architecture?: "ARCHITECTURE_UNSPECIFIED" | "X86_64" | "ARM64" | (string & {});
  /** The URL of the type of the disk. */
  type?: string;
  /** Size(in GB) of the source disk. */
  sizeGb?: string;
  /** Region and zone are mutually exclusive fields. The URL of the region of the source disk. */
  region?: string;
  /** The URL of the Zone where the source disk. */
  zone?: string;
  /** The URL of the Zones where the source disk should be replicated. */
  replicaZones?: Array<string>;
  /** The source disk used to create this backup. */
  sourceDisk?: string;
  /** The access mode of the source disk. */
  accessMode?: string;
  /** The number of IOPS provisioned for the source disk. */
  provisionedIops?: string;
  /** The number of throughput provisioned for the source disk. */
  provisionedThroughput?: string;
  /** The physical block size of the source disk. */
  physicalBlockSizeBytes?: string;
  /** Indicates whether the source disk is using confidential compute mode. */
  enableConfidentialCompute?: boolean;
  /** The storage pool of the source disk. */
  storagePool?: string;
  /** The labels of the source disk. */
  labels?: Record<string, string>;
}

export const DiskBackupProperties: Schema.Schema<DiskBackupProperties> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  licenses: Schema.optional(Schema.Array(Schema.String)),
  guestOsFeature: Schema.optional(Schema.Array(GuestOsFeature)),
  architecture: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  sizeGb: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  replicaZones: Schema.optional(Schema.Array(Schema.String)),
  sourceDisk: Schema.optional(Schema.String),
  accessMode: Schema.optional(Schema.String),
  provisionedIops: Schema.optional(Schema.String),
  provisionedThroughput: Schema.optional(Schema.String),
  physicalBlockSizeBytes: Schema.optional(Schema.String),
  enableConfidentialCompute: Schema.optional(Schema.Boolean),
  storagePool: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "DiskBackupProperties" }) as any as Schema.Schema<DiskBackupProperties>;

export interface GCPBackupPlanInfo {
  /** Resource name of backup plan by which workload is protected at the time of the backup. Format: projects/{project}/locations/{location}/backupPlans/{backupPlanId} */
  backupPlan?: string;
  /** The rule id of the backup plan which triggered this backup in case of scheduled backup or used for */
  backupPlanRuleId?: string;
  /** Resource name of the backup plan revision which triggered this backup in case of scheduled backup or used for on demand backup. Format: projects/{project}/locations/{location}/backupPlans/{backupPlanId}/revisions/{revisionId} */
  backupPlanRevisionName?: string;
  /** The user friendly id of the backup plan revision which triggered this backup in case of scheduled backup or used for on demand backup. */
  backupPlanRevisionId?: string;
}

export const GCPBackupPlanInfo: Schema.Schema<GCPBackupPlanInfo> = Schema.suspend(() => Schema.Struct({
  backupPlan: Schema.optional(Schema.String),
  backupPlanRuleId: Schema.optional(Schema.String),
  backupPlanRevisionName: Schema.optional(Schema.String),
  backupPlanRevisionId: Schema.optional(Schema.String),
})).annotate({ identifier: "GCPBackupPlanInfo" }) as any as Schema.Schema<GCPBackupPlanInfo>;

export interface BackupGcpResource {
  /** Name of the Google Cloud resource. */
  gcpResourcename?: string;
  /** Location of the resource: //"global"/"unspecified". */
  location?: string;
  /** Type of the resource. Use the Unified Resource Type, eg. compute.googleapis.com/Instance. */
  type?: string;
}

export const BackupGcpResource: Schema.Schema<BackupGcpResource> = Schema.suspend(() => Schema.Struct({
  gcpResourcename: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupGcpResource" }) as any as Schema.Schema<BackupGcpResource>;

export interface Backup {
  /** Output only. Identifier. Name of the backup to create. It must have the format`"projects//locations//backupVaults//dataSources/{datasource}/backups/{backup}"`. `{backup}` cannot be changed after creation. It must be between 3-63 characters long and must be unique within the datasource. */
  name?: string;
  /** Output only. The description of the Backup instance (2048 characters or less). */
  description?: string;
  /** Output only. The time when the instance was created. */
  createTime?: string;
  /** Output only. The time when the instance was updated. */
  updateTime?: string;
  /** Optional. Resource labels to represent user provided metadata. No labels currently defined. */
  labels?: Record<string, string>;
  /** Optional. The backup can not be deleted before this time. */
  enforcedRetentionEndTime?: string;
  /** Output only. Setting for how the enforced retention end time is inherited. This value is copied from this backup's BackupVault. */
  backupRetentionInheritance?: "BACKUP_RETENTION_INHERITANCE_UNSPECIFIED" | "INHERIT_VAULT_RETENTION" | "MATCH_BACKUP_EXPIRE_TIME" | (string & {});
  /** Optional. When this backup is automatically expired. */
  expireTime?: string;
  /** Output only. The point in time when this backup was captured from the source. */
  consistencyTime?: string;
  /** Optional. Server specified ETag to prevent updates from overwriting each other. */
  etag?: string;
  /** Output only. The Backup resource instance state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "ERROR" | "UPLOADING" | (string & {});
  /** Output only. The list of BackupLocks taken by the service to prevent the deletion of the backup. */
  serviceLocks?: Array<BackupLock>;
  /** Optional. The list of BackupLocks taken by the accessor Backup Appliance. */
  backupApplianceLocks?: Array<BackupLock>;
  /** Output only. Compute Engine specific backup properties. */
  computeInstanceBackupProperties?: ComputeInstanceBackupProperties;
  /** Output only. Cloud SQL specific backup properties. */
  cloudSqlInstanceBackupProperties?: CloudSqlInstanceBackupProperties;
  /** Output only. Backup Appliance specific backup properties. */
  backupApplianceBackupProperties?: BackupApplianceBackupProperties;
  /** Output only. AlloyDB specific backup properties. */
  alloyDbBackupProperties?: AlloyDbClusterBackupProperties;
  /** Output only. Disk specific backup properties. */
  diskBackupProperties?: DiskBackupProperties;
  /** Output only. Type of the backup, unspecified, scheduled or ondemand. */
  backupType?: "BACKUP_TYPE_UNSPECIFIED" | "SCHEDULED" | "ON_DEMAND" | "ON_DEMAND_OPERATIONAL" | (string & {});
  /** Output only. Configuration for a Google Cloud resource. */
  gcpBackupPlanInfo?: GCPBackupPlanInfo;
  /** Output only. source resource size in bytes at the time of the backup. */
  resourceSizeBytes?: string;
  /** Optional. Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Optional. Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Output only. Unique identifier of the GCP resource that is being backed up. */
  gcpResource?: BackupGcpResource;
  /** Optional. Output only. The list of KMS key versions used to encrypt the backup. */
  kmsKeyVersions?: Array<string>;
}

export const Backup: Schema.Schema<Backup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  enforcedRetentionEndTime: Schema.optional(Schema.String),
  backupRetentionInheritance: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  consistencyTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  serviceLocks: Schema.optional(Schema.Array(BackupLock)),
  backupApplianceLocks: Schema.optional(Schema.Array(BackupLock)),
  computeInstanceBackupProperties: Schema.optional(ComputeInstanceBackupProperties),
  cloudSqlInstanceBackupProperties: Schema.optional(CloudSqlInstanceBackupProperties),
  backupApplianceBackupProperties: Schema.optional(BackupApplianceBackupProperties),
  alloyDbBackupProperties: Schema.optional(AlloyDbClusterBackupProperties),
  diskBackupProperties: Schema.optional(DiskBackupProperties),
  backupType: Schema.optional(Schema.String),
  gcpBackupPlanInfo: Schema.optional(GCPBackupPlanInfo),
  resourceSizeBytes: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  gcpResource: Schema.optional(BackupGcpResource),
  kmsKeyVersions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Backup" }) as any as Schema.Schema<Backup>;

export interface ListBackupsResponse {
  /** The list of Backup instances in the project for the specified location. If the '{location}' value in the request is "-", the response contains a list of instances from all locations. In case any location is unreachable, the response will only return data sources in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. */
  backups?: Array<Backup>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackupsResponse: Schema.Schema<ListBackupsResponse> = Schema.suspend(() => Schema.Struct({
  backups: Schema.optional(Schema.Array(Backup)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBackupsResponse" }) as any as Schema.Schema<ListBackupsResponse>;

export interface FetchBackupsForResourceTypeResponse {
  /** The Backups from the specified parent. */
  backups?: Array<Backup>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const FetchBackupsForResourceTypeResponse: Schema.Schema<FetchBackupsForResourceTypeResponse> = Schema.suspend(() => Schema.Struct({
  backups: Schema.optional(Schema.Array(Backup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchBackupsForResourceTypeResponse" }) as any as Schema.Schema<FetchBackupsForResourceTypeResponse>;

export interface ComputeInstanceTargetEnvironment {
  /** Required. Target project for the Compute Engine instance. */
  project?: string;
  /** Required. The zone of the Compute Engine instance. */
  zone?: string;
}

export const ComputeInstanceTargetEnvironment: Schema.Schema<ComputeInstanceTargetEnvironment> = Schema.suspend(() => Schema.Struct({
  project: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
})).annotate({ identifier: "ComputeInstanceTargetEnvironment" }) as any as Schema.Schema<ComputeInstanceTargetEnvironment>;

export interface DiskTargetEnvironment {
  /** Required. Target project for the disk. */
  project?: string;
  /** Required. Target zone for the disk. */
  zone?: string;
}

export const DiskTargetEnvironment: Schema.Schema<DiskTargetEnvironment> = Schema.suspend(() => Schema.Struct({
  project: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
})).annotate({ identifier: "DiskTargetEnvironment" }) as any as Schema.Schema<DiskTargetEnvironment>;

export interface RegionDiskTargetEnvironment {
  /** Required. Target project for the disk. */
  project?: string;
  /** Required. Target region for the disk. */
  region?: string;
  /** Required. Target URLs of the replica zones for the disk. */
  replicaZones?: Array<string>;
}

export const RegionDiskTargetEnvironment: Schema.Schema<RegionDiskTargetEnvironment> = Schema.suspend(() => Schema.Struct({
  project: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  replicaZones: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RegionDiskTargetEnvironment" }) as any as Schema.Schema<RegionDiskTargetEnvironment>;

export interface AdvancedMachineFeatures {
  /** Optional. Whether to enable nested virtualization or not (default is false). */
  enableNestedVirtualization?: boolean;
  /** Optional. The number of threads per physical core. To disable simultaneous multithreading (SMT) set this to 1. If unset, the maximum number of threads supported per core by the underlying processor is assumed. */
  threadsPerCore?: number;
  /** Optional. The number of physical cores to expose to an instance. Multiply by the number of threads per core to compute the total number of virtual CPUs to expose to the instance. If unset, the number of cores is inferred from the instance's nominal CPU count and the underlying platform's SMT width. */
  visibleCoreCount?: number;
  /** Optional. Whether to enable UEFI networking for instance creation. */
  enableUefiNetworking?: boolean;
}

export const AdvancedMachineFeatures: Schema.Schema<AdvancedMachineFeatures> = Schema.suspend(() => Schema.Struct({
  enableNestedVirtualization: Schema.optional(Schema.Boolean),
  threadsPerCore: Schema.optional(Schema.Number),
  visibleCoreCount: Schema.optional(Schema.Number),
  enableUefiNetworking: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AdvancedMachineFeatures" }) as any as Schema.Schema<AdvancedMachineFeatures>;

export interface ConfidentialInstanceConfig {
  /** Optional. Defines whether the instance should have confidential compute enabled. */
  enableConfidentialCompute?: boolean;
}

export const ConfidentialInstanceConfig: Schema.Schema<ConfidentialInstanceConfig> = Schema.suspend(() => Schema.Struct({
  enableConfidentialCompute: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ConfidentialInstanceConfig" }) as any as Schema.Schema<ConfidentialInstanceConfig>;

export interface DisplayDevice {
  /** Optional. Enables display for the Compute Engine VM */
  enableDisplay?: boolean;
}

export const DisplayDevice: Schema.Schema<DisplayDevice> = Schema.suspend(() => Schema.Struct({
  enableDisplay: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DisplayDevice" }) as any as Schema.Schema<DisplayDevice>;

export interface NetworkPerformanceConfig {
  /** Optional. The tier of the total egress bandwidth. */
  totalEgressBandwidthTier?: "TIER_UNSPECIFIED" | "DEFAULT" | "TIER_1" | (string & {});
}

export const NetworkPerformanceConfig: Schema.Schema<NetworkPerformanceConfig> = Schema.suspend(() => Schema.Struct({
  totalEgressBandwidthTier: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkPerformanceConfig" }) as any as Schema.Schema<NetworkPerformanceConfig>;

export interface InstanceParams {
  /** Optional. Resource manager tags to be bound to the instance. */
  resourceManagerTags?: Record<string, string>;
}

export const InstanceParams: Schema.Schema<InstanceParams> = Schema.suspend(() => Schema.Struct({
  resourceManagerTags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "InstanceParams" }) as any as Schema.Schema<InstanceParams>;

export interface AllocationAffinity {
  /** Optional. Specifies the type of reservation from which this instance can consume */
  consumeReservationType?: "TYPE_UNSPECIFIED" | "NO_RESERVATION" | "ANY_RESERVATION" | "SPECIFIC_RESERVATION" | (string & {});
  /** Optional. Corresponds to the label key of a reservation resource. */
  key?: string;
  /** Optional. Corresponds to the label values of a reservation resource. */
  values?: Array<string>;
}

export const AllocationAffinity: Schema.Schema<AllocationAffinity> = Schema.suspend(() => Schema.Struct({
  consumeReservationType: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AllocationAffinity" }) as any as Schema.Schema<AllocationAffinity>;

export interface ComputeInstanceRestoreProperties {
  /** Required. Name of the compute instance. */
  name?: string;
  /** Optional. Controls for advanced machine-related behavior features. */
  advancedMachineFeatures?: AdvancedMachineFeatures;
  /** Optional. Allows this instance to send and receive packets with non-matching destination or source IPs. */
  canIpForward?: boolean;
  /** Optional. Controls Confidential compute options on the instance */
  confidentialInstanceConfig?: ConfidentialInstanceConfig;
  /** Optional. Whether the resource should be protected against deletion. */
  deletionProtection?: boolean;
  /** Optional. An optional description of this resource. Provide this property when you create the resource. */
  description?: string;
  /** Optional. Array of disks associated with this instance. Persistent disks must be created before you can assign them. Source regional persistent disks will be restored with default replica zones if not specified. */
  disks?: Array<AttachedDisk>;
  /** Optional. Enables display device for the instance. */
  displayDevice?: DisplayDevice;
  /** Optional. A list of the type and count of accelerator cards attached to the instance. */
  guestAccelerators?: Array<AcceleratorConfig>;
  /** Optional. Specifies the hostname of the instance. The specified hostname must be RFC1035 compliant. If hostname is not specified, the default hostname is [INSTANCE_NAME].c.[PROJECT_ID].internal when using the global DNS, and [INSTANCE_NAME].[ZONE].c.[PROJECT_ID].internal when using zonal DNS. */
  hostname?: string;
  /** Optional. Encrypts suspended data for an instance with a customer-managed encryption key. */
  instanceEncryptionKey?: CustomerEncryptionKey;
  /** Optional. KeyRevocationActionType of the instance. */
  keyRevocationActionType?: "KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED" | "NONE" | "STOP" | (string & {});
  /** Optional. Labels to apply to this instance. */
  labels?: Record<string, string>;
  /** Optional. Full or partial URL of the machine type resource to use for this instance. */
  machineType?: string;
  /** Optional. This includes custom metadata and predefined keys. */
  metadata?: Metadata;
  /** Optional. Minimum CPU platform to use for this instance. */
  minCpuPlatform?: string;
  /** Optional. An array of network configurations for this instance. These specify how interfaces are configured to interact with other network services, such as connecting to the internet. Multiple interfaces are supported per instance. Required to restore in different project or region. */
  networkInterfaces?: Array<NetworkInterface>;
  /** Optional. Configure network performance such as egress bandwidth tier. */
  networkPerformanceConfig?: NetworkPerformanceConfig;
  /** Input only. Additional params passed with the request, but not persisted as part of resource payload. */
  params?: InstanceParams;
  /** Optional. The private IPv6 google access type for the VM. If not specified, use INHERIT_FROM_SUBNETWORK as default. */
  privateIpv6GoogleAccess?: "INSTANCE_PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED" | "INHERIT_FROM_SUBNETWORK" | "ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE" | "ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE" | (string & {});
  /** Optional. Specifies the reservations that this instance can consume from. */
  reservationAffinity?: AllocationAffinity;
  /** Optional. Resource policies applied to this instance. By default, no resource policies will be applied. */
  resourcePolicies?: Array<string>;
  /** Optional. Sets the scheduling options for this instance. */
  scheduling?: Scheduling;
  /** Optional. A list of service accounts, with their specified scopes, authorized for this instance. Only one service account per VM instance is supported. */
  serviceAccounts?: Array<ServiceAccount>;
  /** Optional. Tags to apply to this instance. Tags are used to identify valid sources or targets for network firewalls and are specified by the client during instance creation. */
  tags?: Tags;
}

export const ComputeInstanceRestoreProperties: Schema.Schema<ComputeInstanceRestoreProperties> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  advancedMachineFeatures: Schema.optional(AdvancedMachineFeatures),
  canIpForward: Schema.optional(Schema.Boolean),
  confidentialInstanceConfig: Schema.optional(ConfidentialInstanceConfig),
  deletionProtection: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
  disks: Schema.optional(Schema.Array(AttachedDisk)),
  displayDevice: Schema.optional(DisplayDevice),
  guestAccelerators: Schema.optional(Schema.Array(AcceleratorConfig)),
  hostname: Schema.optional(Schema.String),
  instanceEncryptionKey: Schema.optional(CustomerEncryptionKey),
  keyRevocationActionType: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  machineType: Schema.optional(Schema.String),
  metadata: Schema.optional(Metadata),
  minCpuPlatform: Schema.optional(Schema.String),
  networkInterfaces: Schema.optional(Schema.Array(NetworkInterface)),
  networkPerformanceConfig: Schema.optional(NetworkPerformanceConfig),
  params: Schema.optional(InstanceParams),
  privateIpv6GoogleAccess: Schema.optional(Schema.String),
  reservationAffinity: Schema.optional(AllocationAffinity),
  resourcePolicies: Schema.optional(Schema.Array(Schema.String)),
  scheduling: Schema.optional(Scheduling),
  serviceAccounts: Schema.optional(Schema.Array(ServiceAccount)),
  tags: Schema.optional(Tags),
})).annotate({ identifier: "ComputeInstanceRestoreProperties" }) as any as Schema.Schema<ComputeInstanceRestoreProperties>;

export interface DiskRestoreProperties {
  /** Required. Name of the disk. */
  name?: string;
  /** Optional. An optional description of this resource. Provide this property when you create the resource. */
  description?: string;
  /** Required. The size of the disk in GB. */
  sizeGb?: string;
  /** Optional. A list of publicly available licenses that are applicable to this backup. This is applicable if the original image had licenses attached, e.g. Windows image */
  licenses?: Array<string>;
  /** Optional. A list of features to enable in the guest operating system. This is applicable only for bootable images. */
  guestOsFeature?: Array<GuestOsFeature>;
  /** Optional. Encrypts the disk using a customer-supplied encryption key or a customer-managed encryption key. */
  diskEncryptionKey?: CustomerEncryptionKey;
  /** Optional. Physical block size of the persistent disk, in bytes. If not present in a request, a default value is used. Currently, the supported size is 4096. */
  physicalBlockSizeBytes?: string;
  /** Optional. Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. */
  provisionedIops?: string;
  /** Optional. Indicates how much throughput to provision for the disk. This sets the number of throughput MB per second that the disk can handle. */
  provisionedThroughput?: string;
  /** Optional. Indicates whether this disk is using confidential compute mode. Encryption with a Cloud KMS key is required to enable this option. */
  enableConfidentialCompute?: boolean;
  /** Optional. The storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. */
  storagePool?: string;
  /** Optional. The access mode of the disk. */
  accessMode?: "READ_WRITE_SINGLE" | "READ_WRITE_MANY" | "READ_ONLY_MANY" | (string & {});
  /** Optional. The architecture of the source disk. Valid values are ARM64 or X86_64. */
  architecture?: "ARCHITECTURE_UNSPECIFIED" | "X86_64" | "ARM64" | (string & {});
  /** Optional. Resource policies applied to this disk. */
  resourcePolicy?: Array<string>;
  /** Required. URL of the disk type resource describing which disk type to use to create the disk. */
  type?: string;
  /** Optional. Labels to apply to this disk. These can be modified later using setLabels method. Label values can be empty. */
  labels?: Record<string, string>;
  /** Optional. Resource manager tags to be bound to the disk. */
  resourceManagerTags?: Record<string, string>;
}

export const DiskRestoreProperties: Schema.Schema<DiskRestoreProperties> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  sizeGb: Schema.optional(Schema.String),
  licenses: Schema.optional(Schema.Array(Schema.String)),
  guestOsFeature: Schema.optional(Schema.Array(GuestOsFeature)),
  diskEncryptionKey: Schema.optional(CustomerEncryptionKey),
  physicalBlockSizeBytes: Schema.optional(Schema.String),
  provisionedIops: Schema.optional(Schema.String),
  provisionedThroughput: Schema.optional(Schema.String),
  enableConfidentialCompute: Schema.optional(Schema.Boolean),
  storagePool: Schema.optional(Schema.String),
  accessMode: Schema.optional(Schema.String),
  architecture: Schema.optional(Schema.String),
  resourcePolicy: Schema.optional(Schema.Array(Schema.String)),
  type: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  resourceManagerTags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "DiskRestoreProperties" }) as any as Schema.Schema<DiskRestoreProperties>;

export interface RestoreBackupRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Compute Engine target environment to be used during restore. */
  computeInstanceTargetEnvironment?: ComputeInstanceTargetEnvironment;
  /** Disk target environment to be used during restore. */
  diskTargetEnvironment?: DiskTargetEnvironment;
  /** Region disk target environment to be used during restore. */
  regionDiskTargetEnvironment?: RegionDiskTargetEnvironment;
  /** Compute Engine instance properties to be overridden during restore. */
  computeInstanceRestoreProperties?: ComputeInstanceRestoreProperties;
  /** Disk properties to be overridden during restore. */
  diskRestoreProperties?: DiskRestoreProperties;
  /** Optional. A field mask used to clear server-side default values for fields within the `instance_properties` oneof. When a field in this mask is cleared, the server will not apply its default logic (like inheriting a value from the source) for that field. The most common current use case is clearing default encryption keys. Examples of field mask paths: - Compute Instance Disks: `compute_instance_restore_properties.disks.*.disk_encryption_key` - Single Disk: `disk_restore_properties.disk_encryption_key` */
  clearOverridesFieldMask?: string;
}

export const RestoreBackupRequest: Schema.Schema<RestoreBackupRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  computeInstanceTargetEnvironment: Schema.optional(ComputeInstanceTargetEnvironment),
  diskTargetEnvironment: Schema.optional(DiskTargetEnvironment),
  regionDiskTargetEnvironment: Schema.optional(RegionDiskTargetEnvironment),
  computeInstanceRestoreProperties: Schema.optional(ComputeInstanceRestoreProperties),
  diskRestoreProperties: Schema.optional(DiskRestoreProperties),
  clearOverridesFieldMask: Schema.optional(Schema.String),
})).annotate({ identifier: "RestoreBackupRequest" }) as any as Schema.Schema<RestoreBackupRequest>;

export interface WeekDayOfMonth {
  /** Required. Specifies the week of the month. */
  weekOfMonth?: "WEEK_OF_MONTH_UNSPECIFIED" | "FIRST" | "SECOND" | "THIRD" | "FOURTH" | "LAST" | (string & {});
  /** Required. Specifies the day of the week. */
  dayOfWeek?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
}

export const WeekDayOfMonth: Schema.Schema<WeekDayOfMonth> = Schema.suspend(() => Schema.Struct({
  weekOfMonth: Schema.optional(Schema.String),
  dayOfWeek: Schema.optional(Schema.String),
})).annotate({ identifier: "WeekDayOfMonth" }) as any as Schema.Schema<WeekDayOfMonth>;

export interface BackupWindow {
  /** Required. The hour of day (0-23) when the window starts for example if value of start hour of day is 6 that mean backup window start at 6:00. */
  startHourOfDay?: number;
  /** Required. The hour of day (1-24) when the window end for example if value of end hour of day is 10 that mean backup window end time is 10:00. End hour of day should be greater than start hour of day. 0 <= start_hour_of_day < end_hour_of_day <= 24 End hour of day is not include in backup window that mean if end_hour_of_day= 10 jobs should start before 10:00. */
  endHourOfDay?: number;
}

export const BackupWindow: Schema.Schema<BackupWindow> = Schema.suspend(() => Schema.Struct({
  startHourOfDay: Schema.optional(Schema.Number),
  endHourOfDay: Schema.optional(Schema.Number),
})).annotate({ identifier: "BackupWindow" }) as any as Schema.Schema<BackupWindow>;

export interface StandardSchedule {
  /** Required. Specifies the `RecurrenceType` for the schedule. */
  recurrenceType?: "RECURRENCE_TYPE_UNSPECIFIED" | "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | (string & {});
  /** Optional. Specifies frequency for hourly backups. A hourly frequency of 2 means jobs will run every 2 hours from start time till end time defined. This is required for `recurrence_type`, `HOURLY` and is not applicable otherwise. A validation error will occur if a value is supplied and `recurrence_type` is not `HOURLY`. Value of hourly frequency should be between 4 and 23. Reason for limit : We found that there is bandwidth limitation of 3GB/S for GMI while taking a backup and 5GB/S while doing a restore. Given the amount of parallel backups and restore we are targeting, this will potentially take the backup time to mins and hours (in worst case scenario). */
  hourlyFrequency?: number;
  /** Optional. Specifies days of week like, MONDAY or TUESDAY, on which jobs will run. This is required for `recurrence_type`, `WEEKLY` and is not applicable otherwise. A validation error will occur if a value is supplied and `recurrence_type` is not `WEEKLY`. */
  daysOfWeek?: Array<"DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {})>;
  /** Optional. Specifies days of months like 1, 5, or 14 on which jobs will run. Values for `days_of_month` are only applicable for `recurrence_type`, `MONTHLY` and `YEARLY`. A validation error will occur if other values are supplied. */
  daysOfMonth?: Array<number>;
  /** Optional. Specifies a week day of the month like, FIRST SUNDAY or LAST MONDAY, on which jobs will run. This will be specified by two fields in `WeekDayOfMonth`, one for the day, e.g. `MONDAY`, and one for the week, e.g. `LAST`. This field is only applicable for `recurrence_type`, `MONTHLY` and `YEARLY`. A validation error will occur if other values are supplied. */
  weekDayOfMonth?: WeekDayOfMonth;
  /** Optional. Specifies the months of year, like `FEBRUARY` and/or `MAY`, on which jobs will run. This field is only applicable when `recurrence_type` is `YEARLY`. A validation error will occur if other values are supplied. */
  months?: Array<"MONTH_UNSPECIFIED" | "JANUARY" | "FEBRUARY" | "MARCH" | "APRIL" | "MAY" | "JUNE" | "JULY" | "AUGUST" | "SEPTEMBER" | "OCTOBER" | "NOVEMBER" | "DECEMBER" | (string & {})>;
  /** Required. A BackupWindow defines the window of day during which backup jobs will run. Jobs are queued at the beginning of the window and will be marked as `NOT_RUN` if they do not start by the end of the window. Note: running jobs will not be cancelled at the end of the window. */
  backupWindow?: BackupWindow;
  /** Required. The time zone to be used when interpreting the schedule. The value of this field must be a time zone name from the IANA tz database. See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones for the list of valid timezone names. For example, Europe/Paris. */
  timeZone?: string;
}

export const StandardSchedule: Schema.Schema<StandardSchedule> = Schema.suspend(() => Schema.Struct({
  recurrenceType: Schema.optional(Schema.String),
  hourlyFrequency: Schema.optional(Schema.Number),
  daysOfWeek: Schema.optional(Schema.Array(Schema.String)),
  daysOfMonth: Schema.optional(Schema.Array(Schema.Number)),
  weekDayOfMonth: Schema.optional(WeekDayOfMonth),
  months: Schema.optional(Schema.Array(Schema.String)),
  backupWindow: Schema.optional(BackupWindow),
  timeZone: Schema.optional(Schema.String),
})).annotate({ identifier: "StandardSchedule" }) as any as Schema.Schema<StandardSchedule>;

export interface BackupRule {
  /** Required. Immutable. The unique id of this `BackupRule`. The `rule_id` is unique per `BackupPlan`.The `rule_id` must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens. Pattern, /a-z{,62}/. */
  ruleId?: string;
  /** Required. Configures the duration for which backup data will be kept. It is defined in “days”. The value should be greater than or equal to minimum enforced retention of the backup vault. Minimum value is 1 and maximum value is 36159 for custom retention on-demand backup. Minimum and maximum values are workload specific for all other rules. Note: Longer retention can lead to higher storage costs post introductory trial. We recommend starting with a short duration of 3 days or less. */
  backupRetentionDays?: number;
  /** Optional. Defines a schedule that runs within the confines of a defined window of time. */
  standardSchedule?: StandardSchedule;
}

export const BackupRule: Schema.Schema<BackupRule> = Schema.suspend(() => Schema.Struct({
  ruleId: Schema.optional(Schema.String),
  backupRetentionDays: Schema.optional(Schema.Number),
  standardSchedule: Schema.optional(StandardSchedule),
})).annotate({ identifier: "BackupRule" }) as any as Schema.Schema<BackupRule>;

export interface BackupPlan {
  /** Output only. Identifier. The resource name of the `BackupPlan`. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}` */
  name?: string;
  /** Optional. The description of the `BackupPlan` resource. The description allows for additional details about `BackupPlan` and its use cases to be provided. An example description is the following: "This is a backup plan that performs a daily backup at 6pm and retains data for 3 months". The description must be at most 2048 characters. */
  description?: string;
  /** Optional. This collection of key/value pairs allows for custom labels to be supplied by the user. Example, {"tag": "Weekly"}. */
  labels?: Record<string, string>;
  /** Output only. When the `BackupPlan` was created. */
  createTime?: string;
  /** Output only. When the `BackupPlan` was last updated. */
  updateTime?: string;
  /** Optional. The backup rules for this `BackupPlan`. */
  backupRules?: Array<BackupRule>;
  /** Optional. Optional field to configure the maximum number of days for which a backup can be retained. This field is only applicable for on-demand backups taken with custom retention value. */
  maxCustomOnDemandRetentionDays?: number;
  /** Output only. The `State` for the `BackupPlan`. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "INACTIVE" | "UPDATING" | (string & {});
  /** Required. The resource type to which the `BackupPlan` will be applied. Examples include, "compute.googleapis.com/Instance", "sqladmin.googleapis.com/Instance", "alloydb.googleapis.com/Cluster", "compute.googleapis.com/Disk". */
  resourceType?: string;
  /** Optional. `etag` is returned from the service in the response. As a user of the service, you may provide an etag value in this field to prevent stale resources. */
  etag?: string;
  /** Required. Resource name of backup vault which will be used as storage location for backups. Format: projects/{project}/locations/{location}/backupVaults/{backupvault} */
  backupVault?: string;
  /** Output only. The Google Cloud service account to be used by the BackupVault for taking backups. Specify the email address of the Backup Vault Service Account. */
  backupVaultServiceAccount?: string;
  /** Optional. Applicable only for Cloud SQL resource_type. Configures how long logs will be stored. It is defined in “days”. This value should be greater than or equal to minimum enforced log retention duration of the backup vault. */
  logRetentionDays?: string;
  /** Output only. All resource types to which backupPlan can be applied. */
  supportedResourceTypes?: Array<string>;
  /** Output only. The user friendly revision ID of the `BackupPlanRevision`. Example: v0, v1, v2, etc. */
  revisionId?: string;
  /** Output only. The resource id of the `BackupPlanRevision`. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}/revisions/{revision_id}` */
  revisionName?: string;
}

export const BackupPlan: Schema.Schema<BackupPlan> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  backupRules: Schema.optional(Schema.Array(BackupRule)),
  maxCustomOnDemandRetentionDays: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  backupVault: Schema.optional(Schema.String),
  backupVaultServiceAccount: Schema.optional(Schema.String),
  logRetentionDays: Schema.optional(Schema.String),
  supportedResourceTypes: Schema.optional(Schema.Array(Schema.String)),
  revisionId: Schema.optional(Schema.String),
  revisionName: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupPlan" }) as any as Schema.Schema<BackupPlan>;

export interface ListBackupPlansResponse {
  /** The list of `BackupPlans` in the project for the specified location. If the `{location}` value in the request is "-", the response contains a list of resources from all locations. In case any location is unreachable, the response will only return backup plans in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. BackupPlan */
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

export interface BackupPlanRevision {
  /** Output only. Identifier. The resource name of the `BackupPlanRevision`. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}/revisions/{revision}` */
  name?: string;
  /** Output only. The user friendly revision ID of the `BackupPlanRevision`. Example: v0, v1, v2, etc. */
  revisionId?: string;
  /** Output only. Resource State */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "INACTIVE" | (string & {});
  /** The Backup Plan being encompassed by this revision. */
  backupPlanSnapshot?: BackupPlan;
  /** Output only. The timestamp that the revision was created. */
  createTime?: string;
}

export const BackupPlanRevision: Schema.Schema<BackupPlanRevision> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  backupPlanSnapshot: Schema.optional(BackupPlan),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupPlanRevision" }) as any as Schema.Schema<BackupPlanRevision>;

export interface ListBackupPlanRevisionsResponse {
  /** The list of `BackupPlanRevisions` in the project for the specified location. If the `{location}` value in the request is "-", the response contains a list of resources from all locations. In case any location is unreachable, the response will only return backup plans in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. */
  backupPlanRevisions?: Array<BackupPlanRevision>;
  /** A token which may be sent as page_token in a subsequent `ListBackupPlanRevisions` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackupPlanRevisionsResponse: Schema.Schema<ListBackupPlanRevisionsResponse> = Schema.suspend(() => Schema.Struct({
  backupPlanRevisions: Schema.optional(Schema.Array(BackupPlanRevision)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBackupPlanRevisionsResponse" }) as any as Schema.Schema<ListBackupPlanRevisionsResponse>;

export interface RuleConfigInfo {
  /** Output only. Backup Rule id fetched from backup plan. */
  ruleId?: string;
  /** Output only. The last backup state for rule. */
  lastBackupState?: "LAST_BACKUP_STATE_UNSPECIFIED" | "FIRST_BACKUP_PENDING" | "PERMISSION_DENIED" | "SUCCEEDED" | "FAILED" | (string & {});
  /** Output only. google.rpc.Status object to store the last backup error. */
  lastBackupError?: Status;
  /** Output only. The point in time when the last successful backup was captured from the source. */
  lastSuccessfulBackupConsistencyTime?: string;
}

export const RuleConfigInfo: Schema.Schema<RuleConfigInfo> = Schema.suspend(() => Schema.Struct({
  ruleId: Schema.optional(Schema.String),
  lastBackupState: Schema.optional(Schema.String),
  lastBackupError: Schema.optional(Status),
  lastSuccessfulBackupConsistencyTime: Schema.optional(Schema.String),
})).annotate({ identifier: "RuleConfigInfo" }) as any as Schema.Schema<RuleConfigInfo>;

export interface CloudSqlInstanceBackupPlanAssociationProperties {
  /** Output only. The time when the instance was created. */
  instanceCreateTime?: string;
}

export const CloudSqlInstanceBackupPlanAssociationProperties: Schema.Schema<CloudSqlInstanceBackupPlanAssociationProperties> = Schema.suspend(() => Schema.Struct({
  instanceCreateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudSqlInstanceBackupPlanAssociationProperties" }) as any as Schema.Schema<CloudSqlInstanceBackupPlanAssociationProperties>;

export interface FilestoreInstanceBackupPlanAssociationProperties {
  /** Output only. The time when the instance was created. */
  instanceCreateTime?: string;
}

export const FilestoreInstanceBackupPlanAssociationProperties: Schema.Schema<FilestoreInstanceBackupPlanAssociationProperties> = Schema.suspend(() => Schema.Struct({
  instanceCreateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "FilestoreInstanceBackupPlanAssociationProperties" }) as any as Schema.Schema<FilestoreInstanceBackupPlanAssociationProperties>;

export interface AlloyDBClusterBackupPlanAssociationProperties {
  /** Output only. The cluster UID of the AlloyDB cluster. */
  clusterUid?: string;
}

export const AlloyDBClusterBackupPlanAssociationProperties: Schema.Schema<AlloyDBClusterBackupPlanAssociationProperties> = Schema.suspend(() => Schema.Struct({
  clusterUid: Schema.optional(Schema.String),
})).annotate({ identifier: "AlloyDBClusterBackupPlanAssociationProperties" }) as any as Schema.Schema<AlloyDBClusterBackupPlanAssociationProperties>;

export interface BackupPlanAssociation {
  /** Output only. Identifier. The resource name of BackupPlanAssociation in below format Format : projects/{project}/locations/{location}/backupPlanAssociations/{backupPlanAssociationId} */
  name?: string;
  /** Required. Immutable. Resource type of workload on which backupplan is applied */
  resourceType?: string;
  /** Required. Immutable. Resource name of workload on which the backup plan is applied. The format can either be the resource name (e.g., "projects/my-project/zones/us-central1-a/instances/my-instance") or the full resource URI (e.g., "https://www.googleapis.com/compute/v1/projects/my-project/zones/us-central1-a/instances/my-instance"). */
  resource?: string;
  /** Required. Resource name of backup plan which needs to be applied on workload. Format: projects/{project}/locations/{location}/backupPlans/{backupPlanId} */
  backupPlan?: string;
  /** Output only. The time when the instance was created. */
  createTime?: string;
  /** Output only. The time when the instance was updated. */
  updateTime?: string;
  /** Output only. The BackupPlanAssociation resource state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "INACTIVE" | "UPDATING" | (string & {});
  /** Output only. The config info related to backup rules. */
  rulesConfigInfo?: Array<RuleConfigInfo>;
  /** Output only. Resource name of data source which will be used as storage location for backups taken. Format : projects/{project}/locations/{location}/backupVaults/{backupvault}/dataSources/{datasource} */
  dataSource?: string;
  /** Output only. Cloud SQL instance's backup plan association properties. */
  cloudSqlInstanceBackupPlanAssociationProperties?: CloudSqlInstanceBackupPlanAssociationProperties;
  /** Output only. Filestore instance's backup plan association properties. */
  filestoreInstanceBackupPlanAssociationProperties?: FilestoreInstanceBackupPlanAssociationProperties;
  /** Output only. AlloyDB cluster's backup plan association properties. */
  alloydbClusterBackupPlanAssociationProperties?: AlloyDBClusterBackupPlanAssociationProperties;
  /** Output only. The user friendly revision ID of the `BackupPlanRevision`. Example: v0, v1, v2, etc. */
  backupPlanRevisionId?: string;
  /** Output only. The resource id of the `BackupPlanRevision`. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}/revisions/{revision_id}` */
  backupPlanRevisionName?: string;
}

export const BackupPlanAssociation: Schema.Schema<BackupPlanAssociation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  backupPlan: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  rulesConfigInfo: Schema.optional(Schema.Array(RuleConfigInfo)),
  dataSource: Schema.optional(Schema.String),
  cloudSqlInstanceBackupPlanAssociationProperties: Schema.optional(CloudSqlInstanceBackupPlanAssociationProperties),
  filestoreInstanceBackupPlanAssociationProperties: Schema.optional(FilestoreInstanceBackupPlanAssociationProperties),
  alloydbClusterBackupPlanAssociationProperties: Schema.optional(AlloyDBClusterBackupPlanAssociationProperties),
  backupPlanRevisionId: Schema.optional(Schema.String),
  backupPlanRevisionName: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupPlanAssociation" }) as any as Schema.Schema<BackupPlanAssociation>;

export interface ListBackupPlanAssociationsResponse {
  /** The list of Backup Plan Associations in the project for the specified location. If the `{location}` value in the request is "-", the response contains a list of instances from all locations. In case any location is unreachable, the response will only return backup plan associations in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. */
  backupPlanAssociations?: Array<BackupPlanAssociation>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackupPlanAssociationsResponse: Schema.Schema<ListBackupPlanAssociationsResponse> = Schema.suspend(() => Schema.Struct({
  backupPlanAssociations: Schema.optional(Schema.Array(BackupPlanAssociation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBackupPlanAssociationsResponse" }) as any as Schema.Schema<ListBackupPlanAssociationsResponse>;

export interface FetchBackupPlanAssociationsForResourceTypeResponse {
  /** Output only. The BackupPlanAssociations from the specified parent. */
  backupPlanAssociations?: Array<BackupPlanAssociation>;
  /** Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const FetchBackupPlanAssociationsForResourceTypeResponse: Schema.Schema<FetchBackupPlanAssociationsForResourceTypeResponse> = Schema.suspend(() => Schema.Struct({
  backupPlanAssociations: Schema.optional(Schema.Array(BackupPlanAssociation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchBackupPlanAssociationsForResourceTypeResponse" }) as any as Schema.Schema<FetchBackupPlanAssociationsForResourceTypeResponse>;

export interface TriggerBackupRequest {
  /** Optional. backup rule_id for which a backup needs to be triggered. If not specified, on-demand backup with custom retention will be triggered. */
  ruleId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. The duration for which backup data will be kept, while taking an on-demand backup with custom retention. It is defined in "days". It is mutually exclusive with rule_id. This field is required if rule_id is not provided. */
  customRetentionDays?: number;
  /** Optional. Labels to be applied on the backup. */
  labels?: Record<string, string>;
}

export const TriggerBackupRequest: Schema.Schema<TriggerBackupRequest> = Schema.suspend(() => Schema.Struct({
  ruleId: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
  customRetentionDays: Schema.optional(Schema.Number),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "TriggerBackupRequest" }) as any as Schema.Schema<TriggerBackupRequest>;

export interface DataSourceBackupConfigInfo {
  /** Output only. The status of the last backup in this DataSource */
  lastBackupState?: "LAST_BACKUP_STATE_UNSPECIFIED" | "FIRST_BACKUP_PENDING" | "SUCCEEDED" | "FAILED" | "PERMISSION_DENIED" | (string & {});
  /** Output only. Timestamp of the last successful backup to this DataSource. */
  lastSuccessfulBackupConsistencyTime?: string;
}

export const DataSourceBackupConfigInfo: Schema.Schema<DataSourceBackupConfigInfo> = Schema.suspend(() => Schema.Struct({
  lastBackupState: Schema.optional(Schema.String),
  lastSuccessfulBackupConsistencyTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DataSourceBackupConfigInfo" }) as any as Schema.Schema<DataSourceBackupConfigInfo>;

export interface CloudSqlInstanceDataSourceReferenceProperties {
  /** Output only. Name of the Cloud SQL instance backed up by the datasource. Format: projects/{project}/instances/{instance} */
  name?: string;
  /** Output only. The installed database version of the Cloud SQL instance. */
  databaseInstalledVersion?: string;
  /** Output only. The instance creation timestamp. */
  instanceCreateTime?: string;
  /** Output only. The tier (or machine type) for this instance. Example: `db-custom-1-3840` */
  instanceTier?: string;
}

export const CloudSqlInstanceDataSourceReferenceProperties: Schema.Schema<CloudSqlInstanceDataSourceReferenceProperties> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  databaseInstalledVersion: Schema.optional(Schema.String),
  instanceCreateTime: Schema.optional(Schema.String),
  instanceTier: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudSqlInstanceDataSourceReferenceProperties" }) as any as Schema.Schema<CloudSqlInstanceDataSourceReferenceProperties>;

export interface AlloyDBClusterDataSourceReferenceProperties {
  /** Output only. Name of the AlloyDB cluster backed up by the datasource. Format: projects/{project}/locations/{location}/clusters/{cluster} */
  name?: string;
}

export const AlloyDBClusterDataSourceReferenceProperties: Schema.Schema<AlloyDBClusterDataSourceReferenceProperties> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "AlloyDBClusterDataSourceReferenceProperties" }) as any as Schema.Schema<AlloyDBClusterDataSourceReferenceProperties>;

export interface DataSourceGcpResourceInfo {
  /** Output only. The resource name of the Google Cloud resource. Ex: projects/{project}/zones/{zone}/instances/{instance} */
  gcpResourcename?: string;
  /** Output only. The type of the Google Cloud resource. Ex: compute.googleapis.com/Instance */
  type?: string;
  /** Output only. The location of the Google Cloud resource. Ex: //"global"/"unspecified" */
  location?: string;
  /** Output only. The properties of the Cloud SQL instance. */
  cloudSqlInstanceProperties?: CloudSqlInstanceDataSourceReferenceProperties;
  /** Output only. The properties of the AlloyDB cluster. */
  alloyDbClusterProperties?: AlloyDBClusterDataSourceReferenceProperties;
}

export const DataSourceGcpResourceInfo: Schema.Schema<DataSourceGcpResourceInfo> = Schema.suspend(() => Schema.Struct({
  gcpResourcename: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  cloudSqlInstanceProperties: Schema.optional(CloudSqlInstanceDataSourceReferenceProperties),
  alloyDbClusterProperties: Schema.optional(AlloyDBClusterDataSourceReferenceProperties),
})).annotate({ identifier: "DataSourceGcpResourceInfo" }) as any as Schema.Schema<DataSourceGcpResourceInfo>;

export interface DataSourceReference {
  /** Identifier. The resource name of the DataSourceReference. Format: projects/{project}/locations/{location}/dataSourceReferences/{data_source_reference} */
  name?: string;
  /** Output only. The resource name of the DataSource. Format: projects/{project}/locations/{location}/backupVaults/{backupVault}/dataSources/{dataSource} */
  dataSource?: string;
  /** Output only. The time when the DataSourceReference was created. */
  createTime?: string;
  /** Output only. The backup configuration state of the DataSource. */
  dataSourceBackupConfigState?: "BACKUP_CONFIG_STATE_UNSPECIFIED" | "ACTIVE" | "PASSIVE" | (string & {});
  /** Output only. Number of backups in the DataSource. */
  dataSourceBackupCount?: string;
  /** Output only. Information of backup configuration on the DataSource. */
  dataSourceBackupConfigInfo?: DataSourceBackupConfigInfo;
  /** Output only. The Google Cloud resource that the DataSource is associated with. */
  dataSourceGcpResourceInfo?: DataSourceGcpResourceInfo;
  /** Output only. Total size of the storage used by all backup resources for the referenced datasource. */
  totalStoredBytes?: string;
}

export const DataSourceReference: Schema.Schema<DataSourceReference> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  dataSource: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  dataSourceBackupConfigState: Schema.optional(Schema.String),
  dataSourceBackupCount: Schema.optional(Schema.String),
  dataSourceBackupConfigInfo: Schema.optional(DataSourceBackupConfigInfo),
  dataSourceGcpResourceInfo: Schema.optional(DataSourceGcpResourceInfo),
  totalStoredBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "DataSourceReference" }) as any as Schema.Schema<DataSourceReference>;

export interface ListDataSourceReferencesResponse {
  /** The DataSourceReferences from the specified parent. */
  dataSourceReferences?: Array<DataSourceReference>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListDataSourceReferencesResponse: Schema.Schema<ListDataSourceReferencesResponse> = Schema.suspend(() => Schema.Struct({
  dataSourceReferences: Schema.optional(Schema.Array(DataSourceReference)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListDataSourceReferencesResponse" }) as any as Schema.Schema<ListDataSourceReferencesResponse>;

export interface FetchDataSourceReferencesForResourceTypeResponse {
  /** The DataSourceReferences from the specified parent. */
  dataSourceReferences?: Array<DataSourceReference>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const FetchDataSourceReferencesForResourceTypeResponse: Schema.Schema<FetchDataSourceReferencesForResourceTypeResponse> = Schema.suspend(() => Schema.Struct({
  dataSourceReferences: Schema.optional(Schema.Array(DataSourceReference)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchDataSourceReferencesForResourceTypeResponse" }) as any as Schema.Schema<FetchDataSourceReferencesForResourceTypeResponse>;

export interface CloudSqlInstanceInitializationConfig {
  /** Required. The edition of the Cloud SQL instance. */
  edition?: "EDITION_UNSPECIFIED" | "ENTERPRISE" | "ENTERPRISE_PLUS" | (string & {});
}

export const CloudSqlInstanceInitializationConfig: Schema.Schema<CloudSqlInstanceInitializationConfig> = Schema.suspend(() => Schema.Struct({
  edition: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudSqlInstanceInitializationConfig" }) as any as Schema.Schema<CloudSqlInstanceInitializationConfig>;

export interface InitializeServiceRequest {
  /** Required. The resource type to which the default service config will be applied. Examples include, "compute.googleapis.com/Instance" and "storage.googleapis.com/Bucket". */
  resourceType?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. The configuration for initializing a Cloud SQL instance. */
  cloudSqlInstanceInitializationConfig?: CloudSqlInstanceInitializationConfig;
  /** Optional. The location where the BackupPlan will be created. This field is required for multi-region BackupVaults and is optional for regional BackupVaults. It is useful when creating a Backup Vault in a multi-region, allowing the BackupPlan to reside in a specific region within that multi-region. If this field is not provided, the BackupPlan will be created in the same location as specified in the `name` field. */
  backupPlanLocation?: string;
}

export const InitializeServiceRequest: Schema.Schema<InitializeServiceRequest> = Schema.suspend(() => Schema.Struct({
  resourceType: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
  cloudSqlInstanceInitializationConfig: Schema.optional(CloudSqlInstanceInitializationConfig),
  backupPlanLocation: Schema.optional(Schema.String),
})).annotate({ identifier: "InitializeServiceRequest" }) as any as Schema.Schema<InitializeServiceRequest>;

export interface PitrSettings {
  /** Output only. Number of days to retain the backup. */
  retentionDays?: number;
}

export const PitrSettings: Schema.Schema<PitrSettings> = Schema.suspend(() => Schema.Struct({
  retentionDays: Schema.optional(Schema.Number),
})).annotate({ identifier: "PitrSettings" }) as any as Schema.Schema<PitrSettings>;

export interface BackupLocation {
  /** Output only. The type of the location. */
  type?: "TYPE_UNSPECIFIED" | "ZONAL" | "REGIONAL" | "MULTI_REGIONAL" | (string & {});
  /** Output only. The id of the cloud location. Example: "us-central1" */
  locationId?: string;
}

export const BackupLocation: Schema.Schema<BackupLocation> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupLocation" }) as any as Schema.Schema<BackupLocation>;

export interface BackupDrPlanRule {
  /** Output only. Unique Id of the backup rule. */
  ruleId?: string;
  /** Output only. Timestamp of the latest successful backup created via this backup rule. */
  lastSuccessfulBackupTime?: string;
}

export const BackupDrPlanRule: Schema.Schema<BackupDrPlanRule> = Schema.suspend(() => Schema.Struct({
  ruleId: Schema.optional(Schema.String),
  lastSuccessfulBackupTime: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupDrPlanRule" }) as any as Schema.Schema<BackupDrPlanRule>;

export interface BackupDrPlanConfig {
  /** Backup rules of the backup plan resource. */
  backupDrPlanRules?: Array<BackupDrPlanRule>;
}

export const BackupDrPlanConfig: Schema.Schema<BackupDrPlanConfig> = Schema.suspend(() => Schema.Struct({
  backupDrPlanRules: Schema.optional(Schema.Array(BackupDrPlanRule)),
})).annotate({ identifier: "BackupDrPlanConfig" }) as any as Schema.Schema<BackupDrPlanConfig>;

export interface BackupDrTemplateConfig {
  /** Output only. The URI of the BackupDr template resource for the first party identity users. */
  firstPartyManagementUri?: string;
  /** Output only. The URI of the BackupDr template resource for the third party identity users. */
  thirdPartyManagementUri?: string;
}

export const BackupDrTemplateConfig: Schema.Schema<BackupDrTemplateConfig> = Schema.suspend(() => Schema.Struct({
  firstPartyManagementUri: Schema.optional(Schema.String),
  thirdPartyManagementUri: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupDrTemplateConfig" }) as any as Schema.Schema<BackupDrTemplateConfig>;

export interface BackupConfigDetails {
  /** Output only. The full resource name of the backup config source resource. For example, "//backupdr.googleapis.com/v1/projects/{project}/locations/{region}/backupPlans/{backupplanId}" or "//compute.googleapis.com/projects/{project}/locations/{region}/resourcePolicies/{resourcePolicyId}". */
  backupConfigSource?: string;
  /** Output only. The display name of the backup config source resource. */
  backupConfigSourceDisplayName?: string;
  /** Output only. The type of the backup config resource. */
  type?: "TYPE_UNSPECIFIED" | "CLOUD_SQL_INSTANCE_BACKUP_CONFIG" | "COMPUTE_ENGINE_RESOURCE_POLICY" | "BACKUPDR_BACKUP_PLAN" | "BACKUPDR_TEMPLATE" | (string & {});
  /** Output only. The state of the backup config resource. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "INACTIVE" | "ERROR" | (string & {});
  /** Output only. Point in time recovery settings of the backup configuration resource. */
  pitrSettings?: PitrSettings;
  /** Output only. Timestamp of the latest successful backup created via this backup configuration. */
  latestSuccessfulBackupTime?: string;
  /** Output only. The [full resource name](https://cloud.google.com/asset-inventory/docs/resource-name-format) of the resource that is applicable for the backup configuration. Example: "//compute.googleapis.com/projects/{project}/zones/{zone}/instances/{instance}" */
  applicableResource?: string;
  /** Output only. The [full resource name](https://cloud.google.com/asset-inventory/docs/resource-name-format) of the backup vault that will store the backups generated through this backup configuration. Example: "//backupdr.googleapis.com/v1/projects/{project}/locations/{region}/backupVaults/{backupvaultId}" */
  backupVault?: string;
  /** The locations where the backups are to be stored. */
  backupLocations?: Array<BackupLocation>;
  /** Google Cloud Backup and DR's Backup Plan specific data. */
  backupDrPlanConfig?: BackupDrPlanConfig;
  /** Google Cloud Backup and DR's Template specific data. */
  backupDrTemplateConfig?: BackupDrTemplateConfig;
}

export const BackupConfigDetails: Schema.Schema<BackupConfigDetails> = Schema.suspend(() => Schema.Struct({
  backupConfigSource: Schema.optional(Schema.String),
  backupConfigSourceDisplayName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  pitrSettings: Schema.optional(PitrSettings),
  latestSuccessfulBackupTime: Schema.optional(Schema.String),
  applicableResource: Schema.optional(Schema.String),
  backupVault: Schema.optional(Schema.String),
  backupLocations: Schema.optional(Schema.Array(BackupLocation)),
  backupDrPlanConfig: Schema.optional(BackupDrPlanConfig),
  backupDrTemplateConfig: Schema.optional(BackupDrTemplateConfig),
})).annotate({ identifier: "BackupConfigDetails" }) as any as Schema.Schema<BackupConfigDetails>;

export interface ResourceBackupConfig {
  /** Identifier. The resource name of the ResourceBackupConfig. Format: projects/{project}/locations/{location}/resourceBackupConfigs/{uid} */
  name?: string;
  /** Output only. The unique identifier of the resource backup config. */
  uid?: string;
  /** Output only. The [full resource name](https://cloud.google.com/asset-inventory/docs/resource-name-format) of the cloud resource that this configuration applies to. Supported resource types are ResourceBackupConfig.ResourceType. */
  targetResource?: string;
  /** Output only. The human friendly name of the target resource. */
  targetResourceDisplayName?: string;
  /** Output only. The type of the target resource. */
  targetResourceType?: "RESOURCE_TYPE_UNSPECIFIED" | "CLOUD_SQL_INSTANCE" | "COMPUTE_ENGINE_VM" | "COMPUTE_ENGINE_DISK" | "COMPUTE_ENGINE_REGIONAL_DISK" | (string & {});
  /** Labels associated with the target resource. */
  targetResourceLabels?: Record<string, string>;
  /** Backup configurations applying to the target resource, including those targeting its related/child resources. For example, backup configuration applicable to Compute Engine disks will be populated in this field for a Compute Engine VM which has the disk associated. */
  backupConfigsDetails?: Array<BackupConfigDetails>;
  /** Output only. Whether the target resource is configured for backup. This is true if the backup_configs_details is not empty. */
  backupConfigured?: boolean;
  /** Output only. Whether the target resource is protected by a backup vault. This is true if the backup_configs_details is not empty and any of the ResourceBackupConfig.backup_configs_details has a backup configuration with BackupConfigDetails.backup_vault set. */
  vaulted?: boolean;
}

export const ResourceBackupConfig: Schema.Schema<ResourceBackupConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  targetResource: Schema.optional(Schema.String),
  targetResourceDisplayName: Schema.optional(Schema.String),
  targetResourceType: Schema.optional(Schema.String),
  targetResourceLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  backupConfigsDetails: Schema.optional(Schema.Array(BackupConfigDetails)),
  backupConfigured: Schema.optional(Schema.Boolean),
  vaulted: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ResourceBackupConfig" }) as any as Schema.Schema<ResourceBackupConfig>;

export interface ListResourceBackupConfigsResponse {
  /** The list of ResourceBackupConfigs for the specified scope. */
  resourceBackupConfigs?: Array<ResourceBackupConfig>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const ListResourceBackupConfigsResponse: Schema.Schema<ListResourceBackupConfigsResponse> = Schema.suspend(() => Schema.Struct({
  resourceBackupConfigs: Schema.optional(Schema.Array(ResourceBackupConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListResourceBackupConfigsResponse" }) as any as Schema.Schema<ListResourceBackupConfigsResponse>;

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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to 'Code.CANCELLED'. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. AdditionalInfo contains additional Info related to backup plan association resource. */
  additionalInfo?: Record<string, string>;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
  additionalInfo: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface SetInternalStatusResponse {
}

export const SetInternalStatusResponse: Schema.Schema<SetInternalStatusResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SetInternalStatusResponse" }) as any as Schema.Schema<SetInternalStatusResponse>;

export interface GcpResource {
  /** Name of the Google Cloud resource. */
  gcpResourcename?: string;
  /** Location of the resource: //"global"/"unspecified". */
  location?: string;
  /** Type of the resource. Use the Unified Resource Type, eg. compute.googleapis.com/Instance. */
  type?: string;
}

export const GcpResource: Schema.Schema<GcpResource> = Schema.suspend(() => Schema.Struct({
  gcpResourcename: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GcpResource" }) as any as Schema.Schema<GcpResource>;

export interface TargetResource {
  /** Details of the native Google Cloud resource created as part of restore. */
  gcpResource?: GcpResource;
}

export const TargetResource: Schema.Schema<TargetResource> = Schema.suspend(() => Schema.Struct({
  gcpResource: Schema.optional(GcpResource),
})).annotate({ identifier: "TargetResource" }) as any as Schema.Schema<TargetResource>;

export interface RestoreBackupResponse {
  /** Details of the target resource created/modified as part of restore. */
  targetResource?: TargetResource;
}

export const RestoreBackupResponse: Schema.Schema<RestoreBackupResponse> = Schema.suspend(() => Schema.Struct({
  targetResource: Schema.optional(TargetResource),
})).annotate({ identifier: "RestoreBackupResponse" }) as any as Schema.Schema<RestoreBackupResponse>;

export interface LocationMetadata {
  unsupportedFeatures?: Array<"FEATURE_UNSPECIFIED" | "MANAGEMENT_SERVER" | "COMPUTE_INSTANCE" | "PROTECTION_SUMMARY" | (string & {})>;
}

export const LocationMetadata: Schema.Schema<LocationMetadata> = Schema.suspend(() => Schema.Struct({
  unsupportedFeatures: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "LocationMetadata" }) as any as Schema.Schema<LocationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets the Trial state for a given project */
export interface GetTrialProjectsLocationsRequest {
  /** Required. The project for which trial details need to be retrieved. Format: projects/{project}/locations/{location} Supported Locations are - us, eu and asia. */
  name: string;
}

export const GetTrialProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/trial" }),
  svc,
) as unknown as Schema.Schema<GetTrialProjectsLocationsRequest>;

export type GetTrialProjectsLocationsResponse = Trial;
export const GetTrialProjectsLocationsResponse = Trial;

export type GetTrialProjectsLocationsError = CommonErrors;

export const getTrialProjectsLocations: API.OperationMethod<GetTrialProjectsLocationsRequest, GetTrialProjectsLocationsResponse, GetTrialProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTrialProjectsLocationsRequest,
  output: GetTrialProjectsLocationsResponse,
  errors: [],
}));

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

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsManagementServersRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsManagementServersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/managementServers/{managementServersId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsManagementServersRequest>;

export type SetIamPolicyProjectsLocationsManagementServersResponse = Policy;
export const SetIamPolicyProjectsLocationsManagementServersResponse = Policy;

export type SetIamPolicyProjectsLocationsManagementServersError = CommonErrors;

export const setIamPolicyProjectsLocationsManagementServers: API.OperationMethod<SetIamPolicyProjectsLocationsManagementServersRequest, SetIamPolicyProjectsLocationsManagementServersResponse, SetIamPolicyProjectsLocationsManagementServersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsManagementServersRequest,
  output: SetIamPolicyProjectsLocationsManagementServersResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsManagementServersRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsManagementServersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/managementServers/{managementServersId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsManagementServersRequest>;

export type GetIamPolicyProjectsLocationsManagementServersResponse = Policy;
export const GetIamPolicyProjectsLocationsManagementServersResponse = Policy;

export type GetIamPolicyProjectsLocationsManagementServersError = CommonErrors;

export const getIamPolicyProjectsLocationsManagementServers: API.OperationMethod<GetIamPolicyProjectsLocationsManagementServersRequest, GetIamPolicyProjectsLocationsManagementServersResponse, GetIamPolicyProjectsLocationsManagementServersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsManagementServersRequest,
  output: GetIamPolicyProjectsLocationsManagementServersResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsManagementServersRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsManagementServersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/managementServers/{managementServersId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsManagementServersRequest>;

export type TestIamPermissionsProjectsLocationsManagementServersResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsManagementServersResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsManagementServersError = CommonErrors;

export const testIamPermissionsProjectsLocationsManagementServers: API.OperationMethod<TestIamPermissionsProjectsLocationsManagementServersRequest, TestIamPermissionsProjectsLocationsManagementServersResponse, TestIamPermissionsProjectsLocationsManagementServersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsManagementServersRequest,
  output: TestIamPermissionsProjectsLocationsManagementServersResponse,
  errors: [],
}));

/** Lists ManagementServers in a given project and location. */
export interface ListProjectsLocationsManagementServersRequest {
  /** Required. The project and location for which to retrieve management servers information, in the format 'projects/{project_id}/locations/{location}'. In Google Cloud Backup and DR, locations map to Google Cloud regions, for example **us-central1**. To retrieve management servers for all locations, use "-" for the '{location}' value. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
}

export const ListProjectsLocationsManagementServersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/managementServers" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsManagementServersRequest>;

export type ListProjectsLocationsManagementServersResponse = ListManagementServersResponse;
export const ListProjectsLocationsManagementServersResponse = ListManagementServersResponse;

export type ListProjectsLocationsManagementServersError = CommonErrors;

export const listProjectsLocationsManagementServers = API.makePaginated(() => ({
  input: ListProjectsLocationsManagementServersRequest,
  output: ListProjectsLocationsManagementServersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single ManagementServer. */
export interface GetProjectsLocationsManagementServersRequest {
  /** Required. Name of the management server resource name, in the format 'projects/{project_id}/locations/{location}/managementServers/{resource_name}' */
  name: string;
}

export const GetProjectsLocationsManagementServersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/managementServers/{managementServersId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsManagementServersRequest>;

export type GetProjectsLocationsManagementServersResponse = ManagementServer;
export const GetProjectsLocationsManagementServersResponse = ManagementServer;

export type GetProjectsLocationsManagementServersError = CommonErrors;

export const getProjectsLocationsManagementServers: API.OperationMethod<GetProjectsLocationsManagementServersRequest, GetProjectsLocationsManagementServersResponse, GetProjectsLocationsManagementServersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsManagementServersRequest,
  output: GetProjectsLocationsManagementServersResponse,
  errors: [],
}));

/** Creates a new ManagementServer in a given project and location. */
export interface CreateProjectsLocationsManagementServersRequest {
  /** Required. The management server project and location in the format 'projects/{project_id}/locations/{location}'. In Cloud Backup and DR locations map to Google Cloud regions, for example **us-central1**. */
  parent: string;
  /** Required. The name of the management server to create. The name must be unique for the specified project and location. */
  managementServerId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ManagementServer;
}

export const CreateProjectsLocationsManagementServersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  managementServerId: Schema.optional(Schema.String).pipe(T.HttpQuery("managementServerId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ManagementServer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/managementServers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsManagementServersRequest>;

export type CreateProjectsLocationsManagementServersResponse = Operation;
export const CreateProjectsLocationsManagementServersResponse = Operation;

export type CreateProjectsLocationsManagementServersError = CommonErrors;

export const createProjectsLocationsManagementServers: API.OperationMethod<CreateProjectsLocationsManagementServersRequest, CreateProjectsLocationsManagementServersResponse, CreateProjectsLocationsManagementServersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsManagementServersRequest,
  output: CreateProjectsLocationsManagementServersResponse,
  errors: [],
}));

/** Deletes a single ManagementServer. */
export interface DeleteProjectsLocationsManagementServersRequest {
  /** Required. Name of the resource */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsManagementServersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/managementServers/{managementServersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsManagementServersRequest>;

export type DeleteProjectsLocationsManagementServersResponse = Operation;
export const DeleteProjectsLocationsManagementServersResponse = Operation;

export type DeleteProjectsLocationsManagementServersError = CommonErrors;

export const deleteProjectsLocationsManagementServers: API.OperationMethod<DeleteProjectsLocationsManagementServersRequest, DeleteProjectsLocationsManagementServersResponse, DeleteProjectsLocationsManagementServersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsManagementServersRequest,
  output: DeleteProjectsLocationsManagementServersResponse,
  errors: [],
}));

/** Returns the Assured Workloads compliance metadata for a given project. */
export interface MsComplianceMetadataProjectsLocationsManagementServersRequest {
  /** Required. The project and location to be used to check CSS metadata for target project information, in the format 'projects/{project_id}/locations/{location}'. In Google Cloud Backup and DR, locations map to Google Cloud regions, for example **us-central1**. */
  parent: string;
  /** Request body */
  body?: FetchMsComplianceMetadataRequest;
}

export const MsComplianceMetadataProjectsLocationsManagementServersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(FetchMsComplianceMetadataRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/managementServers:msComplianceMetadata", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MsComplianceMetadataProjectsLocationsManagementServersRequest>;

export type MsComplianceMetadataProjectsLocationsManagementServersResponse = FetchMsComplianceMetadataResponse;
export const MsComplianceMetadataProjectsLocationsManagementServersResponse = FetchMsComplianceMetadataResponse;

export type MsComplianceMetadataProjectsLocationsManagementServersError = CommonErrors;

export const msComplianceMetadataProjectsLocationsManagementServers: API.OperationMethod<MsComplianceMetadataProjectsLocationsManagementServersRequest, MsComplianceMetadataProjectsLocationsManagementServersResponse, MsComplianceMetadataProjectsLocationsManagementServersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MsComplianceMetadataProjectsLocationsManagementServersRequest,
  output: MsComplianceMetadataProjectsLocationsManagementServersResponse,
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

/** Subscribes to a trial for a project */
export interface SubscribeProjectsLocationsTrialRequest {
  /** Required. The project where this trial will be created. Format: projects/{project}/locations/{location} Supported Locations are - us, eu and asia. */
  parent: string;
  /** Request body */
  body?: SubscribeTrialRequest;
}

export const SubscribeProjectsLocationsTrialRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SubscribeTrialRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/trial:subscribe", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SubscribeProjectsLocationsTrialRequest>;

export type SubscribeProjectsLocationsTrialResponse = Trial;
export const SubscribeProjectsLocationsTrialResponse = Trial;

export type SubscribeProjectsLocationsTrialError = CommonErrors;

export const subscribeProjectsLocationsTrial: API.OperationMethod<SubscribeProjectsLocationsTrialRequest, SubscribeProjectsLocationsTrialResponse, SubscribeProjectsLocationsTrialError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SubscribeProjectsLocationsTrialRequest,
  output: SubscribeProjectsLocationsTrialResponse,
  errors: [],
}));

/** Ends the trial for a project */
export interface EndProjectsLocationsTrialRequest {
  /** Required. The parent resource where the trial has been created. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Request body */
  body?: EndTrialRequest;
}

export const EndProjectsLocationsTrialRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(EndTrialRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/trial:end", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EndProjectsLocationsTrialRequest>;

export type EndProjectsLocationsTrialResponse = Trial;
export const EndProjectsLocationsTrialResponse = Trial;

export type EndProjectsLocationsTrialError = CommonErrors;

export const endProjectsLocationsTrial: API.OperationMethod<EndProjectsLocationsTrialRequest, EndProjectsLocationsTrialResponse, EndProjectsLocationsTrialError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EndProjectsLocationsTrialRequest,
  output: EndProjectsLocationsTrialResponse,
  errors: [],
}));

/** Creates a new BackupVault in a given project and location. */
export interface CreateProjectsLocationsBackupVaultsRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. ID of the requesting object If auto-generating ID server-side, remove this field and backup_vault_id from the method_signature of Create RPC */
  backupVaultId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is 'false'. */
  validateOnly?: boolean;
  /** Request body */
  body?: BackupVault;
}

export const CreateProjectsLocationsBackupVaultsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  backupVaultId: Schema.optional(Schema.String).pipe(T.HttpQuery("backupVaultId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(BackupVault).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBackupVaultsRequest>;

export type CreateProjectsLocationsBackupVaultsResponse = Operation;
export const CreateProjectsLocationsBackupVaultsResponse = Operation;

export type CreateProjectsLocationsBackupVaultsError = CommonErrors;

export const createProjectsLocationsBackupVaults: API.OperationMethod<CreateProjectsLocationsBackupVaultsRequest, CreateProjectsLocationsBackupVaultsResponse, CreateProjectsLocationsBackupVaultsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBackupVaultsRequest,
  output: CreateProjectsLocationsBackupVaultsResponse,
  errors: [],
}));

/** Lists BackupVaults in a given project and location. */
export interface ListProjectsLocationsBackupVaultsRequest {
  /** Required. The project and location for which to retrieve backupvault stores information, in the format 'projects/{project_id}/locations/{location}'. In Cloud Backup and DR, locations map to Google Cloud regions, for example **us-central1**. To retrieve backupvault stores for all locations, use "-" for the '{location}' value. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
  /** Optional. Reserved for future use to provide a BASIC & FULL view of Backup Vault. */
  view?: "BACKUP_VAULT_VIEW_UNSPECIFIED" | "BACKUP_VAULT_VIEW_BASIC" | "BACKUP_VAULT_VIEW_FULL" | (string & {});
}

export const ListProjectsLocationsBackupVaultsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackupVaultsRequest>;

export type ListProjectsLocationsBackupVaultsResponse = ListBackupVaultsResponse;
export const ListProjectsLocationsBackupVaultsResponse = ListBackupVaultsResponse;

export type ListProjectsLocationsBackupVaultsError = CommonErrors;

export const listProjectsLocationsBackupVaults = API.makePaginated(() => ({
  input: ListProjectsLocationsBackupVaultsRequest,
  output: ListProjectsLocationsBackupVaultsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** FetchUsableBackupVaults lists usable BackupVaults in a given project and location. Usable BackupVault are the ones that user has backupdr.backupVaults.get permission. */
export interface FetchUsableProjectsLocationsBackupVaultsRequest {
  /** Required. The project and location for which to retrieve backupvault stores information, in the format 'projects/{project_id}/locations/{location}'. In Cloud Backup and DR, locations map to Google Cloud regions, for example **us-central1**. To retrieve backupvault stores for all locations, use "-" for the '{location}' value. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
}

export const FetchUsableProjectsLocationsBackupVaultsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults:fetchUsable" }),
  svc,
) as unknown as Schema.Schema<FetchUsableProjectsLocationsBackupVaultsRequest>;

export type FetchUsableProjectsLocationsBackupVaultsResponse = FetchUsableBackupVaultsResponse;
export const FetchUsableProjectsLocationsBackupVaultsResponse = FetchUsableBackupVaultsResponse;

export type FetchUsableProjectsLocationsBackupVaultsError = CommonErrors;

export const fetchUsableProjectsLocationsBackupVaults = API.makePaginated(() => ({
  input: FetchUsableProjectsLocationsBackupVaultsRequest,
  output: FetchUsableProjectsLocationsBackupVaultsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a BackupVault. */
export interface GetProjectsLocationsBackupVaultsRequest {
  /** Required. Name of the backupvault store resource name, in the format 'projects/{project_id}/locations/{location}/backupVaults/{resource_name}' */
  name: string;
  /** Optional. Reserved for future use to provide a BASIC & FULL view of Backup Vault */
  view?: "BACKUP_VAULT_VIEW_UNSPECIFIED" | "BACKUP_VAULT_VIEW_BASIC" | "BACKUP_VAULT_VIEW_FULL" | (string & {});
}

export const GetProjectsLocationsBackupVaultsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackupVaultsRequest>;

export type GetProjectsLocationsBackupVaultsResponse = BackupVault;
export const GetProjectsLocationsBackupVaultsResponse = BackupVault;

export type GetProjectsLocationsBackupVaultsError = CommonErrors;

export const getProjectsLocationsBackupVaults: API.OperationMethod<GetProjectsLocationsBackupVaultsRequest, GetProjectsLocationsBackupVaultsResponse, GetProjectsLocationsBackupVaultsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackupVaultsRequest,
  output: GetProjectsLocationsBackupVaultsResponse,
  errors: [],
}));

/** Updates the settings of a BackupVault. */
export interface PatchProjectsLocationsBackupVaultsRequest {
  /** Output only. Identifier. Name of the backup vault to create. It must have the format`"projects/{project}/locations/{location}/backupVaults/{backupvault}"`. `{backupvault}` cannot be changed after creation. It must be between 3-63 characters long and must be unique within the project and location. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the BackupVault resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then the request will fail. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is 'false'. */
  validateOnly?: boolean;
  /** Optional. If set to true, will not check plan duration against backup vault enforcement duration. */
  force?: boolean;
  /** Optional. If set to true, we will force update access restriction even if some non compliant data sources are present. The default is 'false'. */
  forceUpdateAccessRestriction?: boolean;
  /** Request body */
  body?: BackupVault;
}

export const PatchProjectsLocationsBackupVaultsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  forceUpdateAccessRestriction: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("forceUpdateAccessRestriction")),
  body: Schema.optional(BackupVault).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackupVaultsRequest>;

export type PatchProjectsLocationsBackupVaultsResponse = Operation;
export const PatchProjectsLocationsBackupVaultsResponse = Operation;

export type PatchProjectsLocationsBackupVaultsError = CommonErrors;

export const patchProjectsLocationsBackupVaults: API.OperationMethod<PatchProjectsLocationsBackupVaultsRequest, PatchProjectsLocationsBackupVaultsResponse, PatchProjectsLocationsBackupVaultsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBackupVaultsRequest,
  output: PatchProjectsLocationsBackupVaultsResponse,
  errors: [],
}));

/** Deletes a BackupVault. */
export interface DeleteProjectsLocationsBackupVaultsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set to true, any data source from this backup vault will also be deleted. */
  force?: boolean;
  /** The current etag of the backup vault. If an etag is provided and does not match the current etag of the connection, deletion will be blocked. */
  etag?: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is 'false'. */
  validateOnly?: boolean;
  /** Optional. If true and the BackupVault is not found, the request will succeed but no action will be taken. */
  allowMissing?: boolean;
  /** Optional. If set to true, backupvault deletion will proceed even if there are backup plans referencing the backupvault. The default is 'false'. */
  ignoreBackupPlanReferences?: boolean;
}

export const DeleteProjectsLocationsBackupVaultsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  ignoreBackupPlanReferences: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ignoreBackupPlanReferences")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackupVaultsRequest>;

export type DeleteProjectsLocationsBackupVaultsResponse = Operation;
export const DeleteProjectsLocationsBackupVaultsResponse = Operation;

export type DeleteProjectsLocationsBackupVaultsError = CommonErrors;

export const deleteProjectsLocationsBackupVaults: API.OperationMethod<DeleteProjectsLocationsBackupVaultsRequest, DeleteProjectsLocationsBackupVaultsResponse, DeleteProjectsLocationsBackupVaultsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBackupVaultsRequest,
  output: DeleteProjectsLocationsBackupVaultsResponse,
  errors: [],
}));

/** Returns the caller's permissions on a BackupVault resource. A caller is not required to have Google IAM permission to make this request. */
export interface TestIamPermissionsProjectsLocationsBackupVaultsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsBackupVaultsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsBackupVaultsRequest>;

export type TestIamPermissionsProjectsLocationsBackupVaultsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsBackupVaultsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsBackupVaultsError = CommonErrors;

export const testIamPermissionsProjectsLocationsBackupVaults: API.OperationMethod<TestIamPermissionsProjectsLocationsBackupVaultsRequest, TestIamPermissionsProjectsLocationsBackupVaultsResponse, TestIamPermissionsProjectsLocationsBackupVaultsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsBackupVaultsRequest,
  output: TestIamPermissionsProjectsLocationsBackupVaultsResponse,
  errors: [],
}));

/** Lists DataSources in a given project and location. */
export interface ListProjectsLocationsBackupVaultsDataSourcesRequest {
  /** Required. The project and location for which to retrieve data sources information, in the format 'projects/{project_id}/locations/{location}'. In Cloud Backup and DR, locations map to Google Cloud regions, for example **us-central1**. To retrieve data sources for all locations, use "-" for the '{location}' value. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
}

export const ListProjectsLocationsBackupVaultsDataSourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/dataSources" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackupVaultsDataSourcesRequest>;

export type ListProjectsLocationsBackupVaultsDataSourcesResponse = ListDataSourcesResponse;
export const ListProjectsLocationsBackupVaultsDataSourcesResponse = ListDataSourcesResponse;

export type ListProjectsLocationsBackupVaultsDataSourcesError = CommonErrors;

export const listProjectsLocationsBackupVaultsDataSources = API.makePaginated(() => ({
  input: ListProjectsLocationsBackupVaultsDataSourcesRequest,
  output: ListProjectsLocationsBackupVaultsDataSourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a DataSource. */
export interface GetProjectsLocationsBackupVaultsDataSourcesRequest {
  /** Required. Name of the data source resource name, in the format 'projects/{project_id}/locations/{location}/backupVaults/{resource_name}/dataSource/{resource_name}' */
  name: string;
}

export const GetProjectsLocationsBackupVaultsDataSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/dataSources/{dataSourcesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackupVaultsDataSourcesRequest>;

export type GetProjectsLocationsBackupVaultsDataSourcesResponse = DataSource;
export const GetProjectsLocationsBackupVaultsDataSourcesResponse = DataSource;

export type GetProjectsLocationsBackupVaultsDataSourcesError = CommonErrors;

export const getProjectsLocationsBackupVaultsDataSources: API.OperationMethod<GetProjectsLocationsBackupVaultsDataSourcesRequest, GetProjectsLocationsBackupVaultsDataSourcesResponse, GetProjectsLocationsBackupVaultsDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackupVaultsDataSourcesRequest,
  output: GetProjectsLocationsBackupVaultsDataSourcesResponse,
  errors: [],
}));

/** Updates the settings of a DataSource. */
export interface PatchProjectsLocationsBackupVaultsDataSourcesRequest {
  /** Output only. Identifier. Name of the datasource to create. It must have the format`"projects/{project}/locations/{location}/backupVaults/{backupvault}/dataSources/{datasource}"`. `{datasource}` cannot be changed after creation. It must be between 3-63 characters long and must be unique within the backup vault. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the DataSource resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then the request will fail. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Enable upsert. */
  allowMissing?: boolean;
  /** Request body */
  body?: DataSource;
}

export const PatchProjectsLocationsBackupVaultsDataSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  body: Schema.optional(DataSource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/dataSources/{dataSourcesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackupVaultsDataSourcesRequest>;

export type PatchProjectsLocationsBackupVaultsDataSourcesResponse = Operation;
export const PatchProjectsLocationsBackupVaultsDataSourcesResponse = Operation;

export type PatchProjectsLocationsBackupVaultsDataSourcesError = CommonErrors;

export const patchProjectsLocationsBackupVaultsDataSources: API.OperationMethod<PatchProjectsLocationsBackupVaultsDataSourcesRequest, PatchProjectsLocationsBackupVaultsDataSourcesResponse, PatchProjectsLocationsBackupVaultsDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBackupVaultsDataSourcesRequest,
  output: PatchProjectsLocationsBackupVaultsDataSourcesResponse,
  errors: [],
}));

/** Deletes a DataSource. This is a custom method instead of a standard delete method because external clients will not delete DataSources except for BackupDR backup appliances. */
export interface RemoveProjectsLocationsBackupVaultsDataSourcesRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Request body */
  body?: RemoveDataSourceRequest;
}

export const RemoveProjectsLocationsBackupVaultsDataSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RemoveDataSourceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/dataSources/{dataSourcesId}:remove", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveProjectsLocationsBackupVaultsDataSourcesRequest>;

export type RemoveProjectsLocationsBackupVaultsDataSourcesResponse = Operation;
export const RemoveProjectsLocationsBackupVaultsDataSourcesResponse = Operation;

export type RemoveProjectsLocationsBackupVaultsDataSourcesError = CommonErrors;

export const removeProjectsLocationsBackupVaultsDataSources: API.OperationMethod<RemoveProjectsLocationsBackupVaultsDataSourcesRequest, RemoveProjectsLocationsBackupVaultsDataSourcesResponse, RemoveProjectsLocationsBackupVaultsDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveProjectsLocationsBackupVaultsDataSourcesRequest,
  output: RemoveProjectsLocationsBackupVaultsDataSourcesResponse,
  errors: [],
}));

/** Sets the internal status of a DataSource. */
export interface SetInternalStatusProjectsLocationsBackupVaultsDataSourcesRequest {
  /** Required. The resource name of the instance, in the format 'projects/* /locations/* /backupVaults/* /dataSources/'. */
  dataSource: string;
  /** Request body */
  body?: SetInternalStatusRequest;
}

export const SetInternalStatusProjectsLocationsBackupVaultsDataSourcesRequest = Schema.Struct({
  dataSource: Schema.String.pipe(T.HttpPath("dataSource")),
  body: Schema.optional(SetInternalStatusRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/dataSources/{dataSourcesId}:setInternalStatus", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetInternalStatusProjectsLocationsBackupVaultsDataSourcesRequest>;

export type SetInternalStatusProjectsLocationsBackupVaultsDataSourcesResponse = Operation;
export const SetInternalStatusProjectsLocationsBackupVaultsDataSourcesResponse = Operation;

export type SetInternalStatusProjectsLocationsBackupVaultsDataSourcesError = CommonErrors;

export const setInternalStatusProjectsLocationsBackupVaultsDataSources: API.OperationMethod<SetInternalStatusProjectsLocationsBackupVaultsDataSourcesRequest, SetInternalStatusProjectsLocationsBackupVaultsDataSourcesResponse, SetInternalStatusProjectsLocationsBackupVaultsDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetInternalStatusProjectsLocationsBackupVaultsDataSourcesRequest,
  output: SetInternalStatusProjectsLocationsBackupVaultsDataSourcesResponse,
  errors: [],
}));

/** Internal only. Initiates a backup. */
export interface InitiateBackupProjectsLocationsBackupVaultsDataSourcesRequest {
  /** Required. The resource name of the instance, in the format 'projects/* /locations/* /backupVaults/* /dataSources/'. */
  dataSource: string;
  /** Request body */
  body?: InitiateBackupRequest;
}

export const InitiateBackupProjectsLocationsBackupVaultsDataSourcesRequest = Schema.Struct({
  dataSource: Schema.String.pipe(T.HttpPath("dataSource")),
  body: Schema.optional(InitiateBackupRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/dataSources/{dataSourcesId}:initiateBackup", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InitiateBackupProjectsLocationsBackupVaultsDataSourcesRequest>;

export type InitiateBackupProjectsLocationsBackupVaultsDataSourcesResponse = InitiateBackupResponse;
export const InitiateBackupProjectsLocationsBackupVaultsDataSourcesResponse = InitiateBackupResponse;

export type InitiateBackupProjectsLocationsBackupVaultsDataSourcesError = CommonErrors;

export const initiateBackupProjectsLocationsBackupVaultsDataSources: API.OperationMethod<InitiateBackupProjectsLocationsBackupVaultsDataSourcesRequest, InitiateBackupProjectsLocationsBackupVaultsDataSourcesResponse, InitiateBackupProjectsLocationsBackupVaultsDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InitiateBackupProjectsLocationsBackupVaultsDataSourcesRequest,
  output: InitiateBackupProjectsLocationsBackupVaultsDataSourcesResponse,
  errors: [],
}));

/** Internal only. Abandons a backup. */
export interface AbandonBackupProjectsLocationsBackupVaultsDataSourcesRequest {
  /** Required. The resource name of the instance, in the format 'projects/* /locations/* /backupVaults/* /dataSources/'. */
  dataSource: string;
  /** Request body */
  body?: AbandonBackupRequest;
}

export const AbandonBackupProjectsLocationsBackupVaultsDataSourcesRequest = Schema.Struct({
  dataSource: Schema.String.pipe(T.HttpPath("dataSource")),
  body: Schema.optional(AbandonBackupRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/dataSources/{dataSourcesId}:abandonBackup", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AbandonBackupProjectsLocationsBackupVaultsDataSourcesRequest>;

export type AbandonBackupProjectsLocationsBackupVaultsDataSourcesResponse = Operation;
export const AbandonBackupProjectsLocationsBackupVaultsDataSourcesResponse = Operation;

export type AbandonBackupProjectsLocationsBackupVaultsDataSourcesError = CommonErrors;

export const abandonBackupProjectsLocationsBackupVaultsDataSources: API.OperationMethod<AbandonBackupProjectsLocationsBackupVaultsDataSourcesRequest, AbandonBackupProjectsLocationsBackupVaultsDataSourcesResponse, AbandonBackupProjectsLocationsBackupVaultsDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AbandonBackupProjectsLocationsBackupVaultsDataSourcesRequest,
  output: AbandonBackupProjectsLocationsBackupVaultsDataSourcesResponse,
  errors: [],
}));

/** Internal only. Finalize a backup that was started by a call to InitiateBackup. */
export interface FinalizeBackupProjectsLocationsBackupVaultsDataSourcesRequest {
  /** Required. The resource name of the instance, in the format 'projects/* /locations/* /backupVaults/* /dataSources/'. */
  dataSource: string;
  /** Request body */
  body?: FinalizeBackupRequest;
}

export const FinalizeBackupProjectsLocationsBackupVaultsDataSourcesRequest = Schema.Struct({
  dataSource: Schema.String.pipe(T.HttpPath("dataSource")),
  body: Schema.optional(FinalizeBackupRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/dataSources/{dataSourcesId}:finalizeBackup", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FinalizeBackupProjectsLocationsBackupVaultsDataSourcesRequest>;

export type FinalizeBackupProjectsLocationsBackupVaultsDataSourcesResponse = Operation;
export const FinalizeBackupProjectsLocationsBackupVaultsDataSourcesResponse = Operation;

export type FinalizeBackupProjectsLocationsBackupVaultsDataSourcesError = CommonErrors;

export const finalizeBackupProjectsLocationsBackupVaultsDataSources: API.OperationMethod<FinalizeBackupProjectsLocationsBackupVaultsDataSourcesRequest, FinalizeBackupProjectsLocationsBackupVaultsDataSourcesResponse, FinalizeBackupProjectsLocationsBackupVaultsDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FinalizeBackupProjectsLocationsBackupVaultsDataSourcesRequest,
  output: FinalizeBackupProjectsLocationsBackupVaultsDataSourcesResponse,
  errors: [],
}));

/** Internal only. Fetch access token for a given data source. */
export interface FetchAccessTokenProjectsLocationsBackupVaultsDataSourcesRequest {
  /** Required. The resource name for the location for which static IPs should be returned. Must be in the format 'projects/* /locations/* /backupVaults/* /dataSources'. */
  name: string;
  /** Request body */
  body?: FetchAccessTokenRequest;
}

export const FetchAccessTokenProjectsLocationsBackupVaultsDataSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(FetchAccessTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/dataSources/{dataSourcesId}:fetchAccessToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FetchAccessTokenProjectsLocationsBackupVaultsDataSourcesRequest>;

export type FetchAccessTokenProjectsLocationsBackupVaultsDataSourcesResponse = FetchAccessTokenResponse;
export const FetchAccessTokenProjectsLocationsBackupVaultsDataSourcesResponse = FetchAccessTokenResponse;

export type FetchAccessTokenProjectsLocationsBackupVaultsDataSourcesError = CommonErrors;

export const fetchAccessTokenProjectsLocationsBackupVaultsDataSources: API.OperationMethod<FetchAccessTokenProjectsLocationsBackupVaultsDataSourcesRequest, FetchAccessTokenProjectsLocationsBackupVaultsDataSourcesResponse, FetchAccessTokenProjectsLocationsBackupVaultsDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchAccessTokenProjectsLocationsBackupVaultsDataSourcesRequest,
  output: FetchAccessTokenProjectsLocationsBackupVaultsDataSourcesResponse,
  errors: [],
}));

/** Lists Backups in a given project and location. */
export interface ListProjectsLocationsBackupVaultsDataSourcesBackupsRequest {
  /** Required. The project and location for which to retrieve backup information, in the format 'projects/{project_id}/locations/{location}'. In Cloud Backup and DR, locations map to Google Cloud regions, for example **us-central1**. To retrieve data sources for all locations, use "-" for the '{location}' value. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
  /** Optional. Reserved for future use to provide a BASIC & FULL view of Backup resource. */
  view?: "BACKUP_VIEW_UNSPECIFIED" | "BACKUP_VIEW_BASIC" | "BACKUP_VIEW_FULL" | (string & {});
}

export const ListProjectsLocationsBackupVaultsDataSourcesBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/dataSources/{dataSourcesId}/backups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackupVaultsDataSourcesBackupsRequest>;

export type ListProjectsLocationsBackupVaultsDataSourcesBackupsResponse = ListBackupsResponse;
export const ListProjectsLocationsBackupVaultsDataSourcesBackupsResponse = ListBackupsResponse;

export type ListProjectsLocationsBackupVaultsDataSourcesBackupsError = CommonErrors;

export const listProjectsLocationsBackupVaultsDataSourcesBackups = API.makePaginated(() => ({
  input: ListProjectsLocationsBackupVaultsDataSourcesBackupsRequest,
  output: ListProjectsLocationsBackupVaultsDataSourcesBackupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Fetch Backups for a given resource type. */
export interface FetchForResourceTypeProjectsLocationsBackupVaultsDataSourcesBackupsRequest {
  /** Required. Datasources are the parent resource for the backups. Format: projects/{project}/locations/{location}/backupVaults/{backupVaultId}/dataSources/{datasourceId} */
  parent: string;
  /** Required. The type of the Google Cloud resource. Ex: sqladmin.googleapis.com/Instance */
  resourceType?: string;
  /** Optional. The maximum number of Backups to return. The service may return fewer than this value. If unspecified, at most 50 Backups will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A page token, received from a previous call of `FetchBackupsForResourceType`. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `FetchBackupsForResourceType` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. A filter expression that filters the results fetched in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. Supported fields: * name * state * backup_type * create_time * expire_time * enforced_retention_end_time * gcp_backup_plan_info.backup_plan * cloud_sql_instance_backup_properties.instance_tier * cloud_sql_instance_backup_properties.database_installed_version */
  filter?: string;
  /** Optional. A comma-separated list of fields to order by, sorted in ascending order. Use "desc" after a field name for descending. Supported fields: * name */
  orderBy?: string;
  /** Optional. This parameter is used to specify the view of the backup. If not specified, the default view is BASIC. */
  view?: "BACKUP_VIEW_UNSPECIFIED" | "BACKUP_VIEW_BASIC" | "BACKUP_VIEW_FULL" | (string & {});
}

export const FetchForResourceTypeProjectsLocationsBackupVaultsDataSourcesBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  resourceType: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceType")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/dataSources/{dataSourcesId}/backups:fetchForResourceType" }),
  svc,
) as unknown as Schema.Schema<FetchForResourceTypeProjectsLocationsBackupVaultsDataSourcesBackupsRequest>;

export type FetchForResourceTypeProjectsLocationsBackupVaultsDataSourcesBackupsResponse = FetchBackupsForResourceTypeResponse;
export const FetchForResourceTypeProjectsLocationsBackupVaultsDataSourcesBackupsResponse = FetchBackupsForResourceTypeResponse;

export type FetchForResourceTypeProjectsLocationsBackupVaultsDataSourcesBackupsError = CommonErrors;

export const fetchForResourceTypeProjectsLocationsBackupVaultsDataSourcesBackups = API.makePaginated(() => ({
  input: FetchForResourceTypeProjectsLocationsBackupVaultsDataSourcesBackupsRequest,
  output: FetchForResourceTypeProjectsLocationsBackupVaultsDataSourcesBackupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a Backup. */
export interface GetProjectsLocationsBackupVaultsDataSourcesBackupsRequest {
  /** Required. Name of the data source resource name, in the format 'projects/{project_id}/locations/{location}/backupVaults/{backupVault}/dataSources/{datasource}/backups/{backup}' */
  name: string;
  /** Optional. Reserved for future use to provide a BASIC & FULL view of Backup resource. */
  view?: "BACKUP_VIEW_UNSPECIFIED" | "BACKUP_VIEW_BASIC" | "BACKUP_VIEW_FULL" | (string & {});
}

export const GetProjectsLocationsBackupVaultsDataSourcesBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/dataSources/{dataSourcesId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackupVaultsDataSourcesBackupsRequest>;

export type GetProjectsLocationsBackupVaultsDataSourcesBackupsResponse = Backup;
export const GetProjectsLocationsBackupVaultsDataSourcesBackupsResponse = Backup;

export type GetProjectsLocationsBackupVaultsDataSourcesBackupsError = CommonErrors;

export const getProjectsLocationsBackupVaultsDataSourcesBackups: API.OperationMethod<GetProjectsLocationsBackupVaultsDataSourcesBackupsRequest, GetProjectsLocationsBackupVaultsDataSourcesBackupsResponse, GetProjectsLocationsBackupVaultsDataSourcesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackupVaultsDataSourcesBackupsRequest,
  output: GetProjectsLocationsBackupVaultsDataSourcesBackupsResponse,
  errors: [],
}));

/** Updates the settings of a Backup. */
export interface PatchProjectsLocationsBackupVaultsDataSourcesBackupsRequest {
  /** Output only. Identifier. Name of the backup to create. It must have the format`"projects//locations//backupVaults//dataSources/{datasource}/backups/{backup}"`. `{backup}` cannot be changed after creation. It must be between 3-63 characters long and must be unique within the datasource. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the Backup resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then the request will fail. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Backup;
}

export const PatchProjectsLocationsBackupVaultsDataSourcesBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Backup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/dataSources/{dataSourcesId}/backups/{backupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackupVaultsDataSourcesBackupsRequest>;

export type PatchProjectsLocationsBackupVaultsDataSourcesBackupsResponse = Operation;
export const PatchProjectsLocationsBackupVaultsDataSourcesBackupsResponse = Operation;

export type PatchProjectsLocationsBackupVaultsDataSourcesBackupsError = CommonErrors;

export const patchProjectsLocationsBackupVaultsDataSourcesBackups: API.OperationMethod<PatchProjectsLocationsBackupVaultsDataSourcesBackupsRequest, PatchProjectsLocationsBackupVaultsDataSourcesBackupsResponse, PatchProjectsLocationsBackupVaultsDataSourcesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBackupVaultsDataSourcesBackupsRequest,
  output: PatchProjectsLocationsBackupVaultsDataSourcesBackupsResponse,
  errors: [],
}));

/** Deletes a Backup. */
export interface DeleteProjectsLocationsBackupVaultsDataSourcesBackupsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsBackupVaultsDataSourcesBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/dataSources/{dataSourcesId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackupVaultsDataSourcesBackupsRequest>;

export type DeleteProjectsLocationsBackupVaultsDataSourcesBackupsResponse = Operation;
export const DeleteProjectsLocationsBackupVaultsDataSourcesBackupsResponse = Operation;

export type DeleteProjectsLocationsBackupVaultsDataSourcesBackupsError = CommonErrors;

export const deleteProjectsLocationsBackupVaultsDataSourcesBackups: API.OperationMethod<DeleteProjectsLocationsBackupVaultsDataSourcesBackupsRequest, DeleteProjectsLocationsBackupVaultsDataSourcesBackupsResponse, DeleteProjectsLocationsBackupVaultsDataSourcesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBackupVaultsDataSourcesBackupsRequest,
  output: DeleteProjectsLocationsBackupVaultsDataSourcesBackupsResponse,
  errors: [],
}));

/** Restore from a Backup */
export interface RestoreProjectsLocationsBackupVaultsDataSourcesBackupsRequest {
  /** Required. The resource name of the Backup instance, in the format 'projects/* /locations/* /backupVaults/* /dataSources/* /backups/'. */
  name: string;
  /** Request body */
  body?: RestoreBackupRequest;
}

export const RestoreProjectsLocationsBackupVaultsDataSourcesBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RestoreBackupRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupVaults/{backupVaultsId}/dataSources/{dataSourcesId}/backups/{backupsId}:restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsLocationsBackupVaultsDataSourcesBackupsRequest>;

export type RestoreProjectsLocationsBackupVaultsDataSourcesBackupsResponse = Operation;
export const RestoreProjectsLocationsBackupVaultsDataSourcesBackupsResponse = Operation;

export type RestoreProjectsLocationsBackupVaultsDataSourcesBackupsError = CommonErrors;

export const restoreProjectsLocationsBackupVaultsDataSourcesBackups: API.OperationMethod<RestoreProjectsLocationsBackupVaultsDataSourcesBackupsRequest, RestoreProjectsLocationsBackupVaultsDataSourcesBackupsResponse, RestoreProjectsLocationsBackupVaultsDataSourcesBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreProjectsLocationsBackupVaultsDataSourcesBackupsRequest,
  output: RestoreProjectsLocationsBackupVaultsDataSourcesBackupsResponse,
  errors: [],
}));

/** Create a BackupPlan */
export interface CreateProjectsLocationsBackupPlansRequest {
  /** Required. The `BackupPlan` project and location in the format `projects/{project}/locations/{location}`. In Google Cloud Backup and DR locations map to Google Cloud regions, for example **us-central1**. */
  parent: string;
  /** Required. The name of the `BackupPlan` to create. The name must be unique for the specified project and location.The name must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens. Pattern, /a-z{,62}/. */
  backupPlanId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: BackupPlan;
}

export const CreateProjectsLocationsBackupPlansRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  backupPlanId: Schema.optional(Schema.String).pipe(T.HttpQuery("backupPlanId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(BackupPlan).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBackupPlansRequest>;

export type CreateProjectsLocationsBackupPlansResponse = Operation;
export const CreateProjectsLocationsBackupPlansResponse = Operation;

export type CreateProjectsLocationsBackupPlansError = CommonErrors;

export const createProjectsLocationsBackupPlans: API.OperationMethod<CreateProjectsLocationsBackupPlansRequest, CreateProjectsLocationsBackupPlansResponse, CreateProjectsLocationsBackupPlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBackupPlansRequest,
  output: CreateProjectsLocationsBackupPlansResponse,
  errors: [],
}));

/** Update a BackupPlan. */
export interface PatchProjectsLocationsBackupPlansRequest {
  /** Output only. Identifier. The resource name of the `BackupPlan`. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}` */
  name: string;
  /** Required. The list of fields to update. Field mask is used to specify the fields to be overwritten in the BackupPlan resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then the request will fail. Currently, these fields are supported in update: description, schedules, retention period, adding and removing Backup Rules. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: BackupPlan;
}

export const PatchProjectsLocationsBackupPlansRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(BackupPlan).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackupPlansRequest>;

export type PatchProjectsLocationsBackupPlansResponse = Operation;
export const PatchProjectsLocationsBackupPlansResponse = Operation;

export type PatchProjectsLocationsBackupPlansError = CommonErrors;

export const patchProjectsLocationsBackupPlans: API.OperationMethod<PatchProjectsLocationsBackupPlansRequest, PatchProjectsLocationsBackupPlansResponse, PatchProjectsLocationsBackupPlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBackupPlansRequest,
  output: PatchProjectsLocationsBackupPlansResponse,
  errors: [],
}));

/** Gets details of a single BackupPlan. */
export interface GetProjectsLocationsBackupPlansRequest {
  /** Required. The resource name of the `BackupPlan` to retrieve. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}` */
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

/** Lists BackupPlans in a given project and location. */
export interface ListProjectsLocationsBackupPlansRequest {
  /** Required. The project and location for which to retrieve `BackupPlans` information. Format: `projects/{project}/locations/{location}`. In Google Cloud Backup and DR, locations map to Google Cloud regions, for example **us-central1**. To retrieve backup plans for all locations, use "-" for the `{location}` value. */
  parent: string;
  /** Optional. The maximum number of `BackupPlans` to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. */
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

/** Deletes a single BackupPlan. */
export interface DeleteProjectsLocationsBackupPlansRequest {
  /** Required. The resource name of the `BackupPlan` to delete. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}` */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsBackupPlansRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackupPlansRequest>;

export type DeleteProjectsLocationsBackupPlansResponse = Operation;
export const DeleteProjectsLocationsBackupPlansResponse = Operation;

export type DeleteProjectsLocationsBackupPlansError = CommonErrors;

export const deleteProjectsLocationsBackupPlans: API.OperationMethod<DeleteProjectsLocationsBackupPlansRequest, DeleteProjectsLocationsBackupPlansResponse, DeleteProjectsLocationsBackupPlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBackupPlansRequest,
  output: DeleteProjectsLocationsBackupPlansResponse,
  errors: [],
}));

/** Gets details of a single BackupPlanRevision. */
export interface GetProjectsLocationsBackupPlansRevisionsRequest {
  /** Required. The resource name of the `BackupPlanRevision` to retrieve. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}/revisions/{revision}` */
  name: string;
}

export const GetProjectsLocationsBackupPlansRevisionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}/revisions/{revisionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackupPlansRevisionsRequest>;

export type GetProjectsLocationsBackupPlansRevisionsResponse = BackupPlanRevision;
export const GetProjectsLocationsBackupPlansRevisionsResponse = BackupPlanRevision;

export type GetProjectsLocationsBackupPlansRevisionsError = CommonErrors;

export const getProjectsLocationsBackupPlansRevisions: API.OperationMethod<GetProjectsLocationsBackupPlansRevisionsRequest, GetProjectsLocationsBackupPlansRevisionsResponse, GetProjectsLocationsBackupPlansRevisionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackupPlansRevisionsRequest,
  output: GetProjectsLocationsBackupPlansRevisionsResponse,
  errors: [],
}));

/** Lists BackupPlanRevisions in a given project and location. */
export interface ListProjectsLocationsBackupPlansRevisionsRequest {
  /** Required. The project and location for which to retrieve `BackupPlanRevisions` information. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}`. In Google Cloud Backup and DR, locations map to Google Cloud regions, for example **us-central1**. */
  parent: string;
  /** Optional. The maximum number of `BackupPlans` to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The value of next_page_token received from a previous `ListBackupPlans` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListBackupPlans` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsBackupPlansRevisionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlans/{backupPlansId}/revisions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackupPlansRevisionsRequest>;

export type ListProjectsLocationsBackupPlansRevisionsResponse = ListBackupPlanRevisionsResponse;
export const ListProjectsLocationsBackupPlansRevisionsResponse = ListBackupPlanRevisionsResponse;

export type ListProjectsLocationsBackupPlansRevisionsError = CommonErrors;

export const listProjectsLocationsBackupPlansRevisions = API.makePaginated(() => ({
  input: ListProjectsLocationsBackupPlansRevisionsRequest,
  output: ListProjectsLocationsBackupPlansRevisionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Create a BackupPlanAssociation */
export interface CreateProjectsLocationsBackupPlanAssociationsRequest {
  /** Required. The backup plan association project and location in the format `projects/{project_id}/locations/{location}`. In Backup and DR locations map to Google Cloud regions, for example **us-central1**. */
  parent: string;
  /** Required. The name of the backup plan association to create. The name must be unique for the specified project and location. */
  backupPlanAssociationId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: BackupPlanAssociation;
}

export const CreateProjectsLocationsBackupPlanAssociationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  backupPlanAssociationId: Schema.optional(Schema.String).pipe(T.HttpQuery("backupPlanAssociationId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(BackupPlanAssociation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlanAssociations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBackupPlanAssociationsRequest>;

export type CreateProjectsLocationsBackupPlanAssociationsResponse = Operation;
export const CreateProjectsLocationsBackupPlanAssociationsResponse = Operation;

export type CreateProjectsLocationsBackupPlanAssociationsError = CommonErrors;

export const createProjectsLocationsBackupPlanAssociations: API.OperationMethod<CreateProjectsLocationsBackupPlanAssociationsRequest, CreateProjectsLocationsBackupPlanAssociationsResponse, CreateProjectsLocationsBackupPlanAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBackupPlanAssociationsRequest,
  output: CreateProjectsLocationsBackupPlanAssociationsResponse,
  errors: [],
}));

/** Update a BackupPlanAssociation. */
export interface PatchProjectsLocationsBackupPlanAssociationsRequest {
  /** Output only. Identifier. The resource name of BackupPlanAssociation in below format Format : projects/{project}/locations/{location}/backupPlanAssociations/{backupPlanAssociationId} */
  name: string;
  /** Required. The list of fields to update. Field mask is used to specify the fields to be overwritten in the BackupPlanAssociation resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then the request will fail. Currently backup_plan_association.backup_plan is the only supported field. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: BackupPlanAssociation;
}

export const PatchProjectsLocationsBackupPlanAssociationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(BackupPlanAssociation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlanAssociations/{backupPlanAssociationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackupPlanAssociationsRequest>;

export type PatchProjectsLocationsBackupPlanAssociationsResponse = Operation;
export const PatchProjectsLocationsBackupPlanAssociationsResponse = Operation;

export type PatchProjectsLocationsBackupPlanAssociationsError = CommonErrors;

export const patchProjectsLocationsBackupPlanAssociations: API.OperationMethod<PatchProjectsLocationsBackupPlanAssociationsRequest, PatchProjectsLocationsBackupPlanAssociationsResponse, PatchProjectsLocationsBackupPlanAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBackupPlanAssociationsRequest,
  output: PatchProjectsLocationsBackupPlanAssociationsResponse,
  errors: [],
}));

/** Gets details of a single BackupPlanAssociation. */
export interface GetProjectsLocationsBackupPlanAssociationsRequest {
  /** Required. Name of the backup plan association resource, in the format `projects/{project}/locations/{location}/backupPlanAssociations/{backupPlanAssociationId}` */
  name: string;
}

export const GetProjectsLocationsBackupPlanAssociationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlanAssociations/{backupPlanAssociationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackupPlanAssociationsRequest>;

export type GetProjectsLocationsBackupPlanAssociationsResponse = BackupPlanAssociation;
export const GetProjectsLocationsBackupPlanAssociationsResponse = BackupPlanAssociation;

export type GetProjectsLocationsBackupPlanAssociationsError = CommonErrors;

export const getProjectsLocationsBackupPlanAssociations: API.OperationMethod<GetProjectsLocationsBackupPlanAssociationsRequest, GetProjectsLocationsBackupPlanAssociationsResponse, GetProjectsLocationsBackupPlanAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackupPlanAssociationsRequest,
  output: GetProjectsLocationsBackupPlanAssociationsResponse,
  errors: [],
}));

/** Lists BackupPlanAssociations in a given project and location. */
export interface ListProjectsLocationsBackupPlanAssociationsRequest {
  /** Required. The project and location for which to retrieve backup Plan Associations information, in the format `projects/{project_id}/locations/{location}`. In Backup and DR, locations map to Google Cloud regions, for example **us-central1**. To retrieve backup plan associations for all locations, use "-" for the `{location}` value. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
}

export const ListProjectsLocationsBackupPlanAssociationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlanAssociations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackupPlanAssociationsRequest>;

export type ListProjectsLocationsBackupPlanAssociationsResponse = ListBackupPlanAssociationsResponse;
export const ListProjectsLocationsBackupPlanAssociationsResponse = ListBackupPlanAssociationsResponse;

export type ListProjectsLocationsBackupPlanAssociationsError = CommonErrors;

export const listProjectsLocationsBackupPlanAssociations = API.makePaginated(() => ({
  input: ListProjectsLocationsBackupPlanAssociationsRequest,
  output: ListProjectsLocationsBackupPlanAssociationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List BackupPlanAssociations for a given resource type. */
export interface FetchForResourceTypeProjectsLocationsBackupPlanAssociationsRequest {
  /** Required. The parent resource name. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Required. The type of the Google Cloud resource. Ex: sql.googleapis.com/Instance */
  resourceType?: string;
  /** Optional. The maximum number of BackupPlanAssociations to return. The service may return fewer than this value. If unspecified, at most 50 BackupPlanAssociations will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A page token, received from a previous call of `FetchBackupPlanAssociationsForResourceType`. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `FetchBackupPlanAssociationsForResourceType` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. A filter expression that filters the results fetched in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. Supported fields: * resource * backup_plan * state * data_source * cloud_sql_instance_backup_plan_association_properties.instance_create_time */
  filter?: string;
  /** Optional. A comma-separated list of fields to order by, sorted in ascending order. Use "desc" after a field name for descending. Supported fields: * name */
  orderBy?: string;
}

export const FetchForResourceTypeProjectsLocationsBackupPlanAssociationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  resourceType: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceType")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlanAssociations:fetchForResourceType" }),
  svc,
) as unknown as Schema.Schema<FetchForResourceTypeProjectsLocationsBackupPlanAssociationsRequest>;

export type FetchForResourceTypeProjectsLocationsBackupPlanAssociationsResponse = FetchBackupPlanAssociationsForResourceTypeResponse;
export const FetchForResourceTypeProjectsLocationsBackupPlanAssociationsResponse = FetchBackupPlanAssociationsForResourceTypeResponse;

export type FetchForResourceTypeProjectsLocationsBackupPlanAssociationsError = CommonErrors;

export const fetchForResourceTypeProjectsLocationsBackupPlanAssociations = API.makePaginated(() => ({
  input: FetchForResourceTypeProjectsLocationsBackupPlanAssociationsRequest,
  output: FetchForResourceTypeProjectsLocationsBackupPlanAssociationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a single BackupPlanAssociation. */
export interface DeleteProjectsLocationsBackupPlanAssociationsRequest {
  /** Required. Name of the backup plan association resource, in the format `projects/{project}/locations/{location}/backupPlanAssociations/{backupPlanAssociationId}` */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsBackupPlanAssociationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlanAssociations/{backupPlanAssociationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackupPlanAssociationsRequest>;

export type DeleteProjectsLocationsBackupPlanAssociationsResponse = Operation;
export const DeleteProjectsLocationsBackupPlanAssociationsResponse = Operation;

export type DeleteProjectsLocationsBackupPlanAssociationsError = CommonErrors;

export const deleteProjectsLocationsBackupPlanAssociations: API.OperationMethod<DeleteProjectsLocationsBackupPlanAssociationsRequest, DeleteProjectsLocationsBackupPlanAssociationsResponse, DeleteProjectsLocationsBackupPlanAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBackupPlanAssociationsRequest,
  output: DeleteProjectsLocationsBackupPlanAssociationsResponse,
  errors: [],
}));

/** Triggers a new Backup. */
export interface TriggerBackupProjectsLocationsBackupPlanAssociationsRequest {
  /** Required. Name of the backup plan association resource, in the format `projects/{project}/locations/{location}/backupPlanAssociations/{backupPlanAssociationId}` */
  name: string;
  /** Request body */
  body?: TriggerBackupRequest;
}

export const TriggerBackupProjectsLocationsBackupPlanAssociationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(TriggerBackupRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backupPlanAssociations/{backupPlanAssociationsId}:triggerBackup", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TriggerBackupProjectsLocationsBackupPlanAssociationsRequest>;

export type TriggerBackupProjectsLocationsBackupPlanAssociationsResponse = Operation;
export const TriggerBackupProjectsLocationsBackupPlanAssociationsResponse = Operation;

export type TriggerBackupProjectsLocationsBackupPlanAssociationsError = CommonErrors;

export const triggerBackupProjectsLocationsBackupPlanAssociations: API.OperationMethod<TriggerBackupProjectsLocationsBackupPlanAssociationsRequest, TriggerBackupProjectsLocationsBackupPlanAssociationsResponse, TriggerBackupProjectsLocationsBackupPlanAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TriggerBackupProjectsLocationsBackupPlanAssociationsRequest,
  output: TriggerBackupProjectsLocationsBackupPlanAssociationsResponse,
  errors: [],
}));

/** Gets details of a single DataSourceReference. */
export interface GetProjectsLocationsDataSourceReferencesRequest {
  /** Required. The name of the DataSourceReference to retrieve. Format: projects/{project}/locations/{location}/dataSourceReferences/{data_source_reference} */
  name: string;
}

export const GetProjectsLocationsDataSourceReferencesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataSourceReferences/{dataSourceReferencesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDataSourceReferencesRequest>;

export type GetProjectsLocationsDataSourceReferencesResponse = DataSourceReference;
export const GetProjectsLocationsDataSourceReferencesResponse = DataSourceReference;

export type GetProjectsLocationsDataSourceReferencesError = CommonErrors;

export const getProjectsLocationsDataSourceReferences: API.OperationMethod<GetProjectsLocationsDataSourceReferencesRequest, GetProjectsLocationsDataSourceReferencesResponse, GetProjectsLocationsDataSourceReferencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDataSourceReferencesRequest,
  output: GetProjectsLocationsDataSourceReferencesResponse,
  errors: [],
}));

/** Lists DataSourceReferences for a given project and location. */
export interface ListProjectsLocationsDataSourceReferencesRequest {
  /** Required. The parent resource name. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Optional. The maximum number of DataSourceReferences to return. The service may return fewer than this value. If unspecified, at most 50 DataSourceReferences will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListDataSourceReferences` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDataSourceReferences` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. A filter expression that filters the results listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The following field and operator combinations are supported: * data_source_gcp_resource_info.gcp_resourcename with `=`, `!=` * data_source_gcp_resource_info.type with `=`, `!=` */
  filter?: string;
  /** Optional. A comma-separated list of fields to order by, sorted in ascending order. Use "desc" after a field name for descending. Supported fields: * data_source * data_source_gcp_resource_info.gcp_resourcename */
  orderBy?: string;
}

export const ListProjectsLocationsDataSourceReferencesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataSourceReferences" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDataSourceReferencesRequest>;

export type ListProjectsLocationsDataSourceReferencesResponse = ListDataSourceReferencesResponse;
export const ListProjectsLocationsDataSourceReferencesResponse = ListDataSourceReferencesResponse;

export type ListProjectsLocationsDataSourceReferencesError = CommonErrors;

export const listProjectsLocationsDataSourceReferences = API.makePaginated(() => ({
  input: ListProjectsLocationsDataSourceReferencesRequest,
  output: ListProjectsLocationsDataSourceReferencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Fetch DataSourceReferences for a given project, location and resource type. */
export interface FetchForResourceTypeProjectsLocationsDataSourceReferencesRequest {
  /** Required. The parent resource name. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Required. The type of the Google Cloud resource. Ex: sql.googleapis.com/Instance */
  resourceType?: string;
  /** Optional. The maximum number of DataSourceReferences to return. The service may return fewer than this value. If unspecified, at most 50 DataSourceReferences will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A page token, received from a previous call of `FetchDataSourceReferencesForResourceType`. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `FetchDataSourceReferencesForResourceType` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. A filter expression that filters the results fetched in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. Supported fields: * data_source * data_source_gcp_resource_info.gcp_resourcename * data_source_backup_config_state * data_source_backup_count * data_source_backup_config_info.last_backup_state * data_source_gcp_resource_info.gcp_resourcename * data_source_gcp_resource_info.type * data_source_gcp_resource_info.location * data_source_gcp_resource_info.cloud_sql_instance_properties.instance_create_time */
  filter?: string;
  /** Optional. A comma-separated list of fields to order by, sorted in ascending order. Use "desc" after a field name for descending. Supported fields: * name */
  orderBy?: string;
}

export const FetchForResourceTypeProjectsLocationsDataSourceReferencesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  resourceType: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceType")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataSourceReferences:fetchForResourceType" }),
  svc,
) as unknown as Schema.Schema<FetchForResourceTypeProjectsLocationsDataSourceReferencesRequest>;

export type FetchForResourceTypeProjectsLocationsDataSourceReferencesResponse = FetchDataSourceReferencesForResourceTypeResponse;
export const FetchForResourceTypeProjectsLocationsDataSourceReferencesResponse = FetchDataSourceReferencesForResourceTypeResponse;

export type FetchForResourceTypeProjectsLocationsDataSourceReferencesError = CommonErrors;

export const fetchForResourceTypeProjectsLocationsDataSourceReferences = API.makePaginated(() => ({
  input: FetchForResourceTypeProjectsLocationsDataSourceReferencesRequest,
  output: FetchForResourceTypeProjectsLocationsDataSourceReferencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Initializes the service related config for a project. */
export interface InitializeProjectsLocationsServiceConfigRequest {
  /** Required. The resource name of the serviceConfig used to initialize the service. The location must be the location of the BackupVault. Format: `projects/{project_id}/locations/{location}/serviceConfig`. */
  name: string;
  /** Request body */
  body?: InitializeServiceRequest;
}

export const InitializeProjectsLocationsServiceConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(InitializeServiceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConfig:initialize", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InitializeProjectsLocationsServiceConfigRequest>;

export type InitializeProjectsLocationsServiceConfigResponse = Operation;
export const InitializeProjectsLocationsServiceConfigResponse = Operation;

export type InitializeProjectsLocationsServiceConfigError = CommonErrors;

export const initializeProjectsLocationsServiceConfig: API.OperationMethod<InitializeProjectsLocationsServiceConfigRequest, InitializeProjectsLocationsServiceConfigResponse, InitializeProjectsLocationsServiceConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InitializeProjectsLocationsServiceConfigRequest,
  output: InitializeProjectsLocationsServiceConfigResponse,
  errors: [],
}));

/** Lists ResourceBackupConfigs. */
export interface ListProjectsLocationsResourceBackupConfigsRequest {
  /** Required. The project and location for which to retrieve resource backup configs. Format: 'projects/{project_id}/locations/{location}'. In Google Cloud Backup and DR, locations map to Google Cloud regions, for example **us-central1**. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will use 100 as default. Maximum value is 500 and values above 500 will be coerced to 500. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
}

export const ListProjectsLocationsResourceBackupConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/resourceBackupConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsResourceBackupConfigsRequest>;

export type ListProjectsLocationsResourceBackupConfigsResponse = ListResourceBackupConfigsResponse;
export const ListProjectsLocationsResourceBackupConfigsResponse = ListResourceBackupConfigsResponse;

export type ListProjectsLocationsResourceBackupConfigsError = CommonErrors;

export const listProjectsLocationsResourceBackupConfigs = API.makePaginated(() => ({
  input: ListProjectsLocationsResourceBackupConfigsRequest,
  output: ListProjectsLocationsResourceBackupConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

