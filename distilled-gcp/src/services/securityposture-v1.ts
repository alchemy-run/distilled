// ==========================================================================
// Security Posture API (securityposture v1)
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
  name: "securityposture",
  version: "v1",
  rootUrl: "https://securityposture.googleapis.com/",
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

export interface ComplianceStandard {
  /** Optional. The compliance standard that the policy helps enforce. For example, `NIST SP 800-53`. */
  standard?: string;
  /** Optional. The control in the compliance standard that the policy helps enforce. For example, `AC-3`. */
  control?: string;
}

export const ComplianceStandard: Schema.Schema<ComplianceStandard> = Schema.suspend(() => Schema.Struct({
  standard: Schema.optional(Schema.String),
  control: Schema.optional(Schema.String),
})).annotate({ identifier: "ComplianceStandard" }) as any as Schema.Schema<ComplianceStandard>;

export interface SecurityHealthAnalyticsModule {
  /** Required. The name of the detector. For example, `BIGQUERY_TABLE_CMEK_DISABLED`. This field is also used as the finding category for all the asset violation findings that the detector returns. */
  moduleName?: string;
  /** Whether the detector is enabled at a specified level of the resource hierarchy. */
  moduleEnablementState?: "ENABLEMENT_STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | (string & {});
}

export const SecurityHealthAnalyticsModule: Schema.Schema<SecurityHealthAnalyticsModule> = Schema.suspend(() => Schema.Struct({
  moduleName: Schema.optional(Schema.String),
  moduleEnablementState: Schema.optional(Schema.String),
})).annotate({ identifier: "SecurityHealthAnalyticsModule" }) as any as Schema.Schema<SecurityHealthAnalyticsModule>;

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

export interface Property {
  /** Required. The name of the custom source property. */
  name?: string;
  /** Optional. The CEL expression for the value of the custom source property. For resource properties, you can return the value of the property or a string enclosed in quotation marks. */
  valueExpression?: Expr;
}

export const Property: Schema.Schema<Property> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  valueExpression: Schema.optional(Expr),
})).annotate({ identifier: "Property" }) as any as Schema.Schema<Property>;

export interface CustomOutputSpec {
  /** Optional. The custom source properties that can appear in findings. */
  properties?: Array<Property>;
}

export const CustomOutputSpec: Schema.Schema<CustomOutputSpec> = Schema.suspend(() => Schema.Struct({
  properties: Schema.optional(Schema.Array(Property)),
})).annotate({ identifier: "CustomOutputSpec" }) as any as Schema.Schema<CustomOutputSpec>;

export interface ResourceSelector {
  /** Required. The resource types to run the detector on. Each custom module can specify up to 5 resource types. */
  resourceTypes?: Array<string>;
}

