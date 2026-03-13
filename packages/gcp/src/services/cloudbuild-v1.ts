// ==========================================================================
// Cloud Build API (cloudbuild v1)
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
  name: "cloudbuild",
  version: "v1",
  rootUrl: "https://cloudbuild.googleapis.com/",
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

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
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

export const Operation: Schema.Schema<Operation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      done: Schema.optional(Schema.Boolean),
      error: Schema.optional(Status),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface CancelOperationRequest {}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelOperationRequest",
  }) as any as Schema.Schema<CancelOperationRequest>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface StorageSource {
  /** Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). */
  bucket?: string;
  /** Required. Cloud Storage object containing the source. This object must be a zipped (`.zip`) or gzipped archive file (`.tar.gz`) containing source to build. */
  object?: string;
  /** Optional. Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. */
  generation?: string;
  /** Optional. Option to specify the tool to fetch the source file for the build. */
  sourceFetcher?:
    | "SOURCE_FETCHER_UNSPECIFIED"
    | "GSUTIL"
    | "GCS_FETCHER"
    | (string & {});
}

export const StorageSource: Schema.Schema<StorageSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bucket: Schema.optional(Schema.String),
      object: Schema.optional(Schema.String),
      generation: Schema.optional(Schema.String),
      sourceFetcher: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StorageSource",
  }) as any as Schema.Schema<StorageSource>;

export interface RepoSource {
  /** Optional. ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed. */
  projectId?: string;
  /** Required. Name of the Cloud Source Repository. */
  repoName?: string;
  /** Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax */
  branchName?: string;
  /** Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax */
  tagName?: string;
  /** Explicit commit SHA to build. */
  commitSha?: string;
  /** Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. */
  dir?: string;
  /** Optional. Only trigger a build if the revision regex does NOT match the revision regex. */
  invertRegex?: boolean;
  /** Optional. Substitutions to use in a triggered build. Should only be used with RunBuildTrigger */
  substitutions?: Record<string, string>;
}

export const RepoSource: Schema.Schema<RepoSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      projectId: Schema.optional(Schema.String),
      repoName: Schema.optional(Schema.String),
      branchName: Schema.optional(Schema.String),
      tagName: Schema.optional(Schema.String),
      commitSha: Schema.optional(Schema.String),
      dir: Schema.optional(Schema.String),
      invertRegex: Schema.optional(Schema.Boolean),
      substitutions: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({ identifier: "RepoSource" }) as any as Schema.Schema<RepoSource>;

export interface GitSource {
  /** Required. Location of the Git repo to build. This will be used as a `git remote`, see https://git-scm.com/docs/git-remote. */
  url?: string;
  /** Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. */
  dir?: string;
  /** Optional. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. Cloud Build uses `git fetch` to fetch the revision from the Git repository; therefore make sure that the string you provide for `revision` is parsable by the command. For information on string values accepted by `git fetch`, see https://git-scm.com/docs/gitrevisions#_specifying_revisions. For information on `git fetch`, see https://git-scm.com/docs/git-fetch. */
  revision?: string;
}

export const GitSource: Schema.Schema<GitSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      dir: Schema.optional(Schema.String),
      revision: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "GitSource" }) as any as Schema.Schema<GitSource>;

export interface StorageSourceManifest {
  /** Required. Cloud Storage bucket containing the source manifest (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). */
  bucket?: string;
  /** Required. Cloud Storage object containing the source manifest. This object must be a JSON file. */
  object?: string;
  /** Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. */
  generation?: string;
}

export const StorageSourceManifest: Schema.Schema<StorageSourceManifest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bucket: Schema.optional(Schema.String),
      object: Schema.optional(Schema.String),
      generation: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StorageSourceManifest",
  }) as any as Schema.Schema<StorageSourceManifest>;

export interface ConnectedRepository {
  /** Required. Name of the Google Cloud Build repository, formatted as `projects/* /locations/* /connections/* /repositories/*`. */
  repository?: string;
  /** Optional. Directory, relative to the source root, in which to run the build. */
  dir?: string;
  /** Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. */
  revision?: string;
}

export const ConnectedRepository: Schema.Schema<ConnectedRepository> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      repository: Schema.optional(Schema.String),
      dir: Schema.optional(Schema.String),
      revision: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConnectedRepository",
  }) as any as Schema.Schema<ConnectedRepository>;

export interface DeveloperConnectConfig {
  /** Required. The Developer Connect Git repository link, formatted as `projects/* /locations/* /connections/* /gitRepositoryLink/*`. */
  gitRepositoryLink?: string;
  /** Required. Directory, relative to the source root, in which to run the build. */
  dir?: string;
  /** Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. */
  revision?: string;
}

export const DeveloperConnectConfig: Schema.Schema<DeveloperConnectConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gitRepositoryLink: Schema.optional(Schema.String),
      dir: Schema.optional(Schema.String),
      revision: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeveloperConnectConfig",
  }) as any as Schema.Schema<DeveloperConnectConfig>;

export interface Source {
  /** If provided, get the source from this location in Cloud Storage. */
  storageSource?: StorageSource;
  /** If provided, get the source from this location in a Cloud Source Repository. */
  repoSource?: RepoSource;
  /** If provided, get the source from this Git repository. */
  gitSource?: GitSource;
  /** If provided, get the source from this manifest in Cloud Storage. This feature is in Preview; see description [here](https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher). */
  storageSourceManifest?: StorageSourceManifest;
  /** Optional. If provided, get the source from this 2nd-gen Google Cloud Build repository resource. */
  connectedRepository?: ConnectedRepository;
  /** If provided, get the source from this Developer Connect config. */
  developerConnectConfig?: DeveloperConnectConfig;
}

export const Source: Schema.Schema<Source> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      storageSource: Schema.optional(StorageSource),
      repoSource: Schema.optional(RepoSource),
      gitSource: Schema.optional(GitSource),
      storageSourceManifest: Schema.optional(StorageSourceManifest),
      connectedRepository: Schema.optional(ConnectedRepository),
      developerConnectConfig: Schema.optional(DeveloperConnectConfig),
    }),
  ).annotate({ identifier: "Source" }) as any as Schema.Schema<Source>;

export interface Volume {
  /** Name of the volume to mount. Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps. */
  name?: string;
  /** Path at which to mount the volume. Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths. */
  path?: string;
}

export const Volume: Schema.Schema<Volume> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Volume" }) as any as Schema.Schema<Volume>;

export interface TimeSpan {
  /** Start of time span. */
  startTime?: string;
  /** End of time span. */
  endTime?: string;
}

export const TimeSpan: Schema.Schema<TimeSpan> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "TimeSpan" }) as any as Schema.Schema<TimeSpan>;

export interface BuildStep {
  /** Required. The name of the container image that will run this particular build step. If the image is available in the host's Docker daemon's cache, it will be run directly. If not, the host will attempt to pull the image first, using the builder service account's credentials if necessary. The Docker daemon's cache will already have the latest versions of all of the officially supported build steps ([https://github.com/GoogleCloudPlatform/cloud-builders](https://github.com/GoogleCloudPlatform/cloud-builders)). The Docker daemon will also have cached many of the layers for some popular images, like "ubuntu", "debian", but they will be refreshed at the time you attempt to use them. If you built an image in a previous build step, it will be stored in the host's Docker daemon's cache and is available to use as the name for a later build step. */
  name?: string;
  /** A list of environment variable definitions to be used when running a step. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". */
  env?: Array<string>;
  /** A list of arguments that will be presented to the step when it is started. If the image used to run the step's container has an entrypoint, the `args` are used as arguments to that entrypoint. If the image does not define an entrypoint, the first element in args is used as the entrypoint, and the remainder will be used as arguments. */
  args?: Array<string>;
  /** Working directory to use when running this step's container. If this value is a relative path, it is relative to the build's working directory. If this value is absolute, it may be outside the build's working directory, in which case the contents of the path may not be persisted across build step executions, unless a `volume` for that path is specified. If the build specifies a `RepoSource` with `dir` and a step with a `dir`, which specifies an absolute path, the `RepoSource` `dir` is ignored for the step's execution. */
  dir?: string;
  /** Unique identifier for this build step, used in `wait_for` to reference this build step as a dependency. */
  id?: string;
  /** The ID(s) of the step(s) that this build step depends on. This build step will not start until all the build steps in `wait_for` have completed successfully. If `wait_for` is empty, this build step will start when all previous build steps in the `Build.Steps` list have completed successfully. */
  waitFor?: Array<string>;
  /** Entrypoint to be used instead of the build step image's default entrypoint. If unset, the image's default entrypoint is used. */
  entrypoint?: string;
  /** A list of environment variables which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. */
  secretEnv?: Array<string>;
  /** List of volumes to mount into the build step. Each volume is created as an empty volume prior to execution of the build step. Upon completion of the build, volumes and their contents are discarded. Using a named volume in only one step is not valid as it is indicative of a build request with an incorrect configuration. */
  volumes?: Array<Volume>;
  /** Output only. Stores timing information for executing this build step. */
  timing?: TimeSpan;
  /** Output only. Stores timing information for pulling this build step's builder image only. */
  pullTiming?: TimeSpan;
  /** Time limit for executing this build step. If not defined, the step has no time limit and will be allowed to continue to run until either it completes or the build itself times out. */
  timeout?: string;
  /** Output only. Status of the build step. At this time, build step status is only updated on build completion; step status is not updated in real-time as the build progresses. */
  status?:
    | "STATUS_UNKNOWN"
    | "PENDING"
    | "QUEUED"
    | "WORKING"
    | "SUCCESS"
    | "FAILURE"
    | "INTERNAL_ERROR"
    | "TIMEOUT"
    | "CANCELLED"
    | "EXPIRED"
    | (string & {});
  /** Allow this build step to fail without failing the entire build. If false, the entire build will fail if this step fails. Otherwise, the build will succeed, but this step will still have a failure status. Error information will be reported in the failure_detail field. */
  allowFailure?: boolean;
  /** Output only. Return code from running the step. */
  exitCode?: number;
  /** Allow this build step to fail without failing the entire build if and only if the exit code is one of the specified codes. If allow_failure is also specified, this field will take precedence. */
  allowExitCodes?: Array<number>;
  /** A shell script to be executed in the step. When script is provided, the user cannot specify the entrypoint or args. */
  script?: string;
  /** Option to include built-in and custom substitutions as env variables for this build step. This option will override the global option in BuildOption. */
  automapSubstitutions?: boolean;
}

export const BuildStep: Schema.Schema<BuildStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      env: Schema.optional(Schema.Array(Schema.String)),
      args: Schema.optional(Schema.Array(Schema.String)),
      dir: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      waitFor: Schema.optional(Schema.Array(Schema.String)),
      entrypoint: Schema.optional(Schema.String),
      secretEnv: Schema.optional(Schema.Array(Schema.String)),
      volumes: Schema.optional(Schema.Array(Volume)),
      timing: Schema.optional(TimeSpan),
      pullTiming: Schema.optional(TimeSpan),
      timeout: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      allowFailure: Schema.optional(Schema.Boolean),
      exitCode: Schema.optional(Schema.Number),
      allowExitCodes: Schema.optional(Schema.Array(Schema.Number)),
      script: Schema.optional(Schema.String),
      automapSubstitutions: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "BuildStep" }) as any as Schema.Schema<BuildStep>;

export interface BuiltImage {
  /** Name used to push the container image to Google Container Registry, as presented to `docker push`. */
  name?: string;
  /** Docker Registry 2.0 digest. */
  digest?: string;
  /** Output only. Stores timing information for pushing the specified image. */
  pushTiming?: TimeSpan;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
}

export const BuiltImage: Schema.Schema<BuiltImage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      digest: Schema.optional(Schema.String),
      pushTiming: Schema.optional(TimeSpan),
      artifactRegistryPackage: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "BuiltImage" }) as any as Schema.Schema<BuiltImage>;

export interface Hash {
  /** The type of hash that was performed. */
  type?: "NONE" | "SHA256" | "MD5" | "GO_MODULE_H1" | "SHA512" | (string & {});
  /** The hash value. */
  value?: string;
}

export const Hash: Schema.Schema<Hash> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Hash" }) as any as Schema.Schema<Hash>;

export interface FileHashes {
  /** Collection of file hashes. */
  fileHash?: Array<Hash>;
}

export const FileHashes: Schema.Schema<FileHashes> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fileHash: Schema.optional(Schema.Array(Hash)),
    }),
  ).annotate({ identifier: "FileHashes" }) as any as Schema.Schema<FileHashes>;

export interface UploadedPythonPackage {
  /** URI of the uploaded artifact. */
  uri?: string;
  /** Hash types and values of the Python Artifact. */
  fileHashes?: FileHashes;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: TimeSpan;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
}

export const UploadedPythonPackage: Schema.Schema<UploadedPythonPackage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      fileHashes: Schema.optional(FileHashes),
      pushTiming: Schema.optional(TimeSpan),
      artifactRegistryPackage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UploadedPythonPackage",
  }) as any as Schema.Schema<UploadedPythonPackage>;

export interface UploadedMavenArtifact {
  /** URI of the uploaded artifact. */
  uri?: string;
  /** Hash types and values of the Maven Artifact. */
  fileHashes?: FileHashes;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: TimeSpan;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
}

export const UploadedMavenArtifact: Schema.Schema<UploadedMavenArtifact> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      fileHashes: Schema.optional(FileHashes),
      pushTiming: Schema.optional(TimeSpan),
      artifactRegistryPackage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UploadedMavenArtifact",
  }) as any as Schema.Schema<UploadedMavenArtifact>;

export interface UploadedGoModule {
  /** URI of the uploaded artifact. */
  uri?: string;
  /** Hash types and values of the Go Module Artifact. */
  fileHashes?: FileHashes;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: TimeSpan;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
}

export const UploadedGoModule: Schema.Schema<UploadedGoModule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      fileHashes: Schema.optional(FileHashes),
      pushTiming: Schema.optional(TimeSpan),
      artifactRegistryPackage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UploadedGoModule",
  }) as any as Schema.Schema<UploadedGoModule>;

export interface UploadedNpmPackage {
  /** URI of the uploaded npm package. */
  uri?: string;
  /** Hash types and values of the npm package. */
  fileHashes?: FileHashes;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: TimeSpan;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
}

export const UploadedNpmPackage: Schema.Schema<UploadedNpmPackage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      fileHashes: Schema.optional(FileHashes),
      pushTiming: Schema.optional(TimeSpan),
      artifactRegistryPackage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UploadedNpmPackage",
  }) as any as Schema.Schema<UploadedNpmPackage>;

export interface Results {
  /** Container images that were built as a part of the build. */
  images?: Array<BuiltImage>;
  /** List of build step digests, in the order corresponding to build step indices. */
  buildStepImages?: Array<string>;
  /** Path to the artifact manifest for non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage. */
  artifactManifest?: string;
  /** Number of non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage. */
  numArtifacts?: string;
  /** List of build step outputs, produced by builder images, in the order corresponding to build step indices. [Cloud Builders](https://cloud.google.com/cloud-build/docs/cloud-builders) can produce this output by writing to `$BUILDER_OUTPUT/output`. Only the first 50KB of data is stored. Note that the `$BUILDER_OUTPUT` variable is read-only and can't be substituted. */
  buildStepOutputs?: Array<string>;
  /** Time to push all non-container artifacts to Cloud Storage. */
  artifactTiming?: TimeSpan;
  /** Python artifacts uploaded to Artifact Registry at the end of the build. */
  pythonPackages?: Array<UploadedPythonPackage>;
  /** Maven artifacts uploaded to Artifact Registry at the end of the build. */
  mavenArtifacts?: Array<UploadedMavenArtifact>;
  /** Optional. Go module artifacts uploaded to Artifact Registry at the end of the build. */
  goModules?: Array<UploadedGoModule>;
  /** Npm packages uploaded to Artifact Registry at the end of the build. */
  npmPackages?: Array<UploadedNpmPackage>;
}

export const Results: Schema.Schema<Results> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      images: Schema.optional(Schema.Array(BuiltImage)),
      buildStepImages: Schema.optional(Schema.Array(Schema.String)),
      artifactManifest: Schema.optional(Schema.String),
      numArtifacts: Schema.optional(Schema.String),
      buildStepOutputs: Schema.optional(Schema.Array(Schema.String)),
      artifactTiming: Schema.optional(TimeSpan),
      pythonPackages: Schema.optional(Schema.Array(UploadedPythonPackage)),
      mavenArtifacts: Schema.optional(Schema.Array(UploadedMavenArtifact)),
      goModules: Schema.optional(Schema.Array(UploadedGoModule)),
      npmPackages: Schema.optional(Schema.Array(UploadedNpmPackage)),
    }),
  ).annotate({ identifier: "Results" }) as any as Schema.Schema<Results>;

export interface ArtifactObjects {
  /** Cloud Storage bucket and optional object path, in the form "gs://bucket/path/to/somewhere/". (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). Files in the workspace matching any path pattern will be uploaded to Cloud Storage with this location as a prefix. */
  location?: string;
  /** Path globs used to match files in the build's workspace. */
  paths?: Array<string>;
  /** Output only. Stores timing information for pushing all artifact objects. */
  timing?: TimeSpan;
}

export const ArtifactObjects: Schema.Schema<ArtifactObjects> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      location: Schema.optional(Schema.String),
      paths: Schema.optional(Schema.Array(Schema.String)),
      timing: Schema.optional(TimeSpan),
    }),
  ).annotate({
    identifier: "ArtifactObjects",
  }) as any as Schema.Schema<ArtifactObjects>;

export interface MavenArtifact {
  /** Artifact Registry repository, in the form "https://$REGION-maven.pkg.dev/$PROJECT/$REPOSITORY" Artifact in the workspace specified by path will be uploaded to Artifact Registry with this location as a prefix. */
  repository?: string;
  /** Optional. Path to an artifact in the build's workspace to be uploaded to Artifact Registry. This can be either an absolute path, e.g. /workspace/my-app/target/my-app-1.0.SNAPSHOT.jar or a relative path from /workspace, e.g. my-app/target/my-app-1.0.SNAPSHOT.jar. */
  path?: string;
  /** Maven `artifactId` value used when uploading the artifact to Artifact Registry. */
  artifactId?: string;
  /** Maven `groupId` value used when uploading the artifact to Artifact Registry. */
  groupId?: string;
  /** Maven `version` value used when uploading the artifact to Artifact Registry. */
  version?: string;
  /** Optional. Path to a folder containing the files to upload to Artifact Registry. This can be either an absolute path, e.g. `/workspace/my-app/target/`, or a relative path from /workspace, e.g. `my-app/target/`. This field is mutually exclusive with the `path` field. */
  deployFolder?: string;
}

export const MavenArtifact: Schema.Schema<MavenArtifact> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      repository: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      artifactId: Schema.optional(Schema.String),
      groupId: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      deployFolder: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MavenArtifact",
  }) as any as Schema.Schema<MavenArtifact>;

export interface GoModule {
  /** Optional. Artifact Registry repository name. Specified Go modules will be zipped and uploaded to Artifact Registry with this location as a prefix. e.g. my-go-repo */
  repositoryName?: string;
  /** Optional. Location of the Artifact Registry repository. i.e. us-east1 Defaults to the build’s location. */
  repositoryLocation?: string;
  /** Optional. Project ID of the Artifact Registry repository. Defaults to the build project. */
  repositoryProjectId?: string;
  /** Optional. Source path of the go.mod file in the build's workspace. If not specified, this will default to the current directory. e.g. ~/code/go/mypackage */
  sourcePath?: string;
  /** Optional. The Go module's "module path". e.g. example.com/foo/v2 */
  modulePath?: string;
  /** Optional. The Go module's semantic version in the form vX.Y.Z. e.g. v0.1.1 Pre-release identifiers can also be added by appending a dash and dot separated ASCII alphanumeric characters and hyphens. e.g. v0.2.3-alpha.x.12m.5 */
  moduleVersion?: string;
}

export const GoModule: Schema.Schema<GoModule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      repositoryName: Schema.optional(Schema.String),
      repositoryLocation: Schema.optional(Schema.String),
      repositoryProjectId: Schema.optional(Schema.String),
      sourcePath: Schema.optional(Schema.String),
      modulePath: Schema.optional(Schema.String),
      moduleVersion: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "GoModule" }) as any as Schema.Schema<GoModule>;

export interface PythonPackage {
  /** Artifact Registry repository, in the form "https://$REGION-python.pkg.dev/$PROJECT/$REPOSITORY" Files in the workspace matching any path pattern will be uploaded to Artifact Registry with this location as a prefix. */
  repository?: string;
  /** Path globs used to match files in the build's workspace. For Python/ Twine, this is usually `dist/*`, and sometimes additionally an `.asc` file. */
  paths?: Array<string>;
}

export const PythonPackage: Schema.Schema<PythonPackage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      repository: Schema.optional(Schema.String),
      paths: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "PythonPackage",
  }) as any as Schema.Schema<PythonPackage>;

export interface NpmPackage {
  /** Artifact Registry repository, in the form "https://$REGION-npm.pkg.dev/$PROJECT/$REPOSITORY" Npm package in the workspace specified by path will be zipped and uploaded to Artifact Registry with this location as a prefix. */
  repository?: string;
  /** Optional. Path to the package.json. e.g. workspace/path/to/package Only one of `archive` or `package_path` can be specified. */
  packagePath?: string;
}

export const NpmPackage: Schema.Schema<NpmPackage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      repository: Schema.optional(Schema.String),
      packagePath: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "NpmPackage" }) as any as Schema.Schema<NpmPackage>;

export interface Artifacts {
  /** A list of images to be pushed upon the successful completion of all build steps. The images will be pushed using the builder service account's credentials. The digests of the pushed images will be stored in the Build resource's results field. If any of the images fail to be pushed, the build is marked FAILURE. */
  images?: Array<string>;
  /** A list of objects to be uploaded to Cloud Storage upon successful completion of all build steps. Files in the workspace matching specified paths globs will be uploaded to the specified Cloud Storage location using the builder service account's credentials. The location and generation of the uploaded objects will be stored in the Build resource's results field. If any objects fail to be pushed, the build is marked FAILURE. */
  objects?: ArtifactObjects;
  /** A list of Maven artifacts to be uploaded to Artifact Registry upon successful completion of all build steps. Artifacts in the workspace matching specified paths globs will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any artifacts fail to be pushed, the build is marked FAILURE. */
  mavenArtifacts?: Array<MavenArtifact>;
  /** Optional. A list of Go modules to be uploaded to Artifact Registry upon successful completion of all build steps. If any objects fail to be pushed, the build is marked FAILURE. */
  goModules?: Array<GoModule>;
  /** A list of Python packages to be uploaded to Artifact Registry upon successful completion of all build steps. The build service account credentials will be used to perform the upload. If any objects fail to be pushed, the build is marked FAILURE. */
  pythonPackages?: Array<PythonPackage>;
  /** A list of npm packages to be uploaded to Artifact Registry upon successful completion of all build steps. Npm packages in the specified paths will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any packages fail to be pushed, the build is marked FAILURE. */
  npmPackages?: Array<NpmPackage>;
}

