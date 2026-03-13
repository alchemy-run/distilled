// ==========================================================================
// Security Posture API (securityposture v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
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

export interface Expr {
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      expression: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Property {
  /** Required. The name of the custom source property. */
  name?: string;
  /** Optional. The CEL expression for the value of the custom source property. For resource properties, you can return the value of the property or a string enclosed in quotation marks. */
  valueExpression?: Expr;
}

export const Property: Schema.Schema<Property> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      valueExpression: Schema.optional(Expr),
    }),
  ).annotate({ identifier: "Property" }) as any as Schema.Schema<Property>;

export interface CustomOutputSpec {
  /** Optional. The custom source properties that can appear in findings. */
  properties?: Array<Property>;
}

export const CustomOutputSpec: Schema.Schema<CustomOutputSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      properties: Schema.optional(Schema.Array(Property)),
    }),
  ).annotate({
    identifier: "CustomOutputSpec",
  }) as any as Schema.Schema<CustomOutputSpec>;

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      code: Schema.optional(Schema.Number),
      message: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      error: Schema.optional(Status),
      done: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      operations: Schema.optional(Schema.Array(Operation)),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface ComplianceStandard {
  /** Optional. The compliance standard that the policy helps enforce. For example, `NIST SP 800-53`. */
  standard?: string;
  /** Optional. The control in the compliance standard that the policy helps enforce. For example, `AC-3`. */
  control?: string;
}

export const ComplianceStandard: Schema.Schema<ComplianceStandard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      standard: Schema.optional(Schema.String),
      control: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ComplianceStandard",
  }) as any as Schema.Schema<ComplianceStandard>;

export interface ResourceSelector {
  /** Required. The resource types to run the detector on. Each custom module can specify up to 5 resource types. */
  resourceTypes?: Array<string>;
}

export const ResourceSelector: Schema.Schema<ResourceSelector> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceTypes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ResourceSelector",
  }) as any as Schema.Schema<ResourceSelector>;

export interface CustomConfig {
  /** Optional. Definitions of custom source properties to include in findings. */
  customOutput?: CustomOutputSpec;
  /** Required. The severity of findings generated by the custom module. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "CRITICAL"
    | "HIGH"
    | "MEDIUM"
    | "LOW"
    | (string & {});
  /** Required. An explanation of the steps that security teams can take to resolve the detected issue. The explanation appears in each finding. */
  recommendation?: string;
  /** Required. The Common Expression Language (CEL) expression to evaluate. When the expression evaluates to `true` for a resource, a finding is generated. */
  predicate?: Expr;
  /** Required. The resource types that the custom module operates on. */
  resourceSelector?: ResourceSelector;
  /** Optional. A description of the vulnerability or misconfiguration that the custom module detects. The description appears in each finding. Provide enough information to help an investigator understand the finding. The value must be enclosed in quotation marks. */
  description?: string;
}

export const CustomConfig: Schema.Schema<CustomConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customOutput: Schema.optional(CustomOutputSpec),
      severity: Schema.optional(Schema.String),
      recommendation: Schema.optional(Schema.String),
      predicate: Schema.optional(Expr),
      resourceSelector: Schema.optional(ResourceSelector),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomConfig",
  }) as any as Schema.Schema<CustomConfig>;

export interface SecurityHealthAnalyticsCustomModule {
  /** Whether the custom module is enabled at a specified level of the resource hierarchy. */
  moduleEnablementState?:
    | "ENABLEMENT_STATE_UNSPECIFIED"
    | "ENABLED"
    | "DISABLED"
    | (string & {});
  /** Optional. The display name of the custom module. This value is used as the finding category for all the asset violation findings that the custom module returns. The display name must contain between 1 and 128 alphanumeric characters or underscores, and it must start with a lowercase letter. */
  displayName?: string;
  /** Required. Configuration settings for the custom module. */
  config?: CustomConfig;
  /** Output only. Immutable. The unique identifier for the custom module. Contains 1 to 20 digits. */
  id?: string;
}

export const SecurityHealthAnalyticsCustomModule: Schema.Schema<SecurityHealthAnalyticsCustomModule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      moduleEnablementState: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      config: Schema.optional(CustomConfig),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SecurityHealthAnalyticsCustomModule",
  }) as any as Schema.Schema<SecurityHealthAnalyticsCustomModule>;

export interface ResourceTypes {
  /** Optional. The resource types we currently support. */
  included?: Array<string>;
}

export const ResourceTypes: Schema.Schema<ResourceTypes> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      included: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ResourceTypes",
  }) as any as Schema.Schema<ResourceTypes>;

export interface GoogleCloudSecuritypostureV1PolicyRuleStringValues {
  /** The allowed values for the constraint. */
  allowedValues?: Array<string>;
  /** The denied values for the constraint. */
  deniedValues?: Array<string>;
}

export const GoogleCloudSecuritypostureV1PolicyRuleStringValues: Schema.Schema<GoogleCloudSecuritypostureV1PolicyRuleStringValues> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      allowedValues: Schema.optional(Schema.Array(Schema.String)),
      deniedValues: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudSecuritypostureV1PolicyRuleStringValues",
  }) as any as Schema.Schema<GoogleCloudSecuritypostureV1PolicyRuleStringValues>;

export interface GoogleCloudSecuritypostureV1PolicyRule {
  /** Optional. The resource types policies can support, only used for managed constraints. Method type is `GOVERN_TAGS`. */
  resourceTypes?: ResourceTypes;
  /** Whether to allow any value for a list constraint. Valid only for list constraints. */
  allowAll?: boolean;
  /** Optional. Required for managed constraints if parameters are defined. Passes parameter values when policy enforcement is enabled. Ensure that parameter value types match those defined in the constraint definition. For example: ``` { "allowedLocations": ["us-east1", "us-west1"], "allowAll": true } ``` */
  parameters?: Record<string, unknown>;
  /** The allowed and denied values for a list constraint. Valid only for list constraints. */
  values?: GoogleCloudSecuritypostureV1PolicyRuleStringValues;
  /** Whether to deny all values for a list constraint. Valid only for list constraints. */
  denyAll?: boolean;
  /** Whether to enforce the constraint. Valid only for boolean constraints. */
  enforce?: boolean;
  /** A condition that determines whether this rule is used to evaluate the policy. When set, the google.type.Expr.expression field must contain 1 to 10 subexpressions, joined by the `||` or `&&` operators. Each subexpression must use the `resource.matchTag()`, `resource.matchTagId()`, `resource.hasTagKey()`, or `resource.hasTagKeyId()` Common Expression Language (CEL) function. The `resource.matchTag()` function takes the following arguments: * `key_name`: the namespaced name of the tag key, with the organization ID and a slash (`/`) as a prefix; for example, `123456789012/environment` * `value_name`: the short name of the tag value For example: `resource.matchTag('123456789012/environment, 'prod')` The `resource.matchTagId()` function takes the following arguments: * `key_id`: the permanent ID of the tag key; for example, `tagKeys/123456789012` * `value_id`: the permanent ID of the tag value; for example, `tagValues/567890123456` For example: `resource.matchTagId('tagKeys/123456789012', 'tagValues/567890123456')` The `resource.hasTagKey()` function takes the following argument: * `key_name`: the namespaced name of the tag key, with the organization ID and a slash (`/`) as a prefix; for example, `123456789012/environment` For example: `resource.hasTagKey('123456789012/environment')` The `resource.hasTagKeyId()` function takes the following arguments: * `key_id`: the permanent ID of the tag key; for example, `tagKeys/123456789012` For example: `resource.hasTagKeyId('tagKeys/123456789012')` */
  condition?: Expr;
}

