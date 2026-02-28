// ==========================================================================
// Cloud Resource Manager API (cloudresourcemanager v3)
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
  version: "v3",
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

export interface Folder {
  /** Identifier. The resource name of the folder. Its format is `folders/{folder_id}`, for example: "folders/1234". */
  name?: string;
  /** Required. The folder's parent's resource name. Updates to the folder's parent must be performed using MoveFolder. */
  parent?: string;
  /** The folder's display name. A folder's display name must be unique amongst its siblings. For example, no two folders with the same parent can share the same display name. The display name must start and end with a letter or digit, may contain letters, digits, spaces, hyphens and underscores and can be no longer than 30 characters. This is captured by the regular expression: `[\p{L}\p{N}]([\p{L}\p{N}_- ]{0,28}[\p{L}\p{N}])?`. */
  displayName?: string;
  /** Output only. The lifecycle state of the folder. Updates to the state must be performed using DeleteFolder and UndeleteFolder. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETE_REQUESTED" | (string & {});
  /** Output only. Timestamp when the folder was created. */
  createTime?: string;
  /** Output only. Timestamp when the folder was last modified. */
  updateTime?: string;
  /** Output only. Timestamp when the folder was requested to be deleted. */
  deleteTime?: string;
  /** Output only. A checksum computed by the server based on the current value of the folder resource. This may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. Input only. Immutable. Tag keys/values directly bound to this folder. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" Note: Currently this field is in Preview. */
  tags?: Record<string, string>;
  /** Output only. Optional capabilities configured for this folder (via UpdateCapability API). Example: `folders/123/capabilities/app-management`. */
  configuredCapabilities?: Array<string>;
  /** Output only. Management Project associated with this folder (if app-management capability is enabled). Example: `projects/google-mp-123` OUTPUT ONLY. */
  managementProject?: string;
}

export const Folder: Schema.Schema<Folder> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  configuredCapabilities: Schema.optional(Schema.Array(Schema.String)),
  managementProject: Schema.optional(Schema.String),
})).annotate({ identifier: "Folder" }) as any as Schema.Schema<Folder>;

export interface ListFoldersResponse {
  /** A possibly paginated list of folders that are direct descendants of the specified parent resource. */
  folders?: Array<Folder>;
  /** A pagination token returned from a previous call to `ListFolders` that indicates from where listing should continue. */
  nextPageToken?: string;
}

