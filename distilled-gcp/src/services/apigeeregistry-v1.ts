// ==========================================================================
// Apigee Registry API (apigeeregistry v1)
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
  name: "apigeeregistry",
  version: "v1",
  rootUrl: "https://apigeeregistry.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

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
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  error: Schema.optional(Status),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface Api {
  /** Annotations attach non-identifying metadata to resources. Annotation keys and values are less restricted than those of labels, but should be generally used for small values of broad interest. Larger, topic- specific metadata should be stored in Artifacts. */
  annotations?: Record<string, string>;
  /** Output only. Creation timestamp. */
  createTime?: string;
  /** Resource name. */
  name?: string;
  /** Human-meaningful name. */
  displayName?: string;
  /** The recommended deployment of the API. Format: `projects/{project}/locations/{location}/apis/{api}/deployments/{deployment}` */
  recommendedDeployment?: string;
  /** A user-definable description of the availability of this service. Format: free-form, but we expect single words that describe availability, e.g., "NONE", "TESTING", "PREVIEW", "GENERAL", "DEPRECATED", "SHUTDOWN". */
  availability?: string;
  /** Labels attach identifying metadata to resources. Identifying metadata can be used to filter list operations. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores, and dashes. International characters are allowed. No more than 64 user labels can be associated with one resource (System labels are excluded). See https://goo.gl/xmQnxf for more information and examples of labels. System reserved label keys are prefixed with `apigeeregistry.googleapis.com/` and cannot be changed. */
  labels?: Record<string, string>;
  /** A detailed description. */
  description?: string;
  /** Output only. Last update timestamp. */
  updateTime?: string;
  /** The recommended version of the API. Format: `projects/{project}/locations/{location}/apis/{api}/versions/{version}` */
  recommendedVersion?: string;
}

export const Api: Schema.Schema<Api> = Schema.suspend(() => Schema.Struct({
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  recommendedDeployment: Schema.optional(Schema.String),
  availability: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  recommendedVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "Api" }) as any as Schema.Schema<Api>;

export interface ListApisResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The APIs from the specified publisher. */
  apis?: Array<Api>;
}

export const ListApisResponse: Schema.Schema<ListApisResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  apis: Schema.optional(Schema.Array(Api)),
})).annotate({ identifier: "ListApisResponse" }) as any as Schema.Schema<ListApisResponse>;

export interface Config {
  /** Output only. The GCP location where the Instance resides. */
  location?: string;
  /** Required. The Customer Managed Encryption Key (CMEK) used for data encryption. The CMEK name should follow the format of `projects/([^/]+)/locations/([^/]+)/keyRings/([^/]+)/cryptoKeys/([^/]+)`, where the `location` must match InstanceConfig.location. */
  cmekKeyName?: string;
}

export const Config: Schema.Schema<Config> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  cmekKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "Config" }) as any as Schema.Schema<Config>;

export interface HttpBody {
  /** The HTTP request/response body as raw binary. */
  data?: string;
  /** Application specific response metadata. Must be set in the first response for streaming APIs. */
  extensions?: Array<Record<string, unknown>>;
  /** The HTTP Content-Type header value specifying the content type of the body. */
  contentType?: string;
}

export const HttpBody: Schema.Schema<HttpBody> = Schema.suspend(() => Schema.Struct({
  data: Schema.optional(Schema.String),
  extensions: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  contentType: Schema.optional(Schema.String),
})).annotate({ identifier: "HttpBody" }) as any as Schema.Schema<HttpBody>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface Expr {
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. */
  role?: string;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. */
  members?: Array<string>;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  condition: Schema.optional(Expr),
  members: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  bindings: Schema.optional(Schema.Array(Binding)),
  version: Schema.optional(Schema.Number),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface Build {
  /** Output only. Path of the open source repository: github.com/apigee/registry. */
  repo?: string;
  /** Output only. Commit ID of the latest commit in the build. */
  commitId?: string;
  /** Output only. Commit time of the latest commit in the build. */
  commitTime?: string;
}

export const Build: Schema.Schema<Build> = Schema.suspend(() => Schema.Struct({
  repo: Schema.optional(Schema.String),
  commitId: Schema.optional(Schema.String),
  commitTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Build" }) as any as Schema.Schema<Build>;

export interface ApiVersion {
  /** Labels attach identifying metadata to resources. Identifying metadata can be used to filter list operations. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. No more than 64 user labels can be associated with one resource (System labels are excluded). See https://goo.gl/xmQnxf for more information and examples of labels. System reserved label keys are prefixed with `apigeeregistry.googleapis.com/` and cannot be changed. */
  labels?: Record<string, string>;
  /** Output only. Creation timestamp. */
  createTime?: string;
  /** Human-meaningful name. */
  displayName?: string;
  /** Output only. Last update timestamp. */
  updateTime?: string;
  /** Annotations attach non-identifying metadata to resources. Annotation keys and values are less restricted than those of labels, but should be generally used for small values of broad interest. Larger, topic- specific metadata should be stored in Artifacts. */
  annotations?: Record<string, string>;
  /** A user-definable description of the lifecycle phase of this API version. Format: free-form, but we expect single words that describe API maturity, e.g., "CONCEPT", "DESIGN", "DEVELOPMENT", "STAGING", "PRODUCTION", "DEPRECATED", "RETIRED". */
  state?: string;
  /** Resource name. */
  name?: string;
  /** A detailed description. */
  description?: string;
  /** The primary spec for this version. Format: projects/{project}/locations/{location}/apis/{api}/versions/{version}/specs/{spec} */
  primarySpec?: string;
}

export const ApiVersion: Schema.Schema<ApiVersion> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  primarySpec: Schema.optional(Schema.String),
})).annotate({ identifier: "ApiVersion" }) as any as Schema.Schema<ApiVersion>;

export interface ListApiVersionsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The versions from the specified publisher. */
  apiVersions?: Array<ApiVersion>;
}

export const ListApiVersionsResponse: Schema.Schema<ListApiVersionsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  apiVersions: Schema.optional(Schema.Array(ApiVersion)),
})).annotate({ identifier: "ListApiVersionsResponse" }) as any as Schema.Schema<ListApiVersionsResponse>;

export interface RollbackApiSpecRequest {
  /** Required. The revision ID to roll back to. It must be a revision of the same spec. Example: `c7cfa2a8` */
  revisionId?: string;
}

export const RollbackApiSpecRequest: Schema.Schema<RollbackApiSpecRequest> = Schema.suspend(() => Schema.Struct({
  revisionId: Schema.optional(Schema.String),
})).annotate({ identifier: "RollbackApiSpecRequest" }) as any as Schema.Schema<RollbackApiSpecRequest>;

export interface Location {
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  locationId: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.optional(Schema.String),
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

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TagApiSpecRevisionRequest {
  /** Required. The tag to apply. The tag should be at most 40 characters, and match `a-z{3,39}`. */
  tag?: string;
}

export const TagApiSpecRevisionRequest: Schema.Schema<TagApiSpecRevisionRequest> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "TagApiSpecRevisionRequest" }) as any as Schema.Schema<TagApiSpecRevisionRequest>;

export interface Artifact {
  /** Input only. The contents of the artifact. Provided by API callers when artifacts are created or replaced. To access the contents of an artifact, use GetArtifactContents. */
  contents?: string;
  /** A content type specifier for the artifact. Content type specifiers are Media Types (https://en.wikipedia.org/wiki/Media_type) with a possible "schema" parameter that specifies a schema for the stored information. Content types can specify compression. Currently only GZip compression is supported (indicated with "+gzip"). */
  mimeType?: string;
  /** Output only. A SHA-256 hash of the artifact's contents. If the artifact is gzipped, this is the hash of the uncompressed artifact. */
  hash?: string;
  /** Labels attach identifying metadata to resources. Identifying metadata can be used to filter list operations. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. No more than 64 user labels can be associated with one resource (System labels are excluded). See https://goo.gl/xmQnxf for more information and examples of labels. System reserved label keys are prefixed with "registry.googleapis.com/" and cannot be changed. */
  labels?: Record<string, string>;
  /** Annotations attach non-identifying metadata to resources. Annotation keys and values are less restricted than those of labels, but should be generally used for small values of broad interest. Larger, topic- specific metadata should be stored in Artifacts. */
  annotations?: Record<string, string>;
  /** Output only. Creation timestamp. */
  createTime?: string;
  /** Resource name. */
  name?: string;
  /** Output only. Last update timestamp. */
  updateTime?: string;
  /** Output only. The size of the artifact in bytes. If the artifact is gzipped, this is the size of the uncompressed artifact. */
  sizeBytes?: number;
}

export const Artifact: Schema.Schema<Artifact> = Schema.suspend(() => Schema.Struct({
  contents: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  hash: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  sizeBytes: Schema.optional(Schema.Number),
})).annotate({ identifier: "Artifact" }) as any as Schema.Schema<Artifact>;

export interface TagApiDeploymentRevisionRequest {
  /** Required. The tag to apply. The tag should be at most 40 characters, and match `a-z{3,39}`. */
  tag?: string;
}

export const TagApiDeploymentRevisionRequest: Schema.Schema<TagApiDeploymentRevisionRequest> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "TagApiDeploymentRevisionRequest" }) as any as Schema.Schema<TagApiDeploymentRevisionRequest>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface RollbackApiDeploymentRequest {
  /** Required. The revision ID to roll back to. It must be a revision of the same deployment. Example: `c7cfa2a8` */
  revisionId?: string;
}

export const RollbackApiDeploymentRequest: Schema.Schema<RollbackApiDeploymentRequest> = Schema.suspend(() => Schema.Struct({
  revisionId: Schema.optional(Schema.String),
})).annotate({ identifier: "RollbackApiDeploymentRequest" }) as any as Schema.Schema<RollbackApiDeploymentRequest>;

export interface ApiDeployment {
  /** Annotations attach non-identifying metadata to resources. Annotation keys and values are less restricted than those of labels, but should be generally used for small values of broad interest. Larger, topic- specific metadata should be stored in Artifacts. */
  annotations?: Record<string, string>;
  /** Resource name. */
  name?: string;
  /** Output only. Creation timestamp; when the deployment resource was created. */
  createTime?: string;
  /** Output only. Immutable. The revision ID of the deployment. A new revision is committed whenever the deployment contents are changed. The format is an 8-character hexadecimal string. */
  revisionId?: string;
  /** Output only. Revision creation timestamp; when the represented revision was created. */
  revisionCreateTime?: string;
  /** The full resource name (including revision ID) of the spec of the API being served by the deployment. Changes to this value will update the revision. Format: `projects/{project}/locations/{location}/apis/{api}/versions/{version}/specs/{spec@revision}` */
  apiSpecRevision?: string;
  /** Output only. Last update timestamp: when the represented revision was last modified. */
  revisionUpdateTime?: string;
  /** Labels attach identifying metadata to resources. Identifying metadata can be used to filter list operations. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. No more than 64 user labels can be associated with one resource (System labels are excluded). See https://goo.gl/xmQnxf for more information and examples of labels. System reserved label keys are prefixed with `apigeeregistry.googleapis.com/` and cannot be changed. */
  labels?: Record<string, string>;
  /** Text briefly identifying the intended audience of the API. Changes to this value will not affect the revision. */
  intendedAudience?: string;
  /** The address where the deployment is serving. Changes to this value will update the revision. */
  endpointUri?: string;
  /** The address of the external channel of the API (e.g., the Developer Portal). Changes to this value will not affect the revision. */
  externalChannelUri?: string;
  /** A detailed description. */
  description?: string;
  /** Text briefly describing how to access the endpoint. Changes to this value will not affect the revision. */
  accessGuidance?: string;
  /** Human-meaningful name. */
  displayName?: string;
}