export const GoogleCloudSecuritypostureV1PolicyRule: Schema.Schema<GoogleCloudSecuritypostureV1PolicyRule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceTypes: Schema.optional(ResourceTypes),
      allowAll: Schema.optional(Schema.Boolean),
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      values: Schema.optional(
        GoogleCloudSecuritypostureV1PolicyRuleStringValues,
      ),
      denyAll: Schema.optional(Schema.Boolean),
      enforce: Schema.optional(Schema.Boolean),
      condition: Schema.optional(Expr),
    }),
  ).annotate({
    identifier: "GoogleCloudSecuritypostureV1PolicyRule",
  }) as any as Schema.Schema<GoogleCloudSecuritypostureV1PolicyRule>;

export interface OrgPolicyConstraint {
  /** Required. A unique identifier for the constraint. */
  cannedConstraintId?: string;
  /** Required. The rules enforced by the constraint. */
  policyRules?: Array<GoogleCloudSecuritypostureV1PolicyRule>;
}

export const OrgPolicyConstraint: Schema.Schema<OrgPolicyConstraint> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cannedConstraintId: Schema.optional(Schema.String),
      policyRules: Schema.optional(
        Schema.Array(GoogleCloudSecuritypostureV1PolicyRule),
      ),
    }),
  ).annotate({
    identifier: "OrgPolicyConstraint",
  }) as any as Schema.Schema<OrgPolicyConstraint>;

export interface GoogleCloudSecuritypostureV1CustomConstraint {
  /** Immutable. The name of the constraint, in the format `organizations/{organization_id}/customConstraints/custom.{custom_constraint_id}`. For example, `organizations/123456789012/customConstraints/custom.createOnlyE2TypeVms`. Must contain 1 to 62 characters, excluding the prefix `organizations/{organization_id}/customConstraints/custom.`. */
  name?: string;
  /** A description of the constraint. The maximum length is 2000 characters. */
  description?: string;
  /** A Common Expression Language (CEL) condition expression that must evaluate to `true` for the constraint to be enforced. The maximum length is 1000 characters. For example: + `resource.instanceName.matches('(production|test)_(.+_)?[\d]+')`: Evaluates to `true` if the resource's `instanceName` attribute contains the following: + The prefix `production` or `test` + An underscore (`_`) + Optional: One or more characters, followed by an underscore (`_`) + One or more digits + `resource.management.auto_upgrade == true`: Evaluates to `true` if the resource's `management.auto_upgrade` attribute is `true`. */
  condition?: string;
  /** Immutable. The resource type that the constraint applies to, in the format `{canonical_service_name}/{resource_type_name}`. For example, `compute.googleapis.com/Instance`. */
  resourceTypes?: Array<string>;
  /** Whether to allow or deny the action. */
  actionType?: "ACTION_TYPE_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  /** Output only. The last time at which the constraint was updated or created. */
  updateTime?: string;
  /** The types of operations that the constraint applies to. */
  methodTypes?: Array<
    "METHOD_TYPE_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | (string & {})
  >;
  /** A display name for the constraint. The maximum length is 200 characters. */
  displayName?: string;
}

export const GoogleCloudSecuritypostureV1CustomConstraint: Schema.Schema<GoogleCloudSecuritypostureV1CustomConstraint> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      condition: Schema.optional(Schema.String),
      resourceTypes: Schema.optional(Schema.Array(Schema.String)),
      actionType: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      methodTypes: Schema.optional(Schema.Array(Schema.String)),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudSecuritypostureV1CustomConstraint",
  }) as any as Schema.Schema<GoogleCloudSecuritypostureV1CustomConstraint>;

export interface OrgPolicyConstraintCustom {
  /** Required. Metadata for the constraint. */
  customConstraint?: GoogleCloudSecuritypostureV1CustomConstraint;
  /** Required. The rules enforced by the constraint. */
  policyRules?: Array<GoogleCloudSecuritypostureV1PolicyRule>;
}

export const OrgPolicyConstraintCustom: Schema.Schema<OrgPolicyConstraintCustom> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customConstraint: Schema.optional(
        GoogleCloudSecuritypostureV1CustomConstraint,
      ),
      policyRules: Schema.optional(
        Schema.Array(GoogleCloudSecuritypostureV1PolicyRule),
      ),
    }),
  ).annotate({
    identifier: "OrgPolicyConstraintCustom",
  }) as any as Schema.Schema<OrgPolicyConstraintCustom>;

export interface SecurityHealthAnalyticsModule {
  /** Whether the detector is enabled at a specified level of the resource hierarchy. */
  moduleEnablementState?:
    | "ENABLEMENT_STATE_UNSPECIFIED"
    | "ENABLED"
    | "DISABLED"
    | (string & {});
  /** Required. The name of the detector. For example, `BIGQUERY_TABLE_CMEK_DISABLED`. This field is also used as the finding category for all the asset violation findings that the detector returns. */
  moduleName?: string;
}

export const SecurityHealthAnalyticsModule: Schema.Schema<SecurityHealthAnalyticsModule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      moduleEnablementState: Schema.optional(Schema.String),
      moduleName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SecurityHealthAnalyticsModule",
  }) as any as Schema.Schema<SecurityHealthAnalyticsModule>;

export interface Constraint {
  /** Optional. A custom module for Security Health Analytics. */
  securityHealthAnalyticsCustomModule?: SecurityHealthAnalyticsCustomModule;
  /** Optional. A predefined organization policy constraint. */
  orgPolicyConstraint?: OrgPolicyConstraint;
  /** Optional. A custom organization policy constraint. */
  orgPolicyConstraintCustom?: OrgPolicyConstraintCustom;
  /** Optional. A built-in detector for Security Health Analytics. */
  securityHealthAnalyticsModule?: SecurityHealthAnalyticsModule;
}

export const Constraint: Schema.Schema<Constraint> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      securityHealthAnalyticsCustomModule: Schema.optional(
        SecurityHealthAnalyticsCustomModule,
      ),
      orgPolicyConstraint: Schema.optional(OrgPolicyConstraint),
      orgPolicyConstraintCustom: Schema.optional(OrgPolicyConstraintCustom),
      securityHealthAnalyticsModule: Schema.optional(
        SecurityHealthAnalyticsModule,
      ),
    }),
  ).annotate({ identifier: "Constraint" }) as any as Schema.Schema<Constraint>;

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

export const Policy: Schema.Schema<Policy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      policyId: Schema.optional(Schema.String),
      complianceStandards: Schema.optional(Schema.Array(ComplianceStandard)),
      constraint: Schema.optional(Constraint),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface PolicySet {
  /** Optional. A description of the policy set. */
  description?: string;
  /** Required. An identifier for the policy set. */
  policySetId?: string;
  /** Required. The Policy resources in the policy set. Each policy must have a policy_id that's unique within the policy set. */
  policies?: Array<Policy>;
}