export const Artifacts: Schema.Schema<Artifacts> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      images: Schema.optional(Schema.Array(Schema.String)),
      objects: Schema.optional(ArtifactObjects),
      mavenArtifacts: Schema.optional(Schema.Array(MavenArtifact)),
      goModules: Schema.optional(Schema.Array(GoModule)),
      pythonPackages: Schema.optional(Schema.Array(PythonPackage)),
      npmPackages: Schema.optional(Schema.Array(NpmPackage)),
    }),
  ).annotate({ identifier: "Artifacts" }) as any as Schema.Schema<Artifacts>;

export interface SourceProvenance {
  /** A copy of the build's `source.storage_source`, if exists, with any generations resolved. */
  resolvedStorageSource?: StorageSource;
  /** A copy of the build's `source.repo_source`, if exists, with any revisions resolved. */
  resolvedRepoSource?: RepoSource;
  /** A copy of the build's `source.storage_source_manifest`, if exists, with any revisions resolved. This feature is in Preview. */
  resolvedStorageSourceManifest?: StorageSourceManifest;
  /** Output only. A copy of the build's `source.connected_repository`, if exists, with any revisions resolved. */
  resolvedConnectedRepository?: ConnectedRepository;
  /** Output only. A copy of the build's `source.git_source`, if exists, with any revisions resolved. */
  resolvedGitSource?: GitSource;
  /** Output only. Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. Note that `FileHashes` will only be populated if `BuildOptions` has requested a `SourceProvenanceHash`. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (`.tar.gz`), the `FileHash` will be for the single path to that file. */
  fileHashes?: Record<string, FileHashes>;
}

export const SourceProvenance: Schema.Schema<SourceProvenance> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resolvedStorageSource: Schema.optional(StorageSource),
      resolvedRepoSource: Schema.optional(RepoSource),
      resolvedStorageSourceManifest: Schema.optional(StorageSourceManifest),
      resolvedConnectedRepository: Schema.optional(ConnectedRepository),
      resolvedGitSource: Schema.optional(GitSource),
      fileHashes: Schema.optional(Schema.Record(Schema.String, FileHashes)),
    }),
  ).annotate({
    identifier: "SourceProvenance",
  }) as any as Schema.Schema<SourceProvenance>;

export interface PoolOption {
  /** The `WorkerPool` resource to execute the build on. You must have `cloudbuild.workerpools.use` on the project hosting the WorkerPool. Format projects/{project}/locations/{location}/workerPools/{workerPoolId} */
  name?: string;
}

export const PoolOption: Schema.Schema<PoolOption> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "PoolOption" }) as any as Schema.Schema<PoolOption>;

export interface BuildOptions {
  /** Requested hash for SourceProvenance. */
  sourceProvenanceHash?: Array<
    "NONE" | "SHA256" | "MD5" | "GO_MODULE_H1" | "SHA512" | (string & {})
  >;
  /** Requested verifiability options. */
  requestedVerifyOption?: "NOT_VERIFIED" | "VERIFIED" | (string & {});
  /** Compute Engine machine type on which to run the build. */
  machineType?:
    | "UNSPECIFIED"
    | "N1_HIGHCPU_8"
    | "N1_HIGHCPU_32"
    | "E2_HIGHCPU_8"
    | "E2_HIGHCPU_32"
    | "E2_MEDIUM"
    | (string & {});
  /** Requested disk size for the VM that runs the build. Note that this is *NOT* "disk free"; some of the space will be used by the operating system and build utilities. Also note that this is the minimum disk size that will be allocated for the build -- the build may run with a larger disk than requested. At present, the maximum disk size is 4000GB; builds that request more than the maximum are rejected with an error. */
  diskSizeGb?: string;
  /** Option to specify behavior when there is an error in the substitution checks. NOTE: this is always set to ALLOW_LOOSE for triggered builds and cannot be overridden in the build configuration file. */
  substitutionOption?: "MUST_MATCH" | "ALLOW_LOOSE" | (string & {});
  /** Option to specify whether or not to apply bash style string operations to the substitutions. NOTE: this is always enabled for triggered builds and cannot be overridden in the build configuration file. */
  dynamicSubstitutions?: boolean;
  /** Option to include built-in and custom substitutions as env variables for all build steps. */
  automapSubstitutions?: boolean;
  /** Option to define build log streaming behavior to Cloud Storage. */
  logStreamingOption?:
    | "STREAM_DEFAULT"
    | "STREAM_ON"
    | "STREAM_OFF"
    | (string & {});
  /** This field deprecated; please use `pool.name` instead. */
  workerPool?: string;
  /** Optional. Specification for execution on a `WorkerPool`. See [running builds in a private pool](https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool) for more information. */
  pool?: PoolOption;
  /** Option to specify the logging mode, which determines if and where build logs are stored. */
  logging?:
    | "LOGGING_UNSPECIFIED"
    | "LEGACY"
    | "GCS_ONLY"
    | "STACKDRIVER_ONLY"
    | "CLOUD_LOGGING_ONLY"
    | "NONE"
    | (string & {});
  /** A list of global environment variable definitions that will exist for all build steps in this build. If a variable is defined in both globally and in a build step, the variable will use the build step value. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". */
  env?: Array<string>;
  /** A list of global environment variables, which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. These variables will be available to all build steps in this build. */
  secretEnv?: Array<string>;
  /** Global list of volumes to mount for ALL build steps Each volume is created as an empty volume prior to starting the build process. Upon completion of the build, volumes and their contents are discarded. Global volume names and paths cannot conflict with the volumes defined a build step. Using a global volume in a build with only one step is not valid as it is indicative of a build request with an incorrect configuration. */
  volumes?: Array<Volume>;
  /** Optional. Option to specify how default logs buckets are setup. */
  defaultLogsBucketBehavior?:
    | "DEFAULT_LOGS_BUCKET_BEHAVIOR_UNSPECIFIED"
    | "REGIONAL_USER_OWNED_BUCKET"
    | "LEGACY_BUCKET"
    | (string & {});
  /** Optional. Option to specify whether structured logging is enabled. If true, JSON-formatted logs are parsed as structured logs. */
  enableStructuredLogging?: boolean;
  /** Optional. Option to specify the Pub/Sub topic to receive build status updates. */
  pubsubTopic?: string;
}

export const BuildOptions: Schema.Schema<BuildOptions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sourceProvenanceHash: Schema.optional(Schema.Array(Schema.String)),
      requestedVerifyOption: Schema.optional(Schema.String),
      machineType: Schema.optional(Schema.String),
      diskSizeGb: Schema.optional(Schema.String),
      substitutionOption: Schema.optional(Schema.String),
      dynamicSubstitutions: Schema.optional(Schema.Boolean),
      automapSubstitutions: Schema.optional(Schema.Boolean),
      logStreamingOption: Schema.optional(Schema.String),
      workerPool: Schema.optional(Schema.String),
      pool: Schema.optional(PoolOption),
      logging: Schema.optional(Schema.String),
      env: Schema.optional(Schema.Array(Schema.String)),
      secretEnv: Schema.optional(Schema.Array(Schema.String)),
      volumes: Schema.optional(Schema.Array(Volume)),
      defaultLogsBucketBehavior: Schema.optional(Schema.String),
      enableStructuredLogging: Schema.optional(Schema.Boolean),
      pubsubTopic: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BuildOptions",
  }) as any as Schema.Schema<BuildOptions>;

export interface Secret {
  /** Cloud KMS key name to use to decrypt these envs. */
  kmsKeyName?: string;
  /** Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets. */
  secretEnv?: Record<string, string>;
}

export const Secret: Schema.Schema<Secret> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kmsKeyName: Schema.optional(Schema.String),
      secretEnv: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({ identifier: "Secret" }) as any as Schema.Schema<Secret>;

export interface ApprovalConfig {
  /** Whether or not approval is needed. If this is set on a build, it will become pending when created, and will need to be explicitly approved to start. */
  approvalRequired?: boolean;
}

export const ApprovalConfig: Schema.Schema<ApprovalConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      approvalRequired: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ApprovalConfig",
  }) as any as Schema.Schema<ApprovalConfig>;

export interface ApprovalResult {
  /** Output only. Email of the user that called the ApproveBuild API to approve or reject a build at the time that the API was called. */
  approverAccount?: string;
  /** Output only. The time when the approval decision was made. */
  approvalTime?: string;
  /** Required. The decision of this manual approval. */
  decision?: "DECISION_UNSPECIFIED" | "APPROVED" | "REJECTED" | (string & {});
  /** Optional. An optional comment for this manual approval result. */
  comment?: string;
  /** Optional. An optional URL tied to this manual approval result. This field is essentially the same as comment, except that it will be rendered by the UI differently. An example use case is a link to an external job that approved this Build. */
  url?: string;
}

export const ApprovalResult: Schema.Schema<ApprovalResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      approverAccount: Schema.optional(Schema.String),
      approvalTime: Schema.optional(Schema.String),
      decision: Schema.optional(Schema.String),
      comment: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ApprovalResult",
  }) as any as Schema.Schema<ApprovalResult>;

export interface BuildApproval {
  /** Output only. The state of this build's approval. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "CANCELLED"
    | (string & {});
  /** Output only. Configuration for manual approval of this build. */
  config?: ApprovalConfig;
  /** Output only. Result of manual approval for this Build. */
  result?: ApprovalResult;
}

export const BuildApproval: Schema.Schema<BuildApproval> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      config: Schema.optional(ApprovalConfig),
      result: Schema.optional(ApprovalResult),
    }),
  ).annotate({
    identifier: "BuildApproval",
  }) as any as Schema.Schema<BuildApproval>;

export interface SecretManagerSecret {
  /** Resource name of the SecretVersion. In format: projects/* /secrets/* /versions/* */
  versionName?: string;
  /** Environment variable name to associate with the secret. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. */
  env?: string;
}

export const SecretManagerSecret: Schema.Schema<SecretManagerSecret> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      versionName: Schema.optional(Schema.String),
      env: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SecretManagerSecret",
  }) as any as Schema.Schema<SecretManagerSecret>;

export interface InlineSecret {
  /** Resource name of Cloud KMS crypto key to decrypt the encrypted value. In format: projects/* /locations/* /keyRings/* /cryptoKeys/* */
  kmsKeyName?: string;
  /** Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets. */
  envMap?: Record<string, string>;
}

export const InlineSecret: Schema.Schema<InlineSecret> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kmsKeyName: Schema.optional(Schema.String),
      envMap: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "InlineSecret",
  }) as any as Schema.Schema<InlineSecret>;

export interface Secrets {
  /** Secrets in Secret Manager and associated secret environment variable. */
  secretManager?: Array<SecretManagerSecret>;
  /** Secrets encrypted with KMS key and the associated secret environment variable. */
  inline?: Array<InlineSecret>;
}

export const Secrets: Schema.Schema<Secrets> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      secretManager: Schema.optional(Schema.Array(SecretManagerSecret)),
      inline: Schema.optional(Schema.Array(InlineSecret)),
    }),
  ).annotate({ identifier: "Secrets" }) as any as Schema.Schema<Secrets>;

export interface Warning {
  /** Explanation of the warning generated. */
  text?: string;
  /** The priority for this warning. */
  priority?:
    | "PRIORITY_UNSPECIFIED"
    | "INFO"
    | "WARNING"
    | "ALERT"
    | (string & {});
}

export const Warning: Schema.Schema<Warning> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      priority: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Warning" }) as any as Schema.Schema<Warning>;

export interface HttpConfig {
  /** SecretVersion resource of the HTTP proxy URL. The Service Account used in the build (either the default Service Account or user-specified Service Account) should have `secretmanager.versions.access` permissions on this secret. The proxy URL should be in format `protocol://@]proxyhost[:port]`. */
  proxySecretVersionName?: string;
}

export const HttpConfig: Schema.Schema<HttpConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      proxySecretVersionName: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "HttpConfig" }) as any as Schema.Schema<HttpConfig>;

export interface GitConfig {
  /** Configuration for HTTP related git operations. */
  http?: HttpConfig;
}

export const GitConfig: Schema.Schema<GitConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      http: Schema.optional(HttpConfig),
    }),
  ).annotate({ identifier: "GitConfig" }) as any as Schema.Schema<GitConfig>;

export interface FailureInfo {
  /** The name of the failure. */
  type?:
    | "FAILURE_TYPE_UNSPECIFIED"
    | "PUSH_FAILED"
    | "PUSH_IMAGE_NOT_FOUND"
    | "PUSH_NOT_AUTHORIZED"
    | "LOGGING_FAILURE"
    | "USER_BUILD_STEP"
    | "FETCH_SOURCE_FAILED"
    | (string & {});
  /** Explains the failure issue in more detail using hard-coded text. */
  detail?: string;
}

export const FailureInfo: Schema.Schema<FailureInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      detail: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FailureInfo",
  }) as any as Schema.Schema<FailureInfo>;

export interface GitSourceRepository {
  /** Location of the Git repository. */
  url?: string;
  /** The Developer Connect Git repository link formatted as `projects/* /locations/* /connections/* /gitRepositoryLink/*` */
  developerConnect?: string;
}

export const GitSourceRepository: Schema.Schema<GitSourceRepository> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      developerConnect: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GitSourceRepository",
  }) as any as Schema.Schema<GitSourceRepository>;

export interface GitSourceDependency {
  /** Required. The kind of repo (url or dev connect). */
  repository?: GitSourceRepository;
  /** Required. The revision that we will fetch the repo at. */
  revision?: string;
  /** Optional. True if submodules should be fetched too (default false). */
  recurseSubmodules?: boolean;
  /** Optional. How much history should be fetched for the build (default 1, -1 for all history). */
  depth?: string;
  /** Required. Where should the files be placed on the worker. */
  destPath?: string;
}

export const GitSourceDependency: Schema.Schema<GitSourceDependency> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      repository: Schema.optional(GitSourceRepository),
      revision: Schema.optional(Schema.String),
      recurseSubmodules: Schema.optional(Schema.Boolean),
      depth: Schema.optional(Schema.String),
      destPath: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GitSourceDependency",
  }) as any as Schema.Schema<GitSourceDependency>;

export interface Dependency {
  /** If set to true disable all dependency fetching (ignoring the default source as well). */
  empty?: boolean;
  /** Represents a git repository as a build dependency. */
  gitSource?: GitSourceDependency;
}

export const Dependency: Schema.Schema<Dependency> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      empty: Schema.optional(Schema.Boolean),
      gitSource: Schema.optional(GitSourceDependency),
    }),
  ).annotate({ identifier: "Dependency" }) as any as Schema.Schema<Dependency>;

export interface Build {
  /** Output only. The 'Build' name with format: `projects/{project}/locations/{location}/builds/{build}`, where {build} is a unique identifier generated by the service. */
  name?: string;
  /** Output only. Unique identifier of the build. */
  id?: string;
  /** Output only. ID of the project. */
  projectId?: string;
  /** Output only. Status of the build. */
  status?:
    | "STATUS_UNKNOWN"
    | "PENDING"
    | "QUEUED"
    | "WORKING"
    | "SUCCESS"
    | "FAILURE"
    | "INTERNAL_ERROR"
    | "TIMEOUT"
    | "CANCELLED"
    | "EXPIRED"
    | (string & {});
  /** Output only. Customer-readable message about the current status. */
  statusDetail?: string;
  /** Optional. The location of the source files to build. */
  source?: Source;
  /** Required. The operations to be performed on the workspace. */
  steps?: Array<BuildStep>;
  /** Output only. Results of the build. */
  results?: Results;
  /** Output only. Time at which the request to create the build was received. */
  createTime?: string;
  /** Output only. Time at which execution of the build was started. */
  startTime?: string;
  /** Output only. Time at which execution of the build was finished. The difference between finish_time and start_time is the duration of the build's execution. */
  finishTime?: string;
  /** Amount of time that this build should be allowed to run, to second granularity. If this amount of time elapses, work on the build will cease and the build status will be `TIMEOUT`. `timeout` starts ticking from `startTime`. Default time is 60 minutes. */
  timeout?: string;
  /** A list of images to be pushed upon the successful completion of all build steps. The images are pushed using the builder service account's credentials. The digests of the pushed images will be stored in the `Build` resource's results field. If any of the images fail to be pushed, the build status is marked `FAILURE`. */
  images?: Array<string>;
  /** TTL in queue for this build. If provided and the build is enqueued longer than this value, the build will expire and the build status will be `EXPIRED`. The TTL starts ticking from create_time. */
  queueTtl?: string;
  /** Artifacts produced by the build that should be uploaded upon successful completion of all build steps. */
  artifacts?: Artifacts;
  /** Cloud Storage bucket where logs should be written (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). Logs file names will be of the format `${logs_bucket}/log-${build_id}.txt`. */
  logsBucket?: string;
  /** Output only. A permanent fixed identifier for source. */
  sourceProvenance?: SourceProvenance;
  /** Output only. The ID of the `BuildTrigger` that triggered this build, if it was triggered automatically. */
  buildTriggerId?: string;
  /** Special options for this build. */
  options?: BuildOptions;
  /** Output only. URL to logs for this build in Google Cloud Console. */
  logUrl?: string;
  /** Substitutions data for `Build` resource. */
  substitutions?: Record<string, string>;
  /** Tags for annotation of a `Build`. These are not docker tags. */
  tags?: Array<string>;
  /** Secrets to decrypt using Cloud Key Management Service. Note: Secret Manager is the recommended technique for managing sensitive data with Cloud Build. Use `available_secrets` to configure builds to access secrets from Secret Manager. For instructions, see: https://cloud.google.com/cloud-build/docs/securing-builds/use-secrets */
  secrets?: Array<Secret>;
  /** Output only. Stores timing information for phases of the build. Valid keys are: * BUILD: time to execute all build steps. * PUSH: time to push all artifacts including docker images and non docker artifacts. * FETCHSOURCE: time to fetch source. * SETUPBUILD: time to set up build. If the build does not specify source or images, these keys will not be included. */
  timing?: Record<string, TimeSpan>;
  /** Output only. Describes this build's approval configuration, status, and result. */
  approval?: BuildApproval;
  /** IAM service account whose credentials will be used at build runtime. Must be of the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. ACCOUNT can be email address or uniqueId of the service account. */
  serviceAccount?: string;
  /** Secrets and secret environment variables. */
  availableSecrets?: Secrets;
  /** Output only. Non-fatal problems encountered during the execution of the build. */
  warnings?: Array<Warning>;
  /** Optional. Configuration for git operations. */
  gitConfig?: GitConfig;
  /** Output only. Contains information about the build when status=FAILURE. */
  failureInfo?: FailureInfo;
  /** Optional. Dependencies that the Cloud Build worker will fetch before executing user steps. */
  dependencies?: Array<Dependency>;
}

export const Build: Schema.Schema<Build> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      projectId: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      statusDetail: Schema.optional(Schema.String),
      source: Schema.optional(Source),
      steps: Schema.optional(Schema.Array(BuildStep)),
      results: Schema.optional(Results),
      createTime: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      finishTime: Schema.optional(Schema.String),
      timeout: Schema.optional(Schema.String),
      images: Schema.optional(Schema.Array(Schema.String)),
      queueTtl: Schema.optional(Schema.String),
      artifacts: Schema.optional(Artifacts),
      logsBucket: Schema.optional(Schema.String),
      sourceProvenance: Schema.optional(SourceProvenance),
      buildTriggerId: Schema.optional(Schema.String),
      options: Schema.optional(BuildOptions),
      logUrl: Schema.optional(Schema.String),
      substitutions: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      tags: Schema.optional(Schema.Array(Schema.String)),
      secrets: Schema.optional(Schema.Array(Secret)),
      timing: Schema.optional(Schema.Record(Schema.String, TimeSpan)),
      approval: Schema.optional(BuildApproval),
      serviceAccount: Schema.optional(Schema.String),
      availableSecrets: Schema.optional(Secrets),
      warnings: Schema.optional(Schema.Array(Warning)),
      gitConfig: Schema.optional(GitConfig),
      failureInfo: Schema.optional(FailureInfo),
      dependencies: Schema.optional(Schema.Array(Dependency)),
    }),
  ).annotate({ identifier: "Build" }) as any as Schema.Schema<Build>;

export interface ListBuildsResponse {
  /** Builds will be sorted by `create_time`, descending. */
  builds?: Array<Build>;
  /** Token to receive the next page of results. This will be absent if the end of the response list has been reached. */
  nextPageToken?: string;
}

export const ListBuildsResponse: Schema.Schema<ListBuildsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      builds: Schema.optional(Schema.Array(Build)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListBuildsResponse",
  }) as any as Schema.Schema<ListBuildsResponse>;

export interface CancelBuildRequest {
  /** The name of the `Build` to cancel. Format: `projects/{project}/locations/{location}/builds/{build}` */
  name?: string;
  /** Required. ID of the project. */
  projectId?: string;
  /** Required. ID of the build. */
  id?: string;
}

export const CancelBuildRequest: Schema.Schema<CancelBuildRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      projectId: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CancelBuildRequest",
  }) as any as Schema.Schema<CancelBuildRequest>;

export interface RetryBuildRequest {
  /** The name of the `Build` to retry. Format: `projects/{project}/locations/{location}/builds/{build}` */
  name?: string;
  /** Required. ID of the project. */
  projectId?: string;
  /** Required. Build ID of the original build. */
  id?: string;
}

export const RetryBuildRequest: Schema.Schema<RetryBuildRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      projectId: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RetryBuildRequest",
  }) as any as Schema.Schema<RetryBuildRequest>;

export interface ApproveBuildRequest {
  /** Approval decision and metadata. */
  approvalResult?: ApprovalResult;
}