export const ApiDeployment: Schema.Schema<ApiDeployment> = Schema.suspend(() => Schema.Struct({
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  revisionCreateTime: Schema.optional(Schema.String),
  apiSpecRevision: Schema.optional(Schema.String),
  revisionUpdateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  intendedAudience: Schema.optional(Schema.String),
  endpointUri: Schema.optional(Schema.String),
  externalChannelUri: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  accessGuidance: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "ApiDeployment" }) as any as Schema.Schema<ApiDeployment>;

export interface ListApiDeploymentRevisionsResponse {
  /** The revisions of the deployment. */
  apiDeployments?: Array<ApiDeployment>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListApiDeploymentRevisionsResponse: Schema.Schema<ListApiDeploymentRevisionsResponse> = Schema.suspend(() => Schema.Struct({
  apiDeployments: Schema.optional(Schema.Array(ApiDeployment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListApiDeploymentRevisionsResponse" }) as any as Schema.Schema<ListApiDeploymentRevisionsResponse>;

export interface ApiSpec {
  /** Output only. Last update timestamp: when the represented revision was last modified. */
  revisionUpdateTime?: string;
  /** A detailed description. */
  description?: string;
  /** Output only. The size of the spec file in bytes. If the spec is gzipped, this is the size of the uncompressed spec. */
  sizeBytes?: number;
  /** Output only. A SHA-256 hash of the spec's contents. If the spec is gzipped, this is the hash of the uncompressed spec. */
  hash?: string;
  /** Labels attach identifying metadata to resources. Identifying metadata can be used to filter list operations. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. No more than 64 user labels can be associated with one resource (System labels are excluded). See https://goo.gl/xmQnxf for more information and examples of labels. System reserved label keys are prefixed with `apigeeregistry.googleapis.com/` and cannot be changed. */
  labels?: Record<string, string>;
  /** Annotations attach non-identifying metadata to resources. Annotation keys and values are less restricted than those of labels, but should be generally used for small values of broad interest. Larger, topic- specific metadata should be stored in Artifacts. */
  annotations?: Record<string, string>;
  /** Output only. Revision creation timestamp; when the represented revision was created. */
  revisionCreateTime?: string;
  /** The original source URI of the spec (if one exists). This is an external location that can be used for reference purposes but which may not be authoritative since this external resource may change after the spec is retrieved. */
  sourceUri?: string;
  /** A possibly-hierarchical name used to refer to the spec from other specs. */
  filename?: string;
  /** Output only. Immutable. The revision ID of the spec. A new revision is committed whenever the spec contents are changed. The format is an 8-character hexadecimal string. */
  revisionId?: string;
  /** Output only. Creation timestamp; when the spec resource was created. */
  createTime?: string;
  /** Input only. The contents of the spec. Provided by API callers when specs are created or updated. To access the contents of a spec, use GetApiSpecContents. */
  contents?: string;
  /** A style (format) descriptor for this spec that is specified as a [Media Type](https://en.wikipedia.org/wiki/Media_type). Possible values include `application/vnd.apigee.proto`, `application/vnd.apigee.openapi`, and `application/vnd.apigee.graphql`, with possible suffixes representing compression types. These hypothetical names are defined in the vendor tree defined in RFC6838 (https://tools.ietf.org/html/rfc6838) and are not final. Content types can specify compression. Currently only GZip compression is supported (indicated with "+gzip"). */
  mimeType?: string;
  /** Resource name. */
  name?: string;
}

export const ApiSpec: Schema.Schema<ApiSpec> = Schema.suspend(() => Schema.Struct({
  revisionUpdateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  sizeBytes: Schema.optional(Schema.Number),
  hash: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  revisionCreateTime: Schema.optional(Schema.String),
  sourceUri: Schema.optional(Schema.String),
  filename: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  contents: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ApiSpec" }) as any as Schema.Schema<ApiSpec>;

export interface ListApiSpecsResponse {
  /** The specs from the specified publisher. */
  apiSpecs?: Array<ApiSpec>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListApiSpecsResponse: Schema.Schema<ListApiSpecsResponse> = Schema.suspend(() => Schema.Struct({
  apiSpecs: Schema.optional(Schema.Array(ApiSpec)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListApiSpecsResponse" }) as any as Schema.Schema<ListApiSpecsResponse>;

export interface ListApiSpecRevisionsResponse {
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The revisions of the spec. */
  apiSpecs?: Array<ApiSpec>;
}

export const ListApiSpecRevisionsResponse: Schema.Schema<ListApiSpecRevisionsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  apiSpecs: Schema.optional(Schema.Array(ApiSpec)),
})).annotate({ identifier: "ListApiSpecRevisionsResponse" }) as any as Schema.Schema<ListApiSpecRevisionsResponse>;

export interface Instance {
  /** Format: `projects/* /locations/* /instance`. Currently only `locations/global` is supported. */
  name?: string;
  /** Required. Config of the Instance. */
  config?: Config;
  /** Output only. Last update timestamp. */
  updateTime?: string;
  /** Output only. Extra information of Instance.State if the state is `FAILED`. */
  stateMessage?: string;
  /** Output only. Creation timestamp. */
  createTime?: string;
  /** Output only. Build info of the Instance if it's in `ACTIVE` state. */
  build?: Build;
  /** Output only. The current state of the Instance. */
  state?: "STATE_UNSPECIFIED" | "INACTIVE" | "CREATING" | "ACTIVE" | "UPDATING" | "DELETING" | "FAILED" | (string & {});
}

export const Instance: Schema.Schema<Instance> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  config: Schema.optional(Config),
  updateTime: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  build: Schema.optional(Build),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "Instance" }) as any as Schema.Schema<Instance>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ListApiDeploymentsResponse {
  /** The deployments from the specified publisher. */
  apiDeployments?: Array<ApiDeployment>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListApiDeploymentsResponse: Schema.Schema<ListApiDeploymentsResponse> = Schema.suspend(() => Schema.Struct({
  apiDeployments: Schema.optional(Schema.Array(ApiDeployment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListApiDeploymentsResponse" }) as any as Schema.Schema<ListApiDeploymentsResponse>;

export interface ListArtifactsResponse {
  /** The artifacts from the specified publisher. */
  artifacts?: Array<Artifact>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListArtifactsResponse: Schema.Schema<ListArtifactsResponse> = Schema.suspend(() => Schema.Struct({
  artifacts: Schema.optional(Schema.Array(Artifact)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListArtifactsResponse" }) as any as Schema.Schema<ListArtifactsResponse>;

export interface OperationMetadata {
  /** The time the operation finished running. */
  endTime?: string;
  /** The time the operation was created. */
  createTime?: string;
  /** API version used to start the operation. */
  apiVersion?: string;
  /** Server-defined resource path for the target of the operation. */
  target?: string;
  /** Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  cancellationRequested?: boolean;
  /** Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Name of the verb executed by the operation. */
  verb?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  cancellationRequested: Schema.optional(Schema.Boolean),
  statusMessage: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListProjectsLocationsRequest {
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** The resource that owns the locations collection, if applicable. */
  name: string;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

/** Lists information about the supported locations for this service. */
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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}" }),
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

export interface GetIamPolicyProjectsLocationsInstancesRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsInstancesRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsInstancesRequest>;

export type GetIamPolicyProjectsLocationsInstancesResponse = Policy;
export const GetIamPolicyProjectsLocationsInstancesResponse = Policy;

export type GetIamPolicyProjectsLocationsInstancesError = CommonErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsInstances: API.OperationMethod<GetIamPolicyProjectsLocationsInstancesRequest, GetIamPolicyProjectsLocationsInstancesResponse, GetIamPolicyProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsInstancesRequest,
  output: GetIamPolicyProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsInstancesRequest {
  /** Required. The name of the Instance to delete. Format: `projects/* /locations/* /instances/*`. */
  name: string;
}

export const DeleteProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsInstancesRequest>;

export type DeleteProjectsLocationsInstancesResponse = Operation;
export const DeleteProjectsLocationsInstancesResponse = Operation;

export type DeleteProjectsLocationsInstancesError = CommonErrors;

/** Deletes the Registry instance. */
export const deleteProjectsLocationsInstances: API.OperationMethod<DeleteProjectsLocationsInstancesRequest, DeleteProjectsLocationsInstancesResponse, DeleteProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsInstancesRequest,
  output: DeleteProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface GetProjectsLocationsInstancesRequest {
  /** Required. The name of the Instance to retrieve. Format: `projects/* /locations/* /instances/*`. */
  name: string;
}

export const GetProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInstancesRequest>;

export type GetProjectsLocationsInstancesResponse = Instance;
export const GetProjectsLocationsInstancesResponse = Instance;

export type GetProjectsLocationsInstancesError = CommonErrors;

/** Gets details of a single Instance. */
export const getProjectsLocationsInstances: API.OperationMethod<GetProjectsLocationsInstancesRequest, GetProjectsLocationsInstancesResponse, GetProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInstancesRequest,
  output: GetProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsInstancesRequest {
  /** Required. Parent resource of the Instance, of the form: `projects/* /locations/*` */
  parent: string;
  /** Required. Identifier to assign to the Instance. Must be unique within scope of the parent resource. */
  instanceId?: string;
  /** Request body */
  body?: Instance;
}

export const CreateProjectsLocationsInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  instanceId: Schema.optional(Schema.String).pipe(T.HttpQuery("instanceId")),
  body: Schema.optional(Instance).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsInstancesRequest>;

export type CreateProjectsLocationsInstancesResponse = Operation;
export const CreateProjectsLocationsInstancesResponse = Operation;

export type CreateProjectsLocationsInstancesError = CommonErrors;

/** Provisions instance resources for the Registry. */
export const createProjectsLocationsInstances: API.OperationMethod<CreateProjectsLocationsInstancesRequest, CreateProjectsLocationsInstancesResponse, CreateProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsInstancesRequest,
  output: CreateProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsInstancesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsInstancesRequest>;

export type TestIamPermissionsProjectsLocationsInstancesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsInstancesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsInstancesError = CommonErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsInstances: API.OperationMethod<TestIamPermissionsProjectsLocationsInstancesRequest, TestIamPermissionsProjectsLocationsInstancesResponse, TestIamPermissionsProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsInstancesRequest,
  output: TestIamPermissionsProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsInstancesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsInstancesRequest>;

export type SetIamPolicyProjectsLocationsInstancesResponse = Policy;
export const SetIamPolicyProjectsLocationsInstancesResponse = Policy;

export type SetIamPolicyProjectsLocationsInstancesError = CommonErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsInstances: API.OperationMethod<SetIamPolicyProjectsLocationsInstancesRequest, SetIamPolicyProjectsLocationsInstancesResponse, SetIamPolicyProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsInstancesRequest,
  output: SetIamPolicyProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsRuntimeRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsRuntimeRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/runtime:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsRuntimeRequest>;

export type GetIamPolicyProjectsLocationsRuntimeResponse = Policy;
export const GetIamPolicyProjectsLocationsRuntimeResponse = Policy;

export type GetIamPolicyProjectsLocationsRuntimeError = CommonErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsRuntime: API.OperationMethod<GetIamPolicyProjectsLocationsRuntimeRequest, GetIamPolicyProjectsLocationsRuntimeResponse, GetIamPolicyProjectsLocationsRuntimeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsRuntimeRequest,
  output: GetIamPolicyProjectsLocationsRuntimeResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsRuntimeRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsRuntimeRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/runtime:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsRuntimeRequest>;

export type SetIamPolicyProjectsLocationsRuntimeResponse = Policy;
export const SetIamPolicyProjectsLocationsRuntimeResponse = Policy;

export type SetIamPolicyProjectsLocationsRuntimeError = CommonErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsRuntime: API.OperationMethod<SetIamPolicyProjectsLocationsRuntimeRequest, SetIamPolicyProjectsLocationsRuntimeResponse, SetIamPolicyProjectsLocationsRuntimeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsRuntimeRequest,
  output: SetIamPolicyProjectsLocationsRuntimeResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsRuntimeRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsRuntimeRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/runtime:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsRuntimeRequest>;

export type TestIamPermissionsProjectsLocationsRuntimeResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsRuntimeResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsRuntimeError = CommonErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsRuntime: API.OperationMethod<TestIamPermissionsProjectsLocationsRuntimeRequest, TestIamPermissionsProjectsLocationsRuntimeResponse, TestIamPermissionsProjectsLocationsRuntimeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsRuntimeRequest,
  output: TestIamPermissionsProjectsLocationsRuntimeResponse,
  errors: [],
}));

export interface GetContentsProjectsLocationsArtifactsRequest {
  /** Required. The name of the artifact whose contents should be retrieved. Format: `{parent}/artifacts/*` */
  name: string;
}

export const GetContentsProjectsLocationsArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/artifacts/{artifactsId}:getContents" }),
  svc,
) as unknown as Schema.Schema<GetContentsProjectsLocationsArtifactsRequest>;

export type GetContentsProjectsLocationsArtifactsResponse = HttpBody;
export const GetContentsProjectsLocationsArtifactsResponse = HttpBody;

export type GetContentsProjectsLocationsArtifactsError = CommonErrors;

/** Returns the contents of a specified artifact. If artifacts are stored with GZip compression, the default behavior is to return the artifact uncompressed (the mime_type response field indicates the exact format returned). */
export const getContentsProjectsLocationsArtifacts: API.OperationMethod<GetContentsProjectsLocationsArtifactsRequest, GetContentsProjectsLocationsArtifactsResponse, GetContentsProjectsLocationsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetContentsProjectsLocationsArtifactsRequest,
  output: GetContentsProjectsLocationsArtifactsResponse,
  errors: [],
}));

export interface ReplaceArtifactProjectsLocationsArtifactsRequest {
  /** Resource name. */
  name: string;
  /** Request body */
  body?: Artifact;
}

export const ReplaceArtifactProjectsLocationsArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Artifact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/locations/{locationsId}/artifacts/{artifactsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplaceArtifactProjectsLocationsArtifactsRequest>;

export type ReplaceArtifactProjectsLocationsArtifactsResponse = Artifact;
export const ReplaceArtifactProjectsLocationsArtifactsResponse = Artifact;

export type ReplaceArtifactProjectsLocationsArtifactsError = CommonErrors;

/** Used to replace a specified artifact. */
export const replaceArtifactProjectsLocationsArtifacts: API.OperationMethod<ReplaceArtifactProjectsLocationsArtifactsRequest, ReplaceArtifactProjectsLocationsArtifactsResponse, ReplaceArtifactProjectsLocationsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplaceArtifactProjectsLocationsArtifactsRequest,
  output: ReplaceArtifactProjectsLocationsArtifactsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsArtifactsRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsArtifactsRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/artifacts/{artifactsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsArtifactsRequest>;

export type GetIamPolicyProjectsLocationsArtifactsResponse = Policy;
export const GetIamPolicyProjectsLocationsArtifactsResponse = Policy;

export type GetIamPolicyProjectsLocationsArtifactsError = CommonErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsArtifacts: API.OperationMethod<GetIamPolicyProjectsLocationsArtifactsRequest, GetIamPolicyProjectsLocationsArtifactsResponse, GetIamPolicyProjectsLocationsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsArtifactsRequest,
  output: GetIamPolicyProjectsLocationsArtifactsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsArtifactsRequest {
  /** Required. The name of the artifact to delete. Format: `{parent}/artifacts/*` */
  name: string;
}

export const DeleteProjectsLocationsArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/artifacts/{artifactsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsArtifactsRequest>;

export type DeleteProjectsLocationsArtifactsResponse = Empty;
export const DeleteProjectsLocationsArtifactsResponse = Empty;

export type DeleteProjectsLocationsArtifactsError = CommonErrors;

/** Removes a specified artifact. */
export const deleteProjectsLocationsArtifacts: API.OperationMethod<DeleteProjectsLocationsArtifactsRequest, DeleteProjectsLocationsArtifactsResponse, DeleteProjectsLocationsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsArtifactsRequest,
  output: DeleteProjectsLocationsArtifactsResponse,
  errors: [],
}));

export interface ListProjectsLocationsArtifactsRequest {
  /** An expression that can be used to filter the list. Filters use the Common Expression Language and can refer to all message fields except contents. */
  filter?: string;
  /** The maximum number of artifacts to return. The service may return fewer than this value. If unspecified, at most 50 values will be returned. The maximum is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. The parent, which owns this collection of artifacts. Format: `{parent}` */
  parent: string;
  /** A page token, received from a previous `ListArtifacts` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListArtifacts` must match the call that provided the page token. */
  pageToken?: string;
  /** A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in descending order using the "desc" identifier, e.g. "foo desc,bar" */
  orderBy?: string;
}

export const ListProjectsLocationsArtifactsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/artifacts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsArtifactsRequest>;

export type ListProjectsLocationsArtifactsResponse = ListArtifactsResponse;
export const ListProjectsLocationsArtifactsResponse = ListArtifactsResponse;

export type ListProjectsLocationsArtifactsError = CommonErrors;

/** Returns matching artifacts. */
export const listProjectsLocationsArtifacts: API.PaginatedOperationMethod<ListProjectsLocationsArtifactsRequest, ListProjectsLocationsArtifactsResponse, ListProjectsLocationsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsArtifactsRequest,
  output: ListProjectsLocationsArtifactsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsArtifactsRequest {
  /** Required. The name of the artifact to retrieve. Format: `{parent}/artifacts/*` */
  name: string;
}

export const GetProjectsLocationsArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/artifacts/{artifactsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsArtifactsRequest>;

export type GetProjectsLocationsArtifactsResponse = Artifact;
export const GetProjectsLocationsArtifactsResponse = Artifact;

export type GetProjectsLocationsArtifactsError = CommonErrors;

/** Returns a specified artifact. */
export const getProjectsLocationsArtifacts: API.OperationMethod<GetProjectsLocationsArtifactsRequest, GetProjectsLocationsArtifactsResponse, GetProjectsLocationsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsArtifactsRequest,
  output: GetProjectsLocationsArtifactsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsArtifactsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsArtifactsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/artifacts/{artifactsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsArtifactsRequest>;

export type TestIamPermissionsProjectsLocationsArtifactsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsArtifactsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsArtifactsError = CommonErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsArtifacts: API.OperationMethod<TestIamPermissionsProjectsLocationsArtifactsRequest, TestIamPermissionsProjectsLocationsArtifactsResponse, TestIamPermissionsProjectsLocationsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsArtifactsRequest,
  output: TestIamPermissionsProjectsLocationsArtifactsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsArtifactsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsArtifactsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/artifacts/{artifactsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsArtifactsRequest>;

export type SetIamPolicyProjectsLocationsArtifactsResponse = Policy;
export const SetIamPolicyProjectsLocationsArtifactsResponse = Policy;

export type SetIamPolicyProjectsLocationsArtifactsError = CommonErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsArtifacts: API.OperationMethod<SetIamPolicyProjectsLocationsArtifactsRequest, SetIamPolicyProjectsLocationsArtifactsResponse, SetIamPolicyProjectsLocationsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsArtifactsRequest,
  output: SetIamPolicyProjectsLocationsArtifactsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsArtifactsRequest {
  /** Required. The ID to use for the artifact, which will become the final component of the artifact's resource name. This value should be 4-63 characters, and valid characters are /a-z-/. Following AIP-162, IDs must not have the form of a UUID. */
  artifactId?: string;
  /** Required. The parent, which owns this collection of artifacts. Format: `{parent}` */
  parent: string;
  /** Request body */
  body?: Artifact;
}

export const CreateProjectsLocationsArtifactsRequest = Schema.Struct({
  artifactId: Schema.optional(Schema.String).pipe(T.HttpQuery("artifactId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Artifact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/artifacts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsArtifactsRequest>;

export type CreateProjectsLocationsArtifactsResponse = Artifact;
export const CreateProjectsLocationsArtifactsResponse = Artifact;

export type CreateProjectsLocationsArtifactsError = CommonErrors;

/** Creates a specified artifact. */
export const createProjectsLocationsArtifacts: API.OperationMethod<CreateProjectsLocationsArtifactsRequest, CreateProjectsLocationsArtifactsResponse, CreateProjectsLocationsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsArtifactsRequest,
  output: CreateProjectsLocationsArtifactsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsApisRequest {
  /** The list of fields to be updated. If omitted, all fields are updated that are set in the request message (fields set to default values are ignored). If an asterisk "*" is specified, all fields are updated, including fields that are unspecified/default in the request. */
  updateMask?: string;
  /** Resource name. */
  name: string;
  /** If set to true, and the API is not found, a new API will be created. In this situation, `update_mask` is ignored. */
  allowMissing?: boolean;
  /** Request body */
  body?: Api;
}

export const PatchProjectsLocationsApisRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  body: Schema.optional(Api).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsApisRequest>;

export type PatchProjectsLocationsApisResponse = Api;
export const PatchProjectsLocationsApisResponse = Api;

export type PatchProjectsLocationsApisError = CommonErrors;

/** Used to modify a specified API. */
export const patchProjectsLocationsApis: API.OperationMethod<PatchProjectsLocationsApisRequest, PatchProjectsLocationsApisResponse, PatchProjectsLocationsApisError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsApisRequest,
  output: PatchProjectsLocationsApisResponse,
  errors: [],
}));

export interface ListProjectsLocationsApisRequest {
  /** A page token, received from a previous `ListApis` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListApis` must match the call that provided the page token. */
  pageToken?: string;
  /** An expression that can be used to filter the list. Filters use the Common Expression Language and can refer to all message fields. */
  filter?: string;
  /** Required. The parent, which owns this collection of APIs. Format: `projects/* /locations/*` */
  parent: string;
  /** A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in descending order using the "desc" identifier, e.g. "foo desc,bar" */
  orderBy?: string;
  /** The maximum number of APIs to return. The service may return fewer than this value. If unspecified, at most 50 values will be returned. The maximum is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsLocationsApisRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsApisRequest>;

export type ListProjectsLocationsApisResponse = ListApisResponse;
export const ListProjectsLocationsApisResponse = ListApisResponse;

export type ListProjectsLocationsApisError = CommonErrors;

/** Returns matching APIs. */
export const listProjectsLocationsApis: API.PaginatedOperationMethod<ListProjectsLocationsApisRequest, ListProjectsLocationsApisResponse, ListProjectsLocationsApisError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsApisRequest,
  output: ListProjectsLocationsApisResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsApisRequest {
  /** Required. The name of the API to retrieve. Format: `projects/* /locations/* /apis/*` */
  name: string;
}

export const GetProjectsLocationsApisRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsApisRequest>;

export type GetProjectsLocationsApisResponse = Api;
export const GetProjectsLocationsApisResponse = Api;

export type GetProjectsLocationsApisError = CommonErrors;

/** Returns a specified API. */
export const getProjectsLocationsApis: API.OperationMethod<GetProjectsLocationsApisRequest, GetProjectsLocationsApisResponse, GetProjectsLocationsApisError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsApisRequest,
  output: GetProjectsLocationsApisResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsApisRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsApisRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsApisRequest>;

export type GetIamPolicyProjectsLocationsApisResponse = Policy;
export const GetIamPolicyProjectsLocationsApisResponse = Policy;

export type GetIamPolicyProjectsLocationsApisError = CommonErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsApis: API.OperationMethod<GetIamPolicyProjectsLocationsApisRequest, GetIamPolicyProjectsLocationsApisResponse, GetIamPolicyProjectsLocationsApisError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsApisRequest,
  output: GetIamPolicyProjectsLocationsApisResponse,
  errors: [],
}));

export interface CreateProjectsLocationsApisRequest {
  /** Required. The ID to use for the API, which will become the final component of the API's resource name. This value should be 4-63 characters, and valid characters are /a-z-/. Following AIP-162, IDs must not have the form of a UUID. */
  apiId?: string;
  /** Required. The parent, which owns this collection of APIs. Format: `projects/* /locations/*` */
  parent: string;
  /** Request body */
  body?: Api;
}

export const CreateProjectsLocationsApisRequest = Schema.Struct({
  apiId: Schema.optional(Schema.String).pipe(T.HttpQuery("apiId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Api).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsApisRequest>;

export type CreateProjectsLocationsApisResponse = Api;
export const CreateProjectsLocationsApisResponse = Api;

export type CreateProjectsLocationsApisError = CommonErrors;

/** Creates a specified API. */
export const createProjectsLocationsApis: API.OperationMethod<CreateProjectsLocationsApisRequest, CreateProjectsLocationsApisResponse, CreateProjectsLocationsApisError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsApisRequest,
  output: CreateProjectsLocationsApisResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsApisRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsApisRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsApisRequest>;

export type SetIamPolicyProjectsLocationsApisResponse = Policy;
export const SetIamPolicyProjectsLocationsApisResponse = Policy;

export type SetIamPolicyProjectsLocationsApisError = CommonErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsApis: API.OperationMethod<SetIamPolicyProjectsLocationsApisRequest, SetIamPolicyProjectsLocationsApisResponse, SetIamPolicyProjectsLocationsApisError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsApisRequest,
  output: SetIamPolicyProjectsLocationsApisResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsApisRequest {
  /** Required. The name of the API to delete. Format: `projects/* /locations/* /apis/*` */
  name: string;
  /** If set to true, any child resources will also be deleted. (Otherwise, the request will only work if there are no child resources.) */
  force?: boolean;
}

export const DeleteProjectsLocationsApisRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApisRequest>;

export type DeleteProjectsLocationsApisResponse = Empty;
export const DeleteProjectsLocationsApisResponse = Empty;

export type DeleteProjectsLocationsApisError = CommonErrors;

/** Removes a specified API and all of the resources that it owns. */
export const deleteProjectsLocationsApis: API.OperationMethod<DeleteProjectsLocationsApisRequest, DeleteProjectsLocationsApisResponse, DeleteProjectsLocationsApisError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApisRequest,
  output: DeleteProjectsLocationsApisResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsApisRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsApisRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsApisRequest>;

export type TestIamPermissionsProjectsLocationsApisResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsApisResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsApisError = CommonErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsApis: API.OperationMethod<TestIamPermissionsProjectsLocationsApisRequest, TestIamPermissionsProjectsLocationsApisResponse, TestIamPermissionsProjectsLocationsApisError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsApisRequest,
  output: TestIamPermissionsProjectsLocationsApisResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsApisVersionsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsApisVersionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsApisVersionsRequest>;

export type TestIamPermissionsProjectsLocationsApisVersionsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsApisVersionsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsApisVersionsError = CommonErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsApisVersions: API.OperationMethod<TestIamPermissionsProjectsLocationsApisVersionsRequest, TestIamPermissionsProjectsLocationsApisVersionsResponse, TestIamPermissionsProjectsLocationsApisVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsApisVersionsRequest,
  output: TestIamPermissionsProjectsLocationsApisVersionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsApisVersionsRequest {
  /** Required. The name of the version to delete. Format: `projects/* /locations/* /apis/* /versions/*` */
  name: string;
  /** If set to true, any child resources will also be deleted. (Otherwise, the request will only work if there are no child resources.) */
  force?: boolean;
}

export const DeleteProjectsLocationsApisVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApisVersionsRequest>;

export type DeleteProjectsLocationsApisVersionsResponse = Empty;
export const DeleteProjectsLocationsApisVersionsResponse = Empty;

export type DeleteProjectsLocationsApisVersionsError = CommonErrors;

/** Removes a specified version and all of the resources that it owns. */
export const deleteProjectsLocationsApisVersions: API.OperationMethod<DeleteProjectsLocationsApisVersionsRequest, DeleteProjectsLocationsApisVersionsResponse, DeleteProjectsLocationsApisVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApisVersionsRequest,
  output: DeleteProjectsLocationsApisVersionsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsApisVersionsRequest {
  /** Resource name. */
  name: string;
  /** The list of fields to be updated. If omitted, all fields are updated that are set in the request message (fields set to default values are ignored). If an asterisk "*" is specified, all fields are updated, including fields that are unspecified/default in the request. */
  updateMask?: string;
  /** If set to true, and the version is not found, a new version will be created. In this situation, `update_mask` is ignored. */
  allowMissing?: boolean;
  /** Request body */
  body?: ApiVersion;
}

export const PatchProjectsLocationsApisVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  body: Schema.optional(ApiVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsApisVersionsRequest>;

export type PatchProjectsLocationsApisVersionsResponse = ApiVersion;
export const PatchProjectsLocationsApisVersionsResponse = ApiVersion;

export type PatchProjectsLocationsApisVersionsError = CommonErrors;

/** Used to modify a specified version. */
export const patchProjectsLocationsApisVersions: API.OperationMethod<PatchProjectsLocationsApisVersionsRequest, PatchProjectsLocationsApisVersionsResponse, PatchProjectsLocationsApisVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsApisVersionsRequest,
  output: PatchProjectsLocationsApisVersionsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsApisVersionsRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsApisVersionsRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsApisVersionsRequest>;

export type GetIamPolicyProjectsLocationsApisVersionsResponse = Policy;
export const GetIamPolicyProjectsLocationsApisVersionsResponse = Policy;

export type GetIamPolicyProjectsLocationsApisVersionsError = CommonErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsApisVersions: API.OperationMethod<GetIamPolicyProjectsLocationsApisVersionsRequest, GetIamPolicyProjectsLocationsApisVersionsResponse, GetIamPolicyProjectsLocationsApisVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsApisVersionsRequest,
  output: GetIamPolicyProjectsLocationsApisVersionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsApisVersionsRequest {
  /** Required. The parent, which owns this collection of versions. Format: `projects/* /locations/* /apis/*` */
  parent: string;
  /** Required. The ID to use for the version, which will become the final component of the version's resource name. This value should be 1-63 characters, and valid characters are /a-z-/. Following AIP-162, IDs must not have the form of a UUID. */
  apiVersionId?: string;
  /** Request body */
  body?: ApiVersion;
}

export const CreateProjectsLocationsApisVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  apiVersionId: Schema.optional(Schema.String).pipe(T.HttpQuery("apiVersionId")),
  body: Schema.optional(ApiVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsApisVersionsRequest>;

export type CreateProjectsLocationsApisVersionsResponse = ApiVersion;
export const CreateProjectsLocationsApisVersionsResponse = ApiVersion;

export type CreateProjectsLocationsApisVersionsError = CommonErrors;

/** Creates a specified version. */
export const createProjectsLocationsApisVersions: API.OperationMethod<CreateProjectsLocationsApisVersionsRequest, CreateProjectsLocationsApisVersionsResponse, CreateProjectsLocationsApisVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsApisVersionsRequest,
  output: CreateProjectsLocationsApisVersionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsApisVersionsRequest {
  /** Required. The name of the version to retrieve. Format: `projects/* /locations/* /apis/* /versions/*` */
  name: string;
}

export const GetProjectsLocationsApisVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsApisVersionsRequest>;

export type GetProjectsLocationsApisVersionsResponse = ApiVersion;
export const GetProjectsLocationsApisVersionsResponse = ApiVersion;

export type GetProjectsLocationsApisVersionsError = CommonErrors;

/** Returns a specified version. */
export const getProjectsLocationsApisVersions: API.OperationMethod<GetProjectsLocationsApisVersionsRequest, GetProjectsLocationsApisVersionsResponse, GetProjectsLocationsApisVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsApisVersionsRequest,
  output: GetProjectsLocationsApisVersionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsApisVersionsRequest {
  /** A page token, received from a previous `ListApiVersions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListApiVersions` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The parent, which owns this collection of versions. Format: `projects/* /locations/* /apis/*` */
  parent: string;
  /** A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in descending order using the "desc" identifier, e.g. "foo desc,bar" */
  orderBy?: string;
  /** The maximum number of versions to return. The service may return fewer than this value. If unspecified, at most 50 values will be returned. The maximum is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** An expression that can be used to filter the list. Filters use the Common Expression Language and can refer to all message fields. */
  filter?: string;
}

export const ListProjectsLocationsApisVersionsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsApisVersionsRequest>;

export type ListProjectsLocationsApisVersionsResponse = ListApiVersionsResponse;
export const ListProjectsLocationsApisVersionsResponse = ListApiVersionsResponse;

export type ListProjectsLocationsApisVersionsError = CommonErrors;

/** Returns matching versions. */
export const listProjectsLocationsApisVersions: API.PaginatedOperationMethod<ListProjectsLocationsApisVersionsRequest, ListProjectsLocationsApisVersionsResponse, ListProjectsLocationsApisVersionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsApisVersionsRequest,
  output: ListProjectsLocationsApisVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SetIamPolicyProjectsLocationsApisVersionsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsApisVersionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsApisVersionsRequest>;

export type SetIamPolicyProjectsLocationsApisVersionsResponse = Policy;
export const SetIamPolicyProjectsLocationsApisVersionsResponse = Policy;

export type SetIamPolicyProjectsLocationsApisVersionsError = CommonErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsApisVersions: API.OperationMethod<SetIamPolicyProjectsLocationsApisVersionsRequest, SetIamPolicyProjectsLocationsApisVersionsResponse, SetIamPolicyProjectsLocationsApisVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsApisVersionsRequest,
  output: SetIamPolicyProjectsLocationsApisVersionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsApisVersionsArtifactsRequest {
  /** An expression that can be used to filter the list. Filters use the Common Expression Language and can refer to all message fields except contents. */
  filter?: string;
  /** The maximum number of artifacts to return. The service may return fewer than this value. If unspecified, at most 50 values will be returned. The maximum is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in descending order using the "desc" identifier, e.g. "foo desc,bar" */
  orderBy?: string;
  /** A page token, received from a previous `ListArtifacts` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListArtifacts` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The parent, which owns this collection of artifacts. Format: `{parent}` */
  parent: string;
}

export const ListProjectsLocationsApisVersionsArtifactsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/artifacts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsApisVersionsArtifactsRequest>;

export type ListProjectsLocationsApisVersionsArtifactsResponse = ListArtifactsResponse;
export const ListProjectsLocationsApisVersionsArtifactsResponse = ListArtifactsResponse;

export type ListProjectsLocationsApisVersionsArtifactsError = CommonErrors;

/** Returns matching artifacts. */
export const listProjectsLocationsApisVersionsArtifacts: API.PaginatedOperationMethod<ListProjectsLocationsApisVersionsArtifactsRequest, ListProjectsLocationsApisVersionsArtifactsResponse, ListProjectsLocationsApisVersionsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsApisVersionsArtifactsRequest,
  output: ListProjectsLocationsApisVersionsArtifactsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsApisVersionsArtifactsRequest {
  /** Required. The parent, which owns this collection of artifacts. Format: `{parent}` */
  parent: string;
  /** Required. The ID to use for the artifact, which will become the final component of the artifact's resource name. This value should be 4-63 characters, and valid characters are /a-z-/. Following AIP-162, IDs must not have the form of a UUID. */
  artifactId?: string;
  /** Request body */
  body?: Artifact;
}

export const CreateProjectsLocationsApisVersionsArtifactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  artifactId: Schema.optional(Schema.String).pipe(T.HttpQuery("artifactId")),
  body: Schema.optional(Artifact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/artifacts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsApisVersionsArtifactsRequest>;

export type CreateProjectsLocationsApisVersionsArtifactsResponse = Artifact;
export const CreateProjectsLocationsApisVersionsArtifactsResponse = Artifact;

export type CreateProjectsLocationsApisVersionsArtifactsError = CommonErrors;

/** Creates a specified artifact. */
export const createProjectsLocationsApisVersionsArtifacts: API.OperationMethod<CreateProjectsLocationsApisVersionsArtifactsRequest, CreateProjectsLocationsApisVersionsArtifactsResponse, CreateProjectsLocationsApisVersionsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsApisVersionsArtifactsRequest,
  output: CreateProjectsLocationsApisVersionsArtifactsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsApisVersionsArtifactsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsApisVersionsArtifactsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/artifacts/{artifactsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsApisVersionsArtifactsRequest>;

export type TestIamPermissionsProjectsLocationsApisVersionsArtifactsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsApisVersionsArtifactsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsApisVersionsArtifactsError = CommonErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsApisVersionsArtifacts: API.OperationMethod<TestIamPermissionsProjectsLocationsApisVersionsArtifactsRequest, TestIamPermissionsProjectsLocationsApisVersionsArtifactsResponse, TestIamPermissionsProjectsLocationsApisVersionsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsApisVersionsArtifactsRequest,
  output: TestIamPermissionsProjectsLocationsApisVersionsArtifactsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsApisVersionsArtifactsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsApisVersionsArtifactsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/artifacts/{artifactsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsApisVersionsArtifactsRequest>;

export type SetIamPolicyProjectsLocationsApisVersionsArtifactsResponse = Policy;
export const SetIamPolicyProjectsLocationsApisVersionsArtifactsResponse = Policy;

export type SetIamPolicyProjectsLocationsApisVersionsArtifactsError = CommonErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsApisVersionsArtifacts: API.OperationMethod<SetIamPolicyProjectsLocationsApisVersionsArtifactsRequest, SetIamPolicyProjectsLocationsApisVersionsArtifactsResponse, SetIamPolicyProjectsLocationsApisVersionsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsApisVersionsArtifactsRequest,
  output: SetIamPolicyProjectsLocationsApisVersionsArtifactsResponse,
  errors: [],
}));

export interface ReplaceArtifactProjectsLocationsApisVersionsArtifactsRequest {
  /** Resource name. */
  name: string;
  /** Request body */
  body?: Artifact;
}

export const ReplaceArtifactProjectsLocationsApisVersionsArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Artifact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/artifacts/{artifactsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplaceArtifactProjectsLocationsApisVersionsArtifactsRequest>;

export type ReplaceArtifactProjectsLocationsApisVersionsArtifactsResponse = Artifact;
export const ReplaceArtifactProjectsLocationsApisVersionsArtifactsResponse = Artifact;

export type ReplaceArtifactProjectsLocationsApisVersionsArtifactsError = CommonErrors;

/** Used to replace a specified artifact. */
export const replaceArtifactProjectsLocationsApisVersionsArtifacts: API.OperationMethod<ReplaceArtifactProjectsLocationsApisVersionsArtifactsRequest, ReplaceArtifactProjectsLocationsApisVersionsArtifactsResponse, ReplaceArtifactProjectsLocationsApisVersionsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplaceArtifactProjectsLocationsApisVersionsArtifactsRequest,
  output: ReplaceArtifactProjectsLocationsApisVersionsArtifactsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsApisVersionsArtifactsRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsApisVersionsArtifactsRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/artifacts/{artifactsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsApisVersionsArtifactsRequest>;

export type GetIamPolicyProjectsLocationsApisVersionsArtifactsResponse = Policy;
export const GetIamPolicyProjectsLocationsApisVersionsArtifactsResponse = Policy;

export type GetIamPolicyProjectsLocationsApisVersionsArtifactsError = CommonErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsApisVersionsArtifacts: API.OperationMethod<GetIamPolicyProjectsLocationsApisVersionsArtifactsRequest, GetIamPolicyProjectsLocationsApisVersionsArtifactsResponse, GetIamPolicyProjectsLocationsApisVersionsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsApisVersionsArtifactsRequest,
  output: GetIamPolicyProjectsLocationsApisVersionsArtifactsResponse,
  errors: [],
}));

export interface GetContentsProjectsLocationsApisVersionsArtifactsRequest {
  /** Required. The name of the artifact whose contents should be retrieved. Format: `{parent}/artifacts/*` */
  name: string;
}

export const GetContentsProjectsLocationsApisVersionsArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/artifacts/{artifactsId}:getContents" }),
  svc,
) as unknown as Schema.Schema<GetContentsProjectsLocationsApisVersionsArtifactsRequest>;

export type GetContentsProjectsLocationsApisVersionsArtifactsResponse = HttpBody;
export const GetContentsProjectsLocationsApisVersionsArtifactsResponse = HttpBody;

export type GetContentsProjectsLocationsApisVersionsArtifactsError = CommonErrors;

/** Returns the contents of a specified artifact. If artifacts are stored with GZip compression, the default behavior is to return the artifact uncompressed (the mime_type response field indicates the exact format returned). */
export const getContentsProjectsLocationsApisVersionsArtifacts: API.OperationMethod<GetContentsProjectsLocationsApisVersionsArtifactsRequest, GetContentsProjectsLocationsApisVersionsArtifactsResponse, GetContentsProjectsLocationsApisVersionsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetContentsProjectsLocationsApisVersionsArtifactsRequest,
  output: GetContentsProjectsLocationsApisVersionsArtifactsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsApisVersionsArtifactsRequest {
  /** Required. The name of the artifact to delete. Format: `{parent}/artifacts/*` */
  name: string;
}

export const DeleteProjectsLocationsApisVersionsArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/artifacts/{artifactsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApisVersionsArtifactsRequest>;

export type DeleteProjectsLocationsApisVersionsArtifactsResponse = Empty;
export const DeleteProjectsLocationsApisVersionsArtifactsResponse = Empty;

export type DeleteProjectsLocationsApisVersionsArtifactsError = CommonErrors;

/** Removes a specified artifact. */
export const deleteProjectsLocationsApisVersionsArtifacts: API.OperationMethod<DeleteProjectsLocationsApisVersionsArtifactsRequest, DeleteProjectsLocationsApisVersionsArtifactsResponse, DeleteProjectsLocationsApisVersionsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApisVersionsArtifactsRequest,
  output: DeleteProjectsLocationsApisVersionsArtifactsResponse,
  errors: [],
}));

export interface GetProjectsLocationsApisVersionsArtifactsRequest {
  /** Required. The name of the artifact to retrieve. Format: `{parent}/artifacts/*` */
  name: string;
}

export const GetProjectsLocationsApisVersionsArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/artifacts/{artifactsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsApisVersionsArtifactsRequest>;

export type GetProjectsLocationsApisVersionsArtifactsResponse = Artifact;
export const GetProjectsLocationsApisVersionsArtifactsResponse = Artifact;

export type GetProjectsLocationsApisVersionsArtifactsError = CommonErrors;

/** Returns a specified artifact. */
export const getProjectsLocationsApisVersionsArtifacts: API.OperationMethod<GetProjectsLocationsApisVersionsArtifactsRequest, GetProjectsLocationsApisVersionsArtifactsResponse, GetProjectsLocationsApisVersionsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsApisVersionsArtifactsRequest,
  output: GetProjectsLocationsApisVersionsArtifactsResponse,
  errors: [],
}));

export interface DeleteRevisionProjectsLocationsApisVersionsSpecsRequest {
  /** Required. The name of the spec revision to be deleted, with a revision ID explicitly included. Example: `projects/sample/locations/global/apis/petstore/versions/1.0.0/specs/openapi.yaml@c7cfa2a8` */
  name: string;
}

export const DeleteRevisionProjectsLocationsApisVersionsSpecsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}:deleteRevision" }),
  svc,
) as unknown as Schema.Schema<DeleteRevisionProjectsLocationsApisVersionsSpecsRequest>;

export type DeleteRevisionProjectsLocationsApisVersionsSpecsResponse = ApiSpec;
export const DeleteRevisionProjectsLocationsApisVersionsSpecsResponse = ApiSpec;

export type DeleteRevisionProjectsLocationsApisVersionsSpecsError = CommonErrors;

/** Deletes a revision of a spec. */
export const deleteRevisionProjectsLocationsApisVersionsSpecs: API.OperationMethod<DeleteRevisionProjectsLocationsApisVersionsSpecsRequest, DeleteRevisionProjectsLocationsApisVersionsSpecsResponse, DeleteRevisionProjectsLocationsApisVersionsSpecsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteRevisionProjectsLocationsApisVersionsSpecsRequest,
  output: DeleteRevisionProjectsLocationsApisVersionsSpecsResponse,
  errors: [],
}));

export interface GetProjectsLocationsApisVersionsSpecsRequest {
  /** Required. The name of the spec to retrieve. Format: `projects/* /locations/* /apis/* /versions/* /specs/*` */
  name: string;
}

export const GetProjectsLocationsApisVersionsSpecsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsApisVersionsSpecsRequest>;

export type GetProjectsLocationsApisVersionsSpecsResponse = ApiSpec;
export const GetProjectsLocationsApisVersionsSpecsResponse = ApiSpec;

export type GetProjectsLocationsApisVersionsSpecsError = CommonErrors;

/** Returns a specified spec. */
export const getProjectsLocationsApisVersionsSpecs: API.OperationMethod<GetProjectsLocationsApisVersionsSpecsRequest, GetProjectsLocationsApisVersionsSpecsResponse, GetProjectsLocationsApisVersionsSpecsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsApisVersionsSpecsRequest,
  output: GetProjectsLocationsApisVersionsSpecsResponse,
  errors: [],
}));

export interface ListProjectsLocationsApisVersionsSpecsRequest {
  /** A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in descending order using the "desc" identifier, e.g. "foo desc,bar" */
  orderBy?: string;
  /** A page token, received from a previous `ListApiSpecs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListApiSpecs` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of specs to return. The service may return fewer than this value. If unspecified, at most 50 values will be returned. The maximum is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** An expression that can be used to filter the list. Filters use the Common Expression Language and can refer to all message fields except contents. */
  filter?: string;
  /** Required. The parent, which owns this collection of specs. Format: `projects/* /locations/* /apis/* /versions/*` */
  parent: string;
}

export const ListProjectsLocationsApisVersionsSpecsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsApisVersionsSpecsRequest>;

export type ListProjectsLocationsApisVersionsSpecsResponse = ListApiSpecsResponse;
export const ListProjectsLocationsApisVersionsSpecsResponse = ListApiSpecsResponse;

export type ListProjectsLocationsApisVersionsSpecsError = CommonErrors;

/** Returns matching specs. */
export const listProjectsLocationsApisVersionsSpecs: API.PaginatedOperationMethod<ListProjectsLocationsApisVersionsSpecsRequest, ListProjectsLocationsApisVersionsSpecsResponse, ListProjectsLocationsApisVersionsSpecsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsApisVersionsSpecsRequest,
  output: ListProjectsLocationsApisVersionsSpecsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface RollbackProjectsLocationsApisVersionsSpecsRequest {
  /** Required. The spec being rolled back. */
  name: string;
  /** Request body */
  body?: RollbackApiSpecRequest;
}

export const RollbackProjectsLocationsApisVersionsSpecsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RollbackApiSpecRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}:rollback", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RollbackProjectsLocationsApisVersionsSpecsRequest>;

export type RollbackProjectsLocationsApisVersionsSpecsResponse = ApiSpec;
export const RollbackProjectsLocationsApisVersionsSpecsResponse = ApiSpec;

export type RollbackProjectsLocationsApisVersionsSpecsError = CommonErrors;

/** Sets the current revision to a specified prior revision. Note that this creates a new revision with a new revision ID. */
export const rollbackProjectsLocationsApisVersionsSpecs: API.OperationMethod<RollbackProjectsLocationsApisVersionsSpecsRequest, RollbackProjectsLocationsApisVersionsSpecsResponse, RollbackProjectsLocationsApisVersionsSpecsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RollbackProjectsLocationsApisVersionsSpecsRequest,
  output: RollbackProjectsLocationsApisVersionsSpecsResponse,
  errors: [],
}));

export interface TagRevisionProjectsLocationsApisVersionsSpecsRequest {
  /** Required. The name of the spec to be tagged, including the revision ID is optional. If a revision is not specified, it will tag the latest revision. */
  name: string;
  /** Request body */
  body?: TagApiSpecRevisionRequest;
}

export const TagRevisionProjectsLocationsApisVersionsSpecsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(TagApiSpecRevisionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}:tagRevision", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TagRevisionProjectsLocationsApisVersionsSpecsRequest>;

export type TagRevisionProjectsLocationsApisVersionsSpecsResponse = ApiSpec;
export const TagRevisionProjectsLocationsApisVersionsSpecsResponse = ApiSpec;

export type TagRevisionProjectsLocationsApisVersionsSpecsError = CommonErrors;

/** Adds a tag to a specified revision of a spec. */
export const tagRevisionProjectsLocationsApisVersionsSpecs: API.OperationMethod<TagRevisionProjectsLocationsApisVersionsSpecsRequest, TagRevisionProjectsLocationsApisVersionsSpecsResponse, TagRevisionProjectsLocationsApisVersionsSpecsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TagRevisionProjectsLocationsApisVersionsSpecsRequest,
  output: TagRevisionProjectsLocationsApisVersionsSpecsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsApisVersionsSpecsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsApisVersionsSpecsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsApisVersionsSpecsRequest>;

export type GetIamPolicyProjectsLocationsApisVersionsSpecsResponse = Policy;
export const GetIamPolicyProjectsLocationsApisVersionsSpecsResponse = Policy;

export type GetIamPolicyProjectsLocationsApisVersionsSpecsError = CommonErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsApisVersionsSpecs: API.OperationMethod<GetIamPolicyProjectsLocationsApisVersionsSpecsRequest, GetIamPolicyProjectsLocationsApisVersionsSpecsResponse, GetIamPolicyProjectsLocationsApisVersionsSpecsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsApisVersionsSpecsRequest,
  output: GetIamPolicyProjectsLocationsApisVersionsSpecsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsApisVersionsSpecsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsApisVersionsSpecsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsApisVersionsSpecsRequest>;

export type SetIamPolicyProjectsLocationsApisVersionsSpecsResponse = Policy;
export const SetIamPolicyProjectsLocationsApisVersionsSpecsResponse = Policy;

export type SetIamPolicyProjectsLocationsApisVersionsSpecsError = CommonErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsApisVersionsSpecs: API.OperationMethod<SetIamPolicyProjectsLocationsApisVersionsSpecsRequest, SetIamPolicyProjectsLocationsApisVersionsSpecsResponse, SetIamPolicyProjectsLocationsApisVersionsSpecsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsApisVersionsSpecsRequest,
  output: SetIamPolicyProjectsLocationsApisVersionsSpecsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsApisVersionsSpecsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsApisVersionsSpecsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsApisVersionsSpecsRequest>;

export type TestIamPermissionsProjectsLocationsApisVersionsSpecsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsApisVersionsSpecsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsApisVersionsSpecsError = CommonErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsApisVersionsSpecs: API.OperationMethod<TestIamPermissionsProjectsLocationsApisVersionsSpecsRequest, TestIamPermissionsProjectsLocationsApisVersionsSpecsResponse, TestIamPermissionsProjectsLocationsApisVersionsSpecsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsApisVersionsSpecsRequest,
  output: TestIamPermissionsProjectsLocationsApisVersionsSpecsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsApisVersionsSpecsRequest {
  /** If set to true, any child resources will also be deleted. (Otherwise, the request will only work if there are no child resources.) */
  force?: boolean;
  /** Required. The name of the spec to delete. Format: `projects/* /locations/* /apis/* /versions/* /specs/*` */
  name: string;
}

export const DeleteProjectsLocationsApisVersionsSpecsRequest = Schema.Struct({
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApisVersionsSpecsRequest>;

export type DeleteProjectsLocationsApisVersionsSpecsResponse = Empty;
export const DeleteProjectsLocationsApisVersionsSpecsResponse = Empty;

export type DeleteProjectsLocationsApisVersionsSpecsError = CommonErrors;

/** Removes a specified spec, all revisions, and all child resources (e.g., artifacts). */
export const deleteProjectsLocationsApisVersionsSpecs: API.OperationMethod<DeleteProjectsLocationsApisVersionsSpecsRequest, DeleteProjectsLocationsApisVersionsSpecsResponse, DeleteProjectsLocationsApisVersionsSpecsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApisVersionsSpecsRequest,
  output: DeleteProjectsLocationsApisVersionsSpecsResponse,
  errors: [],
}));

export interface ListRevisionsProjectsLocationsApisVersionsSpecsRequest {
  /** The page token, received from a previous ListApiSpecRevisions call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** The maximum number of revisions to return per page. */
  pageSize?: number;
  /** An expression that can be used to filter the list. Filters use the Common Expression Language and can refer to all message fields. */
  filter?: string;
  /** Required. The name of the spec to list revisions for. */
  name: string;
}

export const ListRevisionsProjectsLocationsApisVersionsSpecsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}:listRevisions" }),
  svc,
) as unknown as Schema.Schema<ListRevisionsProjectsLocationsApisVersionsSpecsRequest>;

export type ListRevisionsProjectsLocationsApisVersionsSpecsResponse = ListApiSpecRevisionsResponse;
export const ListRevisionsProjectsLocationsApisVersionsSpecsResponse = ListApiSpecRevisionsResponse;

export type ListRevisionsProjectsLocationsApisVersionsSpecsError = CommonErrors;

/** Lists all revisions of a spec. Revisions are returned in descending order of revision creation time. */
export const listRevisionsProjectsLocationsApisVersionsSpecs: API.PaginatedOperationMethod<ListRevisionsProjectsLocationsApisVersionsSpecsRequest, ListRevisionsProjectsLocationsApisVersionsSpecsResponse, ListRevisionsProjectsLocationsApisVersionsSpecsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListRevisionsProjectsLocationsApisVersionsSpecsRequest,
  output: ListRevisionsProjectsLocationsApisVersionsSpecsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetContentsProjectsLocationsApisVersionsSpecsRequest {
  /** Required. The name of the spec whose contents should be retrieved. Format: `projects/* /locations/* /apis/* /versions/* /specs/*` */
  name: string;
}

export const GetContentsProjectsLocationsApisVersionsSpecsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}:getContents" }),
  svc,
) as unknown as Schema.Schema<GetContentsProjectsLocationsApisVersionsSpecsRequest>;

