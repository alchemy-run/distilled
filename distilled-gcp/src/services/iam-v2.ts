// ==========================================================================
// Identity and Access Management (IAM) API (iam v2)
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
  name: "iam",
  version: "v2",
  rootUrl: "https://iam.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleRpcStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleLongrunningOperation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(GoogleRpcStatus),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleLongrunningOperation" }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleTypeExpr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const GoogleTypeExpr: Schema.Schema<GoogleTypeExpr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypeExpr" }) as any as Schema.Schema<GoogleTypeExpr>;

export interface GoogleIamV2DenyRule {
  /** The identities that are prevented from using one or more permissions on Google Cloud resources. This field can contain the following values: * `principal://goog/subject/{email_id}`: A specific Google Account. Includes Gmail, Cloud Identity, and Google Workspace user accounts. For example, `principal://goog/subject/alice@example.com`. * `principal://iam.googleapis.com/projects/-/serviceAccounts/{service_account_id}`: A Google Cloud service account. For example, `principal://iam.googleapis.com/projects/-/serviceAccounts/my-service-account@iam.gserviceaccount.com`. * `principalSet://goog/group/{group_id}`: A Google group. For example, `principalSet://goog/group/admins@example.com`. * `principalSet://goog/public:all`: A special identifier that represents any principal that is on the internet, even if they do not have a Google Account or are not logged in. * `principalSet://goog/cloudIdentityCustomerId/{customer_id}`: All of the principals associated with the specified Google Workspace or Cloud Identity customer ID. For example, `principalSet://goog/cloudIdentityCustomerId/C01Abc35`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `principalSet://cloudresourcemanager.googleapis.com/[projects|folders|organizations]/{project_number|folder_number|org_number}/type/ServiceAccount`: All service accounts grouped under a resource (project, folder, or organization). * `principalSet://cloudresourcemanager.googleapis.com/[projects|folders|organizations]/{project_number|folder_number|org_number}/type/ServiceAgent`: All service agents grouped under a resource (project, folder, or organization). * `deleted:principal://goog/subject/{email_id}?uid={uid}`: A specific Google Account that was deleted recently. For example, `deleted:principal://goog/subject/alice@example.com?uid=1234567890`. If the Google Account is recovered, this identifier reverts to the standard identifier for a Google Account. * `deleted:principalSet://goog/group/{group_id}?uid={uid}`: A Google group that was deleted recently. For example, `deleted:principalSet://goog/group/admins@example.com?uid=1234567890`. If the Google group is restored, this identifier reverts to the standard identifier for a Google group. * `deleted:principal://iam.googleapis.com/projects/-/serviceAccounts/{service_account_id}?uid={uid}`: A Google Cloud service account that was deleted recently. For example, `deleted:principal://iam.googleapis.com/projects/-/serviceAccounts/my-service-account@iam.gserviceaccount.com?uid=1234567890`. If the service account is undeleted, this identifier reverts to the standard identifier for a service account. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  deniedPrincipals?: Array<string>;
  /** The identities that are excluded from the deny rule, even if they are listed in the `denied_principals`. For example, you could add a Google group to the `denied_principals`, then exclude specific users who belong to that group. This field can contain the same values as the `denied_principals` field, excluding `principalSet://goog/public:all`, which represents all users on the internet. */
  exceptionPrincipals?: Array<string>;
  /** The permissions that are explicitly denied by this rule. Each permission uses the format `{service_fqdn}/{resource}.{verb}`, where `{service_fqdn}` is the fully qualified domain name for the service. For example, `iam.googleapis.com/roles.list`. */
  deniedPermissions?: Array<string>;
  /** Specifies the permissions that this rule excludes from the set of denied permissions given by `denied_permissions`. If a permission appears in `denied_permissions` _and_ in `exception_permissions` then it will _not_ be denied. The excluded permissions can be specified using the same syntax as `denied_permissions`. */
  exceptionPermissions?: Array<string>;
  /** The condition that determines whether this deny rule applies to a request. If the condition expression evaluates to `true`, then the deny rule is applied; otherwise, the deny rule is not applied. Each deny rule is evaluated independently. If this deny rule does not apply to a request, other deny rules might still apply. The condition can use CEL functions that evaluate [resource tags](https://cloud.google.com/iam/help/conditions/resource-tags). Other functions and operators are not supported. */
  denialCondition?: GoogleTypeExpr;
}

