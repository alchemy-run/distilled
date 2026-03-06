// ==========================================================================
// Secret Manager API (secretmanager v1beta1)
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
  name: "secretmanager",
  version: "v1beta1",
  rootUrl: "https://secretmanager.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Replica {
  /** The canonical IDs of the location to replicate data. For example: `"us-east1"`. */
  location?: string;
}

export const Replica: Schema.Schema<Replica> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Replica" }) as any as Schema.Schema<Replica>;

export interface UserManaged {
  /** Required. The list of Replicas for this Secret. Cannot be empty. */
  replicas?: Array<Replica>;
}

export const UserManaged: Schema.Schema<UserManaged> = Schema.suspend(() => Schema.Struct({
  replicas: Schema.optional(Schema.Array(Replica)),
})).annotate({ identifier: "UserManaged" }) as any as Schema.Schema<UserManaged>;

export interface SecretPayload {
  /** The secret data. Must be no larger than 64KiB. */
  data?: string;
}

export const SecretPayload: Schema.Schema<SecretPayload> = Schema.suspend(() => Schema.Struct({
  data: Schema.optional(Schema.String),
})).annotate({ identifier: "SecretPayload" }) as any as Schema.Schema<SecretPayload>;

export interface AddSecretVersionRequest {
  /** Required. The secret payload of the SecretVersion. */
  payload?: SecretPayload;
}

export const AddSecretVersionRequest: Schema.Schema<AddSecretVersionRequest> = Schema.suspend(() => Schema.Struct({
  payload: Schema.optional(SecretPayload),
})).annotate({ identifier: "AddSecretVersionRequest" }) as any as Schema.Schema<AddSecretVersionRequest>;

export interface Location {
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(Location)),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface Status {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  code: Schema.optional(Schema.Number),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  done: Schema.optional(Schema.Boolean),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  error: Schema.optional(Status),
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

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

export interface Automatic {
}

export const Automatic: Schema.Schema<Automatic> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Automatic" }) as any as Schema.Schema<Automatic>;

export interface Replication {
  /** The Secret will automatically be replicated without any restrictions. */
  automatic?: Automatic;
  /** The Secret will only be replicated into the locations specified. */
  userManaged?: UserManaged;
}

export const Replication: Schema.Schema<Replication> = Schema.suspend(() => Schema.Struct({
  automatic: Schema.optional(Automatic),
  userManaged: Schema.optional(UserManaged),
})).annotate({ identifier: "Replication" }) as any as Schema.Schema<Replication>;

export interface Secret {
  /** Output only. The resource name of the Secret in the format `projects/* /secrets/*`. */
  name?: string;
  /** Output only. The time at which the Secret was created. */
  createTime?: string;
  /** Required. Immutable. The replication policy of the secret data attached to the Secret. The replication policy cannot be changed after the Secret has been created. */
  replication?: Replication;
  /** Optional. Input only. Immutable. Mapping of Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" Tags are used to organize and group resources. Tags can be used to control policy evaluation for the resource. */
  tags?: Record<string, string>;
  /** The labels assigned to this Secret. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: `\p{Ll}\p{Lo}{0,62}` Label values must be between 0 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: `[\p{Ll}\p{Lo}\p{N}_-]{0,63}` No more than 64 labels can be assigned to a given resource. */
  labels?: Record<string, string>;
}

export const Secret: Schema.Schema<Secret> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  replication: Schema.optional(Replication),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Secret" }) as any as Schema.Schema<Secret>;

export interface ListSecretsResponse {
  /** The list of Secrets sorted in reverse by create_time (newest first). */
  secrets?: Array<Secret>;
  /** The total number of Secrets. */
  totalSize?: number;
  /** A token to retrieve the next page of results. Pass this value in ListSecretsRequest.page_token to retrieve the next page. */
  nextPageToken?: string;
}

export const ListSecretsResponse: Schema.Schema<ListSecretsResponse> = Schema.suspend(() => Schema.Struct({
  secrets: Schema.optional(Schema.Array(Secret)),
  totalSize: Schema.optional(Schema.Number),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSecretsResponse" }) as any as Schema.Schema<ListSecretsResponse>;

export interface SecretVersion {
  /** Output only. The time at which the SecretVersion was created. */
  createTime?: string;
  /** Output only. The time this SecretVersion was destroyed. Only present if state is DESTROYED. */
  destroyTime?: string;
  /** Output only. The current state of the SecretVersion. */
  state?: "STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | "DESTROYED" | (string & {});
  /** Output only. The resource name of the SecretVersion in the format `projects/* /secrets/* /versions/*`. SecretVersion IDs in a Secret start at 1 and are incremented for each subsequent version of the secret. */
  name?: string;
}

export const SecretVersion: Schema.Schema<SecretVersion> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  destroyTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "SecretVersion" }) as any as Schema.Schema<SecretVersion>;

export interface ListSecretVersionsResponse {
  /** A token to retrieve the next page of results. Pass this value in ListSecretVersionsRequest.page_token to retrieve the next page. */
  nextPageToken?: string;
  /** The total number of SecretVersions. */
  totalSize?: number;
  /** The list of SecretVersions sorted in reverse by create_time (newest first). */
  versions?: Array<SecretVersion>;
}

export const ListSecretVersionsResponse: Schema.Schema<ListSecretVersionsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
  versions: Schema.optional(Schema.Array(SecretVersion)),
})).annotate({ identifier: "ListSecretVersionsResponse" }) as any as Schema.Schema<ListSecretVersionsResponse>;