export type GetContentsProjectsLocationsApisVersionsSpecsResponse = HttpBody;
export const GetContentsProjectsLocationsApisVersionsSpecsResponse = HttpBody;

export type GetContentsProjectsLocationsApisVersionsSpecsError = CommonErrors;

/** Returns the contents of a specified spec. If specs are stored with GZip compression, the default behavior is to return the spec uncompressed (the mime_type response field indicates the exact format returned). */
export const getContentsProjectsLocationsApisVersionsSpecs: API.OperationMethod<GetContentsProjectsLocationsApisVersionsSpecsRequest, GetContentsProjectsLocationsApisVersionsSpecsResponse, GetContentsProjectsLocationsApisVersionsSpecsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetContentsProjectsLocationsApisVersionsSpecsRequest,
  output: GetContentsProjectsLocationsApisVersionsSpecsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsApisVersionsSpecsRequest {
  /** Required. The parent, which owns this collection of specs. Format: `projects/* /locations/* /apis/* /versions/*` */
  parent: string;
  /** Required. The ID to use for the spec, which will become the final component of the spec's resource name. This value should be 4-63 characters, and valid characters are /a-z-/. Following AIP-162, IDs must not have the form of a UUID. */
  apiSpecId?: string;
  /** Request body */
  body?: ApiSpec;
}

