// ==========================================================================
// Cloud Functions API (cloudfunctions v2)
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
  name: "cloudfunctions",
  version: "v2",
  rootUrl: "https://cloudfunctions.googleapis.com/",
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

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

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

export interface AutomaticUpdatePolicy {
}

export const AutomaticUpdatePolicy: Schema.Schema<AutomaticUpdatePolicy> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AutomaticUpdatePolicy" }) as any as Schema.Schema<AutomaticUpdatePolicy>;

export interface OnDeployUpdatePolicy {
  /** Output only. contains the runtime version which was used during latest function deployment. */
  runtimeVersion?: string;
}

export const OnDeployUpdatePolicy: Schema.Schema<OnDeployUpdatePolicy> = Schema.suspend(() => Schema.Struct({
  runtimeVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OnDeployUpdatePolicy" }) as any as Schema.Schema<OnDeployUpdatePolicy>;

export interface StorageSource {
  /** Google Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). */
  bucket?: string;
  /** Google Cloud Storage object containing the source. This object must be a gzipped archive file (`.tar.gz`) containing source to build. */
  object?: string;
  /** Google Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. */
  generation?: string;
  /** When the specified storage bucket is a 1st gen function uploard url bucket, this field should be set as the generated upload url for 1st gen deployment. */
  sourceUploadUrl?: string;
}

export const StorageSource: Schema.Schema<StorageSource> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
  object: Schema.optional(Schema.String),
  generation: Schema.optional(Schema.String),
  sourceUploadUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "StorageSource" }) as any as Schema.Schema<StorageSource>;

export interface RepoSource {
  /** Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax */
  branchName?: string;
  /** Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax */
  tagName?: string;
  /** Explicit commit SHA to build. */
  commitSha?: string;
  /** ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed. */
  projectId?: string;
  /** Name of the Cloud Source Repository. */
  repoName?: string;
  /** Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. eg. helloworld (no leading slash allowed) */
  dir?: string;
}

export const RepoSource: Schema.Schema<RepoSource> = Schema.suspend(() => Schema.Struct({
  branchName: Schema.optional(Schema.String),
  tagName: Schema.optional(Schema.String),
  commitSha: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  repoName: Schema.optional(Schema.String),
  dir: Schema.optional(Schema.String),
})).annotate({ identifier: "RepoSource" }) as any as Schema.Schema<RepoSource>;

export interface Source {
  /** If provided, get the source from this location in Google Cloud Storage. */
  storageSource?: StorageSource;
  /** If provided, get the source from this location in a Cloud Source Repository. */
  repoSource?: RepoSource;
  /** If provided, get the source from GitHub repository. This option is valid only for GCF 1st Gen function. Example: https://github.com///blob// */
  gitUri?: string;
}

export const Source: Schema.Schema<Source> = Schema.suspend(() => Schema.Struct({
  storageSource: Schema.optional(StorageSource),
  repoSource: Schema.optional(RepoSource),
  gitUri: Schema.optional(Schema.String),
})).annotate({ identifier: "Source" }) as any as Schema.Schema<Source>;

export interface SourceProvenance {
  /** A copy of the build's `source.storage_source`, if exists, with any generations resolved. */
  resolvedStorageSource?: StorageSource;
  /** A copy of the build's `source.repo_source`, if exists, with any revisions resolved. */
  resolvedRepoSource?: RepoSource;
  /** A copy of the build's `source.git_uri`, if exists, with any commits resolved. */
  gitUri?: string;
}

export const SourceProvenance: Schema.Schema<SourceProvenance> = Schema.suspend(() => Schema.Struct({
  resolvedStorageSource: Schema.optional(StorageSource),
  resolvedRepoSource: Schema.optional(RepoSource),
  gitUri: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceProvenance" }) as any as Schema.Schema<SourceProvenance>;

export interface BuildConfig {
  automaticUpdatePolicy?: AutomaticUpdatePolicy;
  onDeployUpdatePolicy?: OnDeployUpdatePolicy;
  /** Output only. The Cloud Build name of the latest successful deployment of the function. */
  build?: string;
  /** The runtime in which to run the function. Required when deploying a new function, optional when updating an existing function. For a complete list of possible choices, see the [`gcloud` command reference](https://cloud.google.com/sdk/gcloud/reference/functions/deploy#--runtime). */
  runtime?: string;
  /** The name of the function (as defined in source code) that will be executed. Defaults to the resource name suffix, if not specified. For backward compatibility, if function with given name is not found, then the system will try to use function named "function". For Node.js this is name of a function exported by the module specified in `source_location`. */
  entryPoint?: string;
  /** The location of the function source code. */
  source?: Source;
  /** Output only. A permanent fixed identifier for source. */
  sourceProvenance?: SourceProvenance;
  /** Name of the Cloud Build Custom Worker Pool that should be used to build the function. The format of this field is `projects/{project}/locations/{region}/workerPools/{workerPool}` where {project} and {region} are the project id and region respectively where the worker pool is defined and {workerPool} is the short name of the worker pool. If the project id is not the same as the function, then the Cloud Functions Service Agent (service-@gcf-admin-robot.iam.gserviceaccount.com) must be granted the role Cloud Build Custom Workers Builder (roles/cloudbuild.customworkers.builder) in the project. */
  workerPool?: string;
  /** User-provided build-time environment variables for the function */
  environmentVariables?: Record<string, string>;
  /** Docker Registry to use for this deployment. This configuration is only applicable to 1st Gen functions, 2nd Gen functions can only use Artifact Registry. Deprecated: as of March 2025, `CONTAINER_REGISTRY` option is no longer available in response to Container Registry's deprecation: https://cloud.google.com/artifact-registry/docs/transition/transition-from-gcr Please use Artifact Registry instead, which is the default choice. If unspecified, it defaults to `ARTIFACT_REGISTRY`. If `docker_repository` field is specified, this field should either be left unspecified or set to `ARTIFACT_REGISTRY`. */
  dockerRegistry?: "DOCKER_REGISTRY_UNSPECIFIED" | "CONTAINER_REGISTRY" | "ARTIFACT_REGISTRY" | (string & {});
  /** Repository in Artifact Registry to which the function docker image will be pushed after it is built by Cloud Build. If specified by user, it is created and managed by user with a customer managed encryption key. Otherwise, GCF will create and use a repository named 'gcf-artifacts' for every deployed region. It must match the pattern `projects/{project}/locations/{location}/repositories/{repository}`. Repository format must be 'DOCKER'. */
  dockerRepository?: string;
  /** Service account to be used for building the container. The format of this field is `projects/{projectId}/serviceAccounts/{serviceAccountEmail}`. */
  serviceAccount?: string;
  /** An identifier for Firebase function sources. Disclaimer: This field is only supported for Firebase function deployments. */
  sourceToken?: string;
}

export const BuildConfig: Schema.Schema<BuildConfig> = Schema.suspend(() => Schema.Struct({
  automaticUpdatePolicy: Schema.optional(AutomaticUpdatePolicy),
  onDeployUpdatePolicy: Schema.optional(OnDeployUpdatePolicy),
  build: Schema.optional(Schema.String),
  runtime: Schema.optional(Schema.String),
  entryPoint: Schema.optional(Schema.String),
  source: Schema.optional(Source),
  sourceProvenance: Schema.optional(SourceProvenance),
  workerPool: Schema.optional(Schema.String),
  environmentVariables: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  dockerRegistry: Schema.optional(Schema.String),
  dockerRepository: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  sourceToken: Schema.optional(Schema.String),
})).annotate({ identifier: "BuildConfig" }) as any as Schema.Schema<BuildConfig>;

export interface SecretEnvVar {
  /** Name of the environment variable. */
  key?: string;
  /** Project identifier (preferably project number but can also be the project ID) of the project that contains the secret. If not set, it is assumed that the secret is in the same project as the function. */
  projectId?: string;
  /** Name of the secret in secret manager (not the full resource name). */
  secret?: string;
  /** Version of the secret (version number or the string 'latest'). It is recommended to use a numeric version for secret environment variables as any updates to the secret value is not reflected until new instances start. */
  version?: string;
}

export const SecretEnvVar: Schema.Schema<SecretEnvVar> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  secret: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "SecretEnvVar" }) as any as Schema.Schema<SecretEnvVar>;

export interface SecretVersion {
  /** Version of the secret (version number or the string 'latest'). It is preferable to use `latest` version with secret volumes as secret value changes are reflected immediately. */
  version?: string;
  /** Relative path of the file under the mount path where the secret value for this version will be fetched and made available. For example, setting the mount_path as '/etc/secrets' and path as `secret_foo` would mount the secret value file at `/etc/secrets/secret_foo`. */
  path?: string;
}

export const SecretVersion: Schema.Schema<SecretVersion> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "SecretVersion" }) as any as Schema.Schema<SecretVersion>;