export const GoogleIamV2DenyRule: Schema.Schema<GoogleIamV2DenyRule> = Schema.suspend(() => Schema.Struct({
  deniedPrincipals: Schema.optional(Schema.Array(Schema.String)),
  exceptionPrincipals: Schema.optional(Schema.Array(Schema.String)),
  deniedPermissions: Schema.optional(Schema.Array(Schema.String)),
  exceptionPermissions: Schema.optional(Schema.Array(Schema.String)),
  denialCondition: Schema.optional(GoogleTypeExpr),
})).annotate({ identifier: "GoogleIamV2DenyRule" }) as any as Schema.Schema<GoogleIamV2DenyRule>;

export interface GoogleIamV2PolicyRule {
  /** A rule for a deny policy. */
  denyRule?: GoogleIamV2DenyRule;
  /** A user-specified description of the rule. This value can be up to 256 characters. */
  description?: string;
}

export const GoogleIamV2PolicyRule: Schema.Schema<GoogleIamV2PolicyRule> = Schema.suspend(() => Schema.Struct({
  denyRule: Schema.optional(GoogleIamV2DenyRule),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV2PolicyRule" }) as any as Schema.Schema<GoogleIamV2PolicyRule>;

export interface GoogleIamV2Policy {
  /** Immutable. The resource name of the `Policy`, which must be unique. Format: `policies/{attachment_point}/denypolicies/{policy_id}` The attachment point is identified by its URL-encoded full resource name, which means that the forward-slash character, `/`, must be written as `%2F`. For example, `policies/cloudresourcemanager.googleapis.com%2Fprojects%2Fmy-project/denypolicies/my-deny-policy`. For organizations and folders, use the numeric ID in the full resource name. For projects, requests can use the alphanumeric or the numeric ID. Responses always contain the numeric ID. */
  name?: string;
  /** Immutable. The globally unique ID of the `Policy`. Assigned automatically when the `Policy` is created. */
  uid?: string;
  /** Output only. The kind of the `Policy`. Always contains the value `DenyPolicy`. */
  kind?: string;
  /** A user-specified description of the `Policy`. This value can be up to 63 characters. */
  displayName?: string;
  /** A key-value map to store arbitrary metadata for the `Policy`. Keys can be up to 63 characters. Values can be up to 255 characters. */
  annotations?: Record<string, string>;
  /** An opaque tag that identifies the current version of the `Policy`. IAM uses this value to help manage concurrent updates, so they do not cause one update to be overwritten by another. If this field is present in a CreatePolicyRequest, the value is ignored. */
  etag?: string;
  /** Output only. The time when the `Policy` was created. */
  createTime?: string;
  /** Output only. The time when the `Policy` was last updated. */
  updateTime?: string;
  /** Output only. The time when the `Policy` was deleted. Empty if the policy is not deleted. */
  deleteTime?: string;
  /** A list of rules that specify the behavior of the `Policy`. All of the rules should be of the `kind` specified in the `Policy`. */
  rules?: Array<GoogleIamV2PolicyRule>;
}

export const GoogleIamV2Policy: Schema.Schema<GoogleIamV2Policy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  rules: Schema.optional(Schema.Array(GoogleIamV2PolicyRule)),
})).annotate({ identifier: "GoogleIamV2Policy" }) as any as Schema.Schema<GoogleIamV2Policy>;

export interface GoogleIamV2ListPoliciesResponse {
  /** Metadata for the policies that are attached to the resource. */
  policies?: Array<GoogleIamV2Policy>;
  /** A page token that you can use in a ListPoliciesRequest to retrieve the next page. If this field is omitted, there are no additional pages. */
  nextPageToken?: string;
}

