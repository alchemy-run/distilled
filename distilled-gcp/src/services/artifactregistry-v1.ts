// ==========================================================================
// Artifact Registry API (artifactregistry v1)
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
  version: "v1",
  rootUrl: "https://artifactregistry.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface PythonPackage {
  /** Required. registry_location, project_id, repository_name and python_package forms a unique package name:`projects//locations//repository//pythonPackages/`. For example, "projects/test-project/locations/us-west4/repositories/test-repo/pythonPackages/ python_package:1.0.0", where "us-west4" is the registry_location, "test-project" is the project_id, "test-repo" is the repository_name and python_package:1.0.0" is the python package. */
  name?: string;
  /** Required. URL to access the package. Example: us-west4-python.pkg.dev/test-project/test-repo/python_package/file-name-1.0.0.tar.gz */
  uri?: string;
  /** Version of this package. */
  version?: string;
  /** Output only. Time the package was updated. */
  updateTime?: string;
  /** Package for the artifact. */
  packageName?: string;
  /** Output only. Time the package was created. */
  createTime?: string;
}

export const PythonPackage: Schema.Schema<PythonPackage> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "PythonPackage" }) as any as Schema.Schema<PythonPackage>;

export interface ListPythonPackagesResponse {
  /** The python packages returned. */
  pythonPackages?: Array<PythonPackage>;
  /** The token to retrieve the next page of artifacts, or empty if there are no more artifacts to return. */
  nextPageToken?: string;
}

export const ListPythonPackagesResponse: Schema.Schema<ListPythonPackagesResponse> = Schema.suspend(() => Schema.Struct({
  pythonPackages: Schema.optional(Schema.Array(PythonPackage)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPythonPackagesResponse" }) as any as Schema.Schema<ListPythonPackagesResponse>;

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Expr {
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface GoogleDevtoolsArtifactregistryV1Rule {
  /** The action this rule takes. */
  action?: "ACTION_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  operation?: "OPERATION_UNSPECIFIED" | "DOWNLOAD" | (string & {});
  /** The package ID the rule applies to. If empty, this rule applies to all packages inside the repository. */
  packageId?: string;
  /** The name of the rule, for example: `projects/p1/locations/us-central1/repositories/repo1/rules/rule1`. */
  name?: string;
  /** Optional. A CEL expression for conditions that must be met in order for the rule to apply. If not provided, the rule matches all objects. */
  condition?: Expr;
}

export const GoogleDevtoolsArtifactregistryV1Rule: Schema.Schema<GoogleDevtoolsArtifactregistryV1Rule> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  operation: Schema.optional(Schema.String),
  packageId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "GoogleDevtoolsArtifactregistryV1Rule" }) as any as Schema.Schema<GoogleDevtoolsArtifactregistryV1Rule>;

export interface ListRulesResponse {
  /** The token to retrieve the next page of rules, or empty if there are no more rules to return. */
  nextPageToken?: string;
  /** The rules returned. */
  rules?: Array<GoogleDevtoolsArtifactregistryV1Rule>;
}

export const ListRulesResponse: Schema.Schema<ListRulesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  rules: Schema.optional(Schema.Array(GoogleDevtoolsArtifactregistryV1Rule)),
})).annotate({ identifier: "ListRulesResponse" }) as any as Schema.Schema<ListRulesResponse>;

export interface GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigDockerRepositoryCustomRepository {
  /** An http/https uri reference to the custom remote repository, for ex: "https://registry-1.docker.io". */
  uri?: string;
}

export const GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigDockerRepositoryCustomRepository: Schema.Schema<GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigDockerRepositoryCustomRepository> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigDockerRepositoryCustomRepository" }) as any as Schema.Schema<GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigDockerRepositoryCustomRepository>;

export interface DockerRepository {
  /** One of the publicly available Docker repositories supported by Artifact Registry. */
  publicRepository?: "PUBLIC_REPOSITORY_UNSPECIFIED" | "DOCKER_HUB" | (string & {});
  /** Customer-specified remote repository. */
  customRepository?: GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigDockerRepositoryCustomRepository;
}

export const DockerRepository: Schema.Schema<DockerRepository> = Schema.suspend(() => Schema.Struct({
  publicRepository: Schema.optional(Schema.String),
  customRepository: Schema.optional(GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigDockerRepositoryCustomRepository),
})).annotate({ identifier: "DockerRepository" }) as any as Schema.Schema<DockerRepository>;

export interface BatchDeleteVersionsMetadata {
  /** The versions the operation failed to delete. */
  failedVersions?: Array<string>;
}

