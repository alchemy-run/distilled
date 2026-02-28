// ==========================================================================
// Cloud Identity-Aware Proxy API (iap v1)
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
  name: "iap",
  version: "v1",
  rootUrl: "https://iap.googleapis.com/",
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

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> = Schema.suspend(() => Schema.Struct({
  requestedPolicyVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GetPolicyOptions" }) as any as Schema.Schema<GetPolicyOptions>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(GetPolicyOptions),
})).annotate({ identifier: "GetIamPolicyRequest" }) as any as Schema.Schema<GetIamPolicyRequest>;

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

export interface GcipSettings {
  /** Optional. GCIP tenant IDs that are linked to the IAP resource. `tenant_ids` could be a string beginning with a number character to indicate authenticating with GCIP tenant flow, or in the format of `_` to indicate authenticating with GCIP agent flow. If agent flow is used, `tenant_ids` should only contain one single element, while for tenant flow, `tenant_ids` can contain multiple elements. */
  tenantIds?: Array<string>;
  /** Login page URI associated with the GCIP tenants. Typically, all resources within the same project share the same login page, though it could be overridden at the sub resource level. */
  loginPageUri?: string;
}

export const GcipSettings: Schema.Schema<GcipSettings> = Schema.suspend(() => Schema.Struct({
  tenantIds: Schema.optional(Schema.Array(Schema.String)),
  loginPageUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GcipSettings" }) as any as Schema.Schema<GcipSettings>;

export interface CorsSettings {
  /** Configuration to allow HTTP `OPTIONS` calls to skip authentication and authorization. If undefined, IAP will not apply any special logic to `OPTIONS` requests. */
  allowHttpOptions?: boolean;
}

export const CorsSettings: Schema.Schema<CorsSettings> = Schema.suspend(() => Schema.Struct({
  allowHttpOptions: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CorsSettings" }) as any as Schema.Schema<CorsSettings>;

export interface OAuthSettings {
  /** Domain hint to send as hd=? parameter in OAuth request flow. Enables redirect to primary IDP by skipping Google's login screen. https://developers.google.com/identity/protocols/OpenIDConnect#hd-param Note: IAP does not verify that the id token's hd claim matches this value since access behavior is managed by IAM policies. */
  loginHint?: string;
  /** Optional. OAuth 2.0 client ID used in the OAuth flow to generate an access token. If this field is set, you can skip obtaining the OAuth credentials in this step: https://developers.google.com/identity/protocols/OAuth2?hl=en_US#1.-obtain-oauth-2.0-credentials-from-the-google-api-console. However, this could allow for client sharing. The risks of client sharing are outlined here: https://cloud.google.com/iap/docs/sharing-oauth-clients#risks. */
  clientId?: string;
  /** Optional. Input only. OAuth secret paired with client ID */
  clientSecret?: string;
  /** Output only. OAuth secret sha256 paired with client ID */
  clientSecretSha256?: string;
  /** Optional. List of client ids allowed to use IAP programmatically. */
  programmaticClients?: Array<string>;
}

export const OAuthSettings: Schema.Schema<OAuthSettings> = Schema.suspend(() => Schema.Struct({
  loginHint: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  clientSecret: Schema.optional(Schema.String),
  clientSecretSha256: Schema.optional(Schema.String),
  programmaticClients: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "OAuthSettings" }) as any as Schema.Schema<OAuthSettings>;

export interface TagsFullState {
  /** If TagsFullState is initialized, the values in this field fully represent all the tags in the next state (the current tag values are not used). If tags.size() == 0, the next state of tags would be no tags for evaluation purposes. Only one type of tags reference (numeric or namespace) is required to be passed. */
  tags?: Record<string, string>;
}

export const TagsFullState: Schema.Schema<TagsFullState> = Schema.suspend(() => Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "TagsFullState" }) as any as Schema.Schema<TagsFullState>;

export interface TagsPartialState {
  /** Tags that’ll be updated or added to the current state of tags for evaluation purposes. If a key exists in both "tags_to_upsert" and "tag_keys_to_remove", the one in "tag_keys_to_remove" is ignored. Only one type of tags reference (numeric or namespace) is required to be passed. */
  tagsToUpsert?: Record<string, string>;
  /** Keys of the tags that should be removed for evaluation purposes. IMPORTANT: Currently only numeric references are supported. Once support for namespace references is added, both the tag references (numeric and namespace) will be removed. */
  tagKeysToRemove?: Array<string>;
}

export const TagsPartialState: Schema.Schema<TagsPartialState> = Schema.suspend(() => Schema.Struct({
  tagsToUpsert: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  tagKeysToRemove: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TagsPartialState" }) as any as Schema.Schema<TagsPartialState>;

export interface TagsFullStateForChildResource {
  /** If TagsFullStateForChildResource is initialized, the values in this field represent all the tags in the next state for the child resource. Only one type of tags reference (numeric or namespace) is required to be passed. IMPORTANT: This field should only be used when the target resource IAM policy name is UNKNOWN and the resource's parent IAM policy name is being passed in the request. */
  tags?: Record<string, string>;
}

export const TagsFullStateForChildResource: Schema.Schema<TagsFullStateForChildResource> = Schema.suspend(() => Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "TagsFullStateForChildResource" }) as any as Schema.Schema<TagsFullStateForChildResource>;

export interface NextStateOfTags {
  tagsFullState?: TagsFullState;
  tagsPartialState?: TagsPartialState;
  tagsFullStateForChildResource?: TagsFullStateForChildResource;
}

export const NextStateOfTags: Schema.Schema<NextStateOfTags> = Schema.suspend(() => Schema.Struct({
  tagsFullState: Schema.optional(TagsFullState),
  tagsPartialState: Schema.optional(TagsPartialState),
  tagsFullStateForChildResource: Schema.optional(TagsFullStateForChildResource),
})).annotate({ identifier: "NextStateOfTags" }) as any as Schema.Schema<NextStateOfTags>;

export interface Resource {
  /** The **relative** name of the resource, which is the URI path of the resource without the leading "/". See https://cloud.google.com/iam/docs/conditions-resource-attributes#resource-name for examples used by other GCP Services. This field is **required** for services integrated with resource-attribute-based IAM conditions and/or CustomOrgPolicy. This field requires special handling for parents-only permissions such as `create` and `list`. See the document linked below for further details. See go/iam-conditions-sig-g3#populate-resource-attributes for specific details on populating this field. */
  name?: string;
  /** The public resource type name of the resource. It is configured using the official_name of the ResourceType as defined in service configurations under //configs/cloud/resourcetypes. For example, the official_name for GCP projects is set as 'cloudresourcemanager.googleapis.com/Project' according to //configs/cloud/resourcetypes/google/cloud/resourcemanager/prod.yaml This field is **required** for services integrated with resource-attribute-based IAM conditions and/or CustomOrgPolicy. This field requires special handling for parents-only permissions such as `create` and `list`. See the document linked below for further details. See go/iam-conditions-sig-g3#populate-resource-attributes for specific details on populating this field. */
  type?: string;
  /** The name of the service this resource belongs to. It is configured using the official_service_name of the Service as defined in service configurations under //configs/cloud/resourcetypes. For example, the official_service_name of cloud resource manager service is set as 'cloudresourcemanager.googleapis.com' according to //configs/cloud/resourcetypes/google/cloud/resourcemanager/prod.yaml This field is **required** for services integrated with resource-attribute-based IAM conditions and/or CustomOrgPolicy. This field requires special handling for parents-only permissions such as `create` and `list`. See the document linked below for further details. See go/iam-conditions-sig-g3#populate-resource-attributes for specific details on populating this field. */
  service?: string;
  /** The service defined labels of the resource on which the conditions will be evaluated. The semantics - including the key names - are vague to IAM. If the effective condition has a reference to a `resource.labels[foo]` construct, IAM consults with this map to retrieve the values associated with `foo` key for Conditions evaluation. If the provided key is not found in the labels map, the condition would evaluate to false. This field is in limited use. If your intended use case is not expected to express resource.labels attribute in IAM Conditions, leave this field empty. Before planning on using this attribute please: * Read go/iam-conditions-labels-comm and ensure your service can meet the data availability and management requirements. * Talk to iam-conditions-eng@ about your use case. */
  labels?: Record<string, string>;
  /** The proto or JSON formatted expected next state of the resource, wrapped in a google.protobuf.Any proto, against which the policy rules are evaluated. Services not integrated with custom org policy can omit this field. Services integrated with custom org policy must populate this field for all requests where the API call changes the state of the resource. Custom org policy backend uses these attributes to enforce custom org policies. For create operations, GCP service is expected to pass resource from customer request as is. For update/patch operations, GCP service is expected to compute the next state with the patch provided by the user. See go/federated-custom-org-policy-integration-guide for additional details. */
  expectedNextState?: Record<string, unknown>;
  /** Used for calculating the next state of tags on the resource being passed for Custom Org Policy enforcement. NOTE: Only one of the tags representations (i.e. numeric or namespaced) should be populated. The input tags will be converted to the same representation before the calculation. This behavior intentionally may differ from other tags related fields in CheckPolicy request, which may require both formats to be passed in. IMPORTANT: If tags are unchanged, this field should not be set. */
  nextStateOfTags?: NextStateOfTags;
  /** The locations of the resource. This field is used to determine whether the request is compliant with Trust Boundaries. Usage: - Must not be empty for services in-scope for Trust Boundaries. Once Trust Boundaries is GA, empty values will cause the request to be rejected if customers enforce Trust Boundaries on the parent CRM nodes. - For global resources: use a single value of "global". - For regional/multi-regional resources: use name of the GCP region(s) where the resource exists (e.g., ["us-east1", "us-west1"]). For multi-regional resources specify the name of each GCP region in the resource's multi-region. NOTE: Only GCP cloud region names are supported - go/cloud-region-names. */
  locations?: Array<string>;
}

export const Resource: Schema.Schema<Resource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  expectedNextState: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  nextStateOfTags: Schema.optional(NextStateOfTags),
  locations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Resource" }) as any as Schema.Schema<Resource>;

export interface PolicyName {
  /** Resource type. Types are defined in IAM's .service files. Valid values for type might be 'storage_buckets', 'compute_instances', 'resourcemanager_customers', 'billing_accounts', etc. */
  type?: string;
  /** Identifies an instance of the type. ID format varies by type. The ID format is defined in the IAM .service file that defines the type, either in path_mapping or in a comment. */
  id?: string;
  /** For Cloud IAM: The location of the Policy. Must be empty or "global" for Policies owned by global IAM. Must name a region from prodspec/cloud-iam-cloudspec for Regional IAM Policies, see go/iam-faq#where-is-iam-currently-deployed. For Local IAM: This field should be set to "local". */
  region?: string;
}

export const PolicyName: Schema.Schema<PolicyName> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyName" }) as any as Schema.Schema<PolicyName>;

export interface PolicyDelegationSettings {
  /** The DNS name of the service (e.g. "resourcemanager.googleapis.com"). This should be the domain name part of the full resource names (see https://aip.dev/122#full-resource-names), which is usually the same as IamServiceSpec.service of the service where the resource type is defined. */
  iamServiceName?: string;
  /** Permission to check in IAM. */
  iamPermission?: string;
  /** IAM resource to check permission on */
  resource?: Resource;
  /** Policy name to be checked */
  policyName?: PolicyName;
}

export const PolicyDelegationSettings: Schema.Schema<PolicyDelegationSettings> = Schema.suspend(() => Schema.Struct({
  iamServiceName: Schema.optional(Schema.String),
  iamPermission: Schema.optional(Schema.String),
  resource: Schema.optional(Resource),
  policyName: Schema.optional(PolicyName),
})).annotate({ identifier: "PolicyDelegationSettings" }) as any as Schema.Schema<PolicyDelegationSettings>;

export interface ReauthSettings {
  /** Optional. Reauth method requested. */
  method?: "METHOD_UNSPECIFIED" | "LOGIN" | "PASSWORD" | "SECURE_KEY" | "ENROLLED_SECOND_FACTORS" | (string & {});
  /** Optional. Reauth session lifetime, how long before a user has to reauthenticate again. */
  maxAge?: string;
  /** Optional. How IAP determines the effective policy in cases of hierarchical policies. Policies are merged from higher in the hierarchy to lower in the hierarchy. */
  policyType?: "POLICY_TYPE_UNSPECIFIED" | "MINIMUM" | "DEFAULT" | (string & {});
}

export const ReauthSettings: Schema.Schema<ReauthSettings> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.String),
  maxAge: Schema.optional(Schema.String),
  policyType: Schema.optional(Schema.String),
})).annotate({ identifier: "ReauthSettings" }) as any as Schema.Schema<ReauthSettings>;

export interface AllowedDomainsSettings {
  /** Optional. Configuration for customers to opt in for the feature. */
  enable?: boolean;
  /** Optional. List of trusted domains. */
  domains?: Array<string>;
}

export const AllowedDomainsSettings: Schema.Schema<AllowedDomainsSettings> = Schema.suspend(() => Schema.Struct({
  enable: Schema.optional(Schema.Boolean),
  domains: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AllowedDomainsSettings" }) as any as Schema.Schema<AllowedDomainsSettings>;

export interface OAuth2 {
  /** The OAuth 2.0 client ID registered in the workforce identity federation OAuth 2.0 Server. */
  clientId?: string;
  /** Input only. The OAuth 2.0 client secret created while registering the client ID. */
  clientSecret?: string;
  /** Output only. SHA256 hash value for the client secret. This field is returned by IAP when the settings are retrieved. */
  clientSecretSha256?: string;
}

export const OAuth2: Schema.Schema<OAuth2> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  clientSecret: Schema.optional(Schema.String),
  clientSecretSha256: Schema.optional(Schema.String),
})).annotate({ identifier: "OAuth2" }) as any as Schema.Schema<OAuth2>;

export interface WorkforceIdentitySettings {
  /** The workforce pool resources. Only one workforce pool is accepted. */
  workforcePools?: Array<string>;
  /** OAuth 2.0 settings for IAP to perform OIDC flow with workforce identity federation services. */
  oauth2?: OAuth2;
}

export const WorkforceIdentitySettings: Schema.Schema<WorkforceIdentitySettings> = Schema.suspend(() => Schema.Struct({
  workforcePools: Schema.optional(Schema.Array(Schema.String)),
  oauth2: Schema.optional(OAuth2),
})).annotate({ identifier: "WorkforceIdentitySettings" }) as any as Schema.Schema<WorkforceIdentitySettings>;

export interface AccessSettings {
  /** Optional. GCIP claims and endpoint configurations for 3p identity providers. */
  gcipSettings?: GcipSettings;
  /** Optional. Configuration to allow cross-origin requests via IAP. */
  corsSettings?: CorsSettings;
  /** Optional. Settings to configure IAP's OAuth behavior. */
  oauthSettings?: OAuthSettings;
  /** Optional. Settings to allow google-internal teams to use IAP for apps hosted in a tenant project. */
  policyDelegationSettings?: PolicyDelegationSettings;
  /** Optional. Settings to configure reauthentication policies in IAP. */
  reauthSettings?: ReauthSettings;
  /** Optional. Settings to configure and enable allowed domains. */
  allowedDomainsSettings?: AllowedDomainsSettings;
  /** Optional. Settings to configure the workforce identity federation, including workforce pools and OAuth 2.0 settings. */
  workforceIdentitySettings?: WorkforceIdentitySettings;
  /** Optional. Identity sources that IAP can use to authenticate the end user. Only one identity source can be configured. */
  identitySources?: Array<"IDENTITY_SOURCE_UNSPECIFIED" | "WORKFORCE_IDENTITY_FEDERATION" | (string & {})>;
}

export const AccessSettings: Schema.Schema<AccessSettings> = Schema.suspend(() => Schema.Struct({
  gcipSettings: Schema.optional(GcipSettings),
  corsSettings: Schema.optional(CorsSettings),
  oauthSettings: Schema.optional(OAuthSettings),
  policyDelegationSettings: Schema.optional(PolicyDelegationSettings),
  reauthSettings: Schema.optional(ReauthSettings),
  allowedDomainsSettings: Schema.optional(AllowedDomainsSettings),
  workforceIdentitySettings: Schema.optional(WorkforceIdentitySettings),
  identitySources: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AccessSettings" }) as any as Schema.Schema<AccessSettings>;

export interface CsmSettings {
  /** Audience claim set in the generated RCToken. This value is not validated by IAP. */
  rctokenAud?: string;
}

export const CsmSettings: Schema.Schema<CsmSettings> = Schema.suspend(() => Schema.Struct({
  rctokenAud: Schema.optional(Schema.String),
})).annotate({ identifier: "CsmSettings" }) as any as Schema.Schema<CsmSettings>;

export interface AccessDeniedPageSettings {
  /** The URI to be redirected to when access is denied. */
  accessDeniedPageUri?: string;
  /** Whether to generate a troubleshooting URL on access denied events to this application. */
  generateTroubleshootingUri?: boolean;
  /** Whether to generate remediation token on access denied events to this application. */
  remediationTokenGenerationEnabled?: boolean;
}

export const AccessDeniedPageSettings: Schema.Schema<AccessDeniedPageSettings> = Schema.suspend(() => Schema.Struct({
  accessDeniedPageUri: Schema.optional(Schema.String),
  generateTroubleshootingUri: Schema.optional(Schema.Boolean),
  remediationTokenGenerationEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AccessDeniedPageSettings" }) as any as Schema.Schema<AccessDeniedPageSettings>;

export interface AttributePropagationSettings {
  /** Optional. Raw string CEL expression. Must return a list of attributes. A maximum of 45 attributes can be selected. Expressions can select different attribute types from `attributes`: `attributes.saml_attributes`, `attributes.iap_attributes`. The following functions are supported: - filter `.filter(, )`: Returns a subset of `` where `` is true for every item. - in ` in `: Returns true if `` contains ``. - selectByName `.selectByName()`: Returns the attribute in `` with the given `` name, otherwise returns empty. - emitAs `.emitAs()`: Sets the `` name field to the given `` for propagation in selected output credentials. - strict `.strict()`: Ignores the `x-goog-iap-attr-` prefix for the provided `` when propagating with the `HEADER` output credential, such as request headers. - append `.append()` OR `.append()`: Appends the provided `` or `` to the end of ``. Example expression: `attributes.saml_attributes.filter(x, x.name in ['test']).append(attributes.iap_attributes.selectByName('exact').emitAs('custom').strict())` */
  expression?: string;
  /** Optional. Which output credentials attributes selected by the CEL expression should be propagated in. All attributes will be fully duplicated in each selected output credential. */
  outputCredentials?: Array<"OUTPUT_CREDENTIALS_UNSPECIFIED" | "HEADER" | "JWT" | "RCTOKEN" | (string & {})>;
  /** Optional. Whether the provided attribute propagation settings should be evaluated on user requests. If set to true, attributes returned from the expression will be propagated in the set output credentials. */
  enable?: boolean;
}

export const AttributePropagationSettings: Schema.Schema<AttributePropagationSettings> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  outputCredentials: Schema.optional(Schema.Array(Schema.String)),
  enable: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AttributePropagationSettings" }) as any as Schema.Schema<AttributePropagationSettings>;

export interface ApplicationSettings {
  /** Optional. Settings to configure IAP's behavior for a service mesh. */
  csmSettings?: CsmSettings;
  /** Optional. Customization for Access Denied page. */
  accessDeniedPageSettings?: AccessDeniedPageSettings;
  /** The Domain value to set for cookies generated by IAP. This value is not validated by the API, but will be ignored at runtime if invalid. */
  cookieDomain?: string;
  /** Optional. Settings to configure attribute propagation. */
  attributePropagationSettings?: AttributePropagationSettings;
}

export const ApplicationSettings: Schema.Schema<ApplicationSettings> = Schema.suspend(() => Schema.Struct({
  csmSettings: Schema.optional(CsmSettings),
  accessDeniedPageSettings: Schema.optional(AccessDeniedPageSettings),
  cookieDomain: Schema.optional(Schema.String),
  attributePropagationSettings: Schema.optional(AttributePropagationSettings),
})).annotate({ identifier: "ApplicationSettings" }) as any as Schema.Schema<ApplicationSettings>;

export interface IapSettings {
  /** Required. The resource name of the IAP protected resource. */
  name?: string;
  /** Optional. Top level wrapper for all access related setting in IAP */
  accessSettings?: AccessSettings;
  /** Optional. Top level wrapper for all application related settings in IAP */
  applicationSettings?: ApplicationSettings;
}

export const IapSettings: Schema.Schema<IapSettings> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  accessSettings: Schema.optional(AccessSettings),
  applicationSettings: Schema.optional(ApplicationSettings),
})).annotate({ identifier: "IapSettings" }) as any as Schema.Schema<IapSettings>;

export interface ValidateIapAttributeExpressionResponse {
}

export const ValidateIapAttributeExpressionResponse: Schema.Schema<ValidateIapAttributeExpressionResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ValidateIapAttributeExpressionResponse" }) as any as Schema.Schema<ValidateIapAttributeExpressionResponse>;

export interface TunnelDestGroup {
  /** Identifier. Identifier for the TunnelDestGroup. Must be unique within the project and contain only lower case letters (a-z) and dashes (-). */
  name?: string;
  /** Optional. Unordered list. List of CIDRs that this group applies to. */
  cidrs?: Array<string>;
  /** Optional. Unordered list. List of FQDNs that this group applies to. */
  fqdns?: Array<string>;
}

export const TunnelDestGroup: Schema.Schema<TunnelDestGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  cidrs: Schema.optional(Schema.Array(Schema.String)),
  fqdns: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TunnelDestGroup" }) as any as Schema.Schema<TunnelDestGroup>;

export interface ListTunnelDestGroupsResponse {
  /** TunnelDestGroup existing in the project. */
  tunnelDestGroups?: Array<TunnelDestGroup>;
  /** A token that you can send as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListTunnelDestGroupsResponse: Schema.Schema<ListTunnelDestGroupsResponse> = Schema.suspend(() => Schema.Struct({
  tunnelDestGroups: Schema.optional(Schema.Array(TunnelDestGroup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTunnelDestGroupsResponse" }) as any as Schema.Schema<ListTunnelDestGroupsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface Brand {
  /** Output only. Identifier of the brand. NOTE: GCP project number achieves the same brand identification purpose as only one brand per project can be created. */
  name?: string;
  /** Support email displayed on the OAuth consent screen. */
  supportEmail?: string;
  /** Application name displayed on OAuth consent screen. */
  applicationTitle?: string;
  /** Output only. Whether the brand is only intended for usage inside the G Suite organization only. */
  orgInternalOnly?: boolean;
}

export const Brand: Schema.Schema<Brand> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  supportEmail: Schema.optional(Schema.String),
  applicationTitle: Schema.optional(Schema.String),
  orgInternalOnly: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Brand" }) as any as Schema.Schema<Brand>;

export interface ListBrandsResponse {
  /** Brands existing in the project. */
  brands?: Array<Brand>;
}

export const ListBrandsResponse: Schema.Schema<ListBrandsResponse> = Schema.suspend(() => Schema.Struct({
  brands: Schema.optional(Schema.Array(Brand)),
})).annotate({ identifier: "ListBrandsResponse" }) as any as Schema.Schema<ListBrandsResponse>;

export interface IdentityAwareProxyClient {
  /** Output only. Unique identifier of the OAuth client. */
  name?: string;
  /** Output only. Client secret of the OAuth client. */
  secret?: string;
  /** Human-friendly name given to the OAuth client. */
  displayName?: string;
}

export const IdentityAwareProxyClient: Schema.Schema<IdentityAwareProxyClient> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  secret: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentityAwareProxyClient" }) as any as Schema.Schema<IdentityAwareProxyClient>;

export interface ListIdentityAwareProxyClientsResponse {
  /** Clients existing in the brand. */
  identityAwareProxyClients?: Array<IdentityAwareProxyClient>;
  /** A token, which can be send as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListIdentityAwareProxyClientsResponse: Schema.Schema<ListIdentityAwareProxyClientsResponse> = Schema.suspend(() => Schema.Struct({
  identityAwareProxyClients: Schema.optional(Schema.Array(IdentityAwareProxyClient)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListIdentityAwareProxyClientsResponse" }) as any as Schema.Schema<ListIdentityAwareProxyClientsResponse>;

export interface ResetIdentityAwareProxyClientSecretRequest {
}

export const ResetIdentityAwareProxyClientSecretRequest: Schema.Schema<ResetIdentityAwareProxyClientSecretRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResetIdentityAwareProxyClientSecretRequest" }) as any as Schema.Schema<ResetIdentityAwareProxyClientSecretRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Sets the access control policy for an Identity-Aware Proxy protected resource. Replaces any existing policy. More information about managing access via IAP can be found at: https://cloud.google.com/iap/docs/managing-access#managing_access_via_the_api */
export interface SetIamPolicyV1Request {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyV1Request = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/{v1Id}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyV1Request>;

export type SetIamPolicyV1Response = Policy;
export const SetIamPolicyV1Response = Policy;

export type SetIamPolicyV1Error = CommonErrors;

export const setIamPolicyV1: API.OperationMethod<SetIamPolicyV1Request, SetIamPolicyV1Response, SetIamPolicyV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyV1Request,
  output: SetIamPolicyV1Response,
  errors: [],
}));

/** Gets the access control policy for an Identity-Aware Proxy protected resource. More information about managing access via IAP can be found at: https://cloud.google.com/iap/docs/managing-access#managing_access_via_the_api */
export interface GetIamPolicyV1Request {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyV1Request = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/{v1Id}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyV1Request>;

export type GetIamPolicyV1Response = Policy;
export const GetIamPolicyV1Response = Policy;

export type GetIamPolicyV1Error = CommonErrors;

export const getIamPolicyV1: API.OperationMethod<GetIamPolicyV1Request, GetIamPolicyV1Response, GetIamPolicyV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyV1Request,
  output: GetIamPolicyV1Response,
  errors: [],
}));

/** Returns permissions that a caller has on the Identity-Aware Proxy protected resource. More information about managing access via IAP can be found at: https://cloud.google.com/iap/docs/managing-access#managing_access_via_the_api */
export interface TestIamPermissionsV1Request {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsV1Request = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/{v1Id}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsV1Request>;

export type TestIamPermissionsV1Response = TestIamPermissionsResponse;
export const TestIamPermissionsV1Response = TestIamPermissionsResponse;

export type TestIamPermissionsV1Error = CommonErrors;

export const testIamPermissionsV1: API.OperationMethod<TestIamPermissionsV1Request, TestIamPermissionsV1Response, TestIamPermissionsV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsV1Request,
  output: TestIamPermissionsV1Response,
  errors: [],
}));

/** Gets the IAP settings on a particular IAP protected resource. */
export interface GetIapSettingsV1Request {
  /** Required. The resource name for which to retrieve the settings. Authorization: Requires the `getSettings` permission for the associated resource. */
  name: string;
}

export const GetIapSettingsV1Request = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}:iapSettings" }),
  svc,
) as unknown as Schema.Schema<GetIapSettingsV1Request>;

