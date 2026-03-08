// ==========================================================================
// Cloud Runtime Configuration API (runtimeconfig v1beta1)
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
  name: "runtimeconfig",
  version: "v1beta1",
  rootUrl: "https://runtimeconfig.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface RuntimeConfig {
  /** An optional description of the RuntimeConfig object. */
  description?: string;
  /** The resource name of a runtime config. The name must have the format: projects/[PROJECT_ID]/configs/[CONFIG_NAME] The `[PROJECT_ID]` must be a valid project ID, and `[CONFIG_NAME]` is an arbitrary name that matches the `[0-9A-Za-z](?:[_.A-Za-z0-9-]{0,62}[_.A-Za-z0-9])?` regular expression. The length of `[CONFIG_NAME]` must be less than 64 characters. You pick the RuntimeConfig resource name, but the server will validate that the name adheres to this format. After you create the resource, you cannot change the resource's name. */
  name?: string;
}

export const RuntimeConfig: Schema.Schema<RuntimeConfig> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "RuntimeConfig" }) as any as Schema.Schema<RuntimeConfig>;

export interface ListConfigsResponse {
  /** A list of the configurations in the project. The order of returned objects is arbitrary; that is, it is not ordered in any particular way. */
  configs?: Array<RuntimeConfig>;
  /** This token allows you to get the next page of results for list requests. If the number of results is larger than `pageSize`, use the `nextPageToken` as a value for the query parameter `pageToken` in the next list request. Subsequent list requests will have their own `nextPageToken` to continue paging through the results */
  nextPageToken?: string;
}

