// ==========================================================================
// BigQuery Data Policy API (bigquerydatapolicy v2)
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
  name: "bigquerydatapolicy",
  version: "v2",
  rootUrl: "https://bigquerydatapolicy.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface DataMaskingPolicy {
  /** Optional. The name of the BigQuery routine that contains the custom masking routine, in the format of `projects/{project_number}/datasets/{dataset_id}/routines/{routine_id}`. */
  routine?: string;
  /** Optional. A predefined masking expression. */
  predefinedExpression?: "PREDEFINED_EXPRESSION_UNSPECIFIED" | "SHA256" | "ALWAYS_NULL" | "DEFAULT_MASKING_VALUE" | "LAST_FOUR_CHARACTERS" | "FIRST_FOUR_CHARACTERS" | "EMAIL_MASK" | "DATE_YEAR_MASK" | "RANDOM_HASH" | (string & {});
}

export const DataMaskingPolicy: Schema.Schema<DataMaskingPolicy> = Schema.suspend(() => Schema.Struct({
  routine: Schema.optional(Schema.String),
  predefinedExpression: Schema.optional(Schema.String),
})).annotate({ identifier: "DataMaskingPolicy" }) as any as Schema.Schema<DataMaskingPolicy>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

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
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Expr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

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

export interface Policy {
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  bindings: Schema.optional(Schema.Array(Binding)),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface AddGranteesRequest {
  /** Required. IAM principal that should be granted Fine Grained Access to the underlying data goverened by the data policy. The target data policy is determined by the `data_policy` field. Uses the [IAM V2 principal syntax](https://cloud.google.com/iam/docs/principal-identifiers#v2). Supported principal types: * User * Group * Service account */
  grantees?: Array<string>;
}

export const AddGranteesRequest: Schema.Schema<AddGranteesRequest> = Schema.suspend(() => Schema.Struct({
  grantees: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AddGranteesRequest" }) as any as Schema.Schema<AddGranteesRequest>;

export interface DataPolicy {
  /** Required. Type of data policy. */
  dataPolicyType?: "DATA_POLICY_TYPE_UNSPECIFIED" | "DATA_MASKING_POLICY" | "RAW_DATA_ACCESS_POLICY" | "COLUMN_LEVEL_SECURITY_POLICY" | (string & {});
  /** The etag for this Data Policy. This field is used for UpdateDataPolicy calls. If Data Policy exists, this field is required and must match the server's etag. It will also be populated in the response of GetDataPolicy, CreateDataPolicy, and UpdateDataPolicy calls. */
  etag?: string;
  /** Output only. The version of the Data Policy resource. */
  version?: "VERSION_UNSPECIFIED" | "V1" | "V2" | (string & {});
  /** Output only. Policy tag resource name, in the format of `projects/{project_number}/locations/{location_id}/taxonomies/{taxonomy_id}/policyTags/{policyTag_id}`. policy_tag is supported only for V1 data policies. */
  policyTag?: string;
  /** Output only. User-assigned (human readable) ID of the data policy that needs to be unique within a project. Used as {data_policy_id} in part of the resource name. */
  dataPolicyId?: string;
  /** Optional. The list of IAM principals that have Fine Grained Access to the underlying data goverened by this data policy. Uses the [IAM V2 principal syntax](https://cloud.google.com/iam/docs/principal-identifiers#v2) Only supports principal types users, groups, serviceaccounts, cloudidentity. This field is supported in V2 Data Policy only. In case of V1 data policies (i.e. verion = 1 and policy_tag is set), this field is not populated. */
  grantees?: Array<string>;
  /** Optional. The data masking policy that specifies the data masking rule to use. It must be set if the data policy type is DATA_MASKING_POLICY. */
  dataMaskingPolicy?: DataMaskingPolicy;
  /** Identifier. Resource name of this data policy, in the format of `projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}`. */
  name?: string;
}

export const DataPolicy: Schema.Schema<DataPolicy> = Schema.suspend(() => Schema.Struct({
  dataPolicyType: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  policyTag: Schema.optional(Schema.String),
  dataPolicyId: Schema.optional(Schema.String),
  grantees: Schema.optional(Schema.Array(Schema.String)),
  dataMaskingPolicy: Schema.optional(DataMaskingPolicy),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "DataPolicy" }) as any as Schema.Schema<DataPolicy>;

export interface CreateDataPolicyRequest {
  /** Required. The data policy to create. The `name` field does not need to be provided for the data policy creation. */
  dataPolicy?: DataPolicy;
  /** Required. User-assigned (human readable) ID of the data policy that needs to be unique within a project. Used as {data_policy_id} in part of the resource name. */
  dataPolicyId?: string;
}

export const CreateDataPolicyRequest: Schema.Schema<CreateDataPolicyRequest> = Schema.suspend(() => Schema.Struct({
  dataPolicy: Schema.optional(DataPolicy),
  dataPolicyId: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateDataPolicyRequest" }) as any as Schema.Schema<CreateDataPolicyRequest>;

export interface SetIamPolicyRequest {
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  policy: Schema.optional(Policy),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface ListDataPoliciesResponse {
  /** Data policies that belong to the requested project. */
  dataPolicies?: Array<DataPolicy>;
  /** Token used to retrieve the next page of results, or empty if there are no more results. */
  nextPageToken?: string;
}

export const ListDataPoliciesResponse: Schema.Schema<ListDataPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  dataPolicies: Schema.optional(Schema.Array(DataPolicy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDataPoliciesResponse" }) as any as Schema.Schema<ListDataPoliciesResponse>;

export interface RemoveGranteesRequest {
  /** Required. IAM principal that should be revoked from Fine Grained Access to the underlying data goverened by the data policy. The target data policy is determined by the `data_policy` field. Uses the [IAM V2 principal syntax](https://cloud.google.com/iam/docs/principal-identifiers#v2). Supported principal types: * User * Group * Service account */
  grantees?: Array<string>;
}

export const RemoveGranteesRequest: Schema.Schema<RemoveGranteesRequest> = Schema.suspend(() => Schema.Struct({
  grantees: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RemoveGranteesRequest" }) as any as Schema.Schema<RemoveGranteesRequest>;

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

// ==========================================================================
// Operations
// ==========================================================================

/** Creates a new data policy under a project with the given `data_policy_id` (used as the display name), and data policy type. */
export interface CreateProjectsLocationsDataPoliciesRequest {
  /** Required. Resource name of the project that the data policy will belong to. The format is `projects/{project_number}/locations/{location_id}`. */
  parent: string;
  /** Request body */
  body?: CreateDataPolicyRequest;
}

export const CreateProjectsLocationsDataPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateDataPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/dataPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDataPoliciesRequest>;

export type CreateProjectsLocationsDataPoliciesResponse = DataPolicy;
export const CreateProjectsLocationsDataPoliciesResponse = DataPolicy;

export type CreateProjectsLocationsDataPoliciesError = CommonErrors;

export const createProjectsLocationsDataPolicies: API.OperationMethod<CreateProjectsLocationsDataPoliciesRequest, CreateProjectsLocationsDataPoliciesResponse, CreateProjectsLocationsDataPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDataPoliciesRequest,
  output: CreateProjectsLocationsDataPoliciesResponse,
  errors: [],
}));

/** Returns the caller's permission on the specified data policy resource. */
export interface TestIamPermissionsProjectsLocationsDataPoliciesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDataPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/dataPolicies/{dataPoliciesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDataPoliciesRequest>;

export type TestIamPermissionsProjectsLocationsDataPoliciesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDataPoliciesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDataPoliciesError = CommonErrors;

export const testIamPermissionsProjectsLocationsDataPolicies: API.OperationMethod<TestIamPermissionsProjectsLocationsDataPoliciesRequest, TestIamPermissionsProjectsLocationsDataPoliciesResponse, TestIamPermissionsProjectsLocationsDataPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDataPoliciesRequest,
  output: TestIamPermissionsProjectsLocationsDataPoliciesResponse,
  errors: [],
}));

/** Gets the data policy specified by its resource name. */
export interface GetProjectsLocationsDataPoliciesRequest {
  /** Required. Resource name of the requested data policy. Format is `projects/{project_number}/locations/{location_id}/dataPolicies/{id}`. */
  name: string;
}

export const GetProjectsLocationsDataPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/dataPolicies/{dataPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDataPoliciesRequest>;

export type GetProjectsLocationsDataPoliciesResponse = DataPolicy;
export const GetProjectsLocationsDataPoliciesResponse = DataPolicy;

export type GetProjectsLocationsDataPoliciesError = CommonErrors;

export const getProjectsLocationsDataPolicies: API.OperationMethod<GetProjectsLocationsDataPoliciesRequest, GetProjectsLocationsDataPoliciesResponse, GetProjectsLocationsDataPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDataPoliciesRequest,
  output: GetProjectsLocationsDataPoliciesResponse,
  errors: [],
}));

/** Gets the IAM policy for the specified data policy. */
export interface GetIamPolicyProjectsLocationsDataPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsDataPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/dataPolicies/{dataPoliciesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDataPoliciesRequest>;

export type GetIamPolicyProjectsLocationsDataPoliciesResponse = Policy;
export const GetIamPolicyProjectsLocationsDataPoliciesResponse = Policy;

export type GetIamPolicyProjectsLocationsDataPoliciesError = CommonErrors;

export const getIamPolicyProjectsLocationsDataPolicies: API.OperationMethod<GetIamPolicyProjectsLocationsDataPoliciesRequest, GetIamPolicyProjectsLocationsDataPoliciesResponse, GetIamPolicyProjectsLocationsDataPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDataPoliciesRequest,
  output: GetIamPolicyProjectsLocationsDataPoliciesResponse,
  errors: [],
}));

/** Sets the IAM policy for the specified data policy. */
export interface SetIamPolicyProjectsLocationsDataPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDataPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/dataPolicies/{dataPoliciesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDataPoliciesRequest>;

export type SetIamPolicyProjectsLocationsDataPoliciesResponse = Policy;
export const SetIamPolicyProjectsLocationsDataPoliciesResponse = Policy;

export type SetIamPolicyProjectsLocationsDataPoliciesError = CommonErrors;

export const setIamPolicyProjectsLocationsDataPolicies: API.OperationMethod<SetIamPolicyProjectsLocationsDataPoliciesRequest, SetIamPolicyProjectsLocationsDataPoliciesResponse, SetIamPolicyProjectsLocationsDataPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDataPoliciesRequest,
  output: SetIamPolicyProjectsLocationsDataPoliciesResponse,
  errors: [],
}));

/** Removes grantees from a data policy. The grantees will be removed from the existing grantees. If the request contains a grantee that does not exist, the grantee will be ignored. */
export interface RemoveGranteesProjectsLocationsDataPoliciesRequest {
  /** Required. Resource name of this data policy, in the format of `projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}`. */
  dataPolicy: string;
  /** Request body */
  body?: RemoveGranteesRequest;
}

export const RemoveGranteesProjectsLocationsDataPoliciesRequest = Schema.Struct({
  dataPolicy: Schema.String.pipe(T.HttpPath("dataPolicy")),
  body: Schema.optional(RemoveGranteesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/dataPolicies/{dataPoliciesId}:removeGrantees", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveGranteesProjectsLocationsDataPoliciesRequest>;

export type RemoveGranteesProjectsLocationsDataPoliciesResponse = DataPolicy;
export const RemoveGranteesProjectsLocationsDataPoliciesResponse = DataPolicy;

export type RemoveGranteesProjectsLocationsDataPoliciesError = CommonErrors;

export const removeGranteesProjectsLocationsDataPolicies: API.OperationMethod<RemoveGranteesProjectsLocationsDataPoliciesRequest, RemoveGranteesProjectsLocationsDataPoliciesResponse, RemoveGranteesProjectsLocationsDataPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveGranteesProjectsLocationsDataPoliciesRequest,
  output: RemoveGranteesProjectsLocationsDataPoliciesResponse,
  errors: [],
}));

/** Updates the metadata for an existing data policy. The target data policy can be specified by the resource name. */
export interface PatchProjectsLocationsDataPoliciesRequest {
  /** Optional. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask If not set, defaults to all of the fields that are allowed to update. Updates to the `name` and `dataPolicyId` fields are not allowed. */
  updateMask?: string;
  /** Identifier. Resource name of this data policy, in the format of `projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}`. */
  name: string;
  /** Optional. If set to true, and the data policy is not found, a new data policy will be created. In this situation, update_mask is ignored. */
  allowMissing?: boolean;
  /** Request body */
  body?: DataPolicy;
}

export const PatchProjectsLocationsDataPoliciesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  body: Schema.optional(DataPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/dataPolicies/{dataPoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDataPoliciesRequest>;

export type PatchProjectsLocationsDataPoliciesResponse = DataPolicy;
export const PatchProjectsLocationsDataPoliciesResponse = DataPolicy;

export type PatchProjectsLocationsDataPoliciesError = CommonErrors;

export const patchProjectsLocationsDataPolicies: API.OperationMethod<PatchProjectsLocationsDataPoliciesRequest, PatchProjectsLocationsDataPoliciesResponse, PatchProjectsLocationsDataPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDataPoliciesRequest,
  output: PatchProjectsLocationsDataPoliciesResponse,
  errors: [],
}));

/** Adds new grantees to a data policy. The new grantees will be added to the existing grantees. If the request contains a duplicate grantee, the grantee will be ignored. If the request contains a grantee that already exists, the grantee will be ignored. */
export interface AddGranteesProjectsLocationsDataPoliciesRequest {
  /** Required. Resource name of this data policy, in the format of `projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}`. */
  dataPolicy: string;
  /** Request body */
  body?: AddGranteesRequest;
}

export const AddGranteesProjectsLocationsDataPoliciesRequest = Schema.Struct({
  dataPolicy: Schema.String.pipe(T.HttpPath("dataPolicy")),
  body: Schema.optional(AddGranteesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/dataPolicies/{dataPoliciesId}:addGrantees", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddGranteesProjectsLocationsDataPoliciesRequest>;

export type AddGranteesProjectsLocationsDataPoliciesResponse = DataPolicy;
export const AddGranteesProjectsLocationsDataPoliciesResponse = DataPolicy;

export type AddGranteesProjectsLocationsDataPoliciesError = CommonErrors;

export const addGranteesProjectsLocationsDataPolicies: API.OperationMethod<AddGranteesProjectsLocationsDataPoliciesRequest, AddGranteesProjectsLocationsDataPoliciesResponse, AddGranteesProjectsLocationsDataPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddGranteesProjectsLocationsDataPoliciesRequest,
  output: AddGranteesProjectsLocationsDataPoliciesResponse,
  errors: [],
}));

/** List all of the data policies in the specified parent project. */
export interface ListProjectsLocationsDataPoliciesRequest {
  /** Optional. The `nextPageToken` value returned from a previous list request, if any. If not set, defaults to an empty string. */
  pageToken?: string;
  /** Required. Resource name of the project for which to list data policies. Format is `projects/{project_number}/locations/{location_id}`. */
  parent: string;
  /** Optional. The maximum number of data policies to return. Must be a value between 1 and 1000. If not set, defaults to 50. */
  pageSize?: number;
  /** Optional. Filters the data policies by policy tags that they are associated with. Currently filter only supports "policy_tag" based filtering and OR based predicates. Sample filter can be "policy_tag: projects/1/locations/us/taxonomies/2/policyTags/3". You may also use wildcard such as "policy_tag: projects/1/locations/us/taxonomies/2*". Please note that OR predicates cannot be used with wildcard filters. */
  filter?: string;
}

export const ListProjectsLocationsDataPoliciesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/dataPolicies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDataPoliciesRequest>;

export type ListProjectsLocationsDataPoliciesResponse = ListDataPoliciesResponse;
export const ListProjectsLocationsDataPoliciesResponse = ListDataPoliciesResponse;

export type ListProjectsLocationsDataPoliciesError = CommonErrors;

export const listProjectsLocationsDataPolicies = API.makePaginated(() => ({
  input: ListProjectsLocationsDataPoliciesRequest,
  output: ListProjectsLocationsDataPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes the data policy specified by its resource name. */
export interface DeleteProjectsLocationsDataPoliciesRequest {
  /** Required. Resource name of the data policy to delete. Format is `projects/{project_number}/locations/{location_id}/dataPolicies/{id}`. */
  name: string;
}

export const DeleteProjectsLocationsDataPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/dataPolicies/{dataPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDataPoliciesRequest>;

export type DeleteProjectsLocationsDataPoliciesResponse = Empty;
export const DeleteProjectsLocationsDataPoliciesResponse = Empty;

export type DeleteProjectsLocationsDataPoliciesError = CommonErrors;

export const deleteProjectsLocationsDataPolicies: API.OperationMethod<DeleteProjectsLocationsDataPoliciesRequest, DeleteProjectsLocationsDataPoliciesResponse, DeleteProjectsLocationsDataPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDataPoliciesRequest,
  output: DeleteProjectsLocationsDataPoliciesResponse,
  errors: [],
}));

