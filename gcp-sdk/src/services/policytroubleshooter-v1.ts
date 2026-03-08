// ==========================================================================
// Policy Troubleshooter API (policytroubleshooter v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "policytroubleshooter",
  version: "v1",
  rootUrl: "https://policytroubleshooter.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudPolicytroubleshooterV1AccessTuple {
  /** Required. The principal whose access you want to check, in the form of the email address that represents that principal. For example, `alice@example.com` or `my-service-account@my-project.iam.gserviceaccount.com`. The principal must be a Google Account or a service account. Other types of principals are not supported. */
  principal?: string;
  /** Required. The full resource name that identifies the resource. For example, `//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance`. For examples of full resource names for Google Cloud services, see https://cloud.google.com/iam/help/troubleshooter/full-resource-names. */
  fullResourceName?: string;
  /** Required. The IAM permission to check for the specified principal and resource. For a complete list of IAM permissions, see https://cloud.google.com/iam/help/permissions/reference. For a complete list of predefined IAM roles and the permissions in each role, see https://cloud.google.com/iam/help/roles/reference. */
  permission?: string;
}

export const GoogleCloudPolicytroubleshooterV1AccessTuple: Schema.Schema<GoogleCloudPolicytroubleshooterV1AccessTuple> =
  Schema.suspend(() =>
    Schema.Struct({
      principal: Schema.optional(Schema.String),
      fullResourceName: Schema.optional(Schema.String),
      permission: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudPolicytroubleshooterV1AccessTuple",
  }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterV1AccessTuple>;

export interface GoogleCloudPolicytroubleshooterV1TroubleshootIamPolicyRequest {
  /** The information to use for checking whether a principal has a permission for a resource. */
  accessTuple?: GoogleCloudPolicytroubleshooterV1AccessTuple;
}

export const GoogleCloudPolicytroubleshooterV1TroubleshootIamPolicyRequest: Schema.Schema<GoogleCloudPolicytroubleshooterV1TroubleshootIamPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      accessTuple: Schema.optional(
        GoogleCloudPolicytroubleshooterV1AccessTuple,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudPolicytroubleshooterV1TroubleshootIamPolicyRequest",
  }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterV1TroubleshootIamPolicyRequest>;

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

export const GoogleTypeExpr: Schema.Schema<GoogleTypeExpr> = Schema.suspend(
  () =>
    Schema.Struct({
      expression: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "GoogleTypeExpr",
}) as any as Schema.Schema<GoogleTypeExpr>;

export interface GoogleIamV1Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: GoogleTypeExpr;
}

export const GoogleIamV1Binding: Schema.Schema<GoogleIamV1Binding> =
  Schema.suspend(() =>
    Schema.Struct({
      role: Schema.optional(Schema.String),
      members: Schema.optional(Schema.Array(Schema.String)),
      condition: Schema.optional(GoogleTypeExpr),
    }),
  ).annotate({
    identifier: "GoogleIamV1Binding",
  }) as any as Schema.Schema<GoogleIamV1Binding>;

export interface GoogleIamV1AuditLogConfig {
  /** The log type that this config enables. */
  logType?:
    | "LOG_TYPE_UNSPECIFIED"
    | "ADMIN_READ"
    | "DATA_WRITE"
    | "DATA_READ"
    | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const GoogleIamV1AuditLogConfig: Schema.Schema<GoogleIamV1AuditLogConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      logType: Schema.optional(Schema.String),
      exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleIamV1AuditLogConfig",
  }) as any as Schema.Schema<GoogleIamV1AuditLogConfig>;

export interface GoogleIamV1AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<GoogleIamV1AuditLogConfig>;
}

export const GoogleIamV1AuditConfig: Schema.Schema<GoogleIamV1AuditConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      service: Schema.optional(Schema.String),
      auditLogConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditLogConfig)),
    }),
  ).annotate({
    identifier: "GoogleIamV1AuditConfig",
  }) as any as Schema.Schema<GoogleIamV1AuditConfig>;

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

export const GoogleIamV1Policy: Schema.Schema<GoogleIamV1Policy> =
  Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.Number),
      bindings: Schema.optional(Schema.Array(GoogleIamV1Binding)),
      auditConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditConfig)),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleIamV1Policy",
  }) as any as Schema.Schema<GoogleIamV1Policy>;

export interface GoogleCloudPolicytroubleshooterV1BindingExplanationAnnotatedMembership {
  /** Indicates whether the binding includes the principal. */
  membership?:
    | "MEMBERSHIP_UNSPECIFIED"
    | "MEMBERSHIP_INCLUDED"
    | "MEMBERSHIP_NOT_INCLUDED"
    | "MEMBERSHIP_UNKNOWN_INFO_DENIED"
    | "MEMBERSHIP_UNKNOWN_UNSUPPORTED"
    | (string & {});
  /** The relevance of the principal's status to the overall determination for the binding. */
  relevance?:
    | "HEURISTIC_RELEVANCE_UNSPECIFIED"
    | "NORMAL"
    | "HIGH"
    | (string & {});
}