export const ApproveBuildRequest: Schema.Schema<ApproveBuildRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      approvalResult: Schema.optional(ApprovalResult),
    }),
  ).annotate({
    identifier: "ApproveBuildRequest",
  }) as any as Schema.Schema<ApproveBuildRequest>;

export interface PullRequestFilter {
  /** Regex of branches to match. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax */
  branch?: string;
  /** If CommentControl is enabled, depending on the setting, builds may not fire until a repository writer comments `/gcbrun` on a pull request or `/gcbrun` is in the pull request description. Only PR comments that contain `/gcbrun` will trigger builds. If CommentControl is set to disabled, comments with `/gcbrun` from a user with repository write permission or above will still trigger builds to run. */
  commentControl?:
    | "COMMENTS_DISABLED"
    | "COMMENTS_ENABLED"
    | "COMMENTS_ENABLED_FOR_EXTERNAL_CONTRIBUTORS_ONLY"
    | (string & {});
  /** If true, branches that do NOT match the git_ref will trigger a build. */
  invertRegex?: boolean;
}

export const PullRequestFilter: Schema.Schema<PullRequestFilter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      branch: Schema.optional(Schema.String),
      commentControl: Schema.optional(Schema.String),
      invertRegex: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "PullRequestFilter",
  }) as any as Schema.Schema<PullRequestFilter>;

export interface PushFilter {
  /** Regexes matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax */
  branch?: string;
  /** Regexes matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax */
  tag?: string;
  /** When true, only trigger a build if the revision regex does NOT match the git_ref regex. */
  invertRegex?: boolean;
}

export const PushFilter: Schema.Schema<PushFilter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      branch: Schema.optional(Schema.String),
      tag: Schema.optional(Schema.String),
      invertRegex: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "PushFilter" }) as any as Schema.Schema<PushFilter>;

export interface GitHubEventsConfig {
  /** The installationID that emits the GitHub event. */
  installationId?: string;
  /** Owner of the repository. For example: The owner for https://github.com/googlecloudplatform/cloud-builders is "googlecloudplatform". */
  owner?: string;
  /** Name of the repository. For example: The name for https://github.com/googlecloudplatform/cloud-builders is "cloud-builders". */
  name?: string;
  /** filter to match changes in pull requests. */
  pullRequest?: PullRequestFilter;
  /** filter to match changes in refs like branches, tags. */
  push?: PushFilter;
  /** The resource name of the github enterprise config that should be applied to this installation. For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}" */
  enterpriseConfigResourceName?: string;
}

export const GitHubEventsConfig: Schema.Schema<GitHubEventsConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      installationId: Schema.optional(Schema.String),
      owner: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      pullRequest: Schema.optional(PullRequestFilter),
      push: Schema.optional(PushFilter),
      enterpriseConfigResourceName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GitHubEventsConfig",
  }) as any as Schema.Schema<GitHubEventsConfig>;

export interface PubsubConfig {
  /** Output only. Name of the subscription. Format is `projects/{project}/subscriptions/{subscription}`. */
  subscription?: string;
  /** Optional. The name of the topic from which this subscription is receiving messages. Format is `projects/{project}/topics/{topic}`. */
  topic?: string;
  /** Service account that will make the push request. */
  serviceAccountEmail?: string;
  /** Potential issues with the underlying Pub/Sub subscription configuration. Only populated on get requests. */
  state?:
    | "STATE_UNSPECIFIED"
    | "OK"
    | "SUBSCRIPTION_DELETED"
    | "TOPIC_DELETED"
    | "SUBSCRIPTION_MISCONFIGURED"
    | (string & {});
}

export const PubsubConfig: Schema.Schema<PubsubConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      subscription: Schema.optional(Schema.String),
      topic: Schema.optional(Schema.String),
      serviceAccountEmail: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PubsubConfig",
  }) as any as Schema.Schema<PubsubConfig>;

export interface WebhookConfig {
  /** Required. Resource name for the secret required as a URL parameter. */
  secret?: string;
  /** Potential issues with the underlying Pub/Sub subscription configuration. Only populated on get requests. */
  state?: "STATE_UNSPECIFIED" | "OK" | "SECRET_DELETED" | (string & {});
}

export const WebhookConfig: Schema.Schema<WebhookConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      secret: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WebhookConfig",
  }) as any as Schema.Schema<WebhookConfig>;

export interface BitbucketServerSecrets {
  /** Required. The resource name for the admin access token's secret version. */
  adminAccessTokenVersionName?: string;
  /** Required. The resource name for the read access token's secret version. */
  readAccessTokenVersionName?: string;
  /** Required. Immutable. The resource name for the webhook secret's secret version. Once this field has been set, it cannot be changed. If you need to change it, please create another BitbucketServerConfig. */
  webhookSecretVersionName?: string;
}

export const BitbucketServerSecrets: Schema.Schema<BitbucketServerSecrets> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adminAccessTokenVersionName: Schema.optional(Schema.String),
      readAccessTokenVersionName: Schema.optional(Schema.String),
      webhookSecretVersionName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BitbucketServerSecrets",
  }) as any as Schema.Schema<BitbucketServerSecrets>;

export interface BitbucketServerRepositoryId {
  /** Required. Identifier for the project storing the repository. */
  projectKey?: string;
  /** Required. Identifier for the repository. */
  repoSlug?: string;
  /** Output only. The ID of the webhook that was created for receiving events from this repo. We only create and manage a single webhook for each repo. */
  webhookId?: number;
}

export const BitbucketServerRepositoryId: Schema.Schema<BitbucketServerRepositoryId> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      projectKey: Schema.optional(Schema.String),
      repoSlug: Schema.optional(Schema.String),
      webhookId: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "BitbucketServerRepositoryId",
  }) as any as Schema.Schema<BitbucketServerRepositoryId>;

export interface BitbucketServerConfig {
  /** The resource name for the config. */
  name?: string;
  /** Required. Immutable. The URI of the Bitbucket Server host. Once this field has been set, it cannot be changed. If you need to change it, please create another BitbucketServerConfig. */
  hostUri?: string;
  /** Required. Secret Manager secrets needed by the config. */
  secrets?: BitbucketServerSecrets;
  /** Time when the config was created. */
  createTime?: string;
  /** Username of the account Cloud Build will use on Bitbucket Server. */
  username?: string;
  /** Output only. UUID included in webhook requests. The UUID is used to look up the corresponding config. */
  webhookKey?: string;
  /** Required. Immutable. API Key that will be attached to webhook. Once this field has been set, it cannot be changed. If you need to change it, please create another BitbucketServerConfig. */
  apiKey?: string;
  /** Output only. Connected Bitbucket Server repositories for this config. */
  connectedRepositories?: Array<BitbucketServerRepositoryId>;
  /** Optional. The network to be used when reaching out to the Bitbucket Server instance. The VPC network must be enabled for private service connection. This should be set if the Bitbucket Server instance is hosted on-premises and not reachable by public internet. If this field is left empty, no network peering will occur and calls to the Bitbucket Server instance will be made over the public internet. Must be in the format `projects/{project}/global/networks/{network}`, where {project} is a project number or id and {network} is the name of a VPC network in the project. */
  peeredNetwork?: string;
  /** Optional. SSL certificate to use for requests to Bitbucket Server. The format should be PEM format but the extension can be one of .pem, .cer, or .crt. */
  sslCa?: string;
  /** Immutable. IP range within the peered network. This is specified in CIDR notation with a slash and the subnet prefix size. You can optionally specify an IP address before the subnet prefix value. e.g. `192.168.0.0/29` would specify an IP range starting at 192.168.0.0 with a 29 bit prefix size. `/16` would specify a prefix size of 16 bits, with an automatically determined IP within the peered VPC. If unspecified, a value of `/24` will be used. The field only has an effect if peered_network is set. */
  peeredNetworkIpRange?: string;
}

export const BitbucketServerConfig: Schema.Schema<BitbucketServerConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      hostUri: Schema.optional(Schema.String),
      secrets: Schema.optional(BitbucketServerSecrets),
      createTime: Schema.optional(Schema.String),
      username: Schema.optional(Schema.String),
      webhookKey: Schema.optional(Schema.String),
      apiKey: Schema.optional(Schema.String),
      connectedRepositories: Schema.optional(
        Schema.Array(BitbucketServerRepositoryId),
      ),
      peeredNetwork: Schema.optional(Schema.String),
      sslCa: Schema.optional(Schema.String),
      peeredNetworkIpRange: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BitbucketServerConfig",
  }) as any as Schema.Schema<BitbucketServerConfig>;

export interface BitbucketServerTriggerConfig {
  /** Required. Slug of the repository. A repository slug is a URL-friendly version of a repository name, automatically generated by Bitbucket for use in the URL. For example, if the repository name is 'test repo', in the URL it would become 'test-repo' as in https://mybitbucket.server/projects/TEST/repos/test-repo. */
  repoSlug?: string;
  /** Required. Key of the project that the repo is in. For example: The key for https://mybitbucket.server/projects/TEST/repos/test-repo is "TEST". */
  projectKey?: string;
  /** Filter to match changes in pull requests. */
  pullRequest?: PullRequestFilter;
  /** Filter to match changes in refs like branches, tags. */
  push?: PushFilter;
  /** Required. The Bitbucket server config resource that this trigger config maps to. */
  bitbucketServerConfigResource?: string;
  /** Output only. The BitbucketServerConfig specified in the bitbucket_server_config_resource field. */
  bitbucketServerConfig?: BitbucketServerConfig;
}

export const BitbucketServerTriggerConfig: Schema.Schema<BitbucketServerTriggerConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      repoSlug: Schema.optional(Schema.String),
      projectKey: Schema.optional(Schema.String),
      pullRequest: Schema.optional(PullRequestFilter),
      push: Schema.optional(PushFilter),
      bitbucketServerConfigResource: Schema.optional(Schema.String),
      bitbucketServerConfig: Schema.optional(BitbucketServerConfig),
    }),
  ).annotate({
    identifier: "BitbucketServerTriggerConfig",
  }) as any as Schema.Schema<BitbucketServerTriggerConfig>;

export interface GitLabSecrets {
  /** Required. Immutable. The resource name for the webhook secret’s secret version. Once this field has been set, it cannot be changed. If you need to change it, please create another GitLabConfig. */
  webhookSecretVersion?: string;
  /** Required. Immutable. API Key that will be attached to webhook requests from GitLab to Cloud Build. */
  apiKeyVersion?: string;
  /** Required. The resource name for the api access token’s secret version */
  apiAccessTokenVersion?: string;
  /** Required. The resource name for the read access token’s secret version */
  readAccessTokenVersion?: string;
}

export const GitLabSecrets: Schema.Schema<GitLabSecrets> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      webhookSecretVersion: Schema.optional(Schema.String),
      apiKeyVersion: Schema.optional(Schema.String),
      apiAccessTokenVersion: Schema.optional(Schema.String),
      readAccessTokenVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GitLabSecrets",
  }) as any as Schema.Schema<GitLabSecrets>;

export interface GitLabRepositoryId {
  /** Required. Identifier for the repository. example: "namespace/project-slug", namespace is usually the username or group ID */
  id?: string;
  /** Output only. The ID of the webhook that was created for receiving events from this repo. We only create and manage a single webhook for each repo. */
  webhookId?: number;
}

export const GitLabRepositoryId: Schema.Schema<GitLabRepositoryId> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      webhookId: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GitLabRepositoryId",
  }) as any as Schema.Schema<GitLabRepositoryId>;

export interface ServiceDirectoryConfig {
  /** The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}. */
  service?: string;
}

export const ServiceDirectoryConfig: Schema.Schema<ServiceDirectoryConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      service: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ServiceDirectoryConfig",
  }) as any as Schema.Schema<ServiceDirectoryConfig>;

export interface GitLabEnterpriseConfig {
  /** Immutable. The URI of the GitlabEnterprise host. */
  hostUri?: string;
  /** The Service Directory configuration to be used when reaching out to the GitLab Enterprise instance. */
  serviceDirectoryConfig?: ServiceDirectoryConfig;
  /** The SSL certificate to use in requests to GitLab Enterprise instances. */
  sslCa?: string;
}

export const GitLabEnterpriseConfig: Schema.Schema<GitLabEnterpriseConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hostUri: Schema.optional(Schema.String),
      serviceDirectoryConfig: Schema.optional(ServiceDirectoryConfig),
      sslCa: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GitLabEnterpriseConfig",
  }) as any as Schema.Schema<GitLabEnterpriseConfig>;

export interface GitLabConfig {
  /** The resource name for the config. */
  name?: string;
  /** Username of the GitLab.com or GitLab Enterprise account Cloud Build will use. */
  username?: string;
  /** Required. Secret Manager secrets needed by the config. */
  secrets?: GitLabSecrets;
  /** Output only. Time when the config was created. */
  createTime?: string;
  /** Output only. UUID included in webhook requests. The UUID is used to look up the corresponding config. */
  webhookKey?: string;
  /** Connected GitLab.com or GitLabEnterprise repositories for this config. */
  connectedRepositories?: Array<GitLabRepositoryId>;
  /** Optional. GitLabEnterprise config. */
  enterpriseConfig?: GitLabEnterpriseConfig;
}

export const GitLabConfig: Schema.Schema<GitLabConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      username: Schema.optional(Schema.String),
      secrets: Schema.optional(GitLabSecrets),
      createTime: Schema.optional(Schema.String),
      webhookKey: Schema.optional(Schema.String),
      connectedRepositories: Schema.optional(Schema.Array(GitLabRepositoryId)),
      enterpriseConfig: Schema.optional(GitLabEnterpriseConfig),
    }),
  ).annotate({
    identifier: "GitLabConfig",
  }) as any as Schema.Schema<GitLabConfig>;

export interface GitLabEventsConfig {
  /** Namespace of the GitLab project. */
  projectNamespace?: string;
  /** Filter to match changes in pull requests. */
  pullRequest?: PullRequestFilter;
  /** Filter to match changes in refs like branches, tags. */
  push?: PushFilter;
  /** The GitLab config resource that this trigger config maps to. */
  gitlabConfigResource?: string;
  /** Output only. The GitLabConfig specified in the gitlab_config_resource field. */
  gitlabConfig?: GitLabConfig;
}

export const GitLabEventsConfig: Schema.Schema<GitLabEventsConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      projectNamespace: Schema.optional(Schema.String),
      pullRequest: Schema.optional(PullRequestFilter),
      push: Schema.optional(PushFilter),
      gitlabConfigResource: Schema.optional(Schema.String),
      gitlabConfig: Schema.optional(GitLabConfig),
    }),
  ).annotate({
    identifier: "GitLabEventsConfig",
  }) as any as Schema.Schema<GitLabEventsConfig>;

export interface GitFileSource {
  /** The path of the file, with the repo root as the root of the path. */
  path?: string;
  /** The URI of the repo. Either uri or repository can be specified. If unspecified, the repo from which the trigger invocation originated is assumed to be the repo from which to read the specified path. */
  uri?: string;
  /** The fully qualified resource name of the Repos API repository. Either URI or repository can be specified. If unspecified, the repo from which the trigger invocation originated is assumed to be the repo from which to read the specified path. */
  repository?: string;
  /** See RepoType above. */
  repoType?:
    | "UNKNOWN"
    | "CLOUD_SOURCE_REPOSITORIES"
    | "GITHUB"
    | "BITBUCKET_SERVER"
    | "GITLAB"
    | "BITBUCKET_CLOUD"
    | (string & {});
  /** The branch, tag, arbitrary ref, or SHA version of the repo to use when resolving the filename (optional). This field respects the same syntax/resolution as described here: https://git-scm.com/docs/gitrevisions If unspecified, the revision from which the trigger invocation originated is assumed to be the revision from which to read the specified path. */
  revision?: string;
  /** The full resource name of the github enterprise config. Format: `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`. `projects/{project}/githubEnterpriseConfigs/{id}`. */
  githubEnterpriseConfig?: string;
  /** The full resource name of the bitbucket server config. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`. */
  bitbucketServerConfig?: string;
}

export const GitFileSource: Schema.Schema<GitFileSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      path: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
      repository: Schema.optional(Schema.String),
      repoType: Schema.optional(Schema.String),
      revision: Schema.optional(Schema.String),
      githubEnterpriseConfig: Schema.optional(Schema.String),
      bitbucketServerConfig: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GitFileSource",
  }) as any as Schema.Schema<GitFileSource>;

export interface GitRepoSource {
  /** The URI of the repo (e.g. https://github.com/user/repo.git). Either `uri` or `repository` can be specified and is required. */
  uri?: string;
  /** The connected repository resource name, in the format `projects/* /locations/* /connections/* /repositories/*`. Either `uri` or `repository` can be specified and is required. */
  repository?: string;
  /** The branch or tag to use. Must start with "refs/" (required). */
  ref?: string;
  /** See RepoType below. */
  repoType?:
    | "UNKNOWN"
    | "CLOUD_SOURCE_REPOSITORIES"
    | "GITHUB"
    | "BITBUCKET_SERVER"
    | "GITLAB"
    | "BITBUCKET_CLOUD"
    | (string & {});
  /** The full resource name of the github enterprise config. Format: `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`. `projects/{project}/githubEnterpriseConfigs/{id}`. */
  githubEnterpriseConfig?: string;
  /** The full resource name of the bitbucket server config. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`. */
  bitbucketServerConfig?: string;
}

export const GitRepoSource: Schema.Schema<GitRepoSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      repository: Schema.optional(Schema.String),
      ref: Schema.optional(Schema.String),
      repoType: Schema.optional(Schema.String),
      githubEnterpriseConfig: Schema.optional(Schema.String),
      bitbucketServerConfig: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GitRepoSource",
  }) as any as Schema.Schema<GitRepoSource>;

export interface RepositoryEventConfig {
  /** The resource name of the Repo API resource. */
  repository?: string;
  /** Output only. The type of the SCM vendor the repository points to. */
  repositoryType?:
    | "REPOSITORY_TYPE_UNSPECIFIED"
    | "GITHUB"
    | "GITHUB_ENTERPRISE"
    | "GITLAB_ENTERPRISE"
    | "BITBUCKET_DATA_CENTER"
    | "BITBUCKET_CLOUD"
    | (string & {});
  /** Filter to match changes in pull requests. */
  pullRequest?: PullRequestFilter;
  /** Filter to match changes in refs like branches, tags. */
  push?: PushFilter;
}

export const RepositoryEventConfig: Schema.Schema<RepositoryEventConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      repository: Schema.optional(Schema.String),
      repositoryType: Schema.optional(Schema.String),
      pullRequest: Schema.optional(PullRequestFilter),
      push: Schema.optional(PushFilter),
    }),
  ).annotate({
    identifier: "RepositoryEventConfig",
  }) as any as Schema.Schema<RepositoryEventConfig>;

export interface DeveloperConnectEventConfig {
  /** Required. The Developer Connect Git repository link, formatted as `projects/* /locations/* /connections/* /gitRepositoryLink/*`. */
  gitRepositoryLink?: string;
  /** Output only. The type of DeveloperConnect GitRepositoryLink. */
  gitRepositoryLinkType?:
    | "GIT_REPOSITORY_LINK_TYPE_UNSPECIFIED"
    | "GITHUB"
    | "GITHUB_ENTERPRISE"
    | "GITLAB"
    | "GITLAB_ENTERPRISE"
    | "BITBUCKET_DATA_CENTER"
    | "BITBUCKET_CLOUD"
    | (string & {});
  /** Filter to match changes in pull requests. */
  pullRequest?: PullRequestFilter;
  /** Filter to match changes in refs like branches and tags. */
  push?: PushFilter;
}

export const DeveloperConnectEventConfig: Schema.Schema<DeveloperConnectEventConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gitRepositoryLink: Schema.optional(Schema.String),
      gitRepositoryLinkType: Schema.optional(Schema.String),
      pullRequest: Schema.optional(PullRequestFilter),
      push: Schema.optional(PushFilter),
    }),
  ).annotate({
    identifier: "DeveloperConnectEventConfig",
  }) as any as Schema.Schema<DeveloperConnectEventConfig>;

