// ==========================================================================
// Organization Policy API (orgpolicy v2)
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
  name: "orgpolicy",
  version: "v2",
  rootUrl: "https://orgpolicy.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudOrgpolicyV2ConstraintListConstraint {
  /** Indicates whether values grouped into categories can be used in `Policy.allowed_values` and `Policy.denied_values`. For example, `"in:Python"` would match any value in the 'Python' group. */
  supportsIn?: boolean;
  /** Indicates whether subtrees of the Resource Manager resource hierarchy can be used in `Policy.allowed_values` and `Policy.denied_values`. For example, `"under:folders/123"` would match any resource under the 'folders/123' folder. */
  supportsUnder?: boolean;
}

export const GoogleCloudOrgpolicyV2ConstraintListConstraint: Schema.Schema<GoogleCloudOrgpolicyV2ConstraintListConstraint> = Schema.suspend(() => Schema.Struct({
  supportsIn: Schema.optional(Schema.Boolean),
  supportsUnder: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2ConstraintListConstraint" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2ConstraintListConstraint>;

export interface GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameterMetadata {
  /** Detailed description of what this `parameter` is and use of it. Mutable. */
  description?: string;
}

export const GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameterMetadata: Schema.Schema<GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameterMetadata> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameterMetadata" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameterMetadata>;

export interface GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameter {
  /** Type of the parameter. */
  type?: "TYPE_UNSPECIFIED" | "LIST" | "STRING" | "BOOLEAN" | (string & {});
  /** Sets the value of the parameter in an assignment if no value is given. */
  defaultValue?: unknown;
  /** Provides a CEL expression to specify the acceptable parameter values during assignment. For example, parameterName in ("parameterValue1", "parameterValue2") */
  validValuesExpr?: string;
  /** Defines subproperties primarily used by the UI to display user-friendly information. */
  metadata?: GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameterMetadata;
  /** Determines the parameter's value structure. For example, `LIST` can be specified by defining `type: LIST`, and `item: STRING`. */
  item?: "TYPE_UNSPECIFIED" | "LIST" | "STRING" | "BOOLEAN" | (string & {});
}

export const GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameter: Schema.Schema<GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameter> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  defaultValue: Schema.optional(Schema.Unknown),
  validValuesExpr: Schema.optional(Schema.String),
  metadata: Schema.optional(GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameterMetadata),
  item: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameter" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameter>;

export interface GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinition {
  /** The resource instance type on which this policy applies. Format will be of the form : `/` Example: * `compute.googleapis.com/Instance`. */
  resourceTypes?: Array<string>;
  /** All the operations being applied for this constraint. */
  methodTypes?: Array<"METHOD_TYPE_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | "REMOVE_GRANT" | "GOVERN_TAGS" | (string & {})>;
  /** Org policy condition/expression. For example: `resource.instanceName.matches("(production|test)_(.+_)?[\d]+")` or, `resource.management.auto_upgrade == true` The max length of the condition is 1000 characters. */
  condition?: string;
  /** Allow or deny type. */
  actionType?: "ACTION_TYPE_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  /** Stores the structure of `Parameters` used by the constraint condition. The key of `map` represents the name of the parameter. */
  parameters?: Record<string, GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameter>;
}

export const GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinition: Schema.Schema<GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinition> = Schema.suspend(() => Schema.Struct({
  resourceTypes: Schema.optional(Schema.Array(Schema.String)),
  methodTypes: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Schema.String),
  actionType: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameter)),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinition" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinition>;

export interface GoogleCloudOrgpolicyV2ConstraintBooleanConstraint {
  /** Custom constraint definition. Defines this as a managed constraint. */
  customConstraintDefinition?: GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinition;
}

export const GoogleCloudOrgpolicyV2ConstraintBooleanConstraint: Schema.Schema<GoogleCloudOrgpolicyV2ConstraintBooleanConstraint> = Schema.suspend(() => Schema.Struct({
  customConstraintDefinition: Schema.optional(GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinition),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2ConstraintBooleanConstraint" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2ConstraintBooleanConstraint>;

export interface GoogleCloudOrgpolicyV2Constraint {
  /** Immutable. The resource name of the constraint. Must be in one of the following forms: * `projects/{project_number}/constraints/{constraint_name}` * `folders/{folder_id}/constraints/{constraint_name}` * `organizations/{organization_id}/constraints/{constraint_name}` For example, "/projects/123/constraints/compute.disableSerialPortAccess". */
  name?: string;
  /** The human readable name. Mutable. */
  displayName?: string;
  /** Detailed description of what this constraint controls as well as how and where it is enforced. Mutable. */
  description?: string;
  /** The evaluation behavior of this constraint in the absence of a policy. */
  constraintDefault?: "CONSTRAINT_DEFAULT_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  /** Defines this constraint as being a list constraint. */
  listConstraint?: GoogleCloudOrgpolicyV2ConstraintListConstraint;
  /** Defines this constraint as being a boolean constraint. */
  booleanConstraint?: GoogleCloudOrgpolicyV2ConstraintBooleanConstraint;
  /** Shows if dry run is supported for this constraint or not. */
  supportsDryRun?: boolean;
  /** Managed constraint and canned constraint sometimes can have equivalents. This field is used to store the equivalent constraint name. */
  equivalentConstraint?: string;
  /** Shows if simulation is supported for this constraint or not. */
  supportsSimulation?: boolean;
}

export const GoogleCloudOrgpolicyV2Constraint: Schema.Schema<GoogleCloudOrgpolicyV2Constraint> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  constraintDefault: Schema.optional(Schema.String),
  listConstraint: Schema.optional(GoogleCloudOrgpolicyV2ConstraintListConstraint),
  booleanConstraint: Schema.optional(GoogleCloudOrgpolicyV2ConstraintBooleanConstraint),
  supportsDryRun: Schema.optional(Schema.Boolean),
  equivalentConstraint: Schema.optional(Schema.String),
  supportsSimulation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2Constraint" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2Constraint>;

export interface GoogleCloudOrgpolicyV2ListConstraintsResponse {
  /** The collection of constraints that are available on the targeted resource. */
  constraints?: Array<GoogleCloudOrgpolicyV2Constraint>;
  /** Page token used to retrieve the next page. This is currently not used. */
  nextPageToken?: string;
}

export const GoogleCloudOrgpolicyV2ListConstraintsResponse: Schema.Schema<GoogleCloudOrgpolicyV2ListConstraintsResponse> = Schema.suspend(() => Schema.Struct({
  constraints: Schema.optional(Schema.Array(GoogleCloudOrgpolicyV2Constraint)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2ListConstraintsResponse" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2ListConstraintsResponse>;

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

export interface GoogleCloudOrgpolicyV2ListPoliciesResponse {
  /** All policies that exist on the resource. It will be empty if no policies are set. */
  policies?: Array<GoogleCloudOrgpolicyV2Policy>;
  /** Page token used to retrieve the next page. This is currently not used, but the server may at any point start supplying a valid token. */
  nextPageToken?: string;
}

export const GoogleCloudOrgpolicyV2ListPoliciesResponse: Schema.Schema<GoogleCloudOrgpolicyV2ListPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  policies: Schema.optional(Schema.Array(GoogleCloudOrgpolicyV2Policy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2ListPoliciesResponse" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2ListPoliciesResponse>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleCloudOrgpolicyV2CustomConstraint {
  /** Immutable. Name of the constraint. This is unique within the organization. Format of the name should be * `organizations/{organization_id}/customConstraints/{custom_constraint_id}` Example: `organizations/123/customConstraints/custom.createOnlyE2TypeVms` The max length is 70 characters and the minimum length is 1. Note that the prefix `organizations/{organization_id}/customConstraints/` is not counted. */
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

export interface GoogleCloudOrgpolicyV2ListCustomConstraintsResponse {
  /** All custom and managed constraints that exist on the organization resource. It will be empty if no custom constraints are set. */
  customConstraints?: Array<GoogleCloudOrgpolicyV2CustomConstraint>;
  /** Page token used to retrieve the next page. This is currently not used, but the server may at any point start supplying a valid token. */
  nextPageToken?: string;
}

export const GoogleCloudOrgpolicyV2ListCustomConstraintsResponse: Schema.Schema<GoogleCloudOrgpolicyV2ListCustomConstraintsResponse> = Schema.suspend(() => Schema.Struct({
  customConstraints: Schema.optional(Schema.Array(GoogleCloudOrgpolicyV2CustomConstraint)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOrgpolicyV2ListCustomConstraintsResponse" }) as any as Schema.Schema<GoogleCloudOrgpolicyV2ListCustomConstraintsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists constraints that could be applied on the specified resource. */
export interface ListProjectsConstraintsRequest {
  /** Required. The Google Cloud resource that parents the constraint. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}` */
  parent: string;
  /** Size of the pages to be returned. This is currently unsupported and will be ignored. The server may at any point start using this field to limit page size. */
  pageSize?: number;
  /** Page token used to retrieve the next page. This is currently unsupported and will be ignored. The server may at any point start using this field. */
  pageToken?: string;
}

export const ListProjectsConstraintsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/constraints" }),
  svc,
) as unknown as Schema.Schema<ListProjectsConstraintsRequest>;

export type ListProjectsConstraintsResponse = GoogleCloudOrgpolicyV2ListConstraintsResponse;
export const ListProjectsConstraintsResponse = GoogleCloudOrgpolicyV2ListConstraintsResponse;

export type ListProjectsConstraintsError = CommonErrors;

export const listProjectsConstraints = API.makePaginated(() => ({
  input: ListProjectsConstraintsRequest,
  output: ListProjectsConstraintsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves all of the policies that exist on a particular resource. */
export interface ListProjectsPoliciesRequest {
  /** Required. The target Google Cloud resource that parents the set of constraints and policies that will be returned from this call. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}` */
  parent: string;
  /** Size of the pages to be returned. This is currently unsupported and will be ignored. The server may at any point start using this field to limit page size. */
  pageSize?: number;
  /** Page token used to retrieve the next page. This is currently unsupported and will be ignored. The server may at any point start using this field. */
  pageToken?: string;
}

export const ListProjectsPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/policies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsPoliciesRequest>;

export type ListProjectsPoliciesResponse = GoogleCloudOrgpolicyV2ListPoliciesResponse;
export const ListProjectsPoliciesResponse = GoogleCloudOrgpolicyV2ListPoliciesResponse;

export type ListProjectsPoliciesError = CommonErrors;

export const listProjectsPolicies = API.makePaginated(() => ({
  input: ListProjectsPoliciesRequest,
  output: ListProjectsPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a policy on a resource. If no policy is set on the resource, `NOT_FOUND` is returned. The `etag` value can be used with `UpdatePolicy()` to update a policy during read-modify-write. */
export interface GetProjectsPoliciesRequest {
  /** Required. Resource name of the policy. See Policy for naming requirements. */
  name: string;
}

export const GetProjectsPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/policies/{policiesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsPoliciesRequest>;

export type GetProjectsPoliciesResponse = GoogleCloudOrgpolicyV2Policy;
export const GetProjectsPoliciesResponse = GoogleCloudOrgpolicyV2Policy;

export type GetProjectsPoliciesError = CommonErrors;

export const getProjectsPolicies: API.OperationMethod<GetProjectsPoliciesRequest, GetProjectsPoliciesResponse, GetProjectsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsPoliciesRequest,
  output: GetProjectsPoliciesResponse,
  errors: [],
}));

/** Gets the effective policy on a resource. This is the result of merging policies in the resource hierarchy and evaluating conditions. The returned policy will not have an `etag` or `condition` set because it is an evaluated policy across multiple resources. Subtrees of Resource Manager resource hierarchy with 'under:' prefix will not be expanded. */
export interface GetEffectivePolicyProjectsPoliciesRequest {
  /** Required. The effective policy to compute. See Policy for naming requirements. */
  name: string;
}

export const GetEffectivePolicyProjectsPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/policies/{policiesId}:getEffectivePolicy" }),
  svc,
) as unknown as Schema.Schema<GetEffectivePolicyProjectsPoliciesRequest>;

export type GetEffectivePolicyProjectsPoliciesResponse = GoogleCloudOrgpolicyV2Policy;
export const GetEffectivePolicyProjectsPoliciesResponse = GoogleCloudOrgpolicyV2Policy;

export type GetEffectivePolicyProjectsPoliciesError = CommonErrors;

export const getEffectivePolicyProjectsPolicies: API.OperationMethod<GetEffectivePolicyProjectsPoliciesRequest, GetEffectivePolicyProjectsPoliciesResponse, GetEffectivePolicyProjectsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEffectivePolicyProjectsPoliciesRequest,
  output: GetEffectivePolicyProjectsPoliciesResponse,
  errors: [],
}));

/** Creates a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint does not exist. Returns a `google.rpc.Status` with `google.rpc.Code.ALREADY_EXISTS` if the policy already exists on the given Google Cloud resource. */
export interface CreateProjectsPoliciesRequest {
  /** Required. The Google Cloud resource that will parent the new policy. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}` */
  parent: string;
  /** Request body */
  body?: GoogleCloudOrgpolicyV2Policy;
}

export const CreateProjectsPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudOrgpolicyV2Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/policies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsPoliciesRequest>;

export type CreateProjectsPoliciesResponse = GoogleCloudOrgpolicyV2Policy;
export const CreateProjectsPoliciesResponse = GoogleCloudOrgpolicyV2Policy;

export type CreateProjectsPoliciesError = CommonErrors;

export const createProjectsPolicies: API.OperationMethod<CreateProjectsPoliciesRequest, CreateProjectsPoliciesResponse, CreateProjectsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsPoliciesRequest,
  output: CreateProjectsPoliciesResponse,
  errors: [],
}));

/** Updates a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint or the policy do not exist. Returns a `google.rpc.Status` with `google.rpc.Code.ABORTED` if the etag supplied in the request does not match the persisted etag of the policy Note: the supplied policy will perform a full overwrite of all fields. */
export interface PatchProjectsPoliciesRequest {
  /** Immutable. The resource name of the policy. Must be one of the following forms, where `constraint_name` is the name of the constraint which this policy configures: * `projects/{project_number}/policies/{constraint_name}` * `folders/{folder_id}/policies/{constraint_name}` * `organizations/{organization_id}/policies/{constraint_name}` For example, `projects/123/policies/compute.disableSerialPortAccess`. Note: `projects/{project_id}/policies/{constraint_name}` is also an acceptable name for API requests, but responses will return the name using the equivalent project number. */
  name: string;
  /** Field mask used to specify the fields to be overwritten in the policy by the set. The fields specified in the update_mask are relative to the policy, not the full request. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudOrgpolicyV2Policy;
}

export const PatchProjectsPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudOrgpolicyV2Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/policies/{policiesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsPoliciesRequest>;

export type PatchProjectsPoliciesResponse = GoogleCloudOrgpolicyV2Policy;
export const PatchProjectsPoliciesResponse = GoogleCloudOrgpolicyV2Policy;

export type PatchProjectsPoliciesError = CommonErrors;

export const patchProjectsPolicies: API.OperationMethod<PatchProjectsPoliciesRequest, PatchProjectsPoliciesResponse, PatchProjectsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsPoliciesRequest,
  output: PatchProjectsPoliciesResponse,
  errors: [],
}));

/** Deletes a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint or organization policy does not exist. */
export interface DeleteProjectsPoliciesRequest {
  /** Required. Name of the policy to delete. See the policy entry for naming rules. */
  name: string;
  /** Optional. The current etag of policy. If an etag is provided and does not match the current etag of the policy, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const DeleteProjectsPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/policies/{policiesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsPoliciesRequest>;

export type DeleteProjectsPoliciesResponse = GoogleProtobufEmpty;
export const DeleteProjectsPoliciesResponse = GoogleProtobufEmpty;

export type DeleteProjectsPoliciesError = CommonErrors;

export const deleteProjectsPolicies: API.OperationMethod<DeleteProjectsPoliciesRequest, DeleteProjectsPoliciesResponse, DeleteProjectsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsPoliciesRequest,
  output: DeleteProjectsPoliciesResponse,
  errors: [],
}));

/** Lists constraints that could be applied on the specified resource. */
export interface ListFoldersConstraintsRequest {
  /** Required. The Google Cloud resource that parents the constraint. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}` */
  parent: string;
  /** Size of the pages to be returned. This is currently unsupported and will be ignored. The server may at any point start using this field to limit page size. */
  pageSize?: number;
  /** Page token used to retrieve the next page. This is currently unsupported and will be ignored. The server may at any point start using this field. */
  pageToken?: string;
}

export const ListFoldersConstraintsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/constraints" }),
  svc,
) as unknown as Schema.Schema<ListFoldersConstraintsRequest>;

export type ListFoldersConstraintsResponse = GoogleCloudOrgpolicyV2ListConstraintsResponse;
export const ListFoldersConstraintsResponse = GoogleCloudOrgpolicyV2ListConstraintsResponse;

export type ListFoldersConstraintsError = CommonErrors;

export const listFoldersConstraints = API.makePaginated(() => ({
  input: ListFoldersConstraintsRequest,
  output: ListFoldersConstraintsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves all of the policies that exist on a particular resource. */
export interface ListFoldersPoliciesRequest {
  /** Required. The target Google Cloud resource that parents the set of constraints and policies that will be returned from this call. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}` */
  parent: string;
  /** Size of the pages to be returned. This is currently unsupported and will be ignored. The server may at any point start using this field to limit page size. */
  pageSize?: number;
  /** Page token used to retrieve the next page. This is currently unsupported and will be ignored. The server may at any point start using this field. */
  pageToken?: string;
}

export const ListFoldersPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/policies" }),
  svc,
) as unknown as Schema.Schema<ListFoldersPoliciesRequest>;

export type ListFoldersPoliciesResponse = GoogleCloudOrgpolicyV2ListPoliciesResponse;
export const ListFoldersPoliciesResponse = GoogleCloudOrgpolicyV2ListPoliciesResponse;

export type ListFoldersPoliciesError = CommonErrors;

export const listFoldersPolicies = API.makePaginated(() => ({
  input: ListFoldersPoliciesRequest,
  output: ListFoldersPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a policy on a resource. If no policy is set on the resource, `NOT_FOUND` is returned. The `etag` value can be used with `UpdatePolicy()` to update a policy during read-modify-write. */
export interface GetFoldersPoliciesRequest {
  /** Required. Resource name of the policy. See Policy for naming requirements. */
  name: string;
}

export const GetFoldersPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/policies/{policiesId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersPoliciesRequest>;

export type GetFoldersPoliciesResponse = GoogleCloudOrgpolicyV2Policy;
export const GetFoldersPoliciesResponse = GoogleCloudOrgpolicyV2Policy;

export type GetFoldersPoliciesError = CommonErrors;

export const getFoldersPolicies: API.OperationMethod<GetFoldersPoliciesRequest, GetFoldersPoliciesResponse, GetFoldersPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersPoliciesRequest,
  output: GetFoldersPoliciesResponse,
  errors: [],
}));

/** Gets the effective policy on a resource. This is the result of merging policies in the resource hierarchy and evaluating conditions. The returned policy will not have an `etag` or `condition` set because it is an evaluated policy across multiple resources. Subtrees of Resource Manager resource hierarchy with 'under:' prefix will not be expanded. */
export interface GetEffectivePolicyFoldersPoliciesRequest {
  /** Required. The effective policy to compute. See Policy for naming requirements. */
  name: string;
}

export const GetEffectivePolicyFoldersPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/policies/{policiesId}:getEffectivePolicy" }),
  svc,
) as unknown as Schema.Schema<GetEffectivePolicyFoldersPoliciesRequest>;

export type GetEffectivePolicyFoldersPoliciesResponse = GoogleCloudOrgpolicyV2Policy;
export const GetEffectivePolicyFoldersPoliciesResponse = GoogleCloudOrgpolicyV2Policy;

export type GetEffectivePolicyFoldersPoliciesError = CommonErrors;

export const getEffectivePolicyFoldersPolicies: API.OperationMethod<GetEffectivePolicyFoldersPoliciesRequest, GetEffectivePolicyFoldersPoliciesResponse, GetEffectivePolicyFoldersPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEffectivePolicyFoldersPoliciesRequest,
  output: GetEffectivePolicyFoldersPoliciesResponse,
  errors: [],
}));

/** Creates a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint does not exist. Returns a `google.rpc.Status` with `google.rpc.Code.ALREADY_EXISTS` if the policy already exists on the given Google Cloud resource. */
export interface CreateFoldersPoliciesRequest {
  /** Required. The Google Cloud resource that will parent the new policy. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}` */
  parent: string;
  /** Request body */
  body?: GoogleCloudOrgpolicyV2Policy;
}

export const CreateFoldersPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudOrgpolicyV2Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/policies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersPoliciesRequest>;

export type CreateFoldersPoliciesResponse = GoogleCloudOrgpolicyV2Policy;
export const CreateFoldersPoliciesResponse = GoogleCloudOrgpolicyV2Policy;

export type CreateFoldersPoliciesError = CommonErrors;

export const createFoldersPolicies: API.OperationMethod<CreateFoldersPoliciesRequest, CreateFoldersPoliciesResponse, CreateFoldersPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersPoliciesRequest,
  output: CreateFoldersPoliciesResponse,
  errors: [],
}));

/** Updates a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint or the policy do not exist. Returns a `google.rpc.Status` with `google.rpc.Code.ABORTED` if the etag supplied in the request does not match the persisted etag of the policy Note: the supplied policy will perform a full overwrite of all fields. */
export interface PatchFoldersPoliciesRequest {
  /** Immutable. The resource name of the policy. Must be one of the following forms, where `constraint_name` is the name of the constraint which this policy configures: * `projects/{project_number}/policies/{constraint_name}` * `folders/{folder_id}/policies/{constraint_name}` * `organizations/{organization_id}/policies/{constraint_name}` For example, `projects/123/policies/compute.disableSerialPortAccess`. Note: `projects/{project_id}/policies/{constraint_name}` is also an acceptable name for API requests, but responses will return the name using the equivalent project number. */
  name: string;
  /** Field mask used to specify the fields to be overwritten in the policy by the set. The fields specified in the update_mask are relative to the policy, not the full request. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudOrgpolicyV2Policy;
}

export const PatchFoldersPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudOrgpolicyV2Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/folders/{foldersId}/policies/{policiesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersPoliciesRequest>;

export type PatchFoldersPoliciesResponse = GoogleCloudOrgpolicyV2Policy;
export const PatchFoldersPoliciesResponse = GoogleCloudOrgpolicyV2Policy;

export type PatchFoldersPoliciesError = CommonErrors;

export const patchFoldersPolicies: API.OperationMethod<PatchFoldersPoliciesRequest, PatchFoldersPoliciesResponse, PatchFoldersPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersPoliciesRequest,
  output: PatchFoldersPoliciesResponse,
  errors: [],
}));

/** Deletes a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint or organization policy does not exist. */
export interface DeleteFoldersPoliciesRequest {
  /** Required. Name of the policy to delete. See the policy entry for naming rules. */
  name: string;
  /** Optional. The current etag of policy. If an etag is provided and does not match the current etag of the policy, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const DeleteFoldersPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/folders/{foldersId}/policies/{policiesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersPoliciesRequest>;

export type DeleteFoldersPoliciesResponse = GoogleProtobufEmpty;
export const DeleteFoldersPoliciesResponse = GoogleProtobufEmpty;

export type DeleteFoldersPoliciesError = CommonErrors;

export const deleteFoldersPolicies: API.OperationMethod<DeleteFoldersPoliciesRequest, DeleteFoldersPoliciesResponse, DeleteFoldersPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersPoliciesRequest,
  output: DeleteFoldersPoliciesResponse,
  errors: [],
}));

/** Lists constraints that could be applied on the specified resource. */
export interface ListOrganizationsConstraintsRequest {
  /** Required. The Google Cloud resource that parents the constraint. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}` */
  parent: string;
  /** Size of the pages to be returned. This is currently unsupported and will be ignored. The server may at any point start using this field to limit page size. */
  pageSize?: number;
  /** Page token used to retrieve the next page. This is currently unsupported and will be ignored. The server may at any point start using this field. */
  pageToken?: string;
}

export const ListOrganizationsConstraintsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/constraints" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsConstraintsRequest>;

export type ListOrganizationsConstraintsResponse = GoogleCloudOrgpolicyV2ListConstraintsResponse;
export const ListOrganizationsConstraintsResponse = GoogleCloudOrgpolicyV2ListConstraintsResponse;

export type ListOrganizationsConstraintsError = CommonErrors;

export const listOrganizationsConstraints = API.makePaginated(() => ({
  input: ListOrganizationsConstraintsRequest,
  output: ListOrganizationsConstraintsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves all of the policies that exist on a particular resource. */
export interface ListOrganizationsPoliciesRequest {
  /** Required. The target Google Cloud resource that parents the set of constraints and policies that will be returned from this call. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}` */
  parent: string;
  /** Size of the pages to be returned. This is currently unsupported and will be ignored. The server may at any point start using this field to limit page size. */
  pageSize?: number;
  /** Page token used to retrieve the next page. This is currently unsupported and will be ignored. The server may at any point start using this field. */
  pageToken?: string;
}

export const ListOrganizationsPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/policies" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsPoliciesRequest>;

export type ListOrganizationsPoliciesResponse = GoogleCloudOrgpolicyV2ListPoliciesResponse;
export const ListOrganizationsPoliciesResponse = GoogleCloudOrgpolicyV2ListPoliciesResponse;

export type ListOrganizationsPoliciesError = CommonErrors;

export const listOrganizationsPolicies = API.makePaginated(() => ({
  input: ListOrganizationsPoliciesRequest,
  output: ListOrganizationsPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a policy on a resource. If no policy is set on the resource, `NOT_FOUND` is returned. The `etag` value can be used with `UpdatePolicy()` to update a policy during read-modify-write. */
export interface GetOrganizationsPoliciesRequest {
  /** Required. Resource name of the policy. See Policy for naming requirements. */
  name: string;
}

export const GetOrganizationsPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/policies/{policiesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsPoliciesRequest>;

export type GetOrganizationsPoliciesResponse = GoogleCloudOrgpolicyV2Policy;
export const GetOrganizationsPoliciesResponse = GoogleCloudOrgpolicyV2Policy;

export type GetOrganizationsPoliciesError = CommonErrors;

export const getOrganizationsPolicies: API.OperationMethod<GetOrganizationsPoliciesRequest, GetOrganizationsPoliciesResponse, GetOrganizationsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsPoliciesRequest,
  output: GetOrganizationsPoliciesResponse,
  errors: [],
}));

/** Gets the effective policy on a resource. This is the result of merging policies in the resource hierarchy and evaluating conditions. The returned policy will not have an `etag` or `condition` set because it is an evaluated policy across multiple resources. Subtrees of Resource Manager resource hierarchy with 'under:' prefix will not be expanded. */
export interface GetEffectivePolicyOrganizationsPoliciesRequest {
  /** Required. The effective policy to compute. See Policy for naming requirements. */
  name: string;
}

export const GetEffectivePolicyOrganizationsPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/policies/{policiesId}:getEffectivePolicy" }),
  svc,
) as unknown as Schema.Schema<GetEffectivePolicyOrganizationsPoliciesRequest>;

export type GetEffectivePolicyOrganizationsPoliciesResponse = GoogleCloudOrgpolicyV2Policy;
export const GetEffectivePolicyOrganizationsPoliciesResponse = GoogleCloudOrgpolicyV2Policy;

export type GetEffectivePolicyOrganizationsPoliciesError = CommonErrors;

export const getEffectivePolicyOrganizationsPolicies: API.OperationMethod<GetEffectivePolicyOrganizationsPoliciesRequest, GetEffectivePolicyOrganizationsPoliciesResponse, GetEffectivePolicyOrganizationsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEffectivePolicyOrganizationsPoliciesRequest,
  output: GetEffectivePolicyOrganizationsPoliciesResponse,
  errors: [],
}));

/** Creates a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint does not exist. Returns a `google.rpc.Status` with `google.rpc.Code.ALREADY_EXISTS` if the policy already exists on the given Google Cloud resource. */
export interface CreateOrganizationsPoliciesRequest {
  /** Required. The Google Cloud resource that will parent the new policy. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}` */
  parent: string;
  /** Request body */
  body?: GoogleCloudOrgpolicyV2Policy;
}

export const CreateOrganizationsPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudOrgpolicyV2Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/policies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsPoliciesRequest>;

export type CreateOrganizationsPoliciesResponse = GoogleCloudOrgpolicyV2Policy;
export const CreateOrganizationsPoliciesResponse = GoogleCloudOrgpolicyV2Policy;

export type CreateOrganizationsPoliciesError = CommonErrors;

export const createOrganizationsPolicies: API.OperationMethod<CreateOrganizationsPoliciesRequest, CreateOrganizationsPoliciesResponse, CreateOrganizationsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsPoliciesRequest,
  output: CreateOrganizationsPoliciesResponse,
  errors: [],
}));

/** Updates a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint or the policy do not exist. Returns a `google.rpc.Status` with `google.rpc.Code.ABORTED` if the etag supplied in the request does not match the persisted etag of the policy Note: the supplied policy will perform a full overwrite of all fields. */
export interface PatchOrganizationsPoliciesRequest {
  /** Immutable. The resource name of the policy. Must be one of the following forms, where `constraint_name` is the name of the constraint which this policy configures: * `projects/{project_number}/policies/{constraint_name}` * `folders/{folder_id}/policies/{constraint_name}` * `organizations/{organization_id}/policies/{constraint_name}` For example, `projects/123/policies/compute.disableSerialPortAccess`. Note: `projects/{project_id}/policies/{constraint_name}` is also an acceptable name for API requests, but responses will return the name using the equivalent project number. */
  name: string;
  /** Field mask used to specify the fields to be overwritten in the policy by the set. The fields specified in the update_mask are relative to the policy, not the full request. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudOrgpolicyV2Policy;
}

export const PatchOrganizationsPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudOrgpolicyV2Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/policies/{policiesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsPoliciesRequest>;

export type PatchOrganizationsPoliciesResponse = GoogleCloudOrgpolicyV2Policy;
export const PatchOrganizationsPoliciesResponse = GoogleCloudOrgpolicyV2Policy;

export type PatchOrganizationsPoliciesError = CommonErrors;

export const patchOrganizationsPolicies: API.OperationMethod<PatchOrganizationsPoliciesRequest, PatchOrganizationsPoliciesResponse, PatchOrganizationsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsPoliciesRequest,
  output: PatchOrganizationsPoliciesResponse,
  errors: [],
}));

/** Deletes a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint or organization policy does not exist. */
export interface DeleteOrganizationsPoliciesRequest {
  /** Required. Name of the policy to delete. See the policy entry for naming rules. */
  name: string;
  /** Optional. The current etag of policy. If an etag is provided and does not match the current etag of the policy, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const DeleteOrganizationsPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/policies/{policiesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsPoliciesRequest>;

export type DeleteOrganizationsPoliciesResponse = GoogleProtobufEmpty;
export const DeleteOrganizationsPoliciesResponse = GoogleProtobufEmpty;

export type DeleteOrganizationsPoliciesError = CommonErrors;

export const deleteOrganizationsPolicies: API.OperationMethod<DeleteOrganizationsPoliciesRequest, DeleteOrganizationsPoliciesResponse, DeleteOrganizationsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsPoliciesRequest,
  output: DeleteOrganizationsPoliciesResponse,
  errors: [],
}));

/** Creates a custom constraint. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the organization does not exist. Returns a `google.rpc.Status` with `google.rpc.Code.ALREADY_EXISTS` if the constraint already exists on the given organization. */
export interface CreateOrganizationsCustomConstraintsRequest {
  /** Required. Must be in the following form: * `organizations/{organization_id}` */
  parent: string;
  /** Request body */
  body?: GoogleCloudOrgpolicyV2CustomConstraint;
}

export const CreateOrganizationsCustomConstraintsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudOrgpolicyV2CustomConstraint).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/customConstraints", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsCustomConstraintsRequest>;

export type CreateOrganizationsCustomConstraintsResponse = GoogleCloudOrgpolicyV2CustomConstraint;
export const CreateOrganizationsCustomConstraintsResponse = GoogleCloudOrgpolicyV2CustomConstraint;

export type CreateOrganizationsCustomConstraintsError = CommonErrors;

export const createOrganizationsCustomConstraints: API.OperationMethod<CreateOrganizationsCustomConstraintsRequest, CreateOrganizationsCustomConstraintsResponse, CreateOrganizationsCustomConstraintsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsCustomConstraintsRequest,
  output: CreateOrganizationsCustomConstraintsResponse,
  errors: [],
}));

/** Updates a custom constraint. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint does not exist. Note: the supplied policy will perform a full overwrite of all fields. */
export interface PatchOrganizationsCustomConstraintsRequest {
  /** Immutable. Name of the constraint. This is unique within the organization. Format of the name should be * `organizations/{organization_id}/customConstraints/{custom_constraint_id}` Example: `organizations/123/customConstraints/custom.createOnlyE2TypeVms` The max length is 70 characters and the minimum length is 1. Note that the prefix `organizations/{organization_id}/customConstraints/` is not counted. */
  name: string;
  /** Request body */
  body?: GoogleCloudOrgpolicyV2CustomConstraint;
}

export const PatchOrganizationsCustomConstraintsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudOrgpolicyV2CustomConstraint).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/customConstraints/{customConstraintsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsCustomConstraintsRequest>;

export type PatchOrganizationsCustomConstraintsResponse = GoogleCloudOrgpolicyV2CustomConstraint;
export const PatchOrganizationsCustomConstraintsResponse = GoogleCloudOrgpolicyV2CustomConstraint;

export type PatchOrganizationsCustomConstraintsError = CommonErrors;

export const patchOrganizationsCustomConstraints: API.OperationMethod<PatchOrganizationsCustomConstraintsRequest, PatchOrganizationsCustomConstraintsResponse, PatchOrganizationsCustomConstraintsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsCustomConstraintsRequest,
  output: PatchOrganizationsCustomConstraintsResponse,
  errors: [],
}));

/** Gets a custom or managed constraint. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the custom or managed constraint does not exist. */
export interface GetOrganizationsCustomConstraintsRequest {
  /** Required. Resource name of the custom or managed constraint. See the custom constraint entry for naming requirements. */
  name: string;
}

export const GetOrganizationsCustomConstraintsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/customConstraints/{customConstraintsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsCustomConstraintsRequest>;

export type GetOrganizationsCustomConstraintsResponse = GoogleCloudOrgpolicyV2CustomConstraint;
export const GetOrganizationsCustomConstraintsResponse = GoogleCloudOrgpolicyV2CustomConstraint;

export type GetOrganizationsCustomConstraintsError = CommonErrors;

export const getOrganizationsCustomConstraints: API.OperationMethod<GetOrganizationsCustomConstraintsRequest, GetOrganizationsCustomConstraintsResponse, GetOrganizationsCustomConstraintsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsCustomConstraintsRequest,
  output: GetOrganizationsCustomConstraintsResponse,
  errors: [],
}));

/** Retrieves all of the custom constraints that exist on a particular organization resource. */
export interface ListOrganizationsCustomConstraintsRequest {
  /** Required. The target Google Cloud resource that parents the set of custom constraints that will be returned from this call. Must be in one of the following forms: * `organizations/{organization_id}` */
  parent: string;
  /** Size of the pages to be returned. This is currently unsupported and will be ignored. The server may at any point start using this field to limit page size. */
  pageSize?: number;
  /** Page token used to retrieve the next page. This is currently unsupported and will be ignored. The server may at any point start using this field. */
  pageToken?: string;
}

export const ListOrganizationsCustomConstraintsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/customConstraints" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsCustomConstraintsRequest>;

export type ListOrganizationsCustomConstraintsResponse = GoogleCloudOrgpolicyV2ListCustomConstraintsResponse;
export const ListOrganizationsCustomConstraintsResponse = GoogleCloudOrgpolicyV2ListCustomConstraintsResponse;

export type ListOrganizationsCustomConstraintsError = CommonErrors;

export const listOrganizationsCustomConstraints = API.makePaginated(() => ({
  input: ListOrganizationsCustomConstraintsRequest,
  output: ListOrganizationsCustomConstraintsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a custom constraint. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint does not exist. */
export interface DeleteOrganizationsCustomConstraintsRequest {
  /** Required. Name of the custom constraint to delete. See the custom constraint entry for naming rules. */
  name: string;
}

export const DeleteOrganizationsCustomConstraintsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/customConstraints/{customConstraintsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsCustomConstraintsRequest>;

export type DeleteOrganizationsCustomConstraintsResponse = GoogleProtobufEmpty;
export const DeleteOrganizationsCustomConstraintsResponse = GoogleProtobufEmpty;

export type DeleteOrganizationsCustomConstraintsError = CommonErrors;

export const deleteOrganizationsCustomConstraints: API.OperationMethod<DeleteOrganizationsCustomConstraintsRequest, DeleteOrganizationsCustomConstraintsResponse, DeleteOrganizationsCustomConstraintsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsCustomConstraintsRequest,
  output: DeleteOrganizationsCustomConstraintsResponse,
  errors: [],
}));