export const GoogleCloudPolicytroubleshooterV1BindingExplanationAnnotatedMembership: Schema.Schema<GoogleCloudPolicytroubleshooterV1BindingExplanationAnnotatedMembership> =
  Schema.suspend(() =>
    Schema.Struct({
      membership: Schema.optional(Schema.String),
      relevance: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudPolicytroubleshooterV1BindingExplanationAnnotatedMembership",
  }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterV1BindingExplanationAnnotatedMembership>;

export interface GoogleCloudPolicytroubleshooterV1BindingExplanation {
  /** Required. Indicates whether _this binding_ provides the specified permission to the specified principal for the specified resource. This field does _not_ indicate whether the principal actually has the permission for the resource. There might be another binding that overrides this binding. To determine whether the principal actually has the permission, use the `access` field in the TroubleshootIamPolicyResponse. */
  access?:
    | "ACCESS_STATE_UNSPECIFIED"
    | "GRANTED"
    | "NOT_GRANTED"
    | "UNKNOWN_CONDITIONAL"
    | "UNKNOWN_INFO_DENIED"
    | (string & {});
  /** The role that this binding grants. For example, `roles/compute.serviceAgent`. For a complete list of predefined IAM roles, as well as the permissions in each role, see https://cloud.google.com/iam/help/roles/reference. */
  role?: string;
  /** Indicates whether the role granted by this binding contains the specified permission. */
  rolePermission?:
    | "ROLE_PERMISSION_UNSPECIFIED"
    | "ROLE_PERMISSION_INCLUDED"
    | "ROLE_PERMISSION_NOT_INCLUDED"
    | "ROLE_PERMISSION_UNKNOWN_INFO_DENIED"
    | (string & {});
  /** The relevance of the permission's existence, or nonexistence, in the role to the overall determination for the entire policy. */
  rolePermissionRelevance?:
    | "HEURISTIC_RELEVANCE_UNSPECIFIED"
    | "NORMAL"
    | "HIGH"
    | (string & {});
  /** Indicates whether each principal in the binding includes the principal specified in the request, either directly or indirectly. Each key identifies a principal in the binding, and each value indicates whether the principal in the binding includes the principal in the request. For example, suppose that a binding includes the following principals: * `user:alice@example.com` * `group:product-eng@example.com` You want to troubleshoot access for `user:bob@example.com`. This user is a principal of the group `group:product-eng@example.com`. For the first principal in the binding, the key is `user:alice@example.com`, and the `membership` field in the value is set to `MEMBERSHIP_NOT_INCLUDED`. For the second principal in the binding, the key is `group:product-eng@example.com`, and the `membership` field in the value is set to `MEMBERSHIP_INCLUDED`. */
  memberships?: Record<
    string,
    GoogleCloudPolicytroubleshooterV1BindingExplanationAnnotatedMembership
  >;
  /** The relevance of this binding to the overall determination for the entire policy. */
  relevance?:
    | "HEURISTIC_RELEVANCE_UNSPECIFIED"
    | "NORMAL"
    | "HIGH"
    | (string & {});
  /** A condition expression that prevents this binding from granting access unless the expression evaluates to `true`. To learn about IAM Conditions, see https://cloud.google.com/iam/help/conditions/overview. */
  condition?: GoogleTypeExpr;
}

export const GoogleCloudPolicytroubleshooterV1BindingExplanation: Schema.Schema<GoogleCloudPolicytroubleshooterV1BindingExplanation> =
  Schema.suspend(() =>
    Schema.Struct({
      access: Schema.optional(Schema.String),
      role: Schema.optional(Schema.String),
      rolePermission: Schema.optional(Schema.String),
      rolePermissionRelevance: Schema.optional(Schema.String),
      memberships: Schema.optional(
        Schema.Record(
          Schema.String,
          GoogleCloudPolicytroubleshooterV1BindingExplanationAnnotatedMembership,
        ),
      ),
      relevance: Schema.optional(Schema.String),
      condition: Schema.optional(GoogleTypeExpr),
    }),
  ).annotate({
    identifier: "GoogleCloudPolicytroubleshooterV1BindingExplanation",
  }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterV1BindingExplanation>;

export interface GoogleCloudPolicytroubleshooterV1ExplainedPolicy {
  /** Indicates whether _this policy_ provides the specified permission to the specified principal for the specified resource. This field does _not_ indicate whether the principal actually has the permission for the resource. There might be another policy that overrides this policy. To determine whether the principal actually has the permission, use the `access` field in the TroubleshootIamPolicyResponse. */
  access?:
    | "ACCESS_STATE_UNSPECIFIED"
    | "GRANTED"
    | "NOT_GRANTED"
    | "UNKNOWN_CONDITIONAL"
    | "UNKNOWN_INFO_DENIED"
    | (string & {});
  /** The full resource name that identifies the resource. For example, `//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance`. If the sender of the request does not have access to the policy, this field is omitted. For examples of full resource names for Google Cloud services, see https://cloud.google.com/iam/help/troubleshooter/full-resource-names. */
  fullResourceName?: string;
  /** The IAM policy attached to the resource. If the sender of the request does not have access to the policy, this field is empty. */
  policy?: GoogleIamV1Policy;
  /** Details about how each binding in the policy affects the principal's ability, or inability, to use the permission for the resource. If the sender of the request does not have access to the policy, this field is omitted. */
  bindingExplanations?: Array<GoogleCloudPolicytroubleshooterV1BindingExplanation>;
  /** The relevance of this policy to the overall determination in the TroubleshootIamPolicyResponse. If the sender of the request does not have access to the policy, this field is omitted. */
  relevance?:
    | "HEURISTIC_RELEVANCE_UNSPECIFIED"
    | "NORMAL"
    | "HIGH"
    | (string & {});
}

export const GoogleCloudPolicytroubleshooterV1ExplainedPolicy: Schema.Schema<GoogleCloudPolicytroubleshooterV1ExplainedPolicy> =
  Schema.suspend(() =>
    Schema.Struct({
      access: Schema.optional(Schema.String),
      fullResourceName: Schema.optional(Schema.String),
      policy: Schema.optional(GoogleIamV1Policy),
      bindingExplanations: Schema.optional(
        Schema.Array(GoogleCloudPolicytroubleshooterV1BindingExplanation),
      ),
      relevance: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudPolicytroubleshooterV1ExplainedPolicy",
  }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterV1ExplainedPolicy>;

export interface GoogleRpcStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(
  () =>
    Schema.Struct({
      code: Schema.optional(Schema.Number),
      message: Schema.optional(Schema.String),
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
    }),
).annotate({
  identifier: "GoogleRpcStatus",
}) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleCloudPolicytroubleshooterV1TroubleshootIamPolicyResponse {
  /** Indicates whether the principal has the specified permission for the specified resource, based on evaluating all of the applicable IAM policies. */
  access?:
    | "ACCESS_STATE_UNSPECIFIED"
    | "GRANTED"
    | "NOT_GRANTED"
    | "UNKNOWN_CONDITIONAL"
    | "UNKNOWN_INFO_DENIED"
    | (string & {});
  /** List of IAM policies that were evaluated to check the principal's permissions, with annotations to indicate how each policy contributed to the final result. The list of policies can include the policy for the resource itself. It can also include policies that are inherited from higher levels of the resource hierarchy, including the organization, the folder, and the project. To learn more about the resource hierarchy, see https://cloud.google.com/iam/help/resource-hierarchy. */
  explainedPolicies?: Array<GoogleCloudPolicytroubleshooterV1ExplainedPolicy>;
  /** The general errors contained in the troubleshooting response. */
  errors?: Array<GoogleRpcStatus>;
}

export const GoogleCloudPolicytroubleshooterV1TroubleshootIamPolicyResponse: Schema.Schema<GoogleCloudPolicytroubleshooterV1TroubleshootIamPolicyResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      access: Schema.optional(Schema.String),
      explainedPolicies: Schema.optional(
        Schema.Array(GoogleCloudPolicytroubleshooterV1ExplainedPolicy),
      ),
      errors: Schema.optional(Schema.Array(GoogleRpcStatus)),
    }),
  ).annotate({
    identifier:
      "GoogleCloudPolicytroubleshooterV1TroubleshootIamPolicyResponse",
  }) as any as Schema.Schema<GoogleCloudPolicytroubleshooterV1TroubleshootIamPolicyResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface TroubleshootIamRequest {
  /** Request body */
  body?: GoogleCloudPolicytroubleshooterV1TroubleshootIamPolicyRequest;
}

export const TroubleshootIamRequest = Schema.Struct({
  body: Schema.optional(
    GoogleCloudPolicytroubleshooterV1TroubleshootIamPolicyRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/iam:troubleshoot", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TroubleshootIamRequest>;

export type TroubleshootIamResponse =
  GoogleCloudPolicytroubleshooterV1TroubleshootIamPolicyResponse;
export const TroubleshootIamResponse =
  GoogleCloudPolicytroubleshooterV1TroubleshootIamPolicyResponse;

export type TroubleshootIamError = DefaultErrors;

/** Checks whether a principal has a specific permission for a specific resource, and explains why the principal does or does not have that permission. */
export const troubleshootIam: API.OperationMethod<
  TroubleshootIamRequest,
  TroubleshootIamResponse,
  TroubleshootIamError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TroubleshootIamRequest,
  output: TroubleshootIamResponse,
  errors: [],
}));