export const ListConfigsResponse: Schema.Schema<ListConfigsResponse> = Schema.suspend(() => Schema.Struct({
  configs: Schema.optional(Schema.Array(RuntimeConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListConfigsResponse" }) as any as Schema.Schema<ListConfigsResponse>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface Expr {
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
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

export interface Variable {
  /** The string value of the variable. The length of the value must be less than 4096 bytes. Empty values are also accepted. For example, `text: "my text value"`. The string must be valid UTF-8. */
  text?: string;
  /** The binary value of the variable. The length of the value must be less than 4096 bytes. Empty values are also accepted. The value must be base64 encoded, and must comply with IETF RFC4648 (https://www.ietf.org/rfc/rfc4648.txt). Only one of `value` or `text` can be set. */
  value?: string;
  /** The name of the variable resource, in the format: projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_NAME] The `[PROJECT_ID]` must be a valid project ID, `[CONFIG_NAME]` must be a valid RuntimeConfig resource and `[VARIABLE_NAME]` follows Unix file system file path naming. The `[VARIABLE_NAME]` can contain ASCII letters, numbers, slashes and dashes. Slashes are used as path element separators and are not part of the `[VARIABLE_NAME]` itself, so `[VARIABLE_NAME]` must contain at least one non-slash character. Multiple slashes are coalesced into single slash character. Each path segment should match [0-9A-Za-z](?:[_.A-Za-z0-9-]{0,62}[_.A-Za-z0-9])? regular expression. The length of a `[VARIABLE_NAME]` must be less than 256 characters. Once you create a variable, you cannot change the variable name. */
  name?: string;
  /** Output only. The current state of the variable. The variable state indicates the outcome of the `variables().watch` call and is visible through the `get` and `list` calls. */
  state?: "VARIABLE_STATE_UNSPECIFIED" | "UPDATED" | "DELETED" | (string & {});
  /** Output only. The time of the last variable update. Timestamp will be UTC timestamp. */
  updateTime?: string;
}

export const Variable: Schema.Schema<Variable> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Variable" }) as any as Schema.Schema<Variable>;

export interface WatchVariableRequest {
  /** If specified, checks the current timestamp of the variable and if the current timestamp is newer than `newerThan` timestamp, the method returns immediately. If not specified or the variable has an older timestamp, the watcher waits for a the value to change before returning. */
  newerThan?: string;
}

export const WatchVariableRequest: Schema.Schema<WatchVariableRequest> = Schema.suspend(() => Schema.Struct({
  newerThan: Schema.optional(Schema.String),
})).annotate({ identifier: "WatchVariableRequest" }) as any as Schema.Schema<WatchVariableRequest>;

export interface Cardinality {
  /** The root of the variable subtree to monitor. For example, `/foo`. */
  path?: string;
  /** The number variables under the `path` that must exist to meet this condition. Defaults to 1 if not specified. */
  number?: number;
}

export const Cardinality: Schema.Schema<Cardinality> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  number: Schema.optional(Schema.Number),
})).annotate({ identifier: "Cardinality" }) as any as Schema.Schema<Cardinality>;

export interface EndCondition {
  /** The cardinality of the `EndCondition`. */
  cardinality?: Cardinality;
}

export const EndCondition: Schema.Schema<EndCondition> = Schema.suspend(() => Schema.Struct({
  cardinality: Schema.optional(Cardinality),
})).annotate({ identifier: "EndCondition" }) as any as Schema.Schema<EndCondition>;

export interface ListVariablesResponse {
  /** A list of variables and their values. The order of returned variable objects is arbitrary. */
  variables?: Array<Variable>;
  /** This token allows you to get the next page of results for list requests. If the number of results is larger than `pageSize`, use the `nextPageToken` as a value for the query parameter `pageToken` in the next list request. Subsequent list requests will have their own `nextPageToken` to continue paging through the results */
  nextPageToken?: string;
}

export const ListVariablesResponse: Schema.Schema<ListVariablesResponse> = Schema.suspend(() => Schema.Struct({
  variables: Schema.optional(Schema.Array(Variable)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListVariablesResponse" }) as any as Schema.Schema<ListVariablesResponse>;

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

export interface Waiter {
  /** Output only. If the value is `false`, it means the waiter is still waiting for one of its conditions to be met. If true, the waiter has finished. If the waiter finished due to a timeout or failure, `error` will be set. */
  done?: boolean;
  /** [Optional] The failure condition of this waiter. If this condition is met, `done` will be set to `true` and the `error` code will be set to `ABORTED`. The failure condition takes precedence over the success condition. If both conditions are met, a failure will be indicated. This value is optional; if no failure condition is set, the only failure scenario will be a timeout. */
  failure?: EndCondition;
  /** [Required] The success condition. If this condition is met, `done` will be set to `true` and the `error` value will remain unset. The failure condition takes precedence over the success condition. If both conditions are met, a failure will be indicated. */
  success?: EndCondition;
  /** The name of the Waiter resource, in the format: projects/[PROJECT_ID]/configs/[CONFIG_NAME]/waiters/[WAITER_NAME] The `[PROJECT_ID]` must be a valid Google Cloud project ID, the `[CONFIG_NAME]` must be a valid RuntimeConfig resource, the `[WAITER_NAME]` must match RFC 1035 segment specification, and the length of `[WAITER_NAME]` must be less than 64 bytes. After you create a Waiter resource, you cannot change the resource name. */
  name?: string;
  /** Output only. The instant at which this Waiter resource was created. Adding the value of `timeout` to this instant yields the timeout deadline for the waiter. */
  createTime?: string;
  /** [Required] Specifies the timeout of the waiter in seconds, beginning from the instant that `waiters().create` method is called. If this time elapses before the success or failure conditions are met, the waiter fails and sets the `error` code to `DEADLINE_EXCEEDED`. */
  timeout?: string;
  /** Output only. If the waiter ended due to a failure or timeout, this value will be set. */
  error?: Status;
}

export const Waiter: Schema.Schema<Waiter> = Schema.suspend(() => Schema.Struct({
  done: Schema.optional(Schema.Boolean),
  failure: Schema.optional(EndCondition),
  success: Schema.optional(EndCondition),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  error: Schema.optional(Status),
})).annotate({ identifier: "Waiter" }) as any as Schema.Schema<Waiter>;

export interface Operation {
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface Policy {
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  bindings: Schema.optional(Schema.Array(Binding)),
  etag: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface ListWaitersResponse {
  /** This token allows you to get the next page of results for list requests. If the number of results is larger than `pageSize`, use the `nextPageToken` as a value for the query parameter `pageToken` in the next list request. Subsequent list requests will have their own `nextPageToken` to continue paging through the results */
  nextPageToken?: string;
  /** Found waiters in the project. */
  waiters?: Array<Waiter>;
}

export const ListWaitersResponse: Schema.Schema<ListWaitersResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  waiters: Schema.optional(Schema.Array(Waiter)),
})).annotate({ identifier: "ListWaitersResponse" }) as any as Schema.Schema<ListWaitersResponse>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetProjectsConfigsRequest {
  /** The name of the RuntimeConfig resource to retrieve, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]` */
  name: string;
}

export const GetProjectsConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/configs/{configsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsConfigsRequest>;

export type GetProjectsConfigsResponse = RuntimeConfig;
export const GetProjectsConfigsResponse = RuntimeConfig;

export type GetProjectsConfigsError = DefaultErrors;

/** Gets information about a RuntimeConfig resource. */
export const getProjectsConfigs: API.OperationMethod<GetProjectsConfigsRequest, GetProjectsConfigsResponse, GetProjectsConfigsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsConfigsRequest,
  output: GetProjectsConfigsResponse,
  errors: [],
}));

export interface CreateProjectsConfigsRequest {
  /** An optional but recommended unique `request_id`. If the server receives two `create()` requests with the same `request_id`, then the second request will be ignored and the first resource created and stored in the backend is returned. Empty `request_id` fields are ignored. It is responsibility of the client to ensure uniqueness of the `request_id` strings. `request_id` strings are limited to 64 characters. */
  requestId?: string;
  /** The [project ID](https://support.google.com/cloud/answer/6158840?hl=en&ref_topic=6158848) for this request, in the format `projects/[PROJECT_ID]`. */
  parent: string;
  /** Request body */
  body?: RuntimeConfig;
}

export const CreateProjectsConfigsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RuntimeConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/configs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsConfigsRequest>;

export type CreateProjectsConfigsResponse = RuntimeConfig;
export const CreateProjectsConfigsResponse = RuntimeConfig;

export type CreateProjectsConfigsError = DefaultErrors;

/** Creates a new RuntimeConfig resource. The configuration name must be unique within project. */
export const createProjectsConfigs: API.OperationMethod<CreateProjectsConfigsRequest, CreateProjectsConfigsResponse, CreateProjectsConfigsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsConfigsRequest,
  output: CreateProjectsConfigsResponse,
  errors: [],
}));