export const CreateProjectsLocationsApisVersionsSpecsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  apiSpecId: Schema.optional(Schema.String).pipe(T.HttpQuery("apiSpecId")),
  body: Schema.optional(ApiSpec).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsApisVersionsSpecsRequest>;

export type CreateProjectsLocationsApisVersionsSpecsResponse = ApiSpec;
export const CreateProjectsLocationsApisVersionsSpecsResponse = ApiSpec;

export type CreateProjectsLocationsApisVersionsSpecsError = CommonErrors;

/** Creates a specified spec. */
export const createProjectsLocationsApisVersionsSpecs: API.OperationMethod<CreateProjectsLocationsApisVersionsSpecsRequest, CreateProjectsLocationsApisVersionsSpecsResponse, CreateProjectsLocationsApisVersionsSpecsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsApisVersionsSpecsRequest,
  output: CreateProjectsLocationsApisVersionsSpecsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsApisVersionsSpecsRequest {
  /** The list of fields to be updated. If omitted, all fields are updated that are set in the request message (fields set to default values are ignored). If an asterisk "*" is specified, all fields are updated, including fields that are unspecified/default in the request. */
  updateMask?: string;
  /** Resource name. */
  name: string;
  /** If set to true, and the spec is not found, a new spec will be created. In this situation, `update_mask` is ignored. */
  allowMissing?: boolean;
  /** Request body */
  body?: ApiSpec;
}

