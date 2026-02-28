// ==========================================================================
// Firebase App Hosting API (firebaseapphosting v1)
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
  name: "firebaseapphosting",
  version: "v1",
  rootUrl: "https://firebaseapphosting.googleapis.com/",
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

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface Codebase {
  /** Required. The resource name for the Developer Connect [`gitRepositoryLink`](https://cloud.google.com/developer-connect/docs/api/reference/rest/v1/projects.locations.connections.gitRepositoryLinks) connected to this backend, in the format: `projects/{project}/locations/{location}/connections/{connection}/gitRepositoryLinks/{repositoryLink}` The connection for the `gitRepositoryLink` must made be using the Firebase App Hosting GitHub App via the Firebase Console. */
  repository?: string;
  /** Optional. If `repository` is provided, the directory relative to the root of the repository to use as the root for the deployed web app. Defaults to use the root of the repository if not provided. If deploying a [monorepo](https://firebase.google.com/docs/app-hosting/monorepos), this should be the directory that contains the `package.json` or `apphosting.yaml` file. */
  rootDirectory?: string;
}

export const Codebase: Schema.Schema<Codebase> = Schema.suspend(() => Schema.Struct({
  repository: Schema.optional(Schema.String),
  rootDirectory: Schema.optional(Schema.String),
})).annotate({ identifier: "Codebase" }) as any as Schema.Schema<Codebase>;

export interface RunService {
  /** Optional. The name of the Cloud Run [`service`](https://cloud.google.com/run/docs/reference/rest/v2/projects.locations.services#resource:-service), in the format: `projects/{project}/locations/{location}/services/{serviceId}` */
  service?: string;
}

export const RunService: Schema.Schema<RunService> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "RunService" }) as any as Schema.Schema<RunService>;

export interface ManagedResource {
  /** A Cloud Run [`service`](https://cloud.google.com/run/docs/reference/rest/v2/projects.locations.services#resource:-service), managed by App Hosting. */
  runService?: RunService;
}

export const ManagedResource: Schema.Schema<ManagedResource> = Schema.suspend(() => Schema.Struct({
  runService: Schema.optional(RunService),
})).annotate({ identifier: "ManagedResource" }) as any as Schema.Schema<ManagedResource>;

export interface Backend {
  /** Identifier. The resource name of the backend. Format: `projects/{project}/locations/{locationId}/backends/{backendId}`. */
  name?: string;
  /** Optional. Human-readable name. 63 character limit. */
  displayName?: string;
  /** Optional. Deprecated: Use `environment` instead. */
  mode?: string;
  /** Required. Immutable. Specifies how App Hosting will serve the content for this backend. It will either be contained to a single region (REGIONAL_STRICT) or allowed to use App Hosting's global-replicated serving infrastructure (GLOBAL_ACCESS). */
  servingLocality?: "SERVING_LOCALITY_UNSPECIFIED" | "REGIONAL_STRICT" | "GLOBAL_ACCESS" | (string & {});
  /** Optional. If specified, the connection to an external source repository to watch for event-driven updates to the backend. */
  codebase?: Codebase;
  /** Output only. The primary URI to communicate with the backend. */
  uri?: string;
  /** Output only. A list of the resources managed by this backend. */
  managedResources?: Array<ManagedResource>;
  /** Required. The name of the service account used for Cloud Build and Cloud Run. Should have the role roles/firebaseapphosting.computeRunner or equivalent permissions. */
  serviceAccount?: string;
  /** Optional. The [ID of a Web App](https://firebase.google.com/docs/reference/firebase-management/rest/v1beta1/projects.webApps#WebApp.FIELDS.app_id) associated with the backend. */
  appId?: string;
  /** Optional. The environment name of the backend, used to load environment variables from environment specific configuration. */
  environment?: string;
  /** Optional. A field that, if true, indicates that incoming request logs are disabled for this backend. Incoming request logs are enabled by default. */
  requestLogsDisabled?: boolean;
  /** Output only. A field that, if true, indicates that the system is working to make adjustments to the backend during a LRO. */
  reconciling?: boolean;
  /** Output only. Time at which the backend was created. */
  createTime?: string;
  /** Output only. Time at which the backend was last updated. */
  updateTime?: string;
  /** Output only. Time at which the backend was deleted. */
  deleteTime?: string;
  /** Optional. Unstructured key value map that can be used to organize and categorize objects. */
  labels?: Record<string, string>;
  /** Optional. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. */
  annotations?: Record<string, string>;
  /** Output only. System-assigned, unique identifier. */
  uid?: string;
  /** Output only. Server-computed checksum based on other values; may be sent on update or delete to ensure operation is done on expected resource. */
  etag?: string;
}

export const Backend: Schema.Schema<Backend> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  mode: Schema.optional(Schema.String),
  servingLocality: Schema.optional(Schema.String),
  codebase: Schema.optional(Codebase),
  uri: Schema.optional(Schema.String),
  managedResources: Schema.optional(Schema.Array(ManagedResource)),
  serviceAccount: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
  requestLogsDisabled: Schema.optional(Schema.Boolean),
  reconciling: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  uid: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Backend" }) as any as Schema.Schema<Backend>;

export interface ListBackendsResponse {
  /** The list of backends */
  backends?: Array<Backend>;
  /** A token identifying the next page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackendsResponse: Schema.Schema<ListBackendsResponse> = Schema.suspend(() => Schema.Struct({
  backends: Schema.optional(Schema.Array(Backend)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBackendsResponse" }) as any as Schema.Schema<ListBackendsResponse>;

export interface TrafficSplit {
  /** Required. The build that traffic is being routed to. */
  build?: string;
  /** Required. The percentage of traffic to send to the build. Currently must be 100% or 0%. */
  percent?: number;
}

export const TrafficSplit: Schema.Schema<TrafficSplit> = Schema.suspend(() => Schema.Struct({
  build: Schema.optional(Schema.String),
  percent: Schema.optional(Schema.Number),
})).annotate({ identifier: "TrafficSplit" }) as any as Schema.Schema<TrafficSplit>;

export interface TrafficSet {
  /** Required. The list of traffic splits. */
  splits?: Array<TrafficSplit>;
}

export const TrafficSet: Schema.Schema<TrafficSet> = Schema.suspend(() => Schema.Struct({
  splits: Schema.optional(Schema.Array(TrafficSplit)),
})).annotate({ identifier: "TrafficSet" }) as any as Schema.Schema<TrafficSet>;

export interface Path {
  /** Optional. The pattern to match against. */
  pattern?: string;
  /** Optional. The type of pattern to match against. */
  type?: "PATTERN_TYPE_UNSPECIFIED" | "RE2" | "GLOB" | "PREFIX" | (string & {});
}