export interface SecretVolume {
  /** The path within the container to mount the secret volume. For example, setting the mount_path as `/etc/secrets` would mount the secret value files under the `/etc/secrets` directory. This directory will also be completely shadowed and unavailable to mount any other secrets. Recommended mount path: /etc/secrets */
  mountPath?: string;
  /** Project identifier (preferably project number but can also be the project ID) of the project that contains the secret. If not set, it is assumed that the secret is in the same project as the function. */
  projectId?: string;
  /** Name of the secret in secret manager (not the full resource name). */
  secret?: string;
  /** List of secret versions to mount for this secret. If empty, the `latest` version of the secret will be made available in a file named after the secret under the mount point. */
  versions?: Array<SecretVersion>;
}

export const SecretVolume: Schema.Schema<SecretVolume> = Schema.suspend(() => Schema.Struct({
  mountPath: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  secret: Schema.optional(Schema.String),
  versions: Schema.optional(Schema.Array(SecretVersion)),
})).annotate({ identifier: "SecretVolume" }) as any as Schema.Schema<SecretVolume>;

export interface DirectVpcNetworkInterface {
  /** Optional. The name of the VPC network to which the function will be connected. Specify either a VPC network or a subnet, or both. If you specify only a network, the subnet uses the same name as the network. */
  network?: string;
  /** Optional. The name of the VPC subnetwork that the Cloud Function resource will get IPs from. Specify either a VPC network or a subnet, or both. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If subnetwork is not specified, the subnetwork with the same name with the network will be used. */
  subnetwork?: string;
  /** Optional. Network tags applied to this Cloud Function resource. */
  tags?: Array<string>;
}

export const DirectVpcNetworkInterface: Schema.Schema<DirectVpcNetworkInterface> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DirectVpcNetworkInterface" }) as any as Schema.Schema<DirectVpcNetworkInterface>;

export interface ServiceConfig {
  /** Output only. Name of the service associated with a Function. The format of this field is `projects/{project}/locations/{region}/services/{service}` */
  service?: string;
  /** The function execution timeout. Execution is considered failed and can be terminated if the function is not completed at the end of the timeout period. Defaults to 60 seconds. */
  timeoutSeconds?: number;
  /** The amount of memory available for a function. Defaults to 256M. Supported units are k, M, G, Mi, Gi. If no unit is supplied the value is interpreted as bytes. See https://github.com/kubernetes/kubernetes/blob/master/staging/src/k8s.io/apimachinery/pkg/api/resource/quantity.go a full description. */
  availableMemory?: string;
  /** The number of CPUs used in a single container instance. Default value is calculated from available memory. Supports the same values as Cloud Run, see https://cloud.google.com/run/docs/reference/rest/v1/Container#resourcerequirements Example: "1" indicates 1 vCPU */
  availableCpu?: string;
  /** Environment variables that shall be available during function execution. */
  environmentVariables?: Record<string, string>;
  /** The limit on the maximum number of function instances that may coexist at a given time. In some cases, such as rapid traffic surges, Cloud Functions may, for a short period of time, create more instances than the specified max instances limit. If your function cannot tolerate this temporary behavior, you may want to factor in a safety margin and set a lower max instances value than your function can tolerate. See the [Max Instances](https://cloud.google.com/functions/docs/max-instances) Guide for more details. */
  maxInstanceCount?: number;
  /** The limit on the minimum number of function instances that may coexist at a given time. Function instances are kept in idle state for a short period after they finished executing the request to reduce cold start time for subsequent requests. Setting a minimum instance count will ensure that the given number of instances are kept running in idle state always. This can help with cold start times when jump in incoming request count occurs after the idle instance would have been stopped in the default case. */
  minInstanceCount?: number;
  /** The Serverless VPC Access connector that this cloud function can connect to. The format of this field is `projects/* /locations/* /connectors/*`. */
  vpcConnector?: string;
  /** The egress settings for the connector, controlling what traffic is diverted through it. */
  vpcConnectorEgressSettings?: "VPC_CONNECTOR_EGRESS_SETTINGS_UNSPECIFIED" | "PRIVATE_RANGES_ONLY" | "ALL_TRAFFIC" | (string & {});
  /** The ingress settings for the function, controlling what traffic can reach it. */
  ingressSettings?: "INGRESS_SETTINGS_UNSPECIFIED" | "ALLOW_ALL" | "ALLOW_INTERNAL_ONLY" | "ALLOW_INTERNAL_AND_GCLB" | (string & {});
  /** Output only. URI of the Service deployed. */
  uri?: string;
  /** The email of the service's service account. If empty, defaults to `{project_number}-compute@developer.gserviceaccount.com`. */
  serviceAccountEmail?: string;
  /** Whether 100% of traffic is routed to the latest revision. On CreateFunction and UpdateFunction, when set to true, the revision being deployed will serve 100% of traffic, ignoring any traffic split settings, if any. On GetFunction, true will be returned if the latest revision is serving 100% of traffic. */
  allTrafficOnLatestRevision?: boolean;
  /** Secret environment variables configuration. */
  secretEnvironmentVariables?: Array<SecretEnvVar>;
  /** Secret volumes configuration. */
  secretVolumes?: Array<SecretVolume>;
  /** Output only. The name of service revision. */
  revision?: string;
  /** Sets the maximum number of concurrent requests that each instance can receive. Defaults to 1. */
  maxInstanceRequestConcurrency?: number;
  /** Security level configure whether the function only accepts https. This configuration is only applicable to 1st Gen functions with Http trigger. By default https is optional for 1st Gen functions; 2nd Gen functions are https ONLY. */
  securityLevel?: "SECURITY_LEVEL_UNSPECIFIED" | "SECURE_ALWAYS" | "SECURE_OPTIONAL" | (string & {});
  /** Optional. The binary authorization policy to be checked when deploying the Cloud Run service. */
  binaryAuthorizationPolicy?: string;
  /** Optional. The Direct VPC network interface for the Cloud Function. Currently only a single Direct VPC is supported. */
  directVpcNetworkInterface?: Array<DirectVpcNetworkInterface>;
  /** Optional. Egress settings for direct VPC. If not provided, it defaults to VPC_EGRESS_PRIVATE_RANGES_ONLY. */
  directVpcEgress?: "DIRECT_VPC_EGRESS_UNSPECIFIED" | "VPC_EGRESS_PRIVATE_RANGES_ONLY" | "VPC_EGRESS_ALL_TRAFFIC" | (string & {});
}

