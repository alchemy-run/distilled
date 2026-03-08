// ==========================================================================
// Cloud Resource Manager API (cloudresourcemanager v1beta1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "cloudresourcemanager",
  version: "v1beta1",
  rootUrl: "https://cloudresourcemanager.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ResourceId {
  /** Required field representing the resource type this id is for. At present, the valid types are "project", "folder", and "organization". */
  type?: string;
  /** Required field for the type-specific id. This should correspond to the id used in the type-specific API's. */
  id?: string;
}

export const ResourceId: Schema.Schema<ResourceId> = Schema.suspend(() =>
  Schema.Struct({
    type: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ResourceId" }) as any as Schema.Schema<ResourceId>;

export interface Project {
  /** The number uniquely identifying the project. Example: `415104041262` Read-only. */
  projectNumber?: string;
  /** The unique, user-assigned ID of the Project. It must be 6 to 30 lowercase letters, digits, or hyphens. It must start with a letter. Trailing hyphens are prohibited. Example: `tokyo-rain-123` Read-only after creation. */
  projectId?: string;
  /** The Project lifecycle state. Read-only. */
  lifecycleState?:
    | "LIFECYCLE_STATE_UNSPECIFIED"
    | "ACTIVE"
    | "DELETE_REQUESTED"
    | "DELETE_IN_PROGRESS"
    | (string & {});
  /** The optional user-assigned display name of the Project. When present it must be between 4 to 30 characters. Allowed characters are: lowercase and uppercase letters, numbers, hyphen, single-quote, double-quote, space, and exclamation point. Example: `My Project` Read-write. */
  name?: string;
  /** Creation time. Read-only. */
  createTime?: string;
  /** The labels associated with this Project. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: a-z{0,62}. Label values must be between 0 and 63 characters long and must conform to the regular expression [a-z0-9_-]{0,63}. A label value can be empty. No more than 256 labels can be associated with a given resource. Clients should store labels in a representation such as JSON that does not depend on specific characters being disallowed. Example: `"environment" : "dev"` Read-write. */
  labels?: Record<string, string>;
  /** An optional reference to a parent Resource. Supported parent types include "organization" and "folder". Once set, the parent cannot be cleared. The `parent` can be set on creation or using the `UpdateProject` method; the end user must have the `resourcemanager.projects.create` permission on the parent. Read-write. */
  parent?: ResourceId;
  /** Output only. If this project is a Management Project, list of capabilities configured on the parent folder. Note, presence of any capability implies that this is a Management Project. Example: `folders/123/capabilities/app-management`. OUTPUT ONLY. */
  configuredCapabilities?: Array<string>;
}

export const Project: Schema.Schema<Project> = Schema.suspend(() =>
  Schema.Struct({
    projectNumber: Schema.optional(Schema.String),
    projectId: Schema.optional(Schema.String),
    lifecycleState: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    parent: Schema.optional(ResourceId),
    configuredCapabilities: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "Project" }) as any as Schema.Schema<Project>;

export interface ListProjectsResponse {
  /** The list of Projects that matched the list filter. This list can be paginated. */
  projects?: Array<Project>;
  /** Pagination token. If the result set is too large to fit in a single response, this token is returned. It encodes the position of the current result cursor. Feeding this value into a new list request with the `page_token` parameter gives the next page of the results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. Pagination tokens have a limited lifetime. */
  nextPageToken?: string;
}

export const ListProjectsResponse: Schema.Schema<ListProjectsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      projects: Schema.optional(Schema.Array(Project)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListProjectsResponse",
  }) as any as Schema.Schema<ListProjectsResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface UndeleteProjectRequest {}

export const UndeleteProjectRequest: Schema.Schema<UndeleteProjectRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteProjectRequest",
  }) as any as Schema.Schema<UndeleteProjectRequest>;

export interface GetAncestryRequest {}

export const GetAncestryRequest: Schema.Schema<GetAncestryRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GetAncestryRequest",
  }) as any as Schema.Schema<GetAncestryRequest>;

export interface Ancestor {
  /** Resource id of the ancestor. */
  resourceId?: ResourceId;
}

export const Ancestor: Schema.Schema<Ancestor> = Schema.suspend(() =>
  Schema.Struct({
    resourceId: Schema.optional(ResourceId),
  }),
).annotate({ identifier: "Ancestor" }) as any as Schema.Schema<Ancestor>;