export const GoogleIamV2ListPoliciesResponse: Schema.Schema<GoogleIamV2ListPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  policies: Schema.optional(Schema.Array(GoogleIamV2Policy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV2ListPoliciesResponse" }) as any as Schema.Schema<GoogleIamV2ListPoliciesResponse>;

export interface GoogleIamAdminV1AuditDataPermissionDelta {
  /** Added permissions. */
  addedPermissions?: Array<string>;
  /** Removed permissions. */
  removedPermissions?: Array<string>;
}

export const GoogleIamAdminV1AuditDataPermissionDelta: Schema.Schema<GoogleIamAdminV1AuditDataPermissionDelta> = Schema.suspend(() => Schema.Struct({
  addedPermissions: Schema.optional(Schema.Array(Schema.String)),
  removedPermissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIamAdminV1AuditDataPermissionDelta" }) as any as Schema.Schema<GoogleIamAdminV1AuditDataPermissionDelta>;

export interface GoogleIamAdminV1AuditData {
  /** The permission_delta when when creating or updating a Role. */
  permissionDelta?: GoogleIamAdminV1AuditDataPermissionDelta;
}

export const GoogleIamAdminV1AuditData: Schema.Schema<GoogleIamAdminV1AuditData> = Schema.suspend(() => Schema.Struct({
  permissionDelta: Schema.optional(GoogleIamAdminV1AuditDataPermissionDelta),
})).annotate({ identifier: "GoogleIamAdminV1AuditData" }) as any as Schema.Schema<GoogleIamAdminV1AuditData>;

export interface GoogleIamV1BindingDelta {
  /** The action that was performed on a Binding. Required */
  action?: "ACTION_UNSPECIFIED" | "ADD" | "REMOVE" | (string & {});
  /** Role that is assigned to `members`. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. Required */
  role?: string;
  /** A single identity requesting access for a Google Cloud resource. Follows the same format of Binding.members. Required */
  member?: string;
  /** The condition that is associated with this binding. */
  condition?: GoogleTypeExpr;
}

export const GoogleIamV1BindingDelta: Schema.Schema<GoogleIamV1BindingDelta> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  member: Schema.optional(Schema.String),
  condition: Schema.optional(GoogleTypeExpr),
})).annotate({ identifier: "GoogleIamV1BindingDelta" }) as any as Schema.Schema<GoogleIamV1BindingDelta>;

export interface GoogleIamV1PolicyDelta {
  /** The delta for Bindings between two policies. */
  bindingDeltas?: Array<GoogleIamV1BindingDelta>;
}

export const GoogleIamV1PolicyDelta: Schema.Schema<GoogleIamV1PolicyDelta> = Schema.suspend(() => Schema.Struct({
  bindingDeltas: Schema.optional(Schema.Array(GoogleIamV1BindingDelta)),
})).annotate({ identifier: "GoogleIamV1PolicyDelta" }) as any as Schema.Schema<GoogleIamV1PolicyDelta>;

export interface GoogleIamV1LoggingAuditData {
  /** Policy delta between the original policy and the newly set policy. */
  policyDelta?: GoogleIamV1PolicyDelta;
}

export const GoogleIamV1LoggingAuditData: Schema.Schema<GoogleIamV1LoggingAuditData> = Schema.suspend(() => Schema.Struct({
  policyDelta: Schema.optional(GoogleIamV1PolicyDelta),
})).annotate({ identifier: "GoogleIamV1LoggingAuditData" }) as any as Schema.Schema<GoogleIamV1LoggingAuditData>;

export interface GoogleIamV2PolicyOperationMetadata {
  /** Timestamp when the `google.longrunning.Operation` was created. */
  createTime?: string;
}

export const GoogleIamV2PolicyOperationMetadata: Schema.Schema<GoogleIamV2PolicyOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV2PolicyOperationMetadata" }) as any as Schema.Schema<GoogleIamV2PolicyOperationMetadata>;

export interface GoogleIamV1betaWorkloadIdentityPoolOperationMetadata {
}

export const GoogleIamV1betaWorkloadIdentityPoolOperationMetadata: Schema.Schema<GoogleIamV1betaWorkloadIdentityPoolOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleIamV1betaWorkloadIdentityPoolOperationMetadata" }) as any as Schema.Schema<GoogleIamV1betaWorkloadIdentityPoolOperationMetadata>;

export interface GoogleCloudCommonOperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusDetail?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  cancelRequested?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudCommonOperationMetadata: Schema.Schema<GoogleCloudCommonOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusDetail: Schema.optional(Schema.String),
  cancelRequested: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudCommonOperationMetadata" }) as any as Schema.Schema<GoogleCloudCommonOperationMetadata>;

export interface GoogleIamV3mainOperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleIamV3mainOperationMetadata: Schema.Schema<GoogleIamV3mainOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV3mainOperationMetadata" }) as any as Schema.Schema<GoogleIamV3mainOperationMetadata>;

export interface GoogleIamV3alphaOperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleIamV3alphaOperationMetadata: Schema.Schema<GoogleIamV3alphaOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV3alphaOperationMetadata" }) as any as Schema.Schema<GoogleIamV3alphaOperationMetadata>;

export interface GoogleIamV3betaOperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleIamV3betaOperationMetadata: Schema.Schema<GoogleIamV3betaOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV3betaOperationMetadata" }) as any as Schema.Schema<GoogleIamV3betaOperationMetadata>;

export interface GoogleIamV3OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleIamV3OperationMetadata: Schema.Schema<GoogleIamV3OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV3OperationMetadata" }) as any as Schema.Schema<GoogleIamV3OperationMetadata>;

export interface CloudControl2SharedOperationsReconciliationOperationMetadata {
  /** DEPRECATED. Use exclusive_action instead. */
  deleteResource?: boolean;
  /** Excluisive action returned by the CLH. */
  exclusiveAction?: "UNKNOWN_REPAIR_ACTION" | "DELETE" | "RETRY" | (string & {});
}

export const CloudControl2SharedOperationsReconciliationOperationMetadata: Schema.Schema<CloudControl2SharedOperationsReconciliationOperationMetadata> = Schema.suspend(() => Schema.Struct({
  deleteResource: Schema.optional(Schema.Boolean),
  exclusiveAction: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudControl2SharedOperationsReconciliationOperationMetadata" }) as any as Schema.Schema<CloudControl2SharedOperationsReconciliationOperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Retrieves the policies of the specified kind that are attached to a resource. The response lists only policy metadata. In particular, policy rules are omitted. */
export interface ListPoliciesPoliciesRequest {
  /** Required. The resource that the policy is attached to, along with the kind of policy to list. Format: `policies/{attachment_point}/denypolicies` The attachment point is identified by its URL-encoded full resource name, which means that the forward-slash character, `/`, must be written as `%2F`. For example, `policies/cloudresourcemanager.googleapis.com%2Fprojects%2Fmy-project/denypolicies`. For organizations and folders, use the numeric ID in the full resource name. For projects, you can use the alphanumeric or the numeric ID. */
  parent: string;
  /** The maximum number of policies to return. IAM ignores this value and uses the value 1000. */
  pageSize?: number;
  /** A page token received in a ListPoliciesResponse. Provide this token to retrieve the next page. */
  pageToken?: string;
}

export const ListPoliciesPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/policies/{policiesId}/{policiesId1}" }),
  svc,
) as unknown as Schema.Schema<ListPoliciesPoliciesRequest>;

export type ListPoliciesPoliciesResponse = GoogleIamV2ListPoliciesResponse;
export const ListPoliciesPoliciesResponse = GoogleIamV2ListPoliciesResponse;

export type ListPoliciesPoliciesError = CommonErrors;

export const listPoliciesPolicies = API.makePaginated(() => ({
  input: ListPoliciesPoliciesRequest,
  output: ListPoliciesPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a policy. */
export interface GetPoliciesRequest {
  /** Required. The resource name of the policy to retrieve. Format: `policies/{attachment_point}/denypolicies/{policy_id}` Use the URL-encoded full resource name, which means that the forward-slash character, `/`, must be written as `%2F`. For example, `policies/cloudresourcemanager.googleapis.com%2Fprojects%2Fmy-project/denypolicies/my-policy`. For organizations and folders, use the numeric ID in the full resource name. For projects, you can use the alphanumeric or the numeric ID. */
  name: string;
}

export const GetPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/policies/{policiesId}/{policiesId1}/{policiesId2}" }),
  svc,
) as unknown as Schema.Schema<GetPoliciesRequest>;

export type GetPoliciesResponse = GoogleIamV2Policy;
export const GetPoliciesResponse = GoogleIamV2Policy;

export type GetPoliciesError = CommonErrors;

export const getPolicies: API.OperationMethod<GetPoliciesRequest, GetPoliciesResponse, GetPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPoliciesRequest,
  output: GetPoliciesResponse,
  errors: [],
}));

/** Creates a policy. */
export interface CreatePolicyPoliciesRequest {
  /** Required. The resource that the policy is attached to, along with the kind of policy to create. Format: `policies/{attachment_point}/denypolicies` The attachment point is identified by its URL-encoded full resource name, which means that the forward-slash character, `/`, must be written as `%2F`. For example, `policies/cloudresourcemanager.googleapis.com%2Fprojects%2Fmy-project/denypolicies`. For organizations and folders, use the numeric ID in the full resource name. For projects, you can use the alphanumeric or the numeric ID. */
  parent: string;
  /** The ID to use for this policy, which will become the final component of the policy's resource name. The ID must contain 3 to 63 characters. It can contain lowercase letters and numbers, as well as dashes (`-`) and periods (`.`). The first character must be a lowercase letter. */
  policyId?: string;
  /** Request body */
  body?: GoogleIamV2Policy;
}

export const CreatePolicyPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  policyId: Schema.optional(Schema.String).pipe(T.HttpQuery("policyId")),
  body: Schema.optional(GoogleIamV2Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/policies/{policiesId}/{policiesId1}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePolicyPoliciesRequest>;

export type CreatePolicyPoliciesResponse = GoogleLongrunningOperation;
export const CreatePolicyPoliciesResponse = GoogleLongrunningOperation;

export type CreatePolicyPoliciesError = CommonErrors;

export const createPolicyPolicies: API.OperationMethod<CreatePolicyPoliciesRequest, CreatePolicyPoliciesResponse, CreatePolicyPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePolicyPoliciesRequest,
  output: CreatePolicyPoliciesResponse,
  errors: [],
}));

/** Updates the specified policy. You can update only the rules and the display name for the policy. To update a policy, you should use a read-modify-write loop: 1. Use GetPolicy to read the current version of the policy. 2. Modify the policy as needed. 3. Use `UpdatePolicy` to write the updated policy. This pattern helps prevent conflicts between concurrent updates. */
export interface UpdatePoliciesRequest {
  /** Immutable. The resource name of the `Policy`, which must be unique. Format: `policies/{attachment_point}/denypolicies/{policy_id}` The attachment point is identified by its URL-encoded full resource name, which means that the forward-slash character, `/`, must be written as `%2F`. For example, `policies/cloudresourcemanager.googleapis.com%2Fprojects%2Fmy-project/denypolicies/my-deny-policy`. For organizations and folders, use the numeric ID in the full resource name. For projects, requests can use the alphanumeric or the numeric ID. Responses always contain the numeric ID. */
  name: string;
  /** Request body */
  body?: GoogleIamV2Policy;
}

export const UpdatePoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleIamV2Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v2/policies/{policiesId}/{policiesId1}/{policiesId2}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePoliciesRequest>;

export type UpdatePoliciesResponse = GoogleLongrunningOperation;
export const UpdatePoliciesResponse = GoogleLongrunningOperation;

export type UpdatePoliciesError = CommonErrors;

export const updatePolicies: API.OperationMethod<UpdatePoliciesRequest, UpdatePoliciesResponse, UpdatePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatePoliciesRequest,
  output: UpdatePoliciesResponse,
  errors: [],
}));