export const PolicySet: Schema.Schema<PolicySet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      policySetId: Schema.optional(Schema.String),
      policies: Schema.optional(Schema.Array(Policy)),
    }),
  ).annotate({ identifier: "PolicySet" }) as any as Schema.Schema<PolicySet>;

export interface Posture {
  /** Optional. An opaque identifier for the current version of the posture at the specified `revision_id`. To prevent concurrent updates from overwriting each other, always provide the `etag` when you update a posture. You can also provide the `etag` when you delete a posture, to help ensure that you're deleting the intended version of the posture. */
  etag?: string;
  /** Output only. Whether the posture is in the process of being updated. */
  reconciling?: boolean;
  /** Output only. The time at which the posture was last updated. */
  updateTime?: string;
  /** Optional. The user-specified annotations for the posture. For details about the values you can use in an annotation, see [AIP-148: Standard fields](https://google.aip.dev/148#annotations). */
  annotations?: Record<string, string>;
  /** Required. Identifier. The name of the posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. */
  name?: string;
  /** Optional. A description of the posture. */
  description?: string;
  /** Output only. The categories that the posture belongs to, as determined by the Security Posture API. */
  categories?: Array<
    "CATEGORY_UNSPECIFIED" | "AI" | "AWS" | "GCP" | "AZURE" | (string & {})
  >;
  /** Output only. Immutable. An opaque eight-character string that identifies the revision of the posture. A posture can have multiple revisions; when you deploy a posture, you deploy a specific revision of the posture. */
  revisionId?: string;
  /** Output only. The time at which the posture was created. */
  createTime?: string;
  /** Required. The PolicySet resources that the posture includes. */
  policySets?: Array<PolicySet>;
  /** Required. The state of the posture at the specified `revision_id`. */
  state?:
    | "STATE_UNSPECIFIED"
    | "DEPRECATED"
    | "DRAFT"
    | "ACTIVE"
    | (string & {});
}

export const Posture: Schema.Schema<Posture> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      reconciling: Schema.optional(Schema.Boolean),
      updateTime: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      categories: Schema.optional(Schema.Array(Schema.String)),
      revisionId: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      policySets: Schema.optional(Schema.Array(PolicySet)),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Posture" }) as any as Schema.Schema<Posture>;

export interface ListPosturesResponse {
  /** A pagination token. To retrieve the next page of results, call the method again with this token. */
  nextPageToken?: string;
  /** Locations that were temporarily unavailable and could not be reached. */
  unreachable?: Array<string>;
  /** The list of Posture resources. */
  postures?: Array<Posture>;
}

export const ListPosturesResponse: Schema.Schema<ListPosturesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      postures: Schema.optional(Schema.Array(Posture)),
    }),
  ).annotate({
    identifier: "ListPosturesResponse",
  }) as any as Schema.Schema<ListPosturesResponse>;

export interface CancelOperationRequest {}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelOperationRequest",
  }) as any as Schema.Schema<CancelOperationRequest>;

export interface PolicyDetails {
  /** Information about the constraint that was violated. The format of this information can change at any time without prior notice. Your application must not depend on this information in any way. */
  constraint?: string;
  /** A description of the policy. */
  description?: string;
  /** The type of constraint that was violated. */
  constraintType?:
    | "CONSTRAINT_TYPE_UNSPECIFIED"
    | "SECURITY_HEALTH_ANALYTICS_CUSTOM_MODULE"
    | "ORG_POLICY_CUSTOM"
    | "SECURITY_HEALTH_ANALYTICS_MODULE"
    | "ORG_POLICY"
    | "REGO_POLICY"
    | (string & {});
  /** The compliance standards that the policy maps to. For example, `CIS-2.0 1.15`. */
  complianceStandards?: Array<string>;
}

export const PolicyDetails: Schema.Schema<PolicyDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      constraint: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      constraintType: Schema.optional(Schema.String),
      complianceStandards: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "PolicyDetails",
  }) as any as Schema.Schema<PolicyDetails>;

export interface AssetDetails {
  /** Information about the Cloud Asset Inventory asset that violated a policy. The format of this information can change at any time without prior notice. Your application must not depend on this information in any way. */
  asset?: string;
  /** The type of Cloud Asset Inventory asset. For a list of asset types, see [Supported asset types](https://cloud.google.com/asset-inventory/docs/supported-asset-types). */
  assetType?: string;
}

export const AssetDetails: Schema.Schema<AssetDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      asset: Schema.optional(Schema.String),
      assetType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AssetDetails",
  }) as any as Schema.Schema<AssetDetails>;

export interface PostureDetails {
  /** The organization, folder, or project where the posture is deployed. Uses one of the following formats: * `organizations/{organization_number}` * `folders/{folder_number}` * `projects/{project_number}` */
  postureDeploymentTargetResource?: string;
  /** The revision ID of the posture used in the deployment. */
  postureRevisionId?: string;
  /** The name of the posture deployment, in the format `organizations/{organization}/locations/global/postureDeployments/{deployment_id}`. */
  postureDeployment?: string;
  /** The posture used in the deployment, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. */
  posture?: string;
  /** The identifier for the PolicySet that the relevant policy belongs to. */
  policySet?: string;
}

export const PostureDetails: Schema.Schema<PostureDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      postureDeploymentTargetResource: Schema.optional(Schema.String),
      postureRevisionId: Schema.optional(Schema.String),
      postureDeployment: Schema.optional(Schema.String),
      posture: Schema.optional(Schema.String),
      policySet: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PostureDetails",
  }) as any as Schema.Schema<PostureDetails>;

export interface Violation {
  /** The severity of the violation. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "CRITICAL"
    | "HIGH"
    | "MEDIUM"
    | "LOW"
    | (string & {});
  /** The full resource name of the asset that caused the violation. For details about the format of the full resource name for each asset type, see [Resource name format](https://cloud.google.com/asset-inventory/docs/resource-name-format). */
  assetId?: string;
  /** The policy that was violated. */
  policyId?: string;
  /** Details of the Cloud Asset Inventory asset that caused the violation. */
  violatedAsset?: AssetDetails;
  /** Details for the posture that was violated. This field is present only if the violated policy belongs to a deployed posture. */
  violatedPosture?: PostureDetails;
  /** A description of the steps that you can take to fix the violation. */
  nextSteps?: string;
  /** Details of the policy that was violated. */
  violatedPolicy?: PolicyDetails;
}

export const Violation: Schema.Schema<Violation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      severity: Schema.optional(Schema.String),
      assetId: Schema.optional(Schema.String),
      policyId: Schema.optional(Schema.String),
      violatedAsset: Schema.optional(AssetDetails),
      violatedPosture: Schema.optional(PostureDetails),
      nextSteps: Schema.optional(Schema.String),
      violatedPolicy: Schema.optional(PolicyDetails),
    }),
  ).annotate({ identifier: "Violation" }) as any as Schema.Schema<Violation>;