export const ListFoldersResponse: Schema.Schema<ListFoldersResponse> = Schema.suspend(() => Schema.Struct({
  folders: Schema.optional(Schema.Array(Folder)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListFoldersResponse" }) as any as Schema.Schema<ListFoldersResponse>;

export interface SearchFoldersResponse {
  /** A possibly paginated folder search results. the specified parent resource. */
  folders?: Array<Folder>;
  /** A pagination token returned from a previous call to `SearchFolders` that indicates from where searching should continue. */
  nextPageToken?: string;
}

export const SearchFoldersResponse: Schema.Schema<SearchFoldersResponse> = Schema.suspend(() => Schema.Struct({
  folders: Schema.optional(Schema.Array(Folder)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchFoldersResponse" }) as any as Schema.Schema<SearchFoldersResponse>;

export interface MoveFolderRequest {
  /** Required. The resource name of the folder or organization which should be the folder's new parent. Must be of the form `folders/{folder_id}` or `organizations/{org_id}`. */
  destinationParent?: string;
}

export const MoveFolderRequest: Schema.Schema<MoveFolderRequest> = Schema.suspend(() => Schema.Struct({
  destinationParent: Schema.optional(Schema.String),
})).annotate({ identifier: "MoveFolderRequest" }) as any as Schema.Schema<MoveFolderRequest>;

export interface UndeleteFolderRequest {
}

export const UndeleteFolderRequest: Schema.Schema<UndeleteFolderRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UndeleteFolderRequest" }) as any as Schema.Schema<UndeleteFolderRequest>;

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

export interface Organization {
  /** Output only. The resource name of the organization. This is the organization's relative path in the API. Its format is "organizations/[organization_id]". For example, "organizations/1234". */
  name?: string;
  /** Output only. A human-readable string that refers to the organization in the Google Cloud Console. This string is set by the server and cannot be changed. The string will be set to the primary domain (for example, "google.com") of the Google Workspace customer that owns the organization. */
  displayName?: string;
  /** Immutable. The G Suite / Workspace customer id used in the Directory API. */
  directoryCustomerId?: string;
  /** Output only. The organization's current lifecycle state. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETE_REQUESTED" | (string & {});
  /** Output only. Timestamp when the Organization was created. */
  createTime?: string;
  /** Output only. Timestamp when the Organization was last modified. */
  updateTime?: string;
  /** Output only. Timestamp when the Organization was requested for deletion. */
  deleteTime?: string;
  /** Output only. A checksum computed by the server based on the current value of the Organization resource. This may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const Organization: Schema.Schema<Organization> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  directoryCustomerId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
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

export interface Project {
  /** Output only. The unique resource name of the project. It is an int64 generated number prefixed by "projects/". Example: `projects/415104041262` */
  name?: string;
  /** Optional. A reference to a parent Resource. eg., `organizations/123` or `folders/876`. */
  parent?: string;
  /** Immutable. The unique, user-assigned id of the project. It must be 6 to 30 lowercase ASCII letters, digits, or hyphens. It must start with a letter. Trailing hyphens are prohibited. Example: `tokyo-rain-123` */
  projectId?: string;
  /** Output only. The project lifecycle state. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETE_REQUESTED" | (string & {});
  /** Optional. A user-assigned display name of the project. When present it must be between 4 to 30 characters. Allowed characters are: lowercase and uppercase letters, numbers, hyphen, single-quote, double-quote, space, and exclamation point. Example: `My Project` */
  displayName?: string;
  /** Output only. Creation time. */
  createTime?: string;
  /** Output only. The most recent time this resource was modified. */
  updateTime?: string;
  /** Output only. The time at which this resource was requested for deletion. */
  deleteTime?: string;
  /** Output only. A checksum computed by the server based on the current value of the Project resource. This may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. The labels associated with this project. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: \[a-z\](\[-a-z0-9\]*\[a-z0-9\])?. Label values must be between 0 and 63 characters long and must conform to the regular expression (\[a-z\](\[-a-z0-9\]*\[a-z0-9\])?)?. No more than 64 labels can be associated with a given resource. Clients should store labels in a representation such as JSON that does not depend on specific characters being disallowed. Example: `"myBusinessDimension" : "businessValue"` */
  labels?: Record<string, string>;
  /** Optional. Input only. Immutable. Tag keys/values directly bound to this project. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" Note: Currently this field is in Preview. */
  tags?: Record<string, string>;
  /** Output only. If this project is a Management Project, list of capabilities configured on the parent folder. Note, presence of any capability implies that this is a Management Project. Example: `folders/123/capabilities/app-management`. OUTPUT ONLY. */
  configuredCapabilities?: Array<string>;
}

export const Project: Schema.Schema<Project> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  configuredCapabilities: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Project" }) as any as Schema.Schema<Project>;

export interface ListProjectsResponse {
  /** The list of Projects under the parent. This list can be paginated. */
  projects?: Array<Project>;
  /** Pagination token. If the result set is too large to fit in a single response, this token is returned. It encodes the position of the current result cursor. Feeding this value into a new list request with the `page_token` parameter gives the next page of the results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. Pagination tokens have a limited lifetime. */
  nextPageToken?: string;
}

export const ListProjectsResponse: Schema.Schema<ListProjectsResponse> = Schema.suspend(() => Schema.Struct({
  projects: Schema.optional(Schema.Array(Project)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListProjectsResponse" }) as any as Schema.Schema<ListProjectsResponse>;

export interface SearchProjectsResponse {
  /** The list of Projects that matched the list filter query. This list can be paginated. */
  projects?: Array<Project>;
  /** Pagination token. If the result set is too large to fit in a single response, this token is returned. It encodes the position of the current result cursor. Feeding this value into a new list request with the `page_token` parameter gives the next page of the results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. Pagination tokens have a limited lifetime. */
  nextPageToken?: string;
}

export const SearchProjectsResponse: Schema.Schema<SearchProjectsResponse> = Schema.suspend(() => Schema.Struct({
  projects: Schema.optional(Schema.Array(Project)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchProjectsResponse" }) as any as Schema.Schema<SearchProjectsResponse>;

export interface MoveProjectRequest {
  /** Required. The new parent to move the Project under. */
  destinationParent?: string;
}

export const MoveProjectRequest: Schema.Schema<MoveProjectRequest> = Schema.suspend(() => Schema.Struct({
  destinationParent: Schema.optional(Schema.String),
})).annotate({ identifier: "MoveProjectRequest" }) as any as Schema.Schema<MoveProjectRequest>;

export interface UndeleteProjectRequest {
}

export const UndeleteProjectRequest: Schema.Schema<UndeleteProjectRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UndeleteProjectRequest" }) as any as Schema.Schema<UndeleteProjectRequest>;

export interface Capability {
  /** Immutable. Identifier. The resource name of the capability. Must be in the following form: * `folders/{folder_id}/capabilities/{capability_name}` For example, `folders/123/capabilities/app-management` Following are the allowed {capability_name} values: * `app-management` */
  name?: string;
  /** Required. The configured value of the capability at the given parent resource. */
  value?: boolean;
}

export const Capability: Schema.Schema<Capability> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Capability" }) as any as Schema.Schema<Capability>;

export interface TagBindingCollection {
  /** Identifier. The name of the TagBindingCollection, following the convention: `locations/{location}/tagBindingCollections/{encoded-full-resource-name}` where the encoded-full-resource-name is the UTF-8 encoded name of the GCP resource the TagBindings are bound to. "locations/global/tagBindingCollections/%2f%2fcloudresourcemanager.googleapis.com%2fprojects%2f123" */
  name?: string;
  /** The full resource name of the resource the TagBindings are bound to. E.g. `//cloudresourcemanager.googleapis.com/projects/123` */
  fullResourceName?: string;
  /** Tag keys/values directly bound to this resource, specified in namespaced format. For example: "123/environment": "production" */
  tags?: Record<string, string>;
  /** Optional. A checksum based on the current bindings which can be passed to prevent race conditions. This field is always set in server responses. */
  etag?: string;
}

export const TagBindingCollection: Schema.Schema<TagBindingCollection> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  fullResourceName: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "TagBindingCollection" }) as any as Schema.Schema<TagBindingCollection>;

export interface EffectiveTagBindingCollection {
  /** Identifier. The name of the EffectiveTagBindingCollection, following the convention: `locations/{location}/effectiveTagBindingCollections/{encoded-full-resource-name}` where the encoded-full-resource-name is the UTF-8 encoded name of the GCP resource the TagBindings are bound to. E.g. "locations/global/effectiveTagBindingCollections/%2f%2fcloudresourcemanager.googleapis.com%2fprojects%2f123" */
  name?: string;
  /** The full resource name of the resource the TagBindings are bound to. E.g. `//cloudresourcemanager.googleapis.com/projects/123` */
  fullResourceName?: string;
  /** Tag keys/values effectively bound to this resource, specified in namespaced format. For example: "123/environment": "production" */
  effectiveTags?: Record<string, string>;
}

export const EffectiveTagBindingCollection: Schema.Schema<EffectiveTagBindingCollection> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  fullResourceName: Schema.optional(Schema.String),
  effectiveTags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "EffectiveTagBindingCollection" }) as any as Schema.Schema<EffectiveTagBindingCollection>;

export interface TagBinding {
  /** Output only. The name of the TagBinding. This is a String of the form: `tagBindings/{full-resource-name}/{tag-value-name}` (e.g. `tagBindings/%2F%2Fcloudresourcemanager.googleapis.com%2Fprojects%2F123/tagValues/456`) or `tagBindings/{full-resource-name}/{tag-key-name}` (e.g. `tagBindings/%2F%2Fcloudresourcemanager.googleapis.com%2Fprojects%2F123/tagKeys/123`). */
  name?: string;
  /** The full resource name of the resource the TagValue is bound to. E.g. `//cloudresourcemanager.googleapis.com/projects/123` */
  parent?: string;
  /** The TagValue of the TagBinding. Must be of the form `tagValues/456`. */
  tagValue?: string;
  /** The namespaced name for the TagValue of the TagBinding. Must be in the format `{parent_id}/{tag_key_short_name}/{short_name}`. For methods that support TagValue namespaced name, only one of tag_value_namespaced_name or tag_value may be filled. Requests with both fields will be rejected. */
  tagValueNamespacedName?: string;
}

export const TagBinding: Schema.Schema<TagBinding> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  tagValue: Schema.optional(Schema.String),
  tagValueNamespacedName: Schema.optional(Schema.String),
})).annotate({ identifier: "TagBinding" }) as any as Schema.Schema<TagBinding>;

export interface ListTagBindingsResponse {
  /** A possibly paginated list of TagBindings for the specified resource. */
  tagBindings?: Array<TagBinding>;
  /** Pagination token. If the result set is too large to fit in a single response, this token is returned. It encodes the position of the current result cursor. Feeding this value into a new list request with the `page_token` parameter gives the next page of the results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. Pagination tokens have a limited lifetime. */
  nextPageToken?: string;
}

export const ListTagBindingsResponse: Schema.Schema<ListTagBindingsResponse> = Schema.suspend(() => Schema.Struct({
  tagBindings: Schema.optional(Schema.Array(TagBinding)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTagBindingsResponse" }) as any as Schema.Schema<ListTagBindingsResponse>;

export interface EffectiveTag {
  /** Resource name for TagValue in the format `tagValues/456`. */
  tagValue?: string;
  /** The namespaced name of the TagValue. Can be in the form `{organization_id}/{tag_key_short_name}/{tag_value_short_name}` or `{project_id}/{tag_key_short_name}/{tag_value_short_name}` or `{project_number}/{tag_key_short_name}/{tag_value_short_name}`. */
  namespacedTagValue?: string;
  /** The name of the TagKey, in the format `tagKeys/{id}`, such as `tagKeys/123`. */
  tagKey?: string;
  /** The namespaced name of the TagKey. Can be in the form `{organization_id}/{tag_key_short_name}` or `{project_id}/{tag_key_short_name}` or `{project_number}/{tag_key_short_name}`. */
  namespacedTagKey?: string;
  /** The parent name of the tag key. Must be in the format `organizations/{organization_id}` or `projects/{project_number}` */
  tagKeyParentName?: string;
  /** Indicates the inheritance status of a tag value attached to the given resource. If the tag value is inherited from one of the resource's ancestors, inherited will be true. If false, then the tag value is directly attached to the resource, inherited will be false. */
  inherited?: boolean;
}

export const EffectiveTag: Schema.Schema<EffectiveTag> = Schema.suspend(() => Schema.Struct({
  tagValue: Schema.optional(Schema.String),
  namespacedTagValue: Schema.optional(Schema.String),
  tagKey: Schema.optional(Schema.String),
  namespacedTagKey: Schema.optional(Schema.String),
  tagKeyParentName: Schema.optional(Schema.String),
  inherited: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EffectiveTag" }) as any as Schema.Schema<EffectiveTag>;

export interface ListEffectiveTagsResponse {
  /** A possibly paginated list of effective tags for the specified resource. */
  effectiveTags?: Array<EffectiveTag>;
  /** Pagination token. If the result set is too large to fit in a single response, this token is returned. It encodes the position of the current result cursor. Feeding this value into a new list request with the `page_token` parameter gives the next page of the results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. Pagination tokens have a limited lifetime. */
  nextPageToken?: string;
}

export const ListEffectiveTagsResponse: Schema.Schema<ListEffectiveTagsResponse> = Schema.suspend(() => Schema.Struct({
  effectiveTags: Schema.optional(Schema.Array(EffectiveTag)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListEffectiveTagsResponse" }) as any as Schema.Schema<ListEffectiveTagsResponse>;

export interface TagHold {
  /** Output only. The resource name of a TagHold. This is a String of the form: `tagValues/{tag-value-id}/tagHolds/{tag-hold-id}` (e.g. `tagValues/123/tagHolds/456`). This resource name is generated by the server. */
  name?: string;
  /** Required. The name of the resource where the TagValue is being used. Must be less than 200 characters. E.g. `//compute.googleapis.com/compute/projects/myproject/regions/us-east-1/instanceGroupManagers/instance-group` */
  holder?: string;
  /** Optional. An optional string representing the origin of this request. This field should include human-understandable information to distinguish origins from each other. Must be less than 200 characters. E.g. `migs-35678234` */
  origin?: string;
  /** Optional. A URL where an end user can learn more about removing this hold. E.g. `https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing` */
  helpLink?: string;
  /** Output only. The time this TagHold was created. */
  createTime?: string;
}

export const TagHold: Schema.Schema<TagHold> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  holder: Schema.optional(Schema.String),
  origin: Schema.optional(Schema.String),
  helpLink: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TagHold" }) as any as Schema.Schema<TagHold>;

export interface ListTagHoldsResponse {
  /** A possibly paginated list of TagHolds. */
  tagHolds?: Array<TagHold>;
  /** Pagination token. If the result set is too large to fit in a single response, this token is returned. It encodes the position of the current result cursor. Feeding this value into a new list request with the `page_token` parameter gives the next page of the results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. Pagination tokens have a limited lifetime. */
  nextPageToken?: string;
}

export const ListTagHoldsResponse: Schema.Schema<ListTagHoldsResponse> = Schema.suspend(() => Schema.Struct({
  tagHolds: Schema.optional(Schema.Array(TagHold)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTagHoldsResponse" }) as any as Schema.Schema<ListTagHoldsResponse>;

export interface TagKey {
  /** Immutable. The resource name for a TagKey. Must be in the format `tagKeys/{tag_key_id}`, where `tag_key_id` is the generated numeric id for the TagKey. */
  name?: string;
  /** Immutable. The resource name of the TagKey's parent. A TagKey can be parented by an Organization or a Project. For a TagKey parented by an Organization, its parent must be in the form `organizations/{org_id}`. For a TagKey parented by a Project, its parent can be in the form `projects/{project_id}` or `projects/{project_number}`. */
  parent?: string;
  /** Required. Immutable. The user friendly name for a TagKey. The short name should be unique for TagKeys within the same tag namespace. The short name must be 1-256 characters, beginning and ending with an alphanumeric character ([a-z0-9A-Z]) with dashes (-), underscores (_), dots (.), and alphanumerics between. */
  shortName?: string;
  /** Output only. Immutable. Namespaced name of the TagKey. */
  namespacedName?: string;
  /** Optional. User-assigned description of the TagKey. Must not exceed 256 characters. Read-write. */
  description?: string;
  /** Output only. Creation time. */
  createTime?: string;
  /** Output only. Update time. */
  updateTime?: string;
  /** Optional. Entity tag which users can pass to prevent race conditions. This field is always set in server responses. See UpdateTagKeyRequest for details. */
  etag?: string;
  /** Optional. A purpose denotes that this Tag is intended for use in policies of a specific policy engine, and will involve that policy engine in management operations involving this Tag. A purpose does not grant a policy engine exclusive rights to the Tag, and it may be referenced by other policy engines. A purpose cannot be changed once set. */
  purpose?: "PURPOSE_UNSPECIFIED" | "GCE_FIREWALL" | "DATA_GOVERNANCE" | (string & {});
  /** Optional. Purpose data corresponds to the policy system that the tag is intended for. See documentation for `Purpose` for formatting of this field. Purpose data cannot be changed once set. */
  purposeData?: Record<string, string>;
  /** Optional. Regular expression constraint for freeform tag values. If present, it implicitly allows freeform values (constrained by the regex). */
  allowedValuesRegex?: string;
}

export const TagKey: Schema.Schema<TagKey> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  shortName: Schema.optional(Schema.String),
  namespacedName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  purpose: Schema.optional(Schema.String),
  purposeData: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  allowedValuesRegex: Schema.optional(Schema.String),
})).annotate({ identifier: "TagKey" }) as any as Schema.Schema<TagKey>;

export interface ListTagKeysResponse {
  /** List of TagKeys that live under the specified parent in the request. */
  tagKeys?: Array<TagKey>;
  /** A pagination token returned from a previous call to `ListTagKeys` that indicates from where listing should continue. */
  nextPageToken?: string;
}

export const ListTagKeysResponse: Schema.Schema<ListTagKeysResponse> = Schema.suspend(() => Schema.Struct({
  tagKeys: Schema.optional(Schema.Array(TagKey)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTagKeysResponse" }) as any as Schema.Schema<ListTagKeysResponse>;

export interface TagValue {
  /** Immutable. Resource name for TagValue in the format `tagValues/456`. */
  name?: string;
  /** Immutable. The resource name of the new TagValue's parent TagKey. Must be of the form `tagKeys/{tag_key_id}`. */
  parent?: string;
  /** Required. Immutable. User-assigned short name for TagValue. The short name should be unique for TagValues within the same parent TagKey. The short name must be 256 characters or less, beginning and ending with an alphanumeric character ([a-z0-9A-Z]) with dashes (-), underscores (_), dots (.), and alphanumerics between. */
  shortName?: string;
  /** Output only. The namespaced name of the TagValue. Can be in the form `{organization_id}/{tag_key_short_name}/{tag_value_short_name}` or `{project_id}/{tag_key_short_name}/{tag_value_short_name}` or `{project_number}/{tag_key_short_name}/{tag_value_short_name}`. */
  namespacedName?: string;
  /** Optional. User-assigned description of the TagValue. Must not exceed 256 characters. Read-write. */
  description?: string;
  /** Output only. Creation time. */
  createTime?: string;
  /** Output only. Update time. */
  updateTime?: string;
  /** Optional. Entity tag which users can pass to prevent race conditions. This field is always set in server responses. See UpdateTagValueRequest for details. */
  etag?: string;
}

export const TagValue: Schema.Schema<TagValue> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  shortName: Schema.optional(Schema.String),
  namespacedName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "TagValue" }) as any as Schema.Schema<TagValue>;

export interface ListTagValuesResponse {
  /** A possibly paginated list of TagValues that are direct descendants of the specified parent TagKey. */
  tagValues?: Array<TagValue>;
  /** A pagination token returned from a previous call to `ListTagValues` that indicates from where listing should continue. */
  nextPageToken?: string;
}

export const ListTagValuesResponse: Schema.Schema<ListTagValuesResponse> = Schema.suspend(() => Schema.Struct({
  tagValues: Schema.optional(Schema.Array(TagValue)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTagValuesResponse" }) as any as Schema.Schema<ListTagValuesResponse>;

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

/** List all Liens applied to the `parent` resource. Callers of this method will require permission on the `parent` resource. For example, a Lien with a `parent` of `projects/1234` requires permission `resourcemanager.projects.get`. */
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
  T.Http({ method: "GET", path: "v3/liens" }),
  svc,
) as unknown as Schema.Schema<ListLiensRequest>;

export type ListLiensResponse_Op = ListLiensResponse;
export const ListLiensResponse_Op = ListLiensResponse;

export type ListLiensError = CommonErrors;

export const listLiens = API.makePaginated(() => ({
  input: ListLiensRequest,
  output: ListLiensResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieve a Lien by `name`. Callers of this method will require permission on the `parent` resource. For example, a Lien with a `parent` of `projects/1234` requires permission `resourcemanager.projects.get` */
export interface GetLiensRequest {
  /** Required. The name/identifier of the Lien. */
  name: string;
}

export const GetLiensRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/liens/{liensId}" }),
  svc,
) as unknown as Schema.Schema<GetLiensRequest>;

export type GetLiensResponse = Lien;
export const GetLiensResponse = Lien;

export type GetLiensError = CommonErrors;

export const getLiens: API.OperationMethod<GetLiensRequest, GetLiensResponse, GetLiensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLiensRequest,
  output: GetLiensResponse,
  errors: [],
}));

/** Create a Lien which applies to the resource denoted by the `parent` field. Callers of this method will require permission on the `parent` resource. For example, applying to `projects/1234` requires permission `resourcemanager.projects.updateLiens`. NOTE: Some resources may limit the number of Liens which may be applied. */
export interface CreateLiensRequest {
  /** Request body */
  body?: Lien;
}

export const CreateLiensRequest = Schema.Struct({
  body: Schema.optional(Lien).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/liens", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateLiensRequest>;

export type CreateLiensResponse = Lien;
export const CreateLiensResponse = Lien;

export type CreateLiensError = CommonErrors;

export const createLiens: API.OperationMethod<CreateLiensRequest, CreateLiensResponse, CreateLiensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateLiensRequest,
  output: CreateLiensResponse,
  errors: [],
}));

/** Delete a Lien by `name`. Callers of this method will require permission on the `parent` resource. For example, a Lien with a `parent` of `projects/1234` requires permission `resourcemanager.projects.updateLiens`. */
export interface DeleteLiensRequest {
  /** Required. The name/identifier of the Lien to delete. */
  name: string;
}

export const DeleteLiensRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/liens/{liensId}" }),
  svc,
) as unknown as Schema.Schema<DeleteLiensRequest>;

export type DeleteLiensResponse = Empty;
export const DeleteLiensResponse = Empty;

export type DeleteLiensError = CommonErrors;

export const deleteLiens: API.OperationMethod<DeleteLiensRequest, DeleteLiensResponse, DeleteLiensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteLiensRequest,
  output: DeleteLiensResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/operations/{operationsId}" }),
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

/** Retrieves a folder identified by the supplied resource name. Valid folder resource names have the format `folders/{folder_id}` (for example, `folders/1234`). The caller must have `resourcemanager.folders.get` permission on the identified folder. */
export interface GetFoldersRequest {
  /** Required. The resource name of the folder to retrieve. Must be of the form `folders/{folder_id}`. */
  name: string;
}

export const GetFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/folders/{foldersId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersRequest>;

export type GetFoldersResponse = Folder;
export const GetFoldersResponse = Folder;

export type GetFoldersError = CommonErrors;

export const getFolders: API.OperationMethod<GetFoldersRequest, GetFoldersResponse, GetFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersRequest,
  output: GetFoldersResponse,
  errors: [],
}));

/** Lists the folders that are direct descendants of supplied parent resource. `list()` provides a strongly consistent view of the folders underneath the specified parent resource. `list()` returns folders sorted based upon the (ascending) lexical ordering of their display_name. The caller must have `resourcemanager.folders.list` permission on the identified parent. */
export interface ListFoldersRequest {
  /** Required. The name of the parent resource whose folders are being listed. Only children of this parent resource are listed; descendants are not listed. If the parent is a folder, use the value `folders/{folder_id}`. If the parent is an organization, use the value `organizations/{org_id}`. Access to this method is controlled by checking the `resourcemanager.folders.list` permission on the `parent`. */
  parent?: string;
  /** Optional. The maximum number of folders to return in the response. The server can return fewer folders than requested. If unspecified, server picks an appropriate default. */
  pageSize?: number;
  /** Optional. A pagination token returned from a previous call to `ListFolders` that indicates where this listing should continue from. */
  pageToken?: string;
  /** Optional. Controls whether folders in the DELETE_REQUESTED state should be returned. Defaults to false. */
  showDeleted?: boolean;
}

export const ListFoldersRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v3/folders" }),
  svc,
) as unknown as Schema.Schema<ListFoldersRequest>;

export type ListFoldersResponse_Op = ListFoldersResponse;
export const ListFoldersResponse_Op = ListFoldersResponse;

export type ListFoldersError = CommonErrors;

export const listFolders = API.makePaginated(() => ({
  input: ListFoldersRequest,
  output: ListFoldersResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Search for folders that match specific filter criteria. `search()` provides an eventually consistent view of the folders a user has access to which meet the specified filter criteria. This will only return folders on which the caller has the permission `resourcemanager.folders.get`. */
export interface SearchFoldersRequest {
  /** Optional. The maximum number of folders to return in the response. The server can return fewer folders than requested. If unspecified, server picks an appropriate default. */
  pageSize?: number;
  /** Optional. A pagination token returned from a previous call to `SearchFolders` that indicates from where search should continue. */
  pageToken?: string;
  /** Optional. Search criteria used to select the folders to return. If no search criteria is specified then all accessible folders will be returned. Query expressions can be used to restrict results based upon displayName, state and parent, where the operators `=` (`:`) `NOT`, `AND` and `OR` can be used along with the suffix wildcard symbol `*`. The `displayName` field in a query expression should use escaped quotes for values that include whitespace to prevent unexpected behavior. ``` | Field | Description | |-------------------------|----------------------------------------| | displayName | Filters by displayName. | | parent | Filters by parent (for example: folders/123). | | state, lifecycleState | Filters by state. | ``` Some example queries are: * Query `displayName=Test*` returns Folder resources whose display name starts with "Test". * Query `state=ACTIVE` returns Folder resources with `state` set to `ACTIVE`. * Query `parent=folders/123` returns Folder resources that have `folders/123` as a parent resource. * Query `parent=folders/123 AND state=ACTIVE` returns active Folder resources that have `folders/123` as a parent resource. * Query `displayName=\\"Test String\\"` returns Folder resources with display names that include both "Test" and "String". */
  query?: string;
}

export const SearchFoldersRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
}).pipe(
  T.Http({ method: "GET", path: "v3/folders:search" }),
  svc,
) as unknown as Schema.Schema<SearchFoldersRequest>;

export type SearchFoldersResponse_Op = SearchFoldersResponse;
export const SearchFoldersResponse_Op = SearchFoldersResponse;

export type SearchFoldersError = CommonErrors;

export const searchFolders = API.makePaginated(() => ({
  input: SearchFoldersRequest,
  output: SearchFoldersResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a folder in the resource hierarchy. Returns an `Operation` which can be used to track the progress of the folder creation workflow. Upon success, the `Operation.response` field will be populated with the created Folder. In order to succeed, the addition of this new folder must not violate the folder naming, height, or fanout constraints. + The folder's `display_name` must be distinct from all other folders that share its parent. + The addition of the folder must not cause the active folder hierarchy to exceed a height of 10. Note, the full active + deleted folder hierarchy is allowed to reach a height of 20; this provides additional headroom when moving folders that contain deleted folders. + The addition of the folder must not cause the total number of folders under its parent to exceed 300. If the operation fails due to a folder constraint violation, some errors may be returned by the `CreateFolder` request, with status code `FAILED_PRECONDITION` and an error description. Other folder constraint violations will be communicated in the `Operation`, with the specific `PreconditionFailure` returned in the details list in the `Operation.error` field. The caller must have `resourcemanager.folders.create` permission on the identified parent. */
export interface CreateFoldersRequest {
  /** Request body */
  body?: Folder;
}

export const CreateFoldersRequest = Schema.Struct({
  body: Schema.optional(Folder).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/folders", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersRequest>;

export type CreateFoldersResponse = Operation;
export const CreateFoldersResponse = Operation;

export type CreateFoldersError = CommonErrors;

export const createFolders: API.OperationMethod<CreateFoldersRequest, CreateFoldersResponse, CreateFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersRequest,
  output: CreateFoldersResponse,
  errors: [],
}));

/** Updates a folder, changing its `display_name`. Changes to the folder `display_name` will be rejected if they violate either the `display_name` formatting rules or the naming constraints described in the CreateFolder documentation. The folder's `display_name` must start and end with a letter or digit, may contain letters, digits, spaces, hyphens and underscores and can be between 3 and 30 characters. This is captured by the regular expression: `\p{L}\p{N}{1,28}[\p{L}\p{N}]`. The caller must have `resourcemanager.folders.update` permission on the identified folder. If the update fails due to the unique name constraint then a `PreconditionFailure` explaining this violation will be returned in the Status.details field. */
export interface PatchFoldersRequest {
  /** Identifier. The resource name of the folder. Its format is `folders/{folder_id}`, for example: "folders/1234". */
  name: string;
  /** Required. Fields to be updated. Only the `display_name` can be updated. */
  updateMask?: string;
  /** Request body */
  body?: Folder;
}

export const PatchFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Folder).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/folders/{foldersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersRequest>;

export type PatchFoldersResponse = Operation;
export const PatchFoldersResponse = Operation;

export type PatchFoldersError = CommonErrors;

export const patchFolders: API.OperationMethod<PatchFoldersRequest, PatchFoldersResponse, PatchFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersRequest,
  output: PatchFoldersResponse,
  errors: [],
}));

/** Moves a folder under a new resource parent. Returns an `Operation` which can be used to track the progress of the folder move workflow. Upon success, the `Operation.response` field will be populated with the moved folder. Upon failure, a `FolderOperationError` categorizing the failure cause will be returned - if the failure occurs synchronously then the `FolderOperationError` will be returned in the `Status.details` field. If it occurs asynchronously, then the FolderOperation will be returned in the `Operation.error` field. In addition, the `Operation.metadata` field will be populated with a `FolderOperation` message as an aid to stateless clients. Folder moves will be rejected if they violate either the naming, height, or fanout constraints described in the CreateFolder documentation. The caller must have `resourcemanager.folders.move` permission on the folder's current and proposed new parent. */
export interface MoveFoldersRequest {
  /** Required. The resource name of the Folder to move. Must be of the form folders/{folder_id} */
  name: string;
  /** Request body */
  body?: MoveFolderRequest;
}

export const MoveFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MoveFolderRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/folders/{foldersId}:move", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveFoldersRequest>;

export type MoveFoldersResponse = Operation;
export const MoveFoldersResponse = Operation;

export type MoveFoldersError = CommonErrors;

export const moveFolders: API.OperationMethod<MoveFoldersRequest, MoveFoldersResponse, MoveFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveFoldersRequest,
  output: MoveFoldersResponse,
  errors: [],
}));

/** Requests deletion of a folder. The folder is moved into the DELETE_REQUESTED state immediately, and is deleted approximately 30 days later. This method may only be called on an empty folder, where a folder is empty if it doesn't contain any folders or projects in the ACTIVE state. If called on a folder in DELETE_REQUESTED state the operation will result in a no-op success. The caller must have `resourcemanager.folders.delete` permission on the identified folder. */
export interface DeleteFoldersRequest {
  /** Required. The resource name of the folder to be deleted. Must be of the form `folders/{folder_id}`. */
  name: string;
}

export const DeleteFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/folders/{foldersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersRequest>;

export type DeleteFoldersResponse = Operation;
export const DeleteFoldersResponse = Operation;

export type DeleteFoldersError = CommonErrors;

export const deleteFolders: API.OperationMethod<DeleteFoldersRequest, DeleteFoldersResponse, DeleteFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersRequest,
  output: DeleteFoldersResponse,
  errors: [],
}));

/** Cancels the deletion request for a folder. This method may be called on a folder in any state. If the folder is in the ACTIVE state the result will be a no-op success. In order to succeed, the folder's parent must be in the ACTIVE state. In addition, reintroducing the folder into the tree must not violate folder naming, height, and fanout constraints described in the CreateFolder documentation. The caller must have `resourcemanager.folders.undelete` permission on the identified folder. */
export interface UndeleteFoldersRequest {
  /** Required. The resource name of the folder to undelete. Must be of the form `folders/{folder_id}`. */
  name: string;
  /** Request body */
  body?: UndeleteFolderRequest;
}

export const UndeleteFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteFolderRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/folders/{foldersId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteFoldersRequest>;

export type UndeleteFoldersResponse = Operation;
export const UndeleteFoldersResponse = Operation;

export type UndeleteFoldersError = CommonErrors;

export const undeleteFolders: API.OperationMethod<UndeleteFoldersRequest, UndeleteFoldersResponse, UndeleteFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteFoldersRequest,
  output: UndeleteFoldersResponse,
  errors: [],
}));

/** Gets the access control policy for a folder. The returned policy may be empty if no such policy or resource exists. The `resource` field should be the folder's resource name, for example: "folders/1234". The caller must have `resourcemanager.folders.getIamPolicy` permission on the identified folder. */
export interface GetIamPolicyFoldersRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyFoldersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/folders/{foldersId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyFoldersRequest>;

export type GetIamPolicyFoldersResponse = Policy;
export const GetIamPolicyFoldersResponse = Policy;

export type GetIamPolicyFoldersError = CommonErrors;

export const getIamPolicyFolders: API.OperationMethod<GetIamPolicyFoldersRequest, GetIamPolicyFoldersResponse, GetIamPolicyFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyFoldersRequest,
  output: GetIamPolicyFoldersResponse,
  errors: [],
}));

/** Sets the access control policy on a folder, replacing any existing policy. The `resource` field should be the folder's resource name, for example: "folders/1234". The caller must have `resourcemanager.folders.setIamPolicy` permission on the identified folder. */
export interface SetIamPolicyFoldersRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyFoldersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/folders/{foldersId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyFoldersRequest>;

export type SetIamPolicyFoldersResponse = Policy;
export const SetIamPolicyFoldersResponse = Policy;

export type SetIamPolicyFoldersError = CommonErrors;

export const setIamPolicyFolders: API.OperationMethod<SetIamPolicyFoldersRequest, SetIamPolicyFoldersResponse, SetIamPolicyFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyFoldersRequest,
  output: SetIamPolicyFoldersResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified folder. The `resource` field should be the folder's resource name, for example: "folders/1234". There are no permissions required for making this API call. */
export interface TestIamPermissionsFoldersRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsFoldersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/folders/{foldersId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsFoldersRequest>;

export type TestIamPermissionsFoldersResponse = TestIamPermissionsResponse;
export const TestIamPermissionsFoldersResponse = TestIamPermissionsResponse;

export type TestIamPermissionsFoldersError = CommonErrors;

export const testIamPermissionsFolders: API.OperationMethod<TestIamPermissionsFoldersRequest, TestIamPermissionsFoldersResponse, TestIamPermissionsFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsFoldersRequest,
  output: TestIamPermissionsFoldersResponse,
  errors: [],
}));

/** Retrieves the Capability identified by the supplied resource name. */
export interface GetFoldersCapabilitiesRequest {
  /** Required. The name of the capability to get. For example, `folders/123/capabilities/app-management` */
  name: string;
}

export const GetFoldersCapabilitiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/folders/{foldersId}/capabilities/{capabilitiesId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersCapabilitiesRequest>;

export type GetFoldersCapabilitiesResponse = Capability;
export const GetFoldersCapabilitiesResponse = Capability;

export type GetFoldersCapabilitiesError = CommonErrors;

export const getFoldersCapabilities: API.OperationMethod<GetFoldersCapabilitiesRequest, GetFoldersCapabilitiesResponse, GetFoldersCapabilitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersCapabilitiesRequest,
  output: GetFoldersCapabilitiesResponse,
  errors: [],
}));

/** Updates the Capability. */
export interface PatchFoldersCapabilitiesRequest {
  /** Immutable. Identifier. The resource name of the capability. Must be in the following form: * `folders/{folder_id}/capabilities/{capability_name}` For example, `folders/123/capabilities/app-management` Following are the allowed {capability_name} values: * `app-management` */
  name: string;
  /** Optional. The list of fields to update. Only [Capability.value] can be updated. */
  updateMask?: string;
  /** Request body */
  body?: Capability;
}

export const PatchFoldersCapabilitiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Capability).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/folders/{foldersId}/capabilities/{capabilitiesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersCapabilitiesRequest>;

export type PatchFoldersCapabilitiesResponse = Operation;
export const PatchFoldersCapabilitiesResponse = Operation;

export type PatchFoldersCapabilitiesError = CommonErrors;

export const patchFoldersCapabilities: API.OperationMethod<PatchFoldersCapabilitiesRequest, PatchFoldersCapabilitiesResponse, PatchFoldersCapabilitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersCapabilitiesRequest,
  output: PatchFoldersCapabilitiesResponse,
  errors: [],
}));

/** Fetches an organization resource identified by the specified resource name. */
export interface GetOrganizationsRequest {
  /** Required. The resource name of the Organization to fetch. This is the organization's relative path in the API, formatted as "organizations/[organizationId]". For example, "organizations/1234". */
  name: string;
}

export const GetOrganizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/organizations/{organizationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsRequest>;

export type GetOrganizationsResponse = Organization;
export const GetOrganizationsResponse = Organization;

export type GetOrganizationsError = CommonErrors;

export const getOrganizations: API.OperationMethod<GetOrganizationsRequest, GetOrganizationsResponse, GetOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsRequest,
  output: GetOrganizationsResponse,
  errors: [],
}));

/** Searches organization resources that are visible to the user and satisfy the specified filter. This method returns organizations in an unspecified order. New organizations do not necessarily appear at the end of the results, and may take a small amount of time to appear. Search will only return organizations on which the user has the permission `resourcemanager.organizations.get` or has super admin privileges. */
export interface SearchOrganizationsRequest {
  /** Optional. The maximum number of organizations to return in the response. The server can return fewer organizations than requested. If unspecified, server picks an appropriate default. */
  pageSize?: number;
  /** Optional. A pagination token returned from a previous call to `SearchOrganizations` that indicates from where listing should continue. */
  pageToken?: string;
  /** Optional. An optional query string used to filter the Organizations to return in the response. Query rules are case-insensitive. ``` | Field | Description | |------------------|--------------------------------------------| | directoryCustomerId, owner.directoryCustomerId | Filters by directory customer id. | | domain | Filters by domain. | ``` Organizations may be queried by `directoryCustomerId` or by `domain`, where the domain is a G Suite domain, for example: * Query `directorycustomerid:123456789` returns Organization resources with `owner.directory_customer_id` equal to `123456789`. * Query `domain:google.com` returns Organization resources corresponding to the domain `google.com`. */
  query?: string;
}

export const SearchOrganizationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
}).pipe(
  T.Http({ method: "GET", path: "v3/organizations:search" }),
  svc,
) as unknown as Schema.Schema<SearchOrganizationsRequest>;

export type SearchOrganizationsResponse_Op = SearchOrganizationsResponse;
export const SearchOrganizationsResponse_Op = SearchOrganizationsResponse;

export type SearchOrganizationsError = CommonErrors;

export const searchOrganizations = API.makePaginated(() => ({
  input: SearchOrganizationsRequest,
  output: SearchOrganizationsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the access control policy for an organization resource. The policy may be empty if no such policy or resource exists. The `resource` field should be the organization's resource name, for example: "organizations/123". Authorization requires the IAM permission `resourcemanager.organizations.getIamPolicy` on the specified organization. */
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
  T.Http({ method: "POST", path: "v3/organizations/{organizationsId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyOrganizationsRequest>;

export type GetIamPolicyOrganizationsResponse = Policy;
export const GetIamPolicyOrganizationsResponse = Policy;

export type GetIamPolicyOrganizationsError = CommonErrors;

export const getIamPolicyOrganizations: API.OperationMethod<GetIamPolicyOrganizationsRequest, GetIamPolicyOrganizationsResponse, GetIamPolicyOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyOrganizationsRequest,
  output: GetIamPolicyOrganizationsResponse,
  errors: [],
}));

/** Sets the access control policy on an organization resource. Replaces any existing policy. The `resource` field should be the organization's resource name, for example: "organizations/123". Authorization requires the IAM permission `resourcemanager.organizations.setIamPolicy` on the specified organization. */
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
  T.Http({ method: "POST", path: "v3/organizations/{organizationsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyOrganizationsRequest>;

export type SetIamPolicyOrganizationsResponse = Policy;
export const SetIamPolicyOrganizationsResponse = Policy;

export type SetIamPolicyOrganizationsError = CommonErrors;

export const setIamPolicyOrganizations: API.OperationMethod<SetIamPolicyOrganizationsRequest, SetIamPolicyOrganizationsResponse, SetIamPolicyOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyOrganizationsRequest,
  output: SetIamPolicyOrganizationsResponse,
  errors: [],
}));

/** Returns the permissions that a caller has on the specified organization. The `resource` field should be the organization's resource name, for example: "organizations/123". There are no permissions required for making this API call. */
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
  T.Http({ method: "POST", path: "v3/organizations/{organizationsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsOrganizationsRequest>;

export type TestIamPermissionsOrganizationsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsOrganizationsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsOrganizationsError = CommonErrors;

export const testIamPermissionsOrganizations: API.OperationMethod<TestIamPermissionsOrganizationsRequest, TestIamPermissionsOrganizationsResponse, TestIamPermissionsOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsOrganizationsRequest,
  output: TestIamPermissionsOrganizationsResponse,
  errors: [],
}));

/** Retrieves the project identified by the specified `name` (for example, `projects/415104041262`). The caller must have `resourcemanager.projects.get` permission for this project. */
export interface GetProjectsRequest {
  /** Required. The name of the project (for example, `projects/415104041262`). */
  name: string;
}

export const GetProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsRequest>;

export type GetProjectsResponse = Project;
export const GetProjectsResponse = Project;

export type GetProjectsError = CommonErrors;

export const getProjects: API.OperationMethod<GetProjectsRequest, GetProjectsResponse, GetProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsRequest,
  output: GetProjectsResponse,
  errors: [],
}));