export const ServiceConfig: Schema.Schema<ServiceConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  timeoutSeconds: Schema.optional(Schema.Number),
  availableMemory: Schema.optional(Schema.String),
  availableCpu: Schema.optional(Schema.String),
  environmentVariables: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  maxInstanceCount: Schema.optional(Schema.Number),
  minInstanceCount: Schema.optional(Schema.Number),
  vpcConnector: Schema.optional(Schema.String),
  vpcConnectorEgressSettings: Schema.optional(Schema.String),
  ingressSettings: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  serviceAccountEmail: Schema.optional(Schema.String),
  allTrafficOnLatestRevision: Schema.optional(Schema.Boolean),
  secretEnvironmentVariables: Schema.optional(Schema.Array(SecretEnvVar)),
  secretVolumes: Schema.optional(Schema.Array(SecretVolume)),
  revision: Schema.optional(Schema.String),
  maxInstanceRequestConcurrency: Schema.optional(Schema.Number),
  securityLevel: Schema.optional(Schema.String),
  binaryAuthorizationPolicy: Schema.optional(Schema.String),
  directVpcNetworkInterface: Schema.optional(Schema.Array(DirectVpcNetworkInterface)),
  directVpcEgress: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceConfig" }) as any as Schema.Schema<ServiceConfig>;

export interface EventFilter {
  /** Required. The name of a CloudEvents attribute. */
  attribute?: string;
  /** Required. The value for the attribute. */
  value?: string;
  /** Optional. The operator used for matching the events with the value of the filter. If not specified, only events that have an exact key-value pair specified in the filter are matched. The only allowed value is `match-path-pattern`. */
  operator?: string;
}

export const EventFilter: Schema.Schema<EventFilter> = Schema.suspend(() => Schema.Struct({
  attribute: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  operator: Schema.optional(Schema.String),
})).annotate({ identifier: "EventFilter" }) as any as Schema.Schema<EventFilter>;

export interface EventTrigger {
  /** Output only. The resource name of the Eventarc trigger. The format of this field is `projects/{project}/locations/{region}/triggers/{trigger}`. */
  trigger?: string;
  /** The region that the trigger will be in. The trigger will only receive events originating in this region. It can be the same region as the function, a different region or multi-region, or the global region. If not provided, defaults to the same region as the function. */
  triggerRegion?: string;
  /** Required. The type of event to observe. For example: `google.cloud.audit.log.v1.written` or `google.cloud.pubsub.topic.v1.messagePublished`. */
  eventType?: string;
  /** Criteria used to filter events. */
  eventFilters?: Array<EventFilter>;
  /** Optional. The name of a Pub/Sub topic in the same project that will be used as the transport topic for the event delivery. Format: `projects/{project}/topics/{topic}`. This is only valid for events of type `google.cloud.pubsub.topic.v1.messagePublished`. The topic provided here will not be deleted at function deletion. */
  pubsubTopic?: string;
  /** Optional. The email of the trigger's service account. The service account must have permission to invoke Cloud Run services, the permission is `run.routes.invoke`. If empty, defaults to the Compute Engine default service account: `{project_number}-compute@developer.gserviceaccount.com`. */
  serviceAccountEmail?: string;
  /** Optional. If unset, then defaults to ignoring failures (i.e. not retrying them). */
  retryPolicy?: "RETRY_POLICY_UNSPECIFIED" | "RETRY_POLICY_DO_NOT_RETRY" | "RETRY_POLICY_RETRY" | (string & {});
  /** Optional. The name of the channel associated with the trigger in `projects/{project}/locations/{location}/channels/{channel}` format. You must provide a channel to receive events from Eventarc SaaS partners. */
  channel?: string;
  /** Optional. The hostname of the service that 1st Gen function should be observed. If no string is provided, the default service implementing the API will be used. For example, `storage.googleapis.com` is the default for all event types in the `google.storage` namespace. The field is only applicable to 1st Gen functions. */
  service?: string;
}