export const BatchDeleteVersionsMetadata: Schema.Schema<BatchDeleteVersionsMetadata> = Schema.suspend(() => Schema.Struct({
  failedVersions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BatchDeleteVersionsMetadata" }) as any as Schema.Schema<BatchDeleteVersionsMetadata>;

export interface UploadGenericArtifactRequest {
  /** The name of the file of the generic artifact to be uploaded. E.g. `example-file.zip` The filename is limited to letters, numbers, and url safe characters, i.e. [a-zA-Z0-9-_.~@]. */
  filename?: string;
  /** The ID of the package of the generic artifact. If the package does not exist, a new package will be created. The `package_id` should start and end with a letter or number, only contain letters, numbers, hyphens, underscores, and periods, and not exceed 256 characters. */
  packageId?: string;
  /** The ID of the version of the generic artifact. If the version does not exist, a new version will be created. The version_id must start and end with a letter or number, can only contain lowercase letters, numbers, the following characters [-.+~:], i.e.[a-z0-9-.+~:] and cannot exceed a total of 128 characters. Creating a version called `latest` is not allowed. */
  versionId?: string;
}

export const UploadGenericArtifactRequest: Schema.Schema<UploadGenericArtifactRequest> = Schema.suspend(() => Schema.Struct({
  filename: Schema.optional(Schema.String),
  packageId: Schema.optional(Schema.String),
  versionId: Schema.optional(Schema.String),
})).annotate({ identifier: "UploadGenericArtifactRequest" }) as any as Schema.Schema<UploadGenericArtifactRequest>;

export interface GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryCustomRepository {
  /** An http/https uri reference to the upstream remote repository, for ex: "https://my.yum.registry/". */
  uri?: string;
}

export const GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryCustomRepository: Schema.Schema<GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryCustomRepository> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryCustomRepository" }) as any as Schema.Schema<GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryCustomRepository>;

export interface UploadGoModuleRequest {
}

export const UploadGoModuleRequest: Schema.Schema<UploadGoModuleRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UploadGoModuleRequest" }) as any as Schema.Schema<UploadGoModuleRequest>;

export interface MavenArtifact {
  /** Group ID for the artifact. Example: com.google.guava */
  groupId?: string;
  /** Output only. Time the artifact was created. */
  createTime?: string;
  /** Required. URL to access the pom file of the artifact. Example: us-west4-maven.pkg.dev/test-project/test-repo/com/google/guava/guava/31.0/guava-31.0.pom */
  pomUri?: string;
  /** Artifact ID for the artifact. */
  artifactId?: string;
  /** Version of this artifact. */
  version?: string;
  /** Output only. Time the artifact was updated. */
  updateTime?: string;
  /** Required. registry_location, project_id, repository_name and maven_artifact forms a unique artifact For example, "projects/test-project/locations/us-west4/repositories/test-repo/mavenArtifacts/ com.google.guava:guava:31.0-jre", where "us-west4" is the registry_location, "test-project" is the project_id, "test-repo" is the repository_name and "com.google.guava:guava:31.0-jre" is the maven artifact. */
  name?: string;
}

export const MavenArtifact: Schema.Schema<MavenArtifact> = Schema.suspend(() => Schema.Struct({
  groupId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  pomUri: Schema.optional(Schema.String),
  artifactId: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "MavenArtifact" }) as any as Schema.Schema<MavenArtifact>;

export interface ListMavenArtifactsResponse {
  /** The token to retrieve the next page of artifacts, or empty if there are no more artifacts to return. */
  nextPageToken?: string;
  /** The maven artifacts returned. */
  mavenArtifacts?: Array<MavenArtifact>;
}

export const ListMavenArtifactsResponse: Schema.Schema<ListMavenArtifactsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  mavenArtifacts: Schema.optional(Schema.Array(MavenArtifact)),
})).annotate({ identifier: "ListMavenArtifactsResponse" }) as any as Schema.Schema<ListMavenArtifactsResponse>;

export interface Operation {
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  error: Schema.optional(Status),
  done: Schema.optional(Schema.Boolean),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface UploadFileMediaResponse {
  /** Operation that will be returned to the user. */
  operation?: Operation;
}

export const UploadFileMediaResponse: Schema.Schema<UploadFileMediaResponse> = Schema.suspend(() => Schema.Struct({
  operation: Schema.optional(Operation),
})).annotate({ identifier: "UploadFileMediaResponse" }) as any as Schema.Schema<UploadFileMediaResponse>;

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
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  bindings: Schema.optional(Schema.Array(Binding)),
  version: Schema.optional(Schema.Number),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface DockerRepositoryConfig {
  /** The repository which enabled this flag prevents all tags from being modified, moved or deleted. This does not prevent tags from being created. */
  immutableTags?: boolean;
}

export const DockerRepositoryConfig: Schema.Schema<DockerRepositoryConfig> = Schema.suspend(() => Schema.Struct({
  immutableTags: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DockerRepositoryConfig" }) as any as Schema.Schema<DockerRepositoryConfig>;

export interface UploadGoogetArtifactRequest {
}

export const UploadGoogetArtifactRequest: Schema.Schema<UploadGoogetArtifactRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UploadGoogetArtifactRequest" }) as any as Schema.Schema<UploadGoogetArtifactRequest>;

export interface Hash {
  /** The hash value. */
  value?: string;
  /** The algorithm used to compute the hash value. */
  type?: "HASH_TYPE_UNSPECIFIED" | "SHA256" | "MD5" | "DIRSUM_SHA256" | (string & {});
}

export const Hash: Schema.Schema<Hash> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Hash" }) as any as Schema.Schema<Hash>;

export interface GoogleDevtoolsArtifactregistryV1File {
  /** Output only. The time when the File was last updated. */
  updateTime?: string;
  /** The hashes of the file content. */
  hashes?: Array<Hash>;
  /** Output only. The time when the last attempt to refresh the file's data was made. Only set when the repository is remote. */
  fetchTime?: string;
  /** Optional. Client specified annotations. */
  annotations?: Record<string, string>;
  /** Output only. The time when the File was created. */
  createTime?: string;
  /** The size of the File in bytes. */
  sizeBytes?: string;
  /** The name of the file, for example: `projects/p1/locations/us-central1/repositories/repo1/files/a%2Fb%2Fc.txt`. If the file ID part contains slashes, they are escaped. */
  name?: string;
  /** The name of the Package or Version that owns this file, if any. */
  owner?: string;
}

export const GoogleDevtoolsArtifactregistryV1File: Schema.Schema<GoogleDevtoolsArtifactregistryV1File> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  hashes: Schema.optional(Schema.Array(Hash)),
  fetchTime: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  sizeBytes: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  owner: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsArtifactregistryV1File" }) as any as Schema.Schema<GoogleDevtoolsArtifactregistryV1File>;

export interface ListFilesResponse {
  /** The token to retrieve the next page of files, or empty if there are no more files to return. */
  nextPageToken?: string;
  /** The files returned. */
  files?: Array<GoogleDevtoolsArtifactregistryV1File>;
}

export const ListFilesResponse: Schema.Schema<ListFilesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  files: Schema.optional(Schema.Array(GoogleDevtoolsArtifactregistryV1File)),
})).annotate({ identifier: "ListFilesResponse" }) as any as Schema.Schema<ListFilesResponse>;

export interface UsernamePasswordCredentials {
  /** The username to access the remote repository. */
  username?: string;
  /** The Secret Manager key version that holds the password to access the remote repository. Must be in the format of `projects/{project}/secrets/{secret}/versions/{version}`. */
  passwordSecretVersion?: string;
}

export const UsernamePasswordCredentials: Schema.Schema<UsernamePasswordCredentials> = Schema.suspend(() => Schema.Struct({
  username: Schema.optional(Schema.String),
  passwordSecretVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "UsernamePasswordCredentials" }) as any as Schema.Schema<UsernamePasswordCredentials>;

export interface UpstreamCredentials {
  /** Use username and password to access the remote repository. */
  usernamePasswordCredentials?: UsernamePasswordCredentials;
}

export const UpstreamCredentials: Schema.Schema<UpstreamCredentials> = Schema.suspend(() => Schema.Struct({
  usernamePasswordCredentials: Schema.optional(UsernamePasswordCredentials),
})).annotate({ identifier: "UpstreamCredentials" }) as any as Schema.Schema<UpstreamCredentials>;

export interface ImportGoogetArtifactsMetadata {
}

export const ImportGoogetArtifactsMetadata: Schema.Schema<ImportGoogetArtifactsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ImportGoogetArtifactsMetadata" }) as any as Schema.Schema<ImportGoogetArtifactsMetadata>;

export interface GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigMavenRepositoryCustomRepository {
  /** An http/https uri reference to the upstream remote repository, for ex: "https://my.maven.registry/". */
  uri?: string;
}

export const GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigMavenRepositoryCustomRepository: Schema.Schema<GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigMavenRepositoryCustomRepository> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigMavenRepositoryCustomRepository" }) as any as Schema.Schema<GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigMavenRepositoryCustomRepository>;

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

export interface ImportGoogetArtifactsGcsSource {
  /** Supports URI wildcards for matching multiple objects from a single URI. */
  useWildcards?: boolean;
  /** Cloud Storage paths URI (e.g., `gs://my_bucket/my_object`). */
  uris?: Array<string>;
}

export const ImportGoogetArtifactsGcsSource: Schema.Schema<ImportGoogetArtifactsGcsSource> = Schema.suspend(() => Schema.Struct({
  useWildcards: Schema.optional(Schema.Boolean),
  uris: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ImportGoogetArtifactsGcsSource" }) as any as Schema.Schema<ImportGoogetArtifactsGcsSource>;

export interface UploadGoogetArtifactMediaResponse {
  /** Operation to be returned to the user. */
  operation?: Operation;
}

export const UploadGoogetArtifactMediaResponse: Schema.Schema<UploadGoogetArtifactMediaResponse> = Schema.suspend(() => Schema.Struct({
  operation: Schema.optional(Operation),
})).annotate({ identifier: "UploadGoogetArtifactMediaResponse" }) as any as Schema.Schema<UploadGoogetArtifactMediaResponse>;

export interface Location {
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  locationId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
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

export interface UploadAptArtifactMetadata {
}

export const UploadAptArtifactMetadata: Schema.Schema<UploadAptArtifactMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UploadAptArtifactMetadata" }) as any as Schema.Schema<UploadAptArtifactMetadata>;

export interface CleanupPolicyCondition {
  /** Match versions by tag prefix. Applied on any prefix match. */
  tagPrefixes?: Array<string>;
  /** Match versions older than a duration. */
  olderThan?: string;
  /** Match versions by package prefix. Applied on any prefix match. */
  packageNamePrefixes?: Array<string>;
  /** Match versions newer than a duration. */
  newerThan?: string;
  /** Match versions by version name prefix. Applied on any prefix match. */
  versionNamePrefixes?: Array<string>;
  /** Match versions by tag status. */
  tagState?: "TAG_STATE_UNSPECIFIED" | "TAGGED" | "UNTAGGED" | "ANY" | (string & {});
}

export const CleanupPolicyCondition: Schema.Schema<CleanupPolicyCondition> = Schema.suspend(() => Schema.Struct({
  tagPrefixes: Schema.optional(Schema.Array(Schema.String)),
  olderThan: Schema.optional(Schema.String),
  packageNamePrefixes: Schema.optional(Schema.Array(Schema.String)),
  newerThan: Schema.optional(Schema.String),
  versionNamePrefixes: Schema.optional(Schema.Array(Schema.String)),
  tagState: Schema.optional(Schema.String),
})).annotate({ identifier: "CleanupPolicyCondition" }) as any as Schema.Schema<CleanupPolicyCondition>;

export interface UploadKfpArtifactMediaResponse {
  /** Operation that will be returned to the user. */
  operation?: Operation;
}

export const UploadKfpArtifactMediaResponse: Schema.Schema<UploadKfpArtifactMediaResponse> = Schema.suspend(() => Schema.Struct({
  operation: Schema.optional(Operation),
})).annotate({ identifier: "UploadKfpArtifactMediaResponse" }) as any as Schema.Schema<UploadKfpArtifactMediaResponse>;

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
  /** Output only. Repository-specific Metadata stored against this version. The fields returned are defined by the underlying repository-specific resource. Currently, the resources could be: DockerImage MavenArtifact */
  metadata?: Record<string, unknown>;
  /** The time when the version was last updated. */
  updateTime?: string;
  /** Output only. A list of related tags. Will contain up to 100 tags that reference this version. */
  relatedTags?: Array<Tag>;
  /** Output only. Immutable reference for the version, calculated based on the version's content. Currently we only support dirsum_sha256 hash algorithm. Additional hash algorithms may be added in the future. */
  fingerprints?: Array<Hash>;
  /** Optional. Description of the version, as specified in its metadata. */
  description?: string;
  /** Optional. Client specified annotations. */
  annotations?: Record<string, string>;
  /** The time when the version was created. */
  createTime?: string;
}

export const Version: Schema.Schema<Version> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  updateTime: Schema.optional(Schema.String),
  relatedTags: Schema.optional(Schema.Array(Tag)),
  fingerprints: Schema.optional(Schema.Array(Hash)),
  description: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Version" }) as any as Schema.Schema<Version>;

export interface ExportArtifactResponse {
  /** The exported version. Should be the same as the request version with fingerprint resource name. */
  exportedVersion?: Version;
}

export const ExportArtifactResponse: Schema.Schema<ExportArtifactResponse> = Schema.suspend(() => Schema.Struct({
  exportedVersion: Schema.optional(Version),
})).annotate({ identifier: "ExportArtifactResponse" }) as any as Schema.Schema<ExportArtifactResponse>;

export interface YumArtifact {
  /** Output only. Operating system architecture of the artifact. */
  architecture?: string;
  /** Output only. The yum package name of the artifact. */
  packageName?: string;
  /** Output only. An artifact is a binary or source package. */
  packageType?: "PACKAGE_TYPE_UNSPECIFIED" | "BINARY" | "SOURCE" | (string & {});
  /** Output only. The Artifact Registry resource name of the artifact. */
  name?: string;
}

export const YumArtifact: Schema.Schema<YumArtifact> = Schema.suspend(() => Schema.Struct({
  architecture: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  packageType: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "YumArtifact" }) as any as Schema.Schema<YumArtifact>;

export interface UploadYumArtifactResponse {
  /** The Yum artifacts updated. */
  yumArtifacts?: Array<YumArtifact>;
}

export const UploadYumArtifactResponse: Schema.Schema<UploadYumArtifactResponse> = Schema.suspend(() => Schema.Struct({
  yumArtifacts: Schema.optional(Schema.Array(YumArtifact)),
})).annotate({ identifier: "UploadYumArtifactResponse" }) as any as Schema.Schema<UploadYumArtifactResponse>;

export interface ImportGoogetArtifactsErrorInfo {
  /** Google Cloud Storage location requested. */
  gcsSource?: ImportGoogetArtifactsGcsSource;
  /** The detailed error status. */
  error?: Status;
}

export const ImportGoogetArtifactsErrorInfo: Schema.Schema<ImportGoogetArtifactsErrorInfo> = Schema.suspend(() => Schema.Struct({
  gcsSource: Schema.optional(ImportGoogetArtifactsGcsSource),
  error: Schema.optional(Status),
})).annotate({ identifier: "ImportGoogetArtifactsErrorInfo" }) as any as Schema.Schema<ImportGoogetArtifactsErrorInfo>;

export interface Attachment {
  /** The name of the attachment. E.g. `projects/p1/locations/us/repositories/repo/attachments/sbom`. */
  name?: string;
  /** The namespace this attachment belongs to. E.g. If an attachment is created by artifact analysis, namespace is set to `artifactanalysis.googleapis.com`. */
  attachmentNamespace?: string;
  /** Output only. The time when the attachment was created. */
  createTime?: string;
  /** Required. The target the attachment is for, can be a Version, Package or Repository. E.g. `projects/p1/locations/us-central1/repositories/repo1/packages/p1/versions/v1`. */
  target?: string;
  /** Output only. The time when the attachment was last updated. */
  updateTime?: string;
  /** Output only. The name of the OCI version that this attachment created. Only populated for Docker attachments. E.g. `projects/p1/locations/us-central1/repositories/repo1/packages/p1/versions/v1`. */
  ociVersionName?: string;
  /** Type of attachment. E.g. `application/vnd.spdx+json` */
  type?: string;
  /** Optional. User annotations. These attributes can only be set and used by the user, and not by Artifact Registry. See https://google.aip.dev/128#annotations for more details such as format and size limitations. */
  annotations?: Record<string, string>;
  /** Required. The files that belong to this attachment. If the file ID part contains slashes, they are escaped. E.g. `projects/p1/locations/us-central1/repositories/repo1/files/sha:`. */
  files?: Array<string>;
}

export const Attachment: Schema.Schema<Attachment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  attachmentNamespace: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  ociVersionName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  files: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Attachment" }) as any as Schema.Schema<Attachment>;

export interface GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigPythonRepositoryCustomRepository {
  /** An http/https uri reference to the upstream remote repository, for ex: "https://my.python.registry/". */
  uri?: string;
}

export const GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigPythonRepositoryCustomRepository: Schema.Schema<GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigPythonRepositoryCustomRepository> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigPythonRepositoryCustomRepository" }) as any as Schema.Schema<GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigPythonRepositoryCustomRepository>;

export interface VPCSCConfig {
  /** The project per location VPC SC policy that defines the VPC SC behavior for the Remote Repository (Allow/Deny). */
  vpcscPolicy?: "VPCSC_POLICY_UNSPECIFIED" | "DENY" | "ALLOW" | (string & {});
  /** The name of the project's VPC SC Config. Always of the form: projects/{projectID}/locations/{location}/vpcscConfig In update request: never set In response: always set */
  name?: string;
}

export const VPCSCConfig: Schema.Schema<VPCSCConfig> = Schema.suspend(() => Schema.Struct({
  vpcscPolicy: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "VPCSCConfig" }) as any as Schema.Schema<VPCSCConfig>;

export interface GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigNpmRepositoryCustomRepository {
  /** An http/https uri reference to the upstream remote repository, for ex: "https://my.npm.registry/". */
  uri?: string;
}

export const GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigNpmRepositoryCustomRepository: Schema.Schema<GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigNpmRepositoryCustomRepository> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigNpmRepositoryCustomRepository" }) as any as Schema.Schema<GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigNpmRepositoryCustomRepository>;

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

export interface UploadGenericArtifactMetadata {
}

export const UploadGenericArtifactMetadata: Schema.Schema<UploadGenericArtifactMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UploadGenericArtifactMetadata" }) as any as Schema.Schema<UploadGenericArtifactMetadata>;

export interface GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryPublicRepository {
  /** A common public repository base for Apt. */
  repositoryBase?: "REPOSITORY_BASE_UNSPECIFIED" | "DEBIAN" | "UBUNTU" | "DEBIAN_SNAPSHOT" | (string & {});
  /** A custom field to define a path to a specific repository from the base. */
  repositoryPath?: string;
}

export const GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryPublicRepository: Schema.Schema<GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryPublicRepository> = Schema.suspend(() => Schema.Struct({
  repositoryBase: Schema.optional(Schema.String),
  repositoryPath: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryPublicRepository" }) as any as Schema.Schema<GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryPublicRepository>;

export interface ImportYumArtifactsErrorInfo {
  /** The detailed error status. */
  error?: Status;
  /** Google Cloud Storage location requested. */
  gcsSource?: ImportYumArtifactsGcsSource;
}

export const ImportYumArtifactsErrorInfo: Schema.Schema<ImportYumArtifactsErrorInfo> = Schema.suspend(() => Schema.Struct({
  error: Schema.optional(Status),
  gcsSource: Schema.optional(ImportYumArtifactsGcsSource),
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

export interface UploadYumArtifactRequest {
}

export const UploadYumArtifactRequest: Schema.Schema<UploadYumArtifactRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UploadYumArtifactRequest" }) as any as Schema.Schema<UploadYumArtifactRequest>;

export interface GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryCustomRepository {
  /** An http/https uri reference to the upstream remote repository, for ex: "https://my.apt.registry/". */
  uri?: string;
}

export const GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryCustomRepository: Schema.Schema<GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryCustomRepository> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryCustomRepository" }) as any as Schema.Schema<GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryCustomRepository>;

export interface ImportAptArtifactsGcsSource {
  /** Supports URI wildcards for matching multiple objects from a single URI. */
  useWildcards?: boolean;
  /** Cloud Storage paths URI (e.g., gs://my_bucket//my_object). */
  uris?: Array<string>;
}

export const ImportAptArtifactsGcsSource: Schema.Schema<ImportAptArtifactsGcsSource> = Schema.suspend(() => Schema.Struct({
  useWildcards: Schema.optional(Schema.Boolean),
  uris: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ImportAptArtifactsGcsSource" }) as any as Schema.Schema<ImportAptArtifactsGcsSource>;

export interface UploadFileRequest {
  /** Optional. The ID of the file. If left empty will default to sha256 digest of the content uploaded. */
  fileId?: string;
}

export const UploadFileRequest: Schema.Schema<UploadFileRequest> = Schema.suspend(() => Schema.Struct({
  fileId: Schema.optional(Schema.String),
})).annotate({ identifier: "UploadFileRequest" }) as any as Schema.Schema<UploadFileRequest>;

export interface BatchDeleteVersionsRequest {
  /** Required. The names of the versions to delete. The maximum number of versions deleted per batch is determined by the service and is dependent on the available resources in the region. */
  names?: Array<string>;
  /** If true, the request is performed without deleting data, following AIP-163. */
  validateOnly?: boolean;
}

export const BatchDeleteVersionsRequest: Schema.Schema<BatchDeleteVersionsRequest> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
  validateOnly: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "BatchDeleteVersionsRequest" }) as any as Schema.Schema<BatchDeleteVersionsRequest>;

export interface GenericArtifact {
  /** Output only. The time when the Generic module is created. */
  createTime?: string;
  /** Resource name of the generic artifact. project, location, repository, package_id and version_id create a unique generic artifact. i.e. "projects/test-project/locations/us-west4/repositories/test-repo/ genericArtifacts/package_id:version_id" */
  name?: string;
  /** The version of the generic artifact. */
  version?: string;
  /** Output only. The time when the Generic module is updated. */
  updateTime?: string;
}

export const GenericArtifact: Schema.Schema<GenericArtifact> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GenericArtifact" }) as any as Schema.Schema<GenericArtifact>;

export interface GoModule {
  /** Output only. The time when the Go module is updated. */
  updateTime?: string;
  /** Output only. The time when the Go module is created. */
  createTime?: string;
  /** The version of the Go module. Must be a valid canonical version as defined in https://go.dev/ref/mod#glos-canonical-version. */
  version?: string;
  /** The resource name of a Go module. */
  name?: string;
}

export const GoModule: Schema.Schema<GoModule> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoModule" }) as any as Schema.Schema<GoModule>;

export interface MavenRepository {
  /** One of the publicly available Maven repositories supported by Artifact Registry. */
  publicRepository?: "PUBLIC_REPOSITORY_UNSPECIFIED" | "MAVEN_CENTRAL" | (string & {});
  /** Customer-specified remote repository. */
  customRepository?: GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigMavenRepositoryCustomRepository;
}

export const MavenRepository: Schema.Schema<MavenRepository> = Schema.suspend(() => Schema.Struct({
  publicRepository: Schema.optional(Schema.String),
  customRepository: Schema.optional(GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigMavenRepositoryCustomRepository),
})).annotate({ identifier: "MavenRepository" }) as any as Schema.Schema<MavenRepository>;

export interface GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryPublicRepository {
  /** A common public repository base for Yum. */
  repositoryBase?: "REPOSITORY_BASE_UNSPECIFIED" | "CENTOS" | "CENTOS_DEBUG" | "CENTOS_VAULT" | "CENTOS_STREAM" | "ROCKY" | "EPEL" | (string & {});
  /** A custom field to define a path to a specific repository from the base. */
  repositoryPath?: string;
}

export const GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryPublicRepository: Schema.Schema<GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryPublicRepository> = Schema.suspend(() => Schema.Struct({
  repositoryBase: Schema.optional(Schema.String),
  repositoryPath: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryPublicRepository" }) as any as Schema.Schema<GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryPublicRepository>;

export interface YumRepository {
  /** One of the publicly available Yum repositories supported by Artifact Registry. */
  publicRepository?: GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryPublicRepository;
  /** Customer-specified remote repository. */
  customRepository?: GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryCustomRepository;
}

export const YumRepository: Schema.Schema<YumRepository> = Schema.suspend(() => Schema.Struct({
  publicRepository: Schema.optional(GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryPublicRepository),
  customRepository: Schema.optional(GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryCustomRepository),
})).annotate({ identifier: "YumRepository" }) as any as Schema.Schema<YumRepository>;

export interface CommonRemoteRepository {
  /** Required. A common public repository base for remote repository. */
  uri?: string;
}

export const CommonRemoteRepository: Schema.Schema<CommonRemoteRepository> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "CommonRemoteRepository" }) as any as Schema.Schema<CommonRemoteRepository>;

export interface AptRepository {
  /** Customer-specified remote repository. */
  customRepository?: GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryCustomRepository;
  /** One of the publicly available Apt repositories supported by Artifact Registry. */
  publicRepository?: GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryPublicRepository;
}

export const AptRepository: Schema.Schema<AptRepository> = Schema.suspend(() => Schema.Struct({
  customRepository: Schema.optional(GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryCustomRepository),
  publicRepository: Schema.optional(GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryPublicRepository),
})).annotate({ identifier: "AptRepository" }) as any as Schema.Schema<AptRepository>;

export interface NpmRepository {
  /** Customer-specified remote repository. */
  customRepository?: GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigNpmRepositoryCustomRepository;
  /** One of the publicly available Npm repositories supported by Artifact Registry. */
  publicRepository?: "PUBLIC_REPOSITORY_UNSPECIFIED" | "NPMJS" | (string & {});
}

export const NpmRepository: Schema.Schema<NpmRepository> = Schema.suspend(() => Schema.Struct({
  customRepository: Schema.optional(GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigNpmRepositoryCustomRepository),
  publicRepository: Schema.optional(Schema.String),
})).annotate({ identifier: "NpmRepository" }) as any as Schema.Schema<NpmRepository>;

export interface PythonRepository {
  /** One of the publicly available Python repositories supported by Artifact Registry. */
  publicRepository?: "PUBLIC_REPOSITORY_UNSPECIFIED" | "PYPI" | (string & {});
  /** Customer-specified remote repository. */
  customRepository?: GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigPythonRepositoryCustomRepository;
}

export const PythonRepository: Schema.Schema<PythonRepository> = Schema.suspend(() => Schema.Struct({
  publicRepository: Schema.optional(Schema.String),
  customRepository: Schema.optional(GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigPythonRepositoryCustomRepository),
})).annotate({ identifier: "PythonRepository" }) as any as Schema.Schema<PythonRepository>;

export interface RemoteRepositoryConfig {
  /** Specific settings for a Maven remote repository. */
  mavenRepository?: MavenRepository;
  /** Specific settings for a Yum remote repository. */
  yumRepository?: YumRepository;
  /** Common remote repository settings. Used as the remote repository upstream URL. */
  commonRepository?: CommonRemoteRepository;
  /** The description of the remote source. */
  description?: string;
  /** Optional. The credentials used to access the remote repository. */
  upstreamCredentials?: UpstreamCredentials;
  /** Specific settings for an Apt remote repository. */
  aptRepository?: AptRepository;
  /** Specific settings for an Npm remote repository. */
  npmRepository?: NpmRepository;
  /** Input only. A create/update remote repo option to avoid making a HEAD/GET request to validate a remote repo and any supplied upstream credentials. */
  disableUpstreamValidation?: boolean;
  /** Specific settings for a Python remote repository. */
  pythonRepository?: PythonRepository;
  /** Specific settings for a Docker remote repository. */
  dockerRepository?: DockerRepository;
}

export const RemoteRepositoryConfig: Schema.Schema<RemoteRepositoryConfig> = Schema.suspend(() => Schema.Struct({
  mavenRepository: Schema.optional(MavenRepository),
  yumRepository: Schema.optional(YumRepository),
  commonRepository: Schema.optional(CommonRemoteRepository),
  description: Schema.optional(Schema.String),
  upstreamCredentials: Schema.optional(UpstreamCredentials),
  aptRepository: Schema.optional(AptRepository),
  npmRepository: Schema.optional(NpmRepository),
  disableUpstreamValidation: Schema.optional(Schema.Boolean),
  pythonRepository: Schema.optional(PythonRepository),
  dockerRepository: Schema.optional(DockerRepository),
})).annotate({ identifier: "RemoteRepositoryConfig" }) as any as Schema.Schema<RemoteRepositoryConfig>;

export interface ImageManifest {
  /** Optional. The operating system of the image. Values are provided by the Docker client and are not validated by Artifact Registry. Example values include "linux", "windows", "darwin", "aix", etc. */
  os?: string;
  /** Optional. The required OS features for the image, for example on Windows `win32k`. */
  osFeatures?: Array<string>;
  /** Optional. The CPU architecture of the image. Values are provided by the Docker client and are not validated by Artifact Registry. Example values include "amd64", "arm64", "ppc64le", "s390x", "riscv64", "mips64le", etc. */
  architecture?: string;
  /** Optional. The manifest digest, in the format "sha256:". */
  digest?: string;
  /** Optional. The OS version of the image, for example on Windows `10.0.14393.1066`. */
  osVersion?: string;
  /** Optional. The media type of the manifest, e.g., "application/vnd.docker.distribution.manifest.v2+json" */
  mediaType?: string;
  /** Optional. The variant of the CPU in the image, for example `v7` to specify ARMv7 when architecture is `arm`. */
  variant?: string;
}

export const ImageManifest: Schema.Schema<ImageManifest> = Schema.suspend(() => Schema.Struct({
  os: Schema.optional(Schema.String),
  osFeatures: Schema.optional(Schema.Array(Schema.String)),
  architecture: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.String),
  osVersion: Schema.optional(Schema.String),
  mediaType: Schema.optional(Schema.String),
  variant: Schema.optional(Schema.String),
})).annotate({ identifier: "ImageManifest" }) as any as Schema.Schema<ImageManifest>;

export interface DockerImage {
  /** The time this image was built. This field is returned as the 'metadata.buildTime' field in the Version resource. The build time is returned to the client as an RFC 3339 string, which can be easily used with the JavaScript Date constructor. */
  buildTime?: string;
  /** ArtifactType of this image, e.g. "application/vnd.example+type". If the `subject_digest` is set and no `artifact_type` is given, the `media_type` will be considered as the `artifact_type`. This field is returned as the `metadata.artifactType` field in the Version resource. */
  artifactType?: string;
  /** Calculated size of the image. This field is returned as the 'metadata.imageSizeBytes' field in the Version resource. */
  imageSizeBytes?: string;
  /** Required. URL to access the image. Example: us-west4-docker.pkg.dev/test-project/test-repo/nginx@sha256:e9954c1fc875017be1c3e36eca16be2d9e9bccc4bf072163515467d6a823c7cf */
  uri?: string;
  /** Tags attached to this image. */
  tags?: Array<string>;
  /** Media type of this image, e.g. "application/vnd.docker.distribution.manifest.v2+json". This field is returned as the 'metadata.mediaType' field in the Version resource. */
  mediaType?: string;
  /** Required. registry_location, project_id, repository_name and image id forms a unique image name:`projects//locations//repositories//dockerImages/`. For example, "projects/test-project/locations/us-west4/repositories/test-repo/dockerImages/ nginx@sha256:e9954c1fc875017be1c3e36eca16be2d9e9bccc4bf072163515467d6a823c7cf", where "us-west4" is the registry_location, "test-project" is the project_id, "test-repo" is the repository_name and "nginx@sha256:e9954c1fc875017be1c3e36eca16be2d9e9bccc4bf072163515467d6a823c7cf" is the image's digest. */
  name?: string;
  /** Optional. For multi-arch images (manifest lists), this field contains the list of image manifests. */
  imageManifests?: Array<ImageManifest>;
  /** Output only. The time when the docker image was last updated. */
  updateTime?: string;
  /** Time the image was uploaded. */
  uploadTime?: string;
}

export const DockerImage: Schema.Schema<DockerImage> = Schema.suspend(() => Schema.Struct({
  buildTime: Schema.optional(Schema.String),
  artifactType: Schema.optional(Schema.String),
  imageSizeBytes: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
  mediaType: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  imageManifests: Schema.optional(Schema.Array(ImageManifest)),
  updateTime: Schema.optional(Schema.String),
  uploadTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DockerImage" }) as any as Schema.Schema<DockerImage>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface UploadGenericArtifactMediaResponse {
  /** Operation that will be returned to the user. */
  operation?: Operation;
}

export const UploadGenericArtifactMediaResponse: Schema.Schema<UploadGenericArtifactMediaResponse> = Schema.suspend(() => Schema.Struct({
  operation: Schema.optional(Operation),
})).annotate({ identifier: "UploadGenericArtifactMediaResponse" }) as any as Schema.Schema<UploadGenericArtifactMediaResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface GoogetArtifact {
  /** Output only. The Artifact Registry resource name of the artifact. */
  name?: string;
  /** Output only. Operating system architecture of the artifact. */
  architecture?: string;
  /** Output only. The GooGet package name of the artifact. */
  packageName?: string;
}

export const GoogetArtifact: Schema.Schema<GoogetArtifact> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  architecture: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogetArtifact" }) as any as Schema.Schema<GoogetArtifact>;

export interface ImportGoogetArtifactsResponse {
  /** Detailed error info for packages that were not imported. */
  errors?: Array<ImportGoogetArtifactsErrorInfo>;
  /** The GooGet artifacts updated. */
  googetArtifacts?: Array<GoogetArtifact>;
}

export const ImportGoogetArtifactsResponse: Schema.Schema<ImportGoogetArtifactsResponse> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(ImportGoogetArtifactsErrorInfo)),
  googetArtifacts: Schema.optional(Schema.Array(GoogetArtifact)),
})).annotate({ identifier: "ImportGoogetArtifactsResponse" }) as any as Schema.Schema<ImportGoogetArtifactsResponse>;

export interface AptArtifact {
  /** Output only. Repository component of the artifact. */
  component?: string;
  /** Output only. The Artifact Registry resource name of the artifact. */
  name?: string;
  /** Output only. An artifact is a binary or source package. */
  packageType?: "PACKAGE_TYPE_UNSPECIFIED" | "BINARY" | "SOURCE" | (string & {});
  /** Output only. The Apt package name of the artifact. */
  packageName?: string;
  /** Output only. Contents of the artifact's control metadata file. */
  controlFile?: string;
  /** Output only. Operating system architecture of the artifact. */
  architecture?: string;
}

export const AptArtifact: Schema.Schema<AptArtifact> = Schema.suspend(() => Schema.Struct({
  component: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  packageType: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  controlFile: Schema.optional(Schema.String),
  architecture: Schema.optional(Schema.String),
})).annotate({ identifier: "AptArtifact" }) as any as Schema.Schema<AptArtifact>;

export interface UploadAptArtifactResponse {
  /** The Apt artifacts updated. */
  aptArtifacts?: Array<AptArtifact>;
}

export const UploadAptArtifactResponse: Schema.Schema<UploadAptArtifactResponse> = Schema.suspend(() => Schema.Struct({
  aptArtifacts: Schema.optional(Schema.Array(AptArtifact)),
})).annotate({ identifier: "UploadAptArtifactResponse" }) as any as Schema.Schema<UploadAptArtifactResponse>;

export interface NpmPackage {
  /** Output only. Time the package was updated. */
  updateTime?: string;
  /** Version of this package. */
  version?: string;
  /** Package for the artifact. */
  packageName?: string;
  /** Tags attached to this package. */
  tags?: Array<string>;
  /** Required. registry_location, project_id, repository_name and npm_package forms a unique package For example, "projects/test-project/locations/us-west4/repositories/test-repo/npmPackages/ npm_test:1.0.0", where "us-west4" is the registry_location, "test-project" is the project_id, "test-repo" is the repository_name and npm_test:1.0.0" is the npm package. */
  name?: string;
  /** Output only. Time the package was created. */
  createTime?: string;
}

export const NpmPackage: Schema.Schema<NpmPackage> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "NpmPackage" }) as any as Schema.Schema<NpmPackage>;

export interface UploadAptArtifactRequest {
}

export const UploadAptArtifactRequest: Schema.Schema<UploadAptArtifactRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UploadAptArtifactRequest" }) as any as Schema.Schema<UploadAptArtifactRequest>;

export interface UploadKfpArtifactRequest {
  /** Description of the package version. */
  description?: string;
  /** Tags to be created with the version. */
  tags?: Array<string>;
}

export const UploadKfpArtifactRequest: Schema.Schema<UploadKfpArtifactRequest> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "UploadKfpArtifactRequest" }) as any as Schema.Schema<UploadKfpArtifactRequest>;

export interface UploadGoogetArtifactResponse {
  /** The GooGet artifacts updated. */
  googetArtifacts?: Array<GoogetArtifact>;
}

export const UploadGoogetArtifactResponse: Schema.Schema<UploadGoogetArtifactResponse> = Schema.suspend(() => Schema.Struct({
  googetArtifacts: Schema.optional(Schema.Array(GoogetArtifact)),
})).annotate({ identifier: "UploadGoogetArtifactResponse" }) as any as Schema.Schema<UploadGoogetArtifactResponse>;

export interface UploadGoogetArtifactMetadata {
}

export const UploadGoogetArtifactMetadata: Schema.Schema<UploadGoogetArtifactMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UploadGoogetArtifactMetadata" }) as any as Schema.Schema<UploadGoogetArtifactMetadata>;

export interface ListVersionsResponse {
  /** The token to retrieve the next page of versions, or empty if there are no more versions to return. */
  nextPageToken?: string;
  /** The versions returned. */
  versions?: Array<Version>;
}

export const ListVersionsResponse: Schema.Schema<ListVersionsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  versions: Schema.optional(Schema.Array(Version)),
})).annotate({ identifier: "ListVersionsResponse" }) as any as Schema.Schema<ListVersionsResponse>;

export interface UploadYumArtifactMetadata {
}

export const UploadYumArtifactMetadata: Schema.Schema<UploadYumArtifactMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UploadYumArtifactMetadata" }) as any as Schema.Schema<UploadYumArtifactMetadata>;

export interface ImportAptArtifactsErrorInfo {
  /** The detailed error status. */
  error?: Status;
  /** Google Cloud Storage location requested. */
  gcsSource?: ImportAptArtifactsGcsSource;
}

export const ImportAptArtifactsErrorInfo: Schema.Schema<ImportAptArtifactsErrorInfo> = Schema.suspend(() => Schema.Struct({
  error: Schema.optional(Status),
  gcsSource: Schema.optional(ImportAptArtifactsGcsSource),
})).annotate({ identifier: "ImportAptArtifactsErrorInfo" }) as any as Schema.Schema<ImportAptArtifactsErrorInfo>;

export interface CleanupPolicyMostRecentVersions {
  /** List of package name prefixes that will apply this rule. */
  packageNamePrefixes?: Array<string>;
  /** Minimum number of versions to keep. */
  keepCount?: number;
}

export const CleanupPolicyMostRecentVersions: Schema.Schema<CleanupPolicyMostRecentVersions> = Schema.suspend(() => Schema.Struct({
  packageNamePrefixes: Schema.optional(Schema.Array(Schema.String)),
  keepCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "CleanupPolicyMostRecentVersions" }) as any as Schema.Schema<CleanupPolicyMostRecentVersions>;

export interface UploadGoModuleMetadata {
}

export const UploadGoModuleMetadata: Schema.Schema<UploadGoModuleMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UploadGoModuleMetadata" }) as any as Schema.Schema<UploadGoModuleMetadata>;

export interface ImportYumArtifactsMetadata {
}

export const ImportYumArtifactsMetadata: Schema.Schema<ImportYumArtifactsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ImportYumArtifactsMetadata" }) as any as Schema.Schema<ImportYumArtifactsMetadata>;

export interface VulnerabilityScanningConfig {
  /** Output only. Reason for the repository state. */
  enablementStateReason?: string;
  /** Output only. The last time this repository config was enabled. */
  lastEnableTime?: string;
  /** Optional. Config for whether this repository has vulnerability scanning disabled. */
  enablementConfig?: "ENABLEMENT_CONFIG_UNSPECIFIED" | "INHERITED" | "DISABLED" | (string & {});
  /** Output only. State of feature enablement, combining repository enablement config and API enablement state. */
  enablementState?: "ENABLEMENT_STATE_UNSPECIFIED" | "SCANNING_UNSUPPORTED" | "SCANNING_DISABLED" | "SCANNING_ACTIVE" | (string & {});
}

export const VulnerabilityScanningConfig: Schema.Schema<VulnerabilityScanningConfig> = Schema.suspend(() => Schema.Struct({
  enablementStateReason: Schema.optional(Schema.String),
  lastEnableTime: Schema.optional(Schema.String),
  enablementConfig: Schema.optional(Schema.String),
  enablementState: Schema.optional(Schema.String),
})).annotate({ identifier: "VulnerabilityScanningConfig" }) as any as Schema.Schema<VulnerabilityScanningConfig>;

export interface ExportedFile {
  /** The hashes of the file content. */
  hashes?: Array<Hash>;
  /** Cloud Storage Object path of the exported file. Examples: `dst_bucket/file1`, `dst_bucket/sub_dir/file1` */
  gcsObjectPath?: string;
  /** Name of the exported artifact file. Format: `projects/p1/locations/us/repositories/repo1/files/file1` */
  name?: string;
}

export const ExportedFile: Schema.Schema<ExportedFile> = Schema.suspend(() => Schema.Struct({
  hashes: Schema.optional(Schema.Array(Hash)),
  gcsObjectPath: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ExportedFile" }) as any as Schema.Schema<ExportedFile>;

export interface UploadYumArtifactMediaResponse {
  /** Operation to be returned to the user. */
  operation?: Operation;
}

export const UploadYumArtifactMediaResponse: Schema.Schema<UploadYumArtifactMediaResponse> = Schema.suspend(() => Schema.Struct({
  operation: Schema.optional(Operation),
})).annotate({ identifier: "UploadYumArtifactMediaResponse" }) as any as Schema.Schema<UploadYumArtifactMediaResponse>;

export interface ImportGoogetArtifactsRequest {
  /** Google Cloud Storage location where input content is located. */
  gcsSource?: ImportGoogetArtifactsGcsSource;
}

export const ImportGoogetArtifactsRequest: Schema.Schema<ImportGoogetArtifactsRequest> = Schema.suspend(() => Schema.Struct({
  gcsSource: Schema.optional(ImportGoogetArtifactsGcsSource),
})).annotate({ identifier: "ImportGoogetArtifactsRequest" }) as any as Schema.Schema<ImportGoogetArtifactsRequest>;

export interface UploadAptArtifactMediaResponse {
  /** Operation to be returned to the user. */
  operation?: Operation;
}

export const UploadAptArtifactMediaResponse: Schema.Schema<UploadAptArtifactMediaResponse> = Schema.suspend(() => Schema.Struct({
  operation: Schema.optional(Operation),
})).annotate({ identifier: "UploadAptArtifactMediaResponse" }) as any as Schema.Schema<UploadAptArtifactMediaResponse>;

export interface UpstreamPolicy {
  /** A reference to the repository resource, for example: `projects/p1/locations/us-central1/repositories/repo1`. */
  repository?: string;
  /** Entries with a greater priority value take precedence in the pull order. */
  priority?: number;
  /** The user-provided ID of the upstream policy. */
  id?: string;
}

export const UpstreamPolicy: Schema.Schema<UpstreamPolicy> = Schema.suspend(() => Schema.Struct({
  repository: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "UpstreamPolicy" }) as any as Schema.Schema<UpstreamPolicy>;

export interface KfpArtifact {
  /** Output only. Resource name of the KFP artifact. Since users don't directly interact with this resource, the name will be derived from the associated version. For example, when version = ".../versions/sha256:abcdef...", the name will be ".../kfpArtifacts/sha256:abcdef...". */
  name?: string;
  /** The version associated with the KFP artifact. Must follow the Semantic Versioning standard. */
  version?: string;
}

export const KfpArtifact: Schema.Schema<KfpArtifact> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "KfpArtifact" }) as any as Schema.Schema<KfpArtifact>;

export interface CleanupPolicy {
  /** Policy action. */
  action?: "ACTION_UNSPECIFIED" | "DELETE" | "KEEP" | (string & {});
  /** Policy condition for matching versions. */
  condition?: CleanupPolicyCondition;
  /** The user-provided ID of the cleanup policy. */
  id?: string;
  /** Policy condition for retaining a minimum number of versions. May only be specified with a Keep action. */
  mostRecentVersions?: CleanupPolicyMostRecentVersions;
}

export const CleanupPolicy: Schema.Schema<CleanupPolicy> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  condition: Schema.optional(CleanupPolicyCondition),
  id: Schema.optional(Schema.String),
  mostRecentVersions: Schema.optional(CleanupPolicyMostRecentVersions),
})).annotate({ identifier: "CleanupPolicy" }) as any as Schema.Schema<CleanupPolicy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

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

export interface Package {
  /** The display name of the package. */
  displayName?: string;
  /** Optional. Client specified annotations. */
  annotations?: Record<string, string>;
  /** The name of the package, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1`. If the package ID part contains slashes, the slashes are escaped. */
  name?: string;
  /** The time when the package was created. */
  createTime?: string;
  /** The time when the package was last updated. This includes publishing a new version of the package. */
  updateTime?: string;
}

export const Package: Schema.Schema<Package> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
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

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface ListDockerImagesResponse {
  /** The docker images returned. */
  dockerImages?: Array<DockerImage>;
  /** The token to retrieve the next page of artifacts, or empty if there are no more artifacts to return. */
  nextPageToken?: string;
}

export const ListDockerImagesResponse: Schema.Schema<ListDockerImagesResponse> = Schema.suspend(() => Schema.Struct({
  dockerImages: Schema.optional(Schema.Array(DockerImage)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDockerImagesResponse" }) as any as Schema.Schema<ListDockerImagesResponse>;

export interface ExportArtifactRequest {
  /** The Cloud Storage path to export the artifact to. Should start with the bucket name, and optionally have a directory path. Examples: `dst_bucket`, `dst_bucket/sub_dir`. Existing objects with the same path will be overwritten. */
  gcsPath?: string;
  /** The artifact version to export. Format: projects/{project}/locations/{location}/repositories/{repository}/packages/{package}/versions/{version} */
  sourceVersion?: string;
  /** The artifact tag to export. Format:projects/{project}/locations/{location}/repositories/{repository}/packages/{package}/tags/{tag} */
  sourceTag?: string;
}

export const ExportArtifactRequest: Schema.Schema<ExportArtifactRequest> = Schema.suspend(() => Schema.Struct({
  gcsPath: Schema.optional(Schema.String),
  sourceVersion: Schema.optional(Schema.String),
  sourceTag: Schema.optional(Schema.String),
})).annotate({ identifier: "ExportArtifactRequest" }) as any as Schema.Schema<ExportArtifactRequest>;

export interface ImportAptArtifactsMetadata {
}

export const ImportAptArtifactsMetadata: Schema.Schema<ImportAptArtifactsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ImportAptArtifactsMetadata" }) as any as Schema.Schema<ImportAptArtifactsMetadata>;

export interface VirtualRepositoryConfig {
  /** Policies that configure the upstream artifacts distributed by the Virtual Repository. Upstream policies cannot be set on a standard repository. */
  upstreamPolicies?: Array<UpstreamPolicy>;
}

export const VirtualRepositoryConfig: Schema.Schema<VirtualRepositoryConfig> = Schema.suspend(() => Schema.Struct({
  upstreamPolicies: Schema.optional(Schema.Array(UpstreamPolicy)),
})).annotate({ identifier: "VirtualRepositoryConfig" }) as any as Schema.Schema<VirtualRepositoryConfig>;

export interface ExportArtifactMetadata {
  /** The exported artifact files. */
  exportedFiles?: Array<ExportedFile>;
}

export const ExportArtifactMetadata: Schema.Schema<ExportArtifactMetadata> = Schema.suspend(() => Schema.Struct({
  exportedFiles: Schema.optional(Schema.Array(ExportedFile)),
})).annotate({ identifier: "ExportArtifactMetadata" }) as any as Schema.Schema<ExportArtifactMetadata>;

export interface UploadKfpArtifactMetadata {
}

export const UploadKfpArtifactMetadata: Schema.Schema<UploadKfpArtifactMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UploadKfpArtifactMetadata" }) as any as Schema.Schema<UploadKfpArtifactMetadata>;

export interface DownloadFileResponse {
}

export const DownloadFileResponse: Schema.Schema<DownloadFileResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DownloadFileResponse" }) as any as Schema.Schema<DownloadFileResponse>;

export interface ListAttachmentsResponse {
  /** The token to retrieve the next page of attachments, or empty if there are no more attachments to return. */
  nextPageToken?: string;
  /** The attachments returned. */
  attachments?: Array<Attachment>;
}

export const ListAttachmentsResponse: Schema.Schema<ListAttachmentsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  attachments: Schema.optional(Schema.Array(Attachment)),
})).annotate({ identifier: "ListAttachmentsResponse" }) as any as Schema.Schema<ListAttachmentsResponse>;

export interface OperationMetadata {
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface ImportAptArtifactsRequest {
  /** Google Cloud Storage location where input content is located. */
  gcsSource?: ImportAptArtifactsGcsSource;
}

export const ImportAptArtifactsRequest: Schema.Schema<ImportAptArtifactsRequest> = Schema.suspend(() => Schema.Struct({
  gcsSource: Schema.optional(ImportAptArtifactsGcsSource),
})).annotate({ identifier: "ImportAptArtifactsRequest" }) as any as Schema.Schema<ImportAptArtifactsRequest>;

export interface Repository {
  /** The Cloud KMS resource name of the customer managed encryption key that's used to encrypt the contents of the Repository. Has the form: `projects/my-project/locations/my-region/keyRings/my-kr/cryptoKeys/my-key`. This value may not be changed after the Repository has been created. */
  kmsKeyName?: string;
  /** Optional. If true, the cleanup pipeline is prevented from deleting versions in this repository. */
  cleanupPolicyDryRun?: boolean;
  /** Optional. Cleanup policies for this repository. Cleanup policies indicate when certain package versions can be automatically deleted. Map keys are policy IDs supplied by users during policy creation. They must unique within a repository and be under 128 characters in length. */
  cleanupPolicies?: Record<string, CleanupPolicy>;
  /** Output only. The repository endpoint, for example: `us-docker.pkg.dev/my-proj/my-repo`. */
  registryUri?: string;
  /** Output only. The time when the repository was created. */
  createTime?: string;
  /** Output only. The time when the repository was last updated. */
  updateTime?: string;
  /** Output only. Whether or not this repository satisfies PZS. */
  satisfiesPzs?: boolean;
  /** The name of the repository, for example: `projects/p1/locations/us-central1/repositories/repo1`. For each location in a project, repository names must be unique. */
  name?: string;
  /** Output only. Whether or not this repository satisfies PZI. */
  satisfiesPzi?: boolean;
  /** Docker repository config contains repository level configuration for the repositories of docker type. */
  dockerConfig?: DockerRepositoryConfig;
  /** Configuration specific for a Virtual Repository. */
  virtualRepositoryConfig?: VirtualRepositoryConfig;
  /** Optional. If this is true, an unspecified repo type will be treated as error rather than defaulting to standard. */
  disallowUnspecifiedMode?: boolean;
  /** Maven repository config contains repository level configuration for the repositories of maven type. */
  mavenConfig?: MavenRepositoryConfig;
  /** Configuration specific for a Remote Repository. */
  remoteRepositoryConfig?: RemoteRepositoryConfig;
  /** Output only. The size, in bytes, of all artifact storage in this repository. Repositories that are generally available or in public preview use this to calculate storage costs. */
  sizeBytes?: string;
  /** Labels with user-defined metadata. This field may contain up to 64 entries. Label keys and values may be no longer than 63 characters. Label keys must begin with a lowercase letter and may only contain lowercase letters, numeric characters, underscores, and dashes. */
  labels?: Record<string, string>;
  /** Optional. The format of packages that are stored in the repository. */
  format?: "FORMAT_UNSPECIFIED" | "DOCKER" | "MAVEN" | "NPM" | "APT" | "YUM" | "GOOGET" | "PYTHON" | "KFP" | "GO" | "GENERIC" | "RUBY" | (string & {});
  /** The user-provided description of the repository. */
  description?: string;
  /** Optional. Config and state for vulnerability scanning of resources within this Repository. */
  vulnerabilityScanningConfig?: VulnerabilityScanningConfig;
  /** Optional. The mode of the repository. */
  mode?: "MODE_UNSPECIFIED" | "STANDARD_REPOSITORY" | "VIRTUAL_REPOSITORY" | "REMOTE_REPOSITORY" | "AOSS_REPOSITORY" | "ASSURED_OSS_REPOSITORY" | (string & {});
}

export const Repository: Schema.Schema<Repository> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
  cleanupPolicyDryRun: Schema.optional(Schema.Boolean),
  cleanupPolicies: Schema.optional(Schema.Record(Schema.String, CleanupPolicy)),
  registryUri: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  dockerConfig: Schema.optional(DockerRepositoryConfig),
  virtualRepositoryConfig: Schema.optional(VirtualRepositoryConfig),
  disallowUnspecifiedMode: Schema.optional(Schema.Boolean),
  mavenConfig: Schema.optional(MavenRepositoryConfig),
  remoteRepositoryConfig: Schema.optional(RemoteRepositoryConfig),
  sizeBytes: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  format: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  vulnerabilityScanningConfig: Schema.optional(VulnerabilityScanningConfig),
  mode: Schema.optional(Schema.String),
})).annotate({ identifier: "Repository" }) as any as Schema.Schema<Repository>;

export interface ListRepositoriesResponse {
  /** The token to retrieve the next page of repositories, or empty if there are no more repositories to return. */
  nextPageToken?: string;
  /** The repositories returned. */
  repositories?: Array<Repository>;
}

export const ListRepositoriesResponse: Schema.Schema<ListRepositoriesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  repositories: Schema.optional(Schema.Array(Repository)),
})).annotate({ identifier: "ListRepositoriesResponse" }) as any as Schema.Schema<ListRepositoriesResponse>;

export interface ListNpmPackagesResponse {
  /** The token to retrieve the next page of artifacts, or empty if there are no more artifacts to return. */
  nextPageToken?: string;
  /** The npm packages returned. */
  npmPackages?: Array<NpmPackage>;
}

export const ListNpmPackagesResponse: Schema.Schema<ListNpmPackagesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  npmPackages: Schema.optional(Schema.Array(NpmPackage)),
})).annotate({ identifier: "ListNpmPackagesResponse" }) as any as Schema.Schema<ListNpmPackagesResponse>;