export interface BuildTrigger {
  /** The `Trigger` name with format: `projects/{project}/locations/{location}/triggers/{trigger}`, where {trigger} is a unique identifier generated by the service. */
  resourceName?: string;
  /** Output only. Unique identifier of the trigger. */
  id?: string;
  /** Human-readable description of this trigger. */
  description?: string;
  /** User-assigned name of the trigger. Must be unique within the project. Trigger names must meet the following requirements: + They must contain only alphanumeric characters and dashes. + They can be 1-64 characters long. + They must begin and end with an alphanumeric character. */
  name?: string;
  /** Tags for annotation of a `BuildTrigger` */
  tags?: Array<string>;
  /** Template describing the types of source changes to trigger a build. Branch and tag names in trigger templates are interpreted as regular expressions. Any branch or tag change that matches that regular expression will trigger a build. Mutually exclusive with `github`. */
  triggerTemplate?: RepoSource;
  /** GitHubEventsConfig describes the configuration of a trigger that creates a build whenever a GitHub event is received. Mutually exclusive with `trigger_template`. */
  github?: GitHubEventsConfig;
  /** PubsubConfig describes the configuration of a trigger that creates a build whenever a Pub/Sub message is published. */
  pubsubConfig?: PubsubConfig;
  /** WebhookConfig describes the configuration of a trigger that creates a build whenever a webhook is sent to a trigger's webhook URL. */
  webhookConfig?: WebhookConfig;
  /** BitbucketServerTriggerConfig describes the configuration of a trigger that creates a build whenever a Bitbucket Server event is received. */
  bitbucketServerTriggerConfig?: BitbucketServerTriggerConfig;
  /** GitLabEnterpriseEventsConfig describes the configuration of a trigger that creates a build whenever a GitLab Enterprise event is received. */
  gitlabEnterpriseEventsConfig?: GitLabEventsConfig;
  /** Autodetect build configuration. The following precedence is used (case insensitive): 1. cloudbuild.yaml 2. cloudbuild.yml 3. cloudbuild.json 4. Dockerfile Currently only available for GitHub App Triggers. */
  autodetect?: boolean;
  /** Contents of the build template. */
  build?: Build;
  /** Path, from the source root, to the build configuration file (i.e. cloudbuild.yaml). */
  filename?: string;
  /** The file source describing the local or remote Build template. */
  gitFileSource?: GitFileSource;
  /** Output only. Time when the trigger was created. */
  createTime?: string;
  /** If true, the trigger will never automatically execute a build. */
  disabled?: boolean;
  /** Substitutions for Build resource. The keys must match the following regular expression: `^_[A-Z0-9_]+$`. */
  substitutions?: Record<string, string>;
  /** ignored_files and included_files are file glob matches using https://golang.org/pkg/path/filepath/#Match extended with support for "**". If ignored_files and changed files are both empty, then they are not used to determine whether or not to trigger a build. If ignored_files is not empty, then we ignore any files that match any of the ignored_file globs. If the change has no files that are outside of the ignored_files globs, then we do not trigger a build. */
  ignoredFiles?: Array<string>;
  /** If any of the files altered in the commit pass the ignored_files filter and included_files is empty, then as far as this filter is concerned, we should trigger the build. If any of the files altered in the commit pass the ignored_files filter and included_files is not empty, then we make sure that at least one of those files matches a included_files glob. If not, then we do not trigger a build. */
  includedFiles?: Array<string>;
  /** The repo and ref of the repository from which to build. This field is used only for those triggers that do not respond to SCM events. Triggers that respond to such events build source at whatever commit caused the event. This field is currently only used by Webhook, Pub/Sub, Manual, and Cron triggers. */
  sourceToBuild?: GitRepoSource;
  /** Configuration for manual approval to start a build invocation of this BuildTrigger. */
  approvalConfig?: ApprovalConfig;
  /** A Common Expression Language string. */
  filter?: string;
  /** The service account used for all user-controlled operations including UpdateBuildTrigger, RunBuildTrigger, CreateBuild, and CancelBuild. If no service account is set and the legacy Cloud Build service account ([PROJECT_NUM]@cloudbuild.gserviceaccount.com) is the default for the project then it will be used instead. Format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT_ID_OR_EMAIL}` */
  serviceAccount?: string;
  /** EventType allows the user to explicitly set the type of event to which this BuildTrigger should respond. This field will be validated against the rest of the configuration if it is set. */
  eventType?:
    | "EVENT_TYPE_UNSPECIFIED"
    | "REPO"
    | "WEBHOOK"
    | "PUBSUB"
    | "MANUAL"
    | (string & {});
  /** If set to INCLUDE_BUILD_LOGS_WITH_STATUS, log url will be shown on GitHub page when build status is final. Setting this field to INCLUDE_BUILD_LOGS_WITH_STATUS for non GitHub triggers results in INVALID_ARGUMENT error. */
  includeBuildLogs?:
    | "INCLUDE_BUILD_LOGS_UNSPECIFIED"
    | "INCLUDE_BUILD_LOGS_WITH_STATUS"
    | (string & {});
  /** The configuration of a trigger that creates a build whenever an event from Repo API is received. */
  repositoryEventConfig?: RepositoryEventConfig;
  /** Optional. The configuration of a trigger that creates a build whenever an event from the DeveloperConnect API is received. */
  developerConnectEventConfig?: DeveloperConnectEventConfig;
}

export const BuildTrigger: Schema.Schema<BuildTrigger> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceName: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Array(Schema.String)),
      triggerTemplate: Schema.optional(RepoSource),
      github: Schema.optional(GitHubEventsConfig),
      pubsubConfig: Schema.optional(PubsubConfig),
      webhookConfig: Schema.optional(WebhookConfig),
      bitbucketServerTriggerConfig: Schema.optional(
        BitbucketServerTriggerConfig,
      ),
      gitlabEnterpriseEventsConfig: Schema.optional(GitLabEventsConfig),
      autodetect: Schema.optional(Schema.Boolean),
      build: Schema.optional(Build),
      filename: Schema.optional(Schema.String),
      gitFileSource: Schema.optional(GitFileSource),
      createTime: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.Boolean),
      substitutions: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      ignoredFiles: Schema.optional(Schema.Array(Schema.String)),
      includedFiles: Schema.optional(Schema.Array(Schema.String)),
      sourceToBuild: Schema.optional(GitRepoSource),
      approvalConfig: Schema.optional(ApprovalConfig),
      filter: Schema.optional(Schema.String),
      serviceAccount: Schema.optional(Schema.String),
      eventType: Schema.optional(Schema.String),
      includeBuildLogs: Schema.optional(Schema.String),
      repositoryEventConfig: Schema.optional(RepositoryEventConfig),
      developerConnectEventConfig: Schema.optional(DeveloperConnectEventConfig),
    }),
  ).annotate({
    identifier: "BuildTrigger",
  }) as any as Schema.Schema<BuildTrigger>;

export interface ListBuildTriggersResponse {
  /** `BuildTriggers` for the project, sorted by `create_time` descending. */
  triggers?: Array<BuildTrigger>;
  /** Token to receive the next page of results. */
  nextPageToken?: string;
}

export const ListBuildTriggersResponse: Schema.Schema<ListBuildTriggersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      triggers: Schema.optional(Schema.Array(BuildTrigger)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListBuildTriggersResponse",
  }) as any as Schema.Schema<ListBuildTriggersResponse>;

export interface RunBuildTriggerRequest {
  /** Required. ID of the project. */
  projectId?: string;
  /** Required. ID of the trigger. */
  triggerId?: string;
  /** Source to build against this trigger. Branch and tag names cannot consist of regular expressions. */
  source?: RepoSource;
}

export const RunBuildTriggerRequest: Schema.Schema<RunBuildTriggerRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      projectId: Schema.optional(Schema.String),
      triggerId: Schema.optional(Schema.String),
      source: Schema.optional(RepoSource),
    }),
  ).annotate({
    identifier: "RunBuildTriggerRequest",
  }) as any as Schema.Schema<RunBuildTriggerRequest>;

export interface HttpBody {
  /** The HTTP Content-Type header value specifying the content type of the body. */
  contentType?: string;
  /** The HTTP request/response body as raw binary. */
  data?: string;
  /** Application specific response metadata. Must be set in the first response for streaming APIs. */
  extensions?: Array<Record<string, unknown>>;
}

export const HttpBody: Schema.Schema<HttpBody> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentType: Schema.optional(Schema.String),
      data: Schema.optional(Schema.String),
      extensions: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
    }),
  ).annotate({ identifier: "HttpBody" }) as any as Schema.Schema<HttpBody>;

export interface ReceiveTriggerWebhookResponse {}

export const ReceiveTriggerWebhookResponse: Schema.Schema<ReceiveTriggerWebhookResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ReceiveTriggerWebhookResponse",
  }) as any as Schema.Schema<ReceiveTriggerWebhookResponse>;

export interface ListBitbucketServerConfigsResponse {
  /** A list of BitbucketServerConfigs */
  bitbucketServerConfigs?: Array<BitbucketServerConfig>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListBitbucketServerConfigsResponse: Schema.Schema<ListBitbucketServerConfigsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bitbucketServerConfigs: Schema.optional(
        Schema.Array(BitbucketServerConfig),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListBitbucketServerConfigsResponse",
  }) as any as Schema.Schema<ListBitbucketServerConfigsResponse>;

export interface BitbucketServerRepository {
  /** The resource name of the repository. */
  name?: string;
  /** Display name of the repository. */
  displayName?: string;
  /** Description of the repository. */
  description?: string;
  /** Link to the browse repo page on the Bitbucket Server instance. */
  browseUri?: string;
  /** Identifier for a repository hosted on a Bitbucket Server. */
  repoId?: BitbucketServerRepositoryId;
}

export const BitbucketServerRepository: Schema.Schema<BitbucketServerRepository> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      browseUri: Schema.optional(Schema.String),
      repoId: Schema.optional(BitbucketServerRepositoryId),
    }),
  ).annotate({
    identifier: "BitbucketServerRepository",
  }) as any as Schema.Schema<BitbucketServerRepository>;

export interface ListBitbucketServerRepositoriesResponse {
  /** List of Bitbucket Server repositories. */
  bitbucketServerRepositories?: Array<BitbucketServerRepository>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListBitbucketServerRepositoriesResponse: Schema.Schema<ListBitbucketServerRepositoriesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bitbucketServerRepositories: Schema.optional(
        Schema.Array(BitbucketServerRepository),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListBitbucketServerRepositoriesResponse",
  }) as any as Schema.Schema<ListBitbucketServerRepositoriesResponse>;

export interface RemoveBitbucketServerConnectedRepositoryRequest {
  /** The connected repository to remove. */
  connectedRepository?: BitbucketServerRepositoryId;
}

export const RemoveBitbucketServerConnectedRepositoryRequest: Schema.Schema<RemoveBitbucketServerConnectedRepositoryRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      connectedRepository: Schema.optional(BitbucketServerRepositoryId),
    }),
  ).annotate({
    identifier: "RemoveBitbucketServerConnectedRepositoryRequest",
  }) as any as Schema.Schema<RemoveBitbucketServerConnectedRepositoryRequest>;

export interface BitbucketServerConnectedRepository {
  /** The name of the `BitbucketServerConfig` that added connected repository. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{config}` */
  parent?: string;
  /** The Bitbucket Server repositories to connect. */
  repo?: BitbucketServerRepositoryId;
  /** Output only. The status of the repo connection request. */
  status?: Status;
}

export const BitbucketServerConnectedRepository: Schema.Schema<BitbucketServerConnectedRepository> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parent: Schema.optional(Schema.String),
      repo: Schema.optional(BitbucketServerRepositoryId),
      status: Schema.optional(Status),
    }),
  ).annotate({
    identifier: "BitbucketServerConnectedRepository",
  }) as any as Schema.Schema<BitbucketServerConnectedRepository>;

export interface CreateBitbucketServerConnectedRepositoryRequest {
  /** Required. The name of the `BitbucketServerConfig` that added connected repository. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{config}` */
  parent?: string;
  /** Required. The Bitbucket Server repository to connect. */
  bitbucketServerConnectedRepository?: BitbucketServerConnectedRepository;
}

export const CreateBitbucketServerConnectedRepositoryRequest: Schema.Schema<CreateBitbucketServerConnectedRepositoryRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parent: Schema.optional(Schema.String),
      bitbucketServerConnectedRepository: Schema.optional(
        BitbucketServerConnectedRepository,
      ),
    }),
  ).annotate({
    identifier: "CreateBitbucketServerConnectedRepositoryRequest",
  }) as any as Schema.Schema<CreateBitbucketServerConnectedRepositoryRequest>;

export interface BatchCreateBitbucketServerConnectedRepositoriesRequest {
  /** Required. Requests to connect Bitbucket Server repositories. */
  requests?: Array<CreateBitbucketServerConnectedRepositoryRequest>;
}

export const BatchCreateBitbucketServerConnectedRepositoriesRequest: Schema.Schema<BatchCreateBitbucketServerConnectedRepositoriesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requests: Schema.optional(
        Schema.Array(CreateBitbucketServerConnectedRepositoryRequest),
      ),
    }),
  ).annotate({
    identifier: "BatchCreateBitbucketServerConnectedRepositoriesRequest",
  }) as any as Schema.Schema<BatchCreateBitbucketServerConnectedRepositoriesRequest>;

export interface ListGitLabConfigsResponse {
  /** A list of GitLabConfigs */
  gitlabConfigs?: Array<GitLabConfig>;
  /** A token that can be sent as `page_token` to retrieve the next page If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListGitLabConfigsResponse: Schema.Schema<ListGitLabConfigsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gitlabConfigs: Schema.optional(Schema.Array(GitLabConfig)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListGitLabConfigsResponse",
  }) as any as Schema.Schema<ListGitLabConfigsResponse>;

export interface GitLabRepository {
  /** The resource name of the repository */
  name?: string;
  /** Display name of the repository */
  displayName?: string;
  /** Description of the repository */
  description?: string;
  /** Link to the browse repo page on the GitLab instance */
  browseUri?: string;
  /** Identifier for a repository */
  repositoryId?: GitLabRepositoryId;
}

export const GitLabRepository: Schema.Schema<GitLabRepository> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      browseUri: Schema.optional(Schema.String),
      repositoryId: Schema.optional(GitLabRepositoryId),
    }),
  ).annotate({
    identifier: "GitLabRepository",
  }) as any as Schema.Schema<GitLabRepository>;

export interface ListGitLabRepositoriesResponse {
  /** List of GitLab repositories */
  gitlabRepositories?: Array<GitLabRepository>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListGitLabRepositoriesResponse: Schema.Schema<ListGitLabRepositoriesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gitlabRepositories: Schema.optional(Schema.Array(GitLabRepository)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListGitLabRepositoriesResponse",
  }) as any as Schema.Schema<ListGitLabRepositoriesResponse>;

export interface RemoveGitLabConnectedRepositoryRequest {
  /** The connected repository to remove. */
  connectedRepository?: GitLabRepositoryId;
}

export const RemoveGitLabConnectedRepositoryRequest: Schema.Schema<RemoveGitLabConnectedRepositoryRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      connectedRepository: Schema.optional(GitLabRepositoryId),
    }),
  ).annotate({
    identifier: "RemoveGitLabConnectedRepositoryRequest",
  }) as any as Schema.Schema<RemoveGitLabConnectedRepositoryRequest>;

export interface GitLabConnectedRepository {
  /** The name of the `GitLabConfig` that added connected repository. Format: `projects/{project}/locations/{location}/gitLabConfigs/{config}` */
  parent?: string;
  /** The GitLab repositories to connect. */
  repo?: GitLabRepositoryId;
  /** Output only. The status of the repo connection request. */
  status?: Status;
}

export const GitLabConnectedRepository: Schema.Schema<GitLabConnectedRepository> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parent: Schema.optional(Schema.String),
      repo: Schema.optional(GitLabRepositoryId),
      status: Schema.optional(Status),
    }),
  ).annotate({
    identifier: "GitLabConnectedRepository",
  }) as any as Schema.Schema<GitLabConnectedRepository>;

export interface CreateGitLabConnectedRepositoryRequest {
  /** Required. The name of the `GitLabConfig` that adds connected repository. Format: `projects/{project}/locations/{location}/gitLabConfigs/{config}` */
  parent?: string;
  /** Required. The GitLab repository to connect. */
  gitlabConnectedRepository?: GitLabConnectedRepository;
}

export const CreateGitLabConnectedRepositoryRequest: Schema.Schema<CreateGitLabConnectedRepositoryRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parent: Schema.optional(Schema.String),
      gitlabConnectedRepository: Schema.optional(GitLabConnectedRepository),
    }),
  ).annotate({
    identifier: "CreateGitLabConnectedRepositoryRequest",
  }) as any as Schema.Schema<CreateGitLabConnectedRepositoryRequest>;

export interface BatchCreateGitLabConnectedRepositoriesRequest {
  /** Required. Requests to connect GitLab repositories. */
  requests?: Array<CreateGitLabConnectedRepositoryRequest>;
}

export const BatchCreateGitLabConnectedRepositoriesRequest: Schema.Schema<BatchCreateGitLabConnectedRepositoriesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requests: Schema.optional(
        Schema.Array(CreateGitLabConnectedRepositoryRequest),
      ),
    }),
  ).annotate({
    identifier: "BatchCreateGitLabConnectedRepositoriesRequest",
  }) as any as Schema.Schema<BatchCreateGitLabConnectedRepositoriesRequest>;

export interface GitHubEnterpriseSecrets {
  /** The resource name for the private key secret. */
  privateKeyName?: string;
  /** The resource name for the webhook secret in Secret Manager. */
  webhookSecretName?: string;
  /** The resource name for the OAuth secret in Secret Manager. */
  oauthSecretName?: string;
  /** The resource name for the OAuth client ID secret in Secret Manager. */
  oauthClientIdName?: string;
  /** The resource name for the private key secret version. */
  privateKeyVersionName?: string;
  /** The resource name for the webhook secret secret version in Secret Manager. */
  webhookSecretVersionName?: string;
  /** The resource name for the OAuth secret secret version in Secret Manager. */
  oauthSecretVersionName?: string;
  /** The resource name for the OAuth client ID secret version in Secret Manager. */
  oauthClientIdVersionName?: string;
}

export const GitHubEnterpriseSecrets: Schema.Schema<GitHubEnterpriseSecrets> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      privateKeyName: Schema.optional(Schema.String),
      webhookSecretName: Schema.optional(Schema.String),
      oauthSecretName: Schema.optional(Schema.String),
      oauthClientIdName: Schema.optional(Schema.String),
      privateKeyVersionName: Schema.optional(Schema.String),
      webhookSecretVersionName: Schema.optional(Schema.String),
      oauthSecretVersionName: Schema.optional(Schema.String),
      oauthClientIdVersionName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GitHubEnterpriseSecrets",
  }) as any as Schema.Schema<GitHubEnterpriseSecrets>;

export interface GitHubEnterpriseConfig {
  /** The full resource name for the GitHubEnterpriseConfig For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}" */
  name?: string;
  /** The URL of the github enterprise host the configuration is for. */
  hostUrl?: string;
  /** Required. The GitHub app id of the Cloud Build app on the GitHub Enterprise server. */
  appId?: string;
  /** Output only. Time when the installation was associated with the project. */
  createTime?: string;
  /** The key that should be attached to webhook calls to the ReceiveWebhook endpoint. */
  webhookKey?: string;
  /** Optional. The network to be used when reaching out to the GitHub Enterprise server. The VPC network must be enabled for private service connection. This should be set if the GitHub Enterprise server is hosted on-premises and not reachable by public internet. If this field is left empty, no network peering will occur and calls to the GitHub Enterprise server will be made over the public internet. Must be in the format `projects/{project}/global/networks/{network}`, where {project} is a project number or id and {network} is the name of a VPC network in the project. */
  peeredNetwork?: string;
  /** Optional. Names of secrets in Secret Manager. */
  secrets?: GitHubEnterpriseSecrets;
  /** Optional. Name to display for this config. */
  displayName?: string;
  /** Optional. SSL certificate to use for requests to GitHub Enterprise. */
  sslCa?: string;
}

export const GitHubEnterpriseConfig: Schema.Schema<GitHubEnterpriseConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      hostUrl: Schema.optional(Schema.String),
      appId: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      webhookKey: Schema.optional(Schema.String),
      peeredNetwork: Schema.optional(Schema.String),
      secrets: Schema.optional(GitHubEnterpriseSecrets),
      displayName: Schema.optional(Schema.String),
      sslCa: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GitHubEnterpriseConfig",
  }) as any as Schema.Schema<GitHubEnterpriseConfig>;

export interface ListGithubEnterpriseConfigsResponse {
  /** A list of GitHubEnterpriseConfigs */
  configs?: Array<GitHubEnterpriseConfig>;
}

export const ListGithubEnterpriseConfigsResponse: Schema.Schema<ListGithubEnterpriseConfigsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      configs: Schema.optional(Schema.Array(GitHubEnterpriseConfig)),
    }),
  ).annotate({
    identifier: "ListGithubEnterpriseConfigsResponse",
  }) as any as Schema.Schema<ListGithubEnterpriseConfigsResponse>;

export interface WorkerConfig {
  /** Optional. Machine type of a worker, such as `e2-medium`. See [Worker pool config file](https://cloud.google.com/build/docs/private-pools/worker-pool-config-file-schema). If left blank, Cloud Build will use a sensible default. */
  machineType?: string;
  /** Size of the disk attached to the worker, in GB. See [Worker pool config file](https://cloud.google.com/build/docs/private-pools/worker-pool-config-file-schema). Specify a value of up to 4000. If `0` is specified, Cloud Build will use a standard disk size. */
  diskSizeGb?: string;
  /** Optional. Enable nested virtualization on the worker, if supported by the machine type. By default, nested virtualization is disabled. */
  enableNestedVirtualization?: boolean;
}

export const WorkerConfig: Schema.Schema<WorkerConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      machineType: Schema.optional(Schema.String),
      diskSizeGb: Schema.optional(Schema.String),
      enableNestedVirtualization: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "WorkerConfig",
  }) as any as Schema.Schema<WorkerConfig>;

export interface NetworkConfig {
  /** Required. Immutable. The network definition that the workers are peered to. If this section is left empty, the workers will be peered to `WorkerPool.project_id` on the service producer network. Must be in the format `projects/{project}/global/networks/{network}`, where `{project}` is a project number, such as `12345`, and `{network}` is the name of a VPC network in the project. See [Understanding network configuration options](https://cloud.google.com/build/docs/private-pools/set-up-private-pool-environment) */
  peeredNetwork?: string;
  /** Option to configure network egress for the workers. */
  egressOption?:
    | "EGRESS_OPTION_UNSPECIFIED"
    | "NO_PUBLIC_EGRESS"
    | "PUBLIC_EGRESS"
    | (string & {});
  /** Immutable. Subnet IP range within the peered network. This is specified in CIDR notation with a slash and the subnet prefix size. You can optionally specify an IP address before the subnet prefix value. e.g. `192.168.0.0/29` would specify an IP range starting at 192.168.0.0 with a prefix size of 29 bits. `/16` would specify a prefix size of 16 bits, with an automatically determined IP within the peered VPC. If unspecified, a value of `/24` will be used. */
  peeredNetworkIpRange?: string;
}

export const NetworkConfig: Schema.Schema<NetworkConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      peeredNetwork: Schema.optional(Schema.String),
      egressOption: Schema.optional(Schema.String),
      peeredNetworkIpRange: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NetworkConfig",
  }) as any as Schema.Schema<NetworkConfig>;

export interface PrivateServiceConnect {
  /** Required. Immutable. The network attachment that the worker network interface is peered to. Must be in the format `projects/{project}/regions/{region}/networkAttachments/{networkAttachment}`. The region of network attachment must be the same as the worker pool. See [Network Attachments](https://cloud.google.com/vpc/docs/about-network-attachments) */
  networkAttachment?: string;
  /** Required. Immutable. Disable public IP on the primary network interface. If true, workers are created without any public address, which prevents network egress to public IPs unless a network proxy is configured. If false, workers are created with a public address which allows for public internet egress. The public address only applies to traffic through the primary network interface. If `route_all_traffic` is set to true, all traffic will go through the non-primary network interface, this boolean has no effect. */
  publicIpAddressDisabled?: boolean;
  /** Immutable. Route all traffic through PSC interface. Enable this if you want full control of traffic in the private pool. Configure Cloud NAT for the subnet of network attachment if you need to access public Internet. If false, Only route RFC 1918 (10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16) and RFC 6598 (100.64.0.0/10) through PSC interface. */
  routeAllTraffic?: boolean;
}