export const EventTrigger: Schema.Schema<EventTrigger> = Schema.suspend(() => Schema.Struct({
  trigger: Schema.optional(Schema.String),
  triggerRegion: Schema.optional(Schema.String),
  eventType: Schema.optional(Schema.String),
  eventFilters: Schema.optional(Schema.Array(EventFilter)),
  pubsubTopic: Schema.optional(Schema.String),
  serviceAccountEmail: Schema.optional(Schema.String),
  retryPolicy: Schema.optional(Schema.String),
  channel: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "EventTrigger" }) as any as Schema.Schema<EventTrigger>;

export interface GoogleCloudFunctionsV2StateMessage {
  /** Severity of the state message. */
  severity?: "SEVERITY_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO" | (string & {});
  /** One-word CamelCase type of the state message. */
  type?: string;
  /** The message. */
  message?: string;
}

export const GoogleCloudFunctionsV2StateMessage: Schema.Schema<GoogleCloudFunctionsV2StateMessage> = Schema.suspend(() => Schema.Struct({
  severity: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudFunctionsV2StateMessage" }) as any as Schema.Schema<GoogleCloudFunctionsV2StateMessage>;

export interface UpgradeInfo {
  /** UpgradeState of the function */
  upgradeState?: "UPGRADE_STATE_UNSPECIFIED" | "ELIGIBLE_FOR_2ND_GEN_UPGRADE" | "INELIGIBLE_FOR_UPGRADE_UNTIL_REDEPLOYMENT" | "UPGRADE_OPERATION_IN_PROGRESS" | "SETUP_FUNCTION_UPGRADE_CONFIG_SUCCESSFUL" | "SETUP_FUNCTION_UPGRADE_CONFIG_ERROR" | "ABORT_FUNCTION_UPGRADE_ERROR" | "REDIRECT_FUNCTION_UPGRADE_TRAFFIC_SUCCESSFUL" | "REDIRECT_FUNCTION_UPGRADE_TRAFFIC_ERROR" | "ROLLBACK_FUNCTION_UPGRADE_TRAFFIC_ERROR" | "COMMIT_FUNCTION_UPGRADE_ERROR" | "COMMIT_FUNCTION_UPGRADE_ERROR_ROLLBACK_SAFE" | "COMMIT_FUNCTION_UPGRADE_AS_GEN2_SUCCESSFUL" | "COMMIT_FUNCTION_UPGRADE_AS_GEN2_ERROR" | (string & {});
  /** Describes the Cloud Run service which has been setup to prepare for 2nd gen upgrade. */
  serviceConfig?: ServiceConfig;
  /** Describes the Event trigger which has been setup to prepare for 2nd gen upgrade. */
  eventTrigger?: EventTrigger;
  /** Describes the Build step of the function that builds a container to prepare for 2nd gen upgrade. */
  buildConfig?: BuildConfig;
}

export const UpgradeInfo: Schema.Schema<UpgradeInfo> = Schema.suspend(() => Schema.Struct({
  upgradeState: Schema.optional(Schema.String),
  serviceConfig: Schema.optional(ServiceConfig),
  eventTrigger: Schema.optional(EventTrigger),
  buildConfig: Schema.optional(BuildConfig),
})).annotate({ identifier: "UpgradeInfo" }) as any as Schema.Schema<UpgradeInfo>;

export interface Cloudfunctions_Function {
  /** A user-defined name of the function. Function names must be unique globally and match pattern `projects/* /locations/* /functions/*` */
  name?: string;
  /** User-provided description of a function. */
  description?: string;
  /** Describes the Build step of the function that builds a container from the given source. */
  buildConfig?: BuildConfig;
  /** Describes the Service being deployed. Currently deploys services to Cloud Run (fully managed). */
  serviceConfig?: ServiceConfig;
  /** An Eventarc trigger managed by Google Cloud Functions that fires events in response to a condition in another service. */
  eventTrigger?: EventTrigger;
  /** Output only. State of the function. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "FAILED" | "DEPLOYING" | "DELETING" | "UNKNOWN" | "DETACHING" | "DETACH_FAILED" | (string & {});
  /** Output only. The last update timestamp of a Cloud Function. */
  updateTime?: string;
  /** Labels associated with this Cloud Function. */
  labels?: Record<string, string>;
  /** Output only. State Messages for this Cloud Function. */
  stateMessages?: Array<GoogleCloudFunctionsV2StateMessage>;
  /** Describe whether the function is 1st Gen or 2nd Gen. */
  environment?: "ENVIRONMENT_UNSPECIFIED" | "GEN_1" | "GEN_2" | (string & {});
  /** Output only. UpgradeInfo for this Cloud Function */
  upgradeInfo?: UpgradeInfo;
  /** Output only. The deployed url for the function. */
  url?: string;
  /** Resource name of a KMS crypto key (managed by the user) used to encrypt/decrypt function resources. It must match the pattern `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. */
  kmsKeyName?: string;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. The create timestamp of a Cloud Function. This is only applicable to 2nd Gen functions. */
  createTime?: string;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
}

export const Cloudfunctions_Function: Schema.Schema<Cloudfunctions_Function> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  buildConfig: Schema.optional(BuildConfig),
  serviceConfig: Schema.optional(ServiceConfig),
  eventTrigger: Schema.optional(EventTrigger),
  state: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  stateMessages: Schema.optional(Schema.Array(GoogleCloudFunctionsV2StateMessage)),
  environment: Schema.optional(Schema.String),
  upgradeInfo: Schema.optional(UpgradeInfo),
  url: Schema.optional(Schema.String),
  kmsKeyName: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  satisfiesPzi: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Cloudfunctions_Function" }) as any as Schema.Schema<Cloudfunctions_Function>;

export interface ListFunctionsResponse {
  /** The functions that match the request. */
  functions?: Array<Cloudfunctions_Function>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. The response does not include any functions from these locations. */
  unreachable?: Array<string>;
}

export const ListFunctionsResponse: Schema.Schema<ListFunctionsResponse> = Schema.suspend(() => Schema.Struct({
  functions: Schema.optional(Schema.Array(Cloudfunctions_Function)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListFunctionsResponse" }) as any as Schema.Schema<ListFunctionsResponse>;

export interface BuildConfigOverrides {
  /** Optional. Specifies the desired runtime for the new Cloud Run function. (e.g., `"nodejs20"`, `"python312"`). Constraints: 1. This field CANNOT be used to change the runtime language (e.g., from `NODEJS` to `PYTHON`). The backend will enforce this. 2. This field can ONLY be used to upgrade the runtime version (e.g., `nodejs18` to `nodejs20`). Downgrading the version is not permitted. The backend will validate the version change. If provided and valid, this overrides the runtime of the Gen1 function. */
  runtime?: string;
}

export const BuildConfigOverrides: Schema.Schema<BuildConfigOverrides> = Schema.suspend(() => Schema.Struct({
  runtime: Schema.optional(Schema.String),
})).annotate({ identifier: "BuildConfigOverrides" }) as any as Schema.Schema<BuildConfigOverrides>;

export interface ServiceConfigOverrides {
  /** Optional. Specifies the maximum number of instances for the new Cloud Run function. If provided, this overrides the max_instance_count setting of the Gen1 function. */
  maxInstanceCount?: number;
}

export const ServiceConfigOverrides: Schema.Schema<ServiceConfigOverrides> = Schema.suspend(() => Schema.Struct({
  maxInstanceCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "ServiceConfigOverrides" }) as any as Schema.Schema<ServiceConfigOverrides>;

export interface SetupFunctionUpgradeConfigRequest {
  /** Optional. The trigger's service account. The service account must have permission to invoke Cloud Run services, the permission is `run.routes.invoke`. If empty, defaults to the Compute Engine default service account: `{project_number}-compute@developer.gserviceaccount.com`. */
  triggerServiceAccount?: string;
  /** Optional. Specifies overrides for the build process. */
  buildConfigOverrides?: BuildConfigOverrides;
  /** Optional. Specifies overrides for the service configuration. */
  serviceConfigOverrides?: ServiceConfigOverrides;
}

export const SetupFunctionUpgradeConfigRequest: Schema.Schema<SetupFunctionUpgradeConfigRequest> = Schema.suspend(() => Schema.Struct({
  triggerServiceAccount: Schema.optional(Schema.String),
  buildConfigOverrides: Schema.optional(BuildConfigOverrides),
  serviceConfigOverrides: Schema.optional(ServiceConfigOverrides),
})).annotate({ identifier: "SetupFunctionUpgradeConfigRequest" }) as any as Schema.Schema<SetupFunctionUpgradeConfigRequest>;

export interface AbortFunctionUpgradeRequest {
}

export const AbortFunctionUpgradeRequest: Schema.Schema<AbortFunctionUpgradeRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AbortFunctionUpgradeRequest" }) as any as Schema.Schema<AbortFunctionUpgradeRequest>;

export interface RedirectFunctionUpgradeTrafficRequest {
}

export const RedirectFunctionUpgradeTrafficRequest: Schema.Schema<RedirectFunctionUpgradeTrafficRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RedirectFunctionUpgradeTrafficRequest" }) as any as Schema.Schema<RedirectFunctionUpgradeTrafficRequest>;

export interface RollbackFunctionUpgradeTrafficRequest {
}

export const RollbackFunctionUpgradeTrafficRequest: Schema.Schema<RollbackFunctionUpgradeTrafficRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RollbackFunctionUpgradeTrafficRequest" }) as any as Schema.Schema<RollbackFunctionUpgradeTrafficRequest>;

export interface CommitFunctionUpgradeRequest {
}

export const CommitFunctionUpgradeRequest: Schema.Schema<CommitFunctionUpgradeRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CommitFunctionUpgradeRequest" }) as any as Schema.Schema<CommitFunctionUpgradeRequest>;

export interface CommitFunctionUpgradeAsGen2Request {
}

export const CommitFunctionUpgradeAsGen2Request: Schema.Schema<CommitFunctionUpgradeAsGen2Request> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CommitFunctionUpgradeAsGen2Request" }) as any as Schema.Schema<CommitFunctionUpgradeAsGen2Request>;

export interface GenerateUploadUrlRequest {
  /** Resource name of a KMS crypto key (managed by the user) used to encrypt/decrypt function source code objects in intermediate Cloud Storage buckets. When you generate an upload url and upload your source code, it gets copied to an intermediate Cloud Storage bucket. The source code is then copied to a versioned directory in the sources bucket in the consumer project during the function deployment. It must match the pattern `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. The Google Cloud Functions service account (service-{project_number}@gcf-admin-robot.iam.gserviceaccount.com) must be granted the role 'Cloud KMS CryptoKey Encrypter/Decrypter (roles/cloudkms.cryptoKeyEncrypterDecrypter)' on the Key/KeyRing/Project/Organization (least access preferred). */
  kmsKeyName?: string;
  /** The function environment the generated upload url will be used for. The upload url for 2nd Gen functions can also be used for 1st gen functions, but not vice versa. If not specified, 2nd generation-style upload URLs are generated. */
  environment?: "ENVIRONMENT_UNSPECIFIED" | "GEN_1" | "GEN_2" | (string & {});
}

export const GenerateUploadUrlRequest: Schema.Schema<GenerateUploadUrlRequest> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
})).annotate({ identifier: "GenerateUploadUrlRequest" }) as any as Schema.Schema<GenerateUploadUrlRequest>;

export interface GenerateUploadUrlResponse {
  /** The generated Google Cloud Storage signed URL that should be used for a function source code upload. The uploaded file should be a zip archive which contains a function. */
  uploadUrl?: string;
  /** The location of the source code in the upload bucket. Once the archive is uploaded using the `upload_url` use this field to set the `function.build_config.source.storage_source` during CreateFunction and UpdateFunction. Generation defaults to 0, as Cloud Storage provides a new generation only upon uploading a new object or version of an object. */
  storageSource?: StorageSource;
}

export const GenerateUploadUrlResponse: Schema.Schema<GenerateUploadUrlResponse> = Schema.suspend(() => Schema.Struct({
  uploadUrl: Schema.optional(Schema.String),
  storageSource: Schema.optional(StorageSource),
})).annotate({ identifier: "GenerateUploadUrlResponse" }) as any as Schema.Schema<GenerateUploadUrlResponse>;

export interface GenerateDownloadUrlRequest {
}

export const GenerateDownloadUrlRequest: Schema.Schema<GenerateDownloadUrlRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GenerateDownloadUrlRequest" }) as any as Schema.Schema<GenerateDownloadUrlRequest>;

export interface GenerateDownloadUrlResponse {
  /** The generated Google Cloud Storage signed URL that should be used for function source code download. */
  downloadUrl?: string;
}

export const GenerateDownloadUrlResponse: Schema.Schema<GenerateDownloadUrlResponse> = Schema.suspend(() => Schema.Struct({
  downloadUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "GenerateDownloadUrlResponse" }) as any as Schema.Schema<GenerateDownloadUrlResponse>;

export interface Cloudfunctions_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Cloudfunctions_Date: Schema.Schema<Cloudfunctions_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Cloudfunctions_Date" }) as any as Schema.Schema<Cloudfunctions_Date>;

export interface Runtime {
  /** The name of the runtime, e.g., 'go113', 'nodejs12', etc. */
  name?: string;
  /** The user facing name, eg 'Go 1.13', 'Node.js 12', etc. */
  displayName?: string;
  /** The stage of life this runtime is in, e.g., BETA, GA, etc. */
  stage?: "RUNTIME_STAGE_UNSPECIFIED" | "DEVELOPMENT" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | "DECOMMISSIONED" | (string & {});
  /** Warning messages, e.g., a deprecation warning. */
  warnings?: Array<string>;
  /** The environment for the runtime. */
  environment?: "ENVIRONMENT_UNSPECIFIED" | "GEN_1" | "GEN_2" | (string & {});
  /** Deprecation date for the runtime. */
  deprecationDate?: Cloudfunctions_Date;
  /** Decommission date for the runtime. */
  decommissionDate?: Cloudfunctions_Date;
}

export const Runtime: Schema.Schema<Runtime> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  stage: Schema.optional(Schema.String),
  warnings: Schema.optional(Schema.Array(Schema.String)),
  environment: Schema.optional(Schema.String),
  deprecationDate: Schema.optional(Cloudfunctions_Date),
  decommissionDate: Schema.optional(Cloudfunctions_Date),
})).annotate({ identifier: "Runtime" }) as any as Schema.Schema<Runtime>;

export interface ListRuntimesResponse {
  /** The runtimes that match the request. */
  runtimes?: Array<Runtime>;
}

export const ListRuntimesResponse: Schema.Schema<ListRuntimesResponse> = Schema.suspend(() => Schema.Struct({
  runtimes: Schema.optional(Schema.Array(Runtime)),
})).annotate({ identifier: "ListRuntimesResponse" }) as any as Schema.Schema<ListRuntimesResponse>;

export interface DetachFunctionRequest {
}

export const DetachFunctionRequest: Schema.Schema<DetachFunctionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DetachFunctionRequest" }) as any as Schema.Schema<DetachFunctionRequest>;

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

export interface OperationMetadataV1 {
  /** Target of the operation - for example `projects/project-1/locations/region-1/functions/function-1` */
  target?: string;
  /** Type of operation. */
  type?: "OPERATION_UNSPECIFIED" | "CREATE_FUNCTION" | "UPDATE_FUNCTION" | "DELETE_FUNCTION" | (string & {});
  /** The original request that started the operation. */
  request?: Record<string, unknown>;
  /** Version id of the function created or updated by an API call. This field is only populated for Create and Update operations. */
  versionId?: string;
  /** The last update timestamp of the operation. */
  updateTime?: string;
  /** The Cloud Build ID of the function created or updated by an API call. This field is only populated for Create and Update operations. */
  buildId?: string;
  /** An identifier for Firebase function sources. Disclaimer: This field is only supported for Firebase function deployments. */
  sourceToken?: string;
  /** The Cloud Build Name of the function deployment. This field is only populated for Create and Update operations. `projects//locations//builds/`. */
  buildName?: string;
}

export const OperationMetadataV1: Schema.Schema<OperationMetadataV1> = Schema.suspend(() => Schema.Struct({
  target: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  request: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  versionId: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  buildId: Schema.optional(Schema.String),
  sourceToken: Schema.optional(Schema.String),
  buildName: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadataV1" }) as any as Schema.Schema<OperationMetadataV1>;

export interface GoogleCloudFunctionsV2Stage {
  /** Name of the Stage. This will be unique for each Stage. */
  name?: "NAME_UNSPECIFIED" | "ARTIFACT_REGISTRY" | "BUILD" | "SERVICE" | "TRIGGER" | "SERVICE_ROLLBACK" | "TRIGGER_ROLLBACK" | (string & {});
  /** Message describing the Stage */
  message?: string;
  /** Current state of the Stage */
  state?: "STATE_UNSPECIFIED" | "NOT_STARTED" | "IN_PROGRESS" | "COMPLETE" | (string & {});
  /** Resource of the Stage */
  resource?: string;
  /** Link to the current Stage resource */
  resourceUri?: string;
  /** State messages from the current Stage. */
  stateMessages?: Array<GoogleCloudFunctionsV2StateMessage>;
}

export const GoogleCloudFunctionsV2Stage: Schema.Schema<GoogleCloudFunctionsV2Stage> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  resourceUri: Schema.optional(Schema.String),
  stateMessages: Schema.optional(Schema.Array(GoogleCloudFunctionsV2StateMessage)),
})).annotate({ identifier: "GoogleCloudFunctionsV2Stage" }) as any as Schema.Schema<GoogleCloudFunctionsV2Stage>;

export interface GoogleCloudFunctionsV2OperationMetadata {
  /** The time the operation was created. */
  createTime?: string;
  /** The time the operation finished running. */
  endTime?: string;
  /** Server-defined resource path for the target of the operation. */
  target?: string;
  /** Name of the verb executed by the operation. */
  verb?: string;
  /** Human-readable status of the operation, if any. */
  statusDetail?: string;
  /** Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  cancelRequested?: boolean;
  /** API version used to start the operation. */
  apiVersion?: string;
  /** The original request that started the operation. */
  requestResource?: Record<string, unknown>;
  /** Mechanism for reporting in-progress stages */
  stages?: Array<GoogleCloudFunctionsV2Stage>;
  /** An identifier for Firebase function sources. Disclaimer: This field is only supported for Firebase function deployments. */
  sourceToken?: string;
  /** The build name of the function for create and update operations. */
  buildName?: string;
  /** The operation type. */
  operationType?: "OPERATIONTYPE_UNSPECIFIED" | "CREATE_FUNCTION" | "UPDATE_FUNCTION" | "DELETE_FUNCTION" | "REDIRECT_FUNCTION_UPGRADE_TRAFFIC" | "ROLLBACK_FUNCTION_UPGRADE_TRAFFIC" | "SETUP_FUNCTION_UPGRADE_CONFIG" | "ABORT_FUNCTION_UPGRADE" | "COMMIT_FUNCTION_UPGRADE" | "DETACH_FUNCTION" | "COMMIT_FUNCTION_UPGRADE_AS_GEN2" | (string & {});
  /** Output only. Whether a custom IAM role binding was detected during the upgrade. */
  customIamRoleDetected?: boolean;
}

export const GoogleCloudFunctionsV2OperationMetadata: Schema.Schema<GoogleCloudFunctionsV2OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusDetail: Schema.optional(Schema.String),
  cancelRequested: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
  requestResource: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  stages: Schema.optional(Schema.Array(GoogleCloudFunctionsV2Stage)),
  sourceToken: Schema.optional(Schema.String),
  buildName: Schema.optional(Schema.String),
  operationType: Schema.optional(Schema.String),
  customIamRoleDetected: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudFunctionsV2OperationMetadata" }) as any as Schema.Schema<GoogleCloudFunctionsV2OperationMetadata>;

export interface GoogleCloudFunctionsV2LocationMetadata {
  /** The Cloud Function environments this location supports. */
  environments?: Array<"ENVIRONMENT_UNSPECIFIED" | "GEN_1" | "GEN_2" | (string & {})>;
}

export const GoogleCloudFunctionsV2LocationMetadata: Schema.Schema<GoogleCloudFunctionsV2LocationMetadata> = Schema.suspend(() => Schema.Struct({
  environments: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudFunctionsV2LocationMetadata" }) as any as Schema.Schema<GoogleCloudFunctionsV2LocationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
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

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
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

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsFunctionsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsFunctionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsFunctionsRequest>;

export type SetIamPolicyProjectsLocationsFunctionsResponse = Policy;
export const SetIamPolicyProjectsLocationsFunctionsResponse = Policy;

export type SetIamPolicyProjectsLocationsFunctionsError = CommonErrors;

export const setIamPolicyProjectsLocationsFunctions: API.OperationMethod<SetIamPolicyProjectsLocationsFunctionsRequest, SetIamPolicyProjectsLocationsFunctionsResponse, SetIamPolicyProjectsLocationsFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsFunctionsRequest,
  output: SetIamPolicyProjectsLocationsFunctionsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsFunctionsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsFunctionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsFunctionsRequest>;

export type GetIamPolicyProjectsLocationsFunctionsResponse = Policy;
export const GetIamPolicyProjectsLocationsFunctionsResponse = Policy;

export type GetIamPolicyProjectsLocationsFunctionsError = CommonErrors;

export const getIamPolicyProjectsLocationsFunctions: API.OperationMethod<GetIamPolicyProjectsLocationsFunctionsRequest, GetIamPolicyProjectsLocationsFunctionsResponse, GetIamPolicyProjectsLocationsFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsFunctionsRequest,
  output: GetIamPolicyProjectsLocationsFunctionsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsFunctionsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsFunctionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsFunctionsRequest>;

export type TestIamPermissionsProjectsLocationsFunctionsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsFunctionsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsFunctionsError = CommonErrors;

export const testIamPermissionsProjectsLocationsFunctions: API.OperationMethod<TestIamPermissionsProjectsLocationsFunctionsRequest, TestIamPermissionsProjectsLocationsFunctionsResponse, TestIamPermissionsProjectsLocationsFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsFunctionsRequest,
  output: TestIamPermissionsProjectsLocationsFunctionsResponse,
  errors: [],
}));

/** Returns a function with the given name from the requested project. */
export interface GetProjectsLocationsFunctionsRequest {
  /** Required. The name of the function which details should be obtained. */
  name: string;
  /** Optional. The optional version of the 1st gen function whose details should be obtained. The version of a 1st gen function is an integer that starts from 1 and gets incremented on redeployments. GCF may keep historical configs for old versions of 1st gen function. This field can be specified to fetch the historical configs. This field is valid only for GCF 1st gen function. */
  revision?: string;
}

export const GetProjectsLocationsFunctionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  revision: Schema.optional(Schema.String).pipe(T.HttpQuery("revision")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsFunctionsRequest>;

export type GetProjectsLocationsFunctionsResponse = Cloudfunctions_Function;
export const GetProjectsLocationsFunctionsResponse = Cloudfunctions_Function;

export type GetProjectsLocationsFunctionsError = CommonErrors;

export const getProjectsLocationsFunctions: API.OperationMethod<GetProjectsLocationsFunctionsRequest, GetProjectsLocationsFunctionsResponse, GetProjectsLocationsFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsFunctionsRequest,
  output: GetProjectsLocationsFunctionsResponse,
  errors: [],
}));

/** Returns a list of functions that belong to the requested project. */
export interface ListProjectsLocationsFunctionsRequest {
  /** Required. The project and location from which the function should be listed, specified in the format `projects/* /locations/*` If you want to list functions in all locations, use "-" in place of a location. When listing functions in all locations, if one or more location(s) are unreachable, the response will contain functions from all reachable locations along with the names of any unreachable locations. */
  parent: string;
  /** Maximum number of functions to return per call. The largest allowed page_size is 1,000, if the page_size is omitted or specified as greater than 1,000 then it will be replaced as 1,000. The size of the list response can be less than specified when used with filters. */
  pageSize?: number;
  /** The value returned by the last `ListFunctionsResponse`; indicates that this is a continuation of a prior `ListFunctions` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The filter for Functions that match the filter expression, following the syntax outlined in https://google.aip.dev/160. */
  filter?: string;
  /** The sorting order of the resources returned. Value should be a comma separated list of fields. The default sorting order is ascending. See https://google.aip.dev/132#ordering. */
  orderBy?: string;
}

export const ListProjectsLocationsFunctionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/functions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsFunctionsRequest>;

export type ListProjectsLocationsFunctionsResponse = ListFunctionsResponse;
export const ListProjectsLocationsFunctionsResponse = ListFunctionsResponse;

export type ListProjectsLocationsFunctionsError = CommonErrors;

export const listProjectsLocationsFunctions = API.makePaginated(() => ({
  input: ListProjectsLocationsFunctionsRequest,
  output: ListProjectsLocationsFunctionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new function. If a function with the given name already exists in the specified project, the long running operation will return `ALREADY_EXISTS` error. */
export interface CreateProjectsLocationsFunctionsRequest {
  /** Required. The project and location in which the function should be created, specified in the format `projects/* /locations/*` */
  parent: string;
  /** The ID to use for the function, which will become the final component of the function's resource name. This value should be 4-63 characters, and valid characters are /a-z-/. */
  functionId?: string;
  /** Request body */
  body?: Cloudfunctions_Function;
}

export const CreateProjectsLocationsFunctionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  functionId: Schema.optional(Schema.String).pipe(T.HttpQuery("functionId")),
  body: Schema.optional(Cloudfunctions_Function).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/functions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsFunctionsRequest>;

export type CreateProjectsLocationsFunctionsResponse = Operation;
export const CreateProjectsLocationsFunctionsResponse = Operation;

export type CreateProjectsLocationsFunctionsError = CommonErrors;

export const createProjectsLocationsFunctions: API.OperationMethod<CreateProjectsLocationsFunctionsRequest, CreateProjectsLocationsFunctionsResponse, CreateProjectsLocationsFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsFunctionsRequest,
  output: CreateProjectsLocationsFunctionsResponse,
  errors: [],
}));

/** Updates existing function. */
export interface PatchProjectsLocationsFunctionsRequest {
  /** A user-defined name of the function. Function names must be unique globally and match pattern `projects/* /locations/* /functions/*` */
  name: string;
  /** The list of fields to be updated. If no field mask is provided, all fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: Cloudfunctions_Function;
}

export const PatchProjectsLocationsFunctionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Cloudfunctions_Function).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsFunctionsRequest>;

export type PatchProjectsLocationsFunctionsResponse = Operation;
export const PatchProjectsLocationsFunctionsResponse = Operation;

export type PatchProjectsLocationsFunctionsError = CommonErrors;

export const patchProjectsLocationsFunctions: API.OperationMethod<PatchProjectsLocationsFunctionsRequest, PatchProjectsLocationsFunctionsResponse, PatchProjectsLocationsFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsFunctionsRequest,
  output: PatchProjectsLocationsFunctionsResponse,
  errors: [],
}));

/** Creates a 2nd Gen copy of the function configuration based on the 1st Gen function with the given name. This is the first step of the multi step process to upgrade 1st Gen functions to 2nd Gen. Only 2nd Gen configuration is setup as part of this request and traffic continues to be served by 1st Gen. */
export interface SetupFunctionUpgradeConfigProjectsLocationsFunctionsRequest {
  /** Required. The name of the function which should have configuration copied for upgrade. */
  name: string;
  /** Request body */
  body?: SetupFunctionUpgradeConfigRequest;
}

export const SetupFunctionUpgradeConfigProjectsLocationsFunctionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetupFunctionUpgradeConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}:setupFunctionUpgradeConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetupFunctionUpgradeConfigProjectsLocationsFunctionsRequest>;

export type SetupFunctionUpgradeConfigProjectsLocationsFunctionsResponse = Operation;
export const SetupFunctionUpgradeConfigProjectsLocationsFunctionsResponse = Operation;

export type SetupFunctionUpgradeConfigProjectsLocationsFunctionsError = CommonErrors;

export const setupFunctionUpgradeConfigProjectsLocationsFunctions: API.OperationMethod<SetupFunctionUpgradeConfigProjectsLocationsFunctionsRequest, SetupFunctionUpgradeConfigProjectsLocationsFunctionsResponse, SetupFunctionUpgradeConfigProjectsLocationsFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetupFunctionUpgradeConfigProjectsLocationsFunctionsRequest,
  output: SetupFunctionUpgradeConfigProjectsLocationsFunctionsResponse,
  errors: [],
}));