/** Deletes a policy. This action is permanent. */
export interface DeletePoliciesRequest {
  /** Required. The resource name of the policy to delete. Format: `policies/{attachment_point}/denypolicies/{policy_id}` Use the URL-encoded full resource name, which means that the forward-slash character, `/`, must be written as `%2F`. For example, `policies/cloudresourcemanager.googleapis.com%2Fprojects%2Fmy-project/denypolicies/my-policy`. For organizations and folders, use the numeric ID in the full resource name. For projects, you can use the alphanumeric or the numeric ID. */
  name: string;
  /** Optional. The expected `etag` of the policy to delete. If the value does not match the value that is stored in IAM, the request fails with a `409` error code and `ABORTED` status. If you omit this field, the policy is deleted regardless of its current `etag`. */
  etag?: string;
}

export const DeletePoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/policies/{policiesId}/{policiesId1}/{policiesId2}" }),
  svc,
) as unknown as Schema.Schema<DeletePoliciesRequest>;

export type DeletePoliciesResponse = GoogleLongrunningOperation;
export const DeletePoliciesResponse = GoogleLongrunningOperation;

export type DeletePoliciesError = CommonErrors;

export const deletePolicies: API.OperationMethod<DeletePoliciesRequest, DeletePoliciesResponse, DeletePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePoliciesRequest,
  output: DeletePoliciesResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetPoliciesOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetPoliciesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/policies/{policiesId}/{policiesId1}/{policiesId2}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetPoliciesOperationsRequest>;

export type GetPoliciesOperationsResponse = GoogleLongrunningOperation;
export const GetPoliciesOperationsResponse = GoogleLongrunningOperation;

export type GetPoliciesOperationsError = CommonErrors;

export const getPoliciesOperations: API.OperationMethod<GetPoliciesOperationsRequest, GetPoliciesOperationsResponse, GetPoliciesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPoliciesOperationsRequest,
  output: GetPoliciesOperationsResponse,
  errors: [],
}));