export interface UploadGoModuleMediaResponse {
  /** Operation to be returned to the user. */
  operation?: Operation;
}

export const UploadGoModuleMediaResponse: Schema.Schema<UploadGoModuleMediaResponse> = Schema.suspend(() => Schema.Struct({
  operation: Schema.optional(Operation),
})).annotate({ identifier: "UploadGoModuleMediaResponse" }) as any as Schema.Schema<UploadGoModuleMediaResponse>;

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

export interface ProjectSettings {
  /** The percentage of pull traffic to redirect from GCR to AR when using partial redirection. */
  pullPercent?: number;
  /** The redirection state of the legacy repositories in this project. */
  legacyRedirectionState?: "REDIRECTION_STATE_UNSPECIFIED" | "REDIRECTION_FROM_GCR_IO_DISABLED" | "REDIRECTION_FROM_GCR_IO_ENABLED" | "REDIRECTION_FROM_GCR_IO_FINALIZED" | "REDIRECTION_FROM_GCR_IO_ENABLED_AND_COPYING" | "REDIRECTION_FROM_GCR_IO_PARTIAL_AND_COPYING" | (string & {});
  /** The name of the project's settings. Always of the form: projects/{project-id}/projectSettings In update request: never set In response: always set */
  name?: string;
}

export const ProjectSettings: Schema.Schema<ProjectSettings> = Schema.suspend(() => Schema.Struct({
  pullPercent: Schema.optional(Schema.Number),
  legacyRedirectionState: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ProjectSettings" }) as any as Schema.Schema<ProjectSettings>;

// ==========================================================================
// Operations
// ==========================================================================

/** Retrieves the Settings for the Project. */
export interface GetProjectSettingsProjectsRequest {
  /** Required. The name of the projectSettings resource. */
  name: string;
}

export const GetProjectSettingsProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/projectSettings" }),
  svc,
) as unknown as Schema.Schema<GetProjectSettingsProjectsRequest>;

export type GetProjectSettingsProjectsResponse = ProjectSettings;
export const GetProjectSettingsProjectsResponse = ProjectSettings;

export type GetProjectSettingsProjectsError = CommonErrors;

export const getProjectSettingsProjects: API.OperationMethod<GetProjectSettingsProjectsRequest, GetProjectSettingsProjectsResponse, GetProjectSettingsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectSettingsProjectsRequest,
  output: GetProjectSettingsProjectsResponse,
  errors: [],
}));

