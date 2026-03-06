// ==========================================================================
// Cloud Resource Manager API (cloudresourcemanager v1)
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
  name: "cloudresourcemanager",
  version: "v1",
  rootUrl: "https://cloudresourcemanager.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Lien {
  /** A system-generated unique identifier for this Lien. Example: `liens/1234abcd` */
  name?: string;
  /** A reference to the resource this Lien is attached to. The server will validate the parent against those for which Liens are supported. Example: `projects/1234` */
  parent?: string;
  /** The types of operations which should be blocked as a result of this Lien. Each value should correspond to an IAM permission. The server will validate the permissions against those for which Liens are supported. An empty list is meaningless and will be rejected. Example: ['resourcemanager.projects.delete'] */
  restrictions?: Array<string>;
  /** Concise user-visible strings indicating why an action cannot be performed on a resource. Maximum length of 200 characters. Example: 'Holds production API key' */
  reason?: string;
  /** A stable, user-visible/meaningful string identifying the origin of the Lien, intended to be inspected programmatically. Maximum length of 200 characters. Example: 'compute.googleapis.com' */
  origin?: string;
  /** The creation time of this Lien. */
  createTime?: string;
}

export const Lien: Schema.Schema<Lien> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  restrictions: Schema.optional(Schema.Array(Schema.String)),
  reason: Schema.optional(Schema.String),
  origin: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Lien" }) as any as Schema.Schema<Lien>;