export type GetIapSettingsV1Response = IapSettings;
export const GetIapSettingsV1Response = IapSettings;

export type GetIapSettingsV1Error = CommonErrors;

export const getIapSettingsV1: API.OperationMethod<GetIapSettingsV1Request, GetIapSettingsV1Response, GetIapSettingsV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIapSettingsV1Request,
  output: GetIapSettingsV1Response,
  errors: [],
}));

/** Updates the IAP settings on a particular IAP protected resource. It replaces all fields unless the `update_mask` is set. */
export interface UpdateIapSettingsV1Request {
  /** Required. The resource name of the IAP protected resource. */
  name: string;
  /** The field mask specifying which IAP settings should be updated. If omitted, then all of the settings are updated. See https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. Note: All IAP reauth settings must always be set together, using the field mask: `iapSettings.accessSettings.reauthSettings`. */
  updateMask?: string;
  /** Request body */
  body?: IapSettings;
}

export const UpdateIapSettingsV1Request = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(IapSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/{v1Id}:iapSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateIapSettingsV1Request>;

export type UpdateIapSettingsV1Response = IapSettings;
export const UpdateIapSettingsV1Response = IapSettings;

export type UpdateIapSettingsV1Error = CommonErrors;

export const updateIapSettingsV1: API.OperationMethod<UpdateIapSettingsV1Request, UpdateIapSettingsV1Response, UpdateIapSettingsV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateIapSettingsV1Request,
  output: UpdateIapSettingsV1Response,
  errors: [],
}));