/** Updates the Settings for the Project. */
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
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/projectSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectSettingsProjectsRequest>;

export type UpdateProjectSettingsProjectsResponse = ProjectSettings;
export const UpdateProjectSettingsProjectsResponse = ProjectSettings;

export type UpdateProjectSettingsProjectsError = CommonErrors;

export const updateProjectSettingsProjects: API.OperationMethod<UpdateProjectSettingsProjectsRequest, UpdateProjectSettingsProjectsResponse, UpdateProjectSettingsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectSettingsProjectsRequest,
  output: UpdateProjectSettingsProjectsResponse,
  errors: [],
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}" }),
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

/** Retrieves the VPCSC Config for the Project. */
export interface GetVpcscConfigProjectsLocationsRequest {
  /** Required. The name of the VPCSCConfig resource. */
  name: string;
}

export const GetVpcscConfigProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/vpcscConfig" }),
  svc,
) as unknown as Schema.Schema<GetVpcscConfigProjectsLocationsRequest>;

export type GetVpcscConfigProjectsLocationsResponse = VPCSCConfig;
export const GetVpcscConfigProjectsLocationsResponse = VPCSCConfig;

export type GetVpcscConfigProjectsLocationsError = CommonErrors;

export const getVpcscConfigProjectsLocations: API.OperationMethod<GetVpcscConfigProjectsLocationsRequest, GetVpcscConfigProjectsLocationsResponse, GetVpcscConfigProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetVpcscConfigProjectsLocationsRequest,
  output: GetVpcscConfigProjectsLocationsResponse,
  errors: [],
}));