export interface DeleteProjectsConfigsRequest {
  /** The RuntimeConfig resource to delete, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]` */
  name: string;
}

export const DeleteProjectsConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/projects/{projectsId}/configs/{configsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsConfigsRequest>;

export type DeleteProjectsConfigsResponse = Empty;
export const DeleteProjectsConfigsResponse = Empty;

export type DeleteProjectsConfigsError = DefaultErrors;

/** Deletes a RuntimeConfig resource. */
export const deleteProjectsConfigs: API.OperationMethod<DeleteProjectsConfigsRequest, DeleteProjectsConfigsResponse, DeleteProjectsConfigsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsConfigsRequest,
  output: DeleteProjectsConfigsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsConfigsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsConfigsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/configs/{configsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsConfigsRequest>;

export type TestIamPermissionsProjectsConfigsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsConfigsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsConfigsError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsConfigs: API.OperationMethod<TestIamPermissionsProjectsConfigsRequest, TestIamPermissionsProjectsConfigsResponse, TestIamPermissionsProjectsConfigsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsConfigsRequest,
  output: TestIamPermissionsProjectsConfigsResponse,
  errors: [],
}));

export interface ListProjectsConfigsRequest {
  /** The [project ID](https://support.google.com/cloud/answer/6158840?hl=en&ref_topic=6158848) for this request, in the format `projects/[PROJECT_ID]`. */
  parent: string;
  /** Specifies a page token to use. Set `pageToken` to a `nextPageToken` returned by a previous list request to get the next page of results. */
  pageToken?: string;
  /** Specifies the number of results to return per page. If there are fewer elements than the specified number, returns all elements. */
  pageSize?: number;
}

export const ListProjectsConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/configs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsConfigsRequest>;

export type ListProjectsConfigsResponse = ListConfigsResponse;
export const ListProjectsConfigsResponse = ListConfigsResponse;