export const PrivateServiceConnect: Schema.Schema<PrivateServiceConnect> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      networkAttachment: Schema.optional(Schema.String),
      publicIpAddressDisabled: Schema.optional(Schema.Boolean),
      routeAllTraffic: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "PrivateServiceConnect",
  }) as any as Schema.Schema<PrivateServiceConnect>;

export interface PrivatePoolV1Config {
  /** Machine configuration for the workers in the pool. */
  workerConfig?: WorkerConfig;
  /** Network configuration for the pool. */
  networkConfig?: NetworkConfig;
  /** Immutable. Private Service Connect(PSC) Network configuration for the pool. */
  privateServiceConnect?: PrivateServiceConnect;
}

export const PrivatePoolV1Config: Schema.Schema<PrivatePoolV1Config> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      workerConfig: Schema.optional(WorkerConfig),
      networkConfig: Schema.optional(NetworkConfig),
      privateServiceConnect: Schema.optional(PrivateServiceConnect),
    }),
  ).annotate({
    identifier: "PrivatePoolV1Config",
  }) as any as Schema.Schema<PrivatePoolV1Config>;

export interface WorkerPool {
  /** Output only. The resource name of the `WorkerPool`, with format `projects/{project}/locations/{location}/workerPools/{worker_pool}`. The value of `{worker_pool}` is provided by `worker_pool_id` in `CreateWorkerPool` request and the value of `{location}` is determined by the endpoint accessed. */
  name?: string;
  /** A user-specified, human-readable name for the `WorkerPool`. If provided, this value must be 1-63 characters. */
  displayName?: string;
  /** Output only. A unique identifier for the `WorkerPool`. */
  uid?: string;
  /** User specified annotations. See https://google.aip.dev/128#annotations for more details such as format and size limitations. */
  annotations?: Record<string, string>;
  /** Output only. Time at which the request to create the `WorkerPool` was received. */
  createTime?: string;
  /** Output only. Time at which the request to update the `WorkerPool` was received. */
  updateTime?: string;
  /** Output only. Time at which the request to delete the `WorkerPool` was received. */
  deleteTime?: string;
  /** Output only. `WorkerPool` state. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "RUNNING"
    | "DELETING"
    | "DELETED"
    | "UPDATING"
    | (string & {});
  /** Private Pool configuration. */
  privatePoolV1Config?: PrivatePoolV1Config;
  /** Output only. Checksum computed by the server. May be sent on update and delete requests to ensure that the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const WorkerPool: Schema.Schema<WorkerPool> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      privatePoolV1Config: Schema.optional(PrivatePoolV1Config),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "WorkerPool" }) as any as Schema.Schema<WorkerPool>;

export interface ListWorkerPoolsResponse {
  /** `WorkerPools` for the specified project. */
  workerPools?: Array<WorkerPool>;
  /** Continuation token used to page through large result sets. Provide this value in a subsequent ListWorkerPoolsRequest to return the next page of results. */
  nextPageToken?: string;
}

export const ListWorkerPoolsResponse: Schema.Schema<ListWorkerPoolsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      workerPools: Schema.optional(Schema.Array(WorkerPool)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListWorkerPoolsResponse",
  }) as any as Schema.Schema<ListWorkerPoolsResponse>;

export interface DefaultServiceAccount {
  /** Identifier. Format: `projects/{project}/locations/{location}/defaultServiceAccount`. */
  name?: string;
  /** Output only. The email address of the service account identity that will be used for a build by default. This is returned in the format `projects/{project}/serviceAccounts/{service_account}` where `{service_account}` could be the legacy Cloud Build SA, in the format [PROJECT_NUMBER]@cloudbuild.gserviceaccount.com or the Compute SA, in the format [PROJECT_NUMBER]-compute@developer.gserviceaccount.com. If no service account will be used by default, this will be empty. */
  serviceAccountEmail?: string;
}

export const DefaultServiceAccount: Schema.Schema<DefaultServiceAccount> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      serviceAccountEmail: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DefaultServiceAccount",
  }) as any as Schema.Schema<DefaultServiceAccount>;

export interface BuildOperationMetadata {
  /** The build that the operation is tracking. */
  build?: Build;
}

export const BuildOperationMetadata: Schema.Schema<BuildOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      build: Schema.optional(Build),
    }),
  ).annotate({
    identifier: "BuildOperationMetadata",
  }) as any as Schema.Schema<BuildOperationMetadata>;

export interface CreateWorkerPoolOperationMetadata {
  /** The resource name of the `WorkerPool` to create. Format: `projects/{project}/locations/{location}/workerPools/{worker_pool}`. */
  workerPool?: string;
  /** Time the operation was created. */
  createTime?: string;
  /** Time the operation was completed. */
  completeTime?: string;
}

export const CreateWorkerPoolOperationMetadata: Schema.Schema<CreateWorkerPoolOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      workerPool: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateWorkerPoolOperationMetadata",
  }) as any as Schema.Schema<CreateWorkerPoolOperationMetadata>;

export interface UpdateWorkerPoolOperationMetadata {
  /** The resource name of the `WorkerPool` being updated. Format: `projects/{project}/locations/{location}/workerPools/{worker_pool}`. */
  workerPool?: string;
  /** Time the operation was created. */
  createTime?: string;
  /** Time the operation was completed. */
  completeTime?: string;
}

export const UpdateWorkerPoolOperationMetadata: Schema.Schema<UpdateWorkerPoolOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      workerPool: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateWorkerPoolOperationMetadata",
  }) as any as Schema.Schema<UpdateWorkerPoolOperationMetadata>;

export interface DeleteWorkerPoolOperationMetadata {
  /** The resource name of the `WorkerPool` being deleted. Format: `projects/{project}/locations/{location}/workerPools/{worker_pool}`. */
  workerPool?: string;
  /** Time the operation was created. */
  createTime?: string;
  /** Time the operation was completed. */
  completeTime?: string;
}

export const DeleteWorkerPoolOperationMetadata: Schema.Schema<DeleteWorkerPoolOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      workerPool: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeleteWorkerPoolOperationMetadata",
  }) as any as Schema.Schema<DeleteWorkerPoolOperationMetadata>;

export interface ArtifactResult {
  /** The path of an artifact in a Cloud Storage bucket, with the generation number. For example, `gs://mybucket/path/to/output.jar#generation`. */
  location?: string;
  /** The file hash of the artifact. */
  fileHash?: Array<FileHashes>;
}

export const ArtifactResult: Schema.Schema<ArtifactResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      location: Schema.optional(Schema.String),
      fileHash: Schema.optional(Schema.Array(FileHashes)),
    }),
  ).annotate({
    identifier: "ArtifactResult",
  }) as any as Schema.Schema<ArtifactResult>;

export interface CreateGitHubEnterpriseConfigOperationMetadata {
  /** The resource name of the GitHubEnterprise to be created. Format: `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`. */
  githubEnterpriseConfig?: string;
  /** Time the operation was created. */
  createTime?: string;
  /** Time the operation was completed. */
  completeTime?: string;
}

export const CreateGitHubEnterpriseConfigOperationMetadata: Schema.Schema<CreateGitHubEnterpriseConfigOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      githubEnterpriseConfig: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateGitHubEnterpriseConfigOperationMetadata",
  }) as any as Schema.Schema<CreateGitHubEnterpriseConfigOperationMetadata>;

export interface UpdateGitHubEnterpriseConfigOperationMetadata {
  /** The resource name of the GitHubEnterprise to be updated. Format: `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`. */
  githubEnterpriseConfig?: string;
  /** Time the operation was created. */
  createTime?: string;
  /** Time the operation was completed. */
  completeTime?: string;
}

export const UpdateGitHubEnterpriseConfigOperationMetadata: Schema.Schema<UpdateGitHubEnterpriseConfigOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      githubEnterpriseConfig: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateGitHubEnterpriseConfigOperationMetadata",
  }) as any as Schema.Schema<UpdateGitHubEnterpriseConfigOperationMetadata>;

export interface DeleteGitHubEnterpriseConfigOperationMetadata {
  /** The resource name of the GitHubEnterprise to be deleted. Format: `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`. */
  githubEnterpriseConfig?: string;
  /** Time the operation was created. */
  createTime?: string;
  /** Time the operation was completed. */
  completeTime?: string;
}

export const DeleteGitHubEnterpriseConfigOperationMetadata: Schema.Schema<DeleteGitHubEnterpriseConfigOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      githubEnterpriseConfig: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeleteGitHubEnterpriseConfigOperationMetadata",
  }) as any as Schema.Schema<DeleteGitHubEnterpriseConfigOperationMetadata>;

export interface ProcessAppManifestCallbackOperationMetadata {
  /** The resource name of the GitHubEnterprise to be created. Format: `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`. */
  githubEnterpriseConfig?: string;
  /** Time the operation was created. */
  createTime?: string;
  /** Time the operation was completed. */
  completeTime?: string;
}

export const ProcessAppManifestCallbackOperationMetadata: Schema.Schema<ProcessAppManifestCallbackOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      githubEnterpriseConfig: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProcessAppManifestCallbackOperationMetadata",
  }) as any as Schema.Schema<ProcessAppManifestCallbackOperationMetadata>;

export interface BatchCreateBitbucketServerConnectedRepositoriesResponseMetadata {
  /** The name of the `BitbucketServerConfig` that added connected repositories. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{config}` */
  config?: string;
  /** Time the operation was created. */
  createTime?: string;
  /** Time the operation was completed. */
  completeTime?: string;
}

export const BatchCreateBitbucketServerConnectedRepositoriesResponseMetadata: Schema.Schema<BatchCreateBitbucketServerConnectedRepositoriesResponseMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      config: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "BatchCreateBitbucketServerConnectedRepositoriesResponseMetadata",
  }) as any as Schema.Schema<BatchCreateBitbucketServerConnectedRepositoriesResponseMetadata>;

export interface BatchCreateBitbucketServerConnectedRepositoriesResponse {
  /** The connected Bitbucket Server repositories. */
  bitbucketServerConnectedRepositories?: Array<BitbucketServerConnectedRepository>;
}

export const BatchCreateBitbucketServerConnectedRepositoriesResponse: Schema.Schema<BatchCreateBitbucketServerConnectedRepositoriesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bitbucketServerConnectedRepositories: Schema.optional(
        Schema.Array(BitbucketServerConnectedRepository),
      ),
    }),
  ).annotate({
    identifier: "BatchCreateBitbucketServerConnectedRepositoriesResponse",
  }) as any as Schema.Schema<BatchCreateBitbucketServerConnectedRepositoriesResponse>;

export interface CreateBitbucketServerConfigOperationMetadata {
  /** The resource name of the BitbucketServerConfig to be created. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`. */
  bitbucketServerConfig?: string;
  /** Time the operation was created. */
  createTime?: string;
  /** Time the operation was completed. */
  completeTime?: string;
}

export const CreateBitbucketServerConfigOperationMetadata: Schema.Schema<CreateBitbucketServerConfigOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bitbucketServerConfig: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateBitbucketServerConfigOperationMetadata",
  }) as any as Schema.Schema<CreateBitbucketServerConfigOperationMetadata>;

export interface UpdateBitbucketServerConfigOperationMetadata {
  /** The resource name of the BitbucketServerConfig to be updated. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`. */
  bitbucketServerConfig?: string;
  /** Time the operation was created. */
  createTime?: string;
  /** Time the operation was completed. */
  completeTime?: string;
}

export const UpdateBitbucketServerConfigOperationMetadata: Schema.Schema<UpdateBitbucketServerConfigOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bitbucketServerConfig: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateBitbucketServerConfigOperationMetadata",
  }) as any as Schema.Schema<UpdateBitbucketServerConfigOperationMetadata>;

export interface DeleteBitbucketServerConfigOperationMetadata {
  /** The resource name of the BitbucketServerConfig to be deleted. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`. */
  bitbucketServerConfig?: string;
  /** Time the operation was created. */
  createTime?: string;
  /** Time the operation was completed. */
  completeTime?: string;
}

export const DeleteBitbucketServerConfigOperationMetadata: Schema.Schema<DeleteBitbucketServerConfigOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bitbucketServerConfig: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeleteBitbucketServerConfigOperationMetadata",
  }) as any as Schema.Schema<DeleteBitbucketServerConfigOperationMetadata>;

export interface CreateGitLabConfigOperationMetadata {
  /** The resource name of the GitLabConfig to be created. Format: `projects/{project}/locations/{location}/gitlabConfigs/{id}`. */
  gitlabConfig?: string;
  /** Time the operation was created. */
  createTime?: string;
  /** Time the operation was completed. */
  completeTime?: string;
}

export const CreateGitLabConfigOperationMetadata: Schema.Schema<CreateGitLabConfigOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gitlabConfig: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateGitLabConfigOperationMetadata",
  }) as any as Schema.Schema<CreateGitLabConfigOperationMetadata>;

export interface UpdateGitLabConfigOperationMetadata {
  /** The resource name of the GitLabConfig to be created. Format: `projects/{project}/locations/{location}/gitlabConfigs/{id}`. */
  gitlabConfig?: string;
  /** Time the operation was created. */
  createTime?: string;
  /** Time the operation was completed. */
  completeTime?: string;
}

export const UpdateGitLabConfigOperationMetadata: Schema.Schema<UpdateGitLabConfigOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gitlabConfig: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateGitLabConfigOperationMetadata",
  }) as any as Schema.Schema<UpdateGitLabConfigOperationMetadata>;

export interface DeleteGitLabConfigOperationMetadata {
  /** The resource name of the GitLabConfig to be created. Format: `projects/{project}/locations/{location}/gitlabConfigs/{id}`. */
  gitlabConfig?: string;
  /** Time the operation was created. */
  createTime?: string;
  /** Time the operation was completed. */
  completeTime?: string;
}

export const DeleteGitLabConfigOperationMetadata: Schema.Schema<DeleteGitLabConfigOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gitlabConfig: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeleteGitLabConfigOperationMetadata",
  }) as any as Schema.Schema<DeleteGitLabConfigOperationMetadata>;

export interface BatchCreateGitLabConnectedRepositoriesResponse {
  /** The GitLab connected repository requests' responses. */
  gitlabConnectedRepositories?: Array<GitLabConnectedRepository>;
}

export const BatchCreateGitLabConnectedRepositoriesResponse: Schema.Schema<BatchCreateGitLabConnectedRepositoriesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gitlabConnectedRepositories: Schema.optional(
        Schema.Array(GitLabConnectedRepository),
      ),
    }),
  ).annotate({
    identifier: "BatchCreateGitLabConnectedRepositoriesResponse",
  }) as any as Schema.Schema<BatchCreateGitLabConnectedRepositoriesResponse>;

export interface BatchCreateGitLabConnectedRepositoriesResponseMetadata {
  /** The name of the `GitLabConfig` that added connected repositories. Format: `projects/{project}/locations/{location}/gitLabConfigs/{config}` */
  config?: string;
  /** Time the operation was created. */
  createTime?: string;
  /** Time the operation was completed. */
  completeTime?: string;
}

export const BatchCreateGitLabConnectedRepositoriesResponseMetadata: Schema.Schema<BatchCreateGitLabConnectedRepositoriesResponseMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      config: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BatchCreateGitLabConnectedRepositoriesResponseMetadata",
  }) as any as Schema.Schema<BatchCreateGitLabConnectedRepositoriesResponseMetadata>;

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
  statusDetail?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  cancelRequested?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      statusDetail: Schema.optional(Schema.String),
      cancelRequested: Schema.optional(Schema.Boolean),
      apiVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OperationMetadata",
  }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getOperations: API.OperationMethod<
  GetOperationsRequest,
  GetOperationsResponse,
  GetOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

export interface CancelOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/operations/{operationsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelOperationsRequest>;

export type CancelOperationsResponse = Empty;
export const CancelOperationsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type CancelOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelOperations: API.OperationMethod<
  CancelOperationsRequest,
  CancelOperationsResponse,
  CancelOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelOperationsRequest,
  output: CancelOperationsResponse,
  errors: [],
}));

export interface CreateProjectsBuildsRequest {
  /** Required. ID of the project. */
  projectId: string;
  /** The parent resource where this build will be created. Format: `projects/{project}/locations/{location}` */
  parent?: string;
  /** Request body */
  body?: Build;
}

export const CreateProjectsBuildsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    body: Schema.optional(Build).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectId}/builds",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsBuildsRequest>;

export type CreateProjectsBuildsResponse = Operation;
export const CreateProjectsBuildsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsBuildsError = DefaultErrors;

/** Starts a build with the specified configuration. This method returns a long-running `Operation`, which includes the build ID. Pass the build ID to `GetBuild` to determine the build status (such as `SUCCESS` or `FAILURE`). */
export const createProjectsBuilds: API.OperationMethod<
  CreateProjectsBuildsRequest,
  CreateProjectsBuildsResponse,
  CreateProjectsBuildsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsBuildsRequest,
  output: CreateProjectsBuildsResponse,
  errors: [],
}));

export interface GetProjectsBuildsRequest {
  /** Required. ID of the project. */
  projectId: string;
  /** Required. ID of the build. */
  id: string;
  /** The name of the `Build` to retrieve. Format: `projects/{project}/locations/{location}/builds/{build}` */
  name?: string;
}

export const GetProjectsBuildsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/projects/{projectId}/builds/{id}" }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsBuildsRequest>;

export type GetProjectsBuildsResponse = Build;
export const GetProjectsBuildsResponse = /*@__PURE__*/ /*#__PURE__*/ Build;

export type GetProjectsBuildsError = DefaultErrors;

/** Returns information about a previously requested build. The `Build` that is returned includes its status (such as `SUCCESS`, `FAILURE`, or `WORKING`), and timing information. */
export const getProjectsBuilds: API.OperationMethod<
  GetProjectsBuildsRequest,
  GetProjectsBuildsResponse,
  GetProjectsBuildsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsBuildsRequest,
  output: GetProjectsBuildsResponse,
  errors: [],
}));

export interface ListProjectsBuildsRequest {
  /** Required. ID of the project. */
  projectId: string;
  /** The parent of the collection of `Builds`. Format: `projects/{project}/locations/{location}` */
  parent?: string;
  /** Number of results to return in the list. */
  pageSize?: number;
  /** The page token for the next page of Builds. If unspecified, the first page of results is returned. If the token is rejected for any reason, INVALID_ARGUMENT will be thrown. In this case, the token should be discarded, and pagination should be restarted from the first page of results. See https://google.aip.dev/158 for more. */
  pageToken?: string;
  /** The raw filter text to constrain the results. */
  filter?: string;
}

export const ListProjectsBuildsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/projects/{projectId}/builds" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsBuildsRequest>;

export type ListProjectsBuildsResponse = ListBuildsResponse;
export const ListProjectsBuildsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListBuildsResponse;

export type ListProjectsBuildsError = DefaultErrors;

/** Lists previously requested builds. Previously requested builds may still be in-progress, or may have finished successfully or unsuccessfully. */
export const listProjectsBuilds: API.PaginatedOperationMethod<
  ListProjectsBuildsRequest,
  ListProjectsBuildsResponse,
  ListProjectsBuildsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsBuildsRequest,
  output: ListProjectsBuildsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CancelProjectsBuildsRequest {
  /** Required. ID of the project. */
  projectId: string;
  /** Required. ID of the build. */
  id: string;
  /** Request body */
  body?: CancelBuildRequest;
}

export const CancelProjectsBuildsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    body: Schema.optional(CancelBuildRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectId}/builds/{id}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsBuildsRequest>;

export type CancelProjectsBuildsResponse = Build;
export const CancelProjectsBuildsResponse = /*@__PURE__*/ /*#__PURE__*/ Build;

export type CancelProjectsBuildsError = DefaultErrors;

/** Cancels a build in progress. */
export const cancelProjectsBuilds: API.OperationMethod<
  CancelProjectsBuildsRequest,
  CancelProjectsBuildsResponse,
  CancelProjectsBuildsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsBuildsRequest,
  output: CancelProjectsBuildsResponse,
  errors: [],
}));

export interface RetryProjectsBuildsRequest {
  /** Required. ID of the project. */
  projectId: string;
  /** Required. Build ID of the original build. */
  id: string;
  /** Request body */
  body?: RetryBuildRequest;
}

export const RetryProjectsBuildsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    body: Schema.optional(RetryBuildRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectId}/builds/{id}:retry",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RetryProjectsBuildsRequest>;

export type RetryProjectsBuildsResponse = Operation;
export const RetryProjectsBuildsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type RetryProjectsBuildsError = DefaultErrors;

/** Creates a new build based on the specified build. This method creates a new build using the original build request, which may or may not result in an identical build. For triggered builds: * Triggered builds resolve to a precise revision; therefore a retry of a triggered build will result in a build that uses the same revision. For non-triggered builds that specify `RepoSource`: * If the original build built from the tip of a branch, the retried build will build from the tip of that branch, which may not be the same revision as the original build. * If the original build specified a commit sha or revision ID, the retried build will use the identical source. For builds that specify `StorageSource`: * If the original build pulled source from Cloud Storage without specifying the generation of the object, the new build will use the current object, which may be different from the original build source. * If the original build pulled source from Cloud Storage and specified the generation of the object, the new build will attempt to use the same object, which may or may not be available depending on the bucket's lifecycle management settings. */
export const retryProjectsBuilds: API.OperationMethod<
  RetryProjectsBuildsRequest,
  RetryProjectsBuildsResponse,
  RetryProjectsBuildsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RetryProjectsBuildsRequest,
  output: RetryProjectsBuildsResponse,
  errors: [],
}));

export interface ApproveProjectsBuildsRequest {
  /** Required. Name of the target build. For example: "projects/{$project_id}/builds/{$build_id}" */
  name: string;
  /** Request body */
  body?: ApproveBuildRequest;
}

export const ApproveProjectsBuildsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ApproveBuildRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/builds/{buildsId}:approve",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ApproveProjectsBuildsRequest>;

export type ApproveProjectsBuildsResponse = Operation;
export const ApproveProjectsBuildsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type ApproveProjectsBuildsError = DefaultErrors;