export interface GetAncestryResponse {
  /** Ancestors are ordered from bottom to top of the resource hierarchy. The first ancestor is the project itself, followed by the project's parent, etc. */
  ancestor?: Array<Ancestor>;
}

export const GetAncestryResponse: Schema.Schema<GetAncestryResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      ancestor: Schema.optional(Schema.Array(Ancestor)),
    }),
  ).annotate({
    identifier: "GetAncestryResponse",
  }) as any as Schema.Schema<GetAncestryResponse>;

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> = Schema.suspend(
  () =>
    Schema.Struct({
      requestedPolicyVersion: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "GetPolicyOptions",
}) as any as Schema.Schema<GetPolicyOptions>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      options: Schema.optional(GetPolicyOptions),
    }),
  ).annotate({
    identifier: "GetIamPolicyRequest",
  }) as any as Schema.Schema<GetIamPolicyRequest>;

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

export const Expr: Schema.Schema<Expr> = Schema.suspend(() =>
  Schema.Struct({
    expression: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() =>
  Schema.Struct({
    role: Schema.optional(Schema.String),
    members: Schema.optional(Schema.Array(Schema.String)),
    condition: Schema.optional(Expr),
  }),
).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface AuditLogConfig {
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

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      logType: Schema.optional(Schema.String),
      exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "AuditLogConfig",
}) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() =>
  Schema.Struct({
    service: Schema.optional(Schema.String),
    auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
  }),
).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

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

export const Policy: Schema.Schema<Policy> = Schema.suspend(() =>
  Schema.Struct({
    version: Schema.optional(Schema.Number),
    bindings: Schema.optional(Schema.Array(Binding)),
    auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
    etag: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(Policy),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SetIamPolicyRequest",
  }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsRequest",
  }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsResponse",
  }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface OrganizationOwner {
  /** The G Suite customer id used in the Directory API. */
  directoryCustomerId?: string;
}

export const OrganizationOwner: Schema.Schema<OrganizationOwner> =
  Schema.suspend(() =>
    Schema.Struct({
      directoryCustomerId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OrganizationOwner",
  }) as any as Schema.Schema<OrganizationOwner>;

export interface Organization {
  /** Output only. The resource name of the organization. This is the organization's relative path in the API. Its format is "organizations/[organization_id]". For example, "organizations/1234". */
  name?: string;
  /** An immutable id for the Organization that is assigned on creation. This should be omitted when creating a new Organization. This field is read-only. */
  organizationId?: string;
  /** A human-readable string that refers to the Organization in the Google Cloud console. This string is set by the server and cannot be changed. The string will be set to the primary domain (for example, "google.com") of the G Suite customer that owns the organization. */
  displayName?: string;
  /** The owner of this Organization. The owner should be specified on creation. Once set, it cannot be changed. This field is required. */
  owner?: OrganizationOwner;
  /** Timestamp when the Organization was created. Assigned by the server. */
  creationTime?: string;
  /** The organization's current lifecycle state. Assigned by the server. */
  lifecycleState?:
    | "LIFECYCLE_STATE_UNSPECIFIED"
    | "ACTIVE"
    | "DELETE_REQUESTED"
    | (string & {});
}

export const Organization: Schema.Schema<Organization> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    organizationId: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    owner: Schema.optional(OrganizationOwner),
    creationTime: Schema.optional(Schema.String),
    lifecycleState: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "Organization",
}) as any as Schema.Schema<Organization>;

export interface ListOrganizationsResponse {
  /** The list of Organizations that matched the list query, possibly paginated. */
  organizations?: Array<Organization>;
  /** A pagination token to be used to retrieve the next page of results. If the result is too large to fit within the page size specified in the request, this field will be set with a token that can be used to fetch the next page of results. If this field is empty, it indicates that this response contains the last page of results. */
  nextPageToken?: string;
}

export const ListOrganizationsResponse: Schema.Schema<ListOrganizationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      organizations: Schema.optional(Schema.Array(Organization)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListOrganizationsResponse",
  }) as any as Schema.Schema<ListOrganizationsResponse>;