export interface Expr {
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
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

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface OperationMetadata {
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface EnableSecretVersionRequest {
}

export const EnableSecretVersionRequest: Schema.Schema<EnableSecretVersionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "EnableSecretVersionRequest" }) as any as Schema.Schema<EnableSecretVersionRequest>;

export interface DestroySecretVersionRequest {
}

export const DestroySecretVersionRequest: Schema.Schema<DestroySecretVersionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DestroySecretVersionRequest" }) as any as Schema.Schema<DestroySecretVersionRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

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

export interface AccessSecretVersionResponse {
  /** Secret payload */
  payload?: SecretPayload;
  /** The resource name of the SecretVersion in the format `projects/* /secrets/* /versions/*`. */
  name?: string;
}

export const AccessSecretVersionResponse: Schema.Schema<AccessSecretVersionResponse> = Schema.suspend(() => Schema.Struct({
  payload: Schema.optional(SecretPayload),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "AccessSecretVersionResponse" }) as any as Schema.Schema<AccessSecretVersionResponse>;

export interface DisableSecretVersionRequest {
}

export const DisableSecretVersionRequest: Schema.Schema<DisableSecretVersionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DisableSecretVersionRequest" }) as any as Schema.Schema<DisableSecretVersionRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListProjectsSecretsRequest {
  /** Required. The resource name of the project associated with the Secrets, in the format `projects/*`. */
  parent: string;
  /** Optional. Pagination token, returned earlier via ListSecretsResponse.next_page_token. */
  pageToken?: string;
  /** Optional. The maximum number of results to be returned in a single page. If set to 0, the server decides the number of results to return. If the number is greater than 25000, it is capped at 25000. */
  pageSize?: number;
}

export const ListProjectsSecretsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/secrets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsSecretsRequest>;

export type ListProjectsSecretsResponse = ListSecretsResponse;
export const ListProjectsSecretsResponse = ListSecretsResponse;

export type ListProjectsSecretsError = CommonErrors;

/** Lists Secrets. */
export const listProjectsSecrets: API.PaginatedOperationMethod<ListProjectsSecretsRequest, ListProjectsSecretsResponse, ListProjectsSecretsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsSecretsRequest,
  output: ListProjectsSecretsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface TestIamPermissionsProjectsSecretsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsSecretsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/secrets/{secretsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsSecretsRequest>;

export type TestIamPermissionsProjectsSecretsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsSecretsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsSecretsError = CommonErrors;

/** Returns permissions that a caller has for the specified secret. If the secret does not exist, this call returns an empty set of permissions, not a NOT_FOUND error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsSecrets: API.OperationMethod<TestIamPermissionsProjectsSecretsRequest, TestIamPermissionsProjectsSecretsResponse, TestIamPermissionsProjectsSecretsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsSecretsRequest,
  output: TestIamPermissionsProjectsSecretsResponse,
  errors: [],
}));

export interface GetProjectsSecretsRequest {
  /** Required. The resource name of the Secret, in the format `projects/* /secrets/*`. */
  name: string;
}