export const Path: Schema.Schema<Path> = Schema.suspend(() => Schema.Struct({
  pattern: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Path" }) as any as Schema.Schema<Path>;

export interface RolloutPolicy {
  /** If set, specifies a branch that triggers a new build to be started with this policy. Otherwise, no automatic rollouts will happen. */
  codebaseBranch?: string;
  /** Optional. A flag that, if true, prevents automatic rollouts from being created via this RolloutPolicy. */
  disabled?: boolean;
  /** Output only. If `disabled` is set, the time at which the automatic rollouts were disabled. */
  disabledTime?: string;
  /** Optional. A list of file paths patterns that trigger a build and rollout if at least one of the changed files in the commit are present in this list. This field is optional; the rollout policy will default to triggering on all paths if not populated. Limited to 100 paths. Example: “required_paths: { pattern: "foo/bar/*” type: GLOB } */
  requiredPaths?: Array<Path>;
  /** Optional. A list of file paths patterns to exclude from triggering a rollout. Patterns in this list take precedence over required_paths. **Note**: All paths must be in the ignored_paths in order for the rollout to be skipped. Limited to 100 paths. Example: ignored_paths: { pattern: "foo/bar/excluded/*” type: GLOB } */
  ignoredPaths?: Array<Path>;
}

export const RolloutPolicy: Schema.Schema<RolloutPolicy> = Schema.suspend(() => Schema.Struct({
  codebaseBranch: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  disabledTime: Schema.optional(Schema.String),
  requiredPaths: Schema.optional(Schema.Array(Path)),
  ignoredPaths: Schema.optional(Schema.Array(Path)),
})).annotate({ identifier: "RolloutPolicy" }) as any as Schema.Schema<RolloutPolicy>;

export interface Traffic {
  /** Set to manually control the desired traffic for the backend. This will cause `current` to eventually match this value. The percentages must add up to 100%. */
  target?: TrafficSet;
  /** A rollout policy specifies how new builds and automatic deployments are created. */
  rolloutPolicy?: RolloutPolicy;
  /** Identifier. The resource name of the backend's traffic. Format: `projects/{project}/locations/{locationId}/backends/{backendId}/traffic`. */
  name?: string;
  /** Output only. Current state of traffic allocation for the backend. When setting `target`, this field may differ for some time until the desired state is reached. */
  current?: TrafficSet;
  /** Output only. A field that, if true, indicates that the system is working to make the backend's `current` match the requested `target` list. */
  reconciling?: boolean;
  /** Output only. Time at which the backend was created. */
  createTime?: string;
  /** Output only. Time at which the backend was last updated. */
  updateTime?: string;
  /** Optional. Unstructured key value map that can be used to organize and categorize objects. */
  labels?: Record<string, string>;
  /** Optional. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. */
  annotations?: Record<string, string>;
  /** Output only. Server-computed checksum based on other values; may be sent on update or delete to ensure operation is done on expected resource. */
  etag?: string;
  /** Output only. System-assigned, unique identifier. */
  uid?: string;
}

export const Traffic: Schema.Schema<Traffic> = Schema.suspend(() => Schema.Struct({
  target: Schema.optional(TrafficSet),
  rolloutPolicy: Schema.optional(RolloutPolicy),
  name: Schema.optional(Schema.String),
  current: Schema.optional(TrafficSet),
  reconciling: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
})).annotate({ identifier: "Traffic" }) as any as Schema.Schema<Traffic>;

export interface RunConfig {
  /** Optional. Number of CPUs used for each serving instance. By default, cpu defaults to the Cloud Run's default of 1.0. CPU can be set to value 1, 2, 4, 6, or 8 CPUs, and for less than 1 CPU, a value from 0.08 to less than 1.00, in increments of 0.01. If you set a value of less than 1 CPU, you must set concurrency to 1, and CPU will only be allocated during request processing. Increasing CPUs limit may require increase in memory limits: - 4 CPUs: at least 2 GiB - 6 CPUs: at least 4 GiB - 8 CPUs: at least 4 GiB */
  cpu?: number;
  /** Optional. Amount of memory allocated for each serving instance in MiB. By default, memory defaults to the Cloud Run's default where each instance is allocated 512 MiB of memory. Memory can be set to any integer value between 128 to 32768. Increasing memory limit may require increase in CPUs limits: - Over 4 GiB: at least 2 CPUs - Over 8 GiB: at least 4 CPUs - Over 16 GiB: at least 6 CPUs - Over 24 GiB: at least 8 CPUs */
  memoryMib?: number;
  /** Optional. Maximum number of requests that each Cloud Run instance can receive. By default, each instance can receive Cloud Run's default of up to 80 requests at the same time. Concurrency can be set to any integer value up to 1000. */
  concurrency?: number;
  /** Optional. Number of Cloud Run instances to maintain at maximum for each revision. By default, each Cloud Run [`service`](https://cloud.google.com/run/docs/reference/rest/v2/projects.locations.services#resource:-service) scales out to Cloud Run's default of a maximum of 100 instances. The maximum max_instances limit is based on your quota. See https://cloud.google.com/run/docs/configuring/max-instances#limits. */
  maxInstances?: number;
  /** Optional. Number of Cloud Run instances to maintain at minimum for each Cloud Run Service. By default, there are no minimum. Even if the service splits traffic across multiple revisions, the total number of instances for a service will be capped at this value. */
  minInstances?: number;
}

export const RunConfig: Schema.Schema<RunConfig> = Schema.suspend(() => Schema.Struct({
  cpu: Schema.optional(Schema.Number),
  memoryMib: Schema.optional(Schema.Number),
  concurrency: Schema.optional(Schema.Number),
  maxInstances: Schema.optional(Schema.Number),
  minInstances: Schema.optional(Schema.Number),
})).annotate({ identifier: "RunConfig" }) as any as Schema.Schema<RunConfig>;

export interface EnvironmentVariable {
  /** A plaintext value. This value is encrypted at rest, but all project readers can view the value when reading your backend configuration. */
  value?: string;
  /** A fully qualified secret version. The value of the secret will be accessed once while building the application and once per cold start of the container at runtime. The service account used by Cloud Build and by Cloud Run must each have the `secretmanager.versions.access` permission on the secret. */
  secret?: string;
  /** Required. The name of the environment variable. - Must be a valid environment variable name (e.g. A-Z or underscores). - May not start with "FIREBASE" or "GOOGLE". - May not be a reserved environment variable for KNative/Cloud Run */
  variable?: string;
  /** Optional. Where this variable should be made available. If left unspecified, will be available in both BUILD and BACKEND. */
  availability?: Array<"AVAILABILITY_UNSPECIFIED" | "BUILD" | "RUNTIME" | (string & {})>;
  /** Output only. The high-level origin category of the environment variable. */
  origin?: "ORIGIN_UNSPECIFIED" | "BACKEND_OVERRIDES" | "BUILD_CONFIG" | "APPHOSTING_YAML" | "FIREBASE_SYSTEM" | (string & {});
  /** Output only. Specific detail about the source. For APPHOSTING_YAML origins, this will contain the exact filename, such as "apphosting.yaml" or "apphosting.staging.yaml". */
  originFileName?: string;
}

export const EnvironmentVariable: Schema.Schema<EnvironmentVariable> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  secret: Schema.optional(Schema.String),
  variable: Schema.optional(Schema.String),
  availability: Schema.optional(Schema.Array(Schema.String)),
  origin: Schema.optional(Schema.String),
  originFileName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnvironmentVariable" }) as any as Schema.Schema<EnvironmentVariable>;

export interface Config {
  /** Optional. Additional configuration of the Cloud Run [`service`](https://cloud.google.com/run/docs/reference/rest/v2/projects.locations.services#resource:-service). */
  runConfig?: RunConfig;
  /** Optional. Supplied environment variables for a specific build. Provided at Build creation time and immutable afterwards. This field is only applicable for Builds using a build image - (e.g., ContainerSource or ArchiveSource with locally_built_source) Attempts to set this for other build types will result in an error */
  env?: Array<EnvironmentVariable>;
  /** Output only. [OUTPUT_ONLY] This field represents all environment variables employed during both the build and runtime. This list reflects the result of merging variables from all sources (Backend.override_env, Build.Config.env, YAML, defaults, system). Each variable includes its `origin` */
  effectiveEnv?: Array<EnvironmentVariable>;
}

export const Config: Schema.Schema<Config> = Schema.suspend(() => Schema.Struct({
  runConfig: Schema.optional(RunConfig),
  env: Schema.optional(Schema.Array(EnvironmentVariable)),
  effectiveEnv: Schema.optional(Schema.Array(EnvironmentVariable)),
})).annotate({ identifier: "Config" }) as any as Schema.Schema<Config>;

export interface UserMetadata {
  /** Output only. The 'name' field in a Git user's git.config. Required by Git. */
  displayName?: string;
  /** Output only. The 'email' field in a Git user's git.config, if available. */
  email?: string;
  /** Output only. The URI of an image file associated with the user's account in an external source control provider, if available. */
  imageUri?: string;
}

export const UserMetadata: Schema.Schema<UserMetadata> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  imageUri: Schema.optional(Schema.String),
})).annotate({ identifier: "UserMetadata" }) as any as Schema.Schema<UserMetadata>;

