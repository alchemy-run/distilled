// ==========================================================================
// Cloud Resource Manager API (cloudresourcemanager v2beta1)
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
  name: "cloudresourcemanager",
  version: "v2beta1",
  rootUrl: "https://cloudresourcemanager.googleapis.com/",
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

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

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

export const Operation: Schema.Schema<Operation> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    done: Schema.optional(Schema.Boolean),
    error: Schema.optional(Status),
    response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface Folder {
  /** Output only. The resource name of the Folder. Its format is `folders/{folder_id}`, for example: "folders/1234". */
  name?: string;
  /** Required. The Folder's parent's resource name. Updates to the folder's parent must be performed via MoveFolder. */
  parent?: string;
  /** The folder's display name. A folder's display name must be unique amongst its siblings, e.g. no two folders with the same parent can share the same display name. The display name must start and end with a letter or digit, may contain letters, digits, spaces, hyphens and underscores and can be no longer than 30 characters. This is captured by the regular expression: `[\p{L}\p{N}]([\p{L}\p{N}_- ]{0,28}[\p{L}\p{N}])?`. */
  displayName?: string;
  /** Output only. The lifecycle state of the folder. Updates to the lifecycle_state must be performed via DeleteFolder and UndeleteFolder. */
  lifecycleState?:
    | "LIFECYCLE_STATE_UNSPECIFIED"
    | "ACTIVE"
    | "DELETE_REQUESTED"
    | (string & {});
  /** Output only. Timestamp when the Folder was created. Assigned by the server. */
  createTime?: string;
  /** Optional. Input only. Immutable. Tag keys/values directly bound to this folder. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" Note: Currently this field is in Preview. */
  tags?: Record<string, string>;
  /** Output only. Optional capabilities configured for this folder (via UpdateCapability API). Example: `folders/123/capabilities/app-management`. */
  configuredCapabilities?: Array<string>;
  /** Output only. Management Project associated with this folder (if app-management capability is enabled). Example: `projects/google-mp-123` OUTPUT ONLY. */
  managementProject?: string;
}

export const Folder: Schema.Schema<Folder> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    parent: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    lifecycleState: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    configuredCapabilities: Schema.optional(Schema.Array(Schema.String)),
    managementProject: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Folder" }) as any as Schema.Schema<Folder>;

export interface ListFoldersResponse {
  /** A possibly paginated list of Folders that are direct descendants of the specified parent resource. */
  folders?: Array<Folder>;
  /** A pagination token returned from a previous call to `ListFolders` that indicates from where listing should continue. */
  nextPageToken?: string;
}

export const ListFoldersResponse: Schema.Schema<ListFoldersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      folders: Schema.optional(Schema.Array(Folder)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListFoldersResponse",
  }) as any as Schema.Schema<ListFoldersResponse>;

export interface SearchFoldersRequest {
  /** Optional. The maximum number of folders to return in the response. The server can return fewer folders than requested. If unspecified, server picks an appropriate default. */
  pageSize?: number;
  /** Optional. A pagination token returned from a previous call to `SearchFolders` that indicates from where search should continue. */
  pageToken?: string;
  /** Search criteria used to select the Folders to return. If no search criteria is specified then all accessible folders will be returned. Query expressions can be used to restrict results based upon displayName, lifecycleState and parent, where the operators `=`, `NOT`, `AND` and `OR` can be used along with the suffix wildcard symbol `*`. The displayName field in a query expression should use escaped quotes for values that include whitespace to prevent unexpected behavior. Some example queries are: * Query `displayName=Test*` returns Folder resources whose display name starts with "Test". * Query `lifecycleState=ACTIVE` returns Folder resources with `lifecycleState` set to `ACTIVE`. * Query `parent=folders/123` returns Folder resources that have `folders/123` as a parent resource. * Query `parent=folders/123 AND lifecycleState=ACTIVE` returns active Folder resources that have `folders/123` as a parent resource. * Query `displayName=\\"Test String\\"` returns Folder resources with display names that include both "Test" and "String". */
  query?: string;
}

export const SearchFoldersRequest: Schema.Schema<SearchFoldersRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      pageSize: Schema.optional(Schema.Number),
      pageToken: Schema.optional(Schema.String),
      query: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchFoldersRequest",
  }) as any as Schema.Schema<SearchFoldersRequest>;