export interface ProjectCreationStatus {
  /** Creation time of the project creation workflow. */
  createTime?: string;
  /** True if the project can be retrieved using GetProject. No other operations on the project are guaranteed to work until the project creation is complete. */
  gettable?: boolean;
  /** True if the project creation process is complete. */
  ready?: boolean;
}

export const ProjectCreationStatus: Schema.Schema<ProjectCreationStatus> =
  Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      gettable: Schema.optional(Schema.Boolean),
      ready: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ProjectCreationStatus",
  }) as any as Schema.Schema<ProjectCreationStatus>;

export interface CloudresourcemanagerGoogleCloudResourcemanagerV2alpha1FolderOperation {
  /** The display name of the folder. */
  displayName?: string;
  /** The type of this operation. */
  operationType?:
    | "OPERATION_TYPE_UNSPECIFIED"
    | "CREATE"
    | "MOVE"
    | (string & {});
  /** The resource name of the folder's parent. Only applicable when the operation_type is MOVE. */
  sourceParent?: string;
  /** The resource name of the folder or organization we are either creating the folder under or moving the folder to. */
  destinationParent?: string;
}

export const CloudresourcemanagerGoogleCloudResourcemanagerV2alpha1FolderOperation: Schema.Schema<CloudresourcemanagerGoogleCloudResourcemanagerV2alpha1FolderOperation> =
  Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      operationType: Schema.optional(Schema.String),
      sourceParent: Schema.optional(Schema.String),
      destinationParent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "CloudresourcemanagerGoogleCloudResourcemanagerV2alpha1FolderOperation",
  }) as any as Schema.Schema<CloudresourcemanagerGoogleCloudResourcemanagerV2alpha1FolderOperation>;

export interface FolderOperationError {
  /** The type of operation error experienced. */
  errorMessageId?:
    | "ERROR_TYPE_UNSPECIFIED"
    | "ACTIVE_FOLDER_HEIGHT_VIOLATION"
    | "MAX_CHILD_FOLDERS_VIOLATION"
    | "FOLDER_NAME_UNIQUENESS_VIOLATION"
    | "RESOURCE_DELETED_VIOLATION"
    | "PARENT_DELETED_VIOLATION"
    | "CYCLE_INTRODUCED_VIOLATION"
    | "FOLDER_BEING_MOVED_VIOLATION"
    | "FOLDER_TO_DELETE_NON_EMPTY_VIOLATION"
    | "DELETED_FOLDER_HEIGHT_VIOLATION"
    | "FOLDER_TO_DELETE_CONFIGURED_CAPABILITY_VIOLATION"
    | (string & {});
}

export const FolderOperationError: Schema.Schema<FolderOperationError> =
  Schema.suspend(() =>
    Schema.Struct({
      errorMessageId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FolderOperationError",
  }) as any as Schema.Schema<FolderOperationError>;

export interface CloudresourcemanagerGoogleCloudResourcemanagerV2beta1FolderOperation {
  /** The display name of the folder. */
  displayName?: string;
  /** The type of this operation. */
  operationType?:
    | "OPERATION_TYPE_UNSPECIFIED"
    | "CREATE"
    | "MOVE"
    | (string & {});
  /** The resource name of the folder's parent. Only applicable when the operation_type is MOVE. */
  sourceParent?: string;
  /** The resource name of the folder or organization we are either creating the folder under or moving the folder to. */
  destinationParent?: string;
}

export const CloudresourcemanagerGoogleCloudResourcemanagerV2beta1FolderOperation: Schema.Schema<CloudresourcemanagerGoogleCloudResourcemanagerV2beta1FolderOperation> =
  Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      operationType: Schema.optional(Schema.String),
      sourceParent: Schema.optional(Schema.String),
      destinationParent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "CloudresourcemanagerGoogleCloudResourcemanagerV2beta1FolderOperation",
  }) as any as Schema.Schema<CloudresourcemanagerGoogleCloudResourcemanagerV2beta1FolderOperation>;

export interface FolderOperation {
  /** The display name of the folder. */
  displayName?: string;
  /** The type of this operation. */
  operationType?:
    | "OPERATION_TYPE_UNSPECIFIED"
    | "CREATE"
    | "MOVE"
    | (string & {});
  /** The resource name of the folder's parent. Only applicable when the operation_type is MOVE. */
  sourceParent?: string;
  /** The resource name of the folder or organization we are either creating the folder under or moving the folder to. */
  destinationParent?: string;
}