export const GetProjectsSecretsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/secrets/{secretsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsSecretsRequest>;

export type GetProjectsSecretsResponse = Secret;
export const GetProjectsSecretsResponse = Secret;

export type GetProjectsSecretsError = CommonErrors;

/** Gets metadata for a given Secret. */
export const getProjectsSecrets: API.OperationMethod<GetProjectsSecretsRequest, GetProjectsSecretsResponse, GetProjectsSecretsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsSecretsRequest,
  output: GetProjectsSecretsResponse,
  errors: [],
}));

export interface PatchProjectsSecretsRequest {
  /** Required. Specifies the fields to be updated. */
  updateMask?: string;
  /** Output only. The resource name of the Secret in the format `projects/* /secrets/*`. */
  name: string;
  /** Request body */
  body?: Secret;
}

export const PatchProjectsSecretsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Secret).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta1/projects/{projectsId}/secrets/{secretsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsSecretsRequest>;

export type PatchProjectsSecretsResponse = Secret;
export const PatchProjectsSecretsResponse = Secret;

export type PatchProjectsSecretsError = CommonErrors;

/** Updates metadata of an existing Secret. */
export const patchProjectsSecrets: API.OperationMethod<PatchProjectsSecretsRequest, PatchProjectsSecretsResponse, PatchProjectsSecretsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsSecretsRequest,
  output: PatchProjectsSecretsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsSecretsRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsSecretsRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/secrets/{secretsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsSecretsRequest>;

export type GetIamPolicyProjectsSecretsResponse = Policy;
export const GetIamPolicyProjectsSecretsResponse = Policy;

export type GetIamPolicyProjectsSecretsError = CommonErrors;

/** Gets the access control policy for a secret. Returns empty policy if the secret exists and does not have a policy set. */
export const getIamPolicyProjectsSecrets: API.OperationMethod<GetIamPolicyProjectsSecretsRequest, GetIamPolicyProjectsSecretsResponse, GetIamPolicyProjectsSecretsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsSecretsRequest,
  output: GetIamPolicyProjectsSecretsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsSecretsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsSecretsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/secrets/{secretsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsSecretsRequest>;

export type SetIamPolicyProjectsSecretsResponse = Policy;
export const SetIamPolicyProjectsSecretsResponse = Policy;

export type SetIamPolicyProjectsSecretsError = CommonErrors;

/** Sets the access control policy on the specified secret. Replaces any existing policy. Permissions on SecretVersions are enforced according to the policy set on the associated Secret. */
export const setIamPolicyProjectsSecrets: API.OperationMethod<SetIamPolicyProjectsSecretsRequest, SetIamPolicyProjectsSecretsResponse, SetIamPolicyProjectsSecretsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsSecretsRequest,
  output: SetIamPolicyProjectsSecretsResponse,
  errors: [],
}));

export interface DeleteProjectsSecretsRequest {
  /** Required. The resource name of the Secret to delete in the format `projects/* /secrets/*`. */
  name: string;
}

export const DeleteProjectsSecretsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/projects/{projectsId}/secrets/{secretsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsSecretsRequest>;

export type DeleteProjectsSecretsResponse = Empty;
export const DeleteProjectsSecretsResponse = Empty;

export type DeleteProjectsSecretsError = CommonErrors;

/** Deletes a Secret. */
export const deleteProjectsSecrets: API.OperationMethod<DeleteProjectsSecretsRequest, DeleteProjectsSecretsResponse, DeleteProjectsSecretsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsSecretsRequest,
  output: DeleteProjectsSecretsResponse,
  errors: [],
}));

export interface AddVersionProjectsSecretsRequest {
  /** Required. The resource name of the Secret to associate with the SecretVersion in the format `projects/* /secrets/*`. */
  parent: string;
  /** Request body */
  body?: AddSecretVersionRequest;
}

export const AddVersionProjectsSecretsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AddSecretVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/secrets/{secretsId}:addVersion", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddVersionProjectsSecretsRequest>;

export type AddVersionProjectsSecretsResponse = SecretVersion;
export const AddVersionProjectsSecretsResponse = SecretVersion;

export type AddVersionProjectsSecretsError = CommonErrors;

/** Creates a new SecretVersion containing secret data and attaches it to an existing Secret. */
export const addVersionProjectsSecrets: API.OperationMethod<AddVersionProjectsSecretsRequest, AddVersionProjectsSecretsResponse, AddVersionProjectsSecretsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddVersionProjectsSecretsRequest,
  output: AddVersionProjectsSecretsResponse,
  errors: [],
}));

export interface CreateProjectsSecretsRequest {
  /** Required. The resource name of the project to associate with the Secret, in the format `projects/*`. */
  parent: string;
  /** Required. This must be unique within the project. A secret ID is a string with a maximum length of 255 characters and can contain uppercase and lowercase letters, numerals, and the hyphen (`-`) and underscore (`_`) characters. */
  secretId?: string;
  /** Request body */
  body?: Secret;
}

export const CreateProjectsSecretsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  secretId: Schema.optional(Schema.String).pipe(T.HttpQuery("secretId")),
  body: Schema.optional(Secret).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/secrets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsSecretsRequest>;

export type CreateProjectsSecretsResponse = Secret;
export const CreateProjectsSecretsResponse = Secret;

export type CreateProjectsSecretsError = CommonErrors;

/** Creates a new Secret containing no SecretVersions. */
export const createProjectsSecrets: API.OperationMethod<CreateProjectsSecretsRequest, CreateProjectsSecretsResponse, CreateProjectsSecretsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsSecretsRequest,
  output: CreateProjectsSecretsResponse,
  errors: [],
}));

export interface AccessProjectsSecretsVersionsRequest {
  /** Required. The resource name of the SecretVersion in the format `projects/* /secrets/* /versions/*`. */
  name: string;
}

export const AccessProjectsSecretsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/secrets/{secretsId}/versions/{versionsId}:access" }),
  svc,
) as unknown as Schema.Schema<AccessProjectsSecretsVersionsRequest>;

export type AccessProjectsSecretsVersionsResponse = AccessSecretVersionResponse;
export const AccessProjectsSecretsVersionsResponse = AccessSecretVersionResponse;

export type AccessProjectsSecretsVersionsError = CommonErrors;

/** Accesses a SecretVersion. This call returns the secret data. `projects/* /secrets/* /versions/latest` is an alias to the `latest` SecretVersion. */
export const accessProjectsSecretsVersions: API.OperationMethod<AccessProjectsSecretsVersionsRequest, AccessProjectsSecretsVersionsResponse, AccessProjectsSecretsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AccessProjectsSecretsVersionsRequest,
  output: AccessProjectsSecretsVersionsResponse,
  errors: [],
}));

export interface GetProjectsSecretsVersionsRequest {
  /** Required. The resource name of the SecretVersion in the format `projects/* /secrets/* /versions/*`. `projects/* /secrets/* /versions/latest` is an alias to the `latest` SecretVersion. */
  name: string;
}

export const GetProjectsSecretsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/secrets/{secretsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsSecretsVersionsRequest>;

export type GetProjectsSecretsVersionsResponse = SecretVersion;
export const GetProjectsSecretsVersionsResponse = SecretVersion;

export type GetProjectsSecretsVersionsError = CommonErrors;

/** Gets metadata for a SecretVersion. `projects/* /secrets/* /versions/latest` is an alias to the `latest` SecretVersion. */
export const getProjectsSecretsVersions: API.OperationMethod<GetProjectsSecretsVersionsRequest, GetProjectsSecretsVersionsResponse, GetProjectsSecretsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsSecretsVersionsRequest,
  output: GetProjectsSecretsVersionsResponse,
  errors: [],
}));

export interface DisableProjectsSecretsVersionsRequest {
  /** Required. The resource name of the SecretVersion to disable in the format `projects/* /secrets/* /versions/*`. */
  name: string;
  /** Request body */
  body?: DisableSecretVersionRequest;
}

export const DisableProjectsSecretsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DisableSecretVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/secrets/{secretsId}/versions/{versionsId}:disable", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DisableProjectsSecretsVersionsRequest>;