/** Validates that a given CEL expression conforms to IAP restrictions. */
export interface ValidateAttributeExpressionV1Request {
  /** Required. The resource name of the IAP protected resource. */
  name: string;
  /** Required. User input string expression. Should be of the form `attributes.saml_attributes.filter(attribute, attribute.name in ['{attribute_name}', '{attribute_name}'])` */
  expression?: string;
}

export const ValidateAttributeExpressionV1Request = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  expression: Schema.optional(Schema.String).pipe(T.HttpQuery("expression")),
}).pipe(
  T.Http({ method: "POST", path: "v1/{v1Id}:validateAttributeExpression", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateAttributeExpressionV1Request>;

export type ValidateAttributeExpressionV1Response = ValidateIapAttributeExpressionResponse;
export const ValidateAttributeExpressionV1Response = ValidateIapAttributeExpressionResponse;

export type ValidateAttributeExpressionV1Error = CommonErrors;

export const validateAttributeExpressionV1: API.OperationMethod<ValidateAttributeExpressionV1Request, ValidateAttributeExpressionV1Response, ValidateAttributeExpressionV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateAttributeExpressionV1Request,
  output: ValidateAttributeExpressionV1Response,
  errors: [],
}));

/** Lists the existing TunnelDestGroups. To group across all locations, use a `-` as the location ID. For example: `/v1/projects/123/iap_tunnel/locations/-/destGroups` */
export interface ListProjectsIap_tunnelLocationsDestGroupsRequest {
  /** Required. Google Cloud Project ID and location. In the following format: `projects/{project_number/id}/iap_tunnel/locations/{location}`. A `-` can be used for the location to group across all locations. */
  parent: string;
  /** The maximum number of groups to return. The service might return fewer than this value. If unspecified, at most 100 groups are returned. The maximum value is 1000; values above 1000 are coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListTunnelDestGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTunnelDestGroups` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsIap_tunnelLocationsDestGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/iap_tunnel/locations/{locationsId}/destGroups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsIap_tunnelLocationsDestGroupsRequest>;

export type ListProjectsIap_tunnelLocationsDestGroupsResponse = ListTunnelDestGroupsResponse;
export const ListProjectsIap_tunnelLocationsDestGroupsResponse = ListTunnelDestGroupsResponse;

export type ListProjectsIap_tunnelLocationsDestGroupsError = CommonErrors;

export const listProjectsIap_tunnelLocationsDestGroups = API.makePaginated(() => ({
  input: ListProjectsIap_tunnelLocationsDestGroupsRequest,
  output: ListProjectsIap_tunnelLocationsDestGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new TunnelDestGroup. */
export interface CreateProjectsIap_tunnelLocationsDestGroupsRequest {
  /** Required. Google Cloud Project ID and location. In the following format: `projects/{project_number/id}/iap_tunnel/locations/{location}`. */
  parent: string;
  /** Required. The ID to use for the TunnelDestGroup, which becomes the final component of the resource name. This value must be 4-63 characters, and valid characters are `[a-z]-`. */
  tunnelDestGroupId?: string;
  /** Request body */
  body?: TunnelDestGroup;
}

export const CreateProjectsIap_tunnelLocationsDestGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  tunnelDestGroupId: Schema.optional(Schema.String).pipe(T.HttpQuery("tunnelDestGroupId")),
  body: Schema.optional(TunnelDestGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/iap_tunnel/locations/{locationsId}/destGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsIap_tunnelLocationsDestGroupsRequest>;

export type CreateProjectsIap_tunnelLocationsDestGroupsResponse = TunnelDestGroup;
export const CreateProjectsIap_tunnelLocationsDestGroupsResponse = TunnelDestGroup;

export type CreateProjectsIap_tunnelLocationsDestGroupsError = CommonErrors;

export const createProjectsIap_tunnelLocationsDestGroups: API.OperationMethod<CreateProjectsIap_tunnelLocationsDestGroupsRequest, CreateProjectsIap_tunnelLocationsDestGroupsResponse, CreateProjectsIap_tunnelLocationsDestGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsIap_tunnelLocationsDestGroupsRequest,
  output: CreateProjectsIap_tunnelLocationsDestGroupsResponse,
  errors: [],
}));