export interface ListLiensResponse {
  /** A list of Liens. */
  liens?: Array<Lien>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListLiensResponse: Schema.Schema<ListLiensResponse> = Schema.suspend(() => Schema.Struct({
  liens: Schema.optional(Schema.Array(Lien)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLiensResponse" }) as any as Schema.Schema<ListLiensResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ListAvailableOrgPolicyConstraintsRequest {
  /** Size of the pages to be returned. This is currently unsupported and will be ignored. The server may at any point start using this field to limit page size. */
  pageSize?: number;
  /** Page token used to retrieve the next page. This is currently unsupported and will be ignored. The server may at any point start using this field. */
  pageToken?: string;
}

export const ListAvailableOrgPolicyConstraintsRequest: Schema.Schema<ListAvailableOrgPolicyConstraintsRequest> = Schema.suspend(() => Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAvailableOrgPolicyConstraintsRequest" }) as any as Schema.Schema<ListAvailableOrgPolicyConstraintsRequest>;

export interface ListConstraint {
  /** Optional. The Google Cloud Console will try to default to a configuration that matches the value specified in this `Constraint`. */
  suggestedValue?: string;
  /** Indicates whether subtrees of Cloud Resource Manager resource hierarchy can be used in `Policy.allowed_values` and `Policy.denied_values`. For example, `"under:folders/123"` would match any resource under the 'folders/123' folder. */
  supportsUnder?: boolean;
}

export const ListConstraint: Schema.Schema<ListConstraint> = Schema.suspend(() => Schema.Struct({
  suggestedValue: Schema.optional(Schema.String),
  supportsUnder: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ListConstraint" }) as any as Schema.Schema<ListConstraint>;

export interface BooleanConstraint {
}

export const BooleanConstraint: Schema.Schema<BooleanConstraint> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "BooleanConstraint" }) as any as Schema.Schema<BooleanConstraint>;

export interface Constraint {
  /** Version of the `Constraint`. Default version is 0; */
  version?: number;
  /** Immutable value, required to globally be unique. For example, `constraints/serviceuser.services` */
  name?: string;
  /** The human readable name. Mutable. */
  displayName?: string;
  /** Detailed description of what this `Constraint` controls as well as how and where it is enforced. Mutable. */
  description?: string;
  /** The evaluation behavior of this constraint in the absence of 'Policy'. */
  constraintDefault?: "CONSTRAINT_DEFAULT_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  /** Defines this constraint as being a ListConstraint. */
  listConstraint?: ListConstraint;
  /** Defines this constraint as being a BooleanConstraint. */
  booleanConstraint?: BooleanConstraint;
}

export const Constraint: Schema.Schema<Constraint> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  constraintDefault: Schema.optional(Schema.String),
  listConstraint: Schema.optional(ListConstraint),
  booleanConstraint: Schema.optional(BooleanConstraint),
})).annotate({ identifier: "Constraint" }) as any as Schema.Schema<Constraint>;

export interface ListAvailableOrgPolicyConstraintsResponse {
  /** The collection of constraints that are settable on the request resource. */
  constraints?: Array<Constraint>;
  /** Page token used to retrieve the next page. This is currently not used. */
  nextPageToken?: string;
}

export const ListAvailableOrgPolicyConstraintsResponse: Schema.Schema<ListAvailableOrgPolicyConstraintsResponse> = Schema.suspend(() => Schema.Struct({
  constraints: Schema.optional(Schema.Array(Constraint)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAvailableOrgPolicyConstraintsResponse" }) as any as Schema.Schema<ListAvailableOrgPolicyConstraintsResponse>;

export interface ListOrgPoliciesRequest {
  /** Size of the pages to be returned. This is currently unsupported and will be ignored. The server may at any point start using this field to limit page size. */
  pageSize?: number;
  /** Page token used to retrieve the next page. This is currently unsupported and will be ignored. The server may at any point start using this field. */
  pageToken?: string;
}

export const ListOrgPoliciesRequest: Schema.Schema<ListOrgPoliciesRequest> = Schema.suspend(() => Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOrgPoliciesRequest" }) as any as Schema.Schema<ListOrgPoliciesRequest>;

export interface ListPolicy {
  /** List of values allowed at this resource. Can only be set if `all_values` is set to `ALL_VALUES_UNSPECIFIED`. */
  allowedValues?: Array<string>;
  /** List of values denied at this resource. Can only be set if `all_values` is set to `ALL_VALUES_UNSPECIFIED`. */
  deniedValues?: Array<string>;
  /** The policy all_values state. */
  allValues?: "ALL_VALUES_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  /** Optional. The Google Cloud Console will try to default to a configuration that matches the value specified in this `Policy`. If `suggested_value` is not set, it will inherit the value specified higher in the hierarchy, unless `inherit_from_parent` is `false`. */
  suggestedValue?: string;
  /** Determines the inheritance behavior for this `Policy`. By default, a `ListPolicy` set at a resource supersedes any `Policy` set anywhere up the resource hierarchy. However, if `inherit_from_parent` is set to `true`, then the values from the effective `Policy` of the parent resource are inherited, meaning the values set in this `Policy` are added to the values inherited up the hierarchy. Setting `Policy` hierarchies that inherit both allowed values and denied values isn't recommended in most circumstances to keep the configuration simple and understandable. However, it is possible to set a `Policy` with `allowed_values` set that inherits a `Policy` with `denied_values` set. In this case, the values that are allowed must be in `allowed_values` and not present in `denied_values`. For example, suppose you have a `Constraint` `constraints/serviceuser.services`, which has a `constraint_type` of `list_constraint`, and with `constraint_default` set to `ALLOW`. Suppose that at the Organization level, a `Policy` is applied that restricts the allowed API activations to {`E1`, `E2`}. Then, if a `Policy` is applied to a project below the Organization that has `inherit_from_parent` set to `false` and field all_values set to DENY, then an attempt to activate any API will be denied. The following examples demonstrate different possible layerings for `projects/bar` parented by `organizations/foo`: Example 1 (no inherited values): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values:"E2"} `projects/bar` has `inherit_from_parent` `false` and values: {allowed_values: "E3" allowed_values: "E4"} The accepted values at `organizations/foo` are `E1`, `E2`. The accepted values at `projects/bar` are `E3`, and `E4`. Example 2 (inherited values): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values:"E2"} `projects/bar` has a `Policy` with values: {value: "E3" value: "E4" inherit_from_parent: true} The accepted values at `organizations/foo` are `E1`, `E2`. The accepted values at `projects/bar` are `E1`, `E2`, `E3`, and `E4`. Example 3 (inheriting both allowed and denied values): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values: "E2"} `projects/bar` has a `Policy` with: {denied_values: "E1"} The accepted values at `organizations/foo` are `E1`, `E2`. The value accepted at `projects/bar` is `E2`. Example 4 (RestoreDefault): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values:"E2"} `projects/bar` has a `Policy` with values: {RestoreDefault: {}} The accepted values at `organizations/foo` are `E1`, `E2`. The accepted values at `projects/bar` are either all or none depending on the value of `constraint_default` (if `ALLOW`, all; if `DENY`, none). Example 5 (no policy inherits parent policy): `organizations/foo` has no `Policy` set. `projects/bar` has no `Policy` set. The accepted values at both levels are either all or none depending on the value of `constraint_default` (if `ALLOW`, all; if `DENY`, none). Example 6 (ListConstraint allowing all): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values: "E2"} `projects/bar` has a `Policy` with: {all: ALLOW} The accepted values at `organizations/foo` are `E1`, E2`. Any value is accepted at `projects/bar`. Example 7 (ListConstraint allowing none): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values: "E2"} `projects/bar` has a `Policy` with: {all: DENY} The accepted values at `organizations/foo` are `E1`, E2`. No value is accepted at `projects/bar`. Example 10 (allowed and denied subtrees of Resource Manager hierarchy): Given the following resource hierarchy O1->{F1, F2}; F1->{P1}; F2->{P2, P3}, `organizations/foo` has a `Policy` with values: {allowed_values: "under:organizations/O1"} `projects/bar` has a `Policy` with: {allowed_values: "under:projects/P3"} {denied_values: "under:folders/F2"} The accepted values at `organizations/foo` are `organizations/O1`, `folders/F1`, `folders/F2`, `projects/P1`, `projects/P2`, `projects/P3`. The accepted values at `projects/bar` are `organizations/O1`, `folders/F1`, `projects/P1`. */
  inheritFromParent?: boolean;
}

export const ListPolicy: Schema.Schema<ListPolicy> = Schema.suspend(() => Schema.Struct({
  allowedValues: Schema.optional(Schema.Array(Schema.String)),
  deniedValues: Schema.optional(Schema.Array(Schema.String)),
  allValues: Schema.optional(Schema.String),
  suggestedValue: Schema.optional(Schema.String),
  inheritFromParent: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ListPolicy" }) as any as Schema.Schema<ListPolicy>;

export interface BooleanPolicy {
  /** If `true`, then the `Policy` is enforced. If `false`, then any configuration is acceptable. Suppose you have a `Constraint` `constraints/compute.disableSerialPortAccess` with `constraint_default` set to `ALLOW`. A `Policy` for that `Constraint` exhibits the following behavior: - If the `Policy` at this resource has enforced set to `false`, serial port connection attempts will be allowed. - If the `Policy` at this resource has enforced set to `true`, serial port connection attempts will be refused. - If the `Policy` at this resource is `RestoreDefault`, serial port connection attempts will be allowed. - If no `Policy` is set at this resource or anywhere higher in the resource hierarchy, serial port connection attempts will be allowed. - If no `Policy` is set at this resource, but one exists higher in the resource hierarchy, the behavior is as if the`Policy` were set at this resource. The following examples demonstrate the different possible layerings: Example 1 (nearest `Constraint` wins): `organizations/foo` has a `Policy` with: {enforced: false} `projects/bar` has no `Policy` set. The constraint at `projects/bar` and `organizations/foo` will not be enforced. Example 2 (enforcement gets replaced): `organizations/foo` has a `Policy` with: {enforced: false} `projects/bar` has a `Policy` with: {enforced: true} The constraint at `organizations/foo` is not enforced. The constraint at `projects/bar` is enforced. Example 3 (RestoreDefault): `organizations/foo` has a `Policy` with: {enforced: true} `projects/bar` has a `Policy` with: {RestoreDefault: {}} The constraint at `organizations/foo` is enforced. The constraint at `projects/bar` is not enforced, because `constraint_default` for the `Constraint` is `ALLOW`. */
  enforced?: boolean;
}

export const BooleanPolicy: Schema.Schema<BooleanPolicy> = Schema.suspend(() => Schema.Struct({
  enforced: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "BooleanPolicy" }) as any as Schema.Schema<BooleanPolicy>;

export interface RestoreDefault {
}

export const RestoreDefault: Schema.Schema<RestoreDefault> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RestoreDefault" }) as any as Schema.Schema<RestoreDefault>;

export interface OrgPolicy {
  /** Version of the `Policy`. Default version is 0; */
  version?: number;
  /** The name of the `Constraint` the `Policy` is configuring, for example, `constraints/serviceuser.services`. A [list of available constraints](/resource-manager/docs/organization-policy/org-policy-constraints) is available. Immutable after creation. */
  constraint?: string;
  /** An opaque tag indicating the current version of the `Policy`, used for concurrency control. When the `Policy` is returned from either a `GetPolicy` or a `ListOrgPolicy` request, this `etag` indicates the version of the current `Policy` to use when executing a read-modify-write loop. When the `Policy` is returned from a `GetEffectivePolicy` request, the `etag` will be unset. When the `Policy` is used in a `SetOrgPolicy` method, use the `etag` value that was returned from a `GetOrgPolicy` request as part of a read-modify-write loop for concurrency control. Not setting the `etag`in a `SetOrgPolicy` request will result in an unconditional write of the `Policy`. */
  etag?: string;
  /** The time stamp the `Policy` was previously updated. This is set by the server, not specified by the caller, and represents the last time a call to `SetOrgPolicy` was made for that `Policy`. Any value set by the client will be ignored. */
  updateTime?: string;
  /** List of values either allowed or disallowed. */
  listPolicy?: ListPolicy;
  /** For boolean `Constraints`, whether to enforce the `Constraint` or not. */
  booleanPolicy?: BooleanPolicy;
  /** Restores the default behavior of the constraint; independent of `Constraint` type. */
  restoreDefault?: RestoreDefault;
}

export const OrgPolicy: Schema.Schema<OrgPolicy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  constraint: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  listPolicy: Schema.optional(ListPolicy),
  booleanPolicy: Schema.optional(BooleanPolicy),
  restoreDefault: Schema.optional(RestoreDefault),
})).annotate({ identifier: "OrgPolicy" }) as any as Schema.Schema<OrgPolicy>;

export interface ListOrgPoliciesResponse {
  /** The `Policies` that are set on the resource. It will be empty if no `Policies` are set. */
  policies?: Array<OrgPolicy>;
  /** Page token used to retrieve the next page. This is currently not used, but the server may at any point start supplying a valid token. */
  nextPageToken?: string;
}

export const ListOrgPoliciesResponse: Schema.Schema<ListOrgPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  policies: Schema.optional(Schema.Array(OrgPolicy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOrgPoliciesResponse" }) as any as Schema.Schema<ListOrgPoliciesResponse>;

export interface GetOrgPolicyRequest {
  /** Name of the `Constraint` to get the `Policy`. */
  constraint?: string;
}

export const GetOrgPolicyRequest: Schema.Schema<GetOrgPolicyRequest> = Schema.suspend(() => Schema.Struct({
  constraint: Schema.optional(Schema.String),
})).annotate({ identifier: "GetOrgPolicyRequest" }) as any as Schema.Schema<GetOrgPolicyRequest>;

export interface GetEffectiveOrgPolicyRequest {
  /** The name of the `Constraint` to compute the effective `Policy`. */
  constraint?: string;
}

export const GetEffectiveOrgPolicyRequest: Schema.Schema<GetEffectiveOrgPolicyRequest> = Schema.suspend(() => Schema.Struct({
  constraint: Schema.optional(Schema.String),
})).annotate({ identifier: "GetEffectiveOrgPolicyRequest" }) as any as Schema.Schema<GetEffectiveOrgPolicyRequest>;

export interface SetOrgPolicyRequest {
  /** `Policy` to set on the resource. */
  policy?: OrgPolicy;
}

export const SetOrgPolicyRequest: Schema.Schema<SetOrgPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(OrgPolicy),
})).annotate({ identifier: "SetOrgPolicyRequest" }) as any as Schema.Schema<SetOrgPolicyRequest>;

export interface ClearOrgPolicyRequest {
  /** Name of the `Constraint` of the `Policy` to clear. */
  constraint?: string;
  /** The current version, for concurrency control. Not sending an `etag` will cause the `Policy` to be cleared blindly. */
  etag?: string;
}

export const ClearOrgPolicyRequest: Schema.Schema<ClearOrgPolicyRequest> = Schema.suspend(() => Schema.Struct({
  constraint: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "ClearOrgPolicyRequest" }) as any as Schema.Schema<ClearOrgPolicyRequest>;

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

export interface SearchOrganizationsRequest {
  /** The maximum number of Organizations to return in the response. The server can return fewer organizations than requested. If unspecified, server picks an appropriate default. */
  pageSize?: number;
  /** A pagination token returned from a previous call to `SearchOrganizations` that indicates from where listing should continue. This field is optional. */
  pageToken?: string;
  /** An optional query string used to filter the Organizations to return in the response. Filter rules are case-insensitive. Organizations may be filtered by `owner.directoryCustomerId` or by `domain`, where the domain is a verified G Suite domain, for example: * Filter `owner.directorycustomerid:123456789` returns Organization resources with `owner.directory_customer_id` equal to `123456789`. * Filter `domain:google.com` returns Organization resources corresponding to the domain `google.com`. This field is optional. */
  filter?: string;
}

export const SearchOrganizationsRequest: Schema.Schema<SearchOrganizationsRequest> = Schema.suspend(() => Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchOrganizationsRequest" }) as any as Schema.Schema<SearchOrganizationsRequest>;

export interface OrganizationOwner {
  /** The G Suite customer id used in the Directory API. */
  directoryCustomerId?: string;
}

export const OrganizationOwner: Schema.Schema<OrganizationOwner> = Schema.suspend(() => Schema.Struct({
  directoryCustomerId: Schema.optional(Schema.String),
})).annotate({ identifier: "OrganizationOwner" }) as any as Schema.Schema<OrganizationOwner>;

export interface Organization {
  /** Output only. The resource name of the organization. This is the organization's relative path in the API. Its format is "organizations/[organization_id]". For example, "organizations/1234". */
  name?: string;
  /** A human-readable string that refers to the Organization in the Google Cloud console. This string is set by the server and cannot be changed. The string will be set to the primary domain (for example, "google.com") of the G Suite customer that owns the organization. */
  displayName?: string;
  /** The owner of this Organization. The owner should be specified on creation. Once set, it cannot be changed. This field is required. */
  owner?: OrganizationOwner;
  /** Timestamp when the Organization was created. Assigned by the server. */
  creationTime?: string;
  /** The organization's current lifecycle state. Assigned by the server. */
  lifecycleState?: "LIFECYCLE_STATE_UNSPECIFIED" | "ACTIVE" | "DELETE_REQUESTED" | (string & {});
}

export const Organization: Schema.Schema<Organization> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  owner: Schema.optional(OrganizationOwner),
  creationTime: Schema.optional(Schema.String),
  lifecycleState: Schema.optional(Schema.String),
})).annotate({ identifier: "Organization" }) as any as Schema.Schema<Organization>;

export interface SearchOrganizationsResponse {
  /** The list of Organizations that matched the search query, possibly paginated. */
  organizations?: Array<Organization>;
  /** A pagination token to be used to retrieve the next page of results. If the result is too large to fit within the page size specified in the request, this field will be set with a token that can be used to fetch the next page of results. If this field is empty, it indicates that this response contains the last page of results. */
  nextPageToken?: string;
}

export const SearchOrganizationsResponse: Schema.Schema<SearchOrganizationsResponse> = Schema.suspend(() => Schema.Struct({
  organizations: Schema.optional(Schema.Array(Organization)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchOrganizationsResponse" }) as any as Schema.Schema<SearchOrganizationsResponse>;

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

export interface AuditLogConfig {
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
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

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
  updateMask: Schema.optional(Schema.String),
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

export interface ResourceId {
  /** The resource type this id is for. At present, the valid types are: "organization", "folder", and "project". */
  type?: string;
  /** The type-specific id. This should correspond to the id used in the type-specific API's. */
  id?: string;
}

export const ResourceId: Schema.Schema<ResourceId> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceId" }) as any as Schema.Schema<ResourceId>;

export interface Project {
  /** The number uniquely identifying the project. Example: `415104041262` Read-only. */
  projectNumber?: string;
  /** The unique, user-assigned ID of the Project. It must be 6 to 30 lowercase letters, digits, or hyphens. It must start with a letter. Trailing hyphens are prohibited. Example: `tokyo-rain-123` Read-only after creation. */
  projectId?: string;
  /** The Project lifecycle state. Read-only. */
  lifecycleState?: "LIFECYCLE_STATE_UNSPECIFIED" | "ACTIVE" | "DELETE_REQUESTED" | "DELETE_IN_PROGRESS" | (string & {});
  /** The optional user-assigned display name of the Project. When present it must be between 4 to 30 characters. Allowed characters are: lowercase and uppercase letters, numbers, hyphen, single-quote, double-quote, space, and exclamation point. Example: `My Project` Read-write. */
  name?: string;
  /** Creation time. Read-only. */
  createTime?: string;
  /** The labels associated with this Project. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: a-z{0,62}. Label values must be between 0 and 63 characters long and must conform to the regular expression [a-z0-9_-]{0,63}. A label value can be empty. No more than 256 labels can be associated with a given resource. Clients should store labels in a representation such as JSON that does not depend on specific characters being disallowed. Example: "environment" : "dev" Read-write. */
  labels?: Record<string, string>;
  /** An optional reference to a parent Resource. Supported parent types include "organization" and "folder". Once set, the parent cannot be cleared. The `parent` can be set on creation or using the `UpdateProject` method; the end user must have the `resourcemanager.projects.create` permission on the parent. */
  parent?: ResourceId;
  /** Optional. Input only. Immutable. Tag keys/values directly bound to this project. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" Note: Currently this field is in Preview. */
  tags?: Record<string, string>;
  /** Output only. If this project is a Management Project, list of capabilities configured on the parent folder. Note, presence of any capability implies that this is a Management Project. Example: `folders/123/capabilities/app-management`. OUTPUT ONLY. */
  configuredCapabilities?: Array<string>;
}

export const Project: Schema.Schema<Project> = Schema.suspend(() => Schema.Struct({
  projectNumber: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  lifecycleState: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  parent: Schema.optional(ResourceId),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  configuredCapabilities: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Project" }) as any as Schema.Schema<Project>;

export interface ListProjectsResponse {
  /** The list of Projects that matched the list filter. This list can be paginated. */
  projects?: Array<Project>;
  /** Pagination token. If the result set is too large to fit in a single response, this token is returned. It encodes the position of the current result cursor. Feeding this value into a new list request with the `page_token` parameter gives the next page of the results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. Pagination tokens have a limited lifetime. */
  nextPageToken?: string;
}

export const ListProjectsResponse: Schema.Schema<ListProjectsResponse> = Schema.suspend(() => Schema.Struct({
  projects: Schema.optional(Schema.Array(Project)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListProjectsResponse" }) as any as Schema.Schema<ListProjectsResponse>;

export interface UndeleteProjectRequest {
}

export const UndeleteProjectRequest: Schema.Schema<UndeleteProjectRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UndeleteProjectRequest" }) as any as Schema.Schema<UndeleteProjectRequest>;

export interface GetAncestryRequest {
}

export const GetAncestryRequest: Schema.Schema<GetAncestryRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GetAncestryRequest" }) as any as Schema.Schema<GetAncestryRequest>;

export interface Ancestor {
  /** Resource id of the ancestor. */
  resourceId?: ResourceId;
}

export const Ancestor: Schema.Schema<Ancestor> = Schema.suspend(() => Schema.Struct({
  resourceId: Schema.optional(ResourceId),
})).annotate({ identifier: "Ancestor" }) as any as Schema.Schema<Ancestor>;

export interface GetAncestryResponse {
  /** Ancestors are ordered from bottom to top of the resource hierarchy. The first ancestor is the project itself, followed by the project's parent, etc.. */
  ancestor?: Array<Ancestor>;
}

export const GetAncestryResponse: Schema.Schema<GetAncestryResponse> = Schema.suspend(() => Schema.Struct({
  ancestor: Schema.optional(Schema.Array(Ancestor)),
})).annotate({ identifier: "GetAncestryResponse" }) as any as Schema.Schema<GetAncestryResponse>;

export interface ProjectCreationStatus {
  /** Creation time of the project creation workflow. */
  createTime?: string;
  /** True if the project can be retrieved using GetProject. No other operations on the project are guaranteed to work until the project creation is complete. */
  gettable?: boolean;
  /** True if the project creation process is complete. */
  ready?: boolean;
}

export const ProjectCreationStatus: Schema.Schema<ProjectCreationStatus> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  gettable: Schema.optional(Schema.Boolean),
  ready: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ProjectCreationStatus" }) as any as Schema.Schema<ProjectCreationStatus>;

export interface CloudresourcemanagerGoogleCloudResourcemanagerV2alpha1FolderOperation {
  /** The display name of the folder. */
  displayName?: string;
  /** The type of this operation. */
  operationType?: "OPERATION_TYPE_UNSPECIFIED" | "CREATE" | "MOVE" | (string & {});
  /** The resource name of the folder's parent. Only applicable when the operation_type is MOVE. */
  sourceParent?: string;
  /** The resource name of the folder or organization we are either creating the folder under or moving the folder to. */
  destinationParent?: string;
}

export const CloudresourcemanagerGoogleCloudResourcemanagerV2alpha1FolderOperation: Schema.Schema<CloudresourcemanagerGoogleCloudResourcemanagerV2alpha1FolderOperation> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  operationType: Schema.optional(Schema.String),
  sourceParent: Schema.optional(Schema.String),
  destinationParent: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudresourcemanagerGoogleCloudResourcemanagerV2alpha1FolderOperation" }) as any as Schema.Schema<CloudresourcemanagerGoogleCloudResourcemanagerV2alpha1FolderOperation>;

export interface FolderOperationError {
  /** The type of operation error experienced. */
  errorMessageId?: "ERROR_TYPE_UNSPECIFIED" | "ACTIVE_FOLDER_HEIGHT_VIOLATION" | "MAX_CHILD_FOLDERS_VIOLATION" | "FOLDER_NAME_UNIQUENESS_VIOLATION" | "RESOURCE_DELETED_VIOLATION" | "PARENT_DELETED_VIOLATION" | "CYCLE_INTRODUCED_VIOLATION" | "FOLDER_BEING_MOVED_VIOLATION" | "FOLDER_TO_DELETE_NON_EMPTY_VIOLATION" | "DELETED_FOLDER_HEIGHT_VIOLATION" | "FOLDER_TO_DELETE_CONFIGURED_CAPABILITY_VIOLATION" | (string & {});
}

export const FolderOperationError: Schema.Schema<FolderOperationError> = Schema.suspend(() => Schema.Struct({
  errorMessageId: Schema.optional(Schema.String),
})).annotate({ identifier: "FolderOperationError" }) as any as Schema.Schema<FolderOperationError>;

export interface CloudresourcemanagerGoogleCloudResourcemanagerV2beta1FolderOperation {
  /** The display name of the folder. */
  displayName?: string;
  /** The type of this operation. */
  operationType?: "OPERATION_TYPE_UNSPECIFIED" | "CREATE" | "MOVE" | (string & {});
  /** The resource name of the folder's parent. Only applicable when the operation_type is MOVE. */
  sourceParent?: string;
  /** The resource name of the folder or organization we are either creating the folder under or moving the folder to. */
  destinationParent?: string;
}

export const CloudresourcemanagerGoogleCloudResourcemanagerV2beta1FolderOperation: Schema.Schema<CloudresourcemanagerGoogleCloudResourcemanagerV2beta1FolderOperation> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  operationType: Schema.optional(Schema.String),
  sourceParent: Schema.optional(Schema.String),
  destinationParent: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudresourcemanagerGoogleCloudResourcemanagerV2beta1FolderOperation" }) as any as Schema.Schema<CloudresourcemanagerGoogleCloudResourcemanagerV2beta1FolderOperation>;

export interface FolderOperation {
  /** The display name of the folder. */
  displayName?: string;
  /** The type of this operation. */
  operationType?: "OPERATION_TYPE_UNSPECIFIED" | "CREATE" | "MOVE" | (string & {});
  /** The resource name of the folder's parent. Only applicable when the operation_type is MOVE. */
  sourceParent?: string;
  /** The resource name of the folder or organization we are either creating the folder under or moving the folder to. */
  destinationParent?: string;
}

export const FolderOperation: Schema.Schema<FolderOperation> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  operationType: Schema.optional(Schema.String),
  sourceParent: Schema.optional(Schema.String),
  destinationParent: Schema.optional(Schema.String),
})).annotate({ identifier: "FolderOperation" }) as any as Schema.Schema<FolderOperation>;

export interface DeleteOrganizationMetadata {
}

export const DeleteOrganizationMetadata: Schema.Schema<DeleteOrganizationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteOrganizationMetadata" }) as any as Schema.Schema<DeleteOrganizationMetadata>;

export interface UndeleteOrganizationMetadata {
}

export const UndeleteOrganizationMetadata: Schema.Schema<UndeleteOrganizationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UndeleteOrganizationMetadata" }) as any as Schema.Schema<UndeleteOrganizationMetadata>;

export interface CreateFolderMetadata {
  /** The display name of the folder. */
  displayName?: string;
  /** The resource name of the folder or organization we are creating the folder under. */
  parent?: string;
}

export const CreateFolderMetadata: Schema.Schema<CreateFolderMetadata> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateFolderMetadata" }) as any as Schema.Schema<CreateFolderMetadata>;

export interface UpdateFolderMetadata {
}

export const UpdateFolderMetadata: Schema.Schema<UpdateFolderMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UpdateFolderMetadata" }) as any as Schema.Schema<UpdateFolderMetadata>;

export interface MoveFolderMetadata {
  /** The display name of the folder. */
  displayName?: string;
  /** The resource name of the folder's parent. */
  sourceParent?: string;
  /** The resource name of the folder or organization to move the folder to. */
  destinationParent?: string;
}

export const MoveFolderMetadata: Schema.Schema<MoveFolderMetadata> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  sourceParent: Schema.optional(Schema.String),
  destinationParent: Schema.optional(Schema.String),
})).annotate({ identifier: "MoveFolderMetadata" }) as any as Schema.Schema<MoveFolderMetadata>;

export interface DeleteFolderMetadata {
}

export const DeleteFolderMetadata: Schema.Schema<DeleteFolderMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteFolderMetadata" }) as any as Schema.Schema<DeleteFolderMetadata>;

export interface UndeleteFolderMetadata {
}

export const UndeleteFolderMetadata: Schema.Schema<UndeleteFolderMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UndeleteFolderMetadata" }) as any as Schema.Schema<UndeleteFolderMetadata>;

export interface CreateProjectMetadata {
  /** Creation time of the project creation workflow. */
  createTime?: string;
  /** True if the project can be retrieved using `GetProject`. No other operations on the project are guaranteed to work until the project creation is complete. */
  gettable?: boolean;
  /** True if the project creation process is complete. */
  ready?: boolean;
}

export const CreateProjectMetadata: Schema.Schema<CreateProjectMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  gettable: Schema.optional(Schema.Boolean),
  ready: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CreateProjectMetadata" }) as any as Schema.Schema<CreateProjectMetadata>;

export interface UpdateProjectMetadata {
}

export const UpdateProjectMetadata: Schema.Schema<UpdateProjectMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UpdateProjectMetadata" }) as any as Schema.Schema<UpdateProjectMetadata>;

export interface MoveProjectMetadata {
}

export const MoveProjectMetadata: Schema.Schema<MoveProjectMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MoveProjectMetadata" }) as any as Schema.Schema<MoveProjectMetadata>;

export interface DeleteProjectMetadata {
}

export const DeleteProjectMetadata: Schema.Schema<DeleteProjectMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteProjectMetadata" }) as any as Schema.Schema<DeleteProjectMetadata>;

export interface UndeleteProjectMetadata {
}

export const UndeleteProjectMetadata: Schema.Schema<UndeleteProjectMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UndeleteProjectMetadata" }) as any as Schema.Schema<UndeleteProjectMetadata>;

export interface CreateTagKeyMetadata {
}

export const CreateTagKeyMetadata: Schema.Schema<CreateTagKeyMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CreateTagKeyMetadata" }) as any as Schema.Schema<CreateTagKeyMetadata>;

export interface UpdateTagKeyMetadata {
}

export const UpdateTagKeyMetadata: Schema.Schema<UpdateTagKeyMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UpdateTagKeyMetadata" }) as any as Schema.Schema<UpdateTagKeyMetadata>;

export interface DeleteTagKeyMetadata {
}

export const DeleteTagKeyMetadata: Schema.Schema<DeleteTagKeyMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteTagKeyMetadata" }) as any as Schema.Schema<DeleteTagKeyMetadata>;

export interface CreateTagValueMetadata {
}

export const CreateTagValueMetadata: Schema.Schema<CreateTagValueMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CreateTagValueMetadata" }) as any as Schema.Schema<CreateTagValueMetadata>;

export interface UpdateTagValueMetadata {
}

export const UpdateTagValueMetadata: Schema.Schema<UpdateTagValueMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UpdateTagValueMetadata" }) as any as Schema.Schema<UpdateTagValueMetadata>;

export interface DeleteTagValueMetadata {
}

export const DeleteTagValueMetadata: Schema.Schema<DeleteTagValueMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteTagValueMetadata" }) as any as Schema.Schema<DeleteTagValueMetadata>;

export interface CreateTagBindingMetadata {
}

export const CreateTagBindingMetadata: Schema.Schema<CreateTagBindingMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CreateTagBindingMetadata" }) as any as Schema.Schema<CreateTagBindingMetadata>;

export interface DeleteTagBindingMetadata {
}

export const DeleteTagBindingMetadata: Schema.Schema<DeleteTagBindingMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteTagBindingMetadata" }) as any as Schema.Schema<DeleteTagBindingMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListLiensRequest {
  /** Required. The name of the resource to list all attached Liens. For example, `projects/1234`. (google.api.field_policy).resource_type annotation is not set since the parent depends on the meta api implementation. This field could be a project or other sub project resources. */
  parent?: string;
  /** The maximum number of items to return. This is a suggestion for the server. The server can return fewer liens than requested. If unspecified, server picks an appropriate default. */
  pageSize?: number;
  /** The `next_page_token` value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListLiensRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/liens" }),
  svc,
) as unknown as Schema.Schema<ListLiensRequest>;

export type ListLiensResponse_Op = ListLiensResponse;
export const ListLiensResponse_Op = ListLiensResponse;

export type ListLiensError = CommonErrors;

/** List all Liens applied to the `parent` resource. Callers of this method will require permission on the `parent` resource. For example, a Lien with a `parent` of `projects/1234` requires permission `resourcemanager.projects.get`. */
export const listLiens: API.PaginatedOperationMethod<ListLiensRequest, ListLiensResponse_Op, ListLiensError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListLiensRequest,
  output: ListLiensResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetLiensRequest {
  /** Required. The name/identifier of the Lien. */
  name: string;
}

export const GetLiensRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/liens/{liensId}" }),
  svc,
) as unknown as Schema.Schema<GetLiensRequest>;

export type GetLiensResponse = Lien;
export const GetLiensResponse = Lien;

export type GetLiensError = CommonErrors;

/** Retrieve a Lien by `name`. Callers of this method will require permission on the `parent` resource. For example, a Lien with a `parent` of `projects/1234` requires permission `resourcemanager.projects.get` */
export const getLiens: API.OperationMethod<GetLiensRequest, GetLiensResponse, GetLiensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLiensRequest,
  output: GetLiensResponse,
  errors: [],
}));

export interface CreateLiensRequest {
  /** Request body */
  body?: Lien;
}

export const CreateLiensRequest = Schema.Struct({
  body: Schema.optional(Lien).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/liens", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateLiensRequest>;

export type CreateLiensResponse = Lien;
export const CreateLiensResponse = Lien;

export type CreateLiensError = CommonErrors;

/** Create a Lien which applies to the resource denoted by the `parent` field. Callers of this method will require permission on the `parent` resource. For example, applying to `projects/1234` requires permission `resourcemanager.projects.updateLiens`. NOTE: Some resources may limit the number of Liens which may be applied. */
export const createLiens: API.OperationMethod<CreateLiensRequest, CreateLiensResponse, CreateLiensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateLiensRequest,
  output: CreateLiensResponse,
  errors: [],
}));

export interface DeleteLiensRequest {
  /** Required. The name/identifier of the Lien to delete. */
  name: string;
}

export const DeleteLiensRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/liens/{liensId}" }),
  svc,
) as unknown as Schema.Schema<DeleteLiensRequest>;

export type DeleteLiensResponse = Empty;
export const DeleteLiensResponse = Empty;

export type DeleteLiensError = CommonErrors;

/** Delete a Lien by `name`. Callers of this method will require permission on the `parent` resource. For example, a Lien with a `parent` of `projects/1234` requires permission `resourcemanager.projects.updateLiens`. */
export const deleteLiens: API.OperationMethod<DeleteLiensRequest, DeleteLiensResponse, DeleteLiensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteLiensRequest,
  output: DeleteLiensResponse,
  errors: [],
}));

export interface ListAvailableOrgPolicyConstraintsProjectsRequest {
  /** Name of the resource to list `Constraints` for. */
  resource: string;
  /** Request body */
  body?: ListAvailableOrgPolicyConstraintsRequest;
}

export const ListAvailableOrgPolicyConstraintsProjectsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(ListAvailableOrgPolicyConstraintsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}:listAvailableOrgPolicyConstraints", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ListAvailableOrgPolicyConstraintsProjectsRequest>;

export type ListAvailableOrgPolicyConstraintsProjectsResponse = ListAvailableOrgPolicyConstraintsResponse;
export const ListAvailableOrgPolicyConstraintsProjectsResponse = ListAvailableOrgPolicyConstraintsResponse;

export type ListAvailableOrgPolicyConstraintsProjectsError = CommonErrors;

/** Lists `Constraints` that could be applied on the specified resource. */
export const listAvailableOrgPolicyConstraintsProjects: API.OperationMethod<ListAvailableOrgPolicyConstraintsProjectsRequest, ListAvailableOrgPolicyConstraintsProjectsResponse, ListAvailableOrgPolicyConstraintsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListAvailableOrgPolicyConstraintsProjectsRequest,
  output: ListAvailableOrgPolicyConstraintsProjectsResponse,
  errors: [],
}));

export interface ListOrgPoliciesProjectsRequest {
  /** Name of the resource to list Policies for. */
  resource: string;
  /** Request body */
  body?: ListOrgPoliciesRequest;
}

export const ListOrgPoliciesProjectsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(ListOrgPoliciesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}:listOrgPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ListOrgPoliciesProjectsRequest>;

export type ListOrgPoliciesProjectsResponse = ListOrgPoliciesResponse;
export const ListOrgPoliciesProjectsResponse = ListOrgPoliciesResponse;

export type ListOrgPoliciesProjectsError = CommonErrors;

/** Lists all the `Policies` set for a particular resource. */
export const listOrgPoliciesProjects: API.OperationMethod<ListOrgPoliciesProjectsRequest, ListOrgPoliciesProjectsResponse, ListOrgPoliciesProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListOrgPoliciesProjectsRequest,
  output: ListOrgPoliciesProjectsResponse,
  errors: [],
}));