export type ListProjectsConfigsError = DefaultErrors;

/** Lists all the RuntimeConfig resources within project. */
export const listProjectsConfigs: API.PaginatedOperationMethod<ListProjectsConfigsRequest, ListProjectsConfigsResponse, ListProjectsConfigsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsConfigsRequest,
  output: ListProjectsConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SetIamPolicyProjectsConfigsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsConfigsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/configs/{configsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsConfigsRequest>;

export type SetIamPolicyProjectsConfigsResponse = Policy;
export const SetIamPolicyProjectsConfigsResponse = Policy;

export type SetIamPolicyProjectsConfigsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsConfigs: API.OperationMethod<SetIamPolicyProjectsConfigsRequest, SetIamPolicyProjectsConfigsResponse, SetIamPolicyProjectsConfigsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsConfigsRequest,
  output: SetIamPolicyProjectsConfigsResponse,
  errors: [],
}));

export interface UpdateProjectsConfigsRequest {
  /** The name of the RuntimeConfig resource to update, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]` */
  name: string;
  /** Request body */
  body?: RuntimeConfig;
}

export const UpdateProjectsConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RuntimeConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1beta1/projects/{projectsId}/configs/{configsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsConfigsRequest>;

export type UpdateProjectsConfigsResponse = RuntimeConfig;
export const UpdateProjectsConfigsResponse = RuntimeConfig;

export type UpdateProjectsConfigsError = DefaultErrors;

/** Updates a RuntimeConfig resource. The configuration must exist beforehand. */
export const updateProjectsConfigs: API.OperationMethod<UpdateProjectsConfigsRequest, UpdateProjectsConfigsResponse, UpdateProjectsConfigsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsConfigsRequest,
  output: UpdateProjectsConfigsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsConfigsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsConfigsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/configs/{configsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsConfigsRequest>;

export type GetIamPolicyProjectsConfigsResponse = Policy;
export const GetIamPolicyProjectsConfigsResponse = Policy;

export type GetIamPolicyProjectsConfigsError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsConfigs: API.OperationMethod<GetIamPolicyProjectsConfigsRequest, GetIamPolicyProjectsConfigsResponse, GetIamPolicyProjectsConfigsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsConfigsRequest,
  output: GetIamPolicyProjectsConfigsResponse,
  errors: [],
}));

export interface CreateProjectsConfigsVariablesRequest {
  /** The path to the RutimeConfig resource that this variable should belong to. The configuration must exist beforehand; the path must be in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]` */
  parent: string;
  /** An optional but recommended unique `request_id`. If the server receives two `create()` requests with the same `request_id`, then the second request will be ignored and the first resource created and stored in the backend is returned. Empty `request_id` fields are ignored. It is responsibility of the client to ensure uniqueness of the `request_id` strings. `request_id` strings are limited to 64 characters. */
  requestId?: string;
  /** Request body */
  body?: Variable;
}

export const CreateProjectsConfigsVariablesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Variable).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/configs/{configsId}/variables", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsConfigsVariablesRequest>;

export type CreateProjectsConfigsVariablesResponse = Variable;
export const CreateProjectsConfigsVariablesResponse = Variable;

export type CreateProjectsConfigsVariablesError = DefaultErrors;

/** Creates a variable within the given configuration. You cannot create a variable with a name that is a prefix of an existing variable name, or a name that has an existing variable name as a prefix. To learn more about creating a variable, read the [Setting and Getting Data](/deployment-manager/runtime-configurator/set-and-get-variables) documentation. */
export const createProjectsConfigsVariables: API.OperationMethod<CreateProjectsConfigsVariablesRequest, CreateProjectsConfigsVariablesResponse, CreateProjectsConfigsVariablesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsConfigsVariablesRequest,
  output: CreateProjectsConfigsVariablesResponse,
  errors: [],
}));

export interface WatchProjectsConfigsVariablesRequest {
  /** The name of the variable to watch, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]` */
  name: string;
  /** Request body */
  body?: WatchVariableRequest;
}

export const WatchProjectsConfigsVariablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(WatchVariableRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/configs/{configsId}/variables/{variablesId}:watch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WatchProjectsConfigsVariablesRequest>;

export type WatchProjectsConfigsVariablesResponse = Variable;
export const WatchProjectsConfigsVariablesResponse = Variable;

export type WatchProjectsConfigsVariablesError = DefaultErrors;

/** Watches a specific variable and waits for a change in the variable's value. When there is a change, this method returns the new value or times out. If a variable is deleted while being watched, the `variableState` state is set to `DELETED` and the method returns the last known variable `value`. If you set the deadline for watching to a larger value than internal timeout (60 seconds), the current variable value is returned and the `variableState` will be `VARIABLE_STATE_UNSPECIFIED`. To learn more about creating a watcher, read the [Watching a Variable for Changes](/deployment-manager/runtime-configurator/watching-a-variable) documentation. */
export const watchProjectsConfigsVariables: API.OperationMethod<WatchProjectsConfigsVariablesRequest, WatchProjectsConfigsVariablesResponse, WatchProjectsConfigsVariablesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: WatchProjectsConfigsVariablesRequest,
  output: WatchProjectsConfigsVariablesResponse,
  errors: [],
}));

export interface GetProjectsConfigsVariablesRequest {
  /** The name of the variable to return, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIBLE_NAME]` */
  name: string;
}

export const GetProjectsConfigsVariablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/configs/{configsId}/variables/{variablesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsConfigsVariablesRequest>;

export type GetProjectsConfigsVariablesResponse = Variable;
export const GetProjectsConfigsVariablesResponse = Variable;

export type GetProjectsConfigsVariablesError = DefaultErrors;

/** Gets information about a single variable. */
export const getProjectsConfigsVariables: API.OperationMethod<GetProjectsConfigsVariablesRequest, GetProjectsConfigsVariablesResponse, GetProjectsConfigsVariablesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsConfigsVariablesRequest,
  output: GetProjectsConfigsVariablesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsConfigsVariablesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsConfigsVariablesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/configs/{configsId}/variables/{variablesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsConfigsVariablesRequest>;

export type TestIamPermissionsProjectsConfigsVariablesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsConfigsVariablesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsConfigsVariablesError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsConfigsVariables: API.OperationMethod<TestIamPermissionsProjectsConfigsVariablesRequest, TestIamPermissionsProjectsConfigsVariablesResponse, TestIamPermissionsProjectsConfigsVariablesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsConfigsVariablesRequest,
  output: TestIamPermissionsProjectsConfigsVariablesResponse,
  errors: [],
}));

export interface UpdateProjectsConfigsVariablesRequest {
  /** The name of the variable to update, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_NAME]` */
  name: string;
  /** Request body */
  body?: Variable;
}

export const UpdateProjectsConfigsVariablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Variable).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1beta1/projects/{projectsId}/configs/{configsId}/variables/{variablesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsConfigsVariablesRequest>;

export type UpdateProjectsConfigsVariablesResponse = Variable;
export const UpdateProjectsConfigsVariablesResponse = Variable;

export type UpdateProjectsConfigsVariablesError = DefaultErrors;

/** Updates an existing variable with a new value. */
export const updateProjectsConfigsVariables: API.OperationMethod<UpdateProjectsConfigsVariablesRequest, UpdateProjectsConfigsVariablesResponse, UpdateProjectsConfigsVariablesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsConfigsVariablesRequest,
  output: UpdateProjectsConfigsVariablesResponse,
  errors: [],
}));

export interface DeleteProjectsConfigsVariablesRequest {
  /** The name of the variable to delete, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_NAME]` */
  name: string;
  /** Set to `true` to recursively delete multiple variables with the same prefix. */
  recursive?: boolean;
}

export const DeleteProjectsConfigsVariablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  recursive: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("recursive")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/projects/{projectsId}/configs/{configsId}/variables/{variablesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsConfigsVariablesRequest>;

export type DeleteProjectsConfigsVariablesResponse = Empty;
export const DeleteProjectsConfigsVariablesResponse = Empty;

export type DeleteProjectsConfigsVariablesError = DefaultErrors;

/** Deletes a variable or multiple variables. If you specify a variable name, then that variable is deleted. If you specify a prefix and `recursive` is true, then all variables with that prefix are deleted. You must set a `recursive` to true if you delete variables by prefix. */
export const deleteProjectsConfigsVariables: API.OperationMethod<DeleteProjectsConfigsVariablesRequest, DeleteProjectsConfigsVariablesResponse, DeleteProjectsConfigsVariablesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsConfigsVariablesRequest,
  output: DeleteProjectsConfigsVariablesResponse,
  errors: [],
}));