/** Updates the VPCSC Config for the Project. */
export interface UpdateVpcscConfigProjectsLocationsRequest {
  /** The name of the project's VPC SC Config. Always of the form: projects/{projectID}/locations/{location}/vpcscConfig In update request: never set In response: always set */
  name: string;
  /** Field mask to support partial updates. */
  updateMask?: string;
  /** Request body */
  body?: VPCSCConfig;
}

export const UpdateVpcscConfigProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(VPCSCConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/vpcscConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateVpcscConfigProjectsLocationsRequest>;

export type UpdateVpcscConfigProjectsLocationsResponse = VPCSCConfig;
export const UpdateVpcscConfigProjectsLocationsResponse = VPCSCConfig;

export type UpdateVpcscConfigProjectsLocationsError = CommonErrors;

export const updateVpcscConfigProjectsLocations: API.OperationMethod<UpdateVpcscConfigProjectsLocationsRequest, UpdateVpcscConfigProjectsLocationsResponse, UpdateVpcscConfigProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateVpcscConfigProjectsLocationsRequest,
  output: UpdateVpcscConfigProjectsLocationsResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
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

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Updates the IAM policy for a given resource. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsRepositoriesRequest>;

export type SetIamPolicyProjectsLocationsRepositoriesResponse = Policy;
export const SetIamPolicyProjectsLocationsRepositoriesResponse = Policy;

export type SetIamPolicyProjectsLocationsRepositoriesError = CommonErrors;

export const setIamPolicyProjectsLocationsRepositories: API.OperationMethod<SetIamPolicyProjectsLocationsRepositoriesRequest, SetIamPolicyProjectsLocationsRepositoriesResponse, SetIamPolicyProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsRepositoriesRequest,
  output: SetIamPolicyProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Exports an artifact to a Cloud Storage bucket. */
export interface ExportArtifactProjectsLocationsRepositoriesRequest {
  /** Required. The repository of the artifact to export. Format: projects/{project}/locations/{location}/repositories/{repository} */
  repository: string;
  /** Request body */
  body?: ExportArtifactRequest;
}

export const ExportArtifactProjectsLocationsRepositoriesRequest = Schema.Struct({
  repository: Schema.String.pipe(T.HttpPath("repository")),
  body: Schema.optional(ExportArtifactRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:exportArtifact", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportArtifactProjectsLocationsRepositoriesRequest>;

export type ExportArtifactProjectsLocationsRepositoriesResponse = Operation;
export const ExportArtifactProjectsLocationsRepositoriesResponse = Operation;

export type ExportArtifactProjectsLocationsRepositoriesError = CommonErrors;

export const exportArtifactProjectsLocationsRepositories: API.OperationMethod<ExportArtifactProjectsLocationsRepositoriesRequest, ExportArtifactProjectsLocationsRepositoriesResponse, ExportArtifactProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportArtifactProjectsLocationsRepositoriesRequest,
  output: ExportArtifactProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Creates a repository. The returned Operation will finish once the repository has been created. Its response will be the created Repository. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesRequest>;

export type CreateProjectsLocationsRepositoriesResponse = Operation;
export const CreateProjectsLocationsRepositoriesResponse = Operation;

export type CreateProjectsLocationsRepositoriesError = CommonErrors;

export const createProjectsLocationsRepositories: API.OperationMethod<CreateProjectsLocationsRepositoriesRequest, CreateProjectsLocationsRepositoriesResponse, CreateProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesRequest,
  output: CreateProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Deletes a repository and all of its contents. The returned Operation will finish once the repository has been deleted. It will not have any Operation metadata and will return a google.protobuf.Empty response. */
export interface DeleteProjectsLocationsRepositoriesRequest {
  /** Required. The name of the repository to delete. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesRequest>;

export type DeleteProjectsLocationsRepositoriesResponse = Operation;
export const DeleteProjectsLocationsRepositoriesResponse = Operation;

export type DeleteProjectsLocationsRepositoriesError = CommonErrors;

export const deleteProjectsLocationsRepositories: API.OperationMethod<DeleteProjectsLocationsRepositoriesRequest, DeleteProjectsLocationsRepositoriesResponse, DeleteProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesRequest,
  output: DeleteProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Gets the IAM policy for a given resource. */
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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsRepositoriesRequest>;

export type GetIamPolicyProjectsLocationsRepositoriesResponse = Policy;
export const GetIamPolicyProjectsLocationsRepositoriesResponse = Policy;

export type GetIamPolicyProjectsLocationsRepositoriesError = CommonErrors;

export const getIamPolicyProjectsLocationsRepositories: API.OperationMethod<GetIamPolicyProjectsLocationsRepositoriesRequest, GetIamPolicyProjectsLocationsRepositoriesResponse, GetIamPolicyProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsRepositoriesRequest,
  output: GetIamPolicyProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Tests if the caller has a list of permissions on a resource. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsRepositoriesRequest>;

export type TestIamPermissionsProjectsLocationsRepositoriesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsRepositoriesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsRepositoriesError = CommonErrors;

export const testIamPermissionsProjectsLocationsRepositories: API.OperationMethod<TestIamPermissionsProjectsLocationsRepositoriesRequest, TestIamPermissionsProjectsLocationsRepositoriesResponse, TestIamPermissionsProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsRepositoriesRequest,
  output: TestIamPermissionsProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Gets a repository. */
export interface GetProjectsLocationsRepositoriesRequest {
  /** Required. The name of the repository to retrieve. */
  name: string;
}

export const GetProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesRequest>;

export type GetProjectsLocationsRepositoriesResponse = Repository;
export const GetProjectsLocationsRepositoriesResponse = Repository;

export type GetProjectsLocationsRepositoriesError = CommonErrors;

export const getProjectsLocationsRepositories: API.OperationMethod<GetProjectsLocationsRepositoriesRequest, GetProjectsLocationsRepositoriesResponse, GetProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesRequest,
  output: GetProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Lists repositories. */
export interface ListProjectsLocationsRepositoriesRequest {
  /** The maximum number of repositories to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** Optional. The field to order the results by. */
  orderBy?: string;
  /** Required. The name of the parent resource whose repositories will be listed. */
  parent: string;
  /** Optional. An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: * `name` Examples of using a filter: To filter the results of your request to repositories with the name `my-repo` in project `my-project` in the `us-central` region, append the following filter expression to your request: * `name="projects/my-project/locations/us-central1/repositories/my-repo"` You can also use wildcards to match any number of characters before or after the value: * `name="projects/my-project/locations/us-central1/repositories/my-*"` * `name="projects/my-project/locations/us-central1/repositories/*repo"` * `name="projects/my-project/locations/us-central1/repositories/*repo*"` */
  filter?: string;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesRequest>;

export type ListProjectsLocationsRepositoriesResponse = ListRepositoriesResponse;
export const ListProjectsLocationsRepositoriesResponse = ListRepositoriesResponse;

export type ListProjectsLocationsRepositoriesError = CommonErrors;

export const listProjectsLocationsRepositories = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesRequest,
  output: ListProjectsLocationsRepositoriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a repository. */
export interface PatchProjectsLocationsRepositoriesRequest {
  /** The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** The name of the repository, for example: `projects/p1/locations/us-central1/repositories/repo1`. For each location in a project, repository names must be unique. */
  name: string;
  /** Request body */
  body?: Repository;
}

export const PatchProjectsLocationsRepositoriesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Repository).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesRequest>;

export type PatchProjectsLocationsRepositoriesResponse = Repository;
export const PatchProjectsLocationsRepositoriesResponse = Repository;

export type PatchProjectsLocationsRepositoriesError = CommonErrors;

export const patchProjectsLocationsRepositories: API.OperationMethod<PatchProjectsLocationsRepositoriesRequest, PatchProjectsLocationsRepositoriesResponse, PatchProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesRequest,
  output: PatchProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Imports Yum (RPM) artifacts. The returned Operation will complete once the resources are imported. Package, Version, and File resources are created based on the imported artifacts. Imported artifacts that conflict with existing resources are ignored. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/yumArtifacts:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsRepositoriesYumArtifactsRequest>;

export type ImportProjectsLocationsRepositoriesYumArtifactsResponse = Operation;
export const ImportProjectsLocationsRepositoriesYumArtifactsResponse = Operation;

export type ImportProjectsLocationsRepositoriesYumArtifactsError = CommonErrors;

export const importProjectsLocationsRepositoriesYumArtifacts: API.OperationMethod<ImportProjectsLocationsRepositoriesYumArtifactsRequest, ImportProjectsLocationsRepositoriesYumArtifactsResponse, ImportProjectsLocationsRepositoriesYumArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsRepositoriesYumArtifactsRequest,
  output: ImportProjectsLocationsRepositoriesYumArtifactsResponse,
  errors: [],
}));

/** Directly uploads a Yum artifact. The returned Operation will complete once the resources are uploaded. Package, Version, and File resources are created based on the imported artifact. Imported artifacts that conflict with existing resources are ignored. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/yumArtifacts:create", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadProjectsLocationsRepositoriesYumArtifactsRequest>;

export type UploadProjectsLocationsRepositoriesYumArtifactsResponse = UploadYumArtifactMediaResponse;
export const UploadProjectsLocationsRepositoriesYumArtifactsResponse = UploadYumArtifactMediaResponse;

export type UploadProjectsLocationsRepositoriesYumArtifactsError = CommonErrors;

export const uploadProjectsLocationsRepositoriesYumArtifacts: API.OperationMethod<UploadProjectsLocationsRepositoriesYumArtifactsRequest, UploadProjectsLocationsRepositoriesYumArtifactsResponse, UploadProjectsLocationsRepositoriesYumArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadProjectsLocationsRepositoriesYumArtifactsRequest,
  output: UploadProjectsLocationsRepositoriesYumArtifactsResponse,
  errors: [],
}));

/** Lists npm packages. */
export interface ListProjectsLocationsRepositoriesNpmPackagesRequest {
  /** Required. The name of the parent resource whose npm packages will be listed. */
  parent: string;
  /** The maximum number of artifacts to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesNpmPackagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/npmPackages" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesNpmPackagesRequest>;

export type ListProjectsLocationsRepositoriesNpmPackagesResponse = ListNpmPackagesResponse;
export const ListProjectsLocationsRepositoriesNpmPackagesResponse = ListNpmPackagesResponse;

export type ListProjectsLocationsRepositoriesNpmPackagesError = CommonErrors;

export const listProjectsLocationsRepositoriesNpmPackages = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesNpmPackagesRequest,
  output: ListProjectsLocationsRepositoriesNpmPackagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a npm package. */
export interface GetProjectsLocationsRepositoriesNpmPackagesRequest {
  /** Required. The name of the npm package. */
  name: string;
}

export const GetProjectsLocationsRepositoriesNpmPackagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/npmPackages/{npmPackagesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesNpmPackagesRequest>;

export type GetProjectsLocationsRepositoriesNpmPackagesResponse = NpmPackage;
export const GetProjectsLocationsRepositoriesNpmPackagesResponse = NpmPackage;

export type GetProjectsLocationsRepositoriesNpmPackagesError = CommonErrors;

export const getProjectsLocationsRepositoriesNpmPackages: API.OperationMethod<GetProjectsLocationsRepositoriesNpmPackagesRequest, GetProjectsLocationsRepositoriesNpmPackagesResponse, GetProjectsLocationsRepositoriesNpmPackagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesNpmPackagesRequest,
  output: GetProjectsLocationsRepositoriesNpmPackagesResponse,
  errors: [],
}));

/** Directly uploads a file to a repository. The returned Operation will complete once the resources are uploaded. */
export interface UploadProjectsLocationsRepositoriesFilesRequest {
  /** Required. The resource name of the repository where the file will be uploaded. */
  parent: string;
  /** Request body */
  body?: UploadFileRequest;
}

export const UploadProjectsLocationsRepositoriesFilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UploadFileRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/files:upload", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadProjectsLocationsRepositoriesFilesRequest>;

export type UploadProjectsLocationsRepositoriesFilesResponse = UploadFileMediaResponse;
export const UploadProjectsLocationsRepositoriesFilesResponse = UploadFileMediaResponse;

export type UploadProjectsLocationsRepositoriesFilesError = CommonErrors;

export const uploadProjectsLocationsRepositoriesFiles: API.OperationMethod<UploadProjectsLocationsRepositoriesFilesRequest, UploadProjectsLocationsRepositoriesFilesResponse, UploadProjectsLocationsRepositoriesFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadProjectsLocationsRepositoriesFilesRequest,
  output: UploadProjectsLocationsRepositoriesFilesResponse,
  errors: [],
}));