/** Retrieves an existing TunnelDestGroup. */
export interface GetProjectsIap_tunnelLocationsDestGroupsRequest {
  /** Required. Name of the TunnelDestGroup to be fetched. In the following format: `projects/{project_number/id}/iap_tunnel/locations/{location}/destGroups/{dest_group}`. */
  name: string;
}

export const GetProjectsIap_tunnelLocationsDestGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/iap_tunnel/locations/{locationsId}/destGroups/{destGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsIap_tunnelLocationsDestGroupsRequest>;

export type GetProjectsIap_tunnelLocationsDestGroupsResponse = TunnelDestGroup;
export const GetProjectsIap_tunnelLocationsDestGroupsResponse = TunnelDestGroup;

export type GetProjectsIap_tunnelLocationsDestGroupsError = CommonErrors;

export const getProjectsIap_tunnelLocationsDestGroups: API.OperationMethod<GetProjectsIap_tunnelLocationsDestGroupsRequest, GetProjectsIap_tunnelLocationsDestGroupsResponse, GetProjectsIap_tunnelLocationsDestGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsIap_tunnelLocationsDestGroupsRequest,
  output: GetProjectsIap_tunnelLocationsDestGroupsResponse,
  errors: [],
}));

/** Deletes a TunnelDestGroup. */
export interface DeleteProjectsIap_tunnelLocationsDestGroupsRequest {
  /** Required. Name of the TunnelDestGroup to delete. In the following format: `projects/{project_number/id}/iap_tunnel/locations/{location}/destGroups/{dest_group}`. */
  name: string;
}

