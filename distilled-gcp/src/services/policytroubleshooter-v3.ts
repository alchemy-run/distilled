// ==========================================================================
// Policy Troubleshooter API (policytroubleshooter v3)
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
  name: "policytroubleshooter",
  version: "v3",
  rootUrl: "https://policytroubleshooter.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudPolicytroubleshooterIamV3ConditionContextResource {
  /** The name of the service that this resource belongs to, such as `compute.googleapis.com`. The service name might not match the DNS hostname that actually serves the request. For a full list of resource service values, see https://cloud.google.com/iam/help/conditions/resource-services */
  service?: string;
  /** The stable identifier (name) of a resource on the `service`. A resource can be logically identified as `//{resource.service}/{resource.name}`. Unlike the resource URI, the resource name doesn't contain any protocol and version information. For a list of full resource name formats, see https://cloud.google.com/iam/help/troubleshooter/full-resource-names */
  name?: string;
  /** The type of the resource, in the format `{service}/{kind}`. For a full list of resource type values, see https://cloud.google.com/iam/help/conditions/resource-types */
  type?: string;
}

export const GoogleCloudPolicytroubleshooterIamV3ConditionContextResource: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ConditionContextResource> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3ConditionContextResource" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ConditionContextResource>;

export interface GoogleCloudPolicytroubleshooterIamV3ConditionContextPeer {
  /** The IPv4 or IPv6 address of the peer. */
  ip?: string;
  /** The network port of the peer. */
  port?: string;
}