export const PatchProjectsLocationsApisVersionsSpecsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  body: Schema.optional(ApiSpec).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsApisVersionsSpecsRequest>;

export type PatchProjectsLocationsApisVersionsSpecsResponse = ApiSpec;
export const PatchProjectsLocationsApisVersionsSpecsResponse = ApiSpec;

export type PatchProjectsLocationsApisVersionsSpecsError = CommonErrors;

/** Used to modify a specified spec. */
export const patchProjectsLocationsApisVersionsSpecs: API.OperationMethod<PatchProjectsLocationsApisVersionsSpecsRequest, PatchProjectsLocationsApisVersionsSpecsResponse, PatchProjectsLocationsApisVersionsSpecsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsApisVersionsSpecsRequest,
  output: PatchProjectsLocationsApisVersionsSpecsResponse,
  errors: [],
}));

export interface GetProjectsLocationsApisVersionsSpecsArtifactsRequest {
  /** Required. The name of the artifact to retrieve. Format: `{parent}/artifacts/*` */
  name: string;
}

export const GetProjectsLocationsApisVersionsSpecsArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}/artifacts/{artifactsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsApisVersionsSpecsArtifactsRequest>;

export type GetProjectsLocationsApisVersionsSpecsArtifactsResponse = Artifact;
export const GetProjectsLocationsApisVersionsSpecsArtifactsResponse = Artifact;

export type GetProjectsLocationsApisVersionsSpecsArtifactsError = CommonErrors;

/** Returns a specified artifact. */
export const getProjectsLocationsApisVersionsSpecsArtifacts: API.OperationMethod<GetProjectsLocationsApisVersionsSpecsArtifactsRequest, GetProjectsLocationsApisVersionsSpecsArtifactsResponse, GetProjectsLocationsApisVersionsSpecsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsApisVersionsSpecsArtifactsRequest,
  output: GetProjectsLocationsApisVersionsSpecsArtifactsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}/artifacts/{artifactsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsRequest>;

export type SetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsResponse = Policy;
export const SetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsResponse = Policy;

export type SetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsError = CommonErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsApisVersionsSpecsArtifacts: API.OperationMethod<SetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsRequest, SetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsResponse, SetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsRequest,
  output: SetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsResponse,
  errors: [],
}));

