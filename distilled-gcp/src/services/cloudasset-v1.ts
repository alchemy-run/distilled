// ==========================================================================
// Cloud Asset API (cloudasset v1)
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
  name: "cloudasset",
  version: "v1",
  rootUrl: "https://cloudasset.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleIdentityAccesscontextmanagerV1IngressSource {
  /** A Google Cloud resource that is allowed to ingress the perimeter. Requests from these resources will be allowed to access perimeter data. Currently only projects and VPCs are allowed. Project format: `projects/{project_number}` VPC network format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NAME}`. The project may be in any Google Cloud organization, not just the organization that the perimeter is defined in. `*` is not allowed, the case of allowing all Google Cloud resources only is not supported. */
  resource?: string;
  /** An AccessLevel resource name that allow resources within the ServicePerimeters to be accessed from the internet. AccessLevels listed must be in the same policy as this ServicePerimeter. Referencing a nonexistent AccessLevel will cause an error. If no AccessLevel names are listed, resources within the perimeter can only be accessed via Google Cloud calls with request origins within the perimeter. Example: `accessPolicies/MY_POLICY/accessLevels/MY_LEVEL`. If a single `*` is specified for `access_level`, then all IngressSources will be allowed. */
  accessLevel?: string;
}

export const GoogleIdentityAccesscontextmanagerV1IngressSource: Schema.Schema<GoogleIdentityAccesscontextmanagerV1IngressSource> = Schema.suspend(() => Schema.Struct({
  resource: Schema.optional(Schema.String),
  accessLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1IngressSource" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1IngressSource>;

export interface GoogleIdentityAccesscontextmanagerV1IngressFrom {
  /** Sources that this IngressPolicy authorizes access from. */
  sources?: Array<GoogleIdentityAccesscontextmanagerV1IngressSource>;
  /** Specifies the type of identities that are allowed access from outside the perimeter. If left unspecified, then members of `identities` field will be allowed access. */
  identityType?: "IDENTITY_TYPE_UNSPECIFIED" | "ANY_IDENTITY" | "ANY_USER_ACCOUNT" | "ANY_SERVICE_ACCOUNT" | (string & {});
  /** A list of identities that are allowed access through [IngressPolicy]. Identities can be an individual user, service account, Google group, or third-party identity. For third-party identity, only single identities are supported and other identity types are not supported. The `v1` identities that have the prefix `user`, `group`, `serviceAccount`, and `principal` in https://cloud.google.com/iam/docs/principal-identifiers#v1 are supported. */
  identities?: Array<string>;
}

export const GoogleIdentityAccesscontextmanagerV1IngressFrom: Schema.Schema<GoogleIdentityAccesscontextmanagerV1IngressFrom> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(Schema.Array(GoogleIdentityAccesscontextmanagerV1IngressSource)),
  identityType: Schema.optional(Schema.String),
  identities: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1IngressFrom" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1IngressFrom>;

export interface GoogleIdentityAccesscontextmanagerV1MethodSelector {
  /** A valid method name for the corresponding `service_name` in ApiOperation. If `*` is used as the value for the `method`, then ALL methods and permissions are allowed. */
  method?: string;
  /** A valid Cloud IAM permission for the corresponding `service_name` in ApiOperation. */
  permission?: string;
}

export const GoogleIdentityAccesscontextmanagerV1MethodSelector: Schema.Schema<GoogleIdentityAccesscontextmanagerV1MethodSelector> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.String),
  permission: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1MethodSelector" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1MethodSelector>;

export interface GoogleIdentityAccesscontextmanagerV1ApiOperation {
  /** The name of the API whose methods or permissions the IngressPolicy or EgressPolicy want to allow. A single ApiOperation with `service_name` field set to `*` will allow all methods AND permissions for all services. */
  serviceName?: string;
  /** API methods or permissions to allow. Method or permission must belong to the service specified by `service_name` field. A single MethodSelector entry with `*` specified for the `method` field will allow all methods AND permissions for the service specified in `service_name`. */
  methodSelectors?: Array<GoogleIdentityAccesscontextmanagerV1MethodSelector>;
}

export const GoogleIdentityAccesscontextmanagerV1ApiOperation: Schema.Schema<GoogleIdentityAccesscontextmanagerV1ApiOperation> = Schema.suspend(() => Schema.Struct({
  serviceName: Schema.optional(Schema.String),
  methodSelectors: Schema.optional(Schema.Array(GoogleIdentityAccesscontextmanagerV1MethodSelector)),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1ApiOperation" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1ApiOperation>;

export interface GoogleIdentityAccesscontextmanagerV1IngressTo {
  /** A list of ApiOperations allowed to be performed by the sources specified in corresponding IngressFrom in this ServicePerimeter. */
  operations?: Array<GoogleIdentityAccesscontextmanagerV1ApiOperation>;
  /** IAM roles that represent the set of operations that the sources specified in the corresponding IngressFrom are allowed to perform in this ServicePerimeter. */
  roles?: Array<string>;
  /** A list of resources, currently only projects in the form `projects/`, protected by this ServicePerimeter that are allowed to be accessed by sources defined in the corresponding IngressFrom. If a single `*` is specified, then access to all resources inside the perimeter are allowed. */
  resources?: Array<string>;
}

export const GoogleIdentityAccesscontextmanagerV1IngressTo: Schema.Schema<GoogleIdentityAccesscontextmanagerV1IngressTo> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(GoogleIdentityAccesscontextmanagerV1ApiOperation)),
  roles: Schema.optional(Schema.Array(Schema.String)),
  resources: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1IngressTo" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1IngressTo>;

export interface GoogleIdentityAccesscontextmanagerV1IngressPolicy {
  /** Defines the conditions on the source of a request causing this IngressPolicy to apply. */
  ingressFrom?: GoogleIdentityAccesscontextmanagerV1IngressFrom;
  /** Defines the conditions on the ApiOperation and request destination that cause this IngressPolicy to apply. */
  ingressTo?: GoogleIdentityAccesscontextmanagerV1IngressTo;
  /** Optional. Human-readable title for the ingress rule. The title must be unique within the perimeter and can not exceed 100 characters. Within the access policy, the combined length of all rule titles must not exceed 240,000 characters. */
  title?: string;
}

export const GoogleIdentityAccesscontextmanagerV1IngressPolicy: Schema.Schema<GoogleIdentityAccesscontextmanagerV1IngressPolicy> = Schema.suspend(() => Schema.Struct({
  ingressFrom: Schema.optional(GoogleIdentityAccesscontextmanagerV1IngressFrom),
  ingressTo: Schema.optional(GoogleIdentityAccesscontextmanagerV1IngressTo),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1IngressPolicy" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1IngressPolicy>;

export interface ResourceOwners {
  /** List of resource owners. */
  resourceOwners?: Array<string>;
}

export const ResourceOwners: Schema.Schema<ResourceOwners> = Schema.suspend(() => Schema.Struct({
  resourceOwners: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ResourceOwners" }) as any as Schema.Schema<ResourceOwners>;

export interface AssetEnrichment {
  /** The resource owners for a resource. Note that this field only contains the members that have "roles/owner" role in the resource's IAM Policy. */
  resourceOwners?: ResourceOwners;
}

export const AssetEnrichment: Schema.Schema<AssetEnrichment> = Schema.suspend(() => Schema.Struct({
  resourceOwners: Schema.optional(ResourceOwners),
})).annotate({ identifier: "AssetEnrichment" }) as any as Schema.Schema<AssetEnrichment>;

export interface PartitionSpec {
  /** The partition key for BigQuery partitioned table. */
  partitionKey?: "PARTITION_KEY_UNSPECIFIED" | "READ_TIME" | "REQUEST_TIME" | (string & {});
}

export const PartitionSpec: Schema.Schema<PartitionSpec> = Schema.suspend(() => Schema.Struct({
  partitionKey: Schema.optional(Schema.String),
})).annotate({ identifier: "PartitionSpec" }) as any as Schema.Schema<PartitionSpec>;

export interface Tag {
  /** TagKey ID, in the format of tagKeys/{TAG_KEY_ID}. */
  tagKeyId?: string;
  /** TagValue namespaced name, in the format of {ORG_ID}/{TAG_KEY_SHORT_NAME}/{TAG_VALUE_SHORT_NAME}. */
  tagValue?: string;
  /** TagValue ID, in the format of tagValues/{TAG_VALUE_ID}. */
  tagValueId?: string;
  /** TagKey namespaced name, in the format of {ORG_ID}/{TAG_KEY_SHORT_NAME}. */
  tagKey?: string;
}

export const Tag: Schema.Schema<Tag> = Schema.suspend(() => Schema.Struct({
  tagKeyId: Schema.optional(Schema.String),
  tagValue: Schema.optional(Schema.String),
  tagValueId: Schema.optional(Schema.String),
  tagKey: Schema.optional(Schema.String),
})).annotate({ identifier: "Tag" }) as any as Schema.Schema<Tag>;

export interface EffectiveTagDetails {
  /** The effective tags inherited from the attached_resource. Note that tags with the same key but different values may attach to resources at a different hierarchy levels. The lower hierarchy tag value will overwrite the higher hierarchy tag value of the same tag key. In this case, the tag value at the higher hierarchy level will be removed. For more information, see [tag inheritance](https://cloud.google.com/resource-manager/docs/tags/tags-overview#inheritance). */
  effectiveTags?: Array<Tag>;
  /** The [full resource name](https://cloud.google.com/asset-inventory/docs/resource-name-format) of the ancestor from which effective_tags are inherited, according to [tag inheritance](https://cloud.google.com/resource-manager/docs/tags/tags-overview#inheritance). */
  attachedResource?: string;
}

export const EffectiveTagDetails: Schema.Schema<EffectiveTagDetails> = Schema.suspend(() => Schema.Struct({
  effectiveTags: Schema.optional(Schema.Array(Tag)),
  attachedResource: Schema.optional(Schema.String),
})).annotate({ identifier: "EffectiveTagDetails" }) as any as Schema.Schema<EffectiveTagDetails>;

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

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface GoogleCloudAssetV1StringValues {
  /** List of values allowed at this resource. */
  allowedValues?: Array<string>;
  /** List of values denied at this resource. */
  deniedValues?: Array<string>;
}

export const GoogleCloudAssetV1StringValues: Schema.Schema<GoogleCloudAssetV1StringValues> = Schema.suspend(() => Schema.Struct({
  allowedValues: Schema.optional(Schema.Array(Schema.String)),
  deniedValues: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudAssetV1StringValues" }) as any as Schema.Schema<GoogleCloudAssetV1StringValues>;

export interface ConditionEvaluation {
  /** The evaluation result. */
  evaluationValue?: "EVALUATION_VALUE_UNSPECIFIED" | "TRUE" | "FALSE" | "CONDITIONAL" | (string & {});
}

export const ConditionEvaluation: Schema.Schema<ConditionEvaluation> = Schema.suspend(() => Schema.Struct({
  evaluationValue: Schema.optional(Schema.String),
})).annotate({ identifier: "ConditionEvaluation" }) as any as Schema.Schema<ConditionEvaluation>;

export interface GoogleCloudAssetV1Rule {
  /** The evaluating condition for this rule. */
  condition?: Expr;
  /** List of values to be used for this policy rule. This field can be set only in policies for list constraints. */
  values?: GoogleCloudAssetV1StringValues;
  /** Setting this to true means that all values are allowed. This field can be set only in Policies for list constraints. */
  allowAll?: boolean;
  /** The condition evaluation result for this rule. Only populated if it meets all the following criteria: * There is a condition defined for this rule. * This rule is within AnalyzeOrgPolicyGovernedContainersResponse.GovernedContainer.consolidated_policy, or AnalyzeOrgPolicyGovernedAssetsResponse.GovernedAsset.consolidated_policy when the AnalyzeOrgPolicyGovernedAssetsResponse.GovernedAsset has AnalyzeOrgPolicyGovernedAssetsResponse.GovernedAsset.governed_resource. */
  conditionEvaluation?: ConditionEvaluation;
  /** If `true`, then the `Policy` is enforced. If `false`, then any configuration is acceptable. This field can be set only in Policies for boolean constraints. */
  enforce?: boolean;
  /** Setting this to true means that all values are denied. This field can be set only in Policies for list constraints. */
  denyAll?: boolean;
}

export const GoogleCloudAssetV1Rule: Schema.Schema<GoogleCloudAssetV1Rule> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Expr),
  values: Schema.optional(GoogleCloudAssetV1StringValues),
  allowAll: Schema.optional(Schema.Boolean),
  conditionEvaluation: Schema.optional(ConditionEvaluation),
  enforce: Schema.optional(Schema.Boolean),
  denyAll: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudAssetV1Rule" }) as any as Schema.Schema<GoogleCloudAssetV1Rule>;

export interface AnalyzerOrgPolicy {
  /** Ignores policies set above this resource and restores the default behavior of the constraint at this resource. This field can be set in policies for either list or boolean constraints. If set, `rules` must be empty and `inherit_from_parent` must be set to false. */
  reset?: boolean;
  /** List of rules for this organization policy. */
  rules?: Array<GoogleCloudAssetV1Rule>;
  /** The [full resource name] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of an organization/folder/project resource where this organization policy applies to. For any user defined org policies, this field has the same value as the [attached_resource] field. Only for default policy, this field has the different value. */
  appliedResource?: string;
  /** The [full resource name] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of an organization/folder/project resource where this organization policy is set. Notice that some type of constraints are defined with default policy. This field will be empty for them. */
  attachedResource?: string;
  /** If `inherit_from_parent` is true, Rules set higher up in the hierarchy (up to the closest root) are inherited and present in the effective policy. If it is false, then no rules are inherited, and this policy becomes the effective root for evaluation. */
  inheritFromParent?: boolean;
}

export const AnalyzerOrgPolicy: Schema.Schema<AnalyzerOrgPolicy> = Schema.suspend(() => Schema.Struct({
  reset: Schema.optional(Schema.Boolean),
  rules: Schema.optional(Schema.Array(GoogleCloudAssetV1Rule)),
  appliedResource: Schema.optional(Schema.String),
  attachedResource: Schema.optional(Schema.String),
  inheritFromParent: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AnalyzerOrgPolicy" }) as any as Schema.Schema<AnalyzerOrgPolicy>;

export interface GoogleCloudAssetV1GovernedContainer {
  /** The effective tags on this resource. */
  effectiveTags?: Array<EffectiveTagDetails>;
  /** The organization that this resource belongs to, in the format of organizations/{ORGANIZATION_NUMBER}. This field is available when the resource belongs (directly or cascadingly) to an organization. */
  organization?: string;
  /** The [full resource name] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of an organization/folder/project resource. */
  fullResourceName?: string;
  /** The folder(s) that this resource belongs to, in the format of folders/{FOLDER_NUMBER}. This field is available when the resource belongs (directly or cascadingly) to one or more folders. */
  folders?: Array<string>;
  /** The project that this resource belongs to, in the format of projects/{PROJECT_NUMBER}. This field is available when the resource belongs to a project. */
  project?: string;
  /** The [full resource name] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of the parent of AnalyzeOrgPolicyGovernedContainersResponse.GovernedContainer.full_resource_name. */
  parent?: string;
  /** The ordered list of all organization policies from the consolidated_policy.attached_resource. to the scope specified in the request. If the constraint is defined with default policy, it will also appear in the list. */
  policyBundle?: Array<AnalyzerOrgPolicy>;
  /** The consolidated organization policy for the analyzed resource. The consolidated organization policy is computed by merging and evaluating AnalyzeOrgPolicyGovernedContainersResponse.GovernedContainer.policy_bundle. The evaluation will respect the organization policy [hierarchy rules](https://cloud.google.com/resource-manager/docs/organization-policy/understanding-hierarchy). */
  consolidatedPolicy?: AnalyzerOrgPolicy;
}

export const GoogleCloudAssetV1GovernedContainer: Schema.Schema<GoogleCloudAssetV1GovernedContainer> = Schema.suspend(() => Schema.Struct({
  effectiveTags: Schema.optional(Schema.Array(EffectiveTagDetails)),
  organization: Schema.optional(Schema.String),
  fullResourceName: Schema.optional(Schema.String),
  folders: Schema.optional(Schema.Array(Schema.String)),
  project: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  policyBundle: Schema.optional(Schema.Array(AnalyzerOrgPolicy)),
  consolidatedPolicy: Schema.optional(AnalyzerOrgPolicy),
})).annotate({ identifier: "GoogleCloudAssetV1GovernedContainer" }) as any as Schema.Schema<GoogleCloudAssetV1GovernedContainer>;

export interface Options {
  /** Optional. If true and IamPolicyAnalysisQuery.resource_selector is not specified, the resource section of the result will expand any resource attached to an IAM policy to include resources lower in the resource hierarchy. For example, if the request analyzes for which resources user A has permission P, and the results include an IAM policy with P on a Google Cloud folder, the results will also include resources in that folder with permission P. If true and IamPolicyAnalysisQuery.resource_selector is specified, the resource section of the result will expand the specified resource to include resources lower in the resource hierarchy. Only project or lower resources are supported. Folder and organization resources cannot be used together with this option. For example, if the request analyzes for which users have permission P on a Google Cloud project with this option enabled, the results will include all users who have permission P on that project or any lower resource. If true, the default max expansion per resource is 1000 for AssetService.AnalyzeIamPolicy][] and 100000 for AssetService.AnalyzeIamPolicyLongrunning][]. Default is false. */
  expandResources?: boolean;
  /** Optional. If true, the result will output the relevant membership relationships between groups and other groups, and between groups and principals. Default is false. */
  outputGroupEdges?: boolean;
  /** Optional. If true, the access section of result will expand any roles appearing in IAM policy bindings to include their permissions. If IamPolicyAnalysisQuery.access_selector is specified, the access section of the result will be determined by the selector, and this flag is not allowed to set. Default is false. */
  expandRoles?: boolean;
  /** Optional. If true, the response will include access analysis from identities to resources via service account impersonation. This is a very expensive operation, because many derived queries will be executed. We highly recommend you use AssetService.AnalyzeIamPolicyLongrunning RPC instead. For example, if the request analyzes for which resources user A has permission P, and there's an IAM policy states user A has iam.serviceAccounts.getAccessToken permission to a service account SA, and there's another IAM policy states service account SA has permission P to a Google Cloud folder F, then user A potentially has access to the Google Cloud folder F. And those advanced analysis results will be included in AnalyzeIamPolicyResponse.service_account_impersonation_analysis. Another example, if the request analyzes for who has permission P to a Google Cloud folder F, and there's an IAM policy states user A has iam.serviceAccounts.actAs permission to a service account SA, and there's another IAM policy states service account SA has permission P to the Google Cloud folder F, then user A potentially has access to the Google Cloud folder F. And those advanced analysis results will be included in AnalyzeIamPolicyResponse.service_account_impersonation_analysis. Only the following permissions are considered in this analysis: * `iam.serviceAccounts.actAs` * `iam.serviceAccounts.signBlob` * `iam.serviceAccounts.signJwt` * `iam.serviceAccounts.getAccessToken` * `iam.serviceAccounts.getOpenIdToken` * `iam.serviceAccounts.implicitDelegation` Default is false. */
  analyzeServiceAccountImpersonation?: boolean;
  /** Optional. If true, the result will output the relevant parent/child relationships between resources. Default is false. */
  outputResourceEdges?: boolean;
  /** Optional. If true, the identities section of the result will expand any Google groups appearing in an IAM policy binding. If IamPolicyAnalysisQuery.identity_selector is specified, the identity in the result will be determined by the selector, and this flag is not allowed to set. If true, the default max expansion per group is 1000 for AssetService.AnalyzeIamPolicy][]. Default is false. */
  expandGroups?: boolean;
}

export const Options: Schema.Schema<Options> = Schema.suspend(() => Schema.Struct({
  expandResources: Schema.optional(Schema.Boolean),
  outputGroupEdges: Schema.optional(Schema.Boolean),
  expandRoles: Schema.optional(Schema.Boolean),
  analyzeServiceAccountImpersonation: Schema.optional(Schema.Boolean),
  outputResourceEdges: Schema.optional(Schema.Boolean),
  expandGroups: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Options" }) as any as Schema.Schema<Options>;

export interface IdentitySelector {
  /** Required. The identity appear in the form of principals in [IAM policy binding](https://cloud.google.com/iam/reference/rest/v1/Binding). The examples of supported forms are: "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com". Notice that wildcard characters (such as * and ?) are not supported. You must give a specific identity. */
  identity?: string;
}

export const IdentitySelector: Schema.Schema<IdentitySelector> = Schema.suspend(() => Schema.Struct({
  identity: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentitySelector" }) as any as Schema.Schema<IdentitySelector>;

export interface AccessSelector {
  /** Optional. The roles to appear in result. */
  roles?: Array<string>;
  /** Optional. The permissions to appear in result. */
  permissions?: Array<string>;
}

export const AccessSelector: Schema.Schema<AccessSelector> = Schema.suspend(() => Schema.Struct({
  roles: Schema.optional(Schema.Array(Schema.String)),
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AccessSelector" }) as any as Schema.Schema<AccessSelector>;

export interface ResourceSelector {
  /** Required. The [full resource name] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of a resource of [supported resource types](https://cloud.google.com/asset-inventory/docs/supported-asset-types#analyzable_asset_types). */
  fullResourceName?: string;
}

export const ResourceSelector: Schema.Schema<ResourceSelector> = Schema.suspend(() => Schema.Struct({
  fullResourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceSelector" }) as any as Schema.Schema<ResourceSelector>;

export interface ConditionContext {
  /** The hypothetical access timestamp to evaluate IAM conditions. Note that this value must not be earlier than the current time; otherwise, an INVALID_ARGUMENT error will be returned. */
  accessTime?: string;
}

export const ConditionContext: Schema.Schema<ConditionContext> = Schema.suspend(() => Schema.Struct({
  accessTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ConditionContext" }) as any as Schema.Schema<ConditionContext>;

export interface IamPolicyAnalysisQuery {
  /** Optional. The query options. */
  options?: Options;
  /** Optional. Specifies an identity for analysis. */
  identitySelector?: IdentitySelector;
  /** Required. The relative name of the root asset. Only resources and IAM policies within the scope will be analyzed. This can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"). To know how to get organization ID, visit [here ](https://cloud.google.com/resource-manager/docs/creating-managing-organization#retrieving_your_organization_id). To know how to get folder or project ID, visit [here ](https://cloud.google.com/resource-manager/docs/creating-managing-folders#viewing_or_listing_folders_and_projects). */
  scope?: string;
  /** Optional. Specifies roles or permissions for analysis. This is optional. */
  accessSelector?: AccessSelector;
  /** Optional. Specifies a resource for analysis. */
  resourceSelector?: ResourceSelector;
  /** Optional. The hypothetical context for IAM conditions evaluation. */
  conditionContext?: ConditionContext;
}

export const IamPolicyAnalysisQuery: Schema.Schema<IamPolicyAnalysisQuery> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(Options),
  identitySelector: Schema.optional(IdentitySelector),
  scope: Schema.optional(Schema.String),
  accessSelector: Schema.optional(AccessSelector),
  resourceSelector: Schema.optional(ResourceSelector),
  conditionContext: Schema.optional(ConditionContext),
})).annotate({ identifier: "IamPolicyAnalysisQuery" }) as any as Schema.Schema<IamPolicyAnalysisQuery>;

export interface IamPolicyAnalysisState {
  /** The Google standard error code that best describes the state. For example: - OK means the analysis on this entity has been successfully finished; - PERMISSION_DENIED means an access denied error is encountered; - DEADLINE_EXCEEDED means the analysis on this entity hasn't been started in time; */
  code?: "OK" | "CANCELLED" | "UNKNOWN" | "INVALID_ARGUMENT" | "DEADLINE_EXCEEDED" | "NOT_FOUND" | "ALREADY_EXISTS" | "PERMISSION_DENIED" | "UNAUTHENTICATED" | "RESOURCE_EXHAUSTED" | "FAILED_PRECONDITION" | "ABORTED" | "OUT_OF_RANGE" | "UNIMPLEMENTED" | "INTERNAL" | "UNAVAILABLE" | "DATA_LOSS" | (string & {});
  /** The human-readable description of the cause of failure. */
  cause?: string;
}

export const IamPolicyAnalysisState: Schema.Schema<IamPolicyAnalysisState> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  cause: Schema.optional(Schema.String),
})).annotate({ identifier: "IamPolicyAnalysisState" }) as any as Schema.Schema<IamPolicyAnalysisState>;

export interface GoogleCloudAssetV1Access {
  /** The permission. */
  permission?: string;
  /** The analysis state of this access. */
  analysisState?: IamPolicyAnalysisState;
  /** The role. */
  role?: string;
}

export const GoogleCloudAssetV1Access: Schema.Schema<GoogleCloudAssetV1Access> = Schema.suspend(() => Schema.Struct({
  permission: Schema.optional(Schema.String),
  analysisState: Schema.optional(IamPolicyAnalysisState),
  role: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAssetV1Access" }) as any as Schema.Schema<GoogleCloudAssetV1Access>;

export interface GoogleCloudAssetV1Edge {
  /** The source node of the edge. For example, it could be a full resource name for a resource node or an email of an identity. */
  sourceNode?: string;
  /** The target node of the edge. For example, it could be a full resource name for a resource node or an email of an identity. */
  targetNode?: string;
}

export const GoogleCloudAssetV1Edge: Schema.Schema<GoogleCloudAssetV1Edge> = Schema.suspend(() => Schema.Struct({
  sourceNode: Schema.optional(Schema.String),
  targetNode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAssetV1Edge" }) as any as Schema.Schema<GoogleCloudAssetV1Edge>;

export interface GoogleCloudAssetV1Resource {
  /** The analysis state of this resource. */
  analysisState?: IamPolicyAnalysisState;
  /** The [full resource name](https://cloud.google.com/asset-inventory/docs/resource-name-format) */
  fullResourceName?: string;
}

export const GoogleCloudAssetV1Resource: Schema.Schema<GoogleCloudAssetV1Resource> = Schema.suspend(() => Schema.Struct({
  analysisState: Schema.optional(IamPolicyAnalysisState),
  fullResourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAssetV1Resource" }) as any as Schema.Schema<GoogleCloudAssetV1Resource>;

export interface GoogleCloudAssetV1AccessControlList {
  /** Condition evaluation for this AccessControlList, if there is a condition defined in the above IAM policy binding. */
  conditionEvaluation?: ConditionEvaluation;
  /** The accesses that match one of the following conditions: - The access_selector, if it is specified in request; - Otherwise, access specifiers reachable from the policy binding's role. */
  accesses?: Array<GoogleCloudAssetV1Access>;
  /** Resource edges of the graph starting from the policy attached resource to any descendant resources. The Edge.source_node contains the full resource name of a parent resource and Edge.target_node contains the full resource name of a child resource. This field is present only if the output_resource_edges option is enabled in request. */
  resourceEdges?: Array<GoogleCloudAssetV1Edge>;
  /** The resources that match one of the following conditions: - The resource_selector, if it is specified in request; - Otherwise, resources reachable from the policy attached resource. */
  resources?: Array<GoogleCloudAssetV1Resource>;
}

export const GoogleCloudAssetV1AccessControlList: Schema.Schema<GoogleCloudAssetV1AccessControlList> = Schema.suspend(() => Schema.Struct({
  conditionEvaluation: Schema.optional(ConditionEvaluation),
  accesses: Schema.optional(Schema.Array(GoogleCloudAssetV1Access)),
  resourceEdges: Schema.optional(Schema.Array(GoogleCloudAssetV1Edge)),
  resources: Schema.optional(Schema.Array(GoogleCloudAssetV1Resource)),
})).annotate({ identifier: "GoogleCloudAssetV1AccessControlList" }) as any as Schema.Schema<GoogleCloudAssetV1AccessControlList>;

export interface Binding {
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Expr),
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface GoogleCloudAssetV1Identity {
  /** The analysis state of this identity. */
  analysisState?: IamPolicyAnalysisState;
  /** The identity of members, formatted as appear in an [IAM policy binding](https://cloud.google.com/iam/reference/rest/v1/Binding). For example, they might be formatted like the following: - user:foo@google.com - group:group1@google.com - serviceAccount:s1@prj1.iam.gserviceaccount.com - projectOwner:some_project_id - domain:google.com - allUsers */
  name?: string;
}

export const GoogleCloudAssetV1Identity: Schema.Schema<GoogleCloudAssetV1Identity> = Schema.suspend(() => Schema.Struct({
  analysisState: Schema.optional(IamPolicyAnalysisState),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAssetV1Identity" }) as any as Schema.Schema<GoogleCloudAssetV1Identity>;

export interface GoogleCloudAssetV1IdentityList {
  /** Group identity edges of the graph starting from the binding's group members to any node of the identities. The Edge.source_node contains a group, such as `group:parent@google.com`. The Edge.target_node contains a member of the group, such as `group:child@google.com` or `user:foo@google.com`. This field is present only if the output_group_edges option is enabled in request. */
  groupEdges?: Array<GoogleCloudAssetV1Edge>;
  /** Only the identities that match one of the following conditions will be presented: - The identity_selector, if it is specified in request; - Otherwise, identities reachable from the policy binding's members. */
  identities?: Array<GoogleCloudAssetV1Identity>;
}

export const GoogleCloudAssetV1IdentityList: Schema.Schema<GoogleCloudAssetV1IdentityList> = Schema.suspend(() => Schema.Struct({
  groupEdges: Schema.optional(Schema.Array(GoogleCloudAssetV1Edge)),
  identities: Schema.optional(Schema.Array(GoogleCloudAssetV1Identity)),
})).annotate({ identifier: "GoogleCloudAssetV1IdentityList" }) as any as Schema.Schema<GoogleCloudAssetV1IdentityList>;

export interface IamPolicyAnalysisResult {
  /** The [full resource name](https://cloud.google.com/asset-inventory/docs/resource-name-format) of the resource to which the iam_binding policy attaches. */
  attachedResourceFullName?: string;
  /** The access control lists derived from the iam_binding that match or potentially match resource and access selectors specified in the request. */
  accessControlLists?: Array<GoogleCloudAssetV1AccessControlList>;
  /** Represents whether all analyses on the iam_binding have successfully finished. */
  fullyExplored?: boolean;
  /** The IAM policy binding under analysis. */
  iamBinding?: Binding;
  /** The identity list derived from members of the iam_binding that match or potentially match identity selector specified in the request. */
  identityList?: GoogleCloudAssetV1IdentityList;
}

export const IamPolicyAnalysisResult: Schema.Schema<IamPolicyAnalysisResult> = Schema.suspend(() => Schema.Struct({
  attachedResourceFullName: Schema.optional(Schema.String),
  accessControlLists: Schema.optional(Schema.Array(GoogleCloudAssetV1AccessControlList)),
  fullyExplored: Schema.optional(Schema.Boolean),
  iamBinding: Schema.optional(Binding),
  identityList: Schema.optional(GoogleCloudAssetV1IdentityList),
})).annotate({ identifier: "IamPolicyAnalysisResult" }) as any as Schema.Schema<IamPolicyAnalysisResult>;

export interface IamPolicyAnalysis {
  /** The analysis query. */
  analysisQuery?: IamPolicyAnalysisQuery;
  /** Represents whether all entries in the analysis_results have been fully explored to answer the query. */
  fullyExplored?: boolean;
  /** A list of IamPolicyAnalysisResult that matches the analysis query, or empty if no result is found. */
  analysisResults?: Array<IamPolicyAnalysisResult>;
  /** A list of non-critical errors happened during the query handling. */
  nonCriticalErrors?: Array<IamPolicyAnalysisState>;
}

export const IamPolicyAnalysis: Schema.Schema<IamPolicyAnalysis> = Schema.suspend(() => Schema.Struct({
  analysisQuery: Schema.optional(IamPolicyAnalysisQuery),
  fullyExplored: Schema.optional(Schema.Boolean),
  analysisResults: Schema.optional(Schema.Array(IamPolicyAnalysisResult)),
  nonCriticalErrors: Schema.optional(Schema.Array(IamPolicyAnalysisState)),
})).annotate({ identifier: "IamPolicyAnalysis" }) as any as Schema.Schema<IamPolicyAnalysis>;

export interface AnalyzeIamPolicyResponse {
  /** The service account impersonation analysis if IamPolicyAnalysisQuery.Options.analyze_service_account_impersonation is enabled. */
  serviceAccountImpersonationAnalysis?: Array<IamPolicyAnalysis>;
  /** Represents whether all entries in the main_analysis and service_account_impersonation_analysis have been fully explored to answer the query in the request. */
  fullyExplored?: boolean;
  /** The main analysis that matches the original request. */
  mainAnalysis?: IamPolicyAnalysis;
}

export const AnalyzeIamPolicyResponse: Schema.Schema<AnalyzeIamPolicyResponse> = Schema.suspend(() => Schema.Struct({
  serviceAccountImpersonationAnalysis: Schema.optional(Schema.Array(IamPolicyAnalysis)),
  fullyExplored: Schema.optional(Schema.Boolean),
  mainAnalysis: Schema.optional(IamPolicyAnalysis),
})).annotate({ identifier: "AnalyzeIamPolicyResponse" }) as any as Schema.Schema<AnalyzeIamPolicyResponse>;

export interface GoogleCloudAssetV1p7beta1Resource {
  /** The JSON schema name listed in the discovery document. Example: `Project` This value is unspecified for resources that do not have an API based on a discovery document, such as Cloud Bigtable. */
  discoveryName?: string;
  /** The API version. Example: `v1` */
  version?: string;
  /** The URL of the discovery document containing the resource's JSON schema. Example: `https://www.googleapis.com/discovery/v1/apis/compute/v1/rest` This value is unspecified for resources that do not have an API based on a discovery document, such as Cloud Bigtable. */
  discoveryDocumentUri?: string;
  /** The content of the resource, in which some sensitive fields are removed and may not be present. */
  data?: Record<string, unknown>;
  /** The full name of the immediate parent of this resource. See [Resource Names](https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. For Google Cloud assets, this value is the parent resource defined in the [IAM policy hierarchy](https://cloud.google.com/iam/docs/overview#policy_hierarchy). Example: `//cloudresourcemanager.googleapis.com/projects/my_project_123` For third-party assets, this field may be set differently. */
  parent?: string;
  /** The REST URL for accessing the resource. An HTTP `GET` request using this URL returns the resource itself. Example: `https://cloudresourcemanager.googleapis.com/v1/projects/my-project-123` This value is unspecified for resources without a REST API. */
  resourceUrl?: string;
  /** The location of the resource in Google Cloud, such as its zone and region. For more information, see https://cloud.google.com/about/locations/. */
  location?: string;
}

export const GoogleCloudAssetV1p7beta1Resource: Schema.Schema<GoogleCloudAssetV1p7beta1Resource> = Schema.suspend(() => Schema.Struct({
  discoveryName: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  discoveryDocumentUri: Schema.optional(Schema.String),
  data: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  parent: Schema.optional(Schema.String),
  resourceUrl: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAssetV1p7beta1Resource" }) as any as Schema.Schema<GoogleCloudAssetV1p7beta1Resource>;

export interface RelatedResource {
  /** The full resource name of the related resource. Example: `//compute.googleapis.com/projects/my_proj_123/zones/instance/instance123` */
  fullResourceName?: string;
  /** The type of the asset. Example: `compute.googleapis.com/Instance` */
  assetType?: string;
}

export const RelatedResource: Schema.Schema<RelatedResource> = Schema.suspend(() => Schema.Struct({
  fullResourceName: Schema.optional(Schema.String),
  assetType: Schema.optional(Schema.String),
})).annotate({ identifier: "RelatedResource" }) as any as Schema.Schema<RelatedResource>;

export interface RelatedResources {
  /** The detailed related resources of the primary resource. */
  relatedResources?: Array<RelatedResource>;
}

export const RelatedResources: Schema.Schema<RelatedResources> = Schema.suspend(() => Schema.Struct({
  relatedResources: Schema.optional(Schema.Array(RelatedResource)),
})).annotate({ identifier: "RelatedResources" }) as any as Schema.Schema<RelatedResources>;

export interface AssetException {
  /** The type of exception. */
  exceptionType?: "EXCEPTION_TYPE_UNSPECIFIED" | "TRUNCATION" | (string & {});
  /** The details of the exception. */
  details?: string;
}

export const AssetException: Schema.Schema<AssetException> = Schema.suspend(() => Schema.Struct({
  exceptionType: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
})).annotate({ identifier: "AssetException" }) as any as Schema.Schema<AssetException>;

export interface VersionedResource {
  /** API version of the resource. Example: If the resource is an instance provided by Compute Engine v1 API as defined in `https://cloud.google.com/compute/docs/reference/rest/v1/instances`, version will be "v1". */
  version?: string;
  /** JSON representation of the resource as defined by the corresponding service providing this resource. Example: If the resource is an instance provided by Compute Engine, this field will contain the JSON representation of the instance as defined by Compute Engine: `https://cloud.google.com/compute/docs/reference/rest/v1/instances`. You can find the resource definition for each supported resource type in this table: `https://cloud.google.com/asset-inventory/docs/supported-asset-types` */
  resource?: Record<string, unknown>;
  /** The exceptions of a resource. */
  assetExceptions?: Array<AssetException>;
}

export const VersionedResource: Schema.Schema<VersionedResource> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  assetExceptions: Schema.optional(Schema.Array(AssetException)),
})).annotate({ identifier: "VersionedResource" }) as any as Schema.Schema<VersionedResource>;

export interface AttachedResource {
  /** Versioned resource representations of this attached resource. This is repeated because there could be multiple versions of the attached resource representations during version migration. */
  versionedResources?: Array<VersionedResource>;
  /** The type of this attached resource. Example: `osconfig.googleapis.com/Inventory` You can find the supported attached asset types of each resource in this table: `https://cloud.google.com/asset-inventory/docs/supported-asset-types` */
  assetType?: string;
}

export const AttachedResource: Schema.Schema<AttachedResource> = Schema.suspend(() => Schema.Struct({
  versionedResources: Schema.optional(Schema.Array(VersionedResource)),
  assetType: Schema.optional(Schema.String),
})).annotate({ identifier: "AttachedResource" }) as any as Schema.Schema<AttachedResource>;

export interface ResourceSearchResult {
  /** The additional searchable attributes of this resource. The attributes may vary from one resource type to another. Examples: `projectId` for Project, `dnsName` for DNS ManagedZone. This field contains a subset of the resource metadata fields that are returned by the List or Get APIs provided by the corresponding Google Cloud service (e.g., Compute Engine). see [API references and supported searchable attributes](https://cloud.google.com/asset-inventory/docs/supported-asset-types) to see which fields are included. You can search values of these fields through free text search. However, you should not consume the field programically as the field names and values may change as the Google Cloud service updates to a new incompatible API version. To search against the `additional_attributes`: * Use a free text query to match the attributes values. Example: to search `additional_attributes = { dnsName: "foobar" }`, you can issue a query `foobar`. */
  additionalAttributes?: Record<string, unknown>;
  /** The display name of this resource. This field is available only when the resource's Protobuf contains it. To search against the `display_name`: * Use a field query. Example: `displayName:"My Instance"` * Use a free text query. Example: `"My Instance"` */
  displayName?: string;
  /** The type of this resource's immediate parent, if there is one. To search against the `parent_asset_type`: * Use a field query. Example: `parentAssetType:"cloudresourcemanager.googleapis.com/Project"` * Use a free text query. Example: `cloudresourcemanager.googleapis.com/Project` */
  parentAssetType?: string;
  /** This field is only present for the purpose of backward compatibility. Use the `tags` field instead. TagKey namespaced names, in the format of {ORG_ID}/{TAG_KEY_SHORT_NAME}. To search against the `tagKeys`: * Use a field query. Example: - `tagKeys:"123456789/env*"` - `tagKeys="123456789/env"` - `tagKeys:"env"` * Use a free text query. Example: - `env` */
  tagKeys?: Array<string>;
  /** The state of this resource. Different resources types have different state definitions that are mapped from various fields of different resource types. This field is available only when the resource's Protobuf contains it. Example: If the resource is an instance provided by Compute Engine, its state will include PROVISIONING, STAGING, RUNNING, STOPPING, SUSPENDING, SUSPENDED, REPAIRING, and TERMINATED. See `status` definition in [API Reference](https://cloud.google.com/compute/docs/reference/rest/v1/instances). If the resource is a project provided by Resource Manager, its state will include LIFECYCLE_STATE_UNSPECIFIED, ACTIVE, DELETE_REQUESTED and DELETE_IN_PROGRESS. See `lifecycleState` definition in [API Reference](https://cloud.google.com/resource-manager/reference/rest/v1/projects). To search against the `state`: * Use a field query. Example: `state:RUNNING` * Use a free text query. Example: `RUNNING` */
  state?: string;
  /** A map of related resources of this resource, keyed by the relationship type. A relationship type is in the format of {SourceType}_{ACTION}_{DestType}. Example: `DISK_TO_INSTANCE`, `DISK_TO_NETWORK`, `INSTANCE_TO_INSTANCEGROUP`. See [supported relationship types](https://cloud.google.com/asset-inventory/docs/supported-asset-types#supported_relationship_types). */
  relationships?: Record<string, RelatedResources>;
  /** Versioned resource representations of this resource. This is repeated because there could be multiple versions of resource representations during version migration. This `versioned_resources` field is not searchable. Some attributes of the resource representations are exposed in `additional_attributes` field, so as to allow users to search on them. */
  versionedResources?: Array<VersionedResource>;
  /** Location can be `global`, regional like `us-east1`, or zonal like `us-west1-b`. This field is available only when the resource's Protobuf contains it. To search against the `location`: * Use a field query. Example: `location:us-west*` * Use a free text query. Example: `us-west*` */
  location?: string;
  /** The project that this resource belongs to, in the form of projects/{PROJECT_NUMBER}. This field is available when the resource belongs to a project. To search against `project`: * Use a field query. Example: `project:12345` * Use a free text query. Example: `12345` * Specify the `scope` field as this project in your search request. */
  project?: string;
  /** The tags directly attached to this resource. To search against the `tags`: * Use a field query. Example: - `tagKeys:"123456789/env*"` - `tagKeys="123456789/env"` - `tagKeys:"env"` - `tagKeyIds="tagKeys/123"` - `tagValues:"env"` - `tagValues:"env/prod"` - `tagValues:"123456789/env/prod*"` - `tagValues="123456789/env/prod"` - `tagValueIds="tagValues/456"` * Use a free text query. Example: - `env/prod` */
  tags?: Array<Tag>;
  /** The type of this resource. Example: `compute.googleapis.com/Disk`. To search against the `asset_type`: * Specify the `asset_type` field in your search request. */
  assetType?: string;
  /** User labels associated with this resource. See [Labelling and grouping Google Cloud resources](https://cloud.google.com/blog/products/gcp/labelling-and-grouping-your-google-cloud-platform-resources) for more information. This field is available only when the resource's Protobuf contains it. To search against the `labels`: * Use a field query: - query on any label's key or value. Example: `labels:prod` - query by a given label. Example: `labels.env:prod` - query by a given label's existence. Example: `labels.env:*` * Use a free text query. Example: `prod` */
  labels?: Record<string, string>;
  /** The actual content of Security Command Center security marks associated with the asset. To search against SCC SecurityMarks field: * Use a field query: - query by a given key value pair. Example: `sccSecurityMarks.foo=bar` - query by a given key's existence. Example: `sccSecurityMarks.foo:*` */
  sccSecurityMarks?: Record<string, string>;
  /** The full resource name of this resource. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`. See [Cloud Asset Inventory Resource Name Format](https://cloud.google.com/asset-inventory/docs/resource-name-format) for more information. To search against the `name`: * Use a field query. Example: `name:instance1` * Use a free text query. Example: `instance1` */
  name?: string;
  /** Network tags associated with this resource. Like labels, network tags are a type of annotations used to group Google Cloud resources. See [Labelling Google Cloud resources](https://cloud.google.com/blog/products/gcp/labelling-and-grouping-your-google-cloud-platform-resources) for more information. This field is available only when the resource's Protobuf contains it. To search against the `network_tags`: * Use a field query. Example: `networkTags:internal` * Use a free text query. Example: `internal` */
  networkTags?: Array<string>;
  /** The effective tags on this resource. All of the tags that are both attached to and inherited by a resource are collectively called the effective tags. For more information, see [tag inheritance](https://cloud.google.com/resource-manager/docs/tags/tags-overview#inheritance). To search against the `effective_tags`: * Use a field query. Example: - `effectiveTagKeys:"123456789/env*"` - `effectiveTagKeys="123456789/env"` - `effectiveTagKeys:"env"` - `effectiveTagKeyIds="tagKeys/123"` - `effectiveTagValues:"env"` - `effectiveTagValues:"env/prod"` - `effectiveTagValues:"123456789/env/prod*"` - `effectiveTagValues="123456789/env/prod"` - `effectiveTagValueIds="tagValues/456"` */
  effectiveTags?: Array<EffectiveTagDetails>;
  /** Enrichments of the asset. Currently supported enrichment types with SearchAllResources API: * RESOURCE_OWNERS The corresponding read masks in order to get the enrichment: * enrichments.resource_owners The corresponding required permissions: * cloudasset.assets.searchEnrichmentResourceOwners Example query to get resource owner enrichment: ``` scope: "projects/my-project" query: "name: my-project" assetTypes: "cloudresourcemanager.googleapis.com/Project" readMask: { paths: "asset_type" paths: "name" paths: "enrichments.resource_owners" } ``` */
  enrichments?: Array<AssetEnrichment>;
  /** The folder(s) that this resource belongs to, in the form of folders/{FOLDER_NUMBER}. This field is available when the resource belongs to one or more folders. To search against `folders`: * Use a field query. Example: `folders:(123 OR 456)` * Use a free text query. Example: `123` * Specify the `scope` field as this folder in your search request. */
  folders?: Array<string>;
  /** The Cloud KMS [CryptoKey](https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys) name or [CryptoKeyVersion](https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys.cryptoKeyVersions) name. This field only presents for the purpose of backward compatibility. Use the `kms_keys` field to retrieve Cloud KMS key information. This field is available only when the resource's Protobuf contains it and will only be populated for [these resource types](https://cloud.google.com/asset-inventory/docs/legacy-field-names#resource_types_with_the_to_be_deprecated_kmskey_field) for backward compatible purposes. To search against the `kms_key`: * Use a field query. Example: `kmsKey:key` * Use a free text query. Example: `key` */
  kmsKey?: string;
  /** The Cloud KMS [CryptoKey](https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys) names or [CryptoKeyVersion](https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys.cryptoKeyVersions) names. This field is available only when the resource's Protobuf contains it. To search against the `kms_keys`: * Use a field query. Example: `kmsKeys:key` * Use a free text query. Example: `key` */
  kmsKeys?: Array<string>;
  /** The last update timestamp of this resource, at which the resource was last modified or deleted. The granularity is in seconds. Timestamp.nanos will always be 0. This field is available only when the resource's Protobuf contains it. To search against `update_time`: * Use a field query. - value in seconds since unix epoch. Example: `updateTime < 1609459200` - value in date string. Example: `updateTime < 2021-01-01` - value in date-time string (must be quoted). Example: `updateTime < "2021-01-01T00:00:00"` */
  updateTime?: string;
  /** The full resource name of this resource's parent, if it has one. To search against the `parent_full_resource_name`: * Use a field query. Example: `parentFullResourceName:"project-name"` * Use a free text query. Example: `project-name` */
  parentFullResourceName?: string;
  /** This field is only present for the purpose of backward compatibility. Use the `tags` field instead. TagValue namespaced names, in the format of {ORG_ID}/{TAG_KEY_SHORT_NAME}/{TAG_VALUE_SHORT_NAME}. To search against the `tagValues`: * Use a field query. Example: - `tagValues:"env"` - `tagValues:"env/prod"` - `tagValues:"123456789/env/prod*"` - `tagValues="123456789/env/prod"` * Use a free text query. Example: - `prod` */
  tagValues?: Array<string>;
  /** One or more paragraphs of text description of this resource. Maximum length could be up to 1M bytes. This field is available only when the resource's Protobuf contains it. To search against the `description`: * Use a field query. Example: `description:"important instance"` * Use a free text query. Example: `"important instance"` */
  description?: string;
  /** The organization that this resource belongs to, in the form of organizations/{ORGANIZATION_NUMBER}. This field is available when the resource belongs to an organization. To search against `organization`: * Use a field query. Example: `organization:123` * Use a free text query. Example: `123` * Specify the `scope` field as this organization in your search request. */
  organization?: string;
  /** This field is only present for the purpose of backward compatibility. Use the `tags` field instead. TagValue IDs, in the format of tagValues/{TAG_VALUE_ID}. To search against the `tagValueIds`: * Use a field query. Example: - `tagValueIds="tagValues/456"` * Use a free text query. Example: - `456` */
  tagValueIds?: Array<string>;
  /** The create timestamp of this resource, at which the resource was created. The granularity is in seconds. Timestamp.nanos will always be 0. This field is available only when the resource's Protobuf contains it. To search against `create_time`: * Use a field query. - value in seconds since unix epoch. Example: `createTime > 1609459200` - value in date string. Example: `createTime > 2021-01-01` - value in date-time string (must be quoted). Example: `createTime > "2021-01-01T00:00:00"` */
  createTime?: string;
  /** Attached resources of this resource. For example, an OSConfig Inventory is an attached resource of a Compute Instance. This field is repeated because a resource could have multiple attached resources. This `attached_resources` field is not searchable. Some attributes of the attached resources are exposed in `additional_attributes` field, so as to allow users to search on them. */
  attachedResources?: Array<AttachedResource>;
}

export const ResourceSearchResult: Schema.Schema<ResourceSearchResult> = Schema.suspend(() => Schema.Struct({
  additionalAttributes: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  displayName: Schema.optional(Schema.String),
  parentAssetType: Schema.optional(Schema.String),
  tagKeys: Schema.optional(Schema.Array(Schema.String)),
  state: Schema.optional(Schema.String),
  relationships: Schema.optional(Schema.Record(Schema.String, RelatedResources)),
  versionedResources: Schema.optional(Schema.Array(VersionedResource)),
  location: Schema.optional(Schema.String),
  project: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Tag)),
  assetType: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  sccSecurityMarks: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.optional(Schema.String),
  networkTags: Schema.optional(Schema.Array(Schema.String)),
  effectiveTags: Schema.optional(Schema.Array(EffectiveTagDetails)),
  enrichments: Schema.optional(Schema.Array(AssetEnrichment)),
  folders: Schema.optional(Schema.Array(Schema.String)),
  kmsKey: Schema.optional(Schema.String),
  kmsKeys: Schema.optional(Schema.Array(Schema.String)),
  updateTime: Schema.optional(Schema.String),
  parentFullResourceName: Schema.optional(Schema.String),
  tagValues: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  organization: Schema.optional(Schema.String),
  tagValueIds: Schema.optional(Schema.Array(Schema.String)),
  createTime: Schema.optional(Schema.String),
  attachedResources: Schema.optional(Schema.Array(AttachedResource)),
})).annotate({ identifier: "ResourceSearchResult" }) as any as Schema.Schema<ResourceSearchResult>;

export interface VersionedPackage {
  /** The version of the package. */
  version?: string;
  /** The system architecture this package is intended for. */
  architecture?: string;
  /** The name of the package. */
  packageName?: string;
}

export const VersionedPackage: Schema.Schema<VersionedPackage> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  architecture: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
})).annotate({ identifier: "VersionedPackage" }) as any as Schema.Schema<VersionedPackage>;

export interface WindowsQuickFixEngineeringPackage {
  /** Unique identifier associated with a particular QFE update. */
  hotFixId?: string;
  /** A short textual description of the QFE update. */
  caption?: string;
  /** A textual description of the QFE update. */
  description?: string;
  /** Date that the QFE update was installed. Mapped from installed_on field. */
  installTime?: string;
}

export const WindowsQuickFixEngineeringPackage: Schema.Schema<WindowsQuickFixEngineeringPackage> = Schema.suspend(() => Schema.Struct({
  hotFixId: Schema.optional(Schema.String),
  caption: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  installTime: Schema.optional(Schema.String),
})).annotate({ identifier: "WindowsQuickFixEngineeringPackage" }) as any as Schema.Schema<WindowsQuickFixEngineeringPackage>;

export interface ZypperPatch {
  /** Any summary information provided about this patch. */
  summary?: string;
  /** The name of the patch. */
  patchName?: string;
  /** The severity specified for this patch */
  severity?: string;
  /** The category of the patch. */
  category?: string;
}

export const ZypperPatch: Schema.Schema<ZypperPatch> = Schema.suspend(() => Schema.Struct({
  summary: Schema.optional(Schema.String),
  patchName: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  category: Schema.optional(Schema.String),
})).annotate({ identifier: "ZypperPatch" }) as any as Schema.Schema<ZypperPatch>;

export interface WindowsUpdateCategory {
  /** The name of the windows update category. */
  name?: string;
  /** The identifier of the windows update category. */
  id?: string;
}

export const WindowsUpdateCategory: Schema.Schema<WindowsUpdateCategory> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "WindowsUpdateCategory" }) as any as Schema.Schema<WindowsUpdateCategory>;

export interface WindowsUpdatePackage {
  /** The last published date of the update, in (UTC) date and time. */
  lastDeploymentChangeTime?: string;
  /** Gets the identifier of an update package. Stays the same across revisions. */
  updateId?: string;
  /** A hyperlink to the language-specific support information for the update. */
  supportUrl?: string;
  /** A collection of URLs that provide more information about the update package. */
  moreInfoUrls?: Array<string>;
  /** A collection of Microsoft Knowledge Base article IDs that are associated with the update package. */
  kbArticleIds?: Array<string>;
  /** The categories that are associated with this update package. */
  categories?: Array<WindowsUpdateCategory>;
  /** The localized title of the update package. */
  title?: string;
  /** The localized description of the update package. */
  description?: string;
  /** The revision number of this update package. */
  revisionNumber?: number;
}

export const WindowsUpdatePackage: Schema.Schema<WindowsUpdatePackage> = Schema.suspend(() => Schema.Struct({
  lastDeploymentChangeTime: Schema.optional(Schema.String),
  updateId: Schema.optional(Schema.String),
  supportUrl: Schema.optional(Schema.String),
  moreInfoUrls: Schema.optional(Schema.Array(Schema.String)),
  kbArticleIds: Schema.optional(Schema.Array(Schema.String)),
  categories: Schema.optional(Schema.Array(WindowsUpdateCategory)),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  revisionNumber: Schema.optional(Schema.Number),
})).annotate({ identifier: "WindowsUpdatePackage" }) as any as Schema.Schema<WindowsUpdatePackage>;

export interface Cloudasset_Date {
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
}

export const Cloudasset_Date: Schema.Schema<Cloudasset_Date> = Schema.suspend(() => Schema.Struct({
  day: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  year: Schema.optional(Schema.Number),
})).annotate({ identifier: "Cloudasset_Date" }) as any as Schema.Schema<Cloudasset_Date>;

export interface WindowsApplication {
  /** The internet address for technical support. */
  helpLink?: string;
  /** The name of the application or product. */
  displayName?: string;
  /** The name of the manufacturer for the product or application. */
  publisher?: string;
  /** The last time this product received service. The value of this property is replaced each time a patch is applied or removed from the product or the command-line option is used to repair the product. */
  installDate?: Cloudasset_Date;
  /** The version of the product or application in string format. */
  displayVersion?: string;
}

export const WindowsApplication: Schema.Schema<WindowsApplication> = Schema.suspend(() => Schema.Struct({
  helpLink: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  publisher: Schema.optional(Schema.String),
  installDate: Schema.optional(Cloudasset_Date),
  displayVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "WindowsApplication" }) as any as Schema.Schema<WindowsApplication>;

export interface SoftwarePackage {
  /** Details of a Zypper package. For details about the Zypper package manager, see https://en.opensuse.org/SDB:Zypper_manual. */
  zypperPackage?: VersionedPackage;
  /** Details of a Windows Quick Fix engineering package. See https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering for info in Windows Quick Fix Engineering. */
  qfePackage?: WindowsQuickFixEngineeringPackage;
  /** Details of a Zypper patch. For details about the Zypper package manager, see https://en.opensuse.org/SDB:Zypper_manual. */
  zypperPatch?: ZypperPatch;
  /** Details of an APT package. For details about the apt package manager, see https://wiki.debian.org/Apt. */
  aptPackage?: VersionedPackage;
  /** Details of a Windows Update package. See https://docs.microsoft.com/en-us/windows/win32/api/_wua/ for information about Windows Update. */
  wuaPackage?: WindowsUpdatePackage;
  /** Yum package info. For details about the yum package manager, see https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/deployment_guide/ch-yum. */
  yumPackage?: VersionedPackage;
  /** Details of Windows Application. */
  windowsApplication?: WindowsApplication;
  /** Details of a COS package. */
  cosPackage?: VersionedPackage;
  /** Details of a Googet package. For details about the googet package manager, see https://github.com/google/googet. */
  googetPackage?: VersionedPackage;
}

export const SoftwarePackage: Schema.Schema<SoftwarePackage> = Schema.suspend(() => Schema.Struct({
  zypperPackage: Schema.optional(VersionedPackage),
  qfePackage: Schema.optional(WindowsQuickFixEngineeringPackage),
  zypperPatch: Schema.optional(ZypperPatch),
  aptPackage: Schema.optional(VersionedPackage),
  wuaPackage: Schema.optional(WindowsUpdatePackage),
  yumPackage: Schema.optional(VersionedPackage),
  windowsApplication: Schema.optional(WindowsApplication),
  cosPackage: Schema.optional(VersionedPackage),
  googetPackage: Schema.optional(VersionedPackage),
})).annotate({ identifier: "SoftwarePackage" }) as any as Schema.Schema<SoftwarePackage>;

export interface Item {
  /** The origin of this inventory item. */
  originType?: "ORIGIN_TYPE_UNSPECIFIED" | "INVENTORY_REPORT" | (string & {});
  /** The specific type of inventory, correlating to its specific details. */
  type?: "TYPE_UNSPECIFIED" | "INSTALLED_PACKAGE" | "AVAILABLE_PACKAGE" | (string & {});
  /** When this inventory item was first detected. */
  createTime?: string;
  /** Identifier for this item, unique across items for this VM. */
  id?: string;
  /** Software package available to be installed on the VM instance. */
  availablePackage?: SoftwarePackage;
  /** Software package present on the VM instance. */
  installedPackage?: SoftwarePackage;
  /** When this inventory item was last modified. */
  updateTime?: string;
}

export const Item: Schema.Schema<Item> = Schema.suspend(() => Schema.Struct({
  originType: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  availablePackage: Schema.optional(SoftwarePackage),
  installedPackage: Schema.optional(SoftwarePackage),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Item" }) as any as Schema.Schema<Item>;

export interface GoogleCloudAssetV1p7beta1RelatedAsset {
  /** The ancestors of an asset in Google Cloud [resource hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), represented as a list of relative resource names. An ancestry path starts with the closest ancestor in the hierarchy and ends at root. Example: `["projects/123456789", "folders/5432", "organizations/1234"]` */
  ancestors?: Array<string>;
  /** The type of the asset. Example: `compute.googleapis.com/Disk` See [Supported asset types](https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information. */
  assetType?: string;
  /** The full name of the asset. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1` See [Resource names](https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. */
  asset?: string;
}

export const GoogleCloudAssetV1p7beta1RelatedAsset: Schema.Schema<GoogleCloudAssetV1p7beta1RelatedAsset> = Schema.suspend(() => Schema.Struct({
  ancestors: Schema.optional(Schema.Array(Schema.String)),
  assetType: Schema.optional(Schema.String),
  asset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAssetV1p7beta1RelatedAsset" }) as any as Schema.Schema<GoogleCloudAssetV1p7beta1RelatedAsset>;

export interface Permissions {
  /** A list of permissions. A sample permission string: `compute.disk.get`. */
  permissions?: Array<string>;
}

export const Permissions: Schema.Schema<Permissions> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Permissions" }) as any as Schema.Schema<Permissions>;

export interface Explanation {
  /** The map from roles to their included permissions that match the permission query (i.e., a query containing `policy.role.permissions:`). Example: if query `policy.role.permissions:compute.disk.get` matches a policy binding that contains owner role, the matched_permissions will be `{"roles/owner": ["compute.disk.get"]}`. The roles can also be found in the returned `policy` bindings. Note that the map is populated only for requests with permission queries. */
  matchedPermissions?: Record<string, Permissions>;
}

export const Explanation: Schema.Schema<Explanation> = Schema.suspend(() => Schema.Struct({
  matchedPermissions: Schema.optional(Schema.Record(Schema.String, Permissions)),
})).annotate({ identifier: "Explanation" }) as any as Schema.Schema<Explanation>;

export interface AuditLogConfig {
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
  logType: Schema.optional(Schema.String),
})).annotate({ identifier: "AuditLogConfig" }) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Policy {
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  bindings: Schema.optional(Schema.Array(Binding)),
  etag: Schema.optional(Schema.String),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  version: Schema.optional(Schema.Number),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface IamPolicySearchResult {
  /** The type of the resource associated with this IAM policy. Example: `compute.googleapis.com/Disk`. To search against the `asset_type`: * specify the `asset_types` field in your search request. */
  assetType?: string;
  /** The project that the associated Google Cloud resource belongs to, in the form of projects/{PROJECT_NUMBER}. If an IAM policy is set on a resource (like VM instance, Cloud Storage bucket), the project field will indicate the project that contains the resource. If an IAM policy is set on a folder or organization, this field will be empty. To search against the `project`: * specify the `scope` field as this project in your search request. */
  project?: string;
  /** The folder(s) that the IAM policy belongs to, in the form of folders/{FOLDER_NUMBER}. This field is available when the IAM policy belongs to one or more folders. To search against `folders`: * use a field query. Example: `folders:(123 OR 456)` * use a free text query. Example: `123` * specify the `scope` field as this folder in your search request. */
  folders?: Array<string>;
  /** The organization that the IAM policy belongs to, in the form of organizations/{ORGANIZATION_NUMBER}. This field is available when the IAM policy belongs to an organization. To search against `organization`: * use a field query. Example: `organization:123` * use a free text query. Example: `123` * specify the `scope` field as this organization in your search request. */
  organization?: string;
  /** Explanation about the IAM policy search result. It contains additional information to explain why the search result matches the query. */
  explanation?: Explanation;
  /** The IAM policy directly set on the given resource. Note that the original IAM policy can contain multiple bindings. This only contains the bindings that match the given query. For queries that don't contain a constrain on policies (e.g., an empty query), this contains all the bindings. To search against the `policy` bindings: * use a field query: - query by the policy contained members. Example: `policy:amy@gmail.com` - query by the policy contained roles. Example: `policy:roles/compute.admin` - query by the policy contained roles' included permissions. Example: `policy.role.permissions:compute.instances.create` */
  policy?: Policy;
  /** The full resource name of the resource associated with this IAM policy. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`. See [Cloud Asset Inventory Resource Name Format](https://cloud.google.com/asset-inventory/docs/resource-name-format) for more information. To search against the `resource`: * use a field query. Example: `resource:organizations/123` */
  resource?: string;
}

export const IamPolicySearchResult: Schema.Schema<IamPolicySearchResult> = Schema.suspend(() => Schema.Struct({
  assetType: Schema.optional(Schema.String),
  project: Schema.optional(Schema.String),
  folders: Schema.optional(Schema.Array(Schema.String)),
  organization: Schema.optional(Schema.String),
  explanation: Schema.optional(Explanation),
  policy: Schema.optional(Policy),
  resource: Schema.optional(Schema.String),
})).annotate({ identifier: "IamPolicySearchResult" }) as any as Schema.Schema<IamPolicySearchResult>;

export interface GoogleCloudAssetV1CustomConstraint {
  /** One line display name for the UI. */
  displayName?: string;
  /** All the operations being applied for this constraint. */
  methodTypes?: Array<"METHOD_TYPE_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | "REMOVE_GRANT" | "GOVERN_TAGS" | (string & {})>;
  /** Allow or deny type. */
  actionType?: "ACTION_TYPE_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  /** Organization Policy condition/expression. For example: `resource.instanceName.matches("(production|test)_(.+_)?[\d]+")'` or, `resource.management.auto_upgrade == true` */
  condition?: string;
  /** Name of the constraint. This is unique within the organization. Format of the name should be * `organizations/{organization_id}/customConstraints/{custom_constraint_id}` Example : "organizations/123/customConstraints/custom.createOnlyE2TypeVms" */
  name?: string;
  /** Detailed information about this custom policy constraint. */
  description?: string;
  /** The Resource Instance type on which this policy applies to. Format will be of the form : "/" Example: * `compute.googleapis.com/Instance`. */
  resourceTypes?: Array<string>;
}

export const GoogleCloudAssetV1CustomConstraint: Schema.Schema<GoogleCloudAssetV1CustomConstraint> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  methodTypes: Schema.optional(Schema.Array(Schema.String)),
  actionType: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  resourceTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudAssetV1CustomConstraint" }) as any as Schema.Schema<GoogleCloudAssetV1CustomConstraint>;

export interface GoogleCloudAssetV1ListConstraint {
  /** Indicates whether subtrees of Cloud Resource Manager resource hierarchy can be used in `Policy.allowed_values` and `Policy.denied_values`. For example, `"under:folders/123"` would match any resource under the 'folders/123' folder. */
  supportsUnder?: boolean;
  /** Indicates whether values grouped into categories can be used in `Policy.allowed_values` and `Policy.denied_values`. For example, `"in:Python"` would match any value in the 'Python' group. */
  supportsIn?: boolean;
}

export const GoogleCloudAssetV1ListConstraint: Schema.Schema<GoogleCloudAssetV1ListConstraint> = Schema.suspend(() => Schema.Struct({
  supportsUnder: Schema.optional(Schema.Boolean),
  supportsIn: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudAssetV1ListConstraint" }) as any as Schema.Schema<GoogleCloudAssetV1ListConstraint>;

export interface GoogleCloudAssetV1BooleanConstraint {
}

export const GoogleCloudAssetV1BooleanConstraint: Schema.Schema<GoogleCloudAssetV1BooleanConstraint> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudAssetV1BooleanConstraint" }) as any as Schema.Schema<GoogleCloudAssetV1BooleanConstraint>;

export interface GoogleCloudAssetV1Constraint {
  /** Defines this constraint as being a ListConstraint. */
  listConstraint?: GoogleCloudAssetV1ListConstraint;
  /** The human readable name of the constraint. */
  displayName?: string;
  /** The evaluation behavior of this constraint in the absence of 'Policy'. */
  constraintDefault?: "CONSTRAINT_DEFAULT_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  /** Defines this constraint as being a BooleanConstraint. */
  booleanConstraint?: GoogleCloudAssetV1BooleanConstraint;
  /** The unique name of the constraint. Format of the name should be * `constraints/{constraint_name}` For example, `constraints/compute.disableSerialPortAccess`. */
  name?: string;
  /** Detailed description of what this `Constraint` controls as well as how and where it is enforced. */
  description?: string;
}

export const GoogleCloudAssetV1Constraint: Schema.Schema<GoogleCloudAssetV1Constraint> = Schema.suspend(() => Schema.Struct({
  listConstraint: Schema.optional(GoogleCloudAssetV1ListConstraint),
  displayName: Schema.optional(Schema.String),
  constraintDefault: Schema.optional(Schema.String),
  booleanConstraint: Schema.optional(GoogleCloudAssetV1BooleanConstraint),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAssetV1Constraint" }) as any as Schema.Schema<GoogleCloudAssetV1Constraint>;

export interface AnalyzerOrgPolicyConstraint {
  /** The definition of the custom constraint. */
  customConstraint?: GoogleCloudAssetV1CustomConstraint;
  /** The definition of the canned constraint defined by Google. */
  googleDefinedConstraint?: GoogleCloudAssetV1Constraint;
}

export const AnalyzerOrgPolicyConstraint: Schema.Schema<AnalyzerOrgPolicyConstraint> = Schema.suspend(() => Schema.Struct({
  customConstraint: Schema.optional(GoogleCloudAssetV1CustomConstraint),
  googleDefinedConstraint: Schema.optional(GoogleCloudAssetV1Constraint),
})).annotate({ identifier: "AnalyzerOrgPolicyConstraint" }) as any as Schema.Schema<AnalyzerOrgPolicyConstraint>;

export interface AnalyzeIamPolicyLongrunningResponse {
}

export const AnalyzeIamPolicyLongrunningResponse: Schema.Schema<AnalyzeIamPolicyLongrunningResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AnalyzeIamPolicyLongrunningResponse" }) as any as Schema.Schema<AnalyzeIamPolicyLongrunningResponse>;

export interface RelatedAsset {
  /** The full name of the asset. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1` See [Resource names](https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. */
  asset?: string;
  /** The unique identifier of the relationship type. Example: `INSTANCE_TO_INSTANCEGROUP` */
  relationshipType?: string;
  /** The ancestors of an asset in Google Cloud [resource hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), represented as a list of relative resource names. An ancestry path starts with the closest ancestor in the hierarchy and ends at root. Example: `["projects/123456789", "folders/5432", "organizations/1234"]` */
  ancestors?: Array<string>;
  /** The type of the asset. Example: `compute.googleapis.com/Disk` See [Supported asset types](https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information. */
  assetType?: string;
}

export const RelatedAsset: Schema.Schema<RelatedAsset> = Schema.suspend(() => Schema.Struct({
  asset: Schema.optional(Schema.String),
  relationshipType: Schema.optional(Schema.String),
  ancestors: Schema.optional(Schema.Array(Schema.String)),
  assetType: Schema.optional(Schema.String),
})).annotate({ identifier: "RelatedAsset" }) as any as Schema.Schema<RelatedAsset>;

export interface RelationshipAttributes {
  /** The detail of the relationship, e.g. `contains`, `attaches` */
  action?: string;
  /** The source asset type. Example: `compute.googleapis.com/Instance` */
  sourceResourceType?: string;
  /** The target asset type. Example: `compute.googleapis.com/Disk` */
  targetResourceType?: string;
  /** The unique identifier of the relationship type. Example: `INSTANCE_TO_INSTANCEGROUP` */
  type?: string;
}

export const RelationshipAttributes: Schema.Schema<RelationshipAttributes> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  sourceResourceType: Schema.optional(Schema.String),
  targetResourceType: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "RelationshipAttributes" }) as any as Schema.Schema<RelationshipAttributes>;

export interface RelatedAssets {
  /** The peer resources of the relationship. */
  assets?: Array<RelatedAsset>;
  /** The detailed relationship attributes. */
  relationshipAttributes?: RelationshipAttributes;
}

export const RelatedAssets: Schema.Schema<RelatedAssets> = Schema.suspend(() => Schema.Struct({
  assets: Schema.optional(Schema.Array(RelatedAsset)),
  relationshipAttributes: Schema.optional(RelationshipAttributes),
})).annotate({ identifier: "RelatedAssets" }) as any as Schema.Schema<RelatedAssets>;

export interface QueryContent {
  /** An IAM Policy Analysis query, which could be used in the AssetService.AnalyzeIamPolicy RPC or the AssetService.AnalyzeIamPolicyLongrunning RPC. */
  iamPolicyAnalysisQuery?: IamPolicyAnalysisQuery;
}

export const QueryContent: Schema.Schema<QueryContent> = Schema.suspend(() => Schema.Struct({
  iamPolicyAnalysisQuery: Schema.optional(IamPolicyAnalysisQuery),
})).annotate({ identifier: "QueryContent" }) as any as Schema.Schema<QueryContent>;

export interface SavedQuery {
  /** Output only. The create time of this saved query. */
  createTime?: string;
  /** The resource name of the saved query. The format must be: * projects/project_number/savedQueries/saved_query_id * folders/folder_number/savedQueries/saved_query_id * organizations/organization_number/savedQueries/saved_query_id */
  name?: string;
  /** Labels applied on the resource. This value should not contain more than 10 entries. The key and value of each entry must be non-empty and fewer than 64 characters. */
  labels?: Record<string, string>;
  /** The description of this saved query. This value should be fewer than 255 characters. */
  description?: string;
  /** Output only. The last update time of this saved query. */
  lastUpdateTime?: string;
  /** The query content. */
  content?: QueryContent;
  /** Output only. The account's email address who has updated this saved query most recently. */
  lastUpdater?: string;
  /** Output only. The account's email address who has created this saved query. */
  creator?: string;
}

export const SavedQuery: Schema.Schema<SavedQuery> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  lastUpdateTime: Schema.optional(Schema.String),
  content: Schema.optional(QueryContent),
  lastUpdater: Schema.optional(Schema.String),
  creator: Schema.optional(Schema.String),
})).annotate({ identifier: "SavedQuery" }) as any as Schema.Schema<SavedQuery>;

export interface ListSavedQueriesResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** A list of savedQueries. */
  savedQueries?: Array<SavedQuery>;
}

export const ListSavedQueriesResponse: Schema.Schema<ListSavedQueriesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  savedQueries: Schema.optional(Schema.Array(SavedQuery)),
})).annotate({ identifier: "ListSavedQueriesResponse" }) as any as Schema.Schema<ListSavedQueriesResponse>;

export interface AnalyzeIamPolicyLongrunningMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
}

export const AnalyzeIamPolicyLongrunningMetadata: Schema.Schema<AnalyzeIamPolicyLongrunningMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "AnalyzeIamPolicyLongrunningMetadata" }) as any as Schema.Schema<AnalyzeIamPolicyLongrunningMetadata>;

export interface GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy {
  /** The IAM policy directly set on the given resource. */
  policy?: Policy;
  /** The organization that this IAM policy belongs to, in the format of organizations/{ORGANIZATION_NUMBER}. This field is available when the IAM policy belongs (directly or cascadingly) to an organization. */
  organization?: string;
  /** The asset type of the AnalyzeOrgPolicyGovernedAssetsResponse.GovernedIamPolicy.attached_resource. Example: `cloudresourcemanager.googleapis.com/Project` See [Cloud Asset Inventory Supported Asset Types](https://cloud.google.com/asset-inventory/docs/supported-asset-types) for all supported asset types. */
  assetType?: string;
  /** The folder(s) that this IAM policy belongs to, in the format of folders/{FOLDER_NUMBER}. This field is available when the IAM policy belongs (directly or cascadingly) to one or more folders. */
  folders?: Array<string>;
  /** The full resource name of the resource on which this IAM policy is set. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`. See [Cloud Asset Inventory Resource Name Format](https://cloud.google.com/asset-inventory/docs/resource-name-format) for more information. */
  attachedResource?: string;
  /** The project that this IAM policy belongs to, in the format of projects/{PROJECT_NUMBER}. This field is available when the IAM policy belongs to a project. */
  project?: string;
}

export const GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy: Schema.Schema<GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
  organization: Schema.optional(Schema.String),
  assetType: Schema.optional(Schema.String),
  folders: Schema.optional(Schema.Array(Schema.String)),
  attachedResource: Schema.optional(Schema.String),
  project: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy" }) as any as Schema.Schema<GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy>;

export interface GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedResource {
  /** The effective tags on this resource. */
  effectiveTags?: Array<EffectiveTagDetails>;
  /** The project that this resource belongs to, in the format of projects/{PROJECT_NUMBER}. This field is available when the resource belongs to a project. */
  project?: string;
  /** The folder(s) that this resource belongs to, in the format of folders/{FOLDER_NUMBER}. This field is available when the resource belongs (directly or cascadingly) to one or more folders. */
  folders?: Array<string>;
  /** The asset type of the AnalyzeOrgPolicyGovernedAssetsResponse.GovernedResource.full_resource_name Example: `cloudresourcemanager.googleapis.com/Project` See [Cloud Asset Inventory Supported Asset Types](https://cloud.google.com/asset-inventory/docs/supported-asset-types) for all supported asset types. */
  assetType?: string;
  /** The organization that this resource belongs to, in the format of organizations/{ORGANIZATION_NUMBER}. This field is available when the resource belongs (directly or cascadingly) to an organization. */
  organization?: string;
  /** The [full resource name] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of the parent of AnalyzeOrgPolicyGovernedAssetsResponse.GovernedResource.full_resource_name. */
  parent?: string;
  /** The [full resource name] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of the Google Cloud resource. */
  fullResourceName?: string;
}

export const GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedResource: Schema.Schema<GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedResource> = Schema.suspend(() => Schema.Struct({
  effectiveTags: Schema.optional(Schema.Array(EffectiveTagDetails)),
  project: Schema.optional(Schema.String),
  folders: Schema.optional(Schema.Array(Schema.String)),
  assetType: Schema.optional(Schema.String),
  organization: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  fullResourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedResource" }) as any as Schema.Schema<GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedResource>;

export interface GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset {
  /** The consolidated policy for the analyzed asset. The consolidated policy is computed by merging and evaluating AnalyzeOrgPolicyGovernedAssetsResponse.GovernedAsset.policy_bundle. The evaluation will respect the organization policy [hierarchy rules](https://cloud.google.com/resource-manager/docs/organization-policy/understanding-hierarchy). */
  consolidatedPolicy?: AnalyzerOrgPolicy;
  /** An IAM policy governed by the organization policies of the AnalyzeOrgPolicyGovernedAssetsRequest.constraint. */
  governedIamPolicy?: GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy;
  /** The ordered list of all organization policies from the consolidated_policy.attached_resource to the scope specified in the request. If the constraint is defined with default policy, it will also appear in the list. */
  policyBundle?: Array<AnalyzerOrgPolicy>;
  /** A Google Cloud resource governed by the organization policies of the AnalyzeOrgPolicyGovernedAssetsRequest.constraint. */
  governedResource?: GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedResource;
}

export const GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset: Schema.Schema<GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset> = Schema.suspend(() => Schema.Struct({
  consolidatedPolicy: Schema.optional(AnalyzerOrgPolicy),
  governedIamPolicy: Schema.optional(GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy),
  policyBundle: Schema.optional(Schema.Array(AnalyzerOrgPolicy)),
  governedResource: Schema.optional(GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedResource),
})).annotate({ identifier: "GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset" }) as any as Schema.Schema<GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset>;

export interface Resource {
  /** The URL of the discovery document containing the resource's JSON schema. Example: `https://www.googleapis.com/discovery/v1/apis/compute/v1/rest` This value is unspecified for resources that do not have an API based on a discovery document, such as Cloud Bigtable. */
  discoveryDocumentUri?: string;
  /** The full name of the immediate parent of this resource. See [Resource Names](https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. For Google Cloud assets, this value is the parent resource defined in the [IAM policy hierarchy](https://cloud.google.com/iam/docs/overview#policy_hierarchy). Example: `//cloudresourcemanager.googleapis.com/projects/my_project_123` */
  parent?: string;
  /** The REST URL for accessing the resource. An HTTP `GET` request using this URL returns the resource itself. Example: `https://cloudresourcemanager.googleapis.com/v1/projects/my-project-123` This value is unspecified for resources without a REST API. */
  resourceUrl?: string;
  /** The location of the resource in Google Cloud, such as its zone and region. For more information, see https://cloud.google.com/about/locations/. */
  location?: string;
  /** The content of the resource, in which some sensitive fields are removed and may not be present. */
  data?: Record<string, unknown>;
  /** The API version. Example: `v1` */
  version?: string;
  /** The JSON schema name listed in the discovery document. Example: `Project` This value is unspecified for resources that do not have an API based on a discovery document, such as Cloud Bigtable. */
  discoveryName?: string;
}

export const Resource: Schema.Schema<Resource> = Schema.suspend(() => Schema.Struct({
  discoveryDocumentUri: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  resourceUrl: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  data: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  version: Schema.optional(Schema.String),
  discoveryName: Schema.optional(Schema.String),
})).annotate({ identifier: "Resource" }) as any as Schema.Schema<Resource>;

export interface GoogleIdentityAccesscontextmanagerV1CustomLevel {
  /** Required. A Cloud CEL expression evaluating to a boolean. */
  expr?: Expr;
}

export const GoogleIdentityAccesscontextmanagerV1CustomLevel: Schema.Schema<GoogleIdentityAccesscontextmanagerV1CustomLevel> = Schema.suspend(() => Schema.Struct({
  expr: Schema.optional(Expr),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1CustomLevel" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1CustomLevel>;

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

export interface Operation {
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface GoogleCloudOrgpolicyV1RestoreDefault {
}

export const GoogleCloudOrgpolicyV1RestoreDefault: Schema.Schema<GoogleCloudOrgpolicyV1RestoreDefault> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudOrgpolicyV1RestoreDefault" }) as any as Schema.Schema<GoogleCloudOrgpolicyV1RestoreDefault>;

export interface GoogleCloudOrgpolicyV1BooleanPolicy {
  /** If `true`, then the `Policy` is enforced. If `false`, then any configuration is acceptable. Suppose you have a `Constraint` `constraints/compute.disableSerialPortAccess` with `constraint_default` set to `ALLOW`. A `Policy` for that `Constraint` exhibits the following behavior: - If the `Policy` at this resource has enforced set to `false`, serial port connection attempts will be allowed. - If the `Policy` at this resource has enforced set to `true`, serial port connection attempts will be refused. - If the `Policy` at this resource is `RestoreDefault`, serial port connection attempts will be allowed. - If no `Policy` is set at this resource or anywhere higher in the resource hierarchy, serial port connection attempts will be allowed. - If no `Policy` is set at this resource, but one exists higher in the resource hierarchy, the behavior is as if the`Policy` were set at this resource. The following examples demonstrate the different possible layerings: Example 1 (nearest `Constraint` wins): `organizations/foo` has a `Policy` with: {enforced: false} `projects/bar` has no `Policy` set. The constraint at `projects/bar` and `organizations/foo` will not be enforced. Example 2 (enforcement gets replaced): `organizations/foo` has a `Policy` with: {enforced: false} `projects/bar` has a `Policy` with: {enforced: true} The constraint at `organizations/foo` is not enforced. The constraint at `projects/bar` is enforced. Example 3 (RestoreDefault): `organizations/foo` has a `Policy` with: {enforced: true} `projects/bar` has a `Policy` with: {RestoreDefault: {}} The constraint at `organizations/foo` is enforced. The constraint at `projects/bar` is not enforced, because `constraint_default` for the `Constraint` is `ALLOW`. */
  enforced?: boolean;
}

export const GoogleCloudOrgpolicyV1BooleanPolicy: Schema.Schema<GoogleCloudOrgpolicyV1BooleanPolicy> = Schema.suspend(() => Schema.Struct({
  enforced: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudOrgpolicyV1BooleanPolicy" }) as any as Schema.Schema<GoogleCloudOrgpolicyV1BooleanPolicy>;

export interface GoogleCloudOrgpolicyV1ListPolicy {
  /** List of values denied at this resource. Can only be set if `all_values` is set to `ALL_VALUES_UNSPECIFIED`. */
  deniedValues?: Array<string>;
  /** The policy all_values state. */
  allValues?: "ALL_VALUES_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  /** Determines the inheritance behavior for this `Policy`. By default, a `ListPolicy` set at a resource supersedes any `Policy` set anywhere up the resource hierarchy. However, if `inherit_from_parent` is set to `true`, then the values from the effective `Policy` of the parent resource are inherited, meaning the values set in this `Policy` are added to the values inherited up the hierarchy. Setting `Policy` hierarchies that inherit both allowed values and denied values isn't recommended in most circumstances to keep the configuration simple and understandable. However, it is possible to set a `Policy` with `allowed_values` set that inherits a `Policy` with `denied_values` set. In this case, the values that are allowed must be in `allowed_values` and not present in `denied_values`. For example, suppose you have a `Constraint` `constraints/serviceuser.services`, which has a `constraint_type` of `list_constraint`, and with `constraint_default` set to `ALLOW`. Suppose that at the Organization level, a `Policy` is applied that restricts the allowed API activations to {`E1`, `E2`}. Then, if a `Policy` is applied to a project below the Organization that has `inherit_from_parent` set to `false` and field all_values set to DENY, then an attempt to activate any API will be denied. The following examples demonstrate different possible layerings for `projects/bar` parented by `organizations/foo`: Example 1 (no inherited values): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values:"E2"} `projects/bar` has `inherit_from_parent` `false` and values: {allowed_values: "E3" allowed_values: "E4"} The accepted values at `organizations/foo` are `E1`, `E2`. The accepted values at `projects/bar` are `E3`, and `E4`. Example 2 (inherited values): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values:"E2"} `projects/bar` has a `Policy` with values: {value: "E3" value: "E4" inherit_from_parent: true} The accepted values at `organizations/foo` are `E1`, `E2`. The accepted values at `projects/bar` are `E1`, `E2`, `E3`, and `E4`. Example 3 (inheriting both allowed and denied values): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values: "E2"} `projects/bar` has a `Policy` with: {denied_values: "E1"} The accepted values at `organizations/foo` are `E1`, `E2`. The value accepted at `projects/bar` is `E2`. Example 4 (RestoreDefault): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values:"E2"} `projects/bar` has a `Policy` with values: {RestoreDefault: {}} The accepted values at `organizations/foo` are `E1`, `E2`. The accepted values at `projects/bar` are either all or none depending on the value of `constraint_default` (if `ALLOW`, all; if `DENY`, none). Example 5 (no policy inherits parent policy): `organizations/foo` has no `Policy` set. `projects/bar` has no `Policy` set. The accepted values at both levels are either all or none depending on the value of `constraint_default` (if `ALLOW`, all; if `DENY`, none). Example 6 (ListConstraint allowing all): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values: "E2"} `projects/bar` has a `Policy` with: {all: ALLOW} The accepted values at `organizations/foo` are `E1`, E2`. Any value is accepted at `projects/bar`. Example 7 (ListConstraint allowing none): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values: "E2"} `projects/bar` has a `Policy` with: {all: DENY} The accepted values at `organizations/foo` are `E1`, E2`. No value is accepted at `projects/bar`. Example 10 (allowed and denied subtrees of Resource Manager hierarchy): Given the following resource hierarchy O1->{F1, F2}; F1->{P1}; F2->{P2, P3}, `organizations/foo` has a `Policy` with values: {allowed_values: "under:organizations/O1"} `projects/bar` has a `Policy` with: {allowed_values: "under:projects/P3"} {denied_values: "under:folders/F2"} The accepted values at `organizations/foo` are `organizations/O1`, `folders/F1`, `folders/F2`, `projects/P1`, `projects/P2`, `projects/P3`. The accepted values at `projects/bar` are `organizations/O1`, `folders/F1`, `projects/P1`. */
  inheritFromParent?: boolean;
  /** Optional. The Google Cloud Console will try to default to a configuration that matches the value specified in this `Policy`. If `suggested_value` is not set, it will inherit the value specified higher in the hierarchy, unless `inherit_from_parent` is `false`. */
  suggestedValue?: string;
  /** List of values allowed at this resource. Can only be set if `all_values` is set to `ALL_VALUES_UNSPECIFIED`. */
  allowedValues?: Array<string>;
}

export const GoogleCloudOrgpolicyV1ListPolicy: Schema.Schema<GoogleCloudOrgpolicyV1ListPolicy> = Schema.suspend(() => Schema.Struct({
  deniedValues: Schema.optional(Schema.Array(Schema.String)),
  allValues: Schema.optional(Schema.String),
  inheritFromParent: Schema.optional(Schema.Boolean),
  suggestedValue: Schema.optional(Schema.String),
  allowedValues: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudOrgpolicyV1ListPolicy" }) as any as Schema.Schema<GoogleCloudOrgpolicyV1ListPolicy>;

export interface GoogleCloudOrgpolicyV1Policy {
  /** The time stamp the `Policy` was previously updated. This is set by the server, not specified by the caller, and represents the last time a call to `SetOrgPolicy` was made for that `Policy`. Any value set by the client will be ignored. */
  updateTime?: string;
  /** Restores the default behavior of the constraint; independent of `Constraint` type. */
  restoreDefault?: GoogleCloudOrgpolicyV1RestoreDefault;
  /** The name of the `Constraint` the `Policy` is configuring, for example, `constraints/serviceuser.services`. A [list of available constraints](/resource-manager/docs/organization-policy/org-policy-constraints) is available. Immutable after creation. */
  constraint?: string;
  /** An opaque tag indicating the current version of the `Policy`, used for concurrency control. When the `Policy` is returned from either a `GetPolicy` or a `ListOrgPolicy` request, this `etag` indicates the version of the current `Policy` to use when executing a read-modify-write loop. When the `Policy` is returned from a `GetEffectivePolicy` request, the `etag` will be unset. When the `Policy` is used in a `SetOrgPolicy` method, use the `etag` value that was returned from a `GetOrgPolicy` request as part of a read-modify-write loop for concurrency control. Not setting the `etag`in a `SetOrgPolicy` request will result in an unconditional write of the `Policy`. */
  etag?: string;
  /** For boolean `Constraints`, whether to enforce the `Constraint` or not. */
  booleanPolicy?: GoogleCloudOrgpolicyV1BooleanPolicy;
  /** List of values either allowed or disallowed. */
  listPolicy?: GoogleCloudOrgpolicyV1ListPolicy;
  /** Version of the `Policy`. Default version is 0; */
  version?: number;
}

export const GoogleCloudOrgpolicyV1Policy: Schema.Schema<GoogleCloudOrgpolicyV1Policy> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  restoreDefault: Schema.optional(GoogleCloudOrgpolicyV1RestoreDefault),
  constraint: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  booleanPolicy: Schema.optional(GoogleCloudOrgpolicyV1BooleanPolicy),
  listPolicy: Schema.optional(GoogleCloudOrgpolicyV1ListPolicy),
  version: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudOrgpolicyV1Policy" }) as any as Schema.Schema<GoogleCloudOrgpolicyV1Policy>;

export interface GoogleIdentityAccesscontextmanagerV1AccessPolicy {
  /** Required. Human readable title. Does not affect behavior. */
  title?: string;
  /** The scopes of the AccessPolicy. Scopes define which resources a policy can restrict and where its resources can be referenced. For example, policy A with `scopes=["folders/123"]` has the following behavior: - ServicePerimeter can only restrict projects within `folders/123`. - ServicePerimeter within policy A can only reference access levels defined within policy A. - Only one policy can include a given scope; thus, attempting to create a second policy which includes `folders/123` will result in an error. If no scopes are provided, then any resource within the organization can be restricted. Scopes cannot be modified after a policy is created. Policies can only have a single scope. Format: list of `folders/{folder_number}` or `projects/{project_number}` */
  scopes?: Array<string>;
  /** Output only. An opaque identifier for the current version of the `AccessPolicy`. This will always be a strongly validated etag, meaning that two Access Policies will be identical if and only if their etags are identical. Clients should not expect this to be in any specific format. */
  etag?: string;
  /** Required. The parent of this `AccessPolicy` in the Cloud Resource Hierarchy. Currently immutable once created. Format: `organizations/{organization_id}` */
  parent?: string;
  /** Output only. Identifier. Resource name of the `AccessPolicy`. Format: `accessPolicies/{access_policy}` */
  name?: string;
}

export const GoogleIdentityAccesscontextmanagerV1AccessPolicy: Schema.Schema<GoogleIdentityAccesscontextmanagerV1AccessPolicy> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
  etag: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1AccessPolicy" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1AccessPolicy>;

export interface GoogleIdentityAccesscontextmanagerV1EgressTo {
  /** IAM roles that represent the set of operations that the sources specified in the corresponding EgressFrom. are allowed to perform in this ServicePerimeter. */
  roles?: Array<string>;
  /** A list of external resources that are allowed to be accessed. Only AWS and Azure resources are supported. For Amazon S3, the supported formats are s3://BUCKET_NAME, s3a://BUCKET_NAME, and s3n://BUCKET_NAME. For Azure Storage, the supported format is azure://myaccount.blob.core.windows.net/CONTAINER_NAME. A request matches if it contains an external resource in this list (Example: s3://bucket/path). Currently '*' is not allowed. */
  externalResources?: Array<string>;
  /** A list of resources, currently only projects in the form `projects/`, that are allowed to be accessed by sources defined in the corresponding EgressFrom. A request matches if it contains a resource in this list. If `*` is specified for `resources`, then this EgressTo rule will authorize access to all resources outside the perimeter. */
  resources?: Array<string>;
  /** A list of ApiOperations allowed to be performed by the sources specified in the corresponding EgressFrom. A request matches if it uses an operation/service in this list. */
  operations?: Array<GoogleIdentityAccesscontextmanagerV1ApiOperation>;
}

export const GoogleIdentityAccesscontextmanagerV1EgressTo: Schema.Schema<GoogleIdentityAccesscontextmanagerV1EgressTo> = Schema.suspend(() => Schema.Struct({
  roles: Schema.optional(Schema.Array(Schema.String)),
  externalResources: Schema.optional(Schema.Array(Schema.String)),
  resources: Schema.optional(Schema.Array(Schema.String)),
  operations: Schema.optional(Schema.Array(GoogleIdentityAccesscontextmanagerV1ApiOperation)),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1EgressTo" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1EgressTo>;

export interface GoogleIdentityAccesscontextmanagerV1EgressSource {
  /** An AccessLevel resource name that allows protected resources inside the ServicePerimeters to access outside the ServicePerimeter boundaries. AccessLevels listed must be in the same policy as this ServicePerimeter. Referencing a nonexistent AccessLevel will cause an error. If an AccessLevel name is not specified, only resources within the perimeter can be accessed through Google Cloud calls with request origins within the perimeter. Example: `accessPolicies/MY_POLICY/accessLevels/MY_LEVEL`. If a single `*` is specified for `access_level`, then all EgressSources will be allowed. */
  accessLevel?: string;
  /** A Google Cloud resource from the service perimeter that you want to allow to access data outside the perimeter. This field supports only projects. The project format is `projects/{project_number}`. You can't use `*` in this field to allow all Google Cloud resources. */
  resource?: string;
}

export const GoogleIdentityAccesscontextmanagerV1EgressSource: Schema.Schema<GoogleIdentityAccesscontextmanagerV1EgressSource> = Schema.suspend(() => Schema.Struct({
  accessLevel: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1EgressSource" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1EgressSource>;

export interface GoogleIdentityAccesscontextmanagerV1EgressFrom {
  /** A list of identities that are allowed access through [EgressPolicy]. Identities can be an individual user, service account, Google group, or third-party identity. For third-party identity, only single identities are supported and other identity types are not supported. The `v1` identities that have the prefix `user`, `group`, `serviceAccount`, and `principal` in https://cloud.google.com/iam/docs/principal-identifiers#v1 are supported. */
  identities?: Array<string>;
  /** Sources that this EgressPolicy authorizes access from. If this field is not empty, then `source_restriction` must be set to `SOURCE_RESTRICTION_ENABLED`. */
  sources?: Array<GoogleIdentityAccesscontextmanagerV1EgressSource>;
  /** Whether to enforce traffic restrictions based on `sources` field. If the `sources` fields is non-empty, then this field must be set to `SOURCE_RESTRICTION_ENABLED`. */
  sourceRestriction?: "SOURCE_RESTRICTION_UNSPECIFIED" | "SOURCE_RESTRICTION_ENABLED" | "SOURCE_RESTRICTION_DISABLED" | (string & {});
  /** Specifies the type of identities that are allowed access to outside the perimeter. If left unspecified, then members of `identities` field will be allowed access. */
  identityType?: "IDENTITY_TYPE_UNSPECIFIED" | "ANY_IDENTITY" | "ANY_USER_ACCOUNT" | "ANY_SERVICE_ACCOUNT" | (string & {});
}

export const GoogleIdentityAccesscontextmanagerV1EgressFrom: Schema.Schema<GoogleIdentityAccesscontextmanagerV1EgressFrom> = Schema.suspend(() => Schema.Struct({
  identities: Schema.optional(Schema.Array(Schema.String)),
  sources: Schema.optional(Schema.Array(GoogleIdentityAccesscontextmanagerV1EgressSource)),
  sourceRestriction: Schema.optional(Schema.String),
  identityType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1EgressFrom" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1EgressFrom>;

export interface GoogleIdentityAccesscontextmanagerV1EgressPolicy {
  /** Defines the conditions on the ApiOperation and destination resources that cause this EgressPolicy to apply. */
  egressTo?: GoogleIdentityAccesscontextmanagerV1EgressTo;
  /** Defines conditions on the source of a request causing this EgressPolicy to apply. */
  egressFrom?: GoogleIdentityAccesscontextmanagerV1EgressFrom;
  /** Optional. Human-readable title for the egress rule. The title must be unique within the perimeter and can not exceed 100 characters. Within the access policy, the combined length of all rule titles must not exceed 240,000 characters. */
  title?: string;
}

export const GoogleIdentityAccesscontextmanagerV1EgressPolicy: Schema.Schema<GoogleIdentityAccesscontextmanagerV1EgressPolicy> = Schema.suspend(() => Schema.Struct({
  egressTo: Schema.optional(GoogleIdentityAccesscontextmanagerV1EgressTo),
  egressFrom: Schema.optional(GoogleIdentityAccesscontextmanagerV1EgressFrom),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1EgressPolicy" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1EgressPolicy>;

export interface GoogleIdentityAccesscontextmanagerV1VpcAccessibleServices {
  /** Whether to restrict API calls within the Service Perimeter to the list of APIs specified in 'allowed_services'. */
  enableRestriction?: boolean;
  /** The list of APIs usable within the Service Perimeter. Must be empty unless 'enable_restriction' is True. You can specify a list of individual services, as well as include the 'RESTRICTED-SERVICES' value, which automatically includes all of the services protected by the perimeter. */
  allowedServices?: Array<string>;
}

export const GoogleIdentityAccesscontextmanagerV1VpcAccessibleServices: Schema.Schema<GoogleIdentityAccesscontextmanagerV1VpcAccessibleServices> = Schema.suspend(() => Schema.Struct({
  enableRestriction: Schema.optional(Schema.Boolean),
  allowedServices: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1VpcAccessibleServices" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1VpcAccessibleServices>;

export interface GoogleIdentityAccesscontextmanagerV1ServicePerimeterConfig {
  /** A list of `AccessLevel` resource names that allow resources within the `ServicePerimeter` to be accessed from the internet. `AccessLevels` listed must be in the same policy as this `ServicePerimeter`. Referencing a nonexistent `AccessLevel` is a syntax error. If no `AccessLevel` names are listed, resources within the perimeter can only be accessed via Google Cloud calls with request origins within the perimeter. Example: `"accessPolicies/MY_POLICY/accessLevels/MY_LEVEL"`. For Service Perimeter Bridge, must be empty. */
  accessLevels?: Array<string>;
  /** List of IngressPolicies to apply to the perimeter. A perimeter may have multiple IngressPolicies, each of which is evaluated separately. Access is granted if any Ingress Policy grants it. Must be empty for a perimeter bridge. */
  ingressPolicies?: Array<GoogleIdentityAccesscontextmanagerV1IngressPolicy>;
  /** List of EgressPolicies to apply to the perimeter. A perimeter may have multiple EgressPolicies, each of which is evaluated separately. Access is granted if any EgressPolicy grants it. Must be empty for a perimeter bridge. */
  egressPolicies?: Array<GoogleIdentityAccesscontextmanagerV1EgressPolicy>;
  /** Google Cloud services that are subject to the Service Perimeter restrictions. For example, if `storage.googleapis.com` is specified, access to the storage buckets inside the perimeter must meet the perimeter's access restrictions. */
  restrictedServices?: Array<string>;
  /** Configuration for APIs allowed within Perimeter. */
  vpcAccessibleServices?: GoogleIdentityAccesscontextmanagerV1VpcAccessibleServices;
  /** A list of Google Cloud resources that are inside of the service perimeter. Currently only projects and VPCs are allowed. Project format: `projects/{project_number}` VPC network format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NAME}`. */
  resources?: Array<string>;
}

export const GoogleIdentityAccesscontextmanagerV1ServicePerimeterConfig: Schema.Schema<GoogleIdentityAccesscontextmanagerV1ServicePerimeterConfig> = Schema.suspend(() => Schema.Struct({
  accessLevels: Schema.optional(Schema.Array(Schema.String)),
  ingressPolicies: Schema.optional(Schema.Array(GoogleIdentityAccesscontextmanagerV1IngressPolicy)),
  egressPolicies: Schema.optional(Schema.Array(GoogleIdentityAccesscontextmanagerV1EgressPolicy)),
  restrictedServices: Schema.optional(Schema.Array(Schema.String)),
  vpcAccessibleServices: Schema.optional(GoogleIdentityAccesscontextmanagerV1VpcAccessibleServices),
  resources: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1ServicePerimeterConfig" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1ServicePerimeterConfig>;

export interface GoogleIdentityAccesscontextmanagerV1ServicePerimeter {
  /** Optional. An opaque identifier for the current version of the `ServicePerimeter`. This identifier does not follow any specific format. If an etag is not provided, the operation will be performed as if a valid etag is provided. */
  etag?: string;
  /** Description of the `ServicePerimeter` and its use. Does not affect behavior. */
  description?: string;
  /** Proposed (or dry run) ServicePerimeter configuration. This configuration allows to specify and test ServicePerimeter configuration without enforcing actual access restrictions. Only allowed to be set when the "use_explicit_dry_run_spec" flag is set. */
  spec?: GoogleIdentityAccesscontextmanagerV1ServicePerimeterConfig;
  /** Current ServicePerimeter configuration. Specifies sets of resources, restricted services and access levels that determine perimeter content and boundaries. */
  status?: GoogleIdentityAccesscontextmanagerV1ServicePerimeterConfig;
  /** Perimeter type indicator. A single project or VPC network is allowed to be a member of single regular perimeter, but multiple service perimeter bridges. A project cannot be a included in a perimeter bridge without being included in regular perimeter. For perimeter bridges, the restricted service list as well as access level lists must be empty. */
  perimeterType?: "PERIMETER_TYPE_REGULAR" | "PERIMETER_TYPE_BRIDGE" | (string & {});
  /** Identifier. Resource name for the `ServicePerimeter`. Format: `accessPolicies/{access_policy}/servicePerimeters/{service_perimeter}`. The `service_perimeter` component must begin with a letter, followed by alphanumeric characters or `_`. After you create a `ServicePerimeter`, you cannot change its `name`. */
  name?: string;
  /** Use explicit dry run spec flag. Ordinarily, a dry-run spec implicitly exists for all Service Perimeters, and that spec is identical to the status for those Service Perimeters. When this flag is set, it inhibits the generation of the implicit spec, thereby allowing the user to explicitly provide a configuration ("spec") to use in a dry-run version of the Service Perimeter. This allows the user to test changes to the enforced config ("status") without actually enforcing them. This testing is done through analyzing the differences between currently enforced and suggested restrictions. use_explicit_dry_run_spec must bet set to True if any of the fields in the spec are set to non-default values. */
  useExplicitDryRunSpec?: boolean;
  /** Human readable title. Must be unique within the Policy. */
  title?: string;
}

export const GoogleIdentityAccesscontextmanagerV1ServicePerimeter: Schema.Schema<GoogleIdentityAccesscontextmanagerV1ServicePerimeter> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  spec: Schema.optional(GoogleIdentityAccesscontextmanagerV1ServicePerimeterConfig),
  status: Schema.optional(GoogleIdentityAccesscontextmanagerV1ServicePerimeterConfig),
  perimeterType: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  useExplicitDryRunSpec: Schema.optional(Schema.Boolean),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1ServicePerimeter" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1ServicePerimeter>;

export interface GoogleIdentityAccesscontextmanagerV1OsConstraint {
  /** Only allows requests from devices with a verified Chrome OS. Verifications includes requirements that the device is enterprise-managed, conformant to domain policies, and the caller has permission to call the API targeted by the request. */
  requireVerifiedChromeOs?: boolean;
  /** Required. The allowed OS type. */
  osType?: "OS_UNSPECIFIED" | "DESKTOP_MAC" | "DESKTOP_WINDOWS" | "DESKTOP_LINUX" | "DESKTOP_CHROME_OS" | "ANDROID" | "IOS" | (string & {});
  /** The minimum allowed OS version. If not set, any version of this OS satisfies the constraint. Format: `"major.minor.patch"`. Examples: `"10.5.301"`, `"9.2.1"`. */
  minimumVersion?: string;
}

export const GoogleIdentityAccesscontextmanagerV1OsConstraint: Schema.Schema<GoogleIdentityAccesscontextmanagerV1OsConstraint> = Schema.suspend(() => Schema.Struct({
  requireVerifiedChromeOs: Schema.optional(Schema.Boolean),
  osType: Schema.optional(Schema.String),
  minimumVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1OsConstraint" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1OsConstraint>;

export interface GoogleIdentityAccesscontextmanagerV1DevicePolicy {
  /** Allowed OS versions, an empty list allows all types and all versions. */
  osConstraints?: Array<GoogleIdentityAccesscontextmanagerV1OsConstraint>;
  /** Whether or not screenlock is required for the DevicePolicy to be true. Defaults to `false`. */
  requireScreenlock?: boolean;
  /** Whether the device needs to be approved by the customer admin. */
  requireAdminApproval?: boolean;
  /** Allowed device management levels, an empty list allows all management levels. */
  allowedDeviceManagementLevels?: Array<"MANAGEMENT_UNSPECIFIED" | "NONE" | "BASIC" | "COMPLETE" | (string & {})>;
  /** Allowed encryptions statuses, an empty list allows all statuses. */
  allowedEncryptionStatuses?: Array<"ENCRYPTION_UNSPECIFIED" | "ENCRYPTION_UNSUPPORTED" | "UNENCRYPTED" | "ENCRYPTED" | (string & {})>;
  /** Whether the device needs to be corp owned. */
  requireCorpOwned?: boolean;
}

export const GoogleIdentityAccesscontextmanagerV1DevicePolicy: Schema.Schema<GoogleIdentityAccesscontextmanagerV1DevicePolicy> = Schema.suspend(() => Schema.Struct({
  osConstraints: Schema.optional(Schema.Array(GoogleIdentityAccesscontextmanagerV1OsConstraint)),
  requireScreenlock: Schema.optional(Schema.Boolean),
  requireAdminApproval: Schema.optional(Schema.Boolean),
  allowedDeviceManagementLevels: Schema.optional(Schema.Array(Schema.String)),
  allowedEncryptionStatuses: Schema.optional(Schema.Array(Schema.String)),
  requireCorpOwned: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1DevicePolicy" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1DevicePolicy>;

export interface GoogleIdentityAccesscontextmanagerV1VpcSubNetwork {
  /** Required. Network name. If the network is not part of the organization, the `compute.network.get` permission must be granted to the caller. Format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NETWORK_NAME}` Example: `//compute.googleapis.com/projects/my-project/global/networks/network-1` */
  network?: string;
  /** CIDR block IP subnetwork specification. The IP address must be an IPv4 address and can be a public or private IP address. Note that for a CIDR IP address block, the specified IP address portion must be properly truncated (i.e. all the host bits must be zero) or the input is considered malformed. For example, "192.0.2.0/24" is accepted but "192.0.2.1/24" is not. If empty, all IP addresses are allowed. */
  vpcIpSubnetworks?: Array<string>;
}

export const GoogleIdentityAccesscontextmanagerV1VpcSubNetwork: Schema.Schema<GoogleIdentityAccesscontextmanagerV1VpcSubNetwork> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  vpcIpSubnetworks: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1VpcSubNetwork" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1VpcSubNetwork>;

export interface GoogleIdentityAccesscontextmanagerV1VpcNetworkSource {
  /** Sub-segment ranges of a VPC network. */
  vpcSubnetwork?: GoogleIdentityAccesscontextmanagerV1VpcSubNetwork;
}

export const GoogleIdentityAccesscontextmanagerV1VpcNetworkSource: Schema.Schema<GoogleIdentityAccesscontextmanagerV1VpcNetworkSource> = Schema.suspend(() => Schema.Struct({
  vpcSubnetwork: Schema.optional(GoogleIdentityAccesscontextmanagerV1VpcSubNetwork),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1VpcNetworkSource" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1VpcNetworkSource>;

export interface GoogleIdentityAccesscontextmanagerV1Condition {
  /** Device specific restrictions, all restrictions must hold for the Condition to be true. If not specified, all devices are allowed. */
  devicePolicy?: GoogleIdentityAccesscontextmanagerV1DevicePolicy;
  /** The request must originate from one of the provided VPC networks in Google Cloud. Cannot specify this field together with `ip_subnetworks`. */
  vpcNetworkSources?: Array<GoogleIdentityAccesscontextmanagerV1VpcNetworkSource>;
  /** Whether to negate the Condition. If true, the Condition becomes a NAND over its non-empty fields. Any non-empty field criteria evaluating to false will result in the Condition to be satisfied. Defaults to false. */
  negate?: boolean;
  /** The request must be made by one of the provided user or service accounts. Groups are not supported. Syntax: `user:{emailid}` `serviceAccount:{emailid}` If not specified, a request may come from any user. */
  members?: Array<string>;
  /** CIDR block IP subnetwork specification. May be IPv4 or IPv6. Note that for a CIDR IP address block, the specified IP address portion must be properly truncated (i.e. all the host bits must be zero) or the input is considered malformed. For example, "192.0.2.0/24" is accepted but "192.0.2.1/24" is not. Similarly, for IPv6, "2001:db8::/32" is accepted whereas "2001:db8::1/32" is not. The originating IP of a request must be in one of the listed subnets in order for this Condition to be true. If empty, all IP addresses are allowed. */
  ipSubnetworks?: Array<string>;
  /** A list of other access levels defined in the same `Policy`, referenced by resource name. Referencing an `AccessLevel` which does not exist is an error. All access levels listed must be granted for the Condition to be true. Example: "`accessPolicies/MY_POLICY/accessLevels/LEVEL_NAME"` */
  requiredAccessLevels?: Array<string>;
  /** The request must originate from one of the provided countries/regions. Must be valid ISO 3166-1 alpha-2 codes. */
  regions?: Array<string>;
}

export const GoogleIdentityAccesscontextmanagerV1Condition: Schema.Schema<GoogleIdentityAccesscontextmanagerV1Condition> = Schema.suspend(() => Schema.Struct({
  devicePolicy: Schema.optional(GoogleIdentityAccesscontextmanagerV1DevicePolicy),
  vpcNetworkSources: Schema.optional(Schema.Array(GoogleIdentityAccesscontextmanagerV1VpcNetworkSource)),
  negate: Schema.optional(Schema.Boolean),
  members: Schema.optional(Schema.Array(Schema.String)),
  ipSubnetworks: Schema.optional(Schema.Array(Schema.String)),
  requiredAccessLevels: Schema.optional(Schema.Array(Schema.String)),
  regions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1Condition" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1Condition>;

export interface GoogleIdentityAccesscontextmanagerV1BasicLevel {
  /** Required. A list of requirements for the `AccessLevel` to be granted. */
  conditions?: Array<GoogleIdentityAccesscontextmanagerV1Condition>;
  /** How the `conditions` list should be combined to determine if a request is granted this `AccessLevel`. If AND is used, each `Condition` in `conditions` must be satisfied for the `AccessLevel` to be applied. If OR is used, at least one `Condition` in `conditions` must be satisfied for the `AccessLevel` to be applied. Default behavior is AND. */
  combiningFunction?: "AND" | "OR" | (string & {});
}

export const GoogleIdentityAccesscontextmanagerV1BasicLevel: Schema.Schema<GoogleIdentityAccesscontextmanagerV1BasicLevel> = Schema.suspend(() => Schema.Struct({
  conditions: Schema.optional(Schema.Array(GoogleIdentityAccesscontextmanagerV1Condition)),
  combiningFunction: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1BasicLevel" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1BasicLevel>;

export interface GoogleIdentityAccesscontextmanagerV1AccessLevel {
  /** Human readable title. Must be unique within the Policy. */
  title?: string;
  /** Description of the `AccessLevel` and its use. Does not affect behavior. */
  description?: string;
  /** A `BasicLevel` composed of `Conditions`. */
  basic?: GoogleIdentityAccesscontextmanagerV1BasicLevel;
  /** A `CustomLevel` written in the Common Expression Language. */
  custom?: GoogleIdentityAccesscontextmanagerV1CustomLevel;
  /** Identifier. Resource name for the `AccessLevel`. Format: `accessPolicies/{access_policy}/accessLevels/{access_level}`. The `access_level` component must begin with a letter, followed by alphanumeric characters or `_`. Its maximum length is 50 characters. After you create an `AccessLevel`, you cannot change its `name`. */
  name?: string;
}

export const GoogleIdentityAccesscontextmanagerV1AccessLevel: Schema.Schema<GoogleIdentityAccesscontextmanagerV1AccessLevel> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  basic: Schema.optional(GoogleIdentityAccesscontextmanagerV1BasicLevel),
  custom: Schema.optional(GoogleIdentityAccesscontextmanagerV1CustomLevel),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIdentityAccesscontextmanagerV1AccessLevel" }) as any as Schema.Schema<GoogleIdentityAccesscontextmanagerV1AccessLevel>;

export interface OsInfo {
  /** The operating system long name. For example 'Debian GNU/Linux 9' or 'Microsoft Window Server 2019 Datacenter'. */
  longName?: string;
  /** The version of the operating system. */
  version?: string;
  /** The system architecture of the operating system. */
  architecture?: string;
  /** The operating system short name. For example, 'windows' or 'debian'. */
  shortName?: string;
  /** The current version of the OS Config agent running on the VM. */
  osconfigAgentVersion?: string;
  /** The kernel version of the operating system. */
  kernelVersion?: string;
  /** The VM hostname. */
  hostname?: string;
  /** The kernel release of the operating system. */
  kernelRelease?: string;
}

export const OsInfo: Schema.Schema<OsInfo> = Schema.suspend(() => Schema.Struct({
  longName: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  architecture: Schema.optional(Schema.String),
  shortName: Schema.optional(Schema.String),
  osconfigAgentVersion: Schema.optional(Schema.String),
  kernelVersion: Schema.optional(Schema.String),
  hostname: Schema.optional(Schema.String),
  kernelRelease: Schema.optional(Schema.String),
})).annotate({ identifier: "OsInfo" }) as any as Schema.Schema<OsInfo>;

export interface Inventory {
  /** Base level operating system information for the VM. */
  osInfo?: OsInfo;
  /** Output only. The `Inventory` API resource name. Format: `projects/{project_number}/locations/{location}/instances/{instance_id}/inventory` */
  name?: string;
  /** Output only. Timestamp of the last reported inventory for the VM. */
  updateTime?: string;
  /** Inventory items related to the VM keyed by an opaque unique identifier for each inventory item. The identifier is unique to each distinct and addressable inventory item and will change, when there is a new package version. */
  items?: Record<string, Item>;
}

export const Inventory: Schema.Schema<Inventory> = Schema.suspend(() => Schema.Struct({
  osInfo: Schema.optional(OsInfo),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Record(Schema.String, Item)),
})).annotate({ identifier: "Inventory" }) as any as Schema.Schema<Inventory>;

export interface Asset {
  /** The exceptions of a resource. */
  assetExceptions?: Array<AssetException>;
  /** A representation of an [organization policy](https://cloud.google.com/resource-manager/docs/organization-policy/overview#organization_policy). There can be more than one organization policy with different constraints set on a given resource. */
  orgPolicy?: Array<GoogleCloudOrgpolicyV1Policy>;
  /** DEPRECATED. This field only presents for the purpose of backward-compatibility. The server will never generate responses with this field. The related assets of the asset of one relationship type. One asset only represents one type of relationship. */
  relatedAssets?: RelatedAssets;
  /** The type of the asset. Example: `compute.googleapis.com/Disk` See [Supported asset types](https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information. */
  assetType?: string;
  /** A representation of the resource. */
  resource?: Resource;
  /** A representation of the IAM policy set on a Google Cloud resource. There can be a maximum of one IAM policy set on any given resource. In addition, IAM policies inherit their granted access scope from any policies set on parent resources in the resource hierarchy. Therefore, the effectively policy is the union of both the policy set on this resource and each policy set on all of the resource's ancestry resource levels in the hierarchy. See [this topic](https://cloud.google.com/iam/help/allow-policies/inheritance) for more information. */
  iamPolicy?: Policy;
  /** Also refer to the [access policy user guide](https://cloud.google.com/access-context-manager/docs/overview#access-policies). */
  accessPolicy?: GoogleIdentityAccesscontextmanagerV1AccessPolicy;
  /** The full name of the asset. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1` See [Resource names](https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. */
  name?: string;
  /** Also refer to the [service perimeter user guide](https://cloud.google.com/vpc-service-controls/docs/overview). */
  servicePerimeter?: GoogleIdentityAccesscontextmanagerV1ServicePerimeter;
  /** The ancestry path of an asset in Google Cloud [resource hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), represented as a list of relative resource names. An ancestry path starts with the closest ancestor in the hierarchy and ends at root. If the asset is a project, folder, or organization, the ancestry path starts from the asset itself. Example: `["projects/123456789", "folders/5432", "organizations/1234"]` */
  ancestors?: Array<string>;
  /** One related asset of the current asset. */
  relatedAsset?: RelatedAsset;
  /** The last update timestamp of an asset. update_time is updated when create/update/delete operation is performed. */
  updateTime?: string;
  /** Also refer to the [access level user guide](https://cloud.google.com/access-context-manager/docs/overview#access-levels). */
  accessLevel?: GoogleIdentityAccesscontextmanagerV1AccessLevel;
  /** A representation of runtime OS Inventory information. See [this topic](https://cloud.google.com/compute/docs/instances/os-inventory-management) for more information. */
  osInventory?: Inventory;
}

export const Asset: Schema.Schema<Asset> = Schema.suspend(() => Schema.Struct({
  assetExceptions: Schema.optional(Schema.Array(AssetException)),
  orgPolicy: Schema.optional(Schema.Array(GoogleCloudOrgpolicyV1Policy)),
  relatedAssets: Schema.optional(RelatedAssets),
  assetType: Schema.optional(Schema.String),
  resource: Schema.optional(Resource),
  iamPolicy: Schema.optional(Policy),
  accessPolicy: Schema.optional(GoogleIdentityAccesscontextmanagerV1AccessPolicy),
  name: Schema.optional(Schema.String),
  servicePerimeter: Schema.optional(GoogleIdentityAccesscontextmanagerV1ServicePerimeter),
  ancestors: Schema.optional(Schema.Array(Schema.String)),
  relatedAsset: Schema.optional(RelatedAsset),
  updateTime: Schema.optional(Schema.String),
  accessLevel: Schema.optional(GoogleIdentityAccesscontextmanagerV1AccessLevel),
  osInventory: Schema.optional(Inventory),
})).annotate({ identifier: "Asset" }) as any as Schema.Schema<Asset>;

export interface MoveImpact {
  /** User friendly impact detail in a free form message. */
  detail?: string;
}

export const MoveImpact: Schema.Schema<MoveImpact> = Schema.suspend(() => Schema.Struct({
  detail: Schema.optional(Schema.String),
})).annotate({ identifier: "MoveImpact" }) as any as Schema.Schema<MoveImpact>;

export interface MoveAnalysisResult {
  /** Blocking information that would prevent the target resource from moving to the specified destination at runtime. */
  blockers?: Array<MoveImpact>;
  /** Warning information indicating that moving the target resource to the specified destination might be unsafe. This can include important policy information and configuration changes, but will not block moves at runtime. */
  warnings?: Array<MoveImpact>;
}

export const MoveAnalysisResult: Schema.Schema<MoveAnalysisResult> = Schema.suspend(() => Schema.Struct({
  blockers: Schema.optional(Schema.Array(MoveImpact)),
  warnings: Schema.optional(Schema.Array(MoveImpact)),
})).annotate({ identifier: "MoveAnalysisResult" }) as any as Schema.Schema<MoveAnalysisResult>;

export interface MoveAnalysis {
  /** Analysis result of moving the target resource. */
  analysis?: MoveAnalysisResult;
  /** The user friendly display name of the analysis. E.g. IAM, organization policy etc. */
  displayName?: string;
  /** Description of error encountered when performing the analysis. */
  error?: Status;
}

export const MoveAnalysis: Schema.Schema<MoveAnalysis> = Schema.suspend(() => Schema.Struct({
  analysis: Schema.optional(MoveAnalysisResult),
  displayName: Schema.optional(Schema.String),
  error: Schema.optional(Status),
})).annotate({ identifier: "MoveAnalysis" }) as any as Schema.Schema<MoveAnalysis>;

export interface AnalyzeMoveResponse {
  /** The list of analyses returned from performing the intended resource move analysis. The analysis is grouped by different Google Cloud services. */
  moveAnalysis?: Array<MoveAnalysis>;
}

export const AnalyzeMoveResponse: Schema.Schema<AnalyzeMoveResponse> = Schema.suspend(() => Schema.Struct({
  moveAnalysis: Schema.optional(Schema.Array(MoveAnalysis)),
})).annotate({ identifier: "AnalyzeMoveResponse" }) as any as Schema.Schema<AnalyzeMoveResponse>;

export interface TableFieldSchema {
  /** The field data type. Possible values include * STRING * BYTES * INTEGER * FLOAT * BOOLEAN * TIMESTAMP * DATE * TIME * DATETIME * GEOGRAPHY, * NUMERIC, * BIGNUMERIC, * RECORD (where RECORD indicates that the field contains a nested schema). */
  type?: string;
  /** Describes the nested schema fields if the type property is set to RECORD. */
  fields?: Array<TableFieldSchema>;
  /** The field mode. Possible values include NULLABLE, REQUIRED and REPEATED. The default value is NULLABLE. */
  mode?: string;
  /** The field name. The name must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_), and must start with a letter or underscore. The maximum length is 128 characters. */
  field?: string;
}

export const TableFieldSchema: Schema.Schema<TableFieldSchema> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Array(TableFieldSchema)),
  mode: Schema.optional(Schema.String),
  field: Schema.optional(Schema.String),
})).annotate({ identifier: "TableFieldSchema" }) as any as Schema.Schema<TableFieldSchema>;

export interface TableSchema {
  /** Describes the fields in a table. */
  fields?: Array<TableFieldSchema>;
}

export const TableSchema: Schema.Schema<TableSchema> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Array(TableFieldSchema)),
})).annotate({ identifier: "TableSchema" }) as any as Schema.Schema<TableSchema>;

export interface QueryResult {
  /** Describes the format of the [rows]. */
  schema?: TableSchema;
  /** Token to retrieve the next page of the results. */
  nextPageToken?: string;
  /** Each row hold a query result in the format of `Struct`. */
  rows?: Array<Record<string, unknown>>;
  /** Total rows of the whole query results. */
  totalRows?: string;
}

export const QueryResult: Schema.Schema<QueryResult> = Schema.suspend(() => Schema.Struct({
  schema: Schema.optional(TableSchema),
  nextPageToken: Schema.optional(Schema.String),
  rows: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  totalRows: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryResult" }) as any as Schema.Schema<QueryResult>;

export interface GcsDestination {
  /** The URI of the Cloud Storage object. It's the same URI that is used by gsutil. Example: "gs://bucket_name/object_name". See [Viewing and Editing Object Metadata](https://cloud.google.com/storage/docs/viewing-editing-metadata) for more information. If the specified Cloud Storage object already exists and there is no [hold](https://cloud.google.com/storage/docs/object-holds), it will be overwritten with the exported result. */
  uri?: string;
  /** The URI prefix of all generated Cloud Storage objects. Example: "gs://bucket_name/object_name_prefix". Each object URI is in format: "gs://bucket_name/object_name_prefix// and only contains assets for that type. starts from 0. Example: "gs://bucket_name/object_name_prefix/compute.googleapis.com/Disk/0" is the first shard of output objects containing all compute.googleapis.com/Disk assets. An INVALID_ARGUMENT error will be returned if file with the same name "gs://bucket_name/object_name_prefix" already exists. */
  uriPrefix?: string;
}

export const GcsDestination: Schema.Schema<GcsDestination> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  uriPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "GcsDestination" }) as any as Schema.Schema<GcsDestination>;

export interface BigQueryDestination {
  /** [partition_spec] determines whether to export to partitioned table(s) and how to partition the data. If [partition_spec] is unset or [partition_spec.partition_key] is unset or `PARTITION_KEY_UNSPECIFIED`, the snapshot results will be exported to non-partitioned table(s). [force] will decide whether to overwrite existing table(s). If [partition_spec] is specified. First, the snapshot results will be written to partitioned table(s) with two additional timestamp columns, readTime and requestTime, one of which will be the partition key. Secondly, in the case when any destination table already exists, it will first try to update existing table's schema as necessary by appending additional columns. Then, if [force] is `TRUE`, the corresponding partition will be overwritten by the snapshot results (data in different partitions will remain intact); if [force] is unset or `FALSE`, it will append the data. An error will be returned if the schema update or data appension fails. */
  partitionSpec?: PartitionSpec;
  /** Required. The BigQuery dataset in format "projects/projectId/datasets/datasetId", to which the snapshot result should be exported. If this dataset does not exist, the export call returns an INVALID_ARGUMENT error. Setting the `contentType` for `exportAssets` determines the [schema](/asset-inventory/docs/exporting-to-bigquery#bigquery-schema) of the BigQuery table. Setting `separateTablesPerAssetType` to `TRUE` also influences the schema. */
  dataset?: string;
  /** If this flag is `TRUE`, the snapshot results will be written to one or multiple tables, each of which contains results of one asset type. The [force] and [partition_spec] fields will apply to each of them. Field [table] will be concatenated with "_" and the asset type names (see https://cloud.google.com/asset-inventory/docs/supported-asset-types for supported asset types) to construct per-asset-type table names, in which all non-alphanumeric characters like "." and "/" will be substituted by "_". Example: if field [table] is "mytable" and snapshot results contain "storage.googleapis.com/Bucket" assets, the corresponding table name will be "mytable_storage_googleapis_com_Bucket". If any of these tables does not exist, a new table with the concatenated name will be created. When [content_type] in the ExportAssetsRequest is `RESOURCE`, the schema of each table will include RECORD-type columns mapped to the nested fields in the Asset.resource.data field of that asset type (up to the 15 nested level BigQuery supports (https://cloud.google.com/bigquery/docs/nested-repeated#limitations)). The fields in >15 nested levels will be stored in JSON format string as a child column of its parent RECORD column. If error occurs when exporting to any table, the whole export call will return an error but the export results that already succeed will persist. Example: if exporting to table_type_A succeeds when exporting to table_type_B fails during one export call, the results in table_type_A will persist and there will not be partial results persisting in a table. */
  separateTablesPerAssetType?: boolean;
  /** If the destination table already exists and this flag is `TRUE`, the table will be overwritten by the contents of assets snapshot. If the flag is `FALSE` or unset and the destination table already exists, the export call returns an INVALID_ARGUMENT error. */
  force?: boolean;
  /** Required. The BigQuery table to which the snapshot result should be written. If this table does not exist, a new table with the given name will be created. */
  table?: string;
}

export const BigQueryDestination: Schema.Schema<BigQueryDestination> = Schema.suspend(() => Schema.Struct({
  partitionSpec: Schema.optional(PartitionSpec),
  dataset: Schema.optional(Schema.String),
  separateTablesPerAssetType: Schema.optional(Schema.Boolean),
  force: Schema.optional(Schema.Boolean),
  table: Schema.optional(Schema.String),
})).annotate({ identifier: "BigQueryDestination" }) as any as Schema.Schema<BigQueryDestination>;

export interface OutputConfig {
  /** Destination on BigQuery. The output table stores the fields in asset Protobuf as columns in BigQuery. */
  bigqueryDestination?: BigQueryDestination;
  /** Destination on Cloud Storage. */
  gcsDestination?: GcsDestination;
}

export const OutputConfig: Schema.Schema<OutputConfig> = Schema.suspend(() => Schema.Struct({
  bigqueryDestination: Schema.optional(BigQueryDestination),
  gcsDestination: Schema.optional(GcsDestination),
})).annotate({ identifier: "OutputConfig" }) as any as Schema.Schema<OutputConfig>;

export interface SearchAllIamPoliciesResponse {
  /** Set if there are more results than those appearing in this response; to get the next set of results, call this method again, using this value as the `page_token`. */
  nextPageToken?: string;
  /** A list of IAM policies that match the search query. Related information such as the associated resource is returned along with the policy. */
  results?: Array<IamPolicySearchResult>;
}

export const SearchAllIamPoliciesResponse: Schema.Schema<SearchAllIamPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  results: Schema.optional(Schema.Array(IamPolicySearchResult)),
})).annotate({ identifier: "SearchAllIamPoliciesResponse" }) as any as Schema.Schema<SearchAllIamPoliciesResponse>;

export interface ListAssetsResponse {
  /** Time the snapshot was taken. */
  readTime?: string;
  /** Token to retrieve the next page of results. It expires 72 hours after the page token for the first page is generated. Set to empty if there are no remaining results. */
  nextPageToken?: string;
  /** Assets. */
  assets?: Array<Asset>;
}

export const ListAssetsResponse: Schema.Schema<ListAssetsResponse> = Schema.suspend(() => Schema.Struct({
  readTime: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  assets: Schema.optional(Schema.Array(Asset)),
})).annotate({ identifier: "ListAssetsResponse" }) as any as Schema.Schema<ListAssetsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface PubsubDestination {
  /** The name of the Pub/Sub topic to publish to. Example: `projects/PROJECT_ID/topics/TOPIC_ID`. */
  topic?: string;
}

export const PubsubDestination: Schema.Schema<PubsubDestination> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
})).annotate({ identifier: "PubsubDestination" }) as any as Schema.Schema<PubsubDestination>;

export interface FeedOutputConfig {
  /** Destination on Pub/Sub. */
  pubsubDestination?: PubsubDestination;
}

export const FeedOutputConfig: Schema.Schema<FeedOutputConfig> = Schema.suspend(() => Schema.Struct({
  pubsubDestination: Schema.optional(PubsubDestination),
})).annotate({ identifier: "FeedOutputConfig" }) as any as Schema.Schema<FeedOutputConfig>;

export interface GoogleCloudAssetV1QueryAssetsOutputConfigBigQueryDestination {
  /** Required. The BigQuery dataset where the query results will be saved. It has the format of "projects/{projectId}/datasets/{datasetId}". */
  dataset?: string;
  /** Required. The BigQuery table where the query results will be saved. If this table does not exist, a new table with the given name will be created. */
  table?: string;
  /** Specifies the action that occurs if the destination table or partition already exists. The following values are supported: * WRITE_TRUNCATE: If the table or partition already exists, BigQuery overwrites the entire table or all the partitions data. * WRITE_APPEND: If the table or partition already exists, BigQuery appends the data to the table or the latest partition. * WRITE_EMPTY: If the table already exists and contains data, a 'duplicate' error is returned in the job result. The default value is WRITE_EMPTY. */
  writeDisposition?: string;
}

export const GoogleCloudAssetV1QueryAssetsOutputConfigBigQueryDestination: Schema.Schema<GoogleCloudAssetV1QueryAssetsOutputConfigBigQueryDestination> = Schema.suspend(() => Schema.Struct({
  dataset: Schema.optional(Schema.String),
  table: Schema.optional(Schema.String),
  writeDisposition: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAssetV1QueryAssetsOutputConfigBigQueryDestination" }) as any as Schema.Schema<GoogleCloudAssetV1QueryAssetsOutputConfigBigQueryDestination>;

export interface QueryAssetsOutputConfig {
  /** BigQuery destination where the query results will be saved. */
  bigqueryDestination?: GoogleCloudAssetV1QueryAssetsOutputConfigBigQueryDestination;
}

export const QueryAssetsOutputConfig: Schema.Schema<QueryAssetsOutputConfig> = Schema.suspend(() => Schema.Struct({
  bigqueryDestination: Schema.optional(GoogleCloudAssetV1QueryAssetsOutputConfigBigQueryDestination),
})).annotate({ identifier: "QueryAssetsOutputConfig" }) as any as Schema.Schema<QueryAssetsOutputConfig>;

export interface QueryAssetsResponse {
  /** Output configuration, which indicates that instead of being returned in an API response on the fly, the query result will be saved in a specific output. */
  outputConfig?: QueryAssetsOutputConfig;
  /** The query response, which can be either an `error` or a valid `response`. If `done` == `false` and the query result is being saved in an output, the output_config field will be set. If `done` == `true`, exactly one of `error`, `query_result` or `output_config` will be set. [done] is unset unless the [QueryAssetsResponse] contains a [QueryAssetsResponse.job_reference]. */
  done?: boolean;
  /** Result of the query. */
  queryResult?: QueryResult;
  /** Reference to a query job. */
  jobReference?: string;
  /** Error status. */
  error?: Status;
}

export const QueryAssetsResponse: Schema.Schema<QueryAssetsResponse> = Schema.suspend(() => Schema.Struct({
  outputConfig: Schema.optional(QueryAssetsOutputConfig),
  done: Schema.optional(Schema.Boolean),
  queryResult: Schema.optional(QueryResult),
  jobReference: Schema.optional(Schema.String),
  error: Schema.optional(Status),
})).annotate({ identifier: "QueryAssetsResponse" }) as any as Schema.Schema<QueryAssetsResponse>;

export interface GoogleCloudAssetV1GcsDestination {
  /** Required. The URI of the Cloud Storage object. It's the same URI that is used by gsutil. Example: "gs://bucket_name/object_name". See [Viewing and Editing Object Metadata](https://cloud.google.com/storage/docs/viewing-editing-metadata) for more information. If the specified Cloud Storage object already exists and there is no [hold](https://cloud.google.com/storage/docs/object-holds), it will be overwritten with the analysis result. */
  uri?: string;
}

export const GoogleCloudAssetV1GcsDestination: Schema.Schema<GoogleCloudAssetV1GcsDestination> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAssetV1GcsDestination" }) as any as Schema.Schema<GoogleCloudAssetV1GcsDestination>;

export interface GoogleCloudAssetV1BigQueryDestination {
  /** Required. The BigQuery dataset in format "projects/projectId/datasets/datasetId", to which the analysis results should be exported. If this dataset does not exist, the export call will return an INVALID_ARGUMENT error. */
  dataset?: string;
  /** Required. The prefix of the BigQuery tables to which the analysis results will be written. Tables will be created based on this table_prefix if not exist: * _analysis table will contain export operation's metadata. * _analysis_result will contain all the IamPolicyAnalysisResult. When [partition_key] is specified, both tables will be partitioned based on the [partition_key]. */
  tablePrefix?: string;
  /** Optional. Specifies the action that occurs if the destination table or partition already exists. The following values are supported: * WRITE_TRUNCATE: If the table or partition already exists, BigQuery overwrites the entire table or all the partitions data. * WRITE_APPEND: If the table or partition already exists, BigQuery appends the data to the table or the latest partition. * WRITE_EMPTY: If the table already exists and contains data, an error is returned. The default value is WRITE_APPEND. Each action is atomic and only occurs if BigQuery is able to complete the job successfully. Details are at https://cloud.google.com/bigquery/docs/loading-data-local#appending_to_or_overwriting_a_table_using_a_local_file. */
  writeDisposition?: string;
  /** The partition key for BigQuery partitioned table. */
  partitionKey?: "PARTITION_KEY_UNSPECIFIED" | "REQUEST_TIME" | (string & {});
}

export const GoogleCloudAssetV1BigQueryDestination: Schema.Schema<GoogleCloudAssetV1BigQueryDestination> = Schema.suspend(() => Schema.Struct({
  dataset: Schema.optional(Schema.String),
  tablePrefix: Schema.optional(Schema.String),
  writeDisposition: Schema.optional(Schema.String),
  partitionKey: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAssetV1BigQueryDestination" }) as any as Schema.Schema<GoogleCloudAssetV1BigQueryDestination>;

export interface IamPolicyAnalysisOutputConfig {
  /** Destination on Cloud Storage. */
  gcsDestination?: GoogleCloudAssetV1GcsDestination;
  /** Destination on BigQuery. */
  bigqueryDestination?: GoogleCloudAssetV1BigQueryDestination;
}

export const IamPolicyAnalysisOutputConfig: Schema.Schema<IamPolicyAnalysisOutputConfig> = Schema.suspend(() => Schema.Struct({
  gcsDestination: Schema.optional(GoogleCloudAssetV1GcsDestination),
  bigqueryDestination: Schema.optional(GoogleCloudAssetV1BigQueryDestination),
})).annotate({ identifier: "IamPolicyAnalysisOutputConfig" }) as any as Schema.Schema<IamPolicyAnalysisOutputConfig>;

export interface TimeWindow {
  /** Start time of the time window (exclusive). */
  startTime?: string;
  /** End time of the time window (inclusive). If not specified, the current timestamp is used instead. */
  endTime?: string;
}

export const TimeWindow: Schema.Schema<TimeWindow> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeWindow" }) as any as Schema.Schema<TimeWindow>;

export interface TemporalAsset {
  /** Prior copy of the asset. Populated if prior_asset_state is PRESENT. Currently this is only set for responses in Real-Time Feed. */
  priorAsset?: Asset;
  /** State of prior_asset. */
  priorAssetState?: "PRIOR_ASSET_STATE_UNSPECIFIED" | "PRESENT" | "INVALID" | "DOES_NOT_EXIST" | "DELETED" | (string & {});
  /** Whether the asset has been deleted or not. */
  deleted?: boolean;
  /** An asset in Google Cloud. */
  asset?: Asset;
  /** The time window when the asset data and state was observed. */
  window?: TimeWindow;
}

export const TemporalAsset: Schema.Schema<TemporalAsset> = Schema.suspend(() => Schema.Struct({
  priorAsset: Schema.optional(Asset),
  priorAssetState: Schema.optional(Schema.String),
  deleted: Schema.optional(Schema.Boolean),
  asset: Schema.optional(Asset),
  window: Schema.optional(TimeWindow),
})).annotate({ identifier: "TemporalAsset" }) as any as Schema.Schema<TemporalAsset>;

export interface PolicyInfo {
  /** The IAM policy that's directly attached to the attached_resource. */
  policy?: Policy;
  /** The full resource name the policy is directly attached to. */
  attachedResource?: string;
}

export const PolicyInfo: Schema.Schema<PolicyInfo> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
  attachedResource: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyInfo" }) as any as Schema.Schema<PolicyInfo>;

export interface EffectiveIamPolicy {
  /** The [full_resource_name] (https://cloud.google.com/asset-inventory/docs/resource-name-format) for which the policies are computed. This is one of the BatchGetEffectiveIamPoliciesRequest.names the caller provides in the request. */
  fullResourceName?: string;
  /** The effective policies for the full_resource_name. These policies include the policy set on the full_resource_name and those set on its parents and ancestors up to the BatchGetEffectiveIamPoliciesRequest.scope. Note that these policies are not filtered according to the resource type of the full_resource_name. These policies are hierarchically ordered by PolicyInfo.attached_resource starting from full_resource_name itself to its parents and ancestors, such that policies[i]'s PolicyInfo.attached_resource is the child of policies[i+1]'s PolicyInfo.attached_resource, if policies[i+1] exists. */
  policies?: Array<PolicyInfo>;
}

export const EffectiveIamPolicy: Schema.Schema<EffectiveIamPolicy> = Schema.suspend(() => Schema.Struct({
  fullResourceName: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(PolicyInfo)),
})).annotate({ identifier: "EffectiveIamPolicy" }) as any as Schema.Schema<EffectiveIamPolicy>;

export interface BatchGetEffectiveIamPoliciesResponse {
  /** The effective policies for a batch of resources. Note that the results order is the same as the order of BatchGetEffectiveIamPoliciesRequest.names. When a resource does not have any effective IAM policies, its corresponding policy_result will contain empty EffectiveIamPolicy.policies. */
  policyResults?: Array<EffectiveIamPolicy>;
}

export const BatchGetEffectiveIamPoliciesResponse: Schema.Schema<BatchGetEffectiveIamPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  policyResults: Schema.optional(Schema.Array(EffectiveIamPolicy)),
})).annotate({ identifier: "BatchGetEffectiveIamPoliciesResponse" }) as any as Schema.Schema<BatchGetEffectiveIamPoliciesResponse>;

export interface GoogleCloudAssetV1p7beta1RelationshipAttributes {
  /** The source asset type. Example: `compute.googleapis.com/Instance` */
  sourceResourceType?: string;
  /** The target asset type. Example: `compute.googleapis.com/Disk` */
  targetResourceType?: string;
  /** The detail of the relationship, e.g. `contains`, `attaches` */
  action?: string;
  /** The unique identifier of the relationship type. Example: `INSTANCE_TO_INSTANCEGROUP` */
  type?: string;
}

export const GoogleCloudAssetV1p7beta1RelationshipAttributes: Schema.Schema<GoogleCloudAssetV1p7beta1RelationshipAttributes> = Schema.suspend(() => Schema.Struct({
  sourceResourceType: Schema.optional(Schema.String),
  targetResourceType: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAssetV1p7beta1RelationshipAttributes" }) as any as Schema.Schema<GoogleCloudAssetV1p7beta1RelationshipAttributes>;

export interface AnalyzeOrgPolicyGovernedContainersResponse {
  /** The definition of the constraint in the request. */
  constraint?: AnalyzerOrgPolicyConstraint;
  /** The page token to fetch the next page for AnalyzeOrgPolicyGovernedContainersResponse.governed_containers. */
  nextPageToken?: string;
  /** The list of the analyzed governed containers. */
  governedContainers?: Array<GoogleCloudAssetV1GovernedContainer>;
}

export const AnalyzeOrgPolicyGovernedContainersResponse: Schema.Schema<AnalyzeOrgPolicyGovernedContainersResponse> = Schema.suspend(() => Schema.Struct({
  constraint: Schema.optional(AnalyzerOrgPolicyConstraint),
  nextPageToken: Schema.optional(Schema.String),
  governedContainers: Schema.optional(Schema.Array(GoogleCloudAssetV1GovernedContainer)),
})).annotate({ identifier: "AnalyzeOrgPolicyGovernedContainersResponse" }) as any as Schema.Schema<AnalyzeOrgPolicyGovernedContainersResponse>;

export interface AnalyzeIamPolicyLongrunningRequest {
  /** Optional. The name of a saved query, which must be in the format of: * projects/project_number/savedQueries/saved_query_id * folders/folder_number/savedQueries/saved_query_id * organizations/organization_number/savedQueries/saved_query_id If both `analysis_query` and `saved_analysis_query` are provided, they will be merged together with the `saved_analysis_query` as base and the `analysis_query` as overrides. For more details of the merge behavior, refer to the [MergeFrom](https://developers.google.com/protocol-buffers/docs/reference/cpp/google.protobuf.message#Message.MergeFrom.details) doc. Note that you cannot override primitive fields with default value, such as 0 or empty string, etc., because we use proto3, which doesn't support field presence yet. */
  savedAnalysisQuery?: string;
  /** Required. The request query. */
  analysisQuery?: IamPolicyAnalysisQuery;
  /** Required. Output configuration indicating where the results will be output to. */
  outputConfig?: IamPolicyAnalysisOutputConfig;
}

export const AnalyzeIamPolicyLongrunningRequest: Schema.Schema<AnalyzeIamPolicyLongrunningRequest> = Schema.suspend(() => Schema.Struct({
  savedAnalysisQuery: Schema.optional(Schema.String),
  analysisQuery: Schema.optional(IamPolicyAnalysisQuery),
  outputConfig: Schema.optional(IamPolicyAnalysisOutputConfig),
})).annotate({ identifier: "AnalyzeIamPolicyLongrunningRequest" }) as any as Schema.Schema<AnalyzeIamPolicyLongrunningRequest>;

export interface ExportAssetsRequest {
  /** Required. Output configuration indicating where the results will be output to. */
  outputConfig?: OutputConfig;
  /** A list of asset types to take a snapshot for. For example: "compute.googleapis.com/Disk". Regular expressions are also supported. For example: * "compute.googleapis.com.*" snapshots resources whose asset type starts with "compute.googleapis.com". * ".*Instance" snapshots resources whose asset type ends with "Instance". * ".*Instance.*" snapshots resources whose asset type contains "Instance". See [RE2](https://github.com/google/re2/wiki/Syntax) for all supported regular expression syntax. If the regular expression does not match any supported asset type, an INVALID_ARGUMENT error will be returned. If specified, only matching assets will be returned, otherwise, it will snapshot all asset types. See [Introduction to Cloud Asset Inventory](https://cloud.google.com/asset-inventory/docs/overview) for all supported asset types. */
  assetTypes?: Array<string>;
  /** Asset content type. If not specified, no content but the asset name will be returned. */
  contentType?: "CONTENT_TYPE_UNSPECIFIED" | "RESOURCE" | "IAM_POLICY" | "ORG_POLICY" | "ACCESS_POLICY" | "OS_INVENTORY" | "RELATIONSHIP" | (string & {});
  /** Timestamp to take an asset snapshot. This can only be set to a timestamp between the current time and the current time minus 35 days (inclusive). If not specified, the current time will be used. Due to delays in resource data collection and indexing, there is a volatile window during which running the same query may get different results. */
  readTime?: string;
  /** A list of relationship types to export, for example: `INSTANCE_TO_INSTANCEGROUP`. This field should only be specified if content_type=RELATIONSHIP. * If specified: it snapshots specified relationships. It returns an error if any of the [relationship_types] doesn't belong to the supported relationship types of the [asset_types] or if any of the [asset_types] doesn't belong to the source types of the [relationship_types]. * Otherwise: it snapshots the supported relationships for all [asset_types] or returns an error if any of the [asset_types] has no relationship support. An unspecified asset types field means all supported asset_types. See [Introduction to Cloud Asset Inventory](https://cloud.google.com/asset-inventory/docs/overview) for all supported asset types and relationship types. */
  relationshipTypes?: Array<string>;
}

export const ExportAssetsRequest: Schema.Schema<ExportAssetsRequest> = Schema.suspend(() => Schema.Struct({
  outputConfig: Schema.optional(OutputConfig),
  assetTypes: Schema.optional(Schema.Array(Schema.String)),
  contentType: Schema.optional(Schema.String),
  readTime: Schema.optional(Schema.String),
  relationshipTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ExportAssetsRequest" }) as any as Schema.Schema<ExportAssetsRequest>;

export interface AnalyzeOrgPolicyGovernedAssetsResponse {
  /** The page token to fetch the next page for AnalyzeOrgPolicyGovernedAssetsResponse.governed_assets. */
  nextPageToken?: string;
  /** The definition of the constraint in the request. */
  constraint?: AnalyzerOrgPolicyConstraint;
  /** The list of the analyzed governed assets. */
  governedAssets?: Array<GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset>;
}

export const AnalyzeOrgPolicyGovernedAssetsResponse: Schema.Schema<AnalyzeOrgPolicyGovernedAssetsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  constraint: Schema.optional(AnalyzerOrgPolicyConstraint),
  governedAssets: Schema.optional(Schema.Array(GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset)),
})).annotate({ identifier: "AnalyzeOrgPolicyGovernedAssetsResponse" }) as any as Schema.Schema<AnalyzeOrgPolicyGovernedAssetsResponse>;

export interface QueryAssetsRequest {
  /** Optional. Specifies the maximum amount of time that the client is willing to wait for the query to complete. By default, this limit is 5 min for the first query, and 1 minute for the following queries. If the query is complete, the `done` field in the `QueryAssetsResponse` is true, otherwise false. Like BigQuery [jobs.query API](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query#queryrequest) The call is not guaranteed to wait for the specified timeout; it typically returns after around 200 seconds (200,000 milliseconds), even if the query is not complete. The field will be ignored when [output_config] is specified. */
  timeout?: string;
  /** Optional. A SQL statement that's compatible with [BigQuery SQL](https://cloud.google.com/bigquery/docs/introduction-sql). */
  statement?: string;
  /** Optional. Destination where the query results will be saved. When this field is specified, the query results won't be saved in the [QueryAssetsResponse.query_result]. Instead [QueryAssetsResponse.output_config] will be set. Meanwhile, [QueryAssetsResponse.job_reference] will be set and can be used to check the status of the query job when passed to a following [QueryAssets] API call. */
  outputConfig?: QueryAssetsOutputConfig;
  /** Optional. Reference to the query job, which is from the `QueryAssetsResponse` of previous `QueryAssets` call. */
  jobReference?: string;
  /** Optional. A page token received from previous `QueryAssets`. The field will be ignored when [output_config] is specified. */
  pageToken?: string;
  /** Optional. [start_time] is required. [start_time] must be less than [end_time] Defaults [end_time] to now if [start_time] is set and [end_time] isn't. Maximum permitted time range is 7 days. */
  readTimeWindow?: TimeWindow;
  /** Optional. The maximum number of rows to return in the results. Responses are limited to 10 MB and 1000 rows. By default, the maximum row count is 1000. When the byte or row count limit is reached, the rest of the query results will be paginated. The field will be ignored when [output_config] is specified. */
  pageSize?: number;
  /** Optional. Queries cloud assets as they appeared at the specified point in time. */
  readTime?: string;
}

export const QueryAssetsRequest: Schema.Schema<QueryAssetsRequest> = Schema.suspend(() => Schema.Struct({
  timeout: Schema.optional(Schema.String),
  statement: Schema.optional(Schema.String),
  outputConfig: Schema.optional(QueryAssetsOutputConfig),
  jobReference: Schema.optional(Schema.String),
  pageToken: Schema.optional(Schema.String),
  readTimeWindow: Schema.optional(TimeWindow),
  pageSize: Schema.optional(Schema.Number),
  readTime: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryAssetsRequest" }) as any as Schema.Schema<QueryAssetsRequest>;

export interface Feed {
  /** A list of relationship types to output, for example: `INSTANCE_TO_INSTANCEGROUP`. This field should only be specified if content_type=RELATIONSHIP. * If specified: it outputs specified relationship updates on the [asset_names] or the [asset_types]. It returns an error if any of the [relationship_types] doesn't belong to the supported relationship types of the [asset_names] or [asset_types], or any of the [asset_names] or the [asset_types] doesn't belong to the source types of the [relationship_types]. * Otherwise: it outputs the supported relationships of the types of [asset_names] and [asset_types] or returns an error if any of the [asset_names] or the [asset_types] has no replationship support. See [Introduction to Cloud Asset Inventory](https://cloud.google.com/asset-inventory/docs/overview) for all supported asset types and relationship types. */
  relationshipTypes?: Array<string>;
  /** A condition which determines whether an asset update should be published. If specified, an asset will be returned only when the expression evaluates to true. When set, `expression` field in the `Expr` must be a valid [CEL expression] (https://github.com/google/cel-spec) on a TemporalAsset with name `temporal_asset`. Example: a Feed with expression ("temporal_asset.deleted == true") will only publish Asset deletions. Other fields of `Expr` are optional. See our [user guide](https://cloud.google.com/asset-inventory/docs/monitoring-asset-changes-with-condition) for detailed instructions. */
  condition?: Expr;
  /** A list of the full names of the assets to receive updates. You must specify either or both of asset_names and asset_types. Only asset updates matching specified asset_names or asset_types are exported to the feed. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`. For a list of the full names for supported asset types, see [Resource name format](/asset-inventory/docs/resource-name-format). */
  assetNames?: Array<string>;
  /** Required. The format will be projects/{project_number}/feeds/{client-assigned_feed_identifier} or folders/{folder_number}/feeds/{client-assigned_feed_identifier} or organizations/{organization_number}/feeds/{client-assigned_feed_identifier} The client-assigned feed identifier must be unique within the parent project/folder/organization. */
  name?: string;
  /** Required. Feed output configuration defining where the asset updates are published to. */
  feedOutputConfig?: FeedOutputConfig;
  /** Asset content type. If not specified, no content but the asset name and type will be returned. */
  contentType?: "CONTENT_TYPE_UNSPECIFIED" | "RESOURCE" | "IAM_POLICY" | "ORG_POLICY" | "ACCESS_POLICY" | "OS_INVENTORY" | "RELATIONSHIP" | (string & {});
  /** A list of types of the assets to receive updates. You must specify either or both of asset_names and asset_types. Only asset updates matching specified asset_names or asset_types are exported to the feed. Example: `"compute.googleapis.com/Disk"` For a list of all supported asset types, see [Supported asset types](/asset-inventory/docs/supported-asset-types). */
  assetTypes?: Array<string>;
}

export const Feed: Schema.Schema<Feed> = Schema.suspend(() => Schema.Struct({
  relationshipTypes: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Expr),
  assetNames: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  feedOutputConfig: Schema.optional(FeedOutputConfig),
  contentType: Schema.optional(Schema.String),
  assetTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Feed" }) as any as Schema.Schema<Feed>;

export interface ListFeedsResponse {
  /** A list of feeds. */
  feeds?: Array<Feed>;
}

export const ListFeedsResponse: Schema.Schema<ListFeedsResponse> = Schema.suspend(() => Schema.Struct({
  feeds: Schema.optional(Schema.Array(Feed)),
})).annotate({ identifier: "ListFeedsResponse" }) as any as Schema.Schema<ListFeedsResponse>;

export interface GoogleCloudAssetV1p7beta1RelatedAssets {
  /** The peer resources of the relationship. */
  assets?: Array<GoogleCloudAssetV1p7beta1RelatedAsset>;
  /** The detailed relation attributes. */
  relationshipAttributes?: GoogleCloudAssetV1p7beta1RelationshipAttributes;
}

export const GoogleCloudAssetV1p7beta1RelatedAssets: Schema.Schema<GoogleCloudAssetV1p7beta1RelatedAssets> = Schema.suspend(() => Schema.Struct({
  assets: Schema.optional(Schema.Array(GoogleCloudAssetV1p7beta1RelatedAsset)),
  relationshipAttributes: Schema.optional(GoogleCloudAssetV1p7beta1RelationshipAttributes),
})).annotate({ identifier: "GoogleCloudAssetV1p7beta1RelatedAssets" }) as any as Schema.Schema<GoogleCloudAssetV1p7beta1RelatedAssets>;

export interface GoogleCloudAssetV1p7beta1Asset {
  /** Please also refer to the [service perimeter user guide](https://cloud.google.com/vpc-service-controls/docs/overview). */
  servicePerimeter?: GoogleIdentityAccesscontextmanagerV1ServicePerimeter;
  /** The last update timestamp of an asset. update_time is updated when create/update/delete operation is performed. */
  updateTime?: string;
  /** The ancestry path of an asset in Google Cloud [resource hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), represented as a list of relative resource names. An ancestry path starts with the closest ancestor in the hierarchy and ends at root. If the asset is a project, folder, or organization, the ancestry path starts from the asset itself. Example: `["projects/123456789", "folders/5432", "organizations/1234"]` */
  ancestors?: Array<string>;
  /** A representation of an [organization policy](https://cloud.google.com/resource-manager/docs/organization-policy/overview#organization_policy). There can be more than one organization policy with different constraints set on a given resource. */
  orgPolicy?: Array<GoogleCloudOrgpolicyV1Policy>;
  /** Please also refer to the [access policy user guide](https://cloud.google.com/access-context-manager/docs/overview#access-policies). */
  accessPolicy?: GoogleIdentityAccesscontextmanagerV1AccessPolicy;
  /** The related assets of the asset of one relationship type. One asset only represents one type of relationship. */
  relatedAssets?: GoogleCloudAssetV1p7beta1RelatedAssets;
  /** Please also refer to the [access level user guide](https://cloud.google.com/access-context-manager/docs/overview#access-levels). */
  accessLevel?: GoogleIdentityAccesscontextmanagerV1AccessLevel;
  /** The full name of the asset. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1` See [Resource names](https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. */
  name?: string;
  /** A representation of the resource. */
  resource?: GoogleCloudAssetV1p7beta1Resource;
  /** The type of the asset. Example: `compute.googleapis.com/Disk` See [Supported asset types](https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information. */
  assetType?: string;
  /** A representation of the IAM policy set on a Google Cloud resource. There can be a maximum of one IAM policy set on any given resource. In addition, IAM policies inherit their granted access scope from any policies set on parent resources in the resource hierarchy. Therefore, the effectively policy is the union of both the policy set on this resource and each policy set on all of the resource's ancestry resource levels in the hierarchy. See [this topic](https://cloud.google.com/iam/help/allow-policies/inheritance) for more information. */
  iamPolicy?: Policy;
}

export const GoogleCloudAssetV1p7beta1Asset: Schema.Schema<GoogleCloudAssetV1p7beta1Asset> = Schema.suspend(() => Schema.Struct({
  servicePerimeter: Schema.optional(GoogleIdentityAccesscontextmanagerV1ServicePerimeter),
  updateTime: Schema.optional(Schema.String),
  ancestors: Schema.optional(Schema.Array(Schema.String)),
  orgPolicy: Schema.optional(Schema.Array(GoogleCloudOrgpolicyV1Policy)),
  accessPolicy: Schema.optional(GoogleIdentityAccesscontextmanagerV1AccessPolicy),
  relatedAssets: Schema.optional(GoogleCloudAssetV1p7beta1RelatedAssets),
  accessLevel: Schema.optional(GoogleIdentityAccesscontextmanagerV1AccessLevel),
  name: Schema.optional(Schema.String),
  resource: Schema.optional(GoogleCloudAssetV1p7beta1Resource),
  assetType: Schema.optional(Schema.String),
  iamPolicy: Schema.optional(Policy),
})).annotate({ identifier: "GoogleCloudAssetV1p7beta1Asset" }) as any as Schema.Schema<GoogleCloudAssetV1p7beta1Asset>;

export interface SearchAllResourcesResponse {
  /** If there are more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
  /** A list of Resources that match the search query. It contains the resource standard metadata information. */
  results?: Array<ResourceSearchResult>;
}

export const SearchAllResourcesResponse: Schema.Schema<SearchAllResourcesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  results: Schema.optional(Schema.Array(ResourceSearchResult)),
})).annotate({ identifier: "SearchAllResourcesResponse" }) as any as Schema.Schema<SearchAllResourcesResponse>;

export interface CreateFeedRequest {
  /** Required. This is the client-assigned asset feed identifier and it needs to be unique under a specific parent project/folder/organization. */
  feedId?: string;
  /** Required. The feed details. The field `name` must be empty and it will be generated in the format of: projects/project_number/feeds/feed_id folders/folder_number/feeds/feed_id organizations/organization_number/feeds/feed_id */
  feed?: Feed;
}

export const CreateFeedRequest: Schema.Schema<CreateFeedRequest> = Schema.suspend(() => Schema.Struct({
  feedId: Schema.optional(Schema.String),
  feed: Schema.optional(Feed),
})).annotate({ identifier: "CreateFeedRequest" }) as any as Schema.Schema<CreateFeedRequest>;

export interface OrgPolicyResult {
  /** The consolidated organization policy for the analyzed resource. The consolidated organization policy is computed by merging and evaluating policy_bundle. The evaluation will respect the organization policy [hierarchy rules](https://cloud.google.com/resource-manager/docs/organization-policy/understanding-hierarchy). */
  consolidatedPolicy?: AnalyzerOrgPolicy;
  /** The ordered list of all organization policies from the consolidated_policy.attached_resource. to the scope specified in the request. If the constraint is defined with default policy, it will also appear in the list. */
  policyBundle?: Array<AnalyzerOrgPolicy>;
  /** The folder(s) that this consolidated policy belongs to, in the format of folders/{FOLDER_NUMBER}. This field is available when the consolidated policy belongs (directly or cascadingly) to one or more folders. */
  folders?: Array<string>;
  /** The organization that this consolidated policy belongs to, in the format of organizations/{ORGANIZATION_NUMBER}. This field is available when the consolidated policy belongs (directly or cascadingly) to an organization. */
  organization?: string;
  /** The project that this consolidated policy belongs to, in the format of projects/{PROJECT_NUMBER}. This field is available when the consolidated policy belongs to a project. */
  project?: string;
}

export const OrgPolicyResult: Schema.Schema<OrgPolicyResult> = Schema.suspend(() => Schema.Struct({
  consolidatedPolicy: Schema.optional(AnalyzerOrgPolicy),
  policyBundle: Schema.optional(Schema.Array(AnalyzerOrgPolicy)),
  folders: Schema.optional(Schema.Array(Schema.String)),
  organization: Schema.optional(Schema.String),
  project: Schema.optional(Schema.String),
})).annotate({ identifier: "OrgPolicyResult" }) as any as Schema.Schema<OrgPolicyResult>;

export interface UpdateFeedRequest {
  /** Required. The new values of feed details. It must match an existing feed and the field `name` must be in the format of: projects/project_number/feeds/feed_id or folders/folder_number/feeds/feed_id or organizations/organization_number/feeds/feed_id. */
  feed?: Feed;
  /** Required. Only updates the `feed` fields indicated by this mask. The field mask must not be empty, and it must not contain fields that are immutable or only set by the server. */
  updateMask?: string;
}

export const UpdateFeedRequest: Schema.Schema<UpdateFeedRequest> = Schema.suspend(() => Schema.Struct({
  feed: Schema.optional(Feed),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateFeedRequest" }) as any as Schema.Schema<UpdateFeedRequest>;

export interface BatchGetAssetsHistoryResponse {
  /** A list of assets with valid time windows. */
  assets?: Array<TemporalAsset>;
}

export const BatchGetAssetsHistoryResponse: Schema.Schema<BatchGetAssetsHistoryResponse> = Schema.suspend(() => Schema.Struct({
  assets: Schema.optional(Schema.Array(TemporalAsset)),
})).annotate({ identifier: "BatchGetAssetsHistoryResponse" }) as any as Schema.Schema<BatchGetAssetsHistoryResponse>;

export interface AnalyzeOrgPoliciesResponse {
  /** The organization policies under the AnalyzeOrgPoliciesRequest.scope with the AnalyzeOrgPoliciesRequest.constraint. */
  orgPolicyResults?: Array<OrgPolicyResult>;
  /** The definition of the constraint in the request. */
  constraint?: AnalyzerOrgPolicyConstraint;
  /** The page token to fetch the next page for AnalyzeOrgPoliciesResponse.org_policy_results. */
  nextPageToken?: string;
}

export const AnalyzeOrgPoliciesResponse: Schema.Schema<AnalyzeOrgPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  orgPolicyResults: Schema.optional(Schema.Array(OrgPolicyResult)),
  constraint: Schema.optional(AnalyzerOrgPolicyConstraint),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "AnalyzeOrgPoliciesResponse" }) as any as Schema.Schema<AnalyzeOrgPoliciesResponse>;

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
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}/operations/{operationsId}/{operationsId1}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = Operation;

export type GetOperationsError = CommonErrors;

export const getOperations: API.OperationMethod<GetOperationsRequest, GetOperationsResponse, GetOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

/** Updates a saved query. */
export interface PatchSavedQueriesRequest {
  /** Required. The list of fields to update. */
  updateMask?: string;
  /** The resource name of the saved query. The format must be: * projects/project_number/savedQueries/saved_query_id * folders/folder_number/savedQueries/saved_query_id * organizations/organization_number/savedQueries/saved_query_id */
  name: string;
  /** Request body */
  body?: SavedQuery;
}

export const PatchSavedQueriesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SavedQuery).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/{v1Id}/{v1Id1}/savedQueries/{savedQueriesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchSavedQueriesRequest>;

export type PatchSavedQueriesResponse = SavedQuery;
export const PatchSavedQueriesResponse = SavedQuery;

export type PatchSavedQueriesError = CommonErrors;

export const patchSavedQueries: API.OperationMethod<PatchSavedQueriesRequest, PatchSavedQueriesResponse, PatchSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchSavedQueriesRequest,
  output: PatchSavedQueriesResponse,
  errors: [],
}));

/** Lists all saved queries in a parent project/folder/organization. */
export interface ListSavedQueriesRequest {
  /** Optional. The maximum number of saved queries to return per page. The service may return fewer than this value. If unspecified, at most 50 will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. The expression to filter resources. The expression is a list of zero or more restrictions combined via logical operators `AND` and `OR`. When `AND` and `OR` are both used in the expression, parentheses must be appropriately used to group the combinations. The expression may also contain regular expressions. See https://google.aip.dev/160 for more information on the grammar. */
  filter?: string;
  /** Optional. A page token, received from a previous `ListSavedQueries` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSavedQueries` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The parent project/folder/organization whose savedQueries are to be listed. It can only be using project/folder/organization number (such as "folders/12345")", or a project ID (such as "projects/my-project-id"). */
  parent: string;
}

export const ListSavedQueriesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}/savedQueries" }),
  svc,
) as unknown as Schema.Schema<ListSavedQueriesRequest>;

export type ListSavedQueriesResponse_Op = ListSavedQueriesResponse;
export const ListSavedQueriesResponse_Op = ListSavedQueriesResponse;

export type ListSavedQueriesError = CommonErrors;

export const listSavedQueries = API.makePaginated(() => ({
  input: ListSavedQueriesRequest,
  output: ListSavedQueriesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a saved query. */
export interface DeleteSavedQueriesRequest {
  /** Required. The name of the saved query to delete. It must be in the format of: * projects/project_number/savedQueries/saved_query_id * folders/folder_number/savedQueries/saved_query_id * organizations/organization_number/savedQueries/saved_query_id */
  name: string;
}

export const DeleteSavedQueriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/{v1Id}/{v1Id1}/savedQueries/{savedQueriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteSavedQueriesRequest>;

export type DeleteSavedQueriesResponse = Empty;
export const DeleteSavedQueriesResponse = Empty;

export type DeleteSavedQueriesError = CommonErrors;

export const deleteSavedQueries: API.OperationMethod<DeleteSavedQueriesRequest, DeleteSavedQueriesResponse, DeleteSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteSavedQueriesRequest,
  output: DeleteSavedQueriesResponse,
  errors: [],
}));

/** Gets details about a saved query. */
export interface GetSavedQueriesRequest {
  /** Required. The name of the saved query and it must be in the format of: * projects/project_number/savedQueries/saved_query_id * folders/folder_number/savedQueries/saved_query_id * organizations/organization_number/savedQueries/saved_query_id */
  name: string;
}

export const GetSavedQueriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}/savedQueries/{savedQueriesId}" }),
  svc,
) as unknown as Schema.Schema<GetSavedQueriesRequest>;

export type GetSavedQueriesResponse = SavedQuery;
export const GetSavedQueriesResponse = SavedQuery;

export type GetSavedQueriesError = CommonErrors;

export const getSavedQueries: API.OperationMethod<GetSavedQueriesRequest, GetSavedQueriesResponse, GetSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSavedQueriesRequest,
  output: GetSavedQueriesResponse,
  errors: [],
}));

/** Creates a saved query in a parent project/folder/organization. */
export interface CreateSavedQueriesRequest {
  /** Required. The name of the project/folder/organization where this saved_query should be created in. It can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"). */
  parent: string;
  /** Required. The ID to use for the saved query, which must be unique in the specified parent. It will become the final component of the saved query's resource name. This value should be 4-63 characters, and valid characters are `a-z-`. Notice that this field is required in the saved query creation, and the `name` field of the `saved_query` will be ignored. */
  savedQueryId?: string;
  /** Request body */
  body?: SavedQuery;
}

export const CreateSavedQueriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  savedQueryId: Schema.optional(Schema.String).pipe(T.HttpQuery("savedQueryId")),
  body: Schema.optional(SavedQuery).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/{v1Id}/{v1Id1}/savedQueries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSavedQueriesRequest>;

export type CreateSavedQueriesResponse = SavedQuery;
export const CreateSavedQueriesResponse = SavedQuery;

export type CreateSavedQueriesError = CommonErrors;

export const createSavedQueries: API.OperationMethod<CreateSavedQueriesRequest, CreateSavedQueriesResponse, CreateSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSavedQueriesRequest,
  output: CreateSavedQueriesResponse,
  errors: [],
}));

/** Issue a job that queries assets using a SQL statement compatible with [BigQuery SQL](https://cloud.google.com/bigquery/docs/introduction-sql). If the query execution finishes within timeout and there's no pagination, the full query results will be returned in the `QueryAssetsResponse`. Otherwise, full query results can be obtained by issuing extra requests with the `job_reference` from the a previous `QueryAssets` call. Note, the query result has approximately 10 GB limitation enforced by [BigQuery](https://cloud.google.com/bigquery/docs/best-practices-performance-output). Queries return larger results will result in errors. */
export interface QueryAssetsV1Request {
  /** Required. The relative name of the root asset. This can only be an organization number (such as "organizations/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"), or a folder number (such as "folders/123"). Only assets belonging to the `parent` will be returned. */
  parent: string;
  /** Request body */
  body?: QueryAssetsRequest;
}

export const QueryAssetsV1Request = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(QueryAssetsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/{v1Id}/{v1Id1}:queryAssets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryAssetsV1Request>;

export type QueryAssetsV1Response = QueryAssetsResponse;
export const QueryAssetsV1Response = QueryAssetsResponse;

export type QueryAssetsV1Error = CommonErrors;

export const queryAssetsV1: API.OperationMethod<QueryAssetsV1Request, QueryAssetsV1Response, QueryAssetsV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryAssetsV1Request,
  output: QueryAssetsV1Response,
  errors: [],
}));

/** Analyzes organization policies governed containers (projects, folders or organization) under a scope. */
export interface AnalyzeOrgPolicyGovernedContainersV1Request {
  /** Required. The organization to scope the request. Only organization policies within the scope will be analyzed. The output containers will also be limited to the ones governed by those in-scope organization policies. * organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456") */
  scope: string;
  /** The expression to filter AnalyzeOrgPolicyGovernedContainersResponse.governed_containers. Filtering is currently available for bare literal values and the following fields: * parent * consolidated_policy.rules.enforce When filtering by a specific field, the only supported operator is `=`. For example, filtering by parent="//cloudresourcemanager.googleapis.com/folders/001" will return all the containers under "folders/001". */
  filter?: string;
  /** The pagination token to retrieve the next page. */
  pageToken?: string;
  /** Required. The name of the constraint to analyze governed containers for. The analysis only contains organization policies for the provided constraint. */
  constraint?: string;
  /** The maximum number of items to return per page. If unspecified, AnalyzeOrgPolicyGovernedContainersResponse.governed_containers will contain 100 items with a maximum of 200. */
  pageSize?: number;
}

export const AnalyzeOrgPolicyGovernedContainersV1Request = Schema.Struct({
  scope: Schema.String.pipe(T.HttpPath("scope")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  constraint: Schema.optional(Schema.String).pipe(T.HttpQuery("constraint")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}:analyzeOrgPolicyGovernedContainers" }),
  svc,
) as unknown as Schema.Schema<AnalyzeOrgPolicyGovernedContainersV1Request>;

export type AnalyzeOrgPolicyGovernedContainersV1Response = AnalyzeOrgPolicyGovernedContainersResponse;
export const AnalyzeOrgPolicyGovernedContainersV1Response = AnalyzeOrgPolicyGovernedContainersResponse;

export type AnalyzeOrgPolicyGovernedContainersV1Error = CommonErrors;

export const analyzeOrgPolicyGovernedContainersV1 = API.makePaginated(() => ({
  input: AnalyzeOrgPolicyGovernedContainersV1Request,
  output: AnalyzeOrgPolicyGovernedContainersV1Response,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Analyzes IAM policies to answer which identities have what accesses on which resources. */
export interface AnalyzeIamPolicyV1Request {
  /** Optional. Amount of time executable has to complete. See JSON representation of [Duration](https://developers.google.com/protocol-buffers/docs/proto3#json). If this field is set with a value less than the RPC deadline, and the execution of your query hasn't finished in the specified execution timeout, you will get a response with partial result. Otherwise, your query's execution will continue until the RPC deadline. If it's not finished until then, you will get a DEADLINE_EXCEEDED error. Default is empty. */
  executionTimeout?: string;
  /** Optional. If true, the identities section of the result will expand any Google groups appearing in an IAM policy binding. If IamPolicyAnalysisQuery.identity_selector is specified, the identity in the result will be determined by the selector, and this flag is not allowed to set. If true, the default max expansion per group is 1000 for AssetService.AnalyzeIamPolicy][]. Default is false. */
  "analysisQuery.options.expandGroups"?: boolean;
  /** Required. The relative name of the root asset. Only resources and IAM policies within the scope will be analyzed. This can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"). To know how to get organization ID, visit [here ](https://cloud.google.com/resource-manager/docs/creating-managing-organization#retrieving_your_organization_id). To know how to get folder or project ID, visit [here ](https://cloud.google.com/resource-manager/docs/creating-managing-folders#viewing_or_listing_folders_and_projects). */
  scope: string;
  /** Required. The [full resource name] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of a resource of [supported resource types](https://cloud.google.com/asset-inventory/docs/supported-asset-types#analyzable_asset_types). */
  "analysisQuery.resourceSelector.fullResourceName"?: string;
  /** Optional. If true, the access section of result will expand any roles appearing in IAM policy bindings to include their permissions. If IamPolicyAnalysisQuery.access_selector is specified, the access section of the result will be determined by the selector, and this flag is not allowed to set. Default is false. */
  "analysisQuery.options.expandRoles"?: boolean;
  /** Optional. The roles to appear in result. */
  "analysisQuery.accessSelector.roles"?: string[];
  /** Optional. If true, the result will output the relevant parent/child relationships between resources. Default is false. */
  "analysisQuery.options.outputResourceEdges"?: boolean;
  /** Optional. If true and IamPolicyAnalysisQuery.resource_selector is not specified, the resource section of the result will expand any resource attached to an IAM policy to include resources lower in the resource hierarchy. For example, if the request analyzes for which resources user A has permission P, and the results include an IAM policy with P on a Google Cloud folder, the results will also include resources in that folder with permission P. If true and IamPolicyAnalysisQuery.resource_selector is specified, the resource section of the result will expand the specified resource to include resources lower in the resource hierarchy. Only project or lower resources are supported. Folder and organization resources cannot be used together with this option. For example, if the request analyzes for which users have permission P on a Google Cloud project with this option enabled, the results will include all users who have permission P on that project or any lower resource. If true, the default max expansion per resource is 1000 for AssetService.AnalyzeIamPolicy][] and 100000 for AssetService.AnalyzeIamPolicyLongrunning][]. Default is false. */
  "analysisQuery.options.expandResources"?: boolean;
  /** Optional. The permissions to appear in result. */
  "analysisQuery.accessSelector.permissions"?: string[];
  /** The hypothetical access timestamp to evaluate IAM conditions. Note that this value must not be earlier than the current time; otherwise, an INVALID_ARGUMENT error will be returned. */
  "analysisQuery.conditionContext.accessTime"?: string;
  /** Optional. If true, the response will include access analysis from identities to resources via service account impersonation. This is a very expensive operation, because many derived queries will be executed. We highly recommend you use AssetService.AnalyzeIamPolicyLongrunning RPC instead. For example, if the request analyzes for which resources user A has permission P, and there's an IAM policy states user A has iam.serviceAccounts.getAccessToken permission to a service account SA, and there's another IAM policy states service account SA has permission P to a Google Cloud folder F, then user A potentially has access to the Google Cloud folder F. And those advanced analysis results will be included in AnalyzeIamPolicyResponse.service_account_impersonation_analysis. Another example, if the request analyzes for who has permission P to a Google Cloud folder F, and there's an IAM policy states user A has iam.serviceAccounts.actAs permission to a service account SA, and there's another IAM policy states service account SA has permission P to the Google Cloud folder F, then user A potentially has access to the Google Cloud folder F. And those advanced analysis results will be included in AnalyzeIamPolicyResponse.service_account_impersonation_analysis. Only the following permissions are considered in this analysis: * `iam.serviceAccounts.actAs` * `iam.serviceAccounts.signBlob` * `iam.serviceAccounts.signJwt` * `iam.serviceAccounts.getAccessToken` * `iam.serviceAccounts.getOpenIdToken` * `iam.serviceAccounts.implicitDelegation` Default is false. */
  "analysisQuery.options.analyzeServiceAccountImpersonation"?: boolean;
  /** Optional. If true, the result will output the relevant membership relationships between groups and other groups, and between groups and principals. Default is false. */
  "analysisQuery.options.outputGroupEdges"?: boolean;
  /** Required. The identity appear in the form of principals in [IAM policy binding](https://cloud.google.com/iam/reference/rest/v1/Binding). The examples of supported forms are: "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com". Notice that wildcard characters (such as * and ?) are not supported. You must give a specific identity. */
  "analysisQuery.identitySelector.identity"?: string;
  /** Optional. The name of a saved query, which must be in the format of: * projects/project_number/savedQueries/saved_query_id * folders/folder_number/savedQueries/saved_query_id * organizations/organization_number/savedQueries/saved_query_id If both `analysis_query` and `saved_analysis_query` are provided, they will be merged together with the `saved_analysis_query` as base and the `analysis_query` as overrides. For more details of the merge behavior, refer to the [MergeFrom](https://developers.google.com/protocol-buffers/docs/reference/cpp/google.protobuf.message#Message.MergeFrom.details) page. Note that you cannot override primitive fields with default value, such as 0 or empty string, etc., because we use proto3, which doesn't support field presence yet. */
  savedAnalysisQuery?: string;
}

export const AnalyzeIamPolicyV1Request = Schema.Struct({
  executionTimeout: Schema.optional(Schema.String).pipe(T.HttpQuery("executionTimeout")),
  "analysisQuery.options.expandGroups": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("analysisQuery.options.expandGroups")),
  scope: Schema.String.pipe(T.HttpPath("scope")),
  "analysisQuery.resourceSelector.fullResourceName": Schema.optional(Schema.String).pipe(T.HttpQuery("analysisQuery.resourceSelector.fullResourceName")),
  "analysisQuery.options.expandRoles": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("analysisQuery.options.expandRoles")),
  "analysisQuery.accessSelector.roles": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("analysisQuery.accessSelector.roles")),
  "analysisQuery.options.outputResourceEdges": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("analysisQuery.options.outputResourceEdges")),
  "analysisQuery.options.expandResources": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("analysisQuery.options.expandResources")),
  "analysisQuery.accessSelector.permissions": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("analysisQuery.accessSelector.permissions")),
  "analysisQuery.conditionContext.accessTime": Schema.optional(Schema.String).pipe(T.HttpQuery("analysisQuery.conditionContext.accessTime")),
  "analysisQuery.options.analyzeServiceAccountImpersonation": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("analysisQuery.options.analyzeServiceAccountImpersonation")),
  "analysisQuery.options.outputGroupEdges": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("analysisQuery.options.outputGroupEdges")),
  "analysisQuery.identitySelector.identity": Schema.optional(Schema.String).pipe(T.HttpQuery("analysisQuery.identitySelector.identity")),
  savedAnalysisQuery: Schema.optional(Schema.String).pipe(T.HttpQuery("savedAnalysisQuery")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}:analyzeIamPolicy" }),
  svc,
) as unknown as Schema.Schema<AnalyzeIamPolicyV1Request>;

export type AnalyzeIamPolicyV1Response = AnalyzeIamPolicyResponse;
export const AnalyzeIamPolicyV1Response = AnalyzeIamPolicyResponse;

export type AnalyzeIamPolicyV1Error = CommonErrors;

export const analyzeIamPolicyV1: API.OperationMethod<AnalyzeIamPolicyV1Request, AnalyzeIamPolicyV1Response, AnalyzeIamPolicyV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnalyzeIamPolicyV1Request,
  output: AnalyzeIamPolicyV1Response,
  errors: [],
}));

/** Searches all Google Cloud resources within the specified scope, such as a project, folder, or organization. The caller must be granted the `cloudasset.assets.searchAllResources` permission on the desired scope, otherwise the request will be rejected. */
export interface SearchAllResourcesV1Request {
  /** Optional. A comma-separated list of fields specifying the sorting order of the results. The default order is ascending. Add " DESC" after the field name to indicate descending order. Redundant space characters are ignored. Example: "location DESC, name". Only the following fields in the response are sortable: * name * assetType * project * displayName * description * location * createTime * updateTime * state * parentFullResourceName * parentAssetType */
  orderBy?: string;
  /** Optional. A list of asset types that this request searches for. If empty, it will search all the asset types [supported by search APIs](https://cloud.google.com/asset-inventory/docs/supported-asset-types). Regular expressions are also supported. For example: * "compute.googleapis.com.*" snapshots resources whose asset type starts with "compute.googleapis.com". * ".*Instance" snapshots resources whose asset type ends with "Instance". * ".*Instance.*" snapshots resources whose asset type contains "Instance". See [RE2](https://github.com/google/re2/wiki/Syntax) for all supported regular expression syntax. If the regular expression does not match any supported asset type, an INVALID_ARGUMENT error will be returned. */
  assetTypes?: string[];
  /** Optional. The page size for search result pagination. Page size is capped at 500 even if a larger value is given. If set to zero or a negative value, server will pick an appropriate default. Returned results may be fewer than requested. When this happens, there could be more results as long as `next_page_token` is returned. */
  pageSize?: number;
  /** Optional. A comma-separated list of fields that you want returned in the results. The following fields are returned by default if not specified: * `name` * `assetType` * `project` * `folders` * `organization` * `displayName` * `description` * `location` * `labels` * `tags` * `effectiveTags` * `networkTags` * `kmsKeys` * `createTime` * `updateTime` * `state` * `additionalAttributes` * `parentFullResourceName` * `parentAssetType` Some fields of large size, such as `versionedResources`, `attachedResources`, `effectiveTags` etc., are not returned by default, but you can specify them in the `read_mask` parameter if you want to include them. If `"*"` is specified, all [available fields](https://cloud.google.com/asset-inventory/docs/reference/rest/v1/TopLevel/searchAllResources#resourcesearchresult) are returned. Examples: `"name,location"`, `"name,versionedResources"`, `"*"`. Any invalid field path will trigger INVALID_ARGUMENT error. */
  readMask?: string;
  /** Required. A scope can be a project, a folder, or an organization. The search is limited to the resources within the `scope`. The caller must be granted the [`cloudasset.assets.searchAllResources`](https://cloud.google.com/asset-inventory/docs/access-control#required_permissions) permission on the desired scope. The allowed values are: * projects/{PROJECT_ID} (e.g., "projects/foo-bar") * projects/{PROJECT_NUMBER} (e.g., "projects/12345678") * folders/{FOLDER_NUMBER} (e.g., "folders/1234567") * organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456") */
  scope: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of all other method parameters, must be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The query statement. See [how to construct a query](https://cloud.google.com/asset-inventory/docs/searching-resources#how_to_construct_a_query) for more information. If not specified or empty, it will search all the resources within the specified `scope`. Examples: * `name:Important` to find Google Cloud resources whose name contains `Important` as a word. * `name=Important` to find the Google Cloud resource whose name is exactly `Important`. * `displayName:Impor*` to find Google Cloud resources whose display name contains `Impor` as a prefix of any word in the field. * `location:us-west*` to find Google Cloud resources whose location contains both `us` and `west` as prefixes. * `labels:prod` to find Google Cloud resources whose labels contain `prod` as a key or value. * `labels.env:prod` to find Google Cloud resources that have a label `env` and its value is `prod`. * `labels.env:*` to find Google Cloud resources that have a label `env`. * `tagKeys:env` to find Google Cloud resources that have directly attached tags where the [`TagKey.namespacedName`](https://cloud.google.com/resource-manager/reference/rest/v3/tagKeys#resource:-tagkey) contains `env`. * `tagValues:prod*` to find Google Cloud resources that have directly attached tags where the [`TagValue.namespacedName`](https://cloud.google.com/resource-manager/reference/rest/v3/tagValues#resource:-tagvalue) contains a word prefixed by `prod`. * `tagValueIds=tagValues/123` to find Google Cloud resources that have directly attached tags where the [`TagValue.name`](https://cloud.google.com/resource-manager/reference/rest/v3/tagValues#resource:-tagvalue) is exactly `tagValues/123`. * `effectiveTagKeys:env` to find Google Cloud resources that have directly attached or inherited tags where the [`TagKey.namespacedName`](https://cloud.google.com/resource-manager/reference/rest/v3/tagKeys#resource:-tagkey) contains `env`. * `effectiveTagValues:prod*` to find Google Cloud resources that have directly attached or inherited tags where the [`TagValue.namespacedName`](https://cloud.google.com/resource-manager/reference/rest/v3/tagValues#resource:-tagvalue) contains a word prefixed by `prod`. * `effectiveTagValueIds=tagValues/123` to find Google Cloud resources that have directly attached or inherited tags where the [`TagValue.name`](https://cloud.google.com/resource-manager/reference/rest/v3/tagValues#resource:-tagvalue) is exactly `tagValues/123`. * `kmsKey:key` to find Google Cloud resources encrypted with a customer-managed encryption key whose name contains `key` as a word. This field is deprecated. Use the `kmsKeys` field to retrieve Cloud KMS key information. * `kmsKeys:key` to find Google Cloud resources encrypted with customer-managed encryption keys whose name contains the word `key`. * `relationships:instance-group-1` to find Google Cloud resources that have relationships with `instance-group-1` in the related resource name. * `relationships:INSTANCE_TO_INSTANCEGROUP` to find Compute Engine instances that have relationships of type `INSTANCE_TO_INSTANCEGROUP`. * `relationships.INSTANCE_TO_INSTANCEGROUP:instance-group-1` to find Compute Engine instances that have relationships with `instance-group-1` in the Compute Engine instance group resource name, for relationship type `INSTANCE_TO_INSTANCEGROUP`. * `sccSecurityMarks.key=value` to find Cloud resources that are attached with security marks whose key is `key` and value is `value`. * `sccSecurityMarks.key:*` to find Cloud resources that are attached with security marks whose key is `key`. * `state:ACTIVE` to find Google Cloud resources whose state contains `ACTIVE` as a word. * `NOT state:ACTIVE` to find Google Cloud resources whose state doesn't contain `ACTIVE` as a word. * `createTime<1609459200` to find Google Cloud resources that were created before `2021-01-01 00:00:00 UTC`. `1609459200` is the epoch timestamp of `2021-01-01 00:00:00 UTC` in seconds. * `updateTime>1609459200` to find Google Cloud resources that were updated after `2021-01-01 00:00:00 UTC`. `1609459200` is the epoch timestamp of `2021-01-01 00:00:00 UTC` in seconds. * `Important` to find Google Cloud resources that contain `Important` as a word in any of the searchable fields. * `Impor*` to find Google Cloud resources that contain `Impor` as a prefix of any word in any of the searchable fields. * `Important location:(us-west1 OR global)` to find Google Cloud resources that contain `Important` as a word in any of the searchable fields and are also located in the `us-west1` region or the `global` location. */
  query?: string;
}

export const SearchAllResourcesV1Request = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  assetTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("assetTypes")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
  scope: Schema.String.pipe(T.HttpPath("scope")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}:searchAllResources" }),
  svc,
) as unknown as Schema.Schema<SearchAllResourcesV1Request>;

export type SearchAllResourcesV1Response = SearchAllResourcesResponse;
export const SearchAllResourcesV1Response = SearchAllResourcesResponse;

export type SearchAllResourcesV1Error = CommonErrors;

export const searchAllResourcesV1 = API.makePaginated(() => ({
  input: SearchAllResourcesV1Request,
  output: SearchAllResourcesV1Response,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Analyzes organization policies governed assets (Google Cloud resources or policies) under a scope. This RPC supports custom constraints and the following canned constraints: * constraints/ainotebooks.accessMode * constraints/ainotebooks.disableFileDownloads * constraints/ainotebooks.disableRootAccess * constraints/ainotebooks.disableTerminal * constraints/ainotebooks.environmentOptions * constraints/ainotebooks.requireAutoUpgradeSchedule * constraints/ainotebooks.restrictVpcNetworks * constraints/compute.disableGuestAttributesAccess * constraints/compute.disableInstanceDataAccessApis * constraints/compute.disableNestedVirtualization * constraints/compute.disableSerialPortAccess * constraints/compute.disableSerialPortLogging * constraints/compute.disableVpcExternalIpv6 * constraints/compute.requireOsLogin * constraints/compute.requireShieldedVm * constraints/compute.restrictLoadBalancerCreationForTypes * constraints/compute.restrictProtocolForwardingCreationForTypes * constraints/compute.restrictXpnProjectLienRemoval * constraints/compute.setNewProjectDefaultToZonalDNSOnly * constraints/compute.skipDefaultNetworkCreation * constraints/compute.trustedImageProjects * constraints/compute.vmCanIpForward * constraints/compute.vmExternalIpAccess * constraints/gcp.detailedAuditLoggingMode * constraints/gcp.resourceLocations * constraints/iam.allowedPolicyMemberDomains * constraints/iam.automaticIamGrantsForDefaultServiceAccounts * constraints/iam.disableServiceAccountCreation * constraints/iam.disableServiceAccountKeyCreation * constraints/iam.disableServiceAccountKeyUpload * constraints/iam.restrictCrossProjectServiceAccountLienRemoval * constraints/iam.serviceAccountKeyExpiryHours * constraints/resourcemanager.accessBoundaries * constraints/resourcemanager.allowedExportDestinations * constraints/sql.restrictAuthorizedNetworks * constraints/sql.restrictNoncompliantDiagnosticDataAccess * constraints/sql.restrictNoncompliantResourceCreation * constraints/sql.restrictPublicIp * constraints/storage.publicAccessPrevention * constraints/storage.restrictAuthTypes * constraints/storage.uniformBucketLevelAccess This RPC only returns either resources of types [supported by search APIs](https://cloud.google.com/asset-inventory/docs/supported-asset-types) or IAM policies. */
export interface AnalyzeOrgPolicyGovernedAssetsV1Request {
  /** The maximum number of items to return per page. If unspecified, AnalyzeOrgPolicyGovernedAssetsResponse.governed_assets will contain 100 items with a maximum of 200. */
  pageSize?: number;
  /** Required. The name of the constraint to analyze governed assets for. The analysis only contains analyzed organization policies for the provided constraint. */
  constraint?: string;
  /** The pagination token to retrieve the next page. */
  pageToken?: string;
  /** The expression to filter AnalyzeOrgPolicyGovernedAssetsResponse.governed_assets. For governed resources, filtering is currently available for bare literal values and the following fields: * governed_resource.project * governed_resource.folders * consolidated_policy.rules.enforce When filtering by `governed_resource.project` or `consolidated_policy.rules.enforce`, the only supported operator is `=`. When filtering by `governed_resource.folders`, the supported operators are `=` and `:`. For example, filtering by `governed_resource.project="projects/12345678"` will return all the governed resources under "projects/12345678", including the project itself if applicable. For governed IAM policies, filtering is currently available for bare literal values and the following fields: * governed_iam_policy.project * governed_iam_policy.folders * consolidated_policy.rules.enforce When filtering by `governed_iam_policy.project` or `consolidated_policy.rules.enforce`, the only supported operator is `=`. When filtering by `governed_iam_policy.folders`, the supported operators are `=` and `:`. For example, filtering by `governed_iam_policy.folders:"folders/12345678"` will return all the governed IAM policies under "folders/001". */
  filter?: string;
  /** Required. The organization to scope the request. Only organization policies within the scope will be analyzed. The output assets will also be limited to the ones governed by those in-scope organization policies. * organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456") */
  scope: string;
}

export const AnalyzeOrgPolicyGovernedAssetsV1Request = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  constraint: Schema.optional(Schema.String).pipe(T.HttpQuery("constraint")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  scope: Schema.String.pipe(T.HttpPath("scope")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}:analyzeOrgPolicyGovernedAssets" }),
  svc,
) as unknown as Schema.Schema<AnalyzeOrgPolicyGovernedAssetsV1Request>;

export type AnalyzeOrgPolicyGovernedAssetsV1Response = AnalyzeOrgPolicyGovernedAssetsResponse;
export const AnalyzeOrgPolicyGovernedAssetsV1Response = AnalyzeOrgPolicyGovernedAssetsResponse;

export type AnalyzeOrgPolicyGovernedAssetsV1Error = CommonErrors;

export const analyzeOrgPolicyGovernedAssetsV1 = API.makePaginated(() => ({
  input: AnalyzeOrgPolicyGovernedAssetsV1Request,
  output: AnalyzeOrgPolicyGovernedAssetsV1Response,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Batch gets the update history of assets that overlap a time window. For IAM_POLICY content, this API outputs history when the asset and its attached IAM POLICY both exist. This can create gaps in the output history. Otherwise, this API outputs history with asset in both non-delete or deleted status. If a specified asset does not exist, this API returns an INVALID_ARGUMENT error. */
export interface BatchGetAssetsHistoryV1Request {
  /** Start time of the time window (exclusive). */
  "readTimeWindow.startTime"?: string;
  /** Required. The relative name of the root asset. It can only be an organization number (such as "organizations/123"), a project ID (such as "projects/my-project-id")", or a project number (such as "projects/12345"). */
  parent: string;
  /** Optional. A list of relationship types to output, for example: `INSTANCE_TO_INSTANCEGROUP`. This field should only be specified if content_type=RELATIONSHIP. * If specified: it outputs specified relationships' history on the [asset_names]. It returns an error if any of the [relationship_types] doesn't belong to the supported relationship types of the [asset_names] or if any of the [asset_names]'s types doesn't belong to the source types of the [relationship_types]. * Otherwise: it outputs the supported relationships' history on the [asset_names] or returns an error if any of the [asset_names]'s types has no relationship support. See [Introduction to Cloud Asset Inventory](https://cloud.google.com/asset-inventory/docs/overview) for all supported asset types and relationship types. */
  relationshipTypes?: string[];
  /** End time of the time window (inclusive). If not specified, the current timestamp is used instead. */
  "readTimeWindow.endTime"?: string;
  /** A list of the full names of the assets. See: https://cloud.google.com/asset-inventory/docs/resource-name-format Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`. The request becomes a no-op if the asset name list is empty, and the max size of the asset name list is 100 in one request. */
  assetNames?: string[];
  /** Optional. The content type. */
  contentType?: "CONTENT_TYPE_UNSPECIFIED" | "RESOURCE" | "IAM_POLICY" | "ORG_POLICY" | "ACCESS_POLICY" | "OS_INVENTORY" | "RELATIONSHIP" | (string & {});
}

export const BatchGetAssetsHistoryV1Request = Schema.Struct({
  "readTimeWindow.startTime": Schema.optional(Schema.String).pipe(T.HttpQuery("readTimeWindow.startTime")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  relationshipTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("relationshipTypes")),
  "readTimeWindow.endTime": Schema.optional(Schema.String).pipe(T.HttpQuery("readTimeWindow.endTime")),
  assetNames: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("assetNames")),
  contentType: Schema.optional(Schema.String).pipe(T.HttpQuery("contentType")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}:batchGetAssetsHistory" }),
  svc,
) as unknown as Schema.Schema<BatchGetAssetsHistoryV1Request>;

export type BatchGetAssetsHistoryV1Response = BatchGetAssetsHistoryResponse;
export const BatchGetAssetsHistoryV1Response = BatchGetAssetsHistoryResponse;

export type BatchGetAssetsHistoryV1Error = CommonErrors;

export const batchGetAssetsHistoryV1: API.OperationMethod<BatchGetAssetsHistoryV1Request, BatchGetAssetsHistoryV1Response, BatchGetAssetsHistoryV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetAssetsHistoryV1Request,
  output: BatchGetAssetsHistoryV1Response,
  errors: [],
}));

/** Searches all IAM policies within the specified scope, such as a project, folder, or organization. The caller must be granted the `cloudasset.assets.searchAllIamPolicies` permission on the desired scope, otherwise the request will be rejected. */
export interface SearchAllIamPoliciesV1Request {
  /** Optional. A list of asset types that the IAM policies are attached to. If empty, it will search the IAM policies that are attached to all the asset types [supported by search APIs](https://cloud.google.com/asset-inventory/docs/supported-asset-types) Regular expressions are also supported. For example: * "compute.googleapis.com.*" snapshots IAM policies attached to asset type starts with "compute.googleapis.com". * ".*Instance" snapshots IAM policies attached to asset type ends with "Instance". * ".*Instance.*" snapshots IAM policies attached to asset type contains "Instance". See [RE2](https://github.com/google/re2/wiki/Syntax) for all supported regular expression syntax. If the regular expression does not match any supported asset type, an INVALID_ARGUMENT error will be returned. */
  assetTypes?: string[];
  /** Optional. The query statement. See [how to construct a query](https://cloud.google.com/asset-inventory/docs/searching-iam-policies#how_to_construct_a_query) for more information. If not specified or empty, it will search all the IAM policies within the specified `scope`. Note that the query string is compared against each IAM policy binding, including its principals, roles, and IAM conditions. The returned IAM policies will only contain the bindings that match your query. To learn more about the IAM policy structure, see the [IAM policy documentation](https://cloud.google.com/iam/help/allow-policies/structure). Examples: * `policy:amy@gmail.com` to find IAM policy bindings that specify user "amy@gmail.com". * `policy:roles/compute.admin` to find IAM policy bindings that specify the Compute Admin role. * `policy:comp*` to find IAM policy bindings that contain "comp" as a prefix of any word in the binding. * `policy.role.permissions:storage.buckets.update` to find IAM policy bindings that specify a role containing "storage.buckets.update" permission. Note that if callers don't have `iam.roles.get` access to a role's included permissions, policy bindings that specify this role will be dropped from the search results. * `policy.role.permissions:upd*` to find IAM policy bindings that specify a role containing "upd" as a prefix of any word in the role permission. Note that if callers don't have `iam.roles.get` access to a role's included permissions, policy bindings that specify this role will be dropped from the search results. * `resource:organizations/123456` to find IAM policy bindings that are set on "organizations/123456". * `resource=//cloudresourcemanager.googleapis.com/projects/myproject` to find IAM policy bindings that are set on the project named "myproject". * `Important` to find IAM policy bindings that contain "Important" as a word in any of the searchable fields (except for the included permissions). * `resource:(instance1 OR instance2) policy:amy` to find IAM policy bindings that are set on resources "instance1" or "instance2" and also specify user "amy". * `roles:roles/compute.admin` to find IAM policy bindings that specify the Compute Admin role. * `memberTypes:user` to find IAM policy bindings that contain the principal type "user". */
  query?: string;
  /** Required. A scope can be a project, a folder, or an organization. The search is limited to the IAM policies within the `scope`. The caller must be granted the [`cloudasset.assets.searchAllIamPolicies`](https://cloud.google.com/asset-inventory/docs/access-control#required_permissions) permission on the desired scope. The allowed values are: * projects/{PROJECT_ID} (e.g., "projects/foo-bar") * projects/{PROJECT_NUMBER} (e.g., "projects/12345678") * folders/{FOLDER_NUMBER} (e.g., "folders/1234567") * organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456") */
  scope: string;
  /** Optional. A comma-separated list of fields specifying the sorting order of the results. The default order is ascending. Add " DESC" after the field name to indicate descending order. Redundant space characters are ignored. Example: "assetType DESC, resource". Only singular primitive fields in the response are sortable: * resource * assetType * project All the other fields such as repeated fields (e.g., `folders`) and non-primitive fields (e.g., `policy`) are not supported. */
  orderBy?: string;
  /** Optional. The page size for search result pagination. Page size is capped at 500 even if a larger value is given. If set to zero or a negative value, server will pick an appropriate default. Returned results may be fewer than requested. When this happens, there could be more results as long as `next_page_token` is returned. */
  pageSize?: number;
  /** Optional. If present, retrieve the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of all other method parameters must be identical to those in the previous call. */
  pageToken?: string;
}

export const SearchAllIamPoliciesV1Request = Schema.Struct({
  assetTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("assetTypes")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  scope: Schema.String.pipe(T.HttpPath("scope")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}:searchAllIamPolicies" }),
  svc,
) as unknown as Schema.Schema<SearchAllIamPoliciesV1Request>;

export type SearchAllIamPoliciesV1Response = SearchAllIamPoliciesResponse;
export const SearchAllIamPoliciesV1Response = SearchAllIamPoliciesResponse;

export type SearchAllIamPoliciesV1Error = CommonErrors;

export const searchAllIamPoliciesV1 = API.makePaginated(() => ({
  input: SearchAllIamPoliciesV1Request,
  output: SearchAllIamPoliciesV1Response,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Analyzes IAM policies asynchronously to answer which identities have what accesses on which resources, and writes the analysis results to a Google Cloud Storage or a BigQuery destination. For Cloud Storage destination, the output format is the JSON format that represents a AnalyzeIamPolicyResponse. This method implements the google.longrunning.Operation, which allows you to track the operation status. We recommend intervals of at least 2 seconds with exponential backoff retry to poll the operation result. The metadata contains the metadata for the long-running operation. */
export interface AnalyzeIamPolicyLongrunningV1Request {
  /** Required. The relative name of the root asset. Only resources and IAM policies within the scope will be analyzed. This can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"). To know how to get organization ID, visit [here ](https://cloud.google.com/resource-manager/docs/creating-managing-organization#retrieving_your_organization_id). To know how to get folder or project ID, visit [here ](https://cloud.google.com/resource-manager/docs/creating-managing-folders#viewing_or_listing_folders_and_projects). */
  scope: string;
  /** Request body */
  body?: AnalyzeIamPolicyLongrunningRequest;
}

export const AnalyzeIamPolicyLongrunningV1Request = Schema.Struct({
  scope: Schema.String.pipe(T.HttpPath("scope")),
  body: Schema.optional(AnalyzeIamPolicyLongrunningRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/{v1Id}/{v1Id1}:analyzeIamPolicyLongrunning", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AnalyzeIamPolicyLongrunningV1Request>;

export type AnalyzeIamPolicyLongrunningV1Response = Operation;
export const AnalyzeIamPolicyLongrunningV1Response = Operation;

export type AnalyzeIamPolicyLongrunningV1Error = CommonErrors;

export const analyzeIamPolicyLongrunningV1: API.OperationMethod<AnalyzeIamPolicyLongrunningV1Request, AnalyzeIamPolicyLongrunningV1Response, AnalyzeIamPolicyLongrunningV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnalyzeIamPolicyLongrunningV1Request,
  output: AnalyzeIamPolicyLongrunningV1Response,
  errors: [],
}));

/** Analyzes organization policies under a scope. */
export interface AnalyzeOrgPoliciesV1Request {
  /** Required. The name of the constraint to analyze organization policies for. The response only contains analyzed organization policies for the provided constraint. */
  constraint?: string;
  /** The pagination token to retrieve the next page. */
  pageToken?: string;
  /** Required. The organization to scope the request. Only organization policies within the scope will be analyzed. * organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456") */
  scope: string;
  /** The maximum number of items to return per page. If unspecified, AnalyzeOrgPoliciesResponse.org_policy_results will contain 20 items with a maximum of 200. */
  pageSize?: number;
  /** The expression to filter AnalyzeOrgPoliciesResponse.org_policy_results. Filtering is currently available for bare literal values and the following fields: * consolidated_policy.attached_resource * consolidated_policy.rules.enforce When filtering by a specific field, the only supported operator is `=`. For example, filtering by consolidated_policy.attached_resource="//cloudresourcemanager.googleapis.com/folders/001" will return all the Organization Policy results attached to "folders/001". */
  filter?: string;
}

export const AnalyzeOrgPoliciesV1Request = Schema.Struct({
  constraint: Schema.optional(Schema.String).pipe(T.HttpQuery("constraint")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  scope: Schema.String.pipe(T.HttpPath("scope")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}:analyzeOrgPolicies" }),
  svc,
) as unknown as Schema.Schema<AnalyzeOrgPoliciesV1Request>;

export type AnalyzeOrgPoliciesV1Response = AnalyzeOrgPoliciesResponse;
export const AnalyzeOrgPoliciesV1Response = AnalyzeOrgPoliciesResponse;

export type AnalyzeOrgPoliciesV1Error = CommonErrors;

export const analyzeOrgPoliciesV1 = API.makePaginated(() => ({
  input: AnalyzeOrgPoliciesV1Request,
  output: AnalyzeOrgPoliciesV1Response,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Analyze moving a resource to a specified destination without kicking off the actual move. The analysis is best effort depending on the user's permissions of viewing different hierarchical policies and configurations. The policies and configuration are subject to change before the actual resource migration takes place. */
export interface AnalyzeMoveV1Request {
  /** Required. Name of the Google Cloud folder or organization to reparent the target resource. The analysis will be performed against hypothetically moving the resource to this specified destination parent. This can only be a folder number (such as "folders/123") or an organization number (such as "organizations/123"). */
  destinationParent?: string;
  /** Analysis view indicating what information should be included in the analysis response. If unspecified, the default view is FULL. */
  view?: "ANALYSIS_VIEW_UNSPECIFIED" | "FULL" | "BASIC" | (string & {});
  /** Required. Name of the resource to perform the analysis against. Only Google Cloud projects are supported as of today. Hence, this can only be a project ID (such as "projects/my-project-id") or a project number (such as "projects/12345"). */
  resource: string;
}

export const AnalyzeMoveV1Request = Schema.Struct({
  destinationParent: Schema.optional(Schema.String).pipe(T.HttpQuery("destinationParent")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}:analyzeMove" }),
  svc,
) as unknown as Schema.Schema<AnalyzeMoveV1Request>;

export type AnalyzeMoveV1Response = AnalyzeMoveResponse;
export const AnalyzeMoveV1Response = AnalyzeMoveResponse;

export type AnalyzeMoveV1Error = CommonErrors;

export const analyzeMoveV1: API.OperationMethod<AnalyzeMoveV1Request, AnalyzeMoveV1Response, AnalyzeMoveV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnalyzeMoveV1Request,
  output: AnalyzeMoveV1Response,
  errors: [],
}));

/** Exports assets with time and resource types to a given Cloud Storage location/BigQuery table. For Cloud Storage location destinations, the output format is newline-delimited JSON. Each line represents a google.cloud.asset.v1.Asset in the JSON format; for BigQuery table destinations, the output table stores the fields in asset Protobuf as columns. This API implements the google.longrunning.Operation API, which allows you to keep track of the export. We recommend intervals of at least 2 seconds with exponential retry to poll the export operation result. For regular-size resource parent, the export operation usually finishes within 5 minutes. */
export interface ExportAssetsV1Request {
  /** Required. The relative name of the root asset. This can only be an organization number (such as "organizations/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"), or a folder number (such as "folders/123"). */
  parent: string;
  /** Request body */
  body?: ExportAssetsRequest;
}

export const ExportAssetsV1Request = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ExportAssetsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/{v1Id}/{v1Id1}:exportAssets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportAssetsV1Request>;

export type ExportAssetsV1Response = Operation;
export const ExportAssetsV1Response = Operation;

export type ExportAssetsV1Error = CommonErrors;

export const exportAssetsV1: API.OperationMethod<ExportAssetsV1Request, ExportAssetsV1Response, ExportAssetsV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportAssetsV1Request,
  output: ExportAssetsV1Response,
  errors: [],
}));

/** Lists assets with time and resource types and returns paged results in response. */
export interface ListAssetsRequest {
  /** Required. Name of the organization, folder, or project the assets belong to. Format: "organizations/[organization-number]" (such as "organizations/123"), "projects/[project-id]" (such as "projects/my-project-id"), "projects/[project-number]" (such as "projects/12345"), or "folders/[folder-number]" (such as "folders/12345"). */
  parent: string;
  /** Asset content type. If not specified, no content but the asset name will be returned. */
  contentType?: "CONTENT_TYPE_UNSPECIFIED" | "RESOURCE" | "IAM_POLICY" | "ORG_POLICY" | "ACCESS_POLICY" | "OS_INVENTORY" | "RELATIONSHIP" | (string & {});
  /** Timestamp to take an asset snapshot. This can only be set to a timestamp between the current time and the current time minus 35 days (inclusive). If not specified, the current time will be used. Due to delays in resource data collection and indexing, there is a volatile window during which running the same query may get different results. */
  readTime?: string;
  /** A list of relationship types to output, for example: `INSTANCE_TO_INSTANCEGROUP`. This field should only be specified if content_type=RELATIONSHIP. * If specified: it snapshots specified relationships. It returns an error if any of the [relationship_types] doesn't belong to the supported relationship types of the [asset_types] or if any of the [asset_types] doesn't belong to the source types of the [relationship_types]. * Otherwise: it snapshots the supported relationships for all [asset_types] or returns an error if any of the [asset_types] has no relationship support. An unspecified asset types field means all supported asset_types. See [Introduction to Cloud Asset Inventory](https://cloud.google.com/asset-inventory/docs/overview) for all supported asset types and relationship types. */
  relationshipTypes?: string[];
  /** The `next_page_token` returned from the previous `ListAssetsResponse`, or unspecified for the first `ListAssetsRequest`. It is a continuation of a prior `ListAssets` call, and the API should return the next page of assets. */
  pageToken?: string;
  /** The maximum number of assets to be returned in a single response. Default is 100, minimum is 1, and maximum is 1000. */
  pageSize?: number;
  /** A list of asset types to take a snapshot for. For example: "compute.googleapis.com/Disk". Regular expression is also supported. For example: * "compute.googleapis.com.*" snapshots resources whose asset type starts with "compute.googleapis.com". * ".*Instance" snapshots resources whose asset type ends with "Instance". * ".*Instance.*" snapshots resources whose asset type contains "Instance". See [RE2](https://github.com/google/re2/wiki/Syntax) for all supported regular expression syntax. If the regular expression does not match any supported asset type, an INVALID_ARGUMENT error will be returned. If specified, only matching assets will be returned, otherwise, it will snapshot all asset types. See [Introduction to Cloud Asset Inventory](https://cloud.google.com/asset-inventory/docs/overview) for all supported asset types. */
  assetTypes?: string[];
}

export const ListAssetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  contentType: Schema.optional(Schema.String).pipe(T.HttpQuery("contentType")),
  readTime: Schema.optional(Schema.String).pipe(T.HttpQuery("readTime")),
  relationshipTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("relationshipTypes")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  assetTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("assetTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}/assets" }),
  svc,
) as unknown as Schema.Schema<ListAssetsRequest>;

export type ListAssetsResponse_Op = ListAssetsResponse;
export const ListAssetsResponse_Op = ListAssetsResponse;

export type ListAssetsError = CommonErrors;

export const listAssets = API.makePaginated(() => ({
  input: ListAssetsRequest,
  output: ListAssetsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details about an asset feed. */
export interface GetFeedsRequest {
  /** Required. The name of the Feed and it must be in the format of: projects/project_number/feeds/feed_id folders/folder_number/feeds/feed_id organizations/organization_number/feeds/feed_id */
  name: string;
}

export const GetFeedsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}/feeds/{feedsId}" }),
  svc,
) as unknown as Schema.Schema<GetFeedsRequest>;

export type GetFeedsResponse = Feed;
export const GetFeedsResponse = Feed;

export type GetFeedsError = CommonErrors;

export const getFeeds: API.OperationMethod<GetFeedsRequest, GetFeedsResponse, GetFeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFeedsRequest,
  output: GetFeedsResponse,
  errors: [],
}));

/** Updates an asset feed configuration. */
export interface PatchFeedsRequest {
  /** Required. The format will be projects/{project_number}/feeds/{client-assigned_feed_identifier} or folders/{folder_number}/feeds/{client-assigned_feed_identifier} or organizations/{organization_number}/feeds/{client-assigned_feed_identifier} The client-assigned feed identifier must be unique within the parent project/folder/organization. */
  name: string;
  /** Request body */
  body?: UpdateFeedRequest;
}

export const PatchFeedsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateFeedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/{v1Id}/{v1Id1}/feeds/{feedsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFeedsRequest>;

export type PatchFeedsResponse = Feed;
export const PatchFeedsResponse = Feed;

export type PatchFeedsError = CommonErrors;

export const patchFeeds: API.OperationMethod<PatchFeedsRequest, PatchFeedsResponse, PatchFeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFeedsRequest,
  output: PatchFeedsResponse,
  errors: [],
}));

/** Deletes an asset feed. */
export interface DeleteFeedsRequest {
  /** Required. The name of the feed and it must be in the format of: projects/project_number/feeds/feed_id folders/folder_number/feeds/feed_id organizations/organization_number/feeds/feed_id */
  name: string;
}

export const DeleteFeedsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/{v1Id}/{v1Id1}/feeds/{feedsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFeedsRequest>;

export type DeleteFeedsResponse = Empty;
export const DeleteFeedsResponse = Empty;

export type DeleteFeedsError = CommonErrors;

export const deleteFeeds: API.OperationMethod<DeleteFeedsRequest, DeleteFeedsResponse, DeleteFeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFeedsRequest,
  output: DeleteFeedsResponse,
  errors: [],
}));

/** Creates a feed in a parent project/folder/organization to listen to its asset updates. */
export interface CreateFeedsRequest {
  /** Required. The name of the project/folder/organization where this feed should be created in. It can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"). */
  parent: string;
  /** Request body */
  body?: CreateFeedRequest;
}

export const CreateFeedsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateFeedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/{v1Id}/{v1Id1}/feeds", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFeedsRequest>;

export type CreateFeedsResponse = Feed;
export const CreateFeedsResponse = Feed;

export type CreateFeedsError = CommonErrors;

export const createFeeds: API.OperationMethod<CreateFeedsRequest, CreateFeedsResponse, CreateFeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFeedsRequest,
  output: CreateFeedsResponse,
  errors: [],
}));

/** Lists all asset feeds in a parent project/folder/organization. */
export interface ListFeedsRequest {
  /** Required. The parent project/folder/organization whose feeds are to be listed. It can only be using project/folder/organization number (such as "folders/12345")", or a project ID (such as "projects/my-project-id"). */
  parent: string;
}

export const ListFeedsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}/feeds" }),
  svc,
) as unknown as Schema.Schema<ListFeedsRequest>;

export type ListFeedsResponse_Op = ListFeedsResponse;
export const ListFeedsResponse_Op = ListFeedsResponse;

export type ListFeedsError = CommonErrors;

export const listFeeds: API.OperationMethod<ListFeedsRequest, ListFeedsResponse_Op, ListFeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListFeedsRequest,
  output: ListFeedsResponse_Op,
  errors: [],
}));

/** Gets effective IAM policies for a batch of resources. */
export interface BatchGetEffectiveIamPoliciesRequest {
  /** Required. The names refer to the [full_resource_names] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of the asset types [supported by search APIs](https://cloud.google.com/asset-inventory/docs/supported-asset-types). A maximum of 20 resources' effective policies can be retrieved in a batch. */
  names?: string[];
  /** Required. Only IAM policies on or below the scope will be returned. This can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"). To know how to get organization ID, visit [here ](https://cloud.google.com/resource-manager/docs/creating-managing-organization#retrieving_your_organization_id). To know how to get folder or project ID, visit [here ](https://cloud.google.com/resource-manager/docs/creating-managing-folders#viewing_or_listing_folders_and_projects). */
  scope: string;
}

export const BatchGetEffectiveIamPoliciesRequest = Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("names")),
  scope: Schema.String.pipe(T.HttpPath("scope")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}/effectiveIamPolicies:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetEffectiveIamPoliciesRequest>;

export type BatchGetEffectiveIamPoliciesResponse_Op = BatchGetEffectiveIamPoliciesResponse;
export const BatchGetEffectiveIamPoliciesResponse_Op = BatchGetEffectiveIamPoliciesResponse;

export type BatchGetEffectiveIamPoliciesError = CommonErrors;

export const batchGetEffectiveIamPolicies: API.OperationMethod<BatchGetEffectiveIamPoliciesRequest, BatchGetEffectiveIamPoliciesResponse_Op, BatchGetEffectiveIamPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetEffectiveIamPoliciesRequest,
  output: BatchGetEffectiveIamPoliciesResponse_Op,
  errors: [],
}));