export const FolderOperation: Schema.Schema<FolderOperation> = Schema.suspend(
  () =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      operationType: Schema.optional(Schema.String),
      sourceParent: Schema.optional(Schema.String),
      destinationParent: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "FolderOperation",
}) as any as Schema.Schema<FolderOperation>;

export interface DeleteOrganizationMetadata {}

export const DeleteOrganizationMetadata: Schema.Schema<DeleteOrganizationMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DeleteOrganizationMetadata",
  }) as any as Schema.Schema<DeleteOrganizationMetadata>;

export interface UndeleteOrganizationMetadata {}

export const UndeleteOrganizationMetadata: Schema.Schema<UndeleteOrganizationMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteOrganizationMetadata",
  }) as any as Schema.Schema<UndeleteOrganizationMetadata>;

export interface CreateFolderMetadata {
  /** The display name of the folder. */
  displayName?: string;
  /** The resource name of the folder or organization we are creating the folder under. */
  parent?: string;
}

export const CreateFolderMetadata: Schema.Schema<CreateFolderMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      parent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateFolderMetadata",
  }) as any as Schema.Schema<CreateFolderMetadata>;

export interface UpdateFolderMetadata {}

export const UpdateFolderMetadata: Schema.Schema<UpdateFolderMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UpdateFolderMetadata",
  }) as any as Schema.Schema<UpdateFolderMetadata>;

export interface MoveFolderMetadata {
  /** The display name of the folder. */
  displayName?: string;
  /** The resource name of the folder's parent. */
  sourceParent?: string;
  /** The resource name of the folder or organization to move the folder to. */
  destinationParent?: string;
}

export const MoveFolderMetadata: Schema.Schema<MoveFolderMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      sourceParent: Schema.optional(Schema.String),
      destinationParent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MoveFolderMetadata",
  }) as any as Schema.Schema<MoveFolderMetadata>;

export interface DeleteFolderMetadata {}

export const DeleteFolderMetadata: Schema.Schema<DeleteFolderMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DeleteFolderMetadata",
  }) as any as Schema.Schema<DeleteFolderMetadata>;

export interface UndeleteFolderMetadata {}

export const UndeleteFolderMetadata: Schema.Schema<UndeleteFolderMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteFolderMetadata",
  }) as any as Schema.Schema<UndeleteFolderMetadata>;

export interface CreateProjectMetadata {
  /** Creation time of the project creation workflow. */
  createTime?: string;
  /** True if the project can be retrieved using `GetProject`. No other operations on the project are guaranteed to work until the project creation is complete. */
  gettable?: boolean;
  /** True if the project creation process is complete. */
  ready?: boolean;
}

export const CreateProjectMetadata: Schema.Schema<CreateProjectMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      gettable: Schema.optional(Schema.Boolean),
      ready: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "CreateProjectMetadata",
  }) as any as Schema.Schema<CreateProjectMetadata>;

export interface UpdateProjectMetadata {}

export const UpdateProjectMetadata: Schema.Schema<UpdateProjectMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UpdateProjectMetadata",
  }) as any as Schema.Schema<UpdateProjectMetadata>;

export interface MoveProjectMetadata {}

export const MoveProjectMetadata: Schema.Schema<MoveProjectMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "MoveProjectMetadata",
  }) as any as Schema.Schema<MoveProjectMetadata>;

export interface DeleteProjectMetadata {}

export const DeleteProjectMetadata: Schema.Schema<DeleteProjectMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DeleteProjectMetadata",
  }) as any as Schema.Schema<DeleteProjectMetadata>;

export interface UndeleteProjectMetadata {}

export const UndeleteProjectMetadata: Schema.Schema<UndeleteProjectMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteProjectMetadata",
  }) as any as Schema.Schema<UndeleteProjectMetadata>;

export interface CreateTagKeyMetadata {}

export const CreateTagKeyMetadata: Schema.Schema<CreateTagKeyMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CreateTagKeyMetadata",
  }) as any as Schema.Schema<CreateTagKeyMetadata>;

export interface UpdateTagKeyMetadata {}