/** Gets a file. */
export interface GetProjectsLocationsRepositoriesFilesRequest {
  /** Required. The name of the file to retrieve. */
  name: string;
}

export const GetProjectsLocationsRepositoriesFilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/files/{filesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesFilesRequest>;

export type GetProjectsLocationsRepositoriesFilesResponse = GoogleDevtoolsArtifactregistryV1File;
export const GetProjectsLocationsRepositoriesFilesResponse = GoogleDevtoolsArtifactregistryV1File;

export type GetProjectsLocationsRepositoriesFilesError = CommonErrors;

export const getProjectsLocationsRepositoriesFiles: API.OperationMethod<GetProjectsLocationsRepositoriesFilesRequest, GetProjectsLocationsRepositoriesFilesResponse, GetProjectsLocationsRepositoriesFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesFilesRequest,
  output: GetProjectsLocationsRepositoriesFilesResponse,
  errors: [],
}));

/** Deletes a file and all of its content. It is only allowed on generic repositories. The returned operation will complete once the file has been deleted. */
export interface DeleteProjectsLocationsRepositoriesFilesRequest {
  /** Required. The name of the file to delete. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesFilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/files/{filesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesFilesRequest>;

export type DeleteProjectsLocationsRepositoriesFilesResponse = Operation;
export const DeleteProjectsLocationsRepositoriesFilesResponse = Operation;

export type DeleteProjectsLocationsRepositoriesFilesError = CommonErrors;

export const deleteProjectsLocationsRepositoriesFiles: API.OperationMethod<DeleteProjectsLocationsRepositoriesFilesRequest, DeleteProjectsLocationsRepositoriesFilesResponse, DeleteProjectsLocationsRepositoriesFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesFilesRequest,
  output: DeleteProjectsLocationsRepositoriesFilesResponse,
  errors: [],
}));

/** Updates a file. */
export interface PatchProjectsLocationsRepositoriesFilesRequest {
  /** The name of the file, for example: `projects/p1/locations/us-central1/repositories/repo1/files/a%2Fb%2Fc.txt`. If the file ID part contains slashes, they are escaped. */
  name: string;
  /** Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: GoogleDevtoolsArtifactregistryV1File;
}

export const PatchProjectsLocationsRepositoriesFilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleDevtoolsArtifactregistryV1File).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/files/{filesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesFilesRequest>;

export type PatchProjectsLocationsRepositoriesFilesResponse = GoogleDevtoolsArtifactregistryV1File;
export const PatchProjectsLocationsRepositoriesFilesResponse = GoogleDevtoolsArtifactregistryV1File;

export type PatchProjectsLocationsRepositoriesFilesError = CommonErrors;

export const patchProjectsLocationsRepositoriesFiles: API.OperationMethod<PatchProjectsLocationsRepositoriesFilesRequest, PatchProjectsLocationsRepositoriesFilesResponse, PatchProjectsLocationsRepositoriesFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesFilesRequest,
  output: PatchProjectsLocationsRepositoriesFilesResponse,
  errors: [],
}));

/** Download a file. */
export interface DownloadProjectsLocationsRepositoriesFilesRequest {
  /** Required. The name of the file to download. */
  name: string;
}

export const DownloadProjectsLocationsRepositoriesFilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/files/{filesId}:download" }),
  svc,
) as unknown as Schema.Schema<DownloadProjectsLocationsRepositoriesFilesRequest>;

export type DownloadProjectsLocationsRepositoriesFilesResponse = DownloadFileResponse;
export const DownloadProjectsLocationsRepositoriesFilesResponse = DownloadFileResponse;

export type DownloadProjectsLocationsRepositoriesFilesError = CommonErrors;

export const downloadProjectsLocationsRepositoriesFiles: API.OperationMethod<DownloadProjectsLocationsRepositoriesFilesRequest, DownloadProjectsLocationsRepositoriesFilesResponse, DownloadProjectsLocationsRepositoriesFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadProjectsLocationsRepositoriesFilesRequest,
  output: DownloadProjectsLocationsRepositoriesFilesResponse,
  errors: [],
}));

/** Lists files. */
export interface ListProjectsLocationsRepositoriesFilesRequest {
  /** Required. The name of the repository whose files will be listed. For example: "projects/p1/locations/us-central1/repositories/repo1 */
  parent: string;
  /** An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: * `name` * `owner` * `annotations` Examples of using a filter: To filter the results of your request to files with the name `my_file.txt` in project `my-project` in the `us-central` region, in repository `my-repo`, append the following filter expression to your request: * `name="projects/my-project/locations/us-central1/repositories/my-repo/files/my-file.txt"` You can also use wildcards to match any number of characters before or after the value: * `name="projects/my-project/locations/us-central1/repositories/my-repo/files/my-*"` * `name="projects/my-project/locations/us-central1/repositories/my-repo/files/*file.txt"` * `name="projects/my-project/locations/us-central1/repositories/my-repo/files/*file*"` To filter the results of your request to files owned by the version `1.0` in package `pkg1`, append the following filter expression to your request: * `owner="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/versions/1.0"` To filter the results of your request to files with the annotation key-value pair [`external_link`: `external_link_value`], append the following filter expression to your request: * `"annotations.external_link:external_link_value"` To filter just for a specific annotation key `external_link`, append the following filter expression to your request: * `"annotations.external_link"` If the annotation key or value contains special characters, you can escape them by surrounding the value with backticks. For example, to filter the results of your request to files with the annotation key-value pair [`external.link`:`https://example.com/my-file`], append the following filter expression to your request: * `` "annotations.`external.link`:`https://example.com/my-file`" `` You can also filter with annotations with a wildcard to match any number of characters before or after the value: * `` "annotations.*_link:`*example.com*`" `` */
  filter?: string;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
  /** The maximum number of files to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** The field to order the results by. */
  orderBy?: string;
}

export const ListProjectsLocationsRepositoriesFilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/files" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesFilesRequest>;

export type ListProjectsLocationsRepositoriesFilesResponse = ListFilesResponse;
export const ListProjectsLocationsRepositoriesFilesResponse = ListFilesResponse;

export type ListProjectsLocationsRepositoriesFilesError = CommonErrors;

export const listProjectsLocationsRepositoriesFiles = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesFilesRequest,
  output: ListProjectsLocationsRepositoriesFilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Directly uploads a KFP artifact. The returned Operation will complete once the resource is uploaded. Package, Version, and File resources will be created based on the uploaded artifact. Uploaded artifacts that conflict with existing resources will be overwritten. */
export interface UploadProjectsLocationsRepositoriesKfpArtifactsRequest {
  /** The resource name of the repository where the KFP artifact will be uploaded. */
  parent: string;
  /** Request body */
  body?: UploadKfpArtifactRequest;
}

export const UploadProjectsLocationsRepositoriesKfpArtifactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UploadKfpArtifactRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/kfpArtifacts:create", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadProjectsLocationsRepositoriesKfpArtifactsRequest>;

export type UploadProjectsLocationsRepositoriesKfpArtifactsResponse = UploadKfpArtifactMediaResponse;
export const UploadProjectsLocationsRepositoriesKfpArtifactsResponse = UploadKfpArtifactMediaResponse;

export type UploadProjectsLocationsRepositoriesKfpArtifactsError = CommonErrors;

export const uploadProjectsLocationsRepositoriesKfpArtifacts: API.OperationMethod<UploadProjectsLocationsRepositoriesKfpArtifactsRequest, UploadProjectsLocationsRepositoriesKfpArtifactsResponse, UploadProjectsLocationsRepositoriesKfpArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadProjectsLocationsRepositoriesKfpArtifactsRequest,
  output: UploadProjectsLocationsRepositoriesKfpArtifactsResponse,
  errors: [],
}));

/** Directly uploads an Apt artifact. The returned Operation will complete once the resources are uploaded. Package, Version, and File resources are created based on the imported artifact. Imported artifacts that conflict with existing resources are ignored. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/aptArtifacts:create", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadProjectsLocationsRepositoriesAptArtifactsRequest>;

export type UploadProjectsLocationsRepositoriesAptArtifactsResponse = UploadAptArtifactMediaResponse;
export const UploadProjectsLocationsRepositoriesAptArtifactsResponse = UploadAptArtifactMediaResponse;

export type UploadProjectsLocationsRepositoriesAptArtifactsError = CommonErrors;

export const uploadProjectsLocationsRepositoriesAptArtifacts: API.OperationMethod<UploadProjectsLocationsRepositoriesAptArtifactsRequest, UploadProjectsLocationsRepositoriesAptArtifactsResponse, UploadProjectsLocationsRepositoriesAptArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadProjectsLocationsRepositoriesAptArtifactsRequest,
  output: UploadProjectsLocationsRepositoriesAptArtifactsResponse,
  errors: [],
}));

/** Imports Apt artifacts. The returned Operation will complete once the resources are imported. Package, Version, and File resources are created based on the imported artifacts. Imported artifacts that conflict with existing resources are ignored. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/aptArtifacts:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsRepositoriesAptArtifactsRequest>;

export type ImportProjectsLocationsRepositoriesAptArtifactsResponse = Operation;
export const ImportProjectsLocationsRepositoriesAptArtifactsResponse = Operation;

export type ImportProjectsLocationsRepositoriesAptArtifactsError = CommonErrors;

export const importProjectsLocationsRepositoriesAptArtifacts: API.OperationMethod<ImportProjectsLocationsRepositoriesAptArtifactsRequest, ImportProjectsLocationsRepositoriesAptArtifactsResponse, ImportProjectsLocationsRepositoriesAptArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsRepositoriesAptArtifactsRequest,
  output: ImportProjectsLocationsRepositoriesAptArtifactsResponse,
  errors: [],
}));

/** Gets an attachment. */
export interface GetProjectsLocationsRepositoriesAttachmentsRequest {
  /** Required. The name of the attachment to retrieve. */
  name: string;
}

export const GetProjectsLocationsRepositoriesAttachmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/attachments/{attachmentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesAttachmentsRequest>;

export type GetProjectsLocationsRepositoriesAttachmentsResponse = Attachment;
export const GetProjectsLocationsRepositoriesAttachmentsResponse = Attachment;

export type GetProjectsLocationsRepositoriesAttachmentsError = CommonErrors;

export const getProjectsLocationsRepositoriesAttachments: API.OperationMethod<GetProjectsLocationsRepositoriesAttachmentsRequest, GetProjectsLocationsRepositoriesAttachmentsResponse, GetProjectsLocationsRepositoriesAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesAttachmentsRequest,
  output: GetProjectsLocationsRepositoriesAttachmentsResponse,
  errors: [],
}));

/** Creates an attachment. The returned Operation will finish once the attachment has been created. Its response will be the created attachment. */
export interface CreateProjectsLocationsRepositoriesAttachmentsRequest {
  /** Required. The name of the parent resource where the attachment will be created. */
  parent: string;
  /** Required. The attachment id to use for this attachment. */
  attachmentId?: string;
  /** Request body */
  body?: Attachment;
}

export const CreateProjectsLocationsRepositoriesAttachmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  attachmentId: Schema.optional(Schema.String).pipe(T.HttpQuery("attachmentId")),
  body: Schema.optional(Attachment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/attachments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesAttachmentsRequest>;

export type CreateProjectsLocationsRepositoriesAttachmentsResponse = Operation;
export const CreateProjectsLocationsRepositoriesAttachmentsResponse = Operation;

export type CreateProjectsLocationsRepositoriesAttachmentsError = CommonErrors;

export const createProjectsLocationsRepositoriesAttachments: API.OperationMethod<CreateProjectsLocationsRepositoriesAttachmentsRequest, CreateProjectsLocationsRepositoriesAttachmentsResponse, CreateProjectsLocationsRepositoriesAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesAttachmentsRequest,
  output: CreateProjectsLocationsRepositoriesAttachmentsResponse,
  errors: [],
}));

/** Lists attachments. */
export interface ListProjectsLocationsRepositoriesAttachmentsRequest {
  /** Optional. An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: * `target` * `type` * `attachment_namespace` */
  filter?: string;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
  /** Required. The name of the parent resource whose attachments will be listed. */
  parent: string;
  /** The maximum number of attachments to return. Maximum page size is 1,000. */
  pageSize?: number;
}

export const ListProjectsLocationsRepositoriesAttachmentsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/attachments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesAttachmentsRequest>;

export type ListProjectsLocationsRepositoriesAttachmentsResponse = ListAttachmentsResponse;
export const ListProjectsLocationsRepositoriesAttachmentsResponse = ListAttachmentsResponse;

export type ListProjectsLocationsRepositoriesAttachmentsError = CommonErrors;

export const listProjectsLocationsRepositoriesAttachments = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesAttachmentsRequest,
  output: ListProjectsLocationsRepositoriesAttachmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes an attachment. The returned Operation will finish once the attachments has been deleted. It will not have any Operation metadata and will return a `google.protobuf.Empty` response. */
export interface DeleteProjectsLocationsRepositoriesAttachmentsRequest {
  /** Required. The name of the attachment to delete. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesAttachmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/attachments/{attachmentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesAttachmentsRequest>;

export type DeleteProjectsLocationsRepositoriesAttachmentsResponse = Operation;
export const DeleteProjectsLocationsRepositoriesAttachmentsResponse = Operation;

export type DeleteProjectsLocationsRepositoriesAttachmentsError = CommonErrors;

export const deleteProjectsLocationsRepositoriesAttachments: API.OperationMethod<DeleteProjectsLocationsRepositoriesAttachmentsRequest, DeleteProjectsLocationsRepositoriesAttachmentsResponse, DeleteProjectsLocationsRepositoriesAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesAttachmentsRequest,
  output: DeleteProjectsLocationsRepositoriesAttachmentsResponse,
  errors: [],
}));

/** Gets a python package. */
export interface GetProjectsLocationsRepositoriesPythonPackagesRequest {
  /** Required. The name of the python package. */
  name: string;
}

export const GetProjectsLocationsRepositoriesPythonPackagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pythonPackages/{pythonPackagesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesPythonPackagesRequest>;

export type GetProjectsLocationsRepositoriesPythonPackagesResponse = PythonPackage;
export const GetProjectsLocationsRepositoriesPythonPackagesResponse = PythonPackage;

export type GetProjectsLocationsRepositoriesPythonPackagesError = CommonErrors;

export const getProjectsLocationsRepositoriesPythonPackages: API.OperationMethod<GetProjectsLocationsRepositoriesPythonPackagesRequest, GetProjectsLocationsRepositoriesPythonPackagesResponse, GetProjectsLocationsRepositoriesPythonPackagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesPythonPackagesRequest,
  output: GetProjectsLocationsRepositoriesPythonPackagesResponse,
  errors: [],
}));