export interface ReplaceArtifactProjectsLocationsApisVersionsSpecsArtifactsRequest {
  /** Resource name. */
  name: string;
  /** Request body */
  body?: Artifact;
}

export const ReplaceArtifactProjectsLocationsApisVersionsSpecsArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Artifact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}/artifacts/{artifactsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplaceArtifactProjectsLocationsApisVersionsSpecsArtifactsRequest>;

export type ReplaceArtifactProjectsLocationsApisVersionsSpecsArtifactsResponse = Artifact;
export const ReplaceArtifactProjectsLocationsApisVersionsSpecsArtifactsResponse = Artifact;

export type ReplaceArtifactProjectsLocationsApisVersionsSpecsArtifactsError = CommonErrors;

/** Used to replace a specified artifact. */
export const replaceArtifactProjectsLocationsApisVersionsSpecsArtifacts: API.OperationMethod<ReplaceArtifactProjectsLocationsApisVersionsSpecsArtifactsRequest, ReplaceArtifactProjectsLocationsApisVersionsSpecsArtifactsResponse, ReplaceArtifactProjectsLocationsApisVersionsSpecsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplaceArtifactProjectsLocationsApisVersionsSpecsArtifactsRequest,
  output: ReplaceArtifactProjectsLocationsApisVersionsSpecsArtifactsResponse,
  errors: [],
}));

export interface ListProjectsLocationsApisVersionsSpecsArtifactsRequest {
  /** A page token, received from a previous `ListArtifacts` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListArtifacts` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of artifacts to return. The service may return fewer than this value. If unspecified, at most 50 values will be returned. The maximum is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** An expression that can be used to filter the list. Filters use the Common Expression Language and can refer to all message fields except contents. */
  filter?: string;
  /** A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in descending order using the "desc" identifier, e.g. "foo desc,bar" */
  orderBy?: string;
  /** Required. The parent, which owns this collection of artifacts. Format: `{parent}` */
  parent: string;
}

export const ListProjectsLocationsApisVersionsSpecsArtifactsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}/artifacts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsApisVersionsSpecsArtifactsRequest>;

export type ListProjectsLocationsApisVersionsSpecsArtifactsResponse = ListArtifactsResponse;
export const ListProjectsLocationsApisVersionsSpecsArtifactsResponse = ListArtifactsResponse;

export type ListProjectsLocationsApisVersionsSpecsArtifactsError = CommonErrors;

/** Returns matching artifacts. */
export const listProjectsLocationsApisVersionsSpecsArtifacts: API.PaginatedOperationMethod<ListProjectsLocationsApisVersionsSpecsArtifactsRequest, ListProjectsLocationsApisVersionsSpecsArtifactsResponse, ListProjectsLocationsApisVersionsSpecsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsApisVersionsSpecsArtifactsRequest,
  output: ListProjectsLocationsApisVersionsSpecsArtifactsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface TestIamPermissionsProjectsLocationsApisVersionsSpecsArtifactsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsApisVersionsSpecsArtifactsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}/artifacts/{artifactsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsApisVersionsSpecsArtifactsRequest>;

export type TestIamPermissionsProjectsLocationsApisVersionsSpecsArtifactsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsApisVersionsSpecsArtifactsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsApisVersionsSpecsArtifactsError = CommonErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsApisVersionsSpecsArtifacts: API.OperationMethod<TestIamPermissionsProjectsLocationsApisVersionsSpecsArtifactsRequest, TestIamPermissionsProjectsLocationsApisVersionsSpecsArtifactsResponse, TestIamPermissionsProjectsLocationsApisVersionsSpecsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsApisVersionsSpecsArtifactsRequest,
  output: TestIamPermissionsProjectsLocationsApisVersionsSpecsArtifactsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsApisVersionsSpecsArtifactsRequest {
  /** Required. The name of the artifact to delete. Format: `{parent}/artifacts/*` */
  name: string;
}

export const DeleteProjectsLocationsApisVersionsSpecsArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}/artifacts/{artifactsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApisVersionsSpecsArtifactsRequest>;

export type DeleteProjectsLocationsApisVersionsSpecsArtifactsResponse = Empty;
export const DeleteProjectsLocationsApisVersionsSpecsArtifactsResponse = Empty;

export type DeleteProjectsLocationsApisVersionsSpecsArtifactsError = CommonErrors;

/** Removes a specified artifact. */
export const deleteProjectsLocationsApisVersionsSpecsArtifacts: API.OperationMethod<DeleteProjectsLocationsApisVersionsSpecsArtifactsRequest, DeleteProjectsLocationsApisVersionsSpecsArtifactsResponse, DeleteProjectsLocationsApisVersionsSpecsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApisVersionsSpecsArtifactsRequest,
  output: DeleteProjectsLocationsApisVersionsSpecsArtifactsResponse,
  errors: [],
}));

export interface GetContentsProjectsLocationsApisVersionsSpecsArtifactsRequest {
  /** Required. The name of the artifact whose contents should be retrieved. Format: `{parent}/artifacts/*` */
  name: string;
}

export const GetContentsProjectsLocationsApisVersionsSpecsArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}/artifacts/{artifactsId}:getContents" }),
  svc,
) as unknown as Schema.Schema<GetContentsProjectsLocationsApisVersionsSpecsArtifactsRequest>;

export type GetContentsProjectsLocationsApisVersionsSpecsArtifactsResponse = HttpBody;
export const GetContentsProjectsLocationsApisVersionsSpecsArtifactsResponse = HttpBody;

export type GetContentsProjectsLocationsApisVersionsSpecsArtifactsError = CommonErrors;

/** Returns the contents of a specified artifact. If artifacts are stored with GZip compression, the default behavior is to return the artifact uncompressed (the mime_type response field indicates the exact format returned). */
export const getContentsProjectsLocationsApisVersionsSpecsArtifacts: API.OperationMethod<GetContentsProjectsLocationsApisVersionsSpecsArtifactsRequest, GetContentsProjectsLocationsApisVersionsSpecsArtifactsResponse, GetContentsProjectsLocationsApisVersionsSpecsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetContentsProjectsLocationsApisVersionsSpecsArtifactsRequest,
  output: GetContentsProjectsLocationsApisVersionsSpecsArtifactsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}/artifacts/{artifactsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsRequest>;

export type GetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsResponse = Policy;
export const GetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsResponse = Policy;

export type GetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsError = CommonErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsApisVersionsSpecsArtifacts: API.OperationMethod<GetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsRequest, GetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsResponse, GetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsRequest,
  output: GetIamPolicyProjectsLocationsApisVersionsSpecsArtifactsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsApisVersionsSpecsArtifactsRequest {
  /** Required. The parent, which owns this collection of artifacts. Format: `{parent}` */
  parent: string;
  /** Required. The ID to use for the artifact, which will become the final component of the artifact's resource name. This value should be 4-63 characters, and valid characters are /a-z-/. Following AIP-162, IDs must not have the form of a UUID. */
  artifactId?: string;
  /** Request body */
  body?: Artifact;
}

export const CreateProjectsLocationsApisVersionsSpecsArtifactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  artifactId: Schema.optional(Schema.String).pipe(T.HttpQuery("artifactId")),
  body: Schema.optional(Artifact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/versions/{versionsId}/specs/{specsId}/artifacts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsApisVersionsSpecsArtifactsRequest>;

export type CreateProjectsLocationsApisVersionsSpecsArtifactsResponse = Artifact;
export const CreateProjectsLocationsApisVersionsSpecsArtifactsResponse = Artifact;

export type CreateProjectsLocationsApisVersionsSpecsArtifactsError = CommonErrors;

/** Creates a specified artifact. */
export const createProjectsLocationsApisVersionsSpecsArtifacts: API.OperationMethod<CreateProjectsLocationsApisVersionsSpecsArtifactsRequest, CreateProjectsLocationsApisVersionsSpecsArtifactsResponse, CreateProjectsLocationsApisVersionsSpecsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsApisVersionsSpecsArtifactsRequest,
  output: CreateProjectsLocationsApisVersionsSpecsArtifactsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsApisArtifactsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsApisArtifactsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/artifacts/{artifactsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsApisArtifactsRequest>;

export type TestIamPermissionsProjectsLocationsApisArtifactsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsApisArtifactsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsApisArtifactsError = CommonErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsApisArtifacts: API.OperationMethod<TestIamPermissionsProjectsLocationsApisArtifactsRequest, TestIamPermissionsProjectsLocationsApisArtifactsResponse, TestIamPermissionsProjectsLocationsApisArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsApisArtifactsRequest,
  output: TestIamPermissionsProjectsLocationsApisArtifactsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsApisArtifactsRequest {
  /** Required. The parent, which owns this collection of artifacts. Format: `{parent}` */
  parent: string;
  /** Required. The ID to use for the artifact, which will become the final component of the artifact's resource name. This value should be 4-63 characters, and valid characters are /a-z-/. Following AIP-162, IDs must not have the form of a UUID. */
  artifactId?: string;
  /** Request body */
  body?: Artifact;
}

export const CreateProjectsLocationsApisArtifactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  artifactId: Schema.optional(Schema.String).pipe(T.HttpQuery("artifactId")),
  body: Schema.optional(Artifact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/artifacts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsApisArtifactsRequest>;

export type CreateProjectsLocationsApisArtifactsResponse = Artifact;
export const CreateProjectsLocationsApisArtifactsResponse = Artifact;

export type CreateProjectsLocationsApisArtifactsError = CommonErrors;

/** Creates a specified artifact. */
export const createProjectsLocationsApisArtifacts: API.OperationMethod<CreateProjectsLocationsApisArtifactsRequest, CreateProjectsLocationsApisArtifactsResponse, CreateProjectsLocationsApisArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsApisArtifactsRequest,
  output: CreateProjectsLocationsApisArtifactsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsApisArtifactsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsApisArtifactsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/artifacts/{artifactsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsApisArtifactsRequest>;

export type SetIamPolicyProjectsLocationsApisArtifactsResponse = Policy;
export const SetIamPolicyProjectsLocationsApisArtifactsResponse = Policy;

export type SetIamPolicyProjectsLocationsApisArtifactsError = CommonErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsApisArtifacts: API.OperationMethod<SetIamPolicyProjectsLocationsApisArtifactsRequest, SetIamPolicyProjectsLocationsApisArtifactsResponse, SetIamPolicyProjectsLocationsApisArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsApisArtifactsRequest,
  output: SetIamPolicyProjectsLocationsApisArtifactsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsApisArtifactsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsApisArtifactsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/artifacts/{artifactsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsApisArtifactsRequest>;

export type GetIamPolicyProjectsLocationsApisArtifactsResponse = Policy;
export const GetIamPolicyProjectsLocationsApisArtifactsResponse = Policy;

export type GetIamPolicyProjectsLocationsApisArtifactsError = CommonErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsApisArtifacts: API.OperationMethod<GetIamPolicyProjectsLocationsApisArtifactsRequest, GetIamPolicyProjectsLocationsApisArtifactsResponse, GetIamPolicyProjectsLocationsApisArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsApisArtifactsRequest,
  output: GetIamPolicyProjectsLocationsApisArtifactsResponse,
  errors: [],
}));

export interface GetProjectsLocationsApisArtifactsRequest {
  /** Required. The name of the artifact to retrieve. Format: `{parent}/artifacts/*` */
  name: string;
}

export const GetProjectsLocationsApisArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/artifacts/{artifactsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsApisArtifactsRequest>;

export type GetProjectsLocationsApisArtifactsResponse = Artifact;
export const GetProjectsLocationsApisArtifactsResponse = Artifact;

export type GetProjectsLocationsApisArtifactsError = CommonErrors;

/** Returns a specified artifact. */
export const getProjectsLocationsApisArtifacts: API.OperationMethod<GetProjectsLocationsApisArtifactsRequest, GetProjectsLocationsApisArtifactsResponse, GetProjectsLocationsApisArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsApisArtifactsRequest,
  output: GetProjectsLocationsApisArtifactsResponse,
  errors: [],
}));

export interface ReplaceArtifactProjectsLocationsApisArtifactsRequest {
  /** Resource name. */
  name: string;
  /** Request body */
  body?: Artifact;
}

export const ReplaceArtifactProjectsLocationsApisArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Artifact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/artifacts/{artifactsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplaceArtifactProjectsLocationsApisArtifactsRequest>;

export type ReplaceArtifactProjectsLocationsApisArtifactsResponse = Artifact;
export const ReplaceArtifactProjectsLocationsApisArtifactsResponse = Artifact;

export type ReplaceArtifactProjectsLocationsApisArtifactsError = CommonErrors;

/** Used to replace a specified artifact. */
export const replaceArtifactProjectsLocationsApisArtifacts: API.OperationMethod<ReplaceArtifactProjectsLocationsApisArtifactsRequest, ReplaceArtifactProjectsLocationsApisArtifactsResponse, ReplaceArtifactProjectsLocationsApisArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplaceArtifactProjectsLocationsApisArtifactsRequest,
  output: ReplaceArtifactProjectsLocationsApisArtifactsResponse,
  errors: [],
}));