/** Lists projects that are direct children of the specified folder or organization resource. `list()` provides a strongly consistent view of the projects underneath the specified parent resource. `list()` returns projects sorted based upon the (ascending) lexical ordering of their `display_name`. The caller must have `resourcemanager.projects.list` permission on the identified parent. */
export interface ListProjectsRequest {
  /** Required. The name of the parent resource whose projects are being listed. Only children of this parent resource are listed; descendants are not listed. If the parent is a folder, use the value `folders/{folder_id}`. If the parent is an organization, use the value `organizations/{org_id}`. */
  parent?: string;
  /** Optional. A pagination token returned from a previous call to ListProjects that indicates from where listing should continue. */
  pageToken?: string;
  /** Optional. The maximum number of projects to return in the response. The server can return fewer projects than requested. If unspecified, server picks an appropriate default. */
  pageSize?: number;
  /** Optional. Indicate that projects in the `DELETE_REQUESTED` state should also be returned. Normally only `ACTIVE` projects are returned. */
  showDeleted?: boolean;
}

export const ListProjectsRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects" }),
  svc,
) as unknown as Schema.Schema<ListProjectsRequest>;

export type ListProjectsResponse_Op = ListProjectsResponse;
export const ListProjectsResponse_Op = ListProjectsResponse;