export interface CodebaseSource {
  /** The branch in the codebase to build from, using the latest commit. */
  branch?: string;
  /** The commit in the codebase to build from. */
  commit?: string;
  /** Output only. The human-friendly name to use for this Codebase when displaying a build. We use the first eight characters of the SHA-1 hash for GitHub.com. */
  displayName?: string;
  /** Output only. The resource name for the Developer Connect [`gitRepositoryLink`](https://cloud.google.com/developer-connect/docs/api/reference/rest/v1/projects.locations.connections.gitRepositoryLinks) used for this build, in the format: `projects/{project}/locations/{location}/connections/{connection}/gitRepositoryLinks/{repositoryLink}` */
  repository?: string;
  /** Output only. The full SHA-1 hash of a Git commit, if available. */
  hash?: string;
  /** Output only. The message of a codebase change. */
  commitMessage?: string;
  /** Output only. A URI linking to the codebase on an hosting provider's website. May not be valid if the commit has been rebased or force-pushed out of existence in the linked repository. */
  uri?: string;
  /** Output only. The author contained in the metadata of a version control change. */
  author?: UserMetadata;
  /** Output only. The time the change was made. */
  commitTime?: string;
}

export const CodebaseSource: Schema.Schema<CodebaseSource> = Schema.suspend(() => Schema.Struct({
  branch: Schema.optional(Schema.String),
  commit: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  repository: Schema.optional(Schema.String),
  hash: Schema.optional(Schema.String),
  commitMessage: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  author: Schema.optional(UserMetadata),
  commitTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CodebaseSource" }) as any as Schema.Schema<CodebaseSource>;

export interface ContainerSource {
  /** Required. A URI representing a container for the backend to use. */
  image?: string;
}

export const ContainerSource: Schema.Schema<ContainerSource> = Schema.suspend(() => Schema.Struct({
  image: Schema.optional(Schema.String),
})).annotate({ identifier: "ContainerSource" }) as any as Schema.Schema<ContainerSource>;

export interface SourceUserMetadata {
  /** Output only. Deprecated: Not used. The user-chosen displayname. May be empty. */
  displayName?: string;
  /** Output only. Deprecated: Not used. The account email linked to the EUC that created the build. May be a service account or other robot account. */
  email?: string;
  /** Output only. Deprecated: Not used. The URI of a profile photo associated with the user who created the build. */
  imageUri?: string;
}

export const SourceUserMetadata: Schema.Schema<SourceUserMetadata> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  imageUri: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceUserMetadata" }) as any as Schema.Schema<SourceUserMetadata>;

export interface ArchiveSource {
  /** URI to an archive in Cloud Storage. The object must be a zipped (.zip) or gzipped archive file (.tar.gz) containing source to deploy. */
  userStorageUri?: string;
  /** Signed URL to an archive in a storage bucket. */
  externalSignedUri?: string;
  /** Optional. The directory relative to the root of the archive to use as the root for the deployed web app. Defaults to use the root of the repository if not provided. If deploying a [monorepo](https://firebase.google.com/docs/app-hosting/monorepos), this should be the directory that contains the `package.json` or `apphosting.yaml` file. */
  rootDirectory?: string;
  /** Optional. Deprecated: Not used. The author contained in the metadata of a version control change. */
  author?: SourceUserMetadata;
  /** Optional. An optional message that describes the uploaded version of the source code. */
  description?: string;
}

export const ArchiveSource: Schema.Schema<ArchiveSource> = Schema.suspend(() => Schema.Struct({
  userStorageUri: Schema.optional(Schema.String),
  externalSignedUri: Schema.optional(Schema.String),
  rootDirectory: Schema.optional(Schema.String),
  author: Schema.optional(SourceUserMetadata),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "ArchiveSource" }) as any as Schema.Schema<ArchiveSource>;

export interface BuildSource {
  /** A codebase source. */
  codebase?: CodebaseSource;
  /** An Artifact Registry container image source. */
  container?: ContainerSource;
  /** An archive source. */
  archive?: ArchiveSource;
}

export const BuildSource: Schema.Schema<BuildSource> = Schema.suspend(() => Schema.Struct({
  codebase: Schema.optional(CodebaseSource),
  container: Schema.optional(ContainerSource),
  archive: Schema.optional(ArchiveSource),
})).annotate({ identifier: "BuildSource" }) as any as Schema.Schema<BuildSource>;

export interface Firebaseapphosting_Error {
  /** Output only. A status and (human readable) error message for the build, if in a `FAILED` state. */
  error?: Status;
  /** Output only. The source of the error for the build, if in a `FAILED` state. */
  errorSource?: "ERROR_SOURCE_UNSPECIFIED" | "CLOUD_BUILD" | "CLOUD_RUN" | (string & {});
  /** Output only. Resource link */
  cloudResource?: string;
}

export const Firebaseapphosting_Error: Schema.Schema<Firebaseapphosting_Error> = Schema.suspend(() => Schema.Struct({
  error: Schema.optional(Status),
  errorSource: Schema.optional(Schema.String),
  cloudResource: Schema.optional(Schema.String),
})).annotate({ identifier: "Firebaseapphosting_Error" }) as any as Schema.Schema<Firebaseapphosting_Error>;

export interface Build {
  /** Identifier. The resource name of the build. Format: `projects/{project}/locations/{locationId}/backends/{backendId}/builds/{buildId}`. */
  name?: string;
  /** Optional. Human-readable name. 63 character limit. */
  displayName?: string;
  /** Optional. Additional configuration of the service. */
  config?: Config;
  /** Required. Immutable. The source for the build. */
  source?: BuildSource;
  /** Output only. The state of the build. */
  state?: "STATE_UNSPECIFIED" | "BUILDING" | "BUILT" | "DEPLOYING" | "READY" | "FAILED" | "SKIPPED" | (string & {});
  /** Output only. The Artifact Registry [container image](https://cloud.google.com/artifact-registry/docs/reference/rest/v1/projects.locations.repositories.dockerImages) URI, used by the Cloud Run [`revision`](https://cloud.google.com/run/docs/reference/rest/v2/projects.locations.services.revisions) for this build. */
  image?: string;
  /** Output only. The location of the [Cloud Build logs](https://cloud.google.com/build/docs/view-build-results) for the build process. */
  buildLogsUri?: string;
  /** Output only. The environment name of the backend when this build was created. */
  environment?: string;
  /** Output only. A list of all errors that occurred during an App Hosting build. */
  errors?: Array<Firebaseapphosting_Error>;
  /** Output only. A field that, if true, indicates that the build has an ongoing LRO. */
  reconciling?: boolean;
  /** Output only. Time at which the build was created. */
  createTime?: string;
  /** Output only. Time at which the build was last updated. */
  updateTime?: string;
  /** Output only. Time at which the build was deleted. */
  deleteTime?: string;
  /** Optional. Unstructured key value map that can be used to organize and categorize objects. */
  labels?: Record<string, string>;
  /** Optional. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. */
  annotations?: Record<string, string>;
  /** Output only. System-assigned, unique identifier. */
  uid?: string;
  /** Output only. Server-computed checksum based on other values; may be sent on update or delete to ensure operation is done on expected resource. */
  etag?: string;
}

export const Build: Schema.Schema<Build> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  config: Schema.optional(Config),
  source: Schema.optional(BuildSource),
  state: Schema.optional(Schema.String),
  image: Schema.optional(Schema.String),
  buildLogsUri: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(Firebaseapphosting_Error)),
  reconciling: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  uid: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Build" }) as any as Schema.Schema<Build>;

export interface ListBuildsResponse {
  /** The list of builds. */
  builds?: Array<Build>;
  /** A token identifying the next page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBuildsResponse: Schema.Schema<ListBuildsResponse> = Schema.suspend(() => Schema.Struct({
  builds: Schema.optional(Schema.Array(Build)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBuildsResponse" }) as any as Schema.Schema<ListBuildsResponse>;

export interface Rollout {
  /** Identifier. The resource name of the rollout. Format: `projects/{project}/locations/{locationId}/backends/{backendId}/rollouts/{rolloutId}`. */
  name?: string;
  /** Optional. Human-readable name. 63 character limit. */
  displayName?: string;
  /** Output only. The state of the rollout. */
  state?: "STATE_UNSPECIFIED" | "QUEUED" | "PENDING_BUILD" | "PROGRESSING" | "PAUSED" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "SKIPPED" | (string & {});
  /** Output only. A status and (human readable) error message for the rollout, if in a `FAILED` state. */
  error?: Status;
  /** Required. Immutable. The name of a build that already exists. It doesn't have to be built; a rollout will wait for a build to be ready before updating traffic. */
  build?: string;
  /** Output only. A field that, if true, indicates that the Rollout currently has an LRO. */
  reconciling?: boolean;
  /** Output only. Time at which the rollout was created. */
  createTime?: string;
  /** Output only. Time at which the rollout was last updated. */
  updateTime?: string;
  /** Output only. Time at which the rollout was deleted. */
  deleteTime?: string;
  /** Optional. Unstructured key value map that can be used to organize and categorize objects. */
  labels?: Record<string, string>;
  /** Optional. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. */
  annotations?: Record<string, string>;
  /** Output only. System-assigned, unique identifier. */
  uid?: string;
  /** Output only. Server-computed checksum based on other values; may be sent on update or delete to ensure operation is done on expected resource. */
  etag?: string;
}

export const Rollout: Schema.Schema<Rollout> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  error: Schema.optional(Status),
  build: Schema.optional(Schema.String),
  reconciling: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  uid: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Rollout" }) as any as Schema.Schema<Rollout>;

export interface ListRolloutsResponse {
  /** The list of rollouts. */
  rollouts?: Array<Rollout>;
  /** A token identifying the next page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListRolloutsResponse: Schema.Schema<ListRolloutsResponse> = Schema.suspend(() => Schema.Struct({
  rollouts: Schema.optional(Schema.Array(Rollout)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListRolloutsResponse" }) as any as Schema.Schema<ListRolloutsResponse>;

export interface Redirect {
  /** Required. The URI of the redirect's intended destination. This URI will be prepended to the original request path. URI without a scheme are assumed to be HTTPS. */
  uri?: string;
  /** Optional. The status code to use in a redirect response. Must be a valid HTTP 3XX status code. Defaults to 302 if not present. */
  status?: string;
}

export const Redirect: Schema.Schema<Redirect> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "Redirect" }) as any as Schema.Schema<Redirect>;

export interface ServingBehavior {
  /** Optional. Redirect behavior for a domain, if provided. */
  redirect?: Redirect;
}

export const ServingBehavior: Schema.Schema<ServingBehavior> = Schema.suspend(() => Schema.Struct({
  redirect: Schema.optional(Redirect),
})).annotate({ identifier: "ServingBehavior" }) as any as Schema.Schema<ServingBehavior>;

export interface DnsRecord {
  /** Output only. The domain the record pertains to, e.g. `foo.bar.com.`. */
  domainName?: string;
  /** Output only. The record's type, which determines what data the record contains. */
  type?: "TYPE_UNSPECIFIED" | "A" | "CNAME" | "TXT" | "AAAA" | "CAA" | (string & {});
  /** Output only. The data of the record. The meaning of the value depends on record type: - A and AAAA: IP addresses for the domain. - CNAME: Another domain to check for records. - TXT: Arbitrary text strings associated with the domain. App Hosting uses TXT records to determine which Firebase projects have permission to act on the domain's behalf. - CAA: The record's flags, tag, and value, e.g. `0 issue "pki.goog"`. */
  rdata?: string;
  /** Output only. An enum that indicates the a required action for this record. Populated when the record is part of a required change in a `DnsUpdates` `discovered` or `desired` record set. */
  requiredAction?: "NONE" | "ADD" | "REMOVE" | (string & {});
  /** Output only. An enum that indicates which state(s) this DNS record applies to. Populated for all records with an `ADD` or `REMOVE` required action. */
  relevantState?: Array<"CUSTOM_DOMAIN_STATE_UNSPECIFIED" | "HOST_STATE" | "OWNERSHIP_STATE" | "CERT_STATE" | (string & {})>;
}

export const DnsRecord: Schema.Schema<DnsRecord> = Schema.suspend(() => Schema.Struct({
  domainName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  rdata: Schema.optional(Schema.String),
  requiredAction: Schema.optional(Schema.String),
  relevantState: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DnsRecord" }) as any as Schema.Schema<DnsRecord>;

export interface DnsRecordSet {
  /** Output only. The domain name the record set pertains to. */
  domainName?: string;
  /** Output only. An error App Hosting services encountered when querying your domain's DNS records. Note: App Hosting ignores `NXDOMAIN` errors, as those generally just mean that a domain name hasn't been set up yet. */
  checkError?: Status;
  /** Output only. Records on the domain. */
  records?: Array<DnsRecord>;
}

export const DnsRecordSet: Schema.Schema<DnsRecordSet> = Schema.suspend(() => Schema.Struct({
  domainName: Schema.optional(Schema.String),
  checkError: Schema.optional(Status),
  records: Schema.optional(Schema.Array(DnsRecord)),
})).annotate({ identifier: "DnsRecordSet" }) as any as Schema.Schema<DnsRecordSet>;

export interface DnsUpdates {
  /** Output only. The domain name the DNS updates pertain to. */
  domainName?: string;
  /** Output only. The set of DNS records App Hosting discovered when inspecting a domain. */
  discovered?: Array<DnsRecordSet>;
  /** Output only. The set of DNS records App Hosting needs in order to be able to serve secure content on the domain. */
  desired?: Array<DnsRecordSet>;
  /** Output only. The last time App Hosting checked your custom domain's DNS records. */
  checkTime?: string;
}

export const DnsUpdates: Schema.Schema<DnsUpdates> = Schema.suspend(() => Schema.Struct({
  domainName: Schema.optional(Schema.String),
  discovered: Schema.optional(Schema.Array(DnsRecordSet)),
  desired: Schema.optional(Schema.Array(DnsRecordSet)),
  checkTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DnsUpdates" }) as any as Schema.Schema<DnsUpdates>;

export interface CustomDomainStatus {
  /** Output only. Tracks whether a custom domain is detected as appropriately directing traffic to App Hosting. */
  hostState?: "HOST_STATE_UNSPECIFIED" | "HOST_UNHOSTED" | "HOST_UNREACHABLE" | "HOST_NON_FAH" | "HOST_CONFLICT" | "HOST_WRONG_SHARD" | "HOST_ACTIVE" | (string & {});
  /** Output only. Tracks whether the backend is permitted to serve content on the domain, based off the domain's DNS records. */
  ownershipState?: "OWNERSHIP_STATE_UNSPECIFIED" | "OWNERSHIP_MISSING" | "OWNERSHIP_UNREACHABLE" | "OWNERSHIP_MISMATCH" | "OWNERSHIP_CONFLICT" | "OWNERSHIP_PENDING" | "OWNERSHIP_ACTIVE" | (string & {});
  /** Output only. Tracks SSL certificate status for the domain. */
  certState?: "CERT_STATE_UNSPECIFIED" | "CERT_PREPARING" | "CERT_VALIDATING" | "CERT_PROPAGATING" | "CERT_ACTIVE" | "CERT_EXPIRING_SOON" | "CERT_EXPIRED" | (string & {});
  /** Output only. Lists the records that must added or removed to a custom domain's DNS in order to finish setup and start serving content. Field is present during onboarding. Also present after onboarding if one or more of the above states is not *_ACTIVE, indicating the domain's DNS records are in a bad state. */
  requiredDnsUpdates?: Array<DnsUpdates>;
  /** Output only. A list of issues with domain configuration. Allows users to self-correct problems with DNS records. */
  issues?: Array<Status>;
}

export const CustomDomainStatus: Schema.Schema<CustomDomainStatus> = Schema.suspend(() => Schema.Struct({
  hostState: Schema.optional(Schema.String),
  ownershipState: Schema.optional(Schema.String),
  certState: Schema.optional(Schema.String),
  requiredDnsUpdates: Schema.optional(Schema.Array(DnsUpdates)),
  issues: Schema.optional(Schema.Array(Status)),
})).annotate({ identifier: "CustomDomainStatus" }) as any as Schema.Schema<CustomDomainStatus>;

export interface Domain {
  /** Identifier. The resource name of the domain, e.g. `/projects/p/locations/l/backends/b/domains/foo.com` */
  name?: string;
  /** Optional. Mutable human-readable name for the domain. 63 character limit. e.g. `prod domain`. */
  displayName?: string;
  /** Output only. Time at which the domain was created. */
  createTime?: string;
  /** Output only. Time at which the domain was last updated. */
  updateTime?: string;
  /** Output only. The type of the domain. */
  type?: "TYPE_UNSPECIFIED" | "DEFAULT" | "CUSTOM" | (string & {});
  /** Optional. Whether the domain is disabled. Defaults to false. */
  disabled?: boolean;
  /** Optional. The serving behavior of the domain. If specified, the domain will serve content other than its backend's live content. */
  serve?: ServingBehavior;
  /** Output only. Represents the state and configuration of a `CUSTOM` type domain. It is only present on Domains of that type. */
  customDomainStatus?: CustomDomainStatus;
  /** Output only. A field that, if true, indicates that the build has an ongoing LRO. */
  reconciling?: boolean;
  /** Output only. Time at which the domain was deleted. */
  deleteTime?: string;
  /** Optional. Labels as key value pairs. */
  labels?: Record<string, string>;
  /** Optional. Annotations as key value pairs. */
  annotations?: Record<string, string>;
  /** Output only. System-assigned, unique identifier. */
  uid?: string;
  /** Output only. Server-computed checksum based on other values; may be sent on update or delete to ensure operation is done on expected resource. */
  etag?: string;
}

export const Domain: Schema.Schema<Domain> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  serve: Schema.optional(ServingBehavior),
  customDomainStatus: Schema.optional(CustomDomainStatus),
  reconciling: Schema.optional(Schema.Boolean),
  deleteTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  uid: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Domain" }) as any as Schema.Schema<Domain>;

export interface ListDomainsResponse {
  /** Output only. The list of domains. */
  domains?: Array<Domain>;
  /** Output only. A token identifying the next page of results the server should return. */
  nextPageToken?: string;
  /** Output only. Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListDomainsResponse: Schema.Schema<ListDomainsResponse> = Schema.suspend(() => Schema.Struct({
  domains: Schema.optional(Schema.Array(Domain)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListDomainsResponse" }) as any as Schema.Schema<ListDomainsResponse>;

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

export interface OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface LiveMigrationStep {
  /** Output only. The state of the live migration step, indicates whether you should work to complete the step now, in the future, or have already completed it. */
  stepState?: "STEP_STATE_UNSPECIFIED" | "PREPARING" | "PENDING" | "INCOMPLETE" | "PROCESSING" | "COMPLETE" | (string & {});
  /** Output only. One or more states from the `CustomDomainStatus` of the migrating domain that this step is attempting to make ACTIVE. For example, if the step is attempting to mint an SSL certificate, this field will include `CERT_STATE`. */
  relevantDomainStates?: Array<"CUSTOM_DOMAIN_STATE_UNSPECIFIED" | "HOST_STATE" | "OWNERSHIP_STATE" | "CERT_STATE" | (string & {})>;
  /** Output only. DNS updates to facilitate your domain's zero-downtime migration to App Hosting. */
  dnsUpdates?: Array<DnsUpdates>;
  /** Output only. Issues that prevent the current step from completing. */
  issues?: Array<Status>;
}

export const LiveMigrationStep: Schema.Schema<LiveMigrationStep> = Schema.suspend(() => Schema.Struct({
  stepState: Schema.optional(Schema.String),
  relevantDomainStates: Schema.optional(Schema.Array(Schema.String)),
  dnsUpdates: Schema.optional(Schema.Array(DnsUpdates)),
  issues: Schema.optional(Schema.Array(Status)),
})).annotate({ identifier: "LiveMigrationStep" }) as any as Schema.Schema<LiveMigrationStep>;

export interface CustomDomainOperationMetadata {
  /** Output only. The custom domain's `HostState`, which must be `HOST_ACTIVE` for Create operations of the domain name this `CustomDomain` refers toto complete. */
  hostState?: "HOST_STATE_UNSPECIFIED" | "HOST_UNHOSTED" | "HOST_UNREACHABLE" | "HOST_NON_FAH" | "HOST_CONFLICT" | "HOST_WRONG_SHARD" | "HOST_ACTIVE" | (string & {});
  /** Output only. The custom domain's `OwnershipState`, which must be `OWNERSHIP_ACTIVE` for the create operations to complete. */
  ownershipState?: "OWNERSHIP_STATE_UNSPECIFIED" | "OWNERSHIP_MISSING" | "OWNERSHIP_UNREACHABLE" | "OWNERSHIP_MISMATCH" | "OWNERSHIP_CONFLICT" | "OWNERSHIP_PENDING" | "OWNERSHIP_ACTIVE" | (string & {});
  /** Output only. The custom domain's `CertState`, which must be `CERT_ACTIVE` for the create operations to complete. */
  certState?: "CERT_STATE_UNSPECIFIED" | "CERT_PREPARING" | "CERT_VALIDATING" | "CERT_PROPAGATING" | "CERT_ACTIVE" | "CERT_EXPIRING_SOON" | "CERT_EXPIRED" | (string & {});
  /** Output only. A list of issues that are currently preventing the operation from completing. These are generally DNS-related issues encountered when querying a domain's records or attempting to mint an SSL certificate. */
  issues?: Array<Status>;
  /** Output only. A set of DNS record updates to perform, to allow App Hosting to serve secure content on the domain. */
  quickSetupUpdates?: Array<DnsUpdates>;
  /** Output only. A list of steps that the user must complete to migrate their domain to App Hosting without downtime. */
  liveMigrationSteps?: Array<LiveMigrationStep>;
}

export const CustomDomainOperationMetadata: Schema.Schema<CustomDomainOperationMetadata> = Schema.suspend(() => Schema.Struct({
  hostState: Schema.optional(Schema.String),
  ownershipState: Schema.optional(Schema.String),
  certState: Schema.optional(Schema.String),
  issues: Schema.optional(Schema.Array(Status)),
  quickSetupUpdates: Schema.optional(Schema.Array(DnsUpdates)),
  liveMigrationSteps: Schema.optional(Schema.Array(LiveMigrationStep)),
})).annotate({ identifier: "CustomDomainOperationMetadata" }) as any as Schema.Schema<CustomDomainOperationMetadata>;

export interface DomainOperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Additional metadata for operations on custom domains. */
  customDomainOperationMetadata?: CustomDomainOperationMetadata;
}

export const DomainOperationMetadata: Schema.Schema<DomainOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
  customDomainOperationMetadata: Schema.optional(CustomDomainOperationMetadata),
})).annotate({ identifier: "DomainOperationMetadata" }) as any as Schema.Schema<DomainOperationMetadata>;

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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
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

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
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

export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
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

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Lists backends in a given project and location. */
export interface ListProjectsLocationsBackendsRequest {
  /** Required. A parent name of the form `projects/{project}/locations/{locationId}`. */
  parent: string;
  /** Optional. The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** Optional. A page token received from the nextPageToken field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. A filter to narrow down results to a preferred subset. Learn more about filtering in Google's [AIP 160 standard](https://google.aip.dev/160). */
  filter?: string;
  /** Optional. Hint for how to order the results. Supported fields are `name` and `createTime`. To specify descending order, append a `desc` suffix. */
  orderBy?: string;
  /** Optional. If true, the request returns soft-deleted resources that haven't been fully-deleted yet. */
  showDeleted?: boolean;
}

export const ListProjectsLocationsBackendsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backends" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackendsRequest>;

export type ListProjectsLocationsBackendsResponse = ListBackendsResponse;
export const ListProjectsLocationsBackendsResponse = ListBackendsResponse;

export type ListProjectsLocationsBackendsError = CommonErrors;

export const listProjectsLocationsBackends = API.makePaginated(() => ({
  input: ListProjectsLocationsBackendsRequest,
  output: ListProjectsLocationsBackendsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a backend. */
export interface GetProjectsLocationsBackendsRequest {
  /** Required. Name of the resource in the format: `projects/{project}/locations/{locationId}/backends/{backendId}`. */
  name: string;
}

export const GetProjectsLocationsBackendsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackendsRequest>;

export type GetProjectsLocationsBackendsResponse = Backend;
export const GetProjectsLocationsBackendsResponse = Backend;

export type GetProjectsLocationsBackendsError = CommonErrors;

export const getProjectsLocationsBackends: API.OperationMethod<GetProjectsLocationsBackendsRequest, GetProjectsLocationsBackendsResponse, GetProjectsLocationsBackendsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackendsRequest,
  output: GetProjectsLocationsBackendsResponse,
  errors: [],
}));

/** Creates a new backend in a given project and location. */
export interface CreateProjectsLocationsBackendsRequest {
  /** Required. A parent name of the form `projects/{project}/locations/{locationId}`. */
  parent: string;
  /** Required. Id of the backend. Also used as the service ID for Cloud Run, and as part of the default domain name. */
  backendId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Indicates that the request should be validated and default values populated, without persisting the request or creating any resources. */
  validateOnly?: boolean;
  /** Request body */
  body?: Backend;
}

export const CreateProjectsLocationsBackendsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  backendId: Schema.optional(Schema.String).pipe(T.HttpQuery("backendId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Backend).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backends", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBackendsRequest>;

export type CreateProjectsLocationsBackendsResponse = Operation;
export const CreateProjectsLocationsBackendsResponse = Operation;

export type CreateProjectsLocationsBackendsError = CommonErrors;

export const createProjectsLocationsBackends: API.OperationMethod<CreateProjectsLocationsBackendsRequest, CreateProjectsLocationsBackendsResponse, CreateProjectsLocationsBackendsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBackendsRequest,
  output: CreateProjectsLocationsBackendsResponse,
  errors: [],
}));

/** Updates the information for a single backend. */
export interface PatchProjectsLocationsBackendsRequest {
  /** Identifier. The resource name of the backend. Format: `projects/{project}/locations/{locationId}/backends/{backendId}`. */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the backend resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Indicates that the request should be validated, without persisting the request or updating any resources. */
  validateOnly?: boolean;
  /** Optional. If set to true, and the backend is not found, a new backend will be created. */
  allowMissing?: boolean;
  /** Request body */
  body?: Backend;
}

export const PatchProjectsLocationsBackendsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  body: Schema.optional(Backend).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackendsRequest>;

export type PatchProjectsLocationsBackendsResponse = Operation;
export const PatchProjectsLocationsBackendsResponse = Operation;

export type PatchProjectsLocationsBackendsError = CommonErrors;

export const patchProjectsLocationsBackends: API.OperationMethod<PatchProjectsLocationsBackendsRequest, PatchProjectsLocationsBackendsResponse, PatchProjectsLocationsBackendsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBackendsRequest,
  output: PatchProjectsLocationsBackendsResponse,
  errors: [],
}));