export interface GetOrgPolicyProjectsRequest {
  /** Name of the resource the `Policy` is set on. */
  resource: string;
  /** Request body */
  body?: GetOrgPolicyRequest;
}

export const GetOrgPolicyProjectsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetOrgPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}:getOrgPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetOrgPolicyProjectsRequest>;

export type GetOrgPolicyProjectsResponse = OrgPolicy;
export const GetOrgPolicyProjectsResponse = OrgPolicy;

export type GetOrgPolicyProjectsError = CommonErrors;

/** Gets a `Policy` on a resource. If no `Policy` is set on the resource, a `Policy` is returned with default values including `POLICY_TYPE_NOT_SET` for the `policy_type oneof`. The `etag` value can be used with `SetOrgPolicy()` to create or update a `Policy` during read-modify-write. */
export const getOrgPolicyProjects: API.OperationMethod<GetOrgPolicyProjectsRequest, GetOrgPolicyProjectsResponse, GetOrgPolicyProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrgPolicyProjectsRequest,
  output: GetOrgPolicyProjectsResponse,
  errors: [],
}));

export interface GetEffectiveOrgPolicyProjectsRequest {
  /** The name of the resource to start computing the effective `Policy`. */
  resource: string;
  /** Request body */
  body?: GetEffectiveOrgPolicyRequest;
}

export const GetEffectiveOrgPolicyProjectsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetEffectiveOrgPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}:getEffectiveOrgPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetEffectiveOrgPolicyProjectsRequest>;

export type GetEffectiveOrgPolicyProjectsResponse = OrgPolicy;
export const GetEffectiveOrgPolicyProjectsResponse = OrgPolicy;

export type GetEffectiveOrgPolicyProjectsError = CommonErrors;

/** Gets the effective `Policy` on a resource. This is the result of merging `Policies` in the resource hierarchy. The returned `Policy` will not have an `etag`set because it is a computed `Policy` across multiple resources. Subtrees of Resource Manager resource hierarchy with 'under:' prefix will not be expanded. */
export const getEffectiveOrgPolicyProjects: API.OperationMethod<GetEffectiveOrgPolicyProjectsRequest, GetEffectiveOrgPolicyProjectsResponse, GetEffectiveOrgPolicyProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEffectiveOrgPolicyProjectsRequest,
  output: GetEffectiveOrgPolicyProjectsResponse,
  errors: [],
}));

export interface SetOrgPolicyProjectsRequest {
  /** Resource name of the resource to attach the `Policy`. */
  resource: string;
  /** Request body */
  body?: SetOrgPolicyRequest;
}

export const SetOrgPolicyProjectsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetOrgPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}:setOrgPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetOrgPolicyProjectsRequest>;

export type SetOrgPolicyProjectsResponse = OrgPolicy;
export const SetOrgPolicyProjectsResponse = OrgPolicy;

export type SetOrgPolicyProjectsError = CommonErrors;

/** Updates the specified `Policy` on the resource. Creates a new `Policy` for that `Constraint` on the resource if one does not exist. Not supplying an `etag` on the request `Policy` results in an unconditional write of the `Policy`. */
export const setOrgPolicyProjects: API.OperationMethod<SetOrgPolicyProjectsRequest, SetOrgPolicyProjectsResponse, SetOrgPolicyProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetOrgPolicyProjectsRequest,
  output: SetOrgPolicyProjectsResponse,
  errors: [],
}));

export interface ClearOrgPolicyProjectsRequest {
  /** Name of the resource for the `Policy` to clear. */
  resource: string;
  /** Request body */
  body?: ClearOrgPolicyRequest;
}

export const ClearOrgPolicyProjectsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(ClearOrgPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}:clearOrgPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ClearOrgPolicyProjectsRequest>;

export type ClearOrgPolicyProjectsResponse = Empty;
export const ClearOrgPolicyProjectsResponse = Empty;

export type ClearOrgPolicyProjectsError = CommonErrors;

/** Clears a `Policy` from a resource. */
export const clearOrgPolicyProjects: API.OperationMethod<ClearOrgPolicyProjectsRequest, ClearOrgPolicyProjectsResponse, ClearOrgPolicyProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ClearOrgPolicyProjectsRequest,
  output: ClearOrgPolicyProjectsResponse,
  errors: [],
}));

export interface GetProjectsRequest {
  /** Required. The Project ID (for example, `my-project-123`). */
  projectId: string;
}

export const GetProjectsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsRequest>;

export type GetProjectsResponse = Project;
export const GetProjectsResponse = Project;

export type GetProjectsError = CommonErrors;

/** Retrieves the Project identified by the specified `project_id` (for example, `my-project-123`). The caller must have read permissions for this Project. */
export const getProjects: API.OperationMethod<GetProjectsRequest, GetProjectsResponse, GetProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsRequest,
  output: GetProjectsResponse,
  errors: [],
}));