export const GoogleCloudPolicytroubleshooterIamV3ConditionContextPeer: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ConditionContextPeer> = Schema.suspend(() => Schema.Struct({
  ip: Schema.optional(Schema.String),
  port: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3ConditionContextPeer" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ConditionContextPeer>;

export interface GoogleCloudPolicytroubleshooterIamV3ConditionContextRequest {
  /** Optional. The timestamp when the destination service receives the first byte of the request. */
  receiveTime?: string;
}

export const GoogleCloudPolicytroubleshooterIamV3ConditionContextRequest: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ConditionContextRequest> = Schema.suspend(() => Schema.Struct({
  receiveTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3ConditionContextRequest" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ConditionContextRequest>;

export interface GoogleCloudPolicytroubleshooterIamV3ConditionContextEffectiveTag {
  /** Output only. Resource name for TagValue in the format `tagValues/456`. */
  tagValue?: string;
  /** Output only. The namespaced name of the TagValue. Can be in the form `{organization_id}/{tag_key_short_name}/{tag_value_short_name}` or `{project_id}/{tag_key_short_name}/{tag_value_short_name}` or `{project_number}/{tag_key_short_name}/{tag_value_short_name}`. */
  namespacedTagValue?: string;
  /** Output only. The name of the TagKey, in the format `tagKeys/{id}`, such as `tagKeys/123`. */
  tagKey?: string;
  /** Output only. The namespaced name of the TagKey. Can be in the form `{organization_id}/{tag_key_short_name}` or `{project_id}/{tag_key_short_name}` or `{project_number}/{tag_key_short_name}`. */
  namespacedTagKey?: string;
  /** The parent name of the tag key. Must be in the format `organizations/{organization_id}` or `projects/{project_number}` */
  tagKeyParentName?: string;
  /** Output only. Indicates the inheritance status of a tag value attached to the given resource. If the tag value is inherited from one of the resource's ancestors, inherited will be true. If false, then the tag value is directly attached to the resource, inherited will be false. */
  inherited?: boolean;
}

export const GoogleCloudPolicytroubleshooterIamV3ConditionContextEffectiveTag: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ConditionContextEffectiveTag> = Schema.suspend(() => Schema.Struct({
  tagValue: Schema.optional(Schema.String),
  namespacedTagValue: Schema.optional(Schema.String),
  tagKey: Schema.optional(Schema.String),
  namespacedTagKey: Schema.optional(Schema.String),
  tagKeyParentName: Schema.optional(Schema.String),
  inherited: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3ConditionContextEffectiveTag" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ConditionContextEffectiveTag>;

export interface GoogleCloudPolicytroubleshooterIamV3ConditionContext {
  /** Represents a target resource that is involved with a network activity. If multiple resources are involved with an activity, this must be the primary one. */
  resource?: GoogleCloudPolicytroubleshooterIamV3ConditionContextResource;
  /** The destination of a network activity, such as accepting a TCP connection. In a multi-hop network activity, the destination represents the receiver of the last hop. */
  destination?: GoogleCloudPolicytroubleshooterIamV3ConditionContextPeer;
  /** Represents a network request, such as an HTTP request. */
  request?: GoogleCloudPolicytroubleshooterIamV3ConditionContextRequest;
  /** Output only. The effective tags on the resource. The effective tags are fetched during troubleshooting. */
  effectiveTags?: Array<GoogleCloudPolicytroubleshooterIamV3ConditionContextEffectiveTag>;
}

export const GoogleCloudPolicytroubleshooterIamV3ConditionContext: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ConditionContext> = Schema.suspend(() => Schema.Struct({
  resource: Schema.optional(GoogleCloudPolicytroubleshooterIamV3ConditionContextResource),
  destination: Schema.optional(GoogleCloudPolicytroubleshooterIamV3ConditionContextPeer),
  request: Schema.optional(GoogleCloudPolicytroubleshooterIamV3ConditionContextRequest),
  effectiveTags: Schema.optional(Schema.Array(GoogleCloudPolicytroubleshooterIamV3ConditionContextEffectiveTag)),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3ConditionContext" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ConditionContext>;

export interface GoogleCloudPolicytroubleshooterIamV3AccessTuple {
  /** Required. The email address of the principal whose access you want to check. For example, `alice@example.com` or `my-service-account@my-project.iam.gserviceaccount.com`. The principal must be a Google Account or a service account. Other types of principals are not supported. */
  principal?: string;
  /** Required. The full resource name that identifies the resource. For example, `//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance`. For examples of full resource names for Google Cloud services, see https://cloud.google.com/iam/help/troubleshooter/full-resource-names. */
  fullResourceName?: string;
  /** Required. The IAM permission to check for, either in the `v1` permission format or the `v2` permission format. For a complete list of IAM permissions in the `v1` format, see https://cloud.google.com/iam/help/permissions/reference. For a list of IAM permissions in the `v2` format, see https://cloud.google.com/iam/help/deny/supported-permissions. For a complete list of predefined IAM roles and the permissions in each role, see https://cloud.google.com/iam/help/roles/reference. */
  permission?: string;
  /** Output only. The permission that Policy Troubleshooter checked for, in the `v2` format. */
  permissionFqdn?: string;
  /** Optional. Additional context for the request, such as the request time or IP address. This context allows Policy Troubleshooter to troubleshoot conditional role bindings and deny rules. */
  conditionContext?: GoogleCloudPolicytroubleshooterIamV3ConditionContext;
}

export const GoogleCloudPolicytroubleshooterIamV3AccessTuple: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3AccessTuple> = Schema.suspend(() => Schema.Struct({
  principal: Schema.optional(Schema.String),
  fullResourceName: Schema.optional(Schema.String),
  permission: Schema.optional(Schema.String),
  permissionFqdn: Schema.optional(Schema.String),
  conditionContext: Schema.optional(GoogleCloudPolicytroubleshooterIamV3ConditionContext),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3AccessTuple" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3AccessTuple>;

export interface GoogleCloudPolicytroubleshooterIamV3TroubleshootIamPolicyRequest {
  /** The information to use for checking whether a principal has a permission for a resource. */
  accessTuple?: GoogleCloudPolicytroubleshooterIamV3AccessTuple;
}

export const GoogleCloudPolicytroubleshooterIamV3TroubleshootIamPolicyRequest: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3TroubleshootIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  accessTuple: Schema.optional(GoogleCloudPolicytroubleshooterIamV3AccessTuple),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3TroubleshootIamPolicyRequest" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3TroubleshootIamPolicyRequest>;

export interface GoogleCloudPolicytroubleshooterIamV3AllowBindingExplanationAnnotatedAllowMembership {
  /** Indicates whether the role binding includes the principal. */
  membership?: "MEMBERSHIP_MATCHING_STATE_UNSPECIFIED" | "MEMBERSHIP_MATCHED" | "MEMBERSHIP_NOT_MATCHED" | "MEMBERSHIP_UNKNOWN_INFO" | "MEMBERSHIP_UNKNOWN_UNSUPPORTED" | (string & {});
  /** The relevance of the principal's status to the overall determination for the role binding. */
  relevance?: "HEURISTIC_RELEVANCE_UNSPECIFIED" | "HEURISTIC_RELEVANCE_NORMAL" | "HEURISTIC_RELEVANCE_HIGH" | (string & {});
}

export const GoogleCloudPolicytroubleshooterIamV3AllowBindingExplanationAnnotatedAllowMembership: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3AllowBindingExplanationAnnotatedAllowMembership> = Schema.suspend(() => Schema.Struct({
  membership: Schema.optional(Schema.String),
  relevance: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3AllowBindingExplanationAnnotatedAllowMembership" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3AllowBindingExplanationAnnotatedAllowMembership>;

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

export interface GoogleCloudPolicytroubleshooterIamV3ConditionExplanationEvaluationState {
  /** Start position of an expression in the condition, by character. */
  start?: number;
  /** End position of an expression in the condition, by character, end included, for example: the end position of the first part of `a==b || c==d` would be 4. */
  end?: number;
  /** Value of this expression. */
  value?: unknown;
  /** Any errors that prevented complete evaluation of the condition expression. */
  errors?: Array<GoogleRpcStatus>;
}

export const GoogleCloudPolicytroubleshooterIamV3ConditionExplanationEvaluationState: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ConditionExplanationEvaluationState> = Schema.suspend(() => Schema.Struct({
  start: Schema.optional(Schema.Number),
  end: Schema.optional(Schema.Number),
  value: Schema.optional(Schema.Unknown),
  errors: Schema.optional(Schema.Array(GoogleRpcStatus)),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3ConditionExplanationEvaluationState" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ConditionExplanationEvaluationState>;

export interface GoogleCloudPolicytroubleshooterIamV3ConditionExplanation {
  /** Value of the condition. */
  value?: unknown;
  /** Any errors that prevented complete evaluation of the condition expression. */
  errors?: Array<GoogleRpcStatus>;
  /** The value of each statement of the condition expression. The value can be `true`, `false`, or `null`. The value is `null` if the statement can't be evaluated. */
  evaluationStates?: Array<GoogleCloudPolicytroubleshooterIamV3ConditionExplanationEvaluationState>;
}

export const GoogleCloudPolicytroubleshooterIamV3ConditionExplanation: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ConditionExplanation> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Unknown),
  errors: Schema.optional(Schema.Array(GoogleRpcStatus)),
  evaluationStates: Schema.optional(Schema.Array(GoogleCloudPolicytroubleshooterIamV3ConditionExplanationEvaluationState)),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3ConditionExplanation" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ConditionExplanation>;

export interface GoogleCloudPolicytroubleshooterIamV3AllowBindingExplanation {
  /** Required. Indicates whether _this role binding_ gives the specified permission to the specified principal on the specified resource. This field does _not_ indicate whether the principal actually has the permission on the resource. There might be another role binding that overrides this role binding. To determine whether the principal actually has the permission, use the `overall_access_state` field in the TroubleshootIamPolicyResponse. */
  allowAccessState?: "ALLOW_ACCESS_STATE_UNSPECIFIED" | "ALLOW_ACCESS_STATE_GRANTED" | "ALLOW_ACCESS_STATE_NOT_GRANTED" | "ALLOW_ACCESS_STATE_UNKNOWN_CONDITIONAL" | "ALLOW_ACCESS_STATE_UNKNOWN_INFO" | (string & {});
  /** The role that this role binding grants. For example, `roles/compute.admin`. For a complete list of predefined IAM roles, as well as the permissions in each role, see https://cloud.google.com/iam/help/roles/reference. */
  role?: string;
  /** Indicates whether the role granted by this role binding contains the specified permission. */
  rolePermission?: "ROLE_PERMISSION_INCLUSION_STATE_UNSPECIFIED" | "ROLE_PERMISSION_INCLUDED" | "ROLE_PERMISSION_NOT_INCLUDED" | "ROLE_PERMISSION_UNKNOWN_INFO" | (string & {});
  /** The relevance of the permission's existence, or nonexistence, in the role to the overall determination for the entire policy. */
  rolePermissionRelevance?: "HEURISTIC_RELEVANCE_UNSPECIFIED" | "HEURISTIC_RELEVANCE_NORMAL" | "HEURISTIC_RELEVANCE_HIGH" | (string & {});
  /** The combined result of all memberships. Indicates if the principal is included in any role binding, either directly or indirectly. */
  combinedMembership?: GoogleCloudPolicytroubleshooterIamV3AllowBindingExplanationAnnotatedAllowMembership;
  /** Indicates whether each role binding includes the principal specified in the request, either directly or indirectly. Each key identifies a principal in the role binding, and each value indicates whether the principal in the role binding includes the principal in the request. For example, suppose that a role binding includes the following principals: * `user:alice@example.com` * `group:product-eng@example.com` You want to troubleshoot access for `user:bob@example.com`. This user is a member of the group `group:product-eng@example.com`. For the first principal in the role binding, the key is `user:alice@example.com`, and the `membership` field in the value is set to `NOT_INCLUDED`. For the second principal in the role binding, the key is `group:product-eng@example.com`, and the `membership` field in the value is set to `INCLUDED`. */
  memberships?: Record<string, GoogleCloudPolicytroubleshooterIamV3AllowBindingExplanationAnnotatedAllowMembership>;
  /** The relevance of this role binding to the overall determination for the entire policy. */
  relevance?: "HEURISTIC_RELEVANCE_UNSPECIFIED" | "HEURISTIC_RELEVANCE_NORMAL" | "HEURISTIC_RELEVANCE_HIGH" | (string & {});
  /** A condition expression that specifies when the role binding grants access. To learn about IAM Conditions, see https://cloud.google.com/iam/help/conditions/overview. */
  condition?: GoogleTypeExpr;
  /** Condition evaluation state for this role binding. */
  conditionExplanation?: GoogleCloudPolicytroubleshooterIamV3ConditionExplanation;
}

export const GoogleCloudPolicytroubleshooterIamV3AllowBindingExplanation: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3AllowBindingExplanation> = Schema.suspend(() => Schema.Struct({
  allowAccessState: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  rolePermission: Schema.optional(Schema.String),
  rolePermissionRelevance: Schema.optional(Schema.String),
  combinedMembership: Schema.optional(GoogleCloudPolicytroubleshooterIamV3AllowBindingExplanationAnnotatedAllowMembership),
  memberships: Schema.optional(Schema.Record(Schema.String, GoogleCloudPolicytroubleshooterIamV3AllowBindingExplanationAnnotatedAllowMembership)),
  relevance: Schema.optional(Schema.String),
  condition: Schema.optional(GoogleTypeExpr),
  conditionExplanation: Schema.optional(GoogleCloudPolicytroubleshooterIamV3ConditionExplanation),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3AllowBindingExplanation" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3AllowBindingExplanation>;

export interface GoogleIamV1Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: GoogleTypeExpr;
}

export const GoogleIamV1Binding: Schema.Schema<GoogleIamV1Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(GoogleTypeExpr),
})).annotate({ identifier: "GoogleIamV1Binding" }) as any as Schema.Schema<GoogleIamV1Binding>;

export interface GoogleIamV1AuditLogConfig {
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const GoogleIamV1AuditLogConfig: Schema.Schema<GoogleIamV1AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIamV1AuditLogConfig" }) as any as Schema.Schema<GoogleIamV1AuditLogConfig>;

export interface GoogleIamV1AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<GoogleIamV1AuditLogConfig>;
}

export const GoogleIamV1AuditConfig: Schema.Schema<GoogleIamV1AuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditLogConfig)),
})).annotate({ identifier: "GoogleIamV1AuditConfig" }) as any as Schema.Schema<GoogleIamV1AuditConfig>;

export interface GoogleIamV1Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<GoogleIamV1Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<GoogleIamV1AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const GoogleIamV1Policy: Schema.Schema<GoogleIamV1Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(GoogleIamV1Binding)),
  auditConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditConfig)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV1Policy" }) as any as Schema.Schema<GoogleIamV1Policy>;

export interface GoogleCloudPolicytroubleshooterIamV3ExplainedAllowPolicy {
  /** Required. Indicates whether _this policy_ provides the specified permission to the specified principal for the specified resource. This field does _not_ indicate whether the principal actually has the permission for the resource. There might be another policy that overrides this policy. To determine whether the principal actually has the permission, use the `overall_access_state` field in the TroubleshootIamPolicyResponse. */
  allowAccessState?: "ALLOW_ACCESS_STATE_UNSPECIFIED" | "ALLOW_ACCESS_STATE_GRANTED" | "ALLOW_ACCESS_STATE_NOT_GRANTED" | "ALLOW_ACCESS_STATE_UNKNOWN_CONDITIONAL" | "ALLOW_ACCESS_STATE_UNKNOWN_INFO" | (string & {});
  /** The full resource name that identifies the resource. For example, `//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance`. If the sender of the request does not have access to the policy, this field is omitted. For examples of full resource names for Google Cloud services, see https://cloud.google.com/iam/help/troubleshooter/full-resource-names. */
  fullResourceName?: string;
  /** Details about how each role binding in the policy affects the principal's ability, or inability, to use the permission for the resource. The order of the role bindings matches the role binding order in the policy. If the sender of the request does not have access to the policy, this field is omitted. */
  bindingExplanations?: Array<GoogleCloudPolicytroubleshooterIamV3AllowBindingExplanation>;
  /** The relevance of this policy to the overall access state in the TroubleshootIamPolicyResponse. If the sender of the request does not have access to the policy, this field is omitted. */
  relevance?: "HEURISTIC_RELEVANCE_UNSPECIFIED" | "HEURISTIC_RELEVANCE_NORMAL" | "HEURISTIC_RELEVANCE_HIGH" | (string & {});
  /** The IAM allow policy attached to the resource. If the sender of the request does not have access to the policy, this field is empty. */
  policy?: GoogleIamV1Policy;
}

export const GoogleCloudPolicytroubleshooterIamV3ExplainedAllowPolicy: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ExplainedAllowPolicy> = Schema.suspend(() => Schema.Struct({
  allowAccessState: Schema.optional(Schema.String),
  fullResourceName: Schema.optional(Schema.String),
  bindingExplanations: Schema.optional(Schema.Array(GoogleCloudPolicytroubleshooterIamV3AllowBindingExplanation)),
  relevance: Schema.optional(Schema.String),
  policy: Schema.optional(GoogleIamV1Policy),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3ExplainedAllowPolicy" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ExplainedAllowPolicy>;

export interface GoogleCloudPolicytroubleshooterIamV3AllowPolicyExplanation {
  /** Indicates whether the principal has the specified permission for the specified resource, based on evaluating all applicable IAM allow policies. */
  allowAccessState?: "ALLOW_ACCESS_STATE_UNSPECIFIED" | "ALLOW_ACCESS_STATE_GRANTED" | "ALLOW_ACCESS_STATE_NOT_GRANTED" | "ALLOW_ACCESS_STATE_UNKNOWN_CONDITIONAL" | "ALLOW_ACCESS_STATE_UNKNOWN_INFO" | (string & {});
  /** List of IAM allow policies that were evaluated to check the principal's permissions, with annotations to indicate how each policy contributed to the final result. The list of policies includes the policy for the resource itself, as well as allow policies that are inherited from higher levels of the resource hierarchy, including the organization, the folder, and the project. To learn more about the resource hierarchy, see https://cloud.google.com/iam/help/resource-hierarchy. */
  explainedPolicies?: Array<GoogleCloudPolicytroubleshooterIamV3ExplainedAllowPolicy>;
  /** The relevance of the allow policy type to the overall access state. */
  relevance?: "HEURISTIC_RELEVANCE_UNSPECIFIED" | "HEURISTIC_RELEVANCE_NORMAL" | "HEURISTIC_RELEVANCE_HIGH" | (string & {});
}

export const GoogleCloudPolicytroubleshooterIamV3AllowPolicyExplanation: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3AllowPolicyExplanation> = Schema.suspend(() => Schema.Struct({
  allowAccessState: Schema.optional(Schema.String),
  explainedPolicies: Schema.optional(Schema.Array(GoogleCloudPolicytroubleshooterIamV3ExplainedAllowPolicy)),
  relevance: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3AllowPolicyExplanation" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3AllowPolicyExplanation>;

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

export interface GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedPermissionMatching {
  /** Indicates whether the permission in the request is denied by the deny rule. */
  permissionMatchingState?: "PERMISSION_PATTERN_MATCHING_STATE_UNSPECIFIED" | "PERMISSION_PATTERN_MATCHED" | "PERMISSION_PATTERN_NOT_MATCHED" | (string & {});
  /** The relevance of the permission status to the overall determination for the rule. */
  relevance?: "HEURISTIC_RELEVANCE_UNSPECIFIED" | "HEURISTIC_RELEVANCE_NORMAL" | "HEURISTIC_RELEVANCE_HIGH" | (string & {});
}

export const GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedPermissionMatching: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedPermissionMatching> = Schema.suspend(() => Schema.Struct({
  permissionMatchingState: Schema.optional(Schema.String),
  relevance: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedPermissionMatching" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedPermissionMatching>;

export interface GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedDenyPrincipalMatching {
  /** Indicates whether the principal is listed as a denied principal in the deny rule, either directly or through membership in a principal set. */
  membership?: "MEMBERSHIP_MATCHING_STATE_UNSPECIFIED" | "MEMBERSHIP_MATCHED" | "MEMBERSHIP_NOT_MATCHED" | "MEMBERSHIP_UNKNOWN_INFO" | "MEMBERSHIP_UNKNOWN_UNSUPPORTED" | (string & {});
  /** The relevance of the principal's status to the overall determination for the role binding. */
  relevance?: "HEURISTIC_RELEVANCE_UNSPECIFIED" | "HEURISTIC_RELEVANCE_NORMAL" | "HEURISTIC_RELEVANCE_HIGH" | (string & {});
}

export const GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedDenyPrincipalMatching: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedDenyPrincipalMatching> = Schema.suspend(() => Schema.Struct({
  membership: Schema.optional(Schema.String),
  relevance: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedDenyPrincipalMatching" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedDenyPrincipalMatching>;

export interface GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanation {
  /** Required. Indicates whether _this rule_ denies the specified permission to the specified principal for the specified resource. This field does _not_ indicate whether the principal is actually denied on the permission for the resource. There might be another rule that overrides this rule. To determine whether the principal actually has the permission, use the `overall_access_state` field in the TroubleshootIamPolicyResponse. */
  denyAccessState?: "DENY_ACCESS_STATE_UNSPECIFIED" | "DENY_ACCESS_STATE_DENIED" | "DENY_ACCESS_STATE_NOT_DENIED" | "DENY_ACCESS_STATE_UNKNOWN_CONDITIONAL" | "DENY_ACCESS_STATE_UNKNOWN_INFO" | (string & {});
  /** Indicates whether the permission in the request is listed as a denied permission in the deny rule. */
  combinedDeniedPermission?: GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedPermissionMatching;
  /** Lists all denied permissions in the deny rule and indicates whether each permission matches the permission in the request. Each key identifies a denied permission in the rule, and each value indicates whether the denied permission matches the permission in the request. */
  deniedPermissions?: Record<string, GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedPermissionMatching>;
  /** Indicates whether the permission in the request is listed as an exception permission in the deny rule. */
  combinedExceptionPermission?: GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedPermissionMatching;
  /** Lists all exception permissions in the deny rule and indicates whether each permission matches the permission in the request. Each key identifies a exception permission in the rule, and each value indicates whether the exception permission matches the permission in the request. */
  exceptionPermissions?: Record<string, GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedPermissionMatching>;
  /** Indicates whether the principal is listed as a denied principal in the deny rule, either directly or through membership in a principal set. */
  combinedDeniedPrincipal?: GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedDenyPrincipalMatching;
  /** Lists all denied principals in the deny rule and indicates whether each principal matches the principal in the request, either directly or through membership in a principal set. Each key identifies a denied principal in the rule, and each value indicates whether the denied principal matches the principal in the request. */
  deniedPrincipals?: Record<string, GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedDenyPrincipalMatching>;
  /** Indicates whether the principal is listed as an exception principal in the deny rule, either directly or through membership in a principal set. */
  combinedExceptionPrincipal?: GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedDenyPrincipalMatching;
  /** Lists all exception principals in the deny rule and indicates whether each principal matches the principal in the request, either directly or through membership in a principal set. Each key identifies a exception principal in the rule, and each value indicates whether the exception principal matches the principal in the request. */
  exceptionPrincipals?: Record<string, GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedDenyPrincipalMatching>;
  /** The relevance of this role binding to the overall determination for the entire policy. */
  relevance?: "HEURISTIC_RELEVANCE_UNSPECIFIED" | "HEURISTIC_RELEVANCE_NORMAL" | "HEURISTIC_RELEVANCE_HIGH" | (string & {});
  /** A condition expression that specifies when the deny rule denies the principal access. To learn about IAM Conditions, see https://cloud.google.com/iam/help/conditions/overview. */
  condition?: GoogleTypeExpr;
  /** Condition evaluation state for this role binding. */
  conditionExplanation?: GoogleCloudPolicytroubleshooterIamV3ConditionExplanation;
}

export const GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanation: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanation> = Schema.suspend(() => Schema.Struct({
  denyAccessState: Schema.optional(Schema.String),
  combinedDeniedPermission: Schema.optional(GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedPermissionMatching),
  deniedPermissions: Schema.optional(Schema.Record(Schema.String, GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedPermissionMatching)),
  combinedExceptionPermission: Schema.optional(GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedPermissionMatching),
  exceptionPermissions: Schema.optional(Schema.Record(Schema.String, GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedPermissionMatching)),
  combinedDeniedPrincipal: Schema.optional(GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedDenyPrincipalMatching),
  deniedPrincipals: Schema.optional(Schema.Record(Schema.String, GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedDenyPrincipalMatching)),
  combinedExceptionPrincipal: Schema.optional(GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedDenyPrincipalMatching),
  exceptionPrincipals: Schema.optional(Schema.Record(Schema.String, GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanationAnnotatedDenyPrincipalMatching)),
  relevance: Schema.optional(Schema.String),
  condition: Schema.optional(GoogleTypeExpr),
  conditionExplanation: Schema.optional(GoogleCloudPolicytroubleshooterIamV3ConditionExplanation),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanation" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanation>;

export interface GoogleCloudPolicytroubleshooterIamV3ExplainedDenyPolicy {
  /** Required. Indicates whether _this policy_ denies the specified permission to the specified principal for the specified resource. This field does _not_ indicate whether the principal actually has the permission for the resource. There might be another policy that overrides this policy. To determine whether the principal actually has the permission, use the `overall_access_state` field in the TroubleshootIamPolicyResponse. */
  denyAccessState?: "DENY_ACCESS_STATE_UNSPECIFIED" | "DENY_ACCESS_STATE_DENIED" | "DENY_ACCESS_STATE_NOT_DENIED" | "DENY_ACCESS_STATE_UNKNOWN_CONDITIONAL" | "DENY_ACCESS_STATE_UNKNOWN_INFO" | (string & {});
  /** The IAM deny policy attached to the resource. If the sender of the request does not have access to the policy, this field is omitted. */
  policy?: GoogleIamV2Policy;
  /** Details about how each rule in the policy affects the principal's inability to use the permission for the resource. The order of the deny rule matches the order of the rules in the deny policy. If the sender of the request does not have access to the policy, this field is omitted. */
  ruleExplanations?: Array<GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanation>;
  /** The relevance of this policy to the overall access state in the TroubleshootIamPolicyResponse. If the sender of the request does not have access to the policy, this field is omitted. */
  relevance?: "HEURISTIC_RELEVANCE_UNSPECIFIED" | "HEURISTIC_RELEVANCE_NORMAL" | "HEURISTIC_RELEVANCE_HIGH" | (string & {});
}

export const GoogleCloudPolicytroubleshooterIamV3ExplainedDenyPolicy: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ExplainedDenyPolicy> = Schema.suspend(() => Schema.Struct({
  denyAccessState: Schema.optional(Schema.String),
  policy: Schema.optional(GoogleIamV2Policy),
  ruleExplanations: Schema.optional(Schema.Array(GoogleCloudPolicytroubleshooterIamV3DenyRuleExplanation)),
  relevance: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3ExplainedDenyPolicy" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ExplainedDenyPolicy>;

export interface GoogleCloudPolicytroubleshooterIamV3ExplainedDenyResource {
  /** Required. Indicates whether any policies attached to _this resource_ deny the specific permission to the specified principal for the specified resource. This field does _not_ indicate whether the principal actually has the permission for the resource. There might be another policy that overrides this policy. To determine whether the principal actually has the permission, use the `overall_access_state` field in the TroubleshootIamPolicyResponse. */
  denyAccessState?: "DENY_ACCESS_STATE_UNSPECIFIED" | "DENY_ACCESS_STATE_DENIED" | "DENY_ACCESS_STATE_NOT_DENIED" | "DENY_ACCESS_STATE_UNKNOWN_CONDITIONAL" | "DENY_ACCESS_STATE_UNKNOWN_INFO" | (string & {});
  /** The full resource name that identifies the resource. For example, `//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance`. If the sender of the request does not have access to the policy, this field is omitted. For examples of full resource names for Google Cloud services, see https://cloud.google.com/iam/help/troubleshooter/full-resource-names. */
  fullResourceName?: string;
  /** List of IAM deny policies that were evaluated to check the principal's denied permissions, with annotations to indicate how each policy contributed to the final result. */
  explainedPolicies?: Array<GoogleCloudPolicytroubleshooterIamV3ExplainedDenyPolicy>;
  /** The relevance of this policy to the overall access state in the TroubleshootIamPolicyResponse. If the sender of the request does not have access to the policy, this field is omitted. */
  relevance?: "HEURISTIC_RELEVANCE_UNSPECIFIED" | "HEURISTIC_RELEVANCE_NORMAL" | "HEURISTIC_RELEVANCE_HIGH" | (string & {});
}

export const GoogleCloudPolicytroubleshooterIamV3ExplainedDenyResource: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ExplainedDenyResource> = Schema.suspend(() => Schema.Struct({
  denyAccessState: Schema.optional(Schema.String),
  fullResourceName: Schema.optional(Schema.String),
  explainedPolicies: Schema.optional(Schema.Array(GoogleCloudPolicytroubleshooterIamV3ExplainedDenyPolicy)),
  relevance: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3ExplainedDenyResource" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3ExplainedDenyResource>;

export interface GoogleCloudPolicytroubleshooterIamV3DenyPolicyExplanation {
  /** Indicates whether the principal is denied the specified permission for the specified resource, based on evaluating all applicable IAM deny policies. */
  denyAccessState?: "DENY_ACCESS_STATE_UNSPECIFIED" | "DENY_ACCESS_STATE_DENIED" | "DENY_ACCESS_STATE_NOT_DENIED" | "DENY_ACCESS_STATE_UNKNOWN_CONDITIONAL" | "DENY_ACCESS_STATE_UNKNOWN_INFO" | (string & {});
  /** List of resources with IAM deny policies that were evaluated to check the principal's denied permissions, with annotations to indicate how each policy contributed to the final result. The list of resources includes the policy for the resource itself, as well as policies that are inherited from higher levels of the resource hierarchy, including the organization, the folder, and the project. The order of the resources starts from the resource and climbs up the resource hierarchy. To learn more about the resource hierarchy, see https://cloud.google.com/iam/help/resource-hierarchy. */
  explainedResources?: Array<GoogleCloudPolicytroubleshooterIamV3ExplainedDenyResource>;
  /** The relevance of the deny policy result to the overall access state. */
  relevance?: "HEURISTIC_RELEVANCE_UNSPECIFIED" | "HEURISTIC_RELEVANCE_NORMAL" | "HEURISTIC_RELEVANCE_HIGH" | (string & {});
  /** Indicates whether the permission to troubleshoot is supported in deny policies. */
  permissionDeniable?: boolean;
}

export const GoogleCloudPolicytroubleshooterIamV3DenyPolicyExplanation: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3DenyPolicyExplanation> = Schema.suspend(() => Schema.Struct({
  denyAccessState: Schema.optional(Schema.String),
  explainedResources: Schema.optional(Schema.Array(GoogleCloudPolicytroubleshooterIamV3ExplainedDenyResource)),
  relevance: Schema.optional(Schema.String),
  permissionDeniable: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3DenyPolicyExplanation" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3DenyPolicyExplanation>;

export interface GoogleCloudPolicytroubleshooterIamV3TroubleshootIamPolicyResponse {
  /** Indicates whether the principal has the specified permission for the specified resource, based on evaluating all types of the applicable IAM policies. */
  overallAccessState?: "OVERALL_ACCESS_STATE_UNSPECIFIED" | "CAN_ACCESS" | "CANNOT_ACCESS" | "UNKNOWN_INFO" | "UNKNOWN_CONDITIONAL" | (string & {});
  /** The access tuple from the request, including any provided context used to evaluate the condition. */
  accessTuple?: GoogleCloudPolicytroubleshooterIamV3AccessTuple;
  /** An explanation of how the applicable IAM allow policies affect the final access state. */
  allowPolicyExplanation?: GoogleCloudPolicytroubleshooterIamV3AllowPolicyExplanation;
  /** An explanation of how the applicable IAM deny policies affect the final access state. */
  denyPolicyExplanation?: GoogleCloudPolicytroubleshooterIamV3DenyPolicyExplanation;
}

export const GoogleCloudPolicytroubleshooterIamV3TroubleshootIamPolicyResponse: Schema.Schema<GoogleCloudPolicytroubleshooterIamV3TroubleshootIamPolicyResponse> = Schema.suspend(() => Schema.Struct({
  overallAccessState: Schema.optional(Schema.String),
  accessTuple: Schema.optional(GoogleCloudPolicytroubleshooterIamV3AccessTuple),
  allowPolicyExplanation: Schema.optional(GoogleCloudPolicytroubleshooterIamV3AllowPolicyExplanation),
  denyPolicyExplanation: Schema.optional(GoogleCloudPolicytroubleshooterIamV3DenyPolicyExplanation),
})).annotate({ identifier: "GoogleCloudPolicytroubleshooterIamV3TroubleshootIamPolicyResponse" }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterIamV3TroubleshootIamPolicyResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Checks whether a principal has a specific permission for a specific resource, and explains why the principal does or doesn't have that permission. */
export interface TroubleshootIamRequest {
  /** Request body */
  body?: GoogleCloudPolicytroubleshooterIamV3TroubleshootIamPolicyRequest;
}

export const TroubleshootIamRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudPolicytroubleshooterIamV3TroubleshootIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/iam:troubleshoot", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TroubleshootIamRequest>;

export type TroubleshootIamResponse = GoogleCloudPolicytroubleshooterIamV3TroubleshootIamPolicyResponse;
export const TroubleshootIamResponse = GoogleCloudPolicytroubleshooterIamV3TroubleshootIamPolicyResponse;

export type TroubleshootIamError = CommonErrors;

export const troubleshootIam: API.OperationMethod<TroubleshootIamRequest, TroubleshootIamResponse, TroubleshootIamError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TroubleshootIamRequest,
  output: TroubleshootIamResponse,
  errors: [],
}));