/** Deletes a single backend. */
export interface DeleteProjectsLocationsBackendsRequest {
  /** Required. Name of the resource in the format: `projects/{project}/locations/{locationId}/backends/{backendId}`. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set to true, any resources for this backend will also be deleted. Otherwise, any children resources will block deletion. */
  force?: boolean;
  /** Optional. Indicates that the request should be validated, without persisting the request or updating any resources. */
  validateOnly?: boolean;
  /** Optional. If the client provided etag is out of date, delete will be returned FAILED_PRECONDITION error. */
  etag?: string;
}

export const DeleteProjectsLocationsBackendsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackendsRequest>;

export type DeleteProjectsLocationsBackendsResponse = Operation;
export const DeleteProjectsLocationsBackendsResponse = Operation;

export type DeleteProjectsLocationsBackendsError = CommonErrors;

export const deleteProjectsLocationsBackends: API.OperationMethod<DeleteProjectsLocationsBackendsRequest, DeleteProjectsLocationsBackendsResponse, DeleteProjectsLocationsBackendsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBackendsRequest,
  output: DeleteProjectsLocationsBackendsResponse,
  errors: [],
}));

/** Gets information about a backend's traffic. */
export interface GetProjectsLocationsBackendsTrafficRequest {
  /** Required. Name of the resource in the format: `projects/{project}/locations/{locationId}/backends/{backendId}/traffic`. */
  name: string;
}

export const GetProjectsLocationsBackendsTrafficRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}/traffic" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackendsTrafficRequest>;

export type GetProjectsLocationsBackendsTrafficResponse = Traffic;
export const GetProjectsLocationsBackendsTrafficResponse = Traffic;

export type GetProjectsLocationsBackendsTrafficError = CommonErrors;

export const getProjectsLocationsBackendsTraffic: API.OperationMethod<GetProjectsLocationsBackendsTrafficRequest, GetProjectsLocationsBackendsTrafficResponse, GetProjectsLocationsBackendsTrafficError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackendsTrafficRequest,
  output: GetProjectsLocationsBackendsTrafficResponse,
  errors: [],
}));

/** Updates a backend's traffic. */
export interface PatchProjectsLocationsBackendsTrafficRequest {
  /** Identifier. The resource name of the backend's traffic. Format: `projects/{project}/locations/{locationId}/backends/{backendId}/traffic`. */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the traffic resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Indicates that the request should be validated, without persisting the request or updating any resources. */
  validateOnly?: boolean;
  /** Request body */
  body?: Traffic;
}

export const PatchProjectsLocationsBackendsTrafficRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Traffic).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}/traffic", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackendsTrafficRequest>;

export type PatchProjectsLocationsBackendsTrafficResponse = Operation;
export const PatchProjectsLocationsBackendsTrafficResponse = Operation;