export type ListProjectsError = CommonErrors;

export const listProjects = API.makePaginated(() => ({
  input: ListProjectsRequest,
  output: ListProjectsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Search for projects that the caller has the `resourcemanager.projects.get` permission on, and also satisfy the specified query. This method returns projects in an unspecified order. This method is eventually consistent with project mutations; this means that a newly created project may not appear in the results or recent updates to an existing project may not be reflected in the results. To retrieve the latest state of a project, use the GetProject method. */
export interface SearchProjectsRequest {
  /** Optional. A query string for searching for projects that the caller has `resourcemanager.projects.get` permission to. If multiple fields are included in the query, then it will return results that match any of the fields. Some eligible fields are: ``` | Field | Description | |-------------------------|----------------------------------------------| | displayName, name | Filters by displayName. | | parent | Project's parent (for example: folders/123, organizations/*). Prefer parent field over parent.type and parent.id.| | parent.type | Parent's type: `folder` or `organization`. | | parent.id | Parent's id number (for example: 123) | | id, projectId | Filters by projectId. | | state, lifecycleState | Filters by state. | | labels | Filters by label name or value. | | labels.\ (where *key* is the name of a label) | Filters by label name.| ``` Search expressions are case insensitive. Some examples queries: ``` | Query | Description | |------------------|-----------------------------------------------------| | name:how* | The project's name starts with "how". | | name:Howl | The project's name is `Howl` or `howl`. | | name:HOWL | Equivalent to above. | | NAME:howl | Equivalent to above. | | labels.color:* | The project has the label `color`. | | labels.color:red | The project's label `color` has the value `red`. | | labels.color:red labels.size:big | The project's label `color` has the value `red` or its label `size` has the value `big`. | ``` If no query is specified, the call will return projects for which the user has the `resourcemanager.projects.get` permission. */
  query?: string;
  /** Optional. A pagination token returned from a previous call to ListProjects that indicates from where listing should continue. */
  pageToken?: string;
  /** Optional. The maximum number of projects to return in the response. The server can return fewer projects than requested. If unspecified, server picks an appropriate default. */
  pageSize?: number;
}

export const SearchProjectsRequest = Schema.Struct({
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects:search" }),
  svc,
) as unknown as Schema.Schema<SearchProjectsRequest>;

export type SearchProjectsResponse_Op = SearchProjectsResponse;
export const SearchProjectsResponse_Op = SearchProjectsResponse;

export type SearchProjectsError = CommonErrors;

export const searchProjects = API.makePaginated(() => ({
  input: SearchProjectsRequest,
  output: SearchProjectsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Request that a new project be created. The result is an `Operation` which can be used to track the creation process. This process usually takes a few seconds, but can sometimes take much longer. The tracking `Operation` is automatically deleted after a few hours, so there is no need to call `DeleteOperation`. */
export interface CreateProjectsRequest {
  /** Request body */
  body?: Project;
}

export const CreateProjectsRequest = Schema.Struct({
  body: Schema.optional(Project).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsRequest>;

export type CreateProjectsResponse = Operation;
export const CreateProjectsResponse = Operation;

export type CreateProjectsError = CommonErrors;

export const createProjects: API.OperationMethod<CreateProjectsRequest, CreateProjectsResponse, CreateProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsRequest,
  output: CreateProjectsResponse,
  errors: [],
}));

/** Updates the `display_name` and labels of the project identified by the specified `name` (for example, `projects/415104041262`). Deleting all labels requires an update mask for labels field. The caller must have `resourcemanager.projects.update` permission for this project. */
export interface PatchProjectsRequest {
  /** Output only. The unique resource name of the project. It is an int64 generated number prefixed by "projects/". Example: `projects/415104041262` */
  name: string;
  /** Optional. An update mask to selectively update fields. */
  updateMask?: string;
  /** Request body */
  body?: Project;
}

export const PatchProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Project).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsRequest>;

export type PatchProjectsResponse = Operation;
export const PatchProjectsResponse = Operation;

export type PatchProjectsError = CommonErrors;

export const patchProjects: API.OperationMethod<PatchProjectsRequest, PatchProjectsResponse, PatchProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsRequest,
  output: PatchProjectsResponse,
  errors: [],
}));

/** Move a project to another place in your resource hierarchy, under a new resource parent. Returns an operation which can be used to track the process of the project move workflow. Upon success, the `Operation.response` field will be populated with the moved project. The caller must have `resourcemanager.projects.move` permission on the project, on the project's current and proposed new parent. If project has no current parent, or it currently does not have an associated organization resource, you will also need the `resourcemanager.projects.setIamPolicy` permission in the project. */
export interface MoveProjectsRequest {
  /** Required. The name of the project to move. */
  name: string;
  /** Request body */
  body?: MoveProjectRequest;
}

export const MoveProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MoveProjectRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}:move", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveProjectsRequest>;

export type MoveProjectsResponse = Operation;
export const MoveProjectsResponse = Operation;

export type MoveProjectsError = CommonErrors;

export const moveProjects: API.OperationMethod<MoveProjectsRequest, MoveProjectsResponse, MoveProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveProjectsRequest,
  output: MoveProjectsResponse,
  errors: [],
}));