/** Lists python packages. */
export interface ListProjectsLocationsRepositoriesPythonPackagesRequest {
  /** The maximum number of artifacts to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** Required. The name of the parent resource whose python packages will be listed. */
  parent: string;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesPythonPackagesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pythonPackages" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesPythonPackagesRequest>;

export type ListProjectsLocationsRepositoriesPythonPackagesResponse = ListPythonPackagesResponse;
export const ListProjectsLocationsRepositoriesPythonPackagesResponse = ListPythonPackagesResponse;

export type ListProjectsLocationsRepositoriesPythonPackagesError = CommonErrors;

export const listProjectsLocationsRepositoriesPythonPackages = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesPythonPackagesRequest,
  output: ListProjectsLocationsRepositoriesPythonPackagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Directly uploads a Go module. The returned Operation will complete once the Go module is uploaded. Package, Version, and File resources are created based on the uploaded Go module. */
export interface UploadProjectsLocationsRepositoriesGoModulesRequest {
  /** The resource name of the repository where the Go module will be uploaded. */
  parent: string;
  /** Request body */
  body?: UploadGoModuleRequest;
}

export const UploadProjectsLocationsRepositoriesGoModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UploadGoModuleRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/goModules:create", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadProjectsLocationsRepositoriesGoModulesRequest>;

export type UploadProjectsLocationsRepositoriesGoModulesResponse = UploadGoModuleMediaResponse;
export const UploadProjectsLocationsRepositoriesGoModulesResponse = UploadGoModuleMediaResponse;

export type UploadProjectsLocationsRepositoriesGoModulesError = CommonErrors;

export const uploadProjectsLocationsRepositoriesGoModules: API.OperationMethod<UploadProjectsLocationsRepositoriesGoModulesRequest, UploadProjectsLocationsRepositoriesGoModulesResponse, UploadProjectsLocationsRepositoriesGoModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadProjectsLocationsRepositoriesGoModulesRequest,
  output: UploadProjectsLocationsRepositoriesGoModulesResponse,
  errors: [],
}));

/** Lists docker images. */
export interface ListProjectsLocationsRepositoriesDockerImagesRequest {
  /** The field to order the results by. */
  orderBy?: string;
  /** The maximum number of artifacts to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** Required. The name of the parent resource whose docker images will be listed. */
  parent: string;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesDockerImagesRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/dockerImages" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesDockerImagesRequest>;

export type ListProjectsLocationsRepositoriesDockerImagesResponse = ListDockerImagesResponse;
export const ListProjectsLocationsRepositoriesDockerImagesResponse = ListDockerImagesResponse;

export type ListProjectsLocationsRepositoriesDockerImagesError = CommonErrors;

export const listProjectsLocationsRepositoriesDockerImages = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesDockerImagesRequest,
  output: ListProjectsLocationsRepositoriesDockerImagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a docker image. */
export interface GetProjectsLocationsRepositoriesDockerImagesRequest {
  /** Required. The name of the docker images. */
  name: string;
}

export const GetProjectsLocationsRepositoriesDockerImagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/dockerImages/{dockerImagesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesDockerImagesRequest>;

export type GetProjectsLocationsRepositoriesDockerImagesResponse = DockerImage;
export const GetProjectsLocationsRepositoriesDockerImagesResponse = DockerImage;

export type GetProjectsLocationsRepositoriesDockerImagesError = CommonErrors;

export const getProjectsLocationsRepositoriesDockerImages: API.OperationMethod<GetProjectsLocationsRepositoriesDockerImagesRequest, GetProjectsLocationsRepositoriesDockerImagesResponse, GetProjectsLocationsRepositoriesDockerImagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesDockerImagesRequest,
  output: GetProjectsLocationsRepositoriesDockerImagesResponse,
  errors: [],
}));

/** Gets a rule. */
export interface GetProjectsLocationsRepositoriesRulesRequest {
  /** Required. The name of the rule to retrieve. */
  name: string;
}

export const GetProjectsLocationsRepositoriesRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/rules/{rulesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesRulesRequest>;

export type GetProjectsLocationsRepositoriesRulesResponse = GoogleDevtoolsArtifactregistryV1Rule;
export const GetProjectsLocationsRepositoriesRulesResponse = GoogleDevtoolsArtifactregistryV1Rule;

export type GetProjectsLocationsRepositoriesRulesError = CommonErrors;

export const getProjectsLocationsRepositoriesRules: API.OperationMethod<GetProjectsLocationsRepositoriesRulesRequest, GetProjectsLocationsRepositoriesRulesResponse, GetProjectsLocationsRepositoriesRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesRulesRequest,
  output: GetProjectsLocationsRepositoriesRulesResponse,
  errors: [],
}));

/** Creates a rule. */
export interface CreateProjectsLocationsRepositoriesRulesRequest {
  /** The rule id to use for this repository. */
  ruleId?: string;
  /** Required. The name of the parent resource where the rule will be created. */
  parent: string;
  /** Request body */
  body?: GoogleDevtoolsArtifactregistryV1Rule;
}

export const CreateProjectsLocationsRepositoriesRulesRequest = Schema.Struct({
  ruleId: Schema.optional(Schema.String).pipe(T.HttpQuery("ruleId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleDevtoolsArtifactregistryV1Rule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/rules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesRulesRequest>;

export type CreateProjectsLocationsRepositoriesRulesResponse = GoogleDevtoolsArtifactregistryV1Rule;
export const CreateProjectsLocationsRepositoriesRulesResponse = GoogleDevtoolsArtifactregistryV1Rule;

export type CreateProjectsLocationsRepositoriesRulesError = CommonErrors;

export const createProjectsLocationsRepositoriesRules: API.OperationMethod<CreateProjectsLocationsRepositoriesRulesRequest, CreateProjectsLocationsRepositoriesRulesResponse, CreateProjectsLocationsRepositoriesRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesRulesRequest,
  output: CreateProjectsLocationsRepositoriesRulesResponse,
  errors: [],
}));

/** Updates a rule. */
export interface PatchProjectsLocationsRepositoriesRulesRequest {
  /** The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** The name of the rule, for example: `projects/p1/locations/us-central1/repositories/repo1/rules/rule1`. */
  name: string;
  /** Request body */
  body?: GoogleDevtoolsArtifactregistryV1Rule;
}

export const PatchProjectsLocationsRepositoriesRulesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleDevtoolsArtifactregistryV1Rule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/rules/{rulesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesRulesRequest>;

export type PatchProjectsLocationsRepositoriesRulesResponse = GoogleDevtoolsArtifactregistryV1Rule;
export const PatchProjectsLocationsRepositoriesRulesResponse = GoogleDevtoolsArtifactregistryV1Rule;

export type PatchProjectsLocationsRepositoriesRulesError = CommonErrors;

export const patchProjectsLocationsRepositoriesRules: API.OperationMethod<PatchProjectsLocationsRepositoriesRulesRequest, PatchProjectsLocationsRepositoriesRulesResponse, PatchProjectsLocationsRepositoriesRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesRulesRequest,
  output: PatchProjectsLocationsRepositoriesRulesResponse,
  errors: [],
}));

/** Deletes a rule. */
export interface DeleteProjectsLocationsRepositoriesRulesRequest {
  /** Required. The name of the rule to delete. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/rules/{rulesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesRulesRequest>;

export type DeleteProjectsLocationsRepositoriesRulesResponse = Empty;
export const DeleteProjectsLocationsRepositoriesRulesResponse = Empty;

export type DeleteProjectsLocationsRepositoriesRulesError = CommonErrors;

export const deleteProjectsLocationsRepositoriesRules: API.OperationMethod<DeleteProjectsLocationsRepositoriesRulesRequest, DeleteProjectsLocationsRepositoriesRulesResponse, DeleteProjectsLocationsRepositoriesRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesRulesRequest,
  output: DeleteProjectsLocationsRepositoriesRulesResponse,
  errors: [],
}));

/** Lists rules. */
export interface ListProjectsLocationsRepositoriesRulesRequest {
  /** Required. The name of the parent repository whose rules will be listed. For example: `projects/p1/locations/us-central1/repositories/repo1`. */
  parent: string;
  /** The maximum number of rules to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesRulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/rules" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesRulesRequest>;

export type ListProjectsLocationsRepositoriesRulesResponse = ListRulesResponse;
export const ListProjectsLocationsRepositoriesRulesResponse = ListRulesResponse;

export type ListProjectsLocationsRepositoriesRulesError = CommonErrors;

export const listProjectsLocationsRepositoriesRules = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesRulesRequest,
  output: ListProjectsLocationsRepositoriesRulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Directly uploads a Generic artifact. The returned operation will complete once the resources are uploaded. Package, version, and file resources are created based on the uploaded artifact. Uploaded artifacts that conflict with existing resources will raise an `ALREADY_EXISTS` error. */
export interface UploadProjectsLocationsRepositoriesGenericArtifactsRequest {
  /** The resource name of the repository where the generic artifact will be uploaded. */
  parent: string;
  /** Request body */
  body?: UploadGenericArtifactRequest;
}

export const UploadProjectsLocationsRepositoriesGenericArtifactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UploadGenericArtifactRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/genericArtifacts:create", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadProjectsLocationsRepositoriesGenericArtifactsRequest>;

export type UploadProjectsLocationsRepositoriesGenericArtifactsResponse = UploadGenericArtifactMediaResponse;
export const UploadProjectsLocationsRepositoriesGenericArtifactsResponse = UploadGenericArtifactMediaResponse;

export type UploadProjectsLocationsRepositoriesGenericArtifactsError = CommonErrors;

export const uploadProjectsLocationsRepositoriesGenericArtifacts: API.OperationMethod<UploadProjectsLocationsRepositoriesGenericArtifactsRequest, UploadProjectsLocationsRepositoriesGenericArtifactsResponse, UploadProjectsLocationsRepositoriesGenericArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadProjectsLocationsRepositoriesGenericArtifactsRequest,
  output: UploadProjectsLocationsRepositoriesGenericArtifactsResponse,
  errors: [],
}));

/** Imports GooGet artifacts. The returned Operation will complete once the resources are imported. Package, Version, and File resources are created based on the imported artifacts. Imported artifacts that conflict with existing resources are ignored. */
export interface ImportProjectsLocationsRepositoriesGoogetArtifactsRequest {
  /** The name of the parent resource where the artifacts will be imported. */
  parent: string;
  /** Request body */
  body?: ImportGoogetArtifactsRequest;
}

export const ImportProjectsLocationsRepositoriesGoogetArtifactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ImportGoogetArtifactsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/googetArtifacts:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsRepositoriesGoogetArtifactsRequest>;

export type ImportProjectsLocationsRepositoriesGoogetArtifactsResponse = Operation;
export const ImportProjectsLocationsRepositoriesGoogetArtifactsResponse = Operation;

export type ImportProjectsLocationsRepositoriesGoogetArtifactsError = CommonErrors;

export const importProjectsLocationsRepositoriesGoogetArtifacts: API.OperationMethod<ImportProjectsLocationsRepositoriesGoogetArtifactsRequest, ImportProjectsLocationsRepositoriesGoogetArtifactsResponse, ImportProjectsLocationsRepositoriesGoogetArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsRepositoriesGoogetArtifactsRequest,
  output: ImportProjectsLocationsRepositoriesGoogetArtifactsResponse,
  errors: [],
}));

/** Directly uploads a GooGet artifact. The returned Operation will complete once the resources are uploaded. Package, Version, and File resources are created based on the imported artifact. Imported artifacts that conflict with existing resources are ignored. */
export interface UploadProjectsLocationsRepositoriesGoogetArtifactsRequest {
  /** The name of the parent resource where the artifacts will be uploaded. */
  parent: string;
  /** Request body */
  body?: UploadGoogetArtifactRequest;
}

export const UploadProjectsLocationsRepositoriesGoogetArtifactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UploadGoogetArtifactRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/googetArtifacts:create", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadProjectsLocationsRepositoriesGoogetArtifactsRequest>;

export type UploadProjectsLocationsRepositoriesGoogetArtifactsResponse = UploadGoogetArtifactMediaResponse;
export const UploadProjectsLocationsRepositoriesGoogetArtifactsResponse = UploadGoogetArtifactMediaResponse;

export type UploadProjectsLocationsRepositoriesGoogetArtifactsError = CommonErrors;

export const uploadProjectsLocationsRepositoriesGoogetArtifacts: API.OperationMethod<UploadProjectsLocationsRepositoriesGoogetArtifactsRequest, UploadProjectsLocationsRepositoriesGoogetArtifactsResponse, UploadProjectsLocationsRepositoriesGoogetArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadProjectsLocationsRepositoriesGoogetArtifactsRequest,
  output: UploadProjectsLocationsRepositoriesGoogetArtifactsResponse,
  errors: [],
}));

/** Lists packages. */
export interface ListProjectsLocationsRepositoriesPackagesRequest {
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
  /** Optional. An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: * `name` * `annotations` Examples of using a filter: To filter the results of your request to packages with the name `my-package` in project `my-project` in the `us-central` region, in repository `my-repo`, append the following filter expression to your request: * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package"` You can also use wildcards to match any number of characters before or after the value: * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-*"` * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/*package"` * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/*pack*"` To filter the results of your request to packages with the annotation key-value pair [`external_link`: `external_link_value`], append the following filter expression to your request": * `"annotations.external_link:external_link_value"` To filter the results just for a specific annotation key `external_link`, append the following filter expression to your request: * `"annotations.external_link"` If the annotation key or value contains special characters, you can escape them by surrounding the value with backticks. For example, to filter the results of your request to packages with the annotation key-value pair [`external.link`:`https://example.com/my-package`], append the following filter expression to your request: * `` "annotations.`external.link`:`https://example.com/my-package`" `` You can also filter with annotations with a wildcard to match any number of characters before or after the value: * `` "annotations.*_link:`*example.com*`" `` */
  filter?: string;
  /** Optional. The field to order the results by. */
  orderBy?: string;
  /** The maximum number of packages to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** Required. The name of the parent resource whose packages will be listed. */
  parent: string;
}

export const ListProjectsLocationsRepositoriesPackagesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesPackagesRequest>;

export type ListProjectsLocationsRepositoriesPackagesResponse = ListPackagesResponse;
export const ListProjectsLocationsRepositoriesPackagesResponse = ListPackagesResponse;

export type ListProjectsLocationsRepositoriesPackagesError = CommonErrors;

export const listProjectsLocationsRepositoriesPackages = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesPackagesRequest,
  output: ListProjectsLocationsRepositoriesPackagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a package. */
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
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesPackagesRequest>;

export type PatchProjectsLocationsRepositoriesPackagesResponse = Package;
export const PatchProjectsLocationsRepositoriesPackagesResponse = Package;

export type PatchProjectsLocationsRepositoriesPackagesError = CommonErrors;

export const patchProjectsLocationsRepositoriesPackages: API.OperationMethod<PatchProjectsLocationsRepositoriesPackagesRequest, PatchProjectsLocationsRepositoriesPackagesResponse, PatchProjectsLocationsRepositoriesPackagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesPackagesRequest,
  output: PatchProjectsLocationsRepositoriesPackagesResponse,
  errors: [],
}));

/** Gets a package. */
export interface GetProjectsLocationsRepositoriesPackagesRequest {
  /** Required. The name of the package to retrieve. */
  name: string;
}

export const GetProjectsLocationsRepositoriesPackagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesPackagesRequest>;