export interface SearchFoldersResponse {
  /** A possibly paginated folder search results. the specified parent resource. */
  folders?: Array<Folder>;
  /** A pagination token returned from a previous call to `SearchFolders` that indicates from where searching should continue. */
  nextPageToken?: string;
}

export const SearchFoldersResponse: Schema.Schema<SearchFoldersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      folders: Schema.optional(Schema.Array(Folder)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchFoldersResponse",
  }) as any as Schema.Schema<SearchFoldersResponse>;

export interface MoveFolderRequest {
  /** Required. The resource name of the Folder or Organization to reparent the folder under. Must be of the form `folders/{folder_id}` or `organizations/{org_id}`. */
  destinationParent?: string;
}

export const MoveFolderRequest: Schema.Schema<MoveFolderRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      destinationParent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MoveFolderRequest",
  }) as any as Schema.Schema<MoveFolderRequest>;

export interface UndeleteFolderRequest {}

export const UndeleteFolderRequest: Schema.Schema<UndeleteFolderRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteFolderRequest",
  }) as any as Schema.Schema<UndeleteFolderRequest>;

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

export type GetOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getOperations: API.OperationMethod<
  GetOperationsRequest,
  GetOperationsResponse,
  GetOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

export interface ListFoldersRequest {
  /** Required. The resource name of the Organization or Folder whose Folders are being listed. Must be of the form `folders/{folder_id}` or `organizations/{org_id}`. Access to this method is controlled by checking the `resourcemanager.folders.list` permission on the `parent`. */
  parent?: string;
  /** Optional. The maximum number of Folders to return in the response. The server can return fewer folders than requested. If unspecified, server picks an appropriate default. */
  pageSize?: number;
  /** Optional. A pagination token returned from a previous call to `ListFolders` that indicates where this listing should continue from. */
  pageToken?: string;
  /** Optional. Controls whether Folders in the DELETE_REQUESTED state should be returned. Defaults to false. */
  showDeleted?: boolean;
}

export const ListFoldersRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders" }),
  svc,
) as unknown as Schema.Schema<ListFoldersRequest>;

export type ListFoldersResponse_Op = ListFoldersResponse;
export const ListFoldersResponse_Op = ListFoldersResponse;

export type ListFoldersError = DefaultErrors;

/** Lists the Folders that are direct descendants of supplied parent resource. List provides a strongly consistent view of the Folders underneath the specified parent resource. List returns Folders sorted based upon the (ascending) lexical ordering of their display_name. The caller must have `resourcemanager.folders.list` permission on the identified parent. */
export const listFolders: API.PaginatedOperationMethod<
  ListFoldersRequest,
  ListFoldersResponse_Op,
  ListFoldersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListFoldersRequest,
  output: ListFoldersResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SearchFoldersRequest_Op {
  /** Request body */
  body?: SearchFoldersRequest;
}

export const SearchFoldersRequest_Op = Schema.Struct({
  body: Schema.optional(SearchFoldersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders:search", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchFoldersRequest_Op>;

export type SearchFoldersResponse_Op = SearchFoldersResponse;
export const SearchFoldersResponse_Op = SearchFoldersResponse;

export type SearchFoldersError = DefaultErrors;

/** Search for folders that match specific filter criteria. Search provides an eventually consistent view of the folders a user has access to which meet the specified filter criteria. This will only return folders on which the caller has the permission `resourcemanager.folders.get`. */
export const searchFolders: API.OperationMethod<
  SearchFoldersRequest_Op,
  SearchFoldersResponse_Op,
  SearchFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SearchFoldersRequest_Op,
  output: SearchFoldersResponse_Op,
  errors: [],
}));

export interface GetFoldersRequest {
  /** Required. The resource name of the Folder to retrieve. Must be of the form `folders/{folder_id}`. */
  name: string;
}

export const GetFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersRequest>;

export type GetFoldersResponse = Folder;
export const GetFoldersResponse = Folder;

export type GetFoldersError = DefaultErrors;

/** Retrieves a Folder identified by the supplied resource name. Valid Folder resource names have the format `folders/{folder_id}` (for example, `folders/1234`). The caller must have `resourcemanager.folders.get` permission on the identified folder. */
export const getFolders: API.OperationMethod<
  GetFoldersRequest,
  GetFoldersResponse,
  GetFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetFoldersRequest,
  output: GetFoldersResponse,
  errors: [],
}));