/** Approves or rejects a pending build. If approved, the returned long-running operation (LRO) will be analogous to the LRO returned from a CreateBuild call. If rejected, the returned LRO will be immediately done. */
export const approveProjectsBuilds: API.OperationMethod<
  ApproveProjectsBuildsRequest,
  ApproveProjectsBuildsResponse,
  ApproveProjectsBuildsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ApproveProjectsBuildsRequest,
  output: ApproveProjectsBuildsResponse,
  errors: [],
}));

export interface CreateProjectsTriggersRequest {
  /** Required. ID of the project for which to configure automatic builds. */
  projectId: string;
  /** The parent resource where this trigger will be created. Format: `projects/{project}/locations/{location}` */
  parent?: string;
  /** Request body */
  body?: BuildTrigger;
}

export const CreateProjectsTriggersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    body: Schema.optional(BuildTrigger).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectId}/triggers",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsTriggersRequest>;

export type CreateProjectsTriggersResponse = BuildTrigger;
export const CreateProjectsTriggersResponse =
  /*@__PURE__*/ /*#__PURE__*/ BuildTrigger;

export type CreateProjectsTriggersError = DefaultErrors;

/** Creates a new `BuildTrigger`. */
export const createProjectsTriggers: API.OperationMethod<
  CreateProjectsTriggersRequest,
  CreateProjectsTriggersResponse,
  CreateProjectsTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsTriggersRequest,
  output: CreateProjectsTriggersResponse,
  errors: [],
}));

export interface GetProjectsTriggersRequest {
  /** Required. ID of the project that owns the trigger. */
  projectId: string;
  /** Required. Identifier (`id` or `name`) of the `BuildTrigger` to get. */
  triggerId: string;
  /** The name of the `Trigger` to retrieve. Format: `projects/{project}/locations/{location}/triggers/{trigger}` */
  name?: string;
}

export const GetProjectsTriggersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    triggerId: Schema.String.pipe(T.HttpPath("triggerId")),
    name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectId}/triggers/{triggerId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsTriggersRequest>;

export type GetProjectsTriggersResponse = BuildTrigger;
export const GetProjectsTriggersResponse =
  /*@__PURE__*/ /*#__PURE__*/ BuildTrigger;

export type GetProjectsTriggersError = DefaultErrors;

/** Returns information about a `BuildTrigger`. */
export const getProjectsTriggers: API.OperationMethod<
  GetProjectsTriggersRequest,
  GetProjectsTriggersResponse,
  GetProjectsTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsTriggersRequest,
  output: GetProjectsTriggersResponse,
  errors: [],
}));

export interface ListProjectsTriggersRequest {
  /** Required. ID of the project for which to list BuildTriggers. */
  projectId: string;
  /** The parent of the collection of `Triggers`. Format: `projects/{project}/locations/{location}` */
  parent?: string;
  /** Number of results to return in the list. */
  pageSize?: number;
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
}

export const ListProjectsTriggersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/projects/{projectId}/triggers" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsTriggersRequest>;

export type ListProjectsTriggersResponse = ListBuildTriggersResponse;
export const ListProjectsTriggersResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListBuildTriggersResponse;

export type ListProjectsTriggersError = DefaultErrors;

/** Lists existing `BuildTrigger`s. */
export const listProjectsTriggers: API.PaginatedOperationMethod<
  ListProjectsTriggersRequest,
  ListProjectsTriggersResponse,
  ListProjectsTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsTriggersRequest,
  output: ListProjectsTriggersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsTriggersRequest {
  /** Required. ID of the project that owns the trigger. */
  projectId: string;
  /** Required. ID of the `BuildTrigger` to delete. */
  triggerId: string;
  /** The name of the `Trigger` to delete. Format: `projects/{project}/locations/{location}/triggers/{trigger}` */
  name?: string;
}

export const DeleteProjectsTriggersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    triggerId: Schema.String.pipe(T.HttpPath("triggerId")),
    name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectId}/triggers/{triggerId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsTriggersRequest>;

export type DeleteProjectsTriggersResponse = Empty;
export const DeleteProjectsTriggersResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsTriggersError = DefaultErrors;

/** Deletes a `BuildTrigger` by its project ID and trigger ID. */
export const deleteProjectsTriggers: API.OperationMethod<
  DeleteProjectsTriggersRequest,
  DeleteProjectsTriggersResponse,
  DeleteProjectsTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsTriggersRequest,
  output: DeleteProjectsTriggersResponse,
  errors: [],
}));

export interface PatchProjectsTriggersRequest {
  /** Required. ID of the project that owns the trigger. */
  projectId: string;
  /** Required. ID of the `BuildTrigger` to update. */
  triggerId: string;
  /** Update mask for the resource. If this is set, the server will only update the fields specified in the field mask. Otherwise, a full update of the mutable resource fields will be performed. */
  updateMask?: string;
  /** Request body */
  body?: BuildTrigger;
}

export const PatchProjectsTriggersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    triggerId: Schema.String.pipe(T.HttpPath("triggerId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(BuildTrigger).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectId}/triggers/{triggerId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsTriggersRequest>;

export type PatchProjectsTriggersResponse = BuildTrigger;
export const PatchProjectsTriggersResponse =
  /*@__PURE__*/ /*#__PURE__*/ BuildTrigger;

export type PatchProjectsTriggersError = DefaultErrors;

/** Updates a `BuildTrigger` by its project ID and trigger ID. */
export const patchProjectsTriggers: API.OperationMethod<
  PatchProjectsTriggersRequest,
  PatchProjectsTriggersResponse,
  PatchProjectsTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsTriggersRequest,
  output: PatchProjectsTriggersResponse,
  errors: [],
}));

export interface RunProjectsTriggersRequest {
  /** Required. ID of the project. */
  projectId: string;
  /** Required. ID of the trigger. */
  triggerId: string;
  /** The name of the `Trigger` to run. Format: `projects/{project}/locations/{location}/triggers/{trigger}` */
  name?: string;
  /** Request body */
  body?: RepoSource;
}

export const RunProjectsTriggersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    triggerId: Schema.String.pipe(T.HttpPath("triggerId")),
    name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
    body: Schema.optional(RepoSource).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectId}/triggers/{triggerId}:run",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RunProjectsTriggersRequest>;

export type RunProjectsTriggersResponse = Operation;
export const RunProjectsTriggersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type RunProjectsTriggersError = DefaultErrors;

/** Runs a `BuildTrigger` at a particular source revision. To run a regional or global trigger, use the POST request that includes the location endpoint in the path (ex. v1/projects/{projectId}/locations/{region}/triggers/{triggerId}:run). The POST request that does not include the location endpoint in the path can only be used when running global triggers. */
export const runProjectsTriggers: API.OperationMethod<
  RunProjectsTriggersRequest,
  RunProjectsTriggersResponse,
  RunProjectsTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RunProjectsTriggersRequest,
  output: RunProjectsTriggersResponse,
  errors: [],
}));

export interface WebhookProjectsTriggersRequest {
  /** Project in which the specified trigger lives */
  projectId: string;
  /** Name of the trigger to run the payload against */
  trigger: string;
  /** The name of the `ReceiveTriggerWebhook` to retrieve. Format: `projects/{project}/locations/{location}/triggers/{trigger}` */
  name?: string;
  /** Secret token used for authorization if an OAuth token isn't provided. */
  secret?: string;
  /** Request body */
  body?: HttpBody;
}

export const WebhookProjectsTriggersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    trigger: Schema.String.pipe(T.HttpPath("trigger")),
    name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
    secret: Schema.optional(Schema.String).pipe(T.HttpQuery("secret")),
    body: Schema.optional(HttpBody).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectId}/triggers/{trigger}:webhook",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<WebhookProjectsTriggersRequest>;

export type WebhookProjectsTriggersResponse = ReceiveTriggerWebhookResponse;
export const WebhookProjectsTriggersResponse =
  /*@__PURE__*/ /*#__PURE__*/ ReceiveTriggerWebhookResponse;

export type WebhookProjectsTriggersError = DefaultErrors;

/** ReceiveTriggerWebhook [Experimental] is called when the API receives a webhook request targeted at a specific trigger. */
export const webhookProjectsTriggers: API.OperationMethod<
  WebhookProjectsTriggersRequest,
  WebhookProjectsTriggersResponse,
  WebhookProjectsTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: WebhookProjectsTriggersRequest,
  output: WebhookProjectsTriggersResponse,
  errors: [],
}));

export interface CreateProjectsGithubEnterpriseConfigsRequest {
  /** Name of the parent project. For example: projects/{$project_number} or projects/{$project_id} */
  parent: string;
  /** ID of the project. */
  projectId?: string;
  /** Optional. The ID to use for the GithubEnterpriseConfig, which will become the final component of the GithubEnterpriseConfig's resource name. ghe_config_id must meet the following requirements: + They must contain only alphanumeric characters and dashes. + They can be 1-64 characters long. + They must begin and end with an alphanumeric character */
  gheConfigId?: string;
  /** Request body */
  body?: GitHubEnterpriseConfig;
}

export const CreateProjectsGithubEnterpriseConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    gheConfigId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("gheConfigId"),
    ),
    body: Schema.optional(GitHubEnterpriseConfig).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/githubEnterpriseConfigs",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsGithubEnterpriseConfigsRequest>;

export type CreateProjectsGithubEnterpriseConfigsResponse = Operation;
export const CreateProjectsGithubEnterpriseConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsGithubEnterpriseConfigsError = DefaultErrors;

/** Create an association between a GCP project and a GitHub Enterprise server. */
export const createProjectsGithubEnterpriseConfigs: API.OperationMethod<
  CreateProjectsGithubEnterpriseConfigsRequest,
  CreateProjectsGithubEnterpriseConfigsResponse,
  CreateProjectsGithubEnterpriseConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsGithubEnterpriseConfigsRequest,
  output: CreateProjectsGithubEnterpriseConfigsResponse,
  errors: [],
}));

export interface PatchProjectsGithubEnterpriseConfigsRequest {
  /** The full resource name for the GitHubEnterpriseConfig For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}" */
  name: string;
  /** Update mask for the resource. If this is set, the server will only update the fields specified in the field mask. Otherwise, a full update of the mutable resource fields will be performed. */
  updateMask?: string;
  /** Request body */
  body?: GitHubEnterpriseConfig;
}

export const PatchProjectsGithubEnterpriseConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GitHubEnterpriseConfig).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/githubEnterpriseConfigs/{githubEnterpriseConfigsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsGithubEnterpriseConfigsRequest>;

export type PatchProjectsGithubEnterpriseConfigsResponse = Operation;
export const PatchProjectsGithubEnterpriseConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsGithubEnterpriseConfigsError = DefaultErrors;

/** Update an association between a GCP project and a GitHub Enterprise server. */
export const patchProjectsGithubEnterpriseConfigs: API.OperationMethod<
  PatchProjectsGithubEnterpriseConfigsRequest,
  PatchProjectsGithubEnterpriseConfigsResponse,
  PatchProjectsGithubEnterpriseConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsGithubEnterpriseConfigsRequest,
  output: PatchProjectsGithubEnterpriseConfigsResponse,
  errors: [],
}));

export interface GetProjectsGithubEnterpriseConfigsRequest {
  /** This field should contain the name of the enterprise config resource. For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}" */
  name: string;
  /** ID of the project */
  projectId?: string;
  /** Unique identifier of the `GitHubEnterpriseConfig` */
  configId?: string;
}

export const GetProjectsGithubEnterpriseConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    configId: Schema.optional(Schema.String).pipe(T.HttpQuery("configId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/githubEnterpriseConfigs/{githubEnterpriseConfigsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsGithubEnterpriseConfigsRequest>;

export type GetProjectsGithubEnterpriseConfigsResponse = GitHubEnterpriseConfig;
export const GetProjectsGithubEnterpriseConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GitHubEnterpriseConfig;

export type GetProjectsGithubEnterpriseConfigsError = DefaultErrors;

/** Retrieve a GitHubEnterpriseConfig. */
export const getProjectsGithubEnterpriseConfigs: API.OperationMethod<
  GetProjectsGithubEnterpriseConfigsRequest,
  GetProjectsGithubEnterpriseConfigsResponse,
  GetProjectsGithubEnterpriseConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsGithubEnterpriseConfigsRequest,
  output: GetProjectsGithubEnterpriseConfigsResponse,
  errors: [],
}));

export interface ListProjectsGithubEnterpriseConfigsRequest {
  /** Name of the parent project. For example: projects/{$project_number} or projects/{$project_id} */
  parent: string;
  /** ID of the project */
  projectId?: string;
}

export const ListProjectsGithubEnterpriseConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/githubEnterpriseConfigs",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsGithubEnterpriseConfigsRequest>;

export type ListProjectsGithubEnterpriseConfigsResponse =
  ListGithubEnterpriseConfigsResponse;
export const ListProjectsGithubEnterpriseConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListGithubEnterpriseConfigsResponse;

export type ListProjectsGithubEnterpriseConfigsError = DefaultErrors;

/** List all GitHubEnterpriseConfigs for a given project. */
export const listProjectsGithubEnterpriseConfigs: API.OperationMethod<
  ListProjectsGithubEnterpriseConfigsRequest,
  ListProjectsGithubEnterpriseConfigsResponse,
  ListProjectsGithubEnterpriseConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListProjectsGithubEnterpriseConfigsRequest,
  output: ListProjectsGithubEnterpriseConfigsResponse,
  errors: [],
}));

export interface DeleteProjectsGithubEnterpriseConfigsRequest {
  /** This field should contain the name of the enterprise config resource. For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}" */
  name: string;
  /** ID of the project */
  projectId?: string;
  /** Unique identifier of the `GitHubEnterpriseConfig` */
  configId?: string;
}

export const DeleteProjectsGithubEnterpriseConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    configId: Schema.optional(Schema.String).pipe(T.HttpQuery("configId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/githubEnterpriseConfigs/{githubEnterpriseConfigsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsGithubEnterpriseConfigsRequest>;

export type DeleteProjectsGithubEnterpriseConfigsResponse = Operation;
export const DeleteProjectsGithubEnterpriseConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsGithubEnterpriseConfigsError = DefaultErrors;

/** Delete an association between a GCP project and a GitHub Enterprise server. */
export const deleteProjectsGithubEnterpriseConfigs: API.OperationMethod<
  DeleteProjectsGithubEnterpriseConfigsRequest,
  DeleteProjectsGithubEnterpriseConfigsResponse,
  DeleteProjectsGithubEnterpriseConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsGithubEnterpriseConfigsRequest,
  output: DeleteProjectsGithubEnterpriseConfigsResponse,
  errors: [],
}));

export interface GetDefaultServiceAccountProjectsLocationsRequest {
  /** Required. The name of the `DefaultServiceAccount` to retrieve. Format: `projects/{project}/locations/{location}/defaultServiceAccount` */
  name: string;
}

export const GetDefaultServiceAccountProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/defaultServiceAccount",
    }),
    svc,
  ) as unknown as Schema.Schema<GetDefaultServiceAccountProjectsLocationsRequest>;

export type GetDefaultServiceAccountProjectsLocationsResponse =
  DefaultServiceAccount;
export const GetDefaultServiceAccountProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ DefaultServiceAccount;

export type GetDefaultServiceAccountProjectsLocationsError = DefaultErrors;

/** Returns the `DefaultServiceAccount` used by the project. */
export const getDefaultServiceAccountProjectsLocations: API.OperationMethod<
  GetDefaultServiceAccountProjectsLocationsRequest,
  GetDefaultServiceAccountProjectsLocationsResponse,
  GetDefaultServiceAccountProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDefaultServiceAccountProjectsLocationsRequest,
  output: GetDefaultServiceAccountProjectsLocationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<
  GetProjectsLocationsOperationsRequest,
  GetProjectsLocationsOperationsResponse,
  GetProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type CancelProjectsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<
  CancelProjectsLocationsOperationsRequest,
  CancelProjectsLocationsOperationsResponse,
  CancelProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsBuildsRequest {
  /** The parent resource where this build will be created. Format: `projects/{project}/locations/{location}` */
  parent: string;
  /** Required. ID of the project. */
  projectId?: string;
  /** Request body */
  body?: Build;
}

export const CreateProjectsLocationsBuildsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    body: Schema.optional(Build).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/builds",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsBuildsRequest>;

export type CreateProjectsLocationsBuildsResponse = Operation;
export const CreateProjectsLocationsBuildsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsBuildsError = DefaultErrors;

/** Starts a build with the specified configuration. This method returns a long-running `Operation`, which includes the build ID. Pass the build ID to `GetBuild` to determine the build status (such as `SUCCESS` or `FAILURE`). */
export const createProjectsLocationsBuilds: API.OperationMethod<
  CreateProjectsLocationsBuildsRequest,
  CreateProjectsLocationsBuildsResponse,
  CreateProjectsLocationsBuildsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsBuildsRequest,
  output: CreateProjectsLocationsBuildsResponse,
  errors: [],
}));

export interface GetProjectsLocationsBuildsRequest {
  /** The name of the `Build` to retrieve. Format: `projects/{project}/locations/{location}/builds/{build}` */
  name: string;
  /** Required. ID of the project. */
  projectId?: string;
  /** Required. ID of the build. */
  id?: string;
}

export const GetProjectsLocationsBuildsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/builds/{buildsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsBuildsRequest>;

export type GetProjectsLocationsBuildsResponse = Build;
export const GetProjectsLocationsBuildsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Build;

export type GetProjectsLocationsBuildsError = DefaultErrors;

/** Returns information about a previously requested build. The `Build` that is returned includes its status (such as `SUCCESS`, `FAILURE`, or `WORKING`), and timing information. */
export const getProjectsLocationsBuilds: API.OperationMethod<
  GetProjectsLocationsBuildsRequest,
  GetProjectsLocationsBuildsResponse,
  GetProjectsLocationsBuildsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsBuildsRequest,
  output: GetProjectsLocationsBuildsResponse,
  errors: [],
}));

export interface ListProjectsLocationsBuildsRequest {
  /** The parent of the collection of `Builds`. Format: `projects/{project}/locations/{location}` */
  parent: string;
  /** Required. ID of the project. */
  projectId?: string;
  /** Number of results to return in the list. */
  pageSize?: number;
  /** The page token for the next page of Builds. If unspecified, the first page of results is returned. If the token is rejected for any reason, INVALID_ARGUMENT will be thrown. In this case, the token should be discarded, and pagination should be restarted from the first page of results. See https://google.aip.dev/158 for more. */
  pageToken?: string;
  /** The raw filter text to constrain the results. */
  filter?: string;
}

export const ListProjectsLocationsBuildsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/builds",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsBuildsRequest>;

export type ListProjectsLocationsBuildsResponse = ListBuildsResponse;
export const ListProjectsLocationsBuildsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListBuildsResponse;

export type ListProjectsLocationsBuildsError = DefaultErrors;

/** Lists previously requested builds. Previously requested builds may still be in-progress, or may have finished successfully or unsuccessfully. */
export const listProjectsLocationsBuilds: API.PaginatedOperationMethod<
  ListProjectsLocationsBuildsRequest,
  ListProjectsLocationsBuildsResponse,
  ListProjectsLocationsBuildsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsBuildsRequest,
  output: ListProjectsLocationsBuildsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CancelProjectsLocationsBuildsRequest {
  /** The name of the `Build` to cancel. Format: `projects/{project}/locations/{location}/builds/{build}` */
  name: string;
  /** Request body */
  body?: CancelBuildRequest;
}

export const CancelProjectsLocationsBuildsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelBuildRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/builds/{buildsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsLocationsBuildsRequest>;

export type CancelProjectsLocationsBuildsResponse = Build;
export const CancelProjectsLocationsBuildsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Build;

export type CancelProjectsLocationsBuildsError = DefaultErrors;

/** Cancels a build in progress. */
export const cancelProjectsLocationsBuilds: API.OperationMethod<
  CancelProjectsLocationsBuildsRequest,
  CancelProjectsLocationsBuildsResponse,
  CancelProjectsLocationsBuildsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsLocationsBuildsRequest,
  output: CancelProjectsLocationsBuildsResponse,
  errors: [],
}));

export interface RetryProjectsLocationsBuildsRequest {
  /** The name of the `Build` to retry. Format: `projects/{project}/locations/{location}/builds/{build}` */
  name: string;
  /** Request body */
  body?: RetryBuildRequest;
}

export const RetryProjectsLocationsBuildsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(RetryBuildRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/builds/{buildsId}:retry",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RetryProjectsLocationsBuildsRequest>;

export type RetryProjectsLocationsBuildsResponse = Operation;
export const RetryProjectsLocationsBuildsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type RetryProjectsLocationsBuildsError = DefaultErrors;

/** Creates a new build based on the specified build. This method creates a new build using the original build request, which may or may not result in an identical build. For triggered builds: * Triggered builds resolve to a precise revision; therefore a retry of a triggered build will result in a build that uses the same revision. For non-triggered builds that specify `RepoSource`: * If the original build built from the tip of a branch, the retried build will build from the tip of that branch, which may not be the same revision as the original build. * If the original build specified a commit sha or revision ID, the retried build will use the identical source. For builds that specify `StorageSource`: * If the original build pulled source from Cloud Storage without specifying the generation of the object, the new build will use the current object, which may be different from the original build source. * If the original build pulled source from Cloud Storage and specified the generation of the object, the new build will attempt to use the same object, which may or may not be available depending on the bucket's lifecycle management settings. */
export const retryProjectsLocationsBuilds: API.OperationMethod<
  RetryProjectsLocationsBuildsRequest,
  RetryProjectsLocationsBuildsResponse,
  RetryProjectsLocationsBuildsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RetryProjectsLocationsBuildsRequest,
  output: RetryProjectsLocationsBuildsResponse,
  errors: [],
}));

export interface ApproveProjectsLocationsBuildsRequest {
  /** Required. Name of the target build. For example: "projects/{$project_id}/builds/{$build_id}" */
  name: string;
  /** Request body */
  body?: ApproveBuildRequest;
}

export const ApproveProjectsLocationsBuildsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ApproveBuildRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/builds/{buildsId}:approve",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ApproveProjectsLocationsBuildsRequest>;

export type ApproveProjectsLocationsBuildsResponse = Operation;
export const ApproveProjectsLocationsBuildsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type ApproveProjectsLocationsBuildsError = DefaultErrors;