export interface ListProjectsConfigsVariablesRequest {
  /** Specifies a page token to use. Set `pageToken` to a `nextPageToken` returned by a previous list request to get the next page of results. */
  pageToken?: string;
  /** The flag indicates whether the user wants to return values of variables. If true, then only those variables that user has IAM GetVariable permission will be returned along with their values. */
  returnValues?: boolean;
  /** The path to the RuntimeConfig resource for which you want to list variables. The configuration must exist beforehand; the path must be in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]` */
  parent: string;
  /** Filters variables by matching the specified filter. For example: `projects/example-project/config/[CONFIG_NAME]/variables/example-variable`. */
  filter?: string;
  /** Specifies the number of results to return per page. If there are fewer elements than the specified number, returns all elements. */
  pageSize?: number;
}

export const ListProjectsConfigsVariablesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnValues: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnValues")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/configs/{configsId}/variables" }),
  svc,
) as unknown as Schema.Schema<ListProjectsConfigsVariablesRequest>;

export type ListProjectsConfigsVariablesResponse = ListVariablesResponse;
export const ListProjectsConfigsVariablesResponse = ListVariablesResponse;

export type ListProjectsConfigsVariablesError = DefaultErrors;

/** Lists variables within given a configuration, matching any provided filters. This only lists variable names, not the values, unless `return_values` is true, in which case only variables that user has IAM permission to GetVariable will be returned. */
export const listProjectsConfigsVariables: API.PaginatedOperationMethod<ListProjectsConfigsVariablesRequest, ListProjectsConfigsVariablesResponse, ListProjectsConfigsVariablesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsConfigsVariablesRequest,
  output: ListProjectsConfigsVariablesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface TestIamPermissionsProjectsConfigsOperationsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsConfigsOperationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/configs/{configsId}/operations/{operationsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsConfigsOperationsRequest>;

export type TestIamPermissionsProjectsConfigsOperationsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsConfigsOperationsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsConfigsOperationsError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsConfigsOperations: API.OperationMethod<TestIamPermissionsProjectsConfigsOperationsRequest, TestIamPermissionsProjectsConfigsOperationsResponse, TestIamPermissionsProjectsConfigsOperationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsConfigsOperationsRequest,
  output: TestIamPermissionsProjectsConfigsOperationsResponse,
  errors: [],
}));

export interface GetProjectsConfigsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsConfigsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/configs/{configsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsConfigsOperationsRequest>;

export type GetProjectsConfigsOperationsResponse = Operation;
export const GetProjectsConfigsOperationsResponse = Operation;

export type GetProjectsConfigsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsConfigsOperations: API.OperationMethod<GetProjectsConfigsOperationsRequest, GetProjectsConfigsOperationsResponse, GetProjectsConfigsOperationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsConfigsOperationsRequest,
  output: GetProjectsConfigsOperationsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsConfigsWaitersRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsConfigsWaitersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/configs/{configsId}/waiters/{waitersId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsConfigsWaitersRequest>;

export type TestIamPermissionsProjectsConfigsWaitersResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsConfigsWaitersResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsConfigsWaitersError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsConfigsWaiters: API.OperationMethod<TestIamPermissionsProjectsConfigsWaitersRequest, TestIamPermissionsProjectsConfigsWaitersResponse, TestIamPermissionsProjectsConfigsWaitersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsConfigsWaitersRequest,
  output: TestIamPermissionsProjectsConfigsWaitersResponse,
  errors: [],
}));

