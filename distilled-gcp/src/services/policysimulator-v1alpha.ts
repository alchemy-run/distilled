// ==========================================================================
// Policy Simulator API (policysimulator v1alpha)
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
  name: "policysimulator",
  version: "v1alpha",
  rootUrl: "https://policysimulator.googleapis.com/",
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

export interface GoogleLongrunningListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunningOperation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleLongrunningListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

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

export interface GoogleCloudPolicysimulatorV1ReplayConfig {
  /** A mapping of the resources that you want to simulate policies for and the policies that you want to simulate. Keys are the full resource names for the resources. For example, `//cloudresourcemanager.googleapis.com/projects/my-project`. For examples of full resource names for Google Cloud services, see https://cloud.google.com/iam/help/troubleshooter/full-resource-names. Values are Policy objects representing the policies that you want to simulate. Replays automatically take into account any IAM policies inherited through the resource hierarchy, and any policies set on descendant resources. You do not need to include these policies in the policy overlay. */
  policyOverlay?: Record<string, GoogleIamV1Policy>;
  /** The logs to use as input for the Replay. */
  logSource?: "LOG_SOURCE_UNSPECIFIED" | "RECENT_ACCESSES" | (string & {});
}

export const GoogleCloudPolicysimulatorV1ReplayConfig: Schema.Schema<GoogleCloudPolicysimulatorV1ReplayConfig> = Schema.suspend(() => Schema.Struct({
  policyOverlay: Schema.optional(Schema.Record(Schema.String, GoogleIamV1Policy)),
  logSource: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1ReplayConfig" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1ReplayConfig>;

export interface GoogleTypeDate {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const GoogleTypeDate: Schema.Schema<GoogleTypeDate> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeDate" }) as any as Schema.Schema<GoogleTypeDate>;

export interface GoogleCloudPolicysimulatorV1ReplayResultsSummary {
  /** The total number of log entries replayed. */
  logCount?: number;
  /** The number of replayed log entries with no difference between baseline and simulated policies. */
  unchangedCount?: number;
  /** The number of replayed log entries with a difference between baseline and simulated policies. */
  differenceCount?: number;
  /** The number of log entries that could not be replayed. */
  errorCount?: number;
  /** The date of the oldest log entry replayed. */
  oldestDate?: GoogleTypeDate;
  /** The date of the newest log entry replayed. */
  newestDate?: GoogleTypeDate;
}

export const GoogleCloudPolicysimulatorV1ReplayResultsSummary: Schema.Schema<GoogleCloudPolicysimulatorV1ReplayResultsSummary> = Schema.suspend(() => Schema.Struct({
  logCount: Schema.optional(Schema.Number),
  unchangedCount: Schema.optional(Schema.Number),
  differenceCount: Schema.optional(Schema.Number),
  errorCount: Schema.optional(Schema.Number),
  oldestDate: Schema.optional(GoogleTypeDate),
  newestDate: Schema.optional(GoogleTypeDate),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1ReplayResultsSummary" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1ReplayResultsSummary>;

export interface GoogleCloudPolicysimulatorV1Replay {
  /** Output only. The resource name of the `Replay`, which has the following format: `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}`, where `{resource-id}` is the ID of the project, folder, or organization that owns the Replay. Example: `projects/my-example-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36` */
  name?: string;
  /** Output only. The current state of the `Replay`. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED" | (string & {});
  /** Required. The configuration used for the `Replay`. */
  config?: GoogleCloudPolicysimulatorV1ReplayConfig;
  /** Output only. Summary statistics about the replayed log entries. */
  resultsSummary?: GoogleCloudPolicysimulatorV1ReplayResultsSummary;
}

export const GoogleCloudPolicysimulatorV1Replay: Schema.Schema<GoogleCloudPolicysimulatorV1Replay> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  config: Schema.optional(GoogleCloudPolicysimulatorV1ReplayConfig),
  resultsSummary: Schema.optional(GoogleCloudPolicysimulatorV1ReplayResultsSummary),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1Replay" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1Replay>;

export interface GoogleCloudPolicysimulatorV1ReplayOperationMetadata {
  /** Time when the request was received. */
  startTime?: string;
}

export const GoogleCloudPolicysimulatorV1ReplayOperationMetadata: Schema.Schema<GoogleCloudPolicysimulatorV1ReplayOperationMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1ReplayOperationMetadata" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1ReplayOperationMetadata>;

export interface GoogleCloudPolicysimulatorV1betaCreateOrgPolicyViolationsPreviewOperationMetadata {
  /** Time when the request was received. */
  requestTime?: string;
  /** Time when the request started processing, i.e., when the state was set to RUNNING. */
  startTime?: string;
  /** Output only. The current state of the operation. */
  state?: "PREVIEW_STATE_UNSPECIFIED" | "PREVIEW_PENDING" | "PREVIEW_RUNNING" | "PREVIEW_SUCCEEDED" | "PREVIEW_FAILED" | (string & {});
  /** Total number of resources that need scanning. Should equal resource_scanned + resources_pending */
  resourcesFound?: number;
  /** Number of resources already scanned. */
  resourcesScanned?: number;
  /** Number of resources still to scan. */
  resourcesPending?: number;
}

export const GoogleCloudPolicysimulatorV1betaCreateOrgPolicyViolationsPreviewOperationMetadata: Schema.Schema<GoogleCloudPolicysimulatorV1betaCreateOrgPolicyViolationsPreviewOperationMetadata> = Schema.suspend(() => Schema.Struct({
  requestTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  resourcesFound: Schema.optional(Schema.Number),
  resourcesScanned: Schema.optional(Schema.Number),
  resourcesPending: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1betaCreateOrgPolicyViolationsPreviewOperationMetadata" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1betaCreateOrgPolicyViolationsPreviewOperationMetadata>;

export interface GoogleCloudPolicysimulatorV1betaGenerateOrgPolicyViolationsPreviewOperationMetadata {
  /** Time when the request was received. */
  requestTime?: string;
  /** Time when the request started processing, i.e. when the state was set to RUNNING. */
  startTime?: string;
  /** The current state of the operation. */
  state?: "PREVIEW_STATE_UNSPECIFIED" | "PREVIEW_PENDING" | "PREVIEW_RUNNING" | "PREVIEW_SUCCEEDED" | "PREVIEW_FAILED" | (string & {});
  /** Total number of resources that need scanning. Should equal resource_scanned + resources_pending */
  resourcesFound?: number;
  /** Number of resources already scanned. */
  resourcesScanned?: number;
  /** Number of resources still to scan. */
  resourcesPending?: number;
}

export const GoogleCloudPolicysimulatorV1betaGenerateOrgPolicyViolationsPreviewOperationMetadata: Schema.Schema<GoogleCloudPolicysimulatorV1betaGenerateOrgPolicyViolationsPreviewOperationMetadata> = Schema.suspend(() => Schema.Struct({
  requestTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  resourcesFound: Schema.optional(Schema.Number),
  resourcesScanned: Schema.optional(Schema.Number),
  resourcesPending: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1betaGenerateOrgPolicyViolationsPreviewOperationMetadata" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1betaGenerateOrgPolicyViolationsPreviewOperationMetadata>;

export interface GoogleCloudOrgpolicyV2PolicySpecPolicyRuleStringValues {
  /** List of values allowed at this resource. */
  allowedValues?: Array<string>;
  /** List of values denied at this resource. */
  deniedValues?: Array<string>;
}

export const GoogleCloudOrgpolicyV2PolicySpecPolicyRuleStringValues: Schema.Schema<GoogleCloudOrgpolicyV2PolicySpecPolicyRuleStringValues> = Schema.suspend(() => Schema.Struct({
  allowedValues: Schema.optional(Schema.Array(Schema.String)),
  deniedValues: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2PolicySpecPolicyRuleStringValues" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2PolicySpecPolicyRuleStringValues>;

export interface GoogleCloudOrgpolicyV2PolicySpecPolicyRule {
  /** List of values to be used for this policy rule. This field can be set only in policies for list constraints. */
  values?: GoogleCloudOrgpolicyV2PolicySpecPolicyRuleStringValues;
  /** Setting this to true means that all values are allowed. This field can be set only in policies for list constraints. */
  allowAll?: boolean;
  /** Setting this to true means that all values are denied. This field can be set only in policies for list constraints. */
  denyAll?: boolean;
  /** If `true`, then the policy is enforced. If `false`, then any configuration is acceptable. This field can be set in policies for boolean constraints, custom constraints and managed constraints. */
  enforce?: boolean;
  /** A condition that determines whether this rule is used to evaluate the policy. When set, the google.type.Expr.expression field must contain 1 to 10 subexpressions, joined by the `||` or `&&` operators. Each subexpression must use the `resource.matchTag()`, `resource.matchTagId()`, `resource.hasTagKey()`, or `resource.hasTagKeyId()` Common Expression Language (CEL) function. The `resource.matchTag()` function takes the following arguments: * `key_name`: the namespaced name of the tag key, with the organization ID and a slash (`/`) as a prefix; for example, `123456789012/environment` * `value_name`: the short name of the tag value For example: `resource.matchTag('123456789012/environment, 'prod')` The `resource.matchTagId()` function takes the following arguments: * `key_id`: the permanent ID of the tag key; for example, `tagKeys/123456789012` * `value_id`: the permanent ID of the tag value; for example, `tagValues/567890123456` For example: `resource.matchTagId('tagKeys/123456789012', 'tagValues/567890123456')` The `resource.hasTagKey()` function takes the following argument: * `key_name`: the namespaced name of the tag key, with the organization ID and a slash (`/`) as a prefix; for example, `123456789012/environment` For example: `resource.hasTagKey('123456789012/environment')` The `resource.hasTagKeyId()` function takes the following arguments: * `key_id`: the permanent ID of the tag key; for example, `tagKeys/123456789012` For example: `resource.hasTagKeyId('tagKeys/123456789012')` */
  condition?: GoogleTypeExpr;
  /** Optional. Required for managed constraints if parameters are defined. Passes parameter values when policy enforcement is enabled. Ensure that parameter value types match those defined in the constraint definition. For example: ``` { "allowedLocations" : ["us-east1", "us-west1"], "allowAll" : true } ``` */
  parameters?: Record<string, unknown>;
}

export const GoogleCloudOrgpolicyV2PolicySpecPolicyRule: Schema.Schema<GoogleCloudOrgpolicyV2PolicySpecPolicyRule> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(GoogleCloudOrgpolicyV2PolicySpecPolicyRuleStringValues),
  allowAll: Schema.optional(Schema.Boolean),
  denyAll: Schema.optional(Schema.Boolean),
  enforce: Schema.optional(Schema.Boolean),
  condition: Schema.optional(GoogleTypeExpr),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2PolicySpecPolicyRule" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2PolicySpecPolicyRule>;

export interface GoogleCloudOrgpolicyV2PolicySpec {
  /** An opaque tag indicating the current version of the policySpec, used for concurrency control. This field is ignored if used in a `CreatePolicy` request. When the policy is returned from either a `GetPolicy` or a `ListPolicies` request, this `etag` indicates the version of the current policySpec to use when executing a read-modify-write loop. When the policy is returned from a `GetEffectivePolicy` request, the `etag` will be unset. */
  etag?: string;
  /** Output only. The time stamp this was previously updated. This represents the last time a call to `CreatePolicy` or `UpdatePolicy` was made for that policy. */
  updateTime?: string;
  /** In policies for boolean constraints, the following requirements apply: - There must be one and only one policy rule where condition is unset. - Boolean policy rules with conditions must set `enforced` to the opposite of the policy rule without a condition. - During policy evaluation, policy rules with conditions that are true for a target resource take precedence. */
  rules?: Array<GoogleCloudOrgpolicyV2PolicySpecPolicyRule>;
  /** Determines the inheritance behavior for this policy. If `inherit_from_parent` is true, policy rules set higher up in the hierarchy (up to the closest root) are inherited and present in the effective policy. If it is false, then no rules are inherited, and this policy becomes the new root for evaluation. This field can be set only for policies which configure list constraints. */
  inheritFromParent?: boolean;
  /** Ignores policies set above this resource and restores the `constraint_default` enforcement behavior of the specific constraint at this resource. This field can be set in policies for either list or boolean constraints. If set, `rules` must be empty and `inherit_from_parent` must be set to false. */
  reset?: boolean;
}

export const GoogleCloudOrgpolicyV2PolicySpec: Schema.Schema<GoogleCloudOrgpolicyV2PolicySpec> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  rules: Schema.optional(Schema.Array(GoogleCloudOrgpolicyV2PolicySpecPolicyRule)),
  inheritFromParent: Schema.optional(Schema.Boolean),
  reset: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2PolicySpec" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2PolicySpec>;

export interface GoogleCloudOrgpolicyV2AlternatePolicySpec {
  /** Reference to the launch that will be used while audit logging and to control the launch. Should be set only in the alternate policy. */
  launch?: string;
  /** Specify constraint for configurations of Google Cloud resources. */
  spec?: GoogleCloudOrgpolicyV2PolicySpec;
}

export const GoogleCloudOrgpolicyV2AlternatePolicySpec: Schema.Schema<GoogleCloudOrgpolicyV2AlternatePolicySpec> = Schema.suspend(() => Schema.Struct({
  launch: Schema.optional(Schema.String),
  spec: Schema.optional(GoogleCloudOrgpolicyV2PolicySpec),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2AlternatePolicySpec" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2AlternatePolicySpec>;

export interface GoogleCloudOrgpolicyV2Policy {
  /** Immutable. The resource name of the policy. Must be one of the following forms, where `constraint_name` is the name of the constraint which this policy configures: * `projects/{project_number}/policies/{constraint_name}` * `folders/{folder_id}/policies/{constraint_name}` * `organizations/{organization_id}/policies/{constraint_name}` For example, `projects/123/policies/compute.disableSerialPortAccess`. Note: `projects/{project_id}/policies/{constraint_name}` is also an acceptable name for API requests, but responses will return the name using the equivalent project number. */
  name?: string;
  /** Basic information about the organization policy. */
  spec?: GoogleCloudOrgpolicyV2PolicySpec;
  /** Deprecated. */
  alternate?: GoogleCloudOrgpolicyV2AlternatePolicySpec;
  /** Dry-run policy. Audit-only policy, can be used to monitor how the policy would have impacted the existing and future resources if it's enforced. */
  dryRunSpec?: GoogleCloudOrgpolicyV2PolicySpec;
  /** Optional. An opaque tag indicating the current state of the policy, used for concurrency control. This 'etag' is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const GoogleCloudOrgpolicyV2Policy: Schema.Schema<GoogleCloudOrgpolicyV2Policy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  spec: Schema.optional(GoogleCloudOrgpolicyV2PolicySpec),
  alternate: Schema.optional(GoogleCloudOrgpolicyV2AlternatePolicySpec),
  dryRunSpec: Schema.optional(GoogleCloudOrgpolicyV2PolicySpec),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2Policy" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2Policy>;

export interface GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayPolicyOverlay {
  /** Optional. The parent of the policy we are attaching to. Example: "projects/123456" */
  policyParent?: string;
  /** Optional. The new or updated OrgPolicy. */
  policy?: GoogleCloudOrgpolicyV2Policy;
}

export const GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayPolicyOverlay: Schema.Schema<GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayPolicyOverlay> = Schema.suspend(() => Schema.Struct({
  policyParent: Schema.optional(Schema.String),
  policy: Schema.optional(GoogleCloudOrgpolicyV2Policy),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayPolicyOverlay" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayPolicyOverlay>;

export interface GoogleCloudOrgpolicyV2CustomConstraint {
  /** Immutable. Name of the constraint. This is unique within the organization. Format of the name should be * `organizations/{organization_id}/customConstraints/{custom_constraint_id}` Example: `organizations/123/customConstraints/custom.createOnlyE2TypeVms` The max length is 71 characters and the minimum length is 1. Note that the prefix `organizations/{organization_id}/customConstraints/custom.` is not counted. */
  name?: string;
  /** Immutable. The resource instance type on which this policy applies. Format will be of the form : `/` Example: * `compute.googleapis.com/Instance`. */
  resourceTypes?: Array<string>;
  /** All the operations being applied for this constraint. */
  methodTypes?: Array<"METHOD_TYPE_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | "REMOVE_GRANT" | "GOVERN_TAGS" | (string & {})>;
  /** A Common Expression Language (CEL) condition which is used in the evaluation of the constraint. For example: `resource.instanceName.matches("(production|test)_(.+_)?[\d]+")` or, `resource.management.auto_upgrade == true` The max length of the condition is 1000 characters. */
  condition?: string;
  /** Allow or deny type. */
  actionType?: "ACTION_TYPE_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  /** One line display name for the UI. The max length of the display_name is 200 characters. */
  displayName?: string;
  /** Detailed information about this custom policy constraint. The max length of the description is 2000 characters. */
  description?: string;
  /** Output only. The last time this custom constraint was updated. This represents the last time that the `CreateCustomConstraint` or `UpdateCustomConstraint` methods were called. */
  updateTime?: string;
}

export const GoogleCloudOrgpolicyV2CustomConstraint: Schema.Schema<GoogleCloudOrgpolicyV2CustomConstraint> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  resourceTypes: Schema.optional(Schema.Array(Schema.String)),
  methodTypes: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Schema.String),
  actionType: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2CustomConstraint" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2CustomConstraint>;

export interface GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayCustomConstraintOverlay {
  /** Optional. Resource the constraint is attached to. Example: "organization/987654" */
  customConstraintParent?: string;
  /** Optional. The new or updated custom constraint. */
  customConstraint?: GoogleCloudOrgpolicyV2CustomConstraint;
}

export const GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayCustomConstraintOverlay: Schema.Schema<GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayCustomConstraintOverlay> = Schema.suspend(() => Schema.Struct({
  customConstraintParent: Schema.optional(Schema.String),
  customConstraint: Schema.optional(GoogleCloudOrgpolicyV2CustomConstraint),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayCustomConstraintOverlay" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayCustomConstraintOverlay>;

export interface GoogleCloudPolicysimulatorV1betaOrgPolicyOverlay {
  /** Optional. The OrgPolicy changes to preview violations for. Any existing OrgPolicies with the same name will be overridden in the simulation. That is, violations will be determined as if all policies in the overlay were created or updated. */
  policies?: Array<GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayPolicyOverlay>;
  /** Optional. The OrgPolicy CustomConstraint changes to preview violations for. Any existing CustomConstraints with the same name will be overridden in the simulation. That is, violations will be determined as if all custom constraints in the overlay were instantiated. Only a single custom_constraint is supported in the overlay at a time. For evaluating multiple constraints, multiple `GenerateOrgPolicyViolationsPreview` requests are made, where each request evaluates a single constraint. */
  customConstraints?: Array<GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayCustomConstraintOverlay>;
}

export const GoogleCloudPolicysimulatorV1betaOrgPolicyOverlay: Schema.Schema<GoogleCloudPolicysimulatorV1betaOrgPolicyOverlay> = Schema.suspend(() => Schema.Struct({
  policies: Schema.optional(Schema.Array(GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayPolicyOverlay)),
  customConstraints: Schema.optional(Schema.Array(GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayCustomConstraintOverlay)),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1betaOrgPolicyOverlay" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1betaOrgPolicyOverlay>;

export interface GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreviewResourceCounts {
  /** Output only. Number of resources checked for compliance. Must equal: unenforced + noncompliant + compliant + error */
  scanned?: number;
  /** Output only. Number of scanned resources with at least one violation. */
  noncompliant?: number;
  /** Output only. Number of scanned resources with zero violations. */
  compliant?: number;
  /** Output only. Number of resources where the constraint was not enforced, i.e. the Policy set `enforced: false` for that resource. */
  unenforced?: number;
  /** Output only. Number of resources that returned an error when scanned. */
  errors?: number;
}

export const GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreviewResourceCounts: Schema.Schema<GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreviewResourceCounts> = Schema.suspend(() => Schema.Struct({
  scanned: Schema.optional(Schema.Number),
  noncompliant: Schema.optional(Schema.Number),
  compliant: Schema.optional(Schema.Number),
  unenforced: Schema.optional(Schema.Number),
  errors: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreviewResourceCounts" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreviewResourceCounts>;

export interface GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreview {
  /** Output only. The resource name of the `OrgPolicyViolationsPreview`. It has the following format: `organizations/{organization}/locations/{location}/orgPolicyViolationsPreviews/{orgPolicyViolationsPreview}` Example: `organizations/my-example-org/locations/global/orgPolicyViolationsPreviews/506a5f7f` */
  name?: string;
  /** Output only. The state of the `OrgPolicyViolationsPreview`. */
  state?: "PREVIEW_STATE_UNSPECIFIED" | "PREVIEW_PENDING" | "PREVIEW_RUNNING" | "PREVIEW_SUCCEEDED" | "PREVIEW_FAILED" | (string & {});
  /** Required. The proposed changes we are previewing violations for. */
  overlay?: GoogleCloudPolicysimulatorV1betaOrgPolicyOverlay;
  /** Output only. The number of OrgPolicyViolations in this `OrgPolicyViolationsPreview`. This count may differ from `resource_summary.noncompliant_count` because each OrgPolicyViolation is specific to a resource **and** constraint. If there are multiple constraints being evaluated (i.e. multiple policies in the overlay), a single resource may violate multiple constraints. */
  violationsCount?: number;
  /** Output only. A summary of the state of all resources scanned for compliance with the changed OrgPolicy. */
  resourceCounts?: GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreviewResourceCounts;
  /** Output only. The names of the constraints against which all `OrgPolicyViolations` were evaluated. If `OrgPolicyOverlay` only contains `PolicyOverlay` then it contains the name of the configured custom constraint, applicable to the specified policies. Otherwise it contains the name of the constraint specified in `CustomConstraintOverlay`. Format: `organizations/{organization_id}/customConstraints/{custom_constraint_id}` Example: `organizations/123/customConstraints/custom.createOnlyE2TypeVms` */
  customConstraints?: Array<string>;
  /** Output only. Time when this `OrgPolicyViolationsPreview` was created. */
  createTime?: string;
}

export const GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreview: Schema.Schema<GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreview> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  overlay: Schema.optional(GoogleCloudPolicysimulatorV1betaOrgPolicyOverlay),
  violationsCount: Schema.optional(Schema.Number),
  resourceCounts: Schema.optional(GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreviewResourceCounts),
  customConstraints: Schema.optional(Schema.Array(Schema.String)),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreview" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreview>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListOperationsRequest {
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

export const ListOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/operations" }),
  svc,
) as unknown as Schema.Schema<ListOperationsRequest>;

export type ListOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListOperationsError = CommonErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listOperations: API.PaginatedOperationMethod<ListOperationsRequest, ListOperationsResponse, ListOperationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = GoogleLongrunningOperation;
export const GetOperationsResponse = GoogleLongrunningOperation;

export type GetOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getOperations: API.OperationMethod<GetOperationsRequest, GetOperationsResponse, GetOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsReplaysOperationsRequest {
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

export const ListProjectsLocationsReplaysOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/replays/{replaysId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsReplaysOperationsRequest>;

export type ListProjectsLocationsReplaysOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsLocationsReplaysOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsLocationsReplaysOperationsError = CommonErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsReplaysOperations: API.PaginatedOperationMethod<ListProjectsLocationsReplaysOperationsRequest, ListProjectsLocationsReplaysOperationsResponse, ListProjectsLocationsReplaysOperationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsReplaysOperationsRequest,
  output: ListProjectsLocationsReplaysOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsReplaysOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsReplaysOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/replays/{replaysId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsReplaysOperationsRequest>;

export type GetProjectsLocationsReplaysOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsReplaysOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsReplaysOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsReplaysOperations: API.OperationMethod<GetProjectsLocationsReplaysOperationsRequest, GetProjectsLocationsReplaysOperationsResponse, GetProjectsLocationsReplaysOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsReplaysOperationsRequest,
  output: GetProjectsLocationsReplaysOperationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/orgPolicyViolationsPreviews/{orgPolicyViolationsPreviewsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsRequest>;

export type GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOrgPolicyViolationsPreviewsOperations: API.OperationMethod<GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsRequest, GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsResponse, GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsRequest,
  output: GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAccessPolicySimulationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsAccessPolicySimulationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations/{locationsId}/accessPolicySimulations/{accessPolicySimulationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAccessPolicySimulationsOperationsRequest>;

export type GetProjectsLocationsAccessPolicySimulationsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsAccessPolicySimulationsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsAccessPolicySimulationsOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsAccessPolicySimulationsOperations: API.OperationMethod<GetProjectsLocationsAccessPolicySimulationsOperationsRequest, GetProjectsLocationsAccessPolicySimulationsOperationsResponse, GetProjectsLocationsAccessPolicySimulationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAccessPolicySimulationsOperationsRequest,
  output: GetProjectsLocationsAccessPolicySimulationsOperationsResponse,
  errors: [],
}));

export interface ListFoldersLocationsReplaysOperationsRequest {
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

export const ListFoldersLocationsReplaysOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/folders/{foldersId}/locations/{locationsId}/replays/{replaysId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsReplaysOperationsRequest>;

export type ListFoldersLocationsReplaysOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListFoldersLocationsReplaysOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListFoldersLocationsReplaysOperationsError = CommonErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listFoldersLocationsReplaysOperations: API.PaginatedOperationMethod<ListFoldersLocationsReplaysOperationsRequest, ListFoldersLocationsReplaysOperationsResponse, ListFoldersLocationsReplaysOperationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListFoldersLocationsReplaysOperationsRequest,
  output: ListFoldersLocationsReplaysOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetFoldersLocationsReplaysOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetFoldersLocationsReplaysOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/folders/{foldersId}/locations/{locationsId}/replays/{replaysId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsReplaysOperationsRequest>;

export type GetFoldersLocationsReplaysOperationsResponse = GoogleLongrunningOperation;
export const GetFoldersLocationsReplaysOperationsResponse = GoogleLongrunningOperation;

export type GetFoldersLocationsReplaysOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getFoldersLocationsReplaysOperations: API.OperationMethod<GetFoldersLocationsReplaysOperationsRequest, GetFoldersLocationsReplaysOperationsResponse, GetFoldersLocationsReplaysOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsReplaysOperationsRequest,
  output: GetFoldersLocationsReplaysOperationsResponse,
  errors: [],
}));

export interface GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/folders/{foldersId}/locations/{locationsId}/orgPolicyViolationsPreviews/{orgPolicyViolationsPreviewsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsRequest>;

export type GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsResponse = GoogleLongrunningOperation;
export const GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsResponse = GoogleLongrunningOperation;

export type GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getFoldersLocationsOrgPolicyViolationsPreviewsOperations: API.OperationMethod<GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsRequest, GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsResponse, GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsRequest,
  output: GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsResponse,
  errors: [],
}));

export interface GetFoldersLocationsAccessPolicySimulationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetFoldersLocationsAccessPolicySimulationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/folders/{foldersId}/locations/{locationsId}/accessPolicySimulations/{accessPolicySimulationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsAccessPolicySimulationsOperationsRequest>;

export type GetFoldersLocationsAccessPolicySimulationsOperationsResponse = GoogleLongrunningOperation;
export const GetFoldersLocationsAccessPolicySimulationsOperationsResponse = GoogleLongrunningOperation;

export type GetFoldersLocationsAccessPolicySimulationsOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getFoldersLocationsAccessPolicySimulationsOperations: API.OperationMethod<GetFoldersLocationsAccessPolicySimulationsOperationsRequest, GetFoldersLocationsAccessPolicySimulationsOperationsResponse, GetFoldersLocationsAccessPolicySimulationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsAccessPolicySimulationsOperationsRequest,
  output: GetFoldersLocationsAccessPolicySimulationsOperationsResponse,
  errors: [],
}));

export interface ListOrganizationsLocationsReplaysOperationsRequest {
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

export const ListOrganizationsLocationsReplaysOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/organizations/{organizationsId}/locations/{locationsId}/replays/{replaysId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsReplaysOperationsRequest>;

export type ListOrganizationsLocationsReplaysOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListOrganizationsLocationsReplaysOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListOrganizationsLocationsReplaysOperationsError = CommonErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listOrganizationsLocationsReplaysOperations: API.PaginatedOperationMethod<ListOrganizationsLocationsReplaysOperationsRequest, ListOrganizationsLocationsReplaysOperationsResponse, ListOrganizationsLocationsReplaysOperationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListOrganizationsLocationsReplaysOperationsRequest,
  output: ListOrganizationsLocationsReplaysOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetOrganizationsLocationsReplaysOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOrganizationsLocationsReplaysOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/organizations/{organizationsId}/locations/{locationsId}/replays/{replaysId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsReplaysOperationsRequest>;

export type GetOrganizationsLocationsReplaysOperationsResponse = GoogleLongrunningOperation;
export const GetOrganizationsLocationsReplaysOperationsResponse = GoogleLongrunningOperation;

export type GetOrganizationsLocationsReplaysOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getOrganizationsLocationsReplaysOperations: API.OperationMethod<GetOrganizationsLocationsReplaysOperationsRequest, GetOrganizationsLocationsReplaysOperationsResponse, GetOrganizationsLocationsReplaysOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsReplaysOperationsRequest,
  output: GetOrganizationsLocationsReplaysOperationsResponse,
  errors: [],
}));

export interface GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/organizations/{organizationsId}/locations/{locationsId}/orgPolicyViolationsPreviews/{orgPolicyViolationsPreviewsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsRequest>;

export type GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsResponse = GoogleLongrunningOperation;
export const GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsResponse = GoogleLongrunningOperation;

export type GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getOrganizationsLocationsOrgPolicyViolationsPreviewsOperations: API.OperationMethod<GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsRequest, GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsResponse, GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsRequest,
  output: GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsResponse,
  errors: [],
}));

export interface GetOrganizationsLocationsAccessPolicySimulationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOrganizationsLocationsAccessPolicySimulationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/organizations/{organizationsId}/locations/{locationsId}/accessPolicySimulations/{accessPolicySimulationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsAccessPolicySimulationsOperationsRequest>;

export type GetOrganizationsLocationsAccessPolicySimulationsOperationsResponse = GoogleLongrunningOperation;
export const GetOrganizationsLocationsAccessPolicySimulationsOperationsResponse = GoogleLongrunningOperation;

export type GetOrganizationsLocationsAccessPolicySimulationsOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getOrganizationsLocationsAccessPolicySimulationsOperations: API.OperationMethod<GetOrganizationsLocationsAccessPolicySimulationsOperationsRequest, GetOrganizationsLocationsAccessPolicySimulationsOperationsResponse, GetOrganizationsLocationsAccessPolicySimulationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsAccessPolicySimulationsOperationsRequest,
  output: GetOrganizationsLocationsAccessPolicySimulationsOperationsResponse,
  errors: [],
}));