export interface ListProjectsRequest {
  /** Optional. A pagination token returned from a previous call to ListProjects that indicates from where listing should continue. */
  pageToken?: string;
  /** Optional. The maximum number of Projects to return in the response. The server can return fewer Projects than requested. If unspecified, server picks an appropriate default. */
  pageSize?: number;
  /** Optional. An expression for filtering the results of the request. Filter rules are case insensitive. If multiple fields are included in a filter query, the query will return results that match any of the fields. Some eligible fields for filtering are: + `name` + `id` + `labels.` (where *key* is the name of a label) + `parent.type` + `parent.id` + `lifecycleState` Some examples of filter queries: | Query | Description | |------------------|-----------------------------------------------------| | name:how* | The project's name starts with "how". | | name:Howl | The project's name is `Howl` or `howl`. | | name:HOWL | Equivalent to above. | | NAME:howl | Equivalent to above. | | labels.color:* | The project has the label `color`. | | labels.color:red | The project's label `color` has the value `red`. | | labels.color:red labels.size:big | The project's label `color` has the value `red` or its label `size` has the value `big`. | | lifecycleState:DELETE_REQUESTED | Only show projects that are pending deletion.| If no filter is specified, the call will return projects for which the user has the `resourcemanager.projects.get` permission. NOTE: To perform a by-parent query (eg., what projects are directly in a Folder), the caller must have the `resourcemanager.projects.list` permission on the parent and the filter must contain both a `parent.type` and a `parent.id` restriction (example: "parent.type:folder parent.id:123"). In this case an alternate search index is used which provides more consistent results. */
  filter?: string;
}

export const ListProjectsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects" }),
  svc,
) as unknown as Schema.Schema<ListProjectsRequest>;

export type ListProjectsResponse_Op = ListProjectsResponse;
export const ListProjectsResponse_Op = ListProjectsResponse;

export type ListProjectsError = CommonErrors;

/** Lists Projects that the caller has the `resourcemanager.projects.get` permission on and satisfy the specified filter. This method returns Projects in an unspecified order. This method is eventually consistent with project mutations; this means that a newly created project may not appear in the results or recent updates to an existing project may not be reflected in the results. To retrieve the latest state of a project, use the GetProject method. NOTE: If the request filter contains a `parent.type` and `parent.id` and the caller has the `resourcemanager.projects.list` permission on the parent, the results will be drawn from an alternate index which provides more consistent results. In future versions of this API, this List method will be split into List and Search to properly capture the behavioral difference. */
export const listProjects: API.PaginatedOperationMethod<ListProjectsRequest, ListProjectsResponse_Op, ListProjectsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsRequest,
  output: ListProjectsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsRequest {
  /** Request body */
  body?: Project;
}

export const CreateProjectsRequest = Schema.Struct({
  body: Schema.optional(Project).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsRequest>;

export type CreateProjectsResponse = Operation;
export const CreateProjectsResponse = Operation;

export type CreateProjectsError = CommonErrors;

/** Request that a new Project be created. The result is an Operation which can be used to track the creation process. This process usually takes a few seconds, but can sometimes take much longer. The tracking Operation is automatically deleted after a few hours, so there is no need to call DeleteOperation. Authorization requires the Google IAM permission `resourcemanager.projects.create` on the specified parent for the new project. The parent is identified by a specified ResourceId, which must include both an ID and a type, such as organization. This method does not associate the new project with a billing account. You can set or update the billing account associated with a project using the [`projects.updateBillingInfo`] (/billing/reference/rest/v1/projects/updateBillingInfo) method. */
export const createProjects: API.OperationMethod<CreateProjectsRequest, CreateProjectsResponse, CreateProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsRequest,
  output: CreateProjectsResponse,
  errors: [],
}));

export interface UpdateProjectsRequest {
  /** The project ID (for example, `my-project-123`). Required. */
  projectId: string;
  /** Request body */
  body?: Project;
}

export const UpdateProjectsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(Project).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsRequest>;

export type UpdateProjectsResponse = Project;
export const UpdateProjectsResponse = Project;

export type UpdateProjectsError = CommonErrors;

/** Updates the attributes of the Project identified by the specified `project_id` (for example, `my-project-123`). The caller must have modify permissions for this Project. */
export const updateProjects: API.OperationMethod<UpdateProjectsRequest, UpdateProjectsResponse, UpdateProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsRequest,
  output: UpdateProjectsResponse,
  errors: [],
}));

export interface DeleteProjectsRequest {
  /** The Project ID (for example, `foo-bar-123`). Required. */
  projectId: string;
}

export const DeleteProjectsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsRequest>;

export type DeleteProjectsResponse = Empty;
export const DeleteProjectsResponse = Empty;

export type DeleteProjectsError = CommonErrors;

/** Marks the Project identified by the specified `project_id` (for example, `my-project-123`) for deletion. This method will only affect the Project if it has a lifecycle state of ACTIVE. This method changes the Project's lifecycle state from ACTIVE to DELETE_REQUESTED. The deletion starts at an unspecified time, at which point the Project is no longer accessible. Until the deletion completes, you can check the lifecycle state checked by retrieving the Project with GetProject, and the Project remains visible to ListProjects. However, you cannot update the project. After the deletion completes, the Project is not retrievable by the GetProject and ListProjects methods. The caller must have delete permissions for this Project. */
export const deleteProjects: API.OperationMethod<DeleteProjectsRequest, DeleteProjectsResponse, DeleteProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsRequest,
  output: DeleteProjectsResponse,
  errors: [],
}));

export interface UndeleteProjectsRequest {
  /** Required. The project ID (for example, `foo-bar-123`). */
  projectId: string;
  /** Request body */
  body?: UndeleteProjectRequest;
}

export const UndeleteProjectsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(UndeleteProjectRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectsRequest>;

export type UndeleteProjectsResponse = Empty;
export const UndeleteProjectsResponse = Empty;

export type UndeleteProjectsError = CommonErrors;

/** Restores the Project identified by the specified `project_id` (for example, `my-project-123`). You can only use this method for a Project that has a lifecycle state of DELETE_REQUESTED. After deletion starts, the Project cannot be restored. The caller must have undelete permissions for this Project. */
export const undeleteProjects: API.OperationMethod<UndeleteProjectsRequest, UndeleteProjectsResponse, UndeleteProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteProjectsRequest,
  output: UndeleteProjectsResponse,
  errors: [],
}));

export interface GetAncestryProjectsRequest {
  /** Required. The Project ID (for example, `my-project-123`). */
  projectId: string;
  /** Request body */
  body?: GetAncestryRequest;
}

export const GetAncestryProjectsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(GetAncestryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectId}:getAncestry", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetAncestryProjectsRequest>;

export type GetAncestryProjectsResponse = GetAncestryResponse;
export const GetAncestryProjectsResponse = GetAncestryResponse;

export type GetAncestryProjectsError = CommonErrors;

/** Gets a list of ancestors in the resource hierarchy for the Project identified by the specified `project_id` (for example, `my-project-123`). The caller must have read permissions for this Project. */
export const getAncestryProjects: API.OperationMethod<GetAncestryProjectsRequest, GetAncestryProjectsResponse, GetAncestryProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAncestryProjectsRequest,
  output: GetAncestryProjectsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{resource}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsRequest>;

export type GetIamPolicyProjectsResponse = Policy;
export const GetIamPolicyProjectsResponse = Policy;

export type GetIamPolicyProjectsError = CommonErrors;

/** Returns the IAM access control policy for the specified Project. Permission is denied if the policy or the resource does not exist. Authorization requires the Google IAM permission `resourcemanager.projects.getIamPolicy` on the project. For additional information about `resource` (e.g. my-project-id) structure and identification, see [Resource Names](https://cloud.google.com/apis/design/resource_names). */
export const getIamPolicyProjects: API.OperationMethod<GetIamPolicyProjectsRequest, GetIamPolicyProjectsResponse, GetIamPolicyProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsRequest,
  output: GetIamPolicyProjectsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{resource}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsRequest>;

export type SetIamPolicyProjectsResponse = Policy;
export const SetIamPolicyProjectsResponse = Policy;

export type SetIamPolicyProjectsError = CommonErrors;

/** Sets the IAM access control policy for the specified Project. CAUTION: This method will replace the existing policy, and cannot be used to append additional IAM settings. NOTE: Removing service accounts from policies or changing their roles can render services completely inoperable. It is important to understand how the service account is being used before removing or updating its roles. For additional information about `resource` (e.g. my-project-id) structure and identification, see [Resource Names](https://cloud.google.com/apis/design/resource_names). The following constraints apply when using `setIamPolicy()`: + Project does not support `allUsers` and `allAuthenticatedUsers` as `members` in a `Binding` of a `Policy`. + The owner role can be granted to a `user`, `serviceAccount`, or a group that is part of an organization. For example, group@myownpersonaldomain.com could be added as an owner to a project in the myownpersonaldomain.com organization, but not the examplepetstore.com organization. + Service accounts can be made owners of a project directly without any restrictions. However, to be added as an owner, a user must be invited via Cloud Platform console and must accept the invitation. + A user cannot be granted the owner role using `setIamPolicy()`. The user must be granted the owner role using the Cloud Platform Console and must explicitly accept the invitation. + You can only grant ownership of a project to a member by using the Google Cloud console. Inviting a member will deliver an invitation email that they must accept. An invitation email is not generated if you are granting a role other than owner, or if both the member you are inviting and the project are part of your organization. + If the project is not part of an organization, there must be at least one owner who has accepted the Terms of Service (ToS) agreement in the policy. Calling `setIamPolicy()` to remove the last ToS-accepted owner from the policy will fail. This restriction also applies to legacy projects that no longer have owners who have accepted the ToS. Edits to IAM policies will be rejected until the lack of a ToS-accepting owner is rectified. If the project is part of an organization, you can remove all owners, potentially making the organization inaccessible. Authorization requires the Google IAM permission `resourcemanager.projects.setIamPolicy` on the project */
export const setIamPolicyProjects: API.OperationMethod<SetIamPolicyProjectsRequest, SetIamPolicyProjectsResponse, SetIamPolicyProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsRequest,
  output: SetIamPolicyProjectsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{resource}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsRequest>;

export type TestIamPermissionsProjectsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsError = CommonErrors;

/** Returns permissions that a caller has on the specified Project. For additional information about `resource` (e.g. my-project-id) structure and identification, see [Resource Names](https://cloud.google.com/apis/design/resource_names). There are no permissions required for making this API call. */
export const testIamPermissionsProjects: API.OperationMethod<TestIamPermissionsProjectsRequest, TestIamPermissionsProjectsResponse, TestIamPermissionsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsRequest,
  output: TestIamPermissionsProjectsResponse,
  errors: [],
}));

export interface ListAvailableOrgPolicyConstraintsFoldersRequest {
  /** Name of the resource to list `Constraints` for. */
  resource: string;
  /** Request body */
  body?: ListAvailableOrgPolicyConstraintsRequest;
}

export const ListAvailableOrgPolicyConstraintsFoldersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(ListAvailableOrgPolicyConstraintsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}:listAvailableOrgPolicyConstraints", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ListAvailableOrgPolicyConstraintsFoldersRequest>;

export type ListAvailableOrgPolicyConstraintsFoldersResponse = ListAvailableOrgPolicyConstraintsResponse;
export const ListAvailableOrgPolicyConstraintsFoldersResponse = ListAvailableOrgPolicyConstraintsResponse;

export type ListAvailableOrgPolicyConstraintsFoldersError = CommonErrors;

/** Lists `Constraints` that could be applied on the specified resource. */
export const listAvailableOrgPolicyConstraintsFolders: API.OperationMethod<ListAvailableOrgPolicyConstraintsFoldersRequest, ListAvailableOrgPolicyConstraintsFoldersResponse, ListAvailableOrgPolicyConstraintsFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListAvailableOrgPolicyConstraintsFoldersRequest,
  output: ListAvailableOrgPolicyConstraintsFoldersResponse,
  errors: [],
}));

export interface ListOrgPoliciesFoldersRequest {
  /** Name of the resource to list Policies for. */
  resource: string;
  /** Request body */
  body?: ListOrgPoliciesRequest;
}

export const ListOrgPoliciesFoldersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(ListOrgPoliciesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}:listOrgPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ListOrgPoliciesFoldersRequest>;

export type ListOrgPoliciesFoldersResponse = ListOrgPoliciesResponse;
export const ListOrgPoliciesFoldersResponse = ListOrgPoliciesResponse;

export type ListOrgPoliciesFoldersError = CommonErrors;

/** Lists all the `Policies` set for a particular resource. */
export const listOrgPoliciesFolders: API.OperationMethod<ListOrgPoliciesFoldersRequest, ListOrgPoliciesFoldersResponse, ListOrgPoliciesFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListOrgPoliciesFoldersRequest,
  output: ListOrgPoliciesFoldersResponse,
  errors: [],
}));

export interface GetOrgPolicyFoldersRequest {
  /** Name of the resource the `Policy` is set on. */
  resource: string;
  /** Request body */
  body?: GetOrgPolicyRequest;
}

export const GetOrgPolicyFoldersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetOrgPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}:getOrgPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetOrgPolicyFoldersRequest>;

export type GetOrgPolicyFoldersResponse = OrgPolicy;
export const GetOrgPolicyFoldersResponse = OrgPolicy;

export type GetOrgPolicyFoldersError = CommonErrors;

/** Gets a `Policy` on a resource. If no `Policy` is set on the resource, a `Policy` is returned with default values including `POLICY_TYPE_NOT_SET` for the `policy_type oneof`. The `etag` value can be used with `SetOrgPolicy()` to create or update a `Policy` during read-modify-write. */
export const getOrgPolicyFolders: API.OperationMethod<GetOrgPolicyFoldersRequest, GetOrgPolicyFoldersResponse, GetOrgPolicyFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrgPolicyFoldersRequest,
  output: GetOrgPolicyFoldersResponse,
  errors: [],
}));

export interface GetEffectiveOrgPolicyFoldersRequest {
  /** The name of the resource to start computing the effective `Policy`. */
  resource: string;
  /** Request body */
  body?: GetEffectiveOrgPolicyRequest;
}

export const GetEffectiveOrgPolicyFoldersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetEffectiveOrgPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}:getEffectiveOrgPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetEffectiveOrgPolicyFoldersRequest>;

export type GetEffectiveOrgPolicyFoldersResponse = OrgPolicy;
export const GetEffectiveOrgPolicyFoldersResponse = OrgPolicy;

export type GetEffectiveOrgPolicyFoldersError = CommonErrors;

/** Gets the effective `Policy` on a resource. This is the result of merging `Policies` in the resource hierarchy. The returned `Policy` will not have an `etag`set because it is a computed `Policy` across multiple resources. Subtrees of Resource Manager resource hierarchy with 'under:' prefix will not be expanded. */
export const getEffectiveOrgPolicyFolders: API.OperationMethod<GetEffectiveOrgPolicyFoldersRequest, GetEffectiveOrgPolicyFoldersResponse, GetEffectiveOrgPolicyFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEffectiveOrgPolicyFoldersRequest,
  output: GetEffectiveOrgPolicyFoldersResponse,
  errors: [],
}));

export interface SetOrgPolicyFoldersRequest {
  /** Resource name of the resource to attach the `Policy`. */
  resource: string;
  /** Request body */
  body?: SetOrgPolicyRequest;
}

export const SetOrgPolicyFoldersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetOrgPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}:setOrgPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetOrgPolicyFoldersRequest>;

export type SetOrgPolicyFoldersResponse = OrgPolicy;
export const SetOrgPolicyFoldersResponse = OrgPolicy;

export type SetOrgPolicyFoldersError = CommonErrors;

/** Updates the specified `Policy` on the resource. Creates a new `Policy` for that `Constraint` on the resource if one does not exist. Not supplying an `etag` on the request `Policy` results in an unconditional write of the `Policy`. */
export const setOrgPolicyFolders: API.OperationMethod<SetOrgPolicyFoldersRequest, SetOrgPolicyFoldersResponse, SetOrgPolicyFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetOrgPolicyFoldersRequest,
  output: SetOrgPolicyFoldersResponse,
  errors: [],
}));

export interface ClearOrgPolicyFoldersRequest {
  /** Name of the resource for the `Policy` to clear. */
  resource: string;
  /** Request body */
  body?: ClearOrgPolicyRequest;
}

export const ClearOrgPolicyFoldersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(ClearOrgPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}:clearOrgPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ClearOrgPolicyFoldersRequest>;

export type ClearOrgPolicyFoldersResponse = Empty;
export const ClearOrgPolicyFoldersResponse = Empty;

export type ClearOrgPolicyFoldersError = CommonErrors;

/** Clears a `Policy` from a resource. */
export const clearOrgPolicyFolders: API.OperationMethod<ClearOrgPolicyFoldersRequest, ClearOrgPolicyFoldersResponse, ClearOrgPolicyFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ClearOrgPolicyFoldersRequest,
  output: ClearOrgPolicyFoldersResponse,
  errors: [],
}));

export interface ListAvailableOrgPolicyConstraintsOrganizationsRequest {
  /** Name of the resource to list `Constraints` for. */
  resource: string;
  /** Request body */
  body?: ListAvailableOrgPolicyConstraintsRequest;
}

export const ListAvailableOrgPolicyConstraintsOrganizationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(ListAvailableOrgPolicyConstraintsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}:listAvailableOrgPolicyConstraints", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ListAvailableOrgPolicyConstraintsOrganizationsRequest>;

export type ListAvailableOrgPolicyConstraintsOrganizationsResponse = ListAvailableOrgPolicyConstraintsResponse;
export const ListAvailableOrgPolicyConstraintsOrganizationsResponse = ListAvailableOrgPolicyConstraintsResponse;

export type ListAvailableOrgPolicyConstraintsOrganizationsError = CommonErrors;

/** Lists `Constraints` that could be applied on the specified resource. */
export const listAvailableOrgPolicyConstraintsOrganizations: API.OperationMethod<ListAvailableOrgPolicyConstraintsOrganizationsRequest, ListAvailableOrgPolicyConstraintsOrganizationsResponse, ListAvailableOrgPolicyConstraintsOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListAvailableOrgPolicyConstraintsOrganizationsRequest,
  output: ListAvailableOrgPolicyConstraintsOrganizationsResponse,
  errors: [],
}));

export interface ListOrgPoliciesOrganizationsRequest {
  /** Name of the resource to list Policies for. */
  resource: string;
  /** Request body */
  body?: ListOrgPoliciesRequest;
}

export const ListOrgPoliciesOrganizationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(ListOrgPoliciesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}:listOrgPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ListOrgPoliciesOrganizationsRequest>;