export interface CreateProjectsConfigsWaitersRequest {
  /** The path to the configuration that will own the waiter. The configuration must exist beforehand; the path must be in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`. */
  parent: string;
  /** An optional but recommended unique `request_id`. If the server receives two `create()` requests with the same `request_id`, then the second request will be ignored and the first resource created and stored in the backend is returned. Empty `request_id` fields are ignored. It is responsibility of the client to ensure uniqueness of the `request_id` strings. `request_id` strings are limited to 64 characters. */
  requestId?: string;
  /** Request body */
  body?: Waiter;
}

export const CreateProjectsConfigsWaitersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Waiter).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/configs/{configsId}/waiters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsConfigsWaitersRequest>;

export type CreateProjectsConfigsWaitersResponse = Operation;
export const CreateProjectsConfigsWaitersResponse = Operation;

export type CreateProjectsConfigsWaitersError = DefaultErrors;

/** Creates a Waiter resource. This operation returns a long-running Operation resource which can be polled for completion. However, a waiter with the given name will exist (and can be retrieved) prior to the operation completing. If the operation fails, the failed Waiter resource will still exist and must be deleted prior to subsequent creation attempts. */
export const createProjectsConfigsWaiters: API.OperationMethod<CreateProjectsConfigsWaitersRequest, CreateProjectsConfigsWaitersResponse, CreateProjectsConfigsWaitersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsConfigsWaitersRequest,
  output: CreateProjectsConfigsWaitersResponse,
  errors: [],
}));

export interface ListProjectsConfigsWaitersRequest {
  /** Specifies a page token to use. Set `pageToken` to a `nextPageToken` returned by a previous list request to get the next page of results. */
  pageToken?: string;
  /** The path to the configuration for which you want to get a list of waiters. The configuration must exist beforehand; the path must be in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]` */
  parent: string;
  /** Specifies the number of results to return per page. If there are fewer elements than the specified number, returns all elements. */
  pageSize?: number;
}

export const ListProjectsConfigsWaitersRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/configs/{configsId}/waiters" }),
  svc,
) as unknown as Schema.Schema<ListProjectsConfigsWaitersRequest>;

export type ListProjectsConfigsWaitersResponse = ListWaitersResponse;
export const ListProjectsConfigsWaitersResponse = ListWaitersResponse;

export type ListProjectsConfigsWaitersError = DefaultErrors;

/** List waiters within the given configuration. */
export const listProjectsConfigsWaiters: API.PaginatedOperationMethod<ListProjectsConfigsWaitersRequest, ListProjectsConfigsWaitersResponse, ListProjectsConfigsWaitersError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsConfigsWaitersRequest,
  output: ListProjectsConfigsWaitersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsConfigsWaitersRequest {
  /** The Waiter resource to delete, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/waiters/[WAITER_NAME]` */
  name: string;
}

export const DeleteProjectsConfigsWaitersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/projects/{projectsId}/configs/{configsId}/waiters/{waitersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsConfigsWaitersRequest>;

export type DeleteProjectsConfigsWaitersResponse = Empty;
export const DeleteProjectsConfigsWaitersResponse = Empty;

export type DeleteProjectsConfigsWaitersError = DefaultErrors;

/** Deletes the waiter with the specified name. */
export const deleteProjectsConfigsWaiters: API.OperationMethod<DeleteProjectsConfigsWaitersRequest, DeleteProjectsConfigsWaitersResponse, DeleteProjectsConfigsWaitersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsConfigsWaitersRequest,
  output: DeleteProjectsConfigsWaitersResponse,
  errors: [],
}));

export interface GetProjectsConfigsWaitersRequest {
  /** The fully-qualified name of the Waiter resource object to retrieve, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/waiters/[WAITER_NAME]` */
  name: string;
}

export const GetProjectsConfigsWaitersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/configs/{configsId}/waiters/{waitersId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsConfigsWaitersRequest>;

export type GetProjectsConfigsWaitersResponse = Waiter;
export const GetProjectsConfigsWaitersResponse = Waiter;

export type GetProjectsConfigsWaitersError = DefaultErrors;

/** Gets information about a single waiter. */
export const getProjectsConfigsWaiters: API.OperationMethod<GetProjectsConfigsWaitersRequest, GetProjectsConfigsWaitersResponse, GetProjectsConfigsWaitersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsConfigsWaitersRequest,
  output: GetProjectsConfigsWaitersResponse,
  errors: [],
}));