export const DeleteProjectsIap_tunnelLocationsDestGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/iap_tunnel/locations/{locationsId}/destGroups/{destGroupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsIap_tunnelLocationsDestGroupsRequest>;

export type DeleteProjectsIap_tunnelLocationsDestGroupsResponse = Empty;
export const DeleteProjectsIap_tunnelLocationsDestGroupsResponse = Empty;

export type DeleteProjectsIap_tunnelLocationsDestGroupsError = CommonErrors;

export const deleteProjectsIap_tunnelLocationsDestGroups: API.OperationMethod<DeleteProjectsIap_tunnelLocationsDestGroupsRequest, DeleteProjectsIap_tunnelLocationsDestGroupsResponse, DeleteProjectsIap_tunnelLocationsDestGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsIap_tunnelLocationsDestGroupsRequest,
  output: DeleteProjectsIap_tunnelLocationsDestGroupsResponse,
  errors: [],
}));

/** Updates a TunnelDestGroup. */
export interface PatchProjectsIap_tunnelLocationsDestGroupsRequest {
  /** Identifier. Identifier for the TunnelDestGroup. Must be unique within the project and contain only lower case letters (a-z) and dashes (-). */
  name: string;
  /** A field mask that specifies which IAP settings to update. If omitted, then all of the settings are updated. See https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: TunnelDestGroup;
}

export const PatchProjectsIap_tunnelLocationsDestGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(TunnelDestGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/iap_tunnel/locations/{locationsId}/destGroups/{destGroupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsIap_tunnelLocationsDestGroupsRequest>;

export type PatchProjectsIap_tunnelLocationsDestGroupsResponse = TunnelDestGroup;
export const PatchProjectsIap_tunnelLocationsDestGroupsResponse = TunnelDestGroup;

export type PatchProjectsIap_tunnelLocationsDestGroupsError = CommonErrors;

export const patchProjectsIap_tunnelLocationsDestGroups: API.OperationMethod<PatchProjectsIap_tunnelLocationsDestGroupsRequest, PatchProjectsIap_tunnelLocationsDestGroupsResponse, PatchProjectsIap_tunnelLocationsDestGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsIap_tunnelLocationsDestGroupsRequest,
  output: PatchProjectsIap_tunnelLocationsDestGroupsResponse,
  errors: [],
}));

/** Lists the existing brands for the project. */
export interface ListProjectsBrandsRequest {
  /** Required. GCP Project number/id. In the following format: projects/{project_number/id}. */
  parent: string;
}

export const ListProjectsBrandsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/brands" }),
  svc,
) as unknown as Schema.Schema<ListProjectsBrandsRequest>;