export const UpdateTagKeyMetadata: Schema.Schema<UpdateTagKeyMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UpdateTagKeyMetadata",
  }) as any as Schema.Schema<UpdateTagKeyMetadata>;

export interface DeleteTagKeyMetadata {}

export const DeleteTagKeyMetadata: Schema.Schema<DeleteTagKeyMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DeleteTagKeyMetadata",
  }) as any as Schema.Schema<DeleteTagKeyMetadata>;

export interface CreateTagValueMetadata {}

export const CreateTagValueMetadata: Schema.Schema<CreateTagValueMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CreateTagValueMetadata",
  }) as any as Schema.Schema<CreateTagValueMetadata>;

export interface UpdateTagValueMetadata {}

export const UpdateTagValueMetadata: Schema.Schema<UpdateTagValueMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UpdateTagValueMetadata",
  }) as any as Schema.Schema<UpdateTagValueMetadata>;

export interface DeleteTagValueMetadata {}

export const DeleteTagValueMetadata: Schema.Schema<DeleteTagValueMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DeleteTagValueMetadata",
  }) as any as Schema.Schema<DeleteTagValueMetadata>;

export interface CreateTagBindingMetadata {}

export const CreateTagBindingMetadata: Schema.Schema<CreateTagBindingMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CreateTagBindingMetadata",
  }) as any as Schema.Schema<CreateTagBindingMetadata>;

export interface DeleteTagBindingMetadata {}

export const DeleteTagBindingMetadata: Schema.Schema<DeleteTagBindingMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DeleteTagBindingMetadata",
  }) as any as Schema.Schema<DeleteTagBindingMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

export interface CreateProjectsRequest {
  /** A now unused experiment opt-out option. */
  useLegacyStack?: boolean;
  /** Request body */
  body?: Project;
}

export const CreateProjectsRequest = Schema.Struct({
  useLegacyStack: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useLegacyStack"),
  ),
  body: Schema.optional(Project).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsRequest>;

export type CreateProjectsResponse = Project;
export const CreateProjectsResponse = Project;

export type CreateProjectsError = DefaultErrors;

/** Creates a Project resource. Initially, the Project resource is owned by its creator exclusively. The creator can later grant permission to others to read or update the Project. Several APIs are activated automatically for the Project, including Google Cloud Storage. The parent is identified by a specified ResourceId, which must include both an ID and a type, such as project, folder, or organization. This method does not associate the new project with a billing account. You can set or update the billing account associated with a project using the [`projects.updateBillingInfo`] (/billing/reference/rest/v1/projects/updateBillingInfo) method. */
export const createProjects: API.OperationMethod<
  CreateProjectsRequest,
  CreateProjectsResponse,
  CreateProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsRequest,
  output: CreateProjectsResponse,
  errors: [],
}));

export interface ListProjectsRequest {
  /** A pagination token returned from a previous call to ListProjects that indicates from where listing should continue. Optional. */
  pageToken?: string;
  /** The maximum number of Projects to return in the response. The server can return fewer Projects than requested. If unspecified, server picks an appropriate default. Optional. */
  pageSize?: number;
  /** An expression for filtering the results of the request. Filter rules are case insensitive. If multiple fields are included in a filter query, the query will return results that match any of the fields. Some eligible fields for filtering are: + `name` + `id` + `labels.` (where *key* is the name of a label) + `parent.type` + `parent.id` Some examples of using labels as filters: | Filter | Description | |------------------|-----------------------------------------------------| | name:how* | The project's name starts with "how". | | name:Howl | The project's name is `Howl` or `howl`. | | name:HOWL | Equivalent to above. | | NAME:howl | Equivalent to above. | | labels.color:* | The project has the label `color`. | | labels.color:red | The project's label `color` has the value `red`. | | labels.color:red labels.size:big | The project's label `color` has the value `red` or its label `size` has the value `big`. | If no filter is specified, the call will return projects for which the user has the `resourcemanager.projects.get` permission. NOTE: To perform a by-parent query (eg., what projects are directly in a Folder), the caller must have the `resourcemanager.projects.list` permission on the parent and the filter must contain both a `parent.type` and a `parent.id` restriction (example: "parent.type:folder parent.id:123"). In this case an alternate search index is used which provides more consistent results. Optional. */
  filter?: string;
}