export interface OperationMetadata {
  /** Output only. The name of the action executed by the operation. */
  verb?: string;
  /** Output only. The time at which the operation was created. */
  createTime?: string;
  /** Output only. The time at which the operation finished running. */
  endTime?: string;
  /** Output only. The server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. An error message. Returned when a PostureDeployment enters a failure state like UPDATE_FAILED. */
  errorMessage?: string;
  /** Output only. Whether a request to cancel the operation has been received. For operations that have been cancelled successfully, the Operation.error field contains the error code CANCELLED. */
  requestedCancellation?: boolean;
  /** Output only. The status of the operation, if any. */
  statusMessage?: string;
  /** Output only. The API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      verb: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      errorMessage: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
      statusMessage: Schema.optional(Schema.String),
      apiVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OperationMetadata",
  }) as any as Schema.Schema<OperationMetadata>;

export interface SeverityCountThreshold {
  /** Optional. If violation count meets or exceeds this threshold, validation fails. */
  thresholdCount?: number;
  /** Optional. The severity level, reusing the existing Violation.Severity. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "CRITICAL"
    | "HIGH"
    | "MEDIUM"
    | "LOW"
    | (string & {});
}

export const SeverityCountThreshold: Schema.Schema<SeverityCountThreshold> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      thresholdCount: Schema.optional(Schema.Number),
      severity: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SeverityCountThreshold",
  }) as any as Schema.Schema<SeverityCountThreshold>;

export interface IacValidationFailureCriteria {
  /** Output only. The time at which the resource was last updated. */
  updateTime?: string;
  /** Identifier. The resource name of the IacValidationFailureCriteria. Format: organizations/{organization}/locations/{location}/iacValidationFailureCriteria */
  name?: string;
  /** Optional. A list of severity thresholds. An IaC validation fails if any threshold is exceeded. */
  severityCountThresholds?: Array<SeverityCountThreshold>;
  /** Optional. The etag for optimistic concurrency. */
  etag?: string;
  /** Output only. The time at which the resource was created. */
  createTime?: string;
}

export const IacValidationFailureCriteria: Schema.Schema<IacValidationFailureCriteria> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      updateTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      severityCountThresholds: Schema.optional(
        Schema.Array(SeverityCountThreshold),
      ),
      etag: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "IacValidationFailureCriteria",
  }) as any as Schema.Schema<IacValidationFailureCriteria>;

export interface PostureTemplate {
  /** Output only. A string that identifies the revision of the posture template. */
  revisionId?: string;
  /** Output only. The PolicySet resources that the posture template includes. */
  policySets?: Array<PolicySet>;
  /** Output only. Identifier. The name of the posture template, in the format `organizations/{organization}/locations/global/postureTemplates/{posture_template}`. */
  name?: string;
  /** Output only. A description of the posture template. */
  description?: string;
  /** Output only. The categories that the posture template belongs to, as determined by the Security Posture API. */
  categories?: Array<
    "CATEGORY_UNSPECIFIED" | "AI" | "AWS" | "GCP" | "AZURE" | (string & {})
  >;
  /** Output only. The state of the posture template at the specified `revision_id`. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DEPRECATED" | (string & {});
}

export const PostureTemplate: Schema.Schema<PostureTemplate> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      revisionId: Schema.optional(Schema.String),
      policySets: Schema.optional(Schema.Array(PolicySet)),
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      categories: Schema.optional(Schema.Array(Schema.String)),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PostureTemplate",
  }) as any as Schema.Schema<PostureTemplate>;

export interface ListPostureTemplatesResponse {
  /** The list of PostureTemplate resources. */
  postureTemplates?: Array<PostureTemplate>;
  /** A pagination token. To retrieve the next page of results, call the method again with this token. */
  nextPageToken?: string;
}

export const ListPostureTemplatesResponse: Schema.Schema<ListPostureTemplatesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      postureTemplates: Schema.optional(Schema.Array(PostureTemplate)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListPostureTemplatesResponse",
  }) as any as Schema.Schema<ListPostureTemplatesResponse>;

export interface IaC {
  /** Optional. A Terraform plan file, formatted as a stringified JSON object. To learn how to generate a Terraform plan file in JSON format, see [JSON output format](https://developer.hashicorp.com/terraform/internals/json-format) in the Terraform documentation. */
  tfPlan?: string;
}

export const IaC: Schema.Schema<IaC> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tfPlan: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "IaC" }) as any as Schema.Schema<IaC>;

export interface CreateIaCValidationReportRequest {
  /** Required. The infrastructure-as-code (IaC) configuration to validate. */
  iac?: IaC;
}

export const CreateIaCValidationReportRequest: Schema.Schema<CreateIaCValidationReportRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      iac: Schema.optional(IaC),
    }),
  ).annotate({
    identifier: "CreateIaCValidationReportRequest",
  }) as any as Schema.Schema<CreateIaCValidationReportRequest>;

export interface Location {
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
}

export const Location: Schema.Schema<Location> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      locationId: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(Location)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListLocationsResponse",
  }) as any as Schema.Schema<ListLocationsResponse>;

export interface IaCValidationReport {
  /** Additional information about the report. */
  note?: string;
  /** A list of every Violation found in the IaC configuration. */
  violations?: Array<Violation>;
}

export const IaCValidationReport: Schema.Schema<IaCValidationReport> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      note: Schema.optional(Schema.String),
      violations: Schema.optional(Schema.Array(Violation)),
    }),
  ).annotate({
    identifier: "IaCValidationReport",
  }) as any as Schema.Schema<IaCValidationReport>;

export interface PostureDeployment {
  /** Optional. An opaque identifier for the current version of the posture deployment. To prevent concurrent updates from overwriting each other, always provide the `etag` when you update a posture deployment. You can also provide the `etag` when you delete a posture deployment, to help ensure that you're deleting the intended posture deployment. */
  etag?: string;
  /** Output only. Whether the posture deployment is in the process of being updated. */
  reconciling?: boolean;
  /** Optional. The user-specified annotations for the posture deployment. For details about the values you can use in an annotation, see [AIP-148: Standard fields](https://google.aip.dev/148#annotations). */
  annotations?: Record<string, string>;
  /** Output only. The posture ID that was specified for the deployment. Present only if the posture deployment is in a failed state. */
  desiredPostureId?: string;
  /** Output only. The categories that the posture deployment belongs to, as determined by the Security Posture API. */
  categories?: Array<
    "CATEGORY_UNSPECIFIED" | "AI" | "AWS" | "GCP" | "AZURE" | (string & {})
  >;
  /** Required. Identifier. The name of the posture deployment, in the format `organizations/{organization}/locations/global/postureDeployments/{deployment_id}`. */
  name?: string;
  /** Output only. A description of why the posture deployment failed. Present only if the deployment is in a failed state. */
  failureMessage?: string;
  /** Output only. The state of the posture deployment. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "DELETING"
    | "UPDATING"
    | "ACTIVE"
    | "CREATE_FAILED"
    | "UPDATE_FAILED"
    | "DELETE_FAILED"
    | (string & {});
  /** Required. The posture used in the deployment, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. */
  postureId?: string;
  /** Required. The revision ID of the posture used in the deployment. */
  postureRevisionId?: string;
  /** Output only. The time at which the posture deployment was last updated. */
  updateTime?: string;
  /** Output only. The revision ID of the posture that was specified for the deployment. Present only if the deployment is in a failed state. */
  desiredPostureRevisionId?: string;
  /** Optional. A description of the posture deployment. */
  description?: string;
  /** Output only. The time at which the posture deployment was created. */
  createTime?: string;
  /** Required. The organization, folder, or project where the posture is deployed. Uses one of the following formats: * `organizations/{organization_number}` * `folders/{folder_number}` * `projects/{project_number}` */
  targetResource?: string;
}