/** Aborts generation upgrade process for a function with the given name from the specified project. Deletes all 2nd Gen copy related configuration and resources which were created during the upgrade process. */
export interface AbortFunctionUpgradeProjectsLocationsFunctionsRequest {
  /** Required. The name of the function for which upgrade should be aborted. */
  name: string;
  /** Request body */
  body?: AbortFunctionUpgradeRequest;
}

export const AbortFunctionUpgradeProjectsLocationsFunctionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AbortFunctionUpgradeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}:abortFunctionUpgrade", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AbortFunctionUpgradeProjectsLocationsFunctionsRequest>;

export type AbortFunctionUpgradeProjectsLocationsFunctionsResponse = Operation;
export const AbortFunctionUpgradeProjectsLocationsFunctionsResponse = Operation;

export type AbortFunctionUpgradeProjectsLocationsFunctionsError = CommonErrors;

export const abortFunctionUpgradeProjectsLocationsFunctions: API.OperationMethod<AbortFunctionUpgradeProjectsLocationsFunctionsRequest, AbortFunctionUpgradeProjectsLocationsFunctionsResponse, AbortFunctionUpgradeProjectsLocationsFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AbortFunctionUpgradeProjectsLocationsFunctionsRequest,
  output: AbortFunctionUpgradeProjectsLocationsFunctionsResponse,
  errors: [],
}));