export const ListProjectsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects" }),
  svc,
) as unknown as Schema.Schema<ListProjectsRequest>;

export type ListProjectsResponse_Op = ListProjectsResponse;
export const ListProjectsResponse_Op = ListProjectsResponse;

export type ListProjectsError = DefaultErrors;

/** Lists Projects that the caller has the `resourcemanager.projects.get` permission on and satisfy the specified filter. This method returns Projects in an unspecified order. This method is eventually consistent with project mutations; this means that a newly created project may not appear in the results or recent updates to an existing project may not be reflected in the results. To retrieve the latest state of a project, use the GetProject method. NOTE: If the request filter contains a `parent.type` and `parent.id` and the caller has the `resourcemanager.projects.list` permission on the parent, the results will be drawn from an alternate index which provides more consistent results. In future versions of this API, this List method will be split into List and Search to properly capture the behavioral difference. */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsRequest,
  ListProjectsResponse_Op,
  ListProjectsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsRequest,
  output: ListProjectsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsRequest {
  /** Required. The Project ID (for example, `my-project-123`). */
  projectId: string;
}

export const GetProjectsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsRequest>;

export type GetProjectsResponse = Project;
export const GetProjectsResponse = Project;

export type GetProjectsError = DefaultErrors;

/** Retrieves the Project identified by the specified `project_id` (for example, `my-project-123`). The caller must have read permissions for this Project. */
export const getProjects: API.OperationMethod<
  GetProjectsRequest,
  GetProjectsResponse,
  GetProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsRequest,
  output: GetProjectsResponse,
  errors: [],
}));

export interface UpdateProjectsRequest {
  /** The project ID (for example, `my-project-123`). */
  projectId: string;
  /** Request body */
  body?: Project;
}

export const UpdateProjectsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(Project).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "v1beta1/projects/{projectId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsRequest>;

export type UpdateProjectsResponse = Project;
export const UpdateProjectsResponse = Project;

export type UpdateProjectsError = DefaultErrors;

/** Updates the attributes of the Project identified by the specified `project_id` (for example, `my-project-123`). The caller must have modify permissions for this Project. */
export const updateProjects: API.OperationMethod<
  UpdateProjectsRequest,
  UpdateProjectsResponse,
  UpdateProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateProjectsRequest,
  output: UpdateProjectsResponse,
  errors: [],
}));

export interface DeleteProjectsRequest {
  /** The Project ID (for example, `foo-bar-123`). */
  projectId: string;
}

export const DeleteProjectsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/projects/{projectId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsRequest>;

export type DeleteProjectsResponse = Empty;
export const DeleteProjectsResponse = Empty;

export type DeleteProjectsError = DefaultErrors;

/** Marks the Project identified by the specified `project_id` (for example, `my-project-123`) for deletion. This method will only affect the Project if it has a lifecycle state of ACTIVE. This method changes the Project's lifecycle state from ACTIVE to DELETE_REQUESTED. The deletion starts at an unspecified time, at which point the project is no longer accessible. Until the deletion completes, you can check the lifecycle state checked by retrieving the Project with GetProject, and the Project remains visible to ListProjects. However, you cannot update the project. After the deletion completes, the Project is not retrievable by the GetProject and ListProjects methods. The caller must have delete permissions for this Project. */
export const deleteProjects: API.OperationMethod<
  DeleteProjectsRequest,
  DeleteProjectsResponse,
  DeleteProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
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
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectId}:undelete",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectsRequest>;

export type UndeleteProjectsResponse = Empty;
export const UndeleteProjectsResponse = Empty;

export type UndeleteProjectsError = DefaultErrors;

/** Restores the Project identified by the specified `project_id` (for example, `my-project-123`). You can only use this method for a Project that has a lifecycle state of DELETE_REQUESTED. After deletion starts, the Project cannot be restored. The caller must have undelete permissions for this Project. */
export const undeleteProjects: API.OperationMethod<
  UndeleteProjectsRequest,
  UndeleteProjectsResponse,
  UndeleteProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
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
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectId}:getAncestry",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GetAncestryProjectsRequest>;

export type GetAncestryProjectsResponse = GetAncestryResponse;
export const GetAncestryProjectsResponse = GetAncestryResponse;

export type GetAncestryProjectsError = DefaultErrors;