export const ResourceSelector: Schema.Schema<ResourceSelector> = Schema.suspend(() => Schema.Struct({
  resourceTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ResourceSelector" }) as any as Schema.Schema<ResourceSelector>;

export interface CustomConfig {
  /** Required. The Common Expression Language (CEL) expression to evaluate. When the expression evaluates to `true` for a resource, a finding is generated. */
  predicate?: Expr;
  /** Optional. Definitions of custom source properties to include in findings. */
  customOutput?: CustomOutputSpec;
  /** Required. The resource types that the custom module operates on. */
  resourceSelector?: ResourceSelector;
  /** Required. The severity of findings generated by the custom module. */
  severity?: "SEVERITY_UNSPECIFIED" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
  /** Optional. A description of the vulnerability or misconfiguration that the custom module detects. The description appears in each finding. Provide enough information to help an investigator understand the finding. The value must be enclosed in quotation marks. */
  description?: string;
  /** Required. An explanation of the steps that security teams can take to resolve the detected issue. The explanation appears in each finding. */
  recommendation?: string;
}

export const CustomConfig: Schema.Schema<CustomConfig> = Schema.suspend(() => Schema.Struct({
  predicate: Schema.optional(Expr),
  customOutput: Schema.optional(CustomOutputSpec),
  resourceSelector: Schema.optional(ResourceSelector),
  severity: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  recommendation: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomConfig" }) as any as Schema.Schema<CustomConfig>;

export interface SecurityHealthAnalyticsCustomModule {
  /** Output only. Immutable. The unique identifier for the custom module. Contains 1 to 20 digits. */
  id?: string;
  /** Optional. The display name of the custom module. This value is used as the finding category for all the asset violation findings that the custom module returns. The display name must contain between 1 and 128 alphanumeric characters or underscores, and it must start with a lowercase letter. */
  displayName?: string;
  /** Required. Configuration settings for the custom module. */
  config?: CustomConfig;
  /** Whether the custom module is enabled at a specified level of the resource hierarchy. */
  moduleEnablementState?: "ENABLEMENT_STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | (string & {});
}

export const SecurityHealthAnalyticsCustomModule: Schema.Schema<SecurityHealthAnalyticsCustomModule> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  config: Schema.optional(CustomConfig),
  moduleEnablementState: Schema.optional(Schema.String),
})).annotate({ identifier: "SecurityHealthAnalyticsCustomModule" }) as any as Schema.Schema<SecurityHealthAnalyticsCustomModule>;

export interface GoogleCloudSecuritypostureV1PolicyRuleStringValues {
  /** The allowed values for the constraint. */
  allowedValues?: Array<string>;
  /** The denied values for the constraint. */
  deniedValues?: Array<string>;
}

export const GoogleCloudSecuritypostureV1PolicyRuleStringValues: Schema.Schema<GoogleCloudSecuritypostureV1PolicyRuleStringValues> = Schema.suspend(() => Schema.Struct({
  allowedValues: Schema.optional(Schema.Array(Schema.String)),
  deniedValues: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudSecuritypostureV1PolicyRuleStringValues" }) as any as Schema.Schema<GoogleCloudSecuritypostureV1PolicyRuleStringValues>;

export interface ResourceTypes {
  /** Optional. The resource types we currently support. */
  included?: Array<string>;
}

export const ResourceTypes: Schema.Schema<ResourceTypes> = Schema.suspend(() => Schema.Struct({
  included: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ResourceTypes" }) as any as Schema.Schema<ResourceTypes>;

export interface GoogleCloudSecuritypostureV1PolicyRule {
  /** The allowed and denied values for a list constraint. Valid only for list constraints. */
  values?: GoogleCloudSecuritypostureV1PolicyRuleStringValues;
  /** Whether to allow any value for a list constraint. Valid only for list constraints. */
  allowAll?: boolean;
  /** Whether to deny all values for a list constraint. Valid only for list constraints. */
  denyAll?: boolean;
  /** Whether to enforce the constraint. Valid only for boolean constraints. */
  enforce?: boolean;
  /** A condition that determines whether this rule is used to evaluate the policy. When set, the google.type.Expr.expression field must contain 1 to 10 subexpressions, joined by the `||` or `&&` operators. Each subexpression must use the `resource.matchTag()`, `resource.matchTagId()`, `resource.hasTagKey()`, or `resource.hasTagKeyId()` Common Expression Language (CEL) function. The `resource.matchTag()` function takes the following arguments: * `key_name`: the namespaced name of the tag key, with the organization ID and a slash (`/`) as a prefix; for example, `123456789012/environment` * `value_name`: the short name of the tag value For example: `resource.matchTag('123456789012/environment, 'prod')` The `resource.matchTagId()` function takes the following arguments: * `key_id`: the permanent ID of the tag key; for example, `tagKeys/123456789012` * `value_id`: the permanent ID of the tag value; for example, `tagValues/567890123456` For example: `resource.matchTagId('tagKeys/123456789012', 'tagValues/567890123456')` The `resource.hasTagKey()` function takes the following argument: * `key_name`: the namespaced name of the tag key, with the organization ID and a slash (`/`) as a prefix; for example, `123456789012/environment` For example: `resource.hasTagKey('123456789012/environment')` The `resource.hasTagKeyId()` function takes the following arguments: * `key_id`: the permanent ID of the tag key; for example, `tagKeys/123456789012` For example: `resource.hasTagKeyId('tagKeys/123456789012')` */
  condition?: Expr;
  /** Optional. Required for managed constraints if parameters are defined. Passes parameter values when policy enforcement is enabled. Ensure that parameter value types match those defined in the constraint definition. For example: ``` { "allowedLocations": ["us-east1", "us-west1"], "allowAll": true } ``` */
  parameters?: Record<string, unknown>;
  /** Optional. The resource types policies can support, only used for managed constraints. Method type is `GOVERN_TAGS`. */
  resourceTypes?: ResourceTypes;
}

export const GoogleCloudSecuritypostureV1PolicyRule: Schema.Schema<GoogleCloudSecuritypostureV1PolicyRule> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(GoogleCloudSecuritypostureV1PolicyRuleStringValues),
  allowAll: Schema.optional(Schema.Boolean),
  denyAll: Schema.optional(Schema.Boolean),
  enforce: Schema.optional(Schema.Boolean),
  condition: Schema.optional(Expr),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  resourceTypes: Schema.optional(ResourceTypes),
})).annotate({ identifier: "GoogleCloudSecuritypostureV1PolicyRule" }) as any as Schema.Schema<GoogleCloudSecuritypostureV1PolicyRule>;

export interface OrgPolicyConstraint {
  /** Required. A unique identifier for the constraint. */
  cannedConstraintId?: string;
  /** Required. The rules enforced by the constraint. */
  policyRules?: Array<GoogleCloudSecuritypostureV1PolicyRule>;
}

export const OrgPolicyConstraint: Schema.Schema<OrgPolicyConstraint> = Schema.suspend(() => Schema.Struct({
  cannedConstraintId: Schema.optional(Schema.String),
  policyRules: Schema.optional(Schema.Array(GoogleCloudSecuritypostureV1PolicyRule)),
})).annotate({ identifier: "OrgPolicyConstraint" }) as any as Schema.Schema<OrgPolicyConstraint>;

export interface GoogleCloudSecuritypostureV1CustomConstraint {
  /** Immutable. The name of the constraint, in the format `organizations/{organization_id}/customConstraints/custom.{custom_constraint_id}`. For example, `organizations/123456789012/customConstraints/custom.createOnlyE2TypeVms`. Must contain 1 to 62 characters, excluding the prefix `organizations/{organization_id}/customConstraints/custom.`. */
  name?: string;
  /** Immutable. The resource type that the constraint applies to, in the format `{canonical_service_name}/{resource_type_name}`. For example, `compute.googleapis.com/Instance`. */
  resourceTypes?: Array<string>;
  /** The types of operations that the constraint applies to. */
  methodTypes?: Array<"METHOD_TYPE_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | (string & {})>;
  /** A Common Expression Language (CEL) condition expression that must evaluate to `true` for the constraint to be enforced. The maximum length is 1000 characters. For example: + `resource.instanceName.matches('(production|test)_(.+_)?[\d]+')`: Evaluates to `true` if the resource's `instanceName` attribute contains the following: + The prefix `production` or `test` + An underscore (`_`) + Optional: One or more characters, followed by an underscore (`_`) + One or more digits + `resource.management.auto_upgrade == true`: Evaluates to `true` if the resource's `management.auto_upgrade` attribute is `true`. */
  condition?: string;
  /** Whether to allow or deny the action. */
  actionType?: "ACTION_TYPE_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  /** A display name for the constraint. The maximum length is 200 characters. */
  displayName?: string;
  /** A description of the constraint. The maximum length is 2000 characters. */
  description?: string;
  /** Output only. The last time at which the constraint was updated or created. */
  updateTime?: string;
}

export const GoogleCloudSecuritypostureV1CustomConstraint: Schema.Schema<GoogleCloudSecuritypostureV1CustomConstraint> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  resourceTypes: Schema.optional(Schema.Array(Schema.String)),
  methodTypes: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Schema.String),
  actionType: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritypostureV1CustomConstraint" }) as any as Schema.Schema<GoogleCloudSecuritypostureV1CustomConstraint>;

export interface OrgPolicyConstraintCustom {
  /** Required. Metadata for the constraint. */
  customConstraint?: GoogleCloudSecuritypostureV1CustomConstraint;
  /** Required. The rules enforced by the constraint. */
  policyRules?: Array<GoogleCloudSecuritypostureV1PolicyRule>;
}

export const OrgPolicyConstraintCustom: Schema.Schema<OrgPolicyConstraintCustom> = Schema.suspend(() => Schema.Struct({
  customConstraint: Schema.optional(GoogleCloudSecuritypostureV1CustomConstraint),
  policyRules: Schema.optional(Schema.Array(GoogleCloudSecuritypostureV1PolicyRule)),
})).annotate({ identifier: "OrgPolicyConstraintCustom" }) as any as Schema.Schema<OrgPolicyConstraintCustom>;

export interface Constraint {
  /** Optional. A built-in detector for Security Health Analytics. */
  securityHealthAnalyticsModule?: SecurityHealthAnalyticsModule;
  /** Optional. A custom module for Security Health Analytics. */
  securityHealthAnalyticsCustomModule?: SecurityHealthAnalyticsCustomModule;
  /** Optional. A predefined organization policy constraint. */
  orgPolicyConstraint?: OrgPolicyConstraint;
  /** Optional. A custom organization policy constraint. */
  orgPolicyConstraintCustom?: OrgPolicyConstraintCustom;
}

export const Constraint: Schema.Schema<Constraint> = Schema.suspend(() => Schema.Struct({
  securityHealthAnalyticsModule: Schema.optional(SecurityHealthAnalyticsModule),
  securityHealthAnalyticsCustomModule: Schema.optional(SecurityHealthAnalyticsCustomModule),
  orgPolicyConstraint: Schema.optional(OrgPolicyConstraint),
  orgPolicyConstraintCustom: Schema.optional(OrgPolicyConstraintCustom),
})).annotate({ identifier: "Constraint" }) as any as Schema.Schema<Constraint>;

export interface Policy {
  /** Required. A user-specified identifier for the policy. In a PolicySet, each policy must have a unique identifier. */
  policyId?: string;
  /** Optional. The compliance standards that the policy helps enforce. */
  complianceStandards?: Array<ComplianceStandard>;
  /** Required. The constraints that the policy includes. */
  constraint?: Constraint;
  /** Optional. A description of the policy. */
  description?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  policyId: Schema.optional(Schema.String),
  complianceStandards: Schema.optional(Schema.Array(ComplianceStandard)),
  constraint: Schema.optional(Constraint),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface PolicySet {
  /** Required. An identifier for the policy set. */
  policySetId?: string;
  /** Optional. A description of the policy set. */
  description?: string;
  /** Required. The Policy resources in the policy set. Each policy must have a policy_id that's unique within the policy set. */
  policies?: Array<Policy>;
}

export const PolicySet: Schema.Schema<PolicySet> = Schema.suspend(() => Schema.Struct({
  policySetId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Policy)),
})).annotate({ identifier: "PolicySet" }) as any as Schema.Schema<PolicySet>;

export interface Posture {
  /** Required. Identifier. The name of the posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. */
  name?: string;
  /** Required. The state of the posture at the specified `revision_id`. */
  state?: "STATE_UNSPECIFIED" | "DEPRECATED" | "DRAFT" | "ACTIVE" | (string & {});
  /** Output only. Immutable. An opaque eight-character string that identifies the revision of the posture. A posture can have multiple revisions; when you deploy a posture, you deploy a specific revision of the posture. */
  revisionId?: string;
  /** Output only. The time at which the posture was created. */
  createTime?: string;
  /** Output only. The time at which the posture was last updated. */
  updateTime?: string;
  /** Optional. A description of the posture. */
  description?: string;
  /** Required. The PolicySet resources that the posture includes. */
  policySets?: Array<PolicySet>;
  /** Optional. An opaque identifier for the current version of the posture at the specified `revision_id`. To prevent concurrent updates from overwriting each other, always provide the `etag` when you update a posture. You can also provide the `etag` when you delete a posture, to help ensure that you're deleting the intended version of the posture. */
  etag?: string;
  /** Optional. The user-specified annotations for the posture. For details about the values you can use in an annotation, see [AIP-148: Standard fields](https://google.aip.dev/148#annotations). */
  annotations?: Record<string, string>;
  /** Output only. Whether the posture is in the process of being updated. */
  reconciling?: boolean;
  /** Output only. The categories that the posture belongs to, as determined by the Security Posture API. */
  categories?: Array<"CATEGORY_UNSPECIFIED" | "AI" | "AWS" | "GCP" | "AZURE" | (string & {})>;
}

export const Posture: Schema.Schema<Posture> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  policySets: Schema.optional(Schema.Array(PolicySet)),
  etag: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  reconciling: Schema.optional(Schema.Boolean),
  categories: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Posture" }) as any as Schema.Schema<Posture>;

export interface ListPosturesResponse {
  /** The list of Posture resources. */
  postures?: Array<Posture>;
  /** A pagination token. To retrieve the next page of results, call the method again with this token. */
  nextPageToken?: string;
  /** Locations that were temporarily unavailable and could not be reached. */
  unreachable?: Array<string>;
}

export const ListPosturesResponse: Schema.Schema<ListPosturesResponse> = Schema.suspend(() => Schema.Struct({
  postures: Schema.optional(Schema.Array(Posture)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListPosturesResponse" }) as any as Schema.Schema<ListPosturesResponse>;

export interface ListPostureRevisionsResponse {
  /** The list of revisions for the Posture. */
  revisions?: Array<Posture>;
  /** A pagination token. To retrieve the next page of results, call the method again with this token. */
  nextPageToken?: string;
}

export const ListPostureRevisionsResponse: Schema.Schema<ListPostureRevisionsResponse> = Schema.suspend(() => Schema.Struct({
  revisions: Schema.optional(Schema.Array(Posture)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPostureRevisionsResponse" }) as any as Schema.Schema<ListPostureRevisionsResponse>;

export interface ExtractPostureRequest {
  /** Required. An identifier for the posture. */
  postureId?: string;
  /** Required. The organization, folder, or project from which policies are extracted. Must be within the organization defined in parent. Use one of the following formats: * `organization/{organization_number}` * `folder/{folder_number}` * `project/{project_number}` */
  workload?: string;
}

export const ExtractPostureRequest: Schema.Schema<ExtractPostureRequest> = Schema.suspend(() => Schema.Struct({
  postureId: Schema.optional(Schema.String),
  workload: Schema.optional(Schema.String),
})).annotate({ identifier: "ExtractPostureRequest" }) as any as Schema.Schema<ExtractPostureRequest>;

export interface PostureDeployment {
  /** Required. Identifier. The name of the posture deployment, in the format `organizations/{organization}/locations/global/postureDeployments/{deployment_id}`. */
  name?: string;
  /** Required. The organization, folder, or project where the posture is deployed. Uses one of the following formats: * `organizations/{organization_number}` * `folders/{folder_number}` * `projects/{project_number}` */
  targetResource?: string;
  /** Output only. The state of the posture deployment. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "DELETING" | "UPDATING" | "ACTIVE" | "CREATE_FAILED" | "UPDATE_FAILED" | "DELETE_FAILED" | (string & {});
  /** Required. The posture used in the deployment, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. */
  postureId?: string;
  /** Required. The revision ID of the posture used in the deployment. */
  postureRevisionId?: string;
  /** Output only. The time at which the posture deployment was created. */
  createTime?: string;
  /** Output only. The time at which the posture deployment was last updated. */
  updateTime?: string;
  /** Optional. A description of the posture deployment. */
  description?: string;
  /** Optional. An opaque identifier for the current version of the posture deployment. To prevent concurrent updates from overwriting each other, always provide the `etag` when you update a posture deployment. You can also provide the `etag` when you delete a posture deployment, to help ensure that you're deleting the intended posture deployment. */
  etag?: string;
  /** Optional. The user-specified annotations for the posture deployment. For details about the values you can use in an annotation, see [AIP-148: Standard fields](https://google.aip.dev/148#annotations). */
  annotations?: Record<string, string>;
  /** Output only. Whether the posture deployment is in the process of being updated. */
  reconciling?: boolean;
  /** Output only. The posture ID that was specified for the deployment. Present only if the posture deployment is in a failed state. */
  desiredPostureId?: string;
  /** Output only. The revision ID of the posture that was specified for the deployment. Present only if the deployment is in a failed state. */
  desiredPostureRevisionId?: string;
  /** Output only. A description of why the posture deployment failed. Present only if the deployment is in a failed state. */
  failureMessage?: string;
  /** Output only. The categories that the posture deployment belongs to, as determined by the Security Posture API. */
  categories?: Array<"CATEGORY_UNSPECIFIED" | "AI" | "AWS" | "GCP" | "AZURE" | (string & {})>;
}

export const PostureDeployment: Schema.Schema<PostureDeployment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  targetResource: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  postureId: Schema.optional(Schema.String),
  postureRevisionId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  reconciling: Schema.optional(Schema.Boolean),
  desiredPostureId: Schema.optional(Schema.String),
  desiredPostureRevisionId: Schema.optional(Schema.String),
  failureMessage: Schema.optional(Schema.String),
  categories: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PostureDeployment" }) as any as Schema.Schema<PostureDeployment>;

export interface ListPostureDeploymentsResponse {
  /** The list of PostureDeployment resources. */
  postureDeployments?: Array<PostureDeployment>;
  /** A pagination token. To retrieve the next page of results, call the method again with this token. */
  nextPageToken?: string;
  /** Locations that were temporarily unavailable and could not be reached. */
  unreachable?: Array<string>;
}

export const ListPostureDeploymentsResponse: Schema.Schema<ListPostureDeploymentsResponse> = Schema.suspend(() => Schema.Struct({
  postureDeployments: Schema.optional(Schema.Array(PostureDeployment)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListPostureDeploymentsResponse" }) as any as Schema.Schema<ListPostureDeploymentsResponse>;

export interface PostureTemplate {
  /** Output only. Identifier. The name of the posture template, in the format `organizations/{organization}/locations/global/postureTemplates/{posture_template}`. */
  name?: string;
  /** Output only. A string that identifies the revision of the posture template. */
  revisionId?: string;
  /** Output only. A description of the posture template. */
  description?: string;
  /** Output only. The state of the posture template at the specified `revision_id`. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DEPRECATED" | (string & {});
  /** Output only. The PolicySet resources that the posture template includes. */
  policySets?: Array<PolicySet>;
  /** Output only. The categories that the posture template belongs to, as determined by the Security Posture API. */
  categories?: Array<"CATEGORY_UNSPECIFIED" | "AI" | "AWS" | "GCP" | "AZURE" | (string & {})>;
}

export const PostureTemplate: Schema.Schema<PostureTemplate> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  policySets: Schema.optional(Schema.Array(PolicySet)),
  categories: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PostureTemplate" }) as any as Schema.Schema<PostureTemplate>;

export interface ListPostureTemplatesResponse {
  /** The list of PostureTemplate resources. */
  postureTemplates?: Array<PostureTemplate>;
  /** A pagination token. To retrieve the next page of results, call the method again with this token. */
  nextPageToken?: string;
}

export const ListPostureTemplatesResponse: Schema.Schema<ListPostureTemplatesResponse> = Schema.suspend(() => Schema.Struct({
  postureTemplates: Schema.optional(Schema.Array(PostureTemplate)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPostureTemplatesResponse" }) as any as Schema.Schema<ListPostureTemplatesResponse>;

export interface PostureDetails {
  /** The name of the posture deployment, in the format `organizations/{organization}/locations/global/postureDeployments/{deployment_id}`. */
  postureDeployment?: string;
  /** The organization, folder, or project where the posture is deployed. Uses one of the following formats: * `organizations/{organization_number}` * `folders/{folder_number}` * `projects/{project_number}` */
  postureDeploymentTargetResource?: string;
  /** The posture used in the deployment, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. */
  posture?: string;
  /** The revision ID of the posture used in the deployment. */
  postureRevisionId?: string;
  /** The identifier for the PolicySet that the relevant policy belongs to. */
  policySet?: string;
}

export const PostureDetails: Schema.Schema<PostureDetails> = Schema.suspend(() => Schema.Struct({
  postureDeployment: Schema.optional(Schema.String),
  postureDeploymentTargetResource: Schema.optional(Schema.String),
  posture: Schema.optional(Schema.String),
  postureRevisionId: Schema.optional(Schema.String),
  policySet: Schema.optional(Schema.String),
})).annotate({ identifier: "PostureDetails" }) as any as Schema.Schema<PostureDetails>;

export interface AssetDetails {
  /** Information about the Cloud Asset Inventory asset that violated a policy. The format of this information can change at any time without prior notice. Your application must not depend on this information in any way. */
  asset?: string;
  /** The type of Cloud Asset Inventory asset. For a list of asset types, see [Supported asset types](https://cloud.google.com/asset-inventory/docs/supported-asset-types). */
  assetType?: string;
}

export const AssetDetails: Schema.Schema<AssetDetails> = Schema.suspend(() => Schema.Struct({
  asset: Schema.optional(Schema.String),
  assetType: Schema.optional(Schema.String),
})).annotate({ identifier: "AssetDetails" }) as any as Schema.Schema<AssetDetails>;

export interface PolicyDetails {
  /** Information about the constraint that was violated. The format of this information can change at any time without prior notice. Your application must not depend on this information in any way. */
  constraint?: string;
  /** The type of constraint that was violated. */
  constraintType?: "CONSTRAINT_TYPE_UNSPECIFIED" | "SECURITY_HEALTH_ANALYTICS_CUSTOM_MODULE" | "ORG_POLICY_CUSTOM" | "SECURITY_HEALTH_ANALYTICS_MODULE" | "ORG_POLICY" | "REGO_POLICY" | (string & {});
  /** The compliance standards that the policy maps to. For example, `CIS-2.0 1.15`. */
  complianceStandards?: Array<string>;
  /** A description of the policy. */
  description?: string;
}

export const PolicyDetails: Schema.Schema<PolicyDetails> = Schema.suspend(() => Schema.Struct({
  constraint: Schema.optional(Schema.String),
  constraintType: Schema.optional(Schema.String),
  complianceStandards: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyDetails" }) as any as Schema.Schema<PolicyDetails>;

export interface Violation {
  /** The full resource name of the asset that caused the violation. For details about the format of the full resource name for each asset type, see [Resource name format](https://cloud.google.com/asset-inventory/docs/resource-name-format). */
  assetId?: string;
  /** The policy that was violated. */
  policyId?: string;
  /** Details for the posture that was violated. This field is present only if the violated policy belongs to a deployed posture. */
  violatedPosture?: PostureDetails;
  /** The severity of the violation. */
  severity?: "SEVERITY_UNSPECIFIED" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
  /** A description of the steps that you can take to fix the violation. */
  nextSteps?: string;
  /** Details of the Cloud Asset Inventory asset that caused the violation. */
  violatedAsset?: AssetDetails;
  /** Details of the policy that was violated. */
  violatedPolicy?: PolicyDetails;
}

export const Violation: Schema.Schema<Violation> = Schema.suspend(() => Schema.Struct({
  assetId: Schema.optional(Schema.String),
  policyId: Schema.optional(Schema.String),
  violatedPosture: Schema.optional(PostureDetails),
  severity: Schema.optional(Schema.String),
  nextSteps: Schema.optional(Schema.String),
  violatedAsset: Schema.optional(AssetDetails),
  violatedPolicy: Schema.optional(PolicyDetails),
})).annotate({ identifier: "Violation" }) as any as Schema.Schema<Violation>;

export interface IaCValidationReport {
  /** A list of every Violation found in the IaC configuration. */
  violations?: Array<Violation>;
  /** Additional information about the report. */
  note?: string;
}

export const IaCValidationReport: Schema.Schema<IaCValidationReport> = Schema.suspend(() => Schema.Struct({
  violations: Schema.optional(Schema.Array(Violation)),
  note: Schema.optional(Schema.String),
})).annotate({ identifier: "IaCValidationReport" }) as any as Schema.Schema<IaCValidationReport>;

export interface Report {
  /** Output only. An infrastructure-as-code (IaC) validation report. */
  iacValidationReport?: IaCValidationReport;
  /** Required. The name of the report, in the format `organizations/{organization}/locations/global/reports/{report_id}`. */
  name?: string;
  /** Output only. The time at which the report was created. */
  createTime?: string;
  /** Output only. The time at which the report was last updated. */
  updateTime?: string;
}

export const Report: Schema.Schema<Report> = Schema.suspend(() => Schema.Struct({
  iacValidationReport: Schema.optional(IaCValidationReport),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Report" }) as any as Schema.Schema<Report>;

export interface ListReportsResponse {
  /** The list of Report resources. */
  reports?: Array<Report>;
  /** A pagination token. To retrieve the next page of results, call the method again with this token. */
  nextPageToken?: string;
  /** Locations that were temporarily unavailable and could not be reached. */
  unreachable?: Array<string>;
}

export const ListReportsResponse: Schema.Schema<ListReportsResponse> = Schema.suspend(() => Schema.Struct({
  reports: Schema.optional(Schema.Array(Report)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListReportsResponse" }) as any as Schema.Schema<ListReportsResponse>;

export interface IaC {
  /** Optional. A Terraform plan file, formatted as a stringified JSON object. To learn how to generate a Terraform plan file in JSON format, see [JSON output format](https://developer.hashicorp.com/terraform/internals/json-format) in the Terraform documentation. */
  tfPlan?: string;
}

export const IaC: Schema.Schema<IaC> = Schema.suspend(() => Schema.Struct({
  tfPlan: Schema.optional(Schema.String),
})).annotate({ identifier: "IaC" }) as any as Schema.Schema<IaC>;

export interface CreateIaCValidationReportRequest {
  /** Required. The infrastructure-as-code (IaC) configuration to validate. */
  iac?: IaC;
}

export const CreateIaCValidationReportRequest: Schema.Schema<CreateIaCValidationReportRequest> = Schema.suspend(() => Schema.Struct({
  iac: Schema.optional(IaC),
})).annotate({ identifier: "CreateIaCValidationReportRequest" }) as any as Schema.Schema<CreateIaCValidationReportRequest>;

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
  /** Output only. The time at which the operation was created. */
  createTime?: string;
  /** Output only. The time at which the operation finished running. */
  endTime?: string;
  /** Output only. The server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. The name of the action executed by the operation. */
  verb?: string;
  /** Output only. The status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Whether a request to cancel the operation has been received. For operations that have been cancelled successfully, the Operation.error field contains the error code CANCELLED. */
  requestedCancellation?: boolean;
  /** Output only. The API version used to start the operation. */
  apiVersion?: string;
  /** Output only. An error message. Returned when a PostureDeployment enters a failure state like UPDATE_FAILED. */
  errorMessage?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface SeverityCountThreshold {
  /** Optional. The severity level, reusing the existing Violation.Severity. */
  severity?: "SEVERITY_UNSPECIFIED" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
  /** Optional. If violation count meets or exceeds this threshold, validation fails. */
  thresholdCount?: number;
}

export const SeverityCountThreshold: Schema.Schema<SeverityCountThreshold> = Schema.suspend(() => Schema.Struct({
  severity: Schema.optional(Schema.String),
  thresholdCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "SeverityCountThreshold" }) as any as Schema.Schema<SeverityCountThreshold>;

export interface IacValidationFailureCriteria {
  /** Identifier. The resource name of the IacValidationFailureCriteria. Format: organizations/{organization}/locations/{location}/iacValidationFailureCriteria */
  name?: string;
  /** Optional. A list of severity thresholds. An IaC validation fails if any threshold is exceeded. */
  severityCountThresholds?: Array<SeverityCountThreshold>;
  /** Output only. The time at which the resource was created. */
  createTime?: string;
  /** Optional. The etag for optimistic concurrency. */
  etag?: string;
  /** Output only. The time at which the resource was last updated. */
  updateTime?: string;
}

export const IacValidationFailureCriteria: Schema.Schema<IacValidationFailureCriteria> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  severityCountThresholds: Schema.optional(Schema.Array(SeverityCountThreshold)),
  createTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "IacValidationFailureCriteria" }) as any as Schema.Schema<IacValidationFailureCriteria>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOrganizationsLocationsOperationsRequest {
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

export const ListOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsOperationsRequest>;

export type ListOrganizationsLocationsOperationsResponse = ListOperationsResponse;
export const ListOrganizationsLocationsOperationsResponse = ListOperationsResponse;

export type ListOrganizationsLocationsOperationsError = CommonErrors;

export const listOrganizationsLocationsOperations = API.makePaginated(() => ({
  input: ListOrganizationsLocationsOperationsRequest,
  output: ListOrganizationsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsOperationsRequest>;

export type GetOrganizationsLocationsOperationsResponse = Operation;
export const GetOrganizationsLocationsOperationsResponse = Operation;

export type GetOrganizationsLocationsOperationsError = CommonErrors;

export const getOrganizationsLocationsOperations: API.OperationMethod<GetOrganizationsLocationsOperationsRequest, GetOrganizationsLocationsOperationsResponse, GetOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsOperationsRequest,
  output: GetOrganizationsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsOperationsRequest>;

export type DeleteOrganizationsLocationsOperationsResponse = Empty;
export const DeleteOrganizationsLocationsOperationsResponse = Empty;

export type DeleteOrganizationsLocationsOperationsError = CommonErrors;

export const deleteOrganizationsLocationsOperations: API.OperationMethod<DeleteOrganizationsLocationsOperationsRequest, DeleteOrganizationsLocationsOperationsResponse, DeleteOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsOperationsRequest,
  output: DeleteOrganizationsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOrganizationsLocationsOperationsRequest>;

export type CancelOrganizationsLocationsOperationsResponse = Empty;
export const CancelOrganizationsLocationsOperationsResponse = Empty;

export type CancelOrganizationsLocationsOperationsError = CommonErrors;

export const cancelOrganizationsLocationsOperations: API.OperationMethod<CancelOrganizationsLocationsOperationsRequest, CancelOrganizationsLocationsOperationsResponse, CancelOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOrganizationsLocationsOperationsRequest,
  output: CancelOrganizationsLocationsOperationsResponse,
  errors: [],
}));

/** Lists the most recent revisions of all Posture resources in a specified organization and location. */
export interface ListOrganizationsLocationsPosturesRequest {
  /** Required. The parent resource name, in the format `organizations/{organization}/locations/global`. */
  parent: string;
  /** The maximum number of postures to return. The default value is `500`. If you exceed the maximum value of `1000`, then the service uses the maximum value. */
  pageSize?: number;
  /** A pagination token returned from a previous request to list postures. Provide this token to retrieve the next page of results. */
  pageToken?: string;
  /** Optional. A filter to apply to the list of postures, in the format defined in [AIP-160: Filtering](https://google.aip.dev/160). */
  filter?: string;
}

export const ListOrganizationsLocationsPosturesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/postures" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsPosturesRequest>;

export type ListOrganizationsLocationsPosturesResponse = ListPosturesResponse;
export const ListOrganizationsLocationsPosturesResponse = ListPosturesResponse;

export type ListOrganizationsLocationsPosturesError = CommonErrors;

export const listOrganizationsLocationsPostures = API.makePaginated(() => ({
  input: ListOrganizationsLocationsPosturesRequest,
  output: ListOrganizationsLocationsPosturesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all revisions of a single Posture. */
export interface ListRevisionsOrganizationsLocationsPosturesRequest {
  /** Required. The name of the Posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. */
  name: string;
  /** Optional. The maximum number of posture revisions to return. The default value is `500`. If you exceed the maximum value of `1000`, then the service uses the maximum value. */
  pageSize?: number;
  /** Optional. A pagination token from a previous request to list posture revisions. Provide this token to retrieve the next page of results. */
  pageToken?: string;
}

export const ListRevisionsOrganizationsLocationsPosturesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/postures/{posturesId}:listRevisions" }),
  svc,
) as unknown as Schema.Schema<ListRevisionsOrganizationsLocationsPosturesRequest>;

export type ListRevisionsOrganizationsLocationsPosturesResponse = ListPostureRevisionsResponse;
export const ListRevisionsOrganizationsLocationsPosturesResponse = ListPostureRevisionsResponse;

export type ListRevisionsOrganizationsLocationsPosturesError = CommonErrors;

export const listRevisionsOrganizationsLocationsPostures = API.makePaginated(() => ({
  input: ListRevisionsOrganizationsLocationsPosturesRequest,
  output: ListRevisionsOrganizationsLocationsPosturesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a single revision of a Posture. */
export interface GetOrganizationsLocationsPosturesRequest {
  /** Required. The name of the Posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. */
  name: string;
  /** Optional. The posture revision to retrieve. If not specified, the most recently updated revision is retrieved. */
  revisionId?: string;
}

export const GetOrganizationsLocationsPosturesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  revisionId: Schema.optional(Schema.String).pipe(T.HttpQuery("revisionId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/postures/{posturesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsPosturesRequest>;

export type GetOrganizationsLocationsPosturesResponse = Posture;
export const GetOrganizationsLocationsPosturesResponse = Posture;

export type GetOrganizationsLocationsPosturesError = CommonErrors;

export const getOrganizationsLocationsPostures: API.OperationMethod<GetOrganizationsLocationsPosturesRequest, GetOrganizationsLocationsPosturesResponse, GetOrganizationsLocationsPosturesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsPosturesRequest,
  output: GetOrganizationsLocationsPosturesResponse,
  errors: [],
}));

/** Creates a new Posture. */
export interface CreateOrganizationsLocationsPosturesRequest {
  /** Required. The parent resource name, in the format `organizations/{organization}/locations/global`. */
  parent: string;
  /** Required. An identifier for the posture. */
  postureId?: string;
  /** Request body */
  body?: Posture;
}

export const CreateOrganizationsLocationsPosturesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  postureId: Schema.optional(Schema.String).pipe(T.HttpQuery("postureId")),
  body: Schema.optional(Posture).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/postures", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsPosturesRequest>;

export type CreateOrganizationsLocationsPosturesResponse = Operation;
export const CreateOrganizationsLocationsPosturesResponse = Operation;

export type CreateOrganizationsLocationsPosturesError = CommonErrors;

export const createOrganizationsLocationsPostures: API.OperationMethod<CreateOrganizationsLocationsPosturesRequest, CreateOrganizationsLocationsPosturesResponse, CreateOrganizationsLocationsPosturesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsPosturesRequest,
  output: CreateOrganizationsLocationsPosturesResponse,
  errors: [],
}));

/** Updates a revision of an existing Posture. If the posture revision that you update is currently deployed, then a new revision of the posture is created. To prevent concurrent updates from overwriting each other, always follow the read-modify-write pattern when you update a posture: 1. Call GetPosture to get the current version of the posture. 2. Update the fields in the posture as needed. 3. Call UpdatePosture to update the posture. Ensure that your request includes the `etag` value from the GetPosture response. **Important:** If you omit the `etag` when you call UpdatePosture, then the updated posture unconditionally overwrites the existing posture. */
export interface PatchOrganizationsLocationsPosturesRequest {
  /** Required. Identifier. The name of the posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. */
  name: string;
  /** Required. The fields in the Posture to update. You can update only the following fields: * Posture.description * Posture.policy_sets * Posture.state */
  updateMask?: string;
  /** Required. The revision ID of the posture to update. If the posture revision that you update is currently deployed, then a new revision of the posture is created. */
  revisionId?: string;
  /** Request body */
  body?: Posture;
}

export const PatchOrganizationsLocationsPosturesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  revisionId: Schema.optional(Schema.String).pipe(T.HttpQuery("revisionId")),
  body: Schema.optional(Posture).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/locations/{locationsId}/postures/{posturesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsPosturesRequest>;

export type PatchOrganizationsLocationsPosturesResponse = Operation;
export const PatchOrganizationsLocationsPosturesResponse = Operation;

export type PatchOrganizationsLocationsPosturesError = CommonErrors;

export const patchOrganizationsLocationsPostures: API.OperationMethod<PatchOrganizationsLocationsPosturesRequest, PatchOrganizationsLocationsPosturesResponse, PatchOrganizationsLocationsPosturesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsPosturesRequest,
  output: PatchOrganizationsLocationsPosturesResponse,
  errors: [],
}));

/** Deletes all revisions of a Posture. You can only delete a posture if none of its revisions are deployed. */
export interface DeleteOrganizationsLocationsPosturesRequest {
  /** Required. The name of the Posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. */
  name: string;
  /** Optional. An opaque identifier for the current version of the posture. If you provide this value, then it must match the existing value. If the values don't match, then the request fails with an ABORTED error. If you omit this value, then the posture is deleted regardless of its current `etag` value. */
  etag?: string;
}

export const DeleteOrganizationsLocationsPosturesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/locations/{locationsId}/postures/{posturesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsPosturesRequest>;

export type DeleteOrganizationsLocationsPosturesResponse = Operation;
export const DeleteOrganizationsLocationsPosturesResponse = Operation;

export type DeleteOrganizationsLocationsPosturesError = CommonErrors;

export const deleteOrganizationsLocationsPostures: API.OperationMethod<DeleteOrganizationsLocationsPosturesRequest, DeleteOrganizationsLocationsPosturesResponse, DeleteOrganizationsLocationsPosturesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsPosturesRequest,
  output: DeleteOrganizationsLocationsPosturesResponse,
  errors: [],
}));

/** Extracts existing policies from an organization, folder, or project, and applies them to another organization, folder, or project as a Posture. If the other organization, folder, or project already has a posture, then the result of the long-running operation is an ALREADY_EXISTS error. */
export interface ExtractOrganizationsLocationsPosturesRequest {
  /** Required. The parent resource name, in the format `organizations/{organization}/locations/global`. */
  parent: string;
  /** Request body */
  body?: ExtractPostureRequest;
}

export const ExtractOrganizationsLocationsPosturesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ExtractPostureRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/postures:extract", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExtractOrganizationsLocationsPosturesRequest>;

export type ExtractOrganizationsLocationsPosturesResponse = Operation;
export const ExtractOrganizationsLocationsPosturesResponse = Operation;

export type ExtractOrganizationsLocationsPosturesError = CommonErrors;

export const extractOrganizationsLocationsPostures: API.OperationMethod<ExtractOrganizationsLocationsPosturesRequest, ExtractOrganizationsLocationsPosturesResponse, ExtractOrganizationsLocationsPosturesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExtractOrganizationsLocationsPosturesRequest,
  output: ExtractOrganizationsLocationsPosturesResponse,
  errors: [],
}));

/** Lists every PostureDeployment in a project and location. */
export interface ListOrganizationsLocationsPostureDeploymentsRequest {
  /** Required. The parent resource name, in the format `organizations/{organization}/locations/global`. */
  parent: string;
  /** Optional. The maximum number of posture deployments to return. The default value is `500`. If you exceed the maximum value of `1000`, then the service uses the maximum value. */
  pageSize?: number;
  /** Optional. A pagination token returned from a previous request to list posture deployments. Provide this token to retrieve the next page of results. */
  pageToken?: string;
  /** Optional. A filter to apply to the list of postures, in the format defined in [AIP-160: Filtering](https://google.aip.dev/160). */
  filter?: string;
}

export const ListOrganizationsLocationsPostureDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/postureDeployments" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsPostureDeploymentsRequest>;

export type ListOrganizationsLocationsPostureDeploymentsResponse = ListPostureDeploymentsResponse;
export const ListOrganizationsLocationsPostureDeploymentsResponse = ListPostureDeploymentsResponse;

export type ListOrganizationsLocationsPostureDeploymentsError = CommonErrors;

export const listOrganizationsLocationsPostureDeployments = API.makePaginated(() => ({
  input: ListOrganizationsLocationsPostureDeploymentsRequest,
  output: ListOrganizationsLocationsPostureDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details for a PostureDeployment. */
export interface GetOrganizationsLocationsPostureDeploymentsRequest {
  /** Required. The name of the PostureDeployment, in the format `organizations/{organization}/locations/global/postureDeployments/{posture_deployment_id}`. */
  name: string;
}

export const GetOrganizationsLocationsPostureDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/postureDeployments/{postureDeploymentsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsPostureDeploymentsRequest>;

export type GetOrganizationsLocationsPostureDeploymentsResponse = PostureDeployment;
export const GetOrganizationsLocationsPostureDeploymentsResponse = PostureDeployment;

export type GetOrganizationsLocationsPostureDeploymentsError = CommonErrors;

export const getOrganizationsLocationsPostureDeployments: API.OperationMethod<GetOrganizationsLocationsPostureDeploymentsRequest, GetOrganizationsLocationsPostureDeploymentsResponse, GetOrganizationsLocationsPostureDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsPostureDeploymentsRequest,
  output: GetOrganizationsLocationsPostureDeploymentsResponse,
  errors: [],
}));

/** Creates a new PostureDeployment in a given project and location. */
export interface CreateOrganizationsLocationsPostureDeploymentsRequest {
  /** Required. The parent resource name, in the format `organizations/{organization}/locations/global`. */
  parent: string;
  /** Required. An identifier for the posture deployment. */
  postureDeploymentId?: string;
  /** Request body */
  body?: PostureDeployment;
}

export const CreateOrganizationsLocationsPostureDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  postureDeploymentId: Schema.optional(Schema.String).pipe(T.HttpQuery("postureDeploymentId")),
  body: Schema.optional(PostureDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/postureDeployments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsPostureDeploymentsRequest>;

export type CreateOrganizationsLocationsPostureDeploymentsResponse = Operation;
export const CreateOrganizationsLocationsPostureDeploymentsResponse = Operation;

export type CreateOrganizationsLocationsPostureDeploymentsError = CommonErrors;

export const createOrganizationsLocationsPostureDeployments: API.OperationMethod<CreateOrganizationsLocationsPostureDeploymentsRequest, CreateOrganizationsLocationsPostureDeploymentsResponse, CreateOrganizationsLocationsPostureDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsPostureDeploymentsRequest,
  output: CreateOrganizationsLocationsPostureDeploymentsResponse,
  errors: [],
}));

/** Updates an existing PostureDeployment. To prevent concurrent updates from overwriting each other, always follow the read-modify-write pattern when you update a posture deployment: 1. Call GetPostureDeployment to get the current version of the deployment. 2. Update the fields in the deployment as needed. 3. Call UpdatePostureDeployment to update the deployment. Ensure that your request includes the `etag` value from the GetPostureDeployment response. **Important:** If you omit the `etag` when you call UpdatePostureDeployment, then the updated deployment unconditionally overwrites the existing deployment. */
export interface PatchOrganizationsLocationsPostureDeploymentsRequest {
  /** Required. Identifier. The name of the posture deployment, in the format `organizations/{organization}/locations/global/postureDeployments/{deployment_id}`. */
  name: string;
  /** Required. The fields in the PostureDeployment to update. You can update only the following fields: * PostureDeployment.posture_id * PostureDeployment.posture_revision_id */
  updateMask?: string;
  /** Request body */
  body?: PostureDeployment;
}

export const PatchOrganizationsLocationsPostureDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(PostureDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/locations/{locationsId}/postureDeployments/{postureDeploymentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsPostureDeploymentsRequest>;

export type PatchOrganizationsLocationsPostureDeploymentsResponse = Operation;
export const PatchOrganizationsLocationsPostureDeploymentsResponse = Operation;

export type PatchOrganizationsLocationsPostureDeploymentsError = CommonErrors;

export const patchOrganizationsLocationsPostureDeployments: API.OperationMethod<PatchOrganizationsLocationsPostureDeploymentsRequest, PatchOrganizationsLocationsPostureDeploymentsResponse, PatchOrganizationsLocationsPostureDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsPostureDeploymentsRequest,
  output: PatchOrganizationsLocationsPostureDeploymentsResponse,
  errors: [],
}));

/** Deletes a PostureDeployment. */
export interface DeleteOrganizationsLocationsPostureDeploymentsRequest {
  /** Required. The name of the posture deployment, in the format `organizations/{organization}/locations/global/postureDeployments/{posture_id}`. */
  name: string;
  /** Optional. An opaque identifier for the current version of the posture deployment. If you provide this value, then it must match the existing value. If the values don't match, then the request fails with an ABORTED error. If you omit this value, then the posture deployment is deleted regardless of its current `etag` value. */
  etag?: string;
}

export const DeleteOrganizationsLocationsPostureDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/locations/{locationsId}/postureDeployments/{postureDeploymentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsPostureDeploymentsRequest>;

export type DeleteOrganizationsLocationsPostureDeploymentsResponse = Operation;
export const DeleteOrganizationsLocationsPostureDeploymentsResponse = Operation;

export type DeleteOrganizationsLocationsPostureDeploymentsError = CommonErrors;

export const deleteOrganizationsLocationsPostureDeployments: API.OperationMethod<DeleteOrganizationsLocationsPostureDeploymentsRequest, DeleteOrganizationsLocationsPostureDeploymentsResponse, DeleteOrganizationsLocationsPostureDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsPostureDeploymentsRequest,
  output: DeleteOrganizationsLocationsPostureDeploymentsResponse,
  errors: [],
}));

/** Lists every PostureTemplate in a given organization and location. */
export interface ListOrganizationsLocationsPostureTemplatesRequest {
  /** Required. The parent resource name, in the format `organizations/{organization}/locations/global`. */
  parent: string;
  /** Optional. The maximum number of posture templates to return. The default value is `500`. If you exceed the maximum value of `1000`, then the service uses the maximum value. */
  pageSize?: number;
  /** Optional. A pagination token returned from a previous request to list posture templates. Provide this token to retrieve the next page of results. */
  pageToken?: string;
  /** Optional. A filter to apply to the list of postures, in the format defined in [AIP-160: Filtering](https://google.aip.dev/160). */
  filter?: string;
}

export const ListOrganizationsLocationsPostureTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/postureTemplates" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsPostureTemplatesRequest>;

export type ListOrganizationsLocationsPostureTemplatesResponse = ListPostureTemplatesResponse;
export const ListOrganizationsLocationsPostureTemplatesResponse = ListPostureTemplatesResponse;

export type ListOrganizationsLocationsPostureTemplatesError = CommonErrors;

export const listOrganizationsLocationsPostureTemplates = API.makePaginated(() => ({
  input: ListOrganizationsLocationsPostureTemplatesRequest,
  output: ListOrganizationsLocationsPostureTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a single revision of a PostureTemplate. */
export interface GetOrganizationsLocationsPostureTemplatesRequest {
  /** Required. The name of the PostureTemplate, in the format `organizations/{organization}/locations/global/postureTemplates/{posture_template}`. */
  name: string;
  /** Optional. The posture template revision to retrieve. If not specified, the most recently updated revision is retrieved. */
  revisionId?: string;
}

export const GetOrganizationsLocationsPostureTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  revisionId: Schema.optional(Schema.String).pipe(T.HttpQuery("revisionId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/postureTemplates/{postureTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsPostureTemplatesRequest>;

export type GetOrganizationsLocationsPostureTemplatesResponse = PostureTemplate;
export const GetOrganizationsLocationsPostureTemplatesResponse = PostureTemplate;

export type GetOrganizationsLocationsPostureTemplatesError = CommonErrors;

export const getOrganizationsLocationsPostureTemplates: API.OperationMethod<GetOrganizationsLocationsPostureTemplatesRequest, GetOrganizationsLocationsPostureTemplatesResponse, GetOrganizationsLocationsPostureTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsPostureTemplatesRequest,
  output: GetOrganizationsLocationsPostureTemplatesResponse,
  errors: [],
}));

/** Lists every Report in a given organization and location. */
export interface ListOrganizationsLocationsReportsRequest {
  /** Required. The parent resource name, in the format `organizations/{organization}/locations/global`. */
  parent: string;
  /** Optional. The maximum number of reports to return. The default value is `500`. If you exceed the maximum value of `1000`, then the service uses the maximum value. */
  pageSize?: number;
  /** Optional. A pagination token returned from a previous request to list reports. Provide this token to retrieve the next page of results. */
  pageToken?: string;
  /** Optional. A filter to apply to the list of reports, in the format defined in [AIP-160: Filtering](https://google.aip.dev/160). */
  filter?: string;
}

export const ListOrganizationsLocationsReportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/reports" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsReportsRequest>;

export type ListOrganizationsLocationsReportsResponse = ListReportsResponse;
export const ListOrganizationsLocationsReportsResponse = ListReportsResponse;

export type ListOrganizationsLocationsReportsError = CommonErrors;

export const listOrganizationsLocationsReports = API.makePaginated(() => ({
  input: ListOrganizationsLocationsReportsRequest,
  output: ListOrganizationsLocationsReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details for a Report. */
export interface GetOrganizationsLocationsReportsRequest {
  /** Required. The name of the report, in the format `organizations/{organization}/locations/global/reports/{report_id}`. */
  name: string;
}

export const GetOrganizationsLocationsReportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/reports/{reportsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsReportsRequest>;

export type GetOrganizationsLocationsReportsResponse = Report;
export const GetOrganizationsLocationsReportsResponse = Report;

export type GetOrganizationsLocationsReportsError = CommonErrors;

export const getOrganizationsLocationsReports: API.OperationMethod<GetOrganizationsLocationsReportsRequest, GetOrganizationsLocationsReportsResponse, GetOrganizationsLocationsReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsReportsRequest,
  output: GetOrganizationsLocationsReportsResponse,
  errors: [],
}));

/** Validates a specified infrastructure-as-code (IaC) configuration, and creates a Report with the validation results. Only Terraform configurations are supported. Only modified assets are validated. */
export interface CreateIaCValidationReportOrganizationsLocationsReportsRequest {
  /** Required. The parent resource name, in the format `organizations/{organization}/locations/global`. */
  parent: string;
  /** Request body */
  body?: CreateIaCValidationReportRequest;
}

export const CreateIaCValidationReportOrganizationsLocationsReportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateIaCValidationReportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/reports:createIaCValidationReport", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateIaCValidationReportOrganizationsLocationsReportsRequest>;

export type CreateIaCValidationReportOrganizationsLocationsReportsResponse = Operation;
export const CreateIaCValidationReportOrganizationsLocationsReportsResponse = Operation;

export type CreateIaCValidationReportOrganizationsLocationsReportsError = CommonErrors;

export const createIaCValidationReportOrganizationsLocationsReports: API.OperationMethod<CreateIaCValidationReportOrganizationsLocationsReportsRequest, CreateIaCValidationReportOrganizationsLocationsReportsResponse, CreateIaCValidationReportOrganizationsLocationsReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateIaCValidationReportOrganizationsLocationsReportsRequest,
  output: CreateIaCValidationReportOrganizationsLocationsReportsResponse,
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