export type DisableProjectsSecretsVersionsResponse = SecretVersion;
export const DisableProjectsSecretsVersionsResponse = SecretVersion;

export type DisableProjectsSecretsVersionsError = CommonErrors;

/** Disables a SecretVersion. Sets the state of the SecretVersion to DISABLED. */
export const disableProjectsSecretsVersions: API.OperationMethod<DisableProjectsSecretsVersionsRequest, DisableProjectsSecretsVersionsResponse, DisableProjectsSecretsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DisableProjectsSecretsVersionsRequest,
  output: DisableProjectsSecretsVersionsResponse,
  errors: [],
}));

export interface DestroyProjectsSecretsVersionsRequest {
  /** Required. The resource name of the SecretVersion to destroy in the format `projects/* /secrets/* /versions/*`. */
  name: string;
  /** Request body */
  body?: DestroySecretVersionRequest;
}

export const DestroyProjectsSecretsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DestroySecretVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/secrets/{secretsId}/versions/{versionsId}:destroy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DestroyProjectsSecretsVersionsRequest>;

export type DestroyProjectsSecretsVersionsResponse = SecretVersion;
export const DestroyProjectsSecretsVersionsResponse = SecretVersion;

export type DestroyProjectsSecretsVersionsError = CommonErrors;

/** Destroys a SecretVersion. Sets the state of the SecretVersion to DESTROYED and irrevocably destroys the secret data. */
export const destroyProjectsSecretsVersions: API.OperationMethod<DestroyProjectsSecretsVersionsRequest, DestroyProjectsSecretsVersionsResponse, DestroyProjectsSecretsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DestroyProjectsSecretsVersionsRequest,
  output: DestroyProjectsSecretsVersionsResponse,
  errors: [],
}));

export interface EnableProjectsSecretsVersionsRequest {
  /** Required. The resource name of the SecretVersion to enable in the format `projects/* /secrets/* /versions/*`. */
  name: string;
  /** Request body */
  body?: EnableSecretVersionRequest;
}

export const EnableProjectsSecretsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EnableSecretVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/secrets/{secretsId}/versions/{versionsId}:enable", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EnableProjectsSecretsVersionsRequest>;

export type EnableProjectsSecretsVersionsResponse = SecretVersion;
export const EnableProjectsSecretsVersionsResponse = SecretVersion;

export type EnableProjectsSecretsVersionsError = CommonErrors;

/** Enables a SecretVersion. Sets the state of the SecretVersion to ENABLED. */
export const enableProjectsSecretsVersions: API.OperationMethod<EnableProjectsSecretsVersionsRequest, EnableProjectsSecretsVersionsResponse, EnableProjectsSecretsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EnableProjectsSecretsVersionsRequest,
  output: EnableProjectsSecretsVersionsResponse,
  errors: [],
}));

export interface ListProjectsSecretsVersionsRequest {
  /** Optional. Pagination token, returned earlier via ListSecretVersionsResponse.next_page_token][]. */
  pageToken?: string;
  /** Required. The resource name of the Secret associated with the SecretVersions to list, in the format `projects/* /secrets/*`. */
  parent: string;
  /** Optional. The maximum number of results to be returned in a single page. If set to 0, the server decides the number of results to return. If the number is greater than 25000, it is capped at 25000. */
  pageSize?: number;
}

export const ListProjectsSecretsVersionsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/secrets/{secretsId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsSecretsVersionsRequest>;

export type ListProjectsSecretsVersionsResponse = ListSecretVersionsResponse;
export const ListProjectsSecretsVersionsResponse = ListSecretVersionsResponse;

export type ListProjectsSecretsVersionsError = CommonErrors;

/** Lists SecretVersions. This call does not return secret data. */
export const listProjectsSecretsVersions: API.PaginatedOperationMethod<ListProjectsSecretsVersionsRequest, ListProjectsSecretsVersionsResponse, ListProjectsSecretsVersionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsSecretsVersionsRequest,
  output: ListProjectsSecretsVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<ListProjectsLocationsRequest, ListProjectsLocationsResponse, ListProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
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

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = CommonErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