/** Changes the traffic target of a function from the original 1st Gen function to the 2nd Gen copy. This is the second step of the multi step process to upgrade 1st Gen functions to 2nd Gen. After this operation, all new traffic will be served by 2nd Gen copy. */
export interface RedirectFunctionUpgradeTrafficProjectsLocationsFunctionsRequest {
  /** Required. The name of the function for which traffic target should be changed to 2nd Gen from 1st Gen. */
  name: string;
  /** Request body */
  body?: RedirectFunctionUpgradeTrafficRequest;
}

export const RedirectFunctionUpgradeTrafficProjectsLocationsFunctionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RedirectFunctionUpgradeTrafficRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}:redirectFunctionUpgradeTraffic", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RedirectFunctionUpgradeTrafficProjectsLocationsFunctionsRequest>;

export type RedirectFunctionUpgradeTrafficProjectsLocationsFunctionsResponse = Operation;
export const RedirectFunctionUpgradeTrafficProjectsLocationsFunctionsResponse = Operation;

export type RedirectFunctionUpgradeTrafficProjectsLocationsFunctionsError = CommonErrors;

export const redirectFunctionUpgradeTrafficProjectsLocationsFunctions: API.OperationMethod<RedirectFunctionUpgradeTrafficProjectsLocationsFunctionsRequest, RedirectFunctionUpgradeTrafficProjectsLocationsFunctionsResponse, RedirectFunctionUpgradeTrafficProjectsLocationsFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RedirectFunctionUpgradeTrafficProjectsLocationsFunctionsRequest,
  output: RedirectFunctionUpgradeTrafficProjectsLocationsFunctionsResponse,
  errors: [],
}));

