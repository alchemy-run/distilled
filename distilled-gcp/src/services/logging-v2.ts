// ==========================================================================
// Cloud Logging API (logging v2)
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
  name: "logging",
  version: "v2",
  rootUrl: "https://logging.googleapis.com/",
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
  /** Role that is assigned to the list of members, or principals. For example, roles/viewer, roles/editor, or roles/owner.For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. members can have the following values: allUsers: A special identifier that represents anyone who is on the internet; with or without a Google account. allAuthenticatedUsers: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. user:{emailid}: An email address that represents a specific Google account. For example, alice@example.com . serviceAccount:{emailid}: An email address that represents a Google service account. For example, my-other-app@appspot.gserviceaccount.com. serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, my-project.svc.id.goog[my-namespace/my-kubernetes-sa]. group:{emailid}: An email address that represents a Google group. For example, admins@example.com. domain:{domain}: The G Suite domain (primary) that represents all the users of that domain. For example, google.com or example.com. principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}: A single identity in a workforce identity pool. principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}: All workforce identities in a group. principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}: All workforce identities with a specific attribute value. principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*: All identities in a workforce identity pool. principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}: A single identity in a workload identity pool. principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}: A workload identity pool group. principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}: All identities in a workload identity pool with a certain attribute. principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*: All identities in a workload identity pool. deleted:user:{emailid}?uid={uniqueid}: An email address (plus unique identifier) representing a user that has been recently deleted. For example, alice@example.com?uid=123456789012345678901. If the user is recovered, this value reverts to user:{emailid} and the recovered user retains the role in the binding. deleted:serviceAccount:{emailid}?uid={uniqueid}: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901. If the service account is undeleted, this value reverts to serviceAccount:{emailid} and the undeleted service account retains the role in the binding. deleted:group:{emailid}?uid={uniqueid}: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, admins@example.com?uid=123456789012345678901. If the group is recovered, this value reverts to group:{emailid} and the recovered group retains the role in the binding. deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}: Deleted single identity in a workforce identity pool. For example, deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value. */
  members?: Array<string>;
  /** The condition that is associated with this binding.If the condition evaluates to true, then this binding applies to the current request.If the condition evaluates to false, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** Specifies the format of the policy.Valid values are 0, 1, and 3. Requests that specify an invalid value are rejected.Any operation that affects conditional role bindings must specify version 3. This requirement applies to the following operations: Getting a policy that includes a conditional role binding Adding a conditional role binding to a policy Changing a conditional role binding in a policy Removing any role binding, with or without a condition, from a policy that includes conditionsImportant: If you use IAM Conditions, you must include the etag field whenever you call setIamPolicy. If you omit this field, then IAM allows you to overwrite a version 3 policy with a version 1 policy, and all of the conditions in the version 3 policy are lost.If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of members, or principals, with a role. Optionally, may specify a condition that determines how and when the bindings are applied. Each of the bindings must contain at least one principal.The bindings in a Policy can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the bindings grant 50 different roles to user:alice@example.com, and not to any other principal, then you can add another 1,450 principals to the bindings in the Policy. */
  bindings?: Array<Binding>;
  /** etag is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the etag in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An etag is returned in the response to getIamPolicy, and systems are expected to put that etag in the request to setIamPolicy to ensure that their change will be applied to the same version of the policy.Important: If you use IAM Conditions, you must include the etag field whenever you call setIamPolicy. If you omit this field, then IAM allows you to overwrite a version 3 policy with a version 1 policy, and all of the conditions in the version 3 policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the resource. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used:paths: "bindings, etag" */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> = Schema.suspend(() => Schema.Struct({
  requestedPolicyVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GetPolicyOptions" }) as any as Schema.Schema<GetPolicyOptions>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A GetPolicyOptions object for specifying options to GetIamPolicy. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(GetPolicyOptions),
})).annotate({ identifier: "GetIamPolicyRequest" }) as any as Schema.Schema<GetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the resource. Permissions with wildcards (such as * or storage.*) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of TestPermissionsRequest.permissions that the caller is allowed. */
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
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the name should be a resource name ending with operations/{unique_id}. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is false, it means the operation is still in progress. If true, the operation is completed, and either error or response is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as Delete, the response is google.protobuf.Empty. If the original method is standard Get/Create/Update, the response should be the resource. For other methods, the response should have the type XxxResponse, where Xxx is the original method name. For example, if the original method name is TakeSnapshot(), the inferred response type is TakeSnapshotResponse. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets ListOperationsRequest.return_partial_success and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: "projects/example-project/locations/us-east1" */
  name?: string;
  /** The canonical id for this location. For example: "us-east1". */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Location)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface IndexConfig {
  /** Required. The LogEntry field path to index.Note that some paths are automatically indexed, and other paths are not eligible for indexing. See indexing documentation( https://docs.cloud.google.com/logging/docs/analyze/custom-index) for details.For example: jsonPayload.request.status */
  fieldPath?: string;
  /** Required. The type of data in this index. */
  type?: "INDEX_TYPE_UNSPECIFIED" | "INDEX_TYPE_STRING" | "INDEX_TYPE_INTEGER" | (string & {});
  /** Output only. The timestamp when the index was last modified.This is used to return the timestamp, and will be ignored if supplied during update. */
  createTime?: string;
}

export const IndexConfig: Schema.Schema<IndexConfig> = Schema.suspend(() => Schema.Struct({
  fieldPath: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "IndexConfig" }) as any as Schema.Schema<IndexConfig>;

export interface CmekSettings {
  /** Output only. The resource name of the CMEK settings. */
  name?: string;
  /** Optional. The resource name for the configured Cloud KMS key.KMS key name format: "projects/[PROJECT_ID]/locations/[LOCATION]/keyRings/[KEYRING]/cryptoKeys/[KEY]" For example:"projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key"To enable CMEK for the Log Router, set this field to a valid kms_key_name for which the associated service account has the needed cloudkms.cryptoKeyEncrypterDecrypter roles assigned for the key.The Cloud KMS key used by the Log Router can be updated by changing the kms_key_name to a new valid key name or disabled by setting the key name to an empty string. Encryption operations that are in progress will be completed with the key that was in use when they started. Decryption operations will be completed using the key that was used at the time of encryption unless access to that key has been revoked.To disable CMEK for the Log Router, set this field to an empty string.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information. */
  kmsKeyName?: string;
  /** Output only. The CryptoKeyVersion resource name for the configured Cloud KMS key.KMS key name format: "projects/[PROJECT_ID]/locations/[LOCATION]/keyRings/[KEYRING]/cryptoKeys/[KEY]/cryptoKeyVersions/[VERSION]" For example:"projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key/cryptoKeyVersions/1"This is a read-only field used to convey the specific configured CryptoKeyVersion of kms_key that has been configured. It will be populated in cases where the CMEK settings are bound to a single key version.If this field is populated, the kms_key is tied to a specific CryptoKeyVersion. */
  kmsKeyVersionName?: string;
  /** Output only. The service account that will be used by the Log Router to access your Cloud KMS key.Before enabling CMEK for Log Router, you must first assign the cloudkms.cryptoKeyEncrypterDecrypter role to the service account that the Log Router will use to access your Cloud KMS key. Use GetCmekSettings to obtain the service account ID.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information. */
  serviceAccountId?: string;
}

export const CmekSettings: Schema.Schema<CmekSettings> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  kmsKeyName: Schema.optional(Schema.String),
  kmsKeyVersionName: Schema.optional(Schema.String),
  serviceAccountId: Schema.optional(Schema.String),
})).annotate({ identifier: "CmekSettings" }) as any as Schema.Schema<CmekSettings>;

export interface LogBucket {
  /** Output only. The resource name of the bucket.For example:projects/my-project/locations/global/buckets/my-bucketFor a list of supported locations, see Supported Regions (https://docs.cloud.google.com/logging/docs/region-support)For the location of global it is unspecified where log entries are actually stored.After a bucket has been created, the location cannot be changed. */
  name?: string;
  /** Optional. Describes this bucket. */
  description?: string;
  /** Output only. The creation timestamp of the bucket. This is not set for any of the default buckets. */
  createTime?: string;
  /** Output only. The last update timestamp of the bucket. */
  updateTime?: string;
  /** Optional. Logs will be retained by default for this amount of time, after which they will automatically be deleted. The minimum retention period is 1 day. If this value is set to zero at bucket creation time, the default time of 30 days will be used. */
  retentionDays?: number;
  /** Optional. Whether the bucket is locked.The retention period on a locked bucket cannot be changed. Locked buckets may only be deleted if they are empty. */
  locked?: boolean;
  /** Output only. The bucket lifecycle state. */
  lifecycleState?: "LIFECYCLE_STATE_UNSPECIFIED" | "ACTIVE" | "DELETE_REQUESTED" | "UPDATING" | "CREATING" | "FAILED" | (string & {});
  /** Optional. Whether log analytics is enabled for this bucket.Once enabled, log analytics features cannot be disabled. */
  analyticsEnabled?: boolean;
  /** Optional. Log entry field paths that are denied access in this bucket.The following fields and their children are eligible: textPayload, jsonPayload, protoPayload, httpRequest, labels, sourceLocation.Restricting a repeated field will restrict all values. Adding a parent will block all child fields. (e.g. foo.bar will block foo.bar.baz) */
  restrictedFields?: Array<string>;
  /** Optional. A list of indexed fields and related configuration data. */
  indexConfigs?: Array<IndexConfig>;
  /** Optional. The CMEK settings of the log bucket. If present, new log entries written to this log bucket are encrypted using the CMEK key provided in this configuration. If a log bucket has CMEK settings, the CMEK settings cannot be disabled later by updating the log bucket. Changing the KMS key is allowed. */
  cmekSettings?: CmekSettings;
}

export const LogBucket: Schema.Schema<LogBucket> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  retentionDays: Schema.optional(Schema.Number),
  locked: Schema.optional(Schema.Boolean),
  lifecycleState: Schema.optional(Schema.String),
  analyticsEnabled: Schema.optional(Schema.Boolean),
  restrictedFields: Schema.optional(Schema.Array(Schema.String)),
  indexConfigs: Schema.optional(Schema.Array(IndexConfig)),
  cmekSettings: Schema.optional(CmekSettings),
})).annotate({ identifier: "LogBucket" }) as any as Schema.Schema<LogBucket>;

export interface ListBucketsResponse {
  /** A list of buckets. */
  buckets?: Array<LogBucket>;
  /** If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken. */
  nextPageToken?: string;
}

export const ListBucketsResponse: Schema.Schema<ListBucketsResponse> = Schema.suspend(() => Schema.Struct({
  buckets: Schema.optional(Schema.Array(LogBucket)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListBucketsResponse" }) as any as Schema.Schema<ListBucketsResponse>;

export interface UndeleteBucketRequest {
}

export const UndeleteBucketRequest: Schema.Schema<UndeleteBucketRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UndeleteBucketRequest" }) as any as Schema.Schema<UndeleteBucketRequest>;

export interface LogView {
  /** Output only. The resource name of the view.For example:projects/my-project/locations/global/buckets/my-bucket/views/my-view */
  name?: string;
  /** Optional. Describes this view. */
  description?: string;
  /** Output only. The creation timestamp of the view. */
  createTime?: string;
  /** Output only. The last update timestamp of the view. */
  updateTime?: string;
  /** Optional. Filter that restricts which log entries in a bucket are visible in this view.Filters must be logical conjunctions that use the AND operator, and they can use any of the following qualifiers: SOURCE(), which specifies a project, folder, organization, or billing account of origin. resource.type, which specifies the resource type. LOG_ID(), which identifies the log.They can also use the negations of these qualifiers with the NOT operator.For example:SOURCE("projects/myproject") AND resource.type = "gce_instance" AND NOT LOG_ID("stdout") */
  filter?: string;
}

export const LogView: Schema.Schema<LogView> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "LogView" }) as any as Schema.Schema<LogView>;

export interface ListViewsResponse {
  /** A list of views. */
  views?: Array<LogView>;
  /** If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken. */
  nextPageToken?: string;
}

export const ListViewsResponse: Schema.Schema<ListViewsResponse> = Schema.suspend(() => Schema.Struct({
  views: Schema.optional(Schema.Array(LogView)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListViewsResponse" }) as any as Schema.Schema<ListViewsResponse>;

export interface LogScope {
  /** Output only. The resource name of the log scope.Log scopes are only available in the global location. For example:projects/my-project/locations/global/logScopes/my-log-scope */
  name?: string;
  /** Required. Names of one or more parent resources (organizations and folders are not supported.): projects/[PROJECT_ID]May alternatively be one or more views: projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]A log scope can include a maximum of 5 projects and a maximum of 100 resources in total. */
  resourceNames?: Array<string>;
  /** Optional. Describes this log scope.The maximum length of the description is 8000 characters. */
  description?: string;
  /** Output only. The creation timestamp of the log scope. */
  createTime?: string;
  /** Output only. The last update timestamp of the log scope. */
  updateTime?: string;
}

export const LogScope: Schema.Schema<LogScope> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  resourceNames: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "LogScope" }) as any as Schema.Schema<LogScope>;

export interface ListLogScopesResponse {
  /** A list of log scopes. */
  logScopes?: Array<LogScope>;
  /** If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken. */
  nextPageToken?: string;
}

export const ListLogScopesResponse: Schema.Schema<ListLogScopesResponse> = Schema.suspend(() => Schema.Struct({
  logScopes: Schema.optional(Schema.Array(LogScope)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLogScopesResponse" }) as any as Schema.Schema<ListLogScopesResponse>;

export interface LogExclusion {
  /** Optional. A client-assigned identifier, such as "load-balancer-exclusion". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. First character has to be alphanumeric. */
  name?: string;
  /** Optional. A description of this exclusion. */
  description?: string;
  /** Required. An advanced logs filter (https://docs.cloud.google.com/logging/docs/view/building-queries#queries-by-expression) that matches the log entries to be excluded. By using the sample function (https://docs.cloud.google.com/logging/docs/view/logging-query-language#sample), you can exclude less than 100% of the matching log entries.For example, the following query matches 99% of low-severity log entries from Google Cloud Storage buckets:resource.type=gcs_bucket severity<ERROR sample(insertId, 0.99) */
  filter?: string;
  /** Optional. If set to True, then this exclusion is disabled and it does not exclude any log entries. You can update an exclusion to change the value of this field. */
  disabled?: boolean;
  /** Output only. The creation timestamp of the exclusion.This field may not be present for older exclusions. */
  createTime?: string;
  /** Output only. The last update timestamp of the exclusion.This field may not be present for older exclusions. */
  updateTime?: string;
}

export const LogExclusion: Schema.Schema<LogExclusion> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "LogExclusion" }) as any as Schema.Schema<LogExclusion>;

export interface ListExclusionsResponse {
  /** A list of exclusions. */
  exclusions?: Array<LogExclusion>;
  /** If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken. */
  nextPageToken?: string;
}

export const ListExclusionsResponse: Schema.Schema<ListExclusionsResponse> = Schema.suspend(() => Schema.Struct({
  exclusions: Schema.optional(Schema.Array(LogExclusion)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListExclusionsResponse" }) as any as Schema.Schema<ListExclusionsResponse>;

export interface BigQueryOptions {
  /** Optional. Whether to use BigQuery's partition tables (https://docs.cloud.google.com/bigquery/docs/partitioned-tables). By default, Cloud Logging creates dated tables based on the log entries' timestamps, e.g. syslog_20170523. With partitioned tables the date suffix is no longer present and special query syntax (https://docs.cloud.google.com/bigquery/docs/querying-partitioned-tables) has to be used instead. In both cases, tables are sharded based on UTC timezone. */
  usePartitionedTables?: boolean;
  /** Output only. True if new timestamp column based partitioning is in use, false if legacy ingress-time partitioning is in use.All new sinks will have this field set true and will use timestamp column based partitioning. If use_partitioned_tables is false, this value has no meaning and will be false. Legacy sinks using partitioned tables will have this field set to false. */
  usesTimestampColumnPartitioning?: boolean;
}

export const BigQueryOptions: Schema.Schema<BigQueryOptions> = Schema.suspend(() => Schema.Struct({
  usePartitionedTables: Schema.optional(Schema.Boolean),
  usesTimestampColumnPartitioning: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "BigQueryOptions" }) as any as Schema.Schema<BigQueryOptions>;

export interface LogSink {
  /** Optional. The client-assigned sink identifier, unique within the project.For example: "my-syslog-errors-to-pubsub".Sink identifiers are limited to 100 characters and can include only the following characters: upper and lower-case alphanumeric characters, underscores, hyphens, periods.First character has to be alphanumeric. */
  name?: string;
  /** Output only. The resource name of the sink. "projects/[PROJECT_ID]/sinks/[SINK_NAME] "organizations/[ORGANIZATION_ID]/sinks/[SINK_NAME] "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_NAME] "folders/[FOLDER_ID]/sinks/[SINK_NAME] For example: projects/my_project/sinks/SINK_NAME */
  resourceName?: string;
  /** Required. The export destination: "storage.googleapis.com/[GCS_BUCKET]" "bigquery.googleapis.com/projects/[PROJECT_ID]/datasets/[DATASET]" "pubsub.googleapis.com/projects/[PROJECT_ID]/topics/[TOPIC_ID]" "logging.googleapis.com/projects/[PROJECT_ID]" "logging.googleapis.com/projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" The sink's writer_identity, set when the sink is created, must have permission to write to the destination or else the log entries are not exported. For more information, see Route logs to supported destinations (https://docs.cloud.google.com/logging/docs/export/configure_export_v2). */
  destination?: string;
  /** Optional. An advanced logs filter (https://docs.cloud.google.com/logging/docs/view/building-queries#queries-by-expression). The only exported log entries are those that are in the resource owning the sink and that match the filter.For example:logName="projects/[PROJECT_ID]/logs/[LOG_ID]" AND severity>=ERROR */
  filter?: string;
  /** Optional. A description of this sink.The maximum length of the description is 8000 characters. */
  description?: string;
  /** Optional. If set to true, then this sink is disabled and it does not export any log entries. */
  disabled?: boolean;
  /** Optional. Log entries that match any of these exclusion filters will not be exported.If a log entry is matched by both filter and one of exclusions it will not be exported. */
  exclusions?: Array<LogExclusion>;
  /** Deprecated. This field is unused. */
  outputVersionFormat?: "VERSION_FORMAT_UNSPECIFIED" | "V2" | "V1" | (string & {});
  /** Output only. An IAM identity—a service account or group—under which Cloud Logging writes the exported log entries to the sink's destination. This field is either set by specifying custom_writer_identity or set automatically by sinks.create and sinks.update based on the value of unique_writer_identity in those methods.Until you grant this identity write-access to the destination, log entry exports from this sink will fail. For more information, see Manage access to projects, folders, and organizations (https://docs.cloud.google.com/iam/docs/granting-roles-to-service-accounts#granting_access_to_a_service_account_for_a_resource). Consult the destination service's documentation to determine the appropriate IAM roles to assign to the identity.Sinks that have a destination that is a log bucket in the same project as the sink cannot have a writer_identity and no additional permissions are required. */
  writerIdentity?: string;
  /** Optional. This field applies only to sinks owned by organizations and folders. If the field is false, the default, only the logs owned by the sink's parent resource are available for export. If the field is true, then log entries from all the projects, folders, and billing accounts contained in the sink's parent resource are also available for export. Whether a particular log entry from the children is exported depends on the sink's filter expression.For example, if this field is true, then the filter resource.type=gce_instance would export all Compute Engine VM instance log entries from all projects in the sink's parent.To only export entries from certain child projects, filter on the project part of the log name:logName:("projects/test-project1/" OR "projects/test-project2/") AND resource.type=gce_instance */
  includeChildren?: boolean;
  /** Optional. This field applies only to sinks owned by organizations and folders.When the value of 'intercept_children' is true, the following restrictions apply: The sink must have the include_children flag set to true. The sink destination must be a Cloud project.Also, the following behaviors apply: Any logs matched by the sink won't be included by non-_Required sinks owned by child resources. The sink appears in the results of a ListSinks call from a child resource if the value of the filter field in its request is either 'in_scope("ALL")' or 'in_scope("ANCESTOR")'. */
  interceptChildren?: boolean;
  /** Optional. Options that affect sinks exporting data to BigQuery. */
  bigqueryOptions?: BigQueryOptions;
  /** Output only. The creation timestamp of the sink.This field may not be present for older sinks. */
  createTime?: string;
  /** Output only. The last update timestamp of the sink.This field may not be present for older sinks. */
  updateTime?: string;
}

export const LogSink: Schema.Schema<LogSink> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  exclusions: Schema.optional(Schema.Array(LogExclusion)),
  outputVersionFormat: Schema.optional(Schema.String),
  writerIdentity: Schema.optional(Schema.String),
  includeChildren: Schema.optional(Schema.Boolean),
  interceptChildren: Schema.optional(Schema.Boolean),
  bigqueryOptions: Schema.optional(BigQueryOptions),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "LogSink" }) as any as Schema.Schema<LogSink>;

export interface ListSinksResponse {
  /** A list of sinks. */
  sinks?: Array<LogSink>;
  /** If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken. */
  nextPageToken?: string;
}

export const ListSinksResponse: Schema.Schema<ListSinksResponse> = Schema.suspend(() => Schema.Struct({
  sinks: Schema.optional(Schema.Array(LogSink)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSinksResponse" }) as any as Schema.Schema<ListSinksResponse>;

export interface BigQueryDataset {
  /** Output only. The full resource name of the BigQuery dataset. The DATASET_ID will match the ID of the link, so the link must match the naming restrictions of BigQuery datasets (alphanumeric characters and underscores only).The dataset will have a resource path of "bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID" */
  datasetId?: string;
}

export const BigQueryDataset: Schema.Schema<BigQueryDataset> = Schema.suspend(() => Schema.Struct({
  datasetId: Schema.optional(Schema.String),
})).annotate({ identifier: "BigQueryDataset" }) as any as Schema.Schema<BigQueryDataset>;

export interface Link {
  /** Output only. The resource name of the link. The name can have up to 100 characters. A valid link id (at the end of the link name) must only have alphanumeric characters and underscores within it. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" For example:`projects/my-project/locations/global/buckets/my-bucket/links/my_link */
  name?: string;
  /** Optional. Describes this link.The maximum length of the description is 8000 characters. */
  description?: string;
  /** Output only. The creation timestamp of the link. */
  createTime?: string;
  /** Output only. The resource lifecycle state. */
  lifecycleState?: "LIFECYCLE_STATE_UNSPECIFIED" | "ACTIVE" | "DELETE_REQUESTED" | "UPDATING" | "CREATING" | "FAILED" | (string & {});
  /** Optional. The information of a BigQuery Dataset. When a link is created, a BigQuery dataset is created along with it, in the same project as the LogBucket it's linked to. This dataset will also have BigQuery Views corresponding to the LogViews in the bucket. */
  bigqueryDataset?: BigQueryDataset;
}

export const Link: Schema.Schema<Link> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  lifecycleState: Schema.optional(Schema.String),
  bigqueryDataset: Schema.optional(BigQueryDataset),
})).annotate({ identifier: "Link" }) as any as Schema.Schema<Link>;

export interface ListLinksResponse {
  /** A list of links. */
  links?: Array<Link>;
  /** If there might be more results than those appearing in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken. */
  nextPageToken?: string;
}

export const ListLinksResponse: Schema.Schema<ListLinksResponse> = Schema.suspend(() => Schema.Struct({
  links: Schema.optional(Schema.Array(Link)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLinksResponse" }) as any as Schema.Schema<ListLinksResponse>;

export interface DefaultSinkConfig {
  /** Optional. An advanced logs filter (https://docs.cloud.google.com/logging/docs/view/building-queries#queries-by-expression). The only exported log entries are those that are in the resource owning the sink and that match the filter.For example:logName="projects/[PROJECT_ID]/logs/[LOG_ID]" AND severity>=ERRORTo match all logs, don't add exclusions and use the following line as the value of filter:logName:*Cannot be empty or unset when the value of mode is OVERWRITE. */
  filter?: string;
  /** Optional. Specifies the set of exclusions to be added to the _Default sink in newly created resource containers. */
  exclusions?: Array<LogExclusion>;
  /** Required. Determines the behavior to apply to the built-in _Default sink inclusion filter.Exclusions are always appended, as built-in _Default sinks have no exclusions. */
  mode?: "FILTER_WRITE_MODE_UNSPECIFIED" | "APPEND" | "OVERWRITE" | (string & {});
}

export const DefaultSinkConfig: Schema.Schema<DefaultSinkConfig> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
  exclusions: Schema.optional(Schema.Array(LogExclusion)),
  mode: Schema.optional(Schema.String),
})).annotate({ identifier: "DefaultSinkConfig" }) as any as Schema.Schema<DefaultSinkConfig>;

export interface Settings {
  /** Output only. The resource name of the settings. */
  name?: string;
  /** Optional. The resource name for the configured Cloud KMS key.KMS key name format: "projects/[PROJECT_ID]/locations/[LOCATION]/keyRings/[KEYRING]/cryptoKeys/[KEY]" For example:"projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key"To enable CMEK, set this field to a valid kms_key_name for which the associated service account has the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key.The Cloud KMS key used by the Log Router can be updated by changing the kms_key_name to a new valid key name.To disable CMEK for the Log Router, set this field to an empty string.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information. */
  kmsKeyName?: string;
  /** Output only. The service account that will be used by the Log Router to access your Cloud KMS key.Before enabling CMEK, you must first assign the role roles/cloudkms.cryptoKeyEncrypterDecrypter to the service account that will be used to access your Cloud KMS key. Use GetSettings to obtain the service account ID.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information. */
  kmsServiceAccountId?: string;
  /** Optional. The storage location for the _Default and _Required log buckets of newly created projects and folders, unless the storage location is explicitly provided.Example value: europe-west1.Note: this setting does not affect the location of resources where a location is explicitly provided when created, such as custom log buckets. */
  storageLocation?: string;
  /** Optional. If set to true, the _Default sink in newly created projects and folders will created in a disabled state. This can be used to automatically disable log storage if there is already an aggregated sink configured in the hierarchy. The _Default sink can be re-enabled manually if needed. */
  disableDefaultSink?: boolean;
  /** Optional. Overrides the built-in configuration for _Default sink. */
  defaultSinkConfig?: DefaultSinkConfig;
  /** Output only. The service account for the given resource container, such as project or folder. Log sinks use this service account as their writer_identity if no custom service account is provided in the request when calling the create sink method. */
  loggingServiceAccountId?: string;
}

export const Settings: Schema.Schema<Settings> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  kmsKeyName: Schema.optional(Schema.String),
  kmsServiceAccountId: Schema.optional(Schema.String),
  storageLocation: Schema.optional(Schema.String),
  disableDefaultSink: Schema.optional(Schema.Boolean),
  defaultSinkConfig: Schema.optional(DefaultSinkConfig),
  loggingServiceAccountId: Schema.optional(Schema.String),
})).annotate({ identifier: "Settings" }) as any as Schema.Schema<Settings>;

export interface SummaryField {
  /** Optional. The field from the LogEntry to include in the summary line, for example resource.type or jsonPayload.name. */
  field?: string;
}

export const SummaryField: Schema.Schema<SummaryField> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
})).annotate({ identifier: "SummaryField" }) as any as Schema.Schema<SummaryField>;

export interface LoggingQuery {
  /** Required. An advanced query using the Logging Query Language (https://docs.cloud.google.com/logging/docs/view/logging-query-language). The maximum length of the filter is 20000 characters. */
  filter?: string;
  /** Optional. The set of summary fields to display for this saved query. */
  summaryFields?: Array<SummaryField>;
  /** Characters will be counted from the start of the string. */
  summaryFieldStart?: number;
  /** Characters will be counted from the end of the string. */
  summaryFieldEnd?: number;
}

export const LoggingQuery: Schema.Schema<LoggingQuery> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
  summaryFields: Schema.optional(Schema.Array(SummaryField)),
  summaryFieldStart: Schema.optional(Schema.Number),
  summaryFieldEnd: Schema.optional(Schema.Number),
})).annotate({ identifier: "LoggingQuery" }) as any as Schema.Schema<LoggingQuery>;

export interface FunctionApplication {
  /** Required. Specifies the aggregation function. Use one of the following string identifiers: "average": Computes the average (AVG). Applies only to numeric values. "count": Counts the number of values (COUNT). "count-distinct": Counts the number of distinct values (COUNT DISTINCT). "count-distinct-approx": Approximates the count of distinct values (APPROX_COUNT_DISTINCT). "max": Finds the maximum value (MAX). Applies only to numeric values. "min": Finds the minimum value (MIN). Applies only to numeric values. "sum": Computes the sum (SUM). Applies only to numeric values. */
  type?: string;
  /** Optional. Parameters to be applied to the aggregation. Aggregations that support or require parameters are listed above. */
  parameters?: Array<unknown>;
}

export const FunctionApplication: Schema.Schema<FunctionApplication> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Array(Schema.Unknown)),
})).annotate({ identifier: "FunctionApplication" }) as any as Schema.Schema<FunctionApplication>;

export interface ProjectedField {
  /** The field name. This will be the field that is selected using the dot notation to display the drill down value. */
  field?: string;
  /** Specifies the role of this field (direct selection, grouping, or aggregation). */
  operation?: "FIELD_OPERATION_UNSPECIFIED" | "NO_SETTING" | "GROUP_BY" | "AGGREGATE" | (string & {});
  /** The function to apply to the field. */
  sqlAggregationFunction?: FunctionApplication;
  /** The alias name for the field. Valid alias examples are: - single word alias: TestAlias - numbers in an alias: Alias123 - multi word alias should be enclosed in quotes: "Test Alias" Invalid alias examples are: - alias containing keywords: WHERE, SELECT, FROM, etc. - alias starting with a number: 1stAlias */
  alias?: string;
  /** The cast for the field. This can any SQL cast type. Examples: - STRING - CHAR - DATE - TIMESTAMP - DATETIME - INT - FLOAT */
  cast?: string;
  /** The re2 extraction for the field. This will be used to extract the value from the field using REGEXP_EXTRACT. More information on re2 can be found here: https://github.com/google/re2/wiki/Syntax. Meta characters like +?()| will need to be escaped. Examples: - ".(autoscaler.*)$" will be converted to REGEXP_EXTRACT(JSON_VALUE(field),"request(.*(autoscaler.*)$)")in SQL. - "\(test_value\)$" will be converted to REGEXP_EXTRACT(JSON_VALUE(field),"request(\(test_value\)$)") in SQL. */
  regexExtraction?: string;
  /** The truncation granularity when grouping by a time/date field. This will be used to truncate the field to the granularity specified. This can be either a date or a time granularity found at https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_trunc_granularity_date and https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_trunc_granularity_time respectively. */
  truncationGranularity?: string;
}

export const ProjectedField: Schema.Schema<ProjectedField> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
  operation: Schema.optional(Schema.String),
  sqlAggregationFunction: Schema.optional(FunctionApplication),
  alias: Schema.optional(Schema.String),
  cast: Schema.optional(Schema.String),
  regexExtraction: Schema.optional(Schema.String),
  truncationGranularity: Schema.optional(Schema.String),
})).annotate({ identifier: "ProjectedField" }) as any as Schema.Schema<ProjectedField>;

export interface FieldSource {
  /** The fully qualified, dot-delimited path to the selected atomic field (the leaf value). This path is used for primary selection and actions like drill-down or projection.The path components should match the exact field names or keys as they appear in the underlying data schema. For JSON fields, this means respecting the original casing (e.g., camelCase or snake_case as present in the JSON).To reference field names containing special characters (e.g., hyphens, spaces), enclose the individual path segment in backticks (`).Examples: * json_payload.labels.message * json_payload.request_id * httpRequest.status * json_payload.\my-custom-field`.value *jsonPayload.`my key with spaces`.data` */
  field?: string;
  /** The alias name for a field that has already been aliased within a different ProjectedField type elsewhere in the query model. The alias must be defined in the QueryBuilderConfig's field_sources list, otherwise the model is invalid. */
  aliasRef?: string;
  /** A projected field option for when a user wants to use a field with some additional transformations such as casting or extractions. */
  projectedField?: ProjectedField;
  /** Whether the field is a JSON field, or has a parent that is a JSON field. This value is used to determine JSON extractions in generated SQL queries. Note that this is_json flag may be true when the column_type is not JSON if the parent is a JSON field. Ex: - A json_payload.message field might have is_json=true, since the 'json_payload' parent is of type JSON, and columnType='STRING' if the 'message' field is of type STRING. */
  isJson?: boolean;
  /** The type of the selected field. This comes from the schema. Can be one of the BigQuery data types: - STRING - INT64 - FLOAT64 - BOOL - TIMESTAMP - DATE - RECORD - JSON */
  columnType?: string;
  /** The dot-delimited path of the parent container that holds the target field.This path defines the structural hierarchy and is essential for correctly generating SQL when field keys contain special characters (e.g., dots or brackets).Example: json_payload.labels (This points to the 'labels' object). This is an empty string if the target field is at the root level. */
  parentPath?: string;
}

export const FieldSource: Schema.Schema<FieldSource> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
  aliasRef: Schema.optional(Schema.String),
  projectedField: Schema.optional(ProjectedField),
  isJson: Schema.optional(Schema.Boolean),
  columnType: Schema.optional(Schema.String),
  parentPath: Schema.optional(Schema.String),
})).annotate({ identifier: "FieldSource" }) as any as Schema.Schema<FieldSource>;

export interface FilterExpression {
  /** Can be one of the FieldSource types: field name, alias ref, variable ref, or a literal value. */
  fieldSource?: FieldSource;
  /** The Value will be used to hold user defined constants set as the Right Hand Side of the filter. */
  literalValue?: unknown;
  /** The field. This will be the field that is set as the Right Hand Side of the filter. */
  fieldSourceValue?: FieldSource;
  /** The comparison type to use for the filter. */
  comparator?: "COMPARATOR_UNSPECIFIED" | "EQUALS" | "MATCHES_REGEXP" | "GREATER_THAN" | "LESS_THAN" | "GREATER_THAN_EQUALS" | "LESS_THAN_EQUALS" | "IS_NULL" | "IN" | "LIKE" | (string & {});
  /** Determines if the NOT flag should be added to the comparator. */
  isNegation?: boolean;
}

export const FilterExpression: Schema.Schema<FilterExpression> = Schema.suspend(() => Schema.Struct({
  fieldSource: Schema.optional(FieldSource),
  literalValue: Schema.optional(Schema.Unknown),
  fieldSourceValue: Schema.optional(FieldSource),
  comparator: Schema.optional(Schema.String),
  isNegation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "FilterExpression" }) as any as Schema.Schema<FilterExpression>;

export interface FilterPredicate {
  /** The operator type for the filter. Currently there is no support for multiple levels of nesting, so this will be a single value with no joining of different operator types */
  operatorType?: "OPERATOR_TYPE_UNSPECIFIED" | "AND" | "OR" | "LEAF" | (string & {});
  /** The leaves of the filter predicate. This equates to the last leaves of the filter predicate associated with an operator. */
  leafPredicate?: FilterExpression;
  /** The children of the filter predicate. This equates to the branches of the filter predicate that could contain further nested leaves. */
  childPredicates?: Array<FilterPredicate>;
}

export const FilterPredicate: Schema.Schema<FilterPredicate> = Schema.suspend(() => Schema.Struct({
  operatorType: Schema.optional(Schema.String),
  leafPredicate: Schema.optional(FilterExpression),
  childPredicates: Schema.optional(Schema.Array(FilterPredicate)),
})).annotate({ identifier: "FilterPredicate" }) as any as Schema.Schema<FilterPredicate>;

export interface SortOrderParameter {
  /** The field to sort on. Can be one of the FieldSource types: field name, alias ref, variable ref, or a literal value. */
  fieldSource?: FieldSource;
  /** The sort order to use for the query. */
  sortOrderDirection?: "SORT_ORDER_UNSPECIFIED" | "SORT_ORDER_NONE" | "SORT_ORDER_ASCENDING" | "SORT_ORDER_DESCENDING" | (string & {});
}

export const SortOrderParameter: Schema.Schema<SortOrderParameter> = Schema.suspend(() => Schema.Struct({
  fieldSource: Schema.optional(FieldSource),
  sortOrderDirection: Schema.optional(Schema.String),
})).annotate({ identifier: "SortOrderParameter" }) as any as Schema.Schema<SortOrderParameter>;

export interface QueryBuilderConfig {
  /** Required. The view/resource to query. For now only a single view/resource will be sent, but there are plans to allow multiple views in the future. Marking as repeated for that purpose. Example: - "projects/123/locations/global/buckets/456/views/_Default" - "projects/123/locations/global/metricBuckets/456/views/_Default" */
  resourceNames?: Array<string>;
  /** The filter to use for the query. This equates to the WHERE clause in SQL. */
  filter?: FilterPredicate;
  /** Defines the items to include in the query result, analogous to a SQL SELECT clause. */
  fieldSources?: Array<FieldSource>;
  /** The limit to use for the query. This equates to the LIMIT clause in SQL. A limit of 0 will be treated as not enabled. */
  limit?: string;
  /** The sort orders to use for the query. This equates to the ORDER BY clause in SQL. */
  orderBys?: Array<SortOrderParameter>;
  /** The plain text search to use for the query. There is no support for multiple search terms. This uses the SEARCH functionality in BigQuery. For example, a search_term = 'ERROR' would result in the following SQL:SELECT * FROM resource WHERE SEARCH(resource, 'ERROR') LIMIT 100 */
  searchTerm?: string;
}

export const QueryBuilderConfig: Schema.Schema<QueryBuilderConfig> = Schema.suspend(() => Schema.Struct({
  resourceNames: Schema.optional(Schema.Array(Schema.String)),
  filter: Schema.optional(FilterPredicate),
  fieldSources: Schema.optional(Schema.Array(FieldSource)),
  limit: Schema.optional(Schema.String),
  orderBys: Schema.optional(Schema.Array(SortOrderParameter)),
  searchTerm: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryBuilderConfig" }) as any as Schema.Schema<QueryBuilderConfig>;

export interface OpsAnalyticsQuery {
  /** Optional. A Log Analytics SQL query in text format.If both sql_query_text and query_builder fields are set, then the sql_query_text will be used, if its non-empty. At least one of the two fields must be set. */
  sqlQueryText?: string;
  /** Optional. A query builder configuration used in Log Analytics.If both query_builder and sql_query_text fields are set, then the sql_query_text will be used, if its non-empty. At least one of the two fields must be set. */
  queryBuilder?: QueryBuilderConfig;
}

export const OpsAnalyticsQuery: Schema.Schema<OpsAnalyticsQuery> = Schema.suspend(() => Schema.Struct({
  sqlQueryText: Schema.optional(Schema.String),
  queryBuilder: Schema.optional(QueryBuilderConfig),
})).annotate({ identifier: "OpsAnalyticsQuery" }) as any as Schema.Schema<OpsAnalyticsQuery>;

export interface SavedQuery {
  /** Output only. Resource name of the saved query.In the format: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" For a list of supported locations, see Supported Regions (https://docs.cloud.google.com/logging/docs/region-support#bucket-regions)After the saved query is created, the location cannot be changed.If the user doesn't provide a QUERY_ID, the system will generate an alphanumeric ID. */
  name?: string;
  /** Required. The user specified title for the SavedQuery. */
  displayName?: string;
  /** Optional. A human readable description of the saved query. */
  description?: string;
  /** Logging query that can be executed in Logs Explorer or via Logging API. */
  loggingQuery?: LoggingQuery;
  /** Analytics query that can be executed in Log Analytics. */
  opsAnalyticsQuery?: OpsAnalyticsQuery;
  /** Output only. The timestamp when the saved query was created. */
  createTime?: string;
  /** Output only. The timestamp when the saved query was last updated. */
  updateTime?: string;
  /** Required. The visibility status of this query, which determines its ownership. */
  visibility?: "VISIBILITY_UNSPECIFIED" | "PRIVATE" | "SHARED" | (string & {});
}

export const SavedQuery: Schema.Schema<SavedQuery> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  loggingQuery: Schema.optional(LoggingQuery),
  opsAnalyticsQuery: Schema.optional(OpsAnalyticsQuery),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  visibility: Schema.optional(Schema.String),
})).annotate({ identifier: "SavedQuery" }) as any as Schema.Schema<SavedQuery>;

export interface ListSavedQueriesResponse {
  /** A list of saved queries. */
  savedQueries?: Array<SavedQuery>;
  /** If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken. */
  nextPageToken?: string;
  /** The unreachable resources. It can be either 1) a saved query if a specific query is unreachable or 2) a location if a specific location is unreachabe. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example: "projects/my-project/locations/global/savedQueries/12345678" "projects/my-project/locations/global" If there are unreachable resources, the response will first return pages that contain saved queries, and then return pages that contain the unreachable resources. */
  unreachable?: Array<string>;
}

export const ListSavedQueriesResponse: Schema.Schema<ListSavedQueriesResponse> = Schema.suspend(() => Schema.Struct({
  savedQueries: Schema.optional(Schema.Array(SavedQuery)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListSavedQueriesResponse" }) as any as Schema.Schema<ListSavedQueriesResponse>;

export interface RecentQuery {
  /** Output only. Resource name of the recent query.In the format: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/recentQueries/[QUERY_ID]" For a list of supported locations, see Supported Regions (https://docs.cloud.google.com/logging/docs/region-support)The QUERY_ID is a system generated alphanumeric ID. */
  name?: string;
  /** Logging query that can be executed in Logs Explorer or via Logging API. */
  loggingQuery?: LoggingQuery;
  /** Analytics query that can be executed in Log Analytics. */
  opsAnalyticsQuery?: OpsAnalyticsQuery;
  /** Output only. The timestamp when this query was last run. */
  lastRunTime?: string;
}

export const RecentQuery: Schema.Schema<RecentQuery> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  loggingQuery: Schema.optional(LoggingQuery),
  opsAnalyticsQuery: Schema.optional(OpsAnalyticsQuery),
  lastRunTime: Schema.optional(Schema.String),
})).annotate({ identifier: "RecentQuery" }) as any as Schema.Schema<RecentQuery>;

export interface ListRecentQueriesResponse {
  /** A list of recent queries. */
  recentQueries?: Array<RecentQuery>;
  /** If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken. */
  nextPageToken?: string;
  /** The unreachable resources. Each resource can be either 1) a saved query if a specific query is unreachable or 2) a location if a specific location is unreachable. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/recentQueries/[QUERY_ID]" "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global/recentQueries/12345678" "projects/my-project/locations/global"If there are unreachable resources, the response will first return pages that contain recent queries, and then return pages that contain the unreachable resources. */
  unreachable?: Array<string>;
}

export const ListRecentQueriesResponse: Schema.Schema<ListRecentQueriesResponse> = Schema.suspend(() => Schema.Struct({
  recentQueries: Schema.optional(Schema.Array(RecentQuery)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListRecentQueriesResponse" }) as any as Schema.Schema<ListRecentQueriesResponse>;

export interface CopyLogEntriesRequest {
  /** Required. Log bucket from which to copy log entries.For example:"projects/my-project/locations/global/buckets/my-source-bucket" */
  name?: string;
  /** Optional. A filter specifying which log entries to copy. The filter must be no more than 20k characters. An empty filter matches all log entries. */
  filter?: string;
  /** Required. Destination to which to copy log entries. For example: "storage.googleapis.com/GCS_BUCKET" */
  destination?: string;
}

export const CopyLogEntriesRequest: Schema.Schema<CopyLogEntriesRequest> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
})).annotate({ identifier: "CopyLogEntriesRequest" }) as any as Schema.Schema<CopyLogEntriesRequest>;

export interface MonitoredResource {
  /** Required. The monitored resource type. This field must match the type field of a MonitoredResourceDescriptor object. For example, the type of a Compute Engine VM instance is gce_instance. Some descriptors include the service name in the type; for example, the type of a Datastream stream is datastream.googleapis.com/Stream. */
  type?: string;
  /** Required. Values for all of the labels listed in the associated monitored resource descriptor. For example, Compute Engine VM instances use the labels "project_id", "instance_id", and "zone". */
  labels?: Record<string, string>;
}

export const MonitoredResource: Schema.Schema<MonitoredResource> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "MonitoredResource" }) as any as Schema.Schema<MonitoredResource>;

export interface HttpRequest {
  /** The request method. Examples: "GET", "HEAD", "PUT", "POST". */
  requestMethod?: string;
  /** The scheme (http, https), the host name, the path and the query portion of the URL that was requested. Example: "http://example.com/some/info?color=red". */
  requestUrl?: string;
  /** The size of the HTTP request message in bytes, including the request headers and the request body. */
  requestSize?: string;
  /** The response code indicating the status of response. Examples: 200, 404. */
  status?: number;
  /** The size of the HTTP response message sent back to the client, in bytes, including the response headers and the response body. */
  responseSize?: string;
  /** The user agent sent by the client. Example: "Mozilla/4.0 (compatible; MSIE 6.0; Windows 98; Q312461; .NET CLR 1.0.3705)". */
  userAgent?: string;
  /** The IP address (IPv4 or IPv6) of the client that issued the HTTP request. This field can include port information. Examples: "192.168.1.1", "10.0.0.1:80", "FE80::0202:B3FF:FE1E:8329". */
  remoteIp?: string;
  /** The IP address (IPv4 or IPv6) of the origin server that the request was sent to. This field can include port information. Examples: "192.168.1.1", "10.0.0.1:80", "FE80::0202:B3FF:FE1E:8329". */
  serverIp?: string;
  /** The referer URL of the request, as defined in HTTP/1.1 Header Field Definitions (https://datatracker.ietf.org/doc/html/rfc2616#section-14.36). */
  referer?: string;
  /** The request processing latency on the server, from the time the request was received until the response was sent. For WebSocket connections, this field refers to the entire time duration of the connection. */
  latency?: string;
  /** Whether or not a cache lookup was attempted. */
  cacheLookup?: boolean;
  /** Whether or not an entity was served from cache (with or without validation). */
  cacheHit?: boolean;
  /** Whether or not the response was validated with the origin server before being served from cache. This field is only meaningful if cache_hit is True. */
  cacheValidatedWithOriginServer?: boolean;
  /** The number of HTTP response bytes inserted into cache. Set only when a cache fill was attempted. */
  cacheFillBytes?: string;
  /** Protocol used for the request. Examples: "HTTP/1.1", "HTTP/2" */
  protocol?: string;
}

export const HttpRequest: Schema.Schema<HttpRequest> = Schema.suspend(() => Schema.Struct({
  requestMethod: Schema.optional(Schema.String),
  requestUrl: Schema.optional(Schema.String),
  requestSize: Schema.optional(Schema.String),
  status: Schema.optional(Schema.Number),
  responseSize: Schema.optional(Schema.String),
  userAgent: Schema.optional(Schema.String),
  remoteIp: Schema.optional(Schema.String),
  serverIp: Schema.optional(Schema.String),
  referer: Schema.optional(Schema.String),
  latency: Schema.optional(Schema.String),
  cacheLookup: Schema.optional(Schema.Boolean),
  cacheHit: Schema.optional(Schema.Boolean),
  cacheValidatedWithOriginServer: Schema.optional(Schema.Boolean),
  cacheFillBytes: Schema.optional(Schema.String),
  protocol: Schema.optional(Schema.String),
})).annotate({ identifier: "HttpRequest" }) as any as Schema.Schema<HttpRequest>;

export interface MonitoredResourceMetadata {
  /** Output only. Values for predefined system metadata labels. System labels are a kind of metadata extracted by Google, including "machine_image", "vpc", "subnet_id", "security_group", "name", etc. System label values can be only strings, Boolean values, or a list of strings. For example: { "name": "my-test-instance", "security_group": ["a", "b", "c"], "spot_instance": false } */
  systemLabels?: Record<string, unknown>;
  /** Output only. A map of user-defined metadata labels. */
  userLabels?: Record<string, string>;
}

export const MonitoredResourceMetadata: Schema.Schema<MonitoredResourceMetadata> = Schema.suspend(() => Schema.Struct({
  systemLabels: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  userLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "MonitoredResourceMetadata" }) as any as Schema.Schema<MonitoredResourceMetadata>;

export interface LogEntryOperation {
  /** Optional. An arbitrary operation identifier. Log entries with the same identifier are assumed to be part of the same operation. */
  id?: string;
  /** Optional. An arbitrary producer identifier. The combination of id and producer must be globally unique. Examples for producer: "MyDivision.MyBigCompany.com", "github.com/MyProject/MyApplication". */
  producer?: string;
  /** Optional. Set this to True if this is the first log entry in the operation. */
  first?: boolean;
  /** Optional. Set this to True if this is the last log entry in the operation. */
  last?: boolean;
}

export const LogEntryOperation: Schema.Schema<LogEntryOperation> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  producer: Schema.optional(Schema.String),
  first: Schema.optional(Schema.Boolean),
  last: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "LogEntryOperation" }) as any as Schema.Schema<LogEntryOperation>;

export interface LogEntrySourceLocation {
  /** Optional. Source file name. Depending on the runtime environment, this might be a simple name or a fully-qualified name. */
  file?: string;
  /** Optional. Line within the source file. 1-based; 0 indicates no line number available. */
  line?: string;
  /** Optional. Human-readable name of the function or method being invoked, with optional context such as the class or package name. This information may be used in contexts such as the logs viewer, where a file and line number are less meaningful. The format can vary by language. For example: qual.if.ied.Class.method (Java), dir/package.func (Go), function (Python). */
  function?: string;
}

export const LogEntrySourceLocation: Schema.Schema<LogEntrySourceLocation> = Schema.suspend(() => Schema.Struct({
  file: Schema.optional(Schema.String),
  line: Schema.optional(Schema.String),
  function: Schema.optional(Schema.String),
})).annotate({ identifier: "LogEntrySourceLocation" }) as any as Schema.Schema<LogEntrySourceLocation>;

export interface LogSplit {
  /** A globally unique identifier for all log entries in a sequence of split log entries. All log entries with the same |LogSplit.uid| are assumed to be part of the same sequence of split log entries. */
  uid?: string;
  /** The index of this LogEntry in the sequence of split log entries. Log entries are given |index| values 0, 1, ..., n-1 for a sequence of n log entries. */
  index?: number;
  /** The total number of log entries that the original LogEntry was split into. */
  totalSplits?: number;
}

export const LogSplit: Schema.Schema<LogSplit> = Schema.suspend(() => Schema.Struct({
  uid: Schema.optional(Schema.String),
  index: Schema.optional(Schema.Number),
  totalSplits: Schema.optional(Schema.Number),
})).annotate({ identifier: "LogSplit" }) as any as Schema.Schema<LogSplit>;

export interface LogErrorGroup {
  /** The id is a unique identifier for a particular error group; it is the last part of the error group resource name: /project/[PROJECT_ID]/errors/[ERROR_GROUP_ID]. Example: COShysOX0r_51QE. The id is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see Google Cloud Privacy Notice (https://cloud.google.com/terms/cloud-privacy-notice). */
  id?: string;
}

export const LogErrorGroup: Schema.Schema<LogErrorGroup> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "LogErrorGroup" }) as any as Schema.Schema<LogErrorGroup>;

export interface AppHubApplication {
  /** Resource container that owns the application. Example: "projects/management_project" */
  container?: string;
  /** Location associated with the Application. Example: "us-east1" */
  location?: string;
  /** Application Id. Example: "my-app" */
  id?: string;
}

export const AppHubApplication: Schema.Schema<AppHubApplication> = Schema.suspend(() => Schema.Struct({
  container: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "AppHubApplication" }) as any as Schema.Schema<AppHubApplication>;

export interface AppHubService {
  /** Service Id. Example: "my-service" */
  id?: string;
  /** Service environment type Example: "DEV" */
  environmentType?: string;
  /** Service criticality type Example: "CRITICAL" */
  criticalityType?: string;
}

export const AppHubService: Schema.Schema<AppHubService> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  environmentType: Schema.optional(Schema.String),
  criticalityType: Schema.optional(Schema.String),
})).annotate({ identifier: "AppHubService" }) as any as Schema.Schema<AppHubService>;

export interface AppHubWorkload {
  /** Workload Id. Example: "my-workload" */
  id?: string;
  /** Workload environment type Example: "DEV" */
  environmentType?: string;
  /** Workload criticality type Example: "CRITICAL" */
  criticalityType?: string;
}

export const AppHubWorkload: Schema.Schema<AppHubWorkload> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  environmentType: Schema.optional(Schema.String),
  criticalityType: Schema.optional(Schema.String),
})).annotate({ identifier: "AppHubWorkload" }) as any as Schema.Schema<AppHubWorkload>;

export interface AppHub {
  /** Metadata associated with the application. */
  application?: AppHubApplication;
  /** Metadata associated with the service. */
  service?: AppHubService;
  /** Metadata associated with the workload. */
  workload?: AppHubWorkload;
}

export const AppHub: Schema.Schema<AppHub> = Schema.suspend(() => Schema.Struct({
  application: Schema.optional(AppHubApplication),
  service: Schema.optional(AppHubService),
  workload: Schema.optional(AppHubWorkload),
})).annotate({ identifier: "AppHub" }) as any as Schema.Schema<AppHub>;

export interface LogEntry {
  /** Required. The resource name of the log to which this log entry belongs: "projects/[PROJECT_ID]/logs/[LOG_ID]" "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]" "folders/[FOLDER_ID]/logs/[LOG_ID]" A project number may be used in place of PROJECT_ID. The project number is translated to its corresponding PROJECT_ID internally and the log_name field will contain PROJECT_ID in queries and exports.[LOG_ID] must be URL-encoded within log_name. Example: "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity".[LOG_ID] must be less than 512 characters long and can only include the following characters: upper and lower case alphanumeric characters, forward-slash, underscore, hyphen, and period.For backward compatibility, if log_name begins with a forward-slash, such as /projects/..., then the log entry is processed as usual, but the forward-slash is removed. Listing the log entry will not show the leading slash and filtering for a log name with a leading slash will never return any results. */
  logName?: string;
  /** Required. The monitored resource that produced this log entry.Example: a log entry that reports a database error would be associated with the monitored resource designating the particular database that reported the error. */
  resource?: MonitoredResource;
  /** The log entry payload, represented as a protocol buffer. Some Google Cloud Platform services use this field for their log entry payloads.The following protocol buffer types are supported; user-defined types are not supported:"type.googleapis.com/google.cloud.audit.AuditLog" "type.googleapis.com/google.appengine.logging.v1.RequestLog" */
  protoPayload?: Record<string, unknown>;
  /** The log entry payload, represented as a Unicode string (UTF-8). */
  textPayload?: string;
  /** The log entry payload, represented as a structure that is expressed as a JSON object. */
  jsonPayload?: Record<string, unknown>;
  /** Optional. The time the event described by the log entry occurred. This time is used to compute the log entry's age and to enforce the logs retention period. If this field is omitted in a new log entry, then Logging assigns it the current time. Timestamps have nanosecond accuracy, but trailing zeros in the fractional seconds might be omitted when the timestamp is displayed.Incoming log entries must have timestamps that don't exceed the logs retention period (https://cloud.google.com/logging/quotas#logs_retention_periods) in the past, and that don't exceed 24 hours in the future. Log entries outside those time boundaries are rejected by Logging. */
  timestamp?: string;
  /** Output only. The time the log entry was received by Logging. */
  receiveTimestamp?: string;
  /** Optional. The severity of the log entry. The default value is LogSeverity.DEFAULT. */
  severity?: "DEFAULT" | "DEBUG" | "INFO" | "NOTICE" | "WARNING" | "ERROR" | "CRITICAL" | "ALERT" | "EMERGENCY" | (string & {});
  /** Optional. A unique identifier for the log entry. If you provide a value, then Logging considers other log entries in the same project, with the same timestamp, and with the same insert_id to be duplicates which are removed in a single query result. However, there are no guarantees of de-duplication in the export of logs.If the insert_id is omitted when writing a log entry, the Logging API assigns its own unique identifier in this field.In queries, the insert_id is also used to order log entries that have the same log_name and timestamp values. */
  insertId?: string;
  /** Optional. Information about the HTTP request associated with this log entry, if applicable. */
  httpRequest?: HttpRequest;
  /** Optional. A map of key, value pairs that provides additional information about the log entry. The labels can be user-defined or system-defined.User-defined labels are arbitrary key, value pairs that you can use to classify logs.System-defined labels are defined by cloud services for platform logs. They have two components - a service namespace component and the attribute name. For example: compute.googleapis.com/resource_name.Cloud Logging truncates label keys that exceed 512 B and label values that exceed 64 KB upon their associated log entry being written. The truncation is indicated by an ellipsis at the end of the character string. */
  labels?: Record<string, string>;
  /** Output only. Deprecated. This field is not used by Logging. Any value written to it is cleared. */
  metadata?: MonitoredResourceMetadata;
  /** Optional. Information about an operation associated with the log entry, if applicable. */
  operation?: LogEntryOperation;
  /** Optional. The trace ID being written to Cloud Trace (https://docs.cloud.google.com/trace/docs) in association with this log entry. For example, if your trace data is stored in the Cloud project "my-trace-project" and if the service that is creating the log entry receives a trace header that includes the trace ID "12345", then the service should use "12345".The REST resource name of the trace is also supported, but using this format is not recommended. An example trace REST resource name is similar to "projects/my-trace-project/traces/12345".The trace field provides the link between logs and traces. By using this field, you can navigate from a log entry to a trace. */
  trace?: string;
  /** Optional. The ID of the Cloud Trace (https://docs.cloud.google.com/trace/docs) span associated with the current operation in which the log is being written.A Span (https://docs.cloud.google.com/trace/docs/reference/v2/rest/v2/projects.traces/batchWrite#Span) represents a single operation within a trace. Whereas a trace may involve multiple different microservices running on multiple different machines, a span generally corresponds to a single logical operation being performed in a single instance of a microservice on one specific machine. Spans are the nodes within the tree that is a trace.Applications that are instrumented for tracing (https://docs.cloud.google.com/trace/docs/setup) will generally assign a new, unique span ID on each incoming request. It is also common to create and record additional spans corresponding to internal processing elements as well as issuing requests to dependencies.The span ID is expected to be a 16-character, hexadecimal encoding of an 8-byte array and should not be zero. It should be unique within the trace and should, ideally, be generated in a manner that is uniformly random.Example values: 000000000000004a 7a2190356c3fc94b 0000f00300090021 d39223e101960076 */
  spanId?: string;
  /** Optional. The sampling decision of the span associated with the log entry at the time the log entry was created. This field corresponds to the sampled flag in the W3C trace-context specification (https://www.w3.org/TR/trace-context/#sampled-flag). A non-sampled trace value is still useful as a request correlation identifier. The default is False. */
  traceSampled?: boolean;
  /** Optional. Source code location information associated with the log entry, if any. */
  sourceLocation?: LogEntrySourceLocation;
  /** Optional. Information indicating this LogEntry is part of a sequence of multiple log entries split from a single LogEntry. */
  split?: LogSplit;
  /** Output only. The Error Reporting (https://cloud.google.com/error-reporting) error groups associated with this LogEntry. Error Reporting sets the values for this field during error group creation.For more information, see View error details( https://cloud.google.com/error-reporting/docs/viewing-errors#view_error_details)This field isn't available during log routing (https://cloud.google.com/logging/docs/routing/overview) */
  errorGroups?: Array<LogErrorGroup>;
  /** Output only. AppHub application metadata associated with this LogEntry. May be empty if there is no associated AppHub application or multiple associated applications (such as for VPC flow logs) */
  apphub?: AppHub;
  /** Output only. AppHub application metadata associated with the destination application. This is only populated if the log represented "edge"-like data (such as for VPC flow logs) with a destination. */
  apphubDestination?: AppHub;
  /** Output only. AppHub application metadata associated with the source application. This is only populated if the log represented "edge"-like data (such as for VPC flow logs) with a source. */
  apphubSource?: AppHub;
}

export const LogEntry: Schema.Schema<LogEntry> = Schema.suspend(() => Schema.Struct({
  logName: Schema.optional(Schema.String),
  resource: Schema.optional(MonitoredResource),
  protoPayload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  textPayload: Schema.optional(Schema.String),
  jsonPayload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  timestamp: Schema.optional(Schema.String),
  receiveTimestamp: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  insertId: Schema.optional(Schema.String),
  httpRequest: Schema.optional(HttpRequest),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(MonitoredResourceMetadata),
  operation: Schema.optional(LogEntryOperation),
  trace: Schema.optional(Schema.String),
  spanId: Schema.optional(Schema.String),
  traceSampled: Schema.optional(Schema.Boolean),
  sourceLocation: Schema.optional(LogEntrySourceLocation),
  split: Schema.optional(LogSplit),
  errorGroups: Schema.optional(Schema.Array(LogErrorGroup)),
  apphub: Schema.optional(AppHub),
  apphubDestination: Schema.optional(AppHub),
  apphubSource: Schema.optional(AppHub),
})).annotate({ identifier: "LogEntry" }) as any as Schema.Schema<LogEntry>;

export interface WriteLogEntriesRequest {
  /** Optional. A default log resource name that is assigned to all log entries in entries that do not specify a value for log_name: projects/[PROJECT_ID]/logs/[LOG_ID] organizations/[ORGANIZATION_ID]/logs/[LOG_ID] billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID] folders/[FOLDER_ID]/logs/[LOG_ID][LOG_ID] must be URL-encoded. For example: "projects/my-project-id/logs/syslog" "organizations/123/logs/cloudaudit.googleapis.com%2Factivity" The permission logging.logEntries.create is needed on each project, organization, billing account, or folder that is receiving new log entries, whether the resource is specified in logName or in an individual log entry. */
  logName?: string;
  /** Optional. A default monitored resource object that is assigned to all log entries in entries that do not specify a value for resource. Example: { "type": "gce_instance", "labels": { "zone": "us-central1-a", "instance_id": "00000000000000000000" }} See LogEntry. */
  resource?: MonitoredResource;
  /** Optional. Default labels that are added to the labels field of all log entries in entries. If a log entry already has a label with the same key as a label in this parameter, then the log entry's label is not changed. See LogEntry. */
  labels?: Record<string, string>;
  /** Required. The log entries to send to Logging. The order of log entries in this list does not matter. Values supplied in this method's log_name, resource, and labels fields are copied into those log entries in this list that do not include values for their corresponding fields. For more information, see the LogEntry type.If the timestamp or insert_id fields are missing in log entries, then this method supplies the current time or a unique identifier, respectively. The supplied values are chosen so that, among the log entries that did not supply their own values, the entries earlier in the list will sort before the entries later in the list. See the entries.list method.Log entries with timestamps that are more than the logs retention period (https://cloud.google.com/logging/quotas) in the past or more than 24 hours in the future will not be available when calling entries.list. However, those log entries can still be exported with LogSinks (https://cloud.google.com/logging/docs/api/tasks/exporting-logs).To improve throughput and to avoid exceeding the quota limit (https://cloud.google.com/logging/quotas) for calls to entries.write, you should try to include several log entries in this list, rather than calling this method for each individual log entry. */
  entries?: Array<LogEntry>;
  /** Optional. Whether a batch's valid entries should be written even if some other entry failed due to a permanent error such as INVALID_ARGUMENT or PERMISSION_DENIED. If any entry failed, then the response status is the response status of one of the failed entries. The response will include error details in WriteLogEntriesPartialErrors.log_entry_errors keyed by the entries' zero-based index in the entries. Failed requests for which no entries are written will not include per-entry errors. */
  partialSuccess?: boolean;
  /** Optional. If true, the request should expect normal response, but the entries won't be persisted nor exported. Useful for checking whether the logging API endpoints are working properly before sending valuable data. */
  dryRun?: boolean;
}

export const WriteLogEntriesRequest: Schema.Schema<WriteLogEntriesRequest> = Schema.suspend(() => Schema.Struct({
  logName: Schema.optional(Schema.String),
  resource: Schema.optional(MonitoredResource),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  entries: Schema.optional(Schema.Array(LogEntry)),
  partialSuccess: Schema.optional(Schema.Boolean),
  dryRun: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "WriteLogEntriesRequest" }) as any as Schema.Schema<WriteLogEntriesRequest>;

export interface WriteLogEntriesResponse {
}

export const WriteLogEntriesResponse: Schema.Schema<WriteLogEntriesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "WriteLogEntriesResponse" }) as any as Schema.Schema<WriteLogEntriesResponse>;

export interface ListLogEntriesRequest {
  /** Optional. Deprecated. Use resource_names instead. One or more project identifiers or project numbers from which to retrieve log entries. Example: "my-project-1A". */
  projectIds?: Array<string>;
  /** Required. Names of one or more parent resources from which to retrieve log entries. Resources may either be resource containers or specific LogViews. For the case of resource containers, all logs ingested into that container will be returned regardless of which LogBuckets they are actually stored in - i.e. these queries may fan out to multiple regions. In the event of region unavailability, specify a specific set of LogViews that do not include the unavailable region. projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID] projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]Projects listed in the project_ids field are added to this list. A maximum of 100 resources may be specified in a single request. */
  resourceNames?: Array<string>;
  /** Optional. A filter that chooses which log entries to return. For more information, see Logging query language (https://{$universe.dns_names.final_documentation_domain}/logging/docs/view/logging-query-language).Only log entries that match the filter are returned. An empty filter matches all log entries in the resources listed in resource_names. Referencing a parent resource that is not listed in resource_names will cause the filter to return no results. The maximum length of a filter is 20,000 characters.To make queries faster, you can make the filter more selective by using restrictions on indexed fields (https://{$universe.dns_names.final_documentation_domain}/logging/docs/view/logging-query-language#indexed-fields) as well as limit the time range of the query by adding range restrictions on the timestamp field. */
  filter?: string;
  /** Optional. How the results should be sorted. Presently, the only permitted values are "timestamp asc" (default) and "timestamp desc". The first option returns entries in order of increasing values of LogEntry.timestamp (oldest first), and the second option returns entries in order of decreasing timestamps (newest first). Entries with equal timestamps are returned in order of their insert_id values.We recommend setting the order_by field to "timestamp desc" when listing recently ingested log entries. If not set, the default value of "timestamp asc" may take a long time to fetch matching logs that are only recently ingested. */
  orderBy?: string;
  /** Optional. The maximum number of results to return from this request. Default is 50. If the value is negative, the request is rejected.The presence of next_page_token in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. page_token must be the value of next_page_token from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ListLogEntriesRequest: Schema.Schema<ListLogEntriesRequest> = Schema.suspend(() => Schema.Struct({
  projectIds: Schema.optional(Schema.Array(Schema.String)),
  resourceNames: Schema.optional(Schema.Array(Schema.String)),
  filter: Schema.optional(Schema.String),
  orderBy: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLogEntriesRequest" }) as any as Schema.Schema<ListLogEntriesRequest>;

export interface ListLogEntriesResponse {
  /** A list of log entries. If entries is empty, nextPageToken may still be returned, indicating that more entries may exist. See nextPageToken for more information. */
  entries?: Array<LogEntry>;
  /** If there might be more results than those appearing in this response, then nextPageToken is included. To get the next set of results, call this method again using the value of nextPageToken as pageToken.If a value for next_page_token appears and the entries field is empty, it means that the search found no log entries so far but it did not have time to search all the possible log entries. Retry the method with this value for page_token to continue the search. Alternatively, consider speeding up the search by changing your filter to specify a single log name or resource type, or to narrow the time range of the search. */
  nextPageToken?: string;
}

export const ListLogEntriesResponse: Schema.Schema<ListLogEntriesResponse> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(LogEntry)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLogEntriesResponse" }) as any as Schema.Schema<ListLogEntriesResponse>;

export interface LabelDescriptor {
  /** The label key. */
  key?: string;
  /** The type of data that can be assigned to the label. */
  valueType?: "STRING" | "BOOL" | "INT64" | (string & {});
  /** A human-readable description for the label. */
  description?: string;
}

export const LabelDescriptor: Schema.Schema<LabelDescriptor> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "LabelDescriptor" }) as any as Schema.Schema<LabelDescriptor>;

export interface MonitoredResourceDescriptor {
  /** Optional. The resource name of the monitored resource descriptor: "projects/{project_id}/monitoredResourceDescriptors/{type}" where {type} is the value of the type field in this object and {project_id} is a project ID that provides API-specific context for accessing the type. APIs that do not use project information can use the resource name format "monitoredResourceDescriptors/{type}". */
  name?: string;
  /** Required. The monitored resource type. For example, the type "cloudsql_database" represents databases in Google Cloud SQL. For a list of types, see Monitored resource types (https://cloud.google.com/monitoring/api/resources) and Logging resource types (https://cloud.google.com/logging/docs/api/v2/resource-list). */
  type?: string;
  /** Optional. A concise name for the monitored resource type that might be displayed in user interfaces. It should be a Title Cased Noun Phrase, without any article or other determiners. For example, "Google Cloud SQL Database". */
  displayName?: string;
  /** Optional. A detailed description of the monitored resource type that might be used in documentation. */
  description?: string;
  /** Required. A set of labels used to describe instances of this monitored resource type. For example, an individual Google Cloud SQL database is identified by values for the labels "database_id" and "zone". */
  labels?: Array<LabelDescriptor>;
  /** Optional. The launch stage of the monitored resource definition. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
}

export const MonitoredResourceDescriptor: Schema.Schema<MonitoredResourceDescriptor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(LabelDescriptor)),
  launchStage: Schema.optional(Schema.String),
})).annotate({ identifier: "MonitoredResourceDescriptor" }) as any as Schema.Schema<MonitoredResourceDescriptor>;

export interface ListMonitoredResourceDescriptorsResponse {
  /** A list of resource descriptors. */
  resourceDescriptors?: Array<MonitoredResourceDescriptor>;
  /** If there might be more results than those appearing in this response, then nextPageToken is included. To get the next set of results, call this method again using the value of nextPageToken as pageToken. */
  nextPageToken?: string;
}

export const ListMonitoredResourceDescriptorsResponse: Schema.Schema<ListMonitoredResourceDescriptorsResponse> = Schema.suspend(() => Schema.Struct({
  resourceDescriptors: Schema.optional(Schema.Array(MonitoredResourceDescriptor)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListMonitoredResourceDescriptorsResponse" }) as any as Schema.Schema<ListMonitoredResourceDescriptorsResponse>;

export interface ListLogsResponse {
  /** A list of log names. For example, "projects/my-project/logs/syslog" or "organizations/123/logs/cloudresourcemanager.googleapis.com%2Factivity". */
  logNames?: Array<string>;
  /** If there might be more results than those appearing in this response, then nextPageToken is included. To get the next set of results, call this method again using the value of nextPageToken as pageToken. */
  nextPageToken?: string;
}

export const ListLogsResponse: Schema.Schema<ListLogsResponse> = Schema.suspend(() => Schema.Struct({
  logNames: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLogsResponse" }) as any as Schema.Schema<ListLogsResponse>;

export interface TailLogEntriesRequest {
  /** Required. Name of a parent resource from which to retrieve log entries: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]May alternatively be one or more views: projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] */
  resourceNames?: Array<string>;
  /** Optional. A filter that chooses which log entries to return. For more information, see Logging query language (https://{$universe.dns_names.final_documentation_domain}/logging/docs/view/logging-query-language).Only log entries that match the filter are returned. An empty filter matches all log entries in the resources listed in resource_names. Referencing a parent resource that is not listed in resource_names will cause the filter to return no results. The maximum length of a filter is 20,000 characters. */
  filter?: string;
  /** Optional. The amount of time to buffer log entries at the server before being returned to prevent out of order results due to late arriving log entries. Valid values are between 0-60000 milliseconds. Defaults to 2000 milliseconds. */
  bufferWindow?: string;
}

export const TailLogEntriesRequest: Schema.Schema<TailLogEntriesRequest> = Schema.suspend(() => Schema.Struct({
  resourceNames: Schema.optional(Schema.Array(Schema.String)),
  filter: Schema.optional(Schema.String),
  bufferWindow: Schema.optional(Schema.String),
})).annotate({ identifier: "TailLogEntriesRequest" }) as any as Schema.Schema<TailLogEntriesRequest>;

export interface SuppressionInfo {
  /** The reason that entries were omitted from the session. */
  reason?: "REASON_UNSPECIFIED" | "RATE_LIMIT" | "NOT_CONSUMED" | (string & {});
  /** A lower bound on the count of entries omitted due to reason. */
  suppressedCount?: number;
}

export const SuppressionInfo: Schema.Schema<SuppressionInfo> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
  suppressedCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "SuppressionInfo" }) as any as Schema.Schema<SuppressionInfo>;

export interface TailLogEntriesResponse {
  /** A list of log entries. Each response in the stream will order entries with increasing values of LogEntry.timestamp. Ordering is not guaranteed between separate responses. */
  entries?: Array<LogEntry>;
  /** If entries that otherwise would have been included in the session were not sent back to the client, counts of relevant entries omitted from the session with the reason that they were not included. There will be at most one of each reason per response. The counts represent the number of suppressed entries since the last streamed response. */
  suppressionInfo?: Array<SuppressionInfo>;
}

export const TailLogEntriesResponse: Schema.Schema<TailLogEntriesResponse> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(LogEntry)),
  suppressionInfo: Schema.optional(Schema.Array(SuppressionInfo)),
})).annotate({ identifier: "TailLogEntriesResponse" }) as any as Schema.Schema<TailLogEntriesResponse>;

export interface MetricDescriptorMetadata {
  /** Deprecated. Must use the MetricDescriptor.launch_stage instead. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** The sampling period of metric data points. For metrics which are written periodically, consecutive data points are stored at this time interval, excluding data loss due to errors. Metrics with a higher granularity have a smaller sampling period. */
  samplePeriod?: string;
  /** The delay of data points caused by ingestion. Data points older than this age are guaranteed to be ingested and available to be read, excluding data loss due to errors. */
  ingestDelay?: string;
  /** The scope of the timeseries data of the metric. */
  timeSeriesResourceHierarchyLevel?: Array<"TIME_SERIES_RESOURCE_HIERARCHY_LEVEL_UNSPECIFIED" | "PROJECT" | "ORGANIZATION" | "FOLDER" | (string & {})>;
}

export const MetricDescriptorMetadata: Schema.Schema<MetricDescriptorMetadata> = Schema.suspend(() => Schema.Struct({
  launchStage: Schema.optional(Schema.String),
  samplePeriod: Schema.optional(Schema.String),
  ingestDelay: Schema.optional(Schema.String),
  timeSeriesResourceHierarchyLevel: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MetricDescriptorMetadata" }) as any as Schema.Schema<MetricDescriptorMetadata>;

export interface MetricDescriptor {
  /** The resource name of the metric descriptor. */
  name?: string;
  /** The metric type, including its DNS name prefix. The type is not URL-encoded. All user-defined metric types have the DNS name custom.googleapis.com or external.googleapis.com. Metric types should use a natural hierarchical grouping. For example: "custom.googleapis.com/invoice/paid/amount" "external.googleapis.com/prometheus/up" "appengine.googleapis.com/http/server/response_latencies" */
  type?: string;
  /** The set of labels that can be used to describe a specific instance of this metric type. For example, the appengine.googleapis.com/http/server/response_latencies metric type has a label for the HTTP response code, response_code, so you can look at latencies for successful responses or just for responses that failed. */
  labels?: Array<LabelDescriptor>;
  /** Whether the metric records instantaneous values, changes to a value, etc. Some combinations of metric_kind and value_type might not be supported. */
  metricKind?: "METRIC_KIND_UNSPECIFIED" | "GAUGE" | "DELTA" | "CUMULATIVE" | (string & {});
  /** Whether the measurement is an integer, a floating-point number, etc. Some combinations of metric_kind and value_type might not be supported. */
  valueType?: "VALUE_TYPE_UNSPECIFIED" | "BOOL" | "INT64" | "DOUBLE" | "STRING" | "DISTRIBUTION" | "MONEY" | (string & {});
  /** The units in which the metric value is reported. It is only applicable if the value_type is INT64, DOUBLE, or DISTRIBUTION. The unit defines the representation of the stored metric values.Different systems might scale the values to be more easily displayed (so a value of 0.02kBy might be displayed as 20By, and a value of 3523kBy might be displayed as 3.5MBy). However, if the unit is kBy, then the value of the metric is always in thousands of bytes, no matter how it might be displayed.If you want a custom metric to record the exact number of CPU-seconds used by a job, you can create an INT64 CUMULATIVE metric whose unit is s{CPU} (or equivalently 1s{CPU} or just s). If the job uses 12,005 CPU-seconds, then the value is written as 12005.Alternatively, if you want a custom metric to record data in a more granular way, you can create a DOUBLE CUMULATIVE metric whose unit is ks{CPU}, and then write the value 12.005 (which is 12005/1000), or use Kis{CPU} and write 11.723 (which is 12005/1024).The supported units are a subset of The Unified Code for Units of Measure (https://unitsofmeasure.org/ucum.html) standard:Basic units (UNIT) bit bit By byte s second min minute h hour d day 1 dimensionlessPrefixes (PREFIX) k kilo (10^3) M mega (10^6) G giga (10^9) T tera (10^12) P peta (10^15) E exa (10^18) Z zetta (10^21) Y yotta (10^24) m milli (10^-3) u micro (10^-6) n nano (10^-9) p pico (10^-12) f femto (10^-15) a atto (10^-18) z zepto (10^-21) y yocto (10^-24) Ki kibi (2^10) Mi mebi (2^20) Gi gibi (2^30) Ti tebi (2^40) Pi pebi (2^50)GrammarThe grammar also includes these connectors: / division or ratio (as an infix operator). For examples, kBy/{email} or MiBy/10ms (although you should almost never have /s in a metric unit; rates should always be computed at query time from the underlying cumulative or delta value). . multiplication or composition (as an infix operator). For examples, GBy.d or k{watt}.h.The grammar for a unit is as follows: Expression = Component { "." Component } { "/" Component } ; Component = ( [ PREFIX ] UNIT | "%" ) [ Annotation ] | Annotation | "1" ; Annotation = "{" NAME "}" ; Notes: Annotation is just a comment if it follows a UNIT. If the annotation is used alone, then the unit is equivalent to 1. For examples, {request}/s == 1/s, By{transmitted}/s == By/s. NAME is a sequence of non-blank printable ASCII characters not containing { or }. 1 represents a unitary dimensionless unit (https://en.wikipedia.org/wiki/Dimensionless_quantity) of 1, such as in 1/s. It is typically used when none of the basic units are appropriate. For example, "new users per day" can be represented as 1/d or {new-users}/d (and a metric value 5 would mean "5 new users). Alternatively, "thousands of page views per day" would be represented as 1000/d or k1/d or k{page_views}/d (and a metric value of 5.3 would mean "5300 page views per day"). % represents dimensionless value of 1/100, and annotates values giving a percentage (so the metric values are typically in the range of 0..100, and a metric value 3 means "3 percent"). 10^2.% indicates a metric contains a ratio, typically in the range 0..1, that will be multiplied by 100 and displayed as a percentage (so a metric value 0.03 means "3 percent"). */
  unit?: string;
  /** A detailed description of the metric, which can be used in documentation. */
  description?: string;
  /** A concise name for the metric, which can be displayed in user interfaces. Use sentence case without an ending period, for example "Request count". This field is optional but it is recommended to be set for any metrics associated with user-visible concepts, such as Quota. */
  displayName?: string;
  /** Optional. Metadata which can be used to guide usage of the metric. */
  metadata?: MetricDescriptorMetadata;
  /** Optional. The launch stage of the metric definition. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** Read-only. If present, then a time series, which is identified partially by a metric type and a MonitoredResourceDescriptor, that is associated with this metric type can only be associated with one of the monitored resource types listed here. */
  monitoredResourceTypes?: Array<string>;
}

export const MetricDescriptor: Schema.Schema<MetricDescriptor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(LabelDescriptor)),
  metricKind: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  metadata: Schema.optional(MetricDescriptorMetadata),
  launchStage: Schema.optional(Schema.String),
  monitoredResourceTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MetricDescriptor" }) as any as Schema.Schema<MetricDescriptor>;

export interface Linear {
  /** Must be greater than 0. */
  numFiniteBuckets?: number;
  /** Must be greater than 0. */
  width?: number;
  /** Lower bound of the first bucket. */
  offset?: number;
}

export const Linear: Schema.Schema<Linear> = Schema.suspend(() => Schema.Struct({
  numFiniteBuckets: Schema.optional(Schema.Number),
  width: Schema.optional(Schema.Number),
  offset: Schema.optional(Schema.Number),
})).annotate({ identifier: "Linear" }) as any as Schema.Schema<Linear>;

export interface Exponential {
  /** Must be greater than 0. */
  numFiniteBuckets?: number;
  /** Must be greater than 1. */
  growthFactor?: number;
  /** Must be greater than 0. */
  scale?: number;
}

export const Exponential: Schema.Schema<Exponential> = Schema.suspend(() => Schema.Struct({
  numFiniteBuckets: Schema.optional(Schema.Number),
  growthFactor: Schema.optional(Schema.Number),
  scale: Schema.optional(Schema.Number),
})).annotate({ identifier: "Exponential" }) as any as Schema.Schema<Exponential>;

export interface Explicit {
  /** The values must be monotonically increasing. */
  bounds?: Array<number>;
}

export const Explicit: Schema.Schema<Explicit> = Schema.suspend(() => Schema.Struct({
  bounds: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "Explicit" }) as any as Schema.Schema<Explicit>;

export interface BucketOptions {
  /** The linear bucket. */
  linearBuckets?: Linear;
  /** The exponential buckets. */
  exponentialBuckets?: Exponential;
  /** The explicit buckets. */
  explicitBuckets?: Explicit;
}

export const BucketOptions: Schema.Schema<BucketOptions> = Schema.suspend(() => Schema.Struct({
  linearBuckets: Schema.optional(Linear),
  exponentialBuckets: Schema.optional(Exponential),
  explicitBuckets: Schema.optional(Explicit),
})).annotate({ identifier: "BucketOptions" }) as any as Schema.Schema<BucketOptions>;

export interface LogMetric {
  /** Required. The client-assigned metric identifier. Examples: "error_count", "nginx/requests".Metric identifiers are limited to 100 characters and can include only the following characters: A-Z, a-z, 0-9, and the special characters _-.,+!*',()%/. The forward-slash character (/) denotes a hierarchy of name pieces, and it cannot be the first character of the name.This field is the [METRIC_ID] part of a metric resource name in the format "projects/PROJECT_ID/metrics/METRIC_ID". Example: If the resource name of a metric is "projects/my-project/metrics/nginx%2Frequests", this field's value is "nginx/requests". */
  name?: string;
  /** Output only. The resource name of the metric: "projects/[PROJECT_ID]/metrics/[METRIC_ID]" */
  resourceName?: string;
  /** Optional. A description of this metric, which is used in documentation. The maximum length of the description is 8000 characters. */
  description?: string;
  /** Required. An advanced logs filter (https://cloud.google.com/logging/docs/view/advanced_filters) which is used to match log entries. Example: "resource.type=gae_app AND severity>=ERROR" The maximum length of the filter is 20000 characters. */
  filter?: string;
  /** Optional. The resource name of the Log Bucket that owns the Log Metric. Only Log Buckets in projects are supported. The bucket has to be in the same project as the metric.For example:projects/my-project/locations/global/buckets/my-bucketIf empty, then the Log Metric is considered a non-Bucket Log Metric. */
  bucketName?: string;
  /** Optional. If set to True, then this metric is disabled and it does not generate any points. */
  disabled?: boolean;
  /** Optional. The metric descriptor associated with the logs-based metric. If unspecified, it uses a default metric descriptor with a DELTA metric kind, INT64 value type, with no labels and a unit of "1". Such a metric counts the number of log entries matching the filter expression.The name, type, and description fields in the metric_descriptor are output only, and is constructed using the name and description field in the LogMetric.To create a logs-based metric that records a distribution of log values, a DELTA metric kind with a DISTRIBUTION value type must be used along with a value_extractor expression in the LogMetric.Each label in the metric descriptor must have a matching label name as the key and an extractor expression as the value in the label_extractors map.The metric_kind and value_type fields in the metric_descriptor cannot be updated once initially configured. New labels can be added in the metric_descriptor, but existing labels cannot be modified except for their description. */
  metricDescriptor?: MetricDescriptor;
  /** Optional. A value_extractor is required when using a distribution logs-based metric to extract the values to record from a log entry. Two functions are supported for value extraction: EXTRACT(field) or REGEXP_EXTRACT(field, regex). The arguments are: field: The name of the log entry field from which the value is to be extracted. regex: A regular expression using the Google RE2 syntax (https://github.com/google/re2/wiki/Syntax) with a single capture group to extract data from the specified log entry field. The value of the field is converted to a string before applying the regex. It is an error to specify a regex that does not include exactly one capture group.The result of the extraction must be convertible to a double type, as the distribution always records double values. If either the extraction or the conversion to double fails, then those values are not recorded in the distribution.Example: REGEXP_EXTRACT(jsonPayload.request, ".*quantity=(\d+).*") */
  valueExtractor?: string;
  /** Optional. A map from a label key string to an extractor expression which is used to extract data from a log entry field and assign as the label value. Each label key specified in the LabelDescriptor must have an associated extractor expression in this map. The syntax of the extractor expression is the same as for the value_extractor field.The extracted value is converted to the type defined in the label descriptor. If either the extraction or the type conversion fails, the label will have a default value. The default value for a string label is an empty string, for an integer label its 0, and for a boolean label its false.Note that there are upper bounds on the maximum number of labels and the number of active time series that are allowed in a project. */
  labelExtractors?: Record<string, string>;
  /** Optional. The bucket_options are required when the logs-based metric is using a DISTRIBUTION value type and it describes the bucket boundaries used to create a histogram of the extracted values. */
  bucketOptions?: BucketOptions;
  /** Output only. The creation timestamp of the metric.This field may not be present for older metrics. */
  createTime?: string;
  /** Output only. The last update timestamp of the metric.This field may not be present for older metrics. */
  updateTime?: string;
  /** Deprecated. The API version that created or updated this metric. The v2 format is used by default and cannot be changed. */
  version?: "V2" | "V1" | (string & {});
}

export const LogMetric: Schema.Schema<LogMetric> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
  bucketName: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  metricDescriptor: Schema.optional(MetricDescriptor),
  valueExtractor: Schema.optional(Schema.String),
  labelExtractors: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  bucketOptions: Schema.optional(BucketOptions),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "LogMetric" }) as any as Schema.Schema<LogMetric>;

export interface ListLogMetricsResponse {
  /** A list of logs-based metrics. */
  metrics?: Array<LogMetric>;
  /** If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call this method again using the value of nextPageToken as pageToken. */
  nextPageToken?: string;
}

export const ListLogMetricsResponse: Schema.Schema<ListLogMetricsResponse> = Schema.suspend(() => Schema.Struct({
  metrics: Schema.optional(Schema.Array(LogMetric)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLogMetricsResponse" }) as any as Schema.Schema<ListLogMetricsResponse>;

export interface SourceLocation {
  /** Source file name. Depending on the runtime environment, this might be a simple name or a fully-qualified name. */
  file?: string;
  /** Line within the source file. */
  line?: string;
  /** Human-readable name of the function or method being invoked, with optional context such as the class or package name. This information is used in contexts such as the logs viewer, where a file and line number are less meaningful. The format can vary by language. For example: qual.if.ied.Class.method (Java), dir/package.func (Go), function (Python). */
  functionName?: string;
}

export const SourceLocation: Schema.Schema<SourceLocation> = Schema.suspend(() => Schema.Struct({
  file: Schema.optional(Schema.String),
  line: Schema.optional(Schema.String),
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceLocation" }) as any as Schema.Schema<SourceLocation>;

export interface LogLine {
  /** Approximate time when this log entry was made. */
  time?: string;
  /** Severity of this log entry. */
  severity?: "DEFAULT" | "DEBUG" | "INFO" | "NOTICE" | "WARNING" | "ERROR" | "CRITICAL" | "ALERT" | "EMERGENCY" | (string & {});
  /** App-provided log message. */
  logMessage?: string;
  /** Where in the source code this log message was written. */
  sourceLocation?: SourceLocation;
}

export const LogLine: Schema.Schema<LogLine> = Schema.suspend(() => Schema.Struct({
  time: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  logMessage: Schema.optional(Schema.String),
  sourceLocation: Schema.optional(SourceLocation),
})).annotate({ identifier: "LogLine" }) as any as Schema.Schema<LogLine>;

export interface SourceReference {
  /** Optional. A URI string identifying the repository. Example: "https://github.com/GoogleCloudPlatform/kubernetes.git" */
  repository?: string;
  /** The canonical and persistent identifier of the deployed revision. Example (git): "0035781c50ec7aa23385dc841529ce8a4b70db1b" */
  revisionId?: string;
}

export const SourceReference: Schema.Schema<SourceReference> = Schema.suspend(() => Schema.Struct({
  repository: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceReference" }) as any as Schema.Schema<SourceReference>;

export interface RequestLog {
  /** Application that handled this request. */
  appId?: string;
  /** Module of the application that handled this request. */
  moduleId?: string;
  /** Version of the application that handled this request. */
  versionId?: string;
  /** Globally unique identifier for a request, which is based on the request start time. Request IDs for requests which started later will compare greater as strings than those for requests which started earlier. */
  requestId?: string;
  /** Origin IP address. */
  ip?: string;
  /** Time when the request started. */
  startTime?: string;
  /** Time when the request finished. */
  endTime?: string;
  /** Latency of the request. */
  latency?: string;
  /** Number of CPU megacycles used to process request. */
  megaCycles?: string;
  /** Request method. Example: "GET", "HEAD", "PUT", "POST", "DELETE". */
  method?: string;
  /** Contains the path and query portion of the URL that was requested. For example, if the URL was "http://example.com/app?name=val", the resource would be "/app?name=val". The fragment identifier, which is identified by the # character, is not included. */
  resource?: string;
  /** HTTP version of request. Example: "HTTP/1.1". */
  httpVersion?: string;
  /** HTTP response status code. Example: 200, 404. */
  status?: number;
  /** Size in bytes sent back to client by request. */
  responseSize?: string;
  /** Referrer URL of request. */
  referrer?: string;
  /** User agent that made the request. */
  userAgent?: string;
  /** The logged-in user who made the request.Most likely, this is the part of the user's email before the @ sign. The field value is the same for different requests from the same user, but different users can have similar names. This information is also available to the application via the App Engine Users API.This field will be populated starting with App Engine 1.9.21. */
  nickname?: string;
  /** File or class that handled the request. */
  urlMapEntry?: string;
  /** Internet host and port number of the resource being requested. */
  host?: string;
  /** An indication of the relative cost of serving this request. */
  cost?: number;
  /** Queue name of the request, in the case of an offline request. */
  taskQueueName?: string;
  /** Task name of the request, in the case of an offline request. */
  taskName?: string;
  /** Whether this was a loading request for the instance. */
  wasLoadingRequest?: boolean;
  /** Time this request spent in the pending request queue. */
  pendingTime?: string;
  /** If the instance processing this request belongs to a manually scaled module, then this is the 0-based index of the instance. Otherwise, this value is -1. */
  instanceIndex?: number;
  /** Whether this request is finished or active. */
  finished?: boolean;
  /** Whether this is the first RequestLog entry for this request. If an active request has several RequestLog entries written to Stackdriver Logging, then this field will be set for one of them. */
  first?: boolean;
  /** An identifier for the instance that handled the request. */
  instanceId?: string;
  /** A list of log lines emitted by the application while serving this request. */
  line?: Array<LogLine>;
  /** App Engine release version. */
  appEngineRelease?: string;
  /** Stackdriver Trace identifier for this request. */
  traceId?: string;
  /** Stackdriver Trace span identifier for this request. */
  spanId?: string;
  /** If true, the value in the 'trace_id' field was sampled for storage in a trace backend. */
  traceSampled?: boolean;
  /** Source code for the application that handled this request. There can be more than one source reference per deployed application if source code is distributed among multiple repositories. */
  sourceReference?: Array<SourceReference>;
}

export const RequestLog: Schema.Schema<RequestLog> = Schema.suspend(() => Schema.Struct({
  appId: Schema.optional(Schema.String),
  moduleId: Schema.optional(Schema.String),
  versionId: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
  ip: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  latency: Schema.optional(Schema.String),
  megaCycles: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  httpVersion: Schema.optional(Schema.String),
  status: Schema.optional(Schema.Number),
  responseSize: Schema.optional(Schema.String),
  referrer: Schema.optional(Schema.String),
  userAgent: Schema.optional(Schema.String),
  nickname: Schema.optional(Schema.String),
  urlMapEntry: Schema.optional(Schema.String),
  host: Schema.optional(Schema.String),
  cost: Schema.optional(Schema.Number),
  taskQueueName: Schema.optional(Schema.String),
  taskName: Schema.optional(Schema.String),
  wasLoadingRequest: Schema.optional(Schema.Boolean),
  pendingTime: Schema.optional(Schema.String),
  instanceIndex: Schema.optional(Schema.Number),
  finished: Schema.optional(Schema.Boolean),
  first: Schema.optional(Schema.Boolean),
  instanceId: Schema.optional(Schema.String),
  line: Schema.optional(Schema.Array(LogLine)),
  appEngineRelease: Schema.optional(Schema.String),
  traceId: Schema.optional(Schema.String),
  spanId: Schema.optional(Schema.String),
  traceSampled: Schema.optional(Schema.Boolean),
  sourceReference: Schema.optional(Schema.Array(SourceReference)),
})).annotate({ identifier: "RequestLog" }) as any as Schema.Schema<RequestLog>;

export interface CopyLogEntriesMetadata {
  /** The create time of an operation. */
  startTime?: string;
  /** The end time of an operation. */
  endTime?: string;
  /** Output only. State of an operation. */
  state?: "OPERATION_STATE_UNSPECIFIED" | "OPERATION_STATE_SCHEDULED" | "OPERATION_STATE_WAITING_FOR_PERMISSIONS" | "OPERATION_STATE_RUNNING" | "OPERATION_STATE_SUCCEEDED" | "OPERATION_STATE_FAILED" | "OPERATION_STATE_CANCELLED" | "OPERATION_STATE_PENDING" | (string & {});
  /** Identifies whether the user has requested cancellation of the operation. */
  cancellationRequested?: boolean;
  /** CopyLogEntries RPC request. This field is deprecated and not used. */
  request?: CopyLogEntriesRequest;
  /** Estimated progress of the operation (0 - 100%). */
  progress?: number;
  /** The IAM identity of a service account that must be granted access to the destination.If the service account is not granted permission to the destination within an hour, the operation will be cancelled.For example: "serviceAccount:foo@bar.com" */
  writerIdentity?: string;
  /** Source from which to copy log entries.For example, a log bucket:"projects/my-project/locations/global/buckets/my-source-bucket" */
  source?: string;
  /** Destination to which to copy log entries.For example, a Cloud Storage bucket:"storage.googleapis.com/my-cloud-storage-bucket" */
  destination?: string;
  /** Name of the verb executed by the operation.For example,"copy" */
  verb?: string;
}

export const CopyLogEntriesMetadata: Schema.Schema<CopyLogEntriesMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  cancellationRequested: Schema.optional(Schema.Boolean),
  request: Schema.optional(CopyLogEntriesRequest),
  progress: Schema.optional(Schema.Number),
  writerIdentity: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
})).annotate({ identifier: "CopyLogEntriesMetadata" }) as any as Schema.Schema<CopyLogEntriesMetadata>;

export interface CopyLogEntriesResponse {
  /** Number of log entries copied. */
  logEntriesCopiedCount?: string;
}

export const CopyLogEntriesResponse: Schema.Schema<CopyLogEntriesResponse> = Schema.suspend(() => Schema.Struct({
  logEntriesCopiedCount: Schema.optional(Schema.String),
})).annotate({ identifier: "CopyLogEntriesResponse" }) as any as Schema.Schema<CopyLogEntriesResponse>;

export interface CreateBucketRequest {
  /** Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global" */
  parent?: string;
  /** Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. */
  bucketId?: string;
  /** Required. The new bucket. The region specified in the new bucket must be compliant with any Location Restriction Org Policy. The name field in the bucket is ignored. */
  bucket?: LogBucket;
}

export const CreateBucketRequest: Schema.Schema<CreateBucketRequest> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  bucketId: Schema.optional(Schema.String),
  bucket: Schema.optional(LogBucket),
})).annotate({ identifier: "CreateBucketRequest" }) as any as Schema.Schema<CreateBucketRequest>;

export interface UpdateBucketRequest {
  /** Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name?: string;
  /** Required. The updated bucket. */
  bucket?: LogBucket;
  /** Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days */
  updateMask?: string;
}

export const UpdateBucketRequest: Schema.Schema<UpdateBucketRequest> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  bucket: Schema.optional(LogBucket),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateBucketRequest" }) as any as Schema.Schema<UpdateBucketRequest>;

export interface BucketMetadata {
  /** The create time of an operation. */
  startTime?: string;
  /** The end time of an operation. */
  endTime?: string;
  /** Output only. State of an operation. */
  state?: "OPERATION_STATE_UNSPECIFIED" | "OPERATION_STATE_SCHEDULED" | "OPERATION_STATE_WAITING_FOR_PERMISSIONS" | "OPERATION_STATE_RUNNING" | "OPERATION_STATE_SUCCEEDED" | "OPERATION_STATE_FAILED" | "OPERATION_STATE_CANCELLED" | "OPERATION_STATE_PENDING" | (string & {});
  /** LongRunningCreateBucket RPC request. */
  createBucketRequest?: CreateBucketRequest;
  /** LongRunningUpdateBucket RPC request. */
  updateBucketRequest?: UpdateBucketRequest;
}

export const BucketMetadata: Schema.Schema<BucketMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createBucketRequest: Schema.optional(CreateBucketRequest),
  updateBucketRequest: Schema.optional(UpdateBucketRequest),
})).annotate({ identifier: "BucketMetadata" }) as any as Schema.Schema<BucketMetadata>;

export interface CreateLinkRequest {
  /** Required. The full resource name of the bucket to create a link for. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" */
  parent?: string;
  /** Required. The new link. */
  link?: Link;
  /** Required. The ID to use for the link. The link_id can have up to 100 characters. A valid link_id must only have alphanumeric characters and underscores within it. */
  linkId?: string;
}

export const CreateLinkRequest: Schema.Schema<CreateLinkRequest> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  link: Schema.optional(Link),
  linkId: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateLinkRequest" }) as any as Schema.Schema<CreateLinkRequest>;

export interface DeleteLinkRequest {
  /** Required. The full resource name of the link to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" */
  name?: string;
}

export const DeleteLinkRequest: Schema.Schema<DeleteLinkRequest> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "DeleteLinkRequest" }) as any as Schema.Schema<DeleteLinkRequest>;

export interface LinkMetadata {
  /** The start time of an operation. */
  startTime?: string;
  /** The end time of an operation. */
  endTime?: string;
  /** Output only. State of an operation. */
  state?: "OPERATION_STATE_UNSPECIFIED" | "OPERATION_STATE_SCHEDULED" | "OPERATION_STATE_WAITING_FOR_PERMISSIONS" | "OPERATION_STATE_RUNNING" | "OPERATION_STATE_SUCCEEDED" | "OPERATION_STATE_FAILED" | "OPERATION_STATE_CANCELLED" | "OPERATION_STATE_PENDING" | (string & {});
  /** CreateLink RPC request. */
  createLinkRequest?: CreateLinkRequest;
  /** DeleteLink RPC request. */
  deleteLinkRequest?: DeleteLinkRequest;
}

export const LinkMetadata: Schema.Schema<LinkMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createLinkRequest: Schema.optional(CreateLinkRequest),
  deleteLinkRequest: Schema.optional(DeleteLinkRequest),
})).annotate({ identifier: "LinkMetadata" }) as any as Schema.Schema<LinkMetadata>;

export interface LocationMetadata {
  /** Indicates whether or not Log Analytics features are supported in the given location. */
  logAnalyticsEnabled?: boolean;
}

export const LocationMetadata: Schema.Schema<LocationMetadata> = Schema.suspend(() => Schema.Struct({
  logAnalyticsEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "LocationMetadata" }) as any as Schema.Schema<LocationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. This method can be called in two ways: List all public locations: Use the path GET /v1/locations. List project-visible locations: Use the path GET /v1/projects/{project_id}/locations. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like "displayName=tokyo", and is documented in more detail in AIP-160 (https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the next_page_token field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/locations" }),
  svc,
) as unknown as Schema.Schema<ListLocationsRequest>;

export type ListLocationsResponse_Op = ListLocationsResponse;
export const ListLocationsResponse_Op = ListLocationsResponse;

export type ListLocationsError = CommonErrors;

export const listLocations = API.makePaginated(() => ({
  input: ListLocationsRequest,
  output: ListLocationsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetLocationsRequest>;

export type GetLocationsResponse = Location;
export const GetLocationsResponse = Location;

export type GetLocationsError = CommonErrors;

export const getLocations: API.OperationMethod<GetLocationsRequest, GetLocationsResponse, GetLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLocationsRequest,
  output: GetLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED. */
export interface ListLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListLocationsOperationsRequest>;

export type ListLocationsOperationsResponse = ListOperationsResponse;
export const ListLocationsOperationsResponse = ListOperationsResponse;

export type ListLocationsOperationsError = CommonErrors;

export const listLocationsOperations = API.makePaginated(() => ({
  input: ListLocationsOperationsRequest,
  output: ListLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetLocationsOperationsRequest>;

export type GetLocationsOperationsResponse = Operation;
export const GetLocationsOperationsResponse = Operation;

export type GetLocationsOperationsError = CommonErrors;

export const getLocationsOperations: API.OperationMethod<GetLocationsOperationsRequest, GetLocationsOperationsResponse, GetLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLocationsOperationsRequest,
  output: GetLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED. */
export interface CancelLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelLocationsOperationsRequest>;

export type CancelLocationsOperationsResponse = Empty;
export const CancelLocationsOperationsResponse = Empty;

export type CancelLocationsOperationsError = CommonErrors;

export const cancelLocationsOperations: API.OperationMethod<CancelLocationsOperationsRequest, CancelLocationsOperationsResponse, CancelLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelLocationsOperationsRequest,
  output: CancelLocationsOperationsResponse,
  errors: [],
}));

/** Lists log buckets. */
export interface ListLocationsBucketsRequest {
  /** Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets. */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListLocationsBucketsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets" }),
  svc,
) as unknown as Schema.Schema<ListLocationsBucketsRequest>;

export type ListLocationsBucketsResponse = ListBucketsResponse;
export const ListLocationsBucketsResponse = ListBucketsResponse;

export type ListLocationsBucketsError = CommonErrors;

export const listLocationsBuckets = API.makePaginated(() => ({
  input: ListLocationsBucketsRequest,
  output: ListLocationsBucketsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a log bucket. */
export interface GetLocationsBucketsRequest {
  /** Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
}

export const GetLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}" }),
  svc,
) as unknown as Schema.Schema<GetLocationsBucketsRequest>;

export type GetLocationsBucketsResponse = LogBucket;
export const GetLocationsBucketsResponse = LogBucket;

export type GetLocationsBucketsError = CommonErrors;

export const getLocationsBuckets: API.OperationMethod<GetLocationsBucketsRequest, GetLocationsBucketsResponse, GetLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLocationsBucketsRequest,
  output: GetLocationsBucketsResponse,
  errors: [],
}));

/** Creates a log bucket asynchronously that can be used to store log entries.After a bucket has been created, the bucket's location cannot be changed. */
export interface CreateAsyncLocationsBucketsRequest {
  /** Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global" */
  parent: string;
  /** Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. */
  bucketId?: string;
  /** Request body */
  body?: LogBucket;
}

export const CreateAsyncLocationsBucketsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  bucketId: Schema.optional(Schema.String).pipe(T.HttpQuery("bucketId")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets:createAsync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAsyncLocationsBucketsRequest>;

export type CreateAsyncLocationsBucketsResponse = Operation;
export const CreateAsyncLocationsBucketsResponse = Operation;

export type CreateAsyncLocationsBucketsError = CommonErrors;

export const createAsyncLocationsBuckets: API.OperationMethod<CreateAsyncLocationsBucketsRequest, CreateAsyncLocationsBucketsResponse, CreateAsyncLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAsyncLocationsBucketsRequest,
  output: CreateAsyncLocationsBucketsResponse,
  errors: [],
}));

/** Updates a log bucket asynchronously.If the bucket has a lifecycle_state of DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket has been created, the bucket's location cannot be changed. */
export interface UpdateAsyncLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
  /** Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days */
  updateMask?: string;
  /** Request body */
  body?: LogBucket;
}

export const UpdateAsyncLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}:updateAsync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAsyncLocationsBucketsRequest>;

export type UpdateAsyncLocationsBucketsResponse = Operation;
export const UpdateAsyncLocationsBucketsResponse = Operation;

export type UpdateAsyncLocationsBucketsError = CommonErrors;

export const updateAsyncLocationsBuckets: API.OperationMethod<UpdateAsyncLocationsBucketsRequest, UpdateAsyncLocationsBucketsResponse, UpdateAsyncLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAsyncLocationsBucketsRequest,
  output: UpdateAsyncLocationsBucketsResponse,
  errors: [],
}));

/** Creates a log bucket that can be used to store log entries. After a bucket has been created, the bucket's location cannot be changed. */
export interface CreateLocationsBucketsRequest {
  /** Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global" */
  parent: string;
  /** Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. */
  bucketId?: string;
  /** Request body */
  body?: LogBucket;
}

export const CreateLocationsBucketsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  bucketId: Schema.optional(Schema.String).pipe(T.HttpQuery("bucketId")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateLocationsBucketsRequest>;

export type CreateLocationsBucketsResponse = LogBucket;
export const CreateLocationsBucketsResponse = LogBucket;

export type CreateLocationsBucketsError = CommonErrors;

export const createLocationsBuckets: API.OperationMethod<CreateLocationsBucketsRequest, CreateLocationsBucketsResponse, CreateLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateLocationsBucketsRequest,
  output: CreateLocationsBucketsResponse,
  errors: [],
}));

/** Updates a log bucket.If the bucket has a lifecycle_state of DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket has been created, the bucket's location cannot be changed. */
export interface PatchLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
  /** Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days */
  updateMask?: string;
  /** Request body */
  body?: LogBucket;
}

export const PatchLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchLocationsBucketsRequest>;

export type PatchLocationsBucketsResponse = LogBucket;
export const PatchLocationsBucketsResponse = LogBucket;

export type PatchLocationsBucketsError = CommonErrors;

export const patchLocationsBuckets: API.OperationMethod<PatchLocationsBucketsRequest, PatchLocationsBucketsResponse, PatchLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchLocationsBucketsRequest,
  output: PatchLocationsBucketsResponse,
  errors: [],
}));

/** Deletes a log bucket.Changes the bucket's lifecycle_state to the DELETE_REQUESTED state. After 7 days, the bucket will be purged and all log entries in the bucket will be permanently deleted. */
export interface DeleteLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
}

export const DeleteLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteLocationsBucketsRequest>;

export type DeleteLocationsBucketsResponse = Empty;
export const DeleteLocationsBucketsResponse = Empty;

export type DeleteLocationsBucketsError = CommonErrors;

export const deleteLocationsBuckets: API.OperationMethod<DeleteLocationsBucketsRequest, DeleteLocationsBucketsResponse, DeleteLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteLocationsBucketsRequest,
  output: DeleteLocationsBucketsResponse,
  errors: [],
}));

/** Undeletes a log bucket. A bucket that has been deleted can be undeleted within the grace period of 7 days. */
export interface UndeleteLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to undelete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
  /** Request body */
  body?: UndeleteBucketRequest;
}

export const UndeleteLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteBucketRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteLocationsBucketsRequest>;

export type UndeleteLocationsBucketsResponse = Empty;
export const UndeleteLocationsBucketsResponse = Empty;

export type UndeleteLocationsBucketsError = CommonErrors;

export const undeleteLocationsBuckets: API.OperationMethod<UndeleteLocationsBucketsRequest, UndeleteLocationsBucketsResponse, UndeleteLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteLocationsBucketsRequest,
  output: UndeleteLocationsBucketsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyLocationsBucketsViewsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyLocationsBucketsViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyLocationsBucketsViewsRequest>;

export type SetIamPolicyLocationsBucketsViewsResponse = Policy;
export const SetIamPolicyLocationsBucketsViewsResponse = Policy;

export type SetIamPolicyLocationsBucketsViewsError = CommonErrors;

export const setIamPolicyLocationsBucketsViews: API.OperationMethod<SetIamPolicyLocationsBucketsViewsRequest, SetIamPolicyLocationsBucketsViewsResponse, SetIamPolicyLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyLocationsBucketsViewsRequest,
  output: SetIamPolicyLocationsBucketsViewsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyLocationsBucketsViewsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyLocationsBucketsViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyLocationsBucketsViewsRequest>;

export type GetIamPolicyLocationsBucketsViewsResponse = Policy;
export const GetIamPolicyLocationsBucketsViewsResponse = Policy;

export type GetIamPolicyLocationsBucketsViewsError = CommonErrors;

export const getIamPolicyLocationsBucketsViews: API.OperationMethod<GetIamPolicyLocationsBucketsViewsRequest, GetIamPolicyLocationsBucketsViewsResponse, GetIamPolicyLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyLocationsBucketsViewsRequest,
  output: GetIamPolicyLocationsBucketsViewsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsLocationsBucketsViewsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsLocationsBucketsViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsLocationsBucketsViewsRequest>;

export type TestIamPermissionsLocationsBucketsViewsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsLocationsBucketsViewsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsLocationsBucketsViewsError = CommonErrors;

export const testIamPermissionsLocationsBucketsViews: API.OperationMethod<TestIamPermissionsLocationsBucketsViewsRequest, TestIamPermissionsLocationsBucketsViewsResponse, TestIamPermissionsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsLocationsBucketsViewsRequest,
  output: TestIamPermissionsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Lists views on a log bucket. */
export interface ListLocationsBucketsViewsRequest {
  /** Required. The bucket whose views are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListLocationsBucketsViewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}/views" }),
  svc,
) as unknown as Schema.Schema<ListLocationsBucketsViewsRequest>;

export type ListLocationsBucketsViewsResponse = ListViewsResponse;
export const ListLocationsBucketsViewsResponse = ListViewsResponse;

export type ListLocationsBucketsViewsError = CommonErrors;

export const listLocationsBucketsViews = API.makePaginated(() => ({
  input: ListLocationsBucketsViewsRequest,
  output: ListLocationsBucketsViewsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a view on a log bucket. */
export interface GetLocationsBucketsViewsRequest {
  /** Required. The resource name of the policy: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" */
  name: string;
}

export const GetLocationsBucketsViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}" }),
  svc,
) as unknown as Schema.Schema<GetLocationsBucketsViewsRequest>;

export type GetLocationsBucketsViewsResponse = LogView;
export const GetLocationsBucketsViewsResponse = LogView;

export type GetLocationsBucketsViewsError = CommonErrors;

export const getLocationsBucketsViews: API.OperationMethod<GetLocationsBucketsViewsRequest, GetLocationsBucketsViewsResponse, GetLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLocationsBucketsViewsRequest,
  output: GetLocationsBucketsViewsResponse,
  errors: [],
}));

/** Creates a view over log entries in a log bucket. A bucket may contain a maximum of 30 views. */
export interface CreateLocationsBucketsViewsRequest {
  /** Required. The bucket in which to create the view `"projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"` For example:"projects/my-project/locations/global/buckets/my-bucket" */
  parent: string;
  /** Required. A client-assigned identifier such as "my-view". Identifiers are limited to 100 characters and can include only letters, digits, underscores, and hyphens. */
  viewId?: string;
  /** Request body */
  body?: LogView;
}

export const CreateLocationsBucketsViewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  viewId: Schema.optional(Schema.String).pipe(T.HttpQuery("viewId")),
  body: Schema.optional(LogView).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}/views", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateLocationsBucketsViewsRequest>;

export type CreateLocationsBucketsViewsResponse = LogView;
export const CreateLocationsBucketsViewsResponse = LogView;

export type CreateLocationsBucketsViewsError = CommonErrors;

export const createLocationsBucketsViews: API.OperationMethod<CreateLocationsBucketsViewsRequest, CreateLocationsBucketsViewsResponse, CreateLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateLocationsBucketsViewsRequest,
  output: CreateLocationsBucketsViewsResponse,
  errors: [],
}));

/** Updates a view on a log bucket. This method replaces the value of the filter field from the existing view with the corresponding value from the new view. If an UNAVAILABLE error is returned, this indicates that system is not in a state where it can update the view. If this occurs, please try again in a few minutes. */
export interface PatchLocationsBucketsViewsRequest {
  /** Required. The full resource name of the view to update "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" */
  name: string;
  /** Optional. Field mask that specifies the fields in view that need an update. A field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter */
  updateMask?: string;
  /** Request body */
  body?: LogView;
}

export const PatchLocationsBucketsViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogView).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchLocationsBucketsViewsRequest>;

export type PatchLocationsBucketsViewsResponse = LogView;
export const PatchLocationsBucketsViewsResponse = LogView;

export type PatchLocationsBucketsViewsError = CommonErrors;

export const patchLocationsBucketsViews: API.OperationMethod<PatchLocationsBucketsViewsRequest, PatchLocationsBucketsViewsResponse, PatchLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchLocationsBucketsViewsRequest,
  output: PatchLocationsBucketsViewsResponse,
  errors: [],
}));

/** Deletes a view on a log bucket. If an UNAVAILABLE error is returned, this indicates that system is not in a state where it can delete the view. If this occurs, please try again in a few minutes. */
export interface DeleteLocationsBucketsViewsRequest {
  /** Required. The full resource name of the view to delete: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" */
  name: string;
}

export const DeleteLocationsBucketsViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteLocationsBucketsViewsRequest>;

export type DeleteLocationsBucketsViewsResponse = Empty;
export const DeleteLocationsBucketsViewsResponse = Empty;

export type DeleteLocationsBucketsViewsError = CommonErrors;

export const deleteLocationsBucketsViews: API.OperationMethod<DeleteLocationsBucketsViewsRequest, DeleteLocationsBucketsViewsResponse, DeleteLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteLocationsBucketsViewsRequest,
  output: DeleteLocationsBucketsViewsResponse,
  errors: [],
}));

/** Lists links. */
export interface ListLocationsBucketsLinksRequest {
  /** Required. The parent resource whose links are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. */
  pageSize?: number;
}

export const ListLocationsBucketsLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}/links" }),
  svc,
) as unknown as Schema.Schema<ListLocationsBucketsLinksRequest>;

export type ListLocationsBucketsLinksResponse = ListLinksResponse;
export const ListLocationsBucketsLinksResponse = ListLinksResponse;

export type ListLocationsBucketsLinksError = CommonErrors;

export const listLocationsBucketsLinks = API.makePaginated(() => ({
  input: ListLocationsBucketsLinksRequest,
  output: ListLocationsBucketsLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a link. */
export interface GetLocationsBucketsLinksRequest {
  /** Required. The resource name of the link: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" */
  name: string;
}

export const GetLocationsBucketsLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}/links/{linksId}" }),
  svc,
) as unknown as Schema.Schema<GetLocationsBucketsLinksRequest>;

export type GetLocationsBucketsLinksResponse = Link;
export const GetLocationsBucketsLinksResponse = Link;

export type GetLocationsBucketsLinksError = CommonErrors;

export const getLocationsBucketsLinks: API.OperationMethod<GetLocationsBucketsLinksRequest, GetLocationsBucketsLinksResponse, GetLocationsBucketsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLocationsBucketsLinksRequest,
  output: GetLocationsBucketsLinksResponse,
  errors: [],
}));

/** Asynchronously creates a linked dataset in BigQuery which makes it possible to use BigQuery to read the logs stored in the log bucket. A log bucket may currently only contain one link. */
export interface CreateLocationsBucketsLinksRequest {
  /** Required. The full resource name of the bucket to create a link for. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" */
  parent: string;
  /** Required. The ID to use for the link. The link_id can have up to 100 characters. A valid link_id must only have alphanumeric characters and underscores within it. */
  linkId?: string;
  /** Request body */
  body?: Link;
}

export const CreateLocationsBucketsLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  linkId: Schema.optional(Schema.String).pipe(T.HttpQuery("linkId")),
  body: Schema.optional(Link).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}/links", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateLocationsBucketsLinksRequest>;

export type CreateLocationsBucketsLinksResponse = Operation;
export const CreateLocationsBucketsLinksResponse = Operation;

export type CreateLocationsBucketsLinksError = CommonErrors;

export const createLocationsBucketsLinks: API.OperationMethod<CreateLocationsBucketsLinksRequest, CreateLocationsBucketsLinksResponse, CreateLocationsBucketsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateLocationsBucketsLinksRequest,
  output: CreateLocationsBucketsLinksResponse,
  errors: [],
}));

/** Deletes a link. This will also delete the corresponding BigQuery linked dataset. */
export interface DeleteLocationsBucketsLinksRequest {
  /** Required. The full resource name of the link to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" */
  name: string;
}

export const DeleteLocationsBucketsLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/{v2Id}/{v2Id1}/locations/{locationsId}/buckets/{bucketsId}/links/{linksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteLocationsBucketsLinksRequest>;

export type DeleteLocationsBucketsLinksResponse = Operation;
export const DeleteLocationsBucketsLinksResponse = Operation;

export type DeleteLocationsBucketsLinksError = CommonErrors;

export const deleteLocationsBucketsLinks: API.OperationMethod<DeleteLocationsBucketsLinksRequest, DeleteLocationsBucketsLinksResponse, DeleteLocationsBucketsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteLocationsBucketsLinksRequest,
  output: DeleteLocationsBucketsLinksResponse,
  errors: [],
}));

/** Lists all the exclusions on the _Default sink in a parent resource. */
export interface ListExclusionsRequest {
  /** Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListExclusionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/exclusions" }),
  svc,
) as unknown as Schema.Schema<ListExclusionsRequest>;

export type ListExclusionsResponse_Op = ListExclusionsResponse;
export const ListExclusionsResponse_Op = ListExclusionsResponse;

export type ListExclusionsError = CommonErrors;

export const listExclusions = API.makePaginated(() => ({
  input: ListExclusionsRequest,
  output: ListExclusionsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the description of an exclusion in the _Default sink. */
export interface GetExclusionsRequest {
  /** Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion" */
  name: string;
}

export const GetExclusionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/exclusions/{exclusionsId}" }),
  svc,
) as unknown as Schema.Schema<GetExclusionsRequest>;

export type GetExclusionsResponse = LogExclusion;
export const GetExclusionsResponse = LogExclusion;

export type GetExclusionsError = CommonErrors;

export const getExclusions: API.OperationMethod<GetExclusionsRequest, GetExclusionsResponse, GetExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetExclusionsRequest,
  output: GetExclusionsResponse,
  errors: [],
}));

/** Creates a new exclusion in the _Default sink in a specified parent resource. Only log entries belonging to that resource can be excluded. You can have up to 10 exclusions in a resource. */
export interface CreateExclusionsRequest {
  /** Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-logging-project" "organizations/123456789" */
  parent: string;
  /** Request body */
  body?: LogExclusion;
}

export const CreateExclusionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(LogExclusion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/{v2Id}/{v2Id1}/exclusions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateExclusionsRequest>;

export type CreateExclusionsResponse = LogExclusion;
export const CreateExclusionsResponse = LogExclusion;

export type CreateExclusionsError = CommonErrors;

export const createExclusions: API.OperationMethod<CreateExclusionsRequest, CreateExclusionsResponse, CreateExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateExclusionsRequest,
  output: CreateExclusionsResponse,
  errors: [],
}));

/** Changes one or more properties of an existing exclusion in the _Default sink. */
export interface PatchExclusionsRequest {
  /** Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion" */
  name: string;
  /** Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description". */
  updateMask?: string;
  /** Request body */
  body?: LogExclusion;
}

export const PatchExclusionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogExclusion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/{v2Id}/{v2Id1}/exclusions/{exclusionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchExclusionsRequest>;

export type PatchExclusionsResponse = LogExclusion;
export const PatchExclusionsResponse = LogExclusion;

export type PatchExclusionsError = CommonErrors;

export const patchExclusions: API.OperationMethod<PatchExclusionsRequest, PatchExclusionsResponse, PatchExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchExclusionsRequest,
  output: PatchExclusionsResponse,
  errors: [],
}));

/** Deletes an exclusion in the _Default sink. */
export interface DeleteExclusionsRequest {
  /** Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion" */
  name: string;
}

export const DeleteExclusionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/{v2Id}/{v2Id1}/exclusions/{exclusionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteExclusionsRequest>;

export type DeleteExclusionsResponse = Empty;
export const DeleteExclusionsResponse = Empty;

export type DeleteExclusionsError = CommonErrors;

export const deleteExclusions: API.OperationMethod<DeleteExclusionsRequest, DeleteExclusionsResponse, DeleteExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteExclusionsRequest,
  output: DeleteExclusionsResponse,
  errors: [],
}));

/** Lists sinks. */
export interface ListSinksRequest {
  /** Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. A filter expression to constrain the sinks returned. Today, this only supports the following strings: '' 'in_scope("ALL")', 'in_scope("ANCESTOR")', 'in_scope("DEFAULT")'.Description of scopes below. ALL: Includes all of the sinks which can be returned in any other scope. ANCESTOR: Includes intercepting sinks owned by ancestor resources. DEFAULT: Includes sinks owned by parent.When the empty string is provided, then the filter 'in_scope("DEFAULT")' is applied. */
  filter?: string;
}

export const ListSinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/sinks" }),
  svc,
) as unknown as Schema.Schema<ListSinksRequest>;

export type ListSinksResponse_Op = ListSinksResponse;
export const ListSinksResponse_Op = ListSinksResponse;

export type ListSinksError = CommonErrors;

export const listSinks = API.makePaginated(() => ({
  input: ListSinksRequest,
  output: ListSinksResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a sink. */
export interface GetSinksRequest {
  /** Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
}

export const GetSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/sinks/{sinksId}" }),
  svc,
) as unknown as Schema.Schema<GetSinksRequest>;

export type GetSinksResponse = LogSink;
export const GetSinksResponse = LogSink;

export type GetSinksError = CommonErrors;

export const getSinks: API.OperationMethod<GetSinksRequest, GetSinksResponse, GetSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSinksRequest,
  output: GetSinksResponse,
  errors: [],
}));

/** Creates a sink that exports specified log entries to a destination. The export begins upon ingress, unless the sink's writer_identity is not permitted to write to the destination. A sink can export log entries only from the resource owning the sink. */
export interface CreateSinksRequest {
  /** Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-project" "organizations/123456789" */
  parent: string;
  /** Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Cloud Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) used by the sinks with the same parent. For more information, see writer_identity in LogSink. */
  uniqueWriterIdentity?: boolean;
  /** Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. */
  customWriterIdentity?: string;
  /** Request body */
  body?: LogSink;
}

export const CreateSinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  uniqueWriterIdentity: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("uniqueWriterIdentity")),
  customWriterIdentity: Schema.optional(Schema.String).pipe(T.HttpQuery("customWriterIdentity")),
  body: Schema.optional(LogSink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/{v2Id}/{v2Id1}/sinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSinksRequest>;

export type CreateSinksResponse = LogSink;
export const CreateSinksResponse = LogSink;

export type CreateSinksError = CommonErrors;

export const createSinks: API.OperationMethod<CreateSinksRequest, CreateSinksResponse, CreateSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSinksRequest,
  output: CreateSinksResponse,
  errors: [],
}));

/** Updates a sink. This method replaces the values of the destination and filter fields of the existing sink with the corresponding values from the new sink.The updated sink might also have a new writer_identity; see the unique_writer_identity field. */
export interface UpdateSinksRequest {
  /** Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
  /** Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) owned by Cloud Logging. It is an error if the old value is true and the new value is set to false or defaulted to false. */
  uniqueWriterIdentity?: boolean;
  /** Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. */
  customWriterIdentity?: string;
  /** Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:destination,filter,includeChildrenAt some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter */
  updateMask?: string;
  /** Request body */
  body?: LogSink;
}

export const UpdateSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
  uniqueWriterIdentity: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("uniqueWriterIdentity")),
  customWriterIdentity: Schema.optional(Schema.String).pipe(T.HttpQuery("customWriterIdentity")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogSink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v2/{v2Id}/{v2Id1}/sinks/{sinksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSinksRequest>;

export type UpdateSinksResponse = LogSink;
export const UpdateSinksResponse = LogSink;

export type UpdateSinksError = CommonErrors;

export const updateSinks: API.OperationMethod<UpdateSinksRequest, UpdateSinksResponse, UpdateSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSinksRequest,
  output: UpdateSinksResponse,
  errors: [],
}));

/** Deletes a sink. If the sink has a unique writer_identity, then that service account is also deleted. */
export interface DeleteSinksRequest {
  /** Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
}

export const DeleteSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/{v2Id}/{v2Id1}/sinks/{sinksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteSinksRequest>;

export type DeleteSinksResponse = Empty;
export const DeleteSinksResponse = Empty;

export type DeleteSinksError = CommonErrors;

export const deleteSinks: API.OperationMethod<DeleteSinksRequest, DeleteSinksResponse, DeleteSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteSinksRequest,
  output: DeleteSinksResponse,
  errors: [],
}));

/** Gets the Logging CMEK settings for the given resource.Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information. */
export interface GetCmekSettingsV2Request {
  /** Required. The resource for which to retrieve CMEK settings. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization. */
  name: string;
}

export const GetCmekSettingsV2Request = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/cmekSettings" }),
  svc,
) as unknown as Schema.Schema<GetCmekSettingsV2Request>;

export type GetCmekSettingsV2Response = CmekSettings;
export const GetCmekSettingsV2Response = CmekSettings;

export type GetCmekSettingsV2Error = CommonErrors;

export const getCmekSettingsV2: API.OperationMethod<GetCmekSettingsV2Request, GetCmekSettingsV2Response, GetCmekSettingsV2Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCmekSettingsV2Request,
  output: GetCmekSettingsV2Response,
  errors: [],
}));

/** Updates the Log Router CMEK settings for the given resource.Note: CMEK for the Log Router can currently only be configured for Google Cloud organizations. Once configured, it applies to all projects and folders in the Google Cloud organization.UpdateCmekSettings fails when any of the following are true: The value of kms_key_name is invalid. The associated service account doesn't have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key. Access to the key is disabled.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information. */
export interface UpdateCmekSettingsV2Request {
  /** Required. The resource name for the CMEK settings to update. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can currently only be configured for Google Cloud organizations. Once configured, it applies to all projects and folders in the Google Cloud organization. */
  name: string;
  /** Optional. Field mask identifying which fields from cmek_settings should be updated. A field will be overwritten if and only if it is in the update mask. Output only fields cannot be updated.See FieldMask for more information.For example: "updateMask=kmsKeyName" */
  updateMask?: string;
  /** Request body */
  body?: CmekSettings;
}

export const UpdateCmekSettingsV2Request = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(CmekSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/{v2Id}/{v2Id1}/cmekSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCmekSettingsV2Request>;

export type UpdateCmekSettingsV2Response = CmekSettings;
export const UpdateCmekSettingsV2Response = CmekSettings;

export type UpdateCmekSettingsV2Error = CommonErrors;

export const updateCmekSettingsV2: API.OperationMethod<UpdateCmekSettingsV2Request, UpdateCmekSettingsV2Response, UpdateCmekSettingsV2Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCmekSettingsV2Request,
  output: UpdateCmekSettingsV2Response,
  errors: [],
}));

/** Gets the settings for the given resource.Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts.See View default resource settings for Logging (https://docs.cloud.google.com/logging/docs/default-settings#view-org-settings) for more information. */
export interface GetSettingsV2Request {
  /** Required. The resource for which to retrieve settings. "projects/[PROJECT_ID]/settings" "organizations/[ORGANIZATION_ID]/settings" "billingAccounts/[BILLING_ACCOUNT_ID]/settings" "folders/[FOLDER_ID]/settings" For example:"organizations/12345/settings"Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts. */
  name: string;
}

export const GetSettingsV2Request = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/settings" }),
  svc,
) as unknown as Schema.Schema<GetSettingsV2Request>;

export type GetSettingsV2Response = Settings;
export const GetSettingsV2Response = Settings;

export type GetSettingsV2Error = CommonErrors;

export const getSettingsV2: API.OperationMethod<GetSettingsV2Request, GetSettingsV2Response, GetSettingsV2Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSettingsV2Request,
  output: GetSettingsV2Response,
  errors: [],
}));

/** Updates the settings for the given resource. This method applies to all feature configurations for organization and folders.UpdateSettings fails when any of the following are true: The value of storage_location either isn't supported by Logging or violates the location OrgPolicy. The default_sink_config field is set, but it has an unspecified filter write mode. The value of kms_key_name is invalid. The associated service account doesn't have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key. Access to the key is disabled.See Configure default settings for organizations and folders (https://docs.cloud.google.com/logging/docs/default-settings) for more information. */
export interface UpdateSettingsV2Request {
  /** Required. The resource name for the settings to update. "organizations/[ORGANIZATION_ID]/settings" "folders/[FOLDER_ID]/settings" For example:"organizations/12345/settings" */
  name: string;
  /** Optional. Field mask identifying which fields from settings should be updated. A field will be overwritten if and only if it is in the update mask. Output only fields cannot be updated.See FieldMask for more information.For example: "updateMask=kmsKeyName" */
  updateMask?: string;
  /** Request body */
  body?: Settings;
}

export const UpdateSettingsV2Request = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Settings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/{v2Id}/{v2Id1}/settings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSettingsV2Request>;

export type UpdateSettingsV2Response = Settings;
export const UpdateSettingsV2Response = Settings;

export type UpdateSettingsV2Error = CommonErrors;

export const updateSettingsV2: API.OperationMethod<UpdateSettingsV2Request, UpdateSettingsV2Response, UpdateSettingsV2Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSettingsV2Request,
  output: UpdateSettingsV2Response,
  errors: [],
}));

/** Gets the Logging CMEK settings for the given resource.Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information. */
export interface GetCmekSettingsProjectsRequest {
  /** Required. The resource for which to retrieve CMEK settings. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization. */
  name: string;
}

export const GetCmekSettingsProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/cmekSettings" }),
  svc,
) as unknown as Schema.Schema<GetCmekSettingsProjectsRequest>;

export type GetCmekSettingsProjectsResponse = CmekSettings;
export const GetCmekSettingsProjectsResponse = CmekSettings;

export type GetCmekSettingsProjectsError = CommonErrors;

export const getCmekSettingsProjects: API.OperationMethod<GetCmekSettingsProjectsRequest, GetCmekSettingsProjectsResponse, GetCmekSettingsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCmekSettingsProjectsRequest,
  output: GetCmekSettingsProjectsResponse,
  errors: [],
}));

/** Gets the settings for the given resource.Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts.See View default resource settings for Logging (https://docs.cloud.google.com/logging/docs/default-settings#view-org-settings) for more information. */
export interface GetSettingsProjectsRequest {
  /** Required. The resource for which to retrieve settings. "projects/[PROJECT_ID]/settings" "organizations/[ORGANIZATION_ID]/settings" "billingAccounts/[BILLING_ACCOUNT_ID]/settings" "folders/[FOLDER_ID]/settings" For example:"organizations/12345/settings"Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts. */
  name: string;
}

export const GetSettingsProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/settings" }),
  svc,
) as unknown as Schema.Schema<GetSettingsProjectsRequest>;

export type GetSettingsProjectsResponse = Settings;
export const GetSettingsProjectsResponse = Settings;

export type GetSettingsProjectsError = CommonErrors;

export const getSettingsProjects: API.OperationMethod<GetSettingsProjectsRequest, GetSettingsProjectsResponse, GetSettingsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSettingsProjectsRequest,
  output: GetSettingsProjectsResponse,
  errors: [],
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: List all public locations: Use the path GET /v1/locations. List project-visible locations: Use the path GET /v1/projects/{project_id}/locations. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like "displayName=tokyo", and is documented in more detail in AIP-160 (https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the next_page_token field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

export const listProjectsLocations = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED. */
export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

export const listProjectsLocationsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED. */
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
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Lists log buckets. */
export interface ListProjectsLocationsBucketsRequest {
  /** Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets. */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListProjectsLocationsBucketsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBucketsRequest>;

export type ListProjectsLocationsBucketsResponse = ListBucketsResponse;
export const ListProjectsLocationsBucketsResponse = ListBucketsResponse;

export type ListProjectsLocationsBucketsError = CommonErrors;

export const listProjectsLocationsBuckets = API.makePaginated(() => ({
  input: ListProjectsLocationsBucketsRequest,
  output: ListProjectsLocationsBucketsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a log bucket. */
export interface GetProjectsLocationsBucketsRequest {
  /** Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
}

export const GetProjectsLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBucketsRequest>;

export type GetProjectsLocationsBucketsResponse = LogBucket;
export const GetProjectsLocationsBucketsResponse = LogBucket;

export type GetProjectsLocationsBucketsError = CommonErrors;

export const getProjectsLocationsBuckets: API.OperationMethod<GetProjectsLocationsBucketsRequest, GetProjectsLocationsBucketsResponse, GetProjectsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBucketsRequest,
  output: GetProjectsLocationsBucketsResponse,
  errors: [],
}));

/** Creates a log bucket asynchronously that can be used to store log entries.After a bucket has been created, the bucket's location cannot be changed. */
export interface CreateAsyncProjectsLocationsBucketsRequest {
  /** Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global" */
  parent: string;
  /** Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. */
  bucketId?: string;
  /** Request body */
  body?: LogBucket;
}

export const CreateAsyncProjectsLocationsBucketsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  bucketId: Schema.optional(Schema.String).pipe(T.HttpQuery("bucketId")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets:createAsync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAsyncProjectsLocationsBucketsRequest>;

export type CreateAsyncProjectsLocationsBucketsResponse = Operation;
export const CreateAsyncProjectsLocationsBucketsResponse = Operation;

export type CreateAsyncProjectsLocationsBucketsError = CommonErrors;

export const createAsyncProjectsLocationsBuckets: API.OperationMethod<CreateAsyncProjectsLocationsBucketsRequest, CreateAsyncProjectsLocationsBucketsResponse, CreateAsyncProjectsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAsyncProjectsLocationsBucketsRequest,
  output: CreateAsyncProjectsLocationsBucketsResponse,
  errors: [],
}));

/** Updates a log bucket asynchronously.If the bucket has a lifecycle_state of DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket has been created, the bucket's location cannot be changed. */
export interface UpdateAsyncProjectsLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
  /** Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days */
  updateMask?: string;
  /** Request body */
  body?: LogBucket;
}

export const UpdateAsyncProjectsLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}:updateAsync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAsyncProjectsLocationsBucketsRequest>;

export type UpdateAsyncProjectsLocationsBucketsResponse = Operation;
export const UpdateAsyncProjectsLocationsBucketsResponse = Operation;

export type UpdateAsyncProjectsLocationsBucketsError = CommonErrors;

export const updateAsyncProjectsLocationsBuckets: API.OperationMethod<UpdateAsyncProjectsLocationsBucketsRequest, UpdateAsyncProjectsLocationsBucketsResponse, UpdateAsyncProjectsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAsyncProjectsLocationsBucketsRequest,
  output: UpdateAsyncProjectsLocationsBucketsResponse,
  errors: [],
}));

/** Creates a log bucket that can be used to store log entries. After a bucket has been created, the bucket's location cannot be changed. */
export interface CreateProjectsLocationsBucketsRequest {
  /** Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global" */
  parent: string;
  /** Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. */
  bucketId?: string;
  /** Request body */
  body?: LogBucket;
}

export const CreateProjectsLocationsBucketsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  bucketId: Schema.optional(Schema.String).pipe(T.HttpQuery("bucketId")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBucketsRequest>;

export type CreateProjectsLocationsBucketsResponse = LogBucket;
export const CreateProjectsLocationsBucketsResponse = LogBucket;

export type CreateProjectsLocationsBucketsError = CommonErrors;

export const createProjectsLocationsBuckets: API.OperationMethod<CreateProjectsLocationsBucketsRequest, CreateProjectsLocationsBucketsResponse, CreateProjectsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBucketsRequest,
  output: CreateProjectsLocationsBucketsResponse,
  errors: [],
}));

/** Updates a log bucket.If the bucket has a lifecycle_state of DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket has been created, the bucket's location cannot be changed. */
export interface PatchProjectsLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
  /** Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days */
  updateMask?: string;
  /** Request body */
  body?: LogBucket;
}

export const PatchProjectsLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBucketsRequest>;

export type PatchProjectsLocationsBucketsResponse = LogBucket;
export const PatchProjectsLocationsBucketsResponse = LogBucket;

export type PatchProjectsLocationsBucketsError = CommonErrors;

export const patchProjectsLocationsBuckets: API.OperationMethod<PatchProjectsLocationsBucketsRequest, PatchProjectsLocationsBucketsResponse, PatchProjectsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBucketsRequest,
  output: PatchProjectsLocationsBucketsResponse,
  errors: [],
}));

/** Deletes a log bucket.Changes the bucket's lifecycle_state to the DELETE_REQUESTED state. After 7 days, the bucket will be purged and all log entries in the bucket will be permanently deleted. */
export interface DeleteProjectsLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
}

export const DeleteProjectsLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBucketsRequest>;

export type DeleteProjectsLocationsBucketsResponse = Empty;
export const DeleteProjectsLocationsBucketsResponse = Empty;

export type DeleteProjectsLocationsBucketsError = CommonErrors;

export const deleteProjectsLocationsBuckets: API.OperationMethod<DeleteProjectsLocationsBucketsRequest, DeleteProjectsLocationsBucketsResponse, DeleteProjectsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBucketsRequest,
  output: DeleteProjectsLocationsBucketsResponse,
  errors: [],
}));

/** Undeletes a log bucket. A bucket that has been deleted can be undeleted within the grace period of 7 days. */
export interface UndeleteProjectsLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to undelete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
  /** Request body */
  body?: UndeleteBucketRequest;
}

export const UndeleteProjectsLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteBucketRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectsLocationsBucketsRequest>;

export type UndeleteProjectsLocationsBucketsResponse = Empty;
export const UndeleteProjectsLocationsBucketsResponse = Empty;

export type UndeleteProjectsLocationsBucketsError = CommonErrors;

export const undeleteProjectsLocationsBuckets: API.OperationMethod<UndeleteProjectsLocationsBucketsRequest, UndeleteProjectsLocationsBucketsResponse, UndeleteProjectsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteProjectsLocationsBucketsRequest,
  output: UndeleteProjectsLocationsBucketsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsBucketsViewsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsBucketsViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsBucketsViewsRequest>;

export type SetIamPolicyProjectsLocationsBucketsViewsResponse = Policy;
export const SetIamPolicyProjectsLocationsBucketsViewsResponse = Policy;

export type SetIamPolicyProjectsLocationsBucketsViewsError = CommonErrors;

export const setIamPolicyProjectsLocationsBucketsViews: API.OperationMethod<SetIamPolicyProjectsLocationsBucketsViewsRequest, SetIamPolicyProjectsLocationsBucketsViewsResponse, SetIamPolicyProjectsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsBucketsViewsRequest,
  output: SetIamPolicyProjectsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsBucketsViewsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsBucketsViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsBucketsViewsRequest>;

export type GetIamPolicyProjectsLocationsBucketsViewsResponse = Policy;
export const GetIamPolicyProjectsLocationsBucketsViewsResponse = Policy;

export type GetIamPolicyProjectsLocationsBucketsViewsError = CommonErrors;

export const getIamPolicyProjectsLocationsBucketsViews: API.OperationMethod<GetIamPolicyProjectsLocationsBucketsViewsRequest, GetIamPolicyProjectsLocationsBucketsViewsResponse, GetIamPolicyProjectsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsBucketsViewsRequest,
  output: GetIamPolicyProjectsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsBucketsViewsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsBucketsViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsBucketsViewsRequest>;

export type TestIamPermissionsProjectsLocationsBucketsViewsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsBucketsViewsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsBucketsViewsError = CommonErrors;

export const testIamPermissionsProjectsLocationsBucketsViews: API.OperationMethod<TestIamPermissionsProjectsLocationsBucketsViewsRequest, TestIamPermissionsProjectsLocationsBucketsViewsResponse, TestIamPermissionsProjectsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsBucketsViewsRequest,
  output: TestIamPermissionsProjectsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Lists views on a log bucket. */
export interface ListProjectsLocationsBucketsViewsRequest {
  /** Required. The bucket whose views are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListProjectsLocationsBucketsViewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/views" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBucketsViewsRequest>;

export type ListProjectsLocationsBucketsViewsResponse = ListViewsResponse;
export const ListProjectsLocationsBucketsViewsResponse = ListViewsResponse;

export type ListProjectsLocationsBucketsViewsError = CommonErrors;

export const listProjectsLocationsBucketsViews = API.makePaginated(() => ({
  input: ListProjectsLocationsBucketsViewsRequest,
  output: ListProjectsLocationsBucketsViewsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a view on a log bucket. */
export interface GetProjectsLocationsBucketsViewsRequest {
  /** Required. The resource name of the policy: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" */
  name: string;
}

export const GetProjectsLocationsBucketsViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBucketsViewsRequest>;

export type GetProjectsLocationsBucketsViewsResponse = LogView;
export const GetProjectsLocationsBucketsViewsResponse = LogView;

export type GetProjectsLocationsBucketsViewsError = CommonErrors;

export const getProjectsLocationsBucketsViews: API.OperationMethod<GetProjectsLocationsBucketsViewsRequest, GetProjectsLocationsBucketsViewsResponse, GetProjectsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBucketsViewsRequest,
  output: GetProjectsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Creates a view over log entries in a log bucket. A bucket may contain a maximum of 30 views. */
export interface CreateProjectsLocationsBucketsViewsRequest {
  /** Required. The bucket in which to create the view `"projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"` For example:"projects/my-project/locations/global/buckets/my-bucket" */
  parent: string;
  /** Required. A client-assigned identifier such as "my-view". Identifiers are limited to 100 characters and can include only letters, digits, underscores, and hyphens. */
  viewId?: string;
  /** Request body */
  body?: LogView;
}

export const CreateProjectsLocationsBucketsViewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  viewId: Schema.optional(Schema.String).pipe(T.HttpQuery("viewId")),
  body: Schema.optional(LogView).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/views", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBucketsViewsRequest>;

export type CreateProjectsLocationsBucketsViewsResponse = LogView;
export const CreateProjectsLocationsBucketsViewsResponse = LogView;

export type CreateProjectsLocationsBucketsViewsError = CommonErrors;

export const createProjectsLocationsBucketsViews: API.OperationMethod<CreateProjectsLocationsBucketsViewsRequest, CreateProjectsLocationsBucketsViewsResponse, CreateProjectsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBucketsViewsRequest,
  output: CreateProjectsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Updates a view on a log bucket. This method replaces the value of the filter field from the existing view with the corresponding value from the new view. If an UNAVAILABLE error is returned, this indicates that system is not in a state where it can update the view. If this occurs, please try again in a few minutes. */
export interface PatchProjectsLocationsBucketsViewsRequest {
  /** Required. The full resource name of the view to update "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" */
  name: string;
  /** Optional. Field mask that specifies the fields in view that need an update. A field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter */
  updateMask?: string;
  /** Request body */
  body?: LogView;
}

export const PatchProjectsLocationsBucketsViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogView).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBucketsViewsRequest>;

export type PatchProjectsLocationsBucketsViewsResponse = LogView;
export const PatchProjectsLocationsBucketsViewsResponse = LogView;

export type PatchProjectsLocationsBucketsViewsError = CommonErrors;

export const patchProjectsLocationsBucketsViews: API.OperationMethod<PatchProjectsLocationsBucketsViewsRequest, PatchProjectsLocationsBucketsViewsResponse, PatchProjectsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBucketsViewsRequest,
  output: PatchProjectsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Deletes a view on a log bucket. If an UNAVAILABLE error is returned, this indicates that system is not in a state where it can delete the view. If this occurs, please try again in a few minutes. */
export interface DeleteProjectsLocationsBucketsViewsRequest {
  /** Required. The full resource name of the view to delete: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" */
  name: string;
}

export const DeleteProjectsLocationsBucketsViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBucketsViewsRequest>;

export type DeleteProjectsLocationsBucketsViewsResponse = Empty;
export const DeleteProjectsLocationsBucketsViewsResponse = Empty;

export type DeleteProjectsLocationsBucketsViewsError = CommonErrors;

export const deleteProjectsLocationsBucketsViews: API.OperationMethod<DeleteProjectsLocationsBucketsViewsRequest, DeleteProjectsLocationsBucketsViewsResponse, DeleteProjectsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBucketsViewsRequest,
  output: DeleteProjectsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed. */
export interface ListProjectsLocationsBucketsViewsLogsRequest {
  /** Required. The resource name to list logs for: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID] */
  parent: string;
  /** Optional. List of resource names to list logs for: projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To support legacy queries, it could also be: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]The resource name in the parent field is added to this list. */
  resourceNames?: string[];
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ListProjectsLocationsBucketsViewsLogsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  resourceNames: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("resourceNames")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}/logs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBucketsViewsLogsRequest>;

export type ListProjectsLocationsBucketsViewsLogsResponse = ListLogsResponse;
export const ListProjectsLocationsBucketsViewsLogsResponse = ListLogsResponse;

export type ListProjectsLocationsBucketsViewsLogsError = CommonErrors;

export const listProjectsLocationsBucketsViewsLogs = API.makePaginated(() => ({
  input: ListProjectsLocationsBucketsViewsLogsRequest,
  output: ListProjectsLocationsBucketsViewsLogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists links. */
export interface ListProjectsLocationsBucketsLinksRequest {
  /** Required. The parent resource whose links are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. */
  pageSize?: number;
}

export const ListProjectsLocationsBucketsLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/links" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBucketsLinksRequest>;

export type ListProjectsLocationsBucketsLinksResponse = ListLinksResponse;
export const ListProjectsLocationsBucketsLinksResponse = ListLinksResponse;

export type ListProjectsLocationsBucketsLinksError = CommonErrors;

export const listProjectsLocationsBucketsLinks = API.makePaginated(() => ({
  input: ListProjectsLocationsBucketsLinksRequest,
  output: ListProjectsLocationsBucketsLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a link. */
export interface GetProjectsLocationsBucketsLinksRequest {
  /** Required. The resource name of the link: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" */
  name: string;
}

export const GetProjectsLocationsBucketsLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/links/{linksId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBucketsLinksRequest>;

export type GetProjectsLocationsBucketsLinksResponse = Link;
export const GetProjectsLocationsBucketsLinksResponse = Link;

export type GetProjectsLocationsBucketsLinksError = CommonErrors;

export const getProjectsLocationsBucketsLinks: API.OperationMethod<GetProjectsLocationsBucketsLinksRequest, GetProjectsLocationsBucketsLinksResponse, GetProjectsLocationsBucketsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBucketsLinksRequest,
  output: GetProjectsLocationsBucketsLinksResponse,
  errors: [],
}));

/** Asynchronously creates a linked dataset in BigQuery which makes it possible to use BigQuery to read the logs stored in the log bucket. A log bucket may currently only contain one link. */
export interface CreateProjectsLocationsBucketsLinksRequest {
  /** Required. The full resource name of the bucket to create a link for. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" */
  parent: string;
  /** Required. The ID to use for the link. The link_id can have up to 100 characters. A valid link_id must only have alphanumeric characters and underscores within it. */
  linkId?: string;
  /** Request body */
  body?: Link;
}

export const CreateProjectsLocationsBucketsLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  linkId: Schema.optional(Schema.String).pipe(T.HttpQuery("linkId")),
  body: Schema.optional(Link).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/links", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBucketsLinksRequest>;

export type CreateProjectsLocationsBucketsLinksResponse = Operation;
export const CreateProjectsLocationsBucketsLinksResponse = Operation;

export type CreateProjectsLocationsBucketsLinksError = CommonErrors;

export const createProjectsLocationsBucketsLinks: API.OperationMethod<CreateProjectsLocationsBucketsLinksRequest, CreateProjectsLocationsBucketsLinksResponse, CreateProjectsLocationsBucketsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBucketsLinksRequest,
  output: CreateProjectsLocationsBucketsLinksResponse,
  errors: [],
}));

/** Deletes a link. This will also delete the corresponding BigQuery linked dataset. */
export interface DeleteProjectsLocationsBucketsLinksRequest {
  /** Required. The full resource name of the link to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" */
  name: string;
}

export const DeleteProjectsLocationsBucketsLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/buckets/{bucketsId}/links/{linksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBucketsLinksRequest>;

export type DeleteProjectsLocationsBucketsLinksResponse = Operation;
export const DeleteProjectsLocationsBucketsLinksResponse = Operation;

export type DeleteProjectsLocationsBucketsLinksError = CommonErrors;

export const deleteProjectsLocationsBucketsLinks: API.OperationMethod<DeleteProjectsLocationsBucketsLinksRequest, DeleteProjectsLocationsBucketsLinksResponse, DeleteProjectsLocationsBucketsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBucketsLinksRequest,
  output: DeleteProjectsLocationsBucketsLinksResponse,
  errors: [],
}));

/** Lists log scopes. */
export interface ListProjectsLocationsLogScopesRequest {
  /** Required. The parent resource whose log scopes are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListProjectsLocationsLogScopesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/logScopes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsLogScopesRequest>;

export type ListProjectsLocationsLogScopesResponse = ListLogScopesResponse;
export const ListProjectsLocationsLogScopesResponse = ListLogScopesResponse;

export type ListProjectsLocationsLogScopesError = CommonErrors;

export const listProjectsLocationsLogScopes = API.makePaginated(() => ({
  input: ListProjectsLocationsLogScopesRequest,
  output: ListProjectsLocationsLogScopesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a log scope. */
export interface GetProjectsLocationsLogScopesRequest {
  /** Required. The resource name of the log scope: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global/logScopes/my-log-scope" */
  name: string;
}

export const GetProjectsLocationsLogScopesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/logScopes/{logScopesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsLogScopesRequest>;

export type GetProjectsLocationsLogScopesResponse = LogScope;
export const GetProjectsLocationsLogScopesResponse = LogScope;

export type GetProjectsLocationsLogScopesError = CommonErrors;

export const getProjectsLocationsLogScopes: API.OperationMethod<GetProjectsLocationsLogScopesRequest, GetProjectsLocationsLogScopesResponse, GetProjectsLocationsLogScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsLogScopesRequest,
  output: GetProjectsLocationsLogScopesResponse,
  errors: [],
}));

/** Creates a log scope. */
export interface CreateProjectsLocationsLogScopesRequest {
  /** Required. The parent resource in which to create the log scope: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global" */
  parent: string;
  /** Required. A client-assigned identifier such as "log-scope". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. First character has to be alphanumeric. */
  logScopeId?: string;
  /** Request body */
  body?: LogScope;
}

export const CreateProjectsLocationsLogScopesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  logScopeId: Schema.optional(Schema.String).pipe(T.HttpQuery("logScopeId")),
  body: Schema.optional(LogScope).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/logScopes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsLogScopesRequest>;

export type CreateProjectsLocationsLogScopesResponse = LogScope;
export const CreateProjectsLocationsLogScopesResponse = LogScope;

export type CreateProjectsLocationsLogScopesError = CommonErrors;

export const createProjectsLocationsLogScopes: API.OperationMethod<CreateProjectsLocationsLogScopesRequest, CreateProjectsLocationsLogScopesResponse, CreateProjectsLocationsLogScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsLogScopesRequest,
  output: CreateProjectsLocationsLogScopesResponse,
  errors: [],
}));

/** Updates a log scope. */
export interface PatchProjectsLocationsLogScopesRequest {
  /** Output only. The resource name of the log scope.Log scopes are only available in the global location. For example:projects/my-project/locations/global/logScopes/my-log-scope */
  name: string;
  /** Optional. Field mask that specifies the fields in log_scope that need an update. A field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=description */
  updateMask?: string;
  /** Request body */
  body?: LogScope;
}

export const PatchProjectsLocationsLogScopesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogScope).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/logScopes/{logScopesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsLogScopesRequest>;

export type PatchProjectsLocationsLogScopesResponse = LogScope;
export const PatchProjectsLocationsLogScopesResponse = LogScope;

export type PatchProjectsLocationsLogScopesError = CommonErrors;

export const patchProjectsLocationsLogScopes: API.OperationMethod<PatchProjectsLocationsLogScopesRequest, PatchProjectsLocationsLogScopesResponse, PatchProjectsLocationsLogScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsLogScopesRequest,
  output: PatchProjectsLocationsLogScopesResponse,
  errors: [],
}));

/** Deletes a log scope. */
export interface DeleteProjectsLocationsLogScopesRequest {
  /** Required. The resource name of the log scope to delete: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global/logScopes/my-log-scope" */
  name: string;
}

export const DeleteProjectsLocationsLogScopesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/logScopes/{logScopesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsLogScopesRequest>;

export type DeleteProjectsLocationsLogScopesResponse = Empty;
export const DeleteProjectsLocationsLogScopesResponse = Empty;

export type DeleteProjectsLocationsLogScopesError = CommonErrors;

export const deleteProjectsLocationsLogScopes: API.OperationMethod<DeleteProjectsLocationsLogScopesRequest, DeleteProjectsLocationsLogScopesResponse, DeleteProjectsLocationsLogScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsLogScopesRequest,
  output: DeleteProjectsLocationsLogScopesResponse,
  errors: [],
}));

/** Lists the SavedQueries that were created by the user making the request. */
export interface ListProjectsLocationsSavedQueriesRequest {
  /** Required. The resource to which the listed queries belong. "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example: "projects/my-project/locations/us-central1" Note: The locations portion of the resource must be specified. To get a list of all saved queries, a wildcard character - can be used for LOCATION_ID, for example: "projects/my-project/locations/-" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. Specifies the type ("Logging" or "OpsAnalytics") and the visibility (PRIVATE or SHARED) of the saved queries to list. If provided, the filter must contain either the type function or a visibility token, or both. If both are chosen, they can be placed in any order, but they must be joined by the AND operator or the empty character.The two supported type function calls are: type("Logging") type("OpsAnalytics")The two supported visibility tokens are: visibility = PRIVATE visibility = SHAREDFor example:type("Logging") AND visibility = PRIVATE visibility=SHARED type("OpsAnalytics") type("OpsAnalytics)" visibility = PRIVATE visibility = SHARED */
  filter?: string;
}

export const ListProjectsLocationsSavedQueriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/savedQueries" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSavedQueriesRequest>;

export type ListProjectsLocationsSavedQueriesResponse = ListSavedQueriesResponse;
export const ListProjectsLocationsSavedQueriesResponse = ListSavedQueriesResponse;

export type ListProjectsLocationsSavedQueriesError = CommonErrors;

export const listProjectsLocationsSavedQueries = API.makePaginated(() => ({
  input: ListProjectsLocationsSavedQueriesRequest,
  output: ListProjectsLocationsSavedQueriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns all data associated with the requested query. */
export interface GetProjectsLocationsSavedQueriesRequest {
  /** Required. The resource name of the saved query. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" For example: "projects/my-project/locations/global/savedQueries/my-saved-query" */
  name: string;
}

export const GetProjectsLocationsSavedQueriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/savedQueries/{savedQueriesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSavedQueriesRequest>;

export type GetProjectsLocationsSavedQueriesResponse = SavedQuery;
export const GetProjectsLocationsSavedQueriesResponse = SavedQuery;

export type GetProjectsLocationsSavedQueriesError = CommonErrors;

export const getProjectsLocationsSavedQueries: API.OperationMethod<GetProjectsLocationsSavedQueriesRequest, GetProjectsLocationsSavedQueriesResponse, GetProjectsLocationsSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSavedQueriesRequest,
  output: GetProjectsLocationsSavedQueriesResponse,
  errors: [],
}));

/** Creates a new SavedQuery for the user making the request. */
export interface CreateProjectsLocationsSavedQueriesRequest {
  /** Required. The parent resource in which to create the saved query: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example: "projects/my-project/locations/global" "organizations/123456789/locations/us-central1" */
  parent: string;
  /** Optional. The ID to use for the saved query, which will become the final component of the saved query's resource name.If the saved_query_id is not provided, the system will generate an alphanumeric ID.The saved_query_id is limited to 100 characters and can include only the following characters: upper and lower-case alphanumeric characters, underscores, hyphens, periods.First character has to be alphanumeric. */
  savedQueryId?: string;
  /** Request body */
  body?: SavedQuery;
}

export const CreateProjectsLocationsSavedQueriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  savedQueryId: Schema.optional(Schema.String).pipe(T.HttpQuery("savedQueryId")),
  body: Schema.optional(SavedQuery).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/savedQueries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSavedQueriesRequest>;

export type CreateProjectsLocationsSavedQueriesResponse = SavedQuery;
export const CreateProjectsLocationsSavedQueriesResponse = SavedQuery;

export type CreateProjectsLocationsSavedQueriesError = CommonErrors;

export const createProjectsLocationsSavedQueries: API.OperationMethod<CreateProjectsLocationsSavedQueriesRequest, CreateProjectsLocationsSavedQueriesResponse, CreateProjectsLocationsSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSavedQueriesRequest,
  output: CreateProjectsLocationsSavedQueriesResponse,
  errors: [],
}));

/** Updates an existing SavedQuery. */
export interface PatchProjectsLocationsSavedQueriesRequest {
  /** Output only. Resource name of the saved query.In the format: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" For a list of supported locations, see Supported Regions (https://docs.cloud.google.com/logging/docs/region-support#bucket-regions)After the saved query is created, the location cannot be changed.If the user doesn't provide a QUERY_ID, the system will generate an alphanumeric ID. */
  name: string;
  /** Required. A non-empty list of fields to change in the existing saved query. Fields are relative to the saved_query and new values for the fields are taken from the corresponding fields in the SavedQuery included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.To update all mutable fields, specify an update_mask of *.For example, to change the description and query filter text of a saved query, specify an update_mask of "description, query.filter". */
  updateMask?: string;
  /** Request body */
  body?: SavedQuery;
}

export const PatchProjectsLocationsSavedQueriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SavedQuery).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/savedQueries/{savedQueriesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsSavedQueriesRequest>;

export type PatchProjectsLocationsSavedQueriesResponse = SavedQuery;
export const PatchProjectsLocationsSavedQueriesResponse = SavedQuery;

export type PatchProjectsLocationsSavedQueriesError = CommonErrors;

export const patchProjectsLocationsSavedQueries: API.OperationMethod<PatchProjectsLocationsSavedQueriesRequest, PatchProjectsLocationsSavedQueriesResponse, PatchProjectsLocationsSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsSavedQueriesRequest,
  output: PatchProjectsLocationsSavedQueriesResponse,
  errors: [],
}));

/** Deletes an existing SavedQuery that was created by the user making the request. */
export interface DeleteProjectsLocationsSavedQueriesRequest {
  /** Required. The full resource name of the saved query to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" For example: "projects/my-project/locations/global/savedQueries/my-saved-query" */
  name: string;
}

export const DeleteProjectsLocationsSavedQueriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/savedQueries/{savedQueriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSavedQueriesRequest>;

export type DeleteProjectsLocationsSavedQueriesResponse = Empty;
export const DeleteProjectsLocationsSavedQueriesResponse = Empty;

export type DeleteProjectsLocationsSavedQueriesError = CommonErrors;

export const deleteProjectsLocationsSavedQueries: API.OperationMethod<DeleteProjectsLocationsSavedQueriesRequest, DeleteProjectsLocationsSavedQueriesResponse, DeleteProjectsLocationsSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSavedQueriesRequest,
  output: DeleteProjectsLocationsSavedQueriesResponse,
  errors: [],
}));

/** Lists the RecentQueries that were created by the user making the request. */
export interface ListProjectsLocationsRecentQueriesRequest {
  /** Required. The resource to which the listed queries belong. "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example:projects/my-project/locations/us-central1Note: The location portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all recent queries. */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. Specifies the type ("Logging" or "OpsAnalytics") of the recent queries to list. The only valid value for this field is one of the two allowable type function calls, which are the following: type("Logging") type("OpsAnalytics") */
  filter?: string;
}

export const ListProjectsLocationsRecentQueriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/recentQueries" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRecentQueriesRequest>;

export type ListProjectsLocationsRecentQueriesResponse = ListRecentQueriesResponse;
export const ListProjectsLocationsRecentQueriesResponse = ListRecentQueriesResponse;

export type ListProjectsLocationsRecentQueriesError = CommonErrors;

export const listProjectsLocationsRecentQueries = API.makePaginated(() => ({
  input: ListProjectsLocationsRecentQueriesRequest,
  output: ListProjectsLocationsRecentQueriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all the exclusions on the _Default sink in a parent resource. */
export interface ListProjectsExclusionsRequest {
  /** Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListProjectsExclusionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/exclusions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsExclusionsRequest>;

export type ListProjectsExclusionsResponse = ListExclusionsResponse;
export const ListProjectsExclusionsResponse = ListExclusionsResponse;

export type ListProjectsExclusionsError = CommonErrors;

export const listProjectsExclusions = API.makePaginated(() => ({
  input: ListProjectsExclusionsRequest,
  output: ListProjectsExclusionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the description of an exclusion in the _Default sink. */
export interface GetProjectsExclusionsRequest {
  /** Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion" */
  name: string;
}

export const GetProjectsExclusionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/exclusions/{exclusionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsExclusionsRequest>;

export type GetProjectsExclusionsResponse = LogExclusion;
export const GetProjectsExclusionsResponse = LogExclusion;

export type GetProjectsExclusionsError = CommonErrors;

export const getProjectsExclusions: API.OperationMethod<GetProjectsExclusionsRequest, GetProjectsExclusionsResponse, GetProjectsExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsExclusionsRequest,
  output: GetProjectsExclusionsResponse,
  errors: [],
}));

/** Creates a new exclusion in the _Default sink in a specified parent resource. Only log entries belonging to that resource can be excluded. You can have up to 10 exclusions in a resource. */
export interface CreateProjectsExclusionsRequest {
  /** Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-logging-project" "organizations/123456789" */
  parent: string;
  /** Request body */
  body?: LogExclusion;
}

export const CreateProjectsExclusionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(LogExclusion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/exclusions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsExclusionsRequest>;

export type CreateProjectsExclusionsResponse = LogExclusion;
export const CreateProjectsExclusionsResponse = LogExclusion;

export type CreateProjectsExclusionsError = CommonErrors;

export const createProjectsExclusions: API.OperationMethod<CreateProjectsExclusionsRequest, CreateProjectsExclusionsResponse, CreateProjectsExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsExclusionsRequest,
  output: CreateProjectsExclusionsResponse,
  errors: [],
}));

/** Changes one or more properties of an existing exclusion in the _Default sink. */
export interface PatchProjectsExclusionsRequest {
  /** Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion" */
  name: string;
  /** Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description". */
  updateMask?: string;
  /** Request body */
  body?: LogExclusion;
}

export const PatchProjectsExclusionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogExclusion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/exclusions/{exclusionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsExclusionsRequest>;

export type PatchProjectsExclusionsResponse = LogExclusion;
export const PatchProjectsExclusionsResponse = LogExclusion;

export type PatchProjectsExclusionsError = CommonErrors;

export const patchProjectsExclusions: API.OperationMethod<PatchProjectsExclusionsRequest, PatchProjectsExclusionsResponse, PatchProjectsExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsExclusionsRequest,
  output: PatchProjectsExclusionsResponse,
  errors: [],
}));

/** Deletes an exclusion in the _Default sink. */
export interface DeleteProjectsExclusionsRequest {
  /** Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion" */
  name: string;
}

export const DeleteProjectsExclusionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/exclusions/{exclusionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsExclusionsRequest>;

export type DeleteProjectsExclusionsResponse = Empty;
export const DeleteProjectsExclusionsResponse = Empty;

export type DeleteProjectsExclusionsError = CommonErrors;

export const deleteProjectsExclusions: API.OperationMethod<DeleteProjectsExclusionsRequest, DeleteProjectsExclusionsResponse, DeleteProjectsExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsExclusionsRequest,
  output: DeleteProjectsExclusionsResponse,
  errors: [],
}));

/** Lists sinks. */
export interface ListProjectsSinksRequest {
  /** Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. A filter expression to constrain the sinks returned. Today, this only supports the following strings: '' 'in_scope("ALL")', 'in_scope("ANCESTOR")', 'in_scope("DEFAULT")'.Description of scopes below. ALL: Includes all of the sinks which can be returned in any other scope. ANCESTOR: Includes intercepting sinks owned by ancestor resources. DEFAULT: Includes sinks owned by parent.When the empty string is provided, then the filter 'in_scope("DEFAULT")' is applied. */
  filter?: string;
}

export const ListProjectsSinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/sinks" }),
  svc,
) as unknown as Schema.Schema<ListProjectsSinksRequest>;

export type ListProjectsSinksResponse = ListSinksResponse;
export const ListProjectsSinksResponse = ListSinksResponse;

export type ListProjectsSinksError = CommonErrors;

export const listProjectsSinks = API.makePaginated(() => ({
  input: ListProjectsSinksRequest,
  output: ListProjectsSinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a sink. */
export interface GetProjectsSinksRequest {
  /** Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
}

export const GetProjectsSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/sinks/{sinksId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsSinksRequest>;

export type GetProjectsSinksResponse = LogSink;
export const GetProjectsSinksResponse = LogSink;

export type GetProjectsSinksError = CommonErrors;

export const getProjectsSinks: API.OperationMethod<GetProjectsSinksRequest, GetProjectsSinksResponse, GetProjectsSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsSinksRequest,
  output: GetProjectsSinksResponse,
  errors: [],
}));

/** Creates a sink that exports specified log entries to a destination. The export begins upon ingress, unless the sink's writer_identity is not permitted to write to the destination. A sink can export log entries only from the resource owning the sink. */
export interface CreateProjectsSinksRequest {
  /** Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-project" "organizations/123456789" */
  parent: string;
  /** Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Cloud Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) used by the sinks with the same parent. For more information, see writer_identity in LogSink. */
  uniqueWriterIdentity?: boolean;
  /** Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. */
  customWriterIdentity?: string;
  /** Request body */
  body?: LogSink;
}

export const CreateProjectsSinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  uniqueWriterIdentity: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("uniqueWriterIdentity")),
  customWriterIdentity: Schema.optional(Schema.String).pipe(T.HttpQuery("customWriterIdentity")),
  body: Schema.optional(LogSink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/sinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsSinksRequest>;

export type CreateProjectsSinksResponse = LogSink;
export const CreateProjectsSinksResponse = LogSink;

export type CreateProjectsSinksError = CommonErrors;

export const createProjectsSinks: API.OperationMethod<CreateProjectsSinksRequest, CreateProjectsSinksResponse, CreateProjectsSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsSinksRequest,
  output: CreateProjectsSinksResponse,
  errors: [],
}));

/** Updates a sink. This method replaces the values of the destination and filter fields of the existing sink with the corresponding values from the new sink.The updated sink might also have a new writer_identity; see the unique_writer_identity field. */
export interface UpdateProjectsSinksRequest {
  /** Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
  /** Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) owned by Cloud Logging. It is an error if the old value is true and the new value is set to false or defaulted to false. */
  uniqueWriterIdentity?: boolean;
  /** Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. */
  customWriterIdentity?: string;
  /** Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:destination,filter,includeChildrenAt some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter */
  updateMask?: string;
  /** Request body */
  body?: LogSink;
}

export const UpdateProjectsSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
  uniqueWriterIdentity: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("uniqueWriterIdentity")),
  customWriterIdentity: Schema.optional(Schema.String).pipe(T.HttpQuery("customWriterIdentity")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogSink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v2/projects/{projectsId}/sinks/{sinksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsSinksRequest>;

export type UpdateProjectsSinksResponse = LogSink;
export const UpdateProjectsSinksResponse = LogSink;

export type UpdateProjectsSinksError = CommonErrors;

export const updateProjectsSinks: API.OperationMethod<UpdateProjectsSinksRequest, UpdateProjectsSinksResponse, UpdateProjectsSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsSinksRequest,
  output: UpdateProjectsSinksResponse,
  errors: [],
}));

/** Updates a sink. This method replaces the values of the destination and filter fields of the existing sink with the corresponding values from the new sink.The updated sink might also have a new writer_identity; see the unique_writer_identity field. */
export interface PatchProjectsSinksRequest {
  /** Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
  /** Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) owned by Cloud Logging. It is an error if the old value is true and the new value is set to false or defaulted to false. */
  uniqueWriterIdentity?: boolean;
  /** Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. */
  customWriterIdentity?: string;
  /** Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:destination,filter,includeChildrenAt some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter */
  updateMask?: string;
  /** Request body */
  body?: LogSink;
}

export const PatchProjectsSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
  uniqueWriterIdentity: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("uniqueWriterIdentity")),
  customWriterIdentity: Schema.optional(Schema.String).pipe(T.HttpQuery("customWriterIdentity")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogSink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/sinks/{sinksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsSinksRequest>;

export type PatchProjectsSinksResponse = LogSink;
export const PatchProjectsSinksResponse = LogSink;

export type PatchProjectsSinksError = CommonErrors;

export const patchProjectsSinks: API.OperationMethod<PatchProjectsSinksRequest, PatchProjectsSinksResponse, PatchProjectsSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsSinksRequest,
  output: PatchProjectsSinksResponse,
  errors: [],
}));

/** Deletes a sink. If the sink has a unique writer_identity, then that service account is also deleted. */
export interface DeleteProjectsSinksRequest {
  /** Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
}

export const DeleteProjectsSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/sinks/{sinksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsSinksRequest>;

export type DeleteProjectsSinksResponse = Empty;
export const DeleteProjectsSinksResponse = Empty;

export type DeleteProjectsSinksError = CommonErrors;

export const deleteProjectsSinks: API.OperationMethod<DeleteProjectsSinksRequest, DeleteProjectsSinksResponse, DeleteProjectsSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsSinksRequest,
  output: DeleteProjectsSinksResponse,
  errors: [],
}));

/** Deletes all the log entries in a log for the global _Default Log Bucket. The log reappears if it receives new entries. Log entries written shortly before the delete operation might not be deleted. Entries received after the delete operation with a timestamp before the operation will be deleted. */
export interface DeleteProjectsLogsRequest {
  /** Required. The resource name of the log to delete: projects/[PROJECT_ID]/logs/[LOG_ID] organizations/[ORGANIZATION_ID]/logs/[LOG_ID] billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID] folders/[FOLDER_ID]/logs/[LOG_ID][LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/123/logs/cloudaudit.googleapis.com%2Factivity".For more information about log names, see LogEntry. */
  logName: string;
}

export const DeleteProjectsLogsRequest = Schema.Struct({
  logName: Schema.String.pipe(T.HttpPath("logName")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/logs/{logsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLogsRequest>;

export type DeleteProjectsLogsResponse = Empty;
export const DeleteProjectsLogsResponse = Empty;

export type DeleteProjectsLogsError = CommonErrors;

export const deleteProjectsLogs: API.OperationMethod<DeleteProjectsLogsRequest, DeleteProjectsLogsResponse, DeleteProjectsLogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLogsRequest,
  output: DeleteProjectsLogsResponse,
  errors: [],
}));

/** Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed. */
export interface ListProjectsLogsRequest {
  /** Required. The resource name to list logs for: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID] */
  parent: string;
  /** Optional. List of resource names to list logs for: projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To support legacy queries, it could also be: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]The resource name in the parent field is added to this list. */
  resourceNames?: string[];
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ListProjectsLogsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  resourceNames: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("resourceNames")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/logs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLogsRequest>;

export type ListProjectsLogsResponse = ListLogsResponse;
export const ListProjectsLogsResponse = ListLogsResponse;

export type ListProjectsLogsError = CommonErrors;

export const listProjectsLogs = API.makePaginated(() => ({
  input: ListProjectsLogsRequest,
  output: ListProjectsLogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists logs-based metrics. */
export interface ListProjectsMetricsRequest {
  /** Required. The name of the project containing the metrics: "projects/[PROJECT_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListProjectsMetricsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/metrics" }),
  svc,
) as unknown as Schema.Schema<ListProjectsMetricsRequest>;

export type ListProjectsMetricsResponse = ListLogMetricsResponse;
export const ListProjectsMetricsResponse = ListLogMetricsResponse;

export type ListProjectsMetricsError = CommonErrors;

export const listProjectsMetrics = API.makePaginated(() => ({
  input: ListProjectsMetricsRequest,
  output: ListProjectsMetricsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a logs-based metric. */
export interface GetProjectsMetricsRequest {
  /** Required. The resource name of the desired metric: "projects/[PROJECT_ID]/metrics/[METRIC_ID]" */
  metricName: string;
}

export const GetProjectsMetricsRequest = Schema.Struct({
  metricName: Schema.String.pipe(T.HttpPath("metricName")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/metrics/{metricsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsMetricsRequest>;

export type GetProjectsMetricsResponse = LogMetric;
export const GetProjectsMetricsResponse = LogMetric;

export type GetProjectsMetricsError = CommonErrors;

export const getProjectsMetrics: API.OperationMethod<GetProjectsMetricsRequest, GetProjectsMetricsResponse, GetProjectsMetricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsMetricsRequest,
  output: GetProjectsMetricsResponse,
  errors: [],
}));

/** Creates a logs-based metric. */
export interface CreateProjectsMetricsRequest {
  /** Required. The resource name of the project in which to create the metric: "projects/[PROJECT_ID]" The new metric must be provided in the request. */
  parent: string;
  /** Request body */
  body?: LogMetric;
}

export const CreateProjectsMetricsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(LogMetric).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/metrics", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsMetricsRequest>;

export type CreateProjectsMetricsResponse = LogMetric;
export const CreateProjectsMetricsResponse = LogMetric;

export type CreateProjectsMetricsError = CommonErrors;

export const createProjectsMetrics: API.OperationMethod<CreateProjectsMetricsRequest, CreateProjectsMetricsResponse, CreateProjectsMetricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsMetricsRequest,
  output: CreateProjectsMetricsResponse,
  errors: [],
}));

/** Creates or updates a logs-based metric. */
export interface UpdateProjectsMetricsRequest {
  /** Required. The resource name of the metric to update: "projects/[PROJECT_ID]/metrics/[METRIC_ID]" The updated metric must be provided in the request and it's name field must be the same as [METRIC_ID] If the metric does not exist in [PROJECT_ID], then a new metric is created. */
  metricName: string;
  /** Request body */
  body?: LogMetric;
}

export const UpdateProjectsMetricsRequest = Schema.Struct({
  metricName: Schema.String.pipe(T.HttpPath("metricName")),
  body: Schema.optional(LogMetric).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v2/projects/{projectsId}/metrics/{metricsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsMetricsRequest>;

export type UpdateProjectsMetricsResponse = LogMetric;
export const UpdateProjectsMetricsResponse = LogMetric;

export type UpdateProjectsMetricsError = CommonErrors;

export const updateProjectsMetrics: API.OperationMethod<UpdateProjectsMetricsRequest, UpdateProjectsMetricsResponse, UpdateProjectsMetricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsMetricsRequest,
  output: UpdateProjectsMetricsResponse,
  errors: [],
}));

/** Deletes a logs-based metric. */
export interface DeleteProjectsMetricsRequest {
  /** Required. The resource name of the metric to delete: "projects/[PROJECT_ID]/metrics/[METRIC_ID]" */
  metricName: string;
}

export const DeleteProjectsMetricsRequest = Schema.Struct({
  metricName: Schema.String.pipe(T.HttpPath("metricName")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/metrics/{metricsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsMetricsRequest>;

export type DeleteProjectsMetricsResponse = Empty;
export const DeleteProjectsMetricsResponse = Empty;

export type DeleteProjectsMetricsError = CommonErrors;

export const deleteProjectsMetrics: API.OperationMethod<DeleteProjectsMetricsRequest, DeleteProjectsMetricsResponse, DeleteProjectsMetricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsMetricsRequest,
  output: DeleteProjectsMetricsResponse,
  errors: [],
}));

/** Gets the Logging CMEK settings for the given resource.Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information. */
export interface GetCmekSettingsOrganizationsRequest {
  /** Required. The resource for which to retrieve CMEK settings. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization. */
  name: string;
}

export const GetCmekSettingsOrganizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/cmekSettings" }),
  svc,
) as unknown as Schema.Schema<GetCmekSettingsOrganizationsRequest>;

export type GetCmekSettingsOrganizationsResponse = CmekSettings;
export const GetCmekSettingsOrganizationsResponse = CmekSettings;

export type GetCmekSettingsOrganizationsError = CommonErrors;

export const getCmekSettingsOrganizations: API.OperationMethod<GetCmekSettingsOrganizationsRequest, GetCmekSettingsOrganizationsResponse, GetCmekSettingsOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCmekSettingsOrganizationsRequest,
  output: GetCmekSettingsOrganizationsResponse,
  errors: [],
}));

/** Updates the Log Router CMEK settings for the given resource.Note: CMEK for the Log Router can currently only be configured for Google Cloud organizations. Once configured, it applies to all projects and folders in the Google Cloud organization.UpdateCmekSettings fails when any of the following are true: The value of kms_key_name is invalid. The associated service account doesn't have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key. Access to the key is disabled.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information. */
export interface UpdateCmekSettingsOrganizationsRequest {
  /** Required. The resource name for the CMEK settings to update. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can currently only be configured for Google Cloud organizations. Once configured, it applies to all projects and folders in the Google Cloud organization. */
  name: string;
  /** Optional. Field mask identifying which fields from cmek_settings should be updated. A field will be overwritten if and only if it is in the update mask. Output only fields cannot be updated.See FieldMask for more information.For example: "updateMask=kmsKeyName" */
  updateMask?: string;
  /** Request body */
  body?: CmekSettings;
}

export const UpdateCmekSettingsOrganizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(CmekSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/cmekSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCmekSettingsOrganizationsRequest>;

export type UpdateCmekSettingsOrganizationsResponse = CmekSettings;
export const UpdateCmekSettingsOrganizationsResponse = CmekSettings;

export type UpdateCmekSettingsOrganizationsError = CommonErrors;

export const updateCmekSettingsOrganizations: API.OperationMethod<UpdateCmekSettingsOrganizationsRequest, UpdateCmekSettingsOrganizationsResponse, UpdateCmekSettingsOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCmekSettingsOrganizationsRequest,
  output: UpdateCmekSettingsOrganizationsResponse,
  errors: [],
}));

/** Gets the settings for the given resource.Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts.See View default resource settings for Logging (https://docs.cloud.google.com/logging/docs/default-settings#view-org-settings) for more information. */
export interface GetSettingsOrganizationsRequest {
  /** Required. The resource for which to retrieve settings. "projects/[PROJECT_ID]/settings" "organizations/[ORGANIZATION_ID]/settings" "billingAccounts/[BILLING_ACCOUNT_ID]/settings" "folders/[FOLDER_ID]/settings" For example:"organizations/12345/settings"Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts. */
  name: string;
}

export const GetSettingsOrganizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/settings" }),
  svc,
) as unknown as Schema.Schema<GetSettingsOrganizationsRequest>;

export type GetSettingsOrganizationsResponse = Settings;
export const GetSettingsOrganizationsResponse = Settings;

export type GetSettingsOrganizationsError = CommonErrors;

export const getSettingsOrganizations: API.OperationMethod<GetSettingsOrganizationsRequest, GetSettingsOrganizationsResponse, GetSettingsOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSettingsOrganizationsRequest,
  output: GetSettingsOrganizationsResponse,
  errors: [],
}));

/** Updates the settings for the given resource. This method applies to all feature configurations for organization and folders.UpdateSettings fails when any of the following are true: The value of storage_location either isn't supported by Logging or violates the location OrgPolicy. The default_sink_config field is set, but it has an unspecified filter write mode. The value of kms_key_name is invalid. The associated service account doesn't have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key. Access to the key is disabled.See Configure default settings for organizations and folders (https://docs.cloud.google.com/logging/docs/default-settings) for more information. */
export interface UpdateSettingsOrganizationsRequest {
  /** Required. The resource name for the settings to update. "organizations/[ORGANIZATION_ID]/settings" "folders/[FOLDER_ID]/settings" For example:"organizations/12345/settings" */
  name: string;
  /** Optional. Field mask identifying which fields from settings should be updated. A field will be overwritten if and only if it is in the update mask. Output only fields cannot be updated.See FieldMask for more information.For example: "updateMask=kmsKeyName" */
  updateMask?: string;
  /** Request body */
  body?: Settings;
}

export const UpdateSettingsOrganizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Settings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/settings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSettingsOrganizationsRequest>;

export type UpdateSettingsOrganizationsResponse = Settings;
export const UpdateSettingsOrganizationsResponse = Settings;

export type UpdateSettingsOrganizationsError = CommonErrors;

export const updateSettingsOrganizations: API.OperationMethod<UpdateSettingsOrganizationsRequest, UpdateSettingsOrganizationsResponse, UpdateSettingsOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSettingsOrganizationsRequest,
  output: UpdateSettingsOrganizationsResponse,
  errors: [],
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: List all public locations: Use the path GET /v1/locations. List project-visible locations: Use the path GET /v1/projects/{project_id}/locations. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListOrganizationsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like "displayName=tokyo", and is documented in more detail in AIP-160 (https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the next_page_token field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListOrganizationsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsRequest>;

export type ListOrganizationsLocationsResponse = ListLocationsResponse;
export const ListOrganizationsLocationsResponse = ListLocationsResponse;

export type ListOrganizationsLocationsError = CommonErrors;

export const listOrganizationsLocations = API.makePaginated(() => ({
  input: ListOrganizationsLocationsRequest,
  output: ListOrganizationsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetOrganizationsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetOrganizationsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsRequest>;

export type GetOrganizationsLocationsResponse = Location;
export const GetOrganizationsLocationsResponse = Location;

export type GetOrganizationsLocationsError = CommonErrors;

export const getOrganizationsLocations: API.OperationMethod<GetOrganizationsLocationsRequest, GetOrganizationsLocationsResponse, GetOrganizationsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsRequest,
  output: GetOrganizationsLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED. */
export interface ListOrganizationsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsOperationsRequest>;

export type ListOrganizationsLocationsOperationsResponse = ListOperationsResponse;
export const ListOrganizationsLocationsOperationsResponse = ListOperationsResponse;

export type ListOrganizationsLocationsOperationsError = CommonErrors;

export const listOrganizationsLocationsOperations = API.makePaginated(() => ({
  input: ListOrganizationsLocationsOperationsRequest,
  output: ListOrganizationsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsOperationsRequest>;

export type GetOrganizationsLocationsOperationsResponse = Operation;
export const GetOrganizationsLocationsOperationsResponse = Operation;

export type GetOrganizationsLocationsOperationsError = CommonErrors;

export const getOrganizationsLocationsOperations: API.OperationMethod<GetOrganizationsLocationsOperationsRequest, GetOrganizationsLocationsOperationsResponse, GetOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsOperationsRequest,
  output: GetOrganizationsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED. */
export interface CancelOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOrganizationsLocationsOperationsRequest>;

export type CancelOrganizationsLocationsOperationsResponse = Empty;
export const CancelOrganizationsLocationsOperationsResponse = Empty;

export type CancelOrganizationsLocationsOperationsError = CommonErrors;

export const cancelOrganizationsLocationsOperations: API.OperationMethod<CancelOrganizationsLocationsOperationsRequest, CancelOrganizationsLocationsOperationsResponse, CancelOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOrganizationsLocationsOperationsRequest,
  output: CancelOrganizationsLocationsOperationsResponse,
  errors: [],
}));

/** Lists log buckets. */
export interface ListOrganizationsLocationsBucketsRequest {
  /** Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets. */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListOrganizationsLocationsBucketsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsBucketsRequest>;

export type ListOrganizationsLocationsBucketsResponse = ListBucketsResponse;
export const ListOrganizationsLocationsBucketsResponse = ListBucketsResponse;

export type ListOrganizationsLocationsBucketsError = CommonErrors;

export const listOrganizationsLocationsBuckets = API.makePaginated(() => ({
  input: ListOrganizationsLocationsBucketsRequest,
  output: ListOrganizationsLocationsBucketsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a log bucket. */
export interface GetOrganizationsLocationsBucketsRequest {
  /** Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
}

export const GetOrganizationsLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsBucketsRequest>;

export type GetOrganizationsLocationsBucketsResponse = LogBucket;
export const GetOrganizationsLocationsBucketsResponse = LogBucket;

export type GetOrganizationsLocationsBucketsError = CommonErrors;

export const getOrganizationsLocationsBuckets: API.OperationMethod<GetOrganizationsLocationsBucketsRequest, GetOrganizationsLocationsBucketsResponse, GetOrganizationsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsBucketsRequest,
  output: GetOrganizationsLocationsBucketsResponse,
  errors: [],
}));

/** Creates a log bucket asynchronously that can be used to store log entries.After a bucket has been created, the bucket's location cannot be changed. */
export interface CreateAsyncOrganizationsLocationsBucketsRequest {
  /** Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global" */
  parent: string;
  /** Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. */
  bucketId?: string;
  /** Request body */
  body?: LogBucket;
}

export const CreateAsyncOrganizationsLocationsBucketsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  bucketId: Schema.optional(Schema.String).pipe(T.HttpQuery("bucketId")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets:createAsync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAsyncOrganizationsLocationsBucketsRequest>;

export type CreateAsyncOrganizationsLocationsBucketsResponse = Operation;
export const CreateAsyncOrganizationsLocationsBucketsResponse = Operation;

export type CreateAsyncOrganizationsLocationsBucketsError = CommonErrors;

export const createAsyncOrganizationsLocationsBuckets: API.OperationMethod<CreateAsyncOrganizationsLocationsBucketsRequest, CreateAsyncOrganizationsLocationsBucketsResponse, CreateAsyncOrganizationsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAsyncOrganizationsLocationsBucketsRequest,
  output: CreateAsyncOrganizationsLocationsBucketsResponse,
  errors: [],
}));

/** Updates a log bucket asynchronously.If the bucket has a lifecycle_state of DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket has been created, the bucket's location cannot be changed. */
export interface UpdateAsyncOrganizationsLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
  /** Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days */
  updateMask?: string;
  /** Request body */
  body?: LogBucket;
}

export const UpdateAsyncOrganizationsLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}:updateAsync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAsyncOrganizationsLocationsBucketsRequest>;

export type UpdateAsyncOrganizationsLocationsBucketsResponse = Operation;
export const UpdateAsyncOrganizationsLocationsBucketsResponse = Operation;

export type UpdateAsyncOrganizationsLocationsBucketsError = CommonErrors;

export const updateAsyncOrganizationsLocationsBuckets: API.OperationMethod<UpdateAsyncOrganizationsLocationsBucketsRequest, UpdateAsyncOrganizationsLocationsBucketsResponse, UpdateAsyncOrganizationsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAsyncOrganizationsLocationsBucketsRequest,
  output: UpdateAsyncOrganizationsLocationsBucketsResponse,
  errors: [],
}));

/** Creates a log bucket that can be used to store log entries. After a bucket has been created, the bucket's location cannot be changed. */
export interface CreateOrganizationsLocationsBucketsRequest {
  /** Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global" */
  parent: string;
  /** Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. */
  bucketId?: string;
  /** Request body */
  body?: LogBucket;
}

export const CreateOrganizationsLocationsBucketsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  bucketId: Schema.optional(Schema.String).pipe(T.HttpQuery("bucketId")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsBucketsRequest>;

export type CreateOrganizationsLocationsBucketsResponse = LogBucket;
export const CreateOrganizationsLocationsBucketsResponse = LogBucket;

export type CreateOrganizationsLocationsBucketsError = CommonErrors;

export const createOrganizationsLocationsBuckets: API.OperationMethod<CreateOrganizationsLocationsBucketsRequest, CreateOrganizationsLocationsBucketsResponse, CreateOrganizationsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsBucketsRequest,
  output: CreateOrganizationsLocationsBucketsResponse,
  errors: [],
}));

/** Updates a log bucket.If the bucket has a lifecycle_state of DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket has been created, the bucket's location cannot be changed. */
export interface PatchOrganizationsLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
  /** Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days */
  updateMask?: string;
  /** Request body */
  body?: LogBucket;
}

export const PatchOrganizationsLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsBucketsRequest>;

export type PatchOrganizationsLocationsBucketsResponse = LogBucket;
export const PatchOrganizationsLocationsBucketsResponse = LogBucket;

export type PatchOrganizationsLocationsBucketsError = CommonErrors;

export const patchOrganizationsLocationsBuckets: API.OperationMethod<PatchOrganizationsLocationsBucketsRequest, PatchOrganizationsLocationsBucketsResponse, PatchOrganizationsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsBucketsRequest,
  output: PatchOrganizationsLocationsBucketsResponse,
  errors: [],
}));

/** Deletes a log bucket.Changes the bucket's lifecycle_state to the DELETE_REQUESTED state. After 7 days, the bucket will be purged and all log entries in the bucket will be permanently deleted. */
export interface DeleteOrganizationsLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
}

export const DeleteOrganizationsLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsBucketsRequest>;

export type DeleteOrganizationsLocationsBucketsResponse = Empty;
export const DeleteOrganizationsLocationsBucketsResponse = Empty;

export type DeleteOrganizationsLocationsBucketsError = CommonErrors;

export const deleteOrganizationsLocationsBuckets: API.OperationMethod<DeleteOrganizationsLocationsBucketsRequest, DeleteOrganizationsLocationsBucketsResponse, DeleteOrganizationsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsBucketsRequest,
  output: DeleteOrganizationsLocationsBucketsResponse,
  errors: [],
}));

/** Undeletes a log bucket. A bucket that has been deleted can be undeleted within the grace period of 7 days. */
export interface UndeleteOrganizationsLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to undelete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
  /** Request body */
  body?: UndeleteBucketRequest;
}

export const UndeleteOrganizationsLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteBucketRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteOrganizationsLocationsBucketsRequest>;

export type UndeleteOrganizationsLocationsBucketsResponse = Empty;
export const UndeleteOrganizationsLocationsBucketsResponse = Empty;

export type UndeleteOrganizationsLocationsBucketsError = CommonErrors;

export const undeleteOrganizationsLocationsBuckets: API.OperationMethod<UndeleteOrganizationsLocationsBucketsRequest, UndeleteOrganizationsLocationsBucketsResponse, UndeleteOrganizationsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteOrganizationsLocationsBucketsRequest,
  output: UndeleteOrganizationsLocationsBucketsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyOrganizationsLocationsBucketsViewsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyOrganizationsLocationsBucketsViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyOrganizationsLocationsBucketsViewsRequest>;

export type SetIamPolicyOrganizationsLocationsBucketsViewsResponse = Policy;
export const SetIamPolicyOrganizationsLocationsBucketsViewsResponse = Policy;

export type SetIamPolicyOrganizationsLocationsBucketsViewsError = CommonErrors;

export const setIamPolicyOrganizationsLocationsBucketsViews: API.OperationMethod<SetIamPolicyOrganizationsLocationsBucketsViewsRequest, SetIamPolicyOrganizationsLocationsBucketsViewsResponse, SetIamPolicyOrganizationsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyOrganizationsLocationsBucketsViewsRequest,
  output: SetIamPolicyOrganizationsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyOrganizationsLocationsBucketsViewsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyOrganizationsLocationsBucketsViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyOrganizationsLocationsBucketsViewsRequest>;

export type GetIamPolicyOrganizationsLocationsBucketsViewsResponse = Policy;
export const GetIamPolicyOrganizationsLocationsBucketsViewsResponse = Policy;

export type GetIamPolicyOrganizationsLocationsBucketsViewsError = CommonErrors;

export const getIamPolicyOrganizationsLocationsBucketsViews: API.OperationMethod<GetIamPolicyOrganizationsLocationsBucketsViewsRequest, GetIamPolicyOrganizationsLocationsBucketsViewsResponse, GetIamPolicyOrganizationsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyOrganizationsLocationsBucketsViewsRequest,
  output: GetIamPolicyOrganizationsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsOrganizationsLocationsBucketsViewsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsOrganizationsLocationsBucketsViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsOrganizationsLocationsBucketsViewsRequest>;

export type TestIamPermissionsOrganizationsLocationsBucketsViewsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsOrganizationsLocationsBucketsViewsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsOrganizationsLocationsBucketsViewsError = CommonErrors;

export const testIamPermissionsOrganizationsLocationsBucketsViews: API.OperationMethod<TestIamPermissionsOrganizationsLocationsBucketsViewsRequest, TestIamPermissionsOrganizationsLocationsBucketsViewsResponse, TestIamPermissionsOrganizationsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsOrganizationsLocationsBucketsViewsRequest,
  output: TestIamPermissionsOrganizationsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Lists views on a log bucket. */
export interface ListOrganizationsLocationsBucketsViewsRequest {
  /** Required. The bucket whose views are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListOrganizationsLocationsBucketsViewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}/views" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsBucketsViewsRequest>;

export type ListOrganizationsLocationsBucketsViewsResponse = ListViewsResponse;
export const ListOrganizationsLocationsBucketsViewsResponse = ListViewsResponse;

export type ListOrganizationsLocationsBucketsViewsError = CommonErrors;

export const listOrganizationsLocationsBucketsViews = API.makePaginated(() => ({
  input: ListOrganizationsLocationsBucketsViewsRequest,
  output: ListOrganizationsLocationsBucketsViewsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a view on a log bucket. */
export interface GetOrganizationsLocationsBucketsViewsRequest {
  /** Required. The resource name of the policy: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" */
  name: string;
}

export const GetOrganizationsLocationsBucketsViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsBucketsViewsRequest>;

export type GetOrganizationsLocationsBucketsViewsResponse = LogView;
export const GetOrganizationsLocationsBucketsViewsResponse = LogView;

export type GetOrganizationsLocationsBucketsViewsError = CommonErrors;

export const getOrganizationsLocationsBucketsViews: API.OperationMethod<GetOrganizationsLocationsBucketsViewsRequest, GetOrganizationsLocationsBucketsViewsResponse, GetOrganizationsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsBucketsViewsRequest,
  output: GetOrganizationsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Creates a view over log entries in a log bucket. A bucket may contain a maximum of 30 views. */
export interface CreateOrganizationsLocationsBucketsViewsRequest {
  /** Required. The bucket in which to create the view `"projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"` For example:"projects/my-project/locations/global/buckets/my-bucket" */
  parent: string;
  /** Required. A client-assigned identifier such as "my-view". Identifiers are limited to 100 characters and can include only letters, digits, underscores, and hyphens. */
  viewId?: string;
  /** Request body */
  body?: LogView;
}

export const CreateOrganizationsLocationsBucketsViewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  viewId: Schema.optional(Schema.String).pipe(T.HttpQuery("viewId")),
  body: Schema.optional(LogView).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}/views", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsBucketsViewsRequest>;

export type CreateOrganizationsLocationsBucketsViewsResponse = LogView;
export const CreateOrganizationsLocationsBucketsViewsResponse = LogView;

export type CreateOrganizationsLocationsBucketsViewsError = CommonErrors;

export const createOrganizationsLocationsBucketsViews: API.OperationMethod<CreateOrganizationsLocationsBucketsViewsRequest, CreateOrganizationsLocationsBucketsViewsResponse, CreateOrganizationsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsBucketsViewsRequest,
  output: CreateOrganizationsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Updates a view on a log bucket. This method replaces the value of the filter field from the existing view with the corresponding value from the new view. If an UNAVAILABLE error is returned, this indicates that system is not in a state where it can update the view. If this occurs, please try again in a few minutes. */
export interface PatchOrganizationsLocationsBucketsViewsRequest {
  /** Required. The full resource name of the view to update "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" */
  name: string;
  /** Optional. Field mask that specifies the fields in view that need an update. A field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter */
  updateMask?: string;
  /** Request body */
  body?: LogView;
}

export const PatchOrganizationsLocationsBucketsViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogView).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsBucketsViewsRequest>;

export type PatchOrganizationsLocationsBucketsViewsResponse = LogView;
export const PatchOrganizationsLocationsBucketsViewsResponse = LogView;

export type PatchOrganizationsLocationsBucketsViewsError = CommonErrors;

export const patchOrganizationsLocationsBucketsViews: API.OperationMethod<PatchOrganizationsLocationsBucketsViewsRequest, PatchOrganizationsLocationsBucketsViewsResponse, PatchOrganizationsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsBucketsViewsRequest,
  output: PatchOrganizationsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Deletes a view on a log bucket. If an UNAVAILABLE error is returned, this indicates that system is not in a state where it can delete the view. If this occurs, please try again in a few minutes. */
export interface DeleteOrganizationsLocationsBucketsViewsRequest {
  /** Required. The full resource name of the view to delete: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" */
  name: string;
}

export const DeleteOrganizationsLocationsBucketsViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsBucketsViewsRequest>;

export type DeleteOrganizationsLocationsBucketsViewsResponse = Empty;
export const DeleteOrganizationsLocationsBucketsViewsResponse = Empty;

export type DeleteOrganizationsLocationsBucketsViewsError = CommonErrors;

export const deleteOrganizationsLocationsBucketsViews: API.OperationMethod<DeleteOrganizationsLocationsBucketsViewsRequest, DeleteOrganizationsLocationsBucketsViewsResponse, DeleteOrganizationsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsBucketsViewsRequest,
  output: DeleteOrganizationsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed. */
export interface ListOrganizationsLocationsBucketsViewsLogsRequest {
  /** Required. The resource name to list logs for: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID] */
  parent: string;
  /** Optional. List of resource names to list logs for: projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To support legacy queries, it could also be: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]The resource name in the parent field is added to this list. */
  resourceNames?: string[];
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ListOrganizationsLocationsBucketsViewsLogsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  resourceNames: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("resourceNames")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}/logs" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsBucketsViewsLogsRequest>;

export type ListOrganizationsLocationsBucketsViewsLogsResponse = ListLogsResponse;
export const ListOrganizationsLocationsBucketsViewsLogsResponse = ListLogsResponse;

export type ListOrganizationsLocationsBucketsViewsLogsError = CommonErrors;

export const listOrganizationsLocationsBucketsViewsLogs = API.makePaginated(() => ({
  input: ListOrganizationsLocationsBucketsViewsLogsRequest,
  output: ListOrganizationsLocationsBucketsViewsLogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists links. */
export interface ListOrganizationsLocationsBucketsLinksRequest {
  /** Required. The parent resource whose links are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. */
  pageSize?: number;
}

export const ListOrganizationsLocationsBucketsLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}/links" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsBucketsLinksRequest>;

export type ListOrganizationsLocationsBucketsLinksResponse = ListLinksResponse;
export const ListOrganizationsLocationsBucketsLinksResponse = ListLinksResponse;

export type ListOrganizationsLocationsBucketsLinksError = CommonErrors;

export const listOrganizationsLocationsBucketsLinks = API.makePaginated(() => ({
  input: ListOrganizationsLocationsBucketsLinksRequest,
  output: ListOrganizationsLocationsBucketsLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a link. */
export interface GetOrganizationsLocationsBucketsLinksRequest {
  /** Required. The resource name of the link: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" */
  name: string;
}

export const GetOrganizationsLocationsBucketsLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}/links/{linksId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsBucketsLinksRequest>;

export type GetOrganizationsLocationsBucketsLinksResponse = Link;
export const GetOrganizationsLocationsBucketsLinksResponse = Link;

export type GetOrganizationsLocationsBucketsLinksError = CommonErrors;

export const getOrganizationsLocationsBucketsLinks: API.OperationMethod<GetOrganizationsLocationsBucketsLinksRequest, GetOrganizationsLocationsBucketsLinksResponse, GetOrganizationsLocationsBucketsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsBucketsLinksRequest,
  output: GetOrganizationsLocationsBucketsLinksResponse,
  errors: [],
}));

/** Asynchronously creates a linked dataset in BigQuery which makes it possible to use BigQuery to read the logs stored in the log bucket. A log bucket may currently only contain one link. */
export interface CreateOrganizationsLocationsBucketsLinksRequest {
  /** Required. The full resource name of the bucket to create a link for. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" */
  parent: string;
  /** Required. The ID to use for the link. The link_id can have up to 100 characters. A valid link_id must only have alphanumeric characters and underscores within it. */
  linkId?: string;
  /** Request body */
  body?: Link;
}

export const CreateOrganizationsLocationsBucketsLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  linkId: Schema.optional(Schema.String).pipe(T.HttpQuery("linkId")),
  body: Schema.optional(Link).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}/links", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsBucketsLinksRequest>;

export type CreateOrganizationsLocationsBucketsLinksResponse = Operation;
export const CreateOrganizationsLocationsBucketsLinksResponse = Operation;

export type CreateOrganizationsLocationsBucketsLinksError = CommonErrors;

export const createOrganizationsLocationsBucketsLinks: API.OperationMethod<CreateOrganizationsLocationsBucketsLinksRequest, CreateOrganizationsLocationsBucketsLinksResponse, CreateOrganizationsLocationsBucketsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsBucketsLinksRequest,
  output: CreateOrganizationsLocationsBucketsLinksResponse,
  errors: [],
}));

/** Deletes a link. This will also delete the corresponding BigQuery linked dataset. */
export interface DeleteOrganizationsLocationsBucketsLinksRequest {
  /** Required. The full resource name of the link to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" */
  name: string;
}

export const DeleteOrganizationsLocationsBucketsLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/locations/{locationsId}/buckets/{bucketsId}/links/{linksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsBucketsLinksRequest>;

export type DeleteOrganizationsLocationsBucketsLinksResponse = Operation;
export const DeleteOrganizationsLocationsBucketsLinksResponse = Operation;

export type DeleteOrganizationsLocationsBucketsLinksError = CommonErrors;

export const deleteOrganizationsLocationsBucketsLinks: API.OperationMethod<DeleteOrganizationsLocationsBucketsLinksRequest, DeleteOrganizationsLocationsBucketsLinksResponse, DeleteOrganizationsLocationsBucketsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsBucketsLinksRequest,
  output: DeleteOrganizationsLocationsBucketsLinksResponse,
  errors: [],
}));

/** Lists log scopes. */
export interface ListOrganizationsLocationsLogScopesRequest {
  /** Required. The parent resource whose log scopes are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListOrganizationsLocationsLogScopesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/logScopes" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsLogScopesRequest>;

export type ListOrganizationsLocationsLogScopesResponse = ListLogScopesResponse;
export const ListOrganizationsLocationsLogScopesResponse = ListLogScopesResponse;

export type ListOrganizationsLocationsLogScopesError = CommonErrors;

export const listOrganizationsLocationsLogScopes = API.makePaginated(() => ({
  input: ListOrganizationsLocationsLogScopesRequest,
  output: ListOrganizationsLocationsLogScopesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a log scope. */
export interface GetOrganizationsLocationsLogScopesRequest {
  /** Required. The resource name of the log scope: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global/logScopes/my-log-scope" */
  name: string;
}

export const GetOrganizationsLocationsLogScopesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/logScopes/{logScopesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsLogScopesRequest>;

export type GetOrganizationsLocationsLogScopesResponse = LogScope;
export const GetOrganizationsLocationsLogScopesResponse = LogScope;

export type GetOrganizationsLocationsLogScopesError = CommonErrors;

export const getOrganizationsLocationsLogScopes: API.OperationMethod<GetOrganizationsLocationsLogScopesRequest, GetOrganizationsLocationsLogScopesResponse, GetOrganizationsLocationsLogScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsLogScopesRequest,
  output: GetOrganizationsLocationsLogScopesResponse,
  errors: [],
}));

/** Creates a log scope. */
export interface CreateOrganizationsLocationsLogScopesRequest {
  /** Required. The parent resource in which to create the log scope: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global" */
  parent: string;
  /** Required. A client-assigned identifier such as "log-scope". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. First character has to be alphanumeric. */
  logScopeId?: string;
  /** Request body */
  body?: LogScope;
}

export const CreateOrganizationsLocationsLogScopesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  logScopeId: Schema.optional(Schema.String).pipe(T.HttpQuery("logScopeId")),
  body: Schema.optional(LogScope).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/logScopes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsLogScopesRequest>;

export type CreateOrganizationsLocationsLogScopesResponse = LogScope;
export const CreateOrganizationsLocationsLogScopesResponse = LogScope;

export type CreateOrganizationsLocationsLogScopesError = CommonErrors;

export const createOrganizationsLocationsLogScopes: API.OperationMethod<CreateOrganizationsLocationsLogScopesRequest, CreateOrganizationsLocationsLogScopesResponse, CreateOrganizationsLocationsLogScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsLogScopesRequest,
  output: CreateOrganizationsLocationsLogScopesResponse,
  errors: [],
}));

/** Updates a log scope. */
export interface PatchOrganizationsLocationsLogScopesRequest {
  /** Output only. The resource name of the log scope.Log scopes are only available in the global location. For example:projects/my-project/locations/global/logScopes/my-log-scope */
  name: string;
  /** Optional. Field mask that specifies the fields in log_scope that need an update. A field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=description */
  updateMask?: string;
  /** Request body */
  body?: LogScope;
}

export const PatchOrganizationsLocationsLogScopesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogScope).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/locations/{locationsId}/logScopes/{logScopesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsLogScopesRequest>;

export type PatchOrganizationsLocationsLogScopesResponse = LogScope;
export const PatchOrganizationsLocationsLogScopesResponse = LogScope;

export type PatchOrganizationsLocationsLogScopesError = CommonErrors;

export const patchOrganizationsLocationsLogScopes: API.OperationMethod<PatchOrganizationsLocationsLogScopesRequest, PatchOrganizationsLocationsLogScopesResponse, PatchOrganizationsLocationsLogScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsLogScopesRequest,
  output: PatchOrganizationsLocationsLogScopesResponse,
  errors: [],
}));

/** Deletes a log scope. */
export interface DeleteOrganizationsLocationsLogScopesRequest {
  /** Required. The resource name of the log scope to delete: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global/logScopes/my-log-scope" */
  name: string;
}

export const DeleteOrganizationsLocationsLogScopesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/locations/{locationsId}/logScopes/{logScopesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsLogScopesRequest>;

export type DeleteOrganizationsLocationsLogScopesResponse = Empty;
export const DeleteOrganizationsLocationsLogScopesResponse = Empty;

export type DeleteOrganizationsLocationsLogScopesError = CommonErrors;

export const deleteOrganizationsLocationsLogScopes: API.OperationMethod<DeleteOrganizationsLocationsLogScopesRequest, DeleteOrganizationsLocationsLogScopesResponse, DeleteOrganizationsLocationsLogScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsLogScopesRequest,
  output: DeleteOrganizationsLocationsLogScopesResponse,
  errors: [],
}));

/** Lists the SavedQueries that were created by the user making the request. */
export interface ListOrganizationsLocationsSavedQueriesRequest {
  /** Required. The resource to which the listed queries belong. "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example: "projects/my-project/locations/us-central1" Note: The locations portion of the resource must be specified. To get a list of all saved queries, a wildcard character - can be used for LOCATION_ID, for example: "projects/my-project/locations/-" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. Specifies the type ("Logging" or "OpsAnalytics") and the visibility (PRIVATE or SHARED) of the saved queries to list. If provided, the filter must contain either the type function or a visibility token, or both. If both are chosen, they can be placed in any order, but they must be joined by the AND operator or the empty character.The two supported type function calls are: type("Logging") type("OpsAnalytics")The two supported visibility tokens are: visibility = PRIVATE visibility = SHAREDFor example:type("Logging") AND visibility = PRIVATE visibility=SHARED type("OpsAnalytics") type("OpsAnalytics)" visibility = PRIVATE visibility = SHARED */
  filter?: string;
}

export const ListOrganizationsLocationsSavedQueriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/savedQueries" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsSavedQueriesRequest>;

export type ListOrganizationsLocationsSavedQueriesResponse = ListSavedQueriesResponse;
export const ListOrganizationsLocationsSavedQueriesResponse = ListSavedQueriesResponse;

export type ListOrganizationsLocationsSavedQueriesError = CommonErrors;

export const listOrganizationsLocationsSavedQueries = API.makePaginated(() => ({
  input: ListOrganizationsLocationsSavedQueriesRequest,
  output: ListOrganizationsLocationsSavedQueriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns all data associated with the requested query. */
export interface GetOrganizationsLocationsSavedQueriesRequest {
  /** Required. The resource name of the saved query. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" For example: "projects/my-project/locations/global/savedQueries/my-saved-query" */
  name: string;
}

export const GetOrganizationsLocationsSavedQueriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/savedQueries/{savedQueriesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsSavedQueriesRequest>;

export type GetOrganizationsLocationsSavedQueriesResponse = SavedQuery;
export const GetOrganizationsLocationsSavedQueriesResponse = SavedQuery;

export type GetOrganizationsLocationsSavedQueriesError = CommonErrors;

export const getOrganizationsLocationsSavedQueries: API.OperationMethod<GetOrganizationsLocationsSavedQueriesRequest, GetOrganizationsLocationsSavedQueriesResponse, GetOrganizationsLocationsSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsSavedQueriesRequest,
  output: GetOrganizationsLocationsSavedQueriesResponse,
  errors: [],
}));

/** Creates a new SavedQuery for the user making the request. */
export interface CreateOrganizationsLocationsSavedQueriesRequest {
  /** Required. The parent resource in which to create the saved query: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example: "projects/my-project/locations/global" "organizations/123456789/locations/us-central1" */
  parent: string;
  /** Optional. The ID to use for the saved query, which will become the final component of the saved query's resource name.If the saved_query_id is not provided, the system will generate an alphanumeric ID.The saved_query_id is limited to 100 characters and can include only the following characters: upper and lower-case alphanumeric characters, underscores, hyphens, periods.First character has to be alphanumeric. */
  savedQueryId?: string;
  /** Request body */
  body?: SavedQuery;
}

export const CreateOrganizationsLocationsSavedQueriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  savedQueryId: Schema.optional(Schema.String).pipe(T.HttpQuery("savedQueryId")),
  body: Schema.optional(SavedQuery).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/savedQueries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsSavedQueriesRequest>;

export type CreateOrganizationsLocationsSavedQueriesResponse = SavedQuery;
export const CreateOrganizationsLocationsSavedQueriesResponse = SavedQuery;

export type CreateOrganizationsLocationsSavedQueriesError = CommonErrors;

export const createOrganizationsLocationsSavedQueries: API.OperationMethod<CreateOrganizationsLocationsSavedQueriesRequest, CreateOrganizationsLocationsSavedQueriesResponse, CreateOrganizationsLocationsSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsSavedQueriesRequest,
  output: CreateOrganizationsLocationsSavedQueriesResponse,
  errors: [],
}));

/** Updates an existing SavedQuery. */
export interface PatchOrganizationsLocationsSavedQueriesRequest {
  /** Output only. Resource name of the saved query.In the format: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" For a list of supported locations, see Supported Regions (https://docs.cloud.google.com/logging/docs/region-support#bucket-regions)After the saved query is created, the location cannot be changed.If the user doesn't provide a QUERY_ID, the system will generate an alphanumeric ID. */
  name: string;
  /** Required. A non-empty list of fields to change in the existing saved query. Fields are relative to the saved_query and new values for the fields are taken from the corresponding fields in the SavedQuery included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.To update all mutable fields, specify an update_mask of *.For example, to change the description and query filter text of a saved query, specify an update_mask of "description, query.filter". */
  updateMask?: string;
  /** Request body */
  body?: SavedQuery;
}

export const PatchOrganizationsLocationsSavedQueriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SavedQuery).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/locations/{locationsId}/savedQueries/{savedQueriesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsSavedQueriesRequest>;

export type PatchOrganizationsLocationsSavedQueriesResponse = SavedQuery;
export const PatchOrganizationsLocationsSavedQueriesResponse = SavedQuery;

export type PatchOrganizationsLocationsSavedQueriesError = CommonErrors;

export const patchOrganizationsLocationsSavedQueries: API.OperationMethod<PatchOrganizationsLocationsSavedQueriesRequest, PatchOrganizationsLocationsSavedQueriesResponse, PatchOrganizationsLocationsSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsSavedQueriesRequest,
  output: PatchOrganizationsLocationsSavedQueriesResponse,
  errors: [],
}));

/** Deletes an existing SavedQuery that was created by the user making the request. */
export interface DeleteOrganizationsLocationsSavedQueriesRequest {
  /** Required. The full resource name of the saved query to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" For example: "projects/my-project/locations/global/savedQueries/my-saved-query" */
  name: string;
}

export const DeleteOrganizationsLocationsSavedQueriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/locations/{locationsId}/savedQueries/{savedQueriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsSavedQueriesRequest>;

export type DeleteOrganizationsLocationsSavedQueriesResponse = Empty;
export const DeleteOrganizationsLocationsSavedQueriesResponse = Empty;

export type DeleteOrganizationsLocationsSavedQueriesError = CommonErrors;

export const deleteOrganizationsLocationsSavedQueries: API.OperationMethod<DeleteOrganizationsLocationsSavedQueriesRequest, DeleteOrganizationsLocationsSavedQueriesResponse, DeleteOrganizationsLocationsSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsSavedQueriesRequest,
  output: DeleteOrganizationsLocationsSavedQueriesResponse,
  errors: [],
}));

/** Lists the RecentQueries that were created by the user making the request. */
export interface ListOrganizationsLocationsRecentQueriesRequest {
  /** Required. The resource to which the listed queries belong. "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example:projects/my-project/locations/us-central1Note: The location portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all recent queries. */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. Specifies the type ("Logging" or "OpsAnalytics") of the recent queries to list. The only valid value for this field is one of the two allowable type function calls, which are the following: type("Logging") type("OpsAnalytics") */
  filter?: string;
}

export const ListOrganizationsLocationsRecentQueriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/recentQueries" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsRecentQueriesRequest>;

export type ListOrganizationsLocationsRecentQueriesResponse = ListRecentQueriesResponse;
export const ListOrganizationsLocationsRecentQueriesResponse = ListRecentQueriesResponse;

export type ListOrganizationsLocationsRecentQueriesError = CommonErrors;

export const listOrganizationsLocationsRecentQueries = API.makePaginated(() => ({
  input: ListOrganizationsLocationsRecentQueriesRequest,
  output: ListOrganizationsLocationsRecentQueriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all the exclusions on the _Default sink in a parent resource. */
export interface ListOrganizationsExclusionsRequest {
  /** Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListOrganizationsExclusionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/exclusions" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsExclusionsRequest>;

export type ListOrganizationsExclusionsResponse = ListExclusionsResponse;
export const ListOrganizationsExclusionsResponse = ListExclusionsResponse;

export type ListOrganizationsExclusionsError = CommonErrors;

export const listOrganizationsExclusions = API.makePaginated(() => ({
  input: ListOrganizationsExclusionsRequest,
  output: ListOrganizationsExclusionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the description of an exclusion in the _Default sink. */
export interface GetOrganizationsExclusionsRequest {
  /** Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion" */
  name: string;
}

export const GetOrganizationsExclusionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/exclusions/{exclusionsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsExclusionsRequest>;

export type GetOrganizationsExclusionsResponse = LogExclusion;
export const GetOrganizationsExclusionsResponse = LogExclusion;

export type GetOrganizationsExclusionsError = CommonErrors;

export const getOrganizationsExclusions: API.OperationMethod<GetOrganizationsExclusionsRequest, GetOrganizationsExclusionsResponse, GetOrganizationsExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsExclusionsRequest,
  output: GetOrganizationsExclusionsResponse,
  errors: [],
}));

/** Creates a new exclusion in the _Default sink in a specified parent resource. Only log entries belonging to that resource can be excluded. You can have up to 10 exclusions in a resource. */
export interface CreateOrganizationsExclusionsRequest {
  /** Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-logging-project" "organizations/123456789" */
  parent: string;
  /** Request body */
  body?: LogExclusion;
}

export const CreateOrganizationsExclusionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(LogExclusion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/exclusions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsExclusionsRequest>;

export type CreateOrganizationsExclusionsResponse = LogExclusion;
export const CreateOrganizationsExclusionsResponse = LogExclusion;

export type CreateOrganizationsExclusionsError = CommonErrors;

export const createOrganizationsExclusions: API.OperationMethod<CreateOrganizationsExclusionsRequest, CreateOrganizationsExclusionsResponse, CreateOrganizationsExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsExclusionsRequest,
  output: CreateOrganizationsExclusionsResponse,
  errors: [],
}));

/** Changes one or more properties of an existing exclusion in the _Default sink. */
export interface PatchOrganizationsExclusionsRequest {
  /** Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion" */
  name: string;
  /** Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description". */
  updateMask?: string;
  /** Request body */
  body?: LogExclusion;
}

export const PatchOrganizationsExclusionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogExclusion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/exclusions/{exclusionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsExclusionsRequest>;

export type PatchOrganizationsExclusionsResponse = LogExclusion;
export const PatchOrganizationsExclusionsResponse = LogExclusion;

export type PatchOrganizationsExclusionsError = CommonErrors;

export const patchOrganizationsExclusions: API.OperationMethod<PatchOrganizationsExclusionsRequest, PatchOrganizationsExclusionsResponse, PatchOrganizationsExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsExclusionsRequest,
  output: PatchOrganizationsExclusionsResponse,
  errors: [],
}));

/** Deletes an exclusion in the _Default sink. */
export interface DeleteOrganizationsExclusionsRequest {
  /** Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion" */
  name: string;
}

export const DeleteOrganizationsExclusionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/exclusions/{exclusionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsExclusionsRequest>;

export type DeleteOrganizationsExclusionsResponse = Empty;
export const DeleteOrganizationsExclusionsResponse = Empty;

export type DeleteOrganizationsExclusionsError = CommonErrors;

export const deleteOrganizationsExclusions: API.OperationMethod<DeleteOrganizationsExclusionsRequest, DeleteOrganizationsExclusionsResponse, DeleteOrganizationsExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsExclusionsRequest,
  output: DeleteOrganizationsExclusionsResponse,
  errors: [],
}));

/** Lists sinks. */
export interface ListOrganizationsSinksRequest {
  /** Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. A filter expression to constrain the sinks returned. Today, this only supports the following strings: '' 'in_scope("ALL")', 'in_scope("ANCESTOR")', 'in_scope("DEFAULT")'.Description of scopes below. ALL: Includes all of the sinks which can be returned in any other scope. ANCESTOR: Includes intercepting sinks owned by ancestor resources. DEFAULT: Includes sinks owned by parent.When the empty string is provided, then the filter 'in_scope("DEFAULT")' is applied. */
  filter?: string;
}

export const ListOrganizationsSinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/sinks" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsSinksRequest>;

export type ListOrganizationsSinksResponse = ListSinksResponse;
export const ListOrganizationsSinksResponse = ListSinksResponse;

export type ListOrganizationsSinksError = CommonErrors;

export const listOrganizationsSinks = API.makePaginated(() => ({
  input: ListOrganizationsSinksRequest,
  output: ListOrganizationsSinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a sink. */
export interface GetOrganizationsSinksRequest {
  /** Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
}

export const GetOrganizationsSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/sinks/{sinksId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsSinksRequest>;

export type GetOrganizationsSinksResponse = LogSink;
export const GetOrganizationsSinksResponse = LogSink;

export type GetOrganizationsSinksError = CommonErrors;

export const getOrganizationsSinks: API.OperationMethod<GetOrganizationsSinksRequest, GetOrganizationsSinksResponse, GetOrganizationsSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsSinksRequest,
  output: GetOrganizationsSinksResponse,
  errors: [],
}));

/** Creates a sink that exports specified log entries to a destination. The export begins upon ingress, unless the sink's writer_identity is not permitted to write to the destination. A sink can export log entries only from the resource owning the sink. */
export interface CreateOrganizationsSinksRequest {
  /** Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-project" "organizations/123456789" */
  parent: string;
  /** Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Cloud Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) used by the sinks with the same parent. For more information, see writer_identity in LogSink. */
  uniqueWriterIdentity?: boolean;
  /** Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. */
  customWriterIdentity?: string;
  /** Request body */
  body?: LogSink;
}

export const CreateOrganizationsSinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  uniqueWriterIdentity: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("uniqueWriterIdentity")),
  customWriterIdentity: Schema.optional(Schema.String).pipe(T.HttpQuery("customWriterIdentity")),
  body: Schema.optional(LogSink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/sinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsSinksRequest>;

export type CreateOrganizationsSinksResponse = LogSink;
export const CreateOrganizationsSinksResponse = LogSink;

export type CreateOrganizationsSinksError = CommonErrors;

export const createOrganizationsSinks: API.OperationMethod<CreateOrganizationsSinksRequest, CreateOrganizationsSinksResponse, CreateOrganizationsSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsSinksRequest,
  output: CreateOrganizationsSinksResponse,
  errors: [],
}));

/** Updates a sink. This method replaces the values of the destination and filter fields of the existing sink with the corresponding values from the new sink.The updated sink might also have a new writer_identity; see the unique_writer_identity field. */
export interface UpdateOrganizationsSinksRequest {
  /** Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
  /** Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) owned by Cloud Logging. It is an error if the old value is true and the new value is set to false or defaulted to false. */
  uniqueWriterIdentity?: boolean;
  /** Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. */
  customWriterIdentity?: string;
  /** Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:destination,filter,includeChildrenAt some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter */
  updateMask?: string;
  /** Request body */
  body?: LogSink;
}

export const UpdateOrganizationsSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
  uniqueWriterIdentity: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("uniqueWriterIdentity")),
  customWriterIdentity: Schema.optional(Schema.String).pipe(T.HttpQuery("customWriterIdentity")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogSink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v2/organizations/{organizationsId}/sinks/{sinksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateOrganizationsSinksRequest>;

export type UpdateOrganizationsSinksResponse = LogSink;
export const UpdateOrganizationsSinksResponse = LogSink;

export type UpdateOrganizationsSinksError = CommonErrors;

export const updateOrganizationsSinks: API.OperationMethod<UpdateOrganizationsSinksRequest, UpdateOrganizationsSinksResponse, UpdateOrganizationsSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateOrganizationsSinksRequest,
  output: UpdateOrganizationsSinksResponse,
  errors: [],
}));

/** Updates a sink. This method replaces the values of the destination and filter fields of the existing sink with the corresponding values from the new sink.The updated sink might also have a new writer_identity; see the unique_writer_identity field. */
export interface PatchOrganizationsSinksRequest {
  /** Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
  /** Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) owned by Cloud Logging. It is an error if the old value is true and the new value is set to false or defaulted to false. */
  uniqueWriterIdentity?: boolean;
  /** Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. */
  customWriterIdentity?: string;
  /** Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:destination,filter,includeChildrenAt some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter */
  updateMask?: string;
  /** Request body */
  body?: LogSink;
}

export const PatchOrganizationsSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
  uniqueWriterIdentity: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("uniqueWriterIdentity")),
  customWriterIdentity: Schema.optional(Schema.String).pipe(T.HttpQuery("customWriterIdentity")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogSink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/sinks/{sinksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsSinksRequest>;

export type PatchOrganizationsSinksResponse = LogSink;
export const PatchOrganizationsSinksResponse = LogSink;

export type PatchOrganizationsSinksError = CommonErrors;

export const patchOrganizationsSinks: API.OperationMethod<PatchOrganizationsSinksRequest, PatchOrganizationsSinksResponse, PatchOrganizationsSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsSinksRequest,
  output: PatchOrganizationsSinksResponse,
  errors: [],
}));

/** Deletes a sink. If the sink has a unique writer_identity, then that service account is also deleted. */
export interface DeleteOrganizationsSinksRequest {
  /** Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
}

export const DeleteOrganizationsSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/sinks/{sinksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsSinksRequest>;

export type DeleteOrganizationsSinksResponse = Empty;
export const DeleteOrganizationsSinksResponse = Empty;

export type DeleteOrganizationsSinksError = CommonErrors;

export const deleteOrganizationsSinks: API.OperationMethod<DeleteOrganizationsSinksRequest, DeleteOrganizationsSinksResponse, DeleteOrganizationsSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsSinksRequest,
  output: DeleteOrganizationsSinksResponse,
  errors: [],
}));

/** Deletes all the log entries in a log for the global _Default Log Bucket. The log reappears if it receives new entries. Log entries written shortly before the delete operation might not be deleted. Entries received after the delete operation with a timestamp before the operation will be deleted. */
export interface DeleteOrganizationsLogsRequest {
  /** Required. The resource name of the log to delete: projects/[PROJECT_ID]/logs/[LOG_ID] organizations/[ORGANIZATION_ID]/logs/[LOG_ID] billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID] folders/[FOLDER_ID]/logs/[LOG_ID][LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/123/logs/cloudaudit.googleapis.com%2Factivity".For more information about log names, see LogEntry. */
  logName: string;
}

export const DeleteOrganizationsLogsRequest = Schema.Struct({
  logName: Schema.String.pipe(T.HttpPath("logName")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/logs/{logsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLogsRequest>;

export type DeleteOrganizationsLogsResponse = Empty;
export const DeleteOrganizationsLogsResponse = Empty;

export type DeleteOrganizationsLogsError = CommonErrors;

export const deleteOrganizationsLogs: API.OperationMethod<DeleteOrganizationsLogsRequest, DeleteOrganizationsLogsResponse, DeleteOrganizationsLogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLogsRequest,
  output: DeleteOrganizationsLogsResponse,
  errors: [],
}));

/** Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed. */
export interface ListOrganizationsLogsRequest {
  /** Required. The resource name to list logs for: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID] */
  parent: string;
  /** Optional. List of resource names to list logs for: projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To support legacy queries, it could also be: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]The resource name in the parent field is added to this list. */
  resourceNames?: string[];
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ListOrganizationsLogsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  resourceNames: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("resourceNames")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/logs" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLogsRequest>;

export type ListOrganizationsLogsResponse = ListLogsResponse;
export const ListOrganizationsLogsResponse = ListLogsResponse;

export type ListOrganizationsLogsError = CommonErrors;

export const listOrganizationsLogs = API.makePaginated(() => ({
  input: ListOrganizationsLogsRequest,
  output: ListOrganizationsLogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the Logging CMEK settings for the given resource.Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information. */
export interface GetCmekSettingsFoldersRequest {
  /** Required. The resource for which to retrieve CMEK settings. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization. */
  name: string;
}

export const GetCmekSettingsFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/cmekSettings" }),
  svc,
) as unknown as Schema.Schema<GetCmekSettingsFoldersRequest>;

export type GetCmekSettingsFoldersResponse = CmekSettings;
export const GetCmekSettingsFoldersResponse = CmekSettings;

export type GetCmekSettingsFoldersError = CommonErrors;

export const getCmekSettingsFolders: API.OperationMethod<GetCmekSettingsFoldersRequest, GetCmekSettingsFoldersResponse, GetCmekSettingsFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCmekSettingsFoldersRequest,
  output: GetCmekSettingsFoldersResponse,
  errors: [],
}));

/** Gets the settings for the given resource.Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts.See View default resource settings for Logging (https://docs.cloud.google.com/logging/docs/default-settings#view-org-settings) for more information. */
export interface GetSettingsFoldersRequest {
  /** Required. The resource for which to retrieve settings. "projects/[PROJECT_ID]/settings" "organizations/[ORGANIZATION_ID]/settings" "billingAccounts/[BILLING_ACCOUNT_ID]/settings" "folders/[FOLDER_ID]/settings" For example:"organizations/12345/settings"Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts. */
  name: string;
}

export const GetSettingsFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/settings" }),
  svc,
) as unknown as Schema.Schema<GetSettingsFoldersRequest>;

export type GetSettingsFoldersResponse = Settings;
export const GetSettingsFoldersResponse = Settings;

export type GetSettingsFoldersError = CommonErrors;

export const getSettingsFolders: API.OperationMethod<GetSettingsFoldersRequest, GetSettingsFoldersResponse, GetSettingsFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSettingsFoldersRequest,
  output: GetSettingsFoldersResponse,
  errors: [],
}));

/** Updates the settings for the given resource. This method applies to all feature configurations for organization and folders.UpdateSettings fails when any of the following are true: The value of storage_location either isn't supported by Logging or violates the location OrgPolicy. The default_sink_config field is set, but it has an unspecified filter write mode. The value of kms_key_name is invalid. The associated service account doesn't have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key. Access to the key is disabled.See Configure default settings for organizations and folders (https://docs.cloud.google.com/logging/docs/default-settings) for more information. */
export interface UpdateSettingsFoldersRequest {
  /** Required. The resource name for the settings to update. "organizations/[ORGANIZATION_ID]/settings" "folders/[FOLDER_ID]/settings" For example:"organizations/12345/settings" */
  name: string;
  /** Optional. Field mask identifying which fields from settings should be updated. A field will be overwritten if and only if it is in the update mask. Output only fields cannot be updated.See FieldMask for more information.For example: "updateMask=kmsKeyName" */
  updateMask?: string;
  /** Request body */
  body?: Settings;
}

export const UpdateSettingsFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Settings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/folders/{foldersId}/settings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSettingsFoldersRequest>;

export type UpdateSettingsFoldersResponse = Settings;
export const UpdateSettingsFoldersResponse = Settings;

export type UpdateSettingsFoldersError = CommonErrors;

export const updateSettingsFolders: API.OperationMethod<UpdateSettingsFoldersRequest, UpdateSettingsFoldersResponse, UpdateSettingsFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSettingsFoldersRequest,
  output: UpdateSettingsFoldersResponse,
  errors: [],
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: List all public locations: Use the path GET /v1/locations. List project-visible locations: Use the path GET /v1/projects/{project_id}/locations. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListFoldersLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like "displayName=tokyo", and is documented in more detail in AIP-160 (https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the next_page_token field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListFoldersLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsRequest>;

export type ListFoldersLocationsResponse = ListLocationsResponse;
export const ListFoldersLocationsResponse = ListLocationsResponse;

export type ListFoldersLocationsError = CommonErrors;

export const listFoldersLocations = API.makePaginated(() => ({
  input: ListFoldersLocationsRequest,
  output: ListFoldersLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetFoldersLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetFoldersLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsRequest>;

export type GetFoldersLocationsResponse = Location;
export const GetFoldersLocationsResponse = Location;

export type GetFoldersLocationsError = CommonErrors;

export const getFoldersLocations: API.OperationMethod<GetFoldersLocationsRequest, GetFoldersLocationsResponse, GetFoldersLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsRequest,
  output: GetFoldersLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED. */
export interface ListFoldersLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListFoldersLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsOperationsRequest>;

export type ListFoldersLocationsOperationsResponse = ListOperationsResponse;
export const ListFoldersLocationsOperationsResponse = ListOperationsResponse;

export type ListFoldersLocationsOperationsError = CommonErrors;

export const listFoldersLocationsOperations = API.makePaginated(() => ({
  input: ListFoldersLocationsOperationsRequest,
  output: ListFoldersLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetFoldersLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetFoldersLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsOperationsRequest>;

export type GetFoldersLocationsOperationsResponse = Operation;
export const GetFoldersLocationsOperationsResponse = Operation;

export type GetFoldersLocationsOperationsError = CommonErrors;

export const getFoldersLocationsOperations: API.OperationMethod<GetFoldersLocationsOperationsRequest, GetFoldersLocationsOperationsResponse, GetFoldersLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsOperationsRequest,
  output: GetFoldersLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED. */
export interface CancelFoldersLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelFoldersLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelFoldersLocationsOperationsRequest>;

export type CancelFoldersLocationsOperationsResponse = Empty;
export const CancelFoldersLocationsOperationsResponse = Empty;

export type CancelFoldersLocationsOperationsError = CommonErrors;

export const cancelFoldersLocationsOperations: API.OperationMethod<CancelFoldersLocationsOperationsRequest, CancelFoldersLocationsOperationsResponse, CancelFoldersLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelFoldersLocationsOperationsRequest,
  output: CancelFoldersLocationsOperationsResponse,
  errors: [],
}));

/** Lists log buckets. */
export interface ListFoldersLocationsBucketsRequest {
  /** Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets. */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListFoldersLocationsBucketsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsBucketsRequest>;

export type ListFoldersLocationsBucketsResponse = ListBucketsResponse;
export const ListFoldersLocationsBucketsResponse = ListBucketsResponse;

export type ListFoldersLocationsBucketsError = CommonErrors;

export const listFoldersLocationsBuckets = API.makePaginated(() => ({
  input: ListFoldersLocationsBucketsRequest,
  output: ListFoldersLocationsBucketsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a log bucket. */
export interface GetFoldersLocationsBucketsRequest {
  /** Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
}

export const GetFoldersLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsBucketsRequest>;

export type GetFoldersLocationsBucketsResponse = LogBucket;
export const GetFoldersLocationsBucketsResponse = LogBucket;

export type GetFoldersLocationsBucketsError = CommonErrors;

export const getFoldersLocationsBuckets: API.OperationMethod<GetFoldersLocationsBucketsRequest, GetFoldersLocationsBucketsResponse, GetFoldersLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsBucketsRequest,
  output: GetFoldersLocationsBucketsResponse,
  errors: [],
}));

/** Creates a log bucket asynchronously that can be used to store log entries.After a bucket has been created, the bucket's location cannot be changed. */
export interface CreateAsyncFoldersLocationsBucketsRequest {
  /** Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global" */
  parent: string;
  /** Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. */
  bucketId?: string;
  /** Request body */
  body?: LogBucket;
}

export const CreateAsyncFoldersLocationsBucketsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  bucketId: Schema.optional(Schema.String).pipe(T.HttpQuery("bucketId")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets:createAsync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAsyncFoldersLocationsBucketsRequest>;

export type CreateAsyncFoldersLocationsBucketsResponse = Operation;
export const CreateAsyncFoldersLocationsBucketsResponse = Operation;

export type CreateAsyncFoldersLocationsBucketsError = CommonErrors;

export const createAsyncFoldersLocationsBuckets: API.OperationMethod<CreateAsyncFoldersLocationsBucketsRequest, CreateAsyncFoldersLocationsBucketsResponse, CreateAsyncFoldersLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAsyncFoldersLocationsBucketsRequest,
  output: CreateAsyncFoldersLocationsBucketsResponse,
  errors: [],
}));

/** Updates a log bucket asynchronously.If the bucket has a lifecycle_state of DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket has been created, the bucket's location cannot be changed. */
export interface UpdateAsyncFoldersLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
  /** Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days */
  updateMask?: string;
  /** Request body */
  body?: LogBucket;
}

export const UpdateAsyncFoldersLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}:updateAsync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAsyncFoldersLocationsBucketsRequest>;

export type UpdateAsyncFoldersLocationsBucketsResponse = Operation;
export const UpdateAsyncFoldersLocationsBucketsResponse = Operation;

export type UpdateAsyncFoldersLocationsBucketsError = CommonErrors;

export const updateAsyncFoldersLocationsBuckets: API.OperationMethod<UpdateAsyncFoldersLocationsBucketsRequest, UpdateAsyncFoldersLocationsBucketsResponse, UpdateAsyncFoldersLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAsyncFoldersLocationsBucketsRequest,
  output: UpdateAsyncFoldersLocationsBucketsResponse,
  errors: [],
}));

/** Creates a log bucket that can be used to store log entries. After a bucket has been created, the bucket's location cannot be changed. */
export interface CreateFoldersLocationsBucketsRequest {
  /** Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global" */
  parent: string;
  /** Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. */
  bucketId?: string;
  /** Request body */
  body?: LogBucket;
}

export const CreateFoldersLocationsBucketsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  bucketId: Schema.optional(Schema.String).pipe(T.HttpQuery("bucketId")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersLocationsBucketsRequest>;

export type CreateFoldersLocationsBucketsResponse = LogBucket;
export const CreateFoldersLocationsBucketsResponse = LogBucket;

export type CreateFoldersLocationsBucketsError = CommonErrors;

export const createFoldersLocationsBuckets: API.OperationMethod<CreateFoldersLocationsBucketsRequest, CreateFoldersLocationsBucketsResponse, CreateFoldersLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersLocationsBucketsRequest,
  output: CreateFoldersLocationsBucketsResponse,
  errors: [],
}));

/** Updates a log bucket.If the bucket has a lifecycle_state of DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket has been created, the bucket's location cannot be changed. */
export interface PatchFoldersLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
  /** Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days */
  updateMask?: string;
  /** Request body */
  body?: LogBucket;
}

export const PatchFoldersLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersLocationsBucketsRequest>;

export type PatchFoldersLocationsBucketsResponse = LogBucket;
export const PatchFoldersLocationsBucketsResponse = LogBucket;

export type PatchFoldersLocationsBucketsError = CommonErrors;

export const patchFoldersLocationsBuckets: API.OperationMethod<PatchFoldersLocationsBucketsRequest, PatchFoldersLocationsBucketsResponse, PatchFoldersLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersLocationsBucketsRequest,
  output: PatchFoldersLocationsBucketsResponse,
  errors: [],
}));

/** Deletes a log bucket.Changes the bucket's lifecycle_state to the DELETE_REQUESTED state. After 7 days, the bucket will be purged and all log entries in the bucket will be permanently deleted. */
export interface DeleteFoldersLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
}

export const DeleteFoldersLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersLocationsBucketsRequest>;

export type DeleteFoldersLocationsBucketsResponse = Empty;
export const DeleteFoldersLocationsBucketsResponse = Empty;

export type DeleteFoldersLocationsBucketsError = CommonErrors;

export const deleteFoldersLocationsBuckets: API.OperationMethod<DeleteFoldersLocationsBucketsRequest, DeleteFoldersLocationsBucketsResponse, DeleteFoldersLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersLocationsBucketsRequest,
  output: DeleteFoldersLocationsBucketsResponse,
  errors: [],
}));

/** Undeletes a log bucket. A bucket that has been deleted can be undeleted within the grace period of 7 days. */
export interface UndeleteFoldersLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to undelete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
  /** Request body */
  body?: UndeleteBucketRequest;
}

export const UndeleteFoldersLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteBucketRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteFoldersLocationsBucketsRequest>;

export type UndeleteFoldersLocationsBucketsResponse = Empty;
export const UndeleteFoldersLocationsBucketsResponse = Empty;

export type UndeleteFoldersLocationsBucketsError = CommonErrors;

export const undeleteFoldersLocationsBuckets: API.OperationMethod<UndeleteFoldersLocationsBucketsRequest, UndeleteFoldersLocationsBucketsResponse, UndeleteFoldersLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteFoldersLocationsBucketsRequest,
  output: UndeleteFoldersLocationsBucketsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyFoldersLocationsBucketsViewsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyFoldersLocationsBucketsViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyFoldersLocationsBucketsViewsRequest>;

export type SetIamPolicyFoldersLocationsBucketsViewsResponse = Policy;
export const SetIamPolicyFoldersLocationsBucketsViewsResponse = Policy;

export type SetIamPolicyFoldersLocationsBucketsViewsError = CommonErrors;

export const setIamPolicyFoldersLocationsBucketsViews: API.OperationMethod<SetIamPolicyFoldersLocationsBucketsViewsRequest, SetIamPolicyFoldersLocationsBucketsViewsResponse, SetIamPolicyFoldersLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyFoldersLocationsBucketsViewsRequest,
  output: SetIamPolicyFoldersLocationsBucketsViewsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyFoldersLocationsBucketsViewsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyFoldersLocationsBucketsViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyFoldersLocationsBucketsViewsRequest>;

export type GetIamPolicyFoldersLocationsBucketsViewsResponse = Policy;
export const GetIamPolicyFoldersLocationsBucketsViewsResponse = Policy;

export type GetIamPolicyFoldersLocationsBucketsViewsError = CommonErrors;

export const getIamPolicyFoldersLocationsBucketsViews: API.OperationMethod<GetIamPolicyFoldersLocationsBucketsViewsRequest, GetIamPolicyFoldersLocationsBucketsViewsResponse, GetIamPolicyFoldersLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyFoldersLocationsBucketsViewsRequest,
  output: GetIamPolicyFoldersLocationsBucketsViewsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsFoldersLocationsBucketsViewsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsFoldersLocationsBucketsViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsFoldersLocationsBucketsViewsRequest>;

export type TestIamPermissionsFoldersLocationsBucketsViewsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsFoldersLocationsBucketsViewsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsFoldersLocationsBucketsViewsError = CommonErrors;

export const testIamPermissionsFoldersLocationsBucketsViews: API.OperationMethod<TestIamPermissionsFoldersLocationsBucketsViewsRequest, TestIamPermissionsFoldersLocationsBucketsViewsResponse, TestIamPermissionsFoldersLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsFoldersLocationsBucketsViewsRequest,
  output: TestIamPermissionsFoldersLocationsBucketsViewsResponse,
  errors: [],
}));

/** Lists views on a log bucket. */
export interface ListFoldersLocationsBucketsViewsRequest {
  /** Required. The bucket whose views are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListFoldersLocationsBucketsViewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}/views" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsBucketsViewsRequest>;

export type ListFoldersLocationsBucketsViewsResponse = ListViewsResponse;
export const ListFoldersLocationsBucketsViewsResponse = ListViewsResponse;

export type ListFoldersLocationsBucketsViewsError = CommonErrors;

export const listFoldersLocationsBucketsViews = API.makePaginated(() => ({
  input: ListFoldersLocationsBucketsViewsRequest,
  output: ListFoldersLocationsBucketsViewsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a view on a log bucket. */
export interface GetFoldersLocationsBucketsViewsRequest {
  /** Required. The resource name of the policy: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" */
  name: string;
}

export const GetFoldersLocationsBucketsViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsBucketsViewsRequest>;

export type GetFoldersLocationsBucketsViewsResponse = LogView;
export const GetFoldersLocationsBucketsViewsResponse = LogView;

export type GetFoldersLocationsBucketsViewsError = CommonErrors;

export const getFoldersLocationsBucketsViews: API.OperationMethod<GetFoldersLocationsBucketsViewsRequest, GetFoldersLocationsBucketsViewsResponse, GetFoldersLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsBucketsViewsRequest,
  output: GetFoldersLocationsBucketsViewsResponse,
  errors: [],
}));

/** Creates a view over log entries in a log bucket. A bucket may contain a maximum of 30 views. */
export interface CreateFoldersLocationsBucketsViewsRequest {
  /** Required. The bucket in which to create the view `"projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"` For example:"projects/my-project/locations/global/buckets/my-bucket" */
  parent: string;
  /** Required. A client-assigned identifier such as "my-view". Identifiers are limited to 100 characters and can include only letters, digits, underscores, and hyphens. */
  viewId?: string;
  /** Request body */
  body?: LogView;
}

export const CreateFoldersLocationsBucketsViewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  viewId: Schema.optional(Schema.String).pipe(T.HttpQuery("viewId")),
  body: Schema.optional(LogView).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}/views", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersLocationsBucketsViewsRequest>;

export type CreateFoldersLocationsBucketsViewsResponse = LogView;
export const CreateFoldersLocationsBucketsViewsResponse = LogView;

export type CreateFoldersLocationsBucketsViewsError = CommonErrors;

export const createFoldersLocationsBucketsViews: API.OperationMethod<CreateFoldersLocationsBucketsViewsRequest, CreateFoldersLocationsBucketsViewsResponse, CreateFoldersLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersLocationsBucketsViewsRequest,
  output: CreateFoldersLocationsBucketsViewsResponse,
  errors: [],
}));

/** Updates a view on a log bucket. This method replaces the value of the filter field from the existing view with the corresponding value from the new view. If an UNAVAILABLE error is returned, this indicates that system is not in a state where it can update the view. If this occurs, please try again in a few minutes. */
export interface PatchFoldersLocationsBucketsViewsRequest {
  /** Required. The full resource name of the view to update "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" */
  name: string;
  /** Optional. Field mask that specifies the fields in view that need an update. A field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter */
  updateMask?: string;
  /** Request body */
  body?: LogView;
}

export const PatchFoldersLocationsBucketsViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogView).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersLocationsBucketsViewsRequest>;

export type PatchFoldersLocationsBucketsViewsResponse = LogView;
export const PatchFoldersLocationsBucketsViewsResponse = LogView;

export type PatchFoldersLocationsBucketsViewsError = CommonErrors;

export const patchFoldersLocationsBucketsViews: API.OperationMethod<PatchFoldersLocationsBucketsViewsRequest, PatchFoldersLocationsBucketsViewsResponse, PatchFoldersLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersLocationsBucketsViewsRequest,
  output: PatchFoldersLocationsBucketsViewsResponse,
  errors: [],
}));

/** Deletes a view on a log bucket. If an UNAVAILABLE error is returned, this indicates that system is not in a state where it can delete the view. If this occurs, please try again in a few minutes. */
export interface DeleteFoldersLocationsBucketsViewsRequest {
  /** Required. The full resource name of the view to delete: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" */
  name: string;
}

export const DeleteFoldersLocationsBucketsViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersLocationsBucketsViewsRequest>;

export type DeleteFoldersLocationsBucketsViewsResponse = Empty;
export const DeleteFoldersLocationsBucketsViewsResponse = Empty;

export type DeleteFoldersLocationsBucketsViewsError = CommonErrors;

export const deleteFoldersLocationsBucketsViews: API.OperationMethod<DeleteFoldersLocationsBucketsViewsRequest, DeleteFoldersLocationsBucketsViewsResponse, DeleteFoldersLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersLocationsBucketsViewsRequest,
  output: DeleteFoldersLocationsBucketsViewsResponse,
  errors: [],
}));

/** Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed. */
export interface ListFoldersLocationsBucketsViewsLogsRequest {
  /** Required. The resource name to list logs for: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID] */
  parent: string;
  /** Optional. List of resource names to list logs for: projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To support legacy queries, it could also be: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]The resource name in the parent field is added to this list. */
  resourceNames?: string[];
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ListFoldersLocationsBucketsViewsLogsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  resourceNames: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("resourceNames")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}/logs" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsBucketsViewsLogsRequest>;

export type ListFoldersLocationsBucketsViewsLogsResponse = ListLogsResponse;
export const ListFoldersLocationsBucketsViewsLogsResponse = ListLogsResponse;

export type ListFoldersLocationsBucketsViewsLogsError = CommonErrors;

export const listFoldersLocationsBucketsViewsLogs = API.makePaginated(() => ({
  input: ListFoldersLocationsBucketsViewsLogsRequest,
  output: ListFoldersLocationsBucketsViewsLogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists links. */
export interface ListFoldersLocationsBucketsLinksRequest {
  /** Required. The parent resource whose links are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. */
  pageSize?: number;
}

export const ListFoldersLocationsBucketsLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}/links" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsBucketsLinksRequest>;

export type ListFoldersLocationsBucketsLinksResponse = ListLinksResponse;
export const ListFoldersLocationsBucketsLinksResponse = ListLinksResponse;

export type ListFoldersLocationsBucketsLinksError = CommonErrors;

export const listFoldersLocationsBucketsLinks = API.makePaginated(() => ({
  input: ListFoldersLocationsBucketsLinksRequest,
  output: ListFoldersLocationsBucketsLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a link. */
export interface GetFoldersLocationsBucketsLinksRequest {
  /** Required. The resource name of the link: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" */
  name: string;
}

export const GetFoldersLocationsBucketsLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}/links/{linksId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsBucketsLinksRequest>;

export type GetFoldersLocationsBucketsLinksResponse = Link;
export const GetFoldersLocationsBucketsLinksResponse = Link;

export type GetFoldersLocationsBucketsLinksError = CommonErrors;

export const getFoldersLocationsBucketsLinks: API.OperationMethod<GetFoldersLocationsBucketsLinksRequest, GetFoldersLocationsBucketsLinksResponse, GetFoldersLocationsBucketsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsBucketsLinksRequest,
  output: GetFoldersLocationsBucketsLinksResponse,
  errors: [],
}));

/** Asynchronously creates a linked dataset in BigQuery which makes it possible to use BigQuery to read the logs stored in the log bucket. A log bucket may currently only contain one link. */
export interface CreateFoldersLocationsBucketsLinksRequest {
  /** Required. The full resource name of the bucket to create a link for. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" */
  parent: string;
  /** Required. The ID to use for the link. The link_id can have up to 100 characters. A valid link_id must only have alphanumeric characters and underscores within it. */
  linkId?: string;
  /** Request body */
  body?: Link;
}

export const CreateFoldersLocationsBucketsLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  linkId: Schema.optional(Schema.String).pipe(T.HttpQuery("linkId")),
  body: Schema.optional(Link).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}/links", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersLocationsBucketsLinksRequest>;

export type CreateFoldersLocationsBucketsLinksResponse = Operation;
export const CreateFoldersLocationsBucketsLinksResponse = Operation;

export type CreateFoldersLocationsBucketsLinksError = CommonErrors;

export const createFoldersLocationsBucketsLinks: API.OperationMethod<CreateFoldersLocationsBucketsLinksRequest, CreateFoldersLocationsBucketsLinksResponse, CreateFoldersLocationsBucketsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersLocationsBucketsLinksRequest,
  output: CreateFoldersLocationsBucketsLinksResponse,
  errors: [],
}));

/** Deletes a link. This will also delete the corresponding BigQuery linked dataset. */
export interface DeleteFoldersLocationsBucketsLinksRequest {
  /** Required. The full resource name of the link to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" */
  name: string;
}

export const DeleteFoldersLocationsBucketsLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/folders/{foldersId}/locations/{locationsId}/buckets/{bucketsId}/links/{linksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersLocationsBucketsLinksRequest>;

export type DeleteFoldersLocationsBucketsLinksResponse = Operation;
export const DeleteFoldersLocationsBucketsLinksResponse = Operation;

export type DeleteFoldersLocationsBucketsLinksError = CommonErrors;

export const deleteFoldersLocationsBucketsLinks: API.OperationMethod<DeleteFoldersLocationsBucketsLinksRequest, DeleteFoldersLocationsBucketsLinksResponse, DeleteFoldersLocationsBucketsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersLocationsBucketsLinksRequest,
  output: DeleteFoldersLocationsBucketsLinksResponse,
  errors: [],
}));

/** Lists log scopes. */
export interface ListFoldersLocationsLogScopesRequest {
  /** Required. The parent resource whose log scopes are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListFoldersLocationsLogScopesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}/logScopes" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsLogScopesRequest>;

export type ListFoldersLocationsLogScopesResponse = ListLogScopesResponse;
export const ListFoldersLocationsLogScopesResponse = ListLogScopesResponse;

export type ListFoldersLocationsLogScopesError = CommonErrors;

export const listFoldersLocationsLogScopes = API.makePaginated(() => ({
  input: ListFoldersLocationsLogScopesRequest,
  output: ListFoldersLocationsLogScopesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a log scope. */
export interface GetFoldersLocationsLogScopesRequest {
  /** Required. The resource name of the log scope: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global/logScopes/my-log-scope" */
  name: string;
}

export const GetFoldersLocationsLogScopesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}/logScopes/{logScopesId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsLogScopesRequest>;

export type GetFoldersLocationsLogScopesResponse = LogScope;
export const GetFoldersLocationsLogScopesResponse = LogScope;

export type GetFoldersLocationsLogScopesError = CommonErrors;

export const getFoldersLocationsLogScopes: API.OperationMethod<GetFoldersLocationsLogScopesRequest, GetFoldersLocationsLogScopesResponse, GetFoldersLocationsLogScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsLogScopesRequest,
  output: GetFoldersLocationsLogScopesResponse,
  errors: [],
}));

/** Creates a log scope. */
export interface CreateFoldersLocationsLogScopesRequest {
  /** Required. The parent resource in which to create the log scope: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global" */
  parent: string;
  /** Required. A client-assigned identifier such as "log-scope". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. First character has to be alphanumeric. */
  logScopeId?: string;
  /** Request body */
  body?: LogScope;
}

export const CreateFoldersLocationsLogScopesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  logScopeId: Schema.optional(Schema.String).pipe(T.HttpQuery("logScopeId")),
  body: Schema.optional(LogScope).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/locations/{locationsId}/logScopes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersLocationsLogScopesRequest>;

export type CreateFoldersLocationsLogScopesResponse = LogScope;
export const CreateFoldersLocationsLogScopesResponse = LogScope;

export type CreateFoldersLocationsLogScopesError = CommonErrors;

export const createFoldersLocationsLogScopes: API.OperationMethod<CreateFoldersLocationsLogScopesRequest, CreateFoldersLocationsLogScopesResponse, CreateFoldersLocationsLogScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersLocationsLogScopesRequest,
  output: CreateFoldersLocationsLogScopesResponse,
  errors: [],
}));

/** Updates a log scope. */
export interface PatchFoldersLocationsLogScopesRequest {
  /** Output only. The resource name of the log scope.Log scopes are only available in the global location. For example:projects/my-project/locations/global/logScopes/my-log-scope */
  name: string;
  /** Optional. Field mask that specifies the fields in log_scope that need an update. A field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=description */
  updateMask?: string;
  /** Request body */
  body?: LogScope;
}

export const PatchFoldersLocationsLogScopesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogScope).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/folders/{foldersId}/locations/{locationsId}/logScopes/{logScopesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersLocationsLogScopesRequest>;

export type PatchFoldersLocationsLogScopesResponse = LogScope;
export const PatchFoldersLocationsLogScopesResponse = LogScope;

export type PatchFoldersLocationsLogScopesError = CommonErrors;

export const patchFoldersLocationsLogScopes: API.OperationMethod<PatchFoldersLocationsLogScopesRequest, PatchFoldersLocationsLogScopesResponse, PatchFoldersLocationsLogScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersLocationsLogScopesRequest,
  output: PatchFoldersLocationsLogScopesResponse,
  errors: [],
}));

/** Deletes a log scope. */
export interface DeleteFoldersLocationsLogScopesRequest {
  /** Required. The resource name of the log scope to delete: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global/logScopes/my-log-scope" */
  name: string;
}

export const DeleteFoldersLocationsLogScopesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/folders/{foldersId}/locations/{locationsId}/logScopes/{logScopesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersLocationsLogScopesRequest>;

export type DeleteFoldersLocationsLogScopesResponse = Empty;
export const DeleteFoldersLocationsLogScopesResponse = Empty;

export type DeleteFoldersLocationsLogScopesError = CommonErrors;

export const deleteFoldersLocationsLogScopes: API.OperationMethod<DeleteFoldersLocationsLogScopesRequest, DeleteFoldersLocationsLogScopesResponse, DeleteFoldersLocationsLogScopesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersLocationsLogScopesRequest,
  output: DeleteFoldersLocationsLogScopesResponse,
  errors: [],
}));

/** Lists the SavedQueries that were created by the user making the request. */
export interface ListFoldersLocationsSavedQueriesRequest {
  /** Required. The resource to which the listed queries belong. "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example: "projects/my-project/locations/us-central1" Note: The locations portion of the resource must be specified. To get a list of all saved queries, a wildcard character - can be used for LOCATION_ID, for example: "projects/my-project/locations/-" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. Specifies the type ("Logging" or "OpsAnalytics") and the visibility (PRIVATE or SHARED) of the saved queries to list. If provided, the filter must contain either the type function or a visibility token, or both. If both are chosen, they can be placed in any order, but they must be joined by the AND operator or the empty character.The two supported type function calls are: type("Logging") type("OpsAnalytics")The two supported visibility tokens are: visibility = PRIVATE visibility = SHAREDFor example:type("Logging") AND visibility = PRIVATE visibility=SHARED type("OpsAnalytics") type("OpsAnalytics)" visibility = PRIVATE visibility = SHARED */
  filter?: string;
}

export const ListFoldersLocationsSavedQueriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}/savedQueries" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsSavedQueriesRequest>;

export type ListFoldersLocationsSavedQueriesResponse = ListSavedQueriesResponse;
export const ListFoldersLocationsSavedQueriesResponse = ListSavedQueriesResponse;

export type ListFoldersLocationsSavedQueriesError = CommonErrors;

export const listFoldersLocationsSavedQueries = API.makePaginated(() => ({
  input: ListFoldersLocationsSavedQueriesRequest,
  output: ListFoldersLocationsSavedQueriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns all data associated with the requested query. */
export interface GetFoldersLocationsSavedQueriesRequest {
  /** Required. The resource name of the saved query. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" For example: "projects/my-project/locations/global/savedQueries/my-saved-query" */
  name: string;
}

export const GetFoldersLocationsSavedQueriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}/savedQueries/{savedQueriesId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsSavedQueriesRequest>;

export type GetFoldersLocationsSavedQueriesResponse = SavedQuery;
export const GetFoldersLocationsSavedQueriesResponse = SavedQuery;

export type GetFoldersLocationsSavedQueriesError = CommonErrors;

export const getFoldersLocationsSavedQueries: API.OperationMethod<GetFoldersLocationsSavedQueriesRequest, GetFoldersLocationsSavedQueriesResponse, GetFoldersLocationsSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsSavedQueriesRequest,
  output: GetFoldersLocationsSavedQueriesResponse,
  errors: [],
}));

/** Creates a new SavedQuery for the user making the request. */
export interface CreateFoldersLocationsSavedQueriesRequest {
  /** Required. The parent resource in which to create the saved query: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example: "projects/my-project/locations/global" "organizations/123456789/locations/us-central1" */
  parent: string;
  /** Optional. The ID to use for the saved query, which will become the final component of the saved query's resource name.If the saved_query_id is not provided, the system will generate an alphanumeric ID.The saved_query_id is limited to 100 characters and can include only the following characters: upper and lower-case alphanumeric characters, underscores, hyphens, periods.First character has to be alphanumeric. */
  savedQueryId?: string;
  /** Request body */
  body?: SavedQuery;
}

export const CreateFoldersLocationsSavedQueriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  savedQueryId: Schema.optional(Schema.String).pipe(T.HttpQuery("savedQueryId")),
  body: Schema.optional(SavedQuery).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/locations/{locationsId}/savedQueries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersLocationsSavedQueriesRequest>;

export type CreateFoldersLocationsSavedQueriesResponse = SavedQuery;
export const CreateFoldersLocationsSavedQueriesResponse = SavedQuery;

export type CreateFoldersLocationsSavedQueriesError = CommonErrors;

export const createFoldersLocationsSavedQueries: API.OperationMethod<CreateFoldersLocationsSavedQueriesRequest, CreateFoldersLocationsSavedQueriesResponse, CreateFoldersLocationsSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersLocationsSavedQueriesRequest,
  output: CreateFoldersLocationsSavedQueriesResponse,
  errors: [],
}));

/** Updates an existing SavedQuery. */
export interface PatchFoldersLocationsSavedQueriesRequest {
  /** Output only. Resource name of the saved query.In the format: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" For a list of supported locations, see Supported Regions (https://docs.cloud.google.com/logging/docs/region-support#bucket-regions)After the saved query is created, the location cannot be changed.If the user doesn't provide a QUERY_ID, the system will generate an alphanumeric ID. */
  name: string;
  /** Required. A non-empty list of fields to change in the existing saved query. Fields are relative to the saved_query and new values for the fields are taken from the corresponding fields in the SavedQuery included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.To update all mutable fields, specify an update_mask of *.For example, to change the description and query filter text of a saved query, specify an update_mask of "description, query.filter". */
  updateMask?: string;
  /** Request body */
  body?: SavedQuery;
}

export const PatchFoldersLocationsSavedQueriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SavedQuery).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/folders/{foldersId}/locations/{locationsId}/savedQueries/{savedQueriesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersLocationsSavedQueriesRequest>;

export type PatchFoldersLocationsSavedQueriesResponse = SavedQuery;
export const PatchFoldersLocationsSavedQueriesResponse = SavedQuery;

export type PatchFoldersLocationsSavedQueriesError = CommonErrors;

export const patchFoldersLocationsSavedQueries: API.OperationMethod<PatchFoldersLocationsSavedQueriesRequest, PatchFoldersLocationsSavedQueriesResponse, PatchFoldersLocationsSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersLocationsSavedQueriesRequest,
  output: PatchFoldersLocationsSavedQueriesResponse,
  errors: [],
}));

/** Deletes an existing SavedQuery that was created by the user making the request. */
export interface DeleteFoldersLocationsSavedQueriesRequest {
  /** Required. The full resource name of the saved query to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" For example: "projects/my-project/locations/global/savedQueries/my-saved-query" */
  name: string;
}

export const DeleteFoldersLocationsSavedQueriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/folders/{foldersId}/locations/{locationsId}/savedQueries/{savedQueriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersLocationsSavedQueriesRequest>;

export type DeleteFoldersLocationsSavedQueriesResponse = Empty;
export const DeleteFoldersLocationsSavedQueriesResponse = Empty;

export type DeleteFoldersLocationsSavedQueriesError = CommonErrors;

export const deleteFoldersLocationsSavedQueries: API.OperationMethod<DeleteFoldersLocationsSavedQueriesRequest, DeleteFoldersLocationsSavedQueriesResponse, DeleteFoldersLocationsSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersLocationsSavedQueriesRequest,
  output: DeleteFoldersLocationsSavedQueriesResponse,
  errors: [],
}));

/** Lists the RecentQueries that were created by the user making the request. */
export interface ListFoldersLocationsRecentQueriesRequest {
  /** Required. The resource to which the listed queries belong. "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example:projects/my-project/locations/us-central1Note: The location portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all recent queries. */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. Specifies the type ("Logging" or "OpsAnalytics") of the recent queries to list. The only valid value for this field is one of the two allowable type function calls, which are the following: type("Logging") type("OpsAnalytics") */
  filter?: string;
}

export const ListFoldersLocationsRecentQueriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}/recentQueries" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsRecentQueriesRequest>;

export type ListFoldersLocationsRecentQueriesResponse = ListRecentQueriesResponse;
export const ListFoldersLocationsRecentQueriesResponse = ListRecentQueriesResponse;

export type ListFoldersLocationsRecentQueriesError = CommonErrors;

export const listFoldersLocationsRecentQueries = API.makePaginated(() => ({
  input: ListFoldersLocationsRecentQueriesRequest,
  output: ListFoldersLocationsRecentQueriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all the exclusions on the _Default sink in a parent resource. */
export interface ListFoldersExclusionsRequest {
  /** Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListFoldersExclusionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/exclusions" }),
  svc,
) as unknown as Schema.Schema<ListFoldersExclusionsRequest>;

export type ListFoldersExclusionsResponse = ListExclusionsResponse;
export const ListFoldersExclusionsResponse = ListExclusionsResponse;

export type ListFoldersExclusionsError = CommonErrors;

export const listFoldersExclusions = API.makePaginated(() => ({
  input: ListFoldersExclusionsRequest,
  output: ListFoldersExclusionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the description of an exclusion in the _Default sink. */
export interface GetFoldersExclusionsRequest {
  /** Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion" */
  name: string;
}

export const GetFoldersExclusionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/exclusions/{exclusionsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersExclusionsRequest>;

export type GetFoldersExclusionsResponse = LogExclusion;
export const GetFoldersExclusionsResponse = LogExclusion;

export type GetFoldersExclusionsError = CommonErrors;

export const getFoldersExclusions: API.OperationMethod<GetFoldersExclusionsRequest, GetFoldersExclusionsResponse, GetFoldersExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersExclusionsRequest,
  output: GetFoldersExclusionsResponse,
  errors: [],
}));

/** Creates a new exclusion in the _Default sink in a specified parent resource. Only log entries belonging to that resource can be excluded. You can have up to 10 exclusions in a resource. */
export interface CreateFoldersExclusionsRequest {
  /** Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-logging-project" "organizations/123456789" */
  parent: string;
  /** Request body */
  body?: LogExclusion;
}

export const CreateFoldersExclusionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(LogExclusion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/exclusions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersExclusionsRequest>;

export type CreateFoldersExclusionsResponse = LogExclusion;
export const CreateFoldersExclusionsResponse = LogExclusion;

export type CreateFoldersExclusionsError = CommonErrors;

export const createFoldersExclusions: API.OperationMethod<CreateFoldersExclusionsRequest, CreateFoldersExclusionsResponse, CreateFoldersExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersExclusionsRequest,
  output: CreateFoldersExclusionsResponse,
  errors: [],
}));

/** Changes one or more properties of an existing exclusion in the _Default sink. */
export interface PatchFoldersExclusionsRequest {
  /** Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion" */
  name: string;
  /** Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description". */
  updateMask?: string;
  /** Request body */
  body?: LogExclusion;
}

export const PatchFoldersExclusionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogExclusion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/folders/{foldersId}/exclusions/{exclusionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersExclusionsRequest>;

export type PatchFoldersExclusionsResponse = LogExclusion;
export const PatchFoldersExclusionsResponse = LogExclusion;

export type PatchFoldersExclusionsError = CommonErrors;

export const patchFoldersExclusions: API.OperationMethod<PatchFoldersExclusionsRequest, PatchFoldersExclusionsResponse, PatchFoldersExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersExclusionsRequest,
  output: PatchFoldersExclusionsResponse,
  errors: [],
}));

/** Deletes an exclusion in the _Default sink. */
export interface DeleteFoldersExclusionsRequest {
  /** Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion" */
  name: string;
}

export const DeleteFoldersExclusionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/folders/{foldersId}/exclusions/{exclusionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersExclusionsRequest>;

export type DeleteFoldersExclusionsResponse = Empty;
export const DeleteFoldersExclusionsResponse = Empty;

export type DeleteFoldersExclusionsError = CommonErrors;

export const deleteFoldersExclusions: API.OperationMethod<DeleteFoldersExclusionsRequest, DeleteFoldersExclusionsResponse, DeleteFoldersExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersExclusionsRequest,
  output: DeleteFoldersExclusionsResponse,
  errors: [],
}));

/** Lists sinks. */
export interface ListFoldersSinksRequest {
  /** Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. A filter expression to constrain the sinks returned. Today, this only supports the following strings: '' 'in_scope("ALL")', 'in_scope("ANCESTOR")', 'in_scope("DEFAULT")'.Description of scopes below. ALL: Includes all of the sinks which can be returned in any other scope. ANCESTOR: Includes intercepting sinks owned by ancestor resources. DEFAULT: Includes sinks owned by parent.When the empty string is provided, then the filter 'in_scope("DEFAULT")' is applied. */
  filter?: string;
}

export const ListFoldersSinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/sinks" }),
  svc,
) as unknown as Schema.Schema<ListFoldersSinksRequest>;

export type ListFoldersSinksResponse = ListSinksResponse;
export const ListFoldersSinksResponse = ListSinksResponse;

export type ListFoldersSinksError = CommonErrors;

export const listFoldersSinks = API.makePaginated(() => ({
  input: ListFoldersSinksRequest,
  output: ListFoldersSinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a sink. */
export interface GetFoldersSinksRequest {
  /** Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
}

export const GetFoldersSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/sinks/{sinksId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersSinksRequest>;

export type GetFoldersSinksResponse = LogSink;
export const GetFoldersSinksResponse = LogSink;

export type GetFoldersSinksError = CommonErrors;

export const getFoldersSinks: API.OperationMethod<GetFoldersSinksRequest, GetFoldersSinksResponse, GetFoldersSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersSinksRequest,
  output: GetFoldersSinksResponse,
  errors: [],
}));

/** Creates a sink that exports specified log entries to a destination. The export begins upon ingress, unless the sink's writer_identity is not permitted to write to the destination. A sink can export log entries only from the resource owning the sink. */
export interface CreateFoldersSinksRequest {
  /** Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-project" "organizations/123456789" */
  parent: string;
  /** Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Cloud Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) used by the sinks with the same parent. For more information, see writer_identity in LogSink. */
  uniqueWriterIdentity?: boolean;
  /** Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. */
  customWriterIdentity?: string;
  /** Request body */
  body?: LogSink;
}

export const CreateFoldersSinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  uniqueWriterIdentity: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("uniqueWriterIdentity")),
  customWriterIdentity: Schema.optional(Schema.String).pipe(T.HttpQuery("customWriterIdentity")),
  body: Schema.optional(LogSink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/sinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersSinksRequest>;

export type CreateFoldersSinksResponse = LogSink;
export const CreateFoldersSinksResponse = LogSink;

export type CreateFoldersSinksError = CommonErrors;

export const createFoldersSinks: API.OperationMethod<CreateFoldersSinksRequest, CreateFoldersSinksResponse, CreateFoldersSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersSinksRequest,
  output: CreateFoldersSinksResponse,
  errors: [],
}));

/** Updates a sink. This method replaces the values of the destination and filter fields of the existing sink with the corresponding values from the new sink.The updated sink might also have a new writer_identity; see the unique_writer_identity field. */
export interface UpdateFoldersSinksRequest {
  /** Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
  /** Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) owned by Cloud Logging. It is an error if the old value is true and the new value is set to false or defaulted to false. */
  uniqueWriterIdentity?: boolean;
  /** Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. */
  customWriterIdentity?: string;
  /** Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:destination,filter,includeChildrenAt some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter */
  updateMask?: string;
  /** Request body */
  body?: LogSink;
}

export const UpdateFoldersSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
  uniqueWriterIdentity: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("uniqueWriterIdentity")),
  customWriterIdentity: Schema.optional(Schema.String).pipe(T.HttpQuery("customWriterIdentity")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogSink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v2/folders/{foldersId}/sinks/{sinksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateFoldersSinksRequest>;

export type UpdateFoldersSinksResponse = LogSink;
export const UpdateFoldersSinksResponse = LogSink;

export type UpdateFoldersSinksError = CommonErrors;

export const updateFoldersSinks: API.OperationMethod<UpdateFoldersSinksRequest, UpdateFoldersSinksResponse, UpdateFoldersSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateFoldersSinksRequest,
  output: UpdateFoldersSinksResponse,
  errors: [],
}));

/** Updates a sink. This method replaces the values of the destination and filter fields of the existing sink with the corresponding values from the new sink.The updated sink might also have a new writer_identity; see the unique_writer_identity field. */
export interface PatchFoldersSinksRequest {
  /** Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
  /** Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) owned by Cloud Logging. It is an error if the old value is true and the new value is set to false or defaulted to false. */
  uniqueWriterIdentity?: boolean;
  /** Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. */
  customWriterIdentity?: string;
  /** Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:destination,filter,includeChildrenAt some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter */
  updateMask?: string;
  /** Request body */
  body?: LogSink;
}

export const PatchFoldersSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
  uniqueWriterIdentity: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("uniqueWriterIdentity")),
  customWriterIdentity: Schema.optional(Schema.String).pipe(T.HttpQuery("customWriterIdentity")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogSink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/folders/{foldersId}/sinks/{sinksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersSinksRequest>;

export type PatchFoldersSinksResponse = LogSink;
export const PatchFoldersSinksResponse = LogSink;

export type PatchFoldersSinksError = CommonErrors;

export const patchFoldersSinks: API.OperationMethod<PatchFoldersSinksRequest, PatchFoldersSinksResponse, PatchFoldersSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersSinksRequest,
  output: PatchFoldersSinksResponse,
  errors: [],
}));

/** Deletes a sink. If the sink has a unique writer_identity, then that service account is also deleted. */
export interface DeleteFoldersSinksRequest {
  /** Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
}

export const DeleteFoldersSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/folders/{foldersId}/sinks/{sinksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersSinksRequest>;

export type DeleteFoldersSinksResponse = Empty;
export const DeleteFoldersSinksResponse = Empty;

export type DeleteFoldersSinksError = CommonErrors;

export const deleteFoldersSinks: API.OperationMethod<DeleteFoldersSinksRequest, DeleteFoldersSinksResponse, DeleteFoldersSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersSinksRequest,
  output: DeleteFoldersSinksResponse,
  errors: [],
}));

/** Deletes all the log entries in a log for the global _Default Log Bucket. The log reappears if it receives new entries. Log entries written shortly before the delete operation might not be deleted. Entries received after the delete operation with a timestamp before the operation will be deleted. */
export interface DeleteFoldersLogsRequest {
  /** Required. The resource name of the log to delete: projects/[PROJECT_ID]/logs/[LOG_ID] organizations/[ORGANIZATION_ID]/logs/[LOG_ID] billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID] folders/[FOLDER_ID]/logs/[LOG_ID][LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/123/logs/cloudaudit.googleapis.com%2Factivity".For more information about log names, see LogEntry. */
  logName: string;
}

export const DeleteFoldersLogsRequest = Schema.Struct({
  logName: Schema.String.pipe(T.HttpPath("logName")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/folders/{foldersId}/logs/{logsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersLogsRequest>;

export type DeleteFoldersLogsResponse = Empty;
export const DeleteFoldersLogsResponse = Empty;

export type DeleteFoldersLogsError = CommonErrors;

export const deleteFoldersLogs: API.OperationMethod<DeleteFoldersLogsRequest, DeleteFoldersLogsResponse, DeleteFoldersLogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersLogsRequest,
  output: DeleteFoldersLogsResponse,
  errors: [],
}));

/** Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed. */
export interface ListFoldersLogsRequest {
  /** Required. The resource name to list logs for: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID] */
  parent: string;
  /** Optional. List of resource names to list logs for: projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To support legacy queries, it could also be: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]The resource name in the parent field is added to this list. */
  resourceNames?: string[];
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ListFoldersLogsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  resourceNames: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("resourceNames")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/logs" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLogsRequest>;

export type ListFoldersLogsResponse = ListLogsResponse;
export const ListFoldersLogsResponse = ListLogsResponse;

export type ListFoldersLogsError = CommonErrors;

export const listFoldersLogs = API.makePaginated(() => ({
  input: ListFoldersLogsRequest,
  output: ListFoldersLogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the Logging CMEK settings for the given resource.Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information. */
export interface GetCmekSettingsBillingAccountsRequest {
  /** Required. The resource for which to retrieve CMEK settings. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization. */
  name: string;
}

export const GetCmekSettingsBillingAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/cmekSettings" }),
  svc,
) as unknown as Schema.Schema<GetCmekSettingsBillingAccountsRequest>;

export type GetCmekSettingsBillingAccountsResponse = CmekSettings;
export const GetCmekSettingsBillingAccountsResponse = CmekSettings;

export type GetCmekSettingsBillingAccountsError = CommonErrors;

export const getCmekSettingsBillingAccounts: API.OperationMethod<GetCmekSettingsBillingAccountsRequest, GetCmekSettingsBillingAccountsResponse, GetCmekSettingsBillingAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCmekSettingsBillingAccountsRequest,
  output: GetCmekSettingsBillingAccountsResponse,
  errors: [],
}));

/** Gets the settings for the given resource.Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts.See View default resource settings for Logging (https://docs.cloud.google.com/logging/docs/default-settings#view-org-settings) for more information. */
export interface GetSettingsBillingAccountsRequest {
  /** Required. The resource for which to retrieve settings. "projects/[PROJECT_ID]/settings" "organizations/[ORGANIZATION_ID]/settings" "billingAccounts/[BILLING_ACCOUNT_ID]/settings" "folders/[FOLDER_ID]/settings" For example:"organizations/12345/settings"Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts. */
  name: string;
}

export const GetSettingsBillingAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/settings" }),
  svc,
) as unknown as Schema.Schema<GetSettingsBillingAccountsRequest>;

export type GetSettingsBillingAccountsResponse = Settings;
export const GetSettingsBillingAccountsResponse = Settings;

export type GetSettingsBillingAccountsError = CommonErrors;

export const getSettingsBillingAccounts: API.OperationMethod<GetSettingsBillingAccountsRequest, GetSettingsBillingAccountsResponse, GetSettingsBillingAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSettingsBillingAccountsRequest,
  output: GetSettingsBillingAccountsResponse,
  errors: [],
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: List all public locations: Use the path GET /v1/locations. List project-visible locations: Use the path GET /v1/projects/{project_id}/locations. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListBillingAccountsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like "displayName=tokyo", and is documented in more detail in AIP-160 (https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the next_page_token field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListBillingAccountsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsLocationsRequest>;

export type ListBillingAccountsLocationsResponse = ListLocationsResponse;
export const ListBillingAccountsLocationsResponse = ListLocationsResponse;

export type ListBillingAccountsLocationsError = CommonErrors;

export const listBillingAccountsLocations = API.makePaginated(() => ({
  input: ListBillingAccountsLocationsRequest,
  output: ListBillingAccountsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetBillingAccountsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetBillingAccountsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsLocationsRequest>;

export type GetBillingAccountsLocationsResponse = Location;
export const GetBillingAccountsLocationsResponse = Location;

export type GetBillingAccountsLocationsError = CommonErrors;

export const getBillingAccountsLocations: API.OperationMethod<GetBillingAccountsLocationsRequest, GetBillingAccountsLocationsResponse, GetBillingAccountsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBillingAccountsLocationsRequest,
  output: GetBillingAccountsLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED. */
export interface ListBillingAccountsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListBillingAccountsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsLocationsOperationsRequest>;

export type ListBillingAccountsLocationsOperationsResponse = ListOperationsResponse;
export const ListBillingAccountsLocationsOperationsResponse = ListOperationsResponse;

export type ListBillingAccountsLocationsOperationsError = CommonErrors;

export const listBillingAccountsLocationsOperations = API.makePaginated(() => ({
  input: ListBillingAccountsLocationsOperationsRequest,
  output: ListBillingAccountsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetBillingAccountsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetBillingAccountsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsLocationsOperationsRequest>;

export type GetBillingAccountsLocationsOperationsResponse = Operation;
export const GetBillingAccountsLocationsOperationsResponse = Operation;

export type GetBillingAccountsLocationsOperationsError = CommonErrors;

export const getBillingAccountsLocationsOperations: API.OperationMethod<GetBillingAccountsLocationsOperationsRequest, GetBillingAccountsLocationsOperationsResponse, GetBillingAccountsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBillingAccountsLocationsOperationsRequest,
  output: GetBillingAccountsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED. */
export interface CancelBillingAccountsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelBillingAccountsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelBillingAccountsLocationsOperationsRequest>;

export type CancelBillingAccountsLocationsOperationsResponse = Empty;
export const CancelBillingAccountsLocationsOperationsResponse = Empty;

export type CancelBillingAccountsLocationsOperationsError = CommonErrors;

export const cancelBillingAccountsLocationsOperations: API.OperationMethod<CancelBillingAccountsLocationsOperationsRequest, CancelBillingAccountsLocationsOperationsResponse, CancelBillingAccountsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelBillingAccountsLocationsOperationsRequest,
  output: CancelBillingAccountsLocationsOperationsResponse,
  errors: [],
}));

/** Lists log buckets. */
export interface ListBillingAccountsLocationsBucketsRequest {
  /** Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets. */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListBillingAccountsLocationsBucketsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsLocationsBucketsRequest>;

export type ListBillingAccountsLocationsBucketsResponse = ListBucketsResponse;
export const ListBillingAccountsLocationsBucketsResponse = ListBucketsResponse;

export type ListBillingAccountsLocationsBucketsError = CommonErrors;

export const listBillingAccountsLocationsBuckets = API.makePaginated(() => ({
  input: ListBillingAccountsLocationsBucketsRequest,
  output: ListBillingAccountsLocationsBucketsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a log bucket. */
export interface GetBillingAccountsLocationsBucketsRequest {
  /** Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
}

export const GetBillingAccountsLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets/{bucketsId}" }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsLocationsBucketsRequest>;

export type GetBillingAccountsLocationsBucketsResponse = LogBucket;
export const GetBillingAccountsLocationsBucketsResponse = LogBucket;

export type GetBillingAccountsLocationsBucketsError = CommonErrors;

export const getBillingAccountsLocationsBuckets: API.OperationMethod<GetBillingAccountsLocationsBucketsRequest, GetBillingAccountsLocationsBucketsResponse, GetBillingAccountsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBillingAccountsLocationsBucketsRequest,
  output: GetBillingAccountsLocationsBucketsResponse,
  errors: [],
}));

/** Creates a log bucket asynchronously that can be used to store log entries.After a bucket has been created, the bucket's location cannot be changed. */
export interface CreateAsyncBillingAccountsLocationsBucketsRequest {
  /** Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global" */
  parent: string;
  /** Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. */
  bucketId?: string;
  /** Request body */
  body?: LogBucket;
}

export const CreateAsyncBillingAccountsLocationsBucketsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  bucketId: Schema.optional(Schema.String).pipe(T.HttpQuery("bucketId")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets:createAsync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAsyncBillingAccountsLocationsBucketsRequest>;

export type CreateAsyncBillingAccountsLocationsBucketsResponse = Operation;
export const CreateAsyncBillingAccountsLocationsBucketsResponse = Operation;

export type CreateAsyncBillingAccountsLocationsBucketsError = CommonErrors;

export const createAsyncBillingAccountsLocationsBuckets: API.OperationMethod<CreateAsyncBillingAccountsLocationsBucketsRequest, CreateAsyncBillingAccountsLocationsBucketsResponse, CreateAsyncBillingAccountsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAsyncBillingAccountsLocationsBucketsRequest,
  output: CreateAsyncBillingAccountsLocationsBucketsResponse,
  errors: [],
}));

/** Updates a log bucket asynchronously.If the bucket has a lifecycle_state of DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket has been created, the bucket's location cannot be changed. */
export interface UpdateAsyncBillingAccountsLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
  /** Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days */
  updateMask?: string;
  /** Request body */
  body?: LogBucket;
}

export const UpdateAsyncBillingAccountsLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets/{bucketsId}:updateAsync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAsyncBillingAccountsLocationsBucketsRequest>;

export type UpdateAsyncBillingAccountsLocationsBucketsResponse = Operation;
export const UpdateAsyncBillingAccountsLocationsBucketsResponse = Operation;

export type UpdateAsyncBillingAccountsLocationsBucketsError = CommonErrors;

export const updateAsyncBillingAccountsLocationsBuckets: API.OperationMethod<UpdateAsyncBillingAccountsLocationsBucketsRequest, UpdateAsyncBillingAccountsLocationsBucketsResponse, UpdateAsyncBillingAccountsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAsyncBillingAccountsLocationsBucketsRequest,
  output: UpdateAsyncBillingAccountsLocationsBucketsResponse,
  errors: [],
}));

/** Creates a log bucket that can be used to store log entries. After a bucket has been created, the bucket's location cannot be changed. */
export interface CreateBillingAccountsLocationsBucketsRequest {
  /** Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global" */
  parent: string;
  /** Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. */
  bucketId?: string;
  /** Request body */
  body?: LogBucket;
}

export const CreateBillingAccountsLocationsBucketsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  bucketId: Schema.optional(Schema.String).pipe(T.HttpQuery("bucketId")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBillingAccountsLocationsBucketsRequest>;

export type CreateBillingAccountsLocationsBucketsResponse = LogBucket;
export const CreateBillingAccountsLocationsBucketsResponse = LogBucket;

export type CreateBillingAccountsLocationsBucketsError = CommonErrors;

export const createBillingAccountsLocationsBuckets: API.OperationMethod<CreateBillingAccountsLocationsBucketsRequest, CreateBillingAccountsLocationsBucketsResponse, CreateBillingAccountsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBillingAccountsLocationsBucketsRequest,
  output: CreateBillingAccountsLocationsBucketsResponse,
  errors: [],
}));

/** Updates a log bucket.If the bucket has a lifecycle_state of DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket has been created, the bucket's location cannot be changed. */
export interface PatchBillingAccountsLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
  /** Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days */
  updateMask?: string;
  /** Request body */
  body?: LogBucket;
}

export const PatchBillingAccountsLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogBucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets/{bucketsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchBillingAccountsLocationsBucketsRequest>;

export type PatchBillingAccountsLocationsBucketsResponse = LogBucket;
export const PatchBillingAccountsLocationsBucketsResponse = LogBucket;

export type PatchBillingAccountsLocationsBucketsError = CommonErrors;

export const patchBillingAccountsLocationsBuckets: API.OperationMethod<PatchBillingAccountsLocationsBucketsRequest, PatchBillingAccountsLocationsBucketsResponse, PatchBillingAccountsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchBillingAccountsLocationsBucketsRequest,
  output: PatchBillingAccountsLocationsBucketsResponse,
  errors: [],
}));

/** Deletes a log bucket.Changes the bucket's lifecycle_state to the DELETE_REQUESTED state. After 7 days, the bucket will be purged and all log entries in the bucket will be permanently deleted. */
export interface DeleteBillingAccountsLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
}

export const DeleteBillingAccountsLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets/{bucketsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteBillingAccountsLocationsBucketsRequest>;

export type DeleteBillingAccountsLocationsBucketsResponse = Empty;
export const DeleteBillingAccountsLocationsBucketsResponse = Empty;

export type DeleteBillingAccountsLocationsBucketsError = CommonErrors;

export const deleteBillingAccountsLocationsBuckets: API.OperationMethod<DeleteBillingAccountsLocationsBucketsRequest, DeleteBillingAccountsLocationsBucketsResponse, DeleteBillingAccountsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteBillingAccountsLocationsBucketsRequest,
  output: DeleteBillingAccountsLocationsBucketsResponse,
  errors: [],
}));

/** Undeletes a log bucket. A bucket that has been deleted can be undeleted within the grace period of 7 days. */
export interface UndeleteBillingAccountsLocationsBucketsRequest {
  /** Required. The full resource name of the bucket to undelete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket" */
  name: string;
  /** Request body */
  body?: UndeleteBucketRequest;
}

export const UndeleteBillingAccountsLocationsBucketsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteBucketRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets/{bucketsId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteBillingAccountsLocationsBucketsRequest>;

export type UndeleteBillingAccountsLocationsBucketsResponse = Empty;
export const UndeleteBillingAccountsLocationsBucketsResponse = Empty;

export type UndeleteBillingAccountsLocationsBucketsError = CommonErrors;

export const undeleteBillingAccountsLocationsBuckets: API.OperationMethod<UndeleteBillingAccountsLocationsBucketsRequest, UndeleteBillingAccountsLocationsBucketsResponse, UndeleteBillingAccountsLocationsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteBillingAccountsLocationsBucketsRequest,
  output: UndeleteBillingAccountsLocationsBucketsResponse,
  errors: [],
}));

/** Lists views on a log bucket. */
export interface ListBillingAccountsLocationsBucketsViewsRequest {
  /** Required. The bucket whose views are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListBillingAccountsLocationsBucketsViewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets/{bucketsId}/views" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsLocationsBucketsViewsRequest>;

export type ListBillingAccountsLocationsBucketsViewsResponse = ListViewsResponse;
export const ListBillingAccountsLocationsBucketsViewsResponse = ListViewsResponse;

export type ListBillingAccountsLocationsBucketsViewsError = CommonErrors;

export const listBillingAccountsLocationsBucketsViews = API.makePaginated(() => ({
  input: ListBillingAccountsLocationsBucketsViewsRequest,
  output: ListBillingAccountsLocationsBucketsViewsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a view on a log bucket. */
export interface GetBillingAccountsLocationsBucketsViewsRequest {
  /** Required. The resource name of the policy: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" */
  name: string;
}

export const GetBillingAccountsLocationsBucketsViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}" }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsLocationsBucketsViewsRequest>;

export type GetBillingAccountsLocationsBucketsViewsResponse = LogView;
export const GetBillingAccountsLocationsBucketsViewsResponse = LogView;

export type GetBillingAccountsLocationsBucketsViewsError = CommonErrors;

export const getBillingAccountsLocationsBucketsViews: API.OperationMethod<GetBillingAccountsLocationsBucketsViewsRequest, GetBillingAccountsLocationsBucketsViewsResponse, GetBillingAccountsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBillingAccountsLocationsBucketsViewsRequest,
  output: GetBillingAccountsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Creates a view over log entries in a log bucket. A bucket may contain a maximum of 30 views. */
export interface CreateBillingAccountsLocationsBucketsViewsRequest {
  /** Required. The bucket in which to create the view `"projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"` For example:"projects/my-project/locations/global/buckets/my-bucket" */
  parent: string;
  /** Required. A client-assigned identifier such as "my-view". Identifiers are limited to 100 characters and can include only letters, digits, underscores, and hyphens. */
  viewId?: string;
  /** Request body */
  body?: LogView;
}

export const CreateBillingAccountsLocationsBucketsViewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  viewId: Schema.optional(Schema.String).pipe(T.HttpQuery("viewId")),
  body: Schema.optional(LogView).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets/{bucketsId}/views", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBillingAccountsLocationsBucketsViewsRequest>;

export type CreateBillingAccountsLocationsBucketsViewsResponse = LogView;
export const CreateBillingAccountsLocationsBucketsViewsResponse = LogView;

export type CreateBillingAccountsLocationsBucketsViewsError = CommonErrors;

export const createBillingAccountsLocationsBucketsViews: API.OperationMethod<CreateBillingAccountsLocationsBucketsViewsRequest, CreateBillingAccountsLocationsBucketsViewsResponse, CreateBillingAccountsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBillingAccountsLocationsBucketsViewsRequest,
  output: CreateBillingAccountsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Updates a view on a log bucket. This method replaces the value of the filter field from the existing view with the corresponding value from the new view. If an UNAVAILABLE error is returned, this indicates that system is not in a state where it can update the view. If this occurs, please try again in a few minutes. */
export interface PatchBillingAccountsLocationsBucketsViewsRequest {
  /** Required. The full resource name of the view to update "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" */
  name: string;
  /** Optional. Field mask that specifies the fields in view that need an update. A field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter */
  updateMask?: string;
  /** Request body */
  body?: LogView;
}

export const PatchBillingAccountsLocationsBucketsViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogView).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchBillingAccountsLocationsBucketsViewsRequest>;

export type PatchBillingAccountsLocationsBucketsViewsResponse = LogView;
export const PatchBillingAccountsLocationsBucketsViewsResponse = LogView;

export type PatchBillingAccountsLocationsBucketsViewsError = CommonErrors;

export const patchBillingAccountsLocationsBucketsViews: API.OperationMethod<PatchBillingAccountsLocationsBucketsViewsRequest, PatchBillingAccountsLocationsBucketsViewsResponse, PatchBillingAccountsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchBillingAccountsLocationsBucketsViewsRequest,
  output: PatchBillingAccountsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Deletes a view on a log bucket. If an UNAVAILABLE error is returned, this indicates that system is not in a state where it can delete the view. If this occurs, please try again in a few minutes. */
export interface DeleteBillingAccountsLocationsBucketsViewsRequest {
  /** Required. The full resource name of the view to delete: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" */
  name: string;
}

export const DeleteBillingAccountsLocationsBucketsViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteBillingAccountsLocationsBucketsViewsRequest>;

export type DeleteBillingAccountsLocationsBucketsViewsResponse = Empty;
export const DeleteBillingAccountsLocationsBucketsViewsResponse = Empty;

export type DeleteBillingAccountsLocationsBucketsViewsError = CommonErrors;

export const deleteBillingAccountsLocationsBucketsViews: API.OperationMethod<DeleteBillingAccountsLocationsBucketsViewsRequest, DeleteBillingAccountsLocationsBucketsViewsResponse, DeleteBillingAccountsLocationsBucketsViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteBillingAccountsLocationsBucketsViewsRequest,
  output: DeleteBillingAccountsLocationsBucketsViewsResponse,
  errors: [],
}));

/** Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed. */
export interface ListBillingAccountsLocationsBucketsViewsLogsRequest {
  /** Required. The resource name to list logs for: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID] */
  parent: string;
  /** Optional. List of resource names to list logs for: projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To support legacy queries, it could also be: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]The resource name in the parent field is added to this list. */
  resourceNames?: string[];
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ListBillingAccountsLocationsBucketsViewsLogsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  resourceNames: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("resourceNames")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets/{bucketsId}/views/{viewsId}/logs" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsLocationsBucketsViewsLogsRequest>;

export type ListBillingAccountsLocationsBucketsViewsLogsResponse = ListLogsResponse;
export const ListBillingAccountsLocationsBucketsViewsLogsResponse = ListLogsResponse;

export type ListBillingAccountsLocationsBucketsViewsLogsError = CommonErrors;

export const listBillingAccountsLocationsBucketsViewsLogs = API.makePaginated(() => ({
  input: ListBillingAccountsLocationsBucketsViewsLogsRequest,
  output: ListBillingAccountsLocationsBucketsViewsLogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists links. */
export interface ListBillingAccountsLocationsBucketsLinksRequest {
  /** Required. The parent resource whose links are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. */
  pageSize?: number;
}

export const ListBillingAccountsLocationsBucketsLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets/{bucketsId}/links" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsLocationsBucketsLinksRequest>;

export type ListBillingAccountsLocationsBucketsLinksResponse = ListLinksResponse;
export const ListBillingAccountsLocationsBucketsLinksResponse = ListLinksResponse;

export type ListBillingAccountsLocationsBucketsLinksError = CommonErrors;

export const listBillingAccountsLocationsBucketsLinks = API.makePaginated(() => ({
  input: ListBillingAccountsLocationsBucketsLinksRequest,
  output: ListBillingAccountsLocationsBucketsLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a link. */
export interface GetBillingAccountsLocationsBucketsLinksRequest {
  /** Required. The resource name of the link: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" */
  name: string;
}

export const GetBillingAccountsLocationsBucketsLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets/{bucketsId}/links/{linksId}" }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsLocationsBucketsLinksRequest>;

export type GetBillingAccountsLocationsBucketsLinksResponse = Link;
export const GetBillingAccountsLocationsBucketsLinksResponse = Link;

export type GetBillingAccountsLocationsBucketsLinksError = CommonErrors;

export const getBillingAccountsLocationsBucketsLinks: API.OperationMethod<GetBillingAccountsLocationsBucketsLinksRequest, GetBillingAccountsLocationsBucketsLinksResponse, GetBillingAccountsLocationsBucketsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBillingAccountsLocationsBucketsLinksRequest,
  output: GetBillingAccountsLocationsBucketsLinksResponse,
  errors: [],
}));

/** Asynchronously creates a linked dataset in BigQuery which makes it possible to use BigQuery to read the logs stored in the log bucket. A log bucket may currently only contain one link. */
export interface CreateBillingAccountsLocationsBucketsLinksRequest {
  /** Required. The full resource name of the bucket to create a link for. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" */
  parent: string;
  /** Required. The ID to use for the link. The link_id can have up to 100 characters. A valid link_id must only have alphanumeric characters and underscores within it. */
  linkId?: string;
  /** Request body */
  body?: Link;
}

export const CreateBillingAccountsLocationsBucketsLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  linkId: Schema.optional(Schema.String).pipe(T.HttpQuery("linkId")),
  body: Schema.optional(Link).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets/{bucketsId}/links", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBillingAccountsLocationsBucketsLinksRequest>;

export type CreateBillingAccountsLocationsBucketsLinksResponse = Operation;
export const CreateBillingAccountsLocationsBucketsLinksResponse = Operation;

export type CreateBillingAccountsLocationsBucketsLinksError = CommonErrors;

export const createBillingAccountsLocationsBucketsLinks: API.OperationMethod<CreateBillingAccountsLocationsBucketsLinksRequest, CreateBillingAccountsLocationsBucketsLinksResponse, CreateBillingAccountsLocationsBucketsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBillingAccountsLocationsBucketsLinksRequest,
  output: CreateBillingAccountsLocationsBucketsLinksResponse,
  errors: [],
}));

/** Deletes a link. This will also delete the corresponding BigQuery linked dataset. */
export interface DeleteBillingAccountsLocationsBucketsLinksRequest {
  /** Required. The full resource name of the link to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]" */
  name: string;
}

export const DeleteBillingAccountsLocationsBucketsLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/buckets/{bucketsId}/links/{linksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteBillingAccountsLocationsBucketsLinksRequest>;

export type DeleteBillingAccountsLocationsBucketsLinksResponse = Operation;
export const DeleteBillingAccountsLocationsBucketsLinksResponse = Operation;

export type DeleteBillingAccountsLocationsBucketsLinksError = CommonErrors;

export const deleteBillingAccountsLocationsBucketsLinks: API.OperationMethod<DeleteBillingAccountsLocationsBucketsLinksRequest, DeleteBillingAccountsLocationsBucketsLinksResponse, DeleteBillingAccountsLocationsBucketsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteBillingAccountsLocationsBucketsLinksRequest,
  output: DeleteBillingAccountsLocationsBucketsLinksResponse,
  errors: [],
}));

/** Lists the SavedQueries that were created by the user making the request. */
export interface ListBillingAccountsLocationsSavedQueriesRequest {
  /** Required. The resource to which the listed queries belong. "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example: "projects/my-project/locations/us-central1" Note: The locations portion of the resource must be specified. To get a list of all saved queries, a wildcard character - can be used for LOCATION_ID, for example: "projects/my-project/locations/-" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. Specifies the type ("Logging" or "OpsAnalytics") and the visibility (PRIVATE or SHARED) of the saved queries to list. If provided, the filter must contain either the type function or a visibility token, or both. If both are chosen, they can be placed in any order, but they must be joined by the AND operator or the empty character.The two supported type function calls are: type("Logging") type("OpsAnalytics")The two supported visibility tokens are: visibility = PRIVATE visibility = SHAREDFor example:type("Logging") AND visibility = PRIVATE visibility=SHARED type("OpsAnalytics") type("OpsAnalytics)" visibility = PRIVATE visibility = SHARED */
  filter?: string;
}

export const ListBillingAccountsLocationsSavedQueriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/savedQueries" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsLocationsSavedQueriesRequest>;

export type ListBillingAccountsLocationsSavedQueriesResponse = ListSavedQueriesResponse;
export const ListBillingAccountsLocationsSavedQueriesResponse = ListSavedQueriesResponse;

export type ListBillingAccountsLocationsSavedQueriesError = CommonErrors;

export const listBillingAccountsLocationsSavedQueries = API.makePaginated(() => ({
  input: ListBillingAccountsLocationsSavedQueriesRequest,
  output: ListBillingAccountsLocationsSavedQueriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns all data associated with the requested query. */
export interface GetBillingAccountsLocationsSavedQueriesRequest {
  /** Required. The resource name of the saved query. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" For example: "projects/my-project/locations/global/savedQueries/my-saved-query" */
  name: string;
}

export const GetBillingAccountsLocationsSavedQueriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/savedQueries/{savedQueriesId}" }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsLocationsSavedQueriesRequest>;

export type GetBillingAccountsLocationsSavedQueriesResponse = SavedQuery;
export const GetBillingAccountsLocationsSavedQueriesResponse = SavedQuery;

export type GetBillingAccountsLocationsSavedQueriesError = CommonErrors;

export const getBillingAccountsLocationsSavedQueries: API.OperationMethod<GetBillingAccountsLocationsSavedQueriesRequest, GetBillingAccountsLocationsSavedQueriesResponse, GetBillingAccountsLocationsSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBillingAccountsLocationsSavedQueriesRequest,
  output: GetBillingAccountsLocationsSavedQueriesResponse,
  errors: [],
}));

/** Creates a new SavedQuery for the user making the request. */
export interface CreateBillingAccountsLocationsSavedQueriesRequest {
  /** Required. The parent resource in which to create the saved query: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example: "projects/my-project/locations/global" "organizations/123456789/locations/us-central1" */
  parent: string;
  /** Optional. The ID to use for the saved query, which will become the final component of the saved query's resource name.If the saved_query_id is not provided, the system will generate an alphanumeric ID.The saved_query_id is limited to 100 characters and can include only the following characters: upper and lower-case alphanumeric characters, underscores, hyphens, periods.First character has to be alphanumeric. */
  savedQueryId?: string;
  /** Request body */
  body?: SavedQuery;
}

export const CreateBillingAccountsLocationsSavedQueriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  savedQueryId: Schema.optional(Schema.String).pipe(T.HttpQuery("savedQueryId")),
  body: Schema.optional(SavedQuery).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/savedQueries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBillingAccountsLocationsSavedQueriesRequest>;

export type CreateBillingAccountsLocationsSavedQueriesResponse = SavedQuery;
export const CreateBillingAccountsLocationsSavedQueriesResponse = SavedQuery;

export type CreateBillingAccountsLocationsSavedQueriesError = CommonErrors;

export const createBillingAccountsLocationsSavedQueries: API.OperationMethod<CreateBillingAccountsLocationsSavedQueriesRequest, CreateBillingAccountsLocationsSavedQueriesResponse, CreateBillingAccountsLocationsSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBillingAccountsLocationsSavedQueriesRequest,
  output: CreateBillingAccountsLocationsSavedQueriesResponse,
  errors: [],
}));

/** Updates an existing SavedQuery. */
export interface PatchBillingAccountsLocationsSavedQueriesRequest {
  /** Output only. Resource name of the saved query.In the format: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" For a list of supported locations, see Supported Regions (https://docs.cloud.google.com/logging/docs/region-support#bucket-regions)After the saved query is created, the location cannot be changed.If the user doesn't provide a QUERY_ID, the system will generate an alphanumeric ID. */
  name: string;
  /** Required. A non-empty list of fields to change in the existing saved query. Fields are relative to the saved_query and new values for the fields are taken from the corresponding fields in the SavedQuery included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.To update all mutable fields, specify an update_mask of *.For example, to change the description and query filter text of a saved query, specify an update_mask of "description, query.filter". */
  updateMask?: string;
  /** Request body */
  body?: SavedQuery;
}

export const PatchBillingAccountsLocationsSavedQueriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SavedQuery).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/savedQueries/{savedQueriesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchBillingAccountsLocationsSavedQueriesRequest>;

export type PatchBillingAccountsLocationsSavedQueriesResponse = SavedQuery;
export const PatchBillingAccountsLocationsSavedQueriesResponse = SavedQuery;

export type PatchBillingAccountsLocationsSavedQueriesError = CommonErrors;

export const patchBillingAccountsLocationsSavedQueries: API.OperationMethod<PatchBillingAccountsLocationsSavedQueriesRequest, PatchBillingAccountsLocationsSavedQueriesResponse, PatchBillingAccountsLocationsSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchBillingAccountsLocationsSavedQueriesRequest,
  output: PatchBillingAccountsLocationsSavedQueriesResponse,
  errors: [],
}));

/** Deletes an existing SavedQuery that was created by the user making the request. */
export interface DeleteBillingAccountsLocationsSavedQueriesRequest {
  /** Required. The full resource name of the saved query to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/savedQueries/[QUERY_ID]" For example: "projects/my-project/locations/global/savedQueries/my-saved-query" */
  name: string;
}

export const DeleteBillingAccountsLocationsSavedQueriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/savedQueries/{savedQueriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteBillingAccountsLocationsSavedQueriesRequest>;

export type DeleteBillingAccountsLocationsSavedQueriesResponse = Empty;
export const DeleteBillingAccountsLocationsSavedQueriesResponse = Empty;

export type DeleteBillingAccountsLocationsSavedQueriesError = CommonErrors;

export const deleteBillingAccountsLocationsSavedQueries: API.OperationMethod<DeleteBillingAccountsLocationsSavedQueriesRequest, DeleteBillingAccountsLocationsSavedQueriesResponse, DeleteBillingAccountsLocationsSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteBillingAccountsLocationsSavedQueriesRequest,
  output: DeleteBillingAccountsLocationsSavedQueriesResponse,
  errors: [],
}));

/** Lists the RecentQueries that were created by the user making the request. */
export interface ListBillingAccountsLocationsRecentQueriesRequest {
  /** Required. The resource to which the listed queries belong. "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" For example:projects/my-project/locations/us-central1Note: The location portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all recent queries. */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. Specifies the type ("Logging" or "OpsAnalytics") of the recent queries to list. The only valid value for this field is one of the two allowable type function calls, which are the following: type("Logging") type("OpsAnalytics") */
  filter?: string;
}

export const ListBillingAccountsLocationsRecentQueriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/locations/{locationsId}/recentQueries" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsLocationsRecentQueriesRequest>;

export type ListBillingAccountsLocationsRecentQueriesResponse = ListRecentQueriesResponse;
export const ListBillingAccountsLocationsRecentQueriesResponse = ListRecentQueriesResponse;

export type ListBillingAccountsLocationsRecentQueriesError = CommonErrors;

export const listBillingAccountsLocationsRecentQueries = API.makePaginated(() => ({
  input: ListBillingAccountsLocationsRecentQueriesRequest,
  output: ListBillingAccountsLocationsRecentQueriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all the exclusions on the _Default sink in a parent resource. */
export interface ListBillingAccountsExclusionsRequest {
  /** Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
}

export const ListBillingAccountsExclusionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/exclusions" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsExclusionsRequest>;

export type ListBillingAccountsExclusionsResponse = ListExclusionsResponse;
export const ListBillingAccountsExclusionsResponse = ListExclusionsResponse;

export type ListBillingAccountsExclusionsError = CommonErrors;

export const listBillingAccountsExclusions = API.makePaginated(() => ({
  input: ListBillingAccountsExclusionsRequest,
  output: ListBillingAccountsExclusionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the description of an exclusion in the _Default sink. */
export interface GetBillingAccountsExclusionsRequest {
  /** Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion" */
  name: string;
}

export const GetBillingAccountsExclusionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/exclusions/{exclusionsId}" }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsExclusionsRequest>;

export type GetBillingAccountsExclusionsResponse = LogExclusion;
export const GetBillingAccountsExclusionsResponse = LogExclusion;

export type GetBillingAccountsExclusionsError = CommonErrors;

export const getBillingAccountsExclusions: API.OperationMethod<GetBillingAccountsExclusionsRequest, GetBillingAccountsExclusionsResponse, GetBillingAccountsExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBillingAccountsExclusionsRequest,
  output: GetBillingAccountsExclusionsResponse,
  errors: [],
}));

/** Creates a new exclusion in the _Default sink in a specified parent resource. Only log entries belonging to that resource can be excluded. You can have up to 10 exclusions in a resource. */
export interface CreateBillingAccountsExclusionsRequest {
  /** Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-logging-project" "organizations/123456789" */
  parent: string;
  /** Request body */
  body?: LogExclusion;
}

export const CreateBillingAccountsExclusionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(LogExclusion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/billingAccounts/{billingAccountsId}/exclusions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBillingAccountsExclusionsRequest>;

export type CreateBillingAccountsExclusionsResponse = LogExclusion;
export const CreateBillingAccountsExclusionsResponse = LogExclusion;

export type CreateBillingAccountsExclusionsError = CommonErrors;

export const createBillingAccountsExclusions: API.OperationMethod<CreateBillingAccountsExclusionsRequest, CreateBillingAccountsExclusionsResponse, CreateBillingAccountsExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBillingAccountsExclusionsRequest,
  output: CreateBillingAccountsExclusionsResponse,
  errors: [],
}));

/** Changes one or more properties of an existing exclusion in the _Default sink. */
export interface PatchBillingAccountsExclusionsRequest {
  /** Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion" */
  name: string;
  /** Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description". */
  updateMask?: string;
  /** Request body */
  body?: LogExclusion;
}

export const PatchBillingAccountsExclusionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogExclusion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/billingAccounts/{billingAccountsId}/exclusions/{exclusionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchBillingAccountsExclusionsRequest>;

export type PatchBillingAccountsExclusionsResponse = LogExclusion;
export const PatchBillingAccountsExclusionsResponse = LogExclusion;

export type PatchBillingAccountsExclusionsError = CommonErrors;

export const patchBillingAccountsExclusions: API.OperationMethod<PatchBillingAccountsExclusionsRequest, PatchBillingAccountsExclusionsResponse, PatchBillingAccountsExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchBillingAccountsExclusionsRequest,
  output: PatchBillingAccountsExclusionsResponse,
  errors: [],
}));

/** Deletes an exclusion in the _Default sink. */
export interface DeleteBillingAccountsExclusionsRequest {
  /** Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion" */
  name: string;
}

export const DeleteBillingAccountsExclusionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/billingAccounts/{billingAccountsId}/exclusions/{exclusionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteBillingAccountsExclusionsRequest>;

export type DeleteBillingAccountsExclusionsResponse = Empty;
export const DeleteBillingAccountsExclusionsResponse = Empty;

export type DeleteBillingAccountsExclusionsError = CommonErrors;

export const deleteBillingAccountsExclusions: API.OperationMethod<DeleteBillingAccountsExclusionsRequest, DeleteBillingAccountsExclusionsResponse, DeleteBillingAccountsExclusionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteBillingAccountsExclusionsRequest,
  output: DeleteBillingAccountsExclusionsResponse,
  errors: [],
}));

/** Lists sinks. */
export interface ListBillingAccountsSinksRequest {
  /** Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" */
  parent: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. A filter expression to constrain the sinks returned. Today, this only supports the following strings: '' 'in_scope("ALL")', 'in_scope("ANCESTOR")', 'in_scope("DEFAULT")'.Description of scopes below. ALL: Includes all of the sinks which can be returned in any other scope. ANCESTOR: Includes intercepting sinks owned by ancestor resources. DEFAULT: Includes sinks owned by parent.When the empty string is provided, then the filter 'in_scope("DEFAULT")' is applied. */
  filter?: string;
}

export const ListBillingAccountsSinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/sinks" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsSinksRequest>;

export type ListBillingAccountsSinksResponse = ListSinksResponse;
export const ListBillingAccountsSinksResponse = ListSinksResponse;

export type ListBillingAccountsSinksError = CommonErrors;

export const listBillingAccountsSinks = API.makePaginated(() => ({
  input: ListBillingAccountsSinksRequest,
  output: ListBillingAccountsSinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a sink. */
export interface GetBillingAccountsSinksRequest {
  /** Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
}

export const GetBillingAccountsSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/sinks/{sinksId}" }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsSinksRequest>;

export type GetBillingAccountsSinksResponse = LogSink;
export const GetBillingAccountsSinksResponse = LogSink;

export type GetBillingAccountsSinksError = CommonErrors;

export const getBillingAccountsSinks: API.OperationMethod<GetBillingAccountsSinksRequest, GetBillingAccountsSinksResponse, GetBillingAccountsSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBillingAccountsSinksRequest,
  output: GetBillingAccountsSinksResponse,
  errors: [],
}));

/** Creates a sink that exports specified log entries to a destination. The export begins upon ingress, unless the sink's writer_identity is not permitted to write to the destination. A sink can export log entries only from the resource owning the sink. */
export interface CreateBillingAccountsSinksRequest {
  /** Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-project" "organizations/123456789" */
  parent: string;
  /** Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Cloud Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) used by the sinks with the same parent. For more information, see writer_identity in LogSink. */
  uniqueWriterIdentity?: boolean;
  /** Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. */
  customWriterIdentity?: string;
  /** Request body */
  body?: LogSink;
}

export const CreateBillingAccountsSinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  uniqueWriterIdentity: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("uniqueWriterIdentity")),
  customWriterIdentity: Schema.optional(Schema.String).pipe(T.HttpQuery("customWriterIdentity")),
  body: Schema.optional(LogSink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/billingAccounts/{billingAccountsId}/sinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBillingAccountsSinksRequest>;

export type CreateBillingAccountsSinksResponse = LogSink;
export const CreateBillingAccountsSinksResponse = LogSink;

export type CreateBillingAccountsSinksError = CommonErrors;

export const createBillingAccountsSinks: API.OperationMethod<CreateBillingAccountsSinksRequest, CreateBillingAccountsSinksResponse, CreateBillingAccountsSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBillingAccountsSinksRequest,
  output: CreateBillingAccountsSinksResponse,
  errors: [],
}));

/** Updates a sink. This method replaces the values of the destination and filter fields of the existing sink with the corresponding values from the new sink.The updated sink might also have a new writer_identity; see the unique_writer_identity field. */
export interface UpdateBillingAccountsSinksRequest {
  /** Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
  /** Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) owned by Cloud Logging. It is an error if the old value is true and the new value is set to false or defaulted to false. */
  uniqueWriterIdentity?: boolean;
  /** Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. */
  customWriterIdentity?: string;
  /** Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:destination,filter,includeChildrenAt some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter */
  updateMask?: string;
  /** Request body */
  body?: LogSink;
}

export const UpdateBillingAccountsSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
  uniqueWriterIdentity: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("uniqueWriterIdentity")),
  customWriterIdentity: Schema.optional(Schema.String).pipe(T.HttpQuery("customWriterIdentity")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogSink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v2/billingAccounts/{billingAccountsId}/sinks/{sinksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateBillingAccountsSinksRequest>;

export type UpdateBillingAccountsSinksResponse = LogSink;
export const UpdateBillingAccountsSinksResponse = LogSink;

export type UpdateBillingAccountsSinksError = CommonErrors;

export const updateBillingAccountsSinks: API.OperationMethod<UpdateBillingAccountsSinksRequest, UpdateBillingAccountsSinksResponse, UpdateBillingAccountsSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateBillingAccountsSinksRequest,
  output: UpdateBillingAccountsSinksResponse,
  errors: [],
}));

/** Updates a sink. This method replaces the values of the destination and filter fields of the existing sink with the corresponding values from the new sink.The updated sink might also have a new writer_identity; see the unique_writer_identity field. */
export interface PatchBillingAccountsSinksRequest {
  /** Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
  /** Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) owned by Cloud Logging. It is an error if the old value is true and the new value is set to false or defaulted to false. */
  uniqueWriterIdentity?: boolean;
  /** Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. */
  customWriterIdentity?: string;
  /** Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:destination,filter,includeChildrenAt some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter */
  updateMask?: string;
  /** Request body */
  body?: LogSink;
}

export const PatchBillingAccountsSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
  uniqueWriterIdentity: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("uniqueWriterIdentity")),
  customWriterIdentity: Schema.optional(Schema.String).pipe(T.HttpQuery("customWriterIdentity")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LogSink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/billingAccounts/{billingAccountsId}/sinks/{sinksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchBillingAccountsSinksRequest>;

export type PatchBillingAccountsSinksResponse = LogSink;
export const PatchBillingAccountsSinksResponse = LogSink;

export type PatchBillingAccountsSinksError = CommonErrors;

export const patchBillingAccountsSinks: API.OperationMethod<PatchBillingAccountsSinksRequest, PatchBillingAccountsSinksResponse, PatchBillingAccountsSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchBillingAccountsSinksRequest,
  output: PatchBillingAccountsSinksResponse,
  errors: [],
}));

/** Deletes a sink. If the sink has a unique writer_identity, then that service account is also deleted. */
export interface DeleteBillingAccountsSinksRequest {
  /** Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink" */
  sinkName: string;
}

export const DeleteBillingAccountsSinksRequest = Schema.Struct({
  sinkName: Schema.String.pipe(T.HttpPath("sinkName")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/billingAccounts/{billingAccountsId}/sinks/{sinksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteBillingAccountsSinksRequest>;

export type DeleteBillingAccountsSinksResponse = Empty;
export const DeleteBillingAccountsSinksResponse = Empty;

export type DeleteBillingAccountsSinksError = CommonErrors;

export const deleteBillingAccountsSinks: API.OperationMethod<DeleteBillingAccountsSinksRequest, DeleteBillingAccountsSinksResponse, DeleteBillingAccountsSinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteBillingAccountsSinksRequest,
  output: DeleteBillingAccountsSinksResponse,
  errors: [],
}));

/** Deletes all the log entries in a log for the global _Default Log Bucket. The log reappears if it receives new entries. Log entries written shortly before the delete operation might not be deleted. Entries received after the delete operation with a timestamp before the operation will be deleted. */
export interface DeleteBillingAccountsLogsRequest {
  /** Required. The resource name of the log to delete: projects/[PROJECT_ID]/logs/[LOG_ID] organizations/[ORGANIZATION_ID]/logs/[LOG_ID] billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID] folders/[FOLDER_ID]/logs/[LOG_ID][LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/123/logs/cloudaudit.googleapis.com%2Factivity".For more information about log names, see LogEntry. */
  logName: string;
}

export const DeleteBillingAccountsLogsRequest = Schema.Struct({
  logName: Schema.String.pipe(T.HttpPath("logName")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/billingAccounts/{billingAccountsId}/logs/{logsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteBillingAccountsLogsRequest>;

export type DeleteBillingAccountsLogsResponse = Empty;
export const DeleteBillingAccountsLogsResponse = Empty;

export type DeleteBillingAccountsLogsError = CommonErrors;

export const deleteBillingAccountsLogs: API.OperationMethod<DeleteBillingAccountsLogsRequest, DeleteBillingAccountsLogsResponse, DeleteBillingAccountsLogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteBillingAccountsLogsRequest,
  output: DeleteBillingAccountsLogsResponse,
  errors: [],
}));

/** Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed. */
export interface ListBillingAccountsLogsRequest {
  /** Required. The resource name to list logs for: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID] */
  parent: string;
  /** Optional. List of resource names to list logs for: projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To support legacy queries, it could also be: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]The resource name in the parent field is added to this list. */
  resourceNames?: string[];
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ListBillingAccountsLogsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  resourceNames: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("resourceNames")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/billingAccounts/{billingAccountsId}/logs" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsLogsRequest>;

export type ListBillingAccountsLogsResponse = ListLogsResponse;
export const ListBillingAccountsLogsResponse = ListLogsResponse;

export type ListBillingAccountsLogsError = CommonErrors;

export const listBillingAccountsLogs = API.makePaginated(() => ({
  input: ListBillingAccountsLogsRequest,
  output: ListBillingAccountsLogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Copies a set of log entries from a log bucket to a Cloud Storage bucket. */
export interface CopyEntriesRequest {
  /** Request body */
  body?: CopyLogEntriesRequest;
}

export const CopyEntriesRequest = Schema.Struct({
  body: Schema.optional(CopyLogEntriesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/entries:copy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CopyEntriesRequest>;

export type CopyEntriesResponse = Operation;
export const CopyEntriesResponse = Operation;

export type CopyEntriesError = CommonErrors;

export const copyEntries: API.OperationMethod<CopyEntriesRequest, CopyEntriesResponse, CopyEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CopyEntriesRequest,
  output: CopyEntriesResponse,
  errors: [],
}));

/** Writes log entries to Logging. This API method is the only way to send log entries to Logging. This method is used, directly or indirectly, by the Logging agent (fluentd) and all logging libraries configured to use Logging. A single request may contain log entries for a maximum of 1000 different resource names (projects, organizations, billing accounts or folders), where the resource name for a log entry is determined from its logName field. */
export interface WriteEntriesRequest {
  /** Request body */
  body?: WriteLogEntriesRequest;
}

export const WriteEntriesRequest = Schema.Struct({
  body: Schema.optional(WriteLogEntriesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/entries:write", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WriteEntriesRequest>;

export type WriteEntriesResponse = WriteLogEntriesResponse;
export const WriteEntriesResponse = WriteLogEntriesResponse;

export type WriteEntriesError = CommonErrors;

export const writeEntries: API.OperationMethod<WriteEntriesRequest, WriteEntriesResponse, WriteEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WriteEntriesRequest,
  output: WriteEntriesResponse,
  errors: [],
}));

/** Lists log entries. Use this method to retrieve log entries that originated from a project/folder/organization/billing account. For ways to export log entries, see Exporting Logs (https://cloud.google.com/logging/docs/export). */
export interface ListEntriesRequest {
  /** Request body */
  body?: ListLogEntriesRequest;
}

export const ListEntriesRequest = Schema.Struct({
  body: Schema.optional(ListLogEntriesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/entries:list", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ListEntriesRequest>;

export type ListEntriesResponse = ListLogEntriesResponse;
export const ListEntriesResponse = ListLogEntriesResponse;

export type ListEntriesError = CommonErrors;

export const listEntries: API.OperationMethod<ListEntriesRequest, ListEntriesResponse, ListEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListEntriesRequest,
  output: ListEntriesResponse,
  errors: [],
}));

/** Streaming read of log entries as they are received. Until the stream is terminated, it will continue reading logs. */
export interface TailEntriesRequest {
  /** Request body */
  body?: TailLogEntriesRequest;
}

export const TailEntriesRequest = Schema.Struct({
  body: Schema.optional(TailLogEntriesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/entries:tail", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TailEntriesRequest>;

export type TailEntriesResponse = TailLogEntriesResponse;
export const TailEntriesResponse = TailLogEntriesResponse;

export type TailEntriesError = CommonErrors;

export const tailEntries: API.OperationMethod<TailEntriesRequest, TailEntriesResponse, TailEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TailEntriesRequest,
  output: TailEntriesResponse,
  errors: [],
}));

/** Deletes all the log entries in a log for the global _Default Log Bucket. The log reappears if it receives new entries. Log entries written shortly before the delete operation might not be deleted. Entries received after the delete operation with a timestamp before the operation will be deleted. */
export interface DeleteLogsRequest {
  /** Required. The resource name of the log to delete: projects/[PROJECT_ID]/logs/[LOG_ID] organizations/[ORGANIZATION_ID]/logs/[LOG_ID] billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID] folders/[FOLDER_ID]/logs/[LOG_ID][LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/123/logs/cloudaudit.googleapis.com%2Factivity".For more information about log names, see LogEntry. */
  logName: string;
}

export const DeleteLogsRequest = Schema.Struct({
  logName: Schema.String.pipe(T.HttpPath("logName")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/{v2Id}/{v2Id1}/logs/{logsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteLogsRequest>;

export type DeleteLogsResponse = Empty;
export const DeleteLogsResponse = Empty;

export type DeleteLogsError = CommonErrors;

export const deleteLogs: API.OperationMethod<DeleteLogsRequest, DeleteLogsResponse, DeleteLogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteLogsRequest,
  output: DeleteLogsResponse,
  errors: [],
}));

/** Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed. */
export interface ListLogsRequest {
  /** Required. The resource name to list logs for: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID] */
  parent: string;
  /** Optional. List of resource names to list logs for: projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID] folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To support legacy queries, it could also be: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]The resource name in the parent field is added to this list. */
  resourceNames?: string[];
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ListLogsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  resourceNames: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("resourceNames")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/{v2Id}/{v2Id1}/logs" }),
  svc,
) as unknown as Schema.Schema<ListLogsRequest>;

export type ListLogsResponse_Op = ListLogsResponse;
export const ListLogsResponse_Op = ListLogsResponse;

export type ListLogsError = CommonErrors;

export const listLogs = API.makePaginated(() => ({
  input: ListLogsRequest,
  output: ListLogsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the descriptors for monitored resource types used by Logging. */
export interface ListMonitoredResourceDescriptorsRequest {
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
}

export const ListMonitoredResourceDescriptorsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/monitoredResourceDescriptors" }),
  svc,
) as unknown as Schema.Schema<ListMonitoredResourceDescriptorsRequest>;

export type ListMonitoredResourceDescriptorsResponse_Op = ListMonitoredResourceDescriptorsResponse;
export const ListMonitoredResourceDescriptorsResponse_Op = ListMonitoredResourceDescriptorsResponse;

export type ListMonitoredResourceDescriptorsError = CommonErrors;

export const listMonitoredResourceDescriptors = API.makePaginated(() => ({
  input: ListMonitoredResourceDescriptorsRequest,
  output: ListMonitoredResourceDescriptorsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