export type PatchProjectsLocationsBackendsTrafficError = CommonErrors;

export const patchProjectsLocationsBackendsTraffic: API.OperationMethod<PatchProjectsLocationsBackendsTrafficRequest, PatchProjectsLocationsBackendsTrafficResponse, PatchProjectsLocationsBackendsTrafficError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBackendsTrafficRequest,
  output: PatchProjectsLocationsBackendsTrafficResponse,
  errors: [],
}));

/** Lists builds in a given project, location, and backend. */
export interface ListProjectsLocationsBackendsBuildsRequest {
  /** Required. The parent backend in the form `projects/{project}/locations/{locationId}/backends/{backendId}`. */
  parent: string;
  /** Optional. The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** Optional. A page token received from the nextPageToken field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. A filter to narrow down results to a preferred subset. Learn more about filtering in Google's [AIP 160 standard](https://google.aip.dev/160). */
  filter?: string;
  /** Optional. Hint for how to order the results. Supported fields are `name` and `createTime`. To specify descending order, append a `desc` suffix. */
  orderBy?: string;
  /** Optional. If true, the request returns soft-deleted resources that haven't been fully-deleted yet. */
  showDeleted?: boolean;
}

export const ListProjectsLocationsBackendsBuildsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}/builds" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackendsBuildsRequest>;