export type ListProjectsBrandsResponse = ListBrandsResponse;
export const ListProjectsBrandsResponse = ListBrandsResponse;

export type ListProjectsBrandsError = CommonErrors;

export const listProjectsBrands: API.OperationMethod<ListProjectsBrandsRequest, ListProjectsBrandsResponse, ListProjectsBrandsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsBrandsRequest,
  output: ListProjectsBrandsResponse,
  errors: [],
}));

/** Constructs a new OAuth brand for the project if one does not exist. The created brand is "internal only", meaning that OAuth clients created under it only accept requests from users who belong to the same Google Workspace organization as the project. The brand is created in an un-reviewed status. NOTE: The "internal only" status can be manually changed in the Google Cloud Console. Requires that a brand does not already exist for the project, and that the specified support email is owned by the caller. */
export interface CreateProjectsBrandsRequest {
  /** Required. GCP Project number/id under which the brand is to be created. In the following format: projects/{project_number/id}. */
  parent: string;
  /** Request body */
  body?: Brand;
}

export const CreateProjectsBrandsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Brand).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/brands", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsBrandsRequest>;

export type CreateProjectsBrandsResponse = Brand;
export const CreateProjectsBrandsResponse = Brand;

export type CreateProjectsBrandsError = CommonErrors;

export const createProjectsBrands: API.OperationMethod<CreateProjectsBrandsRequest, CreateProjectsBrandsResponse, CreateProjectsBrandsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsBrandsRequest,
  output: CreateProjectsBrandsResponse,
  errors: [],
}));