export interface CreateFoldersRequest {
  /** Required. The resource name of the new Folder's parent. Must be of the form `folders/{folder_id}` or `organizations/{org_id}`. */
  parent?: string;
  /** Request body */
  body?: Folder;
}

export const CreateFoldersRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  body: Schema.optional(Folder).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersRequest>;

export type CreateFoldersResponse = Operation;
export const CreateFoldersResponse = Operation;

export type CreateFoldersError = DefaultErrors;

/** Creates a Folder in the resource hierarchy. Returns an Operation which can be used to track the progress of the folder creation workflow. Upon success the Operation.response field will be populated with the created Folder. In order to succeed, the addition of this new Folder must not violate the Folder naming, height or fanout constraints. + The Folder's display_name must be distinct from all other Folders that share its parent. + The addition of the Folder must not cause the active Folder hierarchy to exceed a height of 10. Note, the full active + deleted Folder hierarchy is allowed to reach a height of 20; this provides additional headroom when moving folders that contain deleted folders. + The addition of the Folder must not cause the total number of Folders under its parent to exceed 300. If the operation fails due to a folder constraint violation, some errors may be returned by the CreateFolder request, with status code FAILED_PRECONDITION and an error description. Other folder constraint violations will be communicated in the Operation, with the specific PreconditionFailure returned via the details list in the Operation.error field. The caller must have `resourcemanager.folders.create` permission on the identified parent. */
export const createFolders: API.OperationMethod<
  CreateFoldersRequest,
  CreateFoldersResponse,
  CreateFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateFoldersRequest,
  output: CreateFoldersResponse,
  errors: [],
}));

export interface PatchFoldersRequest {
  /** Output only. The resource name of the Folder. Its format is `folders/{folder_id}`, for example: "folders/1234". */
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
  T.Http({ method: "PATCH", path: "v2/folders/{foldersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersRequest>;

export type PatchFoldersResponse = Folder;
export const PatchFoldersResponse = Folder;

export type PatchFoldersError = DefaultErrors;

/** Updates a Folder, changing its display_name. Changes to the folder display_name will be rejected if they violate either the display_name formatting rules or naming constraints described in the CreateFolder documentation. The Folder's display name must start and end with a letter or digit, may contain letters, digits, spaces, hyphens and underscores and can be between 3 and 30 characters. This is captured by the regular expression: `\p{L}\p{N}{1,28}[\p{L}\p{N}]`. The caller must have `resourcemanager.folders.update` permission on the identified folder. If the update fails due to the unique name constraint then a PreconditionFailure explaining this violation will be returned in the Status.details field. */
export const patchFolders: API.OperationMethod<
  PatchFoldersRequest,
  PatchFoldersResponse,
  PatchFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchFoldersRequest,
  output: PatchFoldersResponse,
  errors: [],
}));

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
  T.Http({
    method: "POST",
    path: "v2/folders/{foldersId}:move",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<MoveFoldersRequest>;

export type MoveFoldersResponse = Operation;
export const MoveFoldersResponse = Operation;

export type MoveFoldersError = DefaultErrors;

/** Moves a Folder under a new resource parent. Returns an Operation which can be used to track the progress of the folder move workflow. Upon success the Operation.response field will be populated with the moved Folder. Upon failure, a FolderOperationError categorizing the failure cause will be returned - if the failure occurs synchronously then the FolderOperationError will be returned via the Status.details field and if it occurs asynchronously then the FolderOperation will be returned via the Operation.error field. In addition, the Operation.metadata field will be populated with a FolderOperation message as an aid to stateless clients. Folder moves will be rejected if they violate either the naming, height or fanout constraints described in the CreateFolder documentation. The caller must have `resourcemanager.folders.move` permission on the folder's current and proposed new parent. */
export const moveFolders: API.OperationMethod<
  MoveFoldersRequest,
  MoveFoldersResponse,
  MoveFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: MoveFoldersRequest,
  output: MoveFoldersResponse,
  errors: [],
}));

export interface DeleteFoldersRequest {
  /** Required. the resource name of the Folder to be deleted. Must be of the form `folders/{folder_id}`. */
  name: string;
}