/** Reverts the traffic target of a function from the 2nd Gen copy to the original 1st Gen function. After this operation, all new traffic would be served by the 1st Gen. */
export interface RollbackFunctionUpgradeTrafficProjectsLocationsFunctionsRequest {
  /** Required. The name of the function for which traffic target should be changed back to 1st Gen from 2nd Gen. */
  name: string;
  /** Request body */
  body?: RollbackFunctionUpgradeTrafficRequest;
}

export const RollbackFunctionUpgradeTrafficProjectsLocationsFunctionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RollbackFunctionUpgradeTrafficRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}:rollbackFunctionUpgradeTraffic", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RollbackFunctionUpgradeTrafficProjectsLocationsFunctionsRequest>;

export type RollbackFunctionUpgradeTrafficProjectsLocationsFunctionsResponse = Operation;
export const RollbackFunctionUpgradeTrafficProjectsLocationsFunctionsResponse = Operation;

export type RollbackFunctionUpgradeTrafficProjectsLocationsFunctionsError = CommonErrors;

export const rollbackFunctionUpgradeTrafficProjectsLocationsFunctions: API.OperationMethod<RollbackFunctionUpgradeTrafficProjectsLocationsFunctionsRequest, RollbackFunctionUpgradeTrafficProjectsLocationsFunctionsResponse, RollbackFunctionUpgradeTrafficProjectsLocationsFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RollbackFunctionUpgradeTrafficProjectsLocationsFunctionsRequest,
  output: RollbackFunctionUpgradeTrafficProjectsLocationsFunctionsResponse,
  errors: [],
}));

/** Finalizes the upgrade after which function upgrade can not be rolled back. This is the last step of the multi step process to upgrade 1st Gen functions to 2nd Gen. Deletes all original 1st Gen related configuration and resources. */
export interface CommitFunctionUpgradeProjectsLocationsFunctionsRequest {
  /** Required. The name of the function for which upgrade should be finalized. */
  name: string;
  /** Request body */
  body?: CommitFunctionUpgradeRequest;
}

export const CommitFunctionUpgradeProjectsLocationsFunctionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CommitFunctionUpgradeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}:commitFunctionUpgrade", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CommitFunctionUpgradeProjectsLocationsFunctionsRequest>;

export type CommitFunctionUpgradeProjectsLocationsFunctionsResponse = Operation;
export const CommitFunctionUpgradeProjectsLocationsFunctionsResponse = Operation;

export type CommitFunctionUpgradeProjectsLocationsFunctionsError = CommonErrors;

export const commitFunctionUpgradeProjectsLocationsFunctions: API.OperationMethod<CommitFunctionUpgradeProjectsLocationsFunctionsRequest, CommitFunctionUpgradeProjectsLocationsFunctionsResponse, CommitFunctionUpgradeProjectsLocationsFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CommitFunctionUpgradeProjectsLocationsFunctionsRequest,
  output: CommitFunctionUpgradeProjectsLocationsFunctionsResponse,
  errors: [],
}));