/** Retrieves the OAuth brand of the project. */
export interface GetProjectsBrandsRequest {
  /** Required. Name of the brand to be fetched. In the following format: projects/{project_number/id}/brands/{brand}. */
  name: string;
}

export const GetProjectsBrandsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/brands/{brandsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsBrandsRequest>;

export type GetProjectsBrandsResponse = Brand;
export const GetProjectsBrandsResponse = Brand;

export type GetProjectsBrandsError = CommonErrors;

export const getProjectsBrands: API.OperationMethod<GetProjectsBrandsRequest, GetProjectsBrandsResponse, GetProjectsBrandsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsBrandsRequest,
  output: GetProjectsBrandsResponse,
  errors: [],
}));

/** Creates an Identity Aware Proxy (IAP) OAuth client. The client is owned by IAP. Requires that the brand for the project exists and that it is set for internal-only use. */
export interface CreateProjectsBrandsIdentityAwareProxyClientsRequest {
  /** Required. Path to create the client in. In the following format: projects/{project_number/id}/brands/{brand}. The project must belong to a G Suite account. */
  parent: string;
  /** Request body */
  body?: IdentityAwareProxyClient;
}

export const CreateProjectsBrandsIdentityAwareProxyClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(IdentityAwareProxyClient).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/brands/{brandsId}/identityAwareProxyClients", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsBrandsIdentityAwareProxyClientsRequest>;

export type CreateProjectsBrandsIdentityAwareProxyClientsResponse = IdentityAwareProxyClient;
export const CreateProjectsBrandsIdentityAwareProxyClientsResponse = IdentityAwareProxyClient;

export type CreateProjectsBrandsIdentityAwareProxyClientsError = CommonErrors;