export const PostureDeployment: Schema.Schema<PostureDeployment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      reconciling: Schema.optional(Schema.Boolean),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      desiredPostureId: Schema.optional(Schema.String),
      categories: Schema.optional(Schema.Array(Schema.String)),
      name: Schema.optional(Schema.String),
      failureMessage: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      postureId: Schema.optional(Schema.String),
      postureRevisionId: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      desiredPostureRevisionId: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      targetResource: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PostureDeployment",
  }) as any as Schema.Schema<PostureDeployment>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface ExtractPostureRequest {
  /** Required. An identifier for the posture. */
  postureId?: string;
  /** Required. The organization, folder, or project from which policies are extracted. Must be within the organization defined in parent. Use one of the following formats: * `organization/{organization_number}` * `folder/{folder_number}` * `project/{project_number}` */
  workload?: string;
}

export const ExtractPostureRequest: Schema.Schema<ExtractPostureRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      postureId: Schema.optional(Schema.String),
      workload: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExtractPostureRequest",
  }) as any as Schema.Schema<ExtractPostureRequest>;

export interface Report {
  /** Output only. The time at which the report was created. */
  createTime?: string;
  /** Output only. The time at which the report was last updated. */
  updateTime?: string;
  /** Output only. An infrastructure-as-code (IaC) validation report. */
  iacValidationReport?: IaCValidationReport;
  /** Required. The name of the report, in the format `organizations/{organization}/locations/global/reports/{report_id}`. */
  name?: string;
}

export const Report: Schema.Schema<Report> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      iacValidationReport: Schema.optional(IaCValidationReport),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Report" }) as any as Schema.Schema<Report>;

export interface ListReportsResponse {
  /** The list of Report resources. */
  reports?: Array<Report>;
  /** Locations that were temporarily unavailable and could not be reached. */
  unreachable?: Array<string>;
  /** A pagination token. To retrieve the next page of results, call the method again with this token. */
  nextPageToken?: string;
}

export const ListReportsResponse: Schema.Schema<ListReportsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reports: Schema.optional(Schema.Array(Report)),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListReportsResponse",
  }) as any as Schema.Schema<ListReportsResponse>;

export interface ListPostureRevisionsResponse {
  /** The list of revisions for the Posture. */
  revisions?: Array<Posture>;
  /** A pagination token. To retrieve the next page of results, call the method again with this token. */
  nextPageToken?: string;
}

export const ListPostureRevisionsResponse: Schema.Schema<ListPostureRevisionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      revisions: Schema.optional(Schema.Array(Posture)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListPostureRevisionsResponse",
  }) as any as Schema.Schema<ListPostureRevisionsResponse>;

export interface ListPostureDeploymentsResponse {
  /** A pagination token. To retrieve the next page of results, call the method again with this token. */
  nextPageToken?: string;
  /** Locations that were temporarily unavailable and could not be reached. */
  unreachable?: Array<string>;
  /** The list of PostureDeployment resources. */
  postureDeployments?: Array<PostureDeployment>;
}

export const ListPostureDeploymentsResponse: Schema.Schema<ListPostureDeploymentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      postureDeployments: Schema.optional(Schema.Array(PostureDeployment)),
    }),
  ).annotate({
    identifier: "ListPostureDeploymentsResponse",
  }) as any as Schema.Schema<ListPostureDeploymentsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
}

export const ListProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("extraLocationTypes"),
    ),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<
  ListProjectsLocationsRequest,
  ListProjectsLocationsResponse,
  ListProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Location;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<
  GetProjectsLocationsRequest,
  GetProjectsLocationsResponse,
  GetProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

export interface DeleteOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOrganizationsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteOrganizationsLocationsOperationsRequest>;

export type DeleteOrganizationsLocationsOperationsResponse = Empty;
export const DeleteOrganizationsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteOrganizationsLocationsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteOrganizationsLocationsOperations: API.OperationMethod<
  DeleteOrganizationsLocationsOperationsRequest,
  DeleteOrganizationsLocationsOperationsResponse,
  DeleteOrganizationsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteOrganizationsLocationsOperationsRequest,
  output: DeleteOrganizationsLocationsOperationsResponse,
  errors: [],
}));

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

export const ListOrganizationsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListOrganizationsLocationsOperationsRequest>;

export type ListOrganizationsLocationsOperationsResponse =
  ListOperationsResponse;
export const ListOrganizationsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListOperationsResponse;

export type ListOrganizationsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listOrganizationsLocationsOperations: API.PaginatedOperationMethod<
  ListOrganizationsLocationsOperationsRequest,
  ListOrganizationsLocationsOperationsResponse,
  ListOrganizationsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationsLocationsOperationsRequest,
  output: ListOrganizationsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CancelOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelOrganizationsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelOrganizationsLocationsOperationsRequest>;

export type CancelOrganizationsLocationsOperationsResponse = Empty;
export const CancelOrganizationsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type CancelOrganizationsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelOrganizationsLocationsOperations: API.OperationMethod<
  CancelOrganizationsLocationsOperationsRequest,
  CancelOrganizationsLocationsOperationsResponse,
  CancelOrganizationsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelOrganizationsLocationsOperationsRequest,
  output: CancelOrganizationsLocationsOperationsResponse,
  errors: [],
}));

export interface GetOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOrganizationsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetOrganizationsLocationsOperationsRequest>;

export type GetOrganizationsLocationsOperationsResponse = Operation;
export const GetOrganizationsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetOrganizationsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getOrganizationsLocationsOperations: API.OperationMethod<
  GetOrganizationsLocationsOperationsRequest,
  GetOrganizationsLocationsOperationsResponse,
  GetOrganizationsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOrganizationsLocationsOperationsRequest,
  output: GetOrganizationsLocationsOperationsResponse,
  errors: [],
}));

export interface ListOrganizationsLocationsPostureTemplatesRequest {
  /** Optional. A pagination token returned from a previous request to list posture templates. Provide this token to retrieve the next page of results. */
  pageToken?: string;
  /** Required. The parent resource name, in the format `organizations/{organization}/locations/global`. */
  parent: string;
  /** Optional. The maximum number of posture templates to return. The default value is `500`. If you exceed the maximum value of `1000`, then the service uses the maximum value. */
  pageSize?: number;
  /** Optional. A filter to apply to the list of postures, in the format defined in [AIP-160: Filtering](https://google.aip.dev/160). */
  filter?: string;
}

export const ListOrganizationsLocationsPostureTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/postureTemplates",
    }),
    svc,
  ) as unknown as Schema.Schema<ListOrganizationsLocationsPostureTemplatesRequest>;