/** Gets a list of ancestors in the resource hierarchy for the Project identified by the specified `project_id` (for example, `my-project-123`). The caller must have read permissions for this Project. */
export const getAncestryProjects: API.OperationMethod<
  GetAncestryProjectsRequest,
  GetAncestryProjectsResponse,
  GetAncestryProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
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
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{resource}:getIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsRequest>;

export type GetIamPolicyProjectsResponse = Policy;
export const GetIamPolicyProjectsResponse = Policy;

export type GetIamPolicyProjectsError = DefaultErrors;

/** Returns the IAM access control policy for the specified Project. Permission is denied if the policy or the resource does not exist. For additional information about resource structure and identification, see [Resource Names](/apis/design/resource_names). */
export const getIamPolicyProjects: API.OperationMethod<
  GetIamPolicyProjectsRequest,
  GetIamPolicyProjectsResponse,
  GetIamPolicyProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
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
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{resource}:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsRequest>;

export type SetIamPolicyProjectsResponse = Policy;
export const SetIamPolicyProjectsResponse = Policy;

export type SetIamPolicyProjectsError = DefaultErrors;

/** Sets the IAM access control policy for the specified Project. CAUTION: This method will replace the existing policy, and cannot be used to append additional IAM settings. NOTE: Removing service accounts from policies or changing their roles can render services completely inoperable. It is important to understand how the service account is being used before removing or updating its roles. The following constraints apply when using `setIamPolicy()`: + Project does not support `allUsers` and `allAuthenticatedUsers` as `members` in a `Binding` of a `Policy`. + The owner role can be granted to a `user`, `serviceAccount`, or a group that is part of an organization. For example, group@myownpersonaldomain.com could be added as an owner to a project in the myownpersonaldomain.com organization, but not the examplepetstore.com organization. + Service accounts can be made owners of a project directly without any restrictions. However, to be added as an owner, a user must be invited via Cloud Platform console and must accept the invitation. + A user cannot be granted the owner role using `setIamPolicy()`. The user must be granted the owner role using the Cloud Platform Console and must explicitly accept the invitation. + Invitations to grant the owner role cannot be sent using `setIamPolicy()`; they must be sent only using the Cloud Platform Console. + Membership changes that leave the project without any owners that have accepted the Terms of Service (ToS) will be rejected. + If the project is not part of an organization, there must be at least one owner who has accepted the Terms of Service (ToS) agreement in the policy. Calling `setIamPolicy()` to remove the last ToS-accepted owner from the policy will fail. This restriction also applies to legacy projects that no longer have owners who have accepted the ToS. Edits to IAM policies will be rejected until the lack of a ToS-accepting owner is rectified. Authorization requires the Google IAM permission `resourcemanager.projects.setIamPolicy` on the project */
export const setIamPolicyProjects: API.OperationMethod<
  SetIamPolicyProjectsRequest,
  SetIamPolicyProjectsResponse,
  SetIamPolicyProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
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
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{resource}:testIamPermissions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsRequest>;

export type TestIamPermissionsProjectsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsError = DefaultErrors;

/** Returns permissions that a caller has on the specified Project. */
export const testIamPermissionsProjects: API.OperationMethod<
  TestIamPermissionsProjectsRequest,
  TestIamPermissionsProjectsResponse,
  TestIamPermissionsProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsRequest,
  output: TestIamPermissionsProjectsResponse,
  errors: [],
}));

export interface ListOrganizationsRequest {
  /** The maximum number of Organizations to return in the response. This field is optional. */
  pageSize?: number;
  /** A pagination token returned from a previous call to `ListOrganizations` that indicates from where listing should continue. This field is optional. */
  pageToken?: string;
  /** An optional query string used to filter the Organizations to return in the response. Filter rules are case-insensitive. Organizations may be filtered by `owner.directoryCustomerId` or by `domain`, where the domain is a verified G Suite domain, for example: * Filter `owner.directorycustomerid:123456789` returns Organization resources with `owner.directory_customer_id` equal to `123456789`. * Filter `domain:google.com` returns Organization resources corresponding to the domain `google.com`. This field is optional. */
  filter?: string;
}

export const ListOrganizationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/organizations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsRequest>;

export type ListOrganizationsResponse_Op = ListOrganizationsResponse;
export const ListOrganizationsResponse_Op = ListOrganizationsResponse;

