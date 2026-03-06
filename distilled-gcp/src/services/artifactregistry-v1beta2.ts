// ==========================================================================
// Artifact Registry API (artifactregistry v1beta2)
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
  name: "artifactregistry",
  version: "v1beta2",
  rootUrl: "https://artifactregistry.googleapis.com/",
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

export interface ImportAptArtifactsGcsSource {
  /** Cloud Storage paths URI (e.g., gs://my_bucket//my_object). */
  uris?: Array<string>;
  /** Supports URI wildcards for matching multiple objects from a single URI. */
  useWildcards?: boolean;
}

export const ImportAptArtifactsGcsSource: Schema.Schema<ImportAptArtifactsGcsSource> = Schema.suspend(() => Schema.Struct({
  uris: Schema.optional(Schema.Array(Schema.String)),
  useWildcards: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ImportAptArtifactsGcsSource" }) as any as Schema.Schema<ImportAptArtifactsGcsSource>;

export interface ImportAptArtifactsRequest {
  /** Google Cloud Storage location where input content is located. */
  gcsSource?: ImportAptArtifactsGcsSource;
}

export const ImportAptArtifactsRequest: Schema.Schema<ImportAptArtifactsRequest> = Schema.suspend(() => Schema.Struct({
  gcsSource: Schema.optional(ImportAptArtifactsGcsSource),
})).annotate({ identifier: "ImportAptArtifactsRequest" }) as any as Schema.Schema<ImportAptArtifactsRequest>;

export interface ImportYumArtifactsGcsSource {
  /** Cloud Storage paths URI (e.g., gs://my_bucket//my_object). */
  uris?: Array<string>;
  /** Supports URI wildcards for matching multiple objects from a single URI. */
  useWildcards?: boolean;
}

export const ImportYumArtifactsGcsSource: Schema.Schema<ImportYumArtifactsGcsSource> = Schema.suspend(() => Schema.Struct({
  uris: Schema.optional(Schema.Array(Schema.String)),
  useWildcards: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ImportYumArtifactsGcsSource" }) as any as Schema.Schema<ImportYumArtifactsGcsSource>;

export interface ImportYumArtifactsRequest {
  /** Google Cloud Storage location where input content is located. */
  gcsSource?: ImportYumArtifactsGcsSource;
}

export const ImportYumArtifactsRequest: Schema.Schema<ImportYumArtifactsRequest> = Schema.suspend(() => Schema.Struct({
  gcsSource: Schema.optional(ImportYumArtifactsGcsSource),
})).annotate({ identifier: "ImportYumArtifactsRequest" }) as any as Schema.Schema<ImportYumArtifactsRequest>;

export interface UploadAptArtifactRequest {
}

export const UploadAptArtifactRequest: Schema.Schema<UploadAptArtifactRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UploadAptArtifactRequest" }) as any as Schema.Schema<UploadAptArtifactRequest>;

export interface UploadAptArtifactMediaResponse {
  /** Operation to be returned to the user. */
  operation?: Operation;
}

export const UploadAptArtifactMediaResponse: Schema.Schema<UploadAptArtifactMediaResponse> = Schema.suspend(() => Schema.Struct({
  operation: Schema.optional(Operation),
})).annotate({ identifier: "UploadAptArtifactMediaResponse" }) as any as Schema.Schema<UploadAptArtifactMediaResponse>;

export interface UploadYumArtifactRequest {
}

export const UploadYumArtifactRequest: Schema.Schema<UploadYumArtifactRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UploadYumArtifactRequest" }) as any as Schema.Schema<UploadYumArtifactRequest>;

export interface UploadYumArtifactMediaResponse {
  /** Operation to be returned to the user. */
  operation?: Operation;
}

export const UploadYumArtifactMediaResponse: Schema.Schema<UploadYumArtifactMediaResponse> = Schema.suspend(() => Schema.Struct({
  operation: Schema.optional(Operation),
})).annotate({ identifier: "UploadYumArtifactMediaResponse" }) as any as Schema.Schema<UploadYumArtifactMediaResponse>;

export interface MavenRepositoryConfig {
  /** The repository with this flag will allow publishing the same snapshot versions. */
  allowSnapshotOverwrites?: boolean;
  /** Version policy defines the versions that the registry will accept. */
  versionPolicy?: "VERSION_POLICY_UNSPECIFIED" | "RELEASE" | "SNAPSHOT" | (string & {});
}

export const MavenRepositoryConfig: Schema.Schema<MavenRepositoryConfig> = Schema.suspend(() => Schema.Struct({
  allowSnapshotOverwrites: Schema.optional(Schema.Boolean),
  versionPolicy: Schema.optional(Schema.String),
})).annotate({ identifier: "MavenRepositoryConfig" }) as any as Schema.Schema<MavenRepositoryConfig>;

export interface Repository {
  /** Maven repository config contains repository level configuration for the repositories of maven type. */
  mavenConfig?: MavenRepositoryConfig;
  /** The name of the repository, for example: `projects/p1/locations/us-central1/repositories/repo1`. For each location in a project, repository names must be unique. */
  name?: string;
  /** Optional. The format of packages that are stored in the repository. */
  format?: "FORMAT_UNSPECIFIED" | "DOCKER" | "MAVEN" | "NPM" | "APT" | "YUM" | "GOOGET" | "PYTHON" | (string & {});
  /** The user-provided description of the repository. */
  description?: string;
  /** Labels with user-defined metadata. This field may contain up to 64 entries. Label keys and values may be no longer than 63 characters. Label keys must begin with a lowercase letter and may only contain lowercase letters, numeric characters, underscores, and dashes. */
  labels?: Record<string, string>;
  /** Output only. The time when the repository was created. */
  createTime?: string;
  /** Output only. The time when the repository was last updated. */
  updateTime?: string;
  /** The Cloud KMS resource name of the customer managed encryption key that's used to encrypt the contents of the Repository. Has the form: `projects/my-project/locations/my-region/keyRings/my-kr/cryptoKeys/my-key`. This value may not be changed after the Repository has been created. */
  kmsKeyName?: string;
  /** Output only. The size, in bytes, of all artifact storage in this repository. Repositories that are generally available or in public preview use this to calculate storage costs. */
  sizeBytes?: string;
  /** Output only. Whether or not this repository satisfies PZS. */
  satisfiesPzs?: boolean;
  /** Output only. Whether or not this repository satisfies PZI. */
  satisfiesPzi?: boolean;
}

export const Repository: Schema.Schema<Repository> = Schema.suspend(() => Schema.Struct({
  mavenConfig: Schema.optional(MavenRepositoryConfig),
  name: Schema.optional(Schema.String),
  format: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  kmsKeyName: Schema.optional(Schema.String),
  sizeBytes: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Repository" }) as any as Schema.Schema<Repository>;

export interface ListRepositoriesResponse {
  /** The repositories returned. */
  repositories?: Array<Repository>;
  /** The token to retrieve the next page of repositories, or empty if there are no more repositories to return. */
  nextPageToken?: string;
}

export const ListRepositoriesResponse: Schema.Schema<ListRepositoriesResponse> = Schema.suspend(() => Schema.Struct({
  repositories: Schema.optional(Schema.Array(Repository)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListRepositoriesResponse" }) as any as Schema.Schema<ListRepositoriesResponse>;

export interface Package {
  /** The name of the package, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1`. If the package ID part contains slashes, the slashes are escaped. */
  name?: string;
  /** The display name of the package. */
  displayName?: string;
  /** The time when the package was created. */
  createTime?: string;
  /** The time when the package was last updated. This includes publishing a new version of the package. */
  updateTime?: string;
  /** Optional. Client specified annotations. */
  annotations?: Record<string, string>;
}

export const Package: Schema.Schema<Package> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Package" }) as any as Schema.Schema<Package>;

export interface ListPackagesResponse {
  /** The packages returned. */
  packages?: Array<Package>;
  /** The token to retrieve the next page of packages, or empty if there are no more packages to return. */
  nextPageToken?: string;
}

export const ListPackagesResponse: Schema.Schema<ListPackagesResponse> = Schema.suspend(() => Schema.Struct({
  packages: Schema.optional(Schema.Array(Package)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPackagesResponse" }) as any as Schema.Schema<ListPackagesResponse>;

export interface Tag {
  /** The name of the tag, for example: "projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/tags/tag1". If the package part contains slashes, the slashes are escaped. The tag part can only have characters in [a-zA-Z0-9\-._~:@], anything else must be URL encoded. */
  name?: string;
  /** The name of the version the tag refers to, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/versions/sha256:5243811` If the package or version ID parts contain slashes, the slashes are escaped. */
  version?: string;
}

export const Tag: Schema.Schema<Tag> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "Tag" }) as any as Schema.Schema<Tag>;

export interface Version {
  /** The name of the version, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/versions/art1`. If the package or version ID parts contain slashes, the slashes are escaped. */
  name?: string;
  /** Optional. Description of the version, as specified in its metadata. */
  description?: string;
  /** The time when the version was created. */
  createTime?: string;
  /** The time when the version was last updated. */
  updateTime?: string;
  /** Output only. A list of related tags. Will contain up to 100 tags that reference this version. */
  relatedTags?: Array<Tag>;
  /** Output only. Repository-specific Metadata stored against this version. The fields returned are defined by the underlying repository-specific resource. Currently, the resources could be: DockerImage MavenArtifact */
  metadata?: Record<string, unknown>;
}

export const Version: Schema.Schema<Version> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  relatedTags: Schema.optional(Schema.Array(Tag)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Version" }) as any as Schema.Schema<Version>;

export interface ListVersionsResponse {
  /** The versions returned. */
  versions?: Array<Version>;
  /** The token to retrieve the next page of versions, or empty if there are no more versions to return. */
  nextPageToken?: string;
}

export const ListVersionsResponse: Schema.Schema<ListVersionsResponse> = Schema.suspend(() => Schema.Struct({
  versions: Schema.optional(Schema.Array(Version)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListVersionsResponse" }) as any as Schema.Schema<ListVersionsResponse>;

export interface Hash {
  /** The algorithm used to compute the hash value. */
  type?: "HASH_TYPE_UNSPECIFIED" | "SHA256" | "MD5" | "DIRSUM_SHA256" | (string & {});
  /** The hash value. */
  value?: string;
}

export const Hash: Schema.Schema<Hash> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "Hash" }) as any as Schema.Schema<Hash>;

export interface GoogleDevtoolsArtifactregistryV1beta2File {
  /** The name of the file, for example: `projects/p1/locations/us-central1/repositories/repo1/files/a%2Fb%2Fc.txt`. If the file ID part contains slashes, they are escaped. */
  name?: string;
  /** The size of the File in bytes. */
  sizeBytes?: string;
  /** The hashes of the file content. */
  hashes?: Array<Hash>;
  /** Output only. The time when the File was created. */
  createTime?: string;
  /** Output only. The time when the File was last updated. */
  updateTime?: string;
  /** The name of the Package or Version that owns this file, if any. */
  owner?: string;
}

export const GoogleDevtoolsArtifactregistryV1beta2File: Schema.Schema<GoogleDevtoolsArtifactregistryV1beta2File> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  sizeBytes: Schema.optional(Schema.String),
  hashes: Schema.optional(Schema.Array(Hash)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  owner: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsArtifactregistryV1beta2File" }) as any as Schema.Schema<GoogleDevtoolsArtifactregistryV1beta2File>;

export interface ListFilesResponse {
  /** The files returned. */
  files?: Array<GoogleDevtoolsArtifactregistryV1beta2File>;
  /** The token to retrieve the next page of files, or empty if there are no more files to return. */
  nextPageToken?: string;
}

export const ListFilesResponse: Schema.Schema<ListFilesResponse> = Schema.suspend(() => Schema.Struct({
  files: Schema.optional(Schema.Array(GoogleDevtoolsArtifactregistryV1beta2File)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListFilesResponse" }) as any as Schema.Schema<ListFilesResponse>;

export interface DownloadFileResponse {
}

export const DownloadFileResponse: Schema.Schema<DownloadFileResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DownloadFileResponse" }) as any as Schema.Schema<DownloadFileResponse>;

export interface ListTagsResponse {
  /** The tags returned. */
  tags?: Array<Tag>;
  /** The token to retrieve the next page of tags, or empty if there are no more tags to return. */
  nextPageToken?: string;
}

export const ListTagsResponse: Schema.Schema<ListTagsResponse> = Schema.suspend(() => Schema.Struct({
  tags: Schema.optional(Schema.Array(Tag)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTagsResponse" }) as any as Schema.Schema<ListTagsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

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

export interface ProjectSettings {
  /** The name of the project's settings. Always of the form: projects/{project-id}/projectSettings In update request: never set In response: always set */
  name?: string;
  /** The redirection state of the legacy repositories in this project. */
  legacyRedirectionState?: "REDIRECTION_STATE_UNSPECIFIED" | "REDIRECTION_FROM_GCR_IO_DISABLED" | "REDIRECTION_FROM_GCR_IO_ENABLED" | "REDIRECTION_FROM_GCR_IO_FINALIZED" | "REDIRECTION_FROM_GCR_IO_ENABLED_AND_COPYING" | "REDIRECTION_FROM_GCR_IO_PARTIAL_AND_COPYING" | (string & {});
  /** The percentage of pull traffic to redirect from GCR to AR when using partial redirection. */
  pullPercent?: number;
}

export const ProjectSettings: Schema.Schema<ProjectSettings> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  legacyRedirectionState: Schema.optional(Schema.String),
  pullPercent: Schema.optional(Schema.Number),
})).annotate({ identifier: "ProjectSettings" }) as any as Schema.Schema<ProjectSettings>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
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

export interface AptArtifact {
  /** Output only. The Artifact Registry resource name of the artifact. */
  name?: string;
  /** Output only. The Apt package name of the artifact. */
  packageName?: string;
  /** Output only. An artifact is a binary or source package. */
  packageType?: "PACKAGE_TYPE_UNSPECIFIED" | "BINARY" | "SOURCE" | (string & {});
  /** Output only. Operating system architecture of the artifact. */
  architecture?: string;
  /** Output only. Repository component of the artifact. */
  component?: string;
  /** Output only. Contents of the artifact's control metadata file. */
  controlFile?: string;
}

export const AptArtifact: Schema.Schema<AptArtifact> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  packageType: Schema.optional(Schema.String),
  architecture: Schema.optional(Schema.String),
  component: Schema.optional(Schema.String),
  controlFile: Schema.optional(Schema.String),
})).annotate({ identifier: "AptArtifact" }) as any as Schema.Schema<AptArtifact>;

export interface ImportAptArtifactsErrorInfo {
  /** Google Cloud Storage location requested. */
  gcsSource?: ImportAptArtifactsGcsSource;
  /** The detailed error status. */
  error?: Status;
}

export const ImportAptArtifactsErrorInfo: Schema.Schema<ImportAptArtifactsErrorInfo> = Schema.suspend(() => Schema.Struct({
  gcsSource: Schema.optional(ImportAptArtifactsGcsSource),
  error: Schema.optional(Status),
})).annotate({ identifier: "ImportAptArtifactsErrorInfo" }) as any as Schema.Schema<ImportAptArtifactsErrorInfo>;

export interface ImportAptArtifactsResponse {
  /** The Apt artifacts imported. */
  aptArtifacts?: Array<AptArtifact>;
  /** Detailed error info for packages that were not imported. */
  errors?: Array<ImportAptArtifactsErrorInfo>;
}

export const ImportAptArtifactsResponse: Schema.Schema<ImportAptArtifactsResponse> = Schema.suspend(() => Schema.Struct({
  aptArtifacts: Schema.optional(Schema.Array(AptArtifact)),
  errors: Schema.optional(Schema.Array(ImportAptArtifactsErrorInfo)),
})).annotate({ identifier: "ImportAptArtifactsResponse" }) as any as Schema.Schema<ImportAptArtifactsResponse>;

export interface YumArtifact {
  /** Output only. The Artifact Registry resource name of the artifact. */
  name?: string;
  /** Output only. The yum package name of the artifact. */
  packageName?: string;
  /** Output only. An artifact is a binary or source package. */
  packageType?: "PACKAGE_TYPE_UNSPECIFIED" | "BINARY" | "SOURCE" | (string & {});
  /** Output only. Operating system architecture of the artifact. */
  architecture?: string;
}

export const YumArtifact: Schema.Schema<YumArtifact> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  packageType: Schema.optional(Schema.String),
  architecture: Schema.optional(Schema.String),
})).annotate({ identifier: "YumArtifact" }) as any as Schema.Schema<YumArtifact>;

export interface ImportYumArtifactsErrorInfo {
  /** Google Cloud Storage location requested. */
  gcsSource?: ImportYumArtifactsGcsSource;
  /** The detailed error status. */
  error?: Status;
}

export const ImportYumArtifactsErrorInfo: Schema.Schema<ImportYumArtifactsErrorInfo> = Schema.suspend(() => Schema.Struct({
  gcsSource: Schema.optional(ImportYumArtifactsGcsSource),
  error: Schema.optional(Status),
})).annotate({ identifier: "ImportYumArtifactsErrorInfo" }) as any as Schema.Schema<ImportYumArtifactsErrorInfo>;

export interface ImportYumArtifactsResponse {
  /** The yum artifacts imported. */
  yumArtifacts?: Array<YumArtifact>;
  /** Detailed error info for packages that were not imported. */
  errors?: Array<ImportYumArtifactsErrorInfo>;
}

export const ImportYumArtifactsResponse: Schema.Schema<ImportYumArtifactsResponse> = Schema.suspend(() => Schema.Struct({
  yumArtifacts: Schema.optional(Schema.Array(YumArtifact)),
  errors: Schema.optional(Schema.Array(ImportYumArtifactsErrorInfo)),
})).annotate({ identifier: "ImportYumArtifactsResponse" }) as any as Schema.Schema<ImportYumArtifactsResponse>;

export interface UploadAptArtifactResponse {
  /** The Apt artifacts updated. */
  aptArtifacts?: Array<AptArtifact>;
}

export const UploadAptArtifactResponse: Schema.Schema<UploadAptArtifactResponse> = Schema.suspend(() => Schema.Struct({
  aptArtifacts: Schema.optional(Schema.Array(AptArtifact)),
})).annotate({ identifier: "UploadAptArtifactResponse" }) as any as Schema.Schema<UploadAptArtifactResponse>;

export interface UploadYumArtifactResponse {
  /** The Yum artifacts updated. */
  yumArtifacts?: Array<YumArtifact>;
}

export const UploadYumArtifactResponse: Schema.Schema<UploadYumArtifactResponse> = Schema.suspend(() => Schema.Struct({
  yumArtifacts: Schema.optional(Schema.Array(YumArtifact)),
})).annotate({ identifier: "UploadYumArtifactResponse" }) as any as Schema.Schema<UploadYumArtifactResponse>;

export interface OperationMetadata {
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface ImportAptArtifactsMetadata {
}

export const ImportAptArtifactsMetadata: Schema.Schema<ImportAptArtifactsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ImportAptArtifactsMetadata" }) as any as Schema.Schema<ImportAptArtifactsMetadata>;

export interface ImportYumArtifactsMetadata {
}

export const ImportYumArtifactsMetadata: Schema.Schema<ImportYumArtifactsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ImportYumArtifactsMetadata" }) as any as Schema.Schema<ImportYumArtifactsMetadata>;

export interface UploadAptArtifactMetadata {
}

export const UploadAptArtifactMetadata: Schema.Schema<UploadAptArtifactMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UploadAptArtifactMetadata" }) as any as Schema.Schema<UploadAptArtifactMetadata>;

export interface UploadYumArtifactMetadata {
}

export const UploadYumArtifactMetadata: Schema.Schema<UploadYumArtifactMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UploadYumArtifactMetadata" }) as any as Schema.Schema<UploadYumArtifactMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetProjectSettingsProjectsRequest {
  /** Required. The name of the projectSettings resource. */
  name: string;
}

export const GetProjectSettingsProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/projectSettings" }),
  svc,
) as unknown as Schema.Schema<GetProjectSettingsProjectsRequest>;

export type GetProjectSettingsProjectsResponse = ProjectSettings;
export const GetProjectSettingsProjectsResponse = ProjectSettings;

export type GetProjectSettingsProjectsError = CommonErrors;

/** Retrieves the Settings for the Project. */
export const getProjectSettingsProjects: API.OperationMethod<GetProjectSettingsProjectsRequest, GetProjectSettingsProjectsResponse, GetProjectSettingsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectSettingsProjectsRequest,
  output: GetProjectSettingsProjectsResponse,
  errors: [],
}));

export interface UpdateProjectSettingsProjectsRequest {
  /** The name of the project's settings. Always of the form: projects/{project-id}/projectSettings In update request: never set In response: always set */
  name: string;
  /** Field mask to support partial updates. */
  updateMask?: string;
  /** Request body */
  body?: ProjectSettings;
}

export const UpdateProjectSettingsProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ProjectSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta2/projects/{projectsId}/projectSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectSettingsProjectsRequest>;

export type UpdateProjectSettingsProjectsResponse = ProjectSettings;
export const UpdateProjectSettingsProjectsResponse = ProjectSettings;

export type UpdateProjectSettingsProjectsError = CommonErrors;

/** Updates the Settings for the Project. */
export const updateProjectSettingsProjects: API.OperationMethod<UpdateProjectSettingsProjectsRequest, UpdateProjectSettingsProjectsResponse, UpdateProjectSettingsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectSettingsProjectsRequest,
  output: UpdateProjectSettingsProjectsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
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
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations" }),
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
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations/{locationsId}" }),
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

export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
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

export interface ListProjectsLocationsRepositoriesRequest {
  /** Required. The name of the parent resource whose repositories will be listed. */
  parent: string;
  /** The maximum number of repositories to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
  /** Optional. The field to order the results by. */
  orderBy?: string;
}

export const ListProjectsLocationsRepositoriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesRequest>;

export type ListProjectsLocationsRepositoriesResponse = ListRepositoriesResponse;
export const ListProjectsLocationsRepositoriesResponse = ListRepositoriesResponse;

export type ListProjectsLocationsRepositoriesError = CommonErrors;

/** Lists repositories. */
export const listProjectsLocationsRepositories: API.PaginatedOperationMethod<ListProjectsLocationsRepositoriesRequest, ListProjectsLocationsRepositoriesResponse, ListProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesRequest,
  output: ListProjectsLocationsRepositoriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRepositoriesRequest {
  /** Required. The name of the repository to retrieve. */
  name: string;
}

export const GetProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesRequest>;

export type GetProjectsLocationsRepositoriesResponse = Repository;
export const GetProjectsLocationsRepositoriesResponse = Repository;

export type GetProjectsLocationsRepositoriesError = CommonErrors;

/** Gets a repository. */
export const getProjectsLocationsRepositories: API.OperationMethod<GetProjectsLocationsRepositoriesRequest, GetProjectsLocationsRepositoriesResponse, GetProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesRequest,
  output: GetProjectsLocationsRepositoriesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsRepositoriesRequest {
  /** Required. The name of the parent resource where the repository will be created. */
  parent: string;
  /** Required. The repository id to use for this repository. */
  repositoryId?: string;
  /** Request body */
  body?: Repository;
}

export const CreateProjectsLocationsRepositoriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  repositoryId: Schema.optional(Schema.String).pipe(T.HttpQuery("repositoryId")),
  body: Schema.optional(Repository).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesRequest>;

export type CreateProjectsLocationsRepositoriesResponse = Operation;
export const CreateProjectsLocationsRepositoriesResponse = Operation;

export type CreateProjectsLocationsRepositoriesError = CommonErrors;

/** Creates a repository. The returned Operation will finish once the repository has been created. Its response will be the created Repository. */
export const createProjectsLocationsRepositories: API.OperationMethod<CreateProjectsLocationsRepositoriesRequest, CreateProjectsLocationsRepositoriesResponse, CreateProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesRequest,
  output: CreateProjectsLocationsRepositoriesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsRepositoriesRequest {
  /** The name of the repository, for example: `projects/p1/locations/us-central1/repositories/repo1`. For each location in a project, repository names must be unique. */
  name: string;
  /** The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: Repository;
}

export const PatchProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Repository).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesRequest>;

export type PatchProjectsLocationsRepositoriesResponse = Repository;
export const PatchProjectsLocationsRepositoriesResponse = Repository;

export type PatchProjectsLocationsRepositoriesError = CommonErrors;

/** Updates a repository. */
export const patchProjectsLocationsRepositories: API.OperationMethod<PatchProjectsLocationsRepositoriesRequest, PatchProjectsLocationsRepositoriesResponse, PatchProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesRequest,
  output: PatchProjectsLocationsRepositoriesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsRepositoriesRequest {
  /** Required. The name of the repository to delete. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesRequest>;

export type DeleteProjectsLocationsRepositoriesResponse = Operation;
export const DeleteProjectsLocationsRepositoriesResponse = Operation;

export type DeleteProjectsLocationsRepositoriesError = CommonErrors;

/** Deletes a repository and all of its contents. The returned Operation will finish once the repository has been deleted. It will not have any Operation metadata and will return a google.protobuf.Empty response. */
export const deleteProjectsLocationsRepositories: API.OperationMethod<DeleteProjectsLocationsRepositoriesRequest, DeleteProjectsLocationsRepositoriesResponse, DeleteProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesRequest,
  output: DeleteProjectsLocationsRepositoriesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsRepositoriesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsRepositoriesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsRepositoriesRequest>;

export type SetIamPolicyProjectsLocationsRepositoriesResponse = Policy;
export const SetIamPolicyProjectsLocationsRepositoriesResponse = Policy;

export type SetIamPolicyProjectsLocationsRepositoriesError = CommonErrors;

/** Updates the IAM policy for a given resource. */
export const setIamPolicyProjectsLocationsRepositories: API.OperationMethod<SetIamPolicyProjectsLocationsRepositoriesRequest, SetIamPolicyProjectsLocationsRepositoriesResponse, SetIamPolicyProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsRepositoriesRequest,
  output: SetIamPolicyProjectsLocationsRepositoriesResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsRepositoriesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsRepositoriesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsRepositoriesRequest>;

export type GetIamPolicyProjectsLocationsRepositoriesResponse = Policy;
export const GetIamPolicyProjectsLocationsRepositoriesResponse = Policy;

export type GetIamPolicyProjectsLocationsRepositoriesError = CommonErrors;

/** Gets the IAM policy for a given resource. */
export const getIamPolicyProjectsLocationsRepositories: API.OperationMethod<GetIamPolicyProjectsLocationsRepositoriesRequest, GetIamPolicyProjectsLocationsRepositoriesResponse, GetIamPolicyProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsRepositoriesRequest,
  output: GetIamPolicyProjectsLocationsRepositoriesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsRepositoriesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsRepositoriesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsRepositoriesRequest>;

export type TestIamPermissionsProjectsLocationsRepositoriesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsRepositoriesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsRepositoriesError = CommonErrors;

/** Tests if the caller has a list of permissions on a resource. */
export const testIamPermissionsProjectsLocationsRepositories: API.OperationMethod<TestIamPermissionsProjectsLocationsRepositoriesRequest, TestIamPermissionsProjectsLocationsRepositoriesResponse, TestIamPermissionsProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsRepositoriesRequest,
  output: TestIamPermissionsProjectsLocationsRepositoriesResponse,
  errors: [],
}));

export interface ImportProjectsLocationsRepositoriesAptArtifactsRequest {
  /** The name of the parent resource where the artifacts will be imported. */
  parent: string;
  /** Request body */
  body?: ImportAptArtifactsRequest;
}

export const ImportProjectsLocationsRepositoriesAptArtifactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ImportAptArtifactsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/aptArtifacts:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsRepositoriesAptArtifactsRequest>;

export type ImportProjectsLocationsRepositoriesAptArtifactsResponse = Operation;
export const ImportProjectsLocationsRepositoriesAptArtifactsResponse = Operation;

export type ImportProjectsLocationsRepositoriesAptArtifactsError = CommonErrors;

/** Imports Apt artifacts. The returned Operation will complete once the resources are imported. Package, Version, and File resources are created based on the imported artifacts. Imported artifacts that conflict with existing resources are ignored. */
export const importProjectsLocationsRepositoriesAptArtifacts: API.OperationMethod<ImportProjectsLocationsRepositoriesAptArtifactsRequest, ImportProjectsLocationsRepositoriesAptArtifactsResponse, ImportProjectsLocationsRepositoriesAptArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsRepositoriesAptArtifactsRequest,
  output: ImportProjectsLocationsRepositoriesAptArtifactsResponse,
  errors: [],
}));

export interface UploadProjectsLocationsRepositoriesAptArtifactsRequest {
  /** The name of the parent resource where the artifacts will be uploaded. */
  parent: string;
  /** Request body */
  body?: UploadAptArtifactRequest;
}

export const UploadProjectsLocationsRepositoriesAptArtifactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UploadAptArtifactRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/aptArtifacts:create", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadProjectsLocationsRepositoriesAptArtifactsRequest>;

export type UploadProjectsLocationsRepositoriesAptArtifactsResponse = UploadAptArtifactMediaResponse;
export const UploadProjectsLocationsRepositoriesAptArtifactsResponse = UploadAptArtifactMediaResponse;

export type UploadProjectsLocationsRepositoriesAptArtifactsError = CommonErrors;

/** Directly uploads an Apt artifact. The returned Operation will complete once the resources are uploaded. Package, Version, and File resources are created based on the imported artifact. Imported artifacts that conflict with existing resources are ignored. */
export const uploadProjectsLocationsRepositoriesAptArtifacts: API.OperationMethod<UploadProjectsLocationsRepositoriesAptArtifactsRequest, UploadProjectsLocationsRepositoriesAptArtifactsResponse, UploadProjectsLocationsRepositoriesAptArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadProjectsLocationsRepositoriesAptArtifactsRequest,
  output: UploadProjectsLocationsRepositoriesAptArtifactsResponse,
  errors: [],
}));

export interface ImportProjectsLocationsRepositoriesYumArtifactsRequest {
  /** The name of the parent resource where the artifacts will be imported. */
  parent: string;
  /** Request body */
  body?: ImportYumArtifactsRequest;
}

export const ImportProjectsLocationsRepositoriesYumArtifactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ImportYumArtifactsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/yumArtifacts:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsRepositoriesYumArtifactsRequest>;

export type ImportProjectsLocationsRepositoriesYumArtifactsResponse = Operation;
export const ImportProjectsLocationsRepositoriesYumArtifactsResponse = Operation;

export type ImportProjectsLocationsRepositoriesYumArtifactsError = CommonErrors;

/** Imports Yum (RPM) artifacts. The returned Operation will complete once the resources are imported. Package, Version, and File resources are created based on the imported artifacts. Imported artifacts that conflict with existing resources are ignored. */
export const importProjectsLocationsRepositoriesYumArtifacts: API.OperationMethod<ImportProjectsLocationsRepositoriesYumArtifactsRequest, ImportProjectsLocationsRepositoriesYumArtifactsResponse, ImportProjectsLocationsRepositoriesYumArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsRepositoriesYumArtifactsRequest,
  output: ImportProjectsLocationsRepositoriesYumArtifactsResponse,
  errors: [],
}));

export interface UploadProjectsLocationsRepositoriesYumArtifactsRequest {
  /** The name of the parent resource where the artifacts will be uploaded. */
  parent: string;
  /** Request body */
  body?: UploadYumArtifactRequest;
}

export const UploadProjectsLocationsRepositoriesYumArtifactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UploadYumArtifactRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/yumArtifacts:create", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadProjectsLocationsRepositoriesYumArtifactsRequest>;

export type UploadProjectsLocationsRepositoriesYumArtifactsResponse = UploadYumArtifactMediaResponse;
export const UploadProjectsLocationsRepositoriesYumArtifactsResponse = UploadYumArtifactMediaResponse;

export type UploadProjectsLocationsRepositoriesYumArtifactsError = CommonErrors;

/** Directly uploads a Yum artifact. The returned Operation will complete once the resources are uploaded. Package, Version, and File resources are created based on the imported artifact. Imported artifacts that conflict with existing resources are ignored. */
export const uploadProjectsLocationsRepositoriesYumArtifacts: API.OperationMethod<UploadProjectsLocationsRepositoriesYumArtifactsRequest, UploadProjectsLocationsRepositoriesYumArtifactsResponse, UploadProjectsLocationsRepositoriesYumArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadProjectsLocationsRepositoriesYumArtifactsRequest,
  output: UploadProjectsLocationsRepositoriesYumArtifactsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRepositoriesPackagesRequest {
  /** Required. The name of the parent resource whose packages will be listed. */
  parent: string;
  /** The maximum number of packages to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
  /** Optional. The field to order the results by. */
  orderBy?: string;
}

export const ListProjectsLocationsRepositoriesPackagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesPackagesRequest>;

export type ListProjectsLocationsRepositoriesPackagesResponse = ListPackagesResponse;
export const ListProjectsLocationsRepositoriesPackagesResponse = ListPackagesResponse;

export type ListProjectsLocationsRepositoriesPackagesError = CommonErrors;

/** Lists packages. */
export const listProjectsLocationsRepositoriesPackages: API.PaginatedOperationMethod<ListProjectsLocationsRepositoriesPackagesRequest, ListProjectsLocationsRepositoriesPackagesResponse, ListProjectsLocationsRepositoriesPackagesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesPackagesRequest,
  output: ListProjectsLocationsRepositoriesPackagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRepositoriesPackagesRequest {
  /** Required. The name of the package to retrieve. */
  name: string;
}

export const GetProjectsLocationsRepositoriesPackagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesPackagesRequest>;

export type GetProjectsLocationsRepositoriesPackagesResponse = Package;
export const GetProjectsLocationsRepositoriesPackagesResponse = Package;

export type GetProjectsLocationsRepositoriesPackagesError = CommonErrors;

/** Gets a package. */
export const getProjectsLocationsRepositoriesPackages: API.OperationMethod<GetProjectsLocationsRepositoriesPackagesRequest, GetProjectsLocationsRepositoriesPackagesResponse, GetProjectsLocationsRepositoriesPackagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesPackagesRequest,
  output: GetProjectsLocationsRepositoriesPackagesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsRepositoriesPackagesRequest {
  /** Required. The name of the package to delete. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesPackagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesPackagesRequest>;

export type DeleteProjectsLocationsRepositoriesPackagesResponse = Operation;
export const DeleteProjectsLocationsRepositoriesPackagesResponse = Operation;

export type DeleteProjectsLocationsRepositoriesPackagesError = CommonErrors;

/** Deletes a package and all of its versions and tags. The returned operation will complete once the package has been deleted. */
export const deleteProjectsLocationsRepositoriesPackages: API.OperationMethod<DeleteProjectsLocationsRepositoriesPackagesRequest, DeleteProjectsLocationsRepositoriesPackagesResponse, DeleteProjectsLocationsRepositoriesPackagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesPackagesRequest,
  output: DeleteProjectsLocationsRepositoriesPackagesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsRepositoriesPackagesRequest {
  /** The name of the package, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1`. If the package ID part contains slashes, the slashes are escaped. */
  name: string;
  /** The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: Package;
}

export const PatchProjectsLocationsRepositoriesPackagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Package).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesPackagesRequest>;

export type PatchProjectsLocationsRepositoriesPackagesResponse = Package;
export const PatchProjectsLocationsRepositoriesPackagesResponse = Package;

export type PatchProjectsLocationsRepositoriesPackagesError = CommonErrors;

/** Updates a package. */
export const patchProjectsLocationsRepositoriesPackages: API.OperationMethod<PatchProjectsLocationsRepositoriesPackagesRequest, PatchProjectsLocationsRepositoriesPackagesResponse, PatchProjectsLocationsRepositoriesPackagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesPackagesRequest,
  output: PatchProjectsLocationsRepositoriesPackagesResponse,
  errors: [],
}));

export interface ListProjectsLocationsRepositoriesPackagesVersionsRequest {
  /** The name of the parent resource whose versions will be listed. */
  parent: string;
  /** The maximum number of versions to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
  /** The view that should be returned in the response. */
  view?: "VERSION_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Optional. The field to order the results by. */
  orderBy?: string;
}

export const ListProjectsLocationsRepositoriesPackagesVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesPackagesVersionsRequest>;

export type ListProjectsLocationsRepositoriesPackagesVersionsResponse = ListVersionsResponse;
export const ListProjectsLocationsRepositoriesPackagesVersionsResponse = ListVersionsResponse;

export type ListProjectsLocationsRepositoriesPackagesVersionsError = CommonErrors;

/** Lists versions. */
export const listProjectsLocationsRepositoriesPackagesVersions: API.PaginatedOperationMethod<ListProjectsLocationsRepositoriesPackagesVersionsRequest, ListProjectsLocationsRepositoriesPackagesVersionsResponse, ListProjectsLocationsRepositoriesPackagesVersionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesPackagesVersionsRequest,
  output: ListProjectsLocationsRepositoriesPackagesVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRepositoriesPackagesVersionsRequest {
  /** The name of the version to retrieve. */
  name: string;
  /** The view that should be returned in the response. */
  view?: "VERSION_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetProjectsLocationsRepositoriesPackagesVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesPackagesVersionsRequest>;

export type GetProjectsLocationsRepositoriesPackagesVersionsResponse = Version;
export const GetProjectsLocationsRepositoriesPackagesVersionsResponse = Version;

export type GetProjectsLocationsRepositoriesPackagesVersionsError = CommonErrors;

/** Gets a version */
export const getProjectsLocationsRepositoriesPackagesVersions: API.OperationMethod<GetProjectsLocationsRepositoriesPackagesVersionsRequest, GetProjectsLocationsRepositoriesPackagesVersionsResponse, GetProjectsLocationsRepositoriesPackagesVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesPackagesVersionsRequest,
  output: GetProjectsLocationsRepositoriesPackagesVersionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsRepositoriesPackagesVersionsRequest {
  /** The name of the version to delete. */
  name: string;
  /** By default, a version that is tagged may not be deleted. If force=true, the version and any tags pointing to the version are deleted. */
  force?: boolean;
}

export const DeleteProjectsLocationsRepositoriesPackagesVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesPackagesVersionsRequest>;

export type DeleteProjectsLocationsRepositoriesPackagesVersionsResponse = Operation;
export const DeleteProjectsLocationsRepositoriesPackagesVersionsResponse = Operation;

export type DeleteProjectsLocationsRepositoriesPackagesVersionsError = CommonErrors;

/** Deletes a version and all of its content. The returned operation will complete once the version has been deleted. */
export const deleteProjectsLocationsRepositoriesPackagesVersions: API.OperationMethod<DeleteProjectsLocationsRepositoriesPackagesVersionsRequest, DeleteProjectsLocationsRepositoriesPackagesVersionsResponse, DeleteProjectsLocationsRepositoriesPackagesVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesPackagesVersionsRequest,
  output: DeleteProjectsLocationsRepositoriesPackagesVersionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRepositoriesPackagesTagsRequest {
  /** The name of the parent package whose tags will be listed. For example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1`. */
  parent: string;
  /** An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: * `name` * `version` Examples of using a filter: To filter the results of your request to tags with the name `my-tag` in package `my-package` in repository `my-repo` in project "`y-project` in the us-central region, append the following filter expression to your request: * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/tags/my-tag"` You can also use wildcards to match any number of characters before or after the value: * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/tags/my*"` * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/tags/*tag"` * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/tags/*tag*"` To filter the results of your request to tags applied to the version `1.0` in package `my-package`, append the following filter expression to your request: * `version="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/versions/1.0"` */
  filter?: string;
  /** The maximum number of tags to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesPackagesTagsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/tags" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesPackagesTagsRequest>;

export type ListProjectsLocationsRepositoriesPackagesTagsResponse = ListTagsResponse;
export const ListProjectsLocationsRepositoriesPackagesTagsResponse = ListTagsResponse;

export type ListProjectsLocationsRepositoriesPackagesTagsError = CommonErrors;

/** Lists tags. */
export const listProjectsLocationsRepositoriesPackagesTags: API.PaginatedOperationMethod<ListProjectsLocationsRepositoriesPackagesTagsRequest, ListProjectsLocationsRepositoriesPackagesTagsResponse, ListProjectsLocationsRepositoriesPackagesTagsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesPackagesTagsRequest,
  output: ListProjectsLocationsRepositoriesPackagesTagsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRepositoriesPackagesTagsRequest {
  /** The name of the tag to retrieve. */
  name: string;
}

export const GetProjectsLocationsRepositoriesPackagesTagsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/tags/{tagsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesPackagesTagsRequest>;

export type GetProjectsLocationsRepositoriesPackagesTagsResponse = Tag;
export const GetProjectsLocationsRepositoriesPackagesTagsResponse = Tag;

export type GetProjectsLocationsRepositoriesPackagesTagsError = CommonErrors;

/** Gets a tag. */
export const getProjectsLocationsRepositoriesPackagesTags: API.OperationMethod<GetProjectsLocationsRepositoriesPackagesTagsRequest, GetProjectsLocationsRepositoriesPackagesTagsResponse, GetProjectsLocationsRepositoriesPackagesTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesPackagesTagsRequest,
  output: GetProjectsLocationsRepositoriesPackagesTagsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsRepositoriesPackagesTagsRequest {
  /** The name of the parent resource where the tag will be created. */
  parent: string;
  /** The tag id to use for this repository. */
  tagId?: string;
  /** Request body */
  body?: Tag;
}

export const CreateProjectsLocationsRepositoriesPackagesTagsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  tagId: Schema.optional(Schema.String).pipe(T.HttpQuery("tagId")),
  body: Schema.optional(Tag).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/tags", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesPackagesTagsRequest>;

export type CreateProjectsLocationsRepositoriesPackagesTagsResponse = Tag;
export const CreateProjectsLocationsRepositoriesPackagesTagsResponse = Tag;

export type CreateProjectsLocationsRepositoriesPackagesTagsError = CommonErrors;

/** Creates a tag. */
export const createProjectsLocationsRepositoriesPackagesTags: API.OperationMethod<CreateProjectsLocationsRepositoriesPackagesTagsRequest, CreateProjectsLocationsRepositoriesPackagesTagsResponse, CreateProjectsLocationsRepositoriesPackagesTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesPackagesTagsRequest,
  output: CreateProjectsLocationsRepositoriesPackagesTagsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsRepositoriesPackagesTagsRequest {
  /** The name of the tag, for example: "projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/tags/tag1". If the package part contains slashes, the slashes are escaped. The tag part can only have characters in [a-zA-Z0-9\-._~:@], anything else must be URL encoded. */
  name: string;
  /** The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: Tag;
}

export const PatchProjectsLocationsRepositoriesPackagesTagsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Tag).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/tags/{tagsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesPackagesTagsRequest>;

export type PatchProjectsLocationsRepositoriesPackagesTagsResponse = Tag;
export const PatchProjectsLocationsRepositoriesPackagesTagsResponse = Tag;

export type PatchProjectsLocationsRepositoriesPackagesTagsError = CommonErrors;

/** Updates a tag. */
export const patchProjectsLocationsRepositoriesPackagesTags: API.OperationMethod<PatchProjectsLocationsRepositoriesPackagesTagsRequest, PatchProjectsLocationsRepositoriesPackagesTagsResponse, PatchProjectsLocationsRepositoriesPackagesTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesPackagesTagsRequest,
  output: PatchProjectsLocationsRepositoriesPackagesTagsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsRepositoriesPackagesTagsRequest {
  /** The name of the tag to delete. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesPackagesTagsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/tags/{tagsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesPackagesTagsRequest>;

export type DeleteProjectsLocationsRepositoriesPackagesTagsResponse = Empty;
export const DeleteProjectsLocationsRepositoriesPackagesTagsResponse = Empty;

export type DeleteProjectsLocationsRepositoriesPackagesTagsError = CommonErrors;

/** Deletes a tag. */
export const deleteProjectsLocationsRepositoriesPackagesTags: API.OperationMethod<DeleteProjectsLocationsRepositoriesPackagesTagsRequest, DeleteProjectsLocationsRepositoriesPackagesTagsResponse, DeleteProjectsLocationsRepositoriesPackagesTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesPackagesTagsRequest,
  output: DeleteProjectsLocationsRepositoriesPackagesTagsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRepositoriesFilesRequest {
  /** Required. The name of the repository whose files will be listed. For example: "projects/p1/locations/us-central1/repositories/repo1 */
  parent: string;
  /** An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: * `name` * `owner` * `annotations` Examples of using a filter: To filter the results of your request to files with the name `my_file.txt` in project `my-project` in the `us-central` region, in repository `my-repo`, append the following filter expression to your request: * `name="projects/my-project/locations/us-central1/repositories/my-repo/files/my-file.txt"` You can also use wildcards to match any number of characters before or after the value: * `name="projects/my-project/locations/us-central1/repositories/my-repo/files/my-*"` * `name="projects/my-project/locations/us-central1/repositories/my-repo/files/*file.txt"` * `name="projects/my-project/locations/us-central1/repositories/my-repo/files/*file*"` To filter the results of your request to files owned by the version `1.0` in package `pkg1`, append the following filter expression to your request: * `owner="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/versions/1.0"` To filter the results of your request to files with the annotation key-value pair [`external_link`: `external_link_value`], append the following filter expression to your request: * `"annotations.external_link:external_link_value"` To filter just for a specific annotation key `external_link`, append the following filter expression to your request: * `"annotations.external_link"` If the annotation key or value contains special characters, you can escape them by surrounding the value with backticks. For example, to filter the results of your request to files with the annotation key-value pair [`external.link`:`https://example.com/my-file`], append the following filter expression to your request: * `` "annotations.`external.link`:`https://example.com/my-file`" `` You can also filter with annotations with a wildcard to match any number of characters before or after the value: * `` "annotations.*_link:`*example.com*`" `` */
  filter?: string;
  /** The maximum number of files to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesFilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/files" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesFilesRequest>;

export type ListProjectsLocationsRepositoriesFilesResponse = ListFilesResponse;
export const ListProjectsLocationsRepositoriesFilesResponse = ListFilesResponse;

export type ListProjectsLocationsRepositoriesFilesError = CommonErrors;

/** Lists files. */
export const listProjectsLocationsRepositoriesFiles: API.PaginatedOperationMethod<ListProjectsLocationsRepositoriesFilesRequest, ListProjectsLocationsRepositoriesFilesResponse, ListProjectsLocationsRepositoriesFilesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesFilesRequest,
  output: ListProjectsLocationsRepositoriesFilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRepositoriesFilesRequest {
  /** Required. The name of the file to retrieve. */
  name: string;
}

export const GetProjectsLocationsRepositoriesFilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/files/{filesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesFilesRequest>;

export type GetProjectsLocationsRepositoriesFilesResponse = GoogleDevtoolsArtifactregistryV1beta2File;
export const GetProjectsLocationsRepositoriesFilesResponse = GoogleDevtoolsArtifactregistryV1beta2File;

export type GetProjectsLocationsRepositoriesFilesError = CommonErrors;

/** Gets a file. */
export const getProjectsLocationsRepositoriesFiles: API.OperationMethod<GetProjectsLocationsRepositoriesFilesRequest, GetProjectsLocationsRepositoriesFilesResponse, GetProjectsLocationsRepositoriesFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesFilesRequest,
  output: GetProjectsLocationsRepositoriesFilesResponse,
  errors: [],
}));

export interface DownloadProjectsLocationsRepositoriesFilesRequest {
  /** Required. The name of the file to download. */
  name: string;
}

export const DownloadProjectsLocationsRepositoriesFilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/files/{filesId}:download" }),
  svc,
) as unknown as Schema.Schema<DownloadProjectsLocationsRepositoriesFilesRequest>;

export type DownloadProjectsLocationsRepositoriesFilesResponse = DownloadFileResponse;
export const DownloadProjectsLocationsRepositoriesFilesResponse = DownloadFileResponse;

export type DownloadProjectsLocationsRepositoriesFilesError = CommonErrors;

/** Download a file. */
export const downloadProjectsLocationsRepositoriesFiles: API.OperationMethod<DownloadProjectsLocationsRepositoriesFilesRequest, DownloadProjectsLocationsRepositoriesFilesResponse, DownloadProjectsLocationsRepositoriesFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadProjectsLocationsRepositoriesFilesRequest,
  output: DownloadProjectsLocationsRepositoriesFilesResponse,
  errors: [],
}));