/** Marks the project identified by the specified `name` (for example, `projects/415104041262`) for deletion. This method will only affect the project if it has a lifecycle state of ACTIVE. This method changes the Project's lifecycle state from ACTIVE to DELETE_REQUESTED. The deletion starts at an unspecified time, at which point the Project is no longer accessible. Until the deletion completes, you can check the lifecycle state checked by retrieving the project with GetProject, and the project remains visible to ListProjects. However, you cannot update the project. After the deletion completes, the project is not retrievable by the GetProject, ListProjects, and SearchProjects methods. The caller must have `resourcemanager.projects.delete` permissions for this project. */
export interface DeleteProjectsRequest {
  /** Required. The name of the Project (for example, `projects/415104041262`). */
  name: string;
}

export const DeleteProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsRequest>;

export type DeleteProjectsResponse = Operation;
export const DeleteProjectsResponse = Operation;

export type DeleteProjectsError = CommonErrors;

export const deleteProjects: API.OperationMethod<DeleteProjectsRequest, DeleteProjectsResponse, DeleteProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsRequest,
  output: DeleteProjectsResponse,
  errors: [],
}));

/** Restores the project identified by the specified `name` (for example, `projects/415104041262`). You can only use this method for a project that has a lifecycle state of DELETE_REQUESTED. After deletion starts, the project cannot be restored. The caller must have `resourcemanager.projects.undelete` permission for this project. */
export interface UndeleteProjectsRequest {
  /** Required. The name of the project (for example, `projects/415104041262`). Required. */
  name: string;
  /** Request body */
  body?: UndeleteProjectRequest;
}