export type ListProjectsLocationsBackendsBuildsResponse = ListBuildsResponse;
export const ListProjectsLocationsBackendsBuildsResponse = ListBuildsResponse;

export type ListProjectsLocationsBackendsBuildsError = CommonErrors;

export const listProjectsLocationsBackendsBuilds = API.makePaginated(() => ({
  input: ListProjectsLocationsBackendsBuildsRequest,
  output: ListProjectsLocationsBackendsBuildsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a build. */
export interface GetProjectsLocationsBackendsBuildsRequest {
  /** Required. Name of the resource in the format: `projects/{project}/locations/{locationId}/backends/{backendId}/builds/{buildId}`. */
  name: string;
}

export const GetProjectsLocationsBackendsBuildsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}/builds/{buildsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackendsBuildsRequest>;

export type GetProjectsLocationsBackendsBuildsResponse = Build;
export const GetProjectsLocationsBackendsBuildsResponse = Build;

export type GetProjectsLocationsBackendsBuildsError = CommonErrors;

export const getProjectsLocationsBackendsBuilds: API.OperationMethod<GetProjectsLocationsBackendsBuildsRequest, GetProjectsLocationsBackendsBuildsResponse, GetProjectsLocationsBackendsBuildsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackendsBuildsRequest,
  output: GetProjectsLocationsBackendsBuildsResponse,
  errors: [],
}));

/** Creates a new build for a backend. */
export interface CreateProjectsLocationsBackendsBuildsRequest {
  /** Required. The parent backend in the format: `projects/{project}/locations/{locationId}/backends/{backendId}`. */
  parent: string;
  /** Required. Desired ID of the build being created. */
  buildId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Indicates that the request should be validated and default values populated, without persisting the request or creating any resources. */
  validateOnly?: boolean;
  /** Request body */
  body?: Build;
}

export const CreateProjectsLocationsBackendsBuildsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  buildId: Schema.optional(Schema.String).pipe(T.HttpQuery("buildId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Build).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}/builds", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBackendsBuildsRequest>;

export type CreateProjectsLocationsBackendsBuildsResponse = Operation;
export const CreateProjectsLocationsBackendsBuildsResponse = Operation;

export type CreateProjectsLocationsBackendsBuildsError = CommonErrors;

export const createProjectsLocationsBackendsBuilds: API.OperationMethod<CreateProjectsLocationsBackendsBuildsRequest, CreateProjectsLocationsBackendsBuildsResponse, CreateProjectsLocationsBackendsBuildsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBackendsBuildsRequest,
  output: CreateProjectsLocationsBackendsBuildsResponse,
  errors: [],
}));

/** Deletes a single build. */
export interface DeleteProjectsLocationsBackendsBuildsRequest {
  /** Required. Name of the resource in the format: `projects/{project}/locations/{locationId}/backends/{backendId}/builds/{buildId}`. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If the client provided etag is out of date, delete will be returned FAILED_PRECONDITION error. */
  etag?: string;
  /** Optional. Indicates that the request should be validated and default values populated, without persisting the request or deleting any resources. */
  validateOnly?: boolean;
}

export const DeleteProjectsLocationsBackendsBuildsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}/builds/{buildsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackendsBuildsRequest>;

export type DeleteProjectsLocationsBackendsBuildsResponse = Operation;
export const DeleteProjectsLocationsBackendsBuildsResponse = Operation;

export type DeleteProjectsLocationsBackendsBuildsError = CommonErrors;

export const deleteProjectsLocationsBackendsBuilds: API.OperationMethod<DeleteProjectsLocationsBackendsBuildsRequest, DeleteProjectsLocationsBackendsBuildsResponse, DeleteProjectsLocationsBackendsBuildsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBackendsBuildsRequest,
  output: DeleteProjectsLocationsBackendsBuildsResponse,
  errors: [],
}));

/** Lists rollouts for a backend. */
export interface ListProjectsLocationsBackendsRolloutsRequest {
  /** Required. The parent backend in the format: `projects/{project}/locations/{locationId}/backends/{backendId}`. */
  parent: string;
  /** Optional. The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** Optional. A page token received from the nextPageToken field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. A filter to narrow down results to a preferred subset. Learn more about filtering in Google's [AIP 160 standard](https://google.aip.dev/160). */
  filter?: string;
  /** Optional. Hint for how to order the results. Supported fields are `name` and `createTime`. To specify descending order, append a `desc` suffix. */
  orderBy?: string;
  /** Optional. If true, the request returns soft-deleted resources that haven't been fully-deleted yet. */
  showDeleted?: boolean;
}

export const ListProjectsLocationsBackendsRolloutsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}/rollouts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackendsRolloutsRequest>;

export type ListProjectsLocationsBackendsRolloutsResponse = ListRolloutsResponse;
export const ListProjectsLocationsBackendsRolloutsResponse = ListRolloutsResponse;

export type ListProjectsLocationsBackendsRolloutsError = CommonErrors;

export const listProjectsLocationsBackendsRollouts = API.makePaginated(() => ({
  input: ListProjectsLocationsBackendsRolloutsRequest,
  output: ListProjectsLocationsBackendsRolloutsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a rollout. */
export interface GetProjectsLocationsBackendsRolloutsRequest {
  /** Required. Name of the resource in the format: `projects/{project}/locations/{locationId}/backends/{backendId}/rollouts/{rolloutId}`. */
  name: string;
}

export const GetProjectsLocationsBackendsRolloutsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}/rollouts/{rolloutsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackendsRolloutsRequest>;

export type GetProjectsLocationsBackendsRolloutsResponse = Rollout;
export const GetProjectsLocationsBackendsRolloutsResponse = Rollout;

export type GetProjectsLocationsBackendsRolloutsError = CommonErrors;

export const getProjectsLocationsBackendsRollouts: API.OperationMethod<GetProjectsLocationsBackendsRolloutsRequest, GetProjectsLocationsBackendsRolloutsResponse, GetProjectsLocationsBackendsRolloutsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackendsRolloutsRequest,
  output: GetProjectsLocationsBackendsRolloutsResponse,
  errors: [],
}));