export interface ListProjectsLocationsApisArtifactsRequest {
  /** An expression that can be used to filter the list. Filters use the Common Expression Language and can refer to all message fields except contents. */
  filter?: string;
  /** A page token, received from a previous `ListArtifacts` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListArtifacts` must match the call that provided the page token. */
  pageToken?: string;
  /** A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in descending order using the "desc" identifier, e.g. "foo desc,bar" */
  orderBy?: string;
  /** The maximum number of artifacts to return. The service may return fewer than this value. If unspecified, at most 50 values will be returned. The maximum is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. The parent, which owns this collection of artifacts. Format: `{parent}` */
  parent: string;
}

export const ListProjectsLocationsApisArtifactsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/artifacts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsApisArtifactsRequest>;

export type ListProjectsLocationsApisArtifactsResponse = ListArtifactsResponse;
export const ListProjectsLocationsApisArtifactsResponse = ListArtifactsResponse;

export type ListProjectsLocationsApisArtifactsError = CommonErrors;

/** Returns matching artifacts. */
export const listProjectsLocationsApisArtifacts: API.PaginatedOperationMethod<ListProjectsLocationsApisArtifactsRequest, ListProjectsLocationsApisArtifactsResponse, ListProjectsLocationsApisArtifactsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsApisArtifactsRequest,
  output: ListProjectsLocationsApisArtifactsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetContentsProjectsLocationsApisArtifactsRequest {
  /** Required. The name of the artifact whose contents should be retrieved. Format: `{parent}/artifacts/*` */
  name: string;
}

export const GetContentsProjectsLocationsApisArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/artifacts/{artifactsId}:getContents" }),
  svc,
) as unknown as Schema.Schema<GetContentsProjectsLocationsApisArtifactsRequest>;

export type GetContentsProjectsLocationsApisArtifactsResponse = HttpBody;
export const GetContentsProjectsLocationsApisArtifactsResponse = HttpBody;

export type GetContentsProjectsLocationsApisArtifactsError = CommonErrors;

/** Returns the contents of a specified artifact. If artifacts are stored with GZip compression, the default behavior is to return the artifact uncompressed (the mime_type response field indicates the exact format returned). */
export const getContentsProjectsLocationsApisArtifacts: API.OperationMethod<GetContentsProjectsLocationsApisArtifactsRequest, GetContentsProjectsLocationsApisArtifactsResponse, GetContentsProjectsLocationsApisArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetContentsProjectsLocationsApisArtifactsRequest,
  output: GetContentsProjectsLocationsApisArtifactsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsApisArtifactsRequest {
  /** Required. The name of the artifact to delete. Format: `{parent}/artifacts/*` */
  name: string;
}

export const DeleteProjectsLocationsApisArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/artifacts/{artifactsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApisArtifactsRequest>;

export type DeleteProjectsLocationsApisArtifactsResponse = Empty;
export const DeleteProjectsLocationsApisArtifactsResponse = Empty;

export type DeleteProjectsLocationsApisArtifactsError = CommonErrors;

/** Removes a specified artifact. */
export const deleteProjectsLocationsApisArtifacts: API.OperationMethod<DeleteProjectsLocationsApisArtifactsRequest, DeleteProjectsLocationsApisArtifactsResponse, DeleteProjectsLocationsApisArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApisArtifactsRequest,
  output: DeleteProjectsLocationsApisArtifactsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsApisDeploymentsRequest {
  /** Required. The ID to use for the deployment, which will become the final component of the deployment's resource name. This value should be 4-63 characters, and valid characters are /a-z-/. Following AIP-162, IDs must not have the form of a UUID. */
  apiDeploymentId?: string;
  /** Required. The parent, which owns this collection of deployments. Format: `projects/* /locations/* /apis/*` */
  parent: string;
  /** Request body */
  body?: ApiDeployment;
}

export const CreateProjectsLocationsApisDeploymentsRequest = Schema.Struct({
  apiDeploymentId: Schema.optional(Schema.String).pipe(T.HttpQuery("apiDeploymentId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ApiDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsApisDeploymentsRequest>;

export type CreateProjectsLocationsApisDeploymentsResponse = ApiDeployment;
export const CreateProjectsLocationsApisDeploymentsResponse = ApiDeployment;

export type CreateProjectsLocationsApisDeploymentsError = CommonErrors;

/** Creates a specified deployment. */
export const createProjectsLocationsApisDeployments: API.OperationMethod<CreateProjectsLocationsApisDeploymentsRequest, CreateProjectsLocationsApisDeploymentsResponse, CreateProjectsLocationsApisDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsApisDeploymentsRequest,
  output: CreateProjectsLocationsApisDeploymentsResponse,
  errors: [],
}));

export interface RollbackProjectsLocationsApisDeploymentsRequest {
  /** Required. The deployment being rolled back. */
  name: string;
  /** Request body */
  body?: RollbackApiDeploymentRequest;
}

export const RollbackProjectsLocationsApisDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RollbackApiDeploymentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments/{deploymentsId}:rollback", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RollbackProjectsLocationsApisDeploymentsRequest>;

export type RollbackProjectsLocationsApisDeploymentsResponse = ApiDeployment;
export const RollbackProjectsLocationsApisDeploymentsResponse = ApiDeployment;

export type RollbackProjectsLocationsApisDeploymentsError = CommonErrors;

/** Sets the current revision to a specified prior revision. Note that this creates a new revision with a new revision ID. */
export const rollbackProjectsLocationsApisDeployments: API.OperationMethod<RollbackProjectsLocationsApisDeploymentsRequest, RollbackProjectsLocationsApisDeploymentsResponse, RollbackProjectsLocationsApisDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RollbackProjectsLocationsApisDeploymentsRequest,
  output: RollbackProjectsLocationsApisDeploymentsResponse,
  errors: [],
}));

export interface DeleteRevisionProjectsLocationsApisDeploymentsRequest {
  /** Required. The name of the deployment revision to be deleted, with a revision ID explicitly included. Example: `projects/sample/locations/global/apis/petstore/deployments/prod@c7cfa2a8` */
  name: string;
}

export const DeleteRevisionProjectsLocationsApisDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments/{deploymentsId}:deleteRevision" }),
  svc,
) as unknown as Schema.Schema<DeleteRevisionProjectsLocationsApisDeploymentsRequest>;

export type DeleteRevisionProjectsLocationsApisDeploymentsResponse = ApiDeployment;
export const DeleteRevisionProjectsLocationsApisDeploymentsResponse = ApiDeployment;

export type DeleteRevisionProjectsLocationsApisDeploymentsError = CommonErrors;

/** Deletes a revision of a deployment. */
export const deleteRevisionProjectsLocationsApisDeployments: API.OperationMethod<DeleteRevisionProjectsLocationsApisDeploymentsRequest, DeleteRevisionProjectsLocationsApisDeploymentsResponse, DeleteRevisionProjectsLocationsApisDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteRevisionProjectsLocationsApisDeploymentsRequest,
  output: DeleteRevisionProjectsLocationsApisDeploymentsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsApisDeploymentsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsApisDeploymentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments/{deploymentsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsApisDeploymentsRequest>;

export type TestIamPermissionsProjectsLocationsApisDeploymentsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsApisDeploymentsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsApisDeploymentsError = CommonErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsApisDeployments: API.OperationMethod<TestIamPermissionsProjectsLocationsApisDeploymentsRequest, TestIamPermissionsProjectsLocationsApisDeploymentsResponse, TestIamPermissionsProjectsLocationsApisDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsApisDeploymentsRequest,
  output: TestIamPermissionsProjectsLocationsApisDeploymentsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsApisDeploymentsRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsApisDeploymentsRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments/{deploymentsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsApisDeploymentsRequest>;

export type GetIamPolicyProjectsLocationsApisDeploymentsResponse = Policy;
export const GetIamPolicyProjectsLocationsApisDeploymentsResponse = Policy;

export type GetIamPolicyProjectsLocationsApisDeploymentsError = CommonErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsApisDeployments: API.OperationMethod<GetIamPolicyProjectsLocationsApisDeploymentsRequest, GetIamPolicyProjectsLocationsApisDeploymentsResponse, GetIamPolicyProjectsLocationsApisDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsApisDeploymentsRequest,
  output: GetIamPolicyProjectsLocationsApisDeploymentsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsApisDeploymentsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsApisDeploymentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments/{deploymentsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsApisDeploymentsRequest>;

export type SetIamPolicyProjectsLocationsApisDeploymentsResponse = Policy;
export const SetIamPolicyProjectsLocationsApisDeploymentsResponse = Policy;

export type SetIamPolicyProjectsLocationsApisDeploymentsError = CommonErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsApisDeployments: API.OperationMethod<SetIamPolicyProjectsLocationsApisDeploymentsRequest, SetIamPolicyProjectsLocationsApisDeploymentsResponse, SetIamPolicyProjectsLocationsApisDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsApisDeploymentsRequest,
  output: SetIamPolicyProjectsLocationsApisDeploymentsResponse,
  errors: [],
}));

export interface ListProjectsLocationsApisDeploymentsRequest {
  /** The maximum number of deployments to return. The service may return fewer than this value. If unspecified, at most 50 values will be returned. The maximum is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** An expression that can be used to filter the list. Filters use the Common Expression Language and can refer to all message fields. */
  filter?: string;
  /** Required. The parent, which owns this collection of deployments. Format: `projects/* /locations/* /apis/*` */
  parent: string;
  /** A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in descending order using the "desc" identifier, e.g. "foo desc,bar" */
  orderBy?: string;
  /** A page token, received from a previous `ListApiDeployments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListApiDeployments` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsApisDeploymentsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsApisDeploymentsRequest>;

export type ListProjectsLocationsApisDeploymentsResponse = ListApiDeploymentsResponse;
export const ListProjectsLocationsApisDeploymentsResponse = ListApiDeploymentsResponse;

export type ListProjectsLocationsApisDeploymentsError = CommonErrors;

/** Returns matching deployments. */
export const listProjectsLocationsApisDeployments: API.PaginatedOperationMethod<ListProjectsLocationsApisDeploymentsRequest, ListProjectsLocationsApisDeploymentsResponse, ListProjectsLocationsApisDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsApisDeploymentsRequest,
  output: ListProjectsLocationsApisDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListRevisionsProjectsLocationsApisDeploymentsRequest {
  /** An expression that can be used to filter the list. Filters use the Common Expression Language and can refer to all message fields. */
  filter?: string;
  /** The page token, received from a previous ListApiDeploymentRevisions call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** The maximum number of revisions to return per page. */
  pageSize?: number;
  /** Required. The name of the deployment to list revisions for. */
  name: string;
}

export const ListRevisionsProjectsLocationsApisDeploymentsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments/{deploymentsId}:listRevisions" }),
  svc,
) as unknown as Schema.Schema<ListRevisionsProjectsLocationsApisDeploymentsRequest>;

export type ListRevisionsProjectsLocationsApisDeploymentsResponse = ListApiDeploymentRevisionsResponse;
export const ListRevisionsProjectsLocationsApisDeploymentsResponse = ListApiDeploymentRevisionsResponse;

export type ListRevisionsProjectsLocationsApisDeploymentsError = CommonErrors;

/** Lists all revisions of a deployment. Revisions are returned in descending order of revision creation time. */
export const listRevisionsProjectsLocationsApisDeployments: API.PaginatedOperationMethod<ListRevisionsProjectsLocationsApisDeploymentsRequest, ListRevisionsProjectsLocationsApisDeploymentsResponse, ListRevisionsProjectsLocationsApisDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListRevisionsProjectsLocationsApisDeploymentsRequest,
  output: ListRevisionsProjectsLocationsApisDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsApisDeploymentsRequest {
  /** Required. The name of the deployment to delete. Format: `projects/* /locations/* /apis/* /deployments/*` */
  name: string;
  /** If set to true, any child resources will also be deleted. (Otherwise, the request will only work if there are no child resources.) */
  force?: boolean;
}

export const DeleteProjectsLocationsApisDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments/{deploymentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApisDeploymentsRequest>;

export type DeleteProjectsLocationsApisDeploymentsResponse = Empty;
export const DeleteProjectsLocationsApisDeploymentsResponse = Empty;

export type DeleteProjectsLocationsApisDeploymentsError = CommonErrors;

/** Removes a specified deployment, all revisions, and all child resources (e.g., artifacts). */
export const deleteProjectsLocationsApisDeployments: API.OperationMethod<DeleteProjectsLocationsApisDeploymentsRequest, DeleteProjectsLocationsApisDeploymentsResponse, DeleteProjectsLocationsApisDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApisDeploymentsRequest,
  output: DeleteProjectsLocationsApisDeploymentsResponse,
  errors: [],
}));

export interface TagRevisionProjectsLocationsApisDeploymentsRequest {
  /** Required. The name of the deployment to be tagged, including the revision ID is optional. If a revision is not specified, it will tag the latest revision. */
  name: string;
  /** Request body */
  body?: TagApiDeploymentRevisionRequest;
}

export const TagRevisionProjectsLocationsApisDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(TagApiDeploymentRevisionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments/{deploymentsId}:tagRevision", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TagRevisionProjectsLocationsApisDeploymentsRequest>;

export type TagRevisionProjectsLocationsApisDeploymentsResponse = ApiDeployment;
export const TagRevisionProjectsLocationsApisDeploymentsResponse = ApiDeployment;

export type TagRevisionProjectsLocationsApisDeploymentsError = CommonErrors;

/** Adds a tag to a specified revision of a deployment. */
export const tagRevisionProjectsLocationsApisDeployments: API.OperationMethod<TagRevisionProjectsLocationsApisDeploymentsRequest, TagRevisionProjectsLocationsApisDeploymentsResponse, TagRevisionProjectsLocationsApisDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TagRevisionProjectsLocationsApisDeploymentsRequest,
  output: TagRevisionProjectsLocationsApisDeploymentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsApisDeploymentsRequest {
  /** If set to true, and the deployment is not found, a new deployment will be created. In this situation, `update_mask` is ignored. */
  allowMissing?: boolean;
  /** The list of fields to be updated. If omitted, all fields are updated that are set in the request message (fields set to default values are ignored). If an asterisk "*" is specified, all fields are updated, including fields that are unspecified/default in the request. */
  updateMask?: string;
  /** Resource name. */
  name: string;
  /** Request body */
  body?: ApiDeployment;
}

export const PatchProjectsLocationsApisDeploymentsRequest = Schema.Struct({
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApiDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments/{deploymentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsApisDeploymentsRequest>;

export type PatchProjectsLocationsApisDeploymentsResponse = ApiDeployment;
export const PatchProjectsLocationsApisDeploymentsResponse = ApiDeployment;

export type PatchProjectsLocationsApisDeploymentsError = CommonErrors;

/** Used to modify a specified deployment. */
export const patchProjectsLocationsApisDeployments: API.OperationMethod<PatchProjectsLocationsApisDeploymentsRequest, PatchProjectsLocationsApisDeploymentsResponse, PatchProjectsLocationsApisDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsApisDeploymentsRequest,
  output: PatchProjectsLocationsApisDeploymentsResponse,
  errors: [],
}));

export interface GetProjectsLocationsApisDeploymentsRequest {
  /** Required. The name of the deployment to retrieve. Format: `projects/* /locations/* /apis/* /deployments/*` */
  name: string;
}

export const GetProjectsLocationsApisDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments/{deploymentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsApisDeploymentsRequest>;

export type GetProjectsLocationsApisDeploymentsResponse = ApiDeployment;
export const GetProjectsLocationsApisDeploymentsResponse = ApiDeployment;

export type GetProjectsLocationsApisDeploymentsError = CommonErrors;

/** Returns a specified deployment. */
export const getProjectsLocationsApisDeployments: API.OperationMethod<GetProjectsLocationsApisDeploymentsRequest, GetProjectsLocationsApisDeploymentsResponse, GetProjectsLocationsApisDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsApisDeploymentsRequest,
  output: GetProjectsLocationsApisDeploymentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsApisDeploymentsArtifactsRequest {
  /** Required. The parent, which owns this collection of artifacts. Format: `{parent}` */
  parent: string;
  /** Required. The ID to use for the artifact, which will become the final component of the artifact's resource name. This value should be 4-63 characters, and valid characters are /a-z-/. Following AIP-162, IDs must not have the form of a UUID. */
  artifactId?: string;
  /** Request body */
  body?: Artifact;
}

export const CreateProjectsLocationsApisDeploymentsArtifactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  artifactId: Schema.optional(Schema.String).pipe(T.HttpQuery("artifactId")),
  body: Schema.optional(Artifact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments/{deploymentsId}/artifacts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsApisDeploymentsArtifactsRequest>;

export type CreateProjectsLocationsApisDeploymentsArtifactsResponse = Artifact;
export const CreateProjectsLocationsApisDeploymentsArtifactsResponse = Artifact;

export type CreateProjectsLocationsApisDeploymentsArtifactsError = CommonErrors;

/** Creates a specified artifact. */
export const createProjectsLocationsApisDeploymentsArtifacts: API.OperationMethod<CreateProjectsLocationsApisDeploymentsArtifactsRequest, CreateProjectsLocationsApisDeploymentsArtifactsResponse, CreateProjectsLocationsApisDeploymentsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsApisDeploymentsArtifactsRequest,
  output: CreateProjectsLocationsApisDeploymentsArtifactsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsApisDeploymentsArtifactsRequest {
  /** Required. The name of the artifact to delete. Format: `{parent}/artifacts/*` */
  name: string;
}

export const DeleteProjectsLocationsApisDeploymentsArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments/{deploymentsId}/artifacts/{artifactsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApisDeploymentsArtifactsRequest>;

export type DeleteProjectsLocationsApisDeploymentsArtifactsResponse = Empty;
export const DeleteProjectsLocationsApisDeploymentsArtifactsResponse = Empty;

export type DeleteProjectsLocationsApisDeploymentsArtifactsError = CommonErrors;

/** Removes a specified artifact. */
export const deleteProjectsLocationsApisDeploymentsArtifacts: API.OperationMethod<DeleteProjectsLocationsApisDeploymentsArtifactsRequest, DeleteProjectsLocationsApisDeploymentsArtifactsResponse, DeleteProjectsLocationsApisDeploymentsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApisDeploymentsArtifactsRequest,
  output: DeleteProjectsLocationsApisDeploymentsArtifactsResponse,
  errors: [],
}));

export interface GetContentsProjectsLocationsApisDeploymentsArtifactsRequest {
  /** Required. The name of the artifact whose contents should be retrieved. Format: `{parent}/artifacts/*` */
  name: string;
}

export const GetContentsProjectsLocationsApisDeploymentsArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments/{deploymentsId}/artifacts/{artifactsId}:getContents" }),
  svc,
) as unknown as Schema.Schema<GetContentsProjectsLocationsApisDeploymentsArtifactsRequest>;

export type GetContentsProjectsLocationsApisDeploymentsArtifactsResponse = HttpBody;
export const GetContentsProjectsLocationsApisDeploymentsArtifactsResponse = HttpBody;

export type GetContentsProjectsLocationsApisDeploymentsArtifactsError = CommonErrors;

/** Returns the contents of a specified artifact. If artifacts are stored with GZip compression, the default behavior is to return the artifact uncompressed (the mime_type response field indicates the exact format returned). */
export const getContentsProjectsLocationsApisDeploymentsArtifacts: API.OperationMethod<GetContentsProjectsLocationsApisDeploymentsArtifactsRequest, GetContentsProjectsLocationsApisDeploymentsArtifactsResponse, GetContentsProjectsLocationsApisDeploymentsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetContentsProjectsLocationsApisDeploymentsArtifactsRequest,
  output: GetContentsProjectsLocationsApisDeploymentsArtifactsResponse,
  errors: [],
}));

export interface ReplaceArtifactProjectsLocationsApisDeploymentsArtifactsRequest {
  /** Resource name. */
  name: string;
  /** Request body */
  body?: Artifact;
}

export const ReplaceArtifactProjectsLocationsApisDeploymentsArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Artifact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments/{deploymentsId}/artifacts/{artifactsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplaceArtifactProjectsLocationsApisDeploymentsArtifactsRequest>;

export type ReplaceArtifactProjectsLocationsApisDeploymentsArtifactsResponse = Artifact;
export const ReplaceArtifactProjectsLocationsApisDeploymentsArtifactsResponse = Artifact;

export type ReplaceArtifactProjectsLocationsApisDeploymentsArtifactsError = CommonErrors;

/** Used to replace a specified artifact. */
export const replaceArtifactProjectsLocationsApisDeploymentsArtifacts: API.OperationMethod<ReplaceArtifactProjectsLocationsApisDeploymentsArtifactsRequest, ReplaceArtifactProjectsLocationsApisDeploymentsArtifactsResponse, ReplaceArtifactProjectsLocationsApisDeploymentsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplaceArtifactProjectsLocationsApisDeploymentsArtifactsRequest,
  output: ReplaceArtifactProjectsLocationsApisDeploymentsArtifactsResponse,
  errors: [],
}));

export interface GetProjectsLocationsApisDeploymentsArtifactsRequest {
  /** Required. The name of the artifact to retrieve. Format: `{parent}/artifacts/*` */
  name: string;
}

export const GetProjectsLocationsApisDeploymentsArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments/{deploymentsId}/artifacts/{artifactsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsApisDeploymentsArtifactsRequest>;

export type GetProjectsLocationsApisDeploymentsArtifactsResponse = Artifact;
export const GetProjectsLocationsApisDeploymentsArtifactsResponse = Artifact;

export type GetProjectsLocationsApisDeploymentsArtifactsError = CommonErrors;

/** Returns a specified artifact. */
export const getProjectsLocationsApisDeploymentsArtifacts: API.OperationMethod<GetProjectsLocationsApisDeploymentsArtifactsRequest, GetProjectsLocationsApisDeploymentsArtifactsResponse, GetProjectsLocationsApisDeploymentsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsApisDeploymentsArtifactsRequest,
  output: GetProjectsLocationsApisDeploymentsArtifactsResponse,
  errors: [],
}));

export interface ListProjectsLocationsApisDeploymentsArtifactsRequest {
  /** Required. The parent, which owns this collection of artifacts. Format: `{parent}` */
  parent: string;
  /** The maximum number of artifacts to return. The service may return fewer than this value. If unspecified, at most 50 values will be returned. The maximum is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListArtifacts` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListArtifacts` must match the call that provided the page token. */
  pageToken?: string;
  /** An expression that can be used to filter the list. Filters use the Common Expression Language and can refer to all message fields except contents. */
  filter?: string;
  /** A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in descending order using the "desc" identifier, e.g. "foo desc,bar" */
  orderBy?: string;
}

export const ListProjectsLocationsApisDeploymentsArtifactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/deployments/{deploymentsId}/artifacts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsApisDeploymentsArtifactsRequest>;

export type ListProjectsLocationsApisDeploymentsArtifactsResponse = ListArtifactsResponse;
export const ListProjectsLocationsApisDeploymentsArtifactsResponse = ListArtifactsResponse;

export type ListProjectsLocationsApisDeploymentsArtifactsError = CommonErrors;

/** Returns matching artifacts. */
export const listProjectsLocationsApisDeploymentsArtifacts: API.PaginatedOperationMethod<ListProjectsLocationsApisDeploymentsArtifactsRequest, ListProjectsLocationsApisDeploymentsArtifactsResponse, ListProjectsLocationsApisDeploymentsArtifactsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsApisDeploymentsArtifactsRequest,
  output: ListProjectsLocationsApisDeploymentsArtifactsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SetIamPolicyProjectsLocationsDocumentsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDocumentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/documents:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDocumentsRequest>;

export type SetIamPolicyProjectsLocationsDocumentsResponse = Policy;
export const SetIamPolicyProjectsLocationsDocumentsResponse = Policy;

export type SetIamPolicyProjectsLocationsDocumentsError = CommonErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsDocuments: API.OperationMethod<SetIamPolicyProjectsLocationsDocumentsRequest, SetIamPolicyProjectsLocationsDocumentsResponse, SetIamPolicyProjectsLocationsDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDocumentsRequest,
  output: SetIamPolicyProjectsLocationsDocumentsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsDocumentsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDocumentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/documents:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDocumentsRequest>;

export type TestIamPermissionsProjectsLocationsDocumentsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDocumentsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDocumentsError = CommonErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsDocuments: API.OperationMethod<TestIamPermissionsProjectsLocationsDocumentsRequest, TestIamPermissionsProjectsLocationsDocumentsResponse, TestIamPermissionsProjectsLocationsDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDocumentsRequest,
  output: TestIamPermissionsProjectsLocationsDocumentsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsDocumentsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsDocumentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/documents:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDocumentsRequest>;

export type GetIamPolicyProjectsLocationsDocumentsResponse = Policy;
export const GetIamPolicyProjectsLocationsDocumentsResponse = Policy;

export type GetIamPolicyProjectsLocationsDocumentsError = CommonErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsDocuments: API.OperationMethod<GetIamPolicyProjectsLocationsDocumentsRequest, GetIamPolicyProjectsLocationsDocumentsResponse, GetIamPolicyProjectsLocationsDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDocumentsRequest,
  output: GetIamPolicyProjectsLocationsDocumentsResponse,
  errors: [],
}));

export interface ListProjectsLocationsOperationsRequest {
  /** The standard list filter. */
  filter?: string;
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The name of the operation's parent resource. */
  name: string;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<ListProjectsLocationsOperationsRequest, ListProjectsLocationsOperationsResponse, ListProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = CommonErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