/** Approves or rejects a pending build. If approved, the returned long-running operation (LRO) will be analogous to the LRO returned from a CreateBuild call. If rejected, the returned LRO will be immediately done. */
export const approveProjectsLocationsBuilds: API.OperationMethod<
  ApproveProjectsLocationsBuildsRequest,
  ApproveProjectsLocationsBuildsResponse,
  ApproveProjectsLocationsBuildsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ApproveProjectsLocationsBuildsRequest,
  output: ApproveProjectsLocationsBuildsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsTriggersRequest {
  /** The parent resource where this trigger will be created. Format: `projects/{project}/locations/{location}` */
  parent: string;
  /** Required. ID of the project for which to configure automatic builds. */
  projectId?: string;
  /** Request body */
  body?: BuildTrigger;
}

export const CreateProjectsLocationsTriggersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    body: Schema.optional(BuildTrigger).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/triggers",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsTriggersRequest>;

export type CreateProjectsLocationsTriggersResponse = BuildTrigger;
export const CreateProjectsLocationsTriggersResponse =
  /*@__PURE__*/ /*#__PURE__*/ BuildTrigger;

export type CreateProjectsLocationsTriggersError = DefaultErrors;

/** Creates a new `BuildTrigger`. */
export const createProjectsLocationsTriggers: API.OperationMethod<
  CreateProjectsLocationsTriggersRequest,
  CreateProjectsLocationsTriggersResponse,
  CreateProjectsLocationsTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsTriggersRequest,
  output: CreateProjectsLocationsTriggersResponse,
  errors: [],
}));

export interface GetProjectsLocationsTriggersRequest {
  /** The name of the `Trigger` to retrieve. Format: `projects/{project}/locations/{location}/triggers/{trigger}` */
  name: string;
  /** Required. ID of the project that owns the trigger. */
  projectId?: string;
  /** Required. Identifier (`id` or `name`) of the `BuildTrigger` to get. */
  triggerId?: string;
}

export const GetProjectsLocationsTriggersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    triggerId: Schema.optional(Schema.String).pipe(T.HttpQuery("triggerId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/triggers/{triggersId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsTriggersRequest>;

export type GetProjectsLocationsTriggersResponse = BuildTrigger;
export const GetProjectsLocationsTriggersResponse =
  /*@__PURE__*/ /*#__PURE__*/ BuildTrigger;

export type GetProjectsLocationsTriggersError = DefaultErrors;

/** Returns information about a `BuildTrigger`. */
export const getProjectsLocationsTriggers: API.OperationMethod<
  GetProjectsLocationsTriggersRequest,
  GetProjectsLocationsTriggersResponse,
  GetProjectsLocationsTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsTriggersRequest,
  output: GetProjectsLocationsTriggersResponse,
  errors: [],
}));

export interface ListProjectsLocationsTriggersRequest {
  /** The parent of the collection of `Triggers`. Format: `projects/{project}/locations/{location}` */
  parent: string;
  /** Required. ID of the project for which to list BuildTriggers. */
  projectId?: string;
  /** Number of results to return in the list. */
  pageSize?: number;
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
}

export const ListProjectsLocationsTriggersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/triggers",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsTriggersRequest>;

export type ListProjectsLocationsTriggersResponse = ListBuildTriggersResponse;
export const ListProjectsLocationsTriggersResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListBuildTriggersResponse;

export type ListProjectsLocationsTriggersError = DefaultErrors;

/** Lists existing `BuildTrigger`s. */
export const listProjectsLocationsTriggers: API.PaginatedOperationMethod<
  ListProjectsLocationsTriggersRequest,
  ListProjectsLocationsTriggersResponse,
  ListProjectsLocationsTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsTriggersRequest,
  output: ListProjectsLocationsTriggersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsTriggersRequest {
  /** The name of the `Trigger` to delete. Format: `projects/{project}/locations/{location}/triggers/{trigger}` */
  name: string;
  /** Required. ID of the project that owns the trigger. */
  projectId?: string;
  /** Required. ID of the `BuildTrigger` to delete. */
  triggerId?: string;
}

export const DeleteProjectsLocationsTriggersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    triggerId: Schema.optional(Schema.String).pipe(T.HttpQuery("triggerId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/triggers/{triggersId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsTriggersRequest>;

export type DeleteProjectsLocationsTriggersResponse = Empty;
export const DeleteProjectsLocationsTriggersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsTriggersError = DefaultErrors;

/** Deletes a `BuildTrigger` by its project ID and trigger ID. */
export const deleteProjectsLocationsTriggers: API.OperationMethod<
  DeleteProjectsLocationsTriggersRequest,
  DeleteProjectsLocationsTriggersResponse,
  DeleteProjectsLocationsTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsTriggersRequest,
  output: DeleteProjectsLocationsTriggersResponse,
  errors: [],
}));

export interface PatchProjectsLocationsTriggersRequest {
  /** The `Trigger` name with format: `projects/{project}/locations/{location}/triggers/{trigger}`, where {trigger} is a unique identifier generated by the service. */
  resourceName: string;
  /** Required. ID of the project that owns the trigger. */
  projectId?: string;
  /** Required. ID of the `BuildTrigger` to update. */
  triggerId?: string;
  /** Update mask for the resource. If this is set, the server will only update the fields specified in the field mask. Otherwise, a full update of the mutable resource fields will be performed. */
  updateMask?: string;
  /** Request body */
  body?: BuildTrigger;
}

export const PatchProjectsLocationsTriggersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceName: Schema.String.pipe(T.HttpPath("resourceName")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    triggerId: Schema.optional(Schema.String).pipe(T.HttpQuery("triggerId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(BuildTrigger).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/triggers/{triggersId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsTriggersRequest>;

export type PatchProjectsLocationsTriggersResponse = BuildTrigger;
export const PatchProjectsLocationsTriggersResponse =
  /*@__PURE__*/ /*#__PURE__*/ BuildTrigger;

export type PatchProjectsLocationsTriggersError = DefaultErrors;

/** Updates a `BuildTrigger` by its project ID and trigger ID. */
export const patchProjectsLocationsTriggers: API.OperationMethod<
  PatchProjectsLocationsTriggersRequest,
  PatchProjectsLocationsTriggersResponse,
  PatchProjectsLocationsTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsTriggersRequest,
  output: PatchProjectsLocationsTriggersResponse,
  errors: [],
}));

export interface RunProjectsLocationsTriggersRequest {
  /** The name of the `Trigger` to run. Format: `projects/{project}/locations/{location}/triggers/{trigger}` */
  name: string;
  /** Request body */
  body?: RunBuildTriggerRequest;
}

export const RunProjectsLocationsTriggersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(RunBuildTriggerRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/triggers/{triggersId}:run",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RunProjectsLocationsTriggersRequest>;

export type RunProjectsLocationsTriggersResponse = Operation;
export const RunProjectsLocationsTriggersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type RunProjectsLocationsTriggersError = DefaultErrors;

/** Runs a `BuildTrigger` at a particular source revision. To run a regional or global trigger, use the POST request that includes the location endpoint in the path (ex. v1/projects/{projectId}/locations/{region}/triggers/{triggerId}:run). The POST request that does not include the location endpoint in the path can only be used when running global triggers. */
export const runProjectsLocationsTriggers: API.OperationMethod<
  RunProjectsLocationsTriggersRequest,
  RunProjectsLocationsTriggersResponse,
  RunProjectsLocationsTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RunProjectsLocationsTriggersRequest,
  output: RunProjectsLocationsTriggersResponse,
  errors: [],
}));

export interface WebhookProjectsLocationsTriggersRequest {
  /** The name of the `ReceiveTriggerWebhook` to retrieve. Format: `projects/{project}/locations/{location}/triggers/{trigger}` */
  name: string;
  /** Project in which the specified trigger lives */
  projectId?: string;
  /** Name of the trigger to run the payload against */
  trigger?: string;
  /** Secret token used for authorization if an OAuth token isn't provided. */
  secret?: string;
  /** Request body */
  body?: HttpBody;
}

export const WebhookProjectsLocationsTriggersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    trigger: Schema.optional(Schema.String).pipe(T.HttpQuery("trigger")),
    secret: Schema.optional(Schema.String).pipe(T.HttpQuery("secret")),
    body: Schema.optional(HttpBody).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/triggers/{triggersId}:webhook",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<WebhookProjectsLocationsTriggersRequest>;

export type WebhookProjectsLocationsTriggersResponse =
  ReceiveTriggerWebhookResponse;
export const WebhookProjectsLocationsTriggersResponse =
  /*@__PURE__*/ /*#__PURE__*/ ReceiveTriggerWebhookResponse;

export type WebhookProjectsLocationsTriggersError = DefaultErrors;

/** ReceiveTriggerWebhook [Experimental] is called when the API receives a webhook request targeted at a specific trigger. */
export const webhookProjectsLocationsTriggers: API.OperationMethod<
  WebhookProjectsLocationsTriggersRequest,
  WebhookProjectsLocationsTriggersResponse,
  WebhookProjectsLocationsTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: WebhookProjectsLocationsTriggersRequest,
  output: WebhookProjectsLocationsTriggersResponse,
  errors: [],
}));

export interface CreateProjectsLocationsBitbucketServerConfigsRequest {
  /** Required. Name of the parent resource. */
  parent: string;
  /** Optional. The ID to use for the BitbucketServerConfig, which will become the final component of the BitbucketServerConfig's resource name. bitbucket_server_config_id must meet the following requirements: + They must contain only alphanumeric characters and dashes. + They can be 1-64 characters long. + They must begin and end with an alphanumeric character. */
  bitbucketServerConfigId?: string;
  /** Request body */
  body?: BitbucketServerConfig;
}

export const CreateProjectsLocationsBitbucketServerConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    bitbucketServerConfigId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("bitbucketServerConfigId"),
    ),
    body: Schema.optional(BitbucketServerConfig).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bitbucketServerConfigs",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsBitbucketServerConfigsRequest>;

export type CreateProjectsLocationsBitbucketServerConfigsResponse = Operation;
export const CreateProjectsLocationsBitbucketServerConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsBitbucketServerConfigsError = DefaultErrors;

/** Creates a new `BitbucketServerConfig`. This API is experimental. */
export const createProjectsLocationsBitbucketServerConfigs: API.OperationMethod<
  CreateProjectsLocationsBitbucketServerConfigsRequest,
  CreateProjectsLocationsBitbucketServerConfigsResponse,
  CreateProjectsLocationsBitbucketServerConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsBitbucketServerConfigsRequest,
  output: CreateProjectsLocationsBitbucketServerConfigsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsBitbucketServerConfigsRequest {
  /** The resource name for the config. */
  name: string;
  /** Update mask for the resource. If this is set, the server will only update the fields specified in the field mask. Otherwise, a full update of the mutable resource fields will be performed. */
  updateMask?: string;
  /** Request body */
  body?: BitbucketServerConfig;
}

export const PatchProjectsLocationsBitbucketServerConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(BitbucketServerConfig).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bitbucketServerConfigs/{bitbucketServerConfigsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsBitbucketServerConfigsRequest>;

export type PatchProjectsLocationsBitbucketServerConfigsResponse = Operation;
export const PatchProjectsLocationsBitbucketServerConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsBitbucketServerConfigsError = DefaultErrors;

/** Updates an existing `BitbucketServerConfig`. This API is experimental. */
export const patchProjectsLocationsBitbucketServerConfigs: API.OperationMethod<
  PatchProjectsLocationsBitbucketServerConfigsRequest,
  PatchProjectsLocationsBitbucketServerConfigsResponse,
  PatchProjectsLocationsBitbucketServerConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsBitbucketServerConfigsRequest,
  output: PatchProjectsLocationsBitbucketServerConfigsResponse,
  errors: [],
}));

export interface GetProjectsLocationsBitbucketServerConfigsRequest {
  /** Required. The config resource name. */
  name: string;
}

export const GetProjectsLocationsBitbucketServerConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bitbucketServerConfigs/{bitbucketServerConfigsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsBitbucketServerConfigsRequest>;

export type GetProjectsLocationsBitbucketServerConfigsResponse =
  BitbucketServerConfig;
export const GetProjectsLocationsBitbucketServerConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ BitbucketServerConfig;

export type GetProjectsLocationsBitbucketServerConfigsError = DefaultErrors;

/** Retrieve a `BitbucketServerConfig`. This API is experimental. */
export const getProjectsLocationsBitbucketServerConfigs: API.OperationMethod<
  GetProjectsLocationsBitbucketServerConfigsRequest,
  GetProjectsLocationsBitbucketServerConfigsResponse,
  GetProjectsLocationsBitbucketServerConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsBitbucketServerConfigsRequest,
  output: GetProjectsLocationsBitbucketServerConfigsResponse,
  errors: [],
}));

export interface ListProjectsLocationsBitbucketServerConfigsRequest {
  /** Required. Name of the parent resource. */
  parent: string;
  /** The maximum number of configs to return. The service may return fewer than this value. If unspecified, at most 50 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListBitbucketServerConfigsRequest` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBitbucketServerConfigsRequest` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsBitbucketServerConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bitbucketServerConfigs",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsBitbucketServerConfigsRequest>;

export type ListProjectsLocationsBitbucketServerConfigsResponse =
  ListBitbucketServerConfigsResponse;
export const ListProjectsLocationsBitbucketServerConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListBitbucketServerConfigsResponse;

export type ListProjectsLocationsBitbucketServerConfigsError = DefaultErrors;

/** List all `BitbucketServerConfigs` for a given project. This API is experimental. */
export const listProjectsLocationsBitbucketServerConfigs: API.PaginatedOperationMethod<
  ListProjectsLocationsBitbucketServerConfigsRequest,
  ListProjectsLocationsBitbucketServerConfigsResponse,
  ListProjectsLocationsBitbucketServerConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsBitbucketServerConfigsRequest,
  output: ListProjectsLocationsBitbucketServerConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsBitbucketServerConfigsRequest {
  /** Required. The config resource name. */
  name: string;
}

export const DeleteProjectsLocationsBitbucketServerConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bitbucketServerConfigs/{bitbucketServerConfigsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsBitbucketServerConfigsRequest>;

export type DeleteProjectsLocationsBitbucketServerConfigsResponse = Operation;
export const DeleteProjectsLocationsBitbucketServerConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsBitbucketServerConfigsError = DefaultErrors;

/** Delete a `BitbucketServerConfig`. This API is experimental. */
export const deleteProjectsLocationsBitbucketServerConfigs: API.OperationMethod<
  DeleteProjectsLocationsBitbucketServerConfigsRequest,
  DeleteProjectsLocationsBitbucketServerConfigsResponse,
  DeleteProjectsLocationsBitbucketServerConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsBitbucketServerConfigsRequest,
  output: DeleteProjectsLocationsBitbucketServerConfigsResponse,
  errors: [],
}));

export interface RemoveBitbucketServerConnectedRepositoryProjectsLocationsBitbucketServerConfigsRequest {
  /** Required. The name of the `BitbucketServerConfig` to remove a connected repository. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{config}` */
  config: string;
  /** Request body */
  body?: RemoveBitbucketServerConnectedRepositoryRequest;
}

export const RemoveBitbucketServerConnectedRepositoryProjectsLocationsBitbucketServerConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    config: Schema.String.pipe(T.HttpPath("config")),
    body: Schema.optional(RemoveBitbucketServerConnectedRepositoryRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bitbucketServerConfigs/{bitbucketServerConfigsId}:removeBitbucketServerConnectedRepository",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RemoveBitbucketServerConnectedRepositoryProjectsLocationsBitbucketServerConfigsRequest>;

export type RemoveBitbucketServerConnectedRepositoryProjectsLocationsBitbucketServerConfigsResponse =
  Empty;
export const RemoveBitbucketServerConnectedRepositoryProjectsLocationsBitbucketServerConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type RemoveBitbucketServerConnectedRepositoryProjectsLocationsBitbucketServerConfigsError =
  DefaultErrors;

/** Remove a Bitbucket Server repository from a given BitbucketServerConfig's connected repositories. This API is experimental. */
export const removeBitbucketServerConnectedRepositoryProjectsLocationsBitbucketServerConfigs: API.OperationMethod<
  RemoveBitbucketServerConnectedRepositoryProjectsLocationsBitbucketServerConfigsRequest,
  RemoveBitbucketServerConnectedRepositoryProjectsLocationsBitbucketServerConfigsResponse,
  RemoveBitbucketServerConnectedRepositoryProjectsLocationsBitbucketServerConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input:
    RemoveBitbucketServerConnectedRepositoryProjectsLocationsBitbucketServerConfigsRequest,
  output:
    RemoveBitbucketServerConnectedRepositoryProjectsLocationsBitbucketServerConfigsResponse,
  errors: [],
}));

export interface ListProjectsLocationsBitbucketServerConfigsReposRequest {
  /** Required. Name of the parent resource. */
  parent: string;
  /** The maximum number of configs to return. The service may return fewer than this value. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListBitbucketServerRepositoriesRequest` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBitbucketServerConfigsRequest` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsBitbucketServerConfigsReposRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bitbucketServerConfigs/{bitbucketServerConfigsId}/repos",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsBitbucketServerConfigsReposRequest>;

export type ListProjectsLocationsBitbucketServerConfigsReposResponse =
  ListBitbucketServerRepositoriesResponse;
export const ListProjectsLocationsBitbucketServerConfigsReposResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListBitbucketServerRepositoriesResponse;

export type ListProjectsLocationsBitbucketServerConfigsReposError =
  DefaultErrors;

/** List all repositories for a given `BitbucketServerConfig`. This API is experimental. */
export const listProjectsLocationsBitbucketServerConfigsRepos: API.PaginatedOperationMethod<
  ListProjectsLocationsBitbucketServerConfigsReposRequest,
  ListProjectsLocationsBitbucketServerConfigsReposResponse,
  ListProjectsLocationsBitbucketServerConfigsReposError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsBitbucketServerConfigsReposRequest,
  output: ListProjectsLocationsBitbucketServerConfigsReposResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface BatchCreateProjectsLocationsBitbucketServerConfigsConnectedRepositoriesRequest {
  /** The name of the `BitbucketServerConfig` that added connected repository. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{config}` */
  parent: string;
  /** Request body */
  body?: BatchCreateBitbucketServerConnectedRepositoriesRequest;
}

export const BatchCreateProjectsLocationsBitbucketServerConfigsConnectedRepositoriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      BatchCreateBitbucketServerConnectedRepositoriesRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bitbucketServerConfigs/{bitbucketServerConfigsId}/connectedRepositories:batchCreate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchCreateProjectsLocationsBitbucketServerConfigsConnectedRepositoriesRequest>;

export type BatchCreateProjectsLocationsBitbucketServerConfigsConnectedRepositoriesResponse =
  Operation;
export const BatchCreateProjectsLocationsBitbucketServerConfigsConnectedRepositoriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type BatchCreateProjectsLocationsBitbucketServerConfigsConnectedRepositoriesError =
  DefaultErrors;

/** Batch connecting Bitbucket Server repositories to Cloud Build. */
export const batchCreateProjectsLocationsBitbucketServerConfigsConnectedRepositories: API.OperationMethod<
  BatchCreateProjectsLocationsBitbucketServerConfigsConnectedRepositoriesRequest,
  BatchCreateProjectsLocationsBitbucketServerConfigsConnectedRepositoriesResponse,
  BatchCreateProjectsLocationsBitbucketServerConfigsConnectedRepositoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input:
    BatchCreateProjectsLocationsBitbucketServerConfigsConnectedRepositoriesRequest,
  output:
    BatchCreateProjectsLocationsBitbucketServerConfigsConnectedRepositoriesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsGitLabConfigsRequest {
  /** Required. Name of the parent resource. */
  parent: string;
  /** Optional. The ID to use for the GitLabConfig, which will become the final component of the GitLabConfig’s resource name. gitlab_config_id must meet the following requirements: + They must contain only alphanumeric characters and dashes. + They can be 1-64 characters long. + They must begin and end with an alphanumeric character */
  gitlabConfigId?: string;
  /** Request body */
  body?: GitLabConfig;
}

export const CreateProjectsLocationsGitLabConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    gitlabConfigId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("gitlabConfigId"),
    ),
    body: Schema.optional(GitLabConfig).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/gitLabConfigs",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsGitLabConfigsRequest>;

export type CreateProjectsLocationsGitLabConfigsResponse = Operation;
export const CreateProjectsLocationsGitLabConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsGitLabConfigsError = DefaultErrors;

/** Creates a new `GitLabConfig`. This API is experimental */
export const createProjectsLocationsGitLabConfigs: API.OperationMethod<
  CreateProjectsLocationsGitLabConfigsRequest,
  CreateProjectsLocationsGitLabConfigsResponse,
  CreateProjectsLocationsGitLabConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsGitLabConfigsRequest,
  output: CreateProjectsLocationsGitLabConfigsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsGitLabConfigsRequest {
  /** The resource name for the config. */
  name: string;
  /** Update mask for the resource. If this is set, the server will only update the fields specified in the field mask. Otherwise, a full update of the mutable resource fields will be performed. */
  updateMask?: string;
  /** Request body */
  body?: GitLabConfig;
}

export const PatchProjectsLocationsGitLabConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GitLabConfig).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/gitLabConfigs/{gitLabConfigsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsGitLabConfigsRequest>;

export type PatchProjectsLocationsGitLabConfigsResponse = Operation;
export const PatchProjectsLocationsGitLabConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsGitLabConfigsError = DefaultErrors;

/** Updates an existing `GitLabConfig`. This API is experimental */
export const patchProjectsLocationsGitLabConfigs: API.OperationMethod<
  PatchProjectsLocationsGitLabConfigsRequest,
  PatchProjectsLocationsGitLabConfigsResponse,
  PatchProjectsLocationsGitLabConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsGitLabConfigsRequest,
  output: PatchProjectsLocationsGitLabConfigsResponse,
  errors: [],
}));

export interface GetProjectsLocationsGitLabConfigsRequest {
  /** Required. The config resource name. */
  name: string;
}

export const GetProjectsLocationsGitLabConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/gitLabConfigs/{gitLabConfigsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsGitLabConfigsRequest>;

export type GetProjectsLocationsGitLabConfigsResponse = GitLabConfig;
export const GetProjectsLocationsGitLabConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GitLabConfig;

export type GetProjectsLocationsGitLabConfigsError = DefaultErrors;

/** Retrieves a `GitLabConfig`. This API is experimental */
export const getProjectsLocationsGitLabConfigs: API.OperationMethod<
  GetProjectsLocationsGitLabConfigsRequest,
  GetProjectsLocationsGitLabConfigsResponse,
  GetProjectsLocationsGitLabConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsGitLabConfigsRequest,
  output: GetProjectsLocationsGitLabConfigsResponse,
  errors: [],
}));