export const createProjectsBrandsIdentityAwareProxyClients: API.OperationMethod<CreateProjectsBrandsIdentityAwareProxyClientsRequest, CreateProjectsBrandsIdentityAwareProxyClientsResponse, CreateProjectsBrandsIdentityAwareProxyClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsBrandsIdentityAwareProxyClientsRequest,
  output: CreateProjectsBrandsIdentityAwareProxyClientsResponse,
  errors: [],
}));

/** Lists the existing clients for the brand. */
export interface ListProjectsBrandsIdentityAwareProxyClientsRequest {
  /** Required. Full brand path. In the following format: projects/{project_number/id}/brands/{brand}. */
  parent: string;
  /** The maximum number of clients to return. The service may return fewer than this value. If unspecified, at most 100 clients will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListIdentityAwareProxyClients` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListIdentityAwareProxyClients` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsBrandsIdentityAwareProxyClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/brands/{brandsId}/identityAwareProxyClients" }),
  svc,
) as unknown as Schema.Schema<ListProjectsBrandsIdentityAwareProxyClientsRequest>;

export type ListProjectsBrandsIdentityAwareProxyClientsResponse = ListIdentityAwareProxyClientsResponse;
export const ListProjectsBrandsIdentityAwareProxyClientsResponse = ListIdentityAwareProxyClientsResponse;

export type ListProjectsBrandsIdentityAwareProxyClientsError = CommonErrors;

export const listProjectsBrandsIdentityAwareProxyClients = API.makePaginated(() => ({
  input: ListProjectsBrandsIdentityAwareProxyClientsRequest,
  output: ListProjectsBrandsIdentityAwareProxyClientsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves an Identity Aware Proxy (IAP) OAuth client. Requires that the client is owned by IAP. */
export interface GetProjectsBrandsIdentityAwareProxyClientsRequest {
  /** Required. Name of the Identity Aware Proxy client to be fetched. In the following format: projects/{project_number/id}/brands/{brand}/identityAwareProxyClients/{client_id}. */
  name: string;
}

export const GetProjectsBrandsIdentityAwareProxyClientsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/brands/{brandsId}/identityAwareProxyClients/{identityAwareProxyClientsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsBrandsIdentityAwareProxyClientsRequest>;

export type GetProjectsBrandsIdentityAwareProxyClientsResponse = IdentityAwareProxyClient;
export const GetProjectsBrandsIdentityAwareProxyClientsResponse = IdentityAwareProxyClient;

export type GetProjectsBrandsIdentityAwareProxyClientsError = CommonErrors;

export const getProjectsBrandsIdentityAwareProxyClients: API.OperationMethod<GetProjectsBrandsIdentityAwareProxyClientsRequest, GetProjectsBrandsIdentityAwareProxyClientsResponse, GetProjectsBrandsIdentityAwareProxyClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsBrandsIdentityAwareProxyClientsRequest,
  output: GetProjectsBrandsIdentityAwareProxyClientsResponse,
  errors: [],
}));

/** Resets an Identity Aware Proxy (IAP) OAuth client secret. Useful if the secret was compromised. Requires that the client is owned by IAP. */
export interface ResetSecretProjectsBrandsIdentityAwareProxyClientsRequest {
  /** Required. Name of the Identity Aware Proxy client to that will have its secret reset. In the following format: projects/{project_number/id}/brands/{brand}/identityAwareProxyClients/{client_id}. */
  name: string;
  /** Request body */
  body?: ResetIdentityAwareProxyClientSecretRequest;
}

export const ResetSecretProjectsBrandsIdentityAwareProxyClientsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResetIdentityAwareProxyClientSecretRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/brands/{brandsId}/identityAwareProxyClients/{identityAwareProxyClientsId}:resetSecret", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetSecretProjectsBrandsIdentityAwareProxyClientsRequest>;

export type ResetSecretProjectsBrandsIdentityAwareProxyClientsResponse = IdentityAwareProxyClient;
export const ResetSecretProjectsBrandsIdentityAwareProxyClientsResponse = IdentityAwareProxyClient;

export type ResetSecretProjectsBrandsIdentityAwareProxyClientsError = CommonErrors;

export const resetSecretProjectsBrandsIdentityAwareProxyClients: API.OperationMethod<ResetSecretProjectsBrandsIdentityAwareProxyClientsRequest, ResetSecretProjectsBrandsIdentityAwareProxyClientsResponse, ResetSecretProjectsBrandsIdentityAwareProxyClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetSecretProjectsBrandsIdentityAwareProxyClientsRequest,
  output: ResetSecretProjectsBrandsIdentityAwareProxyClientsResponse,
  errors: [],
}));

/** Deletes an Identity Aware Proxy (IAP) OAuth client. Useful for removing obsolete clients, managing the number of clients in a given project, and cleaning up after tests. Requires that the client is owned by IAP. */
export interface DeleteProjectsBrandsIdentityAwareProxyClientsRequest {
  /** Required. Name of the Identity Aware Proxy client to be deleted. In the following format: projects/{project_number/id}/brands/{brand}/identityAwareProxyClients/{client_id}. */
  name: string;
}

export const DeleteProjectsBrandsIdentityAwareProxyClientsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/brands/{brandsId}/identityAwareProxyClients/{identityAwareProxyClientsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsBrandsIdentityAwareProxyClientsRequest>;

export type DeleteProjectsBrandsIdentityAwareProxyClientsResponse = Empty;
export const DeleteProjectsBrandsIdentityAwareProxyClientsResponse = Empty;

export type DeleteProjectsBrandsIdentityAwareProxyClientsError = CommonErrors;

export const deleteProjectsBrandsIdentityAwareProxyClients: API.OperationMethod<DeleteProjectsBrandsIdentityAwareProxyClientsRequest, DeleteProjectsBrandsIdentityAwareProxyClientsResponse, DeleteProjectsBrandsIdentityAwareProxyClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsBrandsIdentityAwareProxyClientsRequest,
  output: DeleteProjectsBrandsIdentityAwareProxyClientsResponse,
  errors: [],
}));