export type ListOrgPoliciesOrganizationsResponse = ListOrgPoliciesResponse;
export const ListOrgPoliciesOrganizationsResponse = ListOrgPoliciesResponse;

export type ListOrgPoliciesOrganizationsError = CommonErrors;

/** Lists all the `Policies` set for a particular resource. */
export const listOrgPoliciesOrganizations: API.OperationMethod<ListOrgPoliciesOrganizationsRequest, ListOrgPoliciesOrganizationsResponse, ListOrgPoliciesOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListOrgPoliciesOrganizationsRequest,
  output: ListOrgPoliciesOrganizationsResponse,
  errors: [],
}));

export interface GetOrgPolicyOrganizationsRequest {
  /** Name of the resource the `Policy` is set on. */
  resource: string;
  /** Request body */
  body?: GetOrgPolicyRequest;
}

export const GetOrgPolicyOrganizationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetOrgPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}:getOrgPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetOrgPolicyOrganizationsRequest>;

export type GetOrgPolicyOrganizationsResponse = OrgPolicy;
export const GetOrgPolicyOrganizationsResponse = OrgPolicy;

export type GetOrgPolicyOrganizationsError = CommonErrors;

/** Gets a `Policy` on a resource. If no `Policy` is set on the resource, a `Policy` is returned with default values including `POLICY_TYPE_NOT_SET` for the `policy_type oneof`. The `etag` value can be used with `SetOrgPolicy()` to create or update a `Policy` during read-modify-write. */
export const getOrgPolicyOrganizations: API.OperationMethod<GetOrgPolicyOrganizationsRequest, GetOrgPolicyOrganizationsResponse, GetOrgPolicyOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrgPolicyOrganizationsRequest,
  output: GetOrgPolicyOrganizationsResponse,
  errors: [],
}));

export interface GetEffectiveOrgPolicyOrganizationsRequest {
  /** The name of the resource to start computing the effective `Policy`. */
  resource: string;
  /** Request body */
  body?: GetEffectiveOrgPolicyRequest;
}

export const GetEffectiveOrgPolicyOrganizationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetEffectiveOrgPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}:getEffectiveOrgPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetEffectiveOrgPolicyOrganizationsRequest>;

export type GetEffectiveOrgPolicyOrganizationsResponse = OrgPolicy;
export const GetEffectiveOrgPolicyOrganizationsResponse = OrgPolicy;

export type GetEffectiveOrgPolicyOrganizationsError = CommonErrors;

/** Gets the effective `Policy` on a resource. This is the result of merging `Policies` in the resource hierarchy. The returned `Policy` will not have an `etag`set because it is a computed `Policy` across multiple resources. Subtrees of Resource Manager resource hierarchy with 'under:' prefix will not be expanded. */
export const getEffectiveOrgPolicyOrganizations: API.OperationMethod<GetEffectiveOrgPolicyOrganizationsRequest, GetEffectiveOrgPolicyOrganizationsResponse, GetEffectiveOrgPolicyOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEffectiveOrgPolicyOrganizationsRequest,
  output: GetEffectiveOrgPolicyOrganizationsResponse,
  errors: [],
}));

export interface SetOrgPolicyOrganizationsRequest {
  /** Resource name of the resource to attach the `Policy`. */
  resource: string;
  /** Request body */
  body?: SetOrgPolicyRequest;
}

export const SetOrgPolicyOrganizationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetOrgPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}:setOrgPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetOrgPolicyOrganizationsRequest>;

export type SetOrgPolicyOrganizationsResponse = OrgPolicy;
export const SetOrgPolicyOrganizationsResponse = OrgPolicy;

export type SetOrgPolicyOrganizationsError = CommonErrors;

/** Updates the specified `Policy` on the resource. Creates a new `Policy` for that `Constraint` on the resource if one does not exist. Not supplying an `etag` on the request `Policy` results in an unconditional write of the `Policy`. */
export const setOrgPolicyOrganizations: API.OperationMethod<SetOrgPolicyOrganizationsRequest, SetOrgPolicyOrganizationsResponse, SetOrgPolicyOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetOrgPolicyOrganizationsRequest,
  output: SetOrgPolicyOrganizationsResponse,
  errors: [],
}));

export interface ClearOrgPolicyOrganizationsRequest {
  /** Name of the resource for the `Policy` to clear. */
  resource: string;
  /** Request body */
  body?: ClearOrgPolicyRequest;
}

export const ClearOrgPolicyOrganizationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(ClearOrgPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}:clearOrgPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ClearOrgPolicyOrganizationsRequest>;

export type ClearOrgPolicyOrganizationsResponse = Empty;
export const ClearOrgPolicyOrganizationsResponse = Empty;

export type ClearOrgPolicyOrganizationsError = CommonErrors;

/** Clears a `Policy` from a resource. */
export const clearOrgPolicyOrganizations: API.OperationMethod<ClearOrgPolicyOrganizationsRequest, ClearOrgPolicyOrganizationsResponse, ClearOrgPolicyOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ClearOrgPolicyOrganizationsRequest,
  output: ClearOrgPolicyOrganizationsResponse,
  errors: [],
}));

export interface SearchOrganizationsRequest_Op {
  /** Request body */
  body?: SearchOrganizationsRequest;
}

export const SearchOrganizationsRequest_Op = Schema.Struct({
  body: Schema.optional(SearchOrganizationsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations:search", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchOrganizationsRequest_Op>;

export type SearchOrganizationsResponse_Op = SearchOrganizationsResponse;
export const SearchOrganizationsResponse_Op = SearchOrganizationsResponse;

export type SearchOrganizationsError = CommonErrors;

/** Searches Organization resources that are visible to the user and satisfy the specified filter. This method returns Organizations in an unspecified order. New Organizations do not necessarily appear at the end of the results. Search will only return organizations on which the user has the permission `resourcemanager.organizations.get` or has super admin privileges. */
export const searchOrganizations: API.OperationMethod<SearchOrganizationsRequest_Op, SearchOrganizationsResponse_Op, SearchOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchOrganizationsRequest_Op,
  output: SearchOrganizationsResponse_Op,
  errors: [],
}));

export interface GetOrganizationsRequest {
  /** The resource name of the Organization to fetch. This is the organization's relative path in the API, formatted as "organizations/[organizationId]". For example, "organizations/1234". */
  name: string;
}

export const GetOrganizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsRequest>;

export type GetOrganizationsResponse = Organization;
export const GetOrganizationsResponse = Organization;

export type GetOrganizationsError = CommonErrors;

/** Fetches an Organization resource identified by the specified resource name. */
export const getOrganizations: API.OperationMethod<GetOrganizationsRequest, GetOrganizationsResponse, GetOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsRequest,
  output: GetOrganizationsResponse,
  errors: [],
}));

export interface SetIamPolicyOrganizationsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyOrganizationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyOrganizationsRequest>;

export type SetIamPolicyOrganizationsResponse = Policy;
export const SetIamPolicyOrganizationsResponse = Policy;

export type SetIamPolicyOrganizationsError = CommonErrors;

/** Sets the access control policy on an Organization resource. Replaces any existing policy. The `resource` field should be the organization's resource name, e.g. "organizations/123". Authorization requires the Google IAM permission `resourcemanager.organizations.setIamPolicy` on the specified organization */
export const setIamPolicyOrganizations: API.OperationMethod<SetIamPolicyOrganizationsRequest, SetIamPolicyOrganizationsResponse, SetIamPolicyOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyOrganizationsRequest,
  output: SetIamPolicyOrganizationsResponse,
  errors: [],
}));

export interface GetIamPolicyOrganizationsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyOrganizationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyOrganizationsRequest>;

export type GetIamPolicyOrganizationsResponse = Policy;
export const GetIamPolicyOrganizationsResponse = Policy;

export type GetIamPolicyOrganizationsError = CommonErrors;

/** Gets the access control policy for an Organization resource. May be empty if no such policy or resource exists. The `resource` field should be the organization's resource name, e.g. "organizations/123". Authorization requires the Google IAM permission `resourcemanager.organizations.getIamPolicy` on the specified organization */
export const getIamPolicyOrganizations: API.OperationMethod<GetIamPolicyOrganizationsRequest, GetIamPolicyOrganizationsResponse, GetIamPolicyOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyOrganizationsRequest,
  output: GetIamPolicyOrganizationsResponse,
  errors: [],
}));

export interface TestIamPermissionsOrganizationsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsOrganizationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsOrganizationsRequest>;

export type TestIamPermissionsOrganizationsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsOrganizationsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsOrganizationsError = CommonErrors;

/** Returns permissions that a caller has on the specified Organization. The `resource` field should be the organization's resource name, e.g. "organizations/123". There are no permissions required for making this API call. */
export const testIamPermissionsOrganizations: API.OperationMethod<TestIamPermissionsOrganizationsRequest, TestIamPermissionsOrganizationsResponse, TestIamPermissionsOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsOrganizationsRequest,
  output: TestIamPermissionsOrganizationsResponse,
  errors: [],
}));

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

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = Operation;

export type GetOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getOperations: API.OperationMethod<GetOperationsRequest, GetOperationsResponse, GetOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