export const UndeleteProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteProjectRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectsRequest>;

export type UndeleteProjectsResponse = Operation;
export const UndeleteProjectsResponse = Operation;

export type UndeleteProjectsError = CommonErrors;

export const undeleteProjects: API.OperationMethod<UndeleteProjectsRequest, UndeleteProjectsResponse, UndeleteProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteProjectsRequest,
  output: UndeleteProjectsResponse,
  errors: [],
}));

/** Returns the IAM access control policy for the specified project, in the format `projects/{ProjectIdOrNumber}` e.g. projects/123. Permission is denied if the policy or the resource do not exist. */
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
  T.Http({ method: "POST", path: "v3/projects/{projectsId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsRequest>;

export type GetIamPolicyProjectsResponse = Policy;
export const GetIamPolicyProjectsResponse = Policy;

export type GetIamPolicyProjectsError = CommonErrors;

export const getIamPolicyProjects: API.OperationMethod<GetIamPolicyProjectsRequest, GetIamPolicyProjectsResponse, GetIamPolicyProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsRequest,
  output: GetIamPolicyProjectsResponse,
  errors: [],
}));

/** Sets the IAM access control policy for the specified project, in the format `projects/{ProjectIdOrNumber}` e.g. projects/123. CAUTION: This method will replace the existing policy, and cannot be used to append additional IAM settings. Note: Removing service accounts from policies or changing their roles can render services completely inoperable. It is important to understand how the service account is being used before removing or updating its roles. The following constraints apply when using `setIamPolicy()`: + Project does not support `allUsers` and `allAuthenticatedUsers` as `members` in a `Binding` of a `Policy`. + The owner role can be granted to a `user`, `serviceAccount`, or a group that is part of an organization. For example, group@myownpersonaldomain.com could be added as an owner to a project in the myownpersonaldomain.com organization, but not the examplepetstore.com organization. + Service accounts can be made owners of a project directly without any restrictions. However, to be added as an owner, a user must be invited using the Cloud Platform console and must accept the invitation. + A user cannot be granted the owner role using `setIamPolicy()`. The user must be granted the owner role using the Cloud Platform Console and must explicitly accept the invitation. + Invitations to grant the owner role cannot be sent using `setIamPolicy()`; they must be sent only using the Cloud Platform Console. + If the project is not part of an organization, there must be at least one owner who has accepted the Terms of Service (ToS) agreement in the policy. Calling `setIamPolicy()` to remove the last ToS-accepted owner from the policy will fail. This restriction also applies to legacy projects that no longer have owners who have accepted the ToS. Edits to IAM policies will be rejected until the lack of a ToS-accepting owner is rectified. If the project is part of an organization, you can remove all owners, potentially making the organization inaccessible. */
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
  T.Http({ method: "POST", path: "v3/projects/{projectsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsRequest>;

export type SetIamPolicyProjectsResponse = Policy;
export const SetIamPolicyProjectsResponse = Policy;

export type SetIamPolicyProjectsError = CommonErrors;

export const setIamPolicyProjects: API.OperationMethod<SetIamPolicyProjectsRequest, SetIamPolicyProjectsResponse, SetIamPolicyProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsRequest,
  output: SetIamPolicyProjectsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified project, in the format `projects/{ProjectIdOrNumber}` e.g. projects/123.. */
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
  T.Http({ method: "POST", path: "v3/projects/{projectsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsRequest>;

export type TestIamPermissionsProjectsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsError = CommonErrors;

export const testIamPermissionsProjects: API.OperationMethod<TestIamPermissionsProjectsRequest, TestIamPermissionsProjectsResponse, TestIamPermissionsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsRequest,
  output: TestIamPermissionsProjectsResponse,
  errors: [],
}));

/** Returns tag bindings directly attached to a GCP resource. */
export interface GetLocationsTagBindingCollectionsRequest {
  /** Required. The full name of the TagBindingCollection in format: `locations/{location}/tagBindingCollections/{encoded-full-resource-name}` where the enoded-full-resource-name is the UTF-8 encoded name of the resource the TagBindings are bound to. E.g. "locations/global/tagBindingCollections/%2f%2fcloudresourcemanager.googleapis.com%2fprojects%2f123" */
  name: string;
}

export const GetLocationsTagBindingCollectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/locations/{locationsId}/tagBindingCollections/{tagBindingCollectionsId}" }),
  svc,
) as unknown as Schema.Schema<GetLocationsTagBindingCollectionsRequest>;

export type GetLocationsTagBindingCollectionsResponse = TagBindingCollection;
export const GetLocationsTagBindingCollectionsResponse = TagBindingCollection;

export type GetLocationsTagBindingCollectionsError = CommonErrors;

export const getLocationsTagBindingCollections: API.OperationMethod<GetLocationsTagBindingCollectionsRequest, GetLocationsTagBindingCollectionsResponse, GetLocationsTagBindingCollectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLocationsTagBindingCollectionsRequest,
  output: GetLocationsTagBindingCollectionsResponse,
  errors: [],
}));

/** Updates tag bindings directly attached to a GCP resource. Update_mask can be kept empty or "*". */
export interface PatchLocationsTagBindingCollectionsRequest {
  /** Identifier. The name of the TagBindingCollection, following the convention: `locations/{location}/tagBindingCollections/{encoded-full-resource-name}` where the encoded-full-resource-name is the UTF-8 encoded name of the GCP resource the TagBindings are bound to. "locations/global/tagBindingCollections/%2f%2fcloudresourcemanager.googleapis.com%2fprojects%2f123" */
  name: string;
  /** Optional. An update mask to selectively update fields. */
  updateMask?: string;
  /** Request body */
  body?: TagBindingCollection;
}

export const PatchLocationsTagBindingCollectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(TagBindingCollection).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/locations/{locationsId}/tagBindingCollections/{tagBindingCollectionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchLocationsTagBindingCollectionsRequest>;

export type PatchLocationsTagBindingCollectionsResponse = Operation;
export const PatchLocationsTagBindingCollectionsResponse = Operation;

export type PatchLocationsTagBindingCollectionsError = CommonErrors;

export const patchLocationsTagBindingCollections: API.OperationMethod<PatchLocationsTagBindingCollectionsRequest, PatchLocationsTagBindingCollectionsResponse, PatchLocationsTagBindingCollectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchLocationsTagBindingCollectionsRequest,
  output: PatchLocationsTagBindingCollectionsResponse,
  errors: [],
}));

/** Returns effective tag bindings on a GCP resource. */
export interface GetLocationsEffectiveTagBindingCollectionsRequest {
  /** Required. The full name of the EffectiveTagBindingCollection in format: `locations/{location}/effectiveTagBindingCollections/{encoded-full-resource-name}` where the encoded-full-resource-name is the UTF-8 encoded name of the resource the TagBindings are bound to. E.g. "locations/global/effectiveTagBindingCollections/%2f%2fcloudresourcemanager.googleapis.com%2fprojects%2f123" */
  name: string;
}

export const GetLocationsEffectiveTagBindingCollectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/locations/{locationsId}/effectiveTagBindingCollections/{effectiveTagBindingCollectionsId}" }),
  svc,
) as unknown as Schema.Schema<GetLocationsEffectiveTagBindingCollectionsRequest>;

export type GetLocationsEffectiveTagBindingCollectionsResponse = EffectiveTagBindingCollection;
export const GetLocationsEffectiveTagBindingCollectionsResponse = EffectiveTagBindingCollection;

export type GetLocationsEffectiveTagBindingCollectionsError = CommonErrors;

export const getLocationsEffectiveTagBindingCollections: API.OperationMethod<GetLocationsEffectiveTagBindingCollectionsRequest, GetLocationsEffectiveTagBindingCollectionsResponse, GetLocationsEffectiveTagBindingCollectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLocationsEffectiveTagBindingCollectionsRequest,
  output: GetLocationsEffectiveTagBindingCollectionsResponse,
  errors: [],
}));

/** Lists the TagBindings for the given Google Cloud resource, as specified with `parent`. NOTE: The `parent` field is expected to be a full resource name: https://cloud.google.com/apis/design/resource_names#full_resource_name */
export interface ListTagBindingsRequest {
  /** Required. The full resource name of a resource for which you want to list existing TagBindings. E.g. "//cloudresourcemanager.googleapis.com/projects/123" */
  parent?: string;
  /** Optional. The maximum number of TagBindings to return in the response. The server allows a maximum of 300 TagBindings to return. If unspecified, the server will use 100 as the default. */
  pageSize?: number;
  /** Optional. A pagination token returned from a previous call to `ListTagBindings` that indicates where this listing should continue from. */
  pageToken?: string;
}

export const ListTagBindingsRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/tagBindings" }),
  svc,
) as unknown as Schema.Schema<ListTagBindingsRequest>;

export type ListTagBindingsResponse_Op = ListTagBindingsResponse;
export const ListTagBindingsResponse_Op = ListTagBindingsResponse;

export type ListTagBindingsError = CommonErrors;

export const listTagBindings = API.makePaginated(() => ({
  input: ListTagBindingsRequest,
  output: ListTagBindingsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a TagBinding between a TagValue and a Google Cloud resource. */
export interface CreateTagBindingsRequest {
  /** Optional. Set to true to perform the validations necessary for creating the resource, but not actually perform the action. */
  validateOnly?: boolean;
  /** Request body */
  body?: TagBinding;
}

export const CreateTagBindingsRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(TagBinding).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/tagBindings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateTagBindingsRequest>;

export type CreateTagBindingsResponse = Operation;
export const CreateTagBindingsResponse = Operation;

export type CreateTagBindingsError = CommonErrors;

export const createTagBindings: API.OperationMethod<CreateTagBindingsRequest, CreateTagBindingsResponse, CreateTagBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateTagBindingsRequest,
  output: CreateTagBindingsResponse,
  errors: [],
}));

/** Deletes a TagBinding. */
export interface DeleteTagBindingsRequest {
  /** Required. The name of the TagBinding. This is a String of the form: `tagBindings/{id}` (e.g. `tagBindings/%2F%2Fcloudresourcemanager.googleapis.com%2Fprojects%2F123/tagValues/456`). */
  name: string;
}

export const DeleteTagBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/tagBindings/{tagBindingsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteTagBindingsRequest>;

export type DeleteTagBindingsResponse = Operation;
export const DeleteTagBindingsResponse = Operation;

export type DeleteTagBindingsError = CommonErrors;

export const deleteTagBindings: API.OperationMethod<DeleteTagBindingsRequest, DeleteTagBindingsResponse, DeleteTagBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteTagBindingsRequest,
  output: DeleteTagBindingsResponse,
  errors: [],
}));