export type ListOrganizationsError = DefaultErrors;

/** Lists Organization resources that are visible to the user and satisfy the specified filter. This method returns Organizations in an unspecified order. New Organizations do not necessarily appear at the end of the list. */
export const listOrganizations: API.PaginatedOperationMethod<
  ListOrganizationsRequest,
  ListOrganizationsResponse_Op,
  ListOrganizationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListOrganizationsRequest,
  output: ListOrganizationsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetOrganizationsRequest {
  /** The resource name of the Organization to fetch. This is the organization's relative path in the API, formatted as "organizations/[organizationId]". For example, "organizations/1234". */
  name: string;
  /** The id of the Organization resource to fetch. This field is deprecated and will be removed in v1. Use name instead. */
  organizationId?: string;
}

export const GetOrganizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  organizationId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("organizationId"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/organizations/{organizationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsRequest>;

export type GetOrganizationsResponse = Organization;
export const GetOrganizationsResponse = Organization;

export type GetOrganizationsError = DefaultErrors;

/** Fetches an Organization resource identified by the specified resource name. */
export const getOrganizations: API.OperationMethod<
  GetOrganizationsRequest,
  GetOrganizationsResponse,
  GetOrganizationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOrganizationsRequest,
  output: GetOrganizationsResponse,
  errors: [],
}));

export interface UpdateOrganizationsRequest {
  /** Output only. The resource name of the organization. This is the organization's relative path in the API. Its format is "organizations/[organization_id]". For example, "organizations/1234". */
  name: string;
  /** Request body */
  body?: Organization;
}

export const UpdateOrganizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Organization).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "v1beta1/organizations/{organizationsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateOrganizationsRequest>;

export type UpdateOrganizationsResponse = Organization;
export const UpdateOrganizationsResponse = Organization;

export type UpdateOrganizationsError = DefaultErrors;

/** Updates an Organization resource identified by the specified resource name. */
export const updateOrganizations: API.OperationMethod<
  UpdateOrganizationsRequest,
  UpdateOrganizationsResponse,
  UpdateOrganizationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateOrganizationsRequest,
  output: UpdateOrganizationsResponse,
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
  T.Http({
    method: "POST",
    path: "v1beta1/organizations/{organizationsId}:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyOrganizationsRequest>;

export type SetIamPolicyOrganizationsResponse = Policy;
export const SetIamPolicyOrganizationsResponse = Policy;

export type SetIamPolicyOrganizationsError = DefaultErrors;

/** Sets the access control policy on an Organization resource. Replaces any existing policy. The `resource` field should be the organization's resource name, e.g. "organizations/123". */
export const setIamPolicyOrganizations: API.OperationMethod<
  SetIamPolicyOrganizationsRequest,
  SetIamPolicyOrganizationsResponse,
  SetIamPolicyOrganizationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
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
  T.Http({
    method: "POST",
    path: "v1beta1/organizations/{organizationsId}:getIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyOrganizationsRequest>;

export type GetIamPolicyOrganizationsResponse = Policy;
export const GetIamPolicyOrganizationsResponse = Policy;

export type GetIamPolicyOrganizationsError = DefaultErrors;

/** Gets the access control policy for an Organization resource. May be empty if no such policy or resource exists. The `resource` field should be the organization's resource name, e.g. "organizations/123". */
export const getIamPolicyOrganizations: API.OperationMethod<
  GetIamPolicyOrganizationsRequest,
  GetIamPolicyOrganizationsResponse,
  GetIamPolicyOrganizationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
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
  T.Http({
    method: "POST",
    path: "v1beta1/organizations/{organizationsId}:testIamPermissions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsOrganizationsRequest>;

export type TestIamPermissionsOrganizationsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsOrganizationsResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsOrganizationsError = DefaultErrors;

/** Returns permissions that a caller has on the specified Organization. The `resource` field should be the organization's resource name, e.g. "organizations/123". */
export const testIamPermissionsOrganizations: API.OperationMethod<
  TestIamPermissionsOrganizationsRequest,
  TestIamPermissionsOrganizationsResponse,
  TestIamPermissionsOrganizationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsOrganizationsRequest,
  output: TestIamPermissionsOrganizationsResponse,
  errors: [],
}));
