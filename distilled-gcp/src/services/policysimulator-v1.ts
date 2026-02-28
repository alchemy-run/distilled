// ==========================================================================
// Policy Simulator API (policysimulator v1)
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
  version: "v1",
  rootUrl: "https://policysimulator.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleIamV1AuditLogConfig {
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
}

export const GoogleIamV1AuditLogConfig: Schema.Schema<GoogleIamV1AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
  logType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV1AuditLogConfig" }) as any as Schema.Schema<GoogleIamV1AuditLogConfig>;

export interface GoogleIamV1AuditConfig {
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<GoogleIamV1AuditLogConfig>;
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
}

export const GoogleIamV1AuditConfig: Schema.Schema<GoogleIamV1AuditConfig> = Schema.suspend(() => Schema.Struct({
  auditLogConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditLogConfig)),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV1AuditConfig" }) as any as Schema.Schema<GoogleIamV1AuditConfig>;

export interface GoogleTypeExpr {
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
}

export const GoogleTypeExpr: Schema.Schema<GoogleTypeExpr> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
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

export interface GoogleIamV1Policy {
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<GoogleIamV1AuditConfig>;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<GoogleIamV1Binding>;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const GoogleIamV1Policy: Schema.Schema<GoogleIamV1Policy> = Schema.suspend(() => Schema.Struct({
  auditConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditConfig)),
  bindings: Schema.optional(Schema.Array(GoogleIamV1Binding)),
  version: Schema.optional(Schema.Number),
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
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
}

export const GoogleTypeDate: Schema.Schema<GoogleTypeDate> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeDate" }) as any as Schema.Schema<GoogleTypeDate>;

export interface GoogleCloudPolicysimulatorV1ReplayResultsSummary {
  /** The number of replayed log entries with no difference between baseline and simulated policies. */
  unchangedCount?: number;
  /** The date of the newest log entry replayed. */
  newestDate?: GoogleTypeDate;
  /** The number of replayed log entries with a difference between baseline and simulated policies. */
  differenceCount?: number;
  /** The date of the oldest log entry replayed. */
  oldestDate?: GoogleTypeDate;
  /** The total number of log entries replayed. */
  logCount?: number;
  /** The number of log entries that could not be replayed. */
  errorCount?: number;
}

export const GoogleCloudPolicysimulatorV1ReplayResultsSummary: Schema.Schema<GoogleCloudPolicysimulatorV1ReplayResultsSummary> = Schema.suspend(() => Schema.Struct({
  unchangedCount: Schema.optional(Schema.Number),
  newestDate: Schema.optional(GoogleTypeDate),
  differenceCount: Schema.optional(Schema.Number),
  oldestDate: Schema.optional(GoogleTypeDate),
  logCount: Schema.optional(Schema.Number),
  errorCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1ReplayResultsSummary" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1ReplayResultsSummary>;

export interface GoogleCloudPolicysimulatorV1Replay {
  /** Required. The configuration used for the `Replay`. */
  config?: GoogleCloudPolicysimulatorV1ReplayConfig;
  /** Output only. The current state of the `Replay`. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED" | (string & {});
  /** Output only. The resource name of the `Replay`, which has the following format: `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}`, where `{resource-id}` is the ID of the project, folder, or organization that owns the Replay. Example: `projects/my-example-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36` */
  name?: string;
  /** Output only. Summary statistics about the replayed log entries. */
  resultsSummary?: GoogleCloudPolicysimulatorV1ReplayResultsSummary;
}

export const GoogleCloudPolicysimulatorV1Replay: Schema.Schema<GoogleCloudPolicysimulatorV1Replay> = Schema.suspend(() => Schema.Struct({
  config: Schema.optional(GoogleCloudPolicysimulatorV1ReplayConfig),
  state: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  resultsSummary: Schema.optional(GoogleCloudPolicysimulatorV1ReplayResultsSummary),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1Replay" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1Replay>;

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
  /** Setting this to true means that all values are denied. This field can be set only in policies for list constraints. */
  denyAll?: boolean;
  /** A condition that determines whether this rule is used to evaluate the policy. When set, the google.type.Expr.expression field must contain 1 to 10 subexpressions, joined by the `||` or `&&` operators. Each subexpression must use the `resource.matchTag()`, `resource.matchTagId()`, `resource.hasTagKey()`, or `resource.hasTagKeyId()` Common Expression Language (CEL) function. The `resource.matchTag()` function takes the following arguments: * `key_name`: the namespaced name of the tag key, with the organization ID and a slash (`/`) as a prefix; for example, `123456789012/environment` * `value_name`: the short name of the tag value For example: `resource.matchTag('123456789012/environment, 'prod')` The `resource.matchTagId()` function takes the following arguments: * `key_id`: the permanent ID of the tag key; for example, `tagKeys/123456789012` * `value_id`: the permanent ID of the tag value; for example, `tagValues/567890123456` For example: `resource.matchTagId('tagKeys/123456789012', 'tagValues/567890123456')` The `resource.hasTagKey()` function takes the following argument: * `key_name`: the namespaced name of the tag key, with the organization ID and a slash (`/`) as a prefix; for example, `123456789012/environment` For example: `resource.hasTagKey('123456789012/environment')` The `resource.hasTagKeyId()` function takes the following arguments: * `key_id`: the permanent ID of the tag key; for example, `tagKeys/123456789012` For example: `resource.hasTagKeyId('tagKeys/123456789012')` */
  condition?: GoogleTypeExpr;
  /** Setting this to true means that all values are allowed. This field can be set only in policies for list constraints. */
  allowAll?: boolean;
  /** Optional. Required for managed constraints if parameters are defined. Passes parameter values when policy enforcement is enabled. Ensure that parameter value types match those defined in the constraint definition. For example: ``` { "allowedLocations" : ["us-east1", "us-west1"], "allowAll" : true } ``` */
  parameters?: Record<string, unknown>;
  /** List of values to be used for this policy rule. This field can be set only in policies for list constraints. */
  values?: GoogleCloudOrgpolicyV2PolicySpecPolicyRuleStringValues;
  /** If `true`, then the policy is enforced. If `false`, then any configuration is acceptable. This field can be set in policies for boolean constraints, custom constraints and managed constraints. */
  enforce?: boolean;
}

export const GoogleCloudOrgpolicyV2PolicySpecPolicyRule: Schema.Schema<GoogleCloudOrgpolicyV2PolicySpecPolicyRule> = Schema.suspend(() => Schema.Struct({
  denyAll: Schema.optional(Schema.Boolean),
  condition: Schema.optional(GoogleTypeExpr),
  allowAll: Schema.optional(Schema.Boolean),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  values: Schema.optional(GoogleCloudOrgpolicyV2PolicySpecPolicyRuleStringValues),
  enforce: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2PolicySpecPolicyRule" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2PolicySpecPolicyRule>;

export interface GoogleCloudOrgpolicyV2PolicySpec {
  /** Output only. The time stamp this was previously updated. This represents the last time a call to `CreatePolicy` or `UpdatePolicy` was made for that policy. */
  updateTime?: string;
  /** Ignores policies set above this resource and restores the `constraint_default` enforcement behavior of the specific constraint at this resource. This field can be set in policies for either list or boolean constraints. If set, `rules` must be empty and `inherit_from_parent` must be set to false. */
  reset?: boolean;
  /** In policies for boolean constraints, the following requirements apply: - There must be one and only one policy rule where condition is unset. - Boolean policy rules with conditions must set `enforced` to the opposite of the policy rule without a condition. - During policy evaluation, policy rules with conditions that are true for a target resource take precedence. */
  rules?: Array<GoogleCloudOrgpolicyV2PolicySpecPolicyRule>;
  /** An opaque tag indicating the current version of the policySpec, used for concurrency control. This field is ignored if used in a `CreatePolicy` request. When the policy is returned from either a `GetPolicy` or a `ListPolicies` request, this `etag` indicates the version of the current policySpec to use when executing a read-modify-write loop. When the policy is returned from a `GetEffectivePolicy` request, the `etag` will be unset. */
  etag?: string;
  /** Determines the inheritance behavior for this policy. If `inherit_from_parent` is true, policy rules set higher up in the hierarchy (up to the closest root) are inherited and present in the effective policy. If it is false, then no rules are inherited, and this policy becomes the new root for evaluation. This field can be set only for policies which configure list constraints. */
  inheritFromParent?: boolean;
}

export const GoogleCloudOrgpolicyV2PolicySpec: Schema.Schema<GoogleCloudOrgpolicyV2PolicySpec> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  reset: Schema.optional(Schema.Boolean),
  rules: Schema.optional(Schema.Array(GoogleCloudOrgpolicyV2PolicySpecPolicyRule)),
  etag: Schema.optional(Schema.String),
  inheritFromParent: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2PolicySpec" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2PolicySpec>;

export interface GoogleCloudOrgpolicyV2AlternatePolicySpec {
  /** Specify constraint for configurations of Google Cloud resources. */
  spec?: GoogleCloudOrgpolicyV2PolicySpec;
  /** Reference to the launch that will be used while audit logging and to control the launch. Should be set only in the alternate policy. */
  launch?: string;
}

export const GoogleCloudOrgpolicyV2AlternatePolicySpec: Schema.Schema<GoogleCloudOrgpolicyV2AlternatePolicySpec> = Schema.suspend(() => Schema.Struct({
  spec: Schema.optional(GoogleCloudOrgpolicyV2PolicySpec),
  launch: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2AlternatePolicySpec" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2AlternatePolicySpec>;

export interface GoogleCloudOrgpolicyV2Policy {
  /** Optional. An opaque tag indicating the current state of the policy, used for concurrency control. This 'etag' is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Deprecated. */
  alternate?: GoogleCloudOrgpolicyV2AlternatePolicySpec;
  /** Basic information about the organization policy. */
  spec?: GoogleCloudOrgpolicyV2PolicySpec;
  /** Dry-run policy. Audit-only policy, can be used to monitor how the policy would have impacted the existing and future resources if it's enforced. */
  dryRunSpec?: GoogleCloudOrgpolicyV2PolicySpec;
  /** Immutable. The resource name of the policy. Must be one of the following forms, where `constraint_name` is the name of the constraint which this policy configures: * `projects/{project_number}/policies/{constraint_name}` * `folders/{folder_id}/policies/{constraint_name}` * `organizations/{organization_id}/policies/{constraint_name}` For example, `projects/123/policies/compute.disableSerialPortAccess`. Note: `projects/{project_id}/policies/{constraint_name}` is also an acceptable name for API requests, but responses will return the name using the equivalent project number. */
  name?: string;
}

export const GoogleCloudOrgpolicyV2Policy: Schema.Schema<GoogleCloudOrgpolicyV2Policy> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  alternate: Schema.optional(GoogleCloudOrgpolicyV2AlternatePolicySpec),
  spec: Schema.optional(GoogleCloudOrgpolicyV2PolicySpec),
  dryRunSpec: Schema.optional(GoogleCloudOrgpolicyV2PolicySpec),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2Policy" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2Policy>;

export interface GoogleCloudPolicysimulatorV1OrgPolicyOverlayPolicyOverlay {
  /** Optional. The new or updated OrgPolicy. */
  policy?: GoogleCloudOrgpolicyV2Policy;
  /** Optional. The parent of the policy we are attaching to. Example: "projects/123456" */
  policyParent?: string;
}

export const GoogleCloudPolicysimulatorV1OrgPolicyOverlayPolicyOverlay: Schema.Schema<GoogleCloudPolicysimulatorV1OrgPolicyOverlayPolicyOverlay> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(GoogleCloudOrgpolicyV2Policy),
  policyParent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1OrgPolicyOverlayPolicyOverlay" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1OrgPolicyOverlayPolicyOverlay>;

export interface GoogleCloudOrgpolicyV2CustomConstraint {
  /** Output only. The last time this custom constraint was updated. This represents the last time that the `CreateCustomConstraint` or `UpdateCustomConstraint` methods were called. */
  updateTime?: string;
  /** One line display name for the UI. The max length of the display_name is 200 characters. */
  displayName?: string;
  /** All the operations being applied for this constraint. */
  methodTypes?: Array<"METHOD_TYPE_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | "REMOVE_GRANT" | "GOVERN_TAGS" | (string & {})>;
  /** Detailed information about this custom policy constraint. The max length of the description is 2000 characters. */
  description?: string;
  /** Immutable. The resource instance type on which this policy applies. Format will be of the form : `/` Example: * `compute.googleapis.com/Instance`. */
  resourceTypes?: Array<string>;
  /** A Common Expression Language (CEL) condition which is used in the evaluation of the constraint. For example: `resource.instanceName.matches("(production|test)_(.+_)?[\d]+")` or, `resource.management.auto_upgrade == true` The max length of the condition is 1000 characters. */
  condition?: string;
  /** Allow or deny type. */
  actionType?: "ACTION_TYPE_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  /** Immutable. Name of the constraint. This is unique within the organization. Format of the name should be * `organizations/{organization_id}/customConstraints/{custom_constraint_id}` Example: `organizations/123/customConstraints/custom.createOnlyE2TypeVms` The max length is 70 characters and the minimum length is 1. Note that the prefix `organizations/{organization_id}/customConstraints/` is not counted. */
  name?: string;
}

export const GoogleCloudOrgpolicyV2CustomConstraint: Schema.Schema<GoogleCloudOrgpolicyV2CustomConstraint> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  methodTypes: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  resourceTypes: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Schema.String),
  actionType: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2CustomConstraint" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2CustomConstraint>;

export interface GoogleCloudPolicysimulatorV1OrgPolicyOverlayCustomConstraintOverlay {
  /** Optional. Resource the constraint is attached to. Example: "organization/987654" */
  customConstraintParent?: string;
  /** Optional. The new or updated custom constraint. */
  customConstraint?: GoogleCloudOrgpolicyV2CustomConstraint;
}

export const GoogleCloudPolicysimulatorV1OrgPolicyOverlayCustomConstraintOverlay: Schema.Schema<GoogleCloudPolicysimulatorV1OrgPolicyOverlayCustomConstraintOverlay> = Schema.suspend(() => Schema.Struct({
  customConstraintParent: Schema.optional(Schema.String),
  customConstraint: Schema.optional(GoogleCloudOrgpolicyV2CustomConstraint),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1OrgPolicyOverlayCustomConstraintOverlay" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1OrgPolicyOverlayCustomConstraintOverlay>;

export interface GoogleCloudPolicysimulatorV1OrgPolicyOverlay {
  /** Optional. The OrgPolicy changes to preview violations for. Any existing OrgPolicies with the same name will be overridden in the simulation. That is, violations will be determined as if all policies in the overlay were created or updated. */
  policies?: Array<GoogleCloudPolicysimulatorV1OrgPolicyOverlayPolicyOverlay>;
  /** Optional. The OrgPolicy CustomConstraint changes to preview violations for. Any existing CustomConstraints with the same name will be overridden in the simulation. That is, violations will be determined as if all custom constraints in the overlay were instantiated. Only a single custom_constraint is supported in the overlay at a time. For evaluating multiple constraints, multiple `GenerateOrgPolicyViolationsPreview` requests are made, where each request evaluates a single constraint. */
  customConstraints?: Array<GoogleCloudPolicysimulatorV1OrgPolicyOverlayCustomConstraintOverlay>;
}

export const GoogleCloudPolicysimulatorV1OrgPolicyOverlay: Schema.Schema<GoogleCloudPolicysimulatorV1OrgPolicyOverlay> = Schema.suspend(() => Schema.Struct({
  policies: Schema.optional(Schema.Array(GoogleCloudPolicysimulatorV1OrgPolicyOverlayPolicyOverlay)),
  customConstraints: Schema.optional(Schema.Array(GoogleCloudPolicysimulatorV1OrgPolicyOverlayCustomConstraintOverlay)),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1OrgPolicyOverlay" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1OrgPolicyOverlay>;

export interface GoogleCloudPolicysimulatorV1ResourceContext {
  /** The full name of the resource. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1` See [Resource names](https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. */
  resource?: string;
  /** The asset type of the resource as defined by CAIS. Example: `compute.googleapis.com/Firewall` See [Supported asset types](https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information. */
  assetType?: string;
  /** The ancestry path of the resource in Google Cloud [resource hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), represented as a list of relative resource names. An ancestry path starts with the closest ancestor in the hierarchy and ends at root. If the resource is a project, folder, or organization, the ancestry path starts from the resource itself. Example: `["projects/123456789", "folders/5432", "organizations/1234"]` */
  ancestors?: Array<string>;
}

export const GoogleCloudPolicysimulatorV1ResourceContext: Schema.Schema<GoogleCloudPolicysimulatorV1ResourceContext> = Schema.suspend(() => Schema.Struct({
  resource: Schema.optional(Schema.String),
  assetType: Schema.optional(Schema.String),
  ancestors: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1ResourceContext" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1ResourceContext>;

export interface GoogleRpcStatus {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  code: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleLongrunningOperation {
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
  error: Schema.optional(GoogleRpcStatus),
  done: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleLongrunningOperation" }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleLongrunningListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunningOperation>;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleLongrunningListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

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

export interface GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayCustomConstraintOverlay {
  /** Optional. The new or updated custom constraint. */
  customConstraint?: GoogleCloudOrgpolicyV2CustomConstraint;
  /** Optional. Resource the constraint is attached to. Example: "organization/987654" */
  customConstraintParent?: string;
}

export const GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayCustomConstraintOverlay: Schema.Schema<GoogleCloudPolicysimulatorV1betaOrgPolicyOverlayCustomConstraintOverlay> = Schema.suspend(() => Schema.Struct({
  customConstraint: Schema.optional(GoogleCloudOrgpolicyV2CustomConstraint),
  customConstraintParent: Schema.optional(Schema.String),
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

export interface GoogleCloudPolicysimulatorV1betaGenerateOrgPolicyViolationsPreviewOperationMetadata {
  /** Number of resources already scanned. */
  resourcesScanned?: number;
  /** Number of resources still to scan. */
  resourcesPending?: number;
  /** The current state of the operation. */
  state?: "PREVIEW_STATE_UNSPECIFIED" | "PREVIEW_PENDING" | "PREVIEW_RUNNING" | "PREVIEW_SUCCEEDED" | "PREVIEW_FAILED" | (string & {});
  /** Time when the request was received. */
  requestTime?: string;
  /** Total number of resources that need scanning. Should equal resource_scanned + resources_pending */
  resourcesFound?: number;
  /** Time when the request started processing, i.e. when the state was set to RUNNING. */
  startTime?: string;
}

export const GoogleCloudPolicysimulatorV1betaGenerateOrgPolicyViolationsPreviewOperationMetadata: Schema.Schema<GoogleCloudPolicysimulatorV1betaGenerateOrgPolicyViolationsPreviewOperationMetadata> = Schema.suspend(() => Schema.Struct({
  resourcesScanned: Schema.optional(Schema.Number),
  resourcesPending: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.String),
  requestTime: Schema.optional(Schema.String),
  resourcesFound: Schema.optional(Schema.Number),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1betaGenerateOrgPolicyViolationsPreviewOperationMetadata" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1betaGenerateOrgPolicyViolationsPreviewOperationMetadata>;

export interface GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreviewResourceCounts {
  /** Output only. Number of resources where the constraint was not enforced, i.e. the Policy set `enforced: false` for that resource. */
  unenforced?: number;
  /** Output only. Number of scanned resources with at least one violation. */
  noncompliant?: number;
  /** Output only. Number of resources checked for compliance. Must equal: unenforced + noncompliant + compliant + error */
  scanned?: number;
  /** Output only. Number of scanned resources with zero violations. */
  compliant?: number;
  /** Output only. Number of resources that returned an error when scanned. */
  errors?: number;
}

export const GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreviewResourceCounts: Schema.Schema<GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreviewResourceCounts> = Schema.suspend(() => Schema.Struct({
  unenforced: Schema.optional(Schema.Number),
  noncompliant: Schema.optional(Schema.Number),
  scanned: Schema.optional(Schema.Number),
  compliant: Schema.optional(Schema.Number),
  errors: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreviewResourceCounts" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreviewResourceCounts>;

export interface GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreview {
  /** Output only. The resource name of the `OrgPolicyViolationsPreview`. It has the following format: `organizations/{organization}/locations/{location}/orgPolicyViolationsPreviews/{orgPolicyViolationsPreview}` Example: `organizations/my-example-org/locations/global/orgPolicyViolationsPreviews/506a5f7f` */
  name?: string;
  /** Output only. The names of the constraints against which all `OrgPolicyViolations` were evaluated. If `OrgPolicyOverlay` only contains `PolicyOverlay` then it contains the name of the configured custom constraint, applicable to the specified policies. Otherwise it contains the name of the constraint specified in `CustomConstraintOverlay`. Format: `organizations/{organization_id}/customConstraints/{custom_constraint_id}` Example: `organizations/123/customConstraints/custom.createOnlyE2TypeVms` */
  customConstraints?: Array<string>;
  /** Required. The proposed changes we are previewing violations for. */
  overlay?: GoogleCloudPolicysimulatorV1OrgPolicyOverlay;
  /** Output only. Time when this `OrgPolicyViolationsPreview` was created. */
  createTime?: string;
  /** Output only. A summary of the state of all resources scanned for compliance with the changed OrgPolicy. */
  resourceCounts?: GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreviewResourceCounts;
  /** Output only. The number of OrgPolicyViolations in this `OrgPolicyViolationsPreview`. This count may differ from `resource_summary.noncompliant_count` because each OrgPolicyViolation is specific to a resource **and** constraint. If there are multiple constraints being evaluated (i.e. multiple policies in the overlay), a single resource may violate multiple constraints. */
  violationsCount?: number;
  /** Output only. The state of the `OrgPolicyViolationsPreview`. */
  state?: "PREVIEW_STATE_UNSPECIFIED" | "PREVIEW_PENDING" | "PREVIEW_RUNNING" | "PREVIEW_SUCCEEDED" | "PREVIEW_FAILED" | (string & {});
}

export const GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreview: Schema.Schema<GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreview> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  customConstraints: Schema.optional(Schema.Array(Schema.String)),
  overlay: Schema.optional(GoogleCloudPolicysimulatorV1OrgPolicyOverlay),
  createTime: Schema.optional(Schema.String),
  resourceCounts: Schema.optional(GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreviewResourceCounts),
  violationsCount: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreview" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreview>;

export interface GoogleCloudPolicysimulatorV1ListOrgPolicyViolationsPreviewsResponse {
  /** A token that you can use to retrieve the next page of results. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of OrgPolicyViolationsPreview */
  orgPolicyViolationsPreviews?: Array<GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreview>;
}

export const GoogleCloudPolicysimulatorV1ListOrgPolicyViolationsPreviewsResponse: Schema.Schema<GoogleCloudPolicysimulatorV1ListOrgPolicyViolationsPreviewsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  orgPolicyViolationsPreviews: Schema.optional(Schema.Array(GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreview)),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1ListOrgPolicyViolationsPreviewsResponse" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1ListOrgPolicyViolationsPreviewsResponse>;

export interface GoogleCloudPolicysimulatorV1OrgPolicyViolation {
  /** The resource violating the constraint. */
  resource?: GoogleCloudPolicysimulatorV1ResourceContext;
  /** The custom constraint being violated. */
  customConstraint?: GoogleCloudOrgpolicyV2CustomConstraint;
  /** The name of the `OrgPolicyViolation`. Example: organizations/my-example-org/locations/global/orgPolicyViolationsPreviews/506a5f7f/orgPolicyViolations/38ce` */
  name?: string;
  /** Any error encountered during the evaluation. */
  error?: GoogleRpcStatus;
}

export const GoogleCloudPolicysimulatorV1OrgPolicyViolation: Schema.Schema<GoogleCloudPolicysimulatorV1OrgPolicyViolation> = Schema.suspend(() => Schema.Struct({
  resource: Schema.optional(GoogleCloudPolicysimulatorV1ResourceContext),
  customConstraint: Schema.optional(GoogleCloudOrgpolicyV2CustomConstraint),
  name: Schema.optional(Schema.String),
  error: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1OrgPolicyViolation" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1OrgPolicyViolation>;

export interface GoogleCloudPolicysimulatorV1ListOrgPolicyViolationsResponse {
  /** The list of OrgPolicyViolations */
  orgPolicyViolations?: Array<GoogleCloudPolicysimulatorV1OrgPolicyViolation>;
  /** A token that you can use to retrieve the next page of results. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudPolicysimulatorV1ListOrgPolicyViolationsResponse: Schema.Schema<GoogleCloudPolicysimulatorV1ListOrgPolicyViolationsResponse> = Schema.suspend(() => Schema.Struct({
  orgPolicyViolations: Schema.optional(Schema.Array(GoogleCloudPolicysimulatorV1OrgPolicyViolation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1ListOrgPolicyViolationsResponse" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1ListOrgPolicyViolationsResponse>;

export interface GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreviewResourceCounts {
  /** Output only. Number of resources where the constraint was not enforced, i.e. the Policy set `enforced: false` for that resource. */
  unenforced?: number;
  /** Output only. Number of resources that returned an error when scanned. */
  errors?: number;
  /** Output only. Number of scanned resources with at least one violation. */
  noncompliant?: number;
  /** Output only. Number of resources checked for compliance. Must equal: unenforced + noncompliant + compliant + error */
  scanned?: number;
  /** Output only. Number of scanned resources with zero violations. */
  compliant?: number;
}

export const GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreviewResourceCounts: Schema.Schema<GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreviewResourceCounts> = Schema.suspend(() => Schema.Struct({
  unenforced: Schema.optional(Schema.Number),
  errors: Schema.optional(Schema.Number),
  noncompliant: Schema.optional(Schema.Number),
  scanned: Schema.optional(Schema.Number),
  compliant: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreviewResourceCounts" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreviewResourceCounts>;

export interface GoogleCloudPolicysimulatorV1BindingExplanationAnnotatedMembership {
  /** Indicates whether the binding includes the principal. */
  membership?: "MEMBERSHIP_UNSPECIFIED" | "MEMBERSHIP_INCLUDED" | "MEMBERSHIP_NOT_INCLUDED" | "MEMBERSHIP_UNKNOWN_INFO_DENIED" | "MEMBERSHIP_UNKNOWN_UNSUPPORTED" | (string & {});
  /** The relevance of the principal's status to the overall determination for the binding. */
  relevance?: "HEURISTIC_RELEVANCE_UNSPECIFIED" | "NORMAL" | "HIGH" | (string & {});
}

export const GoogleCloudPolicysimulatorV1BindingExplanationAnnotatedMembership: Schema.Schema<GoogleCloudPolicysimulatorV1BindingExplanationAnnotatedMembership> = Schema.suspend(() => Schema.Struct({
  membership: Schema.optional(Schema.String),
  relevance: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1BindingExplanationAnnotatedMembership" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1BindingExplanationAnnotatedMembership>;

export interface GoogleCloudPolicysimulatorV1BindingExplanation {
  /** The relevance of the permission's existence, or nonexistence, in the role to the overall determination for the entire policy. */
  rolePermissionRelevance?: "HEURISTIC_RELEVANCE_UNSPECIFIED" | "NORMAL" | "HIGH" | (string & {});
  /** Indicates whether each principal in the binding includes the principal specified in the request, either directly or indirectly. Each key identifies a principal in the binding, and each value indicates whether the principal in the binding includes the principal in the request. For example, suppose that a binding includes the following principals: * `user:alice@example.com` * `group:product-eng@example.com` The principal in the replayed access tuple is `user:bob@example.com`. This user is a principal of the group `group:product-eng@example.com`. For the first principal in the binding, the key is `user:alice@example.com`, and the `membership` field in the value is set to `MEMBERSHIP_NOT_INCLUDED`. For the second principal in the binding, the key is `group:product-eng@example.com`, and the `membership` field in the value is set to `MEMBERSHIP_INCLUDED`. */
  memberships?: Record<string, GoogleCloudPolicysimulatorV1BindingExplanationAnnotatedMembership>;
  /** Indicates whether the role granted by this binding contains the specified permission. */
  rolePermission?: "ROLE_PERMISSION_UNSPECIFIED" | "ROLE_PERMISSION_INCLUDED" | "ROLE_PERMISSION_NOT_INCLUDED" | "ROLE_PERMISSION_UNKNOWN_INFO_DENIED" | (string & {});
  /** A condition expression that prevents this binding from granting access unless the expression evaluates to `true`. To learn about IAM Conditions, see https://cloud.google.com/iam/docs/conditions-overview. */
  condition?: GoogleTypeExpr;
  /** Required. Indicates whether _this binding_ provides the specified permission to the specified principal for the specified resource. This field does _not_ indicate whether the principal actually has the permission for the resource. There might be another binding that overrides this binding. To determine whether the principal actually has the permission, use the `access` field in the TroubleshootIamPolicyResponse. */
  access?: "ACCESS_STATE_UNSPECIFIED" | "GRANTED" | "NOT_GRANTED" | "UNKNOWN_CONDITIONAL" | "UNKNOWN_INFO_DENIED" | (string & {});
  /** The role that this binding grants. For example, `roles/compute.serviceAgent`. For a complete list of predefined IAM roles, as well as the permissions in each role, see https://cloud.google.com/iam/help/roles/reference. */
  role?: string;
  /** The relevance of this binding to the overall determination for the entire policy. */
  relevance?: "HEURISTIC_RELEVANCE_UNSPECIFIED" | "NORMAL" | "HIGH" | (string & {});
}

export const GoogleCloudPolicysimulatorV1BindingExplanation: Schema.Schema<GoogleCloudPolicysimulatorV1BindingExplanation> = Schema.suspend(() => Schema.Struct({
  rolePermissionRelevance: Schema.optional(Schema.String),
  memberships: Schema.optional(Schema.Record(Schema.String, GoogleCloudPolicysimulatorV1BindingExplanationAnnotatedMembership)),
  rolePermission: Schema.optional(Schema.String),
  condition: Schema.optional(GoogleTypeExpr),
  access: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  relevance: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1BindingExplanation" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1BindingExplanation>;

export interface GoogleCloudPolicysimulatorV1betaCreateOrgPolicyViolationsPreviewOperationMetadata {
  /** Number of resources already scanned. */
  resourcesScanned?: number;
  /** Number of resources still to scan. */
  resourcesPending?: number;
  /** Output only. The current state of the operation. */
  state?: "PREVIEW_STATE_UNSPECIFIED" | "PREVIEW_PENDING" | "PREVIEW_RUNNING" | "PREVIEW_SUCCEEDED" | "PREVIEW_FAILED" | (string & {});
  /** Time when the request started processing, i.e., when the state was set to RUNNING. */
  startTime?: string;
  /** Total number of resources that need scanning. Should equal resource_scanned + resources_pending */
  resourcesFound?: number;
  /** Time when the request was received. */
  requestTime?: string;
}

export const GoogleCloudPolicysimulatorV1betaCreateOrgPolicyViolationsPreviewOperationMetadata: Schema.Schema<GoogleCloudPolicysimulatorV1betaCreateOrgPolicyViolationsPreviewOperationMetadata> = Schema.suspend(() => Schema.Struct({
  resourcesScanned: Schema.optional(Schema.Number),
  resourcesPending: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  resourcesFound: Schema.optional(Schema.Number),
  requestTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1betaCreateOrgPolicyViolationsPreviewOperationMetadata" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1betaCreateOrgPolicyViolationsPreviewOperationMetadata>;

export interface GoogleCloudPolicysimulatorV1ExplainedPolicy {
  /** Details about how each binding in the policy affects the principal's ability, or inability, to use the permission for the resource. If the user who created the Replay does not have access to the policy, this field is omitted. */
  bindingExplanations?: Array<GoogleCloudPolicysimulatorV1BindingExplanation>;
  /** The relevance of this policy to the overall determination in the TroubleshootIamPolicyResponse. If the user who created the Replay does not have access to the policy, this field is omitted. */
  relevance?: "HEURISTIC_RELEVANCE_UNSPECIFIED" | "NORMAL" | "HIGH" | (string & {});
  /** The full resource name that identifies the resource. For example, `//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance`. If the user who created the Replay does not have access to the policy, this field is omitted. For examples of full resource names for Google Cloud services, see https://cloud.google.com/iam/help/troubleshooter/full-resource-names. */
  fullResourceName?: string;
  /** Indicates whether _this policy_ provides the specified permission to the specified principal for the specified resource. This field does _not_ indicate whether the principal actually has the permission for the resource. There might be another policy that overrides this policy. To determine whether the principal actually has the permission, use the `access` field in the TroubleshootIamPolicyResponse. */
  access?: "ACCESS_STATE_UNSPECIFIED" | "GRANTED" | "NOT_GRANTED" | "UNKNOWN_CONDITIONAL" | "UNKNOWN_INFO_DENIED" | (string & {});
  /** The IAM policy attached to the resource. If the user who created the Replay does not have access to the policy, this field is empty. */
  policy?: GoogleIamV1Policy;
}

export const GoogleCloudPolicysimulatorV1ExplainedPolicy: Schema.Schema<GoogleCloudPolicysimulatorV1ExplainedPolicy> = Schema.suspend(() => Schema.Struct({
  bindingExplanations: Schema.optional(Schema.Array(GoogleCloudPolicysimulatorV1BindingExplanation)),
  relevance: Schema.optional(Schema.String),
  fullResourceName: Schema.optional(Schema.String),
  access: Schema.optional(Schema.String),
  policy: Schema.optional(GoogleIamV1Policy),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1ExplainedPolicy" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1ExplainedPolicy>;

export interface GoogleCloudPolicysimulatorV1ExplainedAccess {
  /** If the AccessState is `UNKNOWN`, this field contains a list of errors explaining why the result is `UNKNOWN`. If the `AccessState` is `GRANTED` or `NOT_GRANTED`, this field is omitted. */
  errors?: Array<GoogleRpcStatus>;
  /** Whether the principal in the access tuple has permission to access the resource in the access tuple under the given policies. */
  accessState?: "ACCESS_STATE_UNSPECIFIED" | "GRANTED" | "NOT_GRANTED" | "UNKNOWN_CONDITIONAL" | "UNKNOWN_INFO_DENIED" | (string & {});
  /** If the AccessState is `UNKNOWN`, this field contains the policies that led to that result. If the `AccessState` is `GRANTED` or `NOT_GRANTED`, this field is omitted. */
  policies?: Array<GoogleCloudPolicysimulatorV1ExplainedPolicy>;
}

export const GoogleCloudPolicysimulatorV1ExplainedAccess: Schema.Schema<GoogleCloudPolicysimulatorV1ExplainedAccess> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(GoogleRpcStatus)),
  accessState: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(GoogleCloudPolicysimulatorV1ExplainedPolicy)),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1ExplainedAccess" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1ExplainedAccess>;

export interface GoogleCloudPolicysimulatorV1AccessStateDiff {
  /** The results of evaluating the access tuple under the current (baseline) policies. If the AccessState couldn't be fully evaluated, this field explains why. */
  baseline?: GoogleCloudPolicysimulatorV1ExplainedAccess;
  /** How the principal's access, specified in the AccessState field, changed between the current (baseline) policies and proposed (simulated) policies. */
  accessChange?: "ACCESS_CHANGE_TYPE_UNSPECIFIED" | "NO_CHANGE" | "UNKNOWN_CHANGE" | "ACCESS_REVOKED" | "ACCESS_GAINED" | "ACCESS_MAYBE_REVOKED" | "ACCESS_MAYBE_GAINED" | (string & {});
  /** The results of evaluating the access tuple under the proposed (simulated) policies. If the AccessState couldn't be fully evaluated, this field explains why. */
  simulated?: GoogleCloudPolicysimulatorV1ExplainedAccess;
}

export const GoogleCloudPolicysimulatorV1AccessStateDiff: Schema.Schema<GoogleCloudPolicysimulatorV1AccessStateDiff> = Schema.suspend(() => Schema.Struct({
  baseline: Schema.optional(GoogleCloudPolicysimulatorV1ExplainedAccess),
  accessChange: Schema.optional(Schema.String),
  simulated: Schema.optional(GoogleCloudPolicysimulatorV1ExplainedAccess),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1AccessStateDiff" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1AccessStateDiff>;

export interface GoogleCloudPolicysimulatorV1AccessTuple {
  /** Required. The IAM permission to check for the specified principal and resource. For a complete list of IAM permissions, see https://cloud.google.com/iam/help/permissions/reference. For a complete list of predefined IAM roles and the permissions in each role, see https://cloud.google.com/iam/help/roles/reference. */
  permission?: string;
  /** Required. The principal whose access you want to check, in the form of the email address that represents that principal. For example, `alice@example.com` or `my-service-account@my-project.iam.gserviceaccount.com`. The principal must be a Google Account or a service account. Other types of principals are not supported. */
  principal?: string;
  /** Required. The full resource name that identifies the resource. For example, `//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance`. For examples of full resource names for Google Cloud services, see https://cloud.google.com/iam/help/troubleshooter/full-resource-names. */
  fullResourceName?: string;
}

export const GoogleCloudPolicysimulatorV1AccessTuple: Schema.Schema<GoogleCloudPolicysimulatorV1AccessTuple> = Schema.suspend(() => Schema.Struct({
  permission: Schema.optional(Schema.String),
  principal: Schema.optional(Schema.String),
  fullResourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1AccessTuple" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1AccessTuple>;

export interface GoogleCloudPolicysimulatorV1ReplayDiff {
  /** A summary and comparison of the principal's access under the current (baseline) policies and the proposed (simulated) policies for a single access tuple. The evaluation of the principal's access is reported in the AccessState field. */
  accessDiff?: GoogleCloudPolicysimulatorV1AccessStateDiff;
}

export const GoogleCloudPolicysimulatorV1ReplayDiff: Schema.Schema<GoogleCloudPolicysimulatorV1ReplayDiff> = Schema.suspend(() => Schema.Struct({
  accessDiff: Schema.optional(GoogleCloudPolicysimulatorV1AccessStateDiff),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1ReplayDiff" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1ReplayDiff>;

export interface GoogleCloudPolicysimulatorV1ReplayResult {
  /** The Replay that the access tuple was included in. */
  parent?: string;
  /** The error that caused the access tuple replay to fail. This field is only included for access tuples that were not replayed successfully. */
  error?: GoogleRpcStatus;
  /** The access tuple that was replayed. This field includes information about the principal, resource, and permission that were involved in the access attempt. */
  accessTuple?: GoogleCloudPolicysimulatorV1AccessTuple;
  /** The difference between the principal's access under the current (baseline) policies and the principal's access under the proposed (simulated) policies. This field is only included for access tuples that were successfully replayed and had different results under the current policies and the proposed policies. */
  diff?: GoogleCloudPolicysimulatorV1ReplayDiff;
  /** The resource name of the `ReplayResult`, in the following format: `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}/results/{replay-result-id}`, where `{resource-id}` is the ID of the project, folder, or organization that owns the Replay. Example: `projects/my-example-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36/results/1234` */
  name?: string;
  /** The latest date this access tuple was seen in the logs. */
  lastSeenDate?: GoogleTypeDate;
}

export const GoogleCloudPolicysimulatorV1ReplayResult: Schema.Schema<GoogleCloudPolicysimulatorV1ReplayResult> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  error: Schema.optional(GoogleRpcStatus),
  accessTuple: Schema.optional(GoogleCloudPolicysimulatorV1AccessTuple),
  diff: Schema.optional(GoogleCloudPolicysimulatorV1ReplayDiff),
  name: Schema.optional(Schema.String),
  lastSeenDate: Schema.optional(GoogleTypeDate),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1ReplayResult" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1ReplayResult>;

export interface GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreview {
  /** Output only. A summary of the state of all resources scanned for compliance with the changed OrgPolicy. */
  resourceCounts?: GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreviewResourceCounts;
  /** Output only. The names of the constraints against which all `OrgPolicyViolations` were evaluated. If `OrgPolicyOverlay` only contains `PolicyOverlay` then it contains the name of the configured custom constraint, applicable to the specified policies. Otherwise it contains the name of the constraint specified in `CustomConstraintOverlay`. Format: `organizations/{organization_id}/customConstraints/{custom_constraint_id}` Example: `organizations/123/customConstraints/custom.createOnlyE2TypeVms` */
  customConstraints?: Array<string>;
  /** Output only. Time when this `OrgPolicyViolationsPreview` was created. */
  createTime?: string;
  /** Output only. The state of the `OrgPolicyViolationsPreview`. */
  state?: "PREVIEW_STATE_UNSPECIFIED" | "PREVIEW_PENDING" | "PREVIEW_RUNNING" | "PREVIEW_SUCCEEDED" | "PREVIEW_FAILED" | (string & {});
  /** Output only. The resource name of the `OrgPolicyViolationsPreview`. It has the following format: `organizations/{organization}/locations/{location}/orgPolicyViolationsPreviews/{orgPolicyViolationsPreview}` Example: `organizations/my-example-org/locations/global/orgPolicyViolationsPreviews/506a5f7f` */
  name?: string;
  /** Required. The proposed changes we are previewing violations for. */
  overlay?: GoogleCloudPolicysimulatorV1betaOrgPolicyOverlay;
  /** Output only. The number of OrgPolicyViolations in this `OrgPolicyViolationsPreview`. This count may differ from `resource_summary.noncompliant_count` because each OrgPolicyViolation is specific to a resource **and** constraint. If there are multiple constraints being evaluated (i.e. multiple policies in the overlay), a single resource may violate multiple constraints. */
  violationsCount?: number;
}

export const GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreview: Schema.Schema<GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreview> = Schema.suspend(() => Schema.Struct({
  resourceCounts: Schema.optional(GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreviewResourceCounts),
  customConstraints: Schema.optional(Schema.Array(Schema.String)),
  createTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  overlay: Schema.optional(GoogleCloudPolicysimulatorV1betaOrgPolicyOverlay),
  violationsCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreview" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreview>;

export interface GoogleCloudPolicysimulatorV1ListReplayResultsResponse {
  /** The results of running a Replay. */
  replayResults?: Array<GoogleCloudPolicysimulatorV1ReplayResult>;
  /** A token that you can use to retrieve the next page of ReplayResult objects. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudPolicysimulatorV1ListReplayResultsResponse: Schema.Schema<GoogleCloudPolicysimulatorV1ListReplayResultsResponse> = Schema.suspend(() => Schema.Struct({
  replayResults: Schema.optional(Schema.Array(GoogleCloudPolicysimulatorV1ReplayResult)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1ListReplayResultsResponse" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1ListReplayResultsResponse>;

export interface GoogleCloudPolicysimulatorV1ReplayOperationMetadata {
  /** Time when the request was received. */
  startTime?: string;
}

export const GoogleCloudPolicysimulatorV1ReplayOperationMetadata: Schema.Schema<GoogleCloudPolicysimulatorV1ReplayOperationMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicysimulatorV1ReplayOperationMetadata" }) as any as Schema.Schema<GoogleCloudPolicysimulatorV1ReplayOperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = GoogleLongrunningOperation;
export const GetOperationsResponse = GoogleLongrunningOperation;

export type GetOperationsError = CommonErrors;

export const getOperations: API.OperationMethod<GetOperationsRequest, GetOperationsResponse, GetOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOperationsRequest {
  /** The standard list page size. */
  pageSize?: number;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListOperationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations" }),
  svc,
) as unknown as Schema.Schema<ListOperationsRequest>;

export type ListOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListOperationsError = CommonErrors;

export const listOperations = API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations/{locationsId}/orgPolicyViolationsPreviews/{orgPolicyViolationsPreviewsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsRequest>;

export type GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsResponse = GoogleLongrunningOperation;
export const GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsResponse = GoogleLongrunningOperation;

export type GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsError = CommonErrors;

export const getFoldersLocationsOrgPolicyViolationsPreviewsOperations: API.OperationMethod<GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsRequest, GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsResponse, GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsRequest,
  output: GetFoldersLocationsOrgPolicyViolationsPreviewsOperationsResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetFoldersLocationsAccessPolicySimulationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetFoldersLocationsAccessPolicySimulationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations/{locationsId}/accessPolicySimulations/{accessPolicySimulationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsAccessPolicySimulationsOperationsRequest>;

export type GetFoldersLocationsAccessPolicySimulationsOperationsResponse = GoogleLongrunningOperation;
export const GetFoldersLocationsAccessPolicySimulationsOperationsResponse = GoogleLongrunningOperation;

export type GetFoldersLocationsAccessPolicySimulationsOperationsError = CommonErrors;

export const getFoldersLocationsAccessPolicySimulationsOperations: API.OperationMethod<GetFoldersLocationsAccessPolicySimulationsOperationsRequest, GetFoldersLocationsAccessPolicySimulationsOperationsResponse, GetFoldersLocationsAccessPolicySimulationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsAccessPolicySimulationsOperationsRequest,
  output: GetFoldersLocationsAccessPolicySimulationsOperationsResponse,
  errors: [],
}));

/** Gets the specified Replay. Each `Replay` is available for at least 7 days. */
export interface GetFoldersLocationsReplaysRequest {
  /** Required. The name of the Replay to retrieve, in the following format: `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}`, where `{resource-id}` is the ID of the project, folder, or organization that owns the `Replay`. Example: `projects/my-example-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36` */
  name: string;
}

export const GetFoldersLocationsReplaysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations/{locationsId}/replays/{replaysId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsReplaysRequest>;

export type GetFoldersLocationsReplaysResponse = GoogleCloudPolicysimulatorV1Replay;
export const GetFoldersLocationsReplaysResponse = GoogleCloudPolicysimulatorV1Replay;

export type GetFoldersLocationsReplaysError = CommonErrors;

export const getFoldersLocationsReplays: API.OperationMethod<GetFoldersLocationsReplaysRequest, GetFoldersLocationsReplaysResponse, GetFoldersLocationsReplaysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsReplaysRequest,
  output: GetFoldersLocationsReplaysResponse,
  errors: [],
}));

/** Creates and starts a Replay using the given ReplayConfig. */
export interface CreateFoldersLocationsReplaysRequest {
  /** Required. The parent resource where this Replay will be created. This resource must be a project, folder, or organization with a location. Example: `projects/my-example-project/locations/global` */
  parent: string;
  /** Request body */
  body?: GoogleCloudPolicysimulatorV1Replay;
}

export const CreateFoldersLocationsReplaysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudPolicysimulatorV1Replay).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/locations/{locationsId}/replays", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersLocationsReplaysRequest>;

export type CreateFoldersLocationsReplaysResponse = GoogleLongrunningOperation;
export const CreateFoldersLocationsReplaysResponse = GoogleLongrunningOperation;

export type CreateFoldersLocationsReplaysError = CommonErrors;

export const createFoldersLocationsReplays: API.OperationMethod<CreateFoldersLocationsReplaysRequest, CreateFoldersLocationsReplaysResponse, CreateFoldersLocationsReplaysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersLocationsReplaysRequest,
  output: CreateFoldersLocationsReplaysResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListFoldersLocationsReplaysOperationsRequest {
  /** The standard list filter. */
  filter?: string;
  /** The standard list page token. */
  pageToken?: string;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page size. */
  pageSize?: number;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListFoldersLocationsReplaysOperationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations/{locationsId}/replays/{replaysId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsReplaysOperationsRequest>;

export type ListFoldersLocationsReplaysOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListFoldersLocationsReplaysOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListFoldersLocationsReplaysOperationsError = CommonErrors;

export const listFoldersLocationsReplaysOperations = API.makePaginated(() => ({
  input: ListFoldersLocationsReplaysOperationsRequest,
  output: ListFoldersLocationsReplaysOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetFoldersLocationsReplaysOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetFoldersLocationsReplaysOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations/{locationsId}/replays/{replaysId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsReplaysOperationsRequest>;

export type GetFoldersLocationsReplaysOperationsResponse = GoogleLongrunningOperation;
export const GetFoldersLocationsReplaysOperationsResponse = GoogleLongrunningOperation;

export type GetFoldersLocationsReplaysOperationsError = CommonErrors;

export const getFoldersLocationsReplaysOperations: API.OperationMethod<GetFoldersLocationsReplaysOperationsRequest, GetFoldersLocationsReplaysOperationsResponse, GetFoldersLocationsReplaysOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsReplaysOperationsRequest,
  output: GetFoldersLocationsReplaysOperationsResponse,
  errors: [],
}));

/** Lists the results of running a Replay. */
export interface ListFoldersLocationsReplaysResultsRequest {
  /** Required. The Replay whose results are listed, in the following format: `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}` Example: `projects/my-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36` */
  parent: string;
  /** A page token, received from a previous Simulator.ListReplayResults call. Provide this token to retrieve the next page of results. When paginating, all other parameters provided to [Simulator.ListReplayResults[] must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of ReplayResult objects to return. Defaults to 5000. The maximum value is 5000; values above 5000 are rounded down to 5000. */
  pageSize?: number;
}

export const ListFoldersLocationsReplaysResultsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations/{locationsId}/replays/{replaysId}/results" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsReplaysResultsRequest>;

export type ListFoldersLocationsReplaysResultsResponse = GoogleCloudPolicysimulatorV1ListReplayResultsResponse;
export const ListFoldersLocationsReplaysResultsResponse = GoogleCloudPolicysimulatorV1ListReplayResultsResponse;

export type ListFoldersLocationsReplaysResultsError = CommonErrors;

export const listFoldersLocationsReplaysResults = API.makePaginated(() => ({
  input: ListFoldersLocationsReplaysResultsRequest,
  output: ListFoldersLocationsReplaysResultsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsAccessPolicySimulationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsAccessPolicySimulationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/accessPolicySimulations/{accessPolicySimulationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAccessPolicySimulationsOperationsRequest>;

export type GetProjectsLocationsAccessPolicySimulationsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsAccessPolicySimulationsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsAccessPolicySimulationsOperationsError = CommonErrors;

export const getProjectsLocationsAccessPolicySimulationsOperations: API.OperationMethod<GetProjectsLocationsAccessPolicySimulationsOperationsRequest, GetProjectsLocationsAccessPolicySimulationsOperationsResponse, GetProjectsLocationsAccessPolicySimulationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAccessPolicySimulationsOperationsRequest,
  output: GetProjectsLocationsAccessPolicySimulationsOperationsResponse,
  errors: [],
}));

/** Gets the specified Replay. Each `Replay` is available for at least 7 days. */
export interface GetProjectsLocationsReplaysRequest {
  /** Required. The name of the Replay to retrieve, in the following format: `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}`, where `{resource-id}` is the ID of the project, folder, or organization that owns the `Replay`. Example: `projects/my-example-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36` */
  name: string;
}

export const GetProjectsLocationsReplaysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/replays/{replaysId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsReplaysRequest>;

export type GetProjectsLocationsReplaysResponse = GoogleCloudPolicysimulatorV1Replay;
export const GetProjectsLocationsReplaysResponse = GoogleCloudPolicysimulatorV1Replay;

export type GetProjectsLocationsReplaysError = CommonErrors;

export const getProjectsLocationsReplays: API.OperationMethod<GetProjectsLocationsReplaysRequest, GetProjectsLocationsReplaysResponse, GetProjectsLocationsReplaysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsReplaysRequest,
  output: GetProjectsLocationsReplaysResponse,
  errors: [],
}));

/** Creates and starts a Replay using the given ReplayConfig. */
export interface CreateProjectsLocationsReplaysRequest {
  /** Required. The parent resource where this Replay will be created. This resource must be a project, folder, or organization with a location. Example: `projects/my-example-project/locations/global` */
  parent: string;
  /** Request body */
  body?: GoogleCloudPolicysimulatorV1Replay;
}

export const CreateProjectsLocationsReplaysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudPolicysimulatorV1Replay).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/replays", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsReplaysRequest>;

export type CreateProjectsLocationsReplaysResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsReplaysResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsReplaysError = CommonErrors;

export const createProjectsLocationsReplays: API.OperationMethod<CreateProjectsLocationsReplaysRequest, CreateProjectsLocationsReplaysResponse, CreateProjectsLocationsReplaysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsReplaysRequest,
  output: CreateProjectsLocationsReplaysResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsReplaysOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsReplaysOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/replays/{replaysId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsReplaysOperationsRequest>;

export type GetProjectsLocationsReplaysOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsReplaysOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsReplaysOperationsError = CommonErrors;

export const getProjectsLocationsReplaysOperations: API.OperationMethod<GetProjectsLocationsReplaysOperationsRequest, GetProjectsLocationsReplaysOperationsResponse, GetProjectsLocationsReplaysOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsReplaysOperationsRequest,
  output: GetProjectsLocationsReplaysOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsReplaysOperationsRequest {
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list filter. */
  filter?: string;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page size. */
  pageSize?: number;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsReplaysOperationsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/replays/{replaysId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsReplaysOperationsRequest>;

export type ListProjectsLocationsReplaysOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsLocationsReplaysOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsLocationsReplaysOperationsError = CommonErrors;

export const listProjectsLocationsReplaysOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsReplaysOperationsRequest,
  output: ListProjectsLocationsReplaysOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the results of running a Replay. */
export interface ListProjectsLocationsReplaysResultsRequest {
  /** The maximum number of ReplayResult objects to return. Defaults to 5000. The maximum value is 5000; values above 5000 are rounded down to 5000. */
  pageSize?: number;
  /** A page token, received from a previous Simulator.ListReplayResults call. Provide this token to retrieve the next page of results. When paginating, all other parameters provided to [Simulator.ListReplayResults[] must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The Replay whose results are listed, in the following format: `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}` Example: `projects/my-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36` */
  parent: string;
}

export const ListProjectsLocationsReplaysResultsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/replays/{replaysId}/results" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsReplaysResultsRequest>;

export type ListProjectsLocationsReplaysResultsResponse = GoogleCloudPolicysimulatorV1ListReplayResultsResponse;
export const ListProjectsLocationsReplaysResultsResponse = GoogleCloudPolicysimulatorV1ListReplayResultsResponse;

export type ListProjectsLocationsReplaysResultsError = CommonErrors;

export const listProjectsLocationsReplaysResults = API.makePaginated(() => ({
  input: ListProjectsLocationsReplaysResultsRequest,
  output: ListProjectsLocationsReplaysResultsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/orgPolicyViolationsPreviews/{orgPolicyViolationsPreviewsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsRequest>;

export type GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsError = CommonErrors;

export const getProjectsLocationsOrgPolicyViolationsPreviewsOperations: API.OperationMethod<GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsRequest, GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsResponse, GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsRequest,
  output: GetProjectsLocationsOrgPolicyViolationsPreviewsOperationsResponse,
  errors: [],
}));

/** Gets the specified Replay. Each `Replay` is available for at least 7 days. */
export interface GetOrganizationsLocationsReplaysRequest {
  /** Required. The name of the Replay to retrieve, in the following format: `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}`, where `{resource-id}` is the ID of the project, folder, or organization that owns the `Replay`. Example: `projects/my-example-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36` */
  name: string;
}

export const GetOrganizationsLocationsReplaysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/replays/{replaysId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsReplaysRequest>;

export type GetOrganizationsLocationsReplaysResponse = GoogleCloudPolicysimulatorV1Replay;
export const GetOrganizationsLocationsReplaysResponse = GoogleCloudPolicysimulatorV1Replay;

export type GetOrganizationsLocationsReplaysError = CommonErrors;

export const getOrganizationsLocationsReplays: API.OperationMethod<GetOrganizationsLocationsReplaysRequest, GetOrganizationsLocationsReplaysResponse, GetOrganizationsLocationsReplaysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsReplaysRequest,
  output: GetOrganizationsLocationsReplaysResponse,
  errors: [],
}));

/** Creates and starts a Replay using the given ReplayConfig. */
export interface CreateOrganizationsLocationsReplaysRequest {
  /** Required. The parent resource where this Replay will be created. This resource must be a project, folder, or organization with a location. Example: `projects/my-example-project/locations/global` */
  parent: string;
  /** Request body */
  body?: GoogleCloudPolicysimulatorV1Replay;
}

export const CreateOrganizationsLocationsReplaysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudPolicysimulatorV1Replay).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/replays", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsReplaysRequest>;

export type CreateOrganizationsLocationsReplaysResponse = GoogleLongrunningOperation;
export const CreateOrganizationsLocationsReplaysResponse = GoogleLongrunningOperation;

export type CreateOrganizationsLocationsReplaysError = CommonErrors;

export const createOrganizationsLocationsReplays: API.OperationMethod<CreateOrganizationsLocationsReplaysRequest, CreateOrganizationsLocationsReplaysResponse, CreateOrganizationsLocationsReplaysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsReplaysRequest,
  output: CreateOrganizationsLocationsReplaysResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOrganizationsLocationsReplaysOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOrganizationsLocationsReplaysOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/replays/{replaysId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsReplaysOperationsRequest>;

export type GetOrganizationsLocationsReplaysOperationsResponse = GoogleLongrunningOperation;
export const GetOrganizationsLocationsReplaysOperationsResponse = GoogleLongrunningOperation;

export type GetOrganizationsLocationsReplaysOperationsError = CommonErrors;

export const getOrganizationsLocationsReplaysOperations: API.OperationMethod<GetOrganizationsLocationsReplaysOperationsRequest, GetOrganizationsLocationsReplaysOperationsResponse, GetOrganizationsLocationsReplaysOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsReplaysOperationsRequest,
  output: GetOrganizationsLocationsReplaysOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOrganizationsLocationsReplaysOperationsRequest {
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** The name of the operation's parent resource. */
  name: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListOrganizationsLocationsReplaysOperationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/replays/{replaysId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsReplaysOperationsRequest>;

export type ListOrganizationsLocationsReplaysOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListOrganizationsLocationsReplaysOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListOrganizationsLocationsReplaysOperationsError = CommonErrors;

export const listOrganizationsLocationsReplaysOperations = API.makePaginated(() => ({
  input: ListOrganizationsLocationsReplaysOperationsRequest,
  output: ListOrganizationsLocationsReplaysOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the results of running a Replay. */
export interface ListOrganizationsLocationsReplaysResultsRequest {
  /** The maximum number of ReplayResult objects to return. Defaults to 5000. The maximum value is 5000; values above 5000 are rounded down to 5000. */
  pageSize?: number;
  /** Required. The Replay whose results are listed, in the following format: `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}` Example: `projects/my-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36` */
  parent: string;
  /** A page token, received from a previous Simulator.ListReplayResults call. Provide this token to retrieve the next page of results. When paginating, all other parameters provided to [Simulator.ListReplayResults[] must match the call that provided the page token. */
  pageToken?: string;
}

export const ListOrganizationsLocationsReplaysResultsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/replays/{replaysId}/results" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsReplaysResultsRequest>;

export type ListOrganizationsLocationsReplaysResultsResponse = GoogleCloudPolicysimulatorV1ListReplayResultsResponse;
export const ListOrganizationsLocationsReplaysResultsResponse = GoogleCloudPolicysimulatorV1ListReplayResultsResponse;

export type ListOrganizationsLocationsReplaysResultsError = CommonErrors;

export const listOrganizationsLocationsReplaysResults = API.makePaginated(() => ({
  input: ListOrganizationsLocationsReplaysResultsRequest,
  output: ListOrganizationsLocationsReplaysResultsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOrganizationsLocationsAccessPolicySimulationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOrganizationsLocationsAccessPolicySimulationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/accessPolicySimulations/{accessPolicySimulationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsAccessPolicySimulationsOperationsRequest>;

export type GetOrganizationsLocationsAccessPolicySimulationsOperationsResponse = GoogleLongrunningOperation;
export const GetOrganizationsLocationsAccessPolicySimulationsOperationsResponse = GoogleLongrunningOperation;

export type GetOrganizationsLocationsAccessPolicySimulationsOperationsError = CommonErrors;

export const getOrganizationsLocationsAccessPolicySimulationsOperations: API.OperationMethod<GetOrganizationsLocationsAccessPolicySimulationsOperationsRequest, GetOrganizationsLocationsAccessPolicySimulationsOperationsResponse, GetOrganizationsLocationsAccessPolicySimulationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsAccessPolicySimulationsOperationsRequest,
  output: GetOrganizationsLocationsAccessPolicySimulationsOperationsResponse,
  errors: [],
}));

/** ListOrgPolicyViolationsPreviews lists each OrgPolicyViolationsPreview in an organization. Each OrgPolicyViolationsPreview is available for at least 7 days. */
export interface ListOrganizationsLocationsOrgPolicyViolationsPreviewsRequest {
  /** Required. The parent the violations are scoped to. Format: `organizations/{organization}/locations/{location}` Example: `organizations/my-example-org/locations/global` */
  parent: string;
  /** Optional. The maximum number of items to return. The service may return fewer than this value. If unspecified, at most 5 items will be returned. The maximum value is 10; values above 10 will be coerced to 10. */
  pageSize?: number;
  /** Optional. A page token, received from a previous call. Provide this to retrieve the subsequent page. When paginating, all other parameters must match the call that provided the page token. */
  pageToken?: string;
}

export const ListOrganizationsLocationsOrgPolicyViolationsPreviewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/orgPolicyViolationsPreviews" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsOrgPolicyViolationsPreviewsRequest>;

export type ListOrganizationsLocationsOrgPolicyViolationsPreviewsResponse = GoogleCloudPolicysimulatorV1ListOrgPolicyViolationsPreviewsResponse;
export const ListOrganizationsLocationsOrgPolicyViolationsPreviewsResponse = GoogleCloudPolicysimulatorV1ListOrgPolicyViolationsPreviewsResponse;

export type ListOrganizationsLocationsOrgPolicyViolationsPreviewsError = CommonErrors;

export const listOrganizationsLocationsOrgPolicyViolationsPreviews = API.makePaginated(() => ({
  input: ListOrganizationsLocationsOrgPolicyViolationsPreviewsRequest,
  output: ListOrganizationsLocationsOrgPolicyViolationsPreviewsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** CreateOrgPolicyViolationsPreview creates an OrgPolicyViolationsPreview for the proposed changes in the provided OrgPolicyViolationsPreview.OrgPolicyOverlay. The changes to OrgPolicy are specified by this `OrgPolicyOverlay`. The resources to scan are inferred from these specified changes. */
export interface CreateOrganizationsLocationsOrgPolicyViolationsPreviewsRequest {
  /** Optional. An optional user-specified ID for the OrgPolicyViolationsPreview. If not provided, a random ID will be generated. */
  orgPolicyViolationsPreviewId?: string;
  /** Required. The organization under which this OrgPolicyViolationsPreview will be created. Example: `organizations/my-example-org/locations/global` */
  parent: string;
  /** Request body */
  body?: GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreview;
}

export const CreateOrganizationsLocationsOrgPolicyViolationsPreviewsRequest = Schema.Struct({
  orgPolicyViolationsPreviewId: Schema.optional(Schema.String).pipe(T.HttpQuery("orgPolicyViolationsPreviewId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreview).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/orgPolicyViolationsPreviews", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsOrgPolicyViolationsPreviewsRequest>;

export type CreateOrganizationsLocationsOrgPolicyViolationsPreviewsResponse = GoogleLongrunningOperation;
export const CreateOrganizationsLocationsOrgPolicyViolationsPreviewsResponse = GoogleLongrunningOperation;

export type CreateOrganizationsLocationsOrgPolicyViolationsPreviewsError = CommonErrors;

export const createOrganizationsLocationsOrgPolicyViolationsPreviews: API.OperationMethod<CreateOrganizationsLocationsOrgPolicyViolationsPreviewsRequest, CreateOrganizationsLocationsOrgPolicyViolationsPreviewsResponse, CreateOrganizationsLocationsOrgPolicyViolationsPreviewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsOrgPolicyViolationsPreviewsRequest,
  output: CreateOrganizationsLocationsOrgPolicyViolationsPreviewsResponse,
  errors: [],
}));

/** GetOrgPolicyViolationsPreview gets the specified OrgPolicyViolationsPreview. Each OrgPolicyViolationsPreview is available for at least 7 days. */
export interface GetOrganizationsLocationsOrgPolicyViolationsPreviewsRequest {
  /** Required. The name of the OrgPolicyViolationsPreview to get. */
  name: string;
}

export const GetOrganizationsLocationsOrgPolicyViolationsPreviewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/orgPolicyViolationsPreviews/{orgPolicyViolationsPreviewsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsOrgPolicyViolationsPreviewsRequest>;

export type GetOrganizationsLocationsOrgPolicyViolationsPreviewsResponse = GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreview;
export const GetOrganizationsLocationsOrgPolicyViolationsPreviewsResponse = GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreview;

export type GetOrganizationsLocationsOrgPolicyViolationsPreviewsError = CommonErrors;

export const getOrganizationsLocationsOrgPolicyViolationsPreviews: API.OperationMethod<GetOrganizationsLocationsOrgPolicyViolationsPreviewsRequest, GetOrganizationsLocationsOrgPolicyViolationsPreviewsResponse, GetOrganizationsLocationsOrgPolicyViolationsPreviewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsOrgPolicyViolationsPreviewsRequest,
  output: GetOrganizationsLocationsOrgPolicyViolationsPreviewsResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/orgPolicyViolationsPreviews/{orgPolicyViolationsPreviewsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsRequest>;

export type GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsResponse = GoogleLongrunningOperation;
export const GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsResponse = GoogleLongrunningOperation;

export type GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsError = CommonErrors;

export const getOrganizationsLocationsOrgPolicyViolationsPreviewsOperations: API.OperationMethod<GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsRequest, GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsResponse, GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsRequest,
  output: GetOrganizationsLocationsOrgPolicyViolationsPreviewsOperationsResponse,
  errors: [],
}));

/** ListOrgPolicyViolations lists the OrgPolicyViolations that are present in an OrgPolicyViolationsPreview. */
export interface ListOrganizationsLocationsOrgPolicyViolationsPreviewsOrgPolicyViolationsRequest {
  /** Required. The OrgPolicyViolationsPreview to get OrgPolicyViolations from. Format: organizations/{organization}/locations/{location}/orgPolicyViolationsPreviews/{orgPolicyViolationsPreview} */
  parent: string;
  /** Optional. The maximum number of items to return. The service may return fewer than this value. If unspecified, at most 1000 items will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous call. Provide this to retrieve the subsequent page. When paginating, all other parameters must match the call that provided the page token. */
  pageToken?: string;
}

export const ListOrganizationsLocationsOrgPolicyViolationsPreviewsOrgPolicyViolationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/orgPolicyViolationsPreviews/{orgPolicyViolationsPreviewsId}/orgPolicyViolations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsOrgPolicyViolationsPreviewsOrgPolicyViolationsRequest>;

export type ListOrganizationsLocationsOrgPolicyViolationsPreviewsOrgPolicyViolationsResponse = GoogleCloudPolicysimulatorV1ListOrgPolicyViolationsResponse;
export const ListOrganizationsLocationsOrgPolicyViolationsPreviewsOrgPolicyViolationsResponse = GoogleCloudPolicysimulatorV1ListOrgPolicyViolationsResponse;

export type ListOrganizationsLocationsOrgPolicyViolationsPreviewsOrgPolicyViolationsError = CommonErrors;

export const listOrganizationsLocationsOrgPolicyViolationsPreviewsOrgPolicyViolations = API.makePaginated(() => ({
  input: ListOrganizationsLocationsOrgPolicyViolationsPreviewsOrgPolicyViolationsRequest,
  output: ListOrganizationsLocationsOrgPolicyViolationsPreviewsOrgPolicyViolationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