/** Commits a function upgrade from GCF Gen1 to GCF Gen2. This action deletes the Gen1 function, leaving the Gen2 function active and manageable by the GCFv2 API. */
export interface CommitFunctionUpgradeAsGen2ProjectsLocationsFunctionsRequest {
  /** Required. The name of the function for which upgrade should be committed to Gen2. */
  name: string;
  /** Request body */
  body?: CommitFunctionUpgradeAsGen2Request;
}

export const CommitFunctionUpgradeAsGen2ProjectsLocationsFunctionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CommitFunctionUpgradeAsGen2Request).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}:commitFunctionUpgradeAsGen2", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CommitFunctionUpgradeAsGen2ProjectsLocationsFunctionsRequest>;

export type CommitFunctionUpgradeAsGen2ProjectsLocationsFunctionsResponse = Operation;
export const CommitFunctionUpgradeAsGen2ProjectsLocationsFunctionsResponse = Operation;

export type CommitFunctionUpgradeAsGen2ProjectsLocationsFunctionsError = CommonErrors;

export const commitFunctionUpgradeAsGen2ProjectsLocationsFunctions: API.OperationMethod<CommitFunctionUpgradeAsGen2ProjectsLocationsFunctionsRequest, CommitFunctionUpgradeAsGen2ProjectsLocationsFunctionsResponse, CommitFunctionUpgradeAsGen2ProjectsLocationsFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CommitFunctionUpgradeAsGen2ProjectsLocationsFunctionsRequest,
  output: CommitFunctionUpgradeAsGen2ProjectsLocationsFunctionsResponse,
  errors: [],
}));

/** Deletes a function with the given name from the specified project. If the given function is used by some trigger, the trigger will be updated to remove this function. */
export interface DeleteProjectsLocationsFunctionsRequest {
  /** Required. The name of the function which should be deleted. */
  name: string;
}

export const DeleteProjectsLocationsFunctionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsFunctionsRequest>;

export type DeleteProjectsLocationsFunctionsResponse = Operation;
export const DeleteProjectsLocationsFunctionsResponse = Operation;

export type DeleteProjectsLocationsFunctionsError = CommonErrors;

export const deleteProjectsLocationsFunctions: API.OperationMethod<DeleteProjectsLocationsFunctionsRequest, DeleteProjectsLocationsFunctionsResponse, DeleteProjectsLocationsFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsFunctionsRequest,
  output: DeleteProjectsLocationsFunctionsResponse,
  errors: [],
}));

/** Returns a signed URL for uploading a function source code. For more information about the signed URL usage see: https://cloud.google.com/storage/docs/access-control/signed-urls. Once the function source code upload is complete, the used signed URL should be provided in CreateFunction or UpdateFunction request as a reference to the function source code. When uploading source code to the generated signed URL, please follow these restrictions: * Source file type should be a zip file. * No credentials should be attached - the signed URLs provide access to the target bucket using internal service identity; if credentials were attached, the identity from the credentials would be used, but that identity does not have permissions to upload files to the URL. When making a HTTP PUT request, specify this header: * `content-type: application/zip` Do not specify this header: * `Authorization: Bearer YOUR_TOKEN` */
export interface GenerateUploadUrlProjectsLocationsFunctionsRequest {
  /** Required. The project and location in which the Google Cloud Storage signed URL should be generated, specified in the format `projects/* /locations/*`. */
  parent: string;
  /** Request body */
  body?: GenerateUploadUrlRequest;
}

export const GenerateUploadUrlProjectsLocationsFunctionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GenerateUploadUrlRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/functions:generateUploadUrl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateUploadUrlProjectsLocationsFunctionsRequest>;

export type GenerateUploadUrlProjectsLocationsFunctionsResponse = GenerateUploadUrlResponse;
export const GenerateUploadUrlProjectsLocationsFunctionsResponse = GenerateUploadUrlResponse;

export type GenerateUploadUrlProjectsLocationsFunctionsError = CommonErrors;

export const generateUploadUrlProjectsLocationsFunctions: API.OperationMethod<GenerateUploadUrlProjectsLocationsFunctionsRequest, GenerateUploadUrlProjectsLocationsFunctionsResponse, GenerateUploadUrlProjectsLocationsFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateUploadUrlProjectsLocationsFunctionsRequest,
  output: GenerateUploadUrlProjectsLocationsFunctionsResponse,
  errors: [],
}));

/** Returns a signed URL for downloading deployed function source code. The URL is only valid for a limited period and should be used within 30 minutes of generation. For more information about the signed URL usage see: https://cloud.google.com/storage/docs/access-control/signed-urls */
export interface GenerateDownloadUrlProjectsLocationsFunctionsRequest {
  /** Required. The name of function for which source code Google Cloud Storage signed URL should be generated. */
  name: string;
  /** Request body */
  body?: GenerateDownloadUrlRequest;
}

export const GenerateDownloadUrlProjectsLocationsFunctionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GenerateDownloadUrlRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}:generateDownloadUrl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateDownloadUrlProjectsLocationsFunctionsRequest>;

export type GenerateDownloadUrlProjectsLocationsFunctionsResponse = GenerateDownloadUrlResponse;
export const GenerateDownloadUrlProjectsLocationsFunctionsResponse = GenerateDownloadUrlResponse;

export type GenerateDownloadUrlProjectsLocationsFunctionsError = CommonErrors;

export const generateDownloadUrlProjectsLocationsFunctions: API.OperationMethod<GenerateDownloadUrlProjectsLocationsFunctionsRequest, GenerateDownloadUrlProjectsLocationsFunctionsResponse, GenerateDownloadUrlProjectsLocationsFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateDownloadUrlProjectsLocationsFunctionsRequest,
  output: GenerateDownloadUrlProjectsLocationsFunctionsResponse,
  errors: [],
}));

/** Detaches 2nd Gen function to Cloud Run function. */
export interface DetachFunctionProjectsLocationsFunctionsRequest {
  /** Required. The name of the function for which should be detached. */
  name: string;
  /** Request body */
  body?: DetachFunctionRequest;
}

export const DetachFunctionProjectsLocationsFunctionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DetachFunctionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}:detachFunction", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DetachFunctionProjectsLocationsFunctionsRequest>;

export type DetachFunctionProjectsLocationsFunctionsResponse = Operation;
export const DetachFunctionProjectsLocationsFunctionsResponse = Operation;

export type DetachFunctionProjectsLocationsFunctionsError = CommonErrors;

export const detachFunctionProjectsLocationsFunctions: API.OperationMethod<DetachFunctionProjectsLocationsFunctionsRequest, DetachFunctionProjectsLocationsFunctionsResponse, DetachFunctionProjectsLocationsFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DetachFunctionProjectsLocationsFunctionsRequest,
  output: DetachFunctionProjectsLocationsFunctionsResponse,
  errors: [],
}));

/** Returns a list of runtimes that are supported for the requested project. */
export interface ListProjectsLocationsRuntimesRequest {
  /** Required. The project and location from which the runtimes should be listed, specified in the format `projects/* /locations/*` */
  parent: string;
  /** The filter for Runtimes that match the filter expression, following the syntax outlined in https://google.aip.dev/160. */
  filter?: string;
}

export const ListProjectsLocationsRuntimesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/runtimes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRuntimesRequest>;

export type ListProjectsLocationsRuntimesResponse = ListRuntimesResponse;
export const ListProjectsLocationsRuntimesResponse = ListRuntimesResponse;

export type ListProjectsLocationsRuntimesError = CommonErrors;

export const listProjectsLocationsRuntimes: API.OperationMethod<ListProjectsLocationsRuntimesRequest, ListProjectsLocationsRuntimesResponse, ListProjectsLocationsRuntimesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsRuntimesRequest,
  output: ListProjectsLocationsRuntimesResponse,
  errors: [],
}));