export type ListOrganizationsLocationsPostureTemplatesResponse =
  ListPostureTemplatesResponse;
export const ListOrganizationsLocationsPostureTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListPostureTemplatesResponse;

export type ListOrganizationsLocationsPostureTemplatesError = DefaultErrors;

/** Lists every PostureTemplate in a given organization and location. */
export const listOrganizationsLocationsPostureTemplates: API.PaginatedOperationMethod<
  ListOrganizationsLocationsPostureTemplatesRequest,
  ListOrganizationsLocationsPostureTemplatesResponse,
  ListOrganizationsLocationsPostureTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationsLocationsPostureTemplatesRequest,
  output: ListOrganizationsLocationsPostureTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetOrganizationsLocationsPostureTemplatesRequest {
  /** Required. The name of the PostureTemplate, in the format `organizations/{organization}/locations/global/postureTemplates/{posture_template}`. */
  name: string;
  /** Optional. The posture template revision to retrieve. If not specified, the most recently updated revision is retrieved. */
  revisionId?: string;
}

export const GetOrganizationsLocationsPostureTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    revisionId: Schema.optional(Schema.String).pipe(T.HttpQuery("revisionId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/postureTemplates/{postureTemplatesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetOrganizationsLocationsPostureTemplatesRequest>;

export type GetOrganizationsLocationsPostureTemplatesResponse = PostureTemplate;
export const GetOrganizationsLocationsPostureTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ PostureTemplate;

export type GetOrganizationsLocationsPostureTemplatesError = DefaultErrors;

/** Gets a single revision of a PostureTemplate. */
export const getOrganizationsLocationsPostureTemplates: API.OperationMethod<
  GetOrganizationsLocationsPostureTemplatesRequest,
  GetOrganizationsLocationsPostureTemplatesResponse,
  GetOrganizationsLocationsPostureTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOrganizationsLocationsPostureTemplatesRequest,
  output: GetOrganizationsLocationsPostureTemplatesResponse,
  errors: [],
}));

export interface CreateIaCValidationReportOrganizationsLocationsReportsRequest {
  /** Required. The parent resource name, in the format `organizations/{organization}/locations/global`. */
  parent: string;
  /** Request body */
  body?: CreateIaCValidationReportRequest;
}

export const CreateIaCValidationReportOrganizationsLocationsReportsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(CreateIaCValidationReportRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/reports:createIaCValidationReport",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateIaCValidationReportOrganizationsLocationsReportsRequest>;

export type CreateIaCValidationReportOrganizationsLocationsReportsResponse =
  Operation;
export const CreateIaCValidationReportOrganizationsLocationsReportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateIaCValidationReportOrganizationsLocationsReportsError =
  DefaultErrors;

/** Validates a specified infrastructure-as-code (IaC) configuration, and creates a Report with the validation results. Only Terraform configurations are supported. Only modified assets are validated. */
export const createIaCValidationReportOrganizationsLocationsReports: API.OperationMethod<
  CreateIaCValidationReportOrganizationsLocationsReportsRequest,
  CreateIaCValidationReportOrganizationsLocationsReportsResponse,
  CreateIaCValidationReportOrganizationsLocationsReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateIaCValidationReportOrganizationsLocationsReportsRequest,
  output: CreateIaCValidationReportOrganizationsLocationsReportsResponse,
  errors: [],
}));

export interface ListOrganizationsLocationsReportsRequest {
  /** Optional. The maximum number of reports to return. The default value is `500`. If you exceed the maximum value of `1000`, then the service uses the maximum value. */
  pageSize?: number;
  /** Optional. A filter to apply to the list of reports, in the format defined in [AIP-160: Filtering](https://google.aip.dev/160). */
  filter?: string;
  /** Optional. A pagination token returned from a previous request to list reports. Provide this token to retrieve the next page of results. */
  pageToken?: string;
  /** Required. The parent resource name, in the format `organizations/{organization}/locations/global`. */
  parent: string;
}

export const ListOrganizationsLocationsReportsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/reports",
    }),
    svc,
  ) as unknown as Schema.Schema<ListOrganizationsLocationsReportsRequest>;

export type ListOrganizationsLocationsReportsResponse = ListReportsResponse;
export const ListOrganizationsLocationsReportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListReportsResponse;

export type ListOrganizationsLocationsReportsError = DefaultErrors;

/** Lists every Report in a given organization and location. */
export const listOrganizationsLocationsReports: API.PaginatedOperationMethod<
  ListOrganizationsLocationsReportsRequest,
  ListOrganizationsLocationsReportsResponse,
  ListOrganizationsLocationsReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationsLocationsReportsRequest,
  output: ListOrganizationsLocationsReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetOrganizationsLocationsReportsRequest {
  /** Required. The name of the report, in the format `organizations/{organization}/locations/global/reports/{report_id}`. */
  name: string;
}

export const GetOrganizationsLocationsReportsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/reports/{reportsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetOrganizationsLocationsReportsRequest>;

export type GetOrganizationsLocationsReportsResponse = Report;
export const GetOrganizationsLocationsReportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Report;

export type GetOrganizationsLocationsReportsError = DefaultErrors;

/** Gets details for a Report. */
export const getOrganizationsLocationsReports: API.OperationMethod<
  GetOrganizationsLocationsReportsRequest,
  GetOrganizationsLocationsReportsResponse,
  GetOrganizationsLocationsReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOrganizationsLocationsReportsRequest,
  output: GetOrganizationsLocationsReportsResponse,
  errors: [],
}));

export interface DeleteOrganizationsLocationsPostureDeploymentsRequest {
  /** Required. The name of the posture deployment, in the format `organizations/{organization}/locations/global/postureDeployments/{posture_id}`. */
  name: string;
  /** Optional. An opaque identifier for the current version of the posture deployment. If you provide this value, then it must match the existing value. If the values don't match, then the request fails with an ABORTED error. If you omit this value, then the posture deployment is deleted regardless of its current `etag` value. */
  etag?: string;
}

export const DeleteOrganizationsLocationsPostureDeploymentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/postureDeployments/{postureDeploymentsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteOrganizationsLocationsPostureDeploymentsRequest>;

export type DeleteOrganizationsLocationsPostureDeploymentsResponse = Operation;
export const DeleteOrganizationsLocationsPostureDeploymentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteOrganizationsLocationsPostureDeploymentsError = DefaultErrors;

/** Deletes a PostureDeployment. */
export const deleteOrganizationsLocationsPostureDeployments: API.OperationMethod<
  DeleteOrganizationsLocationsPostureDeploymentsRequest,
  DeleteOrganizationsLocationsPostureDeploymentsResponse,
  DeleteOrganizationsLocationsPostureDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteOrganizationsLocationsPostureDeploymentsRequest,
  output: DeleteOrganizationsLocationsPostureDeploymentsResponse,
  errors: [],
}));

export interface PatchOrganizationsLocationsPostureDeploymentsRequest {
  /** Required. The fields in the PostureDeployment to update. You can update only the following fields: * PostureDeployment.posture_id * PostureDeployment.posture_revision_id */
  updateMask?: string;
  /** Required. Identifier. The name of the posture deployment, in the format `organizations/{organization}/locations/global/postureDeployments/{deployment_id}`. */
  name: string;
  /** Request body */
  body?: PostureDeployment;
}