export type GetProjectsLocationsRepositoriesPackagesResponse = Package;
export const GetProjectsLocationsRepositoriesPackagesResponse = Package;

export type GetProjectsLocationsRepositoriesPackagesError = CommonErrors;

export const getProjectsLocationsRepositoriesPackages: API.OperationMethod<GetProjectsLocationsRepositoriesPackagesRequest, GetProjectsLocationsRepositoriesPackagesResponse, GetProjectsLocationsRepositoriesPackagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesPackagesRequest,
  output: GetProjectsLocationsRepositoriesPackagesResponse,
  errors: [],
}));

/** Deletes a package and all of its versions and tags. The returned operation will complete once the package has been deleted. */
export interface DeleteProjectsLocationsRepositoriesPackagesRequest {
  /** Required. The name of the package to delete. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesPackagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesPackagesRequest>;

export type DeleteProjectsLocationsRepositoriesPackagesResponse = Operation;
export const DeleteProjectsLocationsRepositoriesPackagesResponse = Operation;

export type DeleteProjectsLocationsRepositoriesPackagesError = CommonErrors;

export const deleteProjectsLocationsRepositoriesPackages: API.OperationMethod<DeleteProjectsLocationsRepositoriesPackagesRequest, DeleteProjectsLocationsRepositoriesPackagesResponse, DeleteProjectsLocationsRepositoriesPackagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesPackagesRequest,
  output: DeleteProjectsLocationsRepositoriesPackagesResponse,
  errors: [],
}));

/** Updates a tag. */
export interface PatchProjectsLocationsRepositoriesPackagesTagsRequest {
  /** The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** The name of the tag, for example: "projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/tags/tag1". If the package part contains slashes, the slashes are escaped. The tag part can only have characters in [a-zA-Z0-9\-._~:@], anything else must be URL encoded. */
  name: string;
  /** Request body */
  body?: Tag;
}

export const PatchProjectsLocationsRepositoriesPackagesTagsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Tag).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/tags/{tagsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesPackagesTagsRequest>;

export type PatchProjectsLocationsRepositoriesPackagesTagsResponse = Tag;
export const PatchProjectsLocationsRepositoriesPackagesTagsResponse = Tag;

export type PatchProjectsLocationsRepositoriesPackagesTagsError = CommonErrors;

export const patchProjectsLocationsRepositoriesPackagesTags: API.OperationMethod<PatchProjectsLocationsRepositoriesPackagesTagsRequest, PatchProjectsLocationsRepositoriesPackagesTagsResponse, PatchProjectsLocationsRepositoriesPackagesTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesPackagesTagsRequest,
  output: PatchProjectsLocationsRepositoriesPackagesTagsResponse,
  errors: [],
}));

/** Lists tags. */
export interface ListProjectsLocationsRepositoriesPackagesTagsRequest {
  /** The maximum number of tags to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: * `name` * `version` Examples of using a filter: To filter the results of your request to tags with the name `my-tag` in package `my-package` in repository `my-repo` in project "`y-project` in the us-central region, append the following filter expression to your request: * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/tags/my-tag"` You can also use wildcards to match any number of characters before or after the value: * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/tags/my*"` * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/tags/*tag"` * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/tags/*tag*"` To filter the results of your request to tags applied to the version `1.0` in package `my-package`, append the following filter expression to your request: * `version="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/versions/1.0"` */
  filter?: string;
  /** The name of the parent package whose tags will be listed. For example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1`. */
  parent: string;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesPackagesTagsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/tags" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesPackagesTagsRequest>;

export type ListProjectsLocationsRepositoriesPackagesTagsResponse = ListTagsResponse;
export const ListProjectsLocationsRepositoriesPackagesTagsResponse = ListTagsResponse;

export type ListProjectsLocationsRepositoriesPackagesTagsError = CommonErrors;

export const listProjectsLocationsRepositoriesPackagesTags = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesPackagesTagsRequest,
  output: ListProjectsLocationsRepositoriesPackagesTagsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a tag. */
export interface GetProjectsLocationsRepositoriesPackagesTagsRequest {
  /** The name of the tag to retrieve. */
  name: string;
}

export const GetProjectsLocationsRepositoriesPackagesTagsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/tags/{tagsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesPackagesTagsRequest>;

export type GetProjectsLocationsRepositoriesPackagesTagsResponse = Tag;
export const GetProjectsLocationsRepositoriesPackagesTagsResponse = Tag;

export type GetProjectsLocationsRepositoriesPackagesTagsError = CommonErrors;

export const getProjectsLocationsRepositoriesPackagesTags: API.OperationMethod<GetProjectsLocationsRepositoriesPackagesTagsRequest, GetProjectsLocationsRepositoriesPackagesTagsResponse, GetProjectsLocationsRepositoriesPackagesTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesPackagesTagsRequest,
  output: GetProjectsLocationsRepositoriesPackagesTagsResponse,
  errors: [],
}));

/** Deletes a tag. */
export interface DeleteProjectsLocationsRepositoriesPackagesTagsRequest {
  /** The name of the tag to delete. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesPackagesTagsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/tags/{tagsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesPackagesTagsRequest>;

export type DeleteProjectsLocationsRepositoriesPackagesTagsResponse = Empty;
export const DeleteProjectsLocationsRepositoriesPackagesTagsResponse = Empty;

export type DeleteProjectsLocationsRepositoriesPackagesTagsError = CommonErrors;

export const deleteProjectsLocationsRepositoriesPackagesTags: API.OperationMethod<DeleteProjectsLocationsRepositoriesPackagesTagsRequest, DeleteProjectsLocationsRepositoriesPackagesTagsResponse, DeleteProjectsLocationsRepositoriesPackagesTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesPackagesTagsRequest,
  output: DeleteProjectsLocationsRepositoriesPackagesTagsResponse,
  errors: [],
}));

/** Creates a tag. */
export interface CreateProjectsLocationsRepositoriesPackagesTagsRequest {
  /** The tag id to use for this repository. */
  tagId?: string;
  /** The name of the parent resource where the tag will be created. */
  parent: string;
  /** Request body */
  body?: Tag;
}

export const CreateProjectsLocationsRepositoriesPackagesTagsRequest = Schema.Struct({
  tagId: Schema.optional(Schema.String).pipe(T.HttpQuery("tagId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Tag).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/tags", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesPackagesTagsRequest>;

export type CreateProjectsLocationsRepositoriesPackagesTagsResponse = Tag;
export const CreateProjectsLocationsRepositoriesPackagesTagsResponse = Tag;

export type CreateProjectsLocationsRepositoriesPackagesTagsError = CommonErrors;

export const createProjectsLocationsRepositoriesPackagesTags: API.OperationMethod<CreateProjectsLocationsRepositoriesPackagesTagsRequest, CreateProjectsLocationsRepositoriesPackagesTagsResponse, CreateProjectsLocationsRepositoriesPackagesTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesPackagesTagsRequest,
  output: CreateProjectsLocationsRepositoriesPackagesTagsResponse,
  errors: [],
}));

/** Deletes multiple versions across a repository. The returned operation will complete once the versions have been deleted. */
export interface BatchDeleteProjectsLocationsRepositoriesPackagesVersionsRequest {
  /** The name of the repository holding all requested versions. */
  parent: string;
  /** Request body */
  body?: BatchDeleteVersionsRequest;
}

export const BatchDeleteProjectsLocationsRepositoriesPackagesVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchDeleteVersionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/versions:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteProjectsLocationsRepositoriesPackagesVersionsRequest>;

export type BatchDeleteProjectsLocationsRepositoriesPackagesVersionsResponse = Operation;
export const BatchDeleteProjectsLocationsRepositoriesPackagesVersionsResponse = Operation;

export type BatchDeleteProjectsLocationsRepositoriesPackagesVersionsError = CommonErrors;

export const batchDeleteProjectsLocationsRepositoriesPackagesVersions: API.OperationMethod<BatchDeleteProjectsLocationsRepositoriesPackagesVersionsRequest, BatchDeleteProjectsLocationsRepositoriesPackagesVersionsResponse, BatchDeleteProjectsLocationsRepositoriesPackagesVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteProjectsLocationsRepositoriesPackagesVersionsRequest,
  output: BatchDeleteProjectsLocationsRepositoriesPackagesVersionsResponse,
  errors: [],
}));

/** Lists versions. */
export interface ListProjectsLocationsRepositoriesPackagesVersionsRequest {
  /** The maximum number of versions to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
  /** The name of the parent resource whose versions will be listed. */
  parent: string;
  /** Optional. The field to order the results by. */
  orderBy?: string;
  /** The view that should be returned in the response. */
  view?: "VERSION_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Optional. An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: * `name` * `annotations` Examples of using a filter: To filter the results of your request to versions with the name `my-version` in project `my-project` in the `us-central` region, in repository `my-repo`, append the following filter expression to your request: * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/versions/my-version"` You can also use wildcards to match any number of characters before or after the value: * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/versions/*version"` * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/versions/my*"` * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/versions/*version*"` To filter the results of your request to versions with the annotation key-value pair [`external_link`: `external_link_value`], append the following filter expression to your request: * `"annotations.external_link:external_link_value"` To filter just for a specific annotation key `external_link`, append the following filter expression to your request: * `"annotations.external_link"` If the annotation key or value contains special characters, you can escape them by surrounding the value with backticks. For example, to filter the results of your request to versions with the annotation key-value pair [`external.link`:`https://example.com/my-version`], append the following filter expression to your request: * `` "annotations.`external.link`:`https://example.com/my-version`" `` You can also filter with annotations with a wildcard to match any number of characters before or after the value: * `` "annotations.*_link:`*example.com*`" `` */
  filter?: string;
}

export const ListProjectsLocationsRepositoriesPackagesVersionsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesPackagesVersionsRequest>;

export type ListProjectsLocationsRepositoriesPackagesVersionsResponse = ListVersionsResponse;
export const ListProjectsLocationsRepositoriesPackagesVersionsResponse = ListVersionsResponse;

export type ListProjectsLocationsRepositoriesPackagesVersionsError = CommonErrors;

export const listProjectsLocationsRepositoriesPackagesVersions = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesPackagesVersionsRequest,
  output: ListProjectsLocationsRepositoriesPackagesVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a version and all of its content. The returned operation will complete once the version has been deleted. */
export interface DeleteProjectsLocationsRepositoriesPackagesVersionsRequest {
  /** By default, a version that is tagged may not be deleted. If force=true, the version and any tags pointing to the version are deleted. */
  force?: boolean;
  /** The name of the version to delete. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesPackagesVersionsRequest = Schema.Struct({
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesPackagesVersionsRequest>;

export type DeleteProjectsLocationsRepositoriesPackagesVersionsResponse = Operation;
export const DeleteProjectsLocationsRepositoriesPackagesVersionsResponse = Operation;

export type DeleteProjectsLocationsRepositoriesPackagesVersionsError = CommonErrors;

export const deleteProjectsLocationsRepositoriesPackagesVersions: API.OperationMethod<DeleteProjectsLocationsRepositoriesPackagesVersionsRequest, DeleteProjectsLocationsRepositoriesPackagesVersionsResponse, DeleteProjectsLocationsRepositoriesPackagesVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesPackagesVersionsRequest,
  output: DeleteProjectsLocationsRepositoriesPackagesVersionsResponse,
  errors: [],
}));

/** Updates a version. */
export interface PatchProjectsLocationsRepositoriesPackagesVersionsRequest {
  /** The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** The name of the version, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/versions/art1`. If the package or version ID parts contain slashes, the slashes are escaped. */
  name: string;
  /** Request body */
  body?: Version;
}

export const PatchProjectsLocationsRepositoriesPackagesVersionsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Version).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/versions/{versionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesPackagesVersionsRequest>;

export type PatchProjectsLocationsRepositoriesPackagesVersionsResponse = Version;
export const PatchProjectsLocationsRepositoriesPackagesVersionsResponse = Version;

export type PatchProjectsLocationsRepositoriesPackagesVersionsError = CommonErrors;

export const patchProjectsLocationsRepositoriesPackagesVersions: API.OperationMethod<PatchProjectsLocationsRepositoriesPackagesVersionsRequest, PatchProjectsLocationsRepositoriesPackagesVersionsResponse, PatchProjectsLocationsRepositoriesPackagesVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesPackagesVersionsRequest,
  output: PatchProjectsLocationsRepositoriesPackagesVersionsResponse,
  errors: [],
}));

/** Gets a version */
export interface GetProjectsLocationsRepositoriesPackagesVersionsRequest {
  /** The view that should be returned in the response. */
  view?: "VERSION_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** The name of the version to retrieve. */
  name: string;
}

export const GetProjectsLocationsRepositoriesPackagesVersionsRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesPackagesVersionsRequest>;

export type GetProjectsLocationsRepositoriesPackagesVersionsResponse = Version;
export const GetProjectsLocationsRepositoriesPackagesVersionsResponse = Version;

export type GetProjectsLocationsRepositoriesPackagesVersionsError = CommonErrors;

export const getProjectsLocationsRepositoriesPackagesVersions: API.OperationMethod<GetProjectsLocationsRepositoriesPackagesVersionsRequest, GetProjectsLocationsRepositoriesPackagesVersionsResponse, GetProjectsLocationsRepositoriesPackagesVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesPackagesVersionsRequest,
  output: GetProjectsLocationsRepositoriesPackagesVersionsResponse,
  errors: [],
}));

/** Gets a maven artifact. */
export interface GetProjectsLocationsRepositoriesMavenArtifactsRequest {
  /** Required. The name of the maven artifact. */
  name: string;
}

export const GetProjectsLocationsRepositoriesMavenArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/mavenArtifacts/{mavenArtifactsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesMavenArtifactsRequest>;

export type GetProjectsLocationsRepositoriesMavenArtifactsResponse = MavenArtifact;
export const GetProjectsLocationsRepositoriesMavenArtifactsResponse = MavenArtifact;

export type GetProjectsLocationsRepositoriesMavenArtifactsError = CommonErrors;

export const getProjectsLocationsRepositoriesMavenArtifacts: API.OperationMethod<GetProjectsLocationsRepositoriesMavenArtifactsRequest, GetProjectsLocationsRepositoriesMavenArtifactsResponse, GetProjectsLocationsRepositoriesMavenArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesMavenArtifactsRequest,
  output: GetProjectsLocationsRepositoriesMavenArtifactsResponse,
  errors: [],
}));

/** Lists maven artifacts. */
export interface ListProjectsLocationsRepositoriesMavenArtifactsRequest {
  /** The maximum number of artifacts to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
  /** Required. The name of the parent resource whose maven artifacts will be listed. */
  parent: string;
}

export const ListProjectsLocationsRepositoriesMavenArtifactsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/mavenArtifacts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesMavenArtifactsRequest>;

export type ListProjectsLocationsRepositoriesMavenArtifactsResponse = ListMavenArtifactsResponse;
export const ListProjectsLocationsRepositoriesMavenArtifactsResponse = ListMavenArtifactsResponse;

export type ListProjectsLocationsRepositoriesMavenArtifactsError = CommonErrors;

export const listProjectsLocationsRepositoriesMavenArtifacts = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesMavenArtifactsRequest,
  output: ListProjectsLocationsRepositoriesMavenArtifactsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