/** Creates a new rollout for a backend. */
export interface CreateProjectsLocationsBackendsRolloutsRequest {
  /** Required. The parent backend in the format: `projects/{project}/locations/{locationId}/backends/{backendId}`. */
  parent: string;
  /** Optional. Desired ID of the rollout being created. */
  rolloutId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Indicates that the request should be validated and default values populated, without persisting the request or creating any resources. */
  validateOnly?: boolean;
  /** Request body */
  body?: Rollout;
}

export const CreateProjectsLocationsBackendsRolloutsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  rolloutId: Schema.optional(Schema.String).pipe(T.HttpQuery("rolloutId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Rollout).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}/rollouts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBackendsRolloutsRequest>;

export type CreateProjectsLocationsBackendsRolloutsResponse = Operation;
export const CreateProjectsLocationsBackendsRolloutsResponse = Operation;

export type CreateProjectsLocationsBackendsRolloutsError = CommonErrors;

export const createProjectsLocationsBackendsRollouts: API.OperationMethod<CreateProjectsLocationsBackendsRolloutsRequest, CreateProjectsLocationsBackendsRolloutsResponse, CreateProjectsLocationsBackendsRolloutsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBackendsRolloutsRequest,
  output: CreateProjectsLocationsBackendsRolloutsResponse,
  errors: [],
}));

/** Lists domains of a backend. */
export interface ListProjectsLocationsBackendsDomainsRequest {
  /** Required. The parent backend in the format: `projects/{project}/locations/{locationId}/backends/{backendId}`. */
  parent: string;
  /** Optional. The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** Optional. A page token received from the nextPageToken field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. A filter to narrow down results to a preferred subset. Learn more about filtering in Google's [AIP 160 standard](https://google.aip.dev/160). */
  filter?: string;
  /** Optional. Hint for how to order the results. Supported fields are `name` and `createTime`. To specify descending order, append a `desc` suffix. */
  orderBy?: string;
  /** Optional. If true, the request returns soft-deleted resources that haven't been fully-deleted yet. */
  showDeleted?: boolean;
}

export const ListProjectsLocationsBackendsDomainsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}/domains" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackendsDomainsRequest>;

export type ListProjectsLocationsBackendsDomainsResponse = ListDomainsResponse;
export const ListProjectsLocationsBackendsDomainsResponse = ListDomainsResponse;

export type ListProjectsLocationsBackendsDomainsError = CommonErrors;

export const listProjectsLocationsBackendsDomains = API.makePaginated(() => ({
  input: ListProjectsLocationsBackendsDomainsRequest,
  output: ListProjectsLocationsBackendsDomainsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a domain. */
export interface GetProjectsLocationsBackendsDomainsRequest {
  /** Required. Name of the resource in the format: `projects/{project}/locations/{locationId}/backends/{backendId}/domains/{domainId}`. */
  name: string;
}

export const GetProjectsLocationsBackendsDomainsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}/domains/{domainsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackendsDomainsRequest>;

export type GetProjectsLocationsBackendsDomainsResponse = Domain;
export const GetProjectsLocationsBackendsDomainsResponse = Domain;

export type GetProjectsLocationsBackendsDomainsError = CommonErrors;

export const getProjectsLocationsBackendsDomains: API.OperationMethod<GetProjectsLocationsBackendsDomainsRequest, GetProjectsLocationsBackendsDomainsResponse, GetProjectsLocationsBackendsDomainsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackendsDomainsRequest,
  output: GetProjectsLocationsBackendsDomainsResponse,
  errors: [],
}));

/** Links a new domain to a backend. */
export interface CreateProjectsLocationsBackendsDomainsRequest {
  /** Required. The parent backend in the format: `projects/{project}/locations/{locationId}/backends/{backendId}`. */
  parent: string;
  /** Required. Id of the domain to create. Must be a valid domain name. */
  domainId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Indicates that the request should be validated and default values populated, without persisting the request or creating any resources. */
  validateOnly?: boolean;
  /** Request body */
  body?: Domain;
}

export const CreateProjectsLocationsBackendsDomainsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  domainId: Schema.optional(Schema.String).pipe(T.HttpQuery("domainId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Domain).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}/domains", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBackendsDomainsRequest>;

export type CreateProjectsLocationsBackendsDomainsResponse = Operation;
export const CreateProjectsLocationsBackendsDomainsResponse = Operation;

export type CreateProjectsLocationsBackendsDomainsError = CommonErrors;

export const createProjectsLocationsBackendsDomains: API.OperationMethod<CreateProjectsLocationsBackendsDomainsRequest, CreateProjectsLocationsBackendsDomainsResponse, CreateProjectsLocationsBackendsDomainsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBackendsDomainsRequest,
  output: CreateProjectsLocationsBackendsDomainsResponse,
  errors: [],
}));

/** Updates the information for a single domain. */
export interface PatchProjectsLocationsBackendsDomainsRequest {
  /** Identifier. The resource name of the domain, e.g. `/projects/p/locations/l/backends/b/domains/foo.com` */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the Domain resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Indicates that the request should be validated and default values populated, without persisting the request or modifying any resources. */
  validateOnly?: boolean;
  /** Optional. If set to true, and the domain is not found, a new domain will be created. */
  allowMissing?: boolean;
  /** Request body */
  body?: Domain;
}

export const PatchProjectsLocationsBackendsDomainsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  body: Schema.optional(Domain).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}/domains/{domainsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackendsDomainsRequest>;

export type PatchProjectsLocationsBackendsDomainsResponse = Operation;
export const PatchProjectsLocationsBackendsDomainsResponse = Operation;

export type PatchProjectsLocationsBackendsDomainsError = CommonErrors;

export const patchProjectsLocationsBackendsDomains: API.OperationMethod<PatchProjectsLocationsBackendsDomainsRequest, PatchProjectsLocationsBackendsDomainsResponse, PatchProjectsLocationsBackendsDomainsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBackendsDomainsRequest,
  output: PatchProjectsLocationsBackendsDomainsResponse,
  errors: [],
}));

/** Deletes a single domain. */
export interface DeleteProjectsLocationsBackendsDomainsRequest {
  /** Required. Name of the resource in the format: `projects/{project}/locations/{locationId}/backends/{backendId}/domains/{domainId}`. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If the client provided etag is out of date, delete will be returned FAILED_PRECONDITION error. */
  etag?: string;
  /** Optional. Indicates that the request should be validated and default values populated, without persisting the request or deleting any resources. */
  validateOnly?: boolean;
}

export const DeleteProjectsLocationsBackendsDomainsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/backends/{backendsId}/domains/{domainsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackendsDomainsRequest>;

export type DeleteProjectsLocationsBackendsDomainsResponse = Operation;
export const DeleteProjectsLocationsBackendsDomainsResponse = Operation;

export type DeleteProjectsLocationsBackendsDomainsError = CommonErrors;

export const deleteProjectsLocationsBackendsDomains: API.OperationMethod<DeleteProjectsLocationsBackendsDomainsRequest, DeleteProjectsLocationsBackendsDomainsResponse, DeleteProjectsLocationsBackendsDomainsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBackendsDomainsRequest,
  output: DeleteProjectsLocationsBackendsDomainsResponse,
  errors: [],
}));