export const DeleteFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/folders/{foldersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersRequest>;

export type DeleteFoldersResponse = Folder;
export const DeleteFoldersResponse = Folder;

export type DeleteFoldersError = DefaultErrors;

/** Requests deletion of a Folder. The Folder is moved into the DELETE_REQUESTED state immediately, and is deleted approximately 30 days later. This method may only be called on an empty Folder in the ACTIVE state, where a Folder is empty if it doesn't contain any Folders or Projects in the ACTIVE state. The caller must have `resourcemanager.folders.delete` permission on the identified folder. */
export const deleteFolders: API.OperationMethod<
  DeleteFoldersRequest,
  DeleteFoldersResponse,
  DeleteFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteFoldersRequest,
  output: DeleteFoldersResponse,
  errors: [],
}));

export interface UndeleteFoldersRequest {
  /** Required. The resource name of the Folder to undelete. Must be of the form `folders/{folder_id}`. */
  name: string;
  /** Request body */
  body?: UndeleteFolderRequest;
}

export const UndeleteFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteFolderRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/folders/{foldersId}:undelete",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UndeleteFoldersRequest>;

export type UndeleteFoldersResponse = Folder;
export const UndeleteFoldersResponse = Folder;

export type UndeleteFoldersError = DefaultErrors;

/** Cancels the deletion request for a Folder. This method may only be called on a Folder in the DELETE_REQUESTED state. In order to succeed, the Folder's parent must be in the ACTIVE state. In addition, reintroducing the folder into the tree must not violate folder naming, height and fanout constraints described in the CreateFolder documentation. The caller must have `resourcemanager.folders.undelete` permission on the identified folder. */
export const undeleteFolders: API.OperationMethod<
  UndeleteFoldersRequest,
  UndeleteFoldersResponse,
  UndeleteFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UndeleteFoldersRequest,
  output: UndeleteFoldersResponse,
  errors: [],
}));

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
  T.Http({
    method: "POST",
    path: "v2/folders/{foldersId}:getIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyFoldersRequest>;

export type GetIamPolicyFoldersResponse = Policy;
export const GetIamPolicyFoldersResponse = Policy;

export type GetIamPolicyFoldersError = DefaultErrors;

/** Gets the access control policy for a Folder. The returned policy may be empty if no such policy or resource exists. The `resource` field should be the Folder's resource name, e.g. "folders/1234". The caller must have `resourcemanager.folders.getIamPolicy` permission on the identified folder. */
export const getIamPolicyFolders: API.OperationMethod<
  GetIamPolicyFoldersRequest,
  GetIamPolicyFoldersResponse,
  GetIamPolicyFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyFoldersRequest,
  output: GetIamPolicyFoldersResponse,
  errors: [],
}));

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
  T.Http({
    method: "POST",
    path: "v2/folders/{foldersId}:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyFoldersRequest>;

export type SetIamPolicyFoldersResponse = Policy;
export const SetIamPolicyFoldersResponse = Policy;

export type SetIamPolicyFoldersError = DefaultErrors;

/** Sets the access control policy on a Folder, replacing any existing policy. The `resource` field should be the Folder's resource name, e.g. "folders/1234". The caller must have `resourcemanager.folders.setIamPolicy` permission on the identified folder. */
export const setIamPolicyFolders: API.OperationMethod<
  SetIamPolicyFoldersRequest,
  SetIamPolicyFoldersResponse,
  SetIamPolicyFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyFoldersRequest,
  output: SetIamPolicyFoldersResponse,
  errors: [],
}));

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
  T.Http({
    method: "POST",
    path: "v2/folders/{foldersId}:testIamPermissions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsFoldersRequest>;

export type TestIamPermissionsFoldersResponse = TestIamPermissionsResponse;
export const TestIamPermissionsFoldersResponse = TestIamPermissionsResponse;

export type TestIamPermissionsFoldersError = DefaultErrors;

/** Returns permissions that a caller has on the specified Folder. The `resource` field should be the Folder's resource name, e.g. "folders/1234". There are no permissions required for making this API call. */
export const testIamPermissionsFolders: API.OperationMethod<
  TestIamPermissionsFoldersRequest,
  TestIamPermissionsFoldersResponse,
  TestIamPermissionsFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsFoldersRequest,
  output: TestIamPermissionsFoldersResponse,
  errors: [],
}));