/** Return a list of effective tags for the given Google Cloud resource, as specified in `parent`. */
export interface ListEffectiveTagsRequest {
  /** Required. The full resource name of a resource for which you want to list the effective tags. E.g. "//cloudresourcemanager.googleapis.com/projects/123" */
  parent?: string;
  /** Optional. The maximum number of effective tags to return in the response. The server allows a maximum of 300 effective tags to return in a single page. If unspecified, the server will use 100 as the default. */
  pageSize?: number;
  /** Optional. A pagination token returned from a previous call to `ListEffectiveTags` that indicates from where this listing should continue. */
  pageToken?: string;
}

export const ListEffectiveTagsRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/effectiveTags" }),
  svc,
) as unknown as Schema.Schema<ListEffectiveTagsRequest>;

export type ListEffectiveTagsResponse_Op = ListEffectiveTagsResponse;
export const ListEffectiveTagsResponse_Op = ListEffectiveTagsResponse;

export type ListEffectiveTagsError = CommonErrors;

export const listEffectiveTags = API.makePaginated(() => ({
  input: ListEffectiveTagsRequest,
  output: ListEffectiveTagsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all TagKeys for a parent resource. */
export interface ListTagKeysRequest {
  /** Required. The resource name of the TagKey's parent. Must be of the form `organizations/{org_id}` or `projects/{project_id}` or `projects/{project_number}` */
  parent?: string;
  /** Optional. The maximum number of TagKeys to return in the response. The server allows a maximum of 300 TagKeys to return. If unspecified, the server will use 100 as the default. */
  pageSize?: number;
  /** Optional. A pagination token returned from a previous call to `ListTagKey` that indicates where this listing should continue from. */
  pageToken?: string;
}

export const ListTagKeysRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/tagKeys" }),
  svc,
) as unknown as Schema.Schema<ListTagKeysRequest>;

export type ListTagKeysResponse_Op = ListTagKeysResponse;
export const ListTagKeysResponse_Op = ListTagKeysResponse;

export type ListTagKeysError = CommonErrors;

export const listTagKeys = API.makePaginated(() => ({
  input: ListTagKeysRequest,
  output: ListTagKeysResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a TagKey. This method will return `PERMISSION_DENIED` if the key does not exist or the user does not have permission to view it. */
export interface GetTagKeysRequest {
  /** Required. A resource name in the format `tagKeys/{id}`, such as `tagKeys/123`. */
  name: string;
}

export const GetTagKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/tagKeys/{tagKeysId}" }),
  svc,
) as unknown as Schema.Schema<GetTagKeysRequest>;

export type GetTagKeysResponse = TagKey;
export const GetTagKeysResponse = TagKey;

export type GetTagKeysError = CommonErrors;

export const getTagKeys: API.OperationMethod<GetTagKeysRequest, GetTagKeysResponse, GetTagKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTagKeysRequest,
  output: GetTagKeysResponse,
  errors: [],
}));

/** Retrieves a TagKey by its namespaced name. This method will return `PERMISSION_DENIED` if the key does not exist or the user does not have permission to view it. */
export interface GetNamespacedTagKeysRequest {
  /** Required. A namespaced tag key name in the format `{parentId}/{tagKeyShort}`, such as `42/foo` for a key with short name "foo" under the organization with ID 42 or `r2-d2/bar` for a key with short name "bar" under the project `r2-d2`. */
  name?: string;
}

export const GetNamespacedTagKeysRequest = Schema.Struct({
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/tagKeys/namespaced" }),
  svc,
) as unknown as Schema.Schema<GetNamespacedTagKeysRequest>;

export type GetNamespacedTagKeysResponse = TagKey;
export const GetNamespacedTagKeysResponse = TagKey;

export type GetNamespacedTagKeysError = CommonErrors;

export const getNamespacedTagKeys: API.OperationMethod<GetNamespacedTagKeysRequest, GetNamespacedTagKeysResponse, GetNamespacedTagKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNamespacedTagKeysRequest,
  output: GetNamespacedTagKeysResponse,
  errors: [],
}));

/** Creates a new TagKey. If another request with the same parameters is sent while the original request is in process, the second request will receive an error. A maximum of 1000 TagKeys can exist under a parent at any given time. */
export interface CreateTagKeysRequest {
  /** Optional. Set to true to perform validations necessary for creating the resource, but not actually perform the action. */
  validateOnly?: boolean;
  /** Request body */
  body?: TagKey;
}

export const CreateTagKeysRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(TagKey).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/tagKeys", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateTagKeysRequest>;

export type CreateTagKeysResponse = Operation;
export const CreateTagKeysResponse = Operation;

export type CreateTagKeysError = CommonErrors;

export const createTagKeys: API.OperationMethod<CreateTagKeysRequest, CreateTagKeysResponse, CreateTagKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateTagKeysRequest,
  output: CreateTagKeysResponse,
  errors: [],
}));

/** Updates the attributes of the TagKey resource. */
export interface PatchTagKeysRequest {
  /** Immutable. The resource name for a TagKey. Must be in the format `tagKeys/{tag_key_id}`, where `tag_key_id` is the generated numeric id for the TagKey. */
  name: string;
  /** Fields to be updated. The mask may only contain `description` or `etag`. If omitted entirely, both `description` and `etag` are assumed to be significant. */
  updateMask?: string;
  /** Set as true to perform validations necessary for updating the resource, but not actually perform the action. */
  validateOnly?: boolean;
  /** Request body */
  body?: TagKey;
}

export const PatchTagKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(TagKey).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/tagKeys/{tagKeysId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchTagKeysRequest>;

export type PatchTagKeysResponse = Operation;
export const PatchTagKeysResponse = Operation;

export type PatchTagKeysError = CommonErrors;

export const patchTagKeys: API.OperationMethod<PatchTagKeysRequest, PatchTagKeysResponse, PatchTagKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchTagKeysRequest,
  output: PatchTagKeysResponse,
  errors: [],
}));

/** Deletes a TagKey. The TagKey cannot be deleted if it has any child TagValues. */
export interface DeleteTagKeysRequest {
  /** Required. The resource name of a TagKey to be deleted in the format `tagKeys/123`. The TagKey cannot be a parent of any existing TagValues or it will not be deleted successfully. */
  name: string;
  /** Optional. Set as true to perform validations necessary for deletion, but not actually perform the action. */
  validateOnly?: boolean;
  /** Optional. The etag known to the client for the expected state of the TagKey. This is to be used for optimistic concurrency. */
  etag?: string;
}

export const DeleteTagKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/tagKeys/{tagKeysId}" }),
  svc,
) as unknown as Schema.Schema<DeleteTagKeysRequest>;

export type DeleteTagKeysResponse = Operation;
export const DeleteTagKeysResponse = Operation;

export type DeleteTagKeysError = CommonErrors;

export const deleteTagKeys: API.OperationMethod<DeleteTagKeysRequest, DeleteTagKeysResponse, DeleteTagKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteTagKeysRequest,
  output: DeleteTagKeysResponse,
  errors: [],
}));

/** Gets the access control policy for a TagKey. The returned policy may be empty if no such policy or resource exists. The `resource` field should be the TagKey's resource name. For example, "tagKeys/1234". The caller must have `cloudresourcemanager.googleapis.com/tagKeys.getIamPolicy` permission on the specified TagKey. */
export interface GetIamPolicyTagKeysRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyTagKeysRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/tagKeys/{tagKeysId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyTagKeysRequest>;

export type GetIamPolicyTagKeysResponse = Policy;
export const GetIamPolicyTagKeysResponse = Policy;

export type GetIamPolicyTagKeysError = CommonErrors;

export const getIamPolicyTagKeys: API.OperationMethod<GetIamPolicyTagKeysRequest, GetIamPolicyTagKeysResponse, GetIamPolicyTagKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyTagKeysRequest,
  output: GetIamPolicyTagKeysResponse,
  errors: [],
}));

/** Sets the access control policy on a TagKey, replacing any existing policy. The `resource` field should be the TagKey's resource name. For example, "tagKeys/1234". The caller must have `resourcemanager.tagKeys.setIamPolicy` permission on the identified tagValue. */
export interface SetIamPolicyTagKeysRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyTagKeysRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/tagKeys/{tagKeysId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyTagKeysRequest>;

export type SetIamPolicyTagKeysResponse = Policy;
export const SetIamPolicyTagKeysResponse = Policy;

export type SetIamPolicyTagKeysError = CommonErrors;

export const setIamPolicyTagKeys: API.OperationMethod<SetIamPolicyTagKeysRequest, SetIamPolicyTagKeysResponse, SetIamPolicyTagKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyTagKeysRequest,
  output: SetIamPolicyTagKeysResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified TagKey. The `resource` field should be the TagKey's resource name. For example, "tagKeys/1234". There are no permissions required for making this API call. */
export interface TestIamPermissionsTagKeysRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsTagKeysRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/tagKeys/{tagKeysId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsTagKeysRequest>;

export type TestIamPermissionsTagKeysResponse = TestIamPermissionsResponse;
export const TestIamPermissionsTagKeysResponse = TestIamPermissionsResponse;

export type TestIamPermissionsTagKeysError = CommonErrors;

export const testIamPermissionsTagKeys: API.OperationMethod<TestIamPermissionsTagKeysRequest, TestIamPermissionsTagKeysResponse, TestIamPermissionsTagKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsTagKeysRequest,
  output: TestIamPermissionsTagKeysResponse,
  errors: [],
}));

/** Lists all TagValues for a specific TagKey. */
export interface ListTagValuesRequest {
  /** Required. Resource name for the parent of the TagValues to be listed, in the format `tagKeys/123` or `tagValues/123`. */
  parent?: string;
  /** Optional. The maximum number of TagValues to return in the response. The server allows a maximum of 300 TagValues to return. If unspecified, the server will use 100 as the default. */
  pageSize?: number;
  /** Optional. A pagination token returned from a previous call to `ListTagValues` that indicates where this listing should continue from. */
  pageToken?: string;
}

export const ListTagValuesRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/tagValues" }),
  svc,
) as unknown as Schema.Schema<ListTagValuesRequest>;

export type ListTagValuesResponse_Op = ListTagValuesResponse;
export const ListTagValuesResponse_Op = ListTagValuesResponse;

export type ListTagValuesError = CommonErrors;