export const PatchOrganizationsLocationsPostureDeploymentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(PostureDeployment).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/postureDeployments/{postureDeploymentsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchOrganizationsLocationsPostureDeploymentsRequest>;

export type PatchOrganizationsLocationsPostureDeploymentsResponse = Operation;
export const PatchOrganizationsLocationsPostureDeploymentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchOrganizationsLocationsPostureDeploymentsError = DefaultErrors;

/** Updates an existing PostureDeployment. To prevent concurrent updates from overwriting each other, always follow the read-modify-write pattern when you update a posture deployment: 1. Call GetPostureDeployment to get the current version of the deployment. 2. Update the fields in the deployment as needed. 3. Call UpdatePostureDeployment to update the deployment. Ensure that your request includes the `etag` value from the GetPostureDeployment response. **Important:** If you omit the `etag` when you call UpdatePostureDeployment, then the updated deployment unconditionally overwrites the existing deployment. */
export const patchOrganizationsLocationsPostureDeployments: API.OperationMethod<
  PatchOrganizationsLocationsPostureDeploymentsRequest,
  PatchOrganizationsLocationsPostureDeploymentsResponse,
  PatchOrganizationsLocationsPostureDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchOrganizationsLocationsPostureDeploymentsRequest,
  output: PatchOrganizationsLocationsPostureDeploymentsResponse,
  errors: [],
}));

export interface CreateOrganizationsLocationsPostureDeploymentsRequest {
  /** Required. An identifier for the posture deployment. */
  postureDeploymentId?: string;
  /** Required. The parent resource name, in the format `organizations/{organization}/locations/global`. */
  parent: string;
  /** Request body */
  body?: PostureDeployment;
}

export const CreateOrganizationsLocationsPostureDeploymentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    postureDeploymentId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("postureDeploymentId"),
    ),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(PostureDeployment).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/postureDeployments",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateOrganizationsLocationsPostureDeploymentsRequest>;

export type CreateOrganizationsLocationsPostureDeploymentsResponse = Operation;
export const CreateOrganizationsLocationsPostureDeploymentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateOrganizationsLocationsPostureDeploymentsError = DefaultErrors;

/** Creates a new PostureDeployment in a given project and location. */
export const createOrganizationsLocationsPostureDeployments: API.OperationMethod<
  CreateOrganizationsLocationsPostureDeploymentsRequest,
  CreateOrganizationsLocationsPostureDeploymentsResponse,
  CreateOrganizationsLocationsPostureDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateOrganizationsLocationsPostureDeploymentsRequest,
  output: CreateOrganizationsLocationsPostureDeploymentsResponse,
  errors: [],
}));

export interface ListOrganizationsLocationsPostureDeploymentsRequest {
  /** Required. The parent resource name, in the format `organizations/{organization}/locations/global`. */
  parent: string;
  /** Optional. A pagination token returned from a previous request to list posture deployments. Provide this token to retrieve the next page of results. */
  pageToken?: string;
  /** Optional. A filter to apply to the list of postures, in the format defined in [AIP-160: Filtering](https://google.aip.dev/160). */
  filter?: string;
  /** Optional. The maximum number of posture deployments to return. The default value is `500`. If you exceed the maximum value of `1000`, then the service uses the maximum value. */
  pageSize?: number;
}

export const ListOrganizationsLocationsPostureDeploymentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/postureDeployments",
    }),
    svc,
  ) as unknown as Schema.Schema<ListOrganizationsLocationsPostureDeploymentsRequest>;

export type ListOrganizationsLocationsPostureDeploymentsResponse =
  ListPostureDeploymentsResponse;
export const ListOrganizationsLocationsPostureDeploymentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListPostureDeploymentsResponse;

export type ListOrganizationsLocationsPostureDeploymentsError = DefaultErrors;

/** Lists every PostureDeployment in a project and location. */
export const listOrganizationsLocationsPostureDeployments: API.PaginatedOperationMethod<
  ListOrganizationsLocationsPostureDeploymentsRequest,
  ListOrganizationsLocationsPostureDeploymentsResponse,
  ListOrganizationsLocationsPostureDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationsLocationsPostureDeploymentsRequest,
  output: ListOrganizationsLocationsPostureDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetOrganizationsLocationsPostureDeploymentsRequest {
  /** Required. The name of the PostureDeployment, in the format `organizations/{organization}/locations/global/postureDeployments/{posture_deployment_id}`. */
  name: string;
}

export const GetOrganizationsLocationsPostureDeploymentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/postureDeployments/{postureDeploymentsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetOrganizationsLocationsPostureDeploymentsRequest>;

export type GetOrganizationsLocationsPostureDeploymentsResponse =
  PostureDeployment;
export const GetOrganizationsLocationsPostureDeploymentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PostureDeployment;

export type GetOrganizationsLocationsPostureDeploymentsError = DefaultErrors;

/** Gets details for a PostureDeployment. */
export const getOrganizationsLocationsPostureDeployments: API.OperationMethod<
  GetOrganizationsLocationsPostureDeploymentsRequest,
  GetOrganizationsLocationsPostureDeploymentsResponse,
  GetOrganizationsLocationsPostureDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOrganizationsLocationsPostureDeploymentsRequest,
  output: GetOrganizationsLocationsPostureDeploymentsResponse,
  errors: [],
}));

export interface DeleteOrganizationsLocationsPosturesRequest {
  /** Required. The name of the Posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. */
  name: string;
  /** Optional. An opaque identifier for the current version of the posture. If you provide this value, then it must match the existing value. If the values don't match, then the request fails with an ABORTED error. If you omit this value, then the posture is deleted regardless of its current `etag` value. */
  etag?: string;
}

export const DeleteOrganizationsLocationsPosturesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/postures/{posturesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteOrganizationsLocationsPosturesRequest>;

export type DeleteOrganizationsLocationsPosturesResponse = Operation;
export const DeleteOrganizationsLocationsPosturesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteOrganizationsLocationsPosturesError = DefaultErrors;

/** Deletes all revisions of a Posture. You can only delete a posture if none of its revisions are deployed. */
export const deleteOrganizationsLocationsPostures: API.OperationMethod<
  DeleteOrganizationsLocationsPosturesRequest,
  DeleteOrganizationsLocationsPosturesResponse,
  DeleteOrganizationsLocationsPosturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteOrganizationsLocationsPosturesRequest,
  output: DeleteOrganizationsLocationsPosturesResponse,
  errors: [],
}));

export interface PatchOrganizationsLocationsPosturesRequest {
  /** Required. Identifier. The name of the posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. */
  name: string;
  /** Required. The revision ID of the posture to update. If the posture revision that you update is currently deployed, then a new revision of the posture is created. */
  revisionId?: string;
  /** Required. The fields in the Posture to update. You can update only the following fields: * Posture.description * Posture.policy_sets * Posture.state */
  updateMask?: string;
  /** Request body */
  body?: Posture;
}

export const PatchOrganizationsLocationsPosturesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    revisionId: Schema.optional(Schema.String).pipe(T.HttpQuery("revisionId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Posture).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/postures/{posturesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchOrganizationsLocationsPosturesRequest>;

export type PatchOrganizationsLocationsPosturesResponse = Operation;
export const PatchOrganizationsLocationsPosturesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchOrganizationsLocationsPosturesError = DefaultErrors;

/** Updates a revision of an existing Posture. If the posture revision that you update is currently deployed, then a new revision of the posture is created. To prevent concurrent updates from overwriting each other, always follow the read-modify-write pattern when you update a posture: 1. Call GetPosture to get the current version of the posture. 2. Update the fields in the posture as needed. 3. Call UpdatePosture to update the posture. Ensure that your request includes the `etag` value from the GetPosture response. **Important:** If you omit the `etag` when you call UpdatePosture, then the updated posture unconditionally overwrites the existing posture. */
export const patchOrganizationsLocationsPostures: API.OperationMethod<
  PatchOrganizationsLocationsPosturesRequest,
  PatchOrganizationsLocationsPosturesResponse,
  PatchOrganizationsLocationsPosturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchOrganizationsLocationsPosturesRequest,
  output: PatchOrganizationsLocationsPosturesResponse,
  errors: [],
}));

export interface ListOrganizationsLocationsPosturesRequest {
  /** Required. The parent resource name, in the format `organizations/{organization}/locations/global`. */
  parent: string;
  /** A pagination token returned from a previous request to list postures. Provide this token to retrieve the next page of results. */
  pageToken?: string;
  /** Optional. A filter to apply to the list of postures, in the format defined in [AIP-160: Filtering](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of postures to return. The default value is `500`. If you exceed the maximum value of `1000`, then the service uses the maximum value. */
  pageSize?: number;
}

export const ListOrganizationsLocationsPosturesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/postures",
    }),
    svc,
  ) as unknown as Schema.Schema<ListOrganizationsLocationsPosturesRequest>;

export type ListOrganizationsLocationsPosturesResponse = ListPosturesResponse;
export const ListOrganizationsLocationsPosturesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListPosturesResponse;

export type ListOrganizationsLocationsPosturesError = DefaultErrors;

/** Lists the most recent revisions of all Posture resources in a specified organization and location. */
export const listOrganizationsLocationsPostures: API.PaginatedOperationMethod<
  ListOrganizationsLocationsPosturesRequest,
  ListOrganizationsLocationsPosturesResponse,
  ListOrganizationsLocationsPosturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationsLocationsPosturesRequest,
  output: ListOrganizationsLocationsPosturesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateOrganizationsLocationsPosturesRequest {
  /** Required. The parent resource name, in the format `organizations/{organization}/locations/global`. */
  parent: string;
  /** Required. An identifier for the posture. */
  postureId?: string;
  /** Request body */
  body?: Posture;
}

export const CreateOrganizationsLocationsPosturesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    postureId: Schema.optional(Schema.String).pipe(T.HttpQuery("postureId")),
    body: Schema.optional(Posture).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/postures",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateOrganizationsLocationsPosturesRequest>;

export type CreateOrganizationsLocationsPosturesResponse = Operation;
export const CreateOrganizationsLocationsPosturesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateOrganizationsLocationsPosturesError = DefaultErrors;

/** Creates a new Posture. */
export const createOrganizationsLocationsPostures: API.OperationMethod<
  CreateOrganizationsLocationsPosturesRequest,
  CreateOrganizationsLocationsPosturesResponse,
  CreateOrganizationsLocationsPosturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateOrganizationsLocationsPosturesRequest,
  output: CreateOrganizationsLocationsPosturesResponse,
  errors: [],
}));

export interface ExtractOrganizationsLocationsPosturesRequest {
  /** Required. The parent resource name, in the format `organizations/{organization}/locations/global`. */
  parent: string;
  /** Request body */
  body?: ExtractPostureRequest;
}

export const ExtractOrganizationsLocationsPosturesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(ExtractPostureRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/postures:extract",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExtractOrganizationsLocationsPosturesRequest>;

export type ExtractOrganizationsLocationsPosturesResponse = Operation;
export const ExtractOrganizationsLocationsPosturesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type ExtractOrganizationsLocationsPosturesError = DefaultErrors;

/** Extracts existing policies from an organization, folder, or project, and applies them to another organization, folder, or project as a Posture. If the other organization, folder, or project already has a posture, then the result of the long-running operation is an ALREADY_EXISTS error. */
export const extractOrganizationsLocationsPostures: API.OperationMethod<
  ExtractOrganizationsLocationsPosturesRequest,
  ExtractOrganizationsLocationsPosturesResponse,
  ExtractOrganizationsLocationsPosturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExtractOrganizationsLocationsPosturesRequest,
  output: ExtractOrganizationsLocationsPosturesResponse,
  errors: [],
}));

export interface ListRevisionsOrganizationsLocationsPosturesRequest {
  /** Optional. A pagination token from a previous request to list posture revisions. Provide this token to retrieve the next page of results. */
  pageToken?: string;
  /** Required. The name of the Posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. */
  name: string;
  /** Optional. The maximum number of posture revisions to return. The default value is `500`. If you exceed the maximum value of `1000`, then the service uses the maximum value. */
  pageSize?: number;
}

export const ListRevisionsOrganizationsLocationsPosturesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    name: Schema.String.pipe(T.HttpPath("name")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/postures/{posturesId}:listRevisions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListRevisionsOrganizationsLocationsPosturesRequest>;

export type ListRevisionsOrganizationsLocationsPosturesResponse =
  ListPostureRevisionsResponse;
export const ListRevisionsOrganizationsLocationsPosturesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListPostureRevisionsResponse;

export type ListRevisionsOrganizationsLocationsPosturesError = DefaultErrors;

/** Lists all revisions of a single Posture. */
export const listRevisionsOrganizationsLocationsPostures: API.PaginatedOperationMethod<
  ListRevisionsOrganizationsLocationsPosturesRequest,
  ListRevisionsOrganizationsLocationsPosturesResponse,
  ListRevisionsOrganizationsLocationsPosturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRevisionsOrganizationsLocationsPosturesRequest,
  output: ListRevisionsOrganizationsLocationsPosturesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetOrganizationsLocationsPosturesRequest {
  /** Required. The name of the Posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. */
  name: string;
  /** Optional. The posture revision to retrieve. If not specified, the most recently updated revision is retrieved. */
  revisionId?: string;
}

export const GetOrganizationsLocationsPosturesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    revisionId: Schema.optional(Schema.String).pipe(T.HttpQuery("revisionId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/postures/{posturesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetOrganizationsLocationsPosturesRequest>;

export type GetOrganizationsLocationsPosturesResponse = Posture;
export const GetOrganizationsLocationsPosturesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Posture;

export type GetOrganizationsLocationsPosturesError = DefaultErrors;

/** Gets a single revision of a Posture. */
export const getOrganizationsLocationsPostures: API.OperationMethod<
  GetOrganizationsLocationsPosturesRequest,
  GetOrganizationsLocationsPosturesResponse,
  GetOrganizationsLocationsPosturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOrganizationsLocationsPosturesRequest,
  output: GetOrganizationsLocationsPosturesResponse,
  errors: [],
}));