export interface ListProjectsLocationsGitLabConfigsRequest {
  /** Required. Name of the parent resource */
  parent: string;
  /** The maximum number of configs to return. The service may return fewer than this value. If unspecified, at most 50 configs will be returned. The maximum value is 1000;, values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous ‘ListGitlabConfigsRequest’ call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ‘ListGitlabConfigsRequest’ must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsGitLabConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/gitLabConfigs",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsGitLabConfigsRequest>;

export type ListProjectsLocationsGitLabConfigsResponse =
  ListGitLabConfigsResponse;
export const ListProjectsLocationsGitLabConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListGitLabConfigsResponse;

export type ListProjectsLocationsGitLabConfigsError = DefaultErrors;

/** List all `GitLabConfigs` for a given project. This API is experimental */
export const listProjectsLocationsGitLabConfigs: API.PaginatedOperationMethod<
  ListProjectsLocationsGitLabConfigsRequest,
  ListProjectsLocationsGitLabConfigsResponse,
  ListProjectsLocationsGitLabConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsGitLabConfigsRequest,
  output: ListProjectsLocationsGitLabConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsGitLabConfigsRequest {
  /** Required. The config resource name. */
  name: string;
}

export const DeleteProjectsLocationsGitLabConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/gitLabConfigs/{gitLabConfigsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsGitLabConfigsRequest>;

export type DeleteProjectsLocationsGitLabConfigsResponse = Operation;
export const DeleteProjectsLocationsGitLabConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsGitLabConfigsError = DefaultErrors;

/** Delete a `GitLabConfig`. This API is experimental */
export const deleteProjectsLocationsGitLabConfigs: API.OperationMethod<
  DeleteProjectsLocationsGitLabConfigsRequest,
  DeleteProjectsLocationsGitLabConfigsResponse,
  DeleteProjectsLocationsGitLabConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsGitLabConfigsRequest,
  output: DeleteProjectsLocationsGitLabConfigsResponse,
  errors: [],
}));

export interface RemoveGitLabConnectedRepositoryProjectsLocationsGitLabConfigsRequest {
  /** Required. The name of the `GitLabConfig` to remove a connected repository. Format: `projects/{project}/locations/{location}/gitLabConfigs/{config}` */
  config: string;
  /** Request body */
  body?: RemoveGitLabConnectedRepositoryRequest;
}

export const RemoveGitLabConnectedRepositoryProjectsLocationsGitLabConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    config: Schema.String.pipe(T.HttpPath("config")),
    body: Schema.optional(RemoveGitLabConnectedRepositoryRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/gitLabConfigs/{gitLabConfigsId}:removeGitLabConnectedRepository",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RemoveGitLabConnectedRepositoryProjectsLocationsGitLabConfigsRequest>;

export type RemoveGitLabConnectedRepositoryProjectsLocationsGitLabConfigsResponse =
  Empty;
export const RemoveGitLabConnectedRepositoryProjectsLocationsGitLabConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type RemoveGitLabConnectedRepositoryProjectsLocationsGitLabConfigsError =
  DefaultErrors;

/** Remove a GitLab repository from a given GitLabConfig's connected repositories. This API is experimental. */
export const removeGitLabConnectedRepositoryProjectsLocationsGitLabConfigs: API.OperationMethod<
  RemoveGitLabConnectedRepositoryProjectsLocationsGitLabConfigsRequest,
  RemoveGitLabConnectedRepositoryProjectsLocationsGitLabConfigsResponse,
  RemoveGitLabConnectedRepositoryProjectsLocationsGitLabConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveGitLabConnectedRepositoryProjectsLocationsGitLabConfigsRequest,
  output: RemoveGitLabConnectedRepositoryProjectsLocationsGitLabConfigsResponse,
  errors: [],
}));

export interface ListProjectsLocationsGitLabConfigsReposRequest {
  /** Required. Name of the parent resource. */
  parent: string;
  /** The maximum number of repositories to return. The service may return fewer than this value. */
  pageSize?: number;
  /** A page token, received from a previous ListGitLabRepositoriesRequest` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListGitLabRepositoriesRequest` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsGitLabConfigsReposRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/gitLabConfigs/{gitLabConfigsId}/repos",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsGitLabConfigsReposRequest>;

export type ListProjectsLocationsGitLabConfigsReposResponse =
  ListGitLabRepositoriesResponse;
export const ListProjectsLocationsGitLabConfigsReposResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListGitLabRepositoriesResponse;

export type ListProjectsLocationsGitLabConfigsReposError = DefaultErrors;

/** List all repositories for a given `GitLabConfig`. This API is experimental */
export const listProjectsLocationsGitLabConfigsRepos: API.PaginatedOperationMethod<
  ListProjectsLocationsGitLabConfigsReposRequest,
  ListProjectsLocationsGitLabConfigsReposResponse,
  ListProjectsLocationsGitLabConfigsReposError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsGitLabConfigsReposRequest,
  output: ListProjectsLocationsGitLabConfigsReposResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface BatchCreateProjectsLocationsGitLabConfigsConnectedRepositoriesRequest {
  /** The name of the `GitLabConfig` that adds connected repositories. Format: `projects/{project}/locations/{location}/gitLabConfigs/{config}` */
  parent: string;
  /** Request body */
  body?: BatchCreateGitLabConnectedRepositoriesRequest;
}

export const BatchCreateProjectsLocationsGitLabConfigsConnectedRepositoriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(BatchCreateGitLabConnectedRepositoriesRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/gitLabConfigs/{gitLabConfigsId}/connectedRepositories:batchCreate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchCreateProjectsLocationsGitLabConfigsConnectedRepositoriesRequest>;

export type BatchCreateProjectsLocationsGitLabConfigsConnectedRepositoriesResponse =
  Operation;
export const BatchCreateProjectsLocationsGitLabConfigsConnectedRepositoriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type BatchCreateProjectsLocationsGitLabConfigsConnectedRepositoriesError =
  DefaultErrors;

/** Batch connecting GitLab repositories to Cloud Build. This API is experimental. */
export const batchCreateProjectsLocationsGitLabConfigsConnectedRepositories: API.OperationMethod<
  BatchCreateProjectsLocationsGitLabConfigsConnectedRepositoriesRequest,
  BatchCreateProjectsLocationsGitLabConfigsConnectedRepositoriesResponse,
  BatchCreateProjectsLocationsGitLabConfigsConnectedRepositoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchCreateProjectsLocationsGitLabConfigsConnectedRepositoriesRequest,
  output:
    BatchCreateProjectsLocationsGitLabConfigsConnectedRepositoriesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsGithubEnterpriseConfigsRequest {
  /** Name of the parent project. For example: projects/{$project_number} or projects/{$project_id} */
  parent: string;
  /** ID of the project. */
  projectId?: string;
  /** Optional. The ID to use for the GithubEnterpriseConfig, which will become the final component of the GithubEnterpriseConfig's resource name. ghe_config_id must meet the following requirements: + They must contain only alphanumeric characters and dashes. + They can be 1-64 characters long. + They must begin and end with an alphanumeric character */
  gheConfigId?: string;
  /** Request body */
  body?: GitHubEnterpriseConfig;
}

export const CreateProjectsLocationsGithubEnterpriseConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    gheConfigId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("gheConfigId"),
    ),
    body: Schema.optional(GitHubEnterpriseConfig).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/githubEnterpriseConfigs",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsGithubEnterpriseConfigsRequest>;

export type CreateProjectsLocationsGithubEnterpriseConfigsResponse = Operation;
export const CreateProjectsLocationsGithubEnterpriseConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsGithubEnterpriseConfigsError = DefaultErrors;

/** Create an association between a GCP project and a GitHub Enterprise server. */
export const createProjectsLocationsGithubEnterpriseConfigs: API.OperationMethod<
  CreateProjectsLocationsGithubEnterpriseConfigsRequest,
  CreateProjectsLocationsGithubEnterpriseConfigsResponse,
  CreateProjectsLocationsGithubEnterpriseConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsGithubEnterpriseConfigsRequest,
  output: CreateProjectsLocationsGithubEnterpriseConfigsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsGithubEnterpriseConfigsRequest {
  /** The full resource name for the GitHubEnterpriseConfig For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}" */
  name: string;
  /** Update mask for the resource. If this is set, the server will only update the fields specified in the field mask. Otherwise, a full update of the mutable resource fields will be performed. */
  updateMask?: string;
  /** Request body */
  body?: GitHubEnterpriseConfig;
}

export const PatchProjectsLocationsGithubEnterpriseConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GitHubEnterpriseConfig).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/githubEnterpriseConfigs/{githubEnterpriseConfigsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsGithubEnterpriseConfigsRequest>;

export type PatchProjectsLocationsGithubEnterpriseConfigsResponse = Operation;
export const PatchProjectsLocationsGithubEnterpriseConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsGithubEnterpriseConfigsError = DefaultErrors;

/** Update an association between a GCP project and a GitHub Enterprise server. */
export const patchProjectsLocationsGithubEnterpriseConfigs: API.OperationMethod<
  PatchProjectsLocationsGithubEnterpriseConfigsRequest,
  PatchProjectsLocationsGithubEnterpriseConfigsResponse,
  PatchProjectsLocationsGithubEnterpriseConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsGithubEnterpriseConfigsRequest,
  output: PatchProjectsLocationsGithubEnterpriseConfigsResponse,
  errors: [],
}));

export interface GetProjectsLocationsGithubEnterpriseConfigsRequest {
  /** This field should contain the name of the enterprise config resource. For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}" */
  name: string;
  /** ID of the project */
  projectId?: string;
  /** Unique identifier of the `GitHubEnterpriseConfig` */
  configId?: string;
}

export const GetProjectsLocationsGithubEnterpriseConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    configId: Schema.optional(Schema.String).pipe(T.HttpQuery("configId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/githubEnterpriseConfigs/{githubEnterpriseConfigsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsGithubEnterpriseConfigsRequest>;

export type GetProjectsLocationsGithubEnterpriseConfigsResponse =
  GitHubEnterpriseConfig;
export const GetProjectsLocationsGithubEnterpriseConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GitHubEnterpriseConfig;

export type GetProjectsLocationsGithubEnterpriseConfigsError = DefaultErrors;

/** Retrieve a GitHubEnterpriseConfig. */
export const getProjectsLocationsGithubEnterpriseConfigs: API.OperationMethod<
  GetProjectsLocationsGithubEnterpriseConfigsRequest,
  GetProjectsLocationsGithubEnterpriseConfigsResponse,
  GetProjectsLocationsGithubEnterpriseConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsGithubEnterpriseConfigsRequest,
  output: GetProjectsLocationsGithubEnterpriseConfigsResponse,
  errors: [],
}));

export interface ListProjectsLocationsGithubEnterpriseConfigsRequest {
  /** Name of the parent project. For example: projects/{$project_number} or projects/{$project_id} */
  parent: string;
  /** ID of the project */
  projectId?: string;
}

export const ListProjectsLocationsGithubEnterpriseConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/githubEnterpriseConfigs",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsGithubEnterpriseConfigsRequest>;

export type ListProjectsLocationsGithubEnterpriseConfigsResponse =
  ListGithubEnterpriseConfigsResponse;
export const ListProjectsLocationsGithubEnterpriseConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListGithubEnterpriseConfigsResponse;

export type ListProjectsLocationsGithubEnterpriseConfigsError = DefaultErrors;

/** List all GitHubEnterpriseConfigs for a given project. */
export const listProjectsLocationsGithubEnterpriseConfigs: API.OperationMethod<
  ListProjectsLocationsGithubEnterpriseConfigsRequest,
  ListProjectsLocationsGithubEnterpriseConfigsResponse,
  ListProjectsLocationsGithubEnterpriseConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListProjectsLocationsGithubEnterpriseConfigsRequest,
  output: ListProjectsLocationsGithubEnterpriseConfigsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsGithubEnterpriseConfigsRequest {
  /** This field should contain the name of the enterprise config resource. For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}" */
  name: string;
  /** ID of the project */
  projectId?: string;
  /** Unique identifier of the `GitHubEnterpriseConfig` */
  configId?: string;
}

export const DeleteProjectsLocationsGithubEnterpriseConfigsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    configId: Schema.optional(Schema.String).pipe(T.HttpQuery("configId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/githubEnterpriseConfigs/{githubEnterpriseConfigsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsGithubEnterpriseConfigsRequest>;

export type DeleteProjectsLocationsGithubEnterpriseConfigsResponse = Operation;
export const DeleteProjectsLocationsGithubEnterpriseConfigsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsGithubEnterpriseConfigsError = DefaultErrors;

/** Delete an association between a GCP project and a GitHub Enterprise server. */
export const deleteProjectsLocationsGithubEnterpriseConfigs: API.OperationMethod<
  DeleteProjectsLocationsGithubEnterpriseConfigsRequest,
  DeleteProjectsLocationsGithubEnterpriseConfigsResponse,
  DeleteProjectsLocationsGithubEnterpriseConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsGithubEnterpriseConfigsRequest,
  output: DeleteProjectsLocationsGithubEnterpriseConfigsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsWorkerPoolsRequest {
  /** Required. The parent resource where this worker pool will be created. Format: `projects/{project}/locations/{location}`. */
  parent: string;
  /** Required. Immutable. The ID to use for the `WorkerPool`, which will become the final component of the resource name. This value should be 1-63 characters, and valid characters are /a-z-/. */
  workerPoolId?: string;
  /** If set, validate the request and preview the response, but do not actually post it. */
  validateOnly?: boolean;
  /** Request body */
  body?: WorkerPool;
}

export const CreateProjectsLocationsWorkerPoolsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    workerPoolId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("workerPoolId"),
    ),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    body: Schema.optional(WorkerPool).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workerPools",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsWorkerPoolsRequest>;

export type CreateProjectsLocationsWorkerPoolsResponse = Operation;
export const CreateProjectsLocationsWorkerPoolsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsWorkerPoolsError = DefaultErrors;

/** Creates a `WorkerPool`. */
export const createProjectsLocationsWorkerPools: API.OperationMethod<
  CreateProjectsLocationsWorkerPoolsRequest,
  CreateProjectsLocationsWorkerPoolsResponse,
  CreateProjectsLocationsWorkerPoolsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsWorkerPoolsRequest,
  output: CreateProjectsLocationsWorkerPoolsResponse,
  errors: [],
}));

export interface GetProjectsLocationsWorkerPoolsRequest {
  /** Required. The name of the `WorkerPool` to retrieve. Format: `projects/{project}/locations/{location}/workerPools/{workerPool}`. */
  name: string;
}

export const GetProjectsLocationsWorkerPoolsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workerPools/{workerPoolsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsWorkerPoolsRequest>;

export type GetProjectsLocationsWorkerPoolsResponse = WorkerPool;
export const GetProjectsLocationsWorkerPoolsResponse =
  /*@__PURE__*/ /*#__PURE__*/ WorkerPool;

export type GetProjectsLocationsWorkerPoolsError = DefaultErrors;

/** Returns details of a `WorkerPool`. */
export const getProjectsLocationsWorkerPools: API.OperationMethod<
  GetProjectsLocationsWorkerPoolsRequest,
  GetProjectsLocationsWorkerPoolsResponse,
  GetProjectsLocationsWorkerPoolsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsWorkerPoolsRequest,
  output: GetProjectsLocationsWorkerPoolsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsWorkerPoolsRequest {
  /** Required. The name of the `WorkerPool` to delete. Format: `projects/{project}/locations/{location}/workerPools/{workerPool}`. */
  name: string;
  /** Optional. If provided, it must match the server's etag on the workerpool for the request to be processed. */
  etag?: string;
  /** If set to true, and the `WorkerPool` is not found, the request will succeed but no action will be taken on the server. */
  allowMissing?: boolean;
  /** If set, validate the request and preview the response, but do not actually post it. */
  validateOnly?: boolean;
}

export const DeleteProjectsLocationsWorkerPoolsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workerPools/{workerPoolsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsWorkerPoolsRequest>;

export type DeleteProjectsLocationsWorkerPoolsResponse = Operation;
export const DeleteProjectsLocationsWorkerPoolsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsWorkerPoolsError = DefaultErrors;

/** Deletes a `WorkerPool`. */
export const deleteProjectsLocationsWorkerPools: API.OperationMethod<
  DeleteProjectsLocationsWorkerPoolsRequest,
  DeleteProjectsLocationsWorkerPoolsResponse,
  DeleteProjectsLocationsWorkerPoolsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsWorkerPoolsRequest,
  output: DeleteProjectsLocationsWorkerPoolsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsWorkerPoolsRequest {
  /** Output only. The resource name of the `WorkerPool`, with format `projects/{project}/locations/{location}/workerPools/{worker_pool}`. The value of `{worker_pool}` is provided by `worker_pool_id` in `CreateWorkerPool` request and the value of `{location}` is determined by the endpoint accessed. */
  name: string;
  /** Optional. A mask specifying which fields in `worker_pool` to update. */
  updateMask?: string;
  /** If set, validate the request and preview the response, but do not actually post it. */
  validateOnly?: boolean;
  /** Request body */
  body?: WorkerPool;
}

export const PatchProjectsLocationsWorkerPoolsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    body: Schema.optional(WorkerPool).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workerPools/{workerPoolsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsWorkerPoolsRequest>;

export type PatchProjectsLocationsWorkerPoolsResponse = Operation;
export const PatchProjectsLocationsWorkerPoolsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsWorkerPoolsError = DefaultErrors;

/** Updates a `WorkerPool`. */
export const patchProjectsLocationsWorkerPools: API.OperationMethod<
  PatchProjectsLocationsWorkerPoolsRequest,
  PatchProjectsLocationsWorkerPoolsResponse,
  PatchProjectsLocationsWorkerPoolsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsWorkerPoolsRequest,
  output: PatchProjectsLocationsWorkerPoolsResponse,
  errors: [],
}));

export interface ListProjectsLocationsWorkerPoolsRequest {
  /** Required. The parent of the collection of `WorkerPools`. Format: `projects/{project}/locations/{location}`. */
  parent: string;
  /** The maximum number of `WorkerPool`s to return. The service may return fewer than this value. If omitted, the server will use a sensible default. */
  pageSize?: number;
  /** A page token, received from a previous `ListWorkerPools` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
}

export const ListProjectsLocationsWorkerPoolsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workerPools",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsWorkerPoolsRequest>;

export type ListProjectsLocationsWorkerPoolsResponse = ListWorkerPoolsResponse;
export const ListProjectsLocationsWorkerPoolsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListWorkerPoolsResponse;

export type ListProjectsLocationsWorkerPoolsError = DefaultErrors;

/** Lists `WorkerPool`s. */
export const listProjectsLocationsWorkerPools: API.PaginatedOperationMethod<
  ListProjectsLocationsWorkerPoolsRequest,
  ListProjectsLocationsWorkerPoolsResponse,
  ListProjectsLocationsWorkerPoolsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsWorkerPoolsRequest,
  output: ListProjectsLocationsWorkerPoolsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ReceiveGithubDotComWebhookRequest {
  /** For GitHub Enterprise webhooks, this key is used to associate the webhook request with the GitHubEnterpriseConfig to use for validation. */
  webhookKey?: string;
  /** Request body */
  body?: HttpBody;
}

export const ReceiveGithubDotComWebhookRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    webhookKey: Schema.optional(Schema.String).pipe(T.HttpQuery("webhookKey")),
    body: Schema.optional(HttpBody).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/githubDotComWebhook:receive",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ReceiveGithubDotComWebhookRequest>;

export type ReceiveGithubDotComWebhookResponse = Empty;
export const ReceiveGithubDotComWebhookResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type ReceiveGithubDotComWebhookError = DefaultErrors;

/** ReceiveGitHubDotComWebhook is called when the API receives a github.com webhook. */
export const receiveGithubDotComWebhook: API.OperationMethod<
  ReceiveGithubDotComWebhookRequest,
  ReceiveGithubDotComWebhookResponse,
  ReceiveGithubDotComWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReceiveGithubDotComWebhookRequest,
  output: ReceiveGithubDotComWebhookResponse,
  errors: [],
}));

export interface RegionalWebhookLocationsRequest {
  /** Required. The location where the webhook should be sent. */
  location: string;
  /** For GitHub Enterprise webhooks, this key is used to associate the webhook request with the GitHubEnterpriseConfig to use for validation. */
  webhookKey?: string;
  /** Request body */
  body?: HttpBody;
}

export const RegionalWebhookLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.HttpPath("location")),
    webhookKey: Schema.optional(Schema.String).pipe(T.HttpQuery("webhookKey")),
    body: Schema.optional(HttpBody).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/locations/{locationsId}/regionalWebhook",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RegionalWebhookLocationsRequest>;

export type RegionalWebhookLocationsResponse = Empty;
export const RegionalWebhookLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type RegionalWebhookLocationsError = DefaultErrors;

/** ReceiveRegionalWebhook is called when the API receives a regional GitHub webhook. */
export const regionalWebhookLocations: API.OperationMethod<
  RegionalWebhookLocationsRequest,
  RegionalWebhookLocationsResponse,
  RegionalWebhookLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RegionalWebhookLocationsRequest,
  output: RegionalWebhookLocationsResponse,
  errors: [],
}));

export interface WebhookV1Request {
  /** For GitHub Enterprise webhooks, this key is used to associate the webhook request with the GitHubEnterpriseConfig to use for validation. */
  webhookKey?: string;
  /** Request body */
  body?: HttpBody;
}

export const WebhookV1Request = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  webhookKey: Schema.optional(Schema.String).pipe(T.HttpQuery("webhookKey")),
  body: Schema.optional(HttpBody).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/webhook", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WebhookV1Request>;

export type WebhookV1Response = Empty;
export const WebhookV1Response = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type WebhookV1Error = DefaultErrors;

/** ReceiveWebhook is called when the API receives a GitHub webhook. */
export const webhookV1: API.OperationMethod<
  WebhookV1Request,
  WebhookV1Response,
  WebhookV1Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: WebhookV1Request,
  output: WebhookV1Response,
  errors: [],
}));