export const listTagValues = API.makePaginated(() => ({
  input: ListTagValuesRequest,
  output: ListTagValuesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a TagValue. This method will return `PERMISSION_DENIED` if the value does not exist or the user does not have permission to view it. */
export interface GetTagValuesRequest {
  /** Required. Resource name for TagValue to be fetched in the format `tagValues/456`. */
  name: string;
}

export const GetTagValuesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/tagValues/{tagValuesId}" }),
  svc,
) as unknown as Schema.Schema<GetTagValuesRequest>;

export type GetTagValuesResponse = TagValue;
export const GetTagValuesResponse = TagValue;

export type GetTagValuesError = CommonErrors;

export const getTagValues: API.OperationMethod<GetTagValuesRequest, GetTagValuesResponse, GetTagValuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTagValuesRequest,
  output: GetTagValuesResponse,
  errors: [],
}));

/** Retrieves a TagValue by its namespaced name. This method will return `PERMISSION_DENIED` if the value does not exist or the user does not have permission to view it. */
export interface GetNamespacedTagValuesRequest {
  /** Required. A namespaced tag value name in the following format: `{parentId}/{tagKeyShort}/{tagValueShort}` Examples: - `42/foo/abc` for a value with short name "abc" under the key with short name "foo" under the organization with ID 42 - `r2-d2/bar/xyz` for a value with short name "xyz" under the key with short name "bar" under the project with ID "r2-d2" */
  name?: string;
}

export const GetNamespacedTagValuesRequest = Schema.Struct({
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/tagValues/namespaced" }),
  svc,
) as unknown as Schema.Schema<GetNamespacedTagValuesRequest>;

export type GetNamespacedTagValuesResponse = TagValue;
export const GetNamespacedTagValuesResponse = TagValue;

export type GetNamespacedTagValuesError = CommonErrors;

export const getNamespacedTagValues: API.OperationMethod<GetNamespacedTagValuesRequest, GetNamespacedTagValuesResponse, GetNamespacedTagValuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNamespacedTagValuesRequest,
  output: GetNamespacedTagValuesResponse,
  errors: [],
}));

/** Creates a TagValue as a child of the specified TagKey. If a another request with the same parameters is sent while the original request is in process the second request will receive an error. A maximum of 1000 TagValues can exist under a TagKey at any given time. */
export interface CreateTagValuesRequest {
  /** Optional. Set as true to perform the validations necessary for creating the resource, but not actually perform the action. */
  validateOnly?: boolean;
  /** Request body */
  body?: TagValue;
}

export const CreateTagValuesRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(TagValue).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/tagValues", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateTagValuesRequest>;

export type CreateTagValuesResponse = Operation;
export const CreateTagValuesResponse = Operation;

export type CreateTagValuesError = CommonErrors;

export const createTagValues: API.OperationMethod<CreateTagValuesRequest, CreateTagValuesResponse, CreateTagValuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateTagValuesRequest,
  output: CreateTagValuesResponse,
  errors: [],
}));

/** Updates the attributes of the TagValue resource. */
export interface PatchTagValuesRequest {
  /** Immutable. Resource name for TagValue in the format `tagValues/456`. */
  name: string;
  /** Optional. Fields to be updated. */
  updateMask?: string;
  /** Optional. True to perform validations necessary for updating the resource, but not actually perform the action. */
  validateOnly?: boolean;
  /** Request body */
  body?: TagValue;
}

export const PatchTagValuesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(TagValue).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/tagValues/{tagValuesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchTagValuesRequest>;

export type PatchTagValuesResponse = Operation;
export const PatchTagValuesResponse = Operation;

export type PatchTagValuesError = CommonErrors;

export const patchTagValues: API.OperationMethod<PatchTagValuesRequest, PatchTagValuesResponse, PatchTagValuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchTagValuesRequest,
  output: PatchTagValuesResponse,
  errors: [],
}));

/** Deletes a TagValue. The TagValue cannot have any bindings when it is deleted. */
export interface DeleteTagValuesRequest {
  /** Required. Resource name for TagValue to be deleted in the format tagValues/456. */
  name: string;
  /** Optional. Set as true to perform the validations necessary for deletion, but not actually perform the action. */
  validateOnly?: boolean;
  /** Optional. The etag known to the client for the expected state of the TagValue. This is to be used for optimistic concurrency. */
  etag?: string;
}

export const DeleteTagValuesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/tagValues/{tagValuesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteTagValuesRequest>;

export type DeleteTagValuesResponse = Operation;
export const DeleteTagValuesResponse = Operation;

export type DeleteTagValuesError = CommonErrors;

export const deleteTagValues: API.OperationMethod<DeleteTagValuesRequest, DeleteTagValuesResponse, DeleteTagValuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteTagValuesRequest,
  output: DeleteTagValuesResponse,
  errors: [],
}));

/** Gets the access control policy for a TagValue. The returned policy may be empty if no such policy or resource exists. The `resource` field should be the TagValue's resource name. For example: `tagValues/1234`. The caller must have the `cloudresourcemanager.googleapis.com/tagValues.getIamPolicy` permission on the identified TagValue to get the access control policy. */
export interface GetIamPolicyTagValuesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyTagValuesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/tagValues/{tagValuesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyTagValuesRequest>;

export type GetIamPolicyTagValuesResponse = Policy;
export const GetIamPolicyTagValuesResponse = Policy;

export type GetIamPolicyTagValuesError = CommonErrors;

export const getIamPolicyTagValues: API.OperationMethod<GetIamPolicyTagValuesRequest, GetIamPolicyTagValuesResponse, GetIamPolicyTagValuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyTagValuesRequest,
  output: GetIamPolicyTagValuesResponse,
  errors: [],
}));

/** Sets the access control policy on a TagValue, replacing any existing policy. The `resource` field should be the TagValue's resource name. For example: `tagValues/1234`. The caller must have `resourcemanager.tagValues.setIamPolicy` permission on the identified tagValue. */
export interface SetIamPolicyTagValuesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyTagValuesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/tagValues/{tagValuesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyTagValuesRequest>;

export type SetIamPolicyTagValuesResponse = Policy;
export const SetIamPolicyTagValuesResponse = Policy;

export type SetIamPolicyTagValuesError = CommonErrors;

export const setIamPolicyTagValues: API.OperationMethod<SetIamPolicyTagValuesRequest, SetIamPolicyTagValuesResponse, SetIamPolicyTagValuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyTagValuesRequest,
  output: SetIamPolicyTagValuesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified TagValue. The `resource` field should be the TagValue's resource name. For example: `tagValues/1234`. There are no permissions required for making this API call. */
export interface TestIamPermissionsTagValuesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsTagValuesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/tagValues/{tagValuesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsTagValuesRequest>;

export type TestIamPermissionsTagValuesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsTagValuesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsTagValuesError = CommonErrors;

export const testIamPermissionsTagValues: API.OperationMethod<TestIamPermissionsTagValuesRequest, TestIamPermissionsTagValuesResponse, TestIamPermissionsTagValuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsTagValuesRequest,
  output: TestIamPermissionsTagValuesResponse,
  errors: [],
}));

/** Creates a TagHold. Returns ALREADY_EXISTS if a TagHold with the same resource and origin exists under the same TagValue. */
export interface CreateTagValuesTagHoldsRequest {
  /** Required. The resource name of the TagHold's parent TagValue. Must be of the form: `tagValues/{tag-value-id}`. */
  parent: string;
  /** Optional. Set to true to perform the validations necessary for creating the resource, but not actually perform the action. */
  validateOnly?: boolean;
  /** Request body */
  body?: TagHold;
}

export const CreateTagValuesTagHoldsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(TagHold).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/tagValues/{tagValuesId}/tagHolds", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateTagValuesTagHoldsRequest>;

export type CreateTagValuesTagHoldsResponse = Operation;
export const CreateTagValuesTagHoldsResponse = Operation;

export type CreateTagValuesTagHoldsError = CommonErrors;

export const createTagValuesTagHolds: API.OperationMethod<CreateTagValuesTagHoldsRequest, CreateTagValuesTagHoldsResponse, CreateTagValuesTagHoldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateTagValuesTagHoldsRequest,
  output: CreateTagValuesTagHoldsResponse,
  errors: [],
}));

/** Deletes a TagHold. */
export interface DeleteTagValuesTagHoldsRequest {
  /** Required. The resource name of the TagHold to delete. Must be of the form: `tagValues/{tag-value-id}/tagHolds/{tag-hold-id}`. */
  name: string;
  /** Optional. Set to true to perform the validations necessary for deleting the resource, but not actually perform the action. */
  validateOnly?: boolean;
}

export const DeleteTagValuesTagHoldsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/tagValues/{tagValuesId}/tagHolds/{tagHoldsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteTagValuesTagHoldsRequest>;

export type DeleteTagValuesTagHoldsResponse = Operation;
export const DeleteTagValuesTagHoldsResponse = Operation;

export type DeleteTagValuesTagHoldsError = CommonErrors;

export const deleteTagValuesTagHolds: API.OperationMethod<DeleteTagValuesTagHoldsRequest, DeleteTagValuesTagHoldsResponse, DeleteTagValuesTagHoldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteTagValuesTagHoldsRequest,
  output: DeleteTagValuesTagHoldsResponse,
  errors: [],
}));

/** Lists TagHolds under a TagValue. */
export interface ListTagValuesTagHoldsRequest {
  /** Required. The resource name of the parent TagValue. Must be of the form: `tagValues/{tag-value-id}`. */
  parent: string;
  /** Optional. The maximum number of TagHolds to return in the response. The server allows a maximum of 300 TagHolds to return. If unspecified, the server will use 100 as the default. */
  pageSize?: number;
  /** Optional. A pagination token returned from a previous call to `ListTagHolds` that indicates where this listing should continue from. */
  pageToken?: string;
  /** Optional. Criteria used to select a subset of TagHolds parented by the TagValue to return. This field follows the syntax defined by aip.dev/160; the `holder` and `origin` fields are supported for filtering. Currently only `AND` syntax is supported. Some example queries are: * `holder = //compute.googleapis.com/compute/projects/myproject/regions/us-east-1/instanceGroupManagers/instance-group` * `origin = 35678234` * `holder = //compute.googleapis.com/compute/projects/myproject/regions/us-east-1/instanceGroupManagers/instance-group AND origin = 35678234` */
  filter?: string;
}

export const ListTagValuesTagHoldsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v3/tagValues/{tagValuesId}/tagHolds" }),
  svc,
) as unknown as Schema.Schema<ListTagValuesTagHoldsRequest>;

export type ListTagValuesTagHoldsResponse = ListTagHoldsResponse;
export const ListTagValuesTagHoldsResponse = ListTagHoldsResponse;

export type ListTagValuesTagHoldsError = CommonErrors;

export const listTagValuesTagHolds = API.makePaginated(() => ({
  input: ListTagValuesTagHoldsRequest,
  output: ListTagValuesTagHoldsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

